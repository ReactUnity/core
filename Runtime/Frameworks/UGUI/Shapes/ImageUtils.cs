using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    internal static class ImageUtils
    {
        public static Vector2 CalculateImageSize(
            Vector2 containerSize,
            Vector2 intrinsicSize,
            float intinsicProportions,
            BackgroundSize imageSize
        )
        {
            var ix = float.IsNaN(intrinsicSize.x);
            var iy = float.IsNaN(intrinsicSize.y);
            var ip = float.IsNaN(intinsicProportions);

            var width = containerSize.x;
            var height = containerSize.y;

            if (imageSize.IsCustom)
            {
                var val = imageSize.Value;
                var autoX = val.X.Unit == YogaUnit.Auto || val.X.Unit == YogaUnit.Undefined;
                var autoY = val.Y.Unit == YogaUnit.Auto || val.Y.Unit == YogaUnit.Undefined;

                if (autoX)
                {
                    if (autoY)
                    {
                        if (ix && iy)
                        {
                            if (ip) return containerSize;
                            else return CalculateImageSize(containerSize, intrinsicSize, intinsicProportions, BackgroundSize.Contain);
                        }
                        if (ix) return new Vector2(width, intrinsicSize.y);
                        if (iy) return new Vector2(intrinsicSize.x, height);
                        return new Vector2(intrinsicSize.x, intrinsicSize.y);
                    }
                    else
                    {
                        var yVal = val.Y.GetPointValue(containerSize.y, containerSize.y);
                        var xVal = ip ? containerSize.x : yVal * intinsicProportions;
                        return new Vector2(xVal, yVal);
                    }
                }
                else if (autoY)
                {
                    var xVal = val.X.GetPointValue(containerSize.x, containerSize.x);
                    var yVal = ip ? containerSize.y : xVal / intinsicProportions;
                    return new Vector2(xVal, yVal);
                }
                else
                {
                    return val.GetPointValue(containerSize, containerSize, false);
                }
            }
            else
            {
                var rw = ix ? containerSize.x : intrinsicSize.x;
                var rh = iy ? containerSize.y : intrinsicSize.y;

                if ((imageSize.Keyword == BackgroundSizeKeyword.Cover && rw < width)
                    || (imageSize.Keyword == BackgroundSizeKeyword.Contain && rw != width))
                {
                    var scale = width / rw;
                    rw = width;
                    rh *= scale;
                }

                if ((imageSize.Keyword == BackgroundSizeKeyword.Cover && rh < height)
                    || (imageSize.Keyword == BackgroundSizeKeyword.Contain && rh > height))
                {
                    var scale = height / rh;
                    rh = height;
                    rw *= scale;
                }

                return new Vector2(rw, rh);
            }
        }

        public static (float, float, int, float) CalculateRepeat(
            float imageSize,
            float totalSize,
            float imagePos,
            BackgroundRepeat repeat
        )
        {
            var rt = totalSize / imageSize;

            var tile = imageSize;
            var spacing = 0f;
            var count = Mathf.CeilToInt(rt);
            var startPos = imagePos;

            if (repeat == BackgroundRepeat.NoRepeat)
            {
                count = 1;
            }
            else if (repeat == BackgroundRepeat.Stretch)
            {
                count = 1;
                tile = totalSize;
            }
            else if (repeat == BackgroundRepeat.Round)
            {
                count = Mathf.Max(1, Mathf.RoundToInt(rt));
                tile = totalSize / count;
            }
            else if (repeat == BackgroundRepeat.Space)
            {
                count = Mathf.FloorToInt(rt);

                if (count > 1)
                {
                    spacing = (totalSize - tile * count) / (count - 1);
                    startPos = 0;
                }
                else
                {
                    count = 1;
                    spacing = 0f;
                }
            }


            if (repeat == BackgroundRepeat.Repeat || repeat == BackgroundRepeat.Round)
            {
                if (startPos > 0)
                {
                    var stCount = Mathf.Ceil(Mathf.Abs(startPos) / tile);
                    startPos = startPos - stCount * tile;
                    count++;
                }
                else if (startPos < 0)
                {
                    var stCount = Mathf.Floor(Mathf.Abs(startPos) / tile);
                    startPos = startPos + stCount * tile;
                    count++;
                }
            }

            return (tile, spacing, count, startPos);
        }

        public static void CreateTiledImageMesh(
            VertexHelper vh,
            Vector2 imageSize,
            Vector2 imagePos,
            Vector2 totalSize,
            Vector2 vertexOffset,
            BackgroundRepeat repeatX,
            BackgroundRepeat repeatY,
            Color32 color,
            Rect uvRect
        )
        {
            var (tileX, spacingX, countX, startPosX) = CalculateRepeat(imageSize.x, totalSize.x, imagePos.x, repeatX);
            var (tileY, spacingY, countY, startPosY) = CalculateRepeat(imageSize.y, totalSize.y, imagePos.y, repeatY);

            for (int x = 0; x < countX; x++)
            {
                var tx = x * tileX;
                var spx = x * spacingX;

                var x0 = tx + spx + startPosX;
                var x1 = x0 + tileX;

                var uMin = 0f;
                var uMax = 1f;

                if (x1 <= 0 || x0 >= totalSize.x) continue;

                if (x1 > totalSize.x)
                {
                    uMax -= (x1 - totalSize.x) / tileX;
                    x1 = totalSize.x;
                }

                if (x0 < 0)
                {
                    uMin -= x0 / tileX;
                    x0 = 0;
                }

                for (int y = 0; y < countY; y++)
                {
                    var ty = y * tileY;
                    var spy = y * spacingY;

                    var y0 = ty + spy + startPosY;
                    var y1 = y0 + tileY;

                    var vMin = 0f;
                    var vMax = 1f;

                    if (y1 <= 0 || y0 >= totalSize.y) continue;

                    if (y1 > totalSize.y)
                    {
                        vMax -= (y1 - totalSize.y) / tileY;
                        y1 = totalSize.y;
                    }

                    if (y0 < 0)
                    {
                        vMin -= y0 / tileY;
                        y0 = 0;
                    }

                    var p00 = new Vector2(x0, y0) + vertexOffset;
                    var p01 = new Vector2(x0, y1) + vertexOffset;
                    var p10 = new Vector2(x1, y0) + vertexOffset;
                    var p11 = new Vector2(x1, y1) + vertexOffset;

                    // Scale and shift uvs
                    var u00 = uvRect.position + new Vector2(uMin, vMin) * uvRect.size;
                    var u01 = uvRect.position + new Vector2(uMin, vMax) * uvRect.size;
                    var u10 = uvRect.position + new Vector2(uMax, vMin) * uvRect.size;
                    var u11 = uvRect.position + new Vector2(uMax, vMax) * uvRect.size;


                    var ind = vh.currentVertCount;

                    vh.AddVert(p00, color, u00);
                    vh.AddVert(p01, color, u01);
                    vh.AddVert(p10, color, u10);
                    vh.AddVert(p11, color, u11);

                    vh.AddTriangle(ind + 0, ind + 1, ind + 2);
                    vh.AddTriangle(ind + 1, ind + 3, ind + 2);
                }
            }
        }
    }
}
