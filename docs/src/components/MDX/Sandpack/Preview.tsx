/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useSandpack } from '@codesandbox/sandpack-react';
import cn from 'classnames';
import { UnityCardridge, UnityCardridgeRef } from 'components/unity/cartridge';
import { useDebounce } from 'hooks/use-debounce';
import { useObservable, useSubject } from 'hooks/use-observable';
import * as React from 'react';
import { debounce, filter, map, of, timer } from 'rxjs';
import { compile } from './compile';
import { Error } from './Error';


type CustomPreviewProps = {
  className?: string;
  customStyle: Record<string, unknown>;
  isExpanded: boolean;
};

export function Preview({
  customStyle,
  className,
}: CustomPreviewProps) {
  const { sandpack } = useSandpack();
  const code = sandpack.files['/App.js']?.code;
  const css = sandpack.files['/style.css']?.code;

  const compiledCode = React.useMemo(() => compile(code || '', 'jsx') || '', [code]);
  const compiledCss = React.useMemo(() => compile(css || '', 'css') || '', [css]);

  const error: any = compiledCode.error || compiledCss.error || undefined;

  const delayedCss = useDebounce(compiledCss.compiledCode, 300);

  const codeSubj = useSubject(compiledCode);

  const delayedCode = useObservable(() => codeSubj.pipe(
    debounce(x => x.error ? of(0) : timer(300)),
    filter(x => !x.error),
    map(x => x.compiledCode!),
  ), [], compiledCode.compiledCode || '');

  const cartridgeRef = React.useRef<UnityCardridgeRef>(null);

  return (
    <div
      className={cn('sp-stack', className)}
      style={{
        minHeight: '405px',
        ...customStyle,
      }}>
      {!!(delayedCode || delayedCss) &&
        <UnityCardridge
          script={delayedCode}
          style={delayedCss}
          ref={cartridgeRef}
          className={cn('p-0 bg-card dark:bg-wash-dark h-full relative rounded-b-lg lg:rounded-b-none')} />
      }

      {error && (
        <div
          className="p-2"
          style={{
            position: 'absolute',
            top: '0',
            width: '100%',
          }}>
          <Error error={error} />
        </div>
      )}
    </div >
  );
}
