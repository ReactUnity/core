using System;
using System.Collections.Generic;
using UniRx;
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
        IObservable<string> StartWatching()
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

            if (string.IsNullOrWhiteSpace(path)) return Observable.Empty<string>();

            return DetectChanges.WatchFileSystem(path)
                .Throttle(TimeSpan.FromMilliseconds(500))
                .Select(x => System.IO.File.ReadAllText(path));
        }
#endif

        public IObservable<string> GetScript()
        {
            var res = new List<IObservable<string>>();

            IObservable<string> obs = null;

            switch (ScriptSource)
            {
                case ScriptSource.TextAsset:
                    if (SourceAsset) obs = Observable.Return(SourceAsset.text);
                    break;
                case ScriptSource.File:
                    obs = Observable.Return(System.IO.File.ReadAllText(SourcePath));
                    break;
                case ScriptSource.Url:
#pragma warning disable CS0618
                    obs = ObservableWWW.Get(SourcePath);
#pragma warning restore CS0618
                    break;
                case ScriptSource.Resource:
                    var asset = Resources.Load(SourcePath) as TextAsset;
                    if (asset) obs = Observable.Return(asset.text);
                    break;
                case ScriptSource.Text:
                    obs = Observable.Return(SourceText);
                    break;
                default:
                    break;
            }

            if (obs != null) res.Add(obs);

#if UNITY_EDITOR || REACT_WATCH_OUTSIDE_EDITOR
            if (Watch && SourceIsWatchable) res.Add(StartWatching());
#endif
            return Observable.Concat(res);
        }
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
        public static IObservable<string> WatchFileSystem(string path)
        {
            return Observable.Create<string>(observer =>
            {
                System.IO.FileSystemWatcher fileSystemWatcher = new System.IO.FileSystemWatcher();

                fileSystemWatcher.Path = System.IO.Path.GetDirectoryName(path);
                fileSystemWatcher.Filter = System.IO.Path.GetFileName(path);
                fileSystemWatcher.NotifyFilter = System.IO.NotifyFilters.LastWrite | System.IO.NotifyFilters.Size;

                fileSystemWatcher.Changed += (x, y) => observer.OnNext(y.FullPath);
                fileSystemWatcher.EnableRaisingEvents = true;

                return fileSystemWatcher;
            });
        }
    }
#endif
}
