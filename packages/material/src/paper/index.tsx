import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React from 'react';
import { getElevationClass } from '../util/helpers';
import { MdBase } from '../util/types';
import style from './index.module.scss';


type Props = UGUIElements['view'] & MdBase;

function _Paper({ children, className, elevation, ...props }: Props) {
  return <view name="<Paper>" className={clsx(className, style.host, getElevationClass(elevation), 'md-paper')} {...props}>
    {children}
  </view>;
}

export const Paper = React.memo(_Paper);
