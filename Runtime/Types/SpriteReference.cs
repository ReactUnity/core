using System;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Types
{
    public class SpriteReference : AssetReference<Sprite>
    {
        static public new SpriteReference None = new SpriteReference(AssetReferenceType.None, null);

        ImageReference ImageReference;

        public SpriteReference(AssetReferenceType type, object value) : base(type, value)
        {
            ImageReference = new ImageReference(type, value);
        }
        public SpriteReference(Url url) : base(url)
        {
            ImageReference = new ImageReference(url);
        }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<Sprite> callback)
        {
            base.Get(context, realType, realValue, (res) => {
                if (res) callback(res);
                else if (ImageReference != null)
                {
                    ImageReference.Get(context, (texture) => {
                        var sprite = FromTexture(texture);
                        callback(sprite);
                    });
                }
                else callback(null);
            });
        }

        public static Sprite FromTexture(Texture2D texture)
        {
            return !texture ? null : Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.one / 2);
        }

        public class Converter : BaseConverter<SpriteReference>
        {
            public Converter(bool allowWithoutUrl = false) : base(allowWithoutUrl) { }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is Texture2D s) return Constant(new SpriteReference(AssetReferenceType.Object, FromTexture(s)), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override object FromObject(AssetReferenceType type, object obj) => new SpriteReference(type, obj);
            protected override object FromUrl(Url url) => new SpriteReference(url);
        }
    }
}
