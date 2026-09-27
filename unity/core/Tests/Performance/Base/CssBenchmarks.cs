using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using NUnit.Framework;
using ReactUnity.Scripting;
using Unity.PerformanceTesting;
using UnityEngine;
using UnityEngine.Profiling;

namespace ReactUnity.Tests.Performance
{
    // Times the style engine against the kitchen-sink's real Tailwind 4 build: parsing it, matching
    // and resolving a tree of its utility classes, and the per-frame cost of an animated ancestor.
    public class CssBenchmarks : PerfTestBase
    {
        public CssBenchmarks(JavascriptEngineType engineType) : base(engineType) { }

        // Each card is 13 elements: the card, a header and its text, and five rows with theirs.
        const string TreeScript = @"
            let setState;
            function pick(list, i, k) { let s = ''; for (let j = 0; j < k; j++) s += list[(i * 7 + j * 13) % list.length] + ' '; return s; }
            function App() {
                const [state, set] = React.useState({ n: 0, v: 0 });
                setState = set;
                if (!state.n) return <view className='bench-root' />;
                const list = __cls.value.split(' ');
                const cards = [];
                for (let i = 0; i < state.n; i++) {
                    const rows = [];
                    for (let r = 0; r < 5; r++) rows.push(<view key={r} className={pick(list, i * 5 + r + state.v, 5)}>{'Row ' + r}</view>);
                    cards.push(<view key={i} className={'card ' + pick(list, i + state.v, 4)}><view className={pick(list, i + 1000, 3)}>{'Card ' + i}</view>{rows}</view>);
                }
                return <view className='bench-root'>{cards}</view>;
            }
            globalThis.__mount = (n, v) => ReactUnity.flushSync(() => setState({ n, v }));
            render(<App />);
        ";

        const int Cards = 40;

        const string AnimationCss = @"
            @keyframes bench-pulse { from { opacity: 1; translate: 0 0; } to { opacity: 0.5; translate: 10px 0; } }
            .bench-root.pulse { animation: bench-pulse 1s infinite alternate; }
            .bench-root.fade > .card { transition: opacity 2s linear; }
            .bench-root.fade.faded > .card { opacity: 0.2; }
        ";

        static SampleGroup Ms(string name) => new SampleGroup(name, SampleUnit.Millisecond, false);

        IJavaScriptEngine Engine => Context.Script.Engine;

        static void Time(SampleGroup group, Action action)
        {
            var sw = Stopwatch.StartNew();
            action();
            Measure.Custom(group, sw.Elapsed.TotalMilliseconds);
        }

        static string KitchenSinkCss
        {
            get
            {
                var path = Path.GetFullPath(Path.Combine(Application.dataPath, "../../kitchen-sink/Assets/Resources/react/assets/index.css.css"));
                if (!File.Exists(path)) Assert.Ignore("The kitchen-sink stylesheet is not at " + path);
                return File.ReadAllText(path);
            }
        }

        // The utility classes that are a rule of their own, unescaped the way a className spells them.
        static string UtilityClasses(string css) =>
            string.Join(" ", Regex.Matches(css, @"[{}]\.((?:[a-zA-Z0-9_-]|\\.)+)(?::hover)?\{")
                .Cast<Match>().Select(m => m.Groups[1].Value.Replace("\\", "")).Distinct());

        void Mount(int n, int v)
        {
            Engine.Evaluate($"__mount({n}, {v})");
            Context.FlushCommands();
        }

        // Every getter NodeStyle has, compiled once, which is what a framework's apply reads from.
        static readonly Func<Styling.NodeStyle, object>[] Getters = typeof(Styling.NodeStyle)
            .GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance)
            .Where(p => p.DeclaringType == typeof(Styling.NodeStyle) && p.CanRead && p.GetIndexParameters().Length == 0 && p.PropertyType != typeof(Styling.NodeStyle))
            .Select(p =>
            {
                var style = System.Linq.Expressions.Expression.Parameter(typeof(Styling.NodeStyle));
                var body = System.Linq.Expressions.Expression.Convert(System.Linq.Expressions.Expression.Property(style, p), typeof(object));
                return System.Linq.Expressions.Expression.Lambda<Func<Styling.NodeStyle, object>>(body, style).Compile();
            })
            .ToArray();

