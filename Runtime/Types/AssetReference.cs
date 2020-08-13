using Jint;
using Jint.Native;
using ReactUnity.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public enum AssetReferenceType
    {
        None = 0,
        File = 1,
        Url = 2,
        Resource = 3,
        NamedAsset = 4,
        Procedural = 5,
        Object = 6,
    }

    public class AssetReference<AssetType> where AssetType : class
    {
        static public AssetReference<object> None = new AssetReference<object>(AssetReferenceType.None, null);

        public AssetReferenceType type { get; private set; } = AssetReferenceType.None;
        public JsValue value { get; private set; }

        private AssetType CachedValue;

        public AssetReference(AssetReferenceType type, JsValue value)
        {
            this.type = type;
            this.value = value;
        }

        static public AssetReference<object> FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return None;

            if (obj.IsObject())
            {
                var ob = obj.AsObject();
                var v0 = ob.Get("type");
                var value = ob.Get("value");

                var type = (AssetReferenceType)v0.AsNumber();

                return new AssetReference<object>(type, value);
            }
            else
            {
                var ob = obj.ToObject();

                if (ob is Object) return new AssetReference<object>(AssetReferenceType.Object, obj);

                return new AssetReference<object>(AssetReferenceType.Procedural, obj);
            }
        }

        public AssetType Get(UnityUGUIContext context)
        {
            return CachedValue ?? (CachedValue = Get<AssetType>(context));
        }

        public T Get<T>(UnityUGUIContext context) where T : class
        {
            switch (type)
            {
                case AssetReferenceType.File:
                    return GetFromFile<T>();
                case AssetReferenceType.Url:
                    return GetFromUrl<T>();
                case AssetReferenceType.Resource:
                    return Resources.Load(value.AsString()) as T;
                case AssetReferenceType.NamedAsset:
                    return context.NamedAssets.GetValueOrDefault(value.AsString()) as T;
                case AssetReferenceType.Procedural:
                    return GetProcedural<T>();
                case AssetReferenceType.Object:
                    return value.ToObject() as T;
                case AssetReferenceType.None:
                default:
                    return null;
            }
        }

        public T GetFromUrl<T>() where T : class
        {
            return null;
        }

        public T GetFromFile<T>() where T : class
        {
            return null;
        }

        public T GetProcedural<T>() where T : class
        {
            if (typeof(T) == typeof(string))
            {
                return value.ToString() as T;
            }

            if (typeof(T) == typeof(TextAsset))
            {
                return new TextAsset(value.ToString()) as T;
            }

            if (typeof(T) == typeof(Texture2D))
            {
                var texture = new Texture2D(1, 1);

                var color = ColorConverter.FromJsValue(value);

                if (color.HasValue)
                {
                    texture.SetPixel(0, 0, color.Value);
                    texture.Apply();
                }
                return texture as T;
            }

            return default(T);
        }

        public bool IsNone()
        {
            return type == AssetReferenceType.None;
        }

        static public Sprite GetSpriteFromObject(object source, UnityUGUIContext Context)
        {
            switch (source)
            {
                case Sprite s:
                    return s;
                case Texture2D s:
                    return Sprite.Create(s, new Rect(0, 0, s.width, s.height), Vector2.one / 2);
                case AssetReference<Sprite> a:
                    return a.Get(Context);
                case AssetReference<object> a:
                    return a.Get<Sprite>(Context);
                case string s:
                    return new AssetReference<Sprite>(AssetReferenceType.Procedural, s).Get(Context);
                default:
                    break;
            }
            return null;
        }
    }
}
