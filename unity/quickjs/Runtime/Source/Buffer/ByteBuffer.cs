using System;
using System.Net;

namespace QuickJS.IO
{
    // 容量会自动扩展 (翻倍)
    // 所有操作都不是线程安全的
    public class ByteBuffer : Utils.IReferenceObject
    {
        private IByteBufferAllocator _allocator;

        private int _refCount = 0;
        private byte[] _data;

        private int _writePosition;  // 写入操作当前位置
        private int _readPosition;  // 当前观察位置 （网络数据写入时会用到）
        private int _maxCapacity;

        // 内部数据
        public byte[] data { get { return _data; } }

        public int capacity { get { return _data.Length; } }

        public int writerIndex
        {
            get { return _writePosition; }
            set
            {
                if (_writePosition != value)
                {
                    if (value < 0 || value > _maxCapacity)
                    {
                        throw new IndexOutOfRangeException();
                    }
                    EnsureCapacity(value);
                    _writePosition = value;
                }
            }
        }

        // 剩余可以读取的字节数量
        public int readableBytes { get { return _writePosition - _readPosition; } }

        public int readerIndex
        {
            get { return _readPosition; }
            set
            {
                if (_readPosition != value)
                {
                    if (value < 0 || value > _writePosition)
                    {
                        throw new IndexOutOfRangeException();
                    }
                    _readPosition = value;
                }
            }
        }

        public int maxCapacity { get { return _maxCapacity; } }

        public bool isWritable
        {
            get { return _writePosition < _maxCapacity; }
        }

        public override string ToString()
        {
            return string.Format("<ByteBuffer offset: {0} remain: {1} #{2}>", readerIndex, readableBytes, _data.Length);
        }

        public ByteBuffer(byte[] data) : this(data, int.MaxValue)
        {
        }

        public ByteBuffer(byte[] data, int maxCapacity)
        {
            _data = data;
            _writePosition = _data != null ? _data.Length : 0;
            _maxCapacity = maxCapacity > _writePosition ? maxCapacity : _writePosition;
            _readPosition = 0;
            _allocator = null;
        }

        public ByteBuffer(int initialCapacity, int maxCapacity, IByteBufferAllocator allocator)
        {
            _data = new byte[initialCapacity];
            _maxCapacity = maxCapacity > initialCapacity ? maxCapacity : initialCapacity;
            _writePosition = 0;
            _readPosition = 0;
            _allocator = allocator;
        }

        public void Release()
        {
            --_refCount;
            if (_refCount == 0)
            {
                _writePosition = 0;
                _readPosition = 0;
                if (_allocator != null)
                {
                    // Debug.LogFormat("<< ByteBuffer released {0}", GetHashCode());
                    _allocator.Recycle(this);
                }
            }
        }

        public ByteBuffer Retain()
        {
            //         #if DEBUG
            // if (_refCount == 0)
            // {
            //     if (_allocator != null)
            //     {
            //         var stackTrace = new System.Diagnostics.StackTrace(true);
            //         string debugInfo = "";
            //         for (var i = 0; i < stackTrace.FrameCount; i++)
            //         {
            //             var stackFrame = stackTrace.GetFrame(i);
            //             debugInfo += string.Format("[{0}] Method: {1}\n", i, stackFrame.GetMethod());
            //             debugInfo += string.Format("[{0}] Line Number: {1}\n", i, stackFrame.GetFileLineNumber());
            //         }
            //         _stacktrace = debugInfo;
            //     }
            //     // Debug.LogFormat(">> ByteBuffer allocated {0}", GetHashCode());
            // }
            //         #endif
            ++_refCount;
            return this;
        }

        public ByteBuffer Slice(int size)
        {
            CheckReadalbe(size);
            var slice = new ByteBuffer(data, data.Length).Retain();
            slice._writePosition = this._readPosition + size;
            slice._readPosition = this._readPosition;
            this._readPosition += size;
            return slice;
        }

        #region reader operations

        public void CheckReadalbe(int size)
        {
            if (readableBytes < size)
            {
                throw new IndexOutOfRangeException(string.Format("readableBytes {0} size {1}", readableBytes, size));
            }
        }

        // 跳过指定的字节数量
        public void ReadBytes(int count)
        {
            CheckReadalbe(count);
            _readPosition += count;
        }

