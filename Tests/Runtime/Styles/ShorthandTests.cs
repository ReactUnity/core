using System.Collections;
using Facebook.Yoga;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using ReactUnity.Types;
using TMPro;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ShorthandTests : TestBase
    {
        public ShorthandTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Style = @"
          #test {
            top: 11px;
            inset: 33px 0 0 21px;
            left: 23px;

            margin-top: 26px;
            margin: 20px;
            margin-left: 72px;

            padding-left: 55px;
            padding: 30px;
            padding-top: 42px;
          }
")]
        public IEnumerator MarginAndPaddingAndInsetShorthand()
        {
            yield return null;

            var cmp = Q("#test");
            var text = cmp.Children[0] as UGUI.UGUIComponent;

            var rt = cmp.GetBoundingClientRect();
            var tt = text.GetBoundingClientRect();

            Assert.AreEqual(95, rt.x, 1);
            Assert.AreEqual(53, rt.y, 1);

            Assert.AreEqual(125, tt.xMin, 1);
            Assert.AreEqual(95, tt.yMin, 1);

            cmp.Style["margin"] = "10px auto";
            yield return null;
            Assert.AreEqual(YogaValue.Point(10), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginTop));
            Assert.AreEqual(YogaValue.Point(10), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginBottom));
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginLeft));
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginRight));

            cmp.Style["margin"] = "auto";
            yield return null;
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginTop));
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginBottom));
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginLeft));
            Assert.AreEqual(YogaValue.Auto(), cmp.ComputedStyle.GetStyleValue(LayoutProperties.MarginRight));
        }


        [UGUITest(Style = @"
          #test {
            font: bold italic 23px /33px monospace;
          }
")]
        public IEnumerator FontShorthand()
        {
            yield return null;

            var cmp = Q("#test");
            var text = cmp.Children[0] as UGUI.UGUIComponent;

            var tt = text.RectTransform.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(FontStyles.Italic | FontStyles.Bold, tt.fontStyle);
            Assert.AreEqual(FontWeight.Regular, tt.fontWeight);
            Assert.AreEqual("monospace", tt.font.name);
            Assert.AreEqual(23, tt.fontSize);
            Assert.AreEqual(10f / 23f * 100f, tt.lineSpacing);
        }

        [UGUITest(Style = @"
          #test {
            background: red url(res:star);
            background-blend-mode: color;
            mask: url(res:star) space round 50px 60px / cover, url(res:star) repeat-y top right / 50% 50%;
            background-repeat: space round, repeat-x, repeat-y, space, no-repeat;
          }
")]
        public IEnumerator BackgroundAndMask()
        {
            yield return null;

            var cmp = Q("#test");
            var bg = cmp.BorderAndBackground;
            var mask = cmp.OverflowMask;

            Assert.AreEqual(typeof(Texture2D), bg.BackgroundGraphics[0].texture?.GetType());
            Assert.AreEqual(Color.red, bg.BackgroundGraphics[0].color);
            Assert.AreEqual(Color.red, bg.BgColor);


            var maskImage = cmp.ComputedStyle.maskImage;
            var maskPositionX = cmp.ComputedStyle.maskPositionX;
            var maskPositionY = cmp.ComputedStyle.maskPositionY;
            var maskSize = cmp.ComputedStyle.maskSize;
            var maskRepeatX = cmp.ComputedStyle.maskRepeatX;
            var maskRepeatY = cmp.ComputedStyle.maskRepeatY;
            Assert.AreEqual(2, maskImage.Count);

            Assert.AreEqual(YogaValue.Point(50), maskPositionX.Get(0));
            Assert.AreEqual(YogaValue.Percent(100), maskPositionX.Get(1));
            Assert.AreEqual(YogaValue.Point(60), maskPositionY.Get(0));
            Assert.AreEqual(YogaValue.Percent(0), maskPositionY.Get(1));

            Assert.AreEqual(BackgroundSize.Cover, maskSize.Get(0));
            Assert.AreEqual(new BackgroundSize(new YogaValue2(YogaValue.Percent(50), YogaValue.Percent(50))), maskSize.Get(1));

            Assert.AreEqual(BackgroundRepeat.Space, maskRepeatX.Get(0));
            Assert.AreEqual(BackgroundRepeat.NoRepeat, maskRepeatX.Get(1));

            Assert.AreEqual(BackgroundRepeat.Round, maskRepeatY.Get(0));
            Assert.AreEqual(BackgroundRepeat.Repeat, maskRepeatY.Get(1));

            var rptX = cmp.ComputedStyle.backgroundRepeatX;
            var rptY = cmp.ComputedStyle.backgroundRepeatY;
            Assert.AreEqual(5, rptX.Count);
            Assert.AreEqual(5, rptY.Count);
            Assert.AreEqual(BackgroundRepeat.Space, rptX.Get(0));
            Assert.AreEqual(BackgroundRepeat.Repeat, rptX.Get(1));
            Assert.AreEqual(BackgroundRepeat.NoRepeat, rptX.Get(2));
            Assert.AreEqual(BackgroundRepeat.Space, rptX.Get(3));
            Assert.AreEqual(BackgroundRepeat.NoRepeat, rptX.Get(4));

            Assert.AreEqual(BackgroundRepeat.Round, rptY.Get(0));
            Assert.AreEqual(BackgroundRepeat.NoRepeat, rptY.Get(1));
            Assert.AreEqual(BackgroundRepeat.Repeat, rptY.Get(2));
            Assert.AreEqual(BackgroundRepeat.Space, rptY.Get(3));
            Assert.AreEqual(BackgroundRepeat.NoRepeat, rptY.Get(4));
        }


        [UGUITest]
        public IEnumerator TransformShorthand()
        {

            var cmp = Q("#test");


            cmp.Style["transform"] = "translate(100px, 50px) translateX(20px) translateY(40px) translateZ(10px) translate3d(1px, 2px, 3px)"
                + " scale(2, 3) scale3d(2, 3, 4) scaleX(2) scaleY(3) scaleZ(4)"
                + " rotate(40deg) rotate3d(20deg, 30deg, 40deg) rotateX(20deg) rotateY(30deg) rotateZ(40deg)";
            yield return null;

            var translate = cmp.ComputedStyle.translate;
            var translateZ = cmp.ComputedStyle.translateZ;
            var rotate = cmp.ComputedStyle.rotate;
            var scale = cmp.ComputedStyle.scale;

            Assert.AreEqual(121, translate.X.Value);
            Assert.AreEqual(92, translate.Y.Value);
            Assert.AreEqual(13, translateZ.Value);

            Assert.AreEqual(new Vector3(8, 27, 16), scale);

            var expectedRotation = Quaternion.identity * Quaternion.Euler(0, 0, 40) * Quaternion.Euler(20, 30, 40) *
                Quaternion.Euler(20, 0, 0) * Quaternion.Euler(0, 30, 0) * Quaternion.Euler(0, 0, 40);
            Assert.AreEqual(expectedRotation.eulerAngles, rotate);
        }
    }
}
