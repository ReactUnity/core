using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using ReactUnity.Helpers;

namespace ReactUnity
{
    public abstract partial class ReactContext
    {
        protected Dictionary<int, WeakReference<IReactComponent>> Refs = new Dictionary<int, WeakReference<IReactComponent>>();
        internal Callback CommandsCallback;
        internal Callback FireEventByRefCallback;
        internal Callback GetObjectCallback;
        internal Callback GetEventAsObjectCallback;

        public void BindCommands(object commandsObject, object callbacksObject, object getObjectCallback, object getEventAsObjectCallback)
        {
            CommandsCallback = Callback.From(commandsObject, this);
            FireEventByRefCallback = Callback.From(callbacksObject, this);
            GetObjectCallback = Callback.From(getObjectCallback, this);
            GetEventAsObjectCallback = Callback.From(getEventAsObjectCallback, this);
        }

        public void SetRef(int refId, IReactComponent cmp)
        {
            cmp.RefId = refId;
            if (cmp == null) Refs.Remove(refId);
            else Refs[refId] = new WeakReference<IReactComponent>(cmp);
        }

        public object GetRef(int refId, bool ensureUpdate = false)
        {
            if (ensureUpdate) FlushCommands();

            if (!Refs.TryGetValue(refId, out var cmp)) return null;
            if (!cmp.TryGetTarget(out var target)) return null;
            return target;
        }

        IEnumerator<KeyValuePair<string, object>> PropsEnumerator(JToken props)
        {
            foreach (JProperty child in props)
            {
                var val = child.Value;
                object value = null;

                if (child.Name == "style" || child.Name == "data")
                    value = MultiEnumerator(val, true);
                else
                {
                    switch (val.Type)
                    {
                        case JTokenType.Integer:
                            value = val.Value<int>();
                            break;
                        case JTokenType.Float:
                            value = val.Value<float>();
                            break;
                        case JTokenType.Boolean:
                            value = val.Value<bool>();
                            break;
                        case JTokenType.TimeSpan:
                        case JTokenType.Guid:
                        case JTokenType.Date:
                        case JTokenType.Uri:
                        case JTokenType.String:
                            value = val.ToString();
                            break;
                        case JTokenType.Null:
                        case JTokenType.Undefined:
                        case JTokenType.Raw:
                        case JTokenType.Bytes:
                        case JTokenType.None:
                        case JTokenType.Object:
                        case JTokenType.Array:
                        case JTokenType.Constructor:
                        case JTokenType.Property:
                        case JTokenType.Comment:
                        default:
                            break;
                    }
                }

                yield return new KeyValuePair<string, object>(child.Name, value);
            }
        }

        IEnumerator<KeyValuePair<string, object>> EventsEnumerator(JToken events, bool eventsAsObjects = false)
        {
            foreach (JProperty child in events)
            {
                var ind = child.Value.Value<int>();
                var callback = ind <= 0 ? null :
                    (eventsAsObjects ?
                        GetEventAsObjectCallback.Call(ind) :
                        Callback.From(ind, this, allowIndexedCallbacks: true));
                yield return new KeyValuePair<string, object>(child.Name, callback);
            }
        }

        IEnumerator<KeyValuePair<string, object>> ObjectsEnumerator(JToken objs)
        {
            foreach (JProperty child in objs)
            {
                var ind = child.Value.Value<int>();
                var obj = ind <= 0 ? null : GetObjectCallback.Call(ind);
                yield return new KeyValuePair<string, object>(child.Name, obj);
            }
        }

        IEnumerator<KeyValuePair<string, object>> MultiEnumerator(JToken val, bool eventsAsObjects = false)
        {
            if (val == null) yield break;

            var events = val["e"];
            var props = val["p"];
            var objs = val["o"];

            if (events != null)
            {
                var ee = EventsEnumerator(events, eventsAsObjects);
                while (ee.MoveNext()) yield return ee.Current;
            }

            if (props != null)
            {
                var pe = PropsEnumerator(props);
                while (pe.MoveNext()) yield return pe.Current;
            }

            if (objs != null)
            {
                var oe = ObjectsEnumerator(objs);
                while (oe.MoveNext()) yield return oe.Current;
            }
        }

