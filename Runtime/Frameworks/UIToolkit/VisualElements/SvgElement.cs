using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Unity.VectorGraphics;
using UnityEngine;
using UnityEngine.UIElements;
using Object = UnityEngine.Object;

namespace ReactUnity.UIToolkit
{
    public class SvgElement : Image
    {
        private static readonly string styleName = "TabButtonStyles";
        private static readonly string UxmlName = "Svg";

        private static Type _vectorImageUtilsType;
        private static MethodInfo _makeVectorImageAsset;

#if REACT_VECTOR_GRAPHICS
#if !UNITY_WEBGL && !UNITY_IOS && !UNITY_IPHONE && !UNITY_WSA && !UNITY_WSA_10_0
        private static MakeVectorDelegate _makeVectorHook;

        /// <summary>
        ///     Delegate of MakeVector method
        /// </summary>
        /// <remarks>This method is not supported on iOS and Web, and needs to fallback to standard reflection</remarks>
        delegate void MakeVectorDelegate(List<VectorUtils.Geometry> geometry, uint gradientResolution, out Object asset,
            out Texture2D texture2D);
#endif
#endif

        [SerializeField]
        private string rawSvg;


        public SvgElement()
        {
        }

        public SvgElement(string svg)
        {
            RawSvg = svg;
        }

#if REACT_VECTOR_GRAPHICS
        /// <summary>
        ///     Get cacheable type of Unity.VectorGraphics.VectorImageUtils
        /// </summary>
        private static Type VectorImageUtilsType =>
            _vectorImageUtilsType ??= typeof(VectorUtils).Assembly.GetType("Unity.VectorGraphics.VectorImageUtils");

        /// <summary>
        ///     Get cacheable method info of Unity.VectorGraphics.VectorImageUtils.MakeVectorImageAsset(...);
        /// </summary>
        /// <remarks>
        ///     Keep all flags just to make sure this call stays relevant even if unity decides someday to expose this method :/
        /// </remarks>
        private static MethodInfo MakeVectorImageAssetMethodInfo =>
            _makeVectorImageAsset ??= VectorImageUtilsType.GetMethod("MakeVectorImageAsset",
                BindingFlags.Static | BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

#if !UNITY_WEBGL && !UNITY_IOS && !UNITY_IPHONE && !UNITY_WSA && !UNITY_WSA_10_0
        /// <summary>
        ///     Speedup reflection execution by wrapping method inside a delegate
        /// </summary>
        private static MakeVectorDelegate MakeVectorHook => _makeVectorHook ??=
            (MakeVectorDelegate) Delegate.CreateDelegate(typeof(MakeVectorDelegate), MakeVectorImageAssetMethodInfo);
#endif
#endif


        public string RawSvg
        {
            get => rawSvg;
            set
            {
                if (rawSvg == value) return;

                rawSvg = value;
                RebuildSvg();
                MarkDirtyRepaint();
            }
        }


        /// <summary>
        ///     Read svg string and assign background image of current visualElement
        /// </summary>
        private void RebuildSvg()
        {
#if REACT_VECTOR_GRAPHICS
            SVGParser.SceneInfo sceneInfo;
            using (var stream = new StringReader(RawSvg))
            {
                sceneInfo = SVGParser.ImportSVG(stream, ViewportOptions.DontPreserve, 0, 1, 100, 100);
            }

            var stepDist = 0.5f;
            float samplingStepDist = 300;
            var maxCord = float.MaxValue;
            var maxTangent = Mathf.PI * 0.5f;

            // Automatically compute sensible tessellation options from the
            // vector scene's bouding box and target resolution
            //ComputeTessellationOptions(sceneInfo, TargetResolution, ResolutionMultiplier, out stepDist, out maxCord, out maxTangent);

            var tessOptions = new VectorUtils.TessellationOptions();
            tessOptions.MaxCordDeviation = maxCord;
            tessOptions.MaxTanAngleDeviation = maxTangent;
            tessOptions.SamplingStepSize = 1.0f / samplingStepDist;
            tessOptions.StepDistance = stepDist;

            var geometry = VectorUtils.TessellateScene(sceneInfo.Scene, tessOptions, sceneInfo.NodeOpacity);

            vectorImage = GenerateVectorImageAsset(geometry);
            sourceRect = sceneInfo.SceneViewport;
#else
            Debug.LogError(
                "Unity.VectorGraphics module is required to use SVG components");
#endif
        }

#if REACT_VECTOR_GRAPHICS
        /// <summary>
        ///     Compute tesselation for target resolution instead of relying on predefined values
        /// </summary>
        /// <param name="sceneInfo"></param>
        /// <param name="targetResolution"></param>
        /// <param name="multiplier"></param>
        /// <param name="stepDist"></param>
        /// <param name="maxCord"></param>
        /// <param name="maxTangent"></param>
        private void ComputeTessellationOptions(SVGParser.SceneInfo sceneInfo, int targetResolution, float multiplier,
            out float stepDist, out float maxCord, out float maxTangent)
        {
            // These tessellation options were found by trial and error to find values that made
            // visual sense with a variety of SVG assets.

            // "Pixels per Unit" doesn't make sense for UI Toolkit since it will be displayed in
            // a pixels space.  We adjust the magic values below accordingly.
            var ppu = 1.0f;

            var bbox = VectorUtils.ApproximateSceneNodeBounds(sceneInfo.Scene.Root);
            var maxDim = Mathf.Max(bbox.width, bbox.height) / ppu;

            // The scene ratio gives a rough estimate of coverage % of the vector scene on the screen.
            // Higher values should result in a more dense tessellation.
            var sceneRatio = maxDim / (targetResolution * multiplier);

            stepDist = float.MaxValue; // No need for uniform step distance
            maxCord = Mathf.Max(0.01f, 2.0f * sceneRatio);
            maxTangent = Mathf.Max(0.1f, 3.0f * sceneRatio);
        }


        /// <summary>
        ///     Generate Vector Image Asset using reflection
        /// </summary>
        /// <param name="geometry"></param>
        /// <returns></returns>
        private VectorImage GenerateVectorImageAsset(List<VectorUtils.Geometry> geometry)
        {
            var gradientResolution = 64u;

#if !UNITY_WEBGL && !UNITY_IOS && !UNITY_IPHONE && !UNITY_WSA && !UNITY_WSA_10_0
            MakeVectorHook(geometry, gradientResolution, out var asset, out _);
#else
            object[] vParams = { geometry, gradientResolution, null, null };
            MakeVectorImageAssetMethodInfo.Invoke(null, BindingFlags.InvokeMethod, null, vParams, null);

            var asset = vParams[2];
#endif

            if (asset == null)
            {
                Debug.LogError("UIElement asset generation failed");
                return null;
            }

            return asset as VectorImage;
        }
#endif

        new internal class UxmlFactory : UxmlFactory<SvgElement, UxmlTraits>
        {
        }

        new internal class UxmlTraits : VisualElement.UxmlTraits
        {
            private readonly UxmlStringAttributeDescription Svg = new() { name = "svg" };

            public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
            {
                base.Init(ve, bag, cc);
                SvgElement item = ve as SvgElement;

                item.RawSvg = Svg.GetValueFromBag(bag, cc);
            }
        }
    }
}
