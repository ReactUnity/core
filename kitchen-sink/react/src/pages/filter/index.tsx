import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import star from '#src/assets/star.png';
import styles from './index.module.scss';

/**
 * Every function the parser accepts, with values picked to be obvious rather than tasteful.
 * `grain` and `pixelate` have no counterpart on the web -- they are ReactUnity's own.
 */
const functions = [
  'none',
  'blur(4px)',
  'brightness(1.5)',
  'contrast(2)',
  'grayscale(1)',
  'hue-rotate(120deg)',
  'invert(1)',
  'opacity(0.4)',
  'saturate(2.5)',
  'sepia(0.9)',
  'grain(0.6)',
  'pixelate(7px)',
  'drop-shadow(6px 8px 5px rgba(15, 23, 42, 0.6))',
  'grayscale(1) blur(2px) brightness(1.3)',
];

function Card({ className, filter }: { className?: string; filter?: string }) {
  return (
    <view className={clsx(styles.card, className)} style={filter ? { filter } : undefined}>
      <image source={star} />
      <text>Aa</text>
    </view>
  );
}

export function FilterPage() {
  const [count, setCount] = useState(0);

  return (
    <view className={clsx(styles.host)}>
      <h1>Filter</h1>

      <section>
        <h2>
          <row>
            Filter functions
            <icon.tune />
          </row>
        </h2>

        <text className={styles.note}>
          A filter is a property of the element, and several functions in one declaration are applied in the order they are written.
        </text>

        <view className={'flex-row flex-wrap'}>
          {functions.map((filter) => (
            <view key={filter} className={'m-1.5 w-40 shrink-0 items-center'}>
              <Card filter={filter} />
              <text className={styles.caption}>{filter}</text>
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>
          <row>
            Drop shadow, and what it traces
            <icon.compare />
          </row>
        </h2>

        <text className={styles.note}>
          `box-shadow` follows the border box. `filter: drop-shadow()` traces what was actually painted -- the star's transparency and the
          outline of the glyphs.
        </text>

        <row className={'gap-8'}>
          <view className={'items-center'}>
            <view className={clsx(styles.shadowSubject, styles.dropShadow)}>
              <image source={star} />
              <text>Filter</text>
            </view>
            <text className={styles.caption}>filter: drop-shadow(8px 10px 4px …)</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.shadowSubject, styles.boxShadow)}>
              <image source={star} />
              <text>Box</text>
            </view>
            <text className={styles.caption}>box-shadow: 8px 10px 4px …</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            A filtered subtree stays interactive
            <icon.touch_app />
          </row>
        </h2>

        <text className={styles.note}>
          The whole subtree is drawn through one filter, and the children keep their own layout, hover and press states, and pointer events.
        </text>

        <view className={styles.subtree}>
          <text>Clicked {count} times</text>
          <button onClick={() => setCount((c) => c + 1)}>Count up</button>
          <input placeholder={'Typing works through the filter'} />
        </view>
      </section>

      <section>
        <h2>
          <row>
            Transitions and animations
            <icon.animation />
          </row>
        </h2>

        <text className={styles.note}>Filters interpolate, so they transition and animate like any other property.</text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <Card className={styles.hoverable} />
            <text className={styles.caption}>transition on :hover</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.animated} />
            <text className={styles.caption}>animated hue-rotate</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.pulsing} />
            <text className={styles.caption}>animated blur</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            Together with a transform
            <icon.rotate_right />
          </row>
        </h2>

        <text className={styles.note}>
          `rotate` and `scale` apply to the filtered result rather than being captured with it, so a rotation does not tilt the pixelate
          blocks and a blur widens along with the element.
        </text>

        <row className={'h-40 justify-center'}>
          <Card className={styles.transformed} />
        </row>
      </section>

      <section>
        <h2>
          <row>
            Backdrop filter
            <icon.blur_on />
          </row>
        </h2>

        <text className={styles.note}>
          `backdrop-filter` filters what is behind the element instead of the element itself, which is how the sidebar and the panel below
          are frosted.
        </text>

        <view className={styles.backdropHost}>
          <view className={styles.backdropPanel}>
            <text>backdrop-filter: blur(5px) saturate(1.6)</text>
          </view>
        </view>
      </section>
    </view>
  );
}

export default FilterPage;
