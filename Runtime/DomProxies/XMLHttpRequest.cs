using Jint;
using Jint.Native;
using ReactUnity.Interop;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;

namespace ReactUnity.DomProxies
{
    public class XMLHttpRequest
    {
        public string origin { get; private set; }

        public object onload { get; set; }
        public object onerror { get; set; }
        public object onreadystatechange { get; set; }
        public object ontimeout { get; set; }
        public object onabort { get; set; }
        public bool withCredentials { get; set; }
        public int? timeout { get; set; }
        public int status { get; private set; }

        public static string[] dispatches = new string[]
        {
            "LoadStart",
            "Progress",
            "UploadProgress",
            "Load",
            "Error"
        };

        private Uri url;
        private Dictionary<string, string> options;
        private Dictionary<string, string> headers;
        private Dictionary<string, List<string>> postData;
        private Hashtable openParameters;

        public string statusText { get; private set; }
        public string responseHeaders { get; private set; } = "";
        private UnityWebRequest req;
        private DisposableHandle requestHandle;

        public int readyState => 4;
        public string DONE => "complete";
        public string responseText { get; private set; }
        public string response => responseText;
        public string responseURL => null;

        ReactContext context;

        public XMLHttpRequest(ReactContext context)
        {
            this.context = context;
            Reset();
        }

        public XMLHttpRequest(ReactContext context, string origin) : this(context)
        {
            this.origin = origin;
        }

        private void Reset()
        {
            status = 0;
            statusText = "";
            options = new Dictionary<string, string>();
            headers = new Dictionary<string, string>();
            postData = new Dictionary<string, List<string>>();
        }

        public void open(string method, string url, bool async)
        {
            openParameters = new Hashtable();
            openParameters["method"] = method;
            openParameters["url"] = string.IsNullOrWhiteSpace(origin) ? url : url.Replace(origin, "");
            openParameters["async"] = async;

        }

        public void setRequestHeader(object name, object value)
        {
            headers.Add((string)name, (string)value);
        }

        public void append(object name, object value)
        {
            List<string> postList;
            if (!postData.TryGetValue((string)name, out postList))
            {
                postList = new List<string>();
            }
            postList.Add((string)value);

            postData.Remove((string)name);
            postData.Add((string)name, postList);
        }

        public void abort()
        {
            req?.Abort();
            req = null;
            requestHandle?.Dispose();
            requestHandle = null;
        }

        public void send(object o)
        {
            var args = o as Jint.Native.Object.ObjectInstance;
            options = extractOptions(args);
            url = new Uri(origin + options["url"]);

            req = UnityWebRequest.Get(url);
            requestHandle = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(
                ReactScript.WatchWebRequest(req, responseCallback, errorCallback)));

            // TODO: implement methods, headers and other options

            //req.Method = options["method"];

            // add custom headers
            //if (headers.Count != 0)
            //{
            //    foreach (string key in headers.Keys)
            //    {
            //        if (headers[key] == null)
            //            continue;

            //        switch (key.ToLower())
            //        {
            //            // in silverlight 3, these are set by the web browser that hosts the Silverlight application.
            //            // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=vs.95%29.aspx
            //            case "connection":
            //            case "content-length":
            //            case "expect":
            //            case "if-modified-since":
            //            case "referer":
            //            case "transfer-encoding":
            //            case "user-agent":
            //                break;

            //            // in silverlight this isn't supported, can not find reference to why not
            //            case "range":
            //                break;

            //            // in .NET Framework 3.5 and below, these are set by the system.
            //            // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=VS.90%29.aspx
            //            case "date":
            //            case "host":
            //                break;

            //            case "accept":
            //                req.Accept = (string)headers[key];
            //                break;

            //            case "content-type":
            //                req.ContentType = headers[key];
            //                break;
            //            default:
            //                req.Headers[key] = (string)headers[key];
            //                break;
            //        }
            //    }
            //}

            //req.ContentLength = 0;
            //req.ContentType = options["mimeType"];
        }

        private void responseCallback(string result, bool devServer)
        {
            responseText = result;
            status = 200;
            statusText = "ok";
            //responseHeaders += header + ": " + response.Headers[header] + "\r\n";


            if (onload != null) new Callback(onload).Call();
            if (onreadystatechange != null) new Callback(onreadystatechange).Call();
        }

        private void errorCallback(string result)
        {
            responseText = result;
            status = 400;
            statusText = "error";

            if (onerror != null) new Callback(onerror).Call();
            if (onreadystatechange != null) new Callback(onreadystatechange).Call();
        }

        public string getAllResponseHeaders()
        {
            return responseHeaders;
        }

        private Dictionary<string, string> extractOptions(Jint.Native.Object.ObjectInstance args)
        {
            var defaults = new Dictionary<string, string>() {
                { "url", null },
                { "user", null },
                { "password", null },
                { "method", "POST" },
                { "mimeType", "" },
                { "encoding", "UTF-8" },
                { "responseType", "" },
                { "transport", "browser" }
            };

            var options = new Dictionary<string, string>();
            if (openParameters != null)
            {
                foreach (string key in openParameters.Keys)
                {
                    options[key] = openParameters[key] as string;
                }
            }
            if (args != null)
            {
                foreach (string key in defaults.Keys)
                {
                    options.Add(key, args.Get(key).AsString());
                }
            }
            string value;
            foreach (var item in defaults)
            {
                if (!options.TryGetValue(item.Key, out value))
                {
                    options.Add(item.Key, item.Value);
                }
            }

            // make sure this one is uppercase
            options["method"] = options["method"].ToUpper();

            return options;
        }
    }
}
