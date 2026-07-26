using System;

namespace QuickJS.Native
{
    //TODO [v8-integrating] not to expose this enum out of JSApi module
    [Flags]
    internal enum JSPropFlags
    {
        /* flags for object properties */
        JS_PROP_CONFIGURABLE = (1 << 0),
        JS_PROP_WRITABLE = (1 << 1),
        JS_PROP_ENUMERABLE = (1 << 2),
        JS_PROP_C_W_E = (JS_PROP_CONFIGURABLE | JS_PROP_WRITABLE | JS_PROP_ENUMERABLE),
        JS_PROP_LENGTH = (1 << 3) /* used internally in Arrays */,
        JS_PROP_TMASK = (3 << 4) /* mask for NORMAL, GETSET, VARREF, AUTOINIT */,
        JS_PROP_NORMAL = (0 << 4),
        JS_PROP_GETSET = (1 << 4),
        JS_PROP_VARREF = (2 << 4) /* used internally */,
        JS_PROP_AUTOINIT = (3 << 4) /* used internally */,

        /* flags for JS_DefineProperty */
        JS_PROP_HAS_SHIFT = 8,
        JS_PROP_HAS_CONFIGURABLE = (1 << 8),
        JS_PROP_HAS_WRITABLE = (1 << 9),
        JS_PROP_HAS_ENUMERABLE = (1 << 10),
        JS_PROP_HAS_GET = (1 << 11),
        JS_PROP_HAS_SET = (1 << 12),
        JS_PROP_HAS_VALUE = (1 << 13),

        /* throw an exception if false would be returned
           (JS_DefineProperty/JS_SetProperty) */
        JS_PROP_THROW = (1 << 14),

        /* throw an exception if false would be returned in strict mode
           (JS_SetProperty) */
        JS_PROP_THROW_STRICT = (1 << 15),

        JS_PROP_NO_ADD = (1 << 16) /* internal use */,
        JS_PROP_NO_EXOTIC = (1 << 17) /* internal use */,
        
        // custom values
        CONST_VALUE = JS_PROP_HAS_VALUE | JS_PROP_ENUMERABLE, 
        DEFAULT = JS_PROP_CONFIGURABLE | JS_PROP_ENUMERABLE, 
        NONE = 0, 
    }
}