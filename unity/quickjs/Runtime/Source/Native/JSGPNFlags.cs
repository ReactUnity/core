using System;

namespace QuickJS.Native
{
    // #define JS_GPN_STRING_MASK  (1 << 0)
    // #define JS_GPN_SYMBOL_MASK  (1 << 1)
    // #define JS_GPN_PRIVATE_MASK (1 << 2)
    // /* only include the enumerable properties */
    // #define JS_GPN_ENUM_ONLY    (1 << 4)
    // /* set theJSPropertyEnum.is_enumerable field */
    // #define JS_GPN_SET_ENUM     (1 << 5)

    [Flags]
    internal enum JSGPNFlags : int
    {
        JS_GPN_STRING_MASK = (1 << 0),
        JS_GPN_SYMBOL_MASK = (1 << 1),
        JS_GPN_PRIVATE_MASK = (1 << 2),
        JS_GPN_ENUM_ONLY = (1 << 4),
        JS_GPN_SET_ENUM = (1 << 5),
    }
}
