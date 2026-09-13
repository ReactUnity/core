import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './index.module.scss';

/** The same card under a nearer and nearer viewer. `none` is the flat projection everything else gets. */
const distances = ['none', '1200px', '600px', '300px', '160px'];

/**
 * Where the viewer stands over the stage, which is the point the projection converges on -- so the
 * same rotation leans a different way under each of these.
 */
const origins = [
  ['left top', styles.originLeftTop],
  ['center top', styles.originCenterTop],
  ['center', styles.originCenter],
  ['left bottom', styles.originLeftBottom],
  ['right bottom', styles.originRightBottom],
] as const;

export function PerspectivePage() {
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <view className={styles.host}>
      <h1>Perspective</h1>

      <section>
        <h2>
          <row className={'gap-2'}>
            The viewer's distance
            <icon.view_in_ar />
          </row>
        </h2>

        <text className={styles.note}>
          `perspective` goes on the parent and is read by its children. It is how far in front of them the viewer stands, so a smaller
          number is a wider angle and a stronger lean. Every card below is the same `rotateY(50deg)`.
        </text>

        <row className={'flex-wrap gap-4'}>
          {distances.map((d) => (
            <view key={d} className={'items-center'}>
              <view className={styles.stage} style={{ perspective: d }}>
                <view className={clsx(styles.card, styles.turned)}>
                  <text>Aa</text>
                </view>
              </view>
              <text className={styles.caption}>perspective: {d}</text>
            </view>
          ))}
        </row>
      </section>

      <section>
        <h2>
          <row className={'gap-2'}>
            Where the viewer stands
            <icon.filter_center_focus />
          </row>
        </h2>

        <text className={styles.note}>
          `perspective-origin` takes the same values `transform-origin` does. Moving it moves the vanishing point, so the same rotation
          under the same distance leans away from wherever the viewer is.
        </text>

        <row className={'flex-wrap gap-4'}>
          {origins.map(([label, className]) => (
            <view key={label} className={'items-center'}>
              <view className={clsx(styles.stage, styles.near, className)}>
                <view className={clsx(styles.card, styles.tilted)}>
                  <text>Aa</text>
                </view>
              </view>
              <text className={styles.caption}>{label}</text>
            </view>
          ))}
        </row>
      </section>

      <section>
        <h2>
          <row className={'gap-2'}>
            A card flip
            <icon.flip />
          </row>
        </h2>

        <text className={styles.note}>
          Two faces in one slot, each with `backface-visibility: hidden`, and the back one turned half a turn to start with. Only one of
          them is ever facing you, so only one is ever drawn.
        </text>

        <row className={'items-start gap-6'}>
          <view className={'items-center'}>
            <view className={styles.flipScene}>
              <view className={clsx(styles.flipper, flipped && styles.flipped)}>
                <view className={clsx(styles.face, styles.front)}>
                  <text>Front</text>
                </view>
                <view className={clsx(styles.face, styles.back)}>
                  <text>Back</text>
                </view>
              </view>
            </view>
            <button className={'mt-2'} onClick={() => setFlipped((f) => !f)}>
              Flip it
            </button>
          </view>

          <view className={styles.asideNote}>
            <text>
              A back face is taken out of hit testing as well as drawing, so a click lands on whichever face is actually pointing at you --
              never on the one behind it.
            </text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row className={'gap-2'}>
            With and without
            <icon.layers />
          </row>
        </h2>

        <text className={styles.note}>
          Both cards are turned past a quarter turn and are showing you their backs. The left one keeps drawing, mirrored, the way anything
          does by default; the right one has `backface-visibility: hidden`.
        </text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <view className={clsx(styles.stage, styles.near)}>
              <view className={clsx(styles.card, styles.reversed)}>
                <text>Aa</text>
              </view>
            </view>
            <text className={styles.caption}>backface-visibility: visible</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.stage, styles.near)}>
              <view className={clsx(styles.card, styles.reversed, styles.culled)}>
                <text>Aa</text>
              </view>
            </view>
            <text className={styles.caption}>backface-visibility: hidden</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row className={'gap-2'}>
            Depth, and which way it goes
            <icon.swap_horiz />
          </row>
        </h2>

        <text className={styles.note}>
          A positive `translate-z` comes towards you, as on the web, so it draws larger. All three tiles are the same size and share one
          stage, which is one projection rather than three.
        </text>

        <view className={clsx(styles.depthStage)}>
          <view className={clsx(styles.tile, styles.tileNear)}>
            <text>+60</text>
          </view>
          <view className={styles.tile}>
            <text>0</text>
          </view>
          <view className={clsx(styles.tile, styles.tileFar)}>
            <text>-60</text>
          </view>
        </view>
      </section>

      <section>
        <h2>
          <row className={'gap-2'}>
            A projected subtree stays interactive
            <icon.touch_app />
          </row>
        </h2>

        <text className={styles.note}>
          The stage is drawn through a camera of its own, and pointer events are mapped back through the projected image -- so a button
          leaning away from you is still a button where it looks like it is.
        </text>

        <view className={styles.liveScene}>
          <view className={styles.liveStage}>
            <text>Clicked {count} times</text>
            <button onClick={() => setCount((c) => c + 1)}>Count up</button>
            <input placeholder={'Typing works through the projection'} />
          </view>
        </view>
      </section>
    </view>
  );
}

export default PerspectivePage;
