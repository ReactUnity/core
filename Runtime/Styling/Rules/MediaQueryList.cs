using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ReactUnity.Helpers;
using ReactUnity.Scripting.DomProxies;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Rules
{
    public class MediaQueryList
    {
        private static LengthConverter NumberConverter = new LengthConverter();

        public static MediaQueryList Create(IMediaProvider provider, string media, ReactContext context = null)
        {
            return new MediaQueryList(provider, media, context);
        }

        public string media { get; private set; }
        private bool savedMatch { get; set; }

        public bool matches
        {
            get
            {
                if (ListenerCount == 0) Reevaluate(Provider);
                return savedMatch;
            }
        }


        public event Action OnUpdate
        {
            add => addEventListener("change", value);
            remove => removeEventListener("change", value);
        }


        private MediaNode Root = ConstantMediaNode.Never;
        private IMediaProvider Provider;
        private ReactContext Context;

        private int ListenerCount => eventTarget.GetAllEventListeners("change").Count;

        private EventTarget eventTarget = new EventTarget();

        private MediaQueryList(IMediaProvider provider, string media, ReactContext context)
        {
            Context = context;
            Provider = provider;
            this.media = media;
            Root = Parse(media);
        }

        public void addEventListener(string type, object listener)
        {
            eventTarget.AddEventListener(type, listener);
            if (ListenerCount == 1) Subscribe();
        }

        public void removeEventListener(string type, object listener)
        {
            eventTarget.RemoveEventListener(type, listener);
            if (ListenerCount == 0) Unsubscribe();
        }

        private void Subscribe()
        {
            Provider.OnUpdate += Reevaluate;
            savedMatch = Root.Matches(Provider);
        }

        private void Unsubscribe()
        {
            Provider.OnUpdate -= Reevaluate;
        }

        private void Reevaluate(IMediaProvider provider)
        {
            var newMatch = Root.Matches(provider);

            if (savedMatch != newMatch)
            {
                savedMatch = newMatch;
                Changed();
            }
        }

        private void Changed()
        {
            eventTarget.DispatchEvent("change", Context);
        }

        private static MediaNode Parse(string media)
        {
            var normalized = media.Replace("<=", " $lte ").Replace(">=", " $gte ").Replace("<", " $lt ").Replace(">", " $gt ").Replace("=", " $eq ")
                .Replace("(", " ( ").Replace(")", " ) ").Replace(":", " : ");

            var splits = ParserHelpers.SplitComma(normalized);

            var children = new List<MediaNode>();

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];
                var parsed = ParseInner(split, 0);

                children.Add(parsed);
            }

            return new CombinedMediaNode(children, false);
        }

        private static MediaNode ParseInner(string media, int depth)
        {
            var splits = ParserHelpers.SplitWhitespace(media);

            if (splits.Count == 1 && media.FastStartsWith("(") && media.FastEndsWith(")"))
            {
                return ParseInner(new Regex("\\)$").Replace(new Regex("^\\(").Replace(media, ""), ""), depth + 1);
            }

            var allowFeatures = depth > 0;

            var first = splits.Count > 0 ? splits[0] : null;

            if (first == null) return ConstantMediaNode.Never;

            if (first == "not")
            {
                splits.RemoveAt(0);
                return new NegatedMediaNode(ParseInner(string.Join(" ", splits), depth));
            }

            if (splits.Count == 1)
            {
                if (allowFeatures) return new FeatureOrTypeMediaNode(first);
                else return new TypeMediaNode(first);
            }
            if (splits.Count == 2) return ConstantMediaNode.Never;

            if (splits.Count == 3 && allowFeatures)
            {
                var separator = splits[1];

                if (separator == ":")
                {
                    if (NumberConverter.TryGetConstantValue<float>(splits[2], out var f))
                    {
                        if (splits[0].FastStartsWith("min-")) return RangeMediaNode.MinQuery(splits[0].Replace("min-", ""), f, true);
                        if (splits[0].FastStartsWith("max-")) return RangeMediaNode.MaxQuery(splits[0].Replace("max-", ""), f, true);
                        return RangeMediaNode.EqualQuery(splits[0], f);
                    }
                    return new FeatureMediaNode(splits[0], splits[2]);
                }

                if (separator.FastStartsWith("$"))
                {
                    var reversed = false;

                    string prop;
                    float val;

                    if (NumberConverter.TryGetConstantValue(splits[0], out val))
                    {
                        prop = splits[2];
                        reversed = true;
                    }
                    else if (NumberConverter.TryGetConstantValue(splits[2], out val))
                    {
                        prop = splits[0];
                    }
                    else return ConstantMediaNode.Never;

                    if (separator == "$eq") return RangeMediaNode.EqualQuery(prop, val);

                    if (reversed)
                    {
                        if (separator.FastStartsWith("$gt")) return RangeMediaNode.MaxQuery(prop, val, separator == "$gte");
                        if (separator.FastStartsWith("$lt")) return RangeMediaNode.MinQuery(prop, val, separator == "$lte");
                    }
                    else
                    {
                        if (separator.FastStartsWith("$gt")) return RangeMediaNode.MinQuery(prop, val, separator == "$gte");
                        if (separator.FastStartsWith("$lt")) return RangeMediaNode.MaxQuery(prop, val, separator == "$lte");
                    }
                    return ConstantMediaNode.Never;
                }
            }

            if (splits.Count == 5 && allowFeatures)
            {
                var separator1 = splits[1];
                var separator3 = splits[3];

                if (separator1.FastStartsWith("$") && separator3.FastStartsWith("$"))
                {
                    var prop = splits[2];

                    if (NumberConverter.TryGetConstantValue<float>(splits[0], out var f0) && NumberConverter.TryGetConstantValue<float>(splits[4], out var f4))
                    {
                        if (separator1.FastStartsWith("$lt") && separator3.FastStartsWith("$lt"))
                            return new RangeMediaNode(prop, f0, separator1 == "$lte", f4, separator3 == "$lte");
                        if (separator1.FastStartsWith("$gt") && separator3.FastStartsWith("$gt"))
                            return new RangeMediaNode(prop, f4, separator3 == "$gte", f0, separator1 == "$gte");
                    }

                    return ConstantMediaNode.Never;
                }
            }


            if (splits.Count % 2 == 1)
            {
                string conjunction = null;

                var childList = new List<MediaNode>();

                for (int i = 1; i < splits.Count; i += 2)
                {
                    var current = splits[i];

                    var item = ParseInner(splits[i - 1], depth);
                    childList.Add(item);

                    if (conjunction != null && current != conjunction)
                    {
                        childList = new List<MediaNode> { new CombinedMediaNode(childList, conjunction == "and") };
                    }

                    conjunction = current;
                }

                if (conjunction != "and" && conjunction != "or") return ConstantMediaNode.Never;
                childList.Add(ParseInner(splits[splits.Count - 1], depth));

                return new CombinedMediaNode(childList, conjunction == "and");
            }

            return ConstantMediaNode.Never;
        }
    }
}
