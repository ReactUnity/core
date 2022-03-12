using System.IO;
#if UNITY_2020_1_OR_NEWER
using UnityEditor.AssetImporters;
#else
using UnityEditor.Experimental.AssetImporters;
#endif
using UnityEngine;

namespace ReactUnity.Editor
{
    [ScriptedImporter(1, new string[] {
        "css",
#if UNITY_2021_2_OR_NEWER
        "js",
#endif
    })]
    class ReactUnityTextAssetsImporter : ScriptedImporter
    {
        public override void OnImportAsset(AssetImportContext ctx)
        {
            var asset = new TextAsset(File.ReadAllText(ctx.assetPath));
            ctx.AddObjectToAsset("text", asset);
            ctx.SetMainObject(asset);
        }
    }
}
