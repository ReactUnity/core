using System;
using System.Reflection;
using UnityEngine.Networking;

namespace ReactUnity
{
    public static class EncodingHelpers
    {
        private static Type WWWTranscoder;
        private static MethodInfo URLEncode;
        private static MethodInfo URLDecode;
        private static MethodInfo DataEncode;
        private static MethodInfo DataDecode;

        static EncodingHelpers()
        {
            WWWTranscoder = typeof(UnityWebRequest).Assembly?.GetType("UnityEngine.WWWTranscoder");
        }

        public static string encodeURI(string input)
        {
            URLEncode = URLEncode ?? WWWTranscoder?.GetMethod("URLEncode", new Type[] { typeof(string) });
            return URLEncode?.Invoke(null, new object[] { input }) as string ?? input;
        }

        public static string decodeURI(string input)
        {
            URLDecode = URLDecode ?? WWWTranscoder?.GetMethod("URLDecode", new Type[] { typeof(string) });
            return URLDecode?.Invoke(null, new object[] { input }) as string ?? input;
        }

        public static string encodeURIComponent(string input)
        {
            DataEncode = DataEncode ?? WWWTranscoder?.GetMethod("DataEncode", new Type[] { typeof(string) });
            return DataEncode?.Invoke(null, new object[] { input }) as string ?? input;
        }

        public static string decodeURIComponent(string input)
        {
            DataDecode = DataDecode ?? WWWTranscoder?.GetMethod("DataDecode", new Type[] { typeof(string) });
            return DataDecode?.Invoke(null, new object[] { input }) as string ?? input;
        }
    }
}
