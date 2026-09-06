# yoga

Built from [https://github.com/ReactUnity/yoga](https://github.com/ReactUnity/yoga) at `6a179416a7972ab1e69af89e7254cb4e3be23cf4`
(branch `reactunity`), the commit [native/yoga/CMakeLists.txt](../../../../native/yoga/CMakeLists.txt)
pins.

That branch is upstream `main` plus one commit, the layout fix for
[ReactUnity/core#89](https://github.com/ReactUnity/core/issues/89). What else the fork
does *not* carry, and why none of Yoga's Java, JNI or embind bindings are built here,
is in [native/yoga/README.md](../../../../native/yoga/README.md).

Rebuild with the `native-yoga` workflow, which uploads one artifact per platform and
commits nothing. Regenerate this file with `python native/yoga/provenance.py` after
moving the pin, and commit it with the binaries.
