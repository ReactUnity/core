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
    }

    public class AssetReference<AssetType> : IDisposable where AssetType : class
    {
        public static AssetReference<AssetType> None = new AssetReference<AssetType>(AssetReferenceType.None, null);
        private static Regex FirstSlashRegex = new Regex("^/");
        private static Regex ExtensionRegex = new Regex(@"\.\w+$");
        private static Regex HttpRegex = new Regex("^https?://");
        private static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public AssetReferenceType type { get; private set; } = AssetReferenceType.None;
        public object value { get; private set; }

        protected bool IsCached;
        protected AssetType CachedValue;

        public AssetReference(AssetReferenceType type, object value)
        {
            this.type = type;
            this.value = value;
        }

        public void Get(UnityUGUIContext context, System.Action<AssetType> callback)
        {
            if (IsCached)
            {
                callback(CachedValue);
                return;
            }


            var realType = type;
            var realValue = value;
            if (realType == AssetReferenceType.Auto)
            {
                var path = context.ResolvePath(realValue as string);
                if (HttpRegex.IsMatch(path))
                {
                    realType = AssetReferenceType.Url;
                    realValue = path;
                }
                else
                {
                    realType = AssetReferenceType.Resource;
                    realValue = path;
                }
            }


            Get(context, realType, realValue, (val) =>
            {
                IsCached = true;
                CachedValue = val;
                callback(val);
            });
        }

        protected virtual void Get(UnityUGUIContext context, AssetReferenceType realType, object realValue, Action<AssetType> callback)
        {
            switch (realType)
            {
                case AssetReferenceType.Resource:
                    callback(Resources.Load(GetResourceUrl(realValue as string), typeof(AssetType)) as AssetType);
                    break;
                case AssetReferenceType.Global:
                    callback(context.Globals.GetValueOrDefault(realValue as string) as AssetType);
                    break;
                case AssetReferenceType.Object:
                    callback(realValue as AssetType);
                    break;
                case AssetReferenceType.File:
                case AssetReferenceType.Url:
                case AssetReferenceType.None:
                case AssetReferenceType.Procedural:
                case AssetReferenceType.Data:
                default:
                    callback(null);
                    break;
            }
        }

        public virtual void Dispose()
        {
        }

        private string GetResourceUrl(string fullUrl)
        {
            var splits = ResourcesRegex.Split(fullUrl);
            var url = splits[splits.Length - 1];

            return ExtensionRegex.Replace(url, "");
        }
    }
}
