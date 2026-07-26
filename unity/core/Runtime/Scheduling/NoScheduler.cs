using System.Diagnostics.CodeAnalysis;

namespace ReactUnity.Scheduling
{
    [ExcludeFromCodeCoverage]
    public class NoScheduler : IScheduler
    {
        public int setTimeout(object callback, double timeout) => -1;
        public int setInterval(object callback, double timeout) => -1;
        public int setImmediate(object callback) => -1;
        public int requestAnimationFrame(object callback) => -1;
        public void clearTimeout(int? handle) { }
        public void clearInterval(int? handle) { }
        public void clearImmediate(int? handle) { }
        public void cancelAnimationFrame(int? handle) { }
        public void clearAllTimeouts() { }
    }
}
