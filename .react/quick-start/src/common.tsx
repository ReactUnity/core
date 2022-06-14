
import { ReactUnity } from '@reactunity/renderer';
import checkImage from './assets/check.png';
import errorImage from './assets/close.png';
import infoImage from './assets/info.png';
import warnImage from './assets/warn.png';
import styles from './index.module.scss';

export const check = <image source={checkImage} className={styles.checkIcon} />
export const error = <image source={errorImage} className={styles.errorIcon} />
export const warn = <image source={warnImage} className={styles.warnIcon} />
export const info = <image source={infoImage} className={styles.infoIcon} />

export const Window = Globals.Window as ReactUnity.Editor.QuickStartWindow;

export const packageName = "com.reactunity.core";
