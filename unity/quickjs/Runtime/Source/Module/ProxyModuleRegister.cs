using System;
using System.Collections.Generic;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    public class ProxyModuleRegister : IModuleRegister
    {
        private ScriptRuntime _runtime;
        //TODO need optimization
        private Dictionary<Type, TypeReg> _types;
        //TODO need optimization
        private List<Type> _preload;
        //TODO need optimization
        private Dictionary<string, List<Type>> _cluster;
        private string _module_id;
        private JSValue _typeCache = JSApi.JS_UNDEFINED;

        public bool isReloadSupported => false;

        public ProxyModuleRegister(ScriptRuntime runtime, string module_id)
        {
            _module_id = module_id;
            _types = new Dictionary<Type, TypeReg>();
            _cluster = new Dictionary<string, List<Type>>();
            _preload = new List<Type>();
            _runtime = runtime;
        }

        public void Unload()
        {
            if (!_typeCache.IsUndefined())
            {
                var exports = _typeCache;
                _typeCache = JSApi.JS_UNDEFINED;
                _runtime.FreeValue(exports);
            }
        }

        public void Add(Type type, ModuleExportsBind bind, bool preload, string[] ns)
        {
            _types[type] = new TypeReg()
            {
                ns = ns,
                bind = bind,
            };
            List<Type> list;
            if (!_cluster.TryGetValue(ns[0], out list))
            {
                _cluster[ns[0]] = list = new List<Type>();
            }
            list.Add(type);
            if (preload)
            {
                _preload.Add(type);
            }
        }

        // type will be loaded only once
        public bool LoadType(ScriptContext context, Type type)
        {
            TypeReg reg;
            if (_types.TryGetValue(type, out reg))
            {
                _types.Remove(type);

                var typeRegister = context.CreateTypeRegister();
                var clazz = reg.bind(typeRegister);
                if (_typeCache.IsUndefined())
                {
                    _typeCache = JSApi.JS_NewObject(context);
                }
                SetClassNamespace(typeRegister, _typeCache, clazz.GetConstructor(), reg.ns, 0);
                LoadTypeCluster(context, reg.ns[0]);
                typeRegister.Finish();
                return true;
            }
            return false;
        }

        public JSValue _LoadType(ScriptContext context, string topLevelNamespace)
        {
            if (_typeCache.IsUndefined())
            {
                _typeCache = JSApi.JS_NewObject(context);
            }
            LoadTypeCluster(context, topLevelNamespace);
            return JSApi.JS_GetProperty(context, _typeCache, context.GetAtom(topLevelNamespace));
        }

        private void LoadTypeCluster(ScriptContext context, string topLevelNamespace)
        {
            List<Type> list;
            if (_cluster.TryGetValue(topLevelNamespace, out list))
            {
                _cluster.Remove(topLevelNamespace);

                var typeRegister = context.CreateTypeRegister();
                for (int i = 0, count = list.Count; i < count; ++i)
                {
                    LoadType(context, list[i]);
                }
                typeRegister.Finish();
            }
        }

        private void SetClassNamespace(TypeRegister register, JSValue thisObject, JSValue constructor, string[] ns, int index)
        {
            var ctx = (JSContext)register;
            var name = register.GetAtom(ns[index]);

            if (index == ns.Length - 1)
            {
                JSApi.JS_SetProperty(ctx, thisObject, name, constructor);
            }
            else
            {
                var tValue = JSApi.JS_GetProperty(ctx, thisObject, name);

                if (!tValue.IsObject())
                {
                    tValue = JSApi.JS_NewObject(ctx);
                    JSApi.JS_SetProperty(ctx, thisObject, name, JSApi.JS_DupValue(ctx, tValue));
                }

                SetClassNamespace(register, tValue, constructor, ns, index + 1);
                JSApi.JS_FreeValue(ctx, tValue);
            }
        }

        // the given exports object is ignored, type loader uses a Proxy object as new exports
        public unsafe JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj)
        {
            var ctx = (JSContext)context;
            var sourceString = @"(function (cache, resolved_id) {
                return new Proxy(cache, {
                    get: function (target, p) {
                        let o = target[p];
                        if (typeof o === 'undefined') {
                            o = require('jsb').$LoadType(resolved_id, p);
                        }
                        return o;
                    }
                }); 
            })";
            if (_typeCache.IsUndefined())
            {
                _typeCache = JSApi.JS_NewObject(context);
            }

            var typeRegister = context.CreateTypeRegister();
            for (int i = 0, count = _preload.Count; i < count; ++i)
            {
                LoadType(context, _preload[i]);
            }
            _preload.Clear();
            typeRegister.Finish();
            var proxyGen = ScriptRuntime.EvalSource(ctx, sourceString, "eval", false);
            var argv = stackalloc JSValue[2]
            {
                JSApi.JS_DupValue(ctx, _typeCache),
                ctx.NewString(_module_id),
            };
            var retVal = JSApi.JS_Call(ctx, proxyGen, JSApi.JS_UNDEFINED, 2, argv);
            JSApi.JS_FreeValue(ctx, proxyGen);
            JSApi.JS_FreeValue(ctx, argv[0]);
            JSApi.JS_FreeValue(ctx, argv[1]);
            JSApi.JS_SetProperty(ctx, module_obj, context.GetAtom("exports"), JSApi.JS_DupValue(ctx, retVal));
            return retVal;
        }
    }
}
