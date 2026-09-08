import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './index.module.scss';

const ranges = [
  { key: 'rangeEntry', label: 'entry', hint: 'Finished by the time the card is fully in view.' },
  { key: 'rangeCover', label: 'cover', hint: 'The whole passage, from about to appear to gone.' },
  { key: 'rangeContain', label: 'contain', hint: 'Only while the card is entirely inside the view.' },
  { key: 'rangeNarrow', label: 'entry 25% entry 75%', hint: 'The middle half of the entry range.' },
] as const;

const paragraphs = [
  'A scroll progress timeline runs from the top of a scroll container to the bottom of it. There is no duration to set and no moment it begins: the keyframes are spread over the distance, and the position along that distance is the progress.',
  'Because the position is the progress, the animation runs backwards as readily as forwards. Scroll back up and every keyframe is replayed in reverse, exactly where it was.',
  'A name is what lets something outside the container read it. The container declares scroll-timeline-name, and anything that can see the name uses it in place of scroll().',
  'Seeing the name is the catch. A timeline name is looked up from the animated element upwards, so a sibling of the scroll container finds nothing.',
  'timeline-scope is the answer to that. An ancestor of both lends the name to its whole subtree, and the one timeline declared under it answers to the name everywhere inside.',
  'If two of them answer to it, the name is ambiguous and the timeline is inactive, which leaves the animated element showing its plain unanimated style.',
  'That is the same thing that happens when there is no scroll container at all, so an animation written for a scroll view is safe to declare outside one.',
  'Keep scrolling. The bar underneath this box is a sibling of it, and it only knows how far you have come because the wrapper lends it the name.',
];

const cards = [
  { title: 'Nothing is scheduled', body: 'The keyframes advance with the scroll position and rewind when it goes back.' },
  { title: 'No duration', body: 'A scroll-driven animation ignores animation-duration, animation-delay and the play state.' },
  { title: 'Easing still applies', body: 'The timing function shapes progress the way it shapes time, so ease is not linear here.' },
  { title: 'The range is yours', body: 'animation-range picks the stretch of the passage the keyframes are spread over.' },
  { title: 'Held at the ends', body: 'Outside its range the animation holds its first or its last keyframe.' },
  { title: 'Safe to declare anywhere', body: 'With no scroll container to read, the timeline is inactive and the card is left alone.' },
];

export default function ScrollAnimationsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]['key']>('rangeEntry');
  const active = ranges.find((r) => r.key === range)!;

  return (
    <view className={styles.host}>
      <h1>Scroll-driven Animations</h1>

      <section>
        <h2>
          <row>
            Scroll progress
            <icon.linear_scale />
          </row>
        </h2>

        <text className={styles.note}>
          The scroll box names its own progress, and the bar below it animates on that name. The bar is a sibling rather than a child, so it
          could not see the name at all — `timeline-scope` on the wrapper is what lends it to the whole subtree.
        </text>

        <text className={styles.code}>
          .wrapper &#123; timeline-scope: --reader &#125; .reader &#123; scroll-timeline: --reader &#125; .fill &#123; animation-timeline:
          --reader &#125;
        </text>

        <view className={styles.reading}>
          <scroll className={styles.reader}>
            {paragraphs.map((paragraph) => (
              <text key={paragraph} className={styles.paragraph}>
                {paragraph}
              </text>
            ))}
          </scroll>

          <view className={styles.track}>
            <view className={styles.fill} />
          </view>
        </view>
      </section>

      <section>
        <h2>
          <row>
            View timelines
            <icon.view_carousel />
          </row>
        </h2>

        <text className={styles.note}>
          `animation-timeline: view()` measures the card itself rather than the scroll position, so each one animates over its own passage
          through the box. Pick a range to see which part of that passage the keyframes are spread over.
        </text>

        <view className={styles.toggles}>
          {ranges.map((r) => (
            <button key={r.key} className={clsx(styles.toggle, range === r.key && styles.toggleOn)} onClick={() => setRange(r.key)}>
              {r.label}
            </button>
          ))}
        </view>

        <text className={styles.note}>{active.hint}</text>

        <scroll className={styles.cards}>
          {cards.map((card) => (
            <view key={card.title} className={clsx(styles.card, styles[range])}>
              <text className={styles.cardTitle}>{card.title}</text>
              <text className={styles.cardBody}>{card.body}</text>
            </view>
          ))}
        </scroll>
      </section>

      <section>
        <h2>
          <row>
            A name read from inside
            <icon.swipe />
          </row>
        </h2>

        <text className={styles.note}>
          Every chip names its own passage with `view-timeline: --chip inline`, and the number inside it animates on that name. A name is
          looked up from the animated element upwards, so each label finds the chip it sits in and no two of them collide. The axis is the
          horizontal one, because that is the way this strip scrolls.
        </text>

        <scroll className={styles.strip}>
          {Array.from({ length: 10 }, (_, i) => (
            <view key={i} className={styles.chip}>
              <text className={styles.chipLabel}>{i + 1}</text>
            </view>
          ))}
        </scroll>
      </section>
    </view>
  );
}
