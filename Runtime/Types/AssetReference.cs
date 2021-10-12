using System;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.Types
{
    public enum AssetReferenceType
    {
        None = 0,
        Auto = 1,
        Object = 2,
        Resource = 3,
        File = 4,
        Url = 5,
        Global = 6,
        Procedural = 7,
        Data = 8,
        Path = 9,
    }

    public class AssetReference<AssetType> : IDisposable where AssetType : class
    {
        public static AssetReference<AssetType> None = new AssetReference<AssetType>(AssetReferenceType.None, null);
        private static Regex HttpRegex = new Regex("^https?://");
        private static Regex FileRegex = new Regex("^file:");

        public AssetReferenceType Type { get; private set; } = AssetReferenceType.None;
        public object Value { get; private set; }

        protected bool IsCached;
        protected AssetType CachedValue;

        public AssetReference(AssetReferenceType type, object value)
        {
            Type = type;
            if (type == AssetReferenceType.Data)
            {
                try
                {
                    if (value is byte[] b) Value = b;
                    else Value = Convert.FromBase64String(value?.ToString());
                }
                catch { }
            }
            else
            {
                Value = value;
            }
        }

        public AssetReference(Url url)
        {
            Value = url.NormalizedUrl;
            switch (url.Protocol)
            {
                case UrlProtocol.Contextual:
                    Type = AssetReferenceType.Auto;
                    break;
                case UrlProtocol.Web:
                    Type = AssetReferenceType.Url;
                    break;
                case UrlProtocol.Resource:
                    Type = AssetReferenceType.Resource;
                    break;
                case UrlProtocol.File:
                    Type = AssetReferenceType.File;
                    break;
                case UrlProtocol.Data:
                    Type = AssetReferenceType.Data;
                    Value = url.GetData();
                    break;
                case UrlProtocol.Global:
                    Type = AssetReferenceType.Global;
                    break;
                case UrlProtocol.None:
                default:
                    Type = AssetReferenceType.None;
                    Value = null;
                    break;
            }
        }

        public void Get(ReactContext context, System.Action<AssetType> callback)
        {
            if (IsCached)
            {
                callback(CachedValue);
                return;
            }


            var realType = Type;
            var realValue = Value;
            if (realType == AssetReferenceType.Auto || realType == AssetReferenceType.Path)
            {
                var path = context.ResolvePath(realValue as string);
                if (path == null) realType = AssetReferenceType.None;
                else if (HttpRegex.IsMatch(path))
                {
                    realType = AssetReferenceType.Url;
                    realValue = path;
                }
                else if (FileRegex.IsMatch(path))
                {
                    realType = AssetReferenceType.File;
                    realValue = path;
                }
                else
                {
                    realType = context.Source.Type == ScriptSourceType.File ? AssetReferenceType.File : AssetReferenceType.Resource;
                    realValue = path;
                }
            }


            Get(context, realType, realValue, (val) => {
                IsCached = true;
                CachedValue = val;
                callback(val);
            });
        }

        protected virtual T Get<T>(ReactContext context, AssetReferenceType realType, object realValue) where T : class
        {

            switch (realType)
            {
                case AssetReferenceType.Resource:
                    return Resources.Load(realValue as string, typeof(T)) as T;
                case AssetReferenceType.Global:
                    if (context.Globals.TryGetValue(realValue as string, out var res)) return res as T;
                    else return default;
                case AssetReferenceType.Object:
                    return realValue as T;
                case AssetReferenceType.File:
                case AssetReferenceType.Url:
                case AssetReferenceType.None:
                case AssetReferenceType.Procedural:
                case AssetReferenceType.Data:
                default:
                    return null;
            }
        }

        protected virtual void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<AssetType> callback)
        {
            var res = Get<AssetType>(context, realType, realValue);
            callback(res);
        }

        public virtual void Dispose()
        {
        }
    }
}
