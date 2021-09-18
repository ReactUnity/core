import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCount } from 'src/demo/store';

export function Redux() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return <>
    <view>Count: {count?.toString()}</view>
    <button onClick={() => dispatch(increment())}>Increment</button>
    <button onClick={() => dispatch(decrement())}>Decrement</button>
  </>;
}
