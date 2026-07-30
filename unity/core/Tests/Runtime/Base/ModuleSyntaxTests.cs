using System;
using System.Collections;
using System.IO;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    /// Vite's dev bundle and its HMR patches are classic scripts apart from a few module-only
    /// constructs. These pin down what each engine actually tolerates, and that ScriptContext
    /// bridges the gap for the engines that need it.
    public class ModuleSyntaxTests : TestBase
    {
        public ModuleSyntaxTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest]
        public IEnumerator OnlyQuickJSCannotResolveSpecifiersItself()
        {
            yield return null;

            // Executing a module does not imply resolving one. ClearScript and Jint both take an
            // async loader; QuickJS's is synchronous by C ABI, so an http import has to go through
            // the host loader instead.
            var resolves = Context.Script.Engine.Capabilities.HasFlag(EngineCapabilities.ModuleResolution);
            Assert.AreEqual(EngineType != JavascriptEngineType.QuickJS, resolves,
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
        public IEnumerator AModuleAtADevServerRootRunsFromItsOwnSource()
        {
            yield return null;

            // A url with no path is how an inline `<script type="module">` in a dev server's entry
            // document is addressed. If the engine does not recognise it as the code it was already
            // given, it fetches the root instead - and a dev server answers that with the document.
            Context.Script.ExecuteScript(
                "globalThis.__probe_root = 'ran';\nexport {}",
                "http://localhost:3100", JavascriptDocumentType.Module);

            Assert.AreEqual("ran", Context.Script.Engine.GetGlobal("__probe_root")?.ToString());
        }

        [UGUITest]
        public IEnumerator AStaticImportGraphLoadsAsynchronously()
        {
            yield return null;

            // QuickJS has no async loader at all, and ClearScript's resolves a non-http specifier
            // against the source url rather than the importing module, which a file url needs.
            IgnoreForEngine(JavascriptEngineType.QuickJS);
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            var dir = Path.Combine(Application.temporaryCachePath, "module-graph-" + graphCount++);
            Directory.CreateDirectory(dir);

            // Two hops, so the second is only discovered once the first has arrived. The middle one
            // records its own url: a module the loader fetched has to keep a whole one, or the
            // relative import below it has nothing to resolve against.
            File.WriteAllText(Path.Combine(dir, "leaf.js"), "export const value = 'loaded';");
            File.WriteAllText(Path.Combine(dir, "dep.js"),
                "export { value } from './leaf.js';\nglobalThis.__probe_dep_url = import.meta.url;");

            var entry = new Uri(Path.Combine(dir, "entry.js")).AbsoluteUri;
            Context.Script.ExecuteScript(
                "import { value } from './dep.js';\nglobalThis.__probe_graph = value;",
                entry, JavascriptDocumentType.Module);

            // Nothing has evaluated yet - the graph is still being fetched.
            Assert.AreEqual("", Probe(), "the import graph evaluated before it could have been fetched");

            for (var i = 0; i < 300 && Probe() == ""; i++) yield return null;

            Assert.AreEqual("loaded", Probe());

            var depUrl = Context.Script.Engine.GetGlobal("__probe_dep_url")?.ToString();
            StringAssert.StartsWith("file:", depUrl ?? "", "a fetched module lost the origin of its url");

            // Only on success: a request still in flight against a deleted file would log an error
            // into whichever test runs next.
            Directory.Delete(dir, true);
        }

        static int graphCount;

        /// Reading a global that was never set throws on Jint, and this one is expected to be
        /// missing until the graph has loaded. A string keeps the assert off Jint's boxed null.
        string Probe() => Context.Script.Engine.Evaluate(
            "typeof __probe_graph !== 'undefined' ? String(__probe_graph) : ''")?.ToString();

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
