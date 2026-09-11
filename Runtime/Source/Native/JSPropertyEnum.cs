using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    /*
        typedef struct JSPropertyEnum {
            bool is_enumerable;
            JSAtom atom;
        } JSPropertyEnum;
    */
    // is_enumerable was JS_BOOL in Bellard's and is a one-byte C bool in ng. `atom` sits at
    // offset 4 either way, so only the flag was at risk -- read four bytes wide it picks up
    // three bytes of padding C does not promise to zero. Nothing references this struct yet;
    // it is corrected so that whatever does first is not wrong.
    [StructLayout(LayoutKind.Sequential)]
    public struct JSPropertyEnum
    {
        [MarshalAs(UnmanagedType.U1)] public bool is_enumerable;
        public JSAtom atom;
    }
}