using System;

namespace QuickJS.Utils
{
    public class DefaultJsonConverter : IJsonConverter
    {
        public object Deserialize(string json, Type type)
        {
            // If inside Unity, use Unity's JSON utility even if JSB_UNITYLESS is defined
#if JSB_UNITYLESS && !UNITY_2019_1_OR_NEWER
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
#if JSB_UNITYLESS && !UNITY_2019_1_OR_NEWER
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
