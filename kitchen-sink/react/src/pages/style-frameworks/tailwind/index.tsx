export function TailwindPage() {
  return (
    <div className={'gap-4 p-2'}>
      <div className={'flex-row gap-3'}>
        <button className={'bg-blue-400 hover:bg-red-400 px-5 py-3 transition-colors hover:translate-y-1'}>Tailwind Button</button>

        <button className={'bg-yellow-500 hover:bg-green-400 shadow-md p-3 transition-colors'}>Second Button</button>

        <button className={'bg-white ring-2 ring-blue-500 hover:ring-4 shadow-lg p-3'}>Ring and Shadow</button>
      </div>

      <div className={'gap-1 rounded-lg bg-slate-100 p-4'}>
        <div className={'text-2xl text-slate-900'}>The type scale</div>

        <div className={'text-sm leading-relaxed text-slate-600'}>
          A line height with no unit is a multiple of the font size, so this stays proportional at any size.
        </div>

        <div className={'text-base leading-none text-slate-600'}>The same two lines of text, at text-base and leading-none.</div>
      </div>

      <div className={'flex-row gap-3'}>
        <div className={'size-16 rounded-md bg-purple-500'} />
        <div className={'size-16 rounded-md bg-purple-500 opacity-50'} />
        <div className={'size-16 rounded-md bg-purple-500 rotate-12'} />
        <div className={'size-16 rounded-md bg-purple-500 -translate-y-2'} />
      </div>
    </div>
  );
}

export default TailwindPage;
