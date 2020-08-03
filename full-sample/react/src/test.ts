// Edit this file only if you know what you are doing

import mocha from 'mocha/browser-entry';
import mochaLib from 'mocha/lib/mocha';
import chai from 'chai';

mocha.setup({ noHighlighting: true, ui: 'bdd' });
mocha.reporter('spec');
Object.assign(global, mochaLib);
Object.assign(global, chai);

// Find and load all `.spec.ts` and `.spec.tsx` files
const context = (require as any).context('./', true, /\.spec\.tsx?$/);
context.keys().map(context);

mocha.run();

(module as any)?.hot?.accept();
