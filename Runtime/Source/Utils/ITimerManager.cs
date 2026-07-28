using System;
using System.Collections.Generic;
using QuickJS.Binding;
using QuickJS.Native;

namespace QuickJS.Utils
{
    public interface ITimerManager
    {
        #region Timer Management
        uint SetTimeout(ScriptFunction fn, int ms);
        uint SetInterval(ScriptFunction fn, int ms);
        bool ClearTimer(uint id);
        #endregion

        int now { get; }

        // usually for debug only
        void ForEach(Action<ulong, int, int, bool> walker);

        void Bind(TypeRegister typeRegister);

        void Update(int milliseconds);
        void Destroy();
    }
}
