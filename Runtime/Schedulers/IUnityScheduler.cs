
using ReactUnity.Interop;
using System;

namespace ReactUnity.Schedulers
{
    public interface IUnityScheduler
    {
        int setTimeout(Callback callback);
        int setTimeout(Callback callback, int timeout);
        int setInterval(Callback callback, int timeout);
        int requestAnimationFrame(Callback callback);
        void clearTimeout(int? handle);
        void clearInterval(int? handle);
        void cancelAnimationFrame(int? handle);
        void clearAllTimeouts();
    }
}
