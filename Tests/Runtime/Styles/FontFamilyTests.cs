using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using TMPro;

namespace ReactUnity.Tests
{
    public class FontFamilyTests : TestBase
    {
        public FontFamilyTests(JavascriptEngineType engineType) : base(engineType) { }

        private TextMeshProUGUI Text(string query = "#test") =>
            Q(query).GameObject.GetComponentInChildren<TextMeshProUGUI>();

        const string Variants = @"
    @font-face {
      font-family: ""Variable"";
      src: url(resource:ReactUnity/fonts/sans-serif);
    }

    @font-face {
      font-family: ""Variable"";
      font-weight: 700;
      src: url(resource:ReactUnity/fonts/monospace);
    }

    @font-face {
      font-family: ""Variable"";
      font-style: italic;
      src: url(resource:ReactUnity/fonts/monospace);
    }
";

        const string OneView = @"export const App = () => <view id='test'>Hello world</view>";


        [UGUITest(Script = OneView, Style = @"
    #test { font-family: ""Nowhere"", ""Nothing"", monospace; }
")]
        public IEnumerator ListFallsThroughToTheFirstDeclaredFamily()
        {
            yield return null;
            Assert.AreEqual("monospace", Text().font.name);
        }


        [UGUITest(Script = OneView, Style = @"
    #test { font-family: sans-serif, monospace; }
")]
        public IEnumerator TailOfTheListBecomesAGlyphFallback()
        {
            yield return null;

            var font = Text().font;
            Assert.AreEqual("sans-serif", font.name);
            CollectionAssert.Contains(font.fallbackFontAssetTable, UnityEngine.Resources.Load<TMP_FontAsset>("ReactUnity/fonts/monospace"));
        }


        [UGUITest(Script = @"
            export const App = () => <>
                <view id='regular'>Regular</view>
                <view id='bold'>Bold</view>
                <view id='light'>Light</view>
            </>;
", Style = Variants + @"
    view { font-family: ""Variable""; }
    #bold { font-weight: bold; }
    #light { font-weight: 200; }
")]
        public IEnumerator WeightPicksTheFaceDeclaredForIt()
        {
            yield return null;

            Assert.AreEqual("sans-serif", Text("#regular").font.name);
            Assert.AreEqual("monospace", Text("#bold").font.name);

            // 200 has no face of its own, and the lighter side is empty, so the regular one is nearest.
            Assert.AreEqual("sans-serif", Text("#light").font.name);
        }


        [UGUITest(Script = @"
            export const App = () => <view id='test'><view id='inner'>Bold child</view></view>;
", Style = Variants + @"
    #test { font-family: ""Variable""; }
    #inner { font-weight: bold; }
")]
        public IEnumerator AnInheritedFamilyPicksTheChildsWeight()
        {
            yield return null;

            Assert.AreEqual("monospace", Text("#inner").font.name);

            // The face is already the bold one, so TextMeshPro is not asked to synthesize it too.
            Assert.AreEqual(FontStyles.Normal, Text("#inner").fontStyle);
            Assert.AreEqual(FontWeight.Regular, Text("#inner").fontWeight);
        }


        [UGUITest(Script = OneView, Style = Variants + @"
    #test { font-family: ""Variable""; font-style: italic; }
")]
        public IEnumerator ItalicPicksTheItalicFaceAndDropsTheSkew()
        {
            yield return null;

            Assert.AreEqual("monospace", Text().font.name);
            Assert.AreEqual(FontStyles.Normal, Text().fontStyle);
        }


        [UGUITest(Script = OneView, Style = Variants + @"
    #test { font-family: ""Variable""; font-weight: 900; }
")]
        public IEnumerator AHeavierWeightReachesForTheHeaviestFace()
        {
            yield return null;
            Assert.AreEqual("monospace", Text().font.name);
        }


        [UGUITest(Script = OneView, Style = @"
    #test { font: bold 20px ""Nowhere"", monospace; }
")]
        public IEnumerator TheFontShorthandTakesAFamilyList()
        {
            yield return null;

            Assert.AreEqual("monospace", Text().font.name);
            Assert.AreEqual(20, Text().fontSize);
            Assert.AreEqual(FontWeight.Bold, Text().fontWeight);
        }


        [UGUITest(Script = OneView, Style = @"
    @font-face {
      font-family: ""Formatted"";
      src: local(""Ignored""), url(resource:ReactUnity/fonts/monospace) format(""truetype"");
    }

    #test { font-family: ""Formatted""; }
")]
        public IEnumerator SrcSkipsLocalAndIgnoresFormatHints()
        {
            yield return null;
            Assert.AreEqual("monospace", Text().font.name);
        }
    }
}
