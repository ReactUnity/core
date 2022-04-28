const fs = require('fs');

fs.writeFileSync('./src/version.ts', `export const version = '${process.env.npm_package_version}';\n`);
