---
packages:
  upm:com.reactunity.quickjs:
    type: patch
---

### QuickJS parses and serializes JSON two and a half times as fast

The engine moves to the fork's `v0.17.0-gkurt.1`, which adds ports of Bellard's recent correctness
and performance fixes and a round of the fork's own work on JSON, arrays, regular expressions,
strings and number formatting. Inside Unity, a `JSON.stringify` and `JSON.parse` round trip of 5000
commands is 2.5× faster, a mixed workload of objects, strings, Maps, regexps and classes 1.13×, and
the Sucrase JSX transform 1.05×. Engine startup, JS → C# calls and rendering are unchanged, and so is
the stack budget.
