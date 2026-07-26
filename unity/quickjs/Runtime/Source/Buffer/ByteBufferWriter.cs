using System;
using System.IO;

namespace QuickJS.IO
{
    public class ByteBufferWriter : Stream
    {
        private ByteBuffer _byteBuffer;

        public ByteBufferWriter(ByteBuffer byteBuffer)
        {
            _byteBuffer = byteBuffer;
        }

        public override bool CanWrite { get { return true; } }

        public override bool CanSeek { get { return true; } }

        public override bool CanRead { get { return false; } }

        public override long Position
        {
            get { return _byteBuffer.writerIndex; }
            set { _byteBuffer.writerIndex = (int)value; }
        }
        public override long Length { get { return _byteBuffer.writerIndex; } }

        public override void Flush() { }

        public override int Read(byte[] buffer, int offset, int count)
        {
            throw new NotSupportedException();
        }

        public override int ReadByte()
        {
            throw new NotSupportedException();
        }

        public override long Seek(long offset, System.IO.SeekOrigin loc)
        {
            switch (loc)
            {
                case SeekOrigin.Begin: _byteBuffer.writerIndex = (int)offset; return _byteBuffer.writerIndex;
                case SeekOrigin.Current: _byteBuffer.writerIndex += (int)offset; return _byteBuffer.writerIndex;
                default: _byteBuffer.writerIndex -= (int)offset; return _byteBuffer.writerIndex;
            }
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override void Write(byte[] src, int srcOffset, int count)
        {
            _byteBuffer.WriteBytes(src, srcOffset, count);
        }

        public override void WriteByte(byte value)
        {
            _byteBuffer.WriteByte(value);
        }

        protected override void Dispose(bool disposing)
        {
        }

    }
}
