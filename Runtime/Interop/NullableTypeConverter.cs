using Jint;
using Jint.Native;
using Jint.Runtime;
using Jint.Runtime.Interop;
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
        public NullableTypeConverter(Engine engine) : base(engine) { }


        public override object Convert(object value, Type type, IFormatProvider formatProvider)
        {
            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                Type underlyingType = Nullable.GetUnderlyingType(type);

                if (underlyingType != null)
                {
                    return (value == null) ? null : base.Convert(value, underlyingType, formatProvider);
                }
            }

            return base.Convert(value, type, formatProvider);
        }

    }
}
