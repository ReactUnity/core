using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Scripting.DomProxies
{
    public class XMLHttpRequest
    {
        const string FormContentType = "application/x-www-form-urlencoded";

        private ReactContext context;
        private string origin { get; set; }
        private string overridenMimeType { get; set; }
        private string contentType { get; set; }
        private string stringBody { get; set; }

        public object onload
        {
            get => eventHandler.GetEventListener("load");
            set => eventHandler.SetEventListener("load", value);
        }
        public object onloadstart
        {
            get => eventHandler.GetEventListener("loadstart");
            set => eventHandler.SetEventListener("loadstart", value);
        }
        public object onloadend
        {
            get => eventHandler.GetEventListener("loadend");
            set => eventHandler.SetEventListener("loadend", value);
        }
        public object onerror
        {
            get => eventHandler.GetEventListener("error");
            set => eventHandler.SetEventListener("error", value);
        }
        public object onreadystatechange
        {
            get => eventHandler.GetEventListener("readystatechange");
            set => eventHandler.SetEventListener("readystatechange", value);
        }
        public object ontimeout
        {
            get => eventHandler.GetEventListener("timeout");
            set => eventHandler.SetEventListener("timeout", value);
        }
        public object onabort
        {
            get => eventHandler.GetEventListener("abort");
            set => eventHandler.SetEventListener("abort", value);
        }
        public object onprogress
        {
            get => eventHandler.GetEventListener("progress");
            set => eventHandler.SetEventListener("progress", value);
        }

        public bool withCredentials { get; set; }
        public int timeout
        {
            get => request.timeout;
            set => request.timeout = value;
        }
        public string responseType { get; set; }

        private Dictionary<string, List<string>> postData;

        private UnityWebRequest request;
        private DisposableHandle requestHandle;

        private EventHandler eventHandler = new EventHandler();

        public int readyState =>
            request == null ? 0 :
#if UNITY_2020_3_OR_NEWER
            request.result == UnityWebRequest.Result.InProgress ? 3 :
            request.result == UnityWebRequest.Result.Success ? 4 :
#else
            request.isDone ? 4 :
            !request.isModifiable ? 3 :
#endif
            1;
        public int status => (int) request.responseCode;
        public string statusText => isError ? "error" : "ok";

        public string DONE => request.isDone ? "complete" : "";

        public string responseText => isError ? request.error : request.downloadHandler.text;
        public string responseXML => responseText;
        public string responseURL => request.url;

        public object response
        {
            get
            {
                if (request == null || isError) return null;

                switch (responseType)
                {
                    case "arraybuffer":
                    case "blob":
                        return null;
                    case "document":
                        return responseXML;
                    case "json":
                        return context.Script.JsonParse(responseText);
                    case "text":
                    case "":
                    default:
                        return responseText;
                }
            }
        }


        private bool isError => request != null && (
#if UNITY_2020_3_OR_NEWER
            request.result == UnityWebRequest.Result.ConnectionError ||
            request.result == UnityWebRequest.Result.ProtocolError ||
            request.result == UnityWebRequest.Result.DataProcessingError
#else
            request.isHttpError || request.isNetworkError
#endif
        );



        public XMLHttpRequest(ReactContext context)
        {
            this.context = context;
            postData = new Dictionary<string, List<string>>();
        }

        public XMLHttpRequest(ReactContext context, string origin) : this(context)
        {
            this.origin = origin;
        }

        public void open(string method, object url, bool async = true, string user = null, string password = null)
        {
            var setUrl = url is string s ? new URL(s, origin) : url is URL g ? g : null;

            if (setUrl == null) return;

            request = UnityWebRequest.Get(setUrl.href);
            request.method = method;

            var rdHandlers = eventHandler.GetHandlers("readystatechange");
            foreach (var rdHandler in rdHandlers) Callback.From(rdHandler, context).Call();
        }

        public void append(object name, object value)
        {
            List<string> postList;
            if (!postData.TryGetValue((string) name, out postList))
            {
                postList = new List<string>();
            }
            postList.Add((string) value);

            postData.Remove((string) name);
            postData.Add((string) name, postList);
        }

        public void send(object o = null)
        {
            setupPostData(o);

            requestHandle = new DisposableHandle(context.Dispatcher,
                context.Dispatcher.StartDeferred(
                    SendWebRequest(request)));
        }

        public void abort()
        {
            request?.Abort();
            request = null;
            requestHandle?.Dispose();
            requestHandle = null;

            var handlers = eventHandler.GetHandlers("abort");
            foreach (var handler in handlers) Callback.From(handler, context).Call();

            var loadHandlers = eventHandler.GetHandlers("loadend");
            foreach (var loadHandler in loadHandlers) Callback.From(loadHandler, context).Call();

            var rdHandlers = eventHandler.GetHandlers("readystatechange");
            foreach (var rdHandler in rdHandlers) Callback.From(rdHandler, context).Call();
        }

        public void setRequestHeader(string header, string value)
        {
            if (string.Equals(header, "content-type", StringComparison.InvariantCultureIgnoreCase))
            {
                contentType = value;
                if (request.uploadHandler != null)
                    request.uploadHandler.contentType = value;

                if (stringBody != null)
                {
                    SetupPost(stringBody);
                }
            }

            request?.SetRequestHeader(header.ToLowerInvariant(), value);
        }

        public string getResponseHeader(string header)
        {
            if (request == null || !request.isDone) return null;
            return request.GetResponseHeader(header.ToLowerInvariant());
        }

        public string getAllResponseHeaders()
        {
            if (request == null || !request.isDone) return null;

            var res = request.GetResponseHeaders();

            var str = new List<string>();

            foreach (var item in res)
            {
                var key = item.Key.ToLowerInvariant();
                if (key == "set-cookie") continue;

                str.Add(key + ": " + item.Value);
            }

            return string.Join("\r\n", str);
        }

        public void overrideMimeType(string mimeType)
        {
            overridenMimeType = mimeType;
        }

        public void addEventListener(string eventType, object callback, bool capture = false)
        {
            eventHandler.AddEventListener(eventType, callback);
        }

        public void removeEventListener(string eventType, object callback, bool capture = false)
        {
            eventHandler.RemoveEventListener(eventType, callback);
        }

        private IEnumerator SendWebRequest(UnityWebRequest request)
        {
            var op = request.SendWebRequest();
            var hasProgress = false;

            while (!op.isDone)
            {
                if (!hasProgress && op.progress > 0)
                {
                    hasProgress = true;

                    var prHandlers = eventHandler.GetHandlers("progress");
                    foreach (var prHandler in prHandlers) Callback.From(prHandler, context).Call();

                    var rdHandlers = eventHandler.GetHandlers("readystatechange");
                    foreach (var rdHandler in rdHandlers) Callback.From(rdHandler, context).Call();
                }

                yield return null;
            }

            if (isError)
            {
                var errorHandlers = eventHandler.GetHandlers("error");
                foreach (var errorHandler in errorHandlers) Callback.From(errorHandler, context).Call();

                var loadHandlers = eventHandler.GetHandlers("loadend");
                foreach (var loadHandler in loadHandlers) Callback.From(loadHandler, context).Call();

                var rdHandlers = eventHandler.GetHandlers("readystatechange");
                foreach (var rdHandler in rdHandlers) Callback.From(rdHandler, context).Call();
            }
            else
            {
                var loadHandlers = eventHandler.GetHandlers("load");
                foreach (var loadHandler in loadHandlers) Callback.From(loadHandler, context).Call();

                loadHandlers = eventHandler.GetHandlers("loadend");
                foreach (var loadHandler in loadHandlers) Callback.From(loadHandler, context).Call();

                var rdHandlers = eventHandler.GetHandlers("readystatechange");
                foreach (var rdHandler in rdHandlers) Callback.From(rdHandler, context).Call();
            }
        }

        private void setupPostData(object data)
        {
            if (data == null) return;

            if (data is string s)
            {
                SetupPost(s);
            }
            else if (data is WWWForm f)
            {
                var tmpReq = UnityWebRequest.Post(request.url, f);
                ReplaceUploadDownloadHandlers(tmpReq);
            }
            else if (data is FormData ff)
            {
                var w = ff.GetForm();
                var tmpReq = UnityWebRequest.Post(request.url, w);
                ReplaceUploadDownloadHandlers(tmpReq);
            }
            else if (data is Dictionary<string, string> d)
            {
                var tmpReq = UnityWebRequest.Post(request.url, d);
                ReplaceUploadDownloadHandlers(tmpReq);
            }
            else if (context.Script.Engine.IsScriptObject(data))
            {
                var dt = context.Script.Engine.TraverseScriptObject(data);

                var dic = new Dictionary<string, string>();

                while (dt.MoveNext())
                    if (dt.Current.Value is string ss) dic[dt.Current.Key] = ss;

                var tmpReq = UnityWebRequest.Post(request.url, dic);
                ReplaceUploadDownloadHandlers(tmpReq);
            }
        }

        void ReplaceUploadDownloadHandlers(UnityWebRequest req)
        {
            if (!string.IsNullOrWhiteSpace(request.uploadHandler?.contentType))
                req.uploadHandler.contentType = request.uploadHandler.contentType;
            else if (!string.IsNullOrWhiteSpace(contentType))
                req.uploadHandler.contentType = contentType;

            request.downloadHandler = req.downloadHandler;
            request.uploadHandler = req.uploadHandler;
        }

        void SetupPost(string body)
        {
            stringBody = body;
            request.downloadHandler = new DownloadHandlerBuffer();
            if (!string.IsNullOrEmpty(body))
            {
                var type = FormContentType;

                if (!string.IsNullOrWhiteSpace(request.uploadHandler?.contentType))
                    type = request.uploadHandler.contentType;
                else if (!string.IsNullOrWhiteSpace(contentType))
                    type = contentType;

                if (type == FormContentType)
                {
                    body = DataEncode(body);
                }


                var array = Encoding.UTF8.GetBytes(body);
                request.uploadHandler = new UploadHandlerRaw(array);
                request.uploadHandler.contentType = type;
            }
        }

        public static string DataEncode(string toEncode)
        {
            var method = typeof(UnityWebRequest).Assembly
                ?.GetType("UnityEngine.WWWTranscoder")
                ?.GetMethod("DataEncode", new Type[] { typeof(string) });

            return method == null ? toEncode : method.Invoke(null, new object[] { toEncode }) as string;
        }
    }
}
