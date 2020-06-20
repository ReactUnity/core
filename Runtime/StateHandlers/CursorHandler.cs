using ReactUnity.Helpers;
using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.StateHandlers
{
    public class CursorHandler : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
    {
        private string cursor;
        public string Cursor
        {
            set
            {
                cursor = value;
                if (cursorShown) CursorAPI.SetCursor(cursor);
            }
            get { return cursor; }
        }

        private bool cursorShown = false;

        public void OnPointerEnter(PointerEventData eventData)
        {
            CursorAPI.SetCursor(cursor);
            cursorShown = true;
        }

        public void OnPointerExit(PointerEventData eventData)
        {
            CursorAPI.SetCursor("");
            cursorShown = false;
        }
    }
}
