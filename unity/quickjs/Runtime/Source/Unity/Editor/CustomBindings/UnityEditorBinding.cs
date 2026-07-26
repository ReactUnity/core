#if !JSB_UNITYLESS
using System;
using System.Reflection;

namespace jsb.Editor
{
    using QuickJS.Native;
    using QuickJS.Binding;
    using QuickJS.Unity;
    using UnityEngine;
    using UnityEditor;
    using UnityEditor.IMGUI.Controls;

    public class UnityEditorBinding : AbstractBindingProcess
    {
        public bool IsAvailable(MethodInfo methodInfo)
        {
            return methodInfo != null && methodInfo.IsPublic;
        }

        public override void OnPreExporting(BindingManager bindingManager)
        {
#if !UNITY_WEBGL
            bindingManager.AddExportedRawTypes(typeof(QuickJS.Utils.FSWatcher)).EditorRuntime();
#endif
            // bindingManager.AddTypePrefixBlacklist("Unity.");
            // bindingManager.AddTypePrefixBlacklist("TreeEditor.");
            bindingManager.AddTypeFullNameBlacklist("UnityEditor.UpdatePrefabInstancesEventArgs");
            bindingManager.AddExportedType(typeof(QuickJS.Unity.UnityHelper)).EditorRuntime();
            bindingManager.AddExportedType(typeof(QuickJS.Binding.Prefs)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(QuickJS.Utils.TSConfig)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(QuickJS.Utils.TSConfig.CompilerOptions)).EditorRuntime().SetAllConstructorsBlocked();
            
            bindingManager.AddExportedType(typeof(GUI)).SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(GUIUtility)).SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(GUILayout)).SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(GUILayoutUtility)).SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(GUILayoutOption));
            bindingManager.AddExportedType(typeof(GUIContent));
            bindingManager.AddExportedType(typeof(GUISkin));
            bindingManager.AddExportedType(typeof(GUIStyle));
            bindingManager.AddExportedType(typeof(TextAnchor));
            bindingManager.AddExportedType(typeof(ScaleMode));
            bindingManager.AddExportedType(typeof(FocusType));
            bindingManager.AddExportedType(typeof(AudioClip));
            bindingManager.AddExportedType(typeof(RectInt));
            bindingManager.AddExportedType(typeof(Bounds));
            bindingManager.AddExportedType(typeof(BoundsInt));
            bindingManager.AddExportedType(typeof(Gradient));
            bindingManager.AddExportedType(typeof(AnimationCurve));
            bindingManager.AddExportedType(typeof(Event));
            bindingManager.AddExportedType(typeof(EventType)).OnFilter<string>(i => char.IsLower(i[0]));
            bindingManager.AddExportedType(typeof(Coroutine));
            bindingManager.AddExportedType(typeof(System.Collections.IEnumerator));
            bindingManager.AddExportedType(typeof(System.Collections.Generic.IEnumerable<string>));

            bindingManager.AddExportedType(typeof(SearchField)).EditorRuntime();
            bindingManager.AddExportedType(typeof(EditorStyles)).EditorRuntime();
            bindingManager.AddExportedType(typeof(GenericMenu)).EditorRuntime();
            bindingManager.AddExportedType(typeof(PrefabAssetType)).EditorRuntime();
            bindingManager.AddExportedType(typeof(PrefabInstanceStatus)).EditorRuntime();
            bindingManager.AddExportedType(typeof(UIOrientation)).EditorRuntime();
            bindingManager.AddExportedType(typeof(MessageType)).EditorRuntime();
            bindingManager.AddExportedType(typeof(Hash128)).EditorRuntime();
            bindingManager.AddExportedType(typeof(ImportAssetOptions)).EditorRuntime();
            #if !UNITY_2019_3_OR_NEWER
            bindingManager.AddExportedType(typeof(ScriptingRuntimeVersion)).EditorRuntime();
            #endif
            bindingManager.AddExportedType(typeof(AssetPostprocessor)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(AssetImporter)).EditorRuntime();
            bindingManager.AddExportedType(typeof(ModelImporter)).EditorRuntime();
            bindingManager.AddExportedType(typeof(AudioImporter)).EditorRuntime();
            bindingManager.AddExportedType(typeof(VideoClipImporter)).EditorRuntime();
            bindingManager.AddExportedType(typeof(TextureImporter)).EditorRuntime();
            bindingManager.AddExportedType(typeof(MouseCursor)).EditorRuntime();
            bindingManager.AddExportedType(typeof(PauseState)).EditorRuntime();
            bindingManager.AddExportedType(typeof(PlayModeStateChange)).EditorRuntime();
            bindingManager.AddExportedType(typeof(ExportPackageOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(ForceReserializeAssetsOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(StatusQueryOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(SerializedObject)).EditorRuntime();
            bindingManager.AddExportedType(typeof(SerializedProperty)).EditorRuntime();
            bindingManager.AddExportedType(typeof(SerializedPropertyType)).EditorRuntime();
            bindingManager.AddExportedType(typeof(BuildPlayerOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(BuildAssetBundleOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(BuildTarget)).EditorRuntime();
            bindingManager.AddExportedType(typeof(BuildOptions)).EditorRuntime();
            bindingManager.AddExportedType(typeof(ObjectFactory)).EditorRuntime();
            bindingManager.AddExportedType(typeof(CameraEditor)).EditorRuntime();
            bindingManager.AddExportedType(typeof(CameraEditorUtils)).EditorRuntime();
            bindingManager.AddExportedType(typeof(TransformUtils)).EditorRuntime();
            bindingManager.AddExportedType(typeof(EditorJsonUtility)).EditorRuntime();
            bindingManager.AddExportedType(typeof(GameObjectUtility)).EditorRuntime();
            bindingManager.AddExportedType(typeof(EditorPrefs)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(Handles)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(HandleUtility)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(SceneView)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(MeshUtility)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(PrefabUtility)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(FileUtil)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(UnityEditor.Build.Reporting.BuildReport)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(AssetBundleManifest)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(BuildPipeline)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(AssetDatabase)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(ShaderUtil)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(EditorUtility)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(EditorGUI)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(EditorGUIUtility)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(EditorGUILayout)).EditorRuntime().SetAllConstructorsBlocked()
                // note: it's easy to confuse a bunch of overloads in typescript (you need to add '<any>' before every argument or 'ts-ignore' when the ts compiler can't guess the correct candidate)
                // note: so you'd prefer to rename some of them it another totally different name like this: .SetMethodJSName("Popup_sis", "Popup", typeof(string), typeof(int), typeof(string[]), typeof(GUILayoutOption[]))
                // .SetMethodJSName("Popup_sis", "Popup", typeof(string), typeof(int), typeof(string[]), typeof(GUILayoutOption[]))
            ;
            bindingManager.AddExportedType(typeof(EditorApplication)).EditorRuntime().SetAllConstructorsBlocked();
            bindingManager.AddExportedType(typeof(Editor)).EditorRuntime()
                .WriteCrossBindingConstructor();
            bindingManager.AddExportedType(typeof(EditorWindow)).EditorRuntime()
                .SetMemberBlocked("CreateWindow")
                .SetMemberBlocked("GetWindowWithRect")
                .SetMethodBlocked("GetWindow", typeof(Type), typeof(bool), typeof(string), typeof(bool))
                .SetMethodBlocked("GetWindow", typeof(Type), typeof(bool), typeof(string))
                .SetMethodBlocked("GetWindow", typeof(Type), typeof(bool))
                //TODO add overloading members of GetWindow (already implemented)
                .AddTSMethodDeclaration("static GetWindow<T extends EditorWindow>(type: { new(): T }): T", "GetWindow", typeof(Type))
                //TODO desiredDockNextTo
                //.add equivalent memeber function in typescript for desiredDockNextTo
                .WriteCrossBindingConstructor()
                .WriteCSMethodOverrideBinding("GetWindow", EditorWindowFix.BindStatic_GetWindow)
                .AddStaticMethod(EditorWindowFix.CreateWindow)
            ;
            bindingManager.AddTypeFullNameBlacklist("UnityEditor.ProfilerWindow");
        }
        
        public override void OnPostExporting(BindingManager bindingManager)
        {
            bindingManager.ExportTypesInAssembly(typeof(Editor).Assembly, true, transform => transform.EditorRuntime());
        }
    }
}
#endif