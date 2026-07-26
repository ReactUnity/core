using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    [RequireComponent(typeof(CanvasRenderer))]
    public class WebFilter : MaskableGraphic
    {
        #region Material Stuff

        private struct ShaderProps
        {
            public Material BaseMaterial;
            public int StencilId;
            public FilterDefinition Definition;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Definition == props.Definition &&
                       StencilId == props.StencilId;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, StencilId, Definition);
            }

            public void SetToMaterial(Material mat)
            {
                if (StencilId < 0)
                {
                    mat.SetInt("_StencilComp", (int) CompareFunction.Always);
                }
                else
                {
                    mat.SetInt("_StencilReadMask", StencilId);
                    mat.SetInt("_StencilComp", (int) CompareFunction.LessEqual);
                }

                if (Definition != null)
                {
                    mat.SetFloat("_Blur", Definition.Blur);
                    mat.SetFloat("_Brightness", Definition.Brightness);
                    mat.SetFloat("_Contrast", Definition.Contrast);
                    mat.SetFloat("_Grayscale", Definition.Grayscale);
                    mat.SetFloat("_HueRotate", Definition.HueRotate);
                    mat.SetFloat("_Invert", Definition.Invert);
                    mat.SetFloat("_Opacity", Definition.Opacity);
                    mat.SetFloat("_Saturate", Definition.Saturate);
                    mat.SetFloat("_Grain", Definition.Grain);
                    mat.SetFloat("_Pixelate", Definition.Pixelate);
                    mat.SetFloat("_Sepia", Definition.Sepia);
                }
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public Transform MaskRoot;

        public override Material materialForRendering
        {
            get
            {
                if (Definition == null) return base.materialForRendering;

                var stencilId = -1;

                if (!isBackdrop)
                {
                    var depth = MaskUtilities.GetStencilDepth(MaskRoot, MaskRoot.GetComponentInParent<Canvas>()?.transform ?? MaskRoot.root);
                    var id = 0;
                    for (int i = 0; i < depth; i++) id |= 1 << i;
                    stencilId = id;
                }

                var props = new ShaderProps
                {
                    BaseMaterial = base.materialForRendering,
                    StencilId = stencilId,
                    Definition = Definition
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

        #endregion


        [SerializeField]
        private bool isBackdrop;
        public bool IsBackdrop
        {
            get => isBackdrop;
            set
            {
                isBackdrop = value;
                SetMaterialDirty();
            }
        }


        [SerializeField]
        private FilterDefinition definition;
        public FilterDefinition Definition
        {
            get => definition;
            set
            {
                definition = value;
                SetMaterialDirty();
            }
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            color = Color.white;
            raycastTarget = false;
            material = ResourcesHelper.BackdropFilterMaterial;
        }

#if UNITY_EDITOR
        protected override void OnValidate()
        {
            base.OnValidate();
            SetMaterialDirty();
        }
#endif
    }
}
