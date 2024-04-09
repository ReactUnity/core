using System;

#if ENABLE_IL2CPP
using AOT;
#endif

namespace Facebook.Yoga
{
    public class YogaConfig
    {
        internal static readonly YogaConfig Default = new YogaConfig(YGConfigHandle.Default);

        internal YGConfigHandle Handle { get; }
        public Logger Logger { get; set; }

        private YogaConfig(YGConfigHandle ygConfig)
        {
            Handle = ygConfig;
            if (Handle.IsInvalid) throw new InvalidOperationException("Failed to allocate native memory");

            Handle.SetContext(this);
        }

        public YogaConfig() : this(Native.YGConfigNew()) { }

        public void SetExperimentalFeatureEnabled(YogaExperimentalFeature feature, bool enabled) => Native.YGConfigSetExperimentalFeatureEnabled(Handle, feature, enabled);
        public bool IsExperimentalFeatureEnabled(YogaExperimentalFeature feature) => Native.YGConfigIsExperimentalFeatureEnabled(Handle, feature);

        public YogaErrata Errata
        {
            get => Native.YGConfigGetErrata(Handle);
            set => Native.YGConfigSetErrata(Handle, value);
        }

        public bool UseWebDefaults
        {
            get => Native.YGConfigGetUseWebDefaults(Handle);
            set => Native.YGConfigSetUseWebDefaults(Handle, value);
        }

        public float PointScaleFactor
        {
            get => Native.YGConfigGetPointScaleFactor(Handle);
            set => Native.YGConfigSetPointScaleFactor(Handle, value);
        }
    }
}
