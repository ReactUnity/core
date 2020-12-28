import { UnityObject } from '../native/context';

export * from './color';
export * from './values';

export type EnumOrLiteral<T extends { [key: number]: string | number }> = T[keyof T] | keyof T | Lowercase<keyof T extends string ? keyof T : never>;
export type AssetReference = string | UnityObject;
