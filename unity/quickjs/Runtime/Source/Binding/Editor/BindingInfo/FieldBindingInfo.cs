using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public class FieldBindingInfo
    {
        public string getterName = null; // 绑定代码名
        public string setterName = null;
        public string regName = null; // js 注册名

        public FieldInfo fieldInfo;

        public string constantValue;

        public bool isStatic => fieldInfo.IsStatic;

        public Type fieldType => fieldInfo.FieldType;

        public FieldBindingInfo(TypeBindingInfo typeBindingInfo, FieldInfo fieldInfo)
        {
            do
            {
                if (fieldInfo.IsLiteral)
                {
                    try
                    {
                        var cv = fieldInfo.GetRawConstantValue();
                        var cvType = cv.GetType();
                        if (cvType == typeof(string))
                        {
                            constantValue = $"\"{cv}\"";
                            break;
                        }

                        if (cvType == typeof(int)
                            || cvType == typeof(uint)
                            || cvType == typeof(byte)
                            || cvType == typeof(sbyte)
                            || cvType == typeof(short)
                            || cvType == typeof(ushort)
                            || cvType == typeof(bool))
                        {
                            constantValue = $"{cv}";
                            break;
                        }

                        if (cvType == typeof(float))
                        {
                            var fcv = (float)cv;
                            if (!float.IsInfinity(fcv)
                                && !float.IsNaN(fcv))
                            {
                                constantValue = $"{cv}";
                                break;
                            }
                        }

                        // if (cvType.IsPrimitive && cvType.IsValueType)
                        // {
                        //     constantValue = $"{cv}";
                        //     break;
                        // }
                    }
                    catch (Exception)
                    {
                    }
                }

                if (fieldInfo.IsStatic)
                {
                    this.getterName = "BindStaticRead_" + fieldInfo.Name;
                    if (!fieldInfo.IsInitOnly && !fieldInfo.IsLiteral)
                    {
                        this.setterName = "BindStaticWrite_" + fieldInfo.Name;
                    }
                }
                else
                {
                    this.getterName = "BindRead_" + fieldInfo.Name;
                    if (!fieldInfo.IsInitOnly && !fieldInfo.IsLiteral)
                    {
                        this.setterName = "BindWrite_" + fieldInfo.Name;
                    }
                }
            } while (false);

            this.regName = typeBindingInfo.bindingManager.GetNamingAttribute(typeBindingInfo.transform, fieldInfo);
            this.fieldInfo = fieldInfo;
        }
    }
}