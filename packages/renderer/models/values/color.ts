import { Array4Aux } from './values';

export type KnownColor = 'red' | 'cyan' | 'blue' | 'darkblue' | 'lightblue' | 'purple' | 'yellow'
  | 'lime' | 'fuchsia' | 'white' | 'silver' | 'grey' | 'gray' | 'black' | 'orange' | 'brown' | 'maroon'
  | 'green' | 'olive' | 'navy' | 'teal' | 'aqua' | 'magenta' | 'clear' | 'transparent';

export type HexColor = `#${string}`;
export type ColorAux = KnownColor | HexColor | number | Array4Aux | [ColorAux, number?, ColorAux?] | { r?: number; g?: number; b?: number; a?: number } | ColorNative;
