
import { ReactUnity } from './generated';
import { NativeContainerInstance } from './renderer';

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
}

declare global {
  const UnityBridge: ReactUnity.ReactUnityBridge;
  const Context: ReactUnity.ReactContext;
  const HostContainer: NativeContainerInstance;
  const UnityScheduler: ReactUnity.Scheduling.IScheduler;
  const Callback: <T, R>(callback: (...args: T[]) => R) => ReactUnity.Helpers.Callback;
  const location: ReactUnity.Scripting.DomProxies.Location;
  const localStorage: ReactUnity.Scripting.DomProxies.LocalStorage;
  const console: Console;
  function matchMedia(query: string): ReactUnity.Styling.Rules.MediaQueryList;

  interface DefaultGlobals {
    [key: string]: any;
  }

  const Globals: ReactUnity.Helpers.WatchableRecord<any> & DefaultGlobals;

  const setImmediate: (callback: () => void) => number;
  const setTimeout: (callback: () => void, timeout: number) => number;
  const setInterval: (callback: () => void, timeout: number) => number;
  const requestAnimationFrame: (callback: () => void) => number;
  const clearTimeout: (handle: number) => void;
  const clearInterval: (handle: number) => void;
  const clearImmediate: (handle: number) => void;
  const cancelAnimationFrame: (handle: number) => void;
}
