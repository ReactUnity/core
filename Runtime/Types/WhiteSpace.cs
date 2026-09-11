namespace ReactUnity.Types
{
    public enum WhiteSpace
    {
        Normal = 0,
        NoWrap = 1,
        Pre = 2,
        PreWrap = 3,
        PreLine = 4,
        BreakSpaces = 5,
    }

    public static class WhiteSpaceExtensions
    {
        public static bool Wraps(this WhiteSpace value) => value != WhiteSpace.NoWrap && value != WhiteSpace.Pre;

        // TextMeshPro keeps or collapses whitespace as a whole, so `pre-line` has no equivalent and collapses.
        public static bool PreservesWhitespace(this WhiteSpace value) =>
            value == WhiteSpace.Pre || value == WhiteSpace.PreWrap || value == WhiteSpace.BreakSpaces;
    }
}
