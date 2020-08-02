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
  { name: 'View', render: View, sourceCode: ViewSource },
  { name: 'Scroll', render: Scroll, sourceCode: ScrollSource },
  { name: 'Button', render: Button, sourceCode: ButtonSource },
  { name: 'Image', render: Image, sourceCode: ImageSource },
  { name: 'Input', render: Input, sourceCode: InputSource },
  { name: 'Anchor', render: Anchor, sourceCode: AnchorSource },
  { name: 'Text', render: Text, sourceCode: TextSource },
  { name: 'Toggle', render: Toggle, sourceCode: ToggleSource },
  { name: 'Tooltip', render: Tooltip, sourceCode: TooltipSource },
  { name: 'Dropdown', render: Dropdown, sourceCode: DropdownSource },
]

sampleGallery([
  { name: 'Components', render: () => SampleGallery(wikiPages), children: wikiPages },
  { name: 'Animation', render: Anim, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/anim/index.tsx' },
  { name: 'Text Columns', render: TextColumns, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/text-columns/index.tsx' },
  { name: 'Todo App', render: TodoApp, source: 'https://github.com/KurtGokhan/react-unity-full-sample/blob/master/react/src/todo-mvc/index.tsx' },
]);
