---
packages:
  upm:com.reactunity.core:
    type: patch
  upm:com.reactunity.quickjs:
    type: patch
---

### CSS hot updates work with Vite 8.3

Vite 8.3 skips an unchanged stylesheet by reading `style.textContent` before it writes it, and the
`<style>` proxy only had a setter. Every CSS hot update failed with `property getter is null` on
QuickJS and a missing getter on ClearScript, and on Jint the stylesheet was rewritten every time.
`textContent` and `styleSheet.cssText` now read back the stylesheet text.

On QuickJS, reading any set-only C# property also threw `property getter is null`. It now reads as
`undefined`, the way a JavaScript accessor without a getter does.
