using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    /// Vite's dev bundle and its HMR patches are classic scripts apart from a few module-only
    /// constructs. These pin down what each engine actually tolerates, and that ScriptContext
    /// bridges the gap for the engines that need it.
    public class ModuleSyntaxTests : TestBase
    {
        public ModuleSyntaxTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest]
        public IEnumerator OnlyClearScriptResolvesSpecifiersItself()
        {
            yield return null;

            // Executing a module does not imply resolving one: QuickJS and Jint only look in a
            // local file system, so an http dynamic import has to go through the host loader.
            var resolves = Context.Script.Engine.Capabilities.HasFlag(EngineCapabilities.ModuleResolution);
            Assert.AreEqual(EngineType == JavascriptEngineType.ClearScript, resolves,
                $"{EngineType} module resolution is not what the import hook assumes");
        }

        [UGUITest]
        public IEnumerator ATrailingExportRunsAsAModule()
        {
            yield return null;

            // Real module scope, so this needs no rewriting at all.
            Context.Script.ExecuteScript(
                "globalThis.__probe_export = 'ran';\nexport {}",
                "http://localhost:3100/assets/index.js", JavascriptDocumentType.Module);

            Assert.AreEqual("ran", Context.Script.Engine.GetGlobal("__probe_export")?.ToString());
        }

        [UGUITest]
        public IEnumerator EveryEngineParsesDynamicImport()
        {
            yield return null;

            // Never reached, so this only asserts the syntax parses. It has to: the Vite HMR
            // client contains a dynamic import whether or not that path runs.
            var error = Context.Script.Engine.TryExecute(
                "function __probe_di() { return import('./nope.js'); } void 0;", "ReactUnity/tests/dynamic-import");

            Assert.IsNull(error, $"{EngineType} could not parse a dynamic import: {error?.Message}");
        }

        [UGUITest]
        public IEnumerator ImportMetaUrlRunsOnEveryEngine()
        {
            yield return null;

            const string url = "http://localhost:3100/assets/index.js";
            Context.Script.ExecuteScript("globalThis.__probe_url = import.meta.url;", url, JavascriptDocumentType.Module);

            // Jint appends a cache-busting query to the specifier it reports, so match the origin
            // and path rather than the whole string - that is what the Vite client reads off it.
            var actual = Context.Script.Engine.GetGlobal("__probe_url")?.ToString();
            Assert.IsNotNull(actual, $"{EngineType} left import.meta.url unset");
            StringAssert.StartsWith(url, actual);
        }

        [UGUITest]
        public IEnumerator AVitePatchChunkRunsOnEveryEngine()
        {
            yield return null;

            // Shaped like a real hmr_patch_N.js: classic-script body, then the export Vite appends.
            // A string sentinel keeps the assert off Jint's boxed number type.
            const string patch = @"
globalThis.__probe_patch_ran = 'ran';
//# sourceMappingURL=hmr_patch_0.js.map
; export {}";

            Context.Script.ExecuteScript(patch, "http://localhost:3100/hmr_patch_0.js", JavascriptDocumentType.Module);

            Assert.AreEqual("ran", Context.Script.Engine.GetGlobal("__probe_patch_ran")?.ToString());
        }
    }
}
