export const enum FontWeight {
  Thin = 100,
  ExtraLight = 200,
  Light = 300,
  Regular = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
  Heavy = 800,
  Black = 900,
}

export const enum FontStyles {
  Normal = 0,
  Bold = 1,
  Italic = 2,
  Underline = 4,
  LowerCase = 8,
  UpperCase = 16,
  SmallCaps = 32,
  Strikethrough = 64,
  Superscript = 128,
  Subscript = 256,
  Highlight = 512,
}


export const enum TextOverflowModes {
  Overflow = 0,
  Ellipsis = 1,
  // Masking = 2,
  Truncate = 3,
  // ScrollRect = 4,
  // Page = 5,

  /** @experimental */
  Linked = 6
}

export const enum InteractionType {
  WhenVisible = 0,
  Always = 1,
  Ignore = 2,
  Block = 3,
}
