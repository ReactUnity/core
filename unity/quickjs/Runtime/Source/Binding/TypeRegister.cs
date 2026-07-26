using System;
using System.Collections.Generic;
using QuickJS.Native;

namespace QuickJS.Binding
{
    using Utils;

    public class TypeRegister
    {
        private ScriptContext _context;
        private ITypeDB _db;
        private int _refCount;

        // 注册过程中产生的 atom, 完成后自动释放 
        private AtomCache _atoms;
        private List<Type> _pendingTypes = new List<Type>();
        private List<ClassDecl> _pendingClasses = new List<ClassDecl>();
        
        private List<OperatorDecl> _operatorDecls = new List<OperatorDecl>();
        private Dictionary<Type, int> _operatorDeclIndex = new Dictionary<Type, int>();

        public static implicit operator JSContext(TypeRegister register)
        {
            return register._context;
        }

        public ScriptRuntime GetRuntime()
        {
            return _context.GetRuntime();
        }

        public ScriptContext GetContext()
        {
            return _context;
        }

        public IScriptLogger GetLogger()
        {
            return _context.GetLogger();
        }

        public JSAtom GetAtom(string name)
        {
            return _atoms.GetAtom(name);
        }

        public TypeRegister(ScriptContext context)
        {
            _context = context;
            _refCount = 1;
            _atoms = new AtomCache(_context);
            _db = context.GetTypeDB();
        }

        public void AddRef()
        {
            _refCount++;
        }

        public ITypeDB GetTypeDB()
        {
            return _db;
        }

        // 覆盖现有定义
        public ClassDecl CreateClassWithPrototype(Type type, JSValue protoVal)
        {
            JSContext ctx = _context;
            var ctorVal = JSApi.JS_GetProperty(_context, protoVal, JSApi.JS_ATOM_constructor);
            var decl = new ClassDecl(this, ctorVal, protoVal, type);
            JSApi.JS_FreeValue(ctx, ctorVal);
            _pendingClasses.Add(decl);
            return decl;
        }

        public ClassDecl CreateEnum(string typename, Type type)
        {
            return CreateClass(JSApi.JS_UNDEFINED, typename, type, JSNative.class_private_ctor);
        }

        public ClassDecl CreateClass(string typename, Type type, JSCFunctionMagic ctorFunc)
        {
            return CreateClass(JSApi.JS_UNDEFINED, typename, type, ctorFunc);
        }

        public ClassDecl CreateGlobalClass(string typename, Type type, JSCFunctionMagic ctorFunc)
        {
            var globalObject = _context.GetGlobalObject();
            var decl = CreateClass(globalObject, typename, type, ctorFunc);
            JSApi.JS_FreeValue(_context, globalObject);
            return decl;
        }

        public bool IsGlobalRegistered(string typename)
        {
            JSContext ctx = _context;
            var globalObject = _context.GetGlobalObject();
            var prop = JSApi.JS_GetProperty(ctx, globalObject, GetAtom(typename));
            var retVal = !prop.IsNullish();
            JSApi.JS_FreeValue(_context, prop);
            JSApi.JS_FreeValue(_context, globalObject);
            return retVal;
        }

        /// <summary>
        /// 在指定的对象上创建类型
        /// </summary>
        public ClassDecl CreateClass(JSValue nsValue, string typename, Type type, JSCFunctionMagic ctorFunc)
        {
            var nameAtom = GetAtom(typename);
            JSContext ctx = _context;
            var protoVal = JSApi.JS_NewObject(ctx);
            var type_id = RegisterType(type, protoVal);
            var ctorVal = JSApi.JSB_NewConstructor(ctx, ctorFunc, nameAtom, type_id);
            var decl = new ClassDecl(this, ctorVal, protoVal, type);
            JSApi.JS_SetConstructor(ctx, ctorVal, protoVal);
            JSApi.JSB_SetBridgeType(ctx, ctorVal, GetAtom(Values.KeyForCSharpTypeID), type_id);
            JSApi.JSB_SetBridgeType(ctx, protoVal, GetAtom(Values.KeyForCSharpTypeID), type_id);
            if (!nsValue.IsNullish())
            {
                JSApi.JS_DefinePropertyValue(ctx, nsValue, nameAtom, ctorVal);
            }
            else
            {
                JSApi.JS_FreeValue(ctx, ctorVal);
            }
            // Debug.LogFormat("define class {0}: {1}", type, protoVal);
            JSApi.JS_FreeValue(ctx, protoVal);
            _pendingClasses.Add(decl);
            return decl;
        }

