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
    }

    public class AssetReference
    {
        public AssetReferenceType type { get; private set; } = AssetReferenceType.None;
        public JsValue value { get; private set; }


        public AssetReference(AssetReferenceType type, JsValue value)
        {
            this.type = type;
            this.value = value;
        }

        static public AssetReference None = new AssetReference(AssetReferenceType.None, null);
        static public AssetReference FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return None;

            if (obj.IsObject())
            {
                var ob = obj.AsObject();
                var v0 = ob.Get("type");
                var value = ob.Get("value");

                var type = (AssetReferenceType)v0.AsNumber();

                return new AssetReference(type, value);
            }
            else
            {
                return new AssetReference(AssetReferenceType.Procedural, obj);
            }
        }

        public T Get<T>(StringObjectDictionary NamedAssets) where T : class
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
                    return NamedAssets.GetValueOrDefault(value.AsString()) as T;
                case AssetReferenceType.Procedural:
                    return GetProcedural<T>();
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
    }
}
