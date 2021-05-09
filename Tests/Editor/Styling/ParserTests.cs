using NUnit.Framework;
using ReactUnity.Styling.Parsers;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class ParserTests
    {
        [TestCase("", ',', new[] { "" })]
        [TestCase("0", ',', new[] { "0" })]
        [TestCase("hello world bye", ',', new[] { "hello world bye" })]
        [TestCase("hello world   bye", ' ', new[] { "hello", "world", "bye" })]
        [TestCase("hello , world ,   bye ", ',', new[] { "hello", "world", "bye" })]
        [TestCase("slidein 3s steps( 5, end ) infinite ", ' ', new[] { "slidein", "3s", "steps( 5, end )", "infinite" })]
        [TestCase("slidein 3s steps( 5, end ) infinite ,  hello something(a,b) ", ',', new[] { "slidein 3s steps( 5, end ) infinite", "hello something(a,b)" })]
        public void Split(string input, char separator, string[] expected)
        {
            Assert.AreEqual(expected, ParserHelpers.Split(input, separator));
        }


        [TestCase("", null)]
        [TestCase(" hello ", null)]
        [TestCase(" hello() ", new[] { "hello" })]
        [TestCase(" rgba(120, 364 , 22.5, 0.8  )  ", new[] { "rgba", "120", "364", "22.5", "0.8" })]
        [TestCase(" rgba(120, 364 , 22.5, 0.8  ))  ", null)]
        [TestCase(" var( --textColor )  ", new[] { "var", "--textColor" })]
        [TestCase("linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)", new[] { "linear-gradient", "0.25turn", "#3f87a6", "#ebf8e1", "#f69d3c" })]
        [TestCase("url(data:image/png; base64,iRxVB0)", new[] { "url", "data:image/png; base64", "iRxVB0" })]

        public void ParseFunction(string input, string[] expected)
        {
            Assert.AreEqual(expected, ParserHelpers.ParseFunction(input));
        }
    }
}
