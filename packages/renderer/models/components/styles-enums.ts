export enum FontWeight {
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

export enum FontStyles {
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


export enum TextOverflowModes {
  Overflow = 'overflow',
  Ellipsis = 'ellipsis',
  Masking = 'masking',
  Truncate = 'truncate',
  ScrollRect = 'scroll-rect',
  Page = 'page',
  Linked = 'linked',
}

export enum PointerEvents {
  Auto = 'auto',
  Visible = 'visible',
  All = 'all',
  None = 'none',
}

export enum Visibility {
  Visible = 'visible',
  Hidden = 'hidden',
}

export enum CursorType {
  Auto = 'auto',
  Default = 'default',
  None = 'none',
  ContextMenu = 'context-menu',
  Help = 'help',
  Pointer = 'pointer',
  Progress = 'progress',
  Wait = 'wait',
  Cell = 'cell',
  Crosshair = 'crosshair',
  Text = 'text',
  VerticalText = 'vertical-text',
  Alias = 'alias',
  Copy = 'copy',
  Move = 'move',
  NoDrop = 'no-drop',
  NotAllowed = 'not-allowed',
  EResize = 'e-resize',
  NResize = 'n-resize',
  NeResize = 'ne-resize',
  NwResize = 'nw-resize',
  SResize = 's-resize',
  SeResize = 'se-resize',
  SwResize = 'sw-resize',
  WResize = 'w-resize',
  EwResize = 'ew-resize',
  NsResize = 'ns-resize',
  NeswResize = 'nesw-resize',
  NwseResize = 'nwse-resize',
  ColResize = 'col-resize',
  RowResize = 'row-resize',
  AllScroll = 'all-scroll',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out',
  Grab = 'grab',
  Grabbing = 'grabbing',
}
