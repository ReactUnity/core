// A file rather than a `lint-staged` key in package.json, and a function rather than a
// string, for one reason: a function task's return value is run verbatim, while a string
// task gets every staged path appended to it.
//
// That append is fine until a commit is large. Renaming full-sample/ to kitchen-sink/
// staged 339 paths, many of them like
// `kitchen-sink/Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF - Drop Shadow.mat.meta`,
// and the command line went past the Windows CreateProcess limit of 32767 characters:
//
//   ✖ biome check --write ...: The command line is too long.
//
// lint-staged reverts cleanly when a task fails, so nothing was lost -- but the hook
// rejected the commit, and it would reject any comparably large one. `--staged` has Biome
// read the index itself, so the argument list stays constant no matter how much is staged.
//
// docs/ keeps its own nested lint-staged config; this one does not affect it.
export default {
  '*': () => 'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --staged',
};
