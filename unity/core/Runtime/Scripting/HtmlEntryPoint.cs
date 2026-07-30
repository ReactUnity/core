using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ReactUnity.Scripting
{
    /// Pulls the script tags out of a dev server's entry document.
    ///
    /// A dev server answers its root with HTML rather than JavaScript - Vite's is a bare
    /// `<script type="module" src="/assets/index.js">` - so the bundle it points at is what has
    /// to run. Only the scripts are taken: the rest of an index.html describes a browser page
    /// and has no meaning here.
    ///
    /// Deliberately regex-based rather than going through HtmlParser, which is strict XML and
    /// rejects ordinary HTML5 - valueless attributes like Vite's `crossorigin`, void `<meta>`,
    /// and the doctype all fail to load.
    public static class HtmlEntryPoint
    {
        public struct HtmlScript
        {
            public string Src;
            public string Code;
            public JavascriptDocumentType DocumentType;
        }

        static readonly Regex ScriptTag = new Regex(
            @"<script\b(?<attrs>[^>]*)>(?<body>.*?)</script\s*>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        static readonly Regex Attribute = new Regex(
            @"(?<name>[\w:.-]+)(?:\s*=\s*(?:""(?<dq>[^""]*)""|'(?<sq>[^']*)'|(?<uq>[^\s""'>]+)))?",
            RegexOptions.Compiled);

        public static List<HtmlScript> ExtractScripts(string html)
        {
            var result = new List<HtmlScript>();
            if (string.IsNullOrEmpty(html)) return result;

            foreach (Match tag in ScriptTag.Matches(html))
            {
                string src = null;
                var type = "";

                foreach (Match attr in Attribute.Matches(tag.Groups["attrs"].Value))
                {
                    var name = attr.Groups["name"].Value.ToLowerInvariant();
                    var value = attr.Groups["dq"].Success ? attr.Groups["dq"].Value
                        : attr.Groups["sq"].Success ? attr.Groups["sq"].Value
                        : attr.Groups["uq"].Value;

                    if (name == "src") src = value.Trim();
                    else if (name == "type") type = value.Trim().ToLowerInvariant();
                }

                // importmap, application/json, text/template and friends are data, not code.
                var isModule = type == "module";
                if (!isModule && type != "" && type != "text/javascript" && type != "application/javascript") continue;

                var body = tag.Groups["body"].Value;
                if (string.IsNullOrEmpty(src) && string.IsNullOrWhiteSpace(body)) continue;

                result.Add(new HtmlScript
                {
                    Src = src,
                    Code = string.IsNullOrEmpty(src) ? body : null,
                    DocumentType = isModule ? JavascriptDocumentType.Module : JavascriptDocumentType.Script,
                });
            }

            return result;
        }
    }
}
