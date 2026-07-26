using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    public struct TypeReg
    {
        public string[] ns;
        public ModuleExportsBind bind;
    }
}
