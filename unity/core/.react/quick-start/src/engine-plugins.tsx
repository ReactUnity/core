import { useCallback, useContext, useEffect, useState } from 'react';
import { SetIsLoadingContext, Window, check, error, info, warn } from './common';
import styles from './styles.module.scss';

interface PluginType {
  type: number;
  packageName: string;
  recommended: boolean;
  name: string;
  implicit: boolean;
  version?: string;
  latestVersion?: string;
  installed?: boolean;
  hasUpdate?: boolean;
  tooltip?: string;
}

const engineTypes: Array<PluginType> = [
  {
    type: Interop.ReactUnity.Scripting.JavascriptEngineType.QuickJS,
    packageName: 'com.reactunity.quickjs',
    recommended: true,
    name: 'QuickJS',
    implicit: false,
    tooltip: `QuickJS is a fast embeddable JS engine. It consists of some managed and native C++ libraries. It supports every platform.
QuickJS is very fast and reliable. It supports all platforms and has decent interop features.
"REACT_DISABLE_QUICKJS" flag can be used to exclude QuickJS from build. Note that native libraries must be excluded manually after build.`,
  },
  {
    type: Interop.ReactUnity.Scripting.JavascriptEngineType.Jint,
    packageName: 'com.reactunity.jint',
    recommended: false,
    name: 'Jint',
    implicit: false,
    tooltip: `Jint is a managed JS interpreter written entirely in C#. It consists of some managed libraries. It supports every platform.
Jint is not very fast. But it is often reliable and has excellent interop features, as well as crossplatform support.
"REACT_DISABLE_JINT" flag can be used to exclude Jint from build.`,
  },
  {
    type: Interop.ReactUnity.Scripting.JavascriptEngineType.ClearScript,
    packageName: 'com.reactunity.clearscript',
    recommended: false,
    name: 'ClearScript',
    implicit: false,
    tooltip: `ClearScript is a fast JS engine which uses the V8 engine. It consists of some managed and native C++ libraries. It supports only Mono platforms.
ClearScript is very fast and often reliable. It has decent interop features. It doesn't support IL2CPP platforms. Also it may have very big file sizes.
ClearScript is the only engine capable of debugging. JavaScript can be debugged on port 9222 with Node debuggers like Chrome Inspector or VSCode.
"REACT_DISABLE_CLEARSCRIPT" flag can be used to exclude ClearScript from build. Note that native libraries must be excluded manually after build.`,
  },
];

const engineTypesLoaded = new Promise<void>((resolve) => {
  let loadedCount = 0;

  for (const type of engineTypes) {
    Window.CheckVersion(type.packageName, (version, latestVersion, hasUpdate) => {
      type.version = version;
      type.latestVersion = latestVersion;
      type.hasUpdate = hasUpdate;
      type.installed = !!type.version;

      loadedCount++;

      if (loadedCount === engineTypes.length) {
        resolve();
      }
    });
  }
});

export function EnginePlugins() {
  const [engines, setEngines] = useState<typeof engineTypes>();

  useEffect(() => {
    engineTypesLoaded.then(() => setEngines(engineTypes));
  }, []);

  const [loadingPlugin, setLoadingPlugin] = useState('');
  const setIsLoading = useContext(SetIsLoadingContext);

  const installPlugin = useCallback((x: PluginType) => {
    Window.InstallScopedPlugin(x.packageName);

    setLoadingPlugin(x.packageName);
    setIsLoading(true);
  }, []);

  return (
    <section style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      JavaScript Engines
      {!engines && (
        <div>
          <spinner />
        </div>
      )}
      {!!engines &&
        engines.map((x, i) => (
          <section key={i} style={{ margin: '10px 0 0 0' }}>
            <view tooltip={x.tooltip} style={{ flexDirection: 'row' }}>
              <button className={styles.infoButton} tooltip={x.tooltip}>
                {info}
              </button>

              <view>
                {x.name + (x.recommended ? ' (Recommended)' : '')}
                <text className={styles.packageName}>{x.packageName}</text>
              </view>
            </view>

            <view style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }} />

            {!x.installed ? (x.recommended ? error : warn) : x.hasUpdate ? warn : check}

            {!x.installed && <>Not installed</>}

            {!!x.installed ? (
              <>
                {'Installed Version ' + x.version}

                {!x.implicit && !x.recommended && <button onClick={() => Window.UninstallUnityPlugin(x.packageName)}>Uninstall</button>}

                {x.hasUpdate && (
                  <>
                    {x.implicit ? (
                      <>Update ReactUnity to get the latest version</>
                    ) : (
                      <button onClick={() => installPlugin(x)}>
                        {(loadingPlugin === x.packageName ? 'Updating to ' : 'Update to ') + x.latestVersion}
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <button onClick={() => installPlugin(x)}>{loadingPlugin === x.packageName ? 'Installing' : 'Install'}</button>
              </>
            )}
          </section>
        ))}
    </section>
  );
}
