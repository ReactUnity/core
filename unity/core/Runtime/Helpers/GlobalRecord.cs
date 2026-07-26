using System;
using ReactUnity.Reactive;

namespace ReactUnity.Helpers
{
    public class GlobalRecord : ReactiveObjectRecord
    {
        private Action removeStringDictionaryListener;

        public GlobalRecord() { }

        public void BindSerializableDictionary(SerializableDictionary dict, bool isSerializing)
        {
            removeStringDictionaryListener?.Invoke();
            removeStringDictionaryListener = null;

            if (dict == null) return;

            UpdateStringObjectDictionary(dict, isSerializing);

            removeStringDictionaryListener = dict.AddListener((key, value, dc) => {
                if (key != null) this[key] = value;
                else UpdateStringObjectDictionary(dc as ReactiveRecord<object>, false);
            });

            dict.AddReserializeListener((dc) => {
                UpdateStringObjectDictionary(dc, true);
            });
        }


        public void UpdateStringObjectDictionary(ReactiveRecord<object> dict, bool isSerializing)
        {
            foreach (var entry in dict)
            {
                if (entry.Value == null) RemoveWithoutNotify(entry.Key);
                else SetWithoutNotify(entry.Key, entry.Value);
            }

            if (!isSerializing) Change(null, default);
        }
    }

}
