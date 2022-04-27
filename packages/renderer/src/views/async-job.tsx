import { ReactElement, useInsertionEffect, useLayoutEffect, useState } from 'react';
import { ReactUnity } from '../models/generated';

interface Props {
  context?: ReactUnity.ReactContext;
  asyncJobCallback?: () => void;
}

export function AsyncJobRunner({ context, asyncJobCallback }: Props) {
  const [, setSt] = useState(false);

  useInsertionEffect(() => {
    if (asyncJobCallback) asyncJobCallback();
    else context.FlushCommands();
  });

  useLayoutEffect(() => {
    setInterval(() => {
      setSt(x => !x);
    }, 0);
  }, []);

  return null as ReactElement;
}
