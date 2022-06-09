using System;
using System.Diagnostics.CodeAnalysis;

namespace ReactUnity.Helpers.TypescriptUtils
{
    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public sealed class TypescriptInclude : Attribute { }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public sealed class TypescriptExclude : Attribute { }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Interface, Inherited = false, AllowMultiple = false)]
    public sealed class TypescriptListInterfaces : Attribute { }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public sealed class TypescriptRemap : Attribute
    {
        public string FileName { get; }
        public string PropName { get; }

        public TypescriptRemap(string file, string prop)
        {
            FileName = file;
            PropName = prop;
        }
    }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public sealed class TypescriptRemapType : Attribute
    {
        public Type TargetType { get; }

        public TypescriptRemapType(Type targetType)
        {
            TargetType = targetType;
        }
    }
}
