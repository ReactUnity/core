using System.IO;
using UnityEditor;
#if UNITY_2020_1_OR_NEWER
using UnityEditor.AssetImporters;
#else
using UnityEditor.Experimental.AssetImporters;
#endif
using UnityEngine;

namespace ReactUnity.Editor
{
    [ScriptedImporter(3, new string[] {
        "css",
#if UNITY_2021_2 || UNITY_2021_3 || UNITY_2021_4 || UNITY_2022_2_OR_NEWER
        "js",
#endif
    })]
    internal class ReactUnityTextAssetsImporter : ScriptedImporter
    {
        public override void OnImportAsset(AssetImportContext ctx)
        {
            var asset = new TextAsset(File.ReadAllText(ctx.assetPath));
            ctx.AddObjectToAsset("text", asset);
            ctx.SetMainObject(asset);
        }
    }

    [CustomEditor(typeof(ReactUnityTextAssetsImporter))]
    internal class ReactUnityTextAssetsImporterEditor : AssetImporterEditor
    {
        protected override bool needsApplyRevert => false;
        public override void OnInspectorGUI() { }
    }
}
