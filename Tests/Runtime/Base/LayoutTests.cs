using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class LayoutTests : TestBase
    {
        public LayoutTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest()]
        public IEnumerator WidthAndHeightPropertiesCanBeSetToUndefined()
        {
            var view = Q("view");

            var rt = view.RectTransform;
            var initialWidth = rt.rect.width;
            var initialHeight = rt.rect.height;


            view.Style.Set("width", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.width);

            view.Style.Set("width", "auto");
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);

            view.Style.Set("width", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.width);

            view.Style.Set("width", null);
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("maxWidth", 200);
            yield return null;
            Assert.AreEqual(200, rt.rect.width);

            view.Style.Set("maxWidth", "auto");
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("minWidth", 5000);
            yield return null;
            Assert.AreEqual(5000, rt.rect.width);

            view.Style.Set("minWidth", null);
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("height", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.height);

            view.Style.Set("height", "auto");
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);

            view.Style.Set("height", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.height);

            view.Style.Set("height", null);
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);



            view.Style.Set("maxHeight", 20);
            yield return null;
            Assert.AreEqual(20, rt.rect.height);

            view.Style.Set("maxHeight", "auto");
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);



            view.Style.Set("minHeight", 5000);
            yield return null;
            Assert.AreEqual(5000, rt.rect.height);

            view.Style.Set("minHeight", null);
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);
        }

        [UGUITest()]
        public IEnumerator RootRelativeUnitsShouldBeRecalculatedWhenSizeChanges()
        {
            RectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 300);

            var view = Q("view");
            view.Style["width"] = "10vw";

            yield return null;
            Assert.AreEqual(30, view.ClientWidth);

            RectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 200);
            yield return null;
            Assert.AreEqual(20, view.ClientWidth);

            RectTransform.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 300);
            yield return null;
            Assert.AreEqual(30, view.ClientWidth);
        }


        [UGUITest(Style = @"
            #test { width: 124px; }
        ", AutoRender = false)]
        public IEnumerator InitialLayoutIsCorrectOnEnable()
        {
            // Simulate OnEnable
            yield return new WaitForFixedUpdate();
            Component.Render();
            yield return WaitForEndOfFrame();
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            Assert.AreEqual(124, rt.rect.width);

            yield return null;
        }

        [UGUITest(
            Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='parent'>
                    <view id='test' />
                </view>;
            }",
            Style = @"
                #parent {
                    background-color: gray;
                    width: 200px;
                    height: 160px;
                }

                #test {
                    background-color: red;
                    width: 20px;
                    height: 32px;
                    position: inset;
                    transform-origin: top left;
                }
            ")]
        public IEnumerator InsetLayoutPositionsElementsCorrectly()
        {
            var parent = Q("#parent") as UGUI.ContainerComponent;
            var cmp = Q("#test") as UGUI.ContainerComponent;

            Assert.AreEqual(new Rect(0, 0, 20, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("top", "10px");
            yield return null;
            Assert.AreEqual(new Rect(0, 10, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "0 10px");
            yield return null;
            Assert.AreEqual(new Rect(0, 20, 20, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("top", "10%");
            yield return null;
            Assert.AreEqual(new Rect(0, 16, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "0 10px");
            yield return null;
            Assert.AreEqual(new Rect(0, 26, 20, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("bottom", "10%");
            yield return null;
            Assert.AreEqual(new Rect(0, 16, 20, 128), GetRect(cmp));

            cmp.Style.Set("translate", "0 10px");
            yield return null;
            Assert.AreEqual(new Rect(0, 26, 20, 128), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("top", "initial");
            cmp.Style.Set("bottom", "20px");
            yield return null;
            Assert.AreEqual(new Rect(0, 108, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "0 10px");
            yield return null;
            Assert.AreEqual(new Rect(0, 118, 20, 32), GetRect(cmp));














            cmp.Style.Set("top", "initial");
            cmp.Style.Set("bottom", "initial");
            cmp.Style.Set("translate", "none");
            cmp.Style.Set("left", "10px");
            yield return null;
            Assert.AreEqual(new Rect(10, 0, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "10px 0");
            yield return null;
            Assert.AreEqual(new Rect(20, 0, 20, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("left", "10%");
            yield return null;
            Assert.AreEqual(new Rect(20, 0, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "30px 0");
            yield return null;
            Assert.AreEqual(new Rect(50, 0, 20, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("right", "10%");
            yield return null;
            Assert.AreEqual(new Rect(20, 0, 160, 32), GetRect(cmp));

            cmp.Style.Set("translate", "10px 0");
            yield return null;
            Assert.AreEqual(new Rect(30, 0, 160, 32), GetRect(cmp));



            cmp.Style.Set("translate", "none");
            cmp.Style.Set("left", "initial");
            cmp.Style.Set("right", "20px");
            yield return null;
            Assert.AreEqual(new Rect(160, 0, 20, 32), GetRect(cmp));

            cmp.Style.Set("translate", "10px 0");
            yield return null;
            Assert.AreEqual(new Rect(170, 0, 20, 32), GetRect(cmp));
        }

        private Rect GetRect(UGUI.ContainerComponent cmp)
        {
            var rect = cmp.GetBoundingClientRect();
            var prect = (cmp.Parent as UGUI.ContainerComponent).GetBoundingClientRect();
            var x = Mathf.Round(rect.x - prect.x);
            var y = Mathf.Round(rect.y - prect.y);

            return new Rect(x, y, rect.width, rect.height);
        }


        [UGUITest(Script = @"
            function App() {
                return <></>;
            }

            setTimeout(() => {
              const el = UnityBridge.createElement('view', '', HostContainer);
              el.Id = 'test';
              UnityBridge.appendChild(HostContainer, el);
            }, 0);
", Style = @"
            #test { width: 124px; }
        ")]
        public IEnumerator InitialLayoutIsCorrectForElementsCreatedInSetTimeout()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            Assert.AreEqual(124, rt.rect.width);

            yield return null;
        }
    }
}
