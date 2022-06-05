using System;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    using int64_t = Int64;

    [StructLayout(LayoutKind.Sequential)]
    public struct JSMemoryUsage
    {
        public int64_t malloc_size, malloc_limit, memory_used_size;
        public int64_t malloc_count;
        public int64_t memory_used_count;
        public int64_t atom_count, atom_size;
        public int64_t str_count, str_size;
        public int64_t obj_count, obj_size;
        public int64_t prop_count, prop_size;
        public int64_t shape_count, shape_size;
        public int64_t js_func_count, js_func_size, js_func_code_size;
        public int64_t js_func_pc2line_count, js_func_pc2line_size;
        public int64_t c_func_count, array_count;
        public int64_t fast_array_count, fast_array_elements;
        public int64_t binary_object_count, binary_object_size;
    }
}
