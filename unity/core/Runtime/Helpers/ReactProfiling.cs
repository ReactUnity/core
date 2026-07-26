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
    }
}
