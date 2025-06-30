//
// Types in assemblies: LibYoga
// Generated 01/07/2025 01:03:16
//
/* eslint-disable */

import { System } from './system';

export declare namespace Yoga {
  export class BaselineFunction {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(node: Yoga.YogaNode, width: number, height: number): number;
    BeginInvoke(node: Yoga.YogaNode, width: number, height: number, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    Invoke(config: Yoga.YogaConfig, node: Yoga.YogaNode, level: Yoga.YogaLogLevel, message: string): void;
    BeginInvoke(config: Yoga.YogaConfig, node: Yoga.YogaNode, level: Yoga.YogaLogLevel, message: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    Invoke(node: Yoga.YogaNode, width: number, widthMode: Yoga.YogaMeasureMode, height: number, heightMode: Yoga.YogaMeasureMode): Yoga.YogaSize;
    BeginInvoke(node: Yoga.YogaNode, width: number, widthMode: Yoga.YogaMeasureMode, height: number, heightMode: Yoga.YogaMeasureMode, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): Yoga.YogaSize;
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
    static Make(width: number, height: number): Yoga.YogaSize;
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
    SpaceEvenly = 8,
  }
  export class YogaBaselineFunc {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(unmanagedNodePtr: System.IntPtr, width: number, height: number): number;
    BeginInvoke(unmanagedNodePtr: System.IntPtr, width: number, height: number, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
  export enum YogaBoxSizing {
    BorderBox = 0,
    ContentBox = 1,
  }
  export class YogaCloneNodeFunc {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(oldNode: System.IntPtr, owner: System.IntPtr, childIndex: number): number;
    BeginInvoke(oldNode: System.IntPtr, owner: System.IntPtr, childIndex: number, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    Logger: ((config: Yoga.YogaConfig, node: Yoga.YogaNode, level: Yoga.YogaLogLevel, message: string) => void);
    Errata: Yoga.YogaErrata;
    UseWebDefaults: boolean;
    PointScaleFactor: number;
    SetExperimentalFeatureEnabled(feature: Yoga.YogaExperimentalFeature, enabled: boolean): void;
    IsExperimentalFeatureEnabled(feature: Yoga.YogaExperimentalFeature): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    GetType(): System.Type;
    ToString(): string;
  }
  export class YogaConstants {
    static Undefined: number;
    static IsUndefined(value: number): boolean;
    static IsUndefined(value: Yoga.YogaValue): boolean;
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
  export class YogaDirtiedFunc {
    constructor(object: any, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: any; // System.Object
    Invoke(node: Yoga.YogaNode): void;
    BeginInvoke(node: Yoga.YogaNode, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
  export enum YogaDisplay {
    Flex = 0,
    None = 1,
    Contents = 2,
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
  export enum YogaErrata {
    None = 0,
    StretchFlexBasis = 1,
    AbsolutePositioningIncorrect = 2,
    AbsolutePercentAgainstInnerSize = 4,
    All = 2147483647,
    Classic = 2147483646,
  }
  export enum YogaExperimentalFeature {
    WebFlexBasis = 0,
    AbsolutePercentageAgainstPaddingEdge = 1,
    FixAbsoluteTrailingColumnMargin = 2,
  }
  export enum YogaFlexDirection {
    Column = 0,
    ColumnReverse = 1,
    Row = 2,
    RowReverse = 3,
  }
  export enum YogaGutter {
    Column = 0,
    Row = 1,
    All = 2,
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
    Invoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Yoga.YogaLogLevel, message: string): void;
    BeginInvoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Yoga.YogaLogLevel, message: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    Invoke(unmanagedNodePtr: System.IntPtr, width: number, widthMode: Yoga.YogaMeasureMode, height: number, heightMode: Yoga.YogaMeasureMode): Yoga.YogaSize;
    BeginInvoke(unmanagedNodePtr: System.IntPtr, width: number, widthMode: Yoga.YogaMeasureMode, height: number, heightMode: Yoga.YogaMeasureMode, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
    EndInvoke(result: System.IAsyncResult): Yoga.YogaSize;
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
    constructor(config?: Yoga.YogaConfig);
    constructor(srcNode: Yoga.YogaNode);
    [key: string]: any;
    IsDirty: boolean;
    HasNewLayout: boolean;
    Parent: Yoga.YogaNode;
    IsMeasureDefined: boolean;
    IsBaselineDefined: boolean;
    StyleDirection: Yoga.YogaDirection;
    FlexDirection: Yoga.YogaFlexDirection;
    JustifyContent: Yoga.YogaJustify;
    Display: Yoga.YogaDisplay;
    BoxSizing: Yoga.YogaBoxSizing;
    AlignItems: Yoga.YogaAlign;
    AlignSelf: Yoga.YogaAlign;
    AlignContent: Yoga.YogaAlign;
    PositionType: Yoga.YogaPositionType;
    Wrap: Yoga.YogaWrap;
    Flex: number;
    FlexGrow: number;
    FlexShrink: number;
    FlexBasis: Yoga.YogaValue;
    Width: Yoga.YogaValue;
    Height: Yoga.YogaValue;
    MaxWidth: Yoga.YogaValue;
    MaxHeight: Yoga.YogaValue;
    MinWidth: Yoga.YogaValue;
    MinHeight: Yoga.YogaValue;
    AspectRatio: number;
    Gap: Yoga.YogaValue;
    ColumnGap: Yoga.YogaValue;
    RowGap: Yoga.YogaValue;
    LayoutLeft: number;
    LayoutTop: number;
    LayoutRight: number;
    LayoutBottom: number;
    LayoutWidth: number;
    LayoutHeight: number;
    LayoutDirection: Yoga.YogaDirection;
    LayoutHadOverflow: boolean;
    Overflow: Yoga.YogaOverflow;
    Data: any; // System.Object
    Count: number;
    IsReferenceBaseline: boolean;
    NodeType: Yoga.YogaNodeType;
    AlwaysFormsContainingBlock: boolean;
    Left: Yoga.YogaValue;
    Top: Yoga.YogaValue;
    Right: Yoga.YogaValue;
    Bottom: Yoga.YogaValue;
    Start: Yoga.YogaValue;
    End: Yoga.YogaValue;
    MarginLeft: Yoga.YogaValue;
    MarginTop: Yoga.YogaValue;
    MarginRight: Yoga.YogaValue;
    MarginBottom: Yoga.YogaValue;
    MarginStart: Yoga.YogaValue;
    MarginEnd: Yoga.YogaValue;
    MarginHorizontal: Yoga.YogaValue;
    MarginVertical: Yoga.YogaValue;
    Margin: Yoga.YogaValue;
    PaddingLeft: Yoga.YogaValue;
    PaddingTop: Yoga.YogaValue;
    PaddingRight: Yoga.YogaValue;
    PaddingBottom: Yoga.YogaValue;
    PaddingStart: Yoga.YogaValue;
    PaddingEnd: Yoga.YogaValue;
    PaddingHorizontal: Yoga.YogaValue;
    PaddingVertical: Yoga.YogaValue;
    Padding: Yoga.YogaValue;
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
    LayoutBorderLeft: number;
    LayoutBorderTop: number;
    LayoutBorderRight: number;
    LayoutBorderBottom: number;
    LayoutBorderStart: number;
    LayoutBorderEnd: number;
    LayoutPaddingLeft: number;
    LayoutPaddingTop: number;
    LayoutPaddingRight: number;
    LayoutPaddingBottom: number;
    LayoutPaddingStart: number;
    LayoutPaddingEnd: number;
    Reset(): void;
    MarkDirty(): void;
    MarkHasNewLayout(): void;
    CopyStyle(srcNode: Yoga.YogaNode): void;
    MarkLayoutSeen(): void;
    ValuesEqual(f1: number, f2: number): boolean;
    Insert(index: number, node: Yoga.YogaNode): void;
    RemoveAt(index: number): void;
    RemoveAll(): void;
    AddChild(child: Yoga.YogaNode): void;
    RemoveChild(child: Yoga.YogaNode): void;
    Clear(): void;
    IndexOf(node: Yoga.YogaNode): number;
    SetMeasureFunction(measureFunction: ((node: Yoga.YogaNode, width: number, widthMode: Yoga.YogaMeasureMode, height: number, heightMode: Yoga.YogaMeasureMode) => Yoga.YogaSize)): void;
    SetBaselineFunction(baselineFunction: ((node: Yoga.YogaNode, width: number, height: number) => number)): void;
    CalculateLayout(availableWidth?: number, availableHeight?: number): void;
    GetEnumerator(): System.Collections.Generic.IEnumerator<Yoga.YogaNode>;
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
    Default = 1,
    Static = 0,
    Relative = 1,
    Absolute = 2,
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
    Unit: Yoga.YogaUnit;
    Value: number;
    static Point(value: number): Yoga.YogaValue;
    Equals(other: Yoga.YogaValue): boolean;
    Equals(obj: any): boolean;
    GetHashCode(): number;
    static Undefined(): Yoga.YogaValue;
    static Auto(): Yoga.YogaValue;
    static Percent(value: number): Yoga.YogaValue;
    ToString(): string;
    GetType(): System.Type;
  }
  export class YogaValueExtensions {
    static Percent(value: number): Yoga.YogaValue;
    static Pt(value: number): Yoga.YogaValue;
    static Percent(value: number): Yoga.YogaValue;
    static Pt(value: number): Yoga.YogaValue;
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
