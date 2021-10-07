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
        [TestCase("red, blue", "3db64175ae8e808730a1182d64ef6a03", 0, 1, "3db64175ae8e808730a1182d64ef6a03")]
        [TestCase("red, 10%, blue", "8546093595a46d2de9a90933e8e8dbe0", 0, 1, "8546093595a46d2de9a90933e8e8dbe0")]
        [TestCase("red, 10%, blue 30%", "84f0ccb63dcdb334dd96504ec5d0bc95", 0, 0.3f, "b38b281f2d759d21a561cb8fbd42fc62")]
        [TestCase("red 30%, green, blue", "cce049da626d19711d1c947e78c9b39f", 0.3f, 0.7f, "23ea967618d058d10f3eaa2d6f3774c1")]
        [TestCase("red 30%, transparent, blue", "39b062b7f0f4c95e18604b3ce2697168", 0.3f, 0.7f, "6b193748244290a338dff44bdc89c3a6")]
        [TestCase("red, green, blue", "23ea967618d058d10f3eaa2d6f3774c1", 0, 1, "23ea967618d058d10f3eaa2d6f3774c1")]
        [TestCase("red, green, yellow, white, blue", "5669de6caa3c3e7b81d0102bfec9ed0d", 0, 1, "5669de6caa3c3e7b81d0102bfec9ed0d")]
        [TestCase("red, green, yellow 30% 60%, white, blue", "54ab53af32aa0c82fb114244681efada", 0, 1, "54ab53af32aa0c82fb114244681efada")]
        public void BasicGradient(string def, string nHash, float rOffset, float rSize, string rHash)
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });

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
