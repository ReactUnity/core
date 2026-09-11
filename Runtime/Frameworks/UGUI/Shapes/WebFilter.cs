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
    public class WebFilter : MaskableGraphic, Internal.IBackdropReader
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
                       Equals(Definition, props.Definition) &&
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
                    mat.SetFloat("_GrainPhase", Definition.GrainPhase);
                    mat.SetFloat("_Posterize", Definition.Posterize);
                    mat.SetFloat("_ScanlineIntensity", Definition.ScanlineIntensity);
                    mat.SetFloat("_ScanlinePeriod", Definition.ScanlinePeriod);
                    mat.SetFloat("_ScanlinePhase", Definition.ScanlinePhase);
                    mat.SetColor("_Tint", Definition.Tint);
                    mat.SetFloat("_Aberration", Definition.ChromaticAberration);
                }
            }
        }

        static readonly int BackdropTexId = Shader.PropertyToID("_ReactUnityBackdrop");
        static readonly int BackdropBoundId = Shader.PropertyToID("_ReactUnityBackdropBound");

        public Transform MaskRoot;

        private Internal.BackdropSurface surface;
        private Texture backdrop;

        /// <summary>Where this element's backdrop is rendered when the pipeline cannot grab one.
        /// Null on built-in, where the shader's own GrabPass is both exact and cheaper.</summary>
        /// <remarks>Registering here rather than only in <c>OnEnable</c>, which has already run by
        /// the time whoever built this graphic can hand it a surface -- and on an object that is
        /// not in the hierarchy yet, so it cannot wait for the graphic to be active either.</remarks>
        public Internal.BackdropSurface Surface
        {
            get => surface;
            set
            {
                if (surface == value) return;
                if (surface) surface.Unregister(this);
                surface = value;
                if (surface) surface.Register(this);
            }
        }

        public CanvasRenderer BackdropRenderer => canvasRenderer;

        public void SetBackdrop(Texture value)
        {
            backdrop = value;
            // Pushed straight onto the live material: materialForRendering is only consulted when
            // UGUI rebuilds the graphic, which is not every frame, and this changes every frame.
            if (instanceMaterial) ApplyBackdrop(instanceMaterial);
        }

        void ApplyBackdrop(Material mat)
        {
            mat.SetTexture(BackdropTexId, backdrop);
            mat.SetFloat(BackdropBoundId, backdrop ? 1 : 0);
        }

        // One material per component, mutated in place. Keying a shared cache on the props instead
        // leaked a Material per frame for every animated filter, because FilterDefinition is
        // interpolatable and so each frame of a transition minted a distinct key.
        private Material instanceMaterial;
        private ShaderProps appliedProps;
        private bool hasAppliedProps;

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

                // A new base material (a mask above us changed) means ours has to be rebuilt on it.
                if (!instanceMaterial || !hasAppliedProps || appliedProps.BaseMaterial != props.BaseMaterial)
                {
                    if (instanceMaterial) DestroyImmediate(instanceMaterial);
                    instanceMaterial = new Material(props.BaseMaterial);
                    ApplyBackdrop(instanceMaterial);
                    hasAppliedProps = false;
                }

                if (!hasAppliedProps || !appliedProps.Equals(props))
                {
                    props.SetToMaterial(instanceMaterial);
                    appliedProps = props;
                    hasAppliedProps = true;
                }

                return instanceMaterial;
            }
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            if (surface) surface.Unregister(this);
            if (instanceMaterial) DestroyImmediate(instanceMaterial);
            instanceMaterial = null;
            hasAppliedProps = false;
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
            if (surface) surface.Register(this);
        }

        protected override void OnDisable()
        {
            base.OnDisable();
            if (surface) surface.Unregister(this);
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
