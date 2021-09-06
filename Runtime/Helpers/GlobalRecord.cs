using ReactUnity.Scheduling;

namespace ReactUnity.Helpers
{
    public class GlobalRecord : WatchableObjectRecord
    {
        private System.Action removeStringDictionaryListener;
        private IDispatcher dispatcher;

        public GlobalRecord() { }

        public static GlobalRecord BindSerializableDictionary(SerializableDictionary dict, IDispatcher dispatcher, bool isSerializing)
        {
            var res = new GlobalRecord();
            res.dispatcher = dispatcher;
            res.BindSerializableDictionary(dict, isSerializing);
            return res;
        }

        public void BindSerializableDictionary(SerializableDictionary dict, bool isSerializing)
        {
            removeStringDictionaryListener?.Invoke();
            removeStringDictionaryListener = null;

            UpdateStringObjectDictionary(dict, isSerializing);

            removeStringDictionaryListener = dict.AddListener((key, value, dc) => {
                if (key != null) this[key] = value;
                else UpdateStringObjectDictionary(dc as WatchableRecord<object>, false);
            });

            dict.AddReserializeListener((dc) => {
                UpdateStringObjectDictionary(dc, true);
            });
        }


        public void UpdateStringObjectDictionary(WatchableRecord<object> dict, bool isSerializing)
        {
            ClearWithoutNotify();
            foreach (var entry in dict)
            {
                SetWithoutNotify(entry.Key, entry.Value);
            }

            if (!isSerializing) Change(null, default);
            else if (dispatcher != null)
                dispatcher.OnceUpdate(() => Change(null, default));
        }
    }

}
