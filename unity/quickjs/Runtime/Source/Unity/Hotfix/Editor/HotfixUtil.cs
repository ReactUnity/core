#if !JSB_UNITYLESS
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Mono.Cecil;
using Mono.Cecil.Cil;

namespace QuickJS.Unity.Experimental.Hotfix
{
    using UnityEditor;
    using UnityEngine;

    //TODO: 热更功能临时代码
    public class HotfixUtil
    {
        private const string TypeNameForInjectFlag = "_jsb_injected_flag_";

        [MenuItem("JS Bridge/Hotfix")]
        public static void RunHotfix()
        {
            Run();
        }

        private static bool IsHotfixTarget(TypeDefinition td)
        {
            foreach (var attr in td.CustomAttributes)
            {
                if (attr.AttributeType.FullName == typeof(QuickJS.JSHotfixAttribute).FullName)
                {
                    return true;
                }
            }
            return false;
        }

        public static bool Collect(AssemblyDefinition a, List<TypeDefinition> delegateTypes)
        {
            foreach (var type in a.MainModule.Types)
            {
                if (type.Name == TypeNameForInjectFlag)
                {
                    return false;
                }
                if (type.FullName == "jsb._QuickJSDelegates")
                {
                    foreach (var nested in type.NestedTypes)
                    {
                        if (nested.BaseType.FullName == "System.MulticastDelegate")
                        {
                            delegateTypes.Add(nested);
                            // Debug.LogFormat("Nest: {0} based {1} in {2}", nested.FullName, nested.BaseType.FullName, type.FullName);
                        }
                    }
                }
            }
            return true;
        }

        public static bool IsParameterMatched(ParameterDefinition p1, ParameterDefinition p2)
        {
            return p1.ParameterType == p2.ParameterType && p1.IsOut == p2.IsOut;
        }

        // 方法定义是否与 hotfix 委托定义匹配
        public static bool IsDelegateMatched(MethodDefinition m, TypeReference returnType, TypeDefinition d)
        {
            var invoke = d.Methods.First(dm => dm.Name == "Invoke");
            var argc = invoke.Parameters.Count;
            if (argc != m.Parameters.Count + 1)
            {
                return false;
            }

            if (invoke.ReturnType != returnType)
            {
                return false;
            }

            if (invoke.Parameters[0].IsOut)
            {
                return false;
            }

            if (m.IsStatic)
            {
                if (invoke.Parameters[0].ParameterType.FullName != "System.Type")
                {
                    return false;
                }
            }
            else
            {
                if (invoke.Parameters[0].ParameterType.FullName != "System.Object")
                {
                    return false;
                }
            }

            for (var i = 1; i < argc; i++)
            {
                var p1 = invoke.Parameters[i];
                var p2 = m.Parameters[i - 1];

                if (!IsParameterMatched(p1, p2))
                {
                    return false;
                }
            }

            return true;
        }

        // 从 Delegate 定义池中找一个匹配的
        public static TypeDefinition GetDelegate(MethodDefinition m, TypeReference returnType, List<TypeDefinition> list)
        {
            if (m.Name != ".cctor")
            {
                for (var i = 0; i < list.Count; i++)
                {
                    var item = list[i];
                    if (IsDelegateMatched(m, returnType, item))
                    {
                        return item;
                    }
                }
            }

            return null;
        }

        public static string GetMethodString(MethodDefinition method)
        {
            var sb = "";
            sb += $"{method.ReturnType} ";
            sb += $"{method.DeclaringType.FullName}.";
            sb += $"{method.Name}(";
            for (var i = 0; i < method.Parameters.Count; i++)
            {
                var p = method.Parameters[i];
                sb += $"{p.ParameterType} {p.Name}";
                if (i != method.Parameters.Count - 1)
                {
                    sb += ", ";
                }
            }
            sb += ");";

            return sb;
        }

        private static OpCode[] ldarg_i_table = new OpCode[] { OpCodes.Ldarg_0, OpCodes.Ldarg_1, OpCodes.Ldarg_2, OpCodes.Ldarg_3 };

        private static Instruction FindPatchPoint(MethodBody body)
        {
            var instructions = body.Instructions;
            return instructions.Count > 0 ? instructions[0] : null;
        }

        private static string GetHotfixFieldName_r(MethodDefinition method, HashSet<string> set)
        {
            var plainName = method.IsConstructor ? "_JSFIX_RC_" + method.Name.Replace(".", "") : "_JSFIX_R_" + method.Name;
            var index = 0;
            var serialName = plainName + "_" + index;

            while (set.Contains(serialName))
            {
                serialName = plainName + "_" + ++index;
            }

            set.Add(serialName);
            return serialName;
        }

        private static string GetHotfixFieldName_b(MethodDefinition method, HashSet<string> set)
        {
            var plainName = method.IsConstructor ? "_JSFIX_BC_" + method.Name.Replace(".", "") : "_JSFIX_B_" + method.Name;
            var index = 0;
            var serialName = plainName + "_" + index;

            while (set.Contains(serialName))
            {
                serialName = plainName + "_" + ++index;
            }

            return serialName;
        }

