using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;

namespace ReactUnity.Editor.Tests
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
    }
}
