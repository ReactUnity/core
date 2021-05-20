using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class IMGUIComponent : EditorComponent<IMGUIContainer>
    {
        public IMGUIComponent(EditorContext context) : base(context, "imgui")
        {
        }

        public override void SetEventListener(string eventName, Callback fun)
        {
            if (eventName == "onGUI")
                Element.onGUIHandler = () => fun?.Call(this);
            else base.SetEventListener(eventName, fun);
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "cullingEnabled") Element.cullingEnabled = Convert.ToBoolean(value);
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
