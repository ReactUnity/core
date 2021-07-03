//
// Types in assemblies: UnityEditor.CoreModule
// Generated 3.07.2021 04:18:15
//
import { System } from './system';
import { Unity, UnityEngine } from './unity';

export declare namespace UnityEditor {
  export class ActiveEditorTracker {
    constructor();
    activeEditors: UnityEditor.Editor[];
    isDirty: boolean;
    isLocked: boolean;
    inspectorMode: UnityEditor.InspectorMode;
    hasComponentsWhichCannotBeMultiEdited: boolean;
    static sharedTracker: UnityEditor.ActiveEditorTracker;
    Equals(o: any): boolean;
    GetHashCode(): number;
    Destroy(): void;
    GetVisible(index: number): number;
    SetVisible(index: number, visible: number): void;
    ClearDirty(): void;
    RebuildIfNecessary(): void;
    ForceRebuild(): void;
    VerifyModifiedMonoBehaviours(): void;
    static MakeCustomEditor(obj: UnityEngine.Object): UnityEditor.Editor;
    static HasCustomEditor(obj: UnityEngine.Object): boolean;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ArrayUtility {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssemblyReloadEvents {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssemblyReloadEvents_AssemblyReloadCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum AssetDeleteResult {
    DidNotDelete = 0,
    FailedDelete = 1,
    DidDelete = 2,
  }
  export class AssetModificationProcessor {
    constructor();
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum AssetMoveResult {
    DidNotMove = 0,
    FailedMove = 1,
    DidMove = 2,
  }
  export class AssetPostprocessor {
    constructor();
    assetPath: string;
    context: UnityEditor.AssetImporters.AssetImportContext;
    assetImporter: UnityEditor.AssetImporter;
    preview: UnityEngine.Texture2D;
    LogWarning(warning: string): void;
    LogWarning(warning: string, context: UnityEngine.Object): void;
    LogError(warning: string): void;
    LogError(warning: string, context: UnityEngine.Object): void;
    GetVersion(): System.UInt32;
    GetPostprocessOrder(): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum BuildOptions {
    None = 0,
    Development = 1,
    AutoRunPlayer = 4,
    ShowBuiltPlayer = 8,
    BuildAdditionalStreamedScenes = 16,
    AcceptExternalModificationsToPlayer = 32,
    InstallInBuildFolder = 64,
    CleanBuildCache = 128,
    ConnectWithProfiler = 256,
    AllowDebugging = 512,
    SymlinkLibraries = 1024,
    SymlinkSources = 1024,
    UncompressedAssetBundle = 2048,
    StripDebugSymbols = 0,
    CompressTextures = 0,
    ConnectToHost = 4096,
    CustomConnectionID = 8192,
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
  export enum CanAppendBuild {
    Unsupported = 0,
    Yes = 1,
    No = 2,
  }
  export class AssetBundleBuild {
    assetBundleName: string;
    assetBundleVariant: string;
    assetNames: string[];
    addressableNames: string[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class BuildPlayerOptions {
    scenes: string[];
    locationPathName: string;
    assetBundleManifestPath: string;
    targetGroup: UnityEditor.BuildTargetGroup;
    target: UnityEditor.BuildTarget;
    subtarget: number;
    options: UnityEditor.BuildOptions;
    extraScriptingDefines: string[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum PlayerConnectionInitiateMode {
    None = 0,
    PlayerConnectsToHost = 1,
    PlayerListens = 2,
  }
  export class BuildPipeline {
    constructor();
    static isBuildingPlayer: boolean;
    static GetBuildTargetGroup(platform: UnityEditor.BuildTarget): UnityEditor.BuildTargetGroup;
    static GetBuildTargetName(targetPlatform: UnityEditor.BuildTarget): string;
    static PushAssetDependencies(): void;
    static PopAssetDependencies(): void;
    static BuildCanBeAppended(target: UnityEditor.BuildTarget, location: string): UnityEditor.CanAppendBuild;
    static BuildPlayer(levels: UnityEditor.EditorBuildSettingsScene[], locationPathName: string, target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): UnityEditor.Build.Reporting.BuildReport;
    static BuildPlayer(levels: string[], locationPathName: string, target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): UnityEditor.Build.Reporting.BuildReport;
    static BuildPlayer(buildPlayerOptions: UnityEditor.BuildPlayerOptions): UnityEditor.Build.Reporting.BuildReport;
    static BuildStreamedSceneAssetBundle(levels: string[], locationPath: string, target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): string;
    static BuildStreamedSceneAssetBundle(levels: string[], locationPath: string, target: UnityEditor.BuildTarget): string;
    static WriteBootConfig(outputFile: string, target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): void;
    static BuildAssetBundle(mainAsset: UnityEngine.Object, assets: UnityEngine.Object[], pathName: string, assetBundleOptions: UnityEditor.BuildAssetBundleOptions, targetPlatform: UnityEditor.BuildTarget): boolean;
    static BuildAssetBundleExplicitAssetNames(assets: UnityEngine.Object[], assetNames: string[], pathName: string, assetBundleOptions: UnityEditor.BuildAssetBundleOptions, targetPlatform: UnityEditor.BuildTarget): boolean;
    static BuildAssetBundles(outputPath: string, assetBundleOptions: UnityEditor.BuildAssetBundleOptions, targetPlatform: UnityEditor.BuildTarget): UnityEngine.AssetBundleManifest;
    static BuildAssetBundles(outputPath: string, builds: UnityEditor.AssetBundleBuild[], assetBundleOptions: UnityEditor.BuildAssetBundleOptions, targetPlatform: UnityEditor.BuildTarget): UnityEngine.AssetBundleManifest;
    static IsBuildTargetSupported(buildTargetGroup: UnityEditor.BuildTargetGroup, target: UnityEditor.BuildTarget): boolean;
    static GetPlaybackEngineDirectory(target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): string;
    static GetPlaybackEngineDirectory(buildTargetGroup: UnityEditor.BuildTargetGroup, target: UnityEditor.BuildTarget, options: UnityEditor.BuildOptions): string;
    static GetPlayerConnectionInitiateMode(targetPlatform: UnityEditor.BuildTarget, buildOptions: UnityEditor.BuildOptions): UnityEditor.PlayerConnectionInitiateMode;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class BuildPlayerWindow {
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
    static ShowBuildPlayerWindow(): void;
    static GetPlaybackEngineDownloadURL(moduleName: string): string;
    static RegisterGetBuildPlayerOptionsHandler(func: ((arg0: UnityEditor.BuildPlayerOptions) => UnityEditor.BuildPlayerOptions)): void;
    static RegisterBuildPlayerHandler(func: ((arg0: UnityEditor.BuildPlayerOptions) => void)): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class BuildPlayerWindow_BuildMethodException {
    constructor();
    constructor(message: string);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException(): System.Exception;
    ToString(): string;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    GetType(): System.Type;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
  }
  export class BuildPlayerWindow_DefaultBuildMethods {
    static BuildPlayer(options: UnityEditor.BuildPlayerOptions): void;
    static GetBuildPlayerOptions(defaultBuildPlayerOptions: UnityEditor.BuildPlayerOptions): UnityEditor.BuildPlayerOptions;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
    GameCoreScarlett = 42,
    GameCoreXboxSeries = 42,
    GameCoreXboxOne = 43,
    PS5 = 44,
    EmbeddedLinux = 45,
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
    GameCoreScarlett = 31,
    GameCoreXboxSeries = 31,
    GameCoreXboxOne = 32,
    PS5 = 33,
    EmbeddedLinux = 34,
  }
  export class DefaultAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum DragAndDropVisualMode {
    None = 0,
    Copy = 1,
    Link = 2,
    Move = 16,
    Generic = 4,
    Rejected = 32,
  }
  export enum HierarchyDropFlags {
    None = 0,
    DropUpon = 1,
    DropBetween = 2,
    DropAfterParent = 4,
    SearchActive = 8,
    DropAbove = 16,
  }
  export class DragAndDropWindowTarget {
    static projectBrowser: number;
    static sceneView: number;
    static hierarchy: number;
    static inspector: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class DragAndDrop {
    constructor();
    static objectReferences: UnityEngine.Object[];
    static paths: string[];
    static activeControlID: number;
    static visualMode: UnityEditor.DragAndDropVisualMode;
    static PrepareStartDrag(): void;
    static StartDrag(title: string): void;
    static GetGenericData(type: string): any;
    static SetGenericData(type: string, data: any): void;
    static AcceptDrag(): void;
    static HasHandler(dropDstId: number, handler: System.Delegate): boolean;
    static AddDropHandler(handler: UnityEditor.DragAndDrop_ProjectBrowserDropHandler): void;
    static AddDropHandler(handler: UnityEditor.DragAndDrop_SceneDropHandler): void;
    static AddDropHandler(handler: UnityEditor.DragAndDrop_HierarchyDropHandler): void;
    static AddDropHandler(handler: UnityEditor.DragAndDrop_InspectorDropHandler): void;
    static RemoveDropHandler(handler: UnityEditor.DragAndDrop_ProjectBrowserDropHandler): void;
    static RemoveDropHandler(handler: UnityEditor.DragAndDrop_SceneDropHandler): void;
    static RemoveDropHandler(handler: UnityEditor.DragAndDrop_HierarchyDropHandler): void;
    static RemoveDropHandler(handler: UnityEditor.DragAndDrop_InspectorDropHandler): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class DragAndDrop_ProjectBrowserDropHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(dragInstanceId: number, dropUponPath: string, perform: boolean): UnityEditor.DragAndDropVisualMode;
    BeginInvoke(dragInstanceId: number, dropUponPath: string, perform: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): UnityEditor.DragAndDropVisualMode;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class DragAndDrop_SceneDropHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(dropUpon: UnityEngine.Object, worldPosition: UnityEngine.Vector3, viewportPosition: UnityEngine.Vector2, parentForDraggedObjects: UnityEngine.Transform, perform: boolean): UnityEditor.DragAndDropVisualMode;
    BeginInvoke(dropUpon: UnityEngine.Object, worldPosition: UnityEngine.Vector3, viewportPosition: UnityEngine.Vector2, parentForDraggedObjects: UnityEngine.Transform, perform: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): UnityEditor.DragAndDropVisualMode;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class DragAndDrop_InspectorDropHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(targets: UnityEngine.Object[], perform: boolean): UnityEditor.DragAndDropVisualMode;
    BeginInvoke(targets: UnityEngine.Object[], perform: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): UnityEditor.DragAndDropVisualMode;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class DragAndDrop_HierarchyDropHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(dropTargetInstanceID: number, dropMode: UnityEditor.HierarchyDropFlags, parentForDraggedObjects: UnityEngine.Transform, perform: boolean): UnityEditor.DragAndDropVisualMode;
    BeginInvoke(dropTargetInstanceID: number, dropMode: UnityEditor.HierarchyDropFlags, parentForDraggedObjects: UnityEngine.Transform, perform: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): UnityEditor.DragAndDropVisualMode;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
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
  export class EditorApplication {
    constructor();
    static isPlaying: boolean;
    static isPlayingOrWillChangePlaymode: boolean;
    static isPaused: boolean;
    static isCompiling: boolean;
    static isUpdating: boolean;
    static isRemoteConnected: boolean;
    static scriptingRuntimeVersion: UnityEditor.ScriptingRuntimeVersion;
    static applicationContentsPath: string;
    static applicationPath: string;
    static isTemporaryProject: boolean;
    static timeSinceStartup: number;
    static isSceneDirty: boolean;
    static currentScene: string;
    static projectWindowItemOnGUI: UnityEditor.EditorApplication_ProjectWindowItemCallback;
    static hierarchyWindowItemOnGUI: UnityEditor.EditorApplication_HierarchyWindowItemCallback;
    static update: UnityEditor.EditorApplication_CallbackFunction;
    static delayCall: UnityEditor.EditorApplication_CallbackFunction;
    static hierarchyWindowChanged: UnityEditor.EditorApplication_CallbackFunction;
    static projectWindowChanged: UnityEditor.EditorApplication_CallbackFunction;
    static searchChanged: UnityEditor.EditorApplication_CallbackFunction;
    static modifierKeysChanged: UnityEditor.EditorApplication_CallbackFunction;
    static playmodeStateChanged: UnityEditor.EditorApplication_CallbackFunction;
    static contextualPropertyMenu: UnityEditor.EditorApplication_SerializedPropertyCallbackFunction;
    static LoadLevelInPlayMode(path: string): void;
    static LoadLevelAdditiveInPlayMode(path: string): void;
    static LoadLevelAsyncInPlayMode(path: string): UnityEngine.AsyncOperation;
    static LoadLevelAdditiveAsyncInPlayMode(path: string): UnityEngine.AsyncOperation;
    static OpenProject(projectPath: string, ...args: string[]): void;
    static SaveAssets(): void;
    static EnterPlaymode(): void;
    static ExitPlaymode(): void;
    static Step(): void;
    static LockReloadAssemblies(): void;
    static UnlockReloadAssemblies(): void;
    static ExecuteMenuItem(menuItemPath: string): boolean;
    static SetTemporaryProjectKeepPath(path: string): void;
    static Exit(returnValue: number): void;
    static QueuePlayerLoopUpdate(): void;
    static Beep(): void;
    static RepaintProjectWindow(): void;
    static RepaintAnimationWindow(): void;
    static RepaintHierarchyWindow(): void;
    static DirtyHierarchyWindowSorting(): void;
    static NewScene(): void;
    static NewEmptyScene(): void;
    static OpenScene(path: string): boolean;
    static OpenSceneAdditive(path: string): void;
    static SaveScene(): boolean;
    static SaveScene(path: string): boolean;
    static SaveScene(path: string, saveAsCopy: boolean): boolean;
    static SaveCurrentSceneIfUserWantsTo(): boolean;
    static MarkSceneDirty(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorApplication_ProjectWindowItemCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(guid: string, selectionRect: UnityEngine.Rect): void;
    BeginInvoke(guid: string, selectionRect: UnityEngine.Rect, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorApplication_HierarchyWindowItemCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(instanceID: number, selectionRect: UnityEngine.Rect): void;
    BeginInvoke(instanceID: number, selectionRect: UnityEngine.Rect, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorApplication_CallbackFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorApplication_SerializedPropertyCallbackFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(menu: UnityEditor.GenericMenu, property: UnityEditor.SerializedProperty): void;
    BeginInvoke(menu: UnityEditor.GenericMenu, property: UnityEditor.SerializedProperty, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
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
  export class EditorBuildSettingsScene {
    constructor();
    constructor(path: string, enabled: boolean);
    constructor(guid: UnityEditor.GUID, enabled: boolean);
    enabled: boolean;
    path: string;
    guid: UnityEditor.GUID;
    static GetActiveSceneList(scenes: UnityEditor.EditorBuildSettingsScene[]): string[];
    CompareTo(obj: any): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorBuildSettings {
    static scenes: UnityEditor.EditorBuildSettingsScene[];
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static RemoveConfigObject(name: string): boolean;
    static GetConfigObjectNames(): string[];
    static AddConfigObject(name: string, obj: UnityEngine.Object, overwrite: boolean): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorGUI {
    constructor();
    static showMixedValue: boolean;
    static actionKey: boolean;
    static indentLevel: number;
    static FocusTextInControl(name: string): void;
    static BeginDisabledGroup(disabled: boolean): void;
    static EndDisabledGroup(): void;
    static BeginChangeCheck(): void;
    static EndChangeCheck(): boolean;
    static DropShadowLabel(position: UnityEngine.Rect, text: string): void;
    static DropShadowLabel(position: UnityEngine.Rect, content: UnityEngine.GUIContent): void;
    static DropShadowLabel(position: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle): void;
    static DropShadowLabel(position: UnityEngine.Rect, content: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): void;
    static Toggle(position: UnityEngine.Rect, value: boolean): boolean;
    static Toggle(position: UnityEngine.Rect, label: string, value: boolean): boolean;
    static Toggle(position: UnityEngine.Rect, value: boolean, style: UnityEngine.GUIStyle): boolean;
    static Toggle(position: UnityEngine.Rect, label: string, value: boolean, style: UnityEngine.GUIStyle): boolean;
    static Toggle(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: boolean): boolean;
    static Toggle(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: boolean, style: UnityEngine.GUIStyle): boolean;
    static DoPasswordField(id: number, position: UnityEngine.Rect, password: string, style: UnityEngine.GUIStyle): string;
    static DoPasswordField(id: number, position: UnityEngine.Rect, label: UnityEngine.GUIContent, password: string, style: UnityEngine.GUIStyle): string;
    static Slider(position: UnityEngine.Rect, value: number, leftValue: number, rightValue: number): number;
    static Slider(position: UnityEngine.Rect, label: string, value: number, leftValue: number, rightValue: number): number;
    static Slider(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, leftValue: number, rightValue: number): number;
    static Slider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number): void;
    static Slider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: string): void;
    static Slider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: UnityEngine.GUIContent): void;
    static IntSlider(position: UnityEngine.Rect, value: number, leftValue: number, rightValue: number): number;
    static IntSlider(position: UnityEngine.Rect, label: string, value: number, leftValue: number, rightValue: number): number;
    static IntSlider(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, leftValue: number, rightValue: number): number;
    static IntSlider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number): void;
    static IntSlider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: string): void;
    static IntSlider(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: UnityEngine.GUIContent): void;
    static EnumFlagsField(position: UnityEngine.Rect, enumValue: System.Enum): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, label: string, enumValue: System.Enum): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, label: string, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, enumValue: System.Enum): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumFlagsField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, enumValue: System.Enum, includeObsolete: boolean, style?: UnityEngine.GUIStyle): System.Enum;
    static ObjectField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty): void;
    static ObjectField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    static ObjectField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, objType: System.Type): void;
    static ObjectField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, objType: System.Type, label: UnityEngine.GUIContent): void;
    static ObjectField(position: UnityEngine.Rect, obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, obj: UnityEngine.Object, objType: System.Type): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: string, obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: string, obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: string, obj: UnityEngine.Object, objType: System.Type): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean): UnityEngine.Object;
    static ObjectField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type): UnityEngine.Object;
    static IndentedRect(source: UnityEngine.Rect): UnityEngine.Rect;
    static Vector2Field(position: UnityEngine.Rect, label: string, value: UnityEngine.Vector2): UnityEngine.Vector2;
    static Vector2Field(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Vector2): UnityEngine.Vector2;
    static Vector3Field(position: UnityEngine.Rect, label: string, value: UnityEngine.Vector3): UnityEngine.Vector3;
    static Vector3Field(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Vector3): UnityEngine.Vector3;
    static Vector4Field(position: UnityEngine.Rect, label: string, value: UnityEngine.Vector4): UnityEngine.Vector4;
    static Vector4Field(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Vector4): UnityEngine.Vector4;
    static Vector2IntField(position: UnityEngine.Rect, label: string, value: UnityEngine.Vector2Int): UnityEngine.Vector2Int;
    static Vector2IntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Vector2Int): UnityEngine.Vector2Int;
    static Vector3IntField(position: UnityEngine.Rect, label: string, value: UnityEngine.Vector3Int): UnityEngine.Vector3Int;
    static Vector3IntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Vector3Int): UnityEngine.Vector3Int;
    static RectField(position: UnityEngine.Rect, value: UnityEngine.Rect): UnityEngine.Rect;
    static RectField(position: UnityEngine.Rect, label: string, value: UnityEngine.Rect): UnityEngine.Rect;
    static RectField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Rect): UnityEngine.Rect;
    static RectIntField(position: UnityEngine.Rect, value: UnityEngine.RectInt): UnityEngine.RectInt;
    static RectIntField(position: UnityEngine.Rect, label: string, value: UnityEngine.RectInt): UnityEngine.RectInt;
    static RectIntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.RectInt): UnityEngine.RectInt;
    static BoundsField(position: UnityEngine.Rect, value: UnityEngine.Bounds): UnityEngine.Bounds;
    static BoundsField(position: UnityEngine.Rect, label: string, value: UnityEngine.Bounds): UnityEngine.Bounds;
    static BoundsField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Bounds): UnityEngine.Bounds;
    static BoundsIntField(position: UnityEngine.Rect, value: UnityEngine.BoundsInt): UnityEngine.BoundsInt;
    static BoundsIntField(position: UnityEngine.Rect, label: string, value: UnityEngine.BoundsInt): UnityEngine.BoundsInt;
    static BoundsIntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.BoundsInt): UnityEngine.BoundsInt;
    static MultiFloatField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, subLabels: UnityEngine.GUIContent[], values: number[]): void;
    static MultiFloatField(position: UnityEngine.Rect, subLabels: UnityEngine.GUIContent[], values: number[]): void;
    static MultiIntField(position: UnityEngine.Rect, subLabels: UnityEngine.GUIContent[], values: number[]): void;
    static MultiPropertyField(position: UnityEngine.Rect, subLabels: UnityEngine.GUIContent[], valuesIterator: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    static MultiPropertyField(position: UnityEngine.Rect, subLabels: UnityEngine.GUIContent[], valuesIterator: UnityEditor.SerializedProperty): void;
    static ColorField(position: UnityEngine.Rect, value: UnityEngine.Color): UnityEngine.Color;
    static ColorField(position: UnityEngine.Rect, label: string, value: UnityEngine.Color): UnityEngine.Color;
    static ColorField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Color): UnityEngine.Color;
    static ColorField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Color, showEyedropper: boolean, showAlpha: boolean, hdr: boolean, hdrConfig: UnityEditor.ColorPickerHDRConfig): UnityEngine.Color;
    static ColorField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.Color, showEyedropper: boolean, showAlpha: boolean, hdr: boolean): UnityEngine.Color;
    static CurveField(position: UnityEngine.Rect, value: UnityEngine.AnimationCurve): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, label: string, value: UnityEngine.AnimationCurve): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.AnimationCurve): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, label: string, value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect): UnityEngine.AnimationCurve;
    static CurveField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, ranges: UnityEngine.Rect): void;
    static CurveField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, ranges: UnityEngine.Rect, label: UnityEngine.GUIContent): void;
    static InspectorTitlebar(position: UnityEngine.Rect, targetObjs: UnityEngine.Object[]): void;
    static InspectorTitlebar(position: UnityEngine.Rect, foldout: boolean, targetObj: UnityEngine.Object, expandable: boolean): boolean;
    static InspectorTitlebar(position: UnityEngine.Rect, foldout: boolean, targetObjs: UnityEngine.Object[], expandable: boolean): boolean;
    static InspectorTitlebar(position: UnityEngine.Rect, foldout: boolean, editor: UnityEditor.Editor): boolean;
    static ProgressBar(position: UnityEngine.Rect, value: number, text: string): void;
    static HelpBox(position: UnityEngine.Rect, message: string, type: UnityEditor.MessageType): void;
    static PrefixLabel(totalPosition: UnityEngine.Rect, label: UnityEngine.GUIContent): UnityEngine.Rect;
    static PrefixLabel(totalPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): UnityEngine.Rect;
    static PrefixLabel(totalPosition: UnityEngine.Rect, id: number, label: UnityEngine.GUIContent): UnityEngine.Rect;
    static PrefixLabel(totalPosition: UnityEngine.Rect, id: number, label: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): UnityEngine.Rect;
    static BeginProperty(totalPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, property: UnityEditor.SerializedProperty): UnityEngine.GUIContent;
    static EndProperty(): void;
    static GetPropertyHeight(type: UnityEditor.SerializedPropertyType, label: UnityEngine.GUIContent): number;
    static CanCacheInspectorGUI(property: UnityEditor.SerializedProperty): boolean;
    static DropdownButton(position: UnityEngine.Rect, content: UnityEngine.GUIContent, focusType: UnityEngine.FocusType): boolean;
    static DropdownButton(position: UnityEngine.Rect, content: UnityEngine.GUIContent, focusType: UnityEngine.FocusType, style: UnityEngine.GUIStyle): boolean;
    static DrawTextureAlpha(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number): void;
    static DrawTextureAlpha(position: UnityEngine.Rect, image: UnityEngine.Texture): void;
    static DrawTextureAlpha(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode): void;
    static DrawTextureAlpha(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number, colorWriteMask: UnityEngine.Rendering.ColorWriteMask, exposure: number): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number): void;
    static DrawTextureTransparent(position: UnityEngine.Rect, image: UnityEngine.Texture, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number, colorWriteMask: UnityEngine.Rendering.ColorWriteMask): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number, colorWriteMask: UnityEngine.Rendering.ColorWriteMask, exposure: number): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number, colorWriteMask: UnityEngine.Rendering.ColorWriteMask): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material, scaleMode: UnityEngine.ScaleMode, imageAspect: number, mipLevel: number): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material, scaleMode: UnityEngine.ScaleMode, imageAspect: number): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material, scaleMode: UnityEngine.ScaleMode): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture, mat: UnityEngine.Material): void;
    static DrawPreviewTexture(position: UnityEngine.Rect, image: UnityEngine.Texture): void;
    static LabelField(position: UnityEngine.Rect, label: string): void;
    static LabelField(position: UnityEngine.Rect, label: string, style: UnityEngine.GUIStyle): void;
    static LabelField(position: UnityEngine.Rect, label: UnityEngine.GUIContent): void;
    static LabelField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): void;
    static LabelField(position: UnityEngine.Rect, label: string, label2: string): void;
    static LabelField(position: UnityEngine.Rect, label: string, label2: string, style: UnityEngine.GUIStyle): void;
    static LabelField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, label2: UnityEngine.GUIContent): void;
    static LabelField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, label2: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): void;
    static LinkButton(position: UnityEngine.Rect, label: string): boolean;
    static LinkButton(position: UnityEngine.Rect, label: UnityEngine.GUIContent): boolean;
    static ToggleLeft(position: UnityEngine.Rect, label: string, value: boolean): boolean;
    static ToggleLeft(position: UnityEngine.Rect, label: string, value: boolean, labelStyle: UnityEngine.GUIStyle): boolean;
    static ToggleLeft(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: boolean): boolean;
    static ToggleLeft(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: boolean, labelStyle: UnityEngine.GUIStyle): boolean;
    static TextField(position: UnityEngine.Rect, text: string): string;
    static TextField(position: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle): string;
    static TextField(position: UnityEngine.Rect, label: string, text: string): string;
    static TextField(position: UnityEngine.Rect, label: string, text: string, style: UnityEngine.GUIStyle): string;
    static TextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, text: string): string;
    static TextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, text: string, style: UnityEngine.GUIStyle): string;
    static DelayedTextField(position: UnityEngine.Rect, text: string): string;
    static DelayedTextField(position: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle): string;
    static DelayedTextField(position: UnityEngine.Rect, label: string, text: string): string;
    static DelayedTextField(position: UnityEngine.Rect, label: string, text: string, style: UnityEngine.GUIStyle): string;
    static DelayedTextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, text: string): string;
    static DelayedTextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, text: string, style: UnityEngine.GUIStyle): string;
    static DelayedTextField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty): void;
    static DelayedTextField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    static DelayedTextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, controlId: number, text: string): string;
    static DelayedTextField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, controlId: number, text: string, style: UnityEngine.GUIStyle): string;
    static TextArea(position: UnityEngine.Rect, text: string): string;
    static TextArea(position: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle): string;
    static SelectableLabel(position: UnityEngine.Rect, text: string): void;
    static SelectableLabel(position: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle): void;
    static PasswordField(position: UnityEngine.Rect, password: string): string;
    static PasswordField(position: UnityEngine.Rect, password: string, style: UnityEngine.GUIStyle): string;
    static PasswordField(position: UnityEngine.Rect, label: string, password: string): string;
    static PasswordField(position: UnityEngine.Rect, label: string, password: string, style: UnityEngine.GUIStyle): string;
    static PasswordField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, password: string): string;
    static PasswordField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, password: string, style: UnityEngine.GUIStyle): string;
    static FloatField(position: UnityEngine.Rect, value: number): number;
    static FloatField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static FloatField(position: UnityEngine.Rect, label: string, value: number): number;
    static FloatField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static FloatField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static FloatField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedFloatField(position: UnityEngine.Rect, value: number): number;
    static DelayedFloatField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedFloatField(position: UnityEngine.Rect, label: string, value: number): number;
    static DelayedFloatField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedFloatField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static DelayedFloatField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedFloatField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty): void;
    static DelayedFloatField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    static DoubleField(position: UnityEngine.Rect, value: number): number;
    static DoubleField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static DoubleField(position: UnityEngine.Rect, label: string, value: number): number;
    static DoubleField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static DoubleField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static DoubleField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedDoubleField(position: UnityEngine.Rect, value: number): number;
    static DelayedDoubleField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedDoubleField(position: UnityEngine.Rect, label: string, value: number): number;
    static DelayedDoubleField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedDoubleField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static DelayedDoubleField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static IntField(position: UnityEngine.Rect, value: number): number;
    static IntField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static IntField(position: UnityEngine.Rect, label: string, value: number): number;
    static IntField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static IntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static IntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedIntField(position: UnityEngine.Rect, value: number): number;
    static DelayedIntField(position: UnityEngine.Rect, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedIntField(position: UnityEngine.Rect, label: string, value: number): number;
    static DelayedIntField(position: UnityEngine.Rect, label: string, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedIntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number): number;
    static DelayedIntField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle): number;
    static DelayedIntField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty): void;
    static DelayedIntField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    static LongField(position: UnityEngine.Rect, value: System.Int64): System.Int64;
    static LongField(position: UnityEngine.Rect, value: System.Int64, style: UnityEngine.GUIStyle): System.Int64;
    static LongField(position: UnityEngine.Rect, label: string, value: System.Int64): System.Int64;
    static LongField(position: UnityEngine.Rect, label: string, value: System.Int64, style: UnityEngine.GUIStyle): System.Int64;
    static LongField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: System.Int64): System.Int64;
    static LongField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, value: System.Int64, style: UnityEngine.GUIStyle): System.Int64;
    static Popup(position: UnityEngine.Rect, selectedIndex: number, displayedOptions: string[]): number;
    static Popup(position: UnityEngine.Rect, selectedIndex: number, displayedOptions: string[], style: UnityEngine.GUIStyle): number;
    static Popup(position: UnityEngine.Rect, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[]): number;
    static Popup(position: UnityEngine.Rect, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], style: UnityEngine.GUIStyle): number;
    static Popup(position: UnityEngine.Rect, label: string, selectedIndex: number, displayedOptions: string[]): number;
    static Popup(position: UnityEngine.Rect, label: string, selectedIndex: number, displayedOptions: string[], style: UnityEngine.GUIStyle): number;
    static Popup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[]): number;
    static Popup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], style: UnityEngine.GUIStyle): number;
    static EnumPopup(position: UnityEngine.Rect, selected: System.Enum): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, selected: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, label: string, selected: System.Enum): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, label: string, selected: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selected: System.Enum): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selected: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selected: System.Enum, checkEnabled: ((arg0: System.Enum) => boolean), includeObsolete?: boolean, style?: UnityEngine.GUIStyle): System.Enum;
    static IntPopup(position: UnityEngine.Rect, selectedValue: number, displayedOptions: string[], optionValues: number[]): number;
    static IntPopup(position: UnityEngine.Rect, selectedValue: number, displayedOptions: string[], optionValues: number[], style: UnityEngine.GUIStyle): number;
    static IntPopup(position: UnityEngine.Rect, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[]): number;
    static IntPopup(position: UnityEngine.Rect, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], style: UnityEngine.GUIStyle): number;
    static IntPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[]): number;
    static IntPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], style: UnityEngine.GUIStyle): number;
    static IntPopup(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, displayedOptions: UnityEngine.GUIContent[], optionValues: number[]): void;
    static IntPopup(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], label: UnityEngine.GUIContent): void;
    static IntPopup(position: UnityEngine.Rect, label: string, selectedValue: number, displayedOptions: string[], optionValues: number[]): number;
    static IntPopup(position: UnityEngine.Rect, label: string, selectedValue: number, displayedOptions: string[], optionValues: number[], style: UnityEngine.GUIStyle): number;
    static TagField(position: UnityEngine.Rect, tag: string): string;
    static TagField(position: UnityEngine.Rect, tag: string, style: UnityEngine.GUIStyle): string;
    static TagField(position: UnityEngine.Rect, label: string, tag: string): string;
    static TagField(position: UnityEngine.Rect, label: string, tag: string, style: UnityEngine.GUIStyle): string;
    static TagField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, tag: string): string;
    static TagField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, tag: string, style: UnityEngine.GUIStyle): string;
    static LayerField(position: UnityEngine.Rect, layer: number): number;
    static LayerField(position: UnityEngine.Rect, layer: number, style: UnityEngine.GUIStyle): number;
    static LayerField(position: UnityEngine.Rect, label: string, layer: number): number;
    static LayerField(position: UnityEngine.Rect, label: string, layer: number, style: UnityEngine.GUIStyle): number;
    static LayerField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, layer: number): number;
    static LayerField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, layer: number, style: UnityEngine.GUIStyle): number;
    static MaskField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, mask: number, displayedOptions: string[]): number;
    static MaskField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle): number;
    static MaskField(position: UnityEngine.Rect, label: string, mask: number, displayedOptions: string[]): number;
    static MaskField(position: UnityEngine.Rect, label: string, mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle): number;
    static MaskField(position: UnityEngine.Rect, mask: number, displayedOptions: string[]): number;
    static MaskField(position: UnityEngine.Rect, mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle): number;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: string): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: string, style: UnityEngine.GUIStyle): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: string, toggleOnLabelClick: boolean): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: string, toggleOnLabelClick: boolean, style: UnityEngine.GUIStyle): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: UnityEngine.GUIContent): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: UnityEngine.GUIContent, toggleOnLabelClick: boolean): boolean;
    static Foldout(position: UnityEngine.Rect, foldout: boolean, content: UnityEngine.GUIContent, toggleOnLabelClick: boolean, style: UnityEngine.GUIStyle): boolean;
    static HandlePrefixLabel(totalPosition: UnityEngine.Rect, labelPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, id: number): void;
    static HandlePrefixLabel(totalPosition: UnityEngine.Rect, labelPosition: UnityEngine.Rect, label: UnityEngine.GUIContent): void;
    static HandlePrefixLabel(totalPosition: UnityEngine.Rect, labelPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, id: number, style: UnityEngine.GUIStyle): void;
    static GetPropertyHeight(property: UnityEditor.SerializedProperty, includeChildren: boolean): number;
    static GetPropertyHeight(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): number;
    static GetPropertyHeight(property: UnityEditor.SerializedProperty): number;
    static GetPropertyHeight(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, includeChildren: boolean): number;
    static PropertyField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty): boolean;
    static PropertyField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, includeChildren: boolean): boolean;
    static PropertyField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): boolean;
    static PropertyField(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, includeChildren: boolean): boolean;
    static EnumMaskField(position: UnityEngine.Rect, enumValue: System.Enum): System.Enum;
    static EnumMaskField(position: UnityEngine.Rect, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumMaskField(position: UnityEngine.Rect, label: string, enumValue: System.Enum): System.Enum;
    static EnumMaskField(position: UnityEngine.Rect, label: string, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumMaskField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, enumValue: System.Enum): System.Enum;
    static EnumMaskField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, enumValue: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumMaskPopup(position: UnityEngine.Rect, label: string, selected: System.Enum): System.Enum;
    static EnumMaskPopup(position: UnityEngine.Rect, label: string, selected: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static EnumMaskPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selected: System.Enum): System.Enum;
    static EnumMaskPopup(position: UnityEngine.Rect, label: UnityEngine.GUIContent, selected: System.Enum, style: UnityEngine.GUIStyle): System.Enum;
    static BeginFoldoutHeaderGroup(position: UnityEngine.Rect, foldout: boolean, content: string, style?: UnityEngine.GUIStyle, menuAction?: ((arg0: UnityEngine.Rect) => void), menuIcon?: UnityEngine.GUIStyle): boolean;
    static BeginFoldoutHeaderGroup(position: UnityEngine.Rect, foldout: boolean, content: UnityEngine.GUIContent, style?: UnityEngine.GUIStyle, menuAction?: ((arg0: UnityEngine.Rect) => void), menuIcon?: UnityEngine.GUIStyle): boolean;
    static EndFoldoutHeaderGroup(): void;
    static GradientField(position: UnityEngine.Rect, gradient: UnityEngine.Gradient): UnityEngine.Gradient;
    static GradientField(position: UnityEngine.Rect, label: string, gradient: UnityEngine.Gradient): UnityEngine.Gradient;
    static GradientField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, gradient: UnityEngine.Gradient): UnityEngine.Gradient;
    static GradientField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, gradient: UnityEngine.Gradient, hdr: boolean): UnityEngine.Gradient;
    static GradientField(position: UnityEngine.Rect, label: UnityEngine.GUIContent, gradient: UnityEngine.Gradient, hdr: boolean, colorSpace: UnityEngine.ColorSpace): UnityEngine.Gradient;
    static DrawRect(rect: UnityEngine.Rect, color: UnityEngine.Color): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUI_DisabledGroupScope {
    constructor(disabled: boolean);
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUI_DisabledScope {
    constructor(disabled: boolean);
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorGUI_ChangeCheckScope {
    constructor();
    changed: boolean;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUI_IndentLevelScope {
    constructor();
    constructor(increment: number);
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUI_PropertyScope {
    constructor(totalPosition: UnityEngine.Rect, label: UnityEngine.GUIContent, property: UnityEditor.SerializedProperty);
    content: UnityEngine.GUIContent;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout {
    constructor();
    static Foldout(foldout: boolean, content: string): boolean;
    static Foldout(foldout: boolean, content: string, style: UnityEngine.GUIStyle): boolean;
    static Foldout(foldout: boolean, content: UnityEngine.GUIContent): boolean;
    static Foldout(foldout: boolean, content: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): boolean;
    static Foldout(foldout: boolean, content: string, toggleOnLabelClick: boolean): boolean;
    static Foldout(foldout: boolean, content: string, toggleOnLabelClick: boolean, style: UnityEngine.GUIStyle): boolean;
    static Foldout(foldout: boolean, content: UnityEngine.GUIContent, toggleOnLabelClick: boolean): boolean;
    static Foldout(foldout: boolean, content: UnityEngine.GUIContent, toggleOnLabelClick: boolean, style: UnityEngine.GUIStyle): boolean;
    static PrefixLabel(label: string): void;
    static PrefixLabel(label: string, followingStyle: UnityEngine.GUIStyle): void;
    static PrefixLabel(label: string, followingStyle: UnityEngine.GUIStyle, labelStyle: UnityEngine.GUIStyle): void;
    static PrefixLabel(label: UnityEngine.GUIContent): void;
    static PrefixLabel(label: UnityEngine.GUIContent, followingStyle: UnityEngine.GUIStyle): void;
    static PrefixLabel(label: UnityEngine.GUIContent, followingStyle: UnityEngine.GUIStyle, labelStyle: UnityEngine.GUIStyle): void;
    static LabelField(label: string, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: UnityEngine.GUIContent, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: string, label2: string, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: string, label2: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: UnityEngine.GUIContent, label2: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static LabelField(label: UnityEngine.GUIContent, label2: UnityEngine.GUIContent, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static LinkButton(label: string, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static LinkButton(label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(value: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(label: string, value: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(label: UnityEngine.GUIContent, value: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(value: boolean, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(label: string, value: boolean, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static Toggle(label: UnityEngine.GUIContent, value: boolean, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static ToggleLeft(label: string, value: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static ToggleLeft(label: UnityEngine.GUIContent, value: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static ToggleLeft(label: string, value: boolean, labelStyle: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static ToggleLeft(label: UnityEngine.GUIContent, value: boolean, labelStyle: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static TextField(text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextField(text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextField(label: string, text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextField(label: string, text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextField(label: UnityEngine.GUIContent, text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextField(label: UnityEngine.GUIContent, text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(label: string, text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(label: string, text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(label: UnityEngine.GUIContent, text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(label: UnityEngine.GUIContent, text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static DelayedTextField(property: UnityEditor.SerializedProperty, ...options: UnityEngine.GUILayoutOption[]): void;
    static DelayedTextField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static TextArea(text: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TextArea(text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static SelectableLabel(text: string, ...options: UnityEngine.GUILayoutOption[]): void;
    static SelectableLabel(text: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static PasswordField(password: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static PasswordField(password: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static PasswordField(label: string, password: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static PasswordField(label: string, password: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static PasswordField(label: UnityEngine.GUIContent, password: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static PasswordField(label: UnityEngine.GUIContent, password: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static FloatField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static FloatField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static FloatField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static FloatField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static FloatField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static FloatField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedFloatField(property: UnityEditor.SerializedProperty, ...options: UnityEngine.GUILayoutOption[]): void;
    static DelayedFloatField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static DoubleField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DoubleField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DoubleField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DoubleField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DoubleField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DoubleField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedDoubleField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(label: string, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(label: string, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(label: UnityEngine.GUIContent, value: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(label: UnityEngine.GUIContent, value: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static DelayedIntField(property: UnityEditor.SerializedProperty, ...options: UnityEngine.GUILayoutOption[]): void;
    static DelayedIntField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static LongField(value: System.Int64, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static LongField(value: System.Int64, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static LongField(label: string, value: System.Int64, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static LongField(label: string, value: System.Int64, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static LongField(label: UnityEngine.GUIContent, value: System.Int64, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static LongField(label: UnityEngine.GUIContent, value: System.Int64, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Int64;
    static Slider(value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static Slider(label: string, value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static Slider(label: UnityEngine.GUIContent, value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static Slider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): void;
    static Slider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: string, ...options: UnityEngine.GUILayoutOption[]): void;
    static Slider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static IntSlider(value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntSlider(label: string, value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntSlider(label: UnityEngine.GUIContent, value: number, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntSlider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, ...options: UnityEngine.GUILayoutOption[]): void;
    static IntSlider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: string, ...options: UnityEngine.GUILayoutOption[]): void;
    static IntSlider(property: UnityEditor.SerializedProperty, leftValue: number, rightValue: number, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static Popup(selectedIndex: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(selectedIndex: number, displayedOptions: string[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(label: string, selectedIndex: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(label: UnityEngine.GUIContent, selectedIndex: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(label: string, selectedIndex: number, displayedOptions: string[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(label: UnityEngine.GUIContent, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], ...options: UnityEngine.GUILayoutOption[]): number;
    static Popup(label: UnityEngine.GUIContent, selectedIndex: number, displayedOptions: UnityEngine.GUIContent[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static EnumPopup(selected: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(selected: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: string, selected: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: string, selected: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: UnityEngine.GUIContent, selected: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: UnityEngine.GUIContent, selected: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: UnityEngine.GUIContent, selected: System.Enum, checkEnabled: ((arg0: System.Enum) => boolean), includeObsolete: boolean, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumPopup(label: UnityEngine.GUIContent, selected: System.Enum, checkEnabled: ((arg0: System.Enum) => boolean), includeObsolete: boolean, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static IntPopup(selectedValue: number, displayedOptions: string[], optionValues: number[], ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(selectedValue: number, displayedOptions: string[], optionValues: number[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(label: string, selectedValue: number, displayedOptions: string[], optionValues: number[], ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(label: string, selectedValue: number, displayedOptions: string[], optionValues: number[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(label: UnityEngine.GUIContent, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(label: UnityEngine.GUIContent, selectedValue: number, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static IntPopup(property: UnityEditor.SerializedProperty, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], ...options: UnityEngine.GUILayoutOption[]): void;
    static IntPopup(property: UnityEditor.SerializedProperty, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static IntPopup(property: UnityEditor.SerializedProperty, displayedOptions: UnityEngine.GUIContent[], optionValues: number[], label: UnityEngine.GUIContent, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): void;
    static TagField(tag: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TagField(tag: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static TagField(label: string, tag: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TagField(label: string, tag: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static TagField(label: UnityEngine.GUIContent, tag: string, ...options: UnityEngine.GUILayoutOption[]): string;
    static TagField(label: UnityEngine.GUIContent, tag: string, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): string;
    static LayerField(layer: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static LayerField(layer: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static LayerField(label: string, layer: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static LayerField(label: string, layer: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static LayerField(label: UnityEngine.GUIContent, layer: number, ...options: UnityEngine.GUILayoutOption[]): number;
    static LayerField(label: UnityEngine.GUIContent, layer: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(label: UnityEngine.GUIContent, mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(label: string, mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(label: UnityEngine.GUIContent, mask: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(label: string, mask: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(mask: number, displayedOptions: string[], style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): number;
    static MaskField(mask: number, displayedOptions: string[], ...options: UnityEngine.GUILayoutOption[]): number;
    static EnumFlagsField(enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: string, enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: string, enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: UnityEngine.GUIContent, enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: UnityEngine.GUIContent, enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: UnityEngine.GUIContent, enumValue: System.Enum, includeObsolete: boolean, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumFlagsField(label: UnityEngine.GUIContent, enumValue: System.Enum, includeObsolete: boolean, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static ObjectField(obj: UnityEngine.Object, objType: System.Type, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: string, obj: UnityEngine.Object, objType: System.Type, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: string, obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: string, obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type, targetBeingEdited: UnityEngine.Object, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(label: UnityEngine.GUIContent, obj: UnityEngine.Object, objType: System.Type, allowSceneObjects: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Object;
    static ObjectField(property: UnityEditor.SerializedProperty, ...options: UnityEngine.GUILayoutOption[]): void;
    static ObjectField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static ObjectField(property: UnityEditor.SerializedProperty, objType: System.Type, ...options: UnityEngine.GUILayoutOption[]): void;
    static ObjectField(property: UnityEditor.SerializedProperty, objType: System.Type, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static Vector2Field(label: string, value: UnityEngine.Vector2, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static Vector2Field(label: UnityEngine.GUIContent, value: UnityEngine.Vector2, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static Vector3Field(label: string, value: UnityEngine.Vector3, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector3;
    static Vector3Field(label: UnityEngine.GUIContent, value: UnityEngine.Vector3, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector3;
    static Vector4Field(label: string, value: UnityEngine.Vector4, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector4;
    static Vector4Field(label: UnityEngine.GUIContent, value: UnityEngine.Vector4, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector4;
    static Vector2IntField(label: string, value: UnityEngine.Vector2Int, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2Int;
    static Vector2IntField(label: UnityEngine.GUIContent, value: UnityEngine.Vector2Int, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2Int;
    static Vector3IntField(label: string, value: UnityEngine.Vector3Int, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector3Int;
    static Vector3IntField(label: UnityEngine.GUIContent, value: UnityEngine.Vector3Int, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector3Int;
    static RectField(value: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static RectField(label: string, value: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static RectField(label: UnityEngine.GUIContent, value: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static RectIntField(value: UnityEngine.RectInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.RectInt;
    static RectIntField(label: string, value: UnityEngine.RectInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.RectInt;
    static RectIntField(label: UnityEngine.GUIContent, value: UnityEngine.RectInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.RectInt;
    static BoundsField(value: UnityEngine.Bounds, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Bounds;
    static BoundsField(label: string, value: UnityEngine.Bounds, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Bounds;
    static BoundsField(label: UnityEngine.GUIContent, value: UnityEngine.Bounds, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Bounds;
    static BoundsIntField(value: UnityEngine.BoundsInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.BoundsInt;
    static BoundsIntField(label: string, value: UnityEngine.BoundsInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.BoundsInt;
    static BoundsIntField(label: UnityEngine.GUIContent, value: UnityEngine.BoundsInt, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.BoundsInt;
    static ColorField(value: UnityEngine.Color, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Color;
    static ColorField(label: string, value: UnityEngine.Color, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Color;
    static ColorField(label: UnityEngine.GUIContent, value: UnityEngine.Color, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Color;
    static ColorField(label: UnityEngine.GUIContent, value: UnityEngine.Color, showEyedropper: boolean, showAlpha: boolean, hdr: boolean, hdrConfig: UnityEditor.ColorPickerHDRConfig, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Color;
    static ColorField(label: UnityEngine.GUIContent, value: UnityEngine.Color, showEyedropper: boolean, showAlpha: boolean, hdr: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Color;
    static CurveField(value: UnityEngine.AnimationCurve, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(label: string, value: UnityEngine.AnimationCurve, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(label: UnityEngine.GUIContent, value: UnityEngine.AnimationCurve, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(label: string, value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(label: UnityEngine.GUIContent, value: UnityEngine.AnimationCurve, color: UnityEngine.Color, ranges: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.AnimationCurve;
    static CurveField(property: UnityEditor.SerializedProperty, color: UnityEngine.Color, ranges: UnityEngine.Rect, ...options: UnityEngine.GUILayoutOption[]): void;
    static CurveField(property: UnityEditor.SerializedProperty, color: UnityEngine.Color, ranges: UnityEngine.Rect, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): void;
    static InspectorTitlebar(foldout: boolean, targetObj: UnityEngine.Object): boolean;
    static InspectorTitlebar(foldout: boolean, targetObj: UnityEngine.Object, expandable: boolean): boolean;
    static InspectorTitlebar(foldout: boolean, targetObjs: UnityEngine.Object[]): boolean;
    static InspectorTitlebar(foldout: boolean, targetObjs: UnityEngine.Object[], expandable: boolean): boolean;
    static InspectorTitlebar(foldout: boolean, editor: UnityEditor.Editor): boolean;
    static InspectorTitlebar(targetObjs: UnityEngine.Object[]): void;
    static HelpBox(message: string, type: UnityEditor.MessageType): void;
    static HelpBox(message: string, type: UnityEditor.MessageType, wide: boolean): void;
    static HelpBox(content: UnityEngine.GUIContent, wide?: boolean): void;
    static Space(): void;
    static Space(width: number): void;
    static Space(width: number, expand: boolean): void;
    static Separator(): void;
    static BeginToggleGroup(label: string, toggle: boolean): boolean;
    static BeginToggleGroup(label: UnityEngine.GUIContent, toggle: boolean): boolean;
    static EndToggleGroup(): void;
    static BeginHorizontal(...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static BeginHorizontal(style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static EndHorizontal(): void;
    static BeginVertical(...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static BeginVertical(style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static EndVertical(): void;
    static BeginScrollView(scrollPosition: UnityEngine.Vector2, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static BeginScrollView(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static BeginScrollView(scrollPosition: UnityEngine.Vector2, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static BeginScrollView(scrollPosition: UnityEngine.Vector2, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static BeginScrollView(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, background: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Vector2;
    static EndScrollView(): void;
    static PropertyField(property: UnityEditor.SerializedProperty, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static PropertyField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static PropertyField(property: UnityEditor.SerializedProperty, includeChildren: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static PropertyField(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent, includeChildren: boolean, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static GetControlRect(...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static GetControlRect(hasLabel: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static GetControlRect(hasLabel: boolean, height: number, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static GetControlRect(hasLabel: boolean, height: number, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Rect;
    static BeginFadeGroup(value: number): boolean;
    static EndFadeGroup(): void;
    static BeginBuildTargetSelectionGrouping(): UnityEditor.BuildTargetGroup;
    static EndBuildTargetSelectionGrouping(): void;
    static DropdownButton(content: UnityEngine.GUIContent, focusType: UnityEngine.FocusType, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static DropdownButton(content: UnityEngine.GUIContent, focusType: UnityEngine.FocusType, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): boolean;
    static EnumMaskField(enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskField(enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskField(label: string, enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskField(label: string, enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskField(label: UnityEngine.GUIContent, enumValue: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskField(label: UnityEngine.GUIContent, enumValue: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskPopup(label: string, selected: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskPopup(label: string, selected: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskPopup(label: UnityEngine.GUIContent, selected: System.Enum, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static EnumMaskPopup(label: UnityEngine.GUIContent, selected: System.Enum, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]): System.Enum;
    static BeginFoldoutHeaderGroup(foldout: boolean, content: string, style?: UnityEngine.GUIStyle, menuAction?: ((arg0: UnityEngine.Rect) => void), menuIcon?: UnityEngine.GUIStyle): boolean;
    static BeginFoldoutHeaderGroup(foldout: boolean, content: UnityEngine.GUIContent, style?: UnityEngine.GUIStyle, menuAction?: ((arg0: UnityEngine.Rect) => void), menuIcon?: UnityEngine.GUIStyle): boolean;
    static EndFoldoutHeaderGroup(): void;
    static GradientField(value: UnityEngine.Gradient, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Gradient;
    static GradientField(label: string, value: UnityEngine.Gradient, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Gradient;
    static GradientField(label: UnityEngine.GUIContent, value: UnityEngine.Gradient, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Gradient;
    static GradientField(label: UnityEngine.GUIContent, value: UnityEngine.Gradient, hdr: boolean, ...options: UnityEngine.GUILayoutOption[]): UnityEngine.Gradient;
    static Knob(knobSize: UnityEngine.Vector2, value: number, minValue: number, maxValue: number, unit: string, backgroundColor: UnityEngine.Color, activeColor: UnityEngine.Color, showValue: boolean, ...options: UnityEngine.GUILayoutOption[]): number;
    static EditorToolbarForTarget(target: UnityEngine.Object): void;
    static EditorToolbarForTarget(content: UnityEngine.GUIContent, target: UnityEngine.Object): void;
    static ToolContextToolbarForTarget(content: UnityEngine.GUIContent, target: UnityEngine.Object): void;
    static EditorToolbar(...tools: UnityEditor.EditorTools.EditorTool[]): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout_ToggleGroupScope {
    constructor(label: string, toggle: boolean);
    constructor(label: UnityEngine.GUIContent, toggle: boolean);
    enabled: boolean;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout_HorizontalScope {
    constructor(...options: UnityEngine.GUILayoutOption[]);
    constructor(style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]);
    rect: UnityEngine.Rect;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout_VerticalScope {
    constructor(...options: UnityEngine.GUILayoutOption[]);
    constructor(style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]);
    rect: UnityEngine.Rect;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout_ScrollViewScope {
    constructor(scrollPosition: UnityEngine.Vector2, ...options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, ...options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, style: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]);
    constructor(scrollPosition: UnityEngine.Vector2, alwaysShowHorizontal: boolean, alwaysShowVertical: boolean, horizontalScrollbar: UnityEngine.GUIStyle, verticalScrollbar: UnityEngine.GUIStyle, background: UnityEngine.GUIStyle, ...options: UnityEngine.GUILayoutOption[]);
    scrollPosition: UnityEngine.Vector2;
    handleScrollWheel: boolean;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUILayout_FadeGroupScope {
    constructor(value: number);
    visible: boolean;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class EditorGUIUtility {
    constructor();
    static whiteTexture: UnityEngine.Texture2D;
    static systemCopyBuffer: string;
    static pixelsPerPoint: number;
    static singleLineHeight: number;
    static standardVerticalSpacing: number;
    static isProSkin: boolean;
    static editingTextField: boolean;
    static textFieldHasSelection: boolean;
    static hierarchyMode: boolean;
    static wideMode: boolean;
    static currentViewWidth: number;
    static labelWidth: number;
    static fieldWidth: number;
    static native: UnityEngine.FocusType;
    static SerializeMainMenuToString(): string;
    static SetMenuLocalizationTestMode(onoff: boolean): void;
    static SetIconSize(size: UnityEngine.Vector2): void;
    static SetWantsMouseJumping(wantz: number): void;
    static IsDisplayReferencedByCameras(displayIndex: number): boolean;
    static QueueGameViewInputEvent(evt: UnityEngine.Event): void;
    static RenderGameViewCameras(target: UnityEngine.RenderTexture, targetDisplay: number, screenRect: UnityEngine.Rect, mousePosition: UnityEngine.Vector2, gizmos: boolean): void;
    static SetIconForObject(obj: UnityEngine.Object, icon: UnityEngine.Texture2D): void;
    static GetIconForObject(obj: UnityEngine.Object): UnityEngine.Texture2D;
    static GetMainWindowPosition(): UnityEngine.Rect;
    static SetMainWindowPosition(position: UnityEngine.Rect): void;
    static PointsToPixels(rect: UnityEngine.Rect): UnityEngine.Rect;
    static PixelsToPoints(rect: UnityEngine.Rect): UnityEngine.Rect;
    static PointsToPixels(position: UnityEngine.Vector2): UnityEngine.Vector2;
    static PixelsToPoints(position: UnityEngine.Vector2): UnityEngine.Vector2;
    static GetFlowLayoutedRects(rect: UnityEngine.Rect, style: UnityEngine.GUIStyle, horizontalSpacing: number, verticalSpacing: number, items: string[]): UnityEngine.Rect[];
    static FindTexture(name: string): UnityEngine.Texture2D;
    static TrTextContent(key: string, text: string, tooltip: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TrTextContent(text: string, tooltip?: string, icon?: UnityEngine.Texture): UnityEngine.GUIContent;
    static TrTextContent(text: string, tooltip: string, iconName: string): UnityEngine.GUIContent;
    static TrTextContent(text: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, iconName: string): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, tooltip: string, iconName: string): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, tooltip: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, tooltip: string, messageType: UnityEditor.MessageType): UnityEngine.GUIContent;
    static TrTextContentWithIcon(text: string, messageType: UnityEditor.MessageType): UnityEngine.GUIContent;
    static TrIconContent(iconName: string, tooltip?: string): UnityEngine.GUIContent;
    static TrIconContent(icon: UnityEngine.Texture, tooltip?: string): UnityEngine.GUIContent;
    static TrTempContent(t: string): UnityEngine.GUIContent;
    static TrTempContent(texts: string[]): UnityEngine.GUIContent[];
    static TrTempContent(texts: string[], tooltips: string[]): UnityEngine.GUIContent[];
    static IconContent(name: string): UnityEngine.GUIContent;
    static IconContent(name: string, text: string): UnityEngine.GUIContent;
    static ObjectContent(obj: UnityEngine.Object, type: System.Type): UnityEngine.GUIContent;
    static HasObjectThumbnail(objType: System.Type): boolean;
    static GetIconSize(): UnityEngine.Vector2;
    static GetBuiltinSkin(skin: UnityEditor.EditorSkin): UnityEngine.GUISkin;
    static LoadRequired(path: string): UnityEngine.Object;
    static Load(path: string): UnityEngine.Object;
    static PingObject(obj: UnityEngine.Object): void;
    static PingObject(targetInstanceID: number): void;
    static RenderGameViewCameras(cameraRect: UnityEngine.Rect, gizmos: boolean, gui: boolean): void;
    static RenderGameViewCameras(cameraRect: UnityEngine.Rect, statsRect: UnityEngine.Rect, gizmos: boolean, gui: boolean): void;
    static LookLikeControls(_labelWidth: number, _fieldWidth: number): void;
    static LookLikeControls(_labelWidth: number): void;
    static LookLikeControls(): void;
    static LookLikeInspector(): void;
    static CommandEvent(commandName: string): UnityEngine.Event;
    static DrawColorSwatch(position: UnityEngine.Rect, color: UnityEngine.Color): void;
    static DrawCurveSwatch(position: UnityEngine.Rect, curve: UnityEngine.AnimationCurve, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, bgColor: UnityEngine.Color): void;
    static DrawCurveSwatch(position: UnityEngine.Rect, curve: UnityEngine.AnimationCurve, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, bgColor: UnityEngine.Color, topFillColor: UnityEngine.Color, bottomFillColor: UnityEngine.Color): void;
    static DrawCurveSwatch(position: UnityEngine.Rect, curve: UnityEngine.AnimationCurve, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, bgColor: UnityEngine.Color, topFillColor: UnityEngine.Color, bottomFillColor: UnityEngine.Color, curveRanges: UnityEngine.Rect): void;
    static DrawCurveSwatch(position: UnityEngine.Rect, curve: UnityEngine.AnimationCurve, property: UnityEditor.SerializedProperty, color: UnityEngine.Color, bgColor: UnityEngine.Color, curveRanges: UnityEngine.Rect): void;
    static DrawRegionSwatch(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, property2: UnityEditor.SerializedProperty, color: UnityEngine.Color, bgColor: UnityEngine.Color, curveRanges: UnityEngine.Rect): void;
    static DrawRegionSwatch(position: UnityEngine.Rect, curve: UnityEngine.AnimationCurve, curve2: UnityEngine.AnimationCurve, color: UnityEngine.Color, bgColor: UnityEngine.Color, curveRanges: UnityEngine.Rect): void;
    static HSVToRGB(H: number, S: number, V: number): UnityEngine.Color;
    static HSVToRGB(H: number, S: number, V: number, hdr: boolean): UnityEngine.Color;
    static AddCursorRect(position: UnityEngine.Rect, mouse: UnityEditor.MouseCursor): void;
    static AddCursorRect(position: UnityEngine.Rect, mouse: UnityEditor.MouseCursor, controlID: number): void;
    static GetObjectPickerObject(): UnityEngine.Object;
    static GetObjectPickerControlID(): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUIUtility_PropertyCallbackScope {
    constructor(callback: ((arg0: UnityEngine.Rect, arg1: UnityEditor.SerializedProperty) => void));
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorGUIUtility_IconSizeScope {
    constructor(iconSizeWithinScope: UnityEngine.Vector2);
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SessionState {
    constructor();
    static SetBool(key: string, value: boolean): void;
    static GetBool(key: string, defaultValue: boolean): boolean;
    static EraseBool(key: string): void;
    static SetFloat(key: string, value: number): void;
    static GetFloat(key: string, defaultValue: number): number;
    static EraseFloat(key: string): void;
    static SetInt(key: string, value: number): void;
    static GetInt(key: string, defaultValue: number): number;
    static EraseInt(key: string): void;
    static SetString(key: string, value: string): void;
    static GetString(key: string, defaultValue: string): string;
    static EraseString(key: string): void;
    static SetVector3(key: string, value: UnityEngine.Vector3): void;
    static GetVector3(key: string, defaultValue: UnityEngine.Vector3): UnityEngine.Vector3;
    static EraseVector3(key: string): void;
    static EraseIntArray(key: string): void;
    static SetIntArray(key: string, value: number[]): void;
    static GetIntArray(key: string, defaultValue: number[]): number[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorPrefs {
    constructor();
    static SetInt(key: string, value: number): void;
    static GetInt(key: string, defaultValue: number): number;
    static GetInt(key: string): number;
    static SetFloat(key: string, value: number): void;
    static GetFloat(key: string, defaultValue: number): number;
    static GetFloat(key: string): number;
    static SetString(key: string, value: string): void;
    static GetString(key: string, defaultValue: string): string;
    static GetString(key: string): string;
    static SetBool(key: string, value: boolean): void;
    static GetBool(key: string, defaultValue: boolean): boolean;
    static GetBool(key: string): boolean;
    static HasKey(key: string): boolean;
    static DeleteKey(key: string): void;
    static DeleteAll(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ManagedReferenceMissingType {
    assemblyName: string;
    className: string;
    namespaceName: string;
    referenceId: System.Int64;
    serializedData: string;
    Equals(other: UnityEditor.ManagedReferenceMissingType): boolean;
    CompareTo(other: UnityEditor.ManagedReferenceMissingType): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class SerializationUtility {
    constructor();
    static RefIdUnknown: System.Int64;
    static RefIdNull: System.Int64;
    static SetManagedReferenceIdForObject(obj: UnityEngine.Object, scriptObj: any, refId: System.Int64): boolean;
    static GetManagedReferenceIdForObject(obj: UnityEngine.Object, scriptObj: any): System.Int64;
    static GetManagedReference(obj: UnityEngine.Object, id: System.Int64): any;
    static GetManagedReferenceIds(obj: UnityEngine.Object): System.Int64[];
    static HasManagedReferencesWithMissingTypes(obj: UnityEngine.Object): boolean;
    static GetManagedReferencesWithMissingTypes(obj: UnityEngine.Object): UnityEditor.ManagedReferenceMissingType[];
    static ClearAllManagedReferencesWithMissingTypes(obj: UnityEngine.Object): boolean;
    static ClearManagedReferenceWithMissingType(obj: UnityEngine.Object, id: System.Int64): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class EditorSettings {
    static unityRemoteDevice: string;
    static unityRemoteCompression: string;
    static unityRemoteResolution: string;
    static unityRemoteJoystickSource: string;
    static externalVersionControl: string;
    static serializationMode: UnityEditor.SerializationMode;
    static lineEndingsForNewScripts: UnityEditor.LineEndingsMode;
    static webSecurityEmulationEnabled: boolean;
    static webSecurityEmulationHostUrl: string;
    static defaultBehaviorMode: UnityEditor.EditorBehaviorMode;
    static prefabRegularEnvironment: UnityEditor.SceneAsset;
    static prefabUIEnvironment: UnityEditor.SceneAsset;
    static prefabModeAllowAutoSave: boolean;
    static spritePackerMode: UnityEditor.SpritePackerMode;
    static spritePackerPaddingPower: number;
    static etcTextureCompressorBehavior: number;
    static etcTextureFastCompressor: number;
    static etcTextureNormalCompressor: number;
    static etcTextureBestCompressor: number;
    static enableTextureStreamingInEditMode: boolean;
    static enableTextureStreamingInPlayMode: boolean;
    static asyncShaderCompilation: boolean;
    static cachingShaderPreprocessor: boolean;
    static projectGenerationUserExtensions: string[];
    static projectGenerationBuiltinExtensions: string[];
    static projectGenerationRootNamespace: string;
    static useLegacyProbeSampleCount: boolean;
    static disableCookiesInLightmapper: boolean;
    static enableCookiesInLightmapper: boolean;
    static enterPlayModeOptionsEnabled: boolean;
    static enterPlayModeOptions: UnityEditor.EnterPlayModeOptions;
    static serializeInlineMappingsOnOneLine: boolean;
    static assetPipelineMode: UnityEditor.AssetPipelineMode;
    static cacheServerMode: UnityEditor.CacheServerMode;
    static refreshImportMode: UnityEditor.AssetDatabase_RefreshImportMode;
    static cacheServerEndpoint: string;
    static cacheServerNamespacePrefix: string;
    static cacheServerEnableDownload: boolean;
    static cacheServerEnableUpload: boolean;
    static cacheServerEnableAuth: boolean;
    static cacheServerEnableTls: boolean;
    static gameObjectNamingDigits: number;
    static gameObjectNamingScheme: UnityEditor.EditorSettings_NamingScheme;
    static assetNamingUsesSpace: boolean;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum EditorSettings_NamingScheme {
    SpaceParenthesis = 0,
    Dot = 1,
    Underscore = 2,
  }
  export enum StandaloneBuildSubtarget {
    Player = 0,
    Server = 1,
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
  export enum AndroidCreateSymbols {
    Disabled = 0,
    Public = 1,
    Debugging = 2,
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
  export enum WebGLTextureSubtarget {
    Generic = 0,
    DXT = 1,
    ETC = 2,
    ETC2 = 3,
    ASTC = 4,
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
  export enum XcodeBuildConfig {
    Debug = 0,
    Release = 1,
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
  export enum EmbeddedLinuxArchitecture {
    Arm64 = 0,
    Arm32 = 1,
    X64 = 2,
    X86 = 3,
  }
  export class EditorUserBuildSettings {
    static selectedBuildTargetGroup: UnityEditor.BuildTargetGroup;
    static selectedEmbeddedLinuxArchitecture: UnityEditor.EmbeddedLinuxArchitecture;
    static selectedStandaloneTarget: UnityEditor.BuildTarget;
    static standaloneBuildSubtarget: UnityEditor.StandaloneBuildSubtarget;
    static ps4BuildSubtarget: UnityEditor.PS4BuildSubtarget;
    static ps4HardwareTarget: UnityEditor.PS4HardwareTarget;
    static explicitNullChecks: boolean;
    static explicitDivideByZeroChecks: boolean;
    static explicitArrayBoundsChecks: boolean;
    static needSubmissionMaterials: boolean;
    static compressWithPsArc: boolean;
    static forceInstallation: boolean;
    static movePackageToDiscOuterEdge: boolean;
    static compressFilesInPackage: boolean;
    static enableHeadlessMode: boolean;
    static buildScriptsOnly: boolean;
    static xboxBuildSubtarget: UnityEditor.XboxBuildSubtarget;
    static streamingInstallLaunchRange: number;
    static xboxOneDeployMethod: UnityEditor.XboxOneDeployMethod;
    static xboxOneDeployDrive: UnityEditor.XboxOneDeployDrive;
    static xboxOneUsername: string;
    static xboxOneNetworkSharePath: string;
    static xboxOneAdditionalDebugPorts: string;
    static xboxOneRebootIfDeployFailsAndRetry: boolean;
    static androidBuildSubtarget: UnityEditor.MobileTextureSubtarget;
    static webGLBuildSubtarget: UnityEditor.WebGLTextureSubtarget;
    static androidETC2Fallback: UnityEditor.AndroidETC2Fallback;
    static androidBuildSystem: UnityEditor.AndroidBuildSystem;
    static androidBuildType: UnityEditor.AndroidBuildType;
    static androidUseLegacySdkTools: boolean;
    static androidCreateSymbolsZip: boolean;
    static androidCreateSymbols: UnityEditor.AndroidCreateSymbols;
    static wsaSubtarget: UnityEditor.WSASubtarget;
    static wsaSDK: UnityEditor.WSASDK;
    static wsaUWPBuildType: UnityEditor.WSAUWPBuildType;
    static wsaUWPSDK: string;
    static wsaMinUWPSDK: string;
    static wsaArchitecture: string;
    static wsaUWPVisualStudioVersion: string;
    static windowsDevicePortalAddress: string;
    static windowsDevicePortalUsername: string;
    static windowsDevicePortalPassword: string;
    static wsaBuildAndRunDeployTarget: UnityEditor.WSABuildAndRunDeployTarget;
    static overrideMaxTextureSize: number;
    static overrideTextureCompression: UnityEditor.Build.OverrideTextureCompression;
    static activeBuildTarget: UnityEditor.BuildTarget;
    static activeScriptCompilationDefines: string[];
    static development: boolean;
    static il2CppCodeGeneration: UnityEditor.Build.Il2CppCodeGeneration;
    static webGLUsePreBuiltUnityEngine: boolean;
    static connectProfiler: boolean;
    static buildWithDeepProfilingSupport: boolean;
    static allowDebugging: boolean;
    static waitForPlayerConnection: boolean;
    static exportAsGoogleAndroidProject: boolean;
    static buildAppBundle: boolean;
    static symlinkLibraries: boolean;
    static symlinkSources: boolean;
    static iOSXcodeBuildConfig: UnityEditor.XcodeBuildConfig;
    static macOSXcodeBuildConfig: UnityEditor.XcodeBuildConfig;
    static iOSBuildConfigType: UnityEditor.iOSBuildType;
    static switchCreateRomFile: boolean;
    static switchNVNGraphicsDebugger: boolean;
    static generateNintendoSwitchShaderInfo: boolean;
    static switchNVNShaderDebugging: boolean;
    static switchNVNDrawValidation: boolean;
    static switchNVNDrawValidation_Light: boolean;
    static switchNVNDrawValidation_Heavy: boolean;
    static switchEnableHeapInspector: boolean;
    static switchEnableDebugPad: boolean;
    static switchRedirectWritesToHostMount: boolean;
    static switchHTCSScriptDebugging: boolean;
    static switchUseLegacyNvnPoolAllocator: boolean;
    static installInBuildFolder: boolean;
    static waitForManagedDebugger: boolean;
    static forceOptimizeScriptCompilation: boolean;
    static androidDebugMinification: UnityEditor.AndroidMinification;
    static androidReleaseMinification: UnityEditor.AndroidMinification;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static activeBuildTargetChanged: (() => void);
    static SwitchActiveBuildTarget(targetGroup: UnityEditor.BuildTargetGroup, target: UnityEditor.BuildTarget): boolean;
    static SwitchActiveBuildTargetAsync(targetGroup: UnityEditor.BuildTargetGroup, target: UnityEditor.BuildTarget): boolean;
    static SwitchActiveBuildTarget(namedBuildTarget: UnityEditor.Build.NamedBuildTarget, target: UnityEditor.BuildTarget): boolean;
    static GetBuildLocation(target: UnityEditor.BuildTarget): string;
    static SetBuildLocation(target: UnityEditor.BuildTarget, location: string): void;
    static SetPlatformSettings(platformName: string, name: string, value: string): void;
    static SetPlatformSettings(buildTargetGroup: string, buildTarget: string, name: string, value: string): void;
    static GetPlatformSettings(platformName: string, name: string): string;
    static GetPlatformSettings(buildTargetGroup: string, platformName: string, name: string): string;
    static SwitchActiveBuildTarget(target: UnityEditor.BuildTarget): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum SemanticMergeMode {
    Off = 0,
    Premerge = 1,
    Ask = 2,
  }
  export class EditorUserSettings {
    static AutomaticAdd: boolean;
    static WorkOffline: boolean;
    static showFailedCheckout: boolean;
    static overwriteFailedCheckoutAssets: boolean;
    static overlayIcons: boolean;
    static hierarchyOverlayIcons: boolean;
    static otherOverlayIcons: boolean;
    static allowAsyncStatusUpdate: boolean;
    static artifactGarbageCollection: boolean;
    static semanticMergeMode: UnityEditor.SemanticMergeMode;
    static desiredImportWorkerCount: number;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static GetConfigValue(name: string): string;
    static SetConfigValue(name: string, value: string): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorUtility {
    constructor();
    static audioMasterMute: boolean;
    static scriptCompilationFailed: boolean;
    static OpenFilePanel(title: string, directory: string, extension: string): string;
    static OpenFilePanelWithFilters(title: string, directory: string, filters: string[]): string;
    static RevealInFinder(path: string): void;
    static DisplayDialog(title: string, message: string, ok: string, cancel: string): boolean;
    static DisplayDialog(title: string, message: string, ok: string): boolean;
    static DisplayDialogComplex(title: string, message: string, ok: string, cancel: string, alt: string): number;
    static OpenFolderPanel(title: string, folder: string, defaultName: string): string;
    static SaveFolderPanel(title: string, folder: string, defaultName: string): string;
    static WarnPrefab(target: UnityEngine.Object, title: string, warning: string, okButton: string): boolean;
    static IsPersistent(target: UnityEngine.Object): boolean;
    static SaveFilePanel(title: string, directory: string, defaultName: string, extension: string): string;
    static NaturalCompare(a: string, b: string): number;
    static InstanceIDToObject(instanceID: number): UnityEngine.Object;
    static CompressTexture(texture: UnityEngine.Texture2D, format: UnityEngine.TextureFormat, quality: number): void;
    static CompressCubemapTexture(texture: UnityEngine.Cubemap, format: UnityEngine.TextureFormat, quality: number): void;
    static SetDirty(target: UnityEngine.Object): void;
    static ClearDirty(target: UnityEngine.Object): void;
    static InvokeDiffTool(leftTitle: string, leftFile: string, rightTitle: string, rightFile: string, ancestorTitle: string, ancestorFile: string): string;
    static CopySerialized(source: UnityEngine.Object, dest: UnityEngine.Object): void;
    static CopySerializedManagedFieldsOnly(source: any, dest: any): void;
    static CollectDependencies(roots: UnityEngine.Object[]): UnityEngine.Object[];
    static CollectDeepHierarchy(roots: UnityEngine.Object[]): UnityEngine.Object[];
    static UnloadUnusedAssets(): void;
    static UnloadUnusedAssetsIgnoreManagedReferences(): void;
    static FormatBytes(bytes: System.Int64): string;
    static DisplayProgressBar(title: string, info: string, progress: number): void;
    static DisplayCancelableProgressBar(title: string, info: string, progress: number): boolean;
    static ClearProgressBar(): void;
    static GetObjectEnabled(target: UnityEngine.Object): number;
    static SetObjectEnabled(target: UnityEngine.Object, enabled: boolean): void;
    static SetSelectedRenderState(renderer: UnityEngine.Renderer, renderState: UnityEditor.EditorSelectedRenderState): void;
    static ExtractOggFile(obj: UnityEngine.Object, path: string): boolean;
    static OpenWithDefaultApp(fileName: string): void;
    static SetCameraAnimateMaterials(camera: UnityEngine.Camera, animate: boolean): void;
    static SetCameraAnimateMaterialsTime(camera: UnityEngine.Camera, time: number): void;
    static UpdateGlobalShaderProperties(time: number): void;
    static FindAsset(path: string, type: System.Type): UnityEngine.Object;
    static GetDirtyCount(instanceID: number): number;
    static GetDirtyCount(target: UnityEngine.Object): number;
    static IsDirty(instanceID: number): boolean;
    static IsDirty(target: UnityEngine.Object): boolean;
    static FocusProjectWindow(): void;
    static RequestScriptReload(): void;
    static IsRunningUnderCPUEmulation(): boolean;
    static LoadWindowLayout(path: string): boolean;
    static CompressTexture(texture: UnityEngine.Texture2D, format: UnityEngine.TextureFormat, quality: UnityEditor.TextureCompressionQuality): void;
    static CompressCubemapTexture(texture: UnityEngine.Cubemap, format: UnityEngine.TextureFormat, quality: UnityEditor.TextureCompressionQuality): void;
    static SaveFilePanelInProject(title: string, defaultName: string, extension: string, message: string): string;
    static SaveFilePanelInProject(title: string, defaultName: string, extension: string, message: string, path: string): string;
    static CopySerializedIfDifferent(source: UnityEngine.Object, dest: UnityEngine.Object): void;
    static GetAssetPath(asset: UnityEngine.Object): string;
    static UnloadUnusedAssetsImmediate(): void;
    static UnloadUnusedAssetsImmediate(includeMonoReferencesAsRoots: boolean): void;
    static BuildResourceFile(selection: UnityEngine.Object[], pathName: string): boolean;
    static GetDialogOptOutDecision(dialogOptOutDecisionType: UnityEditor.DialogOptOutDecisionType, dialogOptOutDecisionStorageKey: string): boolean;
    static SetDialogOptOutDecision(dialogOptOutDecisionType: UnityEditor.DialogOptOutDecisionType, dialogOptOutDecisionStorageKey: string, optOutDecision: boolean): void;
    static DisplayDialog(title: string, message: string, ok: string, dialogOptOutDecisionType: UnityEditor.DialogOptOutDecisionType, dialogOptOutDecisionStorageKey: string): boolean;
    static DisplayDialog(title: string, message: string, ok: string, cancel: string, dialogOptOutDecisionType: UnityEditor.DialogOptOutDecisionType, dialogOptOutDecisionStorageKey: string): boolean;
    static DisplayPopupMenu(position: UnityEngine.Rect, menuItemPath: string, command: UnityEditor.MenuCommand): void;
    static DisplayCustomMenu(position: UnityEngine.Rect, options: UnityEngine.GUIContent[], selected: number, callback: UnityEditor.EditorUtility_SelectMenuItemFunction, userData: any): void;
    static DisplayCustomMenu(position: UnityEngine.Rect, options: UnityEngine.GUIContent[], selected: number, callback: UnityEditor.EditorUtility_SelectMenuItemFunction, userData: any, showHotkey: boolean): void;
    static DisplayCustomMenu(position: UnityEngine.Rect, options: UnityEngine.GUIContent[], checkEnabled: ((arg0: number) => boolean), selected: number, callback: UnityEditor.EditorUtility_SelectMenuItemFunction, userData: any, showHotkey?: boolean): void;
    static FormatBytes(bytes: number): string;
    static SetSelectedWireframeHidden(renderer: UnityEngine.Renderer, enabled: boolean): void;
    static CreateGameObjectWithHideFlags(name: string, flags: UnityEngine.HideFlags, ...components: System.Type[]): UnityEngine.GameObject;
    static CompileCSharp(scripts: string[], references: string[], defines: string[], outputAssembly: string): string[];
    static InstantiatePrefab(target: UnityEngine.Object): UnityEngine.Object;
    static ReplacePrefab(go: UnityEngine.GameObject, targetPrefab: UnityEngine.Object, options: UnityEditor.ReplacePrefabOptions): UnityEngine.GameObject;
    static ReplacePrefab(go: UnityEngine.GameObject, targetPrefab: UnityEngine.Object): UnityEngine.GameObject;
    static CreateEmptyPrefab(path: string): UnityEngine.Object;
    static ReconnectToLastPrefab(go: UnityEngine.GameObject): boolean;
    static GetPrefabType(target: UnityEngine.Object): UnityEditor.PrefabType;
    static GetPrefabParent(source: UnityEngine.Object): UnityEngine.Object;
    static FindPrefabRoot(source: UnityEngine.GameObject): UnityEngine.GameObject;
    static ResetToPrefabState(source: UnityEngine.Object): boolean;
    static DisplayCustomMenuWithSeparators(position: UnityEngine.Rect, options: string[], enabled: boolean[], separator: boolean[], selected: number[], callback: UnityEditor.EditorUtility_SelectMenuItemFunction, userData: any): void;
    static SetCustomDiffTool(path: string, twoWayDiff: string, threeWayDiff: string, mergeCommand: string, forceEnableCustomTool?: boolean): void;
    static SetDefaultParentObject(defaultParentObject: UnityEngine.GameObject): void;
    static ClearDefaultParentObject(scene: UnityEngine.SceneManagement.Scene): void;
    static ClearDefaultParentObject(): void;
    static OpenPropertyEditor(obj: UnityEngine.Object): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorUtility_SelectMenuItemFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(userData: any, options: string[], selected: number): void;
    BeginInvoke(userData: any, options: string[], selected: number, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
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
  export class SceneAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorWindow {
    constructor();
    rootVisualElement: UnityEngine.UIElements.VisualElement;
    wantsMouseMove: boolean;
    wantsMouseEnterLeaveWindow: boolean;
    wantsLessLayoutEvents: boolean;
    autoRepaintOnSceneChange: boolean;
    maximized: boolean;
    hasFocus: boolean;
    docked: boolean;
    static focusedWindow: UnityEditor.EditorWindow;
    static mouseOverWindow: UnityEditor.EditorWindow;
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
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    static GetWindow(t: System.Type, utility: boolean, title: string, focus: boolean): UnityEditor.EditorWindow;
    static GetWindow(t: System.Type, utility: boolean, title: string): UnityEditor.EditorWindow;
    static GetWindow(t: System.Type, utility: boolean): UnityEditor.EditorWindow;
    static GetWindow(t: System.Type): UnityEditor.EditorWindow;
    static GetWindowWithRect(t: System.Type, rect: UnityEngine.Rect, utility: boolean, title: string): UnityEditor.EditorWindow;
    static GetWindowWithRect(t: System.Type, rect: UnityEngine.Rect, utility: boolean): UnityEditor.EditorWindow;
    static GetWindowWithRect(t: System.Type, rect: UnityEngine.Rect): UnityEditor.EditorWindow;
    static FocusWindowIfItsOpen(t: System.Type): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum ExportPackageOptions {
    Default = 0,
    Interactive = 1,
    Recurse = 2,
    IncludeDependencies = 4,
    IncludeLibraryAssets = 8,
  }
  export class FileUtil {
    constructor();
    static DeleteFileOrDirectory(path: string): boolean;
    static CopyFileOrDirectory(source: string, dest: string): void;
    static CopyFileOrDirectoryFollowSymlinks(source: string, dest: string): void;
    static MoveFileOrDirectory(source: string, dest: string): void;
    static GetUniqueTempPathInProject(): string;
    static GetProjectRelativePath(path: string): string;
    static GetLogicalPath(path: string): string;
    static GetPhysicalPath(path: string): string;
    static ReplaceFile(src: string, dst: string): void;
    static ReplaceDirectory(src: string, dst: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GameObjectUtility {
    constructor();
    static GetStaticEditorFlags(go: UnityEngine.GameObject): UnityEditor.StaticEditorFlags;
    static SetStaticEditorFlags(go: UnityEngine.GameObject, flags: UnityEditor.StaticEditorFlags): void;
    static AreStaticEditorFlagsSet(go: UnityEngine.GameObject, flags: UnityEditor.StaticEditorFlags): boolean;
    static GetNavMeshArea(go: UnityEngine.GameObject): number;
    static SetNavMeshArea(go: UnityEngine.GameObject, areaIndex: number): void;
    static GetNavMeshAreaFromName(name: string): number;
    static GetNavMeshAreaNames(): string[];
    static GetUniqueNameForSibling(parent: UnityEngine.Transform, name: string): string;
    static EnsureUniqueNameForSibling(self: UnityEngine.GameObject): void;
    static SetParentAndAlign(child: UnityEngine.GameObject, parent: UnityEngine.GameObject): void;
    static GetMonoBehavioursWithMissingScriptCount(go: UnityEngine.GameObject): number;
    static RemoveMonoBehavioursWithMissingScript(go: UnityEngine.GameObject): number;
    static ModifyMaskIfGameObjectIsHiddenForPrefabModeInContext(sceneCullingMask: System.UInt64, gameObject: UnityEngine.GameObject): System.UInt64;
    static GetNavMeshLayer(go: UnityEngine.GameObject): number;
    static SetNavMeshLayer(go: UnityEngine.GameObject, areaIndex: number): void;
    static GetNavMeshLayerFromName(name: string): number;
    static GetNavMeshLayerNames(): string[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GlobalObjectId {
    targetObjectId: System.UInt64;
    targetPrefabId: System.UInt64;
    assetGUID: UnityEditor.GUID;
    identifierType: number;
    static GetGlobalObjectIdSlow(targetObject: UnityEngine.Object): UnityEditor.GlobalObjectId;
    static GetGlobalObjectIdsSlow(objects: UnityEngine.Object[], outputIdentifiers: UnityEditor.GlobalObjectId[]): void;
    static GetGlobalObjectIdSlow(instanceId: number): UnityEditor.GlobalObjectId;
    static GetGlobalObjectIdsSlow(instanceIds: number[], outputIdentifiers: UnityEditor.GlobalObjectId[]): void;
    ToString(): string;
    Equals(other: UnityEditor.GlobalObjectId): boolean;
    static GlobalObjectIdentifierToObjectSlow(id: UnityEditor.GlobalObjectId): UnityEngine.Object;
    static GlobalObjectIdentifiersToObjectsSlow(identifiers: UnityEditor.GlobalObjectId[], outputObjects: UnityEngine.Object[]): void;
    static GlobalObjectIdentifierToInstanceIDSlow(id: UnityEditor.GlobalObjectId): number;
    static GlobalObjectIdentifiersToInstanceIDsSlow(identifiers: UnityEditor.GlobalObjectId[], outputInstanceIDs: number[]): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
  }
  export class GUID {
    constructor(hexRepresentation: string);
    Equals(obj: any): boolean;
    Equals(obj: UnityEditor.GUID): boolean;
    GetHashCode(): number;
    CompareTo(obj: any): number;
    CompareTo(rhs: UnityEditor.GUID): number;
    Empty(): boolean;
    ParseExact(hex: string): boolean;
    static Generate(): UnityEditor.GUID;
    ToString(): string;
    GetType(): System.Type;
  }
  export class Handles {
    constructor();
    static lighting: boolean;
    static color: UnityEngine.Color;
    static zTest: UnityEngine.Rendering.CompareFunction;
    static matrix: UnityEngine.Matrix4x4;
    static inverseMatrix: UnityEngine.Matrix4x4;
    static xAxisColor: UnityEngine.Color;
    static yAxisColor: UnityEngine.Color;
    static zAxisColor: UnityEngine.Color;
    static centerColor: UnityEngine.Color;
    static selectedColor: UnityEngine.Color;
    static preselectionColor: UnityEngine.Color;
    static secondaryColor: UnityEngine.Color;
    static UIColliderHandleColor: UnityEngine.Color;
    static lineThickness: number;
    currentCamera: UnityEngine.Camera;
    static DrawPolyLine(...points: UnityEngine.Vector3[]): void;
    static DrawLine(p1: UnityEngine.Vector3, p2: UnityEngine.Vector3): void;
    static DrawLine(p1: UnityEngine.Vector3, p2: UnityEngine.Vector3, thickness: number): void;
    static DrawLines(lineSegments: UnityEngine.Vector3[]): void;
    static DrawLines(points: UnityEngine.Vector3[], segmentIndices: number[]): void;
    static DrawDottedLine(p1: UnityEngine.Vector3, p2: UnityEngine.Vector3, screenSpaceSize: number): void;
    static DrawDottedLines(lineSegments: UnityEngine.Vector3[], screenSpaceSize: number): void;
    static DrawDottedLines(points: UnityEngine.Vector3[], segmentIndices: number[], screenSpaceSize: number): void;
    static DrawWireCube(center: UnityEngine.Vector3, size: UnityEngine.Vector3): void;
    static ShouldRenderGizmos(): boolean;
    static DrawGizmos(camera: UnityEngine.Camera): void;
    static Disc(id: number, rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, axis: UnityEngine.Vector3, size: number, cutoffPlane: boolean, snap: number): UnityEngine.Quaternion;
    static FreeRotateHandle(id: number, rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, size: number): UnityEngine.Quaternion;
    static Slider(position: UnityEngine.Vector3, direction: UnityEngine.Vector3): UnityEngine.Vector3;
    static Slider(position: UnityEngine.Vector3, direction: UnityEngine.Vector3, size: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): UnityEngine.Vector3;
    static Slider(controlID: number, position: UnityEngine.Vector3, direction: UnityEngine.Vector3, size: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): UnityEngine.Vector3;
    static Slider(controlID: number, position: UnityEngine.Vector3, offset: UnityEngine.Vector3, direction: UnityEngine.Vector3, size: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): UnityEngine.Vector3;
    static FreeMoveHandle(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, snap: UnityEngine.Vector3, capFunction: UnityEditor.Handles_CapFunction): UnityEngine.Vector3;
    static FreeMoveHandle(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, snap: UnityEngine.Vector3, capFunction: UnityEditor.Handles_CapFunction): UnityEngine.Vector3;
    static ScaleValueHandle(value: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): number;
    static ScaleValueHandle(controlID: number, value: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): number;
    static Button(position: UnityEngine.Vector3, direction: UnityEngine.Quaternion, size: number, pickSize: number, capFunction: UnityEditor.Handles_CapFunction): boolean;
    static CubeHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static SphereHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static ConeHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static CylinderHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static RectangleHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static DotHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static CircleHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static ArrowHandleCap(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static DrawSelectionFrame(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    static PositionHandle(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion): UnityEngine.Vector3;
    static RotationHandle(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3): UnityEngine.Quaternion;
    static ScaleHandle(scale: UnityEngine.Vector3, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion): UnityEngine.Vector3;
    static ScaleHandle(scale: UnityEngine.Vector3, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): UnityEngine.Vector3;
    static RadiusHandle(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, radius: number, handlesOnly: boolean): number;
    static RadiusHandle(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, radius: number): number;
    static Slider2D(id: number, handlePos: UnityEngine.Vector3, offset: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2): UnityEngine.Vector3;
    static Slider2D(id: number, handlePos: UnityEngine.Vector3, offset: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2, drawHelper: boolean): UnityEngine.Vector3;
    static Slider2D(handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2): UnityEngine.Vector3;
    static Slider2D(handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2, drawHelper: boolean): UnityEngine.Vector3;
    static Slider2D(id: number, handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2): UnityEngine.Vector3;
    static Slider2D(id: number, handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: UnityEngine.Vector2, drawHelper: boolean): UnityEngine.Vector3;
    static Slider2D(handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: number): UnityEngine.Vector3;
    static Slider2D(handlePos: UnityEngine.Vector3, handleDir: UnityEngine.Vector3, slideDir1: UnityEngine.Vector3, slideDir2: UnityEngine.Vector3, handleSize: number, capFunction: UnityEditor.Handles_CapFunction, snap: number, drawHelper: boolean): UnityEngine.Vector3;
    static FreeRotateHandle(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, size: number): UnityEngine.Quaternion;
    static ScaleSlider(scale: number, position: UnityEngine.Vector3, direction: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, snap: number): number;
    static Disc(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3, axis: UnityEngine.Vector3, size: number, cutoffPlane: boolean, snap: number): UnityEngine.Quaternion;
    static SnapValue(value: number, snap: number): number;
    static SnapValue(value: UnityEngine.Vector2, snap: UnityEngine.Vector2): UnityEngine.Vector2;
    static SnapValue(value: UnityEngine.Vector3, snap: UnityEngine.Vector3): UnityEngine.Vector3;
    static SnapToGrid(transforms: UnityEngine.Transform[], axis?: UnityEngine.SnapAxis): void;
    static SelectionFrame(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): void;
    static DrawAAPolyLine(...points: UnityEngine.Vector3[]): void;
    static DrawAAPolyLine(width: number, ...points: UnityEngine.Vector3[]): void;
    static DrawAAPolyLine(lineTex: UnityEngine.Texture2D, ...points: UnityEngine.Vector3[]): void;
    static DrawAAPolyLine(width: number, actualNumberOfPoints: number, ...points: UnityEngine.Vector3[]): void;
    static DrawAAPolyLine(lineTex: UnityEngine.Texture2D, width: number, ...points: UnityEngine.Vector3[]): void;
    static DrawAAConvexPolygon(...points: UnityEngine.Vector3[]): void;
    static DrawBezier(startPosition: UnityEngine.Vector3, endPosition: UnityEngine.Vector3, startTangent: UnityEngine.Vector3, endTangent: UnityEngine.Vector3, color: UnityEngine.Color, texture: UnityEngine.Texture2D, width: number): void;
    static DrawWireDisc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, radius: number): void;
    static DrawWireDisc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, radius: number, thickness: number): void;
    static DrawWireArc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, from: UnityEngine.Vector3, angle: number, radius: number): void;
    static DrawWireArc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, from: UnityEngine.Vector3, angle: number, radius: number, thickness: number): void;
    static DrawSolidRectangleWithOutline(rectangle: UnityEngine.Rect, faceColor: UnityEngine.Color, outlineColor: UnityEngine.Color): void;
    static DrawSolidRectangleWithOutline(verts: UnityEngine.Vector3[], faceColor: UnityEngine.Color, outlineColor: UnityEngine.Color): void;
    static DrawSolidDisc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, radius: number): void;
    static DrawSolidArc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, from: UnityEngine.Vector3, angle: number, radius: number): void;
    static Label(position: UnityEngine.Vector3, text: string): void;
    static Label(position: UnityEngine.Vector3, image: UnityEngine.Texture): void;
    static Label(position: UnityEngine.Vector3, content: UnityEngine.GUIContent): void;
    static Label(position: UnityEngine.Vector3, text: string, style: UnityEngine.GUIStyle): void;
    static Label(position: UnityEngine.Vector3, content: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): void;
    static GetMainGameViewSize(): UnityEngine.Vector2;
    static ClearCamera(position: UnityEngine.Rect, camera: UnityEngine.Camera): void;
    static DrawCamera(position: UnityEngine.Rect, camera: UnityEngine.Camera): void;
    static DrawCamera(position: UnityEngine.Rect, camera: UnityEngine.Camera, drawMode: UnityEditor.DrawCameraMode): void;
    static DrawCamera(position: UnityEngine.Rect, camera: UnityEngine.Camera, drawMode: UnityEditor.DrawCameraMode, drawGizmos: boolean): void;
    static SetCamera(camera: UnityEngine.Camera): void;
    static SetCamera(position: UnityEngine.Rect, camera: UnityEngine.Camera): void;
    static BeginGUI(): void;
    static BeginGUI(position: UnityEngine.Rect): void;
    static EndGUI(): void;
    static MakeBezierPoints(startPosition: UnityEngine.Vector3, endPosition: UnityEngine.Vector3, startTangent: UnityEngine.Vector3, endTangent: UnityEngine.Vector3, division: number): UnityEngine.Vector3[];
    static DrawTexture3DSDF(texture: UnityEngine.Texture, stepScale?: number, surfaceOffset?: number, customColorRamp?: UnityEngine.Gradient): void;
    static DrawTexture3DSlice(texture: UnityEngine.Texture, slicePositions: UnityEngine.Vector3, filterMode?: UnityEngine.FilterMode, useColorRamp?: boolean, customColorRamp?: UnityEngine.Gradient): void;
    static DrawTexture3DVolume(texture: UnityEngine.Texture, opacity?: number, qualityModifier?: number, filterMode?: UnityEngine.FilterMode, useColorRamp?: boolean, customColorRamp?: UnityEngine.Gradient): void;
    static DoPositionHandle(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion): UnityEngine.Vector3;
    static DoRotationHandle(rotation: UnityEngine.Quaternion, position: UnityEngine.Vector3): UnityEngine.Quaternion;
    static DoScaleHandle(scale: UnityEngine.Vector3, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): UnityEngine.Vector3;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Handles_DrawingScope {
    constructor(color: UnityEngine.Color);
    constructor(matrix: UnityEngine.Matrix4x4);
    constructor(color: UnityEngine.Color, matrix: UnityEngine.Matrix4x4);
    originalColor: UnityEngine.Color;
    originalMatrix: UnityEngine.Matrix4x4;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class Handles_CapFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
    BeginInvoke(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Handles_SizeFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(position: UnityEngine.Vector3): number;
    BeginInvoke(position: UnityEngine.Vector3, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): number;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class HandleUtility {
    constructor();
    static acceleration: number;
    static niceMouseDelta: number;
    static niceMouseDeltaZoom: number;
    static nearestControl: number;
    static handleMaterial: UnityEngine.Material;
    static DistancePointBezier(point: UnityEngine.Vector3, startPosition: UnityEngine.Vector3, endPosition: UnityEngine.Vector3, startTangent: UnityEngine.Vector3, endTangent: UnityEngine.Vector3): number;
    static CalcLineTranslation(src: UnityEngine.Vector2, dest: UnityEngine.Vector2, srcPosition: UnityEngine.Vector3, constraintDir: UnityEngine.Vector3): number;
    static PointOnLineParameter(point: UnityEngine.Vector3, linePoint: UnityEngine.Vector3, lineDirection: UnityEngine.Vector3): number;
    static ProjectPointLine(point: UnityEngine.Vector3, lineStart: UnityEngine.Vector3, lineEnd: UnityEngine.Vector3): UnityEngine.Vector3;
    static DistancePointLine(point: UnityEngine.Vector3, lineStart: UnityEngine.Vector3, lineEnd: UnityEngine.Vector3): number;
    static DistanceToLine(p1: UnityEngine.Vector3, p2: UnityEngine.Vector3): number;
    static DistanceToCircle(position: UnityEngine.Vector3, radius: number): number;
    static DistanceToCircle(projection: UnityEditor.CameraProjectionCache, position: UnityEngine.Vector3, radius: number): number;
    static DistanceToCone(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): number;
    static DistanceToCube(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): number;
    static DistanceToRectangle(position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number): number;
    static DistancePointToLine(p: UnityEngine.Vector2, a: UnityEngine.Vector2, b: UnityEngine.Vector2): number;
    static DistancePointToLineSegment(p: UnityEngine.Vector2, a: UnityEngine.Vector2, b: UnityEngine.Vector2): number;
    static DistanceToDisc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, radius: number): number;
    static ClosestPointToDisc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, radius: number): UnityEngine.Vector3;
    static DistanceToArc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, from: UnityEngine.Vector3, angle: number, radius: number): number;
    static ClosestPointToArc(center: UnityEngine.Vector3, normal: UnityEngine.Vector3, from: UnityEngine.Vector3, angle: number, radius: number): UnityEngine.Vector3;
    static DistanceToPolyLine(...points: UnityEngine.Vector3[]): number;
    static ClosestPointToPolyLine(...vertices: UnityEngine.Vector3[]): UnityEngine.Vector3;
    static AddControl(controlId: number, distance: number): void;
    static AddDefaultControl(controlId: number): void;
    static GetHandleSize(position: UnityEngine.Vector3): number;
    static WorldToGUIPoint(world: UnityEngine.Vector3): UnityEngine.Vector2;
    static WorldToGUIPointWithDepth(world: UnityEngine.Vector3): UnityEngine.Vector3;
    static WorldToGUIPointWithDepth(camera: UnityEngine.Camera, world: UnityEngine.Vector3): UnityEngine.Vector3;
    static GUIPointToScreenPixelCoordinate(guiPoint: UnityEngine.Vector2): UnityEngine.Vector2;
    static GUIPointToWorldRay(position: UnityEngine.Vector2): UnityEngine.Ray;
    static WorldPointToSizedRect(position: UnityEngine.Vector3, content: UnityEngine.GUIContent, style: UnityEngine.GUIStyle): UnityEngine.Rect;
    static PickRectObjects(rect: UnityEngine.Rect): UnityEngine.GameObject[];
    static PickRectObjects(rect: UnityEngine.Rect, selectPrefabRootsOnly: boolean): UnityEngine.GameObject[];
    static PickGameObject(position: UnityEngine.Vector2, selectPrefabRoot: boolean): UnityEngine.GameObject;
    static PickGameObject(position: UnityEngine.Vector2, selectPrefabRoot: boolean, ignore: UnityEngine.GameObject[]): UnityEngine.GameObject;
    static PickGameObject(position: UnityEngine.Vector2, selectPrefabRoot: boolean, ignore: UnityEngine.GameObject[], filter: UnityEngine.GameObject[]): UnityEngine.GameObject;
    static PushCamera(camera: UnityEngine.Camera): void;
    static PopCamera(camera: UnityEngine.Camera): void;
    static RaySnap(ray: UnityEngine.Ray): any;
    static Repaint(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class HandleUtility_PickGameObjectCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class HandleUtility_PlaceObjectDelegate {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Help {
    constructor();
    static HasHelpForObject(obj: UnityEngine.Object): boolean;
    static GetHelpURLForObject(obj: UnityEngine.Object): string;
    static ShowHelpForObject(obj: UnityEngine.Object): void;
    static ShowHelpPage(page: string): void;
    static BrowseURL(url: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class HierarchyProperty {
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
    SetCustomScenes(sceneHandles: number[]): void;
    SetSubScenes(subScenes: UnityEditor.SceneManagement.SceneHierarchyHooks_SubSceneInfo[]): void;
    Reset(): void;
    GetScene(): UnityEngine.SceneManagement.Scene;
    IsExpanded(expanded: number[]): boolean;
    Next(expanded: number[]): boolean;
    NextWithDepthCheck(expanded: number[], minDepth: number): boolean;
    Previous(expanded: number[]): boolean;
    Parent(): boolean;
    Find(instanceID: number, expanded: number[]): boolean;
    Skip(count: number, expanded: number[]): boolean;
    CountRemaining(expanded: number[]): number;
    GetInstanceIDIfImported(): number;
    SetSearchFilter(searchString: string, mode: number): void;
    FindAllAncestors(instanceIDs: number[]): number[];
    static ClearSceneObjectsFilter(): void;
    static FilterSingleSceneObject(instanceID: number, otherVisibilityState: boolean): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class HyperLinkClickedEventArgs {
    hyperLinkData: Record<string, string>;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export interface IHasCustomMenu {
    AddItemsToMenu(menu: UnityEditor.GenericMenu): void;
  }
  export class LODUtility {
    constructor();
    static CalculateLODGroupBoundingBox(group: UnityEngine.LODGroup): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MaterialProperty {
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
    intValue: number;
    textureValue: UnityEngine.Texture;
    textureScaleAndOffset: UnityEngine.Vector4;
    ReadFromMaterialPropertyBlock(block: UnityEngine.MaterialPropertyBlock): void;
    WriteToMaterialPropertyBlock(materialblock: UnityEngine.MaterialPropertyBlock, changedPropertyMask: number): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MaterialProperty_ApplyPropertyCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(prop: UnityEditor.MaterialProperty, changeMask: number, previousValue: any): boolean;
    BeginInvoke(prop: UnityEditor.MaterialProperty, changeMask: number, previousValue: any, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): boolean;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum MaterialProperty_PropType {
    Color = 0,
    Vector = 1,
    Float = 2,
    Range = 3,
    Texture = 4,
    Int = 5,
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
  export class Menu {
    constructor();
    static SetChecked(menuPath: string, isChecked: boolean): void;
    static GetChecked(menuPath: string): boolean;
    static GetEnabled(menuPath: string): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MenuCommand {
    constructor(inContext: UnityEngine.Object, inUserData: number);
    constructor(inContext: UnityEngine.Object);
    context: UnityEngine.Object;
    userData: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MeshUtility {
    constructor();
    static Optimize(mesh: UnityEngine.Mesh): void;
    static SetMeshCompression(mesh: UnityEngine.Mesh, compression: UnityEditor.ModelImporterMeshCompression): void;
    static GetMeshCompression(mesh: UnityEngine.Mesh): UnityEditor.ModelImporterMeshCompression;
    static SetPerTriangleUV2(src: UnityEngine.Mesh, triUV: UnityEngine.Vector2[]): void;
    static AcquireReadOnlyMeshData(mesh: UnityEngine.Mesh): UnityEngine.Mesh_MeshDataArray;
    static AcquireReadOnlyMeshData(meshes: UnityEngine.Mesh[]): UnityEngine.Mesh_MeshDataArray;
    static AcquireReadOnlyMeshData(meshes: UnityEngine.Mesh[]): UnityEngine.Mesh_MeshDataArray;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MonoScript {
    constructor();
    bytes: System.Byte[];
    text: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetClass(): System.Type;
    static FromMonoBehaviour(behaviour: UnityEngine.MonoBehaviour): UnityEditor.MonoScript;
    static FromScriptableObject(scriptableObject: UnityEngine.ScriptableObject): UnityEditor.MonoScript;
    ToString(): string;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    GetType(): System.Type;
  }
  export class ObjectFactory {
    static CreateInstance(type: System.Type): UnityEngine.Object;
    static AddComponent(gameObject: UnityEngine.GameObject, type: System.Type): UnityEngine.Component;
    static CreateGameObject(scene: UnityEngine.SceneManagement.Scene, hideFlags: UnityEngine.HideFlags, name: string, ...types: System.Type[]): UnityEngine.GameObject;
    static CreateGameObject(name: string, ...types: System.Type[]): UnityEngine.GameObject;
    static CreatePrimitive(type: UnityEngine.PrimitiveType): UnityEngine.GameObject;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ObjectNames {
    constructor();
    static NicifyVariableName(name: string): string;
    static GetClassName(obj: UnityEngine.Object): string;
    static GetDragAndDropTitle(obj: UnityEngine.Object): string;
    static SetNameSmart(obj: UnityEngine.Object, name: string): void;
    static GetUniqueName(existingNames: string[], name: string): string;
    static GetInspectorTitle(obj: UnityEngine.Object): string;
    static MangleVariableName(name: string): string;
    static GetPropertyEditorTitle(obj: UnityEngine.Object): string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PackageInfo {
    packagePath: string;
    jsonInfo: string;
    iconURL: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
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
  export class PlayerSettings {
    static companyName: string;
    static productName: string;
    static showUnitySplashScreen: boolean;
    static splashScreenStyle: UnityEditor.SplashScreenStyle;
    static cloudProjectId: string;
    static productGUID: System.Guid;
    static colorSpace: UnityEngine.ColorSpace;
    static defaultScreenWidth: number;
    static defaultScreenHeight: number;
    static defaultWebScreenWidth: number;
    static defaultWebScreenHeight: number;
    static displayResolutionDialog: UnityEditor.ResolutionDialogSetting;
    static defaultIsFullScreen: boolean;
    static defaultIsNativeResolution: boolean;
    static macRetinaSupport: boolean;
    static runInBackground: boolean;
    static captureSingleScreen: boolean;
    static usePlayerLog: boolean;
    static resizableWindow: boolean;
    static bakeCollisionMeshes: boolean;
    static useMacAppStoreValidation: boolean;
    static macFullscreenMode: UnityEditor.MacFullscreenMode;
    static d3d9FullscreenMode: UnityEditor.D3D9FullscreenMode;
    static d3d11FullscreenMode: UnityEditor.D3D11FullscreenMode;
    static fullScreenMode: UnityEngine.FullScreenMode;
    static virtualRealitySupported: boolean;
    static enable360StereoCapture: boolean;
    static singlePassStereoRendering: boolean;
    static stereoRenderingPath: UnityEditor.StereoRenderingPath;
    static protectGraphicsMemory: boolean;
    static enableFrameTimingStats: boolean;
    static useHDRDisplay: boolean;
    static D3DHDRBitDepth: UnityEngine.D3DHDRDisplayBitDepth;
    static visibleInBackground: boolean;
    static allowFullscreenSwitch: boolean;
    static forceSingleInstance: boolean;
    static useFlipModelSwapchain: boolean;
    static openGLRequireES31: boolean;
    static openGLRequireES31AEP: boolean;
    static openGLRequireES32: boolean;
    static resolutionDialogBanner: UnityEngine.Texture2D;
    static virtualRealitySplashScreen: UnityEngine.Texture2D;
    static iPhoneBundleIdentifier: string;
    static assemblyVersionValidation: boolean;
    static scriptingRuntimeVersion: UnityEditor.ScriptingRuntimeVersion;
    static suppressCommonWarnings: boolean;
    static allowUnsafeCode: boolean;
    static useReferenceAssemblies: boolean;
    static gcIncremental: boolean;
    static keystorePass: string;
    static keyaliasPass: string;
    static xboxTitleId: string;
    static xboxImageXexFilePath: string;
    static xboxSpaFilePath: string;
    static xboxGenerateSpa: boolean;
    static xboxEnableGuest: boolean;
    static xboxDeployKinectResources: boolean;
    static xboxDeployKinectHeadOrientation: boolean;
    static xboxDeployKinectHeadPosition: boolean;
    static xboxSplashScreen: UnityEngine.Texture2D;
    static xboxAdditionalTitleMemorySize: number;
    static xboxEnableKinect: boolean;
    static xboxEnableKinectAutoTracking: boolean;
    static xboxEnableSpeech: boolean;
    static xboxSpeechDB: System.UInt32;
    static gpuSkinning: boolean;
    static graphicsJobs: boolean;
    static graphicsJobMode: UnityEditor.GraphicsJobMode;
    static xboxPIXTextureCapture: boolean;
    static xboxEnableAvatar: boolean;
    static xboxOneResolution: number;
    static enableInternalProfiler: boolean;
    static actionOnDotNetUnhandledException: UnityEditor.ActionOnDotNetUnhandledException;
    static logObjCUncaughtExceptions: boolean;
    static enableCrashReportAPI: boolean;
    static applicationIdentifier: string;
    static bundleVersion: string;
    static statusBarHidden: boolean;
    static strippingLevel: UnityEditor.StrippingLevel;
    static stripEngineCode: boolean;
    static defaultInterfaceOrientation: UnityEditor.UIOrientation;
    static allowedAutorotateToPortrait: boolean;
    static allowedAutorotateToPortraitUpsideDown: boolean;
    static allowedAutorotateToLandscapeRight: boolean;
    static allowedAutorotateToLandscapeLeft: boolean;
    static useAnimatedAutorotation: boolean;
    static use32BitDisplayBuffer: boolean;
    static preserveFramebufferAlpha: boolean;
    static apiCompatibilityLevel: UnityEditor.ApiCompatibilityLevel;
    static stripUnusedMeshComponents: boolean;
    static mipStripping: boolean;
    static advancedLicense: boolean;
    static aotOptions: string;
    static defaultCursor: UnityEngine.Texture2D;
    static cursorHotspot: UnityEngine.Vector2;
    static accelerometerFrequency: number;
    static MTRendering: boolean;
    static useDirect3D11: boolean;
    static stereoscopic3D: boolean;
    static muteOtherAudioSources: boolean;
    static legacyClampBlendShapeWeights: boolean;
    static uploadClearedTextureDataAfterCreationFromScript: boolean;
    static enableMetalAPIValidation: boolean;
    static alwaysDisplayWatermark: boolean;
    static firstStreamedLevelWithResources: number;
    static targetGlesGraphics: UnityEditor.TargetGlesGraphics;
    static targetIOSGraphics: UnityEditor.TargetIOSGraphics;
    static locationUsageDescription: string;
    static renderingPath: UnityEngine.RenderingPath;
    static mobileRenderingPath: UnityEngine.RenderingPath;
    static bundleIdentifier: string;
    static vulkanEnableSetSRGBWrite: boolean;
    static vulkanNumSwapchainBuffers: System.UInt32;
    static vulkanEnableLateAcquireNextImage: boolean;
    static vulkanUseSWCommandBuffers: boolean;
    static vulkanEnablePreTransform: boolean;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static SetPropertyInt(name: string, value: number, target: UnityEditor.BuildTargetGroup): void;
    static SetPropertyInt(name: string, value: number): void;
    static SetPropertyInt(name: string, value: number, target: UnityEditor.BuildTarget): void;
    static GetPropertyInt(name: string, target: UnityEditor.BuildTargetGroup): number;
    static GetPropertyInt(name: string): number;
    static SetPropertyBool(name: string, value: boolean, target: UnityEditor.BuildTargetGroup): void;
    static SetPropertyBool(name: string, value: boolean): void;
    static SetPropertyBool(name: string, value: boolean, target: UnityEditor.BuildTarget): void;
    static GetPropertyBool(name: string, target: UnityEditor.BuildTargetGroup): boolean;
    static GetPropertyBool(name: string): boolean;
    static SetPropertyString(name: string, value: string, target: UnityEditor.BuildTargetGroup): void;
    static SetPropertyString(name: string, value: string): void;
    static SetPropertyString(name: string, value: string, target: UnityEditor.BuildTarget): void;
    static GetPropertyString(name: string, target: UnityEditor.BuildTargetGroup): string;
    static GetPropertyString(name: string): string;
    static HasAspectRatio(aspectRatio: UnityEditor.AspectRatio): boolean;
    static SetAspectRatio(aspectRatio: UnityEditor.AspectRatio, enable: boolean): void;
    static GetPreloadedAssets(): UnityEngine.Object[];
    static SetPreloadedAssets(assets: UnityEngine.Object[]): void;
    static GetGraphicsAPIs(platform: UnityEditor.BuildTarget): UnityEngine.Rendering.GraphicsDeviceType[];
    static SetGraphicsAPIs(platform: UnityEditor.BuildTarget, apis: UnityEngine.Rendering.GraphicsDeviceType[]): void;
    static GetUseDefaultGraphicsAPIs(platform: UnityEditor.BuildTarget): boolean;
    static SetUseDefaultGraphicsAPIs(platform: UnityEditor.BuildTarget, automatic: boolean): void;
    static SetTemplateCustomValue(name: string, value: string): void;
    static GetTemplateCustomValue(name: string): string;
    static GetScriptingDefineSymbolsForGroup(targetGroup: UnityEditor.BuildTargetGroup): string;
    static SetScriptingDefineSymbolsForGroup(targetGroup: UnityEditor.BuildTargetGroup, defines: string): void;
    static SetScriptingDefineSymbolsForGroup(targetGroup: UnityEditor.BuildTargetGroup, defines: string[]): void;
    static GetAdditionalCompilerArgumentsForGroup(targetGroup: UnityEditor.BuildTargetGroup): string[];
    static SetAdditionalCompilerArgumentsForGroup(targetGroup: UnityEditor.BuildTargetGroup, additionalCompilerArguments: string[]): void;
    static GetArchitecture(targetGroup: UnityEditor.BuildTargetGroup): number;
    static SetArchitecture(targetGroup: UnityEditor.BuildTargetGroup, architecture: number): void;
    static GetScriptingBackend(targetGroup: UnityEditor.BuildTargetGroup): UnityEditor.ScriptingImplementation;
    static SetScriptingBackend(targetGroup: UnityEditor.BuildTargetGroup, backend: UnityEditor.ScriptingImplementation): void;
    static GetDefaultScriptingBackend(targetGroup: UnityEditor.BuildTargetGroup): UnityEditor.ScriptingImplementation;
    static GetApplicationIdentifier(targetGroup: UnityEditor.BuildTargetGroup): string;
    static SetApplicationIdentifier(targetGroup: UnityEditor.BuildTargetGroup, identifier: string): void;
    static GetIl2CppCompilerConfiguration(targetGroup: UnityEditor.BuildTargetGroup): UnityEditor.Il2CppCompilerConfiguration;
    static SetIl2CppCompilerConfiguration(targetGroup: UnityEditor.BuildTargetGroup, configuration: UnityEditor.Il2CppCompilerConfiguration): void;
    static GetIncrementalIl2CppBuild(targetGroup: UnityEditor.BuildTargetGroup): boolean;
    static SetIncrementalIl2CppBuild(targetGroup: UnityEditor.BuildTargetGroup, enabled: boolean): void;
    static SetManagedStrippingLevel(targetGroup: UnityEditor.BuildTargetGroup, level: UnityEditor.ManagedStrippingLevel): void;
    static GetManagedStrippingLevel(targetGroup: UnityEditor.BuildTargetGroup): UnityEditor.ManagedStrippingLevel;
    static GetApiCompatibilityLevel(buildTargetGroup: UnityEditor.BuildTargetGroup): UnityEditor.ApiCompatibilityLevel;
    static SetApiCompatibilityLevel(buildTargetGroup: UnityEditor.BuildTargetGroup, value: UnityEditor.ApiCompatibilityLevel): void;
    static GetMobileMTRendering(targetGroup: UnityEditor.BuildTargetGroup): boolean;
    static SetMobileMTRendering(targetGroup: UnityEditor.BuildTargetGroup, enable: boolean): void;
    static GetNormalMapEncoding(platform: UnityEditor.BuildTargetGroup): UnityEditor.NormalMapEncoding;
    static SetNormalMapEncoding(platform: UnityEditor.BuildTargetGroup, encoding: UnityEditor.NormalMapEncoding): void;
    static GetScriptingDefineSymbols(buildTarget: UnityEditor.Build.NamedBuildTarget): string;
    static SetScriptingDefineSymbols(buildTarget: UnityEditor.Build.NamedBuildTarget, defines: string): void;
    static SetScriptingDefineSymbols(buildTarget: UnityEditor.Build.NamedBuildTarget, defines: string[]): void;
    static GetAdditionalCompilerArguments(buildTarget: UnityEditor.Build.NamedBuildTarget): string[];
    static SetAdditionalCompilerArguments(buildTarget: UnityEditor.Build.NamedBuildTarget, additionalCompilerArguments: string[]): void;
    static GetArchitecture(buildTarget: UnityEditor.Build.NamedBuildTarget): number;
    static SetArchitecture(buildTarget: UnityEditor.Build.NamedBuildTarget, architecture: number): void;
    static GetScriptingBackend(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.ScriptingImplementation;
    static SetScriptingBackend(buildTarget: UnityEditor.Build.NamedBuildTarget, backend: UnityEditor.ScriptingImplementation): void;
    static GetDefaultScriptingBackend(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.ScriptingImplementation;
    static SetApplicationIdentifier(buildTarget: UnityEditor.Build.NamedBuildTarget, identifier: string): void;
    static GetApplicationIdentifier(buildTarget: UnityEditor.Build.NamedBuildTarget): string;
    static GetIl2CppCompilerConfiguration(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.Il2CppCompilerConfiguration;
    static SetIl2CppCompilerConfiguration(buildTarget: UnityEditor.Build.NamedBuildTarget, configuration: UnityEditor.Il2CppCompilerConfiguration): void;
    static GetIncrementalIl2CppBuild(buildTarget: UnityEditor.Build.NamedBuildTarget): boolean;
    static SetIncrementalIl2CppBuild(buildTarget: UnityEditor.Build.NamedBuildTarget, enabled: boolean): void;
    static SetManagedStrippingLevel(buildTarget: UnityEditor.Build.NamedBuildTarget, level: UnityEditor.ManagedStrippingLevel): void;
    static GetManagedStrippingLevel(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.ManagedStrippingLevel;
    static GetApiCompatibilityLevel(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.ApiCompatibilityLevel;
    static SetApiCompatibilityLevel(buildTarget: UnityEditor.Build.NamedBuildTarget, value: UnityEditor.ApiCompatibilityLevel): void;
    static SetMobileMTRendering(buildTarget: UnityEditor.Build.NamedBuildTarget, enable: boolean): void;
    static GetMobileMTRendering(buildTarget: UnityEditor.Build.NamedBuildTarget): boolean;
    static GetNormalMapEncoding(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.NormalMapEncoding;
    static SetNormalMapEncoding(buildTarget: UnityEditor.Build.NamedBuildTarget, encoding: UnityEditor.NormalMapEncoding): void;
    static GetAdditionalIl2CppArgs(): string;
    static SetAdditionalIl2CppArgs(additionalArgs: string): void;
    static GetWsaHolographicRemotingEnabled(): boolean;
    static SetWsaHolographicRemotingEnabled(enabled: boolean): void;
    static GetStackTraceLogType(logType: UnityEngine.LogType): UnityEngine.StackTraceLogType;
    static SetStackTraceLogType(logType: UnityEngine.LogType, stackTraceType: UnityEngine.StackTraceLogType): void;
    static GetVirtualTexturingSupportEnabled(): boolean;
    static SetVirtualTexturingSupportEnabled(enabled: boolean): void;
    static GetShaderPrecisionModel(): UnityEditor.ShaderPrecisionModel;
    static SetShaderPrecisionModel(model: UnityEditor.ShaderPrecisionModel): void;
    static GetPlatformIcons(platform: UnityEditor.BuildTargetGroup, kind: UnityEditor.PlatformIconKind): UnityEditor.PlatformIcon[];
    static GetPlatformIcons(buildTarget: UnityEditor.Build.NamedBuildTarget, kind: UnityEditor.PlatformIconKind): UnityEditor.PlatformIcon[];
    static SetPlatformIcons(platform: UnityEditor.BuildTargetGroup, kind: UnityEditor.PlatformIconKind, icons: UnityEditor.PlatformIcon[]): void;
    static SetPlatformIcons(buildTarget: UnityEditor.Build.NamedBuildTarget, kind: UnityEditor.PlatformIconKind, icons: UnityEditor.PlatformIcon[]): void;
    static GetSupportedIconKindsForPlatform(platform: UnityEditor.BuildTargetGroup): UnityEditor.PlatformIconKind[];
    static GetSupportedIconKinds(buildTarget: UnityEditor.Build.NamedBuildTarget): UnityEditor.PlatformIconKind[];
    static SetIconsForTargetGroup(platform: UnityEditor.BuildTargetGroup, icons: UnityEngine.Texture2D[], kind: UnityEditor.IconKind): void;
    static SetIcons(buildTarget: UnityEditor.Build.NamedBuildTarget, icons: UnityEngine.Texture2D[], kind: UnityEditor.IconKind): void;
    static SetIconsForTargetGroup(platform: UnityEditor.BuildTargetGroup, icons: UnityEngine.Texture2D[]): void;
    static GetIconsForTargetGroup(platform: UnityEditor.BuildTargetGroup, kind: UnityEditor.IconKind): UnityEngine.Texture2D[];
    static GetIcons(buildTarget: UnityEditor.Build.NamedBuildTarget, kind: UnityEditor.IconKind): UnityEngine.Texture2D[];
    static GetIconsForTargetGroup(platform: UnityEditor.BuildTargetGroup): UnityEngine.Texture2D[];
    static GetIconSizesForTargetGroup(platform: UnityEditor.BuildTargetGroup, kind: UnityEditor.IconKind): number[];
    static GetIconSizes(buildTarget: UnityEditor.Build.NamedBuildTarget, kind: UnityEditor.IconKind): number[];
    static GetIconSizesForTargetGroup(platform: UnityEditor.BuildTargetGroup): number[];
    static GetVirtualRealitySupported(targetGroup: UnityEditor.BuildTargetGroup): boolean;
    static SetVirtualRealitySupported(targetGroup: UnityEditor.BuildTargetGroup, value: boolean): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PlayerSettings_Android {
    constructor();
    static targetDevice: UnityEditor.AndroidTargetDevice;
    static disableDepthAndStencilBuffers: boolean;
    static use24BitDepthBuffer: boolean;
    static defaultWindowWidth: number;
    static defaultWindowHeight: number;
    static minimumWindowWidth: number;
    static minimumWindowHeight: number;
    static resizableWindow: boolean;
    static fullscreenMode: UnityEngine.FullScreenMode;
    static bundleVersionCode: number;
    static minSdkVersion: UnityEditor.AndroidSdkVersions;
    static targetSdkVersion: UnityEditor.AndroidSdkVersions;
    static preferredInstallLocation: UnityEditor.AndroidPreferredInstallLocation;
    static forceInternetPermission: boolean;
    static forceSDCardPermission: boolean;
    static androidTVCompatibility: boolean;
    static androidIsGame: boolean;
    static ARCoreEnabled: boolean;
    static chromeosInputEmulation: boolean;
    static targetArchitectures: UnityEditor.AndroidArchitecture;
    static buildApkPerCpuArchitecture: boolean;
    static androidTargetDevices: UnityEditor.AndroidTargetDevices;
    static splashScreenScale: UnityEditor.AndroidSplashScreenScale;
    static useCustomKeystore: boolean;
    static keystoreName: string;
    static keystorePass: string;
    static keyaliasName: string;
    static keyaliasPass: string;
    static licenseVerification: boolean;
    static useAPKExpansionFiles: boolean;
    static showActivityIndicatorOnLoading: UnityEditor.AndroidShowActivityIndicatorOnLoading;
    static blitType: UnityEditor.AndroidBlitType;
    static maxAspectRatio: number;
    static startInFullscreen: boolean;
    static renderOutsideSafeArea: boolean;
    static minifyWithR8: boolean;
    static minifyRelease: boolean;
    static minifyDebug: boolean;
    static optimizedFramePacing: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_iOS {
    constructor();
    static exitOnSuspend: boolean;
    static targetResolution: UnityEditor.iOSTargetResolution;
    static overrideIPodMusic: boolean;
    static applicationDisplayName: string;
    static buildNumber: string;
    static disableDepthAndStencilBuffers: boolean;
    static scriptCallOptimization: UnityEditor.ScriptCallOptimizationLevel;
    static sdkVersion: UnityEditor.iOSSdkVersion;
    static targetOSVersion: UnityEditor.iOSTargetOSVersion;
    static targetOSVersionString: string;
    static targetDevice: UnityEditor.iOSTargetDevice;
    static prerenderedIcon: boolean;
    static requiresPersistentWiFi: boolean;
    static requiresFullScreen: boolean;
    static statusBarStyle: UnityEditor.iOSStatusBarStyle;
    static deferSystemGesturesMode: UnityEngine.iOS.SystemGestureDeferMode;
    static hideHomeButton: boolean;
    static appInBackgroundBehavior: UnityEditor.iOSAppInBackgroundBehavior;
    static backgroundModes: UnityEditor.iOSBackgroundMode;
    static forceHardShadowsOnMetal: boolean;
    static allowHTTPDownload: boolean;
    static appleDeveloperTeamID: string;
    static iOSManualProvisioningProfileID: string;
    static tvOSManualProvisioningProfileID: string;
    static tvOSManualProvisioningProfileType: UnityEditor.ProvisioningProfileType;
    static iOSManualProvisioningProfileType: UnityEditor.ProvisioningProfileType;
    static appleEnableAutomaticSigning: boolean;
    static cameraUsageDescription: string;
    static locationUsageDescription: string;
    static microphoneUsageDescription: string;
    static showActivityIndicatorOnLoading: UnityEditor.iOSShowActivityIndicatorOnLoading;
    static useOnDemandResources: boolean;
    static iOSUrlSchemes: string[];
    static SetLaunchScreenImage(image: UnityEngine.Texture2D, type: UnityEditor.iOSLaunchScreenImageType): void;
    static SetiPhoneLaunchScreenType(type: UnityEditor.iOSLaunchScreenType): void;
    static SetiPadLaunchScreenType(type: UnityEditor.iOSLaunchScreenType): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_EmbeddedLinux {
    constructor();
    static playerDataPath: string;
    static forceSRGBBlit: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_Facebook {
    constructor();
    static sdkVersion: string;
    static appId: string;
    static useCookies: boolean;
    static useStatus: boolean;
    static useFrictionlessRequests: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_Lumin {
    constructor();
    static iconModelFolderPath: string;
    static iconPortalFolderPath: string;
    static certificatePath: string;
    static signPackage: boolean;
    static isChannelApp: boolean;
    static versionCode: number;
    static versionName: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_macOS {
    constructor();
    static buildNumber: string;
    static applicationCategoryType: string;
    static cameraUsageDescription: string;
    static microphoneUsageDescription: string;
    static bluetoothUsageDescription: string;
    static urlSchemes: string[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_PS4 {
    constructor();
    static npTrophyPackPath: string;
    static npAgeRating: number;
    static npTitleSecret: string;
    static parentalLevel: number;
    static applicationParameter1: number;
    static applicationParameter2: number;
    static applicationParameter3: number;
    static applicationParameter4: number;
    static passcode: string;
    static monoEnv: string;
    static playerPrefsSupport: boolean;
    static restrictedAudioUsageRights: boolean;
    static useResolutionFallback: boolean;
    static contentID: string;
    static category: UnityEditor.PlayerSettings_PS4_PS4AppCategory;
    static appType: number;
    static masterVersion: string;
    static appVersion: string;
    static remotePlayKeyAssignment: UnityEditor.PlayerSettings_PS4_PS4RemotePlayKeyAssignment;
    static remotePlayKeyMappingDir: string;
    static playTogetherPlayerCount: number;
    static enterButtonAssignment: UnityEditor.PlayerSettings_PS4_PS4EnterButtonAssignment;
    static paramSfxPath: string;
    static videoOutPixelFormat: number;
    static videoOutInitialWidth: number;
    static videoOutResolution: number;
    static SdkOverride: string;
    static videoOutBaseModeInitialWidth: number;
    static videoOutReprojectionRate: number;
    static PronunciationXMLPath: string;
    static PronunciationSIGPath: string;
    static BackgroundImagePath: string;
    static StartupImagePath: string;
    static startupImagesFolder: string;
    static iconImagesFolder: string;
    static SaveDataImagePath: string;
    static BGMPath: string;
    static ShareFilePath: string;
    static ShareOverlayImagePath: string;
    static PrivacyGuardImagePath: string;
    static ExtraSceSysFile: string;
    static patchDayOne: boolean;
    static PatchPkgPath: string;
    static PatchLatestPkgPath: string;
    static PatchChangeinfoPath: string;
    static NPtitleDatPath: string;
    static pnSessions: boolean;
    static pnPresence: boolean;
    static pnFriends: boolean;
    static pnGameCustomData: boolean;
    static downloadDataSize: number;
    static garlicHeapSize: number;
    static proGarlicHeapSize: number;
    static reprojectionSupport: boolean;
    static useAudio3dBackend: boolean;
    static audio3dVirtualSpeakerCount: number;
    static scriptOptimizationLevel: number;
    static useLowGarlicFragmentationMode: boolean;
    static socialScreenEnabled: number;
    static attribUserManagement: boolean;
    static attribMoveSupport: boolean;
    static attrib3DSupport: boolean;
    static attribShareSupport: boolean;
    static attribExclusiveVR: boolean;
    static disableAutoHideSplash: boolean;
    static attribCpuUsage: number;
    static videoRecordingFeaturesUsed: boolean;
    static contentSearchFeaturesUsed: boolean;
    static attribEyeToEyeDistanceSettingVR: UnityEditor.PlayerSettings_PS4_PlayStationVREyeToEyeDistanceSettings;
    static includedModules: string[];
    static enableApplicationExit: boolean;
    static resetTempFolder: boolean;
    static playerPrefsMaxSize: number;
    static attribVROutputEnabled: boolean;
    static compatibilityPS5: boolean;
    static gpu800MHz: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class PlayerSettings_SplashScreenLogo {
    logo: UnityEngine.Sprite;
    static unityLogo: UnityEngine.Sprite;
    duration: number;
    static Create(duration: number): UnityEditor.PlayerSettings_SplashScreenLogo;
    static Create(): UnityEditor.PlayerSettings_SplashScreenLogo;
    static Create(duration: number, logo: UnityEngine.Sprite): UnityEditor.PlayerSettings_SplashScreenLogo;
    static CreateWithUnityLogo(): UnityEditor.PlayerSettings_SplashScreenLogo;
    static CreateWithUnityLogo(duration: number): UnityEditor.PlayerSettings_SplashScreenLogo;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PlayerSettings_SplashScreen {
    constructor();
    static animationMode: UnityEditor.PlayerSettings_SplashScreen_AnimationMode;
    static animationBackgroundZoom: number;
    static animationLogoZoom: number;
    static background: UnityEngine.Sprite;
    static backgroundPortrait: UnityEngine.Sprite;
    static blurBackgroundImage: boolean;
    static backgroundColor: UnityEngine.Color;
    static drawMode: UnityEditor.PlayerSettings_SplashScreen_DrawMode;
    static logos: UnityEditor.PlayerSettings_SplashScreenLogo[];
    static overlayOpacity: number;
    static show: boolean;
    static showUnityLogo: boolean;
    static unityLogoStyle: UnityEditor.PlayerSettings_SplashScreen_UnityLogoStyle;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class PlayerSettings_Switch {
    constructor();
    static socketMemoryPoolSize: number;
    static socketAllocatorPoolSize: number;
    static socketConcurrencyLimit: number;
    static useSwitchCPUProfiler: boolean;
    static switchLTOSetting: number;
    static useSwitchGOLDLinker: boolean;
    static systemResourceMemory: number;
    static queueCommandMemory: number;
    static defaultSwitchQueueCommandMemory: number;
    static minimumSwitchQueueCommandMemory: number;
    static queueControlMemory: number;
    static defaultSwitchQueueControlMemory: number;
    static minimumSwitchQueueControlMemory: number;
    static queueComputeMemory: number;
    static defaultSwitchQueueComputeMemory: number;
    static NVNShaderPoolsGranularity: number;
    static NVNDefaultPoolsGranularity: number;
    static NVNOtherPoolsGranularity: number;
    static NVNMaxPublicTextureIDCount: number;
    static NVNMaxPublicSamplerIDCount: number;
    static screenResolutionBehavior: UnityEditor.PlayerSettings_Switch_ScreenResolutionBehavior;
    static NMETAOverride: string;
    static NMETAOverrideFullPath: string;
    static applicationID: string;
    static nsoDependencies: string;
    static titleNames: string[];
    static publisherNames: string[];
    static icons: UnityEngine.Texture2D[];
    static smallIcons: UnityEngine.Texture2D[];
    static manualHTMLPath: string;
    static accessibleURLPath: string;
    static legalInformationPath: string;
    static mainThreadStackSize: number;
    static presenceGroupId: string;
    static logoHandling: UnityEditor.PlayerSettings_Switch_LogoHandling;
    static releaseVersion: string;
    static displayVersion: string;
    static startupUserAccount: UnityEditor.PlayerSettings_Switch_StartupUserAccount;
    static touchScreenUsage: UnityEditor.PlayerSettings_Switch_TouchScreenUsage;
    static supportedLanguages: number;
    static logoType: UnityEditor.PlayerSettings_Switch_LogoType;
    static applicationErrorCodeCategory: string;
    static userAccountSaveDataSize: number;
    static userAccountSaveDataJournalSize: number;
    static applicationAttribute: UnityEditor.PlayerSettings_Switch_ApplicationAttribute;
    static cardSpecSize: number;
    static cardSpecClock: number;
    static ratingsMask: number;
    static localCommunicationIds: string[];
    static isUnderParentalControl: boolean;
    static isScreenshotEnabled: boolean;
    static isAllowsScreenshot: boolean;
    static isVideoCapturingEnabled: boolean;
    static isRuntimeAddOnContentInstallEnabled: boolean;
    static isDataLossConfirmationEnabled: boolean;
    static isUserAccountLockEnabled: boolean;
    static isDataLossConfirmation: boolean;
    static supportedNpadStyles: UnityEditor.PlayerSettings_Switch_SupportedNpadStyle;
    static ratingAgeArray: number[];
    static nativeFsCacheSize: number;
    static isHoldTypeHorizontal: boolean;
    static supportedNpadCount: number;
    static socketConfigEnabled: boolean;
    static tcpInitialSendBufferSize: number;
    static tcpInitialReceiveBufferSize: number;
    static tcpAutoSendBufferSizeMax: number;
    static tcpAutoReceiveBufferSizeMax: number;
    static udpSendBufferSize: number;
    static udpReceiveBufferSize: number;
    static socketBufferEfficiency: number;
    static socketInitializeEnabled: boolean;
    static networkInterfaceManagerInitializeEnabled: boolean;
    static playerConnectionEnabled: boolean;
    static useNewStyleFilepaths: boolean;
    static switchUseMicroSleepForYield: boolean;
    static switchMicroSleepForYieldTime: number;
    static GetRatingAge(category: UnityEditor.PlayerSettings_Switch_RatingCategories): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
    BrazilianPortuguese = 15,
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
  export class PlayerSettings_tvOS {
    constructor();
    static sdkVersion: UnityEditor.tvOSSdkVersion;
    static buildNumber: string;
    static targetOSVersion: UnityEditor.tvOSTargetOSVersion;
    static targetOSVersionString: string;
    static requireExtendedGameController: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_WebGL {
    constructor();
    static memorySize: number;
    static exceptionSupport: UnityEditor.WebGLExceptionSupport;
    static dataCaching: boolean;
    static emscriptenArgs: string;
    static modulesDirectory: string;
    static template: string;
    static analyzeBuildSize: boolean;
    static useEmbeddedResources: boolean;
    static useWasm: boolean;
    static threadsSupport: boolean;
    static linkerTarget: UnityEditor.WebGLLinkerTarget;
    static compressionFormat: UnityEditor.WebGLCompressionFormat;
    static nameFilesAsHashes: boolean;
    static debugSymbolMode: UnityEditor.WebGLDebugSymbolMode;
    static debugSymbols: boolean;
    static wasmStreaming: boolean;
    static decompressionFallback: boolean;
    static wasmArithmeticExceptions: UnityEditor.WebGLWasmArithmeticExceptions;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class PlayerSettings_WSASupportedFileType {
    contentType: string;
    fileType: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PlayerSettings_WSAFileTypeAssociations {
    name: string;
    supportedFileTypes: UnityEditor.PlayerSettings_WSASupportedFileType[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PlayerSettings_WSA {
    constructor();
    static transparentSwapchain: boolean;
    static packageName: string;
    static packageLogo: string;
    static commandLineArgsFile: string;
    static certificatePath: string;
    static certificateSubject: string;
    static certificateIssuer: string;
    static applicationDescription: string;
    static tileShortName: string;
    static tileShowName: UnityEditor.PlayerSettings_WSAApplicationShowName;
    static mediumTileShowName: boolean;
    static largeTileShowName: boolean;
    static wideTileShowName: boolean;
    static defaultTileSize: UnityEditor.PlayerSettings_WSADefaultTileSize;
    static tileForegroundText: UnityEditor.PlayerSettings_WSAApplicationForegroundText;
    static tileBackgroundColor: UnityEngine.Color;
    static enableIndependentInputSource: boolean;
    static inputSource: UnityEditor.PlayerSettings_WSAInputSource;
    static supportStreamingInstall: boolean;
    static lastRequiredScene: number;
    static packageVersion: System.Version;
    static certificateNotAfter?: any; // System.Nullable`1[System.DateTime]
    static splashScreenBackgroundColor?: any; // System.Nullable`1[UnityEngine.Color]
    static storeTileLogo80: string;
    static storeTileLogo: string;
    static storeTileLogo140: string;
    static storeTileLogo180: string;
    static storeTileWideLogo80: string;
    static storeTileWideLogo: string;
    static storeTileWideLogo140: string;
    static storeTileWideLogo180: string;
    static storeTileSmallLogo80: string;
    static storeTileSmallLogo: string;
    static storeTileSmallLogo140: string;
    static storeTileSmallLogo180: string;
    static storeSmallTile80: string;
    static storeSmallTile: string;
    static storeSmallTile140: string;
    static storeSmallTile180: string;
    static storeLargeTile80: string;
    static storeLargeTile: string;
    static storeLargeTile140: string;
    static storeLargeTile180: string;
    static storeSplashScreenImage: string;
    static storeSplashScreenImageScale140: string;
    static storeSplashScreenImageScale180: string;
    static phoneAppIcon: string;
    static phoneAppIcon140: string;
    static phoneAppIcon240: string;
    static phoneSmallTile: string;
    static phoneSmallTile140: string;
    static phoneSmallTile240: string;
    static phoneMediumTile: string;
    static phoneMediumTile140: string;
    static phoneMediumTile240: string;
    static phoneWideTile: string;
    static phoneWideTile140: string;
    static phoneWideTile240: string;
    static phoneSplashScreenImage: string;
    static phoneSplashScreenImageScale140: string;
    static phoneSplashScreenImageScale240: string;
    static packageLogo140: string;
    static packageLogo180: string;
    static packageLogo240: string;
    static enableLowLatencyPresentationAPI: boolean;
    static SetCertificate(path: string, password: string): boolean;
    static GetVisualAssetsImage(type: UnityEditor.PlayerSettings_WSAImageType, scale: UnityEditor.PlayerSettings_WSAImageScale): string;
    static SetVisualAssetsImage(image: string, type: UnityEditor.PlayerSettings_WSAImageType, scale: UnityEditor.PlayerSettings_WSAImageScale): void;
    static SetCapability(capability: UnityEditor.PlayerSettings_WSACapability, value: boolean): void;
    static GetCapability(capability: UnityEditor.PlayerSettings_WSACapability): boolean;
    static SetTargetDeviceFamily(family: UnityEditor.PlayerSettings_WSATargetFamily, value: boolean): void;
    static GetTargetDeviceFamily(family: UnityEditor.PlayerSettings_WSATargetFamily): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_WSA_Declarations {
    static protocolName: string;
    static fileTypeAssociations: UnityEditor.PlayerSettings_WSAFileTypeAssociations;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_XboxOne {
    constructor();
    static XTitleMemory: number;
    static defaultLoggingLevel: UnityEditor.XboxOneLoggingLevel;
    static ProductId: string;
    static UpdateKey: string;
    static SandboxId: string;
    static ContentId: string;
    static TitleId: string;
    static SCID: string;
    static EnableVariableGPU: boolean;
    static PresentImmediateThreshold: System.UInt32;
    static Enable7thCore: boolean;
    static DisableKinectGpuReservation: boolean;
    static EnablePIXSampling: boolean;
    static GameOsOverridePath: string;
    static PackagingOverridePath: string;
    static PackagingEncryption: UnityEditor.XboxOneEncryptionLevel;
    static PackageUpdateGranularity: UnityEditor.XboxOnePackageUpdateGranularity;
    static OverrideIdentityName: string;
    static OverrideIdentityPublisher: string;
    static AppManifestOverridePath: string;
    static IsContentPackage: boolean;
    static EnhancedXboxCompatibilityMode: boolean;
    static Version: string;
    static Description: string;
    static SocketNames: string[];
    static AllowedProductIds: string[];
    static PersistentLocalStorageSize: System.UInt32;
    static EnableTypeOptimization: boolean;
    static monoLoggingLevel: number;
    static scriptCompiler: UnityEditor.ScriptCompiler;
    static SetCapability(capability: string, value: boolean): void;
    static GetCapability(capability: string): boolean;
    static SetSupportedLanguage(language: string, enabled: boolean): void;
    static GetSupportedLanguage(language: string): boolean;
    static RemoveSocketDefinition(name: string): void;
    static SetSocketDefinition(name: string, port: string, protocol: number, usages: number[], templateName: string, sessionRequirment: number, deviceUsages: number[]): void;
    static RemoveAllowedProductId(id: string): void;
    static AddAllowedProductId(id: string): boolean;
    static UpdateAllowedProductId(idx: number, id: string): void;
    static SetGameRating(name: string, value: number): void;
    static GetGameRating(name: string): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PlayerSettings_VRWindowsMixedReality {
    static depthBufferFormat: UnityEditor.PlayerSettings_VRWindowsMixedReality_DepthBufferFormat;
    static depthBufferSharingEnabled: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
    X86 = 4,
    X86_64 = 8,
    All = 4294967295,
  }
  export enum AndroidTargetDevices {
    AllDevices = 0,
    PhonesTabletsAndTVDevicesOnly = 1,
    ChromeOSDevicesOnly = 2,
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
  export class iOSDeviceRequirement {
    constructor();
    values: System.Collections.Generic.IDictionary<string, string>;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export enum WebGLDebugSymbolMode {
    Off = 0,
    External = 1,
    Embedded = 2,
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
  export class SaveAssetsProcessor {
    constructor();
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SceneVisibilityManager {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    HideAll(): void;
    DisableAllPicking(): void;
    Show(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    Hide(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    DisablePicking(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    EnablePicking(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    ShowAll(): void;
    EnableAllPicking(): void;
    Show(scene: UnityEngine.SceneManagement.Scene): void;
    EnablePicking(scene: UnityEngine.SceneManagement.Scene): void;
    Hide(scene: UnityEngine.SceneManagement.Scene): void;
    DisablePicking(scene: UnityEngine.SceneManagement.Scene): void;
    IsHidden(gameObject: UnityEngine.GameObject, includeDescendants?: boolean): boolean;
    IsHidden(scene: UnityEngine.SceneManagement.Scene): boolean;
    IsPickingDisabled(gameObject: UnityEngine.GameObject, includeDescendants?: boolean): boolean;
    IsPickingDisabled(scene: UnityEngine.SceneManagement.Scene): boolean;
    AreAllDescendantsHidden(scene: UnityEngine.SceneManagement.Scene): boolean;
    IsPickingDisabledOnAllDescendants(scene: UnityEngine.SceneManagement.Scene): boolean;
    AreAnyDescendantsHidden(scene: UnityEngine.SceneManagement.Scene): boolean;
    IsPickingDisabledOnAnyDescendant(scene: UnityEngine.SceneManagement.Scene): boolean;
    Show(gameObjects: UnityEngine.GameObject[], includeDescendants: boolean): void;
    Hide(gameObjects: UnityEngine.GameObject[], includeDescendants: boolean): void;
    DisablePicking(gameObjects: UnityEngine.GameObject[], includeDescendants: boolean): void;
    EnablePicking(gameObjects: UnityEngine.GameObject[], includeDescendants: boolean): void;
    Isolate(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    Isolate(gameObjects: UnityEngine.GameObject[], includeDescendants: boolean): void;
    ToggleVisibility(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    TogglePicking(gameObject: UnityEngine.GameObject, includeDescendants: boolean): void;
    AreAllDescendantsHidden(gameObject: UnityEngine.GameObject): boolean;
    AreAllDescendantsVisible(gameObject: UnityEngine.GameObject): boolean;
    IsPickingDisabledOnAllDescendants(gameObject: UnityEngine.GameObject): boolean;
    IsPickingEnabledOnAllDescendants(gameObject: UnityEngine.GameObject): boolean;
    IsCurrentStageIsolated(): boolean;
    ExitIsolation(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ScriptableSingleton<T = any> {
    static instance: any; // T
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ScriptableWizard {
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
    static DisplayWizard(title: string, klass: System.Type, createButtonName: string): UnityEditor.ScriptableWizard;
    static DisplayWizard(title: string, klass: System.Type): UnityEditor.ScriptableWizard;
    static DisplayWizard(title: string, klass: System.Type, createButtonName: string, otherButtonName: string): UnityEditor.ScriptableWizard;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class Selection {
    constructor();
    static transforms: UnityEngine.Transform[];
    static activeTransform: UnityEngine.Transform;
    static gameObjects: UnityEngine.GameObject[];
    static activeGameObject: UnityEngine.GameObject;
    static activeObject: UnityEngine.Object;
    static activeContext: UnityEngine.Object;
    static activeInstanceID: number;
    static objects: UnityEngine.Object[];
    static instanceIDs: number[];
    static assetGUIDs: string[];
    static count: number;
    static selectionChanged: (() => void);
    static Contains(instanceID: number): boolean;
    static SetActiveObjectWithContext(obj: UnityEngine.Object, context: UnityEngine.Object): void;
    static GetTransforms(mode: UnityEditor.SelectionMode): UnityEngine.Transform[];
    static Contains(obj: UnityEngine.Object): boolean;
    static GetFiltered(type: System.Type, mode: UnityEditor.SelectionMode): UnityEngine.Object[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SerializedObject {
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
    forceChildVisibility: boolean;
    Dispose(): void;
    GetIterator(): UnityEditor.SerializedProperty;
    FindProperty(propertyPath: string): UnityEditor.SerializedProperty;
    ApplyModifiedProperties(): boolean;
    SetIsDifferentCacheDirty(): void;
    Update(): void;
    UpdateIfDirtyOrScript(): void;
    UpdateIfRequiredOrScript(): boolean;
    ApplyModifiedPropertiesWithoutUndo(): boolean;
    CopyFromSerializedProperty(prop: UnityEditor.SerializedProperty): void;
    CopyFromSerializedPropertyIfDifferent(prop: UnityEditor.SerializedProperty): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
    Hash128 = 25,
  }
  export class SerializedProperty {
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
    longValue: System.Int64;
    boolValue: boolean;
    floatValue: number;
    doubleValue: number;
    stringValue: string;
    colorValue: UnityEngine.Color;
    animationCurveValue: UnityEngine.AnimationCurve;
    objectReferenceValue: UnityEngine.Object;
    managedReferenceValue: any; // System.Object
    managedReferenceId: System.Int64;
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
    hash128Value: UnityEngine.Hash128;
    isArray: boolean;
    arraySize: number;
    minArraySize: number;
    isFixedBuffer: boolean;
    fixedBufferSize: number;
    Copy(): UnityEditor.SerializedProperty;
    FindPropertyRelative(relativePropertyPath: string): UnityEditor.SerializedProperty;
    GetEnumerator(): System.Collections.IEnumerator;
    GetArrayElementAtIndex(index: number): UnityEditor.SerializedProperty;
    NextVisible(enterChildren: boolean): boolean;
    ClearArray(): void;
    Dispose(): void;
    static EqualContents(x: UnityEditor.SerializedProperty, y: UnityEditor.SerializedProperty): boolean;
    static DataEquals(x: UnityEditor.SerializedProperty, y: UnityEditor.SerializedProperty): boolean;
    Next(enterChildren: boolean): boolean;
    Reset(): void;
    CountRemaining(): number;
    CountInProperty(): number;
    DuplicateCommand(): boolean;
    DeleteCommand(): boolean;
    GetEndProperty(): UnityEditor.SerializedProperty;
    GetEndProperty(includeInvisible: boolean): UnityEditor.SerializedProperty;
    InsertArrayElementAtIndex(index: number): void;
    DeleteArrayElementAtIndex(index: number): void;
    MoveArrayElement(srcIndex: number, dstIndex: number): boolean;
    GetFixedBufferElementAtIndex(index: number): UnityEditor.SerializedProperty;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum PreprocessorOverride {
    UseProjectSettings = 0,
    ForcePlatformPreprocessor = 1,
    ForceCachingPreprocessor = 2,
  }
  export class ShaderInfo {
    name: string;
    supported: boolean;
    hasErrors: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderMessage {
    constructor(msg: string, sev?: UnityEditor.Rendering.ShaderCompilerMessageSeverity);
    message: string;
    messageDetails: string;
    file: string;
    line: number;
    platform: UnityEditor.Rendering.ShaderCompilerPlatform;
    severity: UnityEditor.Rendering.ShaderCompilerMessageSeverity;
    Equals(other: UnityEditor.ShaderMessage): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderUtil {
    constructor();
    static hardwareSupportsRectRenderTexture: boolean;
    static anythingCompiling: boolean;
    static allowAsyncCompilation: boolean;
    static HasProceduralInstancing(s: UnityEngine.Shader): boolean;
    static GetShaderMessageCount(s: UnityEngine.Shader): number;
    static GetShaderMessages(s: UnityEngine.Shader): UnityEditor.ShaderMessage[];
    static GetShaderMessages(s: UnityEngine.Shader, platform: UnityEditor.Rendering.ShaderCompilerPlatform): UnityEditor.ShaderMessage[];
    static ClearShaderMessages(s: UnityEngine.Shader): void;
    static GetComputeShaderMessageCount(s: UnityEngine.ComputeShader): number;
    static GetComputeShaderMessages(s: UnityEngine.ComputeShader): UnityEditor.ShaderMessage[];
    static GetRayTracingShaderMessageCount(s: any): number;
    static GetRayTracingShaderMessages(s: any): UnityEditor.ShaderMessage[];
    static GetRayGenerationShaderCount(s: any): number;
    static GetRayGenerationShaderName(s: any, shaderIndex: number): string;
    static GetMissShaderCount(s: any): number;
    static GetMissShaderName(s: any, shaderIndex: number): string;
    static GetMissShaderRayPayloadSize(s: any, shaderIndex: number): number;
    static GetCallableShaderCount(s: any): number;
    static GetCallableShaderName(s: any, shaderIndex: number): string;
    static GetCallableShaderParamSize(s: any, shaderIndex: number): number;
    static ClearCachedData(s: UnityEngine.Shader): void;
    static CreateShaderAsset(context: UnityEditor.AssetImporters.AssetImportContext, source: string, compileInitialShaderVariants: boolean): UnityEngine.Shader;
    static CreateShaderAsset(source: string): UnityEngine.Shader;
    static CreateShaderAsset(source: string, compileInitialShaderVariants: boolean): UnityEngine.Shader;
    static UpdateShaderAsset(context: UnityEditor.AssetImporters.AssetImportContext, shader: UnityEngine.Shader, source: string, compileInitialShaderVariants: boolean): void;
    static UpdateShaderAsset(shader: UnityEngine.Shader, source: string): void;
    static UpdateShaderAsset(shader: UnityEngine.Shader, source: string, compileInitialShaderVariants: boolean): void;
    static RegisterShader(shader: UnityEngine.Shader): void;
    static GetAllShaderInfo(): UnityEditor.ShaderInfo[];
    static SetAsyncCompilation(cmd: UnityEngine.Rendering.CommandBuffer, allow: boolean): void;
    static RestoreAsyncCompilation(cmd: UnityEngine.Rendering.CommandBuffer): void;
    static IsPassCompiled(material: UnityEngine.Material, pass: number): boolean;
    static CompilePass(material: UnityEngine.Material, pass: number, forceSync?: boolean): void;
    static GetCustomEditorForRenderPipeline(shader: UnityEngine.Shader, renderPipelineType: string): string;
    static GetCustomEditorForRenderPipeline(shader: UnityEngine.Shader, renderPipelineType: System.Type): string;
    static GetCurrentCustomEditor(shader: UnityEngine.Shader): string;
    static GetShaderPlatformKeywordsForBuildTarget(shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget, tier: UnityEngine.Rendering.GraphicsTier): UnityEngine.Rendering.BuiltinShaderDefine[];
    static GetShaderPlatformKeywordsForBuildTarget(shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget): UnityEngine.Rendering.BuiltinShaderDefine[];
    static ClearShaderErrors(s: UnityEngine.Shader): void;
    static GetPropertyCount(s: UnityEngine.Shader): number;
    static GetPropertyName(s: UnityEngine.Shader, propertyIdx: number): string;
    static GetPropertyType(s: UnityEngine.Shader, propertyIdx: number): UnityEditor.ShaderUtil_ShaderPropertyType;
    static GetPropertyDescription(s: UnityEngine.Shader, propertyIdx: number): string;
    static GetRangeLimits(s: UnityEngine.Shader, propertyIdx: number, defminmax: number): number;
    static GetTexDim(s: UnityEngine.Shader, propertyIdx: number): UnityEngine.Rendering.TextureDimension;
    static IsShaderPropertyHidden(s: UnityEngine.Shader, propertyIdx: number): boolean;
    static IsShaderPropertyNonModifiableTexureProperty(s: UnityEngine.Shader, propertyIdx: number): boolean;
    static GetShaderData(shader: UnityEngine.Shader): UnityEditor.ShaderData;
    static ShaderHasError(shader: UnityEngine.Shader): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
    Int = 5,
  }
  export class ShaderData {
    ActiveSubshaderIndex: number;
    SubshaderCount: number;
    SourceShader: UnityEngine.Shader;
    ActiveSubshader: UnityEditor.ShaderData_Subshader;
    GetSubshader(index: number): UnityEditor.ShaderData_Subshader;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ShaderData_Subshader {
    PassCount: number;
    GetPass(passIndex: number): UnityEditor.ShaderData_Pass;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ShaderData_Pass {
    SourceCode: string;
    Name: string;
    CompileVariant(shaderType: UnityEditor.Rendering.ShaderType, keywords: string[], shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget): UnityEditor.ShaderData_VariantCompileInfo;
    CompileVariant(shaderType: UnityEditor.Rendering.ShaderType, keywords: string[], shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget, tier: UnityEngine.Rendering.GraphicsTier): UnityEditor.ShaderData_VariantCompileInfo;
    CompileVariant(shaderType: UnityEditor.Rendering.ShaderType, keywords: string[], shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget, platformKeywords: UnityEngine.Rendering.BuiltinShaderDefine[]): UnityEditor.ShaderData_VariantCompileInfo;
    CompileVariant(shaderType: UnityEditor.Rendering.ShaderType, keywords: string[], shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform, buildTarget: UnityEditor.BuildTarget, platformKeywords: UnityEngine.Rendering.BuiltinShaderDefine[], tier: UnityEngine.Rendering.GraphicsTier): UnityEditor.ShaderData_VariantCompileInfo;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ShaderData_VariantCompileInfo {
    Success: boolean;
    Messages: UnityEditor.ShaderMessage[];
    ShaderData: System.Byte[];
    Attributes: UnityEngine.Rendering.VertexAttribute[];
    ConstantBuffers: UnityEditor.ShaderData_ConstantBufferInfo[];
    TextureBindings: UnityEditor.ShaderData_TextureBindingInfo[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderData_ConstantBufferInfo {
    Name: string;
    Size: number;
    Fields: UnityEditor.ShaderData_ConstantInfo[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderData_ConstantInfo {
    Name: string;
    Index: number;
    ConstantType: UnityEngine.Rendering.ShaderConstantType;
    DataType: UnityEngine.Rendering.ShaderParamType;
    Rows: number;
    Columns: number;
    ArraySize: number;
    StructSize: number;
    StructFields: UnityEditor.ShaderData_ConstantInfo[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderData_TextureBindingInfo {
    Name: string;
    Index: number;
    SamplerIndex: number;
    Multisampled: boolean;
    ArraySize: number;
    Dim: UnityEngine.Rendering.TextureDimension;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
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
  export class StaticOcclusionCulling {
    static isRunning: boolean;
    static smallestOccluder: number;
    static smallestHole: number;
    static backfaceThreshold: number;
    static doesSceneHaveManualPortals: boolean;
    static umbraDataSize: number;
    static Compute(): boolean;
    static GenerateInBackground(): boolean;
    static RemoveCacheFolder(): void;
    static Cancel(): void;
    static Clear(): void;
    static SetDefaultOcclusionBakeSettings(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class StaticOcclusionCullingVisualization {
    static showOcclusionCulling: boolean;
    static showPreVisualization: boolean;
    static showViewVolumes: boolean;
    static showDynamicObjectBounds: boolean;
    static showPortals: boolean;
    static showVisibilityLines: boolean;
    static showGeometryCulling: boolean;
    static isPreviewOcclusionCullingCameraInPVS: boolean;
    static previewOcclusionCamera: UnityEngine.Camera;
    static previewOcclucionCamera: UnityEngine.Camera;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class TypeCache {
    static GetTypesWithAttribute(attrType: System.Type): UnityEditor.TypeCache_TypeCollection;
    static GetMethodsWithAttribute(attrType: System.Type): UnityEditor.TypeCache_MethodCollection;
    static GetFieldsWithAttribute(attrType: System.Type): UnityEditor.TypeCache_FieldInfoCollection;
    static GetTypesDerivedFrom(parentType: System.Type): UnityEditor.TypeCache_TypeCollection;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class TypeCache_TypeCollection {
    [key: string]: any;
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains(item: System.Type): boolean;
    Contains(item: any): boolean;
    GetEnumerator(): UnityEditor.TypeCache_TypeCollection_Enumerator;
    CopyTo(array: System.Type[], arrayIndex: number): void;
    CopyTo(array: System.Array, arrayIndex: number): void;
    IndexOf(item: System.Type): number;
    IndexOf(item: any): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TypeCache_TypeCollection_Enumerator {
    Current: System.Type;
    Dispose(): void;
    MoveNext(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TypeCache_MethodCollection {
    [key: string]: any;
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains(item: System.Reflection.MethodInfo): boolean;
    Contains(item: any): boolean;
    GetEnumerator(): UnityEditor.TypeCache_MethodCollection_Enumerator;
    CopyTo(array: System.Reflection.MethodInfo[], arrayIndex: number): void;
    CopyTo(array: System.Array, arrayIndex: number): void;
    IndexOf(item: System.Reflection.MethodInfo): number;
    IndexOf(item: any): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TypeCache_MethodCollection_Enumerator {
    Current: System.Reflection.MethodInfo;
    Dispose(): void;
    MoveNext(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TypeCache_FieldInfoCollection {
    [key: string]: any;
    Count: number;
    IsReadOnly: boolean;
    IsFixedSize: boolean;
    IsSynchronized: boolean;
    Contains(item: System.Reflection.FieldInfo): boolean;
    Contains(item: any): boolean;
    GetEnumerator(): UnityEditor.TypeCache_FieldInfoCollection_Enumerator;
    CopyTo(array: System.Reflection.FieldInfo[], arrayIndex: number): void;
    CopyTo(array: System.Array, arrayIndex: number): void;
    IndexOf(item: System.Reflection.FieldInfo): number;
    IndexOf(item: any): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TypeCache_FieldInfoCollection_Enumerator {
    Current: System.Reflection.FieldInfo;
    Dispose(): void;
    MoveNext(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class Undo {
    constructor();
    static undoRedoPerformed: UnityEditor.Undo_UndoRedoCallback;
    static willFlushUndoRecord: UnityEditor.Undo_WillFlushUndoRecord;
    static postprocessModifications: UnityEditor.Undo_PostprocessModifications;
    static RegisterCompleteObjectUndo(objectToUndo: UnityEngine.Object, name: string): void;
    static RegisterCompleteObjectUndo(objectsToUndo: UnityEngine.Object[], name: string): void;
    static SetTransformParent(transform: UnityEngine.Transform, newParent: UnityEngine.Transform, name: string): void;
    static SetTransformParent(transform: UnityEngine.Transform, newParent: UnityEngine.Transform, worldPositionStays: boolean, name: string): void;
    static MoveGameObjectToScene(go: UnityEngine.GameObject, scene: UnityEngine.SceneManagement.Scene, name: string): void;
    static RegisterCreatedObjectUndo(objectToUndo: UnityEngine.Object, name: string): void;
    static DestroyObjectImmediate(objectToUndo: UnityEngine.Object): void;
    static AddComponent(gameObject: UnityEngine.GameObject, type: System.Type): UnityEngine.Component;
    static RegisterImporterUndo(path: string, name: string): void;
    static RegisterChildrenOrderUndo(objectToUndo: UnityEngine.Object, name: string): void;
    static RegisterFullObjectHierarchyUndo(objectToUndo: UnityEngine.Object, name: string): void;
    static RegisterFullObjectHierarchyUndo(objectToUndo: UnityEngine.Object): void;
    static RecordObject(objectToUndo: UnityEngine.Object, name: string): void;
    static RecordObjects(objectsToUndo: UnityEngine.Object[], name: string): void;
    static ClearUndo(identifier: UnityEngine.Object): void;
    static PerformUndo(): void;
    static PerformRedo(): void;
    static IncrementCurrentGroup(): void;
    static GetCurrentGroup(): number;
    static GetCurrentGroupName(): string;
    static SetCurrentGroupName(name: string): void;
    static RevertAllInCurrentGroup(): void;
    static RevertAllDownToGroup(group: number): void;
    static CollapseUndoOperations(groupIndex: number): void;
    static ClearAll(): void;
    static RegisterUndo(objectToUndo: UnityEngine.Object, name: string): void;
    static RegisterUndo(objectsToUndo: UnityEngine.Object[], name: string): void;
    static FlushUndoRecordObjects(): void;
    static SetSnapshotTarget(objectToUndo: UnityEngine.Object, name: string): void;
    static SetSnapshotTarget(objectsToUndo: UnityEngine.Object[], name: string): void;
    static ClearSnapshotTarget(): void;
    static CreateSnapshot(): void;
    static RestoreSnapshot(): void;
    static RegisterSnapshot(): void;
    static RegisterSceneUndo(name: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Undo_UndoRedoCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Undo_WillFlushUndoRecord {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Undo_PostprocessModifications {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(modifications: UnityEditor.UndoPropertyModification[]): UnityEditor.UndoPropertyModification[];
    BeginInvoke(modifications: UnityEditor.UndoPropertyModification[], callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): UnityEditor.UndoPropertyModification[];
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class UnityStats {
    constructor();
    static batches: number;
    static drawCalls: number;
    static dynamicBatchedDrawCalls: number;
    static staticBatchedDrawCalls: number;
    static instancedBatchedDrawCalls: number;
    static dynamicBatches: number;
    static staticBatches: number;
    static instancedBatches: number;
    static setPassCalls: number;
    static triangles: number;
    static vertices: number;
    static shadowCasters: number;
    static renderTextureChanges: number;
    static frameTime: number;
    static renderTime: number;
    static audioLevel: number;
    static audioClippingAmount: number;
    static audioDSPLoad: number;
    static audioStreamLoad: number;
    static renderTextureCount: number;
    static renderTextureBytes: number;
    static usedTextureMemorySize: number;
    static usedTextureCount: number;
    static screenRes: string;
    static screenBytes: number;
    static vboTotal: number;
    static vboTotalBytes: number;
    static vboUploads: number;
    static vboUploadBytes: number;
    static ibUploads: number;
    static ibUploadBytes: number;
    static visibleSkinnedMeshes: number;
    static animationComponentsPlaying: number;
    static animatorComponentsPlaying: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Unsupported {
    static useScriptableRenderPipeline: boolean;
    static IsRegistryValidationDisabled: boolean;
    static CaptureScreenshotImmediate(filePath: string, x: number, y: number, width: number, height: number): void;
    static GetSubmenusCommands(menuPath: string): string[];
    static GetTypeFromFullName(fullName: string): System.Type;
    static GetSubmenus(menuPath: string): string[];
    static GetSubmenusIncludingSeparators(menuPath: string): string[];
    static PrepareObjectContextMenu(c: UnityEngine.Object, contextUserData: number): void;
    static IsDeveloperBuild(): boolean;
    static IsDeveloperMode(): boolean;
    static IsSourceBuild(): boolean;
    static IsSourceBuild(checkHumanControllingUs: boolean): boolean;
    static IsBleedingEdgeBuild(): boolean;
    static IsDestroyScriptableObject(target: UnityEngine.ScriptableObject): boolean;
    static IsNativeCodeBuiltInReleaseMode(): boolean;
    static GetBaseUnityDeveloperFolder(): string;
    static StopPlayingImmediately(): void;
    static SceneTrackerFlushDirty(): void;
    static SetAllowCursorHide(allow: boolean): void;
    static SetOverrideRenderSettings(scene: UnityEngine.SceneManagement.Scene): boolean;
    static RestoreOverrideRenderSettings(): void;
    static SetOverrideLightingSettings(scene: UnityEngine.SceneManagement.Scene): boolean;
    static RestoreOverrideLightingSettings(): void;
    static SetRenderSettingsUseFogNoDirty(fog: boolean): void;
    static SetSceneViewDebugModeExposureNoDirty(exposure: number): void;
    static SetQualitySettingsShadowDistanceTemporarily(distance: number): void;
    static DeleteGameObjectSelection(): void;
    static CopyGameObjectsToPasteboard(): void;
    static PasteGameObjectsFromPasteboard(): void;
    static GetSerializedAssetInterfaceSingleton(className: string): UnityEngine.Object;
    static DuplicateGameObjectsUsingPasteboard(): void;
    static CopyComponentToPasteboard(component: UnityEngine.Component): boolean;
    static PasteComponentFromPasteboard(go: UnityEngine.GameObject): boolean;
    static PasteComponentValuesFromPasteboard(component: UnityEngine.Component): boolean;
    static HasStateMachineTransitionDataInPasteboard(): boolean;
    static AreAllParametersInDestination(transition: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController, missingParameters: string[]): boolean;
    static DestinationHasCompatibleParameterTypes(transition: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController, mismatchedParameters: string[]): boolean;
    static CanPasteParametersToTransition(transition: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController): boolean;
    static CopyStateMachineTransitionParametersToPasteboard(transition: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController): void;
    static PasteToStateMachineTransitionParametersFromPasteboard(transition: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController, conditions: boolean, parameters: boolean): void;
    static CopyStateMachineDataToPasteboard(stateMachineObject: UnityEngine.Object, controller: UnityEditor.Animations.AnimatorController, layerIndex: number): void;
    static PasteToStateMachineFromPasteboard(sm: UnityEditor.Animations.AnimatorStateMachine, controller: UnityEditor.Animations.AnimatorController, layerIndex: number, position: UnityEngine.Vector3): void;
    static HasStateMachineDataInPasteboard(): boolean;
    static SmartReset(obj: UnityEngine.Object): void;
    static ResolveSymlinks(path: string): string;
    static ResolveRedirectedPath(path: string): string;
    static SetApplicationSettingCompressAssetsOnImport(value: boolean): void;
    static GetApplicationSettingCompressAssetsOnImport(): boolean;
    static GetLocalIdentifierInFile(instanceID: number): number;
    static GetLocalIdentifierInFileForPersistentObject(obj: UnityEngine.Object): System.UInt64;
    static IsHiddenFile(path: string): boolean;
    static ClearSkinCache(): void;
    static GetRenderSettings(): UnityEngine.Object;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class UnwrapParam {
    angleError: number;
    areaError: number;
    hardAngle: number;
    packMargin: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class Unwrapping {
    static GeneratePerTriangleUV(src: UnityEngine.Mesh): UnityEngine.Vector2[];
    static GeneratePerTriangleUV(src: UnityEngine.Mesh, settings: UnityEditor.UnwrapParam): UnityEngine.Vector2[];
    static GenerateSecondaryUVSet(src: UnityEngine.Mesh): void;
    static GenerateSecondaryUVSet(src: UnityEngine.Mesh, settings: UnityEditor.UnwrapParam): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ExternalVersionControl {
    constructor(value: string);
    static Disabled: string;
    static AutoDetect: string;
    static Generic: string;
    static AssetServer: string;
    ToString(): string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
  }
  export class VersionControlSettings {
    static mode: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class AnimationClipSettings {
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
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AnimationModeDriver {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class AnimationMode {
    constructor();
    static animatedPropertyColor: UnityEngine.Color;
    static recordedPropertyColor: UnityEngine.Color;
    static candidatePropertyColor: UnityEngine.Color;
    static IsPropertyAnimated(target: UnityEngine.Object, propertyPath: string): boolean;
    static StopAnimationMode(): void;
    static StopAnimationMode(driver: UnityEditor.AnimationModeDriver): void;
    static InAnimationMode(): boolean;
    static InAnimationMode(driver: UnityEditor.AnimationModeDriver): boolean;
    static StartAnimationMode(): void;
    static StartAnimationMode(driver: UnityEditor.AnimationModeDriver): void;
    static BeginSampling(): void;
    static EndSampling(): void;
    static SampleAnimationClip(gameObject: UnityEngine.GameObject, clip: UnityEngine.AnimationClip, time: number): void;
    static SamplePlayableGraph(graph: UnityEngine.Playables.PlayableGraph, index: number, time: number): void;
    static AddPropertyModification(binding: UnityEditor.EditorCurveBinding, modification: UnityEditor.PropertyModification, keepPrefabOverride: boolean): void;
    static AddEditorCurveBinding(gameObject: UnityEngine.GameObject, binding: UnityEditor.EditorCurveBinding): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ObjectReferenceKeyframe {
    time: number;
    value: UnityEngine.Object;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class AnimationClipCurveData {
    constructor();
    constructor(binding: UnityEditor.EditorCurveBinding);
    path: string;
    type: System.Type;
    propertyName: string;
    curve: UnityEngine.AnimationCurve;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AnimationUtility {
    constructor();
    static onCurveWasModified: UnityEditor.AnimationUtility_OnCurveWasModified;
    static GetAnimationClips(component: UnityEngine.Animation): UnityEngine.AnimationClip[];
    static GetAnimationClips(gameObject: UnityEngine.GameObject): UnityEngine.AnimationClip[];
    static SetAnimationClips(animation: UnityEngine.Animation, clips: UnityEngine.AnimationClip[]): void;
    static GetAnimatableBindings(targetObject: UnityEngine.GameObject, root: UnityEngine.GameObject): UnityEditor.EditorCurveBinding[];
    static GetEditorCurveValueType(root: UnityEngine.GameObject, binding: UnityEditor.EditorCurveBinding): System.Type;
    static GetAnimatedObject(root: UnityEngine.GameObject, binding: UnityEditor.EditorCurveBinding): UnityEngine.Object;
    static GetCurveBindings(clip: UnityEngine.AnimationClip): UnityEditor.EditorCurveBinding[];
    static GetObjectReferenceCurveBindings(clip: UnityEngine.AnimationClip): UnityEditor.EditorCurveBinding[];
    static GetObjectReferenceCurve(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding): UnityEditor.ObjectReferenceKeyframe[];
    static SetObjectReferenceCurve(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, keyframes: UnityEditor.ObjectReferenceKeyframe[]): void;
    static SetObjectReferenceCurves(clip: UnityEngine.AnimationClip, bindings: UnityEditor.EditorCurveBinding[], keyframes: UnityEditor.ObjectReferenceKeyframe[][]): void;
    static GetEditorCurve(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding): UnityEngine.AnimationCurve;
    static SetEditorCurve(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, curve: UnityEngine.AnimationCurve): void;
    static SetEditorCurves(clip: UnityEngine.AnimationClip, bindings: UnityEditor.EditorCurveBinding[], curves: UnityEngine.AnimationCurve[]): void;
    static GetKeyLeftTangentMode(curve: UnityEngine.AnimationCurve, index: number): UnityEditor.AnimationUtility_TangentMode;
    static GetKeyRightTangentMode(curve: UnityEngine.AnimationCurve, index: number): UnityEditor.AnimationUtility_TangentMode;
    static GetKeyBroken(curve: UnityEngine.AnimationCurve, index: number): boolean;
    static SetKeyLeftTangentMode(curve: UnityEngine.AnimationCurve, index: number, tangentMode: UnityEditor.AnimationUtility_TangentMode): void;
    static SetKeyRightTangentMode(curve: UnityEngine.AnimationCurve, index: number, tangentMode: UnityEditor.AnimationUtility_TangentMode): void;
    static SetKeyBroken(curve: UnityEngine.AnimationCurve, index: number, broken: boolean): void;
    static GetAllCurves(clip: UnityEngine.AnimationClip): UnityEditor.AnimationClipCurveData[];
    static GetAllCurves(clip: UnityEngine.AnimationClip, includeCurveData: boolean): UnityEditor.AnimationClipCurveData[];
    static SetEditorCurve(clip: UnityEngine.AnimationClip, relativePath: string, type: System.Type, propertyName: string, curve: UnityEngine.AnimationCurve): void;
    static GetEditorCurve(clip: UnityEngine.AnimationClip, relativePath: string, type: System.Type, propertyName: string): UnityEngine.AnimationCurve;
    static GetAnimationEvents(clip: UnityEngine.AnimationClip): UnityEngine.AnimationEvent[];
    static SetAnimationEvents(clip: UnityEngine.AnimationClip, events: UnityEngine.AnimationEvent[]): void;
    static CalculateTransformPath(targetTransform: UnityEngine.Transform, root: UnityEngine.Transform): string;
    static GetAnimationClipSettings(clip: UnityEngine.AnimationClip): UnityEditor.AnimationClipSettings;
    static SetAnimationClipSettings(clip: UnityEngine.AnimationClip, srcClipInfo: UnityEditor.AnimationClipSettings): void;
    static SetAdditiveReferencePose(clip: UnityEngine.AnimationClip, referenceClip: UnityEngine.AnimationClip, time: number): void;
    static ConstrainToPolynomialCurve(curve: UnityEngine.AnimationCurve): void;
    static GetGenerateMotionCurves(clip: UnityEngine.AnimationClip): boolean;
    static SetGenerateMotionCurves(clip: UnityEngine.AnimationClip, value: boolean): void;
    static InAnimationMode(): boolean;
    static StartAnimationMode(objects: UnityEngine.Object[]): void;
    static StopAnimationMode(): void;
    static SetAnimationType(clip: UnityEngine.AnimationClip, type: UnityEditor.ModelImporterAnimationType): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class AnimationUtility_OnCurveWasModified {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, type: UnityEditor.AnimationUtility_CurveModifiedType): void;
    BeginInvoke(clip: UnityEngine.AnimationClip, binding: UnityEditor.EditorCurveBinding, type: UnityEditor.AnimationUtility_CurveModifiedType, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorCurveBinding {
    isPPtrCurve: boolean;
    isDiscreteCurve: boolean;
    type: System.Type;
    path: string;
    propertyName: string;
    GetHashCode(): number;
    Equals(other: any): boolean;
    Equals(other: UnityEditor.EditorCurveBinding): boolean;
    static FloatCurve(inPath: string, inType: System.Type, inPropertyName: string): UnityEditor.EditorCurveBinding;
    static PPtrCurve(inPath: string, inType: System.Type, inPropertyName: string): UnityEditor.EditorCurveBinding;
    static DiscreteCurve(inPath: string, inType: System.Type, inPropertyName: string): UnityEditor.EditorCurveBinding;
    ToString(): string;
    GetType(): System.Type;
  }
  export class AnimationWindow {
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
    AddItemsToMenu(menu: UnityEditor.GenericMenu): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class SceneViewCameraWindow {
    constructor(sceneView: UnityEditor.SceneView);
    editorWindow: UnityEditor.EditorWindow;
    GetWindowSize(): UnityEngine.Vector2;
    OnGUI(rect: UnityEngine.Rect): void;
    OnOpen(): void;
    OnClose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetDatabase {
    constructor();
    static GlobalArtifactDependencyVersion: System.UInt32;
    static GlobalArtifactProcessedVersion: System.UInt32;
    static ActiveRefreshImportMode: UnityEditor.AssetDatabase_RefreshImportMode;
    static DesiredWorkerCount: number;
    static onImportPackageItemsCompleted: ((arg0: string[]) => void);
    static CanOpenForEdit(assetOrMetaFilePaths: string[], outNotEditablePaths: string[], statusQueryOptions?: UnityEditor.StatusQueryOptions): void;
    static IsOpenForEdit(assetOrMetaFilePaths: string[], outNotEditablePaths: string[], statusQueryOptions?: UnityEditor.StatusQueryOptions): void;
    static MakeEditable(path: string): boolean;
    static MakeEditable(paths: string[], prompt?: string, outNotEditablePaths?: string[]): boolean;
    static GetTextMetaDataPathFromAssetPath(path: string): string;
    static FindAssets(filter: string): string[];
    static FindAssets(filter: string, searchInFolders: string[]): string[];
    static Contains(obj: UnityEngine.Object): boolean;
    static Contains(instanceID: number): boolean;
    static CreateFolder(parentFolder: string, newFolderName: string): string;
    static IsMainAsset(obj: UnityEngine.Object): boolean;
    static IsMainAsset(instanceID: number): boolean;
    static IsSubAsset(obj: UnityEngine.Object): boolean;
    static IsSubAsset(instanceID: number): boolean;
    static IsForeignAsset(obj: UnityEngine.Object): boolean;
    static IsForeignAsset(instanceID: number): boolean;
    static IsNativeAsset(obj: UnityEngine.Object): boolean;
    static IsNativeAsset(instanceID: number): boolean;
    static GetCurrentCacheServerIp(): string;
    static GenerateUniqueAssetPath(path: string): string;
    static StartAssetEditing(): void;
    static StopAssetEditing(): void;
    static ReleaseCachedFileHandles(): void;
    static ValidateMoveAsset(oldPath: string, newPath: string): string;
    static MoveAsset(oldPath: string, newPath: string): string;
    static ExtractAsset(asset: UnityEngine.Object, newPath: string): string;
    static RenameAsset(pathName: string, newName: string): string;
    static MoveAssetToTrash(path: string): boolean;
    static MoveAssetsToTrash(paths: string[], outFailedPaths: string[]): boolean;
    static DeleteAsset(path: string): boolean;
    static DeleteAssets(paths: string[], outFailedPaths: string[]): boolean;
    static ImportAsset(path: string): void;
    static ImportAsset(path: string, options: UnityEditor.ImportAssetOptions): void;
    static CopyAsset(path: string, newPath: string): boolean;
    static WriteImportSettingsIfDirty(path: string): boolean;
    static GetSubFolders(path: string): string[];
    static IsValidFolder(path: string): boolean;
    static CreateAsset(asset: UnityEngine.Object, path: string): void;
    static AddObjectToAsset(objectToAdd: UnityEngine.Object, path: string): void;
    static AddObjectToAsset(objectToAdd: UnityEngine.Object, assetObject: UnityEngine.Object): void;
    static SetMainObject(mainObject: UnityEngine.Object, assetPath: string): void;
    static GetAssetPath(assetObject: UnityEngine.Object): string;
    static GetAssetPath(instanceID: number): string;
    static GetAssetOrScenePath(assetObject: UnityEngine.Object): string;
    static GetTextMetaFilePathFromAssetPath(path: string): string;
    static GetAssetPathFromTextMetaFilePath(path: string): string;
    static LoadAssetAtPath(assetPath: string, type: System.Type): UnityEngine.Object;
    static LoadMainAssetAtPath(assetPath: string): UnityEngine.Object;
    static GetMainAssetTypeAtPath(assetPath: string): System.Type;
    static GetTypeFromPathAndFileID(assetPath: string, localIdentifierInFile: System.Int64): System.Type;
    static IsMainAssetAtPathLoaded(assetPath: string): boolean;
    static LoadAllAssetRepresentationsAtPath(assetPath: string): UnityEngine.Object[];
    static LoadAllAssetsAtPath(assetPath: string): UnityEngine.Object[];
    static GetAllAssetPaths(): string[];
    static RefreshDelayed(options: UnityEditor.ImportAssetOptions): void;
    static RefreshDelayed(): void;
    static Refresh(): void;
    static Refresh(options: UnityEditor.ImportAssetOptions): void;
    static CanOpenAssetInEditor(instanceID: number): boolean;
    static OpenAsset(instanceID: number): boolean;
    static OpenAsset(instanceID: number, lineNumber: number): boolean;
    static OpenAsset(instanceID: number, lineNumber: number, columnNumber: number): boolean;
    static OpenAsset(target: UnityEngine.Object): boolean;
    static OpenAsset(target: UnityEngine.Object, lineNumber: number): boolean;
    static OpenAsset(target: UnityEngine.Object, lineNumber: number, columnNumber: number): boolean;
    static OpenAsset(objects: UnityEngine.Object[]): boolean;
    static GUIDToAssetPath(guid: string): string;
    static GUIDToAssetPath(guid: UnityEditor.GUID): string;
    static GUIDFromAssetPath(path: string): UnityEditor.GUID;
    static AssetPathToGUID(path: string): string;
    static AssetPathToGUID(path: string, options: UnityEditor.AssetPathToGUIDOptions): string;
    static GetAssetDependencyHash(guid: UnityEditor.GUID): UnityEngine.Hash128;
    static GetAssetDependencyHash(path: string): UnityEngine.Hash128;
    static SaveAssets(): void;
    static SaveAssetIfDirty(guid: UnityEditor.GUID): void;
    static SaveAssetIfDirty(obj: UnityEngine.Object): void;
    static GetCachedIcon(path: string): UnityEngine.Texture;
    static SetLabels(obj: UnityEngine.Object, labels: string[]): void;
    static GetLabels(guid: UnityEditor.GUID): string[];
    static GetLabels(obj: UnityEngine.Object): string[];
    static ClearLabels(obj: UnityEngine.Object): void;
    static GetAllAssetBundleNames(): string[];
    GetAssetBundleNames(): string[];
    static GetUnusedAssetBundleNames(): string[];
    static RemoveAssetBundleName(assetBundleName: string, forceRemove: boolean): boolean;
    static RemoveUnusedAssetBundleNames(): void;
    static GetAssetPathsFromAssetBundle(assetBundleName: string): string[];
    static GetAssetPathsFromAssetBundleAndAssetName(assetBundleName: string, assetName: string): string[];
    static GetImplicitAssetBundleName(assetPath: string): string;
    static GetImplicitAssetBundleVariantName(assetPath: string): string;
    static GetAssetBundleDependencies(assetBundleName: string, recursive: boolean): string[];
    static GetDependencies(pathName: string): string[];
    static GetDependencies(pathName: string, recursive: boolean): string[];
    static GetDependencies(pathNames: string[]): string[];
    static GetDependencies(pathNames: string[], recursive: boolean): string[];
    static ExportPackage(assetPathName: string, fileName: string): void;
    static ExportPackage(assetPathName: string, fileName: string, flags: UnityEditor.ExportPackageOptions): void;
    static ExportPackage(assetPathNames: string[], fileName: string): void;
    static ExportPackage(assetPathNames: string[], fileName: string, flags: UnityEditor.ExportPackageOptions): void;
    static CanOpenForEdit(assetObject: UnityEngine.Object): boolean;
    static CanOpenForEdit(assetObject: UnityEngine.Object, statusOptions: UnityEditor.StatusQueryOptions): boolean;
    static CanOpenForEdit(assetOrMetaFilePath: string): boolean;
    static CanOpenForEdit(assetOrMetaFilePath: string, statusOptions: UnityEditor.StatusQueryOptions): boolean;
    static IsOpenForEdit(assetObject: UnityEngine.Object): boolean;
    static IsOpenForEdit(assetObject: UnityEngine.Object, statusOptions: UnityEditor.StatusQueryOptions): boolean;
    static IsOpenForEdit(assetOrMetaFilePath: string): boolean;
    static IsOpenForEdit(assetOrMetaFilePath: string, statusOptions: UnityEditor.StatusQueryOptions): boolean;
    static IsMetaFileOpenForEdit(assetObject: UnityEngine.Object): boolean;
    static IsMetaFileOpenForEdit(assetObject: UnityEngine.Object, statusOptions: UnityEditor.StatusQueryOptions): boolean;
    static GetBuiltinExtraResource(type: System.Type, path: string): UnityEngine.Object;
    static ForceReserializeAssets(assetPaths: any, options?: UnityEditor.ForceReserializeAssetsOptions): void;
    static ForceReserializeAssets(): void;
    static RemoveObjectFromAsset(objectToRemove: UnityEngine.Object): void;
    static ImportPackage(packagePath: string, interactive: boolean): void;
    static DisallowAutoRefresh(): void;
    static AllowAutoRefresh(): void;
    static ClearImporterOverride(path: string): void;
    static IsCacheServerEnabled(): boolean;
    static GetImporterOverride(path: string): System.Type;
    static GetAvailableImporterTypes(path: string): System.Type[];
    static CanConnectToCacheServer(ip: string, port: System.UInt16): boolean;
    static RefreshSettings(): void;
    static IsConnectedToCacheServer(): boolean;
    static ResetCacheServerReconnectTimer(): void;
    static CloseCacheServerConnection(): void;
    static GetCacheServerAddress(): string;
    static GetCacheServerPort(): System.UInt16;
    static GetCacheServerNamespacePrefix(): string;
    static GetCacheServerEnableDownload(): boolean;
    static GetCacheServerEnableUpload(): boolean;
    static IsDirectoryMonitoringEnabled(): boolean;
    static RegisterCustomDependency(dependency: string, hashOfValue: UnityEngine.Hash128): void;
    static UnregisterCustomDependencyPrefixFilter(prefixFilter: string): System.UInt32;
    static IsAssetImportWorkerProcess(): boolean;
    static ForceToDesiredWorkerCount(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetDatabase_ImportPackageCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(packageName: string): void;
    BeginInvoke(packageName: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetDatabase_ImportPackageFailedCallback {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(packageName: string, errorMessage: string): void;
    BeginInvoke(packageName: string, errorMessage: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum AssetDatabase_RefreshImportMode {
    InProcess = 0,
    OutOfProcessPerQueue = 1,
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
  export class AssetsItem {
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
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetPreview {
    constructor();
    static GetAssetPreview(asset: UnityEngine.Object): UnityEngine.Texture2D;
    static IsLoadingAssetPreview(instanceID: number): boolean;
    static IsLoadingAssetPreviews(): boolean;
    static SetPreviewTextureCacheSize(size: number): void;
    static GetMiniThumbnail(obj: UnityEngine.Object): UnityEngine.Texture2D;
    static GetMiniTypeThumbnail(type: System.Type): UnityEngine.Texture2D;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetImporter {
    constructor();
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    static GetAtPath(path: string): UnityEditor.AssetImporter;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class AssetImporter_SourceAssetIdentifier {
    constructor(asset: UnityEngine.Object);
    constructor(type: System.Type, name: string);
    type: System.Type;
    name: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class MaterialEditorExtensions {
    static PerformBumpMapCheck(material: UnityEngine.Material): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ComputeShaderImporter {
    constructor();
    preprocessorOverride: UnityEditor.PreprocessorOverride;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class DDSImporter {
    constructor();
    isReadable: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class IHVImageFormatImporter {
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderImporter {
    constructor();
    preprocessorOverride: UnityEditor.PreprocessorOverride;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetShader(): UnityEngine.Shader;
    SetDefaultTextures(name: string[], textures: UnityEngine.Texture[]): void;
    GetDefaultTexture(name: string): UnityEngine.Texture;
    SetNonModifiableTextures(name: string[], textures: UnityEngine.Texture[]): void;
    GetNonModifiableTexture(name: string): UnityEngine.Texture;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ShaderInclude {
    constructor();
    bytes: System.Byte[];
    text: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ToString(): string;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    GetType(): System.Type;
  }
  export class SpeedTreeImporter {
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static windQualityNames: string[];
    GenerateMaterials(): void;
    SearchAndRemapMaterials(materialFolderPath: string): boolean;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum SpeedTreeImporter_MaterialLocation {
    External = 0,
    InPrefab = 1,
  }
  export class TextureImporter {
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetAllowsAlphaSplitting(): boolean;
    SetAllowsAlphaSplitting(flag: boolean): void;
    GetPlatformTextureSettings(platform: string): UnityEditor.TextureImporterPlatformSettings;
    GetDefaultPlatformTextureSettings(): UnityEditor.TextureImporterPlatformSettings;
    GetAutomaticFormat(platform: string): UnityEditor.TextureImporterFormat;
    SetPlatformTextureSettings(platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat, compressionQuality: number, allowsAlphaSplit: boolean): void;
    SetPlatformTextureSettings(platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat): void;
    SetPlatformTextureSettings(platform: string, maxTextureSize: number, textureFormat: UnityEditor.TextureImporterFormat, allowsAlphaSplit: boolean): void;
    SetPlatformTextureSettings(platformSettings: UnityEditor.TextureImporterPlatformSettings): void;
    ClearPlatformTextureSettings(platform: string): void;
    static IsPlatformTextureFormatValid(textureType: UnityEditor.TextureImporterType, target: UnityEditor.BuildTarget, currentFormat: UnityEditor.TextureImporterFormat): boolean;
    static IsDefaultPlatformTextureFormatValid(textureType: UnityEditor.TextureImporterType, currentFormat: UnityEditor.TextureImporterFormat): boolean;
    DoesSourceTextureHaveAlpha(): boolean;
    DoesSourceTextureHaveColor(): boolean;
    ReadTextureSettings(dest: UnityEditor.TextureImporterSettings): void;
    SetTextureSettings(src: UnityEditor.TextureImporterSettings): void;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
    NormalMap = 1,
    GUI = 2,
    Sprite = 8,
    Cursor = 7,
    Cookie = 4,
    Lightmap = 6,
    SingleChannel = 10,
    Shadowmask = 11,
    DirectionalLightmap = 12,
    Image = -2147483648,
    Bump = -1,
    Cubemap = -3,
    Reflection = -3,
    Advanced = -5,
    HDRI = -9,
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
  export class SpriteMetaData {
    name: string;
    rect: UnityEngine.Rect;
    alignment: number;
    pivot: UnityEngine.Vector2;
    border: UnityEngine.Vector4;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TextureImporterSettings {
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
    spriteExtrude: System.UInt32;
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
    static Equal(a: UnityEditor.TextureImporterSettings, b: UnityEditor.TextureImporterSettings): boolean;
    CopyTo(target: UnityEditor.TextureImporterSettings): void;
    ApplyTextureType(type: UnityEditor.TextureImporterType, applyAll: boolean): void;
    ApplyTextureType(type: UnityEditor.TextureImporterType): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class TextureImporterPlatformSettings {
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
    CopyTo(target: UnityEditor.TextureImporterPlatformSettings): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetStoreAsset {
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
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AudioCurveRendering {
    constructor();
    static kAudioOrange: UnityEngine.Color;
    static BeginCurveFrame(r: UnityEngine.Rect): UnityEngine.Rect;
    static EndCurveFrame(): void;
    static DrawCurveFrame(r: UnityEngine.Rect): UnityEngine.Rect;
    static DrawCurveBackground(r: UnityEngine.Rect): void;
    static DrawFilledCurve(r: UnityEngine.Rect, eval: UnityEditor.AudioCurveRendering_AudioCurveEvaluator, curveColor: UnityEngine.Color): void;
    static DrawFilledCurve(r: UnityEngine.Rect, eval: UnityEditor.AudioCurveRendering_AudioCurveAndColorEvaluator): void;
    static DrawMinMaxFilledCurve(r: UnityEngine.Rect, eval: UnityEditor.AudioCurveRendering_AudioMinMaxCurveAndColorEvaluator): void;
    static DrawSymmetricFilledCurve(r: UnityEngine.Rect, eval: UnityEditor.AudioCurveRendering_AudioCurveAndColorEvaluator): void;
    static DrawCurve(r: UnityEngine.Rect, eval: UnityEditor.AudioCurveRendering_AudioCurveEvaluator, curveColor: UnityEngine.Color): void;
    static DrawGradientRect(r: UnityEngine.Rect, c1: UnityEngine.Color, c2: UnityEngine.Color, blend: number, horizontal: boolean): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AudioCurveRendering_AudioCurveEvaluator {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(x: number): number;
    BeginInvoke(x: number, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): number;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AudioCurveRendering_AudioCurveAndColorEvaluator {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AudioCurveRendering_AudioMinMaxCurveAndColorEvaluator {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class IAudioEffectPlugin {
    SetFloatParameter(name: string, value: number): boolean;
    GetSampleRate(): number;
    IsPluginEditableAndEnabled(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class IAudioEffectPluginGUI {
    Name: string;
    Description: string;
    Vendor: string;
    OnGUI(plugin: UnityEditor.IAudioEffectPlugin): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Sysroot {
    Name: string;
    HostPlatform: string;
    HostArch: string;
    TargetPlatform: string;
    TargetArch: string;
    Initialize(): boolean;
    GetIl2CppArguments(): System.Collections.Generic.IEnumerable<string>;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class CameraProjectionCache {
    constructor(camera: UnityEngine.Camera);
    WorldToScreenPoint(worldPoint: UnityEngine.Vector3): UnityEngine.Vector2;
    WorldToGUIPoint(worldPoint: UnityEngine.Vector3): UnityEngine.Vector2;
    GUIToScreenPoint(guiPoint: UnityEngine.Vector2): UnityEngine.Vector2;
    ScreenToGUIPoint(screenPoint: UnityEngine.Vector2): UnityEngine.Vector2;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class CommandHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(context: UnityEditor.CommandExecuteContext): void;
    BeginInvoke(context: UnityEditor.CommandExecuteContext, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
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
  export class CommandExecuteContext {
    constructor();
    data: any; // System.Object
    args: any[];
    result: any; // System.Object
    hint: UnityEditor.CommandHint;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class CommandService {
    static GetCommandLabel(commandId: string): string;
    static RegisterCommand(id: string, label: string, handler: UnityEditor.CommandHandler, hint?: UnityEditor.CommandHint): void;
    static RegisterCommand(id: string, handler: UnityEditor.CommandHandler, hint?: UnityEditor.CommandHint): void;
    static UnregisterCommand(id: string): boolean;
    static Exists(id: string): boolean;
    static Execute(id: string): any;
    static Execute(id: string, hint: UnityEditor.CommandHint): any;
    static Execute(id: string, hint: UnityEditor.CommandHint, ...args: any[]): any;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ModeService {
    static modeNames: string[];
    static modeCount: number;
    static currentId: string;
    static currentIndex: number;
    static ChangeModeById(modeId: string): void;
    static Update(): void;
    static HasContextMenu(menuId: string): boolean;
    static PopupContextMenu(menuId: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ModeService_ModeChangedArgs {
    prevIndex: number;
    nextIndex: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
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
  export class LightingDataAsset {
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class LightmapEditorSettings {
    static lightmapper: UnityEditor.LightmapEditorSettings_Lightmapper;
    static lightmapsMode: UnityEngine.LightmapsMode;
    static mixedBakeMode: UnityEngine.MixedLightingMode;
    static sampling: UnityEditor.LightmapEditorSettings_Sampling;
    static directSampleCount: number;
    static indirectSampleCount: number;
    static bounces: number;
    static prioritizeView: boolean;
    static filteringMode: UnityEditor.LightmapEditorSettings_FilterMode;
    static denoiserTypeDirect: UnityEditor.LightmapEditorSettings_DenoiserType;
    static denoiserTypeIndirect: UnityEditor.LightmapEditorSettings_DenoiserType;
    static denoiserTypeAO: UnityEditor.LightmapEditorSettings_DenoiserType;
    static filterTypeDirect: UnityEditor.LightmapEditorSettings_FilterType;
    static filterTypeIndirect: UnityEditor.LightmapEditorSettings_FilterType;
    static filterTypeAO: UnityEditor.LightmapEditorSettings_FilterType;
    static filteringGaussRadiusDirect: number;
    static filteringGaussRadiusIndirect: number;
    static filteringGaussRadiusAO: number;
    static filteringAtrousPositionSigmaDirect: number;
    static filteringAtrousPositionSigmaIndirect: number;
    static filteringAtrousPositionSigmaAO: number;
    static environmentSampleCount: number;
    static maxAtlasSize: number;
    static realtimeResolution: number;
    static bakeResolution: number;
    static textureCompression: boolean;
    static reflectionCubemapCompression: UnityEngine.Rendering.ReflectionCubemapCompression;
    static enableAmbientOcclusion: boolean;
    static aoMaxDistance: number;
    static aoExponentIndirect: number;
    static aoExponentDirect: number;
    static padding: number;
    static exportTrainingData: boolean;
    static trainingDataDestination: string;
    static aoContrast: number;
    static aoAmount: number;
    static lockAtlas: boolean;
    static skyLightColor: UnityEngine.Color;
    static skyLightIntensity: number;
    static quality: UnityEditor.LightmapBakeQuality;
    static bounceBoost: number;
    static finalGatherRays: number;
    static finalGatherContrastThreshold: number;
    static finalGatherGradientThreshold: number;
    static finalGatherInterpolationPoints: number;
    static lastUsedResolution: number;
    static bounceIntensity: number;
    static resolution: number;
    static giBakeBackend: UnityEditor.LightmapEditorSettings_GIBakeBackend;
    static giPathTracerSampling: UnityEditor.LightmapEditorSettings_PathTracerSampling;
    static giPathTracerFilter: UnityEditor.LightmapEditorSettings_PathTracerFilter;
    static maxAtlasWidth: number;
    static maxAtlasHeight: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class LightmapParameters {
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
    static GetLightmapParametersForLightingSettings(lightingSettings: UnityEngine.LightingSettings): UnityEditor.LightmapParameters;
    static SetLightmapParametersForLightingSettings(parameters: UnityEditor.LightmapParameters, lightingSettings: UnityEngine.LightingSettings): void;
    AssignToLightingSettings(lightingSettings: UnityEngine.LightingSettings): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class Lightmapping {
    static giWorkflowMode: UnityEditor.Lightmapping_GIWorkflowMode;
    static realtimeGI: boolean;
    static bakedGI: boolean;
    static indirectOutputScale: number;
    static bounceBoost: number;
    static isRunning: boolean;
    static buildProgress: number;
    static lightingDataAsset: UnityEditor.LightingDataAsset;
    static lightingSettings: UnityEngine.LightingSettings;
    static lightingSettingsDefaults: UnityEngine.LightingSettings;
    static lightmapSnapshot: UnityEditor.LightmapSnapshot;
    static completed: UnityEditor.Lightmapping_OnCompletedFunction;
    static ClearDiskCache(): void;
    static BakeAsync(): boolean;
    static Bake(): boolean;
    static Cancel(): void;
    static ForceStop(): void;
    static Clear(): void;
    static ClearLightingDataAsset(): void;
    static BakeReflectionProbe(probe: UnityEngine.ReflectionProbe, path: string): boolean;
    static SetLightingSettingsForScene(scene: UnityEngine.SceneManagement.Scene, lightingSettings: UnityEngine.LightingSettings): void;
    static SetLightingSettingsForScenes(scenes: UnityEngine.SceneManagement.Scene[], lightingSettings: UnityEngine.LightingSettings): void;
    static GetLightingSettingsForScene(scene: UnityEngine.SceneManagement.Scene): UnityEngine.LightingSettings;
    static BakeMultipleScenes(paths: string[]): void;
    static BakeSelectedAsync(): boolean;
    static BakeSelected(): boolean;
    static BakeLightProbesOnlyAsync(): boolean;
    static BakeLightProbesOnly(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum Lightmapping_GIWorkflowMode {
    Iterative = 0,
    OnDemand = 1,
    Legacy = 2,
  }
  export class Lightmapping_OnStartedFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Lightmapping_OnCompletedFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LightmapSnapshot {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorMaterialUtility {
    constructor();
    static ResetDefaultTextures(material: UnityEngine.Material, overrideSetTextures: boolean): void;
    static IsBackgroundMaterial(material: UnityEngine.Material): boolean;
    static SetShaderDefaults(shader: UnityEngine.Shader, name: string[], textures: UnityEngine.Texture[]): void;
    static SetShaderNonModifiableDefaults(shader: UnityEngine.Shader, name: string[], textures: UnityEngine.Texture[]): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorSnapSettings {
    static gridSnapEnabled: boolean;
    static move: UnityEngine.Vector3;
    static rotate: number;
    static scale: number;
    static ResetSnapSettings(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ColorPickerHDRConfig {
    constructor(minBrightness: number, maxBrightness: number, minExposureValue: number, maxExposureValue: number);
    minBrightness: number;
    maxBrightness: number;
    minExposureValue: number;
    maxExposureValue: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorStyles {
    constructor();
    static label: UnityEngine.GUIStyle;
    static miniLabel: UnityEngine.GUIStyle;
    static largeLabel: UnityEngine.GUIStyle;
    static boldLabel: UnityEngine.GUIStyle;
    static miniBoldLabel: UnityEngine.GUIStyle;
    static centeredGreyMiniLabel: UnityEngine.GUIStyle;
    static wordWrappedMiniLabel: UnityEngine.GUIStyle;
    static wordWrappedLabel: UnityEngine.GUIStyle;
    static linkLabel: UnityEngine.GUIStyle;
    static whiteLabel: UnityEngine.GUIStyle;
    static whiteMiniLabel: UnityEngine.GUIStyle;
    static whiteLargeLabel: UnityEngine.GUIStyle;
    static whiteBoldLabel: UnityEngine.GUIStyle;
    static radioButton: UnityEngine.GUIStyle;
    static miniButton: UnityEngine.GUIStyle;
    static miniButtonLeft: UnityEngine.GUIStyle;
    static miniButtonMid: UnityEngine.GUIStyle;
    static miniButtonRight: UnityEngine.GUIStyle;
    static miniPullDown: UnityEngine.GUIStyle;
    static textField: UnityEngine.GUIStyle;
    static textArea: UnityEngine.GUIStyle;
    static miniTextField: UnityEngine.GUIStyle;
    static numberField: UnityEngine.GUIStyle;
    static popup: UnityEngine.GUIStyle;
    static structHeadingLabel: UnityEngine.GUIStyle;
    static objectField: UnityEngine.GUIStyle;
    static objectFieldThumb: UnityEngine.GUIStyle;
    static objectFieldMiniThumb: UnityEngine.GUIStyle;
    static colorField: UnityEngine.GUIStyle;
    static layerMaskField: UnityEngine.GUIStyle;
    static toggle: UnityEngine.GUIStyle;
    static foldout: UnityEngine.GUIStyle;
    static foldoutPreDrop: UnityEngine.GUIStyle;
    static foldoutHeader: UnityEngine.GUIStyle;
    static foldoutHeaderIcon: UnityEngine.GUIStyle;
    static toggleGroup: UnityEngine.GUIStyle;
    static standardFont: UnityEngine.Font;
    static boldFont: UnityEngine.Font;
    static miniFont: UnityEngine.Font;
    static miniBoldFont: UnityEngine.Font;
    static toolbar: UnityEngine.GUIStyle;
    static toolbarButton: UnityEngine.GUIStyle;
    static toolbarPopup: UnityEngine.GUIStyle;
    static toolbarDropDown: UnityEngine.GUIStyle;
    static toolbarTextField: UnityEngine.GUIStyle;
    static inspectorDefaultMargins: UnityEngine.GUIStyle;
    static inspectorFullWidthMargins: UnityEngine.GUIStyle;
    static helpBox: UnityEngine.GUIStyle;
    static toolbarSearchField: UnityEngine.GUIStyle;
    static selectionRect: UnityEngine.GUIStyle;
    static FromUSS(ussStyleRuleName: string, ussInPlaceStyleOverride?: string): UnityEngine.GUIStyle;
    static FromUSS(baseStyle: UnityEngine.GUIStyle, ussStyleRuleName: string, ussInPlaceStyleOverride?: string): UnityEngine.GUIStyle;
    static ApplyUSS(style: UnityEngine.GUIStyle, ussStyleRuleName: string, ussInPlaceStyleOverride?: string): UnityEngine.GUIStyle;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GenericMenu {
    constructor();
    allowDuplicateNames: boolean;
    AddItem(content: UnityEngine.GUIContent, on: boolean, func: UnityEditor.GenericMenu_MenuFunction): void;
    AddItem(content: UnityEngine.GUIContent, on: boolean, func: UnityEditor.GenericMenu_MenuFunction2, userData: any): void;
    AddDisabledItem(content: UnityEngine.GUIContent): void;
    AddDisabledItem(content: UnityEngine.GUIContent, on: boolean): void;
    AddSeparator(path: string): void;
    GetItemCount(): number;
    ShowAsContext(): void;
    DropDown(position: UnityEngine.Rect): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GenericMenu_MenuFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(): void;
    BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GenericMenu_MenuFunction2 {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(userData: any): void;
    BeginInvoke(userData: any, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export interface IApplyRevertPropertyContextMenuItemProvider {
    GetSourceTerm(): string;
    GetSourceName(comp: UnityEngine.Component): string;
  }
  export class PopupWindowContent {
    editorWindow: UnityEditor.EditorWindow;
    OnGUI(rect: UnityEngine.Rect): void;
    GetWindowSize(): UnityEngine.Vector2;
    OnOpen(): void;
    OnClose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PopupWindow {
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
    static Show(activatorRect: UnityEngine.Rect, windowContent: UnityEditor.PopupWindowContent): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class Tools {
    constructor();
    static current: UnityEditor.Tool;
    static viewTool: UnityEditor.ViewTool;
    static viewToolActive: boolean;
    static handlePosition: UnityEngine.Vector3;
    static handleRect: UnityEngine.Rect;
    static handleRectRotation: UnityEngine.Quaternion;
    static pivotMode: UnityEditor.PivotMode;
    static rectBlueprintMode: boolean;
    static handleRotation: UnityEngine.Quaternion;
    static pivotRotation: UnityEditor.PivotRotation;
    static hidden: boolean;
    static visibleLayers: number;
    static lockedLayers: number;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class CameraEditor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnEnable(): void;
    OnDestroy(): void;
    OnDisable(): void;
    OnInspectorGUI(): void;
    OnOverlayGUI(target: UnityEngine.Object, sceneView: UnityEditor.SceneView): void;
    OnSceneGUI(): void;
    DrawDefaultInspector(): boolean;
    Repaint(): void;
    CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
    RequiresConstantRepaint(): boolean;
    DrawHeader(): void;
    HasPreviewGUI(): boolean;
    GetPreviewTitle(): UnityEngine.GUIContent;
    RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    UseDefaultMargins(): boolean;
    Initialize(targets: UnityEngine.Object[]): void;
    Cleanup(): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class CameraEditor_Settings {
    constructor(so: UnityEditor.SerializedObject);
    static ApertureFormatNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    static ApertureFormatValues: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Vector2]
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
    OnEnable(): void;
    Update(): void;
    ApplyModifiedProperties(): void;
    DrawClearFlags(): void;
    DrawBackgroundColor(): void;
    DrawCullingMask(): void;
    DrawProjection(): void;
    DrawClippingPlanes(): void;
    DrawNormalizedViewPort(): void;
    DrawDepth(): void;
    DrawRenderingPath(): void;
    DrawTargetTexture(deferred: boolean): void;
    DrawOcclusionCulling(): void;
    DrawHDR(): void;
    DrawMSAA(): void;
    DrawDynamicResolution(): void;
    DrawVR(): void;
    DrawMultiDisplay(): void;
    DrawTargetEye(): void;
    static DrawCameraWarnings(camera: UnityEngine.Camera): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class CameraEditorUtils {
    static GameViewAspectRatio: number;
    static HandleFrustum(c: UnityEngine.Camera, cameraEditorTargetIndex: number): void;
    static DrawFrustumGizmo(camera: UnityEngine.Camera): void;
    static IsViewportRectValidToRender(normalizedViewPortRect: UnityEngine.Rect): boolean;
    static GetFrustumAspectRatio(camera: UnityEngine.Camera): number;
    static PerspectiveClipToWorld(clipToWorld: UnityEngine.Matrix4x4, viewPositionWS: UnityEngine.Vector3, positionCS: UnityEngine.Vector3): UnityEngine.Vector3;
    static GetFrustumPlaneAt(clipToWorld: UnityEngine.Matrix4x4, viewPosition: UnityEngine.Vector3, distance: number, points: UnityEngine.Vector3[]): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ObjectPreview {
    constructor();
    target: UnityEngine.Object;
    Cleanup(): void;
    Initialize(targets: UnityEngine.Object[]): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    HasPreviewGUI(): boolean;
    GetPreviewTitle(): UnityEngine.GUIContent;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Editor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static CreateEditorWithContext(targetObjects: UnityEngine.Object[], context: UnityEngine.Object, editorType: System.Type): UnityEditor.Editor;
    static CreateEditorWithContext(targetObjects: UnityEngine.Object[], context: UnityEngine.Object): UnityEditor.Editor;
    static CreateEditor(targetObject: UnityEngine.Object): UnityEditor.Editor;
    static CreateEditor(targetObject: UnityEngine.Object, editorType: System.Type): UnityEditor.Editor;
    static CreateEditor(targetObjects: UnityEngine.Object[]): UnityEditor.Editor;
    static CreateEditor(targetObjects: UnityEngine.Object[], editorType: System.Type): UnityEditor.Editor;
    DrawDefaultInspector(): boolean;
    Repaint(): void;
    OnInspectorGUI(): void;
    CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
    RequiresConstantRepaint(): boolean;
    DrawHeader(): void;
    HasPreviewGUI(): boolean;
    GetPreviewTitle(): UnityEngine.GUIContent;
    RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    UseDefaultMargins(): boolean;
    Initialize(targets: UnityEngine.Object[]): void;
    Cleanup(): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class LightEditor {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    OnInspectorGUI(): void;
    DrawDefaultInspector(): boolean;
    Repaint(): void;
    CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
    RequiresConstantRepaint(): boolean;
    DrawHeader(): void;
    HasPreviewGUI(): boolean;
    GetPreviewTitle(): UnityEngine.GUIContent;
    RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    UseDefaultMargins(): boolean;
    Initialize(targets: UnityEngine.Object[]): void;
    Cleanup(): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class LightEditor_Settings {
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
    OnEnable(): void;
    OnDestroy(): void;
    Update(): void;
    DrawLightType(): void;
    DrawRange(): void;
    DrawRange(showAreaOptions: boolean): void;
    DrawSpotAngle(): void;
    DrawInnerAndOuterSpotAngle(): void;
    DrawArea(): void;
    DrawColor(): void;
    DrawLightmapping(): void;
    DrawIntensity(): void;
    DrawBounceIntensity(): void;
    DrawCookie(): void;
    DrawCookieSize(): void;
    DrawHalo(): void;
    DrawFlare(): void;
    DrawRenderMode(): void;
    DrawCullingMask(): void;
    DrawRenderingLayerMask(): void;
    ApplyModifiedProperties(): void;
    DrawShadowsType(): void;
    DrawBakedShadowRadius(): void;
    DrawBakedShadowAngle(): void;
    DrawRuntimeShadow(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MaterialEditor {
    constructor();
    isVisible: boolean;
    customShaderGUI: UnityEditor.ShaderGUI;
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static kMiniTextureFieldLabelIndentLevel: number;
    SetShader(shader: UnityEngine.Shader): void;
    SetShader(newShader: UnityEngine.Shader, registerUndo: boolean): void;
    Awake(): void;
    OnInspectorGUI(): void;
    PropertiesChanged(): void;
    SetFloat(propertyName: string, value: number): void;
    SetColor(propertyName: string, value: UnityEngine.Color): void;
    SetVector(propertyName: string, value: UnityEngine.Vector4): void;
    SetTexture(propertyName: string, value: UnityEngine.Texture): void;
    SetTextureScale(propertyName: string, value: UnityEngine.Vector2, coord: number): void;
    SetTextureOffset(propertyName: string, value: UnityEngine.Vector2, coord: number): void;
    RangeProperty(prop: UnityEditor.MaterialProperty, label: string): number;
    RangeProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): number;
    IntegerProperty(prop: UnityEditor.MaterialProperty, label: string): number;
    IntegerProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): number;
    FloatProperty(prop: UnityEditor.MaterialProperty, label: string): number;
    FloatProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): number;
    ColorProperty(prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Color;
    ColorProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Color;
    VectorProperty(prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Vector4;
    VectorProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Vector4;
    TextureScaleOffsetProperty(property: UnityEditor.MaterialProperty): void;
    TextureScaleOffsetProperty(position: UnityEngine.Rect, property: UnityEditor.MaterialProperty): number;
    TextureScaleOffsetProperty(position: UnityEngine.Rect, property: UnityEditor.MaterialProperty, partOfTexturePropertyControl: boolean): number;
    TextureProperty(prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Texture;
    TextureProperty(prop: UnityEditor.MaterialProperty, label: string, scaleOffset: boolean): UnityEngine.Texture;
    HelpBoxWithButton(messageContent: UnityEngine.GUIContent, buttonContent: UnityEngine.GUIContent): boolean;
    TextureCompatibilityWarning(prop: UnityEditor.MaterialProperty): void;
    TexturePropertyMiniThumbnail(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, tooltip: string): UnityEngine.Texture;
    GetTexturePropertyCustomArea(position: UnityEngine.Rect): UnityEngine.Rect;
    TextureProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): UnityEngine.Texture;
    TextureProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, scaleOffset: boolean): UnityEngine.Texture;
    TextureProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, tooltip: string, scaleOffset: boolean): UnityEngine.Texture;
    static TextureScaleOffsetProperty(position: UnityEngine.Rect, scaleOffset: UnityEngine.Vector4): UnityEngine.Vector4;
    static TextureScaleOffsetProperty(position: UnityEngine.Rect, scaleOffset: UnityEngine.Vector4, partOfTexturePropertyControl: boolean): UnityEngine.Vector4;
    GetPropertyHeight(prop: UnityEditor.MaterialProperty): number;
    GetPropertyHeight(prop: UnityEditor.MaterialProperty, label: string): number;
    static GetDefaultPropertyHeight(prop: UnityEditor.MaterialProperty): number;
    BeginAnimatedCheck(totalPosition: UnityEngine.Rect, prop: UnityEditor.MaterialProperty): void;
    BeginAnimatedCheck(prop: UnityEditor.MaterialProperty): void;
    EndAnimatedCheck(): void;
    ShaderProperty(prop: UnityEditor.MaterialProperty, label: string): void;
    ShaderProperty(prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent): void;
    ShaderProperty(prop: UnityEditor.MaterialProperty, label: string, labelIndent: number): void;
    ShaderProperty(prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, labelIndent: number): void;
    ShaderProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): void;
    ShaderProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent): void;
    ShaderProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, labelIndent: number): void;
    ShaderProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, labelIndent: number): void;
    LightmapEmissionProperty(): void;
    LightmapEmissionProperty(labelIndent: number): void;
    LightmapEmissionProperty(position: UnityEngine.Rect, labelIndent: number): void;
    EmissionEnabledProperty(): boolean;
    static FixupEmissiveFlag(mat: UnityEngine.Material): void;
    static FixupEmissiveFlag(col: UnityEngine.Color, flags: UnityEngine.MaterialGlobalIlluminationFlags): UnityEngine.MaterialGlobalIlluminationFlags;
    LightmapEmissionFlagsProperty(indent: number, enabled: boolean): void;
    LightmapEmissionFlagsProperty(indent: number, enabled: boolean, ignoreEmissionColor: boolean): void;
    DefaultShaderProperty(prop: UnityEditor.MaterialProperty, label: string): void;
    DefaultShaderProperty(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string): void;
    RangeProperty(propertyName: string, label: string, v2: number, v3: number): number;
    FloatProperty(propertyName: string, label: string): number;
    ColorProperty(propertyName: string, label: string): UnityEngine.Color;
    VectorProperty(propertyName: string, label: string): UnityEngine.Vector4;
    TextureProperty(propertyName: string, label: string, texDim: UnityEditor.ShaderUtil_ShaderPropertyTexDim): UnityEngine.Texture;
    TextureProperty(propertyName: string, label: string, texDim: UnityEditor.ShaderUtil_ShaderPropertyTexDim, scaleOffset: boolean): UnityEngine.Texture;
    ShaderProperty(shader: UnityEngine.Shader, propertyIndex: number): void;
    static GetMaterialProperties(mats: UnityEngine.Object[]): UnityEditor.MaterialProperty[];
    static GetMaterialPropertyNames(mats: UnityEngine.Object[]): string[];
    static GetMaterialProperty(mats: UnityEngine.Object[], name: string): UnityEditor.MaterialProperty;
    static GetMaterialProperty(mats: UnityEngine.Object[], propertyIndex: number): UnityEditor.MaterialProperty;
    static PrepareMaterialPropertiesForAnimationMode(properties: UnityEditor.MaterialProperty[], isMaterialEditable: boolean): UnityEngine.Renderer;
    SetDefaultGUIWidths(): void;
    PropertiesGUI(): boolean;
    PropertiesDefaultGUI(props: UnityEditor.MaterialProperty[]): void;
    static ApplyMaterialPropertyDrawers(material: UnityEngine.Material): void;
    static ApplyMaterialPropertyDrawers(targets: UnityEngine.Object[]): void;
    RegisterPropertyChangeUndo(label: string): void;
    OnPreviewSettings(): void;
    DefaultPreviewSettingsGUI(): void;
    RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
    HasPreviewGUI(): boolean;
    RequiresConstantRepaint(): boolean;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    DefaultPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnEnable(): void;
    UndoRedoPerformed(): void;
    OnDisable(): void;
    RenderQueueField(): void;
    RenderQueueField(r: UnityEngine.Rect): void;
    EnableInstancingField(): boolean;
    EnableInstancingField(r: UnityEngine.Rect): void;
    IsInstancingEnabled(): boolean;
    DoubleSidedGIField(): boolean;
    TexturePropertySingleLine(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty): UnityEngine.Rect;
    TexturePropertySingleLine(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty): UnityEngine.Rect;
    TexturePropertySingleLine(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty, extraProperty2: UnityEditor.MaterialProperty): UnityEngine.Rect;
    TexturePropertyWithHDRColor(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, colorProperty: UnityEditor.MaterialProperty, hdrConfig: UnityEditor.ColorPickerHDRConfig, showAlpha: boolean): UnityEngine.Rect;
    TexturePropertyWithHDRColor(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, colorProperty: UnityEditor.MaterialProperty, showAlpha: boolean): UnityEngine.Rect;
    TexturePropertyTwoLines(label: UnityEngine.GUIContent, textureProp: UnityEditor.MaterialProperty, extraProperty1: UnityEditor.MaterialProperty, label2: UnityEngine.GUIContent, extraProperty2: UnityEditor.MaterialProperty): UnityEngine.Rect;
    static GetRightAlignedFieldRect(r: UnityEngine.Rect): UnityEngine.Rect;
    static GetLeftAlignedFieldRect(r: UnityEngine.Rect): UnityEngine.Rect;
    static GetFlexibleRectBetweenLabelAndField(r: UnityEngine.Rect): UnityEngine.Rect;
    static GetFlexibleRectBetweenFieldAndRightEdge(r: UnityEngine.Rect): UnityEngine.Rect;
    static GetRectAfterLabelWidth(r: UnityEngine.Rect): UnityEngine.Rect;
    DrawDefaultInspector(): boolean;
    Repaint(): void;
    CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
    DrawHeader(): void;
    GetPreviewTitle(): UnityEngine.GUIContent;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    UseDefaultMargins(): boolean;
    Initialize(targets: UnityEngine.Object[]): void;
    Cleanup(): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class MaterialPropertyDrawer {
    OnGUI(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: UnityEngine.GUIContent, editor: UnityEditor.MaterialEditor): void;
    OnGUI(position: UnityEngine.Rect, prop: UnityEditor.MaterialProperty, label: string, editor: UnityEditor.MaterialEditor): void;
    GetPropertyHeight(prop: UnityEditor.MaterialProperty, label: string, editor: UnityEditor.MaterialEditor): number;
    Apply(prop: UnityEditor.MaterialProperty): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MeshPreview {
    constructor(target: UnityEngine.Mesh);
    mesh: UnityEngine.Mesh;
    Dispose(): void;
    RenderStaticPreview(width: number, height: number): UnityEngine.Texture2D;
    OnPreviewGUI(rect: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    static GetInfoString(mesh: UnityEngine.Mesh): string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PreviewRenderUtility {
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
    Cleanup(): void;
    BeginPreview(r: UnityEngine.Rect, previewBackground: UnityEngine.GUIStyle): void;
    BeginStaticPreview(r: UnityEngine.Rect): void;
    GetScaleFactor(width: number, height: number): number;
    BeginStaticPreviewHDR(r: UnityEngine.Rect): void;
    BeginPreviewHDR(r: UnityEngine.Rect, previewBackground: UnityEngine.GUIStyle): void;
    EndPreview(): UnityEngine.Texture;
    EndAndDrawPreview(r: UnityEngine.Rect): void;
    EndStaticPreview(): UnityEngine.Texture2D;
    AddSingleGO(go: UnityEngine.GameObject, instantiateAtZero: boolean): void;
    AddSingleGO(go: UnityEngine.GameObject): void;
    InstantiatePrefabInScene(prefab: UnityEngine.GameObject): UnityEngine.GameObject;
    DrawMesh(mesh: UnityEngine.Mesh, matrix: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number): void;
    DrawMesh(mesh: UnityEngine.Mesh, matrix: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock): void;
    DrawMesh(mesh: UnityEngine.Mesh, m: UnityEngine.Matrix4x4, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean): void;
    DrawMesh(mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number): void;
    DrawMesh(mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock): void;
    DrawMesh(mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform): void;
    DrawMesh(mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean): void;
    DrawMesh(mesh: UnityEngine.Mesh, pos: UnityEngine.Vector3, scale: UnityEngine.Vector3, rot: UnityEngine.Quaternion, mat: UnityEngine.Material, subMeshIndex: number, customProperties: UnityEngine.MaterialPropertyBlock, probeAnchor: UnityEngine.Transform, useLightProbe: boolean): void;
    Render(allowScriptableRenderPipeline?: boolean, updatefov?: boolean): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ShaderGUI {
    OnGUI(materialEditor: UnityEditor.MaterialEditor, properties: UnityEditor.MaterialProperty[]): void;
    OnMaterialPreviewGUI(materialEditor: UnityEditor.MaterialEditor, r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnMaterialInteractivePreviewGUI(materialEditor: UnityEditor.MaterialEditor, r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnMaterialPreviewSettingsGUI(materialEditor: UnityEditor.MaterialEditor): void;
    OnClosed(material: UnityEngine.Material): void;
    AssignNewShaderToMaterial(material: UnityEngine.Material, oldShader: UnityEngine.Shader, newShader: UnityEngine.Shader): void;
    ValidateMaterial(material: UnityEngine.Material): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class TransformUtils {
    static GetInspectorRotation(t: UnityEngine.Transform): UnityEngine.Vector3;
    static SetInspectorRotation(t: UnityEngine.Transform, r: UnityEngine.Vector3): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class PlatformIcon {
    layerCount: number;
    maxLayerCount: number;
    minLayerCount: number;
    width: number;
    height: number;
    kind: UnityEditor.PlatformIconKind;
    GetTexture(layer?: number): UnityEngine.Texture2D;
    GetTextures(): UnityEngine.Texture2D[];
    SetTexture(texture: UnityEngine.Texture2D, layer?: number): void;
    SetTextures(...textures: UnityEngine.Texture2D[]): void;
    ToString(): string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
  }
  export class PlatformIconKind {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PrefabUtility {
    constructor();
    static prefabInstanceUpdated: UnityEditor.PrefabUtility_PrefabInstanceUpdated;
    static GetPrefabObject(targetObject: UnityEngine.Object): UnityEngine.Object;
    static GetPrefabInstanceHandle(instanceComponentOrGameObject: UnityEngine.Object): UnityEngine.Object;
    static HasManagedReferencesWithMissingTypes(assetComponentOrGameObject: UnityEngine.Object): boolean;
    static GetPropertyModifications(targetPrefab: UnityEngine.Object): UnityEditor.PropertyModification[];
    static SetPropertyModifications(targetPrefab: UnityEngine.Object, modifications: UnityEditor.PropertyModification[]): void;
    static HasPrefabInstanceAnyOverrides(instanceRoot: UnityEngine.GameObject, includeDefaultOverrides: boolean): boolean;
    static InstantiateAttachedAsset(targetObject: UnityEngine.Object): UnityEngine.Object;
    static RecordPrefabInstancePropertyModifications(targetObject: UnityEngine.Object): void;
    static MergeAllPrefabInstances(targetObject: UnityEngine.Object): void;
    static DisconnectPrefabInstance(targetObject: UnityEngine.Object): void;
    static UnpackPrefabInstanceAndReturnNewOutermostRoots(instanceRoot: UnityEngine.GameObject, unpackMode: UnityEditor.PrefabUnpackMode): UnityEngine.GameObject[];
    static LoadPrefabContentsIntoPreviewScene(prefabPath: string, scene: UnityEngine.SceneManagement.Scene): void;
    static ConnectGameObjectToPrefab(go: UnityEngine.GameObject, sourcePrefab: UnityEngine.GameObject): UnityEngine.GameObject;
    static FindRootGameObjectWithSameParentPrefab(target: UnityEngine.GameObject): UnityEngine.GameObject;
    static FindValidUploadPrefabInstanceRoot(target: UnityEngine.GameObject): UnityEngine.GameObject;
    static ReconnectToLastPrefab(go: UnityEngine.GameObject): boolean;
    static ResetToPrefabState(obj: UnityEngine.Object): boolean;
    static IsAddedComponentOverride(component: UnityEngine.Object): boolean;
    static RevertPrefabInstance(go: UnityEngine.GameObject): boolean;
    static FindPrefabRoot(source: UnityEngine.GameObject): UnityEngine.GameObject;
    static IsPartOfAnyPrefab(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfPrefabAsset(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfPrefabInstance(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfNonAssetPrefabInstance(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfRegularPrefab(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfModelPrefab(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfVariantPrefab(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPartOfImmutablePrefab(componentOrGameObject: UnityEngine.Object): boolean;
    static IsDisconnectedFromPrefabAsset(componentOrGameObject: UnityEngine.Object): boolean;
    static IsPrefabAssetMissing(instanceComponentOrGameObject: UnityEngine.Object): boolean;
    static GetOutermostPrefabInstanceRoot(componentOrGameObject: UnityEngine.Object): UnityEngine.GameObject;
    static GetNearestPrefabInstanceRoot(componentOrGameObject: UnityEngine.Object): UnityEngine.GameObject;
    static IsDefaultOverride(modification: UnityEditor.PropertyModification): boolean;
    static FindAllInstancesOfPrefab(prefabRoot: UnityEngine.GameObject): UnityEngine.GameObject[];
    static FindAllInstancesOfPrefab(prefabRoot: UnityEngine.GameObject, scene: UnityEngine.SceneManagement.Scene): UnityEngine.GameObject[];
    static MergePrefabInstance(instanceRoot: UnityEngine.GameObject): void;
    static RevertPrefabInstance(instanceRoot: UnityEngine.GameObject, action: UnityEditor.InteractionMode): void;
    static ApplyPrefabInstance(instanceRoot: UnityEngine.GameObject, action: UnityEditor.InteractionMode): void;
    static ApplyPropertyOverride(instanceProperty: UnityEditor.SerializedProperty, assetPath: string, action: UnityEditor.InteractionMode): void;
    static RevertPropertyOverride(instanceProperty: UnityEditor.SerializedProperty, action: UnityEditor.InteractionMode): void;
    static ApplyObjectOverride(instanceComponentOrGameObject: UnityEngine.Object, assetPath: string, action: UnityEditor.InteractionMode): void;
    static RevertObjectOverride(instanceComponentOrGameObject: UnityEngine.Object, action: UnityEditor.InteractionMode): void;
    static ApplyAddedComponent(component: UnityEngine.Component, assetPath: string, action: UnityEditor.InteractionMode): void;
    static RevertAddedComponent(component: UnityEngine.Component, action: UnityEditor.InteractionMode): void;
    static ApplyRemovedComponent(instanceGameObject: UnityEngine.GameObject, assetComponent: UnityEngine.Component, action: UnityEditor.InteractionMode): void;
    static RevertRemovedComponent(instanceGameObject: UnityEngine.GameObject, assetComponent: UnityEngine.Component, action: UnityEditor.InteractionMode): void;
    static ApplyAddedGameObject(gameObject: UnityEngine.GameObject, assetPath: string, action: UnityEditor.InteractionMode): void;
    static ApplyAddedGameObjects(gameObjects: UnityEngine.GameObject[], assetPath: string, action: UnityEditor.InteractionMode): void;
    static RevertAddedGameObject(gameObject: UnityEngine.GameObject, action: UnityEditor.InteractionMode): void;
    static GetObjectOverrides(prefabInstance: UnityEngine.GameObject, includeDefaultOverrides?: boolean): UnityEditor.SceneManagement.ObjectOverride[];
    static GetAddedComponents(prefabInstance: UnityEngine.GameObject): UnityEditor.SceneManagement.AddedComponent[];
    static GetRemovedComponents(prefabInstance: UnityEngine.GameObject): UnityEditor.SceneManagement.RemovedComponent[];
    static GetAddedGameObjects(prefabInstance: UnityEngine.GameObject): UnityEditor.SceneManagement.AddedGameObject[];
    static IsAnyPrefabInstanceRoot(gameObject: UnityEngine.GameObject): boolean;
    static IsOutermostPrefabInstanceRoot(gameObject: UnityEngine.GameObject): boolean;
    static GetPrefabAssetPathOfNearestInstanceRoot(instanceComponentOrGameObject: UnityEngine.Object): string;
    static GetIconForGameObject(gameObject: UnityEngine.GameObject): UnityEngine.Texture2D;
    static GetPrefabParent(obj: UnityEngine.Object): UnityEngine.Object;
    static CreateEmptyPrefab(path: string): UnityEngine.Object;
    static SavePrefabAsset(asset: UnityEngine.GameObject): UnityEngine.GameObject;
    static SaveAsPrefabAsset(instanceRoot: UnityEngine.GameObject, assetPath: string): UnityEngine.GameObject;
    static SaveAsPrefabAssetAndConnect(instanceRoot: UnityEngine.GameObject, assetPath: string, action: UnityEditor.InteractionMode): UnityEngine.GameObject;
    static CreatePrefab(path: string, go: UnityEngine.GameObject): UnityEngine.GameObject;
    static CreatePrefab(path: string, go: UnityEngine.GameObject, options: UnityEditor.ReplacePrefabOptions): UnityEngine.GameObject;
    static InstantiatePrefab(assetComponentOrGameObject: UnityEngine.Object): UnityEngine.Object;
    static InstantiatePrefab(assetComponentOrGameObject: UnityEngine.Object, destinationScene: UnityEngine.SceneManagement.Scene): UnityEngine.Object;
    static InstantiatePrefab(assetComponentOrGameObject: UnityEngine.Object, parent: UnityEngine.Transform): UnityEngine.Object;
    static ReplacePrefab(go: UnityEngine.GameObject, targetPrefab: UnityEngine.Object): UnityEngine.GameObject;
    static ReplacePrefab(go: UnityEngine.GameObject, targetPrefab: UnityEngine.Object, replaceOptions: UnityEditor.ReplacePrefabOptions): UnityEngine.GameObject;
    static GetPrefabType(target: UnityEngine.Object): UnityEditor.PrefabType;
    static IsAddedGameObjectOverride(gameObject: UnityEngine.GameObject): boolean;
    static UnpackPrefabInstance(instanceRoot: UnityEngine.GameObject, unpackMode: UnityEditor.PrefabUnpackMode, action: UnityEditor.InteractionMode): void;
    static UnpackAllInstancesOfPrefab(prefabRoot: UnityEngine.GameObject, unpackMode: UnityEditor.PrefabUnpackMode, action: UnityEditor.InteractionMode): void;
    static IsPartOfPrefabThatCanBeAppliedTo(gameObjectOrComponent: UnityEngine.Object): boolean;
    static GetPrefabInstanceStatus(componentOrGameObject: UnityEngine.Object): UnityEditor.PrefabInstanceStatus;
    static GetPrefabAssetType(componentOrGameObject: UnityEngine.Object): UnityEditor.PrefabAssetType;
    static LoadPrefabContents(assetPath: string): UnityEngine.GameObject;
    static UnloadPrefabContents(contentsRoot: UnityEngine.GameObject): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PrefabUtility_PrefabInstanceUpdated {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(instance: UnityEngine.GameObject): void;
    BeginInvoke(instance: UnityEngine.GameObject, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PrefabUtility_EditPrefabContentsScope {
    constructor(assetPath: string);
    assetPath: string;
    prefabContentsRoot: UnityEngine.GameObject;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
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
  export class PropertyModification {
    constructor();
    target: UnityEngine.Object;
    propertyPath: string;
    value: string;
    objectReference: UnityEngine.Object;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum SaveType {
    Binary = 0,
    Text = 1,
  }
  export class Progress {
    static running: boolean;
    static globalProgress: number;
    static globalRemainingTime: System.TimeSpan;
    static Start(name: string, description?: string, options?: UnityEditor.Progress_Options, parentId?: number): number;
    static Finish(id: number, status?: UnityEditor.Progress_Status): void;
    static Remove(id: number): number;
    static Remove(id: number, forceSynchronous: boolean): number;
    static Report(id: number, progress: number): void;
    static Report(id: number, currentStep: number, totalSteps: number): void;
    static Report(id: number, progress: number, description: string): void;
    static Report(id: number, currentStep: number, totalSteps: number, description: string): void;
    static Cancel(id: number): boolean;
    static RegisterCancelCallback(id: number, callback: (() => boolean)): void;
    static UnregisterCancelCallback(id: number): void;
    static Pause(id: number): boolean;
    static Resume(id: number): boolean;
    static RegisterPauseCallback(id: number, callback: ((arg0: boolean) => boolean)): void;
    static UnregisterPauseCallback(id: number): void;
    static GetCount(): number;
    static GetCountPerStatus(): number[];
    static GetProgress(id: number): number;
    static GetCurrentStep(id: number): number;
    static GetTotalSteps(id: number): number;
    static GetName(id: number): string;
    static GetDescription(id: number): string;
    static SetDescription(id: number, description: string): void;
    static GetStartDateTime(id: number): System.Int64;
    static GetUpdateDateTime(id: number): System.Int64;
    static GetParentId(id: number): number;
    static GetId(index: number): number;
    static IsCancellable(id: number): boolean;
    static IsPausable(id: number): boolean;
    static GetStatus(id: number): UnityEditor.Progress_Status;
    static GetOptions(id: number): UnityEditor.Progress_Options;
    static SetTimeDisplayMode(id: number, displayMode: UnityEditor.Progress_TimeDisplayMode): void;
    static SetRemainingTime(id: number, seconds: System.Int64): void;
    static SetPriority(id: number, priority: number): void;
    static SetPriority(id: number, priority: UnityEditor.Progress_Priority): void;
    static GetTimeDisplayMode(id: number): UnityEditor.Progress_TimeDisplayMode;
    static Exists(id: number): boolean;
    static GetRemainingTime(id: number): System.Int64;
    static GetPriority(id: number): number;
    static ClearRemainingTime(id: number): void;
    static SetStepLabel(id: number, label: string): void;
    static GetStepLabel(id: number): string;
    static ShowDetails(shouldReposition?: boolean): void;
    static EnumerateItems(): any;
    static GetProgressById(id: number): UnityEditor.Progress_Item;
    static GetRunningProgressCount(): number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class Progress_Item {
    name: string;
    description: string;
    id: number;
    progress: number;
    currentStep: number;
    totalSteps: number;
    stepLabel: string;
    parentId: number;
    startTime: System.DateTime;
    updateTime: System.DateTime;
    status: UnityEditor.Progress_Status;
    options: UnityEditor.Progress_Options;
    timeDisplayMode: UnityEditor.Progress_TimeDisplayMode;
    priority: number;
    remainingTime: System.TimeSpan;
    finished: boolean;
    running: boolean;
    paused: boolean;
    responding: boolean;
    cancellable: boolean;
    pausable: boolean;
    indefinite: boolean;
    elapsedTime: number;
    exists: boolean;
    Report(newProgress: number): void;
    Report(newCurrentStep: number, newTotalSteps: number): void;
    Report(newProgress: number, newDescription: string): void;
    Report(newCurrentStep: number, newTotalSteps: number, newDescription: string): void;
    Cancel(): boolean;
    Pause(): boolean;
    Resume(): boolean;
    Finish(finishedStatus?: UnityEditor.Progress_Status): void;
    Remove(): number;
    RegisterCancelCallback(callback: (() => boolean)): void;
    UnregisterCancelCallback(): void;
    RegisterPauseCallback(callback: ((arg0: boolean) => boolean)): void;
    UnregisterPauseCallback(): void;
    SetDescription(newDescription: string): void;
    SetTimeDisplayMode(mode: UnityEditor.Progress_TimeDisplayMode): void;
    SetRemainingTime(seconds: System.Int64): void;
    SetPriority(priority: number): void;
    SetPriority(priority: UnityEditor.Progress_Priority): void;
    ClearRemainingTime(): void;
    SetStepLabel(label: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ProjectWindowUtil {
    constructor();
    static CreateNewGUISkin(): void;
    static CreateAsset(asset: UnityEngine.Object, pathName: string): void;
    static CreateFolder(): void;
    static CreateScene(): void;
    static CreateAssetWithContent(filename: string, content: string, icon?: UnityEngine.Texture2D): void;
    static CreateScriptAssetFromTemplateFile(templatePath: string, defaultNewFileName: string): void;
    static ShowCreatedAsset(o: UnityEngine.Object): void;
    static StartNameEditingIfProjectWindowExists(instanceID: number, endAction: UnityEditor.ProjectWindowCallback.EndNameEditAction, pathName: string, icon: UnityEngine.Texture2D, resourceFile: string): void;
    static GetAncestors(instanceID: number): number[];
    static IsFolder(instanceID: number): boolean;
    static GetContainingFolder(path: string): string;
    static GetBaseFolders(folders: string[]): string[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SearchableEditorWindow {
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
    OnEnable(): void;
    OnDisable(): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class DefaultLightingExplorerExtension {
    constructor();
    GetContentTabs(): UnityEditor.LightingExplorerTab[];
    OnEnable(): void;
    OnDisable(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LightingExplorerTab {
    constructor(title: string, objects: (() => UnityEngine.Object[]), columns: (() => UnityEditor.LightingExplorerTableColumn[]), showFilterGUI?: boolean);
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LightingExplorerTableColumn {
    constructor(type: UnityEditor.LightingExplorerTableColumn_DataType, headerContent: UnityEngine.GUIContent, propertyName?: string, width?: number, onGUIDelegate?: UnityEditor.LightingExplorerTableColumn_OnGUIDelegate, compareDelegate?: UnityEditor.LightingExplorerTableColumn_ComparePropertiesDelegate, copyDelegate?: UnityEditor.LightingExplorerTableColumn_CopyPropertiesDelegate, dependencyIndices?: number[]);
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class LightingExplorerTableColumn_OnGUIDelegate {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(r: UnityEngine.Rect, prop: UnityEditor.SerializedProperty, dependencies: UnityEditor.SerializedProperty[]): void;
    BeginInvoke(r: UnityEngine.Rect, prop: UnityEditor.SerializedProperty, dependencies: UnityEditor.SerializedProperty[], callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LightingExplorerTableColumn_ComparePropertiesDelegate {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(lhs: UnityEditor.SerializedProperty, rhs: UnityEditor.SerializedProperty): number;
    BeginInvoke(lhs: UnityEditor.SerializedProperty, rhs: UnityEditor.SerializedProperty, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): number;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LightingExplorerTableColumn_CopyPropertiesDelegate {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(target: UnityEditor.SerializedProperty, source: UnityEditor.SerializedProperty): void;
    BeginInvoke(target: UnityEditor.SerializedProperty, source: UnityEditor.SerializedProperty, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export interface ILightingExplorerExtension {
    GetContentTabs(): UnityEditor.LightingExplorerTab[];
    OnEnable(): void;
    OnDisable(): void;
  }
  export class LightingWindowEnvironmentSection {
    OnEnable(): void;
    OnDisable(): void;
    OnInspectorGUI(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SceneModeUtility {
    static SearchForType(type: System.Type): void;
    static SearchBar(...types: System.Type[]): System.Type;
    static StaticFlagField(label: string, property: UnityEditor.SerializedProperty, flag: number): boolean;
    static SetStaticFlags(targetObjects: UnityEngine.Object[], changedFlags: number, flagValue: boolean): boolean;
    static GetObjects(gameObjects: UnityEngine.Object[], includeChildren: boolean): UnityEngine.GameObject[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SceneView {
    constructor();
    static lastActiveSceneView: UnityEditor.SceneView;
    static currentDrawingSceneView: UnityEditor.SceneView;
    static selectedOutlineColor: UnityEngine.Color;
    isUsingSceneFiltering: boolean;
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
    static sceneViews: System.Collections.ArrayList;
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
    static lastActiveSceneViewChanged: ((arg0: UnityEditor.SceneView, arg1: UnityEditor.SceneView) => void);
    m_SceneLighting: boolean;
    m_AudioPlay: boolean;
    static onSceneGUIDelegate: UnityEditor.SceneView_OnSceneFunc;
    m_RenderMode: UnityEditor.DrawCameraMode;
    m_ValidateTrueMetals: boolean;
    ResetCameraSettings(): void;
    SetSceneViewShaderReplace(shader: UnityEngine.Shader, replaceString: string): void;
    static FrameLastActiveSceneView(): boolean;
    static FrameLastActiveSceneViewWithLock(): boolean;
    static GetAllSceneCameras(): UnityEngine.Camera[];
    static RepaintAll(): void;
    OnEnable(): void;
    OnDisable(): void;
    OnDestroy(): void;
    AddItemsToMenu(menu: UnityEditor.GenericMenu): void;
    IsCameraDrawModeSupported(mode: UnityEditor.SceneView_CameraMode): boolean;
    IsCameraDrawModeEnabled(mode: UnityEditor.SceneView_CameraMode): boolean;
    FixNegativeSize(): void;
    LookAt(point: UnityEngine.Vector3): void;
    LookAt(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion): void;
    LookAtDirect(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion): void;
    LookAt(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number): void;
    LookAtDirect(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number): void;
    LookAt(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number, ortho: boolean): void;
    LookAt(point: UnityEngine.Vector3, direction: UnityEngine.Quaternion, newSize: number, ortho: boolean, instant: boolean): void;
    AlignViewToObject(t: UnityEngine.Transform): void;
    AlignWithView(): void;
    MoveToView(): void;
    MoveToView(target: UnityEngine.Transform): void;
    FrameSelected(): boolean;
    FrameSelected(lockView: boolean): boolean;
    FrameSelected(lockView: boolean, instant: boolean): boolean;
    Frame(bounds: UnityEngine.Bounds, instant?: boolean): boolean;
    static AddCameraMode(name: string, section: string): UnityEditor.SceneView_CameraMode;
    static ClearUserDefinedCameraModes(): void;
    static GetBuiltinCameraMode(mode: UnityEditor.DrawCameraMode): UnityEditor.SceneView_CameraMode;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class SceneView_CameraMode {
    drawMode: UnityEditor.DrawCameraMode;
    name: string;
    section: string;
    Equals(otherObject: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class SceneView_SceneViewState {
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
    IsAllOn(): boolean;
    Toggle(value: boolean): void;
    SetAllEnabled(value: boolean): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SceneView_OnSceneFunc {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(sceneView: UnityEditor.SceneView): void;
    BeginInvoke(sceneView: UnityEditor.SceneView, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): void;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SceneView_CameraSettings {
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
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class DecoratorDrawer {
    attribute: any; // UnityEngine.PropertyAttribute
    OnGUI(position: UnityEngine.Rect): void;
    GetHeight(): number;
    CanCacheInspectorGUI(): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class GUIDrawer {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PropertyDrawer {
    attribute: any; // UnityEngine.PropertyAttribute
    fieldInfo: System.Reflection.FieldInfo;
    OnGUI(position: UnityEngine.Rect, property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): void;
    CreatePropertyGUI(property: UnityEditor.SerializedProperty): UnityEngine.UIElements.VisualElement;
    GetPropertyHeight(property: UnityEditor.SerializedProperty, label: UnityEngine.GUIContent): number;
    CanCacheInspectorGUI(property: UnityEditor.SerializedProperty): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum SettingsScope {
    User = 0,
    Project = 1,
  }
  export class SettingsProvider {
    constructor(path: string, scopes: UnityEditor.SettingsScope, keywords?: System.Collections.Generic.IEnumerable<string>);
    label: string;
    settingsPath: string;
    scope: UnityEditor.SettingsScope;
    keywords: System.Collections.Generic.IEnumerable<string>;
    guiHandler: ((arg0: string) => void);
    titleBarGuiHandler: (() => void);
    footerBarGuiHandler: (() => void);
    activateHandler: ((arg0: string, arg1: UnityEngine.UIElements.VisualElement) => void);
    deactivateHandler: (() => void);
    hasSearchInterestHandler: ((arg0: string) => boolean);
    inspectorUpdateHandler: (() => void);
    OnActivate(searchContext: string, rootElement: UnityEngine.UIElements.VisualElement): void;
    OnDeactivate(): void;
    HasSearchInterest(searchContext: string): boolean;
    OnGUI(searchContext: string): void;
    OnTitleBarGUI(): void;
    OnFooterBarGUI(): void;
    OnInspectorUpdate(): void;
    Repaint(): void;
    static GetSearchKeywordsFromSerializedObject(serializedObject: UnityEditor.SerializedObject): any;
    static GetSearchKeywordsFromPath(path: string): any;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class SettingsService {
    static OpenProjectSettings(settingsPath?: string): UnityEditor.EditorWindow;
    static OpenUserPreferences(settingsPath?: string): UnityEditor.EditorWindow;
    static NotifySettingsProviderChanged(): void;
    static RepaintAllSettingsWindow(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class AssetSettingsProvider {
    constructor(settingsWindowPath: string, editorCreator: (() => UnityEditor.Editor), keywords?: System.Collections.Generic.IEnumerable<string>);
    constructor(settingsWindowPath: string, settingsGetter: (() => UnityEngine.Object));
    settingsEditor: UnityEditor.Editor;
    label: string;
    settingsPath: string;
    scope: UnityEditor.SettingsScope;
    keywords: System.Collections.Generic.IEnumerable<string>;
    guiHandler: ((arg0: string) => void);
    titleBarGuiHandler: (() => void);
    footerBarGuiHandler: (() => void);
    activateHandler: ((arg0: string, arg1: UnityEngine.UIElements.VisualElement) => void);
    deactivateHandler: (() => void);
    hasSearchInterestHandler: ((arg0: string) => boolean);
    inspectorUpdateHandler: (() => void);
    static CreateProviderFromAssetPath(settingsWindowPath: string, assetPath: string, keywords?: any): UnityEditor.AssetSettingsProvider;
    static CreateProviderFromObject(settingsWindowPath: string, settingsObj: UnityEngine.Object, keywords?: any): UnityEditor.AssetSettingsProvider;
    static CreateProviderFromResourcePath(settingsWindowPath: string, resourcePath: string, keywords?: any): UnityEditor.AssetSettingsProvider;
    OnActivate(searchContext: string, rootElement: UnityEngine.UIElements.VisualElement): void;
    OnDeactivate(): void;
    OnGUI(searchContext: string): void;
    OnTitleBarGUI(): void;
    OnFooterBarGUI(): void;
    HasSearchInterest(searchContext: string): boolean;
    OnInspectorUpdate(): void;
    Repaint(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Highlighter {
    constructor();
    static activeText: string;
    static activeRect: UnityEngine.Rect;
    static activeVisible: boolean;
    static active: boolean;
    static Stop(): void;
    static Highlight(windowTitle: string, text: string): boolean;
    static Highlight(windowTitle: string, text: string, mode: UnityEditor.HighlightSearchMode): boolean;
    static HighlightIdentifier(position: UnityEngine.Rect, identifier: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class ObjectChangeEvents {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ObjectChangeEvents_ObjectChangeEventsHandler {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ChangeGameObjectParentEventArgs {
    constructor(instanceId: number, previousScene: UnityEngine.SceneManagement.Scene, previousParentInstanceId: number, newScene: UnityEngine.SceneManagement.Scene, newParentInstanceId: number);
    instanceId: number;
    previousParentInstanceId: number;
    newParentInstanceId: number;
    previousScene: UnityEngine.SceneManagement.Scene;
    newScene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ChangeSceneEventArgs {
    constructor(scene: UnityEngine.SceneManagement.Scene);
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class CreateGameObjectHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ChangeGameObjectStructureHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ChangeGameObjectStructureEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ChangeGameObjectOrComponentPropertiesEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class DestroyGameObjectHierarchyEventArgs {
    constructor(instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    constructor(instanceId: number, parentInstanceId: number, scene: UnityEngine.SceneManagement.Scene);
    instanceId: number;
    parentInstanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class CreateAssetObjectEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class DestroyAssetObjectEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ChangeAssetObjectPropertiesEventArgs {
    constructor(guid: UnityEditor.GUID, instanceId: number, scene: UnityEngine.SceneManagement.Scene);
    guid: UnityEditor.GUID;
    instanceId: number;
    scene: UnityEngine.SceneManagement.Scene;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class UpdatePrefabInstancesEventArgs {
    constructor(scene: UnityEngine.SceneManagement.Scene, instanceIds: Unity.Collections.NativeArray<number>);
    scene: UnityEngine.SceneManagement.Scene;
    instanceIds: Unity.Collections.NativeArray<number>;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ObjectChangeEventStream {
    length: number;
    isCreated: boolean;
    GetEventType(eventIdx: number): UnityEditor.ObjectChangeKind;
    Clone(allocator: Unity.Collections.Allocator): UnityEditor.ObjectChangeEventStream;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ObjectChangeEventStream_Builder {
    constructor(allocator: Unity.Collections.Allocator);
    eventCount: number;
    ToStream(allocator: Unity.Collections.Allocator): UnityEditor.ObjectChangeEventStream;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class UndoPropertyModification {
    keepPrefabOverride: boolean;
    previousValue: UnityEditor.PropertyModification;
    currentValue: UnityEditor.PropertyModification;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class UndoSnapshot {
    constructor(objectsToUndo: UnityEngine.Object[]);
    Restore(): void;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class CloudProjectSettings {
    constructor();
    static userId: string;
    static userName: string;
    static accessToken: string;
    static projectId: string;
    static projectName: string;
    static organizationId: string;
    static organizationName: string;
    static RefreshAccessToken(refresh: ((arg0: boolean) => void)): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ExpressionEvaluator {
    constructor();
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class MathUtils {
    constructor();
    static GetQuatLength(q: UnityEngine.Quaternion): number;
    static GetQuatConjugate(q: UnityEngine.Quaternion): UnityEngine.Quaternion;
    static OrthogonalizeMatrix(m: UnityEngine.Matrix4x4): UnityEngine.Matrix4x4;
    static QuaternionFromMatrix(m: UnityEngine.Matrix4x4): UnityEngine.Quaternion;
    static GetQuatLog(q: UnityEngine.Quaternion): UnityEngine.Quaternion;
    static GetQuatExp(q: UnityEngine.Quaternion): UnityEngine.Quaternion;
    static GetQuatSquad(t: number, q0: UnityEngine.Quaternion, q1: UnityEngine.Quaternion, a0: UnityEngine.Quaternion, a1: UnityEngine.Quaternion): UnityEngine.Quaternion;
    static GetSquadIntermediate(q0: UnityEngine.Quaternion, q1: UnityEngine.Quaternion, q2: UnityEngine.Quaternion): UnityEngine.Quaternion;
    static Ease(t: number, k1: number, k2: number): number;
    static Slerp(p: UnityEngine.Quaternion, q: UnityEngine.Quaternion, t: number): UnityEngine.Quaternion;
    static IntersectRayTriangle(ray: UnityEngine.Ray, v0: UnityEngine.Vector3, v1: UnityEngine.Vector3, v2: UnityEngine.Vector3, bidirectional: boolean): any;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export enum AssetPathToGUIDOptions {
    IncludeRecentlyDeletedAssets = 0,
    OnlyExistingAssets = 1,
  }
  export class CacheServerConnectionChangedParameters {
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
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
  export class AudioImporterSampleSettings {
    loadType: UnityEngine.AudioClipLoadType;
    sampleRateSetting: UnityEditor.AudioSampleRateSetting;
    sampleRateOverride: System.UInt32;
    compressionFormat: UnityEngine.AudioCompressionFormat;
    quality: number;
    conversionMode: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class AudioImporter {
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ContainsSampleSettingsOverride(platform: string): boolean;
    GetOverrideSampleSettings(platform: string): UnityEditor.AudioImporterSampleSettings;
    SetOverrideSampleSettings(platform: string, settings: UnityEditor.AudioImporterSampleSettings): boolean;
    ClearSampleSettingOverride(platform: string): boolean;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class MonoImporter {
    constructor();
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    SetDefaultReferences(name: string[], target: UnityEngine.Object[]): void;
    static GetAllRuntimeMonoScripts(): UnityEditor.MonoScript[];
    static SetExecutionOrder(script: UnityEditor.MonoScript, order: number): void;
    static GetExecutionOrder(script: UnityEditor.MonoScript): number;
    GetScript(): UnityEditor.MonoScript;
    GetDefaultReference(name: string): UnityEngine.Object;
    SetIcon(icon: UnityEngine.Texture2D): void;
    GetIcon(): UnityEngine.Texture2D;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class MovieImporter {
    constructor();
    quality: number;
    linearTexture: boolean;
    duration: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PluginImporter {
    constructor();
    DefineConstraints: string[];
    isPreloaded: boolean;
    isNativePlugin: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    static GetImporters(platformName: string): UnityEditor.PluginImporter[];
    static GetImporters(platform: UnityEditor.BuildTarget): UnityEditor.PluginImporter[];
    static GetImporters(buildTargetGroup: string, buildTarget: string): UnityEditor.PluginImporter[];
    static GetImporters(buildTargetGroup: UnityEditor.BuildTargetGroup, buildTarget: UnityEditor.BuildTarget): UnityEditor.PluginImporter[];
    ClearSettings(): void;
    SetCompatibleWithAnyPlatform(enable: boolean): void;
    GetCompatibleWithAnyPlatform(): boolean;
    SetExcludeFromAnyPlatform(platformName: string, excludedFromAny: boolean): void;
    GetExcludeFromAnyPlatform(platformName: string): boolean;
    SetIncludeInBuildDelegate(includeInBuildDelegate: UnityEditor.PluginImporter_IncludeInBuildDelegate): void;
    SetExcludeFromAnyPlatform(platform: UnityEditor.BuildTarget, excludedFromAny: boolean): void;
    GetExcludeFromAnyPlatform(platform: UnityEditor.BuildTarget): boolean;
    SetExcludeEditorFromAnyPlatform(excludedFromAny: boolean): void;
    GetExcludeEditorFromAnyPlatform(): boolean;
    SetCompatibleWithEditor(enable: boolean): void;
    GetCompatibleWithEditor(): boolean;
    GetCompatibleWithEditor(buildTargetGroup: string, buildTarget: string): boolean;
    GetIsOverridable(): boolean;
    ShouldIncludeInBuild(): boolean;
    SetCompatibleWithPlatform(platform: UnityEditor.BuildTarget, enable: boolean): void;
    GetCompatibleWithPlatform(platform: UnityEditor.BuildTarget): boolean;
    SetCompatibleWithPlatform(platformName: string, enable: boolean): void;
    GetCompatibleWithPlatform(platformName: string): boolean;
    SetPlatformData(platform: UnityEditor.BuildTarget, key: string, value: string): void;
    GetPlatformData(platform: UnityEditor.BuildTarget, key: string): string;
    SetPlatformData(platformName: string, key: string, value: string): void;
    GetPlatformData(platformName: string, key: string): string;
    SetEditorData(key: string, value: string): void;
    GetEditorData(key: string): string;
    static GetAllImporters(): UnityEditor.PluginImporter[];
    SetIcon(className: string, icon: UnityEngine.Texture2D): void;
    GetIcon(className: string): UnityEngine.Texture2D;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PluginImporter_IncludeInBuildDelegate {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(path: string): boolean;
    BeginInvoke(path: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): boolean;
    GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetInvocationList(): System.Delegate[];
    DynamicInvoke(...args: any[]): any;
    Clone(): any;
    GetType(): System.Type;
    ToString(): string;
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
  export enum VideoEncodingProfile {
    H264Baseline = 0,
    H264Main = 1,
    H264High = 2,
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
  export class VideoImporterTargetSettings {
    constructor();
    enableTranscoding: boolean;
    codec: UnityEditor.VideoCodec;
    resizeMode: UnityEditor.VideoResizeMode;
    aspectRatio: UnityEditor.VideoEncodeAspectRatio;
    customWidth: number;
    customHeight: number;
    bitrateMode: UnityEditor.VideoBitrateMode;
    spatialQuality: UnityEditor.VideoSpatialQuality;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class VideoClipImporter {
    constructor();
    quality: number;
    linearColor: boolean;
    useLegacyImporter: boolean;
    sourceFileSize: System.UInt64;
    outputFileSize: System.UInt64;
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
    sourceAudioTrackCount: System.UInt16;
    pixelAspectRatioNumerator: number;
    pixelAspectRatioDenominator: number;
    transcodeSkipped: boolean;
    assetPath: string;
    importSettingsMissing: boolean;
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetTargetSettings(platform: string): UnityEditor.VideoImporterTargetSettings;
    SetTargetSettings(platform: string, settings: UnityEditor.VideoImporterTargetSettings): void;
    ClearTargetSettings(platform: string): void;
    PlayPreview(): void;
    StopPreview(): void;
    GetPreviewTexture(): UnityEngine.Texture;
    GetResizeModeName(mode: UnityEditor.VideoResizeMode): string;
    GetResizeWidth(mode: UnityEditor.VideoResizeMode): number;
    GetResizeHeight(mode: UnityEditor.VideoResizeMode): number;
    GetSourceAudioChannelCount(audioTrackIdx: System.UInt16): System.UInt16;
    GetSourceAudioSampleRate(audioTrackIdx: System.UInt16): System.UInt32;
    Equals(rhs: UnityEditor.VideoClipImporter): boolean;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
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
  export class ClipAnimationInfoCurve {
    name: string;
    curve: UnityEngine.AnimationCurve;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ModelImporterClipAnimation {
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
    ConfigureClipFromMask(mask: UnityEngine.AvatarMask): void;
    Equals(o: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class HumanTemplate {
    constructor();
    name: string;
    hideFlags: UnityEngine.HideFlags;
    Insert(name: string, templateName: string): void;
    Find(name: string): string;
    ClearTemplate(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TakeInfo {
    name: string;
    defaultClipName: string;
    startTime: number;
    stopTime: number;
    bakeStartTime: number;
    bakeStopTime: number;
    sampleRate: number;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ModelImporter {
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
    optimizeBones: boolean;
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
    removeConstantScaleCurves: boolean;
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    CreateDefaultMaskForClip(clip: UnityEditor.ModelImporterClipAnimation): void;
    ExtractTextures(folderPath: string): boolean;
    SearchAndRemapMaterials(nameOption: UnityEditor.ModelImporterMaterialName, searchOption: UnityEditor.ModelImporterMaterialSearch): boolean;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class EditorJsonUtility {
    static ToJson(obj: any): string;
    static ToJson(obj: any, prettyPrint: boolean): string;
    static FromJsonOverwrite(json: string, objectToOverwrite: any): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class L10n {
    static Tr(str: string): string;
    static Tr(str_list: string[]): string[];
    static Tr(str: string, groupName: string): string;
    static TrPath(path: string): string;
    static TextContent(text: string, tooltip?: string, icon?: UnityEngine.Texture): UnityEngine.GUIContent;
    static TextContent(text: string, tooltip: string, iconName: string): UnityEngine.GUIContent;
    static TextContent(text: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, iconName: string): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, tooltip: string, iconName: string): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, tooltip: string, icon: UnityEngine.Texture): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, tooltip: string, messageType: UnityEditor.MessageType): UnityEngine.GUIContent;
    static TextContentWithIcon(text: string, messageType: UnityEditor.MessageType): UnityEngine.GUIContent;
    static IconContent(iconName: string, tooltip?: string): UnityEngine.GUIContent;
    static IconContent(icon: UnityEngine.Texture, tooltip?: string): UnityEngine.GUIContent;
    static TempContent(t: string): UnityEngine.GUIContent;
    static TempContent(texts: string[]): UnityEngine.GUIContent[];
    static TempContent(texts: string[], tooltips: string[]): UnityEngine.GUIContent[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class LocalizationGroup {
    constructor();
    constructor(behaviour: UnityEngine.Behaviour);
    constructor(type: System.Type);
    constructor(obj: any);
    locGroupName: string;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class PhysicsDebugWindow {
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
    static ShowWindow(): UnityEditor.PhysicsDebugWindow;
    OnEnable(): void;
    OnDisable(): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class PhysicsVisualizationSettings {
    static devOptions: boolean;
    static dirtyCount: number;
    static filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow;
    static showCollisionGeometry: boolean;
    static enableMouseSelect: boolean;
    static useSceneCam: boolean;
    static viewDistance: number;
    static terrainTilesMax: number;
    static forceOverdraw: boolean;
    static staticColor: UnityEngine.Color;
    static rigidbodyColor: UnityEngine.Color;
    static kinematicColor: UnityEngine.Color;
    static triggerColor: UnityEngine.Color;
    static sleepingBodyColor: UnityEngine.Color;
    static baseAlpha: number;
    static colorVariance: number;
    static dotAlpha: number;
    static forceDot: boolean;
    static Reset(): void;
    static GetShowStaticColliders(): boolean;
    static SetShowStaticColliders(show: boolean): void;
    static GetShowTriggers(): boolean;
    static SetShowTriggers(show: boolean): void;
    static GetShowRigidbodies(): boolean;
    static SetShowRigidbodies(show: boolean): void;
    static GetShowKinematicBodies(): boolean;
    static SetShowKinematicBodies(show: boolean): void;
    static GetShowSleepingBodies(): boolean;
    static SetShowSleepingBodies(show: boolean): void;
    static GetShowCollisionLayer(layer: number): boolean;
    static SetShowCollisionLayer(layer: number, show: boolean): void;
    static GetShowCollisionLayerMask(): number;
    static SetShowCollisionLayerMask(mask: number): void;
    static GetShowBoxColliders(): boolean;
    static SetShowBoxColliders(show: boolean): void;
    static GetShowSphereColliders(): boolean;
    static SetShowSphereColliders(show: boolean): void;
    static GetShowCapsuleColliders(): boolean;
    static SetShowCapsuleColliders(show: boolean): void;
    static GetShowMeshColliders(colliderType: UnityEditor.PhysicsVisualizationSettings_MeshColliderType): boolean;
    static SetShowMeshColliders(colliderType: UnityEditor.PhysicsVisualizationSettings_MeshColliderType, show: boolean): void;
    static GetShowTerrainColliders(): boolean;
    static SetShowTerrainColliders(show: boolean): void;
    static GetShowPhysicsSceneMask(): number;
    static SetShowPhysicsSceneMask(mask: number): void;
    static InitDebugDraw(): void;
    static DeinitDebugDraw(): void;
    static ClearMouseHighlight(): void;
    static HasMouseHighlight(): boolean;
    static UpdateMouseHighlight(screenPos: UnityEngine.Vector2): void;
    static SetShowForAllFilters(selected: boolean): void;
    static GetShowStaticColliders(filterWorkFlow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowStaticColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowTriggers(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowTriggers(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowRigidbodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowRigidbodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowKinematicBodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowKinematicBodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowSleepingBodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowSleepingBodies(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowCollisionLayer(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, layer: number): boolean;
    static SetShowCollisionLayer(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, layer: number, show: boolean): void;
    static GetShowCollisionLayerMask(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): number;
    static SetShowCollisionLayerMask(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, mask: number): void;
    static GetShowBoxColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowBoxColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowSphereColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowSphereColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowCapsuleColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowCapsuleColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowMeshColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, colliderType: UnityEditor.PhysicsVisualizationSettings_MeshColliderType): boolean;
    static SetShowMeshColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, colliderType: UnityEditor.PhysicsVisualizationSettings_MeshColliderType, show: boolean): void;
    static GetShowTerrainColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): boolean;
    static SetShowTerrainColliders(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, show: boolean): void;
    static GetShowPhysicsSceneMask(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow): number;
    static SetShowPhysicsSceneMask(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, mask: number): void;
    static SetShowForAllFilters(filterWorkflow: UnityEditor.PhysicsVisualizationSettings_FilterWorkflow, selected: boolean): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum PhysicsVisualizationSettings_FilterWorkflow {
    HideSelectedItems = 0,
    ShowSelectedItems = 1,
  }
  export enum PhysicsVisualizationSettings_MeshColliderType {
    Convex = 0,
    NonConvex = 1,
  }
  export class ProfilerWindow {
    selectedModuleName: string;
    selectedModuleIdentifier: string;
    selectedFrameIndex: System.Int64;
    firstAvailableFrameIndex: System.Int64;
    lastAvailableFrameIndex: System.Int64;
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
    static cpuModuleName: string;
    static gpuModuleName: string;
    static cpuModuleIdentifier: string;
    static gpuModuleIdentifier: string;
    GetFrameTimeViewSampleSelectionController(moduleIdentifier: string): UnityEditor.Profiling.IProfilerFrameTimeViewSampleSelectionController;
    SelectAndStayOnLatestFrame(): void;
    BeginWindows(): void;
    EndWindows(): void;
    ShowNotification(notification: UnityEngine.GUIContent): void;
    ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
    RemoveNotification(): void;
    ShowTab(): void;
    Focus(): void;
    ShowUtility(): void;
    ShowPopup(): void;
    ShowModalUtility(): void;
    ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
    Show(): void;
    Show(immediateDisplay: boolean): void;
    ShowAuxWindow(): void;
    ShowModal(): void;
    SaveChanges(): void;
    DiscardChanges(): void;
    Close(): void;
    Repaint(): void;
    SendEvent(e: UnityEngine.Event): boolean;
    GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class NetworkDetailStats {
    constructor();
    static NewProfilerTick(newTime: number): void;
    static SetStat(direction: UnityEditor.NetworkDetailStats_NetworkDirection, msgId: System.Int16, entryName: string, amount: number): void;
    static IncrementStat(direction: UnityEditor.NetworkDetailStats_NetworkDirection, msgId: System.Int16, entryName: string, amount: number): void;
    static ResetAll(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum NetworkDetailStats_NetworkDirection {
    Incoming = 0,
    Outgoing = 1,
  }
  export class SketchUpImportCamera {
    position: UnityEngine.Vector3;
    lookAt: UnityEngine.Vector3;
    up: UnityEngine.Vector3;
    fieldOfView: number;
    aspectRatio: number;
    orthoSize: number;
    nearPlane: number;
    farPlane: number;
    isPerspective: boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class SketchUpImportScene {
    camera: UnityEditor.SketchUpImportCamera;
    name: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    ToString(): string;
    GetType(): System.Type;
  }
  export class SketchUpImporter {
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
    optimizeBones: boolean;
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
    removeConstantScaleCurves: boolean;
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GetScenes(): UnityEditor.SketchUpImportScene[];
    GetDefaultCamera(): UnityEditor.SketchUpImportCamera;
    CreateDefaultMaskForClip(clip: UnityEditor.ModelImporterClipAnimation): void;
    ExtractTextures(folderPath: string): boolean;
    SearchAndRemapMaterials(nameOption: UnityEditor.ModelImporterMaterialName, searchOption: UnityEditor.ModelImporterMaterialSearch): boolean;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class TerrainLayerInspector {
    constructor();
    target: UnityEngine.Object;
    targets: UnityEngine.Object[];
    serializedObject: UnityEditor.SerializedObject;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    ApplyCustomUI(customUI: UnityEditor.ITerrainLayerCustomUI, terrain: any): void;
    OnInspectorGUI(): void;
    HasPreviewGUI(): boolean;
    OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
    DrawDefaultInspector(): boolean;
    Repaint(): void;
    CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
    RequiresConstantRepaint(): boolean;
    DrawHeader(): void;
    GetPreviewTitle(): UnityEngine.GUIContent;
    OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
    OnPreviewSettings(): void;
    GetInfoString(): string;
    DrawPreview(previewArea: UnityEngine.Rect): void;
    ReloadPreviewInstances(): void;
    UseDefaultMargins(): boolean;
    Initialize(targets: UnityEngine.Object[]): void;
    Cleanup(): void;
    MoveNextTarget(): boolean;
    ResetTarget(): void;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export interface ITerrainLayerCustomUI {
    OnTerrainLayerGUI(terrainLayer: any, terrain: any): boolean;
  }
  export class TerrainLayerUtility {
    static ShowTerrainLayersSelectionHelper(terrain: any, activeTerrainLayer: number): number;
    static ValidateDiffuseTextureUI(texture: UnityEngine.Texture2D): void;
    static CheckNormalMapTextureType(texture: UnityEngine.Texture2D): boolean;
    static ValidateNormalMapTextureUI(texture: UnityEngine.Texture2D, normalMapTextureType: boolean): void;
    static ValidateMaskMapTextureUI(texture: UnityEngine.Texture2D): void;
    static TilingSettingsUI(terrainLayer: any): void;
    static TilingSettingsUI(tileSize: UnityEditor.SerializedProperty, tileOffset: UnityEditor.SerializedProperty): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
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
  export class TrueTypeFontImporter {
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
    assetTimeStamp: System.UInt64;
    userData: string;
    assetBundleName: string;
    assetBundleVariant: string;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    GenerateEditableFont(path: string): UnityEngine.Font;
    SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
    SaveAndReimport(): void;
    AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
    RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
    GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
    SupportsRemappedAssetType(type: System.Type): boolean;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class GridPalette {
    constructor();
    transparencySortMode: UnityEngine.TransparencySortMode;
    transparencySortAxis: UnityEngine.Vector3;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    cellSizing: UnityEditor.GridPalette_CellSizing;
    SetDirty(): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export enum GridPalette_CellSizing {
    Automatic = 0,
    Manual = 100,
  }
  export class EditorAnalytics {
    static enabled: boolean;
    static RegisterEventWithLimit(eventName: string, maxEventPerHour: number, maxItems: number, vendorKey: string): UnityEngine.Analytics.AnalyticsResult;
    static RegisterEventWithLimit(eventName: string, maxEventPerHour: number, maxItems: number, vendorKey: string, ver: number): UnityEngine.Analytics.AnalyticsResult;
    static SendEventWithLimit(eventName: string, parameters: any): UnityEngine.Analytics.AnalyticsResult;
    static SendEventWithLimit(eventName: string, parameters: any, ver: number): UnityEngine.Analytics.AnalyticsResult;
    static SetEventWithLimitEndPoint(eventName: string, endPoint: string, ver: number): UnityEngine.Analytics.AnalyticsResult;
    static SetEventWithLimitPriority(eventName: string, eventPriority: UnityEngine.Analytics.AnalyticsEventPriority, ver: number): UnityEngine.Analytics.AnalyticsResult;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class EditorAnalyticsSessionInfo {
    static id: System.Int64;
    static sessionCount: System.Int64;
    static elapsedTime: System.Int64;
    static focusedElapsedTime: System.Int64;
    static playbackElapsedTime: System.Int64;
    static activeElapsedTime: System.Int64;
    static userId: string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export namespace Advertisements {
    export class AdvertisementSettings {
      static enabled: boolean;
      static testMode: boolean;
      static initializeOnStartup: boolean;
      static GetGameId(platform: UnityEngine.RuntimePlatform): string;
      static SetGameId(platform: UnityEngine.RuntimePlatform, gameId: string): void;
      static IsPlatformEnabled(platform: UnityEngine.RuntimePlatform): boolean;
      static SetPlatformEnabled(platform: UnityEngine.RuntimePlatform, value: boolean): void;
      static GetPlatformGameId(platformName: string): string;
      static SetPlatformGameId(platformName: string, gameId: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace AI {
    export class NavMeshEditorHelpers {
      static OpenAgentSettings(agentTypeID: number): void;
      static OpenAreaSettings(): void;
      static DrawAgentDiagram(rect: UnityEngine.Rect, agentRadius: number, agentHeight: number, agentClimb: number, agentSlope: number): void;
      static DrawBuildDebug(navMeshData: UnityEngine.AI.NavMeshData): void;
      static DrawBuildDebug(navMeshData: UnityEngine.AI.NavMeshData, flags: UnityEngine.AI.NavMeshBuildDebugFlags): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class NavMeshBuilder {
      constructor();
      static navMeshSettingsObject: UnityEngine.Object;
      static isRunning: boolean;
      static BuildNavMesh(): void;
      static BuildNavMeshAsync(): void;
      static ClearAllNavMeshes(): void;
      static Cancel(): void;
      static BuildNavMeshForMultipleScenes(paths: string[]): void;
      static CollectSourcesInStage(includedWorldBounds: UnityEngine.Bounds, includedLayerMask: number, geometry: UnityEngine.AI.NavMeshCollectGeometry, defaultArea: number, markups: UnityEngine.AI.NavMeshBuildMarkup[], stageProxy: UnityEngine.SceneManagement.Scene, results: UnityEngine.AI.NavMeshBuildSource[]): void;
      static CollectSourcesInStage(root: UnityEngine.Transform, includedLayerMask: number, geometry: UnityEngine.AI.NavMeshCollectGeometry, defaultArea: number, markups: UnityEngine.AI.NavMeshBuildMarkup[], stageProxy: UnityEngine.SceneManagement.Scene, results: UnityEngine.AI.NavMeshBuildSource[]): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class NavMeshVisualizationSettings {
      constructor();
      static showNavigation: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Analytics {
    export class AnalyticsSettings {
      static enabled: boolean;
      static testMode: boolean;
      static initializeOnStartup: boolean;
      static deviceStatsEnabledInBuild: boolean;
      static eventUrl: string;
      static configUrl: string;
      static dashboardUrl: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnalyticsSettings_RequireInBuildDelegate {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(): boolean;
      BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): boolean;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PerformanceReportingSettings {
      static enabled: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Android {
    export interface IPostGenerateGradleAndroidProject {
      OnPostGenerateGradleAndroidProject(path: string): void;
    }
  }
  export namespace AnimatedValues {
    export class BaseAnimValueNonAlloc<T = any> {
      isAnimating: boolean;
      target: T;
      value: T;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseAnimValue<T = any> {
      isAnimating: boolean;
      target: T;
      value: T;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimFloat {
      constructor(value: number);
      constructor(value: number, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: number;
      value: number;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimVector3 {
      constructor();
      constructor(value: UnityEngine.Vector3);
      constructor(value: UnityEngine.Vector3, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: UnityEngine.Vector3;
      value: UnityEngine.Vector3;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimBool {
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
      Fade(from: number, to: number): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimQuaternion {
      constructor(value: UnityEngine.Quaternion);
      constructor(value: UnityEngine.Quaternion, callback: UnityEngine.Events.UnityAction);
      isAnimating: boolean;
      target: UnityEngine.Quaternion;
      value: UnityEngine.Quaternion;
      speed: number;
      valueChanged: UnityEngine.Events.UnityEvent;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Animations {
    export class AnimatorController {
      constructor();
      layers: UnityEditor.Animations.AnimatorControllerLayer[];
      parameters: UnityEngine.AnimatorControllerParameter[];
      animationClips: UnityEngine.AnimationClip[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      static SetAnimatorController(animator: UnityEngine.Animator, controller: UnityEditor.Animations.AnimatorController): void;
      MakeUniqueParameterName(name: string): string;
      MakeUniqueLayerName(name: string): string;
      static FindStateMachineBehaviourContext(behaviour: UnityEngine.StateMachineBehaviour): UnityEditor.Animations.StateMachineBehaviourContext[];
      static CreateStateMachineBehaviour(script: UnityEditor.MonoScript): number;
      AddEffectiveStateMachineBehaviour(stateMachineBehaviourType: System.Type, state: UnityEditor.Animations.AnimatorState, layerIndex: number): UnityEngine.StateMachineBehaviour;
      AddLayer(name: string): void;
      AddLayer(layer: UnityEditor.Animations.AnimatorControllerLayer): void;
      RemoveLayer(index: number): void;
      AddParameter(name: string, type: UnityEngine.AnimatorControllerParameterType): void;
      AddParameter(paramater: UnityEngine.AnimatorControllerParameter): void;
      RemoveParameter(index: number): void;
      RemoveParameter(parameter: UnityEngine.AnimatorControllerParameter): void;
      AddMotion(motion: UnityEngine.Motion): UnityEditor.Animations.AnimatorState;
      AddMotion(motion: UnityEngine.Motion, layerIndex: number): UnityEditor.Animations.AnimatorState;
      static CreateAnimatorControllerAtPath(path: string): UnityEditor.Animations.AnimatorController;
      static AllocateAnimatorClip(name: string): UnityEngine.AnimationClip;
      static CreateAnimatorControllerAtPathWithClip(path: string, clip: UnityEngine.AnimationClip): UnityEditor.Animations.AnimatorController;
      SetStateEffectiveMotion(state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion): void;
      SetStateEffectiveMotion(state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion, layerIndex: number): void;
      GetStateEffectiveMotion(state: UnityEditor.Animations.AnimatorState): UnityEngine.Motion;
      GetStateEffectiveMotion(state: UnityEditor.Animations.AnimatorState, layerIndex: number): UnityEngine.Motion;
      SetStateEffectiveBehaviours(state: UnityEditor.Animations.AnimatorState, layerIndex: number, behaviours: UnityEngine.StateMachineBehaviour[]): void;
      GetStateEffectiveBehaviours(state: UnityEditor.Animations.AnimatorState, layerIndex: number): UnityEngine.StateMachineBehaviour[];
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum AnimatorLayerBlendingMode {
      Override = 0,
      Additive = 1,
    }
    export class AnimatorControllerLayer {
      constructor();
      name: string;
      stateMachine: UnityEditor.Animations.AnimatorStateMachine;
      avatarMask: UnityEngine.AvatarMask;
      blendingMode: UnityEditor.Animations.AnimatorLayerBlendingMode;
      syncedLayerIndex: number;
      iKPass: boolean;
      defaultWeight: number;
      syncedLayerAffectsTiming: boolean;
      GetOverrideMotion(state: UnityEditor.Animations.AnimatorState): UnityEngine.Motion;
      SetOverrideMotion(state: UnityEditor.Animations.AnimatorState, motion: UnityEngine.Motion): void;
      GetOverrideBehaviours(state: UnityEditor.Animations.AnimatorState): UnityEngine.StateMachineBehaviour[];
      SetOverrideBehaviours(state: UnityEditor.Animations.AnimatorState, behaviours: UnityEngine.StateMachineBehaviour[]): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum BlendTreeType {
      Simple1D = 0,
      SimpleDirectional2D = 1,
      FreeformDirectional2D = 2,
      FreeformCartesian2D = 3,
      Direct = 4,
    }
    export class ChildMotion {
      motion: UnityEngine.Motion;
      threshold: number;
      position: UnityEngine.Vector2;
      timeScale: number;
      cycleOffset: number;
      directBlendParameter: string;
      mirror: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class BlendTree {
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
      AddChild(motion: UnityEngine.Motion): void;
      AddChild(motion: UnityEngine.Motion, position: UnityEngine.Vector2): void;
      AddChild(motion: UnityEngine.Motion, threshold: number): void;
      RemoveChild(index: number): void;
      CreateBlendTreeChild(threshold: number): UnityEditor.Animations.BlendTree;
      CreateBlendTreeChild(position: UnityEngine.Vector2): UnityEditor.Animations.BlendTree;
      ValidateIfRetargetable(val: boolean): boolean;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
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
    export class AnimatorCondition {
      mode: UnityEditor.Animations.AnimatorConditionMode;
      parameter: string;
      threshold: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AnimatorTransitionBase {
      solo: boolean;
      mute: boolean;
      isExit: boolean;
      destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine;
      destinationState: UnityEditor.Animations.AnimatorState;
      conditions: UnityEditor.Animations.AnimatorCondition[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetDisplayName(source: UnityEngine.Object): string;
      AddCondition(mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string): void;
      RemoveCondition(condition: UnityEditor.Animations.AnimatorCondition): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AnimatorTransition {
      constructor();
      solo: boolean;
      mute: boolean;
      isExit: boolean;
      destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine;
      destinationState: UnityEditor.Animations.AnimatorState;
      conditions: UnityEditor.Animations.AnimatorCondition[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetDisplayName(source: UnityEngine.Object): string;
      AddCondition(mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string): void;
      RemoveCondition(condition: UnityEditor.Animations.AnimatorCondition): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AnimatorStateTransition {
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
      GetDisplayName(source: UnityEngine.Object): string;
      AddCondition(mode: UnityEditor.Animations.AnimatorConditionMode, threshold: number, parameter: string): void;
      RemoveCondition(condition: UnityEditor.Animations.AnimatorCondition): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AnimatorState {
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
      AddStateMachineBehaviour(stateMachineBehaviourType: System.Type): UnityEngine.StateMachineBehaviour;
      AddTransition(transition: UnityEditor.Animations.AnimatorStateTransition): void;
      RemoveTransition(transition: UnityEditor.Animations.AnimatorStateTransition): void;
      AddTransition(destinationState: UnityEditor.Animations.AnimatorState): UnityEditor.Animations.AnimatorStateTransition;
      AddTransition(destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorStateTransition;
      AddTransition(destinationState: UnityEditor.Animations.AnimatorState, defaultExitTime: boolean): UnityEditor.Animations.AnimatorStateTransition;
      AddTransition(destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine, defaultExitTime: boolean): UnityEditor.Animations.AnimatorStateTransition;
      AddExitTransition(): UnityEditor.Animations.AnimatorStateTransition;
      AddExitTransition(defaultExitTime: boolean): UnityEditor.Animations.AnimatorStateTransition;
      GetMotion(): UnityEngine.Motion;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ChildAnimatorState {
      state: UnityEditor.Animations.AnimatorState;
      position: UnityEngine.Vector3;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ChildAnimatorStateMachine {
      stateMachine: UnityEditor.Animations.AnimatorStateMachine;
      position: UnityEngine.Vector3;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AnimatorStateMachine {
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
      GetStateMachineTransitions(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorTransition[];
      SetStateMachineTransitions(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, transitions: UnityEditor.Animations.AnimatorTransition[]): void;
      AddStateMachineBehaviour(stateMachineBehaviourType: System.Type): UnityEngine.StateMachineBehaviour;
      MakeUniqueStateName(name: string): string;
      MakeUniqueStateMachineName(name: string): string;
      AddState(name: string): UnityEditor.Animations.AnimatorState;
      AddState(name: string, position: UnityEngine.Vector3): UnityEditor.Animations.AnimatorState;
      AddState(state: UnityEditor.Animations.AnimatorState, position: UnityEngine.Vector3): void;
      RemoveState(state: UnityEditor.Animations.AnimatorState): void;
      AddStateMachine(name: string): UnityEditor.Animations.AnimatorStateMachine;
      AddStateMachine(name: string, position: UnityEngine.Vector3): UnityEditor.Animations.AnimatorStateMachine;
      AddStateMachine(stateMachine: UnityEditor.Animations.AnimatorStateMachine, position: UnityEngine.Vector3): void;
      RemoveStateMachine(stateMachine: UnityEditor.Animations.AnimatorStateMachine): void;
      AddAnyStateTransition(destinationState: UnityEditor.Animations.AnimatorState): UnityEditor.Animations.AnimatorStateTransition;
      AddAnyStateTransition(destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorStateTransition;
      RemoveAnyStateTransition(transition: UnityEditor.Animations.AnimatorStateTransition): boolean;
      AddStateMachineTransition(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorTransition;
      AddStateMachineTransition(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorTransition;
      AddStateMachineTransition(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, destinationState: UnityEditor.Animations.AnimatorState): UnityEditor.Animations.AnimatorTransition;
      AddStateMachineExitTransition(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorTransition;
      RemoveStateMachineTransition(sourceStateMachine: UnityEditor.Animations.AnimatorStateMachine, transition: UnityEditor.Animations.AnimatorTransition): boolean;
      AddEntryTransition(destinationState: UnityEditor.Animations.AnimatorState): UnityEditor.Animations.AnimatorTransition;
      AddEntryTransition(destinationStateMachine: UnityEditor.Animations.AnimatorStateMachine): UnityEditor.Animations.AnimatorTransition;
      RemoveEntryTransition(transition: UnityEditor.Animations.AnimatorTransition): boolean;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class StateMachineBehaviourContext {
      constructor();
      animatorController: UnityEditor.Animations.AnimatorController;
      animatorObject: UnityEngine.Object;
      layerIndex: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CurveFilterOptions {
      positionError: number;
      rotationError: number;
      scaleError: number;
      floatError: number;
      keyframeReduction: boolean;
      unrollRotation: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class GameObjectRecorder {
      constructor(root: UnityEngine.GameObject);
      constructor();
      root: UnityEngine.GameObject;
      currentTime: number;
      isRecording: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      BindComponentsOfType(target: UnityEngine.GameObject, componentType: System.Type, recursive: boolean): void;
      Bind(binding: UnityEditor.EditorCurveBinding): void;
      BindAll(target: UnityEngine.GameObject, recursive: boolean): void;
      BindComponent(component: UnityEngine.Component): void;
      GetBindings(): UnityEditor.EditorCurveBinding[];
      TakeSnapshot(dt: number): void;
      SaveToClip(clip: UnityEngine.AnimationClip): void;
      SaveToClip(clip: UnityEngine.AnimationClip, fps: number): void;
      SaveToClip(clip: UnityEngine.AnimationClip, fps: number, filterOptions: UnityEditor.Animations.CurveFilterOptions): void;
      ResetRecording(): void;
      BindComponent(target: UnityEngine.GameObject, componentType: System.Type, recursive: boolean): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace AssetImporters {
    export class AssetImportContext {
      assetPath: string;
      selectedBuildTarget: UnityEditor.BuildTarget;
      mainObject: UnityEngine.Object;
      GetResultPath(extension: string): string;
      SetMainObject(obj: UnityEngine.Object): void;
      AddObjectToAsset(identifier: string, obj: UnityEngine.Object): void;
      GetObjects(objects: UnityEngine.Object[]): void;
      AddObjectToAsset(identifier: string, obj: UnityEngine.Object, thumbnail: UnityEngine.Texture2D): void;
      DependsOnSourceAsset(path: string): void;
      DependsOnSourceAsset(guid: UnityEditor.GUID): void;
      GetArtifactFilePath(path: string, fileName: string): string;
      GetArtifactFilePath(guid: UnityEditor.GUID, fileName: string): string;
      GetArtifactFilePath(key: UnityEditor.Experimental.ArtifactKey, fileName: string): string;
      GetOutputArtifactFilePath(fileName: string): string;
      DependsOnArtifact(key: UnityEditor.Experimental.ArtifactKey): void;
      DependsOnArtifact(guid: UnityEditor.GUID): void;
      DependsOnArtifact(path: string): void;
      DependsOnCustomDependency(dependency: string): void;
      LogImportError(msg: string, obj?: UnityEngine.Object): void;
      LogImportWarning(msg: string, obj?: UnityEngine.Object): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CameraDescription {
      constructor();
      Dispose(): void;
      GetVector4PropertyNames(names: string[]): void;
      GetFloatPropertyNames(names: string[]): void;
      GetStringPropertyNames(names: string[]): void;
      GetIntPropertyNames(names: string[]): void;
      HasAnimationCurveInClip(clipName: string, propertyName: string): boolean;
      HasAnimationCurve(propertyName: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class LightDescription {
      constructor();
      Dispose(): void;
      GetVector4PropertyNames(names: string[]): void;
      GetFloatPropertyNames(names: string[]): void;
      GetStringPropertyNames(names: string[]): void;
      GetIntPropertyNames(names: string[]): void;
      HasAnimationCurveInClip(clipName: string, propertyName: string): boolean;
      HasAnimationCurve(propertyName: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TexturePropertyDescription {
      offset: UnityEngine.Vector2;
      scale: UnityEngine.Vector2;
      texture: UnityEngine.Texture;
      relativePath: string;
      path: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class MaterialDescription {
      constructor();
      materialName: string;
      Dispose(): void;
      GetVector4PropertyNames(names: string[]): void;
      GetFloatPropertyNames(names: string[]): void;
      GetTexturePropertyNames(names: string[]): void;
      GetStringPropertyNames(names: string[]): void;
      HasAnimationCurveInClip(clipName: string, propertyName: string): boolean;
      HasAnimationCurve(propertyName: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SpriteImportData {
      name: string;
      rect: UnityEngine.Rect;
      alignment: UnityEngine.SpriteAlignment;
      pivot: UnityEngine.Vector2;
      border: UnityEngine.Vector4;
      outline: UnityEngine.Vector2[][];
      tessellationDetail: number;
      spriteID: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class TextureGenerationOutput {
      texture: UnityEngine.Texture2D;
      output: UnityEngine.Texture;
      importInspectorWarnings: string;
      importWarnings: string[];
      thumbNail: UnityEngine.Texture2D;
      sprites: UnityEngine.Sprite[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class SourceTextureInformation {
      constructor();
      width: number;
      height: number;
      containsAlpha: boolean;
      hdr: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextureGenerationSettings {
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class TextureGenerator {
      static GenerateTexture(settings: UnityEditor.AssetImporters.TextureGenerationSettings, colorBuffer: any): UnityEditor.AssetImporters.TextureGenerationOutput;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FBXMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion(): System.UInt32;
      GetPostprocessOrder(): number;
      OnPreprocessMaterialDescription(description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]): void;
      LogWarning(warning: string): void;
      LogWarning(warning: string, context: UnityEngine.Object): void;
      LogError(warning: string): void;
      LogError(warning: string, context: UnityEngine.Object): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SketchupMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion(): System.UInt32;
      GetPostprocessOrder(): number;
      OnPreprocessMaterialDescription(description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]): void;
      LogWarning(warning: string): void;
      LogWarning(warning: string, context: UnityEngine.Object): void;
      LogError(warning: string): void;
      LogError(warning: string, context: UnityEngine.Object): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ThreeDSMaterialDescriptionPreprocessor {
      constructor();
      assetPath: string;
      context: UnityEditor.AssetImporters.AssetImportContext;
      assetImporter: UnityEditor.AssetImporter;
      preview: UnityEngine.Texture2D;
      GetVersion(): System.UInt32;
      GetPostprocessOrder(): number;
      OnPreprocessMaterialDescription(description: UnityEditor.AssetImporters.MaterialDescription, material: UnityEngine.Material, clips: UnityEngine.AnimationClip[]): void;
      LogWarning(warning: string): void;
      LogWarning(warning: string, context: UnityEngine.Object): void;
      LogError(warning: string): void;
      LogError(warning: string, context: UnityEngine.Object): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssetImporterEditor {
      showImportedObject: boolean;
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: UnityEditor.SerializedObject;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      DrawPreview(previewArea: UnityEngine.Rect): void;
      OnEnable(): void;
      OnDisable(): void;
      OnInspectorGUI(): void;
      HasModified(): boolean;
      DrawDefaultInspector(): boolean;
      Repaint(): void;
      CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
      RequiresConstantRepaint(): boolean;
      DrawHeader(): void;
      HasPreviewGUI(): boolean;
      GetPreviewTitle(): UnityEngine.GUIContent;
      RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
      OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
      OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
      OnPreviewSettings(): void;
      GetInfoString(): string;
      ReloadPreviewInstances(): void;
      UseDefaultMargins(): boolean;
      Initialize(targets: UnityEngine.Object[]): void;
      Cleanup(): void;
      MoveNextTarget(): boolean;
      ResetTarget(): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ScriptedImporterEditor {
      constructor();
      showImportedObject: boolean;
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: UnityEditor.SerializedObject;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      DrawPreview(previewArea: UnityEngine.Rect): void;
      OnEnable(): void;
      OnDisable(): void;
      OnInspectorGUI(): void;
      HasModified(): boolean;
      DrawDefaultInspector(): boolean;
      Repaint(): void;
      CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
      RequiresConstantRepaint(): boolean;
      DrawHeader(): void;
      HasPreviewGUI(): boolean;
      GetPreviewTitle(): UnityEngine.GUIContent;
      RenderStaticPreview(assetPath: string, subAssets: UnityEngine.Object[], width: number, height: number): UnityEngine.Texture2D;
      OnPreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
      OnInteractivePreviewGUI(r: UnityEngine.Rect, background: UnityEngine.GUIStyle): void;
      OnPreviewSettings(): void;
      GetInfoString(): string;
      ReloadPreviewInstances(): void;
      UseDefaultMargins(): boolean;
      Initialize(targets: UnityEngine.Object[]): void;
      Cleanup(): void;
      MoveNextTarget(): boolean;
      ResetTarget(): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ScriptedImporter {
      assetPath: string;
      importSettingsMissing: boolean;
      assetTimeStamp: System.UInt64;
      userData: string;
      assetBundleName: string;
      assetBundleVariant: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnImportAsset(ctx: UnityEditor.AssetImporters.AssetImportContext): void;
      SupportsRemappedAssetType(type: System.Type): boolean;
      SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
      SaveAndReimport(): void;
      AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
      RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
      GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
      SupportsRemappedAssetType(type: System.Type): boolean;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace Audio {
    export class AudioMixerEffectPlugin {
      constructor();
      SetFloatParameter(name: string, value: number): boolean;
      GetSampleRate(): number;
      IsPluginEditableAndEnabled(): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Build {
    export enum OverrideTextureCompression {
      NoOverride = 0,
      ForceUncompressed = 1,
      ForceFastCompressor = 2,
    }
    export enum Il2CppCodeGeneration {
      OptimizeSpeed = 0,
      OptimizeSize = 1,
    }
    export class BuildFailedException {
      constructor(message: string);
      constructor(innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export interface IOrderedCallback {
      callbackOrder: number;
    }
    export interface IPreprocessBuild {
      OnPreprocessBuild(target: UnityEditor.BuildTarget, path: string): void;
    }
    export class BuildPlayerProcessor {
      callbackOrder: number;
      PrepareForBuild(buildPlayerContext: UnityEditor.Build.BuildPlayerContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IPreprocessBuildWithReport {
      OnPreprocessBuild(report: UnityEditor.Build.Reporting.BuildReport): void;
    }
    export interface IFilterBuildAssemblies {
      OnFilterAssemblies(buildOptions: UnityEditor.BuildOptions, assemblies: string[]): string[];
    }
    export interface IPostprocessBuild {
      OnPostprocessBuild(target: UnityEditor.BuildTarget, path: string): void;
    }
    export interface IPostprocessBuildWithReport {
      OnPostprocessBuild(report: UnityEditor.Build.Reporting.BuildReport): void;
    }
    export interface IPostBuildPlayerScriptDLLs {
      OnPostBuildPlayerScriptDLLs(report: UnityEditor.Build.Reporting.BuildReport): void;
    }
    export interface IProcessScene {
      OnProcessScene(scene: UnityEngine.SceneManagement.Scene): void;
    }
    export interface IProcessSceneWithReport {
      OnProcessScene(scene: UnityEngine.SceneManagement.Scene, report: UnityEditor.Build.Reporting.BuildReport): void;
    }
    export interface IActiveBuildTargetChanged {
      OnActiveBuildTargetChanged(previousTarget: UnityEditor.BuildTarget, newTarget: UnityEditor.BuildTarget): void;
    }
    export interface IPreprocessShaders {
      OnProcessShader(shader: UnityEngine.Shader, snippet: UnityEditor.Rendering.ShaderSnippetData, data: System.Collections.Generic.IList<UnityEditor.Rendering.ShaderCompilerData>): void;
    }
    export interface IPreprocessComputeShaders {
      OnProcessComputeShader(shader: UnityEngine.ComputeShader, kernelName: string, data: System.Collections.Generic.IList<UnityEditor.Rendering.ShaderCompilerData>): void;
    }
    export interface IUnityLinkerProcessor {
      GenerateAdditionalLinkXmlFile(report: UnityEditor.Build.Reporting.BuildReport, data: UnityEditor.UnityLinker.UnityLinkerBuildPipelineData): string;
    }
    export interface IIl2CppProcessor {
    }
    export class BuildPlayerContext {
      BuildPlayerOptions: UnityEditor.BuildPlayerOptions;
      AddAdditionalPathToStreamingAssets(directoryOrFile: string, pathInStreamingAssets?: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class NamedBuildTarget {
      TargetName: string;
      static Unknown: UnityEditor.Build.NamedBuildTarget;
      static Standalone: UnityEditor.Build.NamedBuildTarget;
      static Server: UnityEditor.Build.NamedBuildTarget;
      static iOS: UnityEditor.Build.NamedBuildTarget;
      static Android: UnityEditor.Build.NamedBuildTarget;
      static WebGL: UnityEditor.Build.NamedBuildTarget;
      static WindowsStoreApps: UnityEditor.Build.NamedBuildTarget;
      static PS4: UnityEditor.Build.NamedBuildTarget;
      static XboxOne: UnityEditor.Build.NamedBuildTarget;
      static tvOS: UnityEditor.Build.NamedBuildTarget;
      static NintendoSwitch: UnityEditor.Build.NamedBuildTarget;
      static Stadia: UnityEditor.Build.NamedBuildTarget;
      static CloudRendering: UnityEditor.Build.NamedBuildTarget;
      static EmbeddedLinux: UnityEditor.Build.NamedBuildTarget;
      ToBuildTargetGroup(): UnityEditor.BuildTargetGroup;
      static FromBuildTargetGroup(buildTargetGroup: UnityEditor.BuildTargetGroup): UnityEditor.Build.NamedBuildTarget;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      Equals(other: UnityEditor.Build.NamedBuildTarget): boolean;
      CompareTo(other: UnityEditor.Build.NamedBuildTarget): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export namespace Content {
      export class SerializedLocation {
        fileName: string;
        offset: System.UInt64;
        size: System.UInt64;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ObjectSerializedInfo {
        serializedObject: UnityEditor.Build.Content.ObjectIdentifier;
        header: UnityEditor.Build.Content.SerializedLocation;
        rawData: UnityEditor.Build.Content.SerializedLocation;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class WriteResult {
        serializedObjects: UnityEditor.Build.Content.ObjectSerializedInfo[];
        resourceFiles: UnityEditor.Build.Content.ResourceFile[];
        includedTypes: System.Type[];
        includedSerializeReferenceFQN: string[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BuildReferenceMap {
        constructor();
        Dispose(): void;
        GetHash128(): UnityEngine.Hash128;
        AddMapping(internalFileName: string, serializationIndex: System.Int64, objectID: UnityEditor.Build.Content.ObjectIdentifier, overwrite?: boolean): void;
        AddMappings(internalFileName: string, objectIDs: UnityEditor.Build.Content.SerializationInfo[], overwrite?: boolean): void;
        FilterToSubset(objectIds: UnityEditor.Build.Content.ObjectIdentifier[]): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum ContentBuildFlags {
        None = 0,
        DisableWriteTypeTree = 1,
        StripUnityVersion = 2,
        DevelopmentBuild = 4,
      }
      export class BuildSettings {
        typeDB: UnityEditor.Build.Player.TypeDB;
        target: UnityEditor.BuildTarget;
        group: UnityEditor.BuildTargetGroup;
        buildFlags: UnityEditor.Build.Content.ContentBuildFlags;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BuildUsageCache {
        constructor();
        Dispose(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class BuildUsageTagGlobal {
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BuildUsageTagSet {
        constructor();
        Dispose(): void;
        GetHash128(): UnityEngine.Hash128;
        GetObjectIdentifiers(): UnityEditor.Build.Content.ObjectIdentifier[];
        UnionWith(other: UnityEditor.Build.Content.BuildUsageTagSet): void;
        FilterToSubset(objectIds: UnityEditor.Build.Content.ObjectIdentifier[]): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum DependencyType {
        RecursiveOperation = 1,
        MissingReferences = 2,
        ValidReferences = 4,
        DefaultDependencies = 5,
      }
      export class ContentBuildInterface {
        static GenerateAssetBundleBuilds(): UnityEditor.AssetBundleBuild[];
        static GetGlobalUsageFromGraphicsSettings(): UnityEditor.Build.Content.BuildUsageTagGlobal;
        static GetGlobalUsageFromActiveScene(target: UnityEditor.BuildTarget): UnityEditor.Build.Content.BuildUsageTagGlobal;
        static ObjectIsSupportedInBuild(targetObject: UnityEngine.Object): boolean;
        static CalculatePlayerDependenciesForScene(scenePath: string, settings: UnityEditor.Build.Content.BuildSettings, usageSet: UnityEditor.Build.Content.BuildUsageTagSet): UnityEditor.Build.Content.SceneDependencyInfo;
        static CalculatePlayerDependenciesForScene(scenePath: string, settings: UnityEditor.Build.Content.BuildSettings, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache): UnityEditor.Build.Content.SceneDependencyInfo;
        static CalculatePlayerDependenciesForScene(scenePath: string, settings: UnityEditor.Build.Content.BuildSettings, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.SceneDependencyInfo;
        static CalculatePlayerDependenciesForGameManagers(settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet): UnityEditor.Build.Content.GameManagerDependencyInfo;
        static CalculatePlayerDependenciesForGameManagers(settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache): UnityEditor.Build.Content.GameManagerDependencyInfo;
        static CalculatePlayerDependenciesForGameManagers(settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.GameManagerDependencyInfo;
        static GetPlayerObjectIdentifiersInAsset(asset: UnityEditor.GUID, target: UnityEditor.BuildTarget): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerObjectIdentifiersInSerializedFile(filePath: string, target: UnityEditor.BuildTarget): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObject(objectID: UnityEditor.Build.Content.ObjectIdentifier, target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObject(objectID: UnityEditor.Build.Content.ObjectIdentifier, target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObject(targetObject: UnityEngine.Object, target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObject(targetObject: UnityEngine.Object, target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObjects(objectIDs: UnityEditor.Build.Content.ObjectIdentifier[], target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObjects(objectIDs: UnityEditor.Build.Content.ObjectIdentifier[], target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObjects(objects: UnityEngine.Object[], target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerDependenciesForObjects(objects: UnityEngine.Object[], target: UnityEditor.BuildTarget, typeDB: UnityEditor.Build.Player.TypeDB, mode: UnityEditor.Build.Content.DependencyType): UnityEditor.Build.Content.ObjectIdentifier[];
        static GetPlayerAssetRepresentations(asset: UnityEditor.GUID, target: UnityEditor.BuildTarget): UnityEditor.Build.Content.ObjectIdentifier[];
        static CalculateBuildUsageTags(objectIDs: UnityEditor.Build.Content.ObjectIdentifier[], dependentObjectIDs: UnityEditor.Build.Content.ObjectIdentifier[], globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet): void;
        static CalculateBuildUsageTags(objectIDs: UnityEditor.Build.Content.ObjectIdentifier[], dependentObjectIDs: UnityEditor.Build.Content.ObjectIdentifier[], globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache): void;
        static GetTypeForObject(objectID: UnityEditor.Build.Content.ObjectIdentifier): System.Type;
        static GetTypesForObject(objectID: UnityEditor.Build.Content.ObjectIdentifier): System.Type[];
        static GetTypeForObjects(objectIDs: UnityEditor.Build.Content.ObjectIdentifier[]): System.Type[];
        static WriteSerializedFile(outputFolder: string, parameters: UnityEditor.Build.Content.WriteParameters): UnityEditor.Build.Content.WriteResult;
        static WriteSceneSerializedFile(outputFolder: string, parameters: UnityEditor.Build.Content.WriteSceneParameters): UnityEditor.Build.Content.WriteResult;
        static WriteGameManagersSerializedFile(outputFolder: string, parameters: UnityEditor.Build.Content.WriteManagerParameters): UnityEditor.Build.Content.WriteResult;
        static ArchiveAndCompress(resourceFiles: UnityEditor.Build.Content.ResourceFile[], outputBundlePath: string, compression: UnityEngine.BuildCompression): System.UInt32;
        static ArchiveAndCompress(resourceFiles: UnityEditor.Build.Content.ResourceFile[], outputBundlePath: string, compression: UnityEngine.BuildCompression, stripUnityVersion: boolean): System.UInt32;
        static StartProfileCapture(options: UnityEditor.Build.Content.ProfileCaptureOptions): void;
        static StopProfileCapture(): UnityEditor.Build.Content.ContentBuildProfileEvent[];
        static CalculatePlayerSerializationHashForType(type: System.Type, typeDB: UnityEditor.Build.Player.TypeDB): UnityEngine.Hash128;
        static PrepareScene(scenePath: string, settings: UnityEditor.Build.Content.BuildSettings, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, outputFolder: string): UnityEditor.Build.Content.SceneDependencyInfo;
        static PrepareScene(scenePath: string, settings: UnityEditor.Build.Content.BuildSettings, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, usageCache: UnityEditor.Build.Content.BuildUsageCache, outputFolder: string): UnityEditor.Build.Content.SceneDependencyInfo;
        static WriteSerializedFile(outputFolder: string, writeCommand: UnityEditor.Build.Content.WriteCommand, settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, referenceMap: UnityEditor.Build.Content.BuildReferenceMap): UnityEditor.Build.Content.WriteResult;
        static WriteSerializedFile(outputFolder: string, writeCommand: UnityEditor.Build.Content.WriteCommand, settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, referenceMap: UnityEditor.Build.Content.BuildReferenceMap, bundleInfo: UnityEditor.Build.Content.AssetBundleInfo): UnityEditor.Build.Content.WriteResult;
        static WriteSceneSerializedFile(outputFolder: string, scenePath: string, processedScene: string, writeCommand: UnityEditor.Build.Content.WriteCommand, settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, referenceMap: UnityEditor.Build.Content.BuildReferenceMap): UnityEditor.Build.Content.WriteResult;
        static WriteSceneSerializedFile(outputFolder: string, scenePath: string, processedScene: string, writeCommand: UnityEditor.Build.Content.WriteCommand, settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, referenceMap: UnityEditor.Build.Content.BuildReferenceMap, preloadInfo: UnityEditor.Build.Content.PreloadInfo): UnityEditor.Build.Content.WriteResult;
        static WriteSceneSerializedFile(outputFolder: string, scenePath: string, processedScene: string, writeCommand: UnityEditor.Build.Content.WriteCommand, settings: UnityEditor.Build.Content.BuildSettings, globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal, usageSet: UnityEditor.Build.Content.BuildUsageTagSet, referenceMap: UnityEditor.Build.Content.BuildReferenceMap, preloadInfo: UnityEditor.Build.Content.PreloadInfo, sceneBundleInfo: UnityEditor.Build.Content.SceneBundleInfo): UnityEditor.Build.Content.WriteResult;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
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
      export class BuildCompression {
        static DefaultUncompressed: UnityEditor.Build.Content.BuildCompression;
        static DefaultLZ4: UnityEditor.Build.Content.BuildCompression;
        static DefaultLZMA: UnityEditor.Build.Content.BuildCompression;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
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
      export class ContentBuildProfileEvent {
        TimeMicroseconds: System.UInt64;
        Name: string;
        Metadata: string;
        Type: UnityEditor.Build.Content.ProfileEventType;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class GameManagerDependencyInfo {
        managerObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        referencedObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        includedTypes: System.Type[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export enum FileType {
        NonAssetType = 0,
        DeprecatedCachedAssetType = 1,
        SerializedAssetType = 2,
        MetaAssetType = 3,
      }
      export class ObjectIdentifier {
        guid: UnityEditor.GUID;
        localIdentifierInFile: System.Int64;
        fileType: UnityEditor.Build.Content.FileType;
        filePath: string;
        ToString(): string;
        Equals(obj: any): boolean;
        Equals(other: UnityEditor.Build.Content.ObjectIdentifier): boolean;
        GetHashCode(): number;
        static ToObject(objectId: UnityEditor.Build.Content.ObjectIdentifier): UnityEngine.Object;
        static ToInstanceID(objectId: UnityEditor.Build.Content.ObjectIdentifier): number;
        GetType(): System.Type;
      }
      export class ResourceFile {
        fileName: string;
        fileAlias: string;
        serializedFile: boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class SceneDependencyInfo {
        scene: string;
        processedScene: string;
        referencedObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        includedTypes: System.Type[];
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PreloadInfo {
        constructor();
        preloadObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AssetLoadInfo {
        constructor();
        asset: UnityEditor.GUID;
        address: string;
        includedObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        referencedObjects: UnityEditor.Build.Content.ObjectIdentifier[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AssetBundleInfo {
        constructor();
        bundleName: string;
        bundleAssets: UnityEditor.Build.Content.AssetLoadInfo[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SceneLoadInfo {
        constructor();
        asset: UnityEditor.GUID;
        address: string;
        internalName: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SceneBundleInfo {
        constructor();
        bundleName: string;
        bundleScenes: UnityEditor.Build.Content.SceneLoadInfo[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SerializationInfo {
        constructor();
        serializationObject: UnityEditor.Build.Content.ObjectIdentifier;
        serializationIndex: System.Int64;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class WriteCommand {
        constructor();
        fileName: string;
        internalName: string;
        serializeObjects: UnityEditor.Build.Content.SerializationInfo[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class WriteParameters {
        writeCommand: UnityEditor.Build.Content.WriteCommand;
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        usageSet: UnityEditor.Build.Content.BuildUsageTagSet;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        bundleInfo: UnityEditor.Build.Content.AssetBundleInfo;
        preloadInfo: UnityEditor.Build.Content.PreloadInfo;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class WriteSceneParameters {
        scenePath: string;
        writeCommand: UnityEditor.Build.Content.WriteCommand;
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        usageSet: UnityEditor.Build.Content.BuildUsageTagSet;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        preloadInfo: UnityEditor.Build.Content.PreloadInfo;
        sceneBundleInfo: UnityEditor.Build.Content.SceneBundleInfo;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class WriteManagerParameters {
        settings: UnityEditor.Build.Content.BuildSettings;
        globalUsage: UnityEditor.Build.Content.BuildUsageTagGlobal;
        referenceMap: UnityEditor.Build.Content.BuildReferenceMap;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
    }
    export namespace Player {
      export enum ScriptCompilationOptions {
        None = 0,
        DevelopmentBuild = 1,
        Assertions = 2,
      }
      export class ScriptCompilationSettings {
        subtarget: number;
        target: UnityEditor.BuildTarget;
        group: UnityEditor.BuildTargetGroup;
        options: UnityEditor.Build.Player.ScriptCompilationOptions;
        extraScriptingDefines: string[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ScriptCompilationResult {
        assemblies: string[];
        typeDB: UnityEditor.Build.Player.TypeDB;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PlayerBuildInterface {
        static ExtraTypesProvider: (() => any);
        static CompilePlayerScripts(input: UnityEditor.Build.Player.ScriptCompilationSettings, outputFolder: string): UnityEditor.Build.Player.ScriptCompilationResult;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TypeDbHelper {
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TypeDB {
        Dispose(): void;
        GetHash128(): UnityEngine.Hash128;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Reporting {
      export class BuildFile {
        id: System.UInt32;
        path: string;
        role: string;
        size: System.UInt64;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class BuildReport {
        files: UnityEditor.Build.Reporting.BuildFile[];
        steps: UnityEditor.Build.Reporting.BuildStep[];
        summary: UnityEditor.Build.Reporting.BuildSummary;
        strippingInfo: UnityEditor.Build.Reporting.StrippingInfo;
        packedAssets: UnityEditor.Build.Reporting.PackedAssets[];
        scenesUsingAssets: UnityEditor.Build.Reporting.ScenesUsingAssets[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export enum BuildResult {
        Unknown = 0,
        Succeeded = 1,
        Failed = 2,
        Cancelled = 3,
      }
      export class BuildStep {
        name: string;
        duration: System.TimeSpan;
        messages: UnityEditor.Build.Reporting.BuildStepMessage[];
        depth: number;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class BuildStepMessage {
        type: UnityEngine.LogType;
        content: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BuildSummary {
        buildStartedAt: System.DateTime;
        guid: UnityEditor.GUID;
        platform: UnityEditor.BuildTarget;
        platformGroup: UnityEditor.BuildTargetGroup;
        options: UnityEditor.BuildOptions;
        outputPath: string;
        totalSize: System.UInt64;
        totalTime: System.TimeSpan;
        buildEndedAt: System.DateTime;
        totalErrors: number;
        totalWarnings: number;
        result: UnityEditor.Build.Reporting.BuildResult;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class CommonRoles {
        static scene: string;
        static sharedAssets: string;
        static resourcesFile: string;
        static assetBundle: string;
        static manifestAssetBundle: string;
        static assetBundleTextManifest: string;
        static managedLibrary: string;
        static dependentManagedLibrary: string;
        static executable: string;
        static streamingResourceFile: string;
        static streamingAsset: string;
        static bootConfig: string;
        static builtInResources: string;
        static builtInShaders: string;
        static appInfo: string;
        static managedEngineApi: string;
        static monoRuntime: string;
        static monoConfig: string;
        static debugInfo: string;
        static globalGameManagers: string;
        static crashHandler: string;
        static engineLibrary: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PackedAssetInfo {
        id: System.Int64;
        type: System.Type;
        packedSize: System.UInt64;
        offset: System.UInt64;
        sourceAssetGUID: UnityEditor.GUID;
        sourceAssetPath: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PackedAssets {
        constructor();
        file: System.UInt32;
        shortPath: string;
        overhead: System.UInt64;
        contents: UnityEditor.Build.Reporting.PackedAssetInfo[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ScenesUsingAsset {
        assetPath: string;
        scenePaths: string[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ScenesUsingAssets {
        constructor();
        list: UnityEditor.Build.Reporting.ScenesUsingAsset[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class StrippingInfo {
        constructor();
        includedModules: System.Collections.Generic.IEnumerable<string>;
        name: string;
        hideFlags: UnityEngine.HideFlags;
        GetReasonsForIncluding(entityName: string): System.Collections.Generic.IEnumerable<string>;
        SetDirty(): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
    }
  }
  export namespace Callbacks {
    export enum OnOpenAssetAttributeMode {
      Execute = 0,
      Validate = 1,
    }
  }
  export namespace Compilation {
    export class CompilationPipeline {
      static codeOptimization: UnityEditor.Compilation.CodeOptimization;
      static GetSystemAssemblyDirectories(apiCompatibilityLevel: UnityEditor.ApiCompatibilityLevel): string[];
      static ParseResponseFile(relativePath: string, projectDirectory: string, systemReferenceDirectories: string[]): UnityEditor.Compilation.ResponseFileData;
      static GetAssemblies(): UnityEditor.Compilation.Assembly[];
      static GetAssemblies(assembliesType: UnityEditor.Compilation.AssembliesType): UnityEditor.Compilation.Assembly[];
      static GetAssemblyNameFromScriptPath(sourceFilePath: string): string;
      static GetAssemblyDefinitionFilePathFromScriptPath(sourceFilePath: string): string;
      static GetAssemblyDefinitionFilePathFromAssemblyName(assemblyName: string): string;
      static GetAssemblyDefinitionFilePathFromAssemblyReference(reference: string): string;
      static GetAssemblyDefinitionReferenceType(reference: string): UnityEditor.Compilation.AssemblyDefinitionReferenceType;
      static GUIDToAssemblyDefinitionReferenceGUID(guid: string): string;
      static AssemblyDefinitionReferenceGUIDToGUID(reference: string): string;
      static GetAssemblyRootNamespaceFromScriptPath(sourceFilePath: string): string;
      static GetAssemblyDefinitionPlatforms(): UnityEditor.Compilation.AssemblyDefinitionPlatform[];
      static GetDefinesFromAssemblyName(assemblyName: string): string[];
      static GetResponseFileDefinesFromAssemblyName(assemblyName: string): string[];
      static GetPrecompiledAssemblyNames(): string[];
      static IsDefineConstraintsCompatible(defines: string[], defineConstraints: string[]): boolean;
      static GetPrecompiledAssemblyPaths(precompiledAssemblySources: UnityEditor.Compilation.CompilationPipeline_PrecompiledAssemblySources): string[];
      static GetPrecompiledAssemblyPathFromAssemblyName(assemblyName: string): string;
      static RequestScriptCompilation(): void;
      static RequestScriptCompilation(options: UnityEditor.Compilation.RequestScriptCompilationOptions): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class AssemblyBuilder {
      constructor(assemblyPath: string, ...scriptPaths: string[]);
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
      Build(): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssemblyDefinitionException {
      constructor(message: string, ...filePaths: string[]);
      filePaths: string[];
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class PrecompiledAssemblyException {
      constructor(message: string, ...filePaths: string[]);
      filePaths: string[];
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export enum AssemblyFlags {
      None = 0,
      EditorAssembly = 1,
    }
    export enum RequestScriptCompilationOptions {
      None = 0,
      CleanBuildCache = 1,
    }
    export class ScriptCompilerOptions {
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class Assembly {
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ResponseFileData {
      constructor();
      Defines: string[];
      FullPathReferences: string[];
      Errors: string[];
      OtherArguments: string[];
      Unsafe: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssemblyDefinitionPlatform {
      Name: string;
      DisplayName: string;
      BuildTarget: UnityEditor.BuildTarget;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum CompilerMessageType {
      Error = 0,
      Warning = 1,
      Info = 2,
    }
    export class CompilerMessage {
      message: string;
      file: string;
      line: number;
      column: number;
      type: UnityEditor.Compilation.CompilerMessageType;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace Connect {
    export class UnityOAuth {
      static GetAuthorizationCodeAsync(clientId: string, callback: ((arg0: UnityEditor.Connect.UnityOAuth_AuthCodeResponse) => void)): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UnityOAuth_AuthCodeResponse {
      AuthCode: string;
      Exception: System.Exception;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace CrashReporting {
    export class CrashReportingSettings {
      static enabled: boolean;
      static captureEditorExceptions: boolean;
      static logBufferSize: System.UInt32;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace EditorTools {
    export interface IDrawSelectedHandles {
      OnDrawHandles(): void;
    }
    export class EditorTool {
      targets: System.Collections.Generic.IEnumerable<UnityEngine.Object>;
      target: UnityEngine.Object;
      toolbarIcon: UnityEngine.GUIContent;
      gridSnapEnabled: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnActivated(): void;
      OnWillBeDeactivated(): void;
      OnToolGUI(window: UnityEditor.EditorWindow): void;
      IsAvailable(): boolean;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class EditorToolContext {
      targets: System.Collections.Generic.IEnumerable<UnityEngine.Object>;
      target: UnityEngine.Object;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnActivated(): void;
      OnWillBeDeactivated(): void;
      OnToolGUI(window: UnityEditor.EditorWindow): void;
      ResolveTool(tool: UnityEditor.Tool): System.Type;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class EditorTools {
      static activeToolType: System.Type;
      static SetActiveTool(type: System.Type): void;
      static SetActiveTool(tool: UnityEditor.EditorTools.EditorTool): void;
      static RestorePreviousTool(): void;
      static RestorePreviousPersistentTool(): void;
      static IsActiveTool(tool: UnityEditor.EditorTools.EditorTool): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class GameObjectToolContext {
      targets: System.Collections.Generic.IEnumerable<UnityEngine.Object>;
      target: UnityEngine.Object;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnActivated(): void;
      OnWillBeDeactivated(): void;
      OnToolGUI(window: UnityEditor.EditorWindow): void;
      ResolveTool(tool: UnityEditor.Tool): System.Type;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ToolManager {
      static activeContextType: System.Type;
      static activeToolType: System.Type;
      static SetActiveContext(context: System.Type): void;
      static SetActiveTool(type: System.Type): void;
      static SetActiveTool(tool: UnityEditor.EditorTools.EditorTool): void;
      static RestorePreviousTool(): void;
      static RestorePreviousPersistentTool(): void;
      static IsActiveTool(tool: UnityEditor.EditorTools.EditorTool): boolean;
      static IsActiveContext(context: UnityEditor.EditorTools.EditorToolContext): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Events {
    export class UnityEventTools {
      static AddPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase): void;
      static RemovePersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number): void;
      static AddPersistentListener(unityEvent: UnityEngine.Events.UnityEvent, call: UnityEngine.Events.UnityAction): void;
      static RegisterPersistentListener(unityEvent: UnityEngine.Events.UnityEvent, index: number, call: UnityEngine.Events.UnityAction): void;
      static RemovePersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: UnityEngine.Events.UnityAction): void;
      static UnregisterPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number): void;
      static AddVoidPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: UnityEngine.Events.UnityAction): void;
      static RegisterVoidPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number, call: UnityEngine.Events.UnityAction): void;
      static AddIntPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: any, argument: number): void;
      static RegisterIntPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number, call: any, argument: number): void;
      static AddFloatPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: any, argument: number): void;
      static RegisterFloatPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number, call: any, argument: number): void;
      static AddBoolPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: any, argument: boolean): void;
      static RegisterBoolPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number, call: any, argument: boolean): void;
      static AddStringPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, call: any, argument: string): void;
      static RegisterStringPersistentListener(unityEvent: UnityEngine.Events.UnityEventBase, index: number, call: any, argument: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Experimental {
    export class BuildPipelineExperimental {
      static GetSessionIdForBuildTarget(target: UnityEditor.BuildTarget): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorResources {
      constructor();
      static normalSkinIndex: number;
      static darkSkinIndex: number;
      static lightSkinSourcePath: string;
      static darkSkinSourcePath: string;
      static fontsPath: string;
      static brushesPath: string;
      static iconsPath: string;
      static generatedIconsPath: string;
      static folderIconName: string;
      static emptyFolderIconName: string;
      static editorDefaultResourcesPath: string;
      static libraryBundlePath: string;
      static dataPath: string;
      static Load(assetPath: string, type: System.Type): UnityEngine.Object;
      static GetAssetPath(obj: UnityEngine.Object): string;
      static ExpandPath(path: string): string;
      static GetFullPath(path: string): string;
      static Exists(path: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssetDatabaseExperimental {
      constructor();
      static counters: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters;
      static ActiveOnDemandMode: UnityEditor.Experimental.AssetDatabaseExperimental_OnDemandMode;
      static ClearImporterOverride(path: string): void;
      static IsCacheServerEnabled(): boolean;
      static GetImporterOverride(path: string): System.Type;
      static GetAvailableImporterTypes(path: string): System.Type[];
      static CanConnectToCacheServer(ip: string, port: System.UInt16): boolean;
      static RefreshSettings(): void;
      static IsConnectedToCacheServer(): boolean;
      static GetCacheServerAddress(): string;
      static GetCacheServerPort(): System.UInt16;
      static GetCacheServerNamespacePrefix(): string;
      static GetCacheServerEnableDownload(): boolean;
      static GetCacheServerEnableUpload(): boolean;
      static IsDirectoryMonitoringEnabled(): boolean;
      static RegisterCustomDependency(dependency: string, hashOfValue: UnityEngine.Hash128): void;
      static UnregisterCustomDependencyPrefixFilter(prefixFilter: string): System.UInt32;
      static IsAssetImportWorkerProcess(): boolean;
      static ReconnectToCacheServer(): void;
      static LookupArtifact(artifactKey: UnityEditor.Experimental.ArtifactKey): UnityEditor.Experimental.ArtifactID;
      static ProduceArtifact(artifactKey: UnityEditor.Experimental.ArtifactKey): UnityEditor.Experimental.ArtifactID;
      static ProduceArtifactAsync(artifactKey: UnityEditor.Experimental.ArtifactKey): UnityEditor.Experimental.ArtifactID;
      static ProduceArtifactsAsync(artifactKey: UnityEditor.GUID[], importerType?: System.Type): UnityEditor.Experimental.ArtifactID[];
      static ForceProduceArtifact(artifactKey: UnityEditor.Experimental.ArtifactKey): UnityEditor.Experimental.ArtifactID;
      static GetArtifactHash(guid: string, mode?: UnityEditor.Experimental.AssetDatabaseExperimental_ImportSyncMode): UnityEngine.Hash128;
      static GetArtifactHash(guid: string, importerType: System.Type, mode?: UnityEditor.Experimental.AssetDatabaseExperimental_ImportSyncMode): UnityEngine.Hash128;
      static GetArtifactHashes(guids: string[], mode?: UnityEditor.Experimental.AssetDatabaseExperimental_ImportSyncMode): UnityEngine.Hash128[];
      static GetOnDemandArtifactProgress(artifactKey: UnityEditor.Experimental.ArtifactKey): UnityEditor.Experimental.OnDemandProgress;
      static GetOnDemandArtifactProgress(guid: string): UnityEditor.Experimental.OnDemandProgress;
      static GetOnDemandArtifactProgress(guid: string, importerType: System.Type): UnityEditor.Experimental.OnDemandProgress;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssetDatabaseExperimental_CacheServerConnectionChangedParameters {
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
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
    export class AssetDatabaseExperimental_AssetDatabaseCounters {
      cacheServer: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_CacheServerCounters;
      import: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_ImportCounters;
      ResetDeltas(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AssetDatabaseExperimental_AssetDatabaseCounters_Counter {
      total: System.Int64;
      delta: System.Int64;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AssetDatabaseExperimental_AssetDatabaseCounters_CacheServerCounters {
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AssetDatabaseExperimental_AssetDatabaseCounters_ImportCounters {
      imported: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      importedInProcess: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      importedOutOfProcess: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      refresh: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      domainReload: UnityEditor.Experimental.AssetDatabaseExperimental_AssetDatabaseCounters_Counter;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AssetMoveInfo {
      constructor(sourceAssetPath: string, destinationAssetPath: string);
      sourceAssetPath: string;
      destinationAssetPath: string;
      Equals(other: UnityEditor.Experimental.AssetMoveInfo): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AssetsModifiedProcessor {
      assetsReportedChanged: System.Collections.Generic.HashSet<string>;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Lightmapping {
      constructor();
      static probesIgnoreDirectEnvironment: boolean;
      static extractAmbientOcclusion: boolean;
      static SetCustomBakeInputs(inputData: UnityEngine.Vector4[], sampleCount: number): void;
      static GetCustomBakeResults(results: UnityEngine.Vector4[]): boolean;
      static BakeAsync(targetScene: UnityEngine.SceneManagement.Scene): boolean;
      static Bake(targetScene: UnityEngine.SceneManagement.Scene): boolean;
      static GetAdditionalBakedProbes(id: number, outBakedProbeSH: any, outBakedProbeValidity: any): boolean;
      static GetAdditionalBakedProbes(id: number, outBakedProbeSH: any, outBakedProbeValidity: any, outBakedProbeOctahedralDepth: any): boolean;
      static SetAdditionalBakedProbes(id: number, positions: UnityEngine.Vector3[]): void;
      static SetLightDirty(light: UnityEngine.Light): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum OnDemandState {
      Unavailable = 0,
      Processing = 1,
      Downloading = 2,
      Available = 3,
      Failed = 4,
    }
    export class ArtifactKey {
      constructor(g: UnityEditor.GUID);
      constructor(guid: UnityEditor.GUID, importerType: System.Type);
      isValid: boolean;
      guid: UnityEditor.GUID;
      importerType: System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ArtifactID {
      isValid: boolean;
      value: UnityEngine.Hash128;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class OnDemandProgress {
      state: UnityEditor.Experimental.OnDemandState;
      progress: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
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
        export class BuildCompression {
          static DefaultUncompressed: UnityEditor.Experimental.Build.AssetBundle.BuildCompression;
          static DefaultLZ4: UnityEditor.Experimental.Build.AssetBundle.BuildCompression;
          static DefaultLZMA: UnityEditor.Experimental.Build.AssetBundle.BuildCompression;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          ToString(): string;
          GetType(): System.Type;
        }
      }
    }
    export namespace Licensing {
      export class LicensingUtility {
        static HasEntitlement(entitlement: string): boolean;
        static HasEntitlements(entitlements: string[]): string[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Rendering {
      export interface IScriptableBakedReflectionSystem {
        stageCount: number;
        stateHashes: UnityEngine.Hash128[];
        Tick(sceneStateHash: UnityEditor.Experimental.Rendering.SceneStateHash, handle: UnityEditor.Experimental.Rendering.IScriptableBakedReflectionSystemStageNotifier): void;
        SynchronizeReflectionProbes(): void;
        Clear(): void;
        Cancel(): void;
        BakeAllReflectionProbes(): boolean;
      }
      export interface IScriptableBakedReflectionSystemStageNotifier {
        EnterStage(stage: number, progressMessage: string, progress: number): void;
        ExitStage(stage: number): void;
        SetIsDone(isDone: boolean): void;
      }
      export class SceneStateHash {
        constructor(sceneObjectsHash: UnityEngine.Hash128, skySettingsHash: UnityEngine.Hash128, ambientProbeHash: UnityEngine.Hash128);
        sceneObjectsHash: UnityEngine.Hash128;
        skySettingsHash: UnityEngine.Hash128;
        ambientProbeHash: UnityEngine.Hash128;
        Equals(other: UnityEditor.Experimental.Rendering.SceneStateHash): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ScriptableBakedReflectionSystem {
        stageCount: number;
        stateHashes: UnityEngine.Hash128[];
        Tick(sceneStateHash: UnityEditor.Experimental.Rendering.SceneStateHash, handle: UnityEditor.Experimental.Rendering.IScriptableBakedReflectionSystemStageNotifier): void;
        SynchronizeReflectionProbes(): void;
        Clear(): void;
        Cancel(): void;
        BakeAllReflectionProbes(): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ScriptableBakedReflectionSystemSettings {
        static system: UnityEditor.Experimental.Rendering.IScriptableBakedReflectionSystem;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace RestService {
      export class PlayerDataFileLocator {
        constructor();
        static Register(locator: UnityEditor.Experimental.RestService.PlayerDataFileLocator_Locator): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PlayerDataFileLocator_Locator {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Hardware {
    export class UsbDevice {
      vendorId: number;
      productId: number;
      revision: number;
      udid: string;
      name: string;
      ToString(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class Usb {
      constructor();
      static OnDevicesChanged(devices: UnityEditor.Hardware.UsbDevice[]): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Usb_OnDevicesChangedHandler {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(devices: UnityEditor.Hardware.UsbDevice[]): void;
      BeginInvoke(devices: UnityEditor.Hardware.UsbDevice[], callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
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
    export class DevDevice {
      constructor(id: string, name: string, type: string, module: string, state: UnityEditor.Hardware.DevDeviceState, features: UnityEditor.Hardware.DevDeviceFeatures);
      isConnected: boolean;
      static none: UnityEditor.Hardware.DevDevice;
      id: string;
      name: string;
      type: string;
      module: string;
      state: UnityEditor.Hardware.DevDeviceState;
      features: UnityEditor.Hardware.DevDeviceFeatures;
      ToString(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class DevDeviceList {
      constructor();
      static OnChanged(): void;
      static GetDevices(): UnityEditor.Hardware.DevDevice[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DevDeviceList_OnChangedHandler {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(): void;
      BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Il2Cpp {
    export class Il2CppBuildPipelineData {
      constructor(target: UnityEditor.BuildTarget, inputDirectory: string);
      target: UnityEditor.BuildTarget;
      inputDirectory: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace IMGUI {
    export namespace Controls {
      export class ArcHandle {
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
        static DefaultAngleHandleDrawFunction(controlID: number, position: UnityEngine.Vector3, rotation: UnityEngine.Quaternion, size: number, eventType: UnityEngine.EventType): void;
        static DefaultAngleHandleSizeFunction(position: UnityEngine.Vector3): number;
        static DefaultRadiusHandleSizeFunction(position: UnityEngine.Vector3): number;
        SetColorWithoutRadiusHandle(color: UnityEngine.Color, fillColorAlpha: number): void;
        SetColorWithRadiusHandle(color: UnityEngine.Color, fillColorAlpha: number): void;
        DrawHandle(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class BoxBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        size: UnityEngine.Vector3;
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor(color: UnityEngine.Color): void;
        DrawHandle(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class CapsuleBoundsHandle {
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
        SetColor(color: UnityEngine.Color): void;
        DrawHandle(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum CapsuleBoundsHandle_HeightAxis {
        X = 0,
        Y = 1,
        Z = 2,
      }
      export class PrimitiveBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        static DefaultMidpointHandleSizeFunction(position: UnityEngine.Vector3): number;
        SetColor(color: UnityEngine.Color): void;
        DrawHandle(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum PrimitiveBoundsHandle_Axes {
        None = 0,
        X = 1,
        Y = 2,
        Z = 4,
        All = 7,
      }
      export class SphereBoundsHandle {
        constructor(controlIDHint: number);
        constructor();
        radius: number;
        center: UnityEngine.Vector3;
        axes: UnityEditor.IMGUI.Controls.PrimitiveBoundsHandle_Axes;
        handleColor: UnityEngine.Color;
        wireframeColor: UnityEngine.Color;
        midpointHandleDrawFunction: UnityEditor.Handles_CapFunction;
        midpointHandleSizeFunction: UnityEditor.Handles_SizeFunction;
        SetColor(color: UnityEngine.Color): void;
        DrawHandle(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SearchField {
        constructor();
        searchFieldControlID: number;
        autoSetFocusOnFindCommand: boolean;
        SetFocus(): void;
        HasFocus(): boolean;
        OnGUI(rect: UnityEngine.Rect, text: string, style: UnityEngine.GUIStyle, cancelButtonStyle: UnityEngine.GUIStyle, emptyCancelButtonStyle: UnityEngine.GUIStyle): string;
        OnGUI(rect: UnityEngine.Rect, text: string): string;
        OnGUI(text: string, ...options: UnityEngine.GUILayoutOption[]): string;
        OnToolbarGUI(rect: UnityEngine.Rect, text: string): string;
        OnToolbarGUI(text: string, ...options: UnityEngine.GUILayoutOption[]): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SearchField_SearchFieldCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(): void;
        BeginInvoke(callback: System.AsyncCallback, object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): void;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeader {
        constructor(state: UnityEditor.IMGUI.Controls.MultiColumnHeaderState);
        height: number;
        canSort: boolean;
        sortedColumnIndex: number;
        state: UnityEditor.IMGUI.Controls.MultiColumnHeaderState;
        SetSortingColumns(columnIndices: number[], sortAscending: boolean[]): void;
        SetSorting(columnIndex: number, sortAscending: boolean): void;
        SetSortDirection(columnIndex: number, sortAscending: boolean): void;
        IsSortedAscending(columnIndex: number): boolean;
        GetColumn(columnIndex: number): UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column;
        IsColumnVisible(columnIndex: number): boolean;
        GetVisibleColumnIndex(columnIndex: number): number;
        GetCellRect(visibleColumnIndex: number, rowRect: UnityEngine.Rect): UnityEngine.Rect;
        GetColumnRect(visibleColumnIndex: number): UnityEngine.Rect;
        ResizeToFit(): void;
        OnGUI(rect: UnityEngine.Rect, xScroll: number): void;
        Repaint(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeader_HeaderCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader): void;
        BeginInvoke(multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader, callback: System.AsyncCallback, object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): void;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeader_DefaultGUI {
        static defaultHeight: number;
        static minimumHeight: number;
        static columnContentMargin: number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeader_DefaultStyles {
        static columnHeader: UnityEngine.GUIStyle;
        static columnHeaderRightAligned: UnityEngine.GUIStyle;
        static columnHeaderCenterAligned: UnityEngine.GUIStyle;
        static background: UnityEngine.GUIStyle;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeaderState {
        constructor(columns: UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column[]);
        sortedColumnIndex: number;
        maximumNumberOfSortedColumns: number;
        sortedColumns: number[];
        columns: UnityEditor.IMGUI.Controls.MultiColumnHeaderState_Column[];
        visibleColumns: number[];
        widthOfAllVisibleColumns: number;
        static CanOverwriteSerializedFields(source: UnityEditor.IMGUI.Controls.MultiColumnHeaderState, destination: UnityEditor.IMGUI.Controls.MultiColumnHeaderState): boolean;
        static OverwriteSerializedFields(source: UnityEditor.IMGUI.Controls.MultiColumnHeaderState, destination: UnityEditor.IMGUI.Controls.MultiColumnHeaderState): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MultiColumnHeaderState_Column {
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
        userData: number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeViewState {
        constructor();
        selectedIDs: number[];
        lastClickedID: number;
        expandedIDs: number[];
        searchString: string;
        scrollPos: UnityEngine.Vector2;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeViewItem {
        constructor();
        constructor(id: number);
        constructor(id: number, depth: number);
        constructor(id: number, depth: number, displayName: string);
        id: number;
        displayName: string;
        depth: number;
        hasChildren: boolean;
        children: UnityEditor.IMGUI.Controls.TreeViewItem[];
        parent: UnityEditor.IMGUI.Controls.TreeViewItem;
        icon: UnityEngine.Texture2D;
        AddChild(child: UnityEditor.IMGUI.Controls.TreeViewItem): void;
        CompareTo(other: UnityEditor.IMGUI.Controls.TreeViewItem): number;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class TreeView {
        constructor(state: UnityEditor.IMGUI.Controls.TreeViewState);
        constructor(state: UnityEditor.IMGUI.Controls.TreeViewState, multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader);
        state: UnityEditor.IMGUI.Controls.TreeViewState;
        multiColumnHeader: UnityEditor.IMGUI.Controls.MultiColumnHeader;
        totalHeight: number;
        treeViewControlID: number;
        hasSearch: boolean;
        searchString: string;
        Reload(): void;
        Repaint(): void;
        GetRows(): System.Collections.Generic.IList<UnityEditor.IMGUI.Controls.TreeViewItem>;
        ExpandAll(): void;
        CollapseAll(): void;
        SetExpandedRecursive(id: number, expanded: boolean): void;
        SetExpanded(id: number, expanded: boolean): boolean;
        SetExpanded(ids: System.Collections.Generic.IList<number>): void;
        GetExpanded(): System.Collections.Generic.IList<number>;
        IsExpanded(id: number): boolean;
        GetSelection(): System.Collections.Generic.IList<number>;
        SetSelection(selectedIDs: System.Collections.Generic.IList<number>): void;
        SetSelection(selectedIDs: System.Collections.Generic.IList<number>, options: UnityEditor.IMGUI.Controls.TreeViewSelectionOptions): void;
        IsSelected(id: number): boolean;
        HasSelection(): boolean;
        HasFocus(): boolean;
        SetFocus(): void;
        SetFocusAndEnsureSelectedItem(): void;
        BeginRename(item: UnityEditor.IMGUI.Controls.TreeViewItem): boolean;
        BeginRename(item: UnityEditor.IMGUI.Controls.TreeViewItem, delay: number): boolean;
        EndRename(): void;
        FrameItem(id: number): void;
        OnGUI(rect: UnityEngine.Rect): void;
        SelectAllRows(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeView_DoFoldoutCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(position: UnityEngine.Rect, expandedState: boolean, style: UnityEngine.GUIStyle): boolean;
        BeginInvoke(position: UnityEngine.Rect, expandedState: boolean, style: UnityEngine.GUIStyle, callback: System.AsyncCallback, object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): boolean;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeView_GetNewSelectionFunction {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(clickedItem: UnityEditor.IMGUI.Controls.TreeViewItem, keepMultiSelection: boolean, useActionKeyAsShift: boolean): number[];
        BeginInvoke(clickedItem: UnityEditor.IMGUI.Controls.TreeViewItem, keepMultiSelection: boolean, useActionKeyAsShift: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): number[];
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeView_DefaultGUI {
        static FoldoutLabel(rect: UnityEngine.Rect, label: string, selected: boolean, focused: boolean): void;
        static Label(rect: UnityEngine.Rect, label: string, selected: boolean, focused: boolean): void;
        static LabelRightAligned(rect: UnityEngine.Rect, label: string, selected: boolean, focused: boolean): void;
        static BoldLabel(rect: UnityEngine.Rect, label: string, selected: boolean, focused: boolean): void;
        static BoldLabelRightAligned(rect: UnityEngine.Rect, label: string, selected: boolean, focused: boolean): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TreeView_DefaultStyles {
        static foldoutLabel: UnityEngine.GUIStyle;
        static label: UnityEngine.GUIStyle;
        static labelRightAligned: UnityEngine.GUIStyle;
        static boldLabel: UnityEngine.GUIStyle;
        static boldLabelRightAligned: UnityEngine.GUIStyle;
        static backgroundEven: UnityEngine.GUIStyle;
        static backgroundOdd: UnityEngine.GUIStyle;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum TreeViewSelectionOptions {
        None = 0,
        FireSelectionChanged = 1,
        RevealAndFrame = 2,
      }
      export class AdvancedDropdownItem {
        constructor(name: string);
        name: string;
        icon: UnityEngine.Texture2D;
        id: number;
        enabled: boolean;
        children: System.Collections.Generic.IEnumerable<UnityEditor.IMGUI.Controls.AdvancedDropdownItem>;
        AddChild(child: UnityEditor.IMGUI.Controls.AdvancedDropdownItem): void;
        CompareTo(o: any): number;
        AddSeparator(): void;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AdvancedDropdownState {
        constructor();
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AdvancedDropdown {
        constructor(state: UnityEditor.IMGUI.Controls.AdvancedDropdownState);
        Show(rect: UnityEngine.Rect): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class JointAngularLimitHandle {
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
        DrawHandle(): void;
        DrawHandle(usingArticulations: boolean): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Localization {
    export namespace Editor {
      export class Localization {
        static Tr(str: string): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class LocalizationGroup {
        constructor();
        constructor(behaviour: UnityEngine.Behaviour);
        constructor(type: System.Type);
        constructor(obj: any);
        locGroupName: string;
        Dispose(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Macros {
    export class MacroEvaluator {
      static Eval(macro: string): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class MethodEvaluator {
      static Eval(assemblyFile: string, typeName: string, methodName: string, paramTypes: System.Type[], args: any[]): any;
      static ExecuteExternalCode(parcel: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Media {
    export class MediaRational {
      constructor(numerator: number);
      constructor(numerator: number, denominator: number);
      inverse: UnityEditor.Media.MediaRational;
      isValid: boolean;
      isZero: boolean;
      isNegative: boolean;
      static Invalid: UnityEditor.Media.MediaRational;
      numerator: number;
      denominator: number;
      Set(numerator: number, denominator?: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class MediaTime {
      constructor(seconds: System.Int64);
      constructor(count: System.Int64, rateNumerator: System.UInt32, rateDenominator?: System.UInt32);
      count: System.Int64;
      rate: UnityEditor.Media.MediaRational;
      static Invalid: UnityEditor.Media.MediaTime;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class H264EncoderAttributes {
      gopSize: System.UInt32;
      numConsecutiveBFrames: System.UInt32;
      profile: UnityEditor.VideoEncodingProfile;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class VP8EncoderAttributes {
      keyframeDistance: System.UInt32;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class VideoTrackEncoderAttributes {
      constructor(h264Attrs: UnityEditor.Media.H264EncoderAttributes);
      constructor(vp8Attrs: UnityEditor.Media.VP8EncoderAttributes);
      frameRate: UnityEditor.Media.MediaRational;
      width: System.UInt32;
      height: System.UInt32;
      targetBitRate: System.UInt32;
      bitRateMode: UnityEditor.VideoBitrateMode;
      includeAlpha: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class VideoTrackAttributes {
      frameRate: UnityEditor.Media.MediaRational;
      width: System.UInt32;
      height: System.UInt32;
      includeAlpha: boolean;
      bitRateMode: UnityEditor.VideoBitrateMode;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AudioTrackAttributes {
      sampleRate: UnityEditor.Media.MediaRational;
      channelCount: System.UInt16;
      language: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class MediaEncoder {
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes[]);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackEncoderAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes[]);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackEncoderAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackEncoderAttributes);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes, audioAttrs: UnityEditor.Media.AudioTrackAttributes);
      constructor(filePath: string, videoAttrs: UnityEditor.Media.VideoTrackAttributes);
      constructor(filePath: string, audioAttrs: UnityEditor.Media.AudioTrackAttributes[]);
      constructor(filePath: string, audioAttrs: UnityEditor.Media.AudioTrackAttributes);
      m_Ptr: System.IntPtr;
      AddFrame(width: number, height: number, rowBytes: number, format: UnityEngine.TextureFormat, data: Unity.Collections.NativeArray<System.Byte>): boolean;
      AddFrame(width: number, height: number, rowBytes: number, format: UnityEngine.TextureFormat, data: Unity.Collections.NativeArray<System.Byte>, time: UnityEditor.Media.MediaTime): boolean;
      AddFrame(texture: UnityEngine.Texture2D): boolean;
      AddFrame(texture: UnityEngine.Texture2D, time: UnityEditor.Media.MediaTime): boolean;
      AddSamples(trackIndex: System.UInt16, interleavedSamples: Unity.Collections.NativeArray<number>): boolean;
      AddSamples(interleavedSamples: Unity.Collections.NativeArray<number>): boolean;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace MemoryProfiler {
    export class MemorySnapshot {
      static RequestNewSnapshot(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PackedMemorySnapshot {
      constructor(snapshot: UnityEditor.Profiling.Memory.Experimental.PackedMemorySnapshot);
      nativeTypes: UnityEditor.MemoryProfiler.PackedNativeType[];
      nativeObjects: UnityEditor.MemoryProfiler.PackedNativeUnityEngineObject[];
      gcHandles: UnityEditor.MemoryProfiler.PackedGCHandle[];
      connections: UnityEditor.MemoryProfiler.Connection[];
      managedHeapSections: UnityEditor.MemoryProfiler.MemorySection[];
      typeDescriptions: UnityEditor.MemoryProfiler.TypeDescription[];
      virtualMachineInformation: UnityEditor.MemoryProfiler.VirtualMachineInformation;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PackedNativeType {
      constructor(name: string, nativeBaseTypeArrayIndex: number);
      name: string;
      baseClassId: number;
      nativeBaseTypeArrayIndex: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PackedNativeUnityEngineObject {
      constructor(name: string, instanceId: number, size: number, nativeTypeArrayIndex: number, hideFlags: UnityEngine.HideFlags, flags: UnityEditor.MemoryProfiler.PackedNativeUnityEngineObject_ObjectFlags, nativeObjectAddress: System.Int64);
      isPersistent: boolean;
      isDontDestroyOnLoad: boolean;
      isManager: boolean;
      name: string;
      instanceId: number;
      size: number;
      classId: number;
      nativeTypeArrayIndex: number;
      hideFlags: UnityEngine.HideFlags;
      nativeObjectAddress: System.Int64;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum PackedNativeUnityEngineObject_ObjectFlags {
      IsDontDestroyOnLoad = 1,
      IsPersistent = 2,
      IsManager = 4,
    }
    export class PackedGCHandle {
      constructor(target: System.UInt64);
      target: System.UInt64;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Connection {
      constructor(from: number, to: number);
      from: number;
      to: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class MemorySection {
      constructor(bytes: System.Byte[], startAddress: System.UInt64);
      bytes: System.Byte[];
      startAddress: System.UInt64;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class TypeDescription {
      constructor(name: string, assembly: string, fields: UnityEditor.MemoryProfiler.FieldDescription[], staticFieldBytes: System.Byte[], baseOrElementTypeIndes: number, size: number, typeInfoAddress: System.UInt64, typeIndex: number, flags: UnityEditor.MemoryProfiler.TypeDescription_TypeFlags);
      isValueType: boolean;
      isArray: boolean;
      arrayRank: number;
      name: string;
      assembly: string;
      fields: UnityEditor.MemoryProfiler.FieldDescription[];
      staticFieldBytes: System.Byte[];
      baseOrElementTypeIndex: number;
      size: number;
      typeInfoAddress: System.UInt64;
      typeIndex: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum TypeDescription_TypeFlags {
      kNone = 0,
      kValueType = 1,
      kArray = 2,
      kArrayRankMask = -65536,
    }
    export class FieldDescription {
      constructor(name: string, offset: number, typeIndex: number, isStatic: boolean);
      name: string;
      offset: number;
      typeIndex: number;
      isStatic: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class VirtualMachineInformation {
      pointerSize: number;
      objectHeaderSize: number;
      arrayHeaderSize: number;
      arrayBoundsOffsetInHeader: number;
      arraySizeOffsetInHeader: number;
      allocationGranularity: number;
      heapFormatVersion: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace MPE {
    export class ChannelClient {
      clientId: number;
      channelName: string;
      isAutoTick: boolean;
      IsConnected(): boolean;
      Start(autoTick: boolean): void;
      Stop(): void;
      Close(): void;
      Tick(): void;
      Send(data: string): void;
      Send(data: System.Byte[]): void;
      RegisterMessageHandler(handler: ((arg0: string) => void)): (() => void);
      UnregisterMessageHandler(handler: ((arg0: string) => void)): void;
      RegisterMessageHandler(handler: ((arg0: System.Byte[]) => void)): (() => void);
      UnregisterMessageHandler(handler: ((arg0: System.Byte[]) => void)): void;
      NewRequestId(): number;
      GetChannelClientInfo(): UnityEditor.MPE.ChannelClientInfo;
      static Send(connectionId: number, data: System.Byte[]): void;
      static Close(channelName: string): void;
      static GetOrCreateClient(channelName: string): UnityEditor.MPE.ChannelClient;
      static Shutdown(): void;
      static GetChannelClientInfo(channelName: string): UnityEditor.MPE.ChannelClientInfo;
      static NewRequestId(clientId: number): number;
      static GetChannelClientInfo(clientId: number): UnityEditor.MPE.ChannelClientInfo;
      static GetChannelClientList(): UnityEditor.MPE.ChannelClientInfo[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ChannelClientScope {
      constructor(autoTick: boolean, channelName: string, handler: ((arg0: string) => void), closeClientOnExit?: boolean);
      constructor(autoTick: boolean, channelName: string, handler: ((arg0: System.Byte[]) => void), closeClientOnExit?: boolean);
      client: UnityEditor.MPE.ChannelClient;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ChannelService {
      static GetOrCreateChannel(channelName: string, handler: ((arg0: number, arg1: System.Byte[]) => void)): (() => void);
      static RegisterMessageHandler(channelName: string, handler: ((arg0: number, arg1: System.Byte[]) => void)): (() => void);
      static UnregisterMessageHandler(channelName: string, handler: ((arg0: number, arg1: System.Byte[]) => void)): void;
      static CloseChannel(channelName: string): void;
      static Broadcast(channelId: number, data: System.Byte[]): void;
      static Send(connectionId: number, data: System.Byte[]): void;
      static GetAddress(): string;
      static GetPort(): number;
      static Start(): void;
      static Stop(): void;
      static IsRunning(): boolean;
      static GetChannelList(): UnityEditor.MPE.ChannelInfo[];
      static GetChannelClientList(): UnityEditor.MPE.ChannelClientInfo[];
      static Broadcast(channelId: number, data: string): void;
      static BroadcastBinary(channelId: number, data: System.Byte[]): void;
      static Send(connectionId: number, data: string): void;
      static ChannelNameToId(channelName: string): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ChannelScope {
      constructor(channelName: string, handler: ((arg0: number, arg1: System.Byte[]) => void), closeChannelOnExit?: boolean);
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum EventDataSerialization {
      StandardJson = 0,
      JsonUtility = 1,
    }
    export class EventService {
      static isConnected: boolean;
      static Start(): void;
      static Close(): void;
      static RegisterEventHandler(eventType: string, handler: ((arg0: string, arg1: any[]) => void)): (() => void);
      static RegisterEventHandler(eventType: string, handler: ((arg0: string, arg1: any[]) => any)): (() => void);
      static UnregisterEventHandler(eventType: string, handler: ((arg0: string, arg1: any[]) => any)): void;
      static Clear(): void;
      static Emit(eventType: string, args?: any, targetId?: number, eventDataSerialization?: UnityEditor.MPE.EventDataSerialization): void;
      static Emit(eventType: string, args: any[], targetId?: number, eventDataSerialization?: UnityEditor.MPE.EventDataSerialization): void;
      static IsRequestPending(eventType: string): boolean;
      static CancelRequest(eventType: string, message?: string): boolean;
      static Request(eventType: string, promiseHandler: ((arg0: System.Exception, arg1: any[]) => void), args?: any, timeoutInMs?: System.Int64, eventDataSerialization?: UnityEditor.MPE.EventDataSerialization): void;
      static Request(eventType: string, promiseHandler: ((arg0: System.Exception, arg1: any[]) => void), args: any[], timeoutInMs?: System.Int64, eventDataSerialization?: UnityEditor.MPE.EventDataSerialization): void;
      static Log(msg: string): void;
      static Log(msg: string, logType: UnityEngine.LogType): void;
      static Tick(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
      Main = 1,
      UMP_SLAVE = 2,
      Slave = 2,
      Secondary = 2,
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
    export class ChannelInfo {
      name: string;
      id: number;
      static invalidChannel: UnityEditor.MPE.ChannelInfo;
      Equals(obj: UnityEditor.MPE.ChannelInfo): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ChannelClientInfo {
      name: string;
      clientId: number;
      connectionId: number;
      static invalidClient: UnityEditor.MPE.ChannelClientInfo;
      Equals(obj: UnityEditor.MPE.ChannelClientInfo): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ProcessService {
      constructor();
      static level: UnityEditor.MPE.ProcessLevel;
      static roleName: string;
      static IsChannelServiceStarted(): boolean;
      static ReadParameter(paramName: string): string;
      static LaunchSlave(roleName: string, ...keyValuePairs: string[]): number;
      static Launch(roleName: string, ...keyValuePairs: string[]): number;
      static TerminateSlave(pid: number): void;
      static Terminate(pid: number): void;
      static GetSlaveProcessState(pid: number): UnityEditor.MPE.ProcessState;
      static GetProcessState(pid: number): UnityEditor.MPE.ProcessState;
      static HasCapability(capName: string): boolean;
      static ApplyPropertyModifications(modifications: UnityEditor.PropertyModification[]): void;
      static SerializeObject(instanceId: number): System.Byte[];
      static DeserializeObject(bytes: System.Byte[]): UnityEngine.Object;
      static EnableProfileConnection(dataPath: string): number;
      static DisableProfileConnection(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Networking {
    export namespace PlayerConnection {
      export class PlayerConnectionGUIUtility {
        static GetConnectionState(parentWindow: UnityEditor.EditorWindow, connectedCallback?: ((arg0: string) => void)): UnityEngine.Networking.PlayerConnection.IConnectionState;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PlayerConnectionGUI {
        static ConnectionTargetSelectionDropdown(rect: UnityEngine.Rect, state: UnityEngine.Networking.PlayerConnection.IConnectionState, style?: UnityEngine.GUIStyle): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PlayerConnectionGUILayout {
        static ConnectionTargetSelectionDropdown(state: UnityEngine.Networking.PlayerConnection.IConnectionState, style?: UnityEngine.GUIStyle): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ConnectedPlayer {
        constructor();
        constructor(playerId: number);
        constructor(playerId: number, name: string);
        PlayerId: number;
        playerId: number;
        name: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class EditorConnection {
        constructor();
        ConnectedPlayers: UnityEditor.Networking.PlayerConnection.ConnectedPlayer[];
        name: string;
        hideFlags: UnityEngine.HideFlags;
        Initialize(): void;
        Register(messageId: System.Guid, callback: UnityEngine.Events.UnityAction<UnityEngine.Networking.PlayerConnection.MessageEventArgs>): void;
        Unregister(messageId: System.Guid, callback: UnityEngine.Events.UnityAction<UnityEngine.Networking.PlayerConnection.MessageEventArgs>): void;
        RegisterConnection(callback: UnityEngine.Events.UnityAction<number>): void;
        RegisterDisconnection(callback: UnityEngine.Events.UnityAction<number>): void;
        UnregisterConnection(callback: UnityEngine.Events.UnityAction<number>): void;
        UnregisterDisconnection(callback: UnityEngine.Events.UnityAction<number>): void;
        Send(messageId: System.Guid, data: System.Byte[], playerId: number): void;
        Send(messageId: System.Guid, data: System.Byte[]): void;
        TrySend(messageId: System.Guid, data: System.Byte[], playerId: number): boolean;
        TrySend(messageId: System.Guid, data: System.Byte[]): boolean;
        DisconnectAll(): void;
        SetDirty(): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
    }
  }
  export namespace Overlays {
    export interface ITransientOverlay {
      visible: boolean;
    }
    export class IMGUIOverlay {
      containerWindow: UnityEditor.EditorWindow;
      id: string;
      layout: UnityEditor.Overlays.Layout;
      collapsed: boolean;
      displayName: string;
      displayed: boolean;
      isInToolbar: boolean;
      floatingPosition: UnityEngine.Vector2;
      floating: boolean;
      CreatePanelContent(): UnityEngine.UIElements.VisualElement;
      OnGUI(): void;
      OnCreated(): void;
      OnWillBeDestroyed(): void;
      Undock(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum Layout {
      HorizontalToolbar = 1,
      VerticalToolbar = 2,
      Panel = 4,
      All = 7,
    }
    export class Overlay {
      containerWindow: UnityEditor.EditorWindow;
      id: string;
      layout: UnityEditor.Overlays.Layout;
      collapsed: boolean;
      displayName: string;
      displayed: boolean;
      isInToolbar: boolean;
      floatingPosition: UnityEngine.Vector2;
      floating: boolean;
      static ussClassName: string;
      CreatePanelContent(): UnityEngine.UIElements.VisualElement;
      OnCreated(): void;
      OnWillBeDestroyed(): void;
      Undock(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ISupportsOverlays {
    }
    export class ToolbarOverlay {
      containerWindow: UnityEditor.EditorWindow;
      id: string;
      layout: UnityEditor.Overlays.Layout;
      collapsed: boolean;
      displayName: string;
      displayed: boolean;
      isInToolbar: boolean;
      floatingPosition: UnityEngine.Vector2;
      floating: boolean;
      CreateHorizontalToolbarContent(): UnityEngine.UIElements.VisualElement;
      CreateVerticalToolbarContent(): UnityEngine.UIElements.VisualElement;
      CreatePanelContent(): UnityEngine.UIElements.VisualElement;
      OnCreated(): void;
      OnWillBeDestroyed(): void;
      Undock(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace PackageManager {
    export class AuthorInfo {
      name: string;
      email: string;
      url: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BuildUtilities {
      static RegisterShouldIncludeInBuildCallback(cb: UnityEditor.PackageManager.IShouldIncludeInBuildCallback): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Client {
      static LogLevel: UnityEditor.PackageManager.LogLevel;
      static List(offlineMode: boolean, includeIndirectDependencies: boolean): UnityEditor.PackageManager.Requests.ListRequest;
      static List(offlineMode: boolean): UnityEditor.PackageManager.Requests.ListRequest;
      static List(): UnityEditor.PackageManager.Requests.ListRequest;
      static Add(identifier: string): UnityEditor.PackageManager.Requests.AddRequest;
      static AddAndRemove(packagesToAdd?: string[], packagesToRemove?: string[]): UnityEditor.PackageManager.Requests.AddAndRemoveRequest;
      static Embed(packageName: string): UnityEditor.PackageManager.Requests.EmbedRequest;
      static Remove(packageName: string): UnityEditor.PackageManager.Requests.RemoveRequest;
      static Search(packageIdOrName: string, offlineMode: boolean): UnityEditor.PackageManager.Requests.SearchRequest;
      static Search(packageIdOrName: string): UnityEditor.PackageManager.Requests.SearchRequest;
      static SearchAll(offlineMode: boolean): UnityEditor.PackageManager.Requests.SearchRequest;
      static SearchAll(): UnityEditor.PackageManager.Requests.SearchRequest;
      static ResetToEditorDefaults(): UnityEditor.PackageManager.Requests.ResetToEditorDefaultsRequest;
      static Pack(packageFolder: string, targetFolder: string): UnityEditor.PackageManager.Requests.PackRequest;
      static Resolve(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DependencyInfo {
      version: string;
      name: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Error {
      errorCode: UnityEditor.PackageManager.ErrorCode;
      message: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum ErrorCode {
      Unknown = 0,
      NotFound = 1,
      Forbidden = 2,
      InvalidParameter = 3,
      Conflict = 4,
      AggregateError = 5,
    }
    export class Events {
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class GitInfo {
      hash: string;
      revision: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IShouldIncludeInBuildCallback {
      PackageName: string;
      ShouldIncludeInBuild(path: string): boolean;
    }
    export enum LogLevel {
      Error = 0,
      Warn = 1,
      Info = 2,
      Verbose = 3,
      Debug = 4,
      Silly = 5,
    }
    export class PackageCollection {
      error: UnityEditor.PackageManager.Error;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PackageInfo {
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
      datePublished?: System.Nullable<System.DateTime>;
      git: UnityEditor.PackageManager.GitInfo;
      repository: UnityEditor.PackageManager.RepositoryInfo;
      static FindForAssetPath(assetPath: string): UnityEditor.PackageManager.PackageInfo;
      static FindForAssembly(assembly: System.Reflection.Assembly): UnityEditor.PackageManager.PackageInfo;
      static GetAllRegisteredPackages(): UnityEditor.PackageManager.PackageInfo[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PackageRegistrationEventArgs {
      added: UnityEditor.PackageManager.PackageInfo[];
      removed: UnityEditor.PackageManager.PackageInfo[];
      changedFrom: UnityEditor.PackageManager.PackageInfo[];
      changedTo: UnityEditor.PackageManager.PackageInfo[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class PackOperationResult {
      tarballPath: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RegistryInfo {
      name: string;
      url: string;
      isDefault: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RepositoryInfo {
      type: string;
      url: string;
      revision: string;
      path: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum StatusCode {
      InProgress = 0,
      Success = 1,
      Failure = 2,
    }
    export class VersionsInfo {
      all: string[];
      compatible: string[];
      verified: string;
      recommended: string;
      latest: string;
      latestCompatible: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Requests {
      export class AddAndRemoveRequest {
        Result: UnityEditor.PackageManager.PackageCollection;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AddRequest {
        Result: UnityEditor.PackageManager.PackageInfo;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class EmbedRequest {
        Result: UnityEditor.PackageManager.PackageInfo;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ListRequest {
        Result: UnityEditor.PackageManager.PackageCollection;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PackRequest {
        Result: UnityEditor.PackageManager.PackOperationResult;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class RemoveRequest {
        PackageIdOrName: string;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Request<T = any> {
        Result: T;
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SearchRequest {
        PackageIdOrName: string;
        Result: UnityEditor.PackageManager.PackageInfo[];
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ResetToEditorDefaultsRequest {
        Status: UnityEditor.PackageManager.StatusCode;
        IsCompleted: boolean;
        Error: UnityEditor.PackageManager.Error;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Playables {
    export class PlayableOutputEditorExtensions {
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Utility {
      static GetAllGraphs(): UnityEngine.Playables.PlayableGraph[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Presets {
    export class PresetSelectorReceiver {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelectionChanged(selection: UnityEditor.Presets.Preset): void;
      OnSelectionClosed(selection: UnityEditor.Presets.Preset): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class DefaultPresetSelectorReceiver {
      constructor();
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelectionChanged(selection: UnityEditor.Presets.Preset): void;
      OnSelectionClosed(selection: UnityEditor.Presets.Preset): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PresetSelector {
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
      static DrawPresetButton(rectangle: UnityEngine.Rect, targets: UnityEngine.Object[]): boolean;
      static ShowSelector(targets: UnityEngine.Object[], currentSelection: UnityEditor.Presets.Preset, createNewAllowed: boolean): void;
      static ShowSelector(target: UnityEngine.Object, currentSelection: UnityEditor.Presets.Preset, createNewAllowed: boolean, eventReceiver: UnityEditor.Presets.PresetSelectorReceiver): void;
      static ShowSelector(presetType: UnityEditor.Presets.PresetType, currentSelection: UnityEditor.Presets.Preset, createNewAllowed: boolean, eventReceiver: UnityEditor.Presets.PresetSelectorReceiver): void;
      BeginWindows(): void;
      EndWindows(): void;
      ShowNotification(notification: UnityEngine.GUIContent): void;
      ShowNotification(notification: UnityEngine.GUIContent, fadeoutWait: number): void;
      RemoveNotification(): void;
      ShowTab(): void;
      Focus(): void;
      ShowUtility(): void;
      ShowPopup(): void;
      ShowModalUtility(): void;
      ShowAsDropDown(buttonRect: UnityEngine.Rect, windowSize: UnityEngine.Vector2): void;
      Show(): void;
      Show(immediateDisplay: boolean): void;
      ShowAuxWindow(): void;
      ShowModal(): void;
      SaveChanges(): void;
      DiscardChanges(): void;
      Close(): void;
      Repaint(): void;
      SendEvent(e: UnityEngine.Event): boolean;
      GetExtraPaneTypes(): System.Collections.Generic.IEnumerable<System.Type>;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Preset {
      constructor(source: UnityEngine.Object);
      PropertyModifications: UnityEditor.PropertyModification[];
      excludedProperties: string[];
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ApplyTo(target: UnityEngine.Object): boolean;
      ApplyTo(target: UnityEngine.Object, selectedPropertyPaths: string[]): boolean;
      DataEquals(target: UnityEngine.Object): boolean;
      UpdateProperties(source: UnityEngine.Object): boolean;
      GetPresetType(): UnityEditor.Presets.PresetType;
      GetTargetFullTypeName(): string;
      GetTargetTypeName(): string;
      IsValid(): boolean;
      CanBeAppliedTo(target: UnityEngine.Object): boolean;
      static GetDefaultPresetsForObject(target: UnityEngine.Object): UnityEditor.Presets.Preset[];
      static GetDefaultForObject(target: UnityEngine.Object): UnityEditor.Presets.Preset;
      static GetDefaultForPreset(preset: UnityEditor.Presets.Preset): UnityEditor.Presets.Preset;
      static GetAllDefaultTypes(): UnityEditor.Presets.PresetType[];
      static GetDefaultPresetsForType(type: UnityEditor.Presets.PresetType): UnityEditor.Presets.DefaultPreset[];
      static SetDefaultPresetsForType(type: UnityEditor.Presets.PresetType, presets: UnityEditor.Presets.DefaultPreset[]): boolean;
      static SetAsDefault(preset: UnityEditor.Presets.Preset): boolean;
      static RemoveFromDefault(preset: UnityEditor.Presets.Preset): void;
      static IsPresetExcludedFromDefaultPresets(preset: UnityEditor.Presets.Preset): boolean;
      static IsObjectExcludedFromDefaultPresets(target: UnityEngine.Object): boolean;
      static IsObjectExcludedFromPresets(target: UnityEngine.Object): boolean;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class DefaultPreset {
      constructor(filter: string, preset: UnityEditor.Presets.Preset);
      constructor(filter: string, preset: UnityEditor.Presets.Preset, enabled: boolean);
      filter: string;
      preset: UnityEditor.Presets.Preset;
      enabled: boolean;
      m_Filter: string;
      m_Preset: UnityEditor.Presets.Preset;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PresetType {
      constructor(o: UnityEngine.Object);
      Equals(obj: any): boolean;
      GetHashCode(): number;
      IsValid(): boolean;
      IsValidDefault(): boolean;
      GetManagedTypeName(): string;
      Equals(other: UnityEditor.Presets.PresetType): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace Profiling {
    export class ProfilerEditorUtility {
      static SetSelection(controller: UnityEditor.Profiling.IProfilerFrameTimeViewSampleSelectionController, frameIndex: System.Int64, threadGroupName: string, threadName: string, sampleName: string, markerNamePath?: string, threadId?: System.UInt64): boolean;
      static SetSelection(controller: UnityEditor.Profiling.IProfilerFrameTimeViewSampleSelectionController, frameIndex: System.Int64, threadGroupName: string, threadName: string, sampleMarkerId: number, markerIdPath?: number[], threadId?: System.UInt64): boolean;
      static SetSelection(controller: UnityEditor.Profiling.IProfilerFrameTimeViewSampleSelectionController, markerNameOrMarkerNamePath: string, frameIndex?: System.Int64, threadGroupName?: string, threadName?: string, threadId?: System.UInt64): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IProfilerFrameTimeViewSampleSelectionController {
      selection: UnityEditor.Profiling.ProfilerTimeSampleSelection;
      sampleNameSearchFilter: string;
      focusedThreadIndex: number;
      SetSelection(selection: UnityEditor.Profiling.ProfilerTimeSampleSelection): boolean;
      ClearSelection(): void;
    }
    export class ProfilerTimeSampleSelection {
      constructor(frameIndex: System.Int64, threadGroupName: string, threadName: string, threadId: System.UInt64, rawSampleIndex: number, sampleName?: string);
      constructor(frameIndex: System.Int64, threadGroupName: string, threadName: string, threadId: System.UInt64, rawSampleIndices: System.Collections.Generic.IList<number>, sampleName?: string);
      constructor(selection: UnityEditor.Profiling.ProfilerTimeSampleSelection);
      frameIndex: System.Int64;
      threadGroupName: string;
      threadName: string;
      threadId: System.UInt64;
      sampleDisplayName: string;
      markerNamePath: string[];
      markerPathDepth: number;
      rawSampleIndices: number[];
      rawSampleIndex: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ProfilerCategoryInfo {
      id: System.UInt16;
      color: UnityEngine.Color32;
      name: string;
      flags: Unity.Profiling.ProfilerCategoryFlags;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class FrameDataView {
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: System.UInt64;
      frameStartTimeMs: number;
      frameStartTimeNs: System.UInt64;
      frameTimeMs: number;
      frameTimeNs: System.UInt64;
      frameGpuTimeMs: number;
      frameGpuTimeNs: System.UInt64;
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      static invalidMarkerId: number;
      static invalidThreadIndex: number;
      static invalidThreadId: System.UInt64;
      Dispose(): void;
      GetMarkerCategoryIndex(markerId: number): System.UInt16;
      GetMarkerFlags(markerId: number): Unity.Profiling.LowLevel.MarkerFlags;
      GetMarkerName(markerId: number): string;
      GetMarkerMetadataInfo(markerId: number): UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[];
      GetMarkerId(markerName: string): number;
      GetMarkers(markerInfoList: UnityEditor.Profiling.FrameDataView_MarkerInfo[]): void;
      GetCategoryInfo(id: System.UInt16): UnityEditor.Profiling.ProfilerCategoryInfo;
      GetAllCategories(categoryInfoList: UnityEditor.Profiling.ProfilerCategoryInfo[]): void;
      GetFrameMetaDataCount(id: System.Guid, tag: number): number;
      GetSessionMetaDataCount(id: System.Guid, tag: number): number;
      ResolveMethodInfo(addr: System.UInt64): UnityEditor.Profiling.FrameDataView_MethodInfo;
      HasCounterValue(markerId: number): boolean;
      GetCounterValueAsInt(markerId: number): number;
      GetCounterValueAsLong(markerId: number): System.Int64;
      GetCounterValueAsFloat(markerId: number): number;
      GetCounterValueAsDouble(markerId: number): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FrameDataView_MarkerMetadataInfo {
      type: Unity.Profiling.LowLevel.ProfilerMarkerDataType;
      unit: Unity.Profiling.ProfilerMarkerDataUnit;
      name: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class FrameDataView_MarkerInfo {
      id: number;
      category: System.UInt16;
      flags: Unity.Profiling.LowLevel.MarkerFlags;
      name: string;
      metadataInfo: UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class FrameDataView_MethodInfo {
      methodName: string;
      sourceFileName: string;
      sourceFileLine: System.UInt32;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class HierarchyFrameDataView {
      viewMode: UnityEditor.Profiling.HierarchyFrameDataView_ViewModes;
      sortColumn: number;
      sortColumnAscending: boolean;
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: System.UInt64;
      frameStartTimeMs: number;
      frameStartTimeNs: System.UInt64;
      frameTimeMs: number;
      frameTimeNs: System.UInt64;
      frameGpuTimeMs: number;
      frameGpuTimeNs: System.UInt64;
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      static invalidSampleId: number;
      static columnDontSort: number;
      static columnName: number;
      static columnTotalPercent: number;
      static columnSelfPercent: number;
      static columnCalls: number;
      static columnGcMemory: number;
      static columnTotalTime: number;
      static columnSelfTime: number;
      static columnWarningCount: number;
      static columnObjectName: number;
      static columnStartTime: number;
      GetRootItemID(): number;
      GetItemMarkerID(id: number): number;
      GetItemMarkerFlags(id: number): Unity.Profiling.LowLevel.MarkerFlags;
      GetItemCategoryIndex(id: number): System.UInt16;
      GetItemDepth(id: number): number;
      HasItemChildren(id: number): boolean;
      GetItemChildren(id: number, outChildren: number[]): void;
      GetItemAncestors(id: number, outAncestors: number[]): void;
      GetItemDescendantsThatHaveChildren(id: number, outChildren: number[]): void;
      GetItemName(id: number): string;
      GetItemInstanceID(id: number): number;
      GetItemColumnData(id: number, column: number): string;
      GetItemColumnDataAsSingle(id: number, column: number): number;
      GetItemColumnDataAsFloat(id: number, column: number): number;
      GetItemColumnDataAsDouble(id: number, column: number): number;
      GetItemMetadataCount(id: number): number;
      GetItemMetadata(id: number, index: number): string;
      GetItemMetadataAsFloat(id: number, index: number): number;
      GetItemMetadataAsLong(id: number, index: number): System.Int64;
      GetItemMergedSamplesMetadataCount(id: number, sampleIndex: number): number;
      GetItemMergedSamplesMetadata(id: number, sampleIndex: number, metadataIndex: number): string;
      GetItemMergedSamplesMetadataAsFloat(id: number, sampleIndex: number, metadataIndex: number): number;
      GetItemMergedSamplesMetadataAsLong(id: number, sampleIndex: number, metadataIndex: number): System.Int64;
      ResolveItemCallstack(id: number): string;
      GetItemCallstack(id: number, outCallstack: System.UInt64[]): void;
      GetItemMergedSamplesCount(id: number): number;
      GetItemRawFrameDataViewIndices(id: number, outSampleIndices: number[]): void;
      ItemContainsRawFrameDataViewIndex(id: number, sampleIndex: number): boolean;
      GetItemMergedSamplesColumnData(id: number, column: number, outStrings: string[]): void;
      GetItemMergedSamplesColumnDataAsFloats(id: number, column: number, outValues: number[]): void;
      GetItemMergedSamplesColumnDataAsDoubles(id: number, column: number, outValues: number[]): void;
      GetItemMergedSamplesInstanceID(id: number, outInstanceIds: number[]): void;
      GetItemMergedSampleCallstack(id: number, sampleIndex: number, outCallstack: System.UInt64[]): void;
      ResolveItemMergedSampleCallstack(id: number, sampleIndex: number): string;
      GetItemMarkerIDPath(id: number, outFullIdPath: number[]): void;
      GetItemPath(id: number): string;
      Sort(sortColumn: number, sortAscending: boolean): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      Dispose(): void;
      GetMarkerCategoryIndex(markerId: number): System.UInt16;
      GetMarkerFlags(markerId: number): Unity.Profiling.LowLevel.MarkerFlags;
      GetMarkerName(markerId: number): string;
      GetMarkerMetadataInfo(markerId: number): UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[];
      GetMarkerId(markerName: string): number;
      GetMarkers(markerInfoList: UnityEditor.Profiling.FrameDataView_MarkerInfo[]): void;
      GetCategoryInfo(id: System.UInt16): UnityEditor.Profiling.ProfilerCategoryInfo;
      GetAllCategories(categoryInfoList: UnityEditor.Profiling.ProfilerCategoryInfo[]): void;
      GetFrameMetaDataCount(id: System.Guid, tag: number): number;
      GetSessionMetaDataCount(id: System.Guid, tag: number): number;
      ResolveMethodInfo(addr: System.UInt64): UnityEditor.Profiling.FrameDataView_MethodInfo;
      HasCounterValue(markerId: number): boolean;
      GetCounterValueAsInt(markerId: number): number;
      GetCounterValueAsLong(markerId: number): System.Int64;
      GetCounterValueAsFloat(markerId: number): number;
      GetCounterValueAsDouble(markerId: number): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum HierarchyFrameDataView_ViewModes {
      Default = 0,
      MergeSamplesWithTheSameName = 1,
      HideEditorOnlySamples = 2,
    }
    export class RawFrameDataView {
      valid: boolean;
      frameIndex: number;
      threadIndex: number;
      threadGroupName: string;
      threadName: string;
      threadId: System.UInt64;
      frameStartTimeMs: number;
      frameStartTimeNs: System.UInt64;
      frameTimeMs: number;
      frameTimeNs: System.UInt64;
      frameGpuTimeMs: number;
      frameGpuTimeNs: System.UInt64;
      frameFps: number;
      sampleCount: number;
      maxDepth: number;
      static invalidSampleIndex: number;
      GetSampleStartTimeMs(sampleIndex: number): number;
      GetSampleStartTimeNs(sampleIndex: number): System.UInt64;
      GetSampleTimeMs(sampleIndex: number): number;
      GetSampleTimeNs(sampleIndex: number): System.UInt64;
      GetSampleMarkerId(sampleIndex: number): number;
      GetSampleFlags(sampleIndex: number): Unity.Profiling.LowLevel.MarkerFlags;
      GetSampleCategoryIndex(sampleIndex: number): System.UInt16;
      GetSampleName(sampleIndex: number): string;
      GetSampleChildrenCount(sampleIndex: number): number;
      GetSampleChildrenCountRecursive(sampleIndex: number): number;
      GetSampleMetadataCount(sampleIndex: number): number;
      GetSampleMetadataAsString(sampleIndex: number, metadataIndex: number): string;
      GetSampleMetadataAsInt(sampleIndex: number, metadataIndex: number): number;
      GetSampleMetadataAsLong(sampleIndex: number, metadataIndex: number): System.Int64;
      GetSampleMetadataAsFloat(sampleIndex: number, metadataIndex: number): number;
      GetSampleMetadataAsDouble(sampleIndex: number, metadataIndex: number): number;
      GetSampleCallstack(sampleIndex: number, outCallstack: System.UInt64[]): void;
      GetSampleFlowEvents(sampleIndex: number, outFlowEvents: UnityEditor.Profiling.RawFrameDataView_FlowEvent[]): void;
      GetFlowEvents(outFlowEvents: UnityEditor.Profiling.RawFrameDataView_FlowEvent[]): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      Dispose(): void;
      GetMarkerCategoryIndex(markerId: number): System.UInt16;
      GetMarkerFlags(markerId: number): Unity.Profiling.LowLevel.MarkerFlags;
      GetMarkerName(markerId: number): string;
      GetMarkerMetadataInfo(markerId: number): UnityEditor.Profiling.FrameDataView_MarkerMetadataInfo[];
      GetMarkerId(markerName: string): number;
      GetMarkers(markerInfoList: UnityEditor.Profiling.FrameDataView_MarkerInfo[]): void;
      GetCategoryInfo(id: System.UInt16): UnityEditor.Profiling.ProfilerCategoryInfo;
      GetAllCategories(categoryInfoList: UnityEditor.Profiling.ProfilerCategoryInfo[]): void;
      GetFrameMetaDataCount(id: System.Guid, tag: number): number;
      GetSessionMetaDataCount(id: System.Guid, tag: number): number;
      ResolveMethodInfo(addr: System.UInt64): UnityEditor.Profiling.FrameDataView_MethodInfo;
      HasCounterValue(markerId: number): boolean;
      GetCounterValueAsInt(markerId: number): number;
      GetCounterValueAsLong(markerId: number): System.Int64;
      GetCounterValueAsFloat(markerId: number): number;
      GetCounterValueAsDouble(markerId: number): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RawFrameDataView_FlowEvent {
      ParentSampleIndex: number;
      FlowId: System.UInt32;
      FlowEventType: Unity.Profiling.ProfilerFlowEventType;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export namespace Memory {
      export namespace Experimental {
        export class ArrayEntries<T = any> {
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ConnectionEntries {
          from: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          to: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class GCHandleEntries {
          target: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ManagedMemorySectionEntries {
          bytes: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Byte[]>;
          startAddress: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeObjectEntries {
          objectName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          instanceId: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          size: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          nativeTypeArrayIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          hideFlags: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<UnityEngine.HideFlags>;
          flags: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<UnityEditor.Profiling.Memory.Experimental.ObjectFlags>;
          nativeObjectAddress: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          rootReferenceId: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Int64>;
          gcHandleIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeTypeEntries {
          typeName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          nativeBaseTypeArrayIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TypeDescriptionEntries {
          flags: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<UnityEditor.Profiling.Memory.Experimental.TypeFlags>;
          typeDescriptionName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          assembly: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          fieldIndices: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number[]>;
          staticFieldBytes: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Byte[]>;
          baseOrElementTypeIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          size: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          typeInfoAddress: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          typeIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class FieldDescriptionEntries {
          fieldDescriptionName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          offset: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          typeIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          isStatic: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<boolean>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeMemoryLabelEntries {
          memoryLabelName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeRootReferenceEntries {
          id: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Int64>;
          areaName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          objectName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          accumulatedSize: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeAllocationEntries {
          memoryRegionIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          rootReferenceId: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Int64>;
          allocationSiteId: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Int64>;
          address: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          size: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          overheadSize: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          paddingSize: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeMemoryRegionEntries {
          memoryRegionName: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          parentIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          addressBase: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          addressSize: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          firstAllocationIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          numAllocations: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeAllocationSiteEntries {
          id: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.Int64>;
          memoryLabelIndex: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<number>;
          callstackSymbols: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64[]>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NativeCallstackSymbolEntries {
          symbol: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<System.UInt64>;
          readableStackTrace: UnityEditor.Profiling.Memory.Experimental.ArrayEntries<string>;
          GetNumEntries(): System.UInt32;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class PackedMemorySnapshot {
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
          version: System.UInt32;
          metadata: UnityEngine.Profiling.Memory.Experimental.MetaData;
          filePath: string;
          recordDate: System.DateTime;
          captureFlags: UnityEngine.Profiling.Memory.Experimental.CaptureFlags;
          virtualMachineInformation: UnityEditor.Profiling.Memory.Experimental.VirtualMachineInformation;
          static Load(path: string): UnityEditor.Profiling.Memory.Experimental.PackedMemorySnapshot;
          static Convert(snapshot: UnityEditor.MemoryProfiler.PackedMemorySnapshot, writePath: string): boolean;
          static Save(snapshot: UnityEditor.Profiling.Memory.Experimental.PackedMemorySnapshot, writePath: string): void;
          Dispose(): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export enum ObjectFlags {
          IsDontDestroyOnLoad = 1,
          IsPersistent = 2,
          IsManager = 4,
        }
        export class ObjectFlagsExtensions {
          static IsDontDestroyOnLoad(flags: UnityEditor.Profiling.Memory.Experimental.ObjectFlags): boolean;
          static IsPersistent(flags: UnityEditor.Profiling.Memory.Experimental.ObjectFlags): boolean;
          static IsManager(flags: UnityEditor.Profiling.Memory.Experimental.ObjectFlags): boolean;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export enum TypeFlags {
          kNone = 0,
          kValueType = 1,
          kArray = 2,
          kArrayRankMask = -65536,
        }
        export class TypeFlagsExtensions {
          static IsValueType(flags: UnityEditor.Profiling.Memory.Experimental.TypeFlags): boolean;
          static IsArray(flags: UnityEditor.Profiling.Memory.Experimental.TypeFlags): boolean;
          static ArrayRank(flags: UnityEditor.Profiling.Memory.Experimental.TypeFlags): number;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class VirtualMachineInformation {
          pointerSize: number;
          objectHeaderSize: number;
          arrayHeaderSize: number;
          arrayBoundsOffsetInHeader: number;
          arraySizeOffsetInHeader: number;
          allocationGranularity: number;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          ToString(): string;
          GetType(): System.Type;
        }
      }
    }
  }
  export namespace ProjectWindowCallback {
    export class EndNameEditAction {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnEnable(): void;
      Action(instanceId: number, pathName: string, resourceFile: string): void;
      Cancelled(instanceId: number, pathName: string, resourceFile: string): void;
      CleanUp(): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace Purchasing {
    export class PurchasingSettings {
      static enabled: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Rendering {
    export class EditorGraphicsSettings {
      constructor();
      static albedoSwatches: UnityEditor.Rendering.AlbedoSwatchInfo[];
      static GetTierSettings(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.GraphicsTier): UnityEditor.Rendering.TierSettings;
      static GetTierSettings(target: UnityEditor.Build.NamedBuildTarget, tier: UnityEngine.Rendering.GraphicsTier): UnityEditor.Rendering.TierSettings;
      static SetTierSettings(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.GraphicsTier, settings: UnityEditor.Rendering.TierSettings): void;
      static SetTierSettings(target: UnityEditor.Build.NamedBuildTarget, tier: UnityEngine.Rendering.GraphicsTier, settings: UnityEditor.Rendering.TierSettings): void;
      static GetShaderSettingsForPlatform(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.ShaderHardwareTier): UnityEditor.Rendering.PlatformShaderSettings;
      static SetShaderSettingsForPlatform(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.ShaderHardwareTier, settings: UnityEditor.Rendering.PlatformShaderSettings): void;
      static GetTierSettings(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.ShaderHardwareTier): UnityEditor.Rendering.TierSettings;
      static SetTierSettings(target: UnityEditor.BuildTargetGroup, tier: UnityEngine.Rendering.ShaderHardwareTier, settings: UnityEditor.Rendering.TierSettings): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum ShaderQuality {
      Low = 0,
      Medium = 1,
      High = 2,
    }
    export class AlbedoSwatchInfo {
      name: string;
      color: UnityEngine.Color;
      minLuminance: number;
      maxLuminance: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class TierSettings {
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PlatformShaderSettings {
      cascadedShadowMaps: boolean;
      reflectionProbeBoxProjection: boolean;
      reflectionProbeBlending: boolean;
      standardShaderQuality: UnityEditor.Rendering.ShaderQuality;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class EditorCameraUtils {
      static RenderToCubemap(camera: UnityEngine.Camera, target: UnityEngine.Texture, faceMask: number, culledFlags: UnityEditor.StaticEditorFlags): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ShaderSnippetData {
      shaderType: UnityEditor.Rendering.ShaderType;
      passType: UnityEngine.Rendering.PassType;
      passName: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ShaderCompilerData {
      shaderRequirements: UnityEditor.Rendering.ShaderRequirements;
      graphicsTier: UnityEngine.Rendering.GraphicsTier;
      shaderCompilerPlatform: UnityEditor.Rendering.ShaderCompilerPlatform;
      shaderKeywordSet: UnityEngine.Rendering.ShaderKeywordSet;
      platformKeywordSet: UnityEngine.Rendering.PlatformKeywordSet;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
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
      GameCore = 21,
      PS5 = 23,
      PS5NGGC = 24,
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
      FragClipDepth = 256,
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
      SetRTArrayIndexFromAnyShader = 2097152,
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
    export class RenderPipelineEditorUtility {
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace SceneManagement {
    export class EditorSceneManager {
      constructor();
      static loadedSceneCount: number;
      static loadedRootSceneCount: number;
      static previewSceneCount: number;
      static preventCrossSceneReferences: boolean;
      static playModeStartScene: UnityEditor.SceneAsset;
      static DefaultSceneCullingMask: System.UInt64;
      static IsReloading(scene: UnityEngine.SceneManagement.Scene): boolean;
      static OpenScene(scenePath: string, mode: UnityEditor.SceneManagement.OpenSceneMode): UnityEngine.SceneManagement.Scene;
      static NewScene(setup: UnityEditor.SceneManagement.NewSceneSetup, mode: UnityEditor.SceneManagement.NewSceneMode): UnityEngine.SceneManagement.Scene;
      static NewPreviewScene(): UnityEngine.SceneManagement.Scene;
      static CloseScene(scene: UnityEngine.SceneManagement.Scene, removeScene: boolean): boolean;
      static ClosePreviewScene(scene: UnityEngine.SceneManagement.Scene): boolean;
      static IsPreviewScene(scene: UnityEngine.SceneManagement.Scene): boolean;
      static IsPreviewSceneObject(obj: UnityEngine.Object): boolean;
      static MoveSceneBefore(src: UnityEngine.SceneManagement.Scene, dst: UnityEngine.SceneManagement.Scene): void;
      static MoveSceneAfter(src: UnityEngine.SceneManagement.Scene, dst: UnityEngine.SceneManagement.Scene): void;
      static SaveOpenScenes(): boolean;
      static SaveScenes(scenes: UnityEngine.SceneManagement.Scene[]): boolean;
      static SaveModifiedScenesIfUserWantsTo(scenes: UnityEngine.SceneManagement.Scene[]): boolean;
      static EnsureUntitledSceneHasBeenSaved(dialogContent: string): boolean;
      static MarkSceneDirty(scene: UnityEngine.SceneManagement.Scene): boolean;
      static MarkAllScenesDirty(): void;
      static GetSceneManagerSetup(): UnityEditor.SceneManagement.SceneSetup[];
      static RestoreSceneManagerSetup(value: UnityEditor.SceneManagement.SceneSetup[]): void;
      static DetectCrossSceneReferences(scene: UnityEngine.SceneManagement.Scene): boolean;
      static GetSceneCullingMask(scene: UnityEngine.SceneManagement.Scene): System.UInt64;
      static SetSceneCullingMask(scene: UnityEngine.SceneManagement.Scene, sceneCullingMask: System.UInt64): void;
      static CalculateAvailableSceneCullingMask(): System.UInt64;
      static SaveCurrentModifiedScenesIfUserWantsTo(): boolean;
      static OpenScene(scenePath: string): UnityEngine.SceneManagement.Scene;
      static NewScene(setup: UnityEditor.SceneManagement.NewSceneSetup): UnityEngine.SceneManagement.Scene;
      static SaveScene(scene: UnityEngine.SceneManagement.Scene, dstScenePath: string): boolean;
      static SaveScene(scene: UnityEngine.SceneManagement.Scene): boolean;
      static SaveScene(scene: UnityEngine.SceneManagement.Scene, dstScenePath: string, saveAsCopy: boolean): boolean;
      static LoadSceneInPlayMode(path: string, parameters: UnityEngine.SceneManagement.LoadSceneParameters): UnityEngine.SceneManagement.Scene;
      static LoadSceneAsyncInPlayMode(path: string, parameters: UnityEngine.SceneManagement.LoadSceneParameters): UnityEngine.AsyncOperation;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_NewSceneCreatedCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene, setup: UnityEditor.SceneManagement.NewSceneSetup, mode: UnityEditor.SceneManagement.NewSceneMode): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, setup: UnityEditor.SceneManagement.NewSceneSetup, mode: UnityEditor.SceneManagement.NewSceneMode, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneOpeningCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(path: string, mode: UnityEditor.SceneManagement.OpenSceneMode): void;
      BeginInvoke(path: string, mode: UnityEditor.SceneManagement.OpenSceneMode, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneOpenedCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene, mode: UnityEditor.SceneManagement.OpenSceneMode): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, mode: UnityEditor.SceneManagement.OpenSceneMode, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneClosingCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene, removingScene: boolean): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, removingScene: boolean, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneClosedCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneSavingCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene, path: string): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, path: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneSavedCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorSceneManager_SceneDirtiedCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(scene: UnityEngine.SceneManagement.Scene): void;
      BeginInvoke(scene: UnityEngine.SceneManagement.Scene, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SceneCullingMasks {
      static DefaultSceneCullingMask: System.UInt64;
      static GameViewObjects: System.UInt64;
      static MainStageSceneViewObjects: System.UInt64;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class SceneHierarchyHooks {
      static provideSubScenes: (() => UnityEditor.SceneManagement.SceneHierarchyHooks_SubSceneInfo[]);
      static provideSubSceneName: ((arg0: UnityEditor.SceneManagement.SceneHierarchyHooks_SubSceneInfo) => string);
      static ReloadAllSceneHierarchies(): void;
      static CanSetNewParent(transform: UnityEngine.Transform, newParent: UnityEngine.Transform): boolean;
      static CanMoveTransformToScene(transform: UnityEngine.Transform, scene: UnityEngine.SceneManagement.Scene): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SceneHierarchyHooks_SubSceneInfo {
      isValid: boolean;
      transform: UnityEngine.Transform;
      scene: UnityEngine.SceneManagement.Scene;
      sceneAsset: UnityEditor.SceneAsset;
      sceneName: string;
      color: UnityEngine.Color32;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PrefabOverride {
      Apply(prefabAssetPath: string, mode: UnityEditor.InteractionMode): void;
      Revert(mode: UnityEditor.InteractionMode): void;
      Apply(): void;
      Apply(prefabAssetPath: string): void;
      Apply(mode: UnityEditor.InteractionMode): void;
      Revert(): void;
      GetAssetObject(): UnityEngine.Object;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ObjectOverride {
      constructor();
      instanceObject: UnityEngine.Object;
      coupledOverride: UnityEditor.SceneManagement.PrefabOverride;
      Apply(prefabAssetPath: string, mode: UnityEditor.InteractionMode): void;
      Revert(mode: UnityEditor.InteractionMode): void;
      GetAssetObject(): UnityEngine.Object;
      Apply(): void;
      Apply(prefabAssetPath: string): void;
      Apply(mode: UnityEditor.InteractionMode): void;
      Revert(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AddedComponent {
      constructor();
      instanceComponent: UnityEngine.Component;
      Apply(prefabAssetPath: string, mode: UnityEditor.InteractionMode): void;
      Revert(mode: UnityEditor.InteractionMode): void;
      GetAssetObject(): UnityEngine.Object;
      Apply(): void;
      Apply(prefabAssetPath: string): void;
      Apply(mode: UnityEditor.InteractionMode): void;
      Revert(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RemovedComponent {
      constructor();
      containingInstanceGameObject: UnityEngine.GameObject;
      assetComponent: UnityEngine.Component;
      Apply(prefabAssetPath: string, mode: UnityEditor.InteractionMode): void;
      Revert(mode: UnityEditor.InteractionMode): void;
      GetAssetObject(): UnityEngine.Object;
      Apply(): void;
      Apply(prefabAssetPath: string): void;
      Apply(mode: UnityEditor.InteractionMode): void;
      Revert(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AddedGameObject {
      constructor();
      instanceGameObject: UnityEngine.GameObject;
      siblingIndex: number;
      Apply(prefabAssetPath: string, mode: UnityEditor.InteractionMode): void;
      Revert(mode: UnityEditor.InteractionMode): void;
      GetAssetObject(): UnityEngine.Object;
      Apply(): void;
      Apply(prefabAssetPath: string): void;
      Apply(mode: UnityEditor.InteractionMode): void;
      Revert(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SceneSetup {
      constructor();
      path: string;
      isLoaded: boolean;
      isActive: boolean;
      isSubScene: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class MainStage {
      constructor();
      assetPath: string;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera(): System.UInt64;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PreviewSceneStage {
      scene: UnityEngine.SceneManagement.Scene;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      assetPath: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera(): System.UInt64;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Stage {
      assetPath: string;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera(): System.UInt64;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class StageHandle {
      Contains(gameObject: UnityEngine.GameObject): boolean;
      IsValid(): boolean;
      Equals(other: any): boolean;
      Equals(other: UnityEditor.SceneManagement.StageHandle): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class StageUtility {
      static IsGameObjectRenderedByCamera(gameObject: UnityEngine.GameObject, camera: UnityEngine.Camera): boolean;
      static IsGameObjectRenderedByCameraAndPartOfEditableScene(gameObject: UnityEngine.GameObject, camera: UnityEngine.Camera): boolean;
      static GetCurrentStage(): UnityEditor.SceneManagement.Stage;
      static GetMainStage(): UnityEditor.SceneManagement.MainStage;
      static GetStage(gameObject: UnityEngine.GameObject): UnityEditor.SceneManagement.Stage;
      static GetStage(scene: UnityEngine.SceneManagement.Scene): UnityEditor.SceneManagement.Stage;
      static GetCurrentStageHandle(): UnityEditor.SceneManagement.StageHandle;
      static GetMainStageHandle(): UnityEditor.SceneManagement.StageHandle;
      static GetStageHandle(gameObject: UnityEngine.GameObject): UnityEditor.SceneManagement.StageHandle;
      static GetStageHandle(scene: UnityEngine.SceneManagement.Scene): UnityEditor.SceneManagement.StageHandle;
      static GoToMainStage(): void;
      static GoBackToPreviousStage(): void;
      static GoToStage(stage: UnityEditor.SceneManagement.Stage, setAsFirstItemAfterMainStage: boolean): void;
      static PlaceGameObjectInCurrentStage(gameObject: UnityEngine.GameObject): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PrefabStage {
      prefabContentsRoot: UnityEngine.GameObject;
      openedFromInstanceRoot: UnityEngine.GameObject;
      openedFromInstanceObject: UnityEngine.GameObject;
      mode: UnityEditor.SceneManagement.PrefabStage_Mode;
      assetPath: string;
      prefabAssetPath: string;
      scene: UnityEngine.SceneManagement.Scene;
      stageHandle: UnityEditor.SceneManagement.StageHandle;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetCombinedSceneCullingMaskForCamera(): System.UInt64;
      IsPartOfPrefabContents(gameObject: UnityEngine.GameObject): boolean;
      ClearDirtiness(): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum PrefabStage_Mode {
      InIsolation = 0,
      InContext = 1,
    }
    export class PrefabStageUtility {
      static OpenPrefab(prefabAssetPath: string): UnityEditor.SceneManagement.PrefabStage;
      static OpenPrefab(prefabAssetPath: string, openedFromInstance: UnityEngine.GameObject): UnityEditor.SceneManagement.PrefabStage;
      static OpenPrefab(prefabAssetPath: string, openedFromInstance: UnityEngine.GameObject, prefabStageMode: UnityEditor.SceneManagement.PrefabStage_Mode): UnityEditor.SceneManagement.PrefabStage;
      static GetCurrentPrefabStage(): UnityEditor.SceneManagement.PrefabStage;
      static GetPrefabStage(gameObject: UnityEngine.GameObject): UnityEditor.SceneManagement.PrefabStage;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Scripting {
    export class ManagedDebugger {
      constructor();
      static isAttached: boolean;
      static isEnabled: boolean;
      static Disconnect(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace SearchService {
    export class ObjectSelector {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.IObjectSelectorEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.IObjectSelectorEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ObjectSelectorTargetInfo {
      constructor(globalObjectId: UnityEditor.GlobalObjectId, targetObject?: UnityEngine.Object, type?: System.Type);
      globalObjectId: UnityEditor.GlobalObjectId;
      targetObject: UnityEngine.Object;
      type: System.Type;
      LoadObject(): UnityEngine.Object;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ObjectSelectorSearchContext {
      constructor();
      selectorConstraint: ((arg0: UnityEditor.SearchService.ObjectSelectorTargetInfo, arg1: UnityEngine.Object[], arg2: UnityEditor.SearchService.ObjectSelectorSearchContext) => boolean);
      guid: System.Guid;
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      currentObject: UnityEngine.Object;
      editedObjects: UnityEngine.Object[];
      requiredTypes: System.Collections.Generic.IEnumerable<System.Type>;
      requiredTypeNames: System.Collections.Generic.IEnumerable<string>;
      visibleObjects: UnityEditor.SearchService.VisibleObjects;
      allowedInstanceIds: System.Collections.Generic.IEnumerable<number>;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum VisibleObjects {
      None = 0,
      Assets = 1,
      Scene = 2,
      All = 3,
    }
    export interface IObjectSelectorEngine {
    }
    export class ObjectSelectorSearch {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.IObjectSelectorEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.IObjectSelectorEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Project {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.IProjectSearchEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.IProjectSearchEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ProjectSearchContext {
      constructor();
      guid: System.Guid;
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: System.Collections.Generic.IEnumerable<System.Type>;
      requiredTypeNames: System.Collections.Generic.IEnumerable<string>;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IProjectSearchEngine {
    }
    export class ProjectSearch {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.IProjectSearchEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.IProjectSearchEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Scene {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.ISceneSearchEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.ISceneSearchEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SceneSearchContext {
      constructor();
      guid: System.Guid;
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: System.Collections.Generic.IEnumerable<System.Type>;
      requiredTypeNames: System.Collections.Generic.IEnumerable<string>;
      rootProperty: UnityEditor.HierarchyProperty;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ISceneSearchEngine {
    }
    export class SceneSearch {
      static EngineScope: UnityEditor.SearchService.SearchEngineScope;
      static RegisterEngine(engine: UnityEditor.SearchService.ISceneSearchEngine): void;
      static UnregisterEngine(engine: UnityEditor.SearchService.ISceneSearchEngine): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum SearchEngineScope {
      Scene = 0,
      Project = 1,
      ObjectSelector = 2,
    }
    export interface ISearchContext {
      guid: System.Guid;
      engineScope: UnityEditor.SearchService.SearchEngineScope;
      requiredTypes: System.Collections.Generic.IEnumerable<System.Type>;
      requiredTypeNames: System.Collections.Generic.IEnumerable<string>;
    }
    export interface ISearchEngineBase {
      name: string;
      BeginSession(context: UnityEditor.SearchService.ISearchContext): void;
      EndSession(context: UnityEditor.SearchService.ISearchContext): void;
      BeginSearch(context: UnityEditor.SearchService.ISearchContext, query: string): void;
      EndSearch(context: UnityEditor.SearchService.ISearchContext): void;
    }
    export interface ISearchEngine<T = any> {
      Search(context: UnityEditor.SearchService.ISearchContext, query: string, asyncItemsReceived: ((arg0: System.Collections.Generic.IEnumerable<T>) => void)): System.Collections.Generic.IEnumerable<T>;
    }
    export interface IFilterEngine<T = any> {
      Filter(context: UnityEditor.SearchService.ISearchContext, query: string, objectToFilter: T): boolean;
    }
    export interface ISelectorEngine {
      SelectObject(context: UnityEditor.SearchService.ISearchContext, onObjectSelectorClosed: ((arg0: UnityEngine.Object, arg1: boolean) => void), onObjectSelectedUpdated: ((arg0: UnityEngine.Object) => void)): boolean;
      SetSearchFilter(context: UnityEditor.SearchService.ISearchContext, searchFilter: string): void;
    }
  }
  export namespace ShortcutManagement {
    export class KeyCombination {
      constructor(keyCode: UnityEngine.KeyCode, shortcutModifiers?: UnityEditor.ShortcutManagement.ShortcutModifiers);
      keyCode: UnityEngine.KeyCode;
      modifiers: UnityEditor.ShortcutManagement.ShortcutModifiers;
      alt: boolean;
      action: boolean;
      shift: boolean;
      control: boolean;
      ToString(): string;
      Equals(other: UnityEditor.ShortcutManagement.KeyCombination): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class ShortcutBinding {
      constructor(keyCombination: UnityEditor.ShortcutManagement.KeyCombination);
      static empty: UnityEditor.ShortcutManagement.ShortcutBinding;
      keyCombinationSequence: System.Collections.Generic.IEnumerable<UnityEditor.ShortcutManagement.KeyCombination>;
      ToString(): string;
      Equals(other: UnityEditor.ShortcutManagement.ShortcutBinding): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export enum ShortcutStage {
      Begin = 0,
      End = 1,
    }
    export class ShortcutArguments {
      context: any; // System.Object
      stage: UnityEditor.ShortcutManagement.ShortcutStage;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum ShortcutModifiers {
      None = 0,
      Alt = 1,
      Action = 2,
      Shift = 4,
      Control = 8,
    }
    export interface IShortcutManager {
      activeProfileId: string;
      GetAvailableProfileIds(): System.Collections.Generic.IEnumerable<string>;
      IsProfileIdValid(profileId: string): boolean;
      IsProfileReadOnly(profileId: string): boolean;
      CreateProfile(profileId: string): void;
      DeleteProfile(profileId: string): void;
      RenameProfile(profileId: string, newProfileId: string): void;
      GetAvailableShortcutIds(): System.Collections.Generic.IEnumerable<string>;
      GetShortcutBinding(shortcutId: string): UnityEditor.ShortcutManagement.ShortcutBinding;
      RebindShortcut(shortcutId: string, binding: UnityEditor.ShortcutManagement.ShortcutBinding): void;
      ClearShortcutOverride(shortcutId: string): void;
      IsShortcutOverridden(shortcutId: string): boolean;
    }
    export class ActiveProfileChangedEventArgs {
      constructor(previousActiveProfileId: string, currentActiveProfileId: string);
      previousActiveProfileId: string;
      currentActiveProfileId: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ShortcutBindingChangedEventArgs {
      constructor(shortcutId: string, oldBinding: UnityEditor.ShortcutManagement.ShortcutBinding, newBinding: UnityEditor.ShortcutManagement.ShortcutBinding);
      shortcutId: string;
      oldBinding: UnityEditor.ShortcutManagement.ShortcutBinding;
      newBinding: UnityEditor.ShortcutManagement.ShortcutBinding;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class ShortcutManager {
      static instance: UnityEditor.ShortcutManagement.IShortcutManager;
      static defaultProfileId: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Sprites {
    export class AtlasSettings {
      format: UnityEngine.TextureFormat;
      colorSpace: UnityEngine.ColorSpace;
      compressionQuality: number;
      filterMode: UnityEngine.FilterMode;
      maxWidth: number;
      maxHeight: number;
      paddingPower: System.UInt32;
      anisoLevel: number;
      generateMipMaps: boolean;
      enableRotation: boolean;
      allowsAlphaSplitting: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class PackerJob {
      AddAtlas(atlasName: string, settings: UnityEditor.Sprites.AtlasSettings): void;
      AssignToAtlas(atlasName: string, sprite: UnityEngine.Sprite, packingMode: UnityEngine.SpritePackingMode, packingRotation: UnityEngine.SpritePackingRotation): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Packer {
      constructor();
      static atlasNames: string[];
      static Policies: string[];
      static SelectedPolicy: string;
      static kDefaultPolicy: string;
      static GetTexturesForAtlas(atlasName: string): UnityEngine.Texture2D[];
      static GetAlphaTexturesForAtlas(atlasName: string): UnityEngine.Texture2D[];
      static RebuildAtlasCacheIfNeeded(target: UnityEditor.BuildTarget, displayProgressBar: boolean, execution: UnityEditor.Sprites.Packer_Execution): void;
      static RebuildAtlasCacheIfNeeded(target: UnityEditor.BuildTarget, displayProgressBar: boolean): void;
      static RebuildAtlasCacheIfNeeded(target: UnityEditor.BuildTarget): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum Packer_Execution {
      Normal = 0,
      ForceRegroup = 1,
    }
    export class SpriteUtility {
      constructor();
      static GetSpriteTexture(sprite: UnityEngine.Sprite, getAtlasData: boolean): UnityEngine.Texture2D;
      static GetSpriteMesh(sprite: UnityEngine.Sprite, getAtlasData: boolean): UnityEngine.Vector2[];
      static GetSpriteUVs(sprite: UnityEngine.Sprite, getAtlasData: boolean): UnityEngine.Vector2[];
      static GetSpriteIndices(sprite: UnityEngine.Sprite, getAtlasData: boolean): System.UInt16[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DataUtility {
      constructor();
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IPackerPolicy {
      AllowSequentialPacking: boolean;
      OnGroupAtlases(target: UnityEditor.BuildTarget, job: UnityEditor.Sprites.PackerJob, textureImporterInstanceIDs: number[]): void;
      GetVersion(): number;
    }
  }
  export namespace TerrainTools {
    export class TerrainToolShortcutContext {
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TerrainInspectorUtility {
      static TerrainShaderValidationGUI(material: UnityEngine.Material): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum BrushGUIEditFlags {
      None = 0,
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
    export interface IOnPaint {
      brushTexture: UnityEngine.Texture;
      uv: UnityEngine.Vector2;
      brushStrength: number;
      brushSize: number;
      hitValidTerrain: boolean;
      raycastHit: any; // UnityEngine.RaycastHit
      RepaintAllInspectors(): void;
      Repaint(flags?: UnityEditor.TerrainTools.RepaintFlags): void;
    }
    export interface IOnSceneGUI {
      sceneView: UnityEditor.SceneView;
      brushTexture: UnityEngine.Texture;
      brushStrength: number;
      brushSize: number;
      hitValidTerrain: boolean;
      raycastHit: any; // UnityEngine.RaycastHit
      controlId: number;
      Repaint(flags?: UnityEditor.TerrainTools.RepaintFlags): void;
    }
    export interface IOnInspectorGUI {
      ShowBrushesGUI(spacing?: number, flags?: UnityEditor.TerrainTools.BrushGUIEditFlags, textureResolutionPerTile?: number): void;
      Repaint(flags?: UnityEditor.TerrainTools.RepaintFlags): void;
    }
    export class TerrainPaintTool<T = any> {
      name: string;
      hideFlags: UnityEngine.HideFlags;
      GetName(): string;
      GetDescription(): string;
      OnEnable(): void;
      OnDisable(): void;
      OnEnterToolMode(): void;
      OnExitToolMode(): void;
      OnSceneGUI(terrain: any, editContext: UnityEditor.TerrainTools.IOnSceneGUI): void;
      OnRenderBrushPreview(terrain: any, editContext: UnityEditor.TerrainTools.IOnSceneGUI): void;
      OnInspectorGUI(terrain: any, editContext: UnityEditor.TerrainTools.IOnInspectorGUI): void;
      OnPaint(terrain: any, editContext: UnityEditor.TerrainTools.IOnPaint): boolean;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum TerrainBrushPreviewMode {
      SourceRenderTexture = 0,
      DestinationRenderTexture = 1,
    }
    export class TerrainPaintUtilityEditor {
      static ShowDefaultPreviewBrush(terrain: any, brushTexture: UnityEngine.Texture, brushSize: number): void;
      static GetDefaultBrushPreviewMaterial(): UnityEngine.Material;
      static DrawBrushPreview(heightmapPC: any, previewTexture: UnityEditor.TerrainTools.TerrainBrushPreviewMode, brushTexture: UnityEngine.Texture, brushXform: any, proceduralMaterial: UnityEngine.Material, materialPassIndex: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Toolbars {
    export interface IAccessContainerWindow {
      containerWindow: UnityEditor.EditorWindow;
    }
    export class EditorToolbarUtility {
      static SetupChildrenAsButtonStrip(root: UnityEngine.UIElements.VisualElement): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace U2D {
    export class SpriteEditorExtension {
      static GetSpriteID(sprite: UnityEngine.Sprite): UnityEditor.GUID;
      static SetSpriteID(sprite: UnityEngine.Sprite, guid: UnityEditor.GUID): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SpriteAtlasUtility {
      constructor();
      static PackAllAtlases(target: UnityEditor.BuildTarget, canCancel?: boolean): void;
      static PackAtlases(atlases: UnityEngine.U2D.SpriteAtlas[], target: UnityEditor.BuildTarget, canCancel?: boolean): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SpriteAtlasTextureSettings {
      anisoLevel: number;
      filterMode: UnityEngine.FilterMode;
      generateMipMaps: boolean;
      readable: boolean;
      sRGB: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class SpriteAtlasPackingSettings {
      blockOffset: number;
      padding: number;
      enableRotation: boolean;
      enableTightPacking: boolean;
      enableAlphaDilation: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class SpriteAtlasExtensions {
      static Add(spriteAtlas: UnityEngine.U2D.SpriteAtlas, objects: UnityEngine.Object[]): void;
      static Remove(spriteAtlas: UnityEngine.U2D.SpriteAtlas, objects: UnityEngine.Object[]): void;
      static GetPackables(spriteAtlas: UnityEngine.U2D.SpriteAtlas): UnityEngine.Object[];
      static GetTextureSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas): UnityEditor.U2D.SpriteAtlasTextureSettings;
      static SetTextureSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas, src: UnityEditor.U2D.SpriteAtlasTextureSettings): void;
      static GetPackingSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas): UnityEditor.U2D.SpriteAtlasPackingSettings;
      static SetPackingSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas, src: UnityEditor.U2D.SpriteAtlasPackingSettings): void;
      static GetPlatformSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas, buildTarget: string): UnityEditor.TextureImporterPlatformSettings;
      static SetPlatformSettings(spriteAtlas: UnityEngine.U2D.SpriteAtlas, src: UnityEditor.TextureImporterPlatformSettings): void;
      static SetIncludeInBuild(spriteAtlas: UnityEngine.U2D.SpriteAtlas, value: boolean): void;
      static SetIsVariant(spriteAtlas: UnityEngine.U2D.SpriteAtlas, value: boolean): void;
      static SetMasterAtlas(spriteAtlas: UnityEngine.U2D.SpriteAtlas, value: UnityEngine.U2D.SpriteAtlas): void;
      static SetVariantScale(spriteAtlas: UnityEngine.U2D.SpriteAtlas, value: number): void;
      static IsIncludeInBuild(spriteAtlas: UnityEngine.U2D.SpriteAtlas): boolean;
      static GetMasterAtlas(spriteAtlas: UnityEngine.U2D.SpriteAtlas): UnityEngine.U2D.SpriteAtlas;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SpriteAtlasAsset {
      constructor();
      isVariant: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      SetIsVariant(value: boolean): void;
      SetMasterAtlas(atlas: UnityEngine.U2D.SpriteAtlas): void;
      SetIncludeInBuild(value: boolean): void;
      IsIncludeInBuild(): boolean;
      GetMasterAtlas(): UnityEngine.U2D.SpriteAtlas;
      SetVariantScale(value: number): void;
      SetPlatformSettings(src: UnityEditor.TextureImporterPlatformSettings): void;
      GetPlatformSettings(buildTarget: string): UnityEditor.TextureImporterPlatformSettings;
      GetTextureSettings(): UnityEditor.U2D.SpriteAtlasTextureSettings;
      SetTextureSettings(src: UnityEditor.U2D.SpriteAtlasTextureSettings): void;
      GetPackingSettings(): UnityEditor.U2D.SpriteAtlasPackingSettings;
      SetPackingSettings(src: UnityEditor.U2D.SpriteAtlasPackingSettings): void;
      Add(objects: UnityEngine.Object[]): void;
      Remove(objects: UnityEngine.Object[]): void;
      static Load(assetPath: string): UnityEditor.U2D.SpriteAtlasAsset;
      static Save(asset: UnityEditor.U2D.SpriteAtlasAsset, assetPath: string): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class SpriteAtlasImporter {
      constructor();
      assetPath: string;
      importSettingsMissing: boolean;
      assetTimeStamp: System.UInt64;
      userData: string;
      assetBundleName: string;
      assetBundleVariant: string;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      SetAssetBundleNameAndVariant(assetBundleName: string, assetBundleVariant: string): void;
      SaveAndReimport(): void;
      AddRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier, externalObject: UnityEngine.Object): void;
      RemoveRemap(identifier: UnityEditor.AssetImporter_SourceAssetIdentifier): boolean;
      GetExternalObjectMap(): System.Collections.Generic.Dictionary<UnityEditor.AssetImporter_SourceAssetIdentifier, UnityEngine.Object>;
      SupportsRemappedAssetType(type: System.Type): boolean;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace UIElements {
    export class UIElementsEntryPoint {
      static SetAntiAliasing(window: UnityEditor.EditorWindow, aa: number): void;
      static GetAntiAliasing(window: UnityEditor.EditorWindow): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace UnityLinker {
    export class UnityLinkerBuildPipelineData {
      constructor(target: UnityEditor.BuildTarget, inputDirectory: string);
      target: UnityEditor.BuildTarget;
      inputDirectory: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace VersionControl {
    export class Asset {
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
      Dispose(): void;
      IsChildOf(other: UnityEditor.VersionControl.Asset): boolean;
      IsState(state: UnityEditor.VersionControl.Asset_States): boolean;
      IsOneOfStates(states: UnityEditor.VersionControl.Asset_States[]): boolean;
      Edit(): void;
      Load(): UnityEngine.Object;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class ChangeSet {
      constructor();
      constructor(description: string);
      constructor(description: string, revision: string);
      constructor(other: UnityEditor.VersionControl.ChangeSet);
      description: string;
      id: string;
      static defaultID: string;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Message {
      severity: UnityEditor.VersionControl.Message_Severity;
      message: string;
      Dispose(): void;
      Show(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum Message_Severity {
      Data = 0,
      Verbose = 1,
      Info = 2,
      Warning = 3,
      Error = 4,
    }
    export class ConfigField {
      name: string;
      label: string;
      description: string;
      isRequired: boolean;
      isPassword: boolean;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Plugin {
      static availablePlugins: UnityEditor.VersionControl.Plugin[];
      name: string;
      configFields: UnityEditor.VersionControl.ConfigField[];
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Provider {
      constructor();
      static enabled: boolean;
      static isActive: boolean;
      static requiresNetwork: boolean;
      static hasChangelistSupport: boolean;
      static hasCheckoutSupport: boolean;
      static hasLockingSupport: boolean;
      static isVersioningFolders: boolean;
      static onlineState: UnityEditor.VersionControl.OnlineState;
      static offlineReason: string;
      static activeTask: UnityEditor.VersionControl.Task;
      static preSubmitCallback: UnityEditor.VersionControl.Provider_PreSubmitCallback;
      static preCheckoutCallback: UnityEditor.VersionControl.Provider_PreCheckoutCallback;
      static GetActivePlugin(): UnityEditor.VersionControl.Plugin;
      static GetActiveConfigFields(): UnityEditor.VersionControl.ConfigField[];
      static ChangeSets(): UnityEditor.VersionControl.Task;
      static Incoming(): UnityEditor.VersionControl.Task;
      static UpdateSettings(): UnityEditor.VersionControl.Task;
      static GetAssetByPath(unityPath: string): UnityEditor.VersionControl.Asset;
      static GetAssetByGUID(guid: string): UnityEditor.VersionControl.Asset;
      static IsOpenForEdit(asset: UnityEditor.VersionControl.Asset): boolean;
      static ClearCache(): void;
      static Internal_WarningTask(message: string): UnityEditor.VersionControl.Task;
      static Internal_ErrorTask(message: string): UnityEditor.VersionControl.Task;
      static Status(assets: UnityEditor.VersionControl.AssetList): UnityEditor.VersionControl.Task;
      static Status(asset: UnityEditor.VersionControl.Asset): UnityEditor.VersionControl.Task;
      static Status(assets: UnityEditor.VersionControl.AssetList, recursively: boolean): UnityEditor.VersionControl.Task;
      static Status(asset: UnityEditor.VersionControl.Asset, recursively: boolean): UnityEditor.VersionControl.Task;
      static Status(assets: string[]): UnityEditor.VersionControl.Task;
      static Status(assets: string[], recursively: boolean): UnityEditor.VersionControl.Task;
      static Status(asset: string): UnityEditor.VersionControl.Task;
      static Status(asset: string, recursively: boolean): UnityEditor.VersionControl.Task;
      static Move(from: string, to: string): UnityEditor.VersionControl.Task;
      static CheckoutIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static CheckoutIsValid(assets: UnityEditor.VersionControl.AssetList, mode: UnityEditor.VersionControl.CheckoutMode): boolean;
      static Checkout(assets: UnityEditor.VersionControl.AssetList, mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(assets: UnityEditor.VersionControl.AssetList, mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static Checkout(assets: string[], mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(assets: string[], mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static Checkout(assets: UnityEngine.Object[], mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(assets: UnityEngine.Object[], mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static CheckoutIsValid(asset: UnityEditor.VersionControl.Asset): boolean;
      static CheckoutIsValid(asset: UnityEditor.VersionControl.Asset, mode: UnityEditor.VersionControl.CheckoutMode): boolean;
      static Checkout(asset: UnityEditor.VersionControl.Asset, mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(asset: UnityEditor.VersionControl.Asset, mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static Checkout(asset: string, mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(asset: string, mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static Checkout(asset: UnityEngine.Object, mode: UnityEditor.VersionControl.CheckoutMode): UnityEditor.VersionControl.Task;
      static Checkout(asset: UnityEngine.Object, mode: UnityEditor.VersionControl.CheckoutMode, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static Delete(assetProjectPath: string): UnityEditor.VersionControl.Task;
      static Delete(assets: UnityEditor.VersionControl.AssetList): UnityEditor.VersionControl.Task;
      static Delete(asset: UnityEditor.VersionControl.Asset): UnityEditor.VersionControl.Task;
      static AddIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static Add(assets: UnityEditor.VersionControl.AssetList, recursive: boolean): UnityEditor.VersionControl.Task;
      static Add(asset: UnityEditor.VersionControl.Asset, recursive: boolean): UnityEditor.VersionControl.Task;
      static DeleteChangeSetsIsValid(changesets: UnityEditor.VersionControl.ChangeSets): boolean;
      static DeleteChangeSets(changesets: UnityEditor.VersionControl.ChangeSets): UnityEditor.VersionControl.Task;
      static SubmitIsValid(changeset: UnityEditor.VersionControl.ChangeSet, assets: UnityEditor.VersionControl.AssetList): boolean;
      static Submit(changeset: UnityEditor.VersionControl.ChangeSet, list: UnityEditor.VersionControl.AssetList, description: string, saveOnly: boolean): UnityEditor.VersionControl.Task;
      static DiffIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static DiffHead(assets: UnityEditor.VersionControl.AssetList, includingMetaFiles: boolean): UnityEditor.VersionControl.Task;
      static ResolveIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static Resolve(assets: UnityEditor.VersionControl.AssetList, resolveMethod: UnityEditor.VersionControl.ResolveMethod): UnityEditor.VersionControl.Task;
      static Merge(assets: UnityEditor.VersionControl.AssetList): UnityEditor.VersionControl.Task;
      static Merge(assets: UnityEditor.VersionControl.AssetList, method: UnityEditor.VersionControl.MergeMethod): UnityEditor.VersionControl.Task;
      static LockIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static LockIsValid(asset: UnityEditor.VersionControl.Asset): boolean;
      static UnlockIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static UnlockIsValid(asset: UnityEditor.VersionControl.Asset): boolean;
      static Lock(assets: UnityEditor.VersionControl.AssetList, locked: boolean): UnityEditor.VersionControl.Task;
      static Lock(asset: UnityEditor.VersionControl.Asset, locked: boolean): UnityEditor.VersionControl.Task;
      static RevertIsValid(assets: UnityEditor.VersionControl.AssetList, mode: UnityEditor.VersionControl.RevertMode): boolean;
      static Revert(assets: UnityEditor.VersionControl.AssetList, mode: UnityEditor.VersionControl.RevertMode): UnityEditor.VersionControl.Task;
      static RevertIsValid(asset: UnityEditor.VersionControl.Asset, mode: UnityEditor.VersionControl.RevertMode): boolean;
      static Revert(asset: UnityEditor.VersionControl.Asset, mode: UnityEditor.VersionControl.RevertMode): UnityEditor.VersionControl.Task;
      static GetLatestIsValid(assets: UnityEditor.VersionControl.AssetList): boolean;
      static GetLatestIsValid(asset: UnityEditor.VersionControl.Asset): boolean;
      static GetLatest(assets: UnityEditor.VersionControl.AssetList): UnityEditor.VersionControl.Task;
      static GetLatest(asset: UnityEditor.VersionControl.Asset): UnityEditor.VersionControl.Task;
      static ChangeSetDescription(changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static ChangeSetStatus(changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static ChangeSetStatus(changesetID: string): UnityEditor.VersionControl.Task;
      static IncomingChangeSetAssets(changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static IncomingChangeSetAssets(changesetID: string): UnityEditor.VersionControl.Task;
      static ChangeSetMove(assets: UnityEditor.VersionControl.AssetList, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static ChangeSetMove(asset: UnityEditor.VersionControl.Asset, changeset: UnityEditor.VersionControl.ChangeSet): UnityEditor.VersionControl.Task;
      static ChangeSetMove(assets: UnityEditor.VersionControl.AssetList, changesetID: string): UnityEditor.VersionControl.Task;
      static ChangeSetMove(asset: UnityEditor.VersionControl.Asset, changesetID: string): UnityEditor.VersionControl.Task;
      static GetAssetListFromSelection(): UnityEditor.VersionControl.AssetList;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Provider_PreSubmitCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Provider_PreCheckoutCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
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
    export class Task {
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
      Wait(): void;
      SetCompletionAction(action: UnityEditor.VersionControl.CompletionAction): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VersionControlManager {
      static versionControlDescriptors: UnityEditor.VersionControl.VersionControlDescriptor[];
      static activeVersionControlObject: UnityEditor.VersionControl.VersionControlObject;
      static SetVersionControl(name: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum IconOverlayType {
      Project = 0,
      Hierarchy = 1,
      Other = 2,
    }
    export interface IIconOverlayExtension {
      DrawOverlay(assetPath: string, type: UnityEditor.VersionControl.IconOverlayType, rect: UnityEngine.Rect): void;
    }
    export interface IInspectorWindowExtension {
      OnVersionControlBar(editor: UnityEditor.Editor): void;
      InvalidateVersionControlBarState(): void;
    }
    export interface IPopupMenuExtension {
      DisplayPopupMenu(position: UnityEngine.Rect): void;
    }
    export interface ISettingsInspectorExtension {
      OnInspectorGUI(): void;
    }
    export class AssetList {
      constructor();
      constructor(src: UnityEditor.VersionControl.AssetList);
      [key: string]: any;
      Capacity: number;
      Count: number;
      Filter(includeFolder: boolean, ...states: UnityEditor.VersionControl.Asset_States[]): UnityEditor.VersionControl.AssetList;
      FilterCount(includeFolder: boolean, ...states: UnityEditor.VersionControl.Asset_States[]): number;
      FilterChildren(): UnityEditor.VersionControl.AssetList;
      Add(item: UnityEditor.VersionControl.Asset): void;
      AddRange(collection: System.Collections.Generic.IEnumerable<UnityEditor.VersionControl.Asset>): void;
      AsReadOnly(): UnityEditor.VersionControl.Asset[];
      BinarySearch(index: number, count: number, item: UnityEditor.VersionControl.Asset, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.Asset>): number;
      BinarySearch(item: UnityEditor.VersionControl.Asset): number;
      BinarySearch(item: UnityEditor.VersionControl.Asset, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.Asset>): number;
      Clear(): void;
      Contains(item: UnityEditor.VersionControl.Asset): boolean;
      CopyTo(array: UnityEditor.VersionControl.Asset[]): void;
      CopyTo(index: number, array: UnityEditor.VersionControl.Asset[], arrayIndex: number, count: number): void;
      CopyTo(array: UnityEditor.VersionControl.Asset[], arrayIndex: number): void;
      Exists(match: System.Predicate<UnityEditor.VersionControl.Asset>): boolean;
      Find(match: System.Predicate<UnityEditor.VersionControl.Asset>): UnityEditor.VersionControl.Asset;
      FindAll(match: System.Predicate<UnityEditor.VersionControl.Asset>): UnityEditor.VersionControl.Asset[];
      FindIndex(match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      FindIndex(startIndex: number, match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      FindIndex(startIndex: number, count: number, match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      FindLast(match: System.Predicate<UnityEditor.VersionControl.Asset>): UnityEditor.VersionControl.Asset;
      FindLastIndex(match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      FindLastIndex(startIndex: number, match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      FindLastIndex(startIndex: number, count: number, match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      ForEach(action: ((arg0: UnityEditor.VersionControl.Asset) => void)): void;
      GetEnumerator(): System.Collections.Generic.List<UnityEditor.VersionControl.Asset>;
      GetRange(index: number, count: number): UnityEditor.VersionControl.Asset[];
      IndexOf(item: UnityEditor.VersionControl.Asset): number;
      IndexOf(item: UnityEditor.VersionControl.Asset, index: number): number;
      IndexOf(item: UnityEditor.VersionControl.Asset, index: number, count: number): number;
      Insert(index: number, item: UnityEditor.VersionControl.Asset): void;
      InsertRange(index: number, collection: System.Collections.Generic.IEnumerable<UnityEditor.VersionControl.Asset>): void;
      LastIndexOf(item: UnityEditor.VersionControl.Asset): number;
      LastIndexOf(item: UnityEditor.VersionControl.Asset, index: number): number;
      LastIndexOf(item: UnityEditor.VersionControl.Asset, index: number, count: number): number;
      Remove(item: UnityEditor.VersionControl.Asset): boolean;
      RemoveAll(match: System.Predicate<UnityEditor.VersionControl.Asset>): number;
      RemoveAt(index: number): void;
      RemoveRange(index: number, count: number): void;
      Reverse(): void;
      Reverse(index: number, count: number): void;
      Sort(): void;
      Sort(comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.Asset>): void;
      Sort(index: number, count: number, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.Asset>): void;
      Sort(comparison: System.Comparison<UnityEditor.VersionControl.Asset>): void;
      ToArray(): UnityEditor.VersionControl.Asset[];
      TrimExcess(): void;
      TrueForAll(match: System.Predicate<UnityEditor.VersionControl.Asset>): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ChangeSets {
      constructor();
      [key: string]: any;
      Capacity: number;
      Count: number;
      Add(item: UnityEditor.VersionControl.ChangeSet): void;
      AddRange(collection: System.Collections.Generic.IEnumerable<UnityEditor.VersionControl.ChangeSet>): void;
      AsReadOnly(): UnityEditor.VersionControl.ChangeSet[];
      BinarySearch(index: number, count: number, item: UnityEditor.VersionControl.ChangeSet, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.ChangeSet>): number;
      BinarySearch(item: UnityEditor.VersionControl.ChangeSet): number;
      BinarySearch(item: UnityEditor.VersionControl.ChangeSet, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.ChangeSet>): number;
      Clear(): void;
      Contains(item: UnityEditor.VersionControl.ChangeSet): boolean;
      CopyTo(array: UnityEditor.VersionControl.ChangeSet[]): void;
      CopyTo(index: number, array: UnityEditor.VersionControl.ChangeSet[], arrayIndex: number, count: number): void;
      CopyTo(array: UnityEditor.VersionControl.ChangeSet[], arrayIndex: number): void;
      Exists(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): boolean;
      Find(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): UnityEditor.VersionControl.ChangeSet;
      FindAll(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): UnityEditor.VersionControl.ChangeSet[];
      FindIndex(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      FindIndex(startIndex: number, match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      FindIndex(startIndex: number, count: number, match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      FindLast(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): UnityEditor.VersionControl.ChangeSet;
      FindLastIndex(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      FindLastIndex(startIndex: number, match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      FindLastIndex(startIndex: number, count: number, match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      ForEach(action: ((arg0: UnityEditor.VersionControl.ChangeSet) => void)): void;
      GetEnumerator(): System.Collections.Generic.List<UnityEditor.VersionControl.ChangeSet>;
      GetRange(index: number, count: number): UnityEditor.VersionControl.ChangeSet[];
      IndexOf(item: UnityEditor.VersionControl.ChangeSet): number;
      IndexOf(item: UnityEditor.VersionControl.ChangeSet, index: number): number;
      IndexOf(item: UnityEditor.VersionControl.ChangeSet, index: number, count: number): number;
      Insert(index: number, item: UnityEditor.VersionControl.ChangeSet): void;
      InsertRange(index: number, collection: System.Collections.Generic.IEnumerable<UnityEditor.VersionControl.ChangeSet>): void;
      LastIndexOf(item: UnityEditor.VersionControl.ChangeSet): number;
      LastIndexOf(item: UnityEditor.VersionControl.ChangeSet, index: number): number;
      LastIndexOf(item: UnityEditor.VersionControl.ChangeSet, index: number, count: number): number;
      Remove(item: UnityEditor.VersionControl.ChangeSet): boolean;
      RemoveAll(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): number;
      RemoveAt(index: number): void;
      RemoveRange(index: number, count: number): void;
      Reverse(): void;
      Reverse(index: number, count: number): void;
      Sort(): void;
      Sort(comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.ChangeSet>): void;
      Sort(index: number, count: number, comparer: System.Collections.Generic.IComparer<UnityEditor.VersionControl.ChangeSet>): void;
      Sort(comparison: System.Comparison<UnityEditor.VersionControl.ChangeSet>): void;
      ToArray(): UnityEditor.VersionControl.ChangeSet[];
      TrimExcess(): void;
      TrueForAll(match: System.Predicate<UnityEditor.VersionControl.ChangeSet>): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
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
    export class VersionControlUtils {
      static IsPathVersioned(path: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VersionControlDescriptor {
      name: string;
      displayName: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VersionControlObject {
      isConnected: boolean;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnActivate(): void;
      OnDeactivate(): void;
      Refresh(): void;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
  }
  export namespace VisualStudioIntegration {
    export class SolutionGuidGenerator {
      static GuidForProject(projectName: string): string;
      static GuidForSolution(projectName: string, sourceFileExtension: string): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace XR {
    export class BootOptions {
      constructor();
      static SetXRSDKPreInitLibrary(bootConfigPath: string, libraryName: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
}
