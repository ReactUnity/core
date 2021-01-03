using UnityEngine;

namespace ReactUnity.DomProxies
{
    public class LocalStorage
    {
        public const string LocalStoragePrefix = "ReactUnity_LocalStorage_";

        public LocalStorage()
        {
        }

        public void setItem(string x, string value)
        {
            PlayerPrefs.SetString(LocalStoragePrefix + x, value);
        }

        public string getItem(string x)
        {
            return PlayerPrefs.GetString(LocalStoragePrefix + x, null);
        }

        public void removeItem(string x)
        {
            PlayerPrefs.DeleteKey(LocalStoragePrefix + x);
        }
    }
}
