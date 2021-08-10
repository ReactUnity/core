import { ReactUnity, Renderer } from '@reactunity/renderer';
import clsx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import { CornerLabels, StyleProp, StylePropGroup, StylePropPart, styleProps } from '../common/props';
import { SelectionProvider, useSelection } from '../context/selection';
import { StyleContext, useStyleContext } from '../context/style';
import style from './index.module.scss';

function App() {
  const selection = useSelection();
  return <view className={style.host}>
    {selection ?
      <Styles /> :
      <NotSelectedView />}
  </view>;
}

function NotSelectedView() {
  return <view>
    <image source="url(resource:ReactUnity/editor/logo)" className={style.logo}></image>

    <view>Select an element in the scene to edit its styles</view>
  </view>;
}

function Styles() {
  const [showAll, setShowAll] = useState(true);

  return <scroll className={clsx(style.styles, showAll && style.showAll)}>
    <toggle label="Show All" value={showAll} onChange={ev => setShowAll(ev.newValue)} className={style.showAllButton} />

    {styleProps.map((x, i) => <Group group={x} key={i} />)}
  </scroll>;
}

function Group({ group, className }: { group: StylePropGroup, className?: string }) {
  return <view className={clsx(style.group, className)}>
    {!!group.label && <view className={style.groupHeader}>{group.label}</view>}

    {group.props.map(x => x.arrangement === 'rect' || x.arrangement === 'corner' ?
      <StylePropRect prop={x} key={x.name} /> :
      <StylePropRow prop={x} key={x.name} />)}
  </view>;
}

function StylePropRow({ prop, className }: { prop: StyleProp, className?: string }) {
  const element = useSelection();
  const cmp = element.Component as unknown as ReactUnity.IReactComponent;

  const ctx = useStyleContext();
  const styles = ctx.getStyles(cmp);

  const changedDebounce = React.useRef<any>();

  const changed = (debounce: number) => {
    if (changedDebounce.current != null) {
      clearTimeout(changedDebounce.current);
      changedDebounce.current = null;
    }

    changedDebounce.current = setTimeout(() => {
      changedDebounce.current = null;

      cmp.ResolveStyle(true);
      if (prop.source === 'layout') {
        cmp.ApplyLayoutStyles();
      }
      setRender(x => x + 1);
    }, debounce);
  }

  const changeStyle = (name: string, value: { newValue: any }) => {
    if (prop.setter) {
      var res = prop.setter(value.newValue, element);
      if (res !== undefined) ctx.setProp(cmp, name, res);
    }
    else ctx.setProp(cmp, name, value.newValue);
    changed(500);
  };

  const [, setRender] = useState(0);

  if (!prop.component) return null;

  const val = prop.source === 'layout' ? element.Layout[prop.name] : cmp.ComputedStyle[prop.name];
  const gval = (prop.getter ? prop.getter(val, element) : val) || null;
  const exists = prop.name in styles;
  const removeStyle = () => {
    ctx.removeProp(cmp, prop.name);
    changed(0);
  };

  return <view className={clsx(className, style.row, exists && style.exists)}>
    <button onButtonClick={removeStyle} className={style.removeButton}>
      X
    </button>

    <prop.component className={style.rowContent} value={gval} label={prop.label ?? prop.name} onChange={(val) => changeStyle(prop.name, val)} />
  </view>;
}

function StylePropRect({ prop }: { prop: StyleProp }) {
  const element = useSelection();
  const partName = typeof prop.partTemplate === 'string' ? prop.partTemplate.replace('{part}', '') : prop.partTemplate('');
  const isCorner = prop.arrangement === 'corner';

  return <view className={clsx(style.propRectContainer)}>
    {partName ?
      <StylePropRow prop={prop} className={clsx(style.rectHead, 'react-unity__field__inline', 'react-unity__field__no-grow')} /> :
      <view style={{ flexDirection: 'row' }} className={style.rectHead}>
        <button className={style.removeButton} style={{ visibility: 'hidden' }}>X</button>
        {prop.label ?? prop.name}
      </view>}

    {!isCorner ?
      <view className={clsx(style.propRect)}>
        <view className={style.propRectRow}>
          <StylePropRectPart prop={prop} part={'top'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart prop={prop} part={'left'} />
          <StylePropRectPart prop={prop} part={'right'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart prop={prop} part={'bottom'} />
        </view>
      </view> :
      <view className={clsx(style.propRect, style.corner)}>
        <view className={style.propRectRow}>
          <StylePropRectPart prop={prop} part={'left'} />
          <StylePropRectPart prop={prop} part={'top'} />
        </view>

        <view className={style.propRectRow}>
          <StylePropRectPart prop={prop} part={'bottom'} />
          <StylePropRectPart prop={prop} part={'right'} />
        </view>
      </view>}
  </view>;
}


function StylePropRectPart({ prop, part }: { prop: StyleProp, part: StylePropPart }) {
  const partName = !part ? prop.name :
    typeof prop.partTemplate === 'string' ? prop.partTemplate.replace('{part}', part) : prop.partTemplate(part);

  const isCorner = prop.arrangement === 'corner';
  const label = part ? (isCorner ? CornerLabels[part] : part[0].toUpperCase()) : prop.label;
  const partProp: StyleProp = { ...prop, partlessName: prop.name, name: partName, label };

  return <>
    <StylePropRow prop={partProp}
      className={clsx(style.rectPart, style['part-' + part], 'react-unity__field__inline', isCorner && style.corner)} />
  </>;
}

Renderer.render(
  <StyleContext>
    <SelectionProvider>
      <App />
    </SelectionProvider>
  </StyleContext>
);
