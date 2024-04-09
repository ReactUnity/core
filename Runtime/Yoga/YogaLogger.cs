using System;
using System.Runtime.InteropServices;

namespace Yoga
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void YogaLogger(
        IntPtr unmanagedConfigPtr,
        IntPtr unmanagedNotePtr,
        YogaLogLevel level,
        string message);
}
