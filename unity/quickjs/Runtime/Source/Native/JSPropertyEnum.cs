using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    using JS_BOOL = System.Int32;

    /*
        typedef struct JSPropertyEnum {
            JS_BOOL is_enumerable;
            JSAtom atom;
        } JSPropertyEnum;
    */
    [StructLayout(LayoutKind.Sequential)]
    public struct JSPropertyEnum
    {
        public JS_BOOL is_enumerable;
        public JSAtom atom;
    }
}