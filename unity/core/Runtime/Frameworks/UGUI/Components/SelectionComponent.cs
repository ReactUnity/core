using ReactUnity.UGUI.Internal;
using Yoga;

namespace ReactUnity.UGUI
{
    /// <summary>
    /// The `::selection` pseudo-element of an input. Nothing of it is drawn: its computed background color
    /// is the TMP_InputField's selection highlight, which is the only part of a selection TMP can recolor.
    /// </summary>
    public class SelectionComponent : UGUIComponent
    {
        protected override string DefaultName => "[Selection]";

        public SelectionComponent(UGUIContext context) : base(context, "_selection", false)
        {
            IsPseudoElement = true;
            Component.enabled = false;
            Layout.PositionType = YogaPositionType.Absolute;
            Layout.Width = 0;
            Layout.Height = 0;
        }

        protected override void ApplyLayoutStylesSelf() { }

        public override BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle) => null;

        protected override void ApplyStylesSelf()
        {
            if (Parent is InputComponent input) input.InputField.selectionColor = ComputedStyle.backgroundColor;
        }
    }
}
