#!/usr/bin/env node

import * as chalk from 'chalk';
import * as cp from 'child_process';
import { Command, Option } from 'commander';
import * as fse from 'fs-extra';
import * as path from 'path';

const program = new Command();

program
  .option('-u, --unity', 'Create Unity project from scratch', false)
  .addOption(new Option('-i, --install [manager]', 'Install packages with selected').choices(['npm', 'yarn', 'false']).default(false));

program.parse();
const options: {
  install?: 'npm' | 'yarn' | 'false' | true | false;
  unity?: boolean;
} = program.opts();

const chalkPath = chalk.blue.underline;
const chalkCmd = chalk.yellow;
const chalkSuccess = chalk.green;
const chalkError = chalk.red

const cwd = process.cwd();
const install = options.install === 'false' ? false : options.install === true ? 'yarn' : options.install;
const createUnity = options.unity;

let targetDir = program.args[0] || 'react';

const unityFolderName = 'react-unity-project';
const reactFolderName = targetDir;

const unityDir = createUnity ? path.resolve(cwd, unityFolderName) : cwd;
const reactDir = path.resolve(unityDir, reactFolderName);
const packageJsonPath = path.join(reactDir, 'package.json');

const unityScaffold = path.join(__dirname, 'scaffold');
const reactScaffold = path.join(__dirname, 'scaffold/react');
const reactScaffoldNodeModules = path.join(reactScaffold, 'node_modules');

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
  await fse.copy(scaffoldDir, targetDir, { recursive: true, filter: src => !src.includes(reactScaffoldNodeModules) });
}

async function runOpenUPM() {
  const cmd = 'npx' + (process.platform === 'win32' ? '.cmd' : '');
  return await run_script(cmd, ['-y', 'openupm-cli', 'add', 'com.reactunity.core'], { cwd: unityDir });
}

async function create() {
  try {
    if (createUnity) {
      await copyScaffold(unityScaffold, unityDir);
      await runOpenUPM();
    } else {
      await copyScaffold(reactScaffold, reactDir);
    }
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


  const updateFailCallback = () => {
    console.error(`Updating node modules ${chalkError('failed')}.`);
    console.log(`You can update them manually:`);
    console.log(`- Go to project folder at ${chalkPath(reactDir)}`);
    console.log(`- Run ${chalkCmd('npx npm-check-updates -u')}`);
    console.log();
  };

  try {
    console.log(chalk.underline(`Starting package updates`));
    console.log();
    const npx = 'npx' + (process.platform === 'win32' ? '.cmd' : '');
    const npxCode = await run_script(npx, ['-y', 'npm-check-updates', '-u', '--packageFile', packageJsonPath], { cwd: reactDir });
    if (npxCode !== 0) updateFailCallback();
  } catch (err) {
    console.error(err);
    updateFailCallback();
  }


  if (install) {
    const installFailCallback = () => {
      console.error(`Installing node modules ${chalkError('failed')}.`);
      console.log(`You can install them manually:`);
      console.log(`- Go to project folder at ${chalkPath(reactDir)}`);
      console.log(`- Run ${chalkCmd('npm install')} or ${chalkCmd('yarn')}`);
      console.log();
      process.exit();
    };

    const cmd = install + (process.platform === 'win32' ? '.cmd' : '');

    try {
      console.log(chalk.underline(`Starting ${install} install`));
      console.log();
      const code = await run_script(cmd, ['install'], { cwd: reactDir });

      if (code !== 0) installFailCallback();
    } catch (err) {
      console.error(err);
      installFailCallback();
    }
  }

  console.log(`Successfully created the project. Next steps you should do manually:`);
  console.log(`- Go to project folder at ${chalkPath(reactDir)}`);
  console.log(`- Update packages to their latest versions in ${chalkPath(packageJsonPath)}`);
  if (!install) console.log(`- Run ${chalkCmd('yarn')} to install packages`);
  console.log(`- Try running ${chalkCmd('yarn start')} to start the project and test it inside Unity`);
}

create().catch(err => {
  console.error(err);
});

function run_script(command: string, args: string[], options: cp.SpawnOptionsWithoutStdio) {
  return new Promise((resolve, reject) => {
    try {
      const child = cp.spawn(command, args, options);

      child.stdout.setEncoding('utf8');
      child.stdout.on('data', function (data) {
        console.log(data);
      });

      child.stderr.setEncoding('utf8');
      child.stderr.on('data', function (data) {
        console.error(data);
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
