import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { Button } from '../button';
import { Modal, ModalProps } from '../modal';
import { TextField } from '../text';
import style from './index.module.scss';

interface Props extends ModalProps, Omit<UGUIElements['input'], 'ref'> {
  title?: string;
  text?: string;
  error?: string;
  placeholder?: string;
  cancel?: string;
  submit?: string;
  submitting?: boolean;
  backdropClose?: boolean;
  onClose: (result: string, value: boolean) => void;
}

export function PromptDialog({
  title,
  text,
  error,
  placeholder,
  submit,
  submitting,
  cancel,
  onClose,
  open,
  className,
  backdropClose,
  onClickBackdrop,
  ...inputProps
}: Props) {
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>(undefined);

  const clickBackdrop = () => {
    if (backdropClose) onClose(null, false);
    if (onClickBackdrop) onClickBackdrop();
  };

  return (
    <Modal open={open} className={clsx('mat-prompt-dialog', style.host, className)} onClickBackdrop={clickBackdrop}>
      {title && <div className={clsx('mat-prompt-dialog-title', style.title)}>{title}</div>}
      {text && <div className={clsx('mat-prompt-dialog-text', style.text)}>{text}</div>}

      <TextField className={clsx('mat-prompt-dialog-input', style.input)} placeholder={placeholder} ref={inputRef} {...inputProps} />

      {error && <div className={clsx('mat-prompt-dialog-error', style.error)}>{error}</div>}

      <div className={clsx('mat-prompt-dialog-buttons', style.buttons)}>
        <Button onClick={() => onClose(inputRef.current.Value, false)}>{cancel || 'Cancel'}</Button>

        <Button onClick={() => onClose(inputRef.current.Value, true)} data-temp-disabled={submitting}>
          {submit || 'Submit'}
        </Button>
      </div>
    </Modal>
  );
}
