using System;
using UnityEngine;

namespace ReactUnity.Scripting
{
    /// The absolute url a module's own specifiers resolve against, and how to read one back.
    ///
    /// A module usually has a url already: a dev server serves the entry over http, and everything
    /// imported below it resolves against that. A bundle loaded out of Unity's Resources has none -
    /// its name is the resource path it came from, which is relative, so nothing under it can
    /// resolve and a code-split chunk fails with "Could not resolve module './chunk.js'". Giving
    /// those an origin of their own is what lets one relative resolution serve both.
    internal static class ModuleUrl
    {
        public const string ResourceScheme = "resource";

        /// Three slashes, not one: that makes the url hierarchical, so Uri reads the whole of it as
        /// a path and combines a relative specifier against it the way `file:///` does. With one
        /// slash the first segment is parsed as an authority and drops out of the path.
        const string ResourceOrigin = ResourceScheme + ":///";

        /// The base a specifier inside this module resolves against, or null for a module with no
        /// name at all. A name that is already a url is its own base.
        public static Uri Base(string moduleName)
        {
            if (string.IsNullOrEmpty(moduleName)) return null;
            if (Uri.TryCreate(moduleName, UriKind.Absolute, out var absolute)) return absolute;
            return Uri.TryCreate(ResourceOrigin + moduleName.TrimStart('/'), UriKind.Absolute, out var resource) ? resource : null;
        }

        /// The name a module is registered under. A url is left exactly as it was given, so nothing
        /// normalizes an address a dev server answers; a bare path becomes its resource url. A chunk
        /// that imports the entry back - which is how a code-split bundle shares its runtime -
        /// resolves to this same string, so the engine reuses the module instead of evaluating a
        /// second copy of the whole bundle beside the first.
        public static string Canonical(string moduleName) =>
            string.IsNullOrEmpty(moduleName) || Uri.IsWellFormedUriString(moduleName, UriKind.Absolute)
                ? moduleName
                : Base(moduleName)?.AbsoluteUri ?? moduleName;

        public static bool IsResource(Uri url) => url != null && url.Scheme == ResourceScheme;

        /// Resources are keyed on the path with the last extension taken off, which is the rule
        /// Unity applies on import - `assets/index.js` is loaded back as `assets/index`.
        public static string ResourcePath(Uri url)
        {
            var path = Uri.UnescapeDataString(url.AbsolutePath).TrimStart('/');
            var dot = path.LastIndexOf('.');
            return dot > path.LastIndexOf('/') ? path.Substring(0, dot) : path;
        }

        /// The module's source, or null when there is no such resource.
        public static string ReadResource(Uri url) => Resources.Load<TextAsset>(ResourcePath(url))?.text;
    }
}
