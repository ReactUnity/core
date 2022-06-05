using System;

namespace QuickJS
{
    public class InaccessibleMemberException : Exception
    {
        private string _memberName;

        public string name { get { return _memberName; } }

        public InaccessibleMemberException(string memberName)
        : base("inaccessible due to its protection level")
        {
            _memberName = memberName;
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(_memberName))
            {
                return base.ToString();
            }
            return string.Format("{0}: {1}", Message, _memberName);
        }
    }
}
