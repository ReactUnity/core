---
title: useReactiveValue()
layout: API
---
## Storing Primitives
The `useReactiveValue` hook combined with the `ReactiveValue<T>` C# class allows you to hook into individual properties of an object.

`ReactiveValue`'s are set via the `.Value` property, which will automatically trigger any watching hooks.

For example, this `Player` `MonoBehaviour` could be stored in Globals:

```csharp
// C#
public class Player: MonoBehaviour {

    public ReactRendererBase renderer; 

    // special class for communicating between React and Unity
    public ReactiveValue<float> Score = new ReactiveValue<float>();
    public ReactiveValue<int> Deaths = new ReactiveValue<int>();
    public ReactiveValue<int> Kills = new ReactiveValue<int>();

    void Awake() {
      renderer.Globals["Player"] = this;
    }

    // set ReactiveValue with .Value
    public void AddScore(float score) {
      Score.Value += score;
    }

    /* Rest of Player code */
}
```
And then accessed in React via the hook:
```js
// JS
export default function ScoreTracker() {
  const {Player} = useGlobals();
  // will trigger a re-render when Score changes
  const score = useReactiveValue(Player.Score);

  return (<text>{score}</text>)
}
```

## Non-Primitive Types
For Lists and Dictionaries, there are the `ReactiveList<T>` and `ReactiveRecord<T>` classes.

 Normal `ReactiveValue`'s can also hold non-primitive objects, but they will only trigger a re-draw if the actual object reference changes. 
 
 It's recommended to either use a `ReactiveValue` per field (see above), an immutable type like `record`, or a secondary variable for tracking the state change (see below).

### Method 1: ReactiveList
Say we want to store a Player's inventory for drawing on the UI. The simplest approach is to use a `ReactiveList`:
 ```csharp
 // C#
 /* Player class continued */
 {
  // track a list of all items in the inventory
    public ReactiveList<Item> Inventory = new ReactiveList<Item>();

    public void AddItem(Item item) {
      // will trigger re-renders as needed
      Inventory.Add(item);
    }
 }
 ```
 ```js
 // JS
 export function DrawItems() {
  const {Player} = useGlobals();
  const itemList = useReactiveValue(Player.Inventory);
  // return drawn items
 }
 ```

 ### Method 2: Secondary Variable
 Now we want to add more functionality to the inventory, and it can no longer be just a list. Instead it is an `Inventory` object, and we track changes to its internal state with a counter variable.
 ```csharp
 /* Player class continued */
 {
    public ReactiveValue<int> InventoryChanges = new ReactiveValue<int>(); 
    public InventorySystem Inventory;

    public void AddItem(Item item) {
      // trigger re-render with counter instead
      InventoryChanges.Value += 1;
      Inventory.Add(item);
    }
 }
 ```
```js
// JS
export function DrawItems() {
  const {Player} = useGlobals();

  // re-render based on the counter
  const _invChanges = useReactiveValue(Player.InventoryChanges);

  // reference the Inventory object and call functions
  const inventory = Player.Inventory;
  const itemList = inventory.ListItems();

  // call other functions from Inventory class
  
  // return drawn items
}


