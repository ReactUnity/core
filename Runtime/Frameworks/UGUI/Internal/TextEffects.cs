using System.Collections.Generic;
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


        public void SetToMaterial(Material mat)
        {
            mat.SetFloat(ShaderUtilities.ID_OutlineWidth, TextStrokeWidth);
            mat.SetColor(ShaderUtilities.ID_OutlineColor, TextStrokeColor);
        }

        public bool ShouldModifyMaterial()
        {
            return TextStrokeWidth != 0;
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
                   TextStrokeColor.Equals(effects.TextStrokeColor);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(BaseMaterial, TextStrokeWidth, TextStrokeColor);
        }
    }
}
