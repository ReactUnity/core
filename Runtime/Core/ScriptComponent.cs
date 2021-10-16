using System;
using UnityEngine;

namespace ReactUnity
{
    public class ScriptComponent : SourceMetaComponent
    {
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
            try
            {
                Context.Script.ExecuteScript(InnerContent, "script");
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
    }
}
