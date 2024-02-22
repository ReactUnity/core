using System;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class ScriptComponent : SourceProxyComponent
    {
        public JavascriptDocumentType Type = JavascriptDocumentType.Script;

        public ScriptComponent(ReactContext ctx, string tag = "script", string text = null) : base(ctx, tag)
        {
            SetText(text);
        }

        protected override void RefreshValue()
        {
            if (Parent == null) return;
            Execute();
        }

        public void Execute()
        {
            if (string.IsNullOrWhiteSpace(ResolvedContent)) return;
            try
            {
                Context.Script.ExecuteScript(ResolvedContent, "ReactUnity/scripts/" + (String.IsNullOrWhiteSpace(Name) ? "anonymous" : Name), Type);
            }
            catch (Exception ex)
            {
                Debug.LogException(ex);
            }
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            var previousParent = Parent;
            base.SetParent(newParent, relativeTo, insertAfter);

            if (previousParent == null && newParent != null) RefreshValue();
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "type") Type = AllConverters.Get<JavascriptDocumentType>().TryGetConstantValue(value, JavascriptDocumentType.Script);
            else base.SetProperty(propertyName, value);
        }
    }
}
