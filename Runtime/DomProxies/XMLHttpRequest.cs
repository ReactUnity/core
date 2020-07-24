#if UNITY_EDITOR

using Jint;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;

namespace ReactUnity.DomProxies
{
    public class XMLHttpRequest
    {
        public string origin { get; private set; }

        public Action onreadystatechange { get; set; }
        public bool withCredentials { get; set; }
        public int timeout { get; set; }
        public int status { get; private set; }

        public static string[] dispatches = new string[]
        {
            "LoadStart",
            "Progress",
            "UploadProgress",
            "Load",
            "Error"
        };

        public static ManualResetEvent allDone = new ManualResetEvent(false);

        private Uri url;
        private Dictionary<string, string> options;
        private Dictionary<string, string> headers;
        private Dictionary<string, List<string>> postData;
        private Hashtable openParameters;

        public string statusText { get; private set; }
        public string responseHeaders { get; private set; } = "";
        private System.Net.HttpWebRequest req;
        private static System.Net.CookieContainer cookieContainer = new System.Net.CookieContainer();

        public int readyState { get { return 4; } }
        public string DONE { get { return "complete"; } }
        public string responseText { get; set; }


        public XMLHttpRequest()
        {
            Reset();
        }

        public XMLHttpRequest(string origin): this()
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
            openParameters["url"] = url;
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
        }

        public void send(object o)
        {
            var args = o as Jint.Native.Object.ObjectInstance;
            options = extractOptions(args);
            url = new Uri(origin + options["url"]);


            if (options["transport"] == "browser")
            {
                req = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
            }
            else
            {
                req = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
                req.CookieContainer = cookieContainer;
                // disable buffering (this only works for ClientHttp version)
                //_req.AllowWriteStreamBuffering = false; // causes silent crash on Mac OS X 10.8.x
            }

            req.Method = options["method"];

            // add custom headers
            if (headers.Count != 0)
            {
                foreach (string key in headers.Keys)
                {
                    if (headers[key] == null)
                        continue;

                    switch (key.ToLower())
                    {
                        // in silverlight 3, these are set by the web browser that hosts the Silverlight application.
                        // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=vs.95%29.aspx
                        case "connection":
                        case "content-length":
                        case "expect":
                        case "if-modified-since":
                        case "referer":
                        case "transfer-encoding":
                        case "user-agent":
                            break;

                        // in silverlight this isn't supported, can not find reference to why not
                        case "range":
                            break;

                        // in .NET Framework 3.5 and below, these are set by the system.
                        // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=VS.90%29.aspx
                        case "date":
                        case "host":
                            break;

                        case "accept":
                            req.Accept = (string)headers[key];
                            break;

                        case "content-type":
                            req.ContentType = headers[key];
                            break;
                        default:
                            req.Headers[key] = (string)headers[key];
                            break;
                    }
                }
            }

            req.ContentLength = 0;


            {
                req.ContentType = options["mimeType"];
            }



            if (req.ContentLength == 0)
            {
                req.BeginGetResponse(new AsyncCallback(responseCallback), req);
            }
            else
            {
                req.BeginGetRequestStream(new AsyncCallback(responseCallback), req);
            }
        }

        private void responseCallback(IAsyncResult asynchronousResult)
        {

            var req = (System.Net.HttpWebRequest)asynchronousResult.AsyncState;


            using (var response = (System.Net.HttpWebResponse)req.EndGetResponse(asynchronousResult))
            {
                status = (int)response.StatusCode; // 4xx-5xx can throw WebException, we handle it below
                statusText = response.StatusDescription;

                if (response.SupportsHeaders && response.Headers is System.Net.WebHeaderCollection)
                {
                    foreach (string header in response.Headers.AllKeys)
                    {
                        responseHeaders += header + ": " + response.Headers[header] + "\r\n";
                    }
                }

                using (var responseStream = response.GetResponseStream())
                using (var sr = new System.IO.StreamReader(responseStream))
                {
                    this.responseText = sr.ReadToEnd();
                }
            }

            onreadystatechange?.Invoke();
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

#endif
