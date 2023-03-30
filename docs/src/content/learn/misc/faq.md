---
id: faq
title: FAQ
---

### Does ReactUnity work in desktop or mobile?

Yes, ReactUnity works in all platforms Unity builds to.

### How is the performance?

ReactUnity is suitable for most non-game apps built in Unity. But it doesn't promise to deliver perfect performance yet.

ReactUnity may not be suitable for most games. Especially games with realtime gameplay, high framerates, or very dynamic UIs. But your experience may vary. You can experiment with it and give us feedback.

ReactUnity uses a JavaScript engine to run your React code. This can be a significant overhead, especially for mobile devices. Using ReactUnity with UGUI may also cause a lot of draw calls, which is often problematic in mobile devices.

### Can I use CSS-in-JS, Sass, Tailwind, Bootstrap etc?

Yes. The recommended way to styling is to use CSS or Sass Modules. However, ReactUnity supports most styling libraries. Some of them are confirmed to be working. These are `emotion`, `styled-components`, `tailwind`, `react-bootstrap`, `jss` and `twin.macro`. If you encounter an issue with them, please let us know.

### Can I use ____ npm package?

Some packages that work are:

- React I18Next
- React Icons
- React Router (must use `MemoryRouter`) (`react-router` must be used instead of `react-router-dom`)
- Redux Toolkit
- Axios
- Typescript
- Styling libraries mentioned above

Packages depending on DOM or other platform-specific APIs will not work. Some of these are:

- `react-dom` and all packages depending on it
- `react-router-dom` (Use `react-router` instead)
- Component libraries: e.g. MUI, Mantine, Ant Design
- Packages depending on browser APIs: e.g. Google Analytics
- Packages depending on Intl: e.g. `react-intl`, Luxon

If you confirm a package is working or not working, please let us know.

### I have a question but I don't see it here...

Feel free to use the [Discord](https://discord.gg/UY2EFW5ZKG), [Github issues](https://github.com/ReactUnity/core/issues), or contact the author directly.
