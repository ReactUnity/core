using System;
using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Behaviours
{
    /// <summary>
    /// Version of <see cref="ScrollRect"/> that supports smooth scrolling.
    /// </summary>
    public class SmoothScrollRect : ScrollRect
    {
        public float Smoothness { get; set; } = 0.12f;

        /// <summary><c>scroll-behavior: smooth</c>: animate the scrolls this rect is asked to make.</summary>
        public bool SmoothBehavior { get; set; }

        /// <summary>How long one of those takes. Longer than the wheel's, which follows a live gesture.</summary>
        public float BehaviorSmoothness { get; set; } = 0.3f;

        /// <summary>
        /// Where the scroll should come to rest, given where it is heading, in <see cref="ScrollLeft"/>
        /// and <see cref="ScrollTop"/> points -- or null when nothing snaps. A rect cannot answer this
        /// itself, the snap targets being elements, so the component fills it in.
        /// </summary>
        public Func<Vector2, Vector2?> FindSnapTarget { get; set; }

        private Coroutine SmoothCoroutine;
        private Vector2 targetPosition;
        private RectTransform rt;
        private RectTransform RT => rt ?? (rt = GetComponent<RectTransform>());

        private bool dragging;
        private bool snapPending;
        private bool snapInstantly;

        public bool WheelDirectionTransposed { get; set; } = false;

        public float ClientWidth => RT.rect.width;
        public float ClientHeight => RT.rect.height;
        public float ScrollWidth => Mathf.Max(content.rect.width, ClientWidth);
        public float ScrollHeight => Mathf.Max(content.rect.height, ClientHeight);

        // These two jump unless `scroll-behavior` asked for an animation, which is where CSS puts the
        // decision: assigning `scrollTop` is an asked-for scroll, not a gesture.
        public float ScrollLeft
        {
            get => normalizedPosition.x * (ScrollWidth - ClientWidth);
            set => ScrollTo(value, null, SmoothBehavior ? BehaviorSmoothness : 0f);
        }

        public float ScrollTop
        {
            get => (1 - normalizedPosition.y) * (ScrollHeight - ClientHeight);
            set => ScrollTo(null, value, SmoothBehavior ? BehaviorSmoothness : 0f);
        }

        public override void OnScroll(PointerEventData data)
        {
            if (!IsActive())
                return;

            var transpose = WheelDirectionTransposed;

#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
            if (UnityEngine.InputSystem.Keyboard.current?.shiftKey?.isPressed ?? false)
                transpose = !transpose;
#elif ENABLE_LEGACY_INPUT_MANAGER
            if(UnityEngine.Input.GetKey(KeyCode.LeftShift) || UnityEngine.Input.GetKey(KeyCode.RightShift))
                transpose = !transpose;
#endif

            if (transpose) data.scrollDelta = new Vector2(data.scrollDelta.y, data.scrollDelta.x);

#if UNITY_2023_2_OR_NEWER
            // In newer Unity versions, scroll delta is 120 times smaller than before
            // TODO: check if this is a bug on Unity side
            data.scrollDelta *= 120;
#endif

            var positionBefore = normalizedPosition;
            base.OnScroll(data);
            var positionAfter = normalizedPosition;
            ScrollTo(positionBefore, positionAfter, Smoothness, false);
            RequestSnap();
        }

        public override void OnBeginDrag(PointerEventData eventData)
        {
            // The pointer takes over from wherever the animation reached, rather than from where it
            // was headed -- so a running scroll is dropped in place instead of finished first.
            if (SmoothCoroutine != null)
            {
                StopCoroutine(SmoothCoroutine);
                SmoothCoroutine = null;
            }

            dragging = true;
            base.OnBeginDrag(eventData);
        }

        public override void OnEndDrag(PointerEventData eventData)
        {
            base.OnEndDrag(eventData);
            dragging = false;
            RequestSnap();
        }

        /// <summary>
        /// Take a snap once the scroll settles. <paramref name="instant"/> for a snap a layout change
        /// asked for rather than the user: CSS re-snaps on a resize without animating it.
        /// </summary>
        public void RequestSnap(bool instant = false)
        {
            snapPending = true;
            snapInstantly = instant;
        }

        protected override void LateUpdate()
        {
            base.LateUpdate();
            UpdateSnap();
        }

        private void UpdateSnap()
        {
            if (!snapPending || FindSnapTarget == null) return;

            // A drag is still choosing where to go, and an animation is already going somewhere.
            if (dragging || SmoothCoroutine != null) return;

            snapPending = false;

            var target = FindSnapTarget(Projected());
            if (!target.HasValue) return;

            // The inertia the base class would have coasted on is spent: this is the rest position now.
            StopMovement();
            ScrollTo(target.Value.x, target.Value.y, snapInstantly ? 0 : (float?) null);
        }

        /// <summary>
        /// Where the scroll would come to rest untouched, which is what a snap has to measure against --
        /// a fling is asking for the item it is thrown at, not the one under the finger when it let go.
        /// The base class decays the velocity by <c>decelerationRate</c> per second, so the travel left
        /// in it is <c>v / -ln(rate)</c>.
        /// </summary>
        private Vector2 Projected()
        {
            var position = new Vector2(ScrollLeft, ScrollTop);

            if (inertia)
            {
                var rate = Mathf.Clamp(decelerationRate, 0.0001f, 0.9999f);
                var travel = 1f / -Mathf.Log(rate);

                // The content moves against the scroll offset on one axis and with it on the other.
                position += new Vector2(-velocity.x, velocity.y) * travel;
            }

            return new Vector2(
                Mathf.Clamp(position.x, 0, Mathf.Max(0, ScrollWidth - ClientWidth)),
                Mathf.Clamp(position.y, 0, Mathf.Max(0, ScrollHeight - ClientHeight)));
        }

        public void ScrollBy(float? left = null, float? top = null, float? smoothness = null)
        {
            var sl = left ?? 0;
            var st = top ?? 0;

            ScrollTo(ScrollLeft + sl, ScrollTop + st, smoothness);
        }

        public void ScrollTo(float? left = null, float? top = null, float? smoothness = null)
        {
            var sl = left ?? ScrollLeft;
            var st = top ?? ScrollTop;

            var slr = Mathf.Clamp01(sl / (ScrollWidth - ClientWidth));
            var str = Mathf.Clamp01(1 - st / (ScrollHeight - ClientHeight));

            ScrollTo(normalizedPosition, new Vector2(slr, str), smoothness ?? DefaultSmoothness(), true);

            // A scroll that lands off a snap point is snapped from there, the way CSS re-snaps after
            // any scrolling operation and not only after a gesture. The snap resolves to where it
            // already is when this was the snap, so it costs a search rather than a second animation.
            RequestSnap();
        }

        /// <summary>What an asked-for scroll animates over when it names no duration of its own.</summary>
        private float DefaultSmoothness() => SmoothBehavior ? BehaviorSmoothness : Smoothness;

        /// <param name="settle">
        /// Whether the scroll ends where it was sent. A wheel keeps the velocity the base class coasts
        /// on afterwards, which is half of what makes it feel smooth; a scroll aimed at a position --
        /// a snap, a `scrollTop` -- would drift straight back off it.
        /// </param>
        private void ScrollTo(Vector2 positionBefore, Vector2 positionAfter, float smoothness, bool settle)
        {
            if (SmoothCoroutine != null)
            {
                StopCoroutine(SmoothCoroutine);
                SmoothCoroutine = null;
                normalizedPosition = targetPosition;
            }

            if (smoothness > 0)
            {
                targetPosition = positionAfter;

                normalizedPosition = positionBefore;
                SmoothCoroutine = StartCoroutine(StartScroll(positionBefore, positionAfter, smoothness, settle));
            }
            else
            {
                if (settle) StopMovement();
                if (normalizedPosition != positionAfter)
                    normalizedPosition = positionAfter;
            }
        }

        private IEnumerator StartScroll(Vector2 from, Vector2 to, float smoothness, bool settle)
        {
            var passed = 0f;

            while (true)
            {
                yield return null;
                if (settle) StopMovement();
                passed += Time.unscaledDeltaTime;
                if (passed < smoothness)
                    normalizedPosition = Vector2.Lerp(from, to, passed / smoothness);
                else
                {
                    normalizedPosition = to;
                    SmoothCoroutine = null;
                    yield break;
                }
            }
        }
    }
}
