---
id: home
layout: Home
title: ReactUnity Docs
permalink: index.html
---

<HomepageHero />

# What is ReactUnity?

ReactUnity is a UI Framework for Unity, that lets you code in React or XML. It runs this code inside a JavaScript engine and outputs Unity components to directly render them inside Unity.

Here is a sample _Todo App_ to show off some React and CSS features of ReactUnity.

<Sandpack>

```js App.js active
import { render } from '@reactunity/renderer';
import { useRef, useState } from 'react';

export function TodoItem(props) {
  return <view className='todo-item'>
    <view className='todo-item-name'>
      {props.item.text}
    </view>

    <button className='todo-remove-button'
      onClick={() => props.onRemove(props.item.id)}>
      <icon>delete</icon>
    </button>
  </view>;
}

export function TodoPage() {
  const lastId = useRef(3);
  const [items, setItems] = useState([
    { id: 0, text: 'Walk the dog' },
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Prepare dinner' },
  ]);

  const inputRef = useRef();

  function addTodo(item) {
    inputRef.current.Value = '';
    setItems(oldItems => {
      const newItems = [...oldItems];
      newItems.push({ id: lastId.current++, text: item });
      return newItems;
    });
  }

  function removeTodo(id) {
    setItems(oldItems => oldItems.filter(x => x.id !== id));
  }

  return <scroll className='todo-root'>
    <view className="todo-header">
      TODO app example
    </view>

    <view className='todo-input-section'>
      <input className='todo-input' ref={inputRef}
        placeholder='Enter a new todo'
        onSubmit={(ev, sender) => addTodo(sender.Value)} />

      <button className='todo-add-button'
        onClick={() => addTodo(inputRef.current.Value)}>
        <icon>add</icon>
      </button>
    </view>

    <view className="todo-items">
      {items.map((item) =>
        <TodoItem item={item} key={item.id}
          onRemove={removeTodo} />)}
    </view>
  </scroll>;
}

render(<TodoPage />);
```

```css style.css
.todo-root {
  flex-direction: column;
  align-self: center;
  align-items: stretch;
  margin: 40px;
  padding: 40px;

  background-color: #dedede;
  border-radius: 8px;
  box-shadow: 1px 1px 6px -2px black;
}

.todo-header {
  color: cornflowerblue;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 18px;
  text-align: center;
}

.todo-input-section {
  flex-direction: row;
  align-items: stretch;
  width: 360px;
  margin-bottom: 18px;
}

.todo-input {
  flex-shrink: 1;
  flex-grow: 1;
}

.todo-item {
  flex-direction: row;
  align-items: center;
  transition: rotate 400ms, margin-bottom 400ms;
  rotate: 0 0 0;
  width: 360px;
  padding: 4px 0 4px 8px;
  margin-bottom: 0px;
  transform-origin: top;

  background-color: white;
  border: 1px solid #dedede;
  border-radius: 8px;
}

.todo-item:not(:first-child) {
  margin-top: 10px;
}

.todo-item:enter {
  rotate: 90deg 0 0;
  margin-bottom: -66px;
}

.todo-item:leave {
  rotate: 90deg 0 0;
  margin-bottom: -66px;
  pointer-events: none;
  state-duration: 400ms;
}

.todo-item-name {
  flex-shrink: 1;
  flex-grow: 1;
}

.todo-add-button,
.todo-remove-button {
  width: 50px;
  height: 50px;
  margin-left: 8px;
}
```

</Sandpack>


## This is a work in progress!

This is a **beta website**. There will be bugs, performance issues, and missing content.

## How much content is ready?

* [Learn ReactUnity](/learn): ~5% finished.
* [API Reference](/reference): ~40% finished.

Most of the API reference is there, although partially. Typescript will also help you write your code. However, other topics such as installation, interoperability, and other techniques are not documented yet. In the future, expect to see detailed documentation and video tutorials on such topics. In the meantime, you can rely on GitHub issues and Discord to answer your questions.

## How can I provide feedback?

Please use [this GitHub discussion](https://github.com/ReactUnity/core/discussions/82) or [Discord](https://discord.gg/UY2EFW5ZKG) for feedback. If you spot something that doesn't make sense, please tell us!