        public byte ReadUByte()
        {
            CheckReadalbe(sizeof(byte));
            var v = _data[_readPosition];
            _readPosition += sizeof(byte);
            return v;
        }

        public sbyte ReadSByte()
        {
            CheckReadalbe(sizeof(sbyte));
            var v = _data[_readPosition];
            _readPosition += sizeof(sbyte);
            return (sbyte)v;
        }

        public int ReadBytes(byte[] dst, int dstOffset, int size)
        {
            // CheckReadalbe(1);
            if (size > readableBytes)
            {
                size = readableBytes;
            }

            if (size > 0)
            {
                Buffer.BlockCopy(_data, _readPosition, dst, dstOffset, size);
                _readPosition += size;
            }

            return size;
        }

        // dangerous: read bytes to destination pointer
        public int ReadBytes(IntPtr pointer, int size)
        {
            // CheckReadalbe(1);
            if (size > readableBytes)
            {
                size = readableBytes;
            }

            if (size > 0)
            {
                System.Runtime.InteropServices.Marshal.Copy(_data, _readPosition, pointer, size);
                _readPosition += size;
            }

            return size;
        }

        public bool ReadBoolean()
        {
            CheckReadalbe(sizeof(bool));
            var v = BitConverter.ToBoolean(_data, _readPosition);
            _readPosition += sizeof(bool);
            return v;
        }

        // 读取所有可读取的字节并返回
        public byte[] ReadAllBytes()
        {
            if (readableBytes == 0)
            {
                return null;
            }
            var bytes = new byte[readableBytes];
            Buffer.BlockCopy(_data, _readPosition, bytes, 0, readableBytes);
            _readPosition += readableBytes;
            return bytes;
        }

        // dangerous: read all bytes to destination pointer
        public int ReadAllBytes(IntPtr pointer)
        {
            var size = readableBytes;
            if (size == 0)
            {
                return size;
            }
            System.Runtime.InteropServices.Marshal.Copy(_data, _readPosition, pointer, size);
            _readPosition += size;
            return size;
        }

        public float ReadSingle()
        {
            CheckReadalbe(sizeof(float));
            var v = BitConverter.ToSingle(_data, _readPosition);
            _readPosition += sizeof(float);
            return v;
        }

        public double ReadDouble()
        {
            CheckReadalbe(sizeof(double));
            var v = BitConverter.ToDouble(_data, _readPosition);
            _readPosition += sizeof(double);
            return v;
        }

        public string ReadString()
        {
            var length = ReadInt32();
            if (length == 0)
            {
                return string.Empty;
            }

            var bytes = new byte[length];
            ReadBytes(bytes, 0, length);
            return System.Text.Encoding.UTF8.GetString(bytes);
        }

        public short ReadInt16()
        {
            CheckReadalbe(sizeof(short));
            var v = IPAddress.NetworkToHostOrder(BitConverter.ToInt16(_data, _readPosition));
            _readPosition += sizeof(short);
            return v;
        }

        public ushort ReadUInt16()
        {
            CheckReadalbe(sizeof(ushort));
            var v = (ushort)IPAddress.NetworkToHostOrder(BitConverter.ToInt16(_data, _readPosition));
            _readPosition += sizeof(ushort);
            return v;
        }

        public int ReadInt32()
        {
            CheckReadalbe(sizeof(int));
            var v = IPAddress.NetworkToHostOrder(BitConverter.ToInt32(_data, _readPosition));
            _readPosition += sizeof(int);
            return v;
        }

        public uint ReadUInt32()
        {
            CheckReadalbe(sizeof(uint));
            var v = (uint)IPAddress.NetworkToHostOrder(BitConverter.ToInt32(_data, _readPosition));
            _readPosition += sizeof(uint);
            return v;
        }

        public long ReadInt64()
        {
            CheckReadalbe(sizeof(long));
            var v = System.Net.IPAddress.NetworkToHostOrder(BitConverter.ToInt64(_data, _readPosition));
            _readPosition += sizeof(long);
            return v;
        }

        public ulong ReadUInt64()
        {
            CheckReadalbe(sizeof(ulong));
            var v = (ulong)System.Net.IPAddress.NetworkToHostOrder(BitConverter.ToInt64(_data, _readPosition));
            _readPosition += sizeof(long);
            return v;
        }

        #endregion

        #region writer operations

