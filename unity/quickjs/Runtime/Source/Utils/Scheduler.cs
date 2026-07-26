using System;
using System.Threading;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    // public delegate void TimeHandleCallback();
    using TimeHandleCallback = Invokable;

    internal class TimeHandle
    {
        public ulong id;
        public TimeHandleCallback action;
        public int delay;
        public int deadline;
        public bool deleted;
        public bool once;
        public WheelSlot slot;

        public void Cleanup()
        {
            if (action != null)
            {
                action.Dispose();
                action = null;
            }
        }
    }

    internal class WheelSlot
    {
        private List<TimeHandle> _timers = new List<TimeHandle>();

        public void Add(TimeHandle timer)
        {
            timer.slot = this;
            _timers.Add(timer);
        }

        public bool Remove(TimeHandle timer)
        {
            if (_timers.Remove(timer))
            {
                timer.slot = null;
                return true;
            }
            // var size = _timers.Count;
            // for (var i = 0; i < size; ++i)
            // {
            //     var it = _timers[i];
            //     if (it == timer)
            //     {
            //         timer.slot = null;
            //         _timers.RemoveAt(i);
            //         return true;
            //     }
            // }
            return false;
        }

        public void Collect(List<TimeHandle> cache)
        {
            var size = _timers.Count;
            for (var i = 0; i < size; ++i)
            {
                var it = _timers[i];
                it.slot = null;
                cache.Add(it);
            }
            _timers.Clear();
        }
    }

    internal class Wheel
    {
        private int _depth;
        private int _jiffies;
        private int _interval;
        private int _timerange;
        private int _index;
        private WheelSlot[] _slots;

        public int depth { get { return _depth; } }

        public int index { get { return _index; } }

        public int range { get { return _timerange; } }

        public Wheel(int depth, int jiffies, int interval, int slots)
        {
            _depth = depth;
            _index = 0;
            _jiffies = jiffies;
            _interval = interval;
            _timerange = _interval * slots;
            _slots = new WheelSlot[slots];
            for (var i = 0; i < slots; i++)
            {
                _slots[i] = new WheelSlot();
            }
        }

        public int Add(int delay, TimeHandle timer)
        {
            var offset = (delay - _interval + _jiffies) / _interval;
            var index = (_index + offset) % _slots.Length;
            _slots[index].Add(timer);
            // Debug.LogWarning($"[wheel#{_depth}:{_index}<range:{_timerange} _interval:{_interval}>] add timer#{timer.id} delay:{delay} to index: {index} offset: {offset}");
            return index;
        }

        public bool Collect(List<TimeHandle> cache)
        {
            _slots[_index++].Collect(cache);
            if (_index == _slots.Length)
            {
                _index = 0;
                return true;
            }
            return false;
            // if (cache.Count > 0)
            // {
            //     Debug.LogWarning($"[wheel#{_depth}:{_index}<range:{_timerange}>] collect timers {cache.Count}");
            // }
        }
    }

    public class Scheduler
    {
        private int _threadId;
        private int _poolCapacity = 500;
        private IScriptLogger _logger;
        private List<TimeHandle> _pool = new List<TimeHandle>();
        private Dictionary<ulong, TimeHandle> _timeHandles = new Dictionary<ulong, TimeHandle>();
        private Wheel[] _wheels;
        private int _timeslice;
        private int _elapsed;
        private int _jiffies;
        private ulong _idgen;
        private List<TimeHandle> _tcache1 = new List<TimeHandle>();
        private List<TimeHandle> _tcache2 = new List<TimeHandle>();
        private List<TimeHandle> _recycle = new List<TimeHandle>();

        public Scheduler(IScriptLogger logger, int jiffies = 10, int slots = 120, int depth = 4, int prealloc = 50, int capacity = 500)
        {
            _threadId = Thread.CurrentThread.ManagedThreadId;
            _logger = logger;
            _jiffies = jiffies;
            _wheels = new Wheel[depth];
            for (int i = 0; i < depth; i++)
            {
                int interval = 1;
                for (var j = 0; j < i; j++)
                {
                    interval *= slots;
                }
                _wheels[i] = new Wheel(i, jiffies, jiffies * interval, slots);
            }
            _poolCapacity = capacity;
            while (prealloc-- > 0)
            {
                _pool.Add(new TimeHandle());
            }
        }

        private void Rearrange(TimeHandle timer)
        {
            var delay = Math.Max(0, timer.deadline - _elapsed);
            var wheelCount = _wheels.Length;
            for (var i = 0; i < wheelCount; i++)
            {
                var wheel = _wheels[i];
                if (delay < wheel.range)
                {
                    wheel.Add(delay, timer);
                    // Debug.Log($"[rearrange] {timer.id} wheel#{i}:{wheel.index}");
                    return;
                }
            }
            _wheels[wheelCount - 1].Add(delay, timer);
            // Debug.Log($"[rearrange] {timer.id} wheel#{wheelCount - 1}:{_wheels[wheelCount - 1].index}");
        }

        private TimeHandle GetTimeHandle(ulong id, int delay, bool once, TimeHandleCallback fn)
        {
            var available = _pool.Count;
            TimeHandle timer;
            if (available > 0)
            {
                timer = _pool[available - 1];
                _pool.RemoveAt(available - 1);
            }
            else
            {
                timer = new TimeHandle();
            }
            timer.id = id;
            timer.delay = delay < 0 ? 0 : delay;
            timer.deadline = timer.delay + _elapsed;
            timer.action = fn;
            timer.once = once;
            timer.deleted = false;
            timer.slot = null;
            return timer;
        }

        public int now
        {
            get { return _elapsed; }
        }

        public int GetActiveTimeHandleCount()
        {
            return _timeHandles.Count;
        }

        public void ForEach(Action<ulong, int, int, bool> walker)
        {
            foreach (var kv in _timeHandles)
            {
                var t = kv.Value;
                if (t.deleted)
                {
                    continue;
                }

                walker(t.id, t.delay, t.deadline, t.once);
            }
        }

        public void Destroy()
        {
            foreach (var kv in _timeHandles)
            {
                var act = kv.Value.action;
                if (act != null)
                {
                    act.Dispose();
                }
            }
            _timeHandles.Clear();
        }

        public ulong Add(int delay, bool once, TimeHandleCallback fn)
        {
            var id = ++_idgen;
            var timer = GetTimeHandle(id, delay, once, fn);
            _timeHandles[id] = timer;
            Rearrange(timer);
            // Debug.Log($"[Scheduler] Add timer#{timer.id} deadline: {timer.deadline}");
            return id;
        }

        public void Remove(ulong id)
        {
            if (id > 0)
            {
                TimeHandle timer;
                if (_timeHandles.TryGetValue(id, out timer))
                {
                    _timeHandles.Remove(id);
                    timer.deleted = true;
                    timer.Cleanup();
                    if (timer.slot != null)
                    {
                        timer.slot.Remove(timer);
                        timer.slot = null;
                    }
                    _recycle.Add(timer);
                }
            }
        }

        public void Update(int ms)
        {
            _timeslice += ms;
            while (_timeslice >= _jiffies)
            {
                // Debug.Log($"[schedule] dt:{ms} _elapsed:@{_elapsed} _jiffies:{_jiffies}");
                _timeslice -= _jiffies;
                _elapsed += _jiffies;

                var wheelIndex = 0;
                // console.log(`[schedule.wheel#${wheelIndex}] slot ${this._wheels[wheelIndex].index} @${this.elapsed}`)
                if (_wheels[wheelIndex].Collect(_tcache1))
                {
                    wheelIndex++;
                    while (wheelIndex < _wheels.Length)
                    {
                        // Debug.Log($"[schedule.wheel#{wheelIndex}] slot {_wheels[wheelIndex].index} @{_elapsed}");
                        // _tcache2.Clear();
                        var tick = _wheels[wheelIndex].Collect(_tcache2);

                        for (int i = 0, size2 = _tcache2.Count; i < size2; ++i)
                        {
                            var timer = _tcache2[i];
                            Rearrange(timer);
                        }
                        _tcache2.Clear();

                        if (!tick)
                        {
                            break;
                        }
                        wheelIndex++;
                    }
                }
            }
            
            InvokeTimers();
        }

        private void InvokeTimers()
        {
            var cachedSize = _tcache1.Count;
            if (cachedSize > 0)
            {
                for (var i = 0; i < cachedSize; ++i)
                {
                    var timer = _tcache1[i];
                    var handler = timer.action;
                    if (timer.slot != null)
                    {
                        timer.slot.Remove(timer);
                        timer.slot = null;
                    }
                    // Debug.LogError($"[timer#{timer.id}] active");

                    if (!timer.deleted && handler != null)
                    {
                        try
                        {
                            handler.Invoke();
                        }
                        catch (Exception exception)
                        {
                            _logger?.WriteException(exception);
                            // Debug.LogErrorFormat("Scheduler Exception: {0}", exception);
                        }
                    }

                    if (!timer.deleted)
                    {
                        if (timer.once)
                        {
                            timer.deleted = true;
                            timer.Cleanup();
                            _timeHandles.Remove(timer.id);
                            _recycle.Add(timer);
                        }
                        else
                        {
                            timer.deadline = timer.delay + _elapsed;
                            Rearrange(timer);
                        }
                    }
                }

                // 回收
                for (int i = 0, size = _recycle.Count; i < size; ++i)
                {
                    var timer = _recycle[i];
                    if (_pool.Count < _poolCapacity)
                    {
                        _pool.Add(timer);
                    }
                }

                _recycle.Clear();
                _tcache1.Clear();
            }
        }
    }
}
