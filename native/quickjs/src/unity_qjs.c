/*
 * The JSB_ and jsb_ shim com.reactunity.quickjs P/Invokes into.
 *
 * Vendored from unity-jsb (jsb_build/quickjs/unity_qjs.c), MIT, Copyright (c) 2019
 * huliangjie, and ported to quickjs-ng. See ../README.md for every change and why.
 */
/*
vim /etc/apt/sources.list
deb http://us.archive.ubuntu.com/ubuntu trusty main universe
sudo apt-get update
sudo apt-get install mingw32
    sudo apt-get install mingw-w64
./configure --host=i686-w64-mingw32
    ./configure --host=x86_64-w64-mingw32
make
*/

#ifndef UNITY_WEBGL
#include "quickjs.h"
#endif

#ifndef JS_EXPORT
#define JS_EXPORT
#endif

#ifndef EMSCRIPTEN
#ifndef CONFIG_ATOMICS
#define CONFIG_ATOMICS
#endif
#endif

#define byte unsigned char

/* quickjs-ng dropped this alias; the shim keeps an int-wide ABI on purpose. */
#ifndef JS_BOOL
#define JS_BOOL int
#endif
// #define JS_HIDDEN_PROP(s) ("\xFF" s)

#ifndef UNITY_WEBGL

#ifndef FALSE
enum
{
    FALSE = 0,
    TRUE = 1,
};
#endif // !FALSE

enum
{
    __JS_ATOM_NULL = JS_ATOM_NULL,
#define DEF(name, str) JS_ATOM_##name,
#define SSR
#include "quickjs-atom.h"
#undef DEF
    JS_ATOM_END,
};

#define DEF(name, str) \
    JS_EXPORT JSAtom JSB_ATOM_##name() { return JS_ATOM_##name; }
#include "quickjs-atom.h"
#undef DEF

/* quickjs-ng removed operator overloading, so these two atoms do not exist.
   Returning 0 is not a placeholder: JSAtom.IsValid is `_value != 0`, and every
   C# call site is already guarded by it or by IsOperatorOverloadingSupported. */
JS_EXPORT JSAtom JSB_ATOM_Operators() { return JS_ATOM_NULL; }
JS_EXPORT JSAtom JSB_ATOM_Symbol_operatorSet() { return JS_ATOM_NULL; }

#endif // !UNITY_WEBGL

static JSClassID js_class_id_begin = 0;
static JSClassID js_bridge_class_id = 0;

// quickjs 内置 class id 之后的第一个可用 id
JS_EXPORT JSClassID JSB_GetClassID()
{
    return js_class_id_begin;
}

JS_EXPORT JSClassID JSB_GetBridgeClassID()
{
    return js_bridge_class_id;
}

#define JS_BO_TYPE 1
#define JS_BO_OBJECT 2
#define JS_BO_VALUE 3
// #define JS_BO_STRICT_OBJECT 4

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

JS_EXPORT JSValue JSB_Eval(JSContext *ctx, const char *input, int input_len,
                 const char *filename, int eval_flags)
{
    return JS_Eval(ctx, input, input_len, filename, eval_flags);
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

// 释放数据, 返回头信息副本
JS_EXPORT JSPayloadHeader JSB_FreePayload(JSContext *ctx, JSValue val)
{
    void *sv = JS_GetOpaque(val, js_bridge_class_id);
    if (sv)
    {
        JSPayloadHeader header = *(JSPayloadHeader *)sv;
        JS_SetOpaque(val, NULL);
        js_free(ctx, sv);
        return header;
    }
    return _null_payload;
}

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
    JSBRuntimePayload* payload = js_malloc_rt(rt, sizeof(JSBRuntimePayload));
    payload->opaque = 0;
    payload->finalizer = finalizer;
    JS_SetRuntimeOpaque(rt, payload);
    
    JSClassDef cls_def;

    cls_def.class_name = "CSharpClass";
    cls_def.finalizer = _JSBClass_Finalizer;
    cls_def.exotic = NULL;
    cls_def.gc_mark = NULL;
    cls_def.call = NULL;

    JSClassID bridge_class_id = 0;
    JS_NewClassID(rt, &bridge_class_id);
    js_bridge_class_id = bridge_class_id;
    JS_NewClass(rt, js_bridge_class_id, &cls_def);

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

#define JSB_SetOpaque(ctx, obj, opaque) JS_SetOpaque((obj), (opaque))
#define JSB_GetOpaque(ctx, val, class_id) JS_GetOpaque((val), (class_id))

JS_EXPORT int JSB_Init()
{
    return 0xa; // version tag for unity_qjs.c
}

#include "unity_ext.c"
