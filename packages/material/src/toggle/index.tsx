import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useContext, useImperativeHandle, useLayoutEffect, useMemo, useRef } from 'react';
import { useRipple } from '../ripple';
import { SelectionElement, SelectionState } from '../util/selection';
import { MdInteractible } from '../util/types';
import style from './index.module.scss';

type ToggleEl = ReactUnity.UGUI.ToggleComponent;

export type ToggleType = 'checkbox' | 'radio';
export type ToggleVariant = 'standard' | 'filled' | 'switch';
type Props = Omit<UGUIElements['toggle'], 'children'>
  & MdInteractible
  & {
    type?: ToggleType;
    variant?: ToggleVariant;
    children?: ReactNode;
    independent?: boolean;
  };

const _Toggle = React.forwardRef<ToggleEl, Props>(
  function _Toggle({ children, className, noRipple, onPointerDown, onPointerUp, type, variant, independent, ...props }, ref) {
    const toggleRef = useRef<ToggleEl>();
    const ringRef = useRef<ReactUnity.UGUI.UGUIComponent>();
    const ripple = useRipple({ onPointerDown, onPointerUp, noRipple, centered: true, target: ringRef });

    let ctx = useContext(ToggleGroupContext);
    if (independent) ctx = null;
    type = type || (ctx && !ctx.allowMultiple ? 'radio' : 'checkbox');

    const selectionRef = useMemo<SelectionElement>(() => ({
      get selected() { return toggleRef.current.Checked; },
      set selected(val: boolean) { toggleRef.current.Checked = val; },
      get value() { return toggleRef.current.Value; },
      addOnChange: (callback) => {
        return UnityBridge.addEventListener(toggleRef.current, 'onChange', () => {
          callback?.();
        });
      },
    }), []);

    const innerRef = useCallback((val: ToggleEl) => {
      toggleRef.current = val;

      if (typeof ref === 'function') ref(val);
      else if (ref) ref.current = val;

      if (ctx) {
        if (val) ctx.register(selectionRef);
        else ctx.unregister(selectionRef);
      }
    }, [ctx, ref, selectionRef]);

    const NativeToggle = 'toggle' as any;

    return <label className={clsx(className, style.label, 'mat-toggle-label', style[type], 'mat-toggle-' + type, 'mat-variant-' + variant)} {...ripple}>
      <NativeToggle name="<Toggle>" ref={innerRef} {...ripple}
        className={clsx(style.toggle, 'mat-toggle')}
        {...props}>
        <view className={clsx(style.ring, 'mat-toggle-ring')} ref={ringRef} />
      </NativeToggle>

      {!!children && <view className={clsx(style.labelContent, 'mat-toggle-label-content')}>{children}</view>}
    </label>;
  });

export const Toggle = React.memo(_Toggle);


const ToggleGroupContext = React.createContext<SelectionState>(null);

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

const _ToggleGroup = React.forwardRef<SelectionState, ToggleGroupProps>(
  function _ToggleGroup({ children, multiple, showSelectAll, selectAllLabel, onChange, initialValue }, ref) {
    const init = useRef(initialValue);
    const selectAllRef = useRef<ToggleEl>();

    const state = useMemo(() => new SelectionState(multiple, init.current), [multiple, init]);

    useLayoutEffect(() => {
      state.onChange = (val, all, any) => {
        onChange?.(val, all, any);

        if (selectAllRef.current) {
          selectAllRef.current.Indeterminate = !!any && !all;
          selectAllRef.current.Checked = !!all;
        }
      };
    }, [onChange]);

    const selectAllCallback: UGUIElements['toggle']['onChange'] = useCallback((checked, sender) => {
      state.setAll(checked);
    }, [state]);

    useImperativeHandle(ref, () => state, [state]);

    return <ToggleGroupContext.Provider value={state}>
      <view name="<ToggleGroup>" className={clsx('mat-toggle-group')}>
        {!!(multiple && showSelectAll) &&
          <Toggle ref={selectAllRef} independent onChange={selectAllCallback}
            className={clsx('mat-toggle-select-all', style.selectAllToggle)}>
            {selectAllLabel || 'Select All'}
          </Toggle>}

        {children}
      </view>
    </ToggleGroupContext.Provider>;
  });

export const ToggleGroup = React.memo(_ToggleGroup);


