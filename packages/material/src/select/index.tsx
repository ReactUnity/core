import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import {
  Fragment,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Toggle } from '..';
import { Button } from '../button';
import { InputField, InputFieldRef, InputFieldVariant } from '../input';
import { getElevationClass } from '../util/helpers';
import { useAutoRef } from '../util/hooks/use-auto-ref';
import { SelectionElement, SelectionState } from '../util/selection';
import style from './index.module.scss';

interface SelectSelectionElement extends SelectionElement {
  getTemplate(): ReactNode;
}

const SelectContext = createContext<SelectionState<any, SelectSelectionElement>>(null);

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
} & (
  | {
      multiple: true;
      onChange?: (val: T[], all: boolean, any: boolean) => void;
      initialValue?: T[];
    }
  | {
      multiple?: false;
      onChange?: (val: T, all: boolean, any: boolean) => void;
      initialValue?: T;
    }
) &
  UGUIElements['button'];

function _Select<T = any>({
  keepOpen = 'auto',
  onChange,
  name,
  children,
  initialValue,
  multiple,
  separator,
  chips,
  variant,
  placeholder,
  float,
  className,
  hideCaret,
  ...otherProps
}: SelectProps<T>): React.ReactElement {
  const init = useRef(initialValue);
  const selectAllRef = useRef<ToggleEl>(undefined);
  const fieldRef = useRef<InputFieldRef>(undefined);
  const shouldKeepOpen = keepOpen === 'auto' ? multiple : !!keepOpen;

  const onChangeRef = useAutoRef(onChange);
  const shouldKeepOpenRef = useAutoRef(shouldKeepOpen);

  const state = useMemo(() => new SelectionState<T, SelectSelectionElement>(!!multiple, init.current), [multiple, init]);
  const [selectedElements, setSelectedElements] = useState(state.getSelectedElements());

  useLayoutEffect(() => {
    state.onChange = (val, all, any) => {
      onChangeRef.current?.(val as any, all, any);

      if (selectAllRef.current) {
        selectAllRef.current.Indeterminate = !!any && !all;
        selectAllRef.current.Checked = !!all;
      }

      if (!shouldKeepOpenRef.current) {
        setOpened(false);
      }

      fieldRef.current?.setEmpty(!any);
    };

    state.onUpdate = (st) => {
      const sel = st.getSelectedElements();
      setSelectedElements(sel);
    };
  }, []);

  const [opened, setOpened] = useState(false);

  const toggle = useCallback(() => setOpened((st) => !st), [setOpened]);
  const close = useCallback(() => setOpened(false), [setOpened]);

  if (typeof separator === 'undefined' && !chips) {
    separator = <text className={style.defaultSeparator}>,</text>;
  }

  const setFieldRef: (val: InputFieldRef) => void = useCallback(
    (val) => {
      fieldRef.current = val;
      fieldRef.current?.setEmpty(multiple ? (init.current as T[])?.length === 0 : typeof init.current === 'undefined');
    },
    [multiple],
  );

  return (
    <InputField
      className={clsx(
        className,
        style.host,
        'mat-select-field',
        style[variant],
        chips && style.chips,
        opened && [style.opened, 'mat-select-opened'],
      )}
      variant={variant}
      placeholder={placeholder}
      float={float}
      name={name || '<SelectField>'}
      ref={setFieldRef}
    >
      <button name="<Select>" onClick={toggle} className={clsx(style.trigger, 'mat-input-field-target')} {...otherProps}>
        <view className={style.triggerContent}>
          {selectedElements.map((x, i) => (
            <Fragment key={i}>
              {i > 0 && separator}
              <view className={style.triggerPart}>{x.getTemplate()}</view>
            </Fragment>
          ))}
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

      {!hideCaret && <icon className={clsx(style.caret, 'mat-select-caret')}>{'keyboard_arrow_down'}</icon>}
    </InputField>
  );
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
  const childRef = useAutoRef(children);
  const getTemplateRef = useRef<() => ReactNode>(() => triggerTemplate ?? childRef.current ?? children);

  const shouldShowToggle = showToggle === 'auto' ? !!ctx?.allowMultiple : !!showToggle;

  useEffect(() => {
    getTemplateRef.current = () => triggerTemplate ?? childRef.current;
    ctx?.triggerUpdate();
  }, [triggerTemplate, ctx]);

  const selectionRef = useMemo<SelectSelectionElement>(
    () => ({
      get selected() {
        return selectedRef.current;
      },
      set selected(val: boolean) {
        selectedRef.current = val;
        setSelected(val);
      },
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
    }),
    [value, setSelected, selectedRef],
  );

  useLayoutEffect(() => {
    return ctx?.register(selectionRef);
  }, [ctx, selectionRef]);

  const onClick = useCallback<UGUIElements['button']['onClick']>(() => {
    const newValue = !selectedRef.current;
    selectedRef.current = newValue;
    setSelected(newValue);

    for (let index = 0; index < onChangeRef.current.length; index++) {
      const cb = onChangeRef.current[index];
      cb();
    }
  }, [setSelected]);

  return (
    <Button
      onClick={onClick}
      variant="text"
      className={clsx(style.option, 'mat-select-option', selected && ['mat-select-option-selected', style.selected], className)}
    >
      {shouldShowToggle && (
        <Toggle
          className={clsx(style.toggle, 'mat-select-option-toggle')}
          type={ctx.allowMultiple ? 'checkbox' : 'radio'}
          checked={selected}
          independent
        />
      )}
      {children}
    </Button>
  );
}

type SelectType = typeof _Select & {
  Option: typeof _Option;
};

export const Select = memo(_Select) as unknown as SelectType;
Select.Option = _Option;
