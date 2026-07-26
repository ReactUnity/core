using System;
using System.IO;

namespace QuickJS.IO
{
    public class ByteBufferReader : System.IO.Stream
    {
        private ByteBuffer _byteBuffer;

        public ByteBufferReader(ByteBuffer byteBuffer)
        {
            _byteBuffer = byteBuffer;
        }

        public override bool CanWrite
        {
            get { return _byteBuffer.isWritable; }
        }

        public override bool CanSeek
        {
            get { return true; }
        }

        public override bool CanRead
        {
            get { return true; }
        }

        public override long Position
        {
            get { return _byteBuffer.readerIndex; }
            set { _byteBuffer.readerIndex = (int)value; }
        }
        public override long Length { get { return _byteBuffer.readableBytes; } }

        public override void Flush() { }

        public override int Read(byte[] buffer, int offset, int count)
        {
            return _byteBuffer.ReadBytes(buffer, offset, count);
        }
        public override int ReadByte()
        {
            return _byteBuffer.ReadUByte();
        }
        public override long Seek(long offset, SeekOrigin loc)
        {
            switch (loc)
            {
                case SeekOrigin.Begin: _byteBuffer.readerIndex = (int)offset; return _byteBuffer.readerIndex;
                case SeekOrigin.Current: _byteBuffer.readerIndex += (int)offset; return _byteBuffer.readerIndex;
                default: _byteBuffer.readerIndex -= (int)offset; return _byteBuffer.readerIndex;
            }
        }

        public override void SetLength(long value)
        {
            throw new NotSupportedException();
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            throw new NotSupportedException();
        }

        // public override void WriteByte(byte value);
        protected override void Dispose(bool disposing)
        {
        }
    }
}
