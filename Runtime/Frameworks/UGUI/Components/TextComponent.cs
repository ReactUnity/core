using Facebook.Yoga;
using ReactUnity.UGUI.Layout;
using ReactUnity.Styling;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class TextComponent : UGUIComponent, ITextComponent
    {
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextMeasurer Measurer { get; private set; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }

        public string Content => Text.text;

        private string TextInside;
        private bool TextSetByStyle = false;


        public TextComponent(string text, UGUIContext context, string tag) : base(context, tag, false)
        {
            GameObject.name = "TEXT";
            Text = AddComponent<TextMeshProUGUI>();

            Measurer = AddComponent<TextMeasurer>();
            Measurer.Layout = Layout;
            Measurer.Context = context;
            Layout.SetMeasureFunction(Measurer.Measure);

            if (text != null) SetText(text);
        }

        public TextComponent(TextComponent linkedTo) : this(null, linkedTo.Context, "")
        {
            Layout.CopyStyle(linkedTo.Layout);
            ComputedStyle.CopyStyle(linkedTo.ComputedStyle);
            Style = linkedTo.Style;
            Style.changed += StyleChanged;

            SetParent(linkedTo.Parent, linkedTo, true);

            ApplyLayoutStylesSelf();
            ApplyStyles();

            ScheduleLayout();
        }

        public void SetText(string text)
        {
            if (!TextSetByStyle) Text.text = text;
            TextInside = text;
            ScheduleLayout();
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Text.isRightToLeftText = Layout.LayoutDirection == YogaDirection.RTL;
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();
            ComputedStyle.fontFamily.Get(Context, font =>
            {
                Text.font = font;
            });
            Text.fontSize = ComputedStyle.fontSizeActual;
            Text.fontStyle = ComputedStyle.fontStyle;
            Text.fontWeight = ComputedStyle.fontWeight;
            Text.color = ComputedStyle.color;
            Text.enableWordWrapping = ComputedStyle.textWrap;
            Text.alignment = ComputedStyle.textAlign;
            Text.overflowMode = ComputedStyle.textOverflow;

            if (ComputedStyle.content != null)
            {
                Text.text = ComputedStyle.content;
                TextSetByStyle = true;
            }
            else if (TextSetByStyle)
            {
                Text.text = TextInside;
                TextSetByStyle = false;
            }

            var isLinked = ComputedStyle.textOverflow == TextOverflowModes.Linked;
            if (isLinked && !LinkedTextWatcher)
            {
                LinkedTextWatcher = AddComponent<LinkedTextWatcher>();
                LinkedTextWatcher.WatchedText = this;
            }
            else if (!isLinked && LinkedTextWatcher)
            {
                GameObject.Destroy(LinkedTextWatcher);
                if (LinkedTextWatcher?.LinkedText != null)
                    LinkedTextWatcher.LinkedText.Destroy();
                LinkedTextWatcher = null;
            }
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy();
        }
    }
}
