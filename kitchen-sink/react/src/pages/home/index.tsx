import { icon } from '@reactunity/renderer';
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
        <h2>New</h2>

        <view className={'flex-row items-center gap-5 rounded-xl bg-slate-900 p-6 ring-1 ring-cyan-400/40'}>
          <icon.videogame_asset className={'text-5xl text-cyan-300'} />

          <view className={'flex-1 gap-2'}>
            <view className={'flex-row items-center gap-2'}>
              <text className={'text-xl font-bold text-white'}>Game HUD</text>
              <text className={'rounded-full bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] tracking-widest text-cyan-300'}>NEW</text>
            </view>

            <text className={'text-slate-300 leading-relaxed'}>
              A mock ARPG heads-up display with no sprites and no atlas behind it. Conic gradients, clip-path shapes, masks, blend modes, a
              perspective floor and animation events, all from CSS — the heaviest page here for the styling engine.
            </text>
          </view>

          <button className={'bg-cyan-600 px-5 py-3 text-white transition-colors hover:bg-cyan-500'} onClick={() => nav('game-hud')}>
            Open
          </button>
        </view>
      </section>

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
