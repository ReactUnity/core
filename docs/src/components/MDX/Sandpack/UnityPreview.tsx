/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { SandpackStack, useSandpack } from '@codesandbox/sandpack-react';
import cn from 'classnames';
import { UnityCardridge, UnityCardridgeRef } from 'components/unity/cartridge';
import { useDebounce } from 'hooks/use-debounce';
import { useObservable, useSubject } from 'hooks/use-observable';
import * as React from 'react';
import { debounce, filter, map, of, timer } from 'rxjs';
import { compile } from './compile';
import type { LintDiagnostic } from './useSandpackLint';

import { useEffect, useId, useMemo, useState } from 'react';
import { SandpackConsole } from './Console';
import { ErrorMessage } from './ErrorMessage';
import { LoadingOverlay } from './LoadingOverlay';

type CustomPreviewProps = {
  className?: string;
  isExpanded: boolean;
  lintErrors: LintDiagnostic;
};

const sandboxStyle = `
:root {
  padding: 24px;
}
`;

export function UnityPreview({
  isExpanded,
  className,
  lintErrors,
}: CustomPreviewProps) {
  const { sandpack, listen } = useSandpack();
  const [bundlerIsReady, setBundlerIsReady] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [iframeComputedHeight, setComputedAutoHeight] = useState<number | null>(
    null
  );

  let {
    error: rawError,
    errorScreenRegisteredRef,
    openInCSBRegisteredRef,
    loadingScreenRegisteredRef,
    status,
  } = sandpack;

  if (
    rawError &&
    rawError.message === '_csbRefreshUtils.prelude is not a function'
  ) {
    // Work around a noisy internal error.
    rawError = null;
  }

  // Memoized because it's fed to debouncing.
  const firstLintError = useMemo(() => {
    if (lintErrors.length === 0) {
      return null;
    } else {
      const { line, column, message } = lintErrors[0];
      return {
        title: 'Lint Error',
        message: `${line}:${column} - ${message}`,
      };
    }
  }, [lintErrors]);

  if (rawError == null || rawError.title === 'Runtime Exception') {
    if (firstLintError !== null) {
      rawError = firstLintError;
    }
  }

  if (rawError != null && rawError.title === 'Runtime Exception') {
    rawError.title = 'Runtime Error';
  }

  const clientId = useId();

  // SandpackPreview immediately registers the custom screens/components so the bundler does not render any of them
  // TODO: why are we doing this during render?
  openInCSBRegisteredRef.current = true;
  errorScreenRegisteredRef.current = true;
  loadingScreenRegisteredRef.current = true;

  const sandpackIdle = status === 'idle';

  useEffect(
    function bundlerListener() {
      let timeout: ReturnType<typeof setTimeout>;

      const unsubscribe = listen((message) => {
        if (message.type === 'resize') {
          setComputedAutoHeight(message.height);
        } else if (message.type === 'start') {
          if (message.firstLoad) {
            setBundlerIsReady(false);
          }

          /**
           * The spinner component transition might be longer than
           * the bundler loading, so we only show the spinner if
           * it takes more than 1s to load the bundler.
           */
          timeout = setTimeout(() => {
            setShowLoading(true);
          }, 500);
        } else if (message.type === 'done') {
          setBundlerIsReady(true);
          setShowLoading(false);
          clearTimeout(timeout);
        }
      }, clientId);

      return () => {
        clearTimeout(timeout);
        setBundlerIsReady(false);
        setComputedAutoHeight(null);
        unsubscribe();
      };
    },
    [sandpackIdle]
  );

  const code = sandpack.files['/App.js']?.code;
  const css = sandpack.files['/styles.css']?.code;

  const compiledCode = React.useMemo(() => compile(code || '', 'jsx') || '', [code]);
  const compiledCss = React.useMemo(() => compile(css || '', 'css') || '', [css]);

  const ccError: any = compiledCode.error || compiledCss.error || undefined;

  const delayedCss = useDebounce(compiledCss.compiledCode, 300);

  const codeSubj = useSubject(compiledCode);

  const delayedCode = useObservable(() => codeSubj.pipe(
    debounce(x => x.error ? of(0) : timer(300)),
    filter(x => !x.error),
    map(x => x.compiledCode!),
  ), [], compiledCode.compiledCode || '');

  const cartridgeRef = React.useRef<UnityCardridgeRef>(null);

  // It changes too fast, causing flicker.
  const error = useDebounce(rawError || ccError, 300);

  // WARNING:
  // The layout and styling here is convoluted and really easy to break.
  // If you make changes to it, you need to test different cases:
  // - Content -> (compile | runtime) error -> content editing flow should work.
  // - Errors should expand parent height rather than scroll.
  // - Long sandboxes should scroll unless "show more" is toggled.
  // - Expanded sandboxes ("show more") have sticky previews and errors.
  // - Sandboxes have autoheight based on content.
  // - That autoheight should be measured correctly! (Check some long ones.)
  // - You shouldn't see nested scrolls (that means autoheight is borked).
  // - Ideally you shouldn't see a blank preview tile while recompiling.
  // - Container shouldn't be horizontally scrollable (even while loading).
  // - It should work on mobile.
  // The best way to test it is to actually go through some challenges.

  const hideContent = !!error;

  return (
    <SandpackStack className={className}>
      <div
        className={cn(
          'p-0 sm:p-2 md:p-4 lg:p-8 bg-card dark:bg-wash-dark h-full relative min-h-[400px]',
          // Allow content to be scrolled if it's too high to fit.
          // Note we don't want this in the expanded state
          // because it breaks position: sticky (and isn't needed anyway).
          !isExpanded && (error || bundlerIsReady) ? 'overflow-auto' : null
        )}>
        <UnityCardridge
          script={delayedCode}
          css={sandboxStyle + delayedCss}
          ref={cartridgeRef}
          className={cn(
            'rounded-t-none bg-white md:shadow-md w-full max-w-full transition-opacity h-full absolute inset-0',
            // We can't *actually* hide content because that would
            // break calculating the computed height in the iframe
            // (which we're using for autosizing). This is noticeable
            // if you make a compiler error and then fix it with code
            // that expands the content. You want to measure that.
            hideContent
              ? 'absolute opacity-0 pointer-events-none duration-75'
              : 'opacity-100 duration-150'
          )}
        />

        {error && (
          <div
            className={cn(
              'z-50',
              // This isn't absolutely positioned so that
              // the errors can also expand the parent height.
              isExpanded ? 'sticky top-8 ' : null
            )}>
            <ErrorMessage error={error} />
          </div>
        )}

        <LoadingOverlay
          clientId={clientId}
          dependenciesLoading={!bundlerIsReady && iframeComputedHeight === null}
          forceLoading={showLoading}
        />
      </div >
      <SandpackConsole visible={!error} />
    </SandpackStack>
  );
}
