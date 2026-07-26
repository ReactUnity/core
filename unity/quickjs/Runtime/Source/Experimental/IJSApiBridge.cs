using System;
using System.Collections.Generic;

namespace QuickJS.Experimental
{
    using QuickJS.Native;

    /// <summary>
    /// TODO
    /// NOTE: should never throw any C# exception
    /// </summary>
    public interface IJSApiBridge
    {
        JSPayloadHeader GetPayloadHeader(ScriptContext context, JSValue val);

        JSValue NewBridgeObject(ScriptContext context, object o, JSValue proto);
    }

    public class DefaultJSApiBridgeImpl : IJSApiBridge
    {
        public JSPayloadHeader GetPayloadHeader(ScriptContext context, JSValue val)
        {
            return JSApi.jsb_get_payload_header(context, val);
        }

        public JSValue NewBridgeObject(ScriptContext context, object o, JSValue proto)
        {
            var cache = context.GetObjectCache();
            var object_id = cache.AddObject(o, false);
            var val = JSApi.jsb_new_bridge_object(context, proto, object_id);

            if (val.IsException())
            {
                cache.RemoveObject(object_id);
            }
            else
            {
                cache.AddJSValue(o, val);
            }
            return val;
        }
    }
}
