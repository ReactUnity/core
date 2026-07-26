import { ReactUnity } from '@reactunity/renderer';
import { PointerEventCallback } from '@reactunity/renderer/ugui';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ItemObject, swapItems } from 'src/store/slices/inventory';
import style from './index.module.scss';

let draggingItem: ItemObject;

export function Item({ item }: { item: ItemObject }) {
  const ref = useRef<ReactUnity.UGUI.ContainerComponent>();
  const dragRef = useRef({ startPoint: null });

  if (!item) return null;

  const beginDrag: PointerEventCallback = (ev) => {
    dragRef.current.startPoint = ev.position;
    draggingItem = item;
  };

  const onDrag: PointerEventCallback = (ev) => {
    if (!dragRef.current.startPoint) return;

    const inline = ref.current.Style;
    inline.zIndex = 5;
    inline.pointerEvents = 'none';
    inline.translate = `${ev.position.x - ev.pressPosition.x}px ${ev.pressPosition.y - ev.position.y}`;
  };

  const endDrag: PointerEventCallback = (ev) => {
    if (!dragRef.current.startPoint) return;
    dragRef.current.startPoint = null;
    draggingItem = null;

    const inline = ref.current.Style;
    inline.pointerEvents = null;
    inline.zIndex = null;
    inline.translate = null;
  };

  return <view className={style.item} onBeginDrag={beginDrag} onDrag={onDrag} onEndDrag={endDrag} ref={ref}>
    <image source={item.image} />
  </view>;
}

export function Inventory() {
  const slotCount = useSelector(x => x.inventory.size);
  const items = useSelector(x => x.inventory.items);
  const slots = useMemo(() => new Array(slotCount).fill(null), [slotCount]);
  const dispatch = useDispatch();

  return <view className={style.host}>
    <scroll className={style.frame}>
      <view className={style.items}>
        {slots.map((x, i) => {
          const itemInSlot = items.find(x => x.slot === i);

          return <view key={i} className={style.itemSlot} data-index={i} onDrop={(ev) => {
            if (draggingItem) {
              dispatch(swapItems({ slot1: draggingItem.slot, slot2: i }));
              draggingItem = null;
            }
          }}>
            <Item item={itemInSlot} key={itemInSlot?.image ?? i} />
          </view>;
        })}
      </view>
    </scroll>

    <view className={style.border} />
  </view>;
}
