import { Position, Style } from '../../models/properties';

export const transparentColor = 'clear';

export const fullScreen: Style = {
  position: Position.Absolute,
  top: -5000,
  right: -5000,
  bottom: -5000,
  left: -5000,
};

export const fullCover: Style = {
  position: Position.Absolute,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const dropdownBottom: Style = {
  position: Position.Absolute,
  top: '100%',
  left: 0,
  minWidth: '100%',
};

export const dropdownTop: Style = {
  position: Position.Absolute,
  bottom: '100%',
  left: 0,
  minWidth: '100%',
};

export const bottomEdge: Style = {
  position: Position.Absolute,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
};
