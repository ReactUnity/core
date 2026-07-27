/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */
import {
  SandpackCodeEditor,
  SandpackLayout,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react';
import cn from 'classnames';
import { memo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { IconChevron } from 'components/Icon/IconChevron';
import { NavigationBar } from './NavigationBar';
import { UnityPreview } from './UnityPreview';

/*
 * The editor used to run ESLint in the browser to underline React-rules violations as you
 * typed (useSandpackLint + runESLint). That is gone: it bundled ESLint 7 and a hand-picked
 * subset of its rule modules into the page, held together by a webpack IgnorePlugin rule
 * that stripped the rules ESLint loads by default -- a build hack with no equivalent in
 * Vite, and ESLint 7 is four majors behind. Compile errors still surface, from Babel, in
 * the preview's error panel; only the inline lint squiggles are lost. (Nothing was reading
 * the diagnostics either: UnityPreview was already being handed `lintErrors={[]}`.)
 */
export const CustomPreset = memo(function CustomPreset({
  showDevTools,
  onDevToolsLoad,
  devToolsLoaded,
  providedFiles,
}: {
  showDevTools: boolean;
  devToolsLoaded: boolean;
  onDevToolsLoad: () => void;
  providedFiles: Array<string>;
}) {
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { activeFile } = sandpack;
  const lineCountRef = useRef<{ [key: string]: number }>({});
  if (!lineCountRef.current[activeFile]) {
    lineCountRef.current[activeFile] = code.split('\n').length;
  }
  const lineCount = lineCountRef.current[activeFile];
  const isExpandable = lineCount > 16;
  return (
    <SandboxShell
      showDevTools={showDevTools}
      onDevToolsLoad={onDevToolsLoad}
      devToolsLoaded={devToolsLoaded}
      providedFiles={providedFiles}
      isExpandable={isExpandable}
    />
  );
});

const SandboxShell = memo(function SandboxShell({
  showDevTools,
  devToolsLoaded,
  providedFiles,
  isExpandable,
}: {
  showDevTools: boolean;
  devToolsLoaded: boolean;
  onDevToolsLoad: () => void;
  providedFiles: Array<string>;
  isExpandable: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className="shadow-lg dark:shadow-lg-dark rounded-lg"
      ref={containerRef}>
      <NavigationBar providedFiles={providedFiles} />
      <SandpackLayout
        className={cn(
          showDevTools && devToolsLoaded && 'sp-layout-devtools',
          !(isExpandable || isExpanded) && 'rounded-b-lg overflow-hidden',
          isExpanded && 'sp-layout-expanded'
        )}>
        <Editor />
        <UnityPreview
          className="order-last xl:order-2"
          isExpanded={isExpanded}
        />
        {(isExpandable || isExpanded) && (
          <button
            type="button"
            translate="yes"
            className="sandpack-expand flex text-base justify-between dark:border-card-dark bg-wash dark:bg-card-dark items-center z-10 p-1 w-full order-2 xl:order-last border-b relative top-0"
            onClick={() => {
              const nextIsExpanded = !isExpanded;
              flushSync(() => {
                setIsExpanded(nextIsExpanded);
              });
              if (!nextIsExpanded && containerRef.current !== null) {
                const container = containerRef.current as HTMLDivElement & {
                  scrollIntoViewIfNeeded?: () => void;
                };
                if (container.scrollIntoViewIfNeeded) {
                  container.scrollIntoViewIfNeeded();
                } else {
                  container.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                  });
                }
              }
            }}>
            <span className="flex p-2 focus:outline-none text-primary dark:text-primary-dark leading-[20px]">
              <IconChevron
                className="inline mr-1.5 text-xl"
                displayDirection={isExpanded ? 'up' : 'down'}
              />
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          </button>
        )}
      </SandpackLayout>
    </div>
  );
});

const Editor = memo(function Editor() {
  return (
    <SandpackCodeEditor
      showLineNumbers
      showInlineErrors
      showTabs={false}
      showRunButton={false}
    />
  );
});
