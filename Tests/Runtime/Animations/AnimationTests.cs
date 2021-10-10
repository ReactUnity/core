using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Animations;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class AnimationTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                return <view id='test'>
                    Test text
                </view>;
            }

            Renderer.render(<App />);
        ";

        const string BaseStyle = @"
            #test {
                background-color: red;
            }

            @keyframes growWidth {
                from {
                    width: 100px;
                }
                to {
                    width: 500px;
                }
            }

            @keyframes fadeColor {
                from {
                    color: black;
                }
                to {
                    color: white;
                }
            }
";

        public AnimationTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest()]
        public IEnumerator ParsingWorksCorrectly()
        {
            var view = Q("#test");

            view.Style.Set("animation", "growWidth 1s 400ms both, shrinkWidth 1.2s 100ms");
            yield return null;

            var st = view.ComputedStyle;

            Assert.AreEqual("growWidth", st.animationName.Get(0));
            Assert.AreEqual(1, st.animationDuration.Get(0));
            Assert.AreEqual(0.4f, st.animationDelay.Get(0));
            Assert.AreEqual(AnimationFillMode.Both, st.animationFillMode.Get(0));

            Assert.AreEqual("shrinkWidth", st.animationName.Get(1));
            Assert.AreEqual(1.2f, st.animationDuration.Get(1));
            Assert.AreEqual(0.1f, st.animationDelay.Get(1));
            Assert.AreEqual(AnimationFillMode.None, st.animationFillMode.Get(1));


            view.Style.Set("animation", "none");
            yield return null;

            st = view.ComputedStyle;

            Assert.AreEqual(null, st.animationName.Get(0));
            Assert.AreEqual(0, st.animationDuration.Get(0));
            Assert.AreEqual(0, st.animationDelay.Get(0));
            Assert.AreEqual(AnimationFillMode.None, st.animationFillMode.Get(0));


            view.Style.Set("animation", "growWidth 1s 400ms both, shrinkWidth 1.2s 100ms");
            yield return null;

            view.Style.Set("animation", null);
            yield return null;

            st = view.ComputedStyle;

            Assert.AreEqual(null, st.animationName.Get(0));
            Assert.AreEqual(0, st.animationDuration.Get(0));
            Assert.AreEqual(0, st.animationDelay.Get(0));
            Assert.AreEqual(AnimationFillMode.None, st.animationFillMode.Get(0));
        }


        [ReactInjectableTest(BaseScript, BaseStyle, realTimer: true)]
        public IEnumerator AnimationShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms both");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500).Within(1));
        }




        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms both linear");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500));
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationCanBePaused()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms linear both paused");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(100, rt.rect.width);


            cmp.Style.Set("animation", "growWidth 1s 400ms linear both");
            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            cmp.Style.Set("animation", "growWidth 1s 400ms linear both paused");
            yield return AdvanceTime(1f);
            Assert.AreEqual(140, rt.rect.width);
            cmp.Style.Set("animation", "growWidth 1s 400ms linear both");

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);


            cmp.Style.Set("animation", null);
            yield return null;

            cmp.Style.Set("animation", "growWidth 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            cmp.Style.Set("animation-play-state", "paused");
            yield return AdvanceTime(1f);
            Assert.AreEqual(140, rt.rect.width);
            cmp.Style.Set("animation-play-state", null);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationShouldWorkOnVisualStyles()
        {
            var view = (Q("#test") as UGUI.ContainerComponent);
            var text = view.GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            view.Style.Set("animation", "fadeColor 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(Color.black, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.1f, text.color.grayscale, 0.001f);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.white, text.color);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator CssVariablesShouldBeAnimatableForVisualStyles()
        {
            Context.InsertStyle(@"
                @keyframes changeVar {
                    from {
                        --my-color: black;
                    }
                    to {
                        --my-color: white;
                    }
                }");

            var view = (Q("#test") as UGUI.ContainerComponent);
            var text = view.GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            view.Style.Set("color", "var(--my-color)");
            view.Style.Set("animation", "changeVar 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(Color.black, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.1f, text.color.grayscale, 0.001f);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.white, text.color);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator CssVariablesShouldBeAnimatableForLayoutStyles()
        {
            Context.InsertStyle(@"
                @keyframes changeVar {
                    from {
                        --my-var: 100px;
                    }
                    to {
                        --my-var: 500px;
                    }
                }");

            var view = (Q("#test") as UGUI.ContainerComponent);
            var rt = view.RectTransform;

            view.Style.Set("width", "var(--my-var)");
            view.Style.Set("animation", "changeVar 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500));
        }




        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator ShouldBeAbleToAnimateBetweenDynamicAndNonDynamic()
        {
            Context.InsertStyle(@"
                :root { --my-color: black; }

                @keyframes changeVar {
                    from {
                        color: var(--my-color);
                    }
                    to {
                        color: white;
                    }
                }");

            var view = (Q("#test") as UGUI.ContainerComponent);
            var text = view.GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            view.Style.Set("animation", "changeVar 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(Color.black, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.1f, text.color.grayscale, 0.001f);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.white, text.color);
        }


        [ReactInjectableTest(@"
            function addEvent(eventName) {
                Globals.list.Add(eventName);
            }

            function App() {
                return <view id='test'
                    onAnimationRun={() => addEvent('run')}
                    onAnimationStart={() => addEvent('start')}
                    onAnimationEnd={() => addEvent('end')}
                    onAnimationCancel={() => addEvent('cancel')}
                    onAnimationIteration={() => addEvent('iteration')}
                >
                    Test text
                </view>;
            }

            Renderer.render(<App />);
")]
        public IEnumerator EventsAreFiredCorrectly()
        {
            InsertStyle(@"
                @keyframes testAnimation {
                    from { color: black; }
                    to { color: white; }
                }
");

            var view = Q("#test");
            var list = new List<string>();
            Globals["list"] = list;
            view.Style.Set("color", "red");
            yield return null;

            view.Style.Set("animation", "testAnimation 1s 3 400ms linear both");
            Assert.IsEmpty(list);

            yield return null;
            list.AssertListExhaustive("run");

            yield return AdvanceTime(0.2f);
            Assert.IsEmpty(list);
            yield return AdvanceTime(0.201f);
            list.AssertListExhaustive("start");

            yield return AdvanceTime(0.5f);
            Assert.IsEmpty(list);

            yield return AdvanceTime(0.501f);
            list.AssertListExhaustive("iteration");

            yield return AdvanceTime(1f);
            list.AssertListExhaustive("iteration");

            yield return AdvanceTime(1f);
            list.AssertListExhaustive("end");

            view.Style.Set("animation", "none");
            yield return null;
            Assert.IsEmpty(list);

            view.Style.Set("animation", "testAnimation 1s linear both");
            yield return null;
            list.AssertListExhaustive("run");
            yield return AdvanceTime(0.01f);
            list.AssertListExhaustive("start");

            yield return AdvanceTime(0.501f);
            view.Style.Set("animation", "none");
            yield return null;
            list.AssertListExhaustive("cancel");
        }
    }
}
