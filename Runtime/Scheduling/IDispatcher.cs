using System;
using System.Collections;

namespace ReactUnity.Scheduling
{
    public interface IDispatcher : IDisposable
    {
        IScheduler Scheduler { get; }

        int OnEveryLateUpdate(Action call);
        int OnEveryUpdate(Action call);

        int OnceUpdate(Action callback);
        int OnceLateUpdate(Action callback);

        int Timeout(Action callback, float timeSeconds);

        int AnimationFrame(Action callback);

        int Interval(Action callback, float intervalSeconds);

        int Immediate(Action callback);

        int StartDeferred(IEnumerator cr);

        int StartDeferred(IEnumerator cr, int handle);

        void StopDeferred(int cr);
    }
}
