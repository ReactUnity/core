using System;
using System.Collections;
using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    public abstract class ImageDefinition
    {
        public static ImageDefinition None { get; } = UrlImageDefinition.None;

        internal virtual void GetTexture(ReactContext context, Action<Texture2D> callback) => callback(null);
        internal virtual void GetSprite(ReactContext context, Action<Sprite> callback)
        {
            GetTexture(context, texture => {
                var sprite = texture == null ? null :
                    Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);
                callback(sprite);
            });
        }

        internal virtual Material GetMaterial(ReactContext context) => null;

        public class Converter : IStyleParser, IStyleConverter
        {
            private static HashSet<string> AllowedFunctions = new HashSet<string> {
                "linear-gradient",
                "repeating-linear-gradient",
                "radial-gradient",
                "repeating-radial-gradient",
                "conic-gradient",
                "repeating-conic-gradient",
            };
            private static IStyleConverter ImageConverter = AllConverters.ImageReferenceConverter;

            public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;

            public object Convert(object value)
            {
                if (value == null || Equals(value, CssKeyword.None)) return None;

                if (value is string s)
                {
                    var srs = FromString(value?.ToString());

                    if (!Equals(srs, CssKeyword.Invalid)) return srs;
                }

                var ir = ImageConverter.Convert(value);
                if (ir is ImageReference irr) return new UrlImageDefinition(irr);

                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (CssFunctions.TryCall(value, out var result, AllowedFunctions))
                {
                    if (result is BaseGradient u) return new GradientImageDefinition(u);
                }
                return CssKeyword.Invalid;
            }
        }
    }

    public class UrlImageDefinition : ImageDefinition
    {
        public static new UrlImageDefinition None { get; } = new UrlImageDefinition(ImageReference.None);
        public ImageReference Reference { get; }

        public UrlImageDefinition(ImageReference reference)
        {
            Reference = reference;
        }

        internal override void GetTexture(ReactContext context, Action<Texture2D> callback)
        {
            Reference.Get(context, callback);
        }
    }

    public class GradientImageDefinition : ImageDefinition
    {
        public BaseGradient Gradient { get; }

        public GradientImageDefinition(BaseGradient gradient)
        {
            Gradient = gradient;
        }

        internal override void GetTexture(ReactContext context, Action<Texture2D> callback)
        {
            var calc = Gradient.GetCalculatedGradient(100);

            callback(calc.Ramp);
        }
    }
}
