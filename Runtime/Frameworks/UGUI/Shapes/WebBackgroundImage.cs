using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBackgroundImage : Image
    {
        private struct ShaderProps
        {
            public Material BaseMaterial;
            public Vector4 Size;
            public Vector4 Pos;
            public int RepeatX;
            public int RepeatY;
            public float Aspect;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Size.Equals(props.Size) &&
                       Pos.Equals(props.Pos) &&
                       RepeatX == props.RepeatX &&
                       RepeatY == props.RepeatY &&
                       Aspect == props.Aspect;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, Size, Pos, RepeatX, RepeatY, Aspect);
            }

            public void SetToMaterial(Material mat)
            {
                mat.SetVector(SizeProp, Size);
                mat.SetVector(PosProp, Pos);
                mat.SetFloat(RepeatXProp, RepeatX);
                mat.SetFloat(RepeatYProp, RepeatY);
                mat.SetFloat(AspectProp, Aspect);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();


        public static readonly int SizeProp = Shader.PropertyToID("_size");
        public static readonly int PosProp = Shader.PropertyToID("_pos");
        public static readonly int RepeatXProp = Shader.PropertyToID("_repeatX");
        public static readonly int RepeatYProp = Shader.PropertyToID("_repeatY");
        public static readonly int AspectProp = Shader.PropertyToID("_aspect");

        private RectTransform rt;

        public Vector2 Size => new Vector2(rt.rect.width, rt.rect.height);

        private ImageDefinition definition;
        public ImageDefinition Definition
        {
            get => definition;
            set
            {
                definition = value;
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
                if (definition?.DoesNotModifyMaterial ?? true) return baseMat;

                var szPoint = CalculateSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
                var sz = new Vector2(szPoint.x / Size.x, szPoint.y / Size.y);
                var psPoint = BackgroundPosition.GetPointValue(Size - szPoint, 0, false);
                var ps = new Vector2(psPoint.x / Size.x, psPoint.y / Size.y);

                var props = new ShaderProps
                {
                    BaseMaterial = ResourcesHelper.BackgroundImageMaterial,
                    Size = sz,
                    Pos = ps,
                    RepeatX = (int) BackgroundRepeatX,
                    RepeatY = (int) BackgroundRepeatY,
                    Aspect = szPoint.x / szPoint.y,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(props.BaseMaterial);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

                result = Definition?.ModifyMaterial(Context, result, szPoint);

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


        private static (float, float, int) CalculateRepeat(float size, float totalSize, BackgroundRepeat repeat)
        {
            var rt = totalSize / size;

            var tile = size;
            var spacing = 0f;
            var count = Mathf.CeilToInt(rt);

            if (repeat == BackgroundRepeat.NoRepeat) count = 1;
            else if (repeat == BackgroundRepeat.Round)
            {
                count = Mathf.RoundToInt(rt);
                tile = totalSize / count;
            }
            else if (repeat == BackgroundRepeat.Space)
            {
                count = Mathf.FloorToInt(rt);
                spacing = (totalSize - tile * count) / (count - 1);
            }


            return (tile, spacing, count);
        }

        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            Rect pixelRect = RectTransformUtility.PixelAdjustRect(rectTransform, canvas);

            var width = pixelRect.width;
            var height = pixelRect.height;

            var size = new Vector2(width, height);


            var szPoint = CalculateSize(size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
            var psPoint = BackgroundPosition.GetPointValue(size - szPoint, 0, true);

            var (tileX, spacingX, countX) = CalculateRepeat(szPoint.x, width, BackgroundRepeatX);
            var (tileY, spacingY, countY) = CalculateRepeat(szPoint.y, height, BackgroundRepeatY);

            var ct0 = Vector2.zero;
            var ct1 = Vector2.up;
            var ct2 = Vector2.right;
            var ct3 = Vector2.one;

            for (int x = 0; x < countX; x++)
            {
                for (int y = 0; y < countY; y++)
                {
                    var tx = x * tileX;
                    var ty = y * tileY;
                    var spx = x * spacingX;
                    var spy = y * spacingY;
                    var dx = tx + spx;
                    var dy = ty + spy;
                    var d = new Vector2(dx, dy) + psPoint - size * rectTransform.pivot;
                    var t = new Vector2(tileX, tileY);

                    var c0 = d + ct0 * t;
                    var c1 = d + ct1 * t;
                    var c2 = d + ct2 * t;
                    var c3 = d + ct3 * t;
                    var ind = vh.currentVertCount;


                    var xs = c0.x < size.x;
                    var ys = c0.y < size.y;
                    var xe = c3.x > size.x;
                    var ye = c3.y > size.y;

                    for (int i = 0; i < 4; i++)
                    {
                        if (i == 0)
                        {

                            vh.AddVert(c0, color, ct0, Vector2.zero, GeoUtils.UINormal, GeoUtils.UITangent);
                            vh.AddVert(c1, color, ct1, Vector2.zero, GeoUtils.UINormal, GeoUtils.UITangent);
                            vh.AddVert(c2, color, ct2, Vector2.zero, GeoUtils.UINormal, GeoUtils.UITangent);
                            vh.AddVert(c3, color, ct3, Vector2.zero, GeoUtils.UINormal, GeoUtils.UITangent);

                            vh.AddTriangle(ind, ind + 1, ind + 2);
                            vh.AddTriangle(ind + 1, ind + 3, ind + 2);
                        }
                    }
                }
            }
        }
    }
}
