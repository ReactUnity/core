#!/usr/bin/env python3
"""Does the WebGL jslib implement what a WebGL build's P/Invokes name?

There is no QuickJS on WebGL. `Plugins/QuickJS/WebGL/jsbplugin.jslib` reimplements the
whole `JSBDLL` surface on the browser's own engine, and nothing kept the two in
agreement -- a name the C# declares and the jslib does not implement is an Emscripten
link error, and a jslib entry nothing declares is dead weight nobody was going to find.
This is `check-exports.py` for the other backend: same question, `dumpbin` replaced by
reading the generated jslib.

What it cannot check is signatures. The jslib is hand-written JavaScript with no header
to compare against, so arity and tag values stay a reading exercise -- which is exactly
how the jslib ended up with Bellard's tag numbers and a `pctx` argument no QuickJS ever
had.

    python native/quickjs/check-jslib.py

Exits non-zero if anything is missing or unused, so it can gate CI.
"""
import io
import os
import re
import sys

import pinvoke

HERE = os.path.dirname(os.path.abspath(__file__))
JSLIB = os.path.join(pinvoke.REPO, "unity", "quickjs", "Plugins", "QuickJS", "WebGL", "jsbplugin.jslib")

# One `Name: function (...)` per entry, at the object literal's own indent. tsc emits the
# jslib, so the shape is its, not a hand-formatted one.
ENTRY = re.compile(r"^    ([A-Za-z_][A-Za-z_0-9]*)\s*:\s*function\b")

DLLIMPORT = re.compile(
    r"\[DllImport\s*\(\s*JSBDLL\s*(?P<args>[^\]]*)\)\s*\]"
    r"(?P<between>(?:\s*\[[^\]]*\])*)"
    r"\s*(?:public|private|internal|protected)?\s*static\s+extern\s+(?:unsafe\s+)?"
    r"[A-Za-z_][A-Za-z_0-9.<>\[\]]*\s+(?P<member>[A-Za-z_][A-Za-z_0-9]*)\s*\(",
    re.S,
)


def webgl_defines(defines):
    """The same project, built for WebGL.

    Only the platform symbols are swapped: everything else in the set is the project's
    own configuration and does not change with the target. UNITY_EDITOR has to go with
    them -- `JS_SetBaseUrl` is a real P/Invoke exactly when it is absent.
    """
    out = {d for d in defines if not d.startswith("UNITY_STANDALONE")}
    out.discard("UNITY_EDITOR")
    out.discard("UNITY_EDITOR_WIN")
    out.discard("UNITY_EDITOR_64")
    out.discard("UNITY_INCLUDE_TESTS")
    out.add("UNITY_WEBGL")
    return out


def declared():
    """Every symbol a WebGL build's `__Internal` P/Invokes name."""
    names = {}
    for _proj, defines, sources in pinvoke.unity_projects():
        target = webgl_defines(defines)
        for path in sources:
            text = pinvoke.live_source(path, target)
            for m in DLLIMPORT.finditer(text):
                symbol = pinvoke.entry_point(m.group("args") + m.group("between"), m.group("member"))
                names.setdefault(symbol, os.path.relpath(path, pinvoke.REPO).replace(os.sep, "/"))
    return names


def implemented():
    if not os.path.exists(JSLIB):
        sys.exit("no jslib at %s" % JSLIB)
    text = io.open(JSLIB, encoding="utf-8-sig", newline="").read()
    return {m.group(1) for m in (ENTRY.match(line) for line in text.split("\n")) if m}


def main():
    want = declared()
    have = implemented()

    missing = sorted(n for n in want if n not in have)
    unused = sorted(n for n in have if n not in want)

    print("P/Invoke names a WebGL build binds: %d" % len(want))
    print("functions the jslib implements: %d" % len(have))
    print("implemented: %d, missing: %d, unused jslib entries: %d"
          % (len(want) - len(missing), len(missing), len(unused)))

    if missing:
        print("\nnot implemented by the jslib -- an Emscripten link error:")
        for n in missing:
            print("  %-34s %s" % (n, want[n]))
    if unused:
        print("\nimplemented but named by nothing:")
        for n in unused:
            print("  %s" % n)

    return 1 if (missing or unused) else 0


if __name__ == "__main__":
    sys.exit(main())
