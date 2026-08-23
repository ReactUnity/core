#!/usr/bin/env python3
"""Gate 0 exit check: does the built library export every name the C# layer P/Invokes?

    python check-exports.py [path-to-quickjs.dll]

Diffs `dumpbin -exports` against the live P/Invoke set (see pinvoke.py) in both
directions -- names C# calls that we do not export, and shim functions we export
that nothing calls. The second direction is not cosmetic: 26 dead functions sat in
the vendored shim precisely because nothing looked.

See `check-signatures.py` for the other half -- whether the declarations that *are*
satisfied actually match the header.

Exits non-zero if anything is missing or stale, so it can gate CI.
"""
import glob
import os
import re
import shutil
import subprocess
import sys

import pinvoke

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DLL = os.path.join(HERE, "build", "Release", "quickjs.dll")

DECL = re.compile(
    r"\[DllImport\((?P<args>[^\]]*)\)\]\s*"
    r"(?:\[[^\]]*\]\s*)*"
    r"(?:public|internal|private|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"[^;(]*?\b(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)


def find_dumpbin():
    exe = shutil.which("dumpbin")
    if exe:
        return exe
    pattern = r"C:\Program Files*\Microsoft Visual Studio\*\*\VC\Tools\MSVC\*\bin\Hostx64\x64\dumpbin.exe"
    hits = sorted(glob.glob(pattern))
    return hits[-1] if hits else None


def wanted_names():
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
    dll = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DLL
    if not os.path.exists(dll):
        sys.exit("no library at %s -- build it first (see README.md)" % dll)
    dumpbin = find_dumpbin()
    if not dumpbin:
        sys.exit("dumpbin not found; run from a Visual Studio developer prompt")

    out = subprocess.run([dumpbin, "-exports", dll], capture_output=True, text=True).stdout
    exports = set()
    for line in out.splitlines():
        parts = line.split()
        if len(parts) == 4 and parts[0].isdigit() and parts[2].isalnum():
            exports.add(parts[3])
    if not exports:
        sys.exit("dumpbin reported no exports for %s" % dll)

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
    print("exports in %s: %d" % (os.path.basename(dll), len(exports)))
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
