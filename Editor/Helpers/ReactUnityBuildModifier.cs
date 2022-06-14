#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
#define REACT_QUICKJS
#endif

using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;

namespace ReactUnity.Editor
{
    [InitializeOnLoad]
    public class ReactUnityBuildModifier : IPostprocessBuildWithReport
    {
        public int callbackOrder => 0;

#if REACT_CLEARSCRIPT && REACT_CLEARSCRIPT_ICU
        private static string ClearScriptDllPathTemplate = "Packages/com.reactunity.core/Plugins/ClearScript/ClearScriptV8.{0}";
#endif

        static ReactUnityBuildModifier()
        {
#if REACT_QUICKJS && !(JSB_UNITYLESS && JSB_RUNTIME_REFLECT_BINDING)
            BuildPlayerWindow.RegisterGetBuildPlayerOptionsHandler(ModifyBuildOptions);
#endif
        }

        private static BuildPlayerOptions ModifyBuildOptions(BuildPlayerOptions options)
        {
            options = BuildPlayerWindow.DefaultBuildMethods.GetBuildPlayerOptions(options);
#if REACT_QUICKJS

#if !UNITY_2020_1_OR_NEWER

#if !(JSB_UNITYLESS && JSB_RUNTIME_REFLECT_BINDING)
            throw new BuildFailedException("JSB_UNITYLESS and JSB_RUNTIME_REFLECT_BINDING must be defined for QuickJS builds");
#endif

#else
            var newDefines = new System.Collections.Generic.List<string>(options.extraScriptingDefines ?? new string[0]);
            newDefines.Add("JSB_UNITYLESS");
            newDefines.Add("JSB_RUNTIME_REFLECT_BINDING");

            options.extraScriptingDefines = newDefines.ToArray();
#endif

#endif

#pragma warning disable CS0162 // Unreachable code detected
            return options;
#pragma warning restore CS0162 // Unreachable code detected
        }

        public void OnPostprocessBuild(BuildReport report)
        {
#if REACT_CLEARSCRIPT && REACT_CLEARSCRIPT_ICU
            if (report.summary.platformGroup == UnityEditor.BuildTargetGroup.Standalone)
            {
                var buildDir = System.IO.Path.GetDirectoryName(report.summary.outputPath);

                string filePath;
                var icuData = "ICU.dat";

                var fileBaseName = "ClearScriptV8.";

                switch (report.summary.platform)
                {
                    case UnityEditor.BuildTarget.StandaloneOSX:
                    case UnityEditor.BuildTarget.StandaloneWindows:
                    case UnityEditor.BuildTarget.StandaloneWindows64:
                    case UnityEditor.BuildTarget.StandaloneLinux64:
                        filePath = string.Format(ClearScriptDllPathTemplate, icuData);
                        System.IO.File.Copy(filePath, System.IO.Path.Combine(buildDir, fileBaseName + icuData), true);
                        break;
                    default:
                        break;
                }

                if(report.summary.platform == UnityEditor.BuildTarget.StandaloneOSX)
                {
                    UnityEngine.Debug.LogWarning("For MacOS builds, ClearScriptV8.ICU.dat file must be manually copied to Contents folder.");
                }
            }
#endif
        }
    }
}
