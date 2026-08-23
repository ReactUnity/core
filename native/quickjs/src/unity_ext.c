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

JS_EXPORT JSValue jsb_construct_bridge_object(JSContext *ctx, JSValue proto, int32_t object_id)
{
    JSValue obj = JS_CallConstructor(ctx, proto, 0, NULL);
    if (!JS_IsException(obj))
    {
        JSPayload *sv = (JSPayload *)js_malloc(ctx, sizeof(JSPayloadHeader));
        sv->header.type_id = JS_BO_OBJECT;
        sv->header.value = object_id;
        JSB_SetOpaque(ctx, obj, sv);
    }

    return obj;
}

JS_EXPORT JSValue jsb_new_bridge_object(JSContext *ctx, JSValue proto, int32_t object_id/*, int32_t type_id = JS_BO_OBJECT */)
{
    JSValue obj = JS_NewObjectProtoClass(ctx, proto, js_bridge_class_id);
    if (!JS_IsException(obj))
    {
        JSPayload *sv = (JSPayload *)js_malloc(ctx, sizeof(JSPayloadHeader));
        sv->header.type_id = JS_BO_OBJECT;
        sv->header.value = object_id;
        JSB_SetOpaque(ctx, obj, sv);
    }

    return obj;
}

// for constructor new_target
JS_EXPORT JSValue JSB_NewBridgeClassObject(JSContext *ctx, JSValue new_target, int32_t object_id/*, int32_t type_id = JS_BO_OBJECT */)
{
    JSValue proto = JS_GetProperty(ctx, new_target, JS_ATOM_prototype);
    if (!JS_IsException(proto))
    {
        JSValue obj = jsb_new_bridge_object(ctx, proto, object_id/*, type_id*/);
        JS_FreeValue(ctx, proto);
        return obj;
    }

    return proto;
}

JS_EXPORT JSValue jsb_new_bridge_value(JSContext *ctx, JSValue proto, int32_t size)
{
    JSValue obj = JS_NewObjectProtoClass(ctx, proto, js_bridge_class_id);
    if (!JS_IsException(obj))
    {
        JSPayload *sv = (JSPayload *)js_mallocz(ctx, sizeof(JSPayloadHeader) + size);
        sv->header.type_id = JS_BO_VALUE;
        sv->header.value = size;
        JSB_SetOpaque(ctx, obj, sv);
    }

    return obj;
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
    JSPayloadHeader *sv = (JSPayloadHeader *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv)
    {
        return *sv;
    }
    return _null_payload;
}

JS_EXPORT JSPayload *jsb_get_payload(JSContext *ctx, JSValue val)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv)
    {
        return sv;
    }
    return 0;
}

JS_EXPORT JS_BOOL jsb_get_floats(JSContext *ctx, JSValue val, int n, float *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * n)
    {
        float *ptr = (float *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            *(v0 + i) = ptr[i];
        }
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_floats(JSContext *ctx, JSValue val, int n, float *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * n)
    {
        float *ptr = (float *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            ptr[i] = *(v0 + i);
        }
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_float_2(JSContext *ctx, JSValue val, float *v0, float *v1)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 2)
    {
        float *ptr = (float *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_float_2(JSContext *ctx, JSValue val, float v0, float v1)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 2)
    {
        float *ptr = (float *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_float_3(JSContext *ctx, JSValue val, float *v0, float *v1, float *v2)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 3)
    {
        float *ptr = (float *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        *v2 = ptr[2];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_float_3(JSContext *ctx, JSValue val, float v0, float v1, float v2)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 3)
    {
        float *ptr = (float *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        ptr[2] = v2;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_float_4(JSContext *ctx, JSValue val, float *v0, float *v1, float *v2, float *v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 4)
    {
        float *ptr = (float *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        *v2 = ptr[2];
        *v3 = ptr[3];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_float_4(JSContext *ctx, JSValue val, float v0, float v1, float v2, float v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(float) * 4)
    {
        float *ptr = (float *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        ptr[2] = v2;
        ptr[3] = v3;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_ints(JSContext *ctx, JSValue val, int n, int *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * n)
    {
        int *ptr = (int *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            *(v0 + i) = ptr[i];
        }
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_ints(JSContext *ctx, JSValue val, int n, int *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * n)
    {
        int *ptr = (int *)&(sv->data[0]);
        for (int i = 0; i < n; ++i)
        {
            ptr[i] = *(v0 + i);
        }
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_int_1(JSContext *ctx, JSValue val, int *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int))
    {
        int *ptr = (int *)&(sv->data[0]);
        *v0 = ptr[0];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_int_1(JSContext *ctx, JSValue val, int v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int))
    {
        int *ptr = (int *)&(sv->data[0]);
        ptr[0] = v0;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_int_2(JSContext *ctx, JSValue val, int *v0, int *v1)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 2)
    {
        int *ptr = (int *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_int_2(JSContext *ctx, JSValue val, int v0, int v1)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 2)
    {
        int *ptr = (int *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_int_3(JSContext *ctx, JSValue val, int *v0, int *v1, int *v2)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 3)
    {
        int *ptr = (int *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        *v2 = ptr[2];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_int_3(JSContext *ctx, JSValue val, int v0, int v1, int v2)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 3)
    {
        int *ptr = (int *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        ptr[2] = v2;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_int_4(JSContext *ctx, JSValue val, int *v0, int *v1, int *v2, int *v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 4)
    {
        int *ptr = (int *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        *v2 = ptr[2];
        *v3 = ptr[3];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_int_4(JSContext *ctx, JSValue val, int v0, int v1, int v2, int v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(int) * 4)
    {
        int *ptr = (int *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        ptr[2] = v2;
        ptr[3] = v3;
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_get_bytes(JSContext *ctx, JSValue val, int n, byte *v0)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
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
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
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

JS_EXPORT JS_BOOL jsb_get_byte_4(JSContext *ctx, JSValue val, byte *v0, byte *v1, byte *v2, byte *v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(byte) * 4)
    {
        byte *ptr = (byte *)&(sv->data[0]);
        *v0 = ptr[0];
        *v1 = ptr[1];
        *v2 = ptr[2];
        *v3 = ptr[3];
        return TRUE;
    }
    return FALSE;
}

JS_EXPORT JS_BOOL jsb_set_byte_4(JSContext *ctx, JSValue val, byte v0, byte v1, byte v2, byte v3)
{
    JSPayload *sv = (JSPayload *)JSB_GetOpaque(ctx, val, js_bridge_class_id);
    if (sv && sv->header.type_id == JS_BO_VALUE && sv->header.value == sizeof(byte) * 4)
    {
        byte *ptr = (byte *)&(sv->data[0]);
        ptr[0] = v0;
        ptr[1] = v1;
        ptr[2] = v2;
        ptr[3] = v3;
        return TRUE;
    }
    return FALSE;
}
