using System.Diagnostics.CodeAnalysis;
using ReactUnity.Helpers;

namespace ReactUnity.Scheduling
{
    [ExcludeFromCodeCoverage]
    public class NoScheduler : IScheduler
    {
        public int setTimeout(Callback callback, int timeout) => -1;
        public int setInterval(Callback callback, int timeout) => -1;
        public int setImmediate(Callback callback) => -1;
        public int requestAnimationFrame(Callback callback) => -1;
        public void clearTimeout(int? handle) { }
        public void clearInterval(int? handle) { }
        public void clearImmediate(int? handle) { }
        public void cancelAnimationFrame(int? handle) { }
        public void clearAllTimeouts() { }
    }
}
