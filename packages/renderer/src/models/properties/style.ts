import { ReactUnity } from '../generated';
import { RenderStyle } from './styles';
import { LayoutCssCompatible } from './yoga';

type AllPropsAsString<T> = {
  [Key in keyof T]: T[Key] | (string & {});
}

export type Style = AllPropsAsString<RenderStyle & LayoutCssCompatible>;
export type InlineStyleRemap = Style & ReactUnity.Styling.InlineStyles;
