import * as React from 'react';
import { UnityEngine } from './generated';

export type RichTextTags = RichTextValueTag;

export interface RichTextVoidTag extends React.Attributes {
  children?: any;
}

export interface RichTextValueTag extends React.Attributes {
  value?: string;
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

  'align': RichTextValueTag;
  'alpha': RichTextValueTag;
  'color': RichTextColorTag;
  'b': RichTextVoidTag;
  'i': RichTextVoidTag;
  'cspace': RichTextValueTag;
  'font': RichTextFontTag;
  'indent': RichTextValueTag;
  'line-height': RichTextValueTag;
  'line-indent': RichTextValueTag;
  'link': RichTextValueTag;
  'lowercase': RichTextVoidTag;
  'uppercase': RichTextVoidTag;
  'smallcaps': RichTextVoidTag;
  'allcaps': RichTextVoidTag;
  'margin': RichTextValueTag;
  'margin-left': RichTextValueTag;
  'margin-right': RichTextValueTag;
  'mark': RichTextValueTag;
  'mspace': RichTextVoidTag;
  'noparse': RichTextVoidTag;
  'nobr': RichTextVoidTag;
  'page': RichTextVoidTag;
  'pos': RichTextValueTag;
  'size': RichTextValueTag;
  'space': RichTextValueTag;
  'sprite': RichTextSpriteTag;
  's': RichTextVoidTag;
  'u': RichTextVoidTag;
  'style': RichTextValueTag;
  'sub': RichTextVoidTag;
  'sup': RichTextVoidTag;
  'voffset': RichTextValueTag;
  'width': RichTextValueTag;
};
