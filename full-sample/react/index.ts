import sampleGallery, { Sample, SampleGallery } from './src/sample-gallery';
import { App as LinkedText } from './src/text';
import { App as Anim } from './src/anim';
import { App as Button } from './src/wiki/button';
import { App as Dropdown } from './src/wiki/dropdown';
import { App as Image } from './src/wiki/image';
import { App as Input } from './src/wiki/input';
import { App as Text } from './src/wiki/text';
import { App as Toggle } from './src/wiki/toggle';
import { App as Tooltip } from './src/wiki/tooltip';
import { App as View } from './src/wiki/view';
import { TodoApp } from './src/todo-mvc';


const wikiPages: Sample[] = [
  { name: 'View', render: View },
  { name: 'Button', render: Button },
  { name: 'Image', render: Image },
  { name: 'Input', render: Input },
  { name: 'Text', render: Text },
  { name: 'Toggle', render: Toggle },
  { name: 'Tooltip', render: Tooltip },
  { name: 'Dropdown', render: Dropdown },
]

sampleGallery([
  { name: 'Components', render: () => SampleGallery(wikiPages) },
  { name: 'Animation', render: Anim },
  { name: 'Linked Text', render: LinkedText },
  { name: 'TodoApp', render: TodoApp },
]);

