using System.Runtime.InteropServices;

namespace Yoga
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void YogaDirtiedFunc(YogaNode node);
}
