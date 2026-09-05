using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using TMPro;
using UnityEngine;

namespace ReactUnity.Tests
{
    /// <summary>The web-shaped CSS that reaches TMP and the scroll view: white-space, text-shadow, overflow-x/y.</summary>
    public class CssAliasTests : TestBase
    {
        const string TextScript = @"
            function App() {
                return <view id='test'>
                    <text id='text'>Hello world</text>
                </view>;
            }
        ";

        const string ScrollScript = @"
            function App() {
                return <scroll id='scroll' style={{ overflowX: 'hidden' }}>
                    <view />
                </scroll>;
            }
        ";

        const string ScrollbarScript = @"
            function App() {
                return <scroll id='scroll' style={{ width: 200, height: 200 }}>
                    <view style={{ width: 400, height: 400 }} />
                </scroll>;
            }
        ";

        public CssAliasTests(JavascriptEngineType engineType) : base(engineType) { }

        static string Hex(Color c) => ColorUtility.ToHtmlStringRGBA(c);

        [UGUITest(Script = ScrollbarScript)]
        public IEnumerator ScrollbarColorAndWidthAreDefaultsThePseudoElementsOverride()
        {
            var scroll = Q("#scroll") as ScrollComponent;
            var vbar = scroll.VerticalScrollbar;
            var hbar = scroll.HorizontalScrollbar;

            Assert.AreEqual("D2D2D2FF", Hex(vbar.BorderAndBackground.BgColor));
            Assert.AreEqual("AAAAAAFF", Hex(vbar.Thumb.BorderAndBackground.BgColor));
            Assert.AreEqual(12, vbar.RectTransform.rect.width);
            Assert.AreEqual(12, hbar.RectTransform.rect.height);

            InsertStyle("scroll { scrollbar-color: red blue; scrollbar-width: thin; }");
            yield return null;
            Assert.AreEqual(Color.blue, vbar.BorderAndBackground.BgColor);
            Assert.AreEqual(Color.red, vbar.Thumb.BorderAndBackground.BgColor);
            Assert.AreEqual(Color.red, hbar.Thumb.BorderAndBackground.BgColor);
            Assert.AreEqual(6, vbar.RectTransform.rect.width);
            Assert.AreEqual(6, hbar.RectTransform.rect.height);

            // The pseudo-element rules are the more specific request and keep winning.
            InsertStyle("scroll::scrollbar-thumb { background-color: lime; } scroll::scrollbar { width: 20px; }", 1);
            yield return null;
            Assert.AreEqual(Color.green, vbar.Thumb.BorderAndBackground.BgColor);
            Assert.AreEqual(Color.blue, vbar.BorderAndBackground.BgColor);
            Assert.AreEqual(20, vbar.RectTransform.rect.width);
            Assert.AreEqual(6, hbar.RectTransform.rect.height);

            InsertStyle("scroll { scrollbar-width: none; scrollbar-color: auto; }", 2);
            yield return null;
            Assert.AreEqual(20, vbar.RectTransform.rect.width);
            Assert.AreEqual(0, hbar.RectTransform.rect.height);
            Assert.AreEqual("D2D2D2FF", Hex(vbar.BorderAndBackground.BgColor));
            Assert.AreEqual(Color.green, vbar.Thumb.BorderAndBackground.BgColor);
        }

        public TextComponent Text => Q("#text") as TextComponent;

#if REACT_TMP_X2
        [UGUITest(Script = TextScript)]
        public IEnumerator WhiteSpaceSelectsTheWrappingMode()
        {
            var tmp = Text.Text;
            Assert.AreEqual(TextWrappingModes.Normal, tmp.textWrappingMode);

            InsertStyle("#text { white-space: pre; }");
            yield return null;
            Assert.AreEqual(TextWrappingModes.PreserveWhitespaceNoWrap, tmp.textWrappingMode);

            InsertStyle("#text { white-space: pre-wrap; }", 1);
            yield return null;
            Assert.AreEqual(TextWrappingModes.PreserveWhitespace, tmp.textWrappingMode);

            InsertStyle("#text { white-space: nowrap; }", 2);
            yield return null;
            Assert.AreEqual(TextWrappingModes.NoWrap, tmp.textWrappingMode);

            InsertStyle("#text { text-wrap: balance; }", 3);
            yield return null;
            Assert.AreEqual(TextWrappingModes.Normal, tmp.textWrappingMode);
        }
#endif

        [UGUITest(Script = TextScript)]
        public IEnumerator TextShadowEnablesTheUnderlay()
        {
            var tmp = Text.Text;
            Assert.IsFalse(tmp.fontMaterial.IsKeywordEnabled(ShaderUtilities.Keyword_Underlay));

            InsertStyle("#text { text-shadow: 2px 3px 4px red; }");
            yield return null;

            var mat = tmp.fontMaterial;
            Assert.IsTrue(mat.IsKeywordEnabled(ShaderUtilities.Keyword_Underlay));
            Assert.AreEqual(Color.red, mat.GetColor(ShaderUtilities.ID_UnderlayColor));
            Assert.Greater(mat.GetFloat(ShaderUtilities.ID_UnderlayOffsetX), 0);
            Assert.Less(mat.GetFloat(ShaderUtilities.ID_UnderlayOffsetY), 0);
            Assert.Greater(mat.GetFloat(ShaderUtilities.ID_UnderlaySoftness), 0);

            InsertStyle("#text { text-shadow: none; }", 1);
            yield return null;
            Assert.IsFalse(tmp.fontMaterial.IsKeywordEnabled(ShaderUtilities.Keyword_Underlay));
        }

        [UGUITest(Script = ScrollScript)]
        public IEnumerator OverflowAxesPickTheScrollDirection()
        {
            var scroll = Q("#scroll") as ScrollComponent;
            Assert.IsFalse(scroll.ScrollRect.horizontal);
            Assert.IsTrue(scroll.ScrollRect.vertical);

            scroll.Style.Set("overflowX", "scroll");
            scroll.Style.Set("overflowY", "hidden");
            yield return null;
            Assert.IsTrue(scroll.ScrollRect.horizontal);
            Assert.IsFalse(scroll.ScrollRect.vertical);

            scroll.Style.Set("overflow", "hidden");
            yield return null;
            Assert.IsTrue(scroll.ScrollRect.horizontal);
            Assert.IsTrue(scroll.ScrollRect.vertical);
        }
    }
}
