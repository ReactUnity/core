#!/usr/bin/env node

import * as fse from 'fs-extra';
import * as path from 'path';
import * as cp from 'child_process';
import * as chalk from 'chalk';

const chalkPath = chalk.blue.underline;
const chalkCmd = chalk.yellow;
const chalkSuccess = chalk.green;
const chalkError = chalk.red

const cwd = process.cwd();
const skipInstall = process.argv.includes('--skip-install') || process.argv.includes('-s');
const createUnity = process.argv.includes('--unity') || process.argv.includes('-u');

const unityFolderName = 'react-unity-project';
const reactFolderName = 'react';

const unityDir = createUnity ? path.resolve(cwd, unityFolderName) : cwd;
const reactDir = path.resolve(unityDir, reactFolderName);
const createdDir = createUnity ? unityDir : reactDir;

const unityScaffold = path.join(__dirname, 'unity-scaffold');
const reactScaffold = path.join(__dirname, 'scaffold');

async function isDirEmpty(dirname) {
  const files = await fse.readdir(dirname);
  return files.length === 0;
}

async function copyScaffold(scaffoldDir: string, targetDir: string) {
  await fse.mkdirp(targetDir);

  const empty = await isDirEmpty(targetDir);

  if (!empty) {
    throw new Error(`${chalkError('Error')}: The directory already exist and is not empty: ${chalkPath(targetDir)}`);
  }

  // Copy project template
  await fse.copy(scaffoldDir, targetDir, { recursive: true });


  // Workaround for npm deleting .gitignore file
  const gitignoreSrcPath = path.join(targetDir, 'gitignore');
  const gitignoreDestPath = path.join(targetDir, '.gitignore');
  await fse.move(gitignoreSrcPath, gitignoreDestPath);
}


async function create() {
  try {
    if (createUnity) await copyScaffold(unityScaffold, unityDir);
    await copyScaffold(reactScaffold, reactDir);
  } catch (err) {
    console.log();
    console.error(`Copying files ${chalkError('failed')}`);
    console.error(err);
    console.log();
    process.exit();
  }

  console.log();
  console.log(`Copying files ${chalkSuccess('completed')}`);
  console.log();

  const successCallback = () => {
    console.log(`${chalkSuccess('Successfully created')} project at ${chalkPath(createdDir)}`);
    console.log();
    process.exit();
  };

  const npmFailCallback = () => {
    console.error(`Installing node modules ${chalkError('failed')}.`);
    console.log(`You can install them manually:`);
    console.log(`- Go to project folder at ${chalkPath(reactDir)}`);
    console.log(`- Run ${chalkCmd('npm install')}`);
    console.log();
    process.exit();
  };

  if (skipInstall) {
    console.log(`Skipped installing node modules. You can install them manually by:`);
    console.log(`- Go to project folder at ${chalkPath(reactDir)}`);
    console.log(`- Run ${chalkCmd('npm install')}`);
  } else {
    // Install npm modules
    var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    try {
      console.log(chalk.underline('Starting NPM install'));
      console.log();
      const code = await run_script(npm, ['install'], { cwd: reactDir });

      if (code === 0) successCallback();
      else npmFailCallback();
    } catch (err) {
      console.error(err);
      npmFailCallback();
    }
  }
}

create().catch(err => {
  console.error(err);
});

function run_script(command: string, args: string[], options: cp.SpawnOptionsWithoutStdio) {
  return new Promise((resolve, reject) => {
    try {
      var child = cp.spawn(command, args, options);

      var scriptOutput = '';

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', function (data) {
        console.log(data);

        data = data.toString();
        scriptOutput += data;
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', function (data) {
        console.error(data);

        data = data.toString();
        scriptOutput += data;
      });

      child.on('error', function (err) {
        reject(err);
      });

      child.on('close', function (code) {
        resolve(code);
      });
    } catch (err) {
      reject(err);
    }
  });
}
