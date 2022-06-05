using System;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Sequential)]
    public struct JSRuntime
    {
        private unsafe void* _ptr;

        public static readonly JSRuntime Null;

        public unsafe bool IsValid()
        {
            return _ptr != (void*) 0;
        }

        public override unsafe int GetHashCode()
        {
            return (int)_ptr;
        }

        public override unsafe bool Equals(object obj)
        {
            if (obj is JSRuntime)
            {
                var t = (JSRuntime)obj;
                return t._ptr == _ptr;
            }

            return false;
        }

        public override unsafe string ToString()
        {
            return string.Format("JSRuntime:{0}", (IntPtr)_ptr);
        }

        public static unsafe bool operator ==(JSRuntime a, JSRuntime b)
        {
            return a._ptr == b._ptr;
        }

        public static unsafe bool operator !=(JSRuntime a, JSRuntime b)
        {
            return a._ptr != b._ptr;
        }
    }
}
