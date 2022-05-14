using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TransitionTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test' className={globals.started ? 'started' : ''}>
                    Test text
                </view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: red;
                color: white;
                width: 100px;
            }
            #test.started {
                color: black;
                width: 500px;
                transition: color 1s 400ms linear, width 1s 400ms linear;
            }
";

        public TransitionTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest]
        public IEnumerator ParsingWorksCorrectly()
        {
            var view = Q("#test");

            view.Style.Set("transition", "color 1s 400ms linear, width 5s 1.2s ease-in");
            yield return null;

            var st = view.ComputedStyle;

            Assert.AreEqual("color", st.transitionProperty.Get(0).Definition);
            Assert.AreEqual(1, st.transitionDuration.Get(0));
            Assert.AreEqual(0.4f, st.transitionDelay.Get(0));

            Assert.AreEqual("width", st.transitionProperty.Get(1).Definition);
            Assert.AreEqual(5, st.transitionDuration.Get(1));
            Assert.AreEqual(1.2f, st.transitionDelay.Get(1));


            view.Style.Set("transition", "none");
            yield return null;

            st = view.ComputedStyle;

            Assert.AreEqual(null, st.transitionProperty.Get(0));
            Assert.AreEqual(0, st.transitionDuration.Get(0));
            Assert.AreEqual(0, st.transitionDelay.Get(0));


            view.Style.Set("transition", "color 1s 400ms linear, width 5s 1.2s ease-in");
            yield return null;

            view.Style.Set("transition", null);
            yield return null;

            st = view.ComputedStyle;

            Assert.AreEqual(null, st.transitionProperty.Get(0));
            Assert.AreEqual(0, st.transitionDuration.Get(0));
            Assert.AreEqual(0, st.transitionDelay.Get(0));
        }

        [ReactInjectableTest(Code = BaseScript, Style = BaseStyle, RealTimer = true)]
        public IEnumerator TransitionShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            Globals["started"] = true;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return AdvanceTime(1f);
            Assert.AreEqual(rt.rect.width, 500f, 1);
        }

        [ReactInjectableTest(Code = BaseScript, Style = BaseStyle)]
        public IEnumerator TransitionShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            Globals["started"] = true;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(180, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }

        [ReactInjectableTest(Code = BaseScript, Style = BaseStyle)]
        public IEnumerator TransitionShouldWorkOnVisualStyles()
        {
            var text = (Q("#test") as UGUI.ContainerComponent).GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.white, text.color);

            Globals["started"] = true;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(Color.white, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.8f, text.color.grayscale, 0.001f);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.black, text.color);
        }


        [ReactInjectableTest(Code = BaseScript, Style = @"
            #test {
                transition: color 1s 400ms linear, width 1s 400ms linear;
                background-color: red;
                color: white;
                width: 100px;
            }
            #test.started {
                color: black;
                width: 500px;
            }
")]
        public IEnumerator InitialWidthIsCorrectWithDelayedTransition()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            Globals["started"] = true;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(180, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }


        [ReactInjectableTest(Code = BaseScript, Style = @"
            #test {
                transition: --my-color 1s 400ms linear;
                background-color: red;
                color: var(--my-color);
                --my-color: white;
            }
            #test.started {
                --my-color: black;
            }
")]
        public IEnumerator CssVariablesCanBeTransitioned()
        {
            var text = (Q("#test") as UGUI.ContainerComponent).GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.white, text.color);

            Globals["started"] = true;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(Color.white, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.8f, text.color.grayscale, 0.001f);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.black, text.color);
        }

        [ReactInjectableTest(Code = @"
            function addEvent(eventName) {
                Globals.list.Add(eventName);
            }

            function App() {
                return <view id='test'
                    onTransitionRun={() => addEvent('run')}
                    onTransitionStart={() => addEvent('start')}
                    onTransitionEnd={() => addEvent('end')}
                    onTransitionCancel={() => addEvent('cancel')}
                >
                    Test text
                </view>;
            }
")]
        public IEnumerator EventsAreFiredCorrectly()
        {
            var view = Q("#test");
            var list = new List<string>();
            Globals["list"] = list;
            view.Style.Set("color", "red");
            yield return null;


            view.Style.Set("transition", "color 1s 400ms linear");
            yield return null;

            Assert.IsEmpty(list);

            view.Style.Set("color", "white");
            yield return null;
            list.AssertListExhaustive("run");

            yield return AdvanceTime(0.3f);
            Assert.IsEmpty(list);
            yield return AdvanceTime(0.11f);
            list.AssertListExhaustive("start");

            yield return AdvanceTime(0.4f);
            Assert.IsEmpty(list);
            yield return AdvanceTime(0.6f);
            list.AssertListExhaustive("end");


            view.Style.Set("color", "red");
            yield return null;
            list.AssertListExhaustive("run");

            yield return AdvanceTime(0.41f);
            list.AssertListExhaustive("start");

            yield return AdvanceTime(0.2f);
            Assert.IsEmpty(list);

            view.Style.Set("color", "blue");
            yield return null;
            list.AssertListExhaustive("cancel", "run");

            view.Style.Set("transition", "none");
            yield return null;
            list.AssertListExhaustive("cancel");
        }
    }
}
