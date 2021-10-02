using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class GradientTests
    {
        [TestCase("red, blue", "041b9a0d66ca181bd16febc22f30fde8", 0, 1, "041b9a0d66ca181bd16febc22f30fde8")]
        [TestCase("red, 10%, blue", "56fd6f2be2865253779dc5299c2bc152", 0, 1, "56fd6f2be2865253779dc5299c2bc152")]
        [TestCase("red, 10%, blue 30%", "1ddcd0ec3aca0da46c534e4f79d36138", 0, 0.3f, "0bfcda05ba4588e1c7e22a6705783aa9")]
        [TestCase("red 30%, green, blue", "e88d9b0391089d924765673d129ba4a8", 0.3f, 0.7f, "94fd77aaf94c4cd38c3302d33dce5cce")]
        [TestCase("red 30%, transparent, blue", "93d6c5472c8b66ecb70e33d3e012a064", 0.3f, 0.7f, "230d56f03f117084d4c7f0cf8a28ab74")]
        [TestCase("red, green, blue", "94fd77aaf94c4cd38c3302d33dce5cce", 0, 1, "94fd77aaf94c4cd38c3302d33dce5cce")]
        [TestCase("red, green, yellow, white, blue", "401970bedba40c5508292e7c56cc704d", 0, 1, "401970bedba40c5508292e7c56cc704d")]
        [TestCase("red, green, yellow 30% 60%, white, blue", "d0a072dcfd29fa91f6c8ff7ddc8e16f8", 0, 1, "d0a072dcfd29fa91f6c8ff7ddc8e16f8")]
        public void BasicGradient(string def, string nHash, float rOffset, float rSize, string rHash)
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });

            collection["background"] = $"linear-gradient({def})";
            style.UpdateParent(null);
            var bg = style.backgroundImage as GradientImageDefinition;
            var calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Ramp.imageContentsHash);

            collection["background"] = $"radial-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage as GradientImageDefinition;
            calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Ramp.imageContentsHash);

            collection["background"] = $"conic-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage as GradientImageDefinition;
            calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Ramp.imageContentsHash);

            collection["background"] = $"repeating-linear-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage as GradientImageDefinition;
            calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Ramp.imageContentsHash);

            collection["background"] = $"repeating-radial-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage as GradientImageDefinition;
            calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Ramp.imageContentsHash);

            collection["background"] = $"repeating-conic-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage as GradientImageDefinition;
            calc = bg.Gradient.GetCalculatedGradient(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Ramp.imageContentsHash);
        }
    }
}
