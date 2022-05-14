using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using TMPro;

namespace ReactUnity.Tests
{
    public class FontWeightTests : TestBase
    {
        const string MultipleLevelsScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view><view>Hello world</view></view>
                </view>;
            }
";

        public FontWeightTests(JavascriptEngineType engineType) : base(engineType) { }

        private TextMeshProUGUI GetText(int i) => Q($"view:nth-child({i})").GameObject.GetComponentInChildren<TextMeshProUGUI>();

        [UGUITest(Code = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view>View content 1</view>
                    <view>View content 2</view>
                    <view>View content 3</view>
                    <view>View content 4</view>
                    <view>View content 5</view>
                    <view style={{ fontWeight: 'bold' }}>View content 6</view>
                    <view style={{ fontWeight: 'bold', fontStyle: 'italic' }}>View content 7</view>
                </>;
            }
", Style = @"
            view:nth-child(1) {
                font-weight: bold;
            }
            view:nth-child(2) {
                font-weight: medium;
            }
            view:nth-child(3) {
                font-weight: 500;
            }
            view:nth-child(4) {
                font-weight: heavy;
            }
            view:nth-child(5) {
                font-weight: 700;
            }
")]
        public IEnumerator FontWeightWorks()
        {
            yield return null;

            Assert.AreEqual(FontWeight.Regular, GetText(1).fontWeight);
            Assert.AreEqual(FontStyles.Bold, GetText(1).fontStyle);

            Assert.AreEqual(FontWeight.Medium, GetText(2).fontWeight);
            Assert.AreEqual(FontStyles.Normal, GetText(2).fontStyle);

            Assert.AreEqual(FontWeight.Medium, GetText(3).fontWeight);
            Assert.AreEqual(FontStyles.Normal, GetText(3).fontStyle);

            Assert.AreEqual(FontWeight.Heavy, GetText(4).fontWeight);
            Assert.AreEqual(FontStyles.Normal, GetText(4).fontStyle);

            Assert.AreEqual(FontWeight.Regular, GetText(5).fontWeight);
            Assert.AreEqual(FontStyles.Bold, GetText(5).fontStyle);

            Assert.AreEqual(FontWeight.Regular, GetText(6).fontWeight);
            Assert.AreEqual(FontStyles.Bold, GetText(6).fontStyle);

            Assert.AreEqual(FontWeight.Regular, GetText(7).fontWeight);
            Assert.AreEqual(FontStyles.Italic | FontStyles.Bold, GetText(7).fontStyle);

        }
    }
}
