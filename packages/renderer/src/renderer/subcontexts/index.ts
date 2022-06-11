import { stringifyRichText } from './richtext';
import { stringifySVG } from './svg';

export const subContextRenderers = {
  'richtext': stringifyRichText,
  'svg': stringifySVG,
};
