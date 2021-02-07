//
// Types in assembly: UnityEngine, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null
// Generated 02/06/2021 04:42:47
//
export module UnityEngine {
  //
  // Type: UnityEngine.SendMessageOptions
  //
  export interface SendMessageOptions {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.PrimitiveType
  //
  export interface PrimitiveType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Space
  //
  export interface Space {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RuntimePlatform
  //
  export interface RuntimePlatform {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SystemLanguage
  //
  export interface SystemLanguage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LogType
  //
  export interface LogType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LogOption
  //
  export interface LogOption {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ThreadPriority
  //
  export interface ThreadPriority {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SortingLayer
  //
  export interface SortingLayer {
    // static layers: SortingLayer[];
    id: number;
    name: string;
    value: number;
  }
  //
  // Type: UnityEngine.WeightedMode
  //
  export interface WeightedMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Keyframe
  //
  export interface Keyframe {
    time: number;
    value: number;
    inTangent: number;
    outTangent: number;
    inWeight: number;
    outWeight: number;
    weightedMode: WeightedMode;
    tangentMode: number;
  }
  //
  // Type: UnityEngine.WrapMode
  //
  export interface WrapMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimationCurve
  //
  export interface AnimationCurve {
    keys: Keyframe[];
    length: number;
    preWrapMode: WrapMode;
    postWrapMode: WrapMode;
    Evaluate: () => number;
    AddKey: () => number;
    MoveKey: () => number;
    RemoveKey: () => any;
    SmoothTangents: () => any;
  }
  //
  // Type: UnityEngine.Application
  //
  export interface Application {
    // static isLoadingLevel: boolean;
    // static streamedBytes: number;
    // static webSecurityEnabled: boolean;
    // static isPlaying: boolean;
    // static isFocused: boolean;
    // static buildGUID: string;
    // static runInBackground: boolean;
    // static isBatchMode: boolean;
    // static dataPath: string;
    // static streamingAssetsPath: string;
    // static persistentDataPath: string;
    // static temporaryCachePath: string;
    // static absoluteURL: string;
    // static unityVersion: string;
    // static version: string;
    // static installerName: string;
    // static identifier: string;
    // static installMode: ApplicationInstallMode;
    // static sandboxType: ApplicationSandboxType;
    // static productName: string;
    // static companyName: string;
    // static cloudProjectId: string;
    // static targetFrameRate: number;
    // static stackTraceLogType: StackTraceLogType;
    // static consoleLogPath: string;
    // static backgroundLoadingPriority: ThreadPriority;
    // static genuine: boolean;
    // static genuineCheckAvailable: boolean;
    // static isShowingSplashScreen: boolean;
    // static platform: RuntimePlatform;
    // static isMobilePlatform: boolean;
    // static isConsolePlatform: boolean;
    // static systemLanguage: SystemLanguage;
    // static internetReachability: NetworkReachability;
    // static isPlayer: boolean;
    // static levelCount: number;
    // static loadedLevel: number;
    // static loadedLevelName: string;
    // static isEditor: boolean;
  }
  //
  // Type: UnityEngine.Application+AdvertisingIdentifierCallback
  //
  export interface Application_AdvertisingIdentifierCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Application+LowMemoryCallback
  //
  export interface Application_LowMemoryCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Application+LogCallback
  //
  export interface Application_LogCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.StackTraceLogType
  //
  export interface StackTraceLogType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkReachability
  //
  export interface NetworkReachability {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UserAuthorization
  //
  export interface UserAuthorization {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ApplicationInstallMode
  //
  export interface ApplicationInstallMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ApplicationSandboxType
  //
  export interface ApplicationSandboxType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioType
  //
  export interface AudioType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CachedAssetBundle
  //
  export interface CachedAssetBundle {
    name: string;
    hash: Hash128;
  }
  //
  // Type: UnityEngine.Cache
  //
  export interface Cache {
    valid: boolean;
    ready: boolean;
    readOnly: boolean;
    path: string;
    index: number;
    spaceFree: any; // System.Int64
    maximumAvailableStorageSpace: any; // System.Int64
    spaceOccupied: any; // System.Int64
    expirationDelay: number;
    ClearCache: () => boolean;
  }
  //
  // Type: UnityEngine.CacheIndex
  //
  export interface CacheIndex {
    name: string;
    bytesUsed: number;
    expires: number;
  }
  //
  // Type: UnityEngine.Caching
  //
  export interface Caching {
    // static compressionEnabled: boolean;
    // static ready: boolean;
    // static spaceUsed: number;
    // static spaceOccupied: any; // System.Int64
    // static spaceAvailable: number;
    // static spaceFree: any; // System.Int64
    // static maximumAvailableDiskSpace: any; // System.Int64
    // static expirationDelay: number;
    // static cacheCount: number;
    // static defaultCache: Cache;
    // static currentCacheForWriting: Cache;
  }
  //
  // Type: UnityEngine.Camera
  //
  export interface Camera {
    // static main: Camera;
    // static current: Camera;
    // static allCamerasCount: number;
    // static allCameras: Camera[];
    // static mainCamera: Camera;
    nearClipPlane: number;
    farClipPlane: number;
    fieldOfView: number;
    renderingPath: RenderingPath;
    actualRenderingPath: RenderingPath;
    allowHDR: boolean;
    allowMSAA: boolean;
    allowDynamicResolution: boolean;
    forceIntoRenderTexture: boolean;
    orthographicSize: number;
    orthographic: boolean;
    opaqueSortMode: OpaqueSortMode;
    transparencySortMode: TransparencySortMode;
    transparencySortAxis: Vector3;
    depth: number;
    aspect: number;
    velocity: Vector3;
    cullingMask: number;
    eventMask: number;
    layerCullSpherical: boolean;
    cameraType: CameraType;
    overrideSceneCullingMask: any; // System.UInt64
    layerCullDistances: any; // System.Single[]
    useOcclusionCulling: boolean;
    cullingMatrix: Matrix4x4;
    backgroundColor: Color;
    clearFlags: CameraClearFlags;
    depthTextureMode: DepthTextureMode;
    clearStencilAfterLightingPass: boolean;
    usePhysicalProperties: boolean;
    sensorSize: Vector2;
    lensShift: Vector2;
    focalLength: number;
    gateFit: Camera_GateFitMode;
    rect: Rect;
    pixelRect: Rect;
    pixelWidth: number;
    pixelHeight: number;
    scaledPixelWidth: number;
    scaledPixelHeight: number;
    targetTexture: RenderTexture;
    activeTexture: RenderTexture;
    targetDisplay: number;
    cameraToWorldMatrix: Matrix4x4;
    worldToCameraMatrix: Matrix4x4;
    projectionMatrix: Matrix4x4;
    nonJitteredProjectionMatrix: Matrix4x4;
    useJitteredProjectionMatrixForTransparentRendering: boolean;
    previousViewProjectionMatrix: Matrix4x4;
    scene: Scene;
    stereoEnabled: boolean;
    stereoSeparation: number;
    stereoConvergence: number;
    areVRStereoViewMatricesWithinSingleCullTolerance: boolean;
    stereoTargetEye: StereoTargetEyeMask;
    stereoActiveEye: Camera_MonoOrStereoscopicEye;
    commandBufferCount: number;
    isOrthoGraphic: boolean;
    near: number;
    far: number;
    fov: number;
    hdr: boolean;
    stereoMirrorMode: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetStereoNonJitteredProjectionMatrix: () => Matrix4x4;
    GetStereoViewMatrix: () => Matrix4x4;
    CopyStereoDeviceProjectionMatrixToNonJittered: () => any;
    GetStereoProjectionMatrix: () => Matrix4x4;
    SetStereoProjectionMatrix: () => any;
    ResetStereoProjectionMatrices: () => any;
    SetStereoViewMatrix: () => any;
    ResetStereoViewMatrices: () => any;
    RenderToCubemap: () => boolean;
    Render: () => any;
    RenderWithShader: () => any;
    RenderDontRestore: () => any;
    SubmitRenderRequests: () => any;
    CopyFrom: () => any;
    RemoveCommandBuffers: () => any;
    RemoveAllCommandBuffers: () => any;
    AddCommandBuffer: () => any;
    AddCommandBufferAsync: () => any;
    RemoveCommandBuffer: () => any;
    GetCommandBuffers: () => CommandBuffer[];
    TryGetCullingParameters: () => boolean;
    GetScreenWidth: () => number;
    GetScreenHeight: () => number;
    DoClear: () => any;
    ResetFieldOfView: () => any;
    SetStereoViewMatrices: () => any;
    SetStereoProjectionMatrices: () => any;
    GetStereoViewMatrices: () => Matrix4x4[];
    GetStereoProjectionMatrices: () => Matrix4x4[];
    ResetReplacementShader: () => any;
    GetGateFittedFieldOfView: () => number;
    GetGateFittedLensShift: () => Vector2;
    SetTargetBuffers: () => any;
    ResetWorldToCameraMatrix: () => any;
    ResetProjectionMatrix: () => any;
    CalculateObliqueMatrix: () => Matrix4x4;
    WorldToScreenPoint: () => Vector3;
    WorldToViewportPoint: () => Vector3;
    ViewportToWorldPoint: () => Vector3;
    ScreenToWorldPoint: () => Vector3;
    ScreenToViewportPoint: () => Vector3;
    ViewportToScreenPoint: () => Vector3;
    ViewportPointToRay: () => Ray;
    ScreenPointToRay: () => Ray;
    CalculateFrustumCorners: () => any;
    Reset: () => any;
    ResetTransparencySortSettings: () => any;
    ResetAspect: () => any;
    ResetCullingMatrix: () => any;
    SetReplacementShader: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Camera+GateFitMode
  //
  export interface Camera_GateFitMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+FieldOfViewAxis
  //
  export interface Camera_FieldOfViewAxis {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+GateFitParameters
  //
  export interface Camera_GateFitParameters {
    mode: Camera_GateFitMode;
    aspect: number;
  }
  //
  // Type: UnityEngine.Camera+StereoscopicEye
  //
  export interface Camera_StereoscopicEye {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+MonoOrStereoscopicEye
  //
  export interface Camera_MonoOrStereoscopicEye {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+RenderRequestMode
  //
  export interface Camera_RenderRequestMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+RenderRequestOutputSpace
  //
  export interface Camera_RenderRequestOutputSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Camera+RenderRequest
  //
  export interface Camera_RenderRequest {
    isValid: boolean;
    mode: Camera_RenderRequestMode;
    result: RenderTexture;
    outputSpace: Camera_RenderRequestOutputSpace;
  }
  //
  // Type: UnityEngine.Camera+CameraCallback
  //
  export interface Camera_CameraCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.BoundingSphere
  //
  export interface BoundingSphere {
    position: Vector3;
    radius: number;
  }
  //
  // Type: UnityEngine.CullingGroupEvent
  //
  export interface CullingGroupEvent {
    index: number;
    isVisible: boolean;
    wasVisible: boolean;
    hasBecomeVisible: boolean;
    hasBecomeInvisible: boolean;
    currentDistance: number;
    previousDistance: number;
  }
  //
  // Type: UnityEngine.CullingGroup
  //
  export interface CullingGroup {
    onStateChanged: CullingGroup_StateChanged;
    enabled: boolean;
    targetCamera: Camera;
    Dispose: () => any;
    SetBoundingSpheres: () => any;
    SetBoundingSphereCount: () => any;
    EraseSwapBack: () => any;
    QueryIndices: () => number;
    IsVisible: () => boolean;
    GetDistance: () => number;
    SetBoundingDistances: () => any;
    SetDistanceReferencePoint: () => any;
  }
  //
  // Type: UnityEngine.CullingGroup+StateChanged
  //
  export interface CullingGroup_StateChanged {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.FlareLayer
  //
  export interface FlareLayer {
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ReflectionProbe
  //
  export interface ReflectionProbe {
    // static minBakedCubemapResolution: number;
    // static maxBakedCubemapResolution: number;
    // static defaultTextureHDRDecodeValues: Vector4;
    // static defaultTexture: Texture;
    type: ReflectionProbeType;
    size: Vector3;
    center: Vector3;
    nearClipPlane: number;
    farClipPlane: number;
    intensity: number;
    bounds: Bounds;
    hdr: boolean;
    renderDynamicObjects: boolean;
    shadowDistance: number;
    resolution: number;
    cullingMask: number;
    clearFlags: ReflectionProbeClearFlags;
    backgroundColor: Color;
    blendDistance: number;
    boxProjection: boolean;
    mode: ReflectionProbeMode;
    importance: number;
    refreshMode: ReflectionProbeRefreshMode;
    timeSlicingMode: ReflectionProbeTimeSlicingMode;
    bakedTexture: Texture;
    customBakedTexture: Texture;
    realtimeTexture: RenderTexture;
    texture: Texture;
    textureHDRDecodeValues: Vector4;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Reset: () => any;
    RenderProbe: () => number;
    IsFinishedRendering: () => boolean;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ReflectionProbe+ReflectionProbeEvent
  //
  export interface ReflectionProbe_ReflectionProbeEvent {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CrashReport
  //
  export interface CrashReport {
    // static reports: CrashReport[];
    // static lastReport: CrashReport;
    time: any; // System.DateTime
    text: string;
    Remove: () => any;
  }
  //
  // Type: UnityEngine.Debug
  //
  export interface Debug {
    // static unityLogger: ILogger;
    // static developerConsoleVisible: boolean;
    // static isDebugBuild: boolean;
    // static logger: ILogger;
  }
  //
  // Type: UnityEngine.ExposedPropertyResolver
  //
  export interface ExposedPropertyResolver {
  }
  //
  // Type: UnityEngine.IExposedPropertyTable
  //
  export interface IExposedPropertyTable {
    SetReferenceValue: () => any;
    GetReferenceValue: () => Object;
    ClearReferenceValue: () => any;
  }
  //
  // Type: UnityEngine.EventProvider
  //
  export interface EventProvider {
  }
  //
  // Type: UnityEngine.Bounds
  //
  export interface Bounds {
    center: Vector3;
    size: Vector3;
    extents: Vector3;
    min: Vector3;
    max: Vector3;
    SetMinMax: () => any;
    Encapsulate: () => any;
    Expand: () => any;
    Intersects: () => boolean;
    IntersectRay: () => boolean;
    Contains: () => boolean;
    SqrDistance: () => number;
    ClosestPoint: () => Vector3;
  }
  //
  // Type: UnityEngine.BoundsInt
  //
  export interface BoundsInt {
    x: number;
    y: number;
    z: number;
    center: Vector3;
    min: Vector3Int;
    max: Vector3Int;
    xMin: number;
    yMin: number;
    zMin: number;
    xMax: number;
    yMax: number;
    zMax: number;
    position: Vector3Int;
    size: Vector3Int;
    allPositionsWithin: BoundsInt_PositionEnumerator;
    SetMinMax: () => any;
    ClampToBounds: () => any;
    Contains: () => boolean;
  }
  //
  // Type: UnityEngine.BoundsInt+PositionEnumerator
  //
  export interface BoundsInt_PositionEnumerator {
    Current: Vector3Int;
    GetEnumerator: () => BoundsInt_PositionEnumerator;
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.GeometryUtility
  //
  export interface GeometryUtility {
  }
  //
  // Type: UnityEngine.Plane
  //
  export interface Plane {
    normal: Vector3;
    distance: number;
    flipped: Plane;
    SetNormalAndPosition: () => any;
    Set3Points: () => any;
    Flip: () => any;
    Translate: () => any;
    ClosestPointOnPlane: () => Vector3;
    GetDistanceToPoint: () => number;
    GetSide: () => boolean;
    SameSide: () => boolean;
    Raycast: () => boolean;
  }
  //
  // Type: UnityEngine.Ray
  //
  export interface Ray {
    origin: Vector3;
    direction: Vector3;
    GetPoint: () => Vector3;
  }
  //
  // Type: UnityEngine.Ray2D
  //
  export interface Ray2D {
    origin: Vector2;
    direction: Vector2;
    GetPoint: () => Vector2;
  }
  //
  // Type: UnityEngine.Rect
  //
  export interface Rect {
    // static zero: Rect;
    x: number;
    y: number;
    position: Vector2;
    center: Vector2;
    min: Vector2;
    max: Vector2;
    width: number;
    height: number;
    size: Vector2;
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    Set: () => any;
    Contains: () => boolean;
    Overlaps: () => boolean;
  }
  //
  // Type: UnityEngine.RectInt
  //
  export interface RectInt {
    x: number;
    y: number;
    center: Vector2;
    min: Vector2Int;
    max: Vector2Int;
    width: number;
    height: number;
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    position: Vector2Int;
    size: Vector2Int;
    allPositionsWithin: RectInt_PositionEnumerator;
    SetMinMax: () => any;
    ClampToBounds: () => any;
    Contains: () => boolean;
    Overlaps: () => boolean;
  }
  //
  // Type: UnityEngine.RectInt+PositionEnumerator
  //
  export interface RectInt_PositionEnumerator {
    Current: Vector2Int;
    GetEnumerator: () => RectInt_PositionEnumerator;
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.RectOffset
  //
  export interface RectOffset {
    left: number;
    right: number;
    top: number;
    bottom: number;
    horizontal: number;
    vertical: number;
    Add: () => Rect;
    Remove: () => Rect;
  }
  //
  // Type: UnityEngine.DynamicGI
  //
  export interface DynamicGI {
    // static indirectScale: number;
    // static updateThreshold: number;
    // static materialUpdateTimeSlice: number;
    // static synchronousMode: boolean;
    // static isConverged: boolean;
  }
  //
  // Type: UnityEngine.LightingSettings
  //
  export interface LightingSettings {
    bakedGI: boolean;
    realtimeGI: boolean;
    realtimeEnvironmentLighting: boolean;
    autoGenerate: boolean;
    mixedBakeMode: MixedLightingMode;
    albedoBoost: number;
    indirectScale: number;
    lightmapper: LightingSettings_Lightmapper;
    lightmapMaxSize: number;
    lightmapResolution: number;
    lightmapPadding: number;
    compressLightmaps: boolean;
    ao: boolean;
    aoMaxDistance: number;
    aoExponentIndirect: number;
    aoExponentDirect: number;
    extractAO: boolean;
    directionalityMode: LightmapsMode;
    exportTrainingData: boolean;
    trainingDataDestination: string;
    indirectResolution: number;
    finalGather: boolean;
    finalGatherRayCount: number;
    finalGatherFiltering: boolean;
    sampling: LightingSettings_Sampling;
    directSampleCount: number;
    indirectSampleCount: number;
    bounces: number;
    maxBounces: number;
    russianRouletteStartBounce: number;
    minBounces: number;
    prioritizeView: boolean;
    filteringMode: LightingSettings_FilterMode;
    denoiserTypeDirect: LightingSettings_DenoiserType;
    denoiserTypeIndirect: LightingSettings_DenoiserType;
    denoiserTypeAO: LightingSettings_DenoiserType;
    filterTypeDirect: LightingSettings_FilterType;
    filterTypeIndirect: LightingSettings_FilterType;
    filterTypeAO: LightingSettings_FilterType;
    filteringGaussRadiusDirect: number;
    filteringGaussRadiusIndirect: number;
    filteringGaussRadiusAO: number;
    filteringAtrousPositionSigmaDirect: number;
    filteringAtrousPositionSigmaIndirect: number;
    filteringAtrousPositionSigmaAO: number;
    environmentSampleCount: number;
    lightProbeSampleCountMultiplier: number;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightingSettings+Lightmapper
  //
  export interface LightingSettings_Lightmapper {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightingSettings+Sampling
  //
  export interface LightingSettings_Sampling {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightingSettings+FilterMode
  //
  export interface LightingSettings_FilterMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightingSettings+DenoiserType
  //
  export interface LightingSettings_DenoiserType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightingSettings+FilterType
  //
  export interface LightingSettings_FilterType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Gizmos
  //
  export interface Gizmos {
    // static color: Color;
    // static matrix: Matrix4x4;
    // static exposure: Texture;
    // static probeSize: number;
  }
  //
  // Type: UnityEngine.BillboardAsset
  //
  export interface BillboardAsset {
    width: number;
    height: number;
    bottom: number;
    imageCount: number;
    vertexCount: number;
    indexCount: number;
    material: Material;
    name: string;
    hideFlags: HideFlags;
    GetImageTexCoords: () => any;
    SetImageTexCoords: () => any;
    GetVertices: () => any;
    SetVertices: () => any;
    GetIndices: () => any;
    SetIndices: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.BillboardRenderer
  //
  export interface BillboardRenderer {
    billboard: BillboardAsset;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CustomRenderTextureManager
  //
  export interface CustomRenderTextureManager {
  }
  //
  // Type: UnityEngine.Display
  //
  export interface Display {
    // static main: Display;
    renderingWidth: number;
    renderingHeight: number;
    systemWidth: number;
    systemHeight: number;
    colorBuffer: RenderBuffer;
    depthBuffer: RenderBuffer;
    active: boolean;
    requiresBlitToBackbuffer: boolean;
    requiresSrgbBlitToBackbuffer: boolean;
    Activate: () => any;
    SetParams: () => any;
    SetRenderingResolution: () => any;
  }
  //
  // Type: UnityEngine.Display+DisplaysUpdatedDelegate
  //
  export interface Display_DisplaysUpdatedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.FullScreenMode
  //
  export interface FullScreenMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SleepTimeout
  //
  export interface SleepTimeout {
  }
  //
  // Type: UnityEngine.Screen
  //
  export interface Screen {
    // static width: number;
    // static height: number;
    // static dpi: number;
    // static currentResolution: Resolution;
    // static resolutions: Resolution[];
    // static fullScreen: boolean;
    // static fullScreenMode: FullScreenMode;
    // static safeArea: Rect;
    // static cutouts: Rect[];
    // static autorotateToPortrait: boolean;
    // static autorotateToPortraitUpsideDown: boolean;
    // static autorotateToLandscapeLeft: boolean;
    // static autorotateToLandscapeRight: boolean;
    // static orientation: ScreenOrientation;
    // static sleepTimeout: number;
    // static brightness: number;
    // static GetResolution: Resolution[];
    // static showCursor: boolean;
    // static lockCursor: boolean;
  }
  //
  // Type: UnityEngine.RenderBuffer
  //
  export interface RenderBuffer {
    GetNativeRenderBufferPtr: () => any;
  }
  //
  // Type: UnityEngine.ComputeBufferMode
  //
  export interface ComputeBufferMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Graphics
  //
  export interface Graphics {
    // static activeColorGamut: ColorGamut;
    // static activeTier: GraphicsTier;
    // static preserveFramebufferAlpha: boolean;
    // static minOpenGLESVersion: OpenGLESVersion;
    // static activeColorBuffer: RenderBuffer;
    // static activeDepthBuffer: RenderBuffer;
    // static deviceName: string;
    // static deviceVendor: string;
    // static deviceVersion: string;
  }
  //
  // Type: UnityEngine.GL
  //
  export interface GL {
    // static wireframe: boolean;
    // static sRGBWrite: boolean;
    // static invertCulling: boolean;
    // static modelview: Matrix4x4;
  }
  //
  // Type: UnityEngine.ScalableBufferManager
  //
  export interface ScalableBufferManager {
    // static widthScaleFactor: number;
    // static heightScaleFactor: number;
  }
  //
  // Type: UnityEngine.FrameTiming
  //
  export interface FrameTiming {
    cpuTimePresentCalled: any; // System.UInt64
    cpuFrameTime: number;
    cpuTimeFrameComplete: any; // System.UInt64
    gpuFrameTime: number;
    heightScale: number;
    widthScale: number;
    syncInterval: any; // System.UInt32
  }
  //
  // Type: UnityEngine.FrameTimingManager
  //
  export interface FrameTimingManager {
  }
  //
  // Type: UnityEngine.LightmapData
  //
  export interface LightmapData {
    lightmapLight: Texture2D;
    lightmapColor: Texture2D;
    lightmapDir: Texture2D;
    shadowMask: Texture2D;
    lightmap: Texture2D;
    lightmapFar: Texture2D;
    lightmapNear: Texture2D;
  }
  //
  // Type: UnityEngine.LightmapSettings
  //
  export interface LightmapSettings {
    // static lightmaps: LightmapData[];
    // static lightmapsMode: LightmapsMode;
    // static lightProbes: LightProbes;
    // static lightmapsModeLegacy: LightmapsModeLegacy;
    // static bakedColorSpace: ColorSpace;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightProbes
  //
  export interface LightProbes {
    positions: Vector3[];
    bakedProbes: SphericalHarmonicsL2[];
    count: number;
    cellCount: number;
    coefficients: any; // System.Single[]
    name: string;
    hideFlags: HideFlags;
    GetInterpolatedLightProbe: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.D3DHDRDisplayBitDepth
  //
  export interface D3DHDRDisplayBitDepth {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HDROutputSettings
  //
  export interface HDROutputSettings {
    // static main: HDROutputSettings;
    active: boolean;
    available: boolean;
    automaticHDRTonemapping: boolean;
    displayColorGamut: ColorGamut;
    format: RenderTextureFormat;
    graphicsFormat: GraphicsFormat;
    paperWhiteNits: number;
    maxFullFrameToneMapLuminance: number;
    maxToneMapLuminance: number;
    minToneMapLuminance: number;
    HDRModeChangeRequested: boolean;
    RequestHDRModeChange: () => any;
  }
  //
  // Type: UnityEngine.Resolution
  //
  export interface Resolution {
    width: number;
    height: number;
    refreshRate: number;
  }
  //
  // Type: UnityEngine.RenderTargetSetup
  //
  export interface RenderTargetSetup {
    color: RenderBuffer[];
    depth: RenderBuffer;
    mipLevel: number;
    cubemapFace: CubemapFace;
    depthSlice: number;
    colorLoad: RenderBufferLoadAction[];
    colorStore: RenderBufferStoreAction[];
    depthLoad: RenderBufferLoadAction;
    depthStore: RenderBufferStoreAction;
  }
  //
  // Type: UnityEngine.QualitySettings
  //
  export interface QualitySettings {
    // static currentLevel: QualityLevel;
    // static pixelLightCount: number;
    // static shadows: ShadowQuality;
    // static shadowProjection: ShadowProjection;
    // static shadowCascades: number;
    // static shadowDistance: number;
    // static shadowResolution: ShadowResolution;
    // static shadowmaskMode: ShadowmaskMode;
    // static shadowNearPlaneOffset: number;
    // static shadowCascade2Split: number;
    // static shadowCascade4Split: Vector3;
    // static lodBias: number;
    // static anisotropicFiltering: AnisotropicFiltering;
    // static masterTextureLimit: number;
    // static maximumLODLevel: number;
    // static particleRaycastBudget: number;
    // static softParticles: boolean;
    // static softVegetation: boolean;
    // static vSyncCount: number;
    // static antiAliasing: number;
    // static asyncUploadTimeSlice: number;
    // static asyncUploadBufferSize: number;
    // static asyncUploadPersistentBuffer: boolean;
    // static realtimeReflectionProbes: boolean;
    // static billboardsFaceCameraPosition: boolean;
    // static resolutionScalingFixedDPIFactor: number;
    // static renderPipeline: RenderPipelineAsset;
    // static blendWeights: BlendWeights;
    // static skinWeights: SkinWeights;
    // static streamingMipmapsActive: boolean;
    // static streamingMipmapsMemoryBudget: number;
    // static streamingMipmapsRenderersPerFrame: number;
    // static streamingMipmapsMaxLevelReduction: number;
    // static streamingMipmapsAddAllCameras: boolean;
    // static streamingMipmapsMaxFileIORequests: number;
    // static maxQueuedFrames: number;
    // static names: any; // System.String[]
    // static desiredColorSpace: ColorSpace;
    // static activeColorSpace: ColorSpace;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RendererExtensions
  //
  export interface RendererExtensions {
  }
  //
  // Type: UnityEngine.Mesh
  //
  export interface Mesh {
    uv1: Vector2[];
    indexFormat: IndexFormat;
    vertexBufferCount: number;
    blendShapeCount: number;
    bindposes: Matrix4x4[];
    isReadable: boolean;
    vertexCount: number;
    subMeshCount: number;
    bounds: Bounds;
    vertices: Vector3[];
    normals: Vector3[];
    tangents: Vector4[];
    uv: Vector2[];
    uv2: Vector2[];
    uv3: Vector2[];
    uv4: Vector2[];
    uv5: Vector2[];
    uv6: Vector2[];
    uv7: Vector2[];
    uv8: Vector2[];
    colors: Color[];
    colors32: Color32[];
    vertexAttributeCount: number;
    triangles: any; // System.Int32[]
    boneWeights: BoneWeight[];
    name: string;
    hideFlags: HideFlags;
    MarkDynamic: () => any;
    UploadMeshData: () => any;
    Optimize: () => any;
    OptimizeIndexBuffers: () => any;
    OptimizeReorderVertexBuffer: () => any;
    GetTopology: () => MeshTopology;
    CombineMeshes: () => any;
    SetVertexBufferData: () => any;
    GetTriangles: () => any;
    GetIndices: () => any;
    SetIndexBufferData: () => any;
    GetIndexStart: () => any;
    GetIndexCount: () => any;
    GetBaseVertex: () => any;
    SetTriangles: () => any;
    SetIndices: () => any;
    SetSubMeshes: () => any;
    GetBindposes: () => any;
    GetBoneWeights: () => any;
    Clear: () => any;
    RecalculateBounds: () => any;
    RecalculateNormals: () => any;
    RecalculateTangents: () => any;
    RecalculateUVDistributionMetric: () => any;
    RecalculateUVDistributionMetrics: () => any;
    SetVertices: () => any;
    GetNormals: () => any;
    SetNormals: () => any;
    GetTangents: () => any;
    SetTangents: () => any;
    GetColors: () => any;
    SetColors: () => any;
    SetUVs: () => any;
    GetUVs: () => any;
    GetVertexAttributes: () => VertexAttributeDescriptor[];
    SetVertexBufferParams: () => any;
    SetSubMesh: () => any;
    GetSubMesh: () => SubMeshDescriptor;
    MarkModified: () => any;
    GetUVDistributionMetric: () => number;
    GetVertices: () => any;
    SetIndexBufferParams: () => any;
    GetVertexAttribute: () => VertexAttributeDescriptor;
    HasVertexAttribute: () => boolean;
    GetVertexAttributeDimension: () => number;
    GetVertexAttributeFormat: () => VertexAttributeFormat;
    GetNativeVertexBufferPtr: () => any;
    GetNativeIndexBufferPtr: () => any;
    ClearBlendShapes: () => any;
    GetBlendShapeName: () => string;
    GetBlendShapeIndex: () => number;
    GetBlendShapeFrameCount: () => number;
    GetBlendShapeFrameWeight: () => number;
    GetBlendShapeFrameVertices: () => any;
    AddBlendShapeFrame: () => any;
    SetBoneWeights: () => any;
    GetAllBoneWeights: () => any;
    GetBonesPerVertex: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Mesh+MeshData
  //
  export interface Mesh_MeshData {
    vertexCount: number;
    vertexBufferCount: number;
    indexFormat: IndexFormat;
    subMeshCount: number;
    HasVertexAttribute: () => boolean;
    GetVertexAttributeDimension: () => number;
    GetVertexAttributeFormat: () => VertexAttributeFormat;
    GetVertices: () => any;
    GetNormals: () => any;
    GetTangents: () => any;
    GetColors: () => any;
    GetUVs: () => any;
    GetVertexData: () => any;
    SetVertexBufferParams: () => any;
    SetIndexBufferParams: () => any;
    GetIndices: () => any;
    GetIndexData: () => any;
    GetSubMesh: () => SubMeshDescriptor;
    SetSubMesh: () => any;
  }
  //
  // Type: UnityEngine.Mesh+MeshDataArray
  //
  export interface Mesh_MeshDataArray {
    Length: number;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Renderer
  //
  export interface Renderer {
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Projector
  //
  export interface Projector {
    isOrthoGraphic: boolean;
    orthoGraphicSize: number;
    nearClipPlane: number;
    farClipPlane: number;
    fieldOfView: number;
    aspectRatio: number;
    orthographic: boolean;
    orthographicSize: number;
    ignoreLayers: number;
    material: Material;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Shader
  //
  export interface Shader {
    // static globalShaderHardwareTier: ShaderHardwareTier;
    // static globalMaximumLOD: number;
    // static globalRenderPipeline: string;
    maximumLOD: number;
    isSupported: boolean;
    renderQueue: number;
    passCount: number;
    name: string;
    hideFlags: HideFlags;
    GetPropertyCount: () => number;
    FindPropertyIndex: () => number;
    GetPropertyName: () => string;
    GetPropertyNameId: () => number;
    GetPropertyType: () => ShaderPropertyType;
    GetPropertyDescription: () => string;
    GetPropertyFlags: () => ShaderPropertyFlags;
    GetPropertyAttributes: () => any;
    GetPropertyDefaultFloatValue: () => number;
    GetPropertyDefaultVectorValue: () => Vector4;
    GetPropertyRangeLimits: () => Vector2;
    GetPropertyTextureDimension: () => TextureDimension;
    GetPropertyTextureDefaultName: () => string;
    FindTextureStack: () => boolean;
    GetDependency: () => Shader;
    FindPassTagValue: () => ShaderTagId;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightmapsModeLegacy
  //
  export interface LightmapsModeLegacy {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TrailRenderer
  //
  export interface TrailRenderer {
    numPositions: number;
    time: number;
    startWidth: number;
    endWidth: number;
    widthMultiplier: number;
    autodestruct: boolean;
    emitting: boolean;
    numCornerVertices: number;
    numCapVertices: number;
    minVertexDistance: number;
    startColor: Color;
    endColor: Color;
    positionCount: number;
    shadowBias: number;
    generateLightingData: boolean;
    textureMode: LineTextureMode;
    alignment: LineAlignment;
    widthCurve: AnimationCurve;
    colorGradient: Gradient;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetPosition: () => any;
    GetPosition: () => Vector3;
    Clear: () => any;
    BakeMesh: () => any;
    GetPositions: () => number;
    SetPositions: () => any;
    AddPosition: () => any;
    AddPositions: () => any;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LineRenderer
  //
  export interface LineRenderer {
    numPositions: number;
    startWidth: number;
    endWidth: number;
    widthMultiplier: number;
    numCornerVertices: number;
    numCapVertices: number;
    useWorldSpace: boolean;
    loop: boolean;
    startColor: Color;
    endColor: Color;
    positionCount: number;
    shadowBias: number;
    generateLightingData: boolean;
    textureMode: LineTextureMode;
    alignment: LineAlignment;
    widthCurve: AnimationCurve;
    colorGradient: Gradient;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetWidth: () => any;
    SetColors: () => any;
    SetVertexCount: () => any;
    SetPosition: () => any;
    GetPosition: () => Vector3;
    Simplify: () => any;
    BakeMesh: () => any;
    GetPositions: () => number;
    SetPositions: () => any;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.MaterialPropertyBlock
  //
  export interface MaterialPropertyBlock {
    isEmpty: boolean;
    SetFloatArray: () => any;
    SetVectorArray: () => any;
    SetMatrixArray: () => any;
    GetFloat: () => number;
    GetInt: () => number;
    GetVector: () => Vector4;
    GetColor: () => Color;
    GetMatrix: () => Matrix4x4;
    GetTexture: () => Texture;
    GetFloatArray: () => any;
    GetVectorArray: () => Vector4[];
    GetMatrixArray: () => Matrix4x4[];
    CopySHCoefficientArraysFrom: () => any;
    CopyProbeOcclusionArrayFrom: () => any;
    AddFloat: () => any;
    AddVector: () => any;
    AddColor: () => any;
    AddMatrix: () => any;
    AddTexture: () => any;
    Clear: () => any;
    SetFloat: () => any;
    SetInt: () => any;
    SetVector: () => any;
    SetColor: () => any;
    SetMatrix: () => any;
    SetBuffer: () => any;
    SetTexture: () => any;
    SetConstantBuffer: () => any;
  }
  //
  // Type: UnityEngine.RenderSettings
  //
  export interface RenderSettings {
    // static ambientSkyboxAmount: number;
    // static fog: boolean;
    // static fogStartDistance: number;
    // static fogEndDistance: number;
    // static fogMode: FogMode;
    // static fogColor: Color;
    // static fogDensity: number;
    // static ambientMode: AmbientMode;
    // static ambientSkyColor: Color;
    // static ambientEquatorColor: Color;
    // static ambientGroundColor: Color;
    // static ambientIntensity: number;
    // static ambientLight: Color;
    // static subtractiveShadowColor: Color;
    // static skybox: Material;
    // static sun: Light;
    // static ambientProbe: SphericalHarmonicsL2;
    // static customReflection: Cubemap;
    // static reflectionIntensity: number;
    // static reflectionBounces: number;
    // static defaultReflectionMode: DefaultReflectionMode;
    // static defaultReflectionResolution: number;
    // static haloStrength: number;
    // static flareStrength: number;
    // static flareFadeSpeed: number;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Material
  //
  export interface Material {
    shader: Shader;
    color: Color;
    mainTexture: Texture;
    mainTextureOffset: Vector2;
    mainTextureScale: Vector2;
    renderQueue: number;
    globalIlluminationFlags: MaterialGlobalIlluminationFlags;
    doubleSidedGI: boolean;
    enableInstancing: boolean;
    passCount: number;
    shaderKeywords: any; // System.String[]
    name: string;
    hideFlags: HideFlags;
    GetFloatArray: () => any;
    GetColorArray: () => Color[];
    GetVectorArray: () => Vector4[];
    GetMatrixArray: () => Matrix4x4[];
    SetTextureOffset: () => any;
    SetTextureScale: () => any;
    GetTextureOffset: () => Vector2;
    GetTextureScale: () => Vector2;
    SetFloat: () => any;
    SetInt: () => any;
    SetColor: () => any;
    SetVector: () => any;
    SetMatrix: () => any;
    SetTexture: () => any;
    SetBuffer: () => any;
    SetConstantBuffer: () => any;
    SetFloatArray: () => any;
    SetColorArray: () => any;
    SetVectorArray: () => any;
    SetMatrixArray: () => any;
    GetFloat: () => number;
    GetInt: () => number;
    GetColor: () => Color;
    GetVector: () => Vector4;
    GetMatrix: () => Matrix4x4;
    GetTexture: () => Texture;
    HasProperty: () => boolean;
    EnableKeyword: () => any;
    DisableKeyword: () => any;
    IsKeywordEnabled: () => boolean;
    SetShaderPassEnabled: () => any;
    GetShaderPassEnabled: () => boolean;
    GetPassName: () => string;
    FindPass: () => number;
    SetOverrideTag: () => any;
    GetTag: () => string;
    Lerp: () => any;
    SetPass: () => boolean;
    CopyPropertiesFromMaterial: () => any;
    ComputeCRC: () => number;
    GetTexturePropertyNames: () => any;
    GetTexturePropertyNameIDs: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.GraphicsBuffer
  //
  export interface GraphicsBuffer {
    count: number;
    stride: number;
    Dispose: () => any;
    Release: () => any;
    IsValid: () => boolean;
    SetData: () => any;
    GetData: () => any;
    GetNativeBufferPtr: () => any;
    SetCounterValue: () => any;
  }
  //
  // Type: UnityEngine.GraphicsBuffer+Target
  //
  export interface GraphicsBuffer_Target {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.OcclusionPortal
  //
  export interface OcclusionPortal {
    open: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.OcclusionArea
  //
  export interface OcclusionArea {
    center: Vector3;
    size: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Flare
  //
  export interface Flare {
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LensFlare
  //
  export interface LensFlare {
    brightness: number;
    fadeSpeed: number;
    color: Color;
    flare: Flare;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightBakingOutput
  //
  export interface LightBakingOutput {
    probeOcclusionLightIndex: number;
    occlusionMaskChannel: number;
    lightmapBakeType: LightmapBakeType;
    mixedLightingMode: MixedLightingMode;
    isBaked: boolean;
  }
  //
  // Type: UnityEngine.LightShadowCasterMode
  //
  export interface LightShadowCasterMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Light
  //
  export interface Light {
    // static pixelLightCount: number;
    type: LightType;
    shape: LightShape;
    spotAngle: number;
    innerSpotAngle: number;
    color: Color;
    colorTemperature: number;
    useColorTemperature: boolean;
    intensity: number;
    bounceIntensity: number;
    useBoundingSphereOverride: boolean;
    boundingSphereOverride: Vector4;
    useViewFrustumForShadowCasterCull: boolean;
    shadowCustomResolution: number;
    shadowBias: number;
    shadowNormalBias: number;
    shadowNearPlane: number;
    useShadowMatrixOverride: boolean;
    shadowMatrixOverride: Matrix4x4;
    range: number;
    flare: Flare;
    bakingOutput: LightBakingOutput;
    cullingMask: number;
    renderingLayerMask: number;
    lightShadowCasterMode: LightShadowCasterMode;
    shadowRadius: number;
    shadowAngle: number;
    shadows: LightShadows;
    shadowStrength: number;
    shadowResolution: LightShadowResolution;
    shadowSoftness: number;
    shadowSoftnessFade: number;
    layerShadowCullDistances: any; // System.Single[]
    cookieSize: number;
    cookie: Texture;
    renderMode: LightRenderMode;
    bakedIndex: number;
    areaSize: Vector2;
    lightmapBakeType: LightmapBakeType;
    commandBufferCount: number;
    shadowConstantBias: number;
    shadowObjectSizeBias: number;
    attenuate: boolean;
    lightmappingMode: LightmappingMode;
    isBaked: boolean;
    alreadyLightmapped: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetLightDirty: () => any;
    AddCommandBuffer: () => any;
    AddCommandBufferAsync: () => any;
    RemoveCommandBuffer: () => any;
    RemoveCommandBuffers: () => any;
    RemoveAllCommandBuffers: () => any;
    GetCommandBuffers: () => CommandBuffer[];
    Reset: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Skybox
  //
  export interface Skybox {
    material: Material;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.MeshFilter
  //
  export interface MeshFilter {
    sharedMesh: Mesh;
    mesh: Mesh;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RenderingPath
  //
  export interface RenderingPath {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TransparencySortMode
  //
  export interface TransparencySortMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.StereoTargetEyeMask
  //
  export interface StereoTargetEyeMask {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CameraType
  //
  export interface CameraType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ComputeBufferType
  //
  export interface ComputeBufferType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightType
  //
  export interface LightType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightShape
  //
  export interface LightShape {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightRenderMode
  //
  export interface LightRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightShadows
  //
  export interface LightShadows {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FogMode
  //
  export interface FogMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightmapBakeType
  //
  export interface LightmapBakeType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MixedLightingMode
  //
  export interface MixedLightingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ReceiveGI
  //
  export interface ReceiveGI {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.QualityLevel
  //
  export interface QualityLevel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ShadowProjection
  //
  export interface ShadowProjection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ShadowQuality
  //
  export interface ShadowQuality {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ShadowResolution
  //
  export interface ShadowResolution {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ShadowmaskMode
  //
  export interface ShadowmaskMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CameraClearFlags
  //
  export interface CameraClearFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.DepthTextureMode
  //
  export interface DepthTextureMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TexGenMode
  //
  export interface TexGenMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnisotropicFiltering
  //
  export interface AnisotropicFiltering {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.BlendWeights
  //
  export interface BlendWeights {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SkinWeights
  //
  export interface SkinWeights {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MeshTopology
  //
  export interface MeshTopology {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SkinQuality
  //
  export interface SkinQuality {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ColorSpace
  //
  export interface ColorSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ColorGamut
  //
  export interface ColorGamut {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ScreenOrientation
  //
  export interface ScreenOrientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FilterMode
  //
  export interface FilterMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextureWrapMode
  //
  export interface TextureWrapMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NPOTSupport
  //
  export interface NPOTSupport {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextureFormat
  //
  export interface TextureFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CubemapFace
  //
  export interface CubemapFace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RenderTextureFormat
  //
  export interface RenderTextureFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.VRTextureUsage
  //
  export interface VRTextureUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RenderTextureCreationFlags
  //
  export interface RenderTextureCreationFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RenderTextureReadWrite
  //
  export interface RenderTextureReadWrite {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RenderTextureMemoryless
  //
  export interface RenderTextureMemoryless {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HDRDisplaySupportFlags
  //
  export interface HDRDisplaySupportFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightmapsMode
  //
  export interface LightmapsMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MaterialGlobalIlluminationFlags
  //
  export interface MaterialGlobalIlluminationFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume
  //
  export interface LightProbeProxyVolume {
    // static isFeatureSupported: boolean;
    boundsGlobal: Bounds;
    sizeCustom: Vector3;
    originCustom: Vector3;
    probeDensity: number;
    gridResolutionX: number;
    gridResolutionY: number;
    gridResolutionZ: number;
    boundingBoxMode: LightProbeProxyVolume_BoundingBoxMode;
    resolutionMode: LightProbeProxyVolume_ResolutionMode;
    probePositionMode: LightProbeProxyVolume_ProbePositionMode;
    refreshMode: LightProbeProxyVolume_RefreshMode;
    qualityMode: LightProbeProxyVolume_QualityMode;
    dataFormat: LightProbeProxyVolume_DataFormat;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Update: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+ResolutionMode
  //
  export interface LightProbeProxyVolume_ResolutionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+BoundingBoxMode
  //
  export interface LightProbeProxyVolume_BoundingBoxMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+ProbePositionMode
  //
  export interface LightProbeProxyVolume_ProbePositionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+RefreshMode
  //
  export interface LightProbeProxyVolume_RefreshMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+QualityMode
  //
  export interface LightProbeProxyVolume_QualityMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeProxyVolume+DataFormat
  //
  export interface LightProbeProxyVolume_DataFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CustomRenderTextureInitializationSource
  //
  export interface CustomRenderTextureInitializationSource {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CustomRenderTextureUpdateMode
  //
  export interface CustomRenderTextureUpdateMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CustomRenderTextureUpdateZoneSpace
  //
  export interface CustomRenderTextureUpdateZoneSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MotionVectorGenerationMode
  //
  export interface MotionVectorGenerationMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LineTextureMode
  //
  export interface LineTextureMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LineAlignment
  //
  export interface LineAlignment {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SkinnedMeshRenderer
  //
  export interface SkinnedMeshRenderer {
    quality: SkinQuality;
    updateWhenOffscreen: boolean;
    forceMatrixRecalculationPerRender: boolean;
    rootBone: Transform;
    bones: Transform[];
    sharedMesh: Mesh;
    skinnedMotionVectors: boolean;
    localBounds: Bounds;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetBlendShapeWeight: () => number;
    SetBlendShapeWeight: () => any;
    BakeMesh: () => any;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.MeshRenderer
  //
  export interface MeshRenderer {
    additionalVertexStreams: Mesh;
    enlightenVertexStream: Mesh;
    subMeshStartIndex: number;
    scaleInLightmap: number;
    receiveGI: ReceiveGI;
    stitchLightmapSeams: boolean;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LightmappingMode
  //
  export interface LightmappingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LightProbeGroup
  //
  export interface LightProbeGroup {
    probePositions: Vector3[];
    dering: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LineUtility
  //
  export interface LineUtility {
  }
  //
  // Type: UnityEngine.LODFadeMode
  //
  export interface LODFadeMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LOD
  //
  export interface LOD {
    screenRelativeTransitionHeight: number;
    fadeTransitionWidth: number;
    renderers: Renderer[];
  }
  //
  // Type: UnityEngine.LODGroup
  //
  export interface LODGroup {
    // static crossFadeAnimationDuration: number;
    localReferencePoint: Vector3;
    size: number;
    lodCount: number;
    fadeMode: LODFadeMode;
    animateCrossFading: boolean;
    enabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    RecalculateBounds: () => any;
    GetLODs: () => LOD[];
    SetLODS: () => any;
    SetLODs: () => any;
    ForceLOD: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.BoneWeight
  //
  export interface BoneWeight {
    weight0: number;
    weight1: number;
    weight2: number;
    weight3: number;
    boneIndex0: number;
    boneIndex1: number;
    boneIndex2: number;
    boneIndex3: number;
  }
  //
  // Type: UnityEngine.BoneWeight1
  //
  export interface BoneWeight1 {
    weight: number;
    boneIndex: number;
  }
  //
  // Type: UnityEngine.CombineInstance
  //
  export interface CombineInstance {
    mesh: Mesh;
    subMeshIndex: number;
    transform: Matrix4x4;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
  }
  //
  // Type: UnityEngine.Texture
  //
  export interface Texture {
    // static masterTextureLimit: number;
    // static anisotropicFiltering: AnisotropicFiltering;
    // static totalTextureMemory: any; // System.UInt64
    // static desiredTextureMemory: any; // System.UInt64
    // static targetTextureMemory: any; // System.UInt64
    // static currentTextureMemory: any; // System.UInt64
    // static nonStreamingTextureMemory: any; // System.UInt64
    // static streamingMipmapUploadCount: any; // System.UInt64
    // static streamingRendererCount: any; // System.UInt64
    // static streamingTextureCount: any; // System.UInt64
    // static nonStreamingTextureCount: any; // System.UInt64
    // static streamingTexturePendingLoadCount: any; // System.UInt64
    // static streamingTextureLoadingCount: any; // System.UInt64
    // static streamingTextureForceLoadAll: boolean;
    // static streamingTextureDiscardUnusedMips: boolean;
    // static allowThreadedTextureCreation: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Texture2D
  //
  export interface Texture2D {
    // static whiteTexture: Texture2D;
    // static blackTexture: Texture2D;
    // static redTexture: Texture2D;
    // static grayTexture: Texture2D;
    // static linearGrayTexture: Texture2D;
    // static normalTexture: Texture2D;
    format: TextureFormat;
    isReadable: boolean;
    vtOnly: boolean;
    streamingMipmaps: boolean;
    streamingMipmapsPriority: number;
    requestedMipmapLevel: number;
    minimumMipmapLevel: number;
    calculatedMipmapLevel: number;
    desiredMipmapLevel: number;
    loadingMipmapLevel: number;
    loadedMipmapLevel: number;
    alphaIsTransparency: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    SetPixel: () => any;
    SetPixels: () => any;
    GetPixel: () => Color;
    GetPixelBilinear: () => Color;
    LoadRawTextureData: () => any;
    SetPixelData: () => any;
    GetPixelData: () => any;
    GetRawTextureData: () => any;
    Apply: () => any;
    Resize: () => boolean;
    ReadPixels: () => any;
    SetPixels32: () => any;
    GetPixels: () => Color[];
    Compress: () => any;
    ClearRequestedMipmapLevel: () => any;
    IsRequestedMipmapLevelLoaded: () => boolean;
    ClearMinimumMipmapLevel: () => any;
    UpdateExternalTexture: () => any;
    GetPixels32: () => Color32[];
    PackTextures: () => Rect[];
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Texture2D+EXRFlags
  //
  export interface Texture2D_EXRFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Cubemap
  //
  export interface Cubemap {
    format: TextureFormat;
    isReadable: boolean;
    streamingMipmaps: boolean;
    streamingMipmapsPriority: number;
    requestedMipmapLevel: number;
    desiredMipmapLevel: number;
    loadingMipmapLevel: number;
    loadedMipmapLevel: number;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    UpdateExternalTexture: () => any;
    SmoothEdges: () => any;
    GetPixels: () => Color[];
    SetPixels: () => any;
    ClearRequestedMipmapLevel: () => any;
    IsRequestedMipmapLevelLoaded: () => boolean;
    SetPixelData: () => any;
    GetPixelData: () => any;
    SetPixel: () => any;
    GetPixel: () => Color;
    Apply: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Texture3D
  //
  export interface Texture3D {
    depth: number;
    format: TextureFormat;
    isReadable: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    UpdateExternalTexture: () => any;
    GetPixels: () => Color[];
    GetPixels32: () => Color32[];
    SetPixels: () => any;
    SetPixels32: () => any;
    Apply: () => any;
    SetPixel: () => any;
    GetPixel: () => Color;
    GetPixelBilinear: () => Color;
    SetPixelData: () => any;
    GetPixelData: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Texture2DArray
  //
  export interface Texture2DArray {
    // static allSlices: number;
    depth: number;
    format: TextureFormat;
    isReadable: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    GetPixels: () => Color[];
    GetPixels32: () => Color32[];
    SetPixels: () => any;
    SetPixels32: () => any;
    Apply: () => any;
    SetPixelData: () => any;
    GetPixelData: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CubemapArray
  //
  export interface CubemapArray {
    cubemapCount: number;
    format: TextureFormat;
    isReadable: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    GetPixels: () => Color[];
    GetPixels32: () => Color32[];
    SetPixels: () => any;
    SetPixels32: () => any;
    Apply: () => any;
    SetPixelData: () => any;
    GetPixelData: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SparseTexture
  //
  export interface SparseTexture {
    tileWidth: number;
    tileHeight: number;
    isCreated: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    UpdateTile: () => any;
    UpdateTileRaw: () => any;
    UnloadTile: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RenderTexture
  //
  export interface RenderTexture {
    // static active: RenderTexture;
    // static enabled: boolean;
    width: number;
    height: number;
    dimension: TextureDimension;
    graphicsFormat: GraphicsFormat;
    useMipMap: boolean;
    sRGB: boolean;
    vrUsage: VRTextureUsage;
    memorylessMode: RenderTextureMemoryless;
    format: RenderTextureFormat;
    stencilFormat: GraphicsFormat;
    autoGenerateMips: boolean;
    volumeDepth: number;
    antiAliasing: number;
    bindTextureMS: boolean;
    enableRandomWrite: boolean;
    useDynamicScale: boolean;
    isPowerOfTwo: boolean;
    colorBuffer: RenderBuffer;
    depthBuffer: RenderBuffer;
    depth: number;
    descriptor: RenderTextureDescriptor;
    generateMips: boolean;
    isCubemap: boolean;
    isVolume: boolean;
    mipmapCount: number;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    SetBorderColor: () => any;
    GetTexelOffset: () => Vector2;
    GetNativeDepthBufferPtr: () => any;
    DiscardContents: () => any;
    MarkRestoreExpected: () => any;
    ResolveAntiAliasedSurface: () => any;
    SetGlobalShaderProperty: () => any;
    Create: () => boolean;
    Release: () => any;
    IsCreated: () => boolean;
    GenerateMips: () => any;
    ConvertToEquirect: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CustomRenderTextureUpdateZone
  //
  export interface CustomRenderTextureUpdateZone {
    updateZoneCenter: Vector3;
    updateZoneSize: Vector3;
    rotation: number;
    passIndex: number;
    needSwap: boolean;
  }
  //
  // Type: UnityEngine.CustomRenderTexture
  //
  export interface CustomRenderTexture {
    material: Material;
    initializationMaterial: Material;
    initializationTexture: Texture;
    initializationSource: CustomRenderTextureInitializationSource;
    initializationColor: Color;
    updateMode: CustomRenderTextureUpdateMode;
    initializationMode: CustomRenderTextureUpdateMode;
    updateZoneSpace: CustomRenderTextureUpdateZoneSpace;
    shaderPass: number;
    cubemapFaceMask: any; // System.UInt32
    doubleBuffered: boolean;
    wrapUpdateZones: boolean;
    updatePeriod: number;
    width: number;
    height: number;
    dimension: TextureDimension;
    graphicsFormat: GraphicsFormat;
    useMipMap: boolean;
    sRGB: boolean;
    vrUsage: VRTextureUsage;
    memorylessMode: RenderTextureMemoryless;
    format: RenderTextureFormat;
    stencilFormat: GraphicsFormat;
    autoGenerateMips: boolean;
    volumeDepth: number;
    antiAliasing: number;
    bindTextureMS: boolean;
    enableRandomWrite: boolean;
    useDynamicScale: boolean;
    isPowerOfTwo: boolean;
    colorBuffer: RenderBuffer;
    depthBuffer: RenderBuffer;
    depth: number;
    descriptor: RenderTextureDescriptor;
    generateMips: boolean;
    isCubemap: boolean;
    isVolume: boolean;
    mipmapCount: number;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    Update: () => any;
    Initialize: () => any;
    ClearUpdateZones: () => any;
    GetUpdateZones: () => any;
    GetDoubleBufferRenderTexture: () => RenderTexture;
    EnsureDoubleBufferConsistency: () => any;
    SetUpdateZones: () => any;
    SetBorderColor: () => any;
    GetTexelOffset: () => Vector2;
    GetNativeDepthBufferPtr: () => any;
    DiscardContents: () => any;
    MarkRestoreExpected: () => any;
    ResolveAntiAliasedSurface: () => any;
    SetGlobalShaderProperty: () => any;
    Create: () => boolean;
    Release: () => any;
    IsCreated: () => boolean;
    GenerateMips: () => any;
    ConvertToEquirect: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RenderTextureDescriptor
  //
  export interface RenderTextureDescriptor {
    width: number;
    height: number;
    msaaSamples: number;
    volumeDepth: number;
    mipCount: number;
    graphicsFormat: GraphicsFormat;
    stencilFormat: GraphicsFormat;
    colorFormat: RenderTextureFormat;
    sRGB: boolean;
    depthBufferBits: number;
    dimension: TextureDimension;
    shadowSamplingMode: ShadowSamplingMode;
    vrUsage: VRTextureUsage;
    flags: RenderTextureCreationFlags;
    memoryless: RenderTextureMemoryless;
    useMipMap: boolean;
    autoGenerateMips: boolean;
    enableRandomWrite: boolean;
    bindMS: boolean;
    useDynamicScale: boolean;
  }
  //
  // Type: UnityEngine.FullScreenMovieControlMode
  //
  export interface FullScreenMovieControlMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FullScreenMovieScalingMode
  //
  export interface FullScreenMovieScalingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AndroidActivityIndicatorStyle
  //
  export interface AndroidActivityIndicatorStyle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Handheld
  //
  export interface Handheld {
    // static use32BitDisplayBuffer: boolean;
  }
  //
  // Type: UnityEngine.Hash128
  //
  export interface Hash128 {
    isValid: boolean;
    CompareTo: () => number;
    Append: () => any;
  }
  //
  // Type: UnityEngine.HashUtilities
  //
  export interface HashUtilities {
  }
  //
  // Type: UnityEngine.HashUnsafeUtilities
  //
  export interface HashUnsafeUtilities {
  }
  //
  // Type: UnityEngine.CursorMode
  //
  export interface CursorMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CursorLockMode
  //
  export interface CursorLockMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Cursor
  //
  export interface Cursor {
    // static visible: boolean;
    // static lockState: CursorLockMode;
  }
  //
  // Type: UnityEngine.KeyCode
  //
  export interface KeyCode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneScreenOrientation
  //
  export interface iPhoneScreenOrientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneNetworkReachability
  //
  export interface iPhoneNetworkReachability {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneGeneration
  //
  export interface iPhoneGeneration {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneSettings
  //
  export interface iPhoneSettings {
    // static screenOrientation: iPhoneScreenOrientation;
    // static uniqueIdentifier: string;
    // static name: string;
    // static model: string;
    // static systemName: string;
    // static internetReachability: iPhoneNetworkReachability;
    // static systemVersion: string;
    // static generation: iPhoneGeneration;
    // static verticalOrientation: boolean;
    // static screenCanDarken: boolean;
    // static locationServiceEnabledByUser: boolean;
  }
  //
  // Type: UnityEngine.iPhoneTouchPhase
  //
  export interface iPhoneTouchPhase {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneTouch
  //
  export interface iPhoneTouch {
    positionDelta: Vector2;
    timeDelta: number;
    fingerId: number;
    position: Vector2;
    deltaPosition: Vector2;
    deltaTime: number;
    tapCount: number;
    phase: iPhoneTouchPhase;
  }
  //
  // Type: UnityEngine.iPhoneMovieControlMode
  //
  export interface iPhoneMovieControlMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneMovieScalingMode
  //
  export interface iPhoneMovieScalingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneUtils
  //
  export interface iPhoneUtils {
    // static isApplicationGenuine: boolean;
    // static isApplicationGenuineAvailable: boolean;
  }
  //
  // Type: UnityEngine.iPhoneKeyboardType
  //
  export interface iPhoneKeyboardType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneKeyboard
  //
  export interface iPhoneKeyboard {
    // static hideInput: boolean;
    // static area: Rect;
    // static visible: boolean;
    text: string;
    active: boolean;
    done: boolean;
  }
  //
  // Type: UnityEngine.iPhoneAccelerationEvent
  //
  export interface iPhoneAccelerationEvent {
    timeDelta: number;
    acceleration: Vector3;
    deltaTime: number;
  }
  //
  // Type: UnityEngine.iPhoneOrientation
  //
  export interface iPhoneOrientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iPhoneInput
  //
  export interface iPhoneInput {
    // static orientation: iPhoneOrientation;
    // static accelerationEvents: iPhoneAccelerationEvent[];
    // static touches: iPhoneTouch[];
    // static touchCount: number;
    // static multiTouchEnabled: boolean;
    // static accelerationEventCount: number;
    // static acceleration: Vector3;
  }
  //
  // Type: UnityEngine.iPhone
  //
  export interface iPhone {
    // static generation: iPhoneGeneration;
    // static vendorIdentifier: string;
    // static advertisingIdentifier: string;
    // static advertisingTrackingEnabled: boolean;
  }
  //
  // Type: UnityEngine.iOSActivityIndicatorStyle
  //
  export interface iOSActivityIndicatorStyle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CalendarIdentifier
  //
  export interface CalendarIdentifier {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CalendarUnit
  //
  export interface CalendarUnit {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LocalNotification
  //
  export interface LocalNotification {
    // static defaultSoundName: string;
    fireDate: any; // System.DateTime
    timeZone: string;
    repeatInterval: CalendarUnit;
    repeatCalendar: CalendarIdentifier;
    alertBody: string;
    alertAction: string;
    hasAction: boolean;
    alertLaunchImage: string;
    applicationIconBadgeNumber: number;
    soundName: string;
    userInfo: any; // System.Collections.IDictionary
  }
  //
  // Type: UnityEngine.RemoteNotification
  //
  export interface RemoteNotification {
    alertBody: string;
    hasAction: boolean;
    applicationIconBadgeNumber: number;
    soundName: string;
    userInfo: any; // System.Collections.IDictionary
  }
  //
  // Type: UnityEngine.RemoteNotificationType
  //
  export interface RemoteNotificationType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NotificationServices
  //
  export interface NotificationServices {
  }
  //
  // Type: UnityEngine.ADBannerView
  //
  export interface ADBannerView {
    loaded: boolean;
    visible: boolean;
    layout: ADBannerView_Layout;
    position: Vector2;
    size: Vector2;
  }
  //
  // Type: UnityEngine.ADBannerView+Layout
  //
  export interface ADBannerView_Layout {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ADBannerView+Type
  //
  export interface ADBannerView_Type {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ADBannerView+BannerWasClickedDelegate
  //
  export interface ADBannerView_BannerWasClickedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.ADBannerView+BannerWasLoadedDelegate
  //
  export interface ADBannerView_BannerWasLoadedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.ADInterstitialAd
  //
  export interface ADInterstitialAd {
    // static isAvailable: boolean;
    loaded: boolean;
    Show: () => any;
    ReloadAd: () => any;
  }
  //
  // Type: UnityEngine.ADInterstitialAd+InterstitialWasLoadedDelegate
  //
  export interface ADInterstitialAd_InterstitialWasLoadedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.ILogger
  //
  export interface ILogger {
    logHandler: ILogHandler;
    logEnabled: boolean;
    filterLogType: LogType;
    IsLogTypeAllowed: () => boolean;
    Log: () => any;
    LogWarning: () => any;
    LogError: () => any;
    LogFormat: () => any;
    LogException: () => any;
  }
  //
  // Type: UnityEngine.ILogHandler
  //
  export interface ILogHandler {
    LogFormat: () => any;
    LogException: () => any;
  }
  //
  // Type: UnityEngine.Logger
  //
  export interface Logger {
    logHandler: ILogHandler;
    logEnabled: boolean;
    filterLogType: LogType;
    IsLogTypeAllowed: () => boolean;
    Log: () => any;
    LogWarning: () => any;
    LogError: () => any;
    LogFormat: () => any;
    LogException: () => any;
  }
  //
  // Type: UnityEngine.Color
  //
  export interface Color {
    // static red: Color;
    // static green: Color;
    // static blue: Color;
    // static white: Color;
    // static black: Color;
    // static yellow: Color;
    // static cyan: Color;
    // static magenta: Color;
    // static gray: Color;
    // static grey: Color;
    // static clear: Color;
    grayscale: number;
    linear: Color;
    gamma: Color;
    maxColorComponent: number;
    r: number;
    g: number;
    b: number;
    a: number;
  }
  //
  // Type: UnityEngine.Color32
  //
  export interface Color32 {
    r: any; // System.Byte
    g: any; // System.Byte
    b: any; // System.Byte
    a: any; // System.Byte
  }
  //
  // Type: UnityEngine.ColorUtility
  //
  export interface ColorUtility {
  }
  //
  // Type: UnityEngine.GradientColorKey
  //
  export interface GradientColorKey {
    color: Color;
    time: number;
  }
  //
  // Type: UnityEngine.GradientAlphaKey
  //
  export interface GradientAlphaKey {
    alpha: number;
    time: number;
  }
  //
  // Type: UnityEngine.GradientMode
  //
  export interface GradientMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Gradient
  //
  export interface Gradient {
    colorKeys: GradientColorKey[];
    alphaKeys: GradientAlphaKey[];
    mode: GradientMode;
    Evaluate: () => Color;
    SetKeys: () => any;
  }
  //
  // Type: UnityEngine.FrustumPlanes
  //
  export interface FrustumPlanes {
    left: number;
    right: number;
    bottom: number;
    top: number;
    zNear: number;
    zFar: number;
  }
  //
  // Type: UnityEngine.Matrix4x4
  //
  export interface Matrix4x4 {
    // static zero: Matrix4x4;
    // static identity: Matrix4x4;
    rotation: Quaternion;
    lossyScale: Vector3;
    isIdentity: boolean;
    determinant: number;
    decomposeProjection: FrustumPlanes;
    inverse: Matrix4x4;
    transpose: Matrix4x4;
    m00: number;
    m10: number;
    m20: number;
    m30: number;
    m01: number;
    m11: number;
    m21: number;
    m31: number;
    m02: number;
    m12: number;
    m22: number;
    m32: number;
    m03: number;
    m13: number;
    m23: number;
    m33: number;
    ValidTRS: () => boolean;
    SetTRS: () => any;
    GetColumn: () => Vector4;
    GetRow: () => Vector4;
    SetColumn: () => any;
    SetRow: () => any;
    MultiplyPoint: () => Vector3;
    MultiplyPoint3x4: () => Vector3;
    MultiplyVector: () => Vector3;
    TransformPlane: () => Plane;
  }
  //
  // Type: UnityEngine.Vector3
  //
  export interface Vector3 {
    // static zero: Vector3;
    // static one: Vector3;
    // static forward: Vector3;
    // static back: Vector3;
    // static up: Vector3;
    // static down: Vector3;
    // static left: Vector3;
    // static right: Vector3;
    // static positiveInfinity: Vector3;
    // static negativeInfinity: Vector3;
    // static fwd: Vector3;
    normalized: Vector3;
    magnitude: number;
    sqrMagnitude: number;
    x: number;
    y: number;
    z: number;
    Set: () => any;
    Scale: () => any;
    Normalize: () => any;
  }
  //
  // Type: UnityEngine.Quaternion
  //
  export interface Quaternion {
    // static identity: Quaternion;
    eulerAngles: Vector3;
    normalized: Quaternion;
    x: number;
    y: number;
    z: number;
    w: number;
    Set: () => any;
    SetLookRotation: () => any;
    ToAngleAxis: () => any;
    SetFromToRotation: () => any;
    Normalize: () => any;
    SetEulerRotation: () => any;
    ToEuler: () => Vector3;
    ToAxisAngle: () => any;
    SetEulerAngles: () => any;
    ToEulerAngles: () => Vector3;
    SetAxisAngle: () => any;
  }
  //
  // Type: UnityEngine.Mathf
  //
  export interface Mathf {
  }
  //
  // Type: UnityEngine.Vector2
  //
  export interface Vector2 {
    // static zero: Vector2;
    // static one: Vector2;
    // static up: Vector2;
    // static down: Vector2;
    // static left: Vector2;
    // static right: Vector2;
    // static positiveInfinity: Vector2;
    // static negativeInfinity: Vector2;
    normalized: Vector2;
    magnitude: number;
    sqrMagnitude: number;
    x: number;
    y: number;
    Set: () => any;
    Scale: () => any;
    Normalize: () => any;
    SqrMagnitude: () => number;
  }
  //
  // Type: UnityEngine.Vector2Int
  //
  export interface Vector2Int {
    // static zero: Vector2Int;
    // static one: Vector2Int;
    // static up: Vector2Int;
    // static down: Vector2Int;
    // static left: Vector2Int;
    // static right: Vector2Int;
    x: number;
    y: number;
    magnitude: number;
    sqrMagnitude: number;
    Set: () => any;
    Scale: () => any;
    Clamp: () => any;
  }
  //
  // Type: UnityEngine.Vector3Int
  //
  export interface Vector3Int {
    // static zero: Vector3Int;
    // static one: Vector3Int;
    // static up: Vector3Int;
    // static down: Vector3Int;
    // static left: Vector3Int;
    // static right: Vector3Int;
    // static forward: Vector3Int;
    // static back: Vector3Int;
    x: number;
    y: number;
    z: number;
    magnitude: number;
    sqrMagnitude: number;
    Set: () => any;
    Scale: () => any;
    Clamp: () => any;
  }
  //
  // Type: UnityEngine.Vector4
  //
  export interface Vector4 {
    // static zero: Vector4;
    // static one: Vector4;
    // static positiveInfinity: Vector4;
    // static negativeInfinity: Vector4;
    normalized: Vector4;
    magnitude: number;
    sqrMagnitude: number;
    x: number;
    y: number;
    z: number;
    w: number;
    Set: () => any;
    Scale: () => any;
    Normalize: () => any;
    SqrMagnitude: () => number;
  }
  //
  // Type: UnityEngine.RPCMode
  //
  export interface RPCMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ConnectionTesterStatus
  //
  export interface ConnectionTesterStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkConnectionError
  //
  export interface NetworkConnectionError {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkDisconnection
  //
  export interface NetworkDisconnection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MasterServerEvent
  //
  export interface MasterServerEvent {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkStateSynchronization
  //
  export interface NetworkStateSynchronization {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkPeerType
  //
  export interface NetworkPeerType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkLogLevel
  //
  export interface NetworkLogLevel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.NetworkPlayer
  //
  export interface NetworkPlayer {
    ipAddress: string;
    port: number;
    guid: string;
    externalIP: string;
    externalPort: number;
  }
  //
  // Type: UnityEngine.NetworkViewID
  //
  export interface NetworkViewID {
    // static unassigned: NetworkViewID;
    isMine: boolean;
    owner: NetworkPlayer;
  }
  //
  // Type: UnityEngine.NetworkView
  //
  export interface NetworkView {
    observed: Component;
    stateSynchronization: NetworkStateSynchronization;
    viewID: NetworkViewID;
    group: number;
    isMine: boolean;
    owner: NetworkPlayer;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    RPC: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Network
  //
  export interface Network {
    // static incomingPassword: string;
    // static logLevel: NetworkLogLevel;
    // static connections: NetworkPlayer[];
    // static player: NetworkPlayer;
    // static isClient: boolean;
    // static isServer: boolean;
    // static peerType: NetworkPeerType;
    // static sendRate: number;
    // static isMessageQueueRunning: boolean;
    // static time: number;
    // static minimumAllocatableViewIDs: number;
    // static useNat: boolean;
    // static natFacilitatorIP: string;
    // static natFacilitatorPort: number;
    // static connectionTesterIP: string;
    // static connectionTesterPort: number;
    // static maxConnections: number;
    // static proxyIP: string;
    // static proxyPort: number;
    // static useProxy: boolean;
    // static proxyPassword: string;
  }
  //
  // Type: UnityEngine.BitStream
  //
  export interface BitStream {
    isReading: boolean;
    isWriting: boolean;
    Serialize: () => any;
  }
  //
  // Type: UnityEngine.HostData
  //
  export interface HostData {
    useNat: boolean;
    gameType: string;
    gameName: string;
    connectedPlayers: number;
    playerLimit: number;
    ip: any; // System.String[]
    port: number;
    passwordProtected: boolean;
    comment: string;
    guid: string;
  }
  //
  // Type: UnityEngine.MasterServer
  //
  export interface MasterServer {
    // static ipAddress: string;
    // static port: number;
    // static updateRate: number;
    // static dedicatedServer: boolean;
  }
  //
  // Type: UnityEngine.NetworkMessageInfo
  //
  export interface NetworkMessageInfo {
    timestamp: number;
    sender: NetworkPlayer;
    networkView: NetworkView;
  }
  //
  // Type: UnityEngine.Ping
  //
  export interface Ping {
    isDone: boolean;
    time: number;
    ip: string;
    DestroyPing: () => any;
  }
  //
  // Type: UnityEngine.PlayerConnectionInternal+MulticastFlags
  //
  export interface PlayerConnectionInternal_MulticastFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.PlayerPrefsException
  //
  export interface PlayerPrefsException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.PlayerPrefs
  //
  export interface PlayerPrefs {
  }
  //
  // Type: UnityEngine.PropertyName
  //
  export interface PropertyName {
  }
  //
  // Type: UnityEngine.Random
  //
  export interface Random {
    // static state: Random_State;
    // static value: number;
    // static insideUnitSphere: Vector3;
    // static insideUnitCircle: Vector2;
    // static onUnitSphere: Vector3;
    // static rotation: Quaternion;
    // static rotationUniform: Quaternion;
    // static seed: number;
  }
  //
  // Type: UnityEngine.Random+State
  //
  export interface Random_State {
  }
  //
  // Type: UnityEngine.ResourceRequest
  //
  export interface ResourceRequest {
    asset: Object;
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.ResourcesAPI
  //
  export interface ResourcesAPI {
    // static overrideAPI: ResourcesAPI;
  }
  //
  // Type: UnityEngine.Resources
  //
  export interface Resources {
  }
  //
  // Type: UnityEngine.AsyncOperation
  //
  export interface AsyncOperation {
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.Behaviour
  //
  export interface Behaviour {
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Component
  //
  export interface Component {
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Coroutine
  //
  export interface Coroutine {
  }
  //
  // Type: UnityEngine.CustomYieldInstruction
  //
  export interface CustomYieldInstruction {
    keepWaiting: boolean;
    Current: any; // System.Object
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.GameObject
  //
  export interface GameObject {
    transform: Transform;
    layer: number;
    active: boolean;
    activeSelf: boolean;
    activeInHierarchy: boolean;
    isStatic: boolean;
    tag: string;
    scene: Scene;
    sceneCullingMask: any; // System.UInt64
    gameObject: GameObject;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    SampleAnimation: () => any;
    AddComponent: () => Component;
    PlayAnimation: () => any;
    StopAnimation: () => any;
    GetComponent: () => any;
    GetComponentInChildren: () => Component;
    GetComponentInParent: () => Component;
    GetComponents: () => Component[];
    GetComponentsInChildren: () => Component[];
    GetComponentsInParent: () => Component[];
    TryGetComponent: () => boolean;
    SendMessageUpwards: () => any;
    SetActive: () => any;
    SetActiveRecursively: () => any;
    CompareTag: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.LayerMask
  //
  export interface LayerMask {
    value: number;
  }
  //
  // Type: UnityEngine.MonoBehaviour
  //
  export interface MonoBehaviour {
    useGUILayout: boolean;
    runInEditMode: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    IsInvoking: () => boolean;
    CancelInvoke: () => any;
    Invoke: () => any;
    InvokeRepeating: () => any;
    StartCoroutine: () => Coroutine;
    StartCoroutine_Auto: () => Coroutine;
    StopCoroutine: () => any;
    StopAllCoroutines: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RangeInt
  //
  export interface RangeInt {
    end: number;
    start: number;
    length: number;
  }
  //
  // Type: UnityEngine.RuntimeInitializeLoadType
  //
  export interface RuntimeInitializeLoadType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ScriptableObject
  //
  export interface ScriptableObject {
    name: string;
    hideFlags: HideFlags;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.StackTraceUtility
  //
  export interface StackTraceUtility {
  }
  //
  // Type: UnityEngine.UnityException
  //
  export interface UnityException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.MissingComponentException
  //
  export interface MissingComponentException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.UnassignedReferenceException
  //
  export interface UnassignedReferenceException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.MissingReferenceException
  //
  export interface MissingReferenceException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.TextAsset
  //
  export interface TextAsset {
    bytes: any; // System.Byte[]
    text: string;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.TrackedReference
  //
  export interface TrackedReference {
  }
  //
  // Type: UnityEngine.HideFlags
  //
  export interface HideFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Object
  //
  export interface Object {
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.WaitForEndOfFrame
  //
  export interface WaitForEndOfFrame {
  }
  //
  // Type: UnityEngine.WaitForFixedUpdate
  //
  export interface WaitForFixedUpdate {
  }
  //
  // Type: UnityEngine.WaitForSeconds
  //
  export interface WaitForSeconds {
  }
  //
  // Type: UnityEngine.WaitForSecondsRealtime
  //
  export interface WaitForSecondsRealtime {
    waitTime: number;
    keepWaiting: boolean;
    Current: any; // System.Object
    Reset: () => any;
    MoveNext: () => boolean;
  }
  //
  // Type: UnityEngine.WaitUntil
  //
  export interface WaitUntil {
    keepWaiting: boolean;
    Current: any; // System.Object
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.WaitWhile
  //
  export interface WaitWhile {
    keepWaiting: boolean;
    Current: any; // System.Object
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.YieldInstruction
  //
  export interface YieldInstruction {
  }
  //
  // Type: UnityEngine.Security
  //
  export interface Security {
  }
  //
  // Type: UnityEngine.Types
  //
  export interface Types {
  }
  //
  // Type: UnityEngine.ISerializationCallbackReceiver
  //
  export interface ISerializationCallbackReceiver {
    OnBeforeSerialize: () => any;
    OnAfterDeserialize: () => any;
  }
  //
  // Type: UnityEngine.ComputeBuffer
  //
  export interface ComputeBuffer {
    count: number;
    stride: number;
    name: string;
    Dispose: () => any;
    Release: () => any;
    IsValid: () => boolean;
    SetData: () => any;
    GetData: () => any;
    BeginWrite: () => any;
    EndWrite: () => any;
    SetCounterValue: () => any;
    GetNativeBufferPtr: () => any;
  }
  //
  // Type: UnityEngine.ShaderVariantCollection
  //
  export interface ShaderVariantCollection {
    shaderCount: number;
    variantCount: number;
    isWarmedUp: boolean;
    name: string;
    hideFlags: HideFlags;
    Clear: () => any;
    WarmUp: () => any;
    Add: () => boolean;
    Remove: () => boolean;
    Contains: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ShaderVariantCollection+ShaderVariant
  //
  export interface ShaderVariantCollection_ShaderVariant {
    shader: Shader;
    passType: PassType;
    keywords: any; // System.String[]
  }
  //
  // Type: UnityEngine.ComputeShader
  //
  export interface ComputeShader {
    shaderKeywords: any; // System.String[]
    name: string;
    hideFlags: HideFlags;
    FindKernel: () => number;
    HasKernel: () => boolean;
    SetFloat: () => any;
    SetInt: () => any;
    SetVector: () => any;
    SetMatrix: () => any;
    SetVectorArray: () => any;
    SetMatrixArray: () => any;
    SetTexture: () => any;
    SetTextureFromGlobal: () => any;
    SetBuffer: () => any;
    GetKernelThreadGroupSizes: () => any;
    Dispatch: () => any;
    EnableKeyword: () => any;
    DisableKeyword: () => any;
    IsKeywordEnabled: () => boolean;
    SetFloats: () => any;
    SetInts: () => any;
    SetBool: () => any;
    SetConstantBuffer: () => any;
    DispatchIndirect: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SnapAxis
  //
  export interface SnapAxis {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Snapping
  //
  export interface Snapping {
  }
  //
  // Type: UnityEngine.StaticBatchingUtility
  //
  export interface StaticBatchingUtility {
  }
  //
  // Type: UnityEngine.InternalStaticBatchingUtility+StaticBatcherGOSorter
  //
  export interface InternalStaticBatchingUtility_StaticBatcherGOSorter {
    GetMaterialId: () => any;
    GetLightmapIndex: () => number;
    GetRendererId: () => any;
  }
  //
  // Type: UnityEngine.MeshSubsetCombineUtility+MeshInstance
  //
  export interface MeshSubsetCombineUtility_MeshInstance {
    meshInstanceID: number;
    rendererInstanceID: number;
    additionalVertexStreamsMeshInstanceID: number;
    enlightenVertexStreamMeshInstanceID: number;
    transform: Matrix4x4;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
  }
  //
  // Type: UnityEngine.MeshSubsetCombineUtility+SubMeshInstance
  //
  export interface MeshSubsetCombineUtility_SubMeshInstance {
    meshInstanceID: number;
    vertexOffset: number;
    gameObjectInstanceID: number;
    subMeshIndex: number;
    transform: Matrix4x4;
  }
  //
  // Type: UnityEngine.MeshSubsetCombineUtility+MeshContainer
  //
  export interface MeshSubsetCombineUtility_MeshContainer {
    gameObject: GameObject;
    instance: MeshSubsetCombineUtility_MeshInstance;
    subMeshInstances: any; // System.Collections.Generic.List`1[UnityEngine.MeshSubsetCombineUtility+SubMeshInstance]
  }
  //
  // Type: UnityEngine.BatteryStatus
  //
  export interface BatteryStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.OperatingSystemFamily
  //
  export interface OperatingSystemFamily {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.DeviceType
  //
  export interface DeviceType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SystemInfo
  //
  export interface SystemInfo {
    // static batteryLevel: number;
    // static batteryStatus: BatteryStatus;
    // static operatingSystem: string;
    // static operatingSystemFamily: OperatingSystemFamily;
    // static processorType: string;
    // static processorFrequency: number;
    // static processorCount: number;
    // static systemMemorySize: number;
    // static deviceUniqueIdentifier: string;
    // static deviceName: string;
    // static deviceModel: string;
    // static supportsAccelerometer: boolean;
    // static supportsGyroscope: boolean;
    // static supportsLocationService: boolean;
    // static supportsVibration: boolean;
    // static supportsAudio: boolean;
    // static deviceType: DeviceType;
    // static graphicsMemorySize: number;
    // static graphicsDeviceName: string;
    // static graphicsDeviceVendor: string;
    // static graphicsDeviceID: number;
    // static graphicsDeviceVendorID: number;
    // static graphicsDeviceType: GraphicsDeviceType;
    // static graphicsUVStartsAtTop: boolean;
    // static graphicsDeviceVersion: string;
    // static graphicsShaderLevel: number;
    // static graphicsMultiThreaded: boolean;
    // static renderingThreadingMode: RenderingThreadingMode;
    // static hasHiddenSurfaceRemovalOnGPU: boolean;
    // static hasDynamicUniformArrayIndexingInFragmentShaders: boolean;
    // static supportsShadows: boolean;
    // static supportsRawShadowDepthSampling: boolean;
    // static supportsMotionVectors: boolean;
    // static supports3DTextures: boolean;
    // static supportsCompressed3DTextures: boolean;
    // static supports2DArrayTextures: boolean;
    // static supports3DRenderTextures: boolean;
    // static supportsCubemapArrayTextures: boolean;
    // static copyTextureSupport: CopyTextureSupport;
    // static supportsComputeShaders: boolean;
    // static supportsConservativeRaster: boolean;
    // static supportsMultiview: boolean;
    // static supportsGeometryShaders: boolean;
    // static supportsTessellationShaders: boolean;
    // static supportsRenderTargetArrayIndexFromVertexShader: boolean;
    // static supportsInstancing: boolean;
    // static supportsHardwareQuadTopology: boolean;
    // static supports32bitsIndexBuffer: boolean;
    // static supportsSparseTextures: boolean;
    // static supportedRenderTargetCount: number;
    // static supportsSeparatedRenderTargetsBlend: boolean;
    // static supportedRandomWriteTargetCount: number;
    // static supportsMultisampledTextures: number;
    // static supportsMultisampled2DArrayTextures: boolean;
    // static supportsMultisampleAutoResolve: boolean;
    // static supportsTextureWrapMirrorOnce: number;
    // static usesReversedZBuffer: boolean;
    // static npotSupport: NPOTSupport;
    // static maxTextureSize: number;
    // static maxCubemapSize: number;
    // static maxComputeBufferInputsVertex: number;
    // static maxComputeBufferInputsFragment: number;
    // static maxComputeBufferInputsGeometry: number;
    // static maxComputeBufferInputsDomain: number;
    // static maxComputeBufferInputsHull: number;
    // static maxComputeBufferInputsCompute: number;
    // static maxComputeWorkGroupSize: number;
    // static maxComputeWorkGroupSizeX: number;
    // static maxComputeWorkGroupSizeY: number;
    // static maxComputeWorkGroupSizeZ: number;
    // static supportsAsyncCompute: boolean;
    // static supportsGpuRecorder: boolean;
    // static supportsGraphicsFence: boolean;
    // static supportsAsyncGPUReadback: boolean;
    // static supportsRayTracing: boolean;
    // static supportsSetConstantBuffer: boolean;
    // static constantBufferOffsetAlignment: number;
    // static minConstantBufferOffsetAlignment: boolean;
    // static hasMipMaxLevel: boolean;
    // static supportsMipStreaming: boolean;
    // static usesLoadStoreActions: boolean;
    // static hdrDisplaySupportFlags: HDRDisplaySupportFlags;
    // static supportsRenderTextures: boolean;
    // static supportsRenderToCubemap: boolean;
    // static supportsImageEffects: boolean;
    // static supportsStencil: number;
    // static graphicsPixelFillrate: number;
    // static supportsVertexPrograms: boolean;
    // static supportsGPUFence: boolean;
  }
  //
  // Type: UnityEngine.Time
  //
  export interface Time {
    // static time: number;
    // static timeAsDouble: number;
    // static timeSinceLevelLoad: number;
    // static timeSinceLevelLoadAsDouble: number;
    // static deltaTime: number;
    // static fixedTime: number;
    // static fixedTimeAsDouble: number;
    // static unscaledTime: number;
    // static unscaledTimeAsDouble: number;
    // static fixedUnscaledTime: number;
    // static fixedUnscaledTimeAsDouble: number;
    // static unscaledDeltaTime: number;
    // static fixedUnscaledDeltaTime: number;
    // static fixedDeltaTime: number;
    // static maximumDeltaTime: number;
    // static smoothDeltaTime: number;
    // static maximumParticleDeltaTime: number;
    // static timeScale: number;
    // static frameCount: number;
    // static renderedFrameCount: number;
    // static realtimeSinceStartup: number;
    // static realtimeSinceStartupAsDouble: number;
    // static captureDeltaTime: number;
    // static captureFramerate: number;
    // static inFixedTimeStep: boolean;
  }
  //
  // Type: UnityEngine.TouchScreenKeyboard
  //
  export interface TouchScreenKeyboard {
    // static isSupported: boolean;
    // static isInPlaceEditingAllowed: boolean;
    // static hideInput: boolean;
    // static area: Rect;
    // static visible: boolean;
    text: string;
    active: boolean;
    done: boolean;
    wasCanceled: boolean;
    status: TouchScreenKeyboard_Status;
    characterLimit: number;
    canGetSelection: boolean;
    canSetSelection: boolean;
    selection: RangeInt;
    type: TouchScreenKeyboardType;
    targetDisplay: number;
  }
  //
  // Type: UnityEngine.TouchScreenKeyboard+Status
  //
  export interface TouchScreenKeyboard_Status {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TouchScreenKeyboardType
  //
  export interface TouchScreenKeyboardType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UnityEventQueueSystem
  //
  export interface UnityEventQueueSystem {
  }
  //
  // Type: UnityEngine.Pose
  //
  export interface Pose {
    // static identity: Pose;
    forward: Vector3;
    right: Vector3;
    up: Vector3;
    position: Vector3;
    rotation: Quaternion;
    GetTransformedBy: () => Pose;
  }
  //
  // Type: UnityEngine.DrivenTransformProperties
  //
  export interface DrivenTransformProperties {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.DrivenRectTransformTracker
  //
  export interface DrivenRectTransformTracker {
    Add: () => any;
    Clear: () => any;
  }
  //
  // Type: UnityEngine.RectTransform
  //
  export interface RectTransform {
    rect: Rect;
    anchorMin: Vector2;
    anchorMax: Vector2;
    anchoredPosition: Vector2;
    sizeDelta: Vector2;
    pivot: Vector2;
    anchoredPosition3D: Vector3;
    offsetMin: Vector2;
    offsetMax: Vector2;
    position: Vector3;
    localPosition: Vector3;
    eulerAngles: Vector3;
    localEulerAngles: Vector3;
    right: Vector3;
    up: Vector3;
    forward: Vector3;
    rotation: Quaternion;
    localRotation: Quaternion;
    localScale: Vector3;
    parent: Transform;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    root: Transform;
    childCount: number;
    lossyScale: Vector3;
    hasChanged: boolean;
    hierarchyCapacity: number;
    hierarchyCount: number;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ForceUpdateRectTransforms: () => any;
    GetLocalCorners: () => any;
    GetWorldCorners: () => any;
    SetInsetAndSizeFromParentEdge: () => any;
    SetSizeWithCurrentAnchors: () => any;
    IsChildOf: () => boolean;
    FindChild: () => Transform;
    GetEnumerator: () => any;
    RotateAround: () => any;
    RotateAroundLocal: () => any;
    GetChild: () => Transform;
    GetChildCount: () => number;
    SetParent: () => any;
    SetPositionAndRotation: () => any;
    Translate: () => any;
    Rotate: () => any;
    LookAt: () => any;
    TransformDirection: () => Vector3;
    InverseTransformDirection: () => Vector3;
    TransformVector: () => Vector3;
    InverseTransformVector: () => Vector3;
    TransformPoint: () => Vector3;
    InverseTransformPoint: () => Vector3;
    DetachChildren: () => any;
    SetAsFirstSibling: () => any;
    SetAsLastSibling: () => any;
    SetSiblingIndex: () => any;
    GetSiblingIndex: () => number;
    Find: () => Transform;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RectTransform+Edge
  //
  export interface RectTransform_Edge {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RectTransform+Axis
  //
  export interface RectTransform_Axis {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RectTransform+ReapplyDrivenProperties
  //
  export interface RectTransform_ReapplyDrivenProperties {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Transform
  //
  export interface Transform {
    position: Vector3;
    localPosition: Vector3;
    eulerAngles: Vector3;
    localEulerAngles: Vector3;
    right: Vector3;
    up: Vector3;
    forward: Vector3;
    rotation: Quaternion;
    localRotation: Quaternion;
    localScale: Vector3;
    parent: Transform;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    root: Transform;
    childCount: number;
    lossyScale: Vector3;
    hasChanged: boolean;
    hierarchyCapacity: number;
    hierarchyCount: number;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    IsChildOf: () => boolean;
    FindChild: () => Transform;
    GetEnumerator: () => any;
    RotateAround: () => any;
    RotateAroundLocal: () => any;
    GetChild: () => Transform;
    GetChildCount: () => number;
    SetParent: () => any;
    SetPositionAndRotation: () => any;
    Translate: () => any;
    Rotate: () => any;
    LookAt: () => any;
    TransformDirection: () => Vector3;
    InverseTransformDirection: () => Vector3;
    TransformVector: () => Vector3;
    InverseTransformVector: () => Vector3;
    TransformPoint: () => Vector3;
    InverseTransformPoint: () => Vector3;
    DetachChildren: () => any;
    SetAsFirstSibling: () => any;
    SetAsLastSibling: () => any;
    SetSiblingIndex: () => any;
    GetSiblingIndex: () => number;
    Find: () => Transform;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SpriteDrawMode
  //
  export interface SpriteDrawMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteTileMode
  //
  export interface SpriteTileMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteMaskInteraction
  //
  export interface SpriteMaskInteraction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteRenderer
  //
  export interface SpriteRenderer {
    sprite: Sprite;
    drawMode: SpriteDrawMode;
    size: Vector2;
    adaptiveModeThreshold: number;
    tileMode: SpriteTileMode;
    color: Color;
    maskInteraction: SpriteMaskInteraction;
    flipX: boolean;
    flipY: boolean;
    spriteSortPoint: SpriteSortPoint;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SpriteMeshType
  //
  export interface SpriteMeshType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteAlignment
  //
  export interface SpriteAlignment {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpritePackingMode
  //
  export interface SpritePackingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpritePackingRotation
  //
  export interface SpritePackingRotation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteSortPoint
  //
  export interface SpriteSortPoint {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SecondarySpriteTexture
  //
  export interface SecondarySpriteTexture {
    name: string;
    texture: Texture2D;
  }
  //
  // Type: UnityEngine.Sprite
  //
  export interface Sprite {
    bounds: Bounds;
    rect: Rect;
    border: Vector4;
    texture: Texture2D;
    pixelsPerUnit: number;
    spriteAtlasTextureScale: number;
    associatedAlphaSplitTexture: Texture2D;
    pivot: Vector2;
    packed: boolean;
    packingMode: SpritePackingMode;
    packingRotation: SpritePackingRotation;
    textureRect: Rect;
    textureRectOffset: Vector2;
    vertices: Vector2[];
    triangles: any; // System.UInt16[]
    uv: Vector2[];
    name: string;
    hideFlags: HideFlags;
    GetPhysicsShapeCount: () => number;
    GetPhysicsShapePointCount: () => number;
    GetPhysicsShape: () => number;
    OverridePhysicsShape: () => any;
    OverrideGeometry: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AndroidJavaRunnable
  //
  export interface AndroidJavaRunnable {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.AndroidJavaException
  //
  export interface AndroidJavaException {
    StackTrace: string;
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.AndroidJavaProxy
  //
  export interface AndroidJavaProxy {
    javaInterface: AndroidJavaClass;
    Invoke: () => AndroidJavaObject;
    equals: () => boolean;
    hashCode: () => number;
    toString: () => string;
  }
  //
  // Type: UnityEngine.AndroidJavaObject
  //
  export interface AndroidJavaObject {
    Dispose: () => any;
    Call: () => any;
    CallStatic: () => any;
    Get: () => any;
    Set: () => any;
    GetStatic: () => any;
    SetStatic: () => any;
    GetRawObject: () => any;
    GetRawClass: () => any;
  }
  //
  // Type: UnityEngine.AndroidJavaClass
  //
  export interface AndroidJavaClass {
    Dispose: () => any;
    Call: () => any;
    CallStatic: () => any;
    Get: () => any;
    Set: () => any;
    GetStatic: () => any;
    SetStatic: () => any;
    GetRawObject: () => any;
    GetRawClass: () => any;
  }
  //
  // Type: UnityEngine.jvalue
  //
  export interface jvalue {
    z: boolean;
    b: any; // System.SByte
    c: any; // System.Char
    s: any; // System.Int16
    i: number;
    j: any; // System.Int64
    f: number;
    d: number;
    l: any; // System.IntPtr
  }
  //
  // Type: UnityEngine.AndroidJNIHelper
  //
  export interface AndroidJNIHelper {
    // static debug: boolean;
  }
  //
  // Type: UnityEngine.AndroidJNI
  //
  export interface AndroidJNI {
  }
  //
  // Type: UnityEngine.AnimationInfo
  //
  export interface AnimationInfo {
    clip: AnimationClip;
    weight: number;
  }
  //
  // Type: UnityEngine.Animator
  //
  export interface Animator {
    isOptimizable: boolean;
    isHuman: boolean;
    hasRootMotion: boolean;
    humanScale: number;
    isInitialized: boolean;
    deltaPosition: Vector3;
    deltaRotation: Quaternion;
    velocity: Vector3;
    angularVelocity: Vector3;
    rootPosition: Vector3;
    rootRotation: Quaternion;
    applyRootMotion: boolean;
    linearVelocityBlending: boolean;
    animatePhysics: boolean;
    updateMode: AnimatorUpdateMode;
    hasTransformHierarchy: boolean;
    gravityWeight: number;
    bodyPosition: Vector3;
    bodyRotation: Quaternion;
    stabilizeFeet: boolean;
    layerCount: number;
    parameters: AnimatorControllerParameter[];
    parameterCount: number;
    feetPivotActive: number;
    pivotWeight: number;
    pivotPosition: Vector3;
    isMatchingTarget: boolean;
    speed: number;
    targetPosition: Vector3;
    targetRotation: Quaternion;
    cullingMode: AnimatorCullingMode;
    playbackTime: number;
    recorderStartTime: number;
    recorderStopTime: number;
    recorderMode: AnimatorRecorderMode;
    runtimeAnimatorController: RuntimeAnimatorController;
    hasBoundPlayables: boolean;
    avatar: Avatar;
    playableGraph: PlayableGraph;
    layersAffectMassCenter: boolean;
    leftFeetBottomHeight: number;
    rightFeetBottomHeight: number;
    logWarnings: boolean;
    fireEvents: boolean;
    keepAnimatorControllerStateOnDisable: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Update: () => any;
    Rebind: () => any;
    ApplyBuiltinRootMotion: () => any;
    GetVector: () => Vector3;
    SetVector: () => any;
    GetQuaternion: () => Quaternion;
    SetQuaternion: () => any;
    CrossFade: () => any;
    PlayInFixedTime: () => any;
    Play: () => any;
    SetTarget: () => any;
    IsControlled: () => boolean;
    GetBoneTransform: () => Transform;
    StartPlayback: () => any;
    StopPlayback: () => any;
    StartRecording: () => any;
    StopRecording: () => any;
    HasState: () => boolean;
    SetIKHintPositionWeight: () => any;
    SetLookAtPosition: () => any;
    SetLookAtWeight: () => any;
    SetBoneLocalRotation: () => any;
    GetBehaviour: () => any;
    GetBehaviours: () => any;
    GetLayerName: () => string;
    GetLayerIndex: () => number;
    GetLayerWeight: () => number;
    SetLayerWeight: () => any;
    GetCurrentAnimatorStateInfo: () => AnimatorStateInfo;
    GetNextAnimatorStateInfo: () => AnimatorStateInfo;
    GetAnimatorTransitionInfo: () => AnimatorTransitionInfo;
    GetCurrentAnimatorClipInfoCount: () => number;
    GetNextAnimatorClipInfoCount: () => number;
    GetCurrentAnimatorClipInfo: () => AnimatorClipInfo[];
    GetNextAnimatorClipInfo: () => AnimatorClipInfo[];
    IsInTransition: () => boolean;
    GetParameter: () => AnimatorControllerParameter;
    MatchTarget: () => any;
    InterruptMatchTarget: () => any;
    ForceStateNormalizedTime: () => any;
    CrossFadeInFixedTime: () => any;
    WriteDefaultValues: () => any;
    GetCurrentAnimationClipState: () => AnimationInfo[];
    GetNextAnimationClipState: () => AnimationInfo[];
    Stop: () => any;
    GetFloat: () => number;
    SetFloat: () => any;
    GetBool: () => boolean;
    SetBool: () => any;
    GetInteger: () => number;
    SetInteger: () => any;
    SetTrigger: () => any;
    ResetTrigger: () => any;
    IsParameterControlledByCurve: () => boolean;
    GetIKPosition: () => Vector3;
    SetIKPosition: () => any;
    GetIKRotation: () => Quaternion;
    SetIKRotation: () => any;
    GetIKPositionWeight: () => number;
    SetIKPositionWeight: () => any;
    GetIKRotationWeight: () => number;
    SetIKRotationWeight: () => any;
    GetIKHintPosition: () => Vector3;
    SetIKHintPosition: () => any;
    GetIKHintPositionWeight: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.IAnimationClipSource
  //
  export interface IAnimationClipSource {
    GetAnimationClips: () => any;
  }
  //
  // Type: UnityEngine.StateMachineBehaviour
  //
  export interface StateMachineBehaviour {
    name: string;
    hideFlags: HideFlags;
    OnStateEnter: () => any;
    OnStateUpdate: () => any;
    OnStateExit: () => any;
    OnStateMove: () => any;
    OnStateIK: () => any;
    OnStateMachineEnter: () => any;
    OnStateMachineExit: () => any;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PlayMode
  //
  export interface PlayMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.QueueMode
  //
  export interface QueueMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimationBlendMode
  //
  export interface AnimationBlendMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimationPlayMode
  //
  export interface AnimationPlayMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimationCullingType
  //
  export interface AnimationCullingType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Animation
  //
  export interface Animation {
    clip: AnimationClip;
    playAutomatically: boolean;
    wrapMode: WrapMode;
    isPlaying: boolean;
    animatePhysics: boolean;
    animateOnlyIfVisible: boolean;
    cullingType: AnimationCullingType;
    localBounds: Bounds;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Stop: () => any;
    Rewind: () => any;
    Sample: () => any;
    IsPlaying: () => boolean;
    Play: () => boolean;
    CrossFade: () => any;
    Blend: () => any;
    CrossFadeQueued: () => AnimationState;
    PlayQueued: () => AnimationState;
    AddClip: () => any;
    RemoveClip: () => any;
    GetClipCount: () => number;
    SyncLayer: () => any;
    GetEnumerator: () => any;
    GetClip: () => AnimationClip;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AnimationState
  //
  export interface AnimationState {
    enabled: boolean;
    weight: number;
    wrapMode: WrapMode;
    time: number;
    normalizedTime: number;
    speed: number;
    normalizedSpeed: number;
    length: number;
    layer: number;
    clip: AnimationClip;
    name: string;
    blendMode: AnimationBlendMode;
    AddMixingTransform: () => any;
    RemoveMixingTransform: () => any;
  }
  //
  // Type: UnityEngine.AnimationEvent
  //
  export interface AnimationEvent {
    data: string;
    stringParameter: string;
    floatParameter: number;
    intParameter: number;
    objectReferenceParameter: Object;
    functionName: string;
    time: number;
    messageOptions: SendMessageOptions;
    isFiredByLegacy: boolean;
    isFiredByAnimator: boolean;
    animationState: AnimationState;
    animatorStateInfo: AnimatorStateInfo;
    animatorClipInfo: AnimatorClipInfo;
  }
  //
  // Type: UnityEngine.AnimationClip
  //
  export interface AnimationClip {
    length: number;
    frameRate: number;
    wrapMode: WrapMode;
    localBounds: Bounds;
    legacy: boolean;
    humanMotion: boolean;
    empty: boolean;
    hasGenericRootTransform: boolean;
    hasMotionFloatCurves: boolean;
    hasMotionCurves: boolean;
    hasRootCurves: boolean;
    events: AnimationEvent[];
    averageDuration: number;
    averageAngularSpeed: number;
    averageSpeed: Vector3;
    apparentSpeed: number;
    isLooping: boolean;
    isHumanMotion: boolean;
    isAnimatorMotion: boolean;
    name: string;
    hideFlags: HideFlags;
    SampleAnimation: () => any;
    SetCurve: () => any;
    EnsureQuaternionContinuity: () => any;
    ClearCurves: () => any;
    AddEvent: () => any;
    ValidateIfRetargetable: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AvatarTarget
  //
  export interface AvatarTarget {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AvatarIKGoal
  //
  export interface AvatarIKGoal {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AvatarIKHint
  //
  export interface AvatarIKHint {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimatorControllerParameterType
  //
  export interface AnimatorControllerParameterType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimatorRecorderMode
  //
  export interface AnimatorRecorderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.DurationUnit
  //
  export interface DurationUnit {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimatorCullingMode
  //
  export interface AnimatorCullingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimatorUpdateMode
  //
  export interface AnimatorUpdateMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AnimatorClipInfo
  //
  export interface AnimatorClipInfo {
    clip: AnimationClip;
    weight: number;
  }
  //
  // Type: UnityEngine.AnimatorStateInfo
  //
  export interface AnimatorStateInfo {
    fullPathHash: number;
    nameHash: number;
    shortNameHash: number;
    normalizedTime: number;
    length: number;
    speed: number;
    speedMultiplier: number;
    tagHash: number;
    loop: boolean;
    IsName: () => boolean;
    IsTag: () => boolean;
  }
  //
  // Type: UnityEngine.AnimatorTransitionInfo
  //
  export interface AnimatorTransitionInfo {
    fullPathHash: number;
    nameHash: number;
    userNameHash: number;
    durationUnit: DurationUnit;
    duration: number;
    normalizedTime: number;
    anyState: boolean;
    IsName: () => boolean;
    IsUserName: () => boolean;
  }
  //
  // Type: UnityEngine.MatchTargetWeightMask
  //
  export interface MatchTargetWeightMask {
    positionXYZWeight: Vector3;
    rotationWeight: number;
  }
  //
  // Type: UnityEngine.AnimatorControllerParameter
  //
  export interface AnimatorControllerParameter {
    name: string;
    nameHash: number;
    type: AnimatorControllerParameterType;
    defaultFloat: number;
    defaultInt: number;
    defaultBool: boolean;
  }
  //
  // Type: UnityEngine.AnimationClipPair
  //
  export interface AnimationClipPair {
    originalClip: AnimationClip;
    overrideClip: AnimationClip;
  }
  //
  // Type: UnityEngine.AnimatorOverrideController
  //
  export interface AnimatorOverrideController {
    runtimeAnimatorController: RuntimeAnimatorController;
    overridesCount: number;
    clips: AnimationClipPair[];
    animationClips: AnimationClip[];
    name: string;
    hideFlags: HideFlags;
    GetOverrides: () => any;
    ApplyOverrides: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AnimatorUtility
  //
  export interface AnimatorUtility {
  }
  //
  // Type: UnityEngine.BodyDof
  //
  export interface BodyDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HeadDof
  //
  export interface HeadDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LegDof
  //
  export interface LegDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ArmDof
  //
  export interface ArmDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FingerDof
  //
  export interface FingerDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HumanPartDof
  //
  export interface HumanPartDof {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HumanBodyBones
  //
  export interface HumanBodyBones {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Avatar
  //
  export interface Avatar {
    isValid: boolean;
    isHuman: boolean;
    humanDescription: HumanDescription;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SkeletonBone
  //
  export interface SkeletonBone {
    transformModified: number;
    name: string;
    position: Vector3;
    rotation: Quaternion;
    scale: Vector3;
  }
  //
  // Type: UnityEngine.HumanLimit
  //
  export interface HumanLimit {
    useDefaultValues: boolean;
    min: Vector3;
    max: Vector3;
    center: Vector3;
    axisLength: number;
  }
  //
  // Type: UnityEngine.HumanBone
  //
  export interface HumanBone {
    boneName: string;
    humanName: string;
    limit: HumanLimit;
  }
  //
  // Type: UnityEngine.HumanDescription
  //
  export interface HumanDescription {
    upperArmTwist: number;
    lowerArmTwist: number;
    upperLegTwist: number;
    lowerLegTwist: number;
    armStretch: number;
    legStretch: number;
    feetSpacing: number;
    hasTranslationDoF: boolean;
    human: HumanBone[];
    skeleton: SkeletonBone[];
  }
  //
  // Type: UnityEngine.AvatarBuilder
  //
  export interface AvatarBuilder {
  }
  //
  // Type: UnityEngine.AvatarMaskBodyPart
  //
  export interface AvatarMaskBodyPart {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AvatarMask
  //
  export interface AvatarMask {
    humanoidBodyPartCount: number;
    transformCount: number;
    name: string;
    hideFlags: HideFlags;
    GetHumanoidBodyPartActive: () => boolean;
    SetHumanoidBodyPartActive: () => any;
    AddTransformPath: () => any;
    RemoveTransformPath: () => any;
    GetTransformPath: () => string;
    SetTransformPath: () => any;
    GetTransformActive: () => boolean;
    SetTransformActive: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.HumanPose
  //
  export interface HumanPose {
    bodyPosition: Vector3;
    bodyRotation: Quaternion;
    muscles: any; // System.Single[]
  }
  //
  // Type: UnityEngine.HumanPoseHandler
  //
  export interface HumanPoseHandler {
    Dispose: () => any;
    GetHumanPose: () => any;
    SetHumanPose: () => any;
    GetInternalHumanPose: () => any;
    SetInternalHumanPose: () => any;
    GetInternalAvatarPose: () => any;
    SetInternalAvatarPose: () => any;
  }
  //
  // Type: UnityEngine.HumanTrait
  //
  export interface HumanTrait {
    // static MuscleCount: number;
    // static MuscleName: any; // System.String[]
    // static BoneCount: number;
    // static BoneName: any; // System.String[]
    // static RequiredBoneCount: number;
  }
  //
  // Type: UnityEngine.Motion
  //
  export interface Motion {
    averageDuration: number;
    averageAngularSpeed: number;
    averageSpeed: Vector3;
    apparentSpeed: number;
    isLooping: boolean;
    legacy: boolean;
    isHumanMotion: boolean;
    isAnimatorMotion: boolean;
    name: string;
    hideFlags: HideFlags;
    ValidateIfRetargetable: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RuntimeAnimatorController
  //
  export interface RuntimeAnimatorController {
    animationClips: AnimationClip[];
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioSettings
  //
  export interface AudioSettings {
    // static driverCaps: AudioSpeakerMode;
    // static driverCapabilities: AudioSpeakerMode;
    // static speakerMode: AudioSpeakerMode;
    // static dspTime: number;
    // static outputSampleRate: number;
  }
  //
  // Type: UnityEngine.AudioSettings+AudioConfigurationChangeHandler
  //
  export interface AudioSettings_AudioConfigurationChangeHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.AudioSettings+Mobile
  //
  export interface AudioSettings_Mobile {
    // static muteState: boolean;
    // static stopAudioOutputOnMute: boolean;
    // static audioOutputStarted: boolean;
  }
  //
  // Type: UnityEngine.AudioSource
  //
  export interface AudioSource {
    panLevel: number;
    pan: number;
    volume: number;
    pitch: number;
    time: number;
    timeSamples: number;
    clip: AudioClip;
    outputAudioMixerGroup: AudioMixerGroup;
    isPlaying: boolean;
    isVirtual: boolean;
    loop: boolean;
    ignoreListenerVolume: boolean;
    playOnAwake: boolean;
    ignoreListenerPause: boolean;
    velocityUpdateMode: AudioVelocityUpdateMode;
    panStereo: number;
    spatialBlend: number;
    spatialize: boolean;
    spatializePostEffects: boolean;
    reverbZoneMix: number;
    bypassEffects: boolean;
    bypassListenerEffects: boolean;
    bypassReverbZones: boolean;
    dopplerLevel: number;
    spread: number;
    priority: number;
    mute: boolean;
    minDistance: number;
    maxDistance: number;
    rolloffMode: AudioRolloffMode;
    minVolume: number;
    maxVolume: number;
    rolloffFactor: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetOutputData: () => any;
    GetSpectrumData: () => any;
    SetSpatializerFloat: () => boolean;
    GetSpatializerFloat: () => boolean;
    GetAmbisonicDecoderFloat: () => boolean;
    SetAmbisonicDecoderFloat: () => boolean;
    Play: () => any;
    PlayDelayed: () => any;
    PlayScheduled: () => any;
    PlayOneShot: () => any;
    SetScheduledStartTime: () => any;
    SetScheduledEndTime: () => any;
    Stop: () => any;
    Pause: () => any;
    UnPause: () => any;
    SetCustomCurve: () => any;
    GetCustomCurve: () => AnimationCurve;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioLowPassFilter
  //
  export interface AudioLowPassFilter {
    lowpassResonaceQ: number;
    customCutoffCurve: AnimationCurve;
    cutoffFrequency: number;
    lowpassResonanceQ: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioHighPassFilter
  //
  export interface AudioHighPassFilter {
    highpassResonaceQ: number;
    cutoffFrequency: number;
    highpassResonanceQ: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioReverbFilter
  //
  export interface AudioReverbFilter {
    lFReference: number;
    reverbPreset: AudioReverbPreset;
    dryLevel: number;
    room: number;
    roomHF: number;
    roomRolloffFactor: number;
    decayTime: number;
    decayHFRatio: number;
    reflectionsLevel: number;
    reflectionsDelay: number;
    reverbLevel: number;
    reverbDelay: number;
    diffusion: number;
    density: number;
    hfReference: number;
    roomLF: number;
    lfReference: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioSpeakerMode
  //
  export interface AudioSpeakerMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioDataLoadState
  //
  export interface AudioDataLoadState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioConfiguration
  //
  export interface AudioConfiguration {
    speakerMode: AudioSpeakerMode;
    dspBufferSize: number;
    sampleRate: number;
    numRealVoices: number;
    numVirtualVoices: number;
  }
  //
  // Type: UnityEngine.AudioCompressionFormat
  //
  export interface AudioCompressionFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioClipLoadType
  //
  export interface AudioClipLoadType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioVelocityUpdateMode
  //
  export interface AudioVelocityUpdateMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FFTWindow
  //
  export interface FFTWindow {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioRolloffMode
  //
  export interface AudioRolloffMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioSourceCurveType
  //
  export interface AudioSourceCurveType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioReverbPreset
  //
  export interface AudioReverbPreset {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AudioClip
  //
  export interface AudioClip {
    length: number;
    samples: number;
    channels: number;
    frequency: number;
    isReadyToPlay: boolean;
    loadType: AudioClipLoadType;
    preloadAudioData: boolean;
    ambisonic: boolean;
    loadInBackground: boolean;
    loadState: AudioDataLoadState;
    name: string;
    hideFlags: HideFlags;
    LoadAudioData: () => boolean;
    UnloadAudioData: () => boolean;
    GetData: () => boolean;
    SetData: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioClip+PCMReaderCallback
  //
  export interface AudioClip_PCMReaderCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.AudioClip+PCMSetPositionCallback
  //
  export interface AudioClip_PCMSetPositionCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.AudioBehaviour
  //
  export interface AudioBehaviour {
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioListener
  //
  export interface AudioListener {
    // static volume: number;
    // static pause: boolean;
    velocityUpdateMode: AudioVelocityUpdateMode;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioReverbZone
  //
  export interface AudioReverbZone {
    minDistance: number;
    maxDistance: number;
    reverbPreset: AudioReverbPreset;
    room: number;
    roomHF: number;
    roomLF: number;
    decayTime: number;
    decayHFRatio: number;
    reflections: number;
    reflectionsDelay: number;
    reverb: number;
    reverbDelay: number;
    HFReference: number;
    LFReference: number;
    roomRolloffFactor: number;
    diffusion: number;
    density: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioDistortionFilter
  //
  export interface AudioDistortionFilter {
    distortionLevel: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioEchoFilter
  //
  export interface AudioEchoFilter {
    delay: number;
    decayRatio: number;
    dryMix: number;
    wetMix: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AudioChorusFilter
  //
  export interface AudioChorusFilter {
    dryMix: number;
    wetMix1: number;
    wetMix2: number;
    wetMix3: number;
    delay: number;
    rate: number;
    depth: number;
    feedback: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Microphone
  //
  export interface Microphone {
    // static devices: any; // System.String[]
  }
  //
  // Type: UnityEngine.AudioRenderer
  //
  export interface AudioRenderer {
  }
  //
  // Type: UnityEngine.MovieTexture
  //
  export interface MovieTexture {
    audioClip: AudioClip;
    loop: boolean;
    isPlaying: boolean;
    isReadyToPlay: boolean;
    duration: number;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    Play: () => any;
    Stop: () => any;
    Pause: () => any;
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.WebCamFlags
  //
  export interface WebCamFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WebCamKind
  //
  export interface WebCamKind {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WebCamDevice
  //
  export interface WebCamDevice {
    name: string;
    isFrontFacing: boolean;
    kind: WebCamKind;
    depthCameraName: string;
    isAutoFocusPointSupported: boolean;
    availableResolutions: Resolution[];
  }
  //
  // Type: UnityEngine.WebCamTexture
  //
  export interface WebCamTexture {
    // static devices: WebCamDevice[];
    isPlaying: boolean;
    deviceName: string;
    requestedFPS: number;
    requestedWidth: number;
    requestedHeight: number;
    videoRotationAngle: number;
    videoVerticallyMirrored: boolean;
    didUpdateThisFrame: boolean;
    autoFocusPoint?: any; // System.Nullable`1[UnityEngine.Vector2]
    isDepth: boolean;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    Play: () => any;
    Pause: () => any;
    Stop: () => any;
    GetPixel: () => Color;
    GetPixels: () => Color[];
    GetPixels32: () => Color32[];
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ClusterInputType
  //
  export interface ClusterInputType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ClusterInput
  //
  export interface ClusterInput {
  }
  //
  // Type: UnityEngine.ClusterNetwork
  //
  export interface ClusterNetwork {
    // static isMasterOfCluster: boolean;
    // static isDisconnected: boolean;
    // static nodeIndex: number;
  }
  //
  // Type: UnityEngine.ClusterSerialization
  //
  export interface ClusterSerialization {
  }
  //
  // Type: UnityEngine.Grid
  //
  export interface Grid {
    cellSize: Vector3;
    cellGap: Vector3;
    cellLayout: GridLayout_CellLayout;
    cellSwizzle: GridLayout_CellSwizzle;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetCellCenterLocal: () => Vector3;
    GetCellCenterWorld: () => Vector3;
    GetBoundsLocal: () => Bounds;
    CellToLocal: () => Vector3;
    LocalToCell: () => Vector3Int;
    CellToLocalInterpolated: () => Vector3;
    LocalToCellInterpolated: () => Vector3;
    CellToWorld: () => Vector3;
    WorldToCell: () => Vector3Int;
    LocalToWorld: () => Vector3;
    WorldToLocal: () => Vector3;
    GetLayoutCellCenter: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.GridLayout
  //
  export interface GridLayout {
    cellSize: Vector3;
    cellGap: Vector3;
    cellLayout: GridLayout_CellLayout;
    cellSwizzle: GridLayout_CellSwizzle;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetBoundsLocal: () => Bounds;
    CellToLocal: () => Vector3;
    LocalToCell: () => Vector3Int;
    CellToLocalInterpolated: () => Vector3;
    LocalToCellInterpolated: () => Vector3;
    CellToWorld: () => Vector3;
    WorldToCell: () => Vector3Int;
    LocalToWorld: () => Vector3;
    WorldToLocal: () => Vector3;
    GetLayoutCellCenter: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.GridLayout+CellLayout
  //
  export interface GridLayout_CellLayout {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GridLayout+CellSwizzle
  //
  export interface GridLayout_CellSwizzle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ImageConversion
  //
  export interface ImageConversion {
    // static EnableLegacyPngGammaRuntimeLoadBehavior: boolean;
  }
  //
  // Type: UnityEngine.AndroidInput
  //
  export interface AndroidInput {
    // static touchCountSecondary: number;
    // static secondaryTouchEnabled: boolean;
    // static secondaryTouchWidth: number;
    // static secondaryTouchHeight: number;
  }
  //
  // Type: UnityEngine.TouchPhase
  //
  export interface TouchPhase {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.IMECompositionMode
  //
  export interface IMECompositionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TouchType
  //
  export interface TouchType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Touch
  //
  export interface Touch {
    fingerId: number;
    position: Vector2;
    rawPosition: Vector2;
    deltaPosition: Vector2;
    deltaTime: number;
    tapCount: number;
    phase: TouchPhase;
    pressure: number;
    maximumPossiblePressure: number;
    type: TouchType;
    altitudeAngle: number;
    azimuthAngle: number;
    radius: number;
    radiusVariance: number;
  }
  //
  // Type: UnityEngine.DeviceOrientation
  //
  export interface DeviceOrientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AccelerationEvent
  //
  export interface AccelerationEvent {
    acceleration: Vector3;
    deltaTime: number;
  }
  //
  // Type: UnityEngine.Gyroscope
  //
  export interface Gyroscope {
    rotationRate: Vector3;
    rotationRateUnbiased: Vector3;
    gravity: Vector3;
    userAcceleration: Vector3;
    attitude: Quaternion;
    enabled: boolean;
    updateInterval: number;
  }
  //
  // Type: UnityEngine.LocationInfo
  //
  export interface LocationInfo {
    latitude: number;
    longitude: number;
    altitude: number;
    horizontalAccuracy: number;
    verticalAccuracy: number;
    timestamp: number;
  }
  //
  // Type: UnityEngine.LocationServiceStatus
  //
  export interface LocationServiceStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.LocationService
  //
  export interface LocationService {
    isEnabledByUser: boolean;
    status: LocationServiceStatus;
    lastData: LocationInfo;
    Start: () => any;
    Stop: () => any;
  }
  //
  // Type: UnityEngine.Compass
  //
  export interface Compass {
    magneticHeading: number;
    trueHeading: number;
    headingAccuracy: number;
    rawVector: Vector3;
    timestamp: number;
    enabled: boolean;
  }
  //
  // Type: UnityEngine.Input
  //
  export interface Input {
    // static simulateMouseWithTouches: boolean;
    // static anyKey: boolean;
    // static anyKeyDown: boolean;
    // static inputString: string;
    // static mousePosition: Vector3;
    // static mouseScrollDelta: Vector2;
    // static imeCompositionMode: IMECompositionMode;
    // static compositionString: string;
    // static imeIsSelected: boolean;
    // static compositionCursorPos: Vector2;
    // static eatKeyPressOnTextFieldFocus: boolean;
    // static mousePresent: boolean;
    // static touchCount: number;
    // static touchPressureSupported: boolean;
    // static stylusTouchSupported: boolean;
    // static touchSupported: boolean;
    // static multiTouchEnabled: boolean;
    // static isGyroAvailable: boolean;
    // static deviceOrientation: DeviceOrientation;
    // static acceleration: Vector3;
    // static compensateSensors: boolean;
    // static accelerationEventCount: number;
    // static backButtonLeavesApp: boolean;
    // static location: LocationService;
    // static compass: Compass;
    // static gyro: Gyroscope;
    // static touches: Touch[];
    // static accelerationEvents: AccelerationEvent[];
  }
  //
  // Type: UnityEngine.JsonUtility
  //
  export interface JsonUtility {
  }
  //
  // Type: UnityEngine.LocalizationAsset
  //
  export interface LocalizationAsset {
    localeIsoCode: string;
    isEditorAsset: boolean;
    name: string;
    hideFlags: HideFlags;
    SetLocalizedString: () => any;
    GetLocalizedString: () => string;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystemEmissionType
  //
  export interface ParticleSystemEmissionType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystem
  //
  export interface ParticleSystem {
    safeCollisionEventSize: number;
    startDelay: number;
    loop: boolean;
    playOnAwake: boolean;
    duration: number;
    playbackSpeed: number;
    enableEmission: boolean;
    emissionRate: number;
    startSpeed: number;
    startSize: number;
    startColor: Color;
    startRotation: number;
    startRotation3D: Vector3;
    startLifetime: number;
    gravityModifier: number;
    maxParticles: number;
    simulationSpace: ParticleSystemSimulationSpace;
    scalingMode: ParticleSystemScalingMode;
    automaticCullingEnabled: boolean;
    isPlaying: boolean;
    isEmitting: boolean;
    isStopped: boolean;
    isPaused: boolean;
    particleCount: number;
    time: number;
    randomSeed: any; // System.UInt32
    useAutoRandomSeed: boolean;
    proceduralSimulationSupported: boolean;
    main: ParticleSystem_MainModule;
    emission: ParticleSystem_EmissionModule;
    shape: ParticleSystem_ShapeModule;
    velocityOverLifetime: ParticleSystem_VelocityOverLifetimeModule;
    limitVelocityOverLifetime: ParticleSystem_LimitVelocityOverLifetimeModule;
    inheritVelocity: ParticleSystem_InheritVelocityModule;
    lifetimeByEmitterSpeed: ParticleSystem_LifetimeByEmitterSpeedModule;
    forceOverLifetime: ParticleSystem_ForceOverLifetimeModule;
    colorOverLifetime: ParticleSystem_ColorOverLifetimeModule;
    colorBySpeed: ParticleSystem_ColorBySpeedModule;
    sizeOverLifetime: ParticleSystem_SizeOverLifetimeModule;
    sizeBySpeed: ParticleSystem_SizeBySpeedModule;
    rotationOverLifetime: ParticleSystem_RotationOverLifetimeModule;
    rotationBySpeed: ParticleSystem_RotationBySpeedModule;
    externalForces: ParticleSystem_ExternalForcesModule;
    noise: ParticleSystem_NoiseModule;
    collision: ParticleSystem_CollisionModule;
    trigger: ParticleSystem_TriggerModule;
    subEmitters: ParticleSystem_SubEmittersModule;
    textureSheetAnimation: ParticleSystem_TextureSheetAnimationModule;
    lights: ParticleSystem_LightsModule;
    trails: ParticleSystem_TrailModule;
    customData: ParticleSystem_CustomDataModule;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Play: () => any;
    Pause: () => any;
    Stop: () => any;
    Clear: () => any;
    IsAlive: () => boolean;
    Emit: () => any;
    TriggerSubEmitter: () => any;
    SetParticles: () => any;
    GetParticles: () => number;
    SetCustomParticleData: () => any;
    GetCustomParticleData: () => number;
    GetPlaybackState: () => ParticleSystem_PlaybackState;
    SetPlaybackState: () => any;
    GetTrails: () => ParticleSystem_Trails;
    SetTrails: () => any;
    Simulate: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystem+MinMaxCurve
  //
  export interface ParticleSystem_MinMaxCurve {
    curveScalar: number;
    mode: ParticleSystemCurveMode;
    curveMultiplier: number;
    curveMax: AnimationCurve;
    curveMin: AnimationCurve;
    constantMax: number;
    constantMin: number;
    constant: number;
    curve: AnimationCurve;
    Evaluate: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystem+MainModule
  //
  export interface ParticleSystem_MainModule {
    randomizeRotationDirection: number;
    duration: number;
    loop: boolean;
    prewarm: boolean;
    startDelay: ParticleSystem_MinMaxCurve;
    startDelayMultiplier: number;
    startLifetime: ParticleSystem_MinMaxCurve;
    startLifetimeMultiplier: number;
    startSpeed: ParticleSystem_MinMaxCurve;
    startSpeedMultiplier: number;
    startSize3D: boolean;
    startSize: ParticleSystem_MinMaxCurve;
    startSizeMultiplier: number;
    startSizeX: ParticleSystem_MinMaxCurve;
    startSizeXMultiplier: number;
    startSizeY: ParticleSystem_MinMaxCurve;
    startSizeYMultiplier: number;
    startSizeZ: ParticleSystem_MinMaxCurve;
    startSizeZMultiplier: number;
    startRotation3D: boolean;
    startRotation: ParticleSystem_MinMaxCurve;
    startRotationMultiplier: number;
    startRotationX: ParticleSystem_MinMaxCurve;
    startRotationXMultiplier: number;
    startRotationY: ParticleSystem_MinMaxCurve;
    startRotationYMultiplier: number;
    startRotationZ: ParticleSystem_MinMaxCurve;
    startRotationZMultiplier: number;
    flipRotation: number;
    startColor: ParticleSystem_MinMaxGradient;
    gravityModifier: ParticleSystem_MinMaxCurve;
    gravityModifierMultiplier: number;
    simulationSpace: ParticleSystemSimulationSpace;
    customSimulationSpace: Transform;
    simulationSpeed: number;
    useUnscaledTime: boolean;
    scalingMode: ParticleSystemScalingMode;
    playOnAwake: boolean;
    maxParticles: number;
    emitterVelocityMode: ParticleSystemEmitterVelocityMode;
    stopAction: ParticleSystemStopAction;
    ringBufferMode: ParticleSystemRingBufferMode;
    ringBufferLoopRange: Vector2;
    cullingMode: ParticleSystemCullingMode;
  }
  //
  // Type: UnityEngine.ParticleSystem+EmissionModule
  //
  export interface ParticleSystem_EmissionModule {
    type: ParticleSystemEmissionType;
    rate: ParticleSystem_MinMaxCurve;
    rateMultiplier: number;
    enabled: boolean;
    rateOverTime: ParticleSystem_MinMaxCurve;
    rateOverTimeMultiplier: number;
    rateOverDistance: ParticleSystem_MinMaxCurve;
    rateOverDistanceMultiplier: number;
    burstCount: number;
    SetBursts: () => any;
    GetBursts: () => number;
    SetBurst: () => any;
    GetBurst: () => ParticleSystem_Burst;
  }
  //
  // Type: UnityEngine.ParticleSystem+ShapeModule
  //
  export interface ParticleSystem_ShapeModule {
    box: Vector3;
    meshScale: number;
    randomDirection: boolean;
    enabled: boolean;
    shapeType: ParticleSystemShapeType;
    randomDirectionAmount: number;
    sphericalDirectionAmount: number;
    randomPositionAmount: number;
    alignToDirection: boolean;
    radius: number;
    radiusMode: ParticleSystemShapeMultiModeValue;
    radiusSpread: number;
    radiusSpeed: ParticleSystem_MinMaxCurve;
    radiusSpeedMultiplier: number;
    radiusThickness: number;
    angle: number;
    length: number;
    boxThickness: Vector3;
    meshShapeType: ParticleSystemMeshShapeType;
    mesh: Mesh;
    meshRenderer: MeshRenderer;
    skinnedMeshRenderer: SkinnedMeshRenderer;
    sprite: Sprite;
    spriteRenderer: SpriteRenderer;
    useMeshMaterialIndex: boolean;
    meshMaterialIndex: number;
    useMeshColors: boolean;
    normalOffset: number;
    meshSpawnMode: ParticleSystemShapeMultiModeValue;
    meshSpawnSpread: number;
    meshSpawnSpeed: ParticleSystem_MinMaxCurve;
    meshSpawnSpeedMultiplier: number;
    arc: number;
    arcMode: ParticleSystemShapeMultiModeValue;
    arcSpread: number;
    arcSpeed: ParticleSystem_MinMaxCurve;
    arcSpeedMultiplier: number;
    donutRadius: number;
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    texture: Texture2D;
    textureClipChannel: ParticleSystemShapeTextureChannel;
    textureClipThreshold: number;
    textureColorAffectsParticles: boolean;
    textureAlphaAffectsParticles: boolean;
    textureBilinearFiltering: boolean;
    textureUVChannel: number;
  }
  //
  // Type: UnityEngine.ParticleSystem+CollisionModule
  //
  export interface ParticleSystem_CollisionModule {
    maxPlaneCount: number;
    enabled: boolean;
    type: ParticleSystemCollisionType;
    mode: ParticleSystemCollisionMode;
    dampen: ParticleSystem_MinMaxCurve;
    dampenMultiplier: number;
    bounce: ParticleSystem_MinMaxCurve;
    bounceMultiplier: number;
    lifetimeLoss: ParticleSystem_MinMaxCurve;
    lifetimeLossMultiplier: number;
    minKillSpeed: number;
    maxKillSpeed: number;
    collidesWith: LayerMask;
    enableDynamicColliders: boolean;
    maxCollisionShapes: number;
    quality: ParticleSystemCollisionQuality;
    voxelSize: number;
    radiusScale: number;
    sendCollisionMessages: boolean;
    colliderForce: number;
    multiplyColliderForceByCollisionAngle: boolean;
    multiplyColliderForceByParticleSpeed: boolean;
    multiplyColliderForceByParticleSize: boolean;
    planeCount: number;
    enableInteriorCollisions: boolean;
    AddPlane: () => any;
    RemovePlane: () => any;
    SetPlane: () => any;
    GetPlane: () => Transform;
  }
  //
  // Type: UnityEngine.ParticleSystem+TriggerModule
  //
  export interface ParticleSystem_TriggerModule {
    maxColliderCount: number;
    enabled: boolean;
    inside: ParticleSystemOverlapAction;
    outside: ParticleSystemOverlapAction;
    enter: ParticleSystemOverlapAction;
    exit: ParticleSystemOverlapAction;
    colliderQueryMode: ParticleSystemColliderQueryMode;
    radiusScale: number;
    colliderCount: number;
    AddCollider: () => any;
    RemoveCollider: () => any;
    SetCollider: () => any;
    GetCollider: () => Component;
  }
  //
  // Type: UnityEngine.ParticleSystem+SubEmittersModule
  //
  export interface ParticleSystem_SubEmittersModule {
    birth0: ParticleSystem;
    birth1: ParticleSystem;
    collision0: ParticleSystem;
    collision1: ParticleSystem;
    death0: ParticleSystem;
    death1: ParticleSystem;
    enabled: boolean;
    subEmittersCount: number;
    AddSubEmitter: () => any;
    RemoveSubEmitter: () => any;
    SetSubEmitterSystem: () => any;
    SetSubEmitterType: () => any;
    SetSubEmitterProperties: () => any;
    SetSubEmitterEmitProbability: () => any;
    GetSubEmitterSystem: () => ParticleSystem;
    GetSubEmitterType: () => ParticleSystemSubEmitterType;
    GetSubEmitterProperties: () => ParticleSystemSubEmitterProperties;
    GetSubEmitterEmitProbability: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystem+TextureSheetAnimationModule
  //
  export interface ParticleSystem_TextureSheetAnimationModule {
    flipU: number;
    flipV: number;
    useRandomRow: boolean;
    enabled: boolean;
    mode: ParticleSystemAnimationMode;
    timeMode: ParticleSystemAnimationTimeMode;
    fps: number;
    numTilesX: number;
    numTilesY: number;
    animation: ParticleSystemAnimationType;
    rowMode: ParticleSystemAnimationRowMode;
    frameOverTime: ParticleSystem_MinMaxCurve;
    frameOverTimeMultiplier: number;
    startFrame: ParticleSystem_MinMaxCurve;
    startFrameMultiplier: number;
    cycleCount: number;
    rowIndex: number;
    uvChannelMask: UVChannelFlags;
    spriteCount: number;
    speedRange: Vector2;
    AddSprite: () => any;
    RemoveSprite: () => any;
    SetSprite: () => any;
    GetSprite: () => Sprite;
  }
  //
  // Type: UnityEngine.ParticleSystem+Particle
  //
  export interface ParticleSystem_Particle {
    lifetime: number;
    randomValue: number;
    size: number;
    color: Color32;
    position: Vector3;
    velocity: Vector3;
    animatedVelocity: Vector3;
    totalVelocity: Vector3;
    remainingLifetime: number;
    startLifetime: number;
    startColor: Color32;
    randomSeed: any; // System.UInt32
    axisOfRotation: Vector3;
    startSize: number;
    startSize3D: Vector3;
    rotation: number;
    rotation3D: Vector3;
    angularVelocity: number;
    angularVelocity3D: Vector3;
    GetCurrentSize: () => number;
    GetCurrentSize3D: () => Vector3;
    GetCurrentColor: () => Color32;
    SetMeshIndex: () => any;
    GetMeshIndex: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystem+CollisionEvent
  //
  export interface ParticleSystem_CollisionEvent {
    intersection: Vector3;
    normal: Vector3;
    velocity: Vector3;
    collider: Component;
  }
  //
  // Type: UnityEngine.ParticleSystem+Burst
  //
  export interface ParticleSystem_Burst {
    time: number;
    count: ParticleSystem_MinMaxCurve;
    minCount: any; // System.Int16
    maxCount: any; // System.Int16
    cycleCount: number;
    repeatInterval: number;
    probability: number;
  }
  //
  // Type: UnityEngine.ParticleSystem+MinMaxGradient
  //
  export interface ParticleSystem_MinMaxGradient {
    mode: ParticleSystemGradientMode;
    gradientMax: Gradient;
    gradientMin: Gradient;
    colorMax: Color;
    colorMin: Color;
    color: Color;
    gradient: Gradient;
    Evaluate: () => Color;
  }
  //
  // Type: UnityEngine.ParticleSystem+EmitParams
  //
  export interface ParticleSystem_EmitParams {
    particle: ParticleSystem_Particle;
    position: Vector3;
    applyShapeToPosition: boolean;
    velocity: Vector3;
    startLifetime: number;
    startSize: number;
    startSize3D: Vector3;
    axisOfRotation: Vector3;
    rotation: number;
    rotation3D: Vector3;
    angularVelocity: number;
    angularVelocity3D: Vector3;
    startColor: Color32;
    randomSeed: any; // System.UInt32
    meshIndex: number;
    ResetPosition: () => any;
    ResetVelocity: () => any;
    ResetAxisOfRotation: () => any;
    ResetRotation: () => any;
    ResetAngularVelocity: () => any;
    ResetStartSize: () => any;
    ResetStartColor: () => any;
    ResetRandomSeed: () => any;
    ResetStartLifetime: () => any;
    ResetMeshIndex: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystem+PlaybackState
  //
  export interface ParticleSystem_PlaybackState {
  }
  //
  // Type: UnityEngine.ParticleSystem+Trails
  //
  export interface ParticleSystem_Trails {
  }
  //
  // Type: UnityEngine.ParticleSystem+ColliderData
  //
  export interface ParticleSystem_ColliderData {
    GetColliderCount: () => number;
    GetCollider: () => Component;
  }
  //
  // Type: UnityEngine.ParticleSystem+VelocityOverLifetimeModule
  //
  export interface ParticleSystem_VelocityOverLifetimeModule {
    enabled: boolean;
    x: ParticleSystem_MinMaxCurve;
    y: ParticleSystem_MinMaxCurve;
    z: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    yMultiplier: number;
    zMultiplier: number;
    orbitalX: ParticleSystem_MinMaxCurve;
    orbitalY: ParticleSystem_MinMaxCurve;
    orbitalZ: ParticleSystem_MinMaxCurve;
    orbitalXMultiplier: number;
    orbitalYMultiplier: number;
    orbitalZMultiplier: number;
    orbitalOffsetX: ParticleSystem_MinMaxCurve;
    orbitalOffsetY: ParticleSystem_MinMaxCurve;
    orbitalOffsetZ: ParticleSystem_MinMaxCurve;
    orbitalOffsetXMultiplier: number;
    orbitalOffsetYMultiplier: number;
    orbitalOffsetZMultiplier: number;
    radial: ParticleSystem_MinMaxCurve;
    radialMultiplier: number;
    speedModifier: ParticleSystem_MinMaxCurve;
    speedModifierMultiplier: number;
    space: ParticleSystemSimulationSpace;
  }
  //
  // Type: UnityEngine.ParticleSystem+LimitVelocityOverLifetimeModule
  //
  export interface ParticleSystem_LimitVelocityOverLifetimeModule {
    enabled: boolean;
    limitX: ParticleSystem_MinMaxCurve;
    limitXMultiplier: number;
    limitY: ParticleSystem_MinMaxCurve;
    limitYMultiplier: number;
    limitZ: ParticleSystem_MinMaxCurve;
    limitZMultiplier: number;
    limit: ParticleSystem_MinMaxCurve;
    limitMultiplier: number;
    dampen: number;
    separateAxes: boolean;
    space: ParticleSystemSimulationSpace;
    drag: ParticleSystem_MinMaxCurve;
    dragMultiplier: number;
    multiplyDragByParticleSize: boolean;
    multiplyDragByParticleVelocity: boolean;
  }
  //
  // Type: UnityEngine.ParticleSystem+InheritVelocityModule
  //
  export interface ParticleSystem_InheritVelocityModule {
    enabled: boolean;
    mode: ParticleSystemInheritVelocityMode;
    curve: ParticleSystem_MinMaxCurve;
    curveMultiplier: number;
  }
  //
  // Type: UnityEngine.ParticleSystem+LifetimeByEmitterSpeedModule
  //
  export interface ParticleSystem_LifetimeByEmitterSpeedModule {
    enabled: boolean;
    curve: ParticleSystem_MinMaxCurve;
    curveMultiplier: number;
    range: Vector2;
  }
  //
  // Type: UnityEngine.ParticleSystem+ForceOverLifetimeModule
  //
  export interface ParticleSystem_ForceOverLifetimeModule {
    enabled: boolean;
    x: ParticleSystem_MinMaxCurve;
    y: ParticleSystem_MinMaxCurve;
    z: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    yMultiplier: number;
    zMultiplier: number;
    space: ParticleSystemSimulationSpace;
    randomized: boolean;
  }
  //
  // Type: UnityEngine.ParticleSystem+ColorOverLifetimeModule
  //
  export interface ParticleSystem_ColorOverLifetimeModule {
    enabled: boolean;
    color: ParticleSystem_MinMaxGradient;
  }
  //
  // Type: UnityEngine.ParticleSystem+ColorBySpeedModule
  //
  export interface ParticleSystem_ColorBySpeedModule {
    enabled: boolean;
    color: ParticleSystem_MinMaxGradient;
    range: Vector2;
  }
  //
  // Type: UnityEngine.ParticleSystem+SizeOverLifetimeModule
  //
  export interface ParticleSystem_SizeOverLifetimeModule {
    enabled: boolean;
    size: ParticleSystem_MinMaxCurve;
    sizeMultiplier: number;
    x: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    y: ParticleSystem_MinMaxCurve;
    yMultiplier: number;
    z: ParticleSystem_MinMaxCurve;
    zMultiplier: number;
    separateAxes: boolean;
  }
  //
  // Type: UnityEngine.ParticleSystem+SizeBySpeedModule
  //
  export interface ParticleSystem_SizeBySpeedModule {
    enabled: boolean;
    size: ParticleSystem_MinMaxCurve;
    sizeMultiplier: number;
    x: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    y: ParticleSystem_MinMaxCurve;
    yMultiplier: number;
    z: ParticleSystem_MinMaxCurve;
    zMultiplier: number;
    separateAxes: boolean;
    range: Vector2;
  }
  //
  // Type: UnityEngine.ParticleSystem+RotationOverLifetimeModule
  //
  export interface ParticleSystem_RotationOverLifetimeModule {
    enabled: boolean;
    x: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    y: ParticleSystem_MinMaxCurve;
    yMultiplier: number;
    z: ParticleSystem_MinMaxCurve;
    zMultiplier: number;
    separateAxes: boolean;
  }
  //
  // Type: UnityEngine.ParticleSystem+RotationBySpeedModule
  //
  export interface ParticleSystem_RotationBySpeedModule {
    enabled: boolean;
    x: ParticleSystem_MinMaxCurve;
    xMultiplier: number;
    y: ParticleSystem_MinMaxCurve;
    yMultiplier: number;
    z: ParticleSystem_MinMaxCurve;
    zMultiplier: number;
    separateAxes: boolean;
    range: Vector2;
  }
  //
  // Type: UnityEngine.ParticleSystem+ExternalForcesModule
  //
  export interface ParticleSystem_ExternalForcesModule {
    enabled: boolean;
    multiplier: number;
    multiplierCurve: ParticleSystem_MinMaxCurve;
    influenceFilter: ParticleSystemGameObjectFilter;
    influenceMask: LayerMask;
    influenceCount: number;
    IsAffectedBy: () => boolean;
    AddInfluence: () => any;
    RemoveInfluence: () => any;
    RemoveAllInfluences: () => any;
    SetInfluence: () => any;
    GetInfluence: () => ParticleSystemForceField;
  }
  //
  // Type: UnityEngine.ParticleSystem+NoiseModule
  //
  export interface ParticleSystem_NoiseModule {
    enabled: boolean;
    separateAxes: boolean;
    strength: ParticleSystem_MinMaxCurve;
    strengthMultiplier: number;
    strengthX: ParticleSystem_MinMaxCurve;
    strengthXMultiplier: number;
    strengthY: ParticleSystem_MinMaxCurve;
    strengthYMultiplier: number;
    strengthZ: ParticleSystem_MinMaxCurve;
    strengthZMultiplier: number;
    frequency: number;
    damping: boolean;
    octaveCount: number;
    octaveMultiplier: number;
    octaveScale: number;
    quality: ParticleSystemNoiseQuality;
    scrollSpeed: ParticleSystem_MinMaxCurve;
    scrollSpeedMultiplier: number;
    remapEnabled: boolean;
    remap: ParticleSystem_MinMaxCurve;
    remapMultiplier: number;
    remapX: ParticleSystem_MinMaxCurve;
    remapXMultiplier: number;
    remapY: ParticleSystem_MinMaxCurve;
    remapYMultiplier: number;
    remapZ: ParticleSystem_MinMaxCurve;
    remapZMultiplier: number;
    positionAmount: ParticleSystem_MinMaxCurve;
    rotationAmount: ParticleSystem_MinMaxCurve;
    sizeAmount: ParticleSystem_MinMaxCurve;
  }
  //
  // Type: UnityEngine.ParticleSystem+LightsModule
  //
  export interface ParticleSystem_LightsModule {
    enabled: boolean;
    ratio: number;
    useRandomDistribution: boolean;
    light: Light;
    useParticleColor: boolean;
    sizeAffectsRange: boolean;
    alphaAffectsIntensity: boolean;
    range: ParticleSystem_MinMaxCurve;
    rangeMultiplier: number;
    intensity: ParticleSystem_MinMaxCurve;
    intensityMultiplier: number;
    maxLights: number;
  }
  //
  // Type: UnityEngine.ParticleSystem+TrailModule
  //
  export interface ParticleSystem_TrailModule {
    enabled: boolean;
    mode: ParticleSystemTrailMode;
    ratio: number;
    lifetime: ParticleSystem_MinMaxCurve;
    lifetimeMultiplier: number;
    minVertexDistance: number;
    textureMode: ParticleSystemTrailTextureMode;
    worldSpace: boolean;
    dieWithParticles: boolean;
    sizeAffectsWidth: boolean;
    sizeAffectsLifetime: boolean;
    inheritParticleColor: boolean;
    colorOverLifetime: ParticleSystem_MinMaxGradient;
    widthOverTrail: ParticleSystem_MinMaxCurve;
    widthOverTrailMultiplier: number;
    colorOverTrail: ParticleSystem_MinMaxGradient;
    generateLightingData: boolean;
    ribbonCount: number;
    shadowBias: number;
    splitSubEmitterRibbons: boolean;
    attachRibbonsToTransform: boolean;
  }
  //
  // Type: UnityEngine.ParticleSystem+CustomDataModule
  //
  export interface ParticleSystem_CustomDataModule {
    enabled: boolean;
    SetMode: () => any;
    GetMode: () => ParticleSystemCustomDataMode;
    SetVectorComponentCount: () => any;
    GetVectorComponentCount: () => number;
    SetVector: () => any;
    GetVector: () => ParticleSystem_MinMaxCurve;
    SetColor: () => any;
    GetColor: () => ParticleSystem_MinMaxGradient;
  }
  //
  // Type: UnityEngine.ParticlePhysicsExtensions
  //
  export interface ParticlePhysicsExtensions {
  }
  //
  // Type: UnityEngine.ParticleCollisionEvent
  //
  export interface ParticleCollisionEvent {
    collider: Component;
    intersection: Vector3;
    normal: Vector3;
    velocity: Vector3;
    colliderComponent: Component;
  }
  //
  // Type: UnityEngine.ParticleSystemRenderMode
  //
  export interface ParticleSystemRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemSortMode
  //
  export interface ParticleSystemSortMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCollisionQuality
  //
  export interface ParticleSystemCollisionQuality {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemRenderSpace
  //
  export interface ParticleSystemRenderSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCurveMode
  //
  export interface ParticleSystemCurveMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemGradientMode
  //
  export interface ParticleSystemGradientMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemShapeType
  //
  export interface ParticleSystemShapeType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemMeshShapeType
  //
  export interface ParticleSystemMeshShapeType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemShapeTextureChannel
  //
  export interface ParticleSystemShapeTextureChannel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemAnimationMode
  //
  export interface ParticleSystemAnimationMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemAnimationTimeMode
  //
  export interface ParticleSystemAnimationTimeMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemAnimationType
  //
  export interface ParticleSystemAnimationType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemAnimationRowMode
  //
  export interface ParticleSystemAnimationRowMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCollisionType
  //
  export interface ParticleSystemCollisionType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCollisionMode
  //
  export interface ParticleSystemCollisionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemOverlapAction
  //
  export interface ParticleSystemOverlapAction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemColliderQueryMode
  //
  export interface ParticleSystemColliderQueryMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemSimulationSpace
  //
  export interface ParticleSystemSimulationSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemStopBehavior
  //
  export interface ParticleSystemStopBehavior {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemScalingMode
  //
  export interface ParticleSystemScalingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemStopAction
  //
  export interface ParticleSystemStopAction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCullingMode
  //
  export interface ParticleSystemCullingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemEmitterVelocityMode
  //
  export interface ParticleSystemEmitterVelocityMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemInheritVelocityMode
  //
  export interface ParticleSystemInheritVelocityMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemTriggerEventType
  //
  export interface ParticleSystemTriggerEventType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemVertexStream
  //
  export interface ParticleSystemVertexStream {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCustomData
  //
  export interface ParticleSystemCustomData {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemCustomDataMode
  //
  export interface ParticleSystemCustomDataMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemNoiseQuality
  //
  export interface ParticleSystemNoiseQuality {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemSubEmitterType
  //
  export interface ParticleSystemSubEmitterType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemSubEmitterProperties
  //
  export interface ParticleSystemSubEmitterProperties {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemTrailMode
  //
  export interface ParticleSystemTrailMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemTrailTextureMode
  //
  export interface ParticleSystemTrailTextureMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemShapeMultiModeValue
  //
  export interface ParticleSystemShapeMultiModeValue {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemRingBufferMode
  //
  export interface ParticleSystemRingBufferMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemGameObjectFilter
  //
  export interface ParticleSystemGameObjectFilter {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemForceFieldShape
  //
  export interface ParticleSystemForceFieldShape {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemVertexStreams
  //
  export interface ParticleSystemVertexStreams {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemRenderer
  //
  export interface ParticleSystemRenderer {
    alignment: ParticleSystemRenderSpace;
    renderMode: ParticleSystemRenderMode;
    sortMode: ParticleSystemSortMode;
    lengthScale: number;
    velocityScale: number;
    cameraVelocityScale: number;
    normalDirection: number;
    shadowBias: number;
    sortingFudge: number;
    minParticleSize: number;
    maxParticleSize: number;
    pivot: Vector3;
    flip: Vector3;
    maskInteraction: SpriteMaskInteraction;
    trailMaterial: Material;
    enableGPUInstancing: boolean;
    allowRoll: boolean;
    freeformStretching: boolean;
    rotateWithStretchDirection: boolean;
    mesh: Mesh;
    meshCount: number;
    activeVertexStreamsCount: number;
    supportsMeshInstancing: boolean;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    EnableVertexStreams: () => any;
    DisableVertexStreams: () => any;
    AreVertexStreamsEnabled: () => boolean;
    GetEnabledVertexStreams: () => ParticleSystemVertexStreams;
    GetMeshes: () => number;
    SetMeshes: () => any;
    BakeMesh: () => any;
    BakeTrailsMesh: () => any;
    SetActiveVertexStreams: () => any;
    GetActiveVertexStreams: () => any;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ParticleSystemForceField
  //
  export interface ParticleSystemForceField {
    shape: ParticleSystemForceFieldShape;
    startRange: number;
    endRange: number;
    length: number;
    gravityFocus: number;
    rotationRandomness: Vector2;
    multiplyDragByParticleSize: boolean;
    multiplyDragByParticleVelocity: boolean;
    vectorField: Texture3D;
    directionX: ParticleSystem_MinMaxCurve;
    directionY: ParticleSystem_MinMaxCurve;
    directionZ: ParticleSystem_MinMaxCurve;
    gravity: ParticleSystem_MinMaxCurve;
    rotationSpeed: ParticleSystem_MinMaxCurve;
    rotationAttraction: ParticleSystem_MinMaxCurve;
    drag: ParticleSystem_MinMaxCurve;
    vectorFieldSpeed: ParticleSystem_MinMaxCurve;
    vectorFieldAttraction: ParticleSystem_MinMaxCurve;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RigidbodyConstraints
  //
  export interface RigidbodyConstraints {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ForceMode
  //
  export interface ForceMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.JointDriveMode
  //
  export interface JointDriveMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.JointProjectionMode
  //
  export interface JointProjectionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.MeshColliderCookingOptions
  //
  export interface MeshColliderCookingOptions {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WheelFrictionCurve
  //
  export interface WheelFrictionCurve {
    extremumSlip: number;
    extremumValue: number;
    asymptoteSlip: number;
    asymptoteValue: number;
    stiffness: number;
  }
  //
  // Type: UnityEngine.SoftJointLimit
  //
  export interface SoftJointLimit {
    limit: number;
    spring: number;
    damper: number;
    bounciness: number;
    contactDistance: number;
    bouncyness: number;
  }
  //
  // Type: UnityEngine.SoftJointLimitSpring
  //
  export interface SoftJointLimitSpring {
    spring: number;
    damper: number;
  }
  //
  // Type: UnityEngine.JointDrive
  //
  export interface JointDrive {
    mode: JointDriveMode;
    positionSpring: number;
    positionDamper: number;
    maximumForce: number;
  }
  //
  // Type: UnityEngine.RigidbodyInterpolation
  //
  export interface RigidbodyInterpolation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.JointMotor
  //
  export interface JointMotor {
    targetVelocity: number;
    force: number;
    freeSpin: boolean;
  }
  //
  // Type: UnityEngine.JointSpring
  //
  export interface JointSpring {
    spring: number;
    damper: number;
    targetPosition: number;
  }
  //
  // Type: UnityEngine.JointLimits
  //
  export interface JointLimits {
    min: number;
    max: number;
    bounciness: number;
    bounceMinVelocity: number;
    contactDistance: number;
    minBounce: number;
    maxBounce: number;
  }
  //
  // Type: UnityEngine.ControllerColliderHit
  //
  export interface ControllerColliderHit {
    controller: CharacterController;
    collider: Collider;
    rigidbody: Rigidbody;
    gameObject: GameObject;
    transform: Transform;
    point: Vector3;
    normal: Vector3;
    moveDirection: Vector3;
    moveLength: number;
  }
  //
  // Type: UnityEngine.PhysicMaterialCombine
  //
  export interface PhysicMaterialCombine {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Collision
  //
  export interface Collision {
    relativeVelocity: Vector3;
    rigidbody: Rigidbody;
    collider: Collider;
    transform: Transform;
    gameObject: GameObject;
    contactCount: number;
    contacts: ContactPoint[];
    impulse: Vector3;
    impactForceSum: Vector3;
    frictionForceSum: Vector3;
    other: Component;
    GetContact: () => ContactPoint;
    GetContacts: () => number;
    GetEnumerator: () => any;
  }
  //
  // Type: UnityEngine.CollisionFlags
  //
  export interface CollisionFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.QueryTriggerInteraction
  //
  export interface QueryTriggerInteraction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CollisionDetectionMode
  //
  export interface CollisionDetectionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ConfigurableJointMotion
  //
  export interface ConfigurableJointMotion {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RotationDriveMode
  //
  export interface RotationDriveMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.PhysicMaterial
  //
  export interface PhysicMaterial {
    bounciness: number;
    dynamicFriction: number;
    staticFriction: number;
    frictionCombine: PhysicMaterialCombine;
    bounceCombine: PhysicMaterialCombine;
    bouncyness: number;
    frictionDirection2: Vector3;
    dynamicFriction2: number;
    staticFriction2: number;
    frictionDirection: Vector3;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RaycastHit
  //
  export interface RaycastHit {
    collider: Collider;
    point: Vector3;
    normal: Vector3;
    barycentricCoordinate: Vector3;
    distance: number;
    triangleIndex: number;
    textureCoord: Vector2;
    textureCoord2: Vector2;
    textureCoord1: Vector2;
    transform: Transform;
    rigidbody: Rigidbody;
    articulationBody: ArticulationBody;
    lightmapCoord: Vector2;
  }
  //
  // Type: UnityEngine.Rigidbody
  //
  export interface Rigidbody {
    velocity: Vector3;
    angularVelocity: Vector3;
    drag: number;
    angularDrag: number;
    mass: number;
    useGravity: boolean;
    maxDepenetrationVelocity: number;
    isKinematic: boolean;
    freezeRotation: boolean;
    constraints: RigidbodyConstraints;
    collisionDetectionMode: CollisionDetectionMode;
    centerOfMass: Vector3;
    worldCenterOfMass: Vector3;
    inertiaTensorRotation: Quaternion;
    inertiaTensor: Vector3;
    detectCollisions: boolean;
    position: Vector3;
    rotation: Quaternion;
    interpolation: RigidbodyInterpolation;
    solverIterations: number;
    sleepThreshold: number;
    maxAngularVelocity: number;
    solverVelocityIterations: number;
    sleepVelocity: number;
    sleepAngularVelocity: number;
    useConeFriction: boolean;
    solverIterationCount: number;
    solverVelocityIterationCount: number;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    AddRelativeForce: () => any;
    AddTorque: () => any;
    AddRelativeTorque: () => any;
    AddForceAtPosition: () => any;
    AddExplosionForce: () => any;
    ClosestPointOnBounds: () => Vector3;
    SweepTest: () => boolean;
    SweepTestAll: () => RaycastHit[];
    SetDensity: () => any;
    MovePosition: () => any;
    MoveRotation: () => any;
    Sleep: () => any;
    IsSleeping: () => boolean;
    WakeUp: () => any;
    ResetCenterOfMass: () => any;
    ResetInertiaTensor: () => any;
    GetRelativePointVelocity: () => Vector3;
    GetPointVelocity: () => Vector3;
    SetMaxAngularVelocity: () => any;
    AddForce: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Collider
  //
  export interface Collider {
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CharacterController
  //
  export interface CharacterController {
    velocity: Vector3;
    isGrounded: boolean;
    collisionFlags: CollisionFlags;
    radius: number;
    height: number;
    center: Vector3;
    slopeLimit: number;
    stepOffset: number;
    skinWidth: number;
    minMoveDistance: number;
    detectCollisions: boolean;
    enableOverlapRecovery: boolean;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SimpleMove: () => boolean;
    Move: () => CollisionFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.MeshCollider
  //
  export interface MeshCollider {
    sharedMesh: Mesh;
    convex: boolean;
    inflateMesh: boolean;
    cookingOptions: MeshColliderCookingOptions;
    skinWidth: number;
    smoothSphereCollisions: boolean;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CapsuleCollider
  //
  export interface CapsuleCollider {
    center: Vector3;
    radius: number;
    height: number;
    direction: number;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.BoxCollider
  //
  export interface BoxCollider {
    center: Vector3;
    size: Vector3;
    extents: Vector3;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SphereCollider
  //
  export interface SphereCollider {
    center: Vector3;
    radius: number;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ConstantForce
  //
  export interface ConstantForce {
    force: Vector3;
    relativeForce: Vector3;
    torque: Vector3;
    relativeTorque: Vector3;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Joint
  //
  export interface Joint {
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.HingeJoint
  //
  export interface HingeJoint {
    motor: JointMotor;
    limits: JointLimits;
    spring: JointSpring;
    useMotor: boolean;
    useLimits: boolean;
    useSpring: boolean;
    velocity: number;
    angle: number;
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SpringJoint
  //
  export interface SpringJoint {
    spring: number;
    damper: number;
    minDistance: number;
    maxDistance: number;
    tolerance: number;
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.FixedJoint
  //
  export interface FixedJoint {
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CharacterJoint
  //
  export interface CharacterJoint {
    swingAxis: Vector3;
    twistLimitSpring: SoftJointLimitSpring;
    swingLimitSpring: SoftJointLimitSpring;
    lowTwistLimit: SoftJointLimit;
    highTwistLimit: SoftJointLimit;
    swing1Limit: SoftJointLimit;
    swing2Limit: SoftJointLimit;
    enableProjection: boolean;
    projectionDistance: number;
    projectionAngle: number;
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    targetRotation: Quaternion;
    targetAngularVelocity: Vector3;
    rotationDrive: JointDrive;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ConfigurableJoint
  //
  export interface ConfigurableJoint {
    secondaryAxis: Vector3;
    xMotion: ConfigurableJointMotion;
    yMotion: ConfigurableJointMotion;
    zMotion: ConfigurableJointMotion;
    angularXMotion: ConfigurableJointMotion;
    angularYMotion: ConfigurableJointMotion;
    angularZMotion: ConfigurableJointMotion;
    linearLimitSpring: SoftJointLimitSpring;
    angularXLimitSpring: SoftJointLimitSpring;
    angularYZLimitSpring: SoftJointLimitSpring;
    linearLimit: SoftJointLimit;
    lowAngularXLimit: SoftJointLimit;
    highAngularXLimit: SoftJointLimit;
    angularYLimit: SoftJointLimit;
    angularZLimit: SoftJointLimit;
    targetPosition: Vector3;
    targetVelocity: Vector3;
    xDrive: JointDrive;
    yDrive: JointDrive;
    zDrive: JointDrive;
    targetRotation: Quaternion;
    targetAngularVelocity: Vector3;
    rotationDriveMode: RotationDriveMode;
    angularXDrive: JointDrive;
    angularYZDrive: JointDrive;
    slerpDrive: JointDrive;
    projectionMode: JointProjectionMode;
    projectionDistance: number;
    projectionAngle: number;
    configuredInWorldSpace: boolean;
    swapBodies: boolean;
    connectedBody: Rigidbody;
    connectedArticulationBody: ArticulationBody;
    axis: Vector3;
    anchor: Vector3;
    connectedAnchor: Vector3;
    autoConfigureConnectedAnchor: boolean;
    breakForce: number;
    breakTorque: number;
    enableCollision: boolean;
    enablePreprocessing: boolean;
    massScale: number;
    connectedMassScale: number;
    currentForce: Vector3;
    currentTorque: Vector3;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ContactPoint
  //
  export interface ContactPoint {
    point: Vector3;
    normal: Vector3;
    thisCollider: Collider;
    otherCollider: Collider;
    separation: number;
  }
  //
  // Type: UnityEngine.PhysicsScene
  //
  export interface PhysicsScene {
    IsValid: () => boolean;
    IsEmpty: () => boolean;
    Simulate: () => any;
    Raycast: () => boolean;
    CapsuleCast: () => boolean;
    OverlapCapsule: () => number;
    SphereCast: () => boolean;
    OverlapSphere: () => number;
    BoxCast: () => boolean;
    OverlapBox: () => number;
  }
  //
  // Type: UnityEngine.PhysicsSceneExtensions
  //
  export interface PhysicsSceneExtensions {
  }
  //
  // Type: UnityEngine.ArticulationJointType
  //
  export interface ArticulationJointType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ArticulationDofLock
  //
  export interface ArticulationDofLock {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ArticulationDrive
  //
  export interface ArticulationDrive {
    lowerLimit: number;
    upperLimit: number;
    stiffness: number;
    damping: number;
    forceLimit: number;
    target: number;
    targetVelocity: number;
  }
  //
  // Type: UnityEngine.ArticulationReducedSpace
  //
  export interface ArticulationReducedSpace {
    dofCount: number;
  }
  //
  // Type: UnityEngine.ArticulationJacobian
  //
  export interface ArticulationJacobian {
    rows: number;
    columns: number;
    elements: any; // System.Collections.Generic.List`1[System.Single]
  }
  //
  // Type: UnityEngine.ArticulationBody
  //
  export interface ArticulationBody {
    jointType: ArticulationJointType;
    anchorPosition: Vector3;
    parentAnchorPosition: Vector3;
    anchorRotation: Quaternion;
    parentAnchorRotation: Quaternion;
    isRoot: boolean;
    linearLockX: ArticulationDofLock;
    linearLockY: ArticulationDofLock;
    linearLockZ: ArticulationDofLock;
    swingYLock: ArticulationDofLock;
    swingZLock: ArticulationDofLock;
    twistLock: ArticulationDofLock;
    xDrive: ArticulationDrive;
    yDrive: ArticulationDrive;
    zDrive: ArticulationDrive;
    immovable: boolean;
    useGravity: boolean;
    linearDamping: number;
    angularDamping: number;
    jointFriction: number;
    velocity: Vector3;
    angularVelocity: Vector3;
    mass: number;
    centerOfMass: Vector3;
    worldCenterOfMass: Vector3;
    inertiaTensor: Vector3;
    inertiaTensorRotation: Quaternion;
    sleepThreshold: number;
    solverIterations: number;
    solverVelocityIterations: number;
    maxAngularVelocity: number;
    maxLinearVelocity: number;
    maxJointVelocity: number;
    maxDepenetrationVelocity: number;
    jointPosition: ArticulationReducedSpace;
    jointVelocity: ArticulationReducedSpace;
    jointAcceleration: ArticulationReducedSpace;
    jointForce: ArticulationReducedSpace;
    dofCount: number;
    index: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    TeleportRoot: () => any;
    GetClosestPoint: () => Vector3;
    GetRelativePointVelocity: () => Vector3;
    GetPointVelocity: () => Vector3;
    GetDenseJacobian: () => number;
    GetJointPositions: () => number;
    SetJointPositions: () => any;
    GetJointVelocities: () => number;
    SetJointVelocities: () => any;
    GetJointAccelerations: () => number;
    SetJointAccelerations: () => any;
    GetJointForces: () => number;
    SetJointForces: () => any;
    GetDriveTargets: () => number;
    SetDriveTargets: () => any;
    GetDriveTargetVelocities: () => number;
    SetDriveTargetVelocities: () => any;
    GetDofStartIndices: () => number;
    AddForce: () => any;
    AddRelativeForce: () => any;
    AddTorque: () => any;
    AddRelativeTorque: () => any;
    AddForceAtPosition: () => any;
    ResetCenterOfMass: () => any;
    ResetInertiaTensor: () => any;
    Sleep: () => any;
    IsSleeping: () => boolean;
    WakeUp: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Physics
  //
  export interface Physics {
    // static minPenetrationForPenalty: number;
    // static gravity: Vector3;
    // static defaultContactOffset: number;
    // static sleepThreshold: number;
    // static queriesHitTriggers: boolean;
    // static queriesHitBackfaces: boolean;
    // static bounceThreshold: number;
    // static defaultMaxDepenetrationVelocity: number;
    // static defaultSolverIterations: number;
    // static defaultSolverVelocityIterations: number;
    // static bounceTreshold: number;
    // static sleepVelocity: number;
    // static sleepAngularVelocity: number;
    // static maxAngularVelocity: number;
    // static solverIterationCount: number;
    // static solverVelocityIterationCount: number;
    // static penetrationPenaltyForce: number;
    // static defaultMaxAngularSpeed: number;
    // static defaultPhysicsScene: PhysicsScene;
    // static autoSimulation: boolean;
    // static autoSyncTransforms: boolean;
    // static reuseCollisionCallbacks: boolean;
    // static interCollisionDistance: number;
    // static interCollisionStiffness: number;
    // static interCollisionSettingsToggle: boolean;
    // static clothGravity: Vector3;
  }
  //
  // Type: UnityEngine.RaycastCommand
  //
  export interface RaycastCommand {
    from: Vector3;
    direction: Vector3;
    distance: number;
    layerMask: number;
    maxHits: number;
  }
  //
  // Type: UnityEngine.SpherecastCommand
  //
  export interface SpherecastCommand {
    origin: Vector3;
    radius: number;
    direction: Vector3;
    distance: number;
    layerMask: number;
  }
  //
  // Type: UnityEngine.CapsulecastCommand
  //
  export interface CapsulecastCommand {
    point1: Vector3;
    point2: Vector3;
    radius: number;
    direction: Vector3;
    distance: number;
    layerMask: number;
  }
  //
  // Type: UnityEngine.BoxcastCommand
  //
  export interface BoxcastCommand {
    center: Vector3;
    halfExtents: Vector3;
    orientation: Quaternion;
    direction: Vector3;
    distance: number;
    layerMask: number;
  }
  //
  // Type: UnityEngine.PhysicsScene2D
  //
  export interface PhysicsScene2D {
    OverlapArea: () => number;
    OverlapCapsule: () => Collider2D;
    IsValid: () => boolean;
    IsEmpty: () => boolean;
    Simulate: () => boolean;
    Linecast: () => RaycastHit2D;
    Raycast: () => RaycastHit2D;
    CircleCast: () => RaycastHit2D;
    BoxCast: () => RaycastHit2D;
    CapsuleCast: () => RaycastHit2D;
    GetRayIntersection: () => RaycastHit2D;
    OverlapPoint: () => Collider2D;
    OverlapCircle: () => Collider2D;
    OverlapBox: () => Collider2D;
  }
  //
  // Type: UnityEngine.PhysicsSceneExtensions2D
  //
  export interface PhysicsSceneExtensions2D {
  }
  //
  // Type: UnityEngine.Physics2D
  //
  export interface Physics2D {
    // static defaultPhysicsScene: PhysicsScene2D;
    // static velocityIterations: number;
    // static positionIterations: number;
    // static gravity: Vector2;
    // static queriesHitTriggers: boolean;
    // static queriesStartInColliders: boolean;
    // static callbacksOnDisable: boolean;
    // static reuseCollisionCallbacks: boolean;
    // static autoSyncTransforms: boolean;
    // static simulationMode: SimulationMode2D;
    // static jobOptions: PhysicsJobOptions2D;
    // static velocityThreshold: number;
    // static maxLinearCorrection: number;
    // static maxAngularCorrection: number;
    // static maxTranslationSpeed: number;
    // static maxRotationSpeed: number;
    // static defaultContactOffset: number;
    // static baumgarteScale: number;
    // static baumgarteTOIScale: number;
    // static timeToSleep: number;
    // static linearSleepTolerance: number;
    // static angularSleepTolerance: number;
    // static alwaysShowColliders: boolean;
    // static showColliderSleep: boolean;
    // static showColliderContacts: boolean;
    // static showColliderAABB: boolean;
    // static contactArrowScale: number;
    // static colliderAwakeColor: Color;
    // static colliderAsleepColor: Color;
    // static colliderContactColor: Color;
    // static colliderAABBColor: Color;
    // static raycastsHitTriggers: boolean;
    // static raycastsStartInColliders: boolean;
    // static deleteStopsCallbacks: boolean;
    // static changeStopsCallbacks: boolean;
    // static minPenetrationForPenalty: number;
    // static autoSimulation: boolean;
  }
  //
  // Type: UnityEngine.SimulationMode2D
  //
  export interface SimulationMode2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CapsuleDirection2D
  //
  export interface CapsuleDirection2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RigidbodyConstraints2D
  //
  export interface RigidbodyConstraints2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RigidbodyInterpolation2D
  //
  export interface RigidbodyInterpolation2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RigidbodySleepMode2D
  //
  export interface RigidbodySleepMode2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CollisionDetectionMode2D
  //
  export interface CollisionDetectionMode2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RigidbodyType2D
  //
  export interface RigidbodyType2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ForceMode2D
  //
  export interface ForceMode2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.JointLimitState2D
  //
  export interface JointLimitState2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.EffectorSelection2D
  //
  export interface EffectorSelection2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.EffectorForceMode2D
  //
  export interface EffectorForceMode2D {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ColliderDistance2D
  //
  export interface ColliderDistance2D {
    pointA: Vector2;
    pointB: Vector2;
    normal: Vector2;
    distance: number;
    isOverlapped: boolean;
    isValid: boolean;
  }
  //
  // Type: UnityEngine.ContactFilter2D
  //
  export interface ContactFilter2D {
    isFiltering: boolean;
    useTriggers: boolean;
    useLayerMask: boolean;
    useDepth: boolean;
    useOutsideDepth: boolean;
    useNormalAngle: boolean;
    useOutsideNormalAngle: boolean;
    layerMask: LayerMask;
    minDepth: number;
    maxDepth: number;
    minNormalAngle: number;
    maxNormalAngle: number;
    NoFilter: () => ContactFilter2D;
    ClearLayerMask: () => any;
    SetLayerMask: () => any;
    ClearDepth: () => any;
    SetDepth: () => any;
    ClearNormalAngle: () => any;
    SetNormalAngle: () => any;
    IsFilteringTrigger: () => boolean;
    IsFilteringLayerMask: () => boolean;
    IsFilteringDepth: () => boolean;
    IsFilteringNormalAngle: () => boolean;
  }
  //
  // Type: UnityEngine.Collision2D
  //
  export interface Collision2D {
    collider: Collider2D;
    otherCollider: Collider2D;
    rigidbody: Rigidbody2D;
    otherRigidbody: Rigidbody2D;
    transform: Transform;
    gameObject: GameObject;
    relativeVelocity: Vector2;
    enabled: boolean;
    contacts: ContactPoint2D[];
    contactCount: number;
    GetContact: () => ContactPoint2D;
    GetContacts: () => number;
  }
  //
  // Type: UnityEngine.ContactPoint2D
  //
  export interface ContactPoint2D {
    point: Vector2;
    normal: Vector2;
    separation: number;
    normalImpulse: number;
    tangentImpulse: number;
    relativeVelocity: Vector2;
    collider: Collider2D;
    otherCollider: Collider2D;
    rigidbody: Rigidbody2D;
    otherRigidbody: Rigidbody2D;
    enabled: boolean;
  }
  //
  // Type: UnityEngine.JointAngleLimits2D
  //
  export interface JointAngleLimits2D {
    min: number;
    max: number;
  }
  //
  // Type: UnityEngine.JointTranslationLimits2D
  //
  export interface JointTranslationLimits2D {
    min: number;
    max: number;
  }
  //
  // Type: UnityEngine.JointMotor2D
  //
  export interface JointMotor2D {
    motorSpeed: number;
    maxMotorTorque: number;
  }
  //
  // Type: UnityEngine.JointSuspension2D
  //
  export interface JointSuspension2D {
    dampingRatio: number;
    frequency: number;
    angle: number;
  }
  //
  // Type: UnityEngine.RaycastHit2D
  //
  export interface RaycastHit2D {
    centroid: Vector2;
    point: Vector2;
    normal: Vector2;
    distance: number;
    fraction: number;
    collider: Collider2D;
    rigidbody: Rigidbody2D;
    transform: Transform;
    CompareTo: () => number;
  }
  //
  // Type: UnityEngine.PhysicsJobOptions2D
  //
  export interface PhysicsJobOptions2D {
    useMultithreading: boolean;
    useConsistencySorting: boolean;
    interpolationPosesPerJob: number;
    newContactsPerJob: number;
    collideContactsPerJob: number;
    clearFlagsPerJob: number;
    clearBodyForcesPerJob: number;
    syncDiscreteFixturesPerJob: number;
    syncContinuousFixturesPerJob: number;
    findNearestContactsPerJob: number;
    updateTriggerContactsPerJob: number;
    islandSolverCostThreshold: number;
    islandSolverBodyCostScale: number;
    islandSolverContactCostScale: number;
    islandSolverJointCostScale: number;
    islandSolverBodiesPerJob: number;
    islandSolverContactsPerJob: number;
  }
  //
  // Type: UnityEngine.Rigidbody2D
  //
  export interface Rigidbody2D {
    position: Vector2;
    rotation: number;
    velocity: Vector2;
    angularVelocity: number;
    useAutoMass: boolean;
    mass: number;
    sharedMaterial: PhysicsMaterial2D;
    centerOfMass: Vector2;
    worldCenterOfMass: Vector2;
    inertia: number;
    drag: number;
    angularDrag: number;
    gravityScale: number;
    bodyType: RigidbodyType2D;
    useFullKinematicContacts: boolean;
    isKinematic: boolean;
    fixedAngle: boolean;
    freezeRotation: boolean;
    constraints: RigidbodyConstraints2D;
    simulated: boolean;
    interpolation: RigidbodyInterpolation2D;
    sleepMode: RigidbodySleepMode2D;
    collisionDetectionMode: CollisionDetectionMode2D;
    attachedColliderCount: number;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector2;
    AddForce: () => any;
    AddRelativeForce: () => any;
    AddForceAtPosition: () => any;
    AddTorque: () => any;
    GetPoint: () => Vector2;
    GetRelativePoint: () => Vector2;
    GetVector: () => Vector2;
    GetRelativeVector: () => Vector2;
    GetPointVelocity: () => Vector2;
    GetRelativePointVelocity: () => Vector2;
    OverlapCollider: () => number;
    GetContacts: () => number;
    GetAttachedColliders: () => number;
    Cast: () => number;
    SetRotation: () => any;
    MovePosition: () => any;
    MoveRotation: () => any;
    IsSleeping: () => boolean;
    IsAwake: () => boolean;
    Sleep: () => any;
    WakeUp: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Collider2D
  //
  export interface Collider2D {
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CircleCollider2D
  //
  export interface CircleCollider2D {
    radius: number;
    center: Vector2;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CapsuleCollider2D
  //
  export interface CapsuleCollider2D {
    size: Vector2;
    direction: CapsuleDirection2D;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.EdgeCollider2D
  //
  export interface EdgeCollider2D {
    edgeRadius: number;
    edgeCount: number;
    pointCount: number;
    points: Vector2[];
    useAdjacentStartPoint: boolean;
    useAdjacentEndPoint: boolean;
    adjacentStartPoint: Vector2;
    adjacentEndPoint: Vector2;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Reset: () => any;
    GetPoints: () => number;
    SetPoints: () => boolean;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.BoxCollider2D
  //
  export interface BoxCollider2D {
    size: Vector2;
    edgeRadius: number;
    autoTiling: boolean;
    center: Vector2;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PolygonCollider2D
  //
  export interface PolygonCollider2D {
    autoTiling: boolean;
    points: Vector2[];
    pathCount: number;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetTotalPointCount: () => number;
    GetPath: () => Vector2[];
    SetPath: () => any;
    CreatePrimitive: () => any;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CompositeCollider2D
  //
  export interface CompositeCollider2D {
    geometryType: CompositeCollider2D_GeometryType;
    generationType: CompositeCollider2D_GenerationType;
    vertexDistance: number;
    edgeRadius: number;
    offsetDistance: number;
    pathCount: number;
    pointCount: number;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GenerateGeometry: () => any;
    GetPathPointCount: () => number;
    GetPath: () => number;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CompositeCollider2D+GeometryType
  //
  export interface CompositeCollider2D_GeometryType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CompositeCollider2D+GenerationType
  //
  export interface CompositeCollider2D_GenerationType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Joint2D
  //
  export interface Joint2D {
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AnchoredJoint2D
  //
  export interface AnchoredJoint2D {
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SpringJoint2D
  //
  export interface SpringJoint2D {
    autoConfigureDistance: boolean;
    distance: number;
    dampingRatio: number;
    frequency: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.DistanceJoint2D
  //
  export interface DistanceJoint2D {
    autoConfigureDistance: boolean;
    distance: number;
    maxDistanceOnly: boolean;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.FrictionJoint2D
  //
  export interface FrictionJoint2D {
    maxForce: number;
    maxTorque: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.HingeJoint2D
  //
  export interface HingeJoint2D {
    useMotor: boolean;
    useLimits: boolean;
    motor: JointMotor2D;
    limits: JointAngleLimits2D;
    limitState: JointLimitState2D;
    referenceAngle: number;
    jointAngle: number;
    jointSpeed: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMotorTorque: () => number;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.RelativeJoint2D
  //
  export interface RelativeJoint2D {
    maxForce: number;
    maxTorque: number;
    correctionScale: number;
    autoConfigureOffset: boolean;
    linearOffset: Vector2;
    angularOffset: number;
    target: Vector2;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SliderJoint2D
  //
  export interface SliderJoint2D {
    autoConfigureAngle: boolean;
    angle: number;
    useMotor: boolean;
    useLimits: boolean;
    motor: JointMotor2D;
    limits: JointTranslationLimits2D;
    limitState: JointLimitState2D;
    referenceAngle: number;
    jointTranslation: number;
    jointSpeed: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMotorForce: () => number;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.TargetJoint2D
  //
  export interface TargetJoint2D {
    anchor: Vector2;
    target: Vector2;
    autoConfigureTarget: boolean;
    maxForce: number;
    dampingRatio: number;
    frequency: number;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.FixedJoint2D
  //
  export interface FixedJoint2D {
    dampingRatio: number;
    frequency: number;
    referenceAngle: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.WheelJoint2D
  //
  export interface WheelJoint2D {
    suspension: JointSuspension2D;
    useMotor: boolean;
    motor: JointMotor2D;
    jointTranslation: number;
    jointLinearSpeed: number;
    jointSpeed: number;
    jointAngle: number;
    anchor: Vector2;
    connectedAnchor: Vector2;
    autoConfigureConnectedAnchor: boolean;
    attachedRigidbody: Rigidbody2D;
    connectedBody: Rigidbody2D;
    enableCollision: boolean;
    breakForce: number;
    breakTorque: number;
    reactionForce: Vector2;
    reactionTorque: number;
    collideConnected: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMotorTorque: () => number;
    GetReactionForce: () => Vector2;
    GetReactionTorque: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Effector2D
  //
  export interface Effector2D {
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AreaEffector2D
  //
  export interface AreaEffector2D {
    forceAngle: number;
    useGlobalAngle: boolean;
    forceMagnitude: number;
    forceVariation: number;
    drag: number;
    angularDrag: number;
    forceTarget: EffectorSelection2D;
    forceDirection: number;
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.BuoyancyEffector2D
  //
  export interface BuoyancyEffector2D {
    surfaceLevel: number;
    density: number;
    linearDrag: number;
    angularDrag: number;
    flowAngle: number;
    flowMagnitude: number;
    flowVariation: number;
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PointEffector2D
  //
  export interface PointEffector2D {
    forceMagnitude: number;
    forceVariation: number;
    distanceScale: number;
    drag: number;
    angularDrag: number;
    forceSource: EffectorSelection2D;
    forceTarget: EffectorSelection2D;
    forceMode: EffectorForceMode2D;
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PlatformEffector2D
  //
  export interface PlatformEffector2D {
    useOneWay: boolean;
    useOneWayGrouping: boolean;
    useSideFriction: boolean;
    useSideBounce: boolean;
    surfaceArc: number;
    sideArc: number;
    rotationalOffset: number;
    oneWay: boolean;
    sideFriction: boolean;
    sideBounce: boolean;
    sideAngleVariance: number;
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.SurfaceEffector2D
  //
  export interface SurfaceEffector2D {
    speed: number;
    speedVariation: number;
    forceScale: number;
    useContactForce: boolean;
    useFriction: boolean;
    useBounce: boolean;
    useColliderMask: boolean;
    colliderMask: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PhysicsUpdateBehaviour2D
  //
  export interface PhysicsUpdateBehaviour2D {
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ConstantForce2D
  //
  export interface ConstantForce2D {
    force: Vector2;
    relativeForce: Vector2;
    torque: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.PhysicsMaterial2D
  //
  export interface PhysicsMaterial2D {
    bounciness: number;
    friction: number;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ScreenCapture
  //
  export interface ScreenCapture {
  }
  //
  // Type: UnityEngine.ScreenCapture+StereoScreenCaptureMode
  //
  export interface ScreenCapture_StereoScreenCaptureMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SpriteMask
  //
  export interface SpriteMask {
    frontSortingLayerID: number;
    frontSortingOrder: number;
    backSortingLayerID: number;
    backSortingOrder: number;
    alphaCutoff: number;
    sprite: Sprite;
    isCustomRangeActive: boolean;
    spriteSortPoint: SpriteSortPoint;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.StreamingController
  //
  export interface StreamingController {
    streamingMipmapBias: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetPreloading: () => any;
    CancelPreloading: () => any;
    IsPreloading: () => boolean;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ProceduralMaterial
  //
  export interface ProceduralMaterial {
    // static isSupported: boolean;
    // static substanceProcessorUsage: ProceduralProcessorUsage;
    cacheSize: ProceduralCacheSize;
    animationUpdateRate: number;
    isProcessing: boolean;
    isCachedDataAvailable: boolean;
    isLoadTimeGenerated: boolean;
    loadingBehavior: ProceduralLoadingBehavior;
    preset: string;
    isReadable: boolean;
    isFrozen: boolean;
    shader: Shader;
    color: Color;
    mainTexture: Texture;
    mainTextureOffset: Vector2;
    mainTextureScale: Vector2;
    renderQueue: number;
    globalIlluminationFlags: MaterialGlobalIlluminationFlags;
    doubleSidedGI: boolean;
    enableInstancing: boolean;
    passCount: number;
    shaderKeywords: any; // System.String[]
    name: string;
    hideFlags: HideFlags;
    GetProceduralPropertyDescriptions: () => ProceduralPropertyDescription[];
    HasProceduralProperty: () => boolean;
    GetProceduralBoolean: () => boolean;
    IsProceduralPropertyVisible: () => boolean;
    SetProceduralBoolean: () => any;
    GetProceduralFloat: () => number;
    SetProceduralFloat: () => any;
    GetProceduralVector: () => Vector4;
    SetProceduralVector: () => any;
    GetProceduralColor: () => Color;
    SetProceduralColor: () => any;
    GetProceduralEnum: () => number;
    SetProceduralEnum: () => any;
    GetProceduralTexture: () => Texture2D;
    SetProceduralTexture: () => any;
    GetProceduralString: () => string;
    SetProceduralString: () => any;
    IsProceduralPropertyCached: () => boolean;
    CacheProceduralProperty: () => any;
    ClearCache: () => any;
    RebuildTextures: () => any;
    RebuildTexturesImmediately: () => any;
    GetGeneratedTextures: () => Texture[];
    GetGeneratedTexture: () => ProceduralTexture;
    FreezeAndReleaseSourceData: () => any;
    GetFloatArray: () => any;
    GetColorArray: () => Color[];
    GetVectorArray: () => Vector4[];
    GetMatrixArray: () => Matrix4x4[];
    SetTextureOffset: () => any;
    SetTextureScale: () => any;
    GetTextureOffset: () => Vector2;
    GetTextureScale: () => Vector2;
    SetFloat: () => any;
    SetInt: () => any;
    SetColor: () => any;
    SetVector: () => any;
    SetMatrix: () => any;
    SetTexture: () => any;
    SetBuffer: () => any;
    SetConstantBuffer: () => any;
    SetFloatArray: () => any;
    SetColorArray: () => any;
    SetVectorArray: () => any;
    SetMatrixArray: () => any;
    GetFloat: () => number;
    GetInt: () => number;
    GetColor: () => Color;
    GetVector: () => Vector4;
    GetMatrix: () => Matrix4x4;
    GetTexture: () => Texture;
    HasProperty: () => boolean;
    EnableKeyword: () => any;
    DisableKeyword: () => any;
    IsKeywordEnabled: () => boolean;
    SetShaderPassEnabled: () => any;
    GetShaderPassEnabled: () => boolean;
    GetPassName: () => string;
    FindPass: () => number;
    SetOverrideTag: () => any;
    GetTag: () => string;
    Lerp: () => any;
    SetPass: () => boolean;
    CopyPropertiesFromMaterial: () => any;
    ComputeCRC: () => number;
    GetTexturePropertyNames: () => any;
    GetTexturePropertyNameIDs: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.ProceduralProcessorUsage
  //
  export interface ProceduralProcessorUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ProceduralCacheSize
  //
  export interface ProceduralCacheSize {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ProceduralLoadingBehavior
  //
  export interface ProceduralLoadingBehavior {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ProceduralPropertyType
  //
  export interface ProceduralPropertyType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ProceduralOutputType
  //
  export interface ProceduralOutputType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ProceduralPropertyDescription
  //
  export interface ProceduralPropertyDescription {
    name: string;
    label: string;
    group: string;
    type: ProceduralPropertyType;
    hasRange: boolean;
    minimum: number;
    maximum: number;
    step: number;
    enumOptions: any; // System.String[]
    componentLabels: any; // System.String[]
  }
  //
  // Type: UnityEngine.ProceduralTexture
  //
  export interface ProceduralTexture {
    hasAlpha: boolean;
    format: TextureFormat;
    mipmapCount: number;
    graphicsFormat: GraphicsFormat;
    width: number;
    height: number;
    dimension: TextureDimension;
    isReadable: boolean;
    wrapMode: TextureWrapMode;
    wrapModeU: TextureWrapMode;
    wrapModeV: TextureWrapMode;
    wrapModeW: TextureWrapMode;
    filterMode: FilterMode;
    anisoLevel: number;
    mipMapBias: number;
    texelSize: Vector2;
    updateCount: any; // System.UInt32
    imageContentsHash: Hash128;
    name: string;
    hideFlags: HideFlags;
    GetProceduralOutputType: () => ProceduralOutputType;
    GetPixels32: () => Color32[];
    GetNativeTexturePtr: () => any;
    GetNativeTextureID: () => number;
    IncrementUpdateCount: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.IntegratedSubsystem
  //
  export interface IntegratedSubsystem {
    running: boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.IntegratedSubsystemDescriptor
  //
  export interface IntegratedSubsystemDescriptor {
    id: string;
  }
  //
  // Type: UnityEngine.ISubsystem
  //
  export interface ISubsystem {
    running: boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.ISubsystemDescriptor
  //
  export interface ISubsystemDescriptor {
    id: string;
    Create: () => ISubsystem;
  }
  //
  // Type: UnityEngine.Subsystem
  //
  export interface Subsystem {
    running: boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.SubsystemDescriptor
  //
  export interface SubsystemDescriptor {
    id: string;
    subsystemImplementationType: any; // System.Type
  }
  //
  // Type: UnityEngine.SubsystemManager
  //
  export interface SubsystemManager {
  }
  //
  // Type: UnityEngine.TerrainChangedFlags
  //
  export interface TerrainChangedFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TerrainRenderFlags
  //
  export interface TerrainRenderFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Terrain
  //
  export interface Terrain {
    // static heightmapFormat: GraphicsFormat;
    // static heightmapTextureFormat: TextureFormat;
    // static heightmapRenderTextureFormat: RenderTextureFormat;
    // static normalmapFormat: GraphicsFormat;
    // static normalmapTextureFormat: TextureFormat;
    // static normalmapRenderTextureFormat: RenderTextureFormat;
    // static holesFormat: GraphicsFormat;
    // static holesRenderTextureFormat: RenderTextureFormat;
    // static compressedHolesFormat: GraphicsFormat;
    // static compressedHolesTextureFormat: TextureFormat;
    // static activeTerrain: Terrain;
    // static activeTerrains: Terrain[];
    terrainData: TerrainData;
    treeDistance: number;
    treeBillboardDistance: number;
    treeCrossFadeLength: number;
    treeMaximumFullLODCount: number;
    detailObjectDistance: number;
    detailObjectDensity: number;
    heightmapPixelError: number;
    heightmapMaximumLOD: number;
    basemapDistance: number;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    freeUnusedRenderingResources: boolean;
    shadowCastingMode: ShadowCastingMode;
    reflectionProbeUsage: ReflectionProbeUsage;
    materialTemplate: Material;
    drawHeightmap: boolean;
    allowAutoConnect: boolean;
    groupingID: number;
    drawInstanced: boolean;
    normalmapTexture: RenderTexture;
    drawTreesAndFoliage: boolean;
    patchBoundsMultiplier: Vector3;
    treeLODBiasMultiplier: number;
    collectDetailPatches: boolean;
    editorRenderFlags: TerrainRenderFlags;
    bakeLightProbesForTrees: boolean;
    deringLightProbesForTrees: boolean;
    preserveTreePrototypeLayers: boolean;
    leftNeighbor: Terrain;
    rightNeighbor: Terrain;
    topNeighbor: Terrain;
    bottomNeighbor: Terrain;
    renderingLayerMask: any; // System.UInt32
    splatmapDistance: number;
    castShadows: boolean;
    materialType: Terrain_MaterialType;
    legacySpecular: Color;
    legacyShininess: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ApplyDelayedHeightmapModification: () => any;
    GetClosestReflectionProbes: () => any;
    SampleHeight: () => number;
    AddTreeInstance: () => any;
    SetNeighbors: () => any;
    GetPosition: () => Vector3;
    Flush: () => any;
    SetSplatMaterialPropertyBlock: () => any;
    GetSplatMaterialPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Terrain+MaterialType
  //
  export interface Terrain_MaterialType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TerrainExtensions
  //
  export interface TerrainExtensions {
  }
  //
  // Type: UnityEngine.Tree
  //
  export interface Tree {
    data: ScriptableObject;
    hasSpeedTreeWind: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.TreePrototype
  //
  export interface TreePrototype {
    prefab: GameObject;
    bendFactor: number;
    navMeshLod: number;
  }
  //
  // Type: UnityEngine.DetailRenderMode
  //
  export interface DetailRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.DetailPrototype
  //
  export interface DetailPrototype {
    prototype: GameObject;
    prototypeTexture: Texture2D;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    noiseSpread: number;
    bendFactor: number;
    holeEdgePadding: number;
    healthyColor: Color;
    dryColor: Color;
    renderMode: DetailRenderMode;
    usePrototypeMesh: boolean;
    Validate: () => boolean;
  }
  //
  // Type: UnityEngine.SplatPrototype
  //
  export interface SplatPrototype {
    texture: Texture2D;
    normalMap: Texture2D;
    tileSize: Vector2;
    tileOffset: Vector2;
    specular: Color;
    metallic: number;
    smoothness: number;
  }
  //
  // Type: UnityEngine.TreeInstance
  //
  export interface TreeInstance {
    position: Vector3;
    widthScale: number;
    heightScale: number;
    rotation: number;
    color: Color32;
    lightmapColor: Color32;
    prototypeIndex: number;
  }
  //
  // Type: UnityEngine.PatchExtents
  //
  export interface PatchExtents {
    min: number;
    max: number;
  }
  //
  // Type: UnityEngine.TerrainHeightmapSyncControl
  //
  export interface TerrainHeightmapSyncControl {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TerrainData
  //
  export interface TerrainData {
    // static AlphamapTextureName: string;
    // static HolesTextureName: string;
    heightmapWidth: number;
    heightmapHeight: number;
    heightmapTexture: RenderTexture;
    heightmapResolution: number;
    heightmapScale: Vector3;
    holesTexture: Texture;
    enableHolesTextureCompression: boolean;
    holesResolution: number;
    size: Vector3;
    bounds: Bounds;
    thickness: number;
    wavingGrassStrength: number;
    wavingGrassAmount: number;
    wavingGrassSpeed: number;
    wavingGrassTint: Color;
    detailWidth: number;
    detailHeight: number;
    detailPatchCount: number;
    detailResolution: number;
    detailResolutionPerPatch: number;
    detailPrototypes: DetailPrototype[];
    treeInstances: TreeInstance[];
    treeInstanceCount: number;
    treePrototypes: TreePrototype[];
    alphamapLayers: number;
    alphamapResolution: number;
    alphamapWidth: number;
    alphamapHeight: number;
    baseMapResolution: number;
    alphamapTextureCount: number;
    alphamapTextures: Texture2D[];
    splatPrototypes: SplatPrototype[];
    terrainLayers: TerrainLayer[];
    name: string;
    hideFlags: HideFlags;
    GetSupportedLayers: () => any;
    GetDetailLayer: () => any;
    SetDetailLayer: () => any;
    GetClampedDetailPatches: () => Vector2Int[];
    SetTreeInstances: () => any;
    GetTreeInstance: () => TreeInstance;
    SetTreeInstance: () => any;
    GetAlphamaps: () => any;
    SetAlphamaps: () => any;
    SetBaseMapDirty: () => any;
    GetAlphamapTexture: () => Texture2D;
    SetTerrainLayersRegisterUndo: () => any;
    SyncHeightmap: () => any;
    CopyActiveRenderTextureToHeightmap: () => any;
    DirtyHeightmapRegion: () => any;
    CopyActiveRenderTextureToTexture: () => any;
    DirtyTextureRegion: () => any;
    SyncTexture: () => any;
    UpdateDirtyRegion: () => any;
    GetHeight: () => number;
    GetInterpolatedHeight: () => number;
    GetInterpolatedHeights: () => any;
    GetHeights: () => any;
    SetHeights: () => any;
    GetPatchMinMaxHeights: () => PatchExtents[];
    OverrideMinMaxPatchHeights: () => any;
    GetMaximumHeightError: () => any;
    OverrideMaximumHeightError: () => any;
    SetHeightsDelayLOD: () => any;
    IsHole: () => boolean;
    GetHoles: () => any;
    SetHoles: () => any;
    SetHolesDelayLOD: () => any;
    GetSteepness: () => number;
    GetInterpolatedNormal: () => Vector3;
    SetDetailResolution: () => any;
    RefreshPrototypes: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.TerrainLayer
  //
  export interface TerrainLayer {
    diffuseTexture: Texture2D;
    normalMapTexture: Texture2D;
    maskMapTexture: Texture2D;
    tileSize: Vector2;
    tileOffset: Vector2;
    specular: Color;
    metallic: number;
    smoothness: number;
    normalScale: number;
    diffuseRemapMin: Vector4;
    diffuseRemapMax: Vector4;
    maskMapRemapMin: Vector4;
    maskMapRemapMax: Vector4;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.TerrainCollider
  //
  export interface TerrainCollider {
    terrainData: TerrainData;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.FontStyle
  //
  export interface FontStyle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GUIText
  //
  export interface GUIText {
    text: boolean;
    material: Material;
    font: Font;
    alignment: TextAlignment;
    anchor: TextAnchor;
    lineSpacing: number;
    tabSize: number;
    fontSize: number;
    fontStyle: FontStyle;
    richText: boolean;
    color: Color;
    pixelOffset: Vector2;
  }
  //
  // Type: UnityEngine.TextGenerationSettings
  //
  export interface TextGenerationSettings {
    font: Font;
    color: Color;
    fontSize: number;
    lineSpacing: number;
    richText: boolean;
    scaleFactor: number;
    fontStyle: FontStyle;
    textAnchor: TextAnchor;
    alignByGeometry: boolean;
    resizeTextForBestFit: boolean;
    resizeTextMinSize: number;
    resizeTextMaxSize: number;
    updateBounds: boolean;
    verticalOverflow: VerticalWrapMode;
    horizontalOverflow: HorizontalWrapMode;
    generationExtents: Vector2;
    pivot: Vector2;
    generateOutOfBounds: boolean;
  }
  //
  // Type: UnityEngine.TextGenerator
  //
  export interface TextGenerator {
    characterCountVisible: number;
    verts: any; // System.Collections.Generic.IList`1[UnityEngine.UIVertex]
    characters: any; // System.Collections.Generic.IList`1[UnityEngine.UICharInfo]
    lines: any; // System.Collections.Generic.IList`1[UnityEngine.UILineInfo]
    rectExtents: Rect;
    vertexCount: number;
    characterCount: number;
    lineCount: number;
    fontSizeUsedForBestFit: number;
    Invalidate: () => any;
    GetCharacters: () => any;
    GetLines: () => any;
    GetVertices: () => any;
    GetPreferredWidth: () => number;
    GetPreferredHeight: () => number;
    PopulateWithErrors: () => boolean;
    Populate: () => boolean;
    GetVerticesArray: () => UIVertex[];
    GetCharactersArray: () => UICharInfo[];
    GetLinesArray: () => UILineInfo[];
  }
  //
  // Type: UnityEngine.TextAlignment
  //
  export interface TextAlignment {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextAnchor
  //
  export interface TextAnchor {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.HorizontalWrapMode
  //
  export interface HorizontalWrapMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.VerticalWrapMode
  //
  export interface VerticalWrapMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextMesh
  //
  export interface TextMesh {
    text: string;
    font: Font;
    fontSize: number;
    fontStyle: FontStyle;
    offsetZ: number;
    alignment: TextAlignment;
    anchor: TextAnchor;
    characterSize: number;
    lineSpacing: number;
    tabSize: number;
    richText: boolean;
    color: Color;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CharacterInfo
  //
  export interface CharacterInfo {
    advance: number;
    glyphWidth: number;
    glyphHeight: number;
    bearing: number;
    minY: number;
    maxY: number;
    minX: number;
    maxX: number;
    uvBottomLeft: Vector2;
    uvBottomRight: Vector2;
    uvTopRight: Vector2;
    uvTopLeft: Vector2;
    index: number;
    uv: Rect;
    vert: Rect;
    width: number;
    size: number;
    style: FontStyle;
    flipped: boolean;
  }
  //
  // Type: UnityEngine.UICharInfo
  //
  export interface UICharInfo {
    cursorPos: Vector2;
    charWidth: number;
  }
  //
  // Type: UnityEngine.UILineInfo
  //
  export interface UILineInfo {
    startCharIdx: number;
    height: number;
    topY: number;
    leading: number;
  }
  //
  // Type: UnityEngine.UIVertex
  //
  export interface UIVertex {
    position: Vector3;
    normal: Vector3;
    tangent: Vector4;
    color: Color32;
    uv0: Vector4;
    uv1: Vector4;
    uv2: Vector4;
    uv3: Vector4;
  }
  //
  // Type: UnityEngine.Font
  //
  export interface Font {
    material: Material;
    fontNames: any; // System.String[]
    dynamic: boolean;
    ascent: number;
    fontSize: number;
    characterInfo: CharacterInfo[];
    lineHeight: number;
    textureRebuildCallback: Font_FontTextureRebuildCallback;
    name: string;
    hideFlags: HideFlags;
    HasCharacter: () => boolean;
    GetCharacterInfo: () => boolean;
    RequestCharactersInTexture: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Font+FontTextureRebuildCallback
  //
  export interface Font_FontTextureRebuildCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.GridBrushBase
  //
  export interface GridBrushBase {
    name: string;
    hideFlags: HideFlags;
    Paint: () => any;
    Erase: () => any;
    BoxFill: () => any;
    BoxErase: () => any;
    Select: () => any;
    FloodFill: () => any;
    Rotate: () => any;
    Flip: () => any;
    Pick: () => any;
    Move: () => any;
    MoveStart: () => any;
    MoveEnd: () => any;
    ChangeZPosition: () => any;
    ResetZPosition: () => any;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.GridBrushBase+Tool
  //
  export interface GridBrushBase_Tool {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GridBrushBase+RotationDirection
  //
  export interface GridBrushBase_RotationDirection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GridBrushBase+FlipAxis
  //
  export interface GridBrushBase_FlipAxis {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.ICanvasRaycastFilter
  //
  export interface ICanvasRaycastFilter {
    IsRaycastLocationValid: () => boolean;
  }
  //
  // Type: UnityEngine.CanvasGroup
  //
  export interface CanvasGroup {
    alpha: number;
    interactable: boolean;
    blocksRaycasts: boolean;
    ignoreParentGroups: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    IsRaycastLocationValid: () => boolean;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CanvasRenderer
  //
  export interface CanvasRenderer {
    hasPopInstruction: boolean;
    materialCount: number;
    popMaterialCount: number;
    absoluteDepth: number;
    hasMoved: boolean;
    cullTransparentMesh: boolean;
    hasRectClipping: boolean;
    relativeDepth: number;
    cull: boolean;
    isMask: boolean;
    clippingSoftness: Vector2;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetColor: () => any;
    GetColor: () => Color;
    EnableRectClipping: () => any;
    DisableRectClipping: () => any;
    SetMaterial: () => any;
    GetMaterial: () => Material;
    SetPopMaterial: () => any;
    GetPopMaterial: () => Material;
    SetTexture: () => any;
    SetAlphaTexture: () => any;
    SetMesh: () => any;
    Clear: () => any;
    GetAlpha: () => number;
    SetAlpha: () => any;
    GetInheritedAlpha: () => number;
    SetVertices: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.CanvasRenderer+OnRequestRebuild
  //
  export interface CanvasRenderer_OnRequestRebuild {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.RectTransformUtility
  //
  export interface RectTransformUtility {
  }
  //
  // Type: UnityEngine.RenderMode
  //
  export interface RenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AdditionalCanvasShaderChannels
  //
  export interface AdditionalCanvasShaderChannels {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Canvas
  //
  export interface Canvas {
    renderMode: RenderMode;
    isRootCanvas: boolean;
    pixelRect: Rect;
    scaleFactor: number;
    referencePixelsPerUnit: number;
    overridePixelPerfect: boolean;
    pixelPerfect: boolean;
    planeDistance: number;
    renderOrder: number;
    overrideSorting: boolean;
    sortingOrder: number;
    targetDisplay: number;
    sortingLayerID: number;
    cachedSortingLayerValue: number;
    additionalShaderChannels: AdditionalCanvasShaderChannels;
    sortingLayerName: string;
    rootCanvas: Canvas;
    worldCamera: Camera;
    normalizedSortingGridSize: number;
    sortingGridNormalizedSize: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Canvas+WillRenderCanvases
  //
  export interface Canvas_WillRenderCanvases {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.UISystemProfilerApi
  //
  export interface UISystemProfilerApi {
  }
  //
  // Type: UnityEngine.UISystemProfilerApi+SampleType
  //
  export interface UISystemProfilerApi_SampleType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WWWForm
  //
  export interface WWWForm {
    headers: any; // System.Collections.Generic.Dictionary`2[System.String,System.String]
    data: any; // System.Byte[]
    AddField: () => any;
    AddBinaryData: () => any;
  }
  //
  // Type: UnityEngine.WheelHit
  //
  export interface WheelHit {
    collider: Collider;
    point: Vector3;
    normal: Vector3;
    forwardDir: Vector3;
    sidewaysDir: Vector3;
    force: number;
    forwardSlip: number;
    sidewaysSlip: number;
  }
  //
  // Type: UnityEngine.WheelCollider
  //
  export interface WheelCollider {
    center: Vector3;
    radius: number;
    suspensionDistance: number;
    suspensionSpring: JointSpring;
    suspensionExpansionLimited: boolean;
    forceAppPointDistance: number;
    mass: number;
    wheelDampingRate: number;
    forwardFriction: WheelFrictionCurve;
    sidewaysFriction: WheelFrictionCurve;
    motorTorque: number;
    brakeTorque: number;
    steerAngle: number;
    isGrounded: boolean;
    rpm: number;
    sprungMass: number;
    enabled: boolean;
    attachedRigidbody: Rigidbody;
    attachedArticulationBody: ArticulationBody;
    isTrigger: boolean;
    contactOffset: number;
    bounds: Bounds;
    sharedMaterial: PhysicMaterial;
    material: PhysicMaterial;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ResetSprungMasses: () => any;
    ConfigureVehicleSubsteps: () => any;
    GetWorldPose: () => any;
    GetGroundHit: () => boolean;
    ClosestPoint: () => Vector3;
    Raycast: () => boolean;
    ClosestPointOnBounds: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.WindZoneMode
  //
  export interface WindZoneMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WindZone
  //
  export interface WindZone {
    mode: WindZoneMode;
    radius: number;
    windMain: number;
    windTurbulence: number;
    windPulseMagnitude: number;
    windPulseFrequency: number;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AssetBundleLoadResult
  //
  export interface AssetBundleLoadResult {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AssetBundle
  //
  export interface AssetBundle {
    mainAsset: Object;
    isStreamedSceneAssetBundle: boolean;
    name: string;
    hideFlags: HideFlags;
    Contains: () => boolean;
    Load: () => Object;
    LoadAll: () => Object[];
    LoadAsset: () => Object;
    LoadAssetAsync: () => AssetBundleRequest;
    LoadAssetWithSubAssets: () => Object[];
    LoadAssetWithSubAssetsAsync: () => AssetBundleRequest;
    LoadAllAssets: () => Object[];
    LoadAllAssetsAsync: () => AssetBundleRequest;
    AllAssetNames: () => any;
    Unload: () => any;
    GetAllAssetNames: () => any;
    GetAllScenePaths: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AssetBundleCreateRequest
  //
  export interface AssetBundleCreateRequest {
    assetBundle: AssetBundle;
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.AssetBundleManifest
  //
  export interface AssetBundleManifest {
    name: string;
    hideFlags: HideFlags;
    GetAllAssetBundles: () => any;
    GetAllAssetBundlesWithVariant: () => any;
    GetAssetBundleHash: () => Hash128;
    GetDirectDependencies: () => any;
    GetAllDependencies: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AssetBundleRecompressOperation
  //
  export interface AssetBundleRecompressOperation {
    humanReadableResult: string;
    inputPath: string;
    outputPath: string;
    result: AssetBundleLoadResult;
    success: boolean;
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.AssetBundleRequest
  //
  export interface AssetBundleRequest {
    asset: Object;
    allAssets: Object[];
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.CompressionType
  //
  export interface CompressionType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.CompressionLevel
  //
  export interface CompressionLevel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.BuildCompression
  //
  export interface BuildCompression {
    compression: CompressionType;
    level: CompressionLevel;
    blockSize: any; // System.UInt32
  }
  //
  // Type: UnityEngine.ClothSphereColliderPair
  //
  export interface ClothSphereColliderPair {
    first: SphereCollider;
    second: SphereCollider;
  }
  //
  // Type: UnityEngine.ClothSkinningCoefficient
  //
  export interface ClothSkinningCoefficient {
    maxDistance: number;
    collisionSphereDistance: number;
  }
  //
  // Type: UnityEngine.Cloth
  //
  export interface Cloth {
    vertices: Vector3[];
    normals: Vector3[];
    coefficients: ClothSkinningCoefficient[];
    capsuleColliders: CapsuleCollider[];
    sphereColliders: ClothSphereColliderPair[];
    sleepThreshold: number;
    bendingStiffness: number;
    stretchingStiffness: number;
    damping: number;
    externalAcceleration: Vector3;
    randomAcceleration: Vector3;
    useGravity: boolean;
    enabled: boolean;
    friction: number;
    collisionMassScale: number;
    enableContinuousCollision: boolean;
    useVirtualParticles: number;
    worldVelocityScale: number;
    worldAccelerationScale: number;
    clothSolverFrequency: number;
    solverFrequency: boolean;
    useTethers: boolean;
    stiffnessFrequency: number;
    selfCollisionDistance: number;
    selfCollisionStiffness: number;
    useContinuousCollision: number;
    selfCollision: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ClearTransformMotion: () => any;
    GetSelfAndInterCollisionIndices: () => any;
    SetSelfAndInterCollisionIndices: () => any;
    GetVirtualParticleIndices: () => any;
    SetVirtualParticleIndices: () => any;
    GetVirtualParticleWeights: () => any;
    SetVirtualParticleWeights: () => any;
    SetEnabledFading: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Social
  //
  export interface Social {
    // static Active: ISocialPlatform;
    // static localUser: ILocalUser;
  }
  //
  // Type: UnityEngine.Event
  //
  export interface Event {
    // static current: Event;
    rawType: EventType;
    mousePosition: Vector2;
    delta: Vector2;
    pointerType: PointerType;
    button: number;
    modifiers: EventModifiers;
    pressure: number;
    clickCount: number;
    character: any; // System.Char
    keyCode: KeyCode;
    displayIndex: number;
    type: EventType;
    commandName: string;
    mouseRay: Ray;
    shift: boolean;
    control: boolean;
    alt: boolean;
    command: boolean;
    capsLock: boolean;
    numeric: boolean;
    functionKey: boolean;
    isKey: boolean;
    isMouse: boolean;
    isScrollWheel: boolean;
    GetTypeForControl: () => EventType;
    Use: () => any;
  }
  //
  // Type: UnityEngine.EventType
  //
  export interface EventType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.EventModifiers
  //
  export interface EventModifiers {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.PointerType
  //
  export interface PointerType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GUI
  //
  export interface GUI {
    // static color: Color;
    // static backgroundColor: Color;
    // static contentColor: Color;
    // static changed: boolean;
    // static enabled: boolean;
    // static depth: number;
    // static skin: GUISkin;
    // static matrix: Matrix4x4;
    // static tooltip: string;
  }
  //
  // Type: UnityEngine.GUI+ToolbarButtonSize
  //
  export interface GUI_ToolbarButtonSize {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GUI+WindowFunction
  //
  export interface GUI_WindowFunction {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.GUI+Scope
  //
  export interface GUI_Scope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUI+GroupScope
  //
  export interface GUI_GroupScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUI+ScrollViewScope
  //
  export interface GUI_ScrollViewScope {
    scrollPosition: Vector2;
    handleScrollWheel: boolean;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUI+ClipScope
  //
  export interface GUI_ClipScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUIContent
  //
  export interface GUIContent {
    text: string;
    image: Texture;
    tooltip: string;
  }
  //
  // Type: UnityEngine.GUIElement
  //
  export interface GUIElement {
    HitTest: () => boolean;
    GetScreenRect: () => Rect;
  }
  //
  // Type: UnityEngine.ScaleMode
  //
  export interface ScaleMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.FocusType
  //
  export interface FocusType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GUILayer
  //
  export interface GUILayer {
    HitTest: () => GUIElement;
  }
  //
  // Type: UnityEngine.GUILayout
  //
  export interface GUILayout {
  }
  //
  // Type: UnityEngine.GUILayout+HorizontalScope
  //
  export interface GUILayout_HorizontalScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUILayout+VerticalScope
  //
  export interface GUILayout_VerticalScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUILayout+AreaScope
  //
  export interface GUILayout_AreaScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUILayout+ScrollViewScope
  //
  export interface GUILayout_ScrollViewScope {
    scrollPosition: Vector2;
    handleScrollWheel: boolean;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.GUILayoutOption
  //
  export interface GUILayoutOption {
  }
  //
  // Type: UnityEngine.GUILayoutUtility
  //
  export interface GUILayoutUtility {
  }
  //
  // Type: UnityEngine.GUISettings
  //
  export interface GUISettings {
    doubleClickSelectsWord: boolean;
    tripleClickSelectsLine: boolean;
    cursorColor: Color;
    cursorFlashSpeed: number;
    selectionColor: Color;
  }
  //
  // Type: UnityEngine.GUISkin
  //
  export interface GUISkin {
    font: Font;
    box: GUIStyle;
    label: GUIStyle;
    textField: GUIStyle;
    textArea: GUIStyle;
    button: GUIStyle;
    toggle: GUIStyle;
    window: GUIStyle;
    horizontalSlider: GUIStyle;
    horizontalSliderThumb: GUIStyle;
    verticalSlider: GUIStyle;
    verticalSliderThumb: GUIStyle;
    horizontalScrollbar: GUIStyle;
    horizontalScrollbarThumb: GUIStyle;
    horizontalScrollbarLeftButton: GUIStyle;
    horizontalScrollbarRightButton: GUIStyle;
    verticalScrollbar: GUIStyle;
    verticalScrollbarThumb: GUIStyle;
    verticalScrollbarUpButton: GUIStyle;
    verticalScrollbarDownButton: GUIStyle;
    scrollView: GUIStyle;
    customStyles: GUIStyle[];
    settings: GUISettings;
    name: string;
    hideFlags: HideFlags;
    GetStyle: () => GUIStyle;
    FindStyle: () => GUIStyle;
    GetEnumerator: () => any;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.GUIStyleState
  //
  export interface GUIStyleState {
    background: Texture2D;
    textColor: Color;
    scaledBackgrounds: Texture2D[];
  }
  //
  // Type: UnityEngine.GUIStyle
  //
  export interface GUIStyle {
    // static none: GUIStyle;
    font: Font;
    imagePosition: ImagePosition;
    alignment: TextAnchor;
    wordWrap: boolean;
    clipping: TextClipping;
    contentOffset: Vector2;
    fixedWidth: number;
    fixedHeight: number;
    stretchWidth: boolean;
    stretchHeight: boolean;
    fontSize: number;
    fontStyle: FontStyle;
    richText: boolean;
    clipOffset: Vector2;
    name: string;
    normal: GUIStyleState;
    hover: GUIStyleState;
    active: GUIStyleState;
    onNormal: GUIStyleState;
    onHover: GUIStyleState;
    onActive: GUIStyleState;
    focused: GUIStyleState;
    onFocused: GUIStyleState;
    border: RectOffset;
    margin: RectOffset;
    padding: RectOffset;
    overflow: RectOffset;
    lineHeight: number;
    isHeightDependantOnWidth: boolean;
    Draw: () => any;
    DrawCursor: () => any;
    DrawWithTextSelection: () => any;
    GetCursorPixelPosition: () => Vector2;
    GetCursorStringIndex: () => number;
    CalcSize: () => Vector2;
    CalcScreenSize: () => Vector2;
    CalcHeight: () => number;
    CalcMinMaxWidth: () => any;
  }
  //
  // Type: UnityEngine.ImagePosition
  //
  export interface ImagePosition {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextClipping
  //
  export interface TextClipping {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.GUITexture
  //
  export interface GUITexture {
    color: Color;
    texture: Texture;
    pixelInset: Rect;
    border: RectOffset;
  }
  //
  // Type: UnityEngine.GUIUtility
  //
  export interface GUIUtility {
    // static hasModalWindow: boolean;
    // static systemCopyBuffer: string;
    // static hotControl: number;
    // static keyboardControl: number;
  }
  //
  // Type: UnityEngine.ExitGUIException
  //
  export interface ExitGUIException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.TextEditor
  //
  export interface TextEditor {
    content: GUIContent;
    text: string;
    position: Rect;
    cursorIndex: number;
    selectIndex: number;
    doubleClickSnapping: TextEditor_DblClickSnapping;
    altCursorPosition: number;
    hasSelection: boolean;
    SelectedText: string;
    keyboardOnScreen: TouchScreenKeyboard;
    controlID: number;
    style: GUIStyle;
    multiline: boolean;
    hasHorizontalCursorPos: boolean;
    isPasswordField: boolean;
    scrollOffset: Vector2;
    graphicalCursorPos: Vector2;
    graphicalSelectCursorPos: Vector2;
    UpdateScrollOffsetIfNeeded: () => any;
    DrawCursor: () => any;
    SaveBackup: () => any;
    Undo: () => any;
    Cut: () => boolean;
    Copy: () => any;
    Paste: () => boolean;
    DetectFocusChange: () => any;
    OnFocus: () => any;
    OnLostFocus: () => any;
    HandleKeyEvent: () => boolean;
    DeleteLineBack: () => boolean;
    DeleteWordBack: () => boolean;
    DeleteWordForward: () => boolean;
    Delete: () => boolean;
    CanPaste: () => boolean;
    Backspace: () => boolean;
    SelectAll: () => any;
    SelectNone: () => any;
    DeleteSelection: () => boolean;
    ReplaceSelection: () => any;
    Insert: () => any;
    MoveSelectionToAltCursor: () => any;
    MoveRight: () => any;
    MoveLeft: () => any;
    MoveUp: () => any;
    MoveDown: () => any;
    MoveLineStart: () => any;
    MoveLineEnd: () => any;
    MoveGraphicalLineStart: () => any;
    MoveGraphicalLineEnd: () => any;
    MoveTextStart: () => any;
    MoveTextEnd: () => any;
    MoveParagraphForward: () => any;
    MoveParagraphBackward: () => any;
    MoveCursorToPosition: () => any;
    MoveAltCursorToPosition: () => any;
    IsOverSelection: () => boolean;
    SelectToPosition: () => any;
    SelectLeft: () => any;
    SelectRight: () => any;
    SelectUp: () => any;
    SelectDown: () => any;
    SelectTextEnd: () => any;
    SelectTextStart: () => any;
    MouseDragSelectsWholeWords: () => any;
    DblClickSnap: () => any;
    MoveWordRight: () => any;
    MoveToStartOfNextWord: () => any;
    MoveToEndOfPreviousWord: () => any;
    SelectToStartOfNextWord: () => any;
    SelectToEndOfPreviousWord: () => any;
    FindStartOfNextWord: () => number;
    MoveWordLeft: () => any;
    SelectWordRight: () => any;
    SelectWordLeft: () => any;
    ExpandSelectGraphicalLineStart: () => any;
    ExpandSelectGraphicalLineEnd: () => any;
    SelectGraphicalLineStart: () => any;
    SelectGraphicalLineEnd: () => any;
    SelectParagraphForward: () => any;
    SelectParagraphBackward: () => any;
    SelectCurrentWord: () => any;
    SelectCurrentParagraph: () => any;
  }
  //
  // Type: UnityEngine.TextEditor+DblClickSnapping
  //
  export interface TextEditor_DblClickSnapping {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.RemoteSettings
  //
  export interface RemoteSettings {
  }
  //
  // Type: UnityEngine.RemoteSettings+UpdatedEventHandler
  //
  export interface RemoteSettings_UpdatedEventHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.RemoteConfigSettings
  //
  export interface RemoteConfigSettings {
    Dispose: () => any;
    ForceUpdate: () => any;
    WasLastUpdatedFromServer: () => boolean;
    GetInt: () => number;
    GetLong: () => any;
    GetFloat: () => number;
    GetString: () => string;
    GetBool: () => boolean;
    HasKey: () => boolean;
    GetCount: () => number;
    GetKeys: () => any;
    GetObject: () => any;
    GetDictionary: () => any;
  }
  //
  // Type: UnityEngine.WWW
  //
  export interface WWW {
    assetBundle: AssetBundle;
    audioClip: Object;
    bytes: any; // System.Byte[]
    movie: Object;
    size: number;
    bytesDownloaded: number;
    error: string;
    isDone: boolean;
    oggVorbis: Object;
    progress: number;
    responseHeaders: any; // System.Collections.Generic.Dictionary`2[System.String,System.String]
    data: string;
    text: string;
    texture: Texture2D;
    textureNonReadable: Texture2D;
    threadPriority: ThreadPriority;
    uploadProgress: number;
    url: string;
    keepWaiting: boolean;
    Current: any; // System.Object
    LoadImageIntoTexture: () => any;
    Dispose: () => any;
    GetAudioClip: () => AudioClip;
    GetAudioClipCompressed: () => AudioClip;
    GetMovieTexture: () => MovieTexture;
    MoveNext: () => boolean;
    Reset: () => any;
  }
  //
  // Type: UnityEngine.WWWAudioExtensions
  //
  export interface WWWAudioExtensions {
  }
  //
  // Type: UnityEngine.CrashReportHandler.CrashReportHandler
  //
  export interface CrashReportHandler {
    // static enableCaptureExceptions: boolean;
    // static logBufferSize: any; // System.UInt32
  }
  //
  // Type: UnityEngine.XR.InputTracking
  //
  export interface InputTracking {
    // static disablePositionalTracking: boolean;
  }
  //
  // Type: UnityEngine.XR.XRNode
  //
  export interface XRNode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRNodeState
  //
  export interface XRNodeState {
    uniqueID: any; // System.UInt64
    nodeType: XRNode;
    tracked: boolean;
    position: Vector3;
    rotation: Quaternion;
    velocity: Vector3;
    angularVelocity: Vector3;
    acceleration: Vector3;
    angularAcceleration: Vector3;
    TryGetPosition: () => boolean;
    TryGetRotation: () => boolean;
    TryGetVelocity: () => boolean;
    TryGetAngularVelocity: () => boolean;
    TryGetAcceleration: () => boolean;
    TryGetAngularAcceleration: () => boolean;
  }
  //
  // Type: UnityEngine.XR.HapticCapabilities
  //
  export interface HapticCapabilities {
    numChannels: any; // System.UInt32
    supportsImpulse: boolean;
    supportsBuffer: boolean;
    bufferFrequencyHz: any; // System.UInt32
    bufferMaxSize: any; // System.UInt32
    bufferOptimalSize: any; // System.UInt32
  }
  //
  // Type: UnityEngine.XR.InputDeviceRole
  //
  export interface InputDeviceRole {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.InputDeviceCharacteristics
  //
  export interface InputDeviceCharacteristics {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.InputTrackingState
  //
  export interface InputTrackingState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.InputFeatureUsage
  //
  export interface InputFeatureUsage {
    name: string;
    type: any; // System.Type
    As: () => any;
  }
  //
  // Type: UnityEngine.XR.CommonUsages
  //
  export interface CommonUsages {
  }
  //
  // Type: UnityEngine.XR.InputDevice
  //
  export interface InputDevice {
    subsystem: XRInputSubsystem;
    isValid: boolean;
    name: string;
    role: InputDeviceRole;
    manufacturer: string;
    serialNumber: string;
    characteristics: InputDeviceCharacteristics;
    SendHapticImpulse: () => boolean;
    SendHapticBuffer: () => boolean;
    TryGetHapticCapabilities: () => boolean;
    StopHaptics: () => any;
    TryGetFeatureUsages: () => boolean;
    TryGetFeatureValue: () => boolean;
  }
  //
  // Type: UnityEngine.XR.HandFinger
  //
  export interface HandFinger {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.Hand
  //
  export interface Hand {
    TryGetRootBone: () => boolean;
    TryGetFingerBones: () => boolean;
  }
  //
  // Type: UnityEngine.XR.Eyes
  //
  export interface Eyes {
    TryGetLeftEyePosition: () => boolean;
    TryGetRightEyePosition: () => boolean;
    TryGetLeftEyeRotation: () => boolean;
    TryGetRightEyeRotation: () => boolean;
    TryGetFixationPoint: () => boolean;
    TryGetLeftEyeOpenAmount: () => boolean;
    TryGetRightEyeOpenAmount: () => boolean;
  }
  //
  // Type: UnityEngine.XR.Bone
  //
  export interface Bone {
    TryGetPosition: () => boolean;
    TryGetRotation: () => boolean;
    TryGetParentBone: () => boolean;
    TryGetChildBones: () => boolean;
  }
  //
  // Type: UnityEngine.XR.InputDevices
  //
  export interface InputDevices {
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem
  //
  export interface XRDisplaySubsystem {
    singlePassRenderingDisabled: boolean;
    displayOpaque: boolean;
    contentProtectionEnabled: boolean;
    scaleOfAllViewports: number;
    scaleOfAllRenderTargets: number;
    zNear: number;
    zFar: number;
    sRGB: boolean;
    textureLayout: XRDisplaySubsystem_TextureLayout;
    supportedTextureLayouts: XRDisplaySubsystem_TextureLayout;
    reprojectionMode: XRDisplaySubsystem_ReprojectionMode;
    disableLegacyRenderer: boolean;
    subsystemDescriptor: XRDisplaySubsystemDescriptor;
    SubsystemDescriptor: XRDisplaySubsystemDescriptor;
    running: boolean;
    SetFocusPlane: () => any;
    SetMSAALevel: () => any;
    GetRenderPassCount: () => number;
    GetRenderPass: () => any;
    GetCullingParameters: () => any;
    TryGetAppGPUTimeLastFrame: () => boolean;
    TryGetCompositorGPUTimeLastFrame: () => boolean;
    TryGetDroppedFrameCount: () => boolean;
    TryGetFramePresentCount: () => boolean;
    TryGetDisplayRefreshRate: () => boolean;
    TryGetMotionToPhoton: () => boolean;
    GetRenderTextureForRenderPass: () => RenderTexture;
    GetPreferredMirrorBlitMode: () => number;
    SetPreferredMirrorBlitMode: () => any;
    GetMirrorViewBlitDesc: () => boolean;
    AddGraphicsThreadMirrorViewBlit: () => boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+TextureLayout
  //
  export interface XRDisplaySubsystem_TextureLayout {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+ReprojectionMode
  //
  export interface XRDisplaySubsystem_ReprojectionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+XRRenderParameter
  //
  export interface XRDisplaySubsystem_XRRenderParameter {
    view: Matrix4x4;
    projection: Matrix4x4;
    viewport: Rect;
    occlusionMesh: Mesh;
    textureArraySlice: number;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+XRRenderPass
  //
  export interface XRDisplaySubsystem_XRRenderPass {
    renderPassIndex: number;
    renderTarget: RenderTargetIdentifier;
    renderTargetDesc: RenderTextureDescriptor;
    shouldFillOutDepth: boolean;
    cullingPassIndex: number;
    GetRenderParameter: () => any;
    GetRenderParameterCount: () => number;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+XRBlitParams
  //
  export interface XRDisplaySubsystem_XRBlitParams {
    srcTex: RenderTexture;
    srcTexArraySlice: number;
    srcRect: Rect;
    destRect: Rect;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystem+XRMirrorViewBlitDesc
  //
  export interface XRDisplaySubsystem_XRMirrorViewBlitDesc {
    nativeBlitAvailable: boolean;
    nativeBlitInvalidStates: boolean;
    blitParamsCount: number;
    GetBlitParameter: () => any;
  }
  //
  // Type: UnityEngine.XR.XRMirrorViewBlitMode
  //
  export interface XRMirrorViewBlitMode {
  }
  //
  // Type: UnityEngine.XR.XRMirrorViewBlitModeDesc
  //
  export interface XRMirrorViewBlitModeDesc {
    blitMode: number;
    blitModeDesc: string;
  }
  //
  // Type: UnityEngine.XR.XRDisplaySubsystemDescriptor
  //
  export interface XRDisplaySubsystemDescriptor {
    disablesLegacyVr: boolean;
    enableBackBufferMSAA: boolean;
    id: string;
    GetAvailableMirrorBlitModeCount: () => number;
    GetMirrorBlitModeByIndex: () => any;
    Create: () => XRDisplaySubsystem;
  }
  //
  // Type: UnityEngine.XR.TrackingOriginModeFlags
  //
  export interface TrackingOriginModeFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRInputSubsystem
  //
  export interface XRInputSubsystem {
    subsystemDescriptor: XRInputSubsystemDescriptor;
    SubsystemDescriptor: XRInputSubsystemDescriptor;
    running: boolean;
    TryRecenter: () => boolean;
    TryGetInputDevices: () => boolean;
    TrySetTrackingOriginMode: () => boolean;
    GetTrackingOriginMode: () => TrackingOriginModeFlags;
    GetSupportedTrackingOriginModes: () => TrackingOriginModeFlags;
    TryGetBoundaryPoints: () => boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.XR.XRInputSubsystemDescriptor
  //
  export interface XRInputSubsystemDescriptor {
    disablesLegacyInput: boolean;
    id: string;
    Create: () => XRInputSubsystem;
  }
  //
  // Type: UnityEngine.XR.MeshId
  //
  export interface MeshId {
    // static InvalidId: MeshId;
  }
  //
  // Type: UnityEngine.XR.MeshGenerationStatus
  //
  export interface MeshGenerationStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.MeshGenerationResult
  //
  export interface MeshGenerationResult {
    MeshId: MeshId;
    Mesh: Mesh;
    MeshCollider: MeshCollider;
    Status: MeshGenerationStatus;
    Attributes: MeshVertexAttributes;
  }
  //
  // Type: UnityEngine.XR.MeshVertexAttributes
  //
  export interface MeshVertexAttributes {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.MeshChangeState
  //
  export interface MeshChangeState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.MeshInfo
  //
  export interface MeshInfo {
    MeshId: MeshId;
    ChangeState: MeshChangeState;
    PriorityHint: number;
  }
  //
  // Type: UnityEngine.XR.XRMeshSubsystem
  //
  export interface XRMeshSubsystem {
    meshDensity: number;
    subsystemDescriptor: XRMeshSubsystemDescriptor;
    SubsystemDescriptor: XRMeshSubsystemDescriptor;
    running: boolean;
    TryGetMeshInfos: () => boolean;
    GenerateMeshAsync: () => any;
    SetBoundingVolume: () => boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.XR.XRMeshSubsystemDescriptor
  //
  export interface XRMeshSubsystemDescriptor {
    id: string;
    Create: () => XRMeshSubsystem;
  }
  //
  // Type: UnityEngine.XR.GameViewRenderMode
  //
  export interface GameViewRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRSettings
  //
  export interface XRSettings {
    // static enabled: boolean;
    // static gameViewRenderMode: GameViewRenderMode;
    // static isDeviceActive: boolean;
    // static showDeviceView: boolean;
    // static eyeTextureResolutionScale: number;
    // static eyeTextureWidth: number;
    // static eyeTextureHeight: number;
    // static eyeTextureDesc: RenderTextureDescriptor;
    // static deviceEyeTextureDimension: TextureDimension;
    // static renderViewportScale: number;
    // static occlusionMaskScale: number;
    // static useOcclusionMesh: boolean;
    // static loadedDeviceName: string;
    // static supportedDevices: any; // System.String[]
    // static stereoRenderingMode: XRSettings_StereoRenderingMode;
  }
  //
  // Type: UnityEngine.XR.XRSettings+StereoRenderingMode
  //
  export interface XRSettings_StereoRenderingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.TrackingSpaceType
  //
  export interface TrackingSpaceType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.XRDevice
  //
  export interface XRDevice {
    // static isPresent: boolean;
    // static refreshRate: number;
    // static fovZoomFactor: number;
  }
  //
  // Type: UnityEngine.XR.XRStats
  //
  export interface XRStats {
  }
  //
  // Type: UnityEngine.XR.WSA.RemoteDeviceVersion
  //
  export interface RemoteDeviceVersion {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.XR.Provider.XRStats
  //
  export interface XRStats {
  }
  //
  // Type: UnityEngine.Analytics.ContinuousEvent
  //
  export interface ContinuousEvent {
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsSessionState
  //
  export interface AnalyticsSessionState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsSessionInfo
  //
  export interface AnalyticsSessionInfo {
    // static sessionState: AnalyticsSessionState;
    // static sessionId: any; // System.Int64
    // static sessionCount: any; // System.Int64
    // static sessionElapsedTime: any; // System.Int64
    // static sessionFirstRun: boolean;
    // static userId: string;
    // static customUserId: string;
    // static customDeviceId: string;
    // static identityToken: string;
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsSessionInfo+SessionStateChanged
  //
  export interface AnalyticsSessionInfo_SessionStateChanged {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsSessionInfo+IdentityTokenChanged
  //
  export interface AnalyticsSessionInfo_IdentityTokenChanged {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Analytics.Analytics
  //
  export interface Analytics {
    // static initializeOnStartup: boolean;
    // static playerOptedOut: boolean;
    // static eventUrl: string;
    // static configUrl: string;
    // static limitUserTracking: boolean;
    // static deviceStatsEnabled: boolean;
    // static enabled: boolean;
  }
  //
  // Type: UnityEngine.Analytics.Gender
  //
  export interface Gender {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsResult
  //
  export interface AnalyticsResult {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Analytics.AnalyticsEventPriority
  //
  export interface AnalyticsEventPriority {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Analytics.PerformanceReporting
  //
  export interface PerformanceReporting {
    // static enabled: boolean;
    // static graphicsInitializationFinishTime: any; // System.Int64
  }
  //
  // Type: UnityEngine.UIElements.BindableElement
  //
  export interface BindableElement {
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.BindableElement+UxmlFactory
  //
  export interface BindableElement_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.BindableElement+UxmlTraits
  //
  export interface BindableElement_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ClampedDragger`1+DragDirection
  //
  export interface any_DragDirection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Clickable
  //
  export interface Clickable {
    lastMousePosition: Vector2;
    activators: any; // System.Collections.Generic.List`1[UnityEngine.UIElements.ManipulatorActivationFilter]
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.ContextualMenuManager
  //
  export interface ContextualMenuManager {
    DisplayMenuIfEventMatches: () => any;
    DisplayMenu: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ContextualMenuManipulator
  //
  export interface ContextualMenuManipulator {
    activators: any; // System.Collections.Generic.List`1[UnityEngine.UIElements.ManipulatorActivationFilter]
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Cursor
  //
  export interface Cursor {
    texture: Texture2D;
    hotspot: Vector2;
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenuEventInfo
  //
  export interface DropdownMenuEventInfo {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenuItem
  //
  export interface DropdownMenuItem {
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenuSeparator
  //
  export interface DropdownMenuSeparator {
    subMenuPath: string;
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenuAction
  //
  export interface DropdownMenuAction {
    name: string;
    status: DropdownMenuAction_Status;
    eventInfo: DropdownMenuEventInfo;
    userData: any; // System.Object
    UpdateActionStatus: () => any;
    Execute: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenuAction+Status
  //
  export interface DropdownMenuAction_Status {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DropdownMenu
  //
  export interface DropdownMenu {
    MenuItems: () => any;
    AppendAction: () => any;
    InsertAction: () => any;
    AppendSeparator: () => any;
    InsertSeparator: () => any;
    RemoveItemAt: () => any;
    PrepareForDisplay: () => any;
  }
  //
  // Type: UnityEngine.UIElements.EventDispatcherGate
  //
  export interface EventDispatcherGate {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.UIElements.EventDispatcher
  //
  export interface EventDispatcher {
  }
  //
  // Type: UnityEngine.UIElements.Focusable
  //
  export interface Focusable {
    focusController: FocusController;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    canGrabFocus: boolean;
    Focus: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    SendEvent: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.FocusChangeDirection
  //
  export interface FocusChangeDirection {
    // static unspecified: FocusChangeDirection;
    // static none: FocusChangeDirection;
  }
  //
  // Type: UnityEngine.UIElements.IFocusRing
  //
  export interface IFocusRing {
    GetFocusChangeDirection: () => FocusChangeDirection;
    GetNextFocusable: () => Focusable;
  }
  //
  // Type: UnityEngine.UIElements.FocusController
  //
  export interface FocusController {
    focusedElement: Focusable;
  }
  //
  // Type: UnityEngine.UIElements.IMGUIContainer
  //
  export interface IMGUIContainer {
    onGUIHandler: any; // System.Action
    cullingEnabled: boolean;
    contextType: ContextType;
    canGrabFocus: boolean;
    viewDataKey: string;
    userData: any; // System.Object
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    MarkDirtyLayout: () => any;
    HandleEvent: () => any;
    Dispose: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.IMGUIContainer+UxmlFactory
  //
  export interface IMGUIContainer_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.IMGUIContainer+UxmlTraits
  //
  export interface IMGUIContainer_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ImmediateModeElement
  //
  export interface ImmediateModeElement {
    cullingEnabled: boolean;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.SelectionType
  //
  export interface SelectionType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ITransform
  //
  export interface ITransform {
    position: Vector3;
    rotation: Quaternion;
    scale: Vector3;
    matrix: Matrix4x4;
  }
  //
  // Type: UnityEngine.UIElements.ManipulatorActivationFilter
  //
  export interface ManipulatorActivationFilter {
    button: MouseButton;
    modifiers: EventModifiers;
    clickCount: number;
    Matches: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.IManipulator
  //
  export interface IManipulator {
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Manipulator
  //
  export interface Manipulator {
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.MouseButton
  //
  export interface MouseButton {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseCaptureController
  //
  export interface MouseCaptureController {
  }
  //
  // Type: UnityEngine.UIElements.MouseManipulator
  //
  export interface MouseManipulator {
    activators: any; // System.Collections.Generic.List`1[UnityEngine.UIElements.ManipulatorActivationFilter]
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.ContextType
  //
  export interface ContextType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UsageHints
  //
  export interface UsageHints {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IPanel
  //
  export interface IPanel {
    visualTree: VisualElement;
    dispatcher: EventDispatcher;
    contextType: ContextType;
    focusController: FocusController;
    contextualMenuManager: ContextualMenuManager;
    Pick: () => VisualElement;
    PickAll: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.PointerCaptureHelper
  //
  export interface PointerCaptureHelper {
  }
  //
  // Type: UnityEngine.UIElements.PointerManipulator
  //
  export interface PointerManipulator {
    activators: any; // System.Collections.Generic.List`1[UnityEngine.UIElements.ManipulatorActivationFilter]
    target: VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TimerState
  //
  export interface TimerState {
    start: any; // System.Int64
    now: any; // System.Int64
    deltaTime: any; // System.Int64
  }
  //
  // Type: UnityEngine.UIElements.Position
  //
  export interface Position {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Overflow
  //
  export interface Overflow {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.OverflowClipBox
  //
  export interface OverflowClipBox {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.FlexDirection
  //
  export interface FlexDirection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Wrap
  //
  export interface Wrap {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Align
  //
  export interface Align {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Justify
  //
  export interface Justify {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TextOverflowPosition
  //
  export interface TextOverflowPosition {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TextOverflow
  //
  export interface TextOverflow {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Visibility
  //
  export interface Visibility {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.WhiteSpace
  //
  export interface WhiteSpace {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DisplayStyle
  //
  export interface DisplayStyle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TemplateContainer
  //
  export interface TemplateContainer {
    templateId: string;
    contentContainer: VisualElement;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.TemplateContainer+UxmlFactory
  //
  export interface TemplateContainer_UxmlFactory {
    uxmlName: string;
    uxmlQualifiedName: string;
    uxmlNamespace: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TemplateContainer+UxmlTraits
  //
  export interface TemplateContainer_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TextElement
  //
  export interface TextElement {
    text: string;
    displayTooltipWhenElided: boolean;
    isElided: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    MeasureTextSize: () => Vector2;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.TextElement+UxmlFactory
  //
  export interface TextElement_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TextElement+UxmlTraits
  //
  export interface TextElement_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UIElementsRuntimeUtility+CreateRuntimePanelDelegate
  //
  export interface UIElementsRuntimeUtility_CreateRuntimePanelDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => BaseRuntimePanel;
    BeginInvoke: () => any;
    EndInvoke: () => BaseRuntimePanel;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UQuery
  //
  export interface UQuery {
  }
  //
  // Type: UnityEngine.UIElements.UQueryExtensions
  //
  export interface UQueryExtensions {
  }
  //
  // Type: UnityEngine.UIElements.PickingMode
  //
  export interface PickingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.VisualElement
  //
  export interface VisualElement {
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.VisualElement+UxmlFactory
  //
  export interface VisualElement_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.VisualElement+UxmlTraits
  //
  export interface VisualElement_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.VisualElement+MeasureMode
  //
  export interface VisualElement_MeasureMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.VisualElement+Hierarchy
  //
  export interface VisualElement_Hierarchy {
    parent: VisualElement;
    childCount: number;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    IndexOf: () => number;
    ElementAt: () => VisualElement;
    Children: () => any;
    Sort: () => any;
  }
  //
  // Type: UnityEngine.UIElements.VisualElementExtensions
  //
  export interface VisualElementExtensions {
  }
  //
  // Type: UnityEngine.UIElements.IExperimentalFeatures
  //
  export interface IExperimentalFeatures {
    animation: ITransitionAnimations;
  }
  //
  // Type: UnityEngine.UIElements.VisualElementFocusChangeDirection
  //
  export interface VisualElementFocusChangeDirection {
    // static left: FocusChangeDirection;
    // static right: FocusChangeDirection;
  }
  //
  // Type: UnityEngine.UIElements.VisualElementFocusRing
  //
  export interface VisualElementFocusRing {
    defaultFocusOrder: VisualElementFocusRing_DefaultFocusOrder;
    GetFocusChangeDirection: () => FocusChangeDirection;
    GetNextFocusable: () => Focusable;
  }
  //
  // Type: UnityEngine.UIElements.VisualElementFocusRing+DefaultFocusOrder
  //
  export interface VisualElementFocusRing_DefaultFocusOrder {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IVisualElementScheduledItem
  //
  export interface IVisualElementScheduledItem {
    element: VisualElement;
    isActive: boolean;
    Resume: () => any;
    Pause: () => any;
    ExecuteLater: () => any;
    StartingIn: () => IVisualElementScheduledItem;
    Every: () => IVisualElementScheduledItem;
    Until: () => IVisualElementScheduledItem;
    ForDuration: () => IVisualElementScheduledItem;
  }
  //
  // Type: UnityEngine.UIElements.IVisualElementScheduler
  //
  export interface IVisualElementScheduler {
    Execute: () => IVisualElementScheduledItem;
  }
  //
  // Type: UnityEngine.UIElements.VisualElementStyleSheetSet
  //
  export interface VisualElementStyleSheetSet {
    count: number;
    Add: () => any;
    Clear: () => any;
    Remove: () => boolean;
    Contains: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.SliderDirection
  //
  export interface SliderDirection {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IBindable
  //
  export interface IBindable {
    binding: IBinding;
    bindingPath: string;
  }
  //
  // Type: UnityEngine.UIElements.IBinding
  //
  export interface IBinding {
    PreUpdate: () => any;
    Update: () => any;
    Release: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IBindingExtensions
  //
  export interface IBindingExtensions {
  }
  //
  // Type: UnityEngine.UIElements.Box
  //
  export interface Box {
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Box+UxmlFactory
  //
  export interface Box_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Button
  //
  export interface Button {
    clickable: Clickable;
    text: string;
    displayTooltipWhenElided: boolean;
    isElided: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    MeasureTextSize: () => Vector2;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Button+UxmlFactory
  //
  export interface Button_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Button+UxmlTraits
  //
  export interface Button_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Foldout
  //
  export interface Foldout {
    contentContainer: VisualElement;
    text: string;
    value: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetValueWithoutNotify: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Foldout+UxmlFactory
  //
  export interface Foldout_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Foldout+UxmlTraits
  //
  export interface Foldout_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.HelpBoxMessageType
  //
  export interface HelpBoxMessageType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.HelpBox
  //
  export interface HelpBox {
    text: string;
    messageType: HelpBoxMessageType;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.HelpBox+UxmlFactory
  //
  export interface HelpBox_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.HelpBox+UxmlTraits
  //
  export interface HelpBox_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Image
  //
  export interface Image {
    image: Texture;
    vectorImage: VectorImage;
    sourceRect: Rect;
    uv: Rect;
    scaleMode: ScaleMode;
    tintColor: Color;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Image+UxmlFactory
  //
  export interface Image_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Image+UxmlTraits
  //
  export interface Image_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.INotifyValueChangedExtensions
  //
  export interface INotifyValueChangedExtensions {
  }
  //
  // Type: UnityEngine.UIElements.Label
  //
  export interface Label {
    text: string;
    displayTooltipWhenElided: boolean;
    isElided: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    MeasureTextSize: () => Vector2;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Label+UxmlFactory
  //
  export interface Label_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Label+UxmlTraits
  //
  export interface Label_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.AlternatingRowBackground
  //
  export interface AlternatingRowBackground {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ListView
  //
  export interface ListView {
    itemsSource: any; // System.Collections.IList
    makeItem: any; // System.Func`1[UnityEngine.UIElements.VisualElement]
    unbindItem: any; // System.Action`2[UnityEngine.UIElements.VisualElement,System.Int32]
    bindItem: any; // System.Action`2[UnityEngine.UIElements.VisualElement,System.Int32]
    resolvedItemHeight: number;
    itemHeight: number;
    showBorder: boolean;
    reorderable: boolean;
    selectedIndex: number;
    selectedIndices: any; // System.Collections.Generic.IEnumerable`1[System.Int32]
    selectedItem: any; // System.Object
    selectedItems: any; // System.Collections.Generic.IEnumerable`1[System.Object]
    contentContainer: VisualElement;
    selectionType: SelectionType;
    showAlternatingRowBackgrounds: AlternatingRowBackground;
    showBoundCollectionSize: boolean;
    horizontalScrollingEnabled: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    OnKeyDown: () => any;
    ScrollToItem: () => any;
    AddToSelection: () => any;
    RemoveFromSelection: () => any;
    SetSelection: () => any;
    SetSelectionWithoutNotify: () => any;
    ClearSelection: () => any;
    ScrollTo: () => any;
    Refresh: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.ListView+UxmlFactory
  //
  export interface ListView_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.ListView+UxmlTraits
  //
  export interface ListView_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MinMaxSlider
  //
  export interface MinMaxSlider {
    minValue: number;
    maxValue: number;
    value: Vector2;
    range: number;
    lowLimit: number;
    highLimit: number;
    labelElement: Label;
    label: string;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetValueWithoutNotify: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.MinMaxSlider+UxmlFactory
  //
  export interface MinMaxSlider_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.MinMaxSlider+UxmlTraits
  //
  export interface MinMaxSlider_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PopupWindow
  //
  export interface PopupWindow {
    contentContainer: VisualElement;
    text: string;
    displayTooltipWhenElided: boolean;
    isElided: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    MeasureTextSize: () => Vector2;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.PopupWindow+UxmlFactory
  //
  export interface PopupWindow_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.PopupWindow+UxmlTraits
  //
  export interface PopupWindow_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.RepeatButton
  //
  export interface RepeatButton {
    text: string;
    displayTooltipWhenElided: boolean;
    isElided: boolean;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetAction: () => any;
    MeasureTextSize: () => Vector2;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.RepeatButton+UxmlFactory
  //
  export interface RepeatButton_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.RepeatButton+UxmlTraits
  //
  export interface RepeatButton_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Scroller
  //
  export interface Scroller {
    slider: Slider;
    lowButton: RepeatButton;
    highButton: RepeatButton;
    value: number;
    lowValue: number;
    highValue: number;
    direction: SliderDirection;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    Adjust: () => any;
    ScrollPageUp: () => any;
    ScrollPageDown: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Scroller+UxmlFactory
  //
  export interface Scroller_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Scroller+UxmlTraits
  //
  export interface Scroller_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ScrollViewMode
  //
  export interface ScrollViewMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ScrollView
  //
  export interface ScrollView {
    showHorizontal: boolean;
    showVertical: boolean;
    scrollOffset: Vector2;
    horizontalPageSize: number;
    verticalPageSize: number;
    scrollDecelerationRate: number;
    elasticity: number;
    touchScrollBehavior: ScrollView_TouchScrollBehavior;
    contentViewport: VisualElement;
    horizontalScroller: Scroller;
    verticalScroller: Scroller;
    contentContainer: VisualElement;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    ScrollTo: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.ScrollView+UxmlFactory
  //
  export interface ScrollView_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.ScrollView+UxmlTraits
  //
  export interface ScrollView_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ScrollView+TouchScrollBehavior
  //
  export interface ScrollView_TouchScrollBehavior {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Slider
  //
  export interface Slider {
    lowValue: number;
    highValue: number;
    range: number;
    pageSize: number;
    showInputField: boolean;
    value: number;
    direction: SliderDirection;
    labelElement: Label;
    label: string;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetValueWithoutNotify: () => any;
    AdjustDragElement: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Slider+UxmlFactory
  //
  export interface Slider_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Slider+UxmlTraits
  //
  export interface Slider_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.SliderInt
  //
  export interface SliderInt {
    pageSize: number;
    lowValue: number;
    highValue: number;
    range: number;
    showInputField: boolean;
    value: number;
    direction: SliderDirection;
    labelElement: Label;
    label: string;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetValueWithoutNotify: () => any;
    AdjustDragElement: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.SliderInt+UxmlFactory
  //
  export interface SliderInt_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.SliderInt+UxmlTraits
  //
  export interface SliderInt_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TextField
  //
  export interface TextField {
    multiline: boolean;
    value: string;
    text: string;
    isReadOnly: boolean;
    isPasswordField: boolean;
    selectionColor: Color;
    cursorColor: Color;
    cursorIndex: number;
    selectIndex: number;
    maxLength: number;
    doubleClickSelectsWord: boolean;
    tripleClickSelectsLine: boolean;
    isDelayed: boolean;
    maskChar: any; // System.Char
    labelElement: Label;
    label: string;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SelectRange: () => any;
    SetValueWithoutNotify: () => any;
    SelectAll: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.TextField+UxmlFactory
  //
  export interface TextField_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TextField+UxmlTraits
  //
  export interface TextField_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Toggle
  //
  export interface Toggle {
    text: string;
    value: boolean;
    labelElement: Label;
    label: string;
    binding: IBinding;
    bindingPath: string;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    contentContainer: VisualElement;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    SetValueWithoutNotify: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.Toggle+UxmlFactory
  //
  export interface Toggle_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.Toggle+UxmlTraits
  //
  export interface Toggle_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TreeView+UxmlFactory
  //
  export interface TreeView_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TreeView+UxmlTraits
  //
  export interface TreeView_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TwoPaneSplitView
  //
  export interface TwoPaneSplitView {
    fixedPane: VisualElement;
    flexedPane: VisualElement;
    fixedPaneIndex: number;
    fixedPaneInitialDimension: number;
    orientation: TwoPaneSplitViewOrientation;
    contentContainer: VisualElement;
    viewDataKey: string;
    userData: any; // System.Object
    canGrabFocus: boolean;
    focusController: FocusController;
    usageHints: UsageHints;
    transform: ITransform;
    layout: Rect;
    contentRect: Rect;
    worldBound: Rect;
    localBound: Rect;
    worldTransform: Matrix4x4;
    pickingMode: PickingMode;
    name: string;
    enabledInHierarchy: boolean;
    enabledSelf: boolean;
    visible: boolean;
    generateVisualContent: any; // System.Action`1[UnityEngine.UIElements.MeshGenerationContext]
    experimental: IExperimentalFeatures;
    hierarchy: VisualElement_Hierarchy;
    cacheAsBitmap: boolean;
    parent: VisualElement;
    panel: IPanel;
    childCount: number;
    schedule: IVisualElementScheduler;
    style: IStyle;
    customStyle: ICustomStyle;
    styleSheets: VisualElementStyleSheetSet;
    tooltip: string;
    resolvedStyle: IResolvedStyle;
    focusable: boolean;
    tabIndex: number;
    delegatesFocus: boolean;
    CollapseChild: () => any;
    UnCollapse: () => any;
    Add: () => any;
    Insert: () => any;
    Remove: () => any;
    RemoveAt: () => any;
    Clear: () => any;
    ElementAt: () => VisualElement;
    IndexOf: () => number;
    Children: () => any;
    Sort: () => any;
    BringToFront: () => any;
    SendToBack: () => any;
    PlaceBehind: () => any;
    PlaceInFront: () => any;
    RemoveFromHierarchy: () => any;
    GetFirstOfType: () => any;
    GetFirstAncestorOfType: () => any;
    Contains: () => boolean;
    FindCommonAncestor: () => VisualElement;
    SetEnabled: () => any;
    MarkDirtyRepaint: () => any;
    ContainsPoint: () => boolean;
    Overlaps: () => boolean;
    GetClasses: () => any;
    ClearClassList: () => any;
    AddToClassList: () => any;
    RemoveFromClassList: () => any;
    ToggleInClassList: () => any;
    EnableInClassList: () => any;
    ClassListContains: () => boolean;
    FindAncestorUserData: () => any;
    Focus: () => any;
    SendEvent: () => any;
    Blur: () => any;
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.TwoPaneSplitView+UxmlFactory
  //
  export interface TwoPaneSplitView_UxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.TwoPaneSplitView+UxmlTraits
  //
  export interface TwoPaneSplitView_UxmlTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TwoPaneSplitViewOrientation
  //
  export interface TwoPaneSplitViewOrientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IPointerCaptureEvent
  //
  export interface IPointerCaptureEvent {
  }
  //
  // Type: UnityEngine.UIElements.PointerCaptureOutEvent
  //
  export interface PointerCaptureOutEvent {
    relatedTarget: IEventHandler;
    pointerId: number;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerCaptureEvent
  //
  export interface PointerCaptureEvent {
    relatedTarget: IEventHandler;
    pointerId: number;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IMouseCaptureEvent
  //
  export interface IMouseCaptureEvent {
  }
  //
  // Type: UnityEngine.UIElements.MouseCaptureOutEvent
  //
  export interface MouseCaptureOutEvent {
    relatedTarget: IEventHandler;
    pointerId: number;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseCaptureEvent
  //
  export interface MouseCaptureEvent {
    relatedTarget: IEventHandler;
    pointerId: number;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IChangeEvent
  //
  export interface IChangeEvent {
  }
  //
  // Type: UnityEngine.UIElements.ICommandEvent
  //
  export interface ICommandEvent {
    commandName: string;
  }
  //
  // Type: UnityEngine.UIElements.ValidateCommandEvent
  //
  export interface ValidateCommandEvent {
    commandName: string;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ExecuteCommandEvent
  //
  export interface ExecuteCommandEvent {
    commandName: string;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IDragAndDropEvent
  //
  export interface IDragAndDropEvent {
  }
  //
  // Type: UnityEngine.UIElements.DragExitedEvent
  //
  export interface DragExitedEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DragEnterEvent
  //
  export interface DragEnterEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DragLeaveEvent
  //
  export interface DragLeaveEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DragUpdatedEvent
  //
  export interface DragUpdatedEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DragPerformEvent
  //
  export interface DragPerformEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.EventBase
  //
  export interface EventBase {
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TrickleDown
  //
  export interface TrickleDown {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IEventHandler
  //
  export interface IEventHandler {
    SendEvent: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.CallbackEventHandler
  //
  export interface CallbackEventHandler {
    RegisterCallback: () => any;
    UnregisterCallback: () => any;
    SendEvent: () => any;
    HandleEvent: () => any;
    HasTrickleDownHandlers: () => boolean;
    HasBubbleUpHandlers: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.IFocusEvent
  //
  export interface IFocusEvent {
    relatedTarget: Focusable;
    direction: FocusChangeDirection;
  }
  //
  // Type: UnityEngine.UIElements.FocusOutEvent
  //
  export interface FocusOutEvent {
    relatedTarget: Focusable;
    direction: FocusChangeDirection;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.BlurEvent
  //
  export interface BlurEvent {
    relatedTarget: Focusable;
    direction: FocusChangeDirection;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.FocusInEvent
  //
  export interface FocusInEvent {
    relatedTarget: Focusable;
    direction: FocusChangeDirection;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.FocusEvent
  //
  export interface FocusEvent {
    relatedTarget: Focusable;
    direction: FocusChangeDirection;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PropagationPhase
  //
  export interface PropagationPhase {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.InputEvent
  //
  export interface InputEvent {
    previousData: string;
    newData: string;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IKeyboardEvent
  //
  export interface IKeyboardEvent {
    modifiers: EventModifiers;
    character: any; // System.Char
    keyCode: KeyCode;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
  }
  //
  // Type: UnityEngine.UIElements.KeyDownEvent
  //
  export interface KeyDownEvent {
    modifiers: EventModifiers;
    character: any; // System.Char
    keyCode: KeyCode;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.KeyUpEvent
  //
  export interface KeyUpEvent {
    modifiers: EventModifiers;
    character: any; // System.Char
    keyCode: KeyCode;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.GeometryChangedEvent
  //
  export interface GeometryChangedEvent {
    oldRect: Rect;
    newRect: Rect;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IMouseEvent
  //
  export interface IMouseEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
  }
  //
  // Type: UnityEngine.UIElements.MouseDownEvent
  //
  export interface MouseDownEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseUpEvent
  //
  export interface MouseUpEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseMoveEvent
  //
  export interface MouseMoveEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ContextClickEvent
  //
  export interface ContextClickEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.WheelEvent
  //
  export interface WheelEvent {
    delta: Vector3;
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseEnterEvent
  //
  export interface MouseEnterEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseLeaveEvent
  //
  export interface MouseLeaveEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseEnterWindowEvent
  //
  export interface MouseEnterWindowEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseLeaveWindowEvent
  //
  export interface MouseLeaveWindowEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseOverEvent
  //
  export interface MouseOverEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MouseOutEvent
  //
  export interface MouseOutEvent {
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ContextualMenuPopulateEvent
  //
  export interface ContextualMenuPopulateEvent {
    menu: DropdownMenu;
    triggerEvent: EventBase;
    modifiers: EventModifiers;
    mousePosition: Vector2;
    localMousePosition: Vector2;
    mouseDelta: Vector2;
    clickCount: number;
    button: number;
    pressedButtons: number;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IPanelChangedEvent
  //
  export interface IPanelChangedEvent {
  }
  //
  // Type: UnityEngine.UIElements.AttachToPanelEvent
  //
  export interface AttachToPanelEvent {
    originPanel: IPanel;
    destinationPanel: IPanel;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.DetachFromPanelEvent
  //
  export interface DetachFromPanelEvent {
    originPanel: IPanel;
    destinationPanel: IPanel;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerType
  //
  export interface PointerType {
  }
  //
  // Type: UnityEngine.UIElements.PointerId
  //
  export interface PointerId {
  }
  //
  // Type: UnityEngine.UIElements.IPointerEvent
  //
  export interface IPointerEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
  }
  //
  // Type: UnityEngine.UIElements.PointerDownEvent
  //
  export interface PointerDownEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerMoveEvent
  //
  export interface PointerMoveEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerStationaryEvent
  //
  export interface PointerStationaryEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerUpEvent
  //
  export interface PointerUpEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerCancelEvent
  //
  export interface PointerCancelEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ClickEvent
  //
  export interface ClickEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerEnterEvent
  //
  export interface PointerEnterEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerLeaveEvent
  //
  export interface PointerLeaveEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerOverEvent
  //
  export interface PointerOverEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PointerOutEvent
  //
  export interface PointerOutEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    button: number;
    pressedButtons: number;
    position: Vector3;
    localPosition: Vector3;
    deltaPosition: Vector3;
    deltaTime: number;
    clickCount: number;
    pressure: number;
    tangentialPressure: number;
    altitudeAngle: number;
    azimuthAngle: number;
    twist: number;
    radius: Vector2;
    radiusVariance: Vector2;
    modifiers: EventModifiers;
    shiftKey: boolean;
    ctrlKey: boolean;
    commandKey: boolean;
    altKey: boolean;
    actionKey: boolean;
    currentTarget: IEventHandler;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.PropagationPaths+Type
  //
  export interface PropagationPaths_Type {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.CustomStyleResolvedEvent
  //
  export interface CustomStyleResolvedEvent {
    customStyle: ICustomStyle;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TooltipEvent
  //
  export interface TooltipEvent {
    tooltip: string;
    rect: Rect;
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IMGUIEvent
  //
  export interface IMGUIEvent {
    eventTypeId: any; // System.Int64
    timestamp: any; // System.Int64
    bubbles: boolean;
    tricklesDown: boolean;
    target: IEventHandler;
    isPropagationStopped: boolean;
    isImmediatePropagationStopped: boolean;
    isDefaultPrevented: boolean;
    propagationPhase: PropagationPhase;
    currentTarget: IEventHandler;
    dispatch: boolean;
    imguiEvent: Event;
    originalMousePosition: Vector2;
    Dispose: () => any;
    StopPropagation: () => any;
    StopImmediatePropagation: () => any;
    PreventDefault: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Vertex
  //
  export interface Vertex {
    position: Vector3;
    tint: Color32;
    uv: Vector2;
  }
  //
  // Type: UnityEngine.UIElements.MeshWriteData
  //
  export interface MeshWriteData {
    vertexCount: number;
    indexCount: number;
    uvRegion: Rect;
    SetNextVertex: () => any;
    SetNextIndex: () => any;
    SetAllVertices: () => any;
    SetAllIndices: () => any;
  }
  //
  // Type: UnityEngine.UIElements.MeshGenerationContextUtils+BorderParams
  //
  export interface MeshGenerationContextUtils_BorderParams {
    rect: Rect;
    playmodeTintColor: Color;
    leftColor: Color;
    topColor: Color;
    rightColor: Color;
    bottomColor: Color;
    leftWidth: number;
    topWidth: number;
    rightWidth: number;
    bottomWidth: number;
    topLeftRadius: Vector2;
    topRightRadius: Vector2;
    bottomRightRadius: Vector2;
    bottomLeftRadius: Vector2;
    material: Material;
  }
  //
  // Type: UnityEngine.UIElements.MeshGenerationContextUtils+RectangleParams
  //
  export interface MeshGenerationContextUtils_RectangleParams {
    rect: Rect;
    uv: Rect;
    color: Color;
    texture: Texture;
    vectorImage: VectorImage;
    material: Material;
    scaleMode: ScaleMode;
    playmodeTintColor: Color;
    topLeftRadius: Vector2;
    topRightRadius: Vector2;
    bottomRightRadius: Vector2;
    bottomLeftRadius: Vector2;
    leftSlice: number;
    topSlice: number;
    rightSlice: number;
    bottomSlice: number;
  }
  //
  // Type: UnityEngine.UIElements.MeshGenerationContextUtils+TextParams
  //
  export interface MeshGenerationContextUtils_TextParams {
    rect: Rect;
    text: string;
    font: Font;
    fontSize: number;
    fontStyle: FontStyle;
    fontColor: Color;
    anchor: TextAnchor;
    wordWrap: boolean;
    wordWrapWidth: number;
    richText: boolean;
    material: Material;
    playmodeTintColor: Color;
    textOverflowMode: TextOverflowMode;
    textOverflowPosition: TextOverflowPosition;
  }
  //
  // Type: UnityEngine.UIElements.MeshGenerationContext
  //
  export interface MeshGenerationContext {
    visualElement: VisualElement;
    Allocate: () => MeshWriteData;
  }
  //
  // Type: UnityEngine.UIElements.Background
  //
  export interface Background {
    texture: Texture2D;
    vectorImage: VectorImage;
  }
  //
  // Type: UnityEngine.UIElements.ICustomStyle
  //
  export interface ICustomStyle {
    TryGetValue: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.LengthUnit
  //
  export interface LengthUnit {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Length
  //
  export interface Length {
    value: number;
    unit: LengthUnit;
  }
  //
  // Type: UnityEngine.UIElements.StyleBackground
  //
  export interface StyleBackground {
    value: Background;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleColor
  //
  export interface StyleColor {
    value: Color;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleCursor
  //
  export interface StyleCursor {
    value: Cursor;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleFloat
  //
  export interface StyleFloat {
    value: number;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleFont
  //
  export interface StyleFont {
    value: Font;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleInt
  //
  export interface StyleInt {
    value: number;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleLength
  //
  export interface StyleLength {
    value: Length;
    keyword: StyleKeyword;
  }
  //
  // Type: UnityEngine.UIElements.StyleKeyword
  //
  export interface StyleKeyword {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IResolvedStyle
  //
  export interface IResolvedStyle {
    alignContent: Align;
    alignItems: Align;
    alignSelf: Align;
    backgroundColor: Color;
    backgroundImage: Background;
    borderBottomColor: Color;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderBottomWidth: number;
    borderLeftColor: Color;
    borderLeftWidth: number;
    borderRightColor: Color;
    borderRightWidth: number;
    borderTopColor: Color;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderTopWidth: number;
    bottom: number;
    color: Color;
    display: DisplayStyle;
    flexBasis: StyleFloat;
    flexDirection: FlexDirection;
    flexGrow: number;
    flexShrink: number;
    flexWrap: Wrap;
    fontSize: number;
    height: number;
    justifyContent: Justify;
    left: number;
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    maxHeight: StyleFloat;
    maxWidth: StyleFloat;
    minHeight: StyleFloat;
    minWidth: StyleFloat;
    opacity: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    position: Position;
    right: number;
    textOverflow: TextOverflow;
    top: number;
    unityBackgroundImageTintColor: Color;
    unityBackgroundScaleMode: ScaleMode;
    unityFont: Font;
    unityFontStyleAndWeight: FontStyle;
    unitySliceBottom: number;
    unitySliceLeft: number;
    unitySliceRight: number;
    unitySliceTop: number;
    unityTextAlign: TextAnchor;
    unityTextOverflowPosition: TextOverflowPosition;
    visibility: Visibility;
    whiteSpace: WhiteSpace;
    width: number;
  }
  //
  // Type: UnityEngine.UIElements.IStyle
  //
  export interface IStyle {
    alignContent: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Align]
    alignItems: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Align]
    alignSelf: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Align]
    backgroundColor: StyleColor;
    backgroundImage: StyleBackground;
    borderBottomColor: StyleColor;
    borderBottomLeftRadius: StyleLength;
    borderBottomRightRadius: StyleLength;
    borderBottomWidth: StyleFloat;
    borderLeftColor: StyleColor;
    borderLeftWidth: StyleFloat;
    borderRightColor: StyleColor;
    borderRightWidth: StyleFloat;
    borderTopColor: StyleColor;
    borderTopLeftRadius: StyleLength;
    borderTopRightRadius: StyleLength;
    borderTopWidth: StyleFloat;
    bottom: StyleLength;
    color: StyleColor;
    cursor: StyleCursor;
    display: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.DisplayStyle]
    flexBasis: StyleLength;
    flexDirection: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.FlexDirection]
    flexGrow: StyleFloat;
    flexShrink: StyleFloat;
    flexWrap: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Wrap]
    fontSize: StyleLength;
    height: StyleLength;
    justifyContent: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Justify]
    left: StyleLength;
    marginBottom: StyleLength;
    marginLeft: StyleLength;
    marginRight: StyleLength;
    marginTop: StyleLength;
    maxHeight: StyleLength;
    maxWidth: StyleLength;
    minHeight: StyleLength;
    minWidth: StyleLength;
    opacity: StyleFloat;
    overflow: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Overflow]
    paddingBottom: StyleLength;
    paddingLeft: StyleLength;
    paddingRight: StyleLength;
    paddingTop: StyleLength;
    position: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Position]
    right: StyleLength;
    textOverflow: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.TextOverflow]
    top: StyleLength;
    unityBackgroundImageTintColor: StyleColor;
    unityBackgroundScaleMode: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.ScaleMode]
    unityFont: StyleFont;
    unityFontStyleAndWeight: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.FontStyle]
    unityOverflowClipBox: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.OverflowClipBox]
    unitySliceBottom: StyleInt;
    unitySliceLeft: StyleInt;
    unitySliceRight: StyleInt;
    unitySliceTop: StyleInt;
    unityTextAlign: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.TextAnchor]
    unityTextOverflowPosition: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.TextOverflowPosition]
    visibility: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.Visibility]
    whiteSpace: any; // UnityEngine.UIElements.StyleEnum`1[UnityEngine.UIElements.WhiteSpace]
    width: StyleLength;
  }
  //
  // Type: UnityEngine.UIElements.StyleSheet
  //
  export interface StyleSheet {
    contentHash: number;
    name: string;
    hideFlags: HideFlags;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.UIElements.StyleVariableResolver+Result
  //
  export interface StyleVariableResolver_Result {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.ThemeStyleSheet
  //
  export interface ThemeStyleSheet {
    contentHash: number;
    name: string;
    hideFlags: HideFlags;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.UIElements.IUxmlAttributes
  //
  export interface IUxmlAttributes {
    TryGetAttributeValue: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlRootElementFactory
  //
  export interface UxmlRootElementFactory {
    uxmlName: string;
    uxmlQualifiedName: string;
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    uxmlNamespace: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    Create: () => VisualElement;
    AcceptsAttributeBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlRootElementTraits
  //
  export interface UxmlRootElementTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UxmlStyleFactory
  //
  export interface UxmlStyleFactory {
    uxmlName: string;
    uxmlQualifiedName: string;
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    uxmlNamespace: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    Create: () => VisualElement;
    AcceptsAttributeBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlStyleTraits
  //
  export interface UxmlStyleTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UxmlTemplateFactory
  //
  export interface UxmlTemplateFactory {
    uxmlName: string;
    uxmlQualifiedName: string;
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    uxmlNamespace: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    Create: () => VisualElement;
    AcceptsAttributeBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlTemplateTraits
  //
  export interface UxmlTemplateTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UxmlAttributeOverridesFactory
  //
  export interface UxmlAttributeOverridesFactory {
    uxmlName: string;
    uxmlQualifiedName: string;
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    uxmlNamespace: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    Create: () => VisualElement;
    AcceptsAttributeBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlAttributeOverridesTraits
  //
  export interface UxmlAttributeOverridesTraits {
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.TemplateAsset+AttributeOverride
  //
  export interface TemplateAsset_AttributeOverride {
    m_ElementName: string;
    m_AttributeName: string;
    m_Value: string;
  }
  //
  // Type: UnityEngine.UIElements.UxmlAttributeDescription
  //
  export interface UxmlAttributeDescription {
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    defaultValueAsString: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
  }
  //
  // Type: UnityEngine.UIElements.UxmlAttributeDescription+Use
  //
  export interface UxmlAttributeDescription_Use {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UxmlStringAttributeDescription
  //
  export interface UxmlStringAttributeDescription {
    defaultValueAsString: string;
    defaultValue: string;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => string;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlFloatAttributeDescription
  //
  export interface UxmlFloatAttributeDescription {
    defaultValueAsString: string;
    defaultValue: number;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => number;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlDoubleAttributeDescription
  //
  export interface UxmlDoubleAttributeDescription {
    defaultValueAsString: string;
    defaultValue: number;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => number;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlIntAttributeDescription
  //
  export interface UxmlIntAttributeDescription {
    defaultValueAsString: string;
    defaultValue: number;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => number;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlLongAttributeDescription
  //
  export interface UxmlLongAttributeDescription {
    defaultValueAsString: string;
    defaultValue: any; // System.Int64
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => any;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlBoolAttributeDescription
  //
  export interface UxmlBoolAttributeDescription {
    defaultValueAsString: string;
    defaultValue: boolean;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => boolean;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlColorAttributeDescription
  //
  export interface UxmlColorAttributeDescription {
    defaultValueAsString: string;
    defaultValue: Color;
    name: string;
    obsoleteNames: any; // System.Collections.Generic.IEnumerable`1[System.String]
    type: string;
    typeNamespace: string;
    use: UxmlAttributeDescription_Use;
    restriction: UxmlTypeRestriction;
    GetValueFromBag: () => Color;
    TryGetValueFromBag: () => boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlChildElementDescription
  //
  export interface UxmlChildElementDescription {
    elementName: string;
    elementNamespace: string;
  }
  //
  // Type: UnityEngine.UIElements.UxmlTraits
  //
  export interface UxmlTraits {
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    Init: () => any;
  }
  //
  // Type: UnityEngine.UIElements.IUxmlFactory
  //
  export interface IUxmlFactory {
    uxmlName: string;
    uxmlNamespace: string;
    uxmlQualifiedName: string;
    canHaveAnyAttribute: boolean;
    uxmlAttributesDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlAttributeDescription]
    uxmlChildElementsDescription: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.UxmlChildElementDescription]
    substituteForTypeName: string;
    substituteForTypeNamespace: string;
    substituteForTypeQualifiedName: string;
    AcceptsAttributeBag: () => boolean;
    Create: () => VisualElement;
  }
  //
  // Type: UnityEngine.UIElements.UxmlTypeRestriction
  //
  export interface UxmlTypeRestriction {
  }
  //
  // Type: UnityEngine.UIElements.UxmlValueMatches
  //
  export interface UxmlValueMatches {
    regex: string;
  }
  //
  // Type: UnityEngine.UIElements.UxmlValueBounds
  //
  export interface UxmlValueBounds {
    min: string;
    max: string;
    excludeMin: boolean;
    excludeMax: boolean;
  }
  //
  // Type: UnityEngine.UIElements.UxmlEnumeration
  //
  export interface UxmlEnumeration {
    values: any; // System.Collections.Generic.IEnumerable`1[System.String]
  }
  //
  // Type: UnityEngine.UIElements.VectorImage
  //
  export interface VectorImage {
    name: string;
    hideFlags: HideFlags;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.UIElements.VisualTreeAsset
  //
  export interface VisualTreeAsset {
    templateDependencies: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.VisualTreeAsset]
    stylesheets: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.UIElements.StyleSheet]
    contentHash: number;
    name: string;
    hideFlags: HideFlags;
    Instantiate: () => TemplateContainer;
    CloneTree: () => TemplateContainer;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.UIElements.CreationContext
  //
  export interface CreationContext {
    target: VisualElement;
    visualTreeAsset: VisualTreeAsset;
    slotInsertionPoints: any; // System.Collections.Generic.Dictionary`2[System.String,UnityEngine.UIElements.VisualElement]
  }
  //
  // Type: UnityEngine.UIElements.StyleSheets.Dimension+Unit
  //
  export interface Dimension_Unit {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.UIElements.StyleSheets.StyleSheetBuilder+ComplexSelectorScope
  //
  export interface StyleSheetBuilder_ComplexSelectorScope {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Experimental.Easing
  //
  export interface Easing {
  }
  //
  // Type: UnityEngine.UIElements.Experimental.StyleValues
  //
  export interface StyleValues {
    top: number;
    left: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
    color: Color;
    backgroundColor: Color;
    unityBackgroundImageTintColor: Color;
    borderColor: Color;
    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    borderLeftWidth: number;
    borderRightWidth: number;
    borderTopWidth: number;
    borderBottomWidth: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    opacity: number;
    flexGrow: number;
    flexShrink: number;
  }
  //
  // Type: UnityEngine.UIElements.Experimental.ITransitionAnimations
  //
  export interface ITransitionAnimations {
    Start: () => any;
    Layout: () => any;
    TopLeft: () => any;
    Size: () => any;
    Scale: () => any;
    Position: () => any;
    Rotation: () => any;
  }
  //
  // Type: UnityEngine.UIElements.Experimental.IValueAnimation
  //
  export interface IValueAnimation {
    isRunning: boolean;
    durationMs: number;
    Start: () => any;
    Stop: () => any;
    Recycle: () => any;
  }
  //
  // Type: UnityEngine.UIElements.UIR.UIRenderDevice+AllocationStatistics+PageStatistics
  //
  export interface UIRenderDevice_AllocationStatistics_PageStatistics {
  }
  //
  // Type: UnityEngine.TextCore.FaceInfo
  //
  export interface FaceInfo {
    familyName: string;
    styleName: string;
    pointSize: number;
    scale: number;
    lineHeight: number;
    ascentLine: number;
    capLine: number;
    meanLine: number;
    baseline: number;
    descentLine: number;
    superscriptOffset: number;
    superscriptSize: number;
    subscriptOffset: number;
    subscriptSize: number;
    underlineOffset: number;
    underlineThickness: number;
    strikethroughOffset: number;
    strikethroughThickness: number;
    tabWidth: number;
    Compare: () => boolean;
  }
  //
  // Type: UnityEngine.TextCore.GlyphRect
  //
  export interface GlyphRect {
    // static zero: GlyphRect;
    x: number;
    y: number;
    width: number;
    height: number;
  }
  //
  // Type: UnityEngine.TextCore.GlyphMetrics
  //
  export interface GlyphMetrics {
    width: number;
    height: number;
    horizontalBearingX: number;
    horizontalBearingY: number;
    horizontalAdvance: number;
  }
  //
  // Type: UnityEngine.TextCore.Glyph
  //
  export interface Glyph {
    index: any; // System.UInt32
    metrics: GlyphMetrics;
    glyphRect: GlyphRect;
    scale: number;
    atlasIndex: number;
    Compare: () => boolean;
  }
  //
  // Type: UnityEngine.TextCore.TextSettings+LineBreakingTable
  //
  export interface TextSettings_LineBreakingTable {
    leadingCharacters: any; // System.Collections.Generic.Dictionary`2[System.Int32,System.Char]
    followingCharacters: any; // System.Collections.Generic.Dictionary`2[System.Int32,System.Char]
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.FontFeatureLookupFlags
  //
  export interface FontFeatureLookupFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphValueRecord
  //
  export interface GlyphValueRecord {
    xPlacement: number;
    yPlacement: number;
    xAdvance: number;
    yAdvance: number;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord
  //
  export interface GlyphAdjustmentRecord {
    glyphIndex: any; // System.UInt32
    glyphValueRecord: GlyphValueRecord;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord
  //
  export interface GlyphPairAdjustmentRecord {
    firstAdjustmentRecord: GlyphAdjustmentRecord;
    secondAdjustmentRecord: GlyphAdjustmentRecord;
    featureLookupFlags: FontFeatureLookupFlags;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphLoadFlags
  //
  export interface GlyphLoadFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.FontEngineError
  //
  export interface FontEngineError {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphRenderMode
  //
  export interface GlyphRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.GlyphPackingMode
  //
  export interface GlyphPackingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.TextCore.LowLevel.FontEngine
  //
  export interface FontEngine {
  }
  //
  // Type: UnityEngine.SocialPlatforms.Local
  //
  export interface Local {
    localUser: ILocalUser;
    LoadUsers: () => any;
    ReportProgress: () => any;
    LoadAchievementDescriptions: () => any;
    LoadAchievements: () => any;
    ReportScore: () => any;
    LoadScores: () => any;
    ShowAchievementsUI: () => any;
    ShowLeaderboardUI: () => any;
    CreateLeaderboard: () => ILeaderboard;
    CreateAchievement: () => IAchievement;
  }
  //
  // Type: UnityEngine.SocialPlatforms.ISocialPlatform
  //
  export interface ISocialPlatform {
    localUser: ILocalUser;
    LoadUsers: () => any;
    ReportProgress: () => any;
    LoadAchievementDescriptions: () => any;
    LoadAchievements: () => any;
    CreateAchievement: () => IAchievement;
    ReportScore: () => any;
    LoadScores: () => any;
    CreateLeaderboard: () => ILeaderboard;
    ShowAchievementsUI: () => any;
    ShowLeaderboardUI: () => any;
    Authenticate: () => any;
    LoadFriends: () => any;
    GetLoading: () => boolean;
  }
  //
  // Type: UnityEngine.SocialPlatforms.ILocalUser
  //
  export interface ILocalUser {
    friends: IUserProfile[];
    authenticated: boolean;
    underage: boolean;
    Authenticate: () => any;
    LoadFriends: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.UserState
  //
  export interface UserState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.IUserProfile
  //
  export interface IUserProfile {
    userName: string;
    id: string;
    isFriend: boolean;
    state: UserState;
    image: Texture2D;
  }
  //
  // Type: UnityEngine.SocialPlatforms.IAchievement
  //
  export interface IAchievement {
    id: string;
    percentCompleted: number;
    completed: boolean;
    hidden: boolean;
    lastReportedDate: any; // System.DateTime
    ReportProgress: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.IAchievementDescription
  //
  export interface IAchievementDescription {
    id: string;
    title: string;
    image: Texture2D;
    achievedDescription: string;
    unachievedDescription: string;
    hidden: boolean;
    points: number;
  }
  //
  // Type: UnityEngine.SocialPlatforms.IScore
  //
  export interface IScore {
    leaderboardID: string;
    value: any; // System.Int64
    date: any; // System.DateTime
    formattedValue: string;
    userID: string;
    rank: number;
    ReportScore: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.UserScope
  //
  export interface UserScope {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.TimeScope
  //
  export interface TimeScope {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Range
  //
  export interface Range {
    from: number;
    count: number;
  }
  //
  // Type: UnityEngine.SocialPlatforms.ILeaderboard
  //
  export interface ILeaderboard {
    loading: boolean;
    id: string;
    userScope: UserScope;
    range: Range;
    timeScope: TimeScope;
    localUserScore: IScore;
    maxRange: any; // System.UInt32
    scores: IScore[];
    title: string;
    SetUserFilter: () => any;
    LoadScores: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.LocalUser
  //
  export interface LocalUser {
    friends: IUserProfile[];
    authenticated: boolean;
    underage: boolean;
    userName: string;
    id: string;
    legacyId: string;
    gameId: string;
    isFriend: boolean;
    state: UserState;
    image: Texture2D;
    Authenticate: () => any;
    LoadFriends: () => any;
    SetFriends: () => any;
    SetAuthenticated: () => any;
    SetUnderage: () => any;
    SetUserName: () => any;
    SetUserID: () => any;
    SetLegacyUserID: () => any;
    SetUserGameID: () => any;
    SetImage: () => any;
    SetIsFriend: () => any;
    SetState: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.UserProfile
  //
  export interface UserProfile {
    userName: string;
    id: string;
    legacyId: string;
    gameId: string;
    isFriend: boolean;
    state: UserState;
    image: Texture2D;
    SetUserName: () => any;
    SetUserID: () => any;
    SetLegacyUserID: () => any;
    SetUserGameID: () => any;
    SetImage: () => any;
    SetIsFriend: () => any;
    SetState: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.Achievement
  //
  export interface Achievement {
    id: string;
    percentCompleted: number;
    completed: boolean;
    hidden: boolean;
    lastReportedDate: any; // System.DateTime
    ReportProgress: () => any;
    SetCompleted: () => any;
    SetHidden: () => any;
    SetLastReportedDate: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.AchievementDescription
  //
  export interface AchievementDescription {
    id: string;
    title: string;
    image: Texture2D;
    achievedDescription: string;
    unachievedDescription: string;
    hidden: boolean;
    points: number;
    SetImage: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.Score
  //
  export interface Score {
    leaderboardID: string;
    value: any; // System.Int64
    date: any; // System.DateTime
    formattedValue: string;
    userID: string;
    rank: number;
    ReportScore: () => any;
    SetDate: () => any;
    SetFormattedValue: () => any;
    SetUserID: () => any;
    SetRank: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.Impl.Leaderboard
  //
  export interface Leaderboard {
    loading: boolean;
    id: string;
    userScope: UserScope;
    range: Range;
    timeScope: TimeScope;
    localUserScore: IScore;
    maxRange: any; // System.UInt32
    scores: IScore[];
    title: string;
    SetUserFilter: () => any;
    LoadScores: () => any;
    SetLocalUserScore: () => any;
    SetMaxRange: () => any;
    SetScores: () => any;
    SetTitle: () => any;
    GetUserFilter: () => any;
  }
  //
  // Type: UnityEngine.SocialPlatforms.GameCenter.GameCenterPlatform
  //
  export interface GameCenterPlatform {
    localUser: ILocalUser;
    LoadAchievementDescriptions: () => any;
    ReportProgress: () => any;
    LoadAchievements: () => any;
    ReportScore: () => any;
    LoadScores: () => any;
    GetLoading: () => boolean;
    ShowAchievementsUI: () => any;
    ShowLeaderboardUI: () => any;
    LoadUsers: () => any;
    CreateLeaderboard: () => ILeaderboard;
    CreateAchievement: () => IAchievement;
  }
  //
  // Type: UnityEngine.Video.VideoClip
  //
  export interface VideoClip {
    originalPath: string;
    frameCount: any; // System.UInt64
    frameRate: number;
    length: number;
    width: any; // System.UInt32
    height: any; // System.UInt32
    pixelAspectRatioNumerator: any; // System.UInt32
    pixelAspectRatioDenominator: any; // System.UInt32
    sRGB: boolean;
    audioTrackCount: any; // System.UInt16
    name: string;
    hideFlags: HideFlags;
    GetAudioChannelCount: () => any;
    GetAudioSampleRate: () => any;
    GetAudioLanguage: () => string;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Video.VideoRenderMode
  //
  export interface VideoRenderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.Video3DLayout
  //
  export interface Video3DLayout {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoAspectRatio
  //
  export interface VideoAspectRatio {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoTimeSource
  //
  export interface VideoTimeSource {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoTimeReference
  //
  export interface VideoTimeReference {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoSource
  //
  export interface VideoSource {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoAudioOutputMode
  //
  export interface VideoAudioOutputMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoPlayer
  //
  export interface VideoPlayer {
    // static controlledAudioTrackMaxCount: any; // System.UInt16
    source: VideoSource;
    url: string;
    clip: VideoClip;
    renderMode: VideoRenderMode;
    targetCamera: Camera;
    targetTexture: RenderTexture;
    targetMaterialRenderer: Renderer;
    targetMaterialProperty: string;
    aspectRatio: VideoAspectRatio;
    targetCameraAlpha: number;
    targetCamera3DLayout: Video3DLayout;
    texture: Texture;
    isPrepared: boolean;
    waitForFirstFrame: boolean;
    playOnAwake: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    canSetTime: boolean;
    time: number;
    frame: any; // System.Int64
    clockTime: number;
    canStep: boolean;
    canSetPlaybackSpeed: boolean;
    playbackSpeed: number;
    isLooping: boolean;
    canSetTimeSource: boolean;
    timeSource: VideoTimeSource;
    timeReference: VideoTimeReference;
    externalReferenceTime: number;
    canSetSkipOnDrop: boolean;
    skipOnDrop: boolean;
    frameCount: any; // System.UInt64
    frameRate: number;
    length: number;
    width: any; // System.UInt32
    height: any; // System.UInt32
    pixelAspectRatioNumerator: any; // System.UInt32
    pixelAspectRatioDenominator: any; // System.UInt32
    audioTrackCount: any; // System.UInt16
    controlledAudioTrackCount: any; // System.UInt16
    audioOutputMode: VideoAudioOutputMode;
    canSetDirectAudioVolume: boolean;
    sendFrameReadyEvents: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetAudioLanguageCode: () => string;
    GetAudioChannelCount: () => any;
    GetAudioSampleRate: () => any;
    EnableAudioTrack: () => any;
    IsAudioTrackEnabled: () => boolean;
    GetDirectAudioVolume: () => number;
    SetDirectAudioVolume: () => any;
    GetDirectAudioMute: () => boolean;
    SetDirectAudioMute: () => any;
    GetTargetAudioSource: () => AudioSource;
    SetTargetAudioSource: () => any;
    Prepare: () => any;
    Play: () => any;
    Pause: () => any;
    Stop: () => any;
    StepForward: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Video.VideoPlayer+EventHandler
  //
  export interface VideoPlayer_EventHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoPlayer+ErrorEventHandler
  //
  export interface VideoPlayer_ErrorEventHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoPlayer+FrameReadyEventHandler
  //
  export interface VideoPlayer_FrameReadyEventHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Video.VideoPlayer+TimeEventHandler
  //
  export interface VideoPlayer_TimeEventHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.VFX.VFXCameraBufferTypes
  //
  export interface VFXCameraBufferTypes {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.VFX.VFXEventAttribute
  //
  export interface VFXEventAttribute {
    Dispose: () => any;
    HasBool: () => boolean;
    HasInt: () => boolean;
    HasUint: () => boolean;
    HasFloat: () => boolean;
    HasVector2: () => boolean;
    HasVector3: () => boolean;
    HasVector4: () => boolean;
    HasMatrix4x4: () => boolean;
    SetBool: () => any;
    SetInt: () => any;
    SetUint: () => any;
    SetFloat: () => any;
    SetVector2: () => any;
    SetVector3: () => any;
    SetVector4: () => any;
    SetMatrix4x4: () => any;
    GetBool: () => boolean;
    GetInt: () => number;
    GetUint: () => any;
    GetFloat: () => number;
    GetVector2: () => Vector2;
    GetVector3: () => Vector3;
    GetVector4: () => Vector4;
    GetMatrix4x4: () => Matrix4x4;
    CopyValuesFrom: () => any;
  }
  //
  // Type: UnityEngine.VFX.VFXExpressionValues
  //
  export interface VFXExpressionValues {
    GetBool: () => boolean;
    GetInt: () => number;
    GetUInt: () => any;
    GetFloat: () => number;
    GetVector2: () => Vector2;
    GetVector3: () => Vector3;
    GetVector4: () => Vector4;
    GetMatrix4x4: () => Matrix4x4;
    GetTexture: () => Texture;
    GetMesh: () => Mesh;
    GetAnimationCurve: () => AnimationCurve;
    GetGradient: () => Gradient;
  }
  //
  // Type: UnityEngine.VFX.VFXManager
  //
  export interface VFXManager {
    // static fixedTimeStep: number;
    // static maxDeltaTime: number;
  }
  //
  // Type: UnityEngine.VFX.VFXSpawnerCallbacks
  //
  export interface VFXSpawnerCallbacks {
    name: string;
    hideFlags: HideFlags;
    OnPlay: () => any;
    OnUpdate: () => any;
    OnStop: () => any;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.VFX.VFXSpawnerLoopState
  //
  export interface VFXSpawnerLoopState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.VFX.VFXSpawnerState
  //
  export interface VFXSpawnerState {
    playing: boolean;
    newLoop: boolean;
    loopState: VFXSpawnerLoopState;
    spawnCount: number;
    deltaTime: number;
    totalTime: number;
    delayBeforeLoop: number;
    loopDuration: number;
    delayAfterLoop: number;
    loopIndex: number;
    loopCount: number;
    vfxEventAttribute: VFXEventAttribute;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.VFX.VFXExposedProperty
  //
  export interface VFXExposedProperty {
    name: string;
    type: any; // System.Type
  }
  //
  // Type: UnityEngine.VFX.VisualEffectObject
  //
  export interface VisualEffectObject {
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.VFX.VisualEffectAsset
  //
  export interface VisualEffectAsset {
    name: string;
    hideFlags: HideFlags;
    GetTextureDimension: () => TextureDimension;
    GetExposedProperties: () => any;
    GetEvents: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.VFX.VFXOutputEventArgs
  //
  export interface VFXOutputEventArgs {
    nameId: number;
    eventAttribute: VFXEventAttribute;
  }
  //
  // Type: UnityEngine.VFX.VisualEffect
  //
  export interface VisualEffect {
    pause: boolean;
    playRate: number;
    startSeed: any; // System.UInt32
    resetSeedOnPlay: boolean;
    initialEventID: number;
    initialEventName: string;
    culled: boolean;
    visualEffectAsset: VisualEffectAsset;
    aliveParticleCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    outputEventReceived: any; // System.Action`1[UnityEngine.VFX.VFXOutputEventArgs]
    GetParticleSystemInfo: () => VFXParticleSystemInfo;
    GetSpawnSystemInfo: () => any;
    GetSystemNames: () => any;
    GetParticleSystemNames: () => any;
    GetOutputEventNames: () => any;
    GetSpawnSystemNames: () => any;
    ResetOverride: () => any;
    HasInt: () => boolean;
    HasUInt: () => boolean;
    HasFloat: () => boolean;
    HasVector2: () => boolean;
    HasVector3: () => boolean;
    HasVector4: () => boolean;
    HasMatrix4x4: () => boolean;
    HasTexture: () => boolean;
    GetTextureDimension: () => TextureDimension;
    HasAnimationCurve: () => boolean;
    HasGradient: () => boolean;
    HasMesh: () => boolean;
    HasBool: () => boolean;
    SetInt: () => any;
    SetUInt: () => any;
    SetFloat: () => any;
    SetVector2: () => any;
    SetVector3: () => any;
    SetVector4: () => any;
    SetMatrix4x4: () => any;
    SetTexture: () => any;
    SetAnimationCurve: () => any;
    SetGradient: () => any;
    SetMesh: () => any;
    SetBool: () => any;
    GetInt: () => number;
    GetUInt: () => any;
    GetFloat: () => number;
    GetVector2: () => Vector2;
    GetVector3: () => Vector3;
    GetVector4: () => Vector4;
    GetMatrix4x4: () => Matrix4x4;
    GetTexture: () => Texture;
    GetMesh: () => Mesh;
    GetBool: () => boolean;
    GetAnimationCurve: () => AnimationCurve;
    GetGradient: () => Gradient;
    HasSystem: () => boolean;
    Simulate: () => any;
    CreateVFXEventAttribute: () => VFXEventAttribute;
    SendEvent: () => any;
    Play: () => any;
    Stop: () => any;
    Reinit: () => any;
    AdvanceOneFrame: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.VFX.VFXParticleSystemInfo
  //
  export interface VFXParticleSystemInfo {
    aliveCount: any; // System.UInt32
    capacity: any; // System.UInt32
    sleeping: boolean;
    bounds: Bounds;
  }
  //
  // Type: UnityEngine.Tilemaps.ITilemap
  //
  export interface ITilemap {
    origin: Vector3Int;
    size: Vector3Int;
    localBounds: Bounds;
    cellBounds: BoundsInt;
    GetSprite: () => Sprite;
    GetColor: () => Color;
    GetTransformMatrix: () => Matrix4x4;
    GetTileFlags: () => TileFlags;
    GetTile: () => TileBase;
    RefreshTile: () => any;
    GetComponent: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.Tile
  //
  export interface Tile {
    sprite: Sprite;
    color: Color;
    transform: Matrix4x4;
    gameObject: GameObject;
    flags: TileFlags;
    colliderType: Tile_ColliderType;
    name: string;
    hideFlags: HideFlags;
    GetTileData: () => any;
    RefreshTile: () => any;
    GetTileAnimationData: () => boolean;
    StartUp: () => boolean;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Tilemaps.Tile+ColliderType
  //
  export interface Tile_ColliderType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.TileBase
  //
  export interface TileBase {
    name: string;
    hideFlags: HideFlags;
    RefreshTile: () => any;
    GetTileData: () => any;
    GetTileAnimationData: () => boolean;
    StartUp: () => boolean;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Tilemaps.Tilemap
  //
  export interface Tilemap {
    layoutGrid: Grid;
    cellBounds: BoundsInt;
    localBounds: Bounds;
    animationFrameRate: number;
    color: Color;
    origin: Vector3Int;
    size: Vector3Int;
    tileAnchor: Vector3;
    orientation: Tilemap_Orientation;
    orientationMatrix: Matrix4x4;
    editorPreviewOrigin: Vector3Int;
    editorPreviewSize: Vector3Int;
    cellSize: Vector3;
    cellGap: Vector3;
    cellLayout: GridLayout_CellLayout;
    cellSwizzle: GridLayout_CellSwizzle;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetEditorPreviewTile: () => any;
    HasEditorPreviewTile: () => boolean;
    GetEditorPreviewSprite: () => Sprite;
    GetEditorPreviewTransformMatrix: () => Matrix4x4;
    SetEditorPreviewTransformMatrix: () => any;
    GetEditorPreviewColor: () => Color;
    SetEditorPreviewColor: () => any;
    GetEditorPreviewTileFlags: () => TileFlags;
    EditorPreviewFloodFill: () => any;
    EditorPreviewBoxFill: () => any;
    ClearAllEditorPreviewTiles: () => any;
    GetCellCenterLocal: () => Vector3;
    GetCellCenterWorld: () => Vector3;
    GetTile: () => TileBase;
    GetTilesBlock: () => TileBase[];
    SetTile: () => any;
    SetTiles: () => any;
    SetTilesBlock: () => any;
    HasTile: () => boolean;
    RefreshTile: () => any;
    RefreshAllTiles: () => any;
    SwapTile: () => any;
    ContainsTile: () => boolean;
    GetUsedTilesCount: () => number;
    GetUsedTilesNonAlloc: () => number;
    GetSprite: () => Sprite;
    GetTransformMatrix: () => Matrix4x4;
    SetTransformMatrix: () => any;
    GetColor: () => Color;
    SetColor: () => any;
    GetTileFlags: () => TileFlags;
    SetTileFlags: () => any;
    AddTileFlags: () => any;
    RemoveTileFlags: () => any;
    GetInstantiatedObject: () => GameObject;
    GetObjectToInstantiate: () => GameObject;
    SetColliderType: () => any;
    GetColliderType: () => Tile_ColliderType;
    FloodFill: () => any;
    BoxFill: () => any;
    InsertCells: () => any;
    DeleteCells: () => any;
    ClearAllTiles: () => any;
    ResizeBounds: () => any;
    CompressBounds: () => any;
    GetEditorPreviewTile: () => TileBase;
    GetBoundsLocal: () => Bounds;
    CellToLocal: () => Vector3;
    LocalToCell: () => Vector3Int;
    CellToLocalInterpolated: () => Vector3;
    LocalToCellInterpolated: () => Vector3;
    CellToWorld: () => Vector3;
    WorldToCell: () => Vector3Int;
    LocalToWorld: () => Vector3;
    WorldToLocal: () => Vector3;
    GetLayoutCellCenter: () => Vector3;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Tilemaps.Tilemap+Orientation
  //
  export interface Tilemap_Orientation {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.Tilemap+SyncTile
  //
  export interface Tilemap_SyncTile {
    position: Vector3Int;
    tile: TileBase;
    tileData: TileData;
  }
  //
  // Type: UnityEngine.Tilemaps.TileFlags
  //
  export interface TileFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.TilemapRenderer
  //
  export interface TilemapRenderer {
    chunkSize: Vector3Int;
    chunkCullingBounds: Vector3;
    maxChunkCount: number;
    maxFrameAge: number;
    sortOrder: TilemapRenderer_SortOrder;
    mode: TilemapRenderer_Mode;
    detectChunkCullingBounds: TilemapRenderer_DetectChunkCullingBounds;
    maskInteraction: SpriteMaskInteraction;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Tilemaps.TilemapRenderer+SortOrder
  //
  export interface TilemapRenderer_SortOrder {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.TilemapRenderer+Mode
  //
  export interface TilemapRenderer_Mode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.TilemapRenderer+DetectChunkCullingBounds
  //
  export interface TilemapRenderer_DetectChunkCullingBounds {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Tilemaps.TileData
  //
  export interface TileData {
    sprite: Sprite;
    color: Color;
    transform: Matrix4x4;
    gameObject: GameObject;
    flags: TileFlags;
    colliderType: Tile_ColliderType;
  }
  //
  // Type: UnityEngine.Tilemaps.TileAnimationData
  //
  export interface TileAnimationData {
    animatedSprites: Sprite[];
    animationSpeed: number;
    animationStartTime: number;
  }
  //
  // Type: UnityEngine.Tilemaps.TilemapCollider2D
  //
  export interface TilemapCollider2D {
    maximumTileChangeCount: any; // System.UInt32
    extrusionFactor: number;
    hasTilemapChanges: boolean;
    density: number;
    isTrigger: boolean;
    usedByEffector: boolean;
    usedByComposite: boolean;
    composite: CompositeCollider2D;
    offset: Vector2;
    attachedRigidbody: Rigidbody2D;
    shapeCount: number;
    bounds: Bounds;
    sharedMaterial: PhysicsMaterial2D;
    friction: number;
    bounciness: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    ProcessTilemapChanges: () => any;
    CreateMesh: () => Mesh;
    GetShapeHash: () => any;
    IsTouching: () => boolean;
    IsTouchingLayers: () => boolean;
    OverlapPoint: () => boolean;
    Distance: () => ColliderDistance2D;
    OverlapCollider: () => number;
    GetContacts: () => number;
    Cast: () => number;
    Raycast: () => number;
    ClosestPoint: () => Vector2;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Subsystems.ExampleSubsystem
  //
  export interface ExampleSubsystem {
    subsystemDescriptor: ExampleSubsystemDescriptor;
    SubsystemDescriptor: ExampleSubsystemDescriptor;
    running: boolean;
    PrintExample: () => any;
    GetBool: () => boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.Subsystems.ExampleSubsystemDescriptor
  //
  export interface ExampleSubsystemDescriptor {
    supportsEditorMode: boolean;
    disableBackbufferMSAA: boolean;
    stereoscopicBackbuffer: boolean;
    usePBufferEGL: boolean;
    id: string;
    Create: () => ExampleSubsystem;
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.SubsystemDescriptorStore
  //
  export interface SubsystemDescriptorStore {
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.SubsystemDescriptorWithProvider
  //
  export interface SubsystemDescriptorWithProvider {
    id: string;
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.SubsystemProvider
  //
  export interface SubsystemProvider {
    running: boolean;
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.SubsystemWithProvider
  //
  export interface SubsystemWithProvider {
    running: boolean;
    Start: () => any;
    Stop: () => any;
    Destroy: () => any;
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.Extensions.SubsystemDescriptorExtensions
  //
  export interface SubsystemDescriptorExtensions {
  }
  //
  // Type: UnityEngine.SubsystemsImplementation.Extensions.SubsystemExtensions
  //
  export interface SubsystemExtensions {
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.IJobParticleSystem
  //
  export interface IJobParticleSystem {
    Execute: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.IJobParticleSystemParallelFor
  //
  export interface IJobParticleSystemParallelFor {
    Execute: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.IJobParticleSystemParallelForBatch
  //
  export interface IJobParticleSystemParallelForBatch {
    Execute: () => any;
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.IParticleSystemJobExtensions
  //
  export interface IParticleSystemJobExtensions {
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.ParticleSystemNativeArray3
  //
  export interface ParticleSystemNativeArray3 {
    x: any; // Unity.Collections.NativeArray`1[System.Single]
    y: any; // Unity.Collections.NativeArray`1[System.Single]
    z: any; // Unity.Collections.NativeArray`1[System.Single]
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.ParticleSystemNativeArray4
  //
  export interface ParticleSystemNativeArray4 {
    x: any; // Unity.Collections.NativeArray`1[System.Single]
    y: any; // Unity.Collections.NativeArray`1[System.Single]
    z: any; // Unity.Collections.NativeArray`1[System.Single]
    w: any; // Unity.Collections.NativeArray`1[System.Single]
  }
  //
  // Type: UnityEngine.ParticleSystemJobs.ParticleSystemJobData
  //
  export interface ParticleSystemJobData {
    count: number;
    positions: ParticleSystemNativeArray3;
    velocities: ParticleSystemNativeArray3;
    rotations: ParticleSystemNativeArray3;
    rotationalSpeeds: ParticleSystemNativeArray3;
    sizes: ParticleSystemNativeArray3;
    startColors: any; // Unity.Collections.NativeArray`1[UnityEngine.Color32]
    aliveTimePercent: any; // Unity.Collections.NativeArray`1[System.Single]
    inverseStartLifetimes: any; // Unity.Collections.NativeArray`1[System.Single]
    randomSeeds: any; // Unity.Collections.NativeArray`1[System.UInt32]
    customData1: ParticleSystemNativeArray4;
    customData2: ParticleSystemNativeArray4;
  }
  //
  // Type: UnityEngine.Audio.AudioClipPlayable
  //
  export interface AudioClipPlayable {
    GetHandle: () => PlayableHandle;
    GetClip: () => AudioClip;
    SetClip: () => any;
    GetLooped: () => boolean;
    SetLooped: () => any;
    IsPlaying: () => boolean;
    IsChannelPlaying: () => boolean;
    GetStartDelay: () => number;
    GetPauseDelay: () => number;
    Seek: () => any;
  }
  //
  // Type: UnityEngine.Audio.AudioMixerUpdateMode
  //
  export interface AudioMixerUpdateMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Audio.AudioMixer
  //
  export interface AudioMixer {
    outputAudioMixerGroup: AudioMixerGroup;
    updateMode: AudioMixerUpdateMode;
    name: string;
    hideFlags: HideFlags;
    FindSnapshot: () => AudioMixerSnapshot;
    FindMatchingGroups: () => AudioMixerGroup[];
    TransitionToSnapshots: () => any;
    SetFloat: () => boolean;
    ClearFloat: () => boolean;
    GetFloat: () => boolean;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Audio.AudioMixerGroup
  //
  export interface AudioMixerGroup {
    audioMixer: AudioMixer;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Audio.AudioMixerPlayable
  //
  export interface AudioMixerPlayable {
    GetHandle: () => PlayableHandle;
  }
  //
  // Type: UnityEngine.Audio.AudioMixerSnapshot
  //
  export interface AudioMixerSnapshot {
    audioMixer: AudioMixer;
    name: string;
    hideFlags: HideFlags;
    TransitionTo: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Audio.AudioPlayableBinding
  //
  export interface AudioPlayableBinding {
  }
  //
  // Type: UnityEngine.Audio.AudioPlayableOutput
  //
  export interface AudioPlayableOutput {
    // static Null: AudioPlayableOutput;
    GetHandle: () => PlayableOutputHandle;
    GetTarget: () => AudioSource;
    SetTarget: () => any;
    GetEvaluateOnSeek: () => boolean;
    SetEvaluateOnSeek: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationPlayableBinding
  //
  export interface AnimationPlayableBinding {
  }
  //
  // Type: UnityEngine.Animations.IAnimationJob
  //
  export interface IAnimationJob {
    ProcessAnimation: () => any;
    ProcessRootMotion: () => any;
  }
  //
  // Type: UnityEngine.Animations.IAnimationJobPlayable
  //
  export interface IAnimationJobPlayable {
    GetJobData: () => any;
    SetJobData: () => any;
  }
  //
  // Type: UnityEngine.Animations.IAnimationWindowPreview
  //
  export interface IAnimationWindowPreview {
    StartPreview: () => any;
    StopPreview: () => any;
    UpdatePreviewGraph: () => any;
    BuildPreviewGraph: () => Playable;
  }
  //
  // Type: UnityEngine.Animations.AimConstraint
  //
  export interface AimConstraint {
    weight: number;
    constraintActive: boolean;
    locked: boolean;
    rotationAtRest: Vector3;
    rotationOffset: Vector3;
    rotationAxis: Axis;
    aimVector: Vector3;
    upVector: Vector3;
    worldUpVector: Vector3;
    worldUpObject: Transform;
    worldUpType: AimConstraint_WorldUpType;
    sourceCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Animations.AimConstraint+WorldUpType
  //
  export interface AimConstraint_WorldUpType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationClipPlayable
  //
  export interface AnimationClipPlayable {
    GetHandle: () => PlayableHandle;
    GetAnimationClip: () => AnimationClip;
    GetApplyFootIK: () => boolean;
    SetApplyFootIK: () => any;
    GetApplyPlayableIK: () => boolean;
    SetApplyPlayableIK: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationHumanStream
  //
  export interface AnimationHumanStream {
    isValid: boolean;
    humanScale: number;
    leftFootHeight: number;
    rightFootHeight: number;
    bodyLocalPosition: Vector3;
    bodyLocalRotation: Quaternion;
    bodyPosition: Vector3;
    bodyRotation: Quaternion;
    leftFootVelocity: Vector3;
    rightFootVelocity: Vector3;
    GetMuscle: () => number;
    SetMuscle: () => any;
    ResetToStancePose: () => any;
    GetGoalPositionFromPose: () => Vector3;
    GetGoalRotationFromPose: () => Quaternion;
    GetGoalLocalPosition: () => Vector3;
    SetGoalLocalPosition: () => any;
    GetGoalLocalRotation: () => Quaternion;
    SetGoalLocalRotation: () => any;
    GetGoalPosition: () => Vector3;
    SetGoalPosition: () => any;
    GetGoalRotation: () => Quaternion;
    SetGoalRotation: () => any;
    SetGoalWeightPosition: () => any;
    SetGoalWeightRotation: () => any;
    GetGoalWeightPosition: () => number;
    GetGoalWeightRotation: () => number;
    GetHintPosition: () => Vector3;
    SetHintPosition: () => any;
    SetHintWeightPosition: () => any;
    GetHintWeightPosition: () => number;
    SetLookAtPosition: () => any;
    SetLookAtClampWeight: () => any;
    SetLookAtBodyWeight: () => any;
    SetLookAtHeadWeight: () => any;
    SetLookAtEyesWeight: () => any;
    SolveIK: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationLayerMixerPlayable
  //
  export interface AnimationLayerMixerPlayable {
    // static Null: AnimationLayerMixerPlayable;
    GetHandle: () => PlayableHandle;
    IsLayerAdditive: () => boolean;
    SetLayerAdditive: () => any;
    SetLayerMaskFromAvatarMask: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationMixerPlayable
  //
  export interface AnimationMixerPlayable {
    // static Null: AnimationMixerPlayable;
    GetHandle: () => PlayableHandle;
  }
  //
  // Type: UnityEngine.Animations.AnimationPlayableExtensions
  //
  export interface AnimationPlayableExtensions {
  }
  //
  // Type: UnityEngine.Animations.AnimationPlayableOutput
  //
  export interface AnimationPlayableOutput {
    // static Null: AnimationPlayableOutput;
    GetHandle: () => PlayableOutputHandle;
    GetTarget: () => Animator;
    SetTarget: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationScriptPlayable
  //
  export interface AnimationScriptPlayable {
    // static Null: AnimationScriptPlayable;
    GetHandle: () => PlayableHandle;
    GetJobData: () => any;
    SetJobData: () => any;
    SetProcessInputs: () => any;
    GetProcessInputs: () => boolean;
  }
  //
  // Type: UnityEngine.Animations.AnimationStream
  //
  export interface AnimationStream {
    isValid: boolean;
    deltaTime: number;
    velocity: Vector3;
    angularVelocity: Vector3;
    rootMotionPosition: Vector3;
    rootMotionRotation: Quaternion;
    isHumanStream: boolean;
    inputStreamCount: number;
    AsHuman: () => AnimationHumanStream;
    GetInputStream: () => AnimationStream;
    GetInputWeight: () => number;
    CopyAnimationStreamMotion: () => any;
  }
  //
  // Type: UnityEngine.Animations.TransformStreamHandle
  //
  export interface TransformStreamHandle {
    IsValid: () => boolean;
    Resolve: () => any;
    IsResolved: () => boolean;
    GetPosition: () => Vector3;
    SetPosition: () => any;
    GetRotation: () => Quaternion;
    SetRotation: () => any;
    GetLocalPosition: () => Vector3;
    SetLocalPosition: () => any;
    GetLocalRotation: () => Quaternion;
    SetLocalRotation: () => any;
    GetLocalScale: () => Vector3;
    SetLocalScale: () => any;
    GetPositionReadMask: () => boolean;
    GetRotationReadMask: () => boolean;
    GetScaleReadMask: () => boolean;
    GetLocalTRS: () => any;
    SetLocalTRS: () => any;
    GetGlobalTR: () => any;
    SetGlobalTR: () => any;
  }
  //
  // Type: UnityEngine.Animations.PropertyStreamHandle
  //
  export interface PropertyStreamHandle {
    IsValid: () => boolean;
    Resolve: () => any;
    IsResolved: () => boolean;
    GetFloat: () => number;
    SetFloat: () => any;
    GetInt: () => number;
    SetInt: () => any;
    GetBool: () => boolean;
    SetBool: () => any;
    GetReadMask: () => boolean;
  }
  //
  // Type: UnityEngine.Animations.TransformSceneHandle
  //
  export interface TransformSceneHandle {
    IsValid: () => boolean;
    GetPosition: () => Vector3;
    SetPosition: () => any;
    GetLocalPosition: () => Vector3;
    SetLocalPosition: () => any;
    GetRotation: () => Quaternion;
    SetRotation: () => any;
    GetLocalRotation: () => Quaternion;
    SetLocalRotation: () => any;
    GetLocalScale: () => Vector3;
    GetLocalTRS: () => any;
    GetGlobalTR: () => any;
    SetLocalScale: () => any;
  }
  //
  // Type: UnityEngine.Animations.PropertySceneHandle
  //
  export interface PropertySceneHandle {
    IsValid: () => boolean;
    Resolve: () => any;
    IsResolved: () => boolean;
    GetFloat: () => number;
    SetFloat: () => any;
    GetInt: () => number;
    SetInt: () => any;
    GetBool: () => boolean;
    SetBool: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimationSceneHandleUtility
  //
  export interface AnimationSceneHandleUtility {
  }
  //
  // Type: UnityEngine.Animations.AnimationStreamHandleUtility
  //
  export interface AnimationStreamHandleUtility {
  }
  //
  // Type: UnityEngine.Animations.AnimatorControllerPlayable
  //
  export interface AnimatorControllerPlayable {
    // static Null: AnimatorControllerPlayable;
    GetHandle: () => PlayableHandle;
    SetHandle: () => any;
    GetFloat: () => number;
    SetFloat: () => any;
    GetBool: () => boolean;
    SetBool: () => any;
    GetInteger: () => number;
    SetInteger: () => any;
    SetTrigger: () => any;
    ResetTrigger: () => any;
    IsParameterControlledByCurve: () => boolean;
    GetLayerCount: () => number;
    GetLayerName: () => string;
    GetLayerIndex: () => number;
    GetLayerWeight: () => number;
    SetLayerWeight: () => any;
    GetCurrentAnimatorStateInfo: () => AnimatorStateInfo;
    GetNextAnimatorStateInfo: () => AnimatorStateInfo;
    GetAnimatorTransitionInfo: () => AnimatorTransitionInfo;
    GetCurrentAnimatorClipInfo: () => AnimatorClipInfo[];
    GetNextAnimatorClipInfo: () => any;
    GetCurrentAnimatorClipInfoCount: () => number;
    GetNextAnimatorClipInfoCount: () => number;
    IsInTransition: () => boolean;
    GetParameterCount: () => number;
    GetParameter: () => AnimatorControllerParameter;
    CrossFadeInFixedTime: () => any;
    CrossFade: () => any;
    PlayInFixedTime: () => any;
    Play: () => any;
    HasState: () => boolean;
  }
  //
  // Type: UnityEngine.Animations.CustomStreamPropertyType
  //
  export interface CustomStreamPropertyType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Animations.AnimatorJobExtensions
  //
  export interface AnimatorJobExtensions {
  }
  //
  // Type: UnityEngine.Animations.Axis
  //
  export interface Axis {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Animations.ConstraintSource
  //
  export interface ConstraintSource {
    sourceTransform: Transform;
    weight: number;
  }
  //
  // Type: UnityEngine.Animations.IConstraint
  //
  export interface IConstraint {
    weight: number;
    constraintActive: boolean;
    locked: boolean;
    sourceCount: number;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetSources: () => any;
    SetSources: () => any;
  }
  //
  // Type: UnityEngine.Animations.PositionConstraint
  //
  export interface PositionConstraint {
    weight: number;
    translationAtRest: Vector3;
    translationOffset: Vector3;
    translationAxis: Axis;
    constraintActive: boolean;
    locked: boolean;
    sourceCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Animations.RotationConstraint
  //
  export interface RotationConstraint {
    weight: number;
    rotationAtRest: Vector3;
    rotationOffset: Vector3;
    rotationAxis: Axis;
    constraintActive: boolean;
    locked: boolean;
    sourceCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Animations.ScaleConstraint
  //
  export interface ScaleConstraint {
    weight: number;
    scaleAtRest: Vector3;
    scaleOffset: Vector3;
    scalingAxis: Axis;
    constraintActive: boolean;
    locked: boolean;
    sourceCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Animations.LookAtConstraint
  //
  export interface LookAtConstraint {
    weight: number;
    roll: number;
    constraintActive: boolean;
    locked: boolean;
    rotationAtRest: Vector3;
    rotationOffset: Vector3;
    worldUpObject: Transform;
    useUpObject: boolean;
    sourceCount: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Animations.MuscleHandle
  //
  export interface MuscleHandle {
    // static muscleHandleCount: number;
    humanPartDof: HumanPartDof;
    dof: number;
    name: string;
  }
  //
  // Type: UnityEngine.Animations.ParentConstraint
  //
  export interface ParentConstraint {
    weight: number;
    constraintActive: boolean;
    locked: boolean;
    sourceCount: number;
    translationAtRest: Vector3;
    rotationAtRest: Vector3;
    translationOffsets: Vector3[];
    rotationOffsets: Vector3[];
    translationAxis: Axis;
    rotationAxis: Axis;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetTranslationOffset: () => Vector3;
    SetTranslationOffset: () => any;
    GetRotationOffset: () => Vector3;
    SetRotationOffset: () => any;
    GetSources: () => any;
    SetSources: () => any;
    AddSource: () => number;
    RemoveSource: () => any;
    GetSource: () => ConstraintSource;
    SetSource: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Android.AndroidDevice
  //
  export interface AndroidDevice {
  }
  //
  // Type: UnityEngine.Android.PermissionCallbacks
  //
  export interface PermissionCallbacks {
    javaInterface: AndroidJavaClass;
    Invoke: () => AndroidJavaObject;
    equals: () => boolean;
    hashCode: () => number;
    toString: () => string;
  }
  //
  // Type: UnityEngine.Android.Permission
  //
  export interface Permission {
  }
  //
  // Type: UnityEngine.AI.NavMeshPathStatus
  //
  export interface NavMeshPathStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshPath
  //
  export interface NavMeshPath {
    corners: Vector3[];
    status: NavMeshPathStatus;
    GetCornersNonAlloc: () => number;
    ClearCorners: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuilder
  //
  export interface NavMeshBuilder {
  }
  //
  // Type: UnityEngine.AI.ObstacleAvoidanceType
  //
  export interface ObstacleAvoidanceType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshAgent
  //
  export interface NavMeshAgent {
    destination: Vector3;
    stoppingDistance: number;
    velocity: Vector3;
    nextPosition: Vector3;
    steeringTarget: Vector3;
    desiredVelocity: Vector3;
    remainingDistance: number;
    baseOffset: number;
    isOnOffMeshLink: boolean;
    currentOffMeshLinkData: OffMeshLinkData;
    nextOffMeshLinkData: OffMeshLinkData;
    autoTraverseOffMeshLink: boolean;
    autoBraking: boolean;
    autoRepath: boolean;
    hasPath: boolean;
    pathPending: boolean;
    isPathStale: boolean;
    pathStatus: NavMeshPathStatus;
    pathEndPosition: Vector3;
    isStopped: boolean;
    path: NavMeshPath;
    navMeshOwner: Object;
    agentTypeID: number;
    walkableMask: number;
    areaMask: number;
    speed: number;
    angularSpeed: number;
    acceleration: number;
    updatePosition: boolean;
    updateRotation: boolean;
    updateUpAxis: boolean;
    radius: number;
    height: number;
    obstacleAvoidanceType: ObstacleAvoidanceType;
    avoidancePriority: number;
    isOnNavMesh: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetDestination: () => boolean;
    ActivateCurrentOffMeshLink: () => any;
    CompleteOffMeshLink: () => any;
    Warp: () => boolean;
    Move: () => any;
    Stop: () => any;
    Resume: () => any;
    ResetPath: () => any;
    SetPath: () => boolean;
    FindClosestEdge: () => boolean;
    Raycast: () => boolean;
    CalculatePath: () => boolean;
    SamplePathPosition: () => boolean;
    SetLayerCost: () => any;
    GetLayerCost: () => number;
    SetAreaCost: () => any;
    GetAreaCost: () => number;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AI.NavMeshObstacleShape
  //
  export interface NavMeshObstacleShape {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshObstacle
  //
  export interface NavMeshObstacle {
    height: number;
    radius: number;
    velocity: Vector3;
    carving: boolean;
    carveOnlyStationary: boolean;
    carvingMoveThreshold: number;
    carvingTimeToStationary: number;
    shape: NavMeshObstacleShape;
    center: Vector3;
    size: Vector3;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AI.OffMeshLinkType
  //
  export interface OffMeshLinkType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.OffMeshLinkData
  //
  export interface OffMeshLinkData {
    valid: boolean;
    activated: boolean;
    linkType: OffMeshLinkType;
    startPos: Vector3;
    endPos: Vector3;
    offMeshLink: OffMeshLink;
  }
  //
  // Type: UnityEngine.AI.OffMeshLink
  //
  export interface OffMeshLink {
    activated: boolean;
    occupied: boolean;
    costOverride: number;
    biDirectional: boolean;
    navMeshLayer: number;
    area: number;
    autoUpdatePositions: boolean;
    startTransform: Transform;
    endTransform: Transform;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    UpdatePositions: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AI.NavMeshHit
  //
  export interface NavMeshHit {
    position: Vector3;
    normal: Vector3;
    distance: number;
    mask: number;
    hit: boolean;
  }
  //
  // Type: UnityEngine.AI.NavMeshTriangulation
  //
  export interface NavMeshTriangulation {
    layers: any; // System.Int32[]
    vertices: Vector3[];
    indices: any; // System.Int32[]
    areas: any; // System.Int32[]
  }
  //
  // Type: UnityEngine.AI.NavMeshData
  //
  export interface NavMeshData {
    sourceBounds: Bounds;
    position: Vector3;
    rotation: Quaternion;
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.AI.NavMeshDataInstance
  //
  export interface NavMeshDataInstance {
    valid: boolean;
    owner: Object;
    Remove: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshLinkData
  //
  export interface NavMeshLinkData {
    startPosition: Vector3;
    endPosition: Vector3;
    costModifier: number;
    bidirectional: boolean;
    width: number;
    area: number;
    agentTypeID: number;
  }
  //
  // Type: UnityEngine.AI.NavMeshLinkInstance
  //
  export interface NavMeshLinkInstance {
    valid: boolean;
    owner: Object;
    Remove: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshQueryFilter
  //
  export interface NavMeshQueryFilter {
    areaMask: number;
    agentTypeID: number;
    GetAreaCost: () => number;
    SetAreaCost: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMesh
  //
  export interface NavMesh {
    // static avoidancePredictionTime: number;
    // static pathfindingIterationsPerFrame: number;
  }
  //
  // Type: UnityEngine.AI.NavMesh+OnNavMeshPreUpdate
  //
  export interface NavMesh_OnNavMeshPreUpdate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildDebugFlags
  //
  export interface NavMeshBuildDebugFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildSourceShape
  //
  export interface NavMeshBuildSourceShape {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshCollectGeometry
  //
  export interface NavMeshCollectGeometry {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildSource
  //
  export interface NavMeshBuildSource {
    transform: Matrix4x4;
    size: Vector3;
    shape: NavMeshBuildSourceShape;
    area: number;
    sourceObject: Object;
    component: Component;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildMarkup
  //
  export interface NavMeshBuildMarkup {
    overrideArea: boolean;
    area: number;
    ignoreFromBuild: boolean;
    root: Transform;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildSettings
  //
  export interface NavMeshBuildSettings {
    agentTypeID: number;
    agentRadius: number;
    agentHeight: number;
    agentSlope: number;
    agentClimb: number;
    minRegionArea: number;
    overrideVoxelSize: boolean;
    voxelSize: number;
    overrideTileSize: boolean;
    tileSize: number;
    maxJobWorkers: any; // System.UInt32
    preserveTilesOutsideBounds: boolean;
    debug: NavMeshBuildDebugSettings;
    ValidationReport: () => any;
  }
  //
  // Type: UnityEngine.AI.NavMeshBuildDebugSettings
  //
  export interface NavMeshBuildDebugSettings {
    flags: NavMeshBuildDebugFlags;
  }
  //
  // Type: UnityEngine.Accessibility.VisionUtility
  //
  export interface VisionUtility {
  }
  //
  // Type: UnityEngine.Sprites.DataUtility
  //
  export interface DataUtility {
  }
  //
  // Type: UnityEngine.U2D.PixelPerfectRendering
  //
  export interface PixelPerfectRendering {
    // static pixelSnapSpacing: number;
  }
  //
  // Type: UnityEngine.U2D.SpriteBone
  //
  export interface SpriteBone {
    name: string;
    position: Vector3;
    rotation: Quaternion;
    length: number;
    parentId: number;
  }
  //
  // Type: UnityEngine.U2D.SpriteDataAccessExtensions
  //
  export interface SpriteDataAccessExtensions {
  }
  //
  // Type: UnityEngine.U2D.SpriteRendererDataAccessExtensions
  //
  export interface SpriteRendererDataAccessExtensions {
  }
  //
  // Type: UnityEngine.U2D.SpriteAtlasManager
  //
  export interface SpriteAtlasManager {
  }
  //
  // Type: UnityEngine.U2D.SpriteAtlas
  //
  export interface SpriteAtlas {
    isVariant: boolean;
    tag: string;
    spriteCount: number;
    name: string;
    hideFlags: HideFlags;
    CanBindTo: () => boolean;
    GetSprite: () => Sprite;
    GetSprites: () => number;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.U2D.SpriteShapeParameters
  //
  export interface SpriteShapeParameters {
    transform: Matrix4x4;
    fillTexture: Texture2D;
    fillScale: any; // System.UInt32
    splineDetail: any; // System.UInt32
    angleThreshold: number;
    borderPivot: number;
    bevelCutoff: number;
    bevelSize: number;
    carpet: boolean;
    smartSprite: boolean;
    adaptiveUV: boolean;
    spriteBorders: boolean;
    stretchUV: boolean;
  }
  //
  // Type: UnityEngine.U2D.SpriteShapeSegment
  //
  export interface SpriteShapeSegment {
    geomIndex: number;
    indexCount: number;
    vertexCount: number;
    spriteIndex: number;
  }
  //
  // Type: UnityEngine.U2D.SpriteShapeRenderer
  //
  export interface SpriteShapeRenderer {
    color: Color;
    maskInteraction: SpriteMaskInteraction;
    lightmapTilingOffset: Vector4;
    lightProbeAnchor: Transform;
    castShadows: boolean;
    motionVectors: boolean;
    useLightProbes: boolean;
    bounds: Bounds;
    enabled: boolean;
    isVisible: boolean;
    shadowCastingMode: ShadowCastingMode;
    receiveShadows: boolean;
    forceRenderingOff: boolean;
    motionVectorGenerationMode: MotionVectorGenerationMode;
    lightProbeUsage: LightProbeUsage;
    reflectionProbeUsage: ReflectionProbeUsage;
    renderingLayerMask: any; // System.UInt32
    rendererPriority: number;
    rayTracingMode: RayTracingMode;
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    allowOcclusionWhenDynamic: boolean;
    isPartOfStaticBatch: boolean;
    worldToLocalMatrix: Matrix4x4;
    localToWorldMatrix: Matrix4x4;
    lightProbeProxyVolumeOverride: GameObject;
    probeAnchor: Transform;
    lightmapIndex: number;
    realtimeLightmapIndex: number;
    lightmapScaleOffset: Vector4;
    realtimeLightmapScaleOffset: Vector4;
    materials: Material[];
    material: Material;
    sharedMaterial: Material;
    sharedMaterials: Material[];
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    Prepare: () => any;
    GetBounds: () => any;
    GetSegments: () => any;
    GetChannels: () => any;
    GetMaterials: () => any;
    GetSharedMaterials: () => any;
    GetClosestReflectionProbes: () => any;
    HasPropertyBlock: () => boolean;
    SetPropertyBlock: () => any;
    GetPropertyBlock: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.U2D.SpriteShapeMetaData
  //
  export interface SpriteShapeMetaData {
    height: number;
    bevelCutoff: number;
    bevelSize: number;
    spriteIndex: any; // System.UInt32
    corner: boolean;
  }
  //
  // Type: UnityEngine.U2D.ShapeControlPoint
  //
  export interface ShapeControlPoint {
    position: Vector3;
    leftTangent: Vector3;
    rightTangent: Vector3;
    mode: number;
  }
  //
  // Type: UnityEngine.U2D.AngleRangeInfo
  //
  export interface AngleRangeInfo {
    start: number;
    end: number;
    order: any; // System.UInt32
    sprites: any; // System.Int32[]
  }
  //
  // Type: UnityEngine.U2D.SpriteShapeUtility
  //
  export interface SpriteShapeUtility {
  }
  //
  // Type: UnityEngine.Profiling.ProfilerArea
  //
  export interface ProfilerArea {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Profiling.Profiler
  //
  export interface Profiler {
    // static supported: boolean;
    // static logFile: string;
    // static enableBinaryLog: boolean;
    // static maxUsedMemory: number;
    // static enabled: boolean;
    // static enableAllocationCallstacks: boolean;
    // static areaCount: number;
    // static maxNumberOfSamplesPerFrame: number;
    // static usedHeapSize: any; // System.UInt32
    // static usedHeapSizeLong: any; // System.Int64
  }
  //
  // Type: UnityEngine.Profiling.Recorder
  //
  export interface Recorder {
    isValid: boolean;
    enabled: boolean;
    elapsedNanoseconds: any; // System.Int64
    gpuElapsedNanoseconds: any; // System.Int64
    sampleBlockCount: number;
    gpuSampleBlockCount: number;
    FilterToCurrentThread: () => any;
    CollectFromAllThreads: () => any;
  }
  //
  // Type: UnityEngine.Profiling.Sampler
  //
  export interface Sampler {
    isValid: boolean;
    name: string;
    GetRecorder: () => Recorder;
  }
  //
  // Type: UnityEngine.Profiling.CustomSampler
  //
  export interface CustomSampler {
    isValid: boolean;
    name: string;
    Begin: () => any;
    End: () => any;
    GetRecorder: () => Recorder;
  }
  //
  // Type: UnityEngine.Profiling.Experimental.DebugScreenCapture
  //
  export interface DebugScreenCapture {
    rawImageDataReference: any; // Unity.Collections.NativeArray`1[System.Byte]
    imageFormat: TextureFormat;
    width: number;
    height: number;
  }
  //
  // Type: UnityEngine.Profiling.Memory.Experimental.CaptureFlags
  //
  export interface CaptureFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Profiling.Memory.Experimental.MetaData
  //
  export interface MetaData {
    content: string;
    platform: string;
  }
  //
  // Type: UnityEngine.Profiling.Memory.Experimental.MemoryProfiler
  //
  export interface MemoryProfiler {
  }
  //
  // Type: UnityEngine.Jobs.IJobParallelForTransform
  //
  export interface IJobParallelForTransform {
    Execute: () => any;
  }
  //
  // Type: UnityEngine.Jobs.IJobParallelForTransformExtensions
  //
  export interface IJobParallelForTransformExtensions {
  }
  //
  // Type: UnityEngine.Jobs.TransformAccess
  //
  export interface TransformAccess {
    position: Vector3;
    rotation: Quaternion;
    localPosition: Vector3;
    localRotation: Quaternion;
    localScale: Vector3;
    localToWorldMatrix: Matrix4x4;
    worldToLocalMatrix: Matrix4x4;
    isValid: boolean;
  }
  //
  // Type: UnityEngine.Jobs.TransformAccessArray
  //
  export interface TransformAccessArray {
    isCreated: boolean;
    capacity: number;
    length: number;
    Dispose: () => any;
    Add: () => any;
    RemoveAtSwapBack: () => any;
    SetTransforms: () => any;
  }
  //
  // Type: UnityEngine.WSA.AppCallbackItem
  //
  export interface AppCallbackItem {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.WSA.WindowSizeChanged
  //
  export interface WindowSizeChanged {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.WSA.WindowActivationState
  //
  export interface WindowActivationState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WSA.WindowActivated
  //
  export interface WindowActivated {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.WSA.Application
  //
  export interface Application {
    // static arguments: string;
    // static advertisingIdentifier: string;
  }
  //
  // Type: UnityEngine.WSA.Cursor
  //
  export interface Cursor {
  }
  //
  // Type: UnityEngine.WSA.Folder
  //
  export interface Folder {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WSA.Launcher
  //
  export interface Launcher {
  }
  //
  // Type: UnityEngine.WSA.TileTemplate
  //
  export interface TileTemplate {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WSA.ToastTemplate
  //
  export interface ToastTemplate {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WSA.TileForegroundText
  //
  export interface TileForegroundText {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.WSA.SecondaryTileData
  //
  export interface SecondaryTileData {
    backgroundColor: Color32;
    arguments: string;
    backgroundColorSet: boolean;
    displayName: string;
    foregroundText: TileForegroundText;
    lockScreenBadgeLogo: string;
    lockScreenDisplayBadgeAndTileText: boolean;
    phoneticName: string;
    roamingEnabled: boolean;
    showNameOnSquare150x150Logo: boolean;
    showNameOnSquare310x310Logo: boolean;
    showNameOnWide310x150Logo: boolean;
    square150x150Logo: string;
    square30x30Logo: string;
    square310x310Logo: string;
    square70x70Logo: string;
    tileId: string;
    wide310x150Logo: string;
  }
  //
  // Type: UnityEngine.WSA.Tile
  //
  export interface Tile {
    // static main: Tile;
    id: string;
    hasUserConsent: boolean;
    exists: boolean;
    Update: () => any;
    PeriodicUpdate: () => any;
    StopPeriodicUpdate: () => any;
    UpdateBadgeImage: () => any;
    UpdateBadgeNumber: () => any;
    RemoveBadge: () => any;
    PeriodicBadgeUpdate: () => any;
    StopPeriodicBadgeUpdate: () => any;
    Delete: () => any;
  }
  //
  // Type: UnityEngine.WSA.Toast
  //
  export interface Toast {
    arguments: string;
    activated: boolean;
    dismissed: boolean;
    dismissedByUser: boolean;
    Show: () => any;
    Hide: () => any;
  }
  //
  // Type: UnityEngine.Windows.LicenseInformation
  //
  export interface LicenseInformation {
    // static isOnAppTrial: boolean;
  }
  //
  // Type: UnityEngine.Windows.CrashReporting
  //
  export interface CrashReporting {
    // static crashReportFolder: string;
  }
  //
  // Type: UnityEngine.Windows.Crypto
  //
  export interface Crypto {
  }
  //
  // Type: UnityEngine.Windows.Directory
  //
  export interface Directory {
    // static temporaryFolder: string;
    // static localFolder: string;
    // static roamingFolder: string;
  }
  //
  // Type: UnityEngine.Windows.File
  //
  export interface File {
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognitionSystem
  //
  export interface PhraseRecognitionSystem {
    // static isSupported: boolean;
    // static Status: SpeechSystemStatus;
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognitionSystem+ErrorDelegate
  //
  export interface PhraseRecognitionSystem_ErrorDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognitionSystem+StatusDelegate
  //
  export interface PhraseRecognitionSystem_StatusDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognizer
  //
  export interface PhraseRecognizer {
    IsRunning: boolean;
    Start: () => any;
    Stop: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognizer+PhraseRecognizedDelegate
  //
  export interface PhraseRecognizer_PhraseRecognizedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationRecognizer
  //
  export interface DictationRecognizer {
    Status: SpeechSystemStatus;
    AutoSilenceTimeoutSeconds: number;
    InitialSilenceTimeoutSeconds: number;
    Start: () => any;
    Stop: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationRecognizer+DictationHypothesisDelegate
  //
  export interface DictationRecognizer_DictationHypothesisDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationRecognizer+DictationResultDelegate
  //
  export interface DictationRecognizer_DictationResultDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationRecognizer+DictationCompletedDelegate
  //
  export interface DictationRecognizer_DictationCompletedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationRecognizer+DictationErrorHandler
  //
  export interface DictationRecognizer_DictationErrorHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.ConfidenceLevel
  //
  export interface ConfidenceLevel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.SpeechSystemStatus
  //
  export interface SpeechSystemStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.SpeechError
  //
  export interface SpeechError {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationTopicConstraint
  //
  export interface DictationTopicConstraint {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.DictationCompletionCause
  //
  export interface DictationCompletionCause {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.SemanticMeaning
  //
  export interface SemanticMeaning {
    key: string;
    values: any; // System.String[]
  }
  //
  // Type: UnityEngine.Windows.Speech.PhraseRecognizedEventArgs
  //
  export interface PhraseRecognizedEventArgs {
    confidence: ConfidenceLevel;
    semanticMeanings: SemanticMeaning[];
    text: string;
    phraseStartTime: any; // System.DateTime
    phraseDuration: any; // System.TimeSpan
  }
  //
  // Type: UnityEngine.Windows.Speech.KeywordRecognizer
  //
  export interface KeywordRecognizer {
    Keywords: any; // System.Collections.Generic.IEnumerable`1[System.String]
    IsRunning: boolean;
    Start: () => any;
    Stop: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.Speech.GrammarRecognizer
  //
  export interface GrammarRecognizer {
    GrammarFilePath: string;
    IsRunning: boolean;
    Start: () => any;
    Stop: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCaptureFileOutputFormat
  //
  export interface PhotoCaptureFileOutputFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture
  //
  export interface PhotoCapture {
    // static SupportedResolutions: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Resolution]
    StartPhotoModeAsync: () => any;
    StopPhotoModeAsync: () => any;
    TakePhotoAsync: () => any;
    GetUnsafePointerToVideoDeviceController: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+CaptureResultType
  //
  export interface PhotoCapture_CaptureResultType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+PhotoCaptureResult
  //
  export interface PhotoCapture_PhotoCaptureResult {
    success: boolean;
    resultType: PhotoCapture_CaptureResultType;
    hResult: any; // System.Int64
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+OnCaptureResourceCreatedCallback
  //
  export interface PhotoCapture_OnCaptureResourceCreatedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+OnPhotoModeStartedCallback
  //
  export interface PhotoCapture_OnPhotoModeStartedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+OnPhotoModeStoppedCallback
  //
  export interface PhotoCapture_OnPhotoModeStoppedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+OnCapturedToDiskCallback
  //
  export interface PhotoCapture_OnCapturedToDiskCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCapture+OnCapturedToMemoryCallback
  //
  export interface PhotoCapture_OnCapturedToMemoryCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.PhotoCaptureFrame
  //
  export interface PhotoCaptureFrame {
    dataLength: number;
    hasLocationData: boolean;
    pixelFormat: CapturePixelFormat;
    TryGetCameraToWorldMatrix: () => boolean;
    TryGetProjectionMatrix: () => boolean;
    UploadImageDataToTexture: () => any;
    GetUnsafePointerToBuffer: () => any;
    CopyRawImageDataIntoBuffer: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture
  //
  export interface VideoCapture {
    // static SupportedResolutions: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Resolution]
    IsRecording: boolean;
    StartVideoModeAsync: () => any;
    StopVideoModeAsync: () => any;
    StartRecordingAsync: () => any;
    StopRecordingAsync: () => any;
    GetUnsafePointerToVideoDeviceController: () => any;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+CaptureResultType
  //
  export interface VideoCapture_CaptureResultType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+AudioState
  //
  export interface VideoCapture_AudioState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+VideoCaptureResult
  //
  export interface VideoCapture_VideoCaptureResult {
    success: boolean;
    resultType: VideoCapture_CaptureResultType;
    hResult: any; // System.Int64
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+OnVideoCaptureResourceCreatedCallback
  //
  export interface VideoCapture_OnVideoCaptureResourceCreatedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+OnVideoModeStartedCallback
  //
  export interface VideoCapture_OnVideoModeStartedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+OnVideoModeStoppedCallback
  //
  export interface VideoCapture_OnVideoModeStoppedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+OnStartedRecordingVideoCallback
  //
  export interface VideoCapture_OnStartedRecordingVideoCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.VideoCapture+OnStoppedRecordingVideoCallback
  //
  export interface VideoCapture_OnStoppedRecordingVideoCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.CapturePixelFormat
  //
  export interface CapturePixelFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.WebCamMode
  //
  export interface WebCamMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Windows.WebCam.WebCam
  //
  export interface WebCam {
    // static Mode: WebCamMode;
  }
  //
  // Type: UnityEngine.Windows.WebCam.CameraParameters
  //
  export interface CameraParameters {
    hologramOpacity: number;
    frameRate: number;
    cameraResolutionWidth: number;
    cameraResolutionHeight: number;
    pixelFormat: CapturePixelFormat;
  }
  //
  // Type: UnityEngine.Events.PersistentListenerMode
  //
  export interface PersistentListenerMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Events.UnityEventCallState
  //
  export interface UnityEventCallState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Events.UnityEventBase
  //
  export interface UnityEventBase {
    GetPersistentEventCount: () => number;
    GetPersistentTarget: () => Object;
    GetPersistentMethodName: () => string;
    SetPersistentListenerState: () => any;
    RemoveAllListeners: () => any;
  }
  //
  // Type: UnityEngine.Events.UnityAction
  //
  export interface UnityAction {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Events.UnityEvent
  //
  export interface UnityEvent {
    AddListener: () => any;
    RemoveListener: () => any;
    Invoke: () => any;
    GetPersistentEventCount: () => number;
    GetPersistentTarget: () => Object;
    GetPersistentMethodName: () => string;
    SetPersistentListenerState: () => any;
    RemoveAllListeners: () => any;
  }
  //
  // Type: UnityEngine.Serialization.UnitySurrogateSelector
  //
  export interface UnitySurrogateSelector {
    GetSurrogate: () => any;
    ChainSelector: () => any;
    GetNextSelector: () => any;
  }
  //
  // Type: UnityEngine.SceneManagement.Scene
  //
  export interface Scene {
    handle: number;
    path: string;
    name: string;
    isLoaded: boolean;
    buildIndex: number;
    isDirty: boolean;
    rootCount: number;
    isSubScene: boolean;
    IsValid: () => boolean;
    GetRootGameObjects: () => GameObject[];
  }
  //
  // Type: UnityEngine.SceneManagement.SceneManagerAPI
  //
  export interface SceneManagerAPI {
    // static overrideAPI: SceneManagerAPI;
  }
  //
  // Type: UnityEngine.SceneManagement.SceneManager
  //
  export interface SceneManager {
    // static sceneCount: number;
    // static sceneCountInBuildSettings: number;
  }
  //
  // Type: UnityEngine.SceneManagement.LoadSceneMode
  //
  export interface LoadSceneMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SceneManagement.LocalPhysicsMode
  //
  export interface LocalPhysicsMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SceneManagement.LoadSceneParameters
  //
  export interface LoadSceneParameters {
    loadSceneMode: LoadSceneMode;
    localPhysicsMode: LocalPhysicsMode;
  }
  //
  // Type: UnityEngine.SceneManagement.CreateSceneParameters
  //
  export interface CreateSceneParameters {
    localPhysicsMode: LocalPhysicsMode;
  }
  //
  // Type: UnityEngine.SceneManagement.UnloadSceneOptions
  //
  export interface UnloadSceneOptions {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.SceneManagement.SceneUtility
  //
  export interface SceneUtility {
  }
  //
  // Type: UnityEngine.LowLevel.PlayerLoopSystem
  //
  export interface PlayerLoopSystem {
    type: any; // System.Type
    subSystemList: PlayerLoopSystem[];
    updateDelegate: PlayerLoopSystem_UpdateFunction;
    updateFunction: any; // System.IntPtr
    loopConditionFunction: any; // System.IntPtr
  }
  //
  // Type: UnityEngine.LowLevel.PlayerLoopSystem+UpdateFunction
  //
  export interface PlayerLoopSystem_UpdateFunction {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.LowLevel.PlayerLoop
  //
  export interface PlayerLoop {
  }
  //
  // Type: UnityEngine.PlayerLoop.TimeUpdate
  //
  export interface TimeUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.TimeUpdate+WaitForLastPresentationAndUpdateTime
  //
  export interface TimeUpdate_WaitForLastPresentationAndUpdateTime {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization
  //
  export interface Initialization {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+PlayerUpdateTime
  //
  export interface Initialization_PlayerUpdateTime {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+UpdateCameraMotionVectors
  //
  export interface Initialization_UpdateCameraMotionVectors {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+DirectorSampleTime
  //
  export interface Initialization_DirectorSampleTime {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+AsyncUploadTimeSlicedUpdate
  //
  export interface Initialization_AsyncUploadTimeSlicedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+SynchronizeState
  //
  export interface Initialization_SynchronizeState {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+SynchronizeInputs
  //
  export interface Initialization_SynchronizeInputs {
  }
  //
  // Type: UnityEngine.PlayerLoop.Initialization+XREarlyUpdate
  //
  export interface Initialization_XREarlyUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate
  //
  export interface EarlyUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PollPlayerConnection
  //
  export interface EarlyUpdate_PollPlayerConnection {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ProfilerStartFrame
  //
  export interface EarlyUpdate_ProfilerStartFrame {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PollHtcsPlayerConnection
  //
  export interface EarlyUpdate_PollHtcsPlayerConnection {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+GpuTimestamp
  //
  export interface EarlyUpdate_GpuTimestamp {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+AnalyticsCoreStatsUpdate
  //
  export interface EarlyUpdate_AnalyticsCoreStatsUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UnityWebRequestUpdate
  //
  export interface EarlyUpdate_UnityWebRequestUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateStreamingManager
  //
  export interface EarlyUpdate_UpdateStreamingManager {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ExecuteMainThreadJobs
  //
  export interface EarlyUpdate_ExecuteMainThreadJobs {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ProcessMouseInWindow
  //
  export interface EarlyUpdate_ProcessMouseInWindow {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ClearIntermediateRenderers
  //
  export interface EarlyUpdate_ClearIntermediateRenderers {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ClearLines
  //
  export interface EarlyUpdate_ClearLines {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PresentBeforeUpdate
  //
  export interface EarlyUpdate_PresentBeforeUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ResetFrameStatsAfterPresent
  //
  export interface EarlyUpdate_ResetFrameStatsAfterPresent {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateAsyncReadbackManager
  //
  export interface EarlyUpdate_UpdateAsyncReadbackManager {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateTextureStreamingManager
  //
  export interface EarlyUpdate_UpdateTextureStreamingManager {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdatePreloading
  //
  export interface EarlyUpdate_UpdatePreloading {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+RendererNotifyInvisible
  //
  export interface EarlyUpdate_RendererNotifyInvisible {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PlayerCleanupCachedData
  //
  export interface EarlyUpdate_PlayerCleanupCachedData {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateMainGameViewRect
  //
  export interface EarlyUpdate_UpdateMainGameViewRect {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateCanvasRectTransform
  //
  export interface EarlyUpdate_UpdateCanvasRectTransform {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateInputManager
  //
  export interface EarlyUpdate_UpdateInputManager {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ProcessRemoteInput
  //
  export interface EarlyUpdate_ProcessRemoteInput {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+XRUpdate
  //
  export interface EarlyUpdate_XRUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ScriptRunDelayedStartupFrame
  //
  export interface EarlyUpdate_ScriptRunDelayedStartupFrame {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+UpdateKinect
  //
  export interface EarlyUpdate_UpdateKinect {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+DeliverIosPlatformEvents
  //
  export interface EarlyUpdate_DeliverIosPlatformEvents {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+DispatchEventQueueEvents
  //
  export interface EarlyUpdate_DispatchEventQueueEvents {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PhysicsResetInterpolatedTransformPosition
  //
  export interface EarlyUpdate_PhysicsResetInterpolatedTransformPosition {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+SpriteAtlasManagerUpdate
  //
  export interface EarlyUpdate_SpriteAtlasManagerUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+TangoUpdate
  //
  export interface EarlyUpdate_TangoUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+ARCoreUpdate
  //
  export interface EarlyUpdate_ARCoreUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.EarlyUpdate+PerformanceAnalyticsUpdate
  //
  export interface EarlyUpdate_PerformanceAnalyticsUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate
  //
  export interface FixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+ClearLines
  //
  export interface FixedUpdate_ClearLines {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+DirectorFixedSampleTime
  //
  export interface FixedUpdate_DirectorFixedSampleTime {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+AudioFixedUpdate
  //
  export interface FixedUpdate_AudioFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+ScriptRunBehaviourFixedUpdate
  //
  export interface FixedUpdate_ScriptRunBehaviourFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+DirectorFixedUpdate
  //
  export interface FixedUpdate_DirectorFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+LegacyFixedAnimationUpdate
  //
  export interface FixedUpdate_LegacyFixedAnimationUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+XRFixedUpdate
  //
  export interface FixedUpdate_XRFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+PhysicsFixedUpdate
  //
  export interface FixedUpdate_PhysicsFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+Physics2DFixedUpdate
  //
  export interface FixedUpdate_Physics2DFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+DirectorFixedUpdatePostPhysics
  //
  export interface FixedUpdate_DirectorFixedUpdatePostPhysics {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+ScriptRunDelayedFixedFrameRate
  //
  export interface FixedUpdate_ScriptRunDelayedFixedFrameRate {
  }
  //
  // Type: UnityEngine.PlayerLoop.FixedUpdate+NewInputFixedUpdate
  //
  export interface FixedUpdate_NewInputFixedUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate
  //
  export interface PreUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+PhysicsUpdate
  //
  export interface PreUpdate_PhysicsUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+Physics2DUpdate
  //
  export interface PreUpdate_Physics2DUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+CheckTexFieldInput
  //
  export interface PreUpdate_CheckTexFieldInput {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+IMGUISendQueuedEvents
  //
  export interface PreUpdate_IMGUISendQueuedEvents {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+SendMouseEvents
  //
  export interface PreUpdate_SendMouseEvents {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+AIUpdate
  //
  export interface PreUpdate_AIUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+WindUpdate
  //
  export interface PreUpdate_WindUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+UpdateVideo
  //
  export interface PreUpdate_UpdateVideo {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreUpdate+NewInputUpdate
  //
  export interface PreUpdate_NewInputUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.Update
  //
  export interface Update {
  }
  //
  // Type: UnityEngine.PlayerLoop.Update+ScriptRunBehaviourUpdate
  //
  export interface Update_ScriptRunBehaviourUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.Update+DirectorUpdate
  //
  export interface Update_DirectorUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.Update+ScriptRunDelayedDynamicFrameRate
  //
  export interface Update_ScriptRunDelayedDynamicFrameRate {
  }
  //
  // Type: UnityEngine.PlayerLoop.Update+ScriptRunDelayedTasks
  //
  export interface Update_ScriptRunDelayedTasks {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate
  //
  export interface PreLateUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+AIUpdatePostScript
  //
  export interface PreLateUpdate_AIUpdatePostScript {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+DirectorUpdateAnimationBegin
  //
  export interface PreLateUpdate_DirectorUpdateAnimationBegin {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+LegacyAnimationUpdate
  //
  export interface PreLateUpdate_LegacyAnimationUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+DirectorUpdateAnimationEnd
  //
  export interface PreLateUpdate_DirectorUpdateAnimationEnd {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+DirectorDeferredEvaluate
  //
  export interface PreLateUpdate_DirectorDeferredEvaluate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+UIElementsUpdatePanels
  //
  export interface PreLateUpdate_UIElementsUpdatePanels {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+UpdateNetworkManager
  //
  export interface PreLateUpdate_UpdateNetworkManager {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+UpdateMasterServerInterface
  //
  export interface PreLateUpdate_UpdateMasterServerInterface {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+UNetUpdate
  //
  export interface PreLateUpdate_UNetUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+EndGraphicsJobsAfterScriptUpdate
  //
  export interface PreLateUpdate_EndGraphicsJobsAfterScriptUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+ParticleSystemBeginUpdateAll
  //
  export interface PreLateUpdate_ParticleSystemBeginUpdateAll {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+ScriptRunBehaviourLateUpdate
  //
  export interface PreLateUpdate_ScriptRunBehaviourLateUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PreLateUpdate+ConstraintManagerUpdate
  //
  export interface PreLateUpdate_ConstraintManagerUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate
  //
  export interface PostLateUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PlayerSendFrameStarted
  //
  export interface PostLateUpdate_PlayerSendFrameStarted {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateRectTransform
  //
  export interface PostLateUpdate_UpdateRectTransform {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateCanvasRectTransform
  //
  export interface PostLateUpdate_UpdateCanvasRectTransform {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PlayerUpdateCanvases
  //
  export interface PostLateUpdate_PlayerUpdateCanvases {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateAudio
  //
  export interface PostLateUpdate_UpdateAudio {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateVideo
  //
  export interface PostLateUpdate_UpdateVideo {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+DirectorLateUpdate
  //
  export interface PostLateUpdate_DirectorLateUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ScriptRunDelayedDynamicFrameRate
  //
  export interface PostLateUpdate_ScriptRunDelayedDynamicFrameRate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+VFXUpdate
  //
  export interface PostLateUpdate_VFXUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ParticleSystemEndUpdateAll
  //
  export interface PostLateUpdate_ParticleSystemEndUpdateAll {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+EndGraphicsJobsAfterScriptLateUpdate
  //
  export interface PostLateUpdate_EndGraphicsJobsAfterScriptLateUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateSubstance
  //
  export interface PostLateUpdate_UpdateSubstance {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateCustomRenderTextures
  //
  export interface PostLateUpdate_UpdateCustomRenderTextures {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateAllRenderers
  //
  export interface PostLateUpdate_UpdateAllRenderers {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateLightProbeProxyVolumes
  //
  export interface PostLateUpdate_UpdateLightProbeProxyVolumes {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+EnlightenRuntimeUpdate
  //
  export interface PostLateUpdate_EnlightenRuntimeUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateAllSkinnedMeshes
  //
  export interface PostLateUpdate_UpdateAllSkinnedMeshes {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ProcessWebSendMessages
  //
  export interface PostLateUpdate_ProcessWebSendMessages {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+SortingGroupsUpdate
  //
  export interface PostLateUpdate_SortingGroupsUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateVideoTextures
  //
  export interface PostLateUpdate_UpdateVideoTextures {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+DirectorRenderImage
  //
  export interface PostLateUpdate_DirectorRenderImage {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PlayerEmitCanvasGeometry
  //
  export interface PostLateUpdate_PlayerEmitCanvasGeometry {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+FinishFrameRendering
  //
  export interface PostLateUpdate_FinishFrameRendering {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+BatchModeUpdate
  //
  export interface PostLateUpdate_BatchModeUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PlayerSendFrameComplete
  //
  export interface PostLateUpdate_PlayerSendFrameComplete {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateCaptureScreenshot
  //
  export interface PostLateUpdate_UpdateCaptureScreenshot {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PresentAfterDraw
  //
  export interface PostLateUpdate_PresentAfterDraw {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ClearImmediateRenderers
  //
  export interface PostLateUpdate_ClearImmediateRenderers {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+XRPostPresent
  //
  export interface PostLateUpdate_XRPostPresent {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+UpdateResolution
  //
  export interface PostLateUpdate_UpdateResolution {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+InputEndFrame
  //
  export interface PostLateUpdate_InputEndFrame {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+GUIClearEvents
  //
  export interface PostLateUpdate_GUIClearEvents {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ShaderHandleErrors
  //
  export interface PostLateUpdate_ShaderHandleErrors {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ResetInputAxis
  //
  export interface PostLateUpdate_ResetInputAxis {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ThreadedLoadingDebug
  //
  export interface PostLateUpdate_ThreadedLoadingDebug {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ProfilerSynchronizeStats
  //
  export interface PostLateUpdate_ProfilerSynchronizeStats {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+MemoryFrameMaintenance
  //
  export interface PostLateUpdate_MemoryFrameMaintenance {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ExecuteGameCenterCallbacks
  //
  export interface PostLateUpdate_ExecuteGameCenterCallbacks {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+ProfilerEndFrame
  //
  export interface PostLateUpdate_ProfilerEndFrame {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PlayerSendFramePostPresent
  //
  export interface PostLateUpdate_PlayerSendFramePostPresent {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PhysicsSkinnedClothBeginUpdate
  //
  export interface PostLateUpdate_PhysicsSkinnedClothBeginUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+PhysicsSkinnedClothFinishUpdate
  //
  export interface PostLateUpdate_PhysicsSkinnedClothFinishUpdate {
  }
  //
  // Type: UnityEngine.PlayerLoop.PostLateUpdate+TriggerEndOfFrameCallbacks
  //
  export interface PostLateUpdate_TriggerEndOfFrameCallbacks {
  }
  //
  // Type: UnityEngine.Networking.IMultipartFormSection
  //
  export interface IMultipartFormSection {
    sectionName: string;
    sectionData: any; // System.Byte[]
    fileName: string;
    contentType: string;
  }
  //
  // Type: UnityEngine.Networking.MultipartFormDataSection
  //
  export interface MultipartFormDataSection {
    sectionName: string;
    sectionData: any; // System.Byte[]
    fileName: string;
    contentType: string;
  }
  //
  // Type: UnityEngine.Networking.MultipartFormFileSection
  //
  export interface MultipartFormFileSection {
    sectionName: string;
    sectionData: any; // System.Byte[]
    fileName: string;
    contentType: string;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequestAsyncOperation
  //
  export interface UnityWebRequestAsyncOperation {
    webRequest: UnityWebRequest;
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequest
  //
  export interface UnityWebRequest {
    disposeCertificateHandlerOnDispose: boolean;
    disposeDownloadHandlerOnDispose: boolean;
    disposeUploadHandlerOnDispose: boolean;
    method: string;
    error: string;
    useHttpContinue: boolean;
    url: string;
    uri: any; // System.Uri
    responseCode: any; // System.Int64
    uploadProgress: number;
    isModifiable: boolean;
    isDone: boolean;
    isNetworkError: boolean;
    isHttpError: boolean;
    result: UnityWebRequest_Result;
    downloadProgress: number;
    uploadedBytes: any; // System.UInt64
    downloadedBytes: any; // System.UInt64
    redirectLimit: number;
    chunkedTransfer: boolean;
    uploadHandler: UploadHandler;
    downloadHandler: DownloadHandler;
    certificateHandler: CertificateHandler;
    timeout: number;
    isError: boolean;
    GetResponseHeaders: () => any;
    Dispose: () => any;
    Send: () => AsyncOperation;
    SendWebRequest: () => UnityWebRequestAsyncOperation;
    Abort: () => any;
    GetRequestHeader: () => string;
    SetRequestHeader: () => any;
    GetResponseHeader: () => string;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequest+Result
  //
  export interface UnityWebRequest_Result {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.CertificateHandler
  //
  export interface CertificateHandler {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.DownloadHandler
  //
  export interface DownloadHandler {
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerBuffer
  //
  export interface DownloadHandlerBuffer {
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerScript
  //
  export interface DownloadHandlerScript {
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerFile
  //
  export interface DownloadHandlerFile {
    removeFileOnAbort: boolean;
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.UploadHandler
  //
  export interface UploadHandler {
    data: any; // System.Byte[]
    contentType: string;
    progress: number;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.UploadHandlerRaw
  //
  export interface UploadHandlerRaw {
    data: any; // System.Byte[]
    contentType: string;
    progress: number;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.UploadHandlerFile
  //
  export interface UploadHandlerFile {
    data: any; // System.Byte[]
    contentType: string;
    progress: number;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequestMultimedia
  //
  export interface UnityWebRequestMultimedia {
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerAudioClip
  //
  export interface DownloadHandlerAudioClip {
    audioClip: AudioClip;
    streamAudio: boolean;
    compressed: boolean;
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerMovieTexture
  //
  export interface DownloadHandlerMovieTexture {
    movieTexture: MovieTexture;
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequestTexture
  //
  export interface UnityWebRequestTexture {
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerTexture
  //
  export interface DownloadHandlerTexture {
    texture: Texture2D;
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.NetworkTransport
  //
  export interface NetworkTransport {
    // static IsStarted: boolean;
  }
  //
  // Type: UnityEngine.Networking.NetworkEventType
  //
  export interface NetworkEventType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.QosType
  //
  export interface QosType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.NetworkError
  //
  export interface NetworkError {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.ReactorModel
  //
  export interface ReactorModel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.ConnectionAcksType
  //
  export interface ConnectionAcksType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.ChannelQOS
  //
  export interface ChannelQOS {
    QOS: QosType;
    BelongsToSharedOrderChannel: boolean;
  }
  //
  // Type: UnityEngine.Networking.ConnectionConfig
  //
  export interface ConnectionConfig {
    PacketSize: any; // System.UInt16
    FragmentSize: any; // System.UInt16
    ResendTimeout: any; // System.UInt32
    DisconnectTimeout: any; // System.UInt32
    ConnectTimeout: any; // System.UInt32
    MinUpdateTimeout: any; // System.UInt32
    PingTimeout: any; // System.UInt32
    ReducedPingTimeout: any; // System.UInt32
    AllCostTimeout: any; // System.UInt32
    NetworkDropThreshold: any; // System.Byte
    OverflowDropThreshold: any; // System.Byte
    MaxConnectionAttempt: any; // System.Byte
    AckDelay: any; // System.UInt32
    SendDelay: any; // System.UInt32
    MaxCombinedReliableMessageSize: any; // System.UInt16
    MaxCombinedReliableMessageCount: any; // System.UInt16
    MaxSentMessageQueueSize: any; // System.UInt16
    AcksType: ConnectionAcksType;
    IsAcksLong: boolean;
    UsePlatformSpecificProtocols: boolean;
    InitialBandwidth: any; // System.UInt32
    BandwidthPeakFactor: number;
    WebSocketReceiveBufferMaxSize: any; // System.UInt16
    UdpSocketReceiveBufferMaxSize: any; // System.UInt32
    SSLCertFilePath: string;
    SSLPrivateKeyFilePath: string;
    SSLCAFilePath: string;
    ChannelCount: number;
    SharedOrderChannelCount: number;
    Channels: any; // System.Collections.Generic.List`1[UnityEngine.Networking.ChannelQOS]
    AddChannel: () => any;
    MakeChannelsSharedOrder: () => any;
    GetChannel: () => QosType;
    GetSharedOrderChannels: () => any;
  }
  //
  // Type: UnityEngine.Networking.HostTopology
  //
  export interface HostTopology {
    DefaultConfig: ConnectionConfig;
    MaxDefaultConnections: number;
    SpecialConnectionConfigsCount: number;
    SpecialConnectionConfigs: any; // System.Collections.Generic.List`1[UnityEngine.Networking.ConnectionConfig]
    ReceivedMessagePoolSize: any; // System.UInt16
    SentMessagePoolSize: any; // System.UInt16
    MessagePoolSizeGrowthFactor: number;
    GetSpecialConnectionConfig: () => ConnectionConfig;
    AddSpecialConnectionConfig: () => number;
  }
  //
  // Type: UnityEngine.Networking.GlobalConfig
  //
  export interface GlobalConfig {
    ThreadAwakeTimeout: any; // System.UInt32
    ReactorModel: ReactorModel;
    ReactorMaximumReceivedMessages: any; // System.UInt16
    ReactorMaximumSentMessages: any; // System.UInt16
    MaxPacketSize: any; // System.UInt16
    MaxHosts: any; // System.UInt16
    ThreadPoolSize: any; // System.Byte
    MinTimerTimeout: any; // System.UInt32
    MaxTimerTimeout: any; // System.UInt32
    MinNetSimulatorTimeout: any; // System.UInt32
    MaxNetSimulatorTimeout: any; // System.UInt32
    NetworkEventAvailable: any; // System.Action`1[System.Int32]
    ConnectionReadyForSend: any; // System.Action`2[System.Int32,System.Int32]
  }
  //
  // Type: UnityEngine.Networking.ConnectionSimulatorConfig
  //
  export interface ConnectionSimulatorConfig {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.Utility
  //
  export interface Utility {
    // static useRandomSourceID: boolean;
  }
  //
  // Type: UnityEngine.Networking.UnityWebRequestAssetBundle
  //
  export interface UnityWebRequestAssetBundle {
  }
  //
  // Type: UnityEngine.Networking.DownloadHandlerAssetBundle
  //
  export interface DownloadHandlerAssetBundle {
    assetBundle: AssetBundle;
    isDone: boolean;
    error: string;
    data: any; // System.Byte[]
    text: string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.NetworkAccessLevel
  //
  export interface NetworkAccessLevel {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.AppID
  //
  export interface AppID {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.SourceID
  //
  export interface SourceID {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.NetworkID
  //
  export interface NetworkID {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.NodeID
  //
  export interface NodeID {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.HostPriority
  //
  export interface HostPriority {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.Types.NetworkAccessToken
  //
  export interface NetworkAccessToken {
    array: any; // System.Byte[]
    GetByteString: () => string;
    IsValid: () => boolean;
  }
  //
  // Type: UnityEngine.Networking.Match.MatchInfo
  //
  export interface MatchInfo {
    address: string;
    port: number;
    domain: number;
    networkId: NetworkID;
    accessToken: NetworkAccessToken;
    nodeId: NodeID;
    usingRelay: boolean;
  }
  //
  // Type: UnityEngine.Networking.Match.MatchInfoSnapshot
  //
  export interface MatchInfoSnapshot {
    networkId: NetworkID;
    hostNodeId: NodeID;
    name: string;
    averageEloScore: number;
    maxSize: number;
    currentSize: number;
    isPrivate: boolean;
    matchAttributes: any; // System.Collections.Generic.Dictionary`2[System.String,System.Int64]
    directConnectInfos: any; // System.Collections.Generic.List`1[UnityEngine.Networking.Match.MatchInfoSnapshot+MatchInfoDirectConnectSnapshot]
  }
  //
  // Type: UnityEngine.Networking.Match.MatchInfoSnapshot+MatchInfoDirectConnectSnapshot
  //
  export interface MatchInfoSnapshot_MatchInfoDirectConnectSnapshot {
    nodeId: NodeID;
    publicAddress: string;
    privateAddress: string;
    hostPriority: HostPriority;
  }
  //
  // Type: UnityEngine.Networking.Match.NetworkMatch
  //
  export interface NetworkMatch {
    baseUri: any; // System.Uri
    useGUILayout: boolean;
    runInEditMode: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    SetProgramAppID: () => any;
    CreateMatch: () => Coroutine;
    JoinMatch: () => Coroutine;
    DestroyMatch: () => Coroutine;
    DropConnection: () => Coroutine;
    ListMatches: () => Coroutine;
    SetMatchAttributes: () => Coroutine;
    IsInvoking: () => boolean;
    CancelInvoke: () => any;
    Invoke: () => any;
    InvokeRepeating: () => any;
    StartCoroutine: () => Coroutine;
    StartCoroutine_Auto: () => Coroutine;
    StopCoroutine: () => any;
    StopAllCoroutines: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Networking.Match.NetworkMatch+BasicResponseDelegate
  //
  export interface NetworkMatch_BasicResponseDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.ConnectionTarget
  //
  export interface ConnectionTarget {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.IConnectionState
  //
  export interface IConnectionState {
    connectedToTarget: ConnectionTarget;
    connectionName: string;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.MessageEventArgs
  //
  export interface MessageEventArgs {
    playerId: number;
    data: any; // System.Byte[]
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.IEditorPlayerConnection
  //
  export interface IEditorPlayerConnection {
    Register: () => any;
    Unregister: () => any;
    DisconnectAll: () => any;
    RegisterConnection: () => any;
    RegisterDisconnection: () => any;
    UnregisterConnection: () => any;
    UnregisterDisconnection: () => any;
    Send: () => any;
    TrySend: () => boolean;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.PlayerConnection
  //
  export interface PlayerConnection {
    // static instance: PlayerConnection;
    isConnected: boolean;
    name: string;
    hideFlags: HideFlags;
    OnEnable: () => any;
    Register: () => any;
    Unregister: () => any;
    RegisterConnection: () => any;
    RegisterDisconnection: () => any;
    UnregisterConnection: () => any;
    UnregisterDisconnection: () => any;
    Send: () => any;
    TrySend: () => boolean;
    BlockUntilRecvMsg: () => boolean;
    DisconnectAll: () => any;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.PlayerEditorConnectionEvents+MessageEvent
  //
  export interface PlayerEditorConnectionEvents_MessageEvent {
    AddListener: () => any;
    RemoveListener: () => any;
    Invoke: () => any;
    GetPersistentEventCount: () => number;
    GetPersistentTarget: () => Object;
    GetPersistentMethodName: () => string;
    SetPersistentListenerState: () => any;
    RemoveAllListeners: () => any;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.PlayerEditorConnectionEvents+ConnectionChangeEvent
  //
  export interface PlayerEditorConnectionEvents_ConnectionChangeEvent {
    AddListener: () => any;
    RemoveListener: () => any;
    Invoke: () => any;
    GetPersistentEventCount: () => number;
    GetPersistentTarget: () => Object;
    GetPersistentMethodName: () => string;
    SetPersistentListenerState: () => any;
    RemoveAllListeners: () => any;
  }
  //
  // Type: UnityEngine.Networking.PlayerConnection.PlayerEditorConnectionEvents+MessageTypeSubscribers
  //
  export interface PlayerEditorConnectionEvents_MessageTypeSubscribers {
    MessageTypeId: any; // System.Guid
    subscriberCount: number;
    messageCallback: PlayerEditorConnectionEvents_MessageEvent;
  }
  //
  // Type: UnityEngine.tvOS.Remote
  //
  export interface Remote {
    // static allowExitToHome: boolean;
    // static allowRemoteRotation: boolean;
    // static reportAbsoluteDpadValues: boolean;
    // static touchesEnabled: boolean;
  }
  //
  // Type: UnityEngine.tvOS.DeviceGeneration
  //
  export interface DeviceGeneration {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.tvOS.Device
  //
  export interface Device {
    // static systemVersion: string;
    // static generation: DeviceGeneration;
    // static vendorIdentifier: string;
    // static advertisingIdentifier: string;
    // static advertisingTrackingEnabled: boolean;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView
  //
  export interface ADBannerView {
    loaded: boolean;
    visible: boolean;
    layout: ADBannerView_Layout;
    position: Vector2;
    size: Vector2;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView+Layout
  //
  export interface ADBannerView_Layout {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView+Type
  //
  export interface ADBannerView_Type {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView+BannerWasClickedDelegate
  //
  export interface ADBannerView_BannerWasClickedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView+BannerWasLoadedDelegate
  //
  export interface ADBannerView_BannerWasLoadedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADBannerView+BannerFailedToLoadDelegate
  //
  export interface ADBannerView_BannerFailedToLoadDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADInterstitialAd
  //
  export interface ADInterstitialAd {
    // static isAvailable: boolean;
    loaded: boolean;
    Show: () => any;
    ReloadAd: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADInterstitialAd+InterstitialWasLoadedDelegate
  //
  export interface ADInterstitialAd_InterstitialWasLoadedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.iOS.ADInterstitialAd+InterstitialWasViewedDelegate
  //
  export interface ADInterstitialAd_InterstitialWasViewedDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.iOS.DeviceGeneration
  //
  export interface DeviceGeneration {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.ActivityIndicatorStyle
  //
  export interface ActivityIndicatorStyle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.Device
  //
  export interface Device {
    // static systemVersion: string;
    // static generation: DeviceGeneration;
    // static vendorIdentifier: string;
    // static advertisingIdentifier: string;
    // static advertisingTrackingEnabled: boolean;
    // static hideHomeButton: boolean;
    // static lowPowerModeEnabled: boolean;
    // static wantsSoftwareDimming: boolean;
    // static deferSystemGesturesMode: SystemGestureDeferMode;
  }
  //
  // Type: UnityEngine.iOS.CalendarIdentifier
  //
  export interface CalendarIdentifier {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.CalendarUnit
  //
  export interface CalendarUnit {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.NotificationType
  //
  export interface NotificationType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.LocalNotification
  //
  export interface LocalNotification {
    // static defaultSoundName: string;
    timeZone: string;
    repeatCalendar: CalendarIdentifier;
    repeatInterval: CalendarUnit;
    fireDate: any; // System.DateTime
    alertBody: string;
    alertTitle: string;
    alertAction: string;
    alertLaunchImage: string;
    soundName: string;
    applicationIconBadgeNumber: number;
    userInfo: any; // System.Collections.IDictionary
    hasAction: boolean;
  }
  //
  // Type: UnityEngine.iOS.RemoteNotification
  //
  export interface RemoteNotification {
    alertBody: string;
    alertTitle: string;
    soundName: string;
    applicationIconBadgeNumber: number;
    userInfo: any; // System.Collections.IDictionary
    hasAction: boolean;
  }
  //
  // Type: UnityEngine.iOS.NotificationServices
  //
  export interface NotificationServices {
    // static localNotificationCount: number;
    // static remoteNotificationCount: number;
    // static enabledNotificationTypes: NotificationType;
    // static registrationError: string;
    // static deviceToken: any; // System.Byte[]
    // static localNotifications: LocalNotification[];
    // static remoteNotifications: RemoteNotification[];
    // static scheduledLocalNotifications: LocalNotification[];
  }
  //
  // Type: UnityEngine.iOS.SystemGestureDeferMode
  //
  export interface SystemGestureDeferMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.iOS.OnDemandResourcesRequest
  //
  export interface OnDemandResourcesRequest {
    error: string;
    loadingPriority: number;
    isDone: boolean;
    progress: number;
    priority: number;
    allowSceneActivation: boolean;
    GetResourcePath: () => string;
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.iOS.OnDemandResources
  //
  export interface OnDemandResources {
    // static enabled: boolean;
  }
  //
  // Type: UnityEngine.Rendering.AsyncGPUReadbackRequest
  //
  export interface AsyncGPUReadbackRequest {
    done: boolean;
    hasError: boolean;
    layerCount: number;
    layerDataSize: number;
    width: number;
    height: number;
    depth: number;
    Update: () => any;
    WaitForCompletion: () => any;
    GetData: () => any;
  }
  //
  // Type: UnityEngine.Rendering.AsyncGPUReadback
  //
  export interface AsyncGPUReadback {
  }
  //
  // Type: UnityEngine.Rendering.SynchronisationStage
  //
  export interface SynchronisationStage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.GPUFence
  //
  export interface GPUFence {
    passed: boolean;
  }
  //
  // Type: UnityEngine.Rendering.PIX
  //
  export interface PIX {
  }
  //
  // Type: UnityEngine.Rendering.ShaderHardwareTier
  //
  export interface ShaderHardwareTier {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.IndexFormat
  //
  export interface IndexFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.MeshUpdateFlags
  //
  export interface MeshUpdateFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VertexAttributeFormat
  //
  export interface VertexAttributeFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VertexAttribute
  //
  export interface VertexAttribute {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.OpaqueSortMode
  //
  export interface OpaqueSortMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderQueue
  //
  export interface RenderQueue {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderBufferLoadAction
  //
  export interface RenderBufferLoadAction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderBufferStoreAction
  //
  export interface RenderBufferStoreAction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.FastMemoryFlags
  //
  export interface FastMemoryFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BlendMode
  //
  export interface BlendMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BlendOp
  //
  export interface BlendOp {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CompareFunction
  //
  export interface CompareFunction {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CullMode
  //
  export interface CullMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ColorWriteMask
  //
  export interface ColorWriteMask {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.StencilOp
  //
  export interface StencilOp {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.AmbientMode
  //
  export interface AmbientMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.DefaultReflectionMode
  //
  export interface DefaultReflectionMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionCubemapCompression
  //
  export interface ReflectionCubemapCompression {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CameraEvent
  //
  export interface CameraEvent {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.LightEvent
  //
  export interface LightEvent {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShadowMapPass
  //
  export interface ShadowMapPass {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BuiltinRenderTextureType
  //
  export interface BuiltinRenderTextureType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.PassType
  //
  export interface PassType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShadowCastingMode
  //
  export interface ShadowCastingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.LightShadowResolution
  //
  export interface LightShadowResolution {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.GraphicsDeviceType
  //
  export interface GraphicsDeviceType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.GraphicsTier
  //
  export interface GraphicsTier {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SubMeshDescriptor
  //
  export interface SubMeshDescriptor {
    bounds: Bounds;
    topology: MeshTopology;
    indexStart: number;
    indexCount: number;
    baseVertex: number;
    firstVertex: number;
    vertexCount: number;
  }
  //
  // Type: UnityEngine.Rendering.VertexAttributeDescriptor
  //
  export interface VertexAttributeDescriptor {
    attribute: VertexAttribute;
    format: VertexAttributeFormat;
    dimension: number;
    stream: number;
  }
  //
  // Type: UnityEngine.Rendering.FormatSwizzle
  //
  export interface FormatSwizzle {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderTargetIdentifier
  //
  export interface RenderTargetIdentifier {
  }
  //
  // Type: UnityEngine.Rendering.RenderTargetFlags
  //
  export interface RenderTargetFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderTargetBinding
  //
  export interface RenderTargetBinding {
    colorRenderTargets: RenderTargetIdentifier[];
    depthRenderTarget: RenderTargetIdentifier;
    colorLoadActions: RenderBufferLoadAction[];
    colorStoreActions: RenderBufferStoreAction[];
    depthLoadAction: RenderBufferLoadAction;
    depthStoreAction: RenderBufferStoreAction;
    flags: RenderTargetFlags;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeUsage
  //
  export interface ReflectionProbeUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeType
  //
  export interface ReflectionProbeType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeClearFlags
  //
  export interface ReflectionProbeClearFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeMode
  //
  export interface ReflectionProbeMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeBlendInfo
  //
  export interface ReflectionProbeBlendInfo {
    probe: ReflectionProbe;
    weight: number;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeRefreshMode
  //
  export interface ReflectionProbeRefreshMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeTimeSlicingMode
  //
  export interface ReflectionProbeTimeSlicingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShadowSamplingMode
  //
  export interface ShadowSamplingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.LightProbeUsage
  //
  export interface LightProbeUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BuiltinShaderType
  //
  export interface BuiltinShaderType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BuiltinShaderMode
  //
  export interface BuiltinShaderMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BuiltinShaderDefine
  //
  export interface BuiltinShaderDefine {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VideoShadersIncludeMode
  //
  export interface VideoShadersIncludeMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.TextureDimension
  //
  export interface TextureDimension {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CopyTextureSupport
  //
  export interface CopyTextureSupport {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CameraHDRMode
  //
  export interface CameraHDRMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RealtimeGICPUUsage
  //
  export interface RealtimeGICPUUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ComputeQueueType
  //
  export interface ComputeQueueType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SinglePassStereoMode
  //
  export interface SinglePassStereoMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CommandBufferExecutionFlags
  //
  export interface CommandBufferExecutionFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderTextureSubElement
  //
  export interface RenderTextureSubElement {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderingThreadingMode
  //
  export interface RenderingThreadingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.OpenGLESVersion
  //
  export interface OpenGLESVersion {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SynchronisationStageFlags
  //
  export interface SynchronisationStageFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.GraphicsFenceType
  //
  export interface GraphicsFenceType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.GraphicsFence
  //
  export interface GraphicsFence {
    passed: boolean;
  }
  //
  // Type: UnityEngine.Rendering.GraphicsSettings
  //
  export interface GraphicsSettings {
    // static transparencySortMode: TransparencySortMode;
    // static transparencySortAxis: Vector3;
    // static realtimeDirectRectangularAreaLights: boolean;
    // static lightsUseLinearIntensity: boolean;
    // static lightsUseColorTemperature: boolean;
    // static defaultRenderingLayerMask: any; // System.UInt32
    // static useScriptableRenderPipelineBatching: boolean;
    // static logWhenShaderIsCompiled: boolean;
    // static disableBuiltinCustomRenderTextureUpdate: boolean;
    // static videoShadersIncludeMode: VideoShadersIncludeMode;
    // static currentRenderPipeline: RenderPipelineAsset;
    // static renderPipelineAsset: RenderPipelineAsset;
    // static defaultRenderPipeline: RenderPipelineAsset;
    // static allConfiguredRenderPipelines: RenderPipelineAsset[];
    name: string;
    hideFlags: HideFlags;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Rendering.OnDemandRendering
  //
  export interface OnDemandRendering {
    // static willCurrentFrameRender: boolean;
    // static renderFrameInterval: number;
    // static effectiveRenderFrameRate: number;
  }
  //
  // Type: UnityEngine.Rendering.CommandBuffer
  //
  export interface CommandBuffer {
    name: string;
    sizeInBytes: number;
    IssuePluginEventAndData: () => any;
    IssuePluginCustomBlit: () => any;
    IssuePluginCustomTextureUpdate: () => any;
    IssuePluginCustomTextureUpdateV1: () => any;
    IssuePluginCustomTextureUpdateV2: () => any;
    ProcessVTFeedback: () => any;
    CreateGPUFence: () => GPUFence;
    WaitOnGPUFence: () => any;
    DrawRenderer: () => any;
    DrawProcedural: () => any;
    DrawProceduralIndirect: () => any;
    DrawMeshInstanced: () => any;
    DrawMeshInstancedProcedural: () => any;
    DrawMeshInstancedIndirect: () => any;
    DrawOcclusionMesh: () => any;
    SetRandomWriteTarget: () => any;
    CopyCounterValue: () => any;
    CopyTexture: () => any;
    Blit: () => any;
    SetGlobalFloat: () => any;
    SetGlobalInt: () => any;
    SetGlobalVector: () => any;
    SetGlobalColor: () => any;
    SetGlobalMatrix: () => any;
    SetGlobalFloatArray: () => any;
    SetGlobalVectorArray: () => any;
    SetGlobalMatrixArray: () => any;
    SetGlobalTexture: () => any;
    SetGlobalBuffer: () => any;
    SetGlobalConstantBuffer: () => any;
    SetShadowSamplingMode: () => any;
    SetSinglePassStereo: () => any;
    IssuePluginEvent: () => any;
    SetComputeBufferData: () => any;
    SetComputeBufferCounterValue: () => any;
    Dispose: () => any;
    Release: () => any;
    CreateAsyncGraphicsFence: () => GraphicsFence;
    CreateGraphicsFence: () => GraphicsFence;
    WaitOnAsyncGraphicsFence: () => any;
    SetComputeFloatParam: () => any;
    SetComputeIntParam: () => any;
    SetComputeVectorParam: () => any;
    SetComputeVectorArrayParam: () => any;
    SetComputeMatrixParam: () => any;
    SetComputeMatrixArrayParam: () => any;
    SetComputeFloatParams: () => any;
    SetComputeIntParams: () => any;
    SetComputeTextureParam: () => any;
    SetComputeBufferParam: () => any;
    SetComputeConstantBufferParam: () => any;
    DispatchCompute: () => any;
    BuildRayTracingAccelerationStructure: () => any;
    SetRayTracingAccelerationStructure: () => any;
    SetRayTracingBufferParam: () => any;
    SetRayTracingConstantBufferParam: () => any;
    SetRayTracingTextureParam: () => any;
    SetRayTracingFloatParam: () => any;
    SetRayTracingFloatParams: () => any;
    SetRayTracingIntParam: () => any;
    SetRayTracingIntParams: () => any;
    SetRayTracingVectorParam: () => any;
    SetRayTracingVectorArrayParam: () => any;
    SetRayTracingMatrixParam: () => any;
    SetRayTracingMatrixArrayParam: () => any;
    DispatchRays: () => any;
    GenerateMips: () => any;
    ResolveAntiAliasedSurface: () => any;
    DrawMesh: () => any;
    GetTemporaryRT: () => any;
    GetTemporaryRTArray: () => any;
    ReleaseTemporaryRT: () => any;
    ClearRenderTarget: () => any;
    EnableShaderKeyword: () => any;
    DisableShaderKeyword: () => any;
    SetViewMatrix: () => any;
    SetProjectionMatrix: () => any;
    SetViewProjectionMatrices: () => any;
    SetGlobalDepthBias: () => any;
    SetExecutionFlags: () => any;
    BeginSample: () => any;
    EndSample: () => any;
    IncrementUpdateCount: () => any;
    SetInstanceMultiplier: () => any;
    SetRenderTarget: () => any;
    SetRayTracingShaderPass: () => any;
    Clear: () => any;
    ClearRandomWriteTargets: () => any;
    SetViewport: () => any;
    EnableScissorRect: () => any;
    DisableScissorRect: () => any;
    ConvertTexture: () => any;
    WaitAllAsyncReadbackRequests: () => any;
    RequestAsyncReadback: () => any;
    RequestAsyncReadbackIntoNativeArray: () => any;
    RequestAsyncReadbackIntoNativeSlice: () => any;
    SetInvertCulling: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CommandBufferExtensions
  //
  export interface CommandBufferExtensions {
  }
  //
  // Type: UnityEngine.Rendering.SplashScreen
  //
  export interface SplashScreen {
    // static isFinished: boolean;
  }
  //
  // Type: UnityEngine.Rendering.SplashScreen+StopBehavior
  //
  export interface SplashScreen_StopBehavior {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SphericalHarmonicsL2
  //
  export interface SphericalHarmonicsL2 {
    Clear: () => any;
    AddAmbientLight: () => any;
    AddDirectionalLight: () => any;
    Evaluate: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BatchVisibility
  //
  export interface BatchVisibility {
    offset: number;
    instancesCount: number;
    visibleCount: number;
  }
  //
  // Type: UnityEngine.Rendering.BatchCullingContext
  //
  export interface BatchCullingContext {
    cullingPlanes: any; // Unity.Collections.NativeArray`1[UnityEngine.Plane]
    batchVisibility: any; // Unity.Collections.NativeArray`1[UnityEngine.Rendering.BatchVisibility]
    visibleIndices: any; // Unity.Collections.NativeArray`1[System.Int32]
    visibleIndicesY: any; // Unity.Collections.NativeArray`1[System.Int32]
    lodParameters: LODParameters;
    cullingMatrix: Matrix4x4;
    nearPlane: number;
  }
  //
  // Type: UnityEngine.Rendering.BatchRendererGroup
  //
  export interface BatchRendererGroup {
    Dispose: () => any;
    AddBatch: () => number;
    SetBatchFlags: () => any;
    SetBatchPropertyMetadata: () => any;
    SetInstancingData: () => any;
    GetBatchMatrices: () => any;
    GetBatchScalarArrayInt: () => any;
    GetBatchScalarArray: () => any;
    GetBatchVectorArrayInt: () => any;
    GetBatchVectorArray: () => any;
    GetBatchMatrixArray: () => any;
    SetBatchBounds: () => any;
    GetNumBatches: () => number;
    RemoveBatch: () => any;
    EnableVisibleIndicesYArray: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BatchRendererGroup+OnPerformCulling
  //
  export interface BatchRendererGroup_OnPerformCulling {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Rendering.AttachmentDescriptor
  //
  export interface AttachmentDescriptor {
    loadAction: RenderBufferLoadAction;
    storeAction: RenderBufferStoreAction;
    graphicsFormat: GraphicsFormat;
    format: RenderTextureFormat;
    loadStoreTarget: RenderTargetIdentifier;
    resolveTarget: RenderTargetIdentifier;
    clearColor: Color;
    clearDepth: number;
    clearStencil: any; // System.UInt32
    ConfigureTarget: () => any;
    ConfigureResolveTarget: () => any;
    ConfigureClear: () => any;
  }
  //
  // Type: UnityEngine.Rendering.BlendState
  //
  export interface BlendState {
    // static defaultValue: BlendState;
    separateMRTBlendStates: boolean;
    alphaToMask: boolean;
    blendState0: RenderTargetBlendState;
    blendState1: RenderTargetBlendState;
    blendState2: RenderTargetBlendState;
    blendState3: RenderTargetBlendState;
    blendState4: RenderTargetBlendState;
    blendState5: RenderTargetBlendState;
    blendState6: RenderTargetBlendState;
    blendState7: RenderTargetBlendState;
  }
  //
  // Type: UnityEngine.Rendering.CameraProperties
  //
  export interface CameraProperties {
    GetShadowCullingPlane: () => Plane;
    SetShadowCullingPlane: () => any;
    GetCameraCullingPlane: () => Plane;
    SetCameraCullingPlane: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CullingOptions
  //
  export interface CullingOptions {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ScriptableCullingParameters
  //
  export interface ScriptableCullingParameters {
    // static cullingJobsLowerLimit: number;
    // static cullingJobsUpperLimit: number;
    maximumVisibleLights: number;
    cullingPlaneCount: number;
    isOrthographic: boolean;
    lodParameters: LODParameters;
    cullingMask: any; // System.UInt32
    cullingMatrix: Matrix4x4;
    origin: Vector3;
    shadowDistance: number;
    cullingOptions: CullingOptions;
    reflectionProbeSortingCriteria: ReflectionProbeSortingCriteria;
    cameraProperties: CameraProperties;
    stereoViewMatrix: Matrix4x4;
    stereoProjectionMatrix: Matrix4x4;
    stereoSeparationDistance: number;
    accurateOcclusionThreshold: number;
    maximumPortalCullingJobs: number;
    GetLayerCullingDistance: () => number;
    SetLayerCullingDistance: () => any;
    GetCullingPlane: () => Plane;
    SetCullingPlane: () => any;
  }
  //
  // Type: UnityEngine.Rendering.CullingResults
  //
  export interface CullingResults {
    visibleLights: any; // Unity.Collections.NativeArray`1[UnityEngine.Rendering.VisibleLight]
    visibleOffscreenVertexLights: any; // Unity.Collections.NativeArray`1[UnityEngine.Rendering.VisibleLight]
    visibleReflectionProbes: any; // Unity.Collections.NativeArray`1[UnityEngine.Rendering.VisibleReflectionProbe]
    lightIndexCount: number;
    reflectionProbeIndexCount: number;
    lightAndReflectionProbeIndexCount: number;
    FillLightAndReflectionProbeIndices: () => any;
    GetLightIndexMap: () => any;
    SetLightIndexMap: () => any;
    GetReflectionProbeIndexMap: () => any;
    SetReflectionProbeIndexMap: () => any;
    GetShadowCasterBounds: () => boolean;
    ComputeSpotShadowMatricesAndCullingPrimitives: () => boolean;
    ComputePointShadowMatricesAndCullingPrimitives: () => boolean;
    ComputeDirectionalShadowMatricesAndCullingPrimitives: () => boolean;
  }
  //
  // Type: UnityEngine.Rendering.DepthState
  //
  export interface DepthState {
    // static defaultValue: DepthState;
    writeEnabled: boolean;
    compareFunction: CompareFunction;
  }
  //
  // Type: UnityEngine.Rendering.DrawingSettings
  //
  export interface DrawingSettings {
    sortingSettings: SortingSettings;
    perObjectData: PerObjectData;
    enableDynamicBatching: boolean;
    enableInstancing: boolean;
    overrideMaterial: Material;
    overrideMaterialPassIndex: number;
    mainLightIndex: number;
    GetShaderPassName: () => ShaderTagId;
    SetShaderPassName: () => any;
  }
  //
  // Type: UnityEngine.Rendering.FilteringSettings
  //
  export interface FilteringSettings {
    // static defaultValue: FilteringSettings;
    renderQueueRange: RenderQueueRange;
    layerMask: number;
    renderingLayerMask: any; // System.UInt32
    excludeMotionVectorObjects: boolean;
    sortingLayerRange: SortingLayerRange;
  }
  //
  // Type: UnityEngine.Rendering.GizmoSubset
  //
  export interface GizmoSubset {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.LODParameters
  //
  export interface LODParameters {
    isOrthographic: boolean;
    cameraPosition: Vector3;
    fieldOfView: number;
    orthoSize: number;
    cameraPixelHeight: number;
  }
  //
  // Type: UnityEngine.Rendering.PerObjectData
  //
  export interface PerObjectData {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RasterState
  //
  export interface RasterState {
    cullingMode: CullMode;
    depthClip: boolean;
    conservative: boolean;
    offsetUnits: number;
    offsetFactor: number;
  }
  //
  // Type: UnityEngine.Rendering.ReflectionProbeSortingCriteria
  //
  export interface ReflectionProbeSortingCriteria {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderPipeline
  //
  export interface RenderPipeline {
    disposed: boolean;
  }
  //
  // Type: UnityEngine.Rendering.RenderPipelineAsset
  //
  export interface RenderPipelineAsset {
    terrainBrushPassIndex: number;
    renderingLayerMaskNames: any; // System.String[]
    defaultMaterial: Material;
    autodeskInteractiveShader: Shader;
    autodeskInteractiveTransparentShader: Shader;
    autodeskInteractiveMaskedShader: Shader;
    terrainDetailLitShader: Shader;
    terrainDetailGrassShader: Shader;
    terrainDetailGrassBillboardShader: Shader;
    defaultParticleMaterial: Material;
    defaultLineMaterial: Material;
    defaultTerrainMaterial: Material;
    defaultUIMaterial: Material;
    defaultUIOverdrawMaterial: Material;
    defaultUIETC1SupportedMaterial: Material;
    default2DMaterial: Material;
    defaultShader: Shader;
    defaultSpeedTree7Shader: Shader;
    defaultSpeedTree8Shader: Shader;
    name: string;
    hideFlags: HideFlags;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Rendering.RenderPipelineManager
  //
  export interface RenderPipelineManager {
    // static currentPipeline: RenderPipeline;
  }
  //
  // Type: UnityEngine.Rendering.RenderQueueRange
  //
  export interface RenderQueueRange {
    // static all: RenderQueueRange;
    // static opaque: RenderQueueRange;
    // static transparent: RenderQueueRange;
    lowerBound: number;
    upperBound: number;
  }
  //
  // Type: UnityEngine.Rendering.RenderStateBlock
  //
  export interface RenderStateBlock {
    blendState: BlendState;
    rasterState: RasterState;
    depthState: DepthState;
    stencilState: StencilState;
    stencilReference: number;
    mask: RenderStateMask;
  }
  //
  // Type: UnityEngine.Rendering.RenderStateMask
  //
  export interface RenderStateMask {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.RenderTargetBlendState
  //
  export interface RenderTargetBlendState {
    // static defaultValue: RenderTargetBlendState;
    writeMask: ColorWriteMask;
    sourceColorBlendMode: BlendMode;
    destinationColorBlendMode: BlendMode;
    sourceAlphaBlendMode: BlendMode;
    destinationAlphaBlendMode: BlendMode;
    colorBlendOperation: BlendOp;
    alphaBlendOperation: BlendOp;
  }
  //
  // Type: UnityEngine.Rendering.ScopedRenderPass
  //
  export interface ScopedRenderPass {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ScopedSubPass
  //
  export interface ScopedSubPass {
    Dispose: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ScriptableRenderContext
  //
  export interface ScriptableRenderContext {
    BeginRenderPass: () => any;
    BeginScopedRenderPass: () => ScopedRenderPass;
    BeginSubPass: () => any;
    BeginScopedSubPass: () => ScopedSubPass;
    EndSubPass: () => any;
    EndRenderPass: () => any;
    Submit: () => any;
    DrawRenderers: () => any;
    DrawShadows: () => any;
    ExecuteCommandBuffer: () => any;
    ExecuteCommandBufferAsync: () => any;
    SetupCameraProperties: () => any;
    StereoEndRender: () => any;
    StartMultiEye: () => any;
    StopMultiEye: () => any;
    DrawSkybox: () => any;
    InvokeOnRenderObjectCallback: () => any;
    DrawGizmos: () => any;
    DrawWireOverlay: () => any;
    DrawUIOverlay: () => any;
    Cull: () => CullingResults;
  }
  //
  // Type: UnityEngine.Rendering.ShaderTagId
  //
  export interface ShaderTagId {
    name: string;
  }
  //
  // Type: UnityEngine.Rendering.ShadowDrawingSettings
  //
  export interface ShadowDrawingSettings {
    cullingResults: CullingResults;
    lightIndex: number;
    useRenderingLayerMaskTest: boolean;
    splitData: ShadowSplitData;
  }
  //
  // Type: UnityEngine.Rendering.ShadowSplitData
  //
  export interface ShadowSplitData {
    cullingPlaneCount: number;
    cullingSphere: Vector4;
    shadowCascadeBlendCullingFactor: number;
    GetCullingPlane: () => Plane;
    SetCullingPlane: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SortingCriteria
  //
  export interface SortingCriteria {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SortingLayerRange
  //
  export interface SortingLayerRange {
    // static all: SortingLayerRange;
    lowerBound: any; // System.Int16
    upperBound: any; // System.Int16
  }
  //
  // Type: UnityEngine.Rendering.DistanceMetric
  //
  export interface DistanceMetric {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SortingSettings
  //
  export interface SortingSettings {
    worldToCameraMatrix: Matrix4x4;
    cameraPosition: Vector3;
    customAxis: Vector3;
    criteria: SortingCriteria;
    distanceMetric: DistanceMetric;
  }
  //
  // Type: UnityEngine.Rendering.StencilState
  //
  export interface StencilState {
    // static defaultValue: StencilState;
    enabled: boolean;
    readMask: any; // System.Byte
    writeMask: any; // System.Byte
    compareFunctionFront: CompareFunction;
    passOperationFront: StencilOp;
    failOperationFront: StencilOp;
    zFailOperationFront: StencilOp;
    compareFunctionBack: CompareFunction;
    passOperationBack: StencilOp;
    failOperationBack: StencilOp;
    zFailOperationBack: StencilOp;
    SetCompareFunction: () => any;
    SetPassOperation: () => any;
    SetFailOperation: () => any;
    SetZFailOperation: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SupportedRenderingFeatures
  //
  export interface SupportedRenderingFeatures {
    // static active: SupportedRenderingFeatures;
    reflectionProbeModes: SupportedRenderingFeatures_ReflectionProbeModes;
    defaultMixedLightingModes: SupportedRenderingFeatures_LightmapMixedBakeModes;
    mixedLightingModes: SupportedRenderingFeatures_LightmapMixedBakeModes;
    lightmapBakeTypes: LightmapBakeType;
    lightmapsModes: LightmapsMode;
    enlighten: boolean;
    lightProbeProxyVolumes: boolean;
    motionVectors: boolean;
    receiveShadows: boolean;
    reflectionProbes: boolean;
    rendererPriority: boolean;
    terrainDetailUnsupported: boolean;
    rendersUIOverlay: boolean;
    overridesEnvironmentLighting: boolean;
    overridesFog: boolean;
    overridesRealtimeReflectionProbes: boolean;
    overridesOtherLightingSettings: boolean;
    editableMaterialRenderQueue: boolean;
    overridesLODBias: boolean;
    overridesMaximumLODLevel: boolean;
    rendererProbes: boolean;
    particleSystemInstancing: boolean;
    overridesShadowmask: boolean;
    overrideShadowmaskMessage: string;
    shadowmaskMessage: string;
  }
  //
  // Type: UnityEngine.Rendering.SupportedRenderingFeatures+ReflectionProbeModes
  //
  export interface SupportedRenderingFeatures_ReflectionProbeModes {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SupportedRenderingFeatures+LightmapMixedBakeModes
  //
  export interface SupportedRenderingFeatures_LightmapMixedBakeModes {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VisibleLight
  //
  export interface VisibleLight {
    light: Light;
    lightType: LightType;
    finalColor: Color;
    screenRect: Rect;
    localToWorldMatrix: Matrix4x4;
    range: number;
    spotAngle: number;
    intersectsNearPlane: boolean;
    intersectsFarPlane: boolean;
  }
  //
  // Type: UnityEngine.Rendering.VisibleReflectionProbe
  //
  export interface VisibleReflectionProbe {
    texture: Texture;
    reflectionProbe: ReflectionProbe;
    bounds: Bounds;
    localToWorldMatrix: Matrix4x4;
    hdrData: Vector4;
    center: Vector3;
    blendDistance: number;
    importance: number;
    isBoxProjection: boolean;
  }
  //
  // Type: UnityEngine.Rendering.PlatformKeywordSet
  //
  export interface PlatformKeywordSet {
    IsEnabled: () => boolean;
    Enable: () => any;
    Disable: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShaderKeywordType
  //
  export interface ShaderKeywordType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShaderKeyword
  //
  export interface ShaderKeyword {
    index: number;
    IsValid: () => boolean;
    GetKeywordType: () => ShaderKeywordType;
    GetKeywordName: () => string;
    GetName: () => string;
  }
  //
  // Type: UnityEngine.Rendering.ShaderKeywordSet
  //
  export interface ShaderKeywordSet {
    IsEnabled: () => boolean;
    Enable: () => any;
    Disable: () => any;
    GetShaderKeywords: () => ShaderKeyword[];
  }
  //
  // Type: UnityEngine.Rendering.ShaderPropertyType
  //
  export interface ShaderPropertyType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.ShaderPropertyFlags
  //
  export interface ShaderPropertyFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.SortingGroup
  //
  export interface SortingGroup {
    sortingLayerName: string;
    sortingLayerID: number;
    sortingOrder: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Rendering.UVChannelFlags
  //
  export interface UVChannelFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.System
  //
  export interface System {
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.EditorHelpers
  //
  export interface EditorHelpers {
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Debugging
  //
  export interface Debugging {
    // static debugTilesEnabled: boolean;
    // static resolvingEnabled: boolean;
    // static flushEveryTickEnabled: boolean;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Debugging+Handle
  //
  export interface Debugging_Handle {
    handle: any; // System.Int64
    group: string;
    name: string;
    numLayers: number;
    material: Material;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Resolver
  //
  export interface Resolver {
    CurrentWidth: number;
    CurrentHeight: number;
    Dispose: () => any;
    UpdateSize: () => any;
    Process: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.GPUCacheSetting
  //
  export interface GPUCacheSetting {
    format: GraphicsFormat;
    sizeInMegaBytes: any; // System.UInt32
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.FilterMode
  //
  export interface FilterMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Streaming
  //
  export interface Streaming {
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural
  //
  export interface Procedural {
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+CreationParameters
  //
  export interface Procedural_CreationParameters {
    width: number;
    height: number;
    maxActiveRequests: number;
    tilesize: number;
    layers: GraphicsFormat[];
    filterMode: FilterMode;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+GPUTextureStackRequestLayerParameters
  //
  export interface Procedural_GPUTextureStackRequestLayerParameters {
    destX: number;
    destY: number;
    dest: RenderTargetIdentifier;
    GetWidth: () => number;
    GetHeight: () => number;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+CPUTextureStackRequestLayerParameters
  //
  export interface Procedural_CPUTextureStackRequestLayerParameters {
    scanlineSize: number;
    mipScanlineSize: number;
    requiresCachedMip: boolean;
    GetData: () => any;
    GetMipData: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+GPUTextureStackRequestParameters
  //
  export interface Procedural_GPUTextureStackRequestParameters {
    level: number;
    x: number;
    y: number;
    width: number;
    height: number;
    numLayers: number;
    GetLayer: () => Procedural_GPUTextureStackRequestLayerParameters;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+CPUTextureStackRequestParameters
  //
  export interface Procedural_CPUTextureStackRequestParameters {
    level: number;
    x: number;
    y: number;
    width: number;
    height: number;
    numLayers: number;
    GetLayer: () => Procedural_CPUTextureStackRequestLayerParameters;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+RequestStatus
  //
  export interface Procedural_RequestStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+GPUTextureStack
  //
  export interface Procedural_GPUTextureStack {
    PopRequests: () => number;
    IsValid: () => boolean;
    Dispose: () => any;
    BindToMaterialPropertyBlock: () => any;
    BindToMaterial: () => any;
    BindGlobally: () => any;
    RequestRegion: () => any;
    InvalidateRegion: () => any;
    EvictRegion: () => any;
  }
  //
  // Type: UnityEngine.Rendering.VirtualTexturing.Procedural+CPUTextureStack
  //
  export interface Procedural_CPUTextureStack {
    PopRequests: () => number;
    IsValid: () => boolean;
    Dispose: () => any;
    BindToMaterialPropertyBlock: () => any;
    BindToMaterial: () => any;
    BindGlobally: () => any;
    RequestRegion: () => any;
    InvalidateRegion: () => any;
    EvictRegion: () => any;
  }
  //
  // Type: UnityEngine.Playables.FrameData
  //
  export interface FrameData {
    frameId: any; // System.UInt64
    deltaTime: number;
    weight: number;
    effectiveWeight: number;
    effectiveParentDelay: number;
    effectiveParentSpeed: number;
    effectiveSpeed: number;
    evaluationType: FrameData_EvaluationType;
    seekOccurred: boolean;
    timeLooped: boolean;
    timeHeld: boolean;
    output: PlayableOutput;
    effectivePlayState: PlayState;
  }
  //
  // Type: UnityEngine.Playables.FrameData+EvaluationType
  //
  export interface FrameData_EvaluationType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.INotification
  //
  export interface INotification {
    id: PropertyName;
  }
  //
  // Type: UnityEngine.Playables.INotificationReceiver
  //
  export interface INotificationReceiver {
    OnNotify: () => any;
  }
  //
  // Type: UnityEngine.Playables.IPlayable
  //
  export interface IPlayable {
    GetHandle: () => PlayableHandle;
  }
  //
  // Type: UnityEngine.Playables.IPlayableBehaviour
  //
  export interface IPlayableBehaviour {
    OnGraphStart: () => any;
    OnGraphStop: () => any;
    OnPlayableCreate: () => any;
    OnPlayableDestroy: () => any;
    OnBehaviourPlay: () => any;
    OnBehaviourPause: () => any;
    PrepareFrame: () => any;
    ProcessFrame: () => any;
  }
  //
  // Type: UnityEngine.Playables.IPlayableOutput
  //
  export interface IPlayableOutput {
    GetHandle: () => PlayableOutputHandle;
  }
  //
  // Type: UnityEngine.Playables.Notification
  //
  export interface Notification {
    id: PropertyName;
  }
  //
  // Type: UnityEngine.Playables.DirectorWrapMode
  //
  export interface DirectorWrapMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.Playable
  //
  export interface Playable {
    // static Null: Playable;
    GetHandle: () => PlayableHandle;
    IsPlayableOfType: () => boolean;
    GetPlayableType: () => any;
  }
  //
  // Type: UnityEngine.Playables.IPlayableAsset
  //
  export interface IPlayableAsset {
    duration: number;
    outputs: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Playables.PlayableBinding]
    CreatePlayable: () => Playable;
  }
  //
  // Type: UnityEngine.Playables.PlayableAsset
  //
  export interface PlayableAsset {
    duration: number;
    outputs: any; // System.Collections.Generic.IEnumerable`1[UnityEngine.Playables.PlayableBinding]
    name: string;
    hideFlags: HideFlags;
    CreatePlayable: () => Playable;
    SetDirty: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Playables.PlayableBehaviour
  //
  export interface PlayableBehaviour {
    OnGraphStart: () => any;
    OnGraphStop: () => any;
    OnPlayableCreate: () => any;
    OnPlayableDestroy: () => any;
    OnBehaviourDelay: () => any;
    OnBehaviourPlay: () => any;
    OnBehaviourPause: () => any;
    PrepareData: () => any;
    PrepareFrame: () => any;
    ProcessFrame: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Playables.DataStreamType
  //
  export interface DataStreamType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.PlayableBinding
  //
  export interface PlayableBinding {
    streamName: string;
    sourceObject: Object;
    outputTargetType: any; // System.Type
    sourceBindingType: any; // System.Type
    streamType: DataStreamType;
  }
  //
  // Type: UnityEngine.Playables.PlayableTraversalMode
  //
  export interface PlayableTraversalMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.PlayableExtensions
  //
  export interface PlayableExtensions {
  }
  //
  // Type: UnityEngine.Playables.DirectorUpdateMode
  //
  export interface DirectorUpdateMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.PlayableGraph
  //
  export interface PlayableGraph {
    GetRootPlayable: () => Playable;
    Connect: () => boolean;
    Disconnect: () => any;
    DestroyPlayable: () => any;
    DestroySubgraph: () => any;
    DestroyOutput: () => any;
    GetOutputCountByType: () => number;
    GetOutput: () => PlayableOutput;
    GetOutputByType: () => PlayableOutput;
    Evaluate: () => any;
    Destroy: () => any;
    IsValid: () => boolean;
    IsPlaying: () => boolean;
    IsDone: () => boolean;
    Play: () => any;
    Stop: () => any;
    GetTimeUpdateMode: () => DirectorUpdateMode;
    SetTimeUpdateMode: () => any;
    GetResolver: () => IExposedPropertyTable;
    SetResolver: () => any;
    GetPlayableCount: () => number;
    GetRootPlayableCount: () => number;
    GetOutputCount: () => number;
    GetEditorName: () => string;
  }
  //
  // Type: UnityEngine.Playables.PlayState
  //
  export interface PlayState {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Playables.PlayableHandle
  //
  export interface PlayableHandle {
    // static Null: PlayableHandle;
  }
  //
  // Type: UnityEngine.Playables.PlayableOutput
  //
  export interface PlayableOutput {
    // static Null: PlayableOutput;
    GetHandle: () => PlayableOutputHandle;
    IsPlayableOutputOfType: () => boolean;
    GetPlayableOutputType: () => any;
  }
  //
  // Type: UnityEngine.Playables.PlayableOutputExtensions
  //
  export interface PlayableOutputExtensions {
  }
  //
  // Type: UnityEngine.Playables.PlayableOutputHandle
  //
  export interface PlayableOutputHandle {
    // static Null: PlayableOutputHandle;
  }
  //
  // Type: UnityEngine.Playables.ScriptPlayableBinding
  //
  export interface ScriptPlayableBinding {
  }
  //
  // Type: UnityEngine.Playables.ScriptPlayableOutput
  //
  export interface ScriptPlayableOutput {
    // static Null: ScriptPlayableOutput;
    GetHandle: () => PlayableOutputHandle;
  }
  //
  // Type: UnityEngine.Playables.AnimationPlayableUtilities
  //
  export interface AnimationPlayableUtilities {
  }
  //
  // Type: UnityEngine.Playables.PlayableDirector
  //
  export interface PlayableDirector {
    state: PlayState;
    extrapolationMode: DirectorWrapMode;
    playableAsset: PlayableAsset;
    playableGraph: PlayableGraph;
    playOnAwake: boolean;
    timeUpdateMode: DirectorUpdateMode;
    time: number;
    initialTime: number;
    duration: number;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: Transform;
    gameObject: GameObject;
    tag: string;
    rigidbody: Component;
    rigidbody2D: Component;
    camera: Component;
    light: Component;
    animation: Component;
    constantForce: Component;
    renderer: Component;
    audio: Component;
    networkView: Component;
    collider: Component;
    collider2D: Component;
    hingeJoint: Component;
    particleSystem: Component;
    name: string;
    hideFlags: HideFlags;
    DeferredEvaluate: () => any;
    Play: () => any;
    SetGenericBinding: () => any;
    Evaluate: () => any;
    Stop: () => any;
    Pause: () => any;
    Resume: () => any;
    RebuildGraph: () => any;
    ClearReferenceValue: () => any;
    SetReferenceValue: () => any;
    GetReferenceValue: () => Object;
    GetGenericBinding: () => Object;
    ClearGenericBinding: () => any;
    RebindPlayableGraphOutputs: () => any;
    GetComponent: () => Component;
    TryGetComponent: () => boolean;
    GetComponentInChildren: () => Component;
    GetComponentsInChildren: () => Component[];
    GetComponentInParent: () => Component;
    GetComponentsInParent: () => Component[];
    GetComponents: () => Component[];
    CompareTag: () => boolean;
    SendMessageUpwards: () => any;
    SendMessage: () => any;
    BroadcastMessage: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Diagnostics.ForcedCrashCategory
  //
  export interface ForcedCrashCategory {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Diagnostics.Utils
  //
  export interface Utils {
  }
  //
  // Type: UnityEngine.Diagnostics.PlayerConnection
  //
  export interface PlayerConnection {
    // static connected: boolean;
  }
  //
  // Type: UnityEngine.Experimental.AssetBundlePatching.AssetBundleUtility
  //
  export interface AssetBundleUtility {
  }
  //
  // Type: UnityEngine.Experimental.Video.VideoClipPlayable
  //
  export interface VideoClipPlayable {
    GetHandle: () => PlayableHandle;
    GetClip: () => VideoClip;
    SetClip: () => any;
    GetLooped: () => boolean;
    SetLooped: () => any;
    IsPlaying: () => boolean;
    GetStartDelay: () => number;
    GetPauseDelay: () => number;
    Seek: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Video.VideoPlayerExtensions
  //
  export interface VideoPlayerExtensions {
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.BrushTransform
  //
  export interface BrushTransform {
    brushOrigin: Vector2;
    brushU: Vector2;
    brushV: Vector2;
    targetOrigin: Vector2;
    targetX: Vector2;
    targetY: Vector2;
    GetBrushXYBounds: () => Rect;
    ToBrushUV: () => Vector2;
    FromBrushUV: () => Vector2;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.PaintContext
  //
  export interface PaintContext {
    // static kNormalizedHeightScale: number;
    originTerrain: Terrain;
    pixelRect: RectInt;
    targetTextureWidth: number;
    targetTextureHeight: number;
    pixelSize: Vector2;
    sourceRenderTexture: RenderTexture;
    destinationRenderTexture: RenderTexture;
    oldRenderTexture: RenderTexture;
    terrainCount: number;
    heightWorldSpaceMin: number;
    heightWorldSpaceSize: number;
    GetTerrain: () => Terrain;
    GetClippedPixelRectInTerrainPixels: () => RectInt;
    GetClippedPixelRectInRenderTexturePixels: () => RectInt;
    CreateRenderTargets: () => any;
    Cleanup: () => any;
    Gather: () => any;
    Scatter: () => any;
    GatherHeightmap: () => any;
    ScatterHeightmap: () => any;
    GatherHoles: () => any;
    ScatterHoles: () => any;
    GatherNormals: () => any;
    GatherAlphamap: () => any;
    ScatterAlphamap: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.PaintContext+ITerrainInfo
  //
  export interface PaintContext_ITerrainInfo {
    terrain: Terrain;
    clippedTerrainPixels: RectInt;
    clippedPCPixels: RectInt;
    gatherEnable: boolean;
    scatterEnable: boolean;
    userData: any; // System.Object
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainCallbacks
  //
  export interface TerrainCallbacks {
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainCallbacks+HeightmapChangedCallback
  //
  export interface TerrainCallbacks_HeightmapChangedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainCallbacks+TextureChangedCallback
  //
  export interface TerrainCallbacks_TextureChangedCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainPaintUtility
  //
  export interface TerrainPaintUtility {
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainPaintUtility+BuiltinPaintMaterialPasses
  //
  export interface TerrainPaintUtility_BuiltinPaintMaterialPasses {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility
  //
  export interface TerrainUtility {
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap
  //
  export interface TerrainUtility_TerrainMap {
    m_errorCode: TerrainUtility_TerrainMap_ErrorCode;
    m_terrainTiles: any; // System.Collections.Generic.Dictionary`2[UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap+TileCoord,UnityEngine.Terrain]
    GetTerrain: () => Terrain;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap+TerrainFilter
  //
  export interface TerrainUtility_TerrainMap_TerrainFilter {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => boolean;
    BeginInvoke: () => any;
    EndInvoke: () => boolean;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap+TileCoord
  //
  export interface TerrainUtility_TerrainMap_TileCoord {
    tileX: number;
    tileZ: number;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap+ErrorCode
  //
  export interface TerrainUtility_TerrainMap_ErrorCode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainGroups
  //
  export interface TerrainUtility_TerrainGroups {
    Comparer: any; // System.Collections.Generic.IEqualityComparer`1[System.Int32]
    Count: number;
    Keys: any; // System.Collections.Generic.Dictionary`2+KeyCollection[System.Int32,UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap]
    Values: any; // System.Collections.Generic.Dictionary`2+ValueCollection[System.Int32,UnityEngine.Experimental.TerrainAPI.TerrainUtility+TerrainMap]
    Add: () => any;
    Clear: () => any;
    ContainsKey: () => boolean;
    ContainsValue: () => boolean;
    GetEnumerator: () => any;
    Remove: () => boolean;
    TryGetValue: () => boolean;
    GetObjectData: () => any;
    OnDeserialization: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Audio.AudioSampleProvider
  //
  export interface AudioSampleProvider {
    // static consumeSampleFramesNativeFunction: AudioSampleProvider_ConsumeSampleFramesNativeFunction;
    id: any; // System.UInt32
    trackIndex: any; // System.UInt16
    owner: Object;
    valid: boolean;
    channelCount: any; // System.UInt16
    sampleRate: any; // System.UInt32
    maxSampleFrameCount: any; // System.UInt32
    availableSampleFrameCount: any; // System.UInt32
    freeSampleFrameCount: any; // System.UInt32
    freeSampleFrameCountLowThreshold: any; // System.UInt32
    enableSampleFramesAvailableEvents: boolean;
    enableSilencePadding: boolean;
    Dispose: () => any;
    ConsumeSampleFrames: () => any;
    SetSampleFramesAvailableNativeHandler: () => any;
    ClearSampleFramesAvailableNativeHandler: () => any;
    SetSampleFramesOverflowNativeHandler: () => any;
    ClearSampleFramesOverflowNativeHandler: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Audio.AudioSampleProvider+ConsumeSampleFramesNativeFunction
  //
  export interface AudioSampleProvider_ConsumeSampleFramesNativeFunction {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Audio.AudioSampleProvider+SampleFramesHandler
  //
  export interface AudioSampleProvider_SampleFramesHandler {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Audio.AudioSampleProvider+SampleFramesEventNativeFunction
  //
  export interface AudioSampleProvider_SampleFramesEventNativeFunction {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Animations.AnimationStreamSource
  //
  export interface AnimationStreamSource {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Animations.AnimationPlayableOutputExtensions
  //
  export interface AnimationPlayableOutputExtensions {
  }
  //
  // Type: UnityEngine.Experimental.AI.PolygonId
  //
  export interface PolygonId {
    IsNull: () => boolean;
  }
  //
  // Type: UnityEngine.Experimental.AI.NavMeshLocation
  //
  export interface NavMeshLocation {
    polygon: PolygonId;
    position: Vector3;
  }
  //
  // Type: UnityEngine.Experimental.AI.PathQueryStatus
  //
  export interface PathQueryStatus {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.AI.NavMeshPolyTypes
  //
  export interface NavMeshPolyTypes {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.AI.NavMeshWorld
  //
  export interface NavMeshWorld {
    IsValid: () => boolean;
    AddDependency: () => any;
  }
  //
  // Type: UnityEngine.Experimental.AI.NavMeshQuery
  //
  export interface NavMeshQuery {
    Dispose: () => any;
    BeginFindPath: () => PathQueryStatus;
    UpdateFindPath: () => PathQueryStatus;
    EndFindPath: () => PathQueryStatus;
    GetPathResult: () => number;
    IsValid: () => boolean;
    GetAgentTypeIdForPolygon: () => number;
    CreateLocation: () => NavMeshLocation;
    MapLocation: () => NavMeshLocation;
    MoveLocations: () => any;
    MoveLocationsInSameAreas: () => any;
    MoveLocation: () => NavMeshLocation;
    GetPortalPoints: () => boolean;
    PolygonLocalToWorldMatrix: () => Matrix4x4;
    PolygonWorldToLocalMatrix: () => Matrix4x4;
    GetPolygonType: () => NavMeshPolyTypes;
    Raycast: () => PathQueryStatus;
    GetEdgesAndNeighbors: () => PathQueryStatus;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.LightType
  //
  export interface LightType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.LightMode
  //
  export interface LightMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.FalloffType
  //
  export interface FalloffType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.AngularFalloffType
  //
  export interface AngularFalloffType {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.LinearColor
  //
  export interface LinearColor {
    red: number;
    green: number;
    blue: number;
    intensity: number;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.DirectionalLight
  //
  export interface DirectionalLight {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    penumbraWidthRadian: number;
    direction: Vector3;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.PointLight
  //
  export interface PointLight {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    sphereRadius: number;
    falloff: FalloffType;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.SpotLight
  //
  export interface SpotLight {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    sphereRadius: number;
    coneAngle: number;
    innerConeAngle: number;
    falloff: FalloffType;
    angularFalloff: AngularFalloffType;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.RectangleLight
  //
  export interface RectangleLight {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    width: number;
    height: number;
    falloff: FalloffType;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.DiscLight
  //
  export interface DiscLight {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    radius: number;
    falloff: FalloffType;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.SpotLightBoxShape
  //
  export interface SpotLightBoxShape {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    width: number;
    height: number;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.SpotLightPyramidShape
  //
  export interface SpotLightPyramidShape {
    instanceID: number;
    shadow: boolean;
    mode: LightMode;
    position: Vector3;
    orientation: Quaternion;
    color: LinearColor;
    indirectColor: LinearColor;
    range: number;
    angle: number;
    aspectRatio: number;
    falloff: FalloffType;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.Cookie
  //
  export interface Cookie {
    instanceID: number;
    scale: number;
    sizes: Vector2;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.LightDataGI
  //
  export interface LightDataGI {
    instanceID: number;
    cookieID: number;
    cookieScale: number;
    color: LinearColor;
    indirectColor: LinearColor;
    orientation: Quaternion;
    position: Vector3;
    range: number;
    coneAngle: number;
    innerConeAngle: number;
    shape0: number;
    shape1: number;
    type: LightType;
    mode: LightMode;
    shadow: any; // System.Byte
    falloff: FalloffType;
    Init: () => any;
    InitNoBake: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.LightmapperUtils
  //
  export interface LightmapperUtils {
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.Lightmapping
  //
  export interface Lightmapping {
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.Lightmapping+RequestLightsDelegate
  //
  export interface Lightmapping_RequestLightsDelegate {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.Experimental.GlobalIllumination.RenderSettings
  //
  export interface RenderSettings {
    // static useRadianceAmbientProbe: boolean;
  }
  //
  // Type: UnityEngine.Experimental.Playables.CameraPlayable
  //
  export interface CameraPlayable {
    GetHandle: () => PlayableHandle;
    GetCamera: () => Camera;
    SetCamera: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Playables.MaterialEffectPlayable
  //
  export interface MaterialEffectPlayable {
    GetHandle: () => PlayableHandle;
    GetMaterial: () => Material;
    SetMaterial: () => any;
    GetPass: () => number;
    SetPass: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Playables.TextureMixerPlayable
  //
  export interface TextureMixerPlayable {
    GetHandle: () => PlayableHandle;
  }
  //
  // Type: UnityEngine.Experimental.Playables.TexturePlayableBinding
  //
  export interface TexturePlayableBinding {
  }
  //
  // Type: UnityEngine.Experimental.Playables.TexturePlayableOutput
  //
  export interface TexturePlayableOutput {
    // static Null: TexturePlayableOutput;
    GetHandle: () => PlayableOutputHandle;
    GetTarget: () => RenderTexture;
    SetTarget: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.IScriptableRuntimeReflectionSystem
  //
  export interface IScriptableRuntimeReflectionSystem {
    TickRealtimeProbes: () => boolean;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.ScriptableRuntimeReflectionSystem
  //
  export interface ScriptableRuntimeReflectionSystem {
    TickRealtimeProbes: () => boolean;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.ScriptableRuntimeReflectionSystemSettings
  //
  export interface ScriptableRuntimeReflectionSystemSettings {
    // static system: IScriptableRuntimeReflectionSystem;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.ExternalGPUProfiler
  //
  export interface ExternalGPUProfiler {
  }
  //
  // Type: UnityEngine.Experimental.Rendering.WaitForPresentSyncPoint
  //
  export interface WaitForPresentSyncPoint {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.GraphicsJobsSyncPoint
  //
  export interface GraphicsJobsSyncPoint {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.GraphicsDeviceSettings
  //
  export interface GraphicsDeviceSettings {
    // static waitForPresentSyncPoint: WaitForPresentSyncPoint;
    // static graphicsJobsSyncPoint: GraphicsJobsSyncPoint;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.TextureCreationFlags
  //
  export interface TextureCreationFlags {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.FormatUsage
  //
  export interface FormatUsage {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.DefaultFormat
  //
  export interface DefaultFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.GraphicsFormat
  //
  export interface GraphicsFormat {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingMode
  //
  export interface RayTracingMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.GraphicsFormatUtility
  //
  export interface GraphicsFormatUtility {
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingAccelerationStructure
  //
  export interface RayTracingAccelerationStructure {
    Dispose: () => any;
    Release: () => any;
    Build: () => any;
    Update: () => any;
    AddInstance: () => any;
    UpdateInstanceTransform: () => any;
    GetSize: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingAccelerationStructure+RayTracingModeMask
  //
  export interface RayTracingAccelerationStructure_RayTracingModeMask {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingAccelerationStructure+ManagementMode
  //
  export interface RayTracingAccelerationStructure_ManagementMode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingAccelerationStructure+RASSettings
  //
  export interface RayTracingAccelerationStructure_RASSettings {
    managementMode: RayTracingAccelerationStructure_ManagementMode;
    rayTracingModeMask: RayTracingAccelerationStructure_RayTracingModeMask;
    layerMask: number;
  }
  //
  // Type: UnityEngine.Experimental.Rendering.ShaderWarmupSetup
  //
  export interface ShaderWarmupSetup {
    vdecl: VertexAttributeDescriptor[];
  }
  //
  // Type: UnityEngine.Experimental.Rendering.ShaderWarmup
  //
  export interface ShaderWarmup {
  }
  //
  // Type: UnityEngine.Experimental.Rendering.RayTracingShader
  //
  export interface RayTracingShader {
    maxRecursionDepth: number;
    name: string;
    hideFlags: HideFlags;
    SetFloat: () => any;
    SetInt: () => any;
    SetVector: () => any;
    SetMatrix: () => any;
    SetVectorArray: () => any;
    SetMatrixArray: () => any;
    SetTexture: () => any;
    SetBuffer: () => any;
    SetAccelerationStructure: () => any;
    SetShaderPass: () => any;
    SetTextureFromGlobal: () => any;
    Dispatch: () => any;
    SetFloats: () => any;
    SetInts: () => any;
    SetBool: () => any;
    SetConstantBuffer: () => any;
    GetInstanceID: () => number;
  }
  //
  // Type: UnityEngine.Assertions.Assert
  //
  export interface Assert {
  }
  //
  // Type: UnityEngine.Assertions.AssertionException
  //
  export interface AssertionException {
    Message: string;
    Data: any; // System.Collections.IDictionary
    InnerException: any; // System.Exception
    TargetSite: any; // System.Reflection.MethodBase
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: () => any;
    GetObjectData: () => any;
  }
  //
  // Type: UnityEngine.Assertions.Must.MustExtensions
  //
  export interface MustExtensions {
  }
  //
  // Type: UnityEngine.Assertions.Comparers.FloatComparer
  //
  export interface FloatComparer {
  }
  //
  // Type: UnityEngine.Apple.FrameCaptureDestination
  //
  export interface FrameCaptureDestination {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
  //
  // Type: UnityEngine.Apple.FrameCapture
  //
  export interface FrameCapture {
  }
  //
  // Type: UnityEngine.Apple.TV.Remote
  //
  export interface Remote {
    // static allowExitToHome: boolean;
    // static allowRemoteRotation: boolean;
    // static reportAbsoluteDpadValues: boolean;
    // static touchesEnabled: boolean;
  }
  //
  // Type: UnityEngine.Apple.ReplayKit.ReplayKit
  //
  export interface ReplayKit {
    // static APIAvailable: boolean;
    // static broadcastingAPIAvailable: boolean;
    // static recordingAvailable: boolean;
    // static isRecording: boolean;
    // static isBroadcasting: boolean;
    // static isBroadcastingPaused: boolean;
    // static isPreviewControllerActive: boolean;
    // static cameraEnabled: boolean;
    // static microphoneEnabled: boolean;
    // static broadcastURL: string;
    // static lastError: string;
  }
  //
  // Type: UnityEngine.Apple.ReplayKit.ReplayKit+BroadcastStatusCallback
  //
  export interface ReplayKit_BroadcastStatusCallback {
    Method: any; // System.Reflection.MethodInfo
    Target: any; // System.Object
    Invoke: () => any;
    BeginInvoke: () => any;
    EndInvoke: () => any;
    GetObjectData: () => any;
    GetInvocationList: () => any;
    DynamicInvoke: () => any;
    Clone: () => any;
  }
  //
  // Type: UnityEngine.TestTools.CoveredSequencePoint
  //
  export interface CoveredSequencePoint {
    method: any; // System.Reflection.MethodBase
    ilOffset: any; // System.UInt32
    hitCount: any; // System.UInt32
    filename: string;
    line: any; // System.UInt32
    column: any; // System.UInt32
  }
  //
  // Type: UnityEngine.TestTools.CoveredMethodStats
  //
  export interface CoveredMethodStats {
    method: any; // System.Reflection.MethodBase
    totalSequencePoints: number;
    uncoveredSequencePoints: number;
  }
  //
  // Type: UnityEngine.TestTools.Coverage
  //
  export interface Coverage {
    // static enabled: boolean;
  }
  //
  // Type: UnityEngine.Scripting.GarbageCollector
  //
  export interface GarbageCollector {
    // static GCMode: GarbageCollector_Mode;
    // static isIncremental: boolean;
    // static incrementalTimeSliceNanoseconds: any; // System.UInt64
  }
  //
  // Type: UnityEngine.Scripting.GarbageCollector+Mode
  //
  export interface GarbageCollector_Mode {
    CompareTo: () => number;
    HasFlag: () => boolean;
    GetTypeCode: () => any;
  }
}
