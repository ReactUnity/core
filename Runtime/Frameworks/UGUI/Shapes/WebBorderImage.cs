using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBorderImage : MaskableGraphic
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

        public BorderImageSlice Slice;
        public ICssFourDirectional<BackgroundRepeat> Repeat;
        public ICssFourDirectional<YogaValue> Outset;
        public ICssFourDirectional<YogaValue> Width;


        private Texture2D texture;
        public override Texture mainTexture => texture;

        public ReactContext Context;

        private ImageDefinition.ResolvedImage resolved = ImageDefinition.ResolvedImage.Default;
        private ImageDefinition.ResolvedImage Resolved
        {
            get => resolved;
            set
            {
                if (resolved != value)
                {
                    resolved = value;
                    texture = value?.Texture;
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

                var szPoint = CalculateSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, BackgroundSize.Auto);

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


        public void SetBorderImage(ImageDefinition image)
        {
            if (image != Definition)
            {
                Definition = image;

                if (image != null && image != ImageDefinition.NoImage)
                {
                    texture = null;
                    UpdateImage();
                }
                else
                {
                    texture = null;
                }
            }
        }

        private void UpdateImage()
        {
            var image = Definition;

            if (image != null)
            {
                // TODO: find proper value
                var sz = Size;

                image.ResolveImage(Context, sz, (sp) => {
                    if (image != Definition) return;
                    Resolved = sp;
                });
            }
        }

        static private Vector2 CalculateSize(Vector2 containerSize, Vector2 intrinsicSize, float intinsicProportions, BackgroundSize size)
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

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var rect = RectTransformUtility.PixelAdjustRect(rectTransform, canvas);
            var size = rect.size;
            var center = rect.position;
            var imageSize = !texture ? Vector2.zero : new Vector2(texture.width, texture.height);

            var topSlice = Slice.Top.GetPointValue(imageSize.y, 0);
            var leftSlice = Slice.Left.GetPointValue(imageSize.x, 0);
            var bottomSlice = Slice.Bottom.GetPointValue(imageSize.y, 0);
            var rightSlice = Slice.Right.GetPointValue(imageSize.x, 0);

            var topWidth = Width.Top.GetPointValue(size.y);
            var leftWidth = Width.Left.GetPointValue(size.x);
            var bottomWidth = Width.Bottom.GetPointValue(size.y);
            var rightWidth = Width.Right.GetPointValue(size.x);

            var topOutset = Outset.Top.GetPointValue(size.y);
            var leftOutset = Outset.Left.GetPointValue(size.x);
            var bottomOutset = Outset.Bottom.GetPointValue(size.y);
            var rightOutset = Outset.Right.GetPointValue(size.x);



            // Positions
            var x0 = rect.x - leftOutset;
            var x1 = x0 + leftWidth;
            var x2 = rect.x + rightOutset - rightWidth + size.x;
            var x3 = x2 + rightWidth;

            var y0 = rect.y + size.y + topOutset;
            var y1 = y0 - topWidth;
            var y2 = rect.y - bottomOutset + bottomWidth;
            var y3 = y2 - bottomWidth;

            // UVs
            var u0 = 0;
            var u1 = leftSlice / imageSize.x;
            var u2 = 1 - rightSlice / imageSize.x;
            var u3 = 1;

            var v0 = 1;
            var v1 = 1 - topSlice / imageSize.y;
            var v2 = bottomSlice / imageSize.y;
            var v3 = 0;


            var fillXSlice = Mathf.Max(0, imageSize.x - leftSlice - rightSlice);
            var fillYSlice = Mathf.Max(0, imageSize.y - topSlice - bottomSlice);
            var fillWidth = x2 - x1;
            var fillHeight = y1 - y2;


            // TL
            var baseIndex = vh.currentVertCount;
            vh.AddVert(new Vector2(x0, y0), new Vector2(u0, v0));
            vh.AddVert(new Vector2(x1, y0), new Vector2(u1, v0));
            vh.AddVert(new Vector2(x0, y1), new Vector2(u0, v1));
            vh.AddVert(new Vector2(x1, y1), new Vector2(u1, v1));
            vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
            vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);


            // TR
            baseIndex = vh.currentVertCount;
            vh.AddVert(new Vector2(x2, y0), new Vector2(u2, v0));
            vh.AddVert(new Vector2(x3, y0), new Vector2(u3, v0));
            vh.AddVert(new Vector2(x2, y1), new Vector2(u2, v1));
            vh.AddVert(new Vector2(x3, y1), new Vector2(u3, v1));
            vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
            vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);


            // BR
            baseIndex = vh.currentVertCount;
            vh.AddVert(new Vector2(x2, y2), new Vector2(u2, v2));
            vh.AddVert(new Vector2(x3, y2), new Vector2(u3, v2));
            vh.AddVert(new Vector2(x2, y3), new Vector2(u2, v3));
            vh.AddVert(new Vector2(x3, y3), new Vector2(u3, v3));
            vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
            vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);


            // BL
            baseIndex = vh.currentVertCount;
            vh.AddVert(new Vector2(x0, y2), new Vector2(u0, v2));
            vh.AddVert(new Vector2(x1, y2), new Vector2(u1, v2));
            vh.AddVert(new Vector2(x0, y3), new Vector2(u0, v3));
            vh.AddVert(new Vector2(x1, y3), new Vector2(u1, v3));
            vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
            vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);


            // TOP
            var tileArea = new Vector2(fillWidth, topWidth);
            var tileOffset = new Vector2(leftWidth - leftOutset, size.y - topWidth + topOutset);
            var tileSize = new Vector2(fillXSlice, topSlice);
            var tileUv = new Rect(u1, v1, u2 - u1, v0 - v1);

            WebBackgroundImage.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, Repeat.Top, BackgroundRepeat.Stretch, color, tileUv);


            // RIGHT
            tileArea = new Vector2(rightWidth, fillHeight);
            tileOffset = new Vector2(size.x - rightWidth + rightOutset, bottomWidth - bottomOutset);
            tileSize = new Vector2(rightSlice, fillYSlice);
            tileUv = new Rect(u2, v2, u3 - u2, v1 - v2);

            WebBackgroundImage.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, BackgroundRepeat.Stretch, Repeat.Right, color, tileUv);


            // Bottom
            tileArea = new Vector2(fillWidth, bottomWidth);
            tileOffset = new Vector2(leftWidth - leftOutset, -bottomOutset);
            tileSize = new Vector2(fillXSlice, bottomSlice);
            tileUv = new Rect(u1, v3, u2 - u1, v2 - v3);

            WebBackgroundImage.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, Repeat.Bottom, BackgroundRepeat.Stretch, color, tileUv);


            // Left
            tileArea = new Vector2(leftWidth, fillHeight);
            tileOffset = new Vector2(-leftOutset, bottomWidth - bottomOutset);
            tileSize = new Vector2(leftSlice, fillYSlice);
            tileUv = new Rect(u0, v2, u1 - u0, v1 - v2);

            WebBackgroundImage.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, BackgroundRepeat.Stretch, Repeat.Left, color, tileUv);


            if (Slice.Fill)
            {
                tileArea = new Vector2(fillWidth, fillHeight);
                tileOffset = new Vector2(leftWidth - leftOutset, bottomWidth - bottomOutset);
                tileSize = new Vector2(fillXSlice, fillYSlice);
                tileUv = new Rect(u1, v2, u2 - u1, v1 - v2);

                WebBackgroundImage.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, Repeat.Top, Repeat.Right, color, tileUv);
            }
        }
    }
}
