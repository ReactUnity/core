import { EditorElements } from '@reactunity/renderer/editor';
import { useCallback, useMemo, useState } from 'react';
import { useSelection } from 'src/context/selection';
import { useStyleContext } from 'src/context/style';
import style from './index.module.scss';

const savedClasses: Record<string, string[]> = {};

export function Classes() {
  const selection = useSelection()?.Component;
  const ctx = useStyleContext();
  const [render, setRender] = useState(0);

  const submit: EditorElements['input']['onKeyDown'] = useCallback(
    (ev, sender) => {
      if (ev.keyCode === Interop.UnityEngine.KeyCode.Return || ev.keyCode === Interop.UnityEngine.KeyCode.KeypadEnter) {
        selection.ClassList.Add(sender.Value);
        sender.SetValueWithoutNotify('');
        setRender((x) => x + 1);
      }
    },
    [selection],
  );

  const toggled: EditorElements['toggle']['onChange'] = useCallback(
    (ev, sender) => {
      selection.ClassList.Toggle(sender.Data['id'], sender.Value);
      setRender((x) => x + 1);
    },
    [selection],
  );

  const classes = useMemo(() => {
    if (!selection) return null;
    void render;
    const dataId = ctx.getElementId(selection);
    const saved = new Set(savedClasses[dataId] || []);

    const list = selection.ClassList.Name.split(' ');
    const len = list.length;

    for (let index = 0; index < len; index++) {
      const element = list[index];
      saved.add(element);
    }

    return (savedClasses[dataId] = Array.from(saved).filter((x) => x));
  }, [selection, ctx, render]);

  if (!selection) return;

  return (
    <view className={style.host}>
      <input label="Add class" onKeyDown={submit} />

      <view className={style.classes}>
        {classes.map((x) => (
          <toggle label={x} key={x} data-id={x} onChange={toggled} value={selection.ClassList.Contains(x)} />
        ))}
      </view>
    </view>
  );
}
