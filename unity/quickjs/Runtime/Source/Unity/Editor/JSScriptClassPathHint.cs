#if !JSB_UNITYLESS
namespace QuickJS.Unity
{
    [System.Flags]
    public enum JSScriptClassType
    {
        None = 0,
        MonoBehaviour = 1,

        /// <summary>
        /// UnityEditor.Editor
        /// </summary>
        CustomEditor = 2,

        ScriptableObject = 4,
        EditorWindow = 8,
    }

    public struct JSScriptClassPathHint
    {
        public readonly string sourceFile;
        public readonly string modulePath;
        public readonly string className;
        public readonly string classPath;
        public readonly JSScriptClassType classType;

        public JSScriptClassPathHint(string sourceFile, string modulePath, string className, JSScriptClassType classType)
        {
            this.sourceFile = sourceFile;
            this.modulePath = modulePath;
            this.className = className;
            this.classPath = JSScriptRef.ToClassPath(modulePath, className);
            this.classType = classType;
        }

        public bool IsReferenced(JSScriptRef scriptRef)
        {
            return scriptRef.modulePath == modulePath && scriptRef.className == className;
        }

        public string ToClassPath()
        {
            return classPath;
        }
    }
}
#endif