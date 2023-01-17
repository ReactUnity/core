import { ReactNode } from 'react';
import { ErrorBoundary } from './error-boundary';

interface Props {
  children?: ReactNode;
  withHelpers: boolean;
}

export function DefaultView({ children, withHelpers }: Props) {
  return <>
    {!withHelpers ? children :
      <ErrorBoundary>
        {children}
      </ErrorBoundary>}
  </>;
}
