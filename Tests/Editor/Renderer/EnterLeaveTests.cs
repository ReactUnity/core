using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class EnterLeaveTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {!!globals.show &&
                        <view id='test'>
                            Test text
                        </view>}
                </>;
            }
        ";

        const string BaseStyle = @"
            #test {
                color: black;
                transition: color 1s linear;
            }

            #test:enter {
                color: white;
                state-duration: 2s;
            }

            #test:leave {
                color: red;
                state-duration: 3s;
            }
";

        public EnterLeaveTests(JavascriptEngineType engineType) : base(engineType) { }


        UIToolkitComponent<VisualElement> View => Q("#test") as UIToolkitComponent<VisualElement>;

        [EditorInjectableTest(Script = BaseScript, Style = BaseStyle)]
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

        [EditorInjectableTest(Script = BaseScript, Style = BaseStyle)]
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

        [EditorInjectableTest(Script = BaseScript, Style = BaseStyle, RealTimer = true)]
        public IEnumerator ZeroLeaveDoesNotCauseCrash()
        {
            InsertStyle(@"
                #test { state-duration: 0s !important; }
            ");
            yield return null;
            Globals.Set("show", true);
            yield return null;

            var view = View;
            Assert.NotNull(View);
            Assert.False(view.Entering);
            Assert.False(view.Leaving);
            Assert.False(view.Destroyed);

            Globals.Set("show", false);
            yield return null;
            Assert.False(view.Leaving);
            Assert.True(view.Destroyed);
            Assert.IsNull(View);
        }
    }
}
