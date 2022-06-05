#if !JSB_UNITYLESS
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;
    using System.Reflection;
    using QuickJS.Binding;

    [InitializeOnLoad]
    public static class UnityHelper
    {
        public static Color RowColor = new Color(0.5f, 0.5f, 0.5f, 0.1f);
        public static Color SelectRowColor = new Color(44f / 255f, 93f / 255f, 135f / 255f);

        private static Dictionary<string, Texture> _iconCache = new Dictionary<string, Texture>();

        public static Texture GetIcon(string name)
        {
            Texture icon;
            if (!_iconCache.TryGetValue(name, out icon))
            {
                icon = _iconCache[name] = LoadPackageAsset<Texture>($"Editor/Icons/{name}.png");
            }
            return icon;
        }

        public static bool IsApplicationActive()
        {
            return UnityEditorInternal.InternalEditorUtility.isApplicationActive && !EditorApplication.isCompiling;
        }

        #region All Menu Items
        [MenuItem("JS Bridge/Generate Bindings And Type Definition")]
        public static void GenerateBindingsAndTypeDefinition()
        {
            var bm = new BindingManager(PrefsLoader.CurrentPrefs, new BindingManager.Args
            {
                codeGenCallback = new DefaultCodeGenCallback(),
                bindingLogger = new DefaultBindingLogger(),
                useLogWriter = true,
                utils = new UnityBindingUtils(),
            });
            bm.Collect();
            bm.Generate(TypeBindingFlags.Default);
            bm.Cleanup();
            bm.Report();
            AssetDatabase.Refresh();
        }

        [MenuItem("JS Bridge/Generate Type Definition")]
        public static void GenerateTypeDefinition()
        {
            var bm = new BindingManager(PrefsLoader.CurrentPrefs, new BindingManager.Args
            {
                codeGenCallback = new DefaultCodeGenCallback(),
                bindingLogger = new DefaultBindingLogger(),
                useLogWriter = true,
                utils = new UnityBindingUtils(),
            });
            bm.Collect();
            bm.Generate(TypeBindingFlags.TypeDefinition);
            bm.Cleanup();
            bm.Report();
            AssetDatabase.Refresh();
        }

        public static T LoadPackageAsset<T>(string assetPath)
        where T : Object
        {
            try
            {
                var path = AssetDatabase.GetAssetPath(GetMonoScript(typeof(JSBehaviour)));
                if (path != null)
                {
                    var evaluatedPath = Path.Combine(Path.GetDirectoryName(path), "../../", assetPath).Replace("\\", "/");
                    var extractedPath = Utils.PathUtils.ExtractPath(evaluatedPath, '/');
                    if (File.Exists(extractedPath))
                    {
                        return LoadAssetAtPath<T>(extractedPath); // for upm-shipping style
                    }
                }
            }
            catch (Exception)
            {
            }

            return LoadAssetAtPath<T>("Assets/jsb/" + assetPath) // for old-school style
               ?? LoadAssetAtPath<T>("Packages/cc.starlessnight.unity-jsb/" + assetPath) // for upm-dev style
            ;
        }

        public static T LoadAssetAtPath<T>(string assetPath)
        where T : Object
        {
            return AssetDatabase.LoadAssetAtPath(assetPath, typeof(T)) as T;
        }

        /// <summary>
        /// Get MonoScript by type
        /// </summary>
        public static MonoScript GetMonoScript(Type type)
        {
            var name = type.Name;
            var assetGuids = AssetDatabase.FindAssets($"t:Script {name}");
            foreach (var assetGuid in assetGuids)
            {
                var assetPath = AssetDatabase.GUIDToAssetPath(assetGuid);
                var asset = AssetDatabase.LoadAssetAtPath<MonoScript>(assetPath);
                if (asset && asset.GetClass() == type)
                {
                    return asset;
                }
            }

            return null;
        }

        public static void SetDefineSymbol(string defineItem, bool isAdding)
        {
            var buildTargetGroup = EditorUserBuildSettings.selectedBuildTargetGroup;
            var defines = PlayerSettings.GetScriptingDefineSymbolsForGroup(buildTargetGroup).Split(';').ToList();
            if (isAdding)
            {
                if (!defines.Contains(defineItem))
                {
                    defines.Add(defineItem);
                    PlayerSettings.SetScriptingDefineSymbolsForGroup(buildTargetGroup, string.Join(";", defines));
                }
            }
            else
            {
                if (defines.Remove(defineItem))
                {
                    PlayerSettings.SetScriptingDefineSymbolsForGroup(buildTargetGroup, string.Join(";", defines));
                }
            }
        }

        public static bool IsReflectBindingSupported()
        {
            return PrefsLoader.CurrentPrefs.preferredBindingMethod == "Reflect Bind";
        }

        public static void Time(string name, Action action)
        {
            var stopWatch = new System.Diagnostics.Stopwatch();
            stopWatch.Start();
            try
            {
                action();
                stopWatch.Stop();
                Debug.LogFormat("Finished executing {0} in {1}ms", name, stopWatch.ElapsedMilliseconds);
            }
            catch (Exception exception)
            {
                stopWatch.Stop();
                Debug.LogFormat("Finished executing {0} in {1}ms with error: {2}", name, stopWatch.ElapsedMilliseconds, exception.Message);
                throw;
            }
        }

        public static void InvokeReflectBinding(ScriptRuntime runtime)
        {
            Time("InvokeReflectBinding", () =>
            {
                var bm = new BindingManager(PrefsLoader.CurrentPrefs, new BindingManager.Args
                {
                    bindingCallback = new ReflectBindingCallback(runtime),
                    utils = new UnityBindingUtils(),
                    bindingLogger = new DefaultBindingLogger(Utils.LogLevel.Error),
                });
                bm.Collect();
                bm.Generate(TypeBindingFlags.None);
                bm.Report();
            });
        }

        public static bool IsInMemoryBindingSupported()
        {
            return PrefsLoader.CurrentPrefs.preferredBindingMethod == "In-Memory Bind";
        }

        public static void InvokeInMemoryBinding(ScriptRuntime runtime)
        {
            Time("InvokeInMemoryBinding", () =>
            {
                var callback = new InMemoryCompilationBindingCallback(runtime);
                var bm = new BindingManager(PrefsLoader.CurrentPrefs, new BindingManager.Args
                {
                    bindingCallback = callback,
                    codeGenCallback = callback,
                    utils = new UnityBindingUtils(),
                });
                bm.Collect();
                bm.Generate(TypeBindingFlags.BindingCode | TypeBindingFlags.BuildTargetPlatformOnly);
                bm.Report();
            });
        }

        // [MenuItem("JS Bridge/Compile TypeScript")]
        public static void CompileScripts()
        {
            Debug.Log("compiling typescript source...");
            EditorApplication.delayCall += () =>
            {
                EditorApplication.delayCall += () =>
                {
#if UNITY_EDITOR_WIN
                    string command = "tsc.cmd";
#else
                    string command = "tsc";
#endif
                    var exitCode = UnityShellHelper.Run(command, "", 30);
                    Debug.Log($"{command}: {exitCode}");
                };
            };
        }

        [MenuItem("JS Bridge/Clear")]
        public static void ClearBindings()
        {
            var prefs = PrefsLoader.CurrentPrefs;
            var kv = new Dictionary<string, List<string>>();

            if (prefs.cleanupDir != null)
            {
                prefs.cleanupDir.ForEach(dir => kv[ReplacePathVars(dir)] = null);
            }
            kv[ReplacePathVars(prefs.outDir)] = null;
            kv[ReplacePathVars(prefs.typescriptDir)] = null;
            BindingManager.Cleanup(kv, null);
            AssetDatabase.Refresh();
        }

        [MenuItem("JS Bridge/Prefs ...", false, 5001)]
        public static void OpenPrefsEditor()
        {
            EditorWindow.GetWindow<PrefsEditor>().Show();
        }

        [MenuItem("JS Bridge/Javascript Console", false, 5003)]
        public static void ShowJSConsole()
        {
            QuickJS.Unity.EditorRuntime.ShowWindow("plover/editor/js_console", "JSConsole");
        }

        [MenuItem("JS Bridge/Javascript Module View", false, 5004)]
        public static void ShowJSModuleView()
        {
            QuickJS.Unity.EditorRuntime.ShowWindow("plover/editor/js_module_view", "JSModuleView");
        }

        [MenuItem("JS Bridge/Script Editor Window Launcher", false, 5005)]
        public static void ShowScriptEditorWindowLauncher()
        {
            EditorWindow.GetWindow<ScriptEditorWindowLauncher>().Show();
        }

        public static string GetPlatform()
        {
            var buildTarget = EditorUserBuildSettings.activeBuildTarget;
            switch (buildTarget)
            {
                case BuildTarget.Android: return "Android";
                case BuildTarget.iOS: return "iOS";
                case BuildTarget.WSAPlayer: return "WSA";
                case BuildTarget.StandaloneWindows:
                case BuildTarget.StandaloneWindows64: return "Windows";
                case BuildTarget.StandaloneOSX: return "OSX";
#if !UNITY_2019_2_OR_NEWER
                case BuildTarget.StandaloneLinux:
                case BuildTarget.StandaloneLinuxUniversal:
#endif
                case BuildTarget.StandaloneLinux64: return "Linux";
                case BuildTarget.Switch: return "Switch";
                case BuildTarget.PS4: return "PS4";
                case BuildTarget.XboxOne: return "XboxOne";
                default: return buildTarget.ToString();
            }
        }

        /// <summary>
        /// 可以明确表明该 Type 属于 Editor 运行时
        /// </summary>
        public static bool IsExplicitEditorType(Type type)
        {
            if (type.Namespace != null && type.Namespace.StartsWith("UnityEditor"))
            {
                return true;
            }

            return IsExplicitEditorDomain(type.Assembly);
        }

        /// <summary>
        /// 可以明确表明该 Assembly 包含的类型属于 Editor 运行时
        /// </summary>
        public static bool IsExplicitEditorDomain(Assembly assembly)
        {
            if (assembly == typeof(Editor).Assembly)
            {
                return true;
            }

            var location = assembly.Location.Replace('\\', '/');
            var assetsPath = new FileInfo(Application.dataPath);
            var fullAssetsPath = assetsPath.FullName.Replace('\\', '/');

            if (location.StartsWith(fullAssetsPath, StringComparison.OrdinalIgnoreCase))
            {
                var substr = location.Substring(fullAssetsPath.Length).ToLower();
                if (substr.Contains("/editor/"))
                {
                    return true;
                }
            }

            return false;
        }

        public static string ReplacePathVars(string value)
        {
            var platform = GetPlatform();
            value = value.Replace("${platform}", platform);
            return value;
        }

        public static bool CheckAnyScriptExists()
        {
            var objects = Selection.objects;
            for (var i = 0; i < objects.Length; ++i)
            {
                var obj = objects[i];
                var assetPath = AssetDatabase.GetAssetPath(obj);
                if (CheckAnyScripts(assetPath, 5))
                {
                    return true;
                }
            }
            return false;
        }

        private static bool CheckAnyScripts(string assetPath, int maxDepth)
        {
            if (maxDepth <= 0)
            {
                // Debug.LogWarningFormat("max depth limited: {0}", assetPath);
                return false;
            }

            if (Directory.Exists(assetPath))
            {
                foreach (var subDir in Directory.GetDirectories(assetPath))
                {
                    if (CheckAnyScripts(subDir, maxDepth - 1))
                    {
                        return true;
                    }
                }

                foreach (var subFile in Directory.GetFiles(assetPath))
                {
                    if (CheckAnyScripts(subFile, maxDepth))
                    {
                        return true;
                    }
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(assetPath) && assetPath.EndsWith(".js"))
                {
                    return true;
                }
            }
            return false;
        }

        [MenuItem("Assets/JS Bridge/Compile (bytecode)", true)]
        public static bool CompileBytecodeValidate()
        {
            return CheckAnyScriptExists();
        }

        [MenuItem("Assets/JS Bridge/Compile (bytecode)")]
        public static void CompileBytecode()
        {
            CompileBytecode(null);
            AssetDatabase.Refresh();
        }

        // workspace: path of tsconfig.json
        public static void CompileBytecode(string workspace)
        {
            var commonJSModule = false;
            var tsconfigPath = string.IsNullOrEmpty(workspace) ? "tsconfig.json" : Path.Combine(workspace, "tsconfig.json");
            if (File.Exists(tsconfigPath))
            {
                var text = Utils.TextUtils.NormalizeJson(File.ReadAllText(tsconfigPath));
                var tsconfig = JsonUtility.FromJson<Utils.TSConfig>(text);
                var module = tsconfig.compilerOptions.module;
                if (module == "commonjs")
                {
                    commonJSModule = true;
                    Debug.LogFormat("read tsconfig.json: compile as commonjs module mode");
                }
            }
            else
            {
                Debug.LogFormat("no tsconfig.json found, compile as ES6 module mode");
            }

            using (var compiler = new UnityJSScriptCompiler())
            {
                var objects = Selection.objects;
                for (var i = 0; i < objects.Length; ++i)
                {
                    var obj = objects[i];
                    var assetPath = AssetDatabase.GetAssetPath(obj);
                    CompileBytecode(compiler, assetPath, commonJSModule);
                }
            }
        }

        private static void CompileBytecode(UnityJSScriptCompiler compiler, string assetPath, bool commonJSModule)
        {
            if (Directory.Exists(assetPath))
            {
                foreach (var subDir in Directory.GetDirectories(assetPath))
                {
                    CompileBytecode(compiler, subDir, commonJSModule);
                }

                foreach (var subFile in Directory.GetFiles(assetPath))
                {
                    CompileBytecode(compiler, subFile, commonJSModule);
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(assetPath) && assetPath.EndsWith(".js"))
                {
                    var outPath = assetPath + ".bytes";
                    var bytes = File.ReadAllBytes(assetPath);
                    var bytecode = compiler.Compile(assetPath, bytes, commonJSModule);
                    if (bytecode != null)
                    {
                        File.WriteAllBytes(outPath, bytecode);
                        Debug.LogFormat("compile {0}({1}) => {2}({3})", assetPath, bytes.Length, outPath, bytecode.Length);
                    }
                    else
                    {
                        Debug.LogErrorFormat("compilation failed: {0}", assetPath);
                        if (File.Exists(outPath))
                        {
                            File.Delete(outPath);
                        }
                    }
                }
            }
        }

        #endregion

        // https://regex101.com/r/426q4x/1
        public static Regex JSBehaviourClassNameRegex = new Regex(@"@ScriptType\s*\([\s\w\{\})]*\)[\n\s]*export\s+class\s+(\w+)\s+extends", RegexOptions.Multiline | RegexOptions.Compiled);
        public static Regex JSAssetClassNameRegex = new Regex(@"@ScriptAsset\s*\([\s\w\{\})]*\)[\n\s]*export\s+class\s+(\w+)\s+extends", RegexOptions.Multiline | RegexOptions.Compiled);
        public static Regex JSCustomEditorClassNameRegex = new Regex(@"^\s*@ScriptEditor\s*\([\s\w\{\})]*\)[\n\s]*export\s+class\s+(\w+)\s+extends", RegexOptions.Multiline | RegexOptions.Compiled);
        public static Regex JSEditorWindowClassNameRegex = new Regex(@"^\s*@ScriptEditorWindow\s*\([\s\w\{\})]*\)[\n\s]*export\s+class\s+(\w+)\s+extends", RegexOptions.Multiline | RegexOptions.Compiled);

        public static string NormalizePathString(string path)
        {
            return path.Replace('\\', '/');
        }

        // sourceFile: 需要传入 FullPath
        public static bool ResolveScriptRef(string sourceDirBase, string sourceFile, out string normalizedPath, out string modulePath, List<JSScriptClassPathHint> hints)
        {
            if (!Path.IsPathRooted(sourceFile))
            {
                sourceFile = Path.GetFullPath(sourceFile);
            }

            normalizedPath = sourceFile;
            if (!sourceFile.EndsWith(".ts") && !sourceFile.EndsWith(".tsx"))
            {
                // invalid 
                modulePath = null;
                return false;
            }

            var sourceExt = Path.GetExtension(sourceFile);

            if (File.Exists(sourceFile))
            {
                var sourceDir = string.IsNullOrEmpty(sourceDirBase) ? "." : sourceDirBase;
                if (Path.IsPathRooted(sourceDir))
                {
                    // not implemented
                }
                else
                {
                    var appRoot = Path.GetPathRoot(Application.dataPath);
                    var sourceRoot = Path.GetPathRoot(sourceFile).Replace('\\', '/');

                    if (appRoot == sourceRoot)
                    {
                        var sourcePathNorm = sourceFile.Replace('\\', '/');
                        var appPathNorm = Path.Combine(Directory.GetParent(Application.dataPath).FullName, sourceDir).Replace('\\', '/');

                        if (sourcePathNorm.ToLower().StartsWith(appPathNorm.ToLower()))
                        {
                            var sourceSubPathNorm = sourcePathNorm[0] == '/' ? sourcePathNorm.Substring(appPathNorm.Length + 1) : sourcePathNorm.Substring(appPathNorm.Length);
                            var offset = sourceSubPathNorm[0] == '/' ? 1 : 0;

                            modulePath = sourceSubPathNorm.Substring(offset, sourceSubPathNorm.Length - sourceExt.Length - offset);
                            GetJSScriptClasses(sourceFile, modulePath, hints);
                            return true;
                        }
                    }
                    else
                    {
                        // invalid
                    }
                }
            }

            modulePath = null;
            return false;
        }

        private static void GetJSScriptClasses(string sourceFile, string modulePath, List<JSScriptClassPathHint> hints)
        {
            //TODO: need optimization?
            var text = File.ReadAllText(sourceFile);

            foreach (Match m in JSBehaviourClassNameRegex.Matches(text))
            {
                hints.Add(new JSScriptClassPathHint(sourceFile, modulePath, m.Groups[1].Value, JSScriptClassType.MonoBehaviour));
            }

            foreach (Match m in JSAssetClassNameRegex.Matches(text))
            {
                hints.Add(new JSScriptClassPathHint(sourceFile, modulePath, m.Groups[1].Value, JSScriptClassType.ScriptableObject));
            }

            foreach (Match m in JSCustomEditorClassNameRegex.Matches(text))
            {
                hints.Add(new JSScriptClassPathHint(sourceFile, modulePath, m.Groups[1].Value, JSScriptClassType.CustomEditor));
            }

            foreach (Match m in JSEditorWindowClassNameRegex.Matches(text))
            {
                hints.Add(new JSScriptClassPathHint(sourceFile, modulePath, m.Groups[1].Value, JSScriptClassType.EditorWindow));
            }
        }

        static UnityHelper()
        {
            // EditorApplication.playModeStateChanged += OnPlayModeStateChanged;
        }

        // private static void OnPlayModeStateChanged(PlayModeStateChange playModeStateChange)
        // {
        //     if (playModeStateChange == PlayModeStateChange.EnteredEditMode)
        //     {
        //         EditorApplication.delayCall += () => ScriptEngine.Shutdown();
        //     }
        // }
    }
}
#endif
