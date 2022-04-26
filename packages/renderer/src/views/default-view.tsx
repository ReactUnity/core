import { ReactNode } from 'react';
import { GlobalsProvider } from '../helpers/dictionary-watcher';
import { ReactUnity } from '../models/generated';
import { AsyncJobRunner } from './async-job';
import { ErrorBoundary } from './error-boundary';

interface Props {
  children?: ReactNode;
  withHelpers: boolean;
  withAsyncJob: boolean;
  asyncJobCallback: () => void;
  context: ReactUnity.ReactContext;
}

export function DefaultView({ children, withHelpers, withAsyncJob, context, asyncJobCallback }: Props) {
  return <>
    {!!withAsyncJob && <AsyncJobRunner context={context} asyncJobCallback={asyncJobCallback} />}

    {!withHelpers ? children :
      <ErrorBoundary>
        <GlobalsProvider>
          {children}
        </GlobalsProvider>
      </ErrorBoundary>}
  </>;
}
