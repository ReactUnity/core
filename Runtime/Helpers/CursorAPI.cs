#if UNITY_WEBGL && !UNITY_EDITOR
#define REACT_WEBCURSOR
#endif

using System.Collections.Generic;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Helpers
{
    public class CursorAPI
    {
#if REACT_WEBCURSOR
        static HashSet<string> WebGLCursorNames = new HashSet<string>()
        {
            "auto",
            "default",
            "none",
            "context-menu",
            "help",
            "pointer",
            "progress",
            "wait",
            "cell",
            "crosshair",
            "text",
            "vertical-text",
            "alias",
            "copy",
            "move",
            "no-drop",
            "not-allowed",
            "e-resize",
            "n-resize",
            "ne-resize",
            "nw-resize",
            "s-resize",
            "se-resize",
            "sw-resize",
            "w-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "col-resize",
            "row-resize",
            "all-scroll",
            "zoom-in",
            "zoom-out",
            "grab",
            "grabbing",
        };
#endif

        CursorList Current;
        ReactContext Context;
        List<IReactComponent> Components = new List<IReactComponent>();

        public CursorAPI(ReactContext context)
        {
            Context = context;
        }

        public void Push(IReactComponent cmp)
        {
            var top = Components.Count > 0 ? Components[Components.Count - 1] : null;

            if (top == cmp)
            {
                SetCursor(cmp?.ComputedStyle?.cursor);
            }
            else
            {
                Components.Remove(cmp);
                Components.Add(cmp);
                Refresh();
            }
        }

        public void Pop(IReactComponent cmp)
        {
            Components.Remove(cmp);
            Refresh();
        }

        public void Refresh()
        {
            var cmp = Components.Count > 0 ? Components[Components.Count - 1] : null;
            SetCursor(cmp?.ComputedStyle?.cursor);
        }

        void SetCursor(CursorList cursor)
        {
            if (Current == cursor) return;
            Current = cursor;
            UnityEngine.Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto);
#if REACT_WEBCURSOR
            setWebGLCursor("");
#endif
            TrySetCursor(cursor, 0);
        }

        private void TrySetCursor(CursorList cursor, int ind)
        {
            if (cursor?.Items == null || cursor.Items.Length <= ind) return;
            if (Current != cursor) return;
            if (Context == null) return;

            var item = cursor.Items[ind];

            if (item.Image != null)
            {
                item.Image.Get(Context, tx => {
                    if (Current != cursor) return;

                    if (tx) UnityEngine.Cursor.SetCursor(tx, item.Offset, CursorMode.Auto);
#if REACT_WEBCURSOR
                    else if (item.Image.Type == AssetReferenceType.Url) setWebGLCursor(item.Definition);
#endif
                    else TrySetCursor(cursor, ind + 1);
                });
            }
            else if (!string.IsNullOrWhiteSpace(item.Name))
            {
#if REACT_WEBCURSOR
                if (WebGLCursorNames.Contains(item.Name)) {
                    setWebGLCursor(item.Name);
                    return;
                }
#endif

                var set = Context.CursorSet;
                var ct = set.Cursors?.GetValueOrDefault(item.Name);

                if (ct != null) UnityEngine.Cursor.SetCursor(ct.Cursor, ct.Hotspot, CursorMode.Auto);
                else
                {
#if REACT_WEBCURSOR
                    setWebGLCursor(item.Name);
#else
                    TrySetCursor(cursor, ind + 1);
#endif
                }
            }
            else TrySetCursor(cursor, ind + 1);
        }

#if REACT_WEBCURSOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        private static extern void setWebGLCursor(string cursor);
#endif
    }
}
