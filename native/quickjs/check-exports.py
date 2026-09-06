#!/usr/bin/env python3
"""Gate 0 exit check: does the built library export every name the C# layer P/Invokes?

    python check-exports.py [path-to-quickjs.dll]

Diffs the library's export table against the live P/Invoke set (see pinvoke.py) in
both directions -- names C# calls that we do not export, and shim functions we export
that nothing calls. The second direction is not cosmetic: 26 dead functions sat in
the vendored shim precisely because nothing looked.

Reads every artifact shape we ship -- PE, ELF, Mach-O and static archives -- via
`native/exports.py`, so it covers all twelve rather than only the Windows ones.

See `check-signatures.py` for the other half -- whether the declarations that *are*
satisfied actually match the header.

Exits non-zero if anything is missing or stale, so it can gate CI.
"""
import os
import re
import sys

import pinvoke

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
from exports import read_exports  # noqa: E402  (needs the path above)

DEFAULT_DLL = os.path.join(HERE, "build", "Release", "quickjs.dll")

DECL = re.compile(
    r"\[DllImport\((?P<args>[^\]]*)\)\]\s*"
    r"(?:\[[^\]]*\]\s*)*"
    r"(?:public|internal|private|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"[^;(]*?\b(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)


SURFACE = "pinvoke-native.txt"
SURFACE_WHAT = "The symbols com.reactunity.quickjs P/Invokes from the native library."


def wanted_names():
    """The live surface where Unity has generated the .csproj, else the committed one."""
    if not pinvoke.have_projects():
        return {n: {SURFACE} for n in pinvoke.read_surface(SURFACE)}
    wanted = live_names()
    missing, extra = pinvoke.surface_drift(SURFACE, wanted)
    if missing or extra:
        print("%s is out of date -- rerun with --write" % SURFACE)
        for n in missing:
            print("  + %s" % n)
        for n in extra:
            print("  - %s" % n)
        sys.exit(1)
    return wanted


def live_names():
    wanted = {}
    for _proj, defines, sources in pinvoke.unity_projects():
        for full in sources:
            for d in DECL.finditer(pinvoke.live_source(full, defines)):
                args = d.group("args")
                if "JSBDLL" not in args:  # e.g. declarations bound to the WebGL jslib
                    continue
                symbol = pinvoke.entry_point(args, d.group("name"))
                wanted.setdefault(symbol, set()).add(os.path.relpath(full, pinvoke.REPO))
    return wanted


def main():
    args = [a for a in sys.argv[1:] if a != "--write"]
    if "--write" in sys.argv:
        pinvoke.write_surface(SURFACE, live_names(), SURFACE_WHAT)
        return 0

    dll = args[0] if args else DEFAULT_DLL
    if not os.path.exists(dll):
        sys.exit("no library at %s -- build it first (see README.md)" % dll)
    fmt, exports = read_exports(dll)
    if not exports:
        sys.exit("no exports found in %s (read as %s)" % (dll, fmt))

    wanted = wanted_names()
    missing = sorted(n for n in wanted if n not in exports)
    # The other direction: shim functions nothing names any more. All 241 atom
    # accessors come from one macro over quickjs-atom.h, so they are exempt.
    stale = sorted(
        n
        for n in exports
        if (n.startswith("JSB_") or n.startswith("jsb_")) and not n.startswith("JSB_ATOM_") and n not in wanted
    )

    print("live P/Invoke names bound to JSBDLL: %d" % len(wanted))
    print("exports in %s (%s): %d" % (os.path.basename(dll), fmt, len(exports)))
    print("satisfied: %d, missing: %d, stale shim exports: %d" % (len(wanted) - len(missing), len(missing), len(stale)))
    if missing:
        print("\nnamed by C#, not exported:")
        for n in missing:
            print("  %-32s <- %s" % (n, ", ".join(sorted(wanted[n]))))
    if stale:
        print("\nexported by the shim, named by nothing -- delete from src/:")
        for n in stale:
            print("  %s" % n)
    return 1 if (missing or stale) else 0


if __name__ == "__main__":
    sys.exit(main())
