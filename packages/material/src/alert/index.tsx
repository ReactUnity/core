import clsx from 'clsx';
import React from 'react';
import { Modal, ModalProps } from '../modal';
import style from './index.module.scss';

interface Props extends ModalProps {
  title?: string;
  text?: string;
  button?: string;
  backdropClose?: boolean;
  onClose: () => void;
}

export function AlertDialog({ title, text, button = 'Ok', onClose, onClickBackdrop, backdropClose, ...props }: Props) {
  const clickBackdrop = () => {
    if (backdropClose) onClose();
    if (onClickBackdrop) onClickBackdrop();
  };

  return <Modal {...props} className={clsx('md-alert-dialog', style.host, props.className)} onClickBackdrop={clickBackdrop}>
    {title && <div className={clsx('md-alert-dialog-title', style.title)}>{title}</div>}
    {text && <div className={clsx('md-alert-dialog-text', style.text)}>{text}</div>}
    {button &&
      <div className={clsx('md-alert-dialog-buttons', style.buttons)}>
        <button className={clsx(style.button)} onClick={() => onClose()}>
          {button}
        </button>
      </div>}
  </Modal>;
}
