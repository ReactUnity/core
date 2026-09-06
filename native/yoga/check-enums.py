#!/usr/bin/env python3
"""Do the C# enums still agree with Yoga's `YGEnums.h`?

    python check-enums.py [path-to-YGEnums.h]

`check-exports.py` proves a function exists. This proves the *numbers* still line up,
which is the failure mode that does not throw: every enum crosses the P/Invoke boundary
as a bare int, so a member that shifted by one links fine, runs fine, and lays out
the wrong thing.

This is not hypothetical. Upstream inserted `YGJustifyAuto` at the **front** of
`YGJustify` after the commit we ship, moving `FlexStart` from 0 to 1 and every other
member with it. Nothing in a build, a test run or a P/Invoke audit would have noticed;
`justify-content: center` would simply have started meaning `flex-end`.

Appending to an enum is safe and is reported without failing -- that is how a new Yoga
feature shows up before ReactUnity surfaces it. An insertion is not safe, and shows up
here as a value mismatch on every member after it.

Exits non-zero on any mismatch, so it can gate CI.
"""
import glob
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", ".."))
CSHARP_DIR = os.path.join(REPO, "unity", "core", "Runtime", "Yoga")
DEFAULT_HEADER = os.path.join(HERE, "build", "_deps", "yoga-src", "yoga", "YGEnums.h")

# C# members whose name is not the header's with the enum prefix stripped. Each is a
# deliberate rename on our side, so the check has to be told rather than infer it.
ALIASES = {
    ("YGErrata", "AbsolutePositioningIncorrect"): "AbsolutePositionWithoutInsetsExcludesPadding",
}

ENUM_DECL = re.compile(r"YG_ENUM_DECL\s*\(\s*(?P<name>YG\w+)\s*,(?P<body>.*?)\)\s*(?:YG_DEFINE|\n\n|YG_ENUM_DECL|$)", re.S)
CS_ENUM = re.compile(r"public\s+enum\s+(?P<name>Yoga\w+)\s*\{(?P<body>[^}]*)\}", re.S)
CS_MEMBER = re.compile(r"^\s*(?P<name>[A-Za-z_]\w*)\s*(?:=\s*(?P<value>-?\w+)\s*)?,?\s*$")


def header_enums(path):
    """{'YGAlign': {'Auto': 0, ...}} -- implicit ordinals resolved, explicit values honoured."""
    with open(path, encoding="utf-8") as fp:
        source = fp.read()
    # The macro body is a comma-separated list, but comments and line breaks are free-form.
    source = re.sub(r"/\*.*?\*/|//[^\n]*", "", source, flags=re.S)

    enums = {}
    for m in re.finditer(r"YG_ENUM_DECL\s*\(", source):
        start = m.end()
        depth, i = 1, start
        while depth and i < len(source):
            depth += (source[i] == "(") - (source[i] == ")")
            i += 1
        parts = [p.strip() for p in source[start:i - 1].split(",")]
        name, members = parts[0], parts[1:]
        values, nxt = {}, 0
        for member in members:
            if not member:
                continue
            if "=" in member:
                label, literal = (p.strip() for p in member.split("=", 1))
                nxt = int(literal, 0)
            else:
                label = member
            values[label[len(name):]] = nxt
            nxt += 1
        enums[name] = values
    return enums


def csharp_enums():
    """{'YGAlign': ('YogaAlign.cs', {'Auto': 0, ...})}, keyed by the header name it claims."""
    enums = {}
    for path in sorted(glob.glob(os.path.join(CSHARP_DIR, "Yoga*.cs"))):
        with open(path, encoding="utf-8-sig") as fp:
            source = fp.read()
        for m in CS_ENUM.finditer(source):
            values, nxt = {}, 0
            for line in re.sub(r"//[^\n]*", "", m.group("body")).splitlines():
                member = CS_MEMBER.match(line)
                if not member:
                    continue
                # Implicit ordinals are the common shape here -- only four of these
                # enums spell their numbers out, and the header has the same mix.
                literal = member.group("value")
                if literal is not None:
                    nxt = int(literal, 0)
                values[member.group("name")] = nxt
                nxt += 1
            if values:
                enums["YG" + m.group("name")[len("Yoga"):]] = (os.path.basename(path), values)
    return enums


def main():
    header = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_HEADER
    if not os.path.exists(header):
        sys.exit("no YGEnums.h at %s -- configure the build first (see README.md)" % header)

    native = header_enums(header)
    managed = csharp_enums()
    if not native or not managed:
        sys.exit("parsed %d header enums and %d C# enums -- one of the two has moved" % (len(native), len(managed)))

    problems, notes = [], []
    for name, (source_file, members) in sorted(managed.items()):
        if name not in native:
            # A C# enum with no counterpart is ours, not Yoga's (YogaValue2 and friends).
            continue
        theirs = native[name]
        # A C# member sharing a value with one that does map is a convenience alias
        # of ours -- YogaPositionType.Default is Relative -- not a missing symbol.
        mapped = {v for k, v in members.items() if ALIASES.get((name, k), k) in theirs}
        for label, value in sorted(members.items(), key=lambda kv: kv[1]):
            want = ALIASES.get((name, label), label)
            if want not in theirs:
                if value in mapped:
                    notes.append("%s.%s = %d (%s) is a local alias, not a header member" % (name, label, value, source_file))
                else:
                    problems.append("%s.%s (%s) has no %s%s in the header" % (name, label, source_file, name, want))
            elif theirs[want] != value:
                problems.append(
                    "%s.%s (%s) is %d, header says %d -- every member after it has shifted too"
                    % (name, label, source_file, value, theirs[want])
                )
        renamed = {ALIASES.get((name, label), label) for label in members}
        for label in sorted(theirs, key=lambda k: theirs[k]):
            if label not in renamed:
                notes.append("%s.%s = %d is in the header and not in %s" % (name, label, theirs[label], source_file))

    print("header enums: %d, C# enums checked: %d" % (len(native), sum(1 for n in managed if n in native)))
    if notes:
        print("\nnot surfaced in C# (fine -- appending is safe, and this is how a new Yoga feature shows up):")
        for n in notes:
            print("  %s" % n)
    if problems:
        print("\nMISMATCHED -- these cross the boundary as ints and will not fail loudly:")
        for p in problems:
            print("  %s" % p)
        return 1
    print("\nevery C# member matches the header's value.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
