import { ReactUnity, System, UnityEngine } from '../generated';
import { BaseField, View } from '../uitoolkit/components';

export interface EnumProps extends BaseField<number> {
  type: System.Type | string;
}

export interface ObjectProps extends BaseField<UnityEngine.Object> {
  type?: System.Type | string;
  allowSceneObjects?: boolean;
}

type DialogType = 'default' | 'modal' | 'utility' | 'modal-utility' | 'aux' | 'popup' | 'tab';
type DialogCmp = ReactUnity.Editor.UIToolkit.DialogComponent;

export interface DialogProps extends View<DialogCmp> {
  show?: boolean;
  title?: string;
  type?: DialogType;
  onOpen?: (ev: true, sender: DialogCmp) => void;
  onClose?: (ev: false, sender: DialogCmp) => void;
  onVisibilityChange?: (ev: boolean, sender: DialogCmp) => void;
  onFocusChange?: (ev: boolean, sender: DialogCmp) => void;
  onSelectionChange?: (ev: any, sender: DialogCmp) => void;
}
