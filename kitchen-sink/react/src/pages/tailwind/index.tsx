import { useState } from 'react';

const schemes = [
  { name: 'scheme-light', className: 'scheme-light' },
  { name: 'scheme-dark', className: 'scheme-dark' },
];

// Written out in full so Tailwind's scanner sees each one.
const mathBars = ['[--i:1]', '[--i:2]', '[--i:3]', '[--i:4]', '[--i:5]'];

export function TailwindPage() {
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <view>
      <h1>Tailwind</h1>

      <view className={'mb-2 text-slate-600'}>
        Tailwind is loaded once for the whole sample, so every page here can reach for a utility. This one is where the utilities themselves
        are on show.
      </view>

      <section>
        <h2>Buttons</h2>

        <view className={'flex-row gap-3'}>
          <button className={'bg-blue-400 px-5 py-3 text-white transition-colors hover:bg-blue-600 active:translate-y-1'}>
            Hover and press
          </button>

          <button className={'bg-yellow-500 p-3 shadow-md transition-colors hover:bg-green-400'}>Shadow</button>

          <button className={'bg-white p-3 ring-2 ring-blue-500 shadow-lg hover:ring-4'}>Ring</button>
        </view>
      </section>

      <section>
        <h2>Cards</h2>

        <view className={'flex-row gap-4'}>
          {[
            { title: 'Utilities', body: 'Spacing, colour, radius, shadow and the transforms all carry over as they are.' },
            { title: 'Theme', body: 'The spacing and type scales are rem, and the palette is oklch. ReactUnity reads both.' },
            { title: 'Variants', body: 'hover, active, focus and the rest map onto the pseudo-classes ReactUnity has.' },
          ].map((card) => (
            <view key={card.title} className={'flex-1 gap-2 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200'}>
              <view className={'text-lg font-semibold text-slate-900'}>{card.title}</view>
              <view className={'text-sm leading-relaxed text-slate-600'}>{card.body}</view>
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>The type scale</h2>

        <view className={'gap-1 rounded-lg bg-slate-100 p-4'}>
          <view className={'text-2xl text-slate-900'}>text-2xl</view>

          <view className={'text-sm leading-relaxed text-slate-600'}>
            A line height with no unit is a multiple of the font size, so this stays proportional at any size.
          </view>

          <view className={'text-base leading-none text-slate-600'}>The same two lines of text, at text-base and leading-none.</view>
        </view>
      </section>

      <section>
        <h2>Colour and transforms</h2>

        <view className={'flex-row gap-3'}>
          <view className={'size-16 rounded-md bg-purple-500'} />
          <view className={'size-16 rounded-md bg-purple-500 opacity-50'} />
          <view className={'size-16 rounded-md bg-purple-500 rotate-12'} />
          <view className={'size-16 rounded-md bg-purple-500 -translate-y-2'} />
        </view>

        <view className={'mt-3 flex-row'}>
          {['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-lime-400', 'bg-emerald-400', 'bg-sky-400', 'bg-indigo-400'].map((bg) => (
            <view key={bg} className={`h-10 flex-1 ${bg}`} />
          ))}
        </view>
      </section>

      <section>
        <h2>Logical properties</h2>

        <view className={'mb-3 text-sm text-slate-600'}>
          Tailwind writes every two-axis utility as a logical property, so px-*, mx-* and space-x-* follow the inherited direction. Both
          rows below carry the same classes; only the second one sets direction: rtl.
        </view>

        {[undefined, 'rtl' as const].map((direction) => (
          <view key={direction ?? 'ltr'} style={{ direction }} className={'mb-2 flex-row space-x-3 rounded-lg bg-slate-100 py-3 ps-8 pe-3'}>
            <view className={'size-10 rounded bg-indigo-500'} />
            <view className={'size-10 rounded bg-indigo-400'} />
            <view className={'size-10 rounded bg-indigo-300'} />
            <view className={'self-center text-sm text-slate-500'}>{direction ?? 'ltr'}</view>
          </view>
        ))}
      </section>

      <section>
        <h2>@starting-style, light-dark() and place-*</h2>

        <view className={'mb-3 text-sm text-slate-600'}>
          starting: is Tailwind's @starting-style variant, so an added item fades in. scheme-* sets color-scheme, which decides every
          light-dark() inside, and place-items-center is the align and justify pair in one utility.
        </view>

        <view className={'flex-row gap-3'}>
          <button onClick={() => setItems((x) => [...x, x.length + 1])}>Add item</button>
          <button onClick={() => setItems([])}>Clear</button>
        </view>

        <view className={'mt-2 min-h-12 flex-row flex-wrap gap-2'}>
          {items.map((i) => (
            <view
              key={i}
              className={
                'size-12 place-items-center rounded-md bg-teal-500 text-white opacity-100 transition-opacity duration-500 starting:opacity-0'
              }
            >
              {i}
            </view>
          ))}
        </view>

        <view className={'mt-3 flex-row gap-3'}>
          {schemes.map((scheme) => (
            <view
              key={scheme.name}
              className={`${scheme.className} flex-1 gap-1 rounded-lg p-4 bg-[color:light-dark(white,#1e293b)] text-[color:light-dark(#1e293b,white)] ring-1 ring-[color:light-dark(#cbd5e1,#475569)]`}
            >
              <view className={'font-semibold'}>{scheme.name}</view>
              <view className={'text-sm'}>bg-[color:light-dark(white,#1e293b)]</view>
            </view>
          ))}
        </view>
      </section>

      <section>
        <h2>Math functions, nth-child of, attr(), linear() and scrollbar-gutter</h2>

        <view className={'mb-3 text-sm text-slate-600'}>
          Arbitrary values and properties pass the newer functions straight through: each bar is [width:calc(30px*pow(1.5,var(--i)))], the
          cells use nth-[even_of_.featured], the labels come from before:content-[attr(data-label)], and the button eases with
          ease-[linear(...)].
        </view>

        <view className={'gap-1'}>
          {mathBars.map((bar) => (
            <view key={bar} className={`${bar} h-4 rounded bg-rose-400 [width:calc(30px*pow(1.5,var(--i)))]`} />
          ))}
        </view>

        <view className={'mt-3 flex-row gap-2'}>
          {['a', 'b', 'c', 'd', 'e', 'f'].map((x, i) => (
            <view
              key={x}
              className={`size-10 place-items-center rounded ${
                i % 3 === 1
                  ? 'bg-slate-200'
                  : 'featured bg-indigo-200 ring-2 ring-indigo-400 nth-[even_of_.featured]:bg-indigo-500 nth-[even_of_.featured]:text-white'
              }`}
            >
              {x}
            </view>
          ))}
        </view>

        <view className={'mt-3 flex-row gap-3'}>
          {['Settings', 'Inbox', 'Drafts'].map((label) => (
            <view
              key={label}
              data-label={label}
              className={'rounded bg-white px-3 py-2 ring-1 ring-slate-300 before:content-[attr(data-label)]'}
            />
          ))}
        </view>

        <view className={'mt-3 flex-row'}>
          <button
            className={
              'bg-amber-400 px-4 py-2 transition-transform duration-700 ease-[linear(0,0.4_30%,0.9_55%,0.8_70%,1)] hover:translate-x-32'
            }
          >
            Hover: linear() easing
          </button>
        </view>

        <view className={'mt-3 flex-row gap-4'}>
          <scroll className={'h-28 w-48 bg-white ring-1 ring-slate-300'}>
            <view className={'h-64 w-full border-2 border-rose-500 p-2 text-sm'}>auto</view>
          </scroll>
          <scroll className={'h-28 w-48 bg-white ring-1 ring-slate-300 [scrollbar-gutter:stable]'}>
            <view className={'h-64 w-full border-2 border-rose-500 p-2 text-sm'}>[scrollbar-gutter:stable]</view>
          </scroll>
        </view>
      </section>
    </view>
  );
}

export default TailwindPage;
