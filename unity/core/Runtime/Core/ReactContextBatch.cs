using System;
using System.Collections.Generic;
using System.Globalization;
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

        IEnumerator<KeyValuePair<string, object>> PropsEnumerator(JsonObject props)
        {
            for (int i = 0; i < props.Count; i++)
            {
                var child = props[i];
                var val = child.Value;
                object value;

                if (child.Key == "style" || child.Key == "data")
                    value = MultiEnumerator(val, true);
                else
                {
                    switch (val)
                    {
                        case int n: value = n; break;
                        case double d: value = (float) d; break;
                        case bool b: value = b; break;
                        case string s: value = s; break;
                        default: value = null; break;
                    }
                }

                yield return new KeyValuePair<string, object>(child.Key, value);
            }
        }

        IEnumerator<KeyValuePair<string, object>> EventsEnumerator(JsonObject events, bool eventsAsObjects = false)
        {
            for (int i = 0; i < events.Count; i++)
            {
                var ind = ToInt(events[i].Value);
                var callback = ind <= 0 ? null :
                    (eventsAsObjects ?
                        GetEventAsObjectCallback.Call(ind) :
                        Callback.From(ind, this, allowIndexedCallbacks: true));
                yield return new KeyValuePair<string, object>(events[i].Key, callback);
            }
        }

        IEnumerator<KeyValuePair<string, object>> ObjectsEnumerator(JsonObject objs)
        {
            for (int i = 0; i < objs.Count; i++)
            {
                var ind = ToInt(objs[i].Value);
                var obj = ind <= 0 ? null : GetObjectCallback.Call(ind);
                yield return new KeyValuePair<string, object>(objs[i].Key, obj);
            }
        }

        IEnumerator<KeyValuePair<string, object>> MultiEnumerator(object val, bool eventsAsObjects = false)
        {
            // `style={undefined}` is a prop that is present and null, so it has no buckets to read.
            if (!(val is JsonObject obj)) yield break;

            if (obj["e"] is JsonObject events)
            {
                var ee = EventsEnumerator(events, eventsAsObjects);
                while (ee.MoveNext()) yield return ee.Current;
            }

            if (obj["p"] is JsonObject props)
            {
                var pe = PropsEnumerator(props);
                while (pe.MoveNext()) yield return pe.Current;
            }

            if (obj["o"] is JsonObject objs)
            {
                var oe = ObjectsEnumerator(objs);
                while (oe.MoveNext()) yield return oe.Current;
            }
        }

        static object At(List<object> cmd, int index) => index < cmd.Count ? cmd[index] : null;

        static int ToInt(object value) => Convert.ToInt32(value, CultureInfo.InvariantCulture);

        // A JSON null reads as "", which is what Newtonsoft gave, and what a pool key without `pool` relies on.
        static string ToStr(object value) => value == null ? "" : Convert.ToString(value, CultureInfo.InvariantCulture);

        static string StrAt(List<object> cmd, int index) => index < cmd.Count ? ToStr(cmd[index]) : null;

        static string StrAt(JsonObject obj, string key) => obj.TryGetValue(key, out var value) ? ToStr(value) : null;

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
                var jo = (List<object>) JsonReader.Parse(serializedCommands);

                // Temporarily hold a reference of all created items
                // Otherwise, under stress, items may be disposed before this method completes
                // See https://github.com/ReactUnity/core/issues/88
                var recentCreatedElements = new LinkedList<IReactComponent>();

                for (int i = 0; i < jo.Count; i++)
                {
                    var cmd = (List<object>) jo[i];

                    // Shorter commands serialization, but more obscure
                    if (cmd[0] is int key)
                    {
                        if (key == 0)
                        {
                            var refId = ToInt(cmd[1]);
                            var type = StrAt(cmd, 2);
                            var props = At(cmd, 3);
                            var poolKey = StrAt(cmd, 4);
                            var el = ReactUnityBridge.Instance.createElement(type, null, Host, MultiEnumerator(props), poolKey);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == 1)
                        {
                            var refId = ToInt(cmd[1]);
                            var children = StrAt(cmd, 2);
                            var el = ReactUnityBridge.Instance.createText(children, Host);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (key == 2)
                        {
                            var parent = GetRef(ToInt(cmd[1]));
                            var child = GetRef(ToInt(cmd[2]));
                            ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (key == 3)
                        {
                            var parent = GetRef(ToInt(cmd[1]));
                            var child = GetRef(ToInt(cmd[2]));
                            ReactUnityBridge.Instance.removeChild(parent, child);
                        }
                        else if (key == 4)
                        {
                            var parent = GetRef(ToInt(cmd[1]));
                            var child = GetRef(ToInt(cmd[2]));
                            var insertRef = At(cmd, 3);
                            if (insertRef != null)
                            {
                                var insert = GetRef(ToInt(insertRef));
                                ReactUnityBridge.Instance.insertBefore(parent, child, insert);
                            }
                            else ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (key == 5)
                        {
                            var el = GetRef(ToInt(cmd[1]));
                            var type = StrAt(cmd, 2);
                            var props = At(cmd, 3);

                            ReactUnityBridge.Instance.applyUpdate(el, MultiEnumerator(props), type);
                        }
                        else if (key == 6)
                        {
                            var el = GetRef(ToInt(cmd[1]));
                            var text = StrAt(cmd, 2);
                            ReactUnityBridge.Instance.setText(el, text);
                        }
                        else if (key == 7)
                        {
                            var el = GetRef(ToInt(cmd[1]));
                            var hidden = Convert.ToBoolean(cmd[2], CultureInfo.InvariantCulture);

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
                        var legacyKey = ToStr(cmd[0]);
                        var val = At(cmd, 1) as JsonObject ?? new JsonObject();

                        if (legacyKey == "c")
                        {
                            var refId = ToInt(val["r"]);
                            var type = StrAt(val, "t");
                            var poolKey = StrAt(val, "k");
                            var el = ReactUnityBridge.Instance.createElement(type, null, Host, MultiEnumerator(val), poolKey);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (legacyKey == "t")
                        {
                            var refId = ToInt(val["r"]);
                            var children = StrAt(val, "c");
                            var el = ReactUnityBridge.Instance.createText(children, Host);
                            if (refId > 0)
                            {
                                SetRef(refId, el);
                                recentCreatedElements.AddLast(el);
                            }
                        }
                        else if (legacyKey == "a")
                        {
                            var parent = GetRef(ToInt(val["p"]));
                            var child = GetRef(ToInt(val["c"]));
                            ReactUnityBridge.Instance.appendChild(parent, child);
                        }
                        else if (legacyKey == "r")
                        {
                            var parent = GetRef(ToInt(val["p"]));
                            var child = GetRef(ToInt(val["c"]));
                            ReactUnityBridge.Instance.removeChild(parent, child);
                        }
                        else if (legacyKey == "i")
                        {
                            var parent = GetRef(ToInt(val["p"]));
                            var child = GetRef(ToInt(val["c"]));
                            var insert = GetRef(ToInt(val["i"]));
                            ReactUnityBridge.Instance.insertBefore(parent, child, insert);
                        }
                        else if (legacyKey == "u")
                        {
                            var el = GetRef(ToInt(val["r"]));
                            var type = StrAt(val, "t");

                            ReactUnityBridge.Instance.applyUpdate(el, MultiEnumerator(val), type);
                        }
                        else if (legacyKey == "x")
                        {
                            var el = GetRef(ToInt(val["r"]));
                            var text = StrAt(val, "c");
                            ReactUnityBridge.Instance.setText(el, text);
                        }
                        else if (legacyKey == "h")
                        {
                            var el = GetRef(ToInt(val["r"]));
                            var hidden = Convert.ToBoolean(val["h"], CultureInfo.InvariantCulture);

                            if (el is IReactComponent elr)
                                elr?.ClassList.Toggle("react-unity__renderer__hidden", hidden);
                        }
                        else if (legacyKey == "o")
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
