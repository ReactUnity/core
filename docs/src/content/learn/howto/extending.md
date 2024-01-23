---
title: Extending ReactUnity
---

<Intro>

Extending ReactUnity

</Intro>

## Declaring custom components

You can declare custom components in ReactUnity. This is useful when you want to create a component that needs to interact with the underlying backend (`ugui` or `uitoolkit`).

To declare a custom component, you need to create a new class extending `UGUIComponent` or `UIToolkitComponent` and register it in `UGUIContext.ComponentCreators` or `UIToolkitContext.ComponentCreators` respectively.

### Example
First we create the custom component. For instance, we are declaring a custom button component that has a red background color.

```cs
using ReactUnity.Styling;
using ReactUnity.UGUI;
using UnityEngine;

public class CustomButtonComponent : ButtonComponent
{
    public CustomButtonComponent(UGUIContext context, Color backgroundColor) : base(context)
    {
        Style[StyleProperties.backgroundColor] = backgroundColor;
    }
}
```

Then we need to register this component in `UGUIContext.ComponentCreators` dictionary. This can be done in a `MonoBehaviour` that is attached to the same `GameObject` as `ReactRendererUGUI` component.
The declaration must be done before `ReactRendererUGUI` is enabled.

```cs
using ReactUnity.UGUI;
using UnityEngine;

public class CustomComponentInitializer : MonoBehaviour
{
    public ReactRendererUGUI reactUnity;
    public Color customButtonColor;

    void Start()
    {
        UGUIContext.ComponentCreators["customButton"] = (type, text, context) => new CustomButtonComponent(context, customButtonColor);

        reactUnity.enabled = true;
    }
}
```

### Typescript declaration
You may also need to declare your custom component in Typescript

```ts
declare global {
  interface ReactUnityCustomElements {
    mycomponent: { myprop?: number };
  }
}
```

#### Example:
```ts
declare global {
  interface ReactUnityCustomElements {
    button: Button;
  }
}
```
