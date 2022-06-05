#if !JSB_UNITYLESS
using System.Collections;

namespace QuickJS.Unity
{
    using System;
    using QuickJS.Native;
    using QuickJS.Utils;
    using UnityEngine;

    public class UnityCoroutineContext : MonoBehaviour
    {
        internal void RunTask(object awaitObject, ScriptContext context, SafeRelease safeRelease)
        {
            if (awaitObject is IEnumerator)
            {
                StartCoroutine(_Pending(awaitObject as IEnumerator, context, safeRelease));
            }
            else
            {
                StartCoroutine(_Pending(awaitObject as UnityEngine.YieldInstruction, context, safeRelease));
            }
        }

        private IEnumerator _Pending(UnityEngine.YieldInstruction instruction, ScriptContext context, SafeRelease safeRelease)
        {
            yield return instruction;

            if (!context.IsValid())
            {
                yield break;
            }

            if (!safeRelease.isValid)
            {
                context.GetLogger()?.Write(LogLevel.Error, "pormise func has already been released");
                yield break;
            }

            var ctx = (JSContext)context;
            var backVal = Binding.Values.js_push_classvalue(ctx, instruction);
            if (backVal.IsException())
            {
                ctx.print_exception();
                safeRelease.Release();
                yield break;
            }

            var rval = JSApi.Call(ctx, safeRelease[0], JSApi.JS_UNDEFINED, backVal);
            JSApi.JS_FreeValue(ctx, backVal);
            if (rval.IsException())
            {
                ctx.print_exception();
                safeRelease.Release();
                yield break;
            }

            JSApi.JS_FreeValue(ctx, rval);
            safeRelease.Release();

            context.GetRuntime().ExecutePendingJob();
        }

        private IEnumerator _Pending(IEnumerator enumerator, ScriptContext context, SafeRelease safeRelease)
        {
            while (enumerator.MoveNext())
            {
                var current = enumerator.Current;

                if (current is UnityEngine.YieldInstruction)
                {
                    yield return current;
                }

                yield return null;
            }

            if (!context.IsValid())
            {
                yield break;
            }

            if (!safeRelease.isValid)
            {
                context.GetLogger()?.Write(LogLevel.Error, "pormise func has already been released");
                yield break;
            }

            var ctx = (JSContext)context;
            var backVal = Binding.Values.js_push_var(ctx, enumerator.Current);
            if (backVal.IsException())
            {
                ctx.print_exception();
                safeRelease.Release();
                yield break;
            }

            var rval = JSApi.Call(ctx, safeRelease[0], JSApi.JS_UNDEFINED, backVal);
            JSApi.JS_FreeValue(ctx, backVal);
            if (rval.IsException())
            {
                ctx.print_exception();
                safeRelease.Release();
                yield break;
            }

            JSApi.JS_FreeValue(ctx, rval);
            safeRelease.Release();

            context.GetRuntime().ExecutePendingJob();
        }
    }
}

#endif
