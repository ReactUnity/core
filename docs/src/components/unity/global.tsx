/*
 * One Unity WebGL player, shared by every code example on the page.
 *
 * This used to be `GlobalUnityProvider`: a React context mounted once in _app.tsx that
 * handed every <Sandpack> the same instance. Astro has no shared React root -- each
 * Sandpack is its own island -- so a context cannot reach across them. A module-level
 * singleton can: islands are separate roots but they run in one document and share
 * module instances, so the first cartridge to mount boots the player and the rest
 * subscribe to it.
 *
 * That sharing is not an optimisation. The player is a ~100 MB wasm download; a second
 * copy per example on the page would be unusable.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import styles from './index.module.scss';
import { Unity } from './instance';
import { defaultUnityInstanceName, type UnityAPI } from './types';

let container: HTMLDivElement | undefined;
let root: Root | undefined;
let instance: UnityAPI | undefined;
let insertedTo: HTMLElement | undefined;

const listeners = new Set<() => void>();

// The value handed to subscribers has to be referentially stable between changes or
// useSyncExternalStore will loop, so it is rebuilt only when something actually moves.
let snapshot: { instance?: UnityAPI; insertedTo?: HTMLElement } = {};

function emit() {
  snapshot = { instance, insertedTo };
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

// Nothing about the player exists during the build, so server rendering gets the empty
// snapshot -- the same thing the first client render sees before the player boots.
const serverSnapshot: { instance?: UnityAPI; insertedTo?: HTMLElement } = {};

function ensureMounted() {
  if (container) return;

  container = document.createElement('div');
  container.className = styles.globalUnityContainer;
  container.style.display = 'none';
  document.body.appendChild(container);

  root = createRoot(container);
  root.render(
    <Unity
      sampleName={defaultUnityInstanceName}
      unityRef={(next) => {
        instance = next;
        emit();
      }}
    />
  );
}

/** Moves the player into `el`, or parks it off-screen when called with nothing. */
export function insertTo(el: HTMLElement | undefined) {
  if (!container) return;
  insertedTo = el;
  if (el) {
    el.appendChild(container);
    container.style.display = '';
  } else {
    container.style.display = 'none';
    document.body.appendChild(container);
  }
  emit();
}

export function getInsertedTo() {
  return insertedTo;
}

export function useGlobalUnity() {
  const { instance: currentInstance, insertedTo: currentInsertedTo } =
    useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);

  useEffect(() => {
    ensureMounted();
  }, []);

  return { instance: currentInstance, insertedTo: currentInsertedTo, insertTo };
}
