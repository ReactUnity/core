using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Auto, Category = "Query")]
    public class QuerySelectorTests : TestBase
    {
        public QuerySelectorTests(JavascriptEngineType engineType) : base(engineType) { }

        const string Elements = @"
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
";

        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
" + Elements + @"
                </>;
            }
        ";

        const string HtmlScript = @"
            const htmlContent = `" + Elements + @"`;

            function App() {
                const globals = ReactUnity.useGlobals();
                return <html content={htmlContent} />;
            }
        ";

        const string BaseStyle = @"";

        [UGUITest(Script = BaseScript, Style = BaseStyle, SkipIfExisting = true)]
        [TestCase(null, "*", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":root > view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":root>view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope > view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope>view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "#v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ".v1class", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > *+view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v4", ":scope > #v3 ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v5", ":scope > #v3 ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase(null, ":scope > #v3 ~ view ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v2", "view:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "text:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(4)", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(4)", ExpectedResult = typeof(IEnumerator))]
        public IEnumerator QuerySelector(string id, string query)
        {
            yield return null;
            Assert.AreEqual(id, Q(query)?.Id);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle, SkipIfExisting = true)]
        [TestCase("#v1", "v1", "*", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1", "view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1", ":root > view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", null, ":scope > #v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v1", ":scope > view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v1", "#v1v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v1", ".vv1class", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v2", ":scope > view + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v2", ":scope > * + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v2", ":scope > * + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v2", ":scope > view + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v2", ":scope > view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v4", ":scope > #v1v3 ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v5", ":scope > #v1v3 ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", null, ":scope > #v3 ~ view ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v1t4", "text:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("#v1", "v1v1t4", "*:nth-child(4)", ExpectedResult = typeof(IEnumerator))]
        public IEnumerator ScopedQuerySelector(string scope, string id, string query)
        {
            yield return null;
            var scoped = Q(scope);
            Assert.AreEqual(id, Q(query, scoped)?.Id);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle, SkipIfExisting = true)]
        public IEnumerator RootQuerySelector()
        {
            yield return null;
            Assert.AreEqual(Host, Q(":root"));
            Assert.AreEqual(Host, Q(":scope"));
            Assert.AreEqual(Host, Q("*"));
        }


        [UGUITest(Script = BaseScript, Style = BaseStyle, SkipIfExisting = true)]
        [TestCase("v1", "view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":root > view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope > view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "#v1", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ".v1class", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + *", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + *", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view ~ view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v4", ":scope > #v3 ~ view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v5", ":scope > #v3 ~ view ~ view", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v2", "view:empty", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:empty", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "text:empty", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(4)", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(4)", true, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "viewa", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":root > viewa", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope > viewa", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "#v", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ".v1cla", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view2 + view", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + * + *", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + * + view", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + view + *", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view ~ view ~ view", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v4", ":scope > #v4 ~ view", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v5", ":scope > #v4 ~ view ~ view", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1", "view:empty", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t3", "*:empty", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t3", "text:empty", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(5)", false, ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(5)", false, ExpectedResult = typeof(IEnumerator))]
        public IEnumerator Matches(string id, string query, bool result)
        {
            yield return null;
            Assert.AreEqual(result, Q("#" + id)?.Matches(query));
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle, SkipIfExisting = true)]
        [TestCase("v1", "view", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":root > view", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope > view", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "#v1", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ".v1class", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + view", "v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + *", "v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + view", "v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + *", "v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view ~ view", "v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v4", ":scope > #v3 ~ view", "v4", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v5", ":scope > #v3 ~ view ~ view", "v5", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v2", "view:empty", "v1v2", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:empty", "v1v1t4", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "text:empty", "v1v1t4", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(4)", "v1v4", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(4)", "v1v1t4", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v2", "view:not(#v1v2)", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:not(:empty)", "v1v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "view", "v1v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(1)", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(1)", "v1v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", ":scope > *:nth-child(1)", "v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", ":scope > *:nth-child(2)", null, ExpectedResult = typeof(IEnumerator))]
        public IEnumerator Closest(string id, string query, string resultId)
        {
            yield return null;
            Assert.AreEqual(resultId, Q("#" + id)?.Closest(query)?.Id);
        }

        [UGUITest(Script = HtmlScript, Style = BaseStyle, SkipIfExisting = true)]
        [TestCase(null, "*", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ":scope > view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", "#v1", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1", ".v1class", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > * + view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view + *", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v2", ":scope > view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v4", ":scope > #v3 ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v5", ":scope > #v3 ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase(null, ":scope > #v3 ~ view ~ view ~ view", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v2", "view:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "text:empty", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v4", "view:nth-child(4)", ExpectedResult = typeof(IEnumerator))]
        [TestCase("v1v1t4", "*:nth-child(4)", ExpectedResult = typeof(IEnumerator))]
        public IEnumerator HtmlComponentCanRender(string id, string query)
        {
            yield return null;
            Assert.AreEqual(id, Q(query, Q("html"))?.Id);
        }
    }
}
