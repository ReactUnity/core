#!/usr/bin/env python3
"""Gate 0 exit check: does the built library export every name the C# layer P/Invokes?

    python check-exports.py [path-to-quickjs.dll]

Diffs the library's export table against the live P/Invoke set (see pinvoke.py) in
both directions -- names C# calls that we do not export, and shim functions we export
that nothing calls. The second direction is not cosmetic: 26 dead functions sat in
the vendored shim precisely because nothing looked.

Reads PE (`.dll`), ELF (`.so`) and Mach-O (`.bundle`/`.dylib`) and static archives
(`.a`), so it covers all twelve shipped artifacts rather than only the Windows ones.
The format is sniffed from the file's magic, not from the host OS: a cross-compiled
Android or iOS artifact is checkable from whichever runner built it.

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


def object_format(path):
    """PE, ELF, MACHO or ARCHIVE, from the file's magic rather than the host OS."""
    with open(path, "rb") as fp:
        head = fp.read(8)
    if head[:2] == b"MZ":
        return "PE"
    if head[:4] == b"\x7fELF":
        return "ELF"
    if head[:8] == b"!<arch>\n":
        return "ARCHIVE"
    # thin and fat Mach-O, both endiannesses
    if head[:4] in (b"\xcf\xfa\xed\xfe", b"\xce\xfa\xed\xfe", b"\xfe\xed\xfa\xcf",
                    b"\xfe\xed\xfa\xce", b"\xca\xfe\xba\xbe", b"\xbe\xba\xfe\xca"):
        return "MACHO"
    return None


def run(argv):
    try:
        p = subprocess.run(argv, capture_output=True, text=True)
    except OSError:
        return None
    return p.stdout if p.returncode == 0 or p.stdout else None


def pe_exports(path):
    dumpbin = find_dumpbin()
    if not dumpbin:
        # llvm-readobj ships with clang and reads PE anywhere, which is what a
        # non-Windows runner checking a cross-built DLL has to fall back on.
        out = run(["llvm-readobj", "--coff-exports", path])
        if out is None:
            sys.exit("no PE reader: install Visual Studio (dumpbin) or LLVM (llvm-readobj)")
        return {m.group(1) for m in re.finditer(r"Name:\s*(\S+)", out)}
    out = run([dumpbin, "-exports", path]) or ""
    exports = set()
    for line in out.splitlines():
        parts = line.split()
        if len(parts) == 4 and parts[0].isdigit() and parts[2].isalnum():
            exports.add(parts[3])
    return exports


def nm_exports(path, fmt):
    """Defined external symbols, via whichever nm is present."""
    for tool in ("llvm-nm", "nm"):
        # -g external only, -U defined only; --defined-only is the GNU spelling
        for flags in (["-gU"], ["-g", "--defined-only"]):
            out = run([tool] + flags + [path])
            if out is None:
                continue
            names = set()
            for line in out.splitlines():
                parts = line.split()
                if len(parts) < 2:
                    continue
                kind, name = parts[-2], parts[-1]
                # T/t text, D/B/R data -- lower case is local, which -g should
                # already have dropped; W is a weak definition, still exported.
                if kind.upper() in ("T", "D", "B", "R", "W", "S"):
                    names.add(name)
                    # Mach-O prefixes every C symbol with an underscore -- and a Mach-O
                    # static archive is detected as ARCHIVE, so the format cannot be what
                    # decides. The iOS leg read 591 symbols and matched none of the 104
                    # while that was keyed on MACHO. Recording both spellings costs nothing.
                    if name.startswith("_"):
                        names.add(name[1:])
            if names:
                return names
    sys.exit("no symbol reader for %s: install LLVM (llvm-nm) or binutils (nm)" % fmt)


def read_exports(path):
    fmt = object_format(path)
    if fmt is None:
        sys.exit("%s is not a PE, ELF, Mach-O or archive" % path)
    if fmt == "PE":
        return fmt, pe_exports(path)
    return fmt, nm_exports(path, fmt)


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
