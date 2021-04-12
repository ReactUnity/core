import { Renderer } from '@reactunity/renderer/editor';
import * as React from 'react';
import { useEffect, useState } from 'react';
import style from './index.module.scss';

const Editor = Globals.Editor as any;

const vsCodePath = 'vscode://file/{path}/';


function App() {
  const [nodeVersion, setNodeVersion] = useState(Editor.NodeVersion);
  const [projectPath, setProjectPath] = useState('');
  const [canvasExists, setCanvasExists] = useState(null);

  useEffect(() => {
    if (nodeVersion < 0) {
      Editor.GetNodeVersion(ver => setNodeVersion(ver));
    }
  }, [nodeVersion, setNodeVersion]);

  useEffect(() => {
    setProjectPath(Editor.GetProjectPath());
  }, [setProjectPath]);

  useEffect(() => {
    setCanvasExists(Editor.CanvasExistsInScene());
  }, [setCanvasExists]);

  const nodeOk = nodeVersion > Editor.RequiredNodeVersion;
  const projectOk = !!projectPath;
  const canvasOk = !!canvasExists;

  const createCanvas = () => {
    Editor.CreateCanvas();
    setCanvasExists(true);
  };

  return <scroll className={style.host}>
    <head>
      <image source="res://ReactUnity/editor/logo" className={style.logo}></image>

      <h1>React Unity</h1>
      <h2>Quick Start</h2>
    </head>

    <section className={nodeOk ? style.success : style.error}>
      {nodeVersion === 0 ?
        <>
          <row>
            Node.js does not seem to be installed on this computer.
            Install it or add it to PATH if it is already installed.
        </row>

          <row>
            It can be installed at <anchor url={Editor.NodeUrl}>{Editor.NodeUrl}</anchor>
          </row>
        </> :
        <row>
          Node.js version
        <b>{nodeVersion}</b>
        </row>}
    </section>

    <section className={projectOk ? style.success : style.error}>
      {projectPath && <>
        <row>
          Project exists at path:
          <b>{projectPath}</b>
        </row>
        <actions>
          <anchor url={vsCodePath.replace('{path}', projectPath)}>Open in VSCode</anchor>
          <button onClick={() => UnityEditor.EditorUtility.RevealInFinder(projectPath)}>Show in file explorer</button>
        </actions>
      </>}
    </section>

    <section className={canvasOk ? style.success : style.error}>
      {canvasOk ?
        <>
          <row>
            ReactUnity Canvas exists in scene
          </row>
        </> :
        <>
          <row>
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
