import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { useRipple } from '../ripple';
import { getElevationClass } from '../util/helpers';
import { MdBase, MdInteractible } from '../util/types';
import style from './index.module.scss';

export type ButtonVariant = 'text' | 'outlined' | 'filled' | 'icon';

type Props = UGUIElements['button'] & MdInteractible & MdBase & {
  variant?: ButtonVariant;
};

const _Button = forwardRef<ReactUnity.UGUI.ButtonComponent, Props>(
  function _Button({ children, className, elevation, noRipple, onPointerDown, onPointerUp, variant, ...props }, ref) {
    variant = variant || 'text';
    const ripple = useRipple({ onPointerDown, onPointerUp, noRipple, centered: variant === 'icon' });

    return <button name="<Button>" {...props} {...ripple} ref={ref}
      className={clsx(className, style.host, getElevationClass(elevation), 'md-button', style[variant], 'md-variant-' + variant)}>
      {children}
    </button>;
  });

export const Button = React.memo(_Button);
