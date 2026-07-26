using System;
using System.Collections.Generic;
using System.Threading;
using QuickJS.Native;
using QuickJS.Utils;

namespace QuickJS
{
    public class ScriptEngine
    {
        private class ScriptRuntimeRef
        {
            public int next;
            public ScriptRuntime target;
            public bool isEditorRuntime;
        }

        public const uint VERSION = 0x723 + 170;

        private static int _freeSlot = -1;
        private static List<ScriptRuntimeRef> _runtimeRefs = new List<ScriptRuntimeRef>();
        private static ReaderWriterLockSlim _rwlock = new ReaderWriterLockSlim();

        private static IO.ByteBufferThreadedPooledAllocator _sharedAllocator;

        /// <summary>
        /// a new runtime is created, this event would always be raised on the script runtime thread.
        /// NOTE: due to it's impossible to create a worker in worker thread for now.
        /// </summary>
        public static event Action<ScriptRuntime> RuntimeCreated;
        public static event Action<ScriptRuntime> RuntimeInitialized;

        static ScriptEngine()
        {
            _sharedAllocator = new IO.ByteBufferThreadedPooledAllocator();
        }

        // unstable interface
        public static int ForEachRuntime(Action<ScriptRuntime> visitor)
        {
            var count = 0;
            try
            {
                _rwlock.EnterReadLock();
                for (int i = 0, len = _runtimeRefs.Count; i < len; ++i)
                {
                    var slot = _runtimeRefs[i];
                    if (slot.target != null && slot.target.isValid)
                    {
                        count++;
                        visitor(slot.target);
                    }
                }
            }
            finally
            {
                _rwlock.ExitReadLock();
            }
            return count;
        }

        public static IScriptLogger GetLogger(JSContext ctx)
        {
            return GetRuntime(ctx)?.GetLogger();
        }

        public static IScriptLogger GetLogger(JSRuntime rt)
        {
            return GetRuntime(rt)?.GetLogger();
        }

        public static ObjectCache GetObjectCache(JSRuntime rt)
        {
            return GetRuntime(rt)?.GetObjectCache();
        }

        public static ObjectCache GetObjectCache(JSContext ctx)
        {
            return GetRuntime(ctx)?.GetObjectCache();
        }

        public static ITypeDB GetTypeDB(JSContext ctx)
        {
            return GetRuntime(ctx)?.GetTypeDB();
        }

        public static ITimerManager GetTimerManager(JSContext ctx)
        {
            return GetRuntime(ctx)?.GetTimerManager();
        }

        // 可跨越运行时分配 (但内容非线程安全)
        public static IO.ByteBuffer AllocSharedByteBuffer(int size)
        {
            return _sharedAllocator.Alloc(size);
        }

        /// <summary>
        /// 分配一个在指定 JSContext 下使用的 Buffer
        /// </summary>
        public static IO.ByteBuffer AllocByteBuffer(JSContext ctx, int size)
        {
            return GetRuntime(ctx)?.GetByteBufferAllocator()?.Alloc(size);
        }

        public static bool IsEditorRuntime(ScriptRuntime runtime)
        {
            var result = false;
            _rwlock.EnterWriteLock();
            var len = _runtimeRefs.Count;
            
            for (int i = 0; i < len; ++i)
            {
                var runtimeRef = _runtimeRefs[i];
                if (runtimeRef.target == runtime)
                {
                    result = true;
                    break;
                }
            }
            _rwlock.ExitWriteLock();
            return result;
        }

        /// <summary>
        /// (内部使用) 获取第一个有效的前台运行时 (不包括编辑器运行时)
        /// </summary>
        public static ScriptRuntime GetRuntime(bool isEditorRuntime)
        {
            ScriptRuntime target = null;
            _rwlock.EnterWriteLock();
            var len = _runtimeRefs.Count;
            
            for (int i = 0; i < len; ++i)
            {
                var runtimeRef = _runtimeRefs[i];
                if (runtimeRef.isEditorRuntime == isEditorRuntime)
                {
                    var runtime = runtimeRef.target;
                    if (runtime != null && !runtime.isWorker && runtime.isRunning && runtime.isValid)
                    {
                        target = runtime;
                        break;
                    }
                }
            }
            _rwlock.ExitWriteLock();
            return target;
        }

