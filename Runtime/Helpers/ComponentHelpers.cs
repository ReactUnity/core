namespace ReactUnity.Helpers
{
    public static class ComponentHelpers
    {
        /// <summary>
        /// The nearest element at or above <paramref name="from"/> that scrolls its own content. Pass
        /// the parent to skip an element that scrolls itself, which is what an ancestor scrollport means.
        /// </summary>
        public static IReactComponent NearestScrollContainer(IReactComponent from)
        {
            for (var candidate = from; candidate != null; candidate = candidate.Parent)
                if (candidate.IsScrollContainer) return candidate;
            return null;
        }
    }
}
