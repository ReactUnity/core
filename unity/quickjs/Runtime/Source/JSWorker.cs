using System;
using System.Threading;
using System.Collections.Generic;

namespace QuickJS
{
    using QuickJS.IO;
    using QuickJS.Utils;
    using QuickJS.Native;
    using QuickJS.Binding;

    public class JSWorker : Values, IDisposable, IObjectCollectionEntry
    {
        private class JSWorkerArgs
        {
            // for worker only 
            public JSWorker worker;
            public IO.ByteBuffer buffer;
        }

        private JSValue _self; // 在 main thread 中的 worker 自身

        private Thread _thread;
        private ScriptRuntime _parentRuntime;
        private ObjectCollection.Handle _handle;
        private ScriptRuntime _runtime;
        private Queue<IO.ByteBuffer> _inbox = new Queue<ByteBuffer>();

        private JSWorker()
        {
        }

#if JSB_DEBUG
        ~JSWorker()
        {
            if (_inbox.Count != 0)
            {
#if JSB_UNITYLESS
                Console.WriteLine("worker: not cleaned up");
#else
                UnityEngine.Debug.LogError("worker: not cleaned up");
#endif
            }
        }
#endif

        private void Cleanup()
        {
            lock (_inbox)
            {
                while (_inbox.Count != 0)
                {
                    var buf = _inbox.Dequeue();
                    if (buf == null)
                    {
                        break;
                    }
                    buf.Release();
                }
            }
        }

        /// <summary>
        /// should only be called by js object finalizer in main thread
        /// </summary>
        public void Dispose()
        {
            Cleanup();
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            // callback from main thread
            if (!_self.IsUndefined())
            {
                _parentRuntime.FreeValue(_self);
                _self = JSApi.JS_UNDEFINED;
            }
            _runtime.Shutdown();
        }
        #endregion

        private void Start(JSContext ctx, JSValue value, string scriptPath)
        {
            var parent = ScriptEngine.GetRuntime(ctx);
            var runtime = parent.CreateWorker();

            if (runtime == null)
            {
                throw new NullReferenceException();
            }

            _self = JSApi.JS_DupValue(ctx, value);
            _parentRuntime = parent;
            _parentRuntime.AddManagedObject(this, out _handle);

            _runtime = runtime;
            RegisterGlobalObjects();
            _runtime.EvalMain(scriptPath);

            _thread = new Thread(new ThreadStart(Run));
            _thread.Priority = ThreadPriority.Lowest;
            _thread.IsBackground = true;
            _thread.Start();
        }

        private void RegisterGlobalObjects()
        {
            var context = _runtime.GetMainContext();
            var db = context.GetTypeDB();
            var globalObject = context.GetGlobalObject();
            {
                var propName = context.GetAtom("postMessage");
                var postMessage = db.NewDynamicMethod(propName, _js_self_postMessage);
                JSApi.JS_DefinePropertyValue(context, globalObject, propName, postMessage);
            }
            {
                var propName = context.GetAtom("onmessage");
                JSApi.JS_DefinePropertyValue(context, globalObject, propName, JSApi.JS_NULL);
            }
            JSApi.JS_FreeValue(context, globalObject);
        }

        private void Run()
        {
            var tick = Environment.TickCount;
            var list = new List<IO.ByteBuffer>();
            var context = _runtime.GetMainContext();
            var logger = _runtime.GetLogger();

            while (_runtime.isRunning)
            {
                lock (_inbox)
                {
                    list.AddRange(_inbox);
                    _inbox.Clear();
                }

                if (list.Count == 0)
                {
                    Thread.Yield();
                }
                else
                {
                    JSContext ctx = context;
                    var globalObject = context.GetGlobalObject();
                    var onmessage = JSApi.JS_GetPropertyStr(context, globalObject, "onmessage");
                    var callable = JSApi.JS_IsFunction(ctx, onmessage) == 1;

                    for (int i = 0, count = list.Count; i < count; i++)
                    {
                        var byteBuffer = list[i];

                        if (callable)
                        {
                            unsafe
                            {
                                JSValue data;
                                fixed (byte* buf = byteBuffer.data)
                                {
                                    data = JSApi.JSB_Deserialize(ctx, buf, byteBuffer.readableBytes);
                                }

                                do
                                {
                                    if (!data.IsException())
                                    {
                                        var evt = JSApi.JS_NewObject(ctx);
                                        if (!evt.IsException())
                                        {
                                            JSApi.JS_SetProperty(ctx, evt, context.GetAtom("data"), data);
                                            var argv = stackalloc JSValue[1] { evt };
                                            var rval = JSApi.JS_Call(ctx, onmessage, globalObject, 1, argv);
                                            JSApi.JS_FreeValue(ctx, rval);
                                            JSApi.JS_FreeValue(ctx, evt);
                                            break;
                                        }
                                        else
                                        {
                                            JSApi.JS_FreeValue(ctx, data);
                                        }
                                    }

                                    var exceptionString = ctx.GetExceptionString();
                                    if (logger != null)
                                    {
                                        logger.Write(LogLevel.Error, exceptionString);
                                    }
                                } while (false);
                            }
                        }
                        byteBuffer.Release();
                    }
                    JSApi.JS_FreeValue(ctx, onmessage);
                    JSApi.JS_FreeValue(ctx, globalObject);
                    list.Clear();
                }

                var now = Environment.TickCount;
                if (now < tick)
                {
                    _runtime.Update((now - int.MinValue) + (int.MaxValue - tick));
                }
                else
                {
                    _runtime.Update(now - tick);
                }
                tick = now;
            }

            _runtime.Destroy();
        }

