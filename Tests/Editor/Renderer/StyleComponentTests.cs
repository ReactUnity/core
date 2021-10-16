using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class StyleComponentTests : EditorTestBase
    {
        public StyleComponentTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {!globals.disable && <style scope=':root'>{'#test { color: blue; }'}</style>}
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }

            Renderer.render(<App />);
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


        [EditorInjectableTest(@"
            function App() {
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

            Renderer.render(<App />);
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


        [EditorInjectableTest(@"
            function App() {
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

            Renderer.render(<App />);
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

        [EditorInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <style active={!globals.disable} scope=':root'>{'#test { color: blue; }'}</style>
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }

            Renderer.render(<App />);
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
    }
}
