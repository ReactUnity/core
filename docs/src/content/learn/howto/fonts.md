---
title: Using custom fonts
---

<Intro>

ReactUnity ships with Roboto and Roboto Mono fonts by default. These can be used by setting `font-family` to `sans-serif` and `monospace` respectively. However, in some cases you may want to change the font through your UI.

</Intro>

You may want to use custom fonts in one of the following scenarios:

- The default fonts don't have the glyphs you need (e.g. Chinese, Cyrillic, Arabic)
- You need a stylized look and feel for your app

In order to use a custom font, you must first create a TextMesh Pro Asset for that font, and place that under Resources folder. TMPro's Font Asset Creater can be used to generate the required font asset.

![Font Asset Creator](/images/docs/font-asset-creator.png)

After that, CSS `font-face` rule can be used to assign a name to that font asset to be used as a `font-family` inside CSS.

This works similar to the [standard CSS font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face). However, a `resource` URL must be given as the `src` property. Also, only the `font-family` and `src` descriptors are allowed. An example can be seen below.

```css active
@font-face {
  font-family: "My Custom Font";
  src: resource("Fonts/my-custom-font/cyrillic");
}

:root {
  font-family: "My Custom Font";
}
```

This is also [how ReactUnity defines the default font internally](https://github.com/ReactUnity/core/blob/main/Resources/ReactUnity/styles/ugui/useragent.css#L5-L13).
