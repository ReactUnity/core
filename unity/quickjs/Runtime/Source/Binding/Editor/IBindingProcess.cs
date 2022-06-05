using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    // 继承该接口(或 AbstractBindingProcess)的类将在导出过程中执行指定方法, 可以在特定阶段进行特定操作
    public interface IBindingProcess
    {
        // 初始化阶段回调, 可以调用 AddTSMethodDeclaration, AddTSKeywords 等进行定制
        void OnInitialize(BindingManager bindingManager);

        // 收集 Assembly 阶段, 可在该阶段 AddAssemblies/RemoveAssemblies
        void OnPreCollectAssemblies(BindingManager bindingManager);

        //
        void OnPostCollectAssemblies(BindingManager bindingManager);
        
        void OnPreExporting(BindingManager bindingManager);
        
        void OnPostExporting(BindingManager bindingManager);

        // 收集类型阶段开始, 可在该阶段 AddExportedType 增加导出类型
        void OnPreCollectTypes(BindingManager bindingManager);

        //
        void OnPostCollectTypes(BindingManager bindingManager);

        // 是否要导出指定类型
        bool OnExportingType(BindingManager bindingManager, Type type);

        // 生成指定类型绑定代码前
        void OnPreGenerateType(BindingManager bindingManager, TypeBindingInfo bindingInfo);
        
        // 生成指定类型绑定代码后
        void OnPostGenerateType(BindingManager bindingManager, TypeBindingInfo bindingInfo);
        
        // 生成指定Delegate类型的绑定代码前
        void OnPreGenerateDelegate(BindingManager bindingManager, DelegateBridgeBindingInfo bindingInfo);

        // 生成指定Delegate类型的绑定代码后
        void OnPostGenerateDelegate(BindingManager bindingManager, DelegateBridgeBindingInfo bindingInfo);
        
        // 完成默认清理行为后 
        void OnCleanup(BindingManager bindingManager);
    }
}
