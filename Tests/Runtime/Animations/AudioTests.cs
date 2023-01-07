using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;

namespace ReactUnity.Tests
{
    public class AudioTests : TestBase
    {
        public AudioTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest]
        public IEnumerator ParsingWorksCorrectly()
        {
            var view = Q("#test");

            view.Style.Set("audio", $"url({TestHelpers.ClickUrl}) 3s 5, url(https://example.com/file.ogg) infinite 2s, url(res:something)");
            yield return null;

            var st = view.ComputedStyle;

            Assert.AreEqual(AssetReferenceType.Resource, st.audioClip.Get(0).Type);
            Assert.AreEqual("ReactUnity/tests/click", st.audioClip.Get(0).Value);
            Assert.AreEqual(3, st.audioDelay.Get(0));
            Assert.AreEqual(5, st.audioIterationCount.Get(0));

            Assert.AreEqual(AssetReferenceType.Url, st.audioClip.Get(1).Type);
            Assert.AreEqual("https://example.com/file.ogg", st.audioClip.Get(1).Value);
            Assert.AreEqual(2, st.audioDelay.Get(1));
            Assert.AreEqual(-1, st.audioIterationCount.Get(1));

            Assert.AreEqual(AssetReferenceType.Resource, st.audioClip.Get(2).Type);
            Assert.AreEqual("something", st.audioClip.Get(2).Value);
            Assert.AreEqual(0, st.audioDelay.Get(2));
            Assert.AreEqual(1, st.audioIterationCount.Get(2));


            view.Style.Set("audio", "none");
            yield return null;

            st = view.ComputedStyle;
            Assert.AreEqual(null, st.audioClip.Get(0));
            Assert.AreEqual(0, st.audioDelay.Get(0));
            Assert.AreEqual(1, st.audioIterationCount.Get(0, 1));

        }
    }
}
