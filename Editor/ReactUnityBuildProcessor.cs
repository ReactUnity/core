#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using System.IO;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;

namespace ReactUnity.Editor
{
    public class ReactUnityBuildPreprocessor : IPostprocessBuildWithReport
    {
        public int callbackOrder => 0;

#if REACT_CLEARSCRIPT
        private static string ClearScriptDllPathTemplate = "Packages/com.reactunity.core/Plugins/ClearScript/ClearScriptV8.{0}";
#endif

        public void OnPostprocessBuild(BuildReport report)
        {
#if REACT_CLEARSCRIPT
            if (report.summary.platformGroup == BuildTargetGroup.Standalone)
            {
                var buildDir = Path.GetDirectoryName(report.summary.outputPath);

                string dllPath;
                var osx64 = "osx-x64.dylib";
                var win32 = "win-x86.dll";
                var win64 = "win-x64.dll";
                var linux64 = "linux-x64.dll";

                var fileBaseName = "ClearScriptV8.";

                switch (report.summary.platform)
                {
                    case BuildTarget.StandaloneOSX:
                        dllPath = string.Format(ClearScriptDllPathTemplate, osx64);
                        File.Copy(dllPath, Path.Combine(buildDir, fileBaseName + osx64), true);
                        break;
                    case BuildTarget.StandaloneWindows:
                    case BuildTarget.StandaloneWindows64:
                        dllPath = string.Format(ClearScriptDllPathTemplate, win32);
                        File.Copy(dllPath, Path.Combine(buildDir, fileBaseName + win32), true);

                        dllPath = string.Format(ClearScriptDllPathTemplate, win64);
                        File.Copy(dllPath, Path.Combine(buildDir, fileBaseName + win64), true);
                        break;
                    case BuildTarget.StandaloneLinux64:
                        dllPath = string.Format(ClearScriptDllPathTemplate, linux64);
                        File.Copy(dllPath, Path.Combine(buildDir, fileBaseName + linux64), true);
                        break;
                    default:
                        break;
                }
            }
#endif
        }
    }
}
