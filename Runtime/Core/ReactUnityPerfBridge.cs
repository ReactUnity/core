using Jint;
using Jint.Native;
using Jint.Native.Array;
using Jint.Native.Object;
using ReactUnity.Helpers.TypescriptUtils;
using System.Collections.Generic;
using System.Dynamic;
using System.Reflection;

namespace ReactUnity
{
    [TypescriptInclude]
    internal class ReactUnityPerfBridge
    {
        static private MethodInfo PushMethod;
        private Engine Engine;

        static ReactUnityPerfBridge()
        {
            PushMethod = typeof(ArrayInstance).GetMethod("Push");
        }

        public ReactUnityPerfBridge(Engine engine)
        {
            Engine = engine;
        }

        public object diffProperties2(ObjectInstance lastRawProps, ObjectInstance nextRawProps, int deepDiffing = 0)
        {
            if (lastRawProps == nextRawProps) return null;
            List<object> updatePayload = null;

            var lastProps = lastRawProps;
            var nextProps = nextRawProps;

            var prevKeys = lastProps.GetOwnPropertyKeys();
            foreach (var propKey in prevKeys)
            {
                if (
                  nextProps.HasOwnProperty(propKey)
                  || lastProps.Get(propKey) == null
                )
                {
                    continue;
                }

                JsValue prop = null;
                var depth = deepDiffing > 0 ? deepDiffing : propKey == "style" ? 1 : 0;
                if (depth > 0)
                {
                    var res = diffProperties2(lastProps.Get(propKey) as ObjectInstance, null, depth - 1);
                    if (res == null) continue;
                    prop = JsValue.FromObject(Engine, res);
                }

                // For all other deleted properties we add it to the queue. We use
                // the whitelist in the commit phase instead.
                (updatePayload = updatePayload ?? new List<object>()).Add(propKey);
                updatePayload.Add(prop);
            }
            var nextKeys = nextProps.GetOwnPropertyKeys();
            foreach (var propKey in nextKeys)
            {
                var nextProp = nextProps.Get(propKey);
                var lastProp = lastProps != null ? lastProps.Get(propKey) : null;
                if (
                  nextProp == lastProp
                  || (nextProp == null && lastProp == null)
                )
                {
                    continue;
                }

                var prop = nextProp;
                var depth = deepDiffing > 0 ? deepDiffing : propKey == "style" ? 1 : 0;
                if (depth > 0)
                {
                    var res = diffProperties2(lastProp as ObjectInstance, nextProp as ObjectInstance, depth - 1);
                    if (res == null) continue;
                    prop = JsValue.FromObject(Engine, res);
                }

                (updatePayload = updatePayload ?? new List<object>()).Add(propKey);
                updatePayload.Add(prop);
            }

            return JsValue.FromObject(Engine, updatePayload);
        }

        // TODO: find why calling this causes stack overflow
        public void diffProperties(JsValue lastRawProps, JsValue nextRawProps, int deepDiffing = 0)
        {
        }

        public object diffProperties3(Dictionary<string, object> lastRawProps, Dictionary<string, object> nextRawProps, int deepDiffing = 0)
        {
            if (lastRawProps == nextRawProps) return null;
            List<object> updatePayload = null;

            var lastProps = lastRawProps;
            var nextProps = nextRawProps;

            var prevKeys = lastProps.Keys;
            foreach (var propKey in prevKeys)
            {
                if (
                  nextProps.ContainsKey(propKey)
                  || lastProps[propKey] == null
                )
                {
                    continue;
                }

                JsValue prop = null;
                var depth = deepDiffing > 0 ? deepDiffing : propKey == "style" ? 1 : 0;
                if (depth > 0)
                {
                    var res = diffProperties3(lastProps[propKey] as Dictionary<string, object>, null, depth - 1);
                    if (res == null) continue;
                    prop = JsValue.FromObject(Engine, res);
                }

                // For all other deleted properties we add it to the queue. We use
                // the whitelist in the commit phase instead.
                (updatePayload = updatePayload ?? new List<object>()).Add(propKey);
                updatePayload.Add(prop);
            }
            var nextKeys = nextProps.Keys;
            foreach (var propKey in nextKeys)
            {
                var nextProp = nextProps[propKey];
                var lastProp = lastProps != null ? lastProps[propKey] : null;
                if (
                  nextProp == lastProp
                  || (nextProp == null && lastProp == null)
                )
                {
                    continue;
                }

                var prop = nextProp;
                var depth = deepDiffing > 0 ? deepDiffing : propKey == "style" ? 1 : 0;
                if (depth > 0)
                {
                    var res = diffProperties3(lastProp as Dictionary<string, object>, nextProp as Dictionary<string, object>, depth - 1);
                    if (res == null) continue;
                    prop = JsValue.FromObject(Engine, res);
                }

                (updatePayload = updatePayload ?? new List<object>()).Add(propKey);
                updatePayload.Add(prop);
            }

            return JsValue.FromObject(Engine, updatePayload);
        }

    }
}
