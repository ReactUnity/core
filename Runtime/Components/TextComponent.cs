using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class TextComponent : UnityComponent
    {
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public FlexSelfControlledElement SelfControl { get; private set; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }


        public TextComponent(string text, UnityUGUIContext context, string tag) : base(context, tag)
        {
            GameObject.name = "TEXT";
            Text = GameObject.AddComponent<TextMeshProUGUI>();

            SelfControl = GameObject.AddComponent<FlexSelfControlledElement>();
            SelfControl.Layout = Layout;
            SelfControl.Context = context;
            Layout.SetMeasureFunction(SelfControl.Measure);

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
            Text.text = text;
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
            Text.font = Style.font;
            Text.fontSize = Style.fontSizeActual;
            Text.fontStyle = Style.fontStyle;
            Text.fontWeight = Style.fontWeight;
            Text.color = Style.fontColor;
            Text.enableWordWrapping = Style.textWrap;
            Text.alignment = Style.textAlign;

            var isLinked = Style.textOverflow == TextOverflowModes.Linked;
            if (isLinked && !LinkedTextWatcher)
            {
                LinkedTextWatcher = GameObject.AddComponent<LinkedTextWatcher>();
                LinkedTextWatcher.WatchedText = this;
            }
            else if (!isLinked && LinkedTextWatcher)
            {
                GameObject.Destroy(LinkedTextWatcher);
                if (LinkedTextWatcher?.LinkedText != null)
                    LinkedTextWatcher.LinkedText.Destroy();
                LinkedTextWatcher = null;
            }

            //Page is appropriate here because it calculates firstOverflowCharacterIndex and masks the text at the same time
            Text.overflowMode = isLinked ? TextOverflowModes.Page : Style.textOverflow;
        }

        public override void Destroy()
        {
            base.Destroy();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy();
        }
    }
}
