/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { RouteItem } from 'components/Layout/useRouteMeta';
import * as React from 'react';
import sidebarLearn from '../../sidebarLearn.json';
import { MarkdownPage, MarkdownProps } from './MarkdownPage';
import { Page } from './Page';
interface PageFrontmatter {
  title: string;
}

export default function withLearn(meta: PageFrontmatter) {
  function LayoutLearn(props: MarkdownProps<PageFrontmatter>) {
    return <MarkdownPage {...props} meta={meta} />;
  }
  LayoutLearn.appShell = AppShell;
  return LayoutLearn;
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} routeTree={sidebarLearn as RouteItem} />;
}
