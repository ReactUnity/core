import { useNavigate } from 'react-router';
import styles from './index.module.scss';

export const HomePage = () => {
  const nav = useNavigate();

  return (
    <view className={styles.host}>
      <view className={'gap-3 rounded-2xl bg-slate-800 p-8'}>
        <view className={'text-4xl font-bold text-white'}>Welcome to ReactUnity 😎</view>

        <view className={'max-w-lg text-slate-300 leading-relaxed'}>
          Every page in the left menu is a live example, rendered by React into Unity with no browser anywhere. Pick one to see what the
          renderer, the styling and the interop can do.
        </view>

        <view className={'mt-2 flex-row gap-3'}>
          <button className={'bg-indigo-500 px-5 py-3 text-white transition-colors hover:bg-indigo-400'} onClick={() => nav('material')}>
            Material showcase
          </button>

          <button
            className={'bg-slate-700 px-5 py-3 text-slate-100 transition-colors hover:bg-slate-600'}
            onClick={() => nav('style-playground')}
          >
            Style playground
          </button>
        </view>
      </view>

      <section>
        <h2>Rich text</h2>

        <view className={'rounded-xl bg-white p-6 ring-1 ring-slate-200'}>
          <richtext
            onPointerClick={(ev, sender) => {
              const linkId = sender.GetLinkInfo(ev);
              if (linkId === 'svgs') nav('svgs');
            }}
          >
            A <b>richtext</b> element takes TextMeshPro's own tags, so it can do things a single style cannot:{' '}
            <size value={'28'}>a size mid-sentence</size>, <color value={'#4f46e5'}>a colour</color>,{' '}
            <uppercase>
              <margin value="12">
                <nbsp />
                spacing
                <nbsp />
              </margin>
            </uppercase>
            , and{' '}
            {/* biome-ignore lint/correctness/noVoidElementsWithChildren: inside <richtext> this is TextMeshPro's
                <link> tag, which wraps the text it makes clickable. Nothing here is an HTML void element. */}
            <link value={'svgs'}>
              <color value="#4f46e5">
                <u>a link to the SVG page</u>
              </color>
            </link>{' '}
            that reports which link was clicked.
          </richtext>
        </view>
      </section>
    </view>
  );
};

export default HomePage;
