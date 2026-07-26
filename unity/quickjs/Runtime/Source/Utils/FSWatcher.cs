using System;
using System.IO;

namespace QuickJS.Utils
{
    using QuickJS;
    using QuickJS.Native;
    using QuickJS.Binding;

    public class FSWatcher : Values, IDisposable, IObjectCollectionEntry
    {
        private FileSystemWatcher _fsw;
        private bool _isDelayedUntilActive = true;

        private FSWatcher(string path, string filter)
        {
            try
            {
                _fsw = new FileSystemWatcher(path ?? ".", filter ?? "*.*");
                _fsw.Changed += OnChanged;
                _fsw.Created += OnCreated;
                _fsw.Deleted += OnDeleted;
                _fsw.EnableRaisingEvents = true;
            }
            catch (Exception)
            {
                // failed to watch, it usually caused by watching not-exsited folder/file
            }
        }

        private void OnChanged(object sender, FileSystemEventArgs e)
        {
            _runtime.EnqueueAction(_JSActionCallback, e, _isDelayedUntilActive);
        }

        private void OnCreated(object sender, FileSystemEventArgs e)
        {
            _runtime.EnqueueAction(_JSActionCallback, e, _isDelayedUntilActive);
        }

        private void OnDeleted(object sender, FileSystemEventArgs e)
        {
            _runtime.EnqueueAction(_JSActionCallback, e, _isDelayedUntilActive);
        }

        private void _DisposeWatcher()
        {
            if (_fsw != null)
            {
                _fsw.Dispose();
                _fsw = null;
            }
        }

        private static string GetFullPath(string filePath)
        {
#if UNITY_EDITOR_OSX || UNITY_STANDALONE_OSX
            return new FileInfo(filePath).FullName;
#else
            return filePath;
#endif
        }

        private void _JSActionCallback(ScriptRuntime runtime, object cbArgs, JSValue cbValue)
        {
            // check if the runtime or this FSWatcher has already been destroyed
            if (!runtime.isValid || !runtime.isRunning || _jsThis.IsUndefined())
            {
                return;
            }

            var e = (FileSystemEventArgs)cbArgs;
            switch (e.ChangeType)
            {
                case WatcherChangeTypes.Changed:
                    Call(_onchange, e.Name, GetFullPath(e.FullPath));
                    break;
                case WatcherChangeTypes.Created:
                    Call(_oncreate, e.Name, GetFullPath(e.FullPath));
                    break;
                case WatcherChangeTypes.Deleted:
                    Call(_ondelete, e.Name, GetFullPath(e.FullPath));
                    break;
            }
        }

        private unsafe void Call(JSValue func, string name, string fullPath)
        {
            if (!_jsContext.IsValid() || JSApi.JS_IsFunction(_jsContext, func) != 1)
            {
                return;
            }

            var argv = stackalloc JSValue[2]
            {
                _jsContext.NewString(name),
                _jsContext.NewString(fullPath),
            };
            var ret = JSApi.JS_Call(_jsContext, func, JSApi.JS_UNDEFINED, 2, argv);
            JSApi.JS_FreeValue(_jsContext, argv[0]);
            JSApi.JS_FreeValue(_jsContext, argv[1]);
            if (ret.IsException())
            {
                _jsContext.print_exception(Utils.LogLevel.Error, $"exception thrown in FSWatcher.Call: ${name} Path: ${fullPath}");
            }
            else
            {
                JSApi.JS_FreeValue(_jsContext, ret);
            }
        }

        #region JS Bridging
        private JSValue _jsThis; // dangeous reference holder (no ref count)
        private JSContext _jsContext; // dangeous reference holder
        private ScriptRuntime _runtime;

        private JSValue _oncreate;
        private JSValue _ondelete;
        private JSValue _onchange;

        private ObjectCollection.Handle _handle;

        private void _Transfer(JSContext ctx, JSValue value)
        {
            _jsContext = ctx;
            _jsThis = value;

            _runtime = ScriptEngine.GetRuntime(ctx);
            _runtime.AddManagedObject(this, out _handle);
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            Dispose();
        }
        #endregion

        // = OnJSFinalize
        public void Dispose()
        {
            if (_jsThis.IsUndefined())
            {
                return;
            }

            _DisposeWatcher();
            _jsThis = JSApi.JS_UNDEFINED;

            if (_runtime != null)
            {
                _runtime.RemoveManagedObject(_handle);
                _runtime = null;
            }

            if (_jsContext.IsValid())
            {
                JSApi.JS_FreeValue(_jsContext, _oncreate);
                _oncreate = JSApi.JS_UNDEFINED;

                JSApi.JS_FreeValue(_jsContext, _ondelete);
                _ondelete = JSApi.JS_UNDEFINED;

                JSApi.JS_FreeValue(_jsContext, _onchange);
                _onchange = JSApi.JS_UNDEFINED;

                _jsContext = JSContext.Null;
            }
        }

