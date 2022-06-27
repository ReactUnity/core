//
// Types in assemblies: ReactUnity, ReactUnity.Editor, ReactUnity.UGUI, ReactUnity.UIToolkit
// Generated 27/06/2022 23:11:23
//
/* eslint-disable */

import { InlineStyleRemap } from '../properties/style';
import { System } from './system';
import { UnityEngine } from './unity';
import { Facebook } from './yoga';


type Byte = number;

export declare namespace ReactUnity {
  export class BaseReactComponent<ContextType = any> {
    Context: ContextType;
    Parent: ReactUnity.IContainerComponent;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    Layout: Facebook.Yoga.YogaNode;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    StyleState: ReactUnity.Styling.StyleState;
    StateStyles: ReactUnity.Styling.StateStyles;
    Style: InlineStyleRemap;
    InlineStylesheet: ReactUnity.Styling.StyleSheet;
    ParentIndex: number;
    CurrentOrder: number;
    Entering: boolean;
    Leaving: boolean;
    Destroyed: boolean;
    IsPseudoElement: boolean;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    Id: string;
    Name: string;
    RefId: number;
    IsContainer: boolean;
    Children: ReactUnity.IReactComponent[];
    BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    ScrollLeft: number;
    ScrollTop: number;
    ScrollWidth: number;
    ScrollHeight: number;
    ClientWidth: number;
    ClientHeight: number;
    Update(): void;
    MarkForStyleResolving(recursive: boolean): void;
    Remove(): void;
    Destroy(recursive?: boolean): void;
    SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    SetData(propertyName: string, value: any): void;
    SetProperty(propertyName: string, value: any): void;
    ResolveStyle(recursive?: boolean): void;
    MarkForStyleResolvingWithSiblings(recursive: boolean): void;
    UpdateOrder(prev: number, current: number): boolean;
    ApplyStyles(): void;
    ApplyLayoutStyles(): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
    AddBefore(): void;
    RemoveBefore(): void;
    AddAfter(): void;
    RemoveAfter(): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    Clear(): void;
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
    Destroyed: boolean;
    Entering: boolean;
    Leaving: boolean;
    Layout: Facebook.Yoga.YogaNode;
    StyleState: ReactUnity.Styling.StyleState;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    Style: ReactUnity.Styling.InlineStyles;
    InlineStylesheet: ReactUnity.Styling.StyleSheet;
    Id: string;
    Name: string;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    ParentIndex: number;
    CurrentOrder: number;
    RefId: number;
    ScrollLeft: number;
    ScrollTop: number;
    ScrollWidth: number;
    ScrollHeight: number;
    ClientWidth: number;
    ClientHeight: number;
    ApplyLayoutStyles(): void;
    ResolveStyle(recursive?: boolean): void;
    Update(): void;
    Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
    SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetProperty(property: string, value: any): void;
    SetData(property: string, value: any): void;
    SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    MarkForStyleResolving(recursive: boolean): void;
    MarkForStyleResolvingWithSiblings(recursive: boolean): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Remove(): void;
    Destroy(recursive?: boolean): void;
  }
  export interface IContainerComponent extends ReactUnity.IReactComponent {
    Children: ReactUnity.IReactComponent[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    Clear(): void;
  }
  export interface ITextComponent extends ReactUnity.IReactComponent {
    Content: string;
    SetText(text: string): void;
  }
  export interface IHostComponent extends ReactUnity.IContainerComponent, ReactUnity.IReactComponent {
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
  export enum EventPriority {
    Unknown = 0,
    Discrete = 1,
    Continuous = 4,
    Default = 16,
    Idle = 536870912,
  }
  export interface IStateHandler {
    ClearListeners(): void;
  }
  export class NoopComponent {
    constructor(ctx: ReactUnity.ReactContext, tag: string);
    Context: ReactUnity.ReactContext;
    Parent: ReactUnity.IContainerComponent;
    IsPseudoElement: boolean;
    Destroyed: boolean;
    Entering: boolean;
    Leaving: boolean;
    Layout: Facebook.Yoga.YogaNode;
    StyleState: ReactUnity.Styling.StyleState;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    Style: ReactUnity.Styling.InlineStyles;
    InlineStylesheet: ReactUnity.Styling.StyleSheet;
    Id: string;
    RefId: number;
    Name: string;
    Tag: string;
    TextContent: string;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    ParentIndex: number;
    CurrentOrder: number;
    ScrollLeft: number;
    ScrollTop: number;
    ScrollWidth: number;
    ScrollHeight: number;
    ClientWidth: number;
    ClientHeight: number;
    Width: number;
    Height: number;
    Children: ReactUnity.IReactComponent[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    Content: string;
    ApplyLayoutStyles(): void;
    ResolveStyle(recursive?: boolean): void;
    Update(): void;
    Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
    SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetProperty(property: string, value: any): void;
    SetData(property: string, value: any): void;
    MarkForStyleResolving(recursive: boolean): void;
    MarkForStyleResolvingWithSiblings(recursive: boolean): void;
    Remove(): void;
    Clear(): void;
    Destroy(recursive?: boolean): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    SetText(text: string): void;
    SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ProxyComponent {
    constructor(cmp: ReactUnity.IContainerComponent);
    Proxy: ReactUnity.IContainerComponent;
    Context: ReactUnity.ReactContext;
    Parent: ReactUnity.IContainerComponent;
    IsPseudoElement: boolean;
    Destroyed: boolean;
    Entering: boolean;
    Leaving: boolean;
    Layout: Facebook.Yoga.YogaNode;
    StyleState: ReactUnity.Styling.StyleState;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    Style: ReactUnity.Styling.InlineStyles;
    InlineStylesheet: ReactUnity.Styling.StyleSheet;
    Id: string;
    Name: string;
    Tag: string;
    TextContent: string;
    RefId: number;
    ClassName: string;
    Content: string;
    ClassList: ReactUnity.Helpers.ClassList;
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    ParentIndex: number;
    CurrentOrder: number;
    ScrollLeft: number;
    ScrollTop: number;
    ScrollWidth: number;
    ScrollHeight: number;
    ClientWidth: number;
    ClientHeight: number;
    Children: ReactUnity.IReactComponent[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    ApplyLayoutStyles(): void;
    ResolveStyle(recursive?: boolean): void;
    Update(): void;
    Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
    SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetProperty(property: string, value: any): void;
    SetData(property: string, value: any): void;
    SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    MarkForStyleResolving(recursive: boolean): void;
    MarkForStyleResolvingWithSiblings(recursive: boolean): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Remove(): void;
    Destroy(recursive?: boolean): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    SetText(text: string): void;
    Clear(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ReactContext {
    constructor(options: ReactUnity.ReactContext_Options);
    CalculatesLayout: boolean;
    Host: ReactUnity.IHostComponent;
    DetachedRoots: System.Collections.Generic.HashSet<ReactUnity.IReactComponent>;
    Globals: ReactUnity.Helpers.GlobalRecord;
    IsDisposed: boolean;
    IsEditorContext: boolean;
    options: ReactUnity.ReactContext_Options;
    Source: ReactUnity.ScriptSource;
    Timer: ReactUnity.Scheduling.ITimer;
    Dispatcher: ReactUnity.Scheduling.IDispatcher;
    StateHandlers: Record<string, System.Type>;
    Location: ReactUnity.Scripting.DomProxies.Location;
    LocalStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
    MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
    OnRestart: (() => void);
    StyleParser: any; // ExCSS.StylesheetParser
    Style: ReactUnity.Styling.StyleContext;
    Script: ReactUnity.Scripting.ScriptContext;
    Html: ReactUnity.Html.HtmlContext;
    CursorSet: ReactUnity.Styling.CursorSet;
    CursorAPI: ReactUnity.Helpers.CursorAPI;
    Disposables: (() => void)[];
    UpdateElementsRecursively(): void;
    InsertStyle(style: string): ReactUnity.Styling.StyleSheet;
    InsertStyle(style: string, importanceOffset: number): ReactUnity.Styling.StyleSheet;
    InsertStyle(sheet: ReactUnity.Styling.StyleSheet): ReactUnity.Styling.StyleSheet;
    RemoveStyle(sheet: ReactUnity.Styling.StyleSheet): void;
    ResolvePath(path: string): string;
    CreateStaticScript(path: string): ReactUnity.ScriptSource;
    CreateText(text: string): ReactUnity.ITextComponent;
    CreateDefaultComponent(tag: string, text: string): ReactUnity.IReactComponent;
    CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
    CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
    PlayAudio(clip: UnityEngine.AudioClip): void;
    Start(afterStart?: (() => void)): void;
    Dispose(): void;
    BindCommands(commandsObject: any, callbacksObject: any, getObjectCallback: any, getEventAsObjectCallback: any): void;
    SetRef(refId: number, cmp: ReactUnity.IReactComponent): void;
    GetRef(refId: number, ensureUpdate?: boolean): ReactUnity.IReactComponent;
    FlushCommands(serializedCommands?: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ReactUnityBase {
    MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
    Context: ReactUnity.ReactContext;
    timer: ReactUnity.Scheduling.ITimer;
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
    Source: ReactUnity.ScriptSource;
    Debug: boolean;
    AwaitDebugger: boolean;
    EngineType: ReactUnity.Scripting.JavascriptEngineType;
    Globals: ReactUnity.Helpers.SerializableDictionary;
    Stylesheets: UnityEngine.TextAsset[];
    AutoRender: boolean;
    BeforeStart: UnityEngine.Events.UnityEvent;
    AfterStart: UnityEngine.Events.UnityEvent;
    Render(): ReactUnity.ReactUnityBase_WaitForRenderToComplete;
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
    GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
    CurrentEventPriority: number;
    SetCurrentEventPriority(priority: ReactUnity.EventPriority): void;
    createText(text: string, host: ReactUnity.IReactComponent): ReactUnity.ITextComponent;
    createElement(tag: string, text: string, host: ReactUnity.IReactComponent, props?: any): ReactUnity.IReactComponent;
    appendChild(parent: any, child: any): void;
    appendChildToContainer(parent: any, child: any): void;
    insertBefore(parent: any, child: any, beforeChild: any): void;
    removeChild(parent: any, child: any): void;
    clearContainer(parent: any): void;
    setText(instance: any, text: string): void;
    setProperty(element: any, property: string, value: any): void;
    setData(element: any, property: string, value: any): void;
    setEventListener(element: any, eventType: string, value: any): void;
    addEventListener(element: any, eventType: string, value: any): (() => void);
    applyUpdate(instance: any, payload: any, type: string): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ScriptSource {
    constructor();
    constructor(source: ReactUnity.ScriptSource);
    ShouldUseDevServer: boolean;
    DevServerFile: string;
    FileName: string;
    IsDevServer: boolean;
    EffectiveScriptSource: ReactUnity.ScriptSourceType;
    Type: ReactUnity.ScriptSourceType;
    Language: ReactUnity.ScriptSourceLanguage;
    SourceAsset: UnityEngine.TextAsset;
    Watch: boolean;
    SourcePath: string;
    SourceText: string;
    ResourcesPath: string;
    UseDevServer: ReactUnity.ScriptSource_DevServerType;
    DevServer: string;
    static Resource(path: string): ReactUnity.ScriptSource;
    static Text(path: string): ReactUnity.ScriptSource;
    GetResolvedSourceUrl(useDevServer?: boolean): string;
    GetScript(callback: ((obj: string) => void), dispatcher?: ReactUnity.Scheduling.IDispatcher, useDevServer?: boolean): System.IDisposable;
    static WatchFileSystem(path: string, callback: ((obj: string) => void)): System.IDisposable;
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
  export enum ScriptSourceLanguage {
    JavaScript = 0,
    Html = 1,
  }
  export class SourceProxyComponent {
    constructor(cmp: ReactUnity.IContainerComponent);
    constructor(ctx: ReactUnity.ReactContext, tag: string);
    Content: string;
    ResolvedContent: string;
    Source: any; // System.Object
    Proxy: ReactUnity.IContainerComponent;
    Context: ReactUnity.ReactContext;
    Parent: ReactUnity.IContainerComponent;
    IsPseudoElement: boolean;
    Destroyed: boolean;
    Entering: boolean;
    Leaving: boolean;
    Layout: Facebook.Yoga.YogaNode;
    StyleState: ReactUnity.Styling.StyleState;
    ComputedStyle: ReactUnity.Styling.NodeStyle;
    Style: ReactUnity.Styling.InlineStyles;
    InlineStylesheet: ReactUnity.Styling.StyleSheet;
    Id: string;
    Name: string;
    Tag: string;
    TextContent: string;
    RefId: number;
    ClassName: string;
    ClassList: ReactUnity.Helpers.ClassList;
    StateStyles: ReactUnity.Styling.StateStyles;
    Data: ReactUnity.Helpers.WatchableObjectRecord;
    ParentIndex: number;
    CurrentOrder: number;
    ScrollLeft: number;
    ScrollTop: number;
    ScrollWidth: number;
    ScrollHeight: number;
    ClientWidth: number;
    ClientHeight: number;
    Children: ReactUnity.IReactComponent[];
    BeforePseudo: ReactUnity.IReactComponent;
    AfterPseudo: ReactUnity.IReactComponent;
    BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
    SetProperty(propertyName: string, value: any): void;
    ApplyLayoutStyles(): void;
    ResolveStyle(recursive?: boolean): void;
    Update(): void;
    Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
    SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
    SetData(property: string, value: any): void;
    SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
    AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
    FireEvent(eventName: string, arg: any): void;
    GetComponent(type: System.Type): any;
    AddComponent(type: System.Type): any;
    MarkForStyleResolving(recursive: boolean): void;
    MarkForStyleResolvingWithSiblings(recursive: boolean): void;
    Matches(query: string): boolean;
    Closest(query: string): ReactUnity.IReactComponent;
    QuerySelector(query: string): ReactUnity.IReactComponent;
    QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
    Remove(): void;
    Destroy(recursive?: boolean): void;
    RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
    UnregisterChild(child: ReactUnity.IReactComponent): void;
    SetText(text: string): void;
    Clear(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
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
  export class ReactContext_Options {
    constructor();
    CalculatesLayout: boolean;
    Globals: ReactUnity.Helpers.SerializableDictionary;
    Source: ReactUnity.ScriptSource;
    Timer: ReactUnity.Scheduling.ITimer;
    MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
    OnRestart: (() => void);
    EngineType: ReactUnity.Scripting.JavascriptEngineType;
    Debug: boolean;
    AwaitDebugger: boolean;
    BeforeStart: (() => void);
    AfterStart: (() => void);
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class ReactUnityBase_WaitForRenderToComplete {
    constructor();
    rendered: boolean;
    keepWaiting: boolean;
    Current: any; // System.Object
    MoveNext(): boolean;
    Reset(): void;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export enum ScriptSource_DevServerType {
    Never = 0,
    InEditor = 1,
    Always = 2,
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
    export class DevToolsWindow {
      constructor();
      Context: ReactUnity.ReactContext;
      HostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
      DebugEnabled: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Timer: ReactUnity.Scheduling.ITimer;
      AutoRun: boolean;
      rootVisualElement: UnityEngine.UIElements.VisualElement;
      overlayCanvas: any; // UnityEditor.Overlays.OverlayCanvas
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
      AddPlayModeStateChange(cb: any): (() => void);
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
    export class QuickStartWindow {
      constructor();
      static ShowWindowOnStartup: boolean;
      static ShowEngineWarningOnStartup: boolean;
      NodeVersion: number;
      Context: ReactUnity.ReactContext;
      HostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
      DebugEnabled: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Timer: ReactUnity.Scheduling.ITimer;
      AutoRun: boolean;
      rootVisualElement: UnityEngine.UIElements.VisualElement;
      overlayCanvas: any; // UnityEditor.Overlays.OverlayCanvas
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
      static WindowVersion: string;
      static ScopeName: string;
      static ScopeUrl: string;
      static CompanyScope: string;
      static PackageName: string;
      RequiredNodeVersion: number;
      NodeUrl: string;
      ProjectDirName: string;
      PackageVersion: string;
      LatestVersion: string;
      HasUpdate: boolean;
      static ShowDefaultWindow(): void;
      GetProjectFullPath(): string;
      GetProjectPath(): string;
      CreateProject(): void;
      GetNodeVersion(callback: ((obj: number) => void)): void;
      RunCommand(target: string, args: string, hasOutput?: boolean): System.Diagnostics.Process;
      CanvasExistsInScene(): boolean;
      CreateCanvas(): void;
      SelectCanvas(): void;
      CheckVersion(packageName: string, callback: ((currentVersion: string, latestVersion: string, hasUpdate: boolean) => void)): void;
      InstallScopedPlugin(packageName: string): void;
      InstallUnityPlugin(pluginName: string): void;
      UninstallUnityPlugin(pluginName: string): void;
      Run(root?: UnityEngine.UIElements.VisualElement): void;
      Restart(root?: UnityEngine.UIElements.VisualElement): void;
      AddSelectionChange(cb: any): (() => void);
      AddPlayModeStateChange(cb: any): (() => void);
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
    export class PackageManagerHelpers {
      static ManifestPath: string;
      static AddScopedRegistry(name: string, url: string, ...scopesToAdd: string[]): void;
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
    export class QuickStartWindow_CheckVersionCallback {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(currentVersion: string, latestVersion: string, hasUpdate: boolean): void;
      BeginInvoke(currentVersion: string, latestVersion: string, hasUpdate: boolean, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    export namespace Developer {
      export class TypescriptModelsGenerator {
        constructor();
        Assemblies: System.Reflection.Assembly[];
        IncludedNamespaces: string[];
        ExcludedNamespaces: string[];
        ExcludedTypes: string[];
        ImportNamespaces: Record<string, string>;
        Remaps: Record<string, string>;
        ExportAsClass: boolean;
        AllowGeneric: boolean;
        AllowIndexer: boolean;
        AllowPointer: boolean;
        WriteDocs: boolean;
        IncludeExterns: boolean;
        static GenerateUnity(): void;
        static GenerateEditor(): void;
        static GenerateReactUnity(): void;
        static GenerateYoga(): void;
        static GenerateSystem(): void;
        static GenerateQuickJS(): void;
        static GenerateCurrentProject(): void;
        PickFileAndGenerate(): string;
        GenerateTo(filePath: string): void;
        GetTypescript(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Renderer {
      export class EditorContext {
        constructor(options: ReactUnity.Editor.Renderer.EditorContext_Options);
        Window: ReactUnity.Editor.Renderer.ReactWindow;
        Inspector: ReactUnity.Editor.Renderer.ReactInspector;
        Property: ReactUnity.Editor.Renderer.ReactProperty;
        static UseragentStylesheet: UnityEngine.TextAsset;
        IsEditorContext: boolean;
        StateHandlers: Record<string, System.Type>;
        HostElement: UnityEngine.UIElements.VisualElement;
        CalculatesLayout: boolean;
        Host: ReactUnity.IHostComponent;
        DetachedRoots: System.Collections.Generic.HashSet<ReactUnity.IReactComponent>;
        Globals: ReactUnity.Helpers.GlobalRecord;
        IsDisposed: boolean;
        options: ReactUnity.ReactContext_Options;
        Source: ReactUnity.ScriptSource;
        Timer: ReactUnity.Scheduling.ITimer;
        Dispatcher: ReactUnity.Scheduling.IDispatcher;
        Location: ReactUnity.Scripting.DomProxies.Location;
        LocalStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
        MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
        OnRestart: (() => void);
        StyleParser: any; // ExCSS.StylesheetParser
        Style: ReactUnity.Styling.StyleContext;
        Script: ReactUnity.Scripting.ScriptContext;
        Html: ReactUnity.Html.HtmlContext;
        CursorSet: ReactUnity.Styling.CursorSet;
        CursorAPI: ReactUnity.Helpers.CursorAPI;
        Disposables: (() => void)[];
        static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.Editor.Renderer.EditorContext,ReactUnity.UIToolkit.IUIToolkitComponent`1[UnityEngine.UIElements.VisualElement]]]
        Initialize(): void;
        CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
        PlayAudio(clip: UnityEngine.AudioClip): void;
        CreateText(text: string): ReactUnity.ITextComponent;
        CreateDefaultComponent(tag: string, text: string): ReactUnity.IReactComponent;
        CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
        UpdateElementsRecursively(): void;
        InsertStyle(style: string): ReactUnity.Styling.StyleSheet;
        InsertStyle(style: string, importanceOffset: number): ReactUnity.Styling.StyleSheet;
        InsertStyle(sheet: ReactUnity.Styling.StyleSheet): ReactUnity.Styling.StyleSheet;
        RemoveStyle(sheet: ReactUnity.Styling.StyleSheet): void;
        ResolvePath(path: string): string;
        CreateStaticScript(path: string): ReactUnity.ScriptSource;
        Start(afterStart?: (() => void)): void;
        Dispose(): void;
        BindCommands(commandsObject: any, callbacksObject: any, getObjectCallback: any, getEventAsObjectCallback: any): void;
        SetRef(refId: number, cmp: ReactUnity.IReactComponent): void;
        GetRef(refId: number, ensureUpdate?: boolean): ReactUnity.IReactComponent;
        FlushCommands(serializedCommands?: string): void;
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
        Context: ReactUnity.ReactContext;
        HostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
        DebugEnabled: boolean;
        AwaitDebugger: boolean;
        EngineType: ReactUnity.Scripting.JavascriptEngineType;
        Timer: ReactUnity.Scheduling.ITimer;
        AutoRun: boolean;
        rootVisualElement: UnityEngine.UIElements.VisualElement;
        overlayCanvas: any; // UnityEditor.Overlays.OverlayCanvas
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
        AddPlayModeStateChange(cb: any): (() => void);
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
        Context: ReactUnity.ReactContext;
        HostElement: ReactUnity.Editor.UIToolkit.ReactUnityEditorElement;
        DebugEnabled: boolean;
        AwaitDebugger: boolean;
        EngineType: ReactUnity.Scripting.JavascriptEngineType;
        Timer: ReactUnity.Scheduling.ITimer;
        AutoRun: boolean;
        rootVisualElement: UnityEngine.UIElements.VisualElement;
        overlayCanvas: any; // UnityEditor.Overlays.OverlayCanvas
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
        AddPlayModeStateChange(cb: any): (() => void);
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
      export class EditorContext_Options {
        constructor();
        CalculatesLayout: boolean;
        Window: ReactUnity.Editor.Renderer.ReactWindow;
        Inspector: ReactUnity.Editor.Renderer.ReactInspector;
        Property: ReactUnity.Editor.Renderer.ReactProperty;
        HostElement: UnityEngine.UIElements.VisualElement;
        OnAudioPlayback: ((obj: UnityEngine.AudioClip) => void);
        Globals: ReactUnity.Helpers.SerializableDictionary;
        Source: ReactUnity.ScriptSource;
        Timer: ReactUnity.Scheduling.ITimer;
        MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
        OnRestart: (() => void);
        EngineType: ReactUnity.Scripting.JavascriptEngineType;
        Debug: boolean;
        AwaitDebugger: boolean;
        BeforeStart: (() => void);
        AfterStart: (() => void);
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace UIToolkit {
      export class DialogComponent {
        constructor(context: ReactUnity.Editor.Renderer.EditorContext, tag?: string);
        Name: string;
        TargetElement: UnityEngine.UIElements.VisualElement;
        Element: ReactUnity.Editor.UIToolkit.DialogElement;
        ClientWidth: number;
        ClientHeight: number;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        InlineStylesheet: ReactUnity.Styling.StyleSheet;
        ParentIndex: number;
        CurrentOrder: number;
        Entering: boolean;
        Leaving: boolean;
        Destroyed: boolean;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        RefId: number;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        ScrollLeft: number;
        ScrollTop: number;
        ScrollWidth: number;
        ScrollHeight: number;
        Open(): void;
        Close(): void;
        SetProperty(property: string, value: any): void;
        AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        UpdateOrder(prev: number, current: number): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Remove(): void;
        Destroy(recursive?: boolean): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        ResolveStyle(recursive?: boolean): void;
        MarkForStyleResolvingWithSiblings(recursive: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Clear(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum DialogType {
        Default = 0,
        Modal = 1,
        Utility = 2,
        ModalUtility = 3,
        Aux = 4,
        Popup = 5,
        Tab = 6,
      }
      export class DialogWindow {
        constructor();
        rootVisualElement: UnityEngine.UIElements.VisualElement;
        overlayCanvas: any; // UnityEditor.Overlays.OverlayCanvas
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
        static Create(): ReactUnity.Editor.UIToolkit.DialogWindow;
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
      export class DialogElement {
        constructor();
        [key: string]: any;
        contentContainer: UnityEngine.UIElements.VisualElement;
        Name: string;
        Maximized: boolean;
        Title: string;
        Shown: boolean;
        Type: ReactUnity.Editor.UIToolkit.DialogType;
        Context: ReactUnity.Editor.Renderer.EditorContext;
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
        generateVisualContent: ((obj: UnityEngine.UIElements.MeshGenerationContext) => void);
        experimental: UnityEngine.UIElements.IExperimentalFeatures;
        hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
        cacheAsBitmap: boolean;
        parent: UnityEngine.UIElements.VisualElement;
        panel: UnityEngine.UIElements.IPanel;
        visualTreeAssetSource: UnityEngine.UIElements.VisualTreeAsset;
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
        static DefaultMinWidth: number;
        static DefaultMinHeight: number;
        static DefaultMaxWidth: number;
        static DefaultMaxHeight: number;
        Window: ReactUnity.Editor.UIToolkit.DialogWindow;
        Show(type: ReactUnity.Editor.UIToolkit.DialogType): void;
        Close(): void;
        ResolveStyle(): void;
        static ResolveStyle(context: ReactUnity.Editor.Renderer.EditorContext, window: any, style: UnityEngine.UIElements.IStyle): void;
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
        Sort(comp: ((x: UnityEngine.UIElements.VisualElement, y: UnityEngine.UIElements.VisualElement) => number)): void;
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
      export class EditorHostComponent {
        constructor(element: UnityEngine.UIElements.VisualElement, ctx: ReactUnity.Editor.Renderer.EditorContext);
        Width: number;
        Height: number;
        Element: UnityEngine.UIElements.VisualElement;
        TargetElement: UnityEngine.UIElements.VisualElement;
        Name: string;
        ClientWidth: number;
        ClientHeight: number;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        InlineStylesheet: ReactUnity.Styling.StyleSheet;
        ParentIndex: number;
        CurrentOrder: number;
        Entering: boolean;
        Leaving: boolean;
        Destroyed: boolean;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        RefId: number;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        ScrollLeft: number;
        ScrollTop: number;
        ScrollWidth: number;
        ScrollHeight: number;
        ResolveStyle(recursive?: boolean): void;
        AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
        SetProperty(property: string, value: any): void;
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        UpdateOrder(prev: number, current: number): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Remove(): void;
        Destroy(recursive?: boolean): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        MarkForStyleResolvingWithSiblings(recursive: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Clear(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class EnumComponent<T = any> {
        constructor(context: ReactUnity.Editor.Renderer.EditorContext, tag: string);
        Indeterminate: boolean;
        Disabled: boolean;
        Value: System.Enum;
        Element: T;
        TargetElement: UnityEngine.UIElements.VisualElement;
        Name: string;
        ClientWidth: number;
        ClientHeight: number;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        InlineStylesheet: ReactUnity.Styling.StyleSheet;
        ParentIndex: number;
        CurrentOrder: number;
        Entering: boolean;
        Leaving: boolean;
        Destroyed: boolean;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        RefId: number;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        ScrollLeft: number;
        ScrollTop: number;
        ScrollWidth: number;
        ScrollHeight: number;
        SetProperty(property: string, value: any): void;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        ConvertValue(value: any): System.Enum;
        SetValue(value: System.Enum): void;
        SetValueWithoutNotify(value: System.Enum): void;
        Activate(): void;
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        UpdateOrder(prev: number, current: number): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Remove(): void;
        Destroy(recursive?: boolean): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        ResolveStyle(recursive?: boolean): void;
        MarkForStyleResolvingWithSiblings(recursive: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Clear(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ObjectComponent {
        constructor(context: ReactUnity.Editor.Renderer.EditorContext);
        Indeterminate: boolean;
        Disabled: boolean;
        Value: UnityEngine.Object;
        Element: any; // UnityEditor.UIElements.ObjectField
        TargetElement: UnityEngine.UIElements.VisualElement;
        Name: string;
        ClientWidth: number;
        ClientHeight: number;
        Context: ReactUnity.UIToolkit.UIToolkitContext;
        Parent: ReactUnity.IContainerComponent;
        Data: ReactUnity.Helpers.WatchableObjectRecord;
        Layout: Facebook.Yoga.YogaNode;
        ComputedStyle: ReactUnity.Styling.NodeStyle;
        StyleState: ReactUnity.Styling.StyleState;
        StateStyles: ReactUnity.Styling.StateStyles;
        Style: InlineStyleRemap;
        InlineStylesheet: ReactUnity.Styling.StyleSheet;
        ParentIndex: number;
        CurrentOrder: number;
        Entering: boolean;
        Leaving: boolean;
        Destroyed: boolean;
        IsPseudoElement: boolean;
        Tag: string;
        TextContent: string;
        ClassName: string;
        ClassList: ReactUnity.Helpers.ClassList;
        Id: string;
        RefId: number;
        IsContainer: boolean;
        Children: ReactUnity.IReactComponent[];
        BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        BeforePseudo: ReactUnity.IReactComponent;
        AfterPseudo: ReactUnity.IReactComponent;
        ScrollLeft: number;
        ScrollTop: number;
        ScrollWidth: number;
        ScrollHeight: number;
        SetProperty(property: string, value: any): void;
        AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
        ConvertValue(value: any): UnityEngine.Object;
        SetValue(value: UnityEngine.Object): void;
        SetValueWithoutNotify(value: UnityEngine.Object): void;
        Activate(): void;
        GetComponent(type: System.Type): any;
        AddComponent(type: System.Type): any;
        CaptureMouse(): void;
        ReleaseMouse(): void;
        HasMouseCapture(): boolean;
        UpdateOrder(prev: number, current: number): boolean;
        Update(): void;
        MarkForStyleResolving(recursive: boolean): void;
        Remove(): void;
        Destroy(recursive?: boolean): void;
        SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
        SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
        FireEvent(eventName: string, arg: any): void;
        SetData(propertyName: string, value: any): void;
        ResolveStyle(recursive?: boolean): void;
        MarkForStyleResolvingWithSiblings(recursive: boolean): void;
        ApplyStyles(): void;
        ApplyLayoutStyles(): void;
        Matches(query: string): boolean;
        Closest(query: string): ReactUnity.IReactComponent;
        QuerySelector(query: string): ReactUnity.IReactComponent;
        QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
        Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
        AddBefore(): void;
        RemoveBefore(): void;
        AddAfter(): void;
        RemoveAfter(): void;
        RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
        UnregisterChild(child: ReactUnity.IReactComponent): void;
        Clear(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ReactUnityEditorElement {
        constructor(script: ReactUnity.ScriptSource, globals: ReactUnity.Helpers.SerializableDictionary, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.Styling.Rules.IMediaProvider, engineType?: ReactUnity.Scripting.JavascriptEngineType, debug?: boolean, awaitDebugger?: boolean, autorun?: boolean);
        [key: string]: any;
        Window: ReactUnity.Editor.Renderer.ReactWindow;
        Inspector: ReactUnity.Editor.Renderer.ReactInspector;
        Property: ReactUnity.Editor.Renderer.ReactProperty;
        Context: ReactUnity.ReactContext;
        Timer: ReactUnity.Scheduling.ITimer;
        MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
        Script: ReactUnity.ScriptSource;
        Globals: ReactUnity.Helpers.SerializableDictionary;
        EngineType: ReactUnity.Scripting.JavascriptEngineType;
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
        generateVisualContent: ((obj: UnityEngine.UIElements.MeshGenerationContext) => void);
        experimental: UnityEngine.UIElements.IExperimentalFeatures;
        hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
        cacheAsBitmap: boolean;
        parent: UnityEngine.UIElements.VisualElement;
        panel: UnityEngine.UIElements.IPanel;
        contentContainer: UnityEngine.UIElements.VisualElement;
        visualTreeAssetSource: UnityEngine.UIElements.VisualTreeAsset;
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
        Sort(comp: ((x: UnityEngine.UIElements.VisualElement, y: UnityEngine.UIElements.VisualElement) => number)): void;
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
      constructor(callback: any, context?: ReactUnity.ReactContext);
      constructor(index: number, context: ReactUnity.ReactContext);
      callback: any; // System.Object
      static Noop: ReactUnity.Helpers.Callback;
      static From(value: any, context?: ReactUnity.ReactContext, thisVal?: any): ReactUnity.Helpers.Callback;
      Call(): any;
      Call(...args: any[]): any;
      CallWithPriority(priority: ReactUnity.EventPriority, ...args: any[]): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ClassList {
      constructor(component: ReactUnity.IReactComponent);
      Name: string;
      Count: number;
      IsReadOnly: boolean;
      GetArray(): string[];
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
      AddListener(call: ((arg0: string, arg1: any) => void)): void;
      RemoveListener(call: ((arg0: string, arg1: any) => void)): void;
      Invoke(arg0: string, arg1: any): void;
      GetPersistentEventCount(): number;
      GetPersistentTarget(index: number): UnityEngine.Object;
      GetPersistentMethodName(index: number): string;
      SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
      GetPersistentListenerState(index: number): UnityEngine.Events.UnityEventCallState;
      RemoveAllListeners(): void;
      ToString(): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class SetEventListenerEvent {
      constructor();
      AddListener(call: ((arg0: string, arg1: ReactUnity.Helpers.Callback) => void)): void;
      RemoveListener(call: ((arg0: string, arg1: ReactUnity.Helpers.Callback) => void)): void;
      Invoke(arg0: string, arg1: ReactUnity.Helpers.Callback): void;
      GetPersistentEventCount(): number;
      GetPersistentTarget(index: number): UnityEngine.Object;
      GetPersistentMethodName(index: number): string;
      SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
      GetPersistentListenerState(index: number): UnityEngine.Events.UnityEventCallState;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: string, arg2: any, arg3: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      GetValueOrDefault(key: string): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ReactInterop {
      constructor(engine: ReactUnity.Scripting.IJavaScriptEngine);
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
      Dispose(): void;
      Add(key: string, value: any): void;
      Clear(): void;
      ContainsKey(key: string): boolean;
      ContainsValue(value: any): boolean;
      GetEnumerator(): Record<string, any>;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      OnDeserialization(sender: any): void;
      Remove(key: string): boolean;
      TryAdd(key: string, value: any): boolean;
      EnsureCapacity(capacity: number): number;
      TrimExcess(): void;
      TrimExcess(capacity: number): void;
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
      AddReserializeListener(callback: ((obj: ReactUnity.Helpers.SerializableDictionary) => void)): (() => void);
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: string, arg2: any, arg3: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      GetValueOrDefault(key: string): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IWatchable<T = any> {
      Value: T;
      Change(): void;
      AddListener(cb: any): (() => void);
    }
    export class Watchable<T = any> {
      constructor();
      constructor(value: T);
      Value: T;
      Change(): void;
      AddListener(cb: any): (() => void);
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: TKey, arg2: T, arg3: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      GetValueOrDefault(key: TKey): T;
      Dispose(): void;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: TKey, arg2: T, arg3: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      GetValueOrDefault(key: TKey): T;
      Dispose(): void;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: TKey, arg2: T, arg3: ReactUnity.Helpers.WatchableDictionary<TKey, T>) => void)): (() => void);
      GetValueOrDefault(key: TKey): T;
      Dispose(): void;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: string, arg2: T, arg3: ReactUnity.Helpers.WatchableDictionary<string, T>) => void)): (() => void);
      GetValueOrDefault(key: string): T;
      Dispose(): void;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: string, arg2: any, arg3: ReactUnity.Helpers.WatchableDictionary<string, any>) => void)): (() => void);
      GetValueOrDefault(key: string): any;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class WatchableSet<T = any> {
      constructor();
      Count: number;
      IsReadOnly: boolean;
      GetArray(): T[];
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
    export class YogaHelpers {
      static HasValue(val: Facebook.Yoga.YogaValue): boolean;
      static IfPoint(val: Facebook.Yoga.YogaValue, elseValue?: number): number;
      static IfPercent(val: Facebook.Yoga.YogaValue, elseValue?: number): number;
      static GetPointValue(val: Facebook.Yoga.YogaValue, fullSize: number, defaultValue?: number): number;
      static GetRatioValue(val: Facebook.Yoga.YogaValue, fullSize: number, defaultValue?: number): number;
      static GetPointValue(val: ReactUnity.Types.YogaValue2, fullSize: UnityEngine.Vector2, defaultValue?: number, yInverted?: boolean): UnityEngine.Vector2;
      static GetPointValue(val: ReactUnity.Types.YogaValue2, fullSize: UnityEngine.Vector2, defaultValue?: UnityEngine.Vector2, yInverted?: boolean): UnityEngine.Vector2;
      static GetRatioValue(val: ReactUnity.Types.YogaValue2, fullSize: UnityEngine.Vector2, defaultValue?: number, yInverted?: boolean): UnityEngine.Vector2;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Visitors {
      export class ReactComponentVisitor {
        Visit(component: ReactUnity.IReactComponent): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Html {
    export class HtmlComponent {
      constructor(ctx: ReactUnity.ReactContext, tag?: string, text?: string);
      Content: string;
      ResolvedContent: string;
      Source: any; // System.Object
      Proxy: ReactUnity.IContainerComponent;
      Context: ReactUnity.ReactContext;
      Parent: ReactUnity.IContainerComponent;
      IsPseudoElement: boolean;
      Destroyed: boolean;
      Entering: boolean;
      Leaving: boolean;
      Layout: Facebook.Yoga.YogaNode;
      StyleState: ReactUnity.Styling.StyleState;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      Style: ReactUnity.Styling.InlineStyles;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      Id: string;
      Name: string;
      Tag: string;
      TextContent: string;
      RefId: number;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      StateStyles: ReactUnity.Styling.StateStyles;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      ParentIndex: number;
      CurrentOrder: number;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      ClientWidth: number;
      ClientHeight: number;
      Children: ReactUnity.IReactComponent[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      SetProperty(propertyName: string, value: any): void;
      ApplyLayoutStyles(): void;
      ResolveStyle(recursive?: boolean): void;
      Update(): void;
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      SetParent(parent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetData(property: string, value: any): void;
      SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
      AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
      FireEvent(eventName: string, arg: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Remove(): void;
      Destroy(recursive?: boolean): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      SetText(text: string): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HtmlContext {
      constructor(context: ReactUnity.ReactContext);
      Context: ReactUnity.ReactContext;
      Parser: ReactUnity.Html.HtmlParser;
      InsertHtml(html: string, root?: ReactUnity.IContainerComponent, clearContent?: boolean): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HtmlParser {
      constructor(context: ReactUnity.Html.HtmlContext);
      Context: ReactUnity.Html.HtmlContext;
      Parse(html: string, root: ReactUnity.IContainerComponent): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Scheduling {
    export class BaseDispatcher<CoroutineType = any> {
      Scheduler: ReactUnity.Scheduling.IScheduler;
      OnEveryLateUpdate(callback: (() => void)): number;
      OnEveryUpdate(callback: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
      Dispose(): void;
      Update(): void;
      LateUpdate(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
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
    export class CurrentLifecycle {
      constructor();
      State: string;
      StateID: number;
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
      state: string;
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
      GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
    export class DefaultScheduler {
      constructor(dispatcher: ReactUnity.Scheduling.IDispatcher, context: ReactUnity.ReactContext);
      setTimeout(callback: any, timeout: number): number;
      setInterval(callback: any, timeout: number): number;
      clearTimeout(handle: number): void;
      clearInterval(handle: number): void;
      setImmediate(callback: any): number;
      requestAnimationFrame(callback: any): number;
      cancelAnimationFrame(handle: number): void;
      clearImmediate(handle: number): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class EditorDispatcher {
      constructor(ctx: ReactUnity.ReactContext);
      Scheduler: ReactUnity.Scheduling.IScheduler;
      Dispose(): void;
      OnEveryLateUpdate(callback: (() => void)): number;
      OnEveryUpdate(callback: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
      Update(): void;
      LateUpdate(): void;
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
      setImmediate(callback: any): number;
      setTimeout(callback: any, timeout: number): number;
      setInterval(callback: any, timeout: number): number;
      requestAnimationFrame(callback: any): number;
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
      setTimeout(callback: any, timeout: number): number;
      setInterval(callback: any, timeout: number): number;
      setImmediate(callback: any): number;
      requestAnimationFrame(callback: any): number;
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
    export class RuntimeDispatcherBehavior {
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
      static Create(ctx: ReactUnity.ReactContext): ReactUnity.Scheduling.RuntimeDispatcherBehavior_RuntimeDispatcher;
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
      GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
    export class RuntimeDispatcherBehavior_RuntimeDispatcher {
      constructor(ctx: ReactUnity.ReactContext, behavior: ReactUnity.Scheduling.RuntimeDispatcherBehavior);
      CurrentLifecycle: ReactUnity.Scheduling.CurrentLifecycle;
      Scheduler: ReactUnity.Scheduling.IScheduler;
      Behavior: ReactUnity.Scheduling.RuntimeDispatcherBehavior;
      Dispose(): void;
      OnEveryLateUpdate(callback: (() => void)): number;
      OnEveryUpdate(callback: (() => void)): number;
      OnceUpdate(callback: (() => void)): number;
      OnceLateUpdate(callback: (() => void)): number;
      Timeout(callback: (() => void), timeSeconds: number): number;
      AnimationFrame(callback: (() => void)): number;
      Interval(callback: (() => void), intervalSeconds: number): number;
      Immediate(callback: (() => void)): number;
      StartDeferred(cr: System.Collections.IEnumerator): number;
      StartDeferred(cr: System.Collections.IEnumerator, handle: number): number;
      StopDeferred(cr: number): void;
      Update(): void;
      LateUpdate(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace Scripting {
    export class ClearScriptEngine {
      constructor(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean);
      Key: string;
      Capabilities: ReactUnity.Scripting.EngineCapabilities;
      Engine: any; // Microsoft.ClearScript.V8.V8ScriptEngine
      NativeEngine: any; // System.Object
      Evaluate(code: string, fileName?: string): any;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      GetGlobal(key: string): any;
      DeleteGlobal(key: string): void;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      CreateScriptObject(props: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, any>>): any;
      Dispose(): void;
      TraverseScriptObject(obj: any): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      IsScriptObject(obj: any): boolean;
      Update(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ClearScriptEngineFactory {
      constructor();
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean, onInitialize: ((obj: ReactUnity.Scripting.IJavaScriptEngine) => void)): ReactUnity.Scripting.IJavaScriptEngine;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum EngineCapabilities {
      None = 0,
      Fetch = 1,
      XHR = 2,
      WebSocket = 4,
      Console = 8,
      Scheduler = 16,
      Base64 = 32,
      URL = 64,
    }
    export enum JavascriptEngineType {
      Auto = 0,
      Jint = 1,
      ClearScript = 2,
      QuickJS = 3,
    }
    export interface IJavaScriptEngine {
      Key: string;
      NativeEngine: any; // System.Object
      Capabilities: ReactUnity.Scripting.EngineCapabilities;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      Evaluate(code: string, fileName?: string): any;
      GetGlobal(key: string): any;
      DeleteGlobal(key: string): void;
      CreateScriptObject(props: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, any>>): any;
      IsScriptObject(obj: any): boolean;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      TraverseScriptObject(obj: any): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      Update(): void;
    }
    export interface IJavaScriptEngineFactory {
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean, onInitialize: ((obj: ReactUnity.Scripting.IJavaScriptEngine) => void)): ReactUnity.Scripting.IJavaScriptEngine;
    }
    export class JintEngine {
      constructor(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean);
      Key: string;
      Engine: any; // Jint.Engine
      NativeEngine: any; // System.Object
      Capabilities: ReactUnity.Scripting.EngineCapabilities;
      Evaluate(code: string, fileName?: string): any;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      GetGlobal(key: string): any;
      DeleteGlobal(key: string): void;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      CreateScriptObject(props: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, any>>): any;
      Dispose(): void;
      TraverseScriptObject(obj: any): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      IsScriptObject(obj: any): boolean;
      Update(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class JintEngineFactory {
      constructor();
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean, onInitialize: ((obj: ReactUnity.Scripting.IJavaScriptEngine) => void)): ReactUnity.Scripting.IJavaScriptEngine;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class JintExtensions {
      static RunContinuations(engine: any): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class JintTypeConverter {
      constructor(context: ReactUnity.ReactContext, engine: any);
      Convert(value: any, type: System.Type, formatProvider: System.IFormatProvider): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickJSApiBridge {
      constructor();
      static KeyForCSharpIdentity: string;
      GetPayloadHeader(context: any, val: any): any;
      NewBridgeObject(context: any, o: any, proto: any): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickJSConverters {
      static RegisterAllConverters(): void;
      static js_push_array(ctx: any, o: System.Array): any;
      static js_push_delegate(ctx: any, o: System.Delegate): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickJSEngine {
      constructor(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean, onInitialize: ((obj: ReactUnity.Scripting.IJavaScriptEngine) => void));
      Key: string;
      NativeEngine: any; // System.Object
      Capabilities: ReactUnity.Scripting.EngineCapabilities;
      Runtime: any; // QuickJS.ScriptRuntime
      MainContext: any; // QuickJS.ScriptContext
      Global: any; // QuickJS.ScriptValue
      ObjectKeys: any; // QuickJS.ScriptFunction
      TypeDB: any; // QuickJS.Utils.ITypeDB
      ObjectCache: any; // QuickJS.Utils.ObjectCache
      static InvokeReflectBinding(runtime: any): void;
      Evaluate(code: string, fileName?: string): any;
      Execute(code: string, fileName?: string): void;
      TryExecute(code: string, fileName?: string): System.Exception;
      GetGlobal(key: string): any;
      DeleteGlobal(key: string): void;
      CreateNativeValue(v: any): any;
      CreateTypeReference(type: System.Type): any;
      CreateNamespaceReference(ns: string, ...assemblies: System.Reflection.Assembly[]): any;
      CreateScriptObject(props: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, any>>): any;
      Dispose(): void;
      TraverseScriptObject(obj: any): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      IsScriptObject(obj: any): boolean;
      Update(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickJSEngineFactory {
      constructor();
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Create(context: ReactUnity.ReactContext, debug: boolean, awaitDebugger: boolean, onInitialize: ((obj: ReactUnity.Scripting.IJavaScriptEngine) => void)): ReactUnity.Scripting.IJavaScriptEngine;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class QuickJSNamespaceReference {
      constructor(engine: ReactUnity.Scripting.QuickJSEngine, path: string, allowedAssemblies: System.Reflection.Assembly[]);
      [key: string]: any;
      Keys: System.Collections.Generic.ICollection<string>;
      Values: System.Collections.Generic.ICollection<any>;
      Count: number;
      IsReadOnly: boolean;
      Get(property: string): any;
      GetPath(path: string): any;
      ToString(): string;
      Add(key: string, value: any): void;
      ContainsKey(key: string): boolean;
      Remove(key: string): boolean;
      Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
      Clear(): void;
      Contains(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      CopyTo(array: System.Collections.Generic.KeyValuePair<string, any>[], arrayIndex: number): void;
      Remove(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
      GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class ScriptComponent {
      constructor(ctx: ReactUnity.ReactContext, tag?: string, text?: string);
      Content: string;
      ResolvedContent: string;
      Source: any; // System.Object
      Proxy: ReactUnity.IContainerComponent;
      Context: ReactUnity.ReactContext;
      Parent: ReactUnity.IContainerComponent;
      IsPseudoElement: boolean;
      Destroyed: boolean;
      Entering: boolean;
      Leaving: boolean;
      Layout: Facebook.Yoga.YogaNode;
      StyleState: ReactUnity.Styling.StyleState;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      Style: ReactUnity.Styling.InlineStyles;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      Id: string;
      Name: string;
      Tag: string;
      TextContent: string;
      RefId: number;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      StateStyles: ReactUnity.Styling.StateStyles;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      ParentIndex: number;
      CurrentOrder: number;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      ClientWidth: number;
      ClientHeight: number;
      Children: ReactUnity.IReactComponent[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      Execute(): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetProperty(propertyName: string, value: any): void;
      ApplyLayoutStyles(): void;
      ResolveStyle(recursive?: boolean): void;
      Update(): void;
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      SetData(property: string, value: any): void;
      SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
      AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
      FireEvent(eventName: string, arg: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Remove(): void;
      Destroy(recursive?: boolean): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      SetText(text: string): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScriptContext {
      constructor(context: ReactUnity.ReactContext, engineType: ReactUnity.Scripting.JavascriptEngineType, debug?: boolean, awaitDebugger?: boolean);
      Engine: ReactUnity.Scripting.IJavaScriptEngine;
      Interop: ReactUnity.Helpers.ReactInterop;
      Initialized: boolean;
      EngineInitialized: boolean;
      Debug: boolean;
      AwaitDebugger: boolean;
      Context: ReactUnity.ReactContext;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      EngineFactory: ReactUnity.Scripting.IJavaScriptEngineFactory;
      RunMainScript(script: string, beforeStart?: (() => void), afterStart?: (() => void)): void;
      Initialize(callback: (() => void)): void;
      ExecuteScript(code: string, fileName?: string): void;
      EvaluateScript(code: string, fileName?: string): any;
      CreateEventCallback(code: string, thisVal: any): ReactUnity.Helpers.Callback;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace DomProxies {
      export class ConsoleProxy {
        constructor(ctx: ReactUnity.ReactContext);
        log(msg: any, ...subs: any[]): void;
        info(msg: any, ...subs: any[]): void;
        debug(msg: any, ...subs: any[]): void;
        warn(msg: any, ...subs: any[]): void;
        error(msg: any, ...subs: any[]): void;
        dir(msg: any, ...subs: any[]): void;
        count(msg?: any): number;
        clear(): void;
        assert(val: boolean): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class DocumentProxy {
        constructor(context: ReactUnity.ReactContext, origin: string);
        documentElement: ReactUnity.Scripting.DomProxies.DocumentProxy;
        head: ReactUnity.Scripting.DomProxies.HeadProxy;
        Origin: string;
        Context: ReactUnity.ReactContext;
        nodeType: number;
        createElement(type: string): any;
        createTextNode(text: string): string;
        querySelector(query: string): any;
        querySelectorAll(query: string): any;
        getElementById(id: string): any;
        getElementsByTagName(tagName: string): ReactUnity.Scripting.DomProxies.IDomElementProxy[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export interface IDomElementProxy {
        tagName: string;
        OnAppend(): void;
        OnRemove(): void;
        setAttribute(key: any, value: any): void;
        removeAttribute(key: any): void;
        appendChild(text: string): void;
        removeChild(text: string): void;
      }
      export class DomElementProxyBase {
        tagName: string;
        nodeType: number;
        nextSibling: any; // System.Object
        id: string;
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
        tagName: string;
        Children: ReactUnity.Scripting.DomProxies.IDomElementProxy[];
        childNodes: ReactUnity.Scripting.DomProxies.IDomElementProxy[];
        nodeType: number;
        nextSibling: any; // System.Object
        id: string;
        appendChild(child: ReactUnity.Scripting.DomProxies.IDomElementProxy): void;
        removeChild(child: ReactUnity.Scripting.DomProxies.IDomElementProxy): void;
        insertBefore(child: ReactUnity.Scripting.DomProxies.IDomElementProxy, before: any): void;
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
        constructor(document: ReactUnity.Scripting.DomProxies.DocumentProxy);
        tagName: string;
        src: string;
        charset: string;
        crossOrigin: string;
        timeout: number;
        onload: any; // System.Object
        onerror: any; // System.Object
        nodeType: number;
        nextSibling: any; // System.Object
        document: ReactUnity.Scripting.DomProxies.DocumentProxy;
        parentNode: ReactUnity.Scripting.DomProxies.HeadProxy;
        id: string;
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
        constructor(document: ReactUnity.Scripting.DomProxies.DocumentProxy);
        tagName: string;
        childNodes: ReactUnity.Scripting.DomProxies.NodeList<string>;
        firstChild: string;
        lastChild: string;
        sheet: ReactUnity.Styling.StyleSheet;
        textContent: string;
        nodeType: number;
        nextSibling: any; // System.Object
        Sheet: ReactUnity.Styling.StyleSheet;
        styleSheet: ReactUnity.Scripting.DomProxies.StyleProxy_StyleSheetProxy;
        enabled: boolean;
        document: ReactUnity.Scripting.DomProxies.DocumentProxy;
        parentNode: ReactUnity.Scripting.DomProxies.HeadProxy;
        id: string;
        hasChildNodes(): boolean;
        OnAppend(): void;
        OnRemove(): void;
        setAttribute(key: any, value: any): void;
        removeAttribute(key: any): void;
        appendChild(text: string): void;
        removeChild(text: string): void;
        insertBefore(child: string, before: any): void;
        hasAttribute(key: any): boolean;
        getAttribute(key: any): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class LinkProxy {
        constructor(document: ReactUnity.Scripting.DomProxies.DocumentProxy);
        tagName: string;
        onload: any; // System.Object
        onerror: any; // System.Object
        nodeType: number;
        nextSibling: any; // System.Object
        document: ReactUnity.Scripting.DomProxies.DocumentProxy;
        parentNode: ReactUnity.Scripting.DomProxies.HeadProxy;
        rel: string;
        type: string;
        href: string;
        id: string;
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
        constructor(href: string);
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
        rawPathname: string;
        reload(): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NodeList<T = any> {
        constructor(values: T[]);
        [key: string]: any;
        Keys: System.Collections.Generic.ICollection<string>;
        Values: System.Collections.Generic.ICollection<any>;
        Count: number;
        IsReadOnly: boolean;
        Add(key: string, value: any): void;
        Add(item: System.Collections.Generic.KeyValuePair<string, any>): void;
        Clear(): void;
        Contains(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
        ContainsKey(key: string): boolean;
        CopyTo(array: System.Collections.Generic.KeyValuePair<string, any>[], arrayIndex: number): void;
        GetEnumerator(): System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string, any>>;
        Remove(key: string): boolean;
        Remove(item: System.Collections.Generic.KeyValuePair<string, any>): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class URL {
        constructor(url: string);
        constructor(url: string, baseUrl: string);
        href: string;
        protocol: string;
        hostname: string;
        origin: string;
        host: string;
        port: string;
        search: string;
        hash: string;
        pathname: string;
        rawPathname: string;
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
        BeginInvoke(callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
        Invoke(data: Byte[]): void;
        BeginInvoke(data: Byte[], callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
        BeginInvoke(errorMsg: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
        Invoke(closeCode: ReactUnity.Scripting.DomProxies.WebSocketCloseCode, reason: string): void;
        BeginInvoke(closeCode: ReactUnity.Scripting.DomProxies.WebSocketCloseCode, reason: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
        Close(code?: ReactUnity.Scripting.DomProxies.WebSocketCloseCode, reason?: string): void;
        Send(data: Byte[]): void;
        GetState(): ReactUnity.Scripting.DomProxies.WebSocketState;
      }
      export class WebSocketHelpers {
        static ParseCloseCodeEnum(closeCode: number): ReactUnity.Scripting.DomProxies.WebSocketCloseCode;
        static GetErrorMessageFromCode(errorCode: number, inner: System.Exception): ReactUnity.Scripting.DomProxies.WebSocketException;
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
        Close(code?: ReactUnity.Scripting.DomProxies.WebSocketCloseCode, reason?: string): void;
        Send(data: Byte[]): void;
        GetState(): ReactUnity.Scripting.DomProxies.WebSocketState;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class WebSocketFactory {
        static CreateInstance(url: string): ReactUnity.Scripting.DomProxies.WebSocket;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class WebSocketProxy {
        constructor(context: ReactUnity.ReactContext, url: string);
        constructor(context: ReactUnity.ReactContext, url: string, ...protocols: string[]);
        onmessage: any; // System.Object
        onclose: any; // System.Object
        onopen: any; // System.Object
        onerror: any; // System.Object
        socket: ReactUnity.Scripting.DomProxies.WebSocket;
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
        send(o: System.Collections.Generic.IDictionary<string, any>): void;
        getAllResponseHeaders(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class StyleProxy_StyleSheetProxy {
        constructor(pr: ReactUnity.Scripting.DomProxies.StyleProxy);
        cssText: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
  }
  export namespace Styling {
    export class CssFunctions {
      static Calc: ReactUnity.Styling.ICssFunction;
      static Steps: ReactUnity.Styling.ICssFunction;
      static CubicBezier: ReactUnity.Styling.ICssFunction;
      static Url: ReactUnity.Styling.ICssFunction;
      static Resource: ReactUnity.Styling.ICssFunction;
      static Rgba: ReactUnity.Styling.ICssFunction;
      static Hsla: ReactUnity.Styling.ICssFunction;
      static Var: ReactUnity.Styling.ICssFunction;
      static Vector3: ReactUnity.Styling.ICssFunction;
      static LinearGradient: ReactUnity.Styling.ICssFunction;
      static RadialGradient: ReactUnity.Styling.ICssFunction;
      static ConicGradient: ReactUnity.Styling.ICssFunction;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ICssFunction {
      Name: string;
      CanHandleArguments(count: number, name: string, args: string[]): boolean;
      Call(name: string, args: string[], argsCombined: string, converter: ReactUnity.Styling.Converters.StyleConverterBase): any;
    }
    export enum CssKeyword {
      NoKeyword = 0,
      Initial = 2,
      Inherit = 3,
      Auto = 4,
      None = 5,
      Unset = 6,
      Default = 7,
    }
    export class CssProperties {
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      static TransitionableProperties: any; // System.Collections.Generic.HashSet`1[ReactUnity.Styling.IStyleProperty]
      static AllProperties: ReactUnity.Styling.IStyleProperty[];
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: string, arg2: ReactUnity.Styling.CursorPair, arg3: ReactUnity.Helpers.WatchableDictionary<string, ReactUnity.Styling.CursorPair>) => void)): (() => void);
      GetValueOrDefault(key: string): ReactUnity.Styling.CursorPair;
      Dispose(): void;
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
      AddListener(cb: any): (() => void);
      AddListener(listener: ((arg1: ReactUnity.Styling.IStyleProperty, arg2: any, arg3: ReactUnity.Helpers.WatchableDictionary<ReactUnity.Styling.IStyleProperty, any>) => void)): (() => void);
      GetValueOrDefault(key: ReactUnity.Styling.IStyleProperty): any;
      Dispose(): void;
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
      order: number;
      opacity: number;
      zIndex: number;
      visibility: boolean;
      position: ReactUnity.Types.PositionType;
      cursor: ReactUnity.Types.ICssValueList<ReactUnity.Types.Cursor>;
      pointerEvents: ReactUnity.Types.PointerEvents;
      borderTopLeftRadius: ReactUnity.Types.YogaValue2;
      borderTopRightRadius: ReactUnity.Types.YogaValue2;
      borderBottomLeftRadius: ReactUnity.Types.YogaValue2;
      borderBottomRightRadius: ReactUnity.Types.YogaValue2;
      borderLeftColor: UnityEngine.Color;
      borderRightColor: UnityEngine.Color;
      borderTopColor: UnityEngine.Color;
      borderBottomColor: UnityEngine.Color;
      boxShadow: ReactUnity.Types.ICssValueList<ReactUnity.Types.BoxShadow>;
      transformOrigin: ReactUnity.Types.YogaValue2;
      translate: ReactUnity.Types.YogaValue2;
      translateZ: Facebook.Yoga.YogaValue;
      scale: UnityEngine.Vector3;
      rotate: UnityEngine.Vector3;
      fontFamily: ReactUnity.Types.FontReference;
      color: UnityEngine.Color;
      fontWeight: any; // TMPro.FontWeight
      fontStyle: any; // TMPro.FontStyles
      textTransform: ReactUnity.Types.TextTransform;
      fontSize: number;
      lineHeight: number;
      letterSpacing: number;
      wordSpacing: number;
      textAlign: any; // TMPro.TextAlignmentOptions
      textOverflow: any; // TMPro.TextOverflowModes
      textWrap: boolean;
      maxLines: number;
      textStrokeWidth: number;
      textStrokeColor: UnityEngine.Color;
      content: string;
      appearance: ReactUnity.Types.Appearance;
      navigation: UnityEngine.UI.Navigation_Mode;
      stateDuration: number;
      objectFit: ReactUnity.Types.ObjectFit;
      objectPosition: ReactUnity.Types.YogaValue2;
      backgroundColor: UnityEngine.Color;
      backgroundImage: ReactUnity.Types.ICssValueList<ReactUnity.Types.ImageDefinition>;
      backgroundPositionX: ReactUnity.Types.ICssValueList<Facebook.Yoga.YogaValue>;
      backgroundPositionY: ReactUnity.Types.ICssValueList<Facebook.Yoga.YogaValue>;
      backgroundSize: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundSize>;
      backgroundRepeatX: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundRepeat>;
      backgroundRepeatY: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundRepeat>;
      backgroundBlendMode: ReactUnity.Types.BackgroundBlendMode;
      maskImage: ReactUnity.Types.ICssValueList<ReactUnity.Types.ImageDefinition>;
      maskPositionX: ReactUnity.Types.ICssValueList<Facebook.Yoga.YogaValue>;
      maskPositionY: ReactUnity.Types.ICssValueList<Facebook.Yoga.YogaValue>;
      maskSize: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundSize>;
      maskRepeatX: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundRepeat>;
      maskRepeatY: ReactUnity.Types.ICssValueList<ReactUnity.Types.BackgroundRepeat>;
      transitionProperty: ReactUnity.Types.ICssValueList<ReactUnity.Styling.Animations.TransitionProperty>;
      transitionDuration: ReactUnity.Types.ICssValueList<number>;
      transitionTimingFunction: ReactUnity.Types.ICssValueList<((value: number, start?: number, end?: number) => number)>;
      transitionDelay: ReactUnity.Types.ICssValueList<number>;
      transitionPlayState: ReactUnity.Types.ICssValueList<ReactUnity.Styling.Animations.AnimationPlayState>;
      motionDuration: number;
      motionTimingFunction: ((value: number, start?: number, end?: number) => number);
      motionDelay: number;
      animationDelay: ReactUnity.Types.ICssValueList<number>;
      animationDirection: ReactUnity.Types.ICssValueList<ReactUnity.Styling.Animations.AnimationDirection>;
      animationDuration: ReactUnity.Types.ICssValueList<number>;
      animationFillMode: ReactUnity.Types.ICssValueList<ReactUnity.Styling.Animations.AnimationFillMode>;
      animationIterationCount: ReactUnity.Types.ICssValueList<number>;
      animationName: ReactUnity.Types.ICssValueList<string>;
      animationPlayState: ReactUnity.Types.ICssValueList<ReactUnity.Styling.Animations.AnimationPlayState>;
      animationTimingFunction: ReactUnity.Types.ICssValueList<((value: number, start?: number, end?: number) => number)>;
      audioClip: ReactUnity.Types.ICssValueList<ReactUnity.Types.AudioReference>;
      audioIterationCount: ReactUnity.Types.ICssValueList<number>;
      audioDelay: ReactUnity.Types.ICssValueList<number>;
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
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
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
      static AspectRatio: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static FlexGrow: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static FlexShrink: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static FlexBasis: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Width: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static Height: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MinWidth: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MinHeight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MaxWidth: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
      static MaxHeight: any; // ReactUnity.Styling.LayoutProperty`1[Facebook.Yoga.YogaValue]
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
      static Order: any; // ReactUnity.Styling.LayoutProperty`1[System.Int32]
      static RowGap: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static ColumnGap: any; // ReactUnity.Styling.LayoutProperty`1[System.Single]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.ILayoutProperty]
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ILayoutProperty {
    }
    export class LayoutProperty<T = any> {
      constructor(name: string, transitionable?: boolean, defaultValue?: T, converter?: ReactUnity.Styling.Converters.StyleConverterBase);
      affectsLayout: boolean;
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      converter: ReactUnity.Styling.Converters.StyleConverterBase;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleProperties {
      static opacity: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static zIndex: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static visibility: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static position: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.PositionType]
      static cursor: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.Cursor]
      static pointerEvents: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.PointerEvents]
      static borderTopLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static borderTopRightRadius: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static borderBottomLeftRadius: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static borderBottomRightRadius: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static borderLeftColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderRightColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderTopColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static borderBottomColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static transformOrigin: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static translate: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static translateZ: any; // ReactUnity.Styling.StyleProperty`1[Facebook.Yoga.YogaValue]
      static scale: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Vector3]
      static rotate: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Vector3]
      static fontFamily: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.FontReference]
      static color: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static fontWeight: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontWeight]
      static fontStyle: any; // ReactUnity.Styling.StyleProperty`1[TMPro.FontStyles]
      static textTransform: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.TextTransform]
      static fontSize: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static lineHeight: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static letterSpacing: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static wordSpacing: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static textAlign: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextAlignmentOptions]
      static textOverflow: any; // ReactUnity.Styling.StyleProperty`1[TMPro.TextOverflowModes]
      static textWrap: any; // ReactUnity.Styling.StyleProperty`1[System.Boolean]
      static maxLines: any; // ReactUnity.Styling.StyleProperty`1[System.Int32]
      static textStrokeWidth: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static textStrokeColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static content: any; // ReactUnity.Styling.StyleProperty`1[System.String]
      static appearance: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.Appearance]
      static navigation: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.UI.Navigation+Mode]
      static stateDuration: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static objectFit: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.ObjectFit]
      static objectPosition: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.YogaValue2]
      static boxShadow: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BoxShadow]
      static backgroundColor: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static backgroundImage: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.ImageDefinition]
      static backgroundPositionX: any; // ReactUnity.Styling.ValueListStyleProperty`1[Facebook.Yoga.YogaValue]
      static backgroundPositionY: any; // ReactUnity.Styling.ValueListStyleProperty`1[Facebook.Yoga.YogaValue]
      static backgroundSize: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundSize]
      static backgroundRepeatX: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundRepeat]
      static backgroundRepeatY: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundRepeat]
      static backgroundBlendMode: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Types.BackgroundBlendMode]
      static maskImage: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.ImageDefinition]
      static maskPositionX: any; // ReactUnity.Styling.ValueListStyleProperty`1[Facebook.Yoga.YogaValue]
      static maskPositionY: any; // ReactUnity.Styling.ValueListStyleProperty`1[Facebook.Yoga.YogaValue]
      static maskSize: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundSize]
      static maskRepeatX: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundRepeat]
      static maskRepeatY: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.BackgroundRepeat]
      static transitionProperty: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.TransitionProperty]
      static transitionDuration: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Single]
      static transitionTimingFunction: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.TimingFunction]
      static transitionDelay: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Single]
      static transitionPlayState: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.AnimationPlayState]
      static motionDuration: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static motionTimingFunction: any; // ReactUnity.Styling.StyleProperty`1[ReactUnity.Styling.Animations.TimingFunction]
      static motionDelay: any; // ReactUnity.Styling.StyleProperty`1[System.Single]
      static animationDelay: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Single]
      static animationDirection: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.AnimationDirection]
      static animationDuration: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Single]
      static animationFillMode: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.AnimationFillMode]
      static animationIterationCount: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Int32]
      static animationName: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.String]
      static animationPlayState: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.AnimationPlayState]
      static animationTimingFunction: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Styling.Animations.TimingFunction]
      static audioClip: any; // ReactUnity.Styling.ValueListStyleProperty`1[ReactUnity.Types.AudioReference]
      static audioIterationCount: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Int32]
      static audioDelay: any; // ReactUnity.Styling.ValueListStyleProperty`1[System.Single]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleProperty<T = any> {
      constructor(name: string, initialValue?: any, transitionable?: boolean, inherited?: boolean, converter?: ReactUnity.Styling.Converters.StyleConverterBase);
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      affectsLayout: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      converter: ReactUnity.Styling.Converters.StyleConverterBase;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class SVGProperties {
      static fill: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static stroke: any; // ReactUnity.Styling.StyleProperty`1[UnityEngine.Color]
      static PropertyMap: any; // System.Collections.Generic.Dictionary`2[System.String,ReactUnity.Styling.IStyleProperty]
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ValueListStyleProperty<T = any> {
      constructor(name: string, initialValue: any, transitionable: boolean, inherited: boolean, converter: ReactUnity.Styling.Converters.StyleConverterBase);
      constructor(name: string, initialValue?: T[], transitionable?: boolean, inherited?: boolean, baseConverter?: ReactUnity.Styling.Converters.StyleConverterBase);
      constructor(name: string, emptyValue: T, transitionable?: boolean, inherited?: boolean, baseConverter?: ReactUnity.Styling.Converters.StyleConverterBase);
      Converter: ReactUnity.Types.CssValueList<T>;
      name: string;
      type: System.Type;
      defaultValue: any; // System.Object
      transitionable: boolean;
      inherited: boolean;
      affectsLayout: boolean;
      ModifiedProperties: ReactUnity.Styling.IStyleProperty[];
      converter: ReactUnity.Styling.Converters.StyleConverterBase;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
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
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      GetStyle(style: ReactUnity.Styling.NodeStyle): any;
      GetHashCode(): number;
      Equals(obj: any): boolean;
      Modify(collection: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, value: any): ReactUnity.Styling.IStyleProperty[];
      GetType(): System.Type;
      ToString(): string;
    }
    export class StateStyles {
      constructor(cmp: ReactUnity.IReactComponent);
      Subscribed: System.Collections.Generic.HashSet<string>;
      SubscribeToState(state: string): ReactUnity.IStateHandler;
      StartState(state: string): boolean;
      EndState(state: string): boolean;
      GetState(state: string): boolean;
      GetStateOrSubscribe(state: string): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleComponent {
      constructor(ctx: ReactUnity.ReactContext, tag?: string, text?: string);
      Scope: any; // System.Object
      Importance: number;
      Active: boolean;
      Sheet: ReactUnity.Styling.StyleSheet;
      Content: string;
      ResolvedContent: string;
      Source: any; // System.Object
      Proxy: ReactUnity.IContainerComponent;
      Context: ReactUnity.ReactContext;
      Parent: ReactUnity.IContainerComponent;
      IsPseudoElement: boolean;
      Destroyed: boolean;
      Entering: boolean;
      Leaving: boolean;
      Layout: Facebook.Yoga.YogaNode;
      StyleState: ReactUnity.Styling.StyleState;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      Style: ReactUnity.Styling.InlineStyles;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      Id: string;
      Name: string;
      Tag: string;
      TextContent: string;
      RefId: number;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      StateStyles: ReactUnity.Styling.StateStyles;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      ParentIndex: number;
      CurrentOrder: number;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      ClientWidth: number;
      ClientHeight: number;
      Children: ReactUnity.IReactComponent[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      GetScopeElement(): ReactUnity.IReactComponent;
      Refresh(): void;
      SetProperty(propertyName: string, value: any): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      ApplyLayoutStyles(): void;
      ResolveStyle(recursive?: boolean): void;
      Update(): void;
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      SetData(property: string, value: any): void;
      SetEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): void;
      AddEventListener(eventType: string, callback: ReactUnity.Helpers.Callback): (() => void);
      FireEvent(eventName: string, arg: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      MarkForStyleResolving(recursive: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Remove(): void;
      Destroy(recursive?: boolean): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      SetText(text: string): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleContext {
      constructor(context: ReactUnity.ReactContext);
      Context: ReactUnity.ReactContext;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      Parser: any; // ExCSS.StylesheetParser
      StyleTree: ReactUnity.Styling.Rules.StyleTree;
      FontFamilies: Record<string, ReactUnity.Types.FontReference>[];
      Keyframes: Record<string, ReactUnity.KeyframeList>[];
      StyleSheets: ReactUnity.Styling.StyleSheet[];
      ResolveStyle(scope?: ReactUnity.IReactComponent): void;
      Insert(sheet: ReactUnity.Styling.StyleSheet): void;
      Remove(sheet: ReactUnity.Styling.StyleSheet): void;
      GetFontFamily(name: string): ReactUnity.Types.FontReference;
      GetKeyframes(name: string): ReactUnity.KeyframeList;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleSheet {
      constructor(context: ReactUnity.Styling.StyleContext, style: string, importanceOffset?: number, scope?: ReactUnity.IReactComponent, media?: string);
      Attached: boolean;
      Enabled: boolean;
      selectorText: string;
      name: string;
      style: any; // System.Object
      media: any; // System.Object
      cssRules: ReactUnity.Styling.StyleSheetNode[];
      Context: ReactUnity.Styling.StyleContext;
      Scope: ReactUnity.IReactComponent;
      ImportanceOffset: number;
      Media: ReactUnity.Styling.Rules.MediaQueryList;
      FontFamilies: Record<string, ReactUnity.Types.FontReference>;
      Keyframes: Record<string, ReactUnity.KeyframeList>;
      MediaQueries: ReactUnity.Styling.Rules.MediaQueryList[];
      Declarations: System.Tuple<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
      AddRules(selector: string, rules: System.Collections.Generic.IDictionary<ReactUnity.Styling.IStyleProperty, any>, important?: boolean): void;
      AddRules(selector: string, rules: System.Collections.Generic.IDictionary<string, any>, important?: boolean): void;
      Enable(): void;
      Disable(): void;
      ResolveStyle(): void;
      insertRule(text: string, index?: number): void;
      appendRule(text: string): void;
      deleteRule(index: number): void;
      replace(text: string): ReactUnity.Styling.StyleSheetNode;
      replaceSync(text: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StyleSheetNode {
      constructor(sheet: ReactUnity.Styling.StyleSheet, original: any);
      selectorText: string;
      name: string;
      style: any; // System.Object
      media: any; // System.Object
      cssRules: ReactUnity.Styling.StyleSheetNode[];
      insertRule(text: string, index?: number): void;
      appendRule(text: string): void;
      deleteRule(index: number): void;
      replace(text: string): ReactUnity.Styling.StyleSheetNode;
      replaceSync(text: string): void;
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
    export class StyleSheetNode_MediaList {
      constructor(rule: any, node: ReactUnity.Styling.StyleSheetNode);
      mediaText: string;
      Node: ReactUnity.Styling.StyleSheetNode;
      Rule: any; // ExCSS.IMediaRule
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Animations {
      export class AnimationEvent {
        constructor();
        AnimationName: string;
        Keyframes: ReactUnity.KeyframeList;
        ElapsedTime: number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TransitionEvent {
        constructor();
        PropertyName: string;
        ElapsedTime: number;
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
      export interface Interpolatable {
        Interpolate(to: any, t: number): any;
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
        static Interpolate(t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType, mirror?: boolean): number;
        static Interpolate(from: number, to: number, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): number;
        static Interpolate(from: UnityEngine.Color, to: UnityEngine.Color, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): UnityEngine.Color;
        static Interpolate(from: UnityEngine.Vector2, to: UnityEngine.Vector2, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): UnityEngine.Vector2;
        static Interpolate(from: UnityEngine.Vector3, to: UnityEngine.Vector3, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): UnityEngine.Vector3;
        static Interpolate(from: UnityEngine.Vector4, to: UnityEngine.Vector4, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): UnityEngine.Vector4;
        static Interpolate(from: UnityEngine.Quaternion, to: UnityEngine.Quaternion, t: number, easeType: ReactUnity.Styling.Animations.TimingFunctionType): UnityEngine.Quaternion;
        static Interpolate(t: number, timingFunction: ((value: number, start?: number, end?: number) => number), mirror?: boolean): number;
        static Interpolate(from: number, to: number, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): number;
        static Interpolate(from: UnityEngine.Color, to: UnityEngine.Color, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): UnityEngine.Color;
        static Interpolate(from: UnityEngine.Vector2, to: UnityEngine.Vector2, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): UnityEngine.Vector2;
        static Interpolate(from: UnityEngine.Vector3, to: UnityEngine.Vector3, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): UnityEngine.Vector3;
        static Interpolate(from: UnityEngine.Vector4, to: UnityEngine.Vector4, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): UnityEngine.Vector4;
        static Interpolate(from: UnityEngine.Quaternion, to: UnityEngine.Quaternion, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): UnityEngine.Quaternion;
        static Interpolate(from: any, to: any, t: number): any;
        static Interpolate(from: any, to: any, t: number, timingFunction: ((value: number, start?: number, end?: number) => number)): any;
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
        BeginInvoke(value: number, start: number, end: number, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
        static Ease: ((value: number, start?: number, end?: number) => number);
        static EaseIn: ((value: number, start?: number, end?: number) => number);
        static EaseOut: ((value: number, start?: number, end?: number) => number);
        static EaseInOut: ((value: number, start?: number, end?: number) => number);
        static StepStart: ((value: number, start?: number, end?: number) => number);
        static StepEnd: ((value: number, start?: number, end?: number) => number);
        static Default: ((value: number, start?: number, end?: number) => number);
        static Linear(t: number, start?: number, end?: number): number;
        static Steps(count: number, mode?: ReactUnity.Styling.Animations.StepsJumpMode): ((value: number, start?: number, end?: number) => number);
        static Get(easeType: ReactUnity.Styling.Animations.TimingFunctionType): ((value: number, start?: number, end?: number) => number);
        static Get(easeType: string): ((value: number, start?: number, end?: number) => number);
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
      export class TransitionProperty {
        constructor(definition: string);
        Definition: string;
        IsAll: boolean;
        Properties: ReactUnity.Styling.IStyleProperty[];
        static None: ReactUnity.Styling.Animations.TransitionProperty;
        static All: ReactUnity.Styling.Animations.TransitionProperty;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TimingFunctions_CubicBezier {
        static Linear(value: number, start?: number, end?: number): number;
        static Create(mX1: number, mY1: number, mX2: number, mY2: number): ((value: number, start?: number, end?: number) => number);
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TimingFunctions_Converter {
        constructor();
        StringifyInternal(value: any): string;
        StringifyTyped(value: ((value: number, start?: number, end?: number) => number)): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TransitionProperty_Converter {
        constructor();
        StringifyInternal(value: any): string;
        StringifyTyped(value: ReactUnity.Styling.Animations.TransitionProperty): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Computed {
      export class ComputedCalc {
        constructor(values: System.Collections.Generic.IList<ReactUnity.Styling.Computed.IComputedValue>, operators: System.Collections.Generic.IList<ReactUnity.Styling.Computed.ComputedCalc_CalcOperator>, converter: ReactUnity.Styling.Converters.StyleConverterBase);
        Values: System.Collections.Generic.IList<ReactUnity.Styling.Computed.IComputedValue>;
        Operators: System.Collections.Generic.IList<ReactUnity.Styling.Computed.ComputedCalc_CalcOperator>;
        Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        AllowUnitless: boolean;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        static Create(values: any, operators: any, converter: ReactUnity.Styling.Converters.StyleConverterBase, allConstants?: boolean): ReactUnity.Styling.Computed.IComputedValue;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedCompound {
        constructor(values: ReactUnity.Styling.Computed.IComputedValue[], converters: ReactUnity.Styling.Converters.StyleConverterBase[], callback: ((values: any[]) => any));
        Callback: ((values: any[]) => any);
        Values: ReactUnity.Styling.Computed.IComputedValue[];
        Converters: ReactUnity.Styling.Converters.StyleConverterBase[];
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        static Create(values: ReactUnity.Styling.Computed.IComputedValue[], converters: ReactUnity.Styling.Converters.StyleConverterBase[], callback: ((values: any[]) => any), allConstants?: boolean): ReactUnity.Styling.Computed.IComputedValue;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedConstant {
        constructor(value: any);
        Value: any; // System.Object
        ConstantValue: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ComputedCurrentColor {
        static Instance: ReactUnity.Styling.Computed.ComputedCurrentColor;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedDynamic {
        constructor(value: any);
        Value: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedFontSize {
        constructor(ratio: number);
        static Default: ReactUnity.Styling.Computed.ComputedFontSize;
        Ratio: number;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
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
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        static Create(from: ReactUnity.Styling.Computed.IComputedValue, to: ReactUnity.Styling.Computed.IComputedValue, ratio: number): ReactUnity.Styling.Computed.IComputedValue;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedKeyword {
        constructor(keyword: ReactUnity.Styling.CssKeyword);
        Keyword: ReactUnity.Styling.CssKeyword;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedList {
        constructor(values: System.Collections.Generic.IList<ReactUnity.Styling.Computed.IComputedValue>, converter: ReactUnity.Styling.Converters.StyleConverterBase, callback: ((values: any[]) => any), defaultValue?: any);
        Callback: ((values: any[]) => any);
        Values: System.Collections.Generic.IList<ReactUnity.Styling.Computed.IComputedValue>;
        Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        DefaultValue: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        static Create(values: any, converter: ReactUnity.Styling.Converters.StyleConverterBase, callback: ((values: any[]) => any), defaultValue?: any, allConstants?: boolean): ReactUnity.Styling.Computed.IComputedValue;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedMapper {
        constructor(value: ReactUnity.Styling.Computed.IComputedValue, converter: ReactUnity.Styling.Converters.StyleConverterBase, callback: ((value: any) => any));
        Callback: ((value: any) => any);
        Value: ReactUnity.Styling.Computed.IComputedValue;
        Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        static Create(value: ReactUnity.Styling.Computed.IComputedValue, converter: ReactUnity.Styling.Converters.StyleConverterBase, callback: ((value: any) => any)): ReactUnity.Styling.Computed.IComputedValue;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedPercentage {
        constructor(value: number);
        Value: number;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedRootRelative {
        constructor(ratio: number, type: ReactUnity.Styling.Computed.ComputedRootRelative_RootValueType);
        Ratio: number;
        Type: ReactUnity.Styling.Computed.ComputedRootRelative_RootValueType;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedShorthandVariable {
        Variable: ReactUnity.Styling.Computed.IComputedValue;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedStringTemplate {
        constructor(template: System.Collections.Generic.IList<string>, variables: System.Collections.Generic.IList<ReactUnity.Styling.Computed.ComputedVariable>);
        Template: System.Collections.Generic.IList<string>;
        Variables: System.Collections.Generic.IList<ReactUnity.Styling.Computed.ComputedVariable>;
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedVariable {
        constructor(prop: ReactUnity.Styling.VariableProperty, fallbackValue: any);
        Property: ReactUnity.Styling.VariableProperty;
        FallbackValue: any; // System.Object
        GetValue(prop: ReactUnity.Styling.IStyleProperty, style: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export interface IComputedValue {
        GetValue(targetProp: ReactUnity.Styling.IStyleProperty, targetStyle: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
      }
      export interface IComputedConstant {
        ConstantValue: any; // System.Object
      }
      export class ComputedValueExtensions {
        static ResolveValue(cv: ReactUnity.Styling.Computed.IComputedValue, targetProp: ReactUnity.Styling.IStyleProperty, targetStyle: ReactUnity.Styling.NodeStyle, converter: ReactUnity.Styling.Converters.IStyleConverter): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum ComputedCalc_CalcOperator {
        None = 0,
        Add = 1,
        Subtract = 2,
        Multiply = 3,
        Divide = 4,
      }
      export class ComputedCalc_CalcValue {
        Value: number;
        HasUnit: boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export class ComputedCompound_CompoundCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(values: any[]): any;
        BeginInvoke(values: any[], callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): any;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ComputedList_CompoundCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(values: any[]): any;
        BeginInvoke(values: any[], callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): any;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ComputedMapper_MapCallback {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(value: any): any;
        BeginInvoke(value: any, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): any;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
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
    export namespace Converters {
      export class AllConverters {
        constructor();
        static RawConverter: ReactUnity.Styling.Converters.IStyleConverter;
        static DefaultConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static StringConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static FloatConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static AngleConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static LengthConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static FontSizeConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static DurationConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static PercentageConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ColorValueConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static UrlConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static YogaValueConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static YogaValue2Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        static BorderRadiusConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static Vector2Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        static Vector3Converter: ReactUnity.Styling.Converters.StyleConverterBase;
        static IntConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static IterationCountConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static BoolConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ColorConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static BoxShadowConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ImageReferenceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static SpriteSourceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ImageSourceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static TextReferenceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static AudioReferenceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static VideoReferenceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static FontReferenceConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static RotateConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ScaleConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static TransitionPropertyConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static CursorConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static TimingFunctionConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static FontWeightConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static ImageDefinitionConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static BackgroundSizeConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        static Get(type: System.Type): ReactUnity.Styling.Converters.StyleConverterBase;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class BoolConverter {
        constructor(truthyValues: string[], falsyValues: string[]);
        StringifyInternal(value: any): string;
        StringifyTyped(value: boolean): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ColorConverter {
        constructor();
        StringifyTyped(value: UnityEngine.Color): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class EnumConverter<T = any> {
        constructor(allowFlags: boolean, keywordOnly: boolean);
        constructor(keywordOnly: boolean);
        EnumType: System.Type;
        AllowFlags: boolean;
        KeywordOnly: boolean;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        StringifyInternal(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FloatConverter {
        constructor();
        constructor(suffixMap: Record<string, number>, suffixMapper?: Record<string, ((arg: number) => any)>, allowSuffixless?: boolean);
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PercentageConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ColorValueConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class LengthConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FontSizeConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AngleConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class DurationConverter {
        constructor();
        AllowSuffixless: boolean;
        CalcConverter: ReactUnity.Styling.Converters.CalcConverter;
        StringifyTyped(value: number): string;
        StringifyInternal(value: any): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class CalcConverter {
        constructor(baseConverter: ReactUnity.Styling.Converters.FloatConverter);
        BaseConverter: ReactUnity.Styling.Converters.FloatConverter;
        BasePercentage: boolean;
        AllowsUnitless: boolean;
        StringifyInternal(value: any): string;
        StringifyTyped(value: ReactUnity.Styling.Computed.ComputedCalc_CalcValue): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class IntConverter {
        constructor();
        AllowFloats: boolean;
        AllowInfinite: boolean;
        InfiniteValue: number;
        Min: number;
        Max: number;
        FloatConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        StringifyInternal(value: any): string;
        StringifyTyped(value: number): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class CountConverter {
        constructor();
        AllowFloats: boolean;
        AllowInfinite: boolean;
        InfiniteValue: number;
        Min: number;
        Max: number;
        FloatConverter: ReactUnity.Styling.Converters.StyleConverterBase;
        StringifyInternal(value: any): string;
        StringifyTyped(value: number): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class RawConverter {
        constructor();
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class StringConverter {
        constructor();
        static Normalize(value: string): string;
        StringifyInternal(value: any): string;
        StringifyTyped(value: string): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export interface IStyleConverter {
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
      }
      export class StyleConverterBase {
        constructor();
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        StringifyInternal(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TypedStyleConverterBase<T = any> {
        constructor();
        StringifyInternal(value: any): string;
        StringifyTyped(value: T): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class UrlConverter {
        constructor();
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        StringifyInternal(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Vector2Converter {
        constructor(allowLiterals?: boolean);
        AllowLiterals: boolean;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        StringifyInternal(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Vector3Converter {
        constructor(singleValueMode?: ((arg: number) => UnityEngine.Vector3), floatParser?: ReactUnity.Styling.Converters.StyleConverterBase, defaultZValue?: number);
        StringifyInternal(value: any): string;
        StringifyTyped(value: UnityEngine.Vector3): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class YogaValueConverter {
        constructor(allowHorizontal?: boolean, allowVertical?: boolean);
        static Horizontal: ReactUnity.Styling.Converters.YogaValueConverter;
        static Vertical: ReactUnity.Styling.Converters.YogaValueConverter;
        StringifyInternal(value: any): string;
        StringifyTyped(value: Facebook.Yoga.YogaValue): string;
        CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
        Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
        Stringify(value: any): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Rules {
      export interface IMediaProvider {
        MediaType: string;
        HasType(type: string): boolean;
        GetValue(property: string): string;
        GetNumericalValue(property: string): number;
        SetValue(property: string, value: string): void;
        SetNumber(property: string, value: number): void;
        SetDimensions(width: number, height: number): void;
        RecalculateDefaults(): void;
      }
      export class DefaultMediaProvider {
        constructor(mediaType: string, numbers?: Record<string, number>, values?: Record<string, string>, types?: System.Collections.Generic.HashSet<string>);
        MediaType: string;
        static CreateMediaProvider(type: string, framework: string, isEditor: boolean): ReactUnity.Styling.Rules.DefaultMediaProvider;
        HasType(type: string): boolean;
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
        static Create(provider: ReactUnity.Styling.Rules.IMediaProvider, media: string): ReactUnity.Styling.Rules.MediaQueryList;
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
        static ParseSelector(selector: string, negated?: boolean): ReactUnity.Styling.Rules.RuleSelectorPart[];
        static GetSpecificity(priority: any): number;
        static ConvertStyleDeclarationToRecord(rule: any, important: boolean): any;
        static ConvertStyleDeclarationToRecord(dc: any): any;
        static NormalizeSelector(selector: string): string;
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
        constructor();
        MediaQuery: ReactUnity.Styling.Rules.MediaQueryList;
        Scope: ReactUnity.IReactComponent;
        Specifity: number;
        LeafNodes: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        BeforeNodes: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AfterNodes: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        Parent: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>;
        Selector: string;
        ParsedSelector: ReactUnity.Styling.Rules.RuleSelectorPart[];
        Children: System.Collections.Generic.LinkedList<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>>;
        RelationType: ReactUnity.Styling.Rules.RuleRelationType;
        PseudoType: ReactUnity.Styling.Rules.RulePseudoType;
        Data: ReactUnity.Styling.Rules.StyleData;
        AddStyle(rule: any, importanceOffset?: number, mql?: ReactUnity.Styling.Rules.MediaQueryList, scope?: ReactUnity.IReactComponent): System.Tuple<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
        AddStyle(selectorText: string, rules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>, importantRules: System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>, importanceOffset?: number, mql?: ReactUnity.Styling.Rules.MediaQueryList, scope?: ReactUnity.IReactComponent): System.Tuple<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>, System.Collections.Generic.Dictionary<ReactUnity.Styling.IStyleProperty, any>>[];
        GetMatchingRules(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>>;
        GetMatchingBefore(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>>;
        GetMatchingAfter(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>>;
        AnyMatches(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): boolean;
        Closest(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
        GetMatchingChild(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
        GetMatchingChildren(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent[];
        AddSelector(selectorText: string, importanceOffset?: number, mql?: ReactUnity.Styling.Rules.MediaQueryList, scope?: ReactUnity.IReactComponent): ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
        AddChildCascading(selector: string, mq: ReactUnity.Styling.Rules.MediaQueryList, scope: ReactUnity.IReactComponent, importanceOffset?: number): ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>;
        Matches(component: ReactUnity.IReactComponent): boolean;
        Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
        CompareTo(other: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class RuleTree<T = any> {
        constructor();
        MediaQuery: ReactUnity.Styling.Rules.MediaQueryList;
        Scope: ReactUnity.IReactComponent;
        Specifity: number;
        LeafNodes: ReactUnity.Styling.Rules.RuleTreeNode<T>[];
        BeforeNodes: ReactUnity.Styling.Rules.RuleTreeNode<T>[];
        AfterNodes: ReactUnity.Styling.Rules.RuleTreeNode<T>[];
        Parent: ReactUnity.Styling.Rules.RuleTreeNode<T>;
        Selector: string;
        ParsedSelector: ReactUnity.Styling.Rules.RuleSelectorPart[];
        Children: System.Collections.Generic.LinkedList<ReactUnity.Styling.Rules.RuleTreeNode<T>>;
        RelationType: ReactUnity.Styling.Rules.RuleRelationType;
        PseudoType: ReactUnity.Styling.Rules.RulePseudoType;
        Data: T;
        GetMatchingRules(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<T>>;
        GetMatchingBefore(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<T>>;
        GetMatchingAfter(component: ReactUnity.IReactComponent): System.Collections.Generic.IEnumerable<ReactUnity.Styling.Rules.RuleTreeNode<T>>;
        AnyMatches(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): boolean;
        Closest(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
        GetMatchingChild(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent;
        GetMatchingChildren(component: ReactUnity.IReactComponent, scope?: ReactUnity.IReactComponent): ReactUnity.IReactComponent[];
        AddSelector(selectorText: string, importanceOffset?: number, mql?: ReactUnity.Styling.Rules.MediaQueryList, scope?: ReactUnity.IReactComponent): ReactUnity.Styling.Rules.RuleTreeNode<T>[];
        AddChildCascading(selector: string, mq: ReactUnity.Styling.Rules.MediaQueryList, scope: ReactUnity.IReactComponent, importanceOffset?: number): ReactUnity.Styling.Rules.RuleTreeNode<T>;
        Matches(component: ReactUnity.IReactComponent): boolean;
        Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
        CompareTo(other: ReactUnity.Styling.Rules.RuleTreeNode<T>): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class RuleTreeNode<T = any> {
        constructor();
        MediaQuery: ReactUnity.Styling.Rules.MediaQueryList;
        Scope: ReactUnity.IReactComponent;
        Specifity: number;
        Parent: ReactUnity.Styling.Rules.RuleTreeNode<T>;
        Selector: string;
        ParsedSelector: ReactUnity.Styling.Rules.RuleSelectorPart[];
        Children: System.Collections.Generic.LinkedList<ReactUnity.Styling.Rules.RuleTreeNode<T>>;
        RelationType: ReactUnity.Styling.Rules.RuleRelationType;
        PseudoType: ReactUnity.Styling.Rules.RulePseudoType;
        Data: T;
        AddChildCascading(selector: string, mq: ReactUnity.Styling.Rules.MediaQueryList, scope: ReactUnity.IReactComponent, importanceOffset?: number): ReactUnity.Styling.Rules.RuleTreeNode<T>;
        Matches(component: ReactUnity.IReactComponent): boolean;
        Matches(component: ReactUnity.IReactComponent, scope: ReactUnity.IReactComponent): boolean;
        CompareTo(other: ReactUnity.Styling.Rules.RuleTreeNode<T>): number;
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
        Pseudo = 6,
      }
      export enum RulePseudoType {
        None = 0,
        Before = 1,
        After = 2,
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
        Enter = 200,
        Leave = 201,
        Activatable = 300,
        Text = 301,
        Before = 500,
        After = 501,
        Important = 1000,
        Special = 1001,
        State = 2000,
      }
      export class RuleSelectorPart {
        constructor();
        static Important: ReactUnity.Styling.Rules.RuleSelectorPart;
        static Before: ReactUnity.Styling.Rules.RuleSelectorPart;
        static After: ReactUnity.Styling.Rules.RuleSelectorPart;
        Negated: boolean;
        Type: ReactUnity.Styling.Rules.RuleSelectorPartType;
        Name: string;
        Parameter: any; // System.Object
        CompareTo(other: ReactUnity.Styling.Rules.RuleSelectorPart): number;
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
    export class BaseConverter<AssetType = any, T = any> {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: T): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
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
      Get(context: ReactUnity.ReactContext, callback: ((obj: UnityEngine.AudioClip) => void)): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BackgroundSize {
      constructor(keyword: ReactUnity.Types.BackgroundSizeKeyword);
      constructor(value: ReactUnity.Types.YogaValue2);
      IsCustom: boolean;
      static Auto: ReactUnity.Types.BackgroundSize;
      static Contain: ReactUnity.Types.BackgroundSize;
      static Cover: ReactUnity.Types.BackgroundSize;
      Keyword: ReactUnity.Types.BackgroundSizeKeyword;
      Value: ReactUnity.Types.YogaValue2;
      Interpolate(to: any, t: number): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export enum BackgroundSizeKeyword {
      Custom = 0,
      Cover = 1,
      Contain = 2,
    }
    export enum BackgroundRepeat {
      Repeat = 0,
      Space = 1,
      Round = 2,
      NoRepeat = 3,
    }
    export enum BackgroundBox {
      BorderBox = 0,
      ContentBox = 1,
      PaddingBox = 2,
    }
    export enum BackgroundAttachment {
      Scroll = 0,
      Fixed = 1,
      Local = 2,
    }
    export enum BackgroundBlendMode {
      Normal = 0,
      Color = 1,
      Multiply = 2,
      Screen = 3,
      Overlay = 4,
      Darken = 5,
      Lighten = 6,
      ColorDodge = 7,
      ColorBurn = 8,
      HardLight = 9,
      SoftLight = 10,
      Difference = 11,
      Exclusion = 12,
      Hue = 13,
      Saturation = 14,
      Luminosity = 15,
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
    export class BoxShadow {
      constructor(offset: UnityEngine.Vector2, blur: UnityEngine.Vector2, spread: UnityEngine.Vector2, color: UnityEngine.Color, inset?: boolean);
      offset: UnityEngine.Vector2;
      spread: UnityEngine.Vector2;
      color: UnityEngine.Color;
      blur: UnityEngine.Vector2;
      inset: boolean;
      Definition: string;
      static Default: ReactUnity.Types.BoxShadow;
      static DefaultInset: ReactUnity.Types.BoxShadow;
      Interpolate(to: any, t: number): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface ICssValueList<T = any> {
      Count: number;
      Any: boolean;
      Get(index: number): T;
      Get(index: number, defaultValue: T): T;
    }
    export class CssValueList<T = any> {
      constructor();
      constructor(item: T, defaultValue?: T);
      constructor(items: T[], defaultValue?: T);
      [key: string]: any;
      Any: boolean;
      DefaultValue: T;
      Capacity: number;
      Count: number;
      static Empty: any[];
      Get(index: number): T;
      Get(index: number, defaultValue: T): T;
      Interpolate(to: any, t: number): any;
      Add(item: T): void;
      AddRange(collection: System.Collections.Generic.IEnumerable<T>): void;
      AsReadOnly(): T[];
      BinarySearch(index: number, count: number, item: T, comparer: System.Collections.Generic.IComparer<T>): number;
      BinarySearch(item: T): number;
      BinarySearch(item: T, comparer: System.Collections.Generic.IComparer<T>): number;
      Clear(): void;
      Contains(item: T): boolean;
      CopyTo(array: T[]): void;
      CopyTo(index: number, array: T[], arrayIndex: number, count: number): void;
      CopyTo(array: T[], arrayIndex: number): void;
      Exists(match: ((obj: T) => boolean)): boolean;
      Find(match: ((obj: T) => boolean)): T;
      FindAll(match: ((obj: T) => boolean)): T[];
      FindIndex(match: ((obj: T) => boolean)): number;
      FindIndex(startIndex: number, match: ((obj: T) => boolean)): number;
      FindIndex(startIndex: number, count: number, match: ((obj: T) => boolean)): number;
      FindLast(match: ((obj: T) => boolean)): T;
      FindLastIndex(match: ((obj: T) => boolean)): number;
      FindLastIndex(startIndex: number, match: ((obj: T) => boolean)): number;
      FindLastIndex(startIndex: number, count: number, match: ((obj: T) => boolean)): number;
      ForEach(action: ((obj: T) => void)): void;
      GetEnumerator(): System.Collections.Generic.List<T>;
      GetRange(index: number, count: number): T[];
      IndexOf(item: T): number;
      IndexOf(item: T, index: number): number;
      IndexOf(item: T, index: number, count: number): number;
      Insert(index: number, item: T): void;
      InsertRange(index: number, collection: System.Collections.Generic.IEnumerable<T>): void;
      LastIndexOf(item: T): number;
      LastIndexOf(item: T, index: number): number;
      LastIndexOf(item: T, index: number, count: number): number;
      Remove(item: T): boolean;
      RemoveAll(match: ((obj: T) => boolean)): number;
      RemoveAt(index: number): void;
      RemoveRange(index: number, count: number): void;
      Reverse(): void;
      Reverse(index: number, count: number): void;
      Sort(): void;
      Sort(comparer: System.Collections.Generic.IComparer<T>): void;
      Sort(index: number, count: number, comparer: System.Collections.Generic.IComparer<T>): void;
      Sort(comparison: ((x: T, y: T) => number)): void;
      ToArray(): T[];
      TrimExcess(): void;
      TrueForAll(match: ((obj: T) => boolean)): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CssValueListInterpolated<T = any> {
      constructor(from: ReactUnity.Types.ICssValueList<T>, to: ReactUnity.Types.ICssValueList<T>, ratio: number);
      Count: number;
      Any: boolean;
      From: ReactUnity.Types.ICssValueList<T>;
      To: ReactUnity.Types.ICssValueList<T>;
      Ratio: number;
      Get(index: number): T;
      Get(index: number, defaultValue: T): T;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToString(): string;
      GetType(): System.Type;
    }
    export class Cursor {
      constructor(name: string);
      constructor(image: ReactUnity.Types.ImageReference, offset: UnityEngine.Vector2);
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
      constructor(font: UnityEngine.TextCore.Text.FontAsset);
      Valid: boolean;
      Font: UnityEngine.Font;
      TmpFontAsset: any; // TMPro.TMP_FontAsset
      TextCoreFontAsset: UnityEngine.TextCore.Text.FontAsset;
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
      Get(context: ReactUnity.ReactContext, callback: ((obj: ReactUnity.Types.FontSource) => void)): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum GradientType {
      None = 0,
      Linear = 1,
      Radial = 2,
      Conic = 3,
    }
    export enum RadialGradientSizeHint {
      FarthestCorner = 0,
      FarthestSide = 1,
      ClosestCorner = 2,
      ClosestSide = 3,
      Custom = 4,
    }
    export enum RadialGradientShape {
      Ellipse = 0,
      Circle = 1,
    }
    export class BaseGradient {
      constructor(keys: ReactUnity.Types.BaseGradient_ColorKey[], repeating: boolean);
      Type: ReactUnity.Types.GradientType;
      Keys: ReactUnity.Types.BaseGradient_ColorKey[];
      Repeating: boolean;
      Valid: boolean;
      SizeUpdatesGraphic: boolean;
      GetColorForOffset(width: number, t: number): UnityEngine.Color;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class LinearGradient {
      constructor(keys: ReactUnity.Types.BaseGradient_ColorKey[], repeating: boolean, angle: number);
      Type: ReactUnity.Types.GradientType;
      Angle: number;
      Keys: ReactUnity.Types.BaseGradient_ColorKey[];
      Repeating: boolean;
      Valid: boolean;
      SizeUpdatesGraphic: boolean;
      GetColorForOffset(width: number, t: number): UnityEngine.Color;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RadialGradient {
      constructor(keys: ReactUnity.Types.BaseGradient_ColorKey[], repeating: boolean, at: ReactUnity.Types.YogaValue2, radius: Facebook.Yoga.YogaValue, sizeHint: ReactUnity.Types.RadialGradientSizeHint, shape: ReactUnity.Types.RadialGradientShape);
      Type: ReactUnity.Types.GradientType;
      At: ReactUnity.Types.YogaValue2;
      Radius: Facebook.Yoga.YogaValue;
      SizeHint: ReactUnity.Types.RadialGradientSizeHint;
      Shape: ReactUnity.Types.RadialGradientShape;
      Keys: ReactUnity.Types.BaseGradient_ColorKey[];
      Repeating: boolean;
      Valid: boolean;
      SizeUpdatesGraphic: boolean;
      GetColorForOffset(width: number, t: number): UnityEngine.Color;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ConicGradient {
      constructor(keys: ReactUnity.Types.BaseGradient_ColorKey[], repeating: boolean, at: ReactUnity.Types.YogaValue2, from: number);
      Type: ReactUnity.Types.GradientType;
      At: ReactUnity.Types.YogaValue2;
      From: number;
      Keys: ReactUnity.Types.BaseGradient_ColorKey[];
      Repeating: boolean;
      Valid: boolean;
      SizeUpdatesGraphic: boolean;
      GetColorForOffset(width: number, t: number): UnityEngine.Color;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageDefinition {
      static NoImage: ReactUnity.Types.ImageDefinition;
      SizeUpdatesGraphic: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UrlImageDefinition {
      constructor(reference: ReactUnity.Types.ImageReference);
      static None: ReactUnity.Types.UrlImageDefinition;
      Reference: ReactUnity.Types.ImageReference;
      SizeUpdatesGraphic: boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class GradientImageDefinition {
      constructor(gradient: ReactUnity.Types.BaseGradient);
      Gradient: ReactUnity.Types.BaseGradient;
      SizeUpdatesGraphic: boolean;
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
      Get(context: ReactUnity.ReactContext, callback: ((obj: UnityEngine.Texture2D) => void)): void;
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
      Default = 0,
      Static = 0,
      Relative = 1,
      Absolute = 2,
      Fixed = 3,
      Sticky = 4,
      Inset = 10,
    }
    export enum ScrollDirection {
      None = 0,
      Horizontal = 1,
      Vertical = 2,
      Both = 3,
    }
    export class SpriteReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.SpriteReference;
      static FromTexture(texture: UnityEngine.Texture2D): UnityEngine.Sprite;
      Get(context: ReactUnity.ReactContext, callback: ((obj: UnityEngine.Sprite) => void)): void;
      Dispose(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextReference {
      constructor(type: ReactUnity.Types.AssetReferenceType, value: any);
      constructor(url: ReactUnity.Types.Url);
      Type: ReactUnity.Types.AssetReferenceType;
      Value: any; // System.Object
      static None: ReactUnity.Types.TextReference;
      Dispose(): void;
      Get(context: ReactUnity.ReactContext, callback: ((obj: UnityEngine.TextAsset) => void)): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum TextTransform {
      None = 0,
      UpperCase = 1,
      LowerCase = 2,
      Capitalize = 3,
      SmallCaps = 4,
    }
    export class Url {
      constructor(fullUrl: string, defaultProtocol?: ReactUnity.Types.UrlProtocol);
      Protocol: ReactUnity.Types.UrlProtocol;
      FullUrl: string;
      NormalizedUrl: string;
      HasKnownProtocol: boolean;
      GetData(): Byte[];
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
      Get(context: ReactUnity.ReactContext, callback: ((obj: ReactUnity.Types.VideoComponentSource) => void)): void;
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
      static Undefined: ReactUnity.Types.YogaValue2;
      static Auto: ReactUnity.Types.YogaValue2;
      static Center: ReactUnity.Types.YogaValue2;
      static Full: ReactUnity.Types.YogaValue2;
      static Point(x: number, y: number): ReactUnity.Types.YogaValue2;
      static Percent(x: number, y: number): ReactUnity.Types.YogaValue2;
      AsVector(): UnityEngine.Vector2;
      IsZero(): boolean;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      ToCSS(): string;
      Negate(): ReactUnity.Types.YogaValue2;
      Interpolate(to: any, t: number): any;
      ToString(): string;
      GetType(): System.Type;
    }
    export class AudioReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.AudioReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BackgroundSize_Converter {
      constructor();
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      StringifyInternal(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BoxShadow_Converter {
      constructor();
      static ColorParser: ReactUnity.Styling.Converters.StyleConverterBase;
      static FloatParser: ReactUnity.Styling.Converters.StyleConverterBase;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      StringifyInternal(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Cursor_Converter {
      constructor();
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.Cursor): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class FontReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.FontReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseGradient_ColorKey {
      constructor();
      Color?: System.Nullable<UnityEngine.Color>;
      Offset: Facebook.Yoga.YogaValue;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageDefinition_ResolvedImage {
      constructor();
      Sprite: UnityEngine.Sprite;
      static Default: ReactUnity.Types.ImageDefinition_ResolvedImage;
      Texture: UnityEngine.Texture2D;
      IntrinsicSize: UnityEngine.Vector2;
      IntrinsicProportions: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageDefinition_Converter {
      constructor();
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.ImageDefinition): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.ImageReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SpriteReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.SpriteReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.TextReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VideoReference_Converter {
      constructor(allowWithoutUrl?: boolean);
      AllowWithoutUrl: boolean;
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.VideoReference): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class YogaValue2_Converter {
      constructor(allowLiterals?: boolean, separator?: System.Char, singleValueAssignsBoth?: boolean);
      StringifyInternal(value: any): string;
      StringifyTyped(value: ReactUnity.Types.YogaValue2): string;
      CanHandleKeyword(keyword: ReactUnity.Styling.CssKeyword): boolean;
      Convert(value: any): ReactUnity.Styling.Computed.IComputedValue;
      Stringify(value: any): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
  }
  export namespace UGUI {
    export class AnchorComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      Url: string;
      OpenInThisTab: boolean;
      Disabled: boolean;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      OpenUrl(openInNewTab: boolean): void;
      Activate(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag: string);
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseRenderTextureComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag: string);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Activate(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class HostComponent {
      constructor(host: UnityEngine.RectTransform, context: ReactUnity.UGUI.UGUIContext);
      Width: number;
      Height: number;
      ResponsiveElement: ReactUnity.UGUI.Behaviours.ResponsiveElement;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      ApplyText(text: string): void;
      SetText(text: string): void;
      ApplySet(value: any): void;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: UnityEngine.UI.Image;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      TextViewport: ReactUnity.UGUI.ContainerComponent;
      TextComponent: ReactUnity.UGUI.TextComponent;
      PlaceholderComponent: ReactUnity.UGUI.TextComponent;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetText(text: string): void;
      Focus(): void;
      Activate(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      Activate(): boolean;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ObjectComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      Update(): void;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class PortalComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      ShadowParent: ReactUnity.IReactComponent;
      Detached: boolean;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RawImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: UnityEngine.UI.RawImage;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RenderComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScrollbarComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      Horizontal: boolean;
      Scrollbar: UnityEngine.UI.Scrollbar;
      Thumb: ReactUnity.UGUI.ScrollbarThumbComponent;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScrollbarThumbComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ScrollComponent {
      constructor(ctx: ReactUnity.UGUI.UGUIContext);
      ScrollRect: ReactUnity.UGUI.Behaviours.SmoothScrollRect;
      ContentResizer: ReactUnity.UGUI.Behaviours.ScrollContentResizer;
      HorizontalScrollbar: ReactUnity.UGUI.ScrollbarComponent;
      VerticalScrollbar: ReactUnity.UGUI.ScrollbarComponent;
      ScrollWidth: number;
      ScrollHeight: number;
      ScrollLeft: number;
      ScrollTop: number;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      ScrollTo(left?: number, top?: number, smoothness?: number): void;
      ScrollBy(left?: number, top?: number, smoothness?: number): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SvgComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Content: string;
      InnerContent: string;
      ResolvedContent: string;
      Image: any; // Unity.VectorGraphics.SVGImage
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SvgImageComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext, tag?: string);
      Image: any; // Unity.VectorGraphics.SVGImage
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      Font: ReactUnity.Types.FontReference;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetText(text: string): void;
      SetProperty(property: string, value: any): void;
      GetLinkInfo(eventData: UnityEngine.EventSystems.PointerEventData): string;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RichTextComponent {
      constructor(text: string, context: ReactUnity.UGUI.UGUIContext, tag: string);
      Text: any; // TMPro.TextMeshProUGUI
      Width: number;
      Height: number;
      Measurer: ReactUnity.UGUI.Behaviours.TextMeasurer;
      LinkedTextWatcher: ReactUnity.UGUI.Behaviours.LinkedTextWatcher;
      Content: string;
      Font: ReactUnity.Types.FontReference;
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetText(text: string): void;
      SetProperty(property: string, value: any): void;
      GetLinkInfo(eventData: UnityEngine.EventSystems.PointerEventData): string;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      Focus(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      Activate(): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UGUIComponent {
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(propertyName: string, value: any): void;
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class VideoComponent {
      constructor(context: ReactUnity.UGUI.UGUIContext);
      RenderTexture: UnityEngine.RenderTexture;
      Image: UnityEngine.UI.RawImage;
      Replaced: ReactUnity.UGUI.BaseImageComponent_ReplacedImageHelper;
      Source: any; // System.Object
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Component: ReactUnity.UGUI.Behaviours.ReactElement;
      BorderAndBackground: ReactUnity.UGUI.Internal.BorderAndBackground;
      OverflowMask: ReactUnity.UGUI.Internal.MaskAndImage;
      Selectable: UnityEngine.UI.Selectable;
      CanvasGroup: UnityEngine.CanvasGroup;
      Canvas: UnityEngine.Canvas;
      Container: UnityEngine.RectTransform;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      EventViewport: UnityEngine.RectTransform;
      ResolvedEventViewport: UnityEngine.RectTransform;
      Context: ReactUnity.UGUI.UGUIContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      VideoPlayer: UnityEngine.Video.VideoPlayer;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      UpdateBackgroundGraphic(updateLayout: boolean, updateStyle: boolean): ReactUnity.UGUI.Internal.BorderAndBackground;
      GetRelativePosition(x: number, y: number): UnityEngine.Vector2;
      GetBoundingClientRect(): UnityEngine.Rect;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      Context: ReactUnity.ReactContext;
      timer: ReactUnity.Scheduling.ITimer;
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
      Source: ReactUnity.ScriptSource;
      Debug: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Globals: ReactUnity.Helpers.SerializableDictionary;
      Stylesheets: UnityEngine.TextAsset[];
      AutoRender: boolean;
      BeforeStart: UnityEngine.Events.UnityEvent;
      AfterStart: UnityEngine.Events.UnityEvent;
      Render(): ReactUnity.ReactUnityBase_WaitForRenderToComplete;
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
      GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      static GetPointValue(val: Facebook.Yoga.YogaValue, fullSize: number): number;
      static GetScreenClientRect(transform: UnityEngine.RectTransform): UnityEngine.Rect;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UGUIContext {
      constructor(options: ReactUnity.UGUI.UGUIContext_Options);
      static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.UGUI.UGUIContext,ReactUnity.IReactComponent]]
      StateHandlers: Record<string, System.Type>;
      DefaultIconSet: ReactUnity.Styling.IconSet;
      IconSets: Record<string, ReactUnity.Styling.IconSet>;
      CursorSet: ReactUnity.Styling.CursorSet;
      RootCanvas: UnityEngine.Canvas;
      CalculatesLayout: boolean;
      Host: ReactUnity.IHostComponent;
      DetachedRoots: System.Collections.Generic.HashSet<ReactUnity.IReactComponent>;
      Globals: ReactUnity.Helpers.GlobalRecord;
      IsDisposed: boolean;
      IsEditorContext: boolean;
      options: ReactUnity.ReactContext_Options;
      Source: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      Dispatcher: ReactUnity.Scheduling.IDispatcher;
      Location: ReactUnity.Scripting.DomProxies.Location;
      LocalStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      OnRestart: (() => void);
      StyleParser: any; // ExCSS.StylesheetParser
      Style: ReactUnity.Styling.StyleContext;
      Script: ReactUnity.Scripting.ScriptContext;
      Html: ReactUnity.Html.HtmlContext;
      CursorAPI: ReactUnity.Helpers.CursorAPI;
      Disposables: (() => void)[];
      static defaultCreator: ((arg1: string, arg2: string, arg3: ReactUnity.UGUI.UGUIContext) => ReactUnity.UGUI.UGUIComponent);
      static textCreator: ((arg1: string, arg2: ReactUnity.UGUI.UGUIContext) => ReactUnity.ITextComponent);
      CreateDefaultComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreateText(text: string): ReactUnity.ITextComponent;
      CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
      PlayAudio(clip: UnityEngine.AudioClip): void;
      UpdateElementsRecursively(): void;
      InsertStyle(style: string): ReactUnity.Styling.StyleSheet;
      InsertStyle(style: string, importanceOffset: number): ReactUnity.Styling.StyleSheet;
      InsertStyle(sheet: ReactUnity.Styling.StyleSheet): ReactUnity.Styling.StyleSheet;
      RemoveStyle(sheet: ReactUnity.Styling.StyleSheet): void;
      ResolvePath(path: string): string;
      CreateStaticScript(path: string): ReactUnity.ScriptSource;
      Start(afterStart?: (() => void)): void;
      Dispose(): void;
      BindCommands(commandsObject: any, callbacksObject: any, getObjectCallback: any, getEventAsObjectCallback: any): void;
      SetRef(refId: number, cmp: ReactUnity.IReactComponent): void;
      GetRef(refId: number, ensureUpdate?: boolean): ReactUnity.IReactComponent;
      FlushCommands(serializedCommands?: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseImageComponent_ReplacedImageHelper {
      constructor(parent: ReactUnity.UGUI.BaseImageComponent);
      GameObject: UnityEngine.GameObject;
      RectTransform: UnityEngine.RectTransform;
      Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
      ReplacedElement: ReactUnity.UGUI.Behaviours.ReactReplacedElement;
      Graphic: UnityEngine.UI.MaskableGraphic;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UGUIContext_Options {
      constructor();
      CalculatesLayout: boolean;
      HostElement: UnityEngine.RectTransform;
      IconSets: ReactUnity.Styling.IconSet[];
      DefaultIconSet: ReactUnity.Styling.IconSet;
      CursorSet: ReactUnity.Styling.CursorSet;
      Globals: ReactUnity.Helpers.SerializableDictionary;
      Source: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      OnRestart: (() => void);
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Debug: boolean;
      AwaitDebugger: boolean;
      BeforeStart: (() => void);
      AfterStart: (() => void);
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Behaviours {
      export class CustomViewportRaycaster {
        constructor();
        eventCamera: UnityEngine.Camera;
        sortOrderPriority: number;
        renderOrderPriority: number;
        ignoreReversedGraphics: boolean;
        blockingObjects: UnityEngine.UI.GraphicRaycaster_BlockingObjects;
        blockingMask: UnityEngine.LayerMask;
        priority: number;
        rootRaycaster: UnityEngine.EventSystems.BaseRaycaster;
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
        EventViewport: UnityEngine.RectTransform;
        Raycast(eventData: UnityEngine.EventSystems.PointerEventData, resultAppendList: UnityEngine.EventSystems.RaycastResult[]): void;
        ToString(): string;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        Measure(node: Facebook.Yoga.YogaNode, width: number, wm: Facebook.Yoga.YogaMeasureMode, height: number, hm: Facebook.Yoga.YogaMeasureMode): Facebook.Yoga.YogaSize;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        TranslateZ: Facebook.Yoga.YogaValue;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        Measurer: ReactUnity.UGUI.Behaviours.ImageMeasurer;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      export class ScrollContentResizer {
        constructor();
        Layout: Facebook.Yoga.YogaNode;
        Direction: ReactUnity.Types.ScrollDirection;
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
        RecalculateSize(): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      export class ScrollEventBubbling {
        constructor();
        EventTrigger: UnityEngine.EventSystems.EventTrigger;
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
        Bubble: boolean;
        DisableEventTriggerWhileDragging: boolean;
        OnScroll(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnBeginDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnEndDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnDisable(): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      export class SmoothScrollRect {
        constructor();
        Smoothness: number;
        WheelDirectionTransposed: boolean;
        ClientWidth: number;
        ClientHeight: number;
        ScrollWidth: number;
        ScrollHeight: number;
        ScrollLeft: number;
        ScrollTop: number;
        content: UnityEngine.RectTransform;
        horizontal: boolean;
        vertical: boolean;
        movementType: UnityEngine.UI.ScrollRect_MovementType;
        elasticity: number;
        inertia: boolean;
        decelerationRate: number;
        scrollSensitivity: number;
        viewport: UnityEngine.RectTransform;
        horizontalScrollbar: UnityEngine.UI.Scrollbar;
        verticalScrollbar: UnityEngine.UI.Scrollbar;
        horizontalScrollbarVisibility: UnityEngine.UI.ScrollRect_ScrollbarVisibility;
        verticalScrollbarVisibility: UnityEngine.UI.ScrollRect_ScrollbarVisibility;
        horizontalScrollbarSpacing: number;
        verticalScrollbarSpacing: number;
        onValueChanged: UnityEngine.UI.ScrollRect_ScrollRectEvent;
        velocity: UnityEngine.Vector2;
        normalizedPosition: UnityEngine.Vector2;
        horizontalNormalizedPosition: number;
        verticalNormalizedPosition: number;
        minWidth: number;
        preferredWidth: number;
        flexibleWidth: number;
        minHeight: number;
        preferredHeight: number;
        flexibleHeight: number;
        layoutPriority: number;
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
        OnScroll(data: UnityEngine.EventSystems.PointerEventData): void;
        ScrollBy(left?: number, top?: number, smoothness?: number): void;
        ScrollTo(left?: number, top?: number, smoothness?: number): void;
        Rebuild(executing: UnityEngine.UI.CanvasUpdate): void;
        LayoutComplete(): void;
        GraphicUpdateComplete(): void;
        IsActive(): boolean;
        StopMovement(): void;
        OnInitializePotentialDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnBeginDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnEndDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        OnDrag(eventData: UnityEngine.EventSystems.PointerEventData): void;
        CalculateLayoutInputHorizontal(): void;
        CalculateLayoutInputVertical(): void;
        SetLayoutHorizontal(): void;
        SetLayoutVertical(): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        AddListener(call: ((arg0: ReactUnity.UGUI.PrefabComponent, arg1: ReactUnity.UGUI.Behaviours.PrefabTarget) => void)): void;
        RemoveListener(call: ((arg0: ReactUnity.UGUI.PrefabComponent, arg1: ReactUnity.UGUI.Behaviours.PrefabTarget) => void)): void;
        Invoke(arg0: ReactUnity.UGUI.PrefabComponent, arg1: ReactUnity.UGUI.Behaviours.PrefabTarget): void;
        GetPersistentEventCount(): number;
        GetPersistentTarget(index: number): UnityEngine.Object;
        GetPersistentMethodName(index: number): string;
        SetPersistentListenerState(index: number, state: UnityEngine.Events.UnityEventCallState): void;
        GetPersistentListenerState(index: number): UnityEngine.Events.UnityEventCallState;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        constructor(eventSystem: UnityEngine.EventSystems.EventSystem, ctx: UnityEngine.InputSystem.InputAction_CallbackContext);
        constructor(eventSystem: UnityEngine.EventSystems.EventSystem, inputSystem?: boolean);
        currentInputModule: UnityEngine.EventSystems.BaseInputModule;
        selectedObject: UnityEngine.GameObject;
        used: boolean;
        key: string;
        input: System.Type;
        inputSystem: boolean;
        ctx: UnityEngine.InputSystem.InputAction_CallbackContext;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      export class PointerMoveHandler {
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
    export namespace Internal {
      export class BackgroundImage {
        constructor();
        Definition: ReactUnity.Types.ImageDefinition;
        BackgroundSize: ReactUnity.Types.BackgroundSize;
        materialForRendering: UnityEngine.Material;
        mainTexture: UnityEngine.Texture;
        texture: UnityEngine.Texture;
        uvRect: UnityEngine.Rect;
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
        material: UnityEngine.Material;
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
        static SizeProp: number;
        static PosProp: number;
        static RepeatXProp: number;
        static RepeatYProp: number;
        static AspectProp: number;
        Size: UnityEngine.Vector2;
        definition: ReactUnity.Types.ImageDefinition;
        Context: ReactUnity.ReactContext;
        backgroundSize: ReactUnity.Types.BackgroundSize;
        BackgroundPosition: ReactUnity.Types.YogaValue2;
        BackgroundRepeatX: ReactUnity.Types.BackgroundRepeat;
        BackgroundRepeatY: ReactUnity.Types.BackgroundRepeat;
        GetDefaultMaterial(): UnityEngine.Material;
        SetBackgroundColorAndImage(tint: UnityEngine.Color, image: ReactUnity.Types.ImageDefinition, blendMode?: ReactUnity.Types.BackgroundBlendMode): void;
        SetNativeSize(): void;
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
        SetRaycastDirty(): void;
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
        RegisterDirtyLayoutCallback(action: (() => void)): void;
        UnregisterDirtyLayoutCallback(action: (() => void)): void;
        RegisterDirtyVerticesCallback(action: (() => void)): void;
        UnregisterDirtyVerticesCallback(action: (() => void)): void;
        RegisterDirtyMaterialCallback(action: (() => void)): void;
        UnregisterDirtyMaterialCallback(action: (() => void)): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        InsetBorder: ReactUnity.UGUI.Internal.RoundedBorderMaskImage;
        BorderRadius: ReactUnity.Types.YogaValue2[];
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
        SetRaycastDirty(): void;
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
        RegisterDirtyLayoutCallback(action: (() => void)): void;
        UnregisterDirtyLayoutCallback(action: (() => void)): void;
        RegisterDirtyVerticesCallback(action: (() => void)): void;
        UnregisterDirtyVerticesCallback(action: (() => void)): void;
        RegisterDirtyMaterialCallback(action: (() => void)): void;
        UnregisterDirtyMaterialCallback(action: (() => void)): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        BackgroundRoot: UnityEngine.RectTransform;
        ShadowRoot: UnityEngine.RectTransform;
        LastMask: ReactUnity.UGUI.Internal.BackgroundImage;
        BlendMode: ReactUnity.Types.BackgroundBlendMode;
        BgColor: UnityEngine.Color;
        PointerEvents: ReactUnity.Types.PointerEvents;
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
        RootGraphic: ReactUnity.UGUI.Internal.RoundedBorderMaskImage;
        RootMask: UnityEngine.UI.Mask;
        BorderGraphic: ReactUnity.UGUI.Internal.BasicBorderImage;
        ShadowGraphics: ReactUnity.UGUI.Internal.BoxShadowImage[];
        BackgroundGraphics: ReactUnity.UGUI.Internal.BackgroundImage[];
        MaskGraphics: ReactUnity.UGUI.Internal.BackgroundImage[];
        MaskRoot: UnityEngine.RectTransform;
        static Create(go: UnityEngine.GameObject, comp: ReactUnity.UGUI.UGUIComponent, setContainer: ((obj: UnityEngine.RectTransform) => void)): ReactUnity.UGUI.Internal.BorderAndBackground;
        UpdateStyle(style: ReactUnity.Styling.NodeStyle): void;
        UpdateLayout(layout: Facebook.Yoga.YogaNode): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        MaskRoot: UnityEngine.Transform;
        Shadow: ReactUnity.Types.BoxShadow;
        BorderRadius: ReactUnity.Types.YogaValue2[];
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
        SetRaycastDirty(): void;
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
        RegisterDirtyLayoutCallback(action: (() => void)): void;
        UnregisterDirtyLayoutCallback(action: (() => void)): void;
        RegisterDirtyVerticesCallback(action: (() => void)): void;
        UnregisterDirtyVerticesCallback(action: (() => void)): void;
        RegisterDirtyMaterialCallback(action: (() => void)): void;
        UnregisterDirtyMaterialCallback(action: (() => void)): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        Graphic: UnityEngine.UI.Graphic;
        Image: ReactUnity.UGUI.Internal.RoundedBorderMaskImage;
        static Create(go: UnityEngine.GameObject, ctx: ReactUnity.ReactContext): ReactUnity.UGUI.Internal.MaskAndImage;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        BorderRadius: ReactUnity.Types.YogaValue2[];
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
        SetRaycastDirty(): void;
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
        RegisterDirtyLayoutCallback(action: (() => void)): void;
        UnregisterDirtyLayoutCallback(action: (() => void)): void;
        RegisterDirtyVerticesCallback(action: (() => void)): void;
        UnregisterDirtyVerticesCallback(action: (() => void)): void;
        RegisterDirtyMaterialCallback(action: (() => void)): void;
        UnregisterDirtyMaterialCallback(action: (() => void)): void;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        Cursor: ReactUnity.Types.ICssValueList<ReactUnity.Types.Cursor>;
        CursorShown: boolean;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      export class LinkHoverStateHandler {
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
        GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      url: string;
      SetProperty(propertyName: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseFieldComponent<TElementType = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Indeterminate: boolean;
      Disabled: boolean;
      Value: TValueType;
      Element: TElementType;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class StringValueComponent<TElementType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      ReadOnly: boolean;
      PlaceholderShown: boolean;
      Indeterminate: boolean;
      Disabled: boolean;
      Value: string;
      Element: TElementType;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      SelectAll(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): string;
      SetValue(value: string): void;
      SetValueWithoutNotify(value: string): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextFieldComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Multiline: boolean;
      ReadOnly: boolean;
      PlaceholderShown: boolean;
      Indeterminate: boolean;
      Disabled: boolean;
      Value: string;
      Element: UnityEngine.UIElements.TextField;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      SelectRange(rangeCursorIndex: number, selectionIndex: number): void;
      SelectAll(): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): string;
      SetValue(value: string): void;
      SetValueWithoutNotify(value: string): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BindableComponent<TElementType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: TElementType;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ButtonComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: T;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ImageComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Element: UnityEngine.UIElements.Image;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class IMGUIComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext);
      Element: UnityEngine.UIElements.IMGUIContainer;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      MarkDirtyLayout(): void;
      MarkDirtyRepaint(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class RangeComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext);
      Indeterminate: boolean;
      Disabled: boolean;
      Value: UnityEngine.Vector2;
      Element: UnityEngine.UIElements.MinMaxSlider;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): UnityEngine.Vector2;
      SetValue(value: UnityEngine.Vector2): void;
      SetValueWithoutNotify(value: UnityEngine.Vector2): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class BaseSliderComponent<S = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Indeterminate: boolean;
      Disabled: boolean;
      Value: TValueType;
      Element: S;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SvgComponent {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Content: string;
      InnerContent: string;
      ResolvedContent: string;
      Source: any; // System.Object
      Element: ReactUnity.UIToolkit.SvgElement;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(propertyName: string, value: any): void;
      Update(): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TextComponent<TElementType = any> {
      constructor(text: string, context: ReactUnity.UIToolkit.UIToolkitContext, tag: string, isContainer?: boolean, richText?: boolean);
      Content: string;
      Element: TElementType;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetText(text: string): void;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ToggleComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Checked: boolean;
      Indeterminate: boolean;
      Disabled: boolean;
      Value: boolean;
      Element: T;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      SetProperty(property: string, value: any): void;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      ConvertValue(value: any): boolean;
      SetValue(value: boolean): void;
      SetValueWithoutNotify(value: boolean): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export interface IUIToolkitComponent<T = any> {
      Element: T;
      TargetElement: UnityEngine.UIElements.VisualElement;
    }
    export class UIToolkitComponent<T = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string, isContainer?: boolean);
      Element: T;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ValueComponent<TElementType = any, TValueType = any> {
      constructor(context: ReactUnity.UIToolkit.UIToolkitContext, tag: string);
      Disabled: boolean;
      Value: TValueType;
      Element: TElementType;
      TargetElement: UnityEngine.UIElements.VisualElement;
      Name: string;
      ClientWidth: number;
      ClientHeight: number;
      Context: ReactUnity.UIToolkit.UIToolkitContext;
      Parent: ReactUnity.IContainerComponent;
      Data: ReactUnity.Helpers.WatchableObjectRecord;
      Layout: Facebook.Yoga.YogaNode;
      ComputedStyle: ReactUnity.Styling.NodeStyle;
      StyleState: ReactUnity.Styling.StyleState;
      StateStyles: ReactUnity.Styling.StateStyles;
      Style: InlineStyleRemap;
      InlineStylesheet: ReactUnity.Styling.StyleSheet;
      ParentIndex: number;
      CurrentOrder: number;
      Entering: boolean;
      Leaving: boolean;
      Destroyed: boolean;
      IsPseudoElement: boolean;
      Tag: string;
      TextContent: string;
      ClassName: string;
      ClassList: ReactUnity.Helpers.ClassList;
      Id: string;
      RefId: number;
      IsContainer: boolean;
      Children: ReactUnity.IReactComponent[];
      BeforeRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      AfterRules: ReactUnity.Styling.Rules.RuleTreeNode<ReactUnity.Styling.Rules.StyleData>[];
      BeforePseudo: ReactUnity.IReactComponent;
      AfterPseudo: ReactUnity.IReactComponent;
      ScrollLeft: number;
      ScrollTop: number;
      ScrollWidth: number;
      ScrollHeight: number;
      AddEventListener(eventName: string, callback: ReactUnity.Helpers.Callback): (() => void);
      SetProperty(property: string, value: any): void;
      ConvertValue(value: any): TValueType;
      SetValue(value: TValueType): void;
      SetValueWithoutNotify(value: TValueType): void;
      Activate(): void;
      GetComponent(type: System.Type): any;
      AddComponent(type: System.Type): any;
      CaptureMouse(): void;
      ReleaseMouse(): void;
      HasMouseCapture(): boolean;
      UpdateOrder(prev: number, current: number): boolean;
      Update(): void;
      MarkForStyleResolving(recursive: boolean): void;
      Remove(): void;
      Destroy(recursive?: boolean): void;
      SetParent(newParent: ReactUnity.IContainerComponent, relativeTo?: ReactUnity.IReactComponent, insertAfter?: boolean): void;
      SetEventListener(eventName: string, fun: ReactUnity.Helpers.Callback): void;
      FireEvent(eventName: string, arg: any): void;
      SetData(propertyName: string, value: any): void;
      ResolveStyle(recursive?: boolean): void;
      MarkForStyleResolvingWithSiblings(recursive: boolean): void;
      ApplyStyles(): void;
      ApplyLayoutStyles(): void;
      Matches(query: string): boolean;
      Closest(query: string): ReactUnity.IReactComponent;
      QuerySelector(query: string): ReactUnity.IReactComponent;
      QuerySelectorAll(query: string): ReactUnity.IReactComponent[];
      Accept(visitor: ReactUnity.Helpers.Visitors.ReactComponentVisitor, skipSelf?: boolean): void;
      AddBefore(): void;
      RemoveBefore(): void;
      AddAfter(): void;
      RemoveAfter(): void;
      RegisterChild(child: ReactUnity.IReactComponent, index?: number): void;
      UnregisterChild(child: ReactUnity.IReactComponent): void;
      Clear(): void;
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
      constructor(script: ReactUnity.ScriptSource, globals: ReactUnity.Helpers.SerializableDictionary, timer: ReactUnity.Scheduling.ITimer, mediaProvider: ReactUnity.Styling.Rules.IMediaProvider, engineType?: ReactUnity.Scripting.JavascriptEngineType, debug?: boolean, awaitDebugger?: boolean, autorun?: boolean);
      [key: string]: any;
      Context: ReactUnity.ReactContext;
      Timer: ReactUnity.Scheduling.ITimer;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      Script: ReactUnity.ScriptSource;
      Globals: ReactUnity.Helpers.SerializableDictionary;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
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
      generateVisualContent: ((obj: UnityEngine.UIElements.MeshGenerationContext) => void);
      experimental: UnityEngine.UIElements.IExperimentalFeatures;
      hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
      cacheAsBitmap: boolean;
      parent: UnityEngine.UIElements.VisualElement;
      panel: UnityEngine.UIElements.IPanel;
      contentContainer: UnityEngine.UIElements.VisualElement;
      visualTreeAssetSource: UnityEngine.UIElements.VisualTreeAsset;
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
      Sort(comp: ((x: UnityEngine.UIElements.VisualElement, y: UnityEngine.UIElements.VisualElement) => number)): void;
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
    export class ReactUnityUIDocument {
      constructor();
      Root: UnityEngine.UIElements.VisualElement;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      Context: ReactUnity.ReactContext;
      timer: ReactUnity.Scheduling.ITimer;
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
      Source: ReactUnity.ScriptSource;
      Debug: boolean;
      AwaitDebugger: boolean;
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Globals: ReactUnity.Helpers.SerializableDictionary;
      Stylesheets: UnityEngine.TextAsset[];
      AutoRender: boolean;
      BeforeStart: UnityEngine.Events.UnityEvent;
      AfterStart: UnityEngine.Events.UnityEvent;
      PlayAudio(clip: UnityEngine.AudioClip): void;
      Render(): ReactUnity.ReactUnityBase_WaitForRenderToComplete;
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
      GetComponentInParent(t: System.Type, includeInactive: boolean): UnityEngine.Component;
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
      constructor(options: ReactUnity.UIToolkit.UIToolkitContext_Options);
      StateHandlers: Record<string, System.Type>;
      HostElement: UnityEngine.UIElements.VisualElement;
      CalculatesLayout: boolean;
      Host: ReactUnity.IHostComponent;
      DetachedRoots: System.Collections.Generic.HashSet<ReactUnity.IReactComponent>;
      Globals: ReactUnity.Helpers.GlobalRecord;
      IsDisposed: boolean;
      IsEditorContext: boolean;
      options: ReactUnity.ReactContext_Options;
      Source: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      Dispatcher: ReactUnity.Scheduling.IDispatcher;
      Location: ReactUnity.Scripting.DomProxies.Location;
      LocalStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      OnRestart: (() => void);
      StyleParser: any; // ExCSS.StylesheetParser
      Style: ReactUnity.Styling.StyleContext;
      Script: ReactUnity.Scripting.ScriptContext;
      Html: ReactUnity.Html.HtmlContext;
      CursorSet: ReactUnity.Styling.CursorSet;
      CursorAPI: ReactUnity.Helpers.CursorAPI;
      Disposables: (() => void)[];
      static defaultCreator: ((arg1: string, arg2: string, arg3: ReactUnity.UIToolkit.UIToolkitContext) => ReactUnity.UIToolkit.IUIToolkitComponent<UnityEngine.UIElements.VisualElement>);
      static textCreator: ((arg1: string, arg2: ReactUnity.UIToolkit.UIToolkitContext) => ReactUnity.ITextComponent);
      static ComponentCreators: any; // System.Collections.Generic.Dictionary`2[System.String,System.Func`4[System.String,System.String,ReactUnity.UIToolkit.UIToolkitContext,ReactUnity.IReactComponent]]
      Initialize(): void;
      CreateText(text: string): ReactUnity.ITextComponent;
      CreateDefaultComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreateComponent(tag: string, text: string): ReactUnity.IReactComponent;
      CreatePseudoComponent(tag: string): ReactUnity.IReactComponent;
      PlayAudio(clip: UnityEngine.AudioClip): void;
      UpdateElementsRecursively(): void;
      InsertStyle(style: string): ReactUnity.Styling.StyleSheet;
      InsertStyle(style: string, importanceOffset: number): ReactUnity.Styling.StyleSheet;
      InsertStyle(sheet: ReactUnity.Styling.StyleSheet): ReactUnity.Styling.StyleSheet;
      RemoveStyle(sheet: ReactUnity.Styling.StyleSheet): void;
      ResolvePath(path: string): string;
      CreateStaticScript(path: string): ReactUnity.ScriptSource;
      Start(afterStart?: (() => void)): void;
      Dispose(): void;
      BindCommands(commandsObject: any, callbacksObject: any, getObjectCallback: any, getEventAsObjectCallback: any): void;
      SetRef(refId: number, cmp: ReactUnity.IReactComponent): void;
      GetRef(refId: number, ensureUpdate?: boolean): ReactUnity.IReactComponent;
      FlushCommands(serializedCommands?: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class UIToolkitHelpers {
      static GenerateVectorImage(rawSvg: string): any;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class SvgElement {
      constructor();
      constructor(svg: string);
      [key: string]: any;
      RawSvg: string;
      image: UnityEngine.Texture;
      sprite: UnityEngine.Sprite;
      vectorImage: UnityEngine.UIElements.VectorImage;
      sourceRect: UnityEngine.Rect;
      uv: UnityEngine.Rect;
      scaleMode: UnityEngine.ScaleMode;
      tintColor: UnityEngine.Color;
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
      generateVisualContent: ((obj: UnityEngine.UIElements.MeshGenerationContext) => void);
      experimental: UnityEngine.UIElements.IExperimentalFeatures;
      hierarchy: UnityEngine.UIElements.VisualElement_Hierarchy;
      cacheAsBitmap: boolean;
      parent: UnityEngine.UIElements.VisualElement;
      panel: UnityEngine.UIElements.IPanel;
      contentContainer: UnityEngine.UIElements.VisualElement;
      visualTreeAssetSource: UnityEngine.UIElements.VisualTreeAsset;
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
      Sort(comp: ((x: UnityEngine.UIElements.VisualElement, y: UnityEngine.UIElements.VisualElement) => number)): void;
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
    export class UIToolkitContext_Options {
      constructor();
      CalculatesLayout: boolean;
      HostElement: UnityEngine.UIElements.VisualElement;
      OnAudioPlayback: ((obj: UnityEngine.AudioClip) => void);
      Globals: ReactUnity.Helpers.SerializableDictionary;
      Source: ReactUnity.ScriptSource;
      Timer: ReactUnity.Scheduling.ITimer;
      MediaProvider: ReactUnity.Styling.Rules.IMediaProvider;
      OnRestart: (() => void);
      EngineType: ReactUnity.Scripting.JavascriptEngineType;
      Debug: boolean;
      AwaitDebugger: boolean;
      BeforeStart: (() => void);
      AfterStart: (() => void);
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
}
