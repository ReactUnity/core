using System;
using System.Collections.Generic;

namespace QuickJS.Utils
{
    public interface IFileSystem
    {
        /// <summary>
        /// to check if the file is existed (do not throw exception)
        /// </summary>
        bool Exists(string path);

        /// <summary>
        /// the fullpath of the given path (do not throw exception)
        /// </summary>
        string GetFullPath(string path);

        /// <summary>
        /// the content of file, return null if any error occurs (do not throw exception)
        /// </summary>
        byte[] ReadAllBytes(string path);
    }

    public class CompoundedFileSystem : IFileSystem
    {
        private List<IFileSystem> _fileSystems = new List<IFileSystem>();

        public bool Exists(string path)
        {
            for (int i = 0, count = _fileSystems.Count; i < count; ++i)
            {
                var fs = _fileSystems[i];
                if (fs.Exists(path))
                {
                    return true;
                }
            }
            return false;
        }

        public string GetFullPath(string path)
        {
            for (int i = 0, count = _fileSystems.Count; i < count; ++i)
            {
                var fs = _fileSystems[i];
                var fp = fs.GetFullPath(path);
                if (!string.IsNullOrEmpty(fp))
                {
                    return fp;
                }
            }
            return null;
        }

        public byte[] ReadAllBytes(string path)
        {
            for (int i = 0, count = _fileSystems.Count; i < count; ++i)
            {
                var fs = _fileSystems[i];
                var fp = fs.ReadAllBytes(path);
                if (fp != null)
                {
                    return fp;
                }
            }
            return null;
        }
    }

    public class DefaultFileSystem : IFileSystem
    {
        private IScriptLogger _logger;

        public DefaultFileSystem(IScriptLogger logger)
        {
            _logger = logger;
        }

        public bool Exists(string path)
        {
            return System.IO.File.Exists(path);
        }

        public string GetFullPath(string path)
        {
            try
            {
                return System.IO.Path.GetFullPath(path);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public byte[] ReadAllBytes(string path)
        {
            try
            {
                return System.IO.File.ReadAllBytes(path);
            }
            catch (Exception exception)
            {
                if (_logger != null)
                {
                    _logger.Write(LogLevel.Error, "{0}: {1}\n{2}", path, exception.Message, exception.StackTrace);
                }
                return null;
            }
        }
    }

#if !JSB_UNITYLESS
    public class ResourcesFileSystem : IFileSystem
    {
        private IScriptLogger _logger;

        public ResourcesFileSystem(IScriptLogger logger)
        {
            _logger = logger;
        }

        public bool Exists(string path)
        {
            var asset = UnityEngine.Resources.Load<UnityEngine.TextAsset>(path);
            return asset != null;
        }

        public string GetFullPath(string path)
        {
            return path;
        }

        public byte[] ReadAllBytes(string path)
        {
            try
            {
                var asset = UnityEngine.Resources.Load<UnityEngine.TextAsset>(path);
                return asset.bytes;
            }
            catch (Exception exception)
            {
                if (_logger != null)
                {
                    _logger.Write(LogLevel.Error, "{0}: {1}\n{2}", path, exception.Message, exception.StackTrace);
                }
                return null;
            }
        }
    }
#endif
}
