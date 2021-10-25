using System.Collections.Generic;
using ExCSS;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class StyleContext
    {
        public readonly ReactContext Context;
        public readonly IMediaProvider MediaProvider;
        public readonly StylesheetParser Parser;
        public readonly StyleTree StyleTree;
        public readonly List<Dictionary<string, FontReference>> FontFamilies = new List<Dictionary<string, FontReference>>();
        public readonly List<Dictionary<string, KeyframeList>> Keyframes = new List<Dictionary<string, KeyframeList>>();
        public readonly List<StyleSheet> StyleSheets = new List<StyleSheet>();

        public StyleContext(ReactContext context)
        {
            Context = context;
            Parser = Context.StyleParser;
            MediaProvider = Context.MediaProvider;
            StyleTree = new StyleTree(Parser);
        }

        public void ResolveStyle(IReactComponent scope = null)
        {
            if (!Context.IsDisposed)
                (scope ?? Context.Host)?.MarkForStyleResolving(true);
        }

        public virtual void Insert(StyleSheet sheet)
        {
            StyleSheets.Add(sheet);
            sheet.Enable();
        }

        public virtual void Remove(StyleSheet sheet)
        {
            StyleSheets.Remove(sheet);
            sheet.Disable();
        }

        public FontReference GetFontFamily(string name)
        {
            for (int i = FontFamilies.Count - 1; i >= 0; i--)
            {
                var list = FontFamilies[i];
                if (list.TryGetValue(name, out var found)) return found;
            }
            return null;
        }

        public KeyframeList GetKeyframes(string name)
        {
            for (int i = Keyframes.Count - 1; i >= 0; i--)
            {
                var list = Keyframes[i];
                if (list.TryGetValue(name, out var found)) return found;
            }
            return null;
        }
    }
}
