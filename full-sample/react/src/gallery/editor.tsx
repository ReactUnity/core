import * as React from 'react';
import { Position, LineType, PointerEvents } from '@reactunity/renderer';
import { colorizeRichtext, tokenize, fixLineWrapOpportunity } from './monaco/tokenizer';


export const TextEditor = ({ text }: { text: string }) => {
  const richText = colorizeRichtext(...tokenize(text));

  return <view style={{ fontFamily: 'monospace', flexGrow: 1, flexShrink: 0 }}>
    <input readonly lineType={LineType.MultiLineNewline} webSupport
      style={{
        position: Position.Absolute, height: '100%', width: '100%', flexShrink: 0, padding: 11,
        backgroundColor: 'transparent', fontColor: 'transparent',
      }}
      value={fixLineWrapOpportunity(text)} />
    <input richText readonly lineType={LineType.MultiLineNewline}
      style={{ flexShrink: 0, padding: 10, borderWidth: 1, backgroundColor: 0.94, borderColor: 0.8, pointerEvents: PointerEvents.None }}
      value={richText} />
  </view>;
};
