using System.Collections.Generic;
#if !(!REACT_VECTOR_GRAPHICS || UNITY_WEBGL)
using Unity.VectorGraphics;
#endif
using UnityEngine;

namespace ReactUnity.Styling
{
    public static class BorderGraphic
    {
        public static Dictionary<int, Sprite> SpriteCache = new Dictionary<int, Sprite>();

#if !REACT_VECTOR_GRAPHICS || UNITY_WEBGL
        private static bool ShowVectorGraphicsMessage = true;
#endif

        static public Sprite CreateBorderSprite(int borderRadius)
        {
            if (!Application.isPlaying) return null;
            borderRadius = Mathf.Max(borderRadius, 0);
            if (SpriteCache.ContainsKey(borderRadius)) return SpriteCache[borderRadius];

            if (borderRadius == 0)
            {
                var smallTexture = new Texture2D(4, 4);
                var colors = new Color[16];
                for (int i = 0; i < 16; i++) colors[i] = Color.white;
                smallTexture.SetPixels(colors);
                smallTexture.Apply();
                return SpriteCache[borderRadius] =
                    Sprite.Create(smallTexture, new Rect(0, 0, 4, 4), Vector2.one / 2, 1, 0, SpriteMeshType.FullRect, Vector4.one);
            }


#if !REACT_VECTOR_GRAPHICS || UNITY_WEBGL
            if (ShowVectorGraphicsMessage)
            {
                Debug.LogError("To use the 'borderRadius' feeature, 'Unity.VectorGraphics' package must be installed.");
                ShowVectorGraphicsMessage = false;
            }
            return null;
#else
            var svg = new Scene() { Root = new SceneNode() { Shapes = new List<Shape>() } };

            var totalSize = borderRadius * 2 + 2;

            var rad = Vector2.one * borderRadius;

            var contour = VectorUtils.BuildRectangleContour(new Rect(0, 0, totalSize, totalSize), rad, rad, rad, rad);
            var roundedRect = new Shape()
            {
                Contours = new BezierContour[] { contour },
                Fill = new SolidFill() { Color = Color.white, Opacity = 1 },
                PathProps = new PathProperties() { Corners = PathCorner.Round },
                IsConvex = true,
            };
            svg.Root.Shapes.Add(roundedRect);

            var geo = VectorUtils.TessellateScene(svg, new VectorUtils.TessellationOptions() { StepDistance = 1, SamplingStepSize = 1 });
            var sprite = VectorUtils.BuildSprite(geo, 1, VectorUtils.Alignment.Center, Vector2.one / 2, 100);

            var size = Mathf.CeilToInt(totalSize);
            var spriteRect = new Vector4(borderRadius, borderRadius, borderRadius, borderRadius);
            var mat = new Material(Shader.Find("Unlit/Vector"));
            var texture = VectorUtils.RenderSpriteToTexture2D(sprite, size, size, mat);
            var newSprite = Sprite.Create(texture, new Rect(0, 0, size, size), Vector2.one / 2, 1, 0, SpriteMeshType.FullRect, spriteRect);


            Object.DestroyImmediate(sprite);
            SpriteCache[borderRadius] = newSprite;
            return newSprite;
#endif
        }
    }
}
