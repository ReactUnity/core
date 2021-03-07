//
// Types in assemblies: UnityEditor.CoreModule
// Generated 7.03.2021 17:08:36
//
import { UnityEngine,Unity } from './unity';

export namespace UnityEditor {
  export declare class ActiveEditorTracker {
    constructor();
    activeEditors: UnityEditor.Editor[];
    isDirty: boolean;
    isLocked: boolean;
    inspectorMode: UnityEditor.InspectorMode;
    hasComponentsWhichCannotBeMultiEdited: boolean;
    Equals: ((o: any) => boolean);
    GetHashCode: (() => number);
    Destroy: (() => void);
    GetVisible: ((index: number) => number);
    SetVisible: ((index: number, visible: number) => void);
    ClearDirty: (() => void);
    RebuildIfNecessary: (() => void);
    ForceRebuild: (() => void);
    VerifyModifiedMonoBehaviours: (() => void);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ArrayUtility {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssemblyReloadEvents {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssemblyReloadEvents_AssemblyReloadCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum AssetDeleteResult {
    DidNotDelete = 0,
    FailedDelete = 1,
    DidDelete = 2,
  }
  export declare class AssetModificationProcessor {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum AssetMoveResult {
    DidNotMove = 0,
    FailedMove = 1,
    DidMove = 2,
  }
  export declare class AssetPostprocessor {
    constructor();
    assetPath: string;
    context: UnityEditor.AssetImporters.AssetImportContext;
    assetImporter: UnityEditor.AssetImporter;
    preview: UnityEngine.Texture2D;
    LogWarning: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
    LogError: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
    GetVersion: (() => any);
    GetPostprocessOrder: (() => number);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum BuildOptions {
    None = 0,
    Development = 1,
    AutoRunPlayer = 4,
    ShowBuiltPlayer = 8,
    BuildAdditionalStreamedScenes = 16,
    AcceptExternalModificationsToPlayer = 32,
    InstallInBuildFolder = 64,
    WebPlayerOfflineDeployment = 128,
    ConnectWithProfiler = 256,
    AllowDebugging = 512,
    SymlinkLibraries = 1024,
    UncompressedAssetBundle = 2048,
    StripDebugSymbols = 0,
    CompressTextures = 0,
    ConnectToHost = 4096,
    EnableHeadlessMode = 16384,
    BuildScriptsOnly = 32768,
    PatchPackage = 65536,
    Il2CPP = 0,
    ForceEnableAssertions = 131072,
    CompressWithLz4 = 262144,
    CompressWithLz4HC = 524288,
    ForceOptimizeScriptCompilation = 0,
    ComputeCRC = 1048576,
    StrictMode = 2097152,
    IncludeTestAssemblies = 4194304,
    NoUniqueIdentifier = 8388608,
    WaitForPlayerConnection = 33554432,
    EnableCodeCoverage = 67108864,
    EnableDeepProfilingSupport = 268435456,
    DetailedBuildReport = 536870912,
    ShaderLivelinkSupport = 1073741824,
  }
  export enum BuildAssetBundleOptions {
    None = 0,
    UncompressedAssetBundle = 1,
    CollectDependencies = 2,
    CompleteAssets = 4,
    DisableWriteTypeTree = 8,
    DeterministicAssetBundle = 16,
    ForceRebuildAssetBundle = 32,
    IgnoreTypeTreeChanges = 64,
    AppendHashToAssetBundleName = 128,
    ChunkBasedCompression = 256,
    StrictMode = 512,
    DryRunBuild = 1024,
    DisableLoadAssetByFileName = 4096,
    DisableLoadAssetByFileNameWithExtension = 8192,
    AssetBundleStripUnityVersion = 32768,
  }
  export declare class AssetBundleBuild {
    assetBundleName: string;
    assetBundleVariant: string;
    assetNames: string[];
    addressableNames: string[];
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class BuildPlayerOptions {
    scenes: string[];
    locationPathName: string;
    assetBundleManifestPath: string;
    targetGroup: UnityEditor.BuildTargetGroup;
    target: UnityEditor.BuildTarget;
    options: UnityEditor.BuildOptions;
    extraScriptingDefines: string[];
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum PlayerConnectionInitiateMode {
    None = 0,
    PlayerConnectsToHost = 1,
    PlayerListens = 2,
  }
  export declare class BuildPipeline {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class BuildPlayerWindow {
    constructor();
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class BuildPlayerWindow_BuildMethodException {
    constructor();
    constructor(message: string);
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => any);
    ToString: (() => string);
    GetObjectData: ((info: any, context: any) => void);
    GetType: (() => any) | (() => any);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
  }
  export declare class BuildPlayerWindow_DefaultBuildMethods {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum BuildTarget {
    StandaloneOSX = 2,
    StandaloneOSXUniversal = 3,
    StandaloneOSXIntel = 4,
    StandaloneWindows = 5,
    WebPlayer = 6,
    WebPlayerStreamed = 7,
    iOS = 9,
    PS3 = 10,
    XBOX360 = 11,
    Android = 13,
    StandaloneLinux = 17,
    StandaloneWindows64 = 19,
    WebGL = 20,
    WSAPlayer = 21,
    StandaloneLinux64 = 24,
    StandaloneLinuxUniversal = 25,
    WP8Player = 26,
    StandaloneOSXIntel64 = 27,
    BlackBerry = 28,
    Tizen = 29,
    PSP2 = 30,
    PS4 = 31,
    PSM = 32,
    XboxOne = 33,
    SamsungTV = 34,
    N3DS = 35,
    WiiU = 36,
    tvOS = 37,
    Switch = 38,
    Lumin = 39,
    Stadia = 40,
    CloudRendering = 41,
    iPhone = -1,
    BB10 = -1,
    MetroPlayer = -1,
    NoTarget = -2,
  }
  export enum BuildTargetGroup {
    Unknown = 0,
    Standalone = 1,
    WebPlayer = 2,
    iPhone = 4,
    iOS = 4,
    PS3 = 5,
    XBOX360 = 6,
    Android = 7,
    WebGL = 13,
    WSA = 14,
    Metro = 14,
    WP8 = 15,
    BlackBerry = 16,
    Tizen = 17,
    PSP2 = 18,
    PS4 = 19,
    PSM = 20,
    XboxOne = 21,
    SamsungTV = 22,
    N3DS = 23,
    WiiU = 24,
    tvOS = 25,
    Facebook = 26,
    Switch = 27,
    Lumin = 28,
    Stadia = 29,
    CloudRendering = 30,
  }
  export declare class DefaultAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum DragAndDropVisualMode {
    None = 0,
    Copy = 1,
    Link = 2,
    Move = 16,
    Generic = 4,
    Rejected = 32,
  }
  export declare class DragAndDrop {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum GizmoType {
    Pickable = 1,
    NotInSelectionHierarchy = 2,
    NonSelected = 32,
    Selected = 4,
    Active = 8,
    InSelectionHierarchy = 16,
    NotSelected = -127,
    SelectedOrChild = -127,
  }
  export declare class EditorApplication {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorApplication_ProjectWindowItemCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((guid: string, selectionRect: UnityEngine.Rect) => void);
    BeginInvoke: ((guid: string, selectionRect: UnityEngine.Rect, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorApplication_HierarchyWindowItemCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((instanceID: number, selectionRect: UnityEngine.Rect) => void);
    BeginInvoke: ((instanceID: number, selectionRect: UnityEngine.Rect, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorApplication_CallbackFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorApplication_SerializedPropertyCallbackFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((menu: UnityEditor.GenericMenu, property: UnityEditor.SerializedProperty) => void);
    BeginInvoke: ((menu: UnityEditor.GenericMenu, property: UnityEditor.SerializedProperty, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayModeStateChange {
    EnteredEditMode = 0,
    ExitingEditMode = 1,
    EnteredPlayMode = 2,
    ExitingPlayMode = 3,
  }
  export enum PauseState {
    Paused = 0,
    Unpaused = 1,
  }
  export declare class EditorBuildSettingsScene {
    constructor();
    constructor(path: string, enabled: boolean);
    constructor(guid: UnityEditor.GUID, enabled: boolean);
    enabled: boolean;
    path: string;
    guid: UnityEditor.GUID;
    CompareTo: ((obj: any) => number);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorBuildSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorGUI {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUI_DisabledGroupScope {
    constructor(disabled: boolean);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUI_DisabledScope {
    constructor(disabled: boolean);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorGUI_ChangeCheckScope {
    constructor();
    changed: boolean;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUI_IndentLevelScope {
    constructor();
    constructor(increment: number);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUI_PropertyScope {
    constructor(totalPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, property: UnityEditor.SerializedProperty);
    content: UnityEngine.GUIContent;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout_ToggleGroupScope {
    constructor(label: string, toggle: boolean);
    constructor(label: UnityEngine.GUIContent, toggle: boolean);
    enabled: boolean;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout_HorizontalScope {
    constructor(options: UnityEngine.GUILayoutOption[]);
    constructor(style: UnityEngine.GUIStyle, options: UnityEngine.GUILayoutOption[]);
    rect: UnityEngine.Rect;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout_VerticalScope {
    constructor(options: UnityEngine.GUILayoutOption[]);
    constructor(style: UnityEngine.GUIStyle, options: UnityEngine.GUILayoutOption[]);
    rect: UnityEngine.Rect;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout_ScrollViewScope {
    constructor(scrollPosition: UnityEngine.Vector2, options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, style: UnityEngine.GUIStyle, options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, background: UnityEngine.GUIStyle, options: UnityEngine.GUILayoutOption[]);
    scrollPosition: UnityEngine.Vector2;
    handleScrollWheel: boolean;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUILayout_FadeGroupScope {
    constructor(value: number);
    visible: boolean;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum MouseCursor {
    Arrow = 0,
    Text = 1,
    ResizeVertical = 2,
    ResizeHorizontal = 3,
    Link = 4,
    SlideArrow = 5,
    ResizeUpRight = 6,
    ResizeUpLeft = 7,
    MoveArrow = 8,
    RotateArrow = 9,
    ScaleArrow = 10,
    ArrowPlus = 11,
    ArrowMinus = 12,
    Pan = 13,
    Orbit = 14,
    Zoom = 15,
    FPS = 16,
    CustomCursor = 17,
    SplitResizeUpDown = 18,
    SplitResizeLeftRight = 19,
  }
  export enum MessageType {
    None = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
  }
  export enum EditorSkin {
    Game = 0,
    Inspector = 1,
    Scene = 2,
  }
  export declare class EditorGUIUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorGUIUtility_IconSizeScope {
    constructor(iconSizeWithinScope: UnityEngine.Vector2);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SessionState {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorPrefs {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum SerializationMode {
    Mixed = 0,
    ForceBinary = 1,
    ForceText = 2,
  }
  export enum EditorBehaviorMode {
    Mode3D = 0,
    Mode2D = 1,
  }
  export enum SpritePackerMode {
    Disabled = 0,
    BuildTimeOnly = 1,
    AlwaysOn = 2,
    BuildTimeOnlyAtlas = 3,
    AlwaysOnAtlas = 4,
    SpriteAtlasV2 = 5,
  }
  export enum LineEndingsMode {
    OSNative = 0,
    Unix = 1,
    Windows = 2,
  }
  export enum AssetPipelineMode {
    Version1 = 0,
    Version2 = 1,
  }
  export enum CacheServerMode {
    AsPreferences = 0,
    Enabled = 1,
    Disabled = 2,
  }
  export enum EnterPlayModeOptions {
    None = 0,
    DisableDomainReload = 1,
    DisableSceneReload = 2,
  }
  export declare class EditorSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum EditorSettings_NamingScheme {
    SpaceParenthesis = 0,
    Dot = 1,
    Underscore = 2,
  }
  export enum PS4BuildSubtarget {
    PCHosted = 0,
    Package = 1,
    Iso = 2,
  }
  export enum PS4HardwareTarget {
    BaseOnly = 0,
    NeoAndBase = 1,
    ProAndBase = 1,
  }
  export enum XboxBuildSubtarget {
    Development = 0,
    Master = 1,
    Debug = 2,
  }
  export enum XboxOneDeployMethod {
    Push = 0,
    RunFromPC = 2,
    Package = 3,
    PackageStreaming = 4,
  }
  export enum XboxOneDeployDrive {
    Default = 0,
    Retail = 1,
    Development = 2,
    Ext1 = 3,
    Ext2 = 4,
    Ext3 = 5,
    Ext4 = 6,
    Ext5 = 7,
    Ext6 = 8,
    Ext7 = 9,
  }
  export enum AndroidBuildSubtarget {
    Generic = -1,
    DXT = -1,
    PVRTC = -1,
    ATC = -1,
    ETC = -1,
    ETC2 = -1,
    ASTC = -1,
  }
  export enum MobileTextureSubtarget {
    Generic = 0,
    DXT = 1,
    PVRTC = 2,
    ATC = 3,
    ETC = 4,
    ETC2 = 5,
    ASTC = 6,
  }
  export enum AndroidETC2Fallback {
    Quality32Bit = 0,
    Quality16Bit = 1,
    Quality32BitDownscaled = 2,
  }
  export enum WSASubtarget {
    AnyDevice = 0,
    PC = 1,
    Mobile = 2,
    HoloLens = 3,
  }
  export enum WSASDK {
    SDK80 = 0,
    SDK81 = 1,
    PhoneSDK81 = 2,
    UniversalSDK81 = 3,
    UWP = 4,
  }
  export enum WSAUWPBuildType {
    XAML = 0,
    D3D = 1,
    ExecutableOnly = 2,
  }
  export enum WSABuildAndRunDeployTarget {
    LocalMachine = 0,
    WindowsPhone = 1,
    DevicePortal = 2,
  }
  export enum WSABuildType {
    Debug = 0,
    Release = 1,
    Master = 2,
  }
  export enum iOSBuildType {
    Debug = 0,
    Release = 1,
  }
  export enum AndroidBuildSystem {
    Internal = 0,
    Gradle = 1,
    ADT = 2,
    VisualStudio = 3,
  }
  export enum AndroidBuildType {
    Debug = 0,
    Development = 1,
    Release = 2,
  }
  export enum AndroidMinification {
    None = 0,
    Proguard = 1,
    Gradle = 2,
  }
  export declare class EditorUserBuildSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum SemanticMergeMode {
    Off = 0,
    Premerge = 1,
    Ask = 2,
  }
  export declare class EditorUserSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorUtility_SelectMenuItemFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((userData: any, options: string[], selected: number) => void);
    BeginInvoke: ((userData: any, options: string[], selected: number, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum EditorSelectedRenderState {
    Hidden = 0,
    Wireframe = 1,
    Highlight = 2,
  }
  export enum InteractionMode {
    AutomatedAction = 0,
    UserAction = 1,
  }
  export enum TextureCompressionQuality {
    Fast = 0,
    Normal = 50,
    Best = 100,
  }
  export enum DialogOptOutDecisionType {
    ForThisMachine = 0,
    ForThisSession = 1,
  }
  export declare class SceneAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorWindow {
    constructor();
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum ExportPackageOptions {
    Default = 0,
    Interactive = 1,
    Recurse = 2,
    IncludeDependencies = 4,
    IncludeLibraryAssets = 8,
  }
  export declare class FileUtil {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GameObjectUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GlobalObjectId {
    targetObjectId: any; // System.UInt64
    targetPrefabId: any; // System.UInt64
    assetGUID: UnityEditor.GUID;
    identifierType: number;
    ToString: (() => string);
    Equals: ((other: UnityEditor.GlobalObjectId) => boolean) | ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
  }
  export declare class GUID {
    constructor(hexRepresentation: string);
    Equals: ((obj: any) => boolean) | ((obj: UnityEditor.GUID) => boolean);
    GetHashCode: (() => number);
    CompareTo: ((obj: any) => number) | ((rhs: UnityEditor.GUID) => number);
    Empty: (() => boolean);
    ParseExact: ((hex: string) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class Handles {
    constructor();
    currentCamera: UnityEngine.Camera;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Handles_DrawingScope {
    constructor(color: UnityEngine.Color);
    constructor(matrix: UnityEngine.Matrix4x4);
    constructor(color: UnityEngine.Color, matrix: UnityEngine.Matrix4x4);
    originalColor: UnityEngine.Color;
    originalMatrix: UnityEngine.Matrix4x4;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class Handles_CapFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType) => void);
    BeginInvoke: ((controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Handles_SizeFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((position: UnityEngine.Vector3) => number);
    BeginInvoke: ((position: UnityEngine.Vector3, callback: any, object: any) => any);
    EndInvoke: ((result: any) => number);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class HandleUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class HandleUtility_PickGameObjectCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class HandleUtility_PlaceObjectDelegate {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Help {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum InspectorMode {
    Normal = 0,
    Debug = 1,
    DebugInternal = 2,
  }
  export enum HierarchyType {
    Assets = 1,
    GameObjects = 2,
  }
  export enum IconDrawStyle {
    NonTexture = 0,
    Texture = 1,
  }
  export declare class HierarchyProperty {
    constructor(hierarchyType: UnityEditor.HierarchyType);
    constructor(hierarchyType: UnityEditor.HierarchyType, forceImport: boolean);
    constructor(rootPath: string);
    constructor(rootPath: string, forceImport: boolean);
    constructor(hierarchyType: UnityEditor.HierarchyType, rootPath: string, forceImport: boolean);
    instanceID: number;
    pptrValue: UnityEngine.Object;
    name: string;
    hasChildren: boolean;
    depth: number;
    ancestors: number[];
    row: number;
    colorCode: number;
    guid: string;
    alphaSorted: boolean;
    showSceneHeaders: boolean;
    isSceneHeader: boolean;
    isValid: boolean;
    isMainRepresentation: boolean;
    hasFullPreviewImage: boolean;
    iconDrawStyle: UnityEditor.IconDrawStyle;
    isFolder: boolean;
    dynamicDependencies: UnityEditor.GUID[];
    icon: UnityEngine.Texture2D;
    SetCustomScenes: ((sceneHandles: number[]) => void);
    SetSubScenes: ((subScenes: UnityEditor.SceneManagement.SceneHierarchyHooks_SubSceneInfo[]) => void);
    Reset: (() => void);
    GetScene: (() => UnityEngine.SceneManagement.Scene);
    IsExpanded: ((expanded: number[]) => boolean);
    Next: ((expanded: number[]) => boolean);
    NextWithDepthCheck: ((expanded: number[], minDepth: number) => boolean);
    Previous: ((expanded: number[]) => boolean);
    Parent: (() => boolean);
    Find: ((instanceID: number, expanded: number[]) => boolean);
    Skip: ((count: number, expanded: number[]) => boolean);
    CountRemaining: ((expanded: number[]) => number);
    GetInstanceIDIfImported: (() => number);
    SetSearchFilter: ((searchString: string, mode: number) => void);
    FindAllAncestors: ((instanceIDs: number[]) => number[]);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class IHasCustomMenu {
    AddItemsToMenu: ((menu: UnityEditor.GenericMenu) => void);
  }
  export declare class LODUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MaterialProperty {
    constructor();
    targets: UnityEngine.Object[];
    type: UnityEditor.MaterialProperty_PropType;
    name: string;
    displayName: string;
    flags: UnityEditor.MaterialProperty_PropFlags;
    textureDimension: UnityEngine.Rendering.TextureDimension;
    rangeLimits: UnityEngine.Vector2;
    hasMixedValue: boolean;
    applyPropertyCallback: UnityEditor.MaterialProperty_ApplyPropertyCallback;
    colorValue: UnityEngine.Color;
    vectorValue: UnityEngine.Vector4;
    floatValue: number;
    textureValue: UnityEngine.Texture;
    textureScaleAndOffset: UnityEngine.Vector4;
    ReadFromMaterialPropertyBlock: ((block: UnityEngine.MaterialPropertyBlock) => void);
    WriteToMaterialPropertyBlock: ((materialblock: UnityEngine.MaterialPropertyBlock, changedPropertyMask: number) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MaterialProperty_ApplyPropertyCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((prop: UnityEditor.MaterialProperty, changeMask: number, previousValue: any) => boolean);
    BeginInvoke: ((prop: UnityEditor.MaterialProperty, changeMask: number, previousValue: any, callback: any, object: any) => any);
    EndInvoke: ((result: any) => boolean);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum MaterialProperty_PropType {
    Color = 0,
    Vector = 1,
    Float = 2,
    Range = 3,
    Texture = 4,
  }
  export enum MaterialProperty_PropFlags {
    None = 0,
    HideInInspector = 1,
    PerRendererData = 2,
    NoScaleOffset = 4,
    Normal = 8,
    HDR = 16,
    Gamma = 32,
    NonModifiableTextureData = 64,
  }
  export enum MaterialProperty_TexDim {
    Unknown = -1,
    None = 0,
    Tex2D = 2,
    Tex3D = 3,
    Cube = 4,
    Any = 6,
  }
  export declare class Menu {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MenuCommand {
    constructor(inContext: UnityEngine.Object, inUserData: number);
    constructor(inContext: UnityEngine.Object);
    context: UnityEngine.Object;
    userData: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MeshUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MonoScript {
    constructor();
    bytes: any[];
    text: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetClass: (() => any);
    ToString: (() => string);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    GetType: (() => any);
  }
  export declare class ObjectFactory {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ObjectNames {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PackageInfo {
    packagePath: string;
    jsonInfo: string;
    iconURL: string;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum ResolutionDialogSetting {
    Disabled = 0,
    Enabled = 1,
    HiddenByDefault = 2,
  }
  export enum ScriptingImplementation {
    Mono2x = 0,
    IL2CPP = 1,
    WinRTDotNET = 2,
  }
  export enum Il2CppCompilerConfiguration {
    Debug = 0,
    Release = 1,
    Master = 2,
  }
  export enum AspectRatio {
    AspectOthers = 0,
    Aspect4by3 = 1,
    Aspect5by4 = 2,
    Aspect16by10 = 3,
    Aspect16by9 = 4,
  }
  export enum MacFullscreenMode {
    CaptureDisplay = 0,
    FullscreenWindow = 1,
    FullscreenWindowWithDockAndMenuBar = 2,
  }
  export enum D3D9FullscreenMode {
    ExclusiveMode = 0,
    FullscreenWindow = 1,
  }
  export enum D3D11FullscreenMode {
    ExclusiveMode = 0,
    FullscreenWindow = 1,
  }
  export enum StereoRenderingPath {
    MultiPass = 0,
    SinglePass = 1,
    Instancing = 2,
  }
  export enum StrippingLevel {
    Disabled = 0,
    StripAssemblies = 1,
    StripByteCode = 2,
    UseMicroMSCorlib = 3,
  }
  export enum ScriptCallOptimizationLevel {
    SlowAndSafe = 0,
    FastButNoExceptions = 1,
  }
  export enum UIOrientation {
    Portrait = 0,
    PortraitUpsideDown = 1,
    LandscapeRight = 2,
    LandscapeLeft = 3,
    AutoRotation = 4,
  }
  export enum ScriptingRuntimeVersion {
    Legacy = 0,
    Latest = 1,
  }
  export enum ApiCompatibilityLevel {
    NET_2_0 = 1,
    NET_2_0_Subset = 2,
    NET_4_6 = 3,
    NET_Web = 4,
    NET_Micro = 5,
    NET_Standard_2_0 = 6,
  }
  export enum ManagedStrippingLevel {
    Disabled = 0,
    Low = 1,
    Medium = 2,
    High = 3,
  }
  export enum ActionOnDotNetUnhandledException {
    SilentExit = 0,
    Crash = 1,
  }
  export enum SplashScreenStyle {
    Light = 0,
    Dark = 1,
  }
  export enum GraphicsJobMode {
    Native = 0,
    Legacy = 1,
  }
  export enum IconKind {
    Any = -1,
    Application = 0,
    Settings = 1,
    Notification = 2,
    Spotlight = 3,
    Store = 4,
  }
  export enum ShaderPrecisionModel {
    PlatformDefault = 0,
    Unified = 1,
  }
  export enum NormalMapEncoding {
    XYZ = 0,
    DXT5nm = 1,
  }
  export declare class PlayerSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PlayerSettings_Android {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_iOS {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_Facebook {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_Lumin {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_macOS {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_PS4 {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayerSettings_PS4_PS4AppCategory {
    Application = 0,
    Patch = 1,
    Remaster = 2,
  }
  export enum PlayerSettings_PS4_PS4RemotePlayKeyAssignment {
    None = -1,
    PatternA = 0,
    PatternB = 1,
    PatternC = 2,
    PatternD = 3,
    PatternE = 4,
    PatternF = 5,
    PatternG = 6,
    PatternH = 7,
  }
  export enum PlayerSettings_PS4_PS4EnterButtonAssignment {
    CircleButton = 0,
    CrossButton = 1,
    SystemDefined = 2,
  }
  export enum PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings {
    PerUser = 0,
    ForceDefault = 1,
    DynamicModeAtRuntime = 2,
  }
  export declare class PlayerSettings_SplashScreenLogo {
    logo: UnityEngine.Sprite;
    duration: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PlayerSettings_SplashScreen {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayerSettings_SplashScreen_AnimationMode {
    Static = 0,
    Dolly = 1,
    Custom = 2,
  }
  export enum PlayerSettings_SplashScreen_DrawMode {
    UnityLogoBelow = 0,
    AllSequential = 1,
  }
  export enum PlayerSettings_SplashScreen_UnityLogoStyle {
    DarkOnLight = 0,
    LightOnDark = 1,
  }
  export declare class PlayerSettings_Switch {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayerSettings_Switch_ScreenResolutionBehavior {
    Manual = 0,
    OperationMode = 1,
    PerformanceMode = 2,
    Both = 3,
  }
  export enum PlayerSettings_Switch_Languages {
    AmericanEnglish = 0,
    BritishEnglish = 1,
    Japanese = 2,
    French = 3,
    German = 4,
    LatinAmericanSpanish = 5,
    Spanish = 6,
    Italian = 7,
    Dutch = 8,
    CanadianFrench = 9,
    Portuguese = 10,
    Russian = 11,
    SimplifiedChinese = 12,
    TraditionalChinese = 13,
    Korean = 14,
  }
  export enum PlayerSettings_Switch_StartupUserAccount {
    None = 0,
    Required = 1,
    RequiredWithNetworkServiceAccountAvailable = 2,
  }
  export enum PlayerSettings_Switch_TouchScreenUsage {
    Supported = 0,
    Required = 1,
    None = 2,
  }
  export enum PlayerSettings_Switch_LogoHandling {
    Auto = 0,
    Manual = 1,
  }
  export enum PlayerSettings_Switch_LogoType {
    LicensedByNintendo = 0,
    DistributedByNintendo = 1,
    Nintendo = 2,
  }
  export enum PlayerSettings_Switch_ApplicationAttribute {
    None = 0,
    Demo = 1,
  }
  export enum PlayerSettings_Switch_RatingCategories {
    CERO = 0,
    GRACGCRB = 1,
    GSRMR = 2,
    ESRB = 3,
    ClassInd = 4,
    USK = 5,
    PEGI = 6,
    PEGIPortugal = 7,
    PEGIBBFC = 8,
    Russian = 9,
    ACB = 10,
    OFLC = 11,
    IARCGeneric = 12,
  }
  export enum PlayerSettings_Switch_SupportedNpadStyle {
    FullKey = 2,
    Handheld = 4,
    JoyDual = 16,
    JoyLeft = 256,
    JoyRight = 65536,
  }
  export declare class PlayerSettings_tvOS {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_WebGL {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayerSettings_WSAApplicationShowName {
    NotSet = 0,
    AllLogos = 1,
    NoLogos = 2,
    StandardLogoOnly = 3,
    WideLogoOnly = 4,
  }
  export enum PlayerSettings_WSADefaultTileSize {
    NotSet = 0,
    Medium = 1,
    Wide = 2,
  }
  export enum PlayerSettings_WSAApplicationForegroundText {
    Light = 1,
    Dark = 2,
  }
  export enum PlayerSettings_WSACapability {
    EnterpriseAuthentication = 0,
    InternetClient = 1,
    InternetClientServer = 2,
    MusicLibrary = 3,
    PicturesLibrary = 4,
    PrivateNetworkClientServer = 5,
    RemovableStorage = 6,
    SharedUserCertificates = 7,
    VideosLibrary = 8,
    WebCam = 9,
    Proximity = 10,
    Microphone = 11,
    Location = 12,
    HumanInterfaceDevice = 13,
    AllJoyn = 14,
    BlockedChatMessages = 15,
    Chat = 16,
    CodeGeneration = 17,
    Objects3D = 18,
    PhoneCall = 19,
    UserAccountInformation = 20,
    VoipCall = 21,
    Bluetooth = 22,
    SpatialPerception = 23,
    InputInjectionBrokered = 24,
    Appointments = 25,
    BackgroundMediaPlayback = 26,
    Contacts = 27,
    LowLevelDevices = 28,
    OfflineMapsManagement = 29,
    PhoneCallHistoryPublic = 30,
    PointOfService = 31,
    RecordedCallsFolder = 32,
    RemoteSystem = 33,
    SystemManagement = 34,
    UserDataTasks = 35,
    UserNotificationListener = 36,
    GazeInput = 37,
  }
  export enum PlayerSettings_WSATargetFamily {
    Desktop = 0,
    Mobile = 1,
    Xbox = 2,
    Holographic = 3,
    Team = 4,
    IoT = 5,
    IoTHeadless = 6,
  }
  export enum PlayerSettings_WSAImageScale {
    _100 = 100,
    _125 = 125,
    _150 = 150,
    _200 = 200,
    _400 = 400,
    Target16 = 16,
    Target24 = 24,
    Target32 = 32,
    Target48 = 48,
    Target256 = 256,
    _80 = 80,
    _140 = 140,
    _180 = 180,
    _240 = 240,
  }
  export enum PlayerSettings_WSAImageType {
    PackageLogo = 1,
    SplashScreenImage = 2,
    UWPSquare44x44Logo = 31,
    UWPSquare71x71Logo = 32,
    UWPSquare150x150Logo = 33,
    UWPSquare310x310Logo = 34,
    UWPWide310x150Logo = 35,
  }
  export enum PlayerSettings_WSAInputSource {
    CoreWindow = 0,
    IndependentInputSource = 1,
    SwapChainPanel = 2,
  }
  export declare class PlayerSettings_WSASupportedFileType {
    contentType: string;
    fileType: string;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PlayerSettings_WSAFileTypeAssociations {
    name: string;
    supportedFileTypes: UnityEditor.PlayerSettings_WSASupportedFileType[];
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PlayerSettings_WSA {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_WSA_Declarations {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_XboxOne {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PlayerSettings_VRWindowsMixedReality {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PlayerSettings_VRWindowsMixedReality_DepthBufferFormat {
    DepthBufferFormat16Bit = 0,
    DepthBufferFormat24Bit = 1,
  }
  export enum AndroidTargetDevice {
    FAT = 0,
    ARMv7 = 3,
  }
  export enum TargetGlesGraphics {
    OpenGLES_1_x = 0,
    OpenGLES_2_0 = 1,
    OpenGLES_3_0 = 2,
    Automatic = -1,
  }
  export enum TargetIOSGraphics {
    OpenGLES_2_0 = 2,
    OpenGLES_3_0 = 3,
    Metal = 4,
    Automatic = -1,
  }
  export enum iOSTargetResolution {
    Native = 0,
    ResolutionAutoPerformance = 3,
    ResolutionAutoQuality = 4,
    Resolution320p = 5,
    Resolution640p = 6,
    Resolution768p = 7,
  }
  export enum iOSTargetOSVersion {
    iOS_4_0 = 10,
    iOS_4_1 = 12,
    iOS_4_2 = 14,
    iOS_4_3 = 16,
    iOS_5_0 = 18,
    iOS_5_1 = 20,
    iOS_6_0 = 22,
    iOS_7_0 = 24,
    iOS_7_1 = 26,
    iOS_8_0 = 28,
    iOS_8_1 = 30,
    Unknown = 999,
  }
  export enum iOSSystemGestureDeferMode {
    None = 0,
    TopEdge = 1,
    LeftEdge = 2,
    BottomEdge = 4,
    RightEdge = 8,
    All = 15,
  }
  export enum AndroidArchitecture {
    None = 0,
    ARMv7 = 1,
    ARM64 = 2,
    All = 4294967295,
  }
  export enum AndroidSdkVersions {
    AndroidApiLevelAuto = 0,
    AndroidApiLevel16 = 16,
    AndroidApiLevel17 = 17,
    AndroidApiLevel18 = 18,
    AndroidApiLevel19 = 19,
    AndroidApiLevel21 = 21,
    AndroidApiLevel22 = 22,
    AndroidApiLevel23 = 23,
    AndroidApiLevel24 = 24,
    AndroidApiLevel25 = 25,
    AndroidApiLevel26 = 26,
    AndroidApiLevel27 = 27,
    AndroidApiLevel28 = 28,
    AndroidApiLevel29 = 29,
    AndroidApiLevel30 = 30,
  }
  export enum AndroidPreferredInstallLocation {
    Auto = 0,
    PreferExternal = 1,
    ForceInternal = 2,
  }
  export enum AndroidShowActivityIndicatorOnLoading {
    Large = 0,
    InversedLarge = 1,
    Small = 2,
    InversedSmall = 3,
    DontShow = -1,
  }
  export enum AndroidGamepadSupportLevel {
    SupportsDPad = 0,
    SupportsGamepad = 1,
    RequiresGamepad = 2,
  }
  export enum AndroidSplashScreenScale {
    Center = 0,
    ScaleToFit = 1,
    ScaleToFill = 2,
  }
  export enum AndroidBlitType {
    Always = 0,
    Never = 1,
    Auto = 2,
  }
  export enum AppleMobileArchitecture {
    ARMv7 = 0,
    ARM64 = 1,
    Universal = 2,
  }
  export enum iOSSdkVersion {
    DeviceSDK = 988,
    SimulatorSDK = 989,
  }
  export enum iOSTargetDevice {
    iPhoneOnly = 0,
    iPadOnly = 1,
    iPhoneAndiPad = 2,
  }
  export enum iOSShowActivityIndicatorOnLoading {
    WhiteLarge = 0,
    White = 1,
    Gray = 2,
    DontShow = -1,
  }
  export enum iOSStatusBarStyle {
    Default = 0,
    LightContent = 1,
    BlackTranslucent = -1,
    BlackOpaque = -1,
  }
  export enum iOSAppInBackgroundBehavior {
    Custom = -1,
    Suspend = 0,
    Exit = 1,
  }
  export enum iOSBackgroundMode {
    None = 0,
    Audio = 1,
    Location = 2,
    VOIP = 4,
    NewsstandContent = 8,
    ExternalAccessory = 16,
    BluetoothCentral = 32,
    BluetoothPeripheral = 64,
    Fetch = 128,
    RemoteNotification = 256,
  }
  export enum iOSLaunchScreenImageType {
    iPhonePortraitImage = 0,
    iPhoneLandscapeImage = 1,
    iPadImage = 2,
  }
  export enum iOSLaunchScreenType {
    Default = 0,
    ImageAndBackgroundRelative = 1,
    ImageAndBackgroundConstant = 4,
    CustomXib = 2,
    CustomStoryboard = 5,
    None = 3,
  }
  export enum ProvisioningProfileType {
    Automatic = 0,
    Development = 1,
    Distribution = 2,
  }
  export declare class iOSDeviceRequirement {
    constructor();
    values: any; // System.Collections.Generic.IDictionary`2[System.String,System.String]
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum tvOSSdkVersion {
    Device = 0,
    Simulator = 1,
  }
  export enum tvOSTargetOSVersion {
    Unknown = 0,
    tvOS_9_0 = 900,
    tvOS_9_1 = 901,
  }
  export enum WebGLExceptionSupport {
    None = 0,
    ExplicitlyThrownExceptionsOnly = 1,
    FullWithoutStacktrace = 2,
    FullWithStacktrace = 3,
  }
  export enum WebGLCompressionFormat {
    Brotli = 0,
    Gzip = 1,
    Disabled = 2,
  }
  export enum WebGLLinkerTarget {
    Asm = 0,
    Wasm = 1,
    Both = 2,
  }
  export enum WebGLWasmArithmeticExceptions {
    Throw = 0,
    Ignore = 1,
  }
  export enum XboxOneEncryptionLevel {
    None = 0,
    DevkitCompatible = 1,
    FullEncryption = 2,
  }
  export enum XboxOnePackageUpdateGranularity {
    Chunk = 1,
    File = 2,
  }
  export enum XboxOneLoggingLevel {
    AllLogging = 4,
    WarningsAndErrors = 2,
    ErrorsOnly = 1,
  }
  export enum ScriptCompiler {
    Mono = 0,
    Roslyn = 1,
  }
  export declare class SaveAssetsProcessor {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SceneVisibilityManager {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    HideAll: (() => void);
    DisableAllPicking: (() => void);
    Show: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void) | ((scene: UnityEngine.SceneManagement.Scene) => void) | ((gameObjects: UnityEngine.GameObject[], includeDescendants: boolean) => void);
    Hide: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void) | ((scene: UnityEngine.SceneManagement.Scene) => void) | ((gameObjects: UnityEngine.GameObject[], includeDescendants: boolean) => void);
    DisablePicking: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void) | ((scene: UnityEngine.SceneManagement.Scene) => void) | ((gameObjects: UnityEngine.GameObject[], includeDescendants: boolean) => void);
    EnablePicking: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void) | ((scene: UnityEngine.SceneManagement.Scene) => void) | ((gameObjects: UnityEngine.GameObject[], includeDescendants: boolean) => void);
    ShowAll: (() => void);
    EnableAllPicking: (() => void);
    IsHidden: ((gameObject: UnityEngine.GameObject, includeDescendants?: boolean) => boolean) | ((scene: UnityEngine.SceneManagement.Scene) => boolean);
    IsPickingDisabled: ((gameObject: UnityEngine.GameObject, includeDescendants?: boolean) => boolean) | ((scene: UnityEngine.SceneManagement.Scene) => boolean);
    AreAllDescendantsHidden: ((scene: UnityEngine.SceneManagement.Scene) => boolean) | ((gameObject: UnityEngine.GameObject) => boolean);
    IsPickingDisabledOnAllDescendants: ((scene: UnityEngine.SceneManagement.Scene) => boolean) | ((gameObject: UnityEngine.GameObject) => boolean);
    AreAnyDescendantsHidden: ((scene: UnityEngine.SceneManagement.Scene) => boolean);
    IsPickingDisabledOnAnyDescendant: ((scene: UnityEngine.SceneManagement.Scene) => boolean);
    Isolate: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void) | ((gameObjects: UnityEngine.GameObject[], includeDescendants: boolean) => void);
    ToggleVisibility: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void);
    TogglePicking: ((gameObject: UnityEngine.GameObject, includeDescendants: boolean) => void);
    AreAllDescendantsVisible: ((gameObject: UnityEngine.GameObject) => boolean);
    IsPickingEnabledOnAllDescendants: ((gameObject: UnityEngine.GameObject) => boolean);
    IsCurrentStageIsolated: (() => boolean);
    ExitIsolation: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ScriptableWizard {
    constructor();
    helpString: string;
    errorString: string;
    createButtonName: string;
    otherButtonName: string;
    isValid: boolean;
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum SelectionMode {
    Unfiltered = 0,
    TopLevel = 1,
    Deep = 2,
    ExcludePrefab = 4,
    Editable = 8,
    Assets = 16,
    DeepAssets = 32,
    OnlyUserModifiable = 8,
  }
  export declare class Selection {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SerializedObject {
    constructor(obj: UnityEngine.Object);
    constructor(obj: UnityEngine.Object, context: UnityEngine.Object);
    constructor(objs: UnityEngine.Object[]);
    constructor(objs: UnityEngine.Object[], context: UnityEngine.Object);
    targetObject: UnityEngine.Object;
    targetObjects: UnityEngine.Object[];
    context: UnityEngine.Object;
    hasModifiedProperties: boolean;
    isEditingMultipleObjects: boolean;
    maxArraySizeForMultiEditing: number;
    Dispose: (() => void);
    GetIterator: (() => UnityEditor.SerializedProperty);
    FindProperty: ((propertyPath: string) => UnityEditor.SerializedProperty);
    ApplyModifiedProperties: (() => boolean);
    SetIsDifferentCacheDirty: (() => void);
    Update: (() => void);
    UpdateIfDirtyOrScript: (() => void);
    UpdateIfRequiredOrScript: (() => boolean);
    ApplyModifiedPropertiesWithoutUndo: (() => boolean);
    CopyFromSerializedProperty: ((prop: UnityEditor.SerializedProperty) => void);
    CopyFromSerializedPropertyIfDifferent: ((prop: UnityEditor.SerializedProperty) => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum SerializedPropertyType {
    Generic = -1,
    Integer = 0,
    Boolean = 1,
    Float = 2,
    String = 3,
    Color = 4,
    ObjectReference = 5,
    LayerMask = 6,
    Enum = 7,
    Vector2 = 8,
    Vector3 = 9,
    Vector4 = 10,
    Rect = 11,
    ArraySize = 12,
    Character = 13,
    AnimationCurve = 14,
    Bounds = 15,
    Gradient = 16,
    Quaternion = 17,
    ExposedReference = 18,
    FixedBufferSize = 19,
    Vector2Int = 20,
    Vector3Int = 21,
    RectInt = 22,
    BoundsInt = 23,
    ManagedReference = 24,
  }
  export declare class SerializedProperty {
    serializedObject: UnityEditor.SerializedObject;
    exposedReferenceValue: UnityEngine.Object;
    hasMultipleDifferentValues: boolean;
    displayName: string;
    name: string;
    type: string;
    arrayElementType: string;
    tooltip: string;
    depth: number;
    propertyPath: string;
    editable: boolean;
    isAnimated: boolean;
    isExpanded: boolean;
    hasChildren: boolean;
    hasVisibleChildren: boolean;
    isInstantiatedPrefab: boolean;
    prefabOverride: boolean;
    isDefaultOverride: boolean;
    propertyType: UnityEditor.SerializedPropertyType;
    intValue: number;
    longValue: any; // System.Int64
    boolValue: boolean;
    floatValue: number;
    doubleValue: number;
    stringValue: string;
    colorValue: UnityEngine.Color;
    animationCurveValue: UnityEngine.AnimationCurve;
    objectReferenceValue: UnityEngine.Object;
    managedReferenceValue: any; // System.Object
    managedReferenceFullTypename: string;
    managedReferenceFieldTypename: string;
    objectReferenceInstanceIDValue: number;
    enumValueIndex: number;
    enumNames: string[];
    enumDisplayNames: string[];
    vector2Value: UnityEngine.Vector2;
    vector3Value: UnityEngine.Vector3;
    vector4Value: UnityEngine.Vector4;
    vector2IntValue: UnityEngine.Vector2Int;
    vector3IntValue: UnityEngine.Vector3Int;
    quaternionValue: UnityEngine.Quaternion;
    rectValue: UnityEngine.Rect;
    rectIntValue: UnityEngine.RectInt;
    boundsValue: UnityEngine.Bounds;
    boundsIntValue: UnityEngine.BoundsInt;
    isArray: boolean;
    arraySize: number;
    isFixedBuffer: boolean;
    fixedBufferSize: number;
    Copy: (() => UnityEditor.SerializedProperty);
    FindPropertyRelative: ((relativePropertyPath: string) => UnityEditor.SerializedProperty);
    GetEnumerator: (() => any);
    GetArrayElementAtIndex: ((index: number) => UnityEditor.SerializedProperty);
    NextVisible: ((enterChildren: boolean) => boolean);
    ClearArray: (() => void);
    Dispose: (() => void);
    Next: ((enterChildren: boolean) => boolean);
    Reset: (() => void);
    CountRemaining: (() => number);
    CountInProperty: (() => number);
    DuplicateCommand: (() => boolean);
    DeleteCommand: (() => boolean);
    GetEndProperty: (() => UnityEditor.SerializedProperty) | ((includeInvisible: boolean) => UnityEditor.SerializedProperty);
    InsertArrayElementAtIndex: ((index: number) => void);
    DeleteArrayElementAtIndex: ((index: number) => void);
    MoveArrayElement: ((srcIndex: number, dstIndex: number) => boolean);
    GetFixedBufferElementAtIndex: ((index: number) => UnityEditor.SerializedProperty);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PreprocessorOverride {
    UseProjectSettings = 0,
    ForcePlatformPreprocessor = 1,
    ForceCachingPreprocessor = 2,
  }
  export declare class ShaderInfo {
    name: string;
    supported: boolean;
    hasErrors: boolean;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ShaderMessage {
    constructor(msg: string, sev?: UnityEditor.Rendering.ShaderCompilerMessageSeverity);
    message: string;
    messageDetails: string;
    file: string;
    line: number;
    platform: UnityEditor.Rendering.ShaderCompilerPlatform;
    severity: UnityEditor.Rendering.ShaderCompilerMessageSeverity;
    Equals: ((other: UnityEditor.ShaderMessage) => boolean) | ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ShaderUtil {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum ShaderUtil_ShaderPropertyTexDim {
    TexDimNone = 0,
    TexDim2D = 2,
    TexDim3D = 3,
    TexDimCUBE = 4,
    TexDimAny = 6,
  }
  export enum ShaderUtil_ShaderPropertyType {
    Color = 0,
    Vector = 1,
    Float = 2,
    Range = 3,
    TexEnv = 4,
  }
  export declare class ShaderData {
    ActiveSubshaderIndex: number;
    SubshaderCount: number;
    SourceShader: UnityEngine.Shader;
    ActiveSubshader: UnityEditor.ShaderData_Subshader;
    GetSubshader: ((index: number) => UnityEditor.ShaderData_Subshader);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ShaderData_Subshader {
    PassCount: number;
    GetPass: ((passIndex: number) => UnityEditor.ShaderData_Pass);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ShaderData_Pass {
    SourceCode: string;
    Name: string;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum StaticEditorFlags {
    ContributeGI = 1,
    OccluderStatic = 2,
    OccludeeStatic = 16,
    BatchingStatic = 4,
    NavigationStatic = 8,
    OffMeshLinkGeneration = 32,
    ReflectionProbeStatic = 64,
    LightmapStatic = 1,
  }
  export declare class StaticOcclusionCulling {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class StaticOcclusionCullingVisualization {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class TypeCache {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class TypeCache_TypeCollection {
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains: ((item: any) => boolean) | ((item: any) => boolean);
    GetEnumerator: (() => UnityEditor.TypeCache_TypeCollection_Enumerator);
    CopyTo: ((array: any[], arrayIndex: number) => void) | ((array: any, arrayIndex: number) => void);
    IndexOf: ((item: any) => number) | ((item: any) => number);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TypeCache_TypeCollection_Enumerator {
    Current: any; // System.Type
    Dispose: (() => void);
    MoveNext: (() => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TypeCache_MethodCollection {
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains: ((item: any) => boolean) | ((item: any) => boolean);
    GetEnumerator: (() => UnityEditor.TypeCache_MethodCollection_Enumerator);
    CopyTo: ((array: any[], arrayIndex: number) => void) | ((array: any, arrayIndex: number) => void);
    IndexOf: ((item: any) => number) | ((item: any) => number);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TypeCache_MethodCollection_Enumerator {
    Current: any; // System.Reflection.MethodInfo
    Dispose: (() => void);
    MoveNext: (() => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TypeCache_FieldInfoCollection {
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains: ((item: any) => boolean) | ((item: any) => boolean);
    GetEnumerator: (() => UnityEditor.TypeCache_FieldInfoCollection_Enumerator);
    CopyTo: ((array: any[], arrayIndex: number) => void) | ((array: any, arrayIndex: number) => void);
    IndexOf: ((item: any) => number) | ((item: any) => number);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TypeCache_FieldInfoCollection_Enumerator {
    Current: any; // System.Reflection.FieldInfo
    Dispose: (() => void);
    MoveNext: (() => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class Undo {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Undo_UndoRedoCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Undo_WillFlushUndoRecord {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Undo_PostprocessModifications {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((modifications: UnityEditor.UndoPropertyModification[]) => UnityEditor.UndoPropertyModification[]);
    BeginInvoke: ((modifications: UnityEditor.UndoPropertyModification[], callback: any, object: any) => any);
    EndInvoke: ((result: any) => UnityEditor.UndoPropertyModification[]);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class UnityStats {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Unsupported {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class UnwrapParam {
    angleError: number;
    areaError: number;
    hardAngle: number;
    packMargin: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class Unwrapping {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ExternalVersionControl {
    constructor(value: string);
    ToString: (() => string);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
  }
  export declare class VersionControlSettings {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum VertexChannelCompressionFlags {
    None = 0,
    Position = 1,
    Normal = 2,
    Tangent = 4,
    Color = 8,
    TexCoord0 = 16,
    TexCoord1 = 32,
    TexCoord2 = 64,
    TexCoord3 = 128,
    kPosition = 1,
    kNormal = 2,
    kColor = 4,
    kUV0 = 8,
    kUV1 = 16,
    kUV2 = 32,
    kUV3 = 64,
    kTangent = 128,
  }
  export declare class AnimationClipSettings {
    constructor();
    additiveReferencePoseClip: UnityEngine.AnimationClip;
    additiveReferencePoseTime: number;
    startTime: number;
    stopTime: number;
    orientationOffsetY: number;
    level: number;
    cycleOffset: number;
    hasAdditiveReferencePose: boolean;
    loopTime: boolean;
    loopBlend: boolean;
    loopBlendOrientation: boolean;
    loopBlendPositionY: boolean;
    loopBlendPositionXZ: boolean;
    keepOriginalOrientation: boolean;
    keepOriginalPositionY: boolean;
    keepOriginalPositionXZ: boolean;
    heightFromFeet: boolean;
    mirror: boolean;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AnimationModeDriver {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class AnimationMode {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ObjectReferenceKeyframe {
    time: number;
    value: UnityEngine.Object;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class AnimationClipCurveData {
    constructor();
    constructor(binding: UnityEditor.EditorCurveBinding);
    path: string;
    type: any; // System.Type
    propertyName: string;
    curve: UnityEngine.AnimationCurve;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AnimationUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum AnimationUtility_CurveModifiedType {
    CurveDeleted = 0,
    CurveModified = 1,
    ClipModified = 2,
  }
  export enum AnimationUtility_TangentMode {
    Free = 0,
    Auto = 1,
    Linear = 2,
    Constant = 3,
    ClampedAuto = 4,
  }
  export declare class AnimationUtility_OnCurveWasModified {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, type: UnityEditor.AnimationUtility_CurveModifiedType) => void);
    BeginInvoke: ((clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, type: UnityEditor.AnimationUtility_CurveModifiedType, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorCurveBinding {
    isPPtrCurve: boolean;
    isDiscreteCurve: boolean;
    type: any; // System.Type
    path: string;
    propertyName: string;
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean) | ((other: UnityEditor.EditorCurveBinding) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class AnimationWindow {
    animationClip: UnityEngine.AnimationClip;
    previewing: boolean;
    canPreview: boolean;
    recording: boolean;
    canRecord: boolean;
    playing: boolean;
    time: number;
    frame: number;
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    AddItemsToMenu: ((menu: UnityEditor.GenericMenu) => void);
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum DrawCameraMode {
    UserDefined = -2147483648,
    Normal = -1,
    Textured = 0,
    Wireframe = 1,
    TexturedWire = 2,
    ShadowCascades = 3,
    RenderPaths = 4,
    AlphaChannel = 5,
    Overdraw = 6,
    Mipmaps = 7,
    DeferredDiffuse = 8,
    DeferredSpecular = 9,
    DeferredSmoothness = 10,
    DeferredNormal = 11,
    Charting = -12,
    RealtimeCharting = 12,
    Systems = 13,
    Albedo = -14,
    RealtimeAlbedo = 14,
    Emissive = -15,
    RealtimeEmissive = 15,
    Irradiance = -16,
    RealtimeIndirect = 16,
    Directionality = -17,
    RealtimeDirectionality = 17,
    Baked = -18,
    BakedLightmap = 18,
    Clustering = 19,
    LitClustering = 20,
    ValidateAlbedo = 21,
    ValidateMetalSpecular = 22,
    ShadowMasks = 23,
    LightOverlap = 24,
    BakedAlbedo = 25,
    BakedEmissive = 26,
    BakedDirectionality = 27,
    BakedTexelValidity = 28,
    BakedIndices = 29,
    BakedCharting = 30,
    SpriteMask = 31,
    BakedUVOverlap = 32,
    TextureStreaming = 33,
    BakedLightmapCulling = 34,
    GIContributorsReceivers = 35,
  }
  export declare class SceneViewCameraWindow {
    constructor(sceneView: UnityEditor.SceneView);
    editorWindow: UnityEditor.EditorWindow;
    GetWindowSize: (() => UnityEngine.Vector2);
    OnGUI: ((rect: UnityEngine.Rect) => void);
    OnOpen: (() => void);
    OnClose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetDatabase {
    constructor();
    GetAssetBundleNames: (() => string[]);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetDatabase_ImportPackageCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((packageName: string) => void);
    BeginInvoke: ((packageName: string, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetDatabase_ImportPackageFailedCallback {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((packageName: string, errorMessage: string) => void);
    BeginInvoke: ((packageName: string, errorMessage: string, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum AssetStatus {
    Calculating = -1,
    ClientOnly = 0,
    ServerOnly = 1,
    Unchanged = 2,
    Conflict = 3,
    Same = 4,
    NewVersionAvailable = 5,
    NewLocalVersion = 6,
    RestoredFromTrash = 7,
    Ignored = 8,
    BadState = 9,
  }
  export declare class AssetsItem {
    constructor();
    guid: string;
    pathName: string;
    message: string;
    exportedAssetPath: string;
    guidFolder: string;
    enabled: number;
    assetIsDir: number;
    changeFlags: number;
    previewPath: string;
    exists: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetPreview {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetImporter {
    constructor();
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class AssetImporter_SourceAssetIdentifier {
    constructor(asset: UnityEngine.Object);
    constructor(type: any, name: string);
    type: any; // System.Type
    name: string;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class MaterialEditorExtensions {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ComputeShaderImporter {
    constructor();
    preprocessorOverride: UnityEditor.PreprocessorOverride;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class DDSImporter {
    constructor();
    isReadable: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class IHVImageFormatImporter {
    constructor();
    isReadable: boolean;
    filterMode: UnityEngine.FilterMode;
    wrapMode: UnityEngine.TextureWrapMode;
    wrapModeU: UnityEngine.TextureWrapMode;
    wrapModeV: UnityEngine.TextureWrapMode;
    wrapModeW: UnityEngine.TextureWrapMode;
    streamingMipmaps: boolean;
    streamingMipmapsPriority: number;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ShaderImporter {
    constructor();
    preprocessorOverride: UnityEditor.PreprocessorOverride;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetShader: (() => UnityEngine.Shader);
    SetDefaultTextures: ((name: string[], textures: UnityEngine.Texture[]) => void);
    GetDefaultTexture: ((name: string) => UnityEngine.Texture);
    SetNonModifiableTextures: ((name: string[], textures: UnityEngine.Texture[]) => void);
    GetNonModifiableTexture: ((name: string) => UnityEngine.Texture);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SpeedTreeImporter {
    constructor();
    hasImported: boolean;
    materialFolderPath: string;
    materialLocation: UnityEditor.SpeedTreeImporter_MaterialLocation;
    isV8: boolean;
    defaultShader: UnityEngine.Shader;
    defaultBillboardShader: UnityEngine.Shader;
    scaleFactor: number;
    mainColor: UnityEngine.Color;
    specColor: UnityEngine.Color;
    shininess: number;
    hueVariation: UnityEngine.Color;
    alphaTestRef: number;
    hasBillboard: boolean;
    enableSmoothLODTransition: boolean;
    animateCrossFading: boolean;
    billboardTransitionCrossFadeWidth: number;
    fadeOutWidth: number;
    LODHeights: number[];
    castShadows: boolean[];
    receiveShadows: boolean[];
    useLightProbes: boolean[];
    reflectionProbeUsages: UnityEngine.Rendering.ReflectionProbeUsage[];
    enableBump: boolean[];
    enableHue: boolean[];
    enableSubsurface: boolean[];
    bestWindQuality: number;
    windQualities: number[];
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GenerateMaterials: (() => void);
    SearchAndRemapMaterials: ((materialFolderPath: string) => boolean);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum SpeedTreeImporter_MaterialLocation {
    External = 0,
    InPrefab = 1,
  }
  export declare class TextureImporter {
    constructor();
    textureFormat: UnityEditor.TextureImporterFormat;
    maxTextureSize: number;
    compressionQuality: number;
    crunchedCompression: boolean;
    allowAlphaSplitting: boolean;
    androidETC2FallbackOverride: UnityEditor.AndroidETC2FallbackOverride;
    textureCompression: UnityEditor.TextureImporterCompression;
    alphaSource: UnityEditor.TextureImporterAlphaSource;
    grayscaleToAlpha: boolean;
    generateCubemap: UnityEditor.TextureImporterGenerateCubemap;
    npotScale: UnityEditor.TextureImporterNPOTScale;
    isReadable: boolean;
    streamingMipmaps: boolean;
    streamingMipmapsPriority: number;
    vtOnly: boolean;
    mipmapEnabled: boolean;
    borderMipmap: boolean;
    sRGBTexture: boolean;
    mipMapsPreserveCoverage: boolean;
    alphaTestReferenceValue: number;
    mipmapFilter: UnityEditor.TextureImporterMipFilter;
    fadeout: boolean;
    mipmapFadeDistanceStart: number;
    mipmapFadeDistanceEnd: number;
    generateMipsInLinearSpace: boolean;
    correctGamma: boolean;
    linearTexture: boolean;
    normalmap: boolean;
    lightmap: boolean;
    convertToNormalmap: boolean;
    normalmapFilter: UnityEditor.TextureImporterNormalFilter;
    heightmapScale: number;
    anisoLevel: number;
    filterMode: UnityEngine.FilterMode;
    wrapMode: UnityEngine.TextureWrapMode;
    wrapModeU: UnityEngine.TextureWrapMode;
    wrapModeV: UnityEngine.TextureWrapMode;
    wrapModeW: UnityEngine.TextureWrapMode;
    mipMapBias: number;
    alphaIsTransparency: boolean;
    qualifiesForSpritePacking: boolean;
    spriteImportMode: UnityEditor.SpriteImportMode;
    spritesheet: UnityEditor.SpriteMetaData[];
    secondarySpriteTextures: UnityEngine.SecondarySpriteTexture[];
    spritePackingTag: string;
    spritePixelsPerUnit: number;
    spritePixelsToUnits: number;
    spritePivot: UnityEngine.Vector2;
    spriteBorder: UnityEngine.Vector4;
    textureType: UnityEditor.TextureImporterType;
    textureShape: UnityEditor.TextureImporterShape;
    ignorePngGamma: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetAllowsAlphaSplitting: (() => boolean);
    SetAllowsAlphaSplitting: ((flag: boolean) => void);
    GetPlatformTextureSettings: ((platform: string) => UnityEditor.TextureImporterPlatformSettings);
    GetDefaultPlatformTextureSettings: (() => UnityEditor.TextureImporterPlatformSettings);
    GetAutomaticFormat: ((platform: string) => UnityEditor.TextureImporterFormat);
    SetPlatformTextureSettings: ((platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat, compressionQuality: number, allowsAlphaSplit: boolean) => void) | ((platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat) => void) | ((platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat, allowsAlphaSplit: boolean) => void) | ((platformSettings: UnityEditor.TextureImporterPlatformSettings) => void);
    ClearPlatformTextureSettings: ((platform: string) => void);
    DoesSourceTextureHaveAlpha: (() => boolean);
    DoesSourceTextureHaveColor: (() => boolean);
    ReadTextureSettings: ((dest: UnityEditor.TextureImporterSettings) => void);
    SetTextureSettings: ((src: UnityEditor.TextureImporterSettings) => void);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum TextureImporterFormat {
    Automatic = -1,
    AutomaticCompressed = -1,
    Automatic16bit = -2,
    AutomaticTruecolor = -3,
    AutomaticCrunched = -5,
    AutomaticHDR = -6,
    AutomaticCompressedHDR = -7,
    DXT1 = 10,
    DXT5 = 12,
    RGB16 = 7,
    RGB24 = 3,
    Alpha8 = 1,
    R16 = 9,
    R8 = 63,
    RG16 = 62,
    ARGB16 = 2,
    RGBA32 = 4,
    ARGB32 = 5,
    RGBA16 = 13,
    RHalf = 15,
    RGHalf = 16,
    RGBAHalf = 17,
    RFloat = 18,
    RGFloat = 19,
    RGBAFloat = 20,
    RGB9E5 = 22,
    BC4 = 26,
    BC5 = 27,
    BC6H = 24,
    BC7 = 25,
    DXT1Crunched = 28,
    DXT5Crunched = 29,
    PVRTC_RGB2 = 30,
    PVRTC_RGBA2 = 31,
    PVRTC_RGB4 = 32,
    PVRTC_RGBA4 = 33,
    ETC_RGB4 = 34,
    ATC_RGB4 = 35,
    ATC_RGBA8 = 36,
    EAC_R = 41,
    EAC_R_SIGNED = 42,
    EAC_RG = 43,
    EAC_RG_SIGNED = 44,
    ETC2_RGB4 = 45,
    ETC2_RGB4_PUNCHTHROUGH_ALPHA = 46,
    ETC2_RGBA8 = 47,
    ASTC_4x4 = 48,
    ASTC_5x5 = 49,
    ASTC_6x6 = 50,
    ASTC_8x8 = 51,
    ASTC_10x10 = 52,
    ASTC_12x12 = 53,
    ASTC_RGB_4x4 = 48,
    ASTC_RGB_5x5 = 49,
    ASTC_RGB_6x6 = 50,
    ASTC_RGB_8x8 = 51,
    ASTC_RGB_10x10 = 52,
    ASTC_RGB_12x12 = 53,
    ASTC_RGBA_4x4 = 54,
    ASTC_RGBA_5x5 = 55,
    ASTC_RGBA_6x6 = 56,
    ASTC_RGBA_8x8 = 57,
    ASTC_RGBA_10x10 = 58,
    ASTC_RGBA_12x12 = 59,
    ETC_RGB4_3DS = 60,
    ETC_RGBA8_3DS = 61,
    ETC_RGB4Crunched = 64,
    ETC2_RGBA8Crunched = 65,
    ASTC_HDR_4x4 = 66,
    ASTC_HDR_5x5 = 67,
    ASTC_HDR_6x6 = 68,
    ASTC_HDR_8x8 = 69,
    ASTC_HDR_10x10 = 70,
    ASTC_HDR_12x12 = 71,
    RG32 = 72,
    RGB48 = 73,
    RGBA64 = 74,
  }
  export enum TextureImporterMipFilter {
    BoxFilter = 0,
    KaiserFilter = 1,
  }
  export enum TextureImporterGenerateCubemap {
    None = 0,
    Spheremap = 1,
    Cylindrical = 2,
    SimpleSpheremap = 3,
    NiceSpheremap = 4,
    FullCubemap = 5,
    AutoCubemap = 6,
  }
  export enum TextureImporterNPOTScale {
    None = 0,
    ToNearest = 1,
    ToLarger = 2,
    ToSmaller = 3,
  }
  export enum TextureImporterNormalFilter {
    Standard = 0,
    Sobel = 1,
  }
  export enum TextureImporterAlphaSource {
    None = 0,
    FromInput = 1,
    FromGrayScale = 2,
  }
  export enum TextureImporterSingleChannelComponent {
    Alpha = 0,
    Red = 1,
  }
  export enum TextureImporterType {
    Default = 0,
    Image = 0,
    Bump = 1,
    NormalMap = 1,
    GUI = 2,
    Sprite = 8,
    Cursor = 7,
    Cubemap = 3,
    Reflection = 3,
    Cookie = 4,
    Lightmap = 6,
    HDRI = 9,
    Advanced = 5,
    SingleChannel = 10,
    Shadowmask = 11,
    DirectionalLightmap = 12,
  }
  export enum TextureImporterCompression {
    Uncompressed = 0,
    Compressed = 1,
    CompressedHQ = 2,
    CompressedLQ = 3,
  }
  export enum TextureResizeAlgorithm {
    Mitchell = 0,
    Bilinear = 1,
  }
  export enum TextureImporterShape {
    Texture2D = 1,
    TextureCube = 2,
    Texture2DArray = 4,
    Texture3D = 8,
  }
  export enum SpriteImportMode {
    None = 0,
    Single = 1,
    Multiple = 2,
    Polygon = 3,
  }
  export enum AndroidETC2FallbackOverride {
    UseBuildSettings = 0,
    Quality32Bit = 1,
    Quality16Bit = 2,
    Quality32BitDownscaled = 3,
  }
  export declare class SpriteMetaData {
    name: string;
    rect: UnityEngine.Rect;
    alignment: number;
    pivot: UnityEngine.Vector2;
    border: UnityEngine.Vector4;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TextureImporterSettings {
    constructor();
    textureType: UnityEditor.TextureImporterType;
    textureShape: UnityEditor.TextureImporterShape;
    mipmapFilter: UnityEditor.TextureImporterMipFilter;
    mipmapEnabled: boolean;
    generateMipsInLinearSpace: boolean;
    sRGBTexture: boolean;
    fadeOut: boolean;
    borderMipmap: boolean;
    mipMapsPreserveCoverage: boolean;
    alphaTestReferenceValue: number;
    mipmapFadeDistanceStart: number;
    mipmapFadeDistanceEnd: number;
    convertToNormalMap: boolean;
    heightmapScale: number;
    normalMapFilter: UnityEditor.TextureImporterNormalFilter;
    alphaSource: UnityEditor.TextureImporterAlphaSource;
    singleChannelComponent: UnityEditor.TextureImporterSingleChannelComponent;
    flipbookRows: number;
    flipbookColumns: number;
    readable: boolean;
    streamingMipmaps: boolean;
    streamingMipmapsPriority: number;
    vtOnly: boolean;
    npotScale: UnityEditor.TextureImporterNPOTScale;
    generateCubemap: UnityEditor.TextureImporterGenerateCubemap;
    cubemapConvolution: UnityEditor.TextureImporterCubemapConvolution;
    seamlessCubemap: boolean;
    filterMode: UnityEngine.FilterMode;
    aniso: number;
    mipmapBias: number;
    wrapMode: UnityEngine.TextureWrapMode;
    wrapModeU: UnityEngine.TextureWrapMode;
    wrapModeV: UnityEngine.TextureWrapMode;
    wrapModeW: UnityEngine.TextureWrapMode;
    alphaIsTransparency: boolean;
    ignorePngGamma: boolean;
    spriteMode: number;
    spritePixelsPerUnit: number;
    spritePixelsToUnits: number;
    spriteTessellationDetail: number;
    spriteExtrude: any; // System.UInt32
    spriteMeshType: UnityEngine.SpriteMeshType;
    spriteAlignment: number;
    spritePivot: UnityEngine.Vector2;
    spriteBorder: UnityEngine.Vector4;
    spriteGenerateFallbackPhysicsShape: boolean;
    linearTexture: boolean;
    normalMap: boolean;
    textureFormat: UnityEditor.TextureImporterFormat;
    maxTextureSize: number;
    lightmap: boolean;
    rgbm: UnityEditor.TextureImporterRGBMMode;
    grayscaleToAlpha: boolean;
    cubemapConvolutionSteps: number;
    cubemapConvolutionExponent: number;
    compressionQuality: number;
    CopyTo: ((target: UnityEditor.TextureImporterSettings) => void);
    ApplyTextureType: ((type: UnityEditor.TextureImporterType, applyAll: boolean) => void) | ((type: UnityEditor.TextureImporterType) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class TextureImporterPlatformSettings {
    constructor();
    name: string;
    overridden: boolean;
    maxTextureSize: number;
    resizeAlgorithm: UnityEditor.TextureResizeAlgorithm;
    format: UnityEditor.TextureImporterFormat;
    textureCompression: UnityEditor.TextureImporterCompression;
    compressionQuality: number;
    crunchedCompression: boolean;
    allowsAlphaSplitting: boolean;
    androidETC2FallbackOverride: UnityEditor.AndroidETC2FallbackOverride;
    CopyTo: ((target: UnityEditor.TextureImporterPlatformSettings) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetStoreAsset {
    constructor();
    Preview: UnityEngine.Object;
    HasLivePreview: boolean;
    id: number;
    name: string;
    displayName: string;
    staticPreviewURL: string;
    dynamicPreviewURL: string;
    className: string;
    price: string;
    packageID: number;
    previewImage: UnityEngine.Texture2D;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AudioCurveRendering {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AudioCurveRendering_AudioCurveEvaluator {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((x: number) => number);
    BeginInvoke: ((x: number, callback: any, object: any) => any);
    EndInvoke: ((result: any) => number);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AudioCurveRendering_AudioCurveAndColorEvaluator {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AudioCurveRendering_AudioMinMaxCurveAndColorEvaluator {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class IAudioEffectPlugin {
    SetFloatParameter: ((name: string, value: number) => boolean);
    GetSampleRate: (() => number);
    IsPluginEditableAndEnabled: (() => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class IAudioEffectPluginGUI {
    Name: string;
    Description: string;
    Vendor: string;
    OnGUI: ((plugin: UnityEditor.IAudioEffectPlugin) => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Sysroot {
    Name: string;
    HostPlatform: string;
    HostArch: string;
    TargetPlatform: string;
    TargetArch: string;
    Initialize: (() => boolean);
    GetIl2CppArguments: (() => any);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class CameraProjectionCache {
    constructor(camera: UnityEngine.Camera);
    WorldToScreenPoint: ((worldPoint: UnityEngine.Vector3) => UnityEngine.Vector2);
    WorldToGUIPoint: ((worldPoint: UnityEngine.Vector3) => UnityEngine.Vector2);
    GUIToScreenPoint: ((guiPoint: UnityEngine.Vector2) => UnityEngine.Vector2);
    ScreenToGUIPoint: ((screenPoint: UnityEngine.Vector2) => UnityEngine.Vector2);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class CommandHandler {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((context: UnityEditor.CommandExecuteContext) => void);
    BeginInvoke: ((context: UnityEditor.CommandExecuteContext, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum CommandHint {
    Undefined = -1,
    None = 0,
    Event = 1,
    Menu = 2,
    Shortcut = 4,
    Shelf = 8,
    UI = 1048576,
    OnGUI = 3145728,
    UIElements = 5242880,
    Validate = 1073741824,
    UserDefined = -2147483648,
    Any = -1,
  }
  export declare class CommandExecuteContext {
    constructor();
    data: any; // System.Object
    args: any[];
    result: any; // System.Object
    hint: UnityEditor.CommandHint;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class CommandService {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ModeService {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ModeService_ModeChangedArgs {
    prevIndex: number;
    nextIndex: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum GameViewSizeGroupType {
    Standalone = 0,
    WebPlayer = 1,
    iOS = 2,
    Android = 3,
    PS3 = 4,
    WiiU = 5,
    Tizen = 6,
    WP8 = 7,
    N3DS = 8,
    HMD = 9,
  }
  export declare class LightingDataAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class LightmapEditorSettings {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum LightmapEditorSettings_Lightmapper {
    Radiosity = 0,
    Enlighten = 0,
    PathTracer = 1,
    ProgressiveCPU = 1,
    ProgressiveGPU = 2,
  }
  export enum LightmapEditorSettings_Sampling {
    Auto = 0,
    Fixed = 1,
  }
  export enum LightmapEditorSettings_FilterMode {
    None = 0,
    Auto = 1,
    Advanced = 2,
  }
  export enum LightmapEditorSettings_DenoiserType {
    None = 0,
    Optix = 1,
    OpenImage = 2,
    RadeonPro = 3,
  }
  export enum LightmapEditorSettings_FilterType {
    Gaussian = 0,
    ATrous = 1,
    None = 2,
  }
  export enum LightmapEditorSettings_GIBakeBackend {
    Radiosity = 0,
    PathTracer = 1,
  }
  export enum LightmapEditorSettings_PathTracerSampling {
    Auto = 0,
    Fixed = 1,
  }
  export enum LightmapEditorSettings_PathTracerFilter {
    Gaussian = 0,
    ATrous = 1,
  }
  export enum LightmapBakeQuality {
    High = 0,
    Low = 1,
  }
  export declare class LightmapParameters {
    constructor();
    resolution: number;
    clusterResolution: number;
    irradianceBudget: number;
    irradianceQuality: number;
    modellingTolerance: number;
    stitchEdges: boolean;
    isTransparent: boolean;
    systemTag: number;
    blurRadius: number;
    antiAliasingSamples: number;
    directLightQuality: number;
    pushoff: number;
    bakedLightmapTag: number;
    limitLightmapCount: boolean;
    maxLightmapCount: number;
    AOQuality: number;
    AOAntiAliasingSamples: number;
    backFaceTolerance: number;
    edgeStitching: number;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    AssignToLightingSettings: ((lightingSettings: UnityEngine.LightingSettings) => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class Lightmapping {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum Lightmapping_GIWorkflowMode {
    Iterative = 0,
    OnDemand = 1,
    Legacy = 2,
  }
  export declare class Lightmapping_OnStartedFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Lightmapping_OnCompletedFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LightmapSnapshot {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorMaterialUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorSnapSettings {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ColorPickerHDRConfig {
    constructor(minBrightness: number, maxBrightness: number, minExposureValue: number, maxExposureValue: number);
    minBrightness: number;
    maxBrightness: number;
    minExposureValue: number;
    maxExposureValue: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorStyles {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GenericMenu {
    constructor();
    allowDuplicateNames: boolean;
    AddItem: ((content: UnityEngine.GUIContent, on: boolean, func: UnityEditor.GenericMenu_MenuFunction) => void) | ((content: UnityEngine.GUIContent, on: boolean, func: UnityEditor.GenericMenu_MenuFunction2, userData: any) => void);
    AddDisabledItem: ((content: UnityEngine.GUIContent) => void) | ((content: UnityEngine.GUIContent, on: boolean) => void);
    AddSeparator: ((path: string) => void);
    GetItemCount: (() => number);
    ShowAsContext: (() => void);
    DropDown: ((position: UnityEngine.Rect) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GenericMenu_MenuFunction {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: (() => void);
    BeginInvoke: ((callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GenericMenu_MenuFunction2 {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((userData: any) => void);
    BeginInvoke: ((userData: any, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PopupWindowContent {
    editorWindow: UnityEditor.EditorWindow;
    OnGUI: ((rect: UnityEngine.Rect) => void);
    GetWindowSize: (() => UnityEngine.Vector2);
    OnOpen: (() => void);
    OnClose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PopupWindow {
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum ViewTool {
    None = -1,
    Orbit = 0,
    Pan = 1,
    Zoom = 2,
    FPS = 3,
  }
  export enum PivotMode {
    Center = 0,
    Pivot = 1,
  }
  export enum PivotRotation {
    Local = 0,
    Global = 1,
  }
  export enum Tool {
    View = 0,
    Move = 1,
    Rotate = 2,
    Scale = 3,
    Rect = 4,
    Transform = 5,
    Custom = 6,
    None = -1,
  }
  export declare class Tools {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum TextureImporterCubemapConvolution {
    None = 0,
    Specular = 1,
    Diffuse = 2,
  }
  export enum TextureImporterRGBMMode {
    Auto = 0,
    On = 1,
    Off = 2,
    Encoded = 3,
  }
  export declare class CameraEditor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnEnable: (() => void);
    OnDisable: (() => void);
    OnDestroy: (() => void);
    OnInspectorGUI: (() => void);
    OnOverlayGUI: ((target: UnityEngine.Object, sceneView: UnityEditor.SceneView) => void);
    OnSceneGUI: (() => void);
    DrawDefaultInspector: (() => boolean);
    Repaint: (() => void);
    CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
    RequiresConstantRepaint: (() => boolean);
    DrawHeader: (() => void);
    HasPreviewGUI: (() => boolean);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewSettings: (() => void);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    UseDefaultMargins: (() => boolean);
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class CameraEditor_Settings {
    constructor(so: UnityEditor.SerializedObject);
    clearFlags: UnityEditor.SerializedProperty;
    backgroundColor: UnityEditor.SerializedProperty;
    normalizedViewPortRect: UnityEditor.SerializedProperty;
    sensorSize: UnityEditor.SerializedProperty;
    lensShift: UnityEditor.SerializedProperty;
    focalLength: UnityEditor.SerializedProperty;
    gateFit: UnityEditor.SerializedProperty;
    verticalFOV: UnityEditor.SerializedProperty;
    orthographic: UnityEditor.SerializedProperty;
    orthographicSize: UnityEditor.SerializedProperty;
    depth: UnityEditor.SerializedProperty;
    cullingMask: UnityEditor.SerializedProperty;
    renderingPath: UnityEditor.SerializedProperty;
    occlusionCulling: UnityEditor.SerializedProperty;
    targetTexture: UnityEditor.SerializedProperty;
    HDR: UnityEditor.SerializedProperty;
    allowMSAA: UnityEditor.SerializedProperty;
    allowDynamicResolution: UnityEditor.SerializedProperty;
    stereoConvergence: UnityEditor.SerializedProperty;
    stereoSeparation: UnityEditor.SerializedProperty;
    nearClippingPlane: UnityEditor.SerializedProperty;
    farClippingPlane: UnityEditor.SerializedProperty;
    fovAxisMode: UnityEditor.SerializedProperty;
    targetDisplay: UnityEditor.SerializedProperty;
    targetEye: UnityEditor.SerializedProperty;
    OnEnable: (() => void);
    Update: (() => void);
    ApplyModifiedProperties: (() => void);
    DrawClearFlags: (() => void);
    DrawBackgroundColor: (() => void);
    DrawCullingMask: (() => void);
    DrawProjection: (() => void);
    DrawClippingPlanes: (() => void);
    DrawNormalizedViewPort: (() => void);
    DrawDepth: (() => void);
    DrawRenderingPath: (() => void);
    DrawTargetTexture: ((deferred: boolean) => void);
    DrawOcclusionCulling: (() => void);
    DrawHDR: (() => void);
    DrawMSAA: (() => void);
    DrawDynamicResolution: (() => void);
    DrawVR: (() => void);
    DrawMultiDisplay: (() => void);
    DrawTargetEye: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class CameraEditorUtils {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ObjectPreview {
    constructor();
    target: UnityEngine.Object;
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    HasPreviewGUI: (() => boolean);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewSettings: (() => void);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Editor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    DrawDefaultInspector: (() => boolean);
    Repaint: (() => void);
    OnInspectorGUI: (() => void);
    CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
    RequiresConstantRepaint: (() => boolean);
    DrawHeader: (() => void);
    HasPreviewGUI: (() => boolean);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewSettings: (() => void);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    UseDefaultMargins: (() => boolean);
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class LightEditor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnInspectorGUI: (() => void);
    DrawDefaultInspector: (() => boolean);
    Repaint: (() => void);
    CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
    RequiresConstantRepaint: (() => boolean);
    DrawHeader: (() => void);
    HasPreviewGUI: (() => boolean);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewSettings: (() => void);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    UseDefaultMargins: (() => boolean);
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class LightEditor_Settings {
    constructor(so: UnityEditor.SerializedObject);
    lightType: UnityEditor.SerializedProperty;
    lightShape: UnityEditor.SerializedProperty;
    range: UnityEditor.SerializedProperty;
    spotAngle: UnityEditor.SerializedProperty;
    innerSpotAngle: UnityEditor.SerializedProperty;
    cookieSize: UnityEditor.SerializedProperty;
    color: UnityEditor.SerializedProperty;
    intensity: UnityEditor.SerializedProperty;
    bounceIntensity: UnityEditor.SerializedProperty;
    colorTemperature: UnityEditor.SerializedProperty;
    useColorTemperature: UnityEditor.SerializedProperty;
    cookieProp: UnityEditor.SerializedProperty;
    shadowsType: UnityEditor.SerializedProperty;
    shadowsStrength: UnityEditor.SerializedProperty;
    shadowsResolution: UnityEditor.SerializedProperty;
    shadowsBias: UnityEditor.SerializedProperty;
    shadowsNormalBias: UnityEditor.SerializedProperty;
    shadowsNearPlane: UnityEditor.SerializedProperty;
    halo: UnityEditor.SerializedProperty;
    flare: UnityEditor.SerializedProperty;
    renderMode: UnityEditor.SerializedProperty;
    cullingMask: UnityEditor.SerializedProperty;
    renderingLayerMask: UnityEditor.SerializedProperty;
    lightmapping: UnityEditor.SerializedProperty;
    areaSizeX: UnityEditor.SerializedProperty;
    areaSizeY: UnityEditor.SerializedProperty;
    bakedShadowRadiusProp: UnityEditor.SerializedProperty;
    bakedShadowAngleProp: UnityEditor.SerializedProperty;
    isRealtime: boolean;
    isMixed: boolean;
    isCompletelyBaked: boolean;
    isBakedOrMixed: boolean;
    isAreaLightType: boolean;
    light: UnityEngine.Light;
    cookie: UnityEngine.Texture;
    OnEnable: (() => void);
    OnDestroy: (() => void);
    Update: (() => void);
    DrawLightType: (() => void);
    DrawRange: (() => void) | ((showAreaOptions: boolean) => void);
    DrawSpotAngle: (() => void);
    DrawInnerAndOuterSpotAngle: (() => void);
    DrawArea: (() => void);
    DrawColor: (() => void);
    DrawLightmapping: (() => void);
    DrawIntensity: (() => void);
    DrawBounceIntensity: (() => void);
    DrawCookie: (() => void);
    DrawCookieSize: (() => void);
    DrawHalo: (() => void);
    DrawFlare: (() => void);
    DrawRenderMode: (() => void);
    DrawCullingMask: (() => void);
    DrawRenderingLayerMask: (() => void);
    ApplyModifiedProperties: (() => void);
    DrawShadowsType: (() => void);
    DrawBakedShadowRadius: (() => void);
    DrawBakedShadowAngle: (() => void);
    DrawRuntimeShadow: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MaterialEditor {
    constructor();
    isVisible: boolean;
    customShaderGUI: UnityEditor.ShaderGUI;
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetShader: ((shader: UnityEngine.Shader) => void) | ((newShader: UnityEngine.Shader, registerUndo: boolean) => void);
    Awake: (() => void);
    OnInspectorGUI: (() => void);
    PropertiesChanged: (() => void);
    SetFloat: ((propertyName: string, value: number) => void);
    SetColor: ((propertyName: string, value: UnityEngine.Color) => void);
    SetVector: ((propertyName: string, value: UnityEngine.Vector4) => void);
    SetTexture: ((propertyName: string, value: UnityEngine.Texture) => void);
    SetTextureScale: ((propertyName: string, value: UnityEngine.Vector2, coord: number) => void);
    SetTextureOffset: ((propertyName: string, value: UnityEngine.Vector2, coord: number) => void);
    RangeProperty: ((prop: UnityEditor.MaterialProperty, label: string) => number) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => number) | ((propertyName: string, label: string, v2: number, v3: number) => number);
    FloatProperty: ((prop: UnityEditor.MaterialProperty, label: string) => number) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => number) | ((propertyName: string, label: string) => number);
    ColorProperty: ((prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Color) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Color) | ((propertyName: string, label: string) => UnityEngine.Color);
    VectorProperty: ((prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Vector4) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Vector4) | ((propertyName: string, label: string) => UnityEngine.Vector4);
    TextureScaleOffsetProperty: ((property: UnityEditor.MaterialProperty) => void) | ((position: UnityEngine.Rect, property: UnityEditor.MaterialProperty) => number) | ((position: UnityEngine.Rect, property: UnityEditor.MaterialProperty, partOfTexturePropertyControl: boolean) => number);
    TextureProperty: ((prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Texture) | ((prop: UnityEditor.MaterialProperty, label: string, scaleOffset: boolean) => UnityEngine.Texture) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => UnityEngine.Texture) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, scaleOffset: boolean) => UnityEngine.Texture) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, tooltip: string, scaleOffset: boolean) => UnityEngine.Texture) | ((propertyName: string, label: string, texDim: UnityEditor.ShaderUtil_ShaderPropertyTexDim) => UnityEngine.Texture) | ((propertyName: string, label: string, texDim: UnityEditor.ShaderUtil_ShaderPropertyTexDim, scaleOffset: boolean) => UnityEngine.Texture);
    HelpBoxWithButton: ((messageContent: UnityEngine.GUIContent, buttonContent: UnityEngine.GUIContent) => boolean);
    TextureCompatibilityWarning: ((prop: UnityEditor.MaterialProperty) => void);
    TexturePropertyMiniThumbnail: ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, tooltip: string) => UnityEngine.Texture);
    GetTexturePropertyCustomArea: ((position: UnityEngine.Rect) => UnityEngine.Rect);
    GetPropertyHeight: ((prop: UnityEditor.MaterialProperty) => number) | ((prop: UnityEditor.MaterialProperty, label: string) => number);
    BeginAnimatedCheck: ((totalPosition: UnityEngine.Rect, prop: UnityEditor.MaterialProperty) => void) | ((prop: UnityEditor.MaterialProperty) => void);
    EndAnimatedCheck: (() => void);
    ShaderProperty: ((prop: UnityEditor.MaterialProperty, label: string) => void) | ((prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent) => void) | ((prop: UnityEditor.MaterialProperty, label: string, labelIndent: number) => void) | ((prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, labelIndent: number) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, labelIndent: number) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, labelIndent: number) => void) | ((shader: UnityEngine.Shader, propertyIndex: number) => void);
    LightmapEmissionProperty: (() => void) | ((labelIndent: number) => void) | ((position: UnityEngine.Rect, labelIndent: number) => void);
    EmissionEnabledProperty: (() => boolean);
    LightmapEmissionFlagsProperty: ((indent: number, enabled: boolean) => void) | ((indent: number, enabled: boolean, ignoreEmissionColor: boolean) => void);
    DefaultShaderProperty: ((prop: UnityEditor.MaterialProperty, label: string) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string) => void);
    SetDefaultGUIWidths: (() => void);
    PropertiesGUI: (() => boolean);
    PropertiesDefaultGUI: ((props: UnityEditor.MaterialProperty[]) => void);
    RegisterPropertyChangeUndo: ((label: string) => void);
    OnPreviewSettings: (() => void);
    DefaultPreviewSettingsGUI: (() => void);
    RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
    HasPreviewGUI: (() => boolean);
    RequiresConstantRepaint: (() => boolean);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    DefaultPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnEnable: (() => void);
    UndoRedoPerformed: (() => void);
    OnDisable: (() => void);
    RenderQueueField: (() => void) | ((r: UnityEngine.Rect) => void);
    EnableInstancingField: (() => boolean) | ((r: UnityEngine.Rect) => void);
    IsInstancingEnabled: (() => boolean);
    DoubleSidedGIField: (() => boolean);
    TexturePropertySingleLine: ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty) => UnityEngine.Rect) | ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty) => UnityEngine.Rect) | ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty, extraProperty2: UnityEditor.MaterialProperty) => UnityEngine.Rect);
    TexturePropertyWithHDRColor: ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, colorProperty: UnityEditor.MaterialProperty, hdrConfig: UnityEditor.ColorPickerHDRConfig, showAlpha: boolean) => UnityEngine.Rect) | ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, colorProperty: UnityEditor.MaterialProperty, showAlpha: boolean) => UnityEngine.Rect);
    TexturePropertyTwoLines: ((label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty, label2: UnityEngine.GUIContent, extraProperty2: UnityEditor.MaterialProperty) => UnityEngine.Rect);
    DrawDefaultInspector: (() => boolean);
    Repaint: (() => void);
    CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
    DrawHeader: (() => void);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    UseDefaultMargins: (() => boolean);
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class MaterialPropertyDrawer {
    OnGUI: ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, editor: UnityEditor.MaterialEditor) => void) | ((position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, editor: UnityEditor.MaterialEditor) => void);
    GetPropertyHeight: ((prop: UnityEditor.MaterialProperty, label: string, editor: UnityEditor.MaterialEditor) => number);
    Apply: ((prop: UnityEditor.MaterialProperty) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PreviewRenderUtility {
    constructor(renderFullScene: boolean);
    constructor(renderFullScene: boolean, pixelPerfect: boolean);
    constructor();
    camera: UnityEngine.Camera;
    cameraFieldOfView: number;
    ambientColor: UnityEngine.Color;
    lights: UnityEngine.Light[];
    m_Camera: UnityEngine.Camera;
    m_CameraFieldOfView: number;
    m_Light: UnityEngine.Light[];
    Cleanup: (() => void);
    BeginPreview: ((r: UnityEngine.Rect, previewBackground: UnityEngine.GUIStyle) => void);
    BeginStaticPreview: ((r: UnityEngine.Rect) => void);
    GetScaleFactor: ((width: number, height: number) => number);
    BeginStaticPreviewHDR: ((r: UnityEngine.Rect) => void);
    BeginPreviewHDR: ((r: UnityEngine.Rect, previewBackground: UnityEngine.GUIStyle) => void);
    EndPreview: (() => UnityEngine.Texture);
    EndAndDrawPreview: ((r: UnityEngine.Rect) => void);
    EndStaticPreview: (() => UnityEngine.Texture2D);
    AddSingleGO: ((go: UnityEngine.GameObject, instantiateAtZero: boolean) => void) | ((go: UnityEngine.GameObject) => void);
    InstantiatePrefabInScene: ((prefab: UnityEngine.GameObject) => UnityEngine.GameObject);
    DrawMesh: ((mesh: UnityEngine.Mesh, matrix: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number) => void) | ((mesh: UnityEngine.Mesh, matrix: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock) => void) | ((mesh: UnityEngine.Mesh, m: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean) => void) | ((mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number) => void) | ((mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock) => void) | ((mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform) => void) | ((mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean) => void) | ((mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, scale: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean) => void);
    Render: ((allowScriptableRenderPipeline?: boolean, updatefov?: boolean) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ShaderGUI {
    OnGUI: ((materialEditor: UnityEditor.MaterialEditor, properties: UnityEditor.MaterialProperty[]) => void);
    OnMaterialPreviewGUI: ((materialEditor: UnityEditor.MaterialEditor, r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnMaterialInteractivePreviewGUI: ((materialEditor: UnityEditor.MaterialEditor, r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnMaterialPreviewSettingsGUI: ((materialEditor: UnityEditor.MaterialEditor) => void);
    OnClosed: ((material: UnityEngine.Material) => void);
    AssignNewShaderToMaterial: ((material: UnityEngine.Material, oldShader: UnityEngine.Shader, newShader: UnityEngine.Shader) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class TransformUtils {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum BodyPart {
    None = -1,
    Avatar = 0,
    Body = 1,
    Head = 2,
    LeftArm = 3,
    LeftFingers = 4,
    RightArm = 5,
    RightFingers = 6,
    LeftLeg = 7,
    RightLeg = 8,
    Last = 9,
  }
  export enum BoneState {
    None = 0,
    NotFound = 1,
    Duplicate = 2,
    InvalidHierarchy = 3,
    BoneLenghtIsZero = 4,
    Valid = 5,
  }
  export declare class PlatformIcon {
    layerCount: number;
    maxLayerCount: number;
    minLayerCount: number;
    width: number;
    height: number;
    kind: UnityEditor.PlatformIconKind;
    GetTexture: ((layer?: number) => UnityEngine.Texture2D);
    GetTextures: (() => UnityEngine.Texture2D[]);
    SetTexture: ((texture: UnityEngine.Texture2D, layer?: number) => void);
    SetTextures: ((textures: UnityEngine.Texture2D[]) => void);
    ToString: (() => string);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
  }
  export declare class PlatformIconKind {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PrefabUtility {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PrefabUtility_PrefabInstanceUpdated {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((instance: UnityEngine.GameObject) => void);
    BeginInvoke: ((instance: UnityEngine.GameObject, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PrefabUtility_EditPrefabContentsScope {
    constructor(assetPath: string);
    assetPath: string;
    prefabContentsRoot: UnityEngine.GameObject;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum PrefabAssetType {
    NotAPrefab = 0,
    Regular = 1,
    Model = 2,
    Variant = 3,
    MissingAsset = 4,
  }
  export enum PrefabInstanceStatus {
    NotAPrefab = 0,
    Connected = 1,
    Disconnected = 2,
    MissingAsset = 3,
  }
  export enum PrefabUnpackMode {
    OutermostRoot = 0,
    Completely = 1,
  }
  export enum PrefabType {
    None = 0,
    Prefab = 1,
    ModelPrefab = 2,
    PrefabInstance = 3,
    ModelPrefabInstance = 4,
    MissingPrefabInstance = 5,
    DisconnectedPrefabInstance = 6,
    DisconnectedModelPrefabInstance = 7,
  }
  export enum ReplacePrefabOptions {
    Default = 0,
    ConnectToPrefab = 1,
    ReplaceNameBased = 2,
  }
  export declare class PropertyModification {
    constructor();
    target: UnityEngine.Object;
    propertyPath: string;
    value: string;
    objectReference: UnityEngine.Object;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum SaveType {
    Binary = 0,
    Text = 1,
  }
  export declare class Progress {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum Progress_Status {
    Running = 0,
    Succeeded = 1,
    Failed = 2,
    Canceled = 3,
    Paused = 4,
  }
  export enum Progress_Options {
    None = 0,
    Sticky = 1,
    Indefinite = 2,
    Synchronous = 4,
    Managed = 8,
    Unmanaged = 16,
  }
  export enum Progress_TimeDisplayMode {
    NoTimeShown = 0,
    ShowRunningTime = 1,
    ShowRemainingTime = 2,
  }
  export enum Progress_Priority {
    Unresponsive = 0,
    Idle = 1,
    Low = 2,
    Normal = 6,
    High = 10,
  }
  export declare class Progress_Item {
    name: string;
    description: string;
    id: number;
    progress: number;
    currentStep: number;
    totalSteps: number;
    stepLabel: string;
    parentId: number;
    startTime: any; // System.DateTime
    updateTime: any; // System.DateTime
    status: UnityEditor.Progress_Status;
    options: UnityEditor.Progress_Options;
    timeDisplayMode: UnityEditor.Progress_TimeDisplayMode;
    priority: number;
    remainingTime: any; // System.TimeSpan
    finished: boolean;
    running: boolean;
    paused: boolean;
    responding: boolean;
    cancellable: boolean;
    pausable: boolean;
    indefinite: boolean;
    elapsedTime: number;
    exists: boolean;
    Report: ((newProgress: number) => void) | ((newCurrentStep: number, newTotalSteps: number) => void) | ((newProgress: number, newDescription: string) => void) | ((newCurrentStep: number, newTotalSteps: number, newDescription: string) => void);
    Cancel: (() => boolean);
    Pause: (() => boolean);
    Resume: (() => boolean);
    Finish: ((finishedStatus?: UnityEditor.Progress_Status) => void);
    Remove: (() => number);
    RegisterCancelCallback: ((callback: any) => void);
    UnregisterCancelCallback: (() => void);
    RegisterPauseCallback: ((callback: any) => void);
    UnregisterPauseCallback: (() => void);
    SetDescription: ((newDescription: string) => void);
    SetTimeDisplayMode: ((mode: UnityEditor.Progress_TimeDisplayMode) => void);
    SetRemainingTime: ((seconds: any) => void);
    SetPriority: ((priority: number) => void) | ((priority: UnityEditor.Progress_Priority) => void);
    ClearRemainingTime: (() => void);
    SetStepLabel: ((label: string) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ProjectWindowUtil {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SearchableEditorWindow {
    constructor();
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnEnable: (() => void);
    OnDisable: (() => void);
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum SearchableEditorWindow_SearchMode {
    All = 0,
    Name = 1,
    Type = 2,
    Label = 3,
    AssetBundleName = 4,
  }
  export enum SearchableEditorWindow_SearchModeHierarchyWindow {
    All = 0,
    Name = 1,
    Type = 2,
  }
  export declare class DefaultLightingExplorerExtension {
    constructor();
    GetContentTabs: (() => UnityEditor.LightingExplorerTab[]);
    OnEnable: (() => void);
    OnDisable: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LightingExplorerTab {
    constructor(title: string, objects: any, columns: any);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LightingExplorerTableColumn {
    constructor(type: UnityEditor.LightingExplorerTableColumn_DataType, headerContent: UnityEngine.GUIContent, propertyName?: string, width?: number, onGUIDelegate?: UnityEditor.LightingExplorerTableColumn_OnGUIDelegate, compareDelegate?: UnityEditor.LightingExplorerTableColumn_ComparePropertiesDelegate, copyDelegate?: UnityEditor.LightingExplorerTableColumn_CopyPropertiesDelegate, dependencyIndices?: number[]);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum LightingExplorerTableColumn_DataType {
    Name = 0,
    Checkbox = 1,
    Enum = 2,
    Int = 3,
    Float = 4,
    Color = 5,
    Custom = 20,
  }
  export declare class LightingExplorerTableColumn_OnGUIDelegate {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((r: UnityEngine.Rect, prop: UnityEditor.SerializedProperty, dependencies: UnityEditor.SerializedProperty[]) => void);
    BeginInvoke: ((r: UnityEngine.Rect, prop: UnityEditor.SerializedProperty, dependencies: UnityEditor.SerializedProperty[], callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LightingExplorerTableColumn_ComparePropertiesDelegate {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((lhs: UnityEditor.SerializedProperty, rhs: UnityEditor.SerializedProperty) => number);
    BeginInvoke: ((lhs: UnityEditor.SerializedProperty, rhs: UnityEditor.SerializedProperty, callback: any, object: any) => any);
    EndInvoke: ((result: any) => number);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LightingExplorerTableColumn_CopyPropertiesDelegate {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((target: UnityEditor.SerializedProperty, source: UnityEditor.SerializedProperty) => void);
    BeginInvoke: ((target: UnityEditor.SerializedProperty, source: UnityEditor.SerializedProperty, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ILightingExplorerExtension {
    GetContentTabs: (() => UnityEditor.LightingExplorerTab[]);
    OnEnable: (() => void);
    OnDisable: (() => void);
  }
  export declare class LightingWindowEnvironmentSection {
    OnEnable: (() => void);
    OnDisable: (() => void);
    OnInspectorGUI: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PhysicsDebugWindow {
    constructor();
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnEnable: (() => void);
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SceneModeUtility {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SceneView {
    constructor();
    drawGizmos: boolean;
    sceneLighting: boolean;
    in2DMode: boolean;
    isRotationLocked: boolean;
    audioPlay: boolean;
    renderMode: UnityEditor.DrawCameraMode;
    cameraMode: UnityEditor.SceneView_CameraMode;
    validateTrueMetals: boolean;
    sceneViewState: UnityEditor.SceneView_SceneViewState;
    showGrid: boolean;
    cameraSettings: UnityEditor.SceneView_CameraSettings;
    lastSceneViewRotation: UnityEngine.Quaternion;
    cameraDistance: number;
    camera: UnityEngine.Camera;
    pivot: UnityEngine.Vector3;
    rotation: UnityEngine.Quaternion;
    size: number;
    orthographic: boolean;
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    hasUnsavedChanges: boolean;
    saveChangesMessage: string;
    minSize: UnityEngine.Vector2;
    maxSize: UnityEngine.Vector2;
    title: string;
    titleContent: UnityEngine.GUIContent;
    depthBufferBits: number;
    antiAlias: number;
    position: UnityEngine.Rect;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    m_SceneLighting: boolean;
    m_AudioPlay: boolean;
    m_RenderMode: UnityEditor.DrawCameraMode;
    m_ValidateTrueMetals: boolean;
    ResetCameraSettings: (() => void);
    SetSceneViewShaderReplace: ((shader: UnityEngine.Shader, replaceString: string) => void);
    OnEnable: (() => void);
    OnDisable: (() => void);
    OnDestroy: (() => void);
    AddItemsToMenu: ((menu: UnityEditor.GenericMenu) => void);
    IsCameraDrawModeEnabled: ((mode: UnityEditor.SceneView_CameraMode) => boolean);
    FixNegativeSize: (() => void);
    LookAt: ((point: UnityEngine.Vector3) => void) | ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion) => void) | ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number) => void) | ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number, ortho: boolean) => void) | ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number, ortho: boolean, instant: boolean) => void);
    LookAtDirect: ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion) => void) | ((point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number) => void);
    AlignViewToObject: ((t: UnityEngine.Transform) => void);
    AlignWithView: (() => void);
    MoveToView: (() => void) | ((target: UnityEngine.Transform) => void);
    FrameSelected: (() => boolean) | ((lockView: boolean) => boolean) | ((lockView: boolean, instant: boolean) => boolean);
    Frame: ((bounds: UnityEngine.Bounds, instant?: boolean) => boolean);
    BeginWindows: (() => void);
    EndWindows: (() => void);
    ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
    RemoveNotification: (() => void);
    ShowTab: (() => void);
    Focus: (() => void);
    ShowUtility: (() => void);
    ShowPopup: (() => void);
    ShowModalUtility: (() => void);
    ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
    Show: (() => void) | ((immediateDisplay: boolean) => void);
    ShowAuxWindow: (() => void);
    ShowModal: (() => void);
    SaveChanges: (() => void);
    Close: (() => void);
    Repaint: (() => void);
    SendEvent: ((e: UnityEngine.Event) => boolean);
    GetExtraPaneTypes: (() => any);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SceneView_CameraMode {
    drawMode: UnityEditor.DrawCameraMode;
    name: string;
    section: string;
    Equals: ((otherObject: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SceneView_SceneViewState {
    constructor();
    constructor(other: UnityEditor.SceneView_SceneViewState);
    showMaterialUpdate: boolean;
    alwaysRefresh: boolean;
    fogEnabled: boolean;
    materialUpdateEnabled: boolean;
    alwaysRefreshEnabled: boolean;
    skyboxEnabled: boolean;
    flaresEnabled: boolean;
    imageEffectsEnabled: boolean;
    particleSystemsEnabled: boolean;
    visualEffectGraphsEnabled: boolean;
    allEnabled: boolean;
    fxEnabled: boolean;
    showFog: boolean;
    showSkybox: boolean;
    showFlares: boolean;
    showImageEffects: boolean;
    showParticleSystems: boolean;
    showVisualEffectGraphs: boolean;
    IsAllOn: (() => boolean);
    Toggle: ((value: boolean) => void);
    SetAllEnabled: ((value: boolean) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SceneView_OnSceneFunc {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((sceneView: UnityEditor.SceneView) => void);
    BeginInvoke: ((sceneView: UnityEditor.SceneView, callback: any, object: any) => any);
    EndInvoke: ((result: any) => void);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SceneView_CameraSettings {
    constructor();
    speed: number;
    speedNormalized: number;
    speedMin: number;
    speedMax: number;
    easingEnabled: boolean;
    easingDuration: number;
    accelerationEnabled: boolean;
    fieldOfView: number;
    nearClip: number;
    farClip: number;
    dynamicClip: boolean;
    occlusionCulling: boolean;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class DecoratorDrawer {
    attribute: any; // UnityEngine.PropertyAttribute
    OnGUI: ((position: UnityEngine.Rect) => void);
    GetHeight: (() => number);
    CanCacheInspectorGUI: (() => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class GUIDrawer {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PropertyDrawer {
    attribute: any; // UnityEngine.PropertyAttribute
    fieldInfo: any; // System.Reflection.FieldInfo
    OnGUI: ((position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent) => void);
    CreatePropertyGUI: ((property: UnityEditor.SerializedProperty) => UnityEngine.UIElements.VisualElement);
    GetPropertyHeight: ((property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent) => number);
    CanCacheInspectorGUI: ((property: UnityEditor.SerializedProperty) => boolean);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum SettingsScope {
    User = 0,
    Project = 1,
  }
  export declare class SettingsProvider {
    constructor(path: string, scopes: UnityEditor.SettingsScope, keywords?: any);
    label: string;
    settingsPath: string;
    scope: UnityEditor.SettingsScope;
    keywords: any; // System.Collections.Generic.IEnumerable`1[System.String]
    guiHandler: any; // System.Action`1[System.String]
    titleBarGuiHandler: any; // System.Action
    footerBarGuiHandler: any; // System.Action
    activateHandler: any; // System.Action`2[System.String,UnityEngine.UIElements.VisualElement]
    deactivateHandler: any; // System.Action
    hasSearchInterestHandler: any; // System.Func`2[System.String,System.Boolean]
    inspectorUpdateHandler: any; // System.Action
    OnActivate: ((searchContext: string, rootElement: UnityEngine.UIElements.VisualElement) => void);
    OnDeactivate: (() => void);
    HasSearchInterest: ((searchContext: string) => boolean);
    OnGUI: ((searchContext: string) => void);
    OnTitleBarGUI: (() => void);
    OnFooterBarGUI: (() => void);
    OnInspectorUpdate: (() => void);
    Repaint: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class SettingsService {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class AssetSettingsProvider {
    constructor(settingsWindowPath: string, editorCreator: any, keywords?: any);
    constructor(settingsWindowPath: string, settingsGetter: any);
    settingsEditor: UnityEditor.Editor;
    label: string;
    settingsPath: string;
    scope: UnityEditor.SettingsScope;
    keywords: any; // System.Collections.Generic.IEnumerable`1[System.String]
    guiHandler: any; // System.Action`1[System.String]
    titleBarGuiHandler: any; // System.Action
    footerBarGuiHandler: any; // System.Action
    activateHandler: any; // System.Action`2[System.String,UnityEngine.UIElements.VisualElement]
    deactivateHandler: any; // System.Action
    hasSearchInterestHandler: any; // System.Func`2[System.String,System.Boolean]
    inspectorUpdateHandler: any; // System.Action
    OnActivate: ((searchContext: string, rootElement: UnityEngine.UIElements.VisualElement) => void);
    OnDeactivate: (() => void);
    OnGUI: ((searchContext: string) => void);
    OnTitleBarGUI: (() => void);
    OnFooterBarGUI: (() => void);
    HasSearchInterest: ((searchContext: string) => boolean);
    OnInspectorUpdate: (() => void);
    Repaint: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class Highlighter {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum HighlightSearchMode {
    None = 0,
    Auto = 1,
    Identifier = 2,
    PrefixLabel = 3,
    Content = 4,
  }
  export enum ObjectChangeKind {
    None = 0,
    ChangeScene = 1,
    CreateGameObjectHierarchy = 2,
    ChangeGameObjectStructureHierarchy = 3,
    ChangeGameObjectStructure = 4,
    ChangeGameObjectParent = 5,
    ChangeGameObjectOrComponentProperties = 6,
    DestroyGameObjectHierarchy = 7,
    CreateAssetObject = 8,
    DestroyAssetObject = 9,
    ChangeAssetObjectProperties = 10,
    UpdatePrefabInstances = 11,
  }
  export declare class ObjectChangeEvents {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ObjectChangeEvents_ObjectChangeEventsHandler {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ChangeGameObjectParentEventArgs {
    constructor(instanceId: number, previousScene: UnityEngine.SceneManagement.Scene, previousParentInstanceId: number, newScene: UnityEngine.SceneManagement.Scene, newParentInstanceId: number);
    instanceId: number;
    previousParentInstanceId: number;
    newParentInstanceId: number;
    previousScene: UnityEngine.SceneManagement.Scene;
    newScene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ChangeSceneEventArgs {
    constructor(scene: UnityEngine.SceneManagement.Scene);
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class CreateGameObjectHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ChangeGameObjectStructureHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ChangeGameObjectStructureEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ChangeGameObjectOrComponentPropertiesEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class DestroyGameObjectHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class CreateAssetObjectEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class DestroyAssetObjectEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ChangeAssetObjectPropertiesEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class UpdatePrefabInstancesEventArgs {
    constructor(scene: UnityEngine.SceneManagement.Scene, instanceIds: any);
    scene: UnityEngine.SceneManagement.Scene;
    instanceIds: any; // Unity.Collections.NativeArray`1+ReadOnly[System.Int32]
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ObjectChangeEventStream {
    length: number;
    isCreated: boolean;
    GetEventType: ((eventIdx: number) => UnityEditor.ObjectChangeKind);
    Clone: ((allocator: Unity.Collections.Allocator) => UnityEditor.ObjectChangeEventStream);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ObjectChangeEventStream_Builder {
    constructor(allocator: Unity.Collections.Allocator);
    eventCount: number;
    ToStream: ((allocator: Unity.Collections.Allocator) => UnityEditor.ObjectChangeEventStream);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class UndoPropertyModification {
    keepPrefabOverride: boolean;
    previousValue: UnityEditor.PropertyModification;
    currentValue: UnityEditor.PropertyModification;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class UndoSnapshot {
    constructor(objectsToUndo: UnityEngine.Object[]);
    Restore: (() => void);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class CloudProjectSettings {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ExpressionEvaluator {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class MathUtils {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum RemoveAssetOptions {
    MoveAssetToTrash = 0,
    DeleteAssets = 2,
  }
  export enum ImportAssetOptions {
    Default = 0,
    ForceUpdate = 1,
    ForceSynchronousImport = 8,
    ImportRecursive = 256,
    DontDownloadFromCacheServer = 8192,
    ForceUncompressedImport = 16384,
  }
  export enum StatusQueryOptions {
    ForceUpdate = 0,
    UseCachedIfPossible = 1,
    UseCachedAsync = 2,
  }
  export enum ForceReserializeAssetsOptions {
    ReserializeAssets = 1,
    ReserializeMetadata = 2,
    ReserializeAssetsAndMetadata = 3,
  }
  export declare class CacheServerConnectionChangedParameters {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum AudioImporterFormat {
    Native = -1,
    Compressed = 0,
  }
  export enum AudioImporterLoadType {
    DecompressOnLoad = -1,
    CompressedInMemory = -1,
    StreamFromDisc = -1,
  }
  export enum AudioImporterChannels {
    Automatic = 0,
    Mono = 1,
    Stereo = 2,
  }
  export enum AudioSampleRateSetting {
    PreserveSampleRate = 0,
    OptimizeSampleRate = 1,
    OverrideSampleRate = 2,
  }
  export declare class AudioImporterSampleSettings {
    loadType: UnityEngine.AudioClipLoadType;
    sampleRateSetting: UnityEditor.AudioSampleRateSetting;
    sampleRateOverride: any; // System.UInt32
    compressionFormat: UnityEngine.AudioCompressionFormat;
    quality: number;
    conversionMode: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class AudioImporter {
    constructor();
    defaultSampleSettings: UnityEditor.AudioImporterSampleSettings;
    forceToMono: boolean;
    ambisonic: boolean;
    loadInBackground: boolean;
    preloadAudioData: boolean;
    channels: UnityEditor.AudioImporterChannels;
    compressionBitrate: number;
    loopable: boolean;
    hardware: boolean;
    threeD: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ContainsSampleSettingsOverride: ((platform: string) => boolean);
    GetOverrideSampleSettings: ((platform: string) => UnityEditor.AudioImporterSampleSettings);
    SetOverrideSampleSettings: ((platform: string, settings: UnityEditor.AudioImporterSampleSettings) => boolean);
    ClearSampleSettingOverride: ((platform: string) => boolean);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class MonoImporter {
    constructor();
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDefaultReferences: ((name: string[], target: UnityEngine.Object[]) => void);
    GetScript: (() => UnityEditor.MonoScript);
    GetDefaultReference: ((name: string) => UnityEngine.Object);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class MovieImporter {
    constructor();
    quality: number;
    linearTexture: boolean;
    duration: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PluginImporter {
    constructor();
    DefineConstraints: string[];
    isPreloaded: boolean;
    isNativePlugin: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ClearSettings: (() => void);
    SetCompatibleWithAnyPlatform: ((enable: boolean) => void);
    GetCompatibleWithAnyPlatform: (() => boolean);
    SetExcludeFromAnyPlatform: ((platformName: string, excludedFromAny: boolean) => void) | ((platform: UnityEditor.BuildTarget, excludedFromAny: boolean) => void);
    GetExcludeFromAnyPlatform: ((platformName: string) => boolean) | ((platform: UnityEditor.BuildTarget) => boolean);
    SetIncludeInBuildDelegate: ((includeInBuildDelegate: UnityEditor.PluginImporter_IncludeInBuildDelegate) => void);
    SetExcludeEditorFromAnyPlatform: ((excludedFromAny: boolean) => void);
    GetExcludeEditorFromAnyPlatform: (() => boolean);
    SetCompatibleWithEditor: ((enable: boolean) => void);
    GetCompatibleWithEditor: (() => boolean) | ((buildTargetGroup: string, buildTarget: string) => boolean);
    GetIsOverridable: (() => boolean);
    ShouldIncludeInBuild: (() => boolean);
    SetCompatibleWithPlatform: ((platform: UnityEditor.BuildTarget, enable: boolean) => void) | ((platformName: string, enable: boolean) => void);
    GetCompatibleWithPlatform: ((platform: UnityEditor.BuildTarget) => boolean) | ((platformName: string) => boolean);
    SetPlatformData: ((platform: UnityEditor.BuildTarget, key: string, value: string) => void) | ((platformName: string, key: string, value: string) => void);
    GetPlatformData: ((platform: UnityEditor.BuildTarget, key: string) => string) | ((platformName: string, key: string) => string);
    SetEditorData: ((key: string, value: string) => void);
    GetEditorData: ((key: string) => string);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class PluginImporter_IncludeInBuildDelegate {
    constructor(object: any, method: any);
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: ((path: string) => boolean);
    BeginInvoke: ((path: string, callback: any, object: any) => any);
    EndInvoke: ((result: any) => boolean);
    GetObjectData: ((info: any, context: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => any[]);
    DynamicInvoke: ((args: any[]) => any);
    Clone: (() => any);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum VideoCodec {
    Auto = 0,
    H264 = 1,
    H265 = 3,
    VP8 = 2,
  }
  export enum VideoBitrateMode {
    Low = 0,
    Medium = 1,
    High = 2,
  }
  export enum VideoDeinterlaceMode {
    Off = 0,
    Even = 1,
    Odd = 2,
  }
  export enum VideoResizeMode {
    OriginalSize = 0,
    ThreeQuarterRes = 1,
    HalfRes = 2,
    QuarterRes = 3,
    Square1024 = 4,
    Square512 = 5,
    Square256 = 6,
    CustomSize = 7,
  }
  export enum VideoSpatialQuality {
    LowSpatialQuality = 0,
    MediumSpatialQuality = 1,
    HighSpatialQuality = 2,
  }
  export enum VideoEncodeAspectRatio {
    NoScaling = 0,
    Stretch = 5,
  }
  export declare class VideoImporterTargetSettings {
    constructor();
    enableTranscoding: boolean;
    codec: UnityEditor.VideoCodec;
    resizeMode: UnityEditor.VideoResizeMode;
    aspectRatio: UnityEditor.VideoEncodeAspectRatio;
    customWidth: number;
    customHeight: number;
    bitrateMode: UnityEditor.VideoBitrateMode;
    spatialQuality: UnityEditor.VideoSpatialQuality;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class VideoClipImporter {
    constructor();
    quality: number;
    linearColor: boolean;
    useLegacyImporter: boolean;
    sourceFileSize: any; // System.UInt64
    outputFileSize: any; // System.UInt64
    frameCount: number;
    frameRate: number;
    keepAlpha: boolean;
    sourceHasAlpha: boolean;
    deinterlaceMode: UnityEditor.VideoDeinterlaceMode;
    flipVertical: boolean;
    flipHorizontal: boolean;
    importAudio: boolean;
    sRGBClip: boolean;
    defaultTargetSettings: UnityEditor.VideoImporterTargetSettings;
    isPlayingPreview: boolean;
    sourceAudioTrackCount: any; // System.UInt16
    pixelAspectRatioNumerator: number;
    pixelAspectRatioDenominator: number;
    transcodeSkipped: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetTargetSettings: ((platform: string) => UnityEditor.VideoImporterTargetSettings);
    SetTargetSettings: ((platform: string, settings: UnityEditor.VideoImporterTargetSettings) => void);
    ClearTargetSettings: ((platform: string) => void);
    PlayPreview: (() => void);
    StopPreview: (() => void);
    GetPreviewTexture: (() => UnityEngine.Texture);
    GetResizeModeName: ((mode: UnityEditor.VideoResizeMode) => string);
    GetResizeWidth: ((mode: UnityEditor.VideoResizeMode) => number);
    GetResizeHeight: ((mode: UnityEditor.VideoResizeMode) => number);
    GetSourceAudioChannelCount: ((audioTrackIdx: any) => any);
    GetSourceAudioSampleRate: ((audioTrackIdx: any) => any);
    Equals: ((rhs: UnityEditor.VideoClipImporter) => boolean) | ((other: any) => boolean);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum MeshOptimizationFlags {
    PolygonOrder = 1,
    VertexOrder = 2,
    Everything = -1,
  }
  export enum ClipAnimationMaskType {
    CreateFromThisModel = 0,
    CopyFromOther = 1,
    None = 3,
  }
  export declare class ClipAnimationInfoCurve {
    name: string;
    curve: UnityEngine.AnimationCurve;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ModelImporterClipAnimation {
    constructor();
    takeName: string;
    name: string;
    firstFrame: number;
    lastFrame: number;
    wrapMode: UnityEngine.WrapMode;
    loop: boolean;
    rotationOffset: number;
    heightOffset: number;
    cycleOffset: number;
    loopTime: boolean;
    loopPose: boolean;
    lockRootRotation: boolean;
    lockRootHeightY: boolean;
    lockRootPositionXZ: boolean;
    keepOriginalOrientation: boolean;
    keepOriginalPositionY: boolean;
    keepOriginalPositionXZ: boolean;
    heightFromFeet: boolean;
    mirror: boolean;
    maskType: UnityEditor.ClipAnimationMaskType;
    maskSource: UnityEngine.AvatarMask;
    events: UnityEngine.AnimationEvent[];
    curves: UnityEditor.ClipAnimationInfoCurve[];
    maskNeedsUpdating: boolean;
    additiveReferencePoseFrame: number;
    hasAdditiveReferencePose: boolean;
    ConfigureClipFromMask: ((mask: UnityEngine.AvatarMask) => void);
    Equals: ((o: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum ModelImporterGenerateMaterials {
    None = 0,
    PerTexture = 1,
    PerSourceMaterial = 2,
  }
  export enum ModelImporterMaterialName {
    BasedOnTextureName = 0,
    BasedOnMaterialName = 1,
    BasedOnModelNameAndMaterialName = 2,
    BasedOnTextureName_Or_ModelNameAndMaterialName = 3,
  }
  export enum ModelImporterMaterialSearch {
    Local = 0,
    RecursiveUp = 1,
    Everywhere = 2,
  }
  export enum ModelImporterMaterialLocation {
    External = 0,
    InPrefab = 1,
  }
  export enum ModelImporterMaterialImportMode {
    None = 0,
    ImportStandard = 1,
    ImportViaMaterialDescription = 2,
    LegacyImport = 1,
    Import = 2,
  }
  export enum ModelImporterTangentSpaceMode {
    Import = 0,
    Calculate = 1,
    None = 2,
  }
  export enum ModelImporterNormals {
    Import = 0,
    Calculate = 1,
    None = 2,
  }
  export enum ModelImporterNormalCalculationMode {
    Unweighted_Legacy = 0,
    Unweighted = 1,
    AreaWeighted = 2,
    AngleWeighted = 3,
    AreaAndAngleWeighted = 4,
  }
  export enum ModelImporterNormalSmoothingSource {
    PreferSmoothingGroups = 0,
    FromSmoothingGroups = 1,
    FromAngle = 2,
    None = 3,
  }
  export enum ModelImporterTangents {
    Import = 0,
    CalculateLegacy = 1,
    CalculateLegacyWithSplitTangents = 4,
    CalculateMikk = 3,
    None = 2,
  }
  export enum ModelImporterMeshCompression {
    Off = 0,
    Low = 1,
    Medium = 2,
    High = 3,
  }
  export enum ModelImporterIndexFormat {
    Auto = 0,
    UInt16 = 1,
    UInt32 = 2,
  }
  export enum ModelImporterAnimationCompression {
    Off = 0,
    KeyframeReduction = 1,
    KeyframeReductionAndCompression = 2,
    Optimal = 3,
  }
  export enum ModelImporterGenerateAnimations {
    None = 0,
    GenerateAnimations = 4,
    InRoot = 3,
    InOriginalRoots = 1,
    InNodes = 2,
  }
  export enum ModelImporterAnimationType {
    None = 0,
    Legacy = 1,
    Generic = 2,
    Human = 3,
  }
  export enum ModelImporterHumanoidOversampling {
    X1 = 1,
    X2 = 2,
    X4 = 4,
    X8 = 8,
  }
  export enum ModelImporterSecondaryUVMarginMethod {
    Manual = 0,
    Calculate = 1,
  }
  export enum ModelImporterAvatarSetup {
    NoAvatar = 0,
    CreateFromThisModel = 1,
    CopyFromOther = 2,
  }
  export enum ModelImporterSkinWeights {
    Standard = 0,
    Custom = 1,
  }
  export declare class HumanTemplate {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    Insert: ((name: string, templateName: string) => void);
    Find: ((name: string) => string);
    ClearTemplate: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TakeInfo {
    name: string;
    defaultClipName: string;
    startTime: number;
    stopTime: number;
    bakeStartTime: number;
    bakeStopTime: number;
    sampleRate: number;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ModelImporter {
    constructor();
    generateMaterials: UnityEditor.ModelImporterGenerateMaterials;
    importMaterials: boolean;
    materialName: UnityEditor.ModelImporterMaterialName;
    materialSearch: UnityEditor.ModelImporterMaterialSearch;
    materialLocation: UnityEditor.ModelImporterMaterialLocation;
    globalScale: number;
    isUseFileUnitsSupported: boolean;
    importVisibility: boolean;
    useFileUnits: boolean;
    fileScale: number;
    useFileScale: boolean;
    isFileScaleUsed: boolean;
    importBlendShapes: boolean;
    importCameras: boolean;
    importLights: boolean;
    addCollider: boolean;
    normalSmoothingAngle: number;
    splitTangentsAcrossSeams: boolean;
    swapUVChannels: boolean;
    weldVertices: boolean;
    bakeAxisConversion: boolean;
    keepQuads: boolean;
    indexFormat: UnityEditor.ModelImporterIndexFormat;
    preserveHierarchy: boolean;
    generateSecondaryUV: boolean;
    secondaryUVAngleDistortion: number;
    secondaryUVAreaDistortion: number;
    secondaryUVHardAngle: number;
    secondaryUVMarginMethod: UnityEditor.ModelImporterSecondaryUVMarginMethod;
    secondaryUVPackMargin: number;
    secondaryUVMinLightmapResolution: number;
    secondaryUVMinObjectScale: number;
    generateAnimations: UnityEditor.ModelImporterGenerateAnimations;
    importedTakeInfos: UnityEditor.TakeInfo[];
    transformPaths: string[];
    referencedClips: string[];
    isReadable: boolean;
    meshOptimizationFlags: UnityEditor.MeshOptimizationFlags;
    optimizeMeshPolygons: boolean;
    optimizeMeshVertices: boolean;
    optimizeMesh: boolean;
    skinWeights: UnityEditor.ModelImporterSkinWeights;
    maxBonesPerVertex: number;
    minBoneWeight: number;
    normalImportMode: UnityEditor.ModelImporterTangentSpaceMode;
    tangentImportMode: UnityEditor.ModelImporterTangentSpaceMode;
    importNormals: UnityEditor.ModelImporterNormals;
    normalSmoothingSource: UnityEditor.ModelImporterNormalSmoothingSource;
    importBlendShapeNormals: UnityEditor.ModelImporterNormals;
    normalCalculationMode: UnityEditor.ModelImporterNormalCalculationMode;
    importTangents: UnityEditor.ModelImporterTangents;
    bakeIK: boolean;
    isBakeIKSupported: boolean;
    resampleRotations: boolean;
    resampleCurves: boolean;
    isTangentImportSupported: boolean;
    meshCompression: UnityEditor.ModelImporterMeshCompression;
    importAnimation: boolean;
    optimizeGameObjects: boolean;
    extraExposedTransformPaths: string[];
    extraUserProperties: string[];
    animationCompression: UnityEditor.ModelImporterAnimationCompression;
    importAnimatedCustomProperties: boolean;
    importConstraints: boolean;
    animationRotationError: number;
    animationPositionError: number;
    animationScaleError: number;
    animationWrapMode: UnityEngine.WrapMode;
    animationType: UnityEditor.ModelImporterAnimationType;
    humanoidOversampling: UnityEditor.ModelImporterHumanoidOversampling;
    motionNodeName: string;
    avatarSetup: UnityEditor.ModelImporterAvatarSetup;
    sourceAvatar: UnityEngine.Avatar;
    humanDescription: UnityEngine.HumanDescription;
    splitAnimations: boolean;
    clipAnimations: UnityEditor.ModelImporterClipAnimation[];
    defaultClipAnimations: UnityEditor.ModelImporterClipAnimation[];
    useSRGBMaterialColor: boolean;
    sortHierarchyByName: boolean;
    materialImportMode: UnityEditor.ModelImporterMaterialImportMode;
    autoGenerateAvatarMappingIfUnspecified: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    CreateDefaultMaskForClip: ((clip: UnityEditor.ModelImporterClipAnimation) => void);
    ExtractTextures: ((folderPath: string) => boolean);
    SearchAndRemapMaterials: ((nameOption: UnityEditor.ModelImporterMaterialName, searchOption: UnityEditor.ModelImporterMaterialSearch) => boolean);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class EditorJsonUtility {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class L10n {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class LocalizationGroup {
    constructor();
    constructor(behaviour: UnityEngine.Behaviour);
    constructor(type: any);
    constructor(obj: any);
    locGroupName: string;
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class PhysicsVisualizationSettings {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum PhysicsVisualizationSettings_FilterWorkflow {
    HideSelectedItems = 0,
    ShowSelectedItems = 1,
  }
  export enum PhysicsVisualizationSettings_MeshColliderType {
    Convex = 0,
    NonConvex = 1,
  }
  export declare class NetworkDetailStats {
    constructor();
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum NetworkDetailStats_NetworkDirection {
    Incoming = 0,
    Outgoing = 1,
  }
  export declare class SketchUpImportCamera {
    position: UnityEngine.Vector3;
    lookAt: UnityEngine.Vector3;
    up: UnityEngine.Vector3;
    fieldOfView: number;
    aspectRatio: number;
    orthoSize: number;
    nearPlane: number;
    farPlane: number;
    isPerspective: boolean;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SketchUpImportScene {
    camera: UnityEditor.SketchUpImportCamera;
    name: string;
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class SketchUpImporter {
    constructor();
    latitude: number;
    longitude: number;
    northCorrection: number;
    generateMaterials: UnityEditor.ModelImporterGenerateMaterials;
    importMaterials: boolean;
    materialName: UnityEditor.ModelImporterMaterialName;
    materialSearch: UnityEditor.ModelImporterMaterialSearch;
    materialLocation: UnityEditor.ModelImporterMaterialLocation;
    globalScale: number;
    isUseFileUnitsSupported: boolean;
    importVisibility: boolean;
    useFileUnits: boolean;
    fileScale: number;
    useFileScale: boolean;
    isFileScaleUsed: boolean;
    importBlendShapes: boolean;
    importCameras: boolean;
    importLights: boolean;
    addCollider: boolean;
    normalSmoothingAngle: number;
    splitTangentsAcrossSeams: boolean;
    swapUVChannels: boolean;
    weldVertices: boolean;
    bakeAxisConversion: boolean;
    keepQuads: boolean;
    indexFormat: UnityEditor.ModelImporterIndexFormat;
    preserveHierarchy: boolean;
    generateSecondaryUV: boolean;
    secondaryUVAngleDistortion: number;
    secondaryUVAreaDistortion: number;
    secondaryUVHardAngle: number;
    secondaryUVMarginMethod: UnityEditor.ModelImporterSecondaryUVMarginMethod;
    secondaryUVPackMargin: number;
    secondaryUVMinLightmapResolution: number;
    secondaryUVMinObjectScale: number;
    generateAnimations: UnityEditor.ModelImporterGenerateAnimations;
    importedTakeInfos: UnityEditor.TakeInfo[];
    transformPaths: string[];
    referencedClips: string[];
    isReadable: boolean;
    meshOptimizationFlags: UnityEditor.MeshOptimizationFlags;
    optimizeMeshPolygons: boolean;
    optimizeMeshVertices: boolean;
    optimizeMesh: boolean;
    skinWeights: UnityEditor.ModelImporterSkinWeights;
    maxBonesPerVertex: number;
    minBoneWeight: number;
    normalImportMode: UnityEditor.ModelImporterTangentSpaceMode;
    tangentImportMode: UnityEditor.ModelImporterTangentSpaceMode;
    importNormals: UnityEditor.ModelImporterNormals;
    normalSmoothingSource: UnityEditor.ModelImporterNormalSmoothingSource;
    importBlendShapeNormals: UnityEditor.ModelImporterNormals;
    normalCalculationMode: UnityEditor.ModelImporterNormalCalculationMode;
    importTangents: UnityEditor.ModelImporterTangents;
    bakeIK: boolean;
    isBakeIKSupported: boolean;
    resampleRotations: boolean;
    resampleCurves: boolean;
    isTangentImportSupported: boolean;
    meshCompression: UnityEditor.ModelImporterMeshCompression;
    importAnimation: boolean;
    optimizeGameObjects: boolean;
    extraExposedTransformPaths: string[];
    extraUserProperties: string[];
    animationCompression: UnityEditor.ModelImporterAnimationCompression;
    importAnimatedCustomProperties: boolean;
    importConstraints: boolean;
    animationRotationError: number;
    animationPositionError: number;
    animationScaleError: number;
    animationWrapMode: UnityEngine.WrapMode;
    animationType: UnityEditor.ModelImporterAnimationType;
    humanoidOversampling: UnityEditor.ModelImporterHumanoidOversampling;
    motionNodeName: string;
    avatarSetup: UnityEditor.ModelImporterAvatarSetup;
    sourceAvatar: UnityEngine.Avatar;
    humanDescription: UnityEngine.HumanDescription;
    splitAnimations: boolean;
    clipAnimations: UnityEditor.ModelImporterClipAnimation[];
    defaultClipAnimations: UnityEditor.ModelImporterClipAnimation[];
    useSRGBMaterialColor: boolean;
    sortHierarchyByName: boolean;
    materialImportMode: UnityEditor.ModelImporterMaterialImportMode;
    autoGenerateAvatarMappingIfUnspecified: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetScenes: (() => UnityEditor.SketchUpImportScene[]);
    GetDefaultCamera: (() => UnityEditor.SketchUpImportCamera);
    CreateDefaultMaskForClip: ((clip: UnityEditor.ModelImporterClipAnimation) => void);
    ExtractTextures: ((folderPath: string) => boolean);
    SearchAndRemapMaterials: ((nameOption: UnityEditor.ModelImporterMaterialName, searchOption: UnityEditor.ModelImporterMaterialSearch) => boolean);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class TerrainLayerInspector {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ApplyCustomUI: ((customUI: UnityEditor.ITerrainLayerCustomUI, terrain: any) => void);
    OnInspectorGUI: (() => void);
    HasPreviewGUI: (() => boolean);
    OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
    DrawDefaultInspector: (() => boolean);
    Repaint: (() => void);
    CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
    RequiresConstantRepaint: (() => boolean);
    DrawHeader: (() => void);
    GetPreviewTitle: (() => UnityEngine.GUIContent);
    OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
    OnPreviewSettings: (() => void);
    GetInfoString: (() => string);
    DrawPreview: ((previewArea: UnityEngine.Rect) => void);
    ReloadPreviewInstances: (() => void);
    UseDefaultMargins: (() => boolean);
    Initialize: ((targets: UnityEngine.Object[]) => void);
    MoveNextTarget: (() => boolean);
    ResetTarget: (() => void);
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ITerrainLayerCustomUI {
    OnTerrainLayerGUI: ((terrainLayer: any, terrain: any) => boolean);
  }
  export declare class TerrainLayerUtility {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum FontTextureCase {
    Dynamic = -2,
    Unicode = -1,
    ASCII = 0,
    ASCIIUpperCase = 1,
    ASCIILowerCase = 2,
    CustomSet = 3,
  }
  export enum FontRenderingMode {
    Smooth = 0,
    HintedSmooth = 1,
    HintedRaster = 2,
    OSDefault = 3,
  }
  export enum AscentCalculationMode {
    Legacy2x = 0,
    FaceAscender = 1,
    FaceBoundingBox = 2,
  }
  export declare class TrueTypeFontImporter {
    constructor();
    fontSize: number;
    includeFontData: boolean;
    ascentCalculationMode: UnityEditor.AscentCalculationMode;
    customCharacters: string;
    characterSpacing: number;
    characterPadding: number;
    fontRenderingMode: UnityEditor.FontRenderingMode;
    shouldRoundAdvanceValue: boolean;
    fontTTFName: string;
    fontTextureCase: UnityEditor.FontTextureCase;
    fontReferences: UnityEngine.Font[];
    fontNames: string[];
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: any; // System.UInt64
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GenerateEditableFont: ((path: string) => UnityEngine.Font);
    SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
    SaveAndReimport: (() => void);
    AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
    RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
    GetExternalObjectMap: (() => any);
    SupportsRemappedAssetType: ((type: any) => boolean);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class GridPalette {
    constructor();
    transparencySortMode: UnityEngine.TransparencySortMode;
    transparencySortAxis: UnityEngine.Vector3;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    cellSizing: UnityEditor.GridPalette_CellSizing;
    SetDirty: (() => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export enum GridPalette_CellSizing {
    Automatic = 0,
    Manual = 100,
  }
  export declare class EditorAnalytics {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class EditorAnalyticsSessionInfo {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export namespace Advertisements {
    export declare class AdvertisementSettings {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace AI {
    export declare class NavMeshEditorHelpers {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class NavMeshBuilder {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class NavMeshVisualizationSettings {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Analytics {
    export declare class AnalyticsSettings {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AnalyticsSettings_RequireInBuildDelegate {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: (() => boolean);
      BeginInvoke: ((callback: any, object: any) => any);
      EndInvoke: ((result: any) => boolean);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class PerformanceReportingSettings {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Android {
    export declare class IPostGenerateGradleAndroidProject {
      OnPostGenerateGradleAndroidProject: ((path: string) => void);
    }
  }
  export namespace AnimatedValues {
    export declare class AnimFloat {
      constructor(value: number);
      constructor(value: number, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: number;
      value: number;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AnimVector3 {
      constructor();
      constructor(value: UnityEngine.Vector3);
      constructor(value: UnityEngine.Vector3, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: UnityEngine.Vector3;
      value: UnityEngine.Vector3;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AnimBool {
      constructor();
      constructor(value: boolean);
      constructor(callback: UnityEngine.Events.UnityAction);
      constructor(value: boolean, callback: UnityEngine.Events.UnityAction);
      faded: number;
      isAnimating: boolean;
      target: boolean;
      value: boolean;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Fade: ((from: number, to: number) => number);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AnimQuaternion {
      constructor(value: UnityEngine.Quaternion);
      constructor(value: UnityEngine.Quaternion, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: UnityEngine.Quaternion;
      value: UnityEngine.Quaternion;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Animations {
    export declare class AnimatorController {
      constructor();
      layers: UnityEditor.Animations.AnimatorControllerLayer[];
      parameters: UnityEngine.AnimatorControllerParameter[];
      animationClips: UnityEngine.AnimationClip[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      MakeUniqueParameterName: ((name: string) => string);
      MakeUniqueLayerName: ((name: string) => string);
      AddEffectiveStateMachineBehaviour: ((stateMachineBehaviourType: any, state: UnityEditor.Animations.AnimatorState, layerIndex: number) => UnityEngine.StateMachineBehaviour);
      AddLayer: ((name: string) => void) | ((layer: UnityEditor.Animations.AnimatorControllerLayer) => void);
      RemoveLayer: ((index: number) => void);
      AddParameter: ((name: string, type: UnityEngine.AnimatorControllerParameterType) => void) | ((paramater: UnityEngine.AnimatorControllerParameter) => void);
      RemoveParameter: ((index: number) => void) | ((parameter: UnityEngine.AnimatorControllerParameter) => void);
      AddMotion: ((motion: UnityEngine.Motion) => UnityEditor.Animations.AnimatorState) | ((motion: UnityEngine.Motion, layerIndex: number) => UnityEditor.Animations.AnimatorState);
      SetStateEffectiveMotion: ((state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion) => void) | ((state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion, layerIndex: number) => void);
      GetStateEffectiveMotion: ((state: UnityEditor.Animations.AnimatorState) => UnityEngine.Motion) | ((state: UnityEditor.Animations.AnimatorState, layerIndex: number) => UnityEngine.Motion);
      SetStateEffectiveBehaviours: ((state: UnityEditor.Animations.AnimatorState, layerIndex: number, behaviours: UnityEngine.StateMachineBehaviour[]) => void);
      GetStateEffectiveBehaviours: ((state: UnityEditor.Animations.AnimatorState, layerIndex: number) => UnityEngine.StateMachineBehaviour[]);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum AnimatorLayerBlendingMode {
      Override = 0,
      Additive = 1,
    }
    export declare class AnimatorControllerLayer {
      constructor();
      name: string;
      stateMachine: UnityEditor.Animations.AnimatorStateMachine;
      avatarMask: UnityEngine.AvatarMask;
      blendingMode: UnityEditor.Animations.AnimatorLayerBlendingMode;
      syncedLayerIndex: number;
      iKPass: boolean;
      defaultWeight: number;
      syncedLayerAffectsTiming: boolean;
      GetOverrideMotion: ((state: UnityEditor.Animations.AnimatorState) => UnityEngine.Motion);
      SetOverrideMotion: ((state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion) => void);
      GetOverrideBehaviours: ((state: UnityEditor.Animations.AnimatorState) => UnityEngine.StateMachineBehaviour[]);
      SetOverrideBehaviours: ((state: UnityEditor.Animations.AnimatorState, behaviours: UnityEngine.StateMachineBehaviour[]) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum BlendTreeType {
      Simple1D = 0,
      SimpleDirectional2D = 1,
      FreeformDirectional2D = 2,
      FreeformCartesian2D = 3,
      Direct = 4,
    }
    export declare class ChildMotion {
      motion: UnityEngine.Motion;
      threshold: number;
      position: UnityEngine.Vector2;
      timeScale: number;
      cycleOffset: number;
      directBlendParameter: string;
      mirror: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class BlendTree {
      constructor();
      blendParameter: string;
      blendParameterY: string;
      blendType: UnityEditor.Animations.BlendTreeType;
      children: UnityEditor.Animations.ChildMotion[];
      useAutomaticThresholds: boolean;
      minThreshold: number;
      maxThreshold: number;
      averageDuration: number;
      averageAngularSpeed: number;
      averageSpeed: UnityEngine.Vector3;
      apparentSpeed: number;
      isLooping: boolean;
      legacy: boolean;
      isHumanMotion: boolean;
      isAnimatorMotion: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      AddChild: ((motion: UnityEngine.Motion) => void) | ((motion: UnityEngine.Motion, position: UnityEngine.Vector2) => void) | ((motion: UnityEngine.Motion, threshold: number) => void);
      RemoveChild: ((index: number) => void);
      CreateBlendTreeChild: ((threshold: number) => UnityEditor.Animations.BlendTree) | ((position: UnityEngine.Vector2) => UnityEditor.Animations.BlendTree);
      ValidateIfRetargetable: ((val: boolean) => boolean);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum AnimatorConditionMode {
      If = 1,
      IfNot = 2,
      Greater = 3,
      Less = 4,
      Equals = 6,
      NotEqual = 7,
    }
    export enum TransitionInterruptionSource {
      None = 0,
      Source = 1,
      Destination = 2,
      SourceThenDestination = 3,
      DestinationThenSource = 4,
    }
    export declare class AnimatorCondition {
      mode: UnityEditor.Animations.AnimatorConditionMode;
      parameter: string;
      threshold: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AnimatorTransitionBase {
      solo: boolean;
      mute: boolean;
      isExit: boolean;
      destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine;
      destinationState: UnityEditor.Animations.AnimatorState;
      conditions: UnityEditor.Animations.AnimatorCondition[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetDisplayName: ((source: UnityEngine.Object) => string);
      AddCondition: ((mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string) => void);
      RemoveCondition: ((condition: UnityEditor.Animations.AnimatorCondition) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AnimatorTransition {
      constructor();
      solo: boolean;
      mute: boolean;
      isExit: boolean;
      destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine;
      destinationState: UnityEditor.Animations.AnimatorState;
      conditions: UnityEditor.Animations.AnimatorCondition[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetDisplayName: ((source: UnityEngine.Object) => string);
      AddCondition: ((mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string) => void);
      RemoveCondition: ((condition: UnityEditor.Animations.AnimatorCondition) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AnimatorStateTransition {
      constructor();
      duration: number;
      offset: number;
      interruptionSource: UnityEditor.Animations.TransitionInterruptionSource;
      orderedInterruption: boolean;
      exitTime: number;
      hasExitTime: boolean;
      hasFixedDuration: boolean;
      canTransitionToSelf: boolean;
      solo: boolean;
      mute: boolean;
      isExit: boolean;
      destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine;
      destinationState: UnityEditor.Animations.AnimatorState;
      conditions: UnityEditor.Animations.AnimatorCondition[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetDisplayName: ((source: UnityEngine.Object) => string);
      AddCondition: ((mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string) => void);
      RemoveCondition: ((condition: UnityEditor.Animations.AnimatorCondition) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AnimatorState {
      constructor();
      nameHash: number;
      motion: UnityEngine.Motion;
      speed: number;
      cycleOffset: number;
      mirror: boolean;
      iKOnFeet: boolean;
      writeDefaultValues: boolean;
      tag: string;
      speedParameter: string;
      cycleOffsetParameter: string;
      mirrorParameter: string;
      timeParameter: string;
      speedParameterActive: boolean;
      cycleOffsetParameterActive: boolean;
      mirrorParameterActive: boolean;
      timeParameterActive: boolean;
      transitions: UnityEditor.Animations.AnimatorStateTransition[];
      behaviours: UnityEngine.StateMachineBehaviour[];
      uniqueName: string;
      uniqueNameHash: number;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      AddStateMachineBehaviour: ((stateMachineBehaviourType: any) => UnityEngine.StateMachineBehaviour);
      AddTransition: ((transition: UnityEditor.Animations.AnimatorStateTransition) => void) | ((destinationState: UnityEditor.Animations.AnimatorState) => UnityEditor.Animations.AnimatorStateTransition) | ((destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorStateTransition) | ((destinationState: UnityEditor.Animations.AnimatorState, defaultExitTime: boolean) => UnityEditor.Animations.AnimatorStateTransition) | ((destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine, defaultExitTime: boolean) => UnityEditor.Animations.AnimatorStateTransition);
      RemoveTransition: ((transition: UnityEditor.Animations.AnimatorStateTransition) => void);
      AddExitTransition: (() => UnityEditor.Animations.AnimatorStateTransition) | ((defaultExitTime: boolean) => UnityEditor.Animations.AnimatorStateTransition);
      GetMotion: (() => UnityEngine.Motion);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ChildAnimatorState {
      state: UnityEditor.Animations.AnimatorState;
      position: UnityEngine.Vector3;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ChildAnimatorStateMachine {
      stateMachine: UnityEditor.Animations.AnimatorStateMachine;
      position: UnityEngine.Vector3;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AnimatorStateMachine {
      constructor();
      states: UnityEditor.Animations.ChildAnimatorState[];
      stateMachines: UnityEditor.Animations.ChildAnimatorStateMachine[];
      defaultState: UnityEditor.Animations.AnimatorState;
      anyStatePosition: UnityEngine.Vector3;
      entryPosition: UnityEngine.Vector3;
      exitPosition: UnityEngine.Vector3;
      parentStateMachinePosition: UnityEngine.Vector3;
      anyStateTransitions: UnityEditor.Animations.AnimatorStateTransition[];
      entryTransitions: UnityEditor.Animations.AnimatorTransition[];
      behaviours: UnityEngine.StateMachineBehaviour[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetStateMachineTransitions: ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorTransition[]);
      SetStateMachineTransitions: ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, transitions: UnityEditor.Animations.AnimatorTransition[]) => void);
      AddStateMachineBehaviour: ((stateMachineBehaviourType: any) => UnityEngine.StateMachineBehaviour);
      MakeUniqueStateName: ((name: string) => string);
      MakeUniqueStateMachineName: ((name: string) => string);
      AddState: ((name: string) => UnityEditor.Animations.AnimatorState) | ((name: string, position: UnityEngine.Vector3) => UnityEditor.Animations.AnimatorState) | ((state: UnityEditor.Animations.AnimatorState, position: UnityEngine.Vector3) => void);
      RemoveState: ((state: UnityEditor.Animations.AnimatorState) => void);
      AddStateMachine: ((name: string) => UnityEditor.Animations.AnimatorStateMachine) | ((name: string, position: UnityEngine.Vector3) => UnityEditor.Animations.AnimatorStateMachine) | ((stateMachine: UnityEditor.Animations.AnimatorStateMachine, position: UnityEngine.Vector3) => void);
      RemoveStateMachine: ((stateMachine: UnityEditor.Animations.AnimatorStateMachine) => void);
      AddAnyStateTransition: ((destinationState: UnityEditor.Animations.AnimatorState) => UnityEditor.Animations.AnimatorStateTransition) | ((destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorStateTransition);
      RemoveAnyStateTransition: ((transition: UnityEditor.Animations.AnimatorStateTransition) => boolean);
      AddStateMachineTransition: ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorTransition) | ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorTransition) | ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, destinationState: UnityEditor.Animations.AnimatorState) => UnityEditor.Animations.AnimatorTransition);
      AddStateMachineExitTransition: ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorTransition);
      RemoveStateMachineTransition: ((sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, transition: UnityEditor.Animations.AnimatorTransition) => boolean);
      AddEntryTransition: ((destinationState: UnityEditor.Animations.AnimatorState) => UnityEditor.Animations.AnimatorTransition) | ((destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine) => UnityEditor.Animations.AnimatorTransition);
      RemoveEntryTransition: ((transition: UnityEditor.Animations.AnimatorTransition) => boolean);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class StateMachineBehaviourContext {
      constructor();
      animatorController: UnityEditor.Animations.AnimatorController;
      animatorObject: UnityEngine.Object;
      layerIndex: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class CurveFilterOptions {
      positionError: number;
      rotationError: number;
      scaleError: number;
      floatError: number;
      keyframeReduction: boolean;
      unrollRotation: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class GameObjectRecorder {
      constructor(root: UnityEngine.GameObject);
      constructor();
      root: UnityEngine.GameObject;
      currentTime: number;
      isRecording: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      BindComponentsOfType: ((target: UnityEngine.GameObject, componentType: any, recursive: boolean) => void);
      Bind: ((binding: UnityEditor.EditorCurveBinding) => void);
      BindAll: ((target: UnityEngine.GameObject, recursive: boolean) => void);
      BindComponent: ((component: UnityEngine.Component) => void) | ((target: UnityEngine.GameObject, componentType: any, recursive: boolean) => void);
      GetBindings: (() => UnityEditor.EditorCurveBinding[]);
      TakeSnapshot: ((dt: number) => void);
      SaveToClip: ((clip: UnityEngine.AnimationClip) => void) | ((clip: UnityEngine.AnimationClip, fps: number) => void) | ((clip: UnityEngine.AnimationClip, fps: number, filterOptions: UnityEditor.Animations.CurveFilterOptions) => void);
      ResetRecording: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace AssetImporters {
    export declare class AssetImportContext {
      assetPath: string;
      selectedBuildTarget: UnityEditor.BuildTarget;
      mainObject: UnityEngine.Object;
      GetResultPath: ((extension: string) => string);
      SetMainObject: ((obj: UnityEngine.Object) => void);
      AddObjectToAsset: ((identifier: string, obj: UnityEngine.Object) => void) | ((identifier: string, obj: UnityEngine.Object, thumbnail: UnityEngine.Texture2D) => void);
      GetObjects: ((objects: any) => void);
      DependsOnSourceAsset: ((path: string) => void) | ((guid: UnityEditor.GUID) => void);
      DependsOnArtifact: ((key: UnityEditor.Experimental.ArtifactKey) => void) | ((guid: UnityEditor.GUID) => void) | ((path: string) => void);
      DependsOnCustomDependency: ((dependency: string) => void);
      LogImportError: ((msg: string, obj?: UnityEngine.Object) => void);
      LogImportWarning: ((msg: string, obj?: UnityEngine.Object) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class TexturePropertyDescription {
      offset: UnityEngine.Vector2;
      scale: UnityEngine.Vector2;
      texture: UnityEngine.Texture;
      relativePath: string;
      path: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class MaterialDescription {
      constructor();
      materialName: string;
      Dispose: (() => void);
      GetVector4PropertyNames: ((names: any) => void);
      GetFloatPropertyNames: ((names: any) => void);
      GetTexturePropertyNames: ((names: any) => void);
      GetStringPropertyNames: ((names: any) => void);
      HasAnimationCurveInClip: ((clipName: string, propertyName: string) => boolean);
      HasAnimationCurve: ((propertyName: string) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SpriteImportData {
      name: string;
      rect: UnityEngine.Rect;
      alignment: UnityEngine.SpriteAlignment;
      pivot: UnityEngine.Vector2;
      border: UnityEngine.Vector4;
      outline: any; // System.Collections.Generic.List`1[UnityEngine.Vector2[]]
      tessellationDetail: number;
      spriteID: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class TextureGenerationOutput {
      texture: UnityEngine.Texture2D;
      importInspectorWarnings: string;
      importWarnings: string[];
      thumbNail: UnityEngine.Texture2D;
      sprites: UnityEngine.Sprite[];
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SourceTextureInformation {
      constructor();
      width: number;
      height: number;
      containsAlpha: boolean;
      hdr: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class TextureGenerationSettings {
      constructor(type: UnityEditor.TextureImporterType);
      assetPath: string;
      qualifyForSpritePacking: boolean;
      enablePostProcessor: boolean;
      textureImporterSettings: UnityEditor.TextureImporterSettings;
      platformSettings: UnityEditor.TextureImporterPlatformSettings;
      sourceTextureInformation: UnityEditor.AssetImporters.SourceTextureInformation;
      spriteImportData: UnityEditor.AssetImporters.SpriteImportData[];
      spritePackingTag: string;
      secondarySpriteTextures: UnityEngine.SecondarySpriteTexture[];
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class TextureGenerator {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class FBXMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion: (() => any);
      GetPostprocessOrder: (() => number);
      OnPreprocessMaterialDescription: ((description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]) => void);
      LogWarning: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      LogError: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SketchupMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion: (() => any);
      GetPostprocessOrder: (() => number);
      OnPreprocessMaterialDescription: ((description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]) => void);
      LogWarning: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      LogError: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ThreeDSMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion: (() => any);
      GetPostprocessOrder: (() => number);
      OnPreprocessMaterialDescription: ((description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]) => void);
      LogWarning: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      LogError: ((warning: string) => void) | ((warning: string, context: UnityEngine.Object) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssetImporterEditor {
      showImportedObject: boolean;
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: UnityEditor.SerializedObject;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnEnable: (() => void);
      OnDisable: (() => void);
      OnInspectorGUI: (() => void);
      HasModified: (() => boolean);
      DrawDefaultInspector: (() => boolean);
      Repaint: (() => void);
      CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
      RequiresConstantRepaint: (() => boolean);
      DrawHeader: (() => void);
      HasPreviewGUI: (() => boolean);
      GetPreviewTitle: (() => UnityEngine.GUIContent);
      RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
      OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
      OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
      OnPreviewSettings: (() => void);
      GetInfoString: (() => string);
      DrawPreview: ((previewArea: UnityEngine.Rect) => void);
      ReloadPreviewInstances: (() => void);
      UseDefaultMargins: (() => boolean);
      Initialize: ((targets: UnityEngine.Object[]) => void);
      MoveNextTarget: (() => boolean);
      ResetTarget: (() => void);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ScriptedImporterEditor {
      constructor();
      showImportedObject: boolean;
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: UnityEditor.SerializedObject;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnEnable: (() => void);
      OnDisable: (() => void);
      OnInspectorGUI: (() => void);
      HasModified: (() => boolean);
      DrawDefaultInspector: (() => boolean);
      Repaint: (() => void);
      CreateInspectorGUI: (() => UnityEngine.UIElements.VisualElement);
      RequiresConstantRepaint: (() => boolean);
      DrawHeader: (() => void);
      HasPreviewGUI: (() => boolean);
      GetPreviewTitle: (() => UnityEngine.GUIContent);
      RenderStaticPreview: ((assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number) => UnityEngine.Texture2D);
      OnPreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
      OnInteractivePreviewGUI: ((r: UnityEngine.Rect, background: UnityEngine.GUIStyle) => void);
      OnPreviewSettings: (() => void);
      GetInfoString: (() => string);
      DrawPreview: ((previewArea: UnityEngine.Rect) => void);
      ReloadPreviewInstances: (() => void);
      UseDefaultMargins: (() => boolean);
      Initialize: ((targets: UnityEngine.Object[]) => void);
      MoveNextTarget: (() => boolean);
      ResetTarget: (() => void);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ScriptedImporter {
      assetPath: string;
      importSettingsMissing: boolean;
      assetTimeStamp: any; // System.UInt64
      userData: string;
      assetBundleName: string;
      assetBundleVariant: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnImportAsset: ((ctx: UnityEditor.AssetImporters.AssetImportContext) => void);
      SupportsRemappedAssetType: ((type: any) => boolean) | ((type: any) => boolean);
      SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
      SaveAndReimport: (() => void);
      AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
      RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
      GetExternalObjectMap: (() => any);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Audio {
    export declare class AudioMixerEffectPlugin {
      constructor();
      SetFloatParameter: ((name: string, value: number) => boolean);
      GetSampleRate: (() => number);
      IsPluginEditableAndEnabled: (() => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Build {
    export declare class BuildFailedException {
      constructor(message: string);
      constructor(innerException: any);
      Message: string;
      Data: any; // System.Collections.IDictionary
      InnerException: any; // System.Exception
      TargetSite: any; // System.Reflection.MethodBase
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => any);
      ToString: (() => string);
      GetObjectData: ((info: any, context: any) => void);
      GetType: (() => any) | (() => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
    }
    export declare class IOrderedCallback {
      callbackOrder: number;
    }
    export declare class IPreprocessBuild {
      OnPreprocessBuild: ((target: UnityEditor.BuildTarget, path: string) => void);
    }
    export declare class IPreprocessBuildWithReport {
      OnPreprocessBuild: ((report: UnityEditor.Build.Reporting.BuildReport) => void);
    }
    export declare class IFilterBuildAssemblies {
      OnFilterAssemblies: ((buildOptions: UnityEditor.BuildOptions, assemblies: string[]) => string[]);
    }
    export declare class IPostprocessBuild {
      OnPostprocessBuild: ((target: UnityEditor.BuildTarget, path: string) => void);
    }
    export declare class IPostprocessBuildWithReport {
      OnPostprocessBuild: ((report: UnityEditor.Build.Reporting.BuildReport) => void);
    }
    export declare class IPostBuildPlayerScriptDLLs {
      OnPostBuildPlayerScriptDLLs: ((report: UnityEditor.Build.Reporting.BuildReport) => void);
    }
    export declare class IProcessScene {
      OnProcessScene: ((scene: UnityEngine.SceneManagement.Scene) => void);
    }
    export declare class IProcessSceneWithReport {
      OnProcessScene: ((scene: UnityEngine.SceneManagement.Scene, report: UnityEditor.Build.Reporting.BuildReport) => void);
    }
    export declare class IActiveBuildTargetChanged {
      OnActiveBuildTargetChanged: ((previousTarget: UnityEditor.BuildTarget, newTarget: UnityEditor.BuildTarget) => void);
    }
    export declare class IPreprocessShaders {
      OnProcessShader: ((shader: UnityEngine.Shader, snippet: UnityEditor.Rendering.ShaderSnippetData, data: any) => void);
    }
    export declare class IPreprocessComputeShaders {
      OnProcessComputeShader: ((shader: UnityEngine.ComputeShader, kernelName: string, data: any) => void);
    }
    export declare class IUnityLinkerProcessor {
      GenerateAdditionalLinkXmlFile: ((report: UnityEditor.Build.Reporting.BuildReport, data: UnityEditor.UnityLinker.UnityLinkerBuildPipelineData) => string);
      OnBeforeRun: ((report: UnityEditor.Build.Reporting.BuildReport, data: UnityEditor.UnityLinker.UnityLinkerBuildPipelineData) => void);
      OnAfterRun: ((report: UnityEditor.Build.Reporting.BuildReport, data: UnityEditor.UnityLinker.UnityLinkerBuildPipelineData) => void);
    }
    export declare class IIl2CppProcessor {
      OnBeforeConvertRun: ((report: UnityEditor.Build.Reporting.BuildReport, data: UnityEditor.Il2Cpp.Il2CppBuildPipelineData) => void);
    }
    export namespace Content {
      export declare class SerializedLocation {
        fileName: string;
        offset: any; // System.UInt64
        size: any; // System.UInt64
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class ObjectSerializedInfo {
        serializedObject: UnityEditor.Build.Content.ObjectIdentifier;
        header: UnityEditor.Build.Content.SerializedLocation;
        rawData: UnityEditor.Build.Content.SerializedLocation;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class WriteResult {
        serializedObjects: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.Build.Content.ObjectSerializedInfo]
        resourceFiles: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.Build.Content.ResourceFile]
        includedTypes: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.Type]
        includedSerializeReferenceFQN: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.String]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class BuildReferenceMap {
        constructor();
        Dispose: (() => void);
        GetHash128: (() => UnityEngine.Hash128);
        AddMapping: ((internalFileName: string, serializationIndex: any, objectID: UnityEditor.Build.Content.ObjectIdentifier, overwrite?: boolean) => void);
        AddMappings: ((internalFileName: string, objectIDs: UnityEditor.Build.Content.SerializationInfo[], overwrite?: boolean) => void);
        FilterToSubset: ((objectIds: UnityEditor.Build.Content.ObjectIdentifier[]) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetObjectData: ((info: any, context: any) => void);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum ContentBuildFlags {
        None = 0,
        DisableWriteTypeTree = 1,
        StripUnityVersion = 2,
        DevelopmentBuild = 4,
      }
      export declare class BuildSettings {
        typeDB: UnityEditor.Build.Player.TypeDB;
        target: UnityEditor.BuildTarget;
        group: UnityEditor.BuildTargetGroup;
        buildFlags: UnityEditor.Build.Content.ContentBuildFlags;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class BuildUsageCache {
        constructor();
        Dispose: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class BuildUsageTagGlobal {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class BuildUsageTagSet {
        constructor();
        Dispose: (() => void);
        GetHash128: (() => UnityEngine.Hash128);
        GetObjectIdentifiers: (() => UnityEditor.Build.Content.ObjectIdentifier[]);
        UnionWith: ((other: UnityEditor.Build.Content.BuildUsageTagSet) => void);
        FilterToSubset: ((objectIds: UnityEditor.Build.Content.ObjectIdentifier[]) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetObjectData: ((info: any, context: any) => void);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum DependencyType {
        RecursiveOperation = 1,
        MissingReferences = 2,
        ValidReferences = 4,
        DefaultDependencies = 5,
      }
      export declare class ContentBuildInterface {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum CompressionType {
        None = 0,
        Lzma = 1,
        Lz4 = 2,
        Lz4HC = 3,
      }
      export enum CompressionLevel {
        None = 0,
        Fastest = 1,
        Fast = 2,
        Normal = 3,
        High = 4,
        Maximum = 5,
      }
      export declare class BuildCompression {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export enum ProfileEventType {
        Begin = 0,
        End = 1,
        Info = 2,
      }
      export enum ProfileCaptureOptions {
        None = 0,
        IgnoreShortEvents = 1,
      }
      export declare class ContentBuildProfileEvent {
        TimeMicroseconds: any; // System.UInt64
        Name: string;
        Metadata: string;
        Type: UnityEditor.Build.Content.ProfileEventType;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class GameManagerDependencyInfo {
        managerObjects: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.Build.Content.ObjectIdentifier]
        referencedObjects: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.Build.Content.ObjectIdentifier]
        includedTypes: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.Type]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export enum FileType {
        NonAssetType = 0,
        DeprecatedCachedAssetType = 1,
        SerializedAssetType = 2,
        MetaAssetType = 3,
      }
      export declare class ObjectIdentifier {
        guid: UnityEditor.GUID;
        localIdentifierInFile: any; // System.Int64
        fileType: UnityEditor.Build.Content.FileType;
        filePath: string;
        ToString: (() => string);
        Equals: ((obj: any) => boolean) | ((other: UnityEditor.Build.Content.ObjectIdentifier) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
      }
      export declare class ResourceFile {
        fileName: string;
        fileAlias: string;
        serializedFile: boolean;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class SceneDependencyInfo {
        scene: string;
        processedScene: string;
        referencedObjects: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.Build.Content.ObjectIdentifier]
        includedTypes: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.Type]
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class PreloadInfo {
        constructor();
        preloadObjects: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.ObjectIdentifier]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class AssetLoadInfo {
        constructor();
        asset: UnityEditor.GUID;
        address: string;
        includedObjects: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.ObjectIdentifier]
        referencedObjects: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.ObjectIdentifier]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class AssetBundleInfo {
        constructor();
        bundleName: string;
        bundleAssets: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.AssetLoadInfo]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SceneLoadInfo {
        constructor();
        asset: UnityEditor.GUID;
        address: string;
        internalName: string;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SceneBundleInfo {
        constructor();
        bundleName: string;
        bundleScenes: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.SceneLoadInfo]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SerializationInfo {
        constructor();
        serializationObject: UnityEditor.Build.Content.ObjectIdentifier;
        serializationIndex: any; // System.Int64
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class WriteCommand {
        constructor();
        fileName: string;
        internalName: string;
        serializeObjects: any; // System.Collections.Generic.List`1[UnityEditor.Build.Content.SerializationInfo]
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class WriteParameters {
        writeCommand: UnityEditor.Build.Content.WriteCommand;
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        usageSet: UnityEditor.Build.Content.BuildUsageTagSet;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        bundleInfo: UnityEditor.Build.Content.AssetBundleInfo;
        preloadInfo: UnityEditor.Build.Content.PreloadInfo;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class WriteSceneParameters {
        scenePath: string;
        writeCommand: UnityEditor.Build.Content.WriteCommand;
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        usageSet: UnityEditor.Build.Content.BuildUsageTagSet;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        preloadInfo: UnityEditor.Build.Content.PreloadInfo;
        sceneBundleInfo: UnityEditor.Build.Content.SceneBundleInfo;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class WriteManagerParameters {
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
    }
    export namespace Player {
      export enum ScriptCompilationOptions {
        None = 0,
        DevelopmentBuild = 1,
        Assertions = 2,
      }
      export declare class ScriptCompilationSettings {
        target: UnityEditor.BuildTarget;
        group: UnityEditor.BuildTargetGroup;
        options: UnityEditor.Build.Player.ScriptCompilationOptions;
        extraScriptingDefines: string[];
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class ScriptCompilationResult {
        assemblies: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.String]
        typeDB: UnityEditor.Build.Player.TypeDB;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class PlayerBuildInterface {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TypeDbHelper {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TypeDB {
        Dispose: (() => void);
        GetHash128: (() => UnityEngine.Hash128);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetObjectData: ((info: any, context: any) => void);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace Reporting {
      export declare class BuildFile {
        id: any; // System.UInt32
        path: string;
        role: string;
        size: any; // System.UInt64
        ToString: (() => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
      }
      export declare class BuildReport {
        files: UnityEditor.Build.Reporting.BuildFile[];
        steps: UnityEditor.Build.Reporting.BuildStep[];
        summary: UnityEditor.Build.Reporting.BuildSummary;
        strippingInfo: UnityEditor.Build.Reporting.StrippingInfo;
        packedAssets: UnityEditor.Build.Reporting.PackedAssets[];
        scenesUsingAssets: UnityEditor.Build.Reporting.ScenesUsingAssets[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
      export enum BuildResult {
        Unknown = 0,
        Succeeded = 1,
        Failed = 2,
        Cancelled = 3,
      }
      export declare class BuildStep {
        name: string;
        duration: any; // System.TimeSpan
        messages: UnityEditor.Build.Reporting.BuildStepMessage[];
        depth: number;
        ToString: (() => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
      }
      export declare class BuildStepMessage {
        type: UnityEngine.LogType;
        content: string;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class BuildSummary {
        buildStartedAt: any; // System.DateTime
        guid: UnityEditor.GUID;
        platform: UnityEditor.BuildTarget;
        platformGroup: UnityEditor.BuildTargetGroup;
        options: UnityEditor.BuildOptions;
        outputPath: string;
        totalSize: any; // System.UInt64
        totalTime: any; // System.TimeSpan
        buildEndedAt: any; // System.DateTime
        totalErrors: number;
        totalWarnings: number;
        result: UnityEditor.Build.Reporting.BuildResult;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class CommonRoles {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class PackedAssetInfo {
        id: any; // System.Int64
        type: any; // System.Type
        packedSize: any; // System.UInt64
        offset: any; // System.UInt64
        sourceAssetGUID: UnityEditor.GUID;
        sourceAssetPath: string;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class PackedAssets {
        constructor();
        file: any; // System.UInt32
        shortPath: string;
        overhead: any; // System.UInt64
        contents: UnityEditor.Build.Reporting.PackedAssetInfo[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class ScenesUsingAsset {
        assetPath: string;
        scenePaths: string[];
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class ScenesUsingAssets {
        constructor();
        list: UnityEditor.Build.Reporting.ScenesUsingAsset[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class StrippingInfo {
        constructor();
        includedModules: any; // System.Collections.Generic.IEnumerable`1[System.String]
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetReasonsForIncluding: ((entityName: string) => any);
        SetDirty: (() => void);
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
    }
  }
  export namespace Compilation {
    export declare class CompilationPipeline {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum CompilationPipeline_PrecompiledAssemblySources {
      UserAssembly = 1,
      UnityEngine = 2,
      UnityEditor = 4,
      SystemAssembly = 8,
      UnityAssembly = 16,
      All = -1,
    }
    export enum AssemblyBuilderStatus {
      NotStarted = 0,
      IsCompiling = 1,
      Finished = 2,
    }
    export enum AssemblyBuilderFlags {
      None = 0,
      EditorAssembly = 1,
      DevelopmentBuild = 2,
    }
    export enum ReferencesOptions {
      None = 0,
      UseEngineModules = 1,
    }
    export declare class AssemblyBuilder {
      constructor(assemblyPath: string, scriptPaths: string[]);
      scriptPaths: string[];
      assemblyPath: string;
      additionalDefines: string[];
      additionalReferences: string[];
      excludeReferences: string[];
      compilerOptions: UnityEditor.Compilation.ScriptCompilerOptions;
      referencesOptions: UnityEditor.Compilation.ReferencesOptions;
      flags: UnityEditor.Compilation.AssemblyBuilderFlags;
      buildTargetGroup: UnityEditor.BuildTargetGroup;
      buildTarget: UnityEditor.BuildTarget;
      defaultReferences: string[];
      defaultDefines: string[];
      status: UnityEditor.Compilation.AssemblyBuilderStatus;
      Build: (() => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssemblyDefinitionException {
      constructor(message: string, filePaths: string[]);
      filePaths: string[];
      Message: string;
      Data: any; // System.Collections.IDictionary
      InnerException: any; // System.Exception
      TargetSite: any; // System.Reflection.MethodBase
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => any);
      ToString: (() => string);
      GetObjectData: ((info: any, context: any) => void);
      GetType: (() => any) | (() => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
    }
    export declare class PrecompiledAssemblyException {
      constructor(message: string, filePaths: string[]);
      filePaths: string[];
      Message: string;
      Data: any; // System.Collections.IDictionary
      InnerException: any; // System.Exception
      TargetSite: any; // System.Reflection.MethodBase
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => any);
      ToString: (() => string);
      GetObjectData: ((info: any, context: any) => void);
      GetType: (() => any) | (() => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
    }
    export enum AssemblyFlags {
      None = 0,
      EditorAssembly = 1,
    }
    export declare class ScriptCompilerOptions {
      constructor();
      RoslynAnalyzerRulesetPath: string;
      RoslynAnalyzerDllPaths: string[];
      AllowUnsafeCode: boolean;
      EmitReferenceAssembly: boolean;
      AdditionalCompilerArguments: string[];
      CodeOptimization: UnityEditor.Compilation.CodeOptimization;
      ApiCompatibilityLevel: UnityEditor.ApiCompatibilityLevel;
      ResponseFiles: string[];
      LanguageVersion: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum AssembliesType {
      Editor = 0,
      Player = 1,
      PlayerWithoutTestAssemblies = 2,
    }
    export enum AssemblyDefinitionReferenceType {
      Name = 0,
      Guid = 1,
    }
    export enum CodeOptimization {
      None = 0,
      Debug = 1,
      Release = 2,
    }
    export declare class Assembly {
      constructor(name: string, outputPath: string, sourceFiles: string[], defines: string[], assemblyReferences: UnityEditor.Compilation.Assembly[], compiledAssemblyReferences: string[], flags: UnityEditor.Compilation.AssemblyFlags);
      constructor(name: string, outputPath: string, sourceFiles: string[], defines: string[], assemblyReferences: UnityEditor.Compilation.Assembly[], compiledAssemblyReferences: string[], flags: UnityEditor.Compilation.AssemblyFlags, compilerOptions: UnityEditor.Compilation.ScriptCompilerOptions);
      constructor(name: string, outputPath: string, sourceFiles: string[], defines: string[], assemblyReferences: UnityEditor.Compilation.Assembly[], compiledAssemblyReferences: string[], flags: UnityEditor.Compilation.AssemblyFlags, compilerOptions: UnityEditor.Compilation.ScriptCompilerOptions, rootNamespace: string);
      name: string;
      rootNamespace: string;
      outputPath: string;
      sourceFiles: string[];
      defines: string[];
      assemblyReferences: UnityEditor.Compilation.Assembly[];
      compiledAssemblyReferences: string[];
      flags: UnityEditor.Compilation.AssemblyFlags;
      compilerOptions: UnityEditor.Compilation.ScriptCompilerOptions;
      allReferences: string[];
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ResponseFileData {
      constructor();
      Defines: string[];
      FullPathReferences: string[];
      Errors: string[];
      OtherArguments: string[];
      Unsafe: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssemblyDefinitionPlatform {
      Name: string;
      DisplayName: string;
      BuildTarget: UnityEditor.BuildTarget;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum CompilerMessageType {
      Error = 0,
      Warning = 1,
    }
    export declare class CompilerMessage {
      message: string;
      file: string;
      line: number;
      column: number;
      type: UnityEditor.Compilation.CompilerMessageType;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Connect {
    export declare class UnityOAuth {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class UnityOAuth_AuthCodeResponse {
      AuthCode: string;
      Exception: any; // System.Exception
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace CrashReporting {
    export declare class CrashReportingSettings {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace EditorTools {
    export declare class IDrawSelectedHandles {
      OnDrawHandles: (() => void);
    }
    export declare class EditorTool {
      targets: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Object]
      target: UnityEngine.Object;
      toolbarIcon: UnityEngine.GUIContent;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnActivated: (() => void);
      OnWillBeDeactivated: (() => void);
      OnToolGUI: ((window: UnityEditor.EditorWindow) => void);
      IsAvailable: (() => boolean);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class EditorToolContext {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnToolGUI: ((window: UnityEditor.EditorWindow) => void);
      ResolveTool: ((tool: UnityEditor.Tool) => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class EditorTools {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class GameObjectToolContext {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnToolGUI: ((window: UnityEditor.EditorWindow) => void);
      ResolveTool: ((tool: UnityEditor.Tool) => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ToolManager {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Events {
    export declare class UnityEventTools {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Experimental {
    export declare class BuildPipelineExperimental {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorResources {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssetDatabaseExperimental {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssetDatabaseExperimental_CacheServerConnectionChangedParameters {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum AssetDatabaseExperimental_OnDemandMode {
      Off = 0,
      Lazy = 1,
      Background = 2,
    }
    export enum AssetDatabaseExperimental_ImportSyncMode {
      Block = 0,
      Queue = 1,
      Poll = 2,
    }
    export declare class AssetDatabaseExperimental_AssetDatabaseCounters {
      cacheServer: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_CacheServerCounters;
      import: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_ImportCounters;
      ResetDeltas: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AssetDatabaseExperimental_AssetDatabaseCounters_Counter {
      total: any; // System.Int64
      delta: any; // System.Int64
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AssetDatabaseExperimental_AssetDatabaseCounters_CacheServerCounters {
      metadataRequested: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataDownloaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataFailedToDownload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataUploaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataFailedToUpload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataVersionsDownloaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      metadataMatched: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactsDownloaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactFilesDownloaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactFilesFailedToDownload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactsUploaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactFilesUploaded: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      artifactFilesFailedToUpload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      connects: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      disconnects: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AssetDatabaseExperimental_AssetDatabaseCounters_ImportCounters {
      imported: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      importedInProcess: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      importedOutOfProcess: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      refresh: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      domainReload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AssetMoveInfo {
      constructor(sourceAssetPath: string, destinationAssetPath: string);
      sourceAssetPath: string;
      destinationAssetPath: string;
      Equals: ((other: UnityEditor.Experimental.AssetMoveInfo) => boolean) | ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AssetsModifiedProcessor {
      assetsReportedChanged: any; // System.Collections.Generic.HashSet`1[System.String]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Lightmapping {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum OnDemandState {
      Unavailable = 0,
      Processing = 1,
      Downloading = 2,
      Available = 3,
      Failed = 4,
    }
    export declare class ArtifactKey {
      constructor(g: UnityEditor.GUID);
      constructor(guid: UnityEditor.GUID, importerType: any);
      isValid: boolean;
      guid: UnityEditor.GUID;
      importerType: any; // System.Type
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ArtifactID {
      isValid: boolean;
      value: UnityEngine.Hash128;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class OnDemandProgress {
      state: UnityEditor.Experimental.OnDemandState;
      progress: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export namespace Build {
      export namespace AssetBundle {
        export enum CompressionType {
          None = 0,
          Lzma = 1,
          Lz4 = 2,
          Lz4HC = 3,
        }
        export enum CompressionLevel {
          None = 0,
          Fastest = 1,
          Fast = 2,
          Normal = 3,
          High = 4,
          Maximum = 5,
        }
        export declare class BuildCompression {
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => any);
        }
      }
    }
    export namespace Licensing {
      export declare class LicensingUtility {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace Rendering {
      export declare class IScriptableBakedReflectionSystem {
        stageCount: number;
        stateHashes: UnityEngine.Hash128[];
        Tick: ((sceneStateHash: UnityEditor.Experimental.Rendering.SceneStateHash, handle: UnityEditor.Experimental.Rendering.IScriptableBakedReflectionSystemStageNotifier) => void);
        SynchronizeReflectionProbes: (() => void);
        Clear: (() => void);
        Cancel: (() => void);
        BakeAllReflectionProbes: (() => boolean);
      }
      export declare class IScriptableBakedReflectionSystemStageNotifier {
        EnterStage: ((stage: number, progressMessage: string, progress: number) => void);
        ExitStage: ((stage: number) => void);
        SetIsDone: ((isDone: boolean) => void);
      }
      export declare class SceneStateHash {
        constructor(sceneObjectsHash: UnityEngine.Hash128, skySettingsHash: UnityEngine.Hash128, ambientProbeHash: UnityEngine.Hash128);
        sceneObjectsHash: UnityEngine.Hash128;
        skySettingsHash: UnityEngine.Hash128;
        ambientProbeHash: UnityEngine.Hash128;
        Equals: ((other: UnityEditor.Experimental.Rendering.SceneStateHash) => boolean) | ((obj: any) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => any);
      }
      export declare class ScriptableBakedReflectionSystem {
        stageCount: number;
        stateHashes: UnityEngine.Hash128[];
        Tick: ((sceneStateHash: UnityEditor.Experimental.Rendering.SceneStateHash, handle: UnityEditor.Experimental.Rendering.IScriptableBakedReflectionSystemStageNotifier) => void);
        SynchronizeReflectionProbes: (() => void);
        Clear: (() => void);
        Cancel: (() => void);
        BakeAllReflectionProbes: (() => boolean);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ScriptableBakedReflectionSystemSettings {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace RestService {
      export declare class PlayerDataFileLocator {
        constructor();
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class PlayerDataFileLocator_Locator {
        constructor(object: any, method: any);
        Method: any; // System.Reflection.MethodInfo
        Target: any; // System.Object
        GetObjectData: ((info: any, context: any) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => any[]);
        DynamicInvoke: ((args: any[]) => any);
        Clone: (() => any);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace SceneManagement {
      export declare class PrefabStage {
        prefabContentsRoot: UnityEngine.GameObject;
        openedFromInstanceRoot: UnityEngine.GameObject;
        openedFromInstanceObject: UnityEngine.GameObject;
        mode: UnityEditor.Experimental.SceneManagement.PrefabStage_Mode;
        assetPath: string;
        prefabAssetPath: string;
        scene: UnityEngine.SceneManagement.Scene;
        stageHandle: UnityEditor.SceneManagement.StageHandle;
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetCombinedSceneCullingMaskForCamera: (() => any);
        IsPartOfPrefabContents: ((gameObject: UnityEngine.GameObject) => boolean);
        ClearDirtiness: (() => void);
        SetDirty: (() => void);
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
      export enum PrefabStage_Mode {
        InIsolation = 0,
        InContext = 1,
      }
      export declare class PrefabStageUtility {
        constructor();
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace TerrainAPI {
      export declare class TerrainToolShortcutContext {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum BrushGUIEditFlags {
        Select = 1,
        Inspect = 2,
        Size = 4,
        Opacity = 8,
        SelectAndInspect = 3,
        All = 15,
      }
      export enum RepaintFlags {
        UI = 1,
        Scene = 2,
      }
      export declare class IOnPaint {
        brushTexture: UnityEngine.Texture;
        uv: UnityEngine.Vector2;
        brushStrength: number;
        brushSize: number;
        hitValidTerrain: boolean;
        raycastHit: any; // UnityEngine.RaycastHit
        RepaintAllInspectors: (() => void);
        Repaint: ((flags?: UnityEditor.Experimental.TerrainAPI.RepaintFlags) => void);
      }
      export declare class IOnSceneGUI {
        sceneView: UnityEditor.SceneView;
        brushTexture: UnityEngine.Texture;
        brushStrength: number;
        brushSize: number;
        hitValidTerrain: boolean;
        raycastHit: any; // UnityEngine.RaycastHit
        Repaint: ((flags?: UnityEditor.Experimental.TerrainAPI.RepaintFlags) => void);
      }
      export declare class IOnInspectorGUI {
        ShowBrushesGUI: ((spacing: number) => void) | ((spacing: number, flags: UnityEditor.Experimental.TerrainAPI.BrushGUIEditFlags) => void) | ((spacing: number, flags: UnityEditor.Experimental.TerrainAPI.BrushGUIEditFlags, textureResolutionPerTile: number) => void);
        Repaint: ((flags?: UnityEditor.Experimental.TerrainAPI.RepaintFlags) => void);
      }
      export declare class TerrainPaintUtilityEditor {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum TerrainPaintUtilityEditor_BrushPreview {
        SourceRenderTexture = 0,
        DestinationRenderTexture = 1,
      }
    }
  }
  export namespace Hardware {
    export declare class UsbDevice {
      vendorId: number;
      productId: number;
      revision: number;
      udid: string;
      name: string;
      ToString: (() => string);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
    }
    export declare class Usb {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Usb_OnDevicesChangedHandler {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((devices: UnityEditor.Hardware.UsbDevice[]) => void);
      BeginInvoke: ((devices: UnityEditor.Hardware.UsbDevice[], callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum DevDeviceState {
      Disconnected = 0,
      Connected = 1,
    }
    export enum DevDeviceFeatures {
      None = 0,
      PlayerConnection = 1,
      RemoteConnection = 2,
    }
    export declare class DevDevice {
      constructor(id: string, name: string, type: string, module: string, state: UnityEditor.Hardware.DevDeviceState, features: UnityEditor.Hardware.DevDeviceFeatures);
      isConnected: boolean;
      id: string;
      name: string;
      type: string;
      module: string;
      state: UnityEditor.Hardware.DevDeviceState;
      features: UnityEditor.Hardware.DevDeviceFeatures;
      ToString: (() => string);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
    }
    export declare class DevDeviceList {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class DevDeviceList_OnChangedHandler {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: (() => void);
      BeginInvoke: ((callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Il2Cpp {
    export declare class Il2CppBuildPipelineData {
      constructor(target: UnityEditor.BuildTarget, inputDirectory: string);
      target: UnityEditor.BuildTarget;
      inputDirectory: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace IMGUI {
    export namespace Controls {
      export declare class ArcHandle {
        constructor();
        angle: number;
        radius: number;
        angleHandleColor: UnityEngine.Color;
        radiusHandleColor: UnityEngine.Color;
        fillColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        angleHandleDrawFunction: UnityEditor.Handles_CapFunction;
        angleHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        radiusHandleDrawFunction: UnityEditor.Handles_CapFunction;
        radiusHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColorWithoutRadiusHandle: ((color: UnityEngine.Color, fillColorAlpha: number) => void);
        SetColorWithRadiusHandle: ((color: UnityEngine.Color, fillColorAlpha: number) => void);
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class JointAngularLimitHandle {
        constructor();
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
        zMin: number;
        zMax: number;
        xRange: UnityEngine.Vector2;
        yRange: UnityEngine.Vector2;
        zRange: UnityEngine.Vector2;
        xMotion: any; // UnityEngine.ConfigurableJointMotion
        yMotion: any; // UnityEngine.ConfigurableJointMotion
        zMotion: any; // UnityEngine.ConfigurableJointMotion
        xHandleColor: UnityEngine.Color;
        yHandleColor: UnityEngine.Color;
        zHandleColor: UnityEngine.Color;
        radius: number;
        fillAlpha: number;
        wireframeAlpha: number;
        angleHandleDrawFunction: UnityEditor.Handles_CapFunction;
        angleHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class BoxBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        size: UnityEngine.Vector3;
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor: ((color: UnityEngine.Color) => void);
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class CapsuleBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        heightAxis: UnityEditor.IMGUI.Controls.CapsuleBoundsHandle_HeightAxis;
        height: number;
        radius: number;
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor: ((color: UnityEngine.Color) => void);
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum CapsuleBoundsHandle_HeightAxis {
        X = 0,
        Y = 1,
        Z = 2,
      }
      export declare class PrimitiveBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor: ((color: UnityEngine.Color) => void);
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum PrimitiveBoundsHandle_Axes {
        None = 0,
        X = 1,
        Y = 2,
        Z = 4,
        All = 7,
      }
      export declare class SphereBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        radius: number;
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor: ((color: UnityEngine.Color) => void);
        DrawHandle: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SearchField {
        constructor();
        searchFieldControlID: number;
        autoSetFocusOnFindCommand: boolean;
        SetFocus: (() => void);
        HasFocus: (() => boolean);
        OnGUI: ((rect: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle, cancelButtonStyle: UnityEngine.GUIStyle, emptyCancelButtonStyle: UnityEngine.GUIStyle) => string) | ((rect: UnityEngine.Rect, text: string) => string) | ((text: string, options: UnityEngine.GUILayoutOption[]) => string);
        OnToolbarGUI: ((rect: UnityEngine.Rect, text: string) => string) | ((text: string, options: UnityEngine.GUILayoutOption[]) => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SearchField_SearchFieldCallback {
        constructor(object: any, method: any);
        Method: any; // System.Reflection.MethodInfo
        Target: any; // System.Object
        Invoke: (() => void);
        BeginInvoke: ((callback: any, object: any) => any);
        EndInvoke: ((result: any) => void);
        GetObjectData: ((info: any, context: any) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => any[]);
        DynamicInvoke: ((args: any[]) => any);
        Clone: (() => any);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeader {
        constructor(state: UnityEditor.IMGUI.Controls.MultiColumnHeaderState);
        sortedColumnIndex: number;
        state: UnityEditor.IMGUI.Controls.MultiColumnHeaderState;
        height: number;
        canSort: boolean;
        SetSortingColumns: ((columnIndices: number[], sortAscending: boolean[]) => void);
        SetSorting: ((columnIndex: number, sortAscending: boolean) => void);
        SetSortDirection: ((columnIndex: number, sortAscending: boolean) => void);
        IsSortedAscending: ((columnIndex: number) => boolean);
        GetColumn: ((columnIndex: number) => UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column);
        IsColumnVisible: ((columnIndex: number) => boolean);
        GetVisibleColumnIndex: ((columnIndex: number) => number);
        GetCellRect: ((visibleColumnIndex: number, rowRect: UnityEngine.Rect) => UnityEngine.Rect);
        GetColumnRect: ((visibleColumnIndex: number) => UnityEngine.Rect);
        ResizeToFit: (() => void);
        OnGUI: ((rect: UnityEngine.Rect, xScroll: number) => void);
        Repaint: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeader_HeaderCallback {
        constructor(object: any, method: any);
        Method: any; // System.Reflection.MethodInfo
        Target: any; // System.Object
        Invoke: ((multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader) => void);
        BeginInvoke: ((multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader, callback: any, object: any) => any);
        EndInvoke: ((result: any) => void);
        GetObjectData: ((info: any, context: any) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => any[]);
        DynamicInvoke: ((args: any[]) => any);
        Clone: (() => any);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeader_DefaultGUI {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeader_DefaultStyles {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeaderState {
        constructor(columns: UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column[]);
        sortedColumnIndex: number;
        maximumNumberOfSortedColumns: number;
        sortedColumns: number[];
        columns: UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column[];
        visibleColumns: number[];
        widthOfAllVisibleColumns: number;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class MultiColumnHeaderState_Column {
        constructor();
        width: number;
        sortedAscending: boolean;
        headerContent: UnityEngine.GUIContent;
        contextMenuText: string;
        headerTextAlignment: UnityEngine.TextAlignment;
        sortingArrowAlignment: UnityEngine.TextAlignment;
        minWidth: number;
        maxWidth: number;
        autoResize: boolean;
        allowToggleVisibility: boolean;
        canSort: boolean;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeViewState {
        constructor();
        selectedIDs: any; // System.Collections.Generic.List`1[System.Int32]
        lastClickedID: number;
        expandedIDs: any; // System.Collections.Generic.List`1[System.Int32]
        searchString: string;
        scrollPos: UnityEngine.Vector2;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeViewItem {
        constructor();
        constructor(id: number);
        constructor(id: number, depth: number);
        constructor(id: number, depth: number, displayName: string);
        id: number;
        displayName: string;
        depth: number;
        hasChildren: boolean;
        children: any; // System.Collections.Generic.List`1[UnityEditor.IMGUI.Controls.TreeViewItem]
        parent: UnityEditor.IMGUI.Controls.TreeViewItem;
        icon: UnityEngine.Texture2D;
        AddChild: ((child: UnityEditor.IMGUI.Controls.TreeViewItem) => void);
        CompareTo: ((other: UnityEditor.IMGUI.Controls.TreeViewItem) => number);
        ToString: (() => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
      }
      export declare class TreeView {
        constructor(state: UnityEditor.IMGUI.Controls.TreeViewState);
        constructor(state: UnityEditor.IMGUI.Controls.TreeViewState, multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader);
        state: UnityEditor.IMGUI.Controls.TreeViewState;
        multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader;
        totalHeight: number;
        treeViewControlID: number;
        hasSearch: boolean;
        searchString: string;
        Reload: (() => void);
        Repaint: (() => void);
        GetRows: (() => any);
        ExpandAll: (() => void);
        CollapseAll: (() => void);
        SetExpandedRecursive: ((id: number, expanded: boolean) => void);
        SetExpanded: ((id: number, expanded: boolean) => boolean) | ((ids: any) => void);
        GetExpanded: (() => any);
        IsExpanded: ((id: number) => boolean);
        GetSelection: (() => any);
        SetSelection: ((selectedIDs: any) => void) | ((selectedIDs: any, options: UnityEditor.IMGUI.Controls.TreeViewSelectionOptions) => void);
        IsSelected: ((id: number) => boolean);
        HasSelection: (() => boolean);
        HasFocus: (() => boolean);
        SetFocus: (() => void);
        SetFocusAndEnsureSelectedItem: (() => void);
        BeginRename: ((item: UnityEditor.IMGUI.Controls.TreeViewItem) => boolean) | ((item: UnityEditor.IMGUI.Controls.TreeViewItem, delay: number) => boolean);
        EndRename: (() => void);
        FrameItem: ((id: number) => void);
        OnGUI: ((rect: UnityEngine.Rect) => void);
        SelectAllRows: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeView_DoFoldoutCallback {
        constructor(object: any, method: any);
        Method: any; // System.Reflection.MethodInfo
        Target: any; // System.Object
        Invoke: ((position: UnityEngine.Rect, expandedState: boolean, style: UnityEngine.GUIStyle) => boolean);
        BeginInvoke: ((position: UnityEngine.Rect, expandedState: boolean, style: UnityEngine.GUIStyle, callback: any, object: any) => any);
        EndInvoke: ((result: any) => boolean);
        GetObjectData: ((info: any, context: any) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => any[]);
        DynamicInvoke: ((args: any[]) => any);
        Clone: (() => any);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeView_GetNewSelectionFunction {
        constructor(object: any, method: any);
        Method: any; // System.Reflection.MethodInfo
        Target: any; // System.Object
        Invoke: ((clickedItem: UnityEditor.IMGUI.Controls.TreeViewItem, keepMultiSelection: boolean, useActionKeyAsShift: boolean) => any);
        BeginInvoke: ((clickedItem: UnityEditor.IMGUI.Controls.TreeViewItem, keepMultiSelection: boolean, useActionKeyAsShift: boolean, callback: any, object: any) => any);
        EndInvoke: ((result: any) => any);
        GetObjectData: ((info: any, context: any) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => any[]);
        DynamicInvoke: ((args: any[]) => any);
        Clone: (() => any);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeView_DefaultGUI {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class TreeView_DefaultStyles {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum TreeViewSelectionOptions {
        None = 0,
        FireSelectionChanged = 1,
        RevealAndFrame = 2,
      }
      export declare class AdvancedDropdownItem {
        constructor(name: string);
        name: string;
        icon: UnityEngine.Texture2D;
        id: number;
        enabled: boolean;
        children: any; // System.Collections.Generic.IEnumerable`1[UnityEditor.IMGUI.Controls.AdvancedDropdownItem]
        AddChild: ((child: UnityEditor.IMGUI.Controls.AdvancedDropdownItem) => void);
        CompareTo: ((o: any) => number);
        AddSeparator: (() => void);
        ToString: (() => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
      }
      export declare class AdvancedDropdownState {
        constructor();
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class AdvancedDropdown {
        constructor(state: UnityEditor.IMGUI.Controls.AdvancedDropdownState);
        Show: ((rect: UnityEngine.Rect) => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
  }
  export namespace Localization {
    export namespace Editor {
      export declare class Localization {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class LocalizationGroup {
        constructor();
        constructor(behaviour: UnityEngine.Behaviour);
        constructor(type: any);
        constructor(obj: any);
        locGroupName: string;
        Dispose: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
  }
  export namespace Macros {
    export declare class MacroEvaluator {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class MethodEvaluator {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Media {
    export declare class MediaRational {
      constructor(numerator: number);
      constructor(numerator: number, denominator: number);
      inverse: UnityEditor.Media.MediaRational;
      isValid: boolean;
      isZero: boolean;
      isNegative: boolean;
      numerator: number;
      denominator: number;
      Set: ((numerator: number, denominator?: number) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class MediaTime {
      constructor(seconds: any);
      constructor(count: any, rateNumerator: any, rateDenominator?: any);
      count: any; // System.Int64
      rate: UnityEditor.Media.MediaRational;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class VideoTrackAttributes {
      frameRate: UnityEditor.Media.MediaRational;
      width: any; // System.UInt32
      height: any; // System.UInt32
      includeAlpha: boolean;
      bitRateMode: UnityEditor.VideoBitrateMode;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AudioTrackAttributes {
      sampleRate: UnityEditor.Media.MediaRational;
      channelCount: any; // System.UInt16
      language: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class MediaEncoder {
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes[]);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes);
      constructor(filePath: string, audioAttrs: UnityEditor.Media.AudioTrackAttributes[]);
      constructor(filePath: string, audioAttrs: UnityEditor.Media.AudioTrackAttributes);
      m_Ptr: any; // System.IntPtr
      AddFrame: ((width: number, height: number, rowBytes: number, format: UnityEngine.TextureFormat, data: any) => boolean) | ((width: number, height: number, rowBytes: number, format: UnityEngine.TextureFormat, data: any, time: UnityEditor.Media.MediaTime) => boolean) | ((texture: UnityEngine.Texture2D) => boolean) | ((texture: UnityEngine.Texture2D, time: UnityEditor.Media.MediaTime) => boolean);
      AddSamples: ((trackIndex: any, interleavedSamples: any) => boolean) | ((interleavedSamples: any) => boolean);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace MemoryProfiler {
    export declare class MemorySnapshot {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class PackedMemorySnapshot {
      constructor(snapshot: UnityEditor.Profiling.Memory.Experimental.PackedMemorySnapshot);
      nativeTypes: UnityEditor.MemoryProfiler.PackedNativeType[];
      nativeObjects: UnityEditor.MemoryProfiler.PackedNativeUnityEngineObject[];
      gcHandles: UnityEditor.MemoryProfiler.PackedGCHandle[];
      connections: UnityEditor.MemoryProfiler.Connection[];
      managedHeapSections: UnityEditor.MemoryProfiler.MemorySection[];
      typeDescriptions: UnityEditor.MemoryProfiler.TypeDescription[];
      virtualMachineInformation: UnityEditor.MemoryProfiler.VirtualMachineInformation;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class PackedNativeType {
      constructor(name: string, nativeBaseTypeArrayIndex: number);
      name: string;
      baseClassId: number;
      nativeBaseTypeArrayIndex: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PackedNativeUnityEngineObject {
      constructor(name: string, instanceId: number, size: number, nativeTypeArrayIndex: number, hideFlags: UnityEngine.HideFlags, flags: UnityEditor.MemoryProfiler.PackedNativeUnityEngineObject_ObjectFlags, nativeObjectAddress: any);
      isPersistent: boolean;
      isDontDestroyOnLoad: boolean;
      isManager: boolean;
      name: string;
      instanceId: number;
      size: number;
      classId: number;
      nativeTypeArrayIndex: number;
      hideFlags: UnityEngine.HideFlags;
      nativeObjectAddress: any; // System.Int64
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum PackedNativeUnityEngineObject_ObjectFlags {
      IsDontDestroyOnLoad = 1,
      IsPersistent = 2,
      IsManager = 4,
    }
    export declare class PackedGCHandle {
      constructor(target: any);
      target: any; // System.UInt64
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class Connection {
      constructor(from: number, to: number);
      from: number;
      to: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class MemorySection {
      constructor(bytes: any[], startAddress: any);
      bytes: any[];
      startAddress: any; // System.UInt64
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class TypeDescription {
      constructor(name: string, assembly: string, fields: UnityEditor.MemoryProfiler.FieldDescription[], staticFieldBytes: any[], baseOrElementTypeIndes: number, size: number, typeInfoAddress: any, typeIndex: number, flags: UnityEditor.MemoryProfiler.TypeDescription_TypeFlags);
      isValueType: boolean;
      isArray: boolean;
      arrayRank: number;
      name: string;
      assembly: string;
      fields: UnityEditor.MemoryProfiler.FieldDescription[];
      staticFieldBytes: any[];
      baseOrElementTypeIndex: number;
      size: number;
      typeInfoAddress: any; // System.UInt64
      typeIndex: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum TypeDescription_TypeFlags {
      kNone = 0,
      kValueType = 1,
      kArray = 2,
      kArrayRankMask = -65536,
    }
    export declare class FieldDescription {
      constructor(name: string, offset: number, typeIndex: number, isStatic: boolean);
      name: string;
      offset: number;
      typeIndex: number;
      isStatic: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class VirtualMachineInformation {
      pointerSize: number;
      objectHeaderSize: number;
      arrayHeaderSize: number;
      arrayBoundsOffsetInHeader: number;
      arraySizeOffsetInHeader: number;
      allocationGranularity: number;
      heapFormatVersion: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace MPE {
    export declare class ChannelClient {
      clientId: number;
      channelName: string;
      isAutoTick: boolean;
      IsConnected: (() => boolean);
      Start: ((autoTick: boolean) => void);
      Stop: (() => void);
      Close: (() => void);
      Tick: (() => void);
      Send: ((data: string) => void) | ((data: any[]) => void);
      RegisterMessageHandler: ((handler: any) => any) | ((handler: any) => any);
      UnregisterMessageHandler: ((handler: any) => void) | ((handler: any) => void);
      NewRequestId: (() => number);
      GetChannelClientInfo: (() => UnityEditor.MPE.ChannelClientInfo);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ChannelClientScope {
      constructor(autoTick: boolean, channelName: string, handler: any, closeClientOnExit?: boolean);
      constructor(autoTick: boolean, channelName: string, handler: any, closeClientOnExit?: boolean);
      client: UnityEditor.MPE.ChannelClient;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ChannelService {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ChannelScope {
      constructor(channelName: string, handler: any, closeChannelOnExit?: boolean);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum EventDataSerialization {
      StandardJson = 0,
      JsonUtility = 1,
    }
    export declare class EventService {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum ProcessEvent {
      UMP_EVENT_UNDEFINED = 0,
      Undefined = 0,
      UMP_EVENT_CREATE = 1,
      Create = 1,
      UMP_EVENT_INITIALIZE = 2,
      Initialize = 2,
      UMP_EVENT_AFTER_DOMAIN_RELOAD = 3,
      AfterDomainReload = 3,
      UMP_EVENT_SHUTDOWN = 4,
      Shutdown = 4,
    }
    export enum ProcessLevel {
      UMP_UNDEFINED = 0,
      Undefined = 0,
      UMP_MASTER = 1,
      Master = 1,
      UMP_SLAVE = 2,
      Slave = 2,
    }
    export enum ProcessState {
      UMP_UNKNOWN_PROCESS = 0,
      UnknownProcess = 0,
      UMP_FINISHED_SUCCESSFULLY = 1,
      FinishedSuccessfully = 1,
      UMP_FINISHED_WITH_ERROR = 2,
      FinishedWithError = 2,
      UMP_RUNNING = 3,
      Running = 3,
    }
    export declare class ChannelInfo {
      name: string;
      id: number;
      Equals: ((obj: UnityEditor.MPE.ChannelInfo) => boolean) | ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ChannelClientInfo {
      name: string;
      clientId: number;
      connectionId: number;
      Equals: ((obj: UnityEditor.MPE.ChannelClientInfo) => boolean) | ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ProcessService {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Networking {
    export namespace PlayerConnection {
      export declare class PlayerConnectionGUIUtility {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class PlayerConnectionGUI {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class PlayerConnectionGUILayout {
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ConnectedPlayer {
        constructor();
        constructor(playerId: number);
        constructor(playerId: number, name: string);
        PlayerId: number;
        playerId: number;
        name: string;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class EditorConnection {
        constructor();
        ConnectedPlayers: any; // System.Collections.Generic.List`1[UnityEditor.Networking.PlayerConnection.ConnectedPlayer]
        name: string;
        hideFlags: UnityEngine.HideFlags;
        Initialize: (() => void);
        Register: ((messageId: any, callback: any) => void);
        Unregister: ((messageId: any, callback: any) => void);
        RegisterConnection: ((callback: any) => void);
        RegisterDisconnection: ((callback: any) => void);
        UnregisterConnection: ((callback: any) => void);
        UnregisterDisconnection: ((callback: any) => void);
        Send: ((messageId: any, data: any[], playerId: number) => void) | ((messageId: any, data: any[]) => void);
        TrySend: ((messageId: any, data: any[], playerId: number) => boolean) | ((messageId: any, data: any[]) => boolean);
        DisconnectAll: (() => void);
        SetDirty: (() => void);
        GetInstanceID: (() => number);
        GetHashCode: (() => number);
        Equals: ((other: any) => boolean);
        ToString: (() => string);
        GetType: (() => any);
      }
    }
  }
  export namespace PackageManager {
    export declare class AuthorInfo {
      name: string;
      email: string;
      url: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class BuildUtilities {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Client {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class DependencyInfo {
      version: string;
      name: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class Error {
      errorCode: UnityEditor.PackageManager.ErrorCode;
      message: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum ErrorCode {
      Unknown = 0,
      NotFound = 1,
      Forbidden = 2,
      InvalidParameter = 3,
      Conflict = 4,
    }
    export declare class Events {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class GitInfo {
      hash: string;
      revision: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IShouldIncludeInBuildCallback {
      PackageName: string;
      ShouldIncludeInBuild: ((path: string) => boolean);
    }
    export enum LogLevel {
      Error = 0,
      Warn = 1,
      Info = 2,
      Verbose = 3,
      Debug = 4,
      Silly = 5,
    }
    export declare class PackageCollection {
      error: UnityEditor.PackageManager.Error;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class PackageInfo {
      packageId: string;
      isDirectDependency: boolean;
      version: string;
      source: UnityEditor.PackageManager.PackageSource;
      resolvedPath: string;
      assetPath: string;
      name: string;
      displayName: string;
      category: string;
      type: string;
      description: string;
      status: UnityEditor.PackageManager.PackageStatus;
      errors: UnityEditor.PackageManager.Error[];
      versions: UnityEditor.PackageManager.VersionsInfo;
      dependencies: UnityEditor.PackageManager.DependencyInfo[];
      resolvedDependencies: UnityEditor.PackageManager.DependencyInfo[];
      keywords: string[];
      author: UnityEditor.PackageManager.AuthorInfo;
      documentationUrl: string;
      changelogUrl: string;
      licensesUrl: string;
      registry: UnityEditor.PackageManager.RegistryInfo;
      datePublished?: any; // System.Nullable`1[System.DateTime]
      git: UnityEditor.PackageManager.GitInfo;
      repository: UnityEditor.PackageManager.RepositoryInfo;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class PackageRegistrationEventArgs {
      added: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.PackageManager.PackageInfo]
      removed: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.PackageManager.PackageInfo]
      changedFrom: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.PackageManager.PackageInfo]
      changedTo: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[UnityEditor.PackageManager.PackageInfo]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum PackageSource {
      Unknown = 0,
      Registry = 1,
      BuiltIn = 2,
      Embedded = 3,
      Local = 4,
      Git = 5,
      LocalTarball = 6,
    }
    export enum PackageStatus {
      Unknown = 0,
      Unavailable = 1,
      InProgress = 2,
      Error = 3,
      Available = 4,
    }
    export declare class PackOperationResult {
      tarballPath: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RegistryInfo {
      name: string;
      url: string;
      isDefault: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RepositoryInfo {
      type: string;
      url: string;
      revision: string;
      path: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum StatusCode {
      InProgress = 0,
      Success = 1,
      Failure = 2,
    }
    export declare class VersionsInfo {
      all: string[];
      compatible: string[];
      verified: string;
      recommended: string;
      latest: string;
      latestCompatible: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export namespace Requests {
      export declare class AddRequest {
        Result: UnityEditor.PackageManager.PackageInfo;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class EmbedRequest {
        Result: UnityEditor.PackageManager.PackageInfo;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ListRequest {
        Result: UnityEditor.PackageManager.PackageCollection;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class PackRequest {
        Result: UnityEditor.PackageManager.PackOperationResult;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class RemoveRequest {
        PackageIdOrName: string;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class Request {
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class SearchRequest {
        PackageIdOrName: string;
        Result: UnityEditor.PackageManager.PackageInfo[];
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ResetToEditorDefaultsRequest {
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
  }
  export namespace Playables {
    export declare class PlayableOutputEditorExtensions {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Utility {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Presets {
    export declare class PresetSelectorReceiver {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelectionChanged: ((selection: UnityEditor.Presets.Preset) => void);
      OnSelectionClosed: ((selection: UnityEditor.Presets.Preset) => void);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class DefaultPresetSelectorReceiver {
      constructor();
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelectionChanged: ((selection: UnityEditor.Presets.Preset) => void);
      OnSelectionClosed: ((selection: UnityEditor.Presets.Preset) => void);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PresetSelector {
      constructor();
      rootVisualElement: UnityEngine.UIElements.VisualElement;
      wantsMouseMove: boolean;
      wantsMouseEnterLeaveWindow: boolean;
      wantsLessLayoutEvents: boolean;
      autoRepaintOnSceneChange: boolean;
      maximized: boolean;
      hasFocus: boolean;
      docked: boolean;
      hasUnsavedChanges: boolean;
      saveChangesMessage: string;
      minSize: UnityEngine.Vector2;
      maxSize: UnityEngine.Vector2;
      title: string;
      titleContent: UnityEngine.GUIContent;
      depthBufferBits: number;
      antiAlias: number;
      position: UnityEngine.Rect;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      BeginWindows: (() => void);
      EndWindows: (() => void);
      ShowNotification: ((notification: UnityEngine.GUIContent) => void) | ((notification: UnityEngine.GUIContent, fadeoutWait: number) => void);
      RemoveNotification: (() => void);
      ShowTab: (() => void);
      Focus: (() => void);
      ShowUtility: (() => void);
      ShowPopup: (() => void);
      ShowModalUtility: (() => void);
      ShowAsDropDown: ((buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2) => void);
      Show: (() => void) | ((immediateDisplay: boolean) => void);
      ShowAuxWindow: (() => void);
      ShowModal: (() => void);
      SaveChanges: (() => void);
      Close: (() => void);
      Repaint: (() => void);
      SendEvent: ((e: UnityEngine.Event) => boolean);
      GetExtraPaneTypes: (() => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class Preset {
      constructor(source: UnityEngine.Object);
      PropertyModifications: UnityEditor.PropertyModification[];
      excludedProperties: string[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ApplyTo: ((target: UnityEngine.Object) => boolean) | ((target: UnityEngine.Object, selectedPropertyPaths: string[]) => boolean);
      DataEquals: ((target: UnityEngine.Object) => boolean);
      UpdateProperties: ((source: UnityEngine.Object) => boolean);
      GetPresetType: (() => UnityEditor.Presets.PresetType);
      GetTargetFullTypeName: (() => string);
      GetTargetTypeName: (() => string);
      IsValid: (() => boolean);
      CanBeAppliedTo: ((target: UnityEngine.Object) => boolean);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class DefaultPreset {
      constructor(filter: string, preset: UnityEditor.Presets.Preset);
      constructor(filter: string, preset: UnityEditor.Presets.Preset, enabled: boolean);
      filter: string;
      preset: UnityEditor.Presets.Preset;
      enabled: boolean;
      m_Filter: string;
      m_Preset: UnityEditor.Presets.Preset;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PresetType {
      constructor(o: UnityEngine.Object);
      Equals: ((obj: any) => boolean) | ((other: UnityEditor.Presets.PresetType) => boolean);
      GetHashCode: (() => number);
      IsValid: (() => boolean);
      IsValidDefault: (() => boolean);
      GetManagedTypeName: (() => string);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Profiling {
    export declare class ProfilerCategoryInfo {
      id: any; // System.UInt16
      color: UnityEngine.Color32;
      name: string;
      flags: Unity.Profiling.ProfilerCategoryFlags;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FrameDataView {
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: any; // System.UInt64
      frameStartTimeMs: number;
      frameStartTimeNs: any; // System.UInt64
      frameTimeMs: number;
      frameTimeNs: any; // System.UInt64
      frameGpuTimeMs: number;
      frameGpuTimeNs: any; // System.UInt64
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      Dispose: (() => void);
      GetMarkerCategoryIndex: ((markerId: number) => any);
      GetMarkerFlags: ((markerId: number) => Unity.Profiling.LowLevel.MarkerFlags);
      GetMarkerName: ((markerId: number) => string);
      GetMarkerMetadataInfo: ((markerId: number) => UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[]);
      GetMarkerId: ((markerName: string) => number);
      GetMarkers: ((markerInfoList: any) => void);
      GetCategoryInfo: ((id: any) => UnityEditor.Profiling.ProfilerCategoryInfo);
      GetAllCategories: ((categoryInfoList: any) => void);
      GetFrameMetaDataCount: ((id: any, tag: number) => number);
      ResolveMethodInfo: ((addr: any) => UnityEditor.Profiling.FrameDataView_MethodInfo);
      HasCounterValue: ((markerId: number) => boolean);
      GetCounterValueAsInt: ((markerId: number) => number);
      GetCounterValueAsLong: ((markerId: number) => any);
      GetCounterValueAsFloat: ((markerId: number) => number);
      GetCounterValueAsDouble: ((markerId: number) => number);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class FrameDataView_MarkerMetadataInfo {
      type: Unity.Profiling.LowLevel.ProfilerMarkerDataType;
      unit: Unity.Profiling.ProfilerMarkerDataUnit;
      name: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FrameDataView_MarkerInfo {
      id: number;
      category: any; // System.UInt16
      flags: Unity.Profiling.LowLevel.MarkerFlags;
      name: string;
      metadataInfo: UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[];
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FrameDataView_MethodInfo {
      methodName: string;
      sourceFileName: string;
      sourceFileLine: any; // System.UInt32
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class HierarchyFrameDataView {
      viewMode: UnityEditor.Profiling.HierarchyFrameDataView_ViewModes;
      sortColumn: number;
      sortColumnAscending: boolean;
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: any; // System.UInt64
      frameStartTimeMs: number;
      frameStartTimeNs: any; // System.UInt64
      frameTimeMs: number;
      frameTimeNs: any; // System.UInt64
      frameGpuTimeMs: number;
      frameGpuTimeNs: any; // System.UInt64
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      GetRootItemID: (() => number);
      GetItemMarkerID: ((id: number) => number);
      GetItemMarkerFlags: ((id: number) => Unity.Profiling.LowLevel.MarkerFlags);
      GetItemCategoryIndex: ((id: number) => any);
      GetItemDepth: ((id: number) => number);
      HasItemChildren: ((id: number) => boolean);
      GetItemChildren: ((id: number, outChildren: any) => void);
      GetItemAncestors: ((id: number, outAncestors: any) => void);
      GetItemDescendantsThatHaveChildren: ((id: number, outChildren: any) => void);
      GetItemName: ((id: number) => string);
      GetItemInstanceID: ((id: number) => number);
      GetItemColumnData: ((id: number, column: number) => string);
      GetItemColumnDataAsSingle: ((id: number, column: number) => number);
      GetItemColumnDataAsFloat: ((id: number, column: number) => number);
      GetItemColumnDataAsDouble: ((id: number, column: number) => number);
      GetItemMetadataCount: ((id: number) => number);
      GetItemMetadata: ((id: number, index: number) => string);
      GetItemMetadataAsFloat: ((id: number, index: number) => number);
      GetItemMetadataAsLong: ((id: number, index: number) => any);
      GetItemMergedSamplesMetadataCount: ((id: number, sampleIndex: number) => number);
      GetItemMergedSamplesMetadata: ((id: number, sampleIndex: number, metadataIndex: number) => string);
      GetItemMergedSamplesMetadataAsFloat: ((id: number, sampleIndex: number, metadataIndex: number) => number);
      GetItemMergedSamplesMetadataAsLong: ((id: number, sampleIndex: number, metadataIndex: number) => any);
      ResolveItemCallstack: ((id: number) => string);
      GetItemCallstack: ((id: number, outCallstack: any) => void);
      GetItemMergedSamplesCount: ((id: number) => number);
      GetItemMergedSamplesColumnData: ((id: number, column: number, outStrings: any) => void);
      GetItemMergedSamplesColumnDataAsFloats: ((id: number, column: number, outValues: any) => void);
      GetItemMergedSamplesColumnDataAsDoubles: ((id: number, column: number, outValues: any) => void);
      GetItemMergedSamplesInstanceID: ((id: number, outInstanceIds: any) => void);
      GetItemMergedSampleCallstack: ((id: number, sampleIndex: number, outCallstack: any) => void);
      ResolveItemMergedSampleCallstack: ((id: number, sampleIndex: number) => string);
      GetItemMarkerIDPath: ((id: number, outFullIdPath: any) => void);
      GetItemPath: ((id: number) => string);
      Sort: ((sortColumn: number, sortAscending: boolean) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      Dispose: (() => void);
      GetMarkerCategoryIndex: ((markerId: number) => any);
      GetMarkerFlags: ((markerId: number) => Unity.Profiling.LowLevel.MarkerFlags);
      GetMarkerName: ((markerId: number) => string);
      GetMarkerMetadataInfo: ((markerId: number) => UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[]);
      GetMarkerId: ((markerName: string) => number);
      GetMarkers: ((markerInfoList: any) => void);
      GetCategoryInfo: ((id: any) => UnityEditor.Profiling.ProfilerCategoryInfo);
      GetAllCategories: ((categoryInfoList: any) => void);
      GetFrameMetaDataCount: ((id: any, tag: number) => number);
      ResolveMethodInfo: ((addr: any) => UnityEditor.Profiling.FrameDataView_MethodInfo);
      HasCounterValue: ((markerId: number) => boolean);
      GetCounterValueAsInt: ((markerId: number) => number);
      GetCounterValueAsLong: ((markerId: number) => any);
      GetCounterValueAsFloat: ((markerId: number) => number);
      GetCounterValueAsDouble: ((markerId: number) => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum HierarchyFrameDataView_ViewModes {
      Default = 0,
      MergeSamplesWithTheSameName = 1,
      HideEditorOnlySamples = 2,
    }
    export declare class RawFrameDataView {
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: any; // System.UInt64
      frameStartTimeMs: number;
      frameStartTimeNs: any; // System.UInt64
      frameTimeMs: number;
      frameTimeNs: any; // System.UInt64
      frameGpuTimeMs: number;
      frameGpuTimeNs: any; // System.UInt64
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      GetSampleStartTimeMs: ((sampleIndex: number) => number);
      GetSampleStartTimeNs: ((sampleIndex: number) => any);
      GetSampleTimeMs: ((sampleIndex: number) => number);
      GetSampleTimeNs: ((sampleIndex: number) => any);
      GetSampleMarkerId: ((sampleIndex: number) => number);
      GetSampleFlags: ((sampleIndex: number) => Unity.Profiling.LowLevel.MarkerFlags);
      GetSampleCategoryIndex: ((sampleIndex: number) => any);
      GetSampleName: ((sampleIndex: number) => string);
      GetSampleChildrenCount: ((sampleIndex: number) => number);
      GetSampleChildrenCountRecursive: ((sampleIndex: number) => number);
      GetSampleMetadataCount: ((sampleIndex: number) => number);
      GetSampleMetadataAsString: ((sampleIndex: number, metadataIndex: number) => string);
      GetSampleMetadataAsInt: ((sampleIndex: number, metadataIndex: number) => number);
      GetSampleMetadataAsLong: ((sampleIndex: number, metadataIndex: number) => any);
      GetSampleMetadataAsFloat: ((sampleIndex: number, metadataIndex: number) => number);
      GetSampleMetadataAsDouble: ((sampleIndex: number, metadataIndex: number) => number);
      GetSampleCallstack: ((sampleIndex: number, outCallstack: any) => void);
      GetSampleFlowEvents: ((sampleIndex: number, outFlowEvents: any) => void);
      GetFlowEvents: ((outFlowEvents: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      Dispose: (() => void);
      GetMarkerCategoryIndex: ((markerId: number) => any);
      GetMarkerFlags: ((markerId: number) => Unity.Profiling.LowLevel.MarkerFlags);
      GetMarkerName: ((markerId: number) => string);
      GetMarkerMetadataInfo: ((markerId: number) => UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[]);
      GetMarkerId: ((markerName: string) => number);
      GetMarkers: ((markerInfoList: any) => void);
      GetCategoryInfo: ((id: any) => UnityEditor.Profiling.ProfilerCategoryInfo);
      GetAllCategories: ((categoryInfoList: any) => void);
      GetFrameMetaDataCount: ((id: any, tag: number) => number);
      ResolveMethodInfo: ((addr: any) => UnityEditor.Profiling.FrameDataView_MethodInfo);
      HasCounterValue: ((markerId: number) => boolean);
      GetCounterValueAsInt: ((markerId: number) => number);
      GetCounterValueAsLong: ((markerId: number) => any);
      GetCounterValueAsFloat: ((markerId: number) => number);
      GetCounterValueAsDouble: ((markerId: number) => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RawFrameDataView_FlowEvent {
      ParentSampleIndex: number;
      FlowId: any; // System.UInt32
      FlowEventType: Unity.Profiling.ProfilerFlowEventType;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export namespace Memory {
      export namespace Experimental {
        export declare class ConnectionEntries {
          from: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          to: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class GCHandleEntries {
          target: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class ManagedMemorySectionEntries {
          bytes: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Byte[]]
          startAddress: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeObjectEntries {
          objectName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          instanceId: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          size: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          nativeTypeArrayIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          hideFlags: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[UnityEngine.HideFlags]
          flags: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[UnityEditor.Profiling.Memory.Experimental.ObjectFlags]
          nativeObjectAddress: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          rootReferenceId: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int64]
          gcHandleIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeTypeEntries {
          typeName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          nativeBaseTypeArrayIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class TypeDescriptionEntries {
          flags: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[UnityEditor.Profiling.Memory.Experimental.TypeFlags]
          typeDescriptionName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          assembly: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          fieldIndices: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32[]]
          staticFieldBytes: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Byte[]]
          baseOrElementTypeIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          size: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          typeInfoAddress: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          typeIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class FieldDescriptionEntries {
          fieldDescriptionName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          offset: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          typeIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          isStatic: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Boolean]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeMemoryLabelEntries {
          memoryLabelName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeRootReferenceEntries {
          id: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int64]
          areaName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          objectName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          accumulatedSize: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeAllocationEntries {
          memoryRegionIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          rootReferenceId: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int64]
          allocationSiteId: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int64]
          address: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          size: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          overheadSize: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          paddingSize: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeMemoryRegionEntries {
          memoryRegionName: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          parentIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          addressBase: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          addressSize: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          firstAllocationIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          numAllocations: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeAllocationSiteEntries {
          id: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int64]
          memoryLabelIndex: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.Int32]
          callstackSymbols: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64[]]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class NativeCallstackSymbolEntries {
          symbol: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.UInt64]
          readableStackTrace: any; // UnityEditor.Profiling.Memory.Experimental.ArrayEntries`1[System.String]
          GetNumEntries: (() => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class PackedMemorySnapshot {
          connections: UnityEditor.Profiling.Memory.Experimental.ConnectionEntries;
          fieldDescriptions: UnityEditor.Profiling.Memory.Experimental.FieldDescriptionEntries;
          gcHandles: UnityEditor.Profiling.Memory.Experimental.GCHandleEntries;
          managedHeapSections: UnityEditor.Profiling.Memory.Experimental.ManagedMemorySectionEntries;
          managedStacks: UnityEditor.Profiling.Memory.Experimental.ManagedMemorySectionEntries;
          nativeAllocations: UnityEditor.Profiling.Memory.Experimental.NativeAllocationEntries;
          nativeAllocationSites: UnityEditor.Profiling.Memory.Experimental.NativeAllocationSiteEntries;
          nativeCallstackSymbols: UnityEditor.Profiling.Memory.Experimental.NativeCallstackSymbolEntries;
          nativeMemoryLabels: UnityEditor.Profiling.Memory.Experimental.NativeMemoryLabelEntries;
          nativeMemoryRegions: UnityEditor.Profiling.Memory.Experimental.NativeMemoryRegionEntries;
          nativeObjects: UnityEditor.Profiling.Memory.Experimental.NativeObjectEntries;
          nativeRootReferences: UnityEditor.Profiling.Memory.Experimental.NativeRootReferenceEntries;
          nativeTypes: UnityEditor.Profiling.Memory.Experimental.NativeTypeEntries;
          typeDescriptions: UnityEditor.Profiling.Memory.Experimental.TypeDescriptionEntries;
          version: any; // System.UInt32
          metadata: UnityEngine.Profiling.Memory.Experimental.MetaData;
          filePath: string;
          recordDate: any; // System.DateTime
          captureFlags: UnityEngine.Profiling.Memory.Experimental.CaptureFlags;
          virtualMachineInformation: UnityEditor.Profiling.Memory.Experimental.VirtualMachineInformation;
          Dispose: (() => void);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export enum ObjectFlags {
          IsDontDestroyOnLoad = 1,
          IsPersistent = 2,
          IsManager = 4,
        }
        export declare class ObjectFlagsExtensions {
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export enum TypeFlags {
          kNone = 0,
          kValueType = 1,
          kArray = 2,
          kArrayRankMask = -65536,
        }
        export declare class TypeFlagsExtensions {
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class VirtualMachineInformation {
          pointerSize: number;
          objectHeaderSize: number;
          arrayHeaderSize: number;
          arrayBoundsOffsetInHeader: number;
          arraySizeOffsetInHeader: number;
          allocationGranularity: number;
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => any);
        }
      }
    }
  }
  export namespace ProjectWindowCallback {
    export declare class EndNameEditAction {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnEnable: (() => void);
      Action: ((instanceId: number, pathName: string, resourceFile: string) => void);
      Cancelled: ((instanceId: number, pathName: string, resourceFile: string) => void);
      CleanUp: (() => void);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Purchasing {
    export declare class PurchasingSettings {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Rendering {
    export declare class EditorGraphicsSettings {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum ShaderQuality {
      Low = 0,
      Medium = 1,
      High = 2,
    }
    export declare class AlbedoSwatchInfo {
      name: string;
      color: UnityEngine.Color;
      minLuminance: number;
      maxLuminance: number;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class TierSettings {
      standardShaderQuality: UnityEditor.Rendering.ShaderQuality;
      hdrMode: UnityEngine.Rendering.CameraHDRMode;
      reflectionProbeBoxProjection: boolean;
      reflectionProbeBlending: boolean;
      hdr: boolean;
      detailNormalMap: boolean;
      cascadedShadowMaps: boolean;
      prefer32BitShadowMaps: boolean;
      enableLPPV: boolean;
      semitransparentShadows: boolean;
      renderingPath: UnityEngine.RenderingPath;
      realtimeGICPUUsage: UnityEngine.Rendering.RealtimeGICPUUsage;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PlatformShaderSettings {
      cascadedShadowMaps: boolean;
      reflectionProbeBoxProjection: boolean;
      reflectionProbeBlending: boolean;
      standardShaderQuality: UnityEditor.Rendering.ShaderQuality;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class EditorCameraUtils {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ShaderSnippetData {
      shaderType: UnityEditor.Rendering.ShaderType;
      passType: UnityEngine.Rendering.PassType;
      passName: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ShaderCompilerData {
      shaderRequirements: UnityEditor.Rendering.ShaderRequirements;
      graphicsTier: UnityEngine.Rendering.GraphicsTier;
      shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform;
      shaderKeywordSet: UnityEngine.Rendering.ShaderKeywordSet;
      platformKeywordSet: UnityEngine.Rendering.PlatformKeywordSet;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum ShaderCompilerPlatform {
      None = 0,
      D3D = 4,
      GLES20 = 5,
      GLES3x = 9,
      PS4 = 11,
      XboxOneD3D11 = 12,
      Metal = 14,
      OpenGLCore = 15,
      Vulkan = 18,
      Switch = 19,
      XboxOneD3D12 = 20,
    }
    export enum ShaderCompilerMessageSeverity {
      Error = 0,
      Warning = 1,
    }
    export enum ShaderRequirements {
      None = 0,
      BaseShaders = 1,
      Interpolators10 = 2,
      Interpolators32 = 4,
      MRT4 = 8,
      MRT8 = 16,
      Derivatives = 32,
      SampleLOD = 64,
      FragCoord = 128,
      Interpolators15Integers = 512,
      Texture2DArray = 1024,
      Instancing = 2048,
      Geometry = 4096,
      CubeArray = 8192,
      Compute = 16384,
      RandomWrite = 32768,
      TessellationCompute = 65536,
      TessellationShaders = 131072,
      SparseTexelResident = 262144,
      FramebufferFetch = 524288,
      MSAATextureSamples = 1048576,
    }
    export enum ShaderType {
      Vertex = 1,
      Fragment = 2,
      Geometry = 3,
      Hull = 4,
      Domain = 5,
      Surface = 6,
      RayTracing = 7,
      Count = 7,
    }
    export declare class RenderPipelineEditorUtility {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace SceneManagement {
    export declare class EditorSceneManager {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_NewSceneCreatedCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene, setup: UnityEditor.SceneManagement.NewSceneSetup, mode: UnityEditor.SceneManagement.NewSceneMode) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, setup: UnityEditor.SceneManagement.NewSceneSetup, mode: UnityEditor.SceneManagement.NewSceneMode, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneOpeningCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((path: string, mode: UnityEditor.SceneManagement.OpenSceneMode) => void);
      BeginInvoke: ((path: string, mode: UnityEditor.SceneManagement.OpenSceneMode, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneOpenedCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene, mode: UnityEditor.SceneManagement.OpenSceneMode) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, mode: UnityEditor.SceneManagement.OpenSceneMode, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneClosingCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene, removingScene: boolean) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, removingScene: boolean, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneClosedCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneSavingCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene, path: string) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, path: string, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneSavedCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorSceneManager_SceneDirtiedCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      Invoke: ((scene: UnityEngine.SceneManagement.Scene) => void);
      BeginInvoke: ((scene: UnityEngine.SceneManagement.Scene, callback: any, object: any) => any);
      EndInvoke: ((result: any) => void);
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SceneCullingMasks {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum OpenSceneMode {
      Single = 0,
      Additive = 1,
      AdditiveWithoutLoading = 2,
    }
    export enum NewSceneMode {
      Single = 0,
      Additive = 1,
    }
    export enum NewSceneSetup {
      EmptyScene = 0,
      DefaultGameObjects = 1,
    }
    export declare class SceneHierarchyHooks {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SceneHierarchyHooks_SubSceneInfo {
      isValid: boolean;
      transform: UnityEngine.Transform;
      scene: UnityEngine.SceneManagement.Scene;
      sceneAsset: UnityEditor.SceneAsset;
      sceneName: string;
      color: UnityEngine.Color32;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PrefabOverride {
      Apply: ((prefabAssetPath: string, mode: UnityEditor.InteractionMode) => void) | (() => void) | ((prefabAssetPath: string) => void) | ((mode: UnityEditor.InteractionMode) => void);
      Revert: ((mode: UnityEditor.InteractionMode) => void) | (() => void);
      GetAssetObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ObjectOverride {
      constructor();
      instanceObject: UnityEngine.Object;
      coupledOverride: UnityEditor.SceneManagement.PrefabOverride;
      Apply: ((prefabAssetPath: string, mode: UnityEditor.InteractionMode) => void) | (() => void) | ((prefabAssetPath: string) => void) | ((mode: UnityEditor.InteractionMode) => void);
      Revert: ((mode: UnityEditor.InteractionMode) => void) | (() => void);
      GetAssetObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AddedComponent {
      constructor();
      instanceComponent: UnityEngine.Component;
      Apply: ((prefabAssetPath: string, mode: UnityEditor.InteractionMode) => void) | (() => void) | ((prefabAssetPath: string) => void) | ((mode: UnityEditor.InteractionMode) => void);
      Revert: ((mode: UnityEditor.InteractionMode) => void) | (() => void);
      GetAssetObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RemovedComponent {
      constructor();
      containingInstanceGameObject: UnityEngine.GameObject;
      assetComponent: UnityEngine.Component;
      Apply: ((prefabAssetPath: string, mode: UnityEditor.InteractionMode) => void) | (() => void) | ((prefabAssetPath: string) => void) | ((mode: UnityEditor.InteractionMode) => void);
      Revert: ((mode: UnityEditor.InteractionMode) => void) | (() => void);
      GetAssetObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AddedGameObject {
      constructor();
      instanceGameObject: UnityEngine.GameObject;
      siblingIndex: number;
      Apply: ((prefabAssetPath: string, mode: UnityEditor.InteractionMode) => void) | (() => void) | ((prefabAssetPath: string) => void) | ((mode: UnityEditor.InteractionMode) => void);
      Revert: ((mode: UnityEditor.InteractionMode) => void) | (() => void);
      GetAssetObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SceneSetup {
      constructor();
      path: string;
      isLoaded: boolean;
      isActive: boolean;
      isSubScene: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class MainStage {
      constructor();
      assetPath: string;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera: (() => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PreviewSceneStage {
      scene: UnityEngine.SceneManagement.Scene;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      assetPath: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera: (() => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class Stage {
      assetPath: string;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera: (() => any);
      SetDirty: (() => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class StageHandle {
      Contains: ((gameObject: UnityEngine.GameObject) => boolean);
      IsValid: (() => boolean);
      Equals: ((other: any) => boolean) | ((other: UnityEditor.SceneManagement.StageHandle) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class StageUtility {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Scripting {
    export declare class ManagedDebugger {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace SearchService {
    export enum VisibleObjects {
      None = 0,
      Assets = 1,
      Scene = 2,
      All = 3,
    }
    export declare class ObjectSelectorTargetInfo {
      constructor(globalObjectId: UnityEditor.GlobalObjectId, targetObject?: UnityEngine.Object, type?: any);
      globalObjectId: UnityEditor.GlobalObjectId;
      targetObject: UnityEngine.Object;
      type: any; // System.Type
      LoadObject: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ObjectSelectorSearchContext {
      constructor();
      guid: any; // System.Guid
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      currentObject: UnityEngine.Object;
      editedObjects: UnityEngine.Object[];
      requiredTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      requiredTypeNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
      visibleObjects: UnityEditor.SearchService.VisibleObjects;
      allowedInstanceIds: any; // System.Collections.Generic.IEnumerable`1[System.Int32]
      selectorConstraint: any; // System.Func`4[UnityEditor.SearchService.ObjectSelectorTargetInfo,UnityEngine.Object[],UnityEditor.SearchService.ObjectSelectorSearchContext,System.Boolean]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IObjectSelectorEngine {
    }
    export declare class ObjectSelector {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ProjectSearchContext {
      constructor();
      guid: any; // System.Guid
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      requiredTypeNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IProjectSearchEngine {
    }
    export declare class Project {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SceneSearchContext {
      constructor();
      guid: any; // System.Guid
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      requiredTypeNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
      rootProperty: UnityEditor.HierarchyProperty;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ISceneSearchEngine {
    }
    export declare class Scene {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum SearchEngineScope {
      Scene = 0,
      Project = 1,
      ObjectSelector = 2,
    }
    export declare class ISearchContext {
      guid: any; // System.Guid
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      requiredTypeNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    }
    export declare class ISearchEngineBase {
      name: string;
      BeginSession: ((context: UnityEditor.SearchService.ISearchContext) => void);
      EndSession: ((context: UnityEditor.SearchService.ISearchContext) => void);
      BeginSearch: ((context: UnityEditor.SearchService.ISearchContext, query: string) => void);
      EndSearch: ((context: UnityEditor.SearchService.ISearchContext) => void);
    }
    export declare class ISelectorEngine {
      SelectObject: ((context: UnityEditor.SearchService.ISearchContext, onObjectSelectorClosed: any, onObjectSelectedUpdated: any) => boolean);
      SetSearchFilter: ((context: UnityEditor.SearchService.ISearchContext, searchFilter: string) => void);
    }
  }
  export namespace ShortcutManagement {
    export declare class KeyCombination {
      constructor(keyCode: UnityEngine.KeyCode, shortcutModifiers?: UnityEditor.ShortcutManagement.ShortcutModifiers);
      keyCode: UnityEngine.KeyCode;
      modifiers: UnityEditor.ShortcutManagement.ShortcutModifiers;
      alt: boolean;
      action: boolean;
      shift: boolean;
      ToString: (() => string);
      Equals: ((other: UnityEditor.ShortcutManagement.KeyCombination) => boolean) | ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
    }
    export declare class ShortcutBinding {
      constructor(keyCombination: UnityEditor.ShortcutManagement.KeyCombination);
      keyCombinationSequence: any; // System.Collections.Generic.IEnumerable`1[UnityEditor.ShortcutManagement.KeyCombination]
      ToString: (() => string);
      Equals: ((other: UnityEditor.ShortcutManagement.ShortcutBinding) => boolean) | ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
    }
    export enum ShortcutStage {
      Begin = 0,
      End = 1,
    }
    export declare class ShortcutArguments {
      context: any; // System.Object
      stage: UnityEditor.ShortcutManagement.ShortcutStage;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum ShortcutModifiers {
      None = 0,
      Alt = 1,
      Action = 2,
      Shift = 4,
    }
    export declare class IShortcutManager {
      activeProfileId: string;
      GetAvailableProfileIds: (() => any);
      IsProfileIdValid: ((profileId: string) => boolean);
      IsProfileReadOnly: ((profileId: string) => boolean);
      CreateProfile: ((profileId: string) => void);
      DeleteProfile: ((profileId: string) => void);
      RenameProfile: ((profileId: string, newProfileId: string) => void);
      GetAvailableShortcutIds: (() => any);
      GetShortcutBinding: ((shortcutId: string) => UnityEditor.ShortcutManagement.ShortcutBinding);
      RebindShortcut: ((shortcutId: string, binding: UnityEditor.ShortcutManagement.ShortcutBinding) => void);
      ClearShortcutOverride: ((shortcutId: string) => void);
      IsShortcutOverridden: ((shortcutId: string) => boolean);
    }
    export declare class ActiveProfileChangedEventArgs {
      constructor(previousActiveProfileId: string, currentActiveProfileId: string);
      previousActiveProfileId: string;
      currentActiveProfileId: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ShortcutBindingChangedEventArgs {
      constructor(shortcutId: string, oldBinding: UnityEditor.ShortcutManagement.ShortcutBinding, newBinding: UnityEditor.ShortcutManagement.ShortcutBinding);
      shortcutId: string;
      oldBinding: UnityEditor.ShortcutManagement.ShortcutBinding;
      newBinding: UnityEditor.ShortcutManagement.ShortcutBinding;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ShortcutManager {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Sprites {
    export declare class AtlasSettings {
      format: UnityEngine.TextureFormat;
      colorSpace: UnityEngine.ColorSpace;
      compressionQuality: number;
      filterMode: UnityEngine.FilterMode;
      maxWidth: number;
      maxHeight: number;
      paddingPower: any; // System.UInt32
      anisoLevel: number;
      generateMipMaps: boolean;
      enableRotation: boolean;
      allowsAlphaSplitting: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PackerJob {
      AddAtlas: ((atlasName: string, settings: UnityEditor.Sprites.AtlasSettings) => void);
      AssignToAtlas: ((atlasName: string, sprite: UnityEngine.Sprite, packingMode: UnityEngine.SpritePackingMode, packingRotation: UnityEngine.SpritePackingRotation) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Packer {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum Packer_Execution {
      Normal = 0,
      ForceRegroup = 1,
    }
    export declare class SpriteUtility {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class DataUtility {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IPackerPolicy {
      AllowSequentialPacking: boolean;
      OnGroupAtlases: ((target: UnityEditor.BuildTarget, job: UnityEditor.Sprites.PackerJob, textureImporterInstanceIDs: number[]) => void);
      GetVersion: (() => number);
    }
  }
  export namespace U2D {
    export declare class SpriteEditorExtension {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SpriteAtlasUtility {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SpriteAtlasTextureSettings {
      anisoLevel: number;
      filterMode: UnityEngine.FilterMode;
      generateMipMaps: boolean;
      readable: boolean;
      sRGB: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SpriteAtlasPackingSettings {
      blockOffset: number;
      padding: number;
      enableRotation: boolean;
      enableTightPacking: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SpriteAtlasExtensions {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SpriteAtlasAsset {
      constructor();
      isVariant: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      SetIsVariant: ((value: boolean) => void);
      SetMasterAtlas: ((atlas: UnityEngine.U2D.SpriteAtlas) => void);
      SetIncludeInBuild: ((value: boolean) => void);
      SetVariantScale: ((value: number) => void);
      SetPlatformSettings: ((src: UnityEditor.TextureImporterPlatformSettings) => void);
      GetPlatformSettings: ((buildTarget: string) => UnityEditor.TextureImporterPlatformSettings);
      GetTextureSettings: (() => UnityEditor.U2D.SpriteAtlasTextureSettings);
      SetTextureSettings: ((src: UnityEditor.U2D.SpriteAtlasTextureSettings) => void);
      GetPackingSettings: (() => UnityEditor.U2D.SpriteAtlasPackingSettings);
      SetPackingSettings: ((src: UnityEditor.U2D.SpriteAtlasPackingSettings) => void);
      Add: ((objects: UnityEngine.Object[]) => void);
      Remove: ((objects: UnityEngine.Object[]) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SpriteAtlasImporter {
      constructor();
      assetPath: string;
      importSettingsMissing: boolean;
      assetTimeStamp: any; // System.UInt64
      userData: string;
      assetBundleName: string;
      assetBundleVariant: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      SetAssetBundleNameAndVariant: ((assetBundleName: string, assetBundleVariant: string) => void);
      SaveAndReimport: (() => void);
      AddRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object) => void);
      RemoveRemap: ((identifier: UnityEditor.AssetImporter_SourceAssetIdentifier) => boolean);
      GetExternalObjectMap: (() => any);
      SupportsRemappedAssetType: ((type: any) => boolean);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace UIElements {
    export declare class UIElementsEntryPoint {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class SerializedPropertyChangeEvent {
      constructor();
      changedProperty: UnityEditor.SerializedProperty;
      eventTypeId: any; // System.Int64
      timestamp: any; // System.Int64
      bubbles: boolean;
      tricklesDown: boolean;
      target: UnityEngine.UIElements.IEventHandler;
      isPropagationStopped: boolean;
      isImmediatePropagationStopped: boolean;
      isDefaultPrevented: boolean;
      propagationPhase: UnityEngine.UIElements.PropagationPhase;
      currentTarget: UnityEngine.UIElements.IEventHandler;
      dispatch: boolean;
      imguiEvent: UnityEngine.Event;
      originalMousePosition: UnityEngine.Vector2;
      Dispose: (() => void);
      StopPropagation: (() => void);
      StopImmediatePropagation: (() => void);
      PreventDefault: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace UnityLinker {
    export declare class UnityLinkerBuildPipelineData {
      constructor(target: UnityEditor.BuildTarget, inputDirectory: string);
      target: UnityEditor.BuildTarget;
      inputDirectory: string;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace VersionControl {
    export declare class Asset {
      constructor(clientPath: string);
      state: UnityEditor.VersionControl.Asset_States;
      path: string;
      metaPath: string;
      assetPath: string;
      isFolder: boolean;
      readOnly: boolean;
      isMeta: boolean;
      locked: boolean;
      name: string;
      fullName: string;
      isInCurrentProject: boolean;
      prettyPath: string;
      Dispose: (() => void);
      IsChildOf: ((other: UnityEditor.VersionControl.Asset) => boolean);
      IsState: ((state: UnityEditor.VersionControl.Asset_States) => boolean);
      IsOneOfStates: ((states: UnityEditor.VersionControl.Asset_States[]) => boolean);
      Edit: (() => void);
      Load: (() => UnityEngine.Object);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum Asset_States {
      None = 0,
      Local = 1,
      Synced = 2,
      OutOfSync = 4,
      Missing = 8,
      CheckedOutLocal = 16,
      CheckedOutRemote = 32,
      DeletedLocal = 64,
      DeletedRemote = 128,
      AddedLocal = 256,
      AddedRemote = 512,
      Conflicted = 1024,
      LockedLocal = 2048,
      LockedRemote = 4096,
      Updating = 8192,
      ReadOnly = 16384,
      MetaFile = 32768,
      MovedLocal = 65536,
      MovedRemote = 131072,
      Unversioned = 262144,
      Exclusive = 524288,
    }
    export declare class ChangeSet {
      constructor();
      constructor(description: string);
      constructor(description: string, revision: string);
      constructor(other: UnityEditor.VersionControl.ChangeSet);
      description: string;
      id: string;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Message {
      severity: UnityEditor.VersionControl.Message_Severity;
      message: string;
      Dispose: (() => void);
      Show: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum Message_Severity {
      Data = 0,
      Verbose = 1,
      Info = 2,
      Warning = 3,
      Error = 4,
    }
    export declare class ConfigField {
      name: string;
      label: string;
      description: string;
      isRequired: boolean;
      isPassword: boolean;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Plugin {
      name: string;
      configFields: UnityEditor.VersionControl.ConfigField[];
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Provider {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Provider_PreSubmitCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Provider_PreCheckoutCallback {
      constructor(object: any, method: any);
      Method: any; // System.Reflection.MethodInfo
      Target: any; // System.Object
      GetObjectData: ((info: any, context: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => any[]);
      DynamicInvoke: ((args: any[]) => any);
      Clone: (() => any);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum CompletionAction {
      UpdatePendingWindow = 1,
      OnChangeContentsPendingWindow = 2,
      OnIncomingPendingWindow = 3,
      OnChangeSetsPendingWindow = 4,
      OnGotLatestPendingWindow = 5,
      OnSubmittedChangeWindow = 6,
      OnAddedChangeWindow = 7,
      OnCheckoutCompleted = 8,
    }
    export enum SubmitResult {
      OK = 1,
      Error = 2,
      ConflictingFiles = 4,
      UnaddedFiles = 8,
    }
    export declare class Task {
      userIdentifier: number;
      text: string;
      description: string;
      success: boolean;
      secondsSpent: number;
      progressPct: number;
      progressMessage: string;
      resultCode: number;
      messages: UnityEditor.VersionControl.Message[];
      assetList: UnityEditor.VersionControl.AssetList;
      changeSets: UnityEditor.VersionControl.ChangeSets;
      Wait: (() => void);
      SetCompletionAction: ((action: UnityEditor.VersionControl.CompletionAction) => void);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class AssetList {
      constructor();
      constructor(src: UnityEditor.VersionControl.AssetList);
      Capacity: number;
      Count: number;
      Filter: ((includeFolder: boolean, states: UnityEditor.VersionControl.Asset_States[]) => UnityEditor.VersionControl.AssetList);
      FilterCount: ((includeFolder: boolean, states: UnityEditor.VersionControl.Asset_States[]) => number);
      FilterChildren: (() => UnityEditor.VersionControl.AssetList);
      Add: ((item: UnityEditor.VersionControl.Asset) => void);
      AddRange: ((collection: any) => void);
      AsReadOnly: (() => any);
      BinarySearch: ((index: number, count: number, item: UnityEditor.VersionControl.Asset, comparer: any) => number) | ((item: UnityEditor.VersionControl.Asset) => number) | ((item: UnityEditor.VersionControl.Asset, comparer: any) => number);
      Clear: (() => void);
      Contains: ((item: UnityEditor.VersionControl.Asset) => boolean);
      CopyTo: ((array: UnityEditor.VersionControl.Asset[]) => void) | ((index: number, array: UnityEditor.VersionControl.Asset[], arrayIndex: number, count: number) => void) | ((array: UnityEditor.VersionControl.Asset[], arrayIndex: number) => void);
      Exists: ((match: any) => boolean);
      Find: ((match: any) => UnityEditor.VersionControl.Asset);
      FindAll: ((match: any) => any);
      FindIndex: ((match: any) => number) | ((startIndex: number, match: any) => number) | ((startIndex: number, count: number, match: any) => number);
      FindLast: ((match: any) => UnityEditor.VersionControl.Asset);
      FindLastIndex: ((match: any) => number) | ((startIndex: number, match: any) => number) | ((startIndex: number, count: number, match: any) => number);
      ForEach: ((action: any) => void);
      GetEnumerator: (() => any);
      GetRange: ((index: number, count: number) => any);
      IndexOf: ((item: UnityEditor.VersionControl.Asset) => number) | ((item: UnityEditor.VersionControl.Asset, index: number) => number) | ((item: UnityEditor.VersionControl.Asset, index: number, count: number) => number);
      Insert: ((index: number, item: UnityEditor.VersionControl.Asset) => void);
      InsertRange: ((index: number, collection: any) => void);
      LastIndexOf: ((item: UnityEditor.VersionControl.Asset) => number) | ((item: UnityEditor.VersionControl.Asset, index: number) => number) | ((item: UnityEditor.VersionControl.Asset, index: number, count: number) => number);
      Remove: ((item: UnityEditor.VersionControl.Asset) => boolean);
      RemoveAll: ((match: any) => number);
      RemoveAt: ((index: number) => void);
      RemoveRange: ((index: number, count: number) => void);
      Reverse: (() => void) | ((index: number, count: number) => void);
      Sort: (() => void) | ((comparer: any) => void) | ((index: number, count: number, comparer: any) => void) | ((comparison: any) => void);
      ToArray: (() => UnityEditor.VersionControl.Asset[]);
      TrimExcess: (() => void);
      TrueForAll: ((match: any) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ChangeSets {
      constructor();
      Capacity: number;
      Count: number;
      Add: ((item: UnityEditor.VersionControl.ChangeSet) => void);
      AddRange: ((collection: any) => void);
      AsReadOnly: (() => any);
      BinarySearch: ((index: number, count: number, item: UnityEditor.VersionControl.ChangeSet, comparer: any) => number) | ((item: UnityEditor.VersionControl.ChangeSet) => number) | ((item: UnityEditor.VersionControl.ChangeSet, comparer: any) => number);
      Clear: (() => void);
      Contains: ((item: UnityEditor.VersionControl.ChangeSet) => boolean);
      CopyTo: ((array: UnityEditor.VersionControl.ChangeSet[]) => void) | ((index: number, array: UnityEditor.VersionControl.ChangeSet[], arrayIndex: number, count: number) => void) | ((array: UnityEditor.VersionControl.ChangeSet[], arrayIndex: number) => void);
      Exists: ((match: any) => boolean);
      Find: ((match: any) => UnityEditor.VersionControl.ChangeSet);
      FindAll: ((match: any) => any);
      FindIndex: ((match: any) => number) | ((startIndex: number, match: any) => number) | ((startIndex: number, count: number, match: any) => number);
      FindLast: ((match: any) => UnityEditor.VersionControl.ChangeSet);
      FindLastIndex: ((match: any) => number) | ((startIndex: number, match: any) => number) | ((startIndex: number, count: number, match: any) => number);
      ForEach: ((action: any) => void);
      GetEnumerator: (() => any);
      GetRange: ((index: number, count: number) => any);
      IndexOf: ((item: UnityEditor.VersionControl.ChangeSet) => number) | ((item: UnityEditor.VersionControl.ChangeSet, index: number) => number) | ((item: UnityEditor.VersionControl.ChangeSet, index: number, count: number) => number);
      Insert: ((index: number, item: UnityEditor.VersionControl.ChangeSet) => void);
      InsertRange: ((index: number, collection: any) => void);
      LastIndexOf: ((item: UnityEditor.VersionControl.ChangeSet) => number) | ((item: UnityEditor.VersionControl.ChangeSet, index: number) => number) | ((item: UnityEditor.VersionControl.ChangeSet, index: number, count: number) => number);
      Remove: ((item: UnityEditor.VersionControl.ChangeSet) => boolean);
      RemoveAll: ((match: any) => number);
      RemoveAt: ((index: number) => void);
      RemoveRange: ((index: number, count: number) => void);
      Reverse: (() => void) | ((index: number, count: number) => void);
      Sort: (() => void) | ((comparer: any) => void) | ((index: number, count: number, comparer: any) => void) | ((comparison: any) => void);
      ToArray: (() => UnityEditor.VersionControl.ChangeSet[]);
      TrimExcess: (() => void);
      TrueForAll: ((match: any) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum CheckoutMode {
      Asset = 1,
      Meta = 2,
      Both = 3,
      Exact = 4,
    }
    export enum ResolveMethod {
      UseMine = 1,
      UseTheirs = 2,
      UseMerged = 3,
    }
    export enum MergeMethod {
      MergeNone = 0,
      MergeAll = 1,
      MergeNonConflicting = 2,
    }
    export enum OnlineState {
      Updating = 0,
      Online = 1,
      Offline = 2,
    }
    export enum RevertMode {
      Normal = 0,
      Unchanged = 1,
      KeepModifications = 2,
    }
    export enum FileMode {
      None = 0,
      Binary = 1,
      Text = 2,
    }
  }
  export namespace VisualStudioIntegration {
    export declare class SolutionGuidGenerator {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace XR {
    export declare class BootOptions {
      constructor();
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
}
