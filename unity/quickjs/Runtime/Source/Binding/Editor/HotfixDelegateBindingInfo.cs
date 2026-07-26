using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;

namespace QuickJS.Binding
{
    public class HotfixDelegateBindingInfo
    {
        public Type returnType;
        public bool isStatic; // 委托针对的是静态函数
        public Type thisType;
        public ParameterInfo[] parameters;

        public HotfixDelegateBindingInfo(Type thisType, bool isStatic, Type returnType, ParameterInfo[] parameters)
        {
            this.isStatic = isStatic;
            this.thisType = thisType;
            this.returnType = returnType;
            this.parameters = parameters;
        }

        public bool Equals(Type thisType, bool isStatic, Type returnType, ParameterInfo[] parameters)
        {
            if (thisType != this.thisType)
            {
                return false;
            }

            if (isStatic != this.isStatic)
            {
                return false;
            }

            if (returnType != this.returnType || parameters.Length != this.parameters.Length)
            {
                return false;
            }

            for (var i = 0; i < parameters.Length; i++)
            {
                if (parameters[i].ParameterType != this.parameters[i].ParameterType)
                {
                    return false;
                }

                if (parameters[i].IsOut != this.parameters[i].IsOut)
                {
                    return false;
                }
            }

            return true;
        }

    }
}
