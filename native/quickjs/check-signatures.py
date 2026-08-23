#!/usr/bin/env python3
"""Phase 3 check: does every C# P/Invoke declaration agree with ng's `quickjs.h`?

    python check-signatures.py [path-to-quickjs.h]

`check-exports.py` proves a symbol exists. This proves the declaration is *right*,
which is the failure mode that does not throw: a changed signature links fine and
returns nonsense. Four mismatches are worth failing on, and all are mechanical --

  * **return width** -- ng returns C `bool` from 26 functions. On x64 that sets only
    `AL`, leaving the upper three bytes of `EAX` undefined, so a C# `int`/`JS_BOOL`
    return is usually truthy and occasionally not. Needs
    `[return: MarshalAs(UnmanagedType.U1)] bool`.
  * **arity** -- a dropped or added parameter shifts every later argument into the
    wrong register slot. `JS_IsArray` and `JS_IsError` both lost their `JSContext *`,
    and `JS_IsJobPending` carried a second parameter no QuickJS ever declared.
  * **a discarded return** -- a `void` declaration over a function that reports
    failure throws the error away. `JS_SetConstructor` returns `int` in ng.
  * **a `bool` parameter marshalled wider than one byte** -- `UnmanagedType.Bool` is a
    four-byte Win32 `BOOL`, C `bool` is one.

Anything the shim provides (`JSB_*`/`jsb_*`) is not in the header and is skipped;
`check-exports.py` covers those. Exits non-zero on any mismatch, so it can gate CI.

Blind spot, deliberate but worth knowing: this reads `DllImport` declarations, so the
callback delegates -- the direction ng calls *into* managed code -- are outside it, as
are the enums and struct layouts that cross by value. `JSHostPromiseRejectionTracker`
narrowed `is_handled` to a C `bool` in ng and had to be caught by hand.
"""
import io
import os
import re
import sys

import pinvoke

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_HEADER = os.path.join(HERE, "build", "_deps", "quickjs-src", "quickjs.h")


def balanced(text, open_at):
    """The text between `text[open_at]` == '(' and its matching ')'."""
    depth = 0
    for i in range(open_at, len(text)):
        if text[i] in "([":
            depth += 1
        elif text[i] in ")]":
            depth -= 1
            if depth == 0:
                return text[open_at + 1 : i], i
    return None, len(text)


def split_params(text):
    """Split a parameter list on top-level commas -- attributes contain their own."""
    out, depth, cur = [], 0, ""
    for ch in text:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == "," and depth == 0:
            out.append(cur)
            cur = ""
            continue
        cur += ch
    if cur.strip():
        out.append(cur)
    return [" ".join(p.split()) for p in out if p.strip()]


# JS_EXTERN covers the exported API; static inline matters because a C# declaration
# naming one of those is a link error waiting to happen, not a mismatch.
PROTO = re.compile(r"(?:JS_EXTERN|static\s+inline)\s+(?P<ret>[A-Za-z_][A-Za-z_0-9 \t*]*?)(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(")


def parse_header(path):
    """name -> (return type, [param types]) for every prototype in the header."""
    text = re.sub(r"//[^\n]*", "", re.sub(r"/\*.*?\*/", " ", io.open(path, encoding="utf-8").read(), flags=re.S))
    protos = {}
    for m in PROTO.finditer(text):
        params, _ = balanced(text, m.end() - 1)
        if params is None:
            continue
        params = [p for p in split_params(params) if p != "void"]
        protos[m.group("name")] = (" ".join(m.group("ret").split()), params)
    return protos


CS_DECL = re.compile(
    r"\[DllImport\((?P<args>[^\]]*)\)\]\s*"
    r"(?P<attrs>(?:\[[^\]]*\]\s*)*)"
    r"(?:public|internal|private|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"(?P<ret>[A-Za-z_][A-Za-z_0-9.<>\[\]* \t]*?)"
    r"(?P<name>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)


def parse_csharp():
    """symbol -> [declaration facts] for every P/Invoke bound to the native library."""
    decls = {}
    for _proj, defines, sources in pinvoke.unity_projects():
        for full in sources:
            text = pinvoke.live_source(full, defines)
            for d in CS_DECL.finditer(text):
                if "JSBDLL" not in d.group("args"):
                    continue
                params, _ = balanced(text, d.end() - 1)
                if params is None:
                    continue
                params = split_params(params)
                symbol = pinvoke.entry_point(d.group("args"), d.group("name"))
                decls.setdefault(symbol, []).append(
                    {
                        "file": os.path.relpath(full, pinvoke.REPO),
                        "member": d.group("name"),
                        "ret": " ".join(d.group("ret").split()),
                        "marshalled_u1": "UnmanagedType.U1" in d.group("attrs"),
                        "params": params,
                    }
                )
    return decls


def compare(symbol, proto, d):
    """Every way this declaration disagrees with the header."""
    ret, params = proto
    out = []

    if ret == "bool":
        if not (d["ret"] == "bool" and d["marshalled_u1"]):
            out.append("returns C bool; C# says %s -- needs [return: MarshalAs(UnmanagedType.U1)] bool" % d["ret"])
    elif d["ret"] == "bool":
        out.append("C# returns bool but ng returns %s" % ret)
    elif ret == "void" and d["ret"] != "void":
        out.append("C# returns %s but ng returns void" % d["ret"])
    elif ret != "void" and d["ret"] == "void":
        out.append("ng returns %s; a void declaration discards it" % ret)

    if len(d["params"]) != len(params):
        out.append("arity: ng takes %d (%s), C# passes %d" % (len(params), ", ".join(params) or "void", len(d["params"])))
    else:
        for i, p in enumerate(params):
            if p.split()[0] == "bool" and "UnmanagedType.U1" not in d["params"][i]:
                out.append(
                    "parameter %d (%s) is a C bool; C# has `%s` -- needs [MarshalAs(UnmanagedType.U1)] bool"
                    % (i + 1, p, d["params"][i])
                )
    return out


def main():
    header = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_HEADER
    if not os.path.exists(header):
        sys.exit("no header at %s -- configure the build first (see README.md)" % header)

    protos = parse_header(header)
    decls = parse_csharp()

    checked, shim, problems = 0, 0, []
    for symbol in sorted(decls):
        if symbol.startswith("JSB_") or symbol.startswith("jsb_"):
            shim += 1
            continue
        if symbol not in protos:
            problems.append((symbol, decls[symbol][0], ["not declared in quickjs.h"]))
            continue
        for d in decls[symbol]:
            checked += 1
            why = compare(symbol, protos[symbol], d)
            if why:
                problems.append((symbol, d, why))

    print("prototypes read from %s: %d" % (os.path.basename(header), len(protos)))
    print("C# declarations checked against it: %d" % checked)
    print("shim declarations skipped (see check-exports.py): %d" % shim)
    print("declarations with a mismatch: %d" % len(problems))
    if problems:
        print()
        for symbol, d, why in problems:
            print("  %s -- %s (%s)" % (symbol, d["file"], d["member"]))
            for line in why:
                print("      %s" % line)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
