using System;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class UIToolkitInjectableTestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => TestHelpers.UIToolkitSceneName;
    }
}
