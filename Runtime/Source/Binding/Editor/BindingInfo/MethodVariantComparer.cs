using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public class MethodVariantComparer : IComparer<int>
    {
        public int Compare(int a, int b)
        {
            return a < b ? 1 : (a == b ? 0 : -1);
        }
    }
}