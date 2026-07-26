---
title: <video>
layout: API
---

`<video>` creates an video component.

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const videoAddress = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const [videoRef, setVideoRef] = useState();

  useEffect(() => {
    if (videoRef) {
      videoRef.VideoPlayer.Play();
    }
  }, [videoRef]);

  const toggleVideo = () => {
    const vp = videoRef.VideoPlayer;
    if (vp.isPlaying) vp.Pause();
    else vp.Play();
  };

  return <>
    <video
      style={{ objectFit: 'contain', width: 500 }}
      source={videoAddress}
      ref={setVideoRef}
      onPointerClick={toggleVideo}
    />
  </>;
};
```

</Sandpack>

### Properties

- **source**: Source of the image. Can be a url, a `Video` object.
