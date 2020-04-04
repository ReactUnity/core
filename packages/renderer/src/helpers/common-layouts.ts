import { Layout, PositionType } from "../../models/components";

export const transparentColor = new ColorNative(0, 0, 0, 0);

export const fullScreen: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValueNative.Point(-5000),
  Right: YogaValueNative.Point(-5000),
  Bottom: YogaValueNative.Point(-5000),
  Left: YogaValueNative.Point(-5000),
};

export const fullCover: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValueNative.Point(0),
  Right: YogaValueNative.Point(0),
  Bottom: YogaValueNative.Point(0),
  Left: YogaValueNative.Point(0),
};

export const dropdownBottom: Layout = {
  PositionType: PositionType.Absolute,
  Top: YogaValueNative.Percent(100),
  Left: YogaValueNative.Point(0),
  MinWidth: YogaValueNative.Percent(100),
}

export const dropdownTop: Layout = {
  PositionType: PositionType.Absolute,
  Bottom: YogaValueNative.Percent(100),
  Left: YogaValueNative.Point(0),
  MinWidth: YogaValueNative.Percent(100),
}

export const bottomEdge: Layout = {
  PositionType: PositionType.Absolute,
  Left: YogaValueNative.Point(0),
  Right: YogaValueNative.Point(0),
  Bottom: YogaValueNative.Point(0),
  Height: YogaValueNative.Point(0),
}
