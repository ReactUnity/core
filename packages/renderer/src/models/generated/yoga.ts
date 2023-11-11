//
// Types in assemblies: Facebook.Yoga
// Generated 12/11/2023 01:13:26
//
/* eslint-disable */

import { System } from './system';

export declare namespace Facebook {
  export namespace Yoga {
    export class BaselineFunction {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(node: Facebook.Yoga.YogaNode, width: number, height: number): number;
      BeginInvoke(node: Facebook.Yoga.YogaNode, width: number, height: number, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
      BeginInvoke(config: Facebook.Yoga.YogaConfig, node: Facebook.Yoga.YogaNode, level: Facebook.Yoga.YogaLogLevel, message: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
      BeginInvoke(node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
    export class YogaConfig {
      constructor();
      Logger: ((config: Facebook.Yoga.YogaConfig, node: Facebook.Yoga.YogaNode, level: Facebook.Yoga.YogaLogLevel, message: string) => void);
      UseWebDefaults: boolean;
      UseLegacyStretchBehaviour: boolean;
      PointScaleFactor: number;
      SetExperimentalFeatureEnabled(feature: Facebook.Yoga.YogaExperimentalFeature, enabled: boolean): void;
      IsExperimentalFeatureEnabled(feature: Facebook.Yoga.YogaExperimentalFeature): boolean;
      static GetInstanceCount(): number;
      static SetDefaultLogger(logger: ((config: Facebook.Yoga.YogaConfig, node: Facebook.Yoga.YogaNode, level: Facebook.Yoga.YogaLogLevel, message: string) => void)): void;
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
      Invoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Facebook.Yoga.YogaLogLevel, message: string): void;
      BeginInvoke(unmanagedConfigPtr: System.IntPtr, unmanagedNotePtr: System.IntPtr, level: Facebook.Yoga.YogaLogLevel, message: string, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
      BeginInvoke(unmanagedNodePtr: System.IntPtr, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
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
      Gap: number;
      ColumnGap: number;
      RowGap: number;
      LayoutX: number;
      LayoutY: number;
      LayoutWidth: number;
      LayoutHeight: number;
      LayoutDirection: Facebook.Yoga.YogaDirection;
      Overflow: Facebook.Yoga.YogaOverflow;
      Data: any; // System.Object
      Count: number;
      IsReferenceBaseline: boolean;
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
      SetMeasureFunction(measureFunction: ((node: Facebook.Yoga.YogaNode, width: number, widthMode: Facebook.Yoga.YogaMeasureMode, height: number, heightMode: Facebook.Yoga.YogaMeasureMode) => Facebook.Yoga.YogaSize)): void;
      SetBaselineFunction(baselineFunction: ((node: Facebook.Yoga.YogaNode, width: number, height: number) => number)): void;
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
