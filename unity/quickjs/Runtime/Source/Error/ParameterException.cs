using System;

namespace QuickJS
{
    public class ParameterException : Exception
    {
        /// <summary>
        /// 调用类型
        /// </summary>
        public Type thisType { get; set; }

        /// <summary>
        /// 调用的方法名
        /// </summary>
        public string methodName { get; set; }

        /// <summary>
        /// 期望参数类型
        /// </summary>
        public Type pType { get; set; }

        /// <summary>
        /// 参数位置
        /// </summary>
        public int pIndex { get; set; }

        public ParameterException(string message, Type pType, int pIndex)
        : base(message)
        {
            this.pType = pType;
            this.pIndex = pIndex;
        }

        public ParameterException(Type pType, int pIndex)
        : base("parameter error")
        {
            this.pType = pType;
            this.pIndex = pIndex;
        }

        public ParameterException(Type caller, string method, Type pType, int pIndex)
        : base("parameter error")
        {
            this.thisType = caller;
            this.methodName = method;
            this.pType = pType;
            this.pIndex = pIndex;
        }

        public override string ToString()
        {
            var callInfo = "";
            if (thisType != null)
            {
                callInfo += thisType.Name;
                if (methodName != null)
                {
                    callInfo += "." + methodName;
                }
                callInfo += " ";
            }

            return string.Format("{0} [{1}expect {2} at {3}]", Message, callInfo, pType, pIndex);
        }
    }
}
