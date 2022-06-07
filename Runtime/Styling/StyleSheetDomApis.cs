using System;
using System.Linq;
using ExCSS;

namespace ReactUnity.Styling
{
    public class StyleSheetNode
    {
        public class MediaList
        {
            public StyleSheetNode Node;
            public IMediaRule Rule;

            public string mediaText
            {
                get => Rule.ConditionText;
                set
                {
                    Rule.ConditionText = value;
                    Node.Sheet.RefreshParsed();
                }
            }

            public MediaList(IMediaRule rule, StyleSheetNode node)
            {
                Rule = rule;
                Node = node;
            }
        }

        protected virtual StyleSheet Sheet { get; }
        protected virtual IStylesheetNode Original { get; }

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

        public string name
        {
            get => (Original as IKeyframesRule)?.Name;
            set
            {
                if (Original is IKeyframesRule ks)
                {
                    ks.Name = value;
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
                        setProperty = new Action<string, string>((name, value) => {
                            sr.Style.SetProperty(name, value);
                            Sheet.RefreshParsed();
                        }),
                        removeProperty = new Action<string>((name) => {
                            sr.Style.RemoveProperty(name);
                            Sheet.RefreshParsed();
                        }),
                        getPropertyValue = new Func<string, string>((name) => sr.Style.GetPropertyValue(name)),
                        getPropertyPriority = new Func<string, string>((name) => sr.Style.GetPropertyPriority(name)),
                        item = new Func<int, string>((index) => sr.Style[index]),
                    };
                }

                return new { };
            }
        }

        public object media
        {
            get
            {
                if (Original is IMediaRule mr) return new MediaList(mr, this);
                return null;
            }
        }

        internal StyleSheetNode() { }

        public StyleSheetNode(StyleSheet sheet, IStylesheetNode original)
        {
            Sheet = sheet;
            Original = original;
        }

        #region DOM-Like APIs

        public StyleSheetNode[] cssRules => Original.Children.Select(x => new StyleSheetNode(Sheet, x)).ToArray();

        public void insertRule(string text, int index = 0)
        {
            if (Original is Stylesheet ss)
            {
                ss.Insert(text, index);
            }
            else if (Original is IKeyframesRule kf)
            {
                kf.Add(text);
            }
            else if (Original is IMediaRule mr)
            {
                mr.Insert(text, index);
            }
            else return;

            Sheet.RefreshParsed();
        }

        public void appendRule(string text)
        {
            if (Original is Stylesheet ss)
            {
                var len = ss.Children.Count();
                ss.Insert(text, len);
            }
            else if (Original is IKeyframesRule kf)
            {
                kf.Add(text);
            }
            else if (Original is IMediaRule mr)
            {
                var len = mr.Children.Count();
                mr.Insert(text, len);
            }
            else return;

            Sheet.RefreshParsed();
        }

        public void deleteRule(int index)
        {
            if (Original is Stylesheet ss)
            {
                ss.RemoveAt(index);
            }
            else if (Original is IKeyframesRule kf)
            {
                var child = kf.Children.ElementAtOrDefault(index);
                if (child is IKeyframeRule ch)
                {
                    kf.Remove(ch.KeyText);
                }
            }
            else if (Original is IMediaRule mr)
            {
                mr.RemoveAt(index);
            }
            else return;

            Sheet.RefreshParsed();
        }

        public StyleSheetNode replace(string text)
        {
            replaceSync(text);
            return this;
        }

        public void replaceSync(string text)
        {
            if (Original is Rule sr)
            {
                sr.Text = text;
                Sheet.RefreshParsed();
            }
        }

        #endregion
    }


    public partial class StyleSheet : StyleSheetNode
    {
        protected override IStylesheetNode Original => Parsed;
        protected override StyleSheet Sheet => this;
    }
}
