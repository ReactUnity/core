import { useState } from 'react';
import styles from './StylePlayground.module.scss';

const attrItems = [
  { label: 'Settings', badge: 3, size: 12 },
  { label: 'Inbox', badge: 12, size: 16 },
  { label: 'Drafts', badge: 0, size: 20 },
];

export function StylePlayground() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [scheme, setScheme] = useState<'light' | 'dark'>('light');

  return (
    <view className={styles.stylePlayground}>
      <h1>Style Playground</h1>

      <view>This page is for testing some CSS features quickly and intended for development.</view>

      <section>
        <h2>Box sizing</h2>

        <view className={styles.boxSizingExample} style={{ boxSizing: 'border-box' }}>
          border-box
        </view>

        <view className={styles.boxSizingExample} style={{ boxSizing: 'content-box' }}>
          content-box
        </view>
      </section>

      <section>
        <h2>Display:contents</h2>

        <view className={styles.displayContentsExample}>
          <view className={styles.displayContentsInner}>display:flex (row)</view>
          <view className={styles.displayContentsInner}>Child 1</view>
          <view className={styles.displayContentsInner}>Child 2</view>
        </view>

        <view className={styles.displayContentsExample} style={{ display: 'contents' }}>
          <view className={styles.displayContentsInner}>display:contents</view>
          <view className={styles.displayContentsInner}>Child 1</view>
          <view className={styles.displayContentsInner}>Child 2</view>
        </view>
      </section>

      <section>
        {/* https://github.com/ReactUnity/core/issues/89 */}
        <h2>Width:100% (bug #89)</h2>

        <view className={styles.width100Example}>
          <view>The red underline should be full width.</view>
          <view className={styles.width100Inner} />
        </view>
      </section>

      <section>
        <h2>@starting-style</h2>

        <view>An added item transitions from the style in its nested @starting-style block: faded out and shifted left.</view>

        <view className={styles.buttonRow}>
          <button onClick={() => setItems((x) => [...x, `Item ${x.length + 1}`])}>Add item</button>
          <button onClick={() => setItems([])}>Clear</button>
        </view>

        <view className={styles.startingStyleList}>
          {items.map((item) => (
            <view key={item} className={styles.startingStyleItem}>
              {item}
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>light-dark() and color-scheme</h2>

        <view>The panel sets color-scheme, and every light-dark() inside it picks that arm.</view>

        <view className={styles.buttonRow}>
          <button onClick={() => setScheme((x) => (x === 'light' ? 'dark' : 'light'))}>
            Switch to {scheme === 'light' ? 'dark' : 'light'}
          </button>
        </view>

        <view className={styles.schemePanel} style={{ colorScheme: scheme }}>
          <view>color-scheme: {scheme}</view>
          <view className={styles.schemeNested}>A nested box, colored with light-dark() too.</view>
        </view>
      </section>

      <section>
        <h2>place-items, place-content, place-self</h2>

        <view className={styles.placeExample}>
          <view className={styles.placeBox}>place-items: center</view>
          <view className={styles.placeBox} style={{ placeSelf: 'end' }}>
            place-self: end
          </view>
        </view>
      </section>

      <section>
        <h2>Math functions</h2>

        <view>
          Each row gets --i from :nth-child. The first bar is calc(24px * pow(1.4, var(--i))) wide with opacity from abs(sin()); the second
          is round(up, var(--i) * 37px, 50px) wide and offset by mod(var(--i), 3) * 20px.
        </view>

        <view className={styles.mathDemo}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <view key={i} className={styles.mathRow}>
              <view className={styles.mathLabel}>i = {i}</view>
              <view className={styles.mathBar} />
              <view className={styles.mathBarRound} />
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>:nth-child(An+B of S)</h2>

        <view>
          The bordered cells are featured. :nth-child(even of [data-featured]) highlights every second featured cell, skipping the plain
          ones.
        </view>

        <view className={styles.nthRow}>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((x, i) => (
            <view key={x} className={styles.nthCell} data-featured={i % 3 === 1 ? undefined : true}>
              {x}
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>(hover) and (pointer) media features</h2>

        <view className={styles.hoverDemo}>
          <view className={styles.hoverYes}>@media (hover) matched, so hover styling is on. Hover me.</view>
          <view className={styles.hoverNo}>@media (hover: none) matched, so there is no hover styling here.</view>
          <view className={styles.pointerFine}>@media (pointer: fine)</view>
          <view className={styles.pointerCoarse}>@media (pointer: coarse)</view>
        </view>
      </section>

      <section>
        <h2>attr()</h2>

        <view>::before reads data-label, ::after reads data-badge with a fallback, and the font size is attr(data-size px).</view>

        <view className={styles.attrRow}>
          {attrItems.map((item) => (
            <view key={item.label} className={styles.attrItem} data-label={item.label} data-badge={item.badge} data-size={item.size} />
          ))}
        </view>
      </section>

      <section>
        <h2>linear() easing</h2>

        <view className={styles.easingDemo}>
          <view className={styles.easingBall} style={{ animationTimingFunction: 'ease-in-out' }}>
            ease-in-out
          </view>
          <view className={styles.easingBall} style={{ animationTimingFunction: 'linear(0, 0.4 30%, 0.9 55%, 0.8 70%, 1)' }}>
            linear()
          </view>
        </view>
      </section>

      <section>
        <h2>scrollbar-gutter</h2>

        <view>
          Both scroll views hold a 100% wide box with a red border. The scrollbar covers it on the left; scrollbar-gutter: stable reserves
          the space.
        </view>

        <view className={styles.gutterRow}>
          <scroll className={styles.gutterScroll}>
            <view className={styles.gutterContent}>scrollbar-gutter: auto</view>
          </scroll>
          <scroll className={styles.gutterScroll} style={{ scrollbarGutter: 'stable' }}>
            <view className={styles.gutterContent}>scrollbar-gutter: stable</view>
          </scroll>
        </view>
      </section>
    </view>
  );
}
