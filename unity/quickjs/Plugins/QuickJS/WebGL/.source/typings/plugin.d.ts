export { };

declare global {
  var state: PluginState;

  export declare type PluginState = {
    stringify: ((bytes: any) => string);
    stringifyBuffer: ((bytes: any, bufferSize) => string);
    bufferify: ((str: string) => [number, number]);
    dynCall: ((bytes: any) => string);
    runtimes: Record<string, PluginRuntime | undefined>;
    contexts: Record<string, PluginContext | undefined>;
    lastRuntimeId: number;
    lastContextId: number;
    atoms?: PluginHeap<string>;
    createHeap: <T>() => PluginHeap<T>;
  }

  export declare type PluginRuntime = {
    id: number;
    opaque?: any;
    contexts: Record<string, PluginContext | undefined>;
  };

  export declare type PluginContext = {
    id: number;
    opaque?: any;
    runtimeId: number;
    globalId: JSValue;

    objects: PluginHeap;

    iframe: HTMLIFrameElement;
    window: Window;
    evaluate: ((script: string) => any);
    execute: ((script: string) => any);

    lastException?: Error;
  };

  export declare type PluginHeap<T = any> = {
    record: Record<string | number, PluginHeapObject>;
    get: ((ref: JSValue) => T);
    push: ((obj: T) => JSValue);
    ref: ((obj: JSValue, diff: number) => number);
    lastId: number;
  };

  export declare type PluginHeapObject = {
    refCount: number;
    value: any;
  };
}
