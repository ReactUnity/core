#!/usr/bin/env node

import * as fse from 'fs-extra';
import * as path from 'path';
import * as cp from 'child_process';

const cwd = process.cwd();

async function isDirEmpty(dirname) {
  const files = await fse.readdir(dirname);
  return files.length === 0;
}


async function create() {
  const newProjectPath = path.join(cwd, 'react');
  await fse.mkdirp(newProjectPath);

  const empty = await isDirEmpty(newProjectPath);

  if (!empty) {
    throw new Error('The directory `react` already exist and is not empty.');
  }

  await fse.copy(path.join(__dirname, 'scaffold'), newProjectPath, { recursive: true });


  var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  try {
    cp.spawnSync(npm, ['install'], {
      cwd: newProjectPath
    });
  } catch (err) {
    console.error('Could not install node modules. You need to manually go to the project folder and run `npm install`.');
    console.error(err);
  }

  console.log('Successfully created react-unity project at ' + newProjectPath);
}

create().catch(err => {
  console.error(err);
});
