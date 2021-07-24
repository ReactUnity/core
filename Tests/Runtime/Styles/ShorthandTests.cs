using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using TMPro;

namespace ReactUnity.Tests
{
    public class ShorthandTests : TestBase
    {
        public ShorthandTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(style: @"
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
        public IEnumerator MarginAndPaddingAndInsetShorthandWorks()
        {
            yield return null;

            var cmp = Q("#test");
            var text = cmp.Children[0] as UGUI.UGUIComponent;

            var rt = cmp.GetBoundingClientRect();
            var tt = text.GetBoundingClientRect();

            Assert.AreEqual(95, rt.x);
            Assert.AreEqual(53, rt.y);

            Assert.AreEqual(125, tt.xMin);
            Assert.AreEqual(95, tt.yMin);
        }


        [ReactInjectableTest(style: @"
          #test {
            font: bold italic 23px /33px monospace;
          }
")]
        public IEnumerator FontShorthandWorks()
        {
            yield return null;

            var cmp = Q("#test");
            var text = cmp.Children[0] as UGUI.UGUIComponent;

            var tt = text.RectTransform.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(FontStyles.Italic, tt.fontStyle);
            Assert.AreEqual(FontWeight.Bold, tt.fontWeight);
            Assert.AreEqual("monospace", tt.font.name);
            Assert.AreEqual(23, tt.fontSize);
            Assert.AreEqual(10f / 23f * 100f, tt.lineSpacing);
        }
    }
}
