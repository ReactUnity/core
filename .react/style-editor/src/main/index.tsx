import { Renderer } from '@reactunity/renderer';
import { SelectionProvider, useSelection } from '../context/selection';
import { StyleContext } from '../context/style';
import { GroupedStyles } from './grouped-styles';
import style from './index.module.scss';

function App() {
  const selection = useSelection();
  return <view className={style.host}>
    {selection ?
      <GroupedStyles /> :
      <NotSelectedView />}
  </view>;
}

function NotSelectedView() {
  return <view>
    <image source="url(resource:ReactUnity/editor/logo)" className={style.logo}></image>

    <view>Select an element in the scene to edit its styles</view>
  </view>;
}

Renderer.render(
  <StyleContext>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </StyleContext>
);
