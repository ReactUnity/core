using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedFontProperty : IComputedValue
    {
        public enum FontPropertyType
        {
            None,
            LineHeight,
            RootLineHeight,
            CharacterWidth,
            XHeight,
        }

        public float Ratio { get; }
        public FontPropertyType Type { get; }

        public ComputedFontProperty(float ratio, FontPropertyType type)
        {
            Ratio = ratio;
            Type = type;
        }


        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var size = GetFontSize(prop, style);
            var fontReference = GetFontReference(style);
            var value = 1f;
            var found = false;

            if (fontReference.IsCached)
            {
#if REACT_TMP
                var tmpFont = fontReference.CachedValue?.TmpFontAsset;

                if (tmpFont != null)
                {
                    var fi = tmpFont.faceInfo;

                    switch (Type)
                    {
                        case FontPropertyType.LineHeight:
                        case FontPropertyType.RootLineHeight:
                            value = (float) fi.lineHeight / fi.pointSize;
                            found = true;
                            break;
                        case FontPropertyType.CharacterWidth:
                            if (tmpFont.characterLookupTable.TryGetValue('0', out var ch))
                            {
                                value = (float) ch.glyph.metrics.horizontalAdvance / fi.pointSize;
                                found = true;
                            }
                            break;
                        case FontPropertyType.XHeight:
                            if (tmpFont.characterLookupTable.TryGetValue('x', out var ex))
                            {
                                value = (float) ex.glyph.metrics.height / fi.pointSize;
                                found = true;
                            }
                            break;
                    }
                }
#endif

#if REACT_TEXTCORE
                if (!found)
                {
                    var tcFont = fontReference.CachedValue?.TextCoreFontAsset;

                    if (tcFont != null)
                    {
                        var fi = tcFont.faceInfo;

                        switch (Type)
                        {
                            case FontPropertyType.LineHeight:
                            case FontPropertyType.RootLineHeight:
                                value = (float) fi.lineHeight / fi.pointSize;
                                found = true;
                                break;
                            case FontPropertyType.CharacterWidth:
                                if (tcFont.characterLookupTable.TryGetValue('0', out var ch))
                                {
                                    value = (float) ch.glyph.metrics.horizontalAdvance / fi.pointSize;
                                    found = true;
                                }
                                break;
                            case FontPropertyType.XHeight:
                                if (tcFont.characterLookupTable.TryGetValue('x', out var ex))
                                {
                                    value = (float) ex.glyph.metrics.height / fi.pointSize;
                                    found = true;
                                }
                                break;
                        }

                        found = true;
                    }
                }
#endif

                if (!found)
                {
                    var font = fontReference.CachedValue?.Font;

                    if (font != null)
                    {
                        switch (Type)
                        {
                            case FontPropertyType.LineHeight:
                            case FontPropertyType.RootLineHeight:
                                value = (float) font.lineHeight / font.fontSize;
                                found = true;
                                break;
                            case FontPropertyType.CharacterWidth:
                                if (font.GetCharacterInfo('0', out var ch))
                                {
                                    value = (float) ch.advance / font.fontSize;
                                    found = true;
                                }
                                break;
                            case FontPropertyType.XHeight:
                                if (font.GetCharacterInfo('x', out var ex))
                                {
                                    value = (float) ex.glyphHeight / font.fontSize;
                                    found = true;
                                }
                                break;
                        }
                    }
                }
            }

            return size * Ratio * value;
        }

        private float GetFontSize(IStyleProperty prop, NodeStyle style)
        {
            if (Type == FontPropertyType.RootLineHeight)
            {
                var hostStyle = style.Context.Host.ComputedStyle;
                if (hostStyle == null || (style == hostStyle && ReferenceEquals(prop, StyleProperties.fontSize)))
                    return ComputedRootRelative.DefaultFontSize;
                else return hostStyle.fontSize;
            }

            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.fontSize);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.fontSize, fromChild);

            if (val == null) return ComputedRootRelative.DefaultFontSize;

            if (val is IComputedValue d) val = d.ResolveValue(StyleProperties.fontSize, st, StyleProperties.fontSize.converter);
            if (val is float f) return f;

            return ComputedRootRelative.DefaultFontSize;
        }

        private FontReference GetFontReference(NodeStyle style)
        {
            if (Type == FontPropertyType.RootLineHeight)
            {
                style = style.Context.Host.ComputedStyle;
            }

            var val = style?.GetRawStyleValue(StyleProperties.fontFamily);

            if (val == null) return FontReference.None;

            if (val is IComputedValue d) val = d.ResolveValue(StyleProperties.fontFamily, style, StyleProperties.fontFamily.converter);
            if (val is FontReference f) return f;

            return FontReference.None;
        }
    }
}
