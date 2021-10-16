using ReactUnity.Helpers;

namespace ReactUnity.Scheduling
{
    public class DefaultScheduler : IScheduler
    {
        IDispatcher Dispatcher;
        ReactContext Context;

        public DefaultScheduler(IDispatcher dispatcher, ReactContext context)
        {
            Dispatcher = dispatcher;
            Context = context;
        }

        public int setTimeout(object callback, double timeout)
        {
            var cb = Callback.From(callback, Context);
            return Dispatcher.Timeout(() => cb.Call(), (float) timeout / 1000f);
        }

        public int setInterval(object callback, double timeout)
        {
            var cb = Callback.From(callback, Context);
            return Dispatcher.Interval(() => cb.Call(), (float) timeout / 1000f);
        }

        public void clearTimeout(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public void clearInterval(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public int setImmediate(object callback)
        {
            var cb = Callback.From(callback, Context);
            return Dispatcher.Immediate(() => cb.Call());
        }


        public int requestAnimationFrame(object callback)
        {
            var cb = Callback.From(callback, Context);
            return Dispatcher.AnimationFrame(() => cb.Call());
        }

        public void cancelAnimationFrame(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }

        public void clearImmediate(int? handle)
        {
            if (handle.HasValue) Dispatcher.StopDeferred(handle.Value);
        }
    }
}
