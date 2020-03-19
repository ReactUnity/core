using Jint.Native;
using UnityEngine;

namespace ReactUnity.Schedulers
{
    public class NoScheduler : IUnityScheduler
    {
        public int setTimeout(JsValue callback)
        {
            return -1;
        }
        public int setTimeout(JsValue callback, int timeout)
        {
            return -1;
        }

        public int setInterval(JsValue callback, int timeout)
        {
            return -1;
        }

        public int requestAnimationFrame(JsValue callback)
        {
            return -1;
        }

        public void clearTimeout(int handle) { }
        public void clearInterval(int handle) { }
        public void cancelAnimationFrame(int handle) { }
        public void clearAllTimeouts() { }
    }
}
