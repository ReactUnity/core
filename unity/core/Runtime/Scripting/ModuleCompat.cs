using System.Text.RegularExpressions;

namespace ReactUnity.Scripting
{
    /// Spots bundler output that has to run as a module rather than a script, and adapts the parts
    /// no engine here can handle on its own.
    ///
    /// Every engine executes real ES modules, so module syntax is never rewritten - it is enough
    /// to know that a given chunk needs module scope. A Vite dev bundle needs it for
    /// `import.meta.url` and a trailing `export`, and an HMR patch for the `; export {}` Vite
    /// appends to it.
    public static class ModuleCompat
    {
        /// A trailing export statement, which is all a Vite HMR patch chunk uses. Anchored to the
        /// end of the file (past any sourcemap comment), but a mid-file `export` counts too - both
        /// mean the same thing here, that this has to be evaluated as a module.
        static readonly Regex ExportStatement = new Regex(
            @"(?:^|[;\n])[ \t]*export[ \t]*[{*]",
            RegexOptions.Compiled | RegexOptions.Multiline);

        static readonly Regex ImportMeta = new Regex(@"\bimport\.meta\b", RegexOptions.Compiled);

        /// A dynamic import in expression position. `import.meta` and `.import(` are excluded by
        /// the lookarounds; string literals are filtered out separately.
        static readonly Regex DynamicImport = new Regex(@"(?<![\w$.])import\s*\(", RegexOptions.Compiled);

        public const string ImportHook = "__reactunity_import__";

        /// True when the code uses syntax that is only legal inside a module. Dynamic `import()` is
        /// deliberately excluded - it parses in a plain script on every engine, so it is no reason
        /// to change how the surrounding code is evaluated.
        public static bool NeedsModuleScope(string code)
        {
            if (string.IsNullOrEmpty(code)) return false;
            return ImportMeta.IsMatch(code) || ExportStatement.IsMatch(code);
        }

        /// Points dynamic imports at the host loader, for engines that cannot resolve a specifier
        /// themselves. Vite's HMR client applies each patch with one.
        public static string RewriteDynamicImports(string code)
        {
            if (string.IsNullOrEmpty(code)) return code;

            return DynamicImport.Replace(code, match =>
                IsInsideStringLiteral(code, match.Index) ? match.Value : ImportHook + "(");
        }

        /// Cheap guard against rewriting the word inside a message like React's "the result of a
        /// dynamic import() call". Counts unescaped quotes from the start of the line: an odd
        /// count means the match sits inside a literal. Good enough for generated bundles, which
        /// do not carry multi-line string literals containing `import(`.
        static bool IsInsideStringLiteral(string code, int index)
        {
            var single = 0;
            var doubleQ = 0;
            var back = 0;

            for (var i = index - 1; i >= 0 && code[i] != '\n'; i--)
            {
                var c = code[i];
                if (c == '\'' || c == '"' || c == '`')
                {
                    // Count the backslashes immediately before it; an odd run escapes the quote.
                    var slashes = 0;
                    for (var j = i - 1; j >= 0 && code[j] == '\\'; j--) slashes++;
                    if (slashes % 2 == 1) continue;

                    if (c == '\'') single++;
                    else if (c == '"') doubleQ++;
                    else back++;
                }
            }

            return single % 2 == 1 || doubleQ % 2 == 1 || back % 2 == 1;
        }
    }
}
