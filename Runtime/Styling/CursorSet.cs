using System.Collections.Generic;
using System.Linq;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Styling
{
    [CreateAssetMenu(fileName = "CursorSet", menuName = "React Unity/Cursor Set", order = 1)]
    public class CursorSet : ScriptableObject
    {
        public string Name;
        public CursorRecord Cursors;
    }

    [System.Serializable]
    public class CursorPair
    {
        public string Name;
        public Texture2D Cursor;
        public Vector2 Hotspot;
    }

    [System.Serializable]
    public class CursorRecord : WatchableRecord<CursorPair>, ISerializationCallbackReceiver
    {
        [SerializeField] List<CursorPair> Entries = new List<CursorPair>();

        public void OnAfterDeserialize()
        {
            ClearWithoutNotify();
            foreach (var entry in Entries)
            {
                var key = entry.Name;
                while (ContainsKey(key)) key += "_Copy";
                SetWithoutNotify(key, entry);
            }
        }

        public void OnBeforeSerialize()
        {
            Entries = Values.ToList();
        }
    }
}
