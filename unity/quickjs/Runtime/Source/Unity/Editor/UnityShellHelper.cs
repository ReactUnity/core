#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;

namespace QuickJS.Unity
{
    public static class UnityShellHelper
    {
        public static int Run(string command, string arguments, int maxIdleTime)
        {
            return Run(command, arguments, null, maxIdleTime);
        }

        private static int Run(string command, string arguments, DirectoryInfo workingDirectory, int maxIdleTime)
        {
            var output = new StringBuilder();
            using (var process = new Process())
            {
                process.StartInfo = new ProcessStartInfo()
                {
                    FileName = command,
                    Arguments = arguments,
                    WorkingDirectory = workingDirectory?.FullName ?? new DirectoryInfo(".").FullName,
                    RedirectStandardInput = true,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true,
                    UseShellExecute = false
                };
                // Prepare data received handlers
                process.OutputDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrEmpty(e.Data))
                    {
                        output.AppendLine(e.Data);
                        UnityEngine.Debug.Log(e.Data);
                    }
                };
                process.ErrorDataReceived += (sender, e) =>
                {
                    if (!string.IsNullOrEmpty(e.Data))
                    {
                        UnityEngine.Debug.LogError(e.Data);
                    }
                };
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                return WaitForProcess(process, output, maxIdleTime);
            }
        }

        private static int WaitForProcess(Process process, StringBuilder output, int maxIdleTime)
        {
            while (true)
            {
                var len = output.Length;
                if (process.WaitForExit(maxIdleTime * 1000))
                {
                    // WaitForExit with a timeout will not wait for async event handling operations to finish.
                    // To ensure that async event handling has been completed, call WaitForExit that takes no parameters.
                    // See remarks: https://msdn.microsoft.com/en-us/library/ty0d8k56(v=vs.110)
                    process.WaitForExit();

                    return process.ExitCode;
                }
                if (output.Length != len)
                {
                    continue;
                }
                // idle for too long with no output? -> kill
                // nb: testing the process threads WaitState doesn't work on OSX
                UnityEngine.Debug.LogError("Idle process detected. See console for more details.");
                process.Kill();
                return -1;
            }
        }
    }
}

#endif
