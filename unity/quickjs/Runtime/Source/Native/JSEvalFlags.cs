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
        JS_EVAL_FLAG_STRIP = (1 << 4) /* force 'strip' mode */,

        /* compile but do not run. The result is an object with a
           JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
           with JS_EvalFunction(). */
        JS_EVAL_FLAG_COMPILE_ONLY = (1 << 5),

        /* don't include the stack frames before this eval in the Error() backtraces */
        JS_EVAL_FLAG_BACKTRACE_BARRIER = (1 << 6),
    }
}
