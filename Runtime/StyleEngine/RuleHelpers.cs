using ExCSS;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ReactUnity.StyleEngine
{
    public static class RuleHelpers
    {
        public static Regex SplitSelectorRegex = new Regex("\\s+");

        public static List<RuleSelectorPart> ParseSelector(string selector, bool negated = false)
        {
            // Special selector for the root element, skip parsing in this case
            if (selector == "**") return null;

            var length = selector.Length;


            var paranCount = 0;
            var type = RuleSelectorPartType.Tag;
            var acc = new StringBuilder();
            var paranContent = new StringBuilder();

            var list = new List<RuleSelectorPart>();

            void end(RuleSelectorPartType nextType)
            {
                var nm = acc.ToString();
                var ignore = type == RuleSelectorPartType.None || string.IsNullOrWhiteSpace(nm)
                    || nm == "*" || nm == ">" || nm == "~" || nm == "+" || nm == "!";
                if (!ignore)
                {

                    if (type == RuleSelectorPartType.Special)
                    {
                        if (nm == "not") list.AddRange(ParseSelector(paranContent.ToString(), !negated));
                        else if (nm == "first-child") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.FirstChild, Negated = negated });
                        else if (nm == "last-child") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.LastChild, Negated = negated });
                        else if (nm == "before") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.Before, Negated = negated });
                        else if (nm == "after") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.After, Negated = negated });
                        else if (nm == "empty") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.Empty, Negated = negated });
                        else if (nm == "root") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.Root, Negated = negated });
                        else if (nm == "nth-child") list.Add(new RuleSelectorPart()
                        {
                            Type = RuleSelectorPartType.NthChild,
                            Negated = negated,
                            Parameter = paranContent.ToString()
                        });
                        else if (nm == "nth-last-child") list.Add(new RuleSelectorPart()
                        {
                            Type = RuleSelectorPartType.NthLastChild,
                            Negated = negated,
                            Parameter = paranContent.ToString()
                        });
                        else list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.State, Negated = negated, Parameter = nm });
                    }
                    else
                    {
                        string parameter = null;
                        if (type == RuleSelectorPartType.Attribute)
                        {
                            var splits = nm.Split(new char[] { '=' }, 2);
                            nm = splits[0].Trim();
                            parameter = splits.Length > 1 ? splits[1].Trim() : null;

                        }
                        list.Add(new RuleSelectorPart() { Name = nm, Type = type, Negated = negated, Parameter = parameter });
                    }
                }

                acc.Clear();
                paranContent.Clear();
                type = nextType;
            }

            for (int i = 0; i < length; i++)
            {
                var ch = selector[i];

                if (ch == '(')
                {
                    paranCount++;
                    if (paranCount > 1) paranContent.Append(ch);
                }
                else if (ch == ')')
                {
                    paranCount--;
                    if (paranCount == 0) end(RuleSelectorPartType.None);
                    else paranContent.Append(ch);
                }
                else if (paranCount > 0) paranContent.Append(ch);
                else if (ch == '.') end(RuleSelectorPartType.ClassName);
                else if (ch == '#') end(RuleSelectorPartType.Id);
                else if (ch == '[') end(RuleSelectorPartType.Attribute);
                else if (ch == ']') end(RuleSelectorPartType.Tag);
                else if (ch == ':') end(RuleSelectorPartType.Special);

                else
                {
                    acc.Append(ch);
                }
            }
            end(RuleSelectorPartType.None);

            return list;
        }

        public static int GetSpecificity(Priority priority)
        {
            return (priority.Inlines << 24) + (priority.Ids << 16) + (priority.Classes * 8) + priority.Tags;
        }

        public static Dictionary<string, object> GetRuleDic(StyleRule rule, bool important)
        {
            return rule.Style.Where(x => !(important ^ x.IsImportant)).ToDictionary(x => x.Name, x => x.Value as object);
        }


        public static string NormalizeSelector(string selector)
        {
            return SplitSelectorRegex.Replace(selector.Replace(">", " > ").Replace("+", " + ").Replace("~", " ~ ").Trim(), " ");
        }
    }
}
