#!/usr/bin/env python3
"""Reads the export table out of a native artifact, whatever shape it came in.

Handles PE (`.dll`), ELF (`.so`), Mach-O (`.bundle`/`.dylib`) and static archives
(`.a`). The format is sniffed from the file's magic rather than from the host OS, so
a cross-compiled Android, iOS or WebGL artifact is checkable from whichever runner
built it -- which is the only reason a single check step can cover every leg of a
build matrix.

Shared by `quickjs/check-exports.py` and `yoga/check-exports.py`. It lives here
rather than in either because the awkward parts below were each learned once and
should not have to be learned again in a copy.
"""
import glob
import os
import re
import shutil
import subprocess
import sys


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


def nm_readers():
    """Every nm worth trying, best first.

    Emscripten's own llvm-nm is the only one that reads a wasm archive, and emsdk puts
    it in `upstream/bin`, which is not on the PATH `emsdk_env` sets -- only
    `upstream/emscripten` is. GNU nm is on every runner and cannot read wasm at all, so
    without this the WebGL leg finds a tool, gets nothing out of it, and reports no
    reader.
    """
    emsdk = os.environ.get("EMSDK")
    tools = [os.path.join(emsdk, "upstream", "bin", "llvm-nm")] if emsdk else []
    return tools + ["llvm-nm", "nm"]


def nm_exports(path, fmt):
    """Defined external symbols, via whichever nm is present."""
    for tool in nm_readers():
        # -g external only, -U defined only; --defined-only is the GNU spelling. The -D
        # pair reads the *dynamic* table, which is the only one a stripped .so still
        # has -- and the shared legs are stripped, because what a caller can link
        # against is exactly what is in there.
        for flags in (["-gU"], ["-g", "--defined-only"], ["-gUD"], ["-gD", "--defined-only"]):
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
