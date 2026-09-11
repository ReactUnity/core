using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class StyleComponentTests : EditorTestBase
    {
        public StyleComponentTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {!globals.disable && <style scope=':root'>{'#test { color: blue; }'}</style>}
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }
        ")]
        public IEnumerator StyleTagShouldStyleComponents()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);

            Globals["disable"] = true;
            yield return null;
            Assert.AreEqual(Color.clear, rt.style.color.value);
        }


        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='testScope'>
                        <view id='test'>Test text</view>
                    </view>
                    <view id='non-test'>Test text</view>
                    {!globals.disable &&
                        <style scope='#testScope'>{':scope view { color: blue; }'}</style>}
                </>;
            }
        ")]
        public IEnumerator StyleTagShouldRespectScope()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            var cmp2 = Q("#non-test") as UIToolkitComponent<VisualElement>;
            var rt2 = cmp2.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);
            Assert.AreEqual(Color.clear, rt2.style.color.value);
        }


        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='testScope'>
                        <view id='test'>Test text</view>
                        {!globals.disable &&
                            <style scope=':parent'>{':scope view { color: blue; }'}</style>}
                    </view>
                    <view id='non-test'>Test text</view>
                </>;
            }
        ")]
        public IEnumerator ParentScopedStyleTagShouldAffectParentOnly()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            var cmp2 = Q("#non-test") as UIToolkitComponent<VisualElement>;
            var rt2 = cmp2.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);
            Assert.AreEqual(Color.clear, rt2.style.color.value);
        }

        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <style active={!globals.disable} scope=':root'>{'#test { color: blue; }'}</style>
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }
        ")]
        public IEnumerator ActivePropertyShouldWorkForStyleTag()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);

            Globals["disable"] = true;
            yield return null;
            Assert.AreEqual(Color.clear, rt.style.color.value);
        }


        // A <style> is a ProxyComponent, so it is not in the component tree: SetParent goes to the
        // NoopComponent it wraps, which only records a parent. That left the weak Refs table as the
        // only thing holding it, and a collection here made every later command for its ref a no-op
        // -- the flake this test pins down, which showed up as an occasional live stylesheet under
        // QuickJS only because its engine teardown forces a full managed collection.
        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <style active={!globals.disable} scope=':root'>{'#test { color: blue; }'}</style>
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }
        ")]
        public IEnumerator StyleTagIsNotCollectedWhileMounted()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);

            System.GC.Collect();
            System.GC.WaitForPendingFinalizers();
            System.GC.Collect();

            Globals["disable"] = true;
            yield return null;
            Assert.AreEqual(Color.clear, rt.style.color.value);
        }
    }
}
