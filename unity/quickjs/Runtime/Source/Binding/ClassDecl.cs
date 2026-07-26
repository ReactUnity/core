using System;
using System.Collections.Generic;
using QuickJS.Native;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public struct OperatorDef
    {
        public string op;
        public JSValue value;

        public OperatorDef(string op, JSValue value)
        {
            this.op = op;
            this.value = value;
        }
    }

    public struct CrossOperatorDef
    {
        public Type type;
        public List<OperatorDef> operators;

        public CrossOperatorDef(Type type)
        {
            this.type = type;
            this.operators = new List<OperatorDef>();
        }
    }

    public struct ClassDecl
    {
        private TypeRegister _register;
        private ScriptContext _context;
        private JSValue _ctor;
        private JSValue _proto;
        private Type _type;

        public ClassDecl(TypeRegister register, JSValue ctorVal, JSValue protoVal, Type type)
        {
            _type = type;
            _register = register;
            _context = _register.GetContext();
            _ctor = JSApi.JS_DupValue(_context, ctorVal);
            _proto = JSApi.JS_DupValue(_context, protoVal);
        }

        /// <summary>
        /// obtain the raw JS constructor.
        /// NOTE: the return value is already duplicated
        /// </summary>
        public JSValue GetConstructor()
        {
            return JSApi.JS_DupValue(_context, _ctor);
        }

        public void Close()
        {
            if (_context != null)
            {
                var ctx = (JSContext)_context;

                JSApi.JS_FreeValue(ctx, _ctor);
                JSApi.JS_FreeValue(ctx, _proto);
                _ctor = JSApi.JS_UNDEFINED;
                _proto = JSApi.JS_UNDEFINED;
                _context = null;
            }
        }

        public void AddSelfOperator(string op, IDynamicMethod func)
        {
            _register.RegisterOperator(_type, op, func);
        }

        public void AddLeftOperator(string op, IDynamicMethod func, Type type)
        {
            _register.RegisterOperator(_type, op, func, true, type);
        }

        public void AddRightOperator(string op, IDynamicMethod func, Type type)
        {
            _register.RegisterOperator(_type, op, func, false, type);
        }

        public void AddSelfOperator(string op, JSCFunction func, int length)
        {
            _register.RegisterOperator(_type, op, func, length);
        }

        public void AddLeftOperator(string op, JSCFunction func, int length, Type type)
        {
            _register.RegisterOperator(_type, op, func, length, true, type);
        }

        public void AddRightOperator(string op, JSCFunction func, int length, Type type)
        {
            _register.RegisterOperator(_type, op, func, length, false, type);
        }

        public void AddFunction(string name, JSCFunctionMagic func, int length, int magic)
        {
            AddMethod(true, name, func, length, magic);
        }

        public void AddMethod(bool bStatic, string name, JSCFunctionMagic func, int length, int magic)
        {
            var nameAtom = _register.GetAtom(name);
            var funcVal = JSApi.JSB_NewCFunctionMagic(_context, func, nameAtom, length, magic);
            JSApi.JS_DefinePropertyValue(_context, bStatic ? _ctor : _proto, nameAtom, funcVal);
        }

        public void AddFunction(string name, JSCFunction func)
        {
            AddMethod(true, name, func);
        }

        public void AddMethod(bool bStatic, string name, JSCFunction func)
        {
            var nameAtom = _register.GetAtom(name);
            var funcVal = JSApi.JSB_NewCFunction(_context, func, nameAtom, 0);
            JSApi.JS_DefinePropertyValue(_context, bStatic ? _ctor : _proto, nameAtom, funcVal);
        }

        public void AddFunction(string name, JSCFunction func, int length)
        {
            AddMethod(true, name, func, length);
        }

        public void AddMethod(bool bStatic, string name, JSCFunction func, int length)
        {
            var nameAtom = _register.GetAtom(name);
            var funcVal = JSApi.JSB_NewCFunction(_context, func, nameAtom, length);
            JSApi.JS_DefinePropertyValue(_context, bStatic ? _ctor : _proto, nameAtom, funcVal);
        }

        public void AddStaticEvent(string name, JSCFunction adder, JSCFunction remover)
        {
            var nameAtom = _register.GetAtom(name);
            var op = JSApi.JS_NewObject(_context);
            var adderFunc = JSApi.JSB_NewCFunction(_context, adder, _register.GetAtom("on"), 1);
            JSApi.JS_SetProperty(_context, op, _register.GetAtom("on"), adderFunc);
            var removerFunc = JSApi.JSB_NewCFunction(_context, remover, _register.GetAtom("off"), 1);
            JSApi.JS_SetProperty(_context, op, _register.GetAtom("off"), removerFunc);
            JSApi.JS_SetProperty(_context, _ctor, nameAtom, op);
        }

        public void AddRawMethod(bool bStatic, string name, JSCFunction method)
        {
            var nameAtom = _register.GetAtom(name);
            var db = _register.GetTypeDB();
            var funcVal = db.NewDynamicMethod(nameAtom, method);
            JSApi.JS_DefinePropertyValue(_context, bStatic ? _ctor : _proto, nameAtom, funcVal);
        }

        public void AddMethod(bool bStatic, string name, IDynamicMethod method)
        {
            var nameAtom = _register.GetAtom(name);
            var db = _register.GetTypeDB();
            var funcVal = db.NewDynamicMethod(nameAtom, method);
            JSApi.JS_DefinePropertyValue(_context, bStatic ? _ctor : _proto, nameAtom, funcVal);
        }

        public void AddField(bool bStatic, string name, JSGetterCFunction getter, JSSetterCFunction setter)
        {
            AddProperty(bStatic, name, getter, setter);
        }

        public void AddField(bool bStatic, string name, IDynamicField field)
        {
            AddProperty(bStatic, name, field);
        }

        public void AddProperty(bool bStatic, string name, JSGetterCFunction getter, JSSetterCFunction setter)
        {
            var ctx = (JSContext)_context;
            var nameAtom = _register.GetAtom(name);
            var getterVal = JSApi.JSB_NewGetter(ctx, getter, nameAtom);
            var setterVal = JSApi.JSB_NewSetter(ctx, setter, nameAtom);
            var rs = JSApi.JS_DefineProperty(ctx, bStatic ? _ctor : _proto, nameAtom, getterVal, setterVal);

            if (rs != 1)
            {
                var logger = _register.GetLogger();

                if (logger != null)
                {
                    logger.Write(Utils.LogLevel.Error, "define property failed: {0}", ctx.GetExceptionString());
                }
            }
            JSApi.JS_FreeValue(ctx, getterVal);
            JSApi.JS_FreeValue(ctx, setterVal);
        }

        public void AddProperty(bool bStatic, string name, IDynamicField field)
        {
            var ctx = (JSContext)_context;
            var nameAtom = _register.GetAtom(name);
            var db = _register.GetTypeDB();
            var getterVal = JSApi.JS_UNDEFINED;
            var setterVal = JSApi.JS_UNDEFINED;

            db.NewDynamicFieldAccess(nameAtom, field, out getterVal, out setterVal);
            var rs = JSApi.JS_DefineProperty(ctx, bStatic ? _ctor : _proto, nameAtom, getterVal, setterVal);
            if (rs != 1)
            {
                var logger = _register.GetLogger();

                if (logger != null)
                {
                    logger.Write(Utils.LogLevel.Error, "define property failed: {0}", ctx.GetExceptionString());
                }
            }
            JSApi.JS_FreeValue(ctx, getterVal);
            JSApi.JS_FreeValue(ctx, setterVal);
        }

        public void AddValue(string name, JSValue v)
        {
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefinePropertyValue(_context, _ctor, nameAtom, v);
        }

        #region Registration for const values
        public void AddConstValue(string name, bool v)
        {
            var val = JSApi.JS_NewBool(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, char v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, byte v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, sbyte v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, short v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, ushort v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, int v)
        {
            var val = JSApi.JS_NewInt32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, uint v)
        {
            var val = JSApi.JS_NewUint32(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, double v)
        {
            var val = JSApi.JS_NewFloat64(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, float v)
        {
            var val = JSApi.JS_NewFloat64(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }

        public void AddConstValue(string name, string v)
        {
            var val = JSNative.NewString(_context, v);
            var nameAtom = _register.GetAtom(name);
            JSApi.JS_DefineConstPropertyValue(_context, _ctor, nameAtom, val);
        }
        #endregion
    }
}