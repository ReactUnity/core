import { ReactUnity, Style } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { getElevationClass, getOnlyChildOfType } from '../util/helpers';
import { MdBase } from '../util/types';
import style from './index.module.scss';

type ViewProps = UGUIElements['view'];
type Props = ViewProps & MdBase;

const expanderBaseStyle: Style = { height: 0 };

function _Accordion({ children, className, elevation = 1, ...props }: Props) {
  const summary = getOnlyChildOfType(children, _Summary);
  const content = getOnlyChildOfType(children, _Content);

  const [opened, setOpened] = useState(false);

  const expanderRef = useRef<ReactUnity.UGUI.UGUIComponent>(undefined);
  const wrapperRef = useRef<ReactUnity.UGUI.UGUIComponent>(undefined);

  const onResize = (ev, sender: ReactUnity.UGUI.UGUIComponent) => {
    if (!expanderRef.current) return;
    if (opened) {
      expanderRef.current.Style.Set('height', sender.RectTransform.rect.height);
    }
  };

  useEffect(() => {
    if (!expanderRef.current || !wrapperRef.current) return;
    expanderRef.current.Style.Set('height', opened ? wrapperRef.current.RectTransform.rect.height : 0);
    expanderRef.current.Style.Set('opacity', opened ? 1 : 0);
  }, [opened]);

  return (
    <view
      name="<Accordion>"
      className={clsx(className, style.host, opened && [style.expanded, 'mat-expanded'], getElevationClass(elevation), 'mat-accordion')}
      {...props}
    >
      <view name="<AccordionHeader>" className={clsx(style.header, 'mat-accordion-header')} onPointerClick={() => setOpened((x) => !x)}>
        {summary}

        <icon>expand_more</icon>
      </view>

      <view className={clsx(style.expander, 'mat-accordion-expander')} ref={expanderRef} style={expanderBaseStyle}>
        <view onResize={onResize} ref={wrapperRef} className={style.contentWrapper}>
          {content}
        </view>
      </view>
    </view>
  );
}

function _Summary({ className, ...props }: ViewProps) {
  return <view name="<Accordion.Summary>" className={clsx(className, style.summary, 'mat-accordion-summary')} {...props} />;
}

function _Content({ className, ...props }: ViewProps) {
  return <view name="<Accordion.Content>" className={clsx(className, style.content, 'mat-accordion-content')} {...props} />;
}

type AccordionType = typeof _Accordion & {
  Summary: typeof _Summary;
  Content: typeof _Content;
};

export const Accordion = React.memo(_Accordion) as unknown as AccordionType;
Accordion.Summary = _Summary;
Accordion.Content = _Content;
