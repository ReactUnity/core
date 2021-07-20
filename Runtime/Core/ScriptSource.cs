using System;
using System.Collections;
using ReactUnity.Scheduling;
using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Serialization;

namespace ReactUnity
{
    [Serializable]
    public class ScriptSource
    {
        public static ScriptSource Resource(string path)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Resource,
                SourcePath = path,
                UseDevServer = false,
            };
        }

        public static ScriptSource Text(string path)
        {
            return new ScriptSource()
            {
                Type = ScriptSourceType.Raw,
                SourceText = path,
                UseDevServer = false,
            };
        }

        [FormerlySerializedAs("ScriptSource")]
        public ScriptSourceType Type = ScriptSourceType.TextAsset;

        public TextAsset SourceAsset;
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

        public IDisposable GetScript(Action<string, bool> callback, IDispatcher dispatcher = null, bool useDevServer = true, bool disableWarnings = false)
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
                        }, true)));
            }
#endif

            switch (Type)
            {
                case ScriptSourceType.TextAsset:
                    if (!SourceAsset) callback(null, false);
                    else callback(SourceAsset.text, false);
                    break;
                case ScriptSourceType.File:
#if UNITY_EDITOR || !REACT_DISABLE_FILE
                    callback(System.IO.File.ReadAllText(StripHashAndSearch(SourcePath)), false);
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
                    if (asset) callback(asset.text, false);
                    else callback(null, false);
                    break;
                case ScriptSourceType.Raw:
                    callback(SourceText, false);
                    break;
                default:
                    callback(null, false);
                    break;
            }

            return null;
        }

        static internal IEnumerator WatchWebRequest(
            UnityEngine.Networking.UnityWebRequest request,
            Action<string, bool> callback,
            Action<string> errorCallback = null,
            bool isDevServer = false
        )
        {
            yield return request.SendWebRequest();
            if (!string.IsNullOrWhiteSpace(request.error))
                errorCallback?.Invoke(request.error);
            else
                callback(request.downloadHandler.text, isDevServer);
        }
    }

    public enum ScriptSourceType
    {
        TextAsset = 0,
        File = 1,
        Url = 2,
        Resource = 3,
        Raw = 4,
    }
}
