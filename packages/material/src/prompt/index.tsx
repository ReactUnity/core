import { ReactUnity } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { Modal, ModalProps } from '../modal';
import style from './index.module.scss';

interface Props extends ModalProps, Omit<UGUIElements['input'], 'ref'> {
  title?: string;
  text?: string;
  error?: string;
  placeholder?: string;
  cancel?: string;
  submit?: string;
  submitting?: boolean;
  onClose: (result: string, value: boolean) => void;
}

export function PromptDialog({ title, text, error, placeholder, submit, submitting, cancel, onClose, open, className, ...inputProps }: Props) {
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>();

  return <Modal open={open} className={clsx('md-prompt-dialog', style.host, className)}>
    {title && <div className={clsx('md-prompt-dialog-title', style.title)}>{title}</div>}
    {text && <div className={clsx('md-prompt-dialog-text', style.text)}>{text}</div>}

    <input placeholder={placeholder} ref={inputRef} {...inputProps} />
    {error && <div className={clsx('md-prompt-dialog-error', style.error)}>{error}</div>}

    <div className={clsx('md-prompt-dialog-buttons', style.buttons)}>
      <button onClick={() => onClose(inputRef.current.Value, false)}>
        {cancel || 'Cancel'}
      </button>

      <button data-temp-disabled={submitting}>
        {submit || 'Submit'}
      </button>
    </div>
  </Modal >;
}
