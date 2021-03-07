//
// Types in assemblies: ReactUnity, ReactUnity.Editor
// Generated 7.03.2021 18:49:47
//
import { UnityEngine } from './unity';

export namespace ReactUnity {
  export declare class IReactComponent {
    Parent: ReactUnity.IContainerComponent;
    IsPseudoElement: boolean;
    Layout: any; // Facebook.Yoga.YogaNode
    Style: ReactUnity.Styling.NodeStyle;
    Name: string;
    Tag: string;
    ClassName: string;
    ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
    Destroy: (() => void);
    ApplyLayoutStyles: (() => void);
    ScheduleLayout: ((callback?: any) => void);
    ResolveStyle: ((recursive?: boolean) => void);
    Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
    SetParent: ((parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
    SetProperty: ((property: string, value: any) => void);
    SetData: ((property: string, value: any) => void);
    SetEventListener: ((eventType: string, callback: ReactUnity.Interop.Callback) => void);
    GetComponent: ((type: any) => any);
    AddComponent: ((type: any) => any);
  }
  export declare class IContainerComponent {
    Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
    AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
    RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
  }
  export declare class ITextComponent {
    SetText: ((text: string) => void);
  }
  export declare class IHostComponent {
    Context: ReactUnity.ReactContext;
  }
  export declare class ReactContext {
    constructor(globals: ReactUnity.Types.StringObjectDictionary, script: ReactUnity.ReactScript, scheduler: ReactUnity.Schedulers.IUnityScheduler, isDevServer: boolean, onRestart: any, mergeLayouts?: boolean);
    Host: ReactUnity.IHostComponent;
    Globals: ReactUnity.Types.StringObjectDictionary;
    IsDevServer: boolean;
    Script: ReactUnity.ReactScript;
    Scheduler: ReactUnity.Schedulers.IUnityScheduler;
    Parser: any; // ExCSS.StylesheetParser
    StyleTree: ReactUnity.StyleEngine.StyleTree;
    OnRestart: any; // System.Action
    Disposables: any; // System.Collections.Generic.List`1[System.IDisposable]
    FontFamilies: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Types.FontReference]
    scheduleLayout: ((callback?: any) => void);
    InsertStyle: ((style: string, importanceOffset?: number) => void);
    RemoveStyle: ((style: string) => void);
    ResolvePath: ((path: string) => string);
    CreateStaticScript: ((path: string) => ReactUnity.ReactScript);
    CreateText: ((text: string) => ReactUnity.ITextComponent);
    CreateComponent: ((tag: string, text: string) => ReactUnity.IReactComponent);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ReactScript {
    constructor();
    DevServerFile: string;
    SourceLocation: string;
    ScriptSource: ReactUnity.ScriptSource;
    SourceAsset: UnityEngine.TextAsset;
    SourcePath: string;
    SourceText: string;
    ResourcesPath: string;
    UseDevServer: boolean;
    DevServer: string;
    GetResolvedSourcePath: (() => string);
    GetScript: ((callback: any, useDevServer?: boolean, disableWarnings?: boolean) => any);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export enum ScriptSource {
    TextAsset = 0,
    File = 1,
    Url = 2,
    Resource = 3,
    Text = 4,
  }
  export declare class ReactUnity {
    constructor();
    Root: UnityEngine.RectTransform;
    useGUILayout: boolean;
    runInEditMode: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: UnityEngine.Transform;
    gameObject: UnityEngine.GameObject;
    tag: string;
    rigidbody: UnityEngine.Component;
    rigidbody2D: UnityEngine.Component;
    camera: UnityEngine.Component;
    light: UnityEngine.Component;
    animation: UnityEngine.Component;
    constantForce: UnityEngine.Component;
    renderer: UnityEngine.Component;
    audio: UnityEngine.Component;
    networkView: UnityEngine.Component;
    collider: UnityEngine.Component;
    collider2D: UnityEngine.Component;
    hingeJoint: UnityEngine.Component;
    particleSystem: UnityEngine.Component;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    Globals: ReactUnity.Types.StringObjectDictionary;
    Script: ReactUnity.ReactScript;
    PreloadScripts: any; // System.Collections.Generic.List`1[UnityEngine.TextAsset]
    Restart: (() => void);
    Test: (() => void);
    TestDebug: (() => void);
    IsInvoking: (() => boolean) | ((methodName: string) => boolean);
    CancelInvoke: (() => void) | ((methodName: string) => void);
    Invoke: ((methodName: string, time: number) => void);
    InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
    StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
    StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
    StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
    StopAllCoroutines: (() => void);
    GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
    GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
    GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
    GetComponentInParent: ((t: any) => UnityEngine.Component);
    GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
    GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
    CompareTag: ((tag: string) => boolean);
    SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export declare class ReactUnityAPI {
    constructor(engine: any);
    static StateHandlers: any; // System.Collections.Generic.Dictionary`2[System.String,System.Type]
    createText: ((text: string, host: ReactUnity.IHostComponent) => ReactUnity.IReactComponent);
    createElement: ((tag: string, text: string, host: ReactUnity.IHostComponent) => ReactUnity.IReactComponent);
    appendChild: ((parent: any, child: any) => void);
    appendChildToContainer: ((parent: any, child: any) => void);
    insertBefore: ((parent: any, child: any, beforeChild: any) => void);
    removeChild: ((parent: any, child: any) => void);
    setText: ((instance: any, text: string) => void);
    setProperty: ((element: any, property: string, value: any) => void);
    setData: ((element: any, property: string, value: any) => void);
    setEventListener: ((element: ReactUnity.IReactComponent, eventType: string, value: any) => void) | ((element: any, eventType: string, value: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class ReactUnityRunner {
    constructor();
    RunScript: ((script: string, ctx: ReactUnity.ReactContext, preload?: any, callback?: any) => void);
    ExecuteScript: ((script: string) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class UGUIContext {
    constructor(hostElement: UnityEngine.RectTransform, globals: ReactUnity.Types.StringObjectDictionary, script: ReactUnity.ReactScript, scheduler: ReactUnity.Schedulers.IUnityScheduler, isDevServer: boolean, onRestart: any);
    static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.UGUIContext,ReactUnity.Components.ReactComponent]]
    RootLayoutNode: any; // Facebook.Yoga.YogaNode
    Host: ReactUnity.IHostComponent;
    Globals: ReactUnity.Types.StringObjectDictionary;
    IsDevServer: boolean;
    Script: ReactUnity.ReactScript;
    Scheduler: ReactUnity.Schedulers.IUnityScheduler;
    static defaultCreator: any; // System.Func`4[System.String,System.String,ReactUnity.UGUIContext,ReactUnity.Components.ReactComponent]
    static textCreator: any; // System.Func`3[System.String,ReactUnity.UGUIContext,ReactUnity.ITextComponent]
    Parser: any; // ExCSS.StylesheetParser
    StyleTree: ReactUnity.StyleEngine.StyleTree;
    OnRestart: any; // System.Action
    Disposables: any; // System.Collections.Generic.List`1[System.IDisposable]
    FontFamilies: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Types.FontReference]
    CreateComponent: ((tag: string, text: string) => ReactUnity.IReactComponent);
    CreateText: ((text: string) => ReactUnity.ITextComponent);
    scheduleLayout: ((callback?: any) => void);
    InsertStyle: ((style: string, importanceOffset?: number) => void);
    RemoveStyle: ((style: string) => void);
    ResolvePath: ((path: string) => string);
    CreateStaticScript: ((path: string) => ReactUnity.ReactScript);
    Dispose: (() => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export declare class CalculateSizeFromContents {
    constructor();
    Layout: any; // Facebook.Yoga.YogaNode
    useGUILayout: boolean;
    runInEditMode: boolean;
    enabled: boolean;
    isActiveAndEnabled: boolean;
    transform: UnityEngine.Transform;
    gameObject: UnityEngine.GameObject;
    tag: string;
    rigidbody: UnityEngine.Component;
    rigidbody2D: UnityEngine.Component;
    camera: UnityEngine.Component;
    light: UnityEngine.Component;
    animation: UnityEngine.Component;
    constantForce: UnityEngine.Component;
    renderer: UnityEngine.Component;
    audio: UnityEngine.Component;
    networkView: UnityEngine.Component;
    collider: UnityEngine.Component;
    collider2D: UnityEngine.Component;
    hingeJoint: UnityEngine.Component;
    particleSystem: UnityEngine.Component;
    name: string;
    hideFlags: UnityEngine.HideFlags;
    IsInvoking: (() => boolean) | ((methodName: string) => boolean);
    CancelInvoke: (() => void) | ((methodName: string) => void);
    Invoke: ((methodName: string, time: number) => void);
    InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
    StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
    StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
    StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
    StopAllCoroutines: (() => void);
    GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
    GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
    GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
    GetComponentInParent: ((t: any) => UnityEngine.Component);
    GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
    GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
    CompareTag: ((tag: string) => boolean);
    SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
    GetInstanceID: (() => number);
    GetHashCode: (() => number);
    Equals: ((other: any) => boolean);
    ToString: (() => string);
    GetType: (() => any);
  }
  export namespace Components {
    export declare class AnchorComponent {
      constructor(context: ReactUnity.UGUIContext);
      static AnchorDefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      url: string;
      openInThisTab: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ButtonComponent {
      constructor(context: ReactUnity.UGUIContext);
      static ButtonDefaultStyle: ReactUnity.Styling.NodeStyle;
      static ButtonDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Button: UnityEngine.UI.Button;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ContainerComponent {
      constructor(context: ReactUnity.UGUIContext, tag: string);
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class HostComponent {
      constructor(host: UnityEngine.RectTransform, context: ReactUnity.UGUIContext);
      Width: number;
      Height: number;
      static HostDefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      ApplyStyles: (() => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ImageComponent {
      constructor(context: ReactUnity.UGUIContext, tag?: string);
      static ImageDefaultStyle: ReactUnity.Styling.NodeStyle;
      static ImageDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.Image;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class InputComponent {
      constructor(text: string, context: ReactUnity.UGUIContext);
      static InputDefaultLayout: any; // Facebook.Yoga.YogaNode
      static InputDefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Value: string;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      SetText: ((text: string) => void);
      ApplyLayoutStyles: (() => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyStyles: (() => void);
      Focus: (() => void);
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RawImageComponent {
      constructor(context: ReactUnity.UGUIContext, tag?: string);
      static ImageDefaultStyle: ReactUnity.Styling.NodeStyle;
      static ImageDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ReactComponent {
      constructor(context: ReactUnity.UGUIContext, tag: string);
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      static TagDefaultStyle: ReactUnity.Styling.NodeStyle;
      static TagDefaultLayout: any; // Facebook.Yoga.YogaNode
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RenderTextureComponent {
      constructor(context: ReactUnity.UGUIContext, tag?: string);
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      RenderTexture: UnityEngine.RenderTexture;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ScrollComponent {
      constructor(Context: ReactUnity.UGUIContext);
      static ScrollDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      ScrollRect: UnityEngine.UI.ScrollRect;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class TextComponent {
      constructor(text: string, context: ReactUnity.UGUIContext, tag: string);
      constructor(linkedTo: ReactUnity.Components.TextComponent);
      static TextDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Text: any; // TMPro.TextMeshProUGUI
      Width: number;
      Height: number;
      Measurer: ReactUnity.Layout.TextMeasurer;
      LinkedTextWatcher: ReactUnity.Styling.LinkedTextWatcher;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      SetText: ((text: string) => void);
      ApplyLayoutStyles: (() => void);
      ApplyStyles: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ToggleComponent {
      constructor(context: ReactUnity.UGUIContext);
      static ToggleDefaultStyle: ReactUnity.Styling.NodeStyle;
      static ToggleDefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Value: boolean;
      Toggle: UnityEngine.UI.Toggle;
      Check: ReactUnity.Components.ImageComponent;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      Focus: (() => void);
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class VideoComponent {
      constructor(context: ReactUnity.UGUIContext);
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Context: ReactUnity.UGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.IContainerComponent;
      Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
      Component: ReactUnity.Layout.ReactElement;
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      Inline: any; // System.Dynamic.ExpandoObject
      BorderAndBackground: ReactUnity.Styling.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      IsPseudoElement: boolean;
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      Name: string;
      VideoPlayer: UnityEngine.Video.VideoPlayer;
      RenderTexture: UnityEngine.RenderTexture;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.IContainerComponent, insertBefore?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.IReactComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => any);
      AddComponent: ((type: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class VideoComponentSource {
      constructor();
      Url: string;
      Clip: UnityEngine.Video.VideoClip;
      Type: UnityEngine.Video.VideoSource;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace DomProxies {
    export declare class ConsoleProxy {
      constructor(engine: any);
      log: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      info: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      debug: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      warn: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      error: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      dir: ((msg: any) => void) | ((msg: any, ...subs: any[]) => void);
      clear: (() => void);
      assert: ((val: boolean) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class DocumentProxy {
      constructor(context: ReactUnity.ReactContext, execute: any, origin: string);
      head: ReactUnity.DomProxies.HeadProxy;
      origin: string;
      execute: any; // System.Action`1[System.String]
      context: ReactUnity.ReactContext;
      createElement: ((type: string) => ReactUnity.DomProxies.IDomElementProxy);
      createTextNode: ((text: string) => string);
      querySelector: ((query: string) => any);
      getElementById: ((query: string) => any);
      getElementsByTagName: ((tagName: string) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IDomElementProxy {
      OnAppend: (() => void);
      OnRemove: (() => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      appendChild: ((text: string) => void);
      removeChild: ((text: string) => void);
    }
    export declare class DomElementProxyBase {
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class HeadProxy {
      constructor();
      appendChild: ((child: ReactUnity.DomProxies.IDomElementProxy) => void);
      removeChild: ((child: ReactUnity.DomProxies.IDomElementProxy) => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class ScriptProxy {
      constructor(document: ReactUnity.DomProxies.DocumentProxy);
      src: string;
      charset: string;
      crossOrigin: string;
      timeout: number;
      onload: any; // System.Action`1[ReactUnity.DomProxies.ScriptProxy]
      onerror: any; // System.Action`1[ReactUnity.DomProxies.ScriptProxy]
      document: ReactUnity.DomProxies.DocumentProxy;
      parentNode: ReactUnity.DomProxies.HeadProxy;
      OnAppend: (() => void);
      OnRemove: (() => void);
      appendChild: ((text: string) => void);
      removeChild: ((text: string) => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StyleProxy {
      constructor(document: ReactUnity.DomProxies.DocumentProxy);
      firstChild: string;
      childNodes: any; // System.Collections.Generic.List`1[System.String]
      enabled: boolean;
      document: ReactUnity.DomProxies.DocumentProxy;
      parentNode: ReactUnity.DomProxies.HeadProxy;
      OnAppend: (() => void);
      OnRemove: (() => void);
      appendChild: ((text: string) => void);
      removeChild: ((text: string) => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class LocalStorage {
      constructor();
      static LocalStoragePrefix: string;
      setItem: ((x: string, value: string) => void);
      getItem: ((x: string) => string);
      removeItem: ((x: string) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class Location {
      constructor(sourceLocation: string, restart: any);
      href: string;
      protocol: string;
      hostname: string;
      origin: string;
      host: string;
      port: string;
      search: string;
      pathname: string;
      reload: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class WebSocketProxy {
      constructor(context: ReactUnity.ReactContext, url: string);
      constructor(context: ReactUnity.ReactContext, url: string, ...protocols: string[]);
      Onmessage: any; // Jint.Native.JsValue
      onmessage: any; // System.Object
      Onclose: any; // Jint.Native.JsValue
      onclose: any; // System.Object
      Onopen: any; // Jint.Native.JsValue
      onopen: any; // System.Object
      Onerror: any; // Jint.Native.JsValue
      onerror: any; // System.Object
      Compression: any; // WebSocketSharp.CompressionMethod
      Cookies: any; // System.Collections.Generic.IEnumerable`1[WebSocketSharp.Net.Cookie]
      Credentials: any; // WebSocketSharp.Net.NetworkCredential
      EmitOnPing: boolean;
      EnableRedirection: boolean;
      Extensions: string;
      IsAlive: boolean;
      IsSecure: boolean;
      Log: any; // WebSocketSharp.Logger
      Origin: string;
      Protocol: string;
      ReadyState: any; // WebSocketSharp.WebSocketState
      SslConfiguration: any; // WebSocketSharp.Net.ClientSslConfiguration
      Url: any; // System.Uri
      WaitTime: any; // System.TimeSpan
      static CONNECTING: number;
      static OPEN: number;
      static CLOSING: number;
      static CLOSED: number;
      binaryType: string;
      close: ((code?: number, reason?: string) => void);
      Accept: (() => void);
      AcceptAsync: (() => void);
      Close: (() => void) | ((code: any) => void) | ((code: any) => void) | ((code: any, reason: string) => void) | ((code: any, reason: string) => void);
      CloseAsync: (() => void) | ((code: any) => void) | ((code: any) => void) | ((code: any, reason: string) => void) | ((code: any, reason: string) => void);
      Connect: (() => void);
      ConnectAsync: (() => void);
      Ping: (() => boolean) | ((message: string) => boolean);
      Send: ((data: any[]) => void) | ((file: any) => void) | ((data: string) => void);
      SendAsync: ((data: any[], completed: any) => void) | ((file: any, completed: any) => void) | ((data: string, completed: any) => void) | ((stream: any, length: number, completed: any) => void);
      SetCookie: ((cookie: any) => void);
      SetCredentials: ((username: string, password: string, preAuth: boolean) => void);
      SetProxy: ((url: string, username: string, password: string) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class XMLHttpRequest {
      constructor();
      constructor(origin: string);
      origin: string;
      Onload: any; // Jint.Native.JsValue
      Onreadystatechange: any; // Jint.Native.JsValue
      onerror: any; // System.Object
      ontimeout: any; // System.Object
      onabort: any; // System.Object
      withCredentials: boolean;
      timeout?: number;
      status: number;
      statusText: string;
      responseHeaders: string;
      readyState: number;
      DONE: string;
      responseText: string;
      onload: any; // System.Object
      onreadystatechange: any; // System.Object
      static dispatches: string[];
      static allDone: any; // System.Threading.ManualResetEvent
      open: ((method: string, url: string, async: boolean) => void);
      setRequestHeader: ((name: any, value: any) => void);
      append: ((name: any, value: any) => void);
      abort: (() => void);
      send: ((o: any) => void);
      getAllResponseHeaders: (() => string);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Editor {
    export declare class ReactElementDrawer {
      constructor();
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: any; // UnityEditor.SerializedObject
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
    export declare class ReactScriptDrawer {
      constructor();
      attribute: any; // UnityEngine.PropertyAttribute
      fieldInfo: any; // System.Reflection.FieldInfo
      OnGUI: ((position: UnityEngine.Rect, property: any, label: UnityEngine.GUIContent) => void);
      GetPropertyHeight: ((property: any, label: UnityEngine.GUIContent) => number);
      CreatePropertyGUI: ((property: any) => UnityEngine.UIElements.VisualElement);
      CanCacheInspectorGUI: ((property: any) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StringObjectPairDrawer {
      constructor();
      attribute: any; // UnityEngine.PropertyAttribute
      fieldInfo: any; // System.Reflection.FieldInfo
      OnGUI: ((position: UnityEngine.Rect, property: any, label: UnityEngine.GUIContent) => void);
      GetPropertyHeight: ((property: any, label: UnityEngine.GUIContent) => number);
      CreatePropertyGUI: ((property: any) => UnityEngine.UIElements.VisualElement);
      CanCacheInspectorGUI: ((property: any) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditStyleWindow {
      constructor();
      PreviousComponent: ReactUnity.Layout.ReactElement;
      CurrentStyle: ReactUnity.Styling.NodeStyle;
      CurrentLayout: any; // Facebook.Yoga.YogaNode
      CurrentStyleDefaults: ReactUnity.Styling.NodeStyle;
      CurrentLayoutDefaults: any; // Facebook.Yoga.YogaNode
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
      AutoApply: boolean;
      static Open: (() => void);
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
    export declare class QuickStartWindow {
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
      static Open: (() => void);
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
    export declare class EmscriptenBuildFlags {
      constructor();
      callbackOrder: number;
      OnPreprocessBuild: ((report: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export namespace Developer {
      export declare class TypescriptModelsGenerator {
        static GenerateUnity: (() => void);
        static GenerateEditor: (() => void);
        static GenerateReactUnity: (() => void);
        static GenerateSystem: (() => void);
        static GetNameWithoutGenericArity: ((name: string) => string);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace Renderer {
      export declare class EditorContext {
        constructor(hostElement: UnityEngine.UIElements.VisualElement, globals: ReactUnity.Types.StringObjectDictionary, script: ReactUnity.ReactScript, scheduler: ReactUnity.Schedulers.IUnityScheduler, isDevServer: boolean, onRestart?: any);
        Host: ReactUnity.IHostComponent;
        Globals: ReactUnity.Types.StringObjectDictionary;
        IsDevServer: boolean;
        Script: ReactUnity.ReactScript;
        Scheduler: ReactUnity.Schedulers.IUnityScheduler;
        static defaultCreator: any; // System.Func`4[System.String,System.String,ReactUnity.Editor.Renderer.EditorContext,ReactUnity.Editor.Renderer.Components.IEditorReactComponent`1[UnityEngine.UIElements.VisualElement]]
        static textCreator: any; // System.Func`3[System.String,ReactUnity.Editor.Renderer.EditorContext,ReactUnity.ITextComponent]
        static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.Editor.Renderer.EditorContext,ReactUnity.Editor.Renderer.Components.IEditorReactComponent`1[UnityEngine.UIElements.VisualElement]]]
        Parser: any; // ExCSS.StylesheetParser
        StyleTree: ReactUnity.StyleEngine.StyleTree;
        OnRestart: any; // System.Action
        Disposables: any; // System.Collections.Generic.List`1[System.IDisposable]
        FontFamilies: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Types.FontReference]
        CreateText: ((text: string) => ReactUnity.ITextComponent);
        CreateComponent: ((tag: string, text: string) => ReactUnity.IReactComponent);
        scheduleLayout: ((callback?: any) => void);
        InsertStyle: ((style: string, importanceOffset?: number) => void);
        RemoveStyle: ((style: string) => void);
        ResolvePath: ((path: string) => string);
        CreateStaticScript: ((path: string) => ReactUnity.ReactScript);
        Dispose: (() => void);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ReactEditorTester {
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
        static ShowDefaultWindow: (() => void);
        OnEnable: (() => void);
        Restart: (() => void);
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
      export namespace Components {
        export declare class EditorButtonComponent {
          constructor(context: ReactUnity.Editor.Renderer.EditorContext);
          Context: ReactUnity.Editor.Renderer.EditorContext;
          Parent: ReactUnity.IContainerComponent;
          Element: UnityEngine.UIElements.Button;
          Layout: any; // Facebook.Yoga.YogaNode
          LayoutValues: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
          Style: ReactUnity.Styling.NodeStyle;
          Inline: any; // System.Dynamic.ExpandoObject
          IsPseudoElement: boolean;
          Name: string;
          Tag: string;
          ClassName: string;
          ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
          StateStyles: ReactUnity.Styling.StateStyles;
          Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
          Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
          BeforePseudo: ReactUnity.IReactComponent;
          AfterPseudo: ReactUnity.IReactComponent;
          BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
          Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
          ApplyLayoutStyles: (() => void);
          ApplyStyles: (() => void);
          Destroy: (() => void);
          ResolveStyle: ((recursive?: boolean) => void);
          ScheduleLayout: ((callback?: any) => void);
          SetParent: ((parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
          SetData: ((property: string, value: any) => void);
          SetProperty: ((property: string, value: any) => void);
          GetComponent: ((type: any) => any);
          AddComponent: ((type: any) => any);
          RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
          CaptureMouse: (() => void);
          ReleaseMouse: (() => void);
          HasMouseCapture: (() => boolean);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class EditorHostComponent {
          constructor(element: UnityEngine.UIElements.VisualElement, ctx: ReactUnity.Editor.Renderer.EditorContext);
          Context: ReactUnity.Editor.Renderer.EditorContext;
          Parent: ReactUnity.IContainerComponent;
          Element: UnityEngine.UIElements.VisualElement;
          Layout: any; // Facebook.Yoga.YogaNode
          LayoutValues: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
          Style: ReactUnity.Styling.NodeStyle;
          Inline: any; // System.Dynamic.ExpandoObject
          IsPseudoElement: boolean;
          Name: string;
          Tag: string;
          ClassName: string;
          ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
          StateStyles: ReactUnity.Styling.StateStyles;
          Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
          Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
          BeforePseudo: ReactUnity.IReactComponent;
          AfterPseudo: ReactUnity.IReactComponent;
          BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
          ApplyLayoutStyles: (() => void);
          ApplyStyles: (() => void);
          Destroy: (() => void);
          ResolveStyle: ((recursive?: boolean) => void);
          ScheduleLayout: ((callback?: any) => void);
          SetParent: ((parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
          SetData: ((property: string, value: any) => void);
          SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
          SetProperty: ((property: string, value: any) => void);
          GetComponent: ((type: any) => any);
          AddComponent: ((type: any) => any);
          RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
          CaptureMouse: (() => void);
          ReleaseMouse: (() => void);
          HasMouseCapture: (() => boolean);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class IEditorReactComponent<T = any> {
          Element: T;
        }
        export declare class EditorReactComponent<T = any> {
          constructor(element: T, context: ReactUnity.Editor.Renderer.EditorContext, tag: string);
          constructor(context: ReactUnity.Editor.Renderer.EditorContext, tag: string);
          Context: ReactUnity.Editor.Renderer.EditorContext;
          Parent: ReactUnity.IContainerComponent;
          Element: T;
          Layout: any; // Facebook.Yoga.YogaNode
          LayoutValues: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
          Style: ReactUnity.Styling.NodeStyle;
          Inline: any; // System.Dynamic.ExpandoObject
          IsPseudoElement: boolean;
          Name: string;
          Tag: string;
          ClassName: string;
          ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
          StateStyles: ReactUnity.Styling.StateStyles;
          Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
          Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
          BeforePseudo: ReactUnity.IReactComponent;
          AfterPseudo: ReactUnity.IReactComponent;
          BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
          ApplyLayoutStyles: (() => void);
          ApplyStyles: (() => void);
          Destroy: (() => void);
          ResolveStyle: ((recursive?: boolean) => void);
          ScheduleLayout: ((callback?: any) => void);
          SetParent: ((parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
          SetData: ((property: string, value: any) => void);
          SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
          SetProperty: ((property: string, value: any) => void);
          GetComponent: ((type: any) => any);
          AddComponent: ((type: any) => any);
          RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
          CaptureMouse: (() => void);
          ReleaseMouse: (() => void);
          HasMouseCapture: (() => boolean);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
        export declare class EditorTextComponent {
          constructor(text: string, context: ReactUnity.Editor.Renderer.EditorContext, tag: string);
          Context: ReactUnity.Editor.Renderer.EditorContext;
          Parent: ReactUnity.IContainerComponent;
          Element: UnityEngine.UIElements.Label;
          Layout: any; // Facebook.Yoga.YogaNode
          LayoutValues: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
          Style: ReactUnity.Styling.NodeStyle;
          Inline: any; // System.Dynamic.ExpandoObject
          IsPseudoElement: boolean;
          Name: string;
          Tag: string;
          ClassName: string;
          ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
          StateStyles: ReactUnity.Styling.StateStyles;
          Data: any; // System.Collections.Generic.Dictionary`2[System.String,System.Object]
          Children: any; // System.Collections.Generic.List`1[ReactUnity.IReactComponent]
          BeforePseudo: ReactUnity.IReactComponent;
          AfterPseudo: ReactUnity.IReactComponent;
          BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
          SetText: ((text: string) => void);
          Accept: ((visitor: ReactUnity.Visitors.ReactComponentVisitor) => void);
          ApplyLayoutStyles: (() => void);
          ApplyStyles: (() => void);
          Destroy: (() => void);
          ResolveStyle: ((recursive?: boolean) => void);
          ScheduleLayout: ((callback?: any) => void);
          SetParent: ((parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean) => void);
          SetData: ((property: string, value: any) => void);
          SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
          SetProperty: ((property: string, value: any) => void);
          GetComponent: ((type: any) => any);
          AddComponent: ((type: any) => any);
          RegisterChild: ((child: ReactUnity.IReactComponent, index?: number) => void);
          CaptureMouse: (() => void);
          ReleaseMouse: (() => void);
          HasMouseCapture: (() => boolean);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
      }
      export namespace Events {
        export declare class EditorEventHandlerMap {
          static GetEventType: ((eventName: string) => any);
          static GetEventMethods: ((eventName: string) => any);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
      }
      export namespace Styling {
        export declare class StylingHelpers {
          static TextAlignMap: any; // System.Collections.Generic.Dictionary`2[TMPro.TextAlignmentOptions,UnityEngine.TextAnchor]
          static YogaValueToStyleLength: ((value: any) => UnityEngine.UIElements.StyleLength);
          static NormalizeFloat: ((value: number) => number);
          static ConvertFontStyle: ((style: any, weight: any) => UnityEngine.FontStyle);
          static GetStyleColor: ((style: ReactUnity.Styling.NodeStyle, prop: any) => UnityEngine.UIElements.StyleColor);
          static GetStyleFloat: ((style: ReactUnity.Styling.NodeStyle, prop: any) => UnityEngine.UIElements.StyleFloat);
          static GetStyleFloatDouble: ((style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any) => UnityEngine.UIElements.StyleFloat);
          static GetStyleLength: ((style: ReactUnity.Styling.NodeStyle, prop: any) => UnityEngine.UIElements.StyleLength);
          static GetStyleLengthDouble: ((style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any) => UnityEngine.UIElements.StyleLength);
          static GetStyleBorderRadius: ((style: ReactUnity.Styling.NodeStyle, prop: any) => UnityEngine.UIElements.StyleLength);
          static GetStyleBorderColor: ((style: ReactUnity.Styling.NodeStyle, prop: any) => UnityEngine.UIElements.StyleColor);
          Equals: ((obj: any) => boolean);
          GetHashCode: (() => number);
          GetType: (() => any);
          ToString: (() => string);
        }
      }
    }
  }
  export namespace EventHandlers {
    export declare class AnchorClickHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerDown: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class BeginDragHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnBeginDrag: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class CancelHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnCancel: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class DeselectHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnDeselect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class DragHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnDrag: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class DropHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnDrop: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class EndDragHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnEndDrag: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class EventHandlerMap {
      static GetEventType: ((eventName: string) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IEventHandler {
      ClearListeners: (() => void);
    }
    export declare class KeyDownHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      OnDeselect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class KeyEventData {
      constructor(eventSystem: UnityEngine.EventSystems.EventSystem, ctx: any);
      constructor(eventSystem: UnityEngine.EventSystems.EventSystem, inputSystem?: boolean);
      currentInputModule: UnityEngine.EventSystems.BaseInputModule;
      selectedObject: UnityEngine.GameObject;
      used: boolean;
      key: string;
      input: any; // System.Type
      inputSystem: boolean;
      ctx: any; // UnityEngine.InputSystem.InputAction+CallbackContext
      Reset: (() => void);
      Use: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class MoveHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnMove: ((eventData: UnityEngine.EventSystems.AxisEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PointerClickHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerClick: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PointerDownHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerDown: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PointerEnterHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerEnter: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PointerExitHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerExit: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PointerUpHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerUp: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class PotentialDragHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnInitializePotentialDrag: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ScrollHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnScroll: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SelectHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSelect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class SubmitHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnSubmit: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class UpdateSelectedHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnUpdateSelected: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Helpers {
    export declare class CursorAPI {
      static SetCursor: ((cursor: string) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EventTypes {
      static GetEventType: ((eventName: string) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Interop {
    export declare class AdaptiveDispatcher {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      static Initialize: (() => void);
      static AddCallOnLateUpdate: ((call: any) => void);
      static OnUpdate: ((callback: any) => number);
      static Timeout: ((callback: any, timeSeconds: number) => number);
      static AnimationFrame: ((callback: any) => number);
      static Interval: ((callback: any, intervalSeconds: number) => number);
      static Immediate: ((callback: any) => number);
      static StartDeferred: ((cr: any) => number) | ((cr: any, handle: number) => number);
      static StopDeferred: ((cr: number) => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class Callback {
      constructor(callback: any);
      constructor(callback: any);
      callback: any; // System.Object
      Call: (() => any) | ((...args: any[]) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorDispatcher {
      static Initialize: (() => void);
      static AddCallOnLateUpdate: ((call: any) => void);
      static OnUpdate: ((callback: any) => number);
      static Timeout: ((callback: any, timeSeconds: number) => number);
      static AnimationFrame: ((callback: any) => number);
      static Interval: ((callback: any, intervalSeconds: number) => number);
      static Immediate: ((callback: any) => number);
      static StartDeferred: ((cr: any) => number) | ((cr: any, handle: number) => number);
      static StopDeferred: ((cr: number) => void);
      static StopAll: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class MainThreadDispatcher {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      static Initialize: (() => void);
      static AddCallOnLateUpdate: ((call: any) => void);
      static OnUpdate: ((callback: any) => number);
      static Timeout: ((callback: any, timeSeconds: number) => number);
      static AnimationFrame: ((callback: any) => number);
      static Interval: ((callback: any, intervalSeconds: number) => number);
      static Immediate: ((callback: any) => number);
      static IsMainThread: (() => boolean);
      static StartDeferred: ((cr: any) => number) | ((cr: any, handle: number) => number);
      static StopDeferred: ((cr: number) => void);
      Awake: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class AdaptiveDispatcher_CoroutineHandle {
      constructor(handle: number);
      Handle: number;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class EditorDispatcher_CoroutineHandle {
      constructor(handle: number);
      Handle: number;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class MainThreadDispatcher_CoroutineHandle {
      constructor(handle: number);
      Handle: number;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Layout {
    export declare class ImageMeasurer {
      constructor();
      FitMode: ReactUnity.Types.ImageFitMode;
      Sprite: UnityEngine.Sprite;
      Texture: UnityEngine.Texture;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      Layout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      MarkDirty: (() => void);
      Measure: ((node: any, width: number, widthMode: any, height: number, heightMode: any) => any);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ReactElement {
      constructor();
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      Component: ReactUnity.Components.ReactComponent;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      LateUpdate: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ResponsiveElement {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      Layout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class TextMeasurer {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      Layout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UGUIContext;
      Measure: ((node: any, width: number, widthMode: any, height: number, heightMode: any) => any);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Schedulers {
    export declare class EditorScheduler {
      constructor();
      setTimeout: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      setInterval: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      clearTimeout: ((handle: number) => void);
      clearInterval: ((handle: number) => void);
      setImmediate: ((callback: ReactUnity.Interop.Callback) => number);
      requestAnimationFrame: ((callback: ReactUnity.Interop.Callback) => number);
      cancelAnimationFrame: ((handle: number) => void);
      clearImmediate: ((handle: number) => void);
      clearAllTimeouts: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IUnityScheduler {
      setImmediate: ((callback: ReactUnity.Interop.Callback) => number);
      setTimeout: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      setInterval: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      requestAnimationFrame: ((callback: ReactUnity.Interop.Callback) => number);
      clearTimeout: ((handle: number) => void);
      clearInterval: ((handle: number) => void);
      clearImmediate: ((handle: number) => void);
      cancelAnimationFrame: ((handle: number) => void);
      clearAllTimeouts: (() => void);
    }
    export declare class NoScheduler {
      constructor();
      setTimeout: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      setInterval: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      setImmediate: ((callback: ReactUnity.Interop.Callback) => number);
      requestAnimationFrame: ((callback: ReactUnity.Interop.Callback) => number);
      clearTimeout: ((handle: number) => void);
      clearInterval: ((handle: number) => void);
      clearImmediate: ((handle: number) => void);
      cancelAnimationFrame: ((handle: number) => void);
      clearAllTimeouts: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class UnityScheduler {
      constructor();
      setTimeout: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      setInterval: ((callback: ReactUnity.Interop.Callback, timeout: number) => number);
      clearTimeout: ((handle: number) => void);
      clearInterval: ((handle: number) => void);
      setImmediate: ((callback: ReactUnity.Interop.Callback) => number);
      requestAnimationFrame: ((callback: ReactUnity.Interop.Callback) => number);
      cancelAnimationFrame: ((handle: number) => void);
      clearImmediate: ((handle: number) => void);
      clearAllTimeouts: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace StateHandlers {
    export declare class ActiveStateHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ClearListeners: (() => void);
      OnPointerDown: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      OnPointerUp: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class CursorHandler {
      constructor();
      Cursor: string;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerEnter: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      OnPointerExit: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FocusStateHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ClearListeners: (() => void);
      OnSelect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      OnDeselect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FocusVisibleStateHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ClearListeners: (() => void);
      OnSelect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      OnDeselect: ((eventData: UnityEngine.EventSystems.BaseEventData) => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class FocusWithinStateHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class HoverStateHandler {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      OnPointerEnter: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      OnPointerExit: ((eventData: UnityEngine.EventSystems.PointerEventData) => void);
      ClearListeners: (() => void);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class IStateHandler {
      ClearListeners: (() => void);
    }
  }
  export namespace StyleEngine {
    export declare class RuleHelpers {
      static ImportantSpecifity: number;
      static SplitSelectorRegex: any; // System.Text.RegularExpressions.Regex
      static NthChildRegex: any; // System.Text.RegularExpressions.Regex
      static ParseSelector: ((selector: string, negated?: boolean) => any);
      static GetSpecificity: ((priority: any) => number);
      static GetRuleDic: ((rule: any, important: boolean) => any) | ((rule: any) => any);
      static GetLayoutDic: ((rule: any, important: boolean) => any) | ((rule: any) => any);
      static NormalizeSelector: ((selector: string) => string);
      static GetSpecialName: ((value: string) => ReactUnity.Styling.Types.SpecialNames);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StyleData {
      constructor();
      Rules: any; // System.Collections.Generic.List`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
      Layouts: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StyleTree {
      constructor(parser: any);
      Parser: any; // ExCSS.StylesheetParser
      Specifity: number;
      LeafNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforeNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      Tree: any; // ReactUnity.StyleEngine.RuleTree`1[ReactUnity.StyleEngine.StyleData]
      Parent: any; // ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]
      Selector: string;
      ParsedSelector: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleSelectorPart]
      Children: any; // System.Collections.Generic.LinkedList`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: ReactUnity.StyleEngine.StyleData;
      AddStyle: ((rule: any, importanceOffset?: number, mergeLayouts?: boolean) => any);
      GetMatchingRules: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingBefore: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingAfter: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingChild: ((component: ReactUnity.IReactComponent, pseudoElement?: boolean) => ReactUnity.IReactComponent);
      GetMatchingChildren: ((component: ReactUnity.IReactComponent, pseudoElement?: boolean) => any);
      AddSelector: ((selectorText: string, importanceOffset?: number) => any);
      AddChildCascading: ((selector: string) => any);
      Matches: ((component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent) => boolean);
      CompareTo: ((other: any) => number);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RuleTree<T = any> {
      constructor(parser: any);
      Parser: any; // ExCSS.StylesheetParser
      Specifity: number;
      LeafNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[T]]
      BeforeNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[T]]
      AfterNodes: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[T]]
      Tree: any; // ReactUnity.StyleEngine.RuleTree`1[T]
      Parent: any; // ReactUnity.StyleEngine.RuleTreeNode`1[T]
      Selector: string;
      ParsedSelector: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleSelectorPart]
      Children: any; // System.Collections.Generic.LinkedList`1[ReactUnity.StyleEngine.RuleTreeNode`1[T]]
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: T;
      GetMatchingRules: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingBefore: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingAfter: ((component: ReactUnity.IReactComponent) => any);
      GetMatchingChild: ((component: ReactUnity.IReactComponent, pseudoElement?: boolean) => ReactUnity.IReactComponent);
      GetMatchingChildren: ((component: ReactUnity.IReactComponent, pseudoElement?: boolean) => any);
      AddSelector: ((selectorText: string, importanceOffset?: number) => any);
      AddChildCascading: ((selector: string) => any);
      Matches: ((component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent) => boolean);
      CompareTo: ((other: any) => number);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class RuleTreeNode<T = any> {
      constructor();
      Specifity: number;
      Tree: any; // ReactUnity.StyleEngine.RuleTree`1[T]
      Parent: any; // ReactUnity.StyleEngine.RuleTreeNode`1[T]
      Selector: string;
      ParsedSelector: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleSelectorPart]
      Children: any; // System.Collections.Generic.LinkedList`1[ReactUnity.StyleEngine.RuleTreeNode`1[T]]
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: T;
      AddChildCascading: ((selector: string) => any);
      Matches: ((component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent) => boolean);
      CompareTo: ((other: any) => number);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum RuleRelationType {
      Self = 0,
      Parent = 1,
      DirectParent = 2,
      Sibling = 3,
      DirectSibling = 4,
    }
    export enum RuleSelectorPartType {
      None = 0,
      All = 1,
      Tag = 2,
      Id = 3,
      ClassName = 4,
      Attribute = 5,
      DirectDescendant = 10,
      AdjacentSibling = 11,
      Sibling = 12,
      Self = 13,
      Not = 20,
      FirstChild = 21,
      LastChild = 22,
      NthChild = 23,
      NthLastChild = 24,
      OnlyChild = 25,
      Empty = 26,
      Root = 27,
      Scope = 28,
      Hover = 100,
      Focus = 101,
      FocusVisible = 102,
      FocusWithin = 103,
      Active = 104,
      Before = 500,
      After = 501,
      Important = 1000,
      Special = 1001,
      State = 2000,
    }
    export declare class RuleSelectorPart {
      constructor();
      Negated: boolean;
      Type: ReactUnity.StyleEngine.RuleSelectorPartType;
      Name: string;
      Parameter: any; // System.Object
      CompareTo: ((other: ReactUnity.StyleEngine.RuleSelectorPart) => number);
      Matches: ((component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class NthChildParameter {
      constructor(value: string);
      A: number;
      B: number;
      Matches: ((index: number) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class IListInsertIntoSortedListExtensions {
      static InsertIntoSortedList: ((list: any, value: any) => void) | ((list: any, value: any, comparison: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Styling {
    export declare class BorderAndBackground {
      constructor(parent: UnityEngine.RectTransform);
      Root: UnityEngine.RectTransform;
      Border: UnityEngine.RectTransform;
      Background: UnityEngine.RectTransform;
      Shadow: UnityEngine.RectTransform;
      ShadowSprite: UnityEngine.Sprite;
      SetBorderSize: ((layout: any) => void);
      SetBorderImage: ((sprite: UnityEngine.Sprite) => void);
      SetBorderColor: ((color: UnityEngine.Color) => void);
      SetBackgroundColorAndImage: ((color: any, sprite: UnityEngine.Sprite) => void);
      SetBoxShadow: ((shadow: ReactUnity.Styling.Types.ShadowDefinition) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class BorderGraphic {
      static SpriteCache: any; // System.Collections.Generic.Dictionary`2[System.String,UnityEngine.Sprite]
      static CreateBorderSpriteVector: ((tl: number, tr: number, bl: number, br: number) => UnityEngine.Sprite);
      static CreateBorderSprite: ((borderRadius: number) => UnityEngine.Sprite) | ((tl: number, tr: number, bl: number, br: number, antiAliasing?: boolean) => UnityEngine.Sprite);
      static CreateBorderSpriteRaster: ((tl: number, tr: number, bl: number, br: number, antiAliasing?: boolean) => UnityEngine.Sprite);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IgnoreMaskImage {
      constructor();
      materialForRendering: UnityEngine.Material;
      sprite: UnityEngine.Sprite;
      overrideSprite: UnityEngine.Sprite;
      type: UnityEngine.UI.Image_Type;
      preserveAspect: boolean;
      fillCenter: boolean;
      fillMethod: UnityEngine.UI.Image_FillMethod;
      fillAmount: number;
      fillClockwise: boolean;
      fillOrigin: number;
      eventAlphaThreshold: number;
      alphaHitTestMinimumThreshold: number;
      useSpriteMesh: boolean;
      mainTexture: UnityEngine.Texture;
      hasBorder: boolean;
      pixelsPerUnitMultiplier: number;
      pixelsPerUnit: number;
      material: UnityEngine.Material;
      minWidth: number;
      preferredWidth: number;
      flexibleWidth: number;
      minHeight: number;
      preferredHeight: number;
      flexibleHeight: number;
      layoutPriority: number;
      onCullStateChanged: UnityEngine.UI.MaskableGraphic_CullStateChangedEvent;
      maskable: boolean;
      isMaskingGraphic: boolean;
      color: UnityEngine.Color;
      raycastTarget: boolean;
      raycastPadding: UnityEngine.Vector4;
      depth: number;
      rectTransform: UnityEngine.RectTransform;
      canvas: UnityEngine.Canvas;
      canvasRenderer: UnityEngine.CanvasRenderer;
      defaultMaterial: UnityEngine.Material;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      DisableSpriteOptimizations: (() => void);
      OnBeforeSerialize: (() => void);
      OnAfterDeserialize: (() => void);
      SetNativeSize: (() => void);
      CalculateLayoutInputHorizontal: (() => void);
      CalculateLayoutInputVertical: (() => void);
      IsRaycastLocationValid: ((screenPoint: UnityEngine.Vector2, eventCamera: UnityEngine.Camera) => boolean);
      GetModifiedMaterial: ((baseMaterial: UnityEngine.Material) => UnityEngine.Material);
      Cull: ((clipRect: UnityEngine.Rect, validRect: boolean) => void);
      SetClipRect: ((clipRect: UnityEngine.Rect, validRect: boolean) => void);
      SetClipSoftness: ((clipSoftness: UnityEngine.Vector2) => void);
      ParentMaskStateChanged: (() => void);
      RecalculateClipping: (() => void);
      RecalculateMasking: (() => void);
      SetAllDirty: (() => void);
      SetLayoutDirty: (() => void);
      SetVerticesDirty: (() => void);
      SetMaterialDirty: (() => void);
      OnCullingChanged: (() => void);
      Rebuild: ((update: UnityEngine.UI.CanvasUpdate) => void);
      LayoutComplete: (() => void);
      GraphicUpdateComplete: (() => void);
      OnRebuildRequested: (() => void);
      Raycast: ((sp: UnityEngine.Vector2, eventCamera: UnityEngine.Camera) => boolean);
      PixelAdjustPoint: ((point: UnityEngine.Vector2) => UnityEngine.Vector2);
      GetPixelAdjustedRect: (() => UnityEngine.Rect);
      CrossFadeColor: ((targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean) => void) | ((targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean) => void);
      CrossFadeAlpha: ((alpha: number, duration: number, ignoreTimeScale: boolean) => void);
      RegisterDirtyLayoutCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyLayoutCallback: ((action: UnityEngine.Events.UnityAction) => void);
      RegisterDirtyVerticesCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyVerticesCallback: ((action: UnityEngine.Events.UnityAction) => void);
      RegisterDirtyMaterialCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyMaterialCallback: ((action: UnityEngine.Events.UnityAction) => void);
      IsActive: (() => boolean);
      IsDestroyed: (() => boolean);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class InvertedMaskImage {
      constructor();
      materialForRendering: UnityEngine.Material;
      sprite: UnityEngine.Sprite;
      overrideSprite: UnityEngine.Sprite;
      type: UnityEngine.UI.Image_Type;
      preserveAspect: boolean;
      fillCenter: boolean;
      fillMethod: UnityEngine.UI.Image_FillMethod;
      fillAmount: number;
      fillClockwise: boolean;
      fillOrigin: number;
      eventAlphaThreshold: number;
      alphaHitTestMinimumThreshold: number;
      useSpriteMesh: boolean;
      mainTexture: UnityEngine.Texture;
      hasBorder: boolean;
      pixelsPerUnitMultiplier: number;
      pixelsPerUnit: number;
      material: UnityEngine.Material;
      minWidth: number;
      preferredWidth: number;
      flexibleWidth: number;
      minHeight: number;
      preferredHeight: number;
      flexibleHeight: number;
      layoutPriority: number;
      onCullStateChanged: UnityEngine.UI.MaskableGraphic_CullStateChangedEvent;
      maskable: boolean;
      isMaskingGraphic: boolean;
      color: UnityEngine.Color;
      raycastTarget: boolean;
      raycastPadding: UnityEngine.Vector4;
      depth: number;
      rectTransform: UnityEngine.RectTransform;
      canvas: UnityEngine.Canvas;
      canvasRenderer: UnityEngine.CanvasRenderer;
      defaultMaterial: UnityEngine.Material;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      DisableSpriteOptimizations: (() => void);
      OnBeforeSerialize: (() => void);
      OnAfterDeserialize: (() => void);
      SetNativeSize: (() => void);
      CalculateLayoutInputHorizontal: (() => void);
      CalculateLayoutInputVertical: (() => void);
      IsRaycastLocationValid: ((screenPoint: UnityEngine.Vector2, eventCamera: UnityEngine.Camera) => boolean);
      GetModifiedMaterial: ((baseMaterial: UnityEngine.Material) => UnityEngine.Material);
      Cull: ((clipRect: UnityEngine.Rect, validRect: boolean) => void);
      SetClipRect: ((clipRect: UnityEngine.Rect, validRect: boolean) => void);
      SetClipSoftness: ((clipSoftness: UnityEngine.Vector2) => void);
      ParentMaskStateChanged: (() => void);
      RecalculateClipping: (() => void);
      RecalculateMasking: (() => void);
      SetAllDirty: (() => void);
      SetLayoutDirty: (() => void);
      SetVerticesDirty: (() => void);
      SetMaterialDirty: (() => void);
      OnCullingChanged: (() => void);
      Rebuild: ((update: UnityEngine.UI.CanvasUpdate) => void);
      LayoutComplete: (() => void);
      GraphicUpdateComplete: (() => void);
      OnRebuildRequested: (() => void);
      Raycast: ((sp: UnityEngine.Vector2, eventCamera: UnityEngine.Camera) => boolean);
      PixelAdjustPoint: ((point: UnityEngine.Vector2) => UnityEngine.Vector2);
      GetPixelAdjustedRect: (() => UnityEngine.Rect);
      CrossFadeColor: ((targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean) => void) | ((targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean) => void);
      CrossFadeAlpha: ((alpha: number, duration: number, ignoreTimeScale: boolean) => void);
      RegisterDirtyLayoutCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyLayoutCallback: ((action: UnityEngine.Events.UnityAction) => void);
      RegisterDirtyVerticesCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyVerticesCallback: ((action: UnityEngine.Events.UnityAction) => void);
      RegisterDirtyMaterialCallback: ((action: UnityEngine.Events.UnityAction) => void);
      UnregisterDirtyMaterialCallback: ((action: UnityEngine.Events.UnityAction) => void);
      IsActive: (() => boolean);
      IsDestroyed: (() => boolean);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class ILayoutProperty {
      Set: ((node: any, value: any, defaultNode: any) => void);
      SetDefault: ((node: any) => void) | ((node: any, defaultNode: any) => void);
      Get: ((node: any) => any);
      Serialize: ((value: any) => string);
    }
    export declare class LayoutValue {
      constructor(prop: ReactUnity.Styling.ILayoutProperty, value: any);
      prop: ReactUnity.Styling.ILayoutProperty;
      value: any; // System.Object
      Get: ((node: any) => any);
      Set: ((node: any, defaultNode: any) => void);
      SetDefault: ((node: any) => void) | ((node: any, defaultNode: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class LayoutProperty<T = any> {
      constructor(name: string, transitionable?: boolean, defaultValue?: T);
      name: string;
      type: any; // System.Type
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      proxy: boolean;
      propInfo: any; // System.Reflection.PropertyInfo
      setter: any; // System.Action`2[Facebook.Yoga.YogaNode,T]
      getter: any; // System.Func`2[Facebook.Yoga.YogaNode,T]
      converter: ReactUnity.Styling.Parsers.IStyleConverter;
      Set: ((node: any, value: any, defaultNode: any) => void);
      SetDefault: ((node: any) => void) | ((node: any, defaultNode: any) => void);
      Get: ((node: any) => any);
      Serialize: ((value: any) => string);
      Convert: ((value: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class LayoutProperties {
      static StyleDirection: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaDirection]
      static FlexDirection: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaFlexDirection]
      static JustifyContent: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaJustify]
      static Display: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaDisplay]
      static AlignItems: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
      static AlignSelf: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
      static AlignContent: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
      static PositionType: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaPositionType]
      static Wrap: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaWrap]
      static Overflow: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaOverflow]
      static FlexGrow: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static FlexShrink: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static FlexBasis: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Width: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Height: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MinWidth: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MinHeight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MaxWidth: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MaxHeight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static AspectRatio: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static Left: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Right: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Top: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Bottom: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Start: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static End: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Margin: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginLeft: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginRight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginTop: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginBottom: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginStart: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginEnd: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginHorizontal: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MarginVertical: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Padding: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingLeft: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingRight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingTop: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingBottom: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingStart: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingEnd: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingHorizontal: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static PaddingVertical: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static BorderWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderLeftWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderRightWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderTopWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderBottomWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderStartWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static BorderEndWidth: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.ILayoutProperty]
      static CssPropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.ILayoutProperty]
      static AllProperties: ReactUnity.Styling.ILayoutProperty[];
      static GetProperty: ((name: string) => ReactUnity.Styling.ILayoutProperty);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class LinkedTextWatcher {
      constructor();
      WatchedText: ReactUnity.Components.TextComponent;
      LinkedText: ReactUnity.Components.TextComponent;
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export declare class MaskAndImage {
      constructor(parent: UnityEngine.RectTransform);
      Mask: UnityEngine.UI.Mask;
      Image: UnityEngine.UI.Image;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class NodeStyle {
      constructor();
      constructor(stateStyles: ReactUnity.Styling.StateStyles);
      constructor(defaultStyle: ReactUnity.Styling.NodeStyle, stateStyles: ReactUnity.Styling.StateStyles);
      HasInheritedChanges: boolean;
      opacity: number;
      zIndex: number;
      visibility: boolean;
      cursor: string;
      pointerEvents: ReactUnity.Styling.Types.PointerEvents;
      backgroundColor: UnityEngine.Color;
      backgroundImage: ReactUnity.Types.ImageReference;
      borderRadius: number;
      borderTopLeftRadius: number;
      borderTopRightRadius: number;
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
      borderColor: UnityEngine.Color;
      borderLeftColor: UnityEngine.Color;
      borderRightColor: UnityEngine.Color;
      borderTopColor: UnityEngine.Color;
      borderBottomColor: UnityEngine.Color;
      boxShadow: ReactUnity.Styling.Types.ShadowDefinition;
      translate: ReactUnity.Types.YogaValue2;
      scale: UnityEngine.Vector2;
      transformOrigin: ReactUnity.Types.YogaValue2;
      rotate: number;
      fontFamily: ReactUnity.Types.FontReference;
      color: UnityEngine.Color;
      fontWeight: any; // TMPro.FontWeight
      fontStyle: any; // TMPro.FontStyles
      fontSize: any; // Facebook.Yoga.YogaValue
      textAlign: any; // TMPro.TextAlignmentOptions
      textOverflow: any; // TMPro.TextOverflowModes
      textWrap: boolean;
      content: string;
      appearance: ReactUnity.Styling.Types.Appearance;
      navigation: UnityEngine.UI.Navigation_Mode;
      fontSizeActual: number;
      CssStyles: any; // System.Collections.Generic.List`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
      CssLayouts: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
      Parent: ReactUnity.Styling.NodeStyle;
      StateStyles: ReactUnity.Styling.StateStyles;
      CopyStyle: ((copyFrom: ReactUnity.Styling.NodeStyle) => void);
      GetStyleValue: ((prop: ReactUnity.Styling.IStyleProperty, fromChild?: boolean) => any);
      SetStyleValue: ((prop: ReactUnity.Styling.IStyleProperty, value: any) => void);
      MarkChangesSeen: (() => void);
      HasValue: ((prop: ReactUnity.Styling.IStyleProperty) => boolean) | ((name: string) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StateStyles {
      constructor(cmp: ReactUnity.IReactComponent);
      Dic: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.NodeStyle]
      Component: ReactUnity.IReactComponent;
      States: any; // System.Collections.Generic.HashSet`1[System.String]
      ActiveStates: any; // System.Collections.Generic.List`1[ReactUnity.Styling.NodeStyle]
      SubscribeToState: ((state: string) => void);
      StartState: ((state: string) => boolean);
      EndState: ((state: string) => boolean);
      GetStyleValue: ((prop: ReactUnity.Styling.IStyleProperty) => any);
      GetState: ((state: string) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class IStyleProperty {
      name: string;
      type: any; // System.Type
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      proxy: boolean;
      Convert: ((value: any) => any);
    }
    export declare class StyleProperty<T = any> {
      constructor(name: string, defaultValue?: any, transitionable?: boolean, inherited?: boolean, proxy?: boolean, converter?: ReactUnity.Styling.Parsers.IStyleConverter);
      name: string;
      type: any; // System.Type
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      proxy: boolean;
      converter: ReactUnity.Styling.Parsers.IStyleConverter;
      Convert: ((value: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StyleProperties {
      static opacity: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static zIndex: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static visibility: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static cursor: any; // ReactUnity.Styling.StyleProperty`1[System.String]
      static pointerEvents: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Styling.Types.PointerEvents]
      static backgroundColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static backgroundImage: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.ImageReference]
      static borderRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static borderTopLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static borderTopRightRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static borderBottomLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static borderBottomRightRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static borderColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderLeftColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderRightColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderTopColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderBottomColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static boxShadow: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Styling.Types.ShadowDefinition]
      static transformOrigin: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static translate: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static scale: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Vector2]
      static rotate: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static fontFamily: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.FontReference]
      static color: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static fontWeight: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontWeight]
      static fontStyle: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontStyles]
      static fontSize: any; // ReactUnity.Styling.StyleProperty`1[Facebook.Yoga.YogaValue]
      static textAlign: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextAlignmentOptions]
      static textOverflow: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextOverflowModes]
      static textWrap: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static content: any; // ReactUnity.Styling.StyleProperty`1[System.String]
      static appearance: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Styling.Types.Appearance]
      static navigation: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.UI.Navigation+Mode]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      static CssPropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      static AllProperties: ReactUnity.Styling.IStyleProperty[];
      static GetStyleProperty: ((name: string) => ReactUnity.Styling.IStyleProperty);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export namespace Parsers {
      export declare class BoolConverter {
        constructor(truthyValues: string[], falsyValues: string[]);
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ColorConverter {
        constructor();
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class EnumConverter<T = any> {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class FloatConverter {
        constructor();
        static PxRegex: any; // System.Text.RegularExpressions.Regex
        static PercentRegex: any; // System.Text.RegularExpressions.Regex
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class FontReferenceConverter {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class GeneralConverter {
        constructor(baseConverter?: ReactUnity.Styling.Parsers.IStyleConverter);
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class IStyleParser {
        FromString: ((value: string) => any);
      }
      export declare class IStyleConverter {
        Convert: ((value: any) => any);
      }
      export declare class ImageReferenceConverter {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class IntConverter {
        constructor();
        FloatParser: ReactUnity.Styling.Parsers.FloatConverter;
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class ShadowDefinitionConverter {
        constructor();
        ColorParser: ReactUnity.Styling.Parsers.ColorConverter;
        FloatParser: ReactUnity.Styling.Parsers.FloatConverter;
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class StringConverter {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class UrlConverter {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class Vector2Converter {
        constructor();
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class VideoReferenceConverter {
        constructor();
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class YogaValue2Converter {
        constructor();
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export declare class YogaValueConverter {
        constructor();
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
    }
    export namespace Types {
      export enum Appearance {
        None = 0,
        Button = 1,
        Input = 2,
        Toggle = 3,
      }
      export enum PointerEvents {
        Auto = 0,
        Visible = 0,
        All = 1,
        None = 2,
      }
      export declare class ShadowDefinition {
        constructor();
        constructor(offset: UnityEngine.Vector2, spread: UnityEngine.Vector2, color: UnityEngine.Color, blur: number, inset?: boolean);
        offset: UnityEngine.Vector2;
        spread: UnityEngine.Vector2;
        color: UnityEngine.Color;
        blur: number;
        inset: boolean;
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export enum SpecialNames {
        NoSpecialName = 0,
        Initial = 1,
        Default = 1,
        Inherit = 2,
        CantParse = 3,
        Auto = 4,
        None = 5,
        Unset = 6,
      }
    }
  }
  export namespace Types {
    export enum AssetReferenceType {
      None = 0,
      Auto = 1,
      Object = 2,
      Resource = 3,
      File = 4,
      Url = 5,
      Global = 6,
      Procedural = 7,
      Data = 8,
    }
    export declare class AssetReference<AssetType = any> {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      static None: any; // ReactUnity.Types.AssetReference`1[AssetType]
      Get: ((context: ReactUnity.ReactContext, callback: any) => void);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class FontReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      static None: ReactUnity.Types.FontReference;
      Get: ((context: ReactUnity.ReactContext, callback: any) => void);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export enum ImageFitMode {
      Center = 0,
      CenterCrop = 1,
      CenterInside = 2,
      FitCenter = 3,
      FitStart = 4,
      FitEnd = 5,
      Fill = 6,
    }
    export declare class ImageReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      static None: ReactUnity.Types.ImageReference;
      Dispose: (() => void);
      Get: ((context: ReactUnity.ReactContext, callback: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StringObjectPair {
      constructor();
      Key: string;
      Value: UnityEngine.Object;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class StringObjectDictionary {
      constructor();
      Comparer: any; // System.Collections.Generic.IEqualityComparer`1[System.String]
      Count: number;
      Keys: any; // System.Collections.Generic.Dictionary`2+KeyCollection[System.String,UnityEngine.Object]
      Values: any; // System.Collections.Generic.Dictionary`2+ValueCollection[System.String,UnityEngine.Object]
      GetValueOrDefault: ((key: string) => UnityEngine.Object);
      OnAfterDeserialize: (() => void);
      OnBeforeSerialize: (() => void);
      Add: ((key: string, value: UnityEngine.Object) => void);
      Clear: (() => void);
      ContainsKey: ((key: string) => boolean);
      ContainsValue: ((value: UnityEngine.Object) => boolean);
      GetEnumerator: (() => any);
      GetObjectData: ((info: any, context: any) => void);
      OnDeserialization: ((sender: any) => void);
      Remove: ((key: string) => boolean);
      TryAdd: ((key: string, value: UnityEngine.Object) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class VideoReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      static None: ReactUnity.Types.VideoReference;
      Get: ((context: ReactUnity.ReactContext, callback: any) => void);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class YogaValue2 {
      constructor(x: any, y: any);
      X: any; // Facebook.Yoga.YogaValue
      Y: any; // Facebook.Yoga.YogaValue
      static Zero: ReactUnity.Types.YogaValue2;
      static Auto: ReactUnity.Types.YogaValue2;
      static Center: ReactUnity.Types.YogaValue2;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Visitors {
    export declare class ReactComponentVisitor {
      Visit: ((component: ReactUnity.IReactComponent) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export declare class TextContentVisitor {
      constructor();
      Visit: ((component: ReactUnity.IReactComponent) => void);
      Get: ((component: ReactUnity.IReactComponent) => string);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace WebSupport {
    export declare class WebGLInput {
      constructor();
      useGUILayout: boolean;
      runInEditMode: boolean;
      enabled: boolean;
      isActiveAndEnabled: boolean;
      transform: UnityEngine.Transform;
      gameObject: UnityEngine.GameObject;
      tag: string;
      rigidbody: UnityEngine.Component;
      rigidbody2D: UnityEngine.Component;
      camera: UnityEngine.Component;
      light: UnityEngine.Component;
      animation: UnityEngine.Component;
      constantForce: UnityEngine.Component;
      renderer: UnityEngine.Component;
      audio: UnityEngine.Component;
      networkView: UnityEngine.Component;
      collider: UnityEngine.Component;
      collider2D: UnityEngine.Component;
      hingeJoint: UnityEngine.Component;
      particleSystem: UnityEngine.Component;
      name: string;
      hideFlags: UnityEngine.HideFlags;
      enableTabText: boolean;
      showHtmlElement: boolean;
      OnSelect: (() => void);
      CompareTo: ((other: ReactUnity.WebSupport.WebGLInput) => number) | ((obj: any) => number);
      IsInvoking: (() => boolean) | ((methodName: string) => boolean);
      CancelInvoke: (() => void) | ((methodName: string) => void);
      Invoke: ((methodName: string, time: number) => void);
      InvokeRepeating: ((methodName: string, time: number, repeatRate: number) => void);
      StartCoroutine: ((methodName: string) => UnityEngine.Coroutine) | ((methodName: string, value: any) => UnityEngine.Coroutine) | ((routine: any) => UnityEngine.Coroutine);
      StartCoroutine_Auto: ((routine: any) => UnityEngine.Coroutine);
      StopCoroutine: ((routine: any) => void) | ((routine: UnityEngine.Coroutine) => void) | ((methodName: string) => void);
      StopAllCoroutines: (() => void);
      GetComponent: ((type: any) => UnityEngine.Component) | ((type: string) => UnityEngine.Component);
      GetComponentInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component) | ((t: any) => UnityEngine.Component);
      GetComponentsInChildren: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponentInParent: ((t: any) => UnityEngine.Component);
      GetComponentsInParent: ((t: any, includeInactive: boolean) => UnityEngine.Component[]) | ((t: any) => UnityEngine.Component[]);
      GetComponents: ((type: any) => UnityEngine.Component[]) | ((type: any, results: any) => void);
      CompareTag: ((tag: string) => boolean);
      SendMessageUpwards: ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      SendMessage: ((methodName: string, value: any) => void) | ((methodName: string) => void) | ((methodName: string, value: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      BroadcastMessage: ((methodName: string, parameter: any, options: UnityEngine.SendMessageOptions) => void) | ((methodName: string, parameter: any) => void) | ((methodName: string) => void) | ((methodName: string, options: UnityEngine.SendMessageOptions) => void);
      GetInstanceID: (() => number);
      GetHashCode: (() => number);
      Equals: ((other: any) => boolean);
      ToString: (() => string);
      GetType: (() => any);
    }
    export enum ContentType {
      Standard = 0,
      Autocorrected = 1,
      IntegerNumber = 2,
      DecimalNumber = 3,
      Alphanumeric = 4,
      Name = 5,
      EmailAddress = 6,
      Password = 7,
      Pin = 8,
      Custom = 9,
    }
    export enum LineType {
      SingleLine = 0,
      MultiLineSubmit = 1,
      MultiLineNewline = 2,
    }
    export declare class IInputField {
      contentType: ReactUnity.WebSupport.ContentType;
      lineType: ReactUnity.WebSupport.LineType;
      fontSize: number;
      text: string;
      placeholder: string;
      characterLimit: number;
      lineHeight: number;
      caretPosition: number;
      isFocused: boolean;
      selectionFocusPosition: number;
      selectionAnchorPosition: number;
      ReadOnly: boolean;
      OnFocusSelectAll: boolean;
      RectTransform: (() => UnityEngine.RectTransform);
      ActivateInputField: (() => void);
      DeactivateInputField: (() => void);
      Rebuild: (() => void);
    }
    export declare class WebGLWindow {
      static Focus: boolean;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
}
