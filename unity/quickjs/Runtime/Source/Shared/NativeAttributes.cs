using System;
namespace QuickJS
{
#pragma warning disable 414
    [AttributeUsage(AttributeTargets.Method)]
    public class MonoPInvokeCallbackAttribute : Attribute
    {
        private Type type;
        public MonoPInvokeCallbackAttribute(Type t)
        {
            type = t;
        }
    }
#pragma warning restore 414
}
