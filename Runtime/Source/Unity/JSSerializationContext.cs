#if !JSB_UNITYLESS
using System;

namespace QuickJS.Unity
{
    using UnityEngine;

    public class JSSerializationContext
    {
        private JSScriptProperties _properties;
        private Utils.AutoReleasePool _bufferPool = new Utils.AutoReleasePool();

        public int dataFormat
        {
            get { return _properties.dataFormat; }
            set { _properties.dataFormat = value; }
        }

        public JSSerializationContext(JSScriptProperties properties)
        {
            _properties = properties;
        }

        public int AddReferencedObject(Object value)
        {
            return _properties.AddReferencedObject(value);
        }

        public Object GetReferencedObject(int index)
        {
            return _properties.GetReferencedObject(index);
        }

        /// <summary>
        /// flush the data of byteBuffer into JSProperties.genericValueData
        /// </summary>
        public void Flush(IO.ByteBuffer byteBuffer)
        {
            _properties.SetGenericValue(byteBuffer);
        }

        /// <summary>
        /// allocate a new ByteBuffer from ScriptRuntime, it will autoreleased after serialization
        /// </summary>
        public IO.ByteBuffer AllocByteBuffer(ScriptRuntime runtime)
        {
            if (_bufferPool == null)
            {
                throw new ObjectDisposedException(this.GetType().Name);
            }
            var buffer = runtime.GetByteBufferAllocator().Alloc(64);
            _bufferPool.AutoRelease(buffer);
            return buffer;
        }

        public void Release()
        {
            _properties = null;
            _bufferPool.Drain();
            _bufferPool = null;
        }
    }
}
#endif
