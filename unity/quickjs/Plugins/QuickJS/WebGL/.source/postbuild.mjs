import { readFileSync, writeFileSync } from 'fs';

const file = readFileSync('../jsbplugin.jslib', 'utf8');

const replaced = file.replace(
  /makeDynCallMacro\s*\(\s*'(\w+)'\s*,\s*([a-zA-Z0-9_$]+)\s*\)/g,
  (match, signature, func) => `{{{ makeDynCall('${signature}', '${func}') }}}`
);

writeFileSync('../jsbplugin.jslib', replaced, 'utf8');
