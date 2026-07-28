import styles from './StylePlayground.module.scss';

export function StylePlayground() {
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
    </view>
  );
}
