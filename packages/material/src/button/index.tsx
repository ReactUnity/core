import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React from 'react';
import { useRipple } from '../ripple';
import { getElevationClass } from '../util/helpers';
import { MdBase, MdInteractible } from '../util/types';
import style from './index.module.scss';


type Props = UGUIElements['button'] & MdInteractible & MdBase;

function _Button({ children, className, elevation, noRipple, onPointerDown, onPointerUp, ...props }: Props) {
  const ripple = useRipple({ onPointerDown, onPointerUp, noRipple });

  return <button name="<Button>" className={clsx(className, style.host, getElevationClass(elevation), 'md-button')}
    {...props} {...ripple}>
    {children}
  </button>;
}

export const Button = React.memo(_Button);
