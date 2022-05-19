using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class SvgElement : Image
    {
        protected static readonly string styleName = "TabButtonStyles";
        protected static readonly string UxmlName = "Svg";

        [SerializeField]
        private string rawSvg;


        public SvgElement()
        {
        }

        public SvgElement(string svg)
        {
            RawSvg = svg;
        }


        public string RawSvg
        {
            get => rawSvg;
            set
            {
                if (rawSvg == value) return;

                rawSvg = value;
                RebuildSvg();
                MarkDirtyRepaint();
            }
        }

        private void RebuildSvg()
        {
            var (image, rect) = UIToolkitHelpers.GenerateVectorImage(RawSvg);
            sourceRect = rect;
            vectorImage = image;
        }

        new internal class UxmlFactory : UxmlFactory<SvgElement, UxmlTraits> { }

        new internal class UxmlTraits : VisualElement.UxmlTraits
        {
            private readonly UxmlStringAttributeDescription Svg = new UxmlStringAttributeDescription { name = "svg" };

            public override void Init(VisualElement ve, IUxmlAttributes bag, CreationContext cc)
            {
                base.Init(ve, bag, cc);
                SvgElement item = ve as SvgElement;

                item.RawSvg = Svg.GetValueFromBag(bag, cc);
            }
        }
    }
}
