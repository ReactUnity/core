import { System, UnityEngine } from '../generated';
import { BaseField } from '../uitoolkit/components';

export interface EnumProps extends BaseField<number> {
  type: System.Type | string;
}

export interface ObjectProps extends BaseField<UnityEngine.Object> {
  type?: System.Type | string;
  allowSceneObjects?: boolean;
}
