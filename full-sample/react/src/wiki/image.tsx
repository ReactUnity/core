import style from './index.module.scss';
import image from 'src/assets/bg.png';

const base64 = 'data:image/png;base64,iVBORw0KGgoAAA' +
  'ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4' +
  '//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU' +
  '5ErkJggg==';

export function App() {
  return <view className={style.app}>
    <image source={base64} />
    <image source={image} style={{ height: 40 }} />
    <image source="https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
  </view>;
}
