using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    public class BackgroundImage : Image
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

        public Vector2 Size;

        public ImageDefinition definition;
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
        private BackgroundBlendMode BlendMode;

        public BackgroundSize backgroundSize = BackgroundSize.Auto;
        public BackgroundSize BackgroundSize
        {
            get => backgroundSize;
            set
            {
                backgroundSize = value;
                RefreshSize();
            }
        }

        public YogaValue2 BackgroundPosition = YogaValue2.Zero;
        public BackgroundRepeat BackgroundRepeatX;
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
            raycastTarget = false;
            material = GetDefaultMaterial();
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public virtual Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.BackgroundImageMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material baseMat = base.materialForRendering;

                var szPoint = CalculateSize(Size, Resolved?.IntrinsicSize ?? Vector2.zero, Resolved?.IntrinsicProportions ?? 1, backgroundSize);
                var sz = new Vector2(szPoint.x / Size.x, szPoint.y / Size.y);
                var psPoint = BackgroundPosition.GetPointValue(Size - szPoint, 0, false);
                var ps = new Vector2(psPoint.x / Size.x, psPoint.y / Size.y);

                var props = new ShaderProps
                {
                    BaseMaterial = baseMat,
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
                    result = Definition?.ModifyMaterial(Context, result, szPoint);
                    CachedMaterials[props] = result;
                }

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
            var rect = ((RectTransform) transform).rect;
            Size = new Vector2(rect.width, rect.height);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);

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
    }
}
