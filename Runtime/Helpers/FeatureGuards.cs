using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class FeatureGuards
    {
        private static bool? vectorGraphics;

        public static bool VectorGraphics
        {
            get
            {
                if (vectorGraphics.HasValue) return vectorGraphics.Value;
#if !REACT_VECTOR_GRAPHICS
                Debug.LogError("To use the 'borderRadius' feature, 'Unity.VectorGraphics' package must be installed.");
                vectorGraphics = false;
#elif UNITY_WEBGL
                Debug.LogError("'borderRadius' feature cannot be used in WebGL builds.");
                vectorGraphics = false;
#else
                if (!Application.isPlaying)
                {
                    vectorGraphics = false;
                    Debug.LogError("'borderRadius' feature cannot be used in Editor mode.");
                }
                else
                {
                    vectorGraphics = true;
                }
#endif

                return vectorGraphics.Value;
            }
        }
    }
}
