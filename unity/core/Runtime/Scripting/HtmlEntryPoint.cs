using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ReactUnity.Scripting
{
    /// Pulls the scripts and stylesheets out of a dev server's entry document.
    ///
    /// A dev server answers its root with HTML rather than JavaScript - Vite's is a bare
    /// `<script type="module" src="/assets/index.js">` - so the bundle it points at is what has
    /// to run. Only the scripts and styles are taken: the rest of an index.html describes a
    /// browser page and has no meaning here.
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

        public struct HtmlStyle
        {
            public string Href;
            public string Code;
        }

        static readonly Regex ScriptTag = new Regex(
            @"<script\b(?<attrs>[^>]*)>(?<body>.*?)</script\s*>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        static readonly Regex StyleTag = new Regex(
            @"<style\b(?<attrs>[^>]*)>(?<body>.*?)</style\s*>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        // Void element, so there is no body to match and no closing tag to look for.
        static readonly Regex LinkTag = new Regex(
            @"<link\b(?<attrs>[^>]*)>",
            RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Singleline);

        static readonly Regex Attribute = new Regex(
            @"(?<name>[\w:.-]+)(?:\s*=\s*(?:""(?<dq>[^""]*)""|'(?<sq>[^']*)'|(?<uq>[^\s""'>]+)))?",
            RegexOptions.Compiled);

        static Dictionary<string, string> GetAttributes(string attrs)
        {
            var res = new Dictionary<string, string>();

            foreach (Match attr in Attribute.Matches(attrs))
            {
                var name = attr.Groups["name"].Value.ToLowerInvariant();
                var value = attr.Groups["dq"].Success ? attr.Groups["dq"].Value
                    : attr.Groups["sq"].Success ? attr.Groups["sq"].Value
                    : attr.Groups["uq"].Value;

                res[name] = value.Trim();
            }

            return res;
        }

        public static List<HtmlScript> ExtractScripts(string html)
        {
            var result = new List<HtmlScript>();
            if (string.IsNullOrEmpty(html)) return result;

            foreach (Match tag in ScriptTag.Matches(html))
            {
                var attrs = GetAttributes(tag.Groups["attrs"].Value);
                attrs.TryGetValue("src", out var src);
                attrs.TryGetValue("type", out var type);
                type = type?.ToLowerInvariant() ?? "";

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

        /// `<link rel="stylesheet">` and `<style>`, in document order so the cascade survives.
        ///
        /// A built Vite document links its CSS and nothing else does - dropping the link is the
        /// whole reason a built project used to come up unstyled.
        public static List<HtmlStyle> ExtractStyles(string html)
        {
            var found = new List<KeyValuePair<int, HtmlStyle>>();
            if (string.IsNullOrEmpty(html)) return new List<HtmlStyle>();

            foreach (Match tag in StyleTag.Matches(html))
            {
                var attrs = GetAttributes(tag.Groups["attrs"].Value);
                attrs.TryGetValue("type", out var type);
                type = type?.ToLowerInvariant() ?? "";
                if (type != "" && type != "text/css") continue;

                var body = tag.Groups["body"].Value;
                if (string.IsNullOrWhiteSpace(body)) continue;

                found.Add(new KeyValuePair<int, HtmlStyle>(tag.Index, new HtmlStyle { Code = body }));
            }

            foreach (Match tag in LinkTag.Matches(html))
            {
                var attrs = GetAttributes(tag.Groups["attrs"].Value);
                attrs.TryGetValue("href", out var href);
                if (string.IsNullOrEmpty(href)) continue;

                // Vite emits `rel="stylesheet"` with no type at all, so rel is what decides.
                // preload and modulepreload name the same file without asking for it to apply,
                // and an `alternate stylesheet` is one a browser leaves off until it is picked.
                attrs.TryGetValue("rel", out var rel);
                var isStylesheet = false;
                var isAlternate = false;
                foreach (var token in (rel ?? "").ToLowerInvariant().Split(' '))
                {
                    if (token == "stylesheet") isStylesheet = true;
                    else if (token == "alternate") isAlternate = true;
                }

                if (!isStylesheet || isAlternate) continue;

                found.Add(new KeyValuePair<int, HtmlStyle>(tag.Index, new HtmlStyle { Href = href }));
            }

            found.Sort((a, b) => a.Key.CompareTo(b.Key));

            var result = new List<HtmlStyle>(found.Count);
            foreach (var item in found) result.Add(item.Value);
            return result;
        }
    }
}
