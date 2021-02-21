
import { ObjectDictionary, UnityContext, UnitySchedulerContext } from './context';
import { NativeContainerInstance } from './renderer';

declare global {
  const Unity: UnityContext;
  const RootContainer: NativeContainerInstance;
  const Globals: ObjectDictionary;
  const UnityScheduler: UnitySchedulerContext;
  const Callback: <T, R>(callback: (...args: T[]) => R) => (...args: T[]) => R;

  const localStorage: {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
}
