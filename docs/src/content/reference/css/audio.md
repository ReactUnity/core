---
title: Audio
layout: API
---

Plays audio in certain situations. This property is unique to React Unity and does not exist in web CSS.

The property must have the format `<url> <delay> <iteration-count | infinite>`
- Example: `url(res:click) 400ms 1` - Meaning to play the resource named `click` after 400ms delay once
- Example: `url(res:ambiance) infinite` - Meaning to play the resource named `ambiance` on an infinite loop

<Sandpack>

```js
export default function App() {
  return <>
    Click the button to hear the audio
    <button>
      Click
    </button>
  </>;
}
```

```css active
button {
  align-self: center;
  background-color: coral;
}

button:active {
  audio: url(res:click);
}
```

</Sandpack>
