using Unity.Profiling;

namespace ReactUnity.Helpers
{
    public class ReactProfiling
    {
        static ProfilerMarker CreateMarker(string name)
        {
            var fullName = "ReactUnity." + name;

#if UNITY_2020_3_OR_NEWER
            return new ProfilerMarker(ProfilerCategory.Gui, fullName);
#else
            return new ProfilerMarker(fullName);
#endif
        }

        public static readonly ProfilerMarker Start = CreateMarker("Start");
        public static readonly ProfilerMarker Layout = CreateMarker("Layout");
        public static readonly ProfilerMarker Update = CreateMarker("Update");
        public static readonly ProfilerMarker LateUpdate = CreateMarker("LateUpdate");
        public static readonly ProfilerMarker FlushCommands = CreateMarker("FlushCommands");
        public static readonly ProfilerMarker ParseStyles = CreateMarker("ParseStyles");
        public static readonly ProfilerMarker ProcessStyles = CreateMarker("ProcessStyles");

        // The filter path is measured in phases because its cost is one URP camera entry per
        // capture -- which a capture's own size barely moves, so counting them is what matters.
        public static readonly ProfilerMarker FilterPoll = CreateMarker("Filter.Poll");
        public static readonly ProfilerMarker FilterCapture = CreateMarker("Filter.Capture");
        public static readonly ProfilerMarker FilterInnerBackdrops = CreateMarker("Filter.InnerBackdrops");
        public static readonly ProfilerMarker FilterBlur = CreateMarker("Filter.Blur");
        public static readonly ProfilerMarker FilterMask = CreateMarker("Filter.Mask");
        public static readonly ProfilerMarker FilterComposite = CreateMarker("Filter.Composite");
    }
}
