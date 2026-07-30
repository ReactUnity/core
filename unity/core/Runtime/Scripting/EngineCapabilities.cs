using System;

namespace ReactUnity.Scripting
{
    [Flags]
    public enum EngineCapabilities
    {
        None = 0,
        Fetch = 1,
        XHR = 2,
        WebSocket = 4,
        Console = 8,
        Scheduler = 16,
        Base64 = 32,
        URL = 64,
        Navigator = 128,
        Encoding = 256,
        AbortController = 512,
        QueueMicrotask = 1024,
        /// Resolves an import specifier by itself, which is what makes dynamic import() work.
        /// Every engine executes module source, but QuickJS and Jint only resolve specifiers
        /// through a local file system, so an http url has to be fetched by the host instead.
        ModuleResolution = 2048,
    }
}
