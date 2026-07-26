using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using QuickJS.Native;

namespace QuickJS.Utils
{
    public interface IAsyncManager
    {
        void Initialize(int mainThreadId);

        JSValue Yield(ScriptContext context, object awaitObject);

        void Destroy();
    }
}
