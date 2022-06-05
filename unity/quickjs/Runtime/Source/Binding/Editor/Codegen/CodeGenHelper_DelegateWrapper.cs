using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class DelegateWrapperCodeGen : IDisposable
    {
        protected CodeGenerator cg;

        public DelegateWrapperCodeGen(CodeGenerator cg)
        {
            this.cg = cg;
            this.cg.cs.AppendLine("[{0}]", typeof(JSBindingAttribute).Name);
            // this.cg.cs.AppendLine("[UnityEngine.Scripting.Preserve]");
            this.cg.cs.AppendLine("public class {0} : {1}", CodeGenerator.NameOfDelegates, typeof(Binding.Values).Name);
            this.cg.cs.AppendLine("{");
            this.cg.cs.AddTabLevel();
        }

        public void Dispose()
        {
            using (new RuntimeRegFuncCodeGen(cg))
            {
                this.cg.cs.AppendLine("var type = typeof({0});", CodeGenerator.NameOfDelegates);
                this.cg.cs.AppendLine("var typeDB = runtime.GetTypeDB();");
                this.cg.cs.AppendLine("var methods = type.GetMethods(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public);");
                this.cg.cs.AppendLine("for (int i = 0, size = methods.Length; i < size; i++)");
                using (this.cg.cs.CodeBlockScope())
                {
                    this.cg.cs.AppendLine("var method = methods[i];");
                    this.cg.cs.AppendLine("var attributes = method.GetCustomAttributes(typeof(JSDelegateAttribute), false);");
                    this.cg.cs.AppendLine("var attributesLength = attributes.Length;");
                    this.cg.cs.AppendLine("if (attributesLength > 0)");
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.cs.AppendLine("for (var a = 0; a < attributesLength; a++)");
                        using (this.cg.cs.CodeBlockScope())
                        {
                            this.cg.cs.AppendLine("var attribute = attributes[a] as JSDelegateAttribute;");
                            this.cg.cs.AppendLine("typeDB.AddDelegate(attribute.target, method);");
                        }
                    }
                }
            }

            this.cg.cs.DecTabLevel();
            this.cg.cs.AppendLine("}");
        }
    }
}
