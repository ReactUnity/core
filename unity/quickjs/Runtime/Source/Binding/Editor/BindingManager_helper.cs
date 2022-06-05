using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;

namespace QuickJS.Binding
{
    public partial class BindingManager
    {
        public static void UnitylessReflectBind(ScriptRuntime runtime)
        {
            var bm = new BindingManager(new Prefs(), new BindingManager.Args
            {
                bindingCallback = new ReflectBindingCallback(runtime),
            });
            bm.Collect();
            bm.Generate(TypeBindingFlags.None);
            bm.Report();
        }

        public static int GetTSParameterCount(ParameterInfo[] parameters)
        {
            var len = parameters.Length;
            var argc = len;
            for (var i = 0; i < len; i++)
            {
                var parameterType = parameters[i].ParameterType;
                if (Binding.Values.IsContextualType(parameterType))
                {
                    argc--;
                }
            }
            return argc;
        }

        public static bool IsExtensionMethod(MethodBase method)
        {
            return method.IsStatic && method.IsDefined(typeof(System.Runtime.CompilerServices.ExtensionAttribute), false);
        }

        public static bool ContainsGenericParameters(MethodBase method)
        {
            var parameters = method.GetParameters();
            for (int i = 0, size = parameters.Length; i < size; i++)
            {
                var parameterType = parameters[i].ParameterType;
                if (parameterType.IsGenericTypeDefinition || parameterType.IsGenericParameter)
                {
                    return true;
                }
            }
            return false;
        }

        // 是否包含指针参数
        public static bool ContainsPointer(MethodInfo method)
        {
            if (method.ReturnType.IsPointer)
            {
                return true;
            }
            return ContainsPointer((MethodBase)method);
        }

        public static bool ContainsPointer(MethodBase method)
        {
            var parameters = method.GetParameters();
            for (int i = 0, size = parameters.Length; i < size; i++)
            {
                var parameterType = parameters[i].ParameterType;
                if (parameterType.IsPointer)
                {
                    return true;
                }
            }
            return false;
        }

        public static bool ContainsUnsupportedParameter(MethodInfo method)
        {
            if (method.ReturnType.IsPointer || method.ReturnType.FullName == null)
            {
                return true;
            }
            return ContainsUnsupportedParameter((MethodBase)method);
        }

        public static bool ContainsUnsupportedParameter(MethodBase method)
        {
            var parameters = method.GetParameters();
            for (int i = 0, size = parameters.Length; i < size; i++)
            {
                var parameterType = parameters[i].ParameterType;
                if (parameterType.IsPointer || parameterType.FullName == null)
                {
                    return true;
                }
            }
            return false;
        }

        // 是否包含按引用传参 (ref/out)
        public static bool ContainsByRefParameters(ParameterInfo[] parameters)
        {
            for (int i = 0, size = parameters.Length; i < size; i++)
            {
                var parameterType = parameters[i].ParameterType;
                if (parameterType.IsByRef)
                {
                    return true;
                }
            }
            return false;
        }

        public static bool ContainsByRefParameters(MethodBase method)
        {
            return ContainsByRefParameters(method.GetParameters());
        }

        public static bool IsGenericMethod(MethodBase method)
        {
            return method.GetGenericArguments().Length > 0;
        }

        public static bool IsUnsupported(MethodBase method)
        {
            return ContainsUnsupportedParameter(method) || IsGenericMethod(method);
        }

        public static bool IsUnsupported(MethodInfo method)
        {
            return ContainsUnsupportedParameter(method) || IsGenericMethod(method);
        }

        #region Helper for Extension Methods 
        
        public TypeTransform AddExtensionMethod<T>(Action<T> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<T1, T2>(Action<T1, T2> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<T1, T2, T3>(Action<T1, T2, T3> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<TResult>(Func<TResult> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<T1, TResult>(Func<T1, TResult> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<T1, T2, TResult>(Func<T1, T2, TResult> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod<T1, T2, T3, TResult>(Func<T1, T2, T3, TResult> method, string tsDecl = null)
        {
            return AddExtensionMethod(method.Method, tsDecl);
        }

        public TypeTransform AddExtensionMethod(MethodInfo method, string tsDecl = null)
        {
            if (!IsExtensionMethod(method))
            {
                throw new InvalidCastException("Not an extension method: " + method.ToString());
            }

            var parameters = method.GetParameters();
            var parameterType = parameters[0].ParameterType;
            return TransformType(parameterType).AddExtensionMethod(method, tsDecl);
        }

        #endregion
    }
}
