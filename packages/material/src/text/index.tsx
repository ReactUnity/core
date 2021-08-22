import { ReactUnity } from '@reactunity/renderer';
import { ContentType, InputEvent, UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { forwardRef, ReactNode, useCallback, useRef, useState } from 'react';
import { InputField, InputFieldRef, InputFieldVariant } from '../input';
import style from './index.module.scss';

type InputEl = UGUIElements['input'];

export interface TextFieldProps extends Omit<InputEl, 'placeholder'> {
  float?: 'always' | 'never' | 'auto';
  selectAllOnFocus?: boolean;
  onValue?: (val: string) => void;
  placeholder?: ReactNode;
  defaultValue?: string;
  variant?: InputFieldVariant;
}

export const TextField = forwardRef<ReactUnity.UGUI.InputComponent, TextFieldProps>(
  function TextField({
    placeholder = '',
    onSelect,
    onChange,
    onValue,
    float,
    selectAllOnFocus,
    className,
    defaultValue,
    contentType,
    variant,
    ...inputProps
  }, ref) {
    const [passwordShown, setPasswordShown] = useState(false);
    variant = variant || 'standard';

    const isPassword = contentType === 'password';

    const focusHandler: InputEl['onSelect'] = !selectAllOnFocus ? onSelect : (ev, sender) => {
      setTimeout(() => {
        sender.Focus();
      }, 100);
      onSelect?.(ev, sender);
    };

    const realType = (isPassword && passwordShown) ? 'standard' as ContentType : contentType;
    const fieldRef = useRef<InputFieldRef>();


    const change: InputEvent = useCallback((ev, sender) => {
      const val = sender.Value;

      if (onChange && ev) onChange(ev, sender);

      fieldRef.current?.setEmpty(!val);
      onValue?.(val);
    }, [fieldRef, onChange, onValue]);

    return <InputField className={clsx(className, style.host, 'mat-text-field', style[variant])} variant={variant}
      placeholder={placeholder} float={float} ref={fieldRef} name="<TextField>">
      <input className={clsx(style.input, 'mat-text-input', 'mat-input-field-target')} contentType={realType} ref={ref}
        placeholder={' '} onSelect={focusHandler} onChange={change} {...inputProps} />

      {isPassword &&
        <button className={clsx(style.passwordToggle, 'mat-text-password-toggle')} onClick={() => setPasswordShown(st => !st)}>
          {passwordShown ?
            <icon>visibility</icon> :
            <icon>visibility_off</icon>}
        </button>}
    </InputField>;
  });
