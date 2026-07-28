using NUnit.Framework;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class GradientTests
    {
        // Hashes cover the ramp texture contents, so they moved with b0fc4788, which writes the
        // ramp in linear space to match the linear texture it is stored in.
        [TestCase("red, blue", "3e8dcce449b89dd342500526a6245de0", 0, 1, "3e8dcce449b89dd342500526a6245de0")]
        [TestCase("red, 10%, blue", "41be92438687e9cbbe03f1e0fa5545bc", 0, 1, "41be92438687e9cbbe03f1e0fa5545bc")]
        [TestCase("red, 10%, blue 30%", "e413b31430fac21463a3088d56dec779", 0, 0.3f, "a7b763b76993ebb4a36f379c918b02aa")]
        [TestCase("red 30%, green, blue", "7f642cf49b6b821e1857af974ceae29d", 0.3f, 0.7f, "fa9d2853f6c3b948fd2a46190c297db6")]
        [TestCase("red 30%, transparent, blue", "39b062b7f0f4c95e18604b3ce2697168", 0.3f, 0.7f, "6b193748244290a338dff44bdc89c3a6")]
        [TestCase("red, green, blue", "fa9d2853f6c3b948fd2a46190c297db6", 0, 1, "fa9d2853f6c3b948fd2a46190c297db6")]
        [TestCase("red, green, yellow, white, blue", "2d347def97f7d92639bad93d3c34680e", 0, 1, "2d347def97f7d92639bad93d3c34680e")]
        [TestCase("red, green, yellow 30% 60%, white, blue", "f0d5319edca03f201f8965851054590a", 0, 1, "f0d5319edca03f201f8965851054590a")]
        public void BasicGradient(string def, string nHash, float rOffset, float rSize, string rHash)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["background"] = $"linear-gradient({def})";
            style.UpdateParent(null);
            var bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            var calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Texture.imageContentsHash);

            collection["background"] = $"radial-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Texture.imageContentsHash);

            collection["background"] = $"conic-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(0, calc.Offset);
            Assert.AreEqual(1, calc.Length);
            Assert.AreEqual(Hash128.Parse(nHash), calc.Texture.imageContentsHash);

            collection["background"] = $"repeating-linear-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Texture.imageContentsHash);

            collection["background"] = $"repeating-radial-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Texture.imageContentsHash);

            collection["background"] = $"repeating-conic-gradient({def})";
            style.UpdateParent(null);
            bg = style.backgroundImage?.Get(0) as GradientImageDefinition;
            calc = bg.Gradient.GetRamp(Vector2.one * 100);
            Assert.AreEqual(rOffset, calc.Offset);
            Assert.AreEqual(rSize, calc.Length);
            Assert.AreEqual(Hash128.Parse(rHash), calc.Texture.imageContentsHash);
        }
    }
}
