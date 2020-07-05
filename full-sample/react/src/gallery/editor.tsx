import * as React from 'react';
import { PositionType, LineType, InteractionType } from 'react-unity-renderer';
import { colorizeRichtext, tokenize } from './monaco/tokenizer';


export const TextEditor = ({ text }: { text: string }) => {
  const richText = colorizeRichtext(...tokenize(text));

  return <view style={{ font: NamedAssets.RobotoMono }} layout={{ FlexGrow: 1, FlexShrink: 0 }}>
    <input readonly lineType={LineType.MultiLineNewline} webSupport
      layout={{ PositionType: PositionType.Absolute, Height: '100%', Width: '100%', FlexShrink: 0, Padding: 11 }}
      style={{ backgroundColor: 'transparent', font: NamedAssets.RobotoMono, fontColor: 'transparent' }}
      value={text} />
    <input richText readonly lineType={LineType.MultiLineNewline}
      layout={{ FlexShrink: 0, Padding: 10, BorderWidth: 1 }}
      style={{ backgroundColor: 0.94, borderColor: 0.8, font: NamedAssets.RobotoMono, interaction: InteractionType.Ignore }}
      value={richText} />
  </view>;
}
