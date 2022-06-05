using System;

namespace QuickJS
{
    public class JSException : Exception
    {
        private string _fileName;

        public JSException(string message, string fileName)
        : base(message)
        {
            _fileName = fileName;
        }

        public JSException(string message)
        : base(message)
        {
        }

        public override string ToString()
        {
            var baseStr = base.ToString();
            return string.IsNullOrEmpty(_fileName) 
                ? baseStr
                : $"{baseStr} ({_fileName})";
        }
    }
}
