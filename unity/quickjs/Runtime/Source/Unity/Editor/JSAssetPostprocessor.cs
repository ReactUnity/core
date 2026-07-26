#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Unity
{
    using Binding;
    using Native;
    using UnityEngine;
    using UnityEditor;

    public class JSAssetPostprocessor : AssetPostprocessor
    {
        private void OnPostprocessTexture(Texture2D texture)
        {
            CallJavascript(this, "OnPostprocessTexture", texture);
        }

        private void OnPostprocessModel(GameObject model)
        {
            CallJavascript(this, "OnPostprocessModel", model);
        }

        private void OnPostprocessAudio(AudioClip audioClip)
        {
            CallJavascript(this, "OnPostprocessAudio", audioClip);
        }

        private void OnPostprocessMaterial(Material material)
        {
            CallJavascript(this, "OnPostprocessMaterial", material);
        }

        private void OnPostProcessSprites(Texture2D texture, Sprite[] sprites)
        {
            CallJavascript(this, "OnPostProcessSprites", texture, sprites);
        }

        static void OnPostprocessAllAssets(string[] importedAssets, string[] deletedAssets, string[] movedAssets, string[] movedFromAssetPaths)
        {
            CallJavascript(null, "OnPostprocessAllAssets", importedAssets, deletedAssets, movedAssets, movedFromAssetPaths);
        }

        private static void CallJavascript(AssetPostprocessor proc, string funcName, params object[] args)
        {
            var prefs = EditorRuntime.GetPrefs();
            if (prefs != null && prefs.assetPostProcessors != null)
            {
                foreach (var postprocessor in prefs.assetPostProcessors)
                {
                    CallJavascript(postprocessor, proc, funcName, args);
                }
            }
        }

        private static void CallJavascript(string module_id, AssetPostprocessor proc, string funcName, params object[] args)
        {
            var runtime = ScriptEngine.GetRuntime();
            if (runtime != null && runtime.isValid && !EditorApplication.isCompiling)
            {
                runtime.ResolveModule(module_id);

                var context = runtime.GetMainContext();
                var ctx = (JSContext)context;
                JSValue func;

                if (context.LoadModuleCacheExports(module_id, funcName, out func))
                {
                    var globalThis = context.GetGlobalObject();

                    if (JSApi.JS_IsFunction(ctx, func) == 1)
                    {
                        var arglist = new List<JSValue>();
                        do
                        {
                            if (proc != null)
                            {
                                var val = Values.js_push_var(ctx, proc);
                                if (val.IsException())
                                {
                                    ctx.print_exception();
                                    break;
                                }
                                arglist.Add(val);
                            }

                            var err = false;
                            for (var i = 0; i < args.Length; i++)
                            {
                                var val = Values.js_push_var(ctx, args[i]);
                                if (val.IsException())
                                {
                                    ctx.print_exception();
                                    err = true;
                                    break;
                                }
                                arglist.Add(val);
                            }

                            if (err)
                            {
                                break;
                            }

                            var argv = arglist.ToArray();
                            JSValue rval = JSApi.JS_UNDEFINED;
                            unsafe
                            {
                                fixed (JSValue* pArgs = argv)
                                {
                                    rval = JSApi.JS_Call(ctx, func, globalThis, argv.Length, pArgs);
                                }
                            }

                            if (rval.IsException())
                            {
                                ctx.print_exception();
                            }
                            else
                            {
                                JSApi.JS_FreeValue(ctx, rval);
                            }
                        } while (false);

                        for (var i = 0; i < arglist.Count; i++)
                        {
                            JSApi.JS_FreeValue(ctx, arglist[i]);
                        }
                    }

                    JSApi.JS_FreeValue(ctx, globalThis);
                    JSApi.JS_FreeValue(ctx, func);
                }
            }
        }
    }
}
#endif