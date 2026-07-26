/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { SandpackLogLevel } from '@codesandbox/sandpack-client';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import * as React from 'react';
import { Children, useState } from 'react';
import { createFileMap } from './createFileMap';
import { CustomPreset } from './CustomPreset';
import { CustomTheme } from './Themes';

type SandpackProps = {
  children: React.ReactNode;
  autorun?: boolean;
  showDevTools?: boolean;
};

function SandpackRoot(props: SandpackProps) {
  let { children, autorun = true, showDevTools = false } = props;
  const [devToolsLoaded, setDevToolsLoaded] = useState(false);
  const codeSnippets = Children.toArray(children) as React.ReactElement[];
  const files = createFileMap(codeSnippets);

  files['/styles.css'] = {
    code: '',
    ...files['/styles.css'],
  };

  if (!Object.values(files).some((x: any) => x.active)) {
    if (files['/index.html']) files['/index.html'].active = true;
    else if (files['/App.js']) files['/App.js'].active = true;
  }

  return (
    <div className="sandpack sandpack--playground my-8">
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
    </div>
  );
}

export default SandpackRoot;
