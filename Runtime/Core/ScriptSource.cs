#if UNITY_EDITOR || (REACT_WATCH_OUTSIDE_EDITOR && !REACT_DISABLE_FILE)
#define REACT_SHOULD_WATCH
#endif

using System;
using System.Collections;
using System.IO;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting.DomProxies;
using UnityEngine;

namespace ReactUnity
{
    [Serializable]
    public class ScriptSource
    {
        public enum DevServerType
        {
            Never = 0,
            InEditor = 1,
            Always = 2,
        }

        public ScriptSource() { }

        public ScriptSource(ScriptSource source)
        {
            Type = source.Type;
            SourceAsset = source.SourceAsset;
            SourcePath = source.SourcePath;
            SourceText = source.SourceText;
            ResourcesPath = source.ResourcesPath;
            UseDevServer = source.UseDevServer;
            DevServer = source.DevServer;
        }

        public static ScriptSource Resource(string path, ScriptSourceLanguage language = ScriptSourceLanguage.JavaScript)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Resource,
                SourcePath = path,
                UseDevServer = DevServerType.Never,
                Watch = false,
                Language = language,
            };
        }

        public static ScriptSource Text(string path, ScriptSourceLanguage language = ScriptSourceLanguage.JavaScript)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Raw,
                SourceText = path,
                UseDevServer = DevServerType.Never,
                Watch = false,
                Language = language,
            };
        }

        public ScriptSourceType Type = ScriptSourceType.TextAsset;
        public ScriptSourceLanguage Language = ScriptSourceLanguage.JavaScript;
        public TextAsset SourceAsset;
        public bool Watch = true;
        public string SourcePath;
        public string SourceText;
        public string ResourcesPath;
        public DevServerType UseDevServer = DevServerType.InEditor;
        public bool ShouldUseDevServer =>
#if UNITY_EDITOR
            UseDevServer == DevServerType.InEditor || UseDevServer == DevServerType.Always;
#else
            UseDevServer == DevServerType.Always;
