---
title: <prefab>
layout: API
---

`<prefab>` allows to instantiate a custom prefab as a React Component.

<Sandpack>

```js
export default function App() {
  // Load the prefab using globals
  const { prefab } = useGlobals();
  // or alternatively you can load the prefab from resources
  // const prefab = useMemo(() => Interop.UnityEngine.Resources.Load('MyPrefab') as UnityEngine.GameObject, []);

  return <prefab target={prefab} />;
};
```

</Sandpack>

### Lifecycle events and properties

`<prefab>` component instantiates the prefab, then searches for a component implementing the `IPrefabTarget` interface and calls the `Mount`, `UnMount` lifecycle hooks with the prefab instance.

You can use them to handle custom logic, events, and properties passed to the prefab.

#### Example of a custom prefab target component:
```csharp
public class MyComponentPrefabTarget : MonoBehaviour, IPrefabTarget
{
    PrefabComponent Component { get; set; }

    public Action AddEventListener(string eventName, Callback callback)
    {
        // Here you can handle custom events passed to the prefab.
        return null;
    }

    public void Mount(PrefabComponent cmp)
    {
        Debug.Log("Mounting MyComponentPrefabTarget");
        // Saving the reference of cmp to use it later
        // For instance you can use it to emit custom events to React `Component.FireEvent("onSomething", value)`
        Component = cmp;
    }

    public bool SetProperty(string propertyName, object value)
    {
        // Here you can handle custom properties passed to the prefab
        switch (propertyName)
        {
            case "myprop":
                Debug.Log("Doing something with myprop");
                return true;
        }
        return false;
    }

    public void Unmount(PrefabComponent cmp)
    {
        Debug.Log("Unmounting MyComponentPrefabTarget");
        Component = null;
    }
}
```

##### Example of a prefab with a custom target component:
```js

export default function App() {
  const prefab = useMemo(() => Interop.UnityEngine.Resources.Load('MyPrefab') as UnityEngine.GameObject, []);

  return (
    <prefab
      target={prefab}
      custom={{
        // This will be passed to the prefab target component
        myprop: 'something'
      }}
      // This will be invoked when `FireEvent` is called from the prefab target component
      onSomething={val => console.log('Something happened', val)}
    />
  );
};
```
