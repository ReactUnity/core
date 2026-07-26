using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace QuickJS.Binding
{
    public enum SourceCodeType
    {
        CSharp, 
        TSD, 
    }

    public interface ICodeGenCallback
    {
        void OnCodeGenBegin(BindingManager bindingManager);
        
        void OnCodeGenEnd();

        // return true to cancel the binding process
        bool OnTypeGenerating(TypeBindingInfo typeBindingInfo, int current, int total);

        void OnGenerateFinish();

        void OnSourceCodeEmitted(CodeGenerator cg, string csOutDir, string csName, SourceCodeType type, TextGenerator textGenerator);

        void OnGenerateBindingList(CodeGenerator cg, IEnumerable<IGrouping<string, TypeBindingInfo>> modules, ICollection<RawTypeBindingInfo> rawTypes);
    }
}
