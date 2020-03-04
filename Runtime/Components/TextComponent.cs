using Facebook.Yoga;
using ReactUnity.Layout;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class TextComponent : UnityComponent
    {
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { MaxWidth = YogaValue.Percent(100), MaxHeight = YogaValue.Percent(100) };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public FlexSelfControlledElement SelfControl { get; private set; }

        public TextComponent(string text, UnityUGUIContext context) : base(context)
        {
            Text = GameObject.AddComponent<TextMeshProUGUI>();

            SelfControl = GameObject.AddComponent<FlexSelfControlledElement>();
            SelfControl.Node = Layout;
            SelfControl.Context = context;
            Layout.SetMeasureFunction(SelfControl.Measure);

            SetText(text);
        }

        public void SetText(string text)
        {
            Text.text = text;
        }

        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();
            Text.isRightToLeftText = Layout.LayoutDirection == YogaDirection.RTL;
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            Text.fontSize = Style.resolved.fontSize;
            Text.fontStyle = Style.resolved.fontStyle;
            Text.fontWeight = Style.resolved.fontWeight;
            Text.overflowMode = Style.resolved.textOverflow;
            Text.color = Style.resolved.fontColor;
        }
    }
}
