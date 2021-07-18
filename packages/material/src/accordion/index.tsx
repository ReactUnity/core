import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/index.scss';
import { getElevationClass, getOnlyChildOfType } from '../util/helpers';
import { MdBase } from '../util/types';
import style from './index.module.scss';

type ViewProps = UGUIElements['view'];
type Props = ViewProps & MdBase;

function _Accordion({ children, className, elevation = 1, ...props }: Props) {
  const summary = getOnlyChildOfType(children, _Summary);
  const content = getOnlyChildOfType(children, _Content);

  const [opened, setOpened] = useState(false);

  const expanderRef = useRef<ReactUnity.UGUI.UGUIComponent>();
  const wrapperRef = useRef<ReactUnity.UGUI.UGUIComponent>();

  const onResize = (ev, sender: ReactUnity.UGUI.UGUIComponent) => {
    if (!expanderRef.current) return;
    expanderRef.current.Style.Set('height', sender.RectTransform.rect.height);
    expanderRef.current.Style.Set('opacity', sender.RectTransform.rect.height > 0 ? 1 : 0);
  };

  useEffect(() => {
    if (!expanderRef.current || !wrapperRef.current) return;
    if (!opened) expanderRef.current.Style.Set('height', 0);
    else expanderRef.current.Style.Set('height', wrapperRef.current.RectTransform.rect.height);
  }, [opened]);

  return <view name="<Accordion>" className={clsx(className, style.host, getElevationClass(elevation), 'md-accordion')} {...props}>
    <view name="<AccordionHeader>" className={clsx(style.header, 'md-accordion-header')} onPointerClick={() => setOpened(x => !x)}>
      {summary}
    </view>

    <view className={clsx(style.expander, 'md-accordion-expander')} ref={expanderRef}>
      <view {...{ onResize }} ref={wrapperRef} className={style.contentWrapper}>
        {content}
      </view>
    </view>
  </view>;
}

function _Summary({ className, ...props }: ViewProps) {
  return <view name="<Accordion.Summary>" className={clsx(className, style.summary, 'md-accordion-summary')} {...props} />;
}

function _Content({ className, ...props }: ViewProps) {
  return <view name="<Accordion.Content>" className={clsx(className, style.content, 'md-accordion-content')} {...props} />;
}

type AccordionType = typeof _Accordion & {
  Summary: typeof _Summary;
  Content: typeof _Content;
};

export const Accordion = React.memo(_Accordion) as unknown as AccordionType;
Accordion.Summary = _Summary;
Accordion.Content = _Content;
