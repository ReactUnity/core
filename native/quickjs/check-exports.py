#!/usr/bin/env python3
"""Gate 0 exit check: does the built library export every name the C# layer P/Invokes?

    python check-exports.py [path-to-quickjs.dll]

Reads the live P/Invoke set out of Unity's generated `tests/*.csproj` -- both the
real define set and the real source list -- so a declaration sitting inside a dead
`#if` block does not count as a requirement. Open `tests/` in the Editor once if the
.csproj files are missing.

Exits non-zero if anything is missing, so it can gate CI.
"""
import glob
import io
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
TESTS = os.path.join(REPO, "tests")

DEFAULT_DLL = os.path.join(HERE, "build", "Release", "quickjs.dll")

DECL = re.compile(
    r"\[DllImport\((?P<args>[^\]]*)\)\]\s*"
    r"(?:\[[^\]]*\]\s*)*"
    r"(?:public|internal|private|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"[^;(]*?\b(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)
DIRECTIVE = re.compile(r"^\s*#\s*(if|elif|else|endif)\b(.*)$")
TOK = re.compile(r"\(|\)|\|\||&&|!|[A-Za-z_][A-Za-z_0-9]*")


def evaluate(expr, defines):
    """Evaluate a C# preprocessor condition. Unknown symbols are undefined."""
    toks = TOK.findall(expr)
    pos = [0]

    def peek():
        return toks[pos[0]] if pos[0] < len(toks) else None

    def primary():
        t = toks[pos[0]]
        pos[0] += 1
        if t == "(":
            v = or_expr()
            if peek() == ")":
                pos[0] += 1
            return v
        if t == "!":
            return not primary()
        if t in ("true", "false"):
            return t == "true"
        return t in defines

    def and_expr():
        v = primary()
        while peek() == "&&":
            pos[0] += 1
            v = primary() and v
        return v

    def or_expr():
        v = and_expr()
        while peek() == "||":
            pos[0] += 1
            v = and_expr() or v
        return v

    return or_expr()


def live_source(path, defines):
    """The file with preprocessor-excluded lines blanked out."""
    text = io.open(path, encoding="utf-8-sig", newline="").read()
    stack, out = [], []
    for raw in text.replace("\r\n", "\n").split("\n"):
        m = DIRECTIVE.match(raw)
        active = all(f[0] for f in stack)
        if m:
            kind, rest = m.group(1), m.group(2).split("//")[0]
            if kind == "if":
                val = active and evaluate(rest, defines)
                stack.append([val, val, active])
            elif kind == "elif" and stack:
                f = stack[-1]
                val = f[2] and not f[1] and evaluate(rest, defines)
                f[0], f[1] = val, f[1] or val
            elif kind == "else" and stack:
                f = stack[-1]
                f[0], f[1] = f[2] and not f[1], True
            elif kind == "endif" and stack:
                stack.pop()
            out.append("")
            continue
        out.append(raw if active else "")
    return "\n".join(out)


def find_dumpbin():
    exe = shutil.which("dumpbin")
    if exe:
        return exe
    pattern = r"C:\Program Files*\Microsoft Visual Studio\*\*\VC\Tools\MSVC\*\bin\Hostx64\x64\dumpbin.exe"
    hits = sorted(glob.glob(pattern))
    return hits[-1] if hits else None


def wanted_names():
    projects = sorted(glob.glob(os.path.join(TESTS, "*.csproj")))
    if not projects:
        sys.exit("no .csproj in %s -- open tests/ in the Unity Editor once to generate them" % TESTS)
    wanted = {}
    for proj in projects:
        base = os.path.basename(proj)[:-7]
        if not (base.startswith("jsb.") or base.startswith("ReactUnity")):
            continue
        text = io.open(proj, encoding="utf-8-sig").read()
        m = re.search(r"<DefineConstants>(.*?)</DefineConstants>", text, re.S)
        defines = {x.strip() for x in (m.group(1) if m else "").split(";") if x.strip()}
        for rel in re.findall(r'<Compile Include="([^"]+)"', text):
            full = os.path.normpath(os.path.join(TESTS, rel.replace("\\", "/")))
            if not os.path.exists(full) or "quickjs" not in full:
                continue
            for d in DECL.finditer(live_source(full, defines)):
                args = d.group("args")
                if "JSBDLL" not in args:  # e.g. declarations bound to the WebGL jslib
                    continue
                ep = re.search(r'EntryPoint\s*=\s*"([^"]+)"', args)
                symbol = ep.group(1) if ep else d.group("name")
                wanted.setdefault(symbol, set()).add(os.path.relpath(full, REPO))
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

    print("live P/Invoke names bound to JSBDLL: %d" % len(wanted))
    print("exports in %s: %d" % (os.path.basename(dll), len(exports)))
    print("satisfied: %d, missing: %d" % (len(wanted) - len(missing), len(missing)))
    if missing:
        print()
        for n in missing:
            print("  %-32s <- %s" % (n, ", ".join(sorted(wanted[n]))))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
