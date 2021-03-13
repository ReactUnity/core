using ReactUnity.Editor.Renderer;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class BaseSliderComponent<S, TValueType> : BaseFieldComponent<S, TValueType> where S : BaseSlider<TValueType>, new() where TValueType : System.IComparable<TValueType>
    {
        public BaseSliderComponent(EditorContext context) : base(context, "slider")
        { }

        public override void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "vertical":
                    Element.direction = Convert.ToBoolean(value) ? SliderDirection.Vertical : SliderDirection.Horizontal;
                    break;
                case "inverted":
                    Element.inverted = Convert.ToBoolean(value);
                    break;
                case "showInput":
                    Element.showInputField = Convert.ToBoolean(value);
                    break;
                case "step":
                    Element.pageSize = Convert.ToSingle(value);
                    break;
                case "min":
                    Element.lowValue = (TValueType)value;
                    break;
                case "max":
                    Element.highValue = (TValueType)value;
                    break;
                default:
                    base.SetProperty(property, value);
                    break;
            }
        }
    }
}
