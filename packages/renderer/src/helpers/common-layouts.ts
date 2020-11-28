import { Layout, PositionType } from "../../models/components";

export const transparentColor = new Color(0, 0, 0, 0);

export const fullScreen: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Point(-5000),
  Right: YogaValue.Point(-5000),
  Bottom: YogaValue.Point(-5000),
  Left: YogaValue.Point(-5000),
};

export const fullCover: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Point(0),
  Right: YogaValue.Point(0),
  Bottom: YogaValue.Point(0),
  Left: YogaValue.Point(0),
};

export const dropdownBottom: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValue.Percent(100),
  Left: YogaValue.Point(0),
  MinWidth: YogaValue.Percent(100),
}

export const dropdownTop: Layout = {
  PositionType: PositionType.Absolute,
  Bottom: YogaValue.Percent(100),
  Left: YogaValue.Point(0),
  MinWidth: YogaValue.Percent(100),
}

export const bottomEdge: Layout = {
  PositionType: PositionType.Absolute,
  Left: YogaValue.Point(0),
  Right: YogaValue.Point(0),
  Bottom: YogaValue.Point(0),
  Height: YogaValue.Point(0),
}
