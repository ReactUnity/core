using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using Yoga;

namespace ReactUnity.Types
{
    public partial class ClipPath
    {
        public partial class Converter
        {
            /// <summary>
            /// One command with its coordinates still unresolved. A <c>shape()</c>'s coordinates can
            /// be a var() or a calc(), so they go through the same deferred machinery as any other
            /// value and each command keeps the slots its own coordinates were filed under.
            /// </summary>
            private struct PendingCommand
            {
                public ClipPathCommandKind Kind;
                public bool Relative;
                public int To;
                public int Control1;
                public int Control2;
                public int Radius;
                public int Angle;
                public bool LargeArc;
                public bool Clockwise;

                public static PendingCommand Of(ClipPathCommandKind kind, bool relative = false) => new PendingCommand
                {
                    Kind = kind,
                    Relative = relative,
                    To = -1,
                    Control1 = -1,
                    Control2 = -1,
                    Radius = -1,
                    Angle = -1,
                };
            }

            /// <summary>
            /// <c>shape()</c>: the same outline <c>path()</c> draws, written in CSS rather than in
            /// SVG's path data -- which buys percentages, calc() and var(), none of which a path
            /// string can carry.
            /// </summary>
            /// <remarks>
            /// The grammar is `shape(&lt;fill-rule&gt;? from &lt;x y&gt;, &lt;command&gt;, ...)`, and
            /// the commands line up one for one with SVG's: `line` is L, `curve ... with c` is Q
            /// against `curve ... with c1 / c2` for C, `smooth` is S with a control point and T
            /// without, `arc` is A, and `to` against `by` is what SVG spells by letter case.
            /// </remarks>
            private static bool ParseShape(string[] args, ClipGeometryBox box, out IComputedValue result)
            {
                result = null;
                if (args == null || args.Length < 2) return false;

                var evenOdd = false;
                var head = args[0].Trim();

                // The fill rule shares the first comma-separated slot with `from`.
                var space = head.IndexOf(' ');
                if (space > 0 && TryReadFillRule(head.Substring(0, space), ref evenOdd))
                    head = head.Substring(space + 1).TrimStart();

                if (!head.StartsWith("from ", StringComparison.OrdinalIgnoreCase)) return false;

                var values = new List<object>();
                var converters = new List<StyleConverterBase>();
                var commands = new List<PendingCommand>();

                // `from` is a moveto, which is what every path grammar opens with.
                var origin = PendingCommand.Of(ClipPathCommandKind.Move);
                origin.To = AddValue(values, converters, head.Substring(5).Trim(), PositionConverter);
                if (origin.To < 0) return false;
                commands.Add(origin);

                for (int i = 1; i < args.Length; i++)
                {
                    if (commands.Count >= ClipPathCommands.MaxCommands) return false;
                    if (!ParseShapeCommand(args[i], values, converters, out var command)) return false;
                    commands.Add(command);
                }

                return ComputedCompound.Create(out result, values, converters, resolved => {
                    var parsed = new ClipPathCommand[commands.Count];

                    for (int i = 0; i < commands.Count; i++)
                    {
                        var pending = commands[i];
                        var command = new ClipPathCommand
                        {
                            Kind = pending.Kind,
                            Relative = pending.Relative,
                            LargeArc = pending.LargeArc,
                            Clockwise = pending.Clockwise,
                        };

                        // hline and vline carry a single length rather than a pair, on the axis
                        // they move along.
                        if (pending.Kind == ClipPathCommandKind.HLine || pending.Kind == ClipPathCommandKind.VLine)
                        {
                            if (!(resolved[pending.To] is YogaValue single)) return null;
                            var zero = YogaValue.Point(0);
                            command.To = pending.Kind == ClipPathCommandKind.HLine
                                ? new YogaValue2(single, zero)
                                : new YogaValue2(zero, single);
                        }
                        else if (!TakeResolved(resolved, pending.To, ref command.To)) return null;

                        if (!TakeResolved(resolved, pending.Control1, ref command.Control1)) return null;
                        if (!TakeResolved(resolved, pending.Control2, ref command.Control2)) return null;
                        if (!TakeResolved(resolved, pending.Radius, ref command.Radius)) return null;

                        if (pending.Angle >= 0)
                        {
                            if (!(resolved[pending.Angle] is float angle)) return null;
                            command.Angle = angle;
                        }

                        parsed[i] = command;
                    }

                    return new ClipPath(ClipPathKind.Shape, parsed, evenOdd).WithBox(box);
                });
            }

            private static bool TakeResolved(List<object> resolved, int index, ref YogaValue2 target)
            {
                if (index < 0) return true;
                if (!(resolved[index] is YogaValue2 value)) return false;

                target = value;
                return true;
            }

            private static int AddValue(List<object> values, List<StyleConverterBase> converters, string text, StyleConverterBase converter)
            {
                if (string.IsNullOrWhiteSpace(text)) return -1;

                values.Add(text);
                converters.Add(converter);
                return values.Count - 1;
            }

