#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor.Developer
{
    /// <summary>
    /// A loopback HTTP endpoint that lets an external tool drive this Editor: read compile
    /// errors, run tests, enter play mode, grab a screenshot. Batch mode needs the project
    /// lock and a cold domain; this reuses the Editor already open.
    /// </summary>
    [InitializeOnLoad]
    public static class AgentBridgeServer
    {
        public const int BridgeVersion = 1;

        // TcpListener rather than HttpListener: HttpListener prefixes need a netsh URL ACL
        // reservation on Windows and throw access-denied without one. The HTTP this speaks
        // is only what a local client needs.
        static TcpListener listener;
        static Thread acceptThread;
        static readonly ConcurrentQueue<PendingRequest> queue = new ConcurrentQueue<PendingRequest>();

        public static int Port { get; private set; }

        class PendingRequest
        {
            public string Path;
            public System.Collections.Generic.Dictionary<string, string> Query;
            public string Response;
            public readonly ManualResetEventSlim Done = new ManualResetEventSlim(false);
        }

        static AgentBridgeServer()
        {
            // Never in batch mode. That Editor exits within seconds and there is nobody to
            // drive, but it would still bind the port and leave a discovery file behind
            // pointing at a dead one -- which is exactly what a client then connects to.
            if (Application.isBatchMode) return;

            // Every domain reload re-runs this, so stopping first keeps the port from leaking.
            Stop();
            AssemblyReloadEvents.beforeAssemblyReload += Stop;
            EditorApplication.quitting += OnQuitting;
            EditorApplication.update += Pump;

            AgentBridgeState.Install();
#if REACT_TEST_FRAMEWORK
            AgentBridgeTestRunner.Install();
#endif
            Start();
        }

        static void OnQuitting()
        {
            Stop();
            // A reload keeps the file (the next domain rewrites it); quitting must not.
            try { File.Delete(AgentBridgeState.DiscoveryFile); } catch { }
        }

        static void Start()
        {
            var requested = Environment.GetEnvironmentVariable("REACT_UNITY_BRIDGE_PORT");
            var basePort = int.TryParse(requested, out var parsed) ? parsed : 8787;

            for (var offset = 0; offset < 20; offset++)
            {
                try
                {
                    listener = new TcpListener(IPAddress.Loopback, basePort + offset);
                    listener.Start();
                    Port = basePort + offset;
                    break;
                }
                catch (SocketException)
                {
                    listener = null;
                }
            }

            if (listener == null)
            {
                Debug.LogWarning("[AgentBridge] No free port in 8787-8806; bridge disabled.");
                return;
            }

            acceptThread = new Thread(AcceptLoop) { IsBackground = true, Name = "ReactUnity.AgentBridge" };
            acceptThread.Start();
            WriteDiscoveryFile();
        }

        static void Stop()
        {
            try { listener?.Stop(); } catch { }
            listener = null;
            // The accept thread is background and blocks on a now-closed socket, so it dies
            // on its own. Waiting on it here would stall the domain reload.
            acceptThread = null;

            // Drain so a client waiting on a request from the old domain gets an answer.
            while (queue.TryDequeue(out var pending))
            {
                pending.Response = BridgeJson.Error("Editor is reloading");
                pending.Done.Set();
            }
        }

        static void AcceptLoop()
        {
            var current = listener;
            while (current != null && ReferenceEquals(current, listener))
            {
                TcpClient client;
                try { client = current.AcceptTcpClient(); }
                catch { return; }

                try { Serve(client); }
                catch (Exception e) { Debug.LogWarning($"[AgentBridge] {e.Message}"); }
                finally { try { client.Close(); } catch { } }
            }
        }

        static void Serve(TcpClient client)
        {
            var stream = client.GetStream();
            stream.ReadTimeout = 5000;

            var requestLine = ReadLine(stream);
            if (string.IsNullOrEmpty(requestLine)) return;

            var parts = requestLine.Split(' ');
            var target = parts.Length > 1 ? parts[1] : "/";

            // Headers are read only to find a body length; nothing here needs the body.
            var contentLength = 0;
            for (var header = ReadLine(stream); !string.IsNullOrEmpty(header); header = ReadLine(stream))
                if (header.StartsWith("Content-Length:", StringComparison.OrdinalIgnoreCase))
                    int.TryParse(header.Substring(15).Trim(), out contentLength);
            for (var read = 0; read < contentLength; read++) if (stream.ReadByte() < 0) break;

            var body = Dispatch(target);
            var bytes = Encoding.UTF8.GetBytes(body);
            var head = Encoding.UTF8.GetBytes(
                "HTTP/1.1 200 OK\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: " + bytes.Length + "\r\nConnection: close\r\n\r\n");
            stream.Write(head, 0, head.Length);
            stream.Write(bytes, 0, bytes.Length);
            stream.Flush();
        }

        static string ReadLine(NetworkStream stream)
        {
            var builder = new StringBuilder();
            int b;
            while ((b = stream.ReadByte()) >= 0)
            {
                if (b == '\n') break;
                if (b != '\r') builder.Append((char) b);
            }
            return builder.ToString();
        }

        /// <summary>Hands the request to the main thread; Editor APIs are not thread safe.</summary>
        static string Dispatch(string target)
        {
            var split = target.IndexOf('?');
            var pending = new PendingRequest
            {
                Path = (split < 0 ? target : target.Substring(0, split)).TrimEnd('/'),
                Query = ParseQuery(split < 0 ? "" : target.Substring(split + 1)),
            };

            queue.Enqueue(pending);
            // A domain reload between enqueue and pump would otherwise hang the client.
            if (!pending.Done.Wait(TimeSpan.FromSeconds(30))) return BridgeJson.Error("Timed out waiting for the Editor main thread");
            return pending.Response;
        }

        static System.Collections.Generic.Dictionary<string, string> ParseQuery(string query)
        {
            var result = new System.Collections.Generic.Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            foreach (var pair in query.Split('&'))
            {
                if (pair.Length == 0) continue;
                var eq = pair.IndexOf('=');
                var key = eq < 0 ? pair : pair.Substring(0, eq);
                var value = eq < 0 ? "" : Uri.UnescapeDataString(pair.Substring(eq + 1).Replace('+', ' '));
                result[Uri.UnescapeDataString(key)] = value;
            }
            return result;
        }

        static int quitCountdown = -1;

        /// <summary>Asks for an exit a few pumps from now, leaving time to answer the request.</summary>
        public static void RequestQuit() => quitCountdown = 10;

        static void Pump()
        {
            while (queue.TryDequeue(out var pending))
            {
                try { pending.Response = AgentBridgeHandlers.Handle(pending.Path, pending.Query); }
                catch (Exception e) { pending.Response = BridgeJson.Error(e.Message); }
                finally { pending.Done.Set(); }
            }

            if (quitCountdown < 0 || --quitCountdown > 0) return;
            quitCountdown = -1;
            OnQuitting();
            // ExecuteMenuItem, not EditorApplication.Exit: Exit is silently ignored here (both
            // directly and via delayCall), while File/Exit closes the Editor every time.
            EditorApplication.ExecuteMenuItem("File/Exit");
        }

        /// <summary>Library/ is gitignored, so this is how the CLI finds the port.</summary>
        static void WriteDiscoveryFile()
        {
            try
            {
                var payload = BridgeJson.Object(
                    BridgeJson.Prop("port", Port),
                    BridgeJson.Prop("pid", System.Diagnostics.Process.GetCurrentProcess().Id),
                    BridgeJson.Prop("unityVersion", Application.unityVersion),
                    BridgeJson.Prop("projectPath", Directory.GetCurrentDirectory().Replace('\\', '/')),
                    BridgeJson.Prop("bridgeVersion", BridgeVersion));
                File.WriteAllText(AgentBridgeState.DiscoveryFile, payload);
            }
            catch (Exception e)
            {
                Debug.LogWarning($"[AgentBridge] Could not write discovery file: {e.Message}");
            }
        }
    }
}
#endif
