#!/usr/bin/env python3
"""Does the built library export every name the C# layer P/Invokes?

    python check-exports.py [path-to-yoga.dll]

The wanted set is read straight out of `unity/core/Runtime/Yoga/Native.cs`, which is
committed and has no conditional declarations -- so unlike com.reactunity.quickjs
there is nothing to snapshot into a checked-in surface file. The one `#if` in there
picks the library *name* (`__Internal` on iOS and WebGL), not which functions exist.

Only one direction is worth failing on here. Names C# calls that the library does not
export are a crash at the first layout; exports nothing calls are just the rest of
Yoga's C API, which we neither wrote nor can trim.

Reads PE, ELF, Mach-O and static archives via `native/exports.py`, so every leg of
the build matrix is checkable from whichever runner produced it.

Exits non-zero if anything is missing, so it can gate CI.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, os.path.dirname(HERE))
from exports import read_exports  # noqa: E402  (needs the path above)

NATIVE_CS = os.path.join(REPO, "unity", "core", "Runtime", "Yoga", "Native.cs")
DEFAULT_LIB = os.path.join(HERE, "build", "Release", "yoga.dll")

DECL = re.compile(
    r"\[DllImport\((?P<args>[^\]]*)\)\]\s*"
    r"(?:\[[^\]]*\]\s*)*"
    r"(?:public|internal|private|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"[^;(]*?\b(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)
ENTRY_POINT = re.compile(r"""EntryPoint\s*=\s*(?:nameof\(\s*([A-Za-z_][\w.]*)\s*\)|"([^"]*)")""")


def wanted_names():
    with open(NATIVE_CS, encoding="utf-8-sig") as fp:
        source = fp.read()
    names = {}
    for d in DECL.finditer(source):
        # An EntryPoint renames the symbol, so the member name is not always what
        # the linker is asked for. None are renamed today; the day one is, the
        # check should follow it rather than quietly look for the wrong name.
        ep = ENTRY_POINT.search(d.group("args"))
        symbol = (ep.group(1) or ep.group(2)).rsplit(".", 1)[-1] if ep else d.group("name")
        names.setdefault(symbol, d.group("name"))
    return names


def main():
    lib = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_LIB
    if not os.path.exists(lib):
        sys.exit("no library at %s -- build it first (see README.md)" % lib)

    fmt, exports = read_exports(lib)
    if not exports:
        sys.exit("no exports found in %s (read as %s)" % (lib, fmt))

    wanted = wanted_names()
    if not wanted:
        sys.exit("no DllImport declarations found in %s -- has it moved?" % NATIVE_CS)
    missing = sorted(n for n in wanted if n not in exports)

    print("P/Invoke names in Native.cs: %d" % len(wanted))
    print("exports in %s (%s): %d" % (os.path.basename(lib), fmt, len(exports)))
    print("satisfied: %d, missing: %d" % (len(wanted) - len(missing), len(missing)))
    if missing:
        print("\nnamed by C#, not exported:")
        for n in missing:
            member = wanted[n]
            print("  %-40s%s" % (n, "" if member == n else "  (declared as %s)" % member))
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