        [MonoPInvokeCallback(typeof(JSCFunctionMagic))]
        private static JSValue js_constructor(JSContext ctx, JSValue new_target, int argc, JSValue[] argv, int magic)
        {
            string path = null;
            string filter = null;
            if (argc > 0)
            {
                js_get_primitive(ctx, argv[0], out path);
            }
            if (argc > 1)
            {
                js_get_primitive(ctx, argv[1], out filter);
            }
            var o = new FSWatcher(path, filter);
            var val = NewBridgeClassObject(ctx, new_target, o, magic, true);
            o._Transfer(ctx, val);
            return val;
        }

        [MonoPInvokeCallback(typeof(JSCFunction))]
        private static JSValue js_dispose(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }

                self._DisposeWatcher();
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_onchange(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                return JSApi.JS_DupValue(ctx, self._onchange);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_onchange(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                JSApi.JS_FreeValue(ctx, self._onchange);
                self._onchange = JSApi.JS_DupValue(ctx, val);
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_oncreate(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                return JSApi.JS_DupValue(ctx, self._oncreate);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_oncreate(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                JSApi.JS_FreeValue(ctx, self._oncreate);
                self._oncreate = JSApi.JS_DupValue(ctx, val);
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_ondelete(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                return JSApi.JS_DupValue(ctx, self._ondelete);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_ondelete(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                JSApi.JS_FreeValue(ctx, self._ondelete);
                self._ondelete = JSApi.JS_DupValue(ctx, val);
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_path(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }

                return ctx.NewString(self._fsw.Path);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_path(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }
                if (!val.IsString())
                {
                    throw new InvalidDataException();
                }

                self._fsw.Path = JSApi.GetString(ctx, val);
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_filter(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }

                return ctx.NewString(self._fsw.Filter);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_filter(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }
                if (!val.IsString())
                {
                    throw new InvalidDataException();
                }

                self._fsw.Filter = JSApi.GetString(ctx, val);
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_isValid(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }

                return self._fsw != null ? JSApi.JS_TRUE : JSApi.JS_FALSE;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_includeSubdirectories(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }

                return JSApi.JS_NewBool(ctx, self._fsw.IncludeSubdirectories);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_includeSubdirectories(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }
                if (!val.IsBoolean())
                {
                    throw new InvalidDataException();
                }

                self._fsw.IncludeSubdirectories = JSApi.JS_ToBool(ctx, val) == 1;
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_enableRaisingEvents(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }

                return JSApi.JS_NewBool(ctx, self._fsw.EnableRaisingEvents);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_enableRaisingEvents(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }
                if (!val.IsBoolean())
                {
                    throw new InvalidDataException();
                }

                self._fsw.EnableRaisingEvents = JSApi.JS_ToBool(ctx, val) == 1;
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue js_get_isDelayedUntilActive(JSContext ctx, JSValue this_obj)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }

                return JSApi.JS_NewBool(ctx, self._isDelayedUntilActive);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        [MonoPInvokeCallback(typeof(JSSetterCFunction))]
        private static JSValue js_set_isDelayedUntilActive(JSContext ctx, JSValue this_obj, JSValue val)
        {
            try
            {
                FSWatcher self;
                if (!js_get_classvalue(ctx, this_obj, out self))
                {
                    throw new ThisBoundException();
                }
                if (self._fsw == null)
                {
                    throw new InvalidOperationException();
                }
                if (!val.IsBoolean())
                {
                    throw new InvalidDataException();
                }

                self._isDelayedUntilActive = JSApi.JS_ToBool(ctx, val) == 1;
                return JSApi.JS_UNDEFINED;
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }

        #endregion

        public static void Bind(TypeRegister register, string name)
        {
            var cls = register.CreateGlobalClass(name, typeof(FSWatcher), js_constructor);
            cls.AddProperty(false, "path", js_get_path, js_set_path);
            cls.AddProperty(false, "filter", js_get_filter, js_set_filter);
            cls.AddProperty(false, "isValid", js_get_isValid, null);
            cls.AddProperty(false, "enableRaisingEvents", js_get_enableRaisingEvents, js_set_enableRaisingEvents);
            cls.AddProperty(false, "includeSubdirectories", js_get_includeSubdirectories, js_set_includeSubdirectories);
            cls.AddProperty(false, "isDelayedUntilActive", js_get_isDelayedUntilActive, js_set_isDelayedUntilActive);
            cls.AddProperty(false, "oncreate", js_get_oncreate, js_set_oncreate);
            cls.AddProperty(false, "ondelete", js_get_ondelete, js_set_ondelete);
            cls.AddProperty(false, "onchange", js_get_onchange, js_set_onchange);
            cls.AddMethod(false, "dispose", js_dispose, 0);
        }
    }
}
