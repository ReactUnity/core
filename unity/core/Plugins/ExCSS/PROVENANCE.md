# ExCSS

Built from [https://github.com/ReactUnity/ExCSS](https://github.com/ReactUnity/ExCSS) at `02d64fc376b7eaf5280fe2a4dab05e1bf6e976d1` (branch `reactunity`), the commit the
`vendor/excss` submodule records, targeting `netstandard2.0`.

This is a fork of [https://github.com/TylerBrinks/ExCSS](https://github.com/TylerBrinks/ExCSS), six commits ahead of it, each with its own
tests and meant to go upstream. Read their commit messages for why they exist; the short
version is in [scripts/excss/build.mts](../../../../scripts/excss/build.mts), which is also
where the reason for pinning a commit rather than a release is written down.

Regenerate with `pnpm build:excss` after moving the submodule, and commit both.
