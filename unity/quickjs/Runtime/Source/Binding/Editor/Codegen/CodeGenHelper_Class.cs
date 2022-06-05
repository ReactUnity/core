using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Linq;
using System.Reflection;
using QuickJS.Native;

namespace QuickJS.Binding
{
    public class ClassCodeGen : TypeCodeGen
    {
        public ClassCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo)
        : base(cg, typeBindingInfo)
        {
            this.cg.AppendJSDoc(this.typeBindingInfo.type);
            var transform = this.typeBindingInfo.transform;
            var prefix = this.typeBindingInfo.tsTypeNaming.topLevel ? "declare " : "";
            var superBindingInfo = this.cg.bindingManager.GetSuperTypeBindingInfo(this.typeBindingInfo);
            var super = superBindingInfo != null ? this.cg.currentTSModule.GetTSTypeFullName(superBindingInfo.type) : "";
            var interfaces = this.cg.currentTSModule.GetTSInterfacesName(this.typeBindingInfo.type);
            var implements = "";
            var jsClassName = this.typeBindingInfo.tsTypeNaming.jsName;
            var jsClassType = "";

            if (typeBindingInfo.type.IsInterface)
            {
                jsClassType = "interface";

                if (string.IsNullOrEmpty(interfaces))
                {
                    if (!string.IsNullOrEmpty(super))
                    {
                        implements += $" extends {super}"; // something wrong 
                    }
                }
                else
                {
                    implements += $" extends {interfaces}";

                    if (!string.IsNullOrEmpty(super))
                    {
                        implements += $", {super}"; // something wrong 
                    }
                }
            }
            else
            {
                jsClassType = typeBindingInfo.type.IsAbstract ? "abstract class" : "class";

                if (!string.IsNullOrEmpty(super))
                {
                    implements += $" extends {super}";
                }

                if (!string.IsNullOrEmpty(interfaces))
                {
                    implements += $" implements {interfaces}";
                }
            }

            var requiredDefinesOfType = typeBindingInfo.transform.requiredDefines;
            if (requiredDefinesOfType != null)
            {
                var defs = string.Join(", ", from def in requiredDefinesOfType select $"\"{def}\"");
                if (jsClassType == "interface")
                {
                    this.cg.tsDeclare.AppendLine($"// @{this.cg.bindingManager.GetDefaultTypePrefix()}RequiredDefines({defs})");
                }
                else
                {
                    this.cg.tsDeclare.AppendLine($"@{this.cg.bindingManager.GetDefaultTypePrefix()}RequiredDefines({defs})");
                }
            }

            this.cg.tsDeclare.AppendLine($"{prefix}{jsClassType} {jsClassName}{implements} {{");
            this.cg.tsDeclare.AddTabLevel();

            // 生成函数体
            // 构造函数
            if (this.typeBindingInfo.constructors.available)
            {
                if (this.typeBindingInfo.transform.csConstructorOverride == null)
                {
                    using (new PInvokeGuardCodeGen(cg, typeof(Native.JSCFunctionMagic)))
                    {
                        using (new BindingConstructorDeclareCodeGen(cg, this.typeBindingInfo.constructors.csBindName))
                        {
                            using (new TryCatchGuradCodeGen(cg))
                            {
                                using (new ConstructorCodeGen(cg, this.typeBindingInfo))
                                {
                                }
                            }
                        }
                    }
                }

                using (new TSConstructorCodeGen(cg, this.typeBindingInfo, this.typeBindingInfo.constructors))
                {
                }
            }

            // 非静态成员方法
            foreach (var kv in this.typeBindingInfo.methods)
            {
                var methodBindingInfo = kv.Value;

                //TODO skip cs/tsd codegen in CSMethodCodeGen/TSMethodCodeGen/ClassMethodBindEntry for extension methods of interfaces

                if (!this.typeBindingInfo.type.IsInterface || (methodBindingInfo.count > 0 && methodBindingInfo.extensionCount != methodBindingInfo.count))
                {
                    var jscOverride = transform.GetCSMethodOverrideBinding(methodBindingInfo.jsName);
                    if (jscOverride == null)
                    {
                        //TODO add requiredDefines support
                        using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                        {
                            using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), methodBindingInfo.csBindName))
                            {
                                using (new TryCatchGuradCodeGen(cg))
                                {
                                    using (new CSMethodCodeGen(cg, this.typeBindingInfo, methodBindingInfo))
                                    {
                                    }
                                }
                            }
                        }
                    }

