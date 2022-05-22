using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using ReactUnity.UGUI.Behaviours;
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
                    <portal target={globals.portalTarget} eventCamera={globals.portalCamera}>
                        <text>Portal Inner Text</text>
                    </portal>
                </>;
            }
        ";

        const string BaseStyle = @"
            portal {
            }
        ";

        public PortalComponent Portal => Host.QuerySelector("portal") as PortalComponent;

        public PortalTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PortalHasCorrectTextContent()
        {
            yield return null;

            Assert.AreEqual("Portal Inner Text", Portal.TextContent);
        }

        [UGUITest(Script = BaseScript, Style = @"
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

        [UGUITest(Script = BaseScript)]
        public IEnumerator PortalIsUnmountedAfterDestroy()
        {
            yield return null;
            var portal = Portal;

            var target1 = new GameObject("portalTarget1", typeof(RectTransform));
            Globals["portalTarget"] = target1;
            Assert.AreEqual(null, portal.ShadowParent);
            Assert.AreEqual(target1.transform, portal.RectTransform.parent);

            Context.Dispose();
            yield return null;
            Assert.IsFalse(portal.Component);
            Assert.AreEqual(0, target1.transform.childCount);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PortalMustHaveCorrectEventCamera()
        {
            yield return null;
            Assert.IsNotNull(Portal.Canvas);

            Assert.AreEqual(Camera.main, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);

            var camera = new GameObject("Test Camera", typeof(Camera)).GetComponent<Camera>();
            Globals["portalCamera"] = camera;
            Assert.AreEqual(Camera.main, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);


            var cube = new GameObject("Test Cube");
            Globals["portalTarget"] = cube;
            Assert.AreEqual(camera, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);


            Globals["portalTarget"] = null;
            Assert.AreEqual(Camera.main, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);


            Globals["portalTarget"] = cube;
            Globals["portalCamera"] = null;
            Assert.AreEqual(Camera.main, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);


            Globals["portalTarget"] = null;
            Globals["portalCamera"] = null;
            Assert.AreEqual(Camera.main, Portal.Canvas.worldCamera);
            Assert.AreEqual(Camera.main, CanvasCmp.worldCamera);
        }


        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='t1' eventViewport={globals.t1}>
                        <view id='t1t1' eventViewport={globals.t1t1}>
                            t1t1

                            <view id='t1t1t1' eventViewport={globals.t1t1t1}>
                                t1t1t1
                            </view>
                        </view>

                        <view id='t1t2' eventViewport={globals.t1t2}>
                            t1t2
                        </view>
                    </view>

                    <view id='t2' eventViewport={globals.t2}>
                        t2
                    </view>
                </>;
            }
")]
        public IEnumerator EventViewportMustBePropagatedCorrectly()
        {
            yield return null;

            var rect1 = new GameObject("Rect 1", typeof(RectTransform)).GetComponent<RectTransform>();
            var rect2 = new GameObject("Rect 2", typeof(RectTransform)).GetComponent<RectTransform>();
            var rect3 = new GameObject("Rect 3", typeof(RectTransform)).GetComponent<RectTransform>();
            var rect4 = new GameObject("Rect 4", typeof(RectTransform)).GetComponent<RectTransform>();

            var t1 = Q("#t1");
            var t1t1 = Q("#t1t1");
            var t1t1t1 = Q("#t1t1t1");
            var t1t2 = Q("#t1t2");
            var t2 = Q("#t2");

            Globals["t1"] = rect1;
            Assert.AreEqual(rect1, t1.ResolvedEventViewport);
            Assert.AreEqual(rect1, t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect1, t1t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect1, t1t2.ResolvedEventViewport);
            Assert.AreEqual(null, t2.ResolvedEventViewport);

            Assert.AreEqual(rect1, t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(null, t1t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(null, t1t2.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(null, t2.GetComponent<CustomViewportRaycaster>());


            Globals["t1t2"] = rect2;
            Assert.AreEqual(rect1, t1.ResolvedEventViewport);
            Assert.AreEqual(rect1, t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect1, t1t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect2, t1t2.ResolvedEventViewport);
            Assert.AreEqual(null, t2.ResolvedEventViewport);

            Assert.AreEqual(rect1, t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(null, t1t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(rect2, t1t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);


            Globals["t1t1"] = rect3;
            Assert.AreEqual(rect1, t1.ResolvedEventViewport);
            Assert.AreEqual(rect3, t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect3, t1t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect2, t1t2.ResolvedEventViewport);
            Assert.AreEqual(null, t2.ResolvedEventViewport);

            Assert.AreEqual(rect1, t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(rect3, t1t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t1t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(rect2, t1t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);


            Globals["t1"] = null;
            Assert.AreEqual(null, t1.ResolvedEventViewport);
            Assert.AreEqual(rect3, t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect3, t1t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect2, t1t2.ResolvedEventViewport);
            Assert.AreEqual(null, t2.ResolvedEventViewport);

            Assert.AreEqual(null, t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(rect3, t1t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t1t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(rect2, t1t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);


            Globals["t1"] = rect4;
            Globals["t1t1"] = null;
            Assert.AreEqual(rect4, t1.ResolvedEventViewport);
            Assert.AreEqual(rect4, t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect4, t1t1t1.ResolvedEventViewport);
            Assert.AreEqual(rect2, t1t2.ResolvedEventViewport);

            Assert.AreEqual(rect4, t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(rect4, t1t1.GetComponent<CustomViewportRaycaster>()?.EventViewport);
            Assert.AreEqual(null, t1t1t1.GetComponent<CustomViewportRaycaster>());
            Assert.AreEqual(rect2, t1t2.GetComponent<CustomViewportRaycaster>()?.EventViewport);
        }
    }
}
