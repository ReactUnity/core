using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBackgroundImage : Image
    {
        private RectTransform rt;

        public Vector2 Size => new Vector2(rt.rect.width, rt.rect.height);

        private ImageDefinition definition;
        public ImageDefinition Definition
        {
            get => definition;
            set
            {
                definition = value;
                material = definition?.DefaultMaterial;
                SetMaterialDirty();
            }
        }


        public ReactContext Context;

        [SerializeField]
        private BackgroundBlendMode BlendMode;

        [SerializeField]
        private BackgroundSize backgroundSize = BackgroundSize.Auto;
        public BackgroundSize BackgroundSize
        {
            get => backgroundSize;
            set
            {
                backgroundSize = value;
                RefreshSize();
            }
        }

        [SerializeField]
        public YogaValue2 BackgroundPosition = YogaValue2.Zero;
        [SerializeField]
        public BackgroundRepeat BackgroundRepeatX;
        [SerializeField]
        public BackgroundRepeat BackgroundRepeatY;

        private Color TintColor;

        private ImageDefinition.ResolvedImage resolved = ImageDefinition.ResolvedImage.Default;
        private ImageDefinition.ResolvedImage Resolved
        {
            get => resolved;
            set
            {
                if (resolved != value)
                {
                    resolved = value;
                    sprite = value?.Sprite;
                    type = sprite == null || sprite.border == Vector4.zero ? Type.Simple : Type.Sliced;
                    UpdateBlendMode();
                }
            }
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            rt = GetComponent<RectTransform>();
            raycastTarget = false;
        }

        public override Material materialForRendering
        {
            get
            {
                var baseMat = base.materialForRendering;
                if (Definition == null || Definition.DoesNotModifyMaterial) return baseMat;

                var szPoint = CalculateSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);

                var result = Definition?.ModifyMaterial(Context, baseMat, szPoint);

                return result;
            }
        }

        protected override void OnRectTransformDimensionsChange()
        {
            base.OnRectTransformDimensionsChange();
            RefreshSize();
        }

        private void RefreshSize()
        {
            SetMaterialDirty();
            SetVerticesDirty();

            if (Definition != null && Definition.SizeUpdatesGraphic) UpdateImage();
        }


        public void SetBackgroundColorAndImage(Color tint, ImageDefinition image, BackgroundBlendMode blendMode = BackgroundBlendMode.Normal)
        {
            BlendMode = blendMode;
            TintColor = tint;
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.NoImage)
                {
                    sprite = null;
                    color = Color.clear;
                    UpdateImage();
                }
                else
                {
                    sprite = null;
                    color = tint;
                }
            }
            else
            {
                UpdateBlendMode();
            }
        }

        private void UpdateImage()
        {
            var image = Definition;

            if (image != null)
            {
                var sz = backgroundSize.Value.GetPointValue(Size, Size, false);

                image.ResolveImage(Context, sz, (sp) => {
                    if (image != Definition) return;
                    Resolved = sp;
                });
            }
        }

        private void UpdateBlendMode()
        {
            color = BlendMode == BackgroundBlendMode.Normal && sprite != null ? Color.white : TintColor;
        }

        public static Vector2 CalculateSize(Vector2 containerSize, Vector2 intrinsicSize, float intinsicProportions, BackgroundSize size)
        {
            var ix = float.IsNaN(intrinsicSize.x);
            var iy = float.IsNaN(intrinsicSize.y);
            var ip = float.IsNaN(intinsicProportions);

            var width = containerSize.x;
            var height = containerSize.y;

            if (size.IsCustom)
            {
                var val = size.Value;
                var autoX = val.X.Unit == YogaUnit.Auto || val.X.Unit == YogaUnit.Undefined;
                var autoY = val.Y.Unit == YogaUnit.Auto || val.Y.Unit == YogaUnit.Undefined;

                if (autoX)
                {
                    if (autoY)
                    {
                        if (ix && iy)
                        {
                            if (ip) return containerSize;
                            else return CalculateSize(containerSize, intrinsicSize, intinsicProportions, BackgroundSize.Contain);
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

                if ((size.Keyword == BackgroundSizeKeyword.Cover && rw < width)
                    || (size.Keyword == BackgroundSizeKeyword.Contain && rw != width))
                {
                    var scale = width / rw;
                    rw = width;
                    rh *= scale;
                }

                if ((size.Keyword == BackgroundSizeKeyword.Cover && rh < height)
                    || (size.Keyword == BackgroundSizeKeyword.Contain && rh > height))
                {
                    var scale = height / rh;
                    rh = height;
                    rw *= scale;
                }

                return new Vector2(rw, rh);
            }
        }

#if UNITY_EDITOR
        protected override void OnValidate()
        {
            base.OnValidate();
            RefreshSize();
        }
#endif


        public static (float, float, int, float) CalculateRepeat(float size, float totalSize, float pos, BackgroundRepeat repeat)
        {
            var rt = totalSize / size;

            var tile = size;
            var spacing = 0f;
            var count = Mathf.CeilToInt(rt);
            var startPos = pos;

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

        public static void CreateTiledImageMesh(VertexHelper vh, Vector2 szPoint, Vector2 psPoint, Vector2 size, Vector2 offset, BackgroundRepeat repeatX, BackgroundRepeat repeatY, Color32 color, Rect uvRect)
        {
            var (tileX, spacingX, countX, startPosX) = CalculateRepeat(szPoint.x, size.x, psPoint.x, repeatX);
            var (tileY, spacingY, countY, startPosY) = CalculateRepeat(szPoint.y, size.y, psPoint.y, repeatY);

            for (int x = 0; x < countX; x++)
            {
                var tx = x * tileX;
                var spx = x * spacingX;

                var x0 = tx + spx + startPosX;
                var x1 = x0 + tileX;

                var uMin = 0f;
                var uMax = 1f;

                if (x1 <= 0 || x0 >= size.x) continue;

                if (x1 > size.x)
                {
                    uMax -= (x1 - size.x) / tileX;
                    x1 = size.x;
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

                    if (y1 <= 0 || y0 >= size.y) continue;

                    if (y1 > size.y)
                    {
                        vMax -= (y1 - size.y) / tileY;
                        y1 = size.y;
                    }

                    if (y0 < 0)
                    {
                        vMin -= y0 / tileY;
                        y0 = 0;
                    }

                    var p00 = new Vector2(x0, y0) + offset;
                    var p01 = new Vector2(x0, y1) + offset;
                    var p10 = new Vector2(x1, y0) + offset;
                    var p11 = new Vector2(x1, y1) + offset;

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

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var size = RectTransformUtility.PixelAdjustRect(rectTransform, canvas).size;
            var offset = -size * rectTransform.pivot;

            var szPoint = CalculateSize(size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
            var psPoint = BackgroundPosition.GetPointValue(size - szPoint, 0, true);

            CreateTiledImageMesh(vh, szPoint, psPoint, size, offset, BackgroundRepeatX, BackgroundRepeatY, color, new Rect(0, 0, 1, 1));
        }
    }
}
