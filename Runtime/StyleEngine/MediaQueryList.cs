using ReactUnity.Interop;
using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ReactUnity.StyleEngine
{
    public class MediaQueryList
    {
        private static IStyleConverter NumberConverter = ConverterMap.LengthConverter;

        public static MediaQueryList Create(IMediaProvider provider, string media)
        {
            return new MediaQueryList(provider, media);
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
            add
            {
                if (ListenerCount == 0) Subscribe();
                EventListenersInline.Add(value);
            }
            remove
            {
                EventListenersInline.Remove(value);
                if (ListenerCount == 0) Unsubscribe();
            }
        }


        private MediaNode Root = ConstantMediaNode.Never;
        private IMediaProvider Provider;

        private List<Action> EventListenersInline = new List<Action>();
        private List<Tuple<object, Action>> EventListeners = new List<Tuple<object, Action>>();

        private int ListenerCount => EventListenersInline.Count;

        private MediaQueryList(IMediaProvider provider, string media)
        {
            Provider = provider;
            this.media = media;
            Root = Parse(media);
        }

        public void addEventListener(string type, object listener)
        {
            if (type != "change") return;

            if (ListenerCount == 0) Subscribe();

            var callback = new Callback(listener);
            Action action = () => callback.Call();
            EventListeners.Add(Tuple.Create(listener, action));

            OnUpdate += action;
        }

        private void Subscribe()
        {
            Provider.OnUpdate += Reevaluate;
            Reevaluate(Provider);
        }

        public void removeEventListener(string type, object listener)
        {
            if (type != "change") return;

            var ind = EventListeners.FindIndex(x => x.Item1 == listener);

            if (ind < 0) return;

            var tuple = EventListeners[ind];
            EventListeners.RemoveAt(ind);

            OnUpdate -= tuple.Item2;

            if (ListenerCount == 0) Unsubscribe();
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
            for (int i = 0; i < EventListenersInline.Count; i++)
            {
                var listener = EventListenersInline[i];
                listener.Invoke();
            }
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
            if (media.StartsWith("(") && media.EndsWith(")"))
            {
                return ParseInner(new Regex("\\)$").Replace(new Regex("^\\(").Replace(media, ""), ""), depth + 1);
            }

            var allowFeatures = depth > 0;

            var splits = ParserHelpers.SplitWhitespace(media);
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
                    var number = NumberConverter.Convert(splits[2]);

                    if (number is float f)
                    {
                        if (splits[0].StartsWith("min-")) return RangeMediaNode.MinQuery(splits[0].Replace("min-", ""), f, true);
                        if (splits[0].StartsWith("max-")) return RangeMediaNode.MaxQuery(splits[0].Replace("max-", ""), f, true);
                        return RangeMediaNode.EqualQuery(splits[0], f);
                    }
                    return new FeatureMediaNode(splits[0], splits[2]);
                }

                if (separator.StartsWith("$"))
                {
                    var number0 = NumberConverter.Convert(splits[0]);
                    var number2 = NumberConverter.Convert(splits[2]);
                    var reversed = false;

                    string prop;
                    float val;

                    if (number0 is float f0)
                    {
                        prop = splits[2];
                        val = f0;
                        reversed = true;
                    }
                    else if (number2 is float f2)
                    {
                        prop = splits[0];
                        val = f2;
                    }
                    else return ConstantMediaNode.Never;

                    if (separator == "$eq") return RangeMediaNode.EqualQuery(prop, val);

                    if (reversed)
                    {
                        if (separator.StartsWith("$gt")) return RangeMediaNode.MaxQuery(prop, val, separator == "$gte");
                        if (separator.StartsWith("$lt")) return RangeMediaNode.MinQuery(prop, val, separator == "$lte");
                    }
                    else
                    {
                        if (separator.StartsWith("$gt")) return RangeMediaNode.MinQuery(prop, val, separator == "$gte");
                        if (separator.StartsWith("$lt")) return RangeMediaNode.MaxQuery(prop, val, separator == "$lte");
                    }
                    return ConstantMediaNode.Never;
                }
            }

            if (splits.Count == 5 && allowFeatures)
            {
                var separator1 = splits[1];
                var separator3 = splits[3];

                if (separator1.StartsWith("$") && separator3.StartsWith("$"))
                {

                    var number0 = NumberConverter.Convert(splits[0]);
                    var number4 = NumberConverter.Convert(splits[4]);
                    var prop = splits[2];

                    if (number0 is float f0 && number4 is float f4)
                    {
                        if (separator1.StartsWith("$lt") && separator3.StartsWith("$lt"))
                            return new RangeMediaNode(prop, f0, separator1 == "$lte", f4, separator3 == "$lte");
                        if (separator1.StartsWith("$gt") && separator3.StartsWith("$gt"))
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
