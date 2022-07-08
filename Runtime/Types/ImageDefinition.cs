using System;
using System.Collections.Generic;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public abstract class ImageDefinition
    {
        public class ResolvedImage
        {
            public static ResolvedImage Default = new ResolvedImage();

            public Sprite Sprite;
            public Texture2D Texture => Sprite?.texture;
            public Vector2 IntrinsicSize = new Vector2(float.NaN, float.NaN);
            public float IntrinsicProportions = float.NaN;
        }

        public static ImageDefinition NoImage => UrlImageDefinition.None;

        public virtual bool SizeUpdatesGraphic => false;

        internal virtual void ResolveImage(ReactContext context, Vector2 size, Action<ResolvedImage> callback) => callback(ResolvedImage.Default);

        internal virtual void ModifyMaterial(ReactContext context, Material material, Vector2 size) { }

        public class Converter : TypedStyleConverterBase<ImageDefinition>
        {
            private static HashSet<string> GradientFunctions = new HashSet<string> {
                "linear-gradient",
                "repeating-linear-gradient",
                "radial-gradient",
                "repeating-radial-gradient",
                "conic-gradient",
                "repeating-conic-gradient",
            };

            private static StyleConverterBase SpriteConverter = AllConverters.SpriteReferenceConverter;

            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(NoImage, out result);
                return base.HandleKeyword(keyword, out result);
            }


            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, SpriteConverter,
                    (resolved) => {
                        if (resolved is SpriteReference irr) return new UrlImageDefinition(irr);
                        return null;
                    });
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (CssFunctions.TryCall(value, out var gd, GradientFunctions, this))
                {
                    return ComputedMapper.Create(out result, gd, new TypedStyleConverterBase<BaseGradient>(),
                        (rs) => {
                            if (rs is BaseGradient u) return new GradientImageDefinition(u);
                            return null;
                        });
                }

                return ComputedMapper.Create(out result, value, SpriteConverter,
                    (resolved) => {
                        if (resolved is SpriteReference irr) return new UrlImageDefinition(irr);
                        return null;
                    });
            }
        }
    }

    public class UrlImageDefinition : ImageDefinition
    {
        public static UrlImageDefinition None { get; } = new UrlImageDefinition(SpriteReference.None);
        public SpriteReference Reference { get; }

        public UrlImageDefinition(SpriteReference reference)
        {
            Reference = reference;
        }

        internal override void ResolveImage(ReactContext context, Vector2 size, Action<ResolvedImage> callback)
        {
            Reference.Get(context, sp => {
                callback(sp == null ? null : new ResolvedImage
                {
                    Sprite = sp,
                    IntrinsicSize = sp.rect.size,
                    IntrinsicProportions = sp.rect.size.x / sp.rect.size.y,
                });
            });
        }
    }

    public class GradientImageDefinition : ImageDefinition
    {
        public BaseGradient Gradient { get; }
        public override bool SizeUpdatesGraphic => Gradient.SizeUpdatesGraphic;

        public GradientImageDefinition(BaseGradient gradient)
        {
            Gradient = gradient;
        }

        internal override void ResolveImage(ReactContext context, Vector2 size, Action<ResolvedImage> callback)
        {
            var calc = Gradient.GetRamp(size);
            callback(new ResolvedImage
            {
                Sprite = SpriteReference.FromTexture(calc.Texture),
            });
        }

        internal override void ModifyMaterial(ReactContext context, Material material, Vector2 size) => Gradient.ModifyMaterial(context, material, size);
    }
}
