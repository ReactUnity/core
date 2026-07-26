import clsx from 'clsx';
import { useState } from 'react';
import styles from './index.module.scss';

let lastId = 1;

export const AnimationsPage = () => {
  const [items, setItems] = useState([]);

  return <view className={clsx(styles.host)}>
    <pulsar />
    <catwalk />
    <ryu />

    <button onClick={() => setItems(x => [lastId++].concat(x))}>
      Add Item to start
    </button>

    <button onClick={() => setItems(x => x.concat([lastId++]))}>
      Add Item
    </button>

    <button onClick={() => setItems(x => x.slice(1))}>
      Remove Item
    </button>

    <view className={styles.items}>
      {items.map((x, i) =>
        <view className={styles.item} key={x}>
          <text>Item {x}</text>
        </view>)}
    </view>
  </view>;
};

export default AnimationsPage;
