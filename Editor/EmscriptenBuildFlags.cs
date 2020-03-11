using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEditor;

namespace ReactUnity.Editor
{
    public class EmscriptenBuildFlags : IPreprocessBuildWithReport
    {
        public int callbackOrder => 0;

        public void OnPreprocessBuild(BuildReport report)
        {
            PlayerSettings.WebGL.emscriptenArgs = "-s \"BINARYEN_TRAP_MODE='clamp'\"";
        }
    }
}
