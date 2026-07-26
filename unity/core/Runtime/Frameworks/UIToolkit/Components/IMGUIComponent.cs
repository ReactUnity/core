using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class IMGUIComponent : UIToolkitComponent<IMGUIContainer>
    {
        public IMGUIComponent(UIToolkitContext context) : base(context, "imgui")
        {
            Element.onGUIHandler = () => FireEvent("onGUI", this);
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "cullingEnabled")
            {
#if UNITY_2020_1_OR_NEWER
                Element.cullingEnabled = System.Convert.ToBoolean(value);
#endif
            }
            else base.SetProperty(property, value);
        }

        public void MarkDirtyLayout()
        {
            Element.MarkDirtyLayout();
        }

        public void MarkDirtyRepaint()
        {
            Element.MarkDirtyRepaint();
        }
    }
}
