using System;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// The origin color of one relative color, decomposed into the four channels of the function it
    /// was written in. One instance per parsed function call, so a nested relative color -- whose
    /// channel names may well be the same letters -- reads its own origin and not the outer one.
    /// </summary>
    internal class RelativeColorContext
    {
        /// <summary>Known while parsing, because the origin was a literal color. Never changes.</summary>
        public float[] Literal;

        /// <summary>Set by <see cref="ComputedRelativeColor"/> while it resolves its channels.</summary>
        public float[] Channels;
    }

    /// <summary>
    /// One channel keyword of a relative color -- `r`, `alpha`, `oklch`'s `c`. It stays a computed
    /// value so that the origin color may be a var() or currentColor, and so that calc() sees it as
    /// an ordinary operand.
    /// </summary>
    internal struct ComputedRelativeChannel : IComputedValue
    {
        private readonly RelativeColorContext Context;
        private readonly int Index;

        public ComputedRelativeChannel(RelativeColorContext context, int index)
        {
            Context = context;
            Index = index;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var channels = Context?.Channels;
            if (channels == null) return null;
            return channels[Index];
        }
    }

    /// <summary>
    /// A relative color whose origin is only known at resolve time. The channels are parsed once;
    /// each resolution decomposes the origin into the context those parsed expressions read from.
    /// </summary>
    internal struct ComputedRelativeColor : IComputedValue
    {
        private readonly IComputedValue Origin;
        private readonly IComputedValue Channels;
        private readonly RelativeColorContext Context;
        private readonly Action<Color, float[]> Decompose;

        public ComputedRelativeColor(IComputedValue origin, IComputedValue channels, RelativeColorContext context, Action<Color, float[]> decompose)
        {
            Origin = origin;
            Channels = channels;
            Context = context;
            Decompose = decompose;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var origin = Origin?.ResolveValue(prop, style, AllConverters.ColorConverter);
            if (!(origin is Color color)) return null;

            var channels = new float[4];
            Decompose(color, channels);

            // Saved and put back rather than just cleared: the same parsed color can be resolved
            // again from inside its own channel expressions, through an attr() that names one.
            var previous = Context.Channels;
            Context.Channels = channels;

            try
            {
                return Channels?.ResolveValue(prop, style, converter);
            }
            finally
            {
                Context.Channels = previous;
            }
        }
    }
}
