using UnityEngine;

namespace ReactUnity.Types
{
    [System.Serializable]
    public class StringObjectDictionary : SerializableDictionary<string, Object>
    {
        public Object GetValueOrDefault(string key)
        {
            if (!TryGetValue(key, out var value)) value = default;
            return value;
        }

    }
}