        /// <summary>
        /// master 处理 worker 发送的消息 (在master线程回调)
        /// </summary>
        private static unsafe void _MasterOnMessage(ScriptRuntime runtime, object cbArgs, JSValue cbValue)
        {
            var args = (JSWorkerArgs)cbArgs;
            var buffer = args.buffer;

            try
            {
                var worker = args.worker;
                if (worker._runtime.isRunning && worker._parentRuntime.isRunning)
                {
                    var context = runtime.GetMainContext();
                    var ctx = (JSContext)context;
                    var onmessage = JSApi.JS_GetProperty(ctx, worker._self, context.GetAtom("onmessage"));
                    if (onmessage.IsException())
                    {
                        var exceptionString = ctx.GetExceptionString();
                        var logger = runtime.GetLogger();
                        if (logger != null)
                        {
                            logger.Write(LogLevel.Error, exceptionString);
                        }
                    }
                    else
                    {
                        if (JSApi.JS_IsFunction(ctx, onmessage) == 1)
                        {
                            // read object => jsvalue
                            JSValue data;
                            fixed (byte* buf = buffer.data)
                            {
                                data = JSApi.JSB_Deserialize(ctx, buf, buffer.readableBytes);
                            }

                            do
                            {
                                if (!data.IsException())
                                {
                                    var evt = JSApi.JS_NewObject(ctx);
                                    if (!evt.IsException())
                                    {
                                        JSApi.JS_SetProperty(ctx, evt, context.GetAtom("data"), data);
                                        var argv = stackalloc JSValue[1] { evt };
                                        var rval = JSApi.JS_Call(ctx, onmessage, worker._self, 1, argv);
                                        JSApi.JS_FreeValue(ctx, rval);
                                        JSApi.JS_FreeValue(ctx, evt);
                                        break;
                                    }
                                    else
                                    {
                                        JSApi.JS_FreeValue(ctx, data);
                                    }
                                }

                                var exceptionString = ctx.GetExceptionString();
                                var logger = runtime.GetLogger();
                                if (logger != null)
                                {
                                    logger.Write(LogLevel.Error, exceptionString);
                                }
                            } while (false);
                        }
                        else
                        {
                            // not function
                        }
                        JSApi.JS_FreeValue(ctx, onmessage);
                    }
                }
            }
            finally
            {
                buffer.Release();
            }
        }

        private JSValue _js_self_postMessage(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                // ctx is woker runtime
                if (!_runtime.isRunning)
                {
                    return ctx.ThrowInternalError("worker is not running");
                }

                if (argc < 1)
                {
                    return ctx.ThrowInternalError("invalid parameter");
                }

                size_t psize;
                var dataStore = JSApi.JSB_Serialize(ctx, out psize, argv[0]);
                if (dataStore == IntPtr.Zero)
                {
                    return ctx.ThrowInternalError("fail to write object");
                }

                var buffer = ScriptEngine.AllocSharedByteBuffer(psize);
                buffer.WriteBytes(dataStore, psize);
                JSApi.js_free(ctx, dataStore);

                var succ = this._parentRuntime.EnqueueAction(_MasterOnMessage, new JSWorkerArgs { worker = this, buffer = buffer });
                if (!succ)
                {
                    buffer.Release();
                }
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSCFunctionMagic))]
        private static JSValue _js_worker_ctor(JSContext ctx, JSValue new_target, int argc, JSValue[] argv, int magic)
        {
            if (argc < 1 || !argv[0].IsString())
            {
                return ctx.ThrowInternalError("invalid parameter");
            }

            var scriptPath = JSApi.GetString(ctx, argv[0]);
            var worker = new JSWorker();
            var val = NewBridgeClassObject(ctx, new_target, worker, magic, true);
            try
            {
                if (val.IsObject())
                {
                    worker.Start(ctx, val, scriptPath);
                }
            }
            catch (Exception e)
            {
                JSApi.JS_FreeValue(ctx, val);
                return ctx.ThrowException(e);
            }
            return val;
        }

        // main thread post message to worker
        [MonoPInvokeCallback(typeof(JSCFunction))]
        private static JSValue _js_worker_postMessage(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                JSWorker self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }

                if (argc < 1)
                {
                    return ctx.ThrowInternalError("invalid parameter");
                }

                if (!self._runtime.isRunning)
                {
                    return ctx.ThrowInternalError("worker is not running");
                }

                size_t psize;
                var dataStore = JSApi.JSB_Serialize(ctx, out psize, argv[0]);
                if (dataStore == IntPtr.Zero)
                {
                    return ctx.ThrowInternalError("fail to write object");
                }

                var buffer = ScriptEngine.AllocSharedByteBuffer(psize);
                buffer.WriteBytes(dataStore, psize);
                JSApi.js_free(ctx, dataStore);

                lock (self._inbox)
                {
                    if (self._runtime.isRunning)
                    {
                        self._inbox.Enqueue(buffer);
                    }
                    else
                    {
                        buffer.Release();
                    }
                }

                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSCFunction))]
        private static JSValue _js_worker_terminate(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                JSWorker self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }

                self._runtime.Shutdown();
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        public static void Bind(TypeRegister register)
        {
            var cls = register.CreateGlobalClass("Worker", typeof(JSWorker), _js_worker_ctor);
            cls.AddMethod(false, "postMessage", _js_worker_postMessage, 1);
            cls.AddMethod(false, "terminate", _js_worker_terminate);
        }
    }
}
