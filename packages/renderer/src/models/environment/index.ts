
import { ReactUnity } from '../generated';
import './dom/global';
export * from './interop';

interface Console {
  assert(condition?: boolean, ...data: any[]): void;
  clear(): void;
  debug(...data: any[]): void;
  dir(item?: any, options?: any): void;
  error(...data: any[]): void;
  exception(message?: string, ...optionalParams: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  trace(...data: any[]): void;
  warn(...data: any[]): void;
  count(name?: string): number;
}

interface ReactUnityDocument {
  querySelector: (query: string) => ReactUnity.IReactComponent;
  querySelectorAll: (query: string) => ReactUnity.IReactComponent[];
}

declare global {
  // ReactUnity exclusive
  var Context: ReactUnity.ReactContext;
  var HostContainer: ReactUnity.IContainerComponent;
  var UnityBridge: ReactUnity.ReactUnityBridge;

  // DOM-like
  var document: ReactUnityDocument;
  var location: ReactUnity.Scripting.DomProxies.Location;
  var localStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
  var console: Console;
  var global: typeof globalThis;
  function matchMedia(query: string): ReactUnity.Styling.Rules.MediaQueryList;

  interface DefaultGlobals {
    [key: string]: any;
  }

  var Globals: ReactUnity.Reactive.ReactiveRecord<any> & DefaultGlobals;

  // Scheduling
  var setImmediate: (callback: () => void) => number;
  var setTimeout: (callback: () => void, timeout: number) => number;
  var setInterval: (callback: () => void, timeout: number) => number;
  var requestAnimationFrame: (callback: () => void) => number;
  var clearTimeout: (handle: number) => void;
  var clearInterval: (handle: number) => void;
  var clearImmediate: (handle: number) => void;
  var cancelAnimationFrame: (handle: number) => void;
}
