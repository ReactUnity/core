namespace ReactUnity.Types
{
    /// <summary>
    /// How an image is resampled when it is not drawn at its own size. Only the two crisp values do
    /// anything: bilinear is what a UI graphic samples with already, so <c>auto</c>, <c>smooth</c>
    /// and <c>high-quality</c> all leave the material alone.
    /// </summary>
    public enum ImageRendering
    {
        Auto = 0,
        Smooth = 1,
        HighQuality = 2,
        CrispEdges = 3,
        Pixelated = 4,
    }
}
