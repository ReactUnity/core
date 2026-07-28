using System;
using System.Collections.Generic;

namespace QuickJS.Binding
{
    public class TSModuleBindingInfo
    {
        public readonly string name;

        // entry-name => type list 
        // 嵌套类的 entry name 共用了外层类访问键
        private Dictionary<string, List<TypeBindingInfo>> _types = new Dictionary<string, List<TypeBindingInfo>>();

        public TSModuleBindingInfo(string name)
        {
            this.name = name;
        }

        public bool ContainsKey(string name)
        {
            return _types.ContainsKey(name);
        }

        public void Add(TypeBindingInfo typeBindingInfo)
        {
            var entryName = typeBindingInfo.tsTypeNaming.jsModuleAccess;
            List<TypeBindingInfo> list;
            if (!_types.TryGetValue(entryName, out list))
            {
                list = _types[entryName] = new List<TypeBindingInfo>();
            }

            list.Add(typeBindingInfo);
        }
    }
}
