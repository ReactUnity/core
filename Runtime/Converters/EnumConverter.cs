using Jint;
using Jint.Native;

namespace ReactUnity.Converters
{
    public static class EnumConverter
    {
        public static T FromJsValue<T>(JsValue obj, Engine engine) where T: System.Enum
        {
            return (T)engine.ClrTypeConverter.Convert(obj, typeof(T), null);
        }
    }
}
