using ReactUnity.Interop;

namespace ReactUnity.Schedulers
{
    public class NoScheduler : IUnityScheduler
    {
        public int setTimeout(Callback callback)
        {
            return -1;
        }
        public int setTimeout(Callback callback, int timeout)
        {
            return -1;
        }

        public int setInterval(Callback callback, int timeout)
        {
            return -1;
        }

        public int setImmediate(Callback callback)
        {
            return -1;
        }

        public int requestAnimationFrame(Callback callback)
        {
            return -1;
        }

        public void clearTimeout(int? handle) { }
        public void clearInterval(int? handle) { }
        public void clearImmediate(int? handle) { }
        public void cancelAnimationFrame(int? handle) { }
        public void clearAllTimeouts() { }
    }
}
