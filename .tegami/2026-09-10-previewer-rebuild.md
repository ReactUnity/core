---
packages:
  "npm:@reactunity/scripts": patch
---

### The browser previewer runs a current build again

The dev server's built-in previewer loads a Unity WebGL player hosted on `reactunity.github.io`, and the release it asks for is part of the URL. It was pinned to `0.20.0` — a player carrying the ReactUnity core from four releases ago, running an app built against today's renderer. It now loads a player built from this release.

The mismatch was not cosmetic, because the previewer only supplies the *JavaScript* from your dev server: layout, styling and every element the renderer talks to live in the C# inside that player. So it knew nothing about container queries, `:has()`, scroll-driven animations, blend modes, `clip-path`, soft masks or `font-family` fallbacks, and — now that the flex defaults have moved to the web's — it would have laid every one of those containers out the old way. A preview could disagree with a real player about where the boxes went, with nothing on the page to say why.

Nothing else changes: the build is still fetched on first load and cached by the browser, still nothing is downloaded at install time, and a `previewer/` folder in your own project still takes precedence over it.
