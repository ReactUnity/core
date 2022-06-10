import { ReactUnity, Renderer } from '@reactunity/renderer';
import { useEffect, useState } from 'react';
import checkImage from './assets/check.png';
import errorImage from './assets/close.png';
import infoImage from './assets/info.png';
import warnImage from './assets/warn.png';
import styles from './index.module.scss';

const Window = Globals.Window as ReactUnity.Editor.QuickStartWindow;

const vsCodePath = 'vscode://file/{path}/';
const filePath = 'file:{path}';


const engineTypes: Array<{
  type: number;
  recommended: boolean;
  name: string;
  implicit: boolean;
  version?: string;
  latestVersion?: string;
  installed?: boolean;
  hasUpdate?: boolean;
  tooltip?: string;
}> = [
    {
      type: Interop.ReactUnity.Scripting.JavascriptEngineType.Jint,
      recommended: false,
      name: 'Jint',
      implicit: true,
      tooltip:
        `Jint is the default JS engine and is shipped together with ReactUnity. It consists of a managed library. It supports every platform Unity can build to.
Jint is not very fast. But it is often reliable and has excellent interop features, as well as crossplatform support.
"REACT_DISABLE_JINT" flag can be used to exclude Jint from build.`,
    },
    {
      type: Interop.ReactUnity.Scripting.JavascriptEngineType.QuickJS,
      recommended: true,
      name: 'QuickJS',
      implicit: false,
      tooltip:
        `QuickJS is a fast embeddable JS engine. It consists of some managed and native C++ libraries. It supports every platform except WebGL.
QuickJS is very fast and reliable. It supports most of the platforms and has decent interop features.
"REACT_DISABLE_QUICKJS" flag can be used to exclude QuickJS from build. Note that native libraries must be excluded manually after build.`,
    },
    {
      type: Interop.ReactUnity.Scripting.JavascriptEngineType.ClearScript,
      recommended: false,
      name: 'ClearScript',
      implicit: false,
      tooltip:

        `ClearScript is a fast JS engine which uses the V8 engine. It consists of some managed and native C++ libraries. It supports only Mono platforms.
ClearScript is very fast and often reliable. It has decent interop features. It doesn't support IL2CPP platforms. Also it may have very big file sizes.
"REACT_DISABLE_CLEARSCRIPT" flag can be used to exclude ClearScript from build. Note that native libraries must be excluded manually after build.`,
    },
  ];

