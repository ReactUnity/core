using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public static class CodeGenUtils
    {
        public const string CodeEmitWarning = "Codegen for delegate binding with ref/out parameters will not work properly, because CodeDomProvider is not supported with current dotnet api compatibility settings. Please consider switching to .NET 4.6 in player settings.";

        public static bool IsCodeEmitSupported()
        {
#if JSB_UNITYLESS
#if NETCOREAPP
            return false;
#else
            return true;
#endif
#else
            var apiCompatibilityLevel = UnityEditor.PlayerSettings.GetApiCompatibilityLevel(UnityEditor.BuildTargetGroup.Standalone);
            return apiCompatibilityLevel == UnityEditor.ApiCompatibilityLevel.NET_4_6;
#endif
        }

        /// <summary>
        /// Compiles C# source into assembly, usually used for dynamically generating delegate function with ref/out parameters at runtime.
        /// NOTE: It will directly return null if CodeDom is not supported without throwing any exception.
        /// </summary>
        public static Assembly Compile(string source, IEnumerable<Assembly> referencedAssemblies, string compilerOptions, IBindingLogger logger)
        {
#if !(NETCOREAPP || NET_STANDARD_2_0 || NET_STANDARD_2_1 || NET_STANDARD)
            using (var codeDomProvider = System.CodeDom.Compiler.CodeDomProvider.CreateProvider("cs"))
            {
                var compilerParameters = new System.CodeDom.Compiler.CompilerParameters();
                compilerParameters.GenerateInMemory = true;
                compilerParameters.TreatWarningsAsErrors = false;
                compilerParameters.CompilerOptions = compilerOptions;
                // compilerParameters.TempFiles = new System.CodeDom.Compiler.TempFileCollection("Temp", false);
                compilerParameters.OutputAssembly = "Temp/_Generated_" + Guid.NewGuid().ToString() + ".dll";
                compilerParameters.ReferencedAssemblies.AddRange((from a in referencedAssemblies select a.Location).ToArray());
                var result = codeDomProvider.CompileAssemblyFromSource(compilerParameters, source);

                if (result.Errors.HasErrors)
                {
                    if (logger != null)
                    {
                        logger.LogError($"failed to compile source [{result.Errors.Count} errors]\nSource: {source}");
                        foreach (var err in result.Errors)
                        {
                            logger.LogError(err.ToString());
                        }
                    }
                }
                else
                {
                    return result.CompiledAssembly;
                }
            }
#endif
            return null;
        }

        /// <summary>
        /// Check if the type directly implements the given interface
        /// </summary>
        public static bool IsDirectlyImplements(Type type, Type interfaceType)
        {
            return type.BaseType != null && interfaceType.IsAssignableFrom(type) && !interfaceType.IsAssignableFrom(type.BaseType);
        }

        public static void RemoveAt<T>(ref T[] array, int index)
        {
#if JSB_UNITYLESS
            for (var i = index; i < array.Length - 1; i++)
            {
                array[i] = array[i + 1];
            }
            Array.Resize(ref array, array.Length - 1);
#else
            UnityEditor.ArrayUtility.RemoveAt(ref array, index);
#endif
        }

        public static string ToLiteral(bool v)
        {
            return v ? "true" : "false";
        }

        public static string Normalize(string name)
        {
            var gArgIndex = name.IndexOf("<");
            return gArgIndex < 0 ? name : name.Substring(0, gArgIndex);
        }

        public static string[] NormalizeEx(string[] values, string additional)
        {
            var list = new List<string>(values.Length + 1);
            list.AddRange(values);
            list.Add(additional);
            return Normalize(list.ToArray());
        }

        public static string[] Normalize(params string[] values)
        {
            return (from value in values where !string.IsNullOrEmpty(value) select value).ToArray();
        }

        public static string Concat(string sp, params string[] values)
        {
            return string.Join(sp, Normalize(values));
        }

        public static string ConcatAsLiteral(string sp, params string[] values)
        {
            return string.Join(sp, from value in Normalize(values) select $"\"{value}\"");
        }
    }
}
