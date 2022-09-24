using System;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class SortingLayerConverter : TypedStyleConverterBase<SortingLayer>
    {
        public SortingLayerConverter() { }

        private bool FromInt(int value, out IComputedValue result)
        {
            var i = (int) value;
            if (i < SortingLayer.layers.Length)
                return Constant(SortingLayer.layers[i], out result);

            result = null;
            return false;
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            switch (Type.GetTypeCode(value.GetType()))
            {
                case TypeCode.Byte:
                case TypeCode.SByte:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                case TypeCode.Decimal:
                    return FromInt((int) value, out result);
                default:
                    break;
            }

            return base.ConvertInternal(value, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (int.TryParse(value, out var intResult))
            {
                if (FromInt(intResult, out result)) return true;
            }

            var layerValue = SortingLayer.GetLayerValueFromName(StringConverter.Normalize(value));
            return FromInt(layerValue, out result);
        }
    }
}
