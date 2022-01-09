import { globalsWatcher, ReactUnity as ReactUnityNS, UnityEngine as UE } from '@reactunity/renderer';
import React, { useEffect, useState } from 'react';
import base64Image from 'src/assets/base64Image.txt';
import pngImage from 'src/assets/bg.png';
import styles from './index.module.scss';

const webImage = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const webVideo = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

export function ImagesPage() {
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

  return <view className={styles.host}>
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
  </view>;
};

export default ImagesPage;
