using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.UIToolkit
{
    public class UIToolkitPoolingTests : UIToolkitTestBase
    {
        public UIToolkitPoolingTests(JavascriptEngineType engineType) : base(engineType) { }

        // UIToolkit opts elements out of pooling, so a remount under All is a fresh element with fresh fields.
        [UIToolkitTest(Pooling = ReactContext.PoolingType.All, Script = @"
            function App() {
                const g = ReactUnity.useGlobals();
                const phase = g.phase || 1;
                if (phase === 1) return <toggle pool value tooltip='a' disabled label='b' />;
                if (phase === 3) return <toggle pool />;
                return null;
            }
        ")]
        public IEnumerator RemountedElementIsFresh()
        {
            yield return null;
            var first = Q<Toggle>("toggle") as ToggleComponent<Toggle>;
            Assert.IsTrue(first.Value);

            Globals["phase"] = 2;
            yield return null;
            Globals["phase"] = 3;
            yield return null;

            var toggle = Q<Toggle>("toggle") as ToggleComponent<Toggle>;
            Assert.AreNotSame(first, toggle);
            Assert.IsFalse(toggle.Value);
            Assert.IsFalse(toggle.Disabled);
            Assert.IsTrue(string.IsNullOrEmpty(toggle.Element.tooltip));
            Assert.IsTrue(string.IsNullOrEmpty(toggle.Element.label));
        }
    }
}
