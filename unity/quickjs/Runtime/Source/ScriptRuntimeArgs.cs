using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Threading;
using System.Reflection;

namespace QuickJS
{
    using Native;
    using Binding;
    using Utils;
    using Module;

    public struct ScriptRuntimeArgs
    {
        public IFileSystem fileSystem;
        
        public IPathResolver pathResolver;

        public IAsyncManager asyncManager;

        /// <summary>
        /// TimerManager used by the script runtime. 
        /// DefaultTimerManager will be used if this field is null.
        /// </summary>
        public ITimerManager timerManager;

        /// <summary>
        /// Customize how the log messages printing. (e.g DefaultScriptLogger directly print logs to the console)
        /// </summary>
        public IScriptLogger logger;

        /// <summary>
        /// The allocator of ByteBuffer. ByteBuffer is only used in unity-jsb C# code, not for quickjs itself.
        /// It's usually used for exchanging data between JS and C#.
        /// </summary>
        public IO.IByteBufferAllocator byteBufferAllocator;

        public Experimental.IJSApiBridge apiBridge;

        /// <summary>
        /// specify the binding method (usually via DefaultBinder.GetBinder(...)).
        /// NOTE: reflectbind is only supported in editor.
        /// </summary>
        public BindAction binder;
    }
}
