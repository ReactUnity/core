
import { ReactUnity } from './generated';
import { NativeContainerInstance } from './renderer';

declare global {
  const UnityBridge: ReactUnity.ReactUnityBridge;
  const RootContainer: NativeContainerInstance;
  const UnityScheduler: ReactUnity.Schedulers.IUnityScheduler;
  const Callback: <T, R>(callback: (...args: T[]) => R) => ReactUnity.Helpers.Callback;
  const location: ReactUnity.DomProxies.Location;
  const localStorage: ReactUnity.DomProxies.LocalStorage;
  function matchMedia(query: string): ReactUnity.StyleEngine.MediaQueryList;

  interface DefaultGlobals {
    [key: string]: any;
  }

  const Globals: ReactUnity.Helpers.WatchableRecord<any> & DefaultGlobals;
}
