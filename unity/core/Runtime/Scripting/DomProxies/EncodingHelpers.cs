using System;
using System.Text;

namespace ReactUnity
{
    public static class EncodingHelpers
    {
        // Uri.Escape methods don't support more than 32766 characters so we split it up
        private const int EscapeLimit = 32000;

        public static string encodeURI(string input)
        {
            if (input == null) return "";
            var len = input.Length;
            if (len < EscapeLimit) return Uri.EscapeUriString(input);

            var res = new StringBuilder();
            for (int i = 0; i < len; i += EscapeLimit)
            {
                var sub = input.Substring(i, Math.Min(len - i, EscapeLimit));
                res.Append(Uri.EscapeUriString(sub));
            }
            return res.ToString();
        }

        public static string decodeURI(string input)
        {
            if (input == null) return "";
            return Uri.UnescapeDataString(input);
        }

        public static string encodeURIComponent(string input)
        {
            if (input == null) return "";
            var len = input.Length;
            if (len < EscapeLimit) return Uri.EscapeDataString(input);

            var res = new StringBuilder();
            for (int i = 0; i < len; i += EscapeLimit)
            {
                var sub = input.Substring(i, Math.Min(len - i, EscapeLimit));
                res.Append(Uri.EscapeDataString(sub));
            }
            return res.ToString();
        }

        public static string decodeURIComponent(string input)
        {
            if (input == null) return "";
            return Uri.UnescapeDataString(input);
        }
    }
}
