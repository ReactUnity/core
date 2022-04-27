fs.writeFileSync('./src/version.ts', `export const appVersion = '${nextRelease.version}';\n`);
import fs from 'fs';

fs.writeFileSync('./src/version.ts', `export const version = '${process.env.npm_package_version}';\n`);
