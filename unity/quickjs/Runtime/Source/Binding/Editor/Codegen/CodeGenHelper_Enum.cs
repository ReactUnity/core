using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class EnumCodeGen : TypeCodeGen
    {
        public EnumCodeGen(CodeGenerator cg, TypeBindingInfo type)
        : base(cg, type)
        {
            this.cg.AppendJSDoc(type.type);
            var prefix = this.typeBindingInfo.tsTypeNaming.topLevel ? "declare " : "";
            this.cg.tsDeclare.AppendLine("{0}enum {1} {{", prefix, typeBindingInfo.tsTypeNaming.jsName);
            this.cg.tsDeclare.AddTabLevel();
        }

        public override void Dispose()
        {
            using (new RegFuncCodeGen(cg))
            {
                this.cg.cs.AppendLine("var cls = register.CreateEnum(\"{0}\", typeof({1}));",
                    typeBindingInfo.tsTypeNaming.jsName,
                    this.cg.bindingManager.GetCSTypeFullName(typeBindingInfo.type));
                var values = new Dictionary<string, object>();
                foreach (var name in Enum.GetNames(typeBindingInfo.type))
                {
                    if (!typeBindingInfo.transform.Filter(name))
                    {
                        values[name] = Enum.Parse(typeBindingInfo.type, name);
                    }
                }
                foreach (var kv in values)
                {
                    var name = kv.Key;
                    var value = kv.Value;
                    var pvalue = Convert.ToInt32(value);
                    this.cg.cs.AppendLine($"cls.AddConstValue(\"{name}\", {pvalue});");
                    this.cg.AppendEnumJSDoc(typeBindingInfo.type, value);
                    this.cg.tsDeclare.AppendLine($"{name} = {pvalue},");
                }
                this.cg.cs.AppendLine("return cls;");
            }
            base.Dispose();
            this.cg.tsDeclare.DecTabLevel();
            this.cg.tsDeclare.AppendLine("}");
        }
    }
}
