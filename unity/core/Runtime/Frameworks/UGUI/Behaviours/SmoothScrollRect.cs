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

        private Coroutine SmoothCoroutine;
        private Vector2 targetPosition;
        private RectTransform rt;
        private RectTransform RT => rt ?? (rt = GetComponent<RectTransform>());

        public bool WheelDirectionTransposed { get; set; } = false;

        public float ClientWidth => RT.rect.width;
        public float ClientHeight => RT.rect.height;
        public float ScrollWidth => Mathf.Max(content.rect.width, ClientWidth);
        public float ScrollHeight => Mathf.Max(content.rect.height, ClientHeight);

        public float ScrollLeft
        {
            get => normalizedPosition.x * (ScrollWidth - ClientWidth);
            set => ScrollTo(value, null, 0);
        }

        public float ScrollTop
        {
            get => (1 - normalizedPosition.y) * (ScrollHeight - ClientHeight);
            set => ScrollTo(null, value, 0);
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
            ScrollTo(positionBefore, positionAfter, Smoothness);
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

            ScrollTo(normalizedPosition, new Vector2(slr, str), smoothness ?? Smoothness);
        }

        private void ScrollTo(Vector2 positionBefore, Vector2 positionAfter, float smoothness)
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
                SmoothCoroutine = StartCoroutine(StartScroll(positionBefore, positionAfter, smoothness));
            }
            else
            {
                if (normalizedPosition != positionAfter)
                    normalizedPosition = positionAfter;
            }
        }

        private IEnumerator StartScroll(Vector2 from, Vector2 to, float smoothness)
        {
            var passed = 0f;

            while (true)
            {
                yield return null;
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
