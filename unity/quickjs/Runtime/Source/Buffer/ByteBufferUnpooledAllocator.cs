using System.Collections.Generic;

namespace QuickJS.IO
{
    public class ByteBufferUnpooledAllocator : IByteBufferAllocator
    {
        // 返回一个 ByteBuffer 对象, 大小至少为 size
        public ByteBuffer Alloc(int size)
        {
            return new ByteBuffer(size, int.MaxValue, null);
        }

        public void Recycle(ByteBuffer byteBuffer)
        {
        }
    }
}
