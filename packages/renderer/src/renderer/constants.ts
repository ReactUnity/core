import { styleStringSymbol } from './diffing';

export const hideClass = 'react-unity__renderer__hidden';

const DiscreteEventPriority = 0b00001;
const ContinuousEventPriority = 0b00100;
const DefaultEventPriority = 0b10000;
const IdleEventPriority = 0b0100000000000000000000000000000;
export const LegacyRoot = 0;
export const ConcurrentRoot = 1;

export const eventPriorities = {
  discrete: DiscreteEventPriority,
  continuous: ContinuousEventPriority,
  default: DefaultEventPriority,
  idle: IdleEventPriority,
};

export const textTypes = {
  text: true,
  icon: true,
  style: true,
  script: true,
};

export function getAllowedProps(props, type) {
  const { children, tag, ...rest } = props;

  if (textTypes[type] && 'children' in props) {
    rest.children = (!children || typeof children === 'boolean') ? null : Array.isArray(children) ? children.join('') : children + '';
  }

  if (typeof props.style === 'string') rest[styleStringSymbol] = props.style;

  return rest;
}
