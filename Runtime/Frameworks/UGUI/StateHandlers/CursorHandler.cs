using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.StateHandlers
{
    public class CursorHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
    {
        public ReactContext Context;
        public IReactComponent Component;

        private CursorList cursor;
        public CursorList Cursor
        {
            set
            {
                cursor = value;
                if (cursorShown) Context.CursorAPI.Refresh();
            }
            get => cursor;
        }

        private bool cursorShown = false;

        public void OnPointerEnter(PointerEventData eventData)
        {
            Context.CursorAPI.Push(Component);
            cursorShown = true;
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            Context.CursorAPI.Pop(Component);
            cursorShown = false;
        }

        private void OnDisable()
        {
            Context.CursorAPI.Pop(Component);
            cursorShown = false;
        }
    }
}
