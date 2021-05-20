using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Helpers
{
    public class GlobalRecord : Dictionary<string, object>
    {
        public GlobalRecord() { }

        public GlobalRecord(IDictionary<string, object> dict) : base(dict)
        {
        }

        public static implicit operator GlobalRecord(StringObjectDictionary dict)
        {
            return new GlobalRecord(dict.ToDictionary(x => x.Key, x => x.Value as object));
        }
    };

    [System.Serializable]
    public class StringObjectPair
    {
        public string Key;
        public Object Value;
    }

    [System.Serializable]
    public class StringObjectDictionary : Dictionary<string, Object>, ISerializationCallbackReceiver
    {
        [SerializeField] List<StringObjectPair> Entries = new List<StringObjectPair>();

        public Object GetValueOrDefault(string key)
        {
            if (!TryGetValue(key, out var value)) value = default;
            return value;
        }

        public void OnAfterDeserialize()
        {
            Clear();
            foreach (var entry in Entries)
            {
                var key = entry.Key;
                while (ContainsKey(key)) key += "_Copy";
                this[key] = entry.Value;
            }
        }

        public void OnBeforeSerialize()
        {
            Entries = this.Select(x => new StringObjectPair() { Key = x.Key, Value = x.Value }).ToList();
        }
    }
}
