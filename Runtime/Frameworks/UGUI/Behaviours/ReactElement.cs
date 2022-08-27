using System.Collections;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [SelectionBase]
    [AddComponentMenu("")]
    [DefaultExecutionOrder(-10)]
    public class ReactElement : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }
        public UGUIComponent Component { get; internal set; }

        private bool IsVisible = false;
        private bool firstTime = true;
        private Coroutine currentMotion;

        private bool hasPositionUpdate = false;

        private YogaValue2 translate = YogaValue2.Center;

        public YogaValue2 Translate
        {
            get => translate;
            set
            {
                if (value != translate)
                {
                    hasPositionUpdate = true;
                    translate = value;
                }
            }
        }

        private YogaValue translateZ = YogaValue.Point(0);

        public YogaValue TranslateZ
        {
            get => translateZ;
            set
            {
                if (value.Unit != translateZ.Unit || value.Value != translateZ.Value)
                {
                    hasPositionUpdate = true;
                    translateZ = value;
                }
            }
        }

        private PositionType previousPositionType = PositionType.Relative;
        private PositionType positionType = PositionType.Relative;

        public PositionType PositionType
        {
            get => positionType;
            set
            {
                if (value != positionType)
                {
                    hasPositionUpdate = true;
                    previousPositionType = positionType;
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
            if (Layout == null)
            {
                Destroy(this);
                return;
            }
        }

        private void LateUpdate()
        {
            if (Layout == null)
            {
                Destroy(this);
                return;
            }

            var translate = this.translate;
            if (!Layout.HasNewLayout && !hasPositionUpdate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var pivotDiff = rt.pivot - Vector2.up;


            var tran = new Vector2(
                translate.X.GetPointValue(Layout.LayoutWidth, 0),
                -translate.Y.GetPointValue(Layout.LayoutHeight, 0));
            var visible = Layout.Display != YogaDisplay.None;

            var z = translateZ.Unit == YogaUnit.Point ? translateZ.Value : 0;

            if (positionType != previousPositionType)
            {
                if (positionType != PositionType.Inset)
                {
                    rt.anchorMin = Vector2.up;
                    rt.anchorMax = Vector2.up;
                }
            }

            if (positionType == PositionType.Inset)
            {
                if (currentMotion != null) StopCoroutine(currentMotion);

                float anchorMinX;
                float anchorMinY;
                float anchorMaxX;
                float anchorMaxY;
                float offsetMinX;
                float offsetMinY;
                float offsetMaxX;
                float offsetMaxY;

                if (Layout.Right.HasValue())
                {
                    if (Layout.Left.HasValue())
                    {
                        anchorMinX = Layout.Left.IfPercent(0) / 100f;
                        anchorMaxX = 1 - (Layout.Right.IfPercent(0) / 100f);
                        offsetMinX = Layout.Left.IfPoint() + tran.x;
                        offsetMaxX = -Layout.Right.IfPoint() + tran.x;
                    }
                    else
                    {
                        var anchorValue = 1 - (Layout.Right.IfPercent(0) / 100f);
                        anchorMinX = anchorValue;
                        anchorMaxX = anchorValue;
                        var rightn = Layout.Right.IfPoint();

                        offsetMinX = -rightn + tran.x - Layout.LayoutWidth;
                        offsetMaxX = -rightn + tran.x;
                    }
                }
                else
                {
                    var anchorValue = Layout.Left.IfPercent(0) / 100f;
                    anchorMinX = anchorValue;
                    anchorMaxX = anchorValue;
                    var leftn = Layout.Left.IfPoint();
                    offsetMinX = leftn + tran.x;
                    offsetMaxX = leftn + tran.x + Layout.LayoutWidth;
                }

                if (Layout.Bottom.HasValue())
                {
                    if (Layout.Top.HasValue())
                    {
                        anchorMinY = Layout.Bottom.IfPercent(0) / 100;
                        anchorMaxY = 1 - (Layout.Top.IfPercent(0) / 100);
                        offsetMinY = Layout.Bottom.IfPoint() + tran.y;
                        offsetMaxY = -Layout.Top.IfPoint() + tran.y;
                    }
                    else
                    {
                        var anchorVal = Layout.Bottom.IfPercent(0) / 100;
                        anchorMinY = anchorVal;
                        anchorMaxY = anchorVal;
                        var bottomn = Layout.Bottom.IfPoint();
                        offsetMinY = bottomn + tran.y;
                        offsetMaxY = bottomn + tran.y + Layout.LayoutHeight;
                    }
                }
                else
                {
                    var anchorVal = 1 - (Layout.Top.IfPercent(0) / 100f);
                    anchorMinY = anchorVal;
                    anchorMaxY = anchorVal;
                    var topn = Layout.Top.IfPoint();
                    offsetMinY = -topn + tran.y - Layout.LayoutHeight;
                    offsetMaxY = -topn + tran.y;
                }

                rt.anchorMin = new Vector2(anchorMinX, anchorMinY);
                rt.anchorMax = new Vector2(anchorMaxX, anchorMaxY);
                rt.offsetMin = new Vector2(offsetMinX, offsetMinY);
                rt.offsetMax = new Vector2(offsetMaxX, offsetMaxY);
            }
            else
            {
                var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
                var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

                SetPositionAndSize(new Vector2(posX, posY) + tran, new Vector2(Layout.LayoutWidth, Layout.LayoutHeight), z, visible);
            }
            hasPositionUpdate = false;
            Layout.MarkLayoutSeen();
        }

        private void SetPositionAndSize(Vector2 pos, Vector2 size, float z, bool visible)
        {
            var immediate = !IsVisible || (visible != IsVisible);
            IsVisible = visible;
            if (immediate || firstTime || Component?.ComputedStyle == null)
            {
                SetPositionAndSizeImmediate(pos, size, z);
            }
            else
            {
                var duration = Component.ComputedStyle.motionDuration;
                var delay = Component.ComputedStyle.motionDelay;

                if (duration > 0 || delay > 0)
                {
                    var timingFunction = Component.ComputedStyle.motionTimingFunction;

                    if (currentMotion != null) StopCoroutine(currentMotion);
                    currentMotion = StartCoroutine(StartMotion(pos, size, z, duration, delay, timingFunction));
                }
                else SetPositionAndSizeImmediate(pos, size, z);
            }
        }


        private void SetPositionAndSizeImmediate(Vector2 pos, Vector2 size, float z)
        {
            firstTime = false;
            rt.anchoredPosition = pos;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, size.x);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, size.y);
            var lp = rt.localPosition;
            rt.localPosition = new Vector3(lp.x, lp.y, z);
        }


        private IEnumerator StartMotion(Vector2 pos, Vector2 size, float z, float duration, float delay, TimingFunction timingFunction)
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
                SetPositionAndSizeImmediate(pos, size, z);
                currentMotion = null;
                yield break;
            }

            var end = st + duration;
            var currentPos = rt.anchoredPosition;
            var currentSize = rt.rect.size;
            var currentZ = rt.localPosition.z;

            while (timer.AnimationTime < end)
            {
                var delta = Mathf.Clamp01((timer.AnimationTime - st) / duration);
                var intPos = Interpolater.Interpolate(currentPos, pos, delta, timingFunction);
                var intSize = Interpolater.Interpolate(currentSize, size, delta, timingFunction);
                var intZ = Interpolater.Interpolate(currentZ, z, delta, timingFunction);
                SetPositionAndSizeImmediate(intPos, intSize, intZ);
                yield return null;
            }
            SetPositionAndSizeImmediate(pos, size, z);
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
