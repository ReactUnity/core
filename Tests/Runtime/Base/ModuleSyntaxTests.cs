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
        public IEnumerator EveryEngineResolvesSpecifiersItself()
        {
            yield return null;

            // Executing a module does not imply resolving one, and QuickJS could not until it
            // gained quickjs-ng's asynchronous loader - its synchronous one has to return a module
            // there and then, which an http import cannot. A host import hook stood in until then,
            // and this is what let it be deleted: every engine on every target answers yes here,
            // WebGL included, where the jslib drives the same loader and the browser links.
            Assert.IsTrue(Context.Script.Engine.Capabilities.HasFlag(EngineCapabilities.ModuleResolution),
                $"{EngineType} cannot resolve a module specifier, and there is no longer a hook to stand in");
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

            // Nothing has evaluated yet - the graph is still being fetched. ClearScript is the
            // exception, and only here: its loader hands a file document to ClearScript's own,
            // which reads it inline, so the whole graph is already evaluated. Everything below
            // still holds for it.
            if (EngineType != JavascriptEngineType.ClearScript)
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
        public IEnumerator AResourceHostedModuleResolvesItsOwnImports()
        {
            yield return null;

            // The name a bundle loaded out of Resources gets is the resource path it came from,
            // not a url - which is what a player build and an editor with the dev server off both
            // give it. A relative specifier under one used to resolve to nothing at all, so a
            // code-split chunk could never load; ModuleUrl gives it a `resource:` origin instead.
            Context.Script.ExecuteScript(@"
import('./chunk.js').then(function (m) { globalThis.__probe_resource = m.value; });
export {}", "ReactUnity/tests/modules/entry.js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Resource() == ""; i++) yield return null;

            Assert.AreEqual("chunk", Resource(), $"{EngineType} could not import a chunk beside a resource-hosted module");
        }

        string Resource() => Context.Script.Engine.Evaluate(
            "typeof __probe_resource !== 'undefined' ? String(__probe_resource) : ''")?.ToString();

        [UGUITest]
        public IEnumerator AChunkThatImportsTheEntryBackReusesIt()
        {
            yield return null;

            // A code-split chunk imports the entry back for the runtime the two share, so the entry
            // has to be registered under the url that import resolves to. Under its bare resource
            // path it was not: the chunk resolved to a url naming a module the engine did not have
            // and evaluated the whole bundle a second time, and the second copy of the renderer
            // registered its callbacks in a map the C# side holds no ids for - a TypeError reading
            // `apply` of undefined on the first click, rather than anything naming a module.
            const string path = "ReactUnity/tests/modules/self-entry";
            Context.Script.ExecuteScript(Resources.Load<TextAsset>(path).text, path + ".js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Tag() == ""; i++) yield return null;

            Assert.AreEqual("entry", Tag(), $"{EngineType} could not import the entry back out of a chunk");
            Assert.AreEqual("1", Evals(), $"{EngineType} evaluated the entry once per importer instead of once");
        }

        string Tag() => Context.Script.Engine.Evaluate(
            "typeof __probe_tag !== 'undefined' ? String(__probe_tag) : ''")?.ToString();

        string Evals() => Context.Script.Engine.Evaluate(
            "typeof __probe_evals !== 'undefined' ? String(__probe_evals) : ''")?.ToString();

        [UGUITest]
        public IEnumerator AMissingResourceModuleNamesWhatItLookedFor()
        {
            yield return null;

            // The specifier has to have resolved before it can fail to load, and the difference is
            // the whole bug: an unresolved one is reported as "Could not resolve module './x.js'",
            // naming the specifier, where this names the url it went looking for.
            Context.Script.ExecuteScript(@"
import('./nothing-here.js').then(
  function () { globalThis.__probe_missing = 'loaded'; },
  function (e) { globalThis.__probe_missing = String((e && e.message) || e); });
export {}", "ReactUnity/tests/modules/entry.js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Missing() == ""; i++) yield return null;

            StringAssert.Contains("resource:///ReactUnity/tests/modules/nothing-here.js", Missing());
        }

        string Missing() => Context.Script.Engine.Evaluate(
            "typeof __probe_missing !== 'undefined' ? String(__probe_missing) : ''")?.ToString();

        [UGUITest]
        public IEnumerator AFailedImportReportsWhyAndNotThatEventIsMissing()
        {
            yield return null;

            // Shaped like the handler Vite wraps every dynamic import in. It reports a failure by
            // dispatching an Event and rethrows unless something calls preventDefault - so with no
            // Event to construct, every failed chunk load reported `Event is not defined` and the
            // reason went with it.
            Context.Script.ExecuteScript(@"
globalThis.__probe_vite = '';
import('./nothing-here.js').catch(function (err) {
  try {
    var evt = new Event('vite:preloadError', { cancelable: true });
    evt.payload = err;
    window.dispatchEvent(evt);
    if (!evt.defaultPrevented) throw err;
  } catch (rethrown) {
    globalThis.__probe_vite = String((rethrown && rethrown.message) || rethrown);
  }
});
export {}", "ReactUnity/tests/modules/entry.js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Vite() == ""; i++) yield return null;

            StringAssert.Contains("nothing-here.js", Vite());
            StringAssert.DoesNotContain("Event is not defined", Vite());
        }

        string Vite() => Context.Script.Engine.Evaluate(
            "typeof __probe_vite !== 'undefined' ? String(__probe_vite) : ''")?.ToString();

        [UGUITest]
        public IEnumerator AnEventReachesAGlobalListener()
        {
            yield return null;

            // The shim's other half: dispatchEvent takes an event object as well as a name, and
            // hands the object itself to the listener the way a browser does.
            Context.Script.Engine.Evaluate(@"
globalThis.__probe_evt = '';
addEventListener('probe:event', function (e) { globalThis.__probe_evt = e.type; });
dispatchEvent(new Event('probe:event'));
void 0;");

            for (var i = 0; i < 60 && Evt() == ""; i++) yield return null;

            Assert.AreEqual("probe:event", Evt());
        }

        string Evt() => Context.Script.Engine.Evaluate(
            "typeof __probe_evt !== 'undefined' ? String(__probe_evt) : ''")?.ToString();

        [UGUITest]
        public IEnumerator HostModuleRootsEvaluateInTheOrderTheyWereGiven()
        {
            yield return null;

            // An entry document's script tags are a list, and a browser runs them in order. The
            // first root here suspends on a top-level await, so evaluating the two concurrently
            // necessarily gives B,A - the second has nothing to wait for. That is what Vite's dev
            // document tripped over: it inlines the React Refresh preamble and then loads the app,
            // and the app reads what the preamble installs.
            //
            // Deliberately no imports: what is being pinned down is the order of the roots
            // themselves, and a fetch in between would only add a way for it to fail.
            Context.Script.Engine.Evaluate("globalThis.__probe_order = ''");

            Context.Script.ExecuteScript(
                "await Promise.resolve();\nglobalThis.__probe_order += 'A';\nexport {}",
                "http://localhost:3100/first.js", JavascriptDocumentType.Module);
            Context.Script.ExecuteScript(
                "globalThis.__probe_order += 'B';\nexport {}",
                "http://localhost:3100/second.js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Order().Length < 2; i++) yield return null;

            Assert.AreEqual("AB", Order(), $"{EngineType} let the second root overtake the first");
        }

        string Order() => Context.Script.Engine.Evaluate(
            "typeof __probe_order !== 'undefined' ? String(__probe_order) : ''")?.ToString();

        [UGUITest]
        public IEnumerator AModuleBodyMayCallBackIntoTheHost()
        {
            yield return null;

            // document.querySelectorAll marshals its result by evaluating a script, and evaluating
            // pumps the job queue - so a module body that touches the tree drains jobs from inside
            // one, which is how Vite's HMR client reached it. On QuickJS that ran a link pass into
            // a running evaluation and killed the editor, because js_inner_module_linking would
            // push a module already being evaluated and splice the stack both phases share through
            // JSModuleDef.stack_prev. The engine no longer allows it, and nothing on this side
            // guards it any more.
            Context.Script.ExecuteScript(
                "globalThis.__probe_reentry = document.querySelectorAll('*').length;\n" +
                "globalThis.__probe_reentry_done = 'ok';\nexport {}",
                "http://localhost:3100/reentry.js", JavascriptDocumentType.Module);

            for (var i = 0; i < 300 && Done() == ""; i++) yield return null;

            Assert.AreEqual("ok", Done(), $"{EngineType} never finished a module body that queried the tree");
        }

        string Done() => Context.Script.Engine.Evaluate(
            "typeof __probe_reentry_done !== 'undefined' ? String(__probe_reentry_done) : ''")?.ToString();

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
