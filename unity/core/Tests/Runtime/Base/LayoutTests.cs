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



            view.Style.Set("maxHeight", 16);
            yield return null;
            Assert.AreEqual(16, rt.rect.height);

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
                return <view id='parent'>
                    <view id='test' />
                </view>;
            }",
            Style = @"
                #parent {
                    background-color: gray;
                    width: 200px;
                    height: 160px;
                    border: 5px solid black;
                    padding: 20px;
                }

                #test {
                    background-color: red;
                    width: 20px;
                    height: 32px;
                    position: absolute;
                    transform-origin: top left;
                }
            ")]
        public IEnumerator AbsoluteInsetsResolveAgainstThePaddingBox()
        {
            // The parent is border-box 200x160 with a 5px border and 20px of padding, so the three
            // boxes all differ: border box 200x160 at (0, 0), padding box 190x150 at (5, 5), content
            // box 150x110 at (25, 25). Insets resolve against the padding box -- inside the border,
            // outside the padding -- and only the static position is moved by the padding. The border
            // is what makes this test discriminating: `position: inset` measured every one of these
            // from the border box, which is why it existed and why Yoga 1.19 needed it.
            var cmp = Q("#test") as UGUI.ContainerComponent;

            IEnumerator Set(params string[] props)
            {
                for (var i = 0; i < props.Length; i += 2) cmp.Style.Set(props[i], props[i + 1]);
                yield return null;
            }

            // With no insets it sits at its static position, which is the content box origin.
            Assert.AreEqual(new Rect(25, 25, 20, 32), GetRect(cmp));

            yield return Set("left", "0", "top", "10px");
            Assert.AreEqual(new Rect(5, 15, 20, 32), GetRect(cmp));

            yield return Set("translate", "0 10px");
            Assert.AreEqual(new Rect(5, 25, 20, 32), GetRect(cmp));

            // A percentage resolves against the padding box height, 150, not the border box's 160.
            yield return Set("translate", "none", "top", "10%");
            Assert.AreEqual(new Rect(5, 20, 20, 32), GetRect(cmp));

            yield return Set("translate", "0 10px");
            Assert.AreEqual(new Rect(5, 30, 20, 32), GetRect(cmp));

            // Over-constrained: a declared height wins and `bottom` is dropped, as in CSS. Under
            // `position: inset` the insets won instead and stretched the box.
            yield return Set("translate", "none", "bottom", "10%");
            Assert.AreEqual(new Rect(5, 20, 20, 32), GetRect(cmp));

            yield return Set("top", "initial", "bottom", "20px");
            Assert.AreEqual(new Rect(5, 103, 20, 32), GetRect(cmp));

            yield return Set("translate", "0 10px");
            Assert.AreEqual(new Rect(5, 113, 20, 32), GetRect(cmp));

            // With the height dropped, the pair of insets stretches it across the padding box.
            yield return Set("translate", "none", "top", "0", "bottom", "0", "height", "initial");
            Assert.AreEqual(new Rect(5, 5, 20, 150), GetRect(cmp));

            // The same, from percentages: 150 less 10% at each end.
            yield return Set("top", "10%", "bottom", "10%");
            Assert.AreEqual(new Rect(5, 20, 20, 120), GetRect(cmp));

            yield return Set("bottom", "initial", "height", "32px", "top", "0", "left", "10px");
            Assert.AreEqual(new Rect(15, 5, 20, 32), GetRect(cmp));

            yield return Set("translate", "10px 0");
            Assert.AreEqual(new Rect(25, 5, 20, 32), GetRect(cmp));

            yield return Set("translate", "none", "left", "10%");
            Assert.AreEqual(new Rect(24, 5, 20, 32), GetRect(cmp));

            yield return Set("left", "initial", "right", "20px");
            Assert.AreEqual(new Rect(155, 5, 20, 32), GetRect(cmp));

            yield return Set("translate", "10px 0");
            Assert.AreEqual(new Rect(165, 5, 20, 32), GetRect(cmp));

            // Over-constrained on this axis too: the declared width wins and `right` is dropped.
            yield return Set("translate", "none", "left", "10%", "right", "10%");
            Assert.AreEqual(new Rect(24, 5, 20, 32), GetRect(cmp));

            yield return Set("left", "0", "right", "0", "width", "initial");
            Assert.AreEqual(new Rect(5, 5, 190, 32), GetRect(cmp));

            yield return Set("left", "10%", "right", "10%");
            Assert.AreEqual(new Rect(24, 5, 152, 32), GetRect(cmp));
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
