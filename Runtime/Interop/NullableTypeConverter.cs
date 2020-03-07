using Facebook.Yoga;
using Jint;
using Jint.Native;
using Jint.Runtime;
using Jint.Runtime.Interop;
using ReactUnity.Converters;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq.Expressions;
using System.Reflection;
using UnityEngine;

namespace ReactUnity.Interop
{
    public class NullableTypeConverter : DefaultTypeConverter
    {
        public static Type YogaValueType = typeof(YogaValue);
        public static Type ColorType = typeof(Color);
        public static Type Vector2Type = typeof(Vector2);
        public static Type Vector4Type = typeof(Vector4);

        Engine engine;

        public NullableTypeConverter(Engine engine) : base(engine)
        {
            this.engine = engine;
        }


        public override object Convert(object value, Type type, IFormatProvider formatProvider)
        {
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                Type underlyingType = Nullable.GetUnderlyingType(type);

                if (underlyingType != null)
                {
                    return (value == null) ? null : Convert(value, underlyingType, formatProvider);
                }
            }


            if (type == YogaValueType)
            {
                var res = YogaValueConverter.NormalizeYogaValue(value);
                if (res.HasValue) return res.Value;
            }

            if (value == null)
            {
                if (TypeConverter.TypeIsNullable(type)) return null;
                throw new NotSupportedException($"Unable to convert null to '{type.FullName}'");
            }

            if (type == ColorType)
            {
                if (value is Color v) return v;
                var res = ColorConverter.FromJsValue(JsValue.FromObject(engine, value));
                if (res.HasValue) return res.Value;
            }
            else if (type == Vector2Type)
            {
                if (value is Vector2 v) return v;
                var res = Vector2Converter.FromJsValue(JsValue.FromObject(engine, value));
                if (res.HasValue) return res.Value;
            }
            else if (type == Vector4Type)
            {
                if (value is Vector4 v) return v;
                var res = Vector4Converter.FromJsValue(JsValue.FromObject(engine, value));
                if (res.HasValue) return res.Value;
            }
            else if (type.IsEnum && value is string s)
            {
                return Enum.Parse(type, s, true);
            }

            return base.Convert(value, type, formatProvider);
        }

    }
}
