#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using System.Collections.Generic;
using System.Linq;
using ReactUnity.Reactive;
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
    public class SerializableDictionary : ReactiveObjectRecord, ISerializationCallbackReceiver
    {
        [SerializeField] List<StringObjectPair> Entries = new List<StringObjectPair>();

        internal event System.Action<SerializableDictionary> reserialized;

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
            Entries = this
                .Where(x => x.Value is Object)
                .Select(x => new StringObjectPair() { Key = x.Key, Value = x.Value as Object })
                .ToList();
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
