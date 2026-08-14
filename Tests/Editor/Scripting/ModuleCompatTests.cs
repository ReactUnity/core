using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Editor.Tests
{
    public class ModuleCompatTests
    {
        const string Url = "http://localhost:3100/assets/index.js";

        [Test]
        public void PlainScriptNeedsNoModuleScope()
        {
            Assert.IsFalse(ModuleCompat.NeedsModuleScope("var x = 1; var y = 2;"));
        }

        [Test]
        public void ModuleSyntaxAsksForModuleScope()
        {
            // What Vite appends to an HMR patch chunk, and what its dev bundle ends with.
            Assert.IsTrue(ModuleCompat.NeedsModuleScope("var a = 1;\n//# sourceMappingURL=x.map\n; export {}"));
            Assert.IsTrue(ModuleCompat.NeedsModuleScope("var a = 1;\nexport { __exportAll as t };"));
            Assert.IsTrue(ModuleCompat.NeedsModuleScope("var u = new URL(import.meta.url);"));
            Assert.IsTrue(ModuleCompat.NeedsModuleScope("export * from './x.js';"));
        }

        [Test]
        public void ADynamicImportAloneDoesNotAskForModuleScope()
        {
            // It parses in a plain script on every engine, so it is no reason to change how the
            // surrounding code is evaluated.
            Assert.IsFalse(ModuleCompat.NeedsModuleScope("var p = import('./x.js');"));
        }

        [Test]
        public void TheWordExportInsideCodeIsNotModuleSyntax()
        {
            Assert.IsFalse(ModuleCompat.NeedsModuleScope("var exported = 1; obj.export = 2; exports.a = 3;"));
        }

        [Test]
        public void DynamicImportGoesToTheHostHook()
        {
            // The line the Vite HMR client applies each patch with.
            var code = "const importPromise = import(base + url).then(() => globalThis.__rolldown_runtime__.loadExports(p));";

            var result = ModuleCompat.RewriteDynamicImports(code);
            StringAssert.Contains(ModuleCompat.ImportHook + "(base + url)", result);
        }

        [Test]
        public void ImportInsideAStringIsNotRewritten()
        {
            // React logs this text; rewriting it would corrupt the message.
            var code = "console.error(\"Expected the result of a dynamic import() call. Instead received: %s\");";
            Assert.AreEqual(code, ModuleCompat.RewriteDynamicImports(code));
        }

        [Test]
        public void EscapedQuotesDoNotConfuseTheStringCheck()
        {
            var code = "var a = \"he said \\\"hi\\\"\"; var p = import(x);";
            StringAssert.Contains(ModuleCompat.ImportHook + "(x)", ModuleCompat.RewriteDynamicImports(code));
        }

        [Test]
        public void ImportAsAPropertyOrIdentifierIsNotRewritten()
        {
            var code = "obj.import(x); myimport(y);";
            Assert.AreEqual(code, ModuleCompat.RewriteDynamicImports(code));
        }

        [TestCase("<script type=\"module\" src=\"/assets/index.js\"></script>", true, TestName = "IsHtml_ViteDevServerRoot")]
        [TestCase("<!doctype html><html><body></body></html>", true, TestName = "IsHtml_FullDocument")]
        [TestCase("\n\n  <script src=\"a.js\"></script>", true, TestName = "IsHtml_LeadingWhitespace")]
        [TestCase("(function() { var a = 1 < 2; })()", false, TestName = "IsHtml_Iife")]
        [TestCase("var a = 1;", false, TestName = "IsHtml_PlainScript")]
        [TestCase("//#region \\0rolldown/runtime.js\nvar a = 1;", false, TestName = "IsHtml_ViteDevChunk")]
        [TestCase("", false, TestName = "IsHtml_Empty")]
        public void HtmlIsDetectedFromTheContent(string content, bool expected)
        {
            Assert.AreEqual(expected, ScriptSource.LooksLikeHtml(content));
        }

        [Test]
        public void AnHtmlExtensionIsEnoughOnItsOwn()
        {
            var source = ScriptSource.Resource("react/index.html");
            Assert.IsTrue(source.IsHtml("var a = 1;"), "the extension should win over the content");
        }

        [Test]
        public void AJavascriptExtensionStopsTheContentSniff()
        {
            // A bundle that happens to start with `<` is still a bundle if it is called .js.
            var source = ScriptSource.Resource("react/index.js");
            Assert.IsFalse(source.IsHtml("<!-- banner -->\nvar a = 1;"));
        }

        [Test]
        public void AnExtensionlessSourceFallsBackToTheContent()
        {
            var source = ScriptSource.Resource("react/index");

            Assert.IsTrue(source.IsHtml("<script src=\"a.js\"></script>"));
            Assert.IsFalse(source.IsHtml("var a = 1;"));
        }

        [Test]
        public void AnExplicitHtmlSourceIsAlwaysHtml()
        {
            var source = ScriptSource.Resource("react/index.js", ScriptSourceLanguage.Html);
            Assert.IsTrue(source.IsHtml("var a = 1;"));
        }

        [Test]
        public void ViteEntryDocumentYieldsItsModuleScript()
        {
            var scripts = HtmlEntryPoint.ExtractScripts("<script type=\"module\" crossorigin src=\"/assets/index.js\"></script>");

            Assert.AreEqual(1, scripts.Count);
            Assert.AreEqual("/assets/index.js", scripts[0].Src);
            Assert.AreEqual(JavascriptDocumentType.Module, scripts[0].DocumentType);
        }

        [Test]
        public void InlineAndSrcScriptsAreKeptInOrder()
        {
            var scripts = HtmlEntryPoint.ExtractScripts(
                "<html><head><script>var a = 1;</script>" +
                "<script src='b.js'></script></head><body><div id='root'></div></body></html>");

            Assert.AreEqual(2, scripts.Count);
            Assert.AreEqual("var a = 1;", scripts[0].Code);
            Assert.AreEqual(JavascriptDocumentType.Script, scripts[0].DocumentType);
            Assert.AreEqual("b.js", scripts[1].Src);
        }

        [Test]
        public void NonJavascriptScriptTagsAreSkipped()
        {
            var scripts = HtmlEntryPoint.ExtractScripts(
                "<script type=\"importmap\">{\"imports\":{}}</script>" +
                "<script type=\"application/json\">{}</script>" +
                "<script type=\"text/javascript\">var a = 1;</script>");

            Assert.AreEqual(1, scripts.Count);
            Assert.AreEqual("var a = 1;", scripts[0].Code);
        }

        [Test]
        public void EmptyScriptTagsAreSkipped()
        {
            Assert.AreEqual(0, HtmlEntryPoint.ExtractScripts("<html><body><script>  </script></body></html>").Count);
        }
    }
}
