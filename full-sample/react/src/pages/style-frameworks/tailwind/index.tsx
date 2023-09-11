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

    <view css='flex-row'>
      <button tw={'bg-blue-400 hover:bg-red-400 p-3 m-3 transition-colors hover:translate-y-1'}
        css={{ fontSize: 20 }}>
        Twin Macro also works
      </button>
    </view>
  </div>;
}

export default TailwindPage;
