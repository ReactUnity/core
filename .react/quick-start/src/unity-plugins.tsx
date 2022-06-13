import { useEffect, useState } from 'react';
import { check, error, info, warn, Window } from './common';
import styles from './index.module.scss';

const pluginTypes: Array<{
  packageName: string;
  name: string;
  required: boolean;
  version?: string;
  latestVersion?: string;
  installed?: boolean;
  hasUpdate?: boolean;
  tooltip?: string;
}> = [
    {
      packageName: 'com.unity.editorcoroutines',
      name: 'Unity Editor Coroutines',
      required: true,
      tooltip:
        `Required for running editor windows with ReactUnity (like this window). It is installed by default and highly recommended to keep it installed.`,
    },
    {
      packageName: 'com.unity.vectorgraphics',
      name: 'Unity Vector Graphics',
      required: false,
      tooltip:
        `Required for SVG rendering.`,
    },
  ];

const pluginsLoaded = new Promise<void>((resolve) => {
  let loadedCount = 0;

  for (const type of pluginTypes) {
    const resolveFunc = (version: string, latestVersion: string, hasUpdate: boolean) => {
      type.version = version;
      type.latestVersion = latestVersion;
      type.hasUpdate = hasUpdate;
      type.installed = !!type.version;

      loadedCount++;

      if (loadedCount === pluginTypes.length) {
        resolve();
      }
    };

    Window.CheckPackageVersion(type.packageName, resolveFunc);
  }
});

export function UnityPlugins() {
  const [plugins, setPlugins] = useState<typeof pluginTypes>();

  useEffect(() => {
    pluginsLoaded.then(() => setPlugins(pluginTypes));
  }, []);


  return (
    <section style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      Additional Plugins

      {!plugins && <div>
        <spinner />
      </div>}

      {!!plugins && plugins.map((x, i) => <section key={i} style={{ margin: '10px 0 0 0' }}>
        <view tooltip={x.tooltip} style={{ flexDirection: 'row' }}>
          <button className={styles.infoButton}>
            {info}
          </button>

          <view>
            {x.name + (x.required ? ' (Required)' : ' (Optional)')}
            <text className={styles.packageName}>{x.packageName}</text>
          </view>
        </view>

        <view style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }} />

        {!x.installed ?
          (x.required ? error : warn) :
          x.hasUpdate ? warn : check}

        {!x.installed && <>
          Not installed
        </>}

        {!!x.installed ? <>
          {'Installed Version ' + x.version}

          {!x.required && <button onClick={() => Window.UninstallUnityPlugin(x.packageName)}>
            Uninstall
          </button>}

          {x.hasUpdate && <>
            {x.required ? <>Update ReactUnity to get the latest version</> :
              <button onClick={() => Window.InstallUnityPlugin(x.packageName)}>
                {'Update to ' + x.latestVersion}
              </button>}
          </>}
        </> : <>
          <button onClick={() => Window.InstallUnityPlugin(x.packageName)}>
            Install
          </button>
        </>}
      </section>)}
    </section>
  );
}
