using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    public class EqualityComparer : IEqualityComparer<object>
    {
        public static readonly EqualityComparer Default = new EqualityComparer();

        public new bool Equals(object x, object y)
        {
            return ReferenceEquals(x, y);
        }

        public int GetHashCode(object obj)
        {
            return System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(obj);
        }
    }
}
