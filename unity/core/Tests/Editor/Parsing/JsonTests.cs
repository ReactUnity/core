using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class JsonTests
    {
        [TestCase("true", true)]
        [TestCase("false", false)]
        [TestCase("0", 0)]
        [TestCase("-5", -5)]
        [TestCase("2147483647", int.MaxValue)]
        [TestCase("-2147483648", int.MinValue)]
        [TestCase(" \r\n\t 42 \n", 42)]
        public void ParsesScalars(string json, object expected)
        {
            var value = JsonReader.Parse(json);
            Assert.AreEqual(expected, value);
            Assert.AreEqual(expected.GetType(), value.GetType());
        }

        [TestCase("1.5", 1.5)]
        [TestCase("-0.25", -0.25)]
        [TestCase("1e3", 1000.0)]
        [TestCase("-2.5E-2", -0.025)]
        [TestCase("1E+2", 100.0)]
        [TestCase("2147483648", 2147483648.0)]
        [TestCase("-2147483649", -2147483649.0)]
        [TestCase("12345678901234567890123", 12345678901234567890123.0)]
        public void ParsesNonIntegersAsDoubles(string json, double expected)
        {
            var value = JsonReader.Parse(json);
            Assert.IsInstanceOf<double>(value);
            Assert.AreEqual(expected, (double) value, Math.Abs(expected) * 1e-12);
        }

        [Test]
        public void ParsesNull()
        {
            Assert.IsNull(JsonReader.Parse("null"));
            Assert.AreEqual(new List<object> { null, 1 }, JsonReader.Parse("[null,1]"));
        }

        [TestCase(@"""""", "")]
        [TestCase(@"""plain""", "plain")]
        [TestCase(@"""a\""b\\c\/d""", "a\"b\\c/d")]
        [TestCase(@"""\b\f\n\r\t""", "\b\f\n\r\t")]
        [TestCase(@"""café é""", "café é")]
        [TestCase(@"""😀""", "😀")]
        [TestCase(@"""ğüş 😀 raw""", "ğüş 😀 raw")]
        [TestCase(@"""before\nafter""", "before\nafter")]
        public void ParsesStrings(string json, string expected)
        {
            Assert.AreEqual(expected, JsonReader.Parse(json));
        }

        [Test]
        public void KeepsDateLikeStringsAsWritten()
        {
            // Newtonsoft turned these into DateTimes, and a prop then read back in the current culture's format.
            Assert.AreEqual("2026-09-26T10:00:00.000Z", JsonReader.Parse(@"""2026-09-26T10:00:00.000Z"""));
        }

        [Test]
        public void ParsesNestedValuesInOrder()
        {
            var value = JsonReader.Parse(@"{ ""b"": 1, ""a"": [1, { ""c"": null }, []], ""e"": {} }");

            var obj = value as JsonObject;
            Assert.IsNotNull(obj);
            CollectionAssert.AreEqual(new[] { "b", "a", "e" }, obj.Select(x => x.Key));
            Assert.AreEqual(1, obj["b"]);

            var list = obj["a"] as List<object>;
            Assert.AreEqual(3, list.Count);
            Assert.AreEqual(1, list[0]);
            Assert.IsTrue(((JsonObject) list[1]).TryGetValue("c", out var c));
            Assert.IsNull(c);
            Assert.IsEmpty((List<object>) list[2]);
            Assert.IsEmpty((JsonObject) obj["e"]);
            Assert.IsNull(obj["missing"]);
            Assert.IsFalse(obj.TryGetValue("missing", out _));
        }

        [Test]
        public void ParsesCommandBuffers()
        {
            var value = JsonReader.Parse(@"[[0,12,""view"",{""p"":{""className"":""a b"",""style"":{""p"":{""flexGrow"":1.5}}},""e"":{""onClick"":3}},null],[4,1,12,7]]");

            var commands = (List<object>) value;
            var create = (List<object>) commands[0];
            Assert.AreEqual(new object[] { 0, 12, "view" }, create.Take(3).ToArray());
            Assert.IsNull(create[4]);

            var props = (JsonObject) create[3];
            var style = (JsonObject) ((JsonObject) props["p"])["style"];
            Assert.AreEqual(1.5, ((JsonObject) style["p"])["flexGrow"]);
            Assert.AreEqual(3, ((JsonObject) props["e"])["onClick"]);
            Assert.AreEqual(new List<object> { 4, 1, 12, 7 }, commands[1]);
        }

        [TestCase("")]
        [TestCase("   ")]
        [TestCase("[1,]")]
        [TestCase("[1 2]")]
        [TestCase("[1")]
        [TestCase(@"{""a"" 1}")]
        [TestCase(@"{""a"":1,}")]
        [TestCase("{a:1}")]
        [TestCase(@"""abc")]
        [TestCase(@"""\x""")]
        [TestCase(@"""\u12""")]
        [TestCase(@"""\u12g4""")]
        [TestCase("tru")]
        [TestCase("nul")]
        [TestCase("-")]
        [TestCase("1.")]
        [TestCase("1e")]
        [TestCase(".5")]
        [TestCase("[1] x")]
        public void RejectsMalformedInput(string json)
        {
            var ex = Assert.Throws<FormatException>(() => JsonReader.Parse(json));
            StringAssert.Contains("at position", ex.Message);
        }

        [Test]
        public void IndexerReplacesInPlaceAndAppendsNewKeys()
        {
            var obj = (JsonObject) JsonReader.Parse(@"{""a"":1,""b"":2}");
            obj["a"] = 3;
            obj["c"] = 4;

            CollectionAssert.AreEqual(new[] { "a", "b", "c" }, obj.Select(x => x.Key));
            CollectionAssert.AreEqual(new object[] { 3, 2, 4 }, obj.Select(x => x.Value));
        }

        [Test]
        public void WritesManifestLayout()
        {
            var manifest = string.Join("\n",
                "{",
                @"  ""dependencies"": {",
                @"    ""com.reactunity.core"": ""0.22.0"",",
                @"    ""com.unity.ugui"": ""2.0.0""",
                "  },",
                @"  ""scopedRegistries"": [",
                "    {",
                @"      ""name"": ""package.openupm.com"",",
                @"      ""url"": ""https://package.openupm.com"",",
                @"      ""scopes"": [",
                @"        ""com.reactunity""",
                "      ]",
                "    }",
                "  ],",
                @"  ""testables"": [],",
                @"  ""settings"": {},",
                @"  ""enableLockFile"": true,",
                @"  ""number"": -1.25,",
                @"  ""nothing"": null",
                "}");

            Assert.AreEqual(manifest, JsonWriter.Write(JsonReader.Parse(manifest)));
        }

        [Test]
        public void WritesEscapes()
        {
            Assert.AreEqual(@"""q\""b\\n\nr\rt\t\u0001 é 😀 /""", JsonWriter.Write("q\"b\\n\nr\rt\t\u0001 é 😀 /"));
        }

        [TestCase("\"\\ud83d\\ude00 \\u0000 \\b\\f\"")]
        [TestCase("[1,-2,0.5,1e+300,true,false,null,\"x\",{},[]]")]
        public void RoundTripsThroughTheWriter(string json)
        {
            var value = JsonReader.Parse(json);
            Assert.AreEqual(value, JsonReader.Parse(JsonWriter.Write(value)));
        }
    }
}
