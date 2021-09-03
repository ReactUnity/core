using System;
using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling;
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
                Font altFont;
#if REACT_TMP
                var tmpFontAsset = base.Get<TMPro.TMP_FontAsset>(context, realType, realValue);
                altFont = tmpFontAsset?.sourceFontFile;
#endif

#if REACT_TEXTCORE
                var textCoreFontAsset = base.Get<UnityEngine.TextCore.Text.FontAsset>(context, realType, realValue);
                altFont = textCoreFontAsset?.sourceFontFile ?? altFont;
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
            };
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            private static HashSet<string> AllowedFunctions = new HashSet<string> { "url" };

            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Convert(object value)
            {
                if (value == null) return None;
                if (value is FontReference b) return b;
                if (value is Font v) return new FontReference(AssetReferenceType.Object, v);
#if REACT_TMP
                if (value is TMPro.TMP_FontAsset t) return new FontReference(AssetReferenceType.Object, t);
#endif
#if REACT_TEXTCORE
                if (value is UnityEngine.TextCore.Text.FontAsset fa) return new FontReference(AssetReferenceType.Object, fa);
#endif
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (CssFunctions.TryCall(value, out var result, AllowedFunctions))
                {
                    if (result is Url u) return new FontReference(u);
                }

                return new FontReference(AssetReferenceType.Procedural, value);
            }
        }
    }
}
