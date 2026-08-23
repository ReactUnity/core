/*
 * The JSB_ and jsb_ shim com.reactunity.quickjs P/Invokes into.
 *
 * Vendored from unity-jsb (jsb_build/quickjs/unity_qjs.c), MIT, Copyright (c) 2019
 * huliangjie, and ported to quickjs-ng. See ../README.md for every change and why.
 */

#include "quickjs.h"

#ifndef JS_EXPORT
#define JS_EXPORT
#endif

#define byte unsigned char

/* quickjs-ng dropped this alias; the shim keeps an int-wide ABI on purpose. */
#ifndef JS_BOOL
#define JS_BOOL int
#endif

enum
{
    FALSE = 0,
    TRUE = 1,
};

/* Byte-identical to the enum quickjs.c builds from the same header, which is what
   makes the accessors below return ids the engine agrees with. */
enum
{
    __JS_ATOM_NULL = JS_ATOM_NULL,
#define DEF(name, str) JS_ATOM_##name,
#include "quickjs-atom.h"
#undef DEF
    JS_ATOM_END,
};

#define DEF(name, str) \
    JS_EXPORT JSAtom JSB_ATOM_##name(void) { return JS_ATOM_##name; }
#include "quickjs-atom.h"
#undef DEF

static JSClassID js_bridge_class_id = 0;

#define JS_BO_TYPE 1
#define JS_BO_OBJECT 2
#define JS_BO_VALUE 3

typedef struct JSPayloadHeader
{
    int32_t type_id; // JS_BO_*
    int32_t value;
} JSPayloadHeader;

static JSPayloadHeader _null_payload = {.type_id = 0, .value = 0};

typedef struct JSPayload
{
    JSPayloadHeader header;
    char data[1];
} JSPayload;

JS_EXPORT JSValue JSB_NewEmptyString(JSContext *ctx)
{
    return JS_NewStringLen(ctx, "", 0);
}

JS_EXPORT JSValue JSB_NewInt64(JSContext *ctx, int64_t val)
{
    return JS_NewInt64(ctx, val);
}

/* return 0 for success, otherwise -1 in case of exception */
JS_EXPORT int JSB_ToUint32(JSContext *ctx, uint32_t *pres, JSValueConst val)
{
    return JS_ToInt32(ctx, (int32_t *)pres, val);
}

JS_EXPORT JSValue JSB_NewFloat64(JSContext *ctx, double d)
{
    return JS_NewFloat64(ctx, d);
}

JS_EXPORT JSValue JSB_ThrowError(JSContext *ctx, const char *buf, size_t buf_len)
{
    return JS_ThrowInternalError(ctx, "%.*s", (int)buf_len, buf);
}

JS_EXPORT JSValue JSB_ThrowTypeError(JSContext *ctx, const char *msg)
{
    return JS_ThrowTypeError(ctx, "%s", msg);
}

JS_EXPORT JSValue JSB_ThrowInternalError(JSContext *ctx, const char *msg)
{
    return JS_ThrowInternalError(ctx, "%s", msg);
}

JS_EXPORT JSValue JSB_ThrowRangeError(JSContext *ctx, const char *msg)
{
    return JS_ThrowRangeError(ctx, "%s", msg);
}

JS_EXPORT JSValue JSB_ThrowReferenceError(JSContext *ctx, const char *msg)
{
    return JS_ThrowReferenceError(ctx, "%s", msg);
}

JS_EXPORT void JSB_FreeValue(JSContext *ctx, JSValue v)
{
    JS_FreeValue(ctx, v);
}

JS_EXPORT void JSB_FreeValueRT(JSRuntime *rt, JSValue v)
{
    JS_FreeValueRT(rt, v);
}

JS_EXPORT JSValue JSB_DupValue(JSContext *ctx, JSValueConst v)
{
    return JS_DupValue(ctx, v);
}

JS_EXPORT JSValue JSB_NewCFunction(JSContext *ctx, JSCFunction *func, JSAtom atom, int length, JSCFunctionEnum cproto, int magic)
{
    const char *name = JS_AtomToCString(ctx, atom);
    if (!name)
    {
        return JS_ThrowInternalError(ctx, "no such atom: %d", atom);
    }
    JSValue funcVal = JS_NewCFunction2(ctx, func, name, length, cproto, magic);
    JS_FreeCString(ctx, name);
    return funcVal;
}

