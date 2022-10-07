import { Renderer } from '@reactunity/renderer';
import { useEffect, useState } from 'react';
import { check, error, info, packageName, SetIsLoadingContext, warn, Window } from './common';
import { EnginePlugins } from './engine-plugins';
import styles from './index.module.scss';
import { AdditionalPlugins } from './unity-plugins';

const vsCodePath = 'vscode://file/{path}/';
const filePath = 'file:{path}';
const createLearnUrl = 'https://github.com/ReactUnity/create#readme';
const fullProjectPath = Window.GetProjectFullPath();

function App() {
  const [nodeVersion, setNodeVersion] = useState(Window.NodeVersion);
  const [projectPath, setProjectPath] = useState('');
  const [canvasExists, setCanvasExists] = useState(null);

  const [packageVersion, setPackageVersion] = useState(Window.PackageVersion);
  const [latestVersion, setLatestVersion] = useState(Window.LatestVersion);
  const [hasUpdate, setHasUpdate] = useState(Window.HasUpdate);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (nodeVersion < 0) {
      Window.GetNodeVersion(ver => setNodeVersion(ver));
    }
  }, [nodeVersion, setNodeVersion]);

  useEffect(() => {
    if (!packageVersion) {
      Window.CheckVersion(packageName, (cur, latest, hasUpdate) => {
        setPackageVersion(cur);
        setLatestVersion(latest);
        setHasUpdate(hasUpdate);
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

  return <SetIsLoadingContext.Provider value={setIsLoading}>
    <scroll className={styles.host}>
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
                {warn}
                {nodeVersion === 0 ?
                  <text>Node.js was not detected in this computer. Make sure it is installed or ignore this message if it already is.</text> :
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
              {warn}
              <text>ReactUnity is out of date. Current version: {packageVersion}, Latest version: {latestVersion}</text>
            </row>
            <actions>
              <button onClick={() => Window.InstallScopedPlugin(packageName)}>Update</button>
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

        {!projectOk && <>
          <row>
            {warn}
            <text>React project does not exist at the default path.</text>

            <button className={styles.infoButton}
              tooltip={`The default project path is "${fullProjectPath}".\nYou can ignore this message if you have a project created in another path.`}>
              {info}
            </button>
          </row>

          <actions>
            <anchor url={createLearnUrl}>
              Learn How To Create
            </anchor>
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

      <EnginePlugins />

      <AdditionalPlugins />

      {isLoading && <view class={styles.loadingOverlay}>
        <spinner />
      </view>}
    </scroll>
  </SetIsLoadingContext.Provider>;
}

Renderer.render(<App />);
