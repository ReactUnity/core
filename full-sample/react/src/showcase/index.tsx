import { Dropdown, DropdownItem, ImageFitMode, ReactUnity, Renderer, Slider, Tooltip, UnityEngine as UE } from '@reactunity/renderer';
import { useEffect, useState } from 'react';
import base64Image from 'src/assets/base64Image.txt';
import pngImage from 'src/assets/bg.png';
import svgImage from 'src/assets/check.svg';
import style from './index.module.scss';

const webImage = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const webVideo = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export function RenderObject({ object }: { object: UE.GameObject }) {
  return <object width={300} height={400} style={{ flexGrow: 0 }} fit={ImageFitMode.Center}
    onDrag={(ev) => {
      Globals.camera2root.transform.Rotate(new UnityEngine.Vector3(-ev.delta.y, ev.delta.x, 0));
    }}
    onScroll={(ev: UE.EventSystems.PointerEventData) => {
      Globals.camera2.transform.Translate(0, 0, ev.scrollDelta.y / 10, UnityEngine.Space.Self);
    }}
    onMount={ev => ev.gameObject.SetActive(true)}
    onUnmount={ev => ev.gameObject.SetActive(false)}
    camera={Globals.camera2}
    target={object}
  />;
}

export function App() {
  const [videoRef, setVideoRef] = useState<ReactUnity.Components.VideoComponent>();

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

  return <scroll>
    <view className={style.app}>
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
          <video style={{ flexGrow: 1 }} fit={ImageFitMode.Fill}
            source={webVideo} ref={setVideoRef} onPointerClick={toggleVideo} />
        </row>
      </section>


      <section>
        <h2>Slider</h2>

        <row>
          <column>
            Horizontal
            <Slider direction="horizontal-reverse" />

            <Slider>
              {(value) => <view style={{ position: 'absolute', top: 24, color: value > 0.5 ? 'red' : 'black' }}>{value.toFixed(3)}</view>}
            </Slider>
          </column>

          <column>
            Vertical
          <row>
              <Slider direction="vertical-reverse" />

              <Slider direction="vertical">
                {(value) => <view style={{ position: 'absolute', left: 24 }}>{value.toFixed(3)}</view>}
              </Slider>
            </row>
          </column>
        </row>
      </section>


      <section>
        <h2>Render Texture</h2>

        <row>
          <render width={900} height={400} style={{ flexGrow: 1 }} fit={ImageFitMode.Fill}
            onDrag={(ev) => {
              Globals.cameraRoot.transform.Rotate(new UnityEngine.Vector3(-ev.delta.y, ev.delta.x, 0));
            }}
            onScroll={(ev: UE.EventSystems.PointerEventData) => {
              Globals.renderCamera.transform.Translate(0, 0, ev.scrollDelta.y / 10, UnityEngine.Space.Self);
            }}
            onMount={ev => ev.gameObject.SetActive(true)}
            onUnmount={ev => ev.gameObject.SetActive(false)}
            camera={Globals.renderCamera}
          />
        </row>
      </section>


      <section>
        <h2>Object</h2>

        <row>
          <RenderObject object={Globals.cylinder} />
          <RenderObject object={Globals.cube} />
          <RenderObject object={Globals.capsule} />
        </row>
      </section>


    </view>
  </scroll>;
};

Renderer.render(<App />);
