#if UNITY_EDITOR || (REACT_WATCH_OUTSIDE_EDITOR && !REACT_DISABLE_FILE)
#define REACT_SHOULD_WATCH
#endif

using System;
using System.Collections;
using System.IO;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using UnityEngine;

namespace ReactUnity
{
    [Serializable]
    public class ScriptSource
    {
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

        public static ScriptSource Resource(string path)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Resource,
                SourcePath = path,
                UseDevServer = false,
                Watch = false,
            };
        }

        public static ScriptSource Text(string path)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Raw,
                SourceText = path,
                UseDevServer = false,
                Watch = false,
            };
        }

        public ScriptSourceType Type = ScriptSourceType.TextAsset;
        public ScriptSourceLanguage Language = ScriptSourceLanguage.JavaScript;
        public TextAsset SourceAsset;
        public bool Watch = true;
        public string SourcePath;
        public string SourceText;
        public string ResourcesPath;
        public bool UseDevServer = true;
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

#if UNITY_EDITOR || REACT_ALLOW_DEVSERVER
        private bool DevServerFailed = false;
        public bool IsDevServer => !DevServerFailed && UseDevServer && !string.IsNullOrWhiteSpace(DevServer);
#else
        public bool IsDevServer => false;
#endif

        public ScriptSourceType EffectiveScriptSource => IsDevServer ? ScriptSourceType.Url : Type;

        public string GetResolvedSourceUrl(bool useDevServer = true)
        {
#if UNITY_EDITOR || REACT_ALLOW_DEVSERVER
            if (useDevServer && IsDevServer) return DevServer;
#endif

            if (Type == ScriptSourceType.File || Type == ScriptSourceType.Resource)
                return SourcePath;
            else if (Type == ScriptSourceType.TextAsset)
                return ResourcesPath ?? "Assets/Resources/react/index.js";
            else if (Type == ScriptSourceType.Url)
            {
                var href = SourcePath;

#if UNITY_WEBGL && !UNITY_EDITOR
                var abs = UnityEngine.Application.absoluteURL;
                if (!href.StartsWith("http") && abs != null)
                {
                    var parsed = new System.Text.RegularExpressions.Regex(@"^(.*:)//([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$").Match(abs);

                    var parsedProto = parsed.Groups[1].Value;
                    var parsedHost = parsed.Groups[2].Value;
                    var parsedPort = parsed.Groups[3].Value;

                    href = parsedProto + "//" + parsedHost + parsedPort + "/" + new System.Text.RegularExpressions.Regex("^/").Replace(href, "");
                }
#endif
                return href;
            }
            return "";
        }

        private string StripHashAndSearch(string url)
        {
            return url.Split('#')[0].Split('?')[0];
        }

        public IDisposable GetScript(Action<string> callback, IDispatcher dispatcher = null, bool useDevServer = true)
        {
#if UNITY_EDITOR || REACT_ALLOW_DEVSERVER
            if (useDevServer && IsDevServer)
            {
                var request = UnityEngine.Networking.UnityWebRequest.Get(DevServerFile);

                return new DisposableHandle(dispatcher,
                    dispatcher.StartDeferred(
                        WatchWebRequest(request, callback, err => {
                            DevServerFailed = true;
                            Debug.LogWarning("DevServer seems to be unaccessible. Falling back to the original script.");
                            GetScript(callback, dispatcher, false);
                        })));
            }
#endif

            var watchFile = false;
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
                    watchFile = true;
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
                    var asset = Resources.Load(StripHashAndSearch(SourcePath)) as TextAsset;
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
