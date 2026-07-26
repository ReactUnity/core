export type SafeString = string & {};

export type AnchorTarget = SafeString | '_parent' | '_self' | '_black' | '_top';

export type ScrollDirection = 'none' | 'horizontal' | 'vertical' | 'both';
