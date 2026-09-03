/*
 * Builds the vendored ExCSS.dll from a pinned commit of the ReactUnity fork.
 *
 * Why a build instead of a NuGet package: `@layer` and CSS nesting landed upstream in August
 * 2026, after the 4.3.2 release, and `@layer` is what Tailwind v4 wraps its whole output in.
 * Why a fork on top of that: three parser fixes ReactUnity needs, each an ordinary commit on
 * the `reactunity` branch with its own reasoning and its own tests, meant to go upstream:
 *
 *   1  a parser option that keeps declarations raw. ReactUnity's property set is not the
 *      web's -- `flex: 0` means grow 0 / shrink 0 / basis auto here, and `motion`, `audio`
 *      and `text-stroke` have no web counterpart -- so typed properties, value normalisation
 *      and shorthand expansion all have to be off.
 *   2  a nested `@media` or `@supports` becomes a real conditional rule instead of a style
 *      rule with no selector, which is what silently unguarded its declarations.
 *   3  nesting resolves against the text a rule was read from rather than its serialization,
 *      without which every rule nested inside an escaped class name was dropped.
 *
 * Move REPO and REF back to upstream once they carry all three.
 *
 * netstandard2.0 is the only target Unity can load. The source is C# 9 and builds on any
 * modern SDK; the artifact does not depend on which one.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/gkurt/ExCSS.git';
const BRANCH = 'reactunity';
const REF = 'e95ea9e6f35c99afed9b9e2ba8625f37aba48da7';
const UPSTREAM = 'https://github.com/TylerBrinks/ExCSS';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

const work = join(root, 'Logs/excss');
const checkout = join(work, 'src');
const dest = join(root, 'unity/core/Plugins/ExCSS/ExCSS.dll');

const run = (cmd: string, args: string[], cwd?: string) => execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: false });

if (existsSync(checkout)) rmSync(checkout, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

// A single-commit fetch: the history is not wanted and this pins exactly.
run('git', ['init', '--quiet', checkout]);
run('git', ['remote', 'add', 'origin', REPO], checkout);
run('git', ['fetch', '--quiet', '--depth', '1', 'origin', REF], checkout);
run('git', ['checkout', '--quiet', 'FETCH_HEAD'], checkout);

run('dotnet', ['build', 'src/ExCSS/ExCSS.csproj', '-c', 'Release', '-f', 'netstandard2.0', '--nologo'], checkout);

copyFileSync(join(checkout, 'src/ExCSS/bin/Release/netstandard2.0/ExCSS.dll'), dest);

// Provenance next to the binary, since a DLL cannot carry a comment and the pinned ref is not
// a version anyone can look up.
const url = REPO.replace(/\.git$/, '');

writeFileSync(
  join(dirname(dest), 'PROVENANCE.md'),
  [
    '# ExCSS',
    '',
    `Built from [${url}](${url}) at \`${REF}\` (branch \`${BRANCH}\`),`,
    'targeting `netstandard2.0`.',
    '',
    `This is a fork of [${UPSTREAM}](${UPSTREAM}), three commits ahead of it, each with its own`,
    'tests and meant to go upstream. Read their commit messages for why they exist; the short',
    'version is in [scripts/excss/build.mts](../../../../scripts/excss/build.mts), which is also',
    'where the reason for pinning a commit rather than a release is written down.',
    '',
    'Regenerate with `pnpm build:excss`, and commit the result.',
    '',
  ].join('\n'),
);

console.log(`ExCSS ${BRANCH} ${REF.slice(0, 8)} -> ${dest.slice(root.length + 1)}`);
