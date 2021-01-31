import { View } from './components';

export enum TouchScreenKeyboardType {
  Default = 0,
  ASCIICapable = 1,
  NumbersAndPunctuation = 2,
  URL = 3,
  NumberPad = 4,
  PhonePad = 5,
  NamePhonePad = 6,
  EmailAddress = 7,
  NintendoNetworkAccount = 8,
  Social = 9,
  Search = 10,
  DecimalPad = 11,
}

export enum ContentType {
  Standard = 0,
  Autocorrected = 1,
  IntegerNumber = 2,
  DecimalNumber = 3,
  Alphanumeric = 4,
  Name = 5,
  EmailAddress = 6,
  Password = 7,
  Pin = 8,
  Custom = 9,
}
export enum CharacterValidation {
  None = 0,
  Digit = 1,
  Integer = 2,
  Decimal = 3,
  Alphanumeric = 4,
  Name = 5,
  Regex = 6,
  EmailAddress = 7,
  CustomValidator = 8,
}
export enum LineType {
  SingleLine = 0,
  MultiLineSubmit = 1,
  MultiLineNewline = 2,
}

export type InputEvent = (val: string) => void;
export type TextSelectionEvent = (val: string, start: number, end: number) => void;

export interface Input extends View {
  onReturn?: InputEvent;
  onEndEdit?: InputEvent;
  onChange?: InputEvent;
  onTextSelection?: TextSelectionEvent;
  onEndTextSelection?: TextSelectionEvent;

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

  webSupport?: boolean;
}
