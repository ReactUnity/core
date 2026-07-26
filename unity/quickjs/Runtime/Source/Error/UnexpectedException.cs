using System;

namespace QuickJS
{
    public class UnexpectedException : Exception
    {
        private string _text;

        public UnexpectedException(string text, string message)
        : base(message)
        {
            _text = text;
        }

        public override string ToString()
        {
            return string.Format("{0}: {1}", Message, _text);
        }
    }
}
