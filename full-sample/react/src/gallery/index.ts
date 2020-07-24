/* eslint import/no-webpack-loader-syntax: off */

import sampleGallery, { Sample, SampleGallery } from './gallery';
import { App as TextColumns } from '../text-columns';
import { App as Anim } from '../anim';
import { App as Anchor } from '../wiki/anchor';
import { App as Button } from '../wiki/button';
import { App as Dropdown } from '../wiki/dropdown';
import { App as Image } from '../wiki/image';
import { App as Input } from '../wiki/input';
import { App as Scroll } from '../wiki/scroll';
import { App as Text } from '../wiki/text';
import { App as Toggle } from '../wiki/toggle';
import { App as Tooltip } from '../wiki/tooltip';
import { App as View } from '../wiki/view';
import { TodoApp } from '../todo-mvc';

import ViewSource from '!!raw-loader!../wiki/view';
import AnchorSource from '!!raw-loader!../wiki/anchor';
import ButtonSource from '!!raw-loader!../wiki/button';
import DropdownSource from '!!raw-loader!../wiki/dropdown';
import ImageSource from '!!raw-loader!../wiki/image';
import InputSource from '!!raw-loader!../wiki/input';
import ScrollSource from '!!raw-loader!../wiki/scroll';
import TextSource from '!!raw-loader!../wiki/text';
import ToggleSource from '!!raw-loader!../wiki/toggle';
import TooltipSource from '!!raw-loader!../wiki/tooltip';

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
  { name: 'Text Columns', render: TextColumns, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/text-columns/index.tsx' },
  { name: 'Todo App', render: TodoApp, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/todo-mvc/index.tsx' },
]);
