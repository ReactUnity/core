using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace ReactUnity.Helpers
{
    /// <summary>A JSON object that keeps its keys in document order, so a rewritten file only changes where it was edited.</summary>
    internal sealed class JsonObject : List<KeyValuePair<string, object>>
    {
        public object this[string key]
        {
            get => TryGetValue(key, out var value) ? value : null;
            set
            {
                for (int i = 0; i < Count; i++)
                {
                    if (base[i].Key != key) continue;
                    base[i] = new KeyValuePair<string, object>(key, value);
                    return;
                }
                Add(new KeyValuePair<string, object>(key, value));
            }
        }

        public bool TryGetValue(string key, out object value)
        {
            for (int i = 0; i < Count; i++)
            {
                if (base[i].Key != key) continue;
                value = base[i].Value;
                return true;
            }

            value = null;
            return false;
        }
    }

    /// <summary>
    /// Parses JSON into <see cref="List{Object}"/>, <see cref="JsonObject"/>, <c>string</c>, <c>bool</c>,
    /// <c>null</c> and numbers: an <c>int</c> for an integer that fits, a <c>double</c> for anything else.
    /// </summary>
    /// <remarks>
    /// Written for the renderer's command buffer, where it replaced Newtonsoft: building a token tree
    /// was most of the cost of a flush. A string is always a string -- no date sniffing.
    /// </remarks>
    internal struct JsonReader
    {
        private readonly string json;
        private int pos;

        private JsonReader(string json)
        {
            this.json = json;
            pos = 0;
        }

        public static object Parse(string json)
        {
            if (json == null) throw new ArgumentNullException(nameof(json));

            var reader = new JsonReader(json);
            reader.SkipWhitespace();
            var value = reader.ReadValue();
            reader.SkipWhitespace();
            if (reader.pos != json.Length) throw reader.Error("Unexpected text after the value");
            return value;
        }

        private object ReadValue()
        {
            if (pos >= json.Length) throw Error("Unexpected end of input");

            switch (json[pos])
            {
                case '{': return ReadObject();
                case '[': return ReadArray();
                case '"': return ReadString();
                case 't': ReadLiteral("true"); return true;
                case 'f': ReadLiteral("false"); return false;
                case 'n': ReadLiteral("null"); return null;
                default: return ReadNumber();
            }
        }

        private JsonObject ReadObject()
        {
            pos++;
            var obj = new JsonObject();
            SkipWhitespace();
            if (Peek() == '}') { pos++; return obj; }

            while (true)
            {
                SkipWhitespace();
                if (Peek() != '"') throw Error("Expected a property name");
                var key = ReadString();
                SkipWhitespace();
                Expect(':');
                SkipWhitespace();
                obj.Add(new KeyValuePair<string, object>(key, ReadValue()));
                SkipWhitespace();

                var c = Next();
                if (c == '}') return obj;
                if (c != ',') throw Error("Expected ',' or '}'", -1);
            }
        }

        private List<object> ReadArray()
        {
            pos++;
            var list = new List<object>();
            SkipWhitespace();
            if (Peek() == ']') { pos++; return list; }

            while (true)
            {
                SkipWhitespace();
                list.Add(ReadValue());
                SkipWhitespace();

                var c = Next();
                if (c == ']') return list;
                if (c != ',') throw Error("Expected ',' or ']'", -1);
            }
        }

        private string ReadString()
        {
            pos++;
            var start = pos;

            // Almost every string has no escapes, and is then a single substring.
            while (pos < json.Length)
            {
                var c = json[pos];
                if (c == '"')
                {
                    var plain = json.Substring(start, pos - start);
                    pos++;
                    return plain;
                }
                if (c == '\\') break;
                pos++;
            }

            var sb = new StringBuilder(json, start, pos - start, pos - start + 16);

            while (true)
            {
                if (pos >= json.Length) throw Error("Unterminated string");

                var c = json[pos++];
                if (c == '"') return sb.ToString();
                if (c != '\\')
                {
                    sb.Append(c);
                    continue;
                }

                if (pos >= json.Length) throw Error("Unterminated string");

                switch (json[pos++])
                {
                    case '"': sb.Append('"'); break;
                    case '\\': sb.Append('\\'); break;
                    case '/': sb.Append('/'); break;
                    case 'b': sb.Append('\b'); break;
                    case 'f': sb.Append('\f'); break;
                    case 'n': sb.Append('\n'); break;
                    case 'r': sb.Append('\r'); break;
                    case 't': sb.Append('\t'); break;
                    case 'u': sb.Append(ReadHexChar()); break;
                    default: throw Error("Invalid escape", -1);
                }
            }
        }

        // A surrogate pair arrives as two escapes, which appending one char at a time reassembles.
        private char ReadHexChar()
        {
            if (pos + 4 > json.Length) throw Error("Invalid \\u escape");

            var value = 0;
            for (int i = 0; i < 4; i++)
            {
                var c = json[pos++];
                int digit;
                if (c >= '0' && c <= '9') digit = c - '0';
                else if (c >= 'a' && c <= 'f') digit = c - 'a' + 10;
                else if (c >= 'A' && c <= 'F') digit = c - 'A' + 10;
                else throw Error("Invalid \\u escape", -1);
                value = value * 16 + digit;
            }
            return (char) value;
        }

        private object ReadNumber()
        {
            var start = pos;
            if (Peek() == '-') pos++;

            var digitsStart = pos;
            long integer = 0;
            var overflow = false;

            while (pos < json.Length && json[pos] >= '0' && json[pos] <= '9')
            {
                if (integer > (long.MaxValue - 9) / 10) overflow = true;
                else integer = integer * 10 + (json[pos] - '0');
                pos++;
            }

            if (pos == digitsStart) throw Error("Unexpected character");

            var isInteger = true;
            if (Peek() == '.')
            {
                isInteger = false;
                pos++;
                var fractionStart = pos;
                while (pos < json.Length && json[pos] >= '0' && json[pos] <= '9') pos++;
                if (pos == fractionStart) throw Error("Expected a digit");
            }

            var e = Peek();
            if (e == 'e' || e == 'E')
            {
                isInteger = false;
                pos++;
                var sign = Peek();
                if (sign == '+' || sign == '-') pos++;
                var exponentStart = pos;
                while (pos < json.Length && json[pos] >= '0' && json[pos] <= '9') pos++;
                if (pos == exponentStart) throw Error("Expected a digit");
            }

            if (isInteger && !overflow)
            {
                var value = json[start] == '-' ? -integer : integer;
                if (value >= int.MinValue && value <= int.MaxValue) return (int) value;
            }

            return double.Parse(json.Substring(start, pos - start), NumberStyles.Float, CultureInfo.InvariantCulture);
        }

        private void ReadLiteral(string literal)
        {
            if (string.CompareOrdinal(json, pos, literal, 0, literal.Length) != 0) throw Error("Unexpected character");
            pos += literal.Length;
        }

        private void SkipWhitespace()
        {
            while (pos < json.Length)
            {
                var c = json[pos];
                if (c != ' ' && c != '\n' && c != '\r' && c != '\t') return;
                pos++;
            }
        }

        private char Peek() => pos < json.Length ? json[pos] : '\0';

        private char Next()
        {
            if (pos >= json.Length) throw Error("Unexpected end of input");
            return json[pos++];
        }

        private void Expect(char c)
        {
            if (Next() != c) throw Error($"Expected '{c}'", -1);
        }

        private FormatException Error(string message, int offset = 0) =>
            new FormatException($"{message} at position {pos + offset} of the JSON");
    }

    /// <summary>
    /// Writes what <see cref="JsonReader"/> reads, indented by two spaces per level with a space after
    /// each colon -- the layout Unity gives <c>Packages/manifest.json</c>.
    /// </summary>
    internal static class JsonWriter
    {
        public static string Write(object value)
        {
            var sb = new StringBuilder();
            WriteValue(sb, value, 0);
            return sb.ToString();
        }

        private static void WriteValue(StringBuilder sb, object value, int depth)
        {
            switch (value)
            {
                case null: sb.Append("null"); break;
                case string s: WriteString(sb, s); break;
                case bool b: sb.Append(b ? "true" : "false"); break;
                case JsonObject obj: WriteObject(sb, obj, depth); break;
                case List<object> list: WriteArray(sb, list, depth); break;
                case int i: sb.Append(i.ToString(CultureInfo.InvariantCulture)); break;
                case long l: sb.Append(l.ToString(CultureInfo.InvariantCulture)); break;
                case double d: sb.Append(d.ToString("R", CultureInfo.InvariantCulture)); break;
                case float f: sb.Append(f.ToString("R", CultureInfo.InvariantCulture)); break;
                default: throw new ArgumentException($"Cannot write a {value.GetType().Name} as JSON", nameof(value));
            }
        }

        private static void WriteObject(StringBuilder sb, JsonObject obj, int depth)
        {
            if (obj.Count == 0) { sb.Append("{}"); return; }

            sb.Append('{');
            for (int i = 0; i < obj.Count; i++)
            {
                if (i > 0) sb.Append(',');
                NewLine(sb, depth + 1);
                WriteString(sb, obj[i].Key);
                sb.Append(": ");
                WriteValue(sb, obj[i].Value, depth + 1);
            }
            NewLine(sb, depth);
            sb.Append('}');
        }

        private static void WriteArray(StringBuilder sb, List<object> list, int depth)
        {
            if (list.Count == 0) { sb.Append("[]"); return; }

            sb.Append('[');
            for (int i = 0; i < list.Count; i++)
            {
                if (i > 0) sb.Append(',');
                NewLine(sb, depth + 1);
                WriteValue(sb, list[i], depth + 1);
            }
            NewLine(sb, depth);
            sb.Append(']');
        }

        private static void NewLine(StringBuilder sb, int depth)
        {
            sb.Append('\n');
            sb.Append(' ', depth * 2);
        }

        private static void WriteString(StringBuilder sb, string s)
        {
            sb.Append('"');
            foreach (var c in s)
            {
                switch (c)
                {
                    case '"': sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    case '\b': sb.Append("\\b"); break;
                    case '\f': sb.Append("\\f"); break;
                    default:
                        if (c < ' ') sb.Append("\\u").Append(((int) c).ToString("x4"));
                        else sb.Append(c);
                        break;
                }
            }
            sb.Append('"');
        }
    }
}
