using UnityEngine;

namespace ReactUnity.Scripting.DomProxies
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


#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Clear Local Storage", priority = 0)]
        public static void ClearLocalStorage()
        {
            PlayerPrefs.DeleteAll();
        }
#endif
    }
}
