
import { UnityContext, UnitySchedulerContext } from './context';
import { ReactUnity } from './generated';
import { NativeContainerInstance } from './renderer';

declare global {
  const Unity: UnityContext;
  const RootContainer: NativeContainerInstance;
  const UnityScheduler: UnitySchedulerContext;
  const Callback: <T, R>(callback: (...args: T[]) => R) => ReactUnity.Interop.Callback;

  const localStorage: {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
}
