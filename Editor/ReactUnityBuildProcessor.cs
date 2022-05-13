#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using UnityEditor.Build;
using UnityEditor.Build.Reporting;

namespace ReactUnity.Editor
{
    public class ReactUnityBuildPreprocessor : IPostprocessBuildWithReport
    {
        public int callbackOrder => 0;

#if REACT_CLEARSCRIPT && REACT_CLEARSCRIPT_ICU
        private static string ClearScriptDllPathTemplate = "Packages/com.reactunity.core/Plugins/ClearScript/ClearScriptV8.{0}";
#endif

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
