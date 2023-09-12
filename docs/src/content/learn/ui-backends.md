---
title: Supported UI Backends
---

ReactUnity provides bindings to different Unity UI frameworks. We call the implementation of those UI frameworks as UI backends. React code communicates with UI backends to create the actual UI.

The three supported UI backends are:

- Unity UI (aliased `ugui`)
- UI Toolkit for Runtime (aliased `uitoolkit`)
- UI Toolkit for Editor (aliased `editor`)

`ugui` and `uitoolkit` can be used in runtime UI, whereas `editor` can be used to create editor UI such as windows and inspectors.

In the React project, `tsconfig.json` must contain the following config in order to show correct component types. (Replace `ugui` with desired UI backend)

```json
"jsxImportSource": "@reactunity/renderer/ugui"
"types": [
    "@reactunity/scripts/main"
]
```

`ugui` backend can be used by adding `ReactRendererUGUI` component to a GameObject and configuring it via inspector. Similarly, `uitoolkit` backend can be used by adding `ReactRendererUIToolkit` to a GameObject.

In order to use the `editor` backend, you must extend a class from either `ReactWindow`, `ReactInspector` or `ReactProperty`, and then implement its `GetScript` method to load the React script

## Comparison of UI backends

When create a runtime UI, developers have the option to either use Unity UI, or UI Toolkit. These two UI frameworks are entirely different and they have their own advantages and disadvantages.

In general, UI Toolkit has better performance while Unity UI has more flexibility. This characteristic of the two frameworks are true for ReactUnity as well. ReactUnity can extend the features of `ugui` to provide more features with each new version. Adding new features to `uitoolkit` is often not possible, since UI Toolkit does not allow such flexibility.

Also, each UI backend has its own set of supported components. For example, `video` tag is supported by `ugui` while it is not supported by others. This is just one example and there are many components like this that are incompatible between backends.

## Read more

Visit these useful links to learn more about the differences between these UI frameworks:

- [Unity UI Toolkit is better than expected](https://prographers.com/blog/unity-ui-toolkit-is-better-than-expected) - By Prographers [Unity 3D Developers](https://prographers.com/blog/unity-ui-toolkit-is-better-than-expected)
- [Comparison of UI systems in Unity](https://docs.unity3d.com/2023.1/Documentation/Manual/UI-system-compare.html) - By Unity Documentation
