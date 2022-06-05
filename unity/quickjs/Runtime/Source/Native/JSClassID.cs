using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    /// <summary>
    /// JSClassID is identical to uint32
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    public struct JSClassID
    {
        private uint _value;

        public static implicit operator JSClassID(uint value)
        {
            return new JSClassID {_value = value};
        }

        public static implicit operator uint(JSClassID value)
        {
            return value._value;
        }

        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }

        public override string ToString()
        {
            return _value.ToString();
        }

        public override bool Equals(object obj)
        {
            if (obj is JSClassID)
            {
                return ((JSClassID) obj)._value == _value;
            }

            return false;
        }
    }
}
