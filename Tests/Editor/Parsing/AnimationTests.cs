using System.Linq;
using ExCSS;
using NUnit.Framework;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class AnimationTests
    {
        static StylesheetParser Parser = new StylesheetParser(true, true, true, true, true);

        [Test]
        public void KeyframesParser()
        {
            var parsed = Parser.Parse(@"
@keyframes appear {
  from {
    opacity: 0%;
    scale: 0.8 0.8;
  }
  to {
    opacity: 100%;
    scale: 1 1;
  }
}
");

            var kfs = KeyframeList.Create(parsed.Children.OfType<IKeyframesRule>().First());

            Assert.True(kfs.Valid);
            Assert.AreEqual(kfs.From, kfs.Steps[0]);
            Assert.AreEqual(kfs.To, kfs.Steps[1]);
            Assert.AreEqual(0, kfs.From.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new Vector2(0.8f, 0.8f), kfs.From.Rules[StyleProperties.scale]);

            Assert.AreEqual(1, kfs.To.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new Vector2(1, 1), kfs.To.Rules[StyleProperties.scale]);
        }
    }
}
