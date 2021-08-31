using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class EnterLeaveTests : EditorTestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {!!globals.show &&
                        <view id='test'>
                            Test text
                        </view>}
                </>;
            }

            Renderer.render(<App />);
        ";

        const string BaseStyle = @"
            #test {
                color: black;
                transition: color 1s linear;
            }

            #test:enter {
                color: white !important;
                state-duration: 2s;
            }

            #test:leave {
                color: red !important;
                state-duration: 3s;
            }
";

        public EnterLeaveTests(JavascriptEngineType engineType) : base(engineType) { }


        UIToolkitComponent<VisualElement> View => Q("#test") as UIToolkitComponent<VisualElement>;

        [EditorInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator EnterLeaveWorksWithTransitions()
        {
            Assert.IsNull(View);
            Globals.Set("show", true);
            yield return null;

            var view = View;
            Assert.NotNull(View);
            Assert.True(view.Entering);
            Assert.False(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            yield return AdvanceTime(1);
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            yield return AdvanceTime(1);
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(Color.gray, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(Color.black, view.ComputedStyle.color);
            Assert.False(view.Entering);
            Assert.False(view.Leaving);
            Assert.False(view.Destroyed);


            yield return null;
            Globals.Set("show", false);
            yield return null;
            Assert.False(view.Entering);
            Assert.True(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.AreEqual(Color.black, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(new Color(0.5f, 0, 0), view.ComputedStyle.color);
            yield return AdvanceTime(0.5f);
            Assert.AreEqual(Color.red, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.True(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.NotNull(View);

            yield return AdvanceTime(1.5f);
            Assert.False(view.Leaving);
            Assert.True(view.Destroyed);
            Assert.IsNull(View);
        }

        [EditorInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator LeaveCanInterruptEnter()
        {
            Assert.IsNull(View);
            Globals.Set("show", true);
            yield return null;

            var view = View;
            Assert.NotNull(View);
            Assert.True(view.Entering);
            Assert.False(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.AreEqual(Color.white, view.ComputedStyle.color);

            yield return AdvanceTime(1);
            yield return AdvanceTime(1);
            yield return AdvanceTime(0.5f);
            Assert.AreEqual(Color.gray, view.ComputedStyle.color);

            Globals.Set("show", false);
            yield return null;
            Assert.False(view.Entering);
            Assert.True(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.AreEqual(Color.gray, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(new Color(0.75f, 0.25f, 0.25f), view.ComputedStyle.color);
            yield return AdvanceTime(0.5f);
            Assert.AreEqual(Color.red, view.ComputedStyle.color);

            yield return AdvanceTime(0.5f);
            Assert.True(view.Leaving);
            Assert.False(view.Destroyed);
            Assert.NotNull(View);

            yield return AdvanceTime(1.5f);
            Assert.False(view.Leaving);
            Assert.True(view.Destroyed);
            Assert.IsNull(View);
        }
    }
}
