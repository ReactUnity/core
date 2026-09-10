using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public class FontSource
    {
        public Font Font;
#if REACT_TMP
        public TMPro.TMP_FontAsset TmpFontAsset;
#endif
#if REACT_TEXTCORE
        public UnityEngine.TextCore.Text.FontAsset TextCoreFontAsset;
#endif

        /// <summary>
        /// The faces the rest of a <c>font-family</c> list contributed, in order, for the glyphs this
        /// one has none of -- which is what makes a CJK or emoji face reachable from CSS.
        /// </summary>
        public List<FontSource> Fallbacks;

        /// <summary>
        /// Whether this face was declared for the weight the element asked for, by a <c>@font-face</c>
        /// naming it. TextMeshPro is left to synthesize the weight when it was not.
        /// </summary>
        public bool MatchesWeight;

        /// <summary>Whether this face was declared for the slope asked for. As <see cref="MatchesWeight"/>.</summary>
        public bool MatchesItalic;

        public bool Valid =>
#if REACT_TMP
            TmpFontAsset != null ||
#endif
#if REACT_TEXTCORE
            TextCoreFontAsset != null ||
#endif
            Font != null;

        public FontSource() { }

        public FontSource(FontSource other)
        {
            Font = other.Font;
#if REACT_TMP
            TmpFontAsset = other.TmpFontAsset;
#endif
#if REACT_TEXTCORE
            TextCoreFontAsset = other.TextCoreFontAsset;
#endif
            Fallbacks = other.Fallbacks;
            MatchesWeight = other.MatchesWeight;
            MatchesItalic = other.MatchesItalic;
        }

        public FontSource(Font font)
        {
            Font = font;
        }

#if REACT_TMP
        public FontSource(TMPro.TMP_FontAsset font)
        {
            TmpFontAsset = font;
            Font = font?.sourceFontFile;
        }
#endif

#if REACT_TEXTCORE
        public FontSource(UnityEngine.TextCore.Text.FontAsset font)
        {
            TextCoreFontAsset = font;
            Font = font?.sourceFontFile;
        }
#endif
    }

    /// <summary>
    /// One candidate of a resolved <c>font-family</c> list, and whether the face it names was declared
    /// for the weight and slope the element asked for.
    /// </summary>
    public struct FontCandidate
    {
        public FontReference Reference;
        public bool MatchesWeight;
        public bool MatchesItalic;

        public FontCandidate(FontReference reference, bool matchesWeight = false, bool matchesItalic = false)
        {
            Reference = reference;
            MatchesWeight = matchesWeight;
            MatchesItalic = matchesItalic;
        }
    }

    /// <summary>
    /// A resolved <c>font-family</c> list, or the <c>src</c> list of one <c>@font-face</c>. The first
    /// candidate that loads is the face; the rest become its glyph fallbacks when the list is a family
    /// list, and are dropped when it is a <c>src</c> list -- where they are alternative encodings of
    /// the same face rather than other faces.
    /// </summary>
    public class FontFamilyReference : FontReference
    {
        private readonly List<FontCandidate> Candidates;
        private readonly bool Chained;

        public FontFamilyReference(List<FontCandidate> candidates, bool chained = true) : base(AssetReferenceType.Object, null)
        {
            Candidates = candidates;
            Chained = chained;
        }

        public FontFamilyReference(List<FontReference> references, bool chained = true) : base(AssetReferenceType.Object, null)
        {
            Candidates = new List<FontCandidate>(references.Count);
            for (int i = 0; i < references.Count; i++) Candidates.Add(new FontCandidate(references[i]));
            Chained = chained;
        }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<FontSource> callback)
        {
            var resolved = new FontSource[Candidates.Count];
            var remaining = Candidates.Count;
            var reported = false;

            for (int i = 0; i < Candidates.Count; i++)
            {
                var index = i;
                Candidates[i].Reference.Get(context, res => {
                    resolved[index] = res;

                    // Every candidate has to be in before the chain can be assembled, because a
                    // fallback that loads late still belongs behind the ones before it.
                    if (--remaining > 0 || reported) return;
                    reported = true;
                    callback(Assemble(resolved));
                });
            }

            if (Candidates.Count == 0) callback(null);
        }

        private FontSource Assemble(FontSource[] resolved)
        {
            FontSource head = null;
            var headIndex = 0;
            List<FontSource> fallbacks = null;

            for (int i = 0; i < resolved.Length; i++)
            {
                var source = resolved[i];
                if (source == null || !source.Valid) continue;

                if (head == null)
                {
                    head = source;
                    headIndex = i;
                }
                else if (Chained) (fallbacks ??= new List<FontSource>()).Add(source);
            }

            if (head == null) return null;

            var candidate = Candidates[headIndex];
            if (fallbacks == null && !candidate.MatchesWeight && !candidate.MatchesItalic) return head;

            // Copied, because the head's own source is shared with everything else that named it.
            return new FontSource(head)
            {
                Fallbacks = fallbacks,
                MatchesWeight = candidate.MatchesWeight,
                MatchesItalic = candidate.MatchesItalic,
            };
        }
    }

    public class FontReference : AssetReference<FontSource>
    {
        static public new FontReference None = new FontReference(AssetReferenceType.None, null);

        public FontReference(AssetReferenceType type, object value) : base(type, value) { }
        public FontReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<FontSource> callback)
        {
            if (realType == AssetReferenceType.Procedural || realType == AssetReferenceType.Auto)
            {
                var found = context.Style.GetFontFamily(realValue as string);
                if (found != null)
                {
                    found.Get(context, callback);
                }
                else
                {
                    callback(null);
                    IsCached = false;
                }
            }
            else
            {
                Font altFont = null;
#if REACT_TMP
                var tmpFontAsset = base.Get<TMPro.TMP_FontAsset>(context, realType, realValue);
                if (tmpFontAsset?.sourceFontFile != null)
                {
                    altFont = tmpFontAsset?.sourceFontFile;
                }
#endif

#if REACT_TEXTCORE
                var textCoreFontAsset = base.Get<UnityEngine.TextCore.Text.FontAsset>(context, realType, realValue);
                if (textCoreFontAsset?.sourceFontFile != null)
                {
                    altFont = textCoreFontAsset?.sourceFontFile ?? altFont;
                }
#endif

                var res = new FontSource
                {
                    Font = base.Get<Font>(context, realType, realValue) ?? altFont,
#if REACT_TMP
                    TmpFontAsset = tmpFontAsset,
#endif
#if REACT_TEXTCORE
                    TextCoreFontAsset = textCoreFontAsset,
#endif
                };

                if (res.Valid) callback(res);
                else callback(null);
            }
        }


        public class Converter : BaseConverter<FontReference>
        {
            public Converter(bool allowWithoutUrl = false) : base(allowWithoutUrl) { }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is Font v) return Constant(new FontReference(AssetReferenceType.Object, v), out result);
#if REACT_TMP
                if (value is TMPro.TMP_FontAsset t) return Constant(new FontReference(AssetReferenceType.Object, t), out result);
#endif
#if REACT_TEXTCORE
                if (value is UnityEngine.TextCore.Text.FontAsset fa) return Constant(new FontReference(AssetReferenceType.Object, fa), out result);
#endif
                return base.ConvertInternal(value, out result);
            }

            protected override object FromObject(AssetReferenceType type, object obj) => new FontReference(type, obj);
            protected override object FromUrl(Url url) => new FontReference(url);

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                var splits = ParserHelpers.SplitComma(value);
                if (splits.Count > 1)
                {
                    result = ComputedFontFamily.Parse(splits);
                    return result != null;
                }

                return base.ParseInternal(value, out result);
            }

            // A single name is a list of one rather than a direct reference, so that it too picks the
            // face of the element's weight and slope instead of whichever the family declared first.
            protected override bool ParseFallback(string value, out IComputedValue result)
            {
                result = new ComputedFontFamily(new object[] { StringConverter.Normalize(value) });
                return true;
            }
        }
    }
}
