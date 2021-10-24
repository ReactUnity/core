using System.Collections;
using Facebook.Yoga;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [SelectionBase]
    [ExecuteInEditMode]
    [AddComponentMenu("")]
    public class ReactElement : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }
        public UGUIComponent Component { get; internal set; }

        private bool IsVisible = false;
        private bool firstTime = true;
        private Coroutine currentMotion;

        private bool hasPositionUpdate = false;
        private YogaValue2 position = YogaValue2.Center;
        private PositionType positionType = PositionType.Relative;
        public YogaValue2 Translate
        {
            get => position;
            set
            {
                if (value != position)
                {
                    hasPositionUpdate = true;
                    position = value;
                }
            }
        }
        public PositionType PositionType
        {
            get => positionType;
            set
            {
                if (value != positionType)
                {
                    hasPositionUpdate = true;
                    positionType = value;
                }
            }
        }


        private void OnEnable()
        {
            rt = transform as RectTransform;
        }

        private void Start()
        {
            if (Layout == null) enabled = false;
        }

        private void LateUpdate()
        {
            var translate = position;
            if (!Layout.HasNewLayout && !hasPositionUpdate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var pivotDiff = rt.pivot - Vector2.up;


            var tran = new Vector2(CalculateYogaVal(translate.X, Layout.LayoutWidth), -CalculateYogaVal(translate.Y, Layout.LayoutHeight));
            var visible = Layout.Display != YogaDisplay.None;

            if (positionType == PositionType.Static)
            {
                // TODO: improve static positioning to affect 4 sides
                var x = CalculateYogaVal(Layout.Left, Layout.LayoutWidth);
                var y = CalculateYogaVal(Layout.Top, Layout.LayoutHeight);

                var posX = x + pivotDiff.x * Layout.LayoutWidth;
                var posY = -y + pivotDiff.y * Layout.LayoutHeight;

                SetPositionAndSize(new Vector2(posX, posY) + tran, new Vector2(Layout.LayoutWidth, Layout.LayoutHeight), visible);
            }
            else
            {
                var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
                var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

                SetPositionAndSize(new Vector2(posX, posY) + tran, new Vector2(Layout.LayoutWidth, Layout.LayoutHeight), visible);
            }
            hasPositionUpdate = false;
            Layout.MarkLayoutSeen();
        }

        private float CalculateYogaVal(YogaValue val, float size)
        {
            return val.Unit == YogaUnit.Percent ? size * val.Value / 100 : val.Value;
        }

        private void SetPositionAndSize(Vector2 pos, Vector2 size, bool visible)
        {
            var immediate = !IsVisible || (visible != IsVisible);
            IsVisible = visible;
            if (immediate || firstTime || Component?.ComputedStyle == null)
            {
                SetPositionAndSizeImmediate(pos, size);
            }
            else
            {
                var duration = Component.ComputedStyle.motionDuration;
                var delay = Component.ComputedStyle.motionDelay;

                if (duration > 0 || delay > 0)
                {
                    var timingFunction = Component.ComputedStyle.motionTimingFunction;

                    if (currentMotion != null) StopCoroutine(currentMotion);
                    currentMotion = StartCoroutine(StartMotion(pos, size, duration, delay, timingFunction));
                }
                else SetPositionAndSizeImmediate(pos, size);
            }
        }


        private void SetPositionAndSizeImmediate(Vector2 pos, Vector2 size)
        {
            firstTime = false;
            rt.anchoredPosition = pos;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, size.x);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, size.y);
        }


        private IEnumerator StartMotion(Vector2 pos, Vector2 size, float duration, float delay, TimingFunction timingFunction)
        {
            var timer = Component.Context.Timer;
            var st = timer.AnimationTime;

            if (delay > 0)
            {
                yield return Wait(delay);
                st = st + delay;
            }

            if (duration <= 0)
            {
                SetPositionAndSizeImmediate(pos, size);
                currentMotion = null;
                yield break;
            }

            var end = st + duration;
            var currentPos = rt.anchoredPosition;
            var currentSize = rt.rect.size;

            while (timer.AnimationTime < end)
            {
                var delta = Mathf.Clamp01((timer.AnimationTime - st) / duration);
                var intPos = Interpolater.Interpolate(currentPos, pos, delta, timingFunction);
                var intSize = Interpolater.Interpolate(currentSize, size, delta, timingFunction);
                SetPositionAndSizeImmediate(intPos, intSize);
                yield return null;
            }
            SetPositionAndSizeImmediate(pos, size);
            currentMotion = null;
        }

        private IEnumerator Wait(float delay)
        {
            var timer = Component.Context.Timer;

            var st = timer.AnimationTime;
            var end = st + delay;

            while (timer.AnimationTime < end)
            {
                yield return null;
            }
        }
    }
}
