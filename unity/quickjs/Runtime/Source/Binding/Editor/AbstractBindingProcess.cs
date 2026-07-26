using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    public abstract class AbstractBindingProcess : IBindingProcess
    {
        public virtual void OnInitialize(BindingManager bindingManager)
        {
        }

        public virtual void OnPreCollectAssemblies(BindingManager bindingManager)
        {
        }

        public virtual void OnPostCollectAssemblies(BindingManager bindingManager)
        {
        }

        public virtual void OnPreExporting(BindingManager bindingManager)
        {
        }

        public virtual void OnPostExporting(BindingManager bindingManager)
        {
        }

        public virtual void OnPreCollectTypes(BindingManager bindingManager)
        {
        }

        public virtual void OnPostCollectTypes(BindingManager bindingManager)
        {
        }

        public virtual bool OnExportingType(BindingManager bindingManager, Type type)
        {
            return false;
        }

        public virtual void OnPreGenerateType(BindingManager bindingManager, TypeBindingInfo bindingInfo)
        {
        }

        public virtual void OnPostGenerateType(BindingManager bindingManager, TypeBindingInfo bindingInfo)
        {
        }

        public virtual void OnPreGenerateDelegate(BindingManager bindingManager, DelegateBridgeBindingInfo bindingInfo)
        {
        }

        public virtual void OnPostGenerateDelegate(BindingManager bindingManager, DelegateBridgeBindingInfo bindingInfo)
        {
        }

        public virtual void OnCleanup(BindingManager bindingManager)
        {
        }
    }
}
