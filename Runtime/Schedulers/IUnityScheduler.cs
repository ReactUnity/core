using Jint.Native;

namespace ReactUnity.Schedulers
{
    public interface IUnityScheduler
    {
        int setTimeout(JsValue callback);
        int setTimeout(JsValue callback, int timeout);
        int setInterval(JsValue callback, int timeout);
        void clearTimeout(int handle);
        void clearInterval(int handle);
        void clearAllTimeouts();
    }
}
