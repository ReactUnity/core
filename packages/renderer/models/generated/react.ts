//
// Types in assemblies: ReactUnity, ReactUnity.Editor, ReactUnity.UGUI, ReactUnity.UIToolkit
// Generated 22/08/2021 23:11:57
//
import { InlineStyleRemap } from '../properties/style';
import { System } from './system';
import { UnityEngine } from './unity';

export declare namespace Facebook {
  export namespace Yoga {
    export class BaselineFunction {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(node: Facebook.Yoga.YogaNode, width: number, height: number): number;
      BeginInvoke(node: Facebook.Yoga.YogaNode, width: number, height: number, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class Logger {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(config: Facebook.Yoga.YogaConfig, node: Facebook.Yoga.YogaNode, level: Facebook.Yoga.YogaLogLevel, message: string): void;
      BeginInvoke(config: Facebook.Yoga.YogaConfig, node: Facebook.Yoga.YogaNode, level: Facebook.Yoga.YogaLogLevel, message: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class MeasureFunction {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode): Facebook.Yoga.YogaSize;
      BeginInvoke(node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): Facebook.Yoga.YogaSize;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class MeasureOutput {
      constructor();
      static Make(width: number, height: number): Facebook.Yoga.YogaSize;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum YogaAlign {
      Auto = 0,
      FlexStart = 1,
      Center = 2,
      FlexEnd = 3,
      Stretch = 4,
      Baseline = 5,
      SpaceBetween = 6,
      SpaceAround = 7,
    }
    export class YogaBaselineFunc {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(unmanagedNodePtr: System.IntPtr, width: number, height: number): number;
      BeginInvoke(unmanagedNodePtr: System.IntPtr, width: number, height: number, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class YogaConfig {
      constructor();
      Logger: Facebook.Yoga.Logger;
      UseWebDefaults: boolean;
      PointScaleFactor: number;
      SetExperimentalFeatureEnabled(feature: Facebook.Yoga.YogaExperimentalFeature, enabled: boolean): void;
      IsExperimentalFeatureEnabled(feature: Facebook.Yoga.YogaExperimentalFeature): boolean;
      static GetInstanceCount(): number;
      static SetDefaultLogger(logger: Facebook.Yoga.Logger): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class YogaConstants {
      static Undefined: number;
      static IsUndefined(value: number): boolean;
      static IsUndefined(value: Facebook.Yoga.YogaValue): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum YogaDimension {
      Width = 0,
      Height = 1,
    }
    export enum YogaDirection {
      Inherit = 0,
      LTR = 1,
      RTL = 2,
    }
    export enum YogaDisplay {
      Flex = 0,
      None = 1,
    }
    export enum YogaEdge {
      Left = 0,
      Top = 1,
      Right = 2,
      Bottom = 3,
      Start = 4,
      End = 5,
      Horizontal = 6,
      Vertical = 7,
      All = 8,
    }
    export enum YogaExperimentalFeature {
      WebFlexBasis = 0,
    }
    export enum YogaFlexDirection {
      Column = 0,
      ColumnReverse = 1,
      Row = 2,
      RowReverse = 3,
    }
    export enum YogaJustify {
      FlexStart = 0,
      Center = 1,
      FlexEnd = 2,
      SpaceBetween = 3,
      SpaceAround = 4,
      SpaceEvenly = 5,
    }
    export class YogaLogger {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Facebook.Yoga.YogaLogLevel, message: string): void;
      BeginInvoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Facebook.Yoga.YogaLogLevel, message: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export enum YogaLogLevel {
      Error = 0,
      Warn = 1,
      Info = 2,
      Debug = 3,
      Verbose = 4,
      Fatal = 5,
    }
    export class YogaMeasureFunc {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(unmanagedNodePtr: System.IntPtr, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode): Facebook.Yoga.YogaSize;
      BeginInvoke(unmanagedNodePtr: System.IntPtr, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode, callback: System.AsyncCallback, object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): Facebook.Yoga.YogaSize;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum YogaMeasureMode {
      Undefined = 0,
      Exactly = 1,
      AtMost = 2,
    }
    export class YogaNode {
      constructor(config?: Facebook.Yoga.YogaConfig);
      constructor(srcNode: Facebook.Yoga.YogaNode);
      [key: string]: any;
      IsDirty: boolean;
      HasNewLayout: boolean;
      Parent: Facebook.Yoga.YogaNode;
      IsMeasureDefined: boolean;
      IsBaselineDefined: boolean;
      StyleDirection: Facebook.Yoga.YogaDirection;
      FlexDirection: Facebook.Yoga.YogaFlexDirection;
      JustifyContent: Facebook.Yoga.YogaJustify;
      Display: Facebook.Yoga.YogaDisplay;
      AlignItems: Facebook.Yoga.YogaAlign;
      AlignSelf: Facebook.Yoga.YogaAlign;
      AlignContent: Facebook.Yoga.YogaAlign;
      PositionType: Facebook.Yoga.YogaPositionType;
      Wrap: Facebook.Yoga.YogaWrap;
      Flex: number;
      FlexGrow: number;
      FlexShrink: number;
      FlexBasis: Facebook.Yoga.YogaValue;
      Width: Facebook.Yoga.YogaValue;
      Height: Facebook.Yoga.YogaValue;
      MaxWidth: Facebook.Yoga.YogaValue;
      MaxHeight: Facebook.Yoga.YogaValue;
      MinWidth: Facebook.Yoga.YogaValue;
      MinHeight: Facebook.Yoga.YogaValue;
      AspectRatio: number;
      LayoutX: number;
      LayoutY: number;
      LayoutWidth: number;
      LayoutHeight: number;
      LayoutDirection: Facebook.Yoga.YogaDirection;
      Overflow: Facebook.Yoga.YogaOverflow;
      Data: any; // System.Object
      Count: number;
      Left: Facebook.Yoga.YogaValue;
      Top: Facebook.Yoga.YogaValue;
      Right: Facebook.Yoga.YogaValue;
      Bottom: Facebook.Yoga.YogaValue;
      Start: Facebook.Yoga.YogaValue;
      End: Facebook.Yoga.YogaValue;
      MarginLeft: Facebook.Yoga.YogaValue;
      MarginTop: Facebook.Yoga.YogaValue;
      MarginRight: Facebook.Yoga.YogaValue;
      MarginBottom: Facebook.Yoga.YogaValue;
      MarginStart: Facebook.Yoga.YogaValue;
      MarginEnd: Facebook.Yoga.YogaValue;
      MarginHorizontal: Facebook.Yoga.YogaValue;
      MarginVertical: Facebook.Yoga.YogaValue;
      Margin: Facebook.Yoga.YogaValue;
      PaddingLeft: Facebook.Yoga.YogaValue;
      PaddingTop: Facebook.Yoga.YogaValue;
      PaddingRight: Facebook.Yoga.YogaValue;
      PaddingBottom: Facebook.Yoga.YogaValue;
      PaddingStart: Facebook.Yoga.YogaValue;
      PaddingEnd: Facebook.Yoga.YogaValue;
      PaddingHorizontal: Facebook.Yoga.YogaValue;
      PaddingVertical: Facebook.Yoga.YogaValue;
      Padding: Facebook.Yoga.YogaValue;
      BorderLeftWidth: number;
      BorderTopWidth: number;
      BorderRightWidth: number;
      BorderBottomWidth: number;
      BorderStartWidth: number;
      BorderEndWidth: number;
      BorderWidth: number;
      LayoutMarginLeft: number;
      LayoutMarginTop: number;
      LayoutMarginRight: number;
      LayoutMarginBottom: number;
      LayoutMarginStart: number;
      LayoutMarginEnd: number;
      LayoutPaddingLeft: number;
      LayoutPaddingTop: number;
      LayoutPaddingRight: number;
      LayoutPaddingBottom: number;
      LayoutPaddingStart: number;
      LayoutPaddingEnd: number;
      Reset(): void;
      MarkDirty(): void;
      MarkHasNewLayout(): void;
      CopyStyle(srcNode: Facebook.Yoga.YogaNode): void;
      MarkLayoutSeen(): void;
      ValuesEqual(f1: number, f2: number): boolean;
      Insert(index: number, node: Facebook.Yoga.YogaNode): void;
      RemoveAt(index: number): void;
      AddChild(child: Facebook.Yoga.YogaNode): void;
      RemoveChild(child: Facebook.Yoga.YogaNode): void;
      Clear(): void;
      IndexOf(node: Facebook.Yoga.YogaNode): number;
      SetMeasureFunction(measureFunction: Facebook.Yoga.MeasureFunction): void;
      SetBaselineFunction(baselineFunction: Facebook.Yoga.BaselineFunction): void;
      CalculateLayout(width?: number, height?: number): void;
      Print(options?: Facebook.Yoga.YogaPrintOptions): string;
      GetEnumerator(): System.Collections.Generic.IEnumerator<Facebook.Yoga.YogaNode>;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum YogaNodeType {
      Default = 0,
      Text = 1,
    }
    export enum YogaOverflow {
      Visible = 0,
      Hidden = 1,
      Scroll = 2,
    }
    export enum YogaPositionType {
      Relative = 0,
      Absolute = 1,
    }
    export enum YogaPrintOptions {
      Layout = 1,
      Style = 2,
      Children = 4,
    }
    export class YogaSize {
      width: number;
      height: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum YogaUnit {
      Undefined = 0,
      Point = 1,
      Percent = 2,
      Auto = 3,
    }
    export class YogaValue {
      Unit: Facebook.Yoga.YogaUnit;
      Value: number;
      static Point(value: number): Facebook.Yoga.YogaValue;
      Equals(other: Facebook.Yoga.YogaValue): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      static Undefined(): Facebook.Yoga.YogaValue;
      static Auto(): Facebook.Yoga.YogaValue;
      static Percent(value: number): Facebook.Yoga.YogaValue;
      ToString(): string;
      GetType(): System.Type;
    }
    export class YogaValueExtensions {
      static Percent(value: number): Facebook.Yoga.YogaValue;
      static Pt(value: number): Facebook.Yoga.YogaValue;
      static Percent(value: number): Facebook.Yoga.YogaValue;
      static Pt(value: number): Facebook.Yoga.YogaValue;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum YogaWrap {
      NoWrap = 0,
      Wrap = 1,
      WrapReverse = 2,
    }
  }
}
export declare namespace ReactUnity {
  export class KeyframeList {
    constructor();
    Valid: boolean;
    From: ReactUnity.Keyframe;
    To: ReactUnity.Keyframe;
    Steps: ReactUnity.Keyframe[];
    Properties: System.Collections.Generic.HashSet<ReactUnity.Styling.IStyleProperty>;
    static Create(rule: any): ReactUnity.KeyframeList;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class Keyframe {
    constructor();
    Rules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>;
    Offset: number;
    Valid: boolean;
    static Create(rule: any): ReactUnity.Keyframe[];
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class BaseReactComponent<ContextType = any> {
    Context: ContextType;
    Parent: ReactUnity.IContainerComponent;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    Layout: Facebook.Yoga.YogaNode;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    StyleState: ReactUnity.Styling.StyleState;
    StateStyles: ReactUnity.Styling.StateStyles;
    Style: InlineStyleRemap;
    IsPseudoElement: boolean;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    Id: string;
    Name: string;
    IsContainer: boolean;
    Children: ReactUnity.IReactComponent[];
    BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    Update(): void;
    MarkForStyleResolving(recursive: boolean): void;
    DestroySelf(): void;
    Destroy(): void;
    SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    SetData(propertyName: string, value: any): void;
    SetProperty(propertyName: string, value: any): void;
    ResolveStyle(recursive?: boolean): void;
    ApplyStyles(): void;
    ApplyLayoutStyles(): void;
    Relayout(): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
    AddBefore(): void;
    RemoveBefore(): void;
    AddAfter(): void;
    RemoveAfter(): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export interface IReactComponent {
    Context: ReactUnity.ReactContext;
    Parent: ReactUnity.IContainerComponent;
    IsPseudoElement: boolean;
    Layout: Facebook.Yoga.YogaNode;
    StyleState: ReactUnity.Styling.StyleState;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    Style: ReactUnity.Styling.InlineStyles;
    Id: string;
    Name: string;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    DestroySelf(): void;
    Destroy(): void;
    ApplyLayoutStyles(): void;
    ResolveStyle(recursive?: boolean): void;
    Relayout(): void;
    Update(): void;
    Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
    SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetProperty(property: string, value: any): void;
    SetData(property: string, value: any): void;
    SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    MarkForStyleResolving(recursive: boolean): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
  }
  export interface IContainerComponent extends ReactUnity.IReactComponent {
    Children: ReactUnity.IReactComponent[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
  }
  export interface ITextComponent extends ReactUnity.IReactComponent {
    Content: string;
    SetText(text: string): void;
  }
  export interface IHostComponent extends ReactUnity.IReactComponent, ReactUnity.IContainerComponent {
    Width: number;
    Height: number;
  }
  export interface IShadowComponent {
    ShadowParent: ReactUnity.IReactComponent;
  }
  export interface IActivatableComponent {
    Disabled: boolean;
    Activate(): void;
  }
  export interface IToggleComponent {
    Checked: boolean;
    Indeterminate: boolean;
  }
  export interface IInputComponent {
    Value: string;
    ReadOnly: boolean;
    PlaceholderShown: boolean;
  }
  export interface IStateHandler {
    ClearListeners(): void;
  }
  export class ReactContext {
    constructor(globals: ReactUnity.Helpers.GlobalRecord, script: ReactUnity.ScriptSource, dispatcher: ReactUnity.Scheduling.IDispatcher, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, isDevServer: boolean, onRestart: (() => void), calculatesLayout: boolean);
    CalculatesLayout: boolean;
    Host: ReactUnity.IHostComponent;
    Globals: ReactUnity.Helpers.GlobalRecord;
    IsDevServer: boolean;
    Script: ReactUnity.ScriptSource;
    Timer: ReactUnity.Scheduling.ITimer;
    Dispatcher: ReactUnity.Scheduling.IDispatcher;
    StateHandlers: Record<string, System.Type>;
    Location: ReactUnity.DomProxies.Location;
    MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
    CursorSet: ReactUnity.Styling.CursorSet;
    CursorAPI: ReactUnity.Helpers.CursorAPI;
    OnRestart: (() => void);
    Parser: any; // ExCSS.StylesheetParser
    Style: ReactUnity.StyleEngine.StyleContext;
    Disposables: System.IDisposable[];
    InsertStyle(style: string, importanceOffset?: number): ReactUnity.StyleEngine.StyleSheet;
    InsertStyle(sheet: ReactUnity.StyleEngine.StyleSheet): ReactUnity.StyleEngine.StyleSheet;
    RemoveStyle(sheet: ReactUnity.StyleEngine.StyleSheet): void;
    ResolvePath(path: string): string;
    CreateStaticScript(path: string): ReactUnity.ScriptSource;
    CreateText(text: string): ReactUnity.ITextComponent;
    CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
    CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
    PlayAudio(clip: UnityEngine.AudioClip): void;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ReactUnityBase {
    MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
    Context: ReactUnity.ReactContext;
    dispatcher: ReactUnity.Scheduling.IDispatcher;
    timer: ReactUnity.Scheduling.ITimer;
    runner: ReactUnity.ReactUnityRunner;
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
    Script: ReactUnity.ScriptSource;
    Debug: boolean;
    AwaitDebugger: boolean;
    EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
    Globals: ReactUnity.Helpers.SerializableDictionary;
    AutoRender: boolean;
    BeforeStart: ReactUnity.ReactUnityBase_ReactUnityRunnerEvent;
    AfterStart: ReactUnity.ReactUnityBase_ReactUnityRunnerEvent;
    Render(): void;
    IsInvoking(): boolean;
    CancelInvoke(): void;
    Invoke(methodName: string, time: number): void;
    InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
    CancelInvoke(methodName: string): void;
    IsInvoking(methodName: string): boolean;
    StartCoroutine(methodName: string): UnityEngine.Coroutine;
    StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
    StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
    StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
    StopCoroutine(routine: System.Collections.IEnumerator): void;
    StopCoroutine(routine: UnityEngine.Coroutine): void;
    StopCoroutine(methodName: string): void;
    StopAllCoroutines(): void;
    GetComponent(type: System.Type): UnityEngine.Component;
    GetComponent(type: string): UnityEngine.Component;
    GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
    GetComponentInChildren(t: System.Type): UnityEngine.Component;
    GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
    GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
    GetComponentInParent(t: System.Type): UnityEngine.Component;
    GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
    GetComponentsInParent(t: System.Type): UnityEngine.Component[];
    GetComponents(type: System.Type): UnityEngine.Component[];
    GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
    CompareTag(tag: string): boolean;
    SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
    SendMessageUpwards(methodName: string, value: any): void;
    SendMessageUpwards(methodName: string): void;
    SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
    SendMessage(methodName: string, value: any): void;
    SendMessage(methodName: string): void;
    SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
    SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
    BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
    BroadcastMessage(methodName: string, parameter: any): void;
    BroadcastMessage(methodName: string): void;
    BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
    GetInstanceID(): number;
    GetHashCode(): number;
    Equals(other: any): boolean;
    ToString(): string;
    GetType(): System.Type;
  }
  export class ReactUnityBridge {
    static Instance: ReactUnity.ReactUnityBridge;
    createText(text: string, host: ReactUnity.IHostComponent): ReactUnity.ITextComponent;
    createElement(tag: string, text: string, host: ReactUnity.IHostComponent): ReactUnity.IReactComponent;
    appendChild(parent: any, child: any): void;
    appendChildToContainer(parent: any, child: any): void;
    insertBefore(parent: any, child: any, beforeChild: any): void;
    removeChild(parent: any, child: any): void;
    setText(instance: any, text: string): void;
    setProperty(element: any, property: string, value: any): void;
    setData(element: any, property: string, value: any): void;
    setEventListener(element: any, eventType: string, value: any): void;
    addEventListener(element: any, eventType: string, value: any): (() => void);
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ReactUnityRunner {
    constructor();
    engineFactory: ReactUnity.ScriptEngine.IJavaScriptEngineFactory;
    engine: ReactUnity.ScriptEngine.IJavaScriptEngine;
    context: ReactUnity.ReactContext;
    interop: ReactUnity.Helpers.ReactInterop;
    RunScript(script: string, ctx: ReactUnity.ReactContext, engineType: ReactUnity.ScriptEngine.JavascriptEngineType, debug: boolean, awaitDebugger: boolean, beforeStart?: UnityEngine.Events.UnityEvent<ReactUnity.ReactUnityRunner>, afterStart?: UnityEngine.Events.UnityEvent<ReactUnity.ReactUnityRunner>): void;
    ExecuteScript(code: string, fileName?: string): void;
    Dispose(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ScriptSource {
    constructor();
    DevServerFile: string;
    FileName: string;
    IsDevServer: boolean;
    EffectiveScriptSource: ReactUnity.ScriptSourceType;
    Type: ReactUnity.ScriptSourceType;
    SourceAsset: UnityEngine.TextAsset;
    SourcePath: string;
    SourceText: string;
    ResourcesPath: string;
    UseDevServer: boolean;
    DevServer: string;
    static Resource(path: string): ReactUnity.ScriptSource;
    static Text(path: string): ReactUnity.ScriptSource;
    GetResolvedSourceUrl(useDevServer?: boolean): string;
    GetScript(callback: ((arg0: string, arg1: boolean) => void), dispatcher?: ReactUnity.Scheduling.IDispatcher, useDevServer?: boolean, disableWarnings?: boolean): System.IDisposable;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum ScriptSourceType {
    TextAsset = 0,
    File = 1,
    Url = 2,
    Resource = 3,
    Raw = 4,
  }
  export class StyleComponent {
    constructor(ctx: ReactUnity.ReactContext, tag?: string, text?: string);
    Scope: any; // System.Object
    Importance: number;
    Active: boolean;
    Sheet: ReactUnity.StyleEngine.StyleSheet;
    Content: string;
    Name: string;
    Context: ReactUnity.ReactContext;
    Parent: ReactUnity.IContainerComponent;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    Layout: Facebook.Yoga.YogaNode;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    StyleState: ReactUnity.Styling.StyleState;
    StateStyles: ReactUnity.Styling.StateStyles;
    Style: InlineStyleRemap;
    IsPseudoElement: boolean;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    Id: string;
    IsContainer: boolean;
    Children: ReactUnity.IReactComponent[];
    BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    SetText(text: string): void;
    GetScopeElement(): ReactUnity.IReactComponent;
    Refresh(): void;
    SetProperty(propertyName: string, value: any): void;
    Update(): void;
    SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    AddComponent(type: System.Type): any;
    GetComponent(type: System.Type): any;
    Relayout(): void;
    MarkForStyleResolving(recursive: boolean): void;
    DestroySelf(): void;
    Destroy(): void;
    SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    SetData(propertyName: string, value: any): void;
    ResolveStyle(recursive?: boolean): void;
    ApplyStyles(): void;
    ApplyLayoutStyles(): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
    AddBefore(): void;
    RemoveBefore(): void;
    AddAfter(): void;
    RemoveAfter(): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum ReactContext_LayoutMergeMode {
    Both = 0,
    LayoutOnly = 1,
    CssOnly = 2,
  }
  export class ReactUnityBase_ReactUnityRunnerEvent {
    constructor();
    AddListener(call: UnityEngine.Events.UnityAction<ReactUnity.ReactUnityRunner>): void;
    RemoveListener(call: UnityEngine.Events.UnityAction<ReactUnity.ReactUnityRunner>): void;
    Invoke(arg0: ReactUnity.ReactUnityRunner): void;
    GetPersistentEventCount(): number;
    GetPersistentTarget(index: number): UnityEngine.Object;
    GetPersistentMethodName(index: number): string;
    SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
    RemoveAllListeners(): void;
    ToString(): string;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
  }
  export namespace Animations {
    export class AnimationEvent {
      constructor();
      Animation: ReactUnity.Animations.Animation;
      Keyframes: ReactUnity.KeyframeList;
      ElapsedTime: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TransitionEvent {
      constructor();
      Transition: ReactUnity.Animations.Transition;
      PropertyName: string;
      ElapsedTime: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimationList {
      constructor(definition: string);
      constructor(item: ReactUnity.Animations.Animation);
      constructor(items: ReactUnity.Animations.Animation[]);
      Definition: string;
      Items: ReactUnity.Animations.Animation[];
      Any: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Animation {
      constructor(definition: string);
      Definition: string;
      Delay: number;
      Duration: number;
      IterationCount: number;
      Name: string;
      TimingFunction: ReactUnity.Animations.TimingFunction;
      Valid: boolean;
      FillMode: ReactUnity.Animations.AnimationFillMode;
      Direction: ReactUnity.Animations.AnimationDirection;
      PlayState: ReactUnity.Animations.AnimationPlayState;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum AnimationFillMode {
      None = 0,
      Forwards = 1,
      Backwards = 2,
      Both = 3,
    }
    export enum AnimationDirection {
      Normal = 0,
      Reverse = 1,
      Alternate = 2,
      AlternateReverse = 3,
    }
    export enum AnimationPlayState {
      Running = 0,
      Paused = 1,
    }
    export class AudioList {
      constructor(definition: string);
      constructor(item: ReactUnity.Animations.AudioListPart);
      constructor(items: ReactUnity.Animations.AudioListPart[]);
      Definition: string;
      Items: ReactUnity.Animations.AudioListPart[];
      Any: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AudioListPart {
      constructor(definition: string);
      Definition: string;
      AudioClip: ReactUnity.Types.AudioReference;
      IterationCount: number;
      Delay: number;
      Local: boolean;
      Valid: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Interpolater {
      static Interpolate(t: number, mirror?: boolean): number;
      static Interpolate(from: number, to: number, t: number): number;
      static Interpolate(from: number, to: number, t: number): number;
      static Interpolate(from: UnityEngine.Color, to: UnityEngine.Color, t: number): UnityEngine.Color;
      static Interpolate(from: UnityEngine.Vector2, to: UnityEngine.Vector2, t: number): UnityEngine.Vector2;
      static Interpolate(from: UnityEngine.Vector3, to: UnityEngine.Vector3, t: number): UnityEngine.Vector3;
      static Interpolate(from: UnityEngine.Vector4, to: UnityEngine.Vector4, t: number): UnityEngine.Vector4;
      static Interpolate(from: UnityEngine.Quaternion, to: UnityEngine.Quaternion, t: number): UnityEngine.Quaternion;
      static Interpolate(from: Facebook.Yoga.YogaValue, to: Facebook.Yoga.YogaValue, t: number): Facebook.Yoga.YogaValue;
      static Interpolate(from: ReactUnity.Types.YogaValue2, to: ReactUnity.Types.YogaValue2, t: number): ReactUnity.Types.YogaValue2;
      static Interpolate(from: ReactUnity.Types.BoxShadow, to: ReactUnity.Types.BoxShadow, t: number): ReactUnity.Types.BoxShadow;
      static Interpolate(from: ReactUnity.Types.BoxShadowList, to: ReactUnity.Types.BoxShadowList, t: number): ReactUnity.Types.BoxShadowList;
      static Interpolate(t: number, easeType: ReactUnity.Animations.TimingFunctionType, mirror?: boolean): number;
      static Interpolate(from: number, to: number, t: number, easeType: ReactUnity.Animations.TimingFunctionType): number;
      static Interpolate(from: UnityEngine.Color, to: UnityEngine.Color, t: number, easeType: ReactUnity.Animations.TimingFunctionType): UnityEngine.Color;
      static Interpolate(from: UnityEngine.Vector2, to: UnityEngine.Vector2, t: number, easeType: ReactUnity.Animations.TimingFunctionType): UnityEngine.Vector2;
      static Interpolate(from: UnityEngine.Vector3, to: UnityEngine.Vector3, t: number, easeType: ReactUnity.Animations.TimingFunctionType): UnityEngine.Vector3;
      static Interpolate(from: UnityEngine.Vector4, to: UnityEngine.Vector4, t: number, easeType: ReactUnity.Animations.TimingFunctionType): UnityEngine.Vector4;
      static Interpolate(from: UnityEngine.Quaternion, to: UnityEngine.Quaternion, t: number, easeType: ReactUnity.Animations.TimingFunctionType): UnityEngine.Quaternion;
      static Interpolate(t: number, timingFunction: ReactUnity.Animations.TimingFunction, mirror?: boolean): number;
      static Interpolate(from: number, to: number, t: number, timingFunction: ReactUnity.Animations.TimingFunction): number;
      static Interpolate(from: UnityEngine.Color, to: UnityEngine.Color, t: number, timingFunction: ReactUnity.Animations.TimingFunction): UnityEngine.Color;
      static Interpolate(from: UnityEngine.Vector2, to: UnityEngine.Vector2, t: number, timingFunction: ReactUnity.Animations.TimingFunction): UnityEngine.Vector2;
      static Interpolate(from: UnityEngine.Vector3, to: UnityEngine.Vector3, t: number, timingFunction: ReactUnity.Animations.TimingFunction): UnityEngine.Vector3;
      static Interpolate(from: UnityEngine.Vector4, to: UnityEngine.Vector4, t: number, timingFunction: ReactUnity.Animations.TimingFunction): UnityEngine.Vector4;
      static Interpolate(from: UnityEngine.Quaternion, to: UnityEngine.Quaternion, t: number, timingFunction: ReactUnity.Animations.TimingFunction): UnityEngine.Quaternion;
      static Interpolate(from: any, to: any, t: number): any;
      static Interpolate(from: any, to: any, t: number, type: System.Type): any;
      static Interpolate(from: any, to: any, t: number, timingFunction: ReactUnity.Animations.TimingFunction): any;
      static Interpolate(from: any, to: any, t: number, timingFunction: ReactUnity.Animations.TimingFunction, type: System.Type): any;
      static Interpolate(from: any, to: any, t: number, timingFunctionType: ReactUnity.Animations.TimingFunctionType): any;
      static Interpolate(from: any, to: any, t: number, timingFunctionType: ReactUnity.Animations.TimingFunctionType, type: System.Type): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TimingFunction {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(value: number, start?: number, end?: number): number;
      BeginInvoke(value: number, start: number, end: number, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class TimingFunctions {
      static Ease: ReactUnity.Animations.TimingFunction;
      static EaseIn: ReactUnity.Animations.TimingFunction;
      static EaseOut: ReactUnity.Animations.TimingFunction;
      static EaseInOut: ReactUnity.Animations.TimingFunction;
      static StepStart: ReactUnity.Animations.TimingFunction;
      static StepEnd: ReactUnity.Animations.TimingFunction;
      static Linear(t: number, start?: number, end?: number): number;
      static Steps(count: number, mode?: ReactUnity.Animations.StepsJumpMode): ReactUnity.Animations.TimingFunction;
      static Get(easeType: ReactUnity.Animations.TimingFunctionType): ReactUnity.Animations.TimingFunction;
      static Get(easeType: string): ReactUnity.Animations.TimingFunction;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum TimingFunctionType {
      Ease = 0,
      Linear = 1,
      EaseIn = 2,
      EaseOut = 3,
      EaseInOut = 4,
      StepStart = 5,
      StepEnd = 6,
    }
    export enum StepsJumpMode {
      End = 0,
      JumpEnd = 0,
      Start = 1,
      JumpStart = 1,
      None = 2,
      JumpNone = 2,
      Both = 3,
      JumpBoth = 3,
    }
    export class TransitionList {
      constructor(definition: string);
      constructor(item: ReactUnity.Animations.Transition);
      constructor(items: ReactUnity.Animations.Transition[]);
      Definition: string;
      Items: ReactUnity.Animations.Transition[];
      Any: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Transition {
      constructor(definition: string);
      Definition: string;
      Delay: number;
      Duration: number;
      Property: string;
      PlayState: ReactUnity.Animations.AnimationPlayState;
      TimingFunction: ReactUnity.Animations.TimingFunction;
      Valid: boolean;
      All: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AnimationList_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AudioList_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TimingFunctions_CubicBezier {
      static Linear(value: number, start?: number, end?: number): number;
      static Create(mX1: number, mY1: number, mX2: number, mY2: number): ReactUnity.Animations.TimingFunction;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TimingFunctions_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TransitionList_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Converters {
    export class AllConverters {
      constructor();
      static DefaultConverter: ReactUnity.Converters.IStyleConverter;
      static StringConverter: ReactUnity.Converters.IStyleConverter;
      static FloatConverter: ReactUnity.Converters.IStyleConverter;
      static AngleConverter: ReactUnity.Converters.IStyleConverter;
      static LengthConverter: ReactUnity.Converters.IStyleConverter;
      static DurationConverter: ReactUnity.Converters.IStyleConverter;
      static PercentageConverter: ReactUnity.Converters.IStyleConverter;
      static ColorValueConverter: ReactUnity.Converters.IStyleConverter;
      static UrlConverter: ReactUnity.Converters.IStyleConverter;
      static GeneralConverter: ReactUnity.Converters.IStyleConverter;
      static YogaValueConverter: ReactUnity.Converters.IStyleConverter;
      static YogaValue2Converter: ReactUnity.Converters.IStyleConverter;
      static Vector2Converter: ReactUnity.Converters.IStyleConverter;
      static Vector3Converter: ReactUnity.Converters.IStyleConverter;
      static IntConverter: ReactUnity.Converters.IStyleConverter;
      static BoolConverter: ReactUnity.Converters.IStyleConverter;
      static ColorConverter: ReactUnity.Converters.IStyleConverter;
      static ImageReferenceConverter: ReactUnity.Converters.IStyleConverter;
      static AudioReferenceConverter: ReactUnity.Converters.IStyleConverter;
      static VideoReferenceConverter: ReactUnity.Converters.IStyleConverter;
      static FontReferenceConverter: ReactUnity.Converters.IStyleConverter;
      static RotateConverter: ReactUnity.Converters.IStyleConverter;
      static TransitionListConverter: ReactUnity.Converters.IStyleConverter;
      static AnimationListConverter: ReactUnity.Converters.IStyleConverter;
      static AudioListConverter: ReactUnity.Converters.IStyleConverter;
      static CursorListConverter: ReactUnity.Converters.IStyleConverter;
      static BoxShadowListConverter: ReactUnity.Converters.IStyleConverter;
      static TimingFunctionConverter: ReactUnity.Converters.IStyleConverter;
      static Get(type: System.Type): ReactUnity.Converters.IStyleConverter;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BoolConverter {
      constructor(truthyValues: string[], falsyValues: string[]);
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ColorConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EnumConverter<T = any> {
      constructor(keywordOnly: boolean);
      constructor(allowFlags: boolean, keywordOnly: boolean);
      AllowFlags: boolean;
      KeywordOnly: boolean;
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FloatConverter {
      constructor();
      constructor(suffixMap: Record<string, number>, suffixMapper?: Record<string, ((arg0: number) => any)>, allowSuffixless?: boolean);
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PercentageConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ColorValueConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class LengthConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AngleConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DurationConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class GeneralConverter {
      constructor(baseConverter?: ReactUnity.Converters.IStyleConverter);
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class IntConverter {
      constructor();
      FloatParser: ReactUnity.Converters.FloatConverter;
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IStyleParser {
      FromString(value: string): any;
    }
    export interface IStyleConverter {
      Convert(value: any): any;
    }
    export class StringConverter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UrlConverter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Vector2Converter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Vector3Converter {
      constructor(singleValueMode?: ((arg0: number) => UnityEngine.Vector3), floatParser?: ReactUnity.Converters.IStyleConverter);
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class YogaValueConverter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace DomProxies {
    export class ConsoleProxy {
      constructor(ctx: ReactUnity.ReactContext);
      log(msg: any): void;
      log(msg: any, ...subs: any[]): void;
      info(msg: any): void;
      info(msg: any, ...subs: any[]): void;
      debug(msg: any): void;
      debug(msg: any, ...subs: any[]): void;
      warn(msg: any): void;
      warn(msg: any, ...subs: any[]): void;
      error(msg: any): void;
      error(msg: any, ...subs: any[]): void;
      dir(msg: any): void;
      dir(msg: any, ...subs: any[]): void;
      clear(): void;
      assert(val: boolean): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DocumentProxy {
      constructor(context: ReactUnity.ReactContext, execute: ((arg0: string, arg1: string) => void), origin: string);
      head: ReactUnity.DomProxies.HeadProxy;
      origin: string;
      execute: ((arg0: string, arg1: string) => void);
      context: ReactUnity.ReactContext;
      createElement(type: string): ReactUnity.DomProxies.IDomElementProxy;
      createTextNode(text: string): string;
      querySelector(query: string): any;
      querySelectorAll(query: string): any;
      getElementById(query: string): any;
      getElementsByTagName(tagName: string): ReactUnity.DomProxies.IDomElementProxy[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IDomElementProxy {
      OnAppend(): void;
      OnRemove(): void;
      setAttribute(key: any, value: any): void;
      removeAttribute(key: any): void;
      appendChild(text: string): void;
      removeChild(text: string): void;
    }
    export class DomElementProxyBase {
      nodeType: number;
      nextSibling: any; // System.Object
      setAttribute(key: any, value: any): void;
      removeAttribute(key: any): void;
      hasAttribute(key: any): boolean;
      getAttribute(key: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HeadProxy {
      constructor();
      nodeType: number;
      nextSibling: any; // System.Object
      appendChild(child: ReactUnity.DomProxies.IDomElementProxy): void;
      removeChild(child: ReactUnity.DomProxies.IDomElementProxy): void;
      insertBefore(child: ReactUnity.DomProxies.IDomElementProxy, before: any): void;
      setAttribute(key: any, value: any): void;
      removeAttribute(key: any): void;
      hasAttribute(key: any): boolean;
      getAttribute(key: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScriptProxy {
      constructor(document: ReactUnity.DomProxies.DocumentProxy);
      src: string;
      charset: string;
      crossOrigin: string;
      timeout: number;
      Onload: any; // Jint.Native.JsValue
      onload: any; // System.Object
      Onerror: any; // Jint.Native.JsValue
      onerror: any; // System.Object
      nodeType: number;
      nextSibling: any; // System.Object
      document: ReactUnity.DomProxies.DocumentProxy;
      parentNode: ReactUnity.DomProxies.HeadProxy;
      OnAppend(): void;
      OnRemove(): void;
      appendChild(text: string): void;
      removeChild(text: string): void;
      setAttribute(key: any, value: any): void;
      removeAttribute(key: any): void;
      hasAttribute(key: any): boolean;
      getAttribute(key: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleProxy {
      constructor(document: ReactUnity.DomProxies.DocumentProxy);
      firstChild: string;
      nodeType: number;
      nextSibling: any; // System.Object
      childNodes: string[];
      Sheets: Record<string, ReactUnity.StyleEngine.StyleSheet>;
      enabled: boolean;
      document: ReactUnity.DomProxies.DocumentProxy;
      parentNode: ReactUnity.DomProxies.HeadProxy;
      OnAppend(): void;
      OnRemove(): void;
      appendChild(text: string): void;
      removeChild(text: string): void;
      setAttribute(key: any, value: any): void;
      removeAttribute(key: any): void;
      hasAttribute(key: any): boolean;
      getAttribute(key: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class LocalStorage {
      constructor();
      static LocalStoragePrefix: string;
      setItem(x: string, value: string): void;
      getItem(x: string): string;
      removeItem(x: string): void;
      static ClearLocalStorage(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Location {
      constructor(href: string, ctx?: ReactUnity.ReactContext);
      constructor(ctx: ReactUnity.ReactContext);
      href: string;
      protocol: string;
      hostname: string;
      origin: string;
      host: string;
      port: string;
      search: string;
      hash: string;
      pathname: string;
      reload(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WebSocketOpenEventHandler {
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
    export class WebSocketMessageEventHandler {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(data: System.Byte[]): void;
      BeginInvoke(data: System.Byte[], callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class WebSocketErrorEventHandler {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(errorMsg: string): void;
      BeginInvoke(errorMsg: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export class WebSocketCloseEventHandler {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(closeCode: ReactUnity.DomProxies.WebSocketCloseCode, reason: string): void;
      BeginInvoke(closeCode: ReactUnity.DomProxies.WebSocketCloseCode, reason: string, callback: System.AsyncCallback, object: any): System.IAsyncResult;
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
    export enum WebSocketState {
      Connecting = 0,
      Open = 1,
      Closing = 2,
      Closed = 3,
    }
    export enum WebSocketCloseCode {
      NotSet = 0,
      Normal = 1000,
      Away = 1001,
      ProtocolError = 1002,
      UnsupportedData = 1003,
      Undefined = 1004,
      NoStatus = 1005,
      Abnormal = 1006,
      InvalidData = 1007,
      PolicyViolation = 1008,
      TooBig = 1009,
      MandatoryExtension = 1010,
      ServerError = 1011,
      TlsHandshakeFailure = 1015,
    }
    export interface IWebSocket {
      Connect(): void;
      Close(code?: ReactUnity.DomProxies.WebSocketCloseCode, reason?: string): void;
      Send(data: System.Byte[]): void;
      GetState(): ReactUnity.DomProxies.WebSocketState;
    }
    export class WebSocketHelpers {
      static ParseCloseCodeEnum(closeCode: number): ReactUnity.DomProxies.WebSocketCloseCode;
      static GetErrorMessageFromCode(errorCode: number, inner: System.Exception): ReactUnity.DomProxies.WebSocketException;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WebSocketException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
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
    export class WebSocketUnexpectedException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
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
    export class WebSocketInvalidArgumentException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
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
    export class WebSocketInvalidStateException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
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
    export class WebSocket {
      constructor(url: string);
      Connect(): void;
      Close(code?: ReactUnity.DomProxies.WebSocketCloseCode, reason?: string): void;
      Send(data: System.Byte[]): void;
      GetState(): ReactUnity.DomProxies.WebSocketState;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WebSocketFactory {
      static CreateInstance(url: string): ReactUnity.DomProxies.WebSocket;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WebSocketProxy {
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
      socket: ReactUnity.DomProxies.WebSocket;
      static CONNECTING: number;
      static OPEN: number;
      static CLOSING: number;
      static CLOSED: number;
      binaryType: string;
      close(code?: number, reason?: string): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class XMLHttpRequest {
      constructor(context: ReactUnity.ReactContext);
      constructor(context: ReactUnity.ReactContext, origin: string);
      origin: string;
      onload: any; // System.Object
      onerror: any; // System.Object
      onreadystatechange: any; // System.Object
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
      response: string;
      responseURL: string;
      static dispatches: string[];
      open(method: string, url: string, async: boolean): void;
      setRequestHeader(name: any, value: any): void;
      append(name: any, value: any): void;
      abort(): void;
      send(o: any): void;
      getAllResponseHeaders(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Editor {
    export class ReactElementDrawer {
      constructor();
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: any; // UnityEditor.SerializedObject
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
    export class ScriptSourceDrawer {
      constructor();
      attribute: any; // UnityEngine.PropertyAttribute
      fieldInfo: System.Reflection.FieldInfo;
      OnGUI(position: UnityEngine.Rect, property: any, label: UnityEngine.GUIContent): void;
      GetPropertyHeight(property: any, label: UnityEngine.GUIContent): number;
      CreatePropertyGUI(property: any): UnityEngine.UIElements.VisualElement;
      CanCacheInspectorGUI(property: any): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StringObjectPairDrawer {
      constructor();
      attribute: any; // UnityEngine.PropertyAttribute
      fieldInfo: System.Reflection.FieldInfo;
      OnGUI(position: UnityEngine.Rect, property: any, label: UnityEngine.GUIContent): void;
      GetPropertyHeight(property: any, label: UnityEngine.GUIContent): number;
      CreatePropertyGUI(property: any): UnityEngine.UIElements.VisualElement;
      CanCacheInspectorGUI(property: any): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickStartWindow {
      constructor();
      NodeVersion: number;
      runner: ReactUnity.ReactUnityRunner;
      context: ReactUnity.ReactContext;
      dispatcher: ReactUnity.Scheduling.IDispatcher;
      mediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      hostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
      DebugEnabled: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
      Timer: ReactUnity.Scheduling.ITimer;
      AutoRun: boolean;
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
      static PackageName: string;
      RequiredNodeVersion: number;
      NodeUrl: string;
      ProjectDirName: string;
      PackageVersion: string;
      LatestVersion: string;
      HasUpdate: boolean;
      static ShowDefaultWindow(): void;
      GetProjectPath(): string;
      CreateProject(): void;
      GetNodeVersion(callback?: ((arg0: number) => void)): void;
      GetNodeVersion(callback: any): void;
      RunCommand(target: string, args: string, hasOutput?: boolean): System.Diagnostics.Process;
      CanvasExistsInScene(): boolean;
      CreateCanvas(): void;
      SelectCanvas(): void;
      CheckVersion(callback: (() => void)): void;
      CheckVersion(callback: any): void;
      UpdatePackage(version: string): void;
      Run(root?: UnityEngine.UIElements.VisualElement): void;
      Restart(root?: UnityEngine.UIElements.VisualElement): void;
      AddSelectionChange(cb: any): (() => void);
      AddSelectionChange(cb: any): (() => void);
      AddPlayModeStateChange(cb: any): (() => void);
      AddPlayModeStateChange(cb: any): (() => void);
      AddVisibilityChange(cb: any): (() => void);
      AddVisibilityChange(cb: any): (() => void);
      AddItemsToMenu(menu: any): void;
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
    export class ReactElementInspector {
      constructor();
      target: UnityEngine.Object;
      targets: UnityEngine.Object[];
      serializedObject: any; // UnityEditor.SerializedObject
      name: string;
      hideFlags: UnityEngine.HideFlags;
      CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
      DrawDefaultInspector(): boolean;
      Repaint(): void;
      OnInspectorGUI(): void;
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
    export class StyleEditorWindow {
      constructor();
      runner: ReactUnity.ReactUnityRunner;
      context: ReactUnity.ReactContext;
      dispatcher: ReactUnity.Scheduling.IDispatcher;
      mediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      hostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
      DebugEnabled: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
      Timer: ReactUnity.Scheduling.ITimer;
      AutoRun: boolean;
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
      static ShowDefaultWindow(): void;
      GetResolvedStyles(component: ReactUnity.IReactComponent): any;
      CreateStyleDictionary(): Record<string, any>;
      Run(root?: UnityEngine.UIElements.VisualElement): void;
      Restart(root?: UnityEngine.UIElements.VisualElement): void;
      AddSelectionChange(cb: any): (() => void);
      AddSelectionChange(cb: any): (() => void);
      AddPlayModeStateChange(cb: any): (() => void);
      AddPlayModeStateChange(cb: any): (() => void);
      AddVisibilityChange(cb: any): (() => void);
      AddVisibilityChange(cb: any): (() => void);
      AddItemsToMenu(menu: any): void;
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
    export class ReactUnityBuildPreprocessor {
      constructor();
      callbackOrder: number;
      OnPostprocessBuild(report: any): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorTimer {
      static Instance: ReactUnity.Editor.EditorTimer;
      AnimationTime: number;
      TimeScale: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Developer {
      export class TypescriptModelsGenerator {
        constructor(assemblies: System.Reflection.Assembly[], include: string[], exclude: string[], importCS: Record<string, string>, excludeTypes: string[], exportAsClass?: boolean, generateGenericClasses?: boolean, allowIndexer?: boolean);
        static GenerateUnity(): void;
        static GenerateEditor(): void;
        static GenerateReactUnity(): void;
        static GenerateSystem(): void;
        static GenerateCurrentProject(): void;
        static GenerateWith(assemblies: System.Reflection.Assembly[], include: string[], exclude: string[], importCS: any, excludeTypes: string[], exportAsClass?: boolean, generateGenericClasses?: boolean, allowIndexer?: boolean): void;
        Generate(): void;
        GetTypescript(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Renderer {
      export class EditorContext {
        constructor(hostElement: UnityEngine.UIElements.VisualElement, globals: ReactUnity.Helpers.GlobalRecord, script: ReactUnity.ScriptSource, dispatcher: ReactUnity.Scheduling.IDispatcher, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, isDevServer: boolean, onRestart?: (() => void));
        StateHandlers: Record<string, System.Type>;
        CalculatesLayout: boolean;
        Host: ReactUnity.IHostComponent;
        Globals: ReactUnity.Helpers.GlobalRecord;
        IsDevServer: boolean;
        Script: ReactUnity.ScriptSource;
        Timer: ReactUnity.Scheduling.ITimer;
        Dispatcher: ReactUnity.Scheduling.IDispatcher;
        Location: ReactUnity.DomProxies.Location;
        MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
        CursorSet: ReactUnity.Styling.CursorSet;
        CursorAPI: ReactUnity.Helpers.CursorAPI;
        static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.Editor.Renderer.EditorContext,ReactUnity.UIToolkit.IUIToolkitComponent`1[UnityEngine.UIElements.VisualElement]]]
        OnRestart: (() => void);
        Parser: any; // ExCSS.StylesheetParser
        Style: ReactUnity.StyleEngine.StyleContext;
        Disposables: System.IDisposable[];
        CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
        PlayAudio(clip: UnityEngine.AudioClip): void;
        CreateText(text: string): ReactUnity.ITextComponent;
        CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
        InsertStyle(style: string, importanceOffset?: number): ReactUnity.StyleEngine.StyleSheet;
        InsertStyle(sheet: ReactUnity.StyleEngine.StyleSheet): ReactUnity.StyleEngine.StyleSheet;
        RemoveStyle(sheet: ReactUnity.StyleEngine.StyleSheet): void;
        ResolvePath(path: string): string;
        CreateStaticScript(path: string): ReactUnity.ScriptSource;
        Dispose(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class EditorSFX {
        static PlayClip(clip: UnityEngine.AudioClip, startSample?: number, loop?: boolean): void;
        static StopAllClips(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ReactEditorTester {
        constructor();
        runner: ReactUnity.ReactUnityRunner;
        context: ReactUnity.ReactContext;
        dispatcher: ReactUnity.Scheduling.IDispatcher;
        mediaProvider: ReactUnity.StyleEngine.IMediaProvider;
        hostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
        DebugEnabled: boolean;
        AwaitDebugger: boolean;
        EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
        Timer: ReactUnity.Scheduling.ITimer;
        AutoRun: boolean;
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
        static ShowDefaultWindow(): void;
        Run(root?: UnityEngine.UIElements.VisualElement): void;
        Restart(root?: UnityEngine.UIElements.VisualElement): void;
        AddSelectionChange(cb: any): (() => void);
        AddSelectionChange(cb: any): (() => void);
        AddPlayModeStateChange(cb: any): (() => void);
        AddPlayModeStateChange(cb: any): (() => void);
        AddVisibilityChange(cb: any): (() => void);
        AddVisibilityChange(cb: any): (() => void);
        AddItemsToMenu(menu: any): void;
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
      export class ReactInspector {
        target: UnityEngine.Object;
        targets: UnityEngine.Object[];
        serializedObject: any; // UnityEditor.SerializedObject
        name: string;
        hideFlags: UnityEngine.HideFlags;
        CreateInspectorGUI(): UnityEngine.UIElements.VisualElement;
        DrawDefaultInspector(): boolean;
        Repaint(): void;
        OnInspectorGUI(): void;
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
      export class ReactProperty {
        attribute: any; // UnityEngine.PropertyAttribute
        fieldInfo: System.Reflection.FieldInfo;
        CreatePropertyGUI(property: any): UnityEngine.UIElements.VisualElement;
        OnGUI(position: UnityEngine.Rect, property: any, label: UnityEngine.GUIContent): void;
        GetPropertyHeight(property: any, label: UnityEngine.GUIContent): number;
        CanCacheInspectorGUI(property: any): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ReactWindow {
        runner: ReactUnity.ReactUnityRunner;
        context: ReactUnity.ReactContext;
        dispatcher: ReactUnity.Scheduling.IDispatcher;
        mediaProvider: ReactUnity.StyleEngine.IMediaProvider;
        hostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
        DebugEnabled: boolean;
        AwaitDebugger: boolean;
        EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
        Timer: ReactUnity.Scheduling.ITimer;
        AutoRun: boolean;
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
        Run(root?: UnityEngine.UIElements.VisualElement): void;
        Restart(root?: UnityEngine.UIElements.VisualElement): void;
        AddSelectionChange(cb: any): (() => void);
        AddSelectionChange(cb: any): (() => void);
        AddPlayModeStateChange(cb: any): (() => void);
        AddPlayModeStateChange(cb: any): (() => void);
        AddVisibilityChange(cb: any): (() => void);
        AddVisibilityChange(cb: any): (() => void);
        AddItemsToMenu(menu: any): void;
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
    }
    export namespace UIToolkit {
      export class EnumComponent<T = any> {
        constructor(context: ReactUnity.Editor.Renderer.EditorContext, tag: string);
        Element: T;
        Name: string;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
        AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        SetProperty(property: string, value: any): void;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        ConvertValue(value: any): System.Enum;
        SetValue(value: System.Enum): void;
        SetValueWithoutNotify(value: System.Enum): void;
        DestroySelf(): void;
        Relayout(): void;
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Destroy(): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        ResolveStyle(recursive?: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ObjectComponent {
        constructor(context: ReactUnity.Editor.Renderer.EditorContext);
        Element: any; // UnityEditor.UIElements.ObjectField
        Name: string;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
        AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        SetProperty(property: string, value: any): void;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        ConvertValue(value: any): UnityEngine.Object;
        SetValue(value: UnityEngine.Object): void;
        SetValueWithoutNotify(value: UnityEngine.Object): void;
        DestroySelf(): void;
        Relayout(): void;
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Destroy(): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        ResolveStyle(recursive?: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ReactUnityEditorElement {
        constructor(script: ReactUnity.ScriptSource, globals: ReactUnity.Helpers.GlobalRecord, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, engineType?: ReactUnity.ScriptEngine.JavascriptEngineType, debug?: boolean, awaitDebugger?: boolean, autorun?: boolean);
        [key: string]: any;
        runner: ReactUnity.ReactUnityRunner;
        context: ReactUnity.ReactContext;
        dispatcher: ReactUnity.Scheduling.IDispatcher;
        Timer: ReactUnity.Scheduling.ITimer;
        MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
        Script: ReactUnity.ScriptSource;
        Globals: ReactUnity.Helpers.GlobalRecord;
        EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
        viewDataKey: string;
        userData: any; // System.Object
        canGrabFocus: boolean;
        focusController: UnityEngine.UIElements.FocusController;
        usageHints: UnityEngine.UIElements.UsageHints;
        transform: UnityEngine.UIElements.ITransform;
        layout: UnityEngine.Rect;
        contentRect: UnityEngine.Rect;
        worldBound: UnityEngine.Rect;
        localBound: UnityEngine.Rect;
        worldTransform: UnityEngine.Matrix4x4;
        pickingMode: UnityEngine.UIElements.PickingMode;
        name: string;
        enabledInHierarchy: boolean;
        enabledSelf: boolean;
        visible: boolean;
        generateVisualContent: ((arg0: UnityEngine.UIElements.MeshGenerationContext) => void);
        experimental: UnityEngine.UIElements.IExperimentalFeatures;
        hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
        cacheAsBitmap: boolean;
        parent: UnityEngine.UIElements.VisualElement;
        panel: UnityEngine.UIElements.IPanel;
        contentContainer: UnityEngine.UIElements.VisualElement;
        childCount: number;
        schedule: UnityEngine.UIElements.IVisualElementScheduler;
        style: UnityEngine.UIElements.IStyle;
        customStyle: UnityEngine.UIElements.ICustomStyle;
        styleSheets: UnityEngine.UIElements.VisualElementStyleSheetSet;
        tooltip: string;
        resolvedStyle: UnityEngine.UIElements.IResolvedStyle;
        focusable: boolean;
        tabIndex: number;
        delegatesFocus: boolean;
        Debug: boolean;
        AwaitDebugger: boolean;
        Run(): void;
        Destroy(): void;
        Restart(): void;
        Focus(): void;
        SendEvent(e: UnityEngine.UIElements.EventBase): void;
        SetEnabled(value: boolean): void;
        MarkDirtyRepaint(): void;
        ContainsPoint(localPoint: UnityEngine.Vector2): boolean;
        Overlaps(rectangle: UnityEngine.Rect): boolean;
        ToString(): string;
        GetClasses(): System.Collections.Generic.IEnumerable<string>;
        ClearClassList(): void;
        AddToClassList(className: string): void;
        RemoveFromClassList(className: string): void;
        ToggleInClassList(className: string): void;
        EnableInClassList(className: string, enable: boolean): void;
        ClassListContains(cls: string): boolean;
        FindAncestorUserData(): any;
        Add(child: UnityEngine.UIElements.VisualElement): void;
        Insert(index: number, element: UnityEngine.UIElements.VisualElement): void;
        Remove(element: UnityEngine.UIElements.VisualElement): void;
        RemoveAt(index: number): void;
        Clear(): void;
        ElementAt(index: number): UnityEngine.UIElements.VisualElement;
        IndexOf(element: UnityEngine.UIElements.VisualElement): number;
        Children(): System.Collections.Generic.IEnumerable<UnityEngine.UIElements.VisualElement>;
        Sort(comp: System.Comparison<UnityEngine.UIElements.VisualElement>): void;
        BringToFront(): void;
        SendToBack(): void;
        PlaceBehind(sibling: UnityEngine.UIElements.VisualElement): void;
        PlaceInFront(sibling: UnityEngine.UIElements.VisualElement): void;
        RemoveFromHierarchy(): void;
        Contains(child: UnityEngine.UIElements.VisualElement): boolean;
        FindCommonAncestor(other: UnityEngine.UIElements.VisualElement): UnityEngine.UIElements.VisualElement;
        Blur(): void;
        HandleEvent(evt: UnityEngine.UIElements.EventBase): void;
        HasTrickleDownHandlers(): boolean;
        HasBubbleUpHandlers(): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
    }
  }
  export namespace Helpers {
    export class Callback {
      constructor(callback: ((arg0: any, arg1: any[]) => any), engine: any);
      constructor(callback: any);
      constructor(callback: any);
      callback: any; // System.Object
      Engine: any; // Jint.Engine
      static From(value: any, checkCallable?: boolean): ReactUnity.Helpers.Callback;
      Call(): any;
      Call(...args: any[]): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ClassList {
      constructor(component: ReactUnity.IReactComponent);
      Count: number;
      IsReadOnly: boolean;
      Add(item: string): boolean;
      Toggle(item: string): boolean;
      ToggleWithoutNotify(item: string): boolean;
      Toggle(item: string, toggle: boolean): boolean;
      ToggleWithoutNotify(item: string, toggle: boolean): boolean;
      AddWithoutNotify(item: string): boolean;
      Remove(item: string): boolean;
      RemoveWithoutNotify(item: string): boolean;
      Clear(): void;
      ClearWithoutNotify(): void;
      Contains(item: string): boolean;
      CopyTo(array: string[], arrayIndex: number): void;
      ExceptWith(other: System.Collections.Generic.IEnumerable<string>): void;
      GetEnumerator(): System.Collections.Generic.IEnumerator<string>;
      IntersectWith(other: System.Collections.Generic.IEnumerable<string>): void;
      IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<string>): boolean;
      IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<string>): boolean;
      IsSubsetOf(other: System.Collections.Generic.IEnumerable<string>): boolean;
      IsSupersetOf(other: System.Collections.Generic.IEnumerable<string>): boolean;
      Overlaps(other: System.Collections.Generic.IEnumerable<string>): boolean;
      SetEquals(other: System.Collections.Generic.IEnumerable<string>): boolean;
      SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<string>): void;
      UnionWith(other: System.Collections.Generic.IEnumerable<string>): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CursorAPI {
      constructor(context: ReactUnity.ReactContext);
      Push(cmp: ReactUnity.IReactComponent): void;
      Pop(cmp: ReactUnity.IReactComponent): void;
      Refresh(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SetPropertyEvent {
      constructor();
      AddListener(call: UnityEngine.Events.UnityAction<string, any>): void;
      RemoveListener(call: UnityEngine.Events.UnityAction<string, any>): void;
      Invoke(arg0: string, arg1: any): void;
      GetPersistentEventCount(): number;
      GetPersistentTarget(index: number): UnityEngine.Object;
      GetPersistentMethodName(index: number): string;
      SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
      RemoveAllListeners(): void;
      ToString(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class SetEventListenerEvent {
      constructor();
      AddListener(call: UnityEngine.Events.UnityAction<string, ReactUnity.Helpers.Callback>): void;
      RemoveListener(call: UnityEngine.Events.UnityAction<string, ReactUnity.Helpers.Callback>): void;
      Invoke(arg0: string, arg1: ReactUnity.Helpers.Callback): void;
      GetPersistentEventCount(): number;
      GetPersistentTarget(index: number): UnityEngine.Object;
      GetPersistentMethodName(index: number): string;
      SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
      RemoveAllListeners(): void;
      ToString(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class GlobalRecord {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<any>;
      Count: number;
      IsReadOnly: boolean;
      static BindSerializableDictionary(dict: ReactUnity.Helpers.SerializableDictionary, dispatcher: ReactUnity.Scheduling.IDispatcher, isSerializing: boolean): ReactUnity.Helpers.GlobalRecord;
      BindSerializableDictionary(dict: ReactUnity.Helpers.SerializableDictionary, isSerializing: boolean): void;
      UpdateStringObjectDictionary(dict: ReactUnity.Helpers.WatchableRecord<any>, isSerializing: boolean): void;
      OnExposedToScriptCode(engine: any): void;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: string): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      Remove(key: string): boolean;
      RemoveWithoutNotify(key: string): boolean;
      AddListener(listener: ((arg0: string, arg1: any, arg2: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ReactInterop {
      constructor(engine: ReactUnity.ScriptEngine.IJavaScriptEngine);
      [key: string]: any;
      Comparer: System.Collections.Generic.IEqualityComparer<string>;
      Count: number;
      Keys: Record<string, any>;
      Values: Record<string, any>;
      InitializeDefault(): void;
      GetType(typeName: string): any;
      GetNamespace(nsName: string): any;
      GetNamespace(nsName: string, assembly: System.Reflection.Assembly): any;
      AddType(name: string, type: System.Type): any;
      AddNamespace(name: string, nsName: string, ...assemblies: System.Reflection.Assembly[]): any;
      Add(key: string, value: any): void;
      Clear(): void;
      ContainsKey(key: string): boolean;
      ContainsValue(value: any): boolean;
      GetEnumerator(): Record<string, any>;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      OnDeserialization(sender: any): void;
      Remove(key: string): boolean;
      TryAdd(key: string, value: any): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ReflectionHelpers {
      static FindType(fullName: string, ignoreCase?: boolean, searchAllAssemblies?: boolean): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StringObjectPair {
      constructor();
      Key: string;
      Value: UnityEngine.Object;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SerializableDictionary {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<any>;
      Count: number;
      IsReadOnly: boolean;
      OnAfterDeserialize(): void;
      OnBeforeSerialize(): void;
      AddReserializeListener(callback: ((arg0: ReactUnity.Helpers.SerializableDictionary) => void)): (() => void);
      OnExposedToScriptCode(engine: any): void;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: string): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      Remove(key: string): boolean;
      RemoveWithoutNotify(key: string): boolean;
      AddListener(listener: ((arg0: string, arg1: any, arg2: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableDictionary<TKey = any, T = any> {
      constructor();
      constructor(dict: System.Collections.Generic.IDictionary<TKey, T>);
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<TKey>;
      Values: System.Collections.Generic.ICollection<T>;
      Count: number;
      IsReadOnly: boolean;
      Set(key: TKey, value: T): void;
      SetWithoutNotify(key: TKey, value: T): void;
      Add(key: TKey, value: T): void;
      Add(item: System.Collections.Generic.KeyValuePair<TKey, T>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: TKey): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey, T>>;
      Remove(key: TKey): boolean;
      RemoveWithoutNotify(key: TKey): boolean;
      AddListener(listener: ((arg0: TKey, arg1: T, arg2: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: TKey): T;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableAdaptibleRecord<TKey = any, T = any> {
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<TKey>;
      Values: System.Collections.Generic.ICollection<T>;
      Count: number;
      IsReadOnly: boolean;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Contains(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      ContainsKey(key: string): boolean;
      CopyTo(array: System.Collections.Generic.KeyValuePair<string, any>[], arrayIndex: number): void;
      Remove(key: string): boolean;
      Remove(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      GetValueOrDefault(key: string): any;
      Set(key: TKey, value: T): void;
      SetWithoutNotify(key: TKey, value: T): void;
      Add(key: TKey, value: T): void;
      Add(item: System.Collections.Generic.KeyValuePair<TKey, T>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: TKey): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey, T>>;
      Remove(key: TKey): boolean;
      RemoveWithoutNotify(key: TKey): boolean;
      AddListener(listener: ((arg0: TKey, arg1: T, arg2: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: TKey): T;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableAdaptibleRecordBag<TKey = any, T = any> {
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<TKey>;
      Values: System.Collections.Generic.ICollection<T>;
      Count: number;
      IsReadOnly: boolean;
      OnExposedToScriptCode(engine: any): void;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Contains(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      ContainsKey(key: string): boolean;
      CopyTo(array: System.Collections.Generic.KeyValuePair<string, any>[], arrayIndex: number): void;
      Remove(key: string): boolean;
      Remove(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      GetValueOrDefault(key: string): any;
      Set(key: TKey, value: T): void;
      SetWithoutNotify(key: TKey, value: T): void;
      Add(key: TKey, value: T): void;
      Add(item: System.Collections.Generic.KeyValuePair<TKey, T>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: TKey): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey, T>>;
      Remove(key: TKey): boolean;
      RemoveWithoutNotify(key: TKey): boolean;
      AddListener(listener: ((arg0: TKey, arg1: T, arg2: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: TKey): T;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableRecord<T = any> {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<T>;
      Count: number;
      IsReadOnly: boolean;
      Set(key: string, value: T): void;
      SetWithoutNotify(key: string, value: T): void;
      Add(key: string, value: T): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, T>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: string): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, T>>;
      Remove(key: string): boolean;
      RemoveWithoutNotify(key: string): boolean;
      AddListener(listener: ((arg0: string, arg1: T, arg2: ReactUnity.Helpers.WatchableDictionary<string, T>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: string): T;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableObjectRecord {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<any>;
      Count: number;
      IsReadOnly: boolean;
      OnExposedToScriptCode(engine: any): void;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: string): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      Remove(key: string): boolean;
      RemoveWithoutNotify(key: string): boolean;
      AddListener(listener: ((arg0: string, arg1: any, arg2: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableSet<T = any> {
      constructor();
      Count: number;
      IsReadOnly: boolean;
      Add(item: T): boolean;
      Toggle(item: T): boolean;
      ToggleWithoutNotify(item: T): boolean;
      Toggle(item: T, toggle: boolean): boolean;
      ToggleWithoutNotify(item: T, toggle: boolean): boolean;
      AddWithoutNotify(item: T): boolean;
      Remove(item: T): boolean;
      RemoveWithoutNotify(item: T): boolean;
      Clear(): void;
      ClearWithoutNotify(): void;
      Contains(item: T): boolean;
      CopyTo(array: T[], arrayIndex: number): void;
      ExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
      GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
      IntersectWith(other: System.Collections.Generic.IEnumerable<T>): void;
      IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
      IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
      IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
      IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean;
      Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean;
      SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean;
      SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<T>): void;
      UnionWith(other: System.Collections.Generic.IEnumerable<T>): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Callback_JintCallbackConverter {
      constructor(engine: any);
      Convert(value: any, type: System.Type, formatProvider: System.IFormatProvider): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Scheduling {
    export class ControlledTimer {
      constructor();
      AnimationTime: number;
      TimeScale: number;
      AdvanceTime(advanceBy: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DefaultScheduler {
      constructor(dispatcher: ReactUnity.Scheduling.IDispatcher);
      setTimeout(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      setInterval(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      clearTimeout(handle: number): void;
      clearInterval(handle: number): void;
      setImmediate(callback: ReactUnity.Helpers.Callback): number;
      requestAnimationFrame(callback: ReactUnity.Helpers.Callback): number;
      cancelAnimationFrame(handle: number): void;
      clearImmediate(handle: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorDispatcher {
      constructor();
      Scheduler: ReactUnity.Scheduling.IScheduler;
      OnEveryUpdate(call: (() => void)): number;
      OnEveryLateUpdate(call: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
      StopAll(): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IDispatcher {
      Scheduler: ReactUnity.Scheduling.IScheduler;
      OnEveryLateUpdate(call: (() => void)): number;
      OnEveryUpdate(call: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
    }
    export interface IScheduler {
      setImmediate(callback: ReactUnity.Helpers.Callback): number;
      setTimeout(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      setInterval(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      requestAnimationFrame(callback: ReactUnity.Helpers.Callback): number;
      clearTimeout(handle: number): void;
      clearInterval(handle: number): void;
      clearImmediate(handle: number): void;
      cancelAnimationFrame(handle: number): void;
    }
    export interface ITimer {
      AnimationTime: number;
      TimeScale: number;
    }
    export class NoScheduler {
      constructor();
      setTimeout(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      setInterval(callback: ReactUnity.Helpers.Callback, timeout: number): number;
      setImmediate(callback: ReactUnity.Helpers.Callback): number;
      requestAnimationFrame(callback: ReactUnity.Helpers.Callback): number;
      clearTimeout(handle: number): void;
      clearInterval(handle: number): void;
      clearImmediate(handle: number): void;
      cancelAnimationFrame(handle: number): void;
      clearAllTimeouts(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RuntimeDispatcher {
      constructor();
      Scheduler: ReactUnity.Scheduling.IScheduler;
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
      static Create(): ReactUnity.Scheduling.RuntimeDispatcher;
      OnEveryLateUpdate(callback: (() => void)): number;
      OnEveryUpdate(callback: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      IsMainThread(): boolean;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
      Dispose(): void;
      IsInvoking(): boolean;
      CancelInvoke(): void;
      Invoke(methodName: string, time: number): void;
      InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
      CancelInvoke(methodName: string): void;
      IsInvoking(methodName: string): boolean;
      StartCoroutine(methodName: string): UnityEngine.Coroutine;
      StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
      StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
      StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
      StopCoroutine(routine: System.Collections.IEnumerator): void;
      StopCoroutine(routine: UnityEngine.Coroutine): void;
      StopCoroutine(methodName: string): void;
      StopAllCoroutines(): void;
      GetComponent(type: System.Type): UnityEngine.Component;
      GetComponent(type: string): UnityEngine.Component;
      GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
      GetComponentInChildren(t: System.Type): UnityEngine.Component;
      GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
      GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
      GetComponentInParent(t: System.Type): UnityEngine.Component;
      GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
      GetComponentsInParent(t: System.Type): UnityEngine.Component[];
      GetComponents(type: System.Type): UnityEngine.Component[];
      GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
      CompareTag(tag: string): boolean;
      SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
      SendMessageUpwards(methodName: string, value: any): void;
      SendMessageUpwards(methodName: string): void;
      SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
      SendMessage(methodName: string, value: any): void;
      SendMessage(methodName: string): void;
      SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
      SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
      BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
      BroadcastMessage(methodName: string, parameter: any): void;
      BroadcastMessage(methodName: string): void;
      BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class UnityTimer {
      static Instance: ReactUnity.Scheduling.UnityTimer;
      AnimationTime: number;
      TimeScale: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace ScriptEngine {
    export class ClearScriptEngine {
      constructor(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean);
      Key: string;
      Engine: any; // Microsoft.ClearScript.V8.V8ScriptEngine
      Evaluate(code: string, fileName?: string): any;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      GetValue(key: string): any;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      CreateNativeObject(props: Record<string, any>): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ClearScriptEngineFactory {
      constructor();
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean): ReactUnity.ScriptEngine.IJavaScriptEngine;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum JavascriptEngineType {
      Auto = 0,
      Jint = 1,
      ClearScript = 2,
    }
    export interface IJavaScriptEngine {
      Key: string;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      Evaluate(code: string, fileName?: string): any;
      GetValue(key: string): any;
      CreateNativeObject(props: Record<string, any>): any;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
    }
    export interface IJavaScriptEngineFactory {
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean): ReactUnity.ScriptEngine.IJavaScriptEngine;
    }
    export class JintEngine {
      constructor(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean);
      Key: string;
      Engine: any; // Jint.Engine
      Evaluate(code: string, fileName?: string): any;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      GetValue(key: string): any;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      CreateNativeObject(props: Record<string, any>): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class JintEngineFactory {
      constructor();
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean): ReactUnity.ScriptEngine.IJavaScriptEngine;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace StyleEngine {
    export interface IMediaProvider {
      MediaType: string;
      GetValue(property: string): string;
      GetNumericalValue(property: string): number;
      SetValue(property: string, value: string): void;
      SetNumber(property: string, value: number): void;
      SetDimensions(width: number, height: number): void;
      RecalculateDefaults(): void;
    }
    export class DefaultMediaProvider {
      constructor(mediaType: string, numbers?: Record<string, number>, values?: Record<string, string>);
      MediaType: string;
      static CreateMediaProvider(type: string, framework: string, isEditor: boolean): ReactUnity.StyleEngine.DefaultMediaProvider;
      RecalculateDefaults(): void;
      GetNumericalValue(property: string): number;
      GetValue(property: string): string;
      SetValue(property: string, value: string): void;
      SetNumber(property: string, value: number): void;
      SetDimensions(width: number, height: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class MediaQueryList {
      media: string;
      matches: boolean;
      static Create(provider: ReactUnity.StyleEngine.IMediaProvider, media: string): ReactUnity.StyleEngine.MediaQueryList;
      addEventListener(type: string, listener: any): void;
      removeEventListener(type: string, listener: any): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RuleHelpers {
      static ImportantSpecifity: number;
      static SplitSelectorRegex: System.Text.RegularExpressions.Regex;
      static NthChildRegex: System.Text.RegularExpressions.Regex;
      static ParseSelector(selector: string, negated?: boolean): ReactUnity.StyleEngine.RuleSelectorPart[];
      static GetSpecificity(priority: any): number;
      static ConvertStyleDeclarationToRecord(rule: any, important: boolean): any;
      static ConvertStyleDeclarationToRecord(dc: any): any;
      static NormalizeSelector(selector: string): string;
      static GetCssKeyword(value: string): ReactUnity.Styling.CssKeyword;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleData {
      constructor();
      Rules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleTree {
      constructor(parser: any);
      Parser: any; // ExCSS.StylesheetParser
      MediaQuery: ReactUnity.StyleEngine.MediaQueryList;
      Scope: ReactUnity.IReactComponent;
      Specifity: number;
      LeafNodes: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforeNodes: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterNodes: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      Tree: ReactUnity.StyleEngine.RuleTree<ReactUnity.StyleEngine.StyleData>;
      Parent: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>;
      Selector: string;
      ParsedSelector: ReactUnity.StyleEngine.RuleSelectorPart[];
      Children: System.Collections.Generic.LinkedList<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>>;
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: ReactUnity.StyleEngine.StyleData;
      AddStyle(rule: any, importanceOffset?: number, mql?: ReactUnity.StyleEngine.MediaQueryList, scope?: ReactUnity.IReactComponent): System.Tuple<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
      AddStyle(selectorText: string, rules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>, importantRules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>, importanceOffset?: number, mql?: ReactUnity.StyleEngine.MediaQueryList, scope?: ReactUnity.IReactComponent): System.Tuple<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
      GetMatchingRules(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>>;
      GetMatchingBefore(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>>;
      GetMatchingAfter(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>>;
      AnyMatches(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): boolean;
      Closest(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
      GetMatchingChild(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
      GetMatchingChildren(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent[];
      AddSelector(selectorText: string, importanceOffset?: number, mql?: ReactUnity.StyleEngine.MediaQueryList, scope?: ReactUnity.IReactComponent): ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AddChildCascading(selector: string, mq: ReactUnity.StyleEngine.MediaQueryList, scope: ReactUnity.IReactComponent, specifity: number): ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>;
      Matches(component: ReactUnity.IReactComponent): boolean;
      Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
      CompareTo(other: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RuleTree<T = any> {
      constructor(parser: any);
      Parser: any; // ExCSS.StylesheetParser
      MediaQuery: ReactUnity.StyleEngine.MediaQueryList;
      Scope: ReactUnity.IReactComponent;
      Specifity: number;
      LeafNodes: ReactUnity.StyleEngine.RuleTreeNode<T>[];
      BeforeNodes: ReactUnity.StyleEngine.RuleTreeNode<T>[];
      AfterNodes: ReactUnity.StyleEngine.RuleTreeNode<T>[];
      Tree: ReactUnity.StyleEngine.RuleTree<T>;
      Parent: ReactUnity.StyleEngine.RuleTreeNode<T>;
      Selector: string;
      ParsedSelector: ReactUnity.StyleEngine.RuleSelectorPart[];
      Children: System.Collections.Generic.LinkedList<ReactUnity.StyleEngine.RuleTreeNode<T>>;
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: T;
      GetMatchingRules(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<T>>;
      GetMatchingBefore(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<T>>;
      GetMatchingAfter(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.StyleEngine.RuleTreeNode<T>>;
      AnyMatches(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): boolean;
      Closest(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
      GetMatchingChild(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
      GetMatchingChildren(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent[];
      AddSelector(selectorText: string, importanceOffset?: number, mql?: ReactUnity.StyleEngine.MediaQueryList, scope?: ReactUnity.IReactComponent): ReactUnity.StyleEngine.RuleTreeNode<T>[];
      AddChildCascading(selector: string, mq: ReactUnity.StyleEngine.MediaQueryList, scope: ReactUnity.IReactComponent, specifity: number): ReactUnity.StyleEngine.RuleTreeNode<T>;
      Matches(component: ReactUnity.IReactComponent): boolean;
      Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
      CompareTo(other: ReactUnity.StyleEngine.RuleTreeNode<T>): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RuleTreeNode<T = any> {
      constructor();
      MediaQuery: ReactUnity.StyleEngine.MediaQueryList;
      Scope: ReactUnity.IReactComponent;
      Specifity: number;
      Tree: ReactUnity.StyleEngine.RuleTree<T>;
      Parent: ReactUnity.StyleEngine.RuleTreeNode<T>;
      Selector: string;
      ParsedSelector: ReactUnity.StyleEngine.RuleSelectorPart[];
      Children: System.Collections.Generic.LinkedList<ReactUnity.StyleEngine.RuleTreeNode<T>>;
      RelationType: ReactUnity.StyleEngine.RuleRelationType;
      Data: T;
      AddChildCascading(selector: string, mq: ReactUnity.StyleEngine.MediaQueryList, scope: ReactUnity.IReactComponent, specifity: number): ReactUnity.StyleEngine.RuleTreeNode<T>;
      Matches(component: ReactUnity.IReactComponent): boolean;
      Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
      CompareTo(other: ReactUnity.StyleEngine.RuleTreeNode<T>): number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum RuleRelationType {
      Self = 0,
      Parent = 1,
      DirectParent = 2,
      Sibling = 3,
      DirectSibling = 4,
      ShadowParent = 5,
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
      ShadowDescendant = 14,
      Not = 20,
      FirstChild = 21,
      LastChild = 22,
      NthChild = 23,
      NthLastChild = 24,
      OnlyChild = 25,
      Empty = 26,
      Root = 27,
      Scope = 28,
      Activatable = 29,
      Blank = 30,
      Enabled = 31,
      Disabled = 32,
      PlaceholderShown = 33,
      ReadOnly = 34,
      ReadWrite = 35,
      Checked = 36,
      Indeterminate = 37,
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
    export class RuleSelectorPart {
      constructor();
      Negated: boolean;
      Type: ReactUnity.StyleEngine.RuleSelectorPartType;
      Name: string;
      Parameter: any; // System.Object
      CompareTo(other: ReactUnity.StyleEngine.RuleSelectorPart): number;
      Matches(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class NthChildParameter {
      constructor(value: string);
      A: number;
      B: number;
      Matches(index: number): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class StyleContext {
      constructor(context: ReactUnity.ReactContext);
      Context: ReactUnity.ReactContext;
      MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      Parser: any; // ExCSS.StylesheetParser
      StyleTree: ReactUnity.StyleEngine.StyleTree;
      FontFamilies: Record<string, ReactUnity.Types.FontReference>[];
      Keyframes: Record<string, ReactUnity.KeyframeList>[];
      StyleSheets: ReactUnity.StyleEngine.StyleSheet[];
      ResolveStyle(): void;
      Insert(sheet: ReactUnity.StyleEngine.StyleSheet): void;
      Remove(sheet: ReactUnity.StyleEngine.StyleSheet): void;
      GetFontFamily(name: string): ReactUnity.Types.FontReference;
      GetKeyframes(name: string): ReactUnity.KeyframeList;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleSheet {
      constructor(context: ReactUnity.StyleEngine.StyleContext, style: string, importanceOffset?: number, scope?: ReactUnity.IReactComponent);
      Context: ReactUnity.StyleEngine.StyleContext;
      ImportanceOffset: number;
      FontFamilies: Record<string, ReactUnity.Types.FontReference>;
      Keyframes: Record<string, ReactUnity.KeyframeList>;
      MediaQueries: ReactUnity.StyleEngine.MediaQueryList[];
      Declarations: System.Tuple<ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
      AddRules(selector: string, rules: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, important?: boolean): void;
      AddRules(selector: string, rules: System.Collections.Generic.IDictionary<string, any>, important?: boolean): void;
      Enable(): void;
      Disable(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Styling {
    export class CssFunctions {
      static Steps: ReactUnity.Styling.ICssFunction;
      static CubicBezier: ReactUnity.Styling.ICssFunction;
      static Url: ReactUnity.Styling.ICssFunction;
      static Rgba: ReactUnity.Styling.ICssFunction;
      static Hsla: ReactUnity.Styling.ICssFunction;
      static Var: ReactUnity.Styling.ICssFunction;
      static Vector3: ReactUnity.Styling.ICssFunction;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ICssFunction {
      Name: string;
      CanHandleArguments(count: number, name: string, args: string[]): boolean;
      Call(name: string, args: string[]): any;
    }
    export enum CssKeyword {
      NoKeyword = 0,
      Invalid = 1,
      Initial = 2,
      Default = 2,
      Inherit = 3,
      Auto = 4,
      None = 5,
      Unset = 6,
      CurrentColor = 7,
    }
    export class CssProperties {
      static CssPropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      static TransitionableProperties: any; // System.Collections.Generic.HashSet`1[ReactUnity.Styling.IStyleProperty]
      static GetProperty(name: string): ReactUnity.Styling.IStyleProperty;
      static GetKey(name: string): ReactUnity.Styling.IStyleKey;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CursorSet {
      constructor();
      name: string;
      hideFlags: UnityEngine.HideFlags;
      Name: string;
      Cursors: ReactUnity.Styling.CursorRecord;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class CursorPair {
      constructor();
      Name: string;
      Cursor: UnityEngine.Texture2D;
      Hotspot: UnityEngine.Vector2;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CursorRecord {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<ReactUnity.Styling.CursorPair>;
      Count: number;
      IsReadOnly: boolean;
      OnAfterDeserialize(): void;
      OnBeforeSerialize(): void;
      Set(key: string, value: ReactUnity.Styling.CursorPair): void;
      SetWithoutNotify(key: string, value: ReactUnity.Styling.CursorPair): void;
      Add(key: string, value: ReactUnity.Styling.CursorPair): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, ReactUnity.Styling.CursorPair>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: string): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, ReactUnity.Styling.CursorPair>>;
      Remove(key: string): boolean;
      RemoveWithoutNotify(key: string): boolean;
      AddListener(listener: ((arg0: string, arg1: ReactUnity.Styling.CursorPair, arg2: ReactUnity.Helpers.WatchableDictionary<string, ReactUnity.Styling.CursorPair>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: string): ReactUnity.Styling.CursorPair;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class IconSet {
      constructor();
      name: string;
      hideFlags: UnityEngine.HideFlags;
      Name: string;
      FontAsset: any; // TMPro.TMP_FontAsset
      Codepoints: UnityEngine.TextAsset;
      CharacterMap: Record<string, string>;
      ConvertTextContent(text: string): string;
      SetDirty(): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class InlineStyles {
      constructor();
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<ReactUnity.Styling.IStyleProperty>;
      Values: System.Collections.Generic.ICollection<any>;
      Count: number;
      IsReadOnly: boolean;
      OnExposedToScriptCode(engine: any): void;
      Add(key: string, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Contains(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      ContainsKey(key: string): boolean;
      CopyTo(array: System.Collections.Generic.KeyValuePair<string, any>[], arrayIndex: number): void;
      Remove(key: string): boolean;
      Remove(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      Set(key: string, value: any): void;
      SetWithoutNotify(key: string, value: any): void;
      GetValueOrDefault(key: string): any;
      Set(key: ReactUnity.Styling.IStyleProperty, value: any): void;
      SetWithoutNotify(key: ReactUnity.Styling.IStyleProperty, value: any): void;
      Add(key: ReactUnity.Styling.IStyleProperty, value: any): void;
      Add(item: System.Collections.Generic.KeyValuePair<ReactUnity.Styling.IStyleProperty, any>): void;
      Clear(): void;
      ClearWithoutNotify(): void;
      ContainsKey(key: ReactUnity.Styling.IStyleProperty): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<ReactUnity.Styling.IStyleProperty, any>>;
      Remove(key: ReactUnity.Styling.IStyleProperty): boolean;
      RemoveWithoutNotify(key: ReactUnity.Styling.IStyleProperty): boolean;
      AddListener(listener: ((arg0: ReactUnity.Styling.IStyleProperty, arg1: any, arg2: ReactUnity.Helpers.WatchableDictionary<ReactUnity.Styling.IStyleProperty, any>) => void)): (() => void);
      AddListener(cb: any): (() => void);
      AddListener(cb: any): (() => void);
      GetValueOrDefault(key: ReactUnity.Styling.IStyleProperty): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IStyleKey {
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
    }
    export class NodeStyle {
      constructor(context: ReactUnity.ReactContext, fallback?: ReactUnity.Styling.NodeStyle, cssStyles?: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>[]);
      HasInheritedChanges: boolean;
      opacity: number;
      zIndex: number;
      visibility: boolean;
      position: ReactUnity.Types.PositionType;
      cursor: ReactUnity.Types.CursorList;
      pointerEvents: ReactUnity.Types.PointerEvents;
      backgroundColor: UnityEngine.Color;
      backgroundImage: ReactUnity.Types.ImageReference;
      maskImage: ReactUnity.Types.ImageReference;
      borderTopLeftRadius: number;
      borderTopRightRadius: number;
      borderBottomLeftRadius: number;
      borderBottomRightRadius: number;
      borderLeftColor: UnityEngine.Color;
      borderRightColor: UnityEngine.Color;
      borderTopColor: UnityEngine.Color;
      borderBottomColor: UnityEngine.Color;
      boxShadow: ReactUnity.Types.BoxShadowList;
      translate: ReactUnity.Types.YogaValue2;
      scale: UnityEngine.Vector2;
      transformOrigin: ReactUnity.Types.YogaValue2;
      rotate: UnityEngine.Vector3;
      fontFamily: ReactUnity.Types.FontReference;
      color: UnityEngine.Color;
      fontWeight: any; // TMPro.FontWeight
      fontStyle: any; // TMPro.FontStyles
      fontSize: number;
      lineHeight: number;
      letterSpacing: number;
      wordSpacing: number;
      textAlign: any; // TMPro.TextAlignmentOptions
      textOverflow: any; // TMPro.TextOverflowModes
      textWrap: boolean;
      content: string;
      appearance: ReactUnity.Types.Appearance;
      navigation: UnityEngine.UI.Navigation_Mode;
      transition: ReactUnity.Animations.TransitionList;
      animation: ReactUnity.Animations.AnimationList;
      audio: ReactUnity.Animations.AudioList;
      objectFit: ReactUnity.Types.ObjectFit;
      objectPosition: ReactUnity.Types.YogaValue2;
      Context: ReactUnity.ReactContext;
      Parent: ReactUnity.Styling.NodeStyle;
      UpdateParent(parent: ReactUnity.Styling.NodeStyle): void;
      GetRawStyleValue(prop: ReactUnity.Styling.IStyleProperty, fromChild?: boolean, activeStyle?: ReactUnity.Styling.NodeStyle): any;
      SetStyleValue(prop: ReactUnity.Styling.IStyleProperty, value: any): void;
      MarkChangesSeen(): void;
      HasValue(prop: ReactUnity.Styling.IStyleProperty): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IStyleProperty {
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      affectsLayout: boolean;
      noneValue: any; // System.Object
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      Convert(value: any): any;
    }
    export class LayoutProperties {
      static StyleDirection: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaDirection]
      static FlexDirection: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaFlexDirection]
      static JustifyContent: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaJustify]
      static Display: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaDisplay]
      static AlignItems: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
      static AlignSelf: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
      static AlignContent: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaAlign]
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
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ILayoutProperty {
      Set(node: Facebook.Yoga.YogaNode, value: any, defaultNode: Facebook.Yoga.YogaNode, style: ReactUnity.Styling.NodeStyle): void;
      SetDefault(node: Facebook.Yoga.YogaNode): void;
      SetDefault(node: Facebook.Yoga.YogaNode, defaultNode: Facebook.Yoga.YogaNode): void;
      Get(node: Facebook.Yoga.YogaNode): any;
      Serialize(value: any): string;
    }
    export class LayoutProperty<T = any> {
      constructor(name: string, transitionable?: boolean, defaultValue?: T, converter?: ReactUnity.Converters.IStyleConverter);
      affectsLayout: boolean;
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      noneValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      propInfo: System.Reflection.PropertyInfo;
      converter: ReactUnity.Converters.IStyleConverter;
      Set(node: Facebook.Yoga.YogaNode, value: any, defaultNode: Facebook.Yoga.YogaNode, style: ReactUnity.Styling.NodeStyle): void;
      SetDefault(node: Facebook.Yoga.YogaNode): void;
      SetDefault(node: Facebook.Yoga.YogaNode, defaultNode: Facebook.Yoga.YogaNode): void;
      Get(node: Facebook.Yoga.YogaNode): any;
      Serialize(value: any): string;
      Convert(value: any): any;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleProperties {
      static AllProperties: ReactUnity.Styling.IStyleProperty[];
      static InheritedProperties: any; // System.Collections.Generic.HashSet`1[System.String]
      static opacity: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static zIndex: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static visibility: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static position: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.PositionType]
      static cursor: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.CursorList]
      static pointerEvents: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.PointerEvents]
      static backgroundColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static backgroundImage: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.ImageReference]
      static maskImage: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.ImageReference]
      static borderTopLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static borderTopRightRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static borderBottomLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static borderBottomRightRadius: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static borderLeftColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderRightColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderTopColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderBottomColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static boxShadow: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.BoxShadowList]
      static transformOrigin: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static translate: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static scale: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Vector2]
      static rotate: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Vector3]
      static fontFamily: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.FontReference]
      static color: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static fontWeight: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontWeight]
      static fontStyle: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontStyles]
      static fontSize: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static lineHeight: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static letterSpacing: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static wordSpacing: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static textAlign: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextAlignmentOptions]
      static textOverflow: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextOverflowModes]
      static textWrap: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static content: any; // ReactUnity.Styling.StyleProperty`1[System.String]
      static appearance: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.Appearance]
      static navigation: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.UI.Navigation+Mode]
      static transition: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Animations.TransitionList]
      static animation: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Animations.AnimationList]
      static audio: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Animations.AudioList]
      static objectFit: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.ObjectFit]
      static objectPosition: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      static CssPropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleProperty<T = any> {
      constructor(name: string, defaultValue?: any, transitionable?: boolean, inherited?: boolean, converter?: ReactUnity.Converters.IStyleConverter, noneValue?: any);
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      noneValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      affectsLayout: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      converter: ReactUnity.Converters.IStyleConverter;
      Convert(value: any): any;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class VariableProperty {
      constructor(name: string, type?: System.Type);
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      noneValue: any; // System.Object
      affectsLayout: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      Convert(value: any): any;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class StateStyles {
      constructor(cmp: ReactUnity.IReactComponent);
      Dic: Record<string, ReactUnity.Styling.NodeStyle>;
      Component: ReactUnity.IReactComponent;
      States: System.Collections.Generic.HashSet<string>;
      ActiveStates: ReactUnity.Styling.NodeStyle[];
      SubscribeToState(state: string): void;
      StartState(state: string): boolean;
      EndState(state: string): boolean;
      GetState(state: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleState {
      constructor(context: ReactUnity.ReactContext);
      Previous: ReactUnity.Styling.NodeStyle;
      Current: ReactUnity.Styling.NodeStyle;
      Active: ReactUnity.Styling.NodeStyle;
      Parent: ReactUnity.Styling.StyleState;
      SetCurrent(newStyle: ReactUnity.Styling.NodeStyle): void;
      Update(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Computed {
      export class ComputedConstant {
        constructor(value: any);
        Value: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedCurrentColor {
        static Instance: ReactUnity.Styling.Computed.ComputedCurrentColor;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedDynamic {
        constructor(value: any);
        Value: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedFontSize {
        constructor(ratio: number);
        static Default: ReactUnity.Styling.Computed.ComputedFontSize;
        Ratio: number;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedInterpolation {
        constructor(from: ReactUnity.Styling.Computed.IComputedValue, to: ReactUnity.Styling.Computed.IComputedValue, ratio: number);
        From: ReactUnity.Styling.Computed.IComputedValue;
        To: ReactUnity.Styling.Computed.IComputedValue;
        Ratio: number;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedRootRelative {
        constructor(ratio: number, type: ReactUnity.Styling.Computed.ComputedRootRelative_RootValueType);
        Ratio: number;
        Type: ReactUnity.Styling.Computed.ComputedRootRelative_RootValueType;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedVariable {
        constructor(prop: ReactUnity.Styling.VariableProperty, fallbackValue: any);
        Property: ReactUnity.Styling.VariableProperty;
        FallbackValue: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export interface IComputedValue {
        GetValue(targetProp: ReactUnity.Styling.IStyleProperty, targetStyle: ReactUnity.Styling.NodeStyle): any;
      }
      export enum ComputedRootRelative_RootValueType {
        None = 0,
        Width = 1,
        Height = 2,
        Min = 3,
        Max = 4,
        Rem = 5,
      }
    }
    export namespace Internal {
      export class BasicBorderImage {
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
        TopColor: UnityEngine.Color;
        RightColor: UnityEngine.Color;
        BottomColor: UnityEngine.Color;
        LeftColor: UnityEngine.Color;
        BorderSize: UnityEngine.Vector4;
        BorderRadius: UnityEngine.Vector4;
        Size: UnityEngine.Vector4;
        GetDefaultMaterial(): UnityEngine.Material;
        DisableSpriteOptimizations(): void;
        OnBeforeSerialize(): void;
        OnAfterDeserialize(): void;
        SetNativeSize(): void;
        CalculateLayoutInputHorizontal(): void;
        CalculateLayoutInputVertical(): void;
        IsRaycastLocationValid(screenPoint: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        GetModifiedMaterial(baseMaterial: UnityEngine.Material): UnityEngine.Material;
        Cull(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipRect(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipSoftness(clipSoftness: UnityEngine.Vector2): void;
        ParentMaskStateChanged(): void;
        RecalculateClipping(): void;
        RecalculateMasking(): void;
        SetAllDirty(): void;
        SetLayoutDirty(): void;
        SetVerticesDirty(): void;
        SetMaterialDirty(): void;
        OnCullingChanged(): void;
        Rebuild(update: UnityEngine.UI.CanvasUpdate): void;
        LayoutComplete(): void;
        GraphicUpdateComplete(): void;
        OnRebuildRequested(): void;
        Raycast(sp: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        PixelAdjustPoint(point: UnityEngine.Vector2): UnityEngine.Vector2;
        GetPixelAdjustedRect(): UnityEngine.Rect;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean): void;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean): void;
        CrossFadeAlpha(alpha: number, duration: number, ignoreTimeScale: boolean): void;
        RegisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        IsActive(): boolean;
        IsDestroyed(): boolean;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BorderAndBackground {
        constructor();
        Root: UnityEngine.RectTransform;
        Border: UnityEngine.RectTransform;
        Background: UnityEngine.RectTransform;
        ShadowRoot: UnityEngine.RectTransform;
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
        RootGraphic: ReactUnity.Styling.Internal.RoundedBorderMaskImage;
        RootMask: UnityEngine.UI.Mask;
        BorderGraphic: ReactUnity.Styling.Internal.BasicBorderImage;
        ShadowGraphics: ReactUnity.Styling.Internal.BoxShadowImage[];
        static Create(go: UnityEngine.GameObject): ReactUnity.Styling.Internal.BorderAndBackground;
        SetBorderSize(layout: Facebook.Yoga.YogaNode): void;
        SetBorderRadius(tl: number, tr: number, br: number, bl: number): void;
        SetBorderColor(top: UnityEngine.Color, right: UnityEngine.Color, bottom: UnityEngine.Color, left: UnityEngine.Color): void;
        SetBackgroundColorAndImage(color: System.Nullable<UnityEngine.Color>, sprite: UnityEngine.Sprite): void;
        SetBoxShadow(shadows: ReactUnity.Types.BoxShadowList): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class BoxShadowImage {
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
        Shadow: ReactUnity.Types.BoxShadow;
        BorderSize: UnityEngine.Vector4;
        BorderRadius: UnityEngine.Vector4;
        Size: UnityEngine.Vector4;
        GetDefaultMaterial(): UnityEngine.Material;
        DisableSpriteOptimizations(): void;
        OnBeforeSerialize(): void;
        OnAfterDeserialize(): void;
        SetNativeSize(): void;
        CalculateLayoutInputHorizontal(): void;
        CalculateLayoutInputVertical(): void;
        IsRaycastLocationValid(screenPoint: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        GetModifiedMaterial(baseMaterial: UnityEngine.Material): UnityEngine.Material;
        Cull(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipRect(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipSoftness(clipSoftness: UnityEngine.Vector2): void;
        ParentMaskStateChanged(): void;
        RecalculateClipping(): void;
        RecalculateMasking(): void;
        SetAllDirty(): void;
        SetLayoutDirty(): void;
        SetVerticesDirty(): void;
        SetMaterialDirty(): void;
        OnCullingChanged(): void;
        Rebuild(update: UnityEngine.UI.CanvasUpdate): void;
        LayoutComplete(): void;
        GraphicUpdateComplete(): void;
        OnRebuildRequested(): void;
        Raycast(sp: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        PixelAdjustPoint(point: UnityEngine.Vector2): UnityEngine.Vector2;
        GetPixelAdjustedRect(): UnityEngine.Rect;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean): void;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean): void;
        CrossFadeAlpha(alpha: number, duration: number, ignoreTimeScale: boolean): void;
        RegisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        IsActive(): boolean;
        IsDestroyed(): boolean;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class MaskAndImage {
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
        Mask: UnityEngine.UI.Mask;
        Image: ReactUnity.Styling.Internal.RoundedBorderMaskImage;
        MaskImage: ReactUnity.Types.ImageReference;
        static Create(go: UnityEngine.GameObject, ctx: ReactUnity.ReactContext): ReactUnity.Styling.Internal.MaskAndImage;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class RoundedBorderMaskImage {
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
        BorderRadius: UnityEngine.Vector4;
        Size: UnityEngine.Vector4;
        GetDefaultMaterial(): UnityEngine.Material;
        DisableSpriteOptimizations(): void;
        OnBeforeSerialize(): void;
        OnAfterDeserialize(): void;
        SetNativeSize(): void;
        CalculateLayoutInputHorizontal(): void;
        CalculateLayoutInputVertical(): void;
        IsRaycastLocationValid(screenPoint: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        GetModifiedMaterial(baseMaterial: UnityEngine.Material): UnityEngine.Material;
        Cull(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipRect(clipRect: UnityEngine.Rect, validRect: boolean): void;
        SetClipSoftness(clipSoftness: UnityEngine.Vector2): void;
        ParentMaskStateChanged(): void;
        RecalculateClipping(): void;
        RecalculateMasking(): void;
        SetAllDirty(): void;
        SetLayoutDirty(): void;
        SetVerticesDirty(): void;
        SetMaterialDirty(): void;
        OnCullingChanged(): void;
        Rebuild(update: UnityEngine.UI.CanvasUpdate): void;
        LayoutComplete(): void;
        GraphicUpdateComplete(): void;
        OnRebuildRequested(): void;
        Raycast(sp: UnityEngine.Vector2, eventCamera: UnityEngine.Camera): boolean;
        PixelAdjustPoint(point: UnityEngine.Vector2): UnityEngine.Vector2;
        GetPixelAdjustedRect(): UnityEngine.Rect;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean): void;
        CrossFadeColor(targetColor: UnityEngine.Color, duration: number, ignoreTimeScale: boolean, useAlpha: boolean, useRGB: boolean): void;
        CrossFadeAlpha(alpha: number, duration: number, ignoreTimeScale: boolean): void;
        RegisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyLayoutCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyVerticesCallback(action: UnityEngine.Events.UnityAction): void;
        RegisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        UnregisterDirtyMaterialCallback(action: UnityEngine.Events.UnityAction): void;
        IsActive(): boolean;
        IsDestroyed(): boolean;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
    }
    export namespace Shorthands {
      export class AllShorthands {
        static Margin: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Padding: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Inset: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderWidth: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderColor: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderRadius: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Border: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderTop: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderRight: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderBottom: ReactUnity.Styling.Shorthands.StyleShorthand;
        static BorderLeft: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Flex: ReactUnity.Styling.Shorthands.StyleShorthand;
        static FlexFlow: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Font: ReactUnity.Styling.Shorthands.StyleShorthand;
        static Map: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.Shorthands.StyleShorthand]
        static List: ReactUnity.Styling.Shorthands.StyleShorthand[];
        static GetShorthand(name: string): ReactUnity.Styling.Shorthands.StyleShorthand;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class BorderShorthand {
        constructor(name: string, side: ReactUnity.Styling.Shorthands.BorderShorthand_BorderSide);
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Side: ReactUnity.Styling.Shorthands.BorderShorthand_BorderSide;
        Name: string;
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FlexFlowShorthand {
        constructor(name: string);
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Name: string;
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FlexShorthand {
        constructor(name: string);
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Name: string;
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FontShorthand {
        constructor(name: string);
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Name: string;
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FourDirectionalShorthand {
        constructor(name: string, propertyType: ReactUnity.Styling.Shorthands.FourDirectionalShorthand_PropertyType);
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Type: ReactUnity.Styling.Shorthands.FourDirectionalShorthand_PropertyType;
        Converter: ReactUnity.Converters.IStyleConverter;
        Name: string;
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class StyleShorthand {
        constructor(name: string);
        Name: string;
        ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
        Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum BorderShorthand_BorderSide {
        All = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        Left = 4,
      }
      export enum FourDirectionalShorthand_PropertyType {
        None = 0,
        Margin = 1,
        Padding = 2,
        Inset = 3,
        BorderWidth = 4,
        BorderColor = 5,
        BorderRadius = 6,
      }
    }
  }
  export namespace Types {
    export enum Appearance {
      None = 0,
      Button = 1,
      Input = 2,
      Toggle = 3,
    }
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
      Path = 9,
    }
    export class AssetReference<AssetType = any> {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: any; // ReactUnity.Types.AssetReference`1[AssetType]
      Get(context: ReactUnity.ReactContext, callback: ((arg0: AssetType) => void)): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AudioReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.AudioReference;
      Dispose(): void;
      Get(context: ReactUnity.ReactContext, callback: ((arg0: UnityEngine.AudioClip) => void)): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum BorderStyle {
      None = 0,
      Hidden = 1,
      Dotted = 2,
      Dashed = 3,
      Solid = 4,
      Double = 5,
      Groove = 6,
      Ridge = 7,
      Inset = 8,
      Outset = 9,
    }
    export class BoxShadowList {
      constructor(definition: string);
      constructor(item: ReactUnity.Types.BoxShadow);
      constructor(items: ReactUnity.Types.BoxShadow[]);
      Definition: string;
      Items: ReactUnity.Types.BoxShadow[];
      Any: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class BoxShadow {
      constructor(definition: string);
      constructor(offset: UnityEngine.Vector2, blur: UnityEngine.Vector2, spread: UnityEngine.Vector2, color: UnityEngine.Color, inset?: boolean);
      offset: UnityEngine.Vector2;
      spread: UnityEngine.Vector2;
      color: UnityEngine.Color;
      blur: UnityEngine.Vector2;
      inset: boolean;
      Valid: boolean;
      Definition: string;
      static ColorParser: ReactUnity.Converters.ColorConverter;
      static FloatParser: ReactUnity.Converters.FloatConverter;
      static Invalid: ReactUnity.Types.BoxShadow;
      static Default: ReactUnity.Types.BoxShadow;
      static DefaultInset: ReactUnity.Types.BoxShadow;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ICommaSeparatedListItem {
      Definition: string;
      Valid: boolean;
    }
    export class CommaSeparatedList<T = any> {
      constructor(item: T);
      constructor(items: T[]);
      constructor(definition: string);
      Definition: string;
      Items: T[];
      Any: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class CursorList {
      constructor(definition: string);
      constructor(item: ReactUnity.Types.Cursor);
      constructor(items: ReactUnity.Types.Cursor[]);
      Definition: string;
      Items: ReactUnity.Types.Cursor[];
      Any: boolean;
      static Default: ReactUnity.Types.CursorList;
      static None: ReactUnity.Types.CursorList;
      static Pointer: ReactUnity.Types.CursorList;
      static Text: ReactUnity.Types.CursorList;
      GetWebGLDefinition(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Cursor {
      constructor(definition: string);
      Offset: UnityEngine.Vector2;
      Name: string;
      Image: ReactUnity.Types.ImageReference;
      Definition: string;
      Valid: boolean;
      static Default: ReactUnity.Types.Cursor;
      static None: ReactUnity.Types.Cursor;
      static Pointer: ReactUnity.Types.Cursor;
      static Text: ReactUnity.Types.Cursor;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FontSource {
      constructor();
      constructor(other: ReactUnity.Types.FontSource);
      constructor(font: UnityEngine.Font);
      constructor(font: any);
      Valid: boolean;
      Font: UnityEngine.Font;
      TmpFontAsset: any; // TMPro.TMP_FontAsset
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FontReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.FontReference;
      Get(context: ReactUnity.ReactContext, callback: ((arg0: ReactUnity.Types.FontSource) => void)): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.ImageReference;
      Dispose(): void;
      Get(context: ReactUnity.ReactContext, callback: ((arg0: UnityEngine.Texture2D) => void)): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum ObjectFit {
      Fill = 0,
      Contain = 1,
      Cover = 2,
      None = 3,
      ScaleDown = 4,
    }
    export enum PointerEvents {
      Auto = 0,
      Visible = 0,
      All = 1,
      None = 2,
    }
    export enum PositionType {
      Relative = 0,
      Absolute = 1,
      Static = 2,
      Fixed = 3,
      Sticky = 4,
    }
    export class Url {
      constructor(fullUrl: string);
      Protocol: ReactUnity.Types.UrlProtocol;
      FullUrl: string;
      NormalizedUrl: string;
      HasKnownProtocol: boolean;
      GetData(): System.Byte[];
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum UrlProtocol {
      None = 0,
      Contextual = 1,
      Web = 2,
      Resource = 3,
      File = 4,
      Data = 5,
      Global = 6,
    }
    export class VideoComponentSource {
      constructor(other: ReactUnity.Types.VideoComponentSource);
      constructor(clip: UnityEngine.Video.VideoClip);
      constructor(url: string);
      Url: string;
      Clip: UnityEngine.Video.VideoClip;
      Type: UnityEngine.Video.VideoSource;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VideoReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.VideoReference;
      Get(context: ReactUnity.ReactContext, callback: ((arg0: ReactUnity.Types.VideoComponentSource) => void)): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class YogaValue2 {
      constructor(x: Facebook.Yoga.YogaValue, y: Facebook.Yoga.YogaValue);
      X: Facebook.Yoga.YogaValue;
      Y: Facebook.Yoga.YogaValue;
      static Zero: ReactUnity.Types.YogaValue2;
      static Auto: ReactUnity.Types.YogaValue2;
      static Center: ReactUnity.Types.YogaValue2;
      AsVector(): UnityEngine.Vector2;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToCSS(): string;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AudioReference_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BoxShadowList_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CursorList_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FontReference_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageReference_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VideoReference_Converter {
      constructor();
      Convert(value: any): any;
      FromString(value: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class YogaValue2_Converter {
      constructor();
      FromString(value: string): any;
      Convert(value: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace UGUI {
    export class AnchorComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      Disabled: boolean;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      url: string;
      openInThisTab: boolean;
      SetProperty(propertyName: string, value: any): void;
      OpenUrl(openInNewTab: boolean): void;
      Activate(): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag: string);
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      Graphic: UnityEngine.UI.MaskableGraphic;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseRenderTextureComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag: string);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ButtonComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      Button: UnityEngine.UI.Button;
      Disabled: boolean;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Activate(): void;
      Update(): void;
      DestroySelf(): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ContainerComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag: string);
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HostComponent {
      constructor(host: UnityEngine.RectTransform, context: ReactUnity.UGUI.UGUIContext);
      Width: number;
      Height: number;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class IconComponent {
      constructor(text: string, context: ReactUnity.UGUI.UGUIContext, tag: string);
      Text: any; // TMPro.TextMeshProUGUI
      Width: number;
      Height: number;
      Measurer: ReactUnity.UGUI.Behaviours.TextMeasurer;
      Content: string;
      Set: ReactUnity.Styling.IconSet;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ApplyText(text: string): void;
      SetText(text: string): void;
      ApplySet(value: any): void;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: UnityEngine.UI.Image;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class InputComponent {
      constructor(text: string, context: ReactUnity.UGUI.UGUIContext);
      Value: string;
      Disabled: boolean;
      ReadOnly: boolean;
      Placeholder: string;
      PlaceholderShown: boolean;
      InputField: any; // TMPro.TMP_InputField
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetText(text: string): void;
      ResolveStyle(recursive?: boolean): void;
      Focus(): void;
      Activate(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class LabelComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Activate(): boolean;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ObjectComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Update(): void;
      SetProperty(propertyName: string, value: any): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PortalComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      ShadowParent: ReactUnity.IReactComponent;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PrefabComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Instance: UnityEngine.GameObject;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      Update(): void;
      DestroySelf(): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RawImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: UnityEngine.UI.RawImage;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RenderComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScrollComponent {
      constructor(Context: ReactUnity.UGUI.UGUIContext);
      ScrollRect: UnityEngine.UI.ScrollRect;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SvgComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: UnityEngine.UI.Image;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextComponent {
      constructor(text: string, context: ReactUnity.UGUI.UGUIContext, tag: string);
      constructor(linkedTo: ReactUnity.UGUI.TextComponent);
      Text: any; // TMPro.TextMeshProUGUI
      Width: number;
      Height: number;
      Measurer: ReactUnity.UGUI.Behaviours.TextMeasurer;
      LinkedTextWatcher: ReactUnity.UGUI.Behaviours.LinkedTextWatcher;
      Content: string;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetText(text: string): void;
      DestroySelf(): void;
      Update(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ToggleComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      Value: any; // System.Object
      Toggle: UnityEngine.UI.Toggle;
      Checked: boolean;
      Indeterminate: boolean;
      Disabled: boolean;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Focus(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Activate(): void;
      Update(): void;
      DestroySelf(): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UGUIComponent {
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VideoComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ImageContainer: UnityEngine.GameObject;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.Styling.Internal.BorderAndBackground;
      MaskAndImage: ReactUnity.Styling.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      VideoPlayer: UnityEngine.Video.VideoPlayer;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      DestroySelf(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      Relayout(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.Styling.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EventHandlerMap {
      static GetEventType(eventName: string): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IEventHandler {
      ClearListeners(): void;
    }
    export class ReactUnityUGUI {
      constructor();
      Root: UnityEngine.RectTransform;
      MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      Context: ReactUnity.ReactContext;
      dispatcher: ReactUnity.Scheduling.IDispatcher;
      timer: ReactUnity.Scheduling.ITimer;
      runner: ReactUnity.ReactUnityRunner;
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
      CursorSet: ReactUnity.Styling.CursorSet;
      DefaultIconSet: ReactUnity.Styling.IconSet;
      IconSets: ReactUnity.Styling.IconSet[];
      Script: ReactUnity.ScriptSource;
      Debug: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
      Globals: ReactUnity.Helpers.SerializableDictionary;
      AutoRender: boolean;
      BeforeStart: ReactUnity.ReactUnityBase_ReactUnityRunnerEvent;
      AfterStart: ReactUnity.ReactUnityBase_ReactUnityRunnerEvent;
      Render(): void;
      IsInvoking(): boolean;
      CancelInvoke(): void;
      Invoke(methodName: string, time: number): void;
      InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
      CancelInvoke(methodName: string): void;
      IsInvoking(methodName: string): boolean;
      StartCoroutine(methodName: string): UnityEngine.Coroutine;
      StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
      StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
      StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
      StopCoroutine(routine: System.Collections.IEnumerator): void;
      StopCoroutine(routine: UnityEngine.Coroutine): void;
      StopCoroutine(methodName: string): void;
      StopAllCoroutines(): void;
      GetComponent(type: System.Type): UnityEngine.Component;
      GetComponent(type: string): UnityEngine.Component;
      GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
      GetComponentInChildren(t: System.Type): UnityEngine.Component;
      GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
      GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
      GetComponentInParent(t: System.Type): UnityEngine.Component;
      GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
      GetComponentsInParent(t: System.Type): UnityEngine.Component[];
      GetComponents(type: System.Type): UnityEngine.Component[];
      GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
      CompareTag(tag: string): boolean;
      SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
      SendMessageUpwards(methodName: string, value: any): void;
      SendMessageUpwards(methodName: string): void;
      SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
      SendMessage(methodName: string, value: any): void;
      SendMessage(methodName: string): void;
      SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
      SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
      BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
      BroadcastMessage(methodName: string, parameter: any): void;
      BroadcastMessage(methodName: string): void;
      BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
      GetInstanceID(): number;
      GetHashCode(): number;
      Equals(other: any): boolean;
      ToString(): string;
      GetType(): System.Type;
    }
    export class StylingHelpers {
      static GetStyleFloat(style: ReactUnity.Styling.NodeStyle, prop: any): number;
      static GetStyleFloatDouble(style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any): number;
      static GetStyleLength(style: ReactUnity.Styling.NodeStyle, prop: any): Facebook.Yoga.YogaValue;
      static GetStyleLengthDouble(style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any): Facebook.Yoga.YogaValue;
      static GetStyleLengthTriple(style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any, prop3: any): Facebook.Yoga.YogaValue;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UGUIContext {
      constructor(hostElement: UnityEngine.RectTransform, globals: ReactUnity.Helpers.GlobalRecord, script: ReactUnity.ScriptSource, dispatcher: ReactUnity.Scheduling.IDispatcher, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, isDevServer: boolean, onRestart: (() => void), iconSets: ReactUnity.Styling.IconSet[], defaultIconSet: ReactUnity.Styling.IconSet, cursorSet: ReactUnity.Styling.CursorSet);
      static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.UGUI.UGUIContext,ReactUnity.IReactComponent]]
      StateHandlers: Record<string, System.Type>;
      DefaultIconSet: ReactUnity.Styling.IconSet;
      IconSets: Record<string, ReactUnity.Styling.IconSet>;
      CursorSet: ReactUnity.Styling.CursorSet;
      CalculatesLayout: boolean;
      Host: ReactUnity.IHostComponent;
      Globals: ReactUnity.Helpers.GlobalRecord;
      IsDevServer: boolean;
      Script: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      Dispatcher: ReactUnity.Scheduling.IDispatcher;
      Location: ReactUnity.DomProxies.Location;
      MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      CursorAPI: ReactUnity.Helpers.CursorAPI;
      static defaultCreator: ((arg0: string, arg1: string, arg2: ReactUnity.UGUI.UGUIContext) => ReactUnity.UGUI.UGUIComponent);
      static textCreator: ((arg0: string, arg1: ReactUnity.UGUI.UGUIContext) => ReactUnity.ITextComponent);
      OnRestart: (() => void);
      Parser: any; // ExCSS.StylesheetParser
      Style: ReactUnity.StyleEngine.StyleContext;
      Disposables: System.IDisposable[];
      CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreateText(text: string): ReactUnity.ITextComponent;
      CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
      PlayAudio(clip: UnityEngine.AudioClip): void;
      InsertStyle(style: string, importanceOffset?: number): ReactUnity.StyleEngine.StyleSheet;
      InsertStyle(sheet: ReactUnity.StyleEngine.StyleSheet): ReactUnity.StyleEngine.StyleSheet;
      RemoveStyle(sheet: ReactUnity.StyleEngine.StyleSheet): void;
      ResolvePath(path: string): string;
      CreateStaticScript(path: string): ReactUnity.ScriptSource;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Behaviours {
      export class CalculateSizeFromContents {
        constructor();
        Layout: Facebook.Yoga.YogaNode;
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
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ImageMeasurer {
        constructor();
        FitMode: ReactUnity.Types.ObjectFit;
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
        Layout: Facebook.Yoga.YogaNode;
        Context: ReactUnity.UGUI.UGUIContext;
        MarkDirty(): void;
        Measure(node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode): Facebook.Yoga.YogaSize;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class LinkedTextWatcher {
        constructor();
        WatchedText: ReactUnity.UGUI.TextComponent;
        LinkedText: ReactUnity.UGUI.TextComponent;
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
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PrefabTarget {
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
        MountedTo: ReactUnity.UGUI.PrefabComponent;
        OnMount: ReactUnity.UGUI.Behaviours.PrefabTarget_PrefabEvent;
        OnUnmount: ReactUnity.UGUI.Behaviours.PrefabTarget_PrefabEvent;
        OnSetProperty: ReactUnity.Helpers.SetPropertyEvent;
        OnSetEventListener: ReactUnity.Helpers.SetEventListenerEvent;
        Mount(cmp: ReactUnity.UGUI.PrefabComponent): void;
        Unmount(cmp: ReactUnity.UGUI.PrefabComponent): void;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        SetProperty(propertyName: string, value: any): boolean;
        IsActive(): boolean;
        IsDestroyed(): boolean;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export interface IPrefabTarget {
        SetProperty(propertyName: string, value: any): boolean;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        Mount(cmp: ReactUnity.UGUI.PrefabComponent): void;
        Unmount(cmp: ReactUnity.UGUI.PrefabComponent): void;
      }
      export class ReactElement {
        constructor();
        Layout: Facebook.Yoga.YogaNode;
        Component: ReactUnity.UGUI.UGUIComponent;
        Translate: ReactUnity.Types.YogaValue2;
        PositionType: ReactUnity.Types.PositionType;
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
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ReactReplacedElement {
        constructor();
        Layout: Facebook.Yoga.YogaNode;
        Position: ReactUnity.Types.YogaValue2;
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
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ResponsiveElement {
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
        Layout: Facebook.Yoga.YogaNode;
        Context: ReactUnity.UGUI.UGUIContext;
        Restart(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class TextMeasurer {
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
        Layout: Facebook.Yoga.YogaNode;
        Context: ReactUnity.UGUI.UGUIContext;
        Measure(node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode): Facebook.Yoga.YogaSize;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PrefabTarget_PrefabEvent {
        constructor();
        AddListener(call: UnityEngine.Events.UnityAction<ReactUnity.UGUI.PrefabComponent, ReactUnity.UGUI.Behaviours.PrefabTarget>): void;
        RemoveListener(call: UnityEngine.Events.UnityAction<ReactUnity.UGUI.PrefabComponent, ReactUnity.UGUI.Behaviours.PrefabTarget>): void;
        Invoke(arg0: ReactUnity.UGUI.PrefabComponent, arg1: ReactUnity.UGUI.Behaviours.PrefabTarget): void;
        GetPersistentEventCount(): number;
        GetPersistentTarget(index: number): UnityEngine.Object;
        GetPersistentMethodName(index: number): string;
        SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
        RemoveAllListeners(): void;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
    }
    export namespace EventHandlers {
      export class BeginDragHandler {
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
        OnBeginDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class CancelHandler {
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
        OnCancel(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class DeselectHandler {
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
        OnDeselect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class DragHandler {
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
        OnDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class DropHandler {
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
        OnDrop(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class EndDragHandler {
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
        OnEndDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class KeyDownHandler {
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
        OnSelect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        OnDeselect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class KeyEventData {
        constructor(eventSystem: UnityEngine.EventSystems.EventSystem, inputSystem?: boolean);
        currentInputModule: UnityEngine.EventSystems.BaseInputModule;
        selectedObject: UnityEngine.GameObject;
        used: boolean;
        key: string;
        input: System.Type;
        inputSystem: boolean;
        Reset(): void;
        Use(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MoveHandler {
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
        OnMove(eventData: UnityEngine.EventSystems.AxisEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PointerClickHandler {
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
        OnPointerClick(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PointerDownHandler {
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
        OnPointerDown(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PointerEnterHandler {
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
        OnPointerEnter(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PointerExitHandler {
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
        OnPointerExit(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PointerUpHandler {
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
        OnPointerUp(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class PotentialDragHandler {
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
        OnInitializePotentialDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ResizeHandler {
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
        ClearListeners(): void;
        IsActive(): boolean;
        IsDestroyed(): boolean;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ResizeEventData {
        constructor(eventSystem: UnityEngine.EventSystems.EventSystem);
        currentInputModule: UnityEngine.EventSystems.BaseInputModule;
        selectedObject: UnityEngine.GameObject;
        used: boolean;
        Reset(): void;
        Use(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ScrollHandler {
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
        OnScroll(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class SelectHandler {
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
        OnSelect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class SubmitHandler {
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
        OnSubmit(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class UpdateSelectedHandler {
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
        OnUpdateSelected(eventData: UnityEngine.EventSystems.BaseEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
    }
    export namespace StateHandlers {
      export class ActiveStateHandler {
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
        ClearListeners(): void;
        OnPointerDown(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnPointerUp(eventData: UnityEngine.EventSystems.PointerEventData): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class CursorHandler {
        constructor();
        Cursor: ReactUnity.Types.CursorList;
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
        Context: ReactUnity.ReactContext;
        Component: ReactUnity.IReactComponent;
        OnPointerEnter(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnPointerExit(eventData: UnityEngine.EventSystems.PointerEventData): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class FocusStateHandler {
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
        ClearListeners(): void;
        OnSelect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        OnDeselect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class FocusVisibleStateHandler {
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
        ClearListeners(): void;
        OnSelect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        OnDeselect(eventData: UnityEngine.EventSystems.BaseEventData): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class FocusWithinStateHandler {
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
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
      export class HoverStateHandler {
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
        OnPointerEnter(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnPointerExit(eventData: UnityEngine.EventSystems.PointerEventData): void;
        ClearListeners(): void;
        IsInvoking(): boolean;
        CancelInvoke(): void;
        Invoke(methodName: string, time: number): void;
        InvokeRepeating(methodName: string, time: number, repeatRate: number): void;
        CancelInvoke(methodName: string): void;
        IsInvoking(methodName: string): boolean;
        StartCoroutine(methodName: string): UnityEngine.Coroutine;
        StartCoroutine(methodName: string, value: any): UnityEngine.Coroutine;
        StartCoroutine(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StartCoroutine_Auto(routine: System.Collections.IEnumerator): UnityEngine.Coroutine;
        StopCoroutine(routine: System.Collections.IEnumerator): void;
        StopCoroutine(routine: UnityEngine.Coroutine): void;
        StopCoroutine(methodName: string): void;
        StopAllCoroutines(): void;
        GetComponent(type: System.Type): UnityEngine.Component;
        GetComponent(type: string): UnityEngine.Component;
        GetComponentInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component;
        GetComponentInChildren(t: System.Type): UnityEngine.Component;
        GetComponentsInChildren(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInChildren(t: System.Type): UnityEngine.Component[];
        GetComponentInParent(t: System.Type): UnityEngine.Component;
        GetComponentsInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component[];
        GetComponentsInParent(t: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type): UnityEngine.Component[];
        GetComponents(type: System.Type, results: UnityEngine.Component[]): void;
        CompareTag(tag: string): boolean;
        SendMessageUpwards(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessageUpwards(methodName: string, value: any): void;
        SendMessageUpwards(methodName: string): void;
        SendMessageUpwards(methodName: string, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, value: any): void;
        SendMessage(methodName: string): void;
        SendMessage(methodName: string, value: any, options: UnityEngine.SendMessageOptions): void;
        SendMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any, options: UnityEngine.SendMessageOptions): void;
        BroadcastMessage(methodName: string, parameter: any): void;
        BroadcastMessage(methodName: string): void;
        BroadcastMessage(methodName: string, options: UnityEngine.SendMessageOptions): void;
        GetInstanceID(): number;
        GetHashCode(): number;
        Equals(other: any): boolean;
        ToString(): string;
        GetType(): System.Type;
      }
    }
  }
  export namespace UIToolkit {
    export class AnchorComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext);
      Element: UnityEngine.UIElements.Button;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      url: string;
      SetProperty(propertyName: string, value: any): void;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseFieldComponent<TElementType = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: TElementType;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      DestroySelf(): void;
      Relayout(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BindableComponent<TElementType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: TElementType;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ButtonComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: T;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      DestroySelf(): void;
      Relayout(): void;
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HostComponent {
      constructor(element: UnityEngine.UIElements.VisualElement, ctx: ReactUnity.UIToolkit.UIToolkitContext);
      Width: number;
      Height: number;
      Element: UnityEngine.UIElements.VisualElement;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: UnityEngine.UIElements.Image;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class IMGUIComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext);
      Element: UnityEngine.UIElements.IMGUIContainer;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      MarkDirtyLayout(): void;
      MarkDirtyRepaint(): void;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RangeComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext);
      Element: UnityEngine.UIElements.MinMaxSlider;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): UnityEngine.Vector2;
      SetValue(value: UnityEngine.Vector2): void;
      SetValueWithoutNotify(value: UnityEngine.Vector2): void;
      DestroySelf(): void;
      Relayout(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseSliderComponent<S = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: S;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      DestroySelf(): void;
      Relayout(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextComponent<TElementType = any> {
      constructor(text: string, context: ReactUnity.UIToolkit.UIToolkitContext, tag: string, isContainer?: boolean);
      Content: string;
      Element: TElementType;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetText(text: string): void;
      SetProperty(property: string, value: any): void;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ToggleComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: T;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): boolean;
      SetValue(value: boolean): void;
      SetValueWithoutNotify(value: boolean): void;
      DestroySelf(): void;
      Relayout(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IUIToolkitComponent<T = any> {
      Element: T;
    }
    export class UIToolkitComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string, isContainer?: boolean);
      Element: T;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      DestroySelf(): void;
      Relayout(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ValueComponent<TElementType = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: TElementType;
      Name: string;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      AfterRules: ReactUnity.StyleEngine.RuleTreeNode<ReactUnity.StyleEngine.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      DestroySelf(): void;
      Relayout(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Destroy(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Visitors.ReactComponentVisitor): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EventHandlerMap {
      static GetEventType(eventName: string): System.Type;
      static GetEventMethods(eventName: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ReactUnityElement {
      constructor(script: ReactUnity.ScriptSource, globals: ReactUnity.Helpers.GlobalRecord, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, engineType?: ReactUnity.ScriptEngine.JavascriptEngineType, debug?: boolean, awaitDebugger?: boolean, autorun?: boolean);
      [key: string]: any;
      runner: ReactUnity.ReactUnityRunner;
      context: ReactUnity.ReactContext;
      dispatcher: ReactUnity.Scheduling.IDispatcher;
      Timer: ReactUnity.Scheduling.ITimer;
      MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      Script: ReactUnity.ScriptSource;
      Globals: ReactUnity.Helpers.GlobalRecord;
      EngineType: ReactUnity.ScriptEngine.JavascriptEngineType;
      viewDataKey: string;
      userData: any; // System.Object
      canGrabFocus: boolean;
      focusController: UnityEngine.UIElements.FocusController;
      usageHints: UnityEngine.UIElements.UsageHints;
      transform: UnityEngine.UIElements.ITransform;
      layout: UnityEngine.Rect;
      contentRect: UnityEngine.Rect;
      worldBound: UnityEngine.Rect;
      localBound: UnityEngine.Rect;
      worldTransform: UnityEngine.Matrix4x4;
      pickingMode: UnityEngine.UIElements.PickingMode;
      name: string;
      enabledInHierarchy: boolean;
      enabledSelf: boolean;
      visible: boolean;
      generateVisualContent: ((arg0: UnityEngine.UIElements.MeshGenerationContext) => void);
      experimental: UnityEngine.UIElements.IExperimentalFeatures;
      hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
      cacheAsBitmap: boolean;
      parent: UnityEngine.UIElements.VisualElement;
      panel: UnityEngine.UIElements.IPanel;
      contentContainer: UnityEngine.UIElements.VisualElement;
      childCount: number;
      schedule: UnityEngine.UIElements.IVisualElementScheduler;
      style: UnityEngine.UIElements.IStyle;
      customStyle: UnityEngine.UIElements.ICustomStyle;
      styleSheets: UnityEngine.UIElements.VisualElementStyleSheetSet;
      tooltip: string;
      resolvedStyle: UnityEngine.UIElements.IResolvedStyle;
      focusable: boolean;
      tabIndex: number;
      delegatesFocus: boolean;
      Debug: boolean;
      AwaitDebugger: boolean;
      Run(): void;
      Destroy(): void;
      Restart(): void;
      Focus(): void;
      SendEvent(e: UnityEngine.UIElements.EventBase): void;
      SetEnabled(value: boolean): void;
      MarkDirtyRepaint(): void;
      ContainsPoint(localPoint: UnityEngine.Vector2): boolean;
      Overlaps(rectangle: UnityEngine.Rect): boolean;
      ToString(): string;
      GetClasses(): System.Collections.Generic.IEnumerable<string>;
      ClearClassList(): void;
      AddToClassList(className: string): void;
      RemoveFromClassList(className: string): void;
      ToggleInClassList(className: string): void;
      EnableInClassList(className: string, enable: boolean): void;
      ClassListContains(cls: string): boolean;
      FindAncestorUserData(): any;
      Add(child: UnityEngine.UIElements.VisualElement): void;
      Insert(index: number, element: UnityEngine.UIElements.VisualElement): void;
      Remove(element: UnityEngine.UIElements.VisualElement): void;
      RemoveAt(index: number): void;
      Clear(): void;
      ElementAt(index: number): UnityEngine.UIElements.VisualElement;
      IndexOf(element: UnityEngine.UIElements.VisualElement): number;
      Children(): System.Collections.Generic.IEnumerable<UnityEngine.UIElements.VisualElement>;
      Sort(comp: System.Comparison<UnityEngine.UIElements.VisualElement>): void;
      BringToFront(): void;
      SendToBack(): void;
      PlaceBehind(sibling: UnityEngine.UIElements.VisualElement): void;
      PlaceInFront(sibling: UnityEngine.UIElements.VisualElement): void;
      RemoveFromHierarchy(): void;
      Contains(child: UnityEngine.UIElements.VisualElement): boolean;
      FindCommonAncestor(other: UnityEngine.UIElements.VisualElement): UnityEngine.UIElements.VisualElement;
      Blur(): void;
      HandleEvent(evt: UnityEngine.UIElements.EventBase): void;
      HasTrickleDownHandlers(): boolean;
      HasBubbleUpHandlers(): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class ResourcesHelper {
      static DefaultFont: UnityEngine.Font;
      static UtilityStylesheet: UnityEngine.UIElements.StyleSheet;
      static UseragentStylesheet: UnityEngine.TextAsset;
      static UtilityCursorClassPrefix: string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StylingHelpers {
      static TextAlignMap: any; // System.Collections.Generic.Dictionary`2[TMPro.TextAlignmentOptions,UnityEngine.TextAnchor]
      static YogaValueToStyleLength(value: Facebook.Yoga.YogaValue): UnityEngine.UIElements.StyleLength;
      static StyleLengthToYogaValue(value: UnityEngine.UIElements.StyleLength): Facebook.Yoga.YogaValue;
      static NormalizeFloat(value: number): number;
      static ConvertFontStyle(style: any, weight: any): UnityEngine.FontStyle;
      static GetStyleColor(style: ReactUnity.Styling.NodeStyle, prop: any): UnityEngine.UIElements.StyleColor;
      static GetStyleFloat(style: ReactUnity.Styling.NodeStyle, prop: any): UnityEngine.UIElements.StyleFloat;
      static GetStyleFloatDouble(style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any): UnityEngine.UIElements.StyleFloat;
      static GetStyleLength(style: ReactUnity.Styling.NodeStyle, prop: any): UnityEngine.UIElements.StyleLength;
      static GetStyleLengthDouble(style: ReactUnity.Styling.NodeStyle, prop: any, prop2: any): UnityEngine.UIElements.StyleLength;
      static GetStyleBorderRadius(style: ReactUnity.Styling.NodeStyle, prop: any): UnityEngine.UIElements.StyleLength;
      static GetStyleBorderColor(style: ReactUnity.Styling.NodeStyle, prop: any): UnityEngine.UIElements.StyleColor;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UIToolkitContext {
      constructor(hostElement: UnityEngine.UIElements.VisualElement, globals: ReactUnity.Helpers.GlobalRecord, script: ReactUnity.ScriptSource, dispatcher: ReactUnity.Scheduling.IDispatcher, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.StyleEngine.IMediaProvider, isDevServer: boolean, onRestart?: (() => void), onAudioPlayback?: ((arg0: UnityEngine.AudioClip) => void));
      StateHandlers: Record<string, System.Type>;
      CalculatesLayout: boolean;
      Host: ReactUnity.IHostComponent;
      Globals: ReactUnity.Helpers.GlobalRecord;
      IsDevServer: boolean;
      Script: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      Dispatcher: ReactUnity.Scheduling.IDispatcher;
      Location: ReactUnity.DomProxies.Location;
      MediaProvider: ReactUnity.StyleEngine.IMediaProvider;
      CursorSet: ReactUnity.Styling.CursorSet;
      CursorAPI: ReactUnity.Helpers.CursorAPI;
      static defaultCreator: ((arg0: string, arg1: string, arg2: ReactUnity.UIToolkit.UIToolkitContext) => any);
      static textCreator: ((arg0: string, arg1: ReactUnity.UIToolkit.UIToolkitContext) => ReactUnity.ITextComponent);
      static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.UIToolkit.UIToolkitContext,ReactUnity.IReactComponent]]
      OnRestart: (() => void);
      Parser: any; // ExCSS.StylesheetParser
      Style: ReactUnity.StyleEngine.StyleContext;
      Disposables: System.IDisposable[];
      CreateText(text: string): ReactUnity.ITextComponent;
      CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
      PlayAudio(clip: UnityEngine.AudioClip): void;
      InsertStyle(style: string, importanceOffset?: number): ReactUnity.StyleEngine.StyleSheet;
      InsertStyle(sheet: ReactUnity.StyleEngine.StyleSheet): ReactUnity.StyleEngine.StyleSheet;
      RemoveStyle(sheet: ReactUnity.StyleEngine.StyleSheet): void;
      ResolvePath(path: string): string;
      CreateStaticScript(path: string): ReactUnity.ScriptSource;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace StateHandlers {
      export class ActiveStateHandler {
        constructor();
        activators: UnityEngine.UIElements.ManipulatorActivationFilter[];
        target: UnityEngine.UIElements.VisualElement;
        ClearListeners(): void;
        OnPointerDown(eventData: UnityEngine.UIElements.MouseDownEvent): void;
        OnPointerUp(eventData: UnityEngine.UIElements.MouseUpEvent): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FocusStateHandler {
        constructor();
        activators: UnityEngine.UIElements.ManipulatorActivationFilter[];
        target: UnityEngine.UIElements.VisualElement;
        ClearListeners(): void;
        OnSelect(eventData: UnityEngine.UIElements.FocusEvent): void;
        OnDeselect(eventData: UnityEngine.UIElements.BlurEvent): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class HoverStateHandler {
        constructor();
        activators: UnityEngine.UIElements.ManipulatorActivationFilter[];
        target: UnityEngine.UIElements.VisualElement;
        ClearListeners(): void;
        OnPointerEnter(eventData: UnityEngine.UIElements.MouseEnterEvent): void;
        OnPointerLeave(eventData: UnityEngine.UIElements.MouseLeaveEvent): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Visitors {
    export class ReactComponentVisitor {
      Visit(component: ReactUnity.IReactComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
}
