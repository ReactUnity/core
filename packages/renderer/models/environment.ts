
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
  const UnityScheduler: ReactUnity.Schedulers.IUnityScheduler;
  const Callback: <T, R>(callback: (...args: T[]) => R) => ReactUnity.Helpers.Callback;
  const location: ReactUnity.DomProxies.Location;
  const localStorage: ReactUnity.DomProxies.LocalStorage;
  const console: Console;
  function matchMedia(query: string): ReactUnity.StyleEngine.MediaQueryList;

  interface DefaultGlobals {
    [key: string]: any;
  }

  const Globals: ReactUnity.Helpers.WatchableRecord<any> & DefaultGlobals;
}
