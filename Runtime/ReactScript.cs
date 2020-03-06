using System;
using System.Collections;
using UnityEngine;

namespace ReactUnity
{
    [Serializable]
    public class ReactScript
    {
        public ScriptSource ScriptSource = ScriptSource.TextAsset;

        public TextAsset SourceAsset;
        public string SourcePath;
        public string SourceText;

        [SerializeField]
        [Tooltip(@"Editor only. Watches file for changes and refreshes the view on change.
Can be enabled outside the editor by adding define symbol REACT_WATCH_OUTSIDE_EDITOR to build.")]
        private bool Watch = false;

        private bool SourceIsTextAsset => ScriptSource == ScriptSource.TextAsset;
        private bool SourceIsPath => ScriptSource != ScriptSource.TextAsset && ScriptSource != ScriptSource.Text;
        private bool SourceIsText => ScriptSource == ScriptSource.Text;
        private bool SourceIsWatchable => ScriptSource != ScriptSource.Url && ScriptSource != ScriptSource.Text;


#if UNITY_EDITOR || REACT_WATCH_OUTSIDE_EDITOR
        IDisposable StartWatching(Action<string> callback)
        {
            string path = "";

            if (ScriptSource == ScriptSource.File)
                path = SourcePath;
#if UNITY_EDITOR
            else if (ScriptSource == ScriptSource.TextAsset)
                path = UnityEditor.AssetDatabase.GetAssetPath(SourceAsset);
            else if (ScriptSource == ScriptSource.Resource)
                path = UnityEditor.AssetDatabase.GetAssetPath(Resources.Load(SourcePath));
#endif

            if (string.IsNullOrWhiteSpace(path)) return null;

            return DetectChanges.WatchFileSystem(path, x => callback(System.IO.File.ReadAllText(path)));
        }
#endif

        public IDisposable GetScript(Action<string> changeCallback, out string result)
        {
            switch (ScriptSource)
            {
                case ScriptSource.TextAsset:
                    if (!SourceAsset) result = null;
#if UNITY_EDITOR
                    else result = System.IO.File.ReadAllText(UnityEditor.AssetDatabase.GetAssetPath(SourceAsset));
#else
                    else result = SourceAsset.text;
#endif
                    break;
                case ScriptSource.File:
#if UNITY_EDITOR || REACT_FILE_API
#if !REACT_FILE_API
                    Debug.LogWarning("REACT_FILE_API is not defined. Add REACT_FILE_API to build symbols to if you want to use this feature outside editor.");
#endif
                    result = System.IO.File.ReadAllText(SourcePath);
                    break;
#else
                    throw new Exception("REACT_FILE_API must be defined to use File API outside the editor. Add REACT_FILE_API to build symbols to use this feature.");
#endif
                case ScriptSource.Url:
#if UNITY_EDITOR || REACT_URL_API
#if !REACT_URL_API
                    Debug.LogWarning("REACT_URL_API is not defined. Add REACT_URL_API to build symbols to if you want to use this feature outside editor.");
#endif
                    result = null;
                    var request = UnityEngine.Networking.UnityWebRequest.Get(SourcePath);
                    return Interop.MainThreadDispatcher.StartDeferred(WatchWebRequest(request, changeCallback));
#else
                    throw new Exception("REACT_URL_API must be defined to use Url API outside the editor. Add REACT_URL_API to build symbols to use this feature.");
#endif
                case ScriptSource.Resource:
                    var asset = Resources.Load(SourcePath) as TextAsset;
                    if (asset) result = asset.text;
                    else result = null;
                    break;
                case ScriptSource.Text:
                    result = SourceText;
                    break;
                default:
                    result = null;
                    break;
            }

#if UNITY_EDITOR || REACT_WATCH_OUTSIDE_EDITOR
            if (Watch && SourceIsWatchable) return StartWatching(changeCallback);
#endif
            return null;
        }

#if UNITY_EDITOR || REACT_URL_API
        private IEnumerator WatchWebRequest(UnityEngine.Networking.UnityWebRequest request, Action<string> callback)
        {
            yield return request.SendWebRequest();
            callback(request.downloadHandler.text);
        }
#endif
    }

    public enum ScriptSource
    {
        TextAsset = 0,
        File = 1,
        Url = 2,
        Resource = 3,
        Text = 4,
    }


#if UNITY_EDITOR || REACT_WATCH_OUTSIDE_EDITOR
    public class DetectChanges
    {
        public static IDisposable WatchFileSystem(string path, Action<string> callback)
        {
            System.IO.FileSystemWatcher fileSystemWatcher = new System.IO.FileSystemWatcher();

            fileSystemWatcher.Path = System.IO.Path.GetDirectoryName(path);
            fileSystemWatcher.Filter = System.IO.Path.GetFileName(path);
            fileSystemWatcher.NotifyFilter = System.IO.NotifyFilters.LastWrite | System.IO.NotifyFilters.Size;

            fileSystemWatcher.Changed += (x, y) => callback(y.FullPath);
            fileSystemWatcher.EnableRaisingEvents = true;

            return fileSystemWatcher;
        }
    }
#endif
}
