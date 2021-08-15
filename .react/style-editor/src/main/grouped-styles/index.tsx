import { ReactUnity } from '@reactunity/renderer';
import clsx from 'clsx';
import * as React from 'react';
import { useState } from 'react';
import { allProps, CornerLabels, StyleProp, StylePropGroup, StylePropPart, styleProps } from '../../common/props';
import { useSelection } from '../../context/selection';
import { useStyleContext } from '../../context/style';
import style from './index.module.scss';

export function GroupedStyles() {
  const [showAll, setShowAll] = useState(true);

  return <scroll className={style.styles}>
    <toggle label="Show All" value={showAll} onChange={ev => setShowAll(ev.newValue)} className={style.showAllButton} />

    {showAll ?
      styleProps.map((x, i) => <Group group={x} key={i} />) :
      allProps.map((x, i) => <StylePropRow prop={x} optional key={i} />)
    }
  </scroll>;
}

function Group({ group, className }: { group: StylePropGroup, className?: string }) {
  return <view className={clsx(style.group, className)}>
    {!!group.label && <view className={style.groupHeader}>{group.label}</view>}

    {group.props.map(x => <StylePropView prop={x} key={x.name} />)}
  </view>;
}

function StylePropView({ prop }: { prop: StyleProp }) {
  return prop.arrangement === 'rect' || prop.arrangement === 'corner' ?
    <StylePropRect prop={prop} key={prop.name} /> :
    <StylePropRow prop={prop} key={prop.name} />;
}

function StylePropRow({ prop, className, optional }: { prop: StyleProp, className?: string, optional?: boolean }) {
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

  return (optional && !exists) ? <></> :
    <view className={clsx(className, style.row, exists && style.exists)}>
      <button onButtonClick={removeStyle} className={style.removeButton}>
        X
      </button>

      <prop.component className={style.rowContent} value={gval} label={prop.label ?? prop.name} onChange={(val) => changeStyle(prop.name, val)} />
    </view>;
}

function StylePropRect({ prop }: { prop: StyleProp }) {
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
