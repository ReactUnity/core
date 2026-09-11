using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    /// <summary>A block stacks, a flex box is a row, and an item shrinks unless told not to.</summary>
    public class DisplayTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                return <>
                    <view id='stack'><view id='s1' className='box' /><view id='s2' className='box' /></view>
                    <view id='row' style={{ display: 'flex' }}><view id='r1' className='box' /><view id='r2' className='box' /></view>
                    <view id='narrow'><view id='wide' /></view>
                </>;
            }
";

        const string BaseStyle = @"
            .box { width: 20px; height: 20px; }
            #narrow { display: flex; width: 100px; }
            #wide { width: 300px; height: 10px; }
";

        public DisplayTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BlockStacksAndFlexIsARow()
        {
            yield return null;
            yield return null;

            var s2 = Q("#s2").Layout;
            Assert.AreEqual(0, s2.LayoutLeft, 0.01f);
            Assert.AreEqual(20, s2.LayoutTop, 0.01f);

            var r2 = Q("#r2").Layout;
            Assert.AreEqual(20, r2.LayoutLeft, 0.01f);
            Assert.AreEqual(0, r2.LayoutTop, 0.01f);

            Q("#stack").Style["display"] = "flex";
            yield return null;
            yield return null;
            Assert.AreEqual(20, s2.LayoutLeft, 0.01f);
            Assert.AreEqual(0, s2.LayoutTop, 0.01f);

            Q("#stack").Style["display"] = "block";
            yield return null;
            yield return null;
            Assert.AreEqual(0, s2.LayoutLeft, 0.01f);
            Assert.AreEqual(20, s2.LayoutTop, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ItemsShrinkUnlessToldNotTo()
        {
            yield return null;
            yield return null;

            var wide = Q("#wide");
            Assert.AreEqual(100, wide.Layout.LayoutWidth, 0.01f);

            wide.Style["flex-shrink"] = "0";
            yield return null;
            yield return null;
            Assert.AreEqual(300, wide.Layout.LayoutWidth, 0.01f);
        }
    }
}
