using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Editor.Tests
{
    public class ModuleCompatTests
    {
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

        [Test]
        public void ViteBuiltDocumentYieldsItsStylesheetLink()
        {
            // The whole reason a built project used to come up unstyled: the built index.html is
            // the only thing that names the CSS bundle.
            var styles = HtmlEntryPoint.ExtractStyles(
                "<link rel=\"stylesheet\" crossorigin href=\"/assets/index-DtPSOCnr.css\">");

            Assert.AreEqual(1, styles.Count);
            Assert.AreEqual("/assets/index-DtPSOCnr.css", styles[0].Href);
            Assert.IsNull(styles[0].Code);
        }

        [Test]
        public void StylesAndLinksKeepDocumentOrder()
        {
            // The cascade is order-dependent, so collecting all the <style> tags and then all the
            // <link> tags would quietly change which rule wins.
            var styles = HtmlEntryPoint.ExtractStyles(
                "<link rel='stylesheet' href='a.css'>" +
                "<style>view { color: red; }</style>" +
                "<link rel='stylesheet' href='b.css'>");

            Assert.AreEqual(3, styles.Count);
            Assert.AreEqual("a.css", styles[0].Href);
            Assert.AreEqual("view { color: red; }", styles[1].Code);
            Assert.AreEqual("b.css", styles[2].Href);
        }

        [Test]
        public void LinksThatAreNotStylesheetsAreSkipped()
        {
            // preload and modulepreload name the same file without asking for it to apply, and a
            // browser leaves an `alternate stylesheet` off until someone picks it.
            var styles = HtmlEntryPoint.ExtractStyles(
                "<link rel=\"preload\" as=\"style\" href=\"/assets/index.css\">" +
                "<link rel=\"modulepreload\" href=\"/assets/chunk.js\">" +
                "<link rel=\"icon\" href=\"/favicon.ico\">" +
                "<link rel=\"alternate stylesheet\" title=\"High contrast\" href=\"/hc.css\">" +
                "<link rel=\"stylesheet\" href=\"/assets/index.css\">");

            Assert.AreEqual(1, styles.Count);
            Assert.AreEqual("/assets/index.css", styles[0].Href);
        }

        [Test]
        public void RelTokensAreOrderAndCaseInsensitive()
        {
            var styles = HtmlEntryPoint.ExtractStyles("<link REL='StyleSheet Preload' HREF='x.css'>");

            Assert.AreEqual(1, styles.Count);
            Assert.AreEqual("x.css", styles[0].Href);
        }

        [Test]
        public void NonCssStyleTagsAndEmptyOnesAreSkipped()
        {
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles("<style type=\"text/x-scss\">$a: 1;</style>").Count);
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles("<style>   </style>").Count);
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles("<link rel=\"stylesheet\">").Count);
            Assert.AreEqual(1, HtmlEntryPoint.ExtractStyles("<style type=\"text/css\">view {}</style>").Count);
        }

        [Test]
        public void ADocumentWithNoStylesYieldsNothing()
        {
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles("<script src='a.js'></script>").Count);
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles("").Count);
            Assert.AreEqual(0, HtmlEntryPoint.ExtractStyles(null).Count);
        }
    }
}
