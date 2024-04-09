import { useRef, useState } from 'react';
import './index.css';

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
    { id: 0, text: 'Take a walk' },
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

export default TodoPage;