        static void ReadAll(List<IReactComponent> elements)
        {
            foreach (var e in elements)
            {
                var style = e.ComputedStyle;
                if (style == null) continue;
                for (int i = 0; i < Getters.Length; i++) Getters[i](style);
            }
        }

        IEnumerable<IReactComponent> Elements(IReactComponent root)
        {
            yield return root;
            if (root is IContainerComponent c && c.Children != null)
                foreach (var child in c.Children)
                    foreach (var x in Elements(child)) yield return x;
        }

        [UGUITest(Script = "render(<view />);"), Performance]
        public IEnumerator ParseStylesheet()
        {
            yield return null;
            var css = KitchenSinkCss;

            var parse = Ms("Parse (ExCSS only)");
            var insert = Ms("Insert sheet");
            var remove = Ms("Remove sheet");

            for (int it = 0; it < 12; it++)
            {
                var warm = it < 2;
                var sw = Stopwatch.StartNew();
                Context.StyleParser.Parse(css);
                if (!warm) Measure.Custom(parse, sw.Elapsed.TotalMilliseconds);

                sw.Restart();
                var sheet = Context.InsertStyle(css);
                if (!warm) Measure.Custom(insert, sw.Elapsed.TotalMilliseconds);

                sw.Restart();
                Context.RemoveStyle(sheet);
                if (!warm) Measure.Custom(remove, sw.Elapsed.TotalMilliseconds);
                yield return null;
            }
        }

        static void CollectStyleRules(IEnumerable<ExCSS.IStylesheetNode> nodes, List<ExCSS.StyleRule> into)
        {
            foreach (var node in nodes)
            {
                if (node is ExCSS.StyleRule rule)
                {
                    into.Add(rule);
                    CollectStyleRules(rule.NestedRules, into);
                }
                else if (node is ExCSS.IGroupingRule group) CollectStyleRules(group.Rules, into);
                else if (node is ExCSS.ILayerRule layer) CollectStyleRules(layer.Rules, into);
            }
        }

        // Where inserting a sheet goes beyond the parse: its selectors into a rule tree, and its declarations into values.
        [UGUITest(Script = "render(<view />);"), Performance]
        public IEnumerator InsertBreakdown()
        {
            yield return null;
            var rules = new List<ExCSS.StyleRule>();
            CollectStyleRules(Context.StyleParser.Parse(KitchenSinkCss).Children, rules);
            UnityEngine.Debug.Log($"[CssBenchmarks] {rules.Count} style rules");

            var selectors = Ms("Add every selector to a rule tree");
            var declarations = Ms("Convert every declaration block");

            for (int it = 0; it < 12; it++)
            {
                var tree = new Styling.Rules.StyleTree();
                var sw = Stopwatch.StartNew();
                foreach (var rule in rules)
                    if (!string.IsNullOrWhiteSpace(rule.SelectorText)) tree.AddSelector(rule.Selector.StylesheetText?.Text ?? rule.SelectorText);
                if (it >= 2) Measure.Custom(selectors, sw.Elapsed.TotalMilliseconds);

                sw.Restart();
                foreach (var rule in rules)
                {
                    Styling.Rules.RuleHelpers.ConvertStyleDeclarationToRecord(rule.Style, false);
                    Styling.Rules.RuleHelpers.ConvertStyleDeclarationToRecord(rule.Style, true);
                }
                if (it >= 2) Measure.Custom(declarations, sw.Elapsed.TotalMilliseconds);
                yield return null;
            }
        }