            private static bool ParseShapeCommand(string text, List<object> values, List<StyleConverterBase> converters, out PendingCommand command)
            {
                command = default;

                // The slash between a curve's two control points is a token of its own, and every
                // split here is paren-aware so a calc() stays in one piece.
                var tokens = ParserHelpers.SplitWhitespace((text ?? "").Trim(), '/');
                if (tokens.Count == 0) return false;

                var name = tokens[0].ToLowerInvariant();

                if (name == "close")
                {
                    command = PendingCommand.Of(ClipPathCommandKind.Close);
                    return tokens.Count == 1;
                }

                // Everything else moves somewhere, absolutely with `to` or relatively with `by`.
                if (tokens.Count < 2) return false;

                var relative = string.Equals(tokens[1], "by", StringComparison.OrdinalIgnoreCase);
                if (!relative && !string.Equals(tokens[1], "to", StringComparison.OrdinalIgnoreCase)) return false;

                var cursor = 2;

                switch (name)
                {
                    case "move":
                    case "line":
                    {
                        command = PendingCommand.Of(name == "move" ? ClipPathCommandKind.Move : ClipPathCommandKind.Line, relative);
                        command.To = TakePair(tokens, ref cursor, values, converters);
                        break;
                    }

                    case "hline":
                    case "vline":
                    {
                        command = PendingCommand.Of(name == "hline" ? ClipPathCommandKind.HLine : ClipPathCommandKind.VLine, relative);
                        command.To = TakeOne(tokens, ref cursor, values, converters, Length);
                        break;
                    }

                    case "curve":
                    {
                        var to = TakePair(tokens, ref cursor, values, converters);
                        if (to < 0 || !Expect(tokens, ref cursor, "with")) return false;

                        var first = TakePair(tokens, ref cursor, values, converters);
                        if (first < 0) return false;

                        // One control point is a quadratic, two a cubic -- the same pair of curves
                        // SVG spells Q and C.
                        if (cursor < tokens.Count && tokens[cursor] == "/")
                        {
                            cursor++;
                            command = PendingCommand.Of(ClipPathCommandKind.Cubic, relative);
                            command.To = to;
                            command.Control1 = first;
                            command.Control2 = TakePair(tokens, ref cursor, values, converters);
                            if (command.Control2 < 0) return false;
                        }
                        else
                        {
                            command = PendingCommand.Of(ClipPathCommandKind.Quadratic, relative);
                            command.To = to;
                            command.Control1 = first;
                        }
                        break;
                    }

                    case "smooth":
                    {
                        var to = TakePair(tokens, ref cursor, values, converters);
                        if (to < 0) return false;

                        // With a control point the curve is a cubic whose first control is the
                        // mirror of the one before it; without, a quadratic whose only control is.
                        if (cursor < tokens.Count)
                        {
                            if (!Expect(tokens, ref cursor, "with")) return false;
                            command = PendingCommand.Of(ClipPathCommandKind.SmoothCubic, relative);
                            command.To = to;
                            command.Control2 = TakePair(tokens, ref cursor, values, converters);
                            if (command.Control2 < 0) return false;
                        }
                        else
                        {
                            command = PendingCommand.Of(ClipPathCommandKind.SmoothQuadratic, relative);
                            command.To = to;
                        }
                        break;
                    }

                    case "arc":
                    {
                        var to = TakePair(tokens, ref cursor, values, converters);
                        if (to < 0 || !Expect(tokens, ref cursor, "of")) return false;

                        if (cursor >= tokens.Count) return false;
                        var rx = tokens[cursor++];
                        // A second radius, unless what follows is one of the flags -- an arc with
                        // one radius is a circular one.
                        var ry = cursor < tokens.Count && !IsArcKeyword(tokens[cursor]) ? tokens[cursor++] : rx;

                        command = PendingCommand.Of(ClipPathCommandKind.Arc, relative);
                        command.To = to;
                        command.Radius = AddValue(values, converters, rx + " " + ry, PositionConverter);
                        if (command.Radius < 0) return false;

                        while (cursor < tokens.Count)
                        {
                            var flag = tokens[cursor].ToLowerInvariant();
                            cursor++;

                            if (flag == "large") command.LargeArc = true;
                            else if (flag == "small") command.LargeArc = false;
                            else if (flag == "cw") command.Clockwise = true;
                            else if (flag == "ccw") command.Clockwise = false;
                            else if (flag == "rotate")
                            {
                                command.Angle = TakeOne(tokens, ref cursor, values, converters, AngleConverter);
                                if (command.Angle < 0) return false;
                            }
                            else return false;
                        }
                        break;
                    }

                    default:
                        return false;
                }

                // Anything left over is a value nobody asked for, which makes the whole
                // declaration invalid rather than a shape with a typo in it.
                return command.To >= 0 && cursor == tokens.Count;
            }

            private static bool IsArcKeyword(string token) =>
                token == "large" || token == "small" || token == "cw" || token == "ccw" || token == "rotate";

            private static bool Expect(List<string> tokens, ref int cursor, string keyword)
            {
                if (cursor >= tokens.Count || !string.Equals(tokens[cursor], keyword, StringComparison.OrdinalIgnoreCase)) return false;

                cursor++;
                return true;
            }

            private static int TakePair(List<string> tokens, ref int cursor, List<object> values, List<StyleConverterBase> converters)
            {
                if (cursor + 1 >= tokens.Count) return -1;
                if (tokens[cursor] == "/" || tokens[cursor + 1] == "/") return -1;

                var pair = tokens[cursor] + " " + tokens[cursor + 1];
                cursor += 2;
                return AddValue(values, converters, pair, PositionConverter);
            }

            private static int TakeOne(List<string> tokens, ref int cursor, List<object> values, List<StyleConverterBase> converters, StyleConverterBase converter)
            {
                if (cursor >= tokens.Count || tokens[cursor] == "/") return -1;
                return AddValue(values, converters, tokens[cursor++], converter);
            }
        }
    }
}
