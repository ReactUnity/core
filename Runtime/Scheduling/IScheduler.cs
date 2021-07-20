
using ReactUnity.Helpers;

namespace ReactUnity.Scheduling
{
    public interface IScheduler
    {
        int setImmediate(Callback callback);
        int setTimeout(Callback callback, int timeout);
        int setInterval(Callback callback, int timeout);
        int requestAnimationFrame(Callback callback);
        void clearTimeout(int? handle);
        void clearInterval(int? handle);
        void clearImmediate(int? handle);
        void cancelAnimationFrame(int? handle);
    }
}
