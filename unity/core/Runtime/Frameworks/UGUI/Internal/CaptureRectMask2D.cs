using System.Reflection;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Brackets the offscreen renders a frame takes for filters and backdrops. Every one of them
    /// runs the canvas update again, clipping included.
    /// </summary>
    internal static class OffscreenRender
    {
        static int depth;

        public static bool Active => depth > 0;

        public static void Begin() => depth++;

        public static void End() => depth = Mathf.Max(0, depth - 1);
    }

    /// <summary>
    /// A <see cref="RectMask2D"/> that clips once a frame across the offscreen renders.
    /// </summary>
    /// <remarks>
    /// Unity culls every graphic under every RectMask2D each time a camera renders, and a filter-heavy
    /// page renders a dozen times a frame -- measured at 0.5 ms a render for 362 graphics under three
    /// scroll views. Nothing a capture does between its renders moves a clip rect, so a mask that has
    /// clipped this frame skips the rest, unless a graphic has joined or left it since.
    /// </remarks>
    public class CaptureRectMask2D : RectMask2D
    {
        // Private in UGUI; without it every pass runs, which is only slower.
        static readonly FieldInfo forceClipField =
            typeof(RectMask2D).GetField("m_ForceClip", BindingFlags.NonPublic | BindingFlags.Instance);

        private int clippedFrame = -1;

        public override void PerformClipping()
        {
            if (OffscreenRender.Active && clippedFrame == Time.frameCount && forceClipField != null &&
                !(bool) forceClipField.GetValue(this))
                return;

            clippedFrame = Time.frameCount;
            base.PerformClipping();
        }
    }
}
