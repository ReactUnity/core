using System.Collections.Generic;
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
    /// A <see cref="RectMask2D"/> that only clips when something under it could have changed.
    /// </summary>
    /// <remarks>
    /// Unity re-culls every graphic under every RectMask2D on each canvas update, whether or not
    /// anything moved -- 1.4 ms a frame for the 1175 graphics of a settled kitchen-sink page, which
    /// all sit under its scroll view. Joining, leaving, padding and softness already force a pass,
    /// so what is left to watch is placement: the clip rect, and where each graphic stands.
    /// Comparing those costs a fraction of culling against them.
    ///
    /// A filter-heavy page also renders a dozen times a frame, and nothing a capture does between
    /// its renders moves a clip rect, so a mask that has clipped this frame skips those outright.
    /// </remarks>
    public class CaptureRectMask2D : RectMask2D
    {
        // All private in UGUI; without them every pass runs, which is only slower.
        const BindingFlags Private = BindingFlags.NonPublic | BindingFlags.Instance;
        static readonly FieldInfo forceClipField = typeof(RectMask2D).GetField("m_ForceClip", Private);
        static readonly FieldInfo recalculateField = typeof(RectMask2D).GetField("m_ShouldRecalculateClipRects", Private);
        static readonly FieldInfo targetsField = typeof(RectMask2D).GetField("m_MaskableTargets", Private);
        static readonly FieldInfo clippersField = typeof(RectMask2D).GetField("m_Clippers", Private);

        /// <summary>Off clips on every canvas update, as RectMask2D does. For tests.</summary>
        internal static bool SkipEnabled = true;

        /// <summary>How many passes were skipped because nothing had moved, ever. For tests.</summary>
        internal static int SkippedCount;

        private int clippedFrame = -1;

        private HashSet<MaskableGraphic> targets;
        private List<RectMask2D> clippers;
        private readonly List<MaskableGraphic> seen = new List<MaskableGraphic>();
        private readonly List<Matrix4x4> seenPlaced = new List<Matrix4x4>();
        private readonly List<Rect> seenBounds = new List<Rect>();
        private Rect seenClip;
        private bool seenValid;
        private Matrix4x4 seenMask;
        private Rect seenMaskBounds;
        private bool hasSeen;

        public override void PerformClipping()
        {
            if (!Forced())
            {
                if (OffscreenRender.Active && clippedFrame == Time.frameCount) return;
                if (SkipEnabled && Unmoved())
                {
                    SkippedCount++;
                    clippedFrame = Time.frameCount;
                    return;
                }
            }

            clippedFrame = Time.frameCount;
            base.PerformClipping();
            Snapshot();
        }

        bool Forced()
        {
            if (forceClipField == null || recalculateField == null) return true;
            return (bool) forceClipField.GetValue(this) || (bool) recalculateField.GetValue(this);
        }

        /// <summary>Whether the last pass would come out the same: the same clip rect, and every
        /// graphic it culled still standing where it was.</summary>
        bool Unmoved()
        {
            if (!hasSeen || targets == null || clippers == null) return false;
            if (!seenMask.Equals(rectTransform.localToWorldMatrix) || seenMaskBounds != rectTransform.rect) return false;

            var clip = Clipping.FindCullAndClipWorldRect(clippers, out var valid);
            if (valid != seenValid || clip != seenClip) return false;

            if (targets.Count != seen.Count) return false;
            var i = 0;
            foreach (var target in targets)
            {
                if (!ReferenceEquals(target, seen[i]) || !target) return false;
                var rt = target.rectTransform;
                // Exact, where Matrix4x4's == is approximate.
                if (!seenPlaced[i].Equals(rt.localToWorldMatrix) || seenBounds[i] != rt.rect) return false;
                i++;
            }
            return true;
        }

        void Snapshot()
        {
            hasSeen = false;
            if (targetsField == null || clippersField == null) return;
            targets ??= targetsField.GetValue(this) as HashSet<MaskableGraphic>;
            clippers ??= clippersField.GetValue(this) as List<RectMask2D>;
            if (targets == null || clippers == null) return;

            seen.Clear();
            seenPlaced.Clear();
            seenBounds.Clear();
            foreach (var target in targets)
            {
                if (!target) return;
                var rt = target.rectTransform;
                seen.Add(target);
                seenPlaced.Add(rt.localToWorldMatrix);
                seenBounds.Add(rt.rect);
            }

            seenClip = Clipping.FindCullAndClipWorldRect(clippers, out seenValid);
            seenMask = rectTransform.localToWorldMatrix;
            seenMaskBounds = rectTransform.rect;
            hasSeen = true;
        }

        protected override void OnDisable()
        {
            hasSeen = false;
            base.OnDisable();
        }
    }
}
