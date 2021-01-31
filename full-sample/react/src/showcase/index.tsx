import { ReactUnity } from '@reactunity/renderer';
import style from './index.module.scss';

export function App() {
  return <view className={style.app}>
    <h1 className={style.header}>React Unity Showcase</h1>

    <section className={style.section}>
      <h2 className={style.subheader}>View4</h2>

    </section>
  </view>;
};

ReactUnity.render(<App />);
