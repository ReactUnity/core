#!/usr/bin/env python3
"""Writes PROVENANCE.md next to the shipped binaries, from the pin in CMakeLists.txt.

    python provenance.py

A binary cannot carry a comment, and the pinned ref is not a version anyone can look up,
so the record has to sit beside the files. Generated rather than hand-written for the
same reason the pin is a SHA: there is exactly one place to change it, and no way for the
note and the build to disagree.

Run this whenever YOGA_COMMIT moves, and commit the result with the binaries.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
CMAKELISTS = os.path.join(HERE, "CMakeLists.txt")
DEST = os.path.join(REPO, "unity", "core", "Plugins", "yoga", "PROVENANCE.md")


def pin():
    with open(CMAKELISTS, encoding="utf-8") as fp:
        source = fp.read()
    repo = re.search(r'set\(YOGA_REPOSITORY\s+"([^"]+)"', source)
    commit = re.search(r'set\(YOGA_COMMIT\s+"([^"]+)"\s+CACHE\s+STRING\s+"[^"]*\(([^)]*)\)', source)
    if not repo or not commit:
        sys.exit("could not read YOGA_REPOSITORY / YOGA_COMMIT from %s" % CMAKELISTS)
    return repo.group(1).removesuffix(".git"), commit.group(1), commit.group(2)


def main():
    repo, commit, branch = pin()
    with open(DEST, "w", encoding="utf-8", newline="\n") as fp:
        fp.write(
            "\n".join(
                [
                    "# yoga",
                    "",
                    "Built from [%s](%s) at `%s`" % (repo, repo, commit),
                    "(branch `%s`), the commit [native/yoga/CMakeLists.txt](../../../../native/yoga/CMakeLists.txt)" % branch,
                    "pins.",
                    "",
                    "That branch is upstream `main` plus one commit, the layout fix for",
                    "[ReactUnity/core#89](https://github.com/ReactUnity/core/issues/89). What else the fork",
                    "does *not* carry, and why none of Yoga's Java, JNI or embind bindings are built here,",
                    "is in [native/yoga/README.md](../../../../native/yoga/README.md).",
                    "",
                    "Rebuild with the `native-yoga` workflow, which uploads one artifact per platform and",
                    "commits nothing. Regenerate this file with `python native/yoga/provenance.py` after",
                    "moving the pin, and commit it with the binaries.",
                    "",
                ]
            )
        )
    print("%s -> %s" % (commit[:8], os.path.relpath(DEST, REPO)))


if __name__ == "__main__":
    sys.exit(main())
