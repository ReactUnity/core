using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class SpecificityTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
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
        ";

        const string BaseStyle = @"";

        public SpecificityTests(JavascriptEngineType engineType) : base(engineType) { }

        public IUIToolkitComponent<TextElement> Text(string selector) => Q(selector) as IUIToolkitComponent<TextElement>;


        [EditorInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        public IEnumerator LastValidRuleGetsAppliedForSameSpecificity()
        {
            var text = Text("#v1v1t2");

            var ss = InsertStyle(@"
                #v1v1 #v1v1t2 { color: blue; }
                #v1 #v1v1t2 { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                view > * > text { color: red; }
                view text { color: lime; }
                view > text { color: blu; }
            ");
            yield return null;
            Assert.AreEqual(Color.green, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                #v1v1t2 {
                    color: red;
                    color: white;
                    color: booooo;
                }
            ");
            yield return null;
            Assert.AreEqual(Color.white, text.ComputedStyle.color);
            RemoveStyle(ss);


            ss = InsertStyle(@"
                #v1v1t2 {
                    color: red !important;
                    color: white;
                    color: booooo;
                }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);


            ss = InsertStyle(@"
                #v1v1t2 {
                    color: red !important;
                    color: blue !important;
                    color: booooo;
                }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);


            ss = InsertStyle(@"view > * > text { color: red; }");
            var ss2 = InsertStyle(@"view > * > text { color: blue; }");
            var ss3 = InsertStyle(@"view > * > text { color: fooooo; }");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
            RemoveStyle(ss2);
            RemoveStyle(ss3);



            ss = InsertStyle(@"view > * > text { color: red !important; }");
            ss2 = InsertStyle(@"view > * > text { color: blue; }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
            RemoveStyle(ss2);
        }

        [EditorInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        public IEnumerator MoreSpecificSelectorsTakePrecedence()
        {
            var text = Text("#v1v1t2");

            var ss = InsertStyle(@"
                #v1v1 #v1v1t2 { color: blue; }
                #v1v1t2 { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                view view text { color: lime; }
                view text { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.green, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(BaseScript, BaseStyle, SkipIfExisting = true)]
        public IEnumerator ImportanceOfInlineStyles()
        {
            var text = Text("#v1v1t2");
            text.Style.Set("color", "blue");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);

            var ss = InsertStyle(@"#v1v1t2 { color: red; }");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"#v1v1t2 { color: red !important; }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"#v1v1t2 { color: red; }", 1);
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"#v1v1t2 { color: red !important; }", -1);
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"#v1v1t2 { color: red !important; }");
            var ss1 = InsertStyle(@"#v1v1t2 { color: lime; }", 1);
            yield return null;
            Assert.AreEqual(Color.green, text.ComputedStyle.color);
            RemoveStyle(ss);
            RemoveStyle(ss1);

            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
        }
    }
}