#endif
        public string DevServer = "http://localhost:3000";
        const string DevServerFilename = "/index.js";
        public string DevServerFile
        {
            get
            {
                var serverUrl = new Uri(DevServer);
                var path = serverUrl.PathAndQuery;
                if (string.IsNullOrWhiteSpace(path) || path == "/")
                {
                    if (Uri.TryCreate(serverUrl, DevServerFilename, out var res)) return res.AbsoluteUri;
                }
                return serverUrl.AbsoluteUri;
            }
        }

        public string FileName
        {
            get
            {
                string res = null;

                switch (Type)
                {
                    case ScriptSourceType.TextAsset:
                        res = SourceAsset.name;
                        break;
                    case ScriptSourceType.File:
                        res = SourcePath;
                        break;
                    case ScriptSourceType.Url:
                        res = SourcePath;
                        break;
                    case ScriptSourceType.Resource:
                        res = SourcePath;
                        break;
                    case ScriptSourceType.Raw:
                        res = "Inline Script";
                        break;
                    default:
                        break;
                }

                return res;
            }
        }

        private bool DevServerFailed = false;
        public bool IsDevServer => !DevServerFailed && ShouldUseDevServer && !string.IsNullOrWhiteSpace(DevServer);

        public ScriptSourceType EffectiveScriptSource => IsDevServer ? ScriptSourceType.Url : Type;

        public string GetResolvedSourceUrl(bool useDevServer = true)
        {
            if (useDevServer && IsDevServer) return DevServer;

            if (Type == ScriptSourceType.File || Type == ScriptSourceType.Resource)
                return SourcePath;
            else if (Type == ScriptSourceType.TextAsset)
                return ResourcesPath ?? "Assets/Resources/react/index.js";
            else if (Type == ScriptSourceType.Url)
            {
                var href = SourcePath;

                var abs = Application.absoluteURL;
                var url = new URL(href, abs);
                return url.href;
            }
            return "";
        }

        private string StripHashAndSearch(string url)
        {
            return url.Split('#')[0].Split('?')[0];
        }

        public IDisposable GetScript(Action<string> callback, IDispatcher dispatcher = null, bool useDevServer = true)
        {
            if (useDevServer && IsDevServer)
            {
                var request = UnityEngine.Networking.UnityWebRequest.Get(DevServerFile);

                return new DisposableHandle(dispatcher,
                    dispatcher.StartDeferred(
                        WatchWebRequest(request, callback, err => {
                            DevServerFailed = true;
                            Debug.LogWarning("DevServer seems to be unaccessible. Falling back to the original script. If this is unexpected, make sure the DevServer is running at " + DevServer);
                            GetScript(callback, dispatcher, false);
                        })));
            }

#if REACT_SHOULD_WATCH
            var watchFile = false;
#endif
            var filePath = "";

            switch (Type)
            {
                case ScriptSourceType.TextAsset:
                    if (!SourceAsset) callback(null);
                    else
                    {
#if UNITY_EDITOR
                        watchFile = true;
                        filePath = GetResourcePath(SourceAsset);
#endif
                        callback(SourceAsset.text);
                    }
                    break;
                case ScriptSourceType.File:
#if UNITY_EDITOR || !REACT_DISABLE_FILE
#if REACT_SHOULD_WATCH
                    watchFile = true;
#endif
                    filePath = StripHashAndSearch(SourcePath);
                    callback(File.ReadAllText(filePath));
                    break;
#else
                    throw new Exception("REACT_DISABLE_FILE is defined. File API cannot be used.");
#endif
                case ScriptSourceType.Url:
#if UNITY_EDITOR || !REACT_DISABLE_WEB
                    var request = UnityEngine.Networking.UnityWebRequest.Get(GetResolvedSourceUrl(false));

                    return new DisposableHandle(dispatcher,
                        dispatcher.StartDeferred(WatchWebRequest(request, callback)));
#else
                    throw new Exception("REACT_DISABLE_WEB is defined. Web API cannot be used.");
#endif
                case ScriptSourceType.Resource:
                    var asset = Resources.Load<TextAsset>(StripHashAndSearch(SourcePath));
                    if (asset)
                    {
#if UNITY_EDITOR
                        watchFile = true;
                        filePath = GetResourcePath(asset);
#endif
                        callback(asset.text);
                    }
                    else callback(null);
                    break;
                case ScriptSourceType.Raw:
                    callback(SourceText);
                    break;
                default:
                    callback(null);
                    break;
            }

#if REACT_SHOULD_WATCH
            if (Language == ScriptSourceLanguage.Html && Watch && watchFile && !string.IsNullOrWhiteSpace(filePath))
            {
                Debug.Log("Watching file for changes: " + filePath);
                return WatchFileSystem(filePath, x => {
                    var text = File.ReadAllText(x);
                    dispatcher.OnceUpdate(() => callback(text));
                });
            }
#endif

            return null;
        }

        static internal IEnumerator WatchWebRequest(
            UnityEngine.Networking.UnityWebRequest request,
            Action<string> callback,
            Action<string> errorCallback = null
        )
        {
            yield return request.SendWebRequest();
            if (!string.IsNullOrWhiteSpace(request.error))
                errorCallback?.Invoke(request.error);
            else
                callback(request.downloadHandler.text);
        }

#if UNITY_EDITOR
        private static string GetResourcePath(UnityEngine.Object asset)
        {
            return Path.Combine(Directory.GetCurrentDirectory(), UnityEditor.AssetDatabase.GetAssetPath(asset).Replace('/', '\\'));
        }
#endif

#if REACT_SHOULD_WATCH
        public static IDisposable WatchFileSystem(string path, Action<string> callback)
        {
            var fileSystemWatcher = new FileSystemWatcher();

            fileSystemWatcher.Path = Path.GetDirectoryName(path);
            fileSystemWatcher.Filter = Path.GetFileName(path);
            fileSystemWatcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size;

            fileSystemWatcher.Changed += (x, y) => callback(y.FullPath);
            fileSystemWatcher.EnableRaisingEvents = true;

            return fileSystemWatcher;
        }
#endif
    }

    public enum ScriptSourceType
    {
        TextAsset = 0,
        File = 1,
        Url = 2,
        Resource = 3,
        Raw = 4,
    }

    public enum ScriptSourceLanguage
    {
        [InspectorName("JavaScript")]
        JavaScript = 0,
        Html = 1,
    }
}
