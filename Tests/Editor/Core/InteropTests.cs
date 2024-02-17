using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests.Editor
{
    public class InteropTests : EditorTestBase
    {
        public InteropTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    SomeLogTest{console.log('Test')}
                </text>;
            }
        ")]
        public IEnumerator ConsoleLogShouldNotBreakUIWhenItsReturnValueIsPassedAsChildren()
        {
            yield return null;
            var text = Q("text").TextContent;
            Assert.AreEqual("SomeLogTest", text);
        }


        [EditorInjectableTest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    SomeLogTest{globals.VoidFn()}
                </text>;
            }
        ", AutoRender = false)]
        public IEnumerator VoidResultShouldNotBreakUIWhenItsReturnValueIsPassedAsChildren()
        {
            Globals["VoidFn"] = new Action(() => { });
            Render();
            yield return null;
            var text = Q("text").TextContent;
            Assert.AreEqual("SomeLogTest", text);
        }


        [EditorInjectableTest(Script = @"
            function App() {  };

            Assert.AreEqual(5, Globals.a);
        ", AutoRender = false)]
        public IEnumerator GlobalsKeysCanBeAccessedNaturally()
        {
            Globals["a"] = 5;
            yield return null;
            Render();
        }

        [EditorInjectableTest(Script = @"
            function App() {  };

            Globals.Set('a', 5);
            Assert.AreEqual(5, Globals.a);
        ", AutoRender = false)]
        public IEnumerator GlobalsGetChangedOnCsharpSide()
        {
            yield return null;
            Render();
            Assert.AreEqual(Globals, Context.Globals);
            Assert.AreEqual(5, Globals["a"]);
            Assert.AreEqual(5, Context.Globals["a"]);
        }

        [EditorInjectableTest(Script = @"
            function App() {  };

            Assert.AreEqual(1, Globals.dict.a);
            Assert.AreEqual(2, Globals.dict.b);
            Assert.AreEqual(3, Globals.dict.c);

            var res = Object.keys(Globals.dict);
            Assert.AreEqual(3, res.length);
            Assert.AreEqual('a,b,c', res.join(','));
        ", AutoRender = false)]
        public IEnumerator DictionaryKeysCanBeRetrieved()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            var dict = new Dictionary<string, object>{
                { "a", 1 },
                { "b", 2 },
                { "c", 3 },
            };


            Globals["dict"] = dict;
            yield return null;
            Render();
        }


        [EditorInjectableTest(Script = @"
            function App() {  };

            Assert.AreEqual(2, Globals.list.length);
            Assert.AreEqual(5, Globals.list[0]);
            Assert.AreEqual(7, Globals.list[1]);

            Assert.AreEqual(12, [...Globals.list].reduce((acc, x) => acc + x));
        ", AutoRender = false)]
        public IEnumerator ListItemsCanBeAccessedNaturally()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            Globals["list"] = new List<int>() { 5, 7 };
            yield return null;
            Render();
        }

        [EditorInjectableTest(Script = @"
            function App() {  };

            Assert.AreEqual(12, Globals.list.reduce((acc, x) => acc + x));
            Globals.list.splice(1, 1, 9, 11);
            Assert.AreEqual(3, Globals.list.length);
            Assert.AreEqual(25, Globals.list.reduce((acc, x) => acc + x));

            Globals.list.length = 2;
            Assert.AreEqual(14, Globals.list.reduce((acc, x) => acc + x));

            Globals.list.length = 4;
            Assert.AreEqual(4, Globals.list.length);
            Assert.AreEqual(0, Globals.list[3]);

            Globals.list.push(3);
            Assert.AreEqual(3, Globals.list[4]);
        ", AutoRender = false)]
        public IEnumerator ListsCanHaveArrayPrototypeMethods()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);
            IgnoreForEngine(JavascriptEngineType.Jint);

            Globals["list"] = new List<int>() { 5, 7 };
            yield return null;
            Render();
        }


        [EditorInjectableTest(Script = @"
            function App() {  };

            Assert.AreEqual(2, Globals.list.length);
            Assert.AreEqual(5, Globals.list[0]);
            Assert.AreEqual(7, Globals.list[1]);

            Assert.AreEqual(12, [...Globals.list].reduce((acc, x) => acc + x));
            Assert.AreEqual(12, Globals.list.reduce((acc, x) => acc + x));
        ", AutoRender = false)]
        public IEnumerator ArrayItemsCanBeAccessedNaturally()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            Globals["list"] = new int[] { 5, 7 };
            yield return null;
            Render();
        }


        [EditorInjectableTest(Script = @"
            function App() {  };

            (async function() {
                await Globals.task0;
                Globals.task0Done = true;
            })();

            (async function() {
                await Globals.task1;
                Globals.task1Done = true;
            })();

            (async function() {
                const res = await Globals.task2;
                Assert.AreEqual(3, res);
                Globals.task2Done = true;
            })();

            (async function() {
                let failed = false;
                try {
                    await Globals.task3;
                    Assert.Fail('Task was not canceled');
                } catch(err) {
                    failed = true;
                    Assert.AreEqual('fall', err.Message);
                }
                Globals.task3Done = true;
                Assert.True(failed);
            })();

            (async function() {
                const res = await Globals.task4;
                Assert.AreEqual(7, res);
                Globals.task4Done = true;
            })();
        ", AutoRender = false)]
        public IEnumerator TasksCanBeUsedNaturally()
        {
            IgnoreForEngine(JavascriptEngineType.Jint);

            var t0 = Task.CompletedTask;
            var t1 = new TaskCompletionSource<int>();
            var t2 = new TaskCompletionSource<int>();
            var t3 = new TaskCompletionSource<int>();
            var t4 = new TaskCompletionSource<int>();
            var valueTask = new ValueTask(t4.Task);

            Globals["task0"] = t0;
            Globals["task1"] = t1.Task;
            Globals["task2"] = t2.Task;
            Globals["task3"] = t3.Task;
            Globals["task4"] = valueTask;

            Globals["task0Done"] = false;
            Globals["task1Done"] = false;
            Globals["task2Done"] = false;
            Globals["task3Done"] = false;
            Globals["task4Done"] = false;

            Render();

            yield return null;
            yield return null;

            Assert.True((bool) Globals["task0Done"]);
            Assert.False((bool) Globals["task1Done"]);
            Assert.False((bool) Globals["task2Done"]);
            Assert.False((bool) Globals["task3Done"]);
            Assert.False((bool) Globals["task4Done"]);

            t1.SetResult(0);
            t1.Task.Wait();
            yield return null;
            Assert.True((bool) Globals["task1Done"]);


            t2.SetResult(3);
            t2.Task.Wait();
            yield return null;
            Assert.True((bool) Globals["task2Done"]);


            if (EngineType != JavascriptEngineType.ClearScript)
            {
                // Doesn't work for ClearScript for some reason

                t3.SetException(new Exception("fall"));
                try { t3.Task.Wait(); } catch { }
                yield return null;
                Assert.True((bool) Globals["task3Done"]);


                // Value tasks aren't supported in ClearScript

                t4.SetResult(7);
                t4.Task.Wait();
                yield return null;
                Assert.True((bool) Globals["task4Done"]);
            }
        }
    }
}
