using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    public interface IPathResolver
    {
        void AddSearchPath(string path);
        bool ResolvePath(IFileSystem fileSystem, string fileName, out string searchPath, out string resolvedPath);
    }

    public class PathResolver : IPathResolver
    {
        private List<string> _searchPaths = new List<string>();

        public PathResolver()
        {
        }

        public void AddSearchPath(string path)
        {
            if (!_searchPaths.Contains(path))
            {
                _searchPaths.Add(path);
            }
        }

        public bool ResolvePath(IFileSystem fileSystem, string fileName, out string searchPath, out string resolvedPath)
        {
            if (fileSystem.Exists(fileName))
            {
                resolvedPath = fileName;
                searchPath = "";
                return true;
            }

            if (!fileName.StartsWith("/"))
            {
                for (int i = 0, count = _searchPaths.Count; i < count; i++)
                {
                    var path = _searchPaths[i];
                    var vpath = PathUtils.Combine(path, fileName);
                    if (fileSystem.Exists(vpath))
                    {
                        searchPath = path;
                        resolvedPath = vpath;
                        return true;
                    }
                }
            }

            searchPath = null;
            resolvedPath = null;
            return false;
        }
    }
}
