import { ReactNode } from 'react';
import { ErrorBoundary } from './error-boundary';

interface Props {
  children?: ReactNode;
  withHelpers: boolean;
  renderCount: number;
}

export function DefaultView({ children, withHelpers, renderCount }: Props) {
  return <>{!withHelpers ? children : <ErrorBoundary key={renderCount}>{children}</ErrorBoundary>}</>;
}
