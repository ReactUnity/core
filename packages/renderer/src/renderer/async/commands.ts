
export type BatchUpdateProps = {
  [key: string]: string | number | object;
};

export type AsyncCallback = (...args: any[]) => any;

export type BatchUpdateCallbacks = {
  [key: string]: number;
};

export type SerializableUpdateProps = {
  p?: BatchUpdateProps;
  e?: BatchUpdateCallbacks;
  o?: BatchUpdateCallbacks;
};

type ApplyUpdatesParams = SerializableUpdateProps & {
  r: number;
  t: string;
  c?: string;
};

/* The command properties are kept short for better performance. Here are the explanation of properties:
 * t: Type
 * r: Ref ID
 * p: Parent Ref ID, or Properties
 * c: Child Ref ID, or text Content
 * h: Hidden
 * e: Events & callbacks
 * o: Objects
 * k: Pool Key
 */

export type CreateInstanceCommand = ['c', ApplyUpdatesParams & { k?: string }];
export type CreateTextInstanceCommand = ['t', { r: number, c?: string }];
export type AppendChildCommand = ['a', { p: number, c: number }];
export type RemoveChildCommand = ['r', { p: number, c: number }];
export type InsertChildCommand = ['i', { p: number, c: number, i?: number }];
export type ApplyUpdatesCommand = ['u', ApplyUpdatesParams];
export type TextUpdateCommand = ['x', { r: number, c: string }];
export type ToggleHideCommand = ['h', { r: number, h: boolean }];
export type ClearContainerCommand = ['o'];


export type CreateInstanceCommandShort = [
  /* c */ 0,
  /* Ref ID */ number,
  /* Type */ string,
  /* Update props */ SerializableUpdateProps?,
  // /* Text Content */ string?,
  /* Pool Key */ string?,
];

export type CreateTextInstanceCommandShort = [
  /* t */ 1,
  /* Ref ID */ number,
  /* Text Content */ string?,
];

export type AppendChildCommandShort = [
  /* a */ 2,
  /* Parent Ref ID */ number,
  /* Child Ref ID */ number,
];

export type RemoveChildCommandShort = [
  /* r */ 3,
  /* Parent Ref ID */ number,
  /* Child Ref ID */ number,
];
export type InsertChildCommandShort = [
  /* i */ 4,
  /* Parent Ref ID */ number,
  /* Child Ref ID */ number,
  /* Index */ number?,
];

export type ApplyUpdatesCommandShort = [
  /* u */ 5,
  /* Ref ID */ number,
  /* Type */ string,
  /* Update props */ SerializableUpdateProps?,
  // /* Text Content */ string?,
];

export type TextUpdateCommandShort = [
  /* x */ 6,
  /* Ref ID */ number,
  /* Text Content */ string,
];

export type ToggleHideCommandShort = [
  /* h */ 7,
  /* Ref ID */ number,
  /* Hidden */ boolean,
];

export type ClearContainerCommandShort = [
  /* o */ 8,
];


export type BatchCommandLong =
  | CreateInstanceCommand
  | CreateTextInstanceCommand
  | AppendChildCommand
  | RemoveChildCommand
  | InsertChildCommand
  | ApplyUpdatesCommand
  | TextUpdateCommand
  | ToggleHideCommand
  | ClearContainerCommand
  | null;


export type BatchCommandShort =
  | CreateInstanceCommandShort
  | CreateTextInstanceCommandShort
  | AppendChildCommandShort
  | RemoveChildCommandShort
  | InsertChildCommandShort
  | ApplyUpdatesCommandShort
  | TextUpdateCommandShort
  | ToggleHideCommandShort
  | ClearContainerCommandShort
  | null;

export type BatchCommand =
  | BatchCommandLong
  | BatchCommandShort
  | null;
