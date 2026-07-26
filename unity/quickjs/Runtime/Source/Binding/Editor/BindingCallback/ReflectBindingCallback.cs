using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using QuickJS.Native;

namespace QuickJS.Binding
{
    /// <summary>
    /// the BindingCallback implementation of ReflectBind mode, no source will be actually emitted in ReflectBind mode.
    /// Dynamic types bridges will be generated at the runtime for all types, methods and delegates.
    /// </summary>
    public class ReflectBindingCallback : IBindingCallback
    {
        /// <summary>
        /// With this lazy typedb the delegates implementations will be dynamically generated util the first time use
        /// </summary>
        protected class LazyTypeDB : Utils.ITypeDB
        {
            private BindingManager _bindingManager;
            private Utils.ITypeDB _backend;

            public LazyTypeDB(BindingManager bindingManager, Utils.ITypeDB backend)
            {
                _bindingManager = bindingManager;
                _backend = backend;
            }

            public int Count => _backend.Count;

            public void AddDelegate(Type type, MethodInfo method)
            {
                _backend.AddDelegate(type, method);
            }

            public int AddType(Type type, JSValue proto)
            {
                return _backend.AddType(type, proto);
            }

            public DynamicType CreateFreeDynamicType(Type type)
            {
                return _backend.CreateFreeDynamicType(type);
            }

            public void Destroy()
            {
                _backend.Destroy();
            }

            public JSValue FindChainedPrototypeOf(Type cType, out int type_id)
            {
                return _backend.FindChainedPrototypeOf(cType, out type_id);
            }

            public JSValue FindChainedPrototypeOf(Type cType)
            {
                return _backend.FindChainedPrototypeOf(cType);
            }

            public JSValue FindChainedPrototypeOf(Type cType, out Type pType)
            {
                return _backend.FindChainedPrototypeOf(cType, out pType);
            }

            public JSValue FindPrototypeOf(Type type, out int type_id)
            {
                return _backend.FindPrototypeOf(type, out type_id);
            }

            public JSValue GetConstructorOf(Type type)
            {
                return _backend.GetConstructorOf(type);
            }

            public MethodInfo GetDelegateFunc(Type delegateType)
            {
                var func = _backend.GetDelegateFunc(delegateType);
                if (func == null)
                {
                    var invoke = delegateType.GetMethod("Invoke");
                    var returnType = invoke.ReturnType;
                    var parameters = invoke.GetParameters();
                    var method = _bindingManager.GetReflectedDelegateMethod(returnType, parameters);

                    _backend.AddDelegate(delegateType, method);
                    return method;
                }
                return func;
            }

            public IDynamicField GetDynamicField(int index)
            {
                return _backend.GetDynamicField(index);
            }

            public IDynamicMethod GetDynamicMethod(int index)
            {
                return _backend.GetDynamicMethod(index);
            }

            public DynamicType GetDynamicType(Type type, bool privateAccess)
            {
                return _backend.GetDynamicType(type, privateAccess);
            }

            public JSValue GetPrototypeOf(Type type)
            {
                return _backend.GetPrototypeOf(type);
            }

            public Type GetType(int index)
            {
                return _backend.GetType(index);
            }

            public int GetTypeID(Type type)
            {
                return _backend.GetTypeID(type);
            }

            public bool IsConstructorEquals(Type type, JSValue ctor)
            {
                return _backend.IsConstructorEquals(type, ctor);
            }

            public JSValue NewDynamicConstructor(JSAtom name, IDynamicMethod method)
            {
                return _backend.NewDynamicConstructor(name, method);
            }

            public JSValue NewDynamicDelegate(JSAtom name, Delegate d)
            {
                return _backend.NewDynamicDelegate(name, d);
            }

            public void NewDynamicFieldAccess(JSAtom name, IDynamicField field, out JSValue getter, out JSValue setter)
            {
                _backend.NewDynamicFieldAccess(name, field, out getter, out setter);
            }

            public JSValue NewDynamicMethod(JSAtom name, JSCFunction method)
            {
                return _backend.NewDynamicMethod(name, method);
            }

            public JSValue NewDynamicMethod(JSAtom name, IDynamicMethod method)
            {
                return _backend.NewDynamicMethod(name, method);
            }

            public bool TryGetPrototypeOf(Type type, out JSValue proto)
            {
                return _backend.TryGetPrototypeOf(type, out proto);
            }
        }

        private ScriptRuntime _runtime;
        private BindingManager _bindingManager;
        private Module.ProxyModuleRegister _moduleReg;

        public ReflectBindingCallback(ScriptRuntime runtime)
        {
            _runtime = runtime;

            ReflectBindValueOp.Register<string>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<bool>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<char>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<byte>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<sbyte>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<double>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<float>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<short>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<ushort>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<int>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<uint>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<long>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<ulong>(Binding.Values.js_push_primitive, Binding.Values.js_get_primitive);
            ReflectBindValueOp.Register<DateTime>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);

#if !JSB_UNITYLESS
            ReflectBindValueOp.Register<UnityEngine.Vector2>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Vector2Int>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Vector3>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Vector3Int>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Vector4>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Rect>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Quaternion>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.LayerMask>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Ray>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Color>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Color32>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
            ReflectBindValueOp.Register<UnityEngine.Matrix4x4>(Binding.Values.js_push_structvalue, Binding.Values.js_get_structvalue);
#endif

            if (!CodeGenUtils.IsCodeEmitSupported())
            {
                runtime.GetLogger().Write(Utils.LogLevel.Warn, CodeGenUtils.CodeEmitWarning);
            }
        }

        public void OnBindingBegin(BindingManager bindingManager)
        {
            _bindingManager = bindingManager;
            _runtime.ReplaceTypeDB(new LazyTypeDB(_bindingManager, _runtime.GetTypeDB()));
        }

        public void OnBindingEnd()
        {
        }

        public void BindRawTypes(ICollection<RawTypeBindingInfo> rawTypes)
        {
            if (rawTypes.Count == 0)
            {
                return;
            }

            var register = _runtime.GetMainContext().CreateTypeRegister();
            var parameters = new object[] { register, null };
            foreach (var type in rawTypes)
            {
                try
                {
                    parameters[1] = type.jsName;
                    if (!register.IsGlobalRegistered(type.jsName))
                    {
                        type.method.Invoke(null, parameters);
                    }
                }
                catch (Exception exception)
                {
                    _bindingManager.Error(exception);
                }
            }
            register.Finish();
        }

        public void BeginStaticModule(string moduleName, int capacity)
        {
            _moduleReg = _runtime.AddStaticModuleProxy(moduleName);
        }

        public void AddTypeReference(string moduleName, TypeBindingInfo typeBindingInfo)
        {
            _runtime.AddTypeReference(_moduleReg, typeBindingInfo.type, register => typeBindingInfo.DoReflectBind(register, _moduleReg), typeBindingInfo.preload, typeBindingInfo.tsTypeNaming.jsFullNameForReflectBind);
        }

        public void EndStaticModule(string moduleName)
        {
        }

        public void AddDelegate(DelegateBridgeBindingInfo bindingInfo)
        {
            // unnecessary to generate delegate binding at the bind-generating phase
        }
    }
}
