using System;
using UnityEngine;

namespace ReactUnity
{
    public class ScriptComponent : MetaComponent, ITextComponent
    {
        public string Content { get; private set; }

        public ScriptComponent(ReactContext ctx, string tag = "script", string text = null) : base(ctx, tag)
        {
            SetText(text);
        }

        public void SetText(string text)
        {
            Content = text;
            UpdateScript();
        }

        private void UpdateScript()
        {
            if (Parent == null) return;
            Execute();
        }

        public void Execute()
        {
            try
            {
                Context.Script.ExecuteScript(Content, "script");
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

            if (previousParent == null && newParent != null) UpdateScript();
        }
    }
}
