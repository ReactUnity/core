using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;

namespace ReactUnity
{
    public class KeyframeList
    {
        public static KeyframeList Create(IKeyframesRule rule)
        {
            var val = new KeyframeList();

            var hasFrom = false;
            var hasTo = false;
            foreach (var kfr in rule.Children.OfType<IKeyframeRule>())
            {
                var kfs = Keyframe.Create(kfr);

                foreach (var kf in kfs)
                {
                    if (kf.Valid)
                    {
                        val.Steps.Add(kf);

                        if (kf.Offset == 0)
                        {
                            hasFrom = true;
                            val.From = kf;
                        }
                        else if (kf.Offset == 1)
                        {
                            hasTo = true;
                            val.To = kf;
                        }
                    }
                }
            }

            val.Valid = val.Valid && val.Steps.Count > 0;

            if (!hasFrom) val.Steps.Add(val.From = new Keyframe() { Offset = 0 });
            if (!hasTo) val.Steps.Add(val.To = new Keyframe() { Offset = 1 });

            val.Steps.Sort((a, b) => System.Math.Sign(a.Offset - b.Offset));

            foreach (var prop in val.Steps.SelectMany(x => x.Rules.Keys))
            {
                if (prop != null) val.Properties.Add(prop);
            }

            return val;
        }

        public bool Valid { get; private set; } = true;
        public Keyframe From { get; private set; }
        public Keyframe To { get; private set; }
        public List<Keyframe> Steps { get; private set; } = new List<Keyframe>();
        public HashSet<IStyleProperty> Properties { get; private set; } = new HashSet<IStyleProperty>();
    }

    public class Keyframe
    {
        public static List<Keyframe> Create(IKeyframeRule rule)
        {
            var offsets = new HashSet<float>();
            var splits = rule.KeyText.Split(',');

            for (int i = 0; i < splits.Length; i++)
            {
                var split = splits[i].Trim();

                if (split == "from") offsets.Add(0);
                else if (split == "to") offsets.Add(1);
                else
                {
                    var offset = AllConverters.PercentageConverter.Parse(split);
                    if (offset is float f) offsets.Add(f);
                    else offsets.Add(-1);
                }
            }

            return offsets.Select(o => {
                var val = new Keyframe();
                val.Offset = o;

                var styles = RuleHelpers.ConvertStyleDeclarationToRecord(rule.Style, false);
                foreach (var rl in styles) val.Rules[rl.Key] = rl.Value;

                val.Valid = val.Valid && val.Rules.Count > 0 && val.Offset >= 0 && val.Offset <= 1;

                return val;
            }).ToList();
        }

        public bool Valid = true;
        public Dictionary<IStyleProperty, object> Rules { get; } = new Dictionary<IStyleProperty, object>();

        public float Offset { get; set; } = 0;
    }
}
