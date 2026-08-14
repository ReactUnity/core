#if UNITY_EDITOR && REACT_UNITY_DEVELOPER && REACT_TEST_FRAMEWORK
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEditor.TestTools.TestRunner.Api;
using UnityEngine;

namespace ReactUnity.Editor.Developer
{
    /// <summary>
    /// Runs the test suites inside this Editor instead of a fresh batch-mode one. Results go
    /// to a file, not to the HTTP response: an EditMode run reloads the domain, which would
    /// drop any request still waiting on it.
    /// </summary>
    public static class AgentBridgeTestRunner
    {
        static TestRunnerApi api;

        public static void Install()
        {
            api = ScriptableObject.CreateInstance<TestRunnerApi>();
            // Registered on every domain load so the callbacks are still attached when a run
            // resumes on the other side of a reload.
            api.RegisterCallbacks(new Callbacks());
        }

        public static string Handle(Dictionary<string, string> query)
        {
            if (!query.TryGetValue("run", out var run) || run != "1") return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.PropRaw("state", StateJson()));

            if (ReadState() == "running") return BridgeJson.Error("A test run is already in progress");

            var mode = query.TryGetValue("mode", out var requested) && requested == "PlayMode" ? TestMode.PlayMode : TestMode.EditMode;
            var filter = new Filter { testMode = mode };

            if (query.TryGetValue("assemblies", out var assemblies) && !string.IsNullOrEmpty(assemblies))
                filter.assemblyNames = assemblies.Split(';');
            if (query.TryGetValue("filter", out var names) && !string.IsNullOrEmpty(names))
                filter.groupNames = names.Split(';');

            WriteState("running", null);
            api.Execute(new ExecutionSettings(filter));

            return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.Prop("started", true), BridgeJson.Prop("mode", mode.ToString()));
        }

        public static string StateJson()
        {
            try
            {
                if (File.Exists(AgentBridgeState.TestStateFile)) return File.ReadAllText(AgentBridgeState.TestStateFile);
            }
            catch { }
            return BridgeJson.Object(BridgeJson.Prop("state", "idle"));
        }

        static string ReadState()
        {
            var json = StateJson();
            return json.Contains("\"running\"") ? "running" : "idle";
        }

        static void WriteState(string state, string summary)
        {
            try
            {
                Directory.CreateDirectory(AgentBridgeState.StateDirectory);
                File.WriteAllText(AgentBridgeState.TestStateFile, BridgeJson.Object(
                    BridgeJson.Prop("state", state),
                    BridgeJson.Prop("resultsFile", AgentBridgeState.TestResultsFile.Replace('\\', '/')),
                    BridgeJson.PropRaw("summary", summary ?? "null")));
            }
            catch { }
        }

        class Callbacks : ICallbacks
        {
            public void RunStarted(ITestAdaptor testsToRun) => WriteState("running", null);

            public void RunFinished(ITestResultAdaptor result)
            {
                var cases = new StringBuilder();
                Collect(result, cases);

                // NUnit3-shaped on purpose: scripts/unity/parse.mts already reads this shape
                // from batch-mode runs, so both paths share one parser.
                var xml = new StringBuilder();
                xml.Append("<test-run total=\"").Append(result.PassCount + result.FailCount + result.SkipCount + result.InconclusiveCount)
                    .Append("\" passed=\"").Append(result.PassCount)
                    .Append("\" failed=\"").Append(result.FailCount)
                    .Append("\" skipped=\"").Append(result.SkipCount)
                    .Append("\" inconclusive=\"").Append(result.InconclusiveCount)
                    .Append("\" duration=\"").Append(result.Duration.ToString(System.Globalization.CultureInfo.InvariantCulture))
                    .Append("\">\n").Append(cases).Append("</test-run>\n");

                try
                {
                    Directory.CreateDirectory(AgentBridgeState.StateDirectory);
                    File.WriteAllText(AgentBridgeState.TestResultsFile, xml.ToString());
                }
                catch { }

                WriteState("done", BridgeJson.Object(
                    BridgeJson.Prop("passed", result.PassCount),
                    BridgeJson.Prop("failed", result.FailCount),
                    BridgeJson.Prop("skipped", result.SkipCount),
                    BridgeJson.Prop("inconclusive", result.InconclusiveCount)));
            }

            static void Collect(ITestResultAdaptor result, StringBuilder xml)
            {
                if (result.Test.IsSuite)
                {
                    foreach (var child in result.Children) Collect(child, xml);
                    return;
                }

                xml.Append("  <test-case fullname=\"").Append(Escape(result.Test.FullName))
                    .Append("\" result=\"").Append(result.TestStatus).Append('"');

                if (result.TestStatus == TestStatus.Failed)
                {
                    xml.Append(">\n    <failure>\n      <message><![CDATA[").Append(Cdata(result.Message)).Append("]]></message>\n")
                        .Append("      <stack-trace><![CDATA[").Append(Cdata(result.StackTrace)).Append("]]></stack-trace>\n")
                        .Append("    </failure>\n  </test-case>\n");
                }
                else xml.Append(" />\n");
            }

            static string Escape(string value) =>
                (value ?? "").Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;");

            // A test that printed the CDATA terminator would otherwise close the section early.
            static string Cdata(string value) => (value ?? "").Replace("]]>", "]] >");

            public void TestStarted(ITestAdaptor test) { }
            public void TestFinished(ITestResultAdaptor result) { }
        }
    }
}
#endif
