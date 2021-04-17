using System;
using System.Diagnostics.CodeAnalysis;

namespace ReactUnity.Helpers.TypescriptUtils
{
    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    sealed class TypescriptInclude : Attribute { }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    sealed class TypescriptExclude : Attribute { }

    [ExcludeFromCodeCoverage]
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    sealed class TypescriptRemap : Attribute
    {
        public string FileName { get; }
        public string PropName { get; }

        public TypescriptRemap(string file, string prop)
        {
            FileName = file;
            PropName = prop;
        }
    }
}
