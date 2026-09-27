# ExCSS

Built from [https://github.com/ReactUnity/ExCSS](https://github.com/ReactUnity/ExCSS) at `47a58bb70d6fc041ae141a840a6b48ce0fd9174e` (branch `reactunity`), the commit the
`vendor/excss` submodule records, targeting `netstandard2.0`.

This is a fork of [https://github.com/TylerBrinks/ExCSS](https://github.com/TylerBrinks/ExCSS), carrying the parser changes ReactUnity needs,
each with its own tests and meant to go upstream. Read their commit messages for why they
exist; the short version is in
[scripts/excss/build.mts](../../../../scripts/excss/build.mts), which is also where the reason
for pinning a commit rather than a release is written down.

Regenerate with `pnpm build:excss` after moving the submodule, and commit both.
