using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class HasSelectorTests : TestBase
    {
        public HasSelectorTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='root'>
                    <view id='first' className={globals.firstClass || ''}>
                        <view id='inner' />
                    </view>
                    <view id='second'>
                        {globals.showDeep && <view id='deep' className='deep' />}
                    </view>
                    <view id='third' />
                </view>;
            }
        ";

        const string BaseStyle = @"
            #root, #first, #inner, #third { color: black; }
            #root:has(.deep) { color: red; }
            #first:has(~ #second .deep) { color: blue; }
            #first:has(~ #second .deep) > #inner { color: white; }
            #root:has(> .marked) { color: lime; }
            #root:has(> .marked) #third { color: magenta; }
            #root:has([data-flag]) { color: cyan; }
        ";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnchorsRestyleWhenTheirSubtreeChanges()
        {
            yield return null;
            var root = Q("#root");
            var first = Q("#first");
            var inner = Q("#inner");
            var third = Q("#third");

            Assert.AreEqual(Color.black, root.ComputedStyle.color);
            Assert.AreEqual(Color.black, first.ComputedStyle.color);
            Assert.AreEqual(Color.black, inner.ComputedStyle.color);

            // An element inserted two levels down, under a later sibling of the anchor.
            Globals["showDeep"] = true;
            yield return null;
            yield return null;

            Assert.AreEqual(Color.red, root.ComputedStyle.color);
            Assert.AreEqual(Color.blue, first.ComputedStyle.color);
            Assert.AreEqual(Color.white, inner.ComputedStyle.color);

            Globals["showDeep"] = false;
            yield return null;
            yield return null;

            Assert.AreEqual(Color.black, root.ComputedStyle.color);
            Assert.AreEqual(Color.black, first.ComputedStyle.color);
            Assert.AreEqual(Color.black, inner.ComputedStyle.color);

            // A class change on a child, reaching the parent and a later sibling of the child.
            Globals["firstClass"] = "marked";
            yield return null;
            yield return null;

            Assert.AreEqual(Color.green, root.ComputedStyle.color);
            Assert.AreEqual(Color.magenta, third.ComputedStyle.color);

            Globals["firstClass"] = "";
            yield return null;
            yield return null;

            Assert.AreEqual(Color.black, root.ComputedStyle.color);
            Assert.AreEqual(Color.black, third.ComputedStyle.color);

            // A data attribute set from C#.
            third.SetData("flag", true);
            yield return null;

            Assert.AreEqual(Color.cyan, root.ComputedStyle.color);

            third.SetData("flag", null);
            yield return null;

            Assert.AreEqual(Color.black, root.ComputedStyle.color);
        }
    }
}
