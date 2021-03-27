
import { ReactUnity } from './generated';
import { NativeContainerInstance } from './renderer';

declare global {
  const Unity: ReactUnity.ReactUnityAPI;
  const RootContainer: NativeContainerInstance;
  const UnityScheduler: ReactUnity.Schedulers.IUnityScheduler;
  const Callback: <T, R>(callback: (...args: T[]) => R) => ReactUnity.Interop.Callback;

  const localStorage: {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
}
