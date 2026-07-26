using System;

namespace QuickJS
{
    [Flags]
    public enum JSHotfixFlags
    {
        Default = 0, // 替换
        Before = 1,  // 前置执行
        After = 2,   // 后置执行

        Full = Before | After,
    }

    [AttributeUsage(AttributeTargets.Class,
                    AllowMultiple = false,
                    Inherited = false)]
    public class JSHotfixAttribute : Attribute
    {
        public JSHotfixFlags flags { get; set; }

        public JSHotfixAttribute()
        {
        }

        public JSHotfixAttribute(JSHotfixFlags flags)
        {
            this.flags = flags;
        }
    }

    // 指定类型生成绑定代码
    [AttributeUsage(AttributeTargets.Class
                  | AttributeTargets.Struct
                  | AttributeTargets.Enum
                  | AttributeTargets.Interface,
                    AllowMultiple = false,
                    Inherited = false)]
    public class JSTypeAttribute : Attribute
    {
    }

    // 不产生包装, 直接导出 (签名必须符合 JSCFunction)
    // 这种方式导出的方法不支持重载, 需要在方法内部自行处理变参
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class JSCFunctionAttribute : Attribute
    {
        // 是否静态
        public bool isStatic { get; set; }

        // [可选] d.ts 对应输出信息
        public string[] difinitions { get; set; }

        public JSCFunctionAttribute()
        {
        }

        public JSCFunctionAttribute(bool isStatic, params string[] difinitions)
        {
            this.isStatic = isStatic;
            this.difinitions = difinitions;
        }

        public JSCFunctionAttribute(params string[] difinitions)
        {
            this.difinitions = difinitions;
        }
    }

    [AttributeUsage(AttributeTargets.Class |
                    AttributeTargets.Struct |
                    AttributeTargets.Interface |
                    AttributeTargets.Field |
                    AttributeTargets.Method |
                    AttributeTargets.Event |
                    AttributeTargets.Constructor |
                    AttributeTargets.Property,
                    AllowMultiple = false,
                    Inherited = false)]
    public class JSOmitAttribute : Attribute
    {
    }

    // JS绑定代码
    [AttributeUsage(AttributeTargets.Class,
                    AllowMultiple = false,
                    Inherited = false)]
    public class JSBindingAttribute : Attribute
    {
    }

    // // 强制转换为 JS Array
    // [AttributeUsage(AttributeTargets.Parameter
    //               | AttributeTargets.ReturnValue,
    //                 AllowMultiple = false)]
    // public class JSArrayAttribute : Attribute
    // {
    // }

    // // 在JS中指定名称
    // [AttributeUsage(AttributeTargets.Class
    //               | AttributeTargets.Struct
    //               | AttributeTargets.Enum
    //               | AttributeTargets.Field
    //               | AttributeTargets.Method
    //               | AttributeTargets.Property,
    //                 AllowMultiple = false)]
    // public class JSNamingAttribute : Attribute
    // {
    //     public string name { get; set; }
    //     public JSNamingAttribute(string name)
    //     {
    //         this.name = name;
    //     }
    // }

    // // 用于标记 struct 非静态方法, 表明该方法调用将修改 struct 自身 (在 js 中产生一次 rebind)
    // [AttributeUsage(AttributeTargets.Method,
    //                 AllowMultiple = false)]
    // public class JSMutableAttribute : Attribute
    // {
    // }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class JSDelegateAttribute : Attribute
    {
        public Type target { get; set; }

        public JSDelegateAttribute(Type target)
        {
            this.target = target;
        }
    }

    [AttributeUsage(AttributeTargets.Class
                  | AttributeTargets.Struct
                  | AttributeTargets.Enum
                  | AttributeTargets.Field
                  | AttributeTargets.Method
                  | AttributeTargets.Property
                  | AttributeTargets.Constructor,
                    AllowMultiple = false)]
    public class JSDocAttribute : Attribute
    {
        public string[] lines { get; set; }

        public JSDocAttribute(string text)
        {
            this.lines = new string[] { text };
        }

        public JSDocAttribute(params string[] lines)
        {
            this.lines = lines;
        }
    }

    /// <summary>
    /// NOT_IMPLEMENTED
    /// </summary>
    [AttributeUsage(AttributeTargets.Parameter
                  | AttributeTargets.ReturnValue,
                    AllowMultiple = false)]
    public class JSUseStringCacheAttribute : Attribute
    {
    }
}
