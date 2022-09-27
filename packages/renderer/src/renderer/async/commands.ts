
export type BatchUpdateProps = {
  [key: string]: string | number | object;
};

export type AsyncCallback = (...args: any[]) => any;

export type BatchUpdateCallbacks = {
  [key: string]: number;
};

type ApplyUpdatesParams = {
  t: string;
  r: number;
  c?: string;
  p?: BatchUpdateProps;
  e?: BatchUpdateCallbacks;
  o?: BatchUpdateCallbacks;
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


export type BatchCommand =
  CreateInstanceCommand |
  CreateTextInstanceCommand |
  AppendChildCommand |
  RemoveChildCommand |
  InsertChildCommand |
  ApplyUpdatesCommand |
  TextUpdateCommand |
  ToggleHideCommand |
  ClearContainerCommand |
  null;

