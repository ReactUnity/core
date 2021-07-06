using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Helpers
{
    [System.Serializable]
    public class StringObjectPair
    {
        public string Key;
        public Object Value;
    }

    [System.Serializable]
    public class SerializableDictionary : EventDictionary<Object>, ISerializationCallbackReceiver
    {
        [SerializeField] List<StringObjectPair> Entries = new List<StringObjectPair>();

        internal event System.Action<SerializableDictionary> reserialized;

        public Object GetValueOrDefault(string key)
        {
            if (!TryGetValue(key, out var value)) value = default;
            return value;
        }

        public void OnAfterDeserialize()
        {
            ClearWithoutNotify();
            foreach (var entry in Entries)
            {
                var key = entry.Key;
                while (ContainsKey(key)) key += "_Copy";
                SetWithoutNotify(key, entry.Value);
            }
            Reserialize();
        }

        public void OnBeforeSerialize()
        {
            Entries = this.Select(x => new StringObjectPair() { Key = x.Key, Value = x.Value }).ToList();
        }

        public System.Action AddReserializeListener(System.Action<SerializableDictionary> callback)
        {
            reserialized += callback;
            return () => reserialized -= callback;
        }

        protected void Reserialize()
        {
            reserialized?.Invoke(this);
        }
    }
}
