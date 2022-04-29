import { Renderer } from '@reactunity/renderer';
import { SelectionProvider, useSelection } from '../context/selection';
import { StyleContext } from '../context/style';
import { Classes } from './classes';
import { GlobalStyle } from './global-style';
import style from './index.module.scss';

function App() {
  const selection = useSelection();
  return <view className={style.host}>
    {selection ? <>
      <GlobalStyle />
      <Classes />

      {/* <GroupedStyles /> */}

      <view style={{ padding: '40px', textAlign: 'center' }}>
        Style editing is disabled in this version of ReactUnity. Please revert to v0.9.9 or check back in new versions.
      </view>
    </> :
      <NotSelectedView />}
  </view>;
}

function NotSelectedView() {
  return <view>
    <image source="url(resource:ReactUnity/editor/logo)" className={style.logo}></image>

    <view>
      Select an element in the scene to edit its styles
    </view>
    <span>Only works for UGUI, for UI Document use builtin UI Toolkit Editor</span>

  </view>;
}

Renderer.render(
  <StyleContext>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </StyleContext>
);
