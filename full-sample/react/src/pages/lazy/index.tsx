import React from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

export function Lazy() {
  const nav = useNavigate();

  return <view className={styles.host}>
    <view>This is lazy</view>
    <button onClick={() => nav(-1)}>Go Back</button>
  </view>;
}
