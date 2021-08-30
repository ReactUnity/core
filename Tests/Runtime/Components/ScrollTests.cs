using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Tests
{
    public class ScrollTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <scroll direction={globals.direction} alwaysShow={globals.alwaysShow} sensitivity={globals.sensitivity}>
                        <view>
                        </view>
                    </scroll>
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"
            scroll {
                height: 200px;
                width: 200px;
            }
        ";

        public ScrollComponent Scroll => Q("scroll") as ScrollComponent;
        public UGUIComponent View => Q("view") as UGUIComponent;

        public ScrollTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator ScrollbarIsVisibleOnlyWhenSideOverflows()
        {
            yield return null;
            Assert.IsFalse(Scroll.ScrollRect.horizontalScrollbar.isActiveAndEnabled);
            Assert.IsFalse(Scroll.ScrollRect.verticalScrollbar.isActiveAndEnabled);

            View.Style.Set("width", 300);
            View.Style.Set("height", 300);
            yield return null;
            Assert.IsTrue(Scroll.ScrollRect.horizontalScrollbar.isActiveAndEnabled);
            Assert.IsTrue(Scroll.ScrollRect.verticalScrollbar.isActiveAndEnabled);


            View.Style.Set("width", 100);
            View.Style.Set("height", 300);
            yield return null;
            Assert.IsFalse(Scroll.ScrollRect.horizontalScrollbar.isActiveAndEnabled);
            Assert.IsTrue(Scroll.ScrollRect.verticalScrollbar.isActiveAndEnabled);

            View.Style.Set("width", 300);
            View.Style.Set("height", 100);
            yield return null;
            Assert.IsTrue(Scroll.ScrollRect.horizontalScrollbar.isActiveAndEnabled);
            Assert.IsFalse(Scroll.ScrollRect.verticalScrollbar.isActiveAndEnabled);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator ScrollbarCanBePositionedAndColoredWithStyling()
        {
            View.Style.Set("width", 300);
            View.Style.Set("height", 300);

            Context.InsertStyle(@"
                scroll::scrollbar {
                    width: 20px;
                    height: 30px;
                }

                scroll::scrollbar[vertical] {
                    left: 5px;
                    top: 10px;
                    bottom: 15px;
                }

                scroll::scrollbar[horizontal] {
                    top: 5px;
                    left: 8px;
                    right: 16px;
                    background: red;
                }

                scroll::scrollbar[horizontal]::scrollbar-thumb {
                    background: blue;
                }
            ");

            yield return null;
            Assert.AreEqual(new Rect(-10, -87.5f, 20, 175), (Scroll.ScrollRect.verticalScrollbar.transform as RectTransform).rect);
            Assert.AreEqual(new Rect(-88, -15, 176, 30), (Scroll.ScrollRect.horizontalScrollbar.transform as RectTransform).rect);

            var hbar = Q("scroll _scrollbar[horizontal]") as ScrollBarComponent;

            Assert.AreEqual(Scroll.ScrollRect.horizontalScrollbar, hbar.Scrollbar);
            Assert.AreEqual(Color.red, hbar.BorderAndBackground.Background.GetComponent<Image>().color);
            Assert.AreEqual(Color.blue, hbar.Thumb.BorderAndBackground.Background.GetComponent<Image>().color);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator PropertiesGetAppliedToScrollbar()
        {
            yield return null;

            Assert.AreEqual(true, Scroll.ScrollRect.horizontal);
            Assert.AreEqual(true, Scroll.ScrollRect.vertical);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.AutoHide, Scroll.ScrollRect.horizontalScrollbarVisibility);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.AutoHide, Scroll.ScrollRect.verticalScrollbarVisibility);
            Assert.AreEqual(50, Scroll.ScrollRect.scrollSensitivity);


            Globals.Set("sensitivity", 100);
            Globals.Set("direction", "vertical");
            Globals.Set("alwaysShow", "both");
            yield return null;

            Assert.AreEqual(false, Scroll.ScrollRect.horizontal);
            Assert.AreEqual(true, Scroll.ScrollRect.vertical);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.Permanent, Scroll.ScrollRect.horizontalScrollbarVisibility);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.Permanent, Scroll.ScrollRect.verticalScrollbarVisibility);
            Assert.AreEqual(100, Scroll.ScrollRect.scrollSensitivity);
        }
    }
}
