using System;
using System.Collections.Generic;
using NUnit.Framework.Interfaces;
using ReactUnity.Scripting;
using ReactUnity.Styling;

namespace ReactUnity.Tests
{
    public static class TestHelpers
    {
        public static (InlineStyles, NodeStyle) CreateStyle()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });
            return (collection, style);
        }

        public static JavascriptEngineType GetEngineTypeOfTest(ITest test)
        {
            var parent = test;
            while (parent != null)
            {
                var fixture = test.Fixture as TestBase;
                if (fixture != null) return fixture.EngineType;
                parent = parent.Parent;
            }

            var enumNames = Enum.GetNames(typeof(JavascriptEngineType));

            foreach (var enumName in enumNames)
            {
                if (test.FullName.ToLowerInvariant().Contains($"({enumName})".ToLowerInvariant()))
                {
                    if (Enum.TryParse<JavascriptEngineType>(enumName, out var resolved)) return resolved;
                }
            }
            return JavascriptEngineType.Auto;
        }
    }
}
