#if REACT_VECTOR_GRAPHICS
using System;
using System.Collections.Generic;
using System.Reflection;
using ReactUnity.Helpers;
using Unity.VectorGraphics;
using UnityEngine;
using UnityEngine.UIElements;
#else
using UnityEngine;
using UnityEngine.UIElements;
#endif

namespace ReactUnity.UIToolkit
{
    public static class UIToolkitHelpers
    {

#if REACT_VECTOR_GRAPHICS
        private static Type _vectorImageUtilsType;
        private static MethodInfo _makeVectorImageAsset;

        private static Type VectorImageUtilsType =>
            _vectorImageUtilsType = _vectorImageUtilsType ?? typeof(VectorUtils).Assembly.GetType("Unity.VectorGraphics.VectorImageUtils");

        private static MethodInfo MakeVectorImageAssetMethodInfo =>
            _makeVectorImageAsset = _makeVectorImageAsset ?? VectorImageUtilsType.GetMethod("MakeVectorImageAsset",
                BindingFlags.Static | BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

#if !ENABLE_IL2CPP
        private static MakeVectorDelegate _makeVectorHook;

        delegate void MakeVectorDelegate(List<VectorUtils.Geometry> geometry, uint gradientResolution, out UnityEngine.Object asset,
            out Texture2D texture2D);

        private static MakeVectorDelegate MakeVectorHook => _makeVectorHook = _makeVectorHook ??
            (MakeVectorDelegate) Delegate.CreateDelegate(typeof(MakeVectorDelegate), MakeVectorImageAssetMethodInfo);
#endif

        public static (VectorImage, Rect) GenerateVectorImage(string rawSvg)
        {
            if (string.IsNullOrWhiteSpace(rawSvg)) return (null, default(Rect));
            var (geometry, rect) = GraphicsHelpers.BuildSvgGeometry(rawSvg);
            var sourceRect = rect;
            var vectorImage = GenerateVectorImageAsset(geometry);
            return (vectorImage, sourceRect);
        }


        private static VectorImage GenerateVectorImageAsset(List<VectorUtils.Geometry> geometry)
        {
            var gradientResolution = 64u;

#if !ENABLE_IL2CPP
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
#else
        public static (VectorImage, Rect) GenerateVectorImage(string rawSvg)
        {
            ReactUnity.Helpers.WarningHelpers.WarnOnce("SVG_VECTOR_GRAPHICS", "Unity.VectorGraphics module is required to use SVG components");
            return (default(VectorImage), default(Rect));
        }
#endif

    }
}
