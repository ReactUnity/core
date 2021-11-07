using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InjectableTests : TestBase
    {
        public InjectableTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(@"
            Renderer.render(<view>Hello world</view>);
        ")]
        public IEnumerator RendererRender()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            ReactUnity.Renderer.render(<view>Hello world</view>);
        ")]
        public IEnumerator ReactUnityRendererRender()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            render(<view>Hello world</view>);
        ")]
        public IEnumerator RenderDirectly()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            export default function SomeComponent() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportDefaultFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            export function Example() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportedFunctionNamedExample()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            export function App() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportedFunctionNamedApp()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [ReactInjectableTest(@"
            return function SomeComponent() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ReturnedFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }
    }
}
