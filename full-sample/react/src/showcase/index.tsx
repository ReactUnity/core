import { globalsWatcher, ReactUnity as ReactUnityNS, Renderer, UnityEngine as UE } from '@reactunity/renderer';
import React, { useEffect, useState } from 'react';
import base64Image from 'src/assets/base64Image.txt';
import pngImage from 'src/assets/bg.png';
import style from './index.module.scss';

const webImage = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const webVideo = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export const RenderObject = React.memo(function RenderObject({ object }: { object: UE.GameObject }) {
  return <object width={300} height={400} style={{ flexGrow: 0 }}
    onDrag={(ev) => {
      Globals.camera2root.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y, ev.delta.x, 0));
    }}
    onScroll={(ev: UE.EventSystems.PointerEventData) => {
      Globals.camera2.transform.Translate(0, 0, Math.fround(ev.scrollDelta.y / 10), Interop.UnityEngine.Space.Self);
    }}
    onMount={ev => ev.gameObject.SetActive(true)}
    onUnmount={ev => ev.gameObject.SetActive(false)}
    camera={Globals.camera2}
    target={object}
  />;
});

export function App() {
  const [videoRef, setVideoRef] = useState<ReactUnityNS.UGUI.VideoComponent>();
  const Globals = globalsWatcher.useContext();

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

  return <scroll>
    <view className={style.app}>
      <h1>React Unity Showcase</h1>
{/*
      <catwalk />
      <ryu />

      <star />

      <starMask /> */}

      {/* <html source={htmlContent} /> */}

      {/* <pulsar /> */}

      <button onClick={() => console.log('here')}
        style={{ background: 'none' }}>
        Heello</button>

      <view>
        <h2>Background Images</h2>

        <view className={style.backgrounds}>
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
          <bg />
        </view>
      </view>

      <section>
        <h2>Input</h2>

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

      <section>
        <h2>Prefab</h2>

        <row>
          <prefab target={Globals.customPrefab} />
        </row>
      </section>

      <section>
        <h2>Video</h2>

        <row>
          <video style={{ flexGrow: 1 }} source={webVideo} ref={setVideoRef} onPointerClick={toggleVideo} />
        </row>
      </section>

      <section>
        <h2>Render Texture</h2>

        <row>
          <render width={900} height={400} style={{ flexGrow: 1 }}
            onDrag={(ev) => {
              Globals.cameraRoot.transform.Rotate(new Interop.UnityEngine.Vector3(-ev.delta.y, ev.delta.x, 0));
            }}
            onScroll={(ev: UE.EventSystems.PointerEventData) => {
              Globals.renderCamera.transform.Translate(0, 0, Math.fround(ev.scrollDelta.y / 10), Interop.UnityEngine.Space.Self);
            }}
            onMount={ev => ev.gameObject.SetActive(true)}
            onUnmount={ev => ev.gameObject.SetActive(false)}
            camera={Globals.renderCamera}
          />
        </row>
      </section>

      {/* TODO: Object component too slow
      <section>
        <h2>Object</h2>

        <row>
          <RenderObject object={Globals.cylinder} />
          <RenderObject object={Globals.cube} />
          <RenderObject object={Globals.capsule} />
        </row>
      </section>
      */}


    </view>
  </scroll>;
};

Renderer.render(<App />);
