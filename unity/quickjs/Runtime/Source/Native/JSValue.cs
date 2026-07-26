using System;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Explicit)]
    public struct JSValueUnion
    {
        [FieldOffset(0)] public int int32;

        [FieldOffset(0)] public double float64;

        [FieldOffset(0)] public IntPtr ptr;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct JSValue
    {
        public JSValueUnion u; // IntPtr
        public long tag;

        public bool IsFunctionByteCode()
        {
            return tag == JSApi.JS_TAG_FUNCTION_BYTECODE;
        }

        public bool IsException()
        {
            // return JSApi.JS_IsException(this);
            return tag == JSApi.JS_TAG_EXCEPTION;
        }

        public bool IsModule()
        {
            return tag == JSApi.JS_TAG_MODULE;
        }

        public bool IsNullish()
        {
            // return JSApi.JS_IsNull(this) || JSApi.JS_IsUndefined(this);
            return tag == JSApi.JS_TAG_NULL || tag == JSApi.JS_TAG_UNDEFINED;
        }

        public bool IsNull()
        {
            return tag == JSApi.JS_TAG_NULL;
        }

        public bool IsUndefined()
        {
            return tag == JSApi.JS_TAG_UNDEFINED;
        }

        public bool IsBoolean()
        {
            return tag == JSApi.JS_TAG_BOOL;
        }

        public bool IsString()
        {
            return tag == JSApi.JS_TAG_STRING;
        }

        public bool IsSymbol()
        {
            return tag == JSApi.JS_TAG_SYMBOL;
        }

        public bool IsNumber()
        {
            // return JSApi.JS_IsNumber(this);
            return tag == JSApi.JS_TAG_INT || tag == JSApi.JS_TAG_FLOAT64;
        }

        public bool IsObject()
        {
            // return JSApi.JS_IsObject(this);
            return tag == JSApi.JS_TAG_OBJECT;
        }

        public override int GetHashCode()
        {
            return u.int32 << 2 | (int)tag;
        }

        public bool Equals(JSValue other)
        {
            return this == other;
        }

        public override bool Equals(object obj)
        {
            if (obj is JSValue)
            {
                var other = (JSValue)obj;
                return this == other;
            }

            return false;
        }

        public override string ToString()
        {
            if (tag >= 0)
            {
                switch (tag)
                {
                    case JSApi.JS_TAG_FLOAT64: return u.float64.ToString();
                    case JSApi.JS_TAG_NULL: return "null";
                    case JSApi.JS_TAG_UNDEFINED: return "undefined";
                    case JSApi.JS_TAG_EXCEPTION: return "exception";
                    default: return string.Format("Value:{0:X}", (ulong)u.ptr);
                }
            }

            switch (tag)
            {
                case JSApi.JS_TAG_SYMBOL: return string.Format("Symbol:{0:X}", (ulong)u.ptr);
                case JSApi.JS_TAG_STRING: return string.Format("String:{0:X}", (ulong)u.ptr);
                default: return string.Format("Reference:{0:X}", (ulong)u.ptr);
            }
        }

        public static bool operator ==(JSValue a, JSValue b)
        {
            if (b.tag == a.tag)
            {
                if (a.tag >= 0)
                {
                    return a.tag == JSApi.JS_TAG_FLOAT64 ? a.u.float64 == b.u.float64 : a.u.int32 == b.u.int32;
                }

                // 注意: 引用类型的 JSValue 的基于指针地址判断, 没有经过 js_*_compare 的真实比较语义, 但通常情况下这足够了
                return a.u.ptr == b.u.ptr;
            }
            return false;
        }

        public static bool operator !=(JSValue a, JSValue b)
        {
            return !(a == b);
        }
    }
}
