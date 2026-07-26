using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace QuickJS.Utils
{
    public static class TextUtils
    {
        private static readonly byte[] _header;
        private static readonly byte[] _footer;

        static TextUtils()
        {
            _header = Encoding.UTF8.GetBytes("(function(exports,require,module,__filename,__dirname){");
            _footer = Encoding.UTF8.GetBytes("\n})");
        }

        public static uint ToHostByteOrder(uint x)
        {
            return (uint)System.Net.IPAddress.NetworkToHostOrder((int)x);
        }

        public static uint ToNetworkByteOrder(uint x)
        {
            return (uint)System.Net.IPAddress.HostToNetworkOrder((int)x);
        }

        /// <summary>
        /// 剔除行注释
        /// </summary>
        public static string NormalizeJson(string json)
        {
            if (json == null)
            {
                return json;
            }
            
            var outstr = new StringBuilder();
            var state = 0;
            for (int i = 0; i < json.Length; i++)
            {
                if (state == 0)
                {
                    if (json[i] == '/')
                    {
                        // try to skip url scheme
                        if (i == 0 || json[i - 1] != ':')
                        {
                            state = 1;
                            continue;
                        }
                    }
                }
                else if (state == 1)
                {
                    if (json[i] == '/')
                    {
                        state = 2;
                        continue;
                    }
                    state = 0;
                    outstr.Append('/');
                }
                else if (state == 2)
                {
                    if (json[i] != '\n')
                    {
                        continue;
                    }
                    state = 0;
                }
                outstr.Append(json[i]);
            }
            return outstr.ToString();
        }

        public static byte[] GetBytes(string str)
        {
            return Encoding.UTF8.GetBytes(str);
        }

        public static byte[] GetNullTerminatedBytes(string str)
        {
            if (str == null)
            {
                return null;
            }

            var len = str.Length;
            if (len > 0 && str[len - 1] == 0)
            {
                return Encoding.UTF8.GetBytes(str);
            }

            var count = Encoding.UTF8.GetByteCount(str);
            var bytes = new byte[count + 1];
            Encoding.UTF8.GetBytes(str, 0, len, bytes, 0);

            return bytes;
        }

        /// <summary>
        /// 在首尾添加内容产生一个可供 require 的 module def
        /// </summary>
        public static byte[] GetShebangNullTerminatedCommonJSBytes(byte[] str)
        {
            return GetShebangNullTerminatedCommonJSBytes(str, _header, _footer);
        }

        public static byte[] GetShebangNullTerminatedCommonJSBytes(byte[] str, byte[] header, byte[] footer)
        {
            if (str == null)
            {
                return str;
            }
            var count = str.Length;

            if (str[count - 1] == 0)
            {
                count--;
            }

            var header_size = header.Length;
            var footer_size = footer.Length;
            var bom_size = 0;
            if (count >= 3)
            {
                // utf8 with bom
                if (str[0] == 239 && str[1] == 187 && str[2] == 191)
                {
                    bom_size = 3;
                }
            }

            var bytes = new byte[header_size + count + footer_size + 1 - bom_size];
            Array.Copy(header, 0, bytes, 0, header_size);
            Array.Copy(str, bom_size, bytes, header_size, count - bom_size);

            if (count >= 2)
            {
                // skip shebang line (replace #! => //)
                if (str[0] == 35 && str[1] == 33)
                {
                    bytes[header_size] = 47;
                    bytes[header_size + 1] = 47;
                }
                else
                {
                    if (bom_size > 0)
                    {
                        if (count > bom_size + 1)
                        {
                            if (str[bom_size] == 35 && str[bom_size + 1] == 33)
                            {
                                bytes[header_size] = 47;
                                bytes[header_size + 1] = 47;
                            }
                        }
                    }
                }
            }

            Array.Copy(footer, 0, bytes, header_size + count - bom_size, footer_size);
            return bytes;
        }

        /// <summary>
        /// 保证内容存在 \0 结尾, 返回值可能是源内容本身
        /// </summary>
        public static byte[] GetNullTerminatedBytes(byte[] str)
        {
            if (str == null)
            {
                return str;
            }

            var count = str.Length;
            if (str[count - 1] == 0)
            {
                return str;
            }
            var bytes = new byte[count + 1];
            Array.Copy(str, 0, bytes, 0, count);
            return bytes;
        }

        public static int GetBomSize(byte[] str)
        {
            if (str == null)
            {
                return 0;
            }

            var count = str.Length;
            if (count > 3)
            {
                if (str[0] == 239 && str[1] == 187 && str[2] == 191)
                {
                    return 3;
                }
            }
            return 0;
        }
    }
}
