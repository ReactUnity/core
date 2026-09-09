import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './index.module.scss';

function Q({ children }: { children: string }) {
  return (
    <view className={styles.q}>
      <text>{children}</text>
    </view>
  );
}

export default function ScopePage() {
  const [limit, setLimit] = useState(true);

  return (
    <view className={styles.host}>
      <h1>Scoped Styles</h1>

      <section>
        <h2>
          <row>
            Donut scope
            <icon.donut_large />
          </row>
        </h2>

        <text className={styles.note}>
          `@scope (.card) to (.content)` colors every box under a card orange, except the ones inside its content. The card nested in the
          content opens a scope of its own. Turn the limit off and the content is a plain part of the card.
        </text>

        <button className={clsx(styles.toggle, limit && styles.toggleOn)} onClick={() => setLimit((x) => !x)}>
          {limit ? 'Content is a limit' : 'Content is not a limit'}
        </button>

        <view className={styles.card}>
          <Q>In the card</Q>
          <view className={clsx(limit && styles.content)}>
            <Q>In the content</Q>
            <view className={styles.card}>
              <Q>In a card inside the content</Q>
            </view>
          </view>
          <Q>In the card again</Q>
        </view>
      </section>

      <section>
        <h2>
          <row>
            Proximity
            <icon.layers />
          </row>
        </h2>

        <text className={styles.note}>
          The two rules have the same specificity and both match the inner panel; the one whose root is nearer wins, whichever comes first
          in the stylesheet.
        </text>

        <view className={'flex-row items-start gap-4'}>
          <view className={styles.light}>
            <view className={styles.panel}>
              <text>light</text>
            </view>
            <view className={styles.dark}>
              <view className={styles.panel}>
                <text>dark inside light</text>
              </view>
            </view>
          </view>
          <view className={styles.dark}>
            <view className={styles.panel}>
              <text>dark</text>
            </view>
            <view className={styles.light}>
              <view className={styles.panel}>
                <text>light inside dark</text>
              </view>
            </view>
          </view>
        </view>
      </section>

      <section>
        <h2>
          <row>
            The root
            <icon.my_location />
          </row>
        </h2>

        <text className={styles.note}>
          `:scope` is the scoping root, so the border lands on the card. `:scope &gt; .title` is relative to it, so only its own title is
          bold, not the one further down.
        </text>

        <view className={styles.titled}>
          <text className={styles.title}>A direct child</text>
          <view>
            <text className={styles.title}>A grandchild</text>
          </view>
        </view>
      </section>
    </view>
  );
}
