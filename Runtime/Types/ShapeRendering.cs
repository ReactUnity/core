namespace ReactUnity.Types
{
    /// <summary>
    /// SVG's trade between edge quality and speed, which here decides how a <c>clip-path</c> is cut.
    /// The two fast values let a curved or slanted clip use the stencil, with aliased edges, instead of
    /// an offscreen capture; <c>geometricPrecision</c> keeps even a plain box on the capture.
    /// </summary>
    public enum ShapeRendering
    {
        Auto = 0,
        OptimizeSpeed = 1,
        CrispEdges = 2,
        GeometricPrecision = 3,
    }
}
