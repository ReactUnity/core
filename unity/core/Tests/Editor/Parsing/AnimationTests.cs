using System.Linq;
using ExCSS;
using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Tests.Editor
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
            Assert.AreEqual(new ComputedConstant(0f), kfs.From.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new ComputedConstant(new Vector3(0.8f, 0.8f, 1)), kfs.From.Rules[StyleProperties.scale]);

            Assert.AreEqual(new ComputedConstant(1f), kfs.To.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new ComputedConstant(new Vector3(1, 1, 1)), kfs.To.Rules[StyleProperties.scale]);
        }
    }
}
