using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Auto, Category = "ClearScript")]
    public class QuerySelectorTests : TestBase
    {
        public QuerySelectorTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
<view id='v1' className='v1class'>
    <view id='v1v1' className='vv1class'>
        <text id='v1v1t1' className='t1class'>t1content</text>
        <text id='v1v1t2' className='t2class'>t2content</text>
        <text id='v1v1t3' className='t3class'>t3content</text>
        <text id='v1v1t4' className='t4class'></text>
    </view>
    <view id='v1v2' className='vv2class'>
    </view>
    <view id='v1v3' className='vv3class'>
        <text id='v1v3t1' className='t1class'></text>
    </view>
    <view id='v1v4' className='vv4class'>
        <text id='v1v4t2' className='t2class'></text>
    </view>
    <view id='v1v5' className='vv4class'>
    </view>
</view>
<view id='v2' className='v2class'>
    <view id='v2v1' className='vv1class'>
    </view>
    <view id='v2v2' className='vv2class'>
    </view>
    <view id='v2v3' className='vv3class'>
    </view>
    <view id='v2v4' className='vv4class'>
    </view>
</view>
<view id='v3' className='v3class'>
    <view id='v3v1' className='vv1class'>
    </view>
    <view id='v3v2' className='vv2class'>
    </view>
    <view id='v3v3' className='vv3class'>
    </view>
    <view id='v3v4' className='vv4class'>
    </view>
</view>
<view id='v4' className='v4class'>
    <view id='v4v1' className='vv1class'>
    </view>
    <view id='v4v2' className='vv2class'>
    </view>
    <view id='v4v3' className='vv3class'>
    </view>
    <view id='v4v4' className='vv4class'>
    </view>
</view>
<view id='v5' className='v5class'>
    <view id='v5v1' className='vv1class'>
    </view>
    <view id='v5v2' className='vv2class'>
    </view>
    <view id='v5v3' className='vv3class'>
    </view>
    <view id='v5v4' className='vv4class'>
        <text id='v5v4t1' className='t1class'></text>
        <text id='v5v4t2' className='t2class'></text>
        <text id='v5v4t3' className='t3class'></text>
        <text id='v5v4t4' className='t4class'></text>
    </view>
</view>
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"";

        [ReactInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        [TestCase(null, "*")]
        [TestCase("v1", "view")]
        [TestCase("v1", ":root > view")]
        [TestCase("v1", ":scope > view")]
        [TestCase("v1", "#v1")]
        [TestCase("v1", ".v1class")]
        [TestCase("v2", ":scope > view + view")]
        [TestCase("v2", ":scope > * + *")]
        [TestCase("v2", ":scope > * + view")]
        [TestCase("v2", ":scope > view + *")]
        [TestCase("v2", ":scope > view ~ view")]
        [TestCase("v4", ":scope > #v3 ~ view")]
        [TestCase("v5", ":scope > #v3 ~ view ~ view")]
        [TestCase(null, ":scope > #v3 ~ view ~ view ~ view")]
        [TestCase("v1v2", "view:empty")]
        [TestCase("v1v1t4", "*:empty")]
        [TestCase("v1v1t4", "text:empty")]
        [TestCase("v1v4", "view:nth-child(4)")]
        [TestCase("v1v1t4", "*:nth-child(4)")]
        public void QuerySelector(string id, string query)
        {
            Assert.AreEqual(id, Q(query)?.Id);
        }

        [ReactInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        [TestCase("#v1", "v1", "*")]
        [TestCase("#v1", "v1", "view")]
        [TestCase("#v1", "v1", ":root > view")]
        [TestCase("#v1", null, ":scope > #v1")]
        [TestCase("#v1", "v1v1", ":scope > view")]
        [TestCase("#v1", "v1v1", "#v1v1")]
        [TestCase("#v1", "v1v1", ".vv1class")]
        [TestCase("#v1", "v1v2", ":scope > view + view")]
        [TestCase("#v1", "v1v2", ":scope > * + *")]
        [TestCase("#v1", "v1v2", ":scope > * + view")]
        [TestCase("#v1", "v1v2", ":scope > view + *")]
        [TestCase("#v1", "v1v2", ":scope > view ~ view")]
        [TestCase("#v1", "v1v4", ":scope > #v1v3 ~ view")]
        [TestCase("#v1", "v1v5", ":scope > #v1v3 ~ view ~ view")]
        [TestCase("#v1", null, ":scope > #v3 ~ view ~ view ~ view")]
        [TestCase("#v1", "v1v1t4", "text:empty")]
        [TestCase("#v1", "v1v1t4", "*:nth-child(4)")]
        public void ScopedQuerySelector(string scope, string id, string query)
        {
            var scoped = Q(scope);
            Assert.AreEqual(id, Q(query, scoped)?.Id);
        }

        [ReactInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        public IEnumerator RootQuerySelector()
        {
            yield return null;
            Assert.AreEqual(Host, Q(":root"));
            Assert.AreEqual(Host, Q(":scope"));
            Assert.AreEqual(Host, Q("*"));
        }
    }
}
