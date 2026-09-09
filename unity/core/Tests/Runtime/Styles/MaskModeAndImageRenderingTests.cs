using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    /// <summary>
    /// <c>mask-mode</c> and <c>image-rendering</c>: the two keywords the soft mask and the
    /// nearest-neighbour sampler are selected with.
    /// </summary>
    public class MaskModeAndImageRenderingTests : TestBase
    {
        public MaskModeAndImageRenderingTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                return <view id='test'>
                    <image id='img' source='resource(ReactUnity/tests/sprites/star)' />
                </view>;
            }
        ";

        [UGUITest(Script = BaseScript)]
        public IEnumerator MaskModeDefaultsToMatchSource()
        {
            yield return null;

            var style = Q("#test").ComputedStyle;
            Assert.AreEqual(MaskMode.MatchSource, style.maskMode.Get(0));

            InsertStyle(@"#test { mask-mode: luminance; }");
            yield return null;
            Assert.AreEqual(MaskMode.Luminance, Q("#test").ComputedStyle.maskMode.Get(0));

            InsertStyle(@"#test { mask-mode: alpha; }");
            yield return null;
            Assert.AreEqual(MaskMode.Alpha, Q("#test").ComputedStyle.maskMode.Get(0));
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator MaskTypeIsTheSameChoice()
        {
            yield return null;

            // The two differ only in which end of an SVG `<mask>` makes the decision, and there is
            // no such element here.
            InsertStyle(@"#test { mask-type: luminance; }");
            yield return null;
            Assert.AreEqual(MaskMode.Luminance, Q("#test").ComputedStyle.maskMode.Get(0));
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator TheMaskShorthandCarriesAMode()
        {
            yield return null;

            InsertStyle(@"#test { mask: url(res:ReactUnity/tests/sprites/star) luminance, url(res:ReactUnity/tests/sprites/star) alpha; }");
            yield return null;

            var style = Q("#test").ComputedStyle;
            Assert.AreEqual(2, style.maskImage.Count);
            Assert.AreEqual(MaskMode.Luminance, style.maskMode.Get(0));
            Assert.AreEqual(MaskMode.Alpha, style.maskMode.Get(1));
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ImageRenderingSwapsTheSamplerOnAnImage()
        {
            yield return null;

            var img = Q("#img") as BaseImageComponent;
            var before = img.Replaced.Graphic.material;

            InsertStyle(@"#img { image-rendering: pixelated; }");
            yield return null;

            Assert.AreEqual(ImageRendering.Pixelated, img.ComputedStyle.imageRendering);
            Assert.AreEqual("ReactUnity/PixelatedImage", img.Replaced.Graphic.material.shader.name);

            // `crisp-edges` asks for the same thing in the same direction, and nothing here can tell
            // the two apart.
            InsertStyle(@"#img { image-rendering: crisp-edges; }");
            yield return null;
            Assert.AreEqual("ReactUnity/PixelatedImage", img.Replaced.Graphic.material.shader.name);

            InsertStyle(@"#img { image-rendering: auto; }");
            yield return null;
            Assert.AreEqual(before, img.Replaced.Graphic.material);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ABackgroundLayerHonoursItToo()
        {
            yield return null;

            InsertStyle(@"#test { background-image: url(res:ReactUnity/tests/sprites/star); image-rendering: pixelated; }");
            yield return null;

            var layer = Q("#test").BorderAndBackground.BackgroundGraphics[0];
            Assert.IsTrue(layer.Pixelated);
            Assert.AreEqual("ReactUnity/PixelatedImage", layer.material.shader.name);
        }
    }
}
