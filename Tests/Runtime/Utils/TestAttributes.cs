using System;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class UIToolkitTestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => TestHelpers.UIToolkitSceneName;
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class UGUITestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => TestHelpers.UGUISceneName;
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class NoopTestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => TestHelpers.NoopSceneName;
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class WorldTestAttribute : ReactInjectableTestAttribute
    {
        public override string DefaultSceneName => TestHelpers.WorldSceneName;
    }
}
