import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React from 'react';
import { getElevationClass } from '../util/helpers';
import { MdBase } from '../util/types';
import style from './index.module.scss';


type ViewProps = UGUIElements['view'];
type Props = ViewProps & MdBase;

function _Card({ children, className, elevation = 1, ...props }: Props) {
  return <view name="<Card>" className={clsx(className, style.host, getElevationClass(elevation), 'mat-card')} {...props}>
    {children}
  </view>;
}

function _Content({ className, ...props }: ViewProps) {
  return <view name="<Card.Content>" className={clsx(className, style.content, 'mat-card-content')} {...props} />;
}

type CardType = typeof _Card & {
  Content: typeof _Content;
};

export const Card = React.memo(_Card) as unknown as CardType;
Card.Content = _Content;
