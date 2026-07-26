using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    public static class PathUtils
    {
        public static string GetDirectoryName(string path)
        {
            return string.IsNullOrEmpty(path) ? path : System.IO.Path.GetDirectoryName(path).Replace('\\', '/');
        }

        public static string Combine(string path1, string path2)
        {
            return System.IO.Path.Combine(path1, path2).Replace('\\', '/');
        }

        public static string Combine(string path1, string path2, string path3)
        {
            return System.IO.Path.Combine(path1, path2, path3).Replace('\\', '/');
        }

        public static string Combine(params string[] paths)
        {
            return System.IO.Path.Combine(paths).Replace('\\', '/');
        }

        /// 展开路径中的 ./..
        public static string ExtractPath(string path, char sp)
        {
            var prefix = string.Empty;
            var pathRoot = System.IO.Path.GetPathRoot(path);
            if (pathRoot != string.Empty)
            {
                prefix = path.Substring(0, pathRoot.Length);
                path = path.Substring(pathRoot.Length);
            }

            var items = path.Split(sp);
            if (items.Length < 2)
            {
                return prefix + path;
            }

            var array = new List<string>(items.Length);
            for (var i = 0; i < items.Length; i++)
            {
                var item = items[i];
                switch (item)
                {
                    case ".": break;
                    case "..":
                    {
                        if (array.Count > 0 && array[array.Count - 1] != "..")
                        {
                            array.RemoveAt(array.Count - 1);
                        }
                        else
                        {
                            array.Add(item); 
                        }

                        break;
                    }
                    default:
                    {
                        array.Add(item);
                        break;
                    }
                }
            }

            return prefix + Combine(array.ToArray());
        }
    }
}
