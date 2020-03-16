import { AssetReference, AssetReferenceType } from "../models/values";

export const asset = {
  none: null,
  url: (url: string): AssetReference => ({ type: AssetReferenceType.Url, value: url }),
  file: (path: string): AssetReference => ({ type: AssetReferenceType.File, value: path }),
  resource: (path: string): AssetReference => ({ type: AssetReferenceType.Resource, value: path }),
  named: (name: string): AssetReference => ({ type: AssetReferenceType.NamedAsset, value: name }),
  procedural: (value: any): AssetReference => ({ type: AssetReferenceType.Procedural, value }),
};
