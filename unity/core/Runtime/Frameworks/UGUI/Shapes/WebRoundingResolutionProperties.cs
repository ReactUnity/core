using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    [System.Serializable]
    public class WebRoundingResolutionProperties
    {
        public enum ResolutionType
        {
            Calculated,
            Fixed
        }

        public ResolutionType Resolution = ResolutionType.Calculated;
        [MinAttribute(2)] public int FixedResolution = 10;
        [MinAttribute(0.01f)] public float ResolutionMaxDistance = 1.0f;

        public WebRoundingResolutionProperties() { }

        public WebRoundingResolutionProperties(int fixedResolution)
        {
            Resolution = ResolutionType.Fixed;
            FixedResolution = fixedResolution;
        }

        public WebRoundingResolutionProperties(float resolutionMaxDistance)
        {
            Resolution = ResolutionType.Calculated;
            ResolutionMaxDistance = resolutionMaxDistance;
        }

        public int AdjustedResolution { private set; get; }
        public bool MakeSharpCorner { private set; get; }

        public void OnCheck(int minFixedResolution = 2)
        {
            FixedResolution = Mathf.Max(FixedResolution, minFixedResolution);
            ResolutionMaxDistance = Mathf.Max(ResolutionMaxDistance, 0.1f);
        }

        public void UpdateAdjusted(float radius, float numCorners, WebRoundingResolutionProperties matchRounding = null)
        {
            UpdateAdjusted(radius, this, numCorners, matchRounding);
        }

        public void UpdateAdjusted(
            float radius,
            WebRoundingResolutionProperties overrideProperties,
            float numCorners,
            WebRoundingResolutionProperties matchRounding = null
        )
        {
            if (matchRounding != null)
            {
                MakeSharpCorner = matchRounding.MakeSharpCorner;
                AdjustedResolution = matchRounding.AdjustedResolution;
                return;
            }

            MakeSharpCorner = radius < 0.001f;

            switch (overrideProperties.Resolution)
            {
                case ResolutionType.Calculated:
                    float circumference = GeoUtils.TwoPI * radius;

                    AdjustedResolution = Mathf.CeilToInt(circumference / overrideProperties.ResolutionMaxDistance / numCorners);
                    AdjustedResolution = Mathf.Max(AdjustedResolution, 2);
                    break;
                case ResolutionType.Fixed:
                    AdjustedResolution = overrideProperties.FixedResolution;
                    break;
            }
        }
    }
}
