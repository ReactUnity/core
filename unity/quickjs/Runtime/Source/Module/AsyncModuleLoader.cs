using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using QuickJS.Native;

namespace QuickJS.Module
{
    /// <summary>One pending module load, handed to the host so it can settle it whenever the
    /// response arrives.</summary>
    // Deliberately the same shape as Jint's ModuleLoadCompletion, so the two loaders read alike.
    public struct ModuleLoadCompletion
    {
        private JSContext _ctx;
        private JSModuleLoadHandle _handle;

        internal ModuleLoadCompletion(JSContext ctx, JSModuleLoadHandle handle)
        {
            _ctx = ctx;
            _handle = handle;
        }

        public unsafe void SetSource(string source)
        {
            var bytes = Utils.TextUtils.GetNullTerminatedBytes(source ?? string.Empty);
            fixed (byte* ptr = bytes)
            {
                JSApi.JS_FulfillModuleLoad(_ctx, _handle, ptr, (size_t)(bytes.Length - 1));
            }
        }

        public void SetError(string message)
        {
            // Thrown and taken straight back rather than assembled: that gives a real Error, with
            // the stack the graph's rejection is going to be reported with.
            _ctx.ThrowInternalError(message);
            var error = JSApi.JS_GetException(_ctx);
            JSApi.JS_RejectModuleLoad(_ctx, _handle, error);
            JSApi.JS_FreeValue(_ctx, error);
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
    public abstract class AsyncModuleLoader : IDisposable
    {
        // Rooted for the lifetime of this loader. GetFunctionPointerForDelegate does not keep a
        // delegate alive, and under IL2CPP the callback also has to be reachable as a static
        // method - hence trampolines that recover the instance from the opaque pointer rather
        // than closures over it.
        private static readonly JSApi.JSModuleLoaderAsyncFunc LoaderTrampolineDelegate = LoaderTrampoline;
        private static readonly JSModuleNormalizeFunc NormalizeTrampolineDelegate = NormalizeTrampoline;
        private static readonly JSApi.JSModuleMetaFunc MetaTrampolineDelegate = MetaTrampoline;

        private GCHandle _selfHandle;
        private bool _disposed;

        public void Install(ScriptRuntime runtime)
        {
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

        [MonoPInvokeCallback(typeof(JSApi.JSModuleLoaderAsyncFunc))]
        private static void LoaderTrampoline(JSContext ctx, IntPtr module_name, JSValue attributes,
            IntPtr opaque, JSModuleLoadHandle handle)
        {
            var name = JSApi.GetString(module_name);
            var completion = new ModuleLoadCompletion(ctx, handle);
            var self = FromOpaque(opaque);

            if (self == null)
            {
                completion.SetError("module loader is gone");
                return;
            }

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
            // Only safe once the runtime is gone: the engine still holds the pointer this handle
            // backs, and would hand it to a trampoline again.
            if (_selfHandle.IsAllocated) _selfHandle.Free();
        }
    }
}
