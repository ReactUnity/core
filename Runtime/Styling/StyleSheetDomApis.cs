using System;
using System.Linq;
using ExCSS;

namespace ReactUnity.Styling
{
    public partial class StyleSheet
    {
        public class StyleSheetNode
        {
            StyleSheet Sheet;
            IStylesheetNode Original;

            public StyleSheetNode(StyleSheet sheet, IStylesheetNode original)
            {
                Sheet = sheet;
                Original = original;
            }

            public string selectorText
            {
                get => (Original as StyleRule)?.SelectorText;
                set
                {
                    if (Original is StyleRule sr)
                    {
                        sr.SelectorText = value;
                        Sheet.RefreshParsed();
                    }
                }
            }

            public object style
            {
                get
                {
                    if (Original is StyleRule sr)
                    {
                        return new {
                            setProperty = new Action<string, string>((name, value) => sr.Style.SetProperty(name, value)),
                            removeProperty = new Action<string>((name) => sr.Style.RemoveProperty(name)),
                            getPropertyValue = new Func<string, string>((name) => sr.Style.GetPropertyValue(name)),
                            getPropertyPriority = new Func<string, string>((name) => sr.Style.GetPropertyPriority(name)),
                            item = new Func<int, string>((index) => sr.Style[index]),
                        };
                    }

                    return new { };
                }
            }
        }


        #region DOM-Like APIs

        public StyleSheetNode[] cssRules => Parsed.Children.Select(x => new StyleSheetNode(this, x)).ToArray();

        public void insertRule(string text, int index = 0)
        {
            var len = Parsed.Children.Count();

            if (index > len) Parsed.Insert(text, len);
            else Parsed.Insert(text, index);

            RefreshParsed();
        }

        public void appendRule(string text)
        {
            var len = Parsed.Children.Count();
            Parsed.Insert(text, len);
            RefreshParsed();
        }

        public void deleteRule(int index)
        {
            Parsed.RemoveAt(index);
            RefreshParsed();
        }

        public StyleSheet replace(string text)
        {
            replaceSync(text);
            return this;
        }

        public void replaceSync(string text)
        {
            Disable();
            Parse(text);
            if (currentEnabled) Enable();
        }

        #endregion
    }
}
