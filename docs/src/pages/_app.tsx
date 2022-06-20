/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import '@codesandbox/sandpack-react/dist/index.css';
import '@docsearch/css';
import { GlobalUnityProvider } from 'components/unity';
import { AppProps } from 'next/app';
import * as React from 'react';
import '../styles/algolia.css';
import '../styles/index.css';
import '../styles/sandpack.css';

const EmptyAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;
  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }
  React.useEffect(() => {
    // Monkey patch Google Tag Manager in development to just log to the console
    if (process.env.NODE_ENV !== 'production') {
      (window as any).gtag = (...args: any[]) => {
        console.log('gtag: ', ...args);
      };
    }
  }, []);
  return (
    <GlobalUnityProvider>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </GlobalUnityProvider>
  );
}
