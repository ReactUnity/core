using System.Collections.Generic;
using ReactUnity.Types;
using TMPro;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    internal struct TextEffects
    {
        static Dictionary<TextEffects, Material> CachedMaterials = new Dictionary<TextEffects, Material>();

        public Material BaseMaterial;
        public float TextStrokeWidth;
        public Color TextStrokeColor;

        // TextMeshPro's underlay, in its own units: fractions of the SDF padding, not pixels.
        public Color TextShadowColor;
        public Vector2 TextShadowOffset;
        public float TextShadowSoftness;

        public bool HasShadow => TextShadowColor.a > 0;

        /// <summary>
        /// A `text-shadow` in pixels to underlay units. An atlas texel is a pixel at the sampling size,
        /// and an underlay unit is the padding TMP leaves around a glyph, less the face's own share.
        /// </summary>
        public void SetShadow(BoxShadow shadow, float fontSize, TMP_FontAsset font)
        {
            if (shadow == null || shadow.color.a <= 0 || !font || fontSize <= 0) return;

            var units = font.faceInfo.pointSize / fontSize * UnderlayUnitsPerTexel(BaseMaterial);
            TextShadowColor = shadow.color;
            TextShadowOffset = new Vector2(shadow.offset.x, -shadow.offset.y) * units;
            TextShadowSoftness = shadow.blur.x * units;
        }

        private static float UnderlayUnitsPerTexel(Material mat)
        {
            if (!mat || !mat.HasProperty(ShaderUtilities.ID_GradientScale)) return 0;

            var scale = mat.GetFloat(ShaderUtilities.ID_GradientScale);
            var weight = Mathf.Max(GetFloat(mat, ShaderUtilities.ID_WeightNormal), GetFloat(mat, ShaderUtilities.ID_WeightBold)) / 4f;
            var range = (weight + GetFloat(mat, ShaderUtilities.ID_FaceDilate)) * (scale - 1);
            var budget = scale - 1 - range;
            return budget > 0 ? 1f / budget : 0;
        }

        private static float GetFloat(Material mat, int id) => mat.HasProperty(id) ? mat.GetFloat(id) : 0;

        public void SetToMaterial(Material mat)
        {
            mat.SetFloat(ShaderUtilities.ID_OutlineWidth, TextStrokeWidth);
            mat.SetColor(ShaderUtilities.ID_OutlineColor, TextStrokeColor);

            if (HasShadow)
            {
                mat.EnableKeyword(ShaderUtilities.Keyword_Underlay);
                mat.SetColor(ShaderUtilities.ID_UnderlayColor, TextShadowColor);
                mat.SetFloat(ShaderUtilities.ID_UnderlayOffsetX, TextShadowOffset.x);
                mat.SetFloat(ShaderUtilities.ID_UnderlayOffsetY, TextShadowOffset.y);
                mat.SetFloat(ShaderUtilities.ID_UnderlaySoftness, TextShadowSoftness);
                mat.SetFloat(ShaderUtilities.ID_UnderlayDilate, 0);
                // Rescales the underlay so an offset past the padding is clamped rather than cut off.
                ShaderUtilities.UpdateShaderRatios(mat);
            }
            else mat.DisableKeyword(ShaderUtilities.Keyword_Underlay);
        }

        public bool ShouldModifyMaterial()
        {
            return TextStrokeWidth != 0 || HasShadow;
        }

        public Material GetModifiedMaterial()
        {
            if (!ShouldModifyMaterial()) return BaseMaterial;

            if (!CachedMaterials.TryGetValue(this, out var result) || !result)
            {
                result = new Material(BaseMaterial);
                SetToMaterial(result);
                CachedMaterials[this] = result;
            }

            return result;
        }

        public override bool Equals(object obj)
        {
            return obj is TextEffects effects &&
                   EqualityComparer<Material>.Default.Equals(BaseMaterial, effects.BaseMaterial) &&
                   TextStrokeWidth == effects.TextStrokeWidth &&
                   TextStrokeColor.Equals(effects.TextStrokeColor) &&
                   TextShadowColor.Equals(effects.TextShadowColor) &&
                   TextShadowOffset.Equals(effects.TextShadowOffset) &&
                   TextShadowSoftness == effects.TextShadowSoftness;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(BaseMaterial, TextStrokeWidth, TextStrokeColor, TextShadowColor, TextShadowOffset, TextShadowSoftness);
        }
    }
}
