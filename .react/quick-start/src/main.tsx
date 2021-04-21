import { ReactUnity, Renderer } from '@reactunity/renderer/editor';
import * as React from 'react';
import { useEffect, useState } from 'react';
import checkImage from './assets/check.png';
import errorImage from './assets/close.png';
import style from './index.module.scss';

const Window = Globals.Window as ReactUnity.Editor.QuickStartWindow;

const vsCodePath = 'vscode://file/{path}/';
const filePath = 'file:{path}';


function App() {
  const [nodeVersion, setNodeVersion] = useState(Window.NodeVersion);
  const [projectPath, setProjectPath] = useState('');
  const [canvasExists, setCanvasExists] = useState(null);

  const [packageVersion, setPackageVersion] = useState(Window.PackageVersion);
  const [latestVersion, setLatestVersion] = useState(Window.LatestVersion);
  const [hasUpdate, setHasUpdate] = useState(Window.HasUpdate);

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

  const check = <image source={checkImage} className={style.checkIcon} />
  const warn = <image source={errorImage} className={style.warnIcon} />

  return <scroll className={style.host}>
    <head>
      <image source="res://ReactUnity/editor/logo" className={style.logo}></image>

      <h1>React Unity</h1>
      <h2>Quick Start</h2>
    </head>

    {nodeVersion >= 0 &&
      <section className={nodeOk ? style.success : style.error}>
        {nodeVersion >= Window.RequiredNodeVersion ?
          <row>
            {check}
            <text>Node.js version {nodeVersion} is installed</text>
          </row> :
          <>
            <row>
              {warn}
              {nodeVersion === 0 ?
                <text>Node.js does not seem to be installed on this computer. Install it or add it to PATH if it is already installed.</text> :
                <text>Node.js {nodeVersion} is installed but minimum recommended version is {Window.RequiredNodeVersion}.</text>}
            </row>

            <actions>
              <anchor url={Window.NodeUrl}>Install</anchor>
            </actions>
          </>}
      </section>}

    <section className={canvasOk ? style.success : style.error}>
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
            <button onClick={() => Window.UpdatePackage(latestVersion)}>Update</button>
          </actions>
        </>}
    </section>

    <section className={projectOk ? style.success : style.error}>
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

    <section className={canvasOk ? style.success : style.error}>
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
            {warn}
            ReactUnity Canvas does not exist in scene
          </row>
          <actions>
            <button onClick={createCanvas}>Create</button>
          </actions>
        </>}
    </section>
  </scroll>;
}

Renderer.render(<App />, RootContainer, null);