const engineTypesLoaded = new Promise<void>((resolve) => {
  let loadedCount = 0;

  for (const type of engineTypes) {
    Window.CheckEngineVersion(type.type,
      (version, latestVersion, hasUpdate) => {
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

function App() {
  const [nodeVersion, setNodeVersion] = useState(Window.NodeVersion);
  const [projectPath, setProjectPath] = useState('');
  const [canvasExists, setCanvasExists] = useState(null);

  const [packageVersion, setPackageVersion] = useState(Window.PackageVersion);
  const [latestVersion, setLatestVersion] = useState(Window.LatestVersion);
  const [hasUpdate, setHasUpdate] = useState(Window.HasUpdate);

  const [engines, setEngines] = useState<typeof engineTypes>();

  useEffect(() => {
    engineTypesLoaded.then(() => setEngines(engineTypes));
  }, []);

  useEffect(() => {
    if (nodeVersion < 0) {
      Window.GetNodeVersion(ver => setNodeVersion(ver));
    }
  }, [nodeVersion, setNodeVersion]);

  useEffect(() => {
    if (!packageVersion) {
      Window.CheckVersion(() => {
        setPackageVersion(Window.PackageVersion);
        setLatestVersion(Window.LatestVersion);
        setHasUpdate(Window.HasUpdate);
      });
    }
  }, [packageVersion]);

  useEffect(() => {
    setProjectPath(Window.GetProjectPath());
  }, [setProjectPath]);

  useEffect(() => {
    setCanvasExists(Window.CanvasExistsInScene());
  }, [setCanvasExists]);

  const nodeOk = nodeVersion > Window.RequiredNodeVersion;
  const projectOk = !!projectPath;
  const canvasOk = !!canvasExists;
  const packageOk = !hasUpdate;

  const createCanvas = () => {
    Window.CreateCanvas();
    setCanvasExists(true);
  };

  const selectCanvas = () => {
    Window.SelectCanvas();
  };

  const check = <image source={checkImage} className={styles.checkIcon} />
  const error = <image source={errorImage} className={styles.errorIcon} />
  const warn = <image source={warnImage} className={styles.warnIcon} />

  return <scroll className={styles.host}>
    <head>
      <image source="url(resource:ReactUnity/editor/logo)" className={styles.logo}></image>

      <h1>React Unity</h1>
      <h2>Quick Start</h2>
    </head>

    {nodeVersion >= 0 &&
      <section className={nodeOk ? styles.success : styles.error}>
        {nodeVersion >= Window.RequiredNodeVersion ?
          <row>
            {check}
            <text>Node.js version {nodeVersion} is installed</text>
          </row> :
          <>
            <row>
              {error}
              {nodeVersion === 0 ?
                <text>Node.js does not seem to be installed on this computer. Install it or add it to PATH if it is already installed.</text> :
                <text>Node.js {nodeVersion} is installed but minimum recommended version is {Window.RequiredNodeVersion}.</text>}
            </row>

            <actions>
              <anchor url={Window.NodeUrl}>Install</anchor>
            </actions>
          </>}
      </section>}

    <section className={canvasOk ? styles.success : styles.error}>
      {packageOk ?
        <>
          <row>
            {check}
            <text>ReactUnity version is up to date at {packageVersion}</text>
          </row>
        </> :
        <>
          <row>
            {error}
            <text>ReactUnity is out of date. Current version: {packageVersion}, Latest version: {latestVersion}</text>
          </row>
          <actions>
            <button onClick={() => Window.UpdatePackage(latestVersion)}>Update</button>
          </actions>
        </>}
    </section>

    <section className={projectOk ? styles.success : styles.error}>
      {projectPath && <>
        <row>
          {check}
          <text>Project exists at path {projectPath}</text>
        </row>
        <actions>
          <anchor url={vsCodePath.replace('{path}', projectPath)}>Open in VSCode</anchor>
          <anchor url={filePath.replace('{path}', projectPath)}>Show in file explorer</anchor>
        </actions>
      </>}
    </section>

    <section className={canvasOk ? styles.success : styles.error}>
      {canvasOk ?
        <>
          <row>
            {check}
            ReactUnity Canvas exists in scene
          </row>
          <actions>
            <button onClick={selectCanvas}>Select</button>
          </actions>
        </> :
        <>
          <row>
            {error}
            ReactUnity Canvas does not exist in scene
          </row>
          <actions>
            <button onClick={createCanvas}>Create</button>
          </actions>
        </>}
    </section>

    <section style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      JavaScript Engines

      {!engines && <div>
        <spinner />
      </div>}

      {!!engines && engines.map((x, i) => <section key={i} style={{ margin: '10px 0 0 0' }}>
        {x.name + (x.recommended ? ' (Recommended)' : '')}

        {!!x.tooltip && <button className={styles.infoButton}>
          <image source={infoImage} className={styles.infoIcon} tooltip={x.tooltip} />
        </button>}

        <view style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }} />

        {!x.installed ?
          (x.recommended ? error : warn) :
          x.hasUpdate ? warn : check}

        {!x.installed && <>
          Not installed
        </>}

        {!!x.installed ? <>
          {'Installed Version ' + x.version}

          {!x.implicit && !x.recommended && <button onClick={() => Window.UninstallEnginePlugin(x.type)}>
            Uninstall
          </button>}

          {x.hasUpdate && <>
            {x.implicit ? <>Update ReactUnity to get the latest version</> :
              <button onClick={() => Window.InstallEnginePlugin(x.type)}>
                {'Update to ' + x.latestVersion}
              </button>}
          </>}
        </> : <>
          <button onClick={() => Window.InstallEnginePlugin(x.type)}>
            Install
          </button>
        </>}

      </section>)}
    </section>
  </scroll>;
}

Renderer.render(<App />);
