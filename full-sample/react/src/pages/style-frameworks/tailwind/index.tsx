import './index.css';

export function TailwindPage() {
  return <div className={'tailwind-root flex-row'}>

    <div className={'flex-row'}>
      <button className={'bg-blue-400 hover:bg-red-400 p-3 m-3 transition-colors hover:translate-y-1'}>
        Tailwind Button
      </button>

      <button className={'bg-yellow-500 text-primary hover:bg-green-400 shadow-md p-3 m-3 transition-colors'}>
        Second Button
      </button>
    </div>

    <div tw='flex-row'>
      <button tw={'bg-blue-400 hover:bg-red-400 p-3 m-3 transition-colors hover:translate-y-1'}>
        Twin Macro also works
      </button>
    </div>
  </div>;
}

export default TailwindPage;
