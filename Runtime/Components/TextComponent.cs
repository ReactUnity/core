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
        public static YogaNode TextDefaultLayout { get; } = new YogaNode() { MaxWidth = YogaValue.Percent(100), MaxHeight = YogaValue.Percent(100) };
        public override YogaNode DefaultLayout => TextDefaultLayout;

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public FlexSelfControlledElement SelfControl { get; private set; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }


        public TextComponent(string text, UnityUGUIContext context) : base(context)
        {
            Text = GameObject.AddComponent<TextMeshProUGUI>();

            SelfControl = GameObject.AddComponent<FlexSelfControlledElement>();
            SelfControl.Node = Layout;
            SelfControl.Context = context;
            Layout.SetMeasureFunction(SelfControl.Measure);

            if (text != null) SetText(text);
        }

        public TextComponent(TextComponent linkedTo) : this(null, linkedTo.Context)
        {
            Layout.CopyStyle(linkedTo.Layout);
            Style.CopyStyle(linkedTo.Style);

            SetParent(linkedTo.Parent, linkedTo, true);

            ApplyLayoutStyles();
            ApplyStyles();

            Context.scheduleLayout();
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
            Text.color = Style.resolved.fontColor;
            Text.enableWordWrapping = Style.resolved.textWrap;


            var isLinked = Style.resolved.textOverflow == TextOverflowModes.Linked;
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

            // Page is appropriate here because it calculates firstOverflowCharacterIndex and masks the text at the same time
            Text.overflowMode = isLinked ? TextOverflowModes.Page : Style.resolved.textOverflow;
        }

        public override void Destroy()
        {
            base.Destroy();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy();
        }
    }
}
