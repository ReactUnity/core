#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    public class JSBehaviourFull : JSBehaviour
    {
        private bool _updateValid;
        private JSValue _updateFunc = JSApi.JS_UNDEFINED;

        private bool _lateUpdateValid;
        private JSValue _lateUpdateFunc = JSApi.JS_UNDEFINED;

        private bool _fixedUpdateValid;
        private JSValue _fixedUpdateFunc = JSApi.JS_UNDEFINED;

        protected override void OnBindingJSFuncs(ScriptContext context)
        {
            base.OnBindingJSFuncs(context);

            var ctx = (JSContext)context;

            _updateFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Update"));
            _updateValid = JSApi.JS_IsFunction(ctx, _updateFunc) == 1;

            _lateUpdateFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("LateUpdate"));
            _lateUpdateValid = JSApi.JS_IsFunction(ctx, _lateUpdateFunc) == 1;

            _fixedUpdateFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("FixedUpdate"));
            _fixedUpdateValid = JSApi.JS_IsFunction(ctx, _fixedUpdateFunc) == 1;
        }

        protected override void OnUnbindingJSFuncs()
        {
            base.OnUnbindingJSFuncs();

            JSApi.JS_FreeValue(_ctx, _updateFunc);
            _updateFunc = JSApi.JS_UNDEFINED;
            _updateValid = false;

            JSApi.JS_FreeValue(_ctx, _lateUpdateFunc);
            _lateUpdateFunc = JSApi.JS_UNDEFINED;
            _lateUpdateValid = false;

            JSApi.JS_FreeValue(_ctx, _fixedUpdateFunc);
            _fixedUpdateFunc = JSApi.JS_UNDEFINED;
            _fixedUpdateValid = false;
        }

        void Update()
        {
            if (_updateValid)
            {
                var rval = JSApi.JS_Call(_ctx, _updateFunc, _this_obj);
                if (rval.IsException())
                {
                    _ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(_ctx, rval);
                }
            }
        }

        void LateUpdate()
        {
            if (_lateUpdateValid)
            {
                var rval = JSApi.JS_Call(_ctx, _lateUpdateFunc, _this_obj);
                if (rval.IsException())
                {
                    _ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(_ctx, rval);
                }
            }
        }

        void FixedUpdate()
        {
            if (_fixedUpdateValid)
            {
                var rval = JSApi.JS_Call(_ctx, _fixedUpdateFunc, _this_obj);
                if (rval.IsException())
                {
                    _ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(_ctx, rval);
                }
            }
        }
    }
}
#endif
