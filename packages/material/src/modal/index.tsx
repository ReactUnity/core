import { ReactUnity } from '@reactunity/renderer';
import { Events } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import useRootClass from '../util/hooks/use-root-class';
import style from './index.module.scss';

interface Props {
  open: boolean;
  onClickBackdrop?: () => void;
  onEscape?: () => void;
  onCloseButton?: () => void;
  children: React.ReactNode;
  className?: string;
}

export type ModalProps = Omit<Props, 'children'>;

export function Modal({ open, children, className, onClickBackdrop, onEscape, onCloseButton }: Props) {
  useRootClass(open && [style.body, 'mat-modal-open']);

  const portalRef = useRef<ReactUnity.UGUI.PortalComponent>();
  const initialOpen = useRef(open);
  const openedOnce = useRef(open);

  const click: Events['onPointerClick'] = (ev, sender) => {
    if (!ev.used) onClickBackdrop?.();
  };

  const clickContent: Events['onPointerClick'] = (ev, sender) => {
    ev.Use();
  };

  const keyup: Events['onKeyDown'] = (ev) => {
    if (ev.key === 'Escape') onEscape?.();
  };

  const onAnimationEnd: Events['onAnimationEnd'] = (ev) => {
    if (ev.AnimationName === style.closeAnim && portalRef.current) {
      portalRef.current.SetProperty('active', false);
    }
  };

  useEffect(() => {
    openedOnce.current = openedOnce.current || open;
    if (open && portalRef.current)
      portalRef.current.SetProperty('active', !!open);
  }, [open]);

  return <portal className={clsx(style.host, 'mat-modal', className, open && style.opened, !open && openedOnce.current && style.closed)}
    onPointerClick={onClickBackdrop ? click : null} onKeyDown={onEscape ? keyup : null} active={initialOpen.current}
    onAnimationEnd={onAnimationEnd} ref={portalRef}>
    <view className={clsx(style.content, 'mat-modal-content')} onPointerClick={clickContent}>
      {children}

      {onCloseButton &&
        <button className={style.close} onClick={onCloseButton}>
          <icon>close</icon>
        </button>}
    </view>
  </portal>;
}
