using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace QuickJS.Binding
{
    public class TextGenerator
    {
        public class IndentBlock : IDisposable
        {
            private TextGenerator _generator;

            public IndentBlock(TextGenerator generator)
            {
                _generator = generator;
                _generator.AddTabLevel();
            }

            public void Dispose()
            {
                _generator.DecTabLevel();
            }
        }

        public class DoWhileBlock : IDisposable
        {
            private bool _valid;
            private TextGenerator _generator;

            public DoWhileBlock(TextGenerator generator, bool valid)
            {
                _valid = valid;
                _generator = generator;
                if (_valid)
                {
                    _generator.AppendLine("do");
                    _generator.AppendLine("{");
                    _generator.AddTabLevel();
                }
            }

            public void Dispose()
            {
                if (_valid)
                {
                    _generator.DecTabLevel();
                    _generator.AppendLine("} while(false);");
                }
            }
        }

        public class CodeBlock : IDisposable
        {
            private string _tail;
            private TextGenerator _generator;

            public CodeBlock(TextGenerator generator, string tail)
            {
                _tail = tail;
                _generator = generator;
                _generator.AppendLine("{");
                _generator.AddTabLevel();
            }

            public void Dispose()
            {
                _generator.DecTabLevel();
                _generator.AppendLine("}" + _tail);
            }
        }

        public bool enabled = true;
        public readonly string newline;
        private string tab;
        private int tabLevel;

        private StringBuilder sb => parts[partIndex];

        private int partThreshold = 0;

        private int partIndex = 0;

        private List<StringBuilder> parts = new List<StringBuilder>();

        private List<string> partResults = new List<string>();

        public bool isEmpty { get { return partResults.Count == 0 && (from part in parts where part.Length > 0 select part.Length).Sum() == 0; } }

        public string tabString
        {
            get
            {
                var s = "";
                for (var i = 0; i < tabLevel; i++)
                {
                    s += tab;
                }
                return s;
            }
        }

        public TextGenerator(string newline, string tab, int partThreshold = 0)
        {
            this.newline = newline;
            this.tab = tab;
            this.tabLevel = 0;
            this.partIndex = 0;
            this.partThreshold = partThreshold;
            this.parts.Add(new StringBuilder());
        }

        public string Submit()
        {
            var text = sb.ToString();
            return text;
        }

        public string[] SubmitAll()
        {
            var list = new List<string>();
            list.AddRange(from part in parts where part.Length > 0 select part.ToString());
            list.AddRange(partResults);
            return list.ToArray();
        }

        public void BeginPart()
        {
            if (partThreshold > 0)
            {
                partIndex++;
                while (partIndex >= parts.Count)
                {
                    parts.Add(new StringBuilder());
                }
            }
        }

        public void EndPart()
        {
            if (partThreshold > 0)
            {
                if (partIndex == 0)
                {
                    throw new InvalidOperationException();
                }

                if (sb.Length > partThreshold)
                {
                    partResults.Add(sb.ToString());
                    sb.Clear();
                }

                --partIndex;
            }
        }

        #region Code Text
        public CodeBlock CodeBlockScope()
        {
            return new CodeBlock(this, string.Empty);
        }

        public CodeBlock TailCallCodeBlockScope()
        {
            return new CodeBlock(this, ");");
        }

        public DoWhileBlock DoWhileBlockScope(bool valid = true)
        {
            return new DoWhileBlock(this, valid);
        }

        public IndentBlock IndentBlockScope()
        {
            return new IndentBlock(this);
        }

        public void BeginBlock()
        {
            if (!enabled)
            {
                return;
            }
            AppendLine("{");
            tabLevel++;
        }

        public void EndBlock()
        {
            if (!enabled)
            {
                return;
            }
            tabLevel--;
            AppendLine("}");
        }

        public void AddTabLevel()
        {
            if (!enabled)
            {
                return;
            }
            tabLevel++;
        }

        public void DecTabLevel()
        {
            if (!enabled)
            {
                return;
            }
            tabLevel--;
        }

        public void AppendTab()
        {
            if (!enabled)
            {
                return;
            }
            for (var i = 0; i < tabLevel; i++)
            {
                sb.Append(tab);
            }
        }

        public void AppendLines(params string[] lines)
        {
            if (!enabled)
            {
                return;
            }

            foreach (var line in lines)
            {
                AppendLine(line);
            }
        }

        public void AppendLine()
        {
            if (!enabled)
            {
                return;
            }
            sb.Append(newline);
        }

        public void AppendLine(string text)
        {
            if (!enabled)
            {
                return;
            }
            AppendTab();
            sb.Append(text);
            sb.Append(newline);
        }

        public void AppendLine(string text, object arg1)
        {
            if (!enabled)
            {
                return;
            }
            AppendTab();
            sb.AppendFormat(text, arg1);
            sb.Append(newline);
        }

        public void AppendLine(string text, object arg1, object arg2)
        {
            if (!enabled)
            {
                return;
            }
            AppendTab();
            sb.AppendFormat(text, arg1, arg2);
            sb.Append(newline);
        }

        public void AppendLine(string text, object arg1, object arg2, object arg3)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, arg1, arg2, arg3);
            sb.Append(newline);
        }

        public void AppendLine(string text, params object[] args)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, args);
            sb.Append(newline);
        }

        public void AppendLineL(string text)
        {
            if (!enabled)
            {
                return;
            }

            sb.Append(text);
            sb.Append(newline);
        }

        public void AppendLineL(string text, object arg1)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1);
            sb.Append(newline);
        }

        public void AppendLineL(string text, object arg1, object arg2)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1, arg2);
            sb.Append(newline);
        }

        public void AppendLineL(string text, object arg1, object arg2, object arg3)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1, arg2, arg3);
            sb.Append(newline);
        }

        public void AppendLineL(string text, params object[] args)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, args);
            sb.Append(newline);
        }

        public void Append(string text)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.Append(text);
        }

        public void Append(string text, object arg1)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, arg1);
        }

        public void Append(string text, object arg1, object arg2)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, arg1, arg2);
        }

        public void Append(string text, object arg1, object arg2, object arg3)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, arg1, arg2, arg3);
        }

        public void Append(string text, params object[] args)
        {
            if (!enabled)
            {
                return;
            }

            AppendTab();
            sb.AppendFormat(text, args);
        }

        public void AppendL(string text)
        {
            if (!enabled)
            {
                return;
            }

            sb.Append(text);
        }

        public void AppendL(string text, object arg1)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1);
        }

        public void AppendL(string text, object arg1, object arg2)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1, arg2);
        }

        public void AppendL(string text, object arg1, object arg2, object arg3)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, arg1, arg2, arg3);
        }

        public void AppendL(string text, params object[] args)
        {
            if (!enabled)
            {
                return;
            }

            sb.AppendFormat(text, args);
        }

        public void Clear()
        {
            tabLevel = 0;
            sb.Clear();
        }
        #endregion
    }
}
