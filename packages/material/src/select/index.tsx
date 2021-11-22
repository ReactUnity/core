import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import * as React from 'react';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Toggle } from '..';
import { Button } from '../button';
import { InputField, InputFieldRef, InputFieldVariant } from '../input';
import { getElevationClass } from '../util/helpers';
import useAutoRef from '../util/hooks/use-auto-ref';
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

function _Select<T = any>({
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

  const setFieldRef: ((val: InputFieldRef) => void) = useCallback((val) => {
    fieldRef.current = val;
    fieldRef.current?.setEmpty(multiple ? (init.current as T[]).length === 0 : typeof init.current === 'undefined');
  }, [multiple]);

  return <InputField className={clsx(className, style.host, 'mat-select-field', style[variant], chips && style.chips, opened && [style.opened, 'mat-select-opened'])}
    variant={variant} placeholder={placeholder} float={float} name={name || '<SelectField>'} ref={setFieldRef}>

    <button name="<Select>" onClick={toggle} className={clsx(style.trigger, 'mat-input-field-target')} {...otherProps}>
      <view className={style.triggerContent}>
        {selectedElements.map((x, i) => <React.Fragment key={i}>
          {i > 0 && separator}
          <view className={style.triggerPart}>{x.getTemplate()}</view>
        </React.Fragment>)}
      </view>

      <view className={clsx(style.menuRoot, opened && style.opened)}>
        <button name="<SelectBackdrop>" onClick={close} className={clsx(style.backdrop)} />

        <SelectContext.Provider value={state}>
          <scroll name="<SelectMenu>" className={clsx(style.menu, getElevationClass(4))}>
            {children}
          </scroll>
        </SelectContext.Provider>
      </view>
    </button>

    {!hideCaret &&
      <icon className={clsx(style.caret, 'mat-select-caret')}>{'keyboard_arrow_down'}</icon>}
  </InputField>;
}

export interface OptionProps {
  children?: ReactNode;
  className?: string;
  value?: any;
  triggerTemplate?: React.ReactNode;
  showToggle?: boolean | 'auto';
}

function _Option({ className, children, value, triggerTemplate, showToggle = 'auto' }: OptionProps) {
  const ctx = useContext(SelectContext);

  const [selected, setSelected] = useState(false);
  const selectedRef = useAutoRef(selected);

  const onChangeRef = useRef<(() => void)[]>([]);
  const getTemplateRef = useRef<() => ReactNode>(() => triggerTemplate ?? children);
  const childRef = useRef(children);

  const shouldShowToggle = showToggle === 'auto' ? ctx.allowMultiple : !!showToggle;

  useEffect(() => { childRef.current = children; }, [children]);

  useEffect(() => {
    getTemplateRef.current = () => triggerTemplate ?? childRef.current;
    ctx.triggerUpdate();
  }, [triggerTemplate, ctx]);

  const selectionRef = React.useMemo<SelectSelectionElement>(() => ({
    get selected() { return selectedRef.current; },
    set selected(val: boolean) { setSelected(val); },
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
  }), [value, setSelected, selectedRef]);

  useEffect(() => {
    if (ctx) {
      ctx.register(selectionRef);
      return () => { ctx.unregister(selectionRef); };
    }
  }, [ctx, selectionRef]);

  const onClick = useCallback<UGUIElements['button']['onClick']>(() => {
    setSelected(x => !x);

    for (let index = 0; index < onChangeRef.current.length; index++) {
      const cb = onChangeRef.current[index];
      cb();
    }
  }, [setSelected]);

  return <Button onClick={onClick} variant="text"
    className={clsx(style.option, 'mat-select-option', selected && ['mat-select-option-selected', style.selected], className)}>
    {shouldShowToggle && <Toggle className={clsx(style.toggle, 'mat-select-option-toggle')} type={ctx.allowMultiple ? 'checkbox' : 'radio'} checked={selected} independent />}
    {children}
  </Button>;
}

type SelectType = typeof _Select & {
  Option: typeof _Option;
};

export const Select = React.memo(_Select) as unknown as SelectType;
Select.Option = _Option;
