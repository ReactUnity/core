using System;
using TMPro;

namespace ReactUnity.Types
{
    public class FontReference : AssetReference<TMP_FontAsset>
    {
        static public new FontReference None = new FontReference(AssetReferenceType.None, null);

        public FontReference(AssetReferenceType type, object value) : base(type, value) { }

        protected override void Get(UnityUGUIContext context, AssetReferenceType realType, object realValue, Action<TMP_FontAsset> callback)
        {
            if (realType == AssetReferenceType.Procedural)
            {
                if (context.FontFamilies.TryGetValue((realValue as string).ToLowerInvariant(), out var found))
                {
                    found.Get(context, callback);
                }
                else
                {
                    callback(null);
                    IsCached = false;
                }
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }
    }
}
