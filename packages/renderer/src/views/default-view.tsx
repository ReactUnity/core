import { ReactNode } from 'react';
import { GlobalsProvider } from '../helpers/dictionary-watcher';
import { ErrorBoundary } from './error-boundary';

interface Props {
  children?: ReactNode;
}

export function DefaultView({ children }: Props) {
  return <ErrorBoundary>
    <GlobalsProvider>
      {children}
    </GlobalsProvider>
  </ErrorBoundary>;
}
