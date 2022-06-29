#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS

using System;
using System.Collections.Generic;
using QuickJS;
using QuickJS.Experimental;
using QuickJS.Native;
using QScriptContext = QuickJS.ScriptContext;

namespace ReactUnity.Scripting
{
    public class QuickJSApiBridge : IJSApiBridge, IDisposable
    {
        public const string KeyForCSharpIdentity = "__csharp_host_identity__";

        private ScriptFunction createDictionaryProxy;

        public JSPayloadHeader GetPayloadHeader(QScriptContext context, JSValue val)
        {
            JSContext ctx = context;
            bool valueDuplicated = false;

            if (val.IsObject())
            {
                var identityAtom = context.GetAtom(KeyForCSharpIdentity);
                var identity = JSApi.JS_GetProperty(ctx, val, identityAtom);
                if (!identity.IsNullish())
                {
                    val = identity;
                    valueDuplicated = true;
                }
            }

            var header = JSApi.jsb_get_payload_header(ctx, val);

            if (valueDuplicated)
            {
                JSApi.JS_FreeValue(ctx, val);
            }
            return header;
        }

        public JSValue NewBridgeObject(QScriptContext context, object o, JSValue proto)
        {
            var cache = context.GetObjectCache();
            var object_id = cache.AddObject(o, false);
            var val = JSApi.jsb_new_bridge_object(context, proto, object_id);

            if (val.IsException())
            {
                cache.RemoveObject(object_id);
            }
            else
            {
                if (typeof(IDictionary<string, object>).IsAssignableFrom(o.GetType()))
                {
                    var proxy = CreateDictionaryProxy(context, val);
                    if (proxy.IsException())
                    {
                        JSApi.JS_FreeValue(context, proxy);
                        cache.RemoveObject(object_id);
                        return proxy;
                    }
                    val = proxy;
                }

                cache.AddJSValue(o, val);
            }

            return val;
        }

        private JSValue CreateDictionaryProxy(QScriptContext context, JSValue target)
        {
            var creator = createDictionaryProxy ??
                (createDictionaryProxy = CreateDictionaryProxyCreator(context));

            var ctx = (JSContext) context;

            var proxy = creator.Invoke<ScriptValue>(target);
            var res = JSApi.JS_DupValue(ctx, proxy);
            proxy.Dispose();
            JSApi.JS_FreeValue(ctx, target);
            return res;
        }

        private static unsafe ScriptFunction CreateDictionaryProxyCreator(QScriptContext _context)
        {
            var ctx = (JSContext) _context;

            var createDictionaryProxyCreator = _context.EvalSource<ScriptFunction>(@"
function createDictionaryProxyCreator (contains, getter, setter, remover, keys) {
    return function createDictionaryProxy(targetProxy) {
        return new Proxy(targetProxy, {
            get(target, key, receiver) {
                if(key === '" + KeyForCSharpIdentity + @"') return target;
                if(typeof key === 'string' && contains(target, key)) return getter(target, key);
                var res = target[key];
                return res;
            },
            set(target, key, value) {
                if(typeof key === 'string') setter(target, key, value);
                else target[key] = value;
                return true;
            },
            has(target, key) {
                return contains(target, key);
            },
            deleteProperty(target, key) {
                remover(target, key);
                return true;
            },
            ownKeys(target) {
                return keys(target);
            },
            getOwnPropertyDescriptor(target, key) {
                if(typeof key === 'string' && contains(target, key)) {
                    return {
                      value: getter(target, key),
                      enumerable: true,
                      configurable: true
                    };
                }
                return undefined;
            },
        });
    };
}
createDictionaryProxyCreator;
", "ReactUnity/quickjs/createDictionaryProxy");

            var contains = new Func<IDictionary<string, object>, string, bool>(
                (IDictionary<string, object> dc, string key) => {
                    return key != null && dc.ContainsKey(key);
                });

            var getter = new Func<IDictionary<string, object>, string, object>(
                (IDictionary<string, object> dc, string key) => {
                    return dc[key];
                });

            var setter = new Action<IDictionary<string, object>, string, object>(
                (IDictionary<string, object> dc, string key, object value) => {
                    dc[key] = value;
                });

            var remover = new Action<IDictionary<string, object>, string>(
                (IDictionary<string, object> dc, string key) => {
                    dc.Remove(key);
                });

            var keys = new Func<IDictionary<string, object>, object>(
                (IDictionary<string, object> dc) => {
                    var items = dc.Keys;
                    var len = items.Count;
                    var arr = new string[len];
                    var i = 0;
                    foreach (var item in items)
                        arr[i++] = item;
                    return arr;
                });

            var prs = new object[] {
                contains,
                getter,
                setter,
                remover,
                keys,
            };

            var createDictionaryProxy = createDictionaryProxyCreator.Invoke<ScriptFunction>(prs);

            createDictionaryProxyCreator.Dispose();

            return createDictionaryProxy;
        }

        public void Dispose()
        {
            createDictionaryProxy?.Dispose();
            createDictionaryProxy = null;
        }
    }
}

#endif
