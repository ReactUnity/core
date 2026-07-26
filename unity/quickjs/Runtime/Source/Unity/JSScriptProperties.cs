#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;

    [Serializable]
    public class JSScriptProperties
    {
        [SerializeField]
        private List<Object> _referencedObjects;

        [SerializeField]
        public byte[] genericValueData;

        [SerializeField]
        public int dataFormat = -1;

        public bool IsEmpty
        {
            get { return GenericCount == 0; }
        }

        public int ReferencedObjectCount => _referencedObjects != null ? _referencedObjects.Count : 0;

        public int GenericCount => genericValueData != null ? genericValueData.Length : 0;

        public int AddReferencedObject(Object value)
        {
            if (_referencedObjects == null)
            {
                _referencedObjects = new List<Object>();
                _referencedObjects.Add(value);
                return 0;
            }
            var count = _referencedObjects.Count;
            for (var i = 0; i < count; ++i)
            {
                var item = _referencedObjects[i];
                if (item == value)
                {
                    return i;
                }
            }
            _referencedObjects.Add(value);
            return count;
        }

        public Object GetReferencedObject(int index)
        {
            if (_referencedObjects != null && index >= 0 && index < _referencedObjects.Count)
            {
                return _referencedObjects[index];
            }
            return null;
        }

        public void SetGenericValue(IO.ByteBuffer buffer)
        {
            if (buffer != null && buffer.readableBytes > 0)
            {
                if (genericValueData == null)
                {
                    genericValueData = new byte[buffer.readableBytes];
                    buffer.ReadBytes(genericValueData, 0, buffer.readableBytes);
                }
                else
                {
                    if (genericValueData.Length != buffer.readableBytes)
                    {
                        Array.Resize(ref genericValueData, buffer.readableBytes);
                    }
                    buffer.ReadBytes(genericValueData, 0, buffer.readableBytes);
                }
            }
            else
            {
                genericValueData = null;
            }
        }

        public void Clear()
        {
            _referencedObjects?.Clear();
        }
    }
}
#endif
