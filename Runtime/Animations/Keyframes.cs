using ExCSS;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity
{
    public class Keyframes
    {
        public static Keyframes Create(IKeyframesRule rule)
        {
            var val = new Keyframes();

            var hasFrom = false;
            var hasTo = false;
            foreach (var kfr in rule.Children.OfType<IKeyframeRule>())
            {
                var kf = Keyframe.Create(kfr);

                if (kf.Offset >= 0 && kf.Offset <= 1)
                {
                    val.Steps.Add(kf);
                    hasFrom = hasFrom || kf.Offset == 0;
                    hasTo = hasTo || kf.Offset == 1;
                }
            }

            if (!hasFrom) val.Steps.Add(new Keyframe() { Offset = 0 });
            if (!hasTo) val.Steps.Add(new Keyframe() { Offset = 1 });

            val.Steps.Sort((a, b) => System.Math.Sign(a.Offset - b.Offset));
            return val;
        }

        public List<Keyframe> Steps { get; private set; } = new List<Keyframe>();
    }

    public class Keyframe
    {
        public static Keyframe Create(IKeyframeRule rule)
        {
            var val = new Keyframe();

            if (rule.KeyText == "from") val.Offset = 0;
            else if (rule.KeyText == "to") val.Offset = 1;
            else
            {
                var offset = ConverterMap.PercentageConverter.Convert(rule.KeyText);
                if (offset is float f) val.Offset = f;
                else val.Offset = -1;
            }

            var styles = RuleHelpers.GetRuleDic(rule.Style, false);
            var layouts = RuleHelpers.GetLayoutDic(rule.Style, false);

            foreach (var rl in styles) val.Rules[rl.Key] = rl.Value;
            foreach (var rl in layouts) val.Rules[rl.prop.name] = rl.value;

            return val;
        }

        public Dictionary<string, object> Rules { get; } = new Dictionary<string, object>();

        public float Offset { get; set; } = 0;
    }
}
