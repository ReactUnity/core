import sampleGallery, { Sample, SampleGallery } from './src/gallery';
import { App as LinkedText } from './src/linked-text';
import { App as Anim } from './src/anim';
import { App as Anchor } from './src/wiki/anchor';
import { App as Button } from './src/wiki/button';
import { App as Dropdown } from './src/wiki/dropdown';
import { App as Image } from './src/wiki/image';
import { App as Input } from './src/wiki/input';
import { App as Scroll } from './src/wiki/scroll';
import { App as Text } from './src/wiki/text';
import { App as Toggle } from './src/wiki/toggle';
import { App as Tooltip } from './src/wiki/tooltip';
import { App as View } from './src/wiki/view';
import { TodoApp } from './src/todo-mvc';

import ViewSource from '!!raw-loader!./src/wiki/view';
import AnchorSource from '!!raw-loader!./src/wiki/anchor';
import ButtonSource from '!!raw-loader!./src/wiki/button';
import DropdownSource from '!!raw-loader!./src/wiki/dropdown';
import ImageSource from '!!raw-loader!./src/wiki/image';
import InputSource from '!!raw-loader!./src/wiki/input';
import ScrollSource from '!!raw-loader!./src/wiki/scroll';
import TextSource from '!!raw-loader!./src/wiki/text';
import ToggleSource from '!!raw-loader!./src/wiki/toggle';
import TooltipSource from '!!raw-loader!./src/wiki/tooltip';

const wikiPages: Sample[] = [
  { name: 'View', render: View, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/view.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#view', sourceCode: ViewSource },
  { name: 'Scroll', render: Scroll, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/scroll.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#scroll', sourceCode: ScrollSource },
  { name: 'Button', render: Button, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/button.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#button', sourceCode: ButtonSource },
  { name: 'Image', render: Image, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/image.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#image', sourceCode: ImageSource },
  { name: 'Input', render: Input, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/input.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#input', sourceCode: InputSource },
  { name: 'Anchor', render: Anchor, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/anchor.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#anchor', sourceCode: AnchorSource },
  { name: 'Text', render: Text, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/text.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#text', sourceCode: TextSource },
  { name: 'Toggle', render: Toggle, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/toggle.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/Primitive-Components#toggle', sourceCode: ToggleSource },
  { name: 'Tooltip', render: Tooltip, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/tooltip.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/High-level-Components#tooltip', sourceCode: TooltipSource },
  { name: 'Dropdown', render: Dropdown, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/wiki/dropdown.tsx', wiki: 'https://github.com/KurtGokhan/react-unity/wiki/High-level-Components#dropdown', sourceCode: DropdownSource },
]

sampleGallery([
  { name: 'Components', render: () => SampleGallery(wikiPages), children: wikiPages },
  { name: 'Animation', render: Anim, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/anim/index.tsx' },
  { name: 'Linked Text', render: LinkedText, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/linked-text/index.tsx' },
  { name: 'Todo App', render: TodoApp, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/todo-mvc/index.tsx' },
]);
