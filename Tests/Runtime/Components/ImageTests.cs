using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ImageTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image source='resource(star)' />;
            }
";

        public ImageComponent Image => Q("image") as ImageComponent;
        public Rect Rect => GetRectOfImageContent();


        public Rect GetRectOfImageContent() => StylingHelpers.GetScreenClientRect(Image.Replaced.RectTransform);

        public ImageTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ObjectFitAndPositionWorksOnImage()
        {
            yield return null;

            var img = Image.Image;

            Image.Style.Set("width", 300);
            Image.Style.Set("height", 200);
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "10px 20px");
            yield return null;
            Assert.AreEqual(10, Rect.x, 1);
            Assert.AreEqual(20, Rect.y, 1);

            Image.Style.Set("object-position", "10% 20%");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);


            Image.Style.Set("object-fit", "contain");
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(200, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);
            Assert.AreEqual(50, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "10px 20px");
            yield return null;
            Assert.AreEqual(10, Rect.x, 1);
            Assert.AreEqual(20, Rect.y, 1);

            Image.Style.Set("object-position", "10% 20%");
            yield return null;
            Assert.AreEqual(10, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "bottom right");
            yield return null;
            Assert.AreEqual(100, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-fit", "cover");
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(300, img.rectTransform.rect.height);
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(-50, Rect.y, 1);

            Image.Style.Set("object-position", "10px 20px");
            yield return null;
            Assert.AreEqual(10, Rect.x, 1);
            Assert.AreEqual(20, Rect.y, 1);

            Image.Style.Set("object-position", "10% 20%");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(-20, Rect.y, 1);

            Image.Style.Set("object-position", "100% 100%");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(-100, Rect.y, 1);

            Image.Style.Set("object-position", "bottom right");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(-100, Rect.y, 1);

            Image.Style.Set("object-fit", ObjectFit.Fill);
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(300, img.rectTransform.rect.width);
            Assert.AreEqual(200, img.rectTransform.rect.height);
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-fit", ObjectFit.None);
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(100, img.rectTransform.rect.width);
            Assert.AreEqual(100, img.rectTransform.rect.height);
            Assert.AreEqual(100, Rect.x, 1);
            Assert.AreEqual(50, Rect.y, 1);

            Image.Style.Set("object-position", "10% 20%");
            yield return null;
            Assert.AreEqual(20, Rect.x, 1);
            Assert.AreEqual(20, Rect.y, 1);

            Image.Style.Set("object-position", "bottom right");
            yield return null;
            Assert.AreEqual(200, Rect.x, 1);
            Assert.AreEqual(100, Rect.y, 1);

            Image.Style.Set("object-fit", "scale-down");
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(100, img.rectTransform.rect.width);
            Assert.AreEqual(100, img.rectTransform.rect.height);
            Assert.AreEqual(100, Rect.x, 1);
            Assert.AreEqual(50, Rect.y, 1);

            Image.Style.Set("object-fit", "scale-down");
            Image.Style.Set("object-position", "50%");
            yield return null;
            Assert.AreEqual(100, img.rectTransform.rect.width);
            Assert.AreEqual(100, img.rectTransform.rect.height);
            Assert.AreEqual(100, Rect.x, 1);
            Assert.AreEqual(50, Rect.y, 1);

            Image.Style.Set("width", 80);
            Image.Style.Set("height", 50);
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(50, img.rectTransform.rect.width);
            Assert.AreEqual(50, img.rectTransform.rect.height);
            Assert.AreEqual(15, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "top left");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "bottom right");
            yield return null;
            Assert.AreEqual(30, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);


            Image.Style.Set("width", 50);
            Image.Style.Set("height", 80);
            Image.Style.Set("object-position", "center");
            yield return null;
            Assert.AreEqual(50, img.rectTransform.rect.width);
            Assert.AreEqual(50, img.rectTransform.rect.height);
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(15, Rect.y, 1);


            Image.Style.Set("object-position", "top left");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(0, Rect.y, 1);

            Image.Style.Set("object-position", "bottom right");
            yield return null;
            Assert.AreEqual(0, Rect.x, 1);
            Assert.AreEqual(30, Rect.y, 1);
        }

        [UGUITest(Script = BaseScript, Style = @"
            image::before, image::after {
                content: 'hello';
            }
")]
        public IEnumerator BeforeAfterDoesNotCrashImage()
        {
            yield return null;
            Assert.AreEqual(null, Image.BeforePseudo);
            Assert.AreEqual(null, Image.AfterPseudo);
        }


        [UGUITest(Script = BaseScript)]
        public IEnumerator StyleColorAppliesToImage()
        {
            yield return null;
            Assert.AreEqual(Color.white, Image.Image.color);

            InsertStyle(":graphic { color: blue; }");
            yield return null;
            Assert.AreEqual(Color.blue, Image.Image.color);

            InsertStyle("image { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, Image.Image.color);
        }
    }
}
