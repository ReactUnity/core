using System.Runtime.CompilerServices;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    internal static class GeoUtils
    {
        public static readonly Color32 White = Color.white;

        public static readonly Vector3 UpV3 = Vector3.up;
        public static readonly Vector3 DownV3 = Vector3.down;
        public static readonly Vector3 LeftV3 = Vector3.left;
        public static readonly Vector3 RightV3 = Vector3.right;

        public static readonly Vector3 ZeroV3 = Vector3.zero;
        public static readonly Vector2 ZeroV2 = Vector2.zero;

        public static readonly Vector3 UINormal = Vector3.back;
        public static readonly Vector4 UITangent = new Vector4(1.0f, 0.0f, 0.0f, -1.0f);

        public static readonly float QuarterPI = Mathf.PI * 0.25f;
        public static readonly float HalfPI = Mathf.PI * 0.5f;
        public static readonly float TwoPI = Mathf.PI * 2.0f;

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void AddVert(this VertexHelper vh, Vector2 position, Vector2 uv0)
        {
            vh.AddVert(position, White, uv0, ZeroV2, Vector4.zero, Vector4.zero, UINormal, UITangent);
        }
    }
}
