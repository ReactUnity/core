#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;

    public class SimpleSplitView
    {
        public bool init = false; // 是否初始化
        public float splitPivot = 0f;
        public bool resizing = false;
        public Rect cursorChangeRect;
        public Rect cursorHintRect;

        public float cursorHintSize = 2f;
        public float cursorSize = 6f;
        public Color cursorHintColor = new Color(0f, 0f, 0f, 0.35f);

        public bool Draw(Rect rect)
        {
            var startY = rect.y;
            var layout = Event.current.type == EventType.Repaint;

            if (!this.init && layout)
            {
                this.init = true;
                this.splitPivot = Mathf.Max(Mathf.Min(rect.width * .25f, rect.width - 10f), 10f);
            }

            if (!this.resizing)
            {
                this.cursorChangeRect.Set(this.splitPivot - 2f, startY, this.cursorSize, rect.height);
                this.cursorHintRect.Set(this.splitPivot - 2f, startY, this.cursorHintSize, rect.height);
            }

            EditorGUI.DrawRect(this.cursorHintRect, this.cursorHintColor);
            EditorGUIUtility.AddCursorRect(this.cursorChangeRect, MouseCursor.ResizeHorizontal);

            if (Event.current.type == EventType.MouseDown && this.cursorChangeRect.Contains(Event.current.mousePosition))
            {
                this.resizing = true;
            }

            if (this.resizing && layout)
            {
                var y = this.cursorChangeRect.y;
                var h = this.cursorChangeRect.height;
                this.splitPivot = Mathf.Min(Mathf.Max(Event.current.mousePosition.x, 10), rect.width - 10);
                this.cursorChangeRect.Set(this.splitPivot - 2, y, this.cursorSize, h);
                this.cursorHintRect.Set(this.splitPivot - 2, y, this.cursorHintSize, h);
            }

            if (Event.current.type == EventType.MouseUp)
            {
                this.resizing = false;
            }

            return this.resizing;
        }

    }
}
#endif