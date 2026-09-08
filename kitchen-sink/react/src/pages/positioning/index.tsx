import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './index.module.scss';

const sections = [
  { title: 'Section A', rows: ['Sticks to the top of the scrollport', 'Its siblings never move for it', 'Nothing is taken out of flow'] },
  { title: 'Section B', rows: ['Pushed out by the end of its section', 'The next header takes over', 'Clamped to the parent content box'] },
  {
    title: 'Section C',
    rows: ['The insets are resolved at scroll time', 'Never handed to the layout', 'So the offset lands the same frame'],
  },
  {
    title: 'Section D',
    rows: ['scroll-state(stuck: top) styles it', 'Read off the sticky element itself', 'The rules inside style its children'],
  },
];

const lines = [
  'A fixed element answers to the host, which is the same box vw and vh measure.',
  'To do that it has to leave its parent, so an ancestor with overflow: hidden no longer clips it.',
  'Its slot in the parent is held by a hidden stand-in, the same trick a portal uses.',
  'Two consequences of the lift are deliberate deviations from a browser.',
  'It no longer inherits an ancestor opacity, transform or filter, because it is no longer under one.',
  'And with no insets it lands at the viewport origin rather than at its static position.',
];

export default function PositioningPage() {
  const [fixed, setFixed] = useState(true);

  return (
    <view className={styles.host}>
      <h1>Positioning</h1>

      <section>
        <h2>
          <row>
            Sticky headers
            <icon.push_pin />
          </row>
        </h2>

        <text className={styles.note}>
          A sticky box keeps its place in flow and is then shifted the least it can be to stay inside the nearest scroll container. It never
          leaves its own parent's content box, so each header is pushed out by the end of its section rather than piling up.
        </text>

        <text className={styles.code}>.header &#123; position: sticky; top: 0 &#125;</text>

        <scroll className={styles.list}>
          {sections.map((s) => (
            <view key={s.title} className={styles.section}>
              <view className={styles.header}>
                <text className={styles.headerTitle}>{s.title}</text>
                <text className={styles.headerHint}>held</text>
              </view>

              {s.rows.map((r) => (
                <view key={r} className={styles.row}>
                  {r}
                </view>
              ))}
            </view>
          ))}
        </scroll>

        <text className={styles.note}>
          Each header is its own `container-type: scroll-state` container, so `@container scroll-state(stuck: top)` can style what it
          contains -- the title and the word beside it both change while it is being held. A container query never styles the container
          itself, so the header's own background stays put.
        </text>
      </section>

      <section>
        <h2>
          <row>
            A footer held against the bottom
            <icon.vertical_align_bottom />
          </row>
        </h2>

        <text className={styles.note}>
          The same thing on the other edge. The bar is the last child in flow, and `bottom: 0` holds it up against the bottom of the
          scrollport until the scroll reaches where it actually sits.
        </text>

        <scroll className={styles.footerList}>
          {lines.map((l) => (
            <view key={l} className={styles.row}>
              {l}
            </view>
          ))}

          <view className={styles.footer}>The last row, until you scroll to it</view>
        </scroll>
      </section>

      <section>
        <h2>
          <row>
            Fixed leaves its parent
            <icon.open_in_full />
          </row>
        </h2>

        <text className={styles.note}>
          Both badges below ask for the same `top: 8px; right: 8px` inside a box with `overflow: hidden`. The absolute one answers to that
          box and is clipped by it; the fixed one answers to the host and is drawn over everything, sidebar included.
        </text>

        <row className={styles.toggles}>
          <button className={clsx(styles.toggle, fixed && styles.toggleOn)} onClick={() => setFixed((x) => !x)}>
            {fixed ? 'Hide the fixed badge' : 'Show the fixed badge'}
          </button>
        </row>

        <view className={styles.clipper}>
          <text className={styles.clipperLabel}>overflow: hidden</text>
          <view className={styles.absoluteBadge}>absolute</view>
          {fixed && <view className={styles.fixedBadge}>fixed</view>}
        </view>
      </section>
    </view>
  );
}
