export function TailwindPage() {
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
    </view>
  );
}

export default TailwindPage;
