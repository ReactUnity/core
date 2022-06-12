#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if REACT_JINT
using System;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime.Interop;
using ReactUnity.Helpers;

namespace ReactUnity.Scripting
{
    public class JintTypeConverter : DefaultTypeConverter
    {
        private ReactContext Context;

        public JintTypeConverter(ReactContext context, Engine engine) : base(engine)
        {
            Context = context;
        }

        public override object Convert(object value, Type type, IFormatProvider formatProvider)
        {
            if (type == typeof(object))
            {
                if (value is ObjectWrapper ow) return ow.Target;
            }

            if (type == typeof(Callback) || type == typeof(object))
            {
                if (value is Func<JsValue, JsValue[], JsValue> cb) return Callback.From(cb, Context);
                if (value is ObjectInstance oi) return Callback.From(oi, Context);
            }

            return base.Convert(value, type, formatProvider);
        }
    }
}
#endif
