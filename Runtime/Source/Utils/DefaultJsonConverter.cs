using System;

namespace QuickJS.Utils
{
    public class DefaultJsonConverter : IJsonConverter
    {
        public object Deserialize(string json, Type type)
        {
            // Unity's own JsonUtility from 2019.1 on, System.Text.Json before that
#if !UNITY_2019_1_OR_NEWER
#if JSB_COMPATIBLE
            throw new NotImplementedException();
#else
            return System.Text.Json.JsonSerializer.Deserialize(json, type);
#endif
#else
            return UnityEngine.JsonUtility.FromJson(json, type);
#endif
        }

        public string Serialize(object obj, bool prettyPrint)
        {
#if !UNITY_2019_1_OR_NEWER
#if JSB_COMPATIBLE
            throw new NotImplementedException();
#else
            return System.Text.Json.JsonSerializer.Serialize(obj);
#endif
#else
            return UnityEngine.JsonUtility.ToJson(obj, true);
#endif
        }
    }
}
