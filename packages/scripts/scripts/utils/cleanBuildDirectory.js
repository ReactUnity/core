// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

const path = require('node:path');
const fs = require('fs-extra');
const paths = require('../../config/paths');

function cleanBuildDirectory(cleanMetaFiles = false) {
  try {
    if (fs.existsSync(paths.appManifest)) {
      // Clean only the files inside the asset-manifest so that we avoid cleaning files belonging to user
      const manifestContent = fs.readFileSync(paths.appManifest, 'utf8');
      const manifest = JSON.parse(manifestContent);

      const keys = Object.keys(manifest.files);

      const metaFiles = [];

      for (const key of keys) {
        const file = manifest.files[key];
        const filePath = path.join(paths.appBuild, file);
        const metaFile = `${filePath}.meta`;

        fs.removeSync(filePath);

        if (fs.existsSync(metaFile)) {
          if (cleanMetaFiles) fs.removeSync(metaFile);
          else metaFiles.push(metaFile);
        }
      }

      const manifestMeta = `${paths.appManifest}.meta`;
      fs.removeSync(paths.appManifest);

      if (fs.existsSync(manifestMeta)) {
        if (cleanMetaFiles) fs.removeSync(manifestMeta);
        else metaFiles.push(manifestMeta);
      }

      cleanEmptyFoldersRecursively(null, paths.appBuild, true);

      return metaFiles;
    }
  } catch (err) {
    console.log(
      'Skipped clearing output directory because asset manifest was not found. Please clean the output directory manually if necessary.',
    );
    return [];
  }
}

function cleanUnusedMetaFiles(metaFiles) {
  try {
    for (const metaFile of metaFiles) {
      try {
        if (!fs.existsSync(metaFile)) continue;

        const nonMetaFile = metaFile.replace(/\.meta$/, '');
        if (fs.existsSync(nonMetaFile)) continue;

        fs.removeSync(metaFile);
      } catch (err) {
        console.log(`Error while cleaning meta file: ${metaFile}`);
      }
    }
  } catch (err) {}
}

function cleanEmptyFoldersRecursively(parent, folder, skipFirst) {
  if (!fs.existsSync(folder)) return;
  const isDir = fs.statSync(folder).isDirectory();
  if (!isDir) return;

  let files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach((file) => {
      const fullPath = path.join(folder, file);
      cleanEmptyFoldersRecursively(folder, fullPath, false);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folder);
  }

  if (!skipFirst && !files.length) {
    fs.rmdirSync(folder);

    if (parent) {
      const folderName = path.basename(folder);
      const dirMeta = path.join(parent, `${folderName}.meta`);
      fs.removeSync(dirMeta);
    }
    return;
  }
}

module.exports.cleanBuildDirectory = cleanBuildDirectory;
module.exports.cleanUnusedMetaFiles = cleanUnusedMetaFiles;
