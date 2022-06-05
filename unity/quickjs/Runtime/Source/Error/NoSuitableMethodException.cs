using System;

namespace QuickJS
{
    public class NoSuitableMethodException : Exception
    {
        private int _argc;
        private string _methodName;

        public int argc { get { return _argc; } }

        public string name { get { return _methodName; } }

        public NoSuitableMethodException(string methodName, int argc)
        : base("no suitable method to call")
        {
            _argc = argc;
            _methodName = methodName;
        }

        public override string ToString()
        {
            return string.Format("{0}: {1} [{2}]", Message, _methodName, _argc);
        }
    }
}
