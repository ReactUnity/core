using System;
using System.Runtime.InteropServices;

namespace Yoga
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate float YogaBaselineFunc(IntPtr unmanagedNodePtr, float width, float height);
}
