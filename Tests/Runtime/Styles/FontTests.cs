using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using TMPro;

namespace ReactUnity.Tests
{
    public class FontTests : TestBase
    {
        public FontTests(JavascriptEngineType engineType) : base(engineType) { }

        UGUI.ContainerComponent View => Q("#test") as UGUI.ContainerComponent;
        TextMeshProUGUI Text => View.RectTransform.GetComponentInChildren<TextMeshProUGUI>();


        [ReactInjectableTest(Style = @"
    @font-face {
      font-family: ""Test Font Name"";
      src: resource(""ReactUnity/fonts/monospace"");
    }


    #test {
        font-family: ""Test Font Name"";
    }
")]
        public IEnumerator DefaultFontSizeWorks()
        {
            yield return null;
            Assert.AreEqual(Text.font.name, "monospace");
        }


        const string DefaultText = @"LONDON. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall.";
        const string CapitalizedText = @"LONDON. Michaelmas Term Lately Over, And The Lord Chancellor Sitting In Lincoln's Inn Hall.";

        const string TextTransformTest = @"export const App = () => <view id='test'>LONDON. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall.</view>";


        [ReactInjectableTest(Code = TextTransformTest)]
        public IEnumerator NativeTextTransformsWork()
        {
            Assert.AreEqual(FontStyles.Normal, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);

            View.Style["text-transform"] = "uppercase";
            yield return null;
            Assert.AreEqual(FontStyles.UpperCase, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);

            View.Style["text-transform"] = "lowercase";
            yield return null;
            Assert.AreEqual(FontStyles.LowerCase, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);

            View.Style["text-transform"] = "smallcaps";
            yield return null;
            Assert.AreEqual(FontStyles.SmallCaps, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);

            View.Style["text-transform"] = "none";
            yield return null;
            Assert.AreEqual(FontStyles.Normal, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);
        }

        [ReactInjectableTest(Code = TextTransformTest)]
        public IEnumerator TextTransformCapitalizeWorks()
        {
            View.Style["text-transform"] = "capitalize";
            yield return null;
            Assert.AreEqual(FontStyles.Normal, Text.fontStyle);
            Assert.AreEqual(CapitalizedText, Text.text);

            View.Style["text-transform"] = "none";
            yield return null;
            Assert.AreEqual(FontStyles.Normal, Text.fontStyle);
            Assert.AreEqual(DefaultText, Text.text);
        }
    }
}
