using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public abstract class MethodBaseBindingInfo<T>
        where T : MethodBase
    {
        public string csBindName { get; set; } // 绑定代码名
        public string jsName { get; set; } // 导出名

        private int _count = 0;
        private int _extensionCount = 0;

        // 按照参数数逆序排序所有变体
        // 有相同参数数量要求的方法记录在同一个 Variant 中 (变参方法按最少参数数计算, 不计变参参数数)
        public SortedDictionary<int, MethodBaseVariant<T>> variants = new SortedDictionary<int, MethodBaseVariant<T>>(new MethodVariantComparer());

        // 标记为 JSCFunction, 不生成包装代码, 直接注册给JS
        // 必须为静态函数, 且函数签名完全匹配 JSCFunction
        public MethodBase _cfunc;

        /// <summary>
        /// number of variants
        /// </summary>
        public int count => _count;

        /// <summary>
        /// number of extension methods in all variants
        /// </summary>
        public int extensionCount => _extensionCount;

        public bool Add(T method, bool isExtension)
        {
            if (method.IsDefined(typeof(JSCFunctionAttribute), false))
            {
                if (!method.IsStatic || _cfunc != null)
                {
                    return false;
                }
                this._cfunc = method;
                return true;
            }

            var parameters = method.GetParameters();
            var nargs = BindingManager.GetTSParameterCount(parameters);
            var isVararg = Binding.Values.IsVarargParameter(parameters);
            MethodBaseVariant<T> variant;
            if (isVararg)
            {
                --nargs;
            }

            if (isExtension)
            {
                --nargs;
                ++_extensionCount;
            }

            if (!this.variants.TryGetValue(nargs, out variant))
            {
                variant = new MethodBaseVariant<T>(nargs);
                this.variants.Add(nargs, variant);
            }

            if (variant.Add(method, isVararg, isExtension))
            {
                _count++;
            }
            return true;
        }
    }

    public class MethodBindingInfo : MethodBaseBindingInfo<MethodInfo>
    {
        public MethodBindingInfo(BindingManager bindingManager, bool bStatic, string csName, string jsName)
        {
            this.csBindName = bindingManager.GetBindName(bStatic, csName);
            this.jsName = jsName;
        }
    }

    public class OperatorBindingInfo : MethodBaseBindingInfo<MethodInfo>
    {
        public int length; // 参数数
        public string csName; // CS原始方法名 (op_xxx)
        public string cs_op; // 绑定代码中的运算符
        public MethodInfo methodInfo;
        public bool isExtension;

        // regName: js 中的重载运算符
        public OperatorBindingInfo(BindingManager bindingManager, MethodInfo methodInfo, bool isExtension, bool bStatic, string csName, string jsName, string cs_op, int length)
        {
            this.methodInfo = methodInfo;
            this.isExtension = isExtension;
            this.length = length;
            this.csName = csName;
            this.jsName = jsName;
            this.cs_op = cs_op;
            this.csBindName = bindingManager.GetBindName(bStatic, csName + "_qjs");
            if (methodInfo.DeclaringType.GetMethods().Count(m => m.IsSpecialName && m.Name.StartsWith("op_") && m.Name == methodInfo.Name) > 1)
            {
                this.csBindName += "_m";
            }

            this.Add(methodInfo, isExtension); //NOTE: 旧代码, 待更替
        }
    }

    public class ConstructorBindingInfo : MethodBaseBindingInfo<ConstructorInfo>
    {
        public Type decalringType;

        // public 构造是否可用
        public bool available
        {
            get
            {
                if (decalringType.IsGenericTypeDefinition)
                {
                    return false;
                }
                
                if (decalringType.IsValueType && !decalringType.IsPrimitive && !decalringType.IsAbstract)
                {
                    return true; // default constructor for struct
                }

                return variants.Count > 0;
            }
        }

        public ConstructorBindingInfo(BindingManager bindingManager, Type decalringType)
        {
            this.decalringType = decalringType;
            this.csBindName = bindingManager.GetConstructorBindName();
            this.jsName = "constructor";
        }
    }

}