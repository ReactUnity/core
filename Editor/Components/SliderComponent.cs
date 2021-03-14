using ReactUnity.Editor.Renderer;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class BaseSliderComponent<S, TValueType> : BaseFieldComponent<S, TValueType> where S : BaseSlider<TValueType>, new() where TValueType : System.IComparable<TValueType>
    {
        public BaseSliderComponent(EditorContext context, string tag) : base(context, tag)
        { }

        public override void SetProperty(string property, object value)
        {
            switch (property)
            {
                case "vertical":
                    Element.direction = Convert.ToBoolean(value) ? SliderDirection.Vertical : SliderDirection.Horizontal;
                    break;
#if UNITY_2021
                case "inverted":
                    Element.inverted = Convert.ToBoolean(value);
                    break;
#endif
                case "showInput":
                    Element.showInputField = Convert.ToBoolean(value);
                    break;
                case "step":
                    Element.pageSize = Convert.ToSingle(value);
                    break;
                case "min":
                    Element.lowValue = (TValueType)Convert.ChangeType(value, typeof(TValueType));
                    break;
                case "max":
                    Element.highValue = (TValueType)Convert.ChangeType(value, typeof(TValueType));
                    break;
                default:
                    base.SetProperty(property, value);
                    break;
            }
        }
    }
}
