using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public class TypeBindingInfo
    {
        public readonly BindingManager bindingManager;
        public readonly Type type;

        /// <summary>
        /// 类型转换信息 (此处必不为空)
        /// </summary>
        public readonly TypeTransform transform;

        public bool preload => operators.Count != 0;

        public TypeBindingFlags bindingFlags => transform.bindingFlags;

        /// <summary>
        /// 是否可以在脚本中继承此类型
        /// </summary>
        public bool crossbind => transform.crossbind;

        /// <summary>
        /// 是否完全由 JS 托管 (JS对象释放时, CS对象即释放)
        /// </summary>
        public bool disposable => transform.disposable;

        /// <summary>
        /// 是否生成绑定代码
        /// </summary>
        public bool genBindingCode => (bindingFlags & TypeBindingFlags.BindingCode) != 0;

        // 父类类型
        public Type super => type.BaseType;

        public Type[] interfaces => type.GetInterfaces();

        public Type[] directInterfaces => (from interfaceType in type.GetInterfaces() where CodeGenUtils.IsDirectlyImplements(type, interfaceType) select interfaceType).ToArray();

        /// <summary>
        /// 跳过此类型的导出
        /// </summary>
        public bool omit => _omit;

        /// <summary>
        /// 等价于 type.Assembly
        /// </summary>
        public Assembly Assembly => type.Assembly;

        /// <summary>
        /// 等价于 type.FullName
        /// </summary>
        public string FullName => type.FullName;

        /// <summary>
        /// 等价于 type.IsEnum
        /// </summary>
        public bool IsEnum => type.IsEnum;

        private string _csBindingName;

        /// <summary>
        /// 绑定代码名
        /// </summary>
        public string csBindingName => _csBindingName;

        public List<OperatorBindingInfo> operators = new List<OperatorBindingInfo>();

        public Dictionary<string, MethodBindingInfo> methods = new Dictionary<string, MethodBindingInfo>();
        public Dictionary<string, MethodBindingInfo> staticMethods = new Dictionary<string, MethodBindingInfo>();

        public Dictionary<string, PropertyBindingInfo> properties = new Dictionary<string, PropertyBindingInfo>();
        public Dictionary<string, FieldBindingInfo> fields = new Dictionary<string, FieldBindingInfo>();
        public Dictionary<string, EventBindingInfo> events = new Dictionary<string, EventBindingInfo>();
        public Dictionary<string, DelegateBindingInfo> delegates = new Dictionary<string, DelegateBindingInfo>();
        public ConstructorBindingInfo constructors;

        private TSTypeNaming _tsTypeNaming;
        public TSTypeNaming tsTypeNaming => _tsTypeNaming;

        private bool _omit;

        public TypeBindingInfo(BindingManager bindingManager, Type type, TypeTransform typeTransform)
        {
            this.bindingManager = bindingManager;
            this.type = type;
            this.transform = typeTransform;
            this._omit = type.IsDefined(typeof(JSOmitAttribute), false);
        }

        public void Initialize()
        {
            _tsTypeNaming = bindingManager.GetTSTypeNaming(type, true);
            _csBindingName = bindingManager.prefs.typeBindingPrefix
                + _tsTypeNaming.jsFullName
                    .Replace('.', '_')
                    .Replace('+', '_')
                    .Replace('<', '_')
                    .Replace('>', '_')
                    .Replace(' ', '_')
                    .Replace(',', '_')
                    .Replace('=', '_');

            var module = this.bindingManager.GetExportedModule(_tsTypeNaming.jsModule);

            module.Add(this);
        }

        public HashSet<string> GetRequiredDefines(MemberInfo memberInfo)
        {
            var setForMember = transform.GetRequiredDefinesOfMember(memberInfo.Name);
            var declaringType = bindingManager.TransformType(memberInfo.DeclaringType);
            var setForDeclaringType = declaringType?.requiredDefines;
            if (setForMember != null)
            {
                if (setForDeclaringType != null)
                {
                    var set = new HashSet<string>(setForMember);
                    set.UnionWith(setForDeclaringType);
                    return set;
                }
                return setForMember;
            }
            return null;
        }

        // 将类型名转换成简单字符串 (比如用于文件名)
        public string GetFileName()
        {
            if (type.IsGenericType)
            {
                var selfname = string.IsNullOrEmpty(type.Namespace) ? "" : (type.Namespace + "_");
                var gpIndex = type.Name.IndexOf('`');
                selfname += gpIndex >= 0 ? type.Name.Substring(0, gpIndex) : type.Name;
                foreach (var gp in type.GetGenericArguments())
                {
                    selfname += "_" + gp.Name;
                }

                return selfname.Replace(".", "_").Replace("<", "_").Replace(">", "_").Replace("`", "_");
            }

            var filename = type.FullName.Replace(".", "_").Replace("<", "_").Replace(">", "_").Replace("`", "_");
            return filename;
        }

        public void AddEvent(EventInfo eventInfo)
        {
            try
            {
                bindingManager.CollectDelegate(eventInfo.EventHandlerType);
                events.Add(eventInfo.Name, new EventBindingInfo(this, eventInfo));
                bindingManager.Info("[AddEvent] {0}.{1}", type, eventInfo.Name);
            }
            catch (Exception exception)
            {
                bindingManager.Error("AddEvent failed {0} @ {1}: {2}", eventInfo, type, exception.Message);
            }
        }

        public void AddField(FieldInfo fieldInfo)
        {
            try
            {
                bindingManager.CollectDelegate(fieldInfo.FieldType);
                if (fieldInfo.FieldType.BaseType == typeof(MulticastDelegate))
                {
                    delegates.Add(fieldInfo.Name, new DelegateBindingInfo(this, fieldInfo));
                    bindingManager.Info("[AddField] As Delegate: {0}.{1}", type, fieldInfo.Name);
                }
                else
                {
                    fields.Add(fieldInfo.Name, new FieldBindingInfo(this, fieldInfo));
                    bindingManager.Info("[AddField] {0}.{1}", type, fieldInfo.Name);
                }
            }
            catch (Exception exception)
            {
                bindingManager.Error("AddField failed {0} @ {1}: {2}", fieldInfo, type, exception.Message);
            }
        }

        public void AddProperty(PropertyInfo propInfo)
        {
            try
            {
                bindingManager.CollectDelegate(propInfo.PropertyType);
                if (propInfo.PropertyType.BaseType == typeof(MulticastDelegate))
                {
                    delegates.Add(propInfo.Name, new DelegateBindingInfo(this, propInfo));
                    bindingManager.Info("[AddProperty] As Delegate: {0}.{1}", type, propInfo.Name);
                }
                else
                {
                    properties.Add(propInfo.Name, new PropertyBindingInfo(this, propInfo));
                    bindingManager.Info("[AddProperty] {0}.{1}", type, propInfo.Name);
                }
            }
            catch (Exception exception)
            {
                bindingManager.Error("AddProperty failed {0} @ {1}: {2}", propInfo, type, exception.Message);
            }
        }

        public bool IsSupportedOperators(MethodInfo methodInfo)
        {
            if (methodInfo.IsSpecialName && methodInfo.Name.StartsWith("op_"))
            {
                // do not support overloaded operators at present
                // if (methodInfo.DeclaringType.GetMethods().Count(m => m.IsSpecialName && m.Name.StartsWith("op_") && m.Name == methodInfo.Name) == 1)
                // {
                //     return true;
                // }
                return true;
            }
            return false;
        }

        public bool IsOperatorOverloadingEnabled(MethodInfo methodInfo)
        {
            return Native.JSApi.IsOperatorOverloadingSupported && bindingManager.prefs.enableOperatorOverloading && transform.enableOperatorOverloading && IsSupportedOperators(methodInfo);
        }

        public void AddMethod(MethodInfo methodInfo, bool asExtensionAnyway)
        {
            if (this.transform.IsBlocked(methodInfo))
            {
                bindingManager.Info("skip blocked method: {0}", methodInfo.Name);
                return;
            }

            if (Values.register_type_caster(methodInfo))
            {
                bindingManager.Info("collected as type caster method: {0}.{1}", methodInfo.DeclaringType.FullName, methodInfo.Name);
                return;
            }

            // if (type.IsConstructedGenericType)
            // {
            //     var gTransform = bindingManager.GetTypeTransform(type.GetGenericTypeDefinition());
            //     if (gTransform != null && gTransform.IsBlocked(methodInfo.??))
            //     {
            //         bindingManager.Info("skip blocked method in generic definition: {0}", methodInfo.Name);
            //         return;
            //     }
            // }

            var isExtension = asExtensionAnyway || BindingManager.IsExtensionMethod(methodInfo);
            var isStatic = methodInfo.IsStatic && !isExtension;

            if (isStatic && type.IsGenericTypeDefinition)
            {
                bindingManager.Info("skip static method in generic type definition: {0}", methodInfo.Name);
                return;
            }

            var methodCSName = methodInfo.Name;
            var methodJSName = this.bindingManager.GetNamingAttribute(this.transform, methodInfo);

            if (IsOperatorOverloadingEnabled(methodInfo))
            {
                var parameters = methodInfo.GetParameters();
                var declaringType = methodInfo.DeclaringType;
                OperatorBindingInfo operatorBindingInfo = null;
                switch (methodCSName)
                {
                    case "op_LessThan":
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType == declaringType && parameters[1].ParameterType == declaringType)
                            {
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, methodCSName, "<", "<", 2);
                            }
                        }
                        break;
                    case "op_Addition":
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType == declaringType && parameters[1].ParameterType == declaringType)
                            {
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, methodCSName, "+", "+", 2);
                            }
                        }
                        break;
                    case "op_Subtraction":
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType == declaringType && parameters[1].ParameterType == declaringType)
                            {
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, methodCSName, "-", "-", 2);
                            }
                        }
                        break;
                    case "op_Equality":
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType == declaringType && parameters[1].ParameterType == declaringType)
                            {
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, methodCSName, "==", "==", 2);
                            }
                        }
                        break;
                    case "op_Multiply":
                        if (parameters.Length == 2)
                        {
                            var op0 = bindingManager.GetExportedType(parameters[0].ParameterType);
                            var op1 = bindingManager.GetExportedType(parameters[1].ParameterType);
                            if (op0 != null && op1 != null)
                            {
                                var bindingName = methodCSName + "_" + op0.csBindingName + "_" + op1.csBindingName;
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, bindingName, "*", "*", 2);
                            }
                        }
                        break;
                    case "op_Division":
                        if (parameters.Length == 2)
                        {
                            var op0 = bindingManager.GetExportedType(parameters[0].ParameterType);
                            var op1 = bindingManager.GetExportedType(parameters[1].ParameterType);
                            if (op0 != null && op1 != null)
                            {
                                var bindingName = methodCSName + "_" + op0.csBindingName + "_" + op1.csBindingName;
                                operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, bindingName, "/", "/", 2);
                            }
                        }
                        break;
                    case "op_UnaryNegation":
                        {
                            operatorBindingInfo = new OperatorBindingInfo(bindingManager, methodInfo, isExtension, isStatic, methodCSName, "neg", "-", 1);
                        }
                        break;
                }

                if (operatorBindingInfo != null)
                {
                    operators.Add(operatorBindingInfo);
                    CollectDelegate(methodInfo);
                    bindingManager.Info("[AddOperator] {0}.{1}", type, methodInfo);
                    if (!bindingManager.prefs.alwaysEmitOperatorMethod)
                    {
                        return;
                    }
                }

                // fallback to normal method binding
            }

            var group = isStatic ? staticMethods : methods;
            MethodBindingInfo methodBindingInfo;
            if (!group.TryGetValue(methodJSName, out methodBindingInfo))
            {
                methodBindingInfo = new MethodBindingInfo(bindingManager, isStatic, methodCSName, methodJSName);
                group.Add(methodJSName, methodBindingInfo);
            }

            if (!methodBindingInfo.Add(methodInfo, isExtension))
            {
                bindingManager.Info("fail to add method: {0}", methodInfo.Name);
                return;
            }

            CollectDelegate(methodInfo);
            bindingManager.Info("[AddMethod] {0}.{1}", type, methodInfo);
        }

        public void AddMethod(Native.JSCFunction func)
        {
            var group = staticMethods;
            MethodBindingInfo methodBindingInfo;
            var methodCSName = func.Method.Name;
            var methodJSName = this.bindingManager.GetNamingAttribute(this.transform, func.Method);
            if (!group.TryGetValue(methodJSName, out methodBindingInfo))
            {
                methodBindingInfo = new MethodBindingInfo(bindingManager, true, methodCSName, methodJSName);
                group.Add(methodJSName, methodBindingInfo);
            }

            methodBindingInfo._cfunc = func.Method;
        }

        private void CollectDelegate(MethodBase method)
        {
            var parameters = method.GetParameters();
            for (var i = 0; i < parameters.Length; i++)
            {
                bindingManager.CollectDelegate(parameters[i].ParameterType);
            }
        }

        public void AddConstructor(ConstructorInfo constructorInfo)
        {
            if (this.transform.IsBlocked(constructorInfo))
            {
                bindingManager.Info("skip blocked constructor: {0}", constructorInfo.Name);
                return;
            }

            if (!constructors.Add(constructorInfo, false))
            {
                bindingManager.Info("add constructor failed: {0}", constructorInfo.Name);
                return;
            }
            CollectDelegate(constructorInfo);
            this.bindingManager.Info("[AddConstructor] {0}.{1}", type, constructorInfo);
        }

        // 收集所有 字段,属性,方法
        public void Collect()
        {
            this.constructors = new ConstructorBindingInfo(bindingManager, type);

            var bindingFlags = Binding.DynamicType.PublicFlags;
            var fields = type.GetFields(bindingFlags);
            foreach (var field in fields)
            {
                if (field.IsSpecialName || field.Name.StartsWith("_JSFIX_"))
                {
                    bindingManager.Info("skip special field: {0}", field.Name);
                    continue;
                }

                if (field.IsStatic && type.IsGenericTypeDefinition)
                {
                    bindingManager.Info("skip static field in generic type definition: {0}", field.Name);
                    return;
                }

                if (field.FieldType.IsPointer)
                {
                    bindingManager.Info("skip pointer field: {0}", field.Name);
                    continue;
                }

                if (field.IsDefined(typeof(JSOmitAttribute), false))
                {
                    bindingManager.Info("skip omitted field: {0}", field.Name);
                    continue;
                }

                if (field.IsDefined(typeof(ObsoleteAttribute), false))
                {
                    bindingManager.Info("skip obsolete field: {0}", field.Name);
                    continue;
                }

                if (field.IsDefined(typeof(System.Runtime.CompilerServices.FixedBufferAttribute), false))
                {
                    bindingManager.Info("skip unsupported field (FixedBuffer): {0}", field.Name);
                    continue;
                }

                if (transform.IsMemberBlocked(field.Name))
                {
                    bindingManager.Info("skip blocked field: {0}", field.Name);
                    continue;
                }

                if (transform.Filter(field))
                {
                    bindingManager.Info("skip filtered field: {0}", field.Name);
                    continue;
                }

                AddField(field);
            }

            var events = type.GetEvents(bindingFlags);
            foreach (var evt in events)
            {
                if (evt.IsSpecialName)
                {
                    bindingManager.Info("skip special event: {0}", evt.Name);
                    continue;
                }

                if ((evt.GetAddMethod(true)?.IsStatic == true || evt.GetRemoveMethod(true)?.IsStatic == true) && type.IsGenericTypeDefinition)
                {
                    bindingManager.Info("skip static event in generic type definition: {0}", evt.Name);
                    return;
                }

                if (evt.EventHandlerType.IsPointer)
                {
                    bindingManager.Info("skip pointer event: {0}", evt.Name);
                    continue;
                }

                if (evt.IsDefined(typeof(ObsoleteAttribute), false))
                {
                    bindingManager.Info("skip obsolete event: {0}", evt.Name);
                    continue;
                }

                if (evt.IsDefined(typeof(JSOmitAttribute), false))
                {
                    bindingManager.Info("skip omitted event: {0}", evt.Name);
                    continue;
                }

                if (transform.IsMemberBlocked(evt.Name))
                {
                    bindingManager.Info("skip blocked event: {0}", evt.Name);
                    continue;
                }

                if (transform.Filter(evt))
                {
                    bindingManager.Info("skip filtered event: {0}", evt.Name);
                    continue;
                }

                AddEvent(evt);
            }

            var properties = type.GetProperties(bindingFlags);
            foreach (var property in properties)
            {
                if (property.IsSpecialName)
                {
                    bindingManager.Info("skip special property: {0}", property.Name);
                    continue;
                }

                if (property.PropertyType.IsPointer)
                {
                    bindingManager.Info("skip pointer property: {0}", property.Name);
                    continue;
                }

                var propInfoGetMethod = property.GetGetMethod(true);
                var propInfoSetMethod = property.GetSetMethod(true);

                if ((propInfoGetMethod?.IsStatic == true || propInfoSetMethod?.IsStatic == true) && type.IsGenericTypeDefinition)
                {
                    bindingManager.Info("skip static property in generic type definition: {0}", property.Name);
                    return;
                }

                if (property.IsDefined(typeof(JSOmitAttribute), false))
                {
                    bindingManager.Info("skip omitted property: {0}", property.Name);
                    continue;
                }

                if (property.IsDefined(typeof(ObsoleteAttribute), false))
                {
                    bindingManager.Info("skip obsolete property: {0}", property.Name);
                    continue;
                }

                if (transform.IsMemberBlocked(property.Name))
                {
                    bindingManager.Info("skip blocked property: {0}", property.Name);
                    continue;
                }

                if (transform.Filter(property))
                {
                    bindingManager.Info("skip filtered property: {0}", property.Name);
                    continue;
                }

                //NOTE: 索引访问
                if (property.Name == "Item")
                {
                    if (property.CanRead && propInfoGetMethod != null && propInfoGetMethod.IsPublic)
                    {
                        if (BindingManager.IsUnsupported(propInfoGetMethod))
                        {
                            bindingManager.Info("skip unsupported get-method: {0}", propInfoGetMethod);
                            continue;
                        }

                        AddMethod(propInfoGetMethod, false);
                    }

                    if (property.CanWrite && propInfoSetMethod != null && propInfoSetMethod.IsPublic)
                    {
                        if (BindingManager.IsUnsupported(propInfoSetMethod))
                        {
                            bindingManager.Info("skip unsupported set-method: {0}", propInfoSetMethod);
                            continue;
                        }

                        AddMethod(propInfoSetMethod, false);
                    }

                    // bindingManager.Info("skip indexer property: {0}", property.Name);
                    continue;
                }

                AddProperty(property);
            }

            if (!type.IsAbstract)
            {
                var constructors = type.GetConstructors();
                foreach (var constructor in constructors)
                {
                    if (constructor.IsDefined(typeof(JSOmitAttribute), false))
                    {
                        bindingManager.Info("skip omitted constructor: {0}", constructor);
                        continue;
                    }

                    if (constructor.IsDefined(typeof(ObsoleteAttribute), false))
                    {
                        bindingManager.Info("skip obsolete constructor: {0}", constructor);
                        continue;
                    }

                    if (BindingManager.ContainsPointer(constructor))
                    {
                        bindingManager.Info("skip pointer-param constructor: {0}", constructor);
                        continue;
                    }

                    if (BindingManager.ContainsByRefParameters(constructor))
                    {
                        bindingManager.Info("skip byref-param constructor: {0}", constructor);
                        continue;
                    }

                    if (transform.Filter(constructor))
                    {
                        bindingManager.Info("skip filtered constructor: {0}", constructor.Name);
                        continue;
                    }

                    AddConstructor(constructor);
                }
            }

            CollectMethods(type.GetMethods(bindingFlags), false);
            CollectMethods(transform.extensionMethods, true);
            CollectMethods(transform.staticMethods, false);
        }

        private void CollectMethods(IEnumerable<Native.JSCFunction> funcs, bool asExtensionAnyway)
        {
            if (funcs != null)
            {
                foreach (var func in funcs)
                {
                    AddMethod(func);
                }
            }
        }

        private void CollectMethods(IEnumerable<MethodInfo> methods, bool asExtensionAnyway)
        {
            if (methods == null)
            {
                return;
            }
            
            foreach (var method in methods)
            {
                if (BindingManager.IsGenericMethod(method))
                {
                    bindingManager.Info("skip generic method: {0}", method);
                    continue;
                }

                if (BindingManager.ContainsUnsupportedParameter(method))
                {
                    bindingManager.Info("skip unsupported (pointer/invalid parameter type) method: {0}", method);
                    continue;
                }

                if (method.IsSpecialName)
                {
                    if (!IsSupportedOperators(method))
                    {
                        bindingManager.Info("skip special method: {0}", method);
                        continue;
                    }
                }

                if (method.IsDefined(typeof(JSOmitAttribute), false))
                {
                    bindingManager.Info("skip omitted method: {0}", method);
                    continue;
                }

                if (method.IsDefined(typeof(ObsoleteAttribute), false))
                {
                    bindingManager.Info("skip obsolete method: {0}", method);
                    continue;
                }

                if (transform.IsMemberBlocked(method.Name))
                {
                    bindingManager.Info("skip blocked method: {0}", method.Name);
                    continue;
                }

                if (transform.Filter(method))
                {
                    bindingManager.Info("skip filtered method: {0}", method.Name);
                    continue;
                }

                if (asExtensionAnyway || BindingManager.IsExtensionMethod(method))
                {
                    var targetType = method.GetParameters()[0].ParameterType;
                    var targetInfo = bindingManager.GetExportedType(targetType);
                    if (targetInfo != null)
                    {
                        targetInfo.AddMethod(method, true);
                        continue;
                    }
                }

                AddMethod(method, false);
            }
        }

        /// <summary>
        /// 按照 TypeBindingInfo 的记录, 进行动态类型的成员绑定.
        /// </summary>
        public Binding.ClassDecl DoReflectBind(Binding.TypeRegister register, Module.ProxyModuleRegister proxyModuleRegister)
        {
            var typeDB = register.GetTypeDB();
            var dynamicType = typeDB.CreateFreeDynamicType(type);

            Binding.ClassDecl cls;

            if (transform.csConstructorOverride != null)
            {
                cls = register.CreateClass(type.Name, type, transform.csConstructorOverride);
            }
            else
            {
                var dynamicConstructor = default(Binding.IDynamicMethod);

                if (crossbind)
                {
                    dynamicConstructor = new Binding.DynamicCrossBindConstructor();
                }
                else
                {
                    if (constructors.count > 0)
                    {
                        var dynamicCtorGroup = new Binding.DynamicMethods(dynamicType, "constructor", 1);
                        foreach (var variant in constructors.variants)
                        {
                            foreach (var methodBind in variant.Value.plainMethods)
                            {
                                var dynamicCtor = new Binding.DynamicConstructor(dynamicType, methodBind.method, this.disposable);

                                dynamicCtorGroup.Add(dynamicCtor);
                            }
                        }
                        dynamicConstructor = dynamicCtorGroup;
                    }
                    else
                    {
                        // struct 默认无参构造
                        dynamicConstructor = new Binding.DynamicDefaultConstructor(dynamicType);
                    }
                }
                cls = register.CreateClass(type.Name, type, dynamicConstructor);
            }

            foreach (var pair in staticMethods)
            {
                var methodBindingInfo = pair.Value;
                var methodJSName = methodBindingInfo.jsName;
                var jscOverride = transform.GetCSMethodOverrideBinding(methodJSName);

                if (jscOverride != null)
                {
                    cls.AddMethod(true, methodJSName, jscOverride);
                }
                else if (methodBindingInfo._cfunc != null)
                {
                    var dynamicMethod = new Binding.DynamicPrimitiveMethod(dynamicType, methodBindingInfo._cfunc);
                    cls.AddMethod(true, methodJSName, dynamicMethod);
                }
                else
                {
                    var methodGroup = new Binding.DynamicMethods(dynamicType, methodJSName, 0);

                    foreach (var variantKV in methodBindingInfo.variants)
                    {
                        var expectedArgCount = variantKV.Key;
                        var variant = variantKV.Value;

                        foreach (var mb in variant.plainMethods)
                        {
                            var dynamicMethod = Binding.DynamicMethodFactory.CreateMethod(dynamicType, mb.method, mb.isExtension);
                            methodGroup.Add(dynamicMethod);
                        }

                        foreach (var mb in variant.varargMethods)
                        {
                            var dynamicMethod = Binding.DynamicMethodFactory.CreateMethod(dynamicType, mb.method, mb.isExtension);
                            methodGroup.Add(dynamicMethod);
                        }
                    }

                    cls.AddMethod(true, methodJSName, methodGroup);
                }
            }

            foreach (var pair in methods)
            {
                var methodBindingInfo = pair.Value;
                var methodJSName = methodBindingInfo.jsName;
                var jscOverride = transform.GetCSMethodOverrideBinding(methodJSName);

                if (jscOverride != null)
                {
                    cls.AddMethod(false, methodJSName, jscOverride);
                }
                else
                {
                    var methodGroup = new Binding.DynamicMethods(dynamicType, methodJSName, 0);

                    foreach (var variantKV in methodBindingInfo.variants)
                    {
                        var expectedArgCount = variantKV.Key;
                        var variant = variantKV.Value;

                        foreach (var mb in variant.plainMethods)
                        {
                            var dynamicMethod = Binding.DynamicMethodFactory.CreateMethod(dynamicType, mb.method, mb.isExtension);
                            methodGroup.Add(dynamicMethod);
                        }

                        foreach (var mb in variant.varargMethods)
                        {
                            var dynamicMethod = Binding.DynamicMethodFactory.CreateMethod(dynamicType, mb.method, mb.isExtension);
                            methodGroup.Add(dynamicMethod);
                        }
                    }

                    cls.AddMethod(false, methodJSName, methodGroup);
                }
            }

            foreach (var pair in properties)
            {
                var propertyBindingInfo = pair.Value;
                var isStatic = propertyBindingInfo.isStatic;
                var tsPropertyVar = this.bindingManager.GetTSVariable(propertyBindingInfo.regName);
                var dynamicProperty = new Binding.DynamicProperty(dynamicType, propertyBindingInfo.propertyInfo);

                cls.AddField(isStatic, propertyBindingInfo.regName, dynamicProperty);
            }

            foreach (var pair in fields)
            {
                var fieldBindingInfo = pair.Value;
                var isStatic = fieldBindingInfo.isStatic;
                var tsPropertyVar = this.bindingManager.GetTSVariable(fieldBindingInfo.regName);
                var dynamicField = new Binding.DynamicField(dynamicType, fieldBindingInfo.fieldInfo);

                cls.AddField(isStatic, fieldBindingInfo.regName, dynamicField);
            }

            // 注册事件
            foreach (var pair in events)
            {
                var eventBindingInfo = pair.Value;
                var tsDelegateVar = this.bindingManager.GetTSVariable(eventBindingInfo.regName);
                var dynamicMethod = new Binding.DynamicEventDelegateOp(dynamicType, eventBindingInfo.eventInfo, tsDelegateVar);

                cls.AddMethod(eventBindingInfo.isStatic, tsDelegateVar, dynamicMethod);
            }

            // 注册委托
            foreach (var pair in delegates)
            {
                var delegateBindingInfo = pair.Value;
                var tsDelegateVar = this.bindingManager.GetTSVariable(delegateBindingInfo.regName);
                Binding.IDynamicMethod dynamicMethod = null;

                if (delegateBindingInfo.isField)
                {
                    dynamicMethod = new Binding.DynamicFieldDelegateOp(dynamicType, (FieldInfo)delegateBindingInfo.fieldOrPropertyInfo, tsDelegateVar);
                }
                else
                {
                    dynamicMethod = new Binding.DynamicPropertyDelegateOp(dynamicType, (PropertyInfo)delegateBindingInfo.fieldOrPropertyInfo, tsDelegateVar);
                }

                cls.AddMethod(delegateBindingInfo.isStatic, tsDelegateVar, dynamicMethod);
            }

            // 注册运算符
            if (Native.JSApi.JS_ATOM_Operators.IsValid)
            {
                if (operators.Count > 0)
                {
                    //TODO: 目前运算符必须在同一个 TypeRegister 实例中注册
                    // proxyModuleRegister.MarkAsCritical();
                }

                foreach (var operatorBindingInfo in operators)
                {
                    var dynamicMethod = Binding.DynamicMethodFactory.CreateMethod(dynamicType, operatorBindingInfo.methodInfo, operatorBindingInfo.isExtension);
                    var regName = operatorBindingInfo.jsName;
                    var parameters = operatorBindingInfo.methodInfo.GetParameters();
                    var declaringType = operatorBindingInfo.methodInfo.DeclaringType;

                    do
                    {
                        if (parameters.Length == 2)
                        {
                            if (parameters[0].ParameterType != declaringType)
                            {
                                var leftType = parameters[0].ParameterType;
                                cls.AddLeftOperator(regName, dynamicMethod, leftType);
                                break;
                            }
                            else if (parameters[1].ParameterType != declaringType)
                            {
                                var rightType = parameters[1].ParameterType;
                                cls.AddRightOperator(regName, dynamicMethod, rightType);
                                break;
                            }
                        }

                        cls.AddSelfOperator(regName, dynamicMethod);
                    } while (false);
                }
            }

            return cls;
        }
    }
}