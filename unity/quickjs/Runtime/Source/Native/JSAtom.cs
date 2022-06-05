using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Sequential)]
    public struct JSAtom
    {
        public static readonly JSAtom Null;
        
        private int _value;

        public bool IsValid => _value != 0;

        /// <inheritdoc/>
        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }

        /// <inheritdoc/>
        public override string ToString()
        {
            return _value.ToString();
        }

        /// <inheritdoc/>
        public override bool Equals(object obj)
        {
            if (obj is JSAtom)
            {
                return ((JSAtom) obj)._value == _value;
            }

            return false;
        }

        public static bool operator ==(JSAtom a, JSAtom b)
        {
            return a._value == b._value;
        }

        public static bool operator !=(JSAtom a, JSAtom b)
        {
            return !(a == b);
        }
    }
}