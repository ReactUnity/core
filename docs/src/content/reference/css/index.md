---
title: CSS Properties
layout: API
---

ReactUnity allows you to style elements using CSS. The CSS properties works the same as in browsers unless specified otherwise.

<Sandpack>

```js App.js
export default function App() {
  return <>
    <view />
  </>;
};
```

```css style.css active
:root {
  justify-content: space-around;
  text-align: center;
  background-color: #a9b2ba;
}

view {
  align-self: center;
  width: 100px;
  height: 100px;
  background-color: coral;
  cursor: pointer;
}

view:hover {
  background-color: blue;
}
```

</Sandpack>

### CSS Properties

List of supported CSS properties in alphabetical order:

- align-content
- align-items
- align-self
- animation-delay
- animation-direction
- animation-duration
- animation-fill-mode
- animation-iteration-count
- animation-name
- animation-play-state
- animation-timing-function
- appearance
- aspect-ratio
- audio-clip
- audio-delay
- audio-iteration-count
- background-blend-mode
- background-color
- background-image
- background-position-x
- background-position-y
- background-repeat-x
- background-repeat-y
- background-size
- border-bottom-color
- border-bottom-left-radius
- border-bottom-right-radius
- border-bottom-width
- border-end-width
- border-left-color
- border-left-width
- border-right-color
- border-right-width
- border-start-width
- border-top-color
- border-top-left-radius
- border-top-right-radius
- border-top-width
- border-width
- bottom
- box-shadow
- color
- content
- cursor
- display
- end
- flex-basis
- flex-direction
- flex-grow
- flex-shrink
- font-family
- font-size
- font-style
- font-weight
- height
- justify-content
- left
- letter-spacing
- line-height
- margin
- margin-bottom
- margin-end
- margin-horizontal
- margin-left
- margin-right
- margin-start
- margin-top
- margin-vertical
- mask-image
- mask-position-x
- mask-position-y
- mask-repeat-x
- mask-repeat-y
- mask-size
- max-height
- max-lines
- max-width
- min-height
- min-width
- motion-delay
- motion-duration
- motion-timing-function
- navigation
- object-fit
- object-position
- opacity
- order
- overflow
- padding
- padding-bottom
- padding-end
- padding-horizontal
- padding-left
- padding-right
- padding-start
- padding-top
- padding-vertical
- pointer-events
- position
- right
- rotate
- scale
- start
- state-duration
- text-align
- text-overflow
- text-stroke-color
- text-stroke-width
- text-wrap
- top
- transform-origin
- transition-delay
- transition-duration
- transition-play-state
- transition-property
- transition-timing-function
- translate
- visibility
- width
- word-spacing
- z-index

### CSS Shorthands

List of supported CSS shorthands in alphabetical order:

- all
- animation
- audio
- background
- background-position
- background-repeat
- border
- border-bottom
- border-color
- border-left
- border-radius
- border-right
- border-top
- border-width
- flex
- flex-flow
- font
- inset
- margin
- mask
- mask-position
- mask-repeat
- motion
- padding
- text-stroke
- transition
