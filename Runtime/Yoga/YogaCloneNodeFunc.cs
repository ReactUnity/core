using System;
using System.Runtime.InteropServices;

namespace Facebook.Yoga
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate float YogaCloneNodeFunc(IntPtr oldNode, IntPtr owner, uint childIndex);
}
