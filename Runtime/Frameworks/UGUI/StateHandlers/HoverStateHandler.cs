using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.StateHandlers
{
    public class HoverStateHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        public void OnPointerEnter(PointerEventData eventData)
        {
            OnStateStart?.Invoke();
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            OnStateEnd?.Invoke();
        }

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }
    }
}
