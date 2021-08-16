import React from 'react';

export function getChildrenOfType(children: React.ReactNode, type: any) {
  return React.Children.toArray(children).filter(x => x['type'] === type);
}

export function getOnlyChildOfType(children: React.ReactNode, type: any) {
  return getChildrenOfType(children, type);
}

export function getElevationClass(elevation: number) {
  if (elevation > 0) return `md-elevation-${elevation}`;
  return 'md-elevation-0';
}