        public ClassDecl CreateClass(string typename)
        {
            return CreateClass(JSApi.JS_UNDEFINED, typename);
        }

        public ClassDecl CreateClass(JSValue nsValue, string typename)
        {
            var nameAtom = GetAtom(typename);
            JSContext ctx = _context;
            var protoVal = JSApi.JS_NewObject(ctx);
            var ctorVal = JSApi.JSB_NewConstructor(ctx, JSNative.class_private_ctor, nameAtom, 0);
            var decl = new ClassDecl(this, ctorVal, protoVal, null);
            JSApi.JS_SetConstructor(ctx, ctorVal, protoVal);
            if (!nsValue.IsNullish())
            {
                JSApi.JS_DefinePropertyValue(ctx, nsValue, nameAtom, ctorVal);
            }
            else
            {
                JSApi.JS_FreeValue(ctx, ctorVal);
            }
            // Debug.LogFormat("define class {0}: {1}", type, protoVal);
            JSApi.JS_FreeValue(ctx, protoVal);
            _pendingClasses.Add(decl);
            return decl;
        }

        public ClassDecl CreateClass(string typename, Type type, IDynamicMethod dynamicMethod)
        {
            return CreateClass(JSApi.JS_UNDEFINED, typename, type, dynamicMethod);
        }

        public ClassDecl CreateClass(JSValue nsValue, string typename, Type type, IDynamicMethod dynamicMethod)
        {
            var nameAtom = GetAtom(typename);
            JSContext ctx = _context;
            var protoVal = JSApi.JS_NewObject(ctx);
            var type_id = RegisterType(type, protoVal);
            var ctorVal = _db.NewDynamicConstructor(nameAtom, dynamicMethod);
            var decl = new ClassDecl(this, ctorVal, protoVal, type);
            JSApi.JS_SetConstructor(ctx, ctorVal, protoVal);
            JSApi.JSB_SetBridgeType(ctx, ctorVal, GetAtom(Values.KeyForCSharpTypeID), type_id);
            JSApi.JSB_SetBridgeType(ctx, protoVal, GetAtom(Values.KeyForCSharpTypeID), type_id);
            if (!nsValue.IsNullish())
            {
                JSApi.JS_DefinePropertyValue(ctx, nsValue, nameAtom, ctorVal);
            }
            else
            {
                JSApi.JS_FreeValue(ctx, ctorVal);
            }
            // Debug.LogFormat("define class {0}: {1}", type, protoVal);
            JSApi.JS_FreeValue(ctx, protoVal);
            _pendingClasses.Add(decl);
            return decl;
        }

        // return type id, 不可重复注册
        public int RegisterType(Type type, JSValue proto)
        {
            _pendingTypes.Add(type);
            return _db.AddType(type, proto);
        }

        private void SubmitOperators()
        {
            // 提交运算符重载
            var ctx = (JSContext)_context;
            var operatorCreate = _context.GetOperatorCreate();

            if (!operatorCreate.IsUndefined())
            {
                var count = _operatorDecls.Count;
                for (var i = 0; i < count; i++)
                {
                    _operatorDecls[i].Register(this, ctx, operatorCreate);
                }
            }

            JSApi.JS_FreeValue(ctx, operatorCreate);
            _operatorDeclIndex.Clear();
            _operatorDecls.Clear();
        }

