using UnityEngine;

#if REACT_VECTOR_GRAPHICS
using System.Collections.Generic;
using Unity.VectorGraphics;
using System.IO;
#endif

namespace ReactUnity.Helpers
{
    internal static class GraphicsHelpers
    {
#if REACT_VECTOR_GRAPHICS
        public static (List<VectorUtils.Geometry>, Rect) BuildSvgGeometry(string rawSvg)
        {
            SVGParser.SceneInfo sceneInfo;
            using (var stream = new StringReader(rawSvg))
            {
                sceneInfo = SVGParser.ImportSVG(stream, ViewportOptions.DontPreserve, 0, 1, 100, 100);
            }

            var stepDist = 0.5f;
            float samplingStepDist = 300;
            var maxCord = float.MaxValue;
            var maxTangent = Mathf.PI * 0.5f;

            var tessOptions = new VectorUtils.TessellationOptions();
            tessOptions.MaxCordDeviation = maxCord;
            tessOptions.MaxTanAngleDeviation = maxTangent;
            tessOptions.SamplingStepSize = 1.0f / samplingStepDist;
            tessOptions.StepDistance = stepDist;

            var geometry = VectorUtils.TessellateScene(sceneInfo.Scene, tessOptions, sceneInfo.NodeOpacity);

            return (geometry, sceneInfo.SceneViewport);
        }
#endif

        public static Sprite GenerateVectorSprite(string rawSvg)
        {
#if !REACT_VECTOR_GRAPHICS
            return null;
#else
            var (geoms, rect) = BuildSvgGeometry(rawSvg);
            return VectorUtils.BuildSprite(geoms, 1, VectorUtils.Alignment.Center, Vector2.zero, 128, true);
#endif
        }
    }
}
