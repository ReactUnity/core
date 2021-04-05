namespace ReactUnity.Helpers
{
    public static class CursorAPI
    {
        public static void SetCursor(string cursor)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            setCursor(cursor);
#else
            //Debug.Log($"Set Cursor: {cursor}");
#endif
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")]
        private static extern void setCursor(string cursor);
#endif
    }
}
