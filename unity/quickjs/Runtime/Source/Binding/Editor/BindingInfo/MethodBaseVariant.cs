using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    // 所有具有相同参数数量的方法变体 (最少参数的情况下)
    public class MethodBaseVariant<T>
        where T : MethodBase
    {
        public class MethodBind
        {
            public T method;
            public bool isExtension;

            public MethodBind(T method, bool isExtension)
            {
                this.method = method;
                this.isExtension = isExtension;
            }

            public bool CheckMethodEquality(ParameterInfo[] a, int aIndex, ParameterInfo[] b, int bIndex)
            {
                var aLen = a.Length - aIndex;
                var bLen = b.Length - bIndex;
                if (aLen != bLen)
                {
                    return false;
                }

                while (aIndex < a.Length && bIndex < b.Length)
                {
                    var aInfo = a[aIndex++];
                    var bInfo = b[bIndex++];
                    if (aInfo.ParameterType != bInfo.ParameterType || aInfo.IsOut != bInfo.IsOut)
                    {
                        return false;
                    }
                }

                return true;
            }

            public bool CheckMethodEquality(T method, bool isExtension)
            {
                return CheckMethodEquality(
                    this.method.GetParameters(), this.isExtension ? 1 : 0,
                    method.GetParameters(), isExtension ? 1 : 0
                );
            }
        }

        public int argc; // 最少参数数要求
        public List<MethodBind> plainMethods = new List<MethodBind>();
        public List<MethodBind> varargMethods = new List<MethodBind>();

        // 是否包含变参方法
        public bool isVararg
        {
            get { return varargMethods.Count > 0; }
        }

        public int count
        {
            get { return plainMethods.Count + varargMethods.Count; }
        }

        public MethodBaseVariant(int argc)
        {
            this.argc = argc;
        }

        public bool Add(T methodInfo, bool isVararg, bool isExtension)
        {
            //TODO: method 按照参数的具体程度排序以提高 match_type 的有效命中率
            if (isVararg)
            {
                foreach (var entry in this.varargMethods)
                {
                    if (entry.CheckMethodEquality(methodInfo, isExtension))
                    {
                        return false;
                    }
                }
                this.varargMethods.Add(new MethodBind(methodInfo, isExtension));
            }
            else
            {
                foreach (var entry in this.plainMethods)
                {
                    if (entry.CheckMethodEquality(methodInfo, isExtension))
                    {
                        return false;
                    }
                }
                this.plainMethods.Add(new MethodBind(methodInfo, isExtension));
            }
            return true;
        }
    }
}