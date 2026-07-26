using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;
using System.IO;

namespace QuickJS.Binding
{
    public partial class CodeGenerator
    {
        private Dictionary<Assembly, DocResolver> _resolvers = new Dictionary<Assembly, DocResolver>();

        public DocResolver GetResolver(Assembly assembly)
        {
            DocResolver resolver;
            if (!_resolvers.TryGetValue(assembly, out resolver))
            {
                resolver = _resolvers[assembly] = new DocResolver();
                if (!LoadXmlDocFrom(resolver, assembly.Location))
                {
                    var fi = new FileInfo(assembly.Location);
                    LoadXmlDocFrom(resolver, Path.Combine(bindingManager.prefs.xmlDocDir, fi.Name));
                }
            }
            return resolver;
        }

        public bool LoadXmlDocFrom(DocResolver resolver, string location)
        {
            try
            {
                var ext = Path.GetExtension(location);
                var xmlFilePath = location.Substring(0, location.Length - ext.Length) + ".xml";

                return resolver.ParseXml(xmlFilePath);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public DocResolver.DocBody GetDocBody(Type type)
        {
            return GetResolver(type.Assembly).GetDocBody(type);
        }

        public DocResolver.DocBody GetDocBody<T>(T methodBase)
        where T : MethodBase
        {
            return GetResolver(methodBase.DeclaringType.Assembly).GetDocBody(methodBase);
        }

        public DocResolver.DocBody GetDocBody(FieldInfo fieldInfo)
        {
            return GetResolver(fieldInfo.DeclaringType.Assembly).GetDocBody(fieldInfo);
        }

        public DocResolver.DocBody GetDocBody(PropertyInfo propertyInfo)
        {
            return GetResolver(propertyInfo.DeclaringType.Assembly).GetDocBody(propertyInfo);
        }

    }
}
