#if !JSB_UNITYLESS
using System;
using System.Reflection;

namespace jsb.Editor
{
    using QuickJS.Unity;
    using QuickJS.Binding;
    using UnityEngine;

    /// <summary>
    /// the most essential types for scripting.
    /// you could define your own BindingProcess anywhere in your project's 'Assets' editor directory, 
    /// add more types to export and transform even the types already added here.
    /// </summary>
    public class UnityBinding : AbstractBindingProcess
    {
        public bool IsAvailable(MethodInfo methodInfo)
        {
            return methodInfo != null && methodInfo.IsPublic;
        }

        public override void OnPreCollectAssemblies(BindingManager bindingManager)
        {
            HackGetComponents(bindingManager.TransformType(typeof(GameObject)));
            HackGetComponents(bindingManager.TransformType(typeof(Component)));

            bindingManager.TransformType(typeof(MonoBehaviour))
                .WriteCrossBindingConstructor();

            bindingManager.TransformType(typeof(ScriptableObject))
                .WriteCrossBindingConstructor()
                .SetMethodBlocked("CreateInstance", typeof(string))
                // .SetMethodBlocked("CreateInstance", typeof(Type)) 
                .AddTSMethodDeclaration("static CreateInstance<T extends ScriptableObject>(type: { new(): T }): T", "CreateInstance", typeof(Type))
                .WriteCSMethodOverrideBinding("CreateInstance", ScriptableObjectFix.BindStatic_CreateInstance)
            ;

            // var buildTarget = EditorUserBuildSettings.activeBuildTarget;
            // if (buildTarget != BuildTarget.iOS)
            // {
            //     bindingManager.AddTypePrefixBlacklist("UnityEngine.Apple");
            // }
            // if (buildTarget != BuildTarget.Android)
            // {
            //     bindingManager.AddTypePrefixBlacklist("UnityEngine.Android");
            // }
            // bindingManager.AddTypePrefixBlacklist("SyntaxTree.");

            // fix d.ts, some C# classes use explicit implemented interface method
            bindingManager.SetTypeBlocked(typeof(UnityEngine.ILogHandler));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.ISerializationCallbackReceiver));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.Playables.ScriptPlayable<>));
            bindingManager.SetTypeBlocked(typeof(AOT.MonoPInvokeCallbackAttribute));

            // SetTypeBlocked(typeof(RendererExtensions));
            bindingManager.TransformType(typeof(UnityEngine.Events.UnityEvent<>))
                .Rename("UnityEvent1");

            bindingManager.TransformType(typeof(UnityEngine.Events.UnityEvent<,>))
                .Rename("UnityEvent2");

            bindingManager.TransformType(typeof(UnityEngine.Events.UnityEvent<,,>))
                .Rename("UnityEvent3");

            bindingManager.TransformType(typeof(UnityEngine.Events.UnityEvent<,,,>))
                .Rename("UnityEvent4");

            bindingManager.TransformType(typeof(UnityEngine.Texture))
                .SetMemberBlocked("imageContentsHash");
            bindingManager.TransformType(typeof(UnityEngine.Texture2D))
                .AddRequiredDefinesForMember("alphaIsTransparency", "UNITY_EDITOR");
            bindingManager.TransformType(typeof(UnityEngine.Input))
                .SetMemberBlocked("IsJoystickPreconfigured"); // specific platform available only
            bindingManager.TransformType(typeof(UnityEngine.MonoBehaviour))
                .SetMemberBlocked("runInEditMode"); // editor only
            bindingManager.TransformType(typeof(UnityEngine.QualitySettings))
                .SetMemberBlocked("streamingMipmapsRenderersPerFrame");
        }

        public override void OnPreExporting(BindingManager bindingManager)
        {
            bindingManager.AddExportedType(typeof(LayerMask));
            bindingManager.AddExportedType(typeof(Color));
            bindingManager.AddExportedType(typeof(Color32));
            bindingManager.AddExportedType(typeof(Vector2));
            bindingManager.AddExportedType(typeof(Vector2Int));
            bindingManager.AddExportedType(typeof(Vector3));
            bindingManager.AddExportedType(typeof(Vector3Int));
            bindingManager.AddExportedType(typeof(Vector4));
            bindingManager.AddExportedType(typeof(Rect));
            bindingManager.AddExportedType(typeof(Quaternion));
            bindingManager.AddExportedType(typeof(Matrix4x4));
            bindingManager.AddExportedType(typeof(PrimitiveType));

            bindingManager.AddExportedType(typeof(UnityEngine.Object))
                .EnableOperatorOverloading(false)
                ;
            bindingManager.AddExportedType(typeof(KeyCode));
            bindingManager.AddExportedType(typeof(Texture));
            bindingManager.AddExportedType(typeof(Texture2D));
            bindingManager.AddExportedType(typeof(Material));
            bindingManager.AddExportedType(typeof(Time));
            bindingManager.AddExportedType(typeof(Random));
            bindingManager.AddExportedType(typeof(GameObject), true);
            bindingManager.AddExportedType(typeof(Camera), true);
            bindingManager.AddExportedType(typeof(Transform), true);
            bindingManager.AddExportedType(typeof(RectTransform), true);
            bindingManager.AddExportedType(typeof(MonoBehaviour), true);
            bindingManager.AddExportedType(typeof(ScriptableObject), true);
            bindingManager.AddExportedType(typeof(Sprite), true);
            bindingManager.AddExportedType(typeof(SpriteRenderer), true);
            bindingManager.AddExportedType(typeof(Animation), true);
            bindingManager.AddExportedType(typeof(AnimationClip), true);
            bindingManager.AddExportedType(typeof(Animator), true);
            bindingManager.AddExportedType(typeof(AnimationState), true);
            bindingManager.AddExportedType(typeof(WrapMode), true);
            bindingManager.AddExportedType(typeof(Debug));
            bindingManager.AddExportedType(typeof(WaitForSeconds), true);
            bindingManager.AddExportedType(typeof(WaitForEndOfFrame), true);
            bindingManager.AddExportedType(typeof(Input));
            bindingManager.AddExportedType(typeof(Application));

            bindingManager.AddExportedType(typeof(Ray));
            bindingManager.AddExportedType(typeof(RaycastHit));
            bindingManager.AddExportedType(typeof(Physics));
            bindingManager.AddExportedType(typeof(Collider));
            bindingManager.AddExportedType(typeof(BoxCollider));
            bindingManager.AddExportedType(typeof(SphereCollider));
            bindingManager.AddExportedType(typeof(Rigidbody));

            bindingManager.AddExportedType(typeof(Resources))
                .SetAllConstructorsBlocked()
                // .SetMethodBlocked("FindObjectsOfTypeAll", typeof(Type)) 
                .AddTSMethodDeclaration("static FindObjectsOfTypeAll<T extends Object>(type: { new(): T }): T[]", "FindObjectsOfTypeAll", typeof(Type))
                .WriteCSMethodOverrideBinding("FindObjectsOfTypeAll", ResourcesFix.BindStatic_FindObjectsOfTypeAll)
            ;
            bindingManager.AddExportedType(typeof(QuickJS.Unity.JSSerializationContext)).SetAllConstructorsBlocked();

#if JSB_WITH_UIELEMENTS
            //TODO [experimental, not_implemented] ui elements support
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.IUxmlFactory));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.IMouseEvent));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.ITransform));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.IVisualElementScheduler));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.IResolvedStyle));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.IExperimentalFeatures));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.Experimental.ITransitionAnimations));
            bindingManager.SetTypeBlocked(typeof(UnityEngine.UIElements.Experimental.IValueAnimation));
            bindingManager.TransformType(typeof(UnityEngine.UIElements.VisualElement.UxmlTraits)).Rename("UxmlTraits0");
            bindingManager.TransformType(typeof(UnityEngine.UIElements.EventBase<>)).Rename("EventBase1");
            bindingManager.TransformType(typeof(UnityEngine.UIElements.UxmlFactory<>)).Rename("UxmlFactory1");
            bindingManager.TransformType(typeof(UnityEngine.UIElements.UxmlFactory<,>)).Rename("UxmlFactory2");
            bindingManager.ExportTypesInAssembly(typeof(UnityEngine.UIElements.Label).Assembly, true);
