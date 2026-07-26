using ReactUnity.Types;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.StateHandlers
{
    public class CursorHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
    {
        public ReactContext Context;
        public IReactComponent Component;

        private ICssValueList<Types.Cursor> cursor;
        public ICssValueList<Types.Cursor> Cursor
        {
            set
            {
                cursor = value;
                if (cursorShown) Context.CursorAPI.Refresh();
            }
            get => cursor;
        }

        private bool cursorShown = false;
        public bool CursorShown
        {
            get => cursorShown;
            set
            {
                if (value != cursorShown)
                {
                    cursorShown = value;
                    if (value) Context?.CursorAPI.Push(Component);
                    else Context?.CursorAPI.Pop(Component);
                }
            }
        }

        private void OnEnable()
        {
            if (Context == null) enabled = false;
        }

        public void OnPointerEnter(PointerEventData eventData)
        {
            CursorShown = true;
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            CursorShown = false;
        }

        private void OnDisable()
        {
            CursorShown = false;
        }
    }
}
