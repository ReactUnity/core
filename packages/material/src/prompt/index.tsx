import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useRef } from 'react';
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

export function PromptDialog({ title, text, error, placeholder, submit, submitting, cancel, onClose, open, className, backdropClose, onClickBackdrop, ...inputProps }: Props) {
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>();

  const clickBackdrop = () => {
    if (backdropClose) onClose(null, false);
    if (onClickBackdrop) onClickBackdrop();
  };

  return <Modal open={open} className={clsx('md-prompt-dialog', style.host, className)} onClickBackdrop={clickBackdrop}>
    {title && <div className={clsx('md-prompt-dialog-title', style.title)}>{title}</div>}
    {text && <div className={clsx('md-prompt-dialog-text', style.text)}>{text}</div>}

    <TextField className={clsx('md-prompt-dialog-input', style.input)}
      placeholder={placeholder} ref={inputRef} {...inputProps} />

    {error && <div className={clsx('md-prompt-dialog-error', style.error)}>{error}</div>}

    <div className={clsx('md-prompt-dialog-buttons', style.buttons)}>
      <button onClick={() => onClose(inputRef.current.Value, false)}>
        {cancel || 'Cancel'}
      </button>

      <button onClick={() => onClose(inputRef.current.Value, true)} data-temp-disabled={submitting}>
        {submit || 'Submit'}
      </button>
    </div>
  </Modal >;
}
