/*
 * The JSB_ and jsb_ shim com.reactunity.quickjs P/Invokes into.
 *
 * Vendored from unity-jsb (jsb_build/quickjs/unity_ext.c), MIT, Copyright (c) 2019
 * huliangjie, and ported to quickjs-ng. See ../README.md for every change and why.
 */

JS_EXPORT JSValue jsb_crossbind_constructor(JSContext *ctx, JSValue new_target)
{
    JSValue proto = JS_GetProperty(ctx, new_target, JS_ATOM_prototype);
    if (!JS_IsException(proto))
    {
        JSValue val = JS_NewObjectProtoClass(ctx, proto, js_bridge_class_id);
        JS_FreeValue(ctx, proto);
        return val;
    }

    return proto;
}

/* ng's JS_SetOpaque returns -1 for anything that is not an object of a registered
   class, where Bellard's wrote the pointer unconditionally. Unchecked, a failure
   leaks the payload and hands C# a bridge object whose id reads back as 0. */
static JSValue jsb_attach_payload(JSContext *ctx, JSValue obj, int32_t type_id, int32_t value, size_t size)
{
    JSPayload *sv = (JSPayload *)js_mallocz(ctx, sizeof(JSPayloadHeader) + size);
    if (!sv)
    {
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION; // js_mallocz already threw
    }

    sv->header.type_id = type_id;
    sv->header.value = value;
    if (JS_SetOpaque(obj, sv) < 0)
    {
        js_free(ctx, sv);
        JS_FreeValue(ctx, obj);
        return JS_ThrowInternalError(ctx, "cannot attach a bridge payload to this object");
    }

    return obj;
}

JS_EXPORT JSValue jsb_new_bridge_object(JSContext *ctx, JSValue proto, int32_t object_id)
{
    JSValue obj = JS_NewObjectProtoClass(ctx, proto, js_bridge_class_id);
    if (JS_IsException(obj))
    {
        return obj;
    }

    return jsb_attach_payload(ctx, obj, JS_BO_OBJECT, object_id, 0);
}

// for constructor new_target
JS_EXPORT JSValue JSB_NewBridgeClassObject(JSContext *ctx, JSValue new_target, int32_t object_id)
{
    JSValue proto = JS_GetProperty(ctx, new_target, JS_ATOM_prototype);
    if (!JS_IsException(proto))
    {
        JSValue obj = jsb_new_bridge_object(ctx, proto, object_id);
        JS_FreeValue(ctx, proto);
        return obj;
    }

    return proto;
}

JS_EXPORT JSValue jsb_new_bridge_value(JSContext *ctx, JSValue proto, int32_t size)
{
    if (size < 0)
    {
        return JS_ThrowRangeError(ctx, "invalid bridge payload size: %d", (int)size);
    }

    JSValue obj = JS_NewObjectProtoClass(ctx, proto, js_bridge_class_id);
    if (JS_IsException(obj))
    {
        return obj;
    }

    return jsb_attach_payload(ctx, obj, JS_BO_VALUE, size, (size_t)size);
}

JS_EXPORT JSValue JSB_NewBridgeClassValue(JSContext *ctx, JSValue new_target, int32_t size)
{
    JSValue proto = JS_GetProperty(ctx, new_target, JS_ATOM_prototype);
    if (!JS_IsException(proto))
    {
        JSValue obj = jsb_new_bridge_value(ctx, proto, size);
        JS_FreeValue(ctx, proto);
        return obj;
    }

    return proto;
}

JS_EXPORT JSPayloadHeader jsb_get_payload_header(JSContext *ctx, JSValue val)
{
    JSPayloadHeader *sv = (JSPayloadHeader *)JS_GetOpaque(val, js_bridge_class_id);
    if (sv)
    {
        return *sv;
    }
    return _null_payload;
}

JS_EXPORT JS_BOOL jsb_get_bytes(JSContext *ctx, JSValue val, int n, byte *v0)
{
    JSPayload *sv = (JSPayload *)JS_GetOpaque(val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(byte) * n)
    {
        byte *ptr = (byte *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            *(v0 + i) = ptr[i];
        }
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_bytes(JSContext *ctx, JSValue val, int n, byte *v0)
{
    JSPayload *sv = (JSPayload *)JS_GetOpaque(val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(byte) * n)
    {
        byte *ptr = (byte *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            ptr[i] = *(v0 + i);
        }
        return TRUE;
    }
    return FALSE;
}
