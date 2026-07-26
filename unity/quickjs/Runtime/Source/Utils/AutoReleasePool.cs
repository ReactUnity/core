using System.Collections.Generic;

namespace QuickJS.Utils
{
    public class AutoReleasePool
    {
        private List<IReferenceObject> _autoreleases = new List<IReferenceObject>();

        public void AutoRelease(IReferenceObject b)
        {
            _autoreleases.Add(b);
        }

        public void Drain()
        {
            var size = _autoreleases.Count;
            if (size > 0)
            {
                for (var i = 0; i < size; ++i)
                {
                    var b = _autoreleases[i];
                    b.Release();
                }
                _autoreleases.Clear();
            }
        }
    }
}
