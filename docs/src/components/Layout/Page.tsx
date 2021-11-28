/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { MenuProvider } from 'components/useMenu';
import * as React from 'react';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { Sidebar } from './Sidebar';
import { RouteItem, SidebarContext } from './useRouteMeta';
interface PageProps {
  children: React.ReactNode;
  routeTree: RouteItem;
}

export function Page({ routeTree, children }: PageProps) {
  return (
    <MenuProvider>
      <SidebarContext.Provider value={routeTree}>
        <div className="h-auto lg:h-screen flex flex-row">
          <div className="no-bg-scrollbar h-auto lg:h-full lg:overflow-y-scroll fixed flex flex-row lg:flex-col py-0 top-0 left-0 right-0 lg:max-w-xs w-full shadow lg:shadow-none z-50">
            <Nav />
            <Sidebar />
          </div>

          <div className="flex flex-1 w-full h-full self-stretch">
            <div className="w-full min-w-0 flex flex-col">
              <main
                className="flex flex-1 self-stretch flex-col items-end"
                style={{ justifyContent: 'space-around' }}>
                {children}
                <Footer />
              </main>
            </div>
          </div>
        </div>
      </SidebarContext.Provider>
    </MenuProvider>
  );
}
