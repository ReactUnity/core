import { icon, type MixBlendMode } from '@reactunity/renderer';
import clsx from 'clsx';
import { useState } from 'react';
import star from '#src/assets/star.png';
import styles from './index.module.scss';

/**
 * Every function the parser accepts, with values picked to be obvious rather than tasteful.
 * `grain` and `pixelate` have no counterpart on the web -- they are ReactUnity's own.
 */
const functions = [
  'none',
  'blur(4px)',
  'brightness(1.5)',
  'contrast(2)',
  'grayscale(1)',
  'hue-rotate(120deg)',
  'invert(1)',
  'opacity(0.4)',
  'saturate(2.5)',
  'sepia(0.9)',
  'grain(0.6)',
  'pixelate(7px)',
  'posterize(3)',
  'scanlines(0.55 4px)',
  'tint(rgb(120, 200, 255))',
  'chromatic-aberration(4px)',
  'drop-shadow(6px 8px 5px rgba(15, 23, 42, 0.6))',
  'grayscale(1) blur(2px) brightness(1.3)',
];

/** Every CSS blend function, plus `plus-lighter`, which adds to the backdrop rather than blending. */
const blendModes: MixBlendMode[] = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
  'plus-lighter',
];

/** Each entry is a class on the same busy tile, so the gallery reads as one comparison. */
const masks = [
  ['maskDown', 'linear-gradient(black, transparent)'],
  ['maskBand', 'linear-gradient(to right, transparent, black 30%, black 70%, transparent)'],
  ['maskCircle', 'radial-gradient(circle at center, black 40%, transparent 72%)'],
  ['maskTwoLayers', 'two radial layers, added'],
  ['maskLuminance', 'mask-mode: luminance'],
  ['maskAnimated', 'animated mask-position-x'],
] as const;

const clips = [
  ['clipInset', 'inset(12% 18%)'],
  ['clipRounded', 'inset(6% round 32px 6px)'],
  ['clipCircle', 'circle(45%)'],
  ['clipEllipse', 'ellipse(46% 30% at 50% 60%)'],
  ['clipTriangle', 'polygon(50% 0%, 100% 100%, 0% 100%)'],
  ['clipStar', 'polygon(), ten points'],
  ['clipRect', 'rect(), two edges auto'],
  ['clipXywh', 'xywh(), rounded'],
  ['clipPath', 'path(), arcs and curves'],
  ['clipShape', 'shape(), a curved edge'],
  ['clipContentBox', 'content-box, on its own'],
  ['clipAnimated', 'animated circle()'],
] as const;

function Card({ className, filter }: { className?: string; filter?: string }) {
  return (
    <view className={clsx(styles.card, className)} style={filter ? { filter } : undefined}>
      <image source={star} />
      <text>Aa</text>
    </view>
  );
}

