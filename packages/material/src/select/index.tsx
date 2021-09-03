import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import * as React from 'react';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../button';
import { InputField, InputFieldRef, InputFieldVariant } from '../input';
import { getElevationClass } from '../util/helpers';
import { SelectionElement, SelectionState } from '../util/selection';
import style from './index.module.scss';

interface SelectSelectionElement extends SelectionElement {
  getTemplate(): ReactNode;
}

const SelectContext = React.createContext<SelectionState<any, SelectSelectionElement>>(null);

type ToggleEl = ReactUnity.UGUI.ToggleComponent;

export type SelectProps<T = any> = {
  keepOpen?: boolean | 'auto';
  children?: React.ReactNode;
  float?: 'always' | 'never' | 'auto';
  selectAllOnFocus?: boolean;
  onValue?: (val: string) => void;
  placeholder?: ReactNode;
  defaultValue?: string;
  variant?: InputFieldVariant;
  hideCaret?: boolean;
  separator?: ReactNode;
  chips?: boolean;
} &
  ({
    multiple: true;
    onChange?: (val: T[], all: boolean, any: boolean) => void;
    initialValue?: T[];
  } | {
    multiple?: false;
    onChange?: (val: T, all: boolean, any: boolean) => void;
    initialValue?: T;
  })
  & UGUIElements['button'];

export function _Select<T = any>({
  keepOpen = 'auto', onChange, name, children, initialValue, multiple, separator, chips,
  variant, placeholder, float, className, hideCaret, ...otherProps }: SelectProps<T>): React.ReactElement {
  const init = useRef(initialValue);
  const selectAllRef = useRef<ToggleEl>();
  const fieldRef = useRef<InputFieldRef>();
  const shouldKeepOpen = keepOpen === 'auto' ? multiple : !!keepOpen;

  const state = useMemo(() => new SelectionState<T, SelectSelectionElement>(!!multiple, init.current), [multiple, init]);
  state.onChange = useCallback((val, all, any) => {
    onChange?.(val as any, all, any);

    if (selectAllRef.current) {
      selectAllRef.current.Indeterminate = !!any && !all;
      selectAllRef.current.Checked = !!all;
    }

    if (!shouldKeepOpen) {
      setOpened(false);
    }

    fieldRef.current?.setEmpty(!any);
  }, [onChange, shouldKeepOpen]);

  const [selectedElements, setSelectedElements] = useState(state.getSelectedElements());

  state.onUpdate = useCallback((st) => {
    setSelectedElements(st.getSelectedElements());
  }, []);

  const [opened, setOpened] = useState(false);

  const toggle = useCallback(() => setOpened(st => !st), [setOpened]);
  const close = useCallback(() => setOpened(false), [setOpened]);

  if (typeof separator === 'undefined' && !chips) {
    separator = <text className={style.defaultSeparator}>,</text>;
  }

  return <InputField className={clsx(className, style.host, 'mat-select-field', style[variant], opened && [style.opened, 'mat-select-opened'])} variant={variant}
    placeholder={placeholder} float={float} name={name || '<SelectField>'} ref={fieldRef}>

    <button name="<Select>" onClick={toggle} className={clsx(style.trigger, 'mat-input-field-target')} {...otherProps}>
      {selectedElements.map((x, i) => <React.Fragment key={i}>
        {i > 0 && separator}
        <view className={style.triggerPart}>{x.getTemplate()}</view>
      </React.Fragment>)}

      <view className={clsx(style.menuRoot, opened && style.opened)}>
        <button name="<SelectBackdrop>" onClick={close} className={clsx(style.backdrop)} />

        <SelectContext.Provider value={state}>
          <view name="<SelectMenu>" className={clsx(style.menu, getElevationClass(4))}>
            {children}
          </view>
        </SelectContext.Provider>
      </view>
    </button>

    {!hideCaret &&
      <icon className={clsx(style.caret, 'mat-select-caret')}>{'keyboard_arrow_down'}</icon>}
  </InputField>;
}

export interface OptionProps {
  children?: ReactNode;
  value?: any;
  triggerTemplate?: React.ReactNode;
}

export function _Option({ children, value, triggerTemplate }: OptionProps) {
  const ctx = useContext(SelectContext);

  const stateRef = useRef<{ Selected: boolean }>({ Selected: false });
  const onChangeRef = useRef<(() => void)[]>([]);
  const getTemplateRef = useRef<() => ReactNode>(() => triggerTemplate ?? children);
  const childRef = useRef(children);
  useEffect(() => { childRef.current = children; }, [children]);

  useEffect(() => {
    getTemplateRef.current = () => triggerTemplate ?? childRef.current;
    ctx.triggerUpdate();
  }, [triggerTemplate, ctx]);

  const selectionRef = React.useMemo<SelectSelectionElement>(() => ({
    get selected() { return stateRef.current.Selected; },
    set selected(val: boolean) { stateRef.current.Selected = val; },
    value,
    addOnChange: (callback) => {
      if (!callback) return;
      onChangeRef.current.push(callback);
      return () => {
        const ind = onChangeRef.current.indexOf(callback);
        if (ind >= 0) onChangeRef.current.splice(ind, 1);
      };
    },
    getTemplate: () => {
      return getTemplateRef.current();
    },
  }), [value]);

  useEffect(() => {
    if (ctx) {
      ctx.register(selectionRef);
      return () => { ctx.unregister(selectionRef); };
    }
  }, [ctx, selectionRef]);

  const onClick = useCallback<UGUIElements['button']['onClick']>(() => {
    stateRef.current.Selected = !stateRef.current.Selected;

    for (let index = 0; index < onChangeRef.current.length; index++) {
      const cb = onChangeRef.current[index];
      cb();
    }
  }, []);

  return <Button className={style.option} onClick={onClick} variant="text">
    {children}
  </Button>;
}

type SelectType = typeof _Select & {
  Option: typeof _Option;
};

export const Select = React.memo(_Select) as unknown as SelectType;
Select.Option = _Option;
