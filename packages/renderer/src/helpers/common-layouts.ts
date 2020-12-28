import { Layout, PositionType } from "../../models/components";

export const transparentColor = 'clear';

export const fullScreen: Layout = {
  positionType: PositionType.Absolute,
  top: -5000,
  right: -5000,
  bottom: -5000,
  left: -5000,
};

export const fullCover: Layout = {
  positionType: PositionType.Absolute,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const dropdownBottom: Layout = {
  positionType: PositionType.Absolute,
  top: '100%',
  left: 0,
  minWidth: '100%',
}

export const dropdownTop: Layout = {
  positionType: PositionType.Absolute,
  bottom: '100%',
  left: 0,
  minWidth: '100%',
}

export const bottomEdge: Layout = {
  positionType: PositionType.Absolute,
  left: 0,
  right: 0,
  bottom: 0,
  height: 0,
}
