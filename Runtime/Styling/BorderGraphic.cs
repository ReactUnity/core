using ReactUnity.Helpers;
using System.Collections.Generic;
using UnityEngine;
#if !(!REACT_VECTOR_GRAPHICS || UNITY_WEBGL)
using Unity.VectorGraphics;
#endif

namespace ReactUnity.Styling
{
    public static class BorderGraphic
    {
        public static Dictionary<string, Sprite> SpriteCache = new Dictionary<string, Sprite>();

        static public Sprite CreateBorderSpriteVector(int tl, int tr, int bl, int br)
        {
            tl = Mathf.Max(tl, 0);
            tr = Mathf.Max(tr, 0);
            bl = Mathf.Max(bl, 0);
            br = Mathf.Max(br, 0);

            var key = GetKey(tl, tr, bl, br);
            if (SpriteCache.ContainsKey(key)) return SpriteCache[key];
            if (tl == 0 && tr == 0 && bl == 0 && br == 0) return CreateFlatBorder();
            var (width, height) = GetSize(tl, tr, bl, br);

            if (!FeatureGuards.VectorGraphics && Application.isPlaying) return null;

#if !REACT_VECTOR_GRAPHICS || UNITY_WEBGL
            return null;
#else

            var svg = new Scene() { Root = new SceneNode() { Shapes = new List<Shape>() } };

            // For some reason, the svg is inverted so I am inverting the corners
            var contour = VectorUtils.BuildRectangleContour(new Rect(0, 0, width, height),
                Vector2.one * bl, Vector2.one * br, Vector2.one * tr, Vector2.one * tl);

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

            var mat = new Material(Shader.Find("Unlit/Vector"));
            var texture = VectorUtils.RenderSpriteToTexture2D(sprite, width, height, mat);
            var newSprite = Sprite.Create(texture, new Rect(0, 0, width, height), Vector2.one / 2, 1, 0, SpriteMeshType.FullRect, GetBorder(tl, tr, bl, br));


            Object.DestroyImmediate(sprite);
            SpriteCache[key] = newSprite;
            return newSprite;
#endif
        }

        static public Sprite CreateBorderSprite(int borderRadius)
        {
            return CreateBorderSprite(borderRadius, borderRadius, borderRadius, borderRadius);
        }

        static public Sprite CreateBorderSprite(int tl, int tr, int bl, int br, bool antiAliasing = false)
        {
            if (Application.isPlaying) return CreateBorderSpriteVector(tl, tr, bl, br);
            return CreateBorderSpriteRaster(tl, tr, bl, br, antiAliasing);
        }

        static public Sprite CreateBorderSpriteRaster(int tl, int tr, int bl, int br, bool antiAliasing = false)
        {
            tl = Mathf.Max(tl, 0);
            tr = Mathf.Max(tr, 0);
            bl = Mathf.Max(bl, 0);
            br = Mathf.Max(br, 0);

            var key = GetKey(tl, tr, bl, br);
            if (SpriteCache.ContainsKey(key)) return SpriteCache[key];
            if (tl == 0 && tr == 0 && bl == 0 && br == 0) return CreateFlatBorder();
            var (width, height) = GetSize(tl, tr, bl, br);

            var texture = new Texture2D(width, height, TextureFormat.RGBA32, 0, true);

            for (int w = 0; w < width; w++)
            {
                for (int h = 0; h < height; h++)
                {
                    var color = Color.white;
                    var x = 0f;
                    var y = 0f;
                    var r = 0f;
                    var p = 0.5f;

                    if (w < bl && h < bl)
                    {
                        x = bl - w - p;
                        y = bl - h - p;
                        r = bl;
                    }
                    else if (w < tl && h > (height - tl))
                    {
                        x = tl - w - p;
                        y = h + tl - height + p;
                        r = tl;
                    }
                    else if (w > (width - br) && h < br)
                    {

                        x = w + br - width + p;
                        y = br - h - p;
                        r = br;
                    }
                    else if (w > (width - tr) && h > (height - tr))
                    {

                        x = w + tr - width + p;
                        y = h + tr - height + p;
                        r = tr;
                    }

                    var r2 = r * r;
                    var d2 = x * x + y * y;

                    if (d2 > r2)
                    {
                        var d = Mathf.Sqrt(d2);
                        var diff = Mathf.Abs(d - r);

                        if (diff > 1) color = Color.clear;
                        else if (antiAliasing) color = new Color(1, 1, 1, diff);
                    }

                    texture.SetPixel(w, h, color);
                }
            }

            texture.Apply();

            var newSprite = Sprite.Create(texture, new Rect(0, 0, width, height), Vector2.one / 2, 1, 0, SpriteMeshType.FullRect, GetBorder(tl, tr, bl, br));

            return SpriteCache[key] = newSprite;
        }

        static private Sprite CreateFlatBorder()
        {
            var key = $"0_0_0_0";
            var smallTexture = new Texture2D(4, 4);
            var colors = new Color[16];
            for (int i = 0; i < 16; i++) colors[i] = Color.white;
            smallTexture.SetPixels(colors);
            smallTexture.Apply();
            return SpriteCache[key] =
                Sprite.Create(smallTexture, new Rect(0, 0, 4, 4), Vector2.one / 2, 1, 0, SpriteMeshType.FullRect, Vector4.one);
        }

        static private Vector4 GetBorder(int tl, int tr, int bl, int br)
        {
            var lmax = Mathf.Max(tl, bl);
            var rmax = Mathf.Max(tr, br);
            var tmax = Mathf.Max(tl, tr);
            var bmax = Mathf.Max(bl, br);
            return new Vector4(lmax, bmax, rmax, tmax);
        }

        static private string GetKey(int tl, int tr, int bl, int br)
        {
            return $"{tl}_{tr}_{bl}_{br}";
        }

        static private (int, int) GetSize(int tl, int tr, int bl, int br)
        {
            var lmax = Mathf.Max(tl, bl);
            var rmax = Mathf.Max(tr, br);
            var tmax = Mathf.Max(tl, tr);
            var bmax = Mathf.Max(bl, br);

            var width = lmax + rmax + 2;
            var height = tmax + bmax + 2;

            return (width, height);
        }
    }
}
