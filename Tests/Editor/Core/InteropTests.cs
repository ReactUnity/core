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
        ", AutoRender = false)]
        [Ignore("Not implemented")]
        public IEnumerator TasksCanBeUsedNaturally()
        {
            var t1 = new TaskCompletionSource<int>();
            var t2 = new TaskCompletionSource<int>();
            var t3 = new TaskCompletionSource<int>();

            Globals["task1"] = t1.Task;
            Globals["task2"] = t2.Task;
            Globals["task3"] = t3.Task;

            Globals["task1Done"] = false;
            Globals["task2Done"] = false;
            Globals["task3Done"] = false;

            Render();

            yield return null;

            Assert.False((bool) Globals["task1Done"]);
            Assert.False((bool) Globals["task2Done"]);
            Assert.False((bool) Globals["task3Done"]);

            t1.SetResult(0);
            yield return null;
            Assert.True((bool) Globals["task1Done"]);


            t2.SetResult(3);
            yield return null;
            Assert.True((bool) Globals["task2Done"]);


            t3.SetException(new Exception("fall"));
            yield return null;
            Assert.True((bool) Globals["task3Done"]);
        }
    }
}
