import * as React from 'react';
import { PositionType, LineType, PointerEvents } from '@reactunity/renderer';
import { colorizeRichtext, tokenize, fixLineWrapOpportunity } from './monaco/tokenizer';


export const TextEditor = ({ text }: { text: string }) => {
  const richText = colorizeRichtext(...tokenize(text));

  return <view style={{ font: Globals.RobotoMono }} layout={{ FlexGrow: 1, FlexShrink: 0 }}>
    <input readonly lineType={LineType.MultiLineNewline} webSupport
      layout={{ PositionType: PositionType.Absolute, Height: '100%', Width: '100%', FlexShrink: 0, Padding: 11 }}
      style={{ backgroundColor: 'transparent', font: Globals.RobotoMono, fontColor: 'transparent' }}
      value={fixLineWrapOpportunity(text)} />
    <input richText readonly lineType={LineType.MultiLineNewline}
      layout={{ FlexShrink: 0, Padding: 10, BorderWidth: 1 }}
      style={{ backgroundColor: 0.94, borderColor: 0.8, font: Globals.RobotoMono, pointerEvents: PointerEvents.None }}
      value={richText} />
  </view>;
}