#endif
        }

        private static TypeTransform HackGetComponents(TypeTransform typeTransform)
        {
            if (typeTransform.type == typeof(GameObject))
            {
                typeTransform.AddTSMethodDeclaration($"AddComponent<T extends Component>(type: {{ new(): T }}): T",
                     "AddComponent", typeof(Type));

                typeTransform.WriteCSMethodOverrideBinding("AddComponent", GameObjectFix.Bind_AddComponent);

                typeTransform.WriteCSMethodOverrideBinding("GetComponent", GameObjectFix.Bind_GetComponent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentInChildren", GameObjectFix.Bind_GetComponentInChildren);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentInParent", GameObjectFix.Bind_GetComponentInParent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentsInChildren", GameObjectFix.Bind_GetComponentsInChildren);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentsInParent", GameObjectFix.Bind_GetComponentsInParent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponents", GameObjectFix.Bind_GetComponents);
            }
            else
            {
                typeTransform.WriteCSMethodOverrideBinding("GetComponent", ComponentFix.Bind_GetComponent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentInChildren", ComponentFix.Bind_GetComponentInChildren);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentInParent", ComponentFix.Bind_GetComponentInParent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentsInChildren", ComponentFix.Bind_GetComponentsInChildren);
                typeTransform.WriteCSMethodOverrideBinding("GetComponentsInParent", ComponentFix.Bind_GetComponentsInParent);
                typeTransform.WriteCSMethodOverrideBinding("GetComponents", ComponentFix.Bind_GetComponents);
            }

            typeTransform.AddTSMethodDeclaration($"GetComponent<T extends Component>(type: {{ new(): T }}): T",
                    "GetComponent", typeof(Type))
                .AddTSMethodDeclaration($"GetComponentInChildren<T extends Component>(type: {{ new(): T }}, includeInactive: boolean): T",
                    "GetComponentInChildren", typeof(Type), typeof(bool))
                .AddTSMethodDeclaration($"GetComponentInChildren<T extends Component>(type: {{ new(): T }}): T",
                    "GetComponentInChildren", typeof(Type))
                .AddTSMethodDeclaration($"GetComponentInParent<T extends Component>(type: {{ new(): T }}): T",
                    "GetComponentInParent", typeof(Type))
                .AddTSMethodDeclaration($"GetComponents<T extends Component>(type: {{ new(): T }}): T[]",
                    "GetComponents", typeof(Type))
                .AddTSMethodDeclaration($"GetComponentsInChildren<T extends Component>(type: {{ new(): T }}, includeInactive: boolean): T[]",
                    "GetComponentsInChildren", typeof(Type), typeof(bool))
                .AddTSMethodDeclaration($"GetComponentsInChildren<T extends Component>(type: {{ new(): T }}): T[]",
                    "GetComponentsInChildren", typeof(Type))
                .AddTSMethodDeclaration($"GetComponentsInParent<T extends Component>(type: {{ new(): T }}, includeInactive: boolean): T[]",
                    "GetComponentsInParent", typeof(Type), typeof(bool))
                .AddTSMethodDeclaration($"GetComponentsInParent<T extends Component>(type: {{ new(): T }}): T[]",
                    "GetComponentsInParent", typeof(Type))
                ;
            return typeTransform;
        }
    }
}
#endif