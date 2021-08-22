import { ReactUnity } from '../generated';
import { View } from './components';

export type TouchScreenKeyboardType = 'default' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad'
  | 'phone-pad' | 'name-phone-pad' | 'email-address' | 'nintendo-network-account' | 'social' | 'search ' | 'decimal-pad ';

export type ContentType = 'standard' | 'autocorrected' | 'integer-number' | 'decimal-number'
  | 'alphanumeric' | 'name' | 'email-address' | 'password' | 'pin' | 'custom';

export type CharacterValidation = 'none' | 'digit' | 'integer' | 'decimal' | 'alphanumeric'
  | 'name' | 'regex' | 'email-address' | 'custom-validator';

export type LineType = 'single-line' | 'multiline-submit' | 'multiline-newline';

export type InputEvent = (val: string, sender: ReactUnity.UGUI.InputComponent) => void;
export type TextSelectionEvent = (val: string, start: number, end: number, sender: ReactUnity.UGUI.InputComponent) => void;

export interface Input extends View<ReactUnity.UGUI.InputComponent> {
  placeholder?: string;
  value?: string;
  characterLimit?: number;
  lineLimit?: number;
  readonly?: boolean;
  richText?: boolean;
  contentType?: ContentType;
  keyboardType?: TouchScreenKeyboardType;
  lineType?: LineType;
  validation?: CharacterValidation;
  disabled?: boolean;

  onReturn?: InputEvent;
  onEndEdit?: InputEvent;
  onChange?: InputEvent;
  onTextSelection?: TextSelectionEvent;
  onEndTextSelection?: TextSelectionEvent;
}