JS_EXPORT JSValue JSB_NewCFunctionMagic(JSContext *ctx, JSCFunctionMagic *func, JSAtom atom, int length, JSCFunctionEnum cproto, int magic)
{
    const char *name = JS_AtomToCString(ctx, atom);
    if (!name)
    {
        return JS_ThrowInternalError(ctx, "no such atom: %d", atom);
    }
    JSValue funcVal = JS_NewCFunction2(ctx, (JSCFunction *)func, name, length, cproto, magic);
    JS_FreeCString(ctx, name);
    return funcVal;
}

typedef void JSGCObjectFinalizer(JSRuntime* rt, JSPayloadHeader header);

typedef struct JSBRuntimePayload {
    void* opaque;
    JSGCObjectFinalizer* finalizer;
} JSBRuntimePayload;

static void _JSBClass_Finalizer(JSRuntime* rt, JSValue obj)
{
    void *sv = JS_GetOpaque(obj, js_bridge_class_id);
    if (sv)
    {
        JSPayloadHeader header = *(JSPayloadHeader *)sv;
        JS_SetOpaque(obj, NULL);
        js_free_rt(rt, sv);
        JSBRuntimePayload* rt_payload = (JSBRuntimePayload*)JS_GetRuntimeOpaque(rt);
        if (rt_payload && rt_payload->finalizer)
        {
            rt_payload->finalizer(rt, header);
        }
    }
}

JS_EXPORT JSRuntime* JSB_NewRuntime(JSGCObjectFinalizer* finalizer)
{
    JSRuntime* rt = JS_NewRuntime();
    if (!rt)
    {
        return NULL;
    }

    JSClassDef cls_def;

    cls_def.class_name = "CSharpClass";
    cls_def.finalizer = _JSBClass_Finalizer;
    cls_def.exotic = NULL;
    cls_def.gc_mark = NULL;
    cls_def.call = NULL;

    /* ng allocates class ids out of the runtime, so this must run per runtime and
       through a zeroed local -- a shared static would hand back an id it never
       reserved here. Registered before the payload so neither failure path has
       anything to unwind. */
    JSClassID bridge_class_id = 0;
    JS_NewClassID(rt, &bridge_class_id);
    if (JS_NewClass(rt, bridge_class_id, &cls_def) < 0)
    {
        JS_FreeRuntime(rt);
        return NULL;
    }
    js_bridge_class_id = bridge_class_id;

    JSBRuntimePayload* payload = js_malloc_rt(rt, sizeof(JSBRuntimePayload));
    if (!payload)
    {
        JS_FreeRuntime(rt);
        return NULL;
    }
    payload->opaque = 0;
    payload->finalizer = finalizer;
    JS_SetRuntimeOpaque(rt, payload);

    return rt;
}

JS_EXPORT int JSB_FreeRuntime(JSRuntime* rt)
{
    void* payload = JS_GetRuntimeOpaque(rt);
    if (payload)
    {
        JS_SetRuntimeOpaque(rt, 0);
        js_free_rt(rt, payload);
    }
    JS_FreeRuntime(rt);
    /* ng reports leaks by asserting in debug builds, not by return value. */
    return 1;
}

JS_EXPORT void* JSB_GetRuntimeOpaque(JSRuntime* rt)
{
    JSBRuntimePayload* payload = (JSBRuntimePayload*)JS_GetRuntimeOpaque(rt);
    return payload ? payload->opaque : 0;
}

JS_EXPORT void JSB_SetRuntimeOpaque(JSRuntime* rt, void* opaque)
{
    JSBRuntimePayload* payload = (JSBRuntimePayload*)JS_GetRuntimeOpaque(rt);
    if (payload)
    {
        payload->opaque = opaque;
    }
}

JS_EXPORT int JSB_Init(void)
{
    return 0xa; // version tag, checked against JSApi.CS_JSB_VERSION
}

#include "unity_ext.c"
