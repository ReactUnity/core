import { ReactUnity } from "@reactunity/renderer";
import { EditorElements } from "@reactunity/renderer/editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelection } from "src/context/selection";
import style from './index.module.scss';

const stylesheets: Record<string, ReactUnity.Styling.StyleSheet> = {};

export function GlobalStyle() {
  const [show, setShow] = useState(false);

  const [savedInput, setSavedInput] = useState('');

  const selection = useSelection();

  useEffect(() => {
    if (!selection) return;

    let sheet = stylesheets[savedInput];
    if (sheet) {
      selection.Component.Context.InsertStyle(sheet);
    } else {
      sheet = stylesheets[savedInput] = selection.Component.Context.InsertStyle(savedInput);
    }

    return () => {
      if (sheet) selection.Component.Context.RemoveStyle(sheet);
    };
  }, [savedInput, selection]);

  const inputRef = useRef<ReactUnity.UIToolkit.TextFieldComponent>();

  const save: EditorElements['button']['onButtonClick'] = () => {
    setSavedInput(inputRef.current.Value);
  };

  const cancel: EditorElements['button']['onButtonClick'] = () => {
    inputRef.current.Value = savedInput;
    setShow(false);
  };

  const keyup: EditorElements['input']['onKeyDown'] = (ev) => {
    if (ev.ctrlKey &&
      (ev.keyCode === Interop.UnityEngine.KeyCode.Return ||
        ev.keyCode === Interop.UnityEngine.KeyCode.KeypadEnter)) {
      ev.PreventDefault();
      ev.StopImmediatePropagation();
      ev.StopPropagation();
      save(null);
    }
    else if (ev.keyCode === Interop.UnityEngine.KeyCode.Escape) {
      ev.PreventDefault();
      ev.StopImmediatePropagation();
      ev.StopPropagation();
      cancel(null);
    }
  };

  const closeCallback = useCallback(() => setShow(false), []);

  return <view className={style.host}>
    <button onButtonClick={() => setShow(x => !x)}>Edit Global Styles</button>

    <dialog show={show} onClose={closeCallback} title="Global Styles" className={style.dialog}>
      <scroll className={style.scroll}>
        <input className={style.input} value={savedInput} ref={inputRef} multiline onKeyUp={keyup} />
      </scroll>

      <view className={style.actions}>
        <button onButtonClick={cancel}>Cancel (Esc)</button>
        <button onButtonClick={save}>Save (Ctrl + Enter)</button>
      </view>
    </dialog>
  </view>;
}
