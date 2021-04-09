using System;
using System.Collections;
using UnityEngine;
#if UNITY_WEBGL && !UNITY_EDITOR
using System.Text.RegularExpressions;
#endif

namespace ReactUnity
{
    [Serializable]
    public class ReactScript
    {
        public ScriptSource ScriptSource = ScriptSource.TextAsset;

        public TextAsset SourceAsset;
        public string SourcePath;
        public string SourceText;
        public string ResourcesPath;

        public bool UseDevServer = true;
        public string DevServer = "http://localhost:3000";
        static string DevServerFilename = "";
        public string DevServerFile => DevServer + DevServerFilename;


        public static ReactScript Resource(string path)
        {
            return new ReactScript()
            {
                ScriptSource = ScriptSource.Resource,
                SourcePath = path,
                UseDevServer = false,
            };
        }

        public string SourceLocation
        {
            get
            {
#if UNITY_EDITOR || REACT_DEV_SERVER_API
                if (UseDevServer && !string.IsNullOrWhiteSpace(DevServer)) return DevServerFile;
#endif

                var href = GetResolvedSourcePath();
#if UNITY_WEBGL && !UNITY_EDITOR
                var abs = UnityEngine.Application.absoluteURL;
                if (!href.StartsWith("http") && abs != null)
                {
                    var parsed = new Regex(@"^(.*:)//([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$").Match(abs);

                    var parsedProto = parsed.Groups[1].Value;
                    var parsedHost = parsed.Groups[2].Value;
                    var parsedPort = parsed.Groups[3].Value;

                    href = parsedProto + "//" + parsedHost + parsedPort + "/" + new Regex("^/").Replace(href, "");
                }
#endif

                return href;
            }
        }


        public string GetResolvedSourcePath()
        {
            string path = "";

            if (ScriptSource == ScriptSource.File || ScriptSource == ScriptSource.Url)
                path = SourcePath;
            else if (ScriptSource == ScriptSource.TextAsset)
                path = ResourcesPath ?? "Assets/Resources/react/index.js";
            else if (ScriptSource == ScriptSource.Resource)
                path = SourcePath;
            return path;
        }

        private string StripHashAndSearch(string url)
        {
            return url.Split('#')[0].Split('?')[0];
        }

        public IDisposable GetScript(Action<string, bool> callback, IDispatcher dispatcher = null, bool useDevServer = true, bool disableWarnings = false)
        {
#if UNITY_EDITOR || REACT_DEV_SERVER_API
            if (useDevServer && UseDevServer && !string.IsNullOrWhiteSpace(DevServer))
            {
                var request = UnityEngine.Networking.UnityWebRequest.Get(DevServerFile);

                return new DisposableHandle(dispatcher,
                    dispatcher.StartDeferred(
                        WatchWebRequest(request, callback, err =>
                        {
                            Debug.LogWarning("DevServer seems to be unaccessible. Falling back to the original script.");
                            GetScript(callback, dispatcher, false);
                        }, true)));
            }
#endif

            switch (ScriptSource)
            {
                case ScriptSource.TextAsset:
                    if (!SourceAsset) callback(null, false);
                    else callback(SourceAsset.text, false);
                    break;
                case ScriptSource.File:
#if UNITY_EDITOR || REACT_FILE_API
#if !REACT_FILE_API
                    if (!disableWarnings) Debug.LogWarning("REACT_FILE_API is not defined. Add REACT_FILE_API to build symbols to if you want to use this feature outside editor.");
#endif
                    callback(System.IO.File.ReadAllText(StripHashAndSearch(SourcePath)), false);
                    break;
#else
                    throw new Exception("REACT_FILE_API must be defined to use File API outside the editor. Add REACT_FILE_API to build symbols to use this feature.");
#endif
                case ScriptSource.Url:
#if UNITY_EDITOR || REACT_URL_API
#if !REACT_URL_API
                    if (!disableWarnings) Debug.LogWarning("REACT_URL_API is not defined. Add REACT_URL_API to build symbols to if you want to use this feature outside editor.");
#endif
                    var request = UnityEngine.Networking.UnityWebRequest.Get(SourcePath);

                    return new DisposableHandle(dispatcher,
                        dispatcher.StartDeferred(WatchWebRequest(request, callback)));
#else
                    throw new Exception("REACT_URL_API must be defined to use Url API outside the editor. Add REACT_URL_API to build symbols to use this feature.");
#endif
                case ScriptSource.Resource:
                    var asset = Resources.Load(StripHashAndSearch(SourcePath)) as TextAsset;
                    if (asset) callback(asset.text, false);
                    else callback(null, false);
                    break;
                case ScriptSource.Text:
                    callback(SourceText, false);
                    break;
                default:
                    callback(null, false);
                    break;
            }

            return null;
        }

#if UNITY_EDITOR || REACT_URL_API || REACT_DEV_SERVER_API
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
}
