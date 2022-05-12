using System;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class UIToolkitInjectableTestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => DefaultUIToolkitSceneName;

        public UIToolkitInjectableTestAttribute(
            string code = DefaultCode, string style = "", string customScene = null,
            bool autoRender = true, bool transform = true, bool skipIfExisting = false, bool realTimer = false, bool html = false
        ) : base(code, style, customScene, autoRender, transform, skipIfExisting, realTimer, html)
        {
        }
    }
}
