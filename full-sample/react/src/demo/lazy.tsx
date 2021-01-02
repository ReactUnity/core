import React from 'react';
import { useNavigate } from 'react-router';

export function Lazy() {
  const nav = useNavigate();

  return <>
    <view>This is lazy</view>
    <button onClick={() => nav(-1)}>Go Back</button>
  </>;
}
