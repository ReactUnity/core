#if !JSB_UNITYLESS

namespace QuickJS.Unity
{
    // public class TypeScriptPostProcessor : AssetPostprocessor
    // {
    //     private static bool IsScriptSourceFile(string filename)
    //     {
    //         return filename.EndsWith(".ts") || filename.EndsWith(".js") || filename.EndsWith(".js.txt");
    //     }

    //     private static bool CheckAssets(string outDir, string[] assetPaths)
    //     {
    //         foreach (var assetPath in assetPaths)
    //         {
    //             if (outDir == null || !assetPath.StartsWith(outDir, StringComparison.OrdinalIgnoreCase)) // skip output files
    //             {
    //                 if (IsScriptSourceFile(assetPath))
    //                 {
    //                     // Debug.Log(assetPath);
    //                     return true;
    //                 }
    //             }
    //         }
    //         return false;
    //     }

    //     private static void OnPostprocessAllAssets(
    //         string[] importedAssets,
    //         string[] deletedAssets,
    //         string[] movedAssets,
    //         string[] movedFromAssetPaths)
    //     {
    //         // if (EditorApplication.isPlaying || EditorApplication.isPaused)
    //         // {
    //         //     return;
    //         // }
    //         // if (!File.Exists("tsconfig.json"))
    //         // {
    //         //     // no typescript context
    //         //     return;
    //         // }
    //         // string outDir = null;
    //         // try
    //         // {
    //         //     var text = NormalizeJson(File.ReadAllText("tsconfig.json"));
    //         //     var tsconfig = JsonUtility.FromJson<TSConfig>(text);
    //         //     outDir = tsconfig.compilerOptions.outDir;
    //         // }
    //         // catch (Exception exception) { Debug.LogWarning(exception); }
    //         // if (CheckAssets(outDir, importedAssets) ||
    //         //     CheckAssets(outDir, deletedAssets) ||
    //         //     CheckAssets(outDir, movedAssets) ||
    //         //     CheckAssets(outDir, movedFromAssetPaths))
    //         // {
    //         //     UnityHelper.CompileScripts();
    //         // }
    //     }
    // }
}
#endif
