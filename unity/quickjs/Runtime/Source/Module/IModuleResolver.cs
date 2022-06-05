using System;

namespace QuickJS.Module
{
    using Native;
    using Utils;

    public interface IModuleResolver
    {
        bool ResolveModule(IFileSystem fileSystem, IPathResolver pathResolver, string parent_module_id, string module_id, out string resolved_id);
        bool ContainsModule(IFileSystem fileSystem, IPathResolver pathResolver, string resolved_id);
        JSValue LoadModule(ScriptContext context, string parent_module_id, string resolved_id, bool set_as_main);
        
        /// <summary>
        /// reload the specified module, return false if this module can not be resolved by this resolver, otherwise return true even if fail to load the module
        /// (this method will not consume the refcount of module_obj)
        /// </summary>
        bool ReloadModule(ScriptContext context, string resolved_id, JSValue module_obj, out JSValue exports_obj);

        void Release();
    }
}
