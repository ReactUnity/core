import style from './index.module.scss';
import { Slider } from '@reactunity/renderer';

export function App() {
  return <view className={style.app}>
    <Slider onChange={x => console.log(x)} keyStep={0.1} />
    <Slider onChange={x => console.log(x)} step={0.1}>
      {(val) => <view style={{ positionType: 'absolute', top: 40 }}>{val.toFixed(1)}</view>}
    </Slider>
  </view>;
}
