using System;

namespace ReactUnity
{
    public static class EncodingHelpers
    {
        public static string encodeURI(string input)
        {
            return Uri.EscapeUriString(input);
        }

        public static string decodeURI(string input)
        {
            return Uri.UnescapeDataString(input);
        }

        public static string encodeURIComponent(string input)
        {
            return Uri.EscapeDataString(input);
        }

        public static string decodeURIComponent(string input)
        {
            return Uri.UnescapeDataString(input);
        }
    }
}
