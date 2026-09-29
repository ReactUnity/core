using System;
using System.Collections;
using System.Diagnostics;
using System.Text;
using NUnit.Framework;
using ReactUnity.Scripting;
using Unity.PerformanceTesting;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Performance
{
    // Times the JavaScript engine rather than the frame: React commits, startup, plain JS, interop,
    // and the stack left on Unity's main thread. Run it before and after swapping an engine binary.
    public class ScriptingBenchmarks : PerfTestBase
    {
        public ScriptingBenchmarks(JavascriptEngineType engineType) : base(engineType) { }

        public class HostCounter
        {
            public int Value;
            public void Add(int x) { Value += x; }
            public int Get() => Value;
        }

        const string ListScript = @"
            let setState;
            function Item({ i, v }) {
                return <view className={'item ' + ((v & 1) ? 'odd' : 'even')} style={{ width: 10 + (v % 7), opacity: 0.5 }} data-index={i}>
                    {'Item ' + i + ' / ' + v}
                </view>;
            }
            function App() {
                const [state, set] = React.useState({ n: 0, v: 0 });
                setState = set;
                const items = [];
                for (let i = 0; i < state.n; i++) items.push(<Item key={i} i={i} v={state.v + i} />);
                return <view>{items}</view>;
            }
            globalThis.__list = (n, v) => ReactUnity.flushSync(() => setState({ n, v }));
            render(<App />);
        ";

        // A fresh root render per probe, so a probe that overflows cannot strand a stale setState.
        const string NestScript = @"
            function Nest({ d }) { return d > 0 ? <view><Nest d={d - 1} /></view> : <view>leaf</view>; }
            globalThis.__nest = (d) => render(<Nest d={d} />);
            globalThis.__depth = () => { let d = 0; function f() { d++; f(); } try { f(); } catch (e) { if (!(e instanceof RangeError)) throw e; } return d; };
            render(<view />);
        ";

        const int ListSize = 1000;

        static SampleGroup Ms(string name) => new SampleGroup(name, SampleUnit.Millisecond, false);

        IJavaScriptEngine Engine => Context.Script.Engine;

        static void Time(SampleGroup group, Action action)
        {
            var sw = Stopwatch.StartNew();
            action();
            Measure.Custom(group, sw.Elapsed.TotalMilliseconds);
        }

        static void Repeat(int warmup, int count, SampleGroup group, Action action)
        {
            for (int i = 0; i < warmup; i++) action();
            for (int i = 0; i < count; i++) Time(group, action);
        }

        IJavaScriptEngine CreateBareEngine() => Context.Script.EngineFactory.Create(null, false, false, null);

        static string Sucrase => Resources.Load<TextAsset>("ReactUnity/tests/scripts/sucrase-standalone").text;

        // Everything up to the C# side applying the commands: flushSync commits, and the flush pulls
        // the serialized buffer instead of waiting for its microtask.
        void List(int n, int v)
        {
            Engine.Evaluate($"__list({n}, {v})");
            Context.FlushCommands();
        }

        [UGUITest(Script = ListScript), Performance]
        public IEnumerator ReactListRendering()
        {
            yield return null;

            var mount = Ms($"Mount {ListSize} elements");
            var update = Ms($"Update {ListSize} elements");
            var unmount = Ms($"Unmount {ListSize} elements");

            for (int w = 0; w < 2; w++)
            {
                List(ListSize, w); yield return null;
                List(0, 0); yield return null;
            }

            // Frames between samples let Unity destroy what the last one removed.
            for (int it = 0; it < 10; it++)
            {
                Time(mount, () => List(ListSize, 0));
                yield return null;
                for (int u = 1; u <= 3; u++)
                {
                    Time(update, () => List(ListSize, u + it * 3));
                    yield return null;
                }
                Time(unmount, () => List(0, 0));
                yield return null;
            }
        }

        [UGUITest(Script = "render(<view />);"), Performance]
        public IEnumerator EngineStartup()
        {
            yield return null;

            var create = Ms("Create engine");
            var evalSucrase = Ms("Evaluate Sucrase bundle");
            var compileInjectable = Ms("Compile test bundle");
            var sucrase = Sucrase;
            var injectable = Resources.Load<TextAsset>("ReactUnity/tests/injectable/index").text;

            for (int it = 0; it < 10; it++)
            {
                var sw = Stopwatch.StartNew();
                var engine = CreateBareEngine();
                Measure.Custom(create, sw.Elapsed.TotalMilliseconds);

                Time(evalSucrase, () => engine.Execute(sucrase, "sucrase.js"));
                // Compile only: its top level needs the host globals a ReactContext provides.
                engine.SetGlobal("__src", new { code = injectable });
                Time(compileInjectable, () => engine.Evaluate("typeof new Function(__src.code)"));

                engine.Dispose();
                yield return null;
            }
        }

        [UGUITest(Script = "render(<view />);"), Performance]
        public IEnumerator JavaScriptWorkloads()
        {
            yield return null;

            using (var engine = CreateBareEngine())
            {
                engine.Execute(Sucrase, "sucrase.js");

                var jsx = new StringBuilder();
                for (int i = 0; i < 300; i++)
                    jsx.AppendLine($"export function C{i}({{ a, b }}) {{ const [s, set] = React.useState({i}); return <view className='c{i}' onClick={{() => set(s + 1)}} style={{{{ width: a ?? {i} }}}}>{{b?.map(x => <text key={{x.id}}>{{x.name}}</text>)}}</view>; }}");
                engine.SetGlobal("__src", new { code = jsx.ToString() });
                Repeat(3, 10, Ms("Sucrase transform (300 components)"), () =>
                    engine.Evaluate("Sucrase.transform(__src.code, { transforms: ['jsx', 'imports'], disableESTransforms: true, production: true, filePath: 'b.jsx' }).code.length"));

                // The async reconciler's wire format.
                engine.Execute(@"
                    globalThis.__cmds = [];
                    for (let i = 0; i < 5000; i++) __cmds.push([0, i, 'view', { className: 'item odd', style: { width: i % 7, opacity: 0.5 }, 'data-index': i }, null]);
                ");
                Repeat(3, 10, Ms("JSON round trip (5000 commands)"), () => engine.Evaluate("JSON.parse(JSON.stringify(__cmds)).length"));

                engine.Execute(@"
                    globalThis.__mixed = () => {
                        let acc = 0;
                        const m = new Map();
                        for (let i = 0; i < 40000; i++) {
                            const o = { id: i, name: 'n' + i, tags: [i & 3, i & 7], nested: { x: i * 0.5, y: -i } };
                            acc += o.nested.x + o.tags[1] + o.name.length;
                            if ((i & 15) === 0) m.set(o.name, o);
                        }
                        const arr = Array.from(m.values()).map(o => o.id).filter(x => x % 3).sort((a, b) => b - a);
                        let s = '';
                        for (let i = 0; i < 5000; i++) s += String.fromCharCode(97 + (i % 26));
                        const re = /([a-e]+)([f-j]+)/g; let hits = 0; while (re.exec(s)) hits++;
                        class P { constructor(v) { this.v = v; } get double() { return this.v * 2; } }
                        for (let i = 0; i < 30000; i++) acc += new P(i).double;
                        return acc + arr.length + hits;
                    };
                ");
                Repeat(3, 10, Ms("Mixed objects, strings, Map, regexp, classes"), () => engine.Evaluate("__mixed()"));
            }
        }

        [UGUITest(Script = "render(<view />);"), Performance]
        public IEnumerator Interop()
        {
            yield return null;

            using (var engine = CreateBareEngine())
            {
                engine.SetGlobal("__host", new HostCounter());
                engine.Execute("globalThis.__calls = () => { for (let i = 0; i < 20000; i++) __host.Add(1); return __host.Get(); };");
                Repeat(2, 10, Ms("20000 calls from JS to C#"), () => engine.Evaluate("__calls()"));

                Repeat(2, 10, Ms("2000 evaluations from C#"), () => { for (int i = 0; i < 2000; i++) engine.Evaluate("1 + " + i); });
            }
        }

        // Not a timing: the recursion headroom left on the main thread, which is what a larger
        // interpreter frame costs.
        [UGUITest(Script = NestScript), Performance]
        public IEnumerator StackHeadroom()
        {
            yield return null;

            Measure.Custom(new SampleGroup("Plain JS recursion depth", SampleUnit.Undefined, true), Convert.ToDouble(Engine.Evaluate("__depth()")));

            // An overflowing commit is reported through console.error as well as thrown.
            LogAssert.ignoreFailingMessages = true;
            int deepest = 0;
            string stoppedBy = "reached the cap";
            for (int d = 4; d <= 256; d += 4)
            {
                try
                {
                    Engine.Evaluate($"__nest({d})");
                    Context.FlushCommands();
                    if (Host.TextContent != "leaf") { stoppedBy = "tree did not commit"; break; }
                }
                catch (Exception ex)
                {
                    stoppedBy = ex.Message.Split('\n')[0];
                    break;
                }
                deepest = d;
                yield return null;
            }
            yield return null;
            LogAssert.ignoreFailingMessages = false;

            Measure.Custom(new SampleGroup("Deepest React tree committed", SampleUnit.Undefined, true), deepest);
            UnityEngine.Debug.Log($"[ScriptingBenchmarks] {Engine.Key}: React tree depth {deepest} ({stoppedBy})");
        }
    }
}
