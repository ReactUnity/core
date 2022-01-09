import clsx from 'clsx';
import styles from './index.module.scss';

export const AnimationsPage = () => {
  return <view className={clsx(styles.host)}>
    <pulsar />
    <catwalk />
    <ryu />
  </view>;
};

export default AnimationsPage;
