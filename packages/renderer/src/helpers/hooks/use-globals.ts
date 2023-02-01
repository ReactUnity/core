import { createDictionaryWatcher } from "../dictionary-watcher";

const globalsWatcher = createDictionaryWatcher<any, DefaultGlobals>(Globals, 'globalsContext');
export const useGlobals = globalsWatcher.useValue;
export const useGlobalsContext = globalsWatcher.useContext;
export const useGlobalsSelector = globalsWatcher.useSelector;
export const GlobalsProvider = globalsWatcher.Provider;
