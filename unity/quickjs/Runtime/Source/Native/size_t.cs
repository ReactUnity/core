using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Sequential)]
    public unsafe struct size_t
    {
        private void* _value;

        public size_t(int value)
        {
            _value = (void*) (uint) value;
        }

        public size_t(uint value)
        {
            _value = (void*) value;
        }

        public size_t(ulong value)
        {
            _value = (void*) value;
        }

        public size_t(UIntPtr value)
        {
            _value = (void*) value;
        }

        public static implicit operator size_t(int value)
        {
            return new size_t(value);
        }

        public static implicit operator size_t(uint value)
        {
            return new size_t(value);
        }

        public static implicit operator size_t(ulong value)
        {
            return new size_t(value);
        }

        public static implicit operator size_t(UIntPtr value)
        {
            return new size_t(value);
        }

        public static implicit operator int(size_t value)
        {
            return (int) value._value;
        }

        public static implicit operator uint(size_t value)
        {
            return (uint) value._value;
        }

        public static implicit operator ulong(size_t value)
        {
            return (ulong) value._value;
        }
        
        public static implicit operator UIntPtr(size_t value)
        {
            return new UIntPtr(value._value);
        }

        public override string ToString()
        {
            return ((ulong)this).ToString();
        }
    }
}
