using System.Collections;
using NUnit.Framework;
using ReactUnity.Editor.UIToolkit;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class DialogTests : EditorTestBase
    {
        public DialogTests(JavascriptEngineType engineType) : base(engineType) { }

        public const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <dialog show={globals.show} title={globals.title} id='test'>
                    Test text
                </dialog>;
            }
";


        [EditorInjectableTest(Script = BaseScript)]
        public IEnumerator DialogShouldBePositionedCorrectlyForAbsolute()
        {
            var cmp = Q("dialog") as DialogComponent;
            var rt = cmp.Element;

            Assert.IsNull(rt.Window);

            Globals["show"] = true;
            cmp.Style.Set("position", "absolute");
            cmp.Style.Set("left", 100);
            cmp.Style.Set("top", 110);
            cmp.Style.Set("width", 120);
            cmp.Style.Set("height", 140);
            cmp.Style.Set("min-width", 50);
            cmp.Style.Set("max-width", 200);
            cmp.Style.Set("min-height", 60);
            cmp.Style.Set("max-height", 240);
            yield return null;
            Assert.NotNull(rt.Window);
            Assert.AreEqual(new Vector2(50, 60), rt.Window.minSize);
            Assert.AreEqual(new Vector2(200, 240), rt.Window.maxSize);
            if (!Application.isBatchMode)
            {
                Assert.AreEqual(100, rt.Window.position.x, 1);
                Assert.AreEqual(110, rt.Window.position.y, 1);
                Assert.AreEqual(120, rt.Window.position.width, 1);
                Assert.AreEqual(140, rt.Window.position.height, 1);
            }
        }

        [EditorInjectableTest(Script = BaseScript)]
        public IEnumerator DialogShouldBePositionedCorrectlyForRelative()
        {
            var cmp = Q("dialog") as DialogComponent;
            var rt = cmp.Element;

            Assert.IsNull(rt.Window);

            Globals["show"] = true;
            cmp.Style.Set("left", 100);
            cmp.Style.Set("top", "50%");
            cmp.Style.Set("width", 120);
            cmp.Style.Set("height", 140);
            cmp.Style.Set("min-width", 50);
            cmp.Style.Set("max-width", "200%");
            cmp.Style.Set("min-height", 60);
            cmp.Style.Set("max-height", 240);
            yield return null;
            var pos = Window.position;

            Assert.NotNull(rt.Window);
            Assert.AreEqual(new Vector2(50, 60), rt.Window.minSize);
            Assert.AreEqual(2 * pos.width, rt.Window.maxSize.x, 1);
            Assert.AreEqual(240, rt.Window.maxSize.y, 1);
            if (!Application.isBatchMode)
            {
                Assert.AreEqual(100 + pos.x, rt.Window.position.x, 1);
                Assert.AreEqual(pos.height / 2 + pos.y, rt.Window.position.y, 10);
                Assert.AreEqual(120, rt.Window.position.width, 1);
                Assert.AreEqual(140, rt.Window.position.height, 1);
            }
        }


        [EditorInjectableTest(Script = BaseScript)]
        public IEnumerator DialogShouldHaveCorrectTitle()
        {
            var cmp = Q("dialog") as DialogComponent;
            var rt = cmp.Element;

            Globals["show"] = true;
            yield return null;

            Globals["title"] = "foo";
            Assert.AreEqual("foo", rt.Window.titleContent.text);

            Globals["title"] = "wah";
            Assert.AreEqual("wah", rt.Window.titleContent.text);

            Globals["title"] = null;
            Assert.AreNotEqual("wah", rt.Window.titleContent.text);
        }

    }
}
