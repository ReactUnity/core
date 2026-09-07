/*
 * Builds the vendored ExCSS.dll from the ReactUnity fork checked out as the `vendor/excss` submodule.
 *
 * Why a build instead of a NuGet package: `@layer` and CSS nesting landed upstream in August
 * 2026, after the 4.3.2 release, and `@layer` is what Tailwind v4 wraps its whole output in.
 * Why a fork on top of that: seven parser changes ReactUnity needs, each an ordinary commit on
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
 *   4  a `@container` prelude is kept as written -- a container query is not a media query,
 *      and reading it as one lost the range syntax and `style()` -- and both `@container`
 *      and the new `@starting-style` rule parse nested in a style rule. Before this the
 *      sheet was rewritten before parsing to dress each block as a `@media`.
 *   5  `:where()`, as `:is()` with zero specificity.
 *   6  `@scope`, with both preludes kept as written, scoped rules in its block (`&` as
 *      `:where(:scope)`, a relative selector anchored to `:scope`, a bare declaration as a
 *      rule on the root) and nesting inside a style rule, where only the start selector nests.
 *   7  a `@supports` prelude the condition grammar cannot hold in full -- `selector()`, or any
 *      other function -- is kept as written, where it used to take the whole rule down with it.
 *
 * Why a submodule rather than a ref in this file: the pin then lives in one place git already
 * tracks, and the source is at hand when a parser bug needs reading. Point the submodule back
 * at upstream once it carries all seven.
 *
 * netstandard2.0 is the only target Unity can load. The source is C# 9 and builds on any
 * modern SDK; the artifact does not depend on which one.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const UPSTREAM = 'https://github.com/TylerBrinks/ExCSS';
const SUBMODULE = 'vendor/excss';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

const checkout = join(root, SUBMODULE);
const dest = join(root, 'unity/core/Plugins/ExCSS/ExCSS.dll');

const run = (cmd: string, args: string[], cwd: string) => execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: false });
const read = (cmd: string, args: string[], cwd: string) => execFileSync(cmd, args, { cwd, encoding: 'utf8', shell: false }).trim();

if (!existsSync(join(checkout, 'src/ExCSS/ExCSS.csproj'))) {
  throw new Error(`${SUBMODULE} is empty. Run \`git submodule update --init ${SUBMODULE}\` first.`);
}

// The binary has to be reproducible from what the provenance names, so only a clean commit builds.
if (read('git', ['status', '--porcelain'], checkout)) {
  throw new Error(`${SUBMODULE} has uncommitted changes. Commit them to the fork first.`);
}

const ref = read('git', ['rev-parse', 'HEAD'], checkout);
const repo = read('git', ['config', '--file', '.gitmodules', `submodule.${SUBMODULE}.url`], root).replace(/\.git$/, '');
const branch = read('git', ['config', '--file', '.gitmodules', `submodule.${SUBMODULE}.branch`], root);

run('dotnet', ['build', 'src/ExCSS/ExCSS.csproj', '-c', 'Release', '-f', 'netstandard2.0', '--nologo'], checkout);

copyFileSync(join(checkout, 'src/ExCSS/bin/Release/netstandard2.0/ExCSS.dll'), dest);

// Provenance next to the binary, since a DLL cannot carry a comment and the pinned ref is not
// a version anyone can look up.
writeFileSync(
  join(dirname(dest), 'PROVENANCE.md'),
  [
    '# ExCSS',
    '',
    `Built from [${repo}](${repo}) at \`${ref}\` (branch \`${branch}\`), the commit the`,
    `\`${SUBMODULE}\` submodule records, targeting \`netstandard2.0\`.`,
    '',
    `This is a fork of [${UPSTREAM}](${UPSTREAM}), seven commits ahead of it, each with its own`,
    'tests and meant to go upstream. Read their commit messages for why they exist; the short',
    'version is in [scripts/excss/build.mts](../../../../scripts/excss/build.mts), which is also',
    'where the reason for pinning a commit rather than a release is written down.',
    '',
    `Regenerate with \`pnpm build:excss\` after moving the submodule, and commit both.`,
    '',
  ].join('\n'),
);

console.log(`ExCSS ${branch} ${ref.slice(0, 8)} -> ${dest.slice(root.length + 1)}`);
