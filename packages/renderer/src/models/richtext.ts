import * as React from 'react';
import { UnityEngine } from './generated';

export type RichTextTags = RichTextValueTag;

export interface RichTextVoidTag extends React.Attributes {
  children?: any;
}

export interface RichTextValueTag<T = string | number> extends React.Attributes {
  value?: T | string;
  children?: any;
}

export interface RichTextColorTag extends React.Attributes {
  value?: string | UnityEngine.Color;
  children?: any;
}

export interface RichTextFontTag extends React.Attributes {
  value?: string;
  material?: string;
  children?: any;
}

export interface RichTextSpriteTag extends React.Attributes {
  value?: string | number;
  children?: any;
  name?: string;
  index?: string | number;
  color?: string;
}

export interface RichTextElements {
  'nbsp': RichTextVoidTag;
  'zwsp': RichTextVoidTag;
  'br': RichTextVoidTag;

  'align': RichTextValueTag<'right' | 'center' | 'left'>;
  'alpha': RichTextValueTag<string>;
  'color': RichTextColorTag;
  'b': RichTextVoidTag;
  'i': RichTextVoidTag;
  'cspace': RichTextValueTag<number>;
  'font': RichTextFontTag;
  'indent': RichTextValueTag<number>;
  'line-height': RichTextValueTag<number>;
  'line-indent': RichTextValueTag<number>;
  'link': RichTextValueTag;
  'lowercase': RichTextVoidTag;
  'uppercase': RichTextVoidTag;
  'smallcaps': RichTextVoidTag;
  'allcaps': RichTextVoidTag;
  'margin': RichTextValueTag<number>;
  'margin-left': RichTextValueTag<number>;
  'margin-right': RichTextValueTag<number>;
  'mark': RichTextValueTag;
  'mspace': RichTextVoidTag;
  'noparse': RichTextVoidTag;
  'nobr': RichTextVoidTag;
  'page': RichTextVoidTag;
  'pos': RichTextValueTag<number>;
  'size': RichTextValueTag<number>;
  'space': RichTextValueTag<number>;
  'sprite': RichTextSpriteTag;
  's': RichTextVoidTag;
  'u': RichTextVoidTag;
  'style': RichTextValueTag;
  'sub': RichTextVoidTag;
  'sup': RichTextVoidTag;
  'voffset': RichTextValueTag<number>;
  'width': RichTextValueTag<number>;
};
