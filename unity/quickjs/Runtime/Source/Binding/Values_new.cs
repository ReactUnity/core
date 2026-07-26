using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    // 处理特殊操作, 关联本地对象等
    public partial class Values
    {
        /// <summary>
        /// 用于对由 js 构造产生的 c# 对象产生一个 js 包装对象 
        /// 注意: 此函数签名发生变化时, 用于优化的所有重载匹配函数需要统一变化
        /// </summary>
        /// <param name="ctx">JS 环境</param>
        /// <param name="new_target">构造</param>
        /// <param name="o">CS 对象</param>
        /// <param name="type_id">类型索引</param>
        /// <param name="disposable">是否生命周期完全由JS托管, 映射对象释放时, CS对象将被Dispose(如果是IDisposable)</param>
        /// <returns>映射对象</returns>
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, object o, int type_id, bool disposable)
        {
            var cache = ScriptEngine.GetObjectCache(ctx);
            var object_id = cache.AddObject(o, disposable);
            var val = JSApi.JSB_NewBridgeClassObject(ctx, new_target, object_id);
            if (JSApi.JS_IsException(val))
            {
                cache.RemoveObject(object_id);
            }
            else
            {
                cache.AddJSValue(o, val);
            }

            return val;
        }
    }
}
