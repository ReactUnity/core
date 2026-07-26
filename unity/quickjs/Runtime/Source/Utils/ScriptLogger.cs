using System;

namespace QuickJS.Utils
{
    public enum LogLevel
    {
        Info = 0,
        Warn = 1,
        Error = 2,
        Assert = 3,
    }

    public interface IScriptLogger
    {
        void Write(LogLevel ll, string text);
        void Write(LogLevel ll, string fmt, params object[] args);
        void WriteException(Exception exception);
    }
}
