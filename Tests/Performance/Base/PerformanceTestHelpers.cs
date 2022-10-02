using System.Collections.Generic;
using Unity.Profiling.LowLevel.Unsafe;
using Unity.Profiling;

namespace ReactUnity.Tests.Performance
{
    public static class PerformanceTestHelpers
    {
        public struct StatInfo
        {
            public ProfilerCategory Cat;
            public string Name;
            public ProfilerMarkerDataUnit Unit;
        }

        public static List<StatInfo> EnumerateProfilerStats()
        {
            var availableStatHandles = new List<ProfilerRecorderHandle>();
            ProfilerRecorderHandle.GetAvailable(availableStatHandles);

            var availableStats = new List<StatInfo>(availableStatHandles.Count);
            foreach (var h in availableStatHandles)
            {
                var statDesc = ProfilerRecorderHandle.GetDescription(h);
                var statInfo = new StatInfo()
                {
                    Cat = statDesc.Category,
                    Name = statDesc.Name,
                    Unit = statDesc.UnitType
                };
                availableStats.Add(statInfo);
            }

            availableStats.Sort((a, b) => {
                var result = string.Compare(a.Cat.ToString(), b.Cat.ToString());
                if (result != 0)
                    return result;

                return string.Compare(a.Name, b.Name);
            });

            return availableStats;
        }
    }
}
