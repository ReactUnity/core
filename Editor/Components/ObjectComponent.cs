using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using System;
using UnityEditor.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ObjectComponent : BaseFieldComponent<ObjectField, UnityEngine.Object>
    {
        public ObjectComponent(EditorContext context) : base(context, "object")
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "type")
            {
                Type type;
                if (value is string s) type = ReflectionHelpers.FindType(s);
                else type = value as Type;

                Element.objectType = type;
            }
            else if (property == "value")
            {
                Element.SetValueWithoutNotify(value as UnityEngine.Object);
            }
            else if (property == "allowSceneObjects")
            {
                Element.allowSceneObjects = Convert.ToBoolean(value);
            }

            else base.SetProperty(property, value);
        }
    }
}
