import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useRipple } from '../ripple';
import { MdInteractible } from '../util/types';
import style from './index.module.scss';

type ToggleEl = ReactUnity.UGUI.ToggleComponent;

export type ToggleVariant = 'checkbox' | 'radio';
type Props = Omit<UGUIElements['toggle'], 'children'>
  & MdInteractible
  & {
    variant?: ToggleVariant;
    children?: ReactNode;
    independent?: boolean;
  };

const _Toggle = React.forwardRef<ToggleEl, Props>(
  function _Toggle({ children, className, noRipple, onPointerDown, onPointerUp, variant, independent, ...props }, ref) {
    const toggleRef = useRef<ToggleEl>();
    const ripple = useRipple({ onPointerDown, onPointerUp, noRipple, centered: true, target: toggleRef });

    let ctx = useContext(ToggleGroupContext);
    if (independent) ctx = null;
    variant = variant || (ctx && !ctx.allowMultiple ? 'radio' : 'checkbox');

    const innerRef = useCallback((val: ToggleEl) => {
      toggleRef.current = val;

      if (typeof ref === 'function') ref(val);
      else if (ref) ref.current = val;

      if (ctx) ctx.register(val);
    }, [ctx, ref]);

    useEffect(() => {
      return () => {
        if (ctx && toggleRef.current) ctx.unregister(toggleRef.current);
      };
    }, [ctx]);

    return <label className={clsx(className, style.label, 'md-toggle-label', style[variant], 'md-variant-' + variant)} {...ripple}>
      <toggle name="<Toggle>" ref={innerRef}
        className={clsx(style.toggle, 'md-toggle')}
        {...props}  {...ripple} />

      {!!children && <view className={clsx(style.labelContent, 'md-toggle-label-content')}>{children}</view>}
    </label>;
  });

export const Toggle = React.memo(_Toggle);


export class ToggleGroupState<T = any> {
  elements: { el: ToggleEl, listener: () => void }[] = [];
  value: T | T[];
  any: boolean;
  all: boolean;
  onChange: (val: T | T[], all: boolean, any: boolean) => void;

  constructor(
    public readonly allowMultiple: boolean,
    public readonly initialValue: any | any[],
  ) {
    this.value = initialValue || (allowMultiple ? [] : undefined);
    if (this.allowMultiple && !Array.isArray(this.value)) this.value = [this.value];
  }

  changed(sender?: ToggleEl): T | T[] {
    if (this.allowMultiple) {
      let all = true;
      let any = false;
      const res = [];
      for (let index = 0; index < this.elements.length; index++) {
        const element = this.elements[index];
        if (element.el.Checked) {
          res.push(element.el.Value);
          any = true;
        }
        else all = false;
      }
      this.value = res;
      this.all = all;
      this.any = any;
      return;
    } else {
      this.all = false;
      let firstChecked = sender;

      if (!firstChecked) {
        for (let index = 0; index < this.elements.length; index++) {
          const element = this.elements[index];
          if (element.el.Checked) {
            firstChecked = element.el;
            break;
          }
        }
      }

      if (!firstChecked) {
        this.value = undefined;
        this.any = false;
        return;
      }

      if (!firstChecked.Checked) firstChecked.Checked = true;

      for (let index = 0; index < this.elements.length; index++) {
        const element = this.elements[index];
        if (element.el !== firstChecked) element.el.Checked = false;
      }

      this.value = firstChecked.Value;
      this.any = true;
    }
  }

  register(el: ToggleEl) {
    const listener = UnityBridge.addEventListener(el, 'onChange', (ev, sender) => {
      this.changed(sender);
      this.onChange?.(this.value, this.all, this.any);
    });

    this.elements.push({ el, listener });

    if (this.allowMultiple && Array.isArray(this.value)) el.Checked = this.value.includes(el.Value);
    else el.Checked = this.value === el.Value;

    if (this.allowMultiple) {
      if (this.all && !el.Checked) {
        this.all = false;
        this.onChange?.(this.value, this.all, this.any);
      }

      if (!this.any && el.Checked) {
        this.any = true;
        this.onChange?.(this.value, this.all, this.any);
      }
    }
  }

  unregister(el: ToggleEl) {
    const ind = this.elements.findIndex(x => x.el === el);
    if (ind >= 0) {
      this.elements.splice(ind, 1);
      const item = this.elements[ind];
      if (item.listener) item.listener();
    }
  }

  setAll(checked?: boolean) {
    if (!this.allowMultiple && checked) throw new Error('Multiple values cannot be selected for radio groups');
    checked = !!checked;

    this.all = checked;
    this.any = checked;

    const values = [];
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      element.el.Checked = checked;
    }

    this.value = this.allowMultiple ? values : undefined;
    this.all = checked;
    this.any = checked;
    this.onChange?.(this.value, this.all, this.any);
  }
}

const ToggleGroupContext = React.createContext<ToggleGroupState>(null);

type ToggleGroupProps<T = any> = { children?: ReactNode } &
  ({
    multiple: true;
    onChange?: (val: T[], all: boolean, any: boolean) => void;
    initialValue?: T[];
    showSelectAll?: boolean;
    selectAllLabel?: ReactNode;
  } | {
    multiple?: false;
    onChange?: (val: T, all: boolean, any: boolean) => void;
    initialValue?: T;
    showSelectAll?: never;
    selectAllLabel?: never;
  });

const _ToggleGroup = React.forwardRef<ToggleGroupState, ToggleGroupProps>(
  function _ToggleGroup({ children, multiple, showSelectAll, selectAllLabel, onChange, initialValue }, ref) {
    const init = useRef(initialValue);
    const state = useMemo(() => new ToggleGroupState(multiple, init.current), [multiple, init]);
    state.onChange = useCallback((val, all, any) => {
      onChange?.(val, all, any);

      if (selectAllRef.current) {
        selectAllRef.current.Indeterminate = !!any && !all;
        selectAllRef.current.Checked = !!all;
      }
    }, [onChange]);

    const selectAllRef = useRef<ToggleEl>();

    const selectAllCallback: UGUIElements['toggle']['onChange'] = useCallback((checked, sender) => {
      state.setAll(checked);
    }, [state]);

    useImperativeHandle(ref, () => state, [state]);

    return <ToggleGroupContext.Provider value={state}>
      <view name="<ToggleGroup>" className={clsx('md-toggle-group')}>
        {!!(multiple && showSelectAll) &&
          <Toggle ref={selectAllRef} independent onChange={selectAllCallback}
            className={clsx('md-toggle-select-all', style.selectAllToggle)}>
            {selectAllLabel || 'Select All'}
          </Toggle>}

        {children}
      </view>
    </ToggleGroupContext.Provider>;
  });

export const ToggleGroup = React.memo(_ToggleGroup);


