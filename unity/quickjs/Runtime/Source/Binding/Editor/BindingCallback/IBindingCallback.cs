using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    /// <summary>
    /// the BindingManager will invoke a specific method at the specific stage of the binding process
    /// </summary>
    public interface IBindingCallback
    {
        void OnBindingBegin(BindingManager bindingManager);
        void OnBindingEnd();

        void BindRawTypes(ICollection<RawTypeBindingInfo> rawTypes);
        void BeginStaticModule(string moduleName, int capacity);
        void AddTypeReference(string moduleName, TypeBindingInfo typeBindingInfo);
        void EndStaticModule(string moduleName);

        void AddDelegate(DelegateBridgeBindingInfo bindingInfo);
    }
}
