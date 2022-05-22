using ReactUnity.Helpers.Visitors;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
    internal class EventViewportVisitor : ReactComponentVisitor
    {
        RectTransform EventViewport;

        public EventViewportVisitor(RectTransform eventViewport)
        {
            EventViewport = eventViewport;
        }

        public override bool Visit(IReactComponent component)
        {
            switch (component)
            {
                case UGUIComponent u:
                    if (u.InheritedEventViewport == EventViewport) return false;
                    u.InheritedEventViewport = EventViewport;
                    if (u.EventViewport) return false;
                    break;
                default:
                    break;
            }
            return true;
        }
    }
}