        /// <summary>
        /// (内部使用) 获取第一个有效的前台运行时
        /// </summary>
        public static ScriptRuntime GetRuntime()
        {
            ScriptRuntime target = null;
            _rwlock.EnterWriteLock();
            var len = _runtimeRefs.Count;
            
            for (int i = 0; i < len; ++i)
            {
                var runtimeRef = _runtimeRefs[i];
                var runtime = runtimeRef.target;

                if (runtime != null && !runtime.isWorker && runtime.isRunning && runtime.isValid)
                {
                    target = runtime;
                    break;
                }
            }
            _rwlock.ExitWriteLock();
            return target;
        }

        public static ScriptRuntime GetRuntime(JSContext ctx)
        {
            return ctx.IsValid() ? GetRuntime(JSApi.JS_GetRuntime(ctx)) : null;
        }

        public static ScriptRuntime GetRuntime(JSRuntime rt)
        {
            ScriptRuntime runtime = null;

            if (rt.IsValid())
            {
                var id = (int)JSApi.JSB_GetRuntimeOpaque(rt);
                if (id > 0)
                {
                    var index = id - 1;
                    _rwlock.EnterReadLock();
                    var slot = _runtimeRefs[index];
                    runtime = slot.target;
                    _rwlock.ExitReadLock();
                }
            }

            return runtime;
        }

        /// <summary>
        /// (内部使用) 获取第一个有效的前台运行时的 MainContext
        /// </summary>
        public static ScriptContext GetContext()
        {
            var context = GetRuntime();

            if (context != null && context.isValid)
            {
                return context.GetMainContext();
            }

            return null;
        }

        public static ScriptContext GetContext(JSContext ctx)
        {
            if (ctx.IsValid())
            {
                var rt = JSApi.JS_GetRuntime(ctx);
                return GetRuntime(rt)?.GetContext(ctx);
            }
            return null;
        }

        public static ScriptRuntime CreateRuntime()
        {
            return CreateRuntime(false);
        }

        public static ScriptRuntime CreateRuntime(bool isEditorRuntime)
        {
            if (!JSApi.IsValid())
            {
                throw new InvalidOperationException("quickjs library is not matched, you need to rebuild it for current platform");
            }

            _rwlock.EnterWriteLock();
            ScriptRuntimeRef freeEntry;
            int slotIndex;
            if (_freeSlot < 0)
            {
                freeEntry = new ScriptRuntimeRef();
                slotIndex = _runtimeRefs.Count;
                _runtimeRefs.Add(freeEntry);
                freeEntry.next = -1;
            }
            else
            {
                slotIndex = _freeSlot;
                freeEntry = _runtimeRefs[slotIndex];
                _freeSlot = freeEntry.next;
                freeEntry.next = -1;
            }

            var runtime = new ScriptRuntime(slotIndex + 1);
            freeEntry.target = runtime;
            freeEntry.isEditorRuntime = isEditorRuntime;
            runtime.OnAfterDestroy += OnRuntimeAfterDestroy;
            runtime.OnInitialized += OnRuntimeInitialized;
            _rwlock.ExitWriteLock();
            RuntimeCreated?.Invoke(runtime);
            
            return runtime;
        }

        /// <summary>
        /// 关闭所有运行时 (不包括编辑器运行时)
        /// </summary>
        public static void Shutdown()
        {
            _rwlock.EnterWriteLock();
            var len = _runtimeRefs.Count;
            var copylist = new List<ScriptRuntime>(len);
            for (int i = 0; i < len; ++i)
            {
                var runtimeRef = _runtimeRefs[i];
                if (!runtimeRef.isEditorRuntime)
                {
                    var runtime = runtimeRef.target;
                    if (runtime != null)
                    {
                        copylist.Add(runtime);
                    }
                }
            }
            _rwlock.ExitWriteLock();

            for (int i = 0, count = copylist.Count; i < count; ++i)
            {
                var runtime = copylist[i];
                runtime.Shutdown();
            }
        }

        private static void OnRuntimeInitialized(ScriptRuntime runtime)
        {
            runtime.OnInitialized -= OnRuntimeInitialized;
            RuntimeInitialized?.Invoke(runtime);
        }

        private static void OnRuntimeAfterDestroy(int runtimeId)
        {
            if (runtimeId <= 0)
            {
                return;
            }
            _rwlock.EnterWriteLock();
            var index = runtimeId - 1;
            var freeEntry = _runtimeRefs[index];
            freeEntry.next = _freeSlot;
            freeEntry.target = null;
            _freeSlot = index;
            _rwlock.ExitWriteLock();
        }
    }
}
