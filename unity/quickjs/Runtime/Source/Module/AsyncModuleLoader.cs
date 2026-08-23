using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using QuickJS.Native;

namespace QuickJS.Module
{
    /// <summary>One pending module load, handed to the host so it can settle it whenever the
    /// response arrives.</summary>
    ///
    /// It is a ticket, not the load itself: the engine state lives in the loader, keyed by id, so
    /// settling is idempotent and a ticket held past the runtime's lifetime settles nothing.
    /// A host callback can outlive the runtime easily -- a UnityWebRequest that comes back after
    /// play mode stopped is the ordinary case, not the exotic one.
    // Deliberately the same shape as Jint's ModuleLoadCompletion, so the two loaders read alike.
    public struct ModuleLoadCompletion
    {
        private readonly AsyncModuleLoader _owner;
        private readonly int _id;

        internal ModuleLoadCompletion(AsyncModuleLoader owner, int id)
        {
            _owner = owner;
            _id = id;
        }

        public void SetSource(string source)
        {
            _owner?.Fulfill(_id, source);
        }

        public void SetError(string message)
        {
            _owner?.Reject(_id, message);
        }
    }

    /// <summary>Fetches each module in a graph without blocking the thread running JS.</summary>
    ///
    /// The engine calls back on that thread, so <see cref="LoadModuleAsync"/> must return
    /// immediately: it queues the fetch and the graph stays pending until every module in it has
    /// settled. Settling from inside the call is allowed too - the engine's graph loading is
    /// re-entrant.
    ///
    /// Installing one replaces the runtime's synchronous loader; the two are mutually exclusive.
    ///
    /// Teardown is two phases, and the order matters. <see cref="Close"/> runs while the context is
    /// still alive and rejects whatever is still in flight; <see cref="Dispose"/> runs after the
    /// runtime is gone and releases the handle the engine was holding.
    public abstract class AsyncModuleLoader : IDisposable
    {
        // Rooted for the lifetime of this loader. GetFunctionPointerForDelegate does not keep a
        // delegate alive, and under IL2CPP the callback also has to be reachable as a static
        // method - hence trampolines that recover the instance from the opaque pointer rather
        // than closures over it.
        private static readonly JSApi.JSModuleLoaderAsyncFunc LoaderTrampolineDelegate = LoaderTrampoline;
        private static readonly JSModuleNormalizeFunc NormalizeTrampolineDelegate = NormalizeTrampoline;
        private static readonly JSApi.JSModuleMetaFunc MetaTrampolineDelegate = MetaTrampoline;

        private struct Pending
        {
            public JSContext ctx;
            public JSModuleLoadHandle handle;
        }

        private readonly Dictionary<int, Pending> _pending = new Dictionary<int, Pending>();
        private ScriptRuntime _runtime;
        private GCHandle _selfHandle;
        private int _nextId;
        private bool _closed;
        private bool _disposed;

        public void Install(ScriptRuntime runtime)
        {
            _runtime = runtime;
            _selfHandle = GCHandle.Alloc(this);
            var opaque = GCHandle.ToIntPtr(_selfHandle);

            JSApi.JS_SetModuleLoaderFuncAsync(runtime, NormalizeTrampolineDelegate, LoaderTrampolineDelegate, opaque);
            JSApi.JS_SetModuleMetaFunc(runtime, MetaTrampolineDelegate, opaque);
        }

        /// <summary>Queues a fetch for <paramref name="moduleName"/> and returns immediately.
        /// Settle <paramref name="completion"/> when the response arrives, or fails.</summary>
        protected abstract void LoadModuleAsync(string moduleName, ModuleLoadCompletion completion);

        /// <summary>Resolves <paramref name="specifier"/> against the module importing it.
        /// Returning null falls back to the path-style normalizer below.</summary>
        protected virtual string Resolve(string referrer, string specifier)
        {
            return null;
        }

        // ------------------------------------------------------------------ settling

        /// Whether it is still safe to call into the engine at all. `isValid` goes false as the
        /// first thing ScriptRuntime.Destroy does, so this covers the whole teardown.
        private bool IsOpen => !_closed && _runtime != null && _runtime.isValid;

        /// Takes the load out of the table, or refuses. Refusing is the normal path for a response
        /// that arrives after the runtime is gone, and for a second settle of the same load.
        private bool TryTake(int id, out Pending pending)
        {
            pending = default;
            if (!IsOpen || !_pending.TryGetValue(id, out pending)) return false;
            _pending.Remove(id);
            return true;
        }

        internal unsafe void Fulfill(int id, string source)
        {
            if (!TryTake(id, out var pending)) return;

            var bytes = Utils.TextUtils.GetNullTerminatedBytes(source ?? string.Empty);
            fixed (byte* ptr = bytes)
            {
                JSApi.JS_FulfillModuleLoad(pending.ctx, pending.handle, ptr, (size_t)(bytes.Length - 1));
            }
        }

        internal void Reject(int id, string message)
        {
            if (!TryTake(id, out var pending)) return;
            RejectPending(pending, message);
        }

        private static void RejectPending(Pending pending, string message)
        {
            // Thrown and taken straight back rather than assembled: that gives a real Error, with
            // the stack the graph's rejection is going to be reported with.
            pending.ctx.ThrowInternalError(message);
            var error = JSApi.JS_GetException(pending.ctx);
            JSApi.JS_RejectModuleLoad(pending.ctx, pending.handle, error);
            JSApi.JS_FreeValue(pending.ctx, error);
        }

