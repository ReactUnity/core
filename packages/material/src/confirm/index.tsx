import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Button } from '../button';
import { Modal, ModalProps } from '../modal';
import style from './index.module.scss';

interface Props<T> extends ModalProps {
  title?: string;
  text?: string;
  error?: string;
  submitting?: boolean;
  yes?: string;
  no?: string;
  buttons?: { value: T, text: string }[];
  backdropClose?: boolean;
  onClose: (value: T) => void;
}

export function ConfirmDialog<T = boolean>({ title, text, buttons, error, submitting, yes, no, onClose, backdropClose, onClickBackdrop, ...props }: Props<T>) {
  buttons = useMemo(() => buttons ?? [
    no == null && { value: false as any, text: no || 'No' },
    yes == null && { value: true as any, text: yes || 'Yes' },
  ].filter(x => x),
    [buttons, yes, no]);

  const clickBackdrop = () => {
    if (backdropClose) onClose(null);
    if (onClickBackdrop) onClickBackdrop();
  };

  return <Modal {...props} className={clsx('mat-confirm-dialog', style.host, props.className)} onClickBackdrop={clickBackdrop}>
    {title && <div className={clsx('mat-confirm-dialog-title', style.title)}>{title}</div>}
    {text && <div className={clsx('mat-confirm-dialog-text', style.text)}>{text}</div>}

    {error && <div className={clsx('mat-modal-dialog-error', style.error)}>{error}</div>}

    {buttons?.length > 0 &&
      <div className={clsx('mat-confirm-dialog-buttons', style.buttons)}>
        {buttons.map((btn, ind) =>
          <Button key={ind} className={clsx(style.button)} onClick={() => onClose(btn.value)} data-temp-disabled={submitting}>
            {btn.text}
          </Button>)}
      </div>}
  </Modal>;
}
