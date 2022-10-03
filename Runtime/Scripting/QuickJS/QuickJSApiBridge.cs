#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS

using System;
using System.Collections;
using System.Collections.Generic;
using QuickJS;
using QuickJS.Experimental;
using QuickJS.Native;
using static UnityEngine.GraphicsBuffer;
using QScriptContext = QuickJS.ScriptContext;

namespace ReactUnity.Scripting
{
    public class QuickJSApiBridge : IJSApiBridge, IDisposable
    {
        public const string KeyForCSharpIdentity = "__csharp_host_identity__";

        private ScriptFunction createDictionaryProxy;
        private ScriptFunction createListProxy;

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
                var proxy = JSApi.JS_UNDEFINED;
                if (typeof(IDictionary<string, object>).IsAssignableFrom(o.GetType()))
                {
                    proxy = CreateDictionaryProxy(context, val);

                }
                else if (typeof(IList).IsAssignableFrom(o.GetType()))
                {
                    proxy = CreateListProxy(context, val);
                }

                if (!proxy.IsUndefined())
                {
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

        private JSValue UseProxyCreator(QScriptContext context, JSValue target, ScriptFunction creator)
        {
            var ctx = (JSContext) context;

            var proxy = creator.Invoke<ScriptValue>(target);
            var res = JSApi.JS_DupValue(ctx, proxy);
            proxy.Dispose();
            JSApi.JS_FreeValue(ctx, target);
            return res;
        }

        private JSValue CreateDictionaryProxy(QScriptContext context, JSValue target)
        {
            var creator = createDictionaryProxy ??
                (createDictionaryProxy = CreateDictionaryProxyCreator(context));
            return UseProxyCreator(context, target, creator);
        }

        private JSValue CreateListProxy(QScriptContext context, JSValue target)
        {
            var creator = createListProxy ??
                (createListProxy = CreateListProxyCreator(context));
            return UseProxyCreator(context, target, creator);
        }

        private static unsafe ScriptFunction CreateDictionaryProxyCreator(QScriptContext _context)
        {
            var ctx = (JSContext) _context;

            var proxyCreator = _context.EvalSource<ScriptFunction>(@"
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

            var proxy = proxyCreator.Invoke<ScriptFunction>(prs);

            proxyCreator.Dispose();

            return proxy;
        }

        private static unsafe ScriptFunction CreateListProxyCreator(QScriptContext _context)
        {
            var ctx = (JSContext) _context;

            var proxyCreator = _context.EvalSource<ScriptFunction>(@"
function createListProxyCreator (getLength, getter, setter) {
    return function createListProxy(targetProxy) {
        return new Proxy(targetProxy, {
            get(target, key, receiver) {
                if(key === '" + KeyForCSharpIdentity + @"') return target;

                if(key === Symbol.iterator) return function* () {
                    const length = getLength(target);
                    for (let i = 0; i < length; i++) {
                        yield getter(target, i);
                    }
                };

                if(key === 'length') return getLength(target);

                if(typeof key === 'string') {
                    const parsed = parseInt(key);
                    if (parsed >= 0 && key === parsed + '') {
                        const length = getLength(target);
                        if (parsed < length) return getter(target, parsed);
                    }
                }
                var res = target[key];
                return res;
            },
            set(target, key, value) {
                if(typeof key === 'string') {
                    const parsed = parseInt(key);
                    if (parsed >= 0 && key === parsed + '') {
                        const length = getLength(target);
                        if (parsed < length) {
                            setter(target, parsed, value);
                            return true;
                        }
                    }
                }

                target[key] = value;
                return true;
            },
            has(target, key) {
                if(typeof key === 'string') {
                    const parsed = parseInt(key);
                    if (parsed >= 0 && key === parsed + '') {
                        const length = getLength(target);
                        if (parsed < length) {
                            return true;
                        }
                    }
                }
                return key === 'length';
            },
            deleteProperty(target, key) {
                remover(target, key);
                return true;
            },
            ownKeys(target) {
                const length = getLength(target);
                const res = [];
                for (let i = 0; i < length; i++) {
                    res.push(i + '');
                }
                return res;
            },
            getOwnPropertyDescriptor(target, key) {

                if(typeof key === 'string') {
                    const parsed = parseInt(key);
                    if (parsed >= 0 && key === parsed + '') {
                        const length = getLength(target);
                        if (parsed < length) {
                            return {
                                value: getter(target, parsed),
                                enumerable: true,
                                configurable: true
                            };
                        }
                    }
                }

                return undefined;
            },
        });
    };
}
createListProxyCreator;
", "ReactUnity/quickjs/createListProxy");

            var getLength = new Func<IList, int>(
                (IList dc) => {
                    return dc.Count;
                });

            var getter = new Func<IList, int, object>(
                (IList dc, int key) => {
                    return dc[key];
                });

            var setter = new Action<IList, int, object>(
                (IList dc, int key, object value) => {
                    dc[key] = value;
                });

            var prs = new object[] {
                getLength,
                getter,
                setter,
            };

            var proxy = proxyCreator.Invoke<ScriptFunction>(prs);

            proxyCreator.Dispose();

            return proxy;
        }

        public void Dispose()
        {
            createDictionaryProxy?.Dispose();
            createDictionaryProxy = null;
            createListProxy?.Dispose();
            createListProxy = null;
        }
    }
}

#endif
