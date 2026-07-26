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

        private static int ArgLength => MakeVectorImageAssetMethodInfo.GetParameters().Length;

#if !ENABLE_IL2CPP
        private static MakeVectorDelegate2 _makeVectorHook;

        delegate void MakeVectorDelegate(List<VectorUtils.Geometry> geometry, uint gradientResolution, out UnityEngine.Object asset,
            out Texture2D texture2D);

        delegate void MakeVectorDelegate2(List<VectorUtils.Geometry> geometry, Rect rect, uint gradientResolution, out UnityEngine.Object asset,
            out Texture2D texture2D);

        private static MakeVectorDelegate2 MakeVectorHook
        {
            get
            {
                if (_makeVectorHook != null) return _makeVectorHook;

                if (ArgLength != 5)
                {
                    var m1 = (MakeVectorDelegate) Delegate.CreateDelegate(typeof(MakeVectorDelegate), MakeVectorImageAssetMethodInfo);

                    return _makeVectorHook = (MakeVectorDelegate2) Delegate.CreateDelegate(
                        typeof(MakeVectorDelegate2),
                        new MakeVectorDelegate2(delegate (List<VectorUtils.Geometry> geometry, Rect rect, uint gradientResolution, out UnityEngine.Object asset, out Texture2D texture2D) {
                            m1(geometry, gradientResolution, out asset, out texture2D);
                        }).GetMethodInfo());
                }

                return _makeVectorHook = (MakeVectorDelegate2) Delegate.CreateDelegate(typeof(MakeVectorDelegate2), MakeVectorImageAssetMethodInfo);
            }
        }
#endif

        public static (VectorImage, Rect) GenerateVectorImage(string rawSvg)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(rawSvg)) return (null, default(Rect));
                var (geometry, rect) = GraphicsHelpers.BuildSvgGeometry(rawSvg);
                var vectorImage = GenerateVectorImageAsset(geometry, rect);
                return (vectorImage, rect);
            }
            catch (Exception ex)
            {
                Debug.LogException(ex);
                return (null, default(Rect));
            }
        }


        private static VectorImage GenerateVectorImageAsset(List<VectorUtils.Geometry> geometry, Rect rect)
        {
            var gradientResolution = 64u;

#if !ENABLE_IL2CPP
            MakeVectorHook(geometry, rect, gradientResolution, out var asset, out _);
#else
            object[] vParams = ArgLength == 5 ? new object[] { geometry, rect, gradientResolution, null, null } : new object[] { geometry, gradientResolution, null, null };
            MakeVectorImageAssetMethodInfo.Invoke(null, BindingFlags.InvokeMethod, null, vParams, null);

            var asset = vParams[ArgLength == 5 ? 3 : 2];
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
