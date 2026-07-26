using System.Collections.Generic;
using System.Threading;

namespace QuickJS.IO
{
    // 简易的 ByteBuffer 池分配器
    // 仅保证分配与回收的线程安全, 不保证数据读写的线程安全
    public class ByteBufferThreadedPooledAllocator : IByteBufferAllocator
    {
        private int _maxCapacity;
        private List<ByteBuffer> __freelist;

        public ByteBufferThreadedPooledAllocator()
        : this(2, 1024, int.MaxValue)
        {
        }

        // 预分配缓冲池
        public ByteBufferThreadedPooledAllocator(int prealloc, int initialCapacity, int maxCapacity)
        {
            _maxCapacity = maxCapacity;
            __freelist = new List<ByteBuffer>(prealloc);
            while (prealloc-- > 0)
            {
                __freelist.Add(new ByteBuffer(initialCapacity, maxCapacity, this));
            }
        }

        // 返回一个由对象池分配的 ByteBuffer 对象, 大小至少为 size
        public ByteBuffer Alloc(int size)
        {
            lock (this)
            {
                var count = __freelist.Count;
                if (count > 0)
                {
                    var free = __freelist[count - 1];
                    __freelist.RemoveAt(count - 1);
                    free.Retain();
                    return free;
                }
                return new ByteBuffer(size, _maxCapacity, this).Retain();
            }
        }

        public void Recycle(ByteBuffer byteBuffer)
        {
            lock (this)
            {
                __freelist.Add(byteBuffer);
            }
        }
    }
}
