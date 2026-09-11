using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Tests
{
    /// <summary>
    /// What a CSS minifier does to a `filter` value, which is the shape the property arrives in for
    /// anyone building with Vite: the space between two calls goes, because `)` cannot run into an
    /// identifier, and an argument goes wherever it is that function's own default.
    /// </summary>
    public class FilterParsingTests : TestBase
    {
        public FilterParsingTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                return <view id='test' />;
            }
        ";

        FilterDefinition Filter => Q("#test").ComputedStyle.filter;

        [UGUITest(Script = BaseScript)]
        public IEnumerator CallsNeedNoWhitespaceBetweenThem()
        {
            yield return null;

            InsertStyle(@"#test { filter: grayscale(0.4) brightness(0.85); }");
            yield return null;
            Assert.AreEqual(0.4f, Filter.Grayscale, 0.001f);
            Assert.AreEqual(0.85f, Filter.Brightness, 0.001f);

            // The same value as a minifier writes it. This used to be one token naming no function,
            // and reading its arguments threw -- taking the whole stylesheet with it.
            InsertStyle(@"#test { filter: grayscale(.4)brightness(.85); }");
            yield return null;
            Assert.AreEqual(0.4f, Filter.Grayscale, 0.001f);
            Assert.AreEqual(0.85f, Filter.Brightness, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ANestedCallDoesNotEndTheOneAroundIt()
        {
            yield return null;

            InsertStyle(@"#test { filter: blur(2px)drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.5))invert(0.25); }");
            yield return null;

            Assert.AreEqual(2f, Filter.Blur, 0.001f);
            Assert.AreEqual(0.25f, Filter.Invert, 0.001f);
            Assert.AreEqual(new Vector2(1, 2), Filter.DropShadowOffset);
            Assert.AreEqual(3f, Filter.DropShadowBlur, 0.001f);
            Assert.AreEqual(0.5f, Filter.DropShadowColor.a, 0.01f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator OneBadCallDoesNotCostTheDeclarationsAroundIt()
        {
            yield return null;

            InsertStyle(@"#test { color: red; filter: banana(2px); opacity: 0.5; }");
            yield return null;

            var view = Q("#test");
            Assert.AreEqual(Color.red, view.ComputedStyle.color);
            Assert.AreEqual(0.5f, view.ComputedStyle.opacity);
        }

        // `grayscale()`, `invert()` and `sepia()` mean 1; every other function's own default is the
        // identity, which is what the property starts at anyway.
        static readonly (string Value, string Field, float Expected)[] EmptyArgumentCases =
        {
            ("grayscale()", "Grayscale", 1f),
            ("invert()", "Invert", 1f),
            ("sepia()", "Sepia", 1f),
            ("brightness()", "Brightness", 1f),
            ("contrast()", "Contrast", 1f),
            ("saturate()", "Saturate", 1f),
            ("opacity()", "Opacity", 1f),
            ("blur()", "Blur", 0f),
            ("hue-rotate()", "HueRotate", 0f),
        };

        [UGUITest(Script = BaseScript)]
        public IEnumerator NoArgumentMeansTheFunctionsOwnDefault()
        {
            yield return null;

            foreach (var (value, field, expected) in EmptyArgumentCases)
            {
                InsertStyle($"#test {{ filter: {value}; }}");
                yield return null;

                var actual = (float) typeof(FilterDefinition).GetProperty(field).GetValue(Filter);
                Assert.AreEqual(expected, actual, 0.001f, $"filter: {value} should be {expected}");
            }
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator AnEmptyArgumentStillReadsAsPartOfAList()
        {
            yield return null;

            InsertStyle(@"#test { filter: grayscale()blur(3px); }");
            yield return null;

            Assert.AreEqual(1f, Filter.Grayscale, 0.001f);
            Assert.AreEqual(3f, Filter.Blur, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator NothingRecognisedIsStillTheIdentity()
        {
            yield return null;

            // `none` is a keyword, so it never reaches the call-list parser -- the property is
            // simply left unset, which is what every consumer already reads as no filter.
            InsertStyle(@"#test { filter: none; }");
            yield return null;
            Assert.IsNull(Filter);

            // A list of calls does reach it, and one naming no function it knows leaves every
            // function at its identity rather than failing the declaration.
            InsertStyle(@"#test { filter: banana(2)coconut(); }");
            yield return null;
            Assert.AreEqual(FilterDefinition.Default, Filter);
        }
    }
}
