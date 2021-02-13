using ReactUnity.Interop;
using ReactUnity.Schedulers;

namespace ReactUnity.Editor.Renderer
{
    public class EditorScheduler : IUnityScheduler
    {
        public int setTimeout(Callback callback, int timeout)
        {
            return EditorDispatcher.Timeout(() => callback.Call(), timeout / 1000f);
        }

        public int setInterval(Callback callback, int timeout)
        {
            return EditorDispatcher.Interval(() => callback.Call(), timeout / 1000f);
        }

        public void clearTimeout(int? handle)
        {
            if (handle.HasValue) EditorDispatcher.StopDeferred(handle.Value);
        }

        public void clearInterval(int? handle)
        {
            if (handle.HasValue) EditorDispatcher.StopDeferred(handle.Value);
        }

        public int setImmediate(Callback callback)
        {
            return EditorDispatcher.Immediate(() => callback.Call());
        }


        public int requestAnimationFrame(Callback callback)
        {
            return EditorDispatcher.AnimationFrame(() => callback.Call());
        }

        public void cancelAnimationFrame(int? handle)
        {
            if (handle.HasValue) EditorDispatcher.StopDeferred(handle.Value);
        }

        public void clearImmediate(int? handle)
        {
            if (handle.HasValue) EditorDispatcher.StopDeferred(handle.Value);
        }

        public void clearAllTimeouts()
        {
        }
    }
}
