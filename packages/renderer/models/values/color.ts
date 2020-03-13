import { Array4 } from './values';

export type KnownColor = 'red' | 'cyan' | 'blue' | 'darkblue' | 'lightblue' | 'purple' | 'yellow'
| 'lime' | 'fuchsia' | 'white' | 'silver' | 'grey' | 'black' | 'orange' | 'brown' | 'maroon'
| 'green' | 'olive' | 'navy' | 'teal' | 'aqua' | 'magenta';

export type HexColor = string & { 0: '#' };
export type Color = KnownColor | HexColor | number | Array4 | [Color, number?, Color?] | { r?: number; g?: number; b?: number; a?: number } | ColorNative;
