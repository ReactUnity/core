import { ReactUnity } from '@reactunity/renderer';
import { InputEvent, UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import { ReactNode, forwardRef, useCallback, useRef, useState } from 'react';
import { Button } from '../button';
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

export const TextField = forwardRef<ReactUnity.UGUI.InputComponent, TextFieldProps>(function TextField(
  {
    placeholder = '',
    onSelect,
    onChange,
    onValue,
    float,
    selectAllOnFocus,
    className,
    defaultValue,
    contentType,
    variant = 'filled',
    ...inputProps
  },
  ref,
) {
  const [passwordShown, setPasswordShown] = useState(false);
  variant = variant || 'filled';

  const isPassword = contentType === 'password' || contentType === 'pin';

  const focusHandler: InputEl['onSelect'] = !selectAllOnFocus
    ? onSelect
    : (ev, sender) => {
        setTimeout(() => {
          sender.Focus();
        }, 100);
        onSelect?.(ev, sender);
      };

  const realType = isPassword && passwordShown ? 'standard' : contentType;
  const fieldRef = useRef<InputFieldRef>(undefined);

  const change: InputEvent = useCallback(
    (ev, sender) => {
      const val = sender.Value;

      if (onChange && ev) onChange(ev, sender);

      fieldRef.current?.setEmpty(!val);
      onValue?.(val);
    },
    [fieldRef, onChange, onValue],
  );

  return (
    <InputField
      className={clsx(className, style.host, 'mat-text-field', style[variant])}
      variant={variant}
      placeholder={placeholder}
      float={float}
      ref={fieldRef}
      name="<TextField>"
    >
      <input
        className={clsx(style.input, 'mat-text-input', 'mat-input-field-target')}
        contentType={realType}
        ref={ref}
        placeholder={' '}
        onSelect={focusHandler}
        onChange={change}
        {...inputProps}
      />

      {isPassword && (
        <Button
          variant="icon"
          onClick={() => setPasswordShown((st) => !st)}
          className={clsx(style.passwordToggle, 'mat-text-password-toggle')}
        >
          <icon>{passwordShown ? 'visibility' : 'visibility_off'}</icon>
        </Button>
      )}
    </InputField>
  );
});
