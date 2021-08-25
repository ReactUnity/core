using System.Collections;
using NUnit.Framework;
using ReactUnity.Editor.UIToolkit;
using ReactUnity.ScriptEngine;
using ReactUnity.UIToolkit;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class DialogTests : EditorTestBase
    {
        public DialogTests(JavascriptEngineType engineType) : base(engineType) { }

        public const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <dialog show={globals.show} title={globals.title} id='test'>
                    Test text
                </dialog>;
            }

            Renderer.render(<App />);
";


        [EditorInjectableTest(BaseScript)]
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
            Assert.That(rt.Window.position.x, Is.EqualTo(100).Within(1));
            Assert.That(rt.Window.position.y, Is.EqualTo(110).Within(1));
            Assert.That(rt.Window.position.width, Is.EqualTo(120).Within(1));
            Assert.That(rt.Window.position.height, Is.EqualTo(140).Within(1));
        }

        [EditorInjectableTest(BaseScript)]
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
            Assert.That(rt.Window.maxSize.x, Is.EqualTo(2 * pos.width).Within(1));
            Assert.That(rt.Window.maxSize.y, Is.EqualTo(240).Within(1));


            Assert.That(rt.Window.position.x, Is.EqualTo(100 + pos.x).Within(1));
            Assert.That(rt.Window.position.y, Is.EqualTo(pos.height / 2 + pos.y + 22).Within(10));
            Assert.That(rt.Window.position.width, Is.EqualTo(120).Within(1));
            Assert.That(rt.Window.position.height, Is.EqualTo(140).Within(1));
        }


        [EditorInjectableTest(BaseScript)]
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
