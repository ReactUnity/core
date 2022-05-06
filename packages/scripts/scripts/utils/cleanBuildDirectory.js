// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');
const fs = require('fs-extra');
const paths = require('../../config/paths');

function cleanBuildDirectory() {
  try {
    if (fs.existsSync(paths.appManifest)) {
      // Clean only the files inside the asset-manifest so that we avoid cleaning files belonging to user
      const manifestContent = fs.readFileSync(paths.appManifest, 'utf8');
      const manifest = JSON.parse(manifestContent);

      const keys = Object.keys(manifest.files);

      for (const key of keys) {
        const file = manifest.files[key];
        const filePath = path.join(paths.appBuild, file);
        const metaFile = filePath + '.meta';

        fs.removeSync(filePath);
        fs.removeSync(metaFile);
      }

      const manifestMeta = paths.appManifest + '.meta';
      fs.removeSync(paths.appManifest);
      fs.removeSync(manifestMeta);

      cleanEmptyFoldersRecursively(null, paths.appBuild, true);

      return;
    }
  } catch (err) { }

  console.log('Skipped clearing output directory because asset manifest was not found. Please clean the output directory manually if necessary.');
}


function cleanEmptyFoldersRecursively(parent, folder, skipFirst) {
  if (!fs.existsSync(folder)) return;
  var isDir = fs.statSync(folder).isDirectory();
  if (!isDir) return;

  var files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function (file) {
      var fullPath = path.join(folder, file);
      cleanEmptyFoldersRecursively(folder, fullPath, false);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(folder);
  }

  if (!skipFirst && files.length == 0) {
    fs.rmdirSync(folder);

    if (parent) {
      const folderName = path.basename(folder);
      const dirMeta = path.join(parent, folderName + '.meta');
      fs.removeSync(dirMeta);
    }
    return;
  }
}

module.exports.cleanBuildDirectory = cleanBuildDirectory;
