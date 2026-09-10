using Yoga;
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

        // All four are read by the mesh and by nothing else, and applying a style re-assigns each
        // of them on every frame the element is visited -- which the caller used to answer with a
        // blanket SetVerticesDirty, re-tessellating the border on every frame whether or not any
        // of them had moved. Each setter carries the rebuild instead, so an unchanged frame costs
        // nothing and a changed one still reaches the mesh.
        private BorderImageSlice slice;
        public BorderImageSlice Slice
        {
            get => slice;
            set
            {
                if (slice == value) return;
                slice = value;
                SetVerticesDirty();
            }
        }

        private ICssFourDirectional<BackgroundRepeat> repeat;
        public ICssFourDirectional<BackgroundRepeat> Repeat
        {
            get => repeat;
            set
            {
                if (Same(repeat, value)) return;
                repeat = value;
                SetVerticesDirty();
            }
        }

        private ICssFourDirectional<YogaValue> outset;
        public ICssFourDirectional<YogaValue> Outset
        {
            get => outset;
            set
            {
                if (Same(outset, value)) return;
                outset = value;
                SetVerticesDirty();
            }
        }

        private ICssFourDirectional<YogaValue> width;
        public ICssFourDirectional<YogaValue> Width
        {
            get => width;
            set
            {
                if (Same(width, value)) return;
                width = value;
                SetVerticesDirty();
            }
        }

        // Side by side rather than generically: the interface is implemented both by a class the
        // style resolver rebuilds and by the struct an animation rebuilds every frame, so neither
        // reference equality nor a struct's own works -- and `EqualityComparer<T>.Default` boxes
        // both YogaValues on every side it compares.
        private static bool Same(ICssFourDirectional<YogaValue> a, ICssFourDirectional<YogaValue> b)
        {
            if (a == null || b == null) return ReferenceEquals(a, b);
            return a.Top == b.Top && a.Right == b.Right && a.Bottom == b.Bottom && a.Left == b.Left;
        }

        private static bool Same(ICssFourDirectional<BackgroundRepeat> a, ICssFourDirectional<BackgroundRepeat> b)
        {
            if (a == null || b == null) return ReferenceEquals(a, b);
            return a.Top == b.Top && a.Right == b.Right && a.Bottom == b.Bottom && a.Left == b.Left;
        }


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
                    // Backs mainTexture and sizes the UVs, so an image resolved after the first
                    // frame -- anything not already loaded -- needs both halves rebuilt.
                    SetAllDirty();
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

                var szPoint = ImageUtils.CalculateImageSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, BackgroundSize.Auto);

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

            var imageSize = ImageUtils.CalculateImageSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, BackgroundSize.Auto);

            var topSlice = slice.Top.GetPointValue(imageSize.y, 0);
            var leftSlice = slice.Left.GetPointValue(imageSize.x, 0);
            var bottomSlice = slice.Bottom.GetPointValue(imageSize.y, 0);
            var rightSlice = slice.Right.GetPointValue(imageSize.x, 0);

            var topWidth = width.Top.GetPointValue(size.y);
            var leftWidth = width.Left.GetPointValue(size.x);
            var bottomWidth = width.Bottom.GetPointValue(size.y);
            var rightWidth = width.Right.GetPointValue(size.x);

            var topOutset = outset.Top.GetPointValue(size.y);
            var leftOutset = outset.Left.GetPointValue(size.x);
            var bottomOutset = outset.Bottom.GetPointValue(size.y);
            var rightOutset = outset.Right.GetPointValue(size.x);



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
            if (leftWidth > 0 && topWidth > 0 && topSlice > 0 && leftSlice > 0)
            {
                var baseIndex = vh.currentVertCount;
                vh.AddVert(new Vector2(x0, y0), new Vector2(u0, v0));
                vh.AddVert(new Vector2(x1, y0), new Vector2(u1, v0));
                vh.AddVert(new Vector2(x0, y1), new Vector2(u0, v1));
                vh.AddVert(new Vector2(x1, y1), new Vector2(u1, v1));
                vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);
            }


            // TR
            if (topWidth > 0 && rightWidth > 0 && topSlice > 0 && rightSlice > 0)
            {
                var baseIndex = vh.currentVertCount;
                vh.AddVert(new Vector2(x2, y0), new Vector2(u2, v0));
                vh.AddVert(new Vector2(x3, y0), new Vector2(u3, v0));
                vh.AddVert(new Vector2(x2, y1), new Vector2(u2, v1));
                vh.AddVert(new Vector2(x3, y1), new Vector2(u3, v1));
                vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);
            }


            // BR
            if (bottomWidth > 0 && rightWidth > 0 && bottomSlice > 0 && rightSlice > 0)
            {
                var baseIndex = vh.currentVertCount;
                vh.AddVert(new Vector2(x2, y2), new Vector2(u2, v2));
                vh.AddVert(new Vector2(x3, y2), new Vector2(u3, v2));
                vh.AddVert(new Vector2(x2, y3), new Vector2(u2, v3));
                vh.AddVert(new Vector2(x3, y3), new Vector2(u3, v3));
                vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);
            }

            // BL
            if (bottomWidth > 0 && leftWidth > 0 && bottomSlice > 0 && leftSlice > 0)
            {
                var baseIndex = vh.currentVertCount;
                vh.AddVert(new Vector2(x0, y2), new Vector2(u0, v2));
                vh.AddVert(new Vector2(x1, y2), new Vector2(u1, v2));
                vh.AddVert(new Vector2(x0, y3), new Vector2(u0, v3));
                vh.AddVert(new Vector2(x1, y3), new Vector2(u1, v3));
                vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                vh.AddTriangle(baseIndex + 1, baseIndex + 3, baseIndex + 2);
            }


            // Top
            if (fillWidth > 0 && topWidth > 0 && topSlice > 0 && fillXSlice > 0)
            {
                var tileArea = new Vector2(fillWidth, topWidth);
                var tileOffset = new Vector2(leftWidth - leftOutset, size.y - topWidth + topOutset);
                var tileSize = new Vector2(fillXSlice, topSlice);
                var tileUv = new Rect(u1, v1, u2 - u1, v0 - v1);

                ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, repeat.Top, BackgroundRepeat.Stretch, color, tileUv);
            }


            // Right
            if (rightWidth > 0 && fillHeight > 0 && rightSlice > 0 && fillYSlice > 0)
            {
                var tileArea = new Vector2(rightWidth, fillHeight);
                var tileOffset = new Vector2(size.x - rightWidth + rightOutset, bottomWidth - bottomOutset);
                var tileSize = new Vector2(rightSlice, fillYSlice);
                var tileUv = new Rect(u2, v2, u3 - u2, v1 - v2);

                ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, BackgroundRepeat.Stretch, repeat.Right, color, tileUv);
            }


            // Bottom
            if (fillWidth > 0 && bottomWidth > 0 && bottomSlice > 0 && fillXSlice > 0)
            {
                var tileArea = new Vector2(fillWidth, bottomWidth);
                var tileOffset = new Vector2(leftWidth - leftOutset, -bottomOutset);
                var tileSize = new Vector2(fillXSlice, bottomSlice);
                var tileUv = new Rect(u1, v3, u2 - u1, v2 - v3);

                ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, repeat.Bottom, BackgroundRepeat.Stretch, color, tileUv);
            }

            // Left
            if (leftWidth > 0 && fillHeight > 0 && leftSlice > 0 && fillYSlice > 0)
            {
                var tileArea = new Vector2(leftWidth, fillHeight);
                var tileOffset = new Vector2(-leftOutset, bottomWidth - bottomOutset);
                var tileSize = new Vector2(leftSlice, fillYSlice);
                var tileUv = new Rect(u0, v2, u1 - u0, v1 - v2);

                ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, BackgroundRepeat.Stretch, repeat.Left, color, tileUv);
            }

            // Fill
            if (slice.Fill && fillWidth > 0 && fillHeight > 0 && fillXSlice > 0 && fillYSlice > 0)
            {
                var tileArea = new Vector2(fillWidth, fillHeight);
                var tileOffset = new Vector2(leftWidth - leftOutset, bottomWidth - bottomOutset);
                var tileSize = new Vector2(fillXSlice, fillYSlice);
                var tileUv = new Rect(u1, v2, u2 - u1, v1 - v2);

                ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset + center, repeat.Top, repeat.Right, color, tileUv);
            }
        }
    }
}
