import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { ReactNode, useRef } from 'react';
import { useRipple } from '../ripple';
import { MdInteractible } from '../util/types';
import style from './index.module.scss';

export type ToggleVariant = 'checkbox' | 'radio';
type Props = Omit<UGUIElements['toggle'], 'children'>
  & MdInteractible
  & {
    variant?: ToggleVariant;
    children?: ReactNode;
  };

function _Toggle({ children, className, noRipple, onPointerDown, onPointerUp, variant, ...props }: Props) {
  const toggleRef = useRef<ReactUnity.UGUI.ToggleComponent>();
  const ripple = useRipple({ onPointerDown, onPointerUp, noRipple, centered: true, target: toggleRef });

  variant = variant || 'checkbox';

  return <label className={clsx(className, style.label, 'md-toggle-label', style[variant], 'md-variant-' + variant)} {...ripple}>
    <toggle name="<Toggle>" ref={toggleRef}
      className={clsx(style.toggle, 'md-toggle')}
      {...props}  {...ripple} />

    {!!children && <view className={clsx(style.labelContent, 'md-toggle-label-content')}>{children}</view>}
  </label>;
}

export const Toggle = React.memo(_Toggle);
