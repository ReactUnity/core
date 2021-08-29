namespace ReactUnity.Scheduling
{
    public interface IScheduler
    {
        int setImmediate(object callback);
        int setTimeout(object callback, double timeout);
        int setInterval(object callback, double timeout);
        int requestAnimationFrame(object callback);
        void clearTimeout(int? handle);
        void clearInterval(int? handle);
        void clearImmediate(int? handle);
        void cancelAnimationFrame(int? handle);
    }
}
