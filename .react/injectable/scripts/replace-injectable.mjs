import fs from 'fs';
import path from 'path';

const folder = '../../Tests/Runtime/Resources/ReactUnity/tests/injectable';

const replaceStart = `/* INJECTABLE_START */`;
const replaceEnd = `/* INJECTABLE_END */`;

const replaceWith = `
var React = react;
var ReactUnityRenderer = ReactUnity.Renderer;
var Renderer = ReactUnity.Renderer;

/*INJECT_CODE*/
`;

const filePath = path.resolve(process.cwd(), folder, 'index.js');

const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

const startIndex = fileContent.indexOf(replaceStart) + replaceStart.length;
const endIndex = fileContent.indexOf(replaceEnd);


const newContent = [fileContent.substring(0, startIndex), replaceWith, fileContent.substring(endIndex)].join('\n');

fs.writeFileSync(filePath, newContent, { encoding: 'utf8' });
