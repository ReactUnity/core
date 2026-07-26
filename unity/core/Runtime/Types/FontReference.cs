using System;
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

            protected override bool ParseFallback(string value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, AllConverters.StringConverter,
                    (resolvedValue) =>
                    {
                        if (resolvedValue is string u) return new FontReference(AssetReferenceType.Procedural, u);
                        return null;
                    });
            }
        }
    }
}
