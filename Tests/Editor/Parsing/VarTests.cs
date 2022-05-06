using NUnit.Framework;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class VarTests
    {
        [TestCase("rgb(var(--aa), 189, 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, 112), 189, 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc), 189, 153)", "000000ff")]
        [TestCase("rgb(calc(var(--bb) * 2), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(var(--cc, 56) * 2), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(var(--cc) * 2), 189, 153)", "000000ff")]
        public void ColorWithVar(object input, object expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--bb"] = "56";
            collection["--aa"] = "112";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }
    }
}
