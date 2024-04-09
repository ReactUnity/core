using System;
using System.Runtime.InteropServices;

namespace Facebook.Yoga
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate YogaSize YogaMeasureFunc(
        IntPtr unmanagedNodePtr,
        float width,
        YogaMeasureMode widthMode,
        float height,
        YogaMeasureMode heightMode);
}
