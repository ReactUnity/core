/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import cn from 'classnames';
import type { RouteItem } from 'components/Layout/getRouteMeta';
import { Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import { useCollapse } from 'react-collapsed';
import { SidebarLink } from './SidebarLink';

/*
 * The sidebar is rendered to HTML at build time, where useLayoutEffect does nothing and
 * React says so on stderr. The Next.js version wrapped the call in `if (typeof window
 * !== 'undefined')` -- a conditional hook, which only held together because that
 * condition never changes within a process.
 */
const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;

interface SidebarRouteTreeProps {
  isForceExpanded: boolean;
  breadcrumbs: RouteItem[];
  routeTree: RouteItem;
  pathname: string;
  level?: number;
}

function CollapseWrapper({
  isExpanded,
  duration,
  children,
}: {
  isExpanded: boolean;
  duration: number;
  children: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { getCollapseProps } = useCollapse({
    isExpanded,
    duration,
  });

  // Disable pointer events while animating.
  const isExpandedRef = useRef(isExpanded);
  useIsomorphicLayoutEffect(() => {
    const wasExpanded = isExpandedRef.current;
    if (wasExpanded === isExpanded) {
      return;
    }
    isExpandedRef.current = isExpanded;
    if (ref.current !== null) {
      const node: HTMLDivElement = ref.current;
      node.style.pointerEvents = 'none';
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        node.style.pointerEvents = '';
      }, duration + 100);
    }
  });

  return (
    <div
      ref={ref}
      className={cn(isExpanded ? 'opacity-100' : 'opacity-50')}
      style={{
        transition: `opacity ${duration}ms ease-in-out`,
      }}>
      <div {...getCollapseProps()}>{children}</div>
    </div>
  );
}

export function SidebarRouteTree({
  isForceExpanded,
  breadcrumbs,
  routeTree,
  pathname,
  level = 0,
}: SidebarRouteTreeProps) {
  const slug = pathname;
  const currentRoutes = routeTree.routes as RouteItem[];
  return (
    <ul>
      {currentRoutes.map(
        (
          {
            path,
            title,
            routes,
            wip,
            heading,
            hasSectionHeader,
            sectionHeader,
          },
          index
        ) => {
          const selected = slug === path;
          let listItem = null;
          if (!path || heading) {
            // if current route item has no path and children treat it as an API sidebar heading
            listItem = (
              <SidebarRouteTree
                level={level + 1}
                isForceExpanded={isForceExpanded}
                routeTree={{ title, routes }}
                breadcrumbs={[]}
                pathname={pathname}
              />
            );
          } else if (routes) {
            // if route has a path and child routes, treat it as an expandable sidebar item
            const isBreadcrumb =
              breadcrumbs.length > 1 &&
              breadcrumbs[breadcrumbs.length - 1].path === path;
            const isExpanded = isForceExpanded || isBreadcrumb || selected;
            listItem = (
              <li key={`${title}-${path}-${level}-heading`}>
                <SidebarLink
                  key={`${title}-${path}-${level}-link`}
                  href={path}
                  selected={selected}
                  level={level}
                  title={title}
                  wip={wip}
                  isExpanded={isExpanded}
                  isBreadcrumb={isBreadcrumb}
                  hideArrow={isForceExpanded}
                />
                <CollapseWrapper duration={250} isExpanded={isExpanded}>
                  <SidebarRouteTree
                    isForceExpanded={isForceExpanded}
                    routeTree={{ title, routes }}
                    breadcrumbs={breadcrumbs}
                    level={level + 1}
                    pathname={pathname}
                  />
                </CollapseWrapper>
              </li>
            );
          } else {
            // if route has a path and no child routes, treat it as a sidebar link
            listItem = (
              <li key={`${title}-${path}-${level}-link`}>
                <SidebarLink
                  href={path}
                  selected={selected}
                  level={level}
                  title={title}
                  wip={wip}
                />
              </li>
            );
          }
          if (hasSectionHeader) {
            return (
              <Fragment key={`${sectionHeader}-${level}-separator`}>
                {index !== 0 && (
                  <li
                    role="separator"
                    className="mt-4 mb-2 ml-5 border-b border-border dark:border-border-dark"
                  />
                )}
                <h3
                  className={cn(
                    'mb-1 text-sm font-bold ml-5 text-gray-400 dark:text-gray-500',
                    index !== 0 && 'mt-2'
                  )}>
                  {sectionHeader}
                </h3>
              </Fragment>
            );
          }
          return listItem;
        }
      )}
    </ul>
  );
}
