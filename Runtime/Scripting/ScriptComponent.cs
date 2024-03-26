using System;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class ScriptComponent : SourceProxyComponent
    {
        public JavascriptDocumentType Type = JavascriptDocumentType.Script;
        public string Url = null;

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
                var url = Url ??
                    (Type == JavascriptDocumentType.Module ? Context.Source.GetResolvedSourceUrl() :
                    ("ReactUnity/scripts/" + (string.IsNullOrWhiteSpace(Name) ? "anonymous" : Name)));
                Context.Script.ExecuteScript(ResolvedContent, url, Type);
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
            if ((propertyName == "source" || propertyName == "src") && value is string s) Url = Context.ResolvePath(s);

            if (propertyName == "type")
            {
                Type = AllConverters.Get<JavascriptDocumentType>().TryGetConstantValue(value, JavascriptDocumentType.Script);
            }
            else base.SetProperty(propertyName, value);
        }
    }
}
