using System.Text.RegularExpressions;

namespace ReactUnity.Scripting
{
    /// Spots bundler output that has to run as a module rather than a script.
    ///
    /// Every engine executes real ES modules and resolves its own specifiers, so nothing here
    /// rewrites code - it is enough to know that a given chunk needs module scope. A Vite dev
    /// bundle needs it for `import.meta.url` and a trailing `export`, and an HMR patch for the
    /// `; export {}` Vite appends to it.
    public static class ModuleCompat
    {
        /// A trailing export statement, which is all a Vite HMR patch chunk uses. Anchored to the
        /// end of the file (past any sourcemap comment), but a mid-file `export` counts too - both
        /// mean the same thing here, that this has to be evaluated as a module.
        static readonly Regex ExportStatement = new Regex(
            @"(?:^|[;\n])[ \t]*export[ \t]*[{*]",
            RegexOptions.Compiled | RegexOptions.Multiline);

        static readonly Regex ImportMeta = new Regex(@"\bimport\.meta\b", RegexOptions.Compiled);

        /// True when the code uses syntax that is only legal inside a module. Dynamic `import()` is
        /// deliberately excluded - it parses in a plain script on every engine, so it is no reason
        /// to change how the surrounding code is evaluated.
        public static bool NeedsModuleScope(string code)
        {
            if (string.IsNullOrEmpty(code)) return false;
            return ImportMeta.IsMatch(code) || ExportStatement.IsMatch(code);
        }
    }
}
