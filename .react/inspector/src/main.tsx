import { ReactUnity, Renderer } from '@reactunity/renderer/editor';
import clsx from 'clsx';
import * as React from 'react';
import { useEffect, useState } from 'react';
import style from './index.module.scss';
import { CornerLabels, StyleProp, StylePropGroup, StylePropPart, styleProps } from './props';

type RC = ReactUnity.Layout.ReactElement;

const Window = Globals.Window;
const Inspector = Globals.Inspector;

function getSelection() {
  if (Window) {
    const activeObject = UnityEditor.Selection.activeGameObject;
    if (!activeObject) return null;
    return activeObject.GetComponent('ReactElement') as RC;
  } else if (Inspector) {
    return Inspector.target as RC;
  }

  return null;
}

function App() {
  const [selection, setSelection] = useState<RC>(getSelection());

  useEffect(() => {
    if (Window) {
      const removeSelectionChange = Window.AddSelectionChange(() => setSelection(getSelection()));
      const removeStateChange = Window.AddPlayModeStateChange(() => setSelection(getSelection()));
      return () => {
        removeSelectionChange();
        removeStateChange();
      };
    }
  }, []);

  return <view className={style.host}>
    {selection ?
      <Styles element={selection} /> :
      'Select an element to edit its styles'}
  </view>;
}

function Styles({ element }: { element: RC }) {
  const [showAll, setShowAll] = useState(true);

  return <scroll className={clsx(style.styles, showAll && style.showAll)}>
    <toggle label="Show All" value={showAll} onChange={ev => setShowAll(ev.newValue)} className={style.showAllButton} />

    {styleProps.map((x, i) => <Group group={x} element={element} key={i} />)}
  </scroll>;
}

function Group({ group, element, className }: { group: StylePropGroup, element: RC, className?: string }) {

  return <view className={clsx(style.group, className)}>
    {!!group.label && <view className={style.groupHeader}>{group.label}</view>}

    {group.props.map(x => x.arrangement === 'rect' || x.arrangement === 'corner' ?
      <StylePropRect element={element} prop={x} key={x.name} /> :
      <StylePropRow element={element} prop={x} key={x.name} />)}
  </view>;
}

function StylePropRow({ prop, element, className }: { prop: StyleProp, element: RC, className?: string }) {
  const cmp = element.Component;

  const changed = () => {
    cmp.ResolveStyle(true);
    if (prop.source === 'layout') {
      cmp.ScheduleLayout();
      cmp.ApplyLayoutStyles();
    }
    setRender(x => x + 1);
  }

  const changeStyle = (name: string, value: { newValue: any }) => {
    if (prop.setter) {
      var res = prop.setter(value.newValue, element);
      if (res !== undefined) cmp.Style[name] = res;
    }
    else cmp.Style[name] = value.newValue;
    changed();
  };

  const [, setRender] = useState(0);

  if (!prop.component) return null;

  const val = prop.source === 'layout' ? element.Layout[prop.name] : element.Style[prop.name];
  const gval = prop.getter ? prop.getter(val, element) : val;
  const exists = prop.source === 'layout' ? cmp.Style.ContainsKey(prop.name) : element.Style.HasValue(prop.name);
  const changeExists = () => {
    cmp.Style.Remove(prop.name);
    changed();
  };

  return <view className={clsx(className, style.row, exists && style.exists)}>
    <button onButtonClick={changeExists} className={style.removeButton}>
      X
    </button>

    <prop.component className={style.rowContent} value={gval} label={prop.label ?? prop.name} onChange={(val) => changeStyle(prop.name, val)} />
  </view>;
}

function StylePropRect({ prop, element }: { prop: StyleProp, element: RC }) {
  const partName = typeof prop.partTemplate === 'string' ? prop.partTemplate.replace('{part}', '') : prop.partTemplate('');
  const isCorner = prop.arrangement === 'corner';

  return <view className={clsx(style.propRectContainer)}>
    {partName ?
      <StylePropRow prop={prop} element={element} className={clsx(style.rectHead, 'react-unity__field__inline', 'react-unity__field__no-grow')} /> :
      <view style={{ flexDirection: 'row' }} className={style.rectHead}>
        <button className={style.removeButton} style={{ visibility: 'Hidden' }}>X</button>
        {prop.label ?? prop.name}
      </view>}

    {!isCorner ?
      <view className={clsx(style.propRect)}>
        <view className={style.propRectRow}>
          <StylePropRectPart element={element} prop={prop} part={'top'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart element={element} prop={prop} part={'left'} />
          <StylePropRectPart element={element} prop={prop} part={'right'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart element={element} prop={prop} part={'bottom'} />
        </view>
      </view> :
      <view className={clsx(style.propRect, style.corner)}>
        <view className={style.propRectRow}>
          <StylePropRectPart element={element} prop={prop} part={'left'} />
          <StylePropRectPart element={element} prop={prop} part={'top'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart element={element} prop={prop} part={'bottom'} />
          <StylePropRectPart element={element} prop={prop} part={'right'} />
        </view>
      </view>}
  </view>;
}


function StylePropRectPart({ prop, part, element }: { prop: StyleProp, element: RC, part: StylePropPart }) {
  const partName = !part ? prop.name :
    typeof prop.partTemplate === 'string' ? prop.partTemplate.replace('{part}', part) : prop.partTemplate(part);

  const isCorner = prop.arrangement === 'corner';
  const label = part ? (isCorner ? CornerLabels[part] : part[0].toUpperCase()) : prop.label;
  const partProp: StyleProp = { ...prop, partlessName: prop.name, name: partName, label };

  return <>
    <StylePropRow prop={partProp} element={element}
      className={clsx(style.rectPart, style['part-' + part], 'react-unity__field__inline', isCorner && style.corner)} />
  </>;
}

Renderer.render(<App />, RootContainer, null);