                    if (this.cg.tsDeclare.enabled)
                    {
                        using (new TSMethodCodeGen<MethodInfo>(cg, this.typeBindingInfo, methodBindingInfo))
                        {
                        }
                    }
                }
            }

            // generates extension methods of directly implemented interfaces for classes
            foreach (var interfaceType in typeBindingInfo.directInterfaces)
            {
                var type = typeBindingInfo.bindingManager.GetExportedType(interfaceType);
                if (type != null)
                {
                    foreach (var interfaceMethod in type.methods)
                    {
                        var methodBindingInfo = interfaceMethod.Value;
                        if (methodBindingInfo.extensionCount > 0)
                        {
                            using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                            {
                                using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), methodBindingInfo.csBindName))
                                {
                                    using (new TryCatchGuradCodeGen(cg))
                                    {
                                        using (new CSMethodCodeGen(cg, this.typeBindingInfo, methodBindingInfo))
                                        {
                                        }
                                    }
                                }
                            }

                            if (this.cg.tsDeclare.enabled)
                            {
                                using (new TSMethodCodeGen<MethodInfo>(cg, this.typeBindingInfo, methodBindingInfo))
                                {
                                }
                            }
                        }
                    }
                }
            }

            //TODO: C# 抽象类可以不提供方法实现, d.ts 需要补充声明
            // if (this.bindingInfo.type.IsAbstract && !this.bindingInfo.type.IsInterface)
            // {
            // }
            // 静态成员方法
            if (!typeBindingInfo.type.IsGenericTypeDefinition)
            {
                foreach (var kv in this.typeBindingInfo.staticMethods)
                {
                    var methodBindingInfo = kv.Value;
                    if (methodBindingInfo._cfunc != null)
                    {
                        continue;
                    }

                    var jscOverride = transform.GetCSMethodOverrideBinding(methodBindingInfo.jsName);
                    if (jscOverride == null)
                    {
                        //TODO add requiredDefines support
                        using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                        {
                            using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), methodBindingInfo.csBindName))
                            {
                                using (new TryCatchGuradCodeGen(cg))
                                {
                                    using (new CSMethodCodeGen(cg, this.typeBindingInfo, methodBindingInfo))
                                    {
                                    }
                                }
                            }
                        }
                    }

                    if (this.cg.tsDeclare.enabled)
                    {
                        using (new TSMethodCodeGen<MethodInfo>(cg, typeBindingInfo, methodBindingInfo))
                        {
                        }
                    }
                }
            }

            if (!typeBindingInfo.type.IsGenericTypeDefinition)
            {
                foreach (var operatorBindingInfo in this.typeBindingInfo.operators)
                {
                    using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                    {
                        using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), operatorBindingInfo.csBindName))
                        {
                            using (new TryCatchGuradCodeGen(cg))
                            {
                                using (new OperatorCodeGen(cg, this.typeBindingInfo, operatorBindingInfo))
                                {
                                }
                            }
                        }
                    }

                    using (new TSOperatorCodeGen(cg, typeBindingInfo, operatorBindingInfo))
                    {
                    }
                }
            }

            // 所有附加方法
            transform.ForEachAdditionalTSMethodDeclaration(decl => this.cg.tsDeclare.AppendLine(decl));

            // 所有属性
            foreach (var kv in this.typeBindingInfo.properties)
            {
                var propertyBindingInfo = kv.Value;

                // 静态
                if (propertyBindingInfo.isStatic)
                {
                    // 可读属性
                    if (propertyBindingInfo.staticPair.getterName != null)
                    {
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            using (new PInvokeGuardCodeGen(cg, typeof(JSGetterCFunction)))
                            {
                                using (new BindingGetterFuncDeclareCodeGen(cg, propertyBindingInfo.staticPair.getterName))
                                {
                                    using (new TryCatchGuradCodeGen(cg))
                                    {
                                        using (new PropertyGetterCodeGen(cg, propertyBindingInfo))
                                        {
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // 可写属性
                    if (propertyBindingInfo.staticPair.setterName != null)
                    {
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            using (new PInvokeGuardCodeGen(cg, typeof(JSSetterCFunction)))
                            {
                                using (new BindingSetterFuncDeclareCodeGen(cg, propertyBindingInfo.staticPair.setterName))
                                {
                                    using (new TryCatchGuradCodeGen(cg))
                                    {
                                        using (new PropertySetterCodeGen(cg, propertyBindingInfo))
                                        {
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else // if (propertyBindingInfo.instancePair.IsValid())
                {
                    // 非静态
                    // 可读属性
                    if (propertyBindingInfo.instancePair.getterName != null)
                    {
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            using (new PInvokeGuardCodeGen(cg, typeof(JSGetterCFunction)))
                            {
                                using (new BindingGetterFuncDeclareCodeGen(cg, propertyBindingInfo.instancePair.getterName))
                                {
                                    using (new TryCatchGuradCodeGen(cg))
                                    {
                                        using (new PropertyGetterCodeGen(cg, propertyBindingInfo))
                                        {
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 可写属性
                    if (propertyBindingInfo.instancePair.setterName != null)
                    {
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            using (new PInvokeGuardCodeGen(cg, typeof(JSSetterCFunction)))
                            {
                                using (new BindingSetterFuncDeclareCodeGen(cg, propertyBindingInfo.instancePair.setterName))
                                {
                                    using (new TryCatchGuradCodeGen(cg))
                                    {
                                        using (new PropertySetterCodeGen(cg, propertyBindingInfo))
                                        {
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 所有字段
            foreach (var kv in this.typeBindingInfo.fields)
            {
                var fieldBindingInfo = kv.Value;

                // 可读
                if (fieldBindingInfo.getterName != null)
                {
                    using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(fieldBindingInfo.fieldInfo)))
                    {
                        using (new PInvokeGuardCodeGen(cg, typeof(JSGetterCFunction)))
                        {
                            using (new BindingGetterFuncDeclareCodeGen(cg, fieldBindingInfo.getterName))
                            {
                                using (new TryCatchGuradCodeGen(cg))
                                {
                                    using (new FieldGetterCodeGen(cg, fieldBindingInfo))
                                    {
                                    }
                                }
                            }
                        }
                    }
                }

                // 可写 
                if (fieldBindingInfo.setterName != null)
                {
                    using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(fieldBindingInfo.fieldInfo)))
                    {
                        using (new PInvokeGuardCodeGen(cg, typeof(JSSetterCFunction)))
                        {
                            using (new BindingSetterFuncDeclareCodeGen(cg, fieldBindingInfo.setterName))
                            {
                                using (new TryCatchGuradCodeGen(cg))
                                {
                                    using (new FieldSetterCodeGen(cg, fieldBindingInfo))
                                    {
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 所有事件
            foreach (var kv in this.typeBindingInfo.events)
            {
                var eventBindingInfo = kv.Value;
                using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                {
                    using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), eventBindingInfo.name))
                    {
                        using (new TryCatchGuradCodeGen(cg))
                        {
                            using (new EventOperationCodeGen(cg, eventBindingInfo))
                            {
                            }
                        }
                    }
                }
            }

            // 所有委托 (Field/Property)
            foreach (var kv in this.typeBindingInfo.delegates)
            {
                var delegateBindingInfo = kv.Value;
                using (new PInvokeGuardCodeGen(cg, typeof(QuickJS.Native.JSCFunction)))
                {
                    using (new BindingFuncDeclareCodeGen(cg, typeof(QuickJS.Native.JSCFunction), delegateBindingInfo.name))
                    {
                        using (new TryCatchGuradCodeGen(cg))
                        {
                            using (new DelegateOperationCodeGen(cg, delegateBindingInfo))
                            {
                            }
                        }
                    }
                }
            }
        }

        public override void Dispose()
        {
            using (new RegFuncCodeGen(cg))
            {
                var transform = typeBindingInfo.transform;
                var constructor = typeBindingInfo.constructors.available ? typeBindingInfo.constructors.csBindName : cg.bindingManager.GetCSTypeFullName(BindingManager.DefaultPrivateConstructor);

                if (!typeBindingInfo.constructors.available && !typeBindingInfo.type.IsAbstract)
                {
#if !JSB_UNITYLESS
                    if (typeBindingInfo.type.IsSubclassOf(typeof(UnityEngine.Component)))
                    {
                        // 因为 ts 泛型约束需要 new() 形式, 所以在定义中产生一个 public 定义
                        // 例如: GetComponent<T extends Component>(type: { new(): T }): T
                        cg.tsDeclare.AppendLine("/*protected*/ constructor()");
                    }
                    else
#endif
                    {
                        if (!typeBindingInfo.type.IsGenericTypeDefinition)
                        {
                            cg.tsDeclare.AppendLine("protected constructor()");
                        }
                    }
                }

                var constructor_jscOverride = typeBindingInfo.transform.csConstructorOverride;
                if (constructor_jscOverride != null)
                {
                    constructor = this.cg.bindingManager.GetCSTypeFullName(constructor_jscOverride.Method);
                }

                cg.cs.AppendLine("var cls = register.CreateClass(\"{0}\", typeof({1}), {2});",
                    typeBindingInfo.tsTypeNaming.jsName,
                    this.cg.bindingManager.GetCSTypeFullName(typeBindingInfo.type),
                    constructor);

                // 运算符
                foreach (var operatorBindingInfo in typeBindingInfo.operators)
                {
                    var regName = operatorBindingInfo.jsName;
                    var funcName = operatorBindingInfo.csBindName;
                    var parameters = operatorBindingInfo.methodInfo.GetParameters();
                    var declaringType = operatorBindingInfo.methodInfo.DeclaringType;

                    do
                    {
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType != declaringType)
                            {
                                var leftType = typeBindingInfo.bindingManager.GetCSTypeFullName(parameters[0].ParameterType);
                                cg.cs.AppendLine("cls.AddLeftOperator(\"{0}\", {1}, {2}, typeof({3}));", regName, funcName, operatorBindingInfo.length, leftType);
                                break;
                            }
                            else if (parameters[1].ParameterType != declaringType)
                            {
                                var rightType = typeBindingInfo.bindingManager.GetCSTypeFullName(parameters[1].ParameterType);
                                cg.cs.AppendLine("cls.AddRightOperator(\"{0}\", {1}, {2}, typeof({3}));", regName, funcName, operatorBindingInfo.length, rightType);
                                break;
                            }
                        }

                        cg.cs.AppendLine("cls.AddSelfOperator(\"{0}\", {1}, {2});", regName, funcName, operatorBindingInfo.length);
                    } while (false);
                }

                // 非静态方法
                foreach (var kv in typeBindingInfo.methods)
                {
                    var regName = kv.Value.jsName;
                    var funcName = kv.Value.csBindName;
                    var jscOverride = typeBindingInfo.transform.GetCSMethodOverrideBinding(regName);
                    if (jscOverride != null)
                    {
                        funcName = this.cg.bindingManager.GetCSTypeFullName(jscOverride.Method);
                    }

                    cg.cs.AppendLine("cls.AddMethod(false, \"{0}\", {1});", regName, funcName);
                }

                // 静态方法
                foreach (var kv in typeBindingInfo.staticMethods)
                {
                    var methodBindingInfo = kv.Value;
                    var regName = methodBindingInfo.jsName;

                    if (methodBindingInfo._cfunc != null)
                    {
                        var attr = (JSCFunctionAttribute)Attribute.GetCustomAttribute(methodBindingInfo._cfunc, typeof(JSCFunctionAttribute));
                        var methodDeclType = this.cg.bindingManager.GetCSTypeFullName(methodBindingInfo._cfunc.DeclaringType);
                        var isStatic = attr.isStatic ? "true" : "false";
                        cg.cs.AppendLine("cls.AddRawMethod({0}, \"{1}\", {2}.{3});", isStatic, regName, methodDeclType, methodBindingInfo._cfunc.Name);
                        if (attr.difinitions != null)
                        {
                            foreach (var defEntry in attr.difinitions)
                            {
                                var prefix = attr.isStatic ? "static " : "";

                                // 附带的签名没有带命名时, 自动加上
                                if (defEntry.StartsWith("(") || defEntry.StartsWith("<"))
                                {
                                    this.cg.tsDeclare.AppendLine($"{prefix}{regName}{defEntry}");
                                }
                                else
                                {
                                    this.cg.tsDeclare.AppendLine($"{prefix}{defEntry}");
                                }
                            }
                        }
                        else
                        {
                            this.cg.tsDeclare.AppendLine("(...uncertain: any[]): any /* uncertain */");
                        }
                    }
                    else
                    {
                        var funcName = methodBindingInfo.csBindName;
                        var jscOverride = typeBindingInfo.transform.GetCSMethodOverrideBinding(regName);
                        if (jscOverride != null)
                        {
                            funcName = this.cg.bindingManager.GetCSTypeFullName(jscOverride.Method);
                        }

                        cg.cs.AppendLine("cls.AddMethod(true, \"{0}\", {1});", regName, funcName);
                    }
                }

                // 属性
                foreach (var kv in typeBindingInfo.properties)
                {
                    var propertyBindingInfo = kv.Value;
                    if (propertyBindingInfo.staticPair.IsValid())
                    {
                        var tsPropertyVar = this.cg.bindingManager.GetTSVariable(propertyBindingInfo.regName);
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            cg.cs.AppendLine("cls.AddProperty(true, \"{0}\", {1}, {2});",
                                tsPropertyVar,
                                propertyBindingInfo.staticPair.getterName != null ? propertyBindingInfo.staticPair.getterName : "null",
                                propertyBindingInfo.staticPair.setterName != null ? propertyBindingInfo.staticPair.setterName : "null");
                        }
                        var tsPropertyPrefix = "static ";
                        if (propertyBindingInfo.staticPair.setterName == null)
                        {
                            tsPropertyPrefix += "readonly ";
                        }
                        var tsPropertyType = this.cg.currentTSModule.GetTSTypeFullName(propertyBindingInfo.propertyType);
                        cg.AppendJSDoc(propertyBindingInfo.propertyInfo);
                        cg.tsDeclare.AppendLine($"{tsPropertyPrefix}{tsPropertyVar}: {tsPropertyType}");
                    }

                    if (propertyBindingInfo.instancePair.IsValid())
                    {
                        var tsPropertyVar = this.cg.bindingManager.GetTSVariable(propertyBindingInfo.regName);
                        using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(propertyBindingInfo.propertyInfo)))
                        {
                            cg.cs.AppendLine("cls.AddProperty(false, \"{0}\", {1}, {2});",
                                tsPropertyVar,
                                propertyBindingInfo.instancePair.getterName != null ? propertyBindingInfo.instancePair.getterName : "null",
                                propertyBindingInfo.instancePair.setterName != null ? propertyBindingInfo.instancePair.setterName : "null");
                        }
                        var tsPropertyPrefix = "";
                        if (propertyBindingInfo.instancePair.setterName == null)
                        {
                            tsPropertyPrefix += "readonly ";
                        }
                        var tsPropertyType = this.cg.currentTSModule.GetTSTypeFullName(propertyBindingInfo.propertyType);
                        cg.AppendJSDoc(propertyBindingInfo.propertyInfo);
                        cg.tsDeclare.AppendLine($"{tsPropertyPrefix}{tsPropertyVar}: {tsPropertyType}");
                    }
                }

                foreach (var kv in typeBindingInfo.fields)
                {
                    var fieldBindingInfo = kv.Value;
                    var bStatic = fieldBindingInfo.isStatic;
                    var tsFieldVar = this.cg.bindingManager.GetTSVariable(fieldBindingInfo.regName);
                    using (new CSEditorOnlyCodeGen(cg, typeBindingInfo.GetRequiredDefines(fieldBindingInfo.fieldInfo)))
                    {
                        if (fieldBindingInfo.constantValue != null)
                        {
                            var cv = fieldBindingInfo.constantValue;
                            cg.cs.AppendLine($"cls.AddConstValue(\"{tsFieldVar}\", {cv});");
                        }
                        else
                        {
                            cg.cs.AppendLine("cls.AddField({0}, \"{1}\", {2}, {3});",
                                bStatic ? "true" : "false",
                                tsFieldVar,
                                fieldBindingInfo.getterName != null ? fieldBindingInfo.getterName : "null",
                                fieldBindingInfo.setterName != null ? fieldBindingInfo.setterName : "null");
                        }
                    }
                    var tsFieldPrefix = bStatic ? "static " : "";
                    if (fieldBindingInfo.setterName == null)
                    {
                        tsFieldPrefix += "readonly ";
                    }
                    var tsFieldType = this.cg.currentTSModule.GetTSTypeFullName(fieldBindingInfo.fieldType);
                    cg.AppendJSDoc(fieldBindingInfo.fieldInfo);
                    cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}: {tsFieldType}");
                }

                foreach (var kv in typeBindingInfo.events)
                {
                    var eventBindingInfo = kv.Value;
                    var bStatic = eventBindingInfo.isStatic;
                    var tsFieldVar = this.cg.bindingManager.GetTSVariable(eventBindingInfo.regName);
                    var tsFieldType = this.cg.currentTSModule.GetTSTypeFullName(eventBindingInfo.eventInfo.EventHandlerType);
                    var tsFieldPrefix = "";
                    if (bStatic)
                    {
                        tsFieldPrefix += "static ";
                        cg.cs.AppendLine($"cls.AddMethod(true, \"{tsFieldVar}\", {eventBindingInfo.name});");
                    }
                    else
                    {
                        cg.cs.AppendLine($"cls.AddMethod(false, \"{tsFieldVar}\", {eventBindingInfo.name});");
                    }
                    cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"add\" | \"remove\", fn: {tsFieldType}): void");
                }

                foreach (var kv in typeBindingInfo.delegates)
                {
                    var delegateBindingInfo = kv.Value;
                    var bStatic = delegateBindingInfo.isStatic;
                    var tsFieldVar = this.cg.bindingManager.GetTSVariable(delegateBindingInfo.regName);
                    var tsFieldType = this.cg.currentTSModule.GetTSTypeFullName(delegateBindingInfo.delegateType);
                    var tsFieldPrefix = "";
                    if (bStatic)
                    {
                        tsFieldPrefix += "static ";
                        cg.cs.AppendLine($"cls.AddMethod(true, \"{tsFieldVar}\", {delegateBindingInfo.name});");
                    }
                    else
                    {
                        cg.cs.AppendLine($"cls.AddMethod(false, \"{tsFieldVar}\", {delegateBindingInfo.name});");
                    }

                    if (delegateBindingInfo.readable)
                    {
                        if (delegateBindingInfo.writable)
                        {
                            cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"get\"): {tsFieldType}");
                            cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"add\" | \"remove\" | \"set\", fn?: {tsFieldType}): void");
                            cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"add\" | \"remove\" | \"set\" | \"get\", fn?: {tsFieldType}): {tsFieldType} | void");
                        }
                        else
                        {
                            cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"get\"): {tsFieldType}");
                        }
                    }
                    else
                    {
                        cg.tsDeclare.AppendLine($"{tsFieldPrefix}{tsFieldVar}(op: \"set\", fn: {tsFieldType})");
                    }
                }

                cg.cs.AppendLine("return cls;");
            }
            base.Dispose();

            this.cg.tsDeclare.DecTabLevel();
            this.cg.tsDeclare.AppendLine("}");
        }
    }
}

