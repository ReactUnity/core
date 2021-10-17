import { ReactUnity } from '../generated';
import { RenderStyle } from './styles';
import { LayoutCssCompatible } from './yoga';

export type Style = RenderStyle & LayoutCssCompatible;
export type InlineStyleRemap = Style & ReactUnity.Styling.InlineStyles;
