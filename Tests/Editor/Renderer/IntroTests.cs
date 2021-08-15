using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class IntroTests : EditorTestBase
    {
        public IntroTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(@"
            Renderer.render(
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

        [EditorInjectableTest]
        public IEnumerator HostNameCanBeChanged()
        {
            yield return null;
            Assert.AreEqual(null, Host.Name);

            Host.Name = "hey";
            Assert.AreEqual("hey", Host.Name);

            Host.Name = null;
            Assert.AreEqual(null, Host.Name);
        }
    }
}
