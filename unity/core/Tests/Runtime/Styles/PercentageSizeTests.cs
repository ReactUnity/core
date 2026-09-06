using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    /// <summary>A percentage resolves against a parent that was itself sized by its children -- ReactUnity/core#89.</summary>
    public class PercentageSizeTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                return <view id='outer'>
                    <view id='content'>
                        <view id='wide' />
                        <view id='rule'><view id='inner' /></view>
                    </view>
                </view>;
            }
";

        // #content has no width of its own and nothing stretches it, so its width is the
        // 200 #wide asks for -- the shape the issue reported, where #rule came out at 0.
        const string BaseStyle = @"
            #outer { width: 400px; align-items: center; }
            #wide { width: 200px; height: 20px; }
            #rule { width: 100%; height: 4px; }
            #inner { width: 50%; height: 4px; }
";

        public PercentageSizeTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PercentageResolvesAgainstAContentSizedParent()
        {
            yield return null;
            yield return null;

            Assert.AreEqual(200, Q("#content").Layout.LayoutWidth, 0.01f);
            Assert.AreEqual(200, Q("#rule").Layout.LayoutWidth, 0.01f);
            Assert.AreEqual(100, Q("#inner").Layout.LayoutWidth, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PercentageDoesNotWidenTheParent()
        {
            yield return null;
            yield return null;

            // 300% would be 600 if it counted toward the parent's own size. It does not,
            // any more than it does on the web -- the parent stays at #wide's 200.
            Q("#rule").Style["width"] = "300%";
            yield return null;
            yield return null;

            Assert.AreEqual(200, Q("#content").Layout.LayoutWidth, 0.01f);
            Assert.AreEqual(600, Q("#rule").Layout.LayoutWidth, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AStretchedParentIsUnchanged()
        {
            yield return null;
            yield return null;

            // The other half of the contract: when the parent is sized by *its* parent,
            // the percentage already had a definite base and nothing here may move it.
            Q("#outer").Style["align-items"] = "stretch";
            yield return null;
            yield return null;

            Assert.AreEqual(400, Q("#content").Layout.LayoutWidth, 0.01f);
            Assert.AreEqual(400, Q("#rule").Layout.LayoutWidth, 0.01f);
        }
    }
}
