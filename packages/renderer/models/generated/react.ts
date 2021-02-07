//
// Types in assemblies: ReactUnity
// Generated 7.02.2021 17:05:53
//
import { UnityEngine } from './unity';

export namespace ReactUnity {
  export interface ReactScript {
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
  export interface DetectChanges {
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export interface ReactUnity {
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
    ExecuteScript: ((script: string) => void);
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
  export interface ReactUnityAPI {
    createText: ((text: string, host: ReactUnity.Components.HostComponent) => ReactUnity.Components.UnityComponent);
    createElement: ((tag: string, text: string, host: ReactUnity.Components.HostComponent) => ReactUnity.Components.UnityComponent);
    appendChild: ((parent: any, child: any) => void);
    appendChildToContainer: ((parent: any, child: any) => void);
    insertBefore: ((parent: any, child: any, beforeChild: any) => void);
    removeChild: ((parent: any, child: any) => void);
    setText: ((instance: any, text: string) => void);
    setProperty: ((element: any, property: string, value: any) => void);
    setData: ((element: any, property: string, value: any) => void);
    setEventListener: ((element: ReactUnity.Components.UnityComponent, eventType: string, value: any) => void) | ((element: any, eventType: string, value: any) => void);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export interface UnityUGUIContext {
    Engine: any; // Jint.Engine
    Host: ReactUnity.Components.HostComponent;
    Globals: ReactUnity.Types.StringObjectDictionary;
    RootLayoutNode: any; // Facebook.Yoga.YogaNode
    IsDevServer: boolean;
    Script: ReactUnity.ReactScript;
    Parser: any; // ExCSS.StylesheetParser
    StyleTree: ReactUnity.StyleEngine.StyleTree;
    FontFamilies: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Types.FontReference]
    scheduleLayout: ((callback?: any) => void);
    InsertStyle: ((style: string) => void);
    RemoveStyle: ((style: string) => void);
    ResolvePath: ((path: string) => string);
    CreateStaticScript: ((path: string) => ReactUnity.ReactScript);
    Equals: ((obj: any) => boolean);
    GetHashCode: (() => number);
    GetType: (() => any);
    ToString: (() => string);
  }
  export interface CalculateSizeFromContents {
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
    export interface AnchorComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      url: string;
      openInThisTab: boolean;
      IsPseudoElement: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ButtonComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Button: UnityEngine.UI.Button;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ContainerComponent {
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface HostComponent {
      Width: number;
      Height: number;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      ApplyStyles: (() => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ImageComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.Image;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface InputComponent {
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Value: string;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      SetText: ((text: string) => void);
      ApplyLayoutStyles: (() => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyStyles: (() => void);
      Focus: (() => void);
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface RawImageComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface RenderTextureComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      RenderTexture: UnityEngine.RenderTexture;
      IsPseudoElement: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ScrollComponent {
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      ScrollRect: UnityEngine.UI.ScrollRect;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface TextComponent {
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Text: any; // TMPro.TextMeshProUGUI
      Width: number;
      Height: number;
      Measurer: ReactUnity.Layout.TextMeasurer;
      LinkedTextWatcher: ReactUnity.Styling.LinkedTextWatcher;
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      SetText: ((text: string) => void);
      ApplyLayoutStyles: (() => void);
      ApplyStyles: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ToggleComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Value: boolean;
      Toggle: UnityEngine.UI.Toggle;
      Check: ReactUnity.Components.ImageComponent;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      Focus: (() => void);
      SetEventListener: ((eventName: string, callback: ReactUnity.Interop.Callback) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface UnityComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      IsPseudoElement: boolean;
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      SetProperty: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface VideoComponent {
      DefaultStyle: ReactUnity.Styling.NodeStyle;
      DefaultLayout: any; // Facebook.Yoga.YogaNode
      Measurer: ReactUnity.Layout.ImageMeasurer;
      ImageContainer: ReactUnity.Components.ContainerComponent;
      Image: UnityEngine.UI.RawImage;
      Fit: ReactUnity.Types.ImageFitMode;
      Container: UnityEngine.RectTransform;
      Children: any; // System.Collections.Generic.List`1[ReactUnity.Components.UnityComponent]
      BeforeRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      AfterRules: any; // System.Collections.Generic.List`1[ReactUnity.StyleEngine.RuleTreeNode`1[ReactUnity.StyleEngine.StyleData]]
      BeforePseudo: ReactUnity.Components.UnityComponent;
      AfterPseudo: ReactUnity.Components.UnityComponent;
      Context: ReactUnity.UnityUGUIContext;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Parent: ReactUnity.Components.ContainerComponent;
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
      Tag: string;
      ClassName: string;
      ClassList: any; // System.Collections.Generic.HashSet`1[System.String]
      TextContent: string;
      VideoPlayer: UnityEngine.Video.VideoPlayer;
      RenderTexture: UnityEngine.RenderTexture;
      IsPseudoElement: boolean;
      SetProperty: ((propertyName: string, value: any) => void);
      ResolveStyle: ((recursive?: boolean) => void);
      ApplyLayoutStyles: (() => void);
      Accept: ((visitor: ReactUnity.Visitors.UnityComponentVisitor) => void);
      AddBefore: (() => void);
      RemoveBefore: (() => void);
      AddAfter: (() => void);
      RemoveAfter: (() => void);
      Destroy: (() => void);
      SetParent: ((parent: ReactUnity.Components.ContainerComponent, insertBefore?: ReactUnity.Components.UnityComponent, insertAfter?: boolean) => void);
      SetEventListener: ((eventName: string, fun: ReactUnity.Interop.Callback) => void);
      SetData: ((propertyName: string, value: any) => void);
      ScheduleLayout: ((callback?: any) => void);
      ApplyStyles: (() => void);
      UpdateBackgroundGraphic: ((updateLayout: boolean, updateStyle: boolean) => ReactUnity.Styling.BorderAndBackground);
      QuerySelector: ((query: string) => ReactUnity.Components.UnityComponent);
      QuerySelectorAll: ((query: string) => any);
      GetRelativePosition: ((x: number, y: number) => UnityEngine.Vector2);
      GetComponent: ((type: any) => UnityEngine.Component);
      AddComponent: ((type: any) => UnityEngine.Component);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface VideoComponentSource {
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
    export interface ConsoleProxy {
      log: ((msg: any) => void) | ((msg: any, subs: any) => void);
      info: ((msg: any) => void) | ((msg: any, subs: any) => void);
      debug: ((msg: any) => void) | ((msg: any, subs: any) => void);
      warn: ((msg: any) => void) | ((msg: any, subs: any) => void);
      error: ((msg: any) => void) | ((msg: any, subs: any) => void);
      dir: ((msg: any) => void) | ((msg: any, subs: any) => void);
      clear: (() => void);
      assert: ((val: boolean) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface DocumentProxy {
      head: ReactUnity.DomProxies.HeadProxy;
      origin: string;
      execute: any; // System.Action`1[System.String]
      context: ReactUnity.UnityUGUIContext;
      root: ReactUnity.ReactUnity;
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
    export interface IDomElementProxy {
      OnAppend: (() => void);
      OnRemove: (() => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      appendChild: ((text: string) => void);
      removeChild: ((text: string) => void);
    }
    export interface DomElementProxyBase {
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface HeadProxy {
      appendChild: ((child: ReactUnity.DomProxies.IDomElementProxy) => void);
      removeChild: ((child: ReactUnity.DomProxies.IDomElementProxy) => void);
      setAttribute: ((key: any, value: any) => void);
      removeAttribute: ((key: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface ScriptProxy {
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
    export interface StyleProxy {
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
    export interface LocalStorage {
      setItem: ((x: string, value: string) => void);
      getItem: ((x: string) => string);
      removeItem: ((x: string) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface Location {
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
    export interface WebSocketProxy {
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
      binaryType: string;
      close: ((code?: number, reason?: string) => void);
      Accept: (() => void);
      AcceptAsync: (() => void);
      Close: (() => void) | ((code: any) => void) | ((code: any) => void) | ((code: any, reason: string) => void) | ((code: any, reason: string) => void);
      CloseAsync: (() => void) | ((code: any) => void) | ((code: any) => void) | ((code: any, reason: string) => void) | ((code: any, reason: string) => void);
      Connect: (() => void);
      ConnectAsync: (() => void);
      Ping: (() => boolean) | ((message: string) => boolean);
      Send: ((data: any) => void) | ((file: any) => void) | ((data: string) => void);
      SendAsync: ((data: any, completed: any) => void) | ((file: any, completed: any) => void) | ((data: string, completed: any) => void) | ((stream: any, length: number, completed: any) => void);
      SetCookie: ((cookie: any) => void);
      SetCredentials: ((username: string, password: string, preAuth: boolean) => void);
      SetProxy: ((url: string, username: string, password: string) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface XMLHttpRequest {
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
  export namespace EventHandlers {
    export interface AnchorClickHandler {
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
    export interface BeginDragHandler {
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
    export interface CancelHandler {
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
    export interface DeselectHandler {
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
    export interface DragHandler {
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
    export interface DropHandler {
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
    export interface EndDragHandler {
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
    export interface EventHandlerMap {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface IEventHandler {
      ClearListeners: (() => void);
    }
    export interface KeyDownHandler {
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
    export interface KeyEventData {
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
    export interface MoveHandler {
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
    export interface PointerClickHandler {
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
    export interface PointerDownHandler {
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
    export interface PointerEnterHandler {
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
    export interface PointerExitHandler {
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
    export interface PointerUpHandler {
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
    export interface PotentialDragHandler {
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
    export interface ScrollHandler {
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
    export interface SelectHandler {
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
    export interface SubmitHandler {
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
    export interface UpdateSelectedHandler {
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
    export interface CursorAPI {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface EventTypes {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Interop {
    export interface Callback {
      callback: any; // System.Object
      Call: (() => any) | ((args: any) => any);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface MainThreadDispatcher {
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
    export interface MainThreadDispatcher_CoroutineHandle {
      Handle: number;
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Layout {
    export interface ImageMeasurer {
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
      Context: ReactUnity.UnityUGUIContext;
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
    export interface ReactElement {
      Layout: any; // Facebook.Yoga.YogaNode
      Style: ReactUnity.Styling.NodeStyle;
      Component: ReactUnity.Components.UnityComponent;
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
    export interface ResponsiveElement {
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
      Context: ReactUnity.UnityUGUIContext;
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
    export interface TextMeasurer {
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
      Context: ReactUnity.UnityUGUIContext;
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
    export interface IUnityScheduler {
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
    export interface NoScheduler {
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
    export interface UnityScheduler {
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
    export interface ActiveStateHandler {
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
    export interface CursorHandler {
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
    export interface FocusStateHandler {
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
    export interface FocusVisibleStateHandler {
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
    export interface FocusWithinStateHandler {
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
    export interface HoverStateHandler {
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
    export interface IStateHandler {
      ClearListeners: (() => void);
    }
  }
  export namespace StyleEngine {
    export interface RuleHelpers {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface StyleData {
      Rules: any; // System.Collections.Generic.List`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
      Layouts: any; // System.Collections.Generic.List`1[ReactUnity.Styling.LayoutValue]
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface StyleTree {
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
      AddStyle: ((rule: any) => any);
      GetMatchingRules: ((component: ReactUnity.Components.UnityComponent) => any);
      GetMatchingBefore: ((component: ReactUnity.Components.UnityComponent) => any);
      GetMatchingAfter: ((component: ReactUnity.Components.UnityComponent) => any);
      GetMatchingChild: ((component: ReactUnity.Components.UnityComponent, pseudoElement?: boolean) => ReactUnity.Components.UnityComponent);
      GetMatchingChildren: ((component: ReactUnity.Components.UnityComponent, pseudoElement?: boolean) => any);
      AddSelector: ((selectorText: string) => any);
      AddChildCascading: ((selector: string) => any);
      Matches: ((component: ReactUnity.Components.UnityComponent, scope: ReactUnity.Components.UnityComponent) => boolean);
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
    export interface RuleSelectorPart {
      Negated: boolean;
      Type: ReactUnity.StyleEngine.RuleSelectorPartType;
      Name: string;
      Parameter: any; // System.Object
      CompareTo: ((other: ReactUnity.StyleEngine.RuleSelectorPart) => number);
      Matches: ((component: ReactUnity.Components.UnityComponent, scope?: ReactUnity.Components.UnityComponent) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface NthChildParameter {
      A: number;
      B: number;
      Matches: ((index: number) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
    export interface IListInsertIntoSortedListExtensions {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace Styling {
    export interface BorderAndBackground {
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
    export interface BorderGraphic {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface IgnoreMaskImage {
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
    export interface InvertedMaskImage {
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
    export interface ILayoutProperty {
      Set: ((node: any, value: any, defaultNode: any) => void);
      SetDefault: ((node: any) => void) | ((node: any, defaultNode: any) => void);
      Get: ((node: any) => any);
      Parse: ((value: any) => any);
      Serialize: ((value: any) => string);
    }
    export interface LayoutValue {
      Get: ((node: any) => any);
      Set: ((node: any, defaultNode: any) => void);
      SetDefault: ((node: any) => void) | ((node: any, defaultNode: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface LayoutProperties {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface LinkedTextWatcher {
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
    export interface MaskAndImage {
      Mask: UnityEngine.UI.Mask;
      Image: UnityEngine.UI.Image;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface NodeStyle {
      HasInheritedChanges: boolean;
      opacity: number;
      zIndex: number;
      visibility: boolean;
      cursor: string;
      pointerEvents: ReactUnity.Styling.Types.PointerEvents;
      backgroundColor: UnityEngine.Color;
      backgroundImage: ReactUnity.Types.ImageReference;
      borderRadius: number;
      borderColor: UnityEngine.Color;
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
      HasValue: ((name: string) => boolean);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface StateStyles {
      Dic: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.NodeStyle]
      Component: ReactUnity.Components.UnityComponent;
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
    export interface IStyleProperty {
      name: string;
      type: any; // System.Type
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      proxy: boolean;
      Parse: ((value: any) => any);
    }
    export interface StyleProperties {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export namespace Parsers {
      export interface BoolConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface ColorConverter {
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface FloatConverter {
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface FontReferenceConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface GeneralConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface IStyleParser {
        FromString: ((value: string) => any);
      }
      export interface IStyleConverter {
        Convert: ((value: any) => any);
      }
      export interface ImageReferenceConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface IntConverter {
        FloatParser: ReactUnity.Styling.Parsers.FloatConverter;
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface ShadowDefinitionConverter {
        ColorParser: ReactUnity.Styling.Parsers.ColorConverter;
        FloatParser: ReactUnity.Styling.Parsers.FloatConverter;
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface StringConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface UrlConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface Vector2Converter {
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface VideoReferenceConverter {
        Convert: ((value: any) => any);
        FromString: ((value: string) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface YogaValue2Converter {
        FromString: ((value: string) => any);
        Convert: ((value: any) => any);
        Equals: ((obj: any) => boolean);
        GetHashCode: (() => number);
        GetType: (() => any);
        ToString: (() => string);
      }
      export interface YogaValueConverter {
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
      export interface ShadowDefinition {
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
    export interface FontReference {
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      Get: ((context: ReactUnity.UnityUGUIContext, callback: any) => void);
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
    export interface ImageReference {
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      Dispose: (() => void);
      Get: ((context: ReactUnity.UnityUGUIContext, callback: any) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface StringObjectPair {
      Key: string;
      Value: UnityEngine.Object;
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface StringObjectDictionary {
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
    export interface VideoReference {
      type: ReactUnity.Types.AssetReferenceType;
      value: any; // System.Object
      Get: ((context: ReactUnity.UnityUGUIContext, callback: any) => void);
      Dispose: (() => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface YogaValue2 {
      X: any; // Facebook.Yoga.YogaValue
      Y: any; // Facebook.Yoga.YogaValue
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => any);
    }
  }
  export namespace Visitors {
    export interface TextContentVisitor {
      Visit: ((component: ReactUnity.Components.UnityComponent) => void);
      Get: ((component: ReactUnity.Components.UnityComponent) => string);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
    export interface UnityComponentVisitor {
      Visit: ((component: ReactUnity.Components.UnityComponent) => void);
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
  export namespace WebSupport {
    export interface WebGLInput {
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
    export interface IInputField {
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
    export interface WebGLWindow {
      Equals: ((obj: any) => boolean);
      GetHashCode: (() => number);
      GetType: (() => any);
      ToString: (() => string);
    }
  }
}