        // 确保容量达到value值，不够时自动扩容 (*2)
        public void EnsureCapacity(int value)
        {
            var capacity = _data.Length;
            if (value > capacity)
            {
                var newCapacity = value;
                if (newCapacity < 256)
                {
                    newCapacity = 256;
                }
                if (newCapacity < capacity * 2)
                {
                    newCapacity = capacity * 2;
                }
                if (newCapacity > _maxCapacity)
                {
                    throw new IndexOutOfRangeException();
                }
                Array.Resize(ref _data, newCapacity);
            }
        }

        public void WriteByte(byte data)
        {
            EnsureCapacity(_writePosition + sizeof(byte));
            _data[_writePosition] = (byte)data;
            _writePosition += sizeof(byte);
        }

        public void WriteSByte(sbyte data)
        {
            EnsureCapacity(_writePosition + sizeof(byte));
            _data[_writePosition] = (byte)data;
            _writePosition += sizeof(byte);
        }

        public void _SetPosition(int size)
        {
            EnsureCapacity(_writePosition + size);
            _writePosition += size;
        }

        public void WriteBytes(System.IO.MemoryStream memoryStream, int size)
        {
            if (size > 0)
            {
                EnsureCapacity(_writePosition + size);
                memoryStream.Read(_data, _writePosition, size);
                _writePosition += size;
            }
        }

        public void WriteBytes(IntPtr pointer, int size)
        {
            if (size > 0)
            {
                EnsureCapacity(_writePosition + size);
                System.Runtime.InteropServices.Marshal.Copy(pointer, _data, _writePosition, size);
                _writePosition += size;
            }
        }

        // 将 other 中所有可读取的字节写入当前 buffer 中
        public void WriteBytes(ByteBuffer other)
        {
            if (other == null || other.readableBytes == 0)
            {
                return;
            }
            else
            {
                EnsureCapacity(_writePosition + other.readableBytes);
                Buffer.BlockCopy(other._data, other.readerIndex, _data, _writePosition, other.readableBytes);
                _writePosition += other.readableBytes;
            }
        }

        // 写入位置后移指定字节数 (内容不确定)
        public void WriteBytes(int byteCount)
        {
            EnsureCapacity(_writePosition + byteCount);
            _writePosition += byteCount;
        }

        public void WriteBytes(byte[] data)
        {
            EnsureCapacity(_writePosition + data.Length);
            Buffer.BlockCopy(data, 0, _data, _writePosition, data.Length);
            _writePosition += data.Length;
        }

        public void WriteBytes(byte[] src, int srcOffset, int count)
        {
            EnsureCapacity(_writePosition + count);
            Buffer.BlockCopy(src, srcOffset, _data, _writePosition, count);
            _writePosition += count;
        }

        public void WriteBoolean(bool value)
        {
            WriteBytes(BitConverter.GetBytes(value));
        }

        public void WriteInt16(short value)
        {
            WriteBytes(BitConverter.GetBytes(IPAddress.HostToNetworkOrder(value)));
        }

        public void WriteUInt16(ushort value)
        {
            WriteBytes(BitConverter.GetBytes(IPAddress.HostToNetworkOrder((short)value)));
        }

        public void WriteInt32(int value)
        {
            WriteBytes(BitConverter.GetBytes(IPAddress.HostToNetworkOrder(value)));
        }

        public void WriteUInt32(uint value)
        {
            WriteBytes(BitConverter.GetBytes(IPAddress.HostToNetworkOrder((int)value)));
        }

        public void WriteInt64(long value)
        {
            var data = BitConverter.GetBytes(System.Net.IPAddress.HostToNetworkOrder(value));
            WriteBytes(data);
        }

        public void WriteUInt64(ulong value)
        {
            var data = BitConverter.GetBytes(System.Net.IPAddress.HostToNetworkOrder((long)value));
            WriteBytes(data);
        }

        public void WriteSingle(float value)
        {
            WriteBytes(BitConverter.GetBytes(value));
        }

        public void WriteDouble(double value)
        {
            WriteBytes(BitConverter.GetBytes(value));
        }

        public void WriteString(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                WriteInt32(0);
            }
            else
            {
                var bytes = System.Text.Encoding.UTF8.GetBytes(value);
                WriteInt32(bytes.Length);
                WriteBytes(bytes);
            }
        }

        #endregion
    }
}
