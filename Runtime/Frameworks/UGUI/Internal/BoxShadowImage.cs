using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
#if NET_STANDARD_2_0 && !NET_STANDARD_2_1
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    public class BoxShadowImage : RoundedBorderMaskImage
    {
        private struct ShaderProps
        {
            public Material BaseMaterial;
            public Vector2 Blur;
            public Vector2 Spread;
            public Vector2 Offset;
            public bool Inset;
            public int StencilId;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Blur.Equals(props.Blur) &&
                       Spread.Equals(props.Spread) &&
                       Offset.Equals(props.Offset) &&
                       Inset == props.Inset &&
                       StencilId == props.StencilId;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, Blur, Spread, Offset, Inset, StencilId);
            }

            public void SetToMaterial(Material mat)
            {
                if (Inset)
                {
                    mat.SetInt("_StencilComp", (int) CompareFunction.Equal);
                }
                else
                {
                    mat.SetInt("_StencilReadMask", StencilId);
                    mat.SetInt("_StencilComp", (int) CompareFunction.LessEqual);
                }

                mat.SetVector("_blurRadius", Blur);
                mat.SetFloat("_inset", Inset ? 1 : 0);
                mat.SetVector("_spread", Inset ? Spread - Blur : Vector2.zero);
                mat.SetVector("_offset", Inset ? Offset : Vector2.zero);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public Transform MaskRoot;
        public BoxShadow Shadow;

        public override Material GetDefaultMaterial()
        {
            return ResourcesHelper.BoxShadowMaterial;
        }

        public override Material materialForRendering
        {
            get
            {
                if (Shadow == null) return base.materialForRendering;

                var stencilId = -1;

                if (!Shadow.inset)
                {
                    var depth = MaskUtilities.GetStencilDepth(MaskRoot, MaskRoot.GetComponentInParent<Canvas>()?.transform ?? MaskRoot.root);
                    var id = 0;
                    for (int i = 0; i < depth; i++) id |= 1 << i;
                    stencilId = id;
                }

                var props = new ShaderProps
                {
                    BaseMaterial = base.materialForRendering,
                    Blur = Shadow.blur,
                    Spread = Shadow.spread,
                    Offset = Shadow.offset,
                    Inset = Shadow.inset,
                    StencilId = stencilId,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(props.BaseMaterial);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

                return result;
            }
        }
    }
}
