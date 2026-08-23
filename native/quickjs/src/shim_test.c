/*
 * Runtime checks on the ported shim, for the things a successful link cannot prove:
 * that our atom ids are the ones the engine actually uses, and that the bridge
 * object machinery survives ng's stricter JS_SetOpaque.
 *
 * Compiles the shim as its own translation unit rather than loading the DLL, so it
 * runs before anything is copied into Unity.
 */

#include "unity_qjs.c"

#include <stdio.h>
#include <string.h>

static int failures = 0;

#define CHECK(cond, ...)                          \
    do {                                          \
        if (!(cond)) {                            \
            printf("  FAIL: ");                   \
            printf(__VA_ARGS__);                  \
            printf("\n");                         \
            ++failures;                           \
        }                                         \
    } while (0)

typedef JSAtom (*atom_accessor)(void);

static const struct { const char *name; const char *str; atom_accessor fn; } known_atoms[] = {
#define DEF(name, str) { #name, str, JSB_ATOM_##name },
#include "quickjs-atom.h"
#undef DEF
};

#define ATOM_COUNT ((int)(sizeof(known_atoms) / sizeof(known_atoms[0])))

/* The four the C# layer names and ng does not define. Absent here means the stubs in
   unity_qjs.c are still needed; present would mean ng grew them back and the stubs
   now shadow a real atom. */
static const char *const expected_absent[] = { "fileName", "lineNumber", "Operators", "Symbol_operatorSet" };

static void check_atoms(JSContext *ctx)
{
    for (int i = 0; i < ATOM_COUNT; ++i)
    {
        JSAtom atom = known_atoms[i].fn();

        // the enum starts one past JS_ATOM_NULL, so the nth DEF must be atom n+1
        CHECK(atom == (JSAtom)(i + 1), "atom %s is %u, expected %d", known_atoms[i].name, atom, i + 1);

        const char *str = JS_AtomToCString(ctx, atom);
        CHECK(str && strcmp(str, known_atoms[i].str) == 0,
              "atom %s resolves to \"%s\", expected \"%s\"", known_atoms[i].name, str ? str : "(null)", known_atoms[i].str);
        JS_FreeCString(ctx, str);
    }

    for (int i = 0; i < (int)(sizeof(expected_absent) / sizeof(expected_absent[0])); ++i)
    {
        for (int j = 0; j < ATOM_COUNT; ++j)
        {
            CHECK(strcmp(known_atoms[j].name, expected_absent[i]) != 0,
                  "ng now defines the atom %s, which unity_qjs.c stubs out", expected_absent[i]);
        }
    }

    CHECK(JSB_ATOM_Operators() == JS_ATOM_NULL, "JSB_ATOM_Operators must be JS_ATOM_NULL so JSAtom.IsValid is false");
    CHECK(JSB_ATOM_Symbol_operatorSet() == JS_ATOM_NULL, "JSB_ATOM_Symbol_operatorSet must be JS_ATOM_NULL");
}

static int finalized = 0;
static JSPayloadHeader last_finalized;

static void on_payload_finalized(JSRuntime *rt, JSPayloadHeader header)
{
    ++finalized;
    last_finalized = header;
}

static void check_bridge_objects(JSContext *ctx)
{
    JSValue proto = JS_NewObject(ctx);

    JSValue obj = jsb_new_bridge_object(ctx, proto, 12345);
    CHECK(!JS_IsException(obj), "jsb_new_bridge_object threw");
    JSPayloadHeader header = jsb_get_payload_header(ctx, obj);
    CHECK(header.type_id == JS_BO_OBJECT && header.value == 12345,
          "object payload reads back {%d, %d}, expected {%d, 12345}", header.type_id, header.value, JS_BO_OBJECT);

    JSValue val = jsb_new_bridge_value(ctx, proto, 8);
    CHECK(!JS_IsException(val), "jsb_new_bridge_value threw");
    header = jsb_get_payload_header(ctx, val);
    CHECK(header.type_id == JS_BO_VALUE && header.value == 8,
          "value payload reads back {%d, %d}, expected {%d, 8}", header.type_id, header.value, JS_BO_VALUE);

    byte written[8] = { 1, 2, 3, 4, 250, 251, 252, 253 };
    byte read[8] = { 0 };
    CHECK(jsb_set_bytes(ctx, val, 8, written), "jsb_set_bytes rejected an 8-byte payload");
    CHECK(jsb_get_bytes(ctx, val, 8, read), "jsb_get_bytes rejected an 8-byte payload");
    CHECK(memcmp(written, read, 8) == 0, "payload bytes did not round-trip");
    CHECK(!jsb_get_bytes(ctx, val, 4, read), "jsb_get_bytes accepted a size the payload does not have");

    // a plain object carries no payload, and asking must not read through a null opaque
    JSValue plain = JS_NewObject(ctx);
    header = jsb_get_payload_header(ctx, plain);
    CHECK(header.type_id == 0 && header.value == 0, "a plain object reported a payload");
    JS_FreeValue(ctx, plain);

    JSValue bad = jsb_new_bridge_value(ctx, proto, -1);
    CHECK(JS_IsException(bad), "a negative payload size was accepted");
    JS_FreeValue(ctx, JS_GetException(ctx));

    JSValue crossbound = jsb_crossbind_constructor(ctx, proto);
    CHECK(!JS_IsException(crossbound), "jsb_crossbind_constructor threw");
    JS_FreeValue(ctx, crossbound);

    finalized = 0;
    JS_FreeValue(ctx, obj);
    JS_FreeValue(ctx, val);
    JS_FreeValue(ctx, proto);
    CHECK(finalized == 2, "the class finalizer ran %d times, expected 2", finalized);
}

static void check_misc(JSContext *ctx)
{
    CHECK(JSB_Init() == 0xa, "JSB_Init must return the version JSApi.CS_JSB_VERSION expects");

    JSValue empty = JSB_NewEmptyString(ctx);
    CHECK(JS_IsString(empty), "JSB_NewEmptyString did not produce a string");
    JS_FreeValue(ctx, empty);

    uint32_t u = 0;
    CHECK(JSB_ToUint32(ctx, &u, JS_NewInt32(ctx, -1)) == 0 && u == 0xffffffffu,
          "JSB_ToUint32 gave %u for -1", u);
}

int main(void)
{
    JSRuntime *rt = JSB_NewRuntime(on_payload_finalized);
    if (!rt)
    {
        printf("JSB_NewRuntime failed\n");
        return 1;
    }
    JSContext *ctx = JS_NewContext(rt);

    check_atoms(ctx);
    check_bridge_objects(ctx);
    check_misc(ctx);

    JS_FreeContext(ctx);
    JSB_FreeRuntime(rt);

    printf("%d atoms checked, %d failure(s)\n", ATOM_COUNT, failures);
    return failures ? 1 : 0;
}
