import { ReactUnity, Slider } from '@reactunity/renderer';
import style from './index.module.scss';

export function App() {
  return <view className={style.app}>
    <h1>React Unity Showcase</h1>


    <section>
      <h2>Button</h2>

      <button>Click</button>
    </section>


    <section>
      <h2>Toggle</h2>

      <row>
        <toggle />
        Toggle
      </row>
    </section>


    <section>
      <h2>Slider</h2>

      <row>
        <column>
          Horizontal
          <Slider />

          <Slider>
            {(value) => <view style={{ position: 'absolute', top: 24, color: value > 0.5 ? 'red' : 'black' }}>{value.toFixed(3)}</view>}
          </Slider>
        </column>

        <column>
          Vertical
          <row>
            <Slider direction="vertical" />

            <Slider direction="vertical">
              {(value) => <view style={{ position: 'absolute', left: 24 }}>{value.toFixed(3)}</view>}
            </Slider>
          </row>
        </column>
      </row>
    </section>
  </view>;
};

ReactUnity.render(<App />);
