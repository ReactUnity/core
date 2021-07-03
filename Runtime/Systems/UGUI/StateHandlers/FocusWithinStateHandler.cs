using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.StateHandlers
{
    public class FocusWithinStateHandler : MonoBehaviour, IStateHandler
    {
        public event Action<BaseEventData> OnStateStart = default;
        public event Action<BaseEventData> OnStateEnd = default;

        private bool hasFocus = false;

        private GameObject previousSelectedObject;
        private GameObject selectedObject;

        public void ClearListeners()
        {
            OnStateStart = null;
            OnStateEnd = null;
        }

        private void Update()
        {
            // TODO: can make this a singleton and improve performance
            selectedObject = EventSystem.current.currentSelectedGameObject;
            if (selectedObject != previousSelectedObject) SelectedObjectChanged();
            previousSelectedObject = selectedObject;
        }

        private void SelectedObjectChanged()
        {
            var transform = this.transform;
            var current = selectedObject?.transform;

            while (current != null)
            {
                if (current == transform)
                {
                    hasFocus = true;
                    OnStateStart?.Invoke(null);
                    return;
                }

                current = current.parent;
            }

            if (hasFocus) OnStateEnd?.Invoke(null);
        }
    }
}