export function FilterPage() {
  const [count, setCount] = useState(0);

  return (
    <view className={clsx(styles.host)}>
      <h1>Filter</h1>

      <section>
        <h2>
          <row>
            Filter functions
            <icon.tune />
          </row>
        </h2>

        <text className={styles.note}>
          A filter is a property of the element, and several functions in one declaration are applied in the order they are written.
        </text>

        <view className={'flex-row flex-wrap'}>
          {functions.map((filter) => (
            <view key={filter} className={'m-1.5 w-40 shrink-0 items-center'}>
              <Card filter={filter} />
              <text className={styles.caption}>{filter}</text>
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>
          <row>
            Drop shadow, and what it traces
            <icon.compare />
          </row>
        </h2>

        <text className={styles.note}>
          `box-shadow` follows the border box. `filter: drop-shadow()` traces what was actually painted -- the star's transparency and the
          outline of the glyphs.
        </text>

        <row className={'gap-8'}>
          <view className={'items-center'}>
            <view className={clsx(styles.shadowSubject, styles.dropShadow)}>
              <image source={star} />
              <text>Filter</text>
            </view>
            <text className={styles.caption}>filter: drop-shadow(8px 10px 4px …)</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.shadowSubject, styles.boxShadow)}>
              <image source={star} />
              <text>Box</text>
            </view>
            <text className={styles.caption}>box-shadow: 8px 10px 4px …</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            A filtered subtree stays interactive
            <icon.touch_app />
          </row>
        </h2>

        <text className={styles.note}>
          The whole subtree is drawn through one filter, and the children keep their own layout, hover and press states, and pointer events.
        </text>

        <view className={styles.subtree}>
          <text>Clicked {count} times</text>
          <button onClick={() => setCount((c) => c + 1)}>Count up</button>
          <input placeholder={'Typing works through the filter'} />
        </view>
      </section>

      <section>
        <h2>
          <row>
            Transitions and animations
            <icon.animation />
          </row>
        </h2>

        <text className={styles.note}>Filters interpolate, so they transition and animate like any other property.</text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <Card className={styles.hoverable} />
            <text className={styles.caption}>transition on :hover</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.animated} />
            <text className={styles.caption}>animated hue-rotate</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.pulsing} />
            <text className={styles.caption}>animated blur</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.rolling} />
            <text className={styles.caption}>scanlines, phase rolled</text>
          </view>

          <view className={'items-center'}>
            <Card className={styles.flickering} />
            <text className={styles.caption}>grain, phase in steps(12)</text>
          </view>
        </row>

        <text className={styles.note}>
          Neither grain nor scanlines takes a time input -- both take a phase, and animating that is what moves them. The timing function
          picks the rate, so `steps()` gives grain a frame rate instead of resampling it every frame.
        </text>
      </section>

      <section>
        <h2>
          <row>
            Together with a transform
            <icon.rotate_right />
          </row>
        </h2>

        <text className={styles.note}>
          `rotate` and `scale` apply to the filtered result rather than being captured with it, so a rotation does not tilt the pixelate
          blocks and a blur widens along with the element.
        </text>

        <row className={'h-40 justify-center'}>
          <Card className={styles.transformed} />
        </row>
      </section>

      <section>
        <h2>
          <row>
            Mix blend mode
            <icon.layers />
          </row>
        </h2>

        <text className={styles.note}>
          `mix-blend-mode` blends the element into what is painted behind it. The element and everything inside it go in as one image, so
          each chip's fill and its label blend with the gradient together -- the label does not blend against its own chip.
        </text>

        <view className={'flex-row flex-wrap'}>
          {blendModes.map((mixBlendMode) => (
            <view key={mixBlendMode} className={'m-1.5 w-32 shrink-0 items-center'}>
              <view className={styles.blendHost}>
                <view className={styles.blendChip} style={{ mixBlendMode }}>
                  <text>Aa</text>
                </view>
              </view>
              <text className={styles.caption}>{mixBlendMode}</text>
            </view>
          ))}
        </view>

        <text className={styles.note}>
          A blend reaches as far back as the nearest blending group above it and no further, which is what `isolation: isolate` makes. Both
          groups below are transparent and sit on the same stripe: the left one's blobs reach the stripe, the right one's stop at their
          isolated parent -- though they still blend with each other, since isolating draws a boundary rather than switching blending off.
        </text>

        <view className={styles.blendStage}>
          <view className={'items-center'}>
            <view className={styles.blendGroup}>
              <view className={clsx(styles.blendBlob, styles.blobLeft)} />
              <view className={clsx(styles.blendBlob, styles.blobRight)} />
            </view>
            <text className={styles.caption}>blending with the stripe</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.blendGroup, styles.isolated)}>
              <view className={clsx(styles.blendBlob, styles.blobLeft)} />
              <view className={clsx(styles.blendBlob, styles.blobRight)} />
            </view>
            <text className={styles.caption}>contained by `isolation: isolate`</text>
          </view>
        </view>
      </section>

      <section>
        <h2>
          <row>
            Background blend mode
            <icon.gradient />
          </row>
        </h2>

        <text className={styles.note}>
          `background-blend-mode` never leaves the element's own background: each image layer blends with the layers below it, and the
          bottom one with `background-color`. Nothing behind the element takes part.
        </text>

        <view className={'flex-row flex-wrap'}>
          {blendModes.map((backgroundBlendMode) => (
            <view key={backgroundBlendMode} className={'m-1.5 w-32 shrink-0 items-center'}>
              <view className={styles.bgBlendTile} style={{ backgroundBlendMode }} />
              <text className={styles.caption}>{backgroundBlendMode}</text>
            </view>
          ))}
        </view>

        <text className={styles.note}>
          The list takes one value per layer, in the same order as `background-image`, and repeats when it is shorter than that list. Only
          the third tile has a blended layer sitting on another one, which is the case that has to read back what was painted.
        </text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <view className={clsx(styles.bgLayerTile, styles.bgLayersNormal)} />
            <text className={styles.caption}>normal</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.bgLayerTile, styles.bgLayersBottom)} />
            <text className={styles.caption}>normal, difference</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.bgLayerTile, styles.bgLayersBoth)} />
            <text className={styles.caption}>difference</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            Mask image
            <icon.gradient />
          </row>
        </h2>

        <text className={styles.note}>
          A mask is coverage rather than a cut-out, so a gradient fades the element instead of stopping at a threshold. The element and
          everything inside it are masked as one image, which is why each tile's glyph fades with its background.
        </text>

        <view className={'flex-row flex-wrap'}>
          {masks.map(([name, caption]) => (
            <view key={name} className={'m-1.5 w-40 shrink-0 items-center'}>
              <view className={clsx(styles.maskTile, styles[name])}>
                <text>Aa</text>
              </view>
              <text className={styles.caption}>{caption}</text>
            </view>
          ))}
        </view>

        <text className={styles.note}>
          `mask-image` takes the same values `background-image` does, and `mask-position`, `mask-size` and `mask-repeat` place each layer
          the same way. Layers add: what any one of them covers is kept. A sprite mask keeps its own alpha too -- the star resource is drawn
          at half opacity throughout, and that is what comes through.
        </text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <view className={styles.maskTile} style={{ maskImage: 'url(res:star)', maskRepeat: 'no-repeat', maskSize: 'contain' }}>
              <text>Aa</text>
            </view>
            <text className={styles.caption}>a 50%-alpha sprite as the mask</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            Clip path
            <icon.crop />
          </row>
        </h2>

        <text className={styles.note}>
          `clip-path` clips the element to a shape. The edge is antialiased over a device pixel, and the shape is resolved against the box
          every frame -- so a percentage shape follows a resize and two shapes of one kind interpolate.
        </text>

        <view className={'flex-row flex-wrap'}>
          {clips.map(([name, caption]) => (
            <view key={name} className={'m-1.5 w-40 shrink-0 items-center'}>
              <view className={clsx(styles.clipTile, styles[name])}>
                <text>Aa</text>
              </view>
              <text className={styles.caption}>{caption}</text>
            </view>
          ))}
        </view>

        <text className={styles.note}>
          A clip changes the element's shape, so it changes where a pointer lands as well -- the corners of the tile below are outside the
          circle, and hovering them does nothing. A mask never does this: a mask paints, a clip reshapes.
        </text>

        <row className={'gap-6'}>
          <view className={'items-center'}>
            <view className={styles.clipButton}>
              <text>Hover the middle</text>
            </view>
            <text className={styles.caption}>clip-path: circle(45%)</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            Image rendering
            <icon.grid_on />
          </row>
        </h2>

        <text className={styles.note}>
          `image-rendering: pixelated` snaps each sample to the nearest texel, which is what an upscaled sprite wants. The star resource is
          100x100 and drawn here at 240, so the diagonals are where the two samplers part company.
        </text>

        <row className={'gap-6 flex-wrap'}>
          <view className={'items-center'}>
            <image source={'res:star'} className={styles.zoomed} />
            <text className={styles.caption}>auto</text>
          </view>

          <view className={'items-center'}>
            <image source={'res:star'} className={clsx(styles.zoomed, styles.pixelated)} />
            <text className={styles.caption}>pixelated</text>
          </view>

          <view className={'items-center'}>
            <view className={styles.zoomedBackground} />
            <text className={styles.caption}>background, auto</text>
          </view>

          <view className={'items-center'}>
            <view className={clsx(styles.zoomedBackground, styles.pixelated)} />
            <text className={styles.caption}>background, pixelated</text>
          </view>
        </row>
      </section>

      <section>
        <h2>
          <row>
            Backdrop filter
            <icon.blur_on />
          </row>
        </h2>

        <text className={styles.note}>
          `backdrop-filter` filters what is behind the element instead of the element itself, which is how the sidebar and the panel below
          are frosted.
        </text>

        <view className={styles.backdropHost}>
          <view className={styles.backdropPanel}>
            <text>backdrop-filter: blur(5px) saturate(1.6)</text>
          </view>
        </view>
      </section>
    </view>
  );
}

export default FilterPage;
