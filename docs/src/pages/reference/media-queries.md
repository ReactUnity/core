---
title: Media Queries
---

CSS media queries are supported in ReactUnity. How to use media queries in CSS can be learned at [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). [Programmatical usage](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries) also works.

These are different kind of media queries supported in ReactUnity.

### Boolean typed media properties

Boolean properties are either true or false. There is no comparison required, only the existence of the property.

| Property      | Description                                          |
| ------------- | ---------------------------------------------------- |
| `all`         | Always true                                          |
| `screen`      | Always true, added for compatibility with browsers.  |
| `editor`      | True for editor UIs                                  |
| `runtime`     | True for non-editor UIs                              |
| `window`      | True for editor windows                              |
| `inspector`   | True for editor inspector drawers                    |
| `property`    | True for editor property drawers                     |
| `ugui`        | True for UIs built with UGUI                         |
| `uitoolkit`   | True for UIs built with UIToolkit                    |
| `full-screen` | True if game is in full-screen                       |
| `console`     | True if running in a console platform                |
| `mobile`      | True if running in a mobile platform                 |
| `batch`       | True if running in batch mode                        |
| `focused`     | True if game is currently in focus                   |
| `editing`     | True if currently in editor                          |
| `playing`     | True if inside built Player, or play state in editor |

#### Example

```css
@media (full-screen and ugui) {
  ...
}
```

### String typed media properties

String typed media properties has a current value to compare with.


| Property           | Valid values                                                                                                        | Description                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `framework`        | `ugui` or `uitoolkit`                                                                                               | UI renderer backend                                                                                                                                                                             |
| `orientation`      | `landscape` or `portrait`                                                                                           | The value will be `landscape` if the game width is greater than height, `portrait` otherwise                                                                                                    |
| `cursor`           | `visible` or `hidden`                                                                                               | Is the mouse cursor visible or hidden (via `Cursor.visible`)                                                                                                                                    |
| `cursor-lock`      | `locked`, `confined` or `none`                                                                                      | The lock state of mouse cursor (via `Cursor.lockState`)                                                                                                                                         |
| `engine`           | `jint`, `clearscript` or `quickjs`                                                                                  | Current JavaScript engine                                                                                                                                                                       |
| `yoga`             | `legacy`, `newest`                                                                                                  | Version of the Yoga layout engine that is used. This is `legacy` in WebGL and IOS builds. Legacy Yoga does not support `static` position and `gap` properties, thus a fallback may be required. |
| `platform`         | One of the values in [RuntimePlatform](https://docs.unity3d.com/ScriptReference/RuntimePlatform.html)               | Current platform (via `Application.platform`).                                                                                                                                                  |
| `system`           | `windows`, `linux`, `macosx` or `other`                                                                             | Current operating system (via `SystemInfo.operatingSystemFamily`).                                                                                                                              |
| `device-type`      | `desktop`, `console`, `handheld` or `unknown`                                                                       | Current device type (via `SystemInfo.deviceType`).                                                                                                                                              |
| `genuine`          | `yes`, `no` or `unknown`                                                                                            | Was the application files modified after build (via `Application.genuine`)                                                                                                                      |
| `language`         | One of the values in [SystemLanguage](https://docs.unity3d.com/ScriptReference/SystemLanguage.html)                 | Current system language (via `Application.systemLanguage`)                                                                                                                                      |
| `install-mode`     | One of the values in [ApplicationInstallMode](https://docs.unity3d.com/ScriptReference/ApplicationInstallMode.html) | Current install mode (via `Application.installMode`)                                                                                                                                            |
| `full-screen-mode` | `exclusive`, `borderless`, `maximised` or `windowed`                                                                | Current full screen mode (via `Screen.fullScreenMode`)                                                                                                                                          |
| `display-mode`     | `fullscreen`, `editor`, or `standalone`                                                                             | Whether the app is in fullscreen, editor or neither of them. Added for browser compatibility.                                                                                                   |
| `skin`             | `light` or `dark`                                                                                                   | (Editor Only) Currently used editor theme                                                                                                                                                       |
| `pointer`          | `fine`, `coarse` or `none`                                                                                          | The pointing accuracy of current pointer device. `coarse` for touch, and `fine` for mouse devices.                                                                                              |
| `any-pointer`      | `fine`, `coarse` or `none`                                                                                          | The list of pointing accuracy of available pointer devices                                                                                                                                      |
| `hover`            | `hover` or `none`                                                                                                   | Is the current pointer device capable of hovering (e.g. mouse)                                                                                                                                  |
| `any-hover`        | `hover` or `none`                                                                                                   | Does the device has any pointer device that is capable of hovering (e.g. mouse)                                                                                                                 |
| `input`            | `gamepad`, `touch`, `mouse`, `pen`, `keyboard`, `joystick`, `pointer`, `other`                                      | Has the value of last updated input device (Input System only)                                                                                                                                  |
| `any-input`        | Same as `input`                                                                                                     | List of all available input devices                                                                                                                                                             |

#### Example

```css
@media (system: windows) or (platform: iphoneplayer) {
  ...
}
```

### Numeric media properties

Numeric media properties has a current value that can be compared with numerically. They support `min-` and `max-` prefixes, as well as `=`, `<`, `<=`, `>` and `>=` operators.


| Property              | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `width`               | Width of the root element                             |
| `height`              | Height of the root element                            |
| `aspect-ratio`        | Width/height of the root element                      |
| `window-width`        | Width of the game window                              |
| `window-height`       | Height of the game window                             |
| `window-aspect-ratio` | Width/height of the game window                       |
| `screen-width`        | Width of the current screen                           |
| `screen-height`       | Height of the current screen                          |
| `screen-aspect-ratio` | Width/height of the current screen                    |
| `screen-refresh-rate` | Refresh rate of the current screen                    |
| `screen-dpi`          | DPI of the current screen                             |
| `screen-brightness`   | Brightness of the current screen                      |
| `target-fps`          | Target frame rate (via `Application.targetFrameRate`) |

#### Example

```css
@media (aspect-ratio: 1.6) and (1024 >= window-width >= 2160) {
  ...
}
```
