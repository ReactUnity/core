using UnityEngine;

namespace ReactUnity.DomProxies
{
    public class LocalStorage
    {
        public LocalStorage()
        {
        }

        public void setItem(string x, string value)
        {
            PlayerPrefs.SetString(x, value);
        }

        public string getItem(string x)
        {
            return PlayerPrefs.GetString(x, "");
        }

        public void removeItem(string x)
        {
            PlayerPrefs.DeleteKey(x);
        }
    }
}
