import { ReactNode } from 'react';
import { GlobalsProvider } from '../helpers/dictionary-watcher';
import { ErrorBoundary } from './error-boundary';

interface Props {
  children?: ReactNode;
  withHelpers: boolean;
}

export function DefaultView({ children, withHelpers }: Props) {
  return <>
    {!withHelpers ? children :
      <ErrorBoundary>
        <GlobalsProvider>
          {children}
        </GlobalsProvider>
      </ErrorBoundary>}
  </>;
}
