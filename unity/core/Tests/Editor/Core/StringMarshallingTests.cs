using System;
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests.Editor
{
    /// An empty string and a missing value are different things, and an engine that conflates them
    /// makes `''` unrepresentable. QuickJS used to marshal every zero-length string back as null.
    public class StringMarshallingTests : EditorTestBase
    {
        public StringMarshallingTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(Script = @"
            function App() { };
            Globals.Probe('');
            Globals.Probe('x');
            Globals.Probe('héllo çay');
            Globals.Probe(null);
            Globals.Probe(undefined);
        ", AutoRender = false)]
        public IEnumerator AnEmptyStringReachesCsharpAsEmpty()
        {
            var seen = new List<string>();
            Globals["Probe"] = new Action<string>(s => seen.Add(s == null ? "<null>" : "[" + s + "]"));
            yield return null;
            Render();

            // The non-ASCII case is here to pin the decoding down as UTF-8 at the same time.
            Assert.AreEqual("[] [x] [héllo çay] <null> <null>", string.Join(" ", seen));
        }

        [EditorInjectableTest(Script = @"
            function App() { };
            Globals.Probe(typeof Globals.Empty + ':' + JSON.stringify(Globals.Empty));
        ", AutoRender = false)]
        public IEnumerator AnEmptyStringReachesScriptAsEmpty()
        {
            string seen = null;
            Globals["Probe"] = new Action<string>(s => seen = s);
            Globals["Empty"] = "";
            yield return null;
            Render();
            Assert.AreEqual("string:\"\"", seen);
        }
    }
}
