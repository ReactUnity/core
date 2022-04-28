import './index.css';

export function TailwindPage() {
  return <div className={'tailwind-root flex-row'}>

    <button className={'bg-blue-400 hover:bg-red-400 p-3 m-3 transition-colors hover:translate-y-1'}>
      Tailwind Button
    </button>

    <button className={'bg-yellow-100 hover:bg-green-400 shadow-md p-3 m-3 transition-colors'}>
      Second Button
    </button>
  </div>;
}

export default TailwindPage;
