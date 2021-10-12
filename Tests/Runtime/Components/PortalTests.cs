using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class PortalTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view>
                        <text>View content</text>
                    </view>
                    <portal target={globals.portalTarget}>
                        <text>Portal Inner Text</text>
                    </portal>
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"
            portal {
            }
        ";

        public PortalComponent Portal => Host.QuerySelector("portal") as PortalComponent;

        public PortalTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator PortalIsMountedToCorrectParent()
        {
            yield return null;

            var view = Host.QuerySelector("view") as ContainerComponent;

            var portal = Portal;
            Assert.AreEqual(Host, portal.ShadowParent);
            Assert.AreEqual(Host.Container, portal.RectTransform.parent);

            var target1 = new GameObject("portalTarget1", typeof(RectTransform));
            var target2 = new GameObject("portalTarget2", typeof(RectTransform));

            Globals["portalTarget"] = target1;
            Assert.AreEqual(null, portal.ShadowParent);
            Assert.AreEqual(target1.transform, portal.RectTransform.parent);

            Globals["portalTarget"] = null;
            Assert.AreEqual(Host, portal.ShadowParent);
            Assert.AreEqual(Host.Container, portal.RectTransform.parent);

            Globals["portalTarget"] = target2;
            Assert.AreEqual(null, portal.ShadowParent);
            Assert.AreEqual(target2.transform, portal.RectTransform.parent);

            Globals["portalTarget"] = target1;
            Assert.AreEqual(null, portal.ShadowParent);
            Assert.AreEqual(target1.transform, portal.RectTransform.parent);

            Globals["portalTarget"] = view;
            Assert.AreEqual(view, portal.ShadowParent);
            Assert.AreEqual(view.Container, portal.RectTransform.parent);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator PortalHasCorrectTextContent()
        {
            yield return null;

            Assert.AreEqual("Portal Inner Text", Portal.TextContent);
        }

        [ReactInjectableTest(BaseScript, @"
            :root :deep text {
                color: red;
            }
            view :deep portal text {
                color: blue !important;
            }
        ")]
        public IEnumerator PortalCanBeStyledWithDeepStyles()
        {
            yield return null;

            var view = Host.QuerySelector("view") as ContainerComponent;

            var viewText = view.RectTransform.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(Color.black, viewText.color, "Deep style should not affect non-deep elements");

            var portalText = Portal.RectTransform.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(Color.red, portalText.color);

            Globals["portalTarget"] = view;
            yield return null;
            Assert.AreEqual(Color.blue, portalText.color, "Color should change after parent changes");
        }
    }
}
