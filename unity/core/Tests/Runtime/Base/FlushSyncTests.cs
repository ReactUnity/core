using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class FlushSyncTests : TestBase
    {
        // `committed` is written by a layout effect, which runs inside the commit - so reading it
        // straight after a call says whether that call committed. Concurrent roots on purpose: the
        // harness defaults to legacy, where a plain setState can flush on its own.
        const string AppScript = @"
            let setCount;
            let committed = -1;
            function App() {
                const [count, set] = React.useState(0);
                setCount = set;
                React.useLayoutEffect(() => { committed = count; });
                return <view id='counter'>{'count ' + count}</view>;
            }
            globalThis.setWithFlushSync = (n) => { ReactUnity.flushSync(() => setCount(n)); return 'committed ' + committed; };
            globalThis.setWithoutFlushSync = (n) => { setCount(n); return 'committed ' + committed; };
        ";

        public FlushSyncTests(JavascriptEngineType engineType) : base(engineType) { }

        string Eval(string code) => Context.Script.Engine.Evaluate(code)?.ToString();

        [UGUITest(Script = AppScript + "render(<App />, { mode: 'concurrent' });")]
        public IEnumerator FlushSyncCommitsBeforeReturning()
        {
            yield return null;
            Assert.AreEqual("count 0", Host.TextContent);

            Assert.AreEqual("committed 5", Eval("setWithFlushSync(5)"));
            Context.FlushCommands();
            Assert.AreEqual("count 5", Host.TextContent);
        }

        [UGUITest(Script = AppScript + "render(<App />, { mode: 'concurrent', disableBatchRendering: true });")]
        public IEnumerator FlushSyncCommitsBeforeReturningWithoutBatchRendering()
        {
            yield return null;
            Assert.AreEqual("count 0", Host.TextContent);

            Assert.AreEqual("committed 5", Eval("setWithFlushSync(5)"));
            Assert.AreEqual("count 5", Host.TextContent);
        }

        [UGUITest(Script = AppScript + "render(<App />, { mode: 'concurrent' });")]
        public IEnumerator SetStateWithoutFlushSyncIsNotCommittedBeforeReturning()
        {
            yield return null;

            Assert.AreEqual("committed 0", Eval("setWithoutFlushSync(5)"));

            for (int i = 0; i < 10 && Host.TextContent != "count 5"; i++) yield return AdvanceTime(0.1f);
            Assert.AreEqual("count 5", Host.TextContent);
        }
    }
}
