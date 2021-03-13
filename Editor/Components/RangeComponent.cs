using ReactUnity.Editor.Renderer;
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class RangeComponent : BaseFieldComponent<MinMaxSlider, Vector2>
    {
        public RangeComponent(EditorContext context) : base(context, "range")
        { }

        public override void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "min":
                    Element.minValue = Convert.ToSingle(value);
                    break;
                case "max":
                    Element.maxValue = Convert.ToSingle(value);
                    break;
                case "low":
                    Element.lowLimit = Convert.ToSingle(value);
                    break;
                case "high":
                    Element.highLimit = Convert.ToSingle(value);
                    break;
                default:
                    base.SetProperty(property, value);
                    break;
            }
        }
    }
}
