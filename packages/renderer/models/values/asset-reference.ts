import { UnityObject } from "../native";

export enum AssetReferenceType {
  None = 0,
  File = 1,
  Url = 2,
  Resource = 3,
  Global = 4,
  Procedural = 5,
}

export type AssetReference = string | UnityObject;
