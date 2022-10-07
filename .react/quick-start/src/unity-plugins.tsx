import { useCallback, useContext, useEffect, useState } from 'react';
import { check, error, info, SetIsLoadingContext, warn, Window } from './common';
import styles from './index.module.scss';

interface PluginType {
  packageName: string;
  name: string;
  required: boolean;
  version?: string;
  scoped?: boolean;
  latestVersion?: string;
  installed?: boolean;
  hasUpdate?: boolean;
  tooltip?: string;
}

const pluginTypes: Array<PluginType> = [
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
  {
    packageName: 'com.nosuchstudio.rtltmpro',
    name: 'RTLTMPro',
    required: false,
    scoped: true,
    tooltip:
      `Right-To-Left Text Mesh Pro for Unity. This plugin adds support for Persian and Arabic languages to TextMeshPro.`,
  },
];

function initPlugins() {
  return new Promise<void>((resolve) => {
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

      Window.CheckVersion(type.packageName, resolveFunc);
    }
  });
}

export function AdditionalPlugins() {
  const [plugins, setPlugins] = useState<typeof pluginTypes>();
  const [loadingPlugin, setLoadingPlugin] = useState('');
  const [updatePlugins, setUpdatePlugins] = useState(0);
  const setIsLoading = useContext(SetIsLoadingContext);

  const installPlugin = useCallback((x: PluginType) => {
    const update = () => {
      setIsLoading(false);
      setUpdatePlugins(x => x + 1);
    };
    if (x.scoped) Window.InstallScopedPlugin(x.packageName, update);
    else Window.InstallUnityPlugin(x.packageName, update);

    setLoadingPlugin(x.packageName);
    setIsLoading(true);
  }, []);


  useEffect(() => {
    setPlugins(null);
    initPlugins().then(() => setPlugins(pluginTypes));
  }, [updatePlugins]);


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
            {x.required ? <>Update to get the latest version</> :
              <button onClick={() => installPlugin(x)}>
                {(loadingPlugin === x.packageName ? 'Updating to ' : 'Update to ') + x.latestVersion}
              </button>}
          </>}
        </> : <>
          <button onClick={() => installPlugin(x)}>
            {loadingPlugin === x.packageName ? 'Installing' : 'Install'}
          </button>
        </>}
      </section>)}
    </section>
  );
}