        private OperatorDecl GetOperatorDecl(Type type, out int index)
        {
            if (_operatorDeclIndex.TryGetValue(type, out index))
            {
                return _operatorDecls[index];
            }
            var decl = new OperatorDecl(type);
            index = _operatorDecls.Count;
            _operatorDeclIndex[type] = index;
            _operatorDecls.Add(decl);
            return decl;
        }
        
        public void RegisterOperator(Type type, string op, JSCFunction func, int length)
        {
            RegisterOperator(type, op, JSApi.JSB_NewCFunction(_context, func, GetAtom(op), length));
        }

        public void RegisterOperator(Type type, string op, IDynamicMethod func)
        {
            RegisterOperator(type, op, _db.NewDynamicMethod(GetAtom(op), func));
        }

        public void RegisterOperator(Type type, string op, JSCFunction func, int length, bool left, Type sideType)
        {
            RegisterOperator(type, op, JSApi.JSB_NewCFunction(_context, func, GetAtom(op), length), left, sideType);
        }

        public void RegisterOperator(Type type, string op, IDynamicMethod func, bool left, Type sideType)
        {
            RegisterOperator(type, op, _db.NewDynamicMethod(GetAtom(op), func), left, sideType);
        }

        // self operator for type
        public void RegisterOperator(Type type, string op, JSValue value)
        {
            int index;
            var decl = GetOperatorDecl(type, out index);
            decl.AddOperator(op, value);
        }

        // left/right operator for type
        public void RegisterOperator(Type type, string op, JSValue value, bool left, Type sideType)
        {
            if (sideType == typeof(string) || sideType == typeof(void) || (sideType.IsValueType && (sideType.IsPrimitive || sideType.IsEnum)))
            {
                int index;
                var decl = GetOperatorDecl(type, out index);
                decl.AddCrossOperator(op, value, left, sideType);
            }
            else
            {
                int index1, index2;
                var decl1 = GetOperatorDecl(type, out index1);
                var decl2 = GetOperatorDecl(sideType, out index2);
                if (index2 > index1)
                {
                    decl2.AddCrossOperator(op, value, !left, type);
                }
                else
                {
                    decl1.AddCrossOperator(op, value, left, sideType);
                }
            }
        }

        // 返回值已经过 DupValue
        public JSValue GetConstructor(Type type)
        {
            if (type == typeof(JSFunction))
            {
                return _context.GetFunctionConstructor();
            }

            if (type == typeof(string) || type == typeof(char))
            {
                return _context.GetStringConstructor();
            }

            if (type.IsValueType && (type.IsPrimitive || type.IsEnum))
            {
                return _context.GetNumberConstructor();
            }

            var val = _db.FindChainedPrototypeOf(type);
            return JSApi.JS_GetProperty(_context, val, JSApi.JS_ATOM_constructor);
        }

        public JSValue FindChainedPrototypeOf(Type type)
        {
            var val = _db.FindChainedPrototypeOf(type);
            return val;
        }

        public void Finish()
        {
            _refCount--;

            if (_refCount == 0)
            {
                _context.ReleaseTypeRegister(this);
                SubmitOperators();
                _atoms.Clear();
                var ctx = (JSContext)_context;

                for (int i = 0, count = _pendingTypes.Count; i < count; i++)
                {
                    var type = _pendingTypes[i];
                    var proto = _db.GetPrototypeOf(type);
                    if (!proto.IsNullish())
                    {
                        var baseType = type.BaseType;
                        var parentProto = _db.FindChainedPrototypeOf(baseType);
                        if (!parentProto.IsNullish())
                        {
                            JSApi.JS_SetPrototype(ctx, proto, parentProto);
                        }
                    }
                }

                for (int i = 0, count = _pendingClasses.Count; i < count; i++)
                {
                    var clazz = _pendingClasses[i];
                    clazz.Close();
                }

                _pendingClasses.Clear();
                _pendingTypes.Clear();
            }
        }
    }
}