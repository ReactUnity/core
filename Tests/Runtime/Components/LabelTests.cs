using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class LabelTests : TestBase
    {
        public LabelComponent Label => Q("label") as LabelComponent;
        public ToggleComponent Toggle => Q("toggle") as ToggleComponent;

        public LabelTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest("Renderer.render(<label><toggle value={false} /></label>)")]
        public IEnumerator ClickingLabelActivatesChildComponent()
        {
            yield return null;
            Assert.AreEqual(true, Label.Activate());
            Assert.AreEqual(true, Toggle.Value);
        }

        [ReactInjectableTest("Renderer.render(<><toggle id='myToggle' /><label for='#myToggle'>hey</label></>)")]
        public IEnumerator ClickingLabelActivatesWithForQuery()
        {
            yield return null;
            Assert.AreEqual(true, Label.Activate());
            Assert.AreEqual(true, Toggle.Value);
        }

        [ReactInjectableTest("Renderer.render(<><label for=':scope + *'>hey</label><toggle/></>)")]
        public IEnumerator ScopedLabelForQueryWorks()
        {
            yield return null;
            Assert.AreEqual(true, Label.Activate());
            Assert.AreEqual(true, Toggle.Value);
        }
    }
}
