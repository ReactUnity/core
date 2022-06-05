using System;

namespace QuickJS.Utils
{
    public interface IJsonConverter
    {
        string Serialize(object obj, bool prettyPrint);
        object Deserialize(string json, Type type);
    }
}
