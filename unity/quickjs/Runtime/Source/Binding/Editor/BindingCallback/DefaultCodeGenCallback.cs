using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;

namespace QuickJS.Binding
{
    public class DefaultCodeGenCallback : ICodeGenCallback
    {
        private BindingManager _bindingManager;

        public void OnCodeGenBegin(BindingManager bindingManager)
        {
            _bindingManager = bindingManager;
        }

        public void OnCodeGenEnd()
        {

        }

        public bool OnTypeGenerating(TypeBindingInfo typeBindingInfo, int current, int total)
        {
#if JSB_UNITYLESS
            return false;
#else
            return UnityEditor.EditorUtility.DisplayCancelableProgressBar(
                "Generating",
                $"{current}/{total}: {typeBindingInfo.FullName}",
                (float)current / total);
#endif
        }

        public void OnGenerateFinish()
        {
#if !JSB_UNITYLESS
            UnityEditor.EditorUtility.ClearProgressBar();
#endif
        }

        public void OnSourceCodeEmitted(CodeGenerator cg, string codeOutDir, string codeName, SourceCodeType type, TextGenerator textGenerator)
        {
            if (!Directory.Exists(codeOutDir))
            {
                Directory.CreateDirectory(codeOutDir);
            }

            var extension = "";
            switch (type)
            {
                case SourceCodeType.CSharp: extension = ".cs"; break;
                case SourceCodeType.TSD: extension = ".d.ts" + _bindingManager.prefs.extraExtForTypescript; break;
            }

            var slices = textGenerator.SubmitAll();
            var sliceCount = slices.Length;
            if (sliceCount == 1)
            {
                var csPath = Path.Combine(codeOutDir, codeName + extension);
                cg.WriteAllText(csPath, slices[0]);
                _bindingManager.AddOutputFile(codeOutDir, csPath);
            }
            else
            {
                for (int sliceIndex = 0; sliceIndex < sliceCount; ++sliceIndex)
                {
                    var csPath = Path.Combine(codeOutDir, $"{codeName}.part{sliceIndex}{extension}");
                    cg.WriteAllText(csPath, slices[sliceIndex]);
                    _bindingManager.AddOutputFile(codeOutDir, csPath);
                }
            }
        }

        public void OnGenerateBindingList(CodeGenerator cg, IEnumerable<IGrouping<string, TypeBindingInfo>> modules, ICollection<RawTypeBindingInfo> rawTypes)
        {
            cg.GenerateBindingList(Values.NamespaceOfStaticBinder, Values.ClassNameOfStaticBinder, modules, true, rawTypes);
        }
    }
}
