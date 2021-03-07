//
// Types in assemblies: mscorlib, mscorlib, mscorlib, mscorlib, mscorlib
// Generated 7.03.2021 17:13:50
//


export namespace System {
  export declare class SpanExtensions {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class TupleExtensions {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ValueTuple {
    Equals: ((obj: System.Object) => boolean) | ((other: System.ValueTuple) => boolean);
    CompareTo: ((other: System.ValueTuple) => number);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class Array {
    LongLength: System.Int64;
    IsFixedSize: boolean;
    IsReadOnly: boolean;
    IsSynchronized: boolean;
    SyncRoot: System.Object;
    Length: number;
    Rank: number;
    CopyTo: ((array: System.Array, index: number) => void) | ((array: System.Array, index: System.Int64) => void);
    Clone: (() => System.Object);
    GetLongLength: ((dimension: number) => System.Int64);
    GetValue: ((index: System.Int64) => System.Object) | ((index1: System.Int64, index2: System.Int64) => System.Object) | ((index1: System.Int64, index2: System.Int64, index3: System.Int64) => System.Object) | ((indices: System.Int64[]) => System.Object) | ((indices: number[]) => System.Object) | ((index: number) => System.Object) | ((index1: number, index2: number) => System.Object) | ((index1: number, index2: number, index3: number) => System.Object);
    SetValue: ((value: System.Object, index: System.Int64) => void) | ((value: System.Object, index1: System.Int64, index2: System.Int64) => void) | ((value: System.Object, index1: System.Int64, index2: System.Int64, index3: System.Int64) => void) | ((value: System.Object, indices: System.Int64[]) => void) | ((value: System.Object, indices: number[]) => void) | ((value: System.Object, index: number) => void) | ((value: System.Object, index1: number, index2: number) => void) | ((value: System.Object, index1: number, index2: number, index3: number) => void);
    GetEnumerator: (() => System.Collections.IEnumerator);
    GetLength: ((dimension: number) => number);
    GetLowerBound: ((dimension: number) => number);
    GetUpperBound: ((dimension: number) => number);
    Initialize: (() => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Tuple {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class AggregateException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor(innerExceptions: any);
    constructor(innerExceptions: System.Exception[]);
    constructor(message: string, innerExceptions: any);
    constructor(message: string, innerExceptions: System.Exception[]);
    InnerExceptions: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.Exception]
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    Handle: ((predicate: any) => void);
    Flatten: (() => System.AggregateException);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class AppContext {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class FormattableString {
    Format: string;
    ArgumentCount: number;
    GetArguments: (() => System.Object[]);
    GetArgument: ((index: number) => System.Object);
    ToString: ((formatProvider: System.IFormatProvider) => string) | (() => string);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
  }
  export declare class LocalDataStoreSlot {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class AccessViolationException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Action {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: (() => void);
    BeginInvoke: ((callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Activator {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum LoaderOptimization {
    NotSpecified = 0,
    SingleDomain = 1,
    MultiDomain = 2,
    MultiDomainHost = 3,
    DomainMask = 3,
    DisallowBindings = 4,
  }
  export declare class AppDomainUnloadedException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ApplicationException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ApplicationId {
    constructor(publicKeyToken: System.Byte[], name: string, version: System.Version, processorArchitecture: string, culture: string);
    PublicKeyToken: System.Byte[];
    Name: string;
    Version: System.Version;
    ProcessorArchitecture: string;
    Culture: string;
    Copy: (() => System.ApplicationId);
    ToString: (() => string);
    Equals: ((o: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
  }
  export declare class ArgumentException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor(message: string, paramName: string, innerException: System.Exception);
    constructor(message: string, paramName: string);
    Message: string;
    ParamName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ArgumentNullException {
    constructor();
    constructor(paramName: string);
    constructor(message: string, innerException: System.Exception);
    constructor(paramName: string, message: string);
    Message: string;
    ParamName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ArgumentOutOfRangeException {
    constructor();
    constructor(paramName: string);
    constructor(paramName: string, message: string);
    constructor(message: string, innerException: System.Exception);
    constructor(paramName: string, actualValue: System.Object, message: string);
    Message: string;
    ActualValue: System.Object;
    ParamName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ArithmeticException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ArrayTypeMismatchException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class AsyncCallback {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((ar: System.IAsyncResult) => void);
    BeginInvoke: ((ar: System.IAsyncResult, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum AttributeTargets {
    Assembly = 1,
    Module = 2,
    Class = 4,
    Struct = 8,
    Enum = 16,
    Constructor = 32,
    Method = 64,
    Property = 128,
    Field = 256,
    Event = 512,
    Interface = 1024,
    Parameter = 2048,
    Delegate = 4096,
    ReturnValue = 8192,
    GenericParameter = 16384,
    All = 32767,
  }
  export declare class BadImageFormatException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    constructor(message: string, fileName: string);
    constructor(message: string, fileName: string, inner: System.Exception);
    Message: string;
    FileName: string;
    FusionLog: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class BitConverter {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Boolean {
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string);
    Equals: ((obj: System.Object) => boolean) | ((obj: boolean) => boolean);
    CompareTo: ((obj: System.Object) => number) | ((value: boolean) => number);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class Buffer {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Byte {
    CompareTo: ((value: System.Object) => number) | ((value: System.Byte) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.Byte) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class CannotUnloadAppDomainException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Char {
    GetHashCode: (() => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.Char) => boolean);
    CompareTo: ((value: System.Object) => number) | ((value: System.Char) => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class CharEnumerator {
    Current: System.Char;
    Clone: (() => System.Object);
    MoveNext: (() => boolean);
    Dispose: (() => void);
    Reset: (() => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ConsoleCancelEventHandler {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((sender: System.Object, e: System.ConsoleCancelEventArgs) => void);
    BeginInvoke: ((sender: System.Object, e: System.ConsoleCancelEventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ConsoleCancelEventArgs {
    Cancel: boolean;
    SpecialKey: System.ConsoleSpecialKey;
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum ConsoleColor {
    Black = 0,
    DarkBlue = 1,
    DarkGreen = 2,
    DarkCyan = 3,
    DarkRed = 4,
    DarkMagenta = 5,
    DarkYellow = 6,
    Gray = 7,
    DarkGray = 8,
    Blue = 9,
    Green = 10,
    Cyan = 11,
    Red = 12,
    Magenta = 13,
    Yellow = 14,
    White = 15,
  }
  export enum ConsoleKey {
    Backspace = 8,
    Tab = 9,
    Clear = 12,
    Enter = 13,
    Pause = 19,
    Escape = 27,
    Spacebar = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Select = 41,
    Print = 42,
    Execute = 43,
    PrintScreen = 44,
    Insert = 45,
    Delete = 46,
    Help = 47,
    D0 = 48,
    D1 = 49,
    D2 = 50,
    D3 = 51,
    D4 = 52,
    D5 = 53,
    D6 = 54,
    D7 = 55,
    D8 = 56,
    D9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    LeftWindows = 91,
    RightWindows = 92,
    Applications = 93,
    Sleep = 95,
    NumPad0 = 96,
    NumPad1 = 97,
    NumPad2 = 98,
    NumPad3 = 99,
    NumPad4 = 100,
    NumPad5 = 101,
    NumPad6 = 102,
    NumPad7 = 103,
    NumPad8 = 104,
    NumPad9 = 105,
    Multiply = 106,
    Add = 107,
    Separator = 108,
    Subtract = 109,
    Decimal = 110,
    Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    F13 = 124,
    F14 = 125,
    F15 = 126,
    F16 = 127,
    F17 = 128,
    F18 = 129,
    F19 = 130,
    F20 = 131,
    F21 = 132,
    F22 = 133,
    F23 = 134,
    F24 = 135,
    BrowserBack = 166,
    BrowserForward = 167,
    BrowserRefresh = 168,
    BrowserStop = 169,
    BrowserSearch = 170,
    BrowserFavorites = 171,
    BrowserHome = 172,
    VolumeMute = 173,
    VolumeDown = 174,
    VolumeUp = 175,
    MediaNext = 176,
    MediaPrevious = 177,
    MediaStop = 178,
    MediaPlay = 179,
    LaunchMail = 180,
    LaunchMediaSelect = 181,
    LaunchApp1 = 182,
    LaunchApp2 = 183,
    Oem1 = 186,
    OemPlus = 187,
    OemComma = 188,
    OemMinus = 189,
    OemPeriod = 190,
    Oem2 = 191,
    Oem3 = 192,
    Oem4 = 219,
    Oem5 = 220,
    Oem6 = 221,
    Oem7 = 222,
    Oem8 = 223,
    Oem102 = 226,
    Process = 229,
    Packet = 231,
    Attention = 246,
    CrSel = 247,
    ExSel = 248,
    EraseEndOfFile = 249,
    Play = 250,
    Zoom = 251,
    NoName = 252,
    Pa1 = 253,
    OemClear = 254,
  }
  export declare class ConsoleKeyInfo {
    constructor(keyChar: System.Char, key: System.ConsoleKey, shift: boolean, alt: boolean, control: boolean);
    KeyChar: System.Char;
    Key: System.ConsoleKey;
    Modifiers: System.ConsoleModifiers;
    Equals: ((value: System.Object) => boolean) | ((obj: System.ConsoleKeyInfo) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export enum ConsoleModifiers {
    Alt = 1,
    Shift = 2,
    Control = 4,
  }
  export enum ConsoleSpecialKey {
    ControlC = 0,
    ControlBreak = 1,
  }
  export declare class ContextBoundObject {
    CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
    GetLifetimeService: (() => System.Object);
    InitializeLifetimeService: (() => System.Object);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ContextMarshalException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export enum Base64FormattingOptions {
    None = 0,
    InsertLineBreaks = 1,
  }
  export declare class Convert {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class DataMisalignedException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class DateTime {
    constructor(ticks: System.Int64);
    constructor(ticks: System.Int64, kind: System.DateTimeKind);
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, calendar: System.Globalization.Calendar);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, kind: System.DateTimeKind);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, calendar: System.Globalization.Calendar);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: System.DateTimeKind);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: System.Globalization.Calendar);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: System.Globalization.Calendar, kind: System.DateTimeKind);
    Date: System.DateTime;
    Day: number;
    DayOfWeek: System.DayOfWeek;
    DayOfYear: number;
    Hour: number;
    Kind: System.DateTimeKind;
    Millisecond: number;
    Minute: number;
    Month: number;
    Second: number;
    Ticks: System.Int64;
    TimeOfDay: System.TimeSpan;
    Year: number;
    Add: ((value: System.TimeSpan) => System.DateTime);
    AddDays: ((value: number) => System.DateTime);
    AddHours: ((value: number) => System.DateTime);
    AddMilliseconds: ((value: number) => System.DateTime);
    AddMinutes: ((value: number) => System.DateTime);
    AddMonths: ((months: number) => System.DateTime);
    AddSeconds: ((value: number) => System.DateTime);
    AddTicks: ((value: System.Int64) => System.DateTime);
    AddYears: ((value: number) => System.DateTime);
    CompareTo: ((value: System.Object) => number) | ((value: System.DateTime) => number);
    Equals: ((value: System.Object) => boolean) | ((value: System.DateTime) => boolean);
    IsDaylightSavingTime: (() => boolean);
    ToBinary: (() => System.Int64);
    GetHashCode: (() => number);
    Subtract: ((value: System.DateTime) => System.TimeSpan) | ((value: System.TimeSpan) => System.DateTime);
    ToOADate: (() => number);
    ToFileTime: (() => System.Int64);
    ToFileTimeUtc: (() => System.Int64);
    ToLocalTime: (() => System.DateTime);
    ToLongDateString: (() => string);
    ToLongTimeString: (() => string);
    ToShortDateString: (() => string);
    ToShortTimeString: (() => string);
    ToString: (() => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string) | ((format: string, provider: System.IFormatProvider) => string);
    ToUniversalTime: (() => System.DateTime);
    GetDateTimeFormats: (() => string[]) | ((provider: System.IFormatProvider) => string[]) | ((format: System.Char) => string[]) | ((format: System.Char, provider: System.IFormatProvider) => string[]);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export enum DateTimeKind {
    Unspecified = 0,
    Utc = 1,
    Local = 2,
  }
  export declare class DateTimeOffset {
    constructor(ticks: System.Int64, offset: System.TimeSpan);
    constructor(dateTime: System.DateTime);
    constructor(dateTime: System.DateTime, offset: System.TimeSpan);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, offset: System.TimeSpan);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, offset: System.TimeSpan);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: System.Globalization.Calendar, offset: System.TimeSpan);
    DateTime: System.DateTime;
    UtcDateTime: System.DateTime;
    LocalDateTime: System.DateTime;
    Date: System.DateTime;
    Day: number;
    DayOfWeek: System.DayOfWeek;
    DayOfYear: number;
    Hour: number;
    Millisecond: number;
    Minute: number;
    Month: number;
    Offset: System.TimeSpan;
    Second: number;
    Ticks: System.Int64;
    UtcTicks: System.Int64;
    TimeOfDay: System.TimeSpan;
    Year: number;
    ToOffset: ((offset: System.TimeSpan) => System.DateTimeOffset);
    Add: ((timeSpan: System.TimeSpan) => System.DateTimeOffset);
    AddDays: ((days: number) => System.DateTimeOffset);
    AddHours: ((hours: number) => System.DateTimeOffset);
    AddMilliseconds: ((milliseconds: number) => System.DateTimeOffset);
    AddMinutes: ((minutes: number) => System.DateTimeOffset);
    AddMonths: ((months: number) => System.DateTimeOffset);
    AddSeconds: ((seconds: number) => System.DateTimeOffset);
    AddTicks: ((ticks: System.Int64) => System.DateTimeOffset);
    AddYears: ((years: number) => System.DateTimeOffset);
    CompareTo: ((other: System.DateTimeOffset) => number);
    Equals: ((obj: System.Object) => boolean) | ((other: System.DateTimeOffset) => boolean);
    EqualsExact: ((other: System.DateTimeOffset) => boolean);
    GetHashCode: (() => number);
    Subtract: ((value: System.DateTimeOffset) => System.TimeSpan) | ((value: System.TimeSpan) => System.DateTimeOffset);
    ToFileTime: (() => System.Int64);
    ToUnixTimeSeconds: (() => System.Int64);
    ToUnixTimeMilliseconds: (() => System.Int64);
    ToLocalTime: (() => System.DateTimeOffset);
    ToString: (() => string) | ((format: string) => string) | ((formatProvider: System.IFormatProvider) => string) | ((format: string, formatProvider: System.IFormatProvider) => string);
    ToUniversalTime: (() => System.DateTimeOffset);
    GetType: (() => System.Type);
  }
  export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
  }
  export declare class DBNull {
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
  }
  export declare class Decimal {
    constructor(value: number);
    constructor(value: System.UInt32);
    constructor(value: System.Int64);
    constructor(value: System.UInt64);
    constructor(value: number);
    constructor(value: number);
    constructor(bits: number[]);
    constructor(lo: number, mid: number, hi: number, isNegative: boolean, scale: System.Byte);
    CompareTo: ((value: System.Object) => number) | ((value: System.Decimal) => number);
    Equals: ((value: System.Object) => boolean) | ((value: System.Decimal) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class DivideByZeroException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class DllNotFoundException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    Message: string;
    TypeName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Double {
    CompareTo: ((value: System.Object) => number) | ((value: number) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: number) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class DuplicateWaitObjectException {
    constructor();
    constructor(parameterName: string);
    constructor(parameterName: string, message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    ParamName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class EntryPointNotFoundException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    Message: string;
    TypeName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Enum {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((format: string, provider: System.IFormatProvider) => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string);
    CompareTo: ((target: System.Object) => number);
    HasFlag: ((flag: System.Enum) => boolean);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class EventArgs {
    constructor();
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class EventHandler {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((sender: System.Object, e: System.EventArgs) => void);
    BeginInvoke: ((sender: System.Object, e: System.EventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Exception {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ExecutionEngineException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class FieldAccessException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class FormatException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export enum GCCollectionMode {
    Default = 0,
    Forced = 1,
    Optimized = 2,
  }
  export enum GCNotificationStatus {
    Succeeded = 0,
    Failed = 1,
    Canceled = 2,
    Timeout = 3,
    NotApplicable = 4,
  }
  export declare class GC {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Guid {
    constructor(b: System.Byte[]);
    constructor(a: System.UInt32, b: System.UInt16, c: System.UInt16, d: System.Byte, e: System.Byte, f: System.Byte, g: System.Byte, h: System.Byte, i: System.Byte, j: System.Byte, k: System.Byte);
    constructor(a: number, b: System.Int16, c: System.Int16, d: System.Byte[]);
    constructor(a: number, b: System.Int16, c: System.Int16, d: System.Byte, e: System.Byte, f: System.Byte, g: System.Byte, h: System.Byte, i: System.Byte, j: System.Byte, k: System.Byte);
    constructor(g: string);
    ToByteArray: (() => System.Byte[]);
    ToString: (() => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetHashCode: (() => number);
    Equals: ((o: System.Object) => boolean) | ((g: System.Guid) => boolean);
    CompareTo: ((value: System.Object) => number) | ((value: System.Guid) => number);
    GetType: (() => System.Type);
  }
  export declare class _AppDomain {
    FriendlyName: string;
    BaseDirectory: string;
    RelativeSearchPath: string;
    ShadowCopyFiles: boolean;
    DynamicDirectory: string;
    Evidence: System.Security.Policy.Evidence;
    GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
    ToString: (() => string);
    Equals: ((other: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    InitializeLifetimeService: (() => System.Object);
    GetLifetimeService: (() => System.Object);
    DefineDynamicAssembly: ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, evidence: System.Security.Policy.Evidence) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet, isSynchronized: boolean) => System.Reflection.Emit.AssemblyBuilder);
    CreateInstance: ((assemblyName: string, typeName: string) => System.Runtime.Remoting.ObjectHandle) | ((assemblyName: string, typeName: string, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Runtime.Remoting.ObjectHandle);
    CreateInstanceFrom: ((assemblyFile: string, typeName: string) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Runtime.Remoting.ObjectHandle);
    Load: ((assemblyRef: System.Reflection.AssemblyName) => System.Reflection.Assembly) | ((assemblyString: string) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[]) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[], rawSymbolStore: System.Byte[]) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[], rawSymbolStore: System.Byte[], securityEvidence: System.Security.Policy.Evidence) => System.Reflection.Assembly) | ((assemblyRef: System.Reflection.AssemblyName, assemblySecurity: System.Security.Policy.Evidence) => System.Reflection.Assembly) | ((assemblyString: string, assemblySecurity: System.Security.Policy.Evidence) => System.Reflection.Assembly);
    ExecuteAssembly: ((assemblyFile: string, assemblySecurity: System.Security.Policy.Evidence) => number) | ((assemblyFile: string) => number) | ((assemblyFile: string, assemblySecurity: System.Security.Policy.Evidence, args: string[]) => number);
    GetAssemblies: (() => System.Reflection.Assembly[]);
    AppendPrivatePath: ((path: string) => void);
    ClearPrivatePath: (() => void);
    SetShadowCopyPath: ((s: string) => void);
    ClearShadowCopyPath: (() => void);
    SetCachePath: ((s: string) => void);
    SetData: ((name: string, data: System.Object) => void);
    GetData: ((name: string) => System.Object);
    DoCallBack: ((theDelegate: System.CrossAppDomainDelegate) => void);
    SetAppDomainPolicy: ((domainPolicy: System.Security.Policy.PolicyLevel) => void);
    SetPrincipalPolicy: ((policy: System.Security.Principal.PrincipalPolicy) => void);
    SetThreadPrincipal: ((principal: System.Security.Principal.IPrincipal) => void);
  }
  export declare class IAppDomainSetup {
    ApplicationBase: string;
    ApplicationName: string;
    CachePath: string;
    ConfigurationFile: string;
    DynamicBase: string;
    LicenseFile: string;
    PrivateBinPath: string;
    PrivateBinPathProbe: string;
    ShadowCopyDirectories: string;
    ShadowCopyFiles: string;
  }
  export declare class IAsyncResult {
    IsCompleted: boolean;
    AsyncWaitHandle: System.Threading.WaitHandle;
    AsyncState: System.Object;
    CompletedSynchronously: boolean;
  }
  export declare class ICloneable {
    Clone: (() => System.Object);
  }
  export declare class IComparable {
    CompareTo: ((obj: System.Object) => number);
  }
  export declare class IConvertible {
    GetTypeCode: (() => System.TypeCode);
    ToBoolean: ((provider: System.IFormatProvider) => boolean);
    ToChar: ((provider: System.IFormatProvider) => System.Char);
    ToSByte: ((provider: System.IFormatProvider) => System.SByte);
    ToByte: ((provider: System.IFormatProvider) => System.Byte);
    ToInt16: ((provider: System.IFormatProvider) => System.Int16);
    ToUInt16: ((provider: System.IFormatProvider) => System.UInt16);
    ToInt32: ((provider: System.IFormatProvider) => number);
    ToUInt32: ((provider: System.IFormatProvider) => System.UInt32);
    ToInt64: ((provider: System.IFormatProvider) => System.Int64);
    ToUInt64: ((provider: System.IFormatProvider) => System.UInt64);
    ToSingle: ((provider: System.IFormatProvider) => number);
    ToDouble: ((provider: System.IFormatProvider) => number);
    ToDecimal: ((provider: System.IFormatProvider) => System.Decimal);
    ToDateTime: ((provider: System.IFormatProvider) => System.DateTime);
    ToString: ((provider: System.IFormatProvider) => string);
    ToType: ((conversionType: System.Type, provider: System.IFormatProvider) => System.Object);
  }
  export declare class ICustomFormatter {
    Format: ((format: string, arg: System.Object, formatProvider: System.IFormatProvider) => string);
  }
  export declare class IDisposable {
    Dispose: (() => void);
  }
  export declare class IFormatProvider {
    GetFormat: ((formatType: System.Type) => System.Object);
  }
  export declare class IFormattable {
    ToString: ((format: string, formatProvider: System.IFormatProvider) => string);
  }
  export declare class IndexOutOfRangeException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class InsufficientExecutionStackException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class InsufficientMemoryException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Int16 {
    CompareTo: ((value: System.Object) => number) | ((value: System.Int16) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.Int16) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class Int32 {
    CompareTo: ((value: System.Object) => number) | ((value: number) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: number) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((format: string) => string) | ((provider: System.IFormatProvider) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class Int64 {
    CompareTo: ((value: System.Object) => number) | ((value: System.Int64) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.Int64) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class InvalidCastException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor(message: string, errorCode: number);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class InvalidOperationException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class InvalidProgramException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class InvalidTimeZoneException {
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor();
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class IServiceProvider {
    GetService: ((serviceType: System.Type) => System.Object);
  }
  export declare class Math {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class MemberAccessException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class MethodAccessException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export enum MidpointRounding {
    ToEven = 0,
    AwayFromZero = 1,
  }
  export declare class MissingFieldException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    constructor(className: string, fieldName: string);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class MissingMemberException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    constructor(className: string, memberName: string);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class MissingMethodException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    constructor(className: string, methodName: string);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class MulticastNotSupportedException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class NotFiniteNumberException {
    constructor();
    constructor(offendingNumber: number);
    constructor(message: string);
    constructor(message: string, offendingNumber: number);
    constructor(message: string, innerException: System.Exception);
    constructor(message: string, offendingNumber: number, innerException: System.Exception);
    OffendingNumber: number;
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class NotImplementedException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class NotSupportedException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class NullReferenceException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class ObjectDisposedException {
    constructor(objectName: string);
    constructor(objectName: string, message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    ObjectName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class OperationCanceledException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor(token: System.Threading.CancellationToken);
    constructor(message: string, token: System.Threading.CancellationToken);
    constructor(message: string, innerException: System.Exception, token: System.Threading.CancellationToken);
    CancellationToken: System.Threading.CancellationToken;
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class OutOfMemoryException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class OverflowException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class PlatformNotSupportedException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Random {
    constructor();
    constructor(Seed: number);
    Next: (() => number) | ((minValue: number, maxValue: number) => number) | ((maxValue: number) => number);
    NextDouble: (() => number);
    NextBytes: ((buffer: System.Byte[]) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class RankException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class SByte {
    CompareTo: ((obj: System.Object) => number) | ((value: System.SByte) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.SByte) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class Single {
    CompareTo: ((value: System.Object) => number) | ((value: number) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: number) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class StackOverflowException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class String {
    constructor(value: System.Char[], startIndex: number, length: number);
    constructor(value: System.Char[]);
    constructor(c: System.Char, count: number);
    Length: number;
    Equals: ((obj: System.Object) => boolean) | ((value: string) => boolean) | ((value: string, comparisonType: System.StringComparison) => boolean);
    CopyTo: ((sourceIndex: number, destination: System.Char[], destinationIndex: number, count: number) => void);
    ToCharArray: (() => System.Char[]) | ((startIndex: number, length: number) => System.Char[]);
    GetHashCode: (() => number);
    Split: ((separator: System.Char[]) => string[]) | ((separator: System.Char[], count: number) => string[]) | ((separator: System.Char[], options: System.StringSplitOptions) => string[]) | ((separator: System.Char[], count: number, options: System.StringSplitOptions) => string[]) | ((separator: string[], options: System.StringSplitOptions) => string[]) | ((separator: string[], count: number, options: System.StringSplitOptions) => string[]);
    Substring: ((startIndex: number) => string) | ((startIndex: number, length: number) => string);
    Trim: ((trimChars: System.Char[]) => string) | (() => string);
    TrimStart: ((trimChars: System.Char[]) => string);
    TrimEnd: ((trimChars: System.Char[]) => string);
    IsNormalized: (() => boolean) | ((normalizationForm: System.Text.NormalizationForm) => boolean);
    Normalize: (() => string) | ((normalizationForm: System.Text.NormalizationForm) => string);
    CompareTo: ((value: System.Object) => number) | ((strB: string) => number);
    Contains: ((value: string) => boolean);
    EndsWith: ((value: string) => boolean) | ((value: string, comparisonType: System.StringComparison) => boolean) | ((value: string, ignoreCase: boolean, culture: System.Globalization.CultureInfo) => boolean);
    IndexOf: ((value: System.Char) => number) | ((value: System.Char, startIndex: number) => number) | ((value: string) => number) | ((value: string, startIndex: number) => number) | ((value: string, startIndex: number, count: number) => number) | ((value: string, comparisonType: System.StringComparison) => number) | ((value: string, startIndex: number, comparisonType: System.StringComparison) => number) | ((value: string, startIndex: number, count: number, comparisonType: System.StringComparison) => number) | ((value: System.Char, startIndex: number, count: number) => number);
    IndexOfAny: ((anyOf: System.Char[]) => number) | ((anyOf: System.Char[], startIndex: number) => number) | ((anyOf: System.Char[], startIndex: number, count: number) => number);
    LastIndexOf: ((value: System.Char) => number) | ((value: System.Char, startIndex: number) => number) | ((value: string) => number) | ((value: string, startIndex: number) => number) | ((value: string, startIndex: number, count: number) => number) | ((value: string, comparisonType: System.StringComparison) => number) | ((value: string, startIndex: number, comparisonType: System.StringComparison) => number) | ((value: string, startIndex: number, count: number, comparisonType: System.StringComparison) => number) | ((value: System.Char, startIndex: number, count: number) => number);
    LastIndexOfAny: ((anyOf: System.Char[]) => number) | ((anyOf: System.Char[], startIndex: number) => number) | ((anyOf: System.Char[], startIndex: number, count: number) => number);
    PadLeft: ((totalWidth: number) => string) | ((totalWidth: number, paddingChar: System.Char) => string);
    PadRight: ((totalWidth: number) => string) | ((totalWidth: number, paddingChar: System.Char) => string);
    StartsWith: ((value: string) => boolean) | ((value: string, comparisonType: System.StringComparison) => boolean) | ((value: string, ignoreCase: boolean, culture: System.Globalization.CultureInfo) => boolean);
    ToLower: (() => string) | ((culture: System.Globalization.CultureInfo) => string);
    ToLowerInvariant: (() => string);
    ToUpper: (() => string) | ((culture: System.Globalization.CultureInfo) => string);
    ToUpperInvariant: (() => string);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string);
    Clone: (() => System.Object);
    Insert: ((startIndex: number, value: string) => string);
    Replace: ((oldChar: System.Char, newChar: System.Char) => string) | ((oldValue: string, newValue: string) => string);
    Remove: ((startIndex: number, count: number) => string) | ((startIndex: number) => string);
    GetTypeCode: (() => System.TypeCode);
    GetEnumerator: (() => System.CharEnumerator);
    GetType: (() => System.Type);
  }
  export enum StringSplitOptions {
    None = 0,
    RemoveEmptyEntries = 1,
  }
  export declare class StringComparer {
    Compare: ((x: System.Object, y: System.Object) => number) | ((x: string, y: string) => number);
    Equals: ((x: System.Object, y: System.Object) => boolean) | ((x: string, y: string) => boolean) | ((obj: System.Object) => boolean);
    GetHashCode: ((obj: System.Object) => number) | ((obj: string) => number) | (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class SystemException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class TimeoutException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class TimeSpan {
    constructor(ticks: System.Int64);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    Ticks: System.Int64;
    Days: number;
    Hours: number;
    Milliseconds: number;
    Minutes: number;
    Seconds: number;
    TotalDays: number;
    TotalHours: number;
    TotalMilliseconds: number;
    TotalMinutes: number;
    TotalSeconds: number;
    Add: ((ts: System.TimeSpan) => System.TimeSpan);
    CompareTo: ((value: System.Object) => number) | ((value: System.TimeSpan) => number);
    Duration: (() => System.TimeSpan);
    Equals: ((value: System.Object) => boolean) | ((obj: System.TimeSpan) => boolean);
    GetHashCode: (() => number);
    Negate: (() => System.TimeSpan);
    Subtract: ((ts: System.TimeSpan) => System.TimeSpan);
    ToString: (() => string) | ((format: string) => string) | ((format: string, formatProvider: System.IFormatProvider) => string);
    GetType: (() => System.Type);
  }
  export declare class TimeZoneInfo {
    BaseUtcOffset: System.TimeSpan;
    DaylightName: string;
    DisplayName: string;
    Id: string;
    StandardName: string;
    SupportsDaylightSavingTime: boolean;
    ToSerializedString: (() => string);
    Equals: ((obj: System.Object) => boolean) | ((other: System.TimeZoneInfo) => boolean);
    GetAdjustmentRules: (() => System.TimeZoneInfo_AdjustmentRule[]);
    GetAmbiguousTimeOffsets: ((dateTime: System.DateTime) => System.TimeSpan[]) | ((dateTimeOffset: System.DateTimeOffset) => System.TimeSpan[]);
    GetHashCode: (() => number);
    GetUtcOffset: ((dateTime: System.DateTime) => System.TimeSpan) | ((dateTimeOffset: System.DateTimeOffset) => System.TimeSpan);
    HasSameRules: ((other: System.TimeZoneInfo) => boolean);
    IsAmbiguousTime: ((dateTime: System.DateTime) => boolean) | ((dateTimeOffset: System.DateTimeOffset) => boolean);
    IsDaylightSavingTime: ((dateTime: System.DateTime) => boolean) | ((dateTimeOffset: System.DateTimeOffset) => boolean);
    IsInvalidTime: ((dateTime: System.DateTime) => boolean);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class TimeZoneInfo_AdjustmentRule {
    DateStart: System.DateTime;
    DateEnd: System.DateTime;
    DaylightDelta: System.TimeSpan;
    DaylightTransitionStart: System.TimeZoneInfo_TransitionTime;
    DaylightTransitionEnd: System.TimeZoneInfo_TransitionTime;
    Equals: ((other: System.TimeZoneInfo_AdjustmentRule) => boolean) | ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class TimeZoneInfo_TransitionTime {
    TimeOfDay: System.DateTime;
    Month: number;
    Week: number;
    Day: number;
    DayOfWeek: System.DayOfWeek;
    IsFixedDateRule: boolean;
    Equals: ((obj: System.Object) => boolean) | ((other: System.TimeZoneInfo_TransitionTime) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class TimeZoneNotFoundException {
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    constructor();
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Type {
    MemberType: System.Reflection.MemberTypes;
    DeclaringType: System.Type;
    DeclaringMethod: System.Reflection.MethodBase;
    ReflectedType: System.Type;
    StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
    GUID: System.Guid;
    Module: System.Reflection.Module;
    Assembly: System.Reflection.Assembly;
    TypeHandle: System.RuntimeTypeHandle;
    FullName: string;
    Namespace: string;
    AssemblyQualifiedName: string;
    BaseType: System.Type;
    TypeInitializer: System.Reflection.ConstructorInfo;
    IsNested: boolean;
    Attributes: System.Reflection.TypeAttributes;
    GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
    IsVisible: boolean;
    IsNotPublic: boolean;
    IsPublic: boolean;
    IsNestedPublic: boolean;
    IsNestedPrivate: boolean;
    IsNestedFamily: boolean;
    IsNestedAssembly: boolean;
    IsNestedFamANDAssem: boolean;
    IsNestedFamORAssem: boolean;
    IsAutoLayout: boolean;
    IsLayoutSequential: boolean;
    IsExplicitLayout: boolean;
    IsClass: boolean;
    IsInterface: boolean;
    IsValueType: boolean;
    IsAbstract: boolean;
    IsSealed: boolean;
    IsEnum: boolean;
    IsSpecialName: boolean;
    IsImport: boolean;
    IsSerializable: boolean;
    IsAnsiClass: boolean;
    IsUnicodeClass: boolean;
    IsAutoClass: boolean;
    IsArray: boolean;
    IsGenericType: boolean;
    IsGenericTypeDefinition: boolean;
    IsConstructedGenericType: boolean;
    IsGenericParameter: boolean;
    GenericParameterPosition: number;
    ContainsGenericParameters: boolean;
    IsByRef: boolean;
    IsPointer: boolean;
    IsPrimitive: boolean;
    IsCOMObject: boolean;
    HasElementType: boolean;
    IsContextful: boolean;
    IsMarshalByRef: boolean;
    GenericTypeArguments: System.Type[];
    IsSecurityCritical: boolean;
    IsSecuritySafeCritical: boolean;
    IsSecurityTransparent: boolean;
    UnderlyingSystemType: System.Type;
    IsSZArray: boolean;
    Name: string;
    CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
    MetadataToken: number;
    MakePointerType: (() => System.Type);
    MakeByRefType: (() => System.Type);
    MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
    InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
    GetArrayRank: (() => number);
    GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
    GetConstructors: (() => System.Reflection.ConstructorInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]);
    GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
    GetMethods: (() => System.Reflection.MethodInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]);
    GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
    GetFields: (() => System.Reflection.FieldInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]);
    GetInterface: ((name: string) => System.Type) | ((name: string, ignoreCase: boolean) => System.Type);
    GetInterfaces: (() => System.Type[]);
    FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
    GetEvent: ((name: string) => System.Reflection.EventInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo);
    GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
    GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
    GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
    GetNestedTypes: (() => System.Type[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]);
    GetNestedType: ((name: string) => System.Type) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type);
    GetMember: ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
    GetMembers: (() => System.Reflection.MemberInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
    GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
    FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
    GetGenericParameterConstraints: (() => System.Type[]);
    MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
    GetElementType: (() => System.Type);
    GetGenericArguments: (() => System.Type[]);
    GetGenericTypeDefinition: (() => System.Type);
    GetEnumNames: (() => string[]);
    GetEnumValues: (() => System.Array);
    GetEnumUnderlyingType: (() => System.Type);
    IsEnumDefined: ((value: System.Object) => boolean);
    GetEnumName: ((value: System.Object) => string);
    IsSubclassOf: ((c: System.Type) => boolean);
    IsInstanceOfType: ((o: System.Object) => boolean);
    IsAssignableFrom: ((c: System.Type) => boolean);
    IsEquivalentTo: ((other: System.Type) => boolean);
    ToString: (() => string);
    Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
    GetHashCode: (() => number);
    GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
    GetType: (() => System.Type) | (() => System.Type);
    GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
    IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
    GetCustomAttributesData: (() => any);
  }
  export declare class TypeAccessException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    Message: string;
    TypeName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class TypedReference {
    GetHashCode: (() => number);
    Equals: ((o: System.Object) => boolean);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class TypeInitializationException {
    constructor(fullTypeName: string, innerException: System.Exception);
    TypeName: string;
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class TypeLoadException {
    constructor();
    constructor(message: string);
    constructor(message: string, inner: System.Exception);
    Message: string;
    TypeName: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class TypeUnloadedException {
    constructor();
    constructor(message: string);
    constructor(message: string, innerException: System.Exception);
    Message: string;
    Data: System.Collections.IDictionary;
    InnerException: System.Exception;
    TargetSite: System.Reflection.MethodBase;
    StackTrace: string;
    HelpLink: string;
    Source: string;
    HResult: number;
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class UInt16 {
    CompareTo: ((value: System.Object) => number) | ((value: System.UInt16) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.UInt16) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class UInt32 {
    CompareTo: ((value: System.Object) => number) | ((value: System.UInt32) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.UInt32) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class UInt64 {
    CompareTo: ((value: System.Object) => number) | ((value: System.UInt64) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.UInt64) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((provider: System.IFormatProvider) => string) | ((format: string) => string) | ((format: string, provider: System.IFormatProvider) => string);
    GetTypeCode: (() => System.TypeCode);
    GetType: (() => System.Type);
  }
  export declare class UnauthorizedAccessException {
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
    GetBaseException: (() => System.Exception);
    ToString: (() => string);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetType: (() => System.Type) | (() => System.Type);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class UnhandledExceptionEventArgs {
    constructor(exception: System.Object, isTerminating: boolean);
    ExceptionObject: System.Object;
    IsTerminating: boolean;
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class UnhandledExceptionEventHandler {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((sender: System.Object, e: System.UnhandledExceptionEventArgs) => void);
    BeginInvoke: ((sender: System.Object, e: System.UnhandledExceptionEventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Version {
    constructor(major: number, minor: number, build: number, revision: number);
    constructor(major: number, minor: number, build: number);
    constructor(major: number, minor: number);
    constructor(version: string);
    constructor();
    Major: number;
    Minor: number;
    Build: number;
    Revision: number;
    MajorRevision: System.Int16;
    MinorRevision: System.Int16;
    Clone: (() => System.Object);
    CompareTo: ((version: System.Object) => number) | ((value: System.Version) => number);
    Equals: ((obj: System.Object) => boolean) | ((obj: System.Version) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string) | ((fieldCount: number) => string);
    GetType: (() => System.Type);
  }
  export declare class AppDomain {
    SetupInformation: System.AppDomainSetup;
    ApplicationTrust: System.Security.Policy.ApplicationTrust;
    BaseDirectory: string;
    RelativeSearchPath: string;
    DynamicDirectory: string;
    ShadowCopyFiles: boolean;
    FriendlyName: string;
    Evidence: System.Security.Policy.Evidence;
    PermissionSet: System.Security.PermissionSet;
    IsHomogenous: boolean;
    IsFullyTrusted: boolean;
    DomainManager: System.AppDomainManager;
    ActivationContext: System.ActivationContext;
    ApplicationIdentity: System.ApplicationIdentity;
    Id: number;
    MonitoringSurvivedMemorySize: System.Int64;
    MonitoringTotalAllocatedMemorySize: System.Int64;
    MonitoringTotalProcessorTime: System.TimeSpan;
    AppendPrivatePath: ((path: string) => void);
    ClearPrivatePath: (() => void);
    ClearShadowCopyPath: (() => void);
    CreateComInstanceFrom: ((assemblyName: string, typeName: string) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string, hashValue: System.Byte[], hashAlgorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm) => System.Runtime.Remoting.ObjectHandle);
    CreateInstance: ((assemblyName: string, typeName: string) => System.Runtime.Remoting.ObjectHandle) | ((assemblyName: string, typeName: string, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Runtime.Remoting.ObjectHandle) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle);
    CreateInstanceAndUnwrap: ((assemblyName: string, typeName: string) => System.Object) | ((assemblyName: string, typeName: string, activationAttributes: System.Object[]) => System.Object) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Object) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Object);
    CreateInstanceFrom: ((assemblyFile: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string, activationAttributes: System.Object[]) => System.Runtime.Remoting.ObjectHandle) | ((assemblyFile: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Runtime.Remoting.ObjectHandle);
    CreateInstanceFromAndUnwrap: ((assemblyFile: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Object) | ((assemblyName: string, typeName: string) => System.Object) | ((assemblyName: string, typeName: string, activationAttributes: System.Object[]) => System.Object) | ((assemblyName: string, typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[], securityAttributes: System.Security.Policy.Evidence) => System.Object);
    DefineDynamicAssembly: ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, evidence: System.Security.Policy.Evidence) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet, isSynchronized: boolean) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, evidence: System.Security.Policy.Evidence, requiredPermissions: System.Security.PermissionSet, optionalPermissions: System.Security.PermissionSet, refusedPermissions: System.Security.PermissionSet, isSynchronized: boolean, assemblyAttributes: any) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, assemblyAttributes: any) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, dir: string, isSynchronized: boolean, assemblyAttributes: any) => System.Reflection.Emit.AssemblyBuilder) | ((name: System.Reflection.AssemblyName, access: System.Reflection.Emit.AssemblyBuilderAccess, assemblyAttributes: any, securityContextSource: System.Security.SecurityContextSource) => System.Reflection.Emit.AssemblyBuilder);
    DoCallBack: ((callBackDelegate: System.CrossAppDomainDelegate) => void);
    ExecuteAssembly: ((assemblyFile: string) => number) | ((assemblyFile: string, assemblySecurity: System.Security.Policy.Evidence) => number) | ((assemblyFile: string, assemblySecurity: System.Security.Policy.Evidence, args: string[]) => number) | ((assemblyFile: string, assemblySecurity: System.Security.Policy.Evidence, args: string[], hashValue: System.Byte[], hashAlgorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm) => number) | ((assemblyFile: string, args: string[]) => number) | ((assemblyFile: string, args: string[], hashValue: System.Byte[], hashAlgorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm) => number);
    GetAssemblies: (() => System.Reflection.Assembly[]);
    GetData: ((name: string) => System.Object);
    GetType: (() => System.Type) | (() => System.Type);
    InitializeLifetimeService: (() => System.Object);
    Load: ((assemblyRef: System.Reflection.AssemblyName) => System.Reflection.Assembly) | ((assemblyRef: System.Reflection.AssemblyName, assemblySecurity: System.Security.Policy.Evidence) => System.Reflection.Assembly) | ((assemblyString: string) => System.Reflection.Assembly) | ((assemblyString: string, assemblySecurity: System.Security.Policy.Evidence) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[]) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[], rawSymbolStore: System.Byte[]) => System.Reflection.Assembly) | ((rawAssembly: System.Byte[], rawSymbolStore: System.Byte[], securityEvidence: System.Security.Policy.Evidence) => System.Reflection.Assembly);
    SetAppDomainPolicy: ((domainPolicy: System.Security.Policy.PolicyLevel) => void);
    SetCachePath: ((path: string) => void);
    SetPrincipalPolicy: ((policy: System.Security.Principal.PrincipalPolicy) => void);
    SetShadowCopyFiles: (() => void);
    SetShadowCopyPath: ((path: string) => void);
    SetThreadPrincipal: ((principal: System.Security.Principal.IPrincipal) => void);
    IsFinalizingForUnload: (() => boolean);
    SetData: ((name: string, data: System.Object) => void) | ((name: string, data: System.Object, permission: System.Security.IPermission) => void);
    SetDynamicBase: ((path: string) => void);
    ToString: (() => string);
    ApplyPolicy: ((assemblyName: string) => string);
    ExecuteAssemblyByName: ((assemblyName: string) => number) | ((assemblyName: string, assemblySecurity: System.Security.Policy.Evidence) => number) | ((assemblyName: string, assemblySecurity: System.Security.Policy.Evidence, args: string[]) => number) | ((assemblyName: System.Reflection.AssemblyName, assemblySecurity: System.Security.Policy.Evidence, args: string[]) => number) | ((assemblyName: string, args: string[]) => number) | ((assemblyName: System.Reflection.AssemblyName, args: string[]) => number);
    IsDefaultAppDomain: (() => boolean);
    ReflectionOnlyGetAssemblies: (() => System.Reflection.Assembly[]);
    IsCompatibilitySwitchSet: ((value: string) => boolean);
    CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
    GetLifetimeService: (() => System.Object);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
  }
  export declare class Environment {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum Environment_SpecialFolder {
    MyDocuments = 5,
    Desktop = 0,
    MyComputer = 17,
    Programs = 2,
    Personal = 5,
    Favorites = 6,
    Startup = 7,
    Recent = 8,
    SendTo = 9,
    StartMenu = 11,
    MyMusic = 13,
    DesktopDirectory = 16,
    Templates = 21,
    ApplicationData = 26,
    LocalApplicationData = 28,
    InternetCache = 32,
    Cookies = 33,
    History = 34,
    CommonApplicationData = 35,
    System = 37,
    ProgramFiles = 38,
    MyPictures = 39,
    CommonProgramFiles = 43,
    MyVideos = 14,
    NetworkShortcuts = 19,
    Fonts = 20,
    CommonStartMenu = 22,
    CommonPrograms = 23,
    CommonStartup = 24,
    CommonDesktopDirectory = 25,
    PrinterShortcuts = 27,
    Windows = 36,
    UserProfile = 40,
    SystemX86 = 41,
    ProgramFilesX86 = 42,
    CommonProgramFilesX86 = 44,
    CommonTemplates = 45,
    CommonDocuments = 46,
    CommonAdminTools = 47,
    AdminTools = 48,
    CommonMusic = 53,
    CommonPictures = 54,
    CommonVideos = 55,
    Resources = 56,
    LocalizedResources = 57,
    CommonOemLinks = 58,
    CDBurning = 59,
  }
  export enum Environment_SpecialFolderOption {
    None = 0,
    DoNotVerify = 16384,
    Create = 32768,
  }
  export declare class ActivationContext {
    Form: System.ActivationContext_ContextForm;
    Identity: System.ApplicationIdentity;
    ApplicationManifestBytes: System.Byte[];
    DeploymentManifestBytes: System.Byte[];
    Dispose: (() => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum ActivationContext_ContextForm {
    Loose = 0,
    StoreBounded = 1,
  }
  export declare class AppDomainInitializer {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((args: string[]) => void);
    BeginInvoke: ((args: string[], callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class AppDomainManager {
    constructor();
    ApplicationActivator: System.Runtime.Hosting.ApplicationActivator;
    EntryAssembly: System.Reflection.Assembly;
    HostExecutionContextManager: System.Threading.HostExecutionContextManager;
    HostSecurityManager: System.Security.HostSecurityManager;
    InitializationFlags: System.AppDomainManagerInitializationOptions;
    CreateDomain: ((friendlyName: string, securityInfo: System.Security.Policy.Evidence, appDomainInfo: System.AppDomainSetup) => System.AppDomain);
    InitializeNewDomain: ((appDomainInfo: System.AppDomainSetup) => void);
    CheckSecuritySettings: ((state: System.Security.SecurityState) => boolean);
    CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
    GetLifetimeService: (() => System.Object);
    InitializeLifetimeService: (() => System.Object);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class AppDomainSetup {
    constructor();
    constructor(activationArguments: System.Runtime.Hosting.ActivationArguments);
    constructor(activationContext: System.ActivationContext);
    ApplicationBase: string;
    ApplicationName: string;
    CachePath: string;
    ConfigurationFile: string;
    DisallowPublisherPolicy: boolean;
    DynamicBase: string;
    LicenseFile: string;
    LoaderOptimization: System.LoaderOptimization;
    PrivateBinPath: string;
    PrivateBinPathProbe: string;
    ShadowCopyDirectories: string;
    ShadowCopyFiles: string;
    DisallowBindingRedirects: boolean;
    DisallowCodeDownload: boolean;
    TargetFrameworkName: string;
    ActivationArguments: System.Runtime.Hosting.ActivationArguments;
    AppDomainInitializer: System.AppDomainInitializer;
    AppDomainInitializerArguments: string[];
    ApplicationTrust: System.Security.Policy.ApplicationTrust;
    DisallowApplicationBaseProbing: boolean;
    AppDomainManagerAssembly: string;
    AppDomainManagerType: string;
    PartialTrustVisibleAssemblies: string[];
    SandboxInterop: boolean;
    GetConfigurationBytes: (() => System.Byte[]);
    SetConfigurationBytes: ((value: System.Byte[]) => void);
    SetCompatibilitySwitches: ((switches: any) => void);
    SetNativeFunction: ((functionName: string, functionVersion: number, functionPointer: System.IntPtr) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ApplicationIdentity {
    constructor(applicationIdentityFullName: string);
    CodeBase: string;
    FullName: string;
    ToString: (() => string);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
  }
  export declare class ArgIterator {
    constructor(arglist: System.RuntimeArgumentHandle);
    End: (() => void);
    Equals: ((o: System.Object) => boolean);
    GetHashCode: (() => number);
    GetNextArg: (() => System.TypedReference) | ((rth: System.RuntimeTypeHandle) => System.TypedReference);
    GetNextArgType: (() => System.RuntimeTypeHandle);
    GetRemainingCount: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class AssemblyLoadEventArgs {
    constructor(loadedAssembly: System.Reflection.Assembly);
    LoadedAssembly: System.Reflection.Assembly;
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class AssemblyLoadEventHandler {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((sender: System.Object, args: System.AssemblyLoadEventArgs) => void);
    BeginInvoke: ((sender: System.Object, args: System.AssemblyLoadEventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Console {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class CrossAppDomainDelegate {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: (() => void);
    BeginInvoke: ((callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => void);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Delegate {
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetInvocationList: (() => System.Delegate[]);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum AppDomainManagerInitializationOptions {
    None = 0,
    RegisterWithHost = 1,
  }
  export enum EnvironmentVariableTarget {
    Process = 0,
    User = 1,
    Machine = 2,
  }
  export declare class IntPtr {
    constructor(value: number);
    constructor(value: System.Int64);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToInt32: (() => number);
    ToInt64: (() => System.Int64);
    ToString: (() => string) | ((format: string) => string);
    GetType: (() => System.Type);
  }
  export declare class MarshalByRefObject {
    CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
    GetLifetimeService: (() => System.Object);
    InitializeLifetimeService: (() => System.Object);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ModuleHandle {
    MDStreamVersion: number;
    ResolveFieldHandle: ((fieldToken: number) => System.RuntimeFieldHandle) | ((fieldToken: number, typeInstantiationContext: System.RuntimeTypeHandle[], methodInstantiationContext: System.RuntimeTypeHandle[]) => System.RuntimeFieldHandle);
    ResolveMethodHandle: ((methodToken: number) => System.RuntimeMethodHandle) | ((methodToken: number, typeInstantiationContext: System.RuntimeTypeHandle[], methodInstantiationContext: System.RuntimeTypeHandle[]) => System.RuntimeMethodHandle);
    ResolveTypeHandle: ((typeToken: number) => System.RuntimeTypeHandle) | ((typeToken: number, typeInstantiationContext: System.RuntimeTypeHandle[], methodInstantiationContext: System.RuntimeTypeHandle[]) => System.RuntimeTypeHandle);
    GetRuntimeFieldHandleFromMetadataToken: ((fieldToken: number) => System.RuntimeFieldHandle);
    GetRuntimeMethodHandleFromMetadataToken: ((methodToken: number) => System.RuntimeMethodHandle);
    GetRuntimeTypeHandleFromMetadataToken: ((typeToken: number) => System.RuntimeTypeHandle);
    Equals: ((obj: System.Object) => boolean) | ((handle: System.ModuleHandle) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class MulticastDelegate {
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Nullable {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class Object {
    constructor();
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class OperatingSystem {
    constructor(platform: System.PlatformID, version: System.Version);
    Platform: System.PlatformID;
    Version: System.Version;
    ServicePack: string;
    VersionString: string;
    Clone: (() => System.Object);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    ToString: (() => string);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
  }
  export enum PlatformID {
    Win32S = 0,
    Win32Windows = 1,
    Win32NT = 2,
    WinCE = 3,
    Unix = 4,
    Xbox = 5,
    MacOSX = 6,
  }
  export declare class ResolveEventArgs {
    constructor(name: string);
    constructor(name: string, requestingAssembly: System.Reflection.Assembly);
    Name: string;
    RequestingAssembly: System.Reflection.Assembly;
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class ResolveEventHandler {
    constructor(object: System.Object, method: System.IntPtr);
    Method: System.Reflection.MethodInfo;
    Target: System.Object;
    Invoke: ((sender: System.Object, args: System.ResolveEventArgs) => System.Reflection.Assembly);
    BeginInvoke: ((sender: System.Object, args: System.ResolveEventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
    EndInvoke: ((result: System.IAsyncResult) => System.Reflection.Assembly);
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetInvocationList: (() => System.Delegate[]);
    DynamicInvoke: ((args: System.Object[]) => System.Object);
    Clone: (() => System.Object);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export declare class RuntimeArgumentHandle {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class RuntimeFieldHandle {
    Value: System.IntPtr;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean) | ((handle: System.RuntimeFieldHandle) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class RuntimeMethodHandle {
    Value: System.IntPtr;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    GetFunctionPointer: (() => System.IntPtr);
    Equals: ((obj: System.Object) => boolean) | ((handle: System.RuntimeMethodHandle) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class RuntimeTypeHandle {
    Value: System.IntPtr;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean) | ((handle: System.RuntimeTypeHandle) => boolean);
    GetHashCode: (() => number);
    GetModuleHandle: (() => System.ModuleHandle);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export enum StringComparison {
    CurrentCulture = 0,
    CurrentCultureIgnoreCase = 1,
    InvariantCulture = 2,
    InvariantCultureIgnoreCase = 3,
    Ordinal = 4,
    OrdinalIgnoreCase = 5,
  }
  export declare class TimeZone {
    DaylightName: string;
    StandardName: string;
    GetDaylightChanges: ((year: number) => System.Globalization.DaylightTime);
    GetUtcOffset: ((time: System.DateTime) => System.TimeSpan);
    IsDaylightSavingTime: ((time: System.DateTime) => boolean);
    ToLocalTime: ((time: System.DateTime) => System.DateTime);
    ToUniversalTime: ((time: System.DateTime) => System.DateTime);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export enum TypeCode {
    Empty = 0,
    Object = 1,
    DBNull = 2,
    Boolean = 3,
    Char = 4,
    SByte = 5,
    Byte = 6,
    Int16 = 7,
    UInt16 = 8,
    Int32 = 9,
    UInt32 = 10,
    Int64 = 11,
    UInt64 = 12,
    Single = 13,
    Double = 14,
    Decimal = 15,
    DateTime = 16,
    String = 18,
  }
  export declare class UIntPtr {
    constructor(value: System.UInt64);
    constructor(value: System.UInt32);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToUInt32: (() => System.UInt32);
    ToUInt64: (() => System.UInt64);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class ValueType {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class Void {
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    ToString: (() => string);
    GetType: (() => System.Type);
  }
  export declare class WeakReference {
    constructor(target: System.Object);
    constructor(target: System.Object, trackResurrection: boolean);
    IsAlive: boolean;
    Target: System.Object;
    TrackResurrection: boolean;
    GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
    Equals: ((obj: System.Object) => boolean);
    GetHashCode: (() => number);
    GetType: (() => System.Type);
    ToString: (() => string);
  }
  export namespace Buffers {
    export declare class IRetainable {
      Retain: (() => void);
      Release: (() => boolean);
    }
    export declare class MemoryHandle {
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export namespace Binary {
      export declare class BinaryPrimitives {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Collections {
    export declare class DictionaryEntry {
      constructor(key: System.Object, value: System.Object);
      Key: System.Object;
      Value: System.Object;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class ArrayList {
      constructor();
      constructor(capacity: number);
      constructor(c: System.Collections.ICollection);
      Capacity: number;
      Count: number;
      IsFixedSize: boolean;
      IsReadOnly: boolean;
      IsSynchronized: boolean;
      SyncRoot: System.Object;
      Add: ((value: System.Object) => number);
      AddRange: ((c: System.Collections.ICollection) => void);
      BinarySearch: ((index: number, count: number, value: System.Object, comparer: System.Collections.IComparer) => number) | ((value: System.Object) => number) | ((value: System.Object, comparer: System.Collections.IComparer) => number);
      Clear: (() => void);
      Clone: (() => System.Object);
      Contains: ((item: System.Object) => boolean);
      CopyTo: ((array: System.Array) => void) | ((array: System.Array, arrayIndex: number) => void) | ((index: number, array: System.Array, arrayIndex: number, count: number) => void);
      GetEnumerator: (() => System.Collections.IEnumerator) | ((index: number, count: number) => System.Collections.IEnumerator);
      IndexOf: ((value: System.Object) => number) | ((value: System.Object, startIndex: number) => number) | ((value: System.Object, startIndex: number, count: number) => number);
      Insert: ((index: number, value: System.Object) => void);
      InsertRange: ((index: number, c: System.Collections.ICollection) => void);
      LastIndexOf: ((value: System.Object) => number) | ((value: System.Object, startIndex: number) => number) | ((value: System.Object, startIndex: number, count: number) => number);
      Remove: ((obj: System.Object) => void);
      RemoveAt: ((index: number) => void);
      RemoveRange: ((index: number, count: number) => void);
      Reverse: (() => void) | ((index: number, count: number) => void);
      SetRange: ((index: number, c: System.Collections.ICollection) => void);
      GetRange: ((index: number, count: number) => System.Collections.ArrayList);
      Sort: (() => void) | ((comparer: System.Collections.IComparer) => void) | ((index: number, count: number, comparer: System.Collections.IComparer) => void);
      ToArray: (() => System.Object[]) | ((type: System.Type) => System.Array);
      TrimToSize: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class BitArray {
      constructor(length: number);
      constructor(length: number, defaultValue: boolean);
      constructor(bytes: System.Byte[]);
      constructor(values: boolean[]);
      constructor(values: number[]);
      constructor(bits: System.Collections.BitArray);
      Length: number;
      Count: number;
      SyncRoot: System.Object;
      IsReadOnly: boolean;
      IsSynchronized: boolean;
      Get: ((index: number) => boolean);
      Set: ((index: number, value: boolean) => void);
      SetAll: ((value: boolean) => void);
      And: ((value: System.Collections.BitArray) => System.Collections.BitArray);
      Or: ((value: System.Collections.BitArray) => System.Collections.BitArray);
      Xor: ((value: System.Collections.BitArray) => System.Collections.BitArray);
      Not: (() => System.Collections.BitArray);
      CopyTo: ((array: System.Array, index: number) => void);
      Clone: (() => System.Object);
      GetEnumerator: (() => System.Collections.IEnumerator);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CaseInsensitiveComparer {
      constructor();
      constructor(culture: System.Globalization.CultureInfo);
      Compare: ((a: System.Object, b: System.Object) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CaseInsensitiveHashCodeProvider {
      constructor();
      constructor(culture: System.Globalization.CultureInfo);
      GetHashCode: ((obj: System.Object) => number) | (() => number);
      Equals: ((obj: System.Object) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CollectionBase {
      Capacity: number;
      Count: number;
      Clear: (() => void);
      RemoveAt: ((index: number) => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Comparer {
      constructor(culture: System.Globalization.CultureInfo);
      Compare: ((a: System.Object, b: System.Object) => number);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DictionaryBase {
      Count: number;
      CopyTo: ((array: System.Array, index: number) => void);
      Clear: (() => void);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Hashtable {
      constructor();
      constructor(capacity: number);
      constructor(capacity: number, loadFactor: number);
      constructor(capacity: number, loadFactor: number, hcp: System.Collections.IHashCodeProvider, comparer: System.Collections.IComparer);
      constructor(capacity: number, loadFactor: number, equalityComparer: System.Collections.IEqualityComparer);
      constructor(hcp: System.Collections.IHashCodeProvider, comparer: System.Collections.IComparer);
      constructor(equalityComparer: System.Collections.IEqualityComparer);
      constructor(capacity: number, hcp: System.Collections.IHashCodeProvider, comparer: System.Collections.IComparer);
      constructor(capacity: number, equalityComparer: System.Collections.IEqualityComparer);
      constructor(d: System.Collections.IDictionary);
      constructor(d: System.Collections.IDictionary, loadFactor: number);
      constructor(d: System.Collections.IDictionary, hcp: System.Collections.IHashCodeProvider, comparer: System.Collections.IComparer);
      constructor(d: System.Collections.IDictionary, equalityComparer: System.Collections.IEqualityComparer);
      constructor(d: System.Collections.IDictionary, loadFactor: number, hcp: System.Collections.IHashCodeProvider, comparer: System.Collections.IComparer);
      constructor(d: System.Collections.IDictionary, loadFactor: number, equalityComparer: System.Collections.IEqualityComparer);
      IsReadOnly: boolean;
      IsFixedSize: boolean;
      IsSynchronized: boolean;
      Keys: System.Collections.ICollection;
      Values: System.Collections.ICollection;
      SyncRoot: System.Object;
      Count: number;
      Add: ((key: System.Object, value: System.Object) => void);
      Clear: (() => void);
      Clone: (() => System.Object);
      Contains: ((key: System.Object) => boolean);
      ContainsKey: ((key: System.Object) => boolean);
      ContainsValue: ((value: System.Object) => boolean);
      CopyTo: ((array: System.Array, arrayIndex: number) => void);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      Remove: ((key: System.Object) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      OnDeserialization: ((sender: System.Object) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ICollection {
      Count: number;
      SyncRoot: System.Object;
      IsSynchronized: boolean;
      CopyTo: ((array: System.Array, index: number) => void);
    }
    export declare class IComparer {
      Compare: ((x: System.Object, y: System.Object) => number);
    }
    export declare class IDictionary {
      Keys: System.Collections.ICollection;
      Values: System.Collections.ICollection;
      IsReadOnly: boolean;
      IsFixedSize: boolean;
      Contains: ((key: System.Object) => boolean);
      Add: ((key: System.Object, value: System.Object) => void);
      Clear: (() => void);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      Remove: ((key: System.Object) => void);
    }
    export declare class IDictionaryEnumerator {
      Key: System.Object;
      Value: System.Object;
      Entry: System.Collections.DictionaryEntry;
    }
    export declare class IEnumerable {
      GetEnumerator: (() => System.Collections.IEnumerator);
    }
    export declare class IEnumerator {
      Current: System.Object;
      MoveNext: (() => boolean);
      Reset: (() => void);
    }
    export declare class IEqualityComparer {
      Equals: ((x: System.Object, y: System.Object) => boolean);
      GetHashCode: ((obj: System.Object) => number);
    }
    export declare class IHashCodeProvider {
      GetHashCode: ((obj: System.Object) => number);
    }
    export declare class IList {
      IsReadOnly: boolean;
      IsFixedSize: boolean;
      Add: ((value: System.Object) => number);
      Contains: ((value: System.Object) => boolean);
      Clear: (() => void);
      IndexOf: ((value: System.Object) => number);
      Insert: ((index: number, value: System.Object) => void);
      Remove: ((value: System.Object) => void);
      RemoveAt: ((index: number) => void);
    }
    export declare class IStructuralComparable {
      CompareTo: ((other: System.Object, comparer: System.Collections.IComparer) => number);
    }
    export declare class IStructuralEquatable {
      Equals: ((other: System.Object, comparer: System.Collections.IEqualityComparer) => boolean);
      GetHashCode: ((comparer: System.Collections.IEqualityComparer) => number);
    }
    export declare class Queue {
      constructor();
      constructor(capacity: number);
      constructor(capacity: number, growFactor: number);
      constructor(col: System.Collections.ICollection);
      Count: number;
      IsSynchronized: boolean;
      SyncRoot: System.Object;
      Clone: (() => System.Object);
      Clear: (() => void);
      CopyTo: ((array: System.Array, index: number) => void);
      Enqueue: ((obj: System.Object) => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      Dequeue: (() => System.Object);
      Peek: (() => System.Object);
      Contains: ((obj: System.Object) => boolean);
      ToArray: (() => System.Object[]);
      TrimToSize: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ReadOnlyCollectionBase {
      Count: number;
      GetEnumerator: (() => System.Collections.IEnumerator);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SortedList {
      constructor();
      constructor(initialCapacity: number);
      constructor(comparer: System.Collections.IComparer);
      constructor(comparer: System.Collections.IComparer, capacity: number);
      constructor(d: System.Collections.IDictionary);
      constructor(d: System.Collections.IDictionary, comparer: System.Collections.IComparer);
      Capacity: number;
      Count: number;
      Keys: System.Collections.ICollection;
      Values: System.Collections.ICollection;
      IsReadOnly: boolean;
      IsFixedSize: boolean;
      IsSynchronized: boolean;
      SyncRoot: System.Object;
      Add: ((key: System.Object, value: System.Object) => void);
      Clear: (() => void);
      Clone: (() => System.Object);
      Contains: ((key: System.Object) => boolean);
      ContainsKey: ((key: System.Object) => boolean);
      ContainsValue: ((value: System.Object) => boolean);
      CopyTo: ((array: System.Array, arrayIndex: number) => void);
      GetByIndex: ((index: number) => System.Object);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      GetKey: ((index: number) => System.Object);
      GetKeyList: (() => System.Collections.IList);
      GetValueList: (() => System.Collections.IList);
      IndexOfKey: ((key: System.Object) => number);
      IndexOfValue: ((value: System.Object) => number);
      RemoveAt: ((index: number) => void);
      Remove: ((key: System.Object) => void);
      SetByIndex: ((index: number, value: System.Object) => void);
      TrimToSize: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Stack {
      constructor();
      constructor(initialCapacity: number);
      constructor(col: System.Collections.ICollection);
      Count: number;
      IsSynchronized: boolean;
      SyncRoot: System.Object;
      Clear: (() => void);
      Clone: (() => System.Object);
      Contains: ((obj: System.Object) => boolean);
      CopyTo: ((array: System.Array, index: number) => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      Peek: (() => System.Object);
      Pop: (() => System.Object);
      Push: ((obj: System.Object) => void);
      ToArray: (() => System.Object[]);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StructuralComparisons {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export namespace Concurrent {
      export enum EnumerablePartitionerOptions {
        None = 0,
        NoBuffering = 1,
      }
      export declare class Partitioner {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace Generic {
      export declare class CollectionExtensions {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class KeyValuePair {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class KeyNotFoundException {
        constructor();
        constructor(message: string);
        constructor(message: string, innerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
    }
  }
  export namespace Configuration {
    export namespace Assemblies {
      export declare class AssemblyHash {
        constructor(algorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm, value: System.Byte[]);
        constructor(value: System.Byte[]);
        Algorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm;
        Clone: (() => System.Object);
        GetValue: (() => System.Byte[]);
        SetValue: ((value: System.Byte[]) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum AssemblyHashAlgorithm {
        None = 0,
        MD5 = 32771,
        SHA1 = 32772,
        SHA256 = 32780,
        SHA384 = 32781,
        SHA512 = 32782,
      }
      export enum AssemblyVersionCompatibility {
        SameMachine = 1,
        SameProcess = 2,
        SameDomain = 3,
      }
    }
  }
  export namespace Deployment {
    export namespace Internal {
      export declare class InternalActivationContextHelper {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class InternalApplicationIdentityHelper {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Diagnostics {
    export enum DebuggerBrowsableState {
      Never = 0,
      Collapsed = 2,
      RootHidden = 3,
    }
    export declare class Debugger {
      constructor();
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StackFrame {
      constructor();
      constructor(fNeedFileInfo: boolean);
      constructor(skipFrames: number);
      constructor(skipFrames: number, fNeedFileInfo: boolean);
      constructor(fileName: string, lineNumber: number);
      constructor(fileName: string, lineNumber: number, colNumber: number);
      GetFileLineNumber: (() => number);
      GetFileColumnNumber: (() => number);
      GetFileName: (() => string);
      GetILOffset: (() => number);
      GetMethod: (() => System.Reflection.MethodBase);
      GetNativeOffset: (() => number);
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class StackTrace {
      constructor();
      constructor(fNeedFileInfo: boolean);
      constructor(skipFrames: number);
      constructor(skipFrames: number, fNeedFileInfo: boolean);
      constructor(e: System.Exception);
      constructor(e: System.Exception, fNeedFileInfo: boolean);
      constructor(e: System.Exception, skipFrames: number);
      constructor(e: System.Exception, skipFrames: number, fNeedFileInfo: boolean);
      constructor(frame: System.Diagnostics.StackFrame);
      constructor(targetThread: System.Threading.Thread, needFileInfo: boolean);
      FrameCount: number;
      GetFrame: ((index: number) => System.Diagnostics.StackFrame);
      GetFrames: (() => System.Diagnostics.StackFrame[]);
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export namespace Contracts {
      export declare class Contract {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum ContractFailureKind {
        Precondition = 0,
        Postcondition = 1,
        PostconditionOnException = 2,
        Invariant = 3,
        Assert = 4,
        Assume = 5,
      }
      export declare class ContractFailedEventArgs {
        constructor(failureKind: System.Diagnostics.Contracts.ContractFailureKind, message: string, condition: string, originalException: System.Exception);
        Message: string;
        Condition: string;
        FailureKind: System.Diagnostics.Contracts.ContractFailureKind;
        OriginalException: System.Exception;
        Handled: boolean;
        Unwind: boolean;
        SetHandled: (() => void);
        SetUnwind: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export namespace Internal {
        export declare class ContractHelper {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
    }
    export namespace SymbolStore {
      export declare class ISymbolBinder {
        GetReader: ((importer: number, filename: string, searchPath: string) => System.Diagnostics.SymbolStore.ISymbolReader);
      }
      export declare class ISymbolBinder1 {
        GetReader: ((importer: System.IntPtr, filename: string, searchPath: string) => System.Diagnostics.SymbolStore.ISymbolReader);
      }
      export declare class ISymbolDocument {
        CheckSumAlgorithmId: System.Guid;
        DocumentType: System.Guid;
        HasEmbeddedSource: boolean;
        Language: System.Guid;
        LanguageVendor: System.Guid;
        SourceLength: number;
        URL: string;
        FindClosestLine: ((line: number) => number);
        GetCheckSum: (() => System.Byte[]);
        GetSourceRange: ((startLine: number, startColumn: number, endLine: number, endColumn: number) => System.Byte[]);
      }
      export declare class ISymbolDocumentWriter {
        SetCheckSum: ((algorithmId: System.Guid, checkSum: System.Byte[]) => void);
        SetSource: ((source: System.Byte[]) => void);
      }
      export declare class ISymbolMethod {
        RootScope: System.Diagnostics.SymbolStore.ISymbolScope;
        SequencePointCount: number;
        Token: System.Diagnostics.SymbolStore.SymbolToken;
        GetNamespace: (() => System.Diagnostics.SymbolStore.ISymbolNamespace);
        GetOffset: ((document: System.Diagnostics.SymbolStore.ISymbolDocument, line: number, column: number) => number);
        GetParameters: (() => System.Diagnostics.SymbolStore.ISymbolVariable[]);
        GetRanges: ((document: System.Diagnostics.SymbolStore.ISymbolDocument, line: number, column: number) => number[]);
        GetScope: ((offset: number) => System.Diagnostics.SymbolStore.ISymbolScope);
        GetSequencePoints: ((offsets: number[], documents: System.Diagnostics.SymbolStore.ISymbolDocument[], lines: number[], columns: number[], endLines: number[], endColumns: number[]) => void);
        GetSourceStartEnd: ((docs: System.Diagnostics.SymbolStore.ISymbolDocument[], lines: number[], columns: number[]) => boolean);
      }
      export declare class ISymbolNamespace {
        Name: string;
        GetNamespaces: (() => System.Diagnostics.SymbolStore.ISymbolNamespace[]);
        GetVariables: (() => System.Diagnostics.SymbolStore.ISymbolVariable[]);
      }
      export declare class ISymbolReader {
        UserEntryPoint: System.Diagnostics.SymbolStore.SymbolToken;
        GetDocument: ((url: string, language: System.Guid, languageVendor: System.Guid, documentType: System.Guid) => System.Diagnostics.SymbolStore.ISymbolDocument);
        GetDocuments: (() => System.Diagnostics.SymbolStore.ISymbolDocument[]);
        GetGlobalVariables: (() => System.Diagnostics.SymbolStore.ISymbolVariable[]);
        GetMethod: ((method: System.Diagnostics.SymbolStore.SymbolToken) => System.Diagnostics.SymbolStore.ISymbolMethod) | ((method: System.Diagnostics.SymbolStore.SymbolToken, version: number) => System.Diagnostics.SymbolStore.ISymbolMethod);
        GetMethodFromDocumentPosition: ((document: System.Diagnostics.SymbolStore.ISymbolDocument, line: number, column: number) => System.Diagnostics.SymbolStore.ISymbolMethod);
        GetNamespaces: (() => System.Diagnostics.SymbolStore.ISymbolNamespace[]);
        GetSymAttribute: ((parent: System.Diagnostics.SymbolStore.SymbolToken, name: string) => System.Byte[]);
        GetVariables: ((parent: System.Diagnostics.SymbolStore.SymbolToken) => System.Diagnostics.SymbolStore.ISymbolVariable[]);
      }
      export declare class ISymbolScope {
        EndOffset: number;
        Method: System.Diagnostics.SymbolStore.ISymbolMethod;
        Parent: System.Diagnostics.SymbolStore.ISymbolScope;
        StartOffset: number;
        GetChildren: (() => System.Diagnostics.SymbolStore.ISymbolScope[]);
        GetLocals: (() => System.Diagnostics.SymbolStore.ISymbolVariable[]);
        GetNamespaces: (() => System.Diagnostics.SymbolStore.ISymbolNamespace[]);
      }
      export declare class ISymbolVariable {
        AddressField1: number;
        AddressField2: number;
        AddressField3: number;
        AddressKind: System.Diagnostics.SymbolStore.SymAddressKind;
        Attributes: System.Object;
        EndOffset: number;
        Name: string;
        StartOffset: number;
        GetSignature: (() => System.Byte[]);
      }
      export declare class ISymbolWriter {
        Close: (() => void);
        CloseMethod: (() => void);
        CloseNamespace: (() => void);
        CloseScope: ((endOffset: number) => void);
        DefineDocument: ((url: string, language: System.Guid, languageVendor: System.Guid, documentType: System.Guid) => System.Diagnostics.SymbolStore.ISymbolDocumentWriter);
        DefineField: ((parent: System.Diagnostics.SymbolStore.SymbolToken, name: string, attributes: System.Reflection.FieldAttributes, signature: System.Byte[], addrKind: System.Diagnostics.SymbolStore.SymAddressKind, addr1: number, addr2: number, addr3: number) => void);
        DefineGlobalVariable: ((name: string, attributes: System.Reflection.FieldAttributes, signature: System.Byte[], addrKind: System.Diagnostics.SymbolStore.SymAddressKind, addr1: number, addr2: number, addr3: number) => void);
        DefineLocalVariable: ((name: string, attributes: System.Reflection.FieldAttributes, signature: System.Byte[], addrKind: System.Diagnostics.SymbolStore.SymAddressKind, addr1: number, addr2: number, addr3: number, startOffset: number, endOffset: number) => void);
        DefineParameter: ((name: string, attributes: System.Reflection.ParameterAttributes, sequence: number, addrKind: System.Diagnostics.SymbolStore.SymAddressKind, addr1: number, addr2: number, addr3: number) => void);
        DefineSequencePoints: ((document: System.Diagnostics.SymbolStore.ISymbolDocumentWriter, offsets: number[], lines: number[], columns: number[], endLines: number[], endColumns: number[]) => void);
        Initialize: ((emitter: System.IntPtr, filename: string, fFullBuild: boolean) => void);
        OpenMethod: ((method: System.Diagnostics.SymbolStore.SymbolToken) => void);
        OpenNamespace: ((name: string) => void);
        OpenScope: ((startOffset: number) => number);
        SetMethodSourceRange: ((startDoc: System.Diagnostics.SymbolStore.ISymbolDocumentWriter, startLine: number, startColumn: number, endDoc: System.Diagnostics.SymbolStore.ISymbolDocumentWriter, endLine: number, endColumn: number) => void);
        SetScopeRange: ((scopeID: number, startOffset: number, endOffset: number) => void);
        SetSymAttribute: ((parent: System.Diagnostics.SymbolStore.SymbolToken, name: string, data: System.Byte[]) => void);
        SetUnderlyingWriter: ((underlyingWriter: System.IntPtr) => void);
        SetUserEntryPoint: ((entryMethod: System.Diagnostics.SymbolStore.SymbolToken) => void);
        UsingNamespace: ((fullName: string) => void);
      }
      export enum SymAddressKind {
        ILOffset = 1,
        NativeRVA = 2,
        NativeRegister = 3,
        NativeRegisterRelative = 4,
        NativeOffset = 5,
        NativeRegisterRegister = 6,
        NativeRegisterStack = 7,
        NativeStackRegister = 8,
        BitField = 9,
        NativeSectionOffset = 10,
      }
      export declare class SymDocumentType {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SymLanguageType {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SymLanguageVendor {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SymbolToken {
        constructor(val: number);
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Diagnostics.SymbolStore.SymbolToken) => boolean);
        GetHashCode: (() => number);
        GetToken: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
    }
    export namespace Tracing {
      export declare class EventCounter {
        constructor(name: string, eventSource: System.Diagnostics.Tracing.EventSource);
        WriteMetric: ((value: number) => void);
        Dispose: (() => void);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export enum EventFieldTags {
        None = 0,
      }
      export enum EventFieldFormat {
        Default = 0,
        String = 2,
        Boolean = 3,
        Hexadecimal = 4,
        Xml = 11,
        Json = 12,
        HResult = 15,
      }
      export declare class EventSourceOptions {
        Level: System.Diagnostics.Tracing.EventLevel;
        Opcode: System.Diagnostics.Tracing.EventOpcode;
        Keywords: System.Diagnostics.Tracing.EventKeywords;
        Tags: System.Diagnostics.Tracing.EventTags;
        ActivityOptions: System.Diagnostics.Tracing.EventActivityOptions;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class EventSource {
        constructor(eventSourceName: string);
        constructor(eventSourceName: string, config: System.Diagnostics.Tracing.EventSourceSettings);
        constructor(eventSourceName: string, config: System.Diagnostics.Tracing.EventSourceSettings, traits: string[]);
        Name: string;
        Guid: System.Guid;
        Settings: System.Diagnostics.Tracing.EventSourceSettings;
        ConstructionException: System.Exception;
        Write: ((eventName: string) => void) | ((eventName: string, options: System.Diagnostics.Tracing.EventSourceOptions) => void);
        IsEnabled: (() => boolean) | ((level: System.Diagnostics.Tracing.EventLevel, keywords: System.Diagnostics.Tracing.EventKeywords) => boolean) | ((level: System.Diagnostics.Tracing.EventLevel, keywords: System.Diagnostics.Tracing.EventKeywords, channel: System.Diagnostics.Tracing.EventChannel) => boolean);
        GetTrait: ((key: string) => string);
        ToString: (() => string);
        Dispose: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export enum EventTags {
        None = 0,
      }
      export enum EventActivityOptions {
        None = 0,
        Disable = 2,
        Recursive = 4,
        Detachable = 8,
      }
      export enum EventSourceSettings {
        Default = 0,
        ThrowOnEventWriteErrors = 1,
        EtwManifestEventFormat = 4,
        EtwSelfDescribingEventFormat = 8,
      }
      export declare class EventListener {
        constructor();
        Dispose: (() => void);
        EnableEvents: ((eventSource: System.Diagnostics.Tracing.EventSource, level: System.Diagnostics.Tracing.EventLevel) => void) | ((eventSource: System.Diagnostics.Tracing.EventSource, level: System.Diagnostics.Tracing.EventLevel, matchAnyKeyword: System.Diagnostics.Tracing.EventKeywords) => void) | ((eventSource: System.Diagnostics.Tracing.EventSource, level: System.Diagnostics.Tracing.EventLevel, matchAnyKeyword: System.Diagnostics.Tracing.EventKeywords, argumentsCS: any) => void);
        DisableEvents: ((eventSource: System.Diagnostics.Tracing.EventSource) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventCommandEventArgs {
        Command: System.Diagnostics.Tracing.EventCommand;
        Arguments: any; // System.Collections.Generic.IDictionary`2[System.String,System.String]
        EnableEvent: ((eventId: number) => boolean);
        DisableEvent: ((eventId: number) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventSourceCreatedEventArgs {
        constructor();
        EventSource: System.Diagnostics.Tracing.EventSource;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventWrittenEventArgs {
        EventName: string;
        EventId: number;
        ActivityId: System.Guid;
        RelatedActivityId: System.Guid;
        Payload: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.Object]
        PayloadNames: any; // System.Collections.ObjectModel.ReadOnlyCollection`1[System.String]
        EventSource: System.Diagnostics.Tracing.EventSource;
        Keywords: System.Diagnostics.Tracing.EventKeywords;
        Opcode: System.Diagnostics.Tracing.EventOpcode;
        Task: System.Diagnostics.Tracing.EventTask;
        Tags: System.Diagnostics.Tracing.EventTags;
        Message: string;
        Channel: System.Diagnostics.Tracing.EventChannel;
        Version: System.Byte;
        Level: System.Diagnostics.Tracing.EventLevel;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum EventCommand {
        Update = 0,
        SendManifest = -1,
        Enable = -2,
        Disable = -3,
      }
      export enum EventManifestOptions {
        None = 0,
        Strict = 1,
        AllCultures = 2,
        OnlyIfNeededForRegistration = 4,
        AllowEventSourceOverride = 8,
      }
      export declare class EventSourceException {
        constructor();
        constructor(message: string);
        constructor(message: string, innerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export enum EventLevel {
        LogAlways = 0,
        Critical = 1,
        Error = 2,
        Warning = 3,
        Informational = 4,
        Verbose = 5,
      }
      export enum EventTask {
        None = 0,
      }
      export enum EventOpcode {
        Info = 0,
        Start = 1,
        Stop = 2,
        DataCollectionStart = 3,
        DataCollectionStop = 4,
        Extension = 5,
        Reply = 6,
        Resume = 7,
        Suspend = 8,
        Send = 9,
        Receive = 240,
      }
      export enum EventChannel {
        None = 0,
        Admin = 16,
        Operational = 17,
        Analytic = 18,
        Debug = 19,
      }
      export enum EventKeywords {
        None = 0,
        All = -1,
        MicrosoftTelemetry = 562949953421312,
        WdiContext = 562949953421312,
        WdiDiagnostic = 1125899906842624,
        Sqm = 2251799813685248,
        AuditFailure = 4503599627370496,
        AuditSuccess = 9007199254740992,
        CorrelationHint = 4503599627370496,
        EventLogClassic = 36028797018963968,
      }
    }
  }
  export namespace Globalization {
    export declare class CharUnicodeInfo {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class PersianCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Calendar {
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      IsReadOnly: boolean;
      Eras: number[];
      TwoDigitYearMax: number;
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number) => number) | ((year: number, month: number, era: number) => number);
      GetDaysInYear: ((year: number) => number) | ((year: number, era: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number) => number) | ((year: number, era: number) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number) => boolean) | ((year: number, month: number, day: number, era: number) => boolean);
      IsLeapMonth: ((year: number, month: number) => boolean) | ((year: number, month: number, era: number) => boolean);
      GetLeapMonth: ((year: number) => number) | ((year: number, era: number) => number);
      IsLeapYear: ((year: number) => boolean) | ((year: number, era: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum CalendarAlgorithmType {
      Unknown = 0,
      SolarCalendar = 1,
      LunarCalendar = 2,
      LunisolarCalendar = 3,
    }
    export enum CalendarWeekRule {
      FirstDay = 0,
      FirstFullWeek = 1,
      FirstFourDayWeek = 2,
    }
    export declare class ChineseLunisolarCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      Eras: number[];
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      GetEra: ((time: System.DateTime) => number);
      GetSexagenaryYear: ((time: System.DateTime) => number);
      GetCelestialStem: ((sexagenaryYear: number) => number);
      GetTerrestrialBranch: ((sexagenaryYear: number) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum CompareOptions {
      None = 0,
      IgnoreCase = 1,
      IgnoreNonSpace = 2,
      IgnoreSymbols = 4,
      IgnoreKanaType = 8,
      IgnoreWidth = 16,
      OrdinalIgnoreCase = 268435456,
      StringSort = 536870912,
      Ordinal = 1073741824,
    }
    export declare class CompareInfo {
      Name: string;
      LCID: number;
      Version: System.Globalization.SortVersion;
      Compare: ((string1: string, string2: string) => number) | ((string1: string, string2: string, options: System.Globalization.CompareOptions) => number) | ((string1: string, offset1: number, length1: number, string2: string, offset2: number, length2: number) => number) | ((string1: string, offset1: number, string2: string, offset2: number, options: System.Globalization.CompareOptions) => number) | ((string1: string, offset1: number, string2: string, offset2: number) => number) | ((string1: string, offset1: number, length1: number, string2: string, offset2: number, length2: number, options: System.Globalization.CompareOptions) => number);
      IsPrefix: ((source: string, prefix: string, options: System.Globalization.CompareOptions) => boolean) | ((source: string, prefix: string) => boolean);
      IsSuffix: ((source: string, suffix: string, options: System.Globalization.CompareOptions) => boolean) | ((source: string, suffix: string) => boolean);
      IndexOf: ((source: string, value: System.Char) => number) | ((source: string, value: string) => number) | ((source: string, value: System.Char, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, options: System.Globalization.CompareOptions) => number) | ((source: string, value: System.Char, startIndex: number) => number) | ((source: string, value: string, startIndex: number) => number) | ((source: string, value: System.Char, startIndex: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, startIndex: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: System.Char, startIndex: number, count: number) => number) | ((source: string, value: string, startIndex: number, count: number) => number) | ((source: string, value: System.Char, startIndex: number, count: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, startIndex: number, count: number, options: System.Globalization.CompareOptions) => number);
      LastIndexOf: ((source: string, value: System.Char) => number) | ((source: string, value: string) => number) | ((source: string, value: System.Char, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, options: System.Globalization.CompareOptions) => number) | ((source: string, value: System.Char, startIndex: number) => number) | ((source: string, value: string, startIndex: number) => number) | ((source: string, value: System.Char, startIndex: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, startIndex: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: System.Char, startIndex: number, count: number) => number) | ((source: string, value: string, startIndex: number, count: number) => number) | ((source: string, value: System.Char, startIndex: number, count: number, options: System.Globalization.CompareOptions) => number) | ((source: string, value: string, startIndex: number, count: number, options: System.Globalization.CompareOptions) => number);
      GetSortKey: ((source: string, options: System.Globalization.CompareOptions) => System.Globalization.SortKey) | ((source: string) => System.Globalization.SortKey);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number) | ((source: string, options: System.Globalization.CompareOptions) => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class CultureNotFoundException {
      constructor();
      constructor(message: string);
      constructor(paramName: string, message: string);
      constructor(message: string, innerException: System.Exception);
      constructor(paramName: string, invalidCultureId: number, message: string);
      constructor(message: string, invalidCultureId: number, innerException: System.Exception);
      constructor(paramName: string, invalidCultureName: string, message: string);
      constructor(message: string, invalidCultureName: string, innerException: System.Exception);
      InvalidCultureId?: number;
      InvalidCultureName: string;
      Message: string;
      ParamName: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum CultureTypes {
      NeutralCultures = 1,
      SpecificCultures = 2,
      InstalledWin32Cultures = 4,
      AllCultures = 7,
      UserCustomCulture = 8,
      ReplacementCultures = 16,
      WindowsOnlyCultures = 32,
      FrameworkCultures = 64,
    }
    export declare class DateTimeFormatInfo {
      constructor();
      AMDesignator: string;
      Calendar: System.Globalization.Calendar;
      DateSeparator: string;
      FirstDayOfWeek: System.DayOfWeek;
      CalendarWeekRule: System.Globalization.CalendarWeekRule;
      FullDateTimePattern: string;
      LongDatePattern: string;
      LongTimePattern: string;
      MonthDayPattern: string;
      PMDesignator: string;
      RFC1123Pattern: string;
      ShortDatePattern: string;
      ShortTimePattern: string;
      SortableDateTimePattern: string;
      TimeSeparator: string;
      UniversalSortableDateTimePattern: string;
      YearMonthPattern: string;
      AbbreviatedDayNames: string[];
      ShortestDayNames: string[];
      DayNames: string[];
      AbbreviatedMonthNames: string[];
      MonthNames: string[];
      IsReadOnly: boolean;
      NativeCalendarName: string;
      AbbreviatedMonthGenitiveNames: string[];
      MonthGenitiveNames: string[];
      GetFormat: ((formatType: System.Type) => System.Object);
      Clone: (() => System.Object);
      GetEra: ((eraName: string) => number);
      GetEraName: ((era: number) => string);
      GetAbbreviatedEraName: ((era: number) => string);
      GetAbbreviatedDayName: ((dayofweek: System.DayOfWeek) => string);
      GetShortestDayName: ((dayOfWeek: System.DayOfWeek) => string);
      GetAllDateTimePatterns: (() => string[]) | ((format: System.Char) => string[]);
      GetDayName: ((dayofweek: System.DayOfWeek) => string);
      GetAbbreviatedMonthName: ((month: number) => string);
      GetMonthName: ((month: number) => string);
      SetAllDateTimePatterns: ((patterns: string[], format: System.Char) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum DateTimeStyles {
      None = 0,
      AllowLeadingWhite = 1,
      AllowTrailingWhite = 2,
      AllowInnerWhite = 4,
      AllowWhiteSpaces = 7,
      NoCurrentDateDefault = 8,
      AdjustToUniversal = 16,
      AssumeLocal = 32,
      AssumeUniversal = 64,
      RoundtripKind = 128,
    }
    export declare class DaylightTime {
      constructor(start: System.DateTime, end: System.DateTime, delta: System.TimeSpan);
      Start: System.DateTime;
      End: System.DateTime;
      Delta: System.TimeSpan;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum DigitShapes {
      Context = 0,
      None = 1,
      NativeNational = 2,
    }
    export declare class EastAsianLunisolarCalendar {
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      TwoDigitYearMax: number;
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      IsReadOnly: boolean;
      Eras: number[];
      GetSexagenaryYear: ((time: System.DateTime) => number);
      GetCelestialStem: ((sexagenaryYear: number) => number);
      GetTerrestrialBranch: ((sexagenaryYear: number) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetEra: ((time: System.DateTime) => number);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class GregorianCalendar {
      constructor();
      constructor(type: System.Globalization.GregorianCalendarTypes);
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      CalendarType: System.Globalization.GregorianCalendarTypes;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum GregorianCalendarTypes {
      Localized = 1,
      USEnglish = 2,
      MiddleEastFrench = 9,
      Arabic = 10,
      TransliteratedEnglish = 11,
      TransliteratedFrench = 12,
    }
    export declare class HebrewCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class HijriCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      HijriAdjustment: number;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class JapaneseCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class JapaneseLunisolarCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      Eras: number[];
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      GetEra: ((time: System.DateTime) => number);
      GetSexagenaryYear: ((time: System.DateTime) => number);
      GetCelestialStem: ((sexagenaryYear: number) => number);
      GetTerrestrialBranch: ((sexagenaryYear: number) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class JulianCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class KoreanCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class KoreanLunisolarCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      Eras: number[];
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      GetEra: ((time: System.DateTime) => number);
      GetSexagenaryYear: ((time: System.DateTime) => number);
      GetCelestialStem: ((sexagenaryYear: number) => number);
      GetTerrestrialBranch: ((sexagenaryYear: number) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class NumberFormatInfo {
      constructor();
      CurrencyDecimalDigits: number;
      CurrencyDecimalSeparator: string;
      IsReadOnly: boolean;
      CurrencyGroupSizes: number[];
      NumberGroupSizes: number[];
      PercentGroupSizes: number[];
      CurrencyGroupSeparator: string;
      CurrencySymbol: string;
      NaNSymbol: string;
      CurrencyNegativePattern: number;
      NumberNegativePattern: number;
      PercentPositivePattern: number;
      PercentNegativePattern: number;
      NegativeInfinitySymbol: string;
      NegativeSign: string;
      NumberDecimalDigits: number;
      NumberDecimalSeparator: string;
      NumberGroupSeparator: string;
      CurrencyPositivePattern: number;
      PositiveInfinitySymbol: string;
      PositiveSign: string;
      PercentDecimalDigits: number;
      PercentDecimalSeparator: string;
      PercentGroupSeparator: string;
      PercentSymbol: string;
      PerMilleSymbol: string;
      NativeDigits: string[];
      DigitSubstitution: System.Globalization.DigitShapes;
      Clone: (() => System.Object);
      GetFormat: ((formatType: System.Type) => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum NumberStyles {
      None = 0,
      AllowLeadingWhite = 1,
      AllowTrailingWhite = 2,
      AllowLeadingSign = 4,
      AllowTrailingSign = 8,
      AllowParentheses = 16,
      AllowDecimalPoint = 32,
      AllowThousands = 64,
      AllowExponent = 128,
      AllowCurrencySymbol = 256,
      AllowHexSpecifier = 512,
      Integer = 7,
      HexNumber = 515,
      Number = 111,
      Float = 167,
      Currency = 383,
      Any = 511,
    }
    export declare class SortVersion {
      constructor(fullVersion: number, sortId: System.Guid);
      FullVersion: number;
      SortId: System.Guid;
      Equals: ((obj: System.Object) => boolean) | ((other: System.Globalization.SortVersion) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StringInfo {
      constructor();
      constructor(value: string);
      String: string;
      LengthInTextElements: number;
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      SubstringByTextElements: ((startingTextElement: number) => string) | ((startingTextElement: number, lengthInTextElements: number) => string);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TaiwanCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TaiwanLunisolarCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      Eras: number[];
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      GetEra: ((time: System.DateTime) => number);
      GetSexagenaryYear: ((time: System.DateTime) => number);
      GetCelestialStem: ((sexagenaryYear: number) => number);
      GetTerrestrialBranch: ((sexagenaryYear: number) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TextElementEnumerator {
      Current: System.Object;
      ElementIndex: number;
      MoveNext: (() => boolean);
      GetTextElement: (() => string);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TextInfo {
      ANSICodePage: number;
      OEMCodePage: number;
      MacCodePage: number;
      EBCDICCodePage: number;
      LCID: number;
      CultureName: string;
      IsReadOnly: boolean;
      ListSeparator: string;
      IsRightToLeft: boolean;
      Clone: (() => System.Object);
      ToLower: ((c: System.Char) => System.Char) | ((str: string) => string);
      ToUpper: ((c: System.Char) => System.Char) | ((str: string) => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      ToTitleCase: ((str: string) => string);
      GetType: (() => System.Type);
    }
    export declare class ThaiBuddhistCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum TimeSpanStyles {
      None = 0,
      AssumeNegative = 1,
    }
    export declare class UmAlQuraCalendar {
      constructor();
      MinSupportedDateTime: System.DateTime;
      MaxSupportedDateTime: System.DateTime;
      AlgorithmType: System.Globalization.CalendarAlgorithmType;
      Eras: number[];
      TwoDigitYearMax: number;
      IsReadOnly: boolean;
      AddMonths: ((time: System.DateTime, months: number) => System.DateTime);
      AddYears: ((time: System.DateTime, years: number) => System.DateTime);
      GetDayOfMonth: ((time: System.DateTime) => number);
      GetDayOfWeek: ((time: System.DateTime) => System.DayOfWeek);
      GetDayOfYear: ((time: System.DateTime) => number);
      GetDaysInMonth: ((year: number, month: number, era: number) => number) | ((year: number, month: number) => number);
      GetDaysInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetEra: ((time: System.DateTime) => number);
      GetMonth: ((time: System.DateTime) => number);
      GetMonthsInYear: ((year: number, era: number) => number) | ((year: number) => number);
      GetYear: ((time: System.DateTime) => number);
      IsLeapDay: ((year: number, month: number, day: number, era: number) => boolean) | ((year: number, month: number, day: number) => boolean);
      GetLeapMonth: ((year: number, era: number) => number) | ((year: number) => number);
      IsLeapMonth: ((year: number, month: number, era: number) => boolean) | ((year: number, month: number) => boolean);
      IsLeapYear: ((year: number, era: number) => boolean) | ((year: number) => boolean);
      ToDateTime: ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, era: number) => System.DateTime) | ((year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) => System.DateTime);
      ToFourDigitYear: ((year: number) => number);
      Clone: (() => System.Object);
      AddMilliseconds: ((time: System.DateTime, milliseconds: number) => System.DateTime);
      AddDays: ((time: System.DateTime, days: number) => System.DateTime);
      AddHours: ((time: System.DateTime, hours: number) => System.DateTime);
      AddMinutes: ((time: System.DateTime, minutes: number) => System.DateTime);
      AddSeconds: ((time: System.DateTime, seconds: number) => System.DateTime);
      AddWeeks: ((time: System.DateTime, weeks: number) => System.DateTime);
      GetHour: ((time: System.DateTime) => number);
      GetMilliseconds: ((time: System.DateTime) => number);
      GetMinute: ((time: System.DateTime) => number);
      GetSecond: ((time: System.DateTime) => number);
      GetWeekOfYear: ((time: System.DateTime, rule: System.Globalization.CalendarWeekRule, firstDayOfWeek: System.DayOfWeek) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum UnicodeCategory {
      UppercaseLetter = 0,
      LowercaseLetter = 1,
      TitlecaseLetter = 2,
      ModifierLetter = 3,
      OtherLetter = 4,
      NonSpacingMark = 5,
      SpacingCombiningMark = 6,
      EnclosingMark = 7,
      DecimalDigitNumber = 8,
      LetterNumber = 9,
      OtherNumber = 10,
      SpaceSeparator = 11,
      LineSeparator = 12,
      ParagraphSeparator = 13,
      Control = 14,
      Format = 15,
      Surrogate = 16,
      PrivateUse = 17,
      ConnectorPunctuation = 18,
      DashPunctuation = 19,
      OpenPunctuation = 20,
      ClosePunctuation = 21,
      InitialQuotePunctuation = 22,
      FinalQuotePunctuation = 23,
      OtherPunctuation = 24,
      MathSymbol = 25,
      CurrencySymbol = 26,
      ModifierSymbol = 27,
      OtherSymbol = 28,
      OtherNotAssigned = 29,
    }
    export declare class SortKey {
      OriginalString: string;
      KeyData: System.Byte[];
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class CultureInfo {
      constructor(culture: number);
      constructor(culture: number, useUserOverride: boolean);
      constructor(name: string);
      constructor(name: string, useUserOverride: boolean);
      CultureTypes: System.Globalization.CultureTypes;
      IetfLanguageTag: string;
      KeyboardLayoutId: number;
      LCID: number;
      Name: string;
      NativeName: string;
      Calendar: System.Globalization.Calendar;
      OptionalCalendars: System.Globalization.Calendar[];
      Parent: System.Globalization.CultureInfo;
      TextInfo: System.Globalization.TextInfo;
      ThreeLetterISOLanguageName: string;
      ThreeLetterWindowsLanguageName: string;
      TwoLetterISOLanguageName: string;
      UseUserOverride: boolean;
      CompareInfo: System.Globalization.CompareInfo;
      IsNeutralCulture: boolean;
      NumberFormat: System.Globalization.NumberFormatInfo;
      DateTimeFormat: System.Globalization.DateTimeFormatInfo;
      DisplayName: string;
      EnglishName: string;
      IsReadOnly: boolean;
      GetConsoleFallbackUICulture: (() => System.Globalization.CultureInfo);
      ClearCachedData: (() => void);
      Clone: (() => System.Object);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetFormat: ((formatType: System.Type) => System.Object);
      GetType: (() => System.Type);
    }
    export declare class IdnMapping {
      constructor();
      AllowUnassigned: boolean;
      UseStd3AsciiRules: boolean;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetAscii: ((unicode: string) => string) | ((unicode: string, index: number) => string) | ((unicode: string, index: number, count: number) => string);
      GetUnicode: ((ascii: string) => string) | ((ascii: string, index: number) => string) | ((ascii: string, index: number, count: number) => string);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class RegionInfo {
      constructor(culture: number);
      constructor(name: string);
      CurrencyEnglishName: string;
      CurrencySymbol: string;
      DisplayName: string;
      EnglishName: string;
      GeoId: number;
      IsMetric: boolean;
      ISOCurrencySymbol: string;
      NativeName: string;
      CurrencyNativeName: string;
      Name: string;
      ThreeLetterISORegionName: string;
      ThreeLetterWindowsRegionName: string;
      TwoLetterISORegionName: string;
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class GlobalizationExtensions {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
  }
  export namespace IO {
    export declare class BinaryReader {
      constructor(input: System.IO.Stream);
      constructor(input: System.IO.Stream, encoding: System.Text.Encoding);
      constructor(input: System.IO.Stream, encoding: System.Text.Encoding, leaveOpen: boolean);
      BaseStream: System.IO.Stream;
      Close: (() => void);
      Dispose: (() => void);
      PeekChar: (() => number);
      Read: (() => number) | ((buffer: System.Char[], index: number, count: number) => number) | ((buffer: System.Byte[], index: number, count: number) => number);
      ReadBoolean: (() => boolean);
      ReadByte: (() => System.Byte);
      ReadSByte: (() => System.SByte);
      ReadChar: (() => System.Char);
      ReadInt16: (() => System.Int16);
      ReadUInt16: (() => System.UInt16);
      ReadInt32: (() => number);
      ReadUInt32: (() => System.UInt32);
      ReadInt64: (() => System.Int64);
      ReadUInt64: (() => System.UInt64);
      ReadSingle: (() => number);
      ReadDouble: (() => number);
      ReadDecimal: (() => System.Decimal);
      ReadString: (() => string);
      ReadChars: ((count: number) => System.Char[]);
      ReadBytes: ((count: number) => System.Byte[]);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class BinaryWriter {
      constructor(output: System.IO.Stream);
      constructor(output: System.IO.Stream, encoding: System.Text.Encoding);
      constructor(output: System.IO.Stream, encoding: System.Text.Encoding, leaveOpen: boolean);
      BaseStream: System.IO.Stream;
      Close: (() => void);
      Dispose: (() => void);
      Flush: (() => void);
      Seek: ((offset: number, origin: System.IO.SeekOrigin) => System.Int64);
      Write: ((value: boolean) => void) | ((value: System.Byte) => void) | ((value: System.SByte) => void) | ((buffer: System.Byte[]) => void) | ((buffer: System.Byte[], index: number, count: number) => void) | ((ch: System.Char) => void) | ((chars: System.Char[]) => void) | ((chars: System.Char[], index: number, count: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: System.Int16) => void) | ((value: System.UInt16) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: string) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class BufferedStream {
      constructor(stream: System.IO.Stream);
      constructor(stream: System.IO.Stream, bufferSize: number);
      CanRead: boolean;
      CanWrite: boolean;
      CanSeek: boolean;
      Length: System.Int64;
      Position: System.Int64;
      CanTimeout: boolean;
      ReadTimeout: number;
      WriteTimeout: number;
      Flush: (() => void);
      FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      Read: ((array: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
      BeginRead: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndRead: ((asyncResult: System.IAsyncResult) => number);
      ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
      ReadByte: (() => number);
      Write: ((array: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
      BeginWrite: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndWrite: ((asyncResult: System.IAsyncResult) => void);
      WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      WriteByte: ((value: System.Byte) => void);
      Seek: ((offset: System.Int64, origin: System.IO.SeekOrigin) => System.Int64);
      SetLength: ((value: System.Int64) => void);
      CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Directory {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DirectoryNotFoundException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class DriveNotFoundException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class EndOfStreamException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class FileInfo {
      constructor(fileName: string);
      Name: string;
      Length: System.Int64;
      DirectoryName: string;
      Directory: System.IO.DirectoryInfo;
      IsReadOnly: boolean;
      Exists: boolean;
      FullName: string;
      Extension: string;
      CreationTime: System.DateTime;
      CreationTimeUtc: System.DateTime;
      LastAccessTime: System.DateTime;
      LastAccessTimeUtc: System.DateTime;
      LastWriteTime: System.DateTime;
      LastWriteTimeUtc: System.DateTime;
      Attributes: System.IO.FileAttributes;
      GetAccessControl: (() => System.Security.AccessControl.FileSecurity) | ((includeSections: System.Security.AccessControl.AccessControlSections) => System.Security.AccessControl.FileSecurity);
      SetAccessControl: ((fileSecurity: System.Security.AccessControl.FileSecurity) => void);
      OpenText: (() => System.IO.StreamReader);
      CreateText: (() => System.IO.StreamWriter);
      AppendText: (() => System.IO.StreamWriter);
      CopyTo: ((destFileName: string) => System.IO.FileInfo) | ((destFileName: string, overwrite: boolean) => System.IO.FileInfo);
      Create: (() => System.IO.FileStream);
      Delete: (() => void);
      Decrypt: (() => void);
      Encrypt: (() => void);
      Open: ((mode: System.IO.FileMode) => System.IO.FileStream) | ((mode: System.IO.FileMode, access: System.IO.FileAccess) => System.IO.FileStream) | ((mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare) => System.IO.FileStream);
      OpenRead: (() => System.IO.FileStream);
      OpenWrite: (() => System.IO.FileStream);
      MoveTo: ((destFileName: string) => void);
      Replace: ((destinationFileName: string, destinationBackupFileName: string) => System.IO.FileInfo) | ((destinationFileName: string, destinationBackupFileName: string, ignoreMetadataErrors: boolean) => System.IO.FileInfo);
      ToString: (() => string);
      Refresh: (() => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class FileLoadException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      constructor(message: string, fileName: string);
      constructor(message: string, fileName: string, inner: System.Exception);
      Message: string;
      FileName: string;
      FusionLog: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class FileNotFoundException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      constructor(message: string, fileName: string);
      constructor(message: string, fileName: string, innerException: System.Exception);
      Message: string;
      FileName: string;
      FusionLog: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class FileSystemInfo {
      FullName: string;
      Extension: string;
      Name: string;
      Exists: boolean;
      CreationTime: System.DateTime;
      CreationTimeUtc: System.DateTime;
      LastAccessTime: System.DateTime;
      LastAccessTimeUtc: System.DateTime;
      LastWriteTime: System.DateTime;
      LastWriteTimeUtc: System.DateTime;
      Attributes: System.IO.FileAttributes;
      Delete: (() => void);
      Refresh: (() => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class IOException {
      constructor();
      constructor(message: string);
      constructor(message: string, hresult: number);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class MemoryStream {
      constructor();
      constructor(capacity: number);
      constructor(buffer: System.Byte[]);
      constructor(buffer: System.Byte[], writable: boolean);
      constructor(buffer: System.Byte[], index: number, count: number);
      constructor(buffer: System.Byte[], index: number, count: number, writable: boolean);
      constructor(buffer: System.Byte[], index: number, count: number, writable: boolean, publiclyVisible: boolean);
      CanRead: boolean;
      CanSeek: boolean;
      CanWrite: boolean;
      Capacity: number;
      Length: System.Int64;
      Position: System.Int64;
      CanTimeout: boolean;
      ReadTimeout: number;
      WriteTimeout: number;
      Flush: (() => void);
      FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      GetBuffer: (() => System.Byte[]);
      Read: ((buffer: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
      ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
      ReadByte: (() => number);
      CopyToAsync: ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task);
      Seek: ((offset: System.Int64, loc: System.IO.SeekOrigin) => System.Int64);
      SetLength: ((value: System.Int64) => void);
      ToArray: (() => System.Byte[]);
      Write: ((buffer: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
      WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      WriteByte: ((value: System.Byte) => void);
      WriteTo: ((stream: System.IO.Stream) => void);
      CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
      Close: (() => void);
      Dispose: (() => void);
      BeginRead: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndRead: ((asyncResult: System.IAsyncResult) => number);
      BeginWrite: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndWrite: ((asyncResult: System.IAsyncResult) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class PathTooLongException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class Stream {
      CanRead: boolean;
      CanSeek: boolean;
      CanTimeout: boolean;
      CanWrite: boolean;
      Length: System.Int64;
      Position: System.Int64;
      ReadTimeout: number;
      WriteTimeout: number;
      CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
      Close: (() => void);
      Dispose: (() => void);
      Flush: (() => void);
      FlushAsync: (() => System.Threading.Tasks.Task) | ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      BeginRead: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndRead: ((asyncResult: System.IAsyncResult) => number);
      ReadAsync: ((buffer: System.Byte[], offset: number, count: number) => any) | ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
      BeginWrite: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndWrite: ((asyncResult: System.IAsyncResult) => void);
      WriteAsync: ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      Seek: ((offset: System.Int64, origin: System.IO.SeekOrigin) => System.Int64);
      SetLength: ((value: System.Int64) => void);
      Read: ((buffer: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
      ReadByte: (() => number);
      Write: ((buffer: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
      WriteByte: ((value: System.Byte) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StreamReader {
      constructor(stream: System.IO.Stream);
      constructor(stream: System.IO.Stream, detectEncodingFromByteOrderMarks: boolean);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding, detectEncodingFromByteOrderMarks: boolean);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding, detectEncodingFromByteOrderMarks: boolean, bufferSize: number);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding, detectEncodingFromByteOrderMarks: boolean, bufferSize: number, leaveOpen: boolean);
      constructor(path: string);
      constructor(path: string, detectEncodingFromByteOrderMarks: boolean);
      constructor(path: string, encoding: System.Text.Encoding);
      constructor(path: string, encoding: System.Text.Encoding, detectEncodingFromByteOrderMarks: boolean);
      constructor(path: string, encoding: System.Text.Encoding, detectEncodingFromByteOrderMarks: boolean, bufferSize: number);
      CurrentEncoding: System.Text.Encoding;
      BaseStream: System.IO.Stream;
      EndOfStream: boolean;
      Close: (() => void);
      DiscardBufferedData: (() => void);
      Peek: (() => number);
      Read: (() => number) | ((buffer: System.Char[], index: number, count: number) => number);
      ReadToEnd: (() => string);
      ReadBlock: ((buffer: System.Char[], index: number, count: number) => number);
      ReadLine: (() => string);
      ReadLineAsync: (() => any);
      ReadToEndAsync: (() => any);
      ReadAsync: ((buffer: System.Char[], index: number, count: number) => any);
      ReadBlockAsync: ((buffer: System.Char[], index: number, count: number) => any);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StreamWriter {
      constructor(stream: System.IO.Stream);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding, bufferSize: number);
      constructor(stream: System.IO.Stream, encoding: System.Text.Encoding, bufferSize: number, leaveOpen: boolean);
      constructor(path: string);
      constructor(path: string, append: boolean);
      constructor(path: string, append: boolean, encoding: System.Text.Encoding);
      constructor(path: string, append: boolean, encoding: System.Text.Encoding, bufferSize: number);
      AutoFlush: boolean;
      BaseStream: System.IO.Stream;
      Encoding: System.Text.Encoding;
      FormatProvider: System.IFormatProvider;
      NewLine: string;
      Close: (() => void);
      Flush: (() => void);
      Write: ((value: System.Char) => void) | ((buffer: System.Char[]) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: string) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      WriteAsync: ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task);
      WriteLineAsync: (() => System.Threading.Tasks.Task) | ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task);
      FlushAsync: (() => System.Threading.Tasks.Task);
      Dispose: (() => void);
      WriteLine: (() => void) | ((value: System.Char) => void) | ((buffer: System.Char[]) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: string) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StringReader {
      constructor(s: string);
      Close: (() => void);
      Peek: (() => number);
      Read: (() => number) | ((buffer: System.Char[], index: number, count: number) => number);
      ReadToEnd: (() => string);
      ReadLine: (() => string);
      ReadLineAsync: (() => any);
      ReadToEndAsync: (() => any);
      ReadBlockAsync: ((buffer: System.Char[], index: number, count: number) => any);
      ReadAsync: ((buffer: System.Char[], index: number, count: number) => any);
      Dispose: (() => void);
      ReadBlock: ((buffer: System.Char[], index: number, count: number) => number);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StringWriter {
      constructor();
      constructor(formatProvider: System.IFormatProvider);
      constructor(sb: System.Text.StringBuilder);
      constructor(sb: System.Text.StringBuilder, formatProvider: System.IFormatProvider);
      Encoding: System.Text.Encoding;
      FormatProvider: System.IFormatProvider;
      NewLine: string;
      Close: (() => void);
      GetStringBuilder: (() => System.Text.StringBuilder);
      Write: ((value: System.Char) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: string) => void) | ((buffer: System.Char[]) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      WriteAsync: ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task);
      WriteLineAsync: ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      FlushAsync: (() => System.Threading.Tasks.Task);
      ToString: (() => string);
      Dispose: (() => void);
      Flush: (() => void);
      WriteLine: (() => void) | ((value: System.Char) => void) | ((buffer: System.Char[]) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: string) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class TextReader {
      Close: (() => void);
      Dispose: (() => void);
      Peek: (() => number);
      Read: (() => number) | ((buffer: System.Char[], index: number, count: number) => number);
      ReadToEnd: (() => string);
      ReadBlock: ((buffer: System.Char[], index: number, count: number) => number);
      ReadLine: (() => string);
      ReadLineAsync: (() => any);
      ReadToEndAsync: (() => any);
      ReadAsync: ((buffer: System.Char[], index: number, count: number) => any);
      ReadBlockAsync: ((buffer: System.Char[], index: number, count: number) => any);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TextWriter {
      FormatProvider: System.IFormatProvider;
      Encoding: System.Text.Encoding;
      NewLine: string;
      Close: (() => void);
      Dispose: (() => void);
      Flush: (() => void);
      Write: ((value: System.Char) => void) | ((buffer: System.Char[]) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: string) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      WriteLine: (() => void) | ((value: System.Char) => void) | ((buffer: System.Char[]) => void) | ((buffer: System.Char[], index: number, count: number) => void) | ((value: boolean) => void) | ((value: number) => void) | ((value: System.UInt32) => void) | ((value: System.Int64) => void) | ((value: System.UInt64) => void) | ((value: number) => void) | ((value: number) => void) | ((value: System.Decimal) => void) | ((value: string) => void) | ((value: System.Object) => void) | ((format: string, arg0: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object) => void) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => void) | ((format: string, arg: System.Object[]) => void);
      WriteAsync: ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task);
      WriteLineAsync: ((value: System.Char) => System.Threading.Tasks.Task) | ((value: string) => System.Threading.Tasks.Task) | ((buffer: System.Char[]) => System.Threading.Tasks.Task) | ((buffer: System.Char[], index: number, count: number) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      FlushAsync: (() => System.Threading.Tasks.Task);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class UnmanagedMemoryAccessor {
      constructor(buffer: System.Runtime.InteropServices.SafeBuffer, offset: System.Int64, capacity: System.Int64);
      constructor(buffer: System.Runtime.InteropServices.SafeBuffer, offset: System.Int64, capacity: System.Int64, access: System.IO.FileAccess);
      Capacity: System.Int64;
      CanRead: boolean;
      CanWrite: boolean;
      Dispose: (() => void);
      ReadBoolean: ((position: System.Int64) => boolean);
      ReadByte: ((position: System.Int64) => System.Byte);
      ReadChar: ((position: System.Int64) => System.Char);
      ReadInt16: ((position: System.Int64) => System.Int16);
      ReadInt32: ((position: System.Int64) => number);
      ReadInt64: ((position: System.Int64) => System.Int64);
      ReadDecimal: ((position: System.Int64) => System.Decimal);
      ReadSingle: ((position: System.Int64) => number);
      ReadDouble: ((position: System.Int64) => number);
      ReadSByte: ((position: System.Int64) => System.SByte);
      ReadUInt16: ((position: System.Int64) => System.UInt16);
      ReadUInt32: ((position: System.Int64) => System.UInt32);
      ReadUInt64: ((position: System.Int64) => System.UInt64);
      Write: ((position: System.Int64, value: boolean) => void) | ((position: System.Int64, value: System.Byte) => void) | ((position: System.Int64, value: System.Char) => void) | ((position: System.Int64, value: System.Int16) => void) | ((position: System.Int64, value: number) => void) | ((position: System.Int64, value: System.Int64) => void) | ((position: System.Int64, value: System.Decimal) => void) | ((position: System.Int64, value: number) => void) | ((position: System.Int64, value: number) => void) | ((position: System.Int64, value: System.SByte) => void) | ((position: System.Int64, value: System.UInt16) => void) | ((position: System.Int64, value: System.UInt32) => void) | ((position: System.Int64, value: System.UInt64) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class UnmanagedMemoryStream {
      constructor(buffer: System.Runtime.InteropServices.SafeBuffer, offset: System.Int64, length: System.Int64);
      constructor(buffer: System.Runtime.InteropServices.SafeBuffer, offset: System.Int64, length: System.Int64, access: System.IO.FileAccess);
      CanRead: boolean;
      CanSeek: boolean;
      CanWrite: boolean;
      Length: System.Int64;
      Capacity: System.Int64;
      Position: System.Int64;
      CanTimeout: boolean;
      ReadTimeout: number;
      WriteTimeout: number;
      Flush: (() => void);
      FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      Read: ((buffer: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
      ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
      ReadByte: (() => number);
      Seek: ((offset: System.Int64, loc: System.IO.SeekOrigin) => System.Int64);
      SetLength: ((value: System.Int64) => void);
      Write: ((buffer: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
      WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      WriteByte: ((value: System.Byte) => void);
      CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
      Close: (() => void);
      Dispose: (() => void);
      BeginRead: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndRead: ((asyncResult: System.IAsyncResult) => number);
      BeginWrite: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
      EndWrite: ((asyncResult: System.IAsyncResult) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DirectoryInfo {
      constructor(path: string);
      Exists: boolean;
      Name: string;
      Parent: System.IO.DirectoryInfo;
      Root: System.IO.DirectoryInfo;
      FullName: string;
      Extension: string;
      CreationTime: System.DateTime;
      CreationTimeUtc: System.DateTime;
      LastAccessTime: System.DateTime;
      LastAccessTimeUtc: System.DateTime;
      LastWriteTime: System.DateTime;
      LastWriteTimeUtc: System.DateTime;
      Attributes: System.IO.FileAttributes;
      Create: (() => void) | ((directorySecurity: System.Security.AccessControl.DirectorySecurity) => void);
      CreateSubdirectory: ((path: string) => System.IO.DirectoryInfo) | ((path: string, directorySecurity: System.Security.AccessControl.DirectorySecurity) => System.IO.DirectoryInfo);
      GetFiles: (() => System.IO.FileInfo[]) | ((searchPattern: string) => System.IO.FileInfo[]) | ((searchPattern: string, searchOption: System.IO.SearchOption) => System.IO.FileInfo[]);
      GetDirectories: (() => System.IO.DirectoryInfo[]) | ((searchPattern: string) => System.IO.DirectoryInfo[]) | ((searchPattern: string, searchOption: System.IO.SearchOption) => System.IO.DirectoryInfo[]);
      GetFileSystemInfos: (() => System.IO.FileSystemInfo[]) | ((searchPattern: string) => System.IO.FileSystemInfo[]) | ((searchPattern: string, searchOption: System.IO.SearchOption) => System.IO.FileSystemInfo[]);
      Delete: (() => void) | ((recursive: boolean) => void);
      MoveTo: ((destDirName: string) => void);
      ToString: (() => string);
      GetAccessControl: (() => System.Security.AccessControl.DirectorySecurity) | ((includeSections: System.Security.AccessControl.AccessControlSections) => System.Security.AccessControl.DirectorySecurity);
      SetAccessControl: ((directorySecurity: System.Security.AccessControl.DirectorySecurity) => void);
      EnumerateDirectories: (() => any) | ((searchPattern: string) => any) | ((searchPattern: string, searchOption: System.IO.SearchOption) => any);
      EnumerateFiles: (() => any) | ((searchPattern: string) => any) | ((searchPattern: string, searchOption: System.IO.SearchOption) => any);
      EnumerateFileSystemInfos: (() => any) | ((searchPattern: string) => any) | ((searchPattern: string, searchOption: System.IO.SearchOption) => any);
      Refresh: (() => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class DriveInfo {
      constructor(driveName: string);
      AvailableFreeSpace: System.Int64;
      TotalFreeSpace: System.Int64;
      TotalSize: System.Int64;
      VolumeLabel: string;
      DriveFormat: string;
      DriveType: System.IO.DriveType;
      Name: string;
      RootDirectory: System.IO.DirectoryInfo;
      IsReady: boolean;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export enum DriveType {
      CDRom = 5,
      Fixed = 3,
      Network = 4,
      NoRootDirectory = 1,
      Ram = 6,
      Removable = 2,
      Unknown = 0,
    }
    export declare class File {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum FileAccess {
      Read = 1,
      Write = 2,
      ReadWrite = 3,
    }
    export enum FileAttributes {
      Archive = 32,
      Compressed = 2048,
      Device = 64,
      Directory = 16,
      Encrypted = 16384,
      Hidden = 2,
      Normal = 128,
      NotContentIndexed = 8192,
      Offline = 4096,
      ReadOnly = 1,
      ReparsePoint = 1024,
      SparseFile = 512,
      System = 4,
      Temporary = 256,
      IntegrityStream = 32768,
      NoScrubData = 131072,
    }
    export enum FileMode {
      CreateNew = 1,
      Create = 2,
      Open = 3,
      OpenOrCreate = 4,
      Truncate = 5,
      Append = 6,
    }
    export enum FileOptions {
      None = 0,
      Encrypted = 16384,
      DeleteOnClose = 67108864,
      SequentialScan = 134217728,
      RandomAccess = 268435456,
      Asynchronous = 1073741824,
      WriteThrough = -2147483648,
    }
    export enum FileShare {
      None = 0,
      Read = 1,
      Write = 2,
      ReadWrite = 3,
      Delete = 4,
      Inheritable = 16,
    }
    export declare class FileStream {
      constructor(handle: System.IntPtr, access: System.IO.FileAccess);
      constructor(handle: System.IntPtr, access: System.IO.FileAccess, ownsHandle: boolean);
      constructor(handle: System.IntPtr, access: System.IO.FileAccess, ownsHandle: boolean, bufferSize: number);
      constructor(handle: System.IntPtr, access: System.IO.FileAccess, ownsHandle: boolean, bufferSize: number, isAsync: boolean);
      constructor(path: string, mode: System.IO.FileMode);
      constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess);
      constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare);
      constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, bufferSize: number);
      constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, bufferSize: number, useAsync: boolean);
      constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, bufferSize: number, options: System.IO.FileOptions);
      constructor(handle: any, access: System.IO.FileAccess);
      constructor(handle: any, access: System.IO.FileAccess, bufferSize: number);
      constructor(handle: any, access: System.IO.FileAccess, bufferSize: number, isAsync: boolean);
      constructor(path: string, mode: System.IO.FileMode, rights: System.Security.AccessControl.FileSystemRights, share: System.IO.FileShare, bufferSize: number, options: System.IO.FileOptions);
      constructor(path: string, mode: System.IO.FileMode, rights: System.Security.AccessControl.FileSystemRights, share: System.IO.FileShare, bufferSize: number, options: System.IO.FileOptions, fileSecurity: System.Security.AccessControl.FileSecurity);
      CanRead: boolean;
      CanWrite: boolean;
      CanSeek: boolean;
      IsAsync: boolean;
      Name: string;
      Length: System.Int64;
      Position: System.Int64;
      Handle: System.IntPtr;
      SafeFileHandle: any; // Microsoft.Win32.SafeHandles.SafeFileHandle
      CanTimeout: boolean;
      ReadTimeout: number;
      WriteTimeout: number;
      ReadByte: (() => number);
      WriteByte: ((value: System.Byte) => void);
      Read: ((array: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
      BeginRead: ((array: System.Byte[], offset: number, numBytes: number, userCallback: System.AsyncCallback, stateObject: System.Object) => System.IAsyncResult);
      EndRead: ((asyncResult: System.IAsyncResult) => number);
      Write: ((array: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
      BeginWrite: ((array: System.Byte[], offset: number, numBytes: number, userCallback: System.AsyncCallback, stateObject: System.Object) => System.IAsyncResult);
      EndWrite: ((asyncResult: System.IAsyncResult) => void);
      Seek: ((offset: System.Int64, origin: System.IO.SeekOrigin) => System.Int64);
      SetLength: ((value: System.Int64) => void);
      Flush: (() => void) | ((flushToDisk: boolean) => void);
      Lock: ((position: System.Int64, length: System.Int64) => void);
      Unlock: ((position: System.Int64, length: System.Int64) => void);
      GetAccessControl: (() => System.Security.AccessControl.FileSecurity);
      SetAccessControl: ((fileSecurity: System.Security.AccessControl.FileSecurity) => void);
      FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
      ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
      WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
      CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Path {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum SearchOption {
      TopDirectoryOnly = 0,
      AllDirectories = 1,
    }
    export enum SeekOrigin {
      Begin = 0,
      Current = 1,
      End = 2,
    }
    export namespace IsolatedStorage {
      export declare class INormalizeForIsolatedStorage {
        Normalize: (() => System.Object);
      }
      export declare class IsolatedStorage {
        ApplicationIdentity: System.Object;
        AssemblyIdentity: System.Object;
        CurrentSize: System.UInt64;
        DomainIdentity: System.Object;
        MaximumSize: System.UInt64;
        Scope: System.IO.IsolatedStorage.IsolatedStorageScope;
        AvailableFreeSpace: System.Int64;
        Quota: System.Int64;
        UsedSize: System.Int64;
        Remove: (() => void);
        IncreaseQuotaTo: ((newQuotaSize: System.Int64) => boolean);
        CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
        GetLifetimeService: (() => System.Object);
        InitializeLifetimeService: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsolatedStorageException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class IsolatedStorageFile {
        CurrentSize: System.UInt64;
        MaximumSize: System.UInt64;
        AvailableFreeSpace: System.Int64;
        Quota: System.Int64;
        UsedSize: System.Int64;
        ApplicationIdentity: System.Object;
        AssemblyIdentity: System.Object;
        DomainIdentity: System.Object;
        Scope: System.IO.IsolatedStorage.IsolatedStorageScope;
        Close: (() => void);
        CreateDirectory: ((dir: string) => void);
        CopyFile: ((sourceFileName: string, destinationFileName: string) => void) | ((sourceFileName: string, destinationFileName: string, overwrite: boolean) => void);
        CreateFile: ((path: string) => System.IO.IsolatedStorage.IsolatedStorageFileStream);
        DeleteDirectory: ((dir: string) => void);
        DeleteFile: ((file: string) => void);
        Dispose: (() => void);
        DirectoryExists: ((path: string) => boolean);
        FileExists: ((path: string) => boolean);
        GetCreationTime: ((path: string) => System.DateTimeOffset);
        GetLastAccessTime: ((path: string) => System.DateTimeOffset);
        GetLastWriteTime: ((path: string) => System.DateTimeOffset);
        GetDirectoryNames: ((searchPattern: string) => string[]) | (() => string[]);
        GetFileNames: ((searchPattern: string) => string[]) | (() => string[]);
        IncreaseQuotaTo: ((newQuotaSize: System.Int64) => boolean);
        MoveDirectory: ((sourceDirectoryName: string, destinationDirectoryName: string) => void);
        MoveFile: ((sourceFileName: string, destinationFileName: string) => void);
        OpenFile: ((path: string, mode: System.IO.FileMode) => System.IO.IsolatedStorage.IsolatedStorageFileStream) | ((path: string, mode: System.IO.FileMode, access: System.IO.FileAccess) => System.IO.IsolatedStorage.IsolatedStorageFileStream) | ((path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare) => System.IO.IsolatedStorage.IsolatedStorageFileStream);
        Remove: (() => void);
        CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
        GetLifetimeService: (() => System.Object);
        InitializeLifetimeService: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsolatedStorageFileStream {
        constructor(path: string, mode: System.IO.FileMode);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, bufferSize: number);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, bufferSize: number, isf: System.IO.IsolatedStorage.IsolatedStorageFile);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, share: System.IO.FileShare, isf: System.IO.IsolatedStorage.IsolatedStorageFile);
        constructor(path: string, mode: System.IO.FileMode, access: System.IO.FileAccess, isf: System.IO.IsolatedStorage.IsolatedStorageFile);
        constructor(path: string, mode: System.IO.FileMode, isf: System.IO.IsolatedStorage.IsolatedStorageFile);
        CanRead: boolean;
        CanSeek: boolean;
        CanWrite: boolean;
        SafeFileHandle: any; // Microsoft.Win32.SafeHandles.SafeFileHandle
        Handle: System.IntPtr;
        IsAsync: boolean;
        Length: System.Int64;
        Position: System.Int64;
        Name: string;
        CanTimeout: boolean;
        ReadTimeout: number;
        WriteTimeout: number;
        BeginRead: ((buffer: System.Byte[], offset: number, numBytes: number, userCallback: System.AsyncCallback, stateObject: System.Object) => System.IAsyncResult);
        BeginWrite: ((buffer: System.Byte[], offset: number, numBytes: number, userCallback: System.AsyncCallback, stateObject: System.Object) => System.IAsyncResult);
        EndRead: ((asyncResult: System.IAsyncResult) => number);
        EndWrite: ((asyncResult: System.IAsyncResult) => void);
        Flush: (() => void) | ((flushToDisk: boolean) => void);
        Read: ((buffer: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
        ReadByte: (() => number);
        Seek: ((offset: System.Int64, origin: System.IO.SeekOrigin) => System.Int64);
        SetLength: ((value: System.Int64) => void);
        Write: ((buffer: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
        WriteByte: ((value: System.Byte) => void);
        Lock: ((position: System.Int64, length: System.Int64) => void);
        Unlock: ((position: System.Int64, length: System.Int64) => void);
        GetAccessControl: (() => System.Security.AccessControl.FileSecurity);
        SetAccessControl: ((fileSecurity: System.Security.AccessControl.FileSecurity) => void);
        FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
        ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
        WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
        CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
        CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
        Close: (() => void);
        Dispose: (() => void);
        CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
        GetLifetimeService: (() => System.Object);
        InitializeLifetimeService: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum IsolatedStorageScope {
        None = 0,
        User = 1,
        Domain = 2,
        Assembly = 4,
        Roaming = 8,
        Machine = 16,
        Application = 32,
      }
      export enum IsolatedStorageSecurityOptions {
        IncreaseQuotaForApplication = 4,
      }
      export declare class IsolatedStorageSecurityState {
        Options: System.IO.IsolatedStorage.IsolatedStorageSecurityOptions;
        Quota: System.Int64;
        UsedSize: System.Int64;
        EnsureState: (() => void);
        IsStateAvailable: (() => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Reflection {
    export declare class CustomAttributeExtensions {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class RuntimeReflectionExtensions {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class AmbiguousMatchException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum AssemblyNameFlags {
      None = 0,
      PublicKey = 1,
      EnableJITcompileOptimizer = 16384,
      EnableJITcompileTracking = 32768,
      Retargetable = 256,
    }
    export enum AssemblyContentType {
      Default = 0,
      WindowsRuntime = 1,
    }
    export enum ProcessorArchitecture {
      None = 0,
      MSIL = 1,
      X86 = 2,
      IA64 = 3,
      Amd64 = 4,
      Arm = 5,
    }
    export declare class AssemblyNameProxy {
      constructor();
      GetAssemblyName: ((assemblyFile: string) => System.Reflection.AssemblyName);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Binder {
      BindToField: ((bindingAttr: System.Reflection.BindingFlags, match: System.Reflection.FieldInfo[], value: System.Object, culture: System.Globalization.CultureInfo) => System.Reflection.FieldInfo);
      SelectMethod: ((bindingAttr: System.Reflection.BindingFlags, match: System.Reflection.MethodBase[], types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodBase);
      SelectProperty: ((bindingAttr: System.Reflection.BindingFlags, match: System.Reflection.PropertyInfo[], returnType: System.Type, indexes: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo);
      ChangeType: ((value: System.Object, type: System.Type, culture: System.Globalization.CultureInfo) => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum BindingFlags {
      Default = 0,
      IgnoreCase = 1,
      DeclaredOnly = 2,
      Instance = 4,
      Static = 8,
      Public = 16,
      NonPublic = 32,
      FlattenHierarchy = 64,
      InvokeMethod = 256,
      CreateInstance = 512,
      GetField = 1024,
      SetField = 2048,
      GetProperty = 4096,
      SetProperty = 8192,
      PutDispProperty = 16384,
      PutRefDispProperty = 32768,
      ExactBinding = 65536,
      SuppressChangeType = 131072,
      OptionalParamBinding = 262144,
      IgnoreReturn = 16777216,
    }
    export enum CallingConventions {
      Standard = 1,
      VarArgs = 2,
      Any = 3,
      HasThis = 32,
      ExplicitThis = 64,
    }
    export enum EventAttributes {
      None = 0,
      SpecialName = 512,
      ReservedMask = 1024,
      RTSpecialName = 1024,
    }
    export enum FieldAttributes {
      FieldAccessMask = 7,
      PrivateScope = 0,
      Private = 1,
      FamANDAssem = 2,
      Assembly = 3,
      Family = 4,
      FamORAssem = 5,
      Public = 6,
      Static = 16,
      InitOnly = 32,
      Literal = 64,
      NotSerialized = 128,
      SpecialName = 512,
      PinvokeImpl = 8192,
      ReservedMask = 38144,
      RTSpecialName = 1024,
      HasFieldMarshal = 4096,
      HasDefault = 32768,
      HasFieldRVA = 256,
    }
    export enum GenericParameterAttributes {
      None = 0,
      VarianceMask = 3,
      Covariant = 1,
      Contravariant = 2,
      SpecialConstraintMask = 28,
      ReferenceTypeConstraint = 4,
      NotNullableValueTypeConstraint = 8,
      DefaultConstructorConstraint = 16,
    }
    export declare class ICustomAttributeProvider {
      GetCustomAttributes: ((attributeType: System.Type, inherit: boolean) => System.Object[]) | ((inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
    }
    export declare class InterfaceMapping {
      TargetType: System.Type;
      InterfaceType: System.Type;
      TargetMethods: System.Reflection.MethodInfo[];
      InterfaceMethods: System.Reflection.MethodInfo[];
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class IntrospectionExtensions {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class InvalidFilterCriteriaException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class IReflect {
      UnderlyingSystemType: System.Type;
      GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo);
      GetMethods: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]);
      GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo);
      GetFields: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]);
      GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo);
      GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]);
      GetMember: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
      GetMembers: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
      InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object);
    }
    export declare class IReflectableType {
      GetTypeInfo: (() => System.Reflection.TypeInfo);
    }
    export declare class ManifestResourceInfo {
      constructor(containingAssembly: System.Reflection.Assembly, containingFileName: string, resourceLocation: System.Reflection.ResourceLocation);
      ReferencedAssembly: System.Reflection.Assembly;
      FileName: string;
      ResourceLocation: System.Reflection.ResourceLocation;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum ResourceLocation {
      Embedded = 1,
      ContainedInAnotherAssembly = 2,
      ContainedInManifestFile = 4,
    }
    export declare class MemberFilter {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((m: System.Reflection.MemberInfo, filterCriteria: System.Object) => boolean);
      BeginInvoke: ((m: System.Reflection.MemberInfo, filterCriteria: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => boolean);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class MemberInfo {
      MemberType: System.Reflection.MemberTypes;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum MemberTypes {
      Constructor = 1,
      Event = 2,
      Field = 4,
      Method = 8,
      Property = 16,
      TypeInfo = 32,
      Custom = 64,
      NestedType = 128,
      All = 191,
    }
    export enum MethodAttributes {
      MemberAccessMask = 7,
      PrivateScope = 0,
      Private = 1,
      FamANDAssem = 2,
      Assembly = 3,
      Family = 4,
      FamORAssem = 5,
      Public = 6,
      Static = 16,
      Final = 32,
      Virtual = 64,
      HideBySig = 128,
      CheckAccessOnOverride = 512,
      VtableLayoutMask = 256,
      ReuseSlot = 0,
      NewSlot = 256,
      Abstract = 1024,
      SpecialName = 2048,
      PinvokeImpl = 8192,
      UnmanagedExport = 8,
      RTSpecialName = 4096,
      ReservedMask = 53248,
      HasSecurity = 16384,
      RequireSecObject = 32768,
    }
    export declare class MethodBase {
      MethodImplementationFlags: System.Reflection.MethodImplAttributes;
      MethodHandle: System.RuntimeMethodHandle;
      Attributes: System.Reflection.MethodAttributes;
      CallingConvention: System.Reflection.CallingConventions;
      IsGenericMethodDefinition: boolean;
      ContainsGenericParameters: boolean;
      IsGenericMethod: boolean;
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      IsPublic: boolean;
      IsPrivate: boolean;
      IsFamily: boolean;
      IsAssembly: boolean;
      IsFamilyAndAssembly: boolean;
      IsFamilyOrAssembly: boolean;
      IsStatic: boolean;
      IsFinal: boolean;
      IsVirtual: boolean;
      IsHideBySig: boolean;
      IsAbstract: boolean;
      IsSpecialName: boolean;
      IsConstructor: boolean;
      MemberType: System.Reflection.MemberTypes;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetParameters: (() => System.Reflection.ParameterInfo[]);
      GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
      Invoke: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
      GetGenericArguments: (() => System.Type[]);
      GetMethodBody: (() => System.Reflection.MethodBody);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum ExceptionHandlingClauseOptions {
      Clause = 0,
      Filter = 1,
      Finally = 2,
      Fault = 4,
    }
    export enum MethodImplAttributes {
      CodeTypeMask = 3,
      IL = 0,
      Native = 1,
      OPTIL = 2,
      Runtime = 3,
      ManagedMask = 4,
      Unmanaged = 4,
      Managed = 0,
      ForwardRef = 16,
      PreserveSig = 128,
      InternalCall = 4096,
      Synchronized = 32,
      NoInlining = 8,
      AggressiveInlining = 256,
      NoOptimization = 64,
      MaxMethodImplVal = 65535,
    }
    export declare class MethodInfo {
      MemberType: System.Reflection.MemberTypes;
      ReturnType: System.Type;
      ReturnParameter: System.Reflection.ParameterInfo;
      ReturnTypeCustomAttributes: System.Reflection.ICustomAttributeProvider;
      MethodImplementationFlags: System.Reflection.MethodImplAttributes;
      MethodHandle: System.RuntimeMethodHandle;
      Attributes: System.Reflection.MethodAttributes;
      CallingConvention: System.Reflection.CallingConventions;
      IsGenericMethodDefinition: boolean;
      ContainsGenericParameters: boolean;
      IsGenericMethod: boolean;
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      IsPublic: boolean;
      IsPrivate: boolean;
      IsFamily: boolean;
      IsAssembly: boolean;
      IsFamilyAndAssembly: boolean;
      IsFamilyOrAssembly: boolean;
      IsStatic: boolean;
      IsFinal: boolean;
      IsVirtual: boolean;
      IsHideBySig: boolean;
      IsAbstract: boolean;
      IsSpecialName: boolean;
      IsConstructor: boolean;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetBaseDefinition: (() => System.Reflection.MethodInfo);
      GetGenericArguments: (() => System.Type[]);
      GetGenericMethodDefinition: (() => System.Reflection.MethodInfo);
      MakeGenericMethod: ((typeArguments: System.Type[]) => System.Reflection.MethodInfo);
      CreateDelegate: ((delegateType: System.Type) => System.Delegate) | ((delegateType: System.Type, target: System.Object) => System.Delegate);
      GetParameters: (() => System.Reflection.ParameterInfo[]);
      GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
      Invoke: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
      GetMethodBody: (() => System.Reflection.MethodBody);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Missing {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum ParameterAttributes {
      None = 0,
      In = 1,
      Out = 2,
      Lcid = 4,
      Retval = 8,
      Optional = 16,
      ReservedMask = 61440,
      HasDefault = 4096,
      HasFieldMarshal = 8192,
      Reserved3 = 16384,
      Reserved4 = 32768,
    }
    export declare class ParameterModifier {
      constructor(parameterCount: number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class Pointer {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum PropertyAttributes {
      None = 0,
      SpecialName = 512,
      ReservedMask = 62464,
      RTSpecialName = 1024,
      HasDefault = 4096,
      Reserved2 = 8192,
      Reserved3 = 16384,
      Reserved4 = 32768,
    }
    export declare class ReflectionContext {
      MapAssembly: ((assembly: System.Reflection.Assembly) => System.Reflection.Assembly);
      MapType: ((type: System.Reflection.TypeInfo) => System.Reflection.TypeInfo);
      GetTypeForObject: ((value: System.Object) => System.Reflection.TypeInfo);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ReflectionTypeLoadException {
      constructor(classes: System.Type[], exceptions: System.Exception[]);
      constructor(classes: System.Type[], exceptions: System.Exception[], message: string);
      Types: System.Type[];
      LoaderExceptions: System.Exception[];
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum ResourceAttributes {
      Public = 1,
      Private = 2,
    }
    export declare class TargetException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class TargetInvocationException {
      constructor(inner: System.Exception);
      constructor(message: string, inner: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class TargetParameterCountException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum TypeAttributes {
      VisibilityMask = 7,
      NotPublic = 0,
      Public = 1,
      NestedPublic = 2,
      NestedPrivate = 3,
      NestedFamily = 4,
      NestedAssembly = 5,
      NestedFamANDAssem = 6,
      NestedFamORAssem = 7,
      LayoutMask = 24,
      AutoLayout = 0,
      SequentialLayout = 8,
      ExplicitLayout = 16,
      ClassSemanticsMask = 32,
      Class = 0,
      Interface = 32,
      Abstract = 128,
      Sealed = 256,
      SpecialName = 1024,
      Import = 4096,
      Serializable = 8192,
      WindowsRuntime = 16384,
      StringFormatMask = 196608,
      AnsiClass = 0,
      UnicodeClass = 65536,
      AutoClass = 131072,
      CustomFormatClass = 196608,
      CustomFormatMask = 12582912,
      BeforeFieldInit = 1048576,
      ReservedMask = 264192,
      RTSpecialName = 2048,
      HasSecurity = 262144,
    }
    export declare class TypeDelegator {
      constructor(delegatingType: System.Type);
      GUID: System.Guid;
      MetadataToken: number;
      Module: System.Reflection.Module;
      Assembly: System.Reflection.Assembly;
      TypeHandle: System.RuntimeTypeHandle;
      Name: string;
      FullName: string;
      Namespace: string;
      AssemblyQualifiedName: string;
      BaseType: System.Type;
      IsConstructedGenericType: boolean;
      UnderlyingSystemType: System.Type;
      IsSZArray: boolean;
      GenericTypeParameters: System.Type[];
      DeclaredConstructors: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.ConstructorInfo]
      DeclaredEvents: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.EventInfo]
      DeclaredFields: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.FieldInfo]
      DeclaredMembers: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MemberInfo]
      DeclaredMethods: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MethodInfo]
      DeclaredNestedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
      DeclaredProperties: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.PropertyInfo]
      ImplementedInterfaces: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      MemberType: System.Reflection.MemberTypes;
      DeclaringType: System.Type;
      DeclaringMethod: System.Reflection.MethodBase;
      ReflectedType: System.Type;
      StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
      TypeInitializer: System.Reflection.ConstructorInfo;
      IsNested: boolean;
      Attributes: System.Reflection.TypeAttributes;
      GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
      IsVisible: boolean;
      IsNotPublic: boolean;
      IsPublic: boolean;
      IsNestedPublic: boolean;
      IsNestedPrivate: boolean;
      IsNestedFamily: boolean;
      IsNestedAssembly: boolean;
      IsNestedFamANDAssem: boolean;
      IsNestedFamORAssem: boolean;
      IsAutoLayout: boolean;
      IsLayoutSequential: boolean;
      IsExplicitLayout: boolean;
      IsClass: boolean;
      IsInterface: boolean;
      IsValueType: boolean;
      IsAbstract: boolean;
      IsSealed: boolean;
      IsEnum: boolean;
      IsSpecialName: boolean;
      IsImport: boolean;
      IsSerializable: boolean;
      IsAnsiClass: boolean;
      IsUnicodeClass: boolean;
      IsAutoClass: boolean;
      IsArray: boolean;
      IsGenericType: boolean;
      IsGenericTypeDefinition: boolean;
      IsGenericParameter: boolean;
      GenericParameterPosition: number;
      ContainsGenericParameters: boolean;
      IsByRef: boolean;
      IsPointer: boolean;
      IsPrimitive: boolean;
      IsCOMObject: boolean;
      HasElementType: boolean;
      IsContextful: boolean;
      IsMarshalByRef: boolean;
      GenericTypeArguments: System.Type[];
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      IsAssignableFrom: ((typeInfo: System.Reflection.TypeInfo) => boolean) | ((c: System.Type) => boolean);
      InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
      GetConstructors: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]) | (() => System.Reflection.ConstructorInfo[]);
      GetMethods: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
      GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
      GetFields: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]) | (() => System.Reflection.FieldInfo[]);
      GetInterface: ((name: string, ignoreCase: boolean) => System.Type) | ((name: string) => System.Type);
      GetInterfaces: (() => System.Type[]);
      GetEvent: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo) | ((name: string) => System.Reflection.EventInfo);
      GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
      GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
      GetNestedTypes: ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]) | (() => System.Type[]);
      GetNestedType: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type) | ((name: string) => System.Type);
      GetMember: ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
      GetMembers: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | (() => System.Reflection.MemberInfo[]);
      GetElementType: (() => System.Type);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
      AsType: (() => System.Type);
      GetDeclaredEvent: ((name: string) => System.Reflection.EventInfo);
      GetDeclaredField: ((name: string) => System.Reflection.FieldInfo);
      GetDeclaredMethod: ((name: string) => System.Reflection.MethodInfo);
      GetDeclaredMethods: ((name: string) => any);
      GetDeclaredNestedType: ((name: string) => System.Reflection.TypeInfo);
      GetDeclaredProperty: ((name: string) => System.Reflection.PropertyInfo);
      MakePointerType: (() => System.Type);
      MakeByRefType: (() => System.Type);
      MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
      GetArrayRank: (() => number);
      GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
      GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
      FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
      GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
      GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
      FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
      GetGenericParameterConstraints: (() => System.Type[]);
      MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
      GetGenericArguments: (() => System.Type[]);
      GetGenericTypeDefinition: (() => System.Type);
      GetEnumNames: (() => string[]);
      GetEnumValues: (() => System.Array);
      GetEnumUnderlyingType: (() => System.Type);
      IsEnumDefined: ((value: System.Object) => boolean);
      GetEnumName: ((value: System.Object) => string);
      IsSubclassOf: ((c: System.Type) => boolean);
      IsInstanceOfType: ((o: System.Object) => boolean);
      IsEquivalentTo: ((other: System.Type) => boolean);
      ToString: (() => string);
      Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type) | (() => System.Type);
      GetCustomAttributesData: (() => any);
    }
    export declare class TypeFilter {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((m: System.Type, filterCriteria: System.Object) => boolean);
      BeginInvoke: ((m: System.Type, filterCriteria: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => boolean);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TypeInfo {
      GenericTypeParameters: System.Type[];
      DeclaredConstructors: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.ConstructorInfo]
      DeclaredEvents: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.EventInfo]
      DeclaredFields: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.FieldInfo]
      DeclaredMembers: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MemberInfo]
      DeclaredMethods: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MethodInfo]
      DeclaredNestedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
      DeclaredProperties: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.PropertyInfo]
      ImplementedInterfaces: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      MemberType: System.Reflection.MemberTypes;
      DeclaringType: System.Type;
      DeclaringMethod: System.Reflection.MethodBase;
      ReflectedType: System.Type;
      StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
      GUID: System.Guid;
      Module: System.Reflection.Module;
      Assembly: System.Reflection.Assembly;
      TypeHandle: System.RuntimeTypeHandle;
      FullName: string;
      Namespace: string;
      AssemblyQualifiedName: string;
      BaseType: System.Type;
      TypeInitializer: System.Reflection.ConstructorInfo;
      IsNested: boolean;
      Attributes: System.Reflection.TypeAttributes;
      GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
      IsVisible: boolean;
      IsNotPublic: boolean;
      IsPublic: boolean;
      IsNestedPublic: boolean;
      IsNestedPrivate: boolean;
      IsNestedFamily: boolean;
      IsNestedAssembly: boolean;
      IsNestedFamANDAssem: boolean;
      IsNestedFamORAssem: boolean;
      IsAutoLayout: boolean;
      IsLayoutSequential: boolean;
      IsExplicitLayout: boolean;
      IsClass: boolean;
      IsInterface: boolean;
      IsValueType: boolean;
      IsAbstract: boolean;
      IsSealed: boolean;
      IsEnum: boolean;
      IsSpecialName: boolean;
      IsImport: boolean;
      IsSerializable: boolean;
      IsAnsiClass: boolean;
      IsUnicodeClass: boolean;
      IsAutoClass: boolean;
      IsArray: boolean;
      IsGenericType: boolean;
      IsGenericTypeDefinition: boolean;
      IsConstructedGenericType: boolean;
      IsGenericParameter: boolean;
      GenericParameterPosition: number;
      ContainsGenericParameters: boolean;
      IsByRef: boolean;
      IsPointer: boolean;
      IsPrimitive: boolean;
      IsCOMObject: boolean;
      HasElementType: boolean;
      IsContextful: boolean;
      IsMarshalByRef: boolean;
      GenericTypeArguments: System.Type[];
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      UnderlyingSystemType: System.Type;
      IsSZArray: boolean;
      Name: string;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      AsType: (() => System.Type);
      IsAssignableFrom: ((typeInfo: System.Reflection.TypeInfo) => boolean) | ((c: System.Type) => boolean);
      GetDeclaredEvent: ((name: string) => System.Reflection.EventInfo);
      GetDeclaredField: ((name: string) => System.Reflection.FieldInfo);
      GetDeclaredMethod: ((name: string) => System.Reflection.MethodInfo);
      GetDeclaredMethods: ((name: string) => any);
      GetDeclaredNestedType: ((name: string) => System.Reflection.TypeInfo);
      GetDeclaredProperty: ((name: string) => System.Reflection.PropertyInfo);
      MakePointerType: (() => System.Type);
      MakeByRefType: (() => System.Type);
      MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
      InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
      GetArrayRank: (() => number);
      GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
      GetConstructors: (() => System.Reflection.ConstructorInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]);
      GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
      GetMethods: (() => System.Reflection.MethodInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]);
      GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
      GetFields: (() => System.Reflection.FieldInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]);
      GetInterface: ((name: string) => System.Type) | ((name: string, ignoreCase: boolean) => System.Type);
      GetInterfaces: (() => System.Type[]);
      FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
      GetEvent: ((name: string) => System.Reflection.EventInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo);
      GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
      GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
      GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
      GetNestedTypes: (() => System.Type[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]);
      GetNestedType: ((name: string) => System.Type) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type);
      GetMember: ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
      GetMembers: (() => System.Reflection.MemberInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
      GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
      FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
      GetGenericParameterConstraints: (() => System.Type[]);
      MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
      GetElementType: (() => System.Type);
      GetGenericArguments: (() => System.Type[]);
      GetGenericTypeDefinition: (() => System.Type);
      GetEnumNames: (() => string[]);
      GetEnumValues: (() => System.Array);
      GetEnumUnderlyingType: (() => System.Type);
      IsEnumDefined: ((value: System.Object) => boolean);
      GetEnumName: ((value: System.Object) => string);
      IsSubclassOf: ((c: System.Type) => boolean);
      IsInstanceOfType: ((o: System.Object) => boolean);
      IsEquivalentTo: ((other: System.Type) => boolean);
      ToString: (() => string);
      Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
      GetHashCode: (() => number);
      GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
      GetType: (() => System.Type) | (() => System.Type);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
    }
    export declare class Assembly {
      CodeBase: string;
      EscapedCodeBase: string;
      FullName: string;
      EntryPoint: System.Reflection.MethodInfo;
      Evidence: System.Security.Policy.Evidence;
      Location: string;
      ImageRuntimeVersion: string;
      HostContext: System.Int64;
      ReflectionOnly: boolean;
      PermissionSet: System.Security.PermissionSet;
      SecurityRuleSet: System.Security.SecurityRuleSet;
      IsFullyTrusted: boolean;
      ManifestModule: System.Reflection.Module;
      GlobalAssemblyCache: boolean;
      IsDynamic: boolean;
      DefinedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
      ExportedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
      Modules: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.Module]
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      GetFiles: (() => System.IO.FileStream[]) | ((getResourceModules: boolean) => System.IO.FileStream[]);
      GetFile: ((name: string) => System.IO.FileStream);
      GetManifestResourceStream: ((name: string) => System.IO.Stream) | ((type: System.Type, name: string) => System.IO.Stream);
      GetTypes: (() => System.Type[]);
      GetExportedTypes: (() => System.Type[]);
      GetType: ((name: string, throwOnError: boolean) => System.Type) | ((name: string) => System.Type) | ((name: string, throwOnError: boolean, ignoreCase: boolean) => System.Type) | (() => System.Type);
      GetName: ((copiedName: boolean) => System.Reflection.AssemblyName) | (() => System.Reflection.AssemblyName);
      ToString: (() => string);
      LoadModule: ((moduleName: string, rawModule: System.Byte[]) => System.Reflection.Module) | ((moduleName: string, rawModule: System.Byte[], rawSymbolStore: System.Byte[]) => System.Reflection.Module);
      CreateInstance: ((typeName: string) => System.Object) | ((typeName: string, ignoreCase: boolean) => System.Object) | ((typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Object);
      GetLoadedModules: (() => System.Reflection.Module[]) | ((getResourceModules: boolean) => System.Reflection.Module[]);
      GetModules: (() => System.Reflection.Module[]) | ((getResourceModules: boolean) => System.Reflection.Module[]);
      GetManifestResourceNames: (() => string[]);
      GetManifestResourceInfo: ((resourceName: string) => System.Reflection.ManifestResourceInfo);
      GetHashCode: (() => number);
      Equals: ((o: System.Object) => boolean);
      GetCustomAttributesData: (() => any);
      GetModule: ((name: string) => System.Reflection.Module);
      GetReferencedAssemblies: (() => System.Reflection.AssemblyName[]);
      GetSatelliteAssembly: ((culture: System.Globalization.CultureInfo) => System.Reflection.Assembly) | ((culture: System.Globalization.CultureInfo, version: System.Version) => System.Reflection.Assembly);
    }
    export declare class AssemblyName {
      constructor();
      constructor(assemblyName: string);
      ProcessorArchitecture: System.Reflection.ProcessorArchitecture;
      Name: string;
      CodeBase: string;
      EscapedCodeBase: string;
      CultureInfo: System.Globalization.CultureInfo;
      Flags: System.Reflection.AssemblyNameFlags;
      FullName: string;
      HashAlgorithm: System.Configuration.Assemblies.AssemblyHashAlgorithm;
      KeyPair: System.Reflection.StrongNameKeyPair;
      Version: System.Version;
      VersionCompatibility: System.Configuration.Assemblies.AssemblyVersionCompatibility;
      CultureName: string;
      ContentType: System.Reflection.AssemblyContentType;
      ToString: (() => string);
      GetPublicKey: (() => System.Byte[]);
      GetPublicKeyToken: (() => System.Byte[]);
      SetPublicKey: ((publicKey: System.Byte[]) => void);
      SetPublicKeyToken: ((publicKeyToken: System.Byte[]) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Clone: (() => System.Object);
      OnDeserialization: ((sender: System.Object) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class ConstructorInfo {
      MemberType: System.Reflection.MemberTypes;
      MethodImplementationFlags: System.Reflection.MethodImplAttributes;
      MethodHandle: System.RuntimeMethodHandle;
      Attributes: System.Reflection.MethodAttributes;
      CallingConvention: System.Reflection.CallingConventions;
      IsGenericMethodDefinition: boolean;
      ContainsGenericParameters: boolean;
      IsGenericMethod: boolean;
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      IsPublic: boolean;
      IsPrivate: boolean;
      IsFamily: boolean;
      IsAssembly: boolean;
      IsFamilyAndAssembly: boolean;
      IsFamilyOrAssembly: boolean;
      IsStatic: boolean;
      IsFinal: boolean;
      IsVirtual: boolean;
      IsHideBySig: boolean;
      IsAbstract: boolean;
      IsSpecialName: boolean;
      IsConstructor: boolean;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      Invoke: ((parameters: System.Object[]) => System.Object) | ((invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetParameters: (() => System.Reflection.ParameterInfo[]);
      GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
      GetGenericArguments: (() => System.Type[]);
      GetMethodBody: (() => System.Reflection.MethodBody);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CustomAttributeData {
      Constructor: System.Reflection.ConstructorInfo;
      ConstructorArguments: any; // System.Collections.Generic.IList`1[System.Reflection.CustomAttributeTypedArgument]
      NamedArguments: any; // System.Collections.Generic.IList`1[System.Reflection.CustomAttributeNamedArgument]
      AttributeType: System.Type;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class CustomAttributeFormatException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class CustomAttributeNamedArgument {
      constructor(memberInfo: System.Reflection.MemberInfo, value: System.Object);
      constructor(memberInfo: System.Reflection.MemberInfo, typedArgument: System.Reflection.CustomAttributeTypedArgument);
      MemberInfo: System.Reflection.MemberInfo;
      TypedValue: System.Reflection.CustomAttributeTypedArgument;
      IsField: boolean;
      MemberName: string;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class CustomAttributeTypedArgument {
      constructor(argumentType: System.Type, value: System.Object);
      constructor(value: System.Object);
      ArgumentType: System.Type;
      Value: System.Object;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class EventInfo {
      Attributes: System.Reflection.EventAttributes;
      EventHandlerType: System.Type;
      IsMulticast: boolean;
      IsSpecialName: boolean;
      MemberType: System.Reflection.MemberTypes;
      AddMethod: System.Reflection.MethodInfo;
      RaiseMethod: System.Reflection.MethodInfo;
      RemoveMethod: System.Reflection.MethodInfo;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      AddEventHandler: ((target: System.Object, handler: System.Delegate) => void);
      GetAddMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
      GetRaiseMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
      GetRemoveMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
      GetOtherMethods: ((nonPublic: boolean) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
      RemoveEventHandler: ((target: System.Object, handler: System.Delegate) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ExceptionHandlingClause {
      CatchType: System.Type;
      FilterOffset: number;
      Flags: System.Reflection.ExceptionHandlingClauseOptions;
      HandlerLength: number;
      HandlerOffset: number;
      TryLength: number;
      TryOffset: number;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class FieldInfo {
      Attributes: System.Reflection.FieldAttributes;
      FieldHandle: System.RuntimeFieldHandle;
      FieldType: System.Type;
      MemberType: System.Reflection.MemberTypes;
      IsLiteral: boolean;
      IsStatic: boolean;
      IsInitOnly: boolean;
      IsPublic: boolean;
      IsPrivate: boolean;
      IsFamily: boolean;
      IsAssembly: boolean;
      IsFamilyAndAssembly: boolean;
      IsFamilyOrAssembly: boolean;
      IsPinvokeImpl: boolean;
      IsSpecialName: boolean;
      IsNotSerialized: boolean;
      IsSecurityCritical: boolean;
      IsSecuritySafeCritical: boolean;
      IsSecurityTransparent: boolean;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      GetValue: ((obj: System.Object) => System.Object);
      SetValue: ((obj: System.Object, value: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, culture: System.Globalization.CultureInfo) => void) | ((obj: System.Object, value: System.Object) => void);
      GetValueDirect: ((obj: System.TypedReference) => System.Object);
      SetValueDirect: ((obj: System.TypedReference, value: System.Object) => void);
      GetOptionalCustomModifiers: (() => System.Type[]);
      GetRequiredCustomModifiers: (() => System.Type[]);
      GetRawConstantValue: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum ImageFileMachine {
      I386 = 332,
      IA64 = 512,
      AMD64 = 34404,
      ARM = 452,
    }
    export declare class LocalVariableInfo {
      IsPinned: boolean;
      LocalIndex: number;
      LocalType: System.Type;
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class MethodBody {
      ExceptionHandlingClauses: any; // System.Collections.Generic.IList`1[System.Reflection.ExceptionHandlingClause]
      LocalVariables: any; // System.Collections.Generic.IList`1[System.Reflection.LocalVariableInfo]
      InitLocals: boolean;
      LocalSignatureMetadataToken: number;
      MaxStackSize: number;
      GetILAsByteArray: (() => System.Byte[]);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Module {
      ModuleHandle: System.ModuleHandle;
      Assembly: System.Reflection.Assembly;
      Name: string;
      ScopeName: string;
      MDStreamVersion: number;
      ModuleVersionId: System.Guid;
      FullyQualifiedName: string;
      MetadataToken: number;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      GetField: ((name: string) => System.Reflection.FieldInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo);
      GetFields: (() => System.Reflection.FieldInfo[]) | ((bindingFlags: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]);
      GetMethod: ((name: string) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo);
      GetMethods: (() => System.Reflection.MethodInfo[]) | ((bindingFlags: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: ((className: string) => System.Type) | ((className: string, ignoreCase: boolean) => System.Type) | ((className: string, throwOnError: boolean, ignoreCase: boolean) => System.Type) | (() => System.Type);
      ToString: (() => string);
      ResolveField: ((metadataToken: number) => System.Reflection.FieldInfo) | ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.FieldInfo);
      ResolveMember: ((metadataToken: number) => System.Reflection.MemberInfo) | ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.MemberInfo);
      ResolveMethod: ((metadataToken: number) => System.Reflection.MethodBase) | ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.MethodBase);
      ResolveType: ((metadataToken: number) => System.Type) | ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Type);
      Equals: ((o: System.Object) => boolean);
      GetHashCode: (() => number);
      IsResource: (() => boolean);
      FindTypes: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      GetCustomAttributesData: (() => any);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      ResolveSignature: ((metadataToken: number) => System.Byte[]);
      ResolveString: ((metadataToken: number) => string);
      GetSignerCertificate: (() => System.Security.Cryptography.X509Certificates.X509Certificate);
      GetTypes: (() => System.Type[]);
    }
    export declare class ModuleResolveEventHandler {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((sender: System.Object, e: System.ResolveEventArgs) => System.Reflection.Module);
      BeginInvoke: ((sender: System.Object, e: System.ResolveEventArgs, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => System.Reflection.Module);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ParameterInfo {
      ParameterType: System.Type;
      Attributes: System.Reflection.ParameterAttributes;
      IsIn: boolean;
      IsLcid: boolean;
      IsOptional: boolean;
      IsOut: boolean;
      IsRetval: boolean;
      Member: System.Reflection.MemberInfo;
      Name: string;
      Position: number;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      HasDefaultValue: boolean;
      DefaultValue: System.Object;
      RawDefaultValue: System.Object;
      MetadataToken: number;
      ToString: (() => string);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      GetRealObject: ((context: System.Runtime.Serialization.StreamingContext) => System.Object);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetRequiredCustomModifiers: (() => System.Type[]);
      GetOptionalCustomModifiers: (() => System.Type[]);
      GetCustomAttributesData: (() => any);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export enum PortableExecutableKinds {
      NotAPortableExecutableImage = 0,
      ILOnly = 1,
      Required32Bit = 2,
      PE32Plus = 4,
      Unmanaged32Bit = 8,
      Preferred32Bit = 16,
    }
    export declare class PropertyInfo {
      Attributes: System.Reflection.PropertyAttributes;
      CanRead: boolean;
      CanWrite: boolean;
      GetMethod: System.Reflection.MethodInfo;
      SetMethod: System.Reflection.MethodInfo;
      IsSpecialName: boolean;
      MemberType: System.Reflection.MemberTypes;
      PropertyType: System.Type;
      Name: string;
      DeclaringType: System.Type;
      ReflectedType: System.Type;
      CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
      MetadataToken: number;
      Module: System.Reflection.Module;
      GetAccessors: (() => System.Reflection.MethodInfo[]) | ((nonPublic: boolean) => System.Reflection.MethodInfo[]);
      GetGetMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
      GetIndexParameters: (() => System.Reflection.ParameterInfo[]);
      GetSetMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
      GetValue: ((obj: System.Object, index: System.Object[]) => System.Object) | ((obj: System.Object) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
      SetValue: ((obj: System.Object, value: System.Object, index: System.Object[]) => void) | ((obj: System.Object, value: System.Object) => void) | ((obj: System.Object, value: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => void);
      GetOptionalCustomModifiers: (() => System.Type[]);
      GetRequiredCustomModifiers: (() => System.Type[]);
      GetConstantValue: (() => System.Object);
      GetRawConstantValue: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
      IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
      GetCustomAttributesData: (() => any);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StrongNameKeyPair {
      constructor(keyPairArray: System.Byte[]);
      constructor(keyPairFile: System.IO.FileStream);
      constructor(keyPairContainer: string);
      PublicKey: System.Byte[];
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export namespace Emit {
      export declare class ExceptionHandler {
        constructor(tryOffset: number, tryLength: number, filterOffset: number, handlerOffset: number, handlerLength: number, kind: System.Reflection.ExceptionHandlingClauseOptions, exceptionTypeToken: number);
        ExceptionTypeToken: number;
        TryOffset: number;
        TryLength: number;
        FilterOffset: number;
        HandlerOffset: number;
        HandlerLength: number;
        Kind: System.Reflection.ExceptionHandlingClauseOptions;
        GetHashCode: (() => number);
        Equals: ((obj: System.Object) => boolean) | ((other: System.Reflection.Emit.ExceptionHandler) => boolean);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class AssemblyBuilder {
        CodeBase: string;
        EntryPoint: System.Reflection.MethodInfo;
        Location: string;
        ImageRuntimeVersion: string;
        ReflectionOnly: boolean;
        ManifestModule: System.Reflection.Module;
        GlobalAssemblyCache: boolean;
        IsDynamic: boolean;
        FullName: string;
        EscapedCodeBase: string;
        Evidence: System.Security.Policy.Evidence;
        HostContext: System.Int64;
        PermissionSet: System.Security.PermissionSet;
        SecurityRuleSet: System.Security.SecurityRuleSet;
        IsFullyTrusted: boolean;
        DefinedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
        ExportedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Type]
        Modules: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.Module]
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        AddResourceFile: ((name: string, fileName: string) => void) | ((name: string, fileName: string, attribute: System.Reflection.ResourceAttributes) => void);
        DefineDynamicModule: ((name: string) => System.Reflection.Emit.ModuleBuilder) | ((name: string, emitSymbolInfo: boolean) => System.Reflection.Emit.ModuleBuilder) | ((name: string, fileName: string) => System.Reflection.Emit.ModuleBuilder) | ((name: string, fileName: string, emitSymbolInfo: boolean) => System.Reflection.Emit.ModuleBuilder);
        DefineResource: ((name: string, description: string, fileName: string) => System.Resources.IResourceWriter) | ((name: string, description: string, fileName: string, attribute: System.Reflection.ResourceAttributes) => System.Resources.IResourceWriter);
        DefineUnmanagedResource: ((resource: System.Byte[]) => void) | ((resourceFileName: string) => void);
        DefineVersionInfoResource: (() => void) | ((product: string, productVersion: string, company: string, copyright: string, trademark: string) => void);
        GetDynamicModule: ((name: string) => System.Reflection.Emit.ModuleBuilder);
        GetExportedTypes: (() => System.Type[]);
        GetFile: ((name: string) => System.IO.FileStream);
        GetFiles: ((getResourceModules: boolean) => System.IO.FileStream[]) | (() => System.IO.FileStream[]);
        GetManifestResourceInfo: ((resourceName: string) => System.Reflection.ManifestResourceInfo);
        GetManifestResourceNames: (() => string[]);
        GetManifestResourceStream: ((name: string) => System.IO.Stream) | ((type: System.Type, name: string) => System.IO.Stream);
        Save: ((assemblyFileName: string, portableExecutableKind: System.Reflection.PortableExecutableKinds, imageFileMachine: System.Reflection.ImageFileMachine) => void) | ((assemblyFileName: string) => void);
        SetEntryPoint: ((entryMethod: System.Reflection.MethodInfo) => void) | ((entryMethod: System.Reflection.MethodInfo, fileKind: System.Reflection.Emit.PEFileKinds) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        GetType: ((name: string, throwOnError: boolean, ignoreCase: boolean) => System.Type) | ((name: string, throwOnError: boolean) => System.Type) | ((name: string) => System.Type) | (() => System.Type);
        GetModule: ((name: string) => System.Reflection.Module);
        GetModules: ((getResourceModules: boolean) => System.Reflection.Module[]) | (() => System.Reflection.Module[]);
        GetName: ((copiedName: boolean) => System.Reflection.AssemblyName) | (() => System.Reflection.AssemblyName);
        GetReferencedAssemblies: (() => System.Reflection.AssemblyName[]);
        GetLoadedModules: ((getResourceModules: boolean) => System.Reflection.Module[]) | (() => System.Reflection.Module[]);
        GetSatelliteAssembly: ((culture: System.Globalization.CultureInfo) => System.Reflection.Assembly) | ((culture: System.Globalization.CultureInfo, version: System.Version) => System.Reflection.Assembly);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetTypes: (() => System.Type[]);
        ToString: (() => string);
        LoadModule: ((moduleName: string, rawModule: System.Byte[]) => System.Reflection.Module) | ((moduleName: string, rawModule: System.Byte[], rawSymbolStore: System.Byte[]) => System.Reflection.Module);
        CreateInstance: ((typeName: string) => System.Object) | ((typeName: string, ignoreCase: boolean) => System.Object) | ((typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Object);
        GetCustomAttributesData: (() => any);
      }
      export enum AssemblyBuilderAccess {
        Run = 1,
        Save = 2,
        RunAndSave = 3,
        ReflectionOnly = 6,
        RunAndCollect = 9,
      }
      export declare class ConstructorBuilder {
        CallingConvention: System.Reflection.CallingConventions;
        InitLocals: boolean;
        MethodHandle: System.RuntimeMethodHandle;
        Attributes: System.Reflection.MethodAttributes;
        ReflectedType: System.Type;
        DeclaringType: System.Type;
        ReturnType: System.Type;
        Name: string;
        Signature: string;
        Module: System.Reflection.Module;
        MemberType: System.Reflection.MemberTypes;
        MethodImplementationFlags: System.Reflection.MethodImplAttributes;
        IsGenericMethodDefinition: boolean;
        ContainsGenericParameters: boolean;
        IsGenericMethod: boolean;
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsPublic: boolean;
        IsPrivate: boolean;
        IsFamily: boolean;
        IsAssembly: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsStatic: boolean;
        IsFinal: boolean;
        IsVirtual: boolean;
        IsHideBySig: boolean;
        IsAbstract: boolean;
        IsSpecialName: boolean;
        IsConstructor: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        Invoke: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((parameters: System.Object[]) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
        AddDeclarativeSecurity: ((action: System.Security.Permissions.SecurityAction, pset: System.Security.PermissionSet) => void);
        DefineParameter: ((iSequence: number, attributes: System.Reflection.ParameterAttributes, strParamName: string) => System.Reflection.Emit.ParameterBuilder);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetILGenerator: (() => System.Reflection.Emit.ILGenerator) | ((streamSize: number) => System.Reflection.Emit.ILGenerator);
        SetMethodBody: ((il: System.Byte[], maxStack: number, localSignature: System.Byte[], exceptionHandlers: any, tokenFixups: any) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        SetImplementationFlags: ((attributes: System.Reflection.MethodImplAttributes) => void);
        GetModule: (() => System.Reflection.Module);
        GetToken: (() => System.Reflection.Emit.MethodToken);
        SetSymCustomAttribute: ((name: string, data: System.Byte[]) => void);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetGenericArguments: (() => System.Type[]);
        GetMethodBody: (() => System.Reflection.MethodBody);
        GetCustomAttributesData: (() => any);
        GetType: (() => System.Type);
      }
      export declare class CustomAttributeBuilder {
        constructor(con: System.Reflection.ConstructorInfo, constructorArgs: System.Object[]);
        constructor(con: System.Reflection.ConstructorInfo, constructorArgs: System.Object[], namedFields: System.Reflection.FieldInfo[], fieldValues: System.Object[]);
        constructor(con: System.Reflection.ConstructorInfo, constructorArgs: System.Object[], namedProperties: System.Reflection.PropertyInfo[], propertyValues: System.Object[]);
        constructor(con: System.Reflection.ConstructorInfo, constructorArgs: System.Object[], namedProperties: System.Reflection.PropertyInfo[], propertyValues: System.Object[], namedFields: System.Reflection.FieldInfo[], fieldValues: System.Object[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DynamicILInfo {
        DynamicMethod: System.Reflection.Emit.DynamicMethod;
        GetTokenFor: ((signature: System.Byte[]) => number) | ((method: System.Reflection.Emit.DynamicMethod) => number) | ((field: System.RuntimeFieldHandle) => number) | ((method: System.RuntimeMethodHandle) => number) | ((type: System.RuntimeTypeHandle) => number) | ((literal: string) => number) | ((method: System.RuntimeMethodHandle, contextType: System.RuntimeTypeHandle) => number) | ((field: System.RuntimeFieldHandle, contextType: System.RuntimeTypeHandle) => number);
        SetCode: ((code: System.Byte[], maxStackSize: number) => void);
        SetExceptions: ((exceptions: System.Byte[]) => void);
        SetLocalSignature: ((localSignature: System.Byte[]) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DynamicMethod {
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[], m: System.Reflection.Module);
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[], owner: System.Type);
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[], m: System.Reflection.Module, skipVisibility: boolean);
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[], owner: System.Type, skipVisibility: boolean);
        constructor(name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], owner: System.Type, skipVisibility: boolean);
        constructor(name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], m: System.Reflection.Module, skipVisibility: boolean);
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[]);
        constructor(name: string, returnType: System.Type, parameterTypes: System.Type[], restrictedSkipVisibility: boolean);
        Attributes: System.Reflection.MethodAttributes;
        CallingConvention: System.Reflection.CallingConventions;
        DeclaringType: System.Type;
        InitLocals: boolean;
        MethodHandle: System.RuntimeMethodHandle;
        Module: System.Reflection.Module;
        Name: string;
        ReflectedType: System.Type;
        ReturnParameter: System.Reflection.ParameterInfo;
        ReturnType: System.Type;
        ReturnTypeCustomAttributes: System.Reflection.ICustomAttributeProvider;
        MemberType: System.Reflection.MemberTypes;
        MethodImplementationFlags: System.Reflection.MethodImplAttributes;
        IsGenericMethodDefinition: boolean;
        ContainsGenericParameters: boolean;
        IsGenericMethod: boolean;
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsPublic: boolean;
        IsPrivate: boolean;
        IsFamily: boolean;
        IsAssembly: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsStatic: boolean;
        IsFinal: boolean;
        IsVirtual: boolean;
        IsHideBySig: boolean;
        IsAbstract: boolean;
        IsSpecialName: boolean;
        IsConstructor: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        CreateDelegate: ((delegateType: System.Type) => System.Delegate) | ((delegateType: System.Type, target: System.Object) => System.Delegate);
        DefineParameter: ((position: number, attributes: System.Reflection.ParameterAttributes, parameterName: string) => System.Reflection.Emit.ParameterBuilder);
        GetBaseDefinition: (() => System.Reflection.MethodInfo);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetDynamicILInfo: (() => System.Reflection.Emit.DynamicILInfo);
        GetILGenerator: (() => System.Reflection.Emit.ILGenerator) | ((streamSize: number) => System.Reflection.Emit.ILGenerator);
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        Invoke: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetGenericArguments: (() => System.Type[]);
        GetGenericMethodDefinition: (() => System.Reflection.MethodInfo);
        MakeGenericMethod: ((typeArguments: System.Type[]) => System.Reflection.MethodInfo);
        GetMethodBody: (() => System.Reflection.MethodBody);
        GetCustomAttributesData: (() => any);
        GetType: (() => System.Type);
      }
      export declare class EnumBuilder {
        Assembly: System.Reflection.Assembly;
        AssemblyQualifiedName: string;
        BaseType: System.Type;
        DeclaringType: System.Type;
        FullName: string;
        GUID: System.Guid;
        Module: System.Reflection.Module;
        Name: string;
        Namespace: string;
        ReflectedType: System.Type;
        TypeHandle: System.RuntimeTypeHandle;
        TypeToken: System.Reflection.Emit.TypeToken;
        UnderlyingField: System.Reflection.Emit.FieldBuilder;
        UnderlyingSystemType: System.Type;
        IsConstructedGenericType: boolean;
        GenericTypeParameters: System.Type[];
        DeclaredConstructors: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.ConstructorInfo]
        DeclaredEvents: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.EventInfo]
        DeclaredFields: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.FieldInfo]
        DeclaredMembers: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MemberInfo]
        DeclaredMethods: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MethodInfo]
        DeclaredNestedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
        DeclaredProperties: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.PropertyInfo]
        ImplementedInterfaces: any; // System.Collections.Generic.IEnumerable`1[System.Type]
        MemberType: System.Reflection.MemberTypes;
        DeclaringMethod: System.Reflection.MethodBase;
        StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
        TypeInitializer: System.Reflection.ConstructorInfo;
        IsNested: boolean;
        Attributes: System.Reflection.TypeAttributes;
        GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
        IsVisible: boolean;
        IsNotPublic: boolean;
        IsPublic: boolean;
        IsNestedPublic: boolean;
        IsNestedPrivate: boolean;
        IsNestedFamily: boolean;
        IsNestedAssembly: boolean;
        IsNestedFamANDAssem: boolean;
        IsNestedFamORAssem: boolean;
        IsAutoLayout: boolean;
        IsLayoutSequential: boolean;
        IsExplicitLayout: boolean;
        IsClass: boolean;
        IsInterface: boolean;
        IsValueType: boolean;
        IsAbstract: boolean;
        IsSealed: boolean;
        IsEnum: boolean;
        IsSpecialName: boolean;
        IsImport: boolean;
        IsSerializable: boolean;
        IsAnsiClass: boolean;
        IsUnicodeClass: boolean;
        IsAutoClass: boolean;
        IsArray: boolean;
        IsGenericType: boolean;
        IsGenericTypeDefinition: boolean;
        IsGenericParameter: boolean;
        GenericParameterPosition: number;
        ContainsGenericParameters: boolean;
        IsByRef: boolean;
        IsPointer: boolean;
        IsPrimitive: boolean;
        IsCOMObject: boolean;
        HasElementType: boolean;
        IsContextful: boolean;
        IsMarshalByRef: boolean;
        GenericTypeArguments: System.Type[];
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsSZArray: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        CreateType: (() => System.Type);
        CreateTypeInfo: (() => System.Reflection.TypeInfo);
        GetEnumUnderlyingType: (() => System.Type);
        DefineLiteral: ((literalName: string, literalValue: System.Object) => System.Reflection.Emit.FieldBuilder);
        GetConstructors: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]) | (() => System.Reflection.ConstructorInfo[]);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetElementType: (() => System.Type);
        GetEvent: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo) | ((name: string) => System.Reflection.EventInfo);
        GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
        GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
        GetFields: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]) | (() => System.Reflection.FieldInfo[]);
        GetInterface: ((name: string, ignoreCase: boolean) => System.Type) | ((name: string) => System.Type);
        GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
        GetInterfaces: (() => System.Type[]);
        GetMember: ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
        GetMembers: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | (() => System.Reflection.MemberInfo[]);
        GetMethods: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
        GetNestedType: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type) | ((name: string) => System.Type);
        GetNestedTypes: ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]) | (() => System.Type[]);
        GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
        InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
        MakeByRefType: (() => System.Type);
        MakePointerType: (() => System.Type);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        IsAssignableFrom: ((typeInfo: System.Reflection.TypeInfo) => boolean) | ((c: System.Type) => boolean);
        AsType: (() => System.Type);
        GetDeclaredEvent: ((name: string) => System.Reflection.EventInfo);
        GetDeclaredField: ((name: string) => System.Reflection.FieldInfo);
        GetDeclaredMethod: ((name: string) => System.Reflection.MethodInfo);
        GetDeclaredMethods: ((name: string) => any);
        GetDeclaredNestedType: ((name: string) => System.Reflection.TypeInfo);
        GetDeclaredProperty: ((name: string) => System.Reflection.PropertyInfo);
        GetArrayRank: (() => number);
        GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
        GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
        FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
        GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
        GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
        FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
        GetGenericParameterConstraints: (() => System.Type[]);
        MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
        GetGenericArguments: (() => System.Type[]);
        GetGenericTypeDefinition: (() => System.Type);
        GetEnumNames: (() => string[]);
        GetEnumValues: (() => System.Array);
        IsEnumDefined: ((value: System.Object) => boolean);
        GetEnumName: ((value: System.Object) => string);
        IsSubclassOf: ((c: System.Type) => boolean);
        IsInstanceOfType: ((o: System.Object) => boolean);
        IsEquivalentTo: ((other: System.Type) => boolean);
        ToString: (() => string);
        Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type) | (() => System.Type);
        GetCustomAttributesData: (() => any);
      }
      export declare class EventBuilder {
        AddOtherMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        GetEventToken: (() => System.Reflection.Emit.EventToken);
        SetAddOnMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        SetRaiseMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        SetRemoveOnMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.EventToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class FieldBuilder {
        Attributes: System.Reflection.FieldAttributes;
        DeclaringType: System.Type;
        FieldHandle: System.RuntimeFieldHandle;
        FieldType: System.Type;
        Name: string;
        ReflectedType: System.Type;
        Module: System.Reflection.Module;
        MemberType: System.Reflection.MemberTypes;
        IsLiteral: boolean;
        IsStatic: boolean;
        IsInitOnly: boolean;
        IsPublic: boolean;
        IsPrivate: boolean;
        IsFamily: boolean;
        IsAssembly: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsPinvokeImpl: boolean;
        IsSpecialName: boolean;
        IsNotSerialized: boolean;
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetToken: (() => System.Reflection.Emit.FieldToken);
        GetValue: ((obj: System.Object) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        SetConstant: ((defaultValue: System.Object) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        SetMarshal: ((unmanagedMarshal: System.Reflection.Emit.UnmanagedMarshal) => void);
        SetOffset: ((iOffset: number) => void);
        SetValue: ((obj: System.Object, val: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, culture: System.Globalization.CultureInfo) => void) | ((obj: System.Object, value: System.Object) => void);
        GetValueDirect: ((obj: System.TypedReference) => System.Object);
        SetValueDirect: ((obj: System.TypedReference, value: System.Object) => void);
        GetOptionalCustomModifiers: (() => System.Type[]);
        GetRequiredCustomModifiers: (() => System.Type[]);
        GetRawConstantValue: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetCustomAttributesData: (() => any);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FieldToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.FieldToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum FlowControl {
        Branch = 0,
        Break = 1,
        Call = 2,
        Cond_Branch = 3,
        Meta = 4,
        Next = 5,
        Phi = 6,
        Return = 7,
        Throw = 8,
      }
      export declare class GenericTypeParameterBuilder {
        UnderlyingSystemType: System.Type;
        Assembly: System.Reflection.Assembly;
        AssemblyQualifiedName: string;
        BaseType: System.Type;
        FullName: string;
        GUID: System.Guid;
        Name: string;
        Namespace: string;
        Module: System.Reflection.Module;
        DeclaringType: System.Type;
        ReflectedType: System.Type;
        TypeHandle: System.RuntimeTypeHandle;
        ContainsGenericParameters: boolean;
        IsGenericParameter: boolean;
        IsGenericType: boolean;
        IsGenericTypeDefinition: boolean;
        GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
        GenericParameterPosition: number;
        DeclaringMethod: System.Reflection.MethodBase;
        GenericTypeParameters: System.Type[];
        DeclaredConstructors: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.ConstructorInfo]
        DeclaredEvents: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.EventInfo]
        DeclaredFields: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.FieldInfo]
        DeclaredMembers: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MemberInfo]
        DeclaredMethods: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MethodInfo]
        DeclaredNestedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
        DeclaredProperties: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.PropertyInfo]
        ImplementedInterfaces: any; // System.Collections.Generic.IEnumerable`1[System.Type]
        MemberType: System.Reflection.MemberTypes;
        StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
        TypeInitializer: System.Reflection.ConstructorInfo;
        IsNested: boolean;
        Attributes: System.Reflection.TypeAttributes;
        IsVisible: boolean;
        IsNotPublic: boolean;
        IsPublic: boolean;
        IsNestedPublic: boolean;
        IsNestedPrivate: boolean;
        IsNestedFamily: boolean;
        IsNestedAssembly: boolean;
        IsNestedFamANDAssem: boolean;
        IsNestedFamORAssem: boolean;
        IsAutoLayout: boolean;
        IsLayoutSequential: boolean;
        IsExplicitLayout: boolean;
        IsClass: boolean;
        IsInterface: boolean;
        IsValueType: boolean;
        IsAbstract: boolean;
        IsSealed: boolean;
        IsEnum: boolean;
        IsSpecialName: boolean;
        IsImport: boolean;
        IsSerializable: boolean;
        IsAnsiClass: boolean;
        IsUnicodeClass: boolean;
        IsAutoClass: boolean;
        IsArray: boolean;
        IsConstructedGenericType: boolean;
        IsByRef: boolean;
        IsPointer: boolean;
        IsPrimitive: boolean;
        IsCOMObject: boolean;
        HasElementType: boolean;
        IsContextful: boolean;
        IsMarshalByRef: boolean;
        GenericTypeArguments: System.Type[];
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsSZArray: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        SetBaseTypeConstraint: ((baseTypeConstraint: System.Type) => void);
        SetInterfaceConstraints: ((interfaceConstraints: System.Type[]) => void);
        SetGenericParameterAttributes: ((genericParameterAttributes: System.Reflection.GenericParameterAttributes) => void);
        IsSubclassOf: ((c: System.Type) => boolean);
        GetConstructors: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]) | (() => System.Reflection.ConstructorInfo[]);
        GetEvent: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo) | ((name: string) => System.Reflection.EventInfo);
        GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
        GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
        GetFields: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]) | (() => System.Reflection.FieldInfo[]);
        GetInterface: ((name: string, ignoreCase: boolean) => System.Type) | ((name: string) => System.Type);
        GetInterfaces: (() => System.Type[]);
        GetMembers: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | (() => System.Reflection.MemberInfo[]);
        GetMember: ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
        GetMethods: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
        GetNestedType: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type) | ((name: string) => System.Type);
        GetNestedTypes: ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]) | (() => System.Type[]);
        GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
        IsAssignableFrom: ((c: System.Type) => boolean) | ((typeInfo: System.Reflection.TypeInfo) => boolean);
        IsInstanceOfType: ((o: System.Object) => boolean);
        InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
        GetElementType: (() => System.Type);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
        GetGenericArguments: (() => System.Type[]);
        GetGenericTypeDefinition: (() => System.Type);
        GetGenericParameterConstraints: (() => System.Type[]);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        ToString: (() => string);
        Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
        GetHashCode: (() => number);
        MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
        MakeByRefType: (() => System.Type);
        MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
        MakePointerType: (() => System.Type);
        AsType: (() => System.Type);
        GetDeclaredEvent: ((name: string) => System.Reflection.EventInfo);
        GetDeclaredField: ((name: string) => System.Reflection.FieldInfo);
        GetDeclaredMethod: ((name: string) => System.Reflection.MethodInfo);
        GetDeclaredMethods: ((name: string) => any);
        GetDeclaredNestedType: ((name: string) => System.Reflection.TypeInfo);
        GetDeclaredProperty: ((name: string) => System.Reflection.PropertyInfo);
        GetArrayRank: (() => number);
        GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
        GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
        FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
        GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
        GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
        FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
        GetEnumNames: (() => string[]);
        GetEnumValues: (() => System.Array);
        GetEnumUnderlyingType: (() => System.Type);
        IsEnumDefined: ((value: System.Object) => boolean);
        GetEnumName: ((value: System.Object) => string);
        IsEquivalentTo: ((other: System.Type) => boolean);
        GetType: (() => System.Type) | (() => System.Type);
        GetCustomAttributesData: (() => any);
      }
      export declare class ILGenerator {
        ILOffset: number;
        BeginCatchBlock: ((exceptionType: System.Type) => void);
        BeginExceptFilterBlock: (() => void);
        BeginExceptionBlock: (() => System.Reflection.Emit.Label);
        BeginFaultBlock: (() => void);
        BeginFinallyBlock: (() => void);
        BeginScope: (() => void);
        DeclareLocal: ((localType: System.Type) => System.Reflection.Emit.LocalBuilder) | ((localType: System.Type, pinned: boolean) => System.Reflection.Emit.LocalBuilder);
        DefineLabel: (() => System.Reflection.Emit.Label);
        Emit: ((opcode: System.Reflection.Emit.OpCode) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: System.Byte) => void) | ((opcode: System.Reflection.Emit.OpCode, con: System.Reflection.ConstructorInfo) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: number) => void) | ((opcode: System.Reflection.Emit.OpCode, field: System.Reflection.FieldInfo) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: System.Int16) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: number) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: System.Int64) => void) | ((opcode: System.Reflection.Emit.OpCode, label: System.Reflection.Emit.Label) => void) | ((opcode: System.Reflection.Emit.OpCode, labels: System.Reflection.Emit.Label[]) => void) | ((opcode: System.Reflection.Emit.OpCode, local: System.Reflection.Emit.LocalBuilder) => void) | ((opcode: System.Reflection.Emit.OpCode, meth: System.Reflection.MethodInfo) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: System.SByte) => void) | ((opcode: System.Reflection.Emit.OpCode, signature: System.Reflection.Emit.SignatureHelper) => void) | ((opcode: System.Reflection.Emit.OpCode, arg: number) => void) | ((opcode: System.Reflection.Emit.OpCode, str: string) => void) | ((opcode: System.Reflection.Emit.OpCode, cls: System.Type) => void);
        EmitCall: ((opcode: System.Reflection.Emit.OpCode, methodInfo: System.Reflection.MethodInfo, optionalParameterTypes: System.Type[]) => void);
        EmitCalli: ((opcode: System.Reflection.Emit.OpCode, unmanagedCallConv: System.Runtime.InteropServices.CallingConvention, returnType: System.Type, parameterTypes: System.Type[]) => void) | ((opcode: System.Reflection.Emit.OpCode, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], optionalParameterTypes: System.Type[]) => void);
        EmitWriteLine: ((fld: System.Reflection.FieldInfo) => void) | ((localBuilder: System.Reflection.Emit.LocalBuilder) => void) | ((value: string) => void);
        EndExceptionBlock: (() => void);
        EndScope: (() => void);
        MarkLabel: ((loc: System.Reflection.Emit.Label) => void);
        MarkSequencePoint: ((document: System.Diagnostics.SymbolStore.ISymbolDocumentWriter, startLine: number, startColumn: number, endLine: number, endColumn: number) => void);
        ThrowException: ((excType: System.Type) => void);
        UsingNamespace: ((usingNamespace: string) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Label {
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.Label) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class LocalBuilder {
        LocalType: System.Type;
        IsPinned: boolean;
        LocalIndex: number;
        SetLocalSymInfo: ((name: string, startOffset: number, endOffset: number) => void) | ((name: string) => void);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class MethodBuilder {
        ContainsGenericParameters: boolean;
        InitLocals: boolean;
        MethodHandle: System.RuntimeMethodHandle;
        ReturnType: System.Type;
        ReflectedType: System.Type;
        DeclaringType: System.Type;
        Name: string;
        Attributes: System.Reflection.MethodAttributes;
        ReturnTypeCustomAttributes: System.Reflection.ICustomAttributeProvider;
        CallingConvention: System.Reflection.CallingConventions;
        Signature: string;
        IsGenericMethodDefinition: boolean;
        IsGenericMethod: boolean;
        Module: System.Reflection.Module;
        ReturnParameter: System.Reflection.ParameterInfo;
        MemberType: System.Reflection.MemberTypes;
        MethodImplementationFlags: System.Reflection.MethodImplAttributes;
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsPublic: boolean;
        IsPrivate: boolean;
        IsFamily: boolean;
        IsAssembly: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsStatic: boolean;
        IsFinal: boolean;
        IsVirtual: boolean;
        IsHideBySig: boolean;
        IsAbstract: boolean;
        IsSpecialName: boolean;
        IsConstructor: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        GetToken: (() => System.Reflection.Emit.MethodToken);
        GetBaseDefinition: (() => System.Reflection.MethodInfo);
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        GetModule: (() => System.Reflection.Module);
        CreateMethodBody: ((il: System.Byte[], count: number) => void);
        SetMethodBody: ((il: System.Byte[], maxStack: number, localSignature: System.Byte[], exceptionHandlers: any, tokenFixups: any) => void);
        Invoke: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object, parameters: System.Object[]) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetILGenerator: (() => System.Reflection.Emit.ILGenerator) | ((size: number) => System.Reflection.Emit.ILGenerator);
        DefineParameter: ((position: number, attributes: System.Reflection.ParameterAttributes, strParamName: string) => System.Reflection.Emit.ParameterBuilder);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        SetImplementationFlags: ((attributes: System.Reflection.MethodImplAttributes) => void);
        AddDeclarativeSecurity: ((action: System.Security.Permissions.SecurityAction, pset: System.Security.PermissionSet) => void);
        SetMarshal: ((unmanagedMarshal: System.Reflection.Emit.UnmanagedMarshal) => void);
        SetSymCustomAttribute: ((name: string, data: System.Byte[]) => void);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        MakeGenericMethod: ((typeArguments: System.Type[]) => System.Reflection.MethodInfo);
        GetGenericMethodDefinition: (() => System.Reflection.MethodInfo);
        GetGenericArguments: (() => System.Type[]);
        DefineGenericParameters: ((names: string[]) => System.Reflection.Emit.GenericTypeParameterBuilder[]);
        SetReturnType: ((returnType: System.Type) => void);
        SetParameters: ((parameterTypes: System.Type[]) => void);
        SetSignature: ((returnType: System.Type, returnTypeRequiredCustomModifiers: System.Type[], returnTypeOptionalCustomModifiers: System.Type[], parameterTypes: System.Type[], parameterTypeRequiredCustomModifiers: System.Type[][], parameterTypeOptionalCustomModifiers: System.Type[][]) => void);
        CreateDelegate: ((delegateType: System.Type) => System.Delegate) | ((delegateType: System.Type, target: System.Object) => System.Delegate);
        GetMethodBody: (() => System.Reflection.MethodBody);
        GetCustomAttributesData: (() => any);
        GetType: (() => System.Type);
      }
      export declare class MethodRental {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MethodToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.MethodToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ModuleBuilder {
        FullyQualifiedName: string;
        Assembly: System.Reflection.Assembly;
        Name: string;
        ScopeName: string;
        ModuleVersionId: System.Guid;
        MetadataToken: number;
        ModuleHandle: System.ModuleHandle;
        MDStreamVersion: number;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        IsTransient: (() => boolean);
        CreateGlobalFunctions: (() => void);
        DefineInitializedData: ((name: string, data: System.Byte[], attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder);
        DefineUninitializedData: ((name: string, size: number, attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder);
        DefineGlobalMethod: ((name: string, attributes: System.Reflection.MethodAttributes, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, requiredReturnTypeCustomModifiers: System.Type[], optionalReturnTypeCustomModifiers: System.Type[], parameterTypes: System.Type[], requiredParameterTypeCustomModifiers: System.Type[][], optionalParameterTypeCustomModifiers: System.Type[][]) => System.Reflection.Emit.MethodBuilder);
        DefinePInvokeMethod: ((name: string, dllName: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], nativeCallConv: System.Runtime.InteropServices.CallingConvention, nativeCharSet: System.Runtime.InteropServices.CharSet) => System.Reflection.Emit.MethodBuilder) | ((name: string, dllName: string, entryName: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], nativeCallConv: System.Runtime.InteropServices.CallingConvention, nativeCharSet: System.Runtime.InteropServices.CharSet) => System.Reflection.Emit.MethodBuilder);
        DefineType: ((name: string) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, interfaces: System.Type[]) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, typesize: number) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, packsize: System.Reflection.Emit.PackingSize) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, packingSize: System.Reflection.Emit.PackingSize, typesize: number) => System.Reflection.Emit.TypeBuilder);
        GetArrayMethod: ((arrayClass: System.Type, methodName: string, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.MethodInfo);
        DefineEnum: ((name: string, visibility: System.Reflection.TypeAttributes, underlyingType: System.Type) => System.Reflection.Emit.EnumBuilder);
        GetType: ((className: string) => System.Type) | ((className: string, ignoreCase: boolean) => System.Type) | ((className: string, throwOnError: boolean, ignoreCase: boolean) => System.Type) | (() => System.Type);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        GetSymWriter: (() => System.Diagnostics.SymbolStore.ISymbolWriter);
        DefineDocument: ((url: string, language: System.Guid, languageVendor: System.Guid, documentType: System.Guid) => System.Diagnostics.SymbolStore.ISymbolDocumentWriter);
        GetTypes: (() => System.Type[]);
        DefineResource: ((name: string, description: string, attribute: System.Reflection.ResourceAttributes) => System.Resources.IResourceWriter) | ((name: string, description: string) => System.Resources.IResourceWriter);
        DefineUnmanagedResource: ((resource: System.Byte[]) => void) | ((resourceFileName: string) => void);
        DefineManifestResource: ((name: string, stream: System.IO.Stream, attribute: System.Reflection.ResourceAttributes) => void);
        SetSymCustomAttribute: ((name: string, data: System.Byte[]) => void);
        SetUserEntryPoint: ((entryPoint: System.Reflection.MethodInfo) => void);
        GetMethodToken: ((method: System.Reflection.MethodInfo) => System.Reflection.Emit.MethodToken) | ((method: System.Reflection.MethodInfo, optionalParameterTypes: any) => System.Reflection.Emit.MethodToken);
        GetArrayMethodToken: ((arrayClass: System.Type, methodName: string, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.MethodToken);
        GetConstructorToken: ((con: System.Reflection.ConstructorInfo) => System.Reflection.Emit.MethodToken) | ((constructor: System.Reflection.ConstructorInfo, optionalParameterTypes: any) => System.Reflection.Emit.MethodToken);
        GetFieldToken: ((field: System.Reflection.FieldInfo) => System.Reflection.Emit.FieldToken);
        GetSignatureToken: ((sigBytes: System.Byte[], sigLength: number) => System.Reflection.Emit.SignatureToken) | ((sigHelper: System.Reflection.Emit.SignatureHelper) => System.Reflection.Emit.SignatureToken);
        GetStringConstant: ((str: string) => System.Reflection.Emit.StringToken);
        GetTypeToken: ((type: System.Type) => System.Reflection.Emit.TypeToken) | ((name: string) => System.Reflection.Emit.TypeToken);
        IsResource: (() => boolean);
        ResolveField: ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.FieldInfo) | ((metadataToken: number) => System.Reflection.FieldInfo);
        ResolveMember: ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.MemberInfo) | ((metadataToken: number) => System.Reflection.MemberInfo);
        ResolveMethod: ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Reflection.MethodBase) | ((metadataToken: number) => System.Reflection.MethodBase);
        ResolveString: ((metadataToken: number) => string);
        ResolveSignature: ((metadataToken: number) => System.Byte[]);
        ResolveType: ((metadataToken: number, genericTypeArguments: System.Type[], genericMethodArguments: System.Type[]) => System.Type) | ((metadataToken: number) => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
        GetFields: ((bindingFlags: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]) | (() => System.Reflection.FieldInfo[]);
        GetMethods: ((bindingFlags: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
        GetMethod: ((name: string) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        ToString: (() => string);
        FindTypes: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
        GetCustomAttributesData: (() => any);
        GetSignerCertificate: (() => System.Security.Cryptography.X509Certificates.X509Certificate);
      }
      export declare class OpCode {
        Name: string;
        Size: number;
        OpCodeType: System.Reflection.Emit.OpCodeType;
        OperandType: System.Reflection.Emit.OperandType;
        FlowControl: System.Reflection.Emit.FlowControl;
        StackBehaviourPop: System.Reflection.Emit.StackBehaviour;
        StackBehaviourPush: System.Reflection.Emit.StackBehaviour;
        Value: System.Int16;
        GetHashCode: (() => number);
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.OpCode) => boolean);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum OpCodeType {
        Annotation = 0,
        Macro = 1,
        Nternal = 2,
        Objmodel = 3,
        Prefix = 4,
        Primitive = 5,
      }
      export declare class OpCodes {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum OperandType {
        InlineBrTarget = 0,
        InlineField = 1,
        InlineI = 2,
        InlineI8 = 3,
        InlineMethod = 4,
        InlineNone = 5,
        InlinePhi = 6,
        InlineR = 7,
        InlineSig = 9,
        InlineString = 10,
        InlineSwitch = 11,
        InlineTok = 12,
        InlineType = 13,
        InlineVar = 14,
        ShortInlineBrTarget = 15,
        ShortInlineI = 16,
        ShortInlineR = 17,
        ShortInlineVar = 18,
      }
      export enum PEFileKinds {
        Dll = 1,
        ConsoleApplication = 2,
        WindowApplication = 3,
      }
      export enum PackingSize {
        Unspecified = 0,
        Size1 = 1,
        Size2 = 2,
        Size4 = 4,
        Size8 = 8,
        Size16 = 16,
        Size32 = 32,
        Size64 = 64,
        Size128 = 128,
      }
      export declare class ParameterBuilder {
        Attributes: number;
        IsIn: boolean;
        IsOut: boolean;
        IsOptional: boolean;
        Name: string;
        Position: number;
        GetToken: (() => System.Reflection.Emit.ParameterToken);
        SetConstant: ((defaultValue: System.Object) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        SetMarshal: ((unmanagedMarshal: System.Reflection.Emit.UnmanagedMarshal) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ParameterToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.ParameterToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class PropertyBuilder {
        Attributes: System.Reflection.PropertyAttributes;
        CanRead: boolean;
        CanWrite: boolean;
        DeclaringType: System.Type;
        Name: string;
        PropertyToken: System.Reflection.Emit.PropertyToken;
        PropertyType: System.Type;
        ReflectedType: System.Type;
        Module: System.Reflection.Module;
        GetMethod: System.Reflection.MethodInfo;
        SetMethod: System.Reflection.MethodInfo;
        IsSpecialName: boolean;
        MemberType: System.Reflection.MemberTypes;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        AddOtherMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        GetAccessors: ((nonPublic: boolean) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetGetMethod: ((nonPublic: boolean) => System.Reflection.MethodInfo) | (() => System.Reflection.MethodInfo);
        GetIndexParameters: (() => System.Reflection.ParameterInfo[]);
        GetSetMethod: ((nonPublic: boolean) => System.Reflection.MethodInfo) | (() => System.Reflection.MethodInfo);
        GetValue: ((obj: System.Object, index: System.Object[]) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((obj: System.Object) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        SetConstant: ((defaultValue: System.Object) => void);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        SetGetMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        SetSetMethod: ((mdBuilder: System.Reflection.Emit.MethodBuilder) => void);
        SetValue: ((obj: System.Object, value: System.Object, index: System.Object[]) => void) | ((obj: System.Object, value: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => void) | ((obj: System.Object, value: System.Object) => void);
        GetOptionalCustomModifiers: (() => System.Type[]);
        GetRequiredCustomModifiers: (() => System.Type[]);
        GetConstantValue: (() => System.Object);
        GetRawConstantValue: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetCustomAttributesData: (() => any);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PropertyToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.PropertyToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class SignatureHelper {
        AddArguments: ((argumentsCS: System.Type[], requiredCustomModifiers: System.Type[][], optionalCustomModifiers: System.Type[][]) => void);
        AddArgument: ((argument: System.Type, pinned: boolean) => void) | ((argument: System.Type, requiredCustomModifiers: System.Type[], optionalCustomModifiers: System.Type[]) => void) | ((clsArgument: System.Type) => void);
        AddSentinel: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetSignature: (() => System.Byte[]);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class SignatureToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.SignatureToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum StackBehaviour {
        Pop0 = 0,
        Pop1 = 1,
        Pop1_pop1 = 2,
        Popi = 3,
        Popi_pop1 = 4,
        Popi_popi = 5,
        Popi_popi8 = 6,
        Popi_popi_popi = 7,
        Popi_popr4 = 8,
        Popi_popr8 = 9,
        Popref = 10,
        Popref_pop1 = 11,
        Popref_popi = 12,
        Popref_popi_popi = 13,
        Popref_popi_popi8 = 14,
        Popref_popi_popr4 = 15,
        Popref_popi_popr8 = 16,
        Popref_popi_popref = 17,
        Push0 = 18,
        Push1 = 19,
        Push1_push1 = 20,
        Pushi = 21,
        Pushi8 = 22,
        Pushr4 = 23,
        Pushr8 = 24,
        Pushref = 25,
        Varpop = 26,
        Varpush = 27,
        Popref_popi_pop1 = 28,
      }
      export declare class StringToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.StringToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class TypeBuilder {
        Assembly: System.Reflection.Assembly;
        AssemblyQualifiedName: string;
        BaseType: System.Type;
        DeclaringType: System.Type;
        UnderlyingSystemType: System.Type;
        FullName: string;
        GUID: System.Guid;
        Module: System.Reflection.Module;
        Name: string;
        Namespace: string;
        PackingSize: System.Reflection.Emit.PackingSize;
        Size: number;
        ReflectedType: System.Type;
        TypeHandle: System.RuntimeTypeHandle;
        TypeToken: System.Reflection.Emit.TypeToken;
        ContainsGenericParameters: boolean;
        IsGenericParameter: boolean;
        GenericParameterAttributes: System.Reflection.GenericParameterAttributes;
        IsGenericTypeDefinition: boolean;
        IsGenericType: boolean;
        GenericParameterPosition: number;
        DeclaringMethod: System.Reflection.MethodBase;
        IsConstructedGenericType: boolean;
        GenericTypeParameters: System.Type[];
        DeclaredConstructors: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.ConstructorInfo]
        DeclaredEvents: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.EventInfo]
        DeclaredFields: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.FieldInfo]
        DeclaredMembers: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MemberInfo]
        DeclaredMethods: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.MethodInfo]
        DeclaredNestedTypes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.TypeInfo]
        DeclaredProperties: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.PropertyInfo]
        ImplementedInterfaces: any; // System.Collections.Generic.IEnumerable`1[System.Type]
        MemberType: System.Reflection.MemberTypes;
        StructLayoutAttribute: any; // System.Runtime.InteropServices.StructLayoutAttribute
        TypeInitializer: System.Reflection.ConstructorInfo;
        IsNested: boolean;
        Attributes: System.Reflection.TypeAttributes;
        IsVisible: boolean;
        IsNotPublic: boolean;
        IsPublic: boolean;
        IsNestedPublic: boolean;
        IsNestedPrivate: boolean;
        IsNestedFamily: boolean;
        IsNestedAssembly: boolean;
        IsNestedFamANDAssem: boolean;
        IsNestedFamORAssem: boolean;
        IsAutoLayout: boolean;
        IsLayoutSequential: boolean;
        IsExplicitLayout: boolean;
        IsClass: boolean;
        IsInterface: boolean;
        IsValueType: boolean;
        IsAbstract: boolean;
        IsSealed: boolean;
        IsEnum: boolean;
        IsSpecialName: boolean;
        IsImport: boolean;
        IsSerializable: boolean;
        IsAnsiClass: boolean;
        IsUnicodeClass: boolean;
        IsAutoClass: boolean;
        IsArray: boolean;
        IsByRef: boolean;
        IsPointer: boolean;
        IsPrimitive: boolean;
        IsCOMObject: boolean;
        HasElementType: boolean;
        IsContextful: boolean;
        IsMarshalByRef: boolean;
        GenericTypeArguments: System.Type[];
        IsSecurityCritical: boolean;
        IsSecuritySafeCritical: boolean;
        IsSecurityTransparent: boolean;
        IsSZArray: boolean;
        CustomAttributes: any; // System.Collections.Generic.IEnumerable`1[System.Reflection.CustomAttributeData]
        MetadataToken: number;
        IsSubclassOf: ((c: System.Type) => boolean);
        AddDeclarativeSecurity: ((action: System.Security.Permissions.SecurityAction, pset: System.Security.PermissionSet) => void);
        AddInterfaceImplementation: ((interfaceType: System.Type) => void);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        DefineNestedType: ((name: string) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, interfaces: System.Type[]) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, typeSize: number) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, packSize: System.Reflection.Emit.PackingSize) => System.Reflection.Emit.TypeBuilder) | ((name: string, attr: System.Reflection.TypeAttributes, parent: System.Type, packSize: System.Reflection.Emit.PackingSize, typeSize: number) => System.Reflection.Emit.TypeBuilder);
        DefineConstructor: ((attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, parameterTypes: System.Type[]) => System.Reflection.Emit.ConstructorBuilder) | ((attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, parameterTypes: System.Type[], requiredCustomModifiers: System.Type[][], optionalCustomModifiers: System.Type[][]) => System.Reflection.Emit.ConstructorBuilder);
        DefineDefaultConstructor: ((attributes: System.Reflection.MethodAttributes) => System.Reflection.Emit.ConstructorBuilder);
        DefineMethod: ((name: string, attributes: System.Reflection.MethodAttributes, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, returnTypeRequiredCustomModifiers: System.Type[], returnTypeOptionalCustomModifiers: System.Type[], parameterTypes: System.Type[], parameterTypeRequiredCustomModifiers: System.Type[][], parameterTypeOptionalCustomModifiers: System.Type[][]) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes) => System.Reflection.Emit.MethodBuilder) | ((name: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions) => System.Reflection.Emit.MethodBuilder);
        DefinePInvokeMethod: ((name: string, dllName: string, entryName: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], nativeCallConv: System.Runtime.InteropServices.CallingConvention, nativeCharSet: System.Runtime.InteropServices.CharSet) => System.Reflection.Emit.MethodBuilder) | ((name: string, dllName: string, entryName: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, returnTypeRequiredCustomModifiers: System.Type[], returnTypeOptionalCustomModifiers: System.Type[], parameterTypes: System.Type[], parameterTypeRequiredCustomModifiers: System.Type[][], parameterTypeOptionalCustomModifiers: System.Type[][], nativeCallConv: System.Runtime.InteropServices.CallingConvention, nativeCharSet: System.Runtime.InteropServices.CharSet) => System.Reflection.Emit.MethodBuilder) | ((name: string, dllName: string, attributes: System.Reflection.MethodAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[], nativeCallConv: System.Runtime.InteropServices.CallingConvention, nativeCharSet: System.Runtime.InteropServices.CharSet) => System.Reflection.Emit.MethodBuilder);
        DefineMethodOverride: ((methodInfoBody: System.Reflection.MethodInfo, methodInfoDeclaration: System.Reflection.MethodInfo) => void);
        DefineField: ((fieldName: string, type: System.Type, attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder) | ((fieldName: string, type: System.Type, requiredCustomModifiers: System.Type[], optionalCustomModifiers: System.Type[], attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder);
        DefineProperty: ((name: string, attributes: System.Reflection.PropertyAttributes, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.PropertyBuilder) | ((name: string, attributes: System.Reflection.PropertyAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, parameterTypes: System.Type[]) => System.Reflection.Emit.PropertyBuilder) | ((name: string, attributes: System.Reflection.PropertyAttributes, returnType: System.Type, returnTypeRequiredCustomModifiers: System.Type[], returnTypeOptionalCustomModifiers: System.Type[], parameterTypes: System.Type[], parameterTypeRequiredCustomModifiers: System.Type[][], parameterTypeOptionalCustomModifiers: System.Type[][]) => System.Reflection.Emit.PropertyBuilder) | ((name: string, attributes: System.Reflection.PropertyAttributes, callingConvention: System.Reflection.CallingConventions, returnType: System.Type, returnTypeRequiredCustomModifiers: System.Type[], returnTypeOptionalCustomModifiers: System.Type[], parameterTypes: System.Type[], parameterTypeRequiredCustomModifiers: System.Type[][], parameterTypeOptionalCustomModifiers: System.Type[][]) => System.Reflection.Emit.PropertyBuilder);
        DefineTypeInitializer: (() => System.Reflection.Emit.ConstructorBuilder);
        CreateType: (() => System.Type);
        CreateTypeInfo: (() => System.Reflection.TypeInfo);
        GetConstructors: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]) | (() => System.Reflection.ConstructorInfo[]);
        GetElementType: (() => System.Type);
        GetEvent: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo) | ((name: string) => System.Reflection.EventInfo);
        GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
        GetField: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo) | ((name: string) => System.Reflection.FieldInfo);
        GetFields: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]) | (() => System.Reflection.FieldInfo[]);
        GetInterface: ((name: string, ignoreCase: boolean) => System.Type) | ((name: string) => System.Type);
        GetInterfaces: (() => System.Type[]);
        GetMember: ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
        GetMembers: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | (() => System.Reflection.MemberInfo[]);
        GetMethods: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]) | (() => System.Reflection.MethodInfo[]);
        GetNestedType: ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type) | ((name: string) => System.Type);
        GetNestedTypes: ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]) | (() => System.Type[]);
        GetProperties: ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]) | (() => System.Reflection.PropertyInfo[]);
        InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object);
        MakeArrayType: (() => System.Type) | ((rank: number) => System.Type);
        MakeByRefType: (() => System.Type);
        MakeGenericType: ((typeArguments: System.Type[]) => System.Type);
        MakePointerType: (() => System.Type);
        SetCustomAttribute: ((customBuilder: System.Reflection.Emit.CustomAttributeBuilder) => void) | ((con: System.Reflection.ConstructorInfo, binaryAttribute: System.Byte[]) => void);
        DefineEvent: ((name: string, attributes: System.Reflection.EventAttributes, eventtype: System.Type) => System.Reflection.Emit.EventBuilder);
        DefineInitializedData: ((name: string, data: System.Byte[], attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder);
        DefineUninitializedData: ((name: string, size: number, attributes: System.Reflection.FieldAttributes) => System.Reflection.Emit.FieldBuilder);
        SetParent: ((parent: System.Type) => void);
        GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
        ToString: (() => string);
        IsAssignableFrom: ((c: System.Type) => boolean) | ((typeInfo: System.Reflection.TypeInfo) => boolean);
        IsCreated: (() => boolean);
        GetGenericArguments: (() => System.Type[]);
        GetGenericTypeDefinition: (() => System.Type);
        DefineGenericParameters: ((names: string[]) => System.Reflection.Emit.GenericTypeParameterBuilder[]);
        AsType: (() => System.Type);
        GetDeclaredEvent: ((name: string) => System.Reflection.EventInfo);
        GetDeclaredField: ((name: string) => System.Reflection.FieldInfo);
        GetDeclaredMethod: ((name: string) => System.Reflection.MethodInfo);
        GetDeclaredMethods: ((name: string) => any);
        GetDeclaredNestedType: ((name: string) => System.Reflection.TypeInfo);
        GetDeclaredProperty: ((name: string) => System.Reflection.PropertyInfo);
        GetArrayRank: (() => number);
        GetConstructor: ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((types: System.Type[]) => System.Reflection.ConstructorInfo);
        GetMethod: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string) => System.Reflection.MethodInfo);
        FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
        GetProperty: ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string) => System.Reflection.PropertyInfo);
        GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
        FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
        GetGenericParameterConstraints: (() => System.Type[]);
        GetEnumNames: (() => string[]);
        GetEnumValues: (() => System.Array);
        GetEnumUnderlyingType: (() => System.Type);
        IsEnumDefined: ((value: System.Object) => boolean);
        GetEnumName: ((value: System.Object) => string);
        IsInstanceOfType: ((o: System.Object) => boolean);
        IsEquivalentTo: ((other: System.Type) => boolean);
        Equals: ((o: System.Object) => boolean) | ((o: System.Type) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type) | (() => System.Type);
        GetCustomAttributesData: (() => any);
      }
      export declare class TypeToken {
        Token: number;
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Reflection.Emit.TypeToken) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class UnmanagedMarshal {
        BaseType: System.Runtime.InteropServices.UnmanagedType;
        ElementCount: number;
        GetUnmanagedType: System.Runtime.InteropServices.UnmanagedType;
        IIDGuid: System.Guid;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace Metadata {
      export declare class AssemblyExtensions {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Resources {
    export declare class IResourceReader {
      Close: (() => void);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
    }
    export declare class IResourceWriter {
      AddResource: ((name: string, value: string) => void) | ((name: string, value: System.Object) => void) | ((name: string, value: System.Byte[]) => void);
      Close: (() => void);
      Generate: (() => void);
    }
    export declare class MissingManifestResourceException {
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class MissingSatelliteAssemblyException {
      constructor();
      constructor(message: string);
      constructor(message: string, cultureName: string);
      constructor(message: string, inner: System.Exception);
      CultureName: string;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class ResourceManager {
      constructor(baseName: string, assembly: System.Reflection.Assembly);
      constructor(baseName: string, assembly: System.Reflection.Assembly, usingResourceSet: System.Type);
      constructor(resourceSource: System.Type);
      BaseName: string;
      IgnoreCase: boolean;
      ResourceSetType: System.Type;
      ReleaseAllResources: (() => void);
      GetResourceSet: ((culture: System.Globalization.CultureInfo, createIfNotExists: boolean, tryParents: boolean) => System.Resources.ResourceSet);
      GetString: ((name: string) => string) | ((name: string, culture: System.Globalization.CultureInfo) => string);
      GetObject: ((name: string) => System.Object) | ((name: string, culture: System.Globalization.CultureInfo) => System.Object);
      GetStream: ((name: string) => System.IO.UnmanagedMemoryStream) | ((name: string, culture: System.Globalization.CultureInfo) => System.IO.UnmanagedMemoryStream);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ResourceReader {
      constructor(fileName: string);
      constructor(stream: System.IO.Stream);
      Close: (() => void);
      Dispose: (() => void);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ResourceSet {
      constructor(fileName: string);
      constructor(stream: System.IO.Stream);
      constructor(reader: System.Resources.IResourceReader);
      Close: (() => void);
      Dispose: (() => void);
      GetDefaultReader: (() => System.Type);
      GetDefaultWriter: (() => System.Type);
      GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
      GetString: ((name: string) => string) | ((name: string, ignoreCase: boolean) => string);
      GetObject: ((name: string) => System.Object) | ((name: string, ignoreCase: boolean) => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ResourceWriter {
      constructor(fileName: string);
      constructor(stream: System.IO.Stream);
      TypeNameConverter: any; // System.Func`2[System.Type,System.String]
      AddResource: ((name: string, value: string) => void) | ((name: string, value: System.Object) => void) | ((name: string, value: System.IO.Stream) => void) | ((name: string, value: System.IO.Stream, closeAfterWrite: boolean) => void) | ((name: string, value: System.Byte[]) => void);
      AddResourceData: ((name: string, typeName: string, serializedData: System.Byte[]) => void);
      Close: (() => void);
      Dispose: (() => void);
      Generate: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum UltimateResourceFallbackLocation {
      MainAssembly = 0,
      Satellite = 1,
    }
  }
  export namespace Runtime {
    export enum GCLargeObjectHeapCompactionMode {
      Default = 1,
      CompactOnce = 2,
    }
    export enum GCLatencyMode {
      Batch = 0,
      Interactive = 1,
      LowLatency = 2,
      SustainedLowLatency = 3,
      NoGCRegion = 4,
    }
    export declare class GCSettings {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class MemoryFailPoint {
      constructor(sizeInMegabytes: number);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ProfileOptimization {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export namespace CompilerServices {
      export declare class ITuple {
        Length: number;
      }
      export declare class RuntimeFeature {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ContractHelper {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsyncVoidMethodBuilder {
        SetStateMachine: ((stateMachine: System.Runtime.CompilerServices.IAsyncStateMachine) => void);
        SetResult: (() => void);
        SetException: ((exception: System.Exception) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class AsyncTaskMethodBuilder {
        Task: System.Threading.Tasks.Task;
        SetStateMachine: ((stateMachine: System.Runtime.CompilerServices.IAsyncStateMachine) => void);
        SetResult: (() => void);
        SetException: ((exception: System.Exception) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class FormattableStringFactory {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IAsyncStateMachine {
        MoveNext: (() => void);
        SetStateMachine: ((stateMachine: System.Runtime.CompilerServices.IAsyncStateMachine) => void);
      }
      export declare class INotifyCompletion {
        OnCompleted: ((continuation: System.Action) => void);
      }
      export declare class ICriticalNotifyCompletion {
        UnsafeOnCompleted: ((continuation: System.Action) => void);
      }
      export declare class RuntimeWrappedException {
        WrappedException: System.Object;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class TaskAwaiter {
        IsCompleted: boolean;
        OnCompleted: ((continuation: System.Action) => void);
        UnsafeOnCompleted: ((continuation: System.Action) => void);
        GetResult: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ConfiguredTaskAwaitable {
        GetAwaiter: (() => System.Runtime.CompilerServices.ConfiguredTaskAwaitable_ConfiguredTaskAwaiter);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ConfiguredTaskAwaitable_ConfiguredTaskAwaiter {
        IsCompleted: boolean;
        OnCompleted: ((continuation: System.Action) => void);
        UnsafeOnCompleted: ((continuation: System.Action) => void);
        GetResult: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class YieldAwaitable {
        GetAwaiter: (() => System.Runtime.CompilerServices.YieldAwaitable_YieldAwaiter);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class YieldAwaitable_YieldAwaiter {
        IsCompleted: boolean;
        OnCompleted: ((continuation: System.Action) => void);
        UnsafeOnCompleted: ((continuation: System.Action) => void);
        GetResult: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum LoadHint {
        Default = 0,
        Always = 1,
        Sometimes = 2,
      }
      export declare class CallConvCdecl {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CallConvStdcall {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CallConvThiscall {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CallConvFastcall {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CompilationRelaxations {
        NoStringInterning = 8,
      }
      export declare class CompilerMarshalOverride {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsBoxed {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsByValue {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsConst {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsCopyConstructed {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsExplicitlyDereferenced {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsImplicitlyDereferenced {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsJitIntrinsic {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsLong {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsPinned {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsSignUnspecifiedByte {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsUdtReturn {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IsVolatile {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum MethodImplOptions {
        Unmanaged = 4,
        ForwardRef = 16,
        PreserveSig = 128,
        InternalCall = 4096,
        Synchronized = 32,
        NoInlining = 8,
        AggressiveInlining = 256,
        NoOptimization = 64,
      }
      export enum MethodCodeType {
        IL = 0,
        Native = 1,
        OPTIL = 2,
        Runtime = 3,
      }
      export declare class RuntimeHelpers {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RuntimeHelpers_TryCode {
        constructor(object: System.Object, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: System.Object;
        Invoke: ((userData: System.Object) => void);
        BeginInvoke: ((userData: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
        EndInvoke: ((result: System.IAsyncResult) => void);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => System.Delegate[]);
        DynamicInvoke: ((args: System.Object[]) => System.Object);
        Clone: (() => System.Object);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RuntimeHelpers_CleanupCode {
        constructor(object: System.Object, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: System.Object;
        Invoke: ((userData: System.Object, exceptionThrown: boolean) => void);
        BeginInvoke: ((userData: System.Object, exceptionThrown: boolean, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
        EndInvoke: ((result: System.IAsyncResult) => void);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => System.Delegate[]);
        DynamicInvoke: ((args: System.Object[]) => System.Object);
        Clone: (() => System.Object);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace ConstrainedExecution {
      export declare class CriticalFinalizerObject {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum Consistency {
        MayCorruptProcess = 0,
        MayCorruptAppDomain = 1,
        MayCorruptInstance = 2,
        WillNotCorruptState = 3,
      }
      export enum Cer {
        None = 0,
        MayFail = 1,
        Success = 2,
      }
    }
    export namespace DesignerServices {
      export declare class WindowsRuntimeDesignerContext {
        constructor(paths: any, name: string);
        Name: string;
        GetAssembly: ((assemblyName: string) => System.Reflection.Assembly);
        GetType: ((typeName: string) => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
      }
    }
    export namespace ExceptionServices {
      export declare class FirstChanceExceptionEventArgs {
        constructor(exception: System.Exception);
        Exception: System.Exception;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ExceptionDispatchInfo {
        SourceException: System.Exception;
        Throw: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace Hosting {
      export declare class ActivationArguments {
        constructor(activationData: System.ActivationContext);
        constructor(applicationIdentity: System.ApplicationIdentity);
        constructor(activationContext: System.ActivationContext, activationData: string[]);
        constructor(applicationIdentity: System.ApplicationIdentity, activationData: string[]);
        ActivationContext: System.ActivationContext;
        ActivationData: string[];
        ApplicationIdentity: System.ApplicationIdentity;
        Clone: (() => System.Security.Policy.EvidenceBase);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ApplicationActivator {
        constructor();
        CreateInstance: ((activationContext: System.ActivationContext) => System.Runtime.Remoting.ObjectHandle) | ((activationContext: System.ActivationContext, activationCustomData: string[]) => System.Runtime.Remoting.ObjectHandle);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace InteropServices {
      export enum Architecture {
        X86 = 0,
        X64 = 1,
        Arm = 2,
        Arm64 = 3,
      }
      export declare class OSPlatform {
        Equals: ((other: System.Runtime.InteropServices.OSPlatform) => boolean) | ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ArrayWithOffset {
        constructor(array: System.Object, offset: number);
        GetArray: (() => System.Object);
        GetOffset: (() => number);
        GetHashCode: (() => number);
        Equals: ((obj: System.Object) => boolean) | ((obj: System.Runtime.InteropServices.ArrayWithOffset) => boolean);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum ComInterfaceType {
        InterfaceIsDual = 0,
        InterfaceIsIUnknown = 1,
        InterfaceIsIDispatch = 2,
        InterfaceIsIInspectable = 3,
      }
      export enum ClassInterfaceType {
        None = 0,
        AutoDispatch = 1,
        AutoDual = 2,
      }
      export enum IDispatchImplType {
        SystemDefinedImpl = 0,
        InternalImpl = 1,
        CompatibleImpl = 2,
      }
      export enum TypeLibTypeFlags {
        FAppObject = 1,
        FCanCreate = 2,
        FLicensed = 4,
        FPreDeclId = 8,
        FHidden = 16,
        FControl = 32,
        FDual = 64,
        FNonExtensible = 128,
        FOleAutomation = 256,
        FRestricted = 512,
        FAggregatable = 1024,
        FReplaceable = 2048,
        FDispatchable = 4096,
        FReverseBind = 8192,
      }
      export enum TypeLibFuncFlags {
        FRestricted = 1,
        FSource = 2,
        FBindable = 4,
        FRequestEdit = 8,
        FDisplayBind = 16,
        FDefaultBind = 32,
        FHidden = 64,
        FUsesGetLastError = 128,
        FDefaultCollelem = 256,
        FUiDefault = 512,
        FNonBrowsable = 1024,
        FReplaceable = 2048,
        FImmediateBind = 4096,
      }
      export enum TypeLibVarFlags {
        FReadOnly = 1,
        FSource = 2,
        FBindable = 4,
        FRequestEdit = 8,
        FDisplayBind = 16,
        FDefaultBind = 32,
        FHidden = 64,
        FRestricted = 128,
        FDefaultCollelem = 256,
        FUiDefault = 512,
        FNonBrowsable = 1024,
        FReplaceable = 2048,
        FImmediateBind = 4096,
      }
      export enum VarEnum {
        VT_EMPTY = 0,
        VT_NULL = 1,
        VT_I2 = 2,
        VT_I4 = 3,
        VT_R4 = 4,
        VT_R8 = 5,
        VT_CY = 6,
        VT_DATE = 7,
        VT_BSTR = 8,
        VT_DISPATCH = 9,
        VT_ERROR = 10,
        VT_BOOL = 11,
        VT_VARIANT = 12,
        VT_UNKNOWN = 13,
        VT_DECIMAL = 14,
        VT_I1 = 16,
        VT_UI1 = 17,
        VT_UI2 = 18,
        VT_UI4 = 19,
        VT_I8 = 20,
        VT_UI8 = 21,
        VT_INT = 22,
        VT_UINT = 23,
        VT_VOID = 24,
        VT_HRESULT = 25,
        VT_PTR = 26,
        VT_SAFEARRAY = 27,
        VT_CARRAY = 28,
        VT_USERDEFINED = 29,
        VT_LPSTR = 30,
        VT_LPWSTR = 31,
        VT_RECORD = 36,
        VT_FILETIME = 64,
        VT_BLOB = 65,
        VT_STREAM = 66,
        VT_STORAGE = 67,
        VT_STREAMED_OBJECT = 68,
        VT_STORED_OBJECT = 69,
        VT_BLOB_OBJECT = 70,
        VT_CF = 71,
        VT_CLSID = 72,
        VT_VECTOR = 4096,
        VT_ARRAY = 8192,
        VT_BYREF = 16384,
      }
      export enum UnmanagedType {
        Bool = 2,
        I1 = 3,
        U1 = 4,
        I2 = 5,
        U2 = 6,
        I4 = 7,
        U4 = 8,
        I8 = 9,
        U8 = 10,
        R4 = 11,
        R8 = 12,
        Currency = 15,
        BStr = 19,
        LPStr = 20,
        LPWStr = 21,
        LPTStr = 22,
        ByValTStr = 23,
        IUnknown = 25,
        IDispatch = 26,
        Struct = 27,
        Interface = 28,
        SafeArray = 29,
        ByValArray = 30,
        SysInt = 31,
        SysUInt = 32,
        VBByRefStr = 34,
        AnsiBStr = 35,
        TBStr = 36,
        VariantBool = 37,
        FunctionPtr = 38,
        AsAny = 40,
        LPArray = 42,
        LPStruct = 43,
        CustomMarshaler = 44,
        Error = 45,
        IInspectable = 46,
        HString = 47,
        LPUTF8Str = 48,
      }
      export enum DllImportSearchPath {
        UseDllDirectoryForDependencies = 256,
        ApplicationDirectory = 512,
        UserDirectories = 1024,
        System32 = 2048,
        SafeDirectories = 4096,
        AssemblyDirectory = 2,
        LegacyBehavior = 0,
      }
      export declare class BStrWrapper {
        constructor(value: string);
        constructor(value: System.Object);
        WrappedObject: string;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CallingConvention {
        Winapi = 1,
        Cdecl = 2,
        StdCall = 3,
        ThisCall = 4,
        FastCall = 5,
      }
      export enum CharSet {
        None = 1,
        Ansi = 2,
        Unicode = 3,
        Auto = 4,
      }
      export declare class COMException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        constructor(message: string, errorCode: number);
        ErrorCode: number;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        ToString: (() => string);
        GetBaseException: (() => System.Exception);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export enum ComMemberType {
        Method = 0,
        PropGet = 1,
        PropSet = 2,
      }
      export declare class CriticalHandle {
        IsClosed: boolean;
        IsInvalid: boolean;
        Close: (() => void);
        Dispose: (() => void);
        SetHandleAsInvalid: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CurrencyWrapper {
        constructor(obj: System.Decimal);
        constructor(obj: System.Object);
        WrappedObject: System.Decimal;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DispatchWrapper {
        constructor(obj: System.Object);
        WrappedObject: System.Object;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ErrorWrapper {
        constructor(errorCode: number);
        constructor(errorCode: System.Object);
        constructor(e: System.Exception);
        ErrorCode: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ExternalException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        constructor(message: string, errorCode: number);
        ErrorCode: number;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        ToString: (() => string);
        GetBaseException: (() => System.Exception);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class HandleRef {
        constructor(wrapper: System.Object, handle: System.IntPtr);
        Wrapper: System.Object;
        Handle: System.IntPtr;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ICustomAdapter {
        GetUnderlyingObject: (() => System.Object);
      }
      export declare class ICustomFactory {
        CreateInstance: ((serverType: System.Type) => System.MarshalByRefObject);
      }
      export declare class ICustomMarshaler {
        MarshalNativeToManaged: ((pNativeData: System.IntPtr) => System.Object);
        MarshalManagedToNative: ((ManagedObj: System.Object) => System.IntPtr);
        CleanUpNativeData: ((pNativeData: System.IntPtr) => void);
        CleanUpManagedData: ((ManagedObj: System.Object) => void);
        GetNativeDataSize: (() => number);
      }
      export enum CustomQueryInterfaceResult {
        Handled = 0,
        NotHandled = 1,
        Failed = 2,
      }
      export declare class ICustomQueryInterface {
      }
      export declare class InvalidComObjectException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class InvalidOleVariantTypeException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export enum AssemblyRegistrationFlags {
        None = 0,
        SetCodeBase = 1,
      }
      export declare class IRegistrationServices {
        RegisterAssembly: ((assembly: System.Reflection.Assembly, flags: System.Runtime.InteropServices.AssemblyRegistrationFlags) => boolean);
        UnregisterAssembly: ((assembly: System.Reflection.Assembly) => boolean);
        GetRegistrableTypesInAssembly: ((assembly: System.Reflection.Assembly) => System.Type[]);
        GetProgIdForType: ((type: System.Type) => string);
        GetManagedCategoryGuid: (() => System.Guid);
        TypeRequiresRegistration: ((type: System.Type) => boolean);
        TypeRepresentsComType: ((type: System.Type) => boolean);
      }
      export enum LayoutKind {
        Sequential = 0,
        Explicit = 2,
        Auto = 3,
      }
      export declare class MarshalDirectiveException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class ObjectCreationDelegate {
        constructor(object: System.Object, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: System.Object;
        Invoke: ((aggregator: System.IntPtr) => System.IntPtr);
        BeginInvoke: ((aggregator: System.IntPtr, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
        EndInvoke: ((result: System.IAsyncResult) => System.IntPtr);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetInvocationList: (() => System.Delegate[]);
        DynamicInvoke: ((args: System.Object[]) => System.Object);
        Clone: (() => System.Object);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RuntimeEnvironment {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SafeArrayRankMismatchException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class SafeArrayTypeMismatchException {
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
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class SafeHandle {
        IsClosed: boolean;
        IsInvalid: boolean;
        DangerousGetHandle: (() => System.IntPtr);
        Close: (() => void);
        Dispose: (() => void);
        SetHandleAsInvalid: (() => void);
        DangerousRelease: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SEHException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        ErrorCode: number;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        CanResume: (() => boolean);
        ToString: (() => string);
        GetBaseException: (() => System.Exception);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class CONNECTDATA {
        pUnk: System.Object;
        dwCookie: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class UCOMIEnumConnections {
        Skip: ((celt: number) => number);
        Reset: (() => void);
      }
      export enum TYPEKIND {
        TKIND_ENUM = 0,
        TKIND_RECORD = 1,
        TKIND_MODULE = 2,
        TKIND_INTERFACE = 3,
        TKIND_DISPATCH = 4,
        TKIND_COCLASS = 5,
        TKIND_ALIAS = 6,
        TKIND_UNION = 7,
        TKIND_MAX = 8,
      }
      export enum TYPEFLAGS {
        TYPEFLAG_FAPPOBJECT = 1,
        TYPEFLAG_FCANCREATE = 2,
        TYPEFLAG_FLICENSED = 4,
        TYPEFLAG_FPREDECLID = 8,
        TYPEFLAG_FHIDDEN = 16,
        TYPEFLAG_FCONTROL = 32,
        TYPEFLAG_FDUAL = 64,
        TYPEFLAG_FNONEXTENSIBLE = 128,
        TYPEFLAG_FOLEAUTOMATION = 256,
        TYPEFLAG_FRESTRICTED = 512,
        TYPEFLAG_FAGGREGATABLE = 1024,
        TYPEFLAG_FREPLACEABLE = 2048,
        TYPEFLAG_FDISPATCHABLE = 4096,
        TYPEFLAG_FREVERSEBIND = 8192,
        TYPEFLAG_FPROXY = 16384,
      }
      export enum IMPLTYPEFLAGS {
        IMPLTYPEFLAG_FDEFAULT = 1,
        IMPLTYPEFLAG_FSOURCE = 2,
        IMPLTYPEFLAG_FRESTRICTED = 4,
        IMPLTYPEFLAG_FDEFAULTVTABLE = 8,
      }
      export declare class TYPEATTR {
        guid: System.Guid;
        lcid: number;
        dwReserved: number;
        memidConstructor: number;
        memidDestructor: number;
        lpstrSchema: System.IntPtr;
        cbSizeInstance: number;
        typekind: System.Runtime.InteropServices.TYPEKIND;
        cFuncs: System.Int16;
        cVars: System.Int16;
        cImplTypes: System.Int16;
        cbSizeVft: System.Int16;
        cbAlignment: System.Int16;
        wTypeFlags: System.Runtime.InteropServices.TYPEFLAGS;
        wMajorVerNum: System.Int16;
        wMinorVerNum: System.Int16;
        tdescAlias: System.Runtime.InteropServices.TYPEDESC;
        idldescType: System.Runtime.InteropServices.IDLDESC;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class FUNCDESC {
        memid: number;
        lprgscode: System.IntPtr;
        lprgelemdescParam: System.IntPtr;
        funckind: System.Runtime.InteropServices.FUNCKIND;
        invkind: System.Runtime.InteropServices.INVOKEKIND;
        callconv: System.Runtime.InteropServices.CALLCONV;
        cParams: System.Int16;
        cParamsOpt: System.Int16;
        oVft: System.Int16;
        cScodes: System.Int16;
        elemdescFunc: System.Runtime.InteropServices.ELEMDESC;
        wFuncFlags: System.Int16;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum IDLFLAG {
        IDLFLAG_NONE = 0,
        IDLFLAG_FIN = 1,
        IDLFLAG_FOUT = 2,
        IDLFLAG_FLCID = 4,
        IDLFLAG_FRETVAL = 8,
      }
      export declare class IDLDESC {
        dwReserved: number;
        wIDLFlags: System.Runtime.InteropServices.IDLFLAG;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum PARAMFLAG {
        PARAMFLAG_NONE = 0,
        PARAMFLAG_FIN = 1,
        PARAMFLAG_FOUT = 2,
        PARAMFLAG_FLCID = 4,
        PARAMFLAG_FRETVAL = 8,
        PARAMFLAG_FOPT = 16,
        PARAMFLAG_FHASDEFAULT = 32,
        PARAMFLAG_FHASCUSTDATA = 64,
      }
      export declare class PARAMDESC {
        lpVarValue: System.IntPtr;
        wParamFlags: System.Runtime.InteropServices.PARAMFLAG;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class TYPEDESC {
        lpValue: System.IntPtr;
        vt: System.Int16;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ELEMDESC {
        tdesc: System.Runtime.InteropServices.TYPEDESC;
        desc: System.Runtime.InteropServices.ELEMDESC_DESCUNION;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ELEMDESC_DESCUNION {
        idldesc: System.Runtime.InteropServices.IDLDESC;
        paramdesc: System.Runtime.InteropServices.PARAMDESC;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class VARDESC {
        memid: number;
        lpstrSchema: string;
        elemdescVar: System.Runtime.InteropServices.ELEMDESC;
        wVarFlags: System.Int16;
        varkind: System.Runtime.InteropServices.VarEnum;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class VARDESC_DESCUNION {
        oInst: number;
        lpvarValue: System.IntPtr;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class DISPPARAMS {
        rgvarg: System.IntPtr;
        rgdispidNamedArgs: System.IntPtr;
        cArgs: number;
        cNamedArgs: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class EXCEPINFO {
        wCode: System.Int16;
        wReserved: System.Int16;
        bstrSource: string;
        bstrDescription: string;
        bstrHelpFile: string;
        dwHelpContext: number;
        pvReserved: System.IntPtr;
        pfnDeferredFillIn: System.IntPtr;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum FUNCKIND {
        FUNC_VIRTUAL = 0,
        FUNC_PUREVIRTUAL = 1,
        FUNC_NONVIRTUAL = 2,
        FUNC_STATIC = 3,
        FUNC_DISPATCH = 4,
      }
      export enum INVOKEKIND {
        INVOKE_FUNC = 1,
        INVOKE_PROPERTYGET = 2,
        INVOKE_PROPERTYPUT = 4,
        INVOKE_PROPERTYPUTREF = 8,
      }
      export enum CALLCONV {
        CC_CDECL = 1,
        CC_MSCPASCAL = 2,
        CC_PASCAL = 2,
        CC_MACPASCAL = 3,
        CC_STDCALL = 4,
        CC_RESERVED = 5,
        CC_SYSCALL = 6,
        CC_MPWCDECL = 7,
        CC_MPWPASCAL = 8,
        CC_MAX = 9,
      }
      export enum FUNCFLAGS {
        FUNCFLAG_FRESTRICTED = 1,
        FUNCFLAG_FSOURCE = 2,
        FUNCFLAG_FBINDABLE = 4,
        FUNCFLAG_FREQUESTEDIT = 8,
        FUNCFLAG_FDISPLAYBIND = 16,
        FUNCFLAG_FDEFAULTBIND = 32,
        FUNCFLAG_FHIDDEN = 64,
        FUNCFLAG_FUSESGETLASTERROR = 128,
        FUNCFLAG_FDEFAULTCOLLELEM = 256,
        FUNCFLAG_FUIDEFAULT = 512,
        FUNCFLAG_FNONBROWSABLE = 1024,
        FUNCFLAG_FREPLACEABLE = 2048,
        FUNCFLAG_FIMMEDIATEBIND = 4096,
      }
      export enum VARFLAGS {
        VARFLAG_FREADONLY = 1,
        VARFLAG_FSOURCE = 2,
        VARFLAG_FBINDABLE = 4,
        VARFLAG_FREQUESTEDIT = 8,
        VARFLAG_FDISPLAYBIND = 16,
        VARFLAG_FDEFAULTBIND = 32,
        VARFLAG_FHIDDEN = 64,
        VARFLAG_FRESTRICTED = 128,
        VARFLAG_FDEFAULTCOLLELEM = 256,
        VARFLAG_FUIDEFAULT = 512,
        VARFLAG_FNONBROWSABLE = 1024,
        VARFLAG_FREPLACEABLE = 2048,
        VARFLAG_FIMMEDIATEBIND = 4096,
      }
      export declare class UCOMITypeInfo {
        GetIDsOfNames: ((rgszNames: string[], cNames: number, pMemId: number[]) => void);
        ReleaseTypeAttr: ((pTypeAttr: System.IntPtr) => void);
        ReleaseFuncDesc: ((pFuncDesc: System.IntPtr) => void);
        ReleaseVarDesc: ((pVarDesc: System.IntPtr) => void);
      }
      export declare class UnknownWrapper {
        constructor(obj: System.Object);
        WrappedObject: System.Object;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class VariantWrapper {
        constructor(obj: System.Object);
        WrappedObject: System.Object;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RuntimeInformation {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class BINDPTR {
        lpfuncdesc: System.IntPtr;
        lptcomp: System.IntPtr;
        lpvardesc: System.IntPtr;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class BIND_OPTS {
        cbStruct: number;
        grfFlags: number;
        grfMode: number;
        dwTickCountDeadline: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class ComEventsHelper {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CustomQueryInterfaceMode {
        Allow = 1,
        Ignore = 0,
      }
      export enum DESCKIND {
        DESCKIND_NONE = 0,
        DESCKIND_FUNCDESC = 1,
        DESCKIND_VARDESC = 2,
        DESCKIND_TYPECOMP = 3,
        DESCKIND_IMPLICITAPPOBJ = 4,
        DESCKIND_MAX = 5,
      }
      export enum ExporterEventKind {
        NOTIF_TYPECONVERTED = 0,
        NOTIF_CONVERTWARNING = 1,
        ERROR_REFTOINVALIDASSEMBLY = 2,
      }
      export declare class ExtensibleClassFactory {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FILETIME {
        dwLowDateTime: number;
        dwHighDateTime: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class GCHandle {
        IsAllocated: boolean;
        Target: System.Object;
        AddrOfPinnedObject: (() => System.IntPtr);
        Free: (() => void);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum GCHandleType {
        Weak = 0,
        WeakTrackResurrection = 1,
        Normal = 2,
        Pinned = 3,
      }
      export declare class ITypeLibConverter {
        ConvertAssemblyToTypeLib: ((assembly: System.Reflection.Assembly, typeLibName: string, flags: System.Runtime.InteropServices.TypeLibExporterFlags, notifySink: System.Runtime.InteropServices.ITypeLibExporterNotifySink) => System.Object);
        ConvertTypeLibToAssembly: ((typeLib: System.Object, asmFileName: string, flags: number, notifySink: System.Runtime.InteropServices.ITypeLibImporterNotifySink, publicKey: System.Byte[], keyPair: System.Reflection.StrongNameKeyPair, unsafeInterfaces: boolean) => System.Reflection.Emit.AssemblyBuilder) | ((typeLib: System.Object, asmFileName: string, flags: System.Runtime.InteropServices.TypeLibImporterFlags, notifySink: System.Runtime.InteropServices.ITypeLibImporterNotifySink, publicKey: System.Byte[], keyPair: System.Reflection.StrongNameKeyPair, asmNamespace: string, asmVersion: System.Version) => System.Reflection.Emit.AssemblyBuilder);
      }
      export declare class ITypeLibExporterNameProvider {
        GetNames: (() => string[]);
      }
      export declare class ITypeLibExporterNotifySink {
        ReportEvent: ((eventKind: System.Runtime.InteropServices.ExporterEventKind, eventCode: number, eventMsg: string) => void);
        ResolveRef: ((assembly: System.Reflection.Assembly) => System.Object);
      }
      export declare class ITypeLibImporterNotifySink {
        ReportEvent: ((eventKind: System.Runtime.InteropServices.ImporterEventKind, eventCode: number, eventMsg: string) => void);
        ResolveRef: ((typeLib: System.Object) => System.Reflection.Assembly);
      }
      export enum ImporterEventKind {
        NOTIF_TYPECONVERTED = 0,
        NOTIF_CONVERTWARNING = 1,
        ERROR_REFTOINVALIDTYPELIB = 2,
      }
      export enum LIBFLAGS {
        LIBFLAG_FRESTRICTED = 1,
        LIBFLAG_FCONTROL = 2,
        LIBFLAG_FHIDDEN = 4,
        LIBFLAG_FHASDISKIMAGE = 8,
      }
      export declare class Marshal {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum RegistrationClassContext {
        DisableActivateAsActivator = 32768,
        EnableActivateAsActivator = 65536,
        EnableCodeDownload = 8192,
        FromDefaultContext = 131072,
        InProcessHandler = 2,
        InProcessHandler16 = 32,
        InProcessServer = 1,
        InProcessServer16 = 8,
        LocalServer = 4,
        NoCodeDownload = 1024,
        NoCustomMarshal = 4096,
        NoFailureLog = 16384,
        RemoteServer = 16,
        Reserved1 = 64,
        Reserved2 = 128,
        Reserved3 = 256,
        Reserved4 = 512,
        Reserved5 = 2048,
      }
      export enum RegistrationConnectionType {
        MultipleUse = 1,
        MultiSeparate = 2,
        SingleUse = 0,
        Suspended = 4,
        Surrogate = 8,
      }
      export declare class RegistrationServices {
        constructor();
        GetManagedCategoryGuid: (() => System.Guid);
        GetProgIdForType: ((type: System.Type) => string);
        GetRegistrableTypesInAssembly: ((assembly: System.Reflection.Assembly) => System.Type[]);
        RegisterAssembly: ((assembly: System.Reflection.Assembly, flags: System.Runtime.InteropServices.AssemblyRegistrationFlags) => boolean);
        TypeRepresentsComType: ((type: System.Type) => boolean);
        TypeRequiresRegistration: ((type: System.Type) => boolean);
        UnregisterAssembly: ((assembly: System.Reflection.Assembly) => boolean);
        RegisterTypeForComClients: ((type: System.Type, classContext: System.Runtime.InteropServices.RegistrationClassContext, flags: System.Runtime.InteropServices.RegistrationConnectionType) => number);
        UnregisterTypeForComClients: ((cookie: number) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class STATSTG {
        pwcsName: string;
        type: number;
        cbSize: System.Int64;
        mtime: System.Runtime.InteropServices.FILETIME;
        ctime: System.Runtime.InteropServices.FILETIME;
        atime: System.Runtime.InteropServices.FILETIME;
        grfMode: number;
        grfLocksSupported: number;
        clsid: System.Guid;
        grfStateBits: number;
        reserved: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum SYSKIND {
        SYS_WIN16 = 0,
        SYS_WIN32 = 1,
        SYS_MAC = 2,
      }
      export declare class SafeBuffer {
        ByteLength: System.UInt64;
        IsInvalid: boolean;
        IsClosed: boolean;
        Initialize: ((numBytes: System.UInt64) => void) | ((numElements: System.UInt32, sizeOfEachElement: System.UInt32) => void);
        ReleasePointer: (() => void);
        DangerousGetHandle: (() => System.IntPtr);
        Close: (() => void);
        Dispose: (() => void);
        SetHandleAsInvalid: (() => void);
        DangerousRelease: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TYPELIBATTR {
        guid: System.Guid;
        lcid: number;
        syskind: System.Runtime.InteropServices.SYSKIND;
        wMajorVerNum: System.Int16;
        wMinorVerNum: System.Int16;
        wLibFlags: System.Runtime.InteropServices.LIBFLAGS;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class TypeLibConverter {
        constructor();
        ConvertAssemblyToTypeLib: ((assembly: System.Reflection.Assembly, strTypeLibName: string, flags: System.Runtime.InteropServices.TypeLibExporterFlags, notifySink: System.Runtime.InteropServices.ITypeLibExporterNotifySink) => System.Object);
        ConvertTypeLibToAssembly: ((typeLib: System.Object, asmFileName: string, flags: number, notifySink: System.Runtime.InteropServices.ITypeLibImporterNotifySink, publicKey: System.Byte[], keyPair: System.Reflection.StrongNameKeyPair, unsafeInterfaces: boolean) => System.Reflection.Emit.AssemblyBuilder) | ((typeLib: System.Object, asmFileName: string, flags: System.Runtime.InteropServices.TypeLibImporterFlags, notifySink: System.Runtime.InteropServices.ITypeLibImporterNotifySink, publicKey: System.Byte[], keyPair: System.Reflection.StrongNameKeyPair, asmNamespace: string, asmVersion: System.Version) => System.Reflection.Emit.AssemblyBuilder);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum TypeLibExporterFlags {
        OnlyReferenceRegistered = 1,
        None = 0,
        CallerResolvedReferences = 2,
        OldNames = 4,
        ExportAs32Bit = 16,
        ExportAs64Bit = 32,
      }
      export enum TypeLibImporterFlags {
        PrimaryInteropAssembly = 1,
        UnsafeInterfaces = 2,
        SafeArrayAsSystemArray = 4,
        TransformDispRetVals = 8,
        None = 0,
        PreventClassMembers = 16,
        ImportAsAgnostic = 2048,
        ImportAsItanium = 1024,
        ImportAsX64 = 512,
        ImportAsX86 = 256,
        ReflectionOnlyLoading = 4096,
        SerializableValueClasses = 32,
        NoDefineVersionResource = 8192,
        ImportAsArm = 16384,
      }
      export declare class UCOMIBindCtx {
        RegisterObjectBound: ((punk: System.Object) => void);
        RevokeObjectBound: ((punk: System.Object) => void);
        ReleaseBoundObjects: (() => void);
        RegisterObjectParam: ((pszKey: string, punk: System.Object) => void);
        RevokeObjectParam: ((pszKey: string) => void);
      }
      export declare class UCOMIConnectionPoint {
        Unadvise: ((dwCookie: number) => void);
      }
      export declare class UCOMIConnectionPointContainer {
      }
      export declare class UCOMIEnumConnectionPoints {
        Skip: ((celt: number) => number);
        Reset: (() => number);
      }
      export declare class UCOMIEnumMoniker {
        Skip: ((celt: number) => number);
        Reset: (() => number);
      }
      export declare class UCOMIEnumString {
        Skip: ((celt: number) => number);
        Reset: (() => number);
      }
      export declare class UCOMIEnumVARIANT {
        Next: ((celt: number, rgvar: number, pceltFetched: number) => number);
        Skip: ((celt: number) => number);
        Reset: (() => number);
        Clone: ((ppenum: number) => void);
      }
      export declare class UCOMIMoniker {
        IsDirty: (() => number);
        Load: ((pStm: System.Runtime.InteropServices.UCOMIStream) => void);
        Save: ((pStm: System.Runtime.InteropServices.UCOMIStream, fClearDirty: boolean) => void);
        IsEqual: ((pmkOtherMoniker: System.Runtime.InteropServices.UCOMIMoniker) => void);
        IsRunning: ((pbc: System.Runtime.InteropServices.UCOMIBindCtx, pmkToLeft: System.Runtime.InteropServices.UCOMIMoniker, pmkNewlyRunning: System.Runtime.InteropServices.UCOMIMoniker) => void);
      }
      export declare class UCOMIPersistFile {
        IsDirty: (() => number);
        Load: ((pszFileName: string, dwMode: number) => void);
        Save: ((pszFileName: string, fRemember: boolean) => void);
        SaveCompleted: ((pszFileName: string) => void);
      }
      export declare class UCOMIRunningObjectTable {
        Revoke: ((dwRegister: number) => void);
        IsRunning: ((pmkObjectName: System.Runtime.InteropServices.UCOMIMoniker) => void);
      }
      export declare class UCOMIStream {
        Read: ((pv: System.Byte[], cb: number, pcbRead: System.IntPtr) => void);
        Write: ((pv: System.Byte[], cb: number, pcbWritten: System.IntPtr) => void);
        Seek: ((dlibMove: System.Int64, dwOrigin: number, plibNewPosition: System.IntPtr) => void);
        SetSize: ((libNewSize: System.Int64) => void);
        CopyTo: ((pstm: System.Runtime.InteropServices.UCOMIStream, cb: System.Int64, pcbRead: System.IntPtr, pcbWritten: System.IntPtr) => void);
        Commit: ((grfCommitFlags: number) => void);
        Revert: (() => void);
        LockRegion: ((libOffset: System.Int64, cb: System.Int64, dwLockType: number) => void);
        UnlockRegion: ((libOffset: System.Int64, cb: System.Int64, dwLockType: number) => void);
      }
      export declare class UCOMITypeComp {
      }
      export declare class UCOMITypeLib {
        GetTypeInfoCount: (() => number);
        IsName: ((szNameBuf: string, lHashVal: number) => boolean);
        ReleaseTLibAttr: ((pTLibAttr: System.IntPtr) => void);
      }
      export declare class _Activator {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _Assembly {
        CodeBase: string;
        EscapedCodeBase: string;
        FullName: string;
        EntryPoint: System.Reflection.MethodInfo;
        Location: string;
        Evidence: System.Security.Policy.Evidence;
        GlobalAssemblyCache: boolean;
        ToString: (() => string);
        Equals: ((other: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type) | ((name: string) => System.Type) | ((name: string, throwOnError: boolean) => System.Type) | ((name: string, throwOnError: boolean, ignoreCase: boolean) => System.Type);
        GetName: (() => System.Reflection.AssemblyName) | ((copiedName: boolean) => System.Reflection.AssemblyName);
        GetExportedTypes: (() => System.Type[]);
        GetTypes: (() => System.Type[]);
        GetManifestResourceStream: ((type: System.Type, name: string) => System.IO.Stream) | ((name: string) => System.IO.Stream);
        GetFile: ((name: string) => System.IO.FileStream);
        GetFiles: (() => System.IO.FileStream[]) | ((getResourceModules: boolean) => System.IO.FileStream[]);
        GetManifestResourceNames: (() => string[]);
        GetManifestResourceInfo: ((resourceName: string) => System.Reflection.ManifestResourceInfo);
        GetCustomAttributes: ((attributeType: System.Type, inherit: boolean) => System.Object[]) | ((inherit: boolean) => System.Object[]);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetSatelliteAssembly: ((culture: System.Globalization.CultureInfo) => System.Reflection.Assembly) | ((culture: System.Globalization.CultureInfo, version: System.Version) => System.Reflection.Assembly);
        LoadModule: ((moduleName: string, rawModule: System.Byte[]) => System.Reflection.Module) | ((moduleName: string, rawModule: System.Byte[], rawSymbolStore: System.Byte[]) => System.Reflection.Module);
        CreateInstance: ((typeName: string) => System.Object) | ((typeName: string, ignoreCase: boolean) => System.Object) | ((typeName: string, ignoreCase: boolean, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, args: System.Object[], culture: System.Globalization.CultureInfo, activationAttributes: System.Object[]) => System.Object);
        GetLoadedModules: (() => System.Reflection.Module[]) | ((getResourceModules: boolean) => System.Reflection.Module[]);
        GetModules: (() => System.Reflection.Module[]) | ((getResourceModules: boolean) => System.Reflection.Module[]);
        GetModule: ((name: string) => System.Reflection.Module);
        GetReferencedAssemblies: (() => System.Reflection.AssemblyName[]);
      }
      export declare class _AssemblyBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _AssemblyName {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _Attribute {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _ConstructorBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _ConstructorInfo {
        Attributes: System.Reflection.MethodAttributes;
        CallingConvention: System.Reflection.CallingConventions;
        DeclaringType: System.Type;
        IsAbstract: boolean;
        IsAssembly: boolean;
        IsConstructor: boolean;
        IsFamily: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsFinal: boolean;
        IsHideBySig: boolean;
        IsPrivate: boolean;
        IsPublic: boolean;
        IsSpecialName: boolean;
        IsStatic: boolean;
        IsVirtual: boolean;
        MemberType: System.Reflection.MemberTypes;
        MethodHandle: System.RuntimeMethodHandle;
        Name: string;
        ReflectedType: System.Type;
        Equals: ((other: System.Object) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetType: (() => System.Type);
        Invoke_5: ((parameters: System.Object[]) => System.Object);
        Invoke_3: ((obj: System.Object, parameters: System.Object[]) => System.Object);
        Invoke_4: ((invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
        Invoke_2: ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        ToString: (() => string);
      }
      export declare class _CustomAttributeBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _EnumBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _EventBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _EventInfo {
        Attributes: System.Reflection.EventAttributes;
        DeclaringType: System.Type;
        EventHandlerType: System.Type;
        IsMulticast: boolean;
        IsSpecialName: boolean;
        MemberType: System.Reflection.MemberTypes;
        Name: string;
        ReflectedType: System.Type;
        AddEventHandler: ((target: System.Object, handler: System.Delegate) => void);
        Equals: ((other: System.Object) => boolean);
        GetAddMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetRaiseMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
        GetRemoveMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
        GetType: (() => System.Type);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        RemoveEventHandler: ((target: System.Object, handler: System.Delegate) => void);
        ToString: (() => string);
      }
      export declare class _Exception {
        HelpLink: string;
        InnerException: System.Exception;
        Message: string;
        Source: string;
        StackTrace: string;
        TargetSite: System.Reflection.MethodBase;
        Equals: ((obj: System.Object) => boolean);
        GetBaseException: (() => System.Exception);
        GetHashCode: (() => number);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class _FieldBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _FieldInfo {
        Attributes: System.Reflection.FieldAttributes;
        DeclaringType: System.Type;
        FieldHandle: System.RuntimeFieldHandle;
        FieldType: System.Type;
        IsAssembly: boolean;
        IsFamily: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsInitOnly: boolean;
        IsLiteral: boolean;
        IsNotSerialized: boolean;
        IsPinvokeImpl: boolean;
        IsPrivate: boolean;
        IsPublic: boolean;
        IsSpecialName: boolean;
        IsStatic: boolean;
        MemberType: System.Reflection.MemberTypes;
        Name: string;
        ReflectedType: System.Type;
        Equals: ((other: System.Object) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetValue: ((obj: System.Object) => System.Object);
        GetValueDirect: ((obj: System.TypedReference) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        SetValue: ((obj: System.Object, value: System.Object) => void) | ((obj: System.Object, value: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, culture: System.Globalization.CultureInfo) => void);
        SetValueDirect: ((obj: System.TypedReference, value: System.Object) => void);
        ToString: (() => string);
      }
      export declare class _ILGenerator {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _LocalBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _MemberInfo {
        DeclaringType: System.Type;
        MemberType: System.Reflection.MemberTypes;
        Name: string;
        ReflectedType: System.Type;
        Equals: ((other: System.Object) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        ToString: (() => string);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _MethodBase {
        Attributes: System.Reflection.MethodAttributes;
        CallingConvention: System.Reflection.CallingConventions;
        DeclaringType: System.Type;
        IsAbstract: boolean;
        IsAssembly: boolean;
        IsConstructor: boolean;
        IsFamily: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsFinal: boolean;
        IsHideBySig: boolean;
        IsPrivate: boolean;
        IsPublic: boolean;
        IsSpecialName: boolean;
        IsStatic: boolean;
        IsVirtual: boolean;
        MemberType: System.Reflection.MemberTypes;
        MethodHandle: System.RuntimeMethodHandle;
        Name: string;
        ReflectedType: System.Type;
        Equals: ((other: System.Object) => boolean);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetType: (() => System.Type);
        Invoke: ((obj: System.Object, parameters: System.Object[]) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        ToString: (() => string);
      }
      export declare class _MethodBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _MethodInfo {
        Attributes: System.Reflection.MethodAttributes;
        CallingConvention: System.Reflection.CallingConventions;
        DeclaringType: System.Type;
        IsAbstract: boolean;
        IsAssembly: boolean;
        IsConstructor: boolean;
        IsFamily: boolean;
        IsFamilyAndAssembly: boolean;
        IsFamilyOrAssembly: boolean;
        IsFinal: boolean;
        IsHideBySig: boolean;
        IsPrivate: boolean;
        IsPublic: boolean;
        IsSpecialName: boolean;
        IsStatic: boolean;
        IsVirtual: boolean;
        MemberType: System.Reflection.MemberTypes;
        MethodHandle: System.RuntimeMethodHandle;
        Name: string;
        ReflectedType: System.Type;
        ReturnType: System.Type;
        ReturnTypeCustomAttributes: System.Reflection.ICustomAttributeProvider;
        Equals: ((other: System.Object) => boolean);
        GetBaseDefinition: (() => System.Reflection.MethodInfo);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetHashCode: (() => number);
        GetMethodImplementationFlags: (() => System.Reflection.MethodImplAttributes);
        GetParameters: (() => System.Reflection.ParameterInfo[]);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetType: (() => System.Type);
        Invoke: ((obj: System.Object, parameters: System.Object[]) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, parameters: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        ToString: (() => string);
      }
      export declare class _MethodRental {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _Module {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _ModuleBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _ParameterBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _ParameterInfo {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _PropertyBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _PropertyInfo {
        Attributes: System.Reflection.PropertyAttributes;
        CanRead: boolean;
        CanWrite: boolean;
        DeclaringType: System.Type;
        IsSpecialName: boolean;
        MemberType: System.Reflection.MemberTypes;
        Name: string;
        PropertyType: System.Type;
        ReflectedType: System.Type;
        Equals: ((other: System.Object) => boolean);
        GetAccessors: (() => System.Reflection.MethodInfo[]) | ((nonPublic: boolean) => System.Reflection.MethodInfo[]);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetGetMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
        GetHashCode: (() => number);
        GetIndexParameters: (() => System.Reflection.ParameterInfo[]);
        GetSetMethod: (() => System.Reflection.MethodInfo) | ((nonPublic: boolean) => System.Reflection.MethodInfo);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetType: (() => System.Type);
        GetValue: ((obj: System.Object, index: System.Object[]) => System.Object) | ((obj: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => System.Object);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        SetValue: ((obj: System.Object, value: System.Object, index: System.Object[]) => void) | ((obj: System.Object, value: System.Object, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, index: System.Object[], culture: System.Globalization.CultureInfo) => void);
        ToString: (() => string);
      }
      export declare class _SignatureHelper {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _Thread {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export declare class _Type {
        Assembly: System.Reflection.Assembly;
        AssemblyQualifiedName: string;
        Attributes: System.Reflection.TypeAttributes;
        BaseType: System.Type;
        DeclaringType: System.Type;
        FullName: string;
        GUID: System.Guid;
        HasElementType: boolean;
        IsAbstract: boolean;
        IsAnsiClass: boolean;
        IsArray: boolean;
        IsAutoClass: boolean;
        IsAutoLayout: boolean;
        IsByRef: boolean;
        IsClass: boolean;
        IsCOMObject: boolean;
        IsContextful: boolean;
        IsEnum: boolean;
        IsExplicitLayout: boolean;
        IsImport: boolean;
        IsInterface: boolean;
        IsLayoutSequential: boolean;
        IsMarshalByRef: boolean;
        IsNestedAssembly: boolean;
        IsNestedFamANDAssem: boolean;
        IsNestedFamily: boolean;
        IsNestedFamORAssem: boolean;
        IsNestedPrivate: boolean;
        IsNestedPublic: boolean;
        IsNotPublic: boolean;
        IsPointer: boolean;
        IsPrimitive: boolean;
        IsPublic: boolean;
        IsSealed: boolean;
        IsSerializable: boolean;
        IsSpecialName: boolean;
        IsUnicodeClass: boolean;
        IsValueType: boolean;
        MemberType: System.Reflection.MemberTypes;
        Module: System.Reflection.Module;
        Name: string;
        Namespace: string;
        ReflectedType: System.Type;
        TypeHandle: System.RuntimeTypeHandle;
        TypeInitializer: System.Reflection.ConstructorInfo;
        UnderlyingSystemType: System.Type;
        Equals: ((other: System.Object) => boolean) | ((o: System.Type) => boolean);
        FindInterfaces: ((filter: System.Reflection.TypeFilter, filterCriteria: System.Object) => System.Type[]);
        FindMembers: ((memberType: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags, filter: System.Reflection.MemberFilter, filterCriteria: System.Object) => System.Reflection.MemberInfo[]);
        GetArrayRank: (() => number);
        GetConstructor: ((types: System.Type[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo) | ((bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.ConstructorInfo);
        GetConstructors: (() => System.Reflection.ConstructorInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.ConstructorInfo[]);
        GetCustomAttributes: ((inherit: boolean) => System.Object[]) | ((attributeType: System.Type, inherit: boolean) => System.Object[]);
        GetDefaultMembers: (() => System.Reflection.MemberInfo[]);
        GetElementType: (() => System.Type);
        GetEvent: ((name: string) => System.Reflection.EventInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo);
        GetEvents: (() => System.Reflection.EventInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.EventInfo[]);
        GetField: ((name: string) => System.Reflection.FieldInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo);
        GetFields: (() => System.Reflection.FieldInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.FieldInfo[]);
        GetHashCode: (() => number);
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
        GetInterface: ((name: string) => System.Type) | ((name: string, ignoreCase: boolean) => System.Type);
        GetInterfaceMap: ((interfaceType: System.Type) => System.Reflection.InterfaceMapping);
        GetInterfaces: (() => System.Type[]);
        GetMember: ((name: string) => System.Reflection.MemberInfo[]) | ((name: string, type: System.Reflection.MemberTypes, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
        GetMembers: (() => System.Reflection.MemberInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MemberInfo[]);
        GetMethod: ((name: string) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[]) => System.Reflection.MethodInfo) | ((name: string, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, callConvention: System.Reflection.CallingConventions, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.MethodInfo);
        GetMethods: (() => System.Reflection.MethodInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.MethodInfo[]);
        GetNestedType: ((name: string) => System.Type) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Type);
        GetNestedTypes: (() => System.Type[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Type[]);
        GetProperties: (() => System.Reflection.PropertyInfo[]) | ((bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo[]);
        GetProperty: ((name: string) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type) => System.Reflection.PropertyInfo) | ((name: string, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[]) => System.Reflection.PropertyInfo) | ((name: string, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo) | ((name: string, bindingAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, returnType: System.Type, types: System.Type[], modifiers: System.Reflection.ParameterModifier[]) => System.Reflection.PropertyInfo);
        GetType: (() => System.Type);
        InvokeMember: ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[]) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], culture: System.Globalization.CultureInfo) => System.Object) | ((name: string, invokeAttr: System.Reflection.BindingFlags, binder: System.Reflection.Binder, target: System.Object, args: System.Object[], modifiers: System.Reflection.ParameterModifier[], culture: System.Globalization.CultureInfo, namedParameters: string[]) => System.Object);
        IsAssignableFrom: ((c: System.Type) => boolean);
        IsDefined: ((attributeType: System.Type, inherit: boolean) => boolean);
        IsInstanceOfType: ((o: System.Object) => boolean);
        IsSubclassOf: ((c: System.Type) => boolean);
        ToString: (() => string);
      }
      export declare class _TypeBuilder {
        GetTypeInfo: ((iTInfo: System.UInt32, lcid: System.UInt32, ppTInfo: System.IntPtr) => void);
      }
      export namespace ComTypes {
        export declare class BIND_OPTS {
          cbStruct: number;
          grfFlags: number;
          grfMode: number;
          dwTickCountDeadline: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class IBindCtx {
          RegisterObjectBound: ((punk: System.Object) => void);
          RevokeObjectBound: ((punk: System.Object) => void);
          ReleaseBoundObjects: (() => void);
          RegisterObjectParam: ((pszKey: string, punk: System.Object) => void);
          RevokeObjectParam: ((pszKey: string) => number);
        }
        export declare class IConnectionPoint {
          Unadvise: ((dwCookie: number) => void);
        }
        export declare class IConnectionPointContainer {
        }
        export declare class IEnumConnectionPoints {
          Next: ((celt: number, rgelt: System.Runtime.InteropServices.ComTypes.IConnectionPoint[], pceltFetched: System.IntPtr) => number);
          Skip: ((celt: number) => number);
          Reset: (() => void);
        }
        export declare class CONNECTDATA {
          pUnk: System.Object;
          dwCookie: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class IEnumConnections {
          Next: ((celt: number, rgelt: System.Runtime.InteropServices.ComTypes.CONNECTDATA[], pceltFetched: System.IntPtr) => number);
          Skip: ((celt: number) => number);
          Reset: (() => void);
        }
        export declare class IEnumMoniker {
          Next: ((celt: number, rgelt: System.Runtime.InteropServices.ComTypes.IMoniker[], pceltFetched: System.IntPtr) => number);
          Skip: ((celt: number) => number);
          Reset: (() => void);
        }
        export declare class IEnumString {
          Next: ((celt: number, rgelt: string[], pceltFetched: System.IntPtr) => number);
          Skip: ((celt: number) => number);
          Reset: (() => void);
        }
        export declare class IEnumVARIANT {
          Next: ((celt: number, rgVar: System.Object[], pceltFetched: System.IntPtr) => number);
          Skip: ((celt: number) => number);
          Reset: (() => number);
          Clone: (() => System.Runtime.InteropServices.ComTypes.IEnumVARIANT);
        }
        export declare class FILETIME {
          dwLowDateTime: number;
          dwHighDateTime: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class IMoniker {
          IsDirty: (() => number);
          Load: ((pStm: System.Runtime.InteropServices.ComTypes.IStream) => void);
          Save: ((pStm: System.Runtime.InteropServices.ComTypes.IStream, fClearDirty: boolean) => void);
          IsEqual: ((pmkOtherMoniker: System.Runtime.InteropServices.ComTypes.IMoniker) => number);
          IsRunning: ((pbc: System.Runtime.InteropServices.ComTypes.IBindCtx, pmkToLeft: System.Runtime.InteropServices.ComTypes.IMoniker, pmkNewlyRunning: System.Runtime.InteropServices.ComTypes.IMoniker) => number);
        }
        export declare class IPersistFile {
          IsDirty: (() => number);
          Load: ((pszFileName: string, dwMode: number) => void);
          Save: ((pszFileName: string, fRemember: boolean) => void);
          SaveCompleted: ((pszFileName: string) => void);
        }
        export declare class IRunningObjectTable {
          Register: ((grfFlags: number, punkObject: System.Object, pmkObjectName: System.Runtime.InteropServices.ComTypes.IMoniker) => number);
          Revoke: ((dwRegister: number) => void);
          IsRunning: ((pmkObjectName: System.Runtime.InteropServices.ComTypes.IMoniker) => number);
        }
        export declare class STATSTG {
          pwcsName: string;
          type: number;
          cbSize: System.Int64;
          mtime: System.Runtime.InteropServices.ComTypes.FILETIME;
          ctime: System.Runtime.InteropServices.ComTypes.FILETIME;
          atime: System.Runtime.InteropServices.ComTypes.FILETIME;
          grfMode: number;
          grfLocksSupported: number;
          clsid: System.Guid;
          grfStateBits: number;
          reserved: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class IStream {
          Read: ((pv: System.Byte[], cb: number, pcbRead: System.IntPtr) => void);
          Write: ((pv: System.Byte[], cb: number, pcbWritten: System.IntPtr) => void);
          Seek: ((dlibMove: System.Int64, dwOrigin: number, plibNewPosition: System.IntPtr) => void);
          SetSize: ((libNewSize: System.Int64) => void);
          CopyTo: ((pstm: System.Runtime.InteropServices.ComTypes.IStream, cb: System.Int64, pcbRead: System.IntPtr, pcbWritten: System.IntPtr) => void);
          Commit: ((grfCommitFlags: number) => void);
          Revert: (() => void);
          LockRegion: ((libOffset: System.Int64, cb: System.Int64, dwLockType: number) => void);
          UnlockRegion: ((libOffset: System.Int64, cb: System.Int64, dwLockType: number) => void);
        }
        export enum DESCKIND {
          DESCKIND_NONE = 0,
          DESCKIND_FUNCDESC = 1,
          DESCKIND_VARDESC = 2,
          DESCKIND_TYPECOMP = 3,
          DESCKIND_IMPLICITAPPOBJ = 4,
          DESCKIND_MAX = 5,
        }
        export declare class BINDPTR {
          lpfuncdesc: System.IntPtr;
          lpvardesc: System.IntPtr;
          lptcomp: System.IntPtr;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class ITypeComp {
        }
        export enum TYPEKIND {
          TKIND_ENUM = 0,
          TKIND_RECORD = 1,
          TKIND_MODULE = 2,
          TKIND_INTERFACE = 3,
          TKIND_DISPATCH = 4,
          TKIND_COCLASS = 5,
          TKIND_ALIAS = 6,
          TKIND_UNION = 7,
          TKIND_MAX = 8,
        }
        export enum TYPEFLAGS {
          TYPEFLAG_FAPPOBJECT = 1,
          TYPEFLAG_FCANCREATE = 2,
          TYPEFLAG_FLICENSED = 4,
          TYPEFLAG_FPREDECLID = 8,
          TYPEFLAG_FHIDDEN = 16,
          TYPEFLAG_FCONTROL = 32,
          TYPEFLAG_FDUAL = 64,
          TYPEFLAG_FNONEXTENSIBLE = 128,
          TYPEFLAG_FOLEAUTOMATION = 256,
          TYPEFLAG_FRESTRICTED = 512,
          TYPEFLAG_FAGGREGATABLE = 1024,
          TYPEFLAG_FREPLACEABLE = 2048,
          TYPEFLAG_FDISPATCHABLE = 4096,
          TYPEFLAG_FREVERSEBIND = 8192,
          TYPEFLAG_FPROXY = 16384,
        }
        export enum IMPLTYPEFLAGS {
          IMPLTYPEFLAG_FDEFAULT = 1,
          IMPLTYPEFLAG_FSOURCE = 2,
          IMPLTYPEFLAG_FRESTRICTED = 4,
          IMPLTYPEFLAG_FDEFAULTVTABLE = 8,
        }
        export declare class TYPEATTR {
          guid: System.Guid;
          lcid: number;
          dwReserved: number;
          memidConstructor: number;
          memidDestructor: number;
          lpstrSchema: System.IntPtr;
          cbSizeInstance: number;
          typekind: System.Runtime.InteropServices.ComTypes.TYPEKIND;
          cFuncs: System.Int16;
          cVars: System.Int16;
          cImplTypes: System.Int16;
          cbSizeVft: System.Int16;
          cbAlignment: System.Int16;
          wTypeFlags: System.Runtime.InteropServices.ComTypes.TYPEFLAGS;
          wMajorVerNum: System.Int16;
          wMinorVerNum: System.Int16;
          tdescAlias: System.Runtime.InteropServices.ComTypes.TYPEDESC;
          idldescType: System.Runtime.InteropServices.ComTypes.IDLDESC;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class FUNCDESC {
          memid: number;
          lprgscode: System.IntPtr;
          lprgelemdescParam: System.IntPtr;
          funckind: System.Runtime.InteropServices.ComTypes.FUNCKIND;
          invkind: System.Runtime.InteropServices.ComTypes.INVOKEKIND;
          callconv: System.Runtime.InteropServices.ComTypes.CALLCONV;
          cParams: System.Int16;
          cParamsOpt: System.Int16;
          oVft: System.Int16;
          cScodes: System.Int16;
          elemdescFunc: System.Runtime.InteropServices.ComTypes.ELEMDESC;
          wFuncFlags: System.Int16;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export enum IDLFLAG {
          IDLFLAG_NONE = 0,
          IDLFLAG_FIN = 1,
          IDLFLAG_FOUT = 2,
          IDLFLAG_FLCID = 4,
          IDLFLAG_FRETVAL = 8,
        }
        export declare class IDLDESC {
          dwReserved: System.IntPtr;
          wIDLFlags: System.Runtime.InteropServices.ComTypes.IDLFLAG;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export enum PARAMFLAG {
          PARAMFLAG_NONE = 0,
          PARAMFLAG_FIN = 1,
          PARAMFLAG_FOUT = 2,
          PARAMFLAG_FLCID = 4,
          PARAMFLAG_FRETVAL = 8,
          PARAMFLAG_FOPT = 16,
          PARAMFLAG_FHASDEFAULT = 32,
          PARAMFLAG_FHASCUSTDATA = 64,
        }
        export declare class PARAMDESC {
          lpVarValue: System.IntPtr;
          wParamFlags: System.Runtime.InteropServices.ComTypes.PARAMFLAG;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class TYPEDESC {
          lpValue: System.IntPtr;
          vt: System.Int16;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class ELEMDESC {
          tdesc: System.Runtime.InteropServices.ComTypes.TYPEDESC;
          desc: System.Runtime.InteropServices.ComTypes.ELEMDESC_DESCUNION;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class ELEMDESC_DESCUNION {
          idldesc: System.Runtime.InteropServices.ComTypes.IDLDESC;
          paramdesc: System.Runtime.InteropServices.ComTypes.PARAMDESC;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export enum VARKIND {
          VAR_PERINSTANCE = 0,
          VAR_STATIC = 1,
          VAR_CONST = 2,
          VAR_DISPATCH = 3,
        }
        export declare class VARDESC {
          memid: number;
          lpstrSchema: string;
          desc: System.Runtime.InteropServices.ComTypes.VARDESC_DESCUNION;
          elemdescVar: System.Runtime.InteropServices.ComTypes.ELEMDESC;
          wVarFlags: System.Int16;
          varkind: System.Runtime.InteropServices.ComTypes.VARKIND;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class VARDESC_DESCUNION {
          oInst: number;
          lpvarValue: System.IntPtr;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class DISPPARAMS {
          rgvarg: System.IntPtr;
          rgdispidNamedArgs: System.IntPtr;
          cArgs: number;
          cNamedArgs: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class EXCEPINFO {
          wCode: System.Int16;
          wReserved: System.Int16;
          bstrSource: string;
          bstrDescription: string;
          bstrHelpFile: string;
          dwHelpContext: number;
          pvReserved: System.IntPtr;
          pfnDeferredFillIn: System.IntPtr;
          scode: number;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export enum FUNCKIND {
          FUNC_VIRTUAL = 0,
          FUNC_PUREVIRTUAL = 1,
          FUNC_NONVIRTUAL = 2,
          FUNC_STATIC = 3,
          FUNC_DISPATCH = 4,
        }
        export enum INVOKEKIND {
          INVOKE_FUNC = 1,
          INVOKE_PROPERTYGET = 2,
          INVOKE_PROPERTYPUT = 4,
          INVOKE_PROPERTYPUTREF = 8,
        }
        export enum CALLCONV {
          CC_CDECL = 1,
          CC_MSCPASCAL = 2,
          CC_PASCAL = 2,
          CC_MACPASCAL = 3,
          CC_STDCALL = 4,
          CC_RESERVED = 5,
          CC_SYSCALL = 6,
          CC_MPWCDECL = 7,
          CC_MPWPASCAL = 8,
          CC_MAX = 9,
        }
        export enum FUNCFLAGS {
          FUNCFLAG_FRESTRICTED = 1,
          FUNCFLAG_FSOURCE = 2,
          FUNCFLAG_FBINDABLE = 4,
          FUNCFLAG_FREQUESTEDIT = 8,
          FUNCFLAG_FDISPLAYBIND = 16,
          FUNCFLAG_FDEFAULTBIND = 32,
          FUNCFLAG_FHIDDEN = 64,
          FUNCFLAG_FUSESGETLASTERROR = 128,
          FUNCFLAG_FDEFAULTCOLLELEM = 256,
          FUNCFLAG_FUIDEFAULT = 512,
          FUNCFLAG_FNONBROWSABLE = 1024,
          FUNCFLAG_FREPLACEABLE = 2048,
          FUNCFLAG_FIMMEDIATEBIND = 4096,
        }
        export enum VARFLAGS {
          VARFLAG_FREADONLY = 1,
          VARFLAG_FSOURCE = 2,
          VARFLAG_FBINDABLE = 4,
          VARFLAG_FREQUESTEDIT = 8,
          VARFLAG_FDISPLAYBIND = 16,
          VARFLAG_FDEFAULTBIND = 32,
          VARFLAG_FHIDDEN = 64,
          VARFLAG_FRESTRICTED = 128,
          VARFLAG_FDEFAULTCOLLELEM = 256,
          VARFLAG_FUIDEFAULT = 512,
          VARFLAG_FNONBROWSABLE = 1024,
          VARFLAG_FREPLACEABLE = 2048,
          VARFLAG_FIMMEDIATEBIND = 4096,
        }
        export declare class ITypeInfo {
          GetIDsOfNames: ((rgszNames: string[], cNames: number, pMemId: number[]) => void);
          GetDllEntry: ((memid: number, invKind: System.Runtime.InteropServices.ComTypes.INVOKEKIND, pBstrDllName: System.IntPtr, pBstrName: System.IntPtr, pwOrdinal: System.IntPtr) => void);
          ReleaseTypeAttr: ((pTypeAttr: System.IntPtr) => void);
          ReleaseFuncDesc: ((pFuncDesc: System.IntPtr) => void);
          ReleaseVarDesc: ((pVarDesc: System.IntPtr) => void);
        }
        export declare class ITypeInfo2 {
          GetIDsOfNames: ((rgszNames: string[], cNames: number, pMemId: number[]) => void);
          GetDllEntry: ((memid: number, invKind: System.Runtime.InteropServices.ComTypes.INVOKEKIND, pBstrDllName: System.IntPtr, pBstrName: System.IntPtr, pwOrdinal: System.IntPtr) => void);
          ReleaseTypeAttr: ((pTypeAttr: System.IntPtr) => void);
          ReleaseFuncDesc: ((pFuncDesc: System.IntPtr) => void);
          ReleaseVarDesc: ((pVarDesc: System.IntPtr) => void);
          GetAllCustData: ((pCustData: System.IntPtr) => void);
          GetAllFuncCustData: ((index: number, pCustData: System.IntPtr) => void);
          GetAllParamCustData: ((indexFunc: number, indexParam: number, pCustData: System.IntPtr) => void);
          GetAllVarCustData: ((index: number, pCustData: System.IntPtr) => void);
          GetAllImplTypeCustData: ((index: number, pCustData: System.IntPtr) => void);
        }
        export enum SYSKIND {
          SYS_WIN16 = 0,
          SYS_WIN32 = 1,
          SYS_MAC = 2,
          SYS_WIN64 = 3,
        }
        export enum LIBFLAGS {
          LIBFLAG_FRESTRICTED = 1,
          LIBFLAG_FCONTROL = 2,
          LIBFLAG_FHIDDEN = 4,
          LIBFLAG_FHASDISKIMAGE = 8,
        }
        export declare class TYPELIBATTR {
          guid: System.Guid;
          lcid: number;
          syskind: System.Runtime.InteropServices.ComTypes.SYSKIND;
          wMajorVerNum: System.Int16;
          wMinorVerNum: System.Int16;
          wLibFlags: System.Runtime.InteropServices.ComTypes.LIBFLAGS;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class ITypeLib {
          GetTypeInfoCount: (() => number);
          IsName: ((szNameBuf: string, lHashVal: number) => boolean);
          ReleaseTLibAttr: ((pTLibAttr: System.IntPtr) => void);
        }
        export declare class ITypeLib2 {
          GetTypeInfoCount: (() => number);
          IsName: ((szNameBuf: string, lHashVal: number) => boolean);
          ReleaseTLibAttr: ((pTLibAttr: System.IntPtr) => void);
          GetAllCustData: ((pCustData: System.IntPtr) => void);
        }
      }
      export namespace Expando {
        export declare class IExpando {
          AddField: ((name: string) => System.Reflection.FieldInfo);
          AddProperty: ((name: string) => System.Reflection.PropertyInfo);
          AddMethod: ((name: string, method: System.Delegate) => System.Reflection.MethodInfo);
          RemoveMember: ((m: System.Reflection.MemberInfo) => void);
        }
      }
      export namespace WindowsRuntime {
        export declare class EventRegistrationToken {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          ToString: (() => string);
          GetType: (() => System.Type);
        }
        export declare class IActivationFactory {
          ActivateInstance: (() => System.Object);
        }
        export declare class WindowsRuntimeMarshal {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class DesignerNamespaceResolveEventArgs {
          constructor(namespaceName: string);
          NamespaceName: string;
          ResolvedAssemblyFiles: any; // System.Collections.ObjectModel.Collection`1[System.String]
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class NamespaceResolveEventArgs {
          constructor(namespaceName: string, requestingAssembly: System.Reflection.Assembly);
          NamespaceName: string;
          RequestingAssembly: System.Reflection.Assembly;
          ResolvedAssemblies: any; // System.Collections.ObjectModel.Collection`1[System.Reflection.Assembly]
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class WindowsRuntimeMetadata {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
    }
    export namespace Remoting {
      export declare class ActivatedClientTypeEntry {
        constructor(type: System.Type, appUrl: string);
        constructor(typeName: string, assemblyName: string, appUrl: string);
        ApplicationUrl: string;
        ContextAttributes: System.Runtime.Remoting.Contexts.IContextAttribute[];
        ObjectType: System.Type;
        AssemblyName: string;
        TypeName: string;
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class ActivatedServiceTypeEntry {
        constructor(type: System.Type);
        constructor(typeName: string, assemblyName: string);
        ContextAttributes: System.Runtime.Remoting.Contexts.IContextAttribute[];
        ObjectType: System.Type;
        AssemblyName: string;
        TypeName: string;
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export enum CustomErrorsModes {
        On = 0,
        Off = 1,
        RemoteOnly = 2,
      }
      export declare class IChannelInfo {
        ChannelData: System.Object[];
      }
      export declare class IEnvoyInfo {
        EnvoySinks: System.Runtime.Remoting.Messaging.IMessageSink;
      }
      export declare class IObjectHandle {
        Unwrap: (() => System.Object);
      }
      export declare class IRemotingTypeInfo {
        TypeName: string;
        CanCastTo: ((fromType: System.Type, o: System.Object) => boolean);
      }
      export declare class InternalRemotingServices {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjRef {
        constructor();
        constructor(o: System.MarshalByRefObject, requestedType: System.Type);
        ChannelInfo: System.Runtime.Remoting.IChannelInfo;
        EnvoyInfo: System.Runtime.Remoting.IEnvoyInfo;
        TypeInfo: System.Runtime.Remoting.IRemotingTypeInfo;
        URI: string;
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetRealObject: ((context: System.Runtime.Serialization.StreamingContext) => System.Object);
        IsFromThisAppDomain: (() => boolean);
        IsFromThisProcess: (() => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjectHandle {
        constructor(o: System.Object);
        InitializeLifetimeService: (() => System.Object);
        Unwrap: (() => System.Object);
        CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
        GetLifetimeService: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RemotingConfiguration {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RemotingException {
        constructor();
        constructor(message: string);
        constructor(message: string, InnerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class RemotingServices {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RemotingTimeoutException {
        constructor();
        constructor(message: string);
        constructor(message: string, InnerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class ServerException {
        constructor();
        constructor(message: string);
        constructor(message: string, InnerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class SoapServices {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TypeEntry {
        AssemblyName: string;
        TypeName: string;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class WellKnownClientTypeEntry {
        constructor(type: System.Type, objectUrl: string);
        constructor(typeName: string, assemblyName: string, objectUrl: string);
        ApplicationUrl: string;
        ObjectType: System.Type;
        ObjectUrl: string;
        AssemblyName: string;
        TypeName: string;
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export enum WellKnownObjectMode {
        Singleton = 1,
        SingleCall = 2,
      }
      export declare class WellKnownServiceTypeEntry {
        constructor(type: System.Type, objectUri: string, mode: System.Runtime.Remoting.WellKnownObjectMode);
        constructor(typeName: string, assemblyName: string, objectUri: string, mode: System.Runtime.Remoting.WellKnownObjectMode);
        ContextAttributes: System.Runtime.Remoting.Contexts.IContextAttribute[];
        Mode: System.Runtime.Remoting.WellKnownObjectMode;
        ObjectType: System.Type;
        ObjectUri: string;
        AssemblyName: string;
        TypeName: string;
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export namespace Activation {
        export enum ActivatorLevel {
          Construction = 4,
          Context = 8,
          AppDomain = 12,
          Process = 16,
          Machine = 20,
        }
        export declare class IActivator {
          Level: System.Runtime.Remoting.Activation.ActivatorLevel;
          NextActivator: System.Runtime.Remoting.Activation.IActivator;
          Activate: ((msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => System.Runtime.Remoting.Activation.IConstructionReturnMessage);
        }
        export declare class IConstructionCallMessage {
          ActivationType: System.Type;
          ActivationTypeName: string;
          Activator: System.Runtime.Remoting.Activation.IActivator;
          CallSiteActivationAttributes: System.Object[];
          ContextProperties: System.Collections.IList;
        }
        export declare class IConstructionReturnMessage {
        }
      }
      export namespace Channels {
        export declare class BaseChannelObjectWithProperties {
          Count: number;
          IsFixedSize: boolean;
          IsReadOnly: boolean;
          IsSynchronized: boolean;
          Keys: System.Collections.ICollection;
          Properties: System.Collections.IDictionary;
          SyncRoot: System.Object;
          Values: System.Collections.ICollection;
          Add: ((key: System.Object, value: System.Object) => void);
          Clear: (() => void);
          Contains: ((key: System.Object) => boolean);
          CopyTo: ((array: System.Array, index: number) => void);
          GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
          Remove: ((key: System.Object) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class BaseChannelSinkWithProperties {
          Count: number;
          IsFixedSize: boolean;
          IsReadOnly: boolean;
          IsSynchronized: boolean;
          Keys: System.Collections.ICollection;
          Properties: System.Collections.IDictionary;
          SyncRoot: System.Object;
          Values: System.Collections.ICollection;
          Add: ((key: System.Object, value: System.Object) => void);
          Clear: (() => void);
          Contains: ((key: System.Object) => boolean);
          CopyTo: ((array: System.Array, index: number) => void);
          GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
          Remove: ((key: System.Object) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class BaseChannelWithProperties {
          Properties: System.Collections.IDictionary;
          Count: number;
          IsFixedSize: boolean;
          IsReadOnly: boolean;
          IsSynchronized: boolean;
          Keys: System.Collections.ICollection;
          SyncRoot: System.Object;
          Values: System.Collections.ICollection;
          Add: ((key: System.Object, value: System.Object) => void);
          Clear: (() => void);
          Contains: ((key: System.Object) => boolean);
          CopyTo: ((array: System.Array, index: number) => void);
          GetEnumerator: (() => System.Collections.IDictionaryEnumerator);
          Remove: ((key: System.Object) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ChannelDataStore {
          constructor(channelURIs: string[]);
          ChannelUris: string[];
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ChannelServices {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ClientChannelSinkStack {
          constructor();
          constructor(replySink: System.Runtime.Remoting.Messaging.IMessageSink);
          AsyncProcessResponse: ((headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          DispatchException: ((e: System.Exception) => void);
          DispatchReplyMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage) => void);
          Pop: ((sink: System.Runtime.Remoting.Channels.IClientChannelSink) => System.Object);
          Push: ((sink: System.Runtime.Remoting.Channels.IClientChannelSink, state: System.Object) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class IChannel {
          ChannelName: string;
          ChannelPriority: number;
        }
        export declare class IChannelDataStore {
          ChannelUris: string[];
        }
        export declare class IChannelReceiver {
          ChannelData: System.Object;
          GetUrlsForUri: ((objectURI: string) => string[]);
          StartListening: ((data: System.Object) => void);
          StopListening: ((data: System.Object) => void);
        }
        export declare class IChannelReceiverHook {
          ChannelScheme: string;
          ChannelSinkChain: System.Runtime.Remoting.Channels.IServerChannelSink;
          WantsToListen: boolean;
          AddHookChannelUri: ((channelUri: string) => void);
        }
        export declare class IChannelSender {
        }
        export declare class IChannelSinkBase {
          Properties: System.Collections.IDictionary;
        }
        export declare class IClientChannelSink {
          NextChannelSink: System.Runtime.Remoting.Channels.IClientChannelSink;
          AsyncProcessRequest: ((sinkStack: System.Runtime.Remoting.Channels.IClientChannelSinkStack, msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          AsyncProcessResponse: ((sinkStack: System.Runtime.Remoting.Channels.IClientResponseChannelSinkStack, state: System.Object, headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          GetRequestStream: ((msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders) => System.IO.Stream);
        }
        export declare class IClientChannelSinkProvider {
          Next: System.Runtime.Remoting.Channels.IClientChannelSinkProvider;
          CreateSink: ((channel: System.Runtime.Remoting.Channels.IChannelSender, url: string, remoteChannelData: System.Object) => System.Runtime.Remoting.Channels.IClientChannelSink);
        }
        export declare class IClientChannelSinkStack {
          Pop: ((sink: System.Runtime.Remoting.Channels.IClientChannelSink) => System.Object);
          Push: ((sink: System.Runtime.Remoting.Channels.IClientChannelSink, state: System.Object) => void);
        }
        export declare class IClientFormatterSink {
        }
        export declare class IClientFormatterSinkProvider {
        }
        export declare class IClientResponseChannelSinkStack {
          AsyncProcessResponse: ((headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          DispatchException: ((e: System.Exception) => void);
          DispatchReplyMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage) => void);
        }
        export declare class ISecurableChannel {
          IsSecured: boolean;
        }
        export declare class IServerChannelSink {
          NextChannelSink: System.Runtime.Remoting.Channels.IServerChannelSink;
          AsyncProcessResponse: ((sinkStack: System.Runtime.Remoting.Channels.IServerResponseChannelSinkStack, state: System.Object, msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          GetResponseStream: ((sinkStack: System.Runtime.Remoting.Channels.IServerResponseChannelSinkStack, state: System.Object, msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders) => System.IO.Stream);
        }
        export declare class IServerChannelSinkProvider {
          Next: System.Runtime.Remoting.Channels.IServerChannelSinkProvider;
          CreateSink: ((channel: System.Runtime.Remoting.Channels.IChannelReceiver) => System.Runtime.Remoting.Channels.IServerChannelSink);
          GetChannelData: ((channelData: System.Runtime.Remoting.Channels.IChannelDataStore) => void);
        }
        export declare class IServerChannelSinkStack {
          Pop: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink) => System.Object);
          Push: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
          ServerCallback: ((ar: System.IAsyncResult) => void);
          Store: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
          StoreAndDispatch: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
        }
        export declare class IServerFormatterSinkProvider {
        }
        export declare class IServerResponseChannelSinkStack {
          AsyncProcessResponse: ((msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          GetResponseStream: ((msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders) => System.IO.Stream);
        }
        export declare class ITransportHeaders {
          GetEnumerator: (() => System.Collections.IEnumerator);
        }
        export declare class ServerChannelSinkStack {
          constructor();
          GetResponseStream: ((msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders) => System.IO.Stream);
          Pop: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink) => System.Object);
          Push: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
          ServerCallback: ((ar: System.IAsyncResult) => void);
          Store: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
          StoreAndDispatch: ((sink: System.Runtime.Remoting.Channels.IServerChannelSink, state: System.Object) => void);
          AsyncProcessResponse: ((msg: System.Runtime.Remoting.Messaging.IMessage, headers: System.Runtime.Remoting.Channels.ITransportHeaders, stream: System.IO.Stream) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export enum ServerProcessing {
          Complete = 0,
          OneWay = 1,
          Async = 2,
        }
        export declare class SinkProviderData {
          constructor(name: string);
          Children: System.Collections.IList;
          Name: string;
          Properties: System.Collections.IDictionary;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class TransportHeaders {
          constructor();
          GetEnumerator: (() => System.Collections.IEnumerator);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
      export namespace Contexts {
        export declare class Context {
          constructor();
          ContextID: number;
          ContextProperties: System.Runtime.Remoting.Contexts.IContextProperty[];
          GetProperty: ((name: string) => System.Runtime.Remoting.Contexts.IContextProperty);
          SetProperty: ((prop: System.Runtime.Remoting.Contexts.IContextProperty) => void);
          Freeze: (() => void);
          ToString: (() => string);
          DoCallBack: ((deleg: System.Runtime.Remoting.Contexts.CrossContextDelegate) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
        }
        export declare class ContextProperty {
          Name: string;
          Property: System.Object;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class CrossContextDelegate {
          constructor(object: System.Object, method: System.IntPtr);
          Method: System.Reflection.MethodInfo;
          Target: System.Object;
          Invoke: (() => void);
          BeginInvoke: ((callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
          EndInvoke: ((result: System.IAsyncResult) => void);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetInvocationList: (() => System.Delegate[]);
          DynamicInvoke: ((args: System.Object[]) => System.Object);
          Clone: (() => System.Object);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class IContextAttribute {
          GetPropertiesForNewContext: ((msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => void);
          IsContextOK: ((ctx: System.Runtime.Remoting.Contexts.Context, msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => boolean);
        }
        export declare class IContextProperty {
          Name: string;
          Freeze: ((newContext: System.Runtime.Remoting.Contexts.Context) => void);
          IsNewContextOK: ((newCtx: System.Runtime.Remoting.Contexts.Context) => boolean);
        }
        export declare class IContextPropertyActivator {
          CollectFromClientContext: ((msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => void);
          CollectFromServerContext: ((msg: System.Runtime.Remoting.Activation.IConstructionReturnMessage) => void);
          DeliverClientContextToServerContext: ((msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => boolean);
          DeliverServerContextToClientContext: ((msg: System.Runtime.Remoting.Activation.IConstructionReturnMessage) => boolean);
          IsOKToActivate: ((msg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => boolean);
        }
        export declare class IContributeClientContextSink {
          GetClientContextSink: ((nextSink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageSink);
        }
        export declare class IContributeDynamicSink {
          GetDynamicSink: (() => System.Runtime.Remoting.Contexts.IDynamicMessageSink);
        }
        export declare class IContributeEnvoySink {
          GetEnvoySink: ((obj: System.MarshalByRefObject, nextSink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageSink);
        }
        export declare class IContributeObjectSink {
          GetObjectSink: ((obj: System.MarshalByRefObject, nextSink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageSink);
        }
        export declare class IContributeServerContextSink {
          GetServerContextSink: ((nextSink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageSink);
        }
        export declare class IDynamicMessageSink {
          ProcessMessageFinish: ((replyMsg: System.Runtime.Remoting.Messaging.IMessage, bCliSide: boolean, bAsync: boolean) => void);
          ProcessMessageStart: ((reqMsg: System.Runtime.Remoting.Messaging.IMessage, bCliSide: boolean, bAsync: boolean) => void);
        }
        export declare class IDynamicProperty {
          Name: string;
        }
      }
      export namespace Lifetime {
        export declare class ClientSponsor {
          constructor();
          constructor(renewalTime: System.TimeSpan);
          RenewalTime: System.TimeSpan;
          Close: (() => void);
          InitializeLifetimeService: (() => System.Object);
          Register: ((obj: System.MarshalByRefObject) => boolean);
          Renewal: ((lease: System.Runtime.Remoting.Lifetime.ILease) => System.TimeSpan);
          Unregister: ((obj: System.MarshalByRefObject) => void);
          CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
          GetLifetimeService: (() => System.Object);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ILease {
          CurrentLeaseTime: System.TimeSpan;
          CurrentState: System.Runtime.Remoting.Lifetime.LeaseState;
          InitialLeaseTime: System.TimeSpan;
          RenewOnCallTime: System.TimeSpan;
          SponsorshipTimeout: System.TimeSpan;
          Register: ((obj: System.Runtime.Remoting.Lifetime.ISponsor) => void) | ((obj: System.Runtime.Remoting.Lifetime.ISponsor, renewalTime: System.TimeSpan) => void);
          Renew: ((renewalTime: System.TimeSpan) => System.TimeSpan);
          Unregister: ((obj: System.Runtime.Remoting.Lifetime.ISponsor) => void);
        }
        export declare class ISponsor {
          Renewal: ((lease: System.Runtime.Remoting.Lifetime.ILease) => System.TimeSpan);
        }
        export enum LeaseState {
          Null = 0,
          Initial = 1,
          Active = 2,
          Renewing = 3,
          Expired = 4,
        }
        export declare class LifetimeServices {
          constructor();
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
      export namespace Messaging {
        export declare class CallContext {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ILogicalThreadAffinative {
        }
        export declare class LogicalCallContext {
          HasInfo: boolean;
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          Clone: (() => System.Object);
          FreeNamedDataSlot: ((name: string) => void);
          GetData: ((name: string) => System.Object);
          SetData: ((name: string, data: System.Object) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class AsyncResult {
          AsyncState: System.Object;
          AsyncWaitHandle: System.Threading.WaitHandle;
          CompletedSynchronously: boolean;
          IsCompleted: boolean;
          EndInvokeCalled: boolean;
          AsyncDelegate: System.Object;
          NextSink: System.Runtime.Remoting.Messaging.IMessageSink;
          AsyncProcessMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage, replySink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageCtrl);
          GetReplyMessage: (() => System.Runtime.Remoting.Messaging.IMessage);
          SetMessageCtrl: ((mc: System.Runtime.Remoting.Messaging.IMessageCtrl) => void);
          SyncProcessMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage) => System.Runtime.Remoting.Messaging.IMessage);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ConstructionCall {
          constructor(m: System.Runtime.Remoting.Messaging.IMessage);
          constructor(headers: System.Runtime.Remoting.Messaging.Header[]);
          ActivationType: System.Type;
          ActivationTypeName: string;
          Activator: System.Runtime.Remoting.Activation.IActivator;
          CallSiteActivationAttributes: System.Object[];
          ContextProperties: System.Collections.IList;
          Properties: System.Collections.IDictionary;
          ArgCount: number;
          Args: System.Object[];
          HasVarArgs: boolean;
          InArgCount: number;
          InArgs: System.Object[];
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          TypeName: string;
          Uri: string;
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetInArg: ((argNum: number) => System.Object);
          GetInArgName: ((index: number) => string);
          HeaderHandler: ((h: System.Runtime.Remoting.Messaging.Header[]) => System.Object);
          Init: (() => void);
          ResolveMethod: (() => void);
          RootSetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, ctx: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ConstructionResponse {
          constructor(h: System.Runtime.Remoting.Messaging.Header[], mcm: System.Runtime.Remoting.Messaging.IMethodCallMessage);
          Properties: System.Collections.IDictionary;
          ArgCount: number;
          Args: System.Object[];
          Exception: System.Exception;
          HasVarArgs: boolean;
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          OutArgCount: number;
          OutArgs: System.Object[];
          ReturnValue: System.Object;
          TypeName: string;
          Uri: string;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          GetOutArg: ((argNum: number) => System.Object);
          GetOutArgName: ((index: number) => string);
          HeaderHandler: ((h: System.Runtime.Remoting.Messaging.Header[]) => System.Object);
          RootSetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, ctx: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class Header {
          constructor(_Name: string, _Value: System.Object);
          constructor(_Name: string, _Value: System.Object, _MustUnderstand: boolean);
          constructor(_Name: string, _Value: System.Object, _MustUnderstand: boolean, _HeaderNamespace: string);
          HeaderNamespace: string;
          MustUnderstand: boolean;
          Name: string;
          Value: System.Object;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class HeaderHandler {
          constructor(object: System.Object, method: System.IntPtr);
          Method: System.Reflection.MethodInfo;
          Target: System.Object;
          Invoke: ((headers: System.Runtime.Remoting.Messaging.Header[]) => System.Object);
          BeginInvoke: ((headers: System.Runtime.Remoting.Messaging.Header[], callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
          EndInvoke: ((result: System.IAsyncResult) => System.Object);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetInvocationList: (() => System.Delegate[]);
          DynamicInvoke: ((args: System.Object[]) => System.Object);
          Clone: (() => System.Object);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class IMessage {
          Properties: System.Collections.IDictionary;
        }
        export declare class IMessageCtrl {
          Cancel: ((msToCancel: number) => void);
        }
        export declare class IMessageSink {
          NextSink: System.Runtime.Remoting.Messaging.IMessageSink;
          SyncProcessMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage) => System.Runtime.Remoting.Messaging.IMessage);
          AsyncProcessMessage: ((msg: System.Runtime.Remoting.Messaging.IMessage, replySink: System.Runtime.Remoting.Messaging.IMessageSink) => System.Runtime.Remoting.Messaging.IMessageCtrl);
        }
        export declare class IMethodCallMessage {
          InArgCount: number;
          InArgs: System.Object[];
          GetInArg: ((argNum: number) => System.Object);
          GetInArgName: ((index: number) => string);
        }
        export declare class IMethodMessage {
          ArgCount: number;
          Args: System.Object[];
          HasVarArgs: boolean;
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          TypeName: string;
          Uri: string;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
        }
        export declare class IMethodReturnMessage {
          Exception: System.Exception;
          OutArgCount: number;
          OutArgs: System.Object[];
          ReturnValue: System.Object;
          GetOutArg: ((argNum: number) => System.Object);
          GetOutArgName: ((index: number) => string);
        }
        export declare class IRemotingFormatter {
          Deserialize: ((serializationStream: System.IO.Stream, handler: System.Runtime.Remoting.Messaging.HeaderHandler) => System.Object);
          Serialize: ((serializationStream: System.IO.Stream, graph: System.Object, headers: System.Runtime.Remoting.Messaging.Header[]) => void);
        }
        export declare class InternalMessageWrapper {
          constructor(msg: System.Runtime.Remoting.Messaging.IMessage);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class MessageSurrogateFilter {
          constructor(object: System.Object, method: System.IntPtr);
          Method: System.Reflection.MethodInfo;
          Target: System.Object;
          Invoke: ((key: string, value: System.Object) => boolean);
          BeginInvoke: ((key: string, value: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
          EndInvoke: ((result: System.IAsyncResult) => boolean);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetInvocationList: (() => System.Delegate[]);
          DynamicInvoke: ((args: System.Object[]) => System.Object);
          Clone: (() => System.Object);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class MethodCall {
          constructor(h1: System.Runtime.Remoting.Messaging.Header[]);
          constructor(msg: System.Runtime.Remoting.Messaging.IMessage);
          ArgCount: number;
          Args: System.Object[];
          HasVarArgs: boolean;
          InArgCount: number;
          InArgs: System.Object[];
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          Properties: System.Collections.IDictionary;
          TypeName: string;
          Uri: string;
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetInArg: ((argNum: number) => System.Object);
          GetInArgName: ((index: number) => string);
          HeaderHandler: ((h: System.Runtime.Remoting.Messaging.Header[]) => System.Object);
          Init: (() => void);
          ResolveMethod: (() => void);
          RootSetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, ctx: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class MethodCallMessageWrapper {
          constructor(msg: System.Runtime.Remoting.Messaging.IMethodCallMessage);
          ArgCount: number;
          Args: System.Object[];
          HasVarArgs: boolean;
          InArgCount: number;
          InArgs: System.Object[];
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          Properties: System.Collections.IDictionary;
          TypeName: string;
          Uri: string;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetInArg: ((argNum: number) => System.Object);
          GetInArgName: ((index: number) => string);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class MethodResponse {
          constructor(h1: System.Runtime.Remoting.Messaging.Header[], mcm: System.Runtime.Remoting.Messaging.IMethodCallMessage);
          ArgCount: number;
          Args: System.Object[];
          Exception: System.Exception;
          HasVarArgs: boolean;
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          OutArgCount: number;
          OutArgs: System.Object[];
          Properties: System.Collections.IDictionary;
          ReturnValue: System.Object;
          TypeName: string;
          Uri: string;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          GetOutArg: ((argNum: number) => System.Object);
          GetOutArgName: ((index: number) => string);
          HeaderHandler: ((h: System.Runtime.Remoting.Messaging.Header[]) => System.Object);
          RootSetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, ctx: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class MethodReturnMessageWrapper {
          constructor(msg: System.Runtime.Remoting.Messaging.IMethodReturnMessage);
          ArgCount: number;
          Args: System.Object[];
          Exception: System.Exception;
          HasVarArgs: boolean;
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          OutArgCount: number;
          OutArgs: System.Object[];
          Properties: System.Collections.IDictionary;
          ReturnValue: System.Object;
          TypeName: string;
          Uri: string;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetOutArg: ((argNum: number) => System.Object);
          GetOutArgName: ((index: number) => string);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class RemotingSurrogateSelector {
          constructor();
          Filter: System.Runtime.Remoting.Messaging.MessageSurrogateFilter;
          ChainSelector: ((selector: System.Runtime.Serialization.ISurrogateSelector) => void);
          GetNextSelector: (() => System.Runtime.Serialization.ISurrogateSelector);
          GetRootObject: (() => System.Object);
          SetRootObject: ((obj: System.Object) => void);
          UseSoapFormat: (() => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ReturnMessage {
          constructor(ret: System.Object, outArgs: System.Object[], outArgsCount: number, callCtx: System.Runtime.Remoting.Messaging.LogicalCallContext, mcm: System.Runtime.Remoting.Messaging.IMethodCallMessage);
          constructor(e: System.Exception, mcm: System.Runtime.Remoting.Messaging.IMethodCallMessage);
          ArgCount: number;
          Args: System.Object[];
          HasVarArgs: boolean;
          LogicalCallContext: System.Runtime.Remoting.Messaging.LogicalCallContext;
          MethodBase: System.Reflection.MethodBase;
          MethodName: string;
          MethodSignature: System.Object;
          Properties: System.Collections.IDictionary;
          TypeName: string;
          Uri: string;
          Exception: System.Exception;
          OutArgCount: number;
          OutArgs: System.Object[];
          ReturnValue: System.Object;
          GetArg: ((argNum: number) => System.Object);
          GetArgName: ((index: number) => string);
          GetOutArg: ((argNum: number) => System.Object);
          GetOutArgName: ((index: number) => string);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
      export namespace Metadata {
        export enum SoapOption {
          None = 0,
          AlwaysIncludeTypes = 1,
          XsdString = 2,
          EmbedAll = 4,
          Option1 = 8,
          Option2 = 16,
        }
        export enum XmlFieldOrderOption {
          All = 0,
          Sequence = 1,
          Choice = 2,
        }
        export namespace W3cXsd2001 {
          export declare class ISoapXsd {
            GetXsdType: (() => string);
          }
          export declare class SoapAnyUri {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapBase64Binary {
            constructor();
            constructor(value: System.Byte[]);
            Value: System.Byte[];
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapDate {
            constructor();
            constructor(value: System.DateTime);
            constructor(value: System.DateTime, sign: number);
            Sign: number;
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapDateTime {
            constructor();
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
            ToString: (() => string);
          }
          export declare class SoapDay {
            constructor();
            constructor(value: System.DateTime);
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapDuration {
            constructor();
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
            ToString: (() => string);
          }
          export declare class SoapEntities {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapEntity {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapHexBinary {
            constructor();
            constructor(value: System.Byte[]);
            Value: System.Byte[];
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapId {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapIdref {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapIdrefs {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapInteger {
            constructor();
            constructor(value: System.Decimal);
            Value: System.Decimal;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapLanguage {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapMonth {
            constructor();
            constructor(value: System.DateTime);
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapMonthDay {
            constructor();
            constructor(value: System.DateTime);
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapName {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNcName {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNegativeInteger {
            constructor();
            constructor(value: System.Decimal);
            Value: System.Decimal;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNmtoken {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNmtokens {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNonNegativeInteger {
            constructor();
            constructor(value: System.Decimal);
            Value: System.Decimal;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNonPositiveInteger {
            constructor();
            constructor(value: System.Decimal);
            Value: System.Decimal;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNormalizedString {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapNotation {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapPositiveInteger {
            constructor();
            constructor(value: System.Decimal);
            Value: System.Decimal;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapQName {
            constructor();
            constructor(value: string);
            constructor(key: string, name: string);
            constructor(key: string, name: string, namespaceValue: string);
            Key: string;
            Name: string;
            Namespace: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapTime {
            constructor();
            constructor(value: System.DateTime);
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapToken {
            constructor();
            constructor(value: string);
            Value: string;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapYear {
            constructor();
            constructor(value: System.DateTime);
            constructor(value: System.DateTime, sign: number);
            Sign: number;
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
          export declare class SoapYearMonth {
            constructor();
            constructor(value: System.DateTime);
            constructor(value: System.DateTime, sign: number);
            Sign: number;
            Value: System.DateTime;
            GetXsdType: (() => string);
            ToString: (() => string);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
          }
        }
      }
      export namespace Proxies {
        export declare class RealProxy {
          GetProxiedType: (() => System.Type);
          CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          GetCOMIUnknown: ((fIsMarshalled: boolean) => System.IntPtr);
          SetCOMIUnknown: ((i: System.IntPtr) => void);
          Invoke: ((msg: System.Runtime.Remoting.Messaging.IMessage) => System.Runtime.Remoting.Messaging.IMessage);
          GetTransparentProxy: (() => System.Object);
          InitializeServerObject: ((ctorMsg: System.Runtime.Remoting.Activation.IConstructionCallMessage) => System.Runtime.Remoting.Activation.IConstructionReturnMessage);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
      export namespace Services {
        export declare class EnterpriseServicesHelper {
          constructor();
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ITrackingHandler {
          DisconnectedObject: ((obj: System.Object) => void);
          MarshaledObject: ((obj: System.Object, or: System.Runtime.Remoting.ObjRef) => void);
          UnmarshaledObject: ((obj: System.Object, or: System.Runtime.Remoting.ObjRef) => void);
        }
        export declare class TrackingServices {
          constructor();
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
      }
    }
    export namespace Serialization {
      export declare class Formatter {
        SurrogateSelector: System.Runtime.Serialization.ISurrogateSelector;
        Binder: System.Runtime.Serialization.SerializationBinder;
        Context: System.Runtime.Serialization.StreamingContext;
        Deserialize: ((serializationStream: System.IO.Stream) => System.Object);
        Serialize: ((serializationStream: System.IO.Stream, graph: System.Object) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FormatterConverter {
        constructor();
        Convert: ((value: System.Object, type: System.Type) => System.Object) | ((value: System.Object, typeCode: System.TypeCode) => System.Object);
        ToBoolean: ((value: System.Object) => boolean);
        ToChar: ((value: System.Object) => System.Char);
        ToSByte: ((value: System.Object) => System.SByte);
        ToByte: ((value: System.Object) => System.Byte);
        ToInt16: ((value: System.Object) => System.Int16);
        ToUInt16: ((value: System.Object) => System.UInt16);
        ToInt32: ((value: System.Object) => number);
        ToUInt32: ((value: System.Object) => System.UInt32);
        ToInt64: ((value: System.Object) => System.Int64);
        ToUInt64: ((value: System.Object) => System.UInt64);
        ToSingle: ((value: System.Object) => number);
        ToDouble: ((value: System.Object) => number);
        ToDecimal: ((value: System.Object) => System.Decimal);
        ToDateTime: ((value: System.Object) => System.DateTime);
        ToString: ((value: System.Object) => string) | (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class FormatterServices {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IDeserializationCallback {
        OnDeserialization: ((sender: System.Object) => void);
      }
      export declare class IFormatter {
        SurrogateSelector: System.Runtime.Serialization.ISurrogateSelector;
        Binder: System.Runtime.Serialization.SerializationBinder;
        Context: System.Runtime.Serialization.StreamingContext;
        Deserialize: ((serializationStream: System.IO.Stream) => System.Object);
        Serialize: ((serializationStream: System.IO.Stream, graph: System.Object) => void);
      }
      export declare class IFormatterConverter {
        Convert: ((value: System.Object, type: System.Type) => System.Object) | ((value: System.Object, typeCode: System.TypeCode) => System.Object);
        ToBoolean: ((value: System.Object) => boolean);
        ToChar: ((value: System.Object) => System.Char);
        ToSByte: ((value: System.Object) => System.SByte);
        ToByte: ((value: System.Object) => System.Byte);
        ToInt16: ((value: System.Object) => System.Int16);
        ToUInt16: ((value: System.Object) => System.UInt16);
        ToInt32: ((value: System.Object) => number);
        ToUInt32: ((value: System.Object) => System.UInt32);
        ToInt64: ((value: System.Object) => System.Int64);
        ToUInt64: ((value: System.Object) => System.UInt64);
        ToSingle: ((value: System.Object) => number);
        ToDouble: ((value: System.Object) => number);
        ToDecimal: ((value: System.Object) => System.Decimal);
        ToDateTime: ((value: System.Object) => System.DateTime);
        ToString: ((value: System.Object) => string);
      }
      export declare class IObjectReference {
        GetRealObject: ((context: System.Runtime.Serialization.StreamingContext) => System.Object);
      }
      export declare class ISerializable {
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      }
      export declare class ISerializationSurrogate {
        GetObjectData: ((obj: System.Object, info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        SetObjectData: ((obj: System.Object, info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext, selector: System.Runtime.Serialization.ISurrogateSelector) => System.Object);
      }
      export declare class ISurrogateSelector {
        ChainSelector: ((selector: System.Runtime.Serialization.ISurrogateSelector) => void);
        GetNextSelector: (() => System.Runtime.Serialization.ISurrogateSelector);
      }
      export declare class ObjectIDGenerator {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjectManager {
        constructor(selector: System.Runtime.Serialization.ISurrogateSelector, context: System.Runtime.Serialization.StreamingContext);
        GetObject: ((objectID: System.Int64) => System.Object);
        RegisterObject: ((obj: System.Object, objectID: System.Int64) => void) | ((obj: System.Object, objectID: System.Int64, info: System.Runtime.Serialization.SerializationInfo) => void) | ((obj: System.Object, objectID: System.Int64, info: System.Runtime.Serialization.SerializationInfo, idOfContainingObj: System.Int64, member: System.Reflection.MemberInfo) => void) | ((obj: System.Object, objectID: System.Int64, info: System.Runtime.Serialization.SerializationInfo, idOfContainingObj: System.Int64, member: System.Reflection.MemberInfo, arrayIndex: number[]) => void);
        DoFixups: (() => void);
        RecordFixup: ((objectToBeFixed: System.Int64, member: System.Reflection.MemberInfo, objectRequired: System.Int64) => void);
        RecordDelayedFixup: ((objectToBeFixed: System.Int64, memberName: string, objectRequired: System.Int64) => void);
        RecordArrayElementFixup: ((arrayToBeFixed: System.Int64, index: number, objectRequired: System.Int64) => void) | ((arrayToBeFixed: System.Int64, indices: number[], objectRequired: System.Int64) => void);
        RaiseDeserializationEvent: (() => void);
        RaiseOnDeserializingEvent: ((obj: System.Object) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SafeSerializationEventArgs {
        StreamingContext: System.Runtime.Serialization.StreamingContext;
        AddSerializedState: ((serializedState: System.Runtime.Serialization.ISafeSerializationData) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ISafeSerializationData {
        CompleteDeserialization: ((deserialized: System.Object) => void);
      }
      export declare class SerializationBinder {
        BindToType: ((assemblyName: string, typeName: string) => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SerializationException {
        constructor();
        constructor(message: string);
        constructor(message: string, innerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class SerializationInfo {
        constructor(type: System.Type, converter: System.Runtime.Serialization.IFormatterConverter);
        constructor(type: System.Type, converter: System.Runtime.Serialization.IFormatterConverter, requireSameTokenInPartialTrust: boolean);
        FullTypeName: string;
        AssemblyName: string;
        MemberCount: number;
        ObjectType: System.Type;
        IsFullTypeNameSetExplicit: boolean;
        IsAssemblyNameSetExplicit: boolean;
        SetType: ((type: System.Type) => void);
        GetEnumerator: (() => System.Runtime.Serialization.SerializationInfoEnumerator);
        AddValue: ((name: string, value: System.Object, type: System.Type) => void) | ((name: string, value: System.Object) => void) | ((name: string, value: boolean) => void) | ((name: string, value: System.Char) => void) | ((name: string, value: System.SByte) => void) | ((name: string, value: System.Byte) => void) | ((name: string, value: System.Int16) => void) | ((name: string, value: System.UInt16) => void) | ((name: string, value: number) => void) | ((name: string, value: System.UInt32) => void) | ((name: string, value: System.Int64) => void) | ((name: string, value: System.UInt64) => void) | ((name: string, value: number) => void) | ((name: string, value: number) => void) | ((name: string, value: System.Decimal) => void) | ((name: string, value: System.DateTime) => void);
        GetValue: ((name: string, type: System.Type) => System.Object);
        GetBoolean: ((name: string) => boolean);
        GetChar: ((name: string) => System.Char);
        GetSByte: ((name: string) => System.SByte);
        GetByte: ((name: string) => System.Byte);
        GetInt16: ((name: string) => System.Int16);
        GetUInt16: ((name: string) => System.UInt16);
        GetInt32: ((name: string) => number);
        GetUInt32: ((name: string) => System.UInt32);
        GetInt64: ((name: string) => System.Int64);
        GetUInt64: ((name: string) => System.UInt64);
        GetSingle: ((name: string) => number);
        GetDouble: ((name: string) => number);
        GetDecimal: ((name: string) => System.Decimal);
        GetDateTime: ((name: string) => System.DateTime);
        GetString: ((name: string) => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SerializationEntry {
        Value: System.Object;
        Name: string;
        ObjectType: System.Type;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class SerializationInfoEnumerator {
        Current: System.Runtime.Serialization.SerializationEntry;
        Name: string;
        Value: System.Object;
        ObjectType: System.Type;
        MoveNext: (() => boolean);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SerializationObjectManager {
        constructor(context: System.Runtime.Serialization.StreamingContext);
        RegisterObject: ((obj: System.Object) => void);
        RaiseOnSerializedEvent: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class StreamingContext {
        constructor(state: System.Runtime.Serialization.StreamingContextStates);
        constructor(state: System.Runtime.Serialization.StreamingContextStates, additional: System.Object);
        Context: System.Object;
        State: System.Runtime.Serialization.StreamingContextStates;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum StreamingContextStates {
        CrossProcess = 1,
        CrossMachine = 2,
        File = 4,
        Persistence = 8,
        Remoting = 16,
        Other = 32,
        Clone = 64,
        CrossAppDomain = 128,
        All = 255,
      }
      export declare class SurrogateSelector {
        constructor();
        AddSurrogate: ((type: System.Type, context: System.Runtime.Serialization.StreamingContext, surrogate: System.Runtime.Serialization.ISerializationSurrogate) => void);
        ChainSelector: ((selector: System.Runtime.Serialization.ISurrogateSelector) => void);
        GetNextSelector: (() => System.Runtime.Serialization.ISurrogateSelector);
        RemoveSurrogate: ((type: System.Type, context: System.Runtime.Serialization.StreamingContext) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export namespace Formatters {
        export enum FormatterTypeStyle {
          TypesWhenNeeded = 0,
          TypesAlways = 1,
          XsdString = 2,
        }
        export enum FormatterAssemblyStyle {
          Simple = 0,
          Full = 1,
        }
        export enum TypeFilterLevel {
          Low = 2,
          Full = 3,
        }
        export declare class IFieldInfo {
          FieldNames: string[];
          FieldTypes: System.Type[];
        }
        export declare class ISoapMessage {
          ParamNames: string[];
          ParamValues: System.Object[];
          ParamTypes: System.Type[];
          MethodName: string;
          XmlNameSpace: string;
          Headers: System.Runtime.Remoting.Messaging.Header[];
        }
        export declare class InternalRM {
          constructor();
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class InternalST {
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class SoapFault {
          constructor();
          constructor(faultCode: string, faultString: string, faultActor: string, serverFault: System.Runtime.Serialization.Formatters.ServerFault);
          FaultCode: string;
          FaultString: string;
          FaultActor: string;
          Detail: System.Object;
          GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class ServerFault {
          constructor(exceptionType: string, message: string, stackTrace: string);
          ExceptionType: string;
          ExceptionMessage: string;
          StackTrace: string;
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export declare class SoapMessage {
          constructor();
          ParamNames: string[];
          ParamValues: System.Object[];
          ParamTypes: System.Type[];
          MethodName: string;
          XmlNameSpace: string;
          Headers: System.Runtime.Remoting.Messaging.Header[];
          Equals: ((obj: System.Object) => boolean);
          GetHashCode: (() => number);
          GetType: (() => System.Type);
          ToString: (() => string);
        }
        export namespace Binary {
          export declare class BinaryFormatter {
            constructor();
            constructor(selector: System.Runtime.Serialization.ISurrogateSelector, context: System.Runtime.Serialization.StreamingContext);
            TypeFormat: System.Runtime.Serialization.Formatters.FormatterTypeStyle;
            AssemblyFormat: System.Runtime.Serialization.Formatters.FormatterAssemblyStyle;
            FilterLevel: System.Runtime.Serialization.Formatters.TypeFilterLevel;
            SurrogateSelector: System.Runtime.Serialization.ISurrogateSelector;
            Binder: System.Runtime.Serialization.SerializationBinder;
            Context: System.Runtime.Serialization.StreamingContext;
            Deserialize: ((serializationStream: System.IO.Stream) => System.Object) | ((serializationStream: System.IO.Stream, handler: System.Runtime.Remoting.Messaging.HeaderHandler) => System.Object);
            DeserializeMethodResponse: ((serializationStream: System.IO.Stream, handler: System.Runtime.Remoting.Messaging.HeaderHandler, methodCallMessage: System.Runtime.Remoting.Messaging.IMethodCallMessage) => System.Object);
            UnsafeDeserialize: ((serializationStream: System.IO.Stream, handler: System.Runtime.Remoting.Messaging.HeaderHandler) => System.Object);
            UnsafeDeserializeMethodResponse: ((serializationStream: System.IO.Stream, handler: System.Runtime.Remoting.Messaging.HeaderHandler, methodCallMessage: System.Runtime.Remoting.Messaging.IMethodCallMessage) => System.Object);
            Serialize: ((serializationStream: System.IO.Stream, graph: System.Object) => void) | ((serializationStream: System.IO.Stream, graph: System.Object, headers: System.Runtime.Remoting.Messaging.Header[]) => void);
            Equals: ((obj: System.Object) => boolean);
            GetHashCode: (() => number);
            GetType: (() => System.Type);
            ToString: (() => string);
          }
        }
      }
    }
    export namespace Versioning {
      export enum ComponentGuaranteesOptions {
        None = 0,
        Exchange = 1,
        Stable = 2,
        SideBySide = 4,
      }
      export enum ResourceScope {
        None = 0,
        Machine = 1,
        Process = 2,
        AppDomain = 4,
        Library = 8,
        Private = 16,
        Assembly = 32,
      }
      export declare class VersioningHelper {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CompatibilitySwitch {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Security {
    export enum PartialTrustVisibilityLevel {
      VisibleToAllHosts = 0,
      NotVisibleByDefault = 1,
    }
    export enum SecurityCriticalScope {
      Explicit = 0,
      Everything = 1,
    }
    export enum SecurityRuleSet {
      None = 0,
      Level1 = 1,
      Level2 = 2,
    }
    export enum SecurityContextSource {
      CurrentAppDomain = 0,
      CurrentAssembly = 1,
    }
    export declare class SecurityContext {
      CreateCopy: (() => System.Security.SecurityContext);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CodeAccessPermission {
      Assert: (() => void);
      Copy: (() => System.Security.IPermission);
      Demand: (() => void);
      Deny: (() => void);
      Equals: ((obj: System.Object) => boolean);
      FromXml: ((elem: System.Security.SecurityElement) => void);
      GetHashCode: (() => number);
      Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
      IsSubsetOf: ((target: System.Security.IPermission) => boolean);
      ToString: (() => string);
      ToXml: (() => System.Security.SecurityElement);
      Union: ((other: System.Security.IPermission) => System.Security.IPermission);
      PermitOnly: (() => void);
      GetType: (() => System.Type);
    }
    export declare class HostProtectionException {
      constructor();
      constructor(message: string);
      constructor(message: string, e: System.Exception);
      constructor(message: string, protectedResources: System.Security.Permissions.HostProtectionResource, demandedResources: System.Security.Permissions.HostProtectionResource);
      DemandedResources: System.Security.Permissions.HostProtectionResource;
      ProtectedResources: System.Security.Permissions.HostProtectionResource;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      ToString: (() => string);
      GetBaseException: (() => System.Exception);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class HostSecurityManager {
      constructor();
      DomainPolicy: System.Security.Policy.PolicyLevel;
      Flags: System.Security.HostSecurityManagerOptions;
      DetermineApplicationTrust: ((applicationEvidence: System.Security.Policy.Evidence, activatorEvidence: System.Security.Policy.Evidence, context: System.Security.Policy.TrustManagerContext) => System.Security.Policy.ApplicationTrust);
      ProvideAppDomainEvidence: ((inputEvidence: System.Security.Policy.Evidence) => System.Security.Policy.Evidence);
      ProvideAssemblyEvidence: ((loadedAssembly: System.Reflection.Assembly, inputEvidence: System.Security.Policy.Evidence) => System.Security.Policy.Evidence);
      ResolvePolicy: ((evidence: System.Security.Policy.Evidence) => System.Security.PermissionSet);
      GenerateAppDomainEvidence: ((evidenceType: System.Type) => System.Security.Policy.EvidenceBase);
      GenerateAssemblyEvidence: ((evidenceType: System.Type, assembly: System.Reflection.Assembly) => System.Security.Policy.EvidenceBase);
      GetHostSuppliedAppDomainEvidenceTypes: (() => System.Type[]);
      GetHostSuppliedAssemblyEvidenceTypes: ((assembly: System.Reflection.Assembly) => System.Type[]);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum HostSecurityManagerOptions {
      None = 0,
      HostAppDomainEvidence = 1,
      HostPolicyLevel = 2,
      HostAssemblyEvidence = 4,
      HostDetermineApplicationTrust = 8,
      HostResolvePolicy = 16,
      AllFlags = 31,
    }
    export declare class IEvidenceFactory {
      Evidence: System.Security.Policy.Evidence;
    }
    export declare class IPermission {
      Copy: (() => System.Security.IPermission);
      Demand: (() => void);
      Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
      IsSubsetOf: ((target: System.Security.IPermission) => boolean);
      Union: ((target: System.Security.IPermission) => System.Security.IPermission);
    }
    export declare class ISecurityEncodable {
      FromXml: ((e: System.Security.SecurityElement) => void);
      ToXml: (() => System.Security.SecurityElement);
    }
    export declare class ISecurityPolicyEncodable {
      FromXml: ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
      ToXml: ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
    }
    export declare class IStackWalk {
      Assert: (() => void);
      Demand: (() => void);
      Deny: (() => void);
      PermitOnly: (() => void);
    }
    export declare class NamedPermissionSet {
      constructor(name: string, permSet: System.Security.PermissionSet);
      constructor(name: string, state: System.Security.Permissions.PermissionState);
      constructor(permSet: System.Security.NamedPermissionSet);
      constructor(name: string);
      Description: string;
      Name: string;
      Count: number;
      IsSynchronized: boolean;
      IsReadOnly: boolean;
      SyncRoot: System.Object;
      Copy: (() => System.Security.PermissionSet) | ((name: string) => System.Security.NamedPermissionSet);
      FromXml: ((et: System.Security.SecurityElement) => void);
      ToXml: (() => System.Security.SecurityElement);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      AddPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      Assert: (() => void);
      CopyTo: ((array: System.Array, index: number) => void);
      Demand: (() => void);
      Deny: (() => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      IsSubsetOf: ((target: System.Security.PermissionSet) => boolean);
      PermitOnly: (() => void);
      ContainsNonCodeAccessPermissions: (() => boolean);
      GetPermission: ((permClass: System.Type) => System.Security.IPermission);
      Intersect: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      IsEmpty: (() => boolean);
      IsUnrestricted: (() => boolean);
      RemovePermission: ((permClass: System.Type) => System.Security.IPermission);
      SetPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      ToString: (() => string);
      Union: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      GetType: (() => System.Type);
    }
    export declare class PermissionSet {
      constructor(state: System.Security.Permissions.PermissionState);
      constructor(permSet: System.Security.PermissionSet);
      Count: number;
      IsSynchronized: boolean;
      IsReadOnly: boolean;
      SyncRoot: System.Object;
      AddPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      Assert: (() => void);
      Copy: (() => System.Security.PermissionSet);
      CopyTo: ((array: System.Array, index: number) => void);
      Demand: (() => void);
      Deny: (() => void);
      FromXml: ((et: System.Security.SecurityElement) => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      IsSubsetOf: ((target: System.Security.PermissionSet) => boolean);
      PermitOnly: (() => void);
      ContainsNonCodeAccessPermissions: (() => boolean);
      GetPermission: ((permClass: System.Type) => System.Security.IPermission);
      Intersect: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      IsEmpty: (() => boolean);
      IsUnrestricted: (() => boolean);
      RemovePermission: ((permClass: System.Type) => System.Security.IPermission);
      SetPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      ToString: (() => string);
      ToXml: (() => System.Security.SecurityElement);
      Union: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export enum PolicyLevelType {
      User = 0,
      Machine = 1,
      Enterprise = 2,
      AppDomain = 3,
    }
    export declare class SecureString {
      constructor();
      Length: number;
      AppendChar: ((c: System.Char) => void);
      Clear: (() => void);
      Copy: (() => System.Security.SecureString);
      Dispose: (() => void);
      InsertAt: ((index: number, c: System.Char) => void);
      IsReadOnly: (() => boolean);
      MakeReadOnly: (() => void);
      RemoveAt: ((index: number) => void);
      SetAt: ((index: number, c: System.Char) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SecurityElement {
      constructor(tag: string);
      constructor(tag: string, text: string);
      Attributes: System.Collections.Hashtable;
      Children: System.Collections.ArrayList;
      Tag: string;
      Text: string;
      AddAttribute: ((name: string, value: string) => void);
      AddChild: ((child: System.Security.SecurityElement) => void);
      Attribute: ((name: string) => string);
      Copy: (() => System.Security.SecurityElement);
      Equal: ((other: System.Security.SecurityElement) => boolean);
      SearchForChildByTag: ((tag: string) => System.Security.SecurityElement);
      SearchForTextOfTag: ((tag: string) => string);
      ToString: (() => string);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class SecurityException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      constructor(message: string, type: System.Type);
      constructor(message: string, type: System.Type, state: string);
      constructor(message: string, deny: System.Object, permitOnly: System.Object, method: System.Reflection.MethodInfo, demanded: System.Object, permThatFailed: System.Security.IPermission);
      constructor(message: string, assemblyName: System.Reflection.AssemblyName, grant: System.Security.PermissionSet, refused: System.Security.PermissionSet, method: System.Reflection.MethodInfo, action: System.Security.Permissions.SecurityAction, demanded: System.Object, permThatFailed: System.Security.IPermission, evidence: System.Security.Policy.Evidence);
      Action: System.Security.Permissions.SecurityAction;
      DenySetInstance: System.Object;
      FailedAssemblyInfo: System.Reflection.AssemblyName;
      Method: System.Reflection.MethodInfo;
      PermitOnlySetInstance: System.Object;
      Url: string;
      Zone: System.Security.SecurityZone;
      Demanded: System.Object;
      FirstPermissionThatFailed: System.Security.IPermission;
      PermissionState: string;
      PermissionType: System.Type;
      GrantedSet: string;
      RefusedSet: string;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      ToString: (() => string);
      GetBaseException: (() => System.Exception);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class SecurityManager {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SecurityState {
      EnsureState: (() => void);
      IsStateAvailable: (() => boolean);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum SecurityZone {
      MyComputer = 0,
      Intranet = 1,
      Trusted = 2,
      Internet = 3,
      Untrusted = 4,
      NoZone = -1,
    }
    export declare class VerificationException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class XmlSyntaxException {
      constructor();
      constructor(lineNumber: number);
      constructor(lineNumber: number, message: string);
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
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class ReadOnlyPermissionSet {
      constructor(permissionSetXml: System.Security.SecurityElement);
      Count: number;
      IsSynchronized: boolean;
      IsReadOnly: boolean;
      SyncRoot: System.Object;
      AddPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      Assert: (() => void);
      Copy: (() => System.Security.PermissionSet);
      CopyTo: ((array: System.Array, index: number) => void);
      Demand: (() => void);
      Deny: (() => void);
      FromXml: ((et: System.Security.SecurityElement) => void);
      GetEnumerator: (() => System.Collections.IEnumerator);
      IsSubsetOf: ((target: System.Security.PermissionSet) => boolean);
      PermitOnly: (() => void);
      ContainsNonCodeAccessPermissions: (() => boolean);
      GetPermission: ((permClass: System.Type) => System.Security.IPermission);
      Intersect: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      IsEmpty: (() => boolean);
      IsUnrestricted: (() => boolean);
      RemovePermission: ((permClass: System.Type) => System.Security.IPermission);
      SetPermission: ((perm: System.Security.IPermission) => System.Security.IPermission);
      ToString: (() => string);
      ToXml: (() => System.Security.SecurityElement);
      Union: ((other: System.Security.PermissionSet) => System.Security.PermissionSet);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export namespace AccessControl {
      export enum AccessControlActions {
        None = 0,
        View = 1,
        Change = 2,
      }
      export enum AccessControlModification {
        Add = 0,
        Set = 1,
        Reset = 2,
        Remove = 3,
        RemoveAll = 4,
        RemoveSpecific = 5,
      }
      export enum AccessControlSections {
        None = 0,
        Audit = 1,
        Access = 2,
        Owner = 4,
        Group = 8,
        All = 15,
      }
      export enum AccessControlType {
        Allow = 0,
        Deny = 1,
      }
      export declare class AccessRule {
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AceEnumerator {
        Current: System.Security.AccessControl.GenericAce;
        MoveNext: (() => boolean);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum AceFlags {
        None = 0,
        ObjectInherit = 1,
        ContainerInherit = 2,
        NoPropagateInherit = 4,
        InheritOnly = 8,
        InheritanceFlags = 15,
        Inherited = 16,
        SuccessfulAccess = 64,
        FailedAccess = 128,
        AuditFlags = 192,
      }
      export enum AceQualifier {
        AccessAllowed = 0,
        AccessDenied = 1,
        SystemAudit = 2,
        SystemAlarm = 3,
      }
      export enum AceType {
        AccessAllowed = 0,
        AccessDenied = 1,
        SystemAudit = 2,
        SystemAlarm = 3,
        AccessAllowedCompound = 4,
        AccessAllowedObject = 5,
        AccessDeniedObject = 6,
        SystemAuditObject = 7,
        SystemAlarmObject = 8,
        AccessAllowedCallback = 9,
        AccessDeniedCallback = 10,
        AccessAllowedCallbackObject = 11,
        AccessDeniedCallbackObject = 12,
        SystemAuditCallback = 13,
        SystemAlarmCallback = 14,
        SystemAuditCallbackObject = 15,
        SystemAlarmCallbackObject = 16,
        MaxDefinedAceType = 16,
      }
      export enum AuditFlags {
        None = 0,
        Success = 1,
        Failure = 2,
      }
      export declare class AuditRule {
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AuthorizationRule {
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AuthorizationRuleCollection {
        constructor();
        Count: number;
        AddRule: ((rule: System.Security.AccessControl.AuthorizationRule) => void);
        CopyTo: ((rules: System.Security.AccessControl.AuthorizationRule[], index: number) => void);
        GetEnumerator: (() => System.Collections.IEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CommonAce {
        constructor(flags: System.Security.AccessControl.AceFlags, qualifier: System.Security.AccessControl.AceQualifier, accessMask: number, sid: System.Security.Principal.SecurityIdentifier, isCallback: boolean, opaque: System.Byte[]);
        BinaryLength: number;
        AceQualifier: System.Security.AccessControl.AceQualifier;
        IsCallback: boolean;
        OpaqueLength: number;
        AccessMask: number;
        SecurityIdentifier: System.Security.Principal.SecurityIdentifier;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetOpaque: (() => System.Byte[]);
        SetOpaque: ((opaque: System.Byte[]) => void);
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CommonAcl {
        BinaryLength: number;
        Count: number;
        IsCanonical: boolean;
        IsContainer: boolean;
        IsDS: boolean;
        Revision: System.Byte;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        Purge: ((sid: System.Security.Principal.SecurityIdentifier) => void);
        RemoveInheritedAces: (() => void);
        CopyTo: ((array: System.Security.AccessControl.GenericAce[], index: number) => void);
        GetEnumerator: (() => System.Security.AccessControl.AceEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CommonObjectSecurity {
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CommonSecurityDescriptor {
        constructor(isContainer: boolean, isDS: boolean, rawSecurityDescriptor: System.Security.AccessControl.RawSecurityDescriptor);
        constructor(isContainer: boolean, isDS: boolean, sddlForm: string);
        constructor(isContainer: boolean, isDS: boolean, binaryForm: System.Byte[], offset: number);
        constructor(isContainer: boolean, isDS: boolean, flags: System.Security.AccessControl.ControlFlags, owner: System.Security.Principal.SecurityIdentifier, group: System.Security.Principal.SecurityIdentifier, systemAcl: System.Security.AccessControl.SystemAcl, discretionaryAcl: System.Security.AccessControl.DiscretionaryAcl);
        ControlFlags: System.Security.AccessControl.ControlFlags;
        DiscretionaryAcl: System.Security.AccessControl.DiscretionaryAcl;
        Group: System.Security.Principal.SecurityIdentifier;
        IsContainer: boolean;
        IsDiscretionaryAclCanonical: boolean;
        IsDS: boolean;
        IsSystemAclCanonical: boolean;
        Owner: System.Security.Principal.SecurityIdentifier;
        SystemAcl: System.Security.AccessControl.SystemAcl;
        BinaryLength: number;
        PurgeAccessControl: ((sid: System.Security.Principal.SecurityIdentifier) => void);
        PurgeAudit: ((sid: System.Security.Principal.SecurityIdentifier) => void);
        SetDiscretionaryAclProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetSystemAclProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        AddDiscretionaryAcl: ((revision: System.Byte, trusted: number) => void);
        AddSystemAcl: ((revision: System.Byte, trusted: number) => void);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CompoundAce {
        constructor(flags: System.Security.AccessControl.AceFlags, accessMask: number, compoundAceType: System.Security.AccessControl.CompoundAceType, sid: System.Security.Principal.SecurityIdentifier);
        BinaryLength: number;
        CompoundAceType: System.Security.AccessControl.CompoundAceType;
        AccessMask: number;
        SecurityIdentifier: System.Security.Principal.SecurityIdentifier;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CompoundAceType {
        Impersonation = 1,
      }
      export enum ControlFlags {
        None = 0,
        OwnerDefaulted = 1,
        GroupDefaulted = 2,
        DiscretionaryAclPresent = 4,
        DiscretionaryAclDefaulted = 8,
        SystemAclPresent = 16,
        SystemAclDefaulted = 32,
        DiscretionaryAclUntrusted = 64,
        ServerSecurity = 128,
        DiscretionaryAclAutoInheritRequired = 256,
        SystemAclAutoInheritRequired = 512,
        DiscretionaryAclAutoInherited = 1024,
        SystemAclAutoInherited = 2048,
        DiscretionaryAclProtected = 4096,
        SystemAclProtected = 8192,
        RMControlValid = 16384,
        SelfRelative = 32768,
      }
      export declare class CryptoKeyAccessRule {
        constructor(identity: System.Security.Principal.IdentityReference, cryptoKeyRights: System.Security.AccessControl.CryptoKeyRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, cryptoKeyRights: System.Security.AccessControl.CryptoKeyRights, type: System.Security.AccessControl.AccessControlType);
        CryptoKeyRights: System.Security.AccessControl.CryptoKeyRights;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CryptoKeyAuditRule {
        constructor(identity: System.Security.Principal.IdentityReference, cryptoKeyRights: System.Security.AccessControl.CryptoKeyRights, flags: System.Security.AccessControl.AuditFlags);
        constructor(identity: string, cryptoKeyRights: System.Security.AccessControl.CryptoKeyRights, flags: System.Security.AccessControl.AuditFlags);
        CryptoKeyRights: System.Security.AccessControl.CryptoKeyRights;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CryptoKeyRights {
        ReadData = 1,
        WriteData = 2,
        ReadExtendedAttributes = 8,
        WriteExtendedAttributes = 16,
        ReadAttributes = 128,
        WriteAttributes = 256,
        Delete = 65536,
        ReadPermissions = 131072,
        ChangePermissions = 262144,
        TakeOwnership = 524288,
        Synchronize = 1048576,
        FullControl = 2032027,
        GenericAll = 268435456,
        GenericExecute = 536870912,
        GenericWrite = 1073741824,
        GenericRead = -2147483648,
      }
      export declare class CryptoKeySecurity {
        constructor();
        constructor(securityDescriptor: System.Security.AccessControl.CommonSecurityDescriptor);
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.CryptoKeyAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.CryptoKeyAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.CryptoKeyAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.CryptoKeyAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.CryptoKeyAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.CryptoKeyAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CustomAce {
        constructor(type: System.Security.AccessControl.AceType, flags: System.Security.AccessControl.AceFlags, opaque: System.Byte[]);
        BinaryLength: number;
        OpaqueLength: number;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetOpaque: (() => System.Byte[]);
        SetOpaque: ((opaque: System.Byte[]) => void);
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DirectoryObjectSecurity {
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType, objectType: System.Guid, inheritedObjectType: System.Guid) => System.Security.AccessControl.AccessRule) | ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => System.Security.AccessControl.AuditRule) | ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DirectorySecurity {
        constructor();
        constructor(name: string, includeSections: System.Security.AccessControl.AccessControlSections);
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DiscretionaryAcl {
        constructor(isContainer: boolean, isDS: boolean, capacity: number);
        constructor(isContainer: boolean, isDS: boolean, rawAcl: System.Security.AccessControl.RawAcl);
        constructor(isContainer: boolean, isDS: boolean, revision: System.Byte, capacity: number);
        BinaryLength: number;
        Count: number;
        IsCanonical: boolean;
        IsContainer: boolean;
        IsDS: boolean;
        Revision: System.Byte;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        AddAccess: ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAccessRule) => void);
        RemoveAccess: ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => boolean) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => boolean) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAccessRule) => boolean);
        RemoveAccessSpecific: ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAccessRule) => void);
        SetAccess: ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((accessType: System.Security.AccessControl.AccessControlType, sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAccessRule) => void);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        Purge: ((sid: System.Security.Principal.SecurityIdentifier) => void);
        RemoveInheritedAces: (() => void);
        CopyTo: ((array: System.Security.AccessControl.GenericAce[], index: number) => void);
        GetEnumerator: (() => System.Security.AccessControl.AceEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventWaitHandleAccessRule {
        constructor(identity: System.Security.Principal.IdentityReference, eventRights: System.Security.AccessControl.EventWaitHandleRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, eventRights: System.Security.AccessControl.EventWaitHandleRights, type: System.Security.AccessControl.AccessControlType);
        EventWaitHandleRights: System.Security.AccessControl.EventWaitHandleRights;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EventWaitHandleAuditRule {
        constructor(identity: System.Security.Principal.IdentityReference, eventRights: System.Security.AccessControl.EventWaitHandleRights, flags: System.Security.AccessControl.AuditFlags);
        EventWaitHandleRights: System.Security.AccessControl.EventWaitHandleRights;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum EventWaitHandleRights {
        Modify = 2,
        Delete = 65536,
        ReadPermissions = 131072,
        ChangePermissions = 262144,
        TakeOwnership = 524288,
        Synchronize = 1048576,
        FullControl = 2031619,
      }
      export declare class EventWaitHandleSecurity {
        constructor();
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.EventWaitHandleAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.EventWaitHandleAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.EventWaitHandleAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.EventWaitHandleAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.EventWaitHandleAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.EventWaitHandleAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FileSecurity {
        constructor();
        constructor(fileName: string, includeSections: System.Security.AccessControl.AccessControlSections);
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FileSystemAccessRule {
        constructor(identity: System.Security.Principal.IdentityReference, fileSystemRights: System.Security.AccessControl.FileSystemRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, fileSystemRights: System.Security.AccessControl.FileSystemRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: System.Security.Principal.IdentityReference, fileSystemRights: System.Security.AccessControl.FileSystemRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, fileSystemRights: System.Security.AccessControl.FileSystemRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType);
        FileSystemRights: System.Security.AccessControl.FileSystemRights;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FileSystemAuditRule {
        constructor(identity: System.Security.Principal.IdentityReference, fileSystemRights: System.Security.AccessControl.FileSystemRights, flags: System.Security.AccessControl.AuditFlags);
        constructor(identity: string, fileSystemRights: System.Security.AccessControl.FileSystemRights, flags: System.Security.AccessControl.AuditFlags);
        constructor(identity: System.Security.Principal.IdentityReference, fileSystemRights: System.Security.AccessControl.FileSystemRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags);
        constructor(identity: string, fileSystemRights: System.Security.AccessControl.FileSystemRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags);
        FileSystemRights: System.Security.AccessControl.FileSystemRights;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum FileSystemRights {
        ListDirectory = 1,
        ReadData = 1,
        CreateFiles = 2,
        WriteData = 2,
        AppendData = 4,
        CreateDirectories = 4,
        ReadExtendedAttributes = 8,
        WriteExtendedAttributes = 16,
        ExecuteFile = 32,
        Traverse = 32,
        DeleteSubdirectoriesAndFiles = 64,
        ReadAttributes = 128,
        WriteAttributes = 256,
        Write = 278,
        Delete = 65536,
        ReadPermissions = 131072,
        Read = 131209,
        ReadAndExecute = 131241,
        Modify = 197055,
        ChangePermissions = 262144,
        TakeOwnership = 524288,
        Synchronize = 1048576,
        FullControl = 2032127,
      }
      export declare class FileSystemSecurity {
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.FileSystemAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.FileSystemAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class GenericAce {
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        BinaryLength: number;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class GenericAcl {
        BinaryLength: number;
        Count: number;
        IsSynchronized: boolean;
        Revision: System.Byte;
        SyncRoot: System.Object;
        CopyTo: ((array: System.Security.AccessControl.GenericAce[], index: number) => void);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetEnumerator: (() => System.Security.AccessControl.AceEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class GenericSecurityDescriptor {
        BinaryLength: number;
        ControlFlags: System.Security.AccessControl.ControlFlags;
        Group: System.Security.Principal.SecurityIdentifier;
        Owner: System.Security.Principal.SecurityIdentifier;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum InheritanceFlags {
        None = 0,
        ContainerInherit = 1,
        ObjectInherit = 2,
      }
      export declare class KnownAce {
        AccessMask: number;
        SecurityIdentifier: System.Security.Principal.SecurityIdentifier;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        BinaryLength: number;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MutexAccessRule {
        constructor(identity: System.Security.Principal.IdentityReference, eventRights: System.Security.AccessControl.MutexRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, eventRights: System.Security.AccessControl.MutexRights, type: System.Security.AccessControl.AccessControlType);
        MutexRights: System.Security.AccessControl.MutexRights;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MutexAuditRule {
        constructor(identity: System.Security.Principal.IdentityReference, eventRights: System.Security.AccessControl.MutexRights, flags: System.Security.AccessControl.AuditFlags);
        MutexRights: System.Security.AccessControl.MutexRights;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum MutexRights {
        Modify = 1,
        Delete = 65536,
        ReadPermissions = 131072,
        ChangePermissions = 262144,
        TakeOwnership = 524288,
        Synchronize = 1048576,
        FullControl = 2031617,
      }
      export declare class MutexSecurity {
        constructor();
        constructor(name: string, includeSections: System.Security.AccessControl.AccessControlSections);
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.MutexAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.MutexAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.MutexAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.MutexAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.MutexAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.MutexAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.MutexAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.MutexAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.MutexAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.MutexAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.MutexAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class NativeObjectSecurity {
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjectAccessRule {
        InheritedObjectType: System.Guid;
        ObjectFlags: System.Security.AccessControl.ObjectAceFlags;
        ObjectType: System.Guid;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjectAce {
        constructor(aceFlags: System.Security.AccessControl.AceFlags, qualifier: System.Security.AccessControl.AceQualifier, accessMask: number, sid: System.Security.Principal.SecurityIdentifier, flags: System.Security.AccessControl.ObjectAceFlags, type: System.Guid, inheritedType: System.Guid, isCallback: boolean, opaque: System.Byte[]);
        BinaryLength: number;
        InheritedObjectAceType: System.Guid;
        ObjectAceFlags: System.Security.AccessControl.ObjectAceFlags;
        ObjectAceType: System.Guid;
        AceQualifier: System.Security.AccessControl.AceQualifier;
        IsCallback: boolean;
        OpaqueLength: number;
        AccessMask: number;
        SecurityIdentifier: System.Security.Principal.SecurityIdentifier;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetOpaque: (() => System.Byte[]);
        SetOpaque: ((opaque: System.Byte[]) => void);
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum ObjectAceFlags {
        None = 0,
        ObjectAceTypePresent = 1,
        InheritedObjectAceTypePresent = 2,
      }
      export declare class ObjectAuditRule {
        InheritedObjectType: System.Guid;
        ObjectFlags: System.Security.AccessControl.ObjectAceFlags;
        ObjectType: System.Guid;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ObjectSecurity {
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PrivilegeNotHeldException {
        constructor();
        constructor(privilege: string);
        constructor(privilege: string, inner: System.Exception);
        PrivilegeName: string;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export enum PropagationFlags {
        None = 0,
        NoPropagateInherit = 1,
        InheritOnly = 2,
      }
      export declare class QualifiedAce {
        AceQualifier: System.Security.AccessControl.AceQualifier;
        IsCallback: boolean;
        OpaqueLength: number;
        AccessMask: number;
        SecurityIdentifier: System.Security.Principal.SecurityIdentifier;
        AceFlags: System.Security.AccessControl.AceFlags;
        AceType: System.Security.AccessControl.AceType;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        BinaryLength: number;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        GetOpaque: (() => System.Byte[]);
        SetOpaque: ((opaque: System.Byte[]) => void);
        Copy: (() => System.Security.AccessControl.GenericAce);
        Equals: ((o: System.Object) => boolean);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RawAcl {
        constructor(revision: System.Byte, capacity: number);
        constructor(binaryForm: System.Byte[], offset: number);
        BinaryLength: number;
        Count: number;
        Revision: System.Byte;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        InsertAce: ((index: number, ace: System.Security.AccessControl.GenericAce) => void);
        RemoveAce: ((index: number) => void);
        CopyTo: ((array: System.Security.AccessControl.GenericAce[], index: number) => void);
        GetEnumerator: (() => System.Security.AccessControl.AceEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RawSecurityDescriptor {
        constructor(sddlForm: string);
        constructor(binaryForm: System.Byte[], offset: number);
        constructor(flags: System.Security.AccessControl.ControlFlags, owner: System.Security.Principal.SecurityIdentifier, group: System.Security.Principal.SecurityIdentifier, systemAcl: System.Security.AccessControl.RawAcl, discretionaryAcl: System.Security.AccessControl.RawAcl);
        ControlFlags: System.Security.AccessControl.ControlFlags;
        DiscretionaryAcl: System.Security.AccessControl.RawAcl;
        Group: System.Security.Principal.SecurityIdentifier;
        Owner: System.Security.Principal.SecurityIdentifier;
        ResourceManagerControl: System.Byte;
        SystemAcl: System.Security.AccessControl.RawAcl;
        BinaryLength: number;
        SetFlags: ((flags: System.Security.AccessControl.ControlFlags) => void);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RegistryAccessRule {
        constructor(identity: System.Security.Principal.IdentityReference, registryRights: System.Security.AccessControl.RegistryRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, registryRights: System.Security.AccessControl.RegistryRights, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: System.Security.Principal.IdentityReference, registryRights: System.Security.AccessControl.RegistryRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType);
        constructor(identity: string, registryRights: System.Security.AccessControl.RegistryRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType);
        RegistryRights: System.Security.AccessControl.RegistryRights;
        AccessControlType: System.Security.AccessControl.AccessControlType;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RegistryAuditRule {
        constructor(identity: System.Security.Principal.IdentityReference, registryRights: System.Security.AccessControl.RegistryRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags);
        constructor(identity: string, registryRights: System.Security.AccessControl.RegistryRights, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags);
        RegistryRights: System.Security.AccessControl.RegistryRights;
        AuditFlags: System.Security.AccessControl.AuditFlags;
        IdentityReference: System.Security.Principal.IdentityReference;
        InheritanceFlags: System.Security.AccessControl.InheritanceFlags;
        IsInherited: boolean;
        PropagationFlags: System.Security.AccessControl.PropagationFlags;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum RegistryRights {
        QueryValues = 1,
        SetValue = 2,
        CreateSubKey = 4,
        EnumerateSubKeys = 8,
        Notify = 16,
        CreateLink = 32,
        Delete = 65536,
        ReadPermissions = 131072,
        WriteKey = 131078,
        ReadKey = 131097,
        ExecuteKey = 131097,
        ChangePermissions = 262144,
        TakeOwnership = 524288,
        FullControl = 983103,
      }
      export declare class RegistrySecurity {
        constructor();
        AccessRightType: System.Type;
        AccessRuleType: System.Type;
        AuditRuleType: System.Type;
        AreAccessRulesCanonical: boolean;
        AreAccessRulesProtected: boolean;
        AreAuditRulesCanonical: boolean;
        AreAuditRulesProtected: boolean;
        AccessRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, type: System.Security.AccessControl.AccessControlType) => System.Security.AccessControl.AccessRule);
        AddAccessRule: ((rule: System.Security.AccessControl.RegistryAccessRule) => void);
        RemoveAccessRule: ((rule: System.Security.AccessControl.RegistryAccessRule) => boolean);
        RemoveAccessRuleAll: ((rule: System.Security.AccessControl.RegistryAccessRule) => void);
        RemoveAccessRuleSpecific: ((rule: System.Security.AccessControl.RegistryAccessRule) => void);
        ResetAccessRule: ((rule: System.Security.AccessControl.RegistryAccessRule) => void);
        SetAccessRule: ((rule: System.Security.AccessControl.RegistryAccessRule) => void);
        AuditRuleFactory: ((identityReference: System.Security.Principal.IdentityReference, accessMask: number, isInherited: boolean, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, flags: System.Security.AccessControl.AuditFlags) => System.Security.AccessControl.AuditRule);
        AddAuditRule: ((rule: System.Security.AccessControl.RegistryAuditRule) => void);
        RemoveAuditRule: ((rule: System.Security.AccessControl.RegistryAuditRule) => boolean);
        RemoveAuditRuleAll: ((rule: System.Security.AccessControl.RegistryAuditRule) => void);
        RemoveAuditRuleSpecific: ((rule: System.Security.AccessControl.RegistryAuditRule) => void);
        SetAuditRule: ((rule: System.Security.AccessControl.RegistryAuditRule) => void);
        GetAccessRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetAuditRules: ((includeExplicit: boolean, includeInherited: boolean, targetType: System.Type) => System.Security.AccessControl.AuthorizationRuleCollection);
        GetGroup: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetOwner: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetSecurityDescriptorBinaryForm: (() => System.Byte[]);
        GetSecurityDescriptorSddlForm: ((includeSections: System.Security.AccessControl.AccessControlSections) => string);
        PurgeAccessRules: ((identity: System.Security.Principal.IdentityReference) => void);
        PurgeAuditRules: ((identity: System.Security.Principal.IdentityReference) => void);
        SetAccessRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetAuditRuleProtection: ((isProtected: boolean, preserveInheritance: boolean) => void);
        SetGroup: ((identity: System.Security.Principal.IdentityReference) => void);
        SetOwner: ((identity: System.Security.Principal.IdentityReference) => void);
        SetSecurityDescriptorBinaryForm: ((binaryForm: System.Byte[]) => void) | ((binaryForm: System.Byte[], includeSections: System.Security.AccessControl.AccessControlSections) => void);
        SetSecurityDescriptorSddlForm: ((sddlForm: string) => void) | ((sddlForm: string, includeSections: System.Security.AccessControl.AccessControlSections) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum ResourceType {
        Unknown = 0,
        FileObject = 1,
        Service = 2,
        Printer = 3,
        RegistryKey = 4,
        LMShare = 5,
        KernelObject = 6,
        WindowObject = 7,
        DSObject = 8,
        DSObjectAll = 9,
        ProviderDefined = 10,
        WmiGuidObject = 11,
        RegistryWow6432Key = 12,
      }
      export enum SecurityInfos {
        Owner = 1,
        Group = 2,
        DiscretionaryAcl = 4,
        SystemAcl = 8,
      }
      export declare class SystemAcl {
        constructor(isContainer: boolean, isDS: boolean, capacity: number);
        constructor(isContainer: boolean, isDS: boolean, rawAcl: System.Security.AccessControl.RawAcl);
        constructor(isContainer: boolean, isDS: boolean, revision: System.Byte, capacity: number);
        BinaryLength: number;
        Count: number;
        IsCanonical: boolean;
        IsContainer: boolean;
        IsDS: boolean;
        Revision: System.Byte;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        AddAudit: ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAuditRule) => void);
        RemoveAudit: ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => boolean) | ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => boolean) | ((sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAuditRule) => boolean);
        RemoveAuditSpecific: ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAuditRule) => void);
        SetAudit: ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags) => void) | ((auditFlags: System.Security.AccessControl.AuditFlags, sid: System.Security.Principal.SecurityIdentifier, accessMask: number, inheritanceFlags: System.Security.AccessControl.InheritanceFlags, propagationFlags: System.Security.AccessControl.PropagationFlags, objectFlags: System.Security.AccessControl.ObjectAceFlags, objectType: System.Guid, inheritedObjectType: System.Guid) => void) | ((sid: System.Security.Principal.SecurityIdentifier, rule: System.Security.AccessControl.ObjectAuditRule) => void);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        Purge: ((sid: System.Security.Principal.SecurityIdentifier) => void);
        RemoveInheritedAces: (() => void);
        CopyTo: ((array: System.Security.AccessControl.GenericAce[], index: number) => void);
        GetEnumerator: (() => System.Security.AccessControl.AceEnumerator);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace Claims {
      export declare class Claim {
        constructor(reader: System.IO.BinaryReader);
        constructor(reader: System.IO.BinaryReader, subject: System.Security.Claims.ClaimsIdentity);
        constructor(type: string, value: string);
        constructor(type: string, value: string, valueType: string);
        constructor(type: string, value: string, valueType: string, issuer: string);
        constructor(type: string, value: string, valueType: string, issuer: string, originalIssuer: string);
        constructor(type: string, value: string, valueType: string, issuer: string, originalIssuer: string, subject: System.Security.Claims.ClaimsIdentity);
        Issuer: string;
        OriginalIssuer: string;
        Properties: any; // System.Collections.Generic.IDictionary`2[System.String,System.String]
        Subject: System.Security.Claims.ClaimsIdentity;
        Type: string;
        Value: string;
        ValueType: string;
        Clone: (() => System.Security.Claims.Claim) | ((identity: System.Security.Claims.ClaimsIdentity) => System.Security.Claims.Claim);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class ClaimTypes {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ClaimValueTypes {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ClaimsIdentity {
        constructor();
        constructor(identity: System.Security.Principal.IIdentity);
        constructor(claims: any);
        constructor(authenticationType: string);
        constructor(claims: any, authenticationType: string);
        constructor(identity: System.Security.Principal.IIdentity, claims: any);
        constructor(authenticationType: string, nameType: string, roleType: string);
        constructor(claims: any, authenticationType: string, nameType: string, roleType: string);
        constructor(identity: System.Security.Principal.IIdentity, claims: any, authenticationType: string, nameType: string, roleType: string);
        constructor(reader: System.IO.BinaryReader);
        AuthenticationType: string;
        IsAuthenticated: boolean;
        Actor: System.Security.Claims.ClaimsIdentity;
        BootstrapContext: System.Object;
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Label: string;
        Name: string;
        NameClaimType: string;
        RoleClaimType: string;
        Clone: (() => System.Security.Claims.ClaimsIdentity);
        AddClaim: ((claim: System.Security.Claims.Claim) => void);
        AddClaims: ((claims: any) => void);
        TryRemoveClaim: ((claim: System.Security.Claims.Claim) => boolean);
        RemoveClaim: ((claim: System.Security.Claims.Claim) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ClaimsPrincipal {
        constructor();
        constructor(identities: any);
        constructor(identity: System.Security.Principal.IIdentity);
        constructor(principal: System.Security.Principal.IPrincipal);
        constructor(reader: System.IO.BinaryReader);
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Identities: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.ClaimsIdentity]
        Identity: System.Security.Principal.IIdentity;
        Clone: (() => System.Security.Claims.ClaimsPrincipal);
        AddIdentity: ((identity: System.Security.Claims.ClaimsIdentity) => void);
        AddIdentities: ((identities: any) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        IsInRole: ((role: string) => boolean);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
    export namespace Cryptography {
      export declare class HashAlgorithmName {
        constructor(name: string);
        Name: string;
        ToString: (() => string);
        Equals: ((obj: System.Object) => boolean) | ((other: System.Security.Cryptography.HashAlgorithmName) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class RSAEncryptionPadding {
        Mode: System.Security.Cryptography.RSAEncryptionPaddingMode;
        OaepHashAlgorithm: System.Security.Cryptography.HashAlgorithmName;
        GetHashCode: (() => number);
        Equals: ((obj: System.Object) => boolean) | ((other: System.Security.Cryptography.RSAEncryptionPadding) => boolean);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum RSAEncryptionPaddingMode {
        Pkcs1 = 0,
        Oaep = 1,
      }
      export declare class RSASignaturePadding {
        Mode: System.Security.Cryptography.RSASignaturePaddingMode;
        GetHashCode: (() => number);
        Equals: ((obj: System.Object) => boolean) | ((other: System.Security.Cryptography.RSASignaturePadding) => boolean);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum RSASignaturePaddingMode {
        Pkcs1 = 0,
        Pss = 1,
      }
      export declare class Aes {
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsymmetricAlgorithm {
        KeySize: number;
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        SignatureAlgorithm: string;
        KeyExchangeAlgorithm: string;
        Dispose: (() => void);
        Clear: (() => void);
        FromXmlString: ((xmlString: string) => void);
        ToXmlString: ((includePrivateParameters: boolean) => string);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsymmetricKeyExchangeDeformatter {
        Parameters: string;
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        DecryptKeyExchange: ((rgb: System.Byte[]) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsymmetricKeyExchangeFormatter {
        Parameters: string;
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        CreateKeyExchange: ((data: System.Byte[]) => System.Byte[]) | ((data: System.Byte[], symAlgType: System.Type) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsymmetricSignatureDeformatter {
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        SetHashAlgorithm: ((strName: string) => void);
        VerifySignature: ((hash: System.Security.Cryptography.HashAlgorithm, rgbSignature: System.Byte[]) => boolean) | ((rgbHash: System.Byte[], rgbSignature: System.Byte[]) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class AsymmetricSignatureFormatter {
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        SetHashAlgorithm: ((strName: string) => void);
        CreateSignature: ((hash: System.Security.Cryptography.HashAlgorithm) => System.Byte[]) | ((rgbHash: System.Byte[]) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum FromBase64TransformMode {
        IgnoreWhiteSpaces = 0,
        DoNotIgnoreWhiteSpaces = 1,
      }
      export declare class ToBase64Transform {
        constructor();
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FromBase64Transform {
        constructor();
        constructor(whitespaces: System.Security.Cryptography.FromBase64TransformMode);
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CipherMode {
        CBC = 1,
        ECB = 2,
        OFB = 3,
        CFB = 4,
        CTS = 5,
      }
      export enum PaddingMode {
        None = 1,
        PKCS7 = 2,
        Zeros = 3,
        ANSIX923 = 4,
        ISO10126 = 5,
      }
      export declare class KeySizes {
        constructor(minSize: number, maxSize: number, skipSize: number);
        MinSize: number;
        MaxSize: number;
        SkipSize: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CryptographicException {
        constructor();
        constructor(message: string);
        constructor(format: string, insert: string);
        constructor(message: string, inner: System.Exception);
        constructor(hr: number);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class CryptographicUnexpectedOperationException {
        constructor();
        constructor(message: string);
        constructor(format: string, insert: string);
        constructor(message: string, inner: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export enum CspProviderFlags {
        NoFlags = 0,
        UseMachineKeyStore = 1,
        UseDefaultKeyContainer = 2,
        UseNonExportableKey = 4,
        UseExistingKey = 8,
        UseArchivableKey = 16,
        UseUserProtectedKey = 32,
        NoPrompt = 64,
        CreateEphemeralKey = 128,
      }
      export declare class CspParameters {
        constructor();
        constructor(dwTypeIn: number);
        constructor(dwTypeIn: number, strProviderNameIn: string);
        constructor(dwTypeIn: number, strProviderNameIn: string, strContainerNameIn: string);
        constructor(providerType: number, providerName: string, keyContainerName: string, cryptoKeySecurity: System.Security.AccessControl.CryptoKeySecurity, keyPassword: System.Security.SecureString);
        constructor(providerType: number, providerName: string, keyContainerName: string, cryptoKeySecurity: System.Security.AccessControl.CryptoKeySecurity, parentWindowHandle: System.IntPtr);
        Flags: System.Security.Cryptography.CspProviderFlags;
        CryptoKeySecurity: System.Security.AccessControl.CryptoKeySecurity;
        KeyPassword: System.Security.SecureString;
        ParentWindowHandle: System.IntPtr;
        ProviderType: number;
        ProviderName: string;
        KeyContainerName: string;
        KeyNumber: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum CryptoStreamMode {
        Read = 0,
        Write = 1,
      }
      export declare class CryptoStream {
        constructor(stream: System.IO.Stream, transform: System.Security.Cryptography.ICryptoTransform, mode: System.Security.Cryptography.CryptoStreamMode);
        CanRead: boolean;
        CanSeek: boolean;
        CanWrite: boolean;
        Length: System.Int64;
        Position: System.Int64;
        HasFlushedFinalBlock: boolean;
        CanTimeout: boolean;
        ReadTimeout: number;
        WriteTimeout: number;
        FlushFinalBlock: (() => void);
        Flush: (() => void);
        FlushAsync: ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | (() => System.Threading.Tasks.Task);
        Seek: ((offset: System.Int64, origin: System.IO.SeekOrigin) => System.Int64);
        SetLength: ((value: System.Int64) => void);
        Read: ((buffer: System.Byte[], offset: number, count: number) => number) | ((destination: any) => number);
        ReadAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => any) | ((buffer: System.Byte[], offset: number, count: number) => any) | ((destination: any, cancellationToken?: System.Threading.CancellationToken) => any);
        Write: ((buffer: System.Byte[], offset: number, count: number) => void) | ((source: any) => void);
        WriteAsync: ((buffer: System.Byte[], offset: number, count: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((buffer: System.Byte[], offset: number, count: number) => System.Threading.Tasks.Task) | ((source: any, cancellationToken?: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
        Clear: (() => void);
        CopyToAsync: ((destination: System.IO.Stream) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number) => System.Threading.Tasks.Task) | ((destination: System.IO.Stream, bufferSize: number, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task);
        CopyTo: ((destination: System.IO.Stream) => void) | ((destination: System.IO.Stream, bufferSize: number) => void);
        Close: (() => void);
        Dispose: (() => void);
        BeginRead: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
        EndRead: ((asyncResult: System.IAsyncResult) => number);
        BeginWrite: ((buffer: System.Byte[], offset: number, count: number, callback: System.AsyncCallback, state: System.Object) => System.IAsyncResult);
        EndWrite: ((asyncResult: System.IAsyncResult) => void);
        ReadByte: (() => number);
        WriteByte: ((value: System.Byte) => void);
        CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
        GetLifetimeService: (() => System.Object);
        InitializeLifetimeService: (() => System.Object);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DeriveBytes {
        GetBytes: ((cb: number) => System.Byte[]);
        Reset: (() => void);
        Dispose: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DES {
        Key: System.Byte[];
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DESCryptoServiceProvider {
        constructor();
        Key: System.Byte[];
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        CreateEncryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DSAParameters {
        P: System.Byte[];
        Q: System.Byte[];
        G: System.Byte[];
        Y: System.Byte[];
        J: System.Byte[];
        X: System.Byte[];
        Seed: System.Byte[];
        Counter: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class DSA {
        KeySize: number;
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        SignatureAlgorithm: string;
        KeyExchangeAlgorithm: string;
        CreateSignature: ((rgbHash: System.Byte[]) => System.Byte[]);
        VerifySignature: ((rgbHash: System.Byte[], rgbSignature: System.Byte[]) => boolean);
        SignData: ((data: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]) | ((data: System.Byte[], offset: number, count: number, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]) | ((data: System.IO.Stream, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]);
        VerifyData: ((data: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean) | ((data: System.Byte[], offset: number, count: number, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean) | ((data: System.IO.Stream, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean);
        FromXmlString: ((xmlString: string) => void);
        ToXmlString: ((includePrivateParameters: boolean) => string);
        ExportParameters: ((includePrivateParameters: boolean) => System.Security.Cryptography.DSAParameters);
        ImportParameters: ((parameters: System.Security.Cryptography.DSAParameters) => void);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DSASignatureDeformatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        SetHashAlgorithm: ((strName: string) => void);
        VerifySignature: ((rgbHash: System.Byte[], rgbSignature: System.Byte[]) => boolean) | ((hash: System.Security.Cryptography.HashAlgorithm, rgbSignature: System.Byte[]) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DSASignatureFormatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        SetHashAlgorithm: ((strName: string) => void);
        CreateSignature: ((rgbHash: System.Byte[]) => System.Byte[]) | ((hash: System.Security.Cryptography.HashAlgorithm) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HashAlgorithm {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMAC {
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACMD5 {
        constructor();
        constructor(key: System.Byte[]);
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACRIPEMD160 {
        constructor();
        constructor(key: System.Byte[]);
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACSHA1 {
        constructor();
        constructor(key: System.Byte[]);
        constructor(key: System.Byte[], useManagedSha1: boolean);
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACSHA256 {
        constructor();
        constructor(key: System.Byte[]);
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACSHA384 {
        constructor();
        constructor(key: System.Byte[]);
        ProduceLegacyHmacValues: boolean;
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class HMACSHA512 {
        constructor();
        constructor(key: System.Byte[]);
        ProduceLegacyHmacValues: boolean;
        Key: System.Byte[];
        HashName: string;
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ICryptoTransform {
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
      }
      export declare class KeyedHashAlgorithm {
        Key: System.Byte[];
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MACTripleDES {
        constructor();
        constructor(rgbKey: System.Byte[]);
        constructor(strTripleDES: string, rgbKey: System.Byte[]);
        Padding: System.Security.Cryptography.PaddingMode;
        Key: System.Byte[];
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MaskGenerationMethod {
        GenerateMask: ((rgbSeed: System.Byte[], cbReturn: number) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class MD5 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PasswordDeriveBytes {
        constructor(strPassword: string, rgbSalt: System.Byte[]);
        constructor(password: System.Byte[], salt: System.Byte[]);
        constructor(strPassword: string, rgbSalt: System.Byte[], strHashName: string, iterations: number);
        constructor(password: System.Byte[], salt: System.Byte[], hashName: string, iterations: number);
        constructor(strPassword: string, rgbSalt: System.Byte[], cspParams: System.Security.Cryptography.CspParameters);
        constructor(password: System.Byte[], salt: System.Byte[], cspParams: System.Security.Cryptography.CspParameters);
        constructor(strPassword: string, rgbSalt: System.Byte[], strHashName: string, iterations: number, cspParams: System.Security.Cryptography.CspParameters);
        constructor(password: System.Byte[], salt: System.Byte[], hashName: string, iterations: number, cspParams: System.Security.Cryptography.CspParameters);
        HashName: string;
        IterationCount: number;
        Salt: System.Byte[];
        GetBytes: ((cb: number) => System.Byte[]);
        Reset: (() => void);
        CryptDeriveKey: ((algname: string, alghashname: string, keySize: number, rgbIV: System.Byte[]) => System.Byte[]);
        Dispose: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PKCS1MaskGenerationMethod {
        constructor();
        HashName: string;
        GenerateMask: ((rgbSeed: System.Byte[], cbReturn: number) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RandomNumberGenerator {
        Dispose: (() => void);
        GetBytes: ((data: System.Byte[]) => void) | ((data: System.Byte[], offset: number, count: number) => void);
        GetNonZeroBytes: ((data: System.Byte[]) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RC2 {
        EffectiveKeySize: number;
        KeySize: number;
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RC2CryptoServiceProvider {
        constructor();
        EffectiveKeySize: number;
        UseSalt: boolean;
        KeySize: number;
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        CreateEncryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Rfc2898DeriveBytes {
        constructor(password: string, saltSize: number);
        constructor(password: string, saltSize: number, iterations: number);
        constructor(password: string, salt: System.Byte[]);
        constructor(password: string, salt: System.Byte[], iterations: number);
        constructor(password: System.Byte[], salt: System.Byte[], iterations: number);
        IterationCount: number;
        Salt: System.Byte[];
        GetBytes: ((cb: number) => System.Byte[]);
        Reset: (() => void);
        CryptDeriveKey: ((algname: string, alghashname: string, keySize: number, rgbIV: System.Byte[]) => System.Byte[]);
        Dispose: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Rijndael {
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RijndaelManaged {
        constructor();
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        CreateEncryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RijndaelManagedTransform {
        BlockSizeValue: number;
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Dispose: (() => void);
        Clear: (() => void);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RIPEMD160 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RIPEMD160Managed {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAParameters {
        Exponent: System.Byte[];
        Modulus: System.Byte[];
        P: System.Byte[];
        Q: System.Byte[];
        DP: System.Byte[];
        DQ: System.Byte[];
        InverseQ: System.Byte[];
        D: System.Byte[];
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class RSA {
        KeyExchangeAlgorithm: string;
        SignatureAlgorithm: string;
        KeySize: number;
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        Encrypt: ((data: System.Byte[], padding: System.Security.Cryptography.RSAEncryptionPadding) => System.Byte[]);
        Decrypt: ((data: System.Byte[], padding: System.Security.Cryptography.RSAEncryptionPadding) => System.Byte[]);
        SignHash: ((hash: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]);
        VerifyHash: ((hash: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean);
        SignData: ((data: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]) | ((data: System.Byte[], offset: number, count: number, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]) | ((data: System.IO.Stream, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]);
        VerifyData: ((data: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean) | ((data: System.Byte[], offset: number, count: number, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean) | ((data: System.IO.Stream, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean);
        DecryptValue: ((rgb: System.Byte[]) => System.Byte[]);
        EncryptValue: ((rgb: System.Byte[]) => System.Byte[]);
        FromXmlString: ((xmlString: string) => void);
        ToXmlString: ((includePrivateParameters: boolean) => string);
        ExportParameters: ((includePrivateParameters: boolean) => System.Security.Cryptography.RSAParameters);
        ImportParameters: ((parameters: System.Security.Cryptography.RSAParameters) => void);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSACryptoServiceProvider {
        constructor();
        constructor(parameters: System.Security.Cryptography.CspParameters);
        constructor(dwKeySize: number);
        constructor(dwKeySize: number, parameters: System.Security.Cryptography.CspParameters);
        SignatureAlgorithm: string;
        KeyExchangeAlgorithm: string;
        KeySize: number;
        PersistKeyInCsp: boolean;
        PublicOnly: boolean;
        CspKeyContainerInfo: System.Security.Cryptography.CspKeyContainerInfo;
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        Encrypt: ((data: System.Byte[], padding: System.Security.Cryptography.RSAEncryptionPadding) => System.Byte[]) | ((rgb: System.Byte[], fOAEP: boolean) => System.Byte[]);
        Decrypt: ((data: System.Byte[], padding: System.Security.Cryptography.RSAEncryptionPadding) => System.Byte[]) | ((rgb: System.Byte[], fOAEP: boolean) => System.Byte[]);
        SignHash: ((hash: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]) | ((rgbHash: System.Byte[], str: string) => System.Byte[]);
        VerifyHash: ((hash: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean) | ((rgbHash: System.Byte[], str: string, rgbSignature: System.Byte[]) => boolean);
        DecryptValue: ((rgb: System.Byte[]) => System.Byte[]);
        EncryptValue: ((rgb: System.Byte[]) => System.Byte[]);
        ExportParameters: ((includePrivateParameters: boolean) => System.Security.Cryptography.RSAParameters);
        ImportParameters: ((parameters: System.Security.Cryptography.RSAParameters) => void);
        SignData: ((buffer: System.Byte[], halg: System.Object) => System.Byte[]) | ((inputStream: System.IO.Stream, halg: System.Object) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number, halg: System.Object) => System.Byte[]) | ((data: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]) | ((data: System.Byte[], offset: number, count: number, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]) | ((data: System.IO.Stream, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => System.Byte[]);
        VerifyData: ((buffer: System.Byte[], halg: System.Object, signature: System.Byte[]) => boolean) | ((data: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean) | ((data: System.Byte[], offset: number, count: number, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean) | ((data: System.IO.Stream, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName, padding: System.Security.Cryptography.RSASignaturePadding) => boolean);
        ExportCspBlob: ((includePrivateParameters: boolean) => System.Byte[]);
        ImportCspBlob: ((keyBlob: System.Byte[]) => void);
        FromXmlString: ((xmlString: string) => void);
        ToXmlString: ((includePrivateParameters: boolean) => string);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAOAEPKeyExchangeDeformatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        Parameters: string;
        DecryptKeyExchange: ((rgbData: System.Byte[]) => System.Byte[]);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAOAEPKeyExchangeFormatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        Parameter: System.Byte[];
        Parameters: string;
        Rng: System.Security.Cryptography.RandomNumberGenerator;
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        CreateKeyExchange: ((rgbData: System.Byte[]) => System.Byte[]) | ((rgbData: System.Byte[], symAlgType: System.Type) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAPKCS1KeyExchangeDeformatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        RNG: System.Security.Cryptography.RandomNumberGenerator;
        Parameters: string;
        DecryptKeyExchange: ((rgbIn: System.Byte[]) => System.Byte[]);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAPKCS1KeyExchangeFormatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        Parameters: string;
        Rng: System.Security.Cryptography.RandomNumberGenerator;
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        CreateKeyExchange: ((rgbData: System.Byte[]) => System.Byte[]) | ((rgbData: System.Byte[], symAlgType: System.Type) => System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA1 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA1Managed {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA256 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA256Managed {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA384 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA384Managed {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA512 {
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Initialize: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA512Managed {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SignatureDescription {
        constructor();
        constructor(el: System.Security.SecurityElement);
        KeyAlgorithm: string;
        DigestAlgorithm: string;
        FormatterAlgorithm: string;
        DeformatterAlgorithm: string;
        CreateDeformatter: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => System.Security.Cryptography.AsymmetricSignatureDeformatter);
        CreateFormatter: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => System.Security.Cryptography.AsymmetricSignatureFormatter);
        CreateDigest: (() => System.Security.Cryptography.HashAlgorithm);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SymmetricAlgorithm {
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        Key: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TripleDES {
        Key: System.Byte[];
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        CreateEncryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: (() => System.Security.Cryptography.ICryptoTransform) | ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TripleDESCryptoServiceProvider {
        constructor();
        Key: System.Byte[];
        BlockSize: number;
        FeedbackSize: number;
        IV: System.Byte[];
        LegalBlockSizes: System.Security.Cryptography.KeySizes[];
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        KeySize: number;
        Mode: System.Security.Cryptography.CipherMode;
        Padding: System.Security.Cryptography.PaddingMode;
        CreateEncryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        CreateDecryptor: ((rgbKey: System.Byte[], rgbIV: System.Byte[]) => System.Security.Cryptography.ICryptoTransform) | (() => System.Security.Cryptography.ICryptoTransform);
        GenerateKey: (() => void);
        GenerateIV: (() => void);
        Dispose: (() => void);
        Clear: (() => void);
        ValidKeySize: ((bitLength: number) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CryptoAPITransform {
        CanReuseTransform: boolean;
        CanTransformMultipleBlocks: boolean;
        InputBlockSize: number;
        KeyHandle: System.IntPtr;
        OutputBlockSize: number;
        Dispose: (() => void);
        Clear: (() => void);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CryptoConfig {
        constructor();
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CspKeyContainerInfo {
        constructor(parameters: System.Security.Cryptography.CspParameters);
        Accessible: boolean;
        CryptoKeySecurity: System.Security.AccessControl.CryptoKeySecurity;
        Exportable: boolean;
        HardwareDevice: boolean;
        KeyContainerName: string;
        KeyNumber: System.Security.Cryptography.KeyNumber;
        MachineKeyStore: boolean;
        Protected: boolean;
        ProviderName: string;
        ProviderType: number;
        RandomlyGenerated: boolean;
        Removable: boolean;
        UniqueKeyContainerName: string;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class DSACryptoServiceProvider {
        constructor();
        constructor(parameters: System.Security.Cryptography.CspParameters);
        constructor(dwKeySize: number);
        constructor(dwKeySize: number, parameters: System.Security.Cryptography.CspParameters);
        KeyExchangeAlgorithm: string;
        KeySize: number;
        PersistKeyInCsp: boolean;
        PublicOnly: boolean;
        SignatureAlgorithm: string;
        CspKeyContainerInfo: System.Security.Cryptography.CspKeyContainerInfo;
        LegalKeySizes: System.Security.Cryptography.KeySizes[];
        ExportParameters: ((includePrivateParameters: boolean) => System.Security.Cryptography.DSAParameters);
        ImportParameters: ((parameters: System.Security.Cryptography.DSAParameters) => void);
        CreateSignature: ((rgbHash: System.Byte[]) => System.Byte[]);
        SignData: ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]) | ((inputStream: System.IO.Stream) => System.Byte[]) | ((data: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]) | ((data: System.Byte[], offset: number, count: number, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]) | ((data: System.IO.Stream, hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => System.Byte[]);
        SignHash: ((rgbHash: System.Byte[], str: string) => System.Byte[]);
        VerifyData: ((rgbData: System.Byte[], rgbSignature: System.Byte[]) => boolean) | ((data: System.Byte[], signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean) | ((data: System.Byte[], offset: number, count: number, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean) | ((data: System.IO.Stream, signature: System.Byte[], hashAlgorithm: System.Security.Cryptography.HashAlgorithmName) => boolean);
        VerifyHash: ((rgbHash: System.Byte[], str: string, rgbSignature: System.Byte[]) => boolean);
        VerifySignature: ((rgbHash: System.Byte[], rgbSignature: System.Byte[]) => boolean);
        ExportCspBlob: ((includePrivateParameters: boolean) => System.Byte[]);
        ImportCspBlob: ((keyBlob: System.Byte[]) => void);
        FromXmlString: ((xmlString: string) => void);
        ToXmlString: ((includePrivateParameters: boolean) => string);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ICspAsymmetricAlgorithm {
        CspKeyContainerInfo: System.Security.Cryptography.CspKeyContainerInfo;
        ExportCspBlob: ((includePrivateParameters: boolean) => System.Byte[]);
        ImportCspBlob: ((rawData: System.Byte[]) => void);
      }
      export enum KeyNumber {
        Exchange = 1,
        Signature = 2,
      }
      export declare class MD5CryptoServiceProvider {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RNGCryptoServiceProvider {
        constructor();
        constructor(rgb: System.Byte[]);
        constructor(cspParams: System.Security.Cryptography.CspParameters);
        constructor(str: string);
        GetBytes: ((data: System.Byte[]) => void) | ((data: System.Byte[], offset: number, count: number) => void);
        GetNonZeroBytes: ((data: System.Byte[]) => void);
        Dispose: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAPKCS1SignatureDeformatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        SetHashAlgorithm: ((strName: string) => void);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        VerifySignature: ((rgbHash: System.Byte[], rgbSignature: System.Byte[]) => boolean) | ((hash: System.Security.Cryptography.HashAlgorithm, rgbSignature: System.Byte[]) => boolean);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class RSAPKCS1SignatureFormatter {
        constructor();
        constructor(key: System.Security.Cryptography.AsymmetricAlgorithm);
        CreateSignature: ((rgbHash: System.Byte[]) => System.Byte[]) | ((hash: System.Security.Cryptography.HashAlgorithm) => System.Byte[]);
        SetHashAlgorithm: ((strName: string) => void);
        SetKey: ((key: System.Security.Cryptography.AsymmetricAlgorithm) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class SHA1CryptoServiceProvider {
        constructor();
        HashSize: number;
        Hash: System.Byte[];
        InputBlockSize: number;
        OutputBlockSize: number;
        CanTransformMultipleBlocks: boolean;
        CanReuseTransform: boolean;
        Initialize: (() => void);
        ComputeHash: ((inputStream: System.IO.Stream) => System.Byte[]) | ((buffer: System.Byte[]) => System.Byte[]) | ((buffer: System.Byte[], offset: number, count: number) => System.Byte[]);
        TransformBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number, outputBuffer: System.Byte[], outputOffset: number) => number);
        TransformFinalBlock: ((inputBuffer: System.Byte[], inputOffset: number, inputCount: number) => System.Byte[]);
        Dispose: (() => void);
        Clear: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export namespace X509Certificates {
        export enum X509ContentType {
          Unknown = 0,
          Cert = 1,
          SerializedCert = 2,
          Pfx = 3,
          Pkcs12 = 3,
          SerializedStore = 4,
          Pkcs7 = 5,
          Authenticode = 6,
        }
        export enum X509KeyStorageFlags {
          DefaultKeySet = 0,
          UserKeySet = 1,
          MachineKeySet = 2,
          Exportable = 4,
          UserProtected = 8,
          PersistKeySet = 16,
          EphemeralKeySet = 32,
        }
        export declare class X509Certificate {
          constructor(data: System.Byte[]);
          constructor(handle: System.IntPtr);
          constructor(cert: System.Security.Cryptography.X509Certificates.X509Certificate);
          constructor();
          constructor(rawData: System.Byte[], password: string);
          constructor(rawData: System.Byte[], password: System.Security.SecureString);
          constructor(rawData: System.Byte[], password: string, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags);
          constructor(rawData: System.Byte[], password: System.Security.SecureString, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags);
          constructor(fileName: string);
          constructor(fileName: string, password: string);
          constructor(fileName: string, password: System.Security.SecureString);
          constructor(fileName: string, password: string, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags);
          constructor(fileName: string, password: System.Security.SecureString, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags);
          constructor(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext);
          Issuer: string;
          Subject: string;
          Handle: System.IntPtr;
          Equals: ((other: System.Security.Cryptography.X509Certificates.X509Certificate) => boolean) | ((obj: System.Object) => boolean);
          GetCertHash: (() => System.Byte[]);
          GetCertHashString: (() => string);
          GetEffectiveDateString: (() => string);
          GetExpirationDateString: (() => string);
          GetFormat: (() => string);
          GetHashCode: (() => number);
          GetIssuerName: (() => string);
          GetKeyAlgorithm: (() => string);
          GetKeyAlgorithmParameters: (() => System.Byte[]);
          GetKeyAlgorithmParametersString: (() => string);
          GetName: (() => string);
          GetPublicKey: (() => System.Byte[]);
          GetPublicKeyString: (() => string);
          GetRawCertData: (() => System.Byte[]);
          GetRawCertDataString: (() => string);
          GetSerialNumber: (() => System.Byte[]);
          GetSerialNumberString: (() => string);
          ToString: (() => string) | ((fVerbose: boolean) => string);
          Export: ((contentType: System.Security.Cryptography.X509Certificates.X509ContentType) => System.Byte[]) | ((contentType: System.Security.Cryptography.X509Certificates.X509ContentType, password: string) => System.Byte[]) | ((contentType: System.Security.Cryptography.X509Certificates.X509ContentType, password: System.Security.SecureString) => System.Byte[]);
          Import: ((rawData: System.Byte[]) => void) | ((rawData: System.Byte[], password: string, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags) => void) | ((rawData: System.Byte[], password: System.Security.SecureString, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags) => void) | ((fileName: string) => void) | ((fileName: string, password: string, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags) => void) | ((fileName: string, password: System.Security.SecureString, keyStorageFlags: System.Security.Cryptography.X509Certificates.X509KeyStorageFlags) => void);
          Dispose: (() => void);
          Reset: (() => void);
          GetType: (() => System.Type);
        }
      }
    }
    export namespace Permissions {
      export declare class EnvironmentPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(flag: System.Security.Permissions.EnvironmentPermissionAccess, pathList: string);
        AddPathList: ((flag: System.Security.Permissions.EnvironmentPermissionAccess, pathList: string) => void);
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        GetPathList: ((flag: System.Security.Permissions.EnvironmentPermissionAccess) => string);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        SetPathList: ((flag: System.Security.Permissions.EnvironmentPermissionAccess, pathList: string) => void);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum EnvironmentPermissionAccess {
        NoAccess = 0,
        Read = 1,
        Write = 2,
        AllAccess = 3,
      }
      export declare class FileDialogPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(access: System.Security.Permissions.FileDialogPermissionAccess);
        Access: System.Security.Permissions.FileDialogPermissionAccess;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum FileDialogPermissionAccess {
        None = 0,
        Open = 1,
        Save = 2,
        OpenSave = 3,
      }
      export declare class FileIOPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(access: System.Security.Permissions.FileIOPermissionAccess, path: string);
        constructor(access: System.Security.Permissions.FileIOPermissionAccess, pathList: string[]);
        constructor(access: System.Security.Permissions.FileIOPermissionAccess, control: System.Security.AccessControl.AccessControlActions, path: string);
        constructor(access: System.Security.Permissions.FileIOPermissionAccess, control: System.Security.AccessControl.AccessControlActions, pathList: string[]);
        AllFiles: System.Security.Permissions.FileIOPermissionAccess;
        AllLocalFiles: System.Security.Permissions.FileIOPermissionAccess;
        AddPathList: ((access: System.Security.Permissions.FileIOPermissionAccess, path: string) => void) | ((access: System.Security.Permissions.FileIOPermissionAccess, pathList: string[]) => void);
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        GetPathList: ((access: System.Security.Permissions.FileIOPermissionAccess) => string[]);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        SetPathList: ((access: System.Security.Permissions.FileIOPermissionAccess, path: string) => void) | ((access: System.Security.Permissions.FileIOPermissionAccess, pathList: string[]) => void);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum FileIOPermissionAccess {
        NoAccess = 0,
        Read = 1,
        Write = 2,
        Append = 4,
        PathDiscovery = 8,
        AllAccess = 15,
      }
      export declare class GacIdentityPermission {
        constructor();
        constructor(state: System.Security.Permissions.PermissionState);
        Copy: (() => System.Security.IPermission);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        FromXml: ((securityElement: System.Security.SecurityElement) => void);
        ToXml: (() => System.Security.SecurityElement);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum HostProtectionResource {
        None = 0,
        Synchronization = 1,
        SharedState = 2,
        ExternalProcessMgmt = 4,
        SelfAffectingProcessMgmt = 8,
        ExternalThreading = 16,
        SelfAffectingThreading = 32,
        SecurityInfrastructure = 64,
        UI = 128,
        MayLeakOnAbort = 256,
        All = 511,
      }
      export declare class IUnrestrictedPermission {
        IsUnrestricted: (() => boolean);
      }
      export enum IsolatedStorageContainment {
        None = 0,
        DomainIsolationByUser = 16,
        AssemblyIsolationByUser = 32,
        DomainIsolationByRoamingUser = 80,
        AssemblyIsolationByRoamingUser = 96,
        AdministerIsolatedStorageByUser = 112,
        UnrestrictedIsolatedStorage = 240,
        ApplicationIsolationByUser = 21,
        DomainIsolationByMachine = 48,
        AssemblyIsolationByMachine = 64,
        ApplicationIsolationByMachine = 69,
        ApplicationIsolationByRoamingUser = 101,
      }
      export declare class IsolatedStorageFilePermission {
        constructor(state: System.Security.Permissions.PermissionState);
        UserQuota: System.Int64;
        UsageAllowed: System.Security.Permissions.IsolatedStorageContainment;
        Copy: (() => System.Security.IPermission);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        ToXml: (() => System.Security.SecurityElement);
        IsUnrestricted: (() => boolean);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class IsolatedStoragePermission {
        UserQuota: System.Int64;
        UsageAllowed: System.Security.Permissions.IsolatedStorageContainment;
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Assert: (() => void);
        Copy: (() => System.Security.IPermission);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        ToString: (() => string);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class KeyContainerPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(flags: System.Security.Permissions.KeyContainerPermissionFlags);
        constructor(flags: System.Security.Permissions.KeyContainerPermissionFlags, accessList: System.Security.Permissions.KeyContainerPermissionAccessEntry[]);
        AccessEntries: System.Security.Permissions.KeyContainerPermissionAccessEntryCollection;
        Flags: System.Security.Permissions.KeyContainerPermissionFlags;
        Copy: (() => System.Security.IPermission);
        FromXml: ((securityElement: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class KeyContainerPermissionAccessEntry {
        constructor(parameters: System.Security.Cryptography.CspParameters, flags: System.Security.Permissions.KeyContainerPermissionFlags);
        constructor(keyContainerName: string, flags: System.Security.Permissions.KeyContainerPermissionFlags);
        constructor(keyStore: string, providerName: string, providerType: number, keyContainerName: string, keySpec: number, flags: System.Security.Permissions.KeyContainerPermissionFlags);
        Flags: System.Security.Permissions.KeyContainerPermissionFlags;
        KeyContainerName: string;
        KeySpec: number;
        KeyStore: string;
        ProviderName: string;
        ProviderType: number;
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class KeyContainerPermissionAccessEntryCollection {
        Count: number;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        Add: ((accessEntry: System.Security.Permissions.KeyContainerPermissionAccessEntry) => number);
        Clear: (() => void);
        CopyTo: ((array: System.Security.Permissions.KeyContainerPermissionAccessEntry[], index: number) => void);
        GetEnumerator: (() => System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator);
        IndexOf: ((accessEntry: System.Security.Permissions.KeyContainerPermissionAccessEntry) => number);
        Remove: ((accessEntry: System.Security.Permissions.KeyContainerPermissionAccessEntry) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class KeyContainerPermissionAccessEntryEnumerator {
        Current: System.Security.Permissions.KeyContainerPermissionAccessEntry;
        MoveNext: (() => boolean);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum KeyContainerPermissionFlags {
        NoFlags = 0,
        Create = 1,
        Open = 2,
        Delete = 4,
        Import = 16,
        Export = 32,
        Sign = 256,
        Decrypt = 512,
        ViewAcl = 4096,
        ChangeAcl = 8192,
        AllFlags = 13111,
      }
      export enum PermissionState {
        Unrestricted = 1,
        None = 0,
      }
      export declare class PrincipalPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(name: string, role: string);
        constructor(name: string, role: string, isAuthenticated: boolean);
        Copy: (() => System.Security.IPermission);
        Demand: (() => void);
        FromXml: ((elem: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class PublisherIdentityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(certificate: System.Security.Cryptography.X509Certificates.X509Certificate);
        Certificate: System.Security.Cryptography.X509Certificates.X509Certificate;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class ReflectionPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(flag: System.Security.Permissions.ReflectionPermissionFlag);
        Flags: System.Security.Permissions.ReflectionPermissionFlag;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum ReflectionPermissionFlag {
        NoFlags = 0,
        TypeInformation = 1,
        MemberAccess = 2,
        ReflectionEmit = 4,
        AllFlags = 7,
        RestrictedMemberAccess = 8,
      }
      export declare class RegistryPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(access: System.Security.Permissions.RegistryPermissionAccess, pathList: string);
        constructor(access: System.Security.Permissions.RegistryPermissionAccess, control: System.Security.AccessControl.AccessControlActions, pathList: string);
        AddPathList: ((access: System.Security.Permissions.RegistryPermissionAccess, pathList: string) => void) | ((access: System.Security.Permissions.RegistryPermissionAccess, control: System.Security.AccessControl.AccessControlActions, pathList: string) => void);
        GetPathList: ((access: System.Security.Permissions.RegistryPermissionAccess) => string);
        SetPathList: ((access: System.Security.Permissions.RegistryPermissionAccess, pathList: string) => void);
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((other: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum RegistryPermissionAccess {
        NoAccess = 0,
        Read = 1,
        Write = 2,
        Create = 4,
        AllAccess = 7,
      }
      export enum SecurityAction {
        Demand = 2,
        Assert = 3,
        Deny = 4,
        PermitOnly = 5,
        LinkDemand = 6,
        InheritanceDemand = 7,
        RequestMinimum = 8,
        RequestOptional = 9,
        RequestRefuse = 10,
      }
      export declare class SecurityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(flag: System.Security.Permissions.SecurityPermissionFlag);
        Flags: System.Security.Permissions.SecurityPermissionFlag;
        IsUnrestricted: (() => boolean);
        Copy: (() => System.Security.IPermission);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        ToXml: (() => System.Security.SecurityElement);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum SecurityPermissionFlag {
        NoFlags = 0,
        Assertion = 1,
        UnmanagedCode = 2,
        SkipVerification = 4,
        Execution = 8,
        ControlThread = 16,
        ControlEvidence = 32,
        ControlPolicy = 64,
        SerializationFormatter = 128,
        ControlDomainPolicy = 256,
        ControlPrincipal = 512,
        ControlAppDomain = 1024,
        RemotingConfiguration = 2048,
        Infrastructure = 4096,
        BindingRedirects = 8192,
        AllFlags = 16383,
      }
      export declare class SiteIdentityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(site: string);
        Site: string;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class StrongNameIdentityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(blob: System.Security.Permissions.StrongNamePublicKeyBlob, name: string, version: System.Version);
        Name: string;
        PublicKey: System.Security.Permissions.StrongNamePublicKeyBlob;
        Version: System.Version;
        Copy: (() => System.Security.IPermission);
        FromXml: ((e: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class StrongNamePublicKeyBlob {
        constructor(publicKey: System.Byte[]);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class UIPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(clipboardFlag: System.Security.Permissions.UIPermissionClipboard);
        constructor(windowFlag: System.Security.Permissions.UIPermissionWindow);
        constructor(windowFlag: System.Security.Permissions.UIPermissionWindow, clipboardFlag: System.Security.Permissions.UIPermissionClipboard);
        Clipboard: System.Security.Permissions.UIPermissionClipboard;
        Window: System.Security.Permissions.UIPermissionWindow;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        IsUnrestricted: (() => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export enum UIPermissionClipboard {
        NoClipboard = 0,
        OwnClipboard = 1,
        AllClipboard = 2,
      }
      export enum UIPermissionWindow {
        NoWindows = 0,
        SafeSubWindows = 1,
        SafeTopLevelWindows = 2,
        AllWindows = 3,
      }
      export declare class UrlIdentityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(site: string);
        Url: string;
        Copy: (() => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        ToXml: (() => System.Security.SecurityElement);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
      export declare class ZoneIdentityPermission {
        constructor(state: System.Security.Permissions.PermissionState);
        constructor(zone: System.Security.SecurityZone);
        SecurityZone: System.Security.SecurityZone;
        Copy: (() => System.Security.IPermission);
        IsSubsetOf: ((target: System.Security.IPermission) => boolean);
        Union: ((target: System.Security.IPermission) => System.Security.IPermission);
        Intersect: ((target: System.Security.IPermission) => System.Security.IPermission);
        FromXml: ((esd: System.Security.SecurityElement) => void);
        ToXml: (() => System.Security.SecurityElement);
        Assert: (() => void);
        Demand: (() => void);
        Deny: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        PermitOnly: (() => void);
        GetType: (() => System.Type);
      }
    }
    export namespace Policy {
      export declare class AllMembershipCondition {
        constructor();
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class ApplicationDirectory {
        constructor(name: string);
        Directory: string;
        Copy: (() => System.Object);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class ApplicationDirectoryMembershipCondition {
        constructor();
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class ApplicationSecurityInfo {
        constructor(activationContext: System.ActivationContext);
        ApplicationEvidence: System.Security.Policy.Evidence;
        ApplicationId: System.ApplicationId;
        DefaultRequestSet: System.Security.PermissionSet;
        DeploymentId: System.ApplicationId;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ApplicationSecurityManager {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ApplicationTrust {
        constructor();
        constructor(applicationIdentity: System.ApplicationIdentity);
        constructor(defaultGrantSet: System.Security.PermissionSet, fullTrustAssemblies: any);
        ApplicationIdentity: System.ApplicationIdentity;
        DefaultGrantSet: System.Security.Policy.PolicyStatement;
        ExtraInfo: System.Object;
        IsApplicationTrustedToRun: boolean;
        Persist: boolean;
        FullTrustAssemblies: any; // System.Collections.Generic.IList`1[System.Security.Policy.StrongName]
        FromXml: ((element: System.Security.SecurityElement) => void);
        ToXml: (() => System.Security.SecurityElement);
        Clone: (() => System.Security.Policy.EvidenceBase);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ApplicationTrustCollection {
        Count: number;
        IsSynchronized: boolean;
        SyncRoot: System.Object;
        Add: ((trust: System.Security.Policy.ApplicationTrust) => number);
        AddRange: ((trusts: System.Security.Policy.ApplicationTrust[]) => void) | ((trusts: System.Security.Policy.ApplicationTrustCollection) => void);
        Clear: (() => void);
        CopyTo: ((array: System.Security.Policy.ApplicationTrust[], index: number) => void);
        Find: ((applicationIdentity: System.ApplicationIdentity, versionMatch: System.Security.Policy.ApplicationVersionMatch) => System.Security.Policy.ApplicationTrustCollection);
        GetEnumerator: (() => System.Security.Policy.ApplicationTrustEnumerator);
        Remove: ((trust: System.Security.Policy.ApplicationTrust) => void) | ((applicationIdentity: System.ApplicationIdentity, versionMatch: System.Security.Policy.ApplicationVersionMatch) => void);
        RemoveRange: ((trusts: System.Security.Policy.ApplicationTrust[]) => void) | ((trusts: System.Security.Policy.ApplicationTrustCollection) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ApplicationTrustEnumerator {
        Current: System.Security.Policy.ApplicationTrust;
        MoveNext: (() => boolean);
        Reset: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum ApplicationVersionMatch {
        MatchExactVersion = 0,
        MatchAllVersions = 1,
      }
      export declare class CodeConnectAccess {
        constructor(allowScheme: string, allowPort: number);
        Port: number;
        Scheme: string;
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class CodeGroup {
        MergeLogic: string;
        PolicyStatement: System.Security.Policy.PolicyStatement;
        Description: string;
        MembershipCondition: System.Security.Policy.IMembershipCondition;
        Name: string;
        Children: System.Collections.IList;
        AttributeString: string;
        PermissionSetName: string;
        Copy: (() => System.Security.Policy.CodeGroup);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        AddChild: ((group: System.Security.Policy.CodeGroup) => void);
        Equals: ((o: System.Object) => boolean) | ((cg: System.Security.Policy.CodeGroup, compareChildren: boolean) => boolean);
        RemoveChild: ((group: System.Security.Policy.CodeGroup) => void);
        GetHashCode: (() => number);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Evidence {
        constructor();
        constructor(evidence: System.Security.Policy.Evidence);
        constructor(hostEvidence: System.Object[], assemblyEvidence: System.Object[]);
        constructor(hostEvidence: System.Security.Policy.EvidenceBase[], assemblyEvidence: System.Security.Policy.EvidenceBase[]);
        Count: number;
        IsReadOnly: boolean;
        IsSynchronized: boolean;
        Locked: boolean;
        SyncRoot: System.Object;
        AddAssembly: ((id: System.Object) => void);
        AddHost: ((id: System.Object) => void);
        Clear: (() => void);
        Clone: (() => System.Security.Policy.Evidence);
        CopyTo: ((array: System.Array, index: number) => void);
        GetEnumerator: (() => System.Collections.IEnumerator);
        GetAssemblyEnumerator: (() => System.Collections.IEnumerator);
        GetHostEnumerator: (() => System.Collections.IEnumerator);
        Merge: ((evidence: System.Security.Policy.Evidence) => void);
        RemoveType: ((t: System.Type) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class EvidenceBase {
        Clone: (() => System.Security.Policy.EvidenceBase);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FileCodeGroup {
        constructor(membershipCondition: System.Security.Policy.IMembershipCondition, access: System.Security.Permissions.FileIOPermissionAccess);
        MergeLogic: string;
        AttributeString: string;
        PermissionSetName: string;
        PolicyStatement: System.Security.Policy.PolicyStatement;
        Description: string;
        MembershipCondition: System.Security.Policy.IMembershipCondition;
        Name: string;
        Children: System.Collections.IList;
        Copy: (() => System.Security.Policy.CodeGroup);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        Equals: ((o: System.Object) => boolean) | ((cg: System.Security.Policy.CodeGroup, compareChildren: boolean) => boolean);
        GetHashCode: (() => number);
        AddChild: ((group: System.Security.Policy.CodeGroup) => void);
        RemoveChild: ((group: System.Security.Policy.CodeGroup) => void);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class FirstMatchCodeGroup {
        constructor(membershipCondition: System.Security.Policy.IMembershipCondition, policy: System.Security.Policy.PolicyStatement);
        MergeLogic: string;
        PolicyStatement: System.Security.Policy.PolicyStatement;
        Description: string;
        MembershipCondition: System.Security.Policy.IMembershipCondition;
        Name: string;
        Children: System.Collections.IList;
        AttributeString: string;
        PermissionSetName: string;
        Copy: (() => System.Security.Policy.CodeGroup);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        AddChild: ((group: System.Security.Policy.CodeGroup) => void);
        Equals: ((o: System.Object) => boolean) | ((cg: System.Security.Policy.CodeGroup, compareChildren: boolean) => boolean);
        RemoveChild: ((group: System.Security.Policy.CodeGroup) => void);
        GetHashCode: (() => number);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class GacInstalled {
        constructor();
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class GacMembershipCondition {
        constructor();
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class Hash {
        constructor(assembly: System.Reflection.Assembly);
        MD5: System.Byte[];
        SHA1: System.Byte[];
        SHA256: System.Byte[];
        GenerateHash: ((hashAlg: System.Security.Cryptography.HashAlgorithm) => System.Byte[]);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class HashMembershipCondition {
        constructor(hashAlg: System.Security.Cryptography.HashAlgorithm, value: System.Byte[]);
        HashAlgorithm: System.Security.Cryptography.HashAlgorithm;
        HashValue: System.Byte[];
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export declare class IApplicationTrustManager {
        DetermineApplicationTrust: ((activationContext: System.ActivationContext, context: System.Security.Policy.TrustManagerContext) => System.Security.Policy.ApplicationTrust);
      }
      export declare class IIdentityPermissionFactory {
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
      }
      export declare class IMembershipCondition {
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((obj: System.Object) => boolean);
        ToString: (() => string);
      }
      export declare class NetCodeGroup {
        constructor(membershipCondition: System.Security.Policy.IMembershipCondition);
        AttributeString: string;
        MergeLogic: string;
        PermissionSetName: string;
        PolicyStatement: System.Security.Policy.PolicyStatement;
        Description: string;
        MembershipCondition: System.Security.Policy.IMembershipCondition;
        Name: string;
        Children: System.Collections.IList;
        AddConnectAccess: ((originScheme: string, connectAccess: System.Security.Policy.CodeConnectAccess) => void);
        Copy: (() => System.Security.Policy.CodeGroup);
        Equals: ((o: System.Object) => boolean) | ((cg: System.Security.Policy.CodeGroup, compareChildren: boolean) => boolean);
        GetConnectAccessRules: (() => System.Collections.DictionaryEntry[]);
        GetHashCode: (() => number);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResetConnectAccess: (() => void);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        AddChild: ((group: System.Security.Policy.CodeGroup) => void);
        RemoveChild: ((group: System.Security.Policy.CodeGroup) => void);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PermissionRequestEvidence {
        constructor(request: System.Security.PermissionSet, optional: System.Security.PermissionSet, denied: System.Security.PermissionSet);
        DeniedPermissions: System.Security.PermissionSet;
        OptionalPermissions: System.Security.PermissionSet;
        RequestedPermissions: System.Security.PermissionSet;
        Copy: (() => System.Security.Policy.PermissionRequestEvidence);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
      }
      export declare class PolicyException {
        constructor();
        constructor(message: string);
        constructor(message: string, exception: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class PolicyLevel {
        FullTrustAssemblies: System.Collections.IList;
        Label: string;
        NamedPermissionSets: System.Collections.IList;
        RootCodeGroup: System.Security.Policy.CodeGroup;
        StoreLocation: string;
        Type: System.Security.PolicyLevelType;
        AddFullTrustAssembly: ((sn: System.Security.Policy.StrongName) => void) | ((snMC: System.Security.Policy.StrongNameMembershipCondition) => void);
        AddNamedPermissionSet: ((permSet: System.Security.NamedPermissionSet) => void);
        ChangeNamedPermissionSet: ((name: string, pSet: System.Security.PermissionSet) => System.Security.NamedPermissionSet);
        FromXml: ((e: System.Security.SecurityElement) => void);
        GetNamedPermissionSet: ((name: string) => System.Security.NamedPermissionSet);
        Recover: (() => void);
        RemoveFullTrustAssembly: ((sn: System.Security.Policy.StrongName) => void) | ((snMC: System.Security.Policy.StrongNameMembershipCondition) => void);
        RemoveNamedPermissionSet: ((permSet: System.Security.NamedPermissionSet) => System.Security.NamedPermissionSet) | ((name: string) => System.Security.NamedPermissionSet);
        Reset: (() => void);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        ToXml: (() => System.Security.SecurityElement);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class PolicyStatement {
        constructor(permSet: System.Security.PermissionSet);
        constructor(permSet: System.Security.PermissionSet, attributes: System.Security.Policy.PolicyStatementAttribute);
        PermissionSet: System.Security.PermissionSet;
        Attributes: System.Security.Policy.PolicyStatementAttribute;
        AttributeString: string;
        Copy: (() => System.Security.Policy.PolicyStatement);
        FromXml: ((et: System.Security.SecurityElement) => void) | ((et: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum PolicyStatementAttribute {
        Nothing = 0,
        Exclusive = 1,
        LevelFinal = 2,
        All = 3,
      }
      export declare class Publisher {
        constructor(cert: System.Security.Cryptography.X509Certificates.X509Certificate);
        Certificate: System.Security.Cryptography.X509Certificates.X509Certificate;
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class PublisherMembershipCondition {
        constructor(certificate: System.Security.Cryptography.X509Certificates.X509Certificate);
        Certificate: System.Security.Cryptography.X509Certificates.X509Certificate;
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class Site {
        constructor(name: string);
        Name: string;
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class SiteMembershipCondition {
        constructor(site: string);
        Site: string;
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class StrongName {
        constructor(blob: System.Security.Permissions.StrongNamePublicKeyBlob, name: string, version: System.Version);
        Name: string;
        PublicKey: System.Security.Permissions.StrongNamePublicKeyBlob;
        Version: System.Version;
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class StrongNameMembershipCondition {
        constructor(blob: System.Security.Permissions.StrongNamePublicKeyBlob, name: string, version: System.Version);
        Name: string;
        Version: System.Version;
        PublicKey: System.Security.Permissions.StrongNamePublicKeyBlob;
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class TrustManagerContext {
        constructor();
        constructor(uiContext: System.Security.Policy.TrustManagerUIContext);
        IgnorePersistedDecision: boolean;
        KeepAlive: boolean;
        NoPrompt: boolean;
        Persist: boolean;
        PreviousApplicationIdentity: System.ApplicationIdentity;
        UIContext: System.Security.Policy.TrustManagerUIContext;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum TrustManagerUIContext {
        Install = 0,
        Upgrade = 1,
        Run = 2,
      }
      export declare class UnionCodeGroup {
        constructor(membershipCondition: System.Security.Policy.IMembershipCondition, policy: System.Security.Policy.PolicyStatement);
        MergeLogic: string;
        PolicyStatement: System.Security.Policy.PolicyStatement;
        Description: string;
        MembershipCondition: System.Security.Policy.IMembershipCondition;
        Name: string;
        Children: System.Collections.IList;
        AttributeString: string;
        PermissionSetName: string;
        Copy: (() => System.Security.Policy.CodeGroup);
        Resolve: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.PolicyStatement);
        ResolveMatchingCodeGroups: ((evidence: System.Security.Policy.Evidence) => System.Security.Policy.CodeGroup);
        AddChild: ((group: System.Security.Policy.CodeGroup) => void);
        Equals: ((o: System.Object) => boolean) | ((cg: System.Security.Policy.CodeGroup, compareChildren: boolean) => boolean);
        RemoveChild: ((group: System.Security.Policy.CodeGroup) => void);
        GetHashCode: (() => number);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Url {
        constructor(name: string);
        Value: string;
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class UrlMembershipCondition {
        constructor(url: string);
        Url: string;
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
      export declare class Zone {
        constructor(zone: System.Security.SecurityZone);
        SecurityZone: System.Security.SecurityZone;
        Copy: (() => System.Object);
        CreateIdentityPermission: ((evidence: System.Security.Policy.Evidence) => System.Security.IPermission);
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        Clone: (() => System.Security.Policy.EvidenceBase);
        GetType: (() => System.Type);
      }
      export declare class ZoneMembershipCondition {
        constructor(zone: System.Security.SecurityZone);
        SecurityZone: System.Security.SecurityZone;
        Check: ((evidence: System.Security.Policy.Evidence) => boolean);
        Copy: (() => System.Security.Policy.IMembershipCondition);
        Equals: ((o: System.Object) => boolean);
        FromXml: ((e: System.Security.SecurityElement) => void) | ((e: System.Security.SecurityElement, level: System.Security.Policy.PolicyLevel) => void);
        GetHashCode: (() => number);
        ToString: (() => string);
        ToXml: (() => System.Security.SecurityElement) | ((level: System.Security.Policy.PolicyLevel) => System.Security.SecurityElement);
        GetType: (() => System.Type);
      }
    }
    export namespace Principal {
      export declare class GenericIdentity {
        constructor(name: string);
        constructor(name: string, type: string);
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Name: string;
        AuthenticationType: string;
        IsAuthenticated: boolean;
        Actor: System.Security.Claims.ClaimsIdentity;
        BootstrapContext: System.Object;
        Label: string;
        NameClaimType: string;
        RoleClaimType: string;
        Clone: (() => System.Security.Claims.ClaimsIdentity);
        AddClaim: ((claim: System.Security.Claims.Claim) => void);
        AddClaims: ((claims: any) => void);
        TryRemoveClaim: ((claim: System.Security.Claims.Claim) => boolean);
        RemoveClaim: ((claim: System.Security.Claims.Claim) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class GenericPrincipal {
        constructor(identity: System.Security.Principal.IIdentity, roles: string[]);
        Identity: System.Security.Principal.IIdentity;
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Identities: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.ClaimsIdentity]
        IsInRole: ((role: string) => boolean);
        Clone: (() => System.Security.Claims.ClaimsPrincipal);
        AddIdentity: ((identity: System.Security.Claims.ClaimsIdentity) => void);
        AddIdentities: ((identities: any) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class IIdentity {
        AuthenticationType: string;
        IsAuthenticated: boolean;
        Name: string;
      }
      export declare class IPrincipal {
        Identity: System.Security.Principal.IIdentity;
        IsInRole: ((role: string) => boolean);
      }
      export declare class IdentityNotMappedException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        UnmappedIdentities: System.Security.Principal.IdentityReferenceCollection;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetObjectData: ((serializationInfo: System.Runtime.Serialization.SerializationInfo, streamingContext: System.Runtime.Serialization.StreamingContext) => void);
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class IdentityReference {
        Value: string;
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        IsValidTargetType: ((targetType: System.Type) => boolean);
        ToString: (() => string);
        Translate: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetType: (() => System.Type);
      }
      export declare class IdentityReferenceCollection {
        constructor();
        constructor(capacity: number);
        Count: number;
        IsReadOnly: boolean;
        Add: ((identity: System.Security.Principal.IdentityReference) => void);
        Clear: (() => void);
        Contains: ((identity: System.Security.Principal.IdentityReference) => boolean);
        CopyTo: ((array: System.Security.Principal.IdentityReference[], offset: number) => void);
        GetEnumerator: (() => any);
        Remove: ((identity: System.Security.Principal.IdentityReference) => boolean);
        Translate: ((targetType: System.Type) => System.Security.Principal.IdentityReferenceCollection) | ((targetType: System.Type, forceSuccess: boolean) => System.Security.Principal.IdentityReferenceCollection);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class NTAccount {
        constructor(name: string);
        constructor(domainName: string, accountName: string);
        Value: string;
        Equals: ((o: System.Object) => boolean);
        GetHashCode: (() => number);
        IsValidTargetType: ((targetType: System.Type) => boolean);
        ToString: (() => string);
        Translate: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetType: (() => System.Type);
      }
      export enum PrincipalPolicy {
        UnauthenticatedPrincipal = 0,
        NoPrincipal = 1,
        WindowsPrincipal = 2,
      }
      export declare class SecurityIdentifier {
        constructor(sddlForm: string);
        constructor(binaryForm: System.Byte[], offset: number);
        constructor(binaryForm: System.IntPtr);
        constructor(sidType: System.Security.Principal.WellKnownSidType, domainSid: System.Security.Principal.SecurityIdentifier);
        AccountDomainSid: System.Security.Principal.SecurityIdentifier;
        BinaryLength: number;
        Value: string;
        CompareTo: ((sid: System.Security.Principal.SecurityIdentifier) => number);
        Equals: ((o: System.Object) => boolean) | ((sid: System.Security.Principal.SecurityIdentifier) => boolean);
        GetBinaryForm: ((binaryForm: System.Byte[], offset: number) => void);
        GetHashCode: (() => number);
        IsAccountSid: (() => boolean);
        IsEqualDomainSid: ((sid: System.Security.Principal.SecurityIdentifier) => boolean);
        IsValidTargetType: ((targetType: System.Type) => boolean);
        IsWellKnown: ((type: System.Security.Principal.WellKnownSidType) => boolean);
        ToString: (() => string);
        Translate: ((targetType: System.Type) => System.Security.Principal.IdentityReference);
        GetType: (() => System.Type);
      }
      export enum TokenAccessLevels {
        AssignPrimary = 1,
        Duplicate = 2,
        Impersonate = 4,
        Query = 8,
        QuerySource = 16,
        AdjustPrivileges = 32,
        AdjustGroups = 64,
        AdjustDefault = 128,
        AdjustSessionId = 256,
        Read = 131080,
        Write = 131296,
        AllAccess = 983551,
        MaximumAllowed = 33554432,
      }
      export enum TokenImpersonationLevel {
        Anonymous = 1,
        Delegation = 4,
        Identification = 2,
        Impersonation = 3,
        None = 0,
      }
      export enum WellKnownSidType {
        NullSid = 0,
        WorldSid = 1,
        LocalSid = 2,
        CreatorOwnerSid = 3,
        CreatorGroupSid = 4,
        CreatorOwnerServerSid = 5,
        CreatorGroupServerSid = 6,
        NTAuthoritySid = 7,
        DialupSid = 8,
        NetworkSid = 9,
        BatchSid = 10,
        InteractiveSid = 11,
        ServiceSid = 12,
        AnonymousSid = 13,
        ProxySid = 14,
        EnterpriseControllersSid = 15,
        SelfSid = 16,
        AuthenticatedUserSid = 17,
        RestrictedCodeSid = 18,
        TerminalServerSid = 19,
        RemoteLogonIdSid = 20,
        LogonIdsSid = 21,
        LocalSystemSid = 22,
        LocalServiceSid = 23,
        NetworkServiceSid = 24,
        BuiltinDomainSid = 25,
        BuiltinAdministratorsSid = 26,
        BuiltinUsersSid = 27,
        BuiltinGuestsSid = 28,
        BuiltinPowerUsersSid = 29,
        BuiltinAccountOperatorsSid = 30,
        BuiltinSystemOperatorsSid = 31,
        BuiltinPrintOperatorsSid = 32,
        BuiltinBackupOperatorsSid = 33,
        BuiltinReplicatorSid = 34,
        BuiltinPreWindows2000CompatibleAccessSid = 35,
        BuiltinRemoteDesktopUsersSid = 36,
        BuiltinNetworkConfigurationOperatorsSid = 37,
        AccountAdministratorSid = 38,
        AccountGuestSid = 39,
        AccountKrbtgtSid = 40,
        AccountDomainAdminsSid = 41,
        AccountDomainUsersSid = 42,
        AccountDomainGuestsSid = 43,
        AccountComputersSid = 44,
        AccountControllersSid = 45,
        AccountCertAdminsSid = 46,
        AccountSchemaAdminsSid = 47,
        AccountEnterpriseAdminsSid = 48,
        AccountPolicyAdminsSid = 49,
        AccountRasAndIasServersSid = 50,
        NtlmAuthenticationSid = 51,
        DigestAuthenticationSid = 52,
        SChannelAuthenticationSid = 53,
        ThisOrganizationSid = 54,
        OtherOrganizationSid = 55,
        BuiltinIncomingForestTrustBuildersSid = 56,
        BuiltinPerformanceMonitoringUsersSid = 57,
        BuiltinPerformanceLoggingUsersSid = 58,
        BuiltinAuthorizationAccessSid = 59,
        WinBuiltinTerminalServerLicenseServersSid = 60,
        MaxDefined = 60,
        WinBuiltinDCOMUsersSid = 61,
        WinBuiltinIUsersSid = 62,
        WinIUserSid = 63,
        WinBuiltinCryptoOperatorsSid = 64,
        WinUntrustedLabelSid = 65,
        WinLowLabelSid = 66,
        WinMediumLabelSid = 67,
        WinHighLabelSid = 68,
        WinSystemLabelSid = 69,
        WinWriteRestrictedCodeSid = 70,
        WinCreatorOwnerRightsSid = 71,
        WinCacheablePrincipalsGroupSid = 72,
        WinNonCacheablePrincipalsGroupSid = 73,
        WinEnterpriseReadonlyControllersSid = 74,
        WinAccountReadonlyControllersSid = 75,
        WinBuiltinEventLogReadersGroup = 76,
        WinNewEnterpriseReadonlyControllersSid = 77,
        WinBuiltinCertSvcDComAccessGroup = 78,
        WinMediumPlusLabelSid = 79,
        WinLocalLogonSid = 80,
        WinConsoleLogonSid = 81,
        WinThisOrganizationCertificateSid = 82,
        WinApplicationPackageAuthoritySid = 83,
        WinBuiltinAnyPackageSid = 84,
        WinCapabilityInternetClientSid = 85,
        WinCapabilityInternetClientServerSid = 86,
        WinCapabilityPrivateNetworkClientServerSid = 87,
        WinCapabilityPicturesLibrarySid = 88,
        WinCapabilityVideosLibrarySid = 89,
        WinCapabilityMusicLibrarySid = 90,
        WinCapabilityDocumentsLibrarySid = 91,
        WinCapabilitySharedUserCertificatesSid = 92,
        WinCapabilityEnterpriseAuthenticationSid = 93,
        WinCapabilityRemovableStorageSid = 94,
      }
      export enum WindowsAccountType {
        Normal = 0,
        Guest = 1,
        System = 2,
        Anonymous = 3,
      }
      export enum WindowsBuiltInRole {
        Administrator = 544,
        User = 545,
        Guest = 546,
        PowerUser = 547,
        AccountOperator = 548,
        SystemOperator = 549,
        PrintOperator = 550,
        BackupOperator = 551,
        Replicator = 552,
      }
      export declare class WindowsIdentity {
        constructor(userToken: System.IntPtr);
        constructor(userToken: System.IntPtr, type: string);
        constructor(userToken: System.IntPtr, type: string, acctType: System.Security.Principal.WindowsAccountType);
        constructor(userToken: System.IntPtr, type: string, acctType: System.Security.Principal.WindowsAccountType, isAuthenticated: boolean);
        constructor(sUserPrincipalName: string);
        constructor(sUserPrincipalName: string, type: string);
        constructor(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext);
        AuthenticationType: string;
        IsAnonymous: boolean;
        IsAuthenticated: boolean;
        IsGuest: boolean;
        IsSystem: boolean;
        Name: string;
        Token: System.IntPtr;
        Groups: System.Security.Principal.IdentityReferenceCollection;
        ImpersonationLevel: System.Security.Principal.TokenImpersonationLevel;
        Owner: System.Security.Principal.SecurityIdentifier;
        User: System.Security.Principal.SecurityIdentifier;
        AccessToken: any; // Microsoft.Win32.SafeHandles.SafeAccessTokenHandle
        DeviceClaims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        UserClaims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Actor: System.Security.Claims.ClaimsIdentity;
        BootstrapContext: System.Object;
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Label: string;
        NameClaimType: string;
        RoleClaimType: string;
        Dispose: (() => void);
        Impersonate: (() => System.Security.Principal.WindowsImpersonationContext);
        Clone: (() => System.Security.Claims.ClaimsIdentity);
        AddClaim: ((claim: System.Security.Claims.Claim) => void);
        AddClaims: ((claims: any) => void);
        TryRemoveClaim: ((claim: System.Security.Claims.Claim) => boolean);
        RemoveClaim: ((claim: System.Security.Claims.Claim) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class WindowsImpersonationContext {
        Dispose: (() => void);
        Undo: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class WindowsPrincipal {
        constructor(ntIdentity: System.Security.Principal.WindowsIdentity);
        Identity: System.Security.Principal.IIdentity;
        DeviceClaims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        UserClaims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Claims: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.Claim]
        Identities: any; // System.Collections.Generic.IEnumerable`1[System.Security.Claims.ClaimsIdentity]
        IsInRole: ((rid: number) => boolean) | ((role: string) => boolean) | ((role: System.Security.Principal.WindowsBuiltInRole) => boolean) | ((sid: System.Security.Principal.SecurityIdentifier) => boolean);
        Clone: (() => System.Security.Claims.ClaimsPrincipal);
        AddIdentity: ((identity: System.Security.Claims.ClaimsIdentity) => void);
        AddIdentities: ((identities: any) => void);
        FindAll: ((match: any) => any) | ((type: string) => any);
        FindFirst: ((match: any) => System.Security.Claims.Claim) | ((type: string) => System.Security.Claims.Claim);
        HasClaim: ((match: any) => boolean) | ((type: string, value: string) => boolean);
        WriteTo: ((writer: System.IO.BinaryWriter) => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
    }
  }
  export namespace Text {
    export declare class ASCIIEncoding {
      constructor();
      IsSingleByte: boolean;
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      GetByteCount: ((chars: System.Char[], index: number, count: number) => number) | ((chars: string) => number) | ((chars: System.Char[]) => number);
      GetBytes: ((chars: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((s: string) => System.Byte[]);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[]) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]);
      GetString: ((bytes: System.Byte[], byteIndex: number, byteCount: number) => string) | ((bytes: System.Byte[]) => string);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      GetDecoder: (() => System.Text.Decoder);
      GetEncoder: (() => System.Text.Encoder);
      GetPreamble: (() => System.Byte[]);
      Clone: (() => System.Object);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Decoder {
      Fallback: System.Text.DecoderFallback;
      FallbackBuffer: System.Text.DecoderFallbackBuffer;
      Reset: (() => void);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[], index: number, count: number, flush: boolean) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number, flush: boolean) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderExceptionFallback {
      constructor();
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.DecoderFallbackBuffer);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderExceptionFallbackBuffer {
      constructor();
      Remaining: number;
      Fallback: ((bytesUnknown: System.Byte[], index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderFallbackException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      constructor(message: string, bytesUnknown: System.Byte[], index: number);
      BytesUnknown: System.Byte[];
      Index: number;
      Message: string;
      ParamName: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class DecoderFallback {
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.DecoderFallbackBuffer);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderFallbackBuffer {
      Remaining: number;
      Fallback: ((bytesUnknown: System.Byte[], index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderReplacementFallback {
      constructor();
      constructor(replacement: string);
      DefaultString: string;
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.DecoderFallbackBuffer);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class DecoderReplacementFallbackBuffer {
      constructor(fallback: System.Text.DecoderReplacementFallback);
      Remaining: number;
      Fallback: ((bytesUnknown: System.Byte[], index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Encoder {
      Fallback: System.Text.EncoderFallback;
      FallbackBuffer: System.Text.EncoderFallbackBuffer;
      Reset: (() => void);
      GetByteCount: ((chars: System.Char[], index: number, count: number, flush: boolean) => number);
      GetBytes: ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number, flush: boolean) => number);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderExceptionFallback {
      constructor();
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.EncoderFallbackBuffer);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderExceptionFallbackBuffer {
      constructor();
      Remaining: number;
      Fallback: ((charUnknown: System.Char, index: number) => boolean) | ((charUnknownHigh: System.Char, charUnknownLow: System.Char, index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderFallbackException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      CharUnknown: System.Char;
      CharUnknownHigh: System.Char;
      CharUnknownLow: System.Char;
      Index: number;
      Message: string;
      ParamName: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      IsUnknownSurrogate: (() => boolean);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class EncoderFallback {
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.EncoderFallbackBuffer);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderFallbackBuffer {
      Remaining: number;
      Fallback: ((charUnknown: System.Char, index: number) => boolean) | ((charUnknownHigh: System.Char, charUnknownLow: System.Char, index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderReplacementFallback {
      constructor();
      constructor(replacement: string);
      DefaultString: string;
      MaxCharCount: number;
      CreateFallbackBuffer: (() => System.Text.EncoderFallbackBuffer);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncoderReplacementFallbackBuffer {
      constructor(fallback: System.Text.EncoderReplacementFallback);
      Remaining: number;
      Fallback: ((charUnknown: System.Char, index: number) => boolean) | ((charUnknownHigh: System.Char, charUnknownLow: System.Char, index: number) => boolean);
      GetNextChar: (() => System.Char);
      MovePrevious: (() => boolean);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Encoding {
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      IsSingleByte: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      GetPreamble: (() => System.Byte[]);
      Clone: (() => System.Object);
      GetByteCount: ((chars: System.Char[]) => number) | ((s: string) => number) | ((chars: System.Char[], index: number, count: number) => number);
      GetBytes: ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((s: string) => System.Byte[]) | ((s: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number);
      GetCharCount: ((bytes: System.Byte[]) => number) | ((bytes: System.Byte[], index: number, count: number) => number);
      GetChars: ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]) | ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      GetDecoder: (() => System.Text.Decoder);
      GetEncoder: (() => System.Text.Encoder);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      GetString: ((bytes: System.Byte[]) => string) | ((bytes: System.Byte[], index: number, count: number) => string);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncodingInfo {
      CodePage: number;
      Name: string;
      DisplayName: string;
      GetEncoding: (() => System.Text.Encoding);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class EncodingProvider {
      constructor();
      GetEncoding: ((name: string) => System.Text.Encoding) | ((codepage: number) => System.Text.Encoding) | ((name: string, encoderFallback: System.Text.EncoderFallback, decoderFallback: System.Text.DecoderFallback) => System.Text.Encoding) | ((codepage: number, encoderFallback: System.Text.EncoderFallback, decoderFallback: System.Text.DecoderFallback) => System.Text.Encoding);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class StringBuilder {
      constructor();
      constructor(capacity: number);
      constructor(value: string);
      constructor(value: string, capacity: number);
      constructor(value: string, startIndex: number, length: number, capacity: number);
      constructor(capacity: number, maxCapacity: number);
      Capacity: number;
      MaxCapacity: number;
      Length: number;
      EnsureCapacity: ((capacity: number) => number);
      ToString: (() => string) | ((startIndex: number, length: number) => string);
      Clear: (() => System.Text.StringBuilder);
      Append: ((value: System.Char, repeatCount: number) => System.Text.StringBuilder) | ((value: System.Char[], startIndex: number, charCount: number) => System.Text.StringBuilder) | ((value: string) => System.Text.StringBuilder) | ((value: string, startIndex: number, count: number) => System.Text.StringBuilder) | ((value: boolean) => System.Text.StringBuilder) | ((value: System.SByte) => System.Text.StringBuilder) | ((value: System.Byte) => System.Text.StringBuilder) | ((value: System.Char) => System.Text.StringBuilder) | ((value: System.Int16) => System.Text.StringBuilder) | ((value: number) => System.Text.StringBuilder) | ((value: System.Int64) => System.Text.StringBuilder) | ((value: number) => System.Text.StringBuilder) | ((value: number) => System.Text.StringBuilder) | ((value: System.Decimal) => System.Text.StringBuilder) | ((value: System.UInt16) => System.Text.StringBuilder) | ((value: System.UInt32) => System.Text.StringBuilder) | ((value: System.UInt64) => System.Text.StringBuilder) | ((value: System.Object) => System.Text.StringBuilder) | ((value: System.Char[]) => System.Text.StringBuilder);
      AppendLine: (() => System.Text.StringBuilder) | ((value: string) => System.Text.StringBuilder);
      CopyTo: ((sourceIndex: number, destination: System.Char[], destinationIndex: number, count: number) => void);
      Insert: ((index: number, value: string, count: number) => System.Text.StringBuilder) | ((index: number, value: string) => System.Text.StringBuilder) | ((index: number, value: boolean) => System.Text.StringBuilder) | ((index: number, value: System.SByte) => System.Text.StringBuilder) | ((index: number, value: System.Byte) => System.Text.StringBuilder) | ((index: number, value: System.Int16) => System.Text.StringBuilder) | ((index: number, value: System.Char) => System.Text.StringBuilder) | ((index: number, value: System.Char[]) => System.Text.StringBuilder) | ((index: number, value: System.Char[], startIndex: number, charCount: number) => System.Text.StringBuilder) | ((index: number, value: number) => System.Text.StringBuilder) | ((index: number, value: System.Int64) => System.Text.StringBuilder) | ((index: number, value: number) => System.Text.StringBuilder) | ((index: number, value: number) => System.Text.StringBuilder) | ((index: number, value: System.Decimal) => System.Text.StringBuilder) | ((index: number, value: System.UInt16) => System.Text.StringBuilder) | ((index: number, value: System.UInt32) => System.Text.StringBuilder) | ((index: number, value: System.UInt64) => System.Text.StringBuilder) | ((index: number, value: System.Object) => System.Text.StringBuilder);
      Remove: ((startIndex: number, length: number) => System.Text.StringBuilder);
      AppendFormat: ((format: string, arg0: System.Object) => System.Text.StringBuilder) | ((format: string, arg0: System.Object, arg1: System.Object) => System.Text.StringBuilder) | ((format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => System.Text.StringBuilder) | ((format: string, args: System.Object[]) => System.Text.StringBuilder) | ((provider: System.IFormatProvider, format: string, arg0: System.Object) => System.Text.StringBuilder) | ((provider: System.IFormatProvider, format: string, arg0: System.Object, arg1: System.Object) => System.Text.StringBuilder) | ((provider: System.IFormatProvider, format: string, arg0: System.Object, arg1: System.Object, arg2: System.Object) => System.Text.StringBuilder) | ((provider: System.IFormatProvider, format: string, args: System.Object[]) => System.Text.StringBuilder);
      Replace: ((oldValue: string, newValue: string) => System.Text.StringBuilder) | ((oldValue: string, newValue: string, startIndex: number, count: number) => System.Text.StringBuilder) | ((oldChar: System.Char, newChar: System.Char) => System.Text.StringBuilder) | ((oldChar: System.Char, newChar: System.Char, startIndex: number, count: number) => System.Text.StringBuilder);
      Equals: ((sb: System.Text.StringBuilder) => boolean) | ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
    }
    export declare class UnicodeEncoding {
      constructor();
      constructor(bigEndian: boolean, byteOrderMark: boolean);
      constructor(bigEndian: boolean, byteOrderMark: boolean, throwOnInvalidBytes: boolean);
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      IsSingleByte: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      GetByteCount: ((chars: System.Char[], index: number, count: number) => number) | ((s: string) => number) | ((chars: System.Char[]) => number);
      GetBytes: ((s: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((s: string) => System.Byte[]);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[]) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]);
      GetString: ((bytes: System.Byte[], index: number, count: number) => string) | ((bytes: System.Byte[]) => string);
      GetEncoder: (() => System.Text.Encoder);
      GetDecoder: (() => System.Text.Decoder);
      GetPreamble: (() => System.Byte[]);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      Clone: (() => System.Object);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class UTF32Encoding {
      constructor();
      constructor(bigEndian: boolean, byteOrderMark: boolean);
      constructor(bigEndian: boolean, byteOrderMark: boolean, throwOnInvalidCharacters: boolean);
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      IsSingleByte: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      GetByteCount: ((chars: System.Char[], index: number, count: number) => number) | ((s: string) => number) | ((chars: System.Char[]) => number);
      GetBytes: ((s: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((s: string) => System.Byte[]);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[]) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]);
      GetString: ((bytes: System.Byte[], index: number, count: number) => string) | ((bytes: System.Byte[]) => string);
      GetDecoder: (() => System.Text.Decoder);
      GetEncoder: (() => System.Text.Encoder);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      GetPreamble: (() => System.Byte[]);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      Clone: (() => System.Object);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class UTF7Encoding {
      constructor();
      constructor(allowOptionals: boolean);
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      IsSingleByte: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      GetByteCount: ((chars: System.Char[], index: number, count: number) => number) | ((s: string) => number) | ((chars: System.Char[]) => number);
      GetBytes: ((s: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((s: string) => System.Byte[]);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[]) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]);
      GetString: ((bytes: System.Byte[], index: number, count: number) => string) | ((bytes: System.Byte[]) => string);
      GetDecoder: (() => System.Text.Decoder);
      GetEncoder: (() => System.Text.Encoder);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      GetPreamble: (() => System.Byte[]);
      Clone: (() => System.Object);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class UTF8Encoding {
      constructor();
      constructor(encoderShouldEmitUTF8Identifier: boolean);
      constructor(encoderShouldEmitUTF8Identifier: boolean, throwOnInvalidBytes: boolean);
      BodyName: string;
      EncodingName: string;
      HeaderName: string;
      WebName: string;
      WindowsCodePage: number;
      IsBrowserDisplay: boolean;
      IsBrowserSave: boolean;
      IsMailNewsDisplay: boolean;
      IsMailNewsSave: boolean;
      IsSingleByte: boolean;
      EncoderFallback: System.Text.EncoderFallback;
      DecoderFallback: System.Text.DecoderFallback;
      IsReadOnly: boolean;
      CodePage: number;
      GetByteCount: ((chars: System.Char[], index: number, count: number) => number) | ((chars: string) => number) | ((chars: System.Char[]) => number);
      GetBytes: ((s: string, charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[], charIndex: number, charCount: number, bytes: System.Byte[], byteIndex: number) => number) | ((chars: System.Char[]) => System.Byte[]) | ((chars: System.Char[], index: number, count: number) => System.Byte[]) | ((s: string) => System.Byte[]);
      GetCharCount: ((bytes: System.Byte[], index: number, count: number) => number) | ((bytes: System.Byte[]) => number);
      GetChars: ((bytes: System.Byte[], byteIndex: number, byteCount: number, chars: System.Char[], charIndex: number) => number) | ((bytes: System.Byte[]) => System.Char[]) | ((bytes: System.Byte[], index: number, count: number) => System.Char[]);
      GetString: ((bytes: System.Byte[], index: number, count: number) => string) | ((bytes: System.Byte[]) => string);
      GetDecoder: (() => System.Text.Decoder);
      GetEncoder: (() => System.Text.Encoder);
      GetMaxByteCount: ((charCount: number) => number);
      GetMaxCharCount: ((byteCount: number) => number);
      GetPreamble: (() => System.Byte[]);
      Equals: ((value: System.Object) => boolean);
      GetHashCode: (() => number);
      Clone: (() => System.Object);
      IsAlwaysNormalized: (() => boolean) | ((form: System.Text.NormalizationForm) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum NormalizationForm {
      FormC = 1,
      FormD = 2,
      FormKC = 5,
      FormKD = 6,
    }
  }
  export namespace Threading {
    export declare class CancellationToken {
      constructor(canceled: boolean);
      IsCancellationRequested: boolean;
      CanBeCanceled: boolean;
      WaitHandle: System.Threading.WaitHandle;
      Register: ((callback: System.Action) => System.Threading.CancellationTokenRegistration) | ((callback: System.Action, useSynchronizationContext: boolean) => System.Threading.CancellationTokenRegistration) | ((callback: any, state: System.Object) => System.Threading.CancellationTokenRegistration) | ((callback: any, state: System.Object, useSynchronizationContext: boolean) => System.Threading.CancellationTokenRegistration);
      Equals: ((other: System.Threading.CancellationToken) => boolean) | ((other: System.Object) => boolean);
      GetHashCode: (() => number);
      ThrowIfCancellationRequested: (() => void);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class CancellationTokenRegistration {
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean) | ((other: System.Threading.CancellationTokenRegistration) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class CancellationTokenSource {
      constructor();
      constructor(delay: System.TimeSpan);
      constructor(millisecondsDelay: number);
      IsCancellationRequested: boolean;
      Token: System.Threading.CancellationToken;
      Cancel: (() => void) | ((throwOnFirstException: boolean) => void);
      CancelAfter: ((delay: System.TimeSpan) => void) | ((millisecondsDelay: number) => void);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class CountdownEvent {
      constructor(initialCount: number);
      CurrentCount: number;
      InitialCount: number;
      IsSet: boolean;
      WaitHandle: System.Threading.WaitHandle;
      Dispose: (() => void);
      Signal: (() => boolean) | ((signalCount: number) => boolean);
      AddCount: (() => void) | ((signalCount: number) => void);
      TryAddCount: (() => boolean) | ((signalCount: number) => boolean);
      Reset: (() => void) | ((count: number) => void);
      Wait: (() => void) | ((cancellationToken: System.Threading.CancellationToken) => void) | ((timeout: System.TimeSpan) => boolean) | ((timeout: System.TimeSpan, cancellationToken: System.Threading.CancellationToken) => boolean) | ((millisecondsTimeout: number) => boolean) | ((millisecondsTimeout: number, cancellationToken: System.Threading.CancellationToken) => boolean);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum LazyThreadSafetyMode {
      None = 0,
      PublicationOnly = 1,
      ExecutionAndPublication = 2,
    }
    export declare class LazyInitializer {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ManualResetEventSlim {
      constructor();
      constructor(initialState: boolean);
      constructor(initialState: boolean, spinCount: number);
      WaitHandle: System.Threading.WaitHandle;
      IsSet: boolean;
      SpinCount: number;
      Set: (() => void);
      Reset: (() => void);
      Wait: (() => void) | ((cancellationToken: System.Threading.CancellationToken) => void) | ((timeout: System.TimeSpan) => boolean) | ((timeout: System.TimeSpan, cancellationToken: System.Threading.CancellationToken) => boolean) | ((millisecondsTimeout: number) => boolean) | ((millisecondsTimeout: number, cancellationToken: System.Threading.CancellationToken) => boolean);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SemaphoreSlim {
      constructor(initialCount: number);
      constructor(initialCount: number, maxCount: number);
      CurrentCount: number;
      AvailableWaitHandle: System.Threading.WaitHandle;
      Wait: (() => void) | ((cancellationToken: System.Threading.CancellationToken) => void) | ((timeout: System.TimeSpan) => boolean) | ((timeout: System.TimeSpan, cancellationToken: System.Threading.CancellationToken) => boolean) | ((millisecondsTimeout: number) => boolean) | ((millisecondsTimeout: number, cancellationToken: System.Threading.CancellationToken) => boolean);
      WaitAsync: (() => System.Threading.Tasks.Task) | ((cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((millisecondsTimeout: number) => any) | ((timeout: System.TimeSpan) => any) | ((timeout: System.TimeSpan, cancellationToken: System.Threading.CancellationToken) => any) | ((millisecondsTimeout: number, cancellationToken: System.Threading.CancellationToken) => any);
      Release: (() => number) | ((releaseCount: number) => number);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SpinLock {
      constructor(enableThreadOwnerTracking: boolean);
      IsHeld: boolean;
      IsHeldByCurrentThread: boolean;
      IsThreadOwnerTrackingEnabled: boolean;
      Exit: (() => void) | ((useMemoryBarrier: boolean) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class SpinWait {
      Count: number;
      NextSpinWillYield: boolean;
      SpinOnce: (() => void);
      Reset: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class AbandonedMutexException {
      constructor();
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      constructor(location: number, handle: System.Threading.WaitHandle);
      constructor(message: string, location: number, handle: System.Threading.WaitHandle);
      constructor(message: string, inner: System.Exception, location: number, handle: System.Threading.WaitHandle);
      Mutex: System.Threading.Mutex;
      MutexIndex: number;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum ApartmentState {
      STA = 0,
      MTA = 1,
      Unknown = 2,
    }
    export declare class AutoResetEvent {
      constructor(initialState: boolean);
      Handle: System.IntPtr;
      SafeWaitHandle: any; // Microsoft.Win32.SafeHandles.SafeWaitHandle
      Reset: (() => boolean);
      Set: (() => boolean);
      GetAccessControl: (() => System.Security.AccessControl.EventWaitHandleSecurity);
      SetAccessControl: ((eventSecurity: System.Security.AccessControl.EventWaitHandleSecurity) => void);
      WaitOne: ((millisecondsTimeout: number, exitContext: boolean) => boolean) | ((timeout: System.TimeSpan, exitContext: boolean) => boolean) | (() => boolean) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum EventResetMode {
      AutoReset = 0,
      ManualReset = 1,
    }
    export declare class EventWaitHandle {
      constructor(initialState: boolean, mode: System.Threading.EventResetMode);
      constructor(initialState: boolean, mode: System.Threading.EventResetMode, name: string);
      Handle: System.IntPtr;
      SafeWaitHandle: any; // Microsoft.Win32.SafeHandles.SafeWaitHandle
      Reset: (() => boolean);
      Set: (() => boolean);
      GetAccessControl: (() => System.Security.AccessControl.EventWaitHandleSecurity);
      SetAccessControl: ((eventSecurity: System.Security.AccessControl.EventWaitHandleSecurity) => void);
      WaitOne: ((millisecondsTimeout: number, exitContext: boolean) => boolean) | ((timeout: System.TimeSpan, exitContext: boolean) => boolean) | (() => boolean) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ContextCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((state: System.Object) => void);
      BeginInvoke: ((state: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class AsyncFlowControl {
      Dispose: (() => void);
      Undo: (() => void);
      GetHashCode: (() => number);
      Equals: ((obj: System.Object) => boolean) | ((obj: System.Threading.AsyncFlowControl) => boolean);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class ExecutionContext {
      Dispose: (() => void);
      CreateCopy: (() => System.Threading.ExecutionContext);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class LockRecursionException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class ManualResetEvent {
      constructor(initialState: boolean);
      Handle: System.IntPtr;
      SafeWaitHandle: any; // Microsoft.Win32.SafeHandles.SafeWaitHandle
      Reset: (() => boolean);
      Set: (() => boolean);
      GetAccessControl: (() => System.Security.AccessControl.EventWaitHandleSecurity);
      SetAccessControl: ((eventSecurity: System.Security.AccessControl.EventWaitHandleSecurity) => void);
      WaitOne: ((millisecondsTimeout: number, exitContext: boolean) => boolean) | ((timeout: System.TimeSpan, exitContext: boolean) => boolean) | (() => boolean) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Monitor {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ParameterizedThreadStart {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((obj: System.Object) => void);
      BeginInvoke: ((obj: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SemaphoreFullException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class SendOrPostCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((state: System.Object) => void);
      BeginInvoke: ((state: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SynchronizationContext {
      constructor();
      IsWaitNotificationRequired: (() => boolean);
      Send: ((d: System.Threading.SendOrPostCallback, state: System.Object) => void);
      Post: ((d: System.Threading.SendOrPostCallback, state: System.Object) => void);
      OperationStarted: (() => void);
      OperationCompleted: (() => void);
      Wait: ((waitHandles: System.IntPtr[], waitAll: boolean, millisecondsTimeout: number) => number);
      CreateCopy: (() => System.Threading.SynchronizationContext);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class SynchronizationLockException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class Thread {
      constructor(start: System.Threading.ThreadStart);
      constructor(start: System.Threading.ThreadStart, maxStackSize: number);
      constructor(start: System.Threading.ParameterizedThreadStart);
      constructor(start: System.Threading.ParameterizedThreadStart, maxStackSize: number);
      ExecutionContext: System.Threading.ExecutionContext;
      Priority: System.Threading.ThreadPriority;
      CurrentUICulture: System.Globalization.CultureInfo;
      CurrentCulture: System.Globalization.CultureInfo;
      ApartmentState: System.Threading.ApartmentState;
      IsThreadPoolThread: boolean;
      IsAlive: boolean;
      IsBackground: boolean;
      Name: string;
      ThreadState: System.Threading.ThreadState;
      ManagedThreadId: number;
      Start: (() => void) | ((parameter: System.Object) => void);
      SetCompressedStack: ((stack: System.Threading.CompressedStack) => void);
      GetCompressedStack: (() => System.Threading.CompressedStack);
      Suspend: (() => void);
      Resume: (() => void);
      Interrupt: (() => void);
      Join: (() => void) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Abort: (() => void) | ((stateInfo: System.Object) => void);
      GetApartmentState: (() => System.Threading.ApartmentState);
      SetApartmentState: ((state: System.Threading.ApartmentState) => void);
      TrySetApartmentState: ((state: System.Threading.ApartmentState) => boolean);
      GetHashCode: (() => number);
      DisableComObjectEagerCleanup: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ThreadAbortException {
      ExceptionState: System.Object;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class ThreadInterruptedException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class WaitCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((state: System.Object) => void);
      BeginInvoke: ((state: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class WaitOrTimerCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((state: System.Object, timedOut: boolean) => void);
      BeginInvoke: ((state: System.Object, timedOut: boolean, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class IOCompletionCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ThreadPool {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export enum ThreadPriority {
      Lowest = 0,
      BelowNormal = 1,
      Normal = 2,
      AboveNormal = 3,
      Highest = 4,
    }
    export declare class ThreadStart {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: (() => void);
      BeginInvoke: ((callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ThreadStartException {
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export enum ThreadState {
      Running = 0,
      StopRequested = 1,
      SuspendRequested = 2,
      Background = 4,
      Unstarted = 8,
      Stopped = 16,
      WaitSleepJoin = 32,
      Suspended = 64,
      AbortRequested = 128,
      Aborted = 256,
    }
    export declare class ThreadStateException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class Timeout {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class WaitHandle {
      Handle: System.IntPtr;
      SafeWaitHandle: any; // Microsoft.Win32.SafeHandles.SafeWaitHandle
      WaitOne: ((millisecondsTimeout: number, exitContext: boolean) => boolean) | ((timeout: System.TimeSpan, exitContext: boolean) => boolean) | (() => boolean) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class WaitHandleExtensions {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class WaitHandleCannotBeOpenedException {
      constructor();
      constructor(message: string);
      constructor(message: string, innerException: System.Exception);
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException: (() => System.Exception);
      ToString: (() => string);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      GetType: (() => System.Type) | (() => System.Type);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
    }
    export declare class CompressedStack {
      CreateCopy: (() => System.Threading.CompressedStack);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class HostExecutionContext {
      constructor();
      constructor(state: System.Object);
      CreateCopy: (() => System.Threading.HostExecutionContext);
      Dispose: (() => void) | ((disposing: boolean) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class HostExecutionContextManager {
      constructor();
      Capture: (() => System.Threading.HostExecutionContext);
      Revert: ((previousState: System.Object) => void);
      SetHostExecutionContext: ((hostExecutionContext: System.Threading.HostExecutionContext) => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Interlocked {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class LockCookie {
      GetHashCode: (() => number);
      Equals: ((obj: System.Threading.LockCookie) => boolean) | ((obj: System.Object) => boolean);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class Mutex {
      constructor();
      constructor(initiallyOwned: boolean);
      constructor(initiallyOwned: boolean, name: string);
      Handle: System.IntPtr;
      SafeWaitHandle: any; // Microsoft.Win32.SafeHandles.SafeWaitHandle
      GetAccessControl: (() => System.Security.AccessControl.MutexSecurity);
      ReleaseMutex: (() => void);
      SetAccessControl: ((mutexSecurity: System.Security.AccessControl.MutexSecurity) => void);
      WaitOne: ((millisecondsTimeout: number, exitContext: boolean) => boolean) | ((timeout: System.TimeSpan, exitContext: boolean) => boolean) | (() => boolean) | ((millisecondsTimeout: number) => boolean) | ((timeout: System.TimeSpan) => boolean);
      Close: (() => void);
      Dispose: (() => void);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class NativeOverlapped {
      InternalLow: System.IntPtr;
      InternalHigh: System.IntPtr;
      OffsetLow: number;
      OffsetHigh: number;
      EventHandle: System.IntPtr;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      ToString: (() => string);
      GetType: (() => System.Type);
    }
    export declare class Overlapped {
      constructor();
      constructor(offsetLo: number, offsetHi: number, hEvent: number, ar: System.IAsyncResult);
      constructor(offsetLo: number, offsetHi: number, hEvent: System.IntPtr, ar: System.IAsyncResult);
      AsyncResult: System.IAsyncResult;
      EventHandle: number;
      EventHandleIntPtr: System.IntPtr;
      OffsetHigh: number;
      OffsetLow: number;
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ReaderWriterLock {
      constructor();
      IsReaderLockHeld: boolean;
      IsWriterLockHeld: boolean;
      WriterSeqNum: number;
      AcquireReaderLock: ((millisecondsTimeout: number) => void) | ((timeout: System.TimeSpan) => void);
      AcquireWriterLock: ((millisecondsTimeout: number) => void) | ((timeout: System.TimeSpan) => void);
      AnyWritersSince: ((seqNum: number) => boolean);
      ReleaseLock: (() => System.Threading.LockCookie);
      ReleaseReaderLock: (() => void);
      ReleaseWriterLock: (() => void);
      UpgradeToWriterLock: ((millisecondsTimeout: number) => System.Threading.LockCookie) | ((timeout: System.TimeSpan) => System.Threading.LockCookie);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class RegisteredWaitHandle {
      Unregister: ((waitObject: System.Threading.WaitHandle) => boolean);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Timer {
      constructor(callback: System.Threading.TimerCallback, state: System.Object, dueTime: number, period: number);
      constructor(callback: System.Threading.TimerCallback, state: System.Object, dueTime: System.Int64, period: System.Int64);
      constructor(callback: System.Threading.TimerCallback, state: System.Object, dueTime: System.TimeSpan, period: System.TimeSpan);
      constructor(callback: System.Threading.TimerCallback, state: System.Object, dueTime: System.UInt32, period: System.UInt32);
      constructor(callback: System.Threading.TimerCallback);
      Change: ((dueTime: number, period: number) => boolean) | ((dueTime: System.TimeSpan, period: System.TimeSpan) => boolean) | ((dueTime: System.UInt32, period: System.UInt32) => boolean) | ((dueTime: System.Int64, period: System.Int64) => boolean);
      Dispose: (() => void) | ((notifyObject: System.Threading.WaitHandle) => boolean);
      CreateObjRef: ((requestedType: System.Type) => System.Runtime.Remoting.ObjRef);
      GetLifetimeService: (() => System.Object);
      InitializeLifetimeService: (() => System.Object);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class TimerCallback {
      constructor(object: System.Object, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: System.Object;
      Invoke: ((state: System.Object) => void);
      BeginInvoke: ((state: System.Object, callback: System.AsyncCallback, object: System.Object) => System.IAsyncResult);
      EndInvoke: ((result: System.IAsyncResult) => void);
      GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetInvocationList: (() => System.Delegate[]);
      DynamicInvoke: ((args: System.Object[]) => System.Object);
      Clone: (() => System.Object);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class Volatile {
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class ThreadPoolBoundHandle {
      Handle: System.Runtime.InteropServices.SafeHandle;
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export declare class PreAllocatedOverlapped {
      constructor(callback: System.Threading.IOCompletionCallback, state: System.Object, pinData: System.Object);
      Dispose: (() => void);
      Equals: ((obj: System.Object) => boolean);
      GetHashCode: (() => number);
      GetType: (() => System.Type);
      ToString: (() => string);
    }
    export namespace Tasks {
      export declare class ConcurrentExclusiveSchedulerPair {
        constructor();
        constructor(taskScheduler: System.Threading.Tasks.TaskScheduler);
        constructor(taskScheduler: System.Threading.Tasks.TaskScheduler, maxConcurrencyLevel: number);
        constructor(taskScheduler: System.Threading.Tasks.TaskScheduler, maxConcurrencyLevel: number, maxItemsPerTask: number);
        Completion: System.Threading.Tasks.Task;
        ConcurrentScheduler: System.Threading.Tasks.TaskScheduler;
        ExclusiveScheduler: System.Threading.Tasks.TaskScheduler;
        Complete: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ParallelOptions {
        constructor();
        TaskScheduler: System.Threading.Tasks.TaskScheduler;
        MaxDegreeOfParallelism: number;
        CancellationToken: System.Threading.CancellationToken;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class Parallel {
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ParallelLoopState {
        ShouldExitCurrentIteration: boolean;
        IsStopped: boolean;
        IsExceptional: boolean;
        LowestBreakIteration?: any; // System.Nullable`1[System.Int64]
        Stop: (() => void);
        Break: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class ParallelLoopResult {
        IsCompleted: boolean;
        LowestBreakIteration?: any; // System.Nullable`1[System.Int64]
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        ToString: (() => string);
        GetType: (() => System.Type);
      }
      export enum TaskStatus {
        Created = 0,
        WaitingForActivation = 1,
        WaitingToRun = 2,
        Running = 3,
        WaitingForChildrenToComplete = 4,
        RanToCompletion = 5,
        Canceled = 6,
        Faulted = 7,
      }
      export declare class Task {
        constructor(action: System.Action);
        constructor(action: System.Action, cancellationToken: System.Threading.CancellationToken);
        constructor(action: System.Action, creationOptions: System.Threading.Tasks.TaskCreationOptions);
        constructor(action: System.Action, cancellationToken: System.Threading.CancellationToken, creationOptions: System.Threading.Tasks.TaskCreationOptions);
        constructor(action: any, state: System.Object);
        constructor(action: any, state: System.Object, cancellationToken: System.Threading.CancellationToken);
        constructor(action: any, state: System.Object, creationOptions: System.Threading.Tasks.TaskCreationOptions);
        constructor(action: any, state: System.Object, cancellationToken: System.Threading.CancellationToken, creationOptions: System.Threading.Tasks.TaskCreationOptions);
        Id: number;
        Exception: System.AggregateException;
        Status: System.Threading.Tasks.TaskStatus;
        IsCanceled: boolean;
        IsCompleted: boolean;
        IsCompletedSuccessfully: boolean;
        CreationOptions: System.Threading.Tasks.TaskCreationOptions;
        AsyncState: System.Object;
        IsFaulted: boolean;
        Start: (() => void) | ((scheduler: System.Threading.Tasks.TaskScheduler) => void);
        RunSynchronously: (() => void) | ((scheduler: System.Threading.Tasks.TaskScheduler) => void);
        Dispose: (() => void);
        GetAwaiter: (() => System.Runtime.CompilerServices.TaskAwaiter);
        ConfigureAwait: ((continueOnCapturedContext: boolean) => System.Runtime.CompilerServices.ConfiguredTaskAwaitable);
        Wait: (() => void) | ((timeout: System.TimeSpan) => boolean) | ((cancellationToken: System.Threading.CancellationToken) => void) | ((millisecondsTimeout: number) => boolean) | ((millisecondsTimeout: number, cancellationToken: System.Threading.CancellationToken) => boolean);
        ContinueWith: ((continuationAction: any) => System.Threading.Tasks.Task) | ((continuationAction: any, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((continuationAction: any, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task) | ((continuationAction: any, continuationOptions: System.Threading.Tasks.TaskContinuationOptions) => System.Threading.Tasks.Task) | ((continuationAction: any, cancellationToken: System.Threading.CancellationToken, continuationOptions: System.Threading.Tasks.TaskContinuationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task) | ((continuationAction: any, state: System.Object) => System.Threading.Tasks.Task) | ((continuationAction: any, state: System.Object, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((continuationAction: any, state: System.Object, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task) | ((continuationAction: any, state: System.Object, continuationOptions: System.Threading.Tasks.TaskContinuationOptions) => System.Threading.Tasks.Task) | ((continuationAction: any, state: System.Object, cancellationToken: System.Threading.CancellationToken, continuationOptions: System.Threading.Tasks.TaskContinuationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export enum TaskCreationOptions {
        None = 0,
        PreferFairness = 1,
        LongRunning = 2,
        AttachedToParent = 4,
        DenyChildAttach = 8,
        HideScheduler = 16,
        RunContinuationsAsynchronously = 64,
      }
      export enum TaskContinuationOptions {
        None = 0,
        PreferFairness = 1,
        LongRunning = 2,
        AttachedToParent = 4,
        DenyChildAttach = 8,
        HideScheduler = 16,
        LazyCancellation = 32,
        RunContinuationsAsynchronously = 64,
        NotOnRanToCompletion = 65536,
        NotOnFaulted = 131072,
        NotOnCanceled = 262144,
        OnlyOnRanToCompletion = 393216,
        OnlyOnFaulted = 327680,
        OnlyOnCanceled = 196608,
        ExecuteSynchronously = 524288,
      }
      export declare class TaskCanceledException {
        constructor();
        constructor(message: string);
        constructor(message: string, innerException: System.Exception);
        constructor(task: System.Threading.Tasks.Task);
        Task: System.Threading.Tasks.Task;
        CancellationToken: System.Threading.CancellationToken;
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
      export declare class TaskFactory {
        constructor();
        constructor(cancellationToken: System.Threading.CancellationToken);
        constructor(scheduler: System.Threading.Tasks.TaskScheduler);
        constructor(creationOptions: System.Threading.Tasks.TaskCreationOptions, continuationOptions: System.Threading.Tasks.TaskContinuationOptions);
        constructor(cancellationToken: System.Threading.CancellationToken, creationOptions: System.Threading.Tasks.TaskCreationOptions, continuationOptions: System.Threading.Tasks.TaskContinuationOptions, scheduler: System.Threading.Tasks.TaskScheduler);
        CancellationToken: System.Threading.CancellationToken;
        Scheduler: System.Threading.Tasks.TaskScheduler;
        CreationOptions: System.Threading.Tasks.TaskCreationOptions;
        ContinuationOptions: System.Threading.Tasks.TaskContinuationOptions;
        StartNew: ((action: System.Action) => System.Threading.Tasks.Task) | ((action: System.Action, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((action: System.Action, creationOptions: System.Threading.Tasks.TaskCreationOptions) => System.Threading.Tasks.Task) | ((action: System.Action, cancellationToken: System.Threading.CancellationToken, creationOptions: System.Threading.Tasks.TaskCreationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task) | ((action: any, state: System.Object) => System.Threading.Tasks.Task) | ((action: any, state: System.Object, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((action: any, state: System.Object, creationOptions: System.Threading.Tasks.TaskCreationOptions) => System.Threading.Tasks.Task) | ((action: any, state: System.Object, cancellationToken: System.Threading.CancellationToken, creationOptions: System.Threading.Tasks.TaskCreationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task);
        FromAsync: ((asyncResult: System.IAsyncResult, endMethod: any) => System.Threading.Tasks.Task) | ((asyncResult: System.IAsyncResult, endMethod: any, creationOptions: System.Threading.Tasks.TaskCreationOptions) => System.Threading.Tasks.Task) | ((asyncResult: System.IAsyncResult, endMethod: any, creationOptions: System.Threading.Tasks.TaskCreationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task) | ((beginMethod: any, endMethod: any, state: System.Object) => System.Threading.Tasks.Task) | ((beginMethod: any, endMethod: any, state: System.Object, creationOptions: System.Threading.Tasks.TaskCreationOptions) => System.Threading.Tasks.Task);
        ContinueWhenAll: ((tasks: System.Threading.Tasks.Task[], continuationAction: any) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, continuationOptions: System.Threading.Tasks.TaskContinuationOptions) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, cancellationToken: System.Threading.CancellationToken, continuationOptions: System.Threading.Tasks.TaskContinuationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task);
        ContinueWhenAny: ((tasks: System.Threading.Tasks.Task[], continuationAction: any) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, cancellationToken: System.Threading.CancellationToken) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, continuationOptions: System.Threading.Tasks.TaskContinuationOptions) => System.Threading.Tasks.Task) | ((tasks: System.Threading.Tasks.Task[], continuationAction: any, cancellationToken: System.Threading.CancellationToken, continuationOptions: System.Threading.Tasks.TaskContinuationOptions, scheduler: System.Threading.Tasks.TaskScheduler) => System.Threading.Tasks.Task);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TaskScheduler {
        MaximumConcurrencyLevel: number;
        Id: number;
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class UnobservedTaskExceptionEventArgs {
        constructor(exception: System.AggregateException);
        Observed: boolean;
        Exception: System.AggregateException;
        SetObserved: (() => void);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
        GetType: (() => System.Type);
        ToString: (() => string);
      }
      export declare class TaskSchedulerException {
        constructor();
        constructor(message: string);
        constructor(innerException: System.Exception);
        constructor(message: string, innerException: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException: (() => System.Exception);
        ToString: (() => string);
        GetObjectData: ((info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext) => void);
        GetType: (() => System.Type) | (() => System.Type);
        Equals: ((obj: System.Object) => boolean);
        GetHashCode: (() => number);
      }
    }
  }
}
