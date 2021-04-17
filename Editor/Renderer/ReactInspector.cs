using ReactUnity.Types;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactInspector : UnityEditor.Editor
    {
        public override VisualElement CreateInspectorGUI()
        {
            return new ReactUnityElement(GetScript(), GetGlobals());
        }

        protected abstract ReactScript GetScript();

        protected virtual StringObjectDictionary GetGlobals()
        {
            return new StringObjectDictionary()
            {
                { "Inspector", this }
            };
        }
    }
}
