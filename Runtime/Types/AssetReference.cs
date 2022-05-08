using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
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

            var isHttpSource = false;

            if (realType == AssetReferenceType.Auto && context.Script.Engine.IsScriptObject(Value))
            {
                var props = context.Script.Engine.TraverseScriptObject(Value);

                while (props.MoveNext())
                {
                    var prop = props.Current;

                    if (prop.Key == "url")
                    {
                        isHttpSource = true;
                    }
                }
            }

            if (!isHttpSource)
            {
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

        public abstract class BaseConverter<T> : TypedStyleConverterBase<T> where T : AssetReference<AssetType>
        {
            public bool AllowWithoutUrl { get; }

            public BaseConverter(bool allowWithoutUrl = false)
            {
                AllowWithoutUrl = allowWithoutUrl;
            }

            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(FromObject(AssetReferenceType.None, null), out result);
                return base.HandleKeyword(keyword, out result);
            }

            protected abstract object FromObject(AssetReferenceType type, object obj);
            protected abstract object FromUrl(Url url);

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is Url u) return Constant(FromUrl(u), out result);
                if (value is AssetType t) return Constant(FromObject(AssetReferenceType.Object, t), out result);
                if (value is UnityEngine.Object o) return Constant(FromObject(AssetReferenceType.Object, o), out result);
                return Constant(FromObject(AssetReferenceType.Auto, value), out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (ComputedMapper.Create(out result, value, AllConverters.UrlConverter,
                    (u) => {
                        if (u is Url uu) return FromUrl(uu);
                        return null;
                    }))
                    return true;

                if (ParseFallback(value, out result)) return true;

                if (AllowWithoutUrl) return Constant(FromUrl(new Url(value)), out result);
                result = null;
                return false;
            }

            [MethodImpl(MethodImplOptions.AggressiveInlining)]
            protected virtual bool ParseFallback(string value, out IComputedValue result)
            {
                result = null;
                return false;
            }
        }
    }
}
