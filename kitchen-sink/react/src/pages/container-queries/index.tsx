import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import star from '#src/assets/star.png';
import styles from './index.module.scss';

/** The same card everywhere; only the width of what holds it differs. */
function Card() {
  return (
    <view className={styles.card}>
      <image className={styles.thumb} source={star} />
      <view className={styles.body}>
        <text className={styles.title}>Container queries</text>
        <text className={styles.text}>This card lays itself out by the width of whatever holds it, not by the screen.</text>
        <view className={styles.badge}>
          <text>compact</text>
        </view>
      </view>
    </view>
  );
}

const fixedWidths = [220, 360, 560];
const steps = [200, 320, 440, 600];

export default function ContainerQueriesPage() {
  const [width, setWidth] = useState(320);
  const [dark, setDark] = useState(false);

  return (
    <view className={styles.host}>
      <h1>Container Queries</h1>

      <section>
        <h2>
          <row>
            One card, three containers
            <icon.view_column />
          </row>
        </h2>

        <text className={styles.note}>
          Each box is `container: card / inline-size`. Under 300px the card stacks; from 300px it goes side by side; from 480px the title
          grows and the badge changes.
        </text>

        <view className={'flex-row flex-wrap items-start gap-4'}>
          {fixedWidths.map((w) => (
            <view key={w} className={'items-center gap-1.5'}>
              <view className={styles.container} style={{ width: w }}>
                <Card />
              </view>
              <text className={styles.caption}>{`${w}px`}</text>
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>
          <row>
            Resize one container
            <icon.swap_horiz />
          </row>
        </h2>

        <text className={styles.note}>
          The width transitions, and the rules flip the moment the container crosses a threshold. The ruler below it is sized in `cqw`, so
          it follows the container rather than the viewport.
        </text>

        <row className={'mb-3 gap-2'}>
          {steps.map((w) => (
            <button key={w} className={clsx(styles.step, w === width && styles.stepActive)} onClick={() => setWidth(w)}>
              {`${w}px`}
            </button>
          ))}
        </row>

        <view className={clsx(styles.container, styles.animated)} style={{ width }}>
          <Card />
          <view className={styles.ruler}>
            <text className={styles.rulerText}>50cqw</text>
          </view>
        </view>
      </section>

      <section>
        <h2>
          <row>
            Style queries
            <icon.palette />
          </row>
        </h2>

        <text className={styles.note}>
          The outer element sets `--theme`, and everything inside it is styled through `@container style(--theme: dark)`. Nothing here
          inherits a colour; each rule reads the container. An element cannot query itself, which is why the panel that declares the
          variable is not the one that changes colour.
        </text>

        {/* The declaring element is the container; its descendants are what the style() rules can reach. */}
        <view style={{ '--theme': dark ? 'dark' : 'light' }}>
          <view className={styles.panel}>
            <text className={styles.panelTitle}>{`Theme: ${dark ? 'dark' : 'light'}`}</text>
            <text className={styles.panelText}>A style query answers for any element, whatever its container-type.</text>
            <button className={styles.panelButton} onClick={() => setDark((d) => !d)}>
              {`Switch to ${dark ? 'light' : 'dark'}`}
            </button>
          </view>
        </view>
      </section>
    </view>
  );
}
