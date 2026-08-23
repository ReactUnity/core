#!/usr/bin/env python3
"""The live P/Invoke surface, read out of Unity's generated `tests/*.csproj`.

Shared by `check-exports.py` (does the library export it?) and `check-signatures.py`
(does the declaration match the header?). Both need the same two things, and the C#
preprocessor evaluator is too much to keep in two places:

  * the **real** define set and source list, so a declaration inside a dead `#if`
    is not counted as a requirement -- `JSB_ATOM_Operators` is live or not depending
    on `JSB_NO_BIGNUM`, and guessing wrong moves the answer either way;
  * `EntryPoint` resolution, because a member named `JS_DupValue` can bind the
    symbol `JSB_DupValue`. Three do, and an audit by member name misses all three.
"""
import glob
import io
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
TESTS = os.path.join(REPO, "tests")

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


def have_projects():
    """Whether Unity has generated the .csproj the live surface is derived from."""
    return bool(glob.glob(os.path.join(TESTS, "*.csproj")))


def read_surface(name):
    """The committed surface, for a checkout with no Unity-generated .csproj."""
    path = os.path.join(HERE, name)
    if not os.path.exists(path):
        sys.exit("no %s, and no generated .csproj to derive it from" % name)
    names = []
    for line in io.open(path, encoding="utf-8"):
        line = line.strip()
        if line and not line.startswith("#"):
            names.append(line)
    if not names:
        sys.exit("%s is empty" % path)
    return names


def write_surface(name, names, what):
    path = os.path.join(HERE, name)
    with io.open(path, "w", encoding="utf-8", newline="\n") as fp:
        fp.write("# %s\n" % what)
        fp.write("# Generated -- do not edit by hand. Regenerate with the --write flag on\n")
        fp.write("# the check that owns this file, from a checkout Unity has opened.\n")
        for n in sorted(names):
            fp.write("%s\n" % n)
    print("wrote %s (%d names)" % (path, len(names)))


def surface_drift(name, live):
    """The committed file against the live derivation, as (missing, extra)."""
    committed = set(read_surface(name))
    return sorted(set(live) - committed), sorted(committed - set(live))


def unity_projects():
    """(project, defines, source paths) per generated csproj that compiles quickjs C#."""
    projects = sorted(glob.glob(os.path.join(TESTS, "*.csproj")))
    if not projects:
        sys.exit("no .csproj in %s -- open tests/ in the Unity Editor once to generate them" % TESTS)
    for proj in projects:
        base = os.path.basename(proj)[:-7]
        if not (base.startswith("jsb.") or base.startswith("ReactUnity")):
            continue
        text = io.open(proj, encoding="utf-8-sig").read()
        m = re.search(r"<DefineConstants>(.*?)</DefineConstants>", text, re.S)
        defines = {x.strip() for x in (m.group(1) if m else "").split(";") if x.strip()}
        sources = []
        for rel in re.findall(r'<Compile Include="([^"]+)"', text):
            full = os.path.normpath(os.path.join(TESTS, rel.replace("\\", "/")))
            if os.path.exists(full) and "quickjs" in full:
                sources.append(full)
        if sources:
            yield proj, defines, sources


def entry_point(dllimport_args, member):
    """The symbol a declaration actually binds -- `EntryPoint` wins over the name."""
    ep = re.search(r'EntryPoint\s*=\s*"([^"]+)"', dllimport_args)
    return ep.group(1) if ep else member
