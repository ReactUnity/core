/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { SandpackLogLevel } from '@codesandbox/sandpack-client';
import {
  SandpackProvider,
  type SandpackFile,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { CustomPreset } from './CustomPreset';
import { CustomTheme } from './Themes';

type SandpackProps = {
  /*
   * Built at compile time by plugins/remark-sandpack-files.js from the code fences
   * nested inside <Sandpack>. It arrives as a prop rather than as children because
   * this component is an island: children reach it as opaque HTML, and props have to
   * survive JSON serialization.
   */
  files: Record<string, SandpackFile>;
  autorun?: boolean;
  showDevTools?: boolean;
};

function SandpackRoot({
  files,
  autorun = true,
  showDevTools = false,
}: SandpackProps) {
  const [devToolsLoaded, setDevToolsLoaded] = useState(false);

  return (
    <SandpackProvider
      template="react"
      files={files}
      theme={CustomTheme}
      options={{
        autorun,
        initMode: 'user-visible',
        initModeObserverOptions: { rootMargin: '1400px 0px' },
        logLevel: SandpackLogLevel.None,
      }}>
      <CustomPreset
        showDevTools={showDevTools}
        onDevToolsLoad={() => setDevToolsLoaded(true)}
        devToolsLoaded={devToolsLoaded}
        providedFiles={Object.keys(files)}
      />
    </SandpackProvider>
  );
}

export default SandpackRoot;
