using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    public partial class Values
    {
        /// <summary>
        /// It's the default behaviour for value rebinding, write an overloaded version of this function for a specific type if it's different from the default.
        /// </summary>
        public static bool js_rebind_this<T>(JSContext ctx, JSValue this_obj, ref T o)
        where T : struct
        {
            var header = JSApi.jsb_get_payload_header(ctx, this_obj);
            switch (header.type_id)
            {
                case BridgeObjectType.ObjectRef:
                    return ScriptEngine.GetObjectCache(ctx).ReplaceObject(header.value, o);
            }
            return false;
        }

        // fallback
        public static bool js_rebind_this(JSContext ctx, JSValue this_obj, ref object o)
        {
            var header = JSApi.jsb_get_payload_header(ctx, this_obj);
            switch (header.type_id)
            {
                case BridgeObjectType.ObjectRef:
                    return ScriptEngine.GetObjectCache(ctx).ReplaceObject(header.value, o);
            }
            return false;
        }
    }
}