import { CSSProp } from 'styled-components';
import 'twin.macro';

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp;
      as?: string | Element;
      tw?: string;
    }
  }
}