        [UGUITest(Script = TreeScript), Performance]
        public IEnumerator ResolveTree()
        {
            yield return null;
            var css = KitchenSinkCss;
            Context.InsertStyle(css);
            Engine.SetGlobal("__cls", new { value = UtilityClasses(css) });
            yield return null;

            var mount = Ms($"Mount {Cards * 13} elements (JS + commands)");
            var firstUpdate = Ms("First update (resolve + apply)");
            var match = Ms("Match rules for every element");
            var resolve = Ms("Recompute every style");
            var apply = Ms("Apply every recomputed style");
            var toggle = Ms("Toggle a class on the root");
            var hover = Ms("Hover one card");
            var readCold = Ms($"Read all {Getters.Length} properties, fresh styles");
            var readWarm = Ms($"Read all {Getters.Length} properties again");

            for (int w = 0; w < 2; w++)
            {
                Mount(Cards, w); Context.UpdateElementsRecursively(); yield return null;
                Mount(0, 0); yield return null;
            }

            for (int it = 0; it < 10; it++)
            {
                Time(mount, () => Mount(Cards, it));
                Time(firstUpdate, () => Context.UpdateElementsRecursively());
                yield return null;
                yield return null;

                var elements = Elements(Host).ToList();
                var tree = Context.Style.StyleTree;
                Time(match, () => { foreach (var e in elements) tree.GetMatchingRules(e).ToList(); });

                Time(resolve, () => Host.ResolveStyle(true));
                Time(apply, () => Context.UpdateElementsRecursively());
                yield return null;

                var root = Host.Children[0];
                Time(toggle, () => { root.ClassList.Toggle("dark"); Context.UpdateElementsRecursively(); });
                yield return null;

                var card = ((IContainerComponent) root).Children[it];
                Time(hover, () => { card.StateStyles.StartState("hover"); Context.UpdateElementsRecursively(); });
                card.StateStyles.EndState("hover");
                yield return null;

                elements = Elements(Host).ToList();
                Host.ResolveStyle(true);
                Time(readCold, () => ReadAll(elements));
                Time(readWarm, () => ReadAll(elements));
                Context.UpdateElementsRecursively();
                yield return null;

                Mount(0, 0);
                yield return null;
            }
        }

        // What an animated or transitioning element costs each frame, which reaches its whole subtree.
        [UGUITest(Script = TreeScript), Performance]
        public IEnumerator AnimatedAncestor()
        {
            yield return null;
            var css = KitchenSinkCss;
            Context.InsertStyle(css);
            Context.InsertStyle(AnimationCss);
            Engine.SetGlobal("__cls", new { value = UtilityClasses(css) });
            Mount(Cards, 0);
            yield return null;
            yield return null;

            var markers = new[] { "Update", "ResolveStyle", "StyleState.Update", "ApplyStyles", "LateUpdate", "Layout" };
            var recorders = markers.Select(m => Recorder.Get("ReactUnity." + m)).ToArray();
            foreach (var r in recorders) r.enabled = true;

            var root = Host.Children[0];

            IEnumerator Sample(string label, int frames)
            {
                var groups = markers.Select(m => Ms($"{label}: {m}")).ToArray();
                // Recorders report the frame before, so the first one read after a change is skipped.
                // The test context's clock only moves when told to.
                yield return AdvanceTime(1f / 60);
                for (int f = 0; f < frames; f++)
                {
                    yield return AdvanceTime(1f / 60);
                    for (int i = 0; i < markers.Length; i++) Measure.Custom(groups[i], recorders[i].elapsedNanoseconds / 1e6);
                }
            }

            yield return Sample("Idle", 20);

            root.ClassList.Add("pulse");
            yield return Sample("Animated root", 40);
            root.ClassList.Remove("pulse");

            root.ClassList.Add("fade");
            yield return null;
            root.ClassList.Add("faded");
            yield return Sample("Transitioning cards", 40);

            foreach (var r in recorders) r.enabled = false;
        }
    }
}
