using System;

namespace QuickJS.Binding
{
    [Flags]
    public enum TypeBindingFlags
    {
        None = 0,
        BindingCode = 1,  // 生成绑定代码
        TypeDefinition = 2, // 生成 d.ts 声明
        BuildTargetPlatformOnly = 4, 

        Default = BindingCode | TypeDefinition | BuildTargetPlatformOnly,
    }
}