        /// <summary>Settles everything still in flight. Must run while the context is still
        /// alive, so before the runtime is destroyed.</summary>
        // An unsettled load holds the handle and the graph's promise, so leaving one behind means
        // JSB_FreeRuntime finds live objects -- "gc object leaks" at best, and with Enter Play Mode
        // domain reload disabled a managed callback that outlives the runtime and settles into
        // freed memory at worst.
        public void Close()
        {
            if (_closed) return;

            if (_runtime != null && _runtime.isValid)
            {
                foreach (var pending in _pending.Values)
                {
                    try
                    {
                        RejectPending(pending, "the script runtime is shutting down");
                    }
                    catch (Exception)
                    {
                        // Teardown continues regardless; there is nowhere left to report to.
                    }
                }
            }

            _pending.Clear();
            _closed = true;
        }

        // ------------------------------------------------------------------ trampolines

        [MonoPInvokeCallback(typeof(JSApi.JSModuleLoaderAsyncFunc))]
        private static void LoaderTrampoline(JSContext ctx, IntPtr module_name, JSValue attributes,
            IntPtr opaque, JSModuleLoadHandle handle)
        {
            var name = JSApi.GetString(module_name);
            var self = FromOpaque(opaque);
            var pending = new Pending { ctx = ctx, handle = handle };

            if (self == null || !self.IsOpen)
            {
                // No loader to queue with, so settle here or the graph hangs forever.
                RejectPending(pending, "the module loader is gone");
                return;
            }

            var id = ++self._nextId;
            self._pending[id] = pending;
            var completion = new ModuleLoadCompletion(self, id);

            // An exception must not cross back into C: it would unwind through the engine's own
            // frames and leave the handle unsettled, hanging the graph forever.
            try
            {
                self.LoadModuleAsync(name, completion);
            }
            catch (Exception exception)
            {
                completion.SetError($"Failed to start loading '{name}': {exception.Message}");
            }
        }

        [MonoPInvokeCallback(typeof(JSModuleNormalizeFunc))]
        private static IntPtr NormalizeTrampoline(JSContext ctx, IntPtr module_base_name, IntPtr module_name,
            IntPtr opaque)
        {
            var self = FromOpaque(opaque);
            if (self == null) return IntPtr.Zero;

            try
            {
                var referrer = JSApi.GetString(module_base_name);
                var specifier = JSApi.GetString(module_name);
                var resolved = self.Resolve(referrer, specifier) ?? DefaultNormalize(referrer, specifier);

                // The engine frees what it gets back, so it has to be engine-allocated.
                return resolved == null ? IntPtr.Zero : ctx.NewCString(resolved);
            }
            catch (Exception exception)
            {
                ctx.ThrowInternalError(exception.Message);
                // Null tells the engine normalization failed; it raises from there.
                return IntPtr.Zero;
            }
        }

        /// <summary>Fills in import.meta for a module that is about to read it.</summary>
        // The module name is the specifier the normalizer resolved, so it is already the address
        // the source was fetched from - which is what import.meta.url has to report, and what
        // every relative import inside that module then resolves against.
        [MonoPInvokeCallback(typeof(JSApi.JSModuleMetaFunc))]
        private static void MetaTrampoline(JSContext ctx, JSModuleDef m, JSValue meta_obj, IntPtr opaque)
        {
            try
            {
                var context = ScriptEngine.GetContext(ctx);
                if (context == null) return;

                var atom = JSApi.JS_GetModuleName(ctx, m);
                var name = JSApi.GetString(ctx, atom);
                JSApi.JS_FreeAtom(ctx, atom);

                JSApi.JS_DefinePropertyValue(ctx, meta_obj, context.GetAtom("url"), ctx.NewString(name));
                JSApi.JS_DefinePropertyValue(ctx, meta_obj, context.GetAtom("main"), JSApi.JS_NewBool(ctx, false));
            }
            catch (Exception)
            {
                // import.meta is left as the engine made it: empty, rather than half filled in.
            }
        }

        /// <summary>The engine's own rule: anything not starting with `.` is taken as given,
        /// otherwise resolve against the referrer's directory, folding `.` and `..`.</summary>
        protected static string DefaultNormalize(string referrer, string specifier)
        {
            if (specifier == null) return null;
            if (!specifier.StartsWith(".", StringComparison.Ordinal)) return specifier;

            var slash = referrer == null ? -1 : referrer.LastIndexOf('/');
            var prefix = slash < 0 ? "" : referrer.Substring(0, slash + 1);
            var parts = new List<string>((prefix + specifier).Split('/'));

            for (var i = 0; i < parts.Count; i++)
            {
                if (parts[i] == "." || (parts[i].Length == 0 && i > 0 && i < parts.Count - 1))
                {
                    parts.RemoveAt(i--);
                }
                else if (parts[i] == ".." && i > 0 && parts[i - 1] != "..")
                {
                    parts.RemoveAt(i);
                    parts.RemoveAt(i - 1);
                    i -= 2;
                }
            }

            return string.Join("/", parts.ToArray());
        }

        private static AsyncModuleLoader FromOpaque(IntPtr opaque)
        {
            if (opaque == IntPtr.Zero) return null;
            var handle = GCHandle.FromIntPtr(opaque);
            return handle.IsAllocated ? handle.Target as AsyncModuleLoader : null;
        }

        public void Dispose()
        {
            if (_disposed) return;
            _disposed = true;

            // Nothing left to reject by now if Close ran first, and if it did not this at least
            // stops a late callback reaching a runtime that is already gone.
            _closed = true;
            _pending.Clear();
            _runtime = null;

            // Only safe once the runtime is gone: the engine still holds the pointer this handle
            // backs, and would hand it to a trampoline again.
            if (_selfHandle.IsAllocated) _selfHandle.Free();
        }
    }
}