        public void FlushCommands(string serializedCommands = null)
        {
            using (ReactProfiling.FlushCommands.Auto())
            {
                if (IsDisposed) return;

                if (serializedCommands == null)
                {
                    if (CommandsCallback == null) return;

                    serializedCommands = CommandsCallback.Call().ToString();
                }
                var jo = JArray.Parse(serializedCommands);

                // Temporarily hold a reference of all created items
                // Otherwise, under stress, items may be disposed before this method completes
                // See https://github.com/ReactUnity/core/issues/88
                var recentCreatedElements = new LinkedList<IReactComponent>();

                for (int i = 0; i < jo.Count; i++)
                {
                    var cmd = jo[i];

                    // Shorter commands serialization, but more obscure
                    if (cmd[0].Type == JTokenType.Integer)
                    {
                        var key = cmd[0].Value<int>();

                        if (key == 0)
                        {
                            var refId = cmd[1].Value<int>();
                            var type = cmd[2].ToString();
                            var props = cmd[3];
                            var poolKey = cmd[4]?.ToString();
                            var el = ReactUnityBridge.Instance.createElement(type, null, Host, MultiEnumerator(props), poolKey);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == 1)
                        {
                            var refId = cmd[1].Value<int>();
                            var children = cmd[2]?.ToString();
                            var el = ReactUnityBridge.Instance.createText(children, Host);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == 2)
                        {
                            var parentRef = cmd[1].Value<int>();
                            var childRef = cmd[2].Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (key == 3)
                        {
                            var parentRef = cmd[1].Value<int>();
                            var childRef = cmd[2].Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            ReactUnityBridge.Instance.removeChild(parent, child);
                        }
                        else if (key == 4)
                        {
                            var parentRef = cmd[1].Value<int>();
                            var childRef = cmd[2].Value<int>();
                            var insertRef = cmd[3]?.Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            if (insertRef.HasValue)
                            {
                                var insert = GetRef(insertRef.Value);
                                ReactUnityBridge.Instance.insertBefore(parent, child, insert);
                            }
                            else ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (key == 5)
                        {
                            var refId = cmd[1].Value<int>();
                            var el = GetRef(refId);
                            var type = cmd[2].ToString();
                            var props = cmd[3];

                            ReactUnityBridge.Instance.applyUpdate(el, MultiEnumerator(props), type);
                        }
                        else if (key == 6)
                        {
                            var elRef = cmd[1].Value<int>();
                            var el = GetRef(elRef);
                            var text = cmd[2]?.ToString();
                            ReactUnityBridge.Instance.setText(el, text);
                        }
                        else if (key == 7)
                        {
                            var elRef = cmd[1].Value<int>();
                            var el = GetRef(elRef);
                            var hidden = cmd[2].Value<bool>();

                            if (el is IReactComponent elr)
                                elr?.ClassList.Toggle("react-unity__renderer__hidden", hidden);
                        }
                        else if (key == 8)
                        {
                            ReactUnityBridge.Instance.clearContainer(Host);
                        }
                    }
                    else
                    {
                        var key = cmd[0].ToString();
                        var val = cmd[1];

                        if (key == "c")
                        {
                            var refId = val["r"].Value<int>();
                            var type = val["t"].ToString();
                            var poolKey = val["k"]?.ToString();
                            var el = ReactUnityBridge.Instance.createElement(type, null, Host, MultiEnumerator(val), poolKey);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == "t")
                        {
                            var refId = val["r"].Value<int>();
                            var children = val["c"].ToString();
                            var el = ReactUnityBridge.Instance.createText(children, Host);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == "a")
                        {
                            var parentRef = val["p"].Value<int>();
                            var childRef = val["c"].Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (key == "r")
                        {
                            var parentRef = val["p"].Value<int>();
                            var childRef = val["c"].Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            ReactUnityBridge.Instance.removeChild(parent, child);
                        }
                        else if (key == "i")
                        {
                            var parentRef = val["p"].Value<int>();
                            var childRef = val["c"].Value<int>();
                            var insertRef = val["i"].Value<int>();
                            var parent = GetRef(parentRef);
                            var child = GetRef(childRef);
                            var insert = GetRef(insertRef);
                            ReactUnityBridge.Instance.insertBefore(parent, child, insert);
                        }
                        else if (key == "u")
                        {
                            var refId = val["r"].Value<int>();
                            var el = GetRef(refId);
                            var type = val["t"].ToString();

                            ReactUnityBridge.Instance.applyUpdate(el, MultiEnumerator(val), type);
                        }
                        else if (key == "x")
                        {
                            var elRef = val["r"].Value<int>();
                            var el = GetRef(elRef);
                            var text = val["c"]?.ToString();
                            ReactUnityBridge.Instance.setText(el, text);
                        }
                        else if (key == "h")
                        {
                            var elRef = val["r"].Value<int>();
                            var el = GetRef(elRef);
                            var hidden = val["h"].Value<bool>();

                            if (el is IReactComponent elr)
                                elr?.ClassList.Toggle("react-unity__renderer__hidden", hidden);
                        }
                        else if (key == "o")
                        {
                            ReactUnityBridge.Instance.clearContainer(Host);
                        }
                    }
                }

                foreach (var item in recentCreatedElements)
                {
                    if (item.Parent == null) HandleOrphanElement(item);
                }

                recentCreatedElements.Clear();
            }
        }

        protected virtual void HandleOrphanElement(IReactComponent element) { }
    }
}
