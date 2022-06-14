import { Renderer } from '@reactunity/renderer';
import base64Image from 'src/assets/base64Image.txt';
import pngImage from 'src/assets/bg.png';
import check, { ReactComponent as CheckSVG } from 'src/assets/check.svg';
import style from './index.module.scss';

const webImage = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

export function App() {
  return <scroll>
    <view className={style.app}>
      <h1>React Unity Showcase</h1>

      <CheckSVG />
      <svg source={check} />
      <svg source={'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/betterplace.svg'} />
      <svg source={'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/compuserver_msn_Ford_Focus.svg'} />

      <section>
        <h2>Button</h2>

        <button className={style.clickButton}>Click</button>
      </section>


      <section>
        <h2>Anchor</h2>

        <anchor url="https://www.google.com">Open Google</anchor>
      </section>


      <section>
        <h2>Input</h2>

        <input />
      </section>


      <section>
        <h2>Toggle</h2>

        <row>
          <toggle />
          Toggle
        </row>
      </section>

      <section>
        <h2>Image</h2>

        <row>
          <image source={pngImage} />
          <image source={base64Image} />
          <image source={webImage} />
        </row>
      </section>
    </view>
  </scroll>;
};

Renderer.render(<App />);