        public static void Run()
        {
            var testAssembly = Binding.BindingManager.TryGetAssembly("Assembly-CSharp");
            if (testAssembly == null)
            {
                return;
            }
            var assemblyFilePath = testAssembly.Location;
            var a = AssemblyDefinition.ReadAssembly(assemblyFilePath);
            var delegateTypes = new List<TypeDefinition>();
            var modified = false;

            if (!Collect(a, delegateTypes))
            {
                Debug.LogError("dirty dll");
                return;
            }

            foreach (var type in a.MainModule.Types)
            {
                //TODO: 改为通过列表而不是 Attribute 判断
                if (!IsHotfixTarget(type))
                {
                    continue;
                }

                var sb = $"{type.FullName}\n";
                var hotfixRegs = new HashSet<string>();
                foreach (var method in type.Methods)
                {
                    var delegateType_r = GetDelegate(method, method.ReturnType, delegateTypes);
                    var delegateType_b = GetDelegate(method, a.MainModule.TypeSystem.Void, delegateTypes);
                    if (delegateType_r == null)
                    {
                        continue;
                    }
                    var hotfixFieldName_r = GetHotfixFieldName_r(method, hotfixRegs);
                    var signatureLit = GetMethodString(method);

                    var point = FindPatchPoint(method.Body);
                    if (point == null)
                    {
                        Debug.LogWarningFormat("no patch point in {0}", signatureLit);
                        continue;
                    }

                    modified = true;
                    var argCount = method.IsStatic ? method.Parameters.Count : method.Parameters.Count + 1;
                    var proc = method.Body.GetILProcessor();
                    var boolVar = new VariableDefinition(a.MainModule.TypeSystem.Boolean);
                    method.Body.Variables.Add(boolVar);

                    if (delegateType_b != null)
                    {
                        var hotfixFieldName_b = GetHotfixFieldName_b(method, hotfixRegs);
                        var delegateField_b = new FieldDefinition(hotfixFieldName_b, FieldAttributes.Public | FieldAttributes.Static, delegateType_b);
                        var localPoint = point;

                        type.Fields.Add(delegateField_b);
                        proc.InsertBefore(localPoint, point = proc.Create(OpCodes.Ldsfld, delegateField_b));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldnull));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Cgt_Un));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Stloc, boolVar));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldloc, boolVar));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Brfalse_S, localPoint)); // jump to original instructions
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldsfld, delegateField_b));

                        if (method.IsStatic)
                        {
                            var refGetTypeFromHandle = a.MainModule.ImportReference(typeof(Type).GetMethod("GetTypeFromHandle"));
                            proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldtoken, type));
                            proc.InsertBefore(localPoint, proc.Create(OpCodes.Call, refGetTypeFromHandle));
                        }

                        for (var argIndex = 0; argIndex < argCount; argIndex++)
                        {
                            var ldarg_i = argIndex;
                            if (ldarg_i < ldarg_i_table.Length)
                            {
                                proc.InsertBefore(localPoint, proc.Create(ldarg_i_table[ldarg_i]));
                            }
                            else if (ldarg_i <= byte.MaxValue)
                            {
                                proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldarg_S, (byte)ldarg_i));
                            }
                            else
                            {
                                proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldarg, ldarg_i));
                            }
                        }
                        var invoke_b = delegateType_b.Methods.First(dm => dm.Name == "Invoke");
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Callvirt, invoke_b));
                    }

                    if (delegateType_r != null)
                    {
                        var delegateField_r = new FieldDefinition(hotfixFieldName_r, FieldAttributes.Public | FieldAttributes.Static, delegateType_r);
                        var localPoint = point;

                        type.Fields.Add(delegateField_r);
                        proc.InsertBefore(localPoint, point = proc.Create(OpCodes.Ldsfld, delegateField_r));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldnull));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Cgt_Un));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Stloc, boolVar));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldloc, boolVar));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Brfalse_S, localPoint)); // jump to original instructions
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldsfld, delegateField_r));

                        if (method.IsStatic)
                        {
                            var refGetTypeFromHandle = a.MainModule.ImportReference(typeof(Type).GetMethod("GetTypeFromHandle"));
                            proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldtoken, type));
                            proc.InsertBefore(localPoint, proc.Create(OpCodes.Call, refGetTypeFromHandle));
                        }

                        for (var argIndex = 0; argIndex < argCount; argIndex++)
                        {
                            var ldarg_i = argIndex;
                            if (ldarg_i < ldarg_i_table.Length)
                            {
                                proc.InsertBefore(localPoint, proc.Create(ldarg_i_table[ldarg_i]));
                            }
                            else if (ldarg_i <= byte.MaxValue)
                            {
                                proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldarg_S, (byte)ldarg_i));
                            }
                            else
                            {
                                proc.InsertBefore(localPoint, proc.Create(OpCodes.Ldarg, ldarg_i));
                            }
                        }
                        var invoke_r = delegateType_r.Methods.First(dm => dm.Name == "Invoke");
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Callvirt, invoke_r));
                        proc.InsertBefore(localPoint, proc.Create(OpCodes.Ret));
                    }

                    sb += hotfixFieldName_r + " > " + signatureLit;
                    sb += "\n";
                }
                Debug.LogFormat("{0}", sb);
            }

            if (modified)
            {
                a.MainModule.Types.Add(new TypeDefinition("QuickJS", TypeNameForInjectFlag, Mono.Cecil.TypeAttributes.Class, a.MainModule.TypeSystem.Object));
                a.Write(assemblyFilePath);
                // a.Write("temp.dll");
                Debug.LogFormat("write: {0}", assemblyFilePath);
            }
            else
            {
                Debug.LogWarningFormat("no change");
            }
        }
    }
}
#endif
