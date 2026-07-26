using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace QuickJS.Binding
{
    /// <summary>
    /// [experimental] do StaticBind but in the memory with the CodeDomProvider for csharp. 
    /// </summary>
    public class InMemoryCompilationBindingCallback : IBindingCallback, ICodeGenCallback
    {
        private ScriptRuntime _runtime;
        private BindingManager _bindingManager;

        private string _namespace = Values.NamespaceOfStaticBinder;
        private string _className;
        private HashSet<Assembly> _referencedAssemblies = new HashSet<Assembly>();
        private List<Assembly> _generatedAssemblies = new List<Assembly>();
        private string _compilerOptions;

        public static List<string> GetDefinedSymbols()
        {
            var defines = new List<string>();

#if UNITY_EDITOR // #define directive to call Unity Editor scripts from your game code.
            defines.Add("UNITY_EDITOR");
#endif
#if UNITY_EDITOR_WIN // #define directive for Editor code on Windows.
            defines.Add("UNITY_EDITOR_WIN");
#endif
#if UNITY_EDITOR_OSX // #define directive for Editor code on Mac OS X.
            defines.Add("UNITY_EDITOR_OSX");
#endif
#if UNITY_EDITOR_LINUX // #define directive for Editor code on Linux.
            defines.Add("UNITY_EDITOR_LINUX");
#endif
#if UNITY_STANDALONE_OSX // #define directive to compile or execute code specifically for Mac OS X (including Universal, PPC and Intel architectures).
            defines.Add("UNITY_STANDALONE_OSX");
#endif
#if UNITY_STANDALONE_WIN // #define directive for compiling/executing code specifically for Windows standalone applications.
            defines.Add("UNITY_STANDALONE_WIN");
#endif
#if UNITY_STANDALONE_LINUX // #define directive for compiling/executing code specifically for Linux standalone applications.
            defines.Add("UNITY_STANDALONE_LINUX");
#endif
#if UNITY_STANDALONE // #define directive for compiling/executing code for any standalone platform (Mac OS X, Windows or Linux).
            defines.Add("UNITY_STANDALONE");
#endif
#if UNITY_WII // #define directive for compiling/executing code for the Wii console.
            defines.Add("UNITY_WII");
#endif
#if UNITY_IOS // #define directive for compiling/executing code for the iOS platform.
            defines.Add("UNITY_IOS");
#endif
#if UNITY_IPHONE // 	Deprecated. Use UNITY_IOS instead.
            defines.Add("UNITY_IPHONE");
#endif
#if UNITY_ANDROID // #define directive for the Android platform.
            defines.Add("UNITY_ANDROID");
#endif
#if UNITY_PS4 // #define directive for running PlayStation 4 code.
            defines.Add("UNITY_PS4");
#endif
#if UNITY_XBOXONE // #define directive for executing Xbox One code.
            defines.Add("UNITY_XBOXONE");
#endif
#if UNITY_LUMIN // #define directive for the Magic Leap OS platform. You can also use PLATFORM_LUMIN.
            defines.Add("UNITY_LUMIN");
#endif
#if UNITY_TIZEN // #define directive for the Tizen platform.
            defines.Add("UNITY_TIZEN");
#endif
#if UNITY_TVOS // #define directive for the Apple TV platform.
            defines.Add("UNITY_TVOS");
#endif
#if UNITY_WSA // #define directive for Universal Windows Platform
            defines.Add("UNITY_WSA");
#endif
#if UNITY_WSA_10_0 // #define directive for Universal Windows Platform. Additionally WINDOWS_UWP is defined when compiling C# files against .NET Core.
            defines.Add("UNITY_WSA_10_0");
#endif
#if UNITY_WINRT // 	Same as UNITY_WSA.
            defines.Add("UNITY_WINRT");
#endif
#if UNITY_WINRT_10_0 // 	Equivalent to UNITY_WSA_10_0
            defines.Add("UNITY_WINRT_10_0");
#endif
#if UNITY_WEBGL // #define directive for WebGL
            defines.Add("UNITY_WEBGL");
#endif
#if UNITY_FACEBOOK // #define directive for the Facebook platform (WebGL or Windows standalone).
            defines.Add("UNITY_FACEBOOK");
#endif
#if UNITY_ANALYTICS // #define directive for calling Unity Analytics
            defines.Add("UNITY_ANALYTICS");
#endif
#if UNITY_ASSERTIONS // #define directive for assertions control process.
            defines.Add("UNITY_ASSERTIONS");
#endif
#if UNITY_64 // #define directive for 64-bit platforms.
            defines.Add("UNITY_64");
#endif
#if UNITY_SERVER
            defines.Add("UNITY_SERVER");
#endif
            return defines;
        }

#if !JSB_UNITYLESS && UNITY_EDITOR
        public static UnityEditor.BuildTargetGroup GetBuildTargetGroup()
        {
            var buildTarget = UnityEditor.EditorUserBuildSettings.activeBuildTarget;
            switch (buildTarget)
            {
                case UnityEditor.BuildTarget.Android: return UnityEditor.BuildTargetGroup.Android;
                case UnityEditor.BuildTarget.iOS: return UnityEditor.BuildTargetGroup.iOS;
                case UnityEditor.BuildTarget.WSAPlayer: return UnityEditor.BuildTargetGroup.WSA;
#if !UNITY_2019_2_OR_NEWER
                case UnityEditor.BuildTarget.StandaloneLinux:
                case UnityEditor.BuildTarget.StandaloneLinuxUniversal: 
#endif
                case UnityEditor.BuildTarget.StandaloneLinux64:
                case UnityEditor.BuildTarget.StandaloneOSX:
                case UnityEditor.BuildTarget.StandaloneWindows:
                case UnityEditor.BuildTarget.StandaloneWindows64: return UnityEditor.BuildTargetGroup.Standalone;
                case UnityEditor.BuildTarget.Switch: return UnityEditor.BuildTargetGroup.Switch;
                case UnityEditor.BuildTarget.PS4: return UnityEditor.BuildTargetGroup.PS4;
                case UnityEditor.BuildTarget.XboxOne: return UnityEditor.BuildTargetGroup.XboxOne;
            }
            throw new NotImplementedException();
        }
#endif

        public InMemoryCompilationBindingCallback(ScriptRuntime runtime)
        {
            _runtime = runtime;
            _className = "_GeneratedClass_" + Guid.NewGuid().ToString().Replace("-", "");
            var symbolList = new List<string>();
            var defines = "";
            var compilerOptions = "-unsafe";

#if !JSB_UNITYLESS
            symbolList.AddRange(GetDefinedSymbols());
#endif

            defines += string.Join(";", symbolList);

#if !JSB_UNITYLESS && UNITY_EDITOR
            var customDefinedSymbols = UnityEditor.PlayerSettings.GetScriptingDefineSymbolsForGroup(GetBuildTargetGroup());
            if (!string.IsNullOrEmpty(customDefinedSymbols))
            {
                defines += ";" + customDefinedSymbols;
            }
#endif
            if (!string.IsNullOrEmpty(defines))
            {
                compilerOptions += " -defines:" + defines;
            }
            _compilerOptions = compilerOptions;
        }

        public void OnBindingBegin(BindingManager bindingManager)
        {
            _bindingManager = bindingManager;
            foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
            {
                if (!assembly.IsDynamic && !string.IsNullOrEmpty(assembly.Location))
                {
                    _referencedAssemblies.Add(assembly);
                }
            }
        }

        public void OnBindingEnd()
        {
        }

        public void BeginStaticModule(string moduleName, int capacity)
        {
        }

        public void AddTypeReference(string moduleName, TypeBindingInfo typeBindingInfo)
        {
        }

        public void EndStaticModule(string moduleName)
        {
        }

        public void AddDelegate(DelegateBridgeBindingInfo bindingInfo)
        {
        }

        public void OnCodeGenBegin(BindingManager bindingManager)
        {
        }

        public void OnCodeGenEnd()
        {
        }

        public void BindRawTypes(ICollection<RawTypeBindingInfo> rawTypes)
        {
        }

        public bool OnTypeGenerating(TypeBindingInfo typeBindingInfo, int current, int total)
        {
            return false;
        }

        public void OnGenerateFinish()
        {
        }

        //TODO [IMPROVMENT] delay the compilation util using the type at runtime
        public void OnSourceCodeEmitted(CodeGenerator cg, string codeOutDir, string codeName, SourceCodeType type, TextGenerator textGenerator)
        {
            if (type == SourceCodeType.CSharp)
            {
                if (codeName == CodeGenerator.NameOfBindingList)
                {
                    var list = new List<Assembly>(_generatedAssemblies);
                    list.AddRange(_referencedAssemblies);
                    var assembly = CompileSource(textGenerator.Submit(), codeName, list);
                    var Class = assembly.GetType(_namespace + "." + _className);
                    var BindAll = Class?.GetMethod(Values.MethodNameOfStaticBinder);

                    BindAll.Invoke(null, new object[] { _runtime });
                }
                else
                {
                    _generatedAssemblies.Add(CompileSource(textGenerator.Submit(), codeName, _referencedAssemblies));
                }
            }
        }

        public void OnGenerateBindingList(CodeGenerator cg, IEnumerable<IGrouping<string, TypeBindingInfo>> modules, ICollection<RawTypeBindingInfo> rawTypes)
        {
            cg.GenerateBindingList(_namespace, _className, modules, false, rawTypes);
        }

        private Assembly CompileSource(string source, string assemblyName, IEnumerable<Assembly> referencedAssemblies)
        {
            var compiledAssembly = CodeGenUtils.Compile(source, referencedAssemblies, _compilerOptions, _bindingManager.GetBindingLogger());
            if (compiledAssembly == null)
            {
                throw new InvalidOperationException($"failed to compile {assemblyName} in memory");
            }
            return compiledAssembly;
        }
    }
}
