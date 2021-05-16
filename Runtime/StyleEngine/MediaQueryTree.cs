using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.StyleEngine
{
    internal abstract class MediaNode
    {
        public abstract bool Matches(IMediaProvider context);
    }

    internal class NegatedMediaNode : MediaNode
    {
        public MediaNode Child { get; }

        public NegatedMediaNode(MediaNode child)
        {
            Child = child;
        }

        public override bool Matches(IMediaProvider context)
        {
            return !Child.Matches(context);
        }
    }

    internal class CombinedMediaNode : MediaNode
    {
        public bool And = false;

        public List<MediaNode> Children = new List<MediaNode>();

        public CombinedMediaNode(List<MediaNode> children, bool and)
        {
            And = and;
            Children = children;
        }

        public override bool Matches(IMediaProvider context)
        {
            var result = And;

            for (int i = 0; i < Children.Count; i++)
            {
                var child = Children[i];

                var matches = child.Matches(context);

                if (And)
                {
                    if (!matches)
                    {
                        result = false;
                        break;
                    }
                }
                else
                {
                    if (matches)
                    {
                        result = true;
                        break;
                    }
                }
            }

            return result;
        }
    }

    internal class TypeMediaNode : MediaNode
    {
        public string MediaType;

        public static readonly TypeMediaNode All = new TypeMediaNode("all");

        public TypeMediaNode(string type)
        {
            MediaType = type;
        }

        public override bool Matches(IMediaProvider context)
        {
            if (MediaType == null) return false;

            var type = context.MediaType;

            return MediaType == "all" || type == MediaType;
        }
    }

    internal class FeatureOrTypeMediaNode : MediaNode
    {
        public string Name { get; }

        public FeatureOrTypeMediaNode(string name)
        {
            Name = name;
        }

        public override bool Matches(IMediaProvider context)
        {
            if (Name == null) return false;

            var type = context.MediaType;

            if (Name == "all" || type == Name) return true;

            var value = context.GetValue(Name);
            return value != null;
        }
    }

    internal class FeatureMediaNode : MediaNode
    {
        public string Feature { get; }
        public string Condition { get; }

        public FeatureMediaNode(string feature, string condition)
        {
            Feature = feature;
            Condition = condition;
        }

        public override bool Matches(IMediaProvider context)
        {
            if (Feature == null) return false;

            var value = context.GetValue(Feature);

            if (Condition == null) return value != null;

            return value == Condition;
        }
    }

    internal class RangeMediaNode : MediaNode
    {
        public string Property { get; }
        public float Min { get; } = float.MinValue;
        public bool MinInclusive { get; } = true;
        public float Max { get; } = float.MaxValue;
        public bool MaxInclusive { get; } = true;

        public static RangeMediaNode EqualQuery(string prop, float val)
        {
            return new RangeMediaNode(prop, val, true, val, true);
        }

        public static RangeMediaNode MinQuery(string prop, float val, bool inclusive)
        {
            return new RangeMediaNode(prop, val, inclusive, float.MaxValue, true);
        }

        public static RangeMediaNode MaxQuery(string prop, float val, bool inclusive)
        {
            return new RangeMediaNode(prop, float.MinValue, true, val, inclusive);
        }

        public RangeMediaNode(string prop, float min, bool minInclusive, float max, bool maxInclusive)
        {
            Property = prop;
            Min = min;
            Max = max;
            MinInclusive = minInclusive;
            MaxInclusive = maxInclusive;
        }

        public override bool Matches(IMediaProvider context)
        {
            if (Property == null) return false;

            var value = context.GetNumericalValue(Property);

            var matches = true;

            if (MinInclusive) matches &= value >= Min;
            else matches &= value > Min;

            if (MaxInclusive) matches &= value <= Max;
            else matches &= value < Max;

            return matches;
        }
    }

    internal class ConstantMediaNode : MediaNode
    {
        private bool Value;

        public static readonly ConstantMediaNode Always = new ConstantMediaNode(true);
        public static readonly ConstantMediaNode Never = new ConstantMediaNode(false);

        public ConstantMediaNode(bool value)
        {
            Value = value;
        }

        public override bool Matches(IMediaProvider context)
        {
            return Value;
        }
    }
}
