using System.IO;
using UnityEditor.AssetImporters;
using UnityEngine;

namespace ReactUnity.Editor
{
    [ScriptedImporter(1, new string[] { "css" })]
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
