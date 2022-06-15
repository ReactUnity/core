using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.EventHandlers
{
    [EventHandlerPriority(EventPriority.Continuous)]
    public class PointerMoveHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IEventHandler
    {
        public event Action<BaseEventData> OnEvent = default;

        private bool Entered = false;
        private BaseInputModule CurrentInputModule;
        private int PointerId;

        public void OnPointerEnter(PointerEventData eventData)
        {
            Entered = true;
            CurrentInputModule = eventData.currentInputModule;
            PointerId = eventData.pointerId;
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            Entered = false;
            CurrentInputModule = null;
        }

        public void ClearListeners()
        {
            OnEvent = null;
        }

        void Update()
        {
            if (Entered && CurrentInputModule && OnEvent != null)
            {
                var ev = GetEventData();
                if (ev != null) OnEvent?.Invoke(ev);
            }
        }

        PointerEventData GetEventData()
        {
            PointerEventData leftData;
            var created = GetPointerData(PointerId, out leftData, true);

#if REACT_INPUT_SYSTEM
            var currentMouse = UnityEngine.InputSystem.Mouse.current;
            if (currentMouse == null) return null;
            var pos = currentMouse.position.ReadValue();
#else
            var pos = Input.mousePosition;
#endif

            leftData.Reset();

            if (created)
                leftData.position = pos;

            if (Cursor.lockState == CursorLockMode.Locked)
            {
                // We don't want to do ANY cursor-based interaction when the mouse is locked
                leftData.position = new Vector2(-1.0f, -1.0f);
                leftData.delta = Vector2.zero;
            }
            else
            {
                leftData.delta = pos - leftData.position;
                leftData.position = pos;

                if (leftData.delta == Vector2.zero) return null;
            }
            return leftData;
        }

        protected Dictionary<int, PointerEventData> m_PointerData = new Dictionary<int, PointerEventData>();

        protected bool GetPointerData(int id, out PointerEventData data, bool create)
        {
            if (!m_PointerData.TryGetValue(id, out data) && create)
            {
                data = new PointerEventData(EventSystem.current) { pointerId = id };
                m_PointerData.Add(id, data);
                return true;
            }
            return false;
        }
    }
}
