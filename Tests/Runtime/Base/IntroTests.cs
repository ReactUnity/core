using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class IntroTests : TestBase
    {
        public IntroTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest()]
        public IEnumerator EnsureCorrectEngineIsUsed()
        {
            yield return null;
            Assert.AreEqual(EngineType, Context.Script.EngineType);
        }

        [ReactInjectableTest(style: @"
            view { color: red; }
            view.blueClass { color: blue; }
            view.greenClass { color: magenta; }
            #test-id { color: white; }
")]
        public IEnumerator ClassListChangesCausesRerender()
        {
            var view = Q("view");

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);

            view.ClassList.Add("blueClass");
            yield return null;
            Assert.AreEqual(Color.blue, tmp.color);

            view.ClassName = "class-something another-class greenClass";
            yield return null;
            Assert.AreEqual(Color.magenta, tmp.color);

            view.Id = "test-id";
            yield return null;
            Assert.AreEqual(Color.white, tmp.color);
        }

        [ReactInjectableTest(@"
            render(
                <view>
                    Hello world
                    <view>Hello again</view>
                    <view>
                        Somehow
                        <view> just hello</view>
                    </view>
                </view>
            );
        ")]
        public IEnumerator TextContent_IsCorrect()
        {
            yield return null;

            Assert.AreEqual("Hello worldHello againSomehow just hello", Host.TextContent);
        }

        [ReactInjectableTest(@"
            render(<view>Hello world</view>);
            render(<view>Hello world 2</view>);
        ")]
        public IEnumerator RerenderOfRootElementWorks()
        {
            yield return null;

            Assert.AreEqual("Hello world 2", Host.TextContent);
        }

        [ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image active={globals.active} />;
            }
        ")]
        public IEnumerator ActivePropertyShouldSetGameObjectActive()
        {
            yield return null;
            var cmp = (Q("image") as UGUI.ImageComponent).GameObject;
            Assert.AreEqual(false, cmp.activeSelf);

            Globals.Set("active", true);
            yield return null;
            Assert.AreEqual(true, cmp.activeSelf);

            Globals.Set("active", 0);
            yield return null;
            Assert.AreEqual(false, cmp.activeSelf);
        }

        [ReactInjectableTest]
        public IEnumerator HostNameCanBeChanged()
        {
            yield return null;
            Assert.AreEqual("REACT_ROOT", Host.GameObject.name);

            Host.Name = "hey";
            Assert.AreEqual("hey", Host.GameObject.name);

            Host.Name = null;
            Assert.AreEqual("REACT_ROOT", Host.GameObject.name);
        }

        [ReactInjectableTest]
        public IEnumerator ElementsAreRenderedInTheSameLayerAsHost()
        {
            yield return null;
            System.Func<Transform, IEnumerable<Transform>> selectAllChildren = null;
            selectAllChildren = (Transform tr) => tr.OfType<Transform>().SelectMany(x => selectAllChildren(x)).Concat(new List<Transform>() { tr });
            var elements = selectAllChildren(Host.RectTransform);

            foreach (var item in elements)
            {
                Assert.AreEqual(Host.GameObject.layer, item.gameObject.layer);
            }
        }
    }
}
