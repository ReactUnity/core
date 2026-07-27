/// <reference types="astro/client" />

/*
 * No imports or exports in this file: that keeps it a global script rather than a module,
 * so `declare module` below is an ambient declaration (not an augmentation of a module
 * that has none) and the `Window` members merge into the global interface directly.
 */

// DocSearch ships a plain stylesheet with no type declaration, so a side-effect import of
// it is an error under `astro/tsconfigs/strict`.
declare module '@docsearch/css';

interface Window {
  /* Set by the inline theme script in src/layouts/BaseLayout.astro. */
  __theme: string;
  __setPreferredTheme: (theme: string) => void;
  /* Present only when PUBLIC_GA_TRACKING_ID is set at build time. */
  gtag?: (...args: unknown[]) => void;
}
