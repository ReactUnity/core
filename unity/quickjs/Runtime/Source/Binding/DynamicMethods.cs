using System.Collections.Generic;
using QuickJS.Native;

namespace QuickJS.Binding
{
    // 存在重载的函数调用
    public class DynamicMethods : IDynamicMethod
    {
        private DynamicType _type;
        private string _methodName;
        private List<DynamicMethodBase> _overloads;

        public DynamicMethods(DynamicType type, string methodName, int initCapacity)
        {
            _type = type;
            _methodName = methodName;
            _overloads = new List<DynamicMethodBase>(initCapacity);
        }

        public void Add(DynamicMethodBase method)
        {
            var count = _overloads.Count;
            for (var i = 0; i < count; i++)
            {
                var overload = _overloads[i];
                if (method.GetParameterCount() > overload.GetParameterCount())
                {
                    _overloads.Insert(i, method);
                    return;
                }
            }
            _overloads.Add(method);
        }

        public JSValue Invoke(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            var count = _overloads.Count;

            for (var i = 0; i < count; i++)
            {
                var method = _overloads[i];
                
                if (method.CheckArgs(ctx, argc, argv))
                {
                    return method.Invoke(ctx, this_obj, argc, argv);
                }
            }

            return ctx.ThrowInternalError($"no overload method matched for {_type.type.Name}.{_methodName} [{count}]");
        }
    }
}
