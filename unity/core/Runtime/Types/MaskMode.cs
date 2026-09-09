namespace ReactUnity.Types
{
    /// <summary>
    /// What a mask layer's pixels mean. <c>match-source</c> is CSS's default and resolves to
    /// <c>alpha</c> for every source there is here -- an image or a gradient; the SVG
    /// <c>&lt;mask&gt;</c> element it would resolve to luminance for has no counterpart.
    /// </summary>
    public enum MaskMode
    {
        MatchSource = 0,
        Alpha = 1,
        Luminance = 2,
    }
}
