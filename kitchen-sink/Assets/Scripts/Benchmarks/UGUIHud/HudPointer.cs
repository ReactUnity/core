using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnityKitchenSink.Benchmarks
{
    public enum HudPointerKind
    {
        Skill,
        Tab,
        Item,
    }

    /// <summary>Forwards pointer events to the benchmark by kind and index, so no closure is made per slot.</summary>
    public class HudPointer : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerDownHandler, IPointerUpHandler, IPointerClickHandler
    {
        public UGUIHudBenchmark Owner;
        public HudPointerKind Kind;
        public int Index;

        public void OnPointerEnter(PointerEventData eventData)
        {
            if (Owner) Owner.OnHudHover(Kind, Index, true);
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            if (Owner) Owner.OnHudHover(Kind, Index, false);
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            if (Owner && eventData.button == PointerEventData.InputButton.Left) Owner.OnHudPress(Kind, Index, true);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (Owner && eventData.button == PointerEventData.InputButton.Left) Owner.OnHudPress(Kind, Index, false);
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            if (Owner && eventData.button == PointerEventData.InputButton.Left) Owner.OnHudClick(Kind, Index);
        }
    }
}
