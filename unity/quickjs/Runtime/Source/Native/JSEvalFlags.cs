using System;

namespace QuickJS.Native
{
    [Flags]
    internal enum JSEvalFlags
    {
        /* JS_Eval() flags */
        JS_EVAL_TYPE_GLOBAL = (0 << 0) /* global code (default) */,
        JS_EVAL_TYPE_MODULE = (1 << 0) /* module code */,
        JS_EVAL_TYPE_DIRECT = (2 << 0) /* direct call (internal use) */,
        JS_EVAL_TYPE_INDIRECT = (3 << 0) /* indirect call (internal use) */,
        JS_EVAL_TYPE_MASK = (3 << 0),

        JS_EVAL_FLAG_STRICT = (1 << 3) /* force 'strict' mode */,

        /* Bit 4 was 'strip' mode in Bellard's. In ng it asks for the module to come back
           with its dependencies unresolved, for JS_LoadModuleAsync to load the graph --
           implying COMPILE_ONLY and TYPE_MODULE. Nothing passed STRIP, so renaming it is
           free; leaving the old name would have handed phase 4's async loader a flag that
           reads as the opposite of what it says. */
        JS_EVAL_FLAG_ASYNC_LOAD = (1 << 4),

        /* compile but do not run. The result is an object with a
           JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
           with JS_EvalFunction(). */
        JS_EVAL_FLAG_COMPILE_ONLY = (1 << 5),

        /* don't include the stack frames before this eval in the Error() backtraces */
        JS_EVAL_FLAG_BACKTRACE_BARRIER = (1 << 6),

        /* allow top-level await in a normal script; JS_Eval then returns a promise.
           Only valid with JS_EVAL_TYPE_GLOBAL. */
        JS_EVAL_FLAG_ASYNC = (1 << 7),
    }
}
