import fs from 'fs';
import path from 'path';

const folder = '../../Tests/Runtime/Resources/ReactUnity/tests/injectable';

const replaceStart = `/*INJECTABLE_START*/`;
const replaceEnd = `/*INJECTABLE_END*/`;

const replacePath =  path.resolve(process.cwd(), 'scripts', 'injected-code.js');
const replaceWith = fs.readFileSync(replacePath, { encoding: 'utf8' });

const filePath = path.resolve(process.cwd(), folder, 'index.js');
const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

const rerenderPath = path.resolve(process.cwd(), folder, 'rerender.js');


const startIndex = fileContent.indexOf(replaceStart) + replaceStart.length;
const endIndex = fileContent.indexOf(replaceEnd);


const newContent = [fileContent.substring(0, startIndex), replaceWith, fileContent.substring(endIndex)].join('\n');
fs.writeFileSync(filePath, newContent, { encoding: 'utf8' });

fs.writeFileSync(rerenderPath, replaceWith, { encoding: 'utf8' });
