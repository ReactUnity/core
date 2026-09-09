import type { ReactUnity } from '@reactunity/renderer';
import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import styles from './index.module.scss';

const types = [
  ['none', 'Nothing snaps; the scroll rests wherever it is left.'],
  ['x proximity', 'Snaps only when the scroll comes to rest near a card.'],
  ['x mandatory', 'Always rests on a card, however far it has to travel.'],
] as const;

const aligns = [
  ['start', "The card's left edge meets the left of the scrollport."],
  ['center', 'The card is centred in the scrollport.'],
  ['end', "The card's right edge meets the right of the scrollport."],
] as const;

const cards = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh'];

const panels = [
  { title: 'One panel at a time', body: 'Each panel fills the box and snaps to its top, so the scroll pages rather than drifts.' },
  { title: 'The wheel still works', body: 'A snap waits for the scroll to settle, so nothing fights the gesture while it is happening.' },
  { title: 'A fling is aimed', body: 'The snap is measured from where the fling would have landed, not from where the pointer let go.' },
  { title: 'Mandatory holds', body: 'Whatever the scroll is left at, the nearest snap point takes it.' },
];

const stops = [
  ['Top', 0],
  ['Middle', 700],
  ['Bottom', 1400],
] as const;

export default function ScrollingPage() {
  const [type, setType] = useState<(typeof types)[number][0]>('x mandatory');
  const [align, setAlign] = useState<(typeof aligns)[number][0]>('center');
  const [smooth, setSmooth] = useState(true);

  const reader = useRef<ReactUnity.UGUI.ScrollComponent>(null);

  const activeType = types.find(([key]) => key === type)!;
  const activeAlign = aligns.find(([key]) => key === align)!;

  return (
    <view className={styles.host}>
      <h1>Scrolling</h1>

      <section>
        <h2>
          <row>
            Scroll snapping
            <icon.view_carousel />
          </row>
        </h2>

        <text className={styles.note}>
          `scroll-snap-type` puts the snapping on the scroll box and `scroll-snap-align` puts the snap points on the items in it. Drag the
          strip or use the wheel over it — the snap is taken once the scroll settles, and it is measured from where a fling would have
          landed.
        </text>

        <view className={styles.toggles}>
          {types.map(([key]) => (
            <button key={key} className={clsx(styles.toggle, type === key && styles.toggleOn)} onClick={() => setType(key)}>
              {key}
            </button>
          ))}
        </view>

        <view className={styles.toggles}>
          {aligns.map(([key]) => (
            <button key={key} className={clsx(styles.toggle, align === key && styles.toggleOn)} onClick={() => setAlign(key)}>
              {key}
            </button>
          ))}
        </view>

        <text className={styles.code}>
          .strip &#123; scroll-snap-type: {type} &#125; .card &#123; scroll-snap-align: {align} &#125;
        </text>

        <scroll className={styles.strip} style={{ scrollSnapType: type }}>
          {cards.map((card) => (
            <view key={card} className={styles.card} style={{ scrollSnapAlign: align }}>
              <text className={styles.cardLabel}>{card}</text>
            </view>
          ))}
        </scroll>

        <text className={styles.note}>
          {activeType[1]} {activeAlign[1]}
        </text>
      </section>

      <section>
        <h2>
          <row>
            Paging on the block axis
            <icon.swipe />
          </row>
        </h2>

        <text className={styles.note}>
          `y mandatory` with panels the height of the box is how a pager is written. `block` is accepted as a name for this axis and
          `inline` for the other one — there are no writing modes here, so the two are fixed to y and x.
        </text>

        <scroll className={styles.pager}>
          {panels.map((panel) => (
            <view key={panel.title} className={styles.panel}>
              <text className={styles.panelTitle}>{panel.title}</text>
              <text className={styles.panelBody}>{panel.body}</text>
            </view>
          ))}
        </scroll>
      </section>

      <section>
        <h2>
          <row>
            Smooth scrolling
            <icon.moving />
          </row>
        </h2>

        <text className={styles.note}>
          `scroll-behavior: smooth` animates the scrolls the element is *asked* to make — assigning `ScrollTop`, calling `ScrollTo`, or
          landing a snap. A wheel or a drag keeps its own smoothing either way, which is why the strip above feels the same in both.
        </text>

        <view className={styles.toggles}>
          <button className={clsx(styles.toggle, smooth && styles.toggleOn)} onClick={() => setSmooth((x) => !x)}>
            scroll-behavior: {smooth ? 'smooth' : 'auto'}
          </button>

          {stops.map(([label, offset]) => (
            <button
              key={label}
              className={styles.toggle}
              onClick={() => {
                if (reader.current) reader.current.ScrollTop = offset;
              }}
            >
              {label}
            </button>
          ))}
        </view>

        <scroll ref={reader} className={styles.reader} style={{ scrollBehavior: smooth ? 'smooth' : 'auto' }}>
          {Array.from({ length: 24 }, (_, i) => (
            <text key={i} className={styles.line}>
              {i + 1}. The line numbers are here to make the travel legible — a jump lands on one, an animated scroll runs past them.
            </text>
          ))}
        </scroll>
      </section>
    </view>
  );
}
