using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.Types;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class ObjectFitTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image source='url(res:star)' />;
            }

            Renderer.render(<App />);
";

        public ImageComponent Image => Q("image") as ImageComponent;

        public ObjectFitTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript)]
        public IEnumerator ObjectFitWorksOnImage()
        {
            yield return null;

            var img = Image.Image;

            Image.Style.Set("width", 300);
            Image.Style.Set("height", 200);
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);

            Image.Style.Set("object-fit", "contain");
            yield return null;
            Assert.AreEqual(200, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);

            Image.Style.Set("object-fit", "cover");
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(300, img.rectTransform.rect.height);

            Image.Style.Set("object-fit", ObjectFit.Fill);
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);

            Image.Style.Set("object-fit", ObjectFit.None);
            yield return null;
            Assert.AreEqual(100, img.rectTransform.rect.width);
            Assert.AreEqual(100, img.rectTransform.rect.height);

            Image.Style.Set("object-fit", "scale-down");
            yield return null;
            Assert.AreEqual(100, img.rectTransform.rect.width);
            Assert.AreEqual(100, img.rectTransform.rect.height);


            Image.Style.Set("width", 80);
            Image.Style.Set("height", 50);
            yield return null;
            Assert.AreEqual(50, img.rectTransform.rect.width);
            Assert.AreEqual(50, img.rectTransform.rect.height);
        }
    }
}
