using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class TextComponent : UnityComponent, ITextComponent
    {
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextMeasurer Measurer { get; private set; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }

        private string TextInside;
        private bool TextSetByStyle = false;


        public TextComponent(string text, UnityUGUIContext context, string tag) : base(context, tag)
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
            Style.CopyStyle(linkedTo.Style);
            Inline = linkedTo.Inline;

            SetParent(linkedTo.Parent, linkedTo, true);

            ApplyLayoutStyles();
            ApplyStyles();

            ScheduleLayout();
        }

        public void SetText(string text)
        {
            if (!TextSetByStyle) Text.text = text;
            TextInside = text;
            ScheduleLayout();
        }

        public override void ApplyLayoutStyles()
        {
            base.ApplyLayoutStyles();
            Text.isRightToLeftText = Layout.LayoutDirection == YogaDirection.RTL;
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            Style.fontFamily.Get(Context, font =>
            {
                Text.font = font;
            });
            Text.fontSize = Style.fontSizeActual;
            Text.fontStyle = Style.fontStyle;
            Text.fontWeight = Style.fontWeight;
            Text.color = Style.color;
            Text.enableWordWrapping = Style.textWrap;
            Text.alignment = Style.textAlign;
            Text.overflowMode = Style.textOverflow;
            if (Style.content != null)
            {
                Text.text = Style.content;
                TextSetByStyle = true;
            }
            else if (TextSetByStyle)
            {
                Text.text = TextInside;
                TextSetByStyle = false;
            }

            var isLinked = Style.textOverflow == TextOverflowModes.Linked;
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

        public override void Destroy()
        {
            base.Destroy();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy();
        }
    }
}
