using System;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Sequential)]
    public struct JSModuleDef
    {
        private unsafe void* _value;
        
        public static readonly JSModuleDef Null;

        public unsafe JSModuleDef(IntPtr ptr)
        {
            _value = ptr.ToPointer();
        }
        
        /// <inheritdoc/>
        public override unsafe int GetHashCode()
        {
            return (int) _value;
        }

        public override unsafe bool Equals(object obj)
        {
            if (obj is JSModuleDef)
            {
                return ((JSModuleDef) obj)._value == _value;
            }

            return false;
        }
    }
}