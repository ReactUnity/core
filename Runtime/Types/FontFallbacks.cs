using System.Collections.Generic;

namespace ReactUnity.Types
{
    /// <summary>
    /// Wires the tail of a <c>font-family</c> list into the only per-glyph fallback a text renderer
    /// here has: the first font's own fallback table.
    /// </summary>
    /// <remarks>
    /// That table belongs to the font asset rather than to the element, so a face reached this way is
    /// reachable from every element using the same first font. Chains are therefore merged rather than
    /// replaced -- an element naming fewer fallbacks never takes another's away, and a fallback only
    /// affects glyphs the first font has none of. What the asset itself declares stays behind the
    /// chain from CSS, and is put back when play mode ends; the asset is never marked dirty, so none
    /// of this reaches the file on disk.
    /// </remarks>
    internal static class FontFallbacks
    {
#if UNITY_EDITOR
        static FontFallbacks()
        {
            UnityEditor.EditorApplication.playModeStateChanged += state => {
                if (state == UnityEditor.PlayModeStateChange.ExitingPlayMode) RestoreAll();
            };
        }
#endif

#if REACT_TMP
        private static readonly Dictionary<TMPro.TMP_FontAsset, List<TMPro.TMP_FontAsset>> TmpOriginals =
            new Dictionary<TMPro.TMP_FontAsset, List<TMPro.TMP_FontAsset>>();

        public static void Apply(TMPro.TMP_FontAsset head, List<FontSource> fallbacks)
        {
            if (!head || fallbacks == null || fallbacks.Count == 0) return;

            if (!TmpOriginals.TryGetValue(head, out var original))
            {
                var declared = head.fallbackFontAssetTable;
                TmpOriginals[head] = original = declared == null ? null : new List<TMPro.TMP_FontAsset>(declared);
            }

            var current = head.fallbackFontAssetTable;
            var fromCss = (current?.Count ?? 0) - (original?.Count ?? 0);

            List<TMPro.TMP_FontAsset> merged = null;

            for (int i = 0; i < fallbacks.Count; i++)
            {
                var asset = fallbacks[i]?.TmpFontAsset;
                if (!asset || asset == head) continue;
                if (current != null && current.Contains(asset)) continue;
                if (merged != null && merged.Contains(asset)) continue;

                merged ??= current == null ? new List<TMPro.TMP_FontAsset>() : new List<TMPro.TMP_FontAsset>(current);
                merged.Insert(fromCss++, asset);
            }

            if (merged != null) head.fallbackFontAssetTable = merged;
        }

        private static void RestoreTmp()
        {
            foreach (var pair in TmpOriginals)
                if (pair.Key) pair.Key.fallbackFontAssetTable = pair.Value;

            TmpOriginals.Clear();
        }
#endif

#if REACT_TEXTCORE
        private static readonly Dictionary<UnityEngine.TextCore.Text.FontAsset, List<UnityEngine.TextCore.Text.FontAsset>> TextCoreOriginals =
            new Dictionary<UnityEngine.TextCore.Text.FontAsset, List<UnityEngine.TextCore.Text.FontAsset>>();

        public static void Apply(UnityEngine.TextCore.Text.FontAsset head, List<FontSource> fallbacks)
        {
            if (!head || fallbacks == null || fallbacks.Count == 0) return;

            if (!TextCoreOriginals.TryGetValue(head, out var original))
            {
                var declared = head.fallbackFontAssetTable;
                TextCoreOriginals[head] = original = declared == null
                    ? null
                    : new List<UnityEngine.TextCore.Text.FontAsset>(declared);
            }

            var current = head.fallbackFontAssetTable;
            var fromCss = (current?.Count ?? 0) - (original?.Count ?? 0);

            List<UnityEngine.TextCore.Text.FontAsset> merged = null;

            for (int i = 0; i < fallbacks.Count; i++)
            {
                var asset = fallbacks[i]?.TextCoreFontAsset;
                if (!asset || asset == head) continue;
                if (current != null && current.Contains(asset)) continue;
                if (merged != null && merged.Contains(asset)) continue;

                merged ??= current == null
                    ? new List<UnityEngine.TextCore.Text.FontAsset>()
                    : new List<UnityEngine.TextCore.Text.FontAsset>(current);
                merged.Insert(fromCss++, asset);
            }

            if (merged != null) head.fallbackFontAssetTable = merged;
        }

        private static void RestoreTextCore()
        {
            foreach (var pair in TextCoreOriginals)
                if (pair.Key) pair.Key.fallbackFontAssetTable = pair.Value;

            TextCoreOriginals.Clear();
        }
#endif

        /// <summary>Puts every asset this touched back the way it was.</summary>
        public static void RestoreAll()
        {
#if REACT_TMP
            RestoreTmp();
#endif
#if REACT_TEXTCORE
            RestoreTextCore();
#endif
        }
    }
}
