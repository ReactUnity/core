namespace QuickJS.Native
{
    internal enum JSCFunctionEnum
    {
        /* XXX: should rename for namespace isolation */
        JS_CFUNC_generic,
        JS_CFUNC_generic_magic,
        JS_CFUNC_constructor, // unused in jsb
        JS_CFUNC_constructor_magic,
        JS_CFUNC_constructor_or_func, // unused in jsb
        JS_CFUNC_constructor_or_func_magic, // unused in jsb
        JS_CFUNC_f_f, // unused in jsb
        JS_CFUNC_f_f_f, // unused in jsb
        JS_CFUNC_getter,
        JS_CFUNC_setter,
        JS_CFUNC_getter_magic,
        JS_CFUNC_setter_magic,
        JS_CFUNC_iterator_next, // unused in jsb
    }
}