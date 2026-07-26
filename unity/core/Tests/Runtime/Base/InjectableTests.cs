using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class InjectableTests : TestBase
    {
        public InjectableTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = @"
            render(<view>Hello world</view>);
        ")]
        public IEnumerator RenderDirectly()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            export default function SomeComponent() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportDefaultFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            export function Example() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportedFunctionNamedExample()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            export function App() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ExportedFunctionNamedApp()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            return function SomeComponent() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ReturnedFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            function App() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ImplicitAppFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            function Example() {
                return <view>Hello world</view>;
            }
        ")]
        public IEnumerator ImplicitExampleFunction()
        {
            yield return null;
            Assert.AreEqual("Hello world", Host.TextContent);
        }

        [UGUITest(Script = @"
            import { useGlobals } from '@reactunity/renderer';

            export default function App() {
                return <view>{useGlobals ? 'yes' : 'no'}</view>;
            }
        ")]
        public IEnumerator CanImportFromRenderer()
        {
            yield return null;
            Assert.AreEqual("yes", Host.TextContent);
        }

        [UGUITest(Script = @"
            import { Button } from '@reactunity/material';

            export default function App() {
                return <view>{Button ? 'yes' : 'no'}</view>;
            }
        ")]
        public IEnumerator CanImportFromMaterial()
        {
            yield return null;
            Assert.AreEqual("yes", Host.TextContent);
        }

        [UGUITest(Script = @"
            import { FixedSizeList } from '@reactunity/material';

            export default function App() {
                return <view>{FixedSizeList ? 'yes' : 'no'}</view>;
            }
        ")]
        public IEnumerator CanImportVirtualScroll()
        {
            yield return null;
            Assert.AreEqual("yes", Host.TextContent);
        }
    }
}
