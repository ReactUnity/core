import { ReactUnity } from '../generated';
import { RenderStyle } from './styles';
import { CssKeyword } from './styles-enums';
import { LayoutCssCompatible } from './yoga';

type AllPropsAsStringOrKeyword<T> = {
  [Key in keyof T]: T[Key] | (string & {}) | CssKeyword;
}

export type Style = AllPropsAsStringOrKeyword<RenderStyle & LayoutCssCompatible>;
export type InlineStyleRemap = Style & ReactUnity.Styling.InlineStyles;
