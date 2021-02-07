import { Dropdown, DropdownItem, ImageFitMode, NativeVideoInstance, ReactUnity, Slider, Tooltip } from '@reactunity/renderer';
import style from './index.module.scss';
import pngImage from 'src/assets/bg.png';
import base64Image from 'src/assets/base64Image.txt';
import svgImage from 'src/assets/check.svg';
import { useEffect, useState } from 'react';

const webImage = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const webVideo = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export function App() {
  const [videoRef, setVideoRef] = useState<NativeVideoInstance>();

  useEffect(() => {
    if (videoRef) {
      videoRef.VideoPlayer.Pause();
    }
  }, [videoRef]);

  const toggleVideo = () => {
    const vp = videoRef.VideoPlayer;
    if (vp.isPlaying) vp.Pause();
    else vp.Play();
  };


  const tooltipContent =
    <view style={{ padding: 10, backgroundColor: 0.4, color: 'white' }}>
      Cool tooltip
    </view>;

  return <scroll className={style.app}>
    <h1>React Unity Showcase</h1>


    <section>
      <h2>Button</h2>

      <button>Click</button>
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
      <h2>Tooltip</h2>

      <Tooltip tooltipContent={tooltipContent} position='bottom' offset={20}>
        Hover to see cool tooltip.
      </Tooltip>
    </section>


    <section>
      <h2>Dropdown</h2>

      <Dropdown>
        Select an option

        <DropdownItem>Normal Option</DropdownItem>
        <DropdownItem triggerTemplate={<view style={{ color: 'green' }}>Green Option</view>}>Green Option 💚</DropdownItem>
        <DropdownItem triggerTemplate={<view style={{ color: 'red' }}>Red Option</view>}>Red Option 🧡</DropdownItem>
      </Dropdown>
    </section>


    <section>
      <h2>Image</h2>

      <row>
        <image fit={ImageFitMode.CenterInside} source={pngImage} />
        <image fit={ImageFitMode.CenterInside} source={base64Image} />
        <image fit={ImageFitMode.CenterInside} source={webImage} />
        <image fit={ImageFitMode.CenterInside} source={svgImage['0x0']} />
      </row>
    </section>


    <section>
      <h2>Video</h2>

      <row>
        <video fit={ImageFitMode.CenterInside} source={webVideo} ref={setVideoRef} onPointerClick={toggleVideo} />
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
  </scroll>;
};

ReactUnityRenderer.render(<App />);
