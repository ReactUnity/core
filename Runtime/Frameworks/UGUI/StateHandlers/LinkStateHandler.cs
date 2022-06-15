using System;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.StateHandlers
{
    public class LinkHoverStateHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IStateHandler
    {
        public event Action OnStateStart = default;
        public event Action OnStateEnd = default;

        private bool Entered = false;

        private bool IsActive;

        private TextMeshProUGUI Text;

        private void Start()
        {
            Text = GetComponent<TextMeshProUGUI>();
        }

        public void OnPointerEnter(PointerEventData eventData)
        {
            Entered = true;
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            Entered = false;

            if (IsActive)
            {
                IsActive = false;
                OnStateEnd?.Invoke();
            }
        }

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        void Update()
        {
            var prevActive = IsActive;
            if (Text && Entered)
            {
#if REACT_INPUT_SYSTEM
                var position = UnityEngine.InputSystem.Pointer.current?.position?.ReadValue();
#else
                var position = new Nullable<Vector2>(Input.mousePosition);
#endif
                if (position.HasValue)
                {
                    var res = TMP_TextUtilities.FindIntersectingLink(Text, position.Value, Text.GetComponentInParent<Canvas>()?.worldCamera);
                    IsActive = res != -1;
                }
                else
                {
                    IsActive = false;
                }
            }

            if (IsActive != prevActive)
            {
                if (IsActive) OnStateStart?.Invoke();
                else OnStateEnd?.Invoke();
            }
        }
    }
}
