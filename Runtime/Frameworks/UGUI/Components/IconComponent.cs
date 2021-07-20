using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.UGUI.Behaviours;
using TMPro;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class IconComponent : UGUIComponent, ITextComponent
    {
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextMeasurer Measurer { get; private set; }

        public string Content => Text.text;

        private string TextInside;
        private string AppliedText;
        private bool TextSetByStyle = false;

        public IconSet Set { get; private set; }

        public IconComponent(string text, UGUIContext context, string tag) : base(context, tag, false)
        {
            Text = AddComponent<TextMeshProUGUI>();
            Measurer = AddComponent<TextMeasurer>();
            Measurer.Layout = Layout;
            Measurer.Context = context;
            Layout.SetMeasureFunction(Measurer.Measure);

            ApplySet(Context.DefaultIconSet);

            if (text != null) SetText(text);
        }

        public void ApplyText(string text)
        {
            AppliedText = text;

            if (text != null && Set != null) Text.text = Set.ConvertTextContent(text);
            else Text.text = "";
            Layout.MarkDirty();
            ScheduleLayout();
        }

        public void SetText(string text)
        {
            if (!TextSetByStyle) ApplyText(text);
            TextInside = text;
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Text.isRightToLeftText = Layout.LayoutDirection == YogaDirection.RTL;
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();
            Text.fontSize = ComputedStyle.fontSizeActual;
            Text.fontStyle = ComputedStyle.fontStyle;
            Text.fontWeight = ComputedStyle.fontWeight;
            Text.color = ComputedStyle.color;
            Text.alignment = ComputedStyle.textAlign;

            if (ComputedStyle.content != null)
            {
                ApplyText(ComputedStyle.content);
                TextSetByStyle = true;
            }
            else if (TextSetByStyle)
            {
                ApplyText(TextInside);
                TextSetByStyle = false;
            }
        }

        public void ApplySet(object value)
        {
            if (value == null)
            {
                Set = Context.DefaultIconSet;
            }
            else if (value is IconSet i) Set = i;
            else
            {
                var str = value?.ToString();
                if (Context.IconSets.TryGetValue(str, out var ic)) Set = ic;
                else Set = null;
            }

            Text.font = Set?.FontAsset;
            ApplyText(AppliedText);
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "set") ApplySet(value);
            else base.SetProperty(propertyName, value);
        }
    }
}
