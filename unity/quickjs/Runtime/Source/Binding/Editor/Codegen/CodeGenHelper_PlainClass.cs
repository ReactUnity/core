using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class PlainClassCodeGen : IDisposable
    {
        protected CodeGenerator cg;

        public PlainClassCodeGen(CodeGenerator cg, string name, bool isPartial)
        {
            this.cg = cg;
            if (isPartial)
            {
                this.cg.cs.AppendLine("public partial class {0}", name);
            }
            else
            {
                this.cg.cs.AppendLine("public class {0}", name);
            }
            this.cg.cs.AppendLine("{");
            this.cg.cs.AddTabLevel();
        }

        public void Dispose()
        {
            this.cg.cs.DecTabLevel();
            this.cg.cs.AppendLine("}");
        }
    }
}
