using System.Collections.Generic;
using QuickJS.Native;

namespace QuickJS.Utils
{
    /// <summary>
    /// a cache for JSAtom (preventing repeatedly gc alloc of string => bytes convertion)
    /// </summary>
    public class AtomCache
    {
        private JSContext _ctx;
        private Dictionary<string, JSAtom> _atoms = new Dictionary<string, JSAtom>();

        public AtomCache(JSContext ctx)
        {
            _ctx = ctx;
        }

        public unsafe JSAtom GetAtom(string name)
        {
            JSAtom atom;
            if (!_atoms.TryGetValue(name, out atom))
            {
                var bytes = TextUtils.GetNullTerminatedBytes(name);
                fixed (byte* ptr = bytes)
                {
                    atom = JSApi.JS_NewAtomLen(_ctx, ptr, bytes.Length - 1);
                }

                _atoms[name] = atom;
            }

            return atom;
        }

        /// <summary>
        /// Clear the atom cache. It's safe to clear the cache for memory shrinking, the atom will be re-cached at next GetAtom() call.
        /// </summary>
        public void Clear()
        {
            foreach (var kv in _atoms)
            {
                var atom = kv.Value;
                JSApi.JS_FreeAtom(_ctx, atom);
            }

            _atoms.Clear();
        }

    }
}
