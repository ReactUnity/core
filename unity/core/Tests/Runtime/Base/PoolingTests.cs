using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Tests
{
    /// <summary>
    /// Each test mounts an element with a prop, unmounts it, and mounts one of the same tag without
    /// it. A create command only carries the props that are present, so whatever the first owner set
    /// has to be undone by Pool/Revive, or the reused element keeps it.
    /// </summary>
    public class PoolingTests : TestBase
    {
        const ReactContext.PoolingType All = ReactContext.PoolingType.All;

        const string Head = @"
            function App() {
                const g = ReactUnity.useGlobals();
                const phase = g.phase || 1;
                if (phase === 1) return ";
        const string Mid = @";
                if (phase === 3) return ";
        const string Tail = @";
                return null;
            }
        ";

        public PoolingTests(JavascriptEngineType engineType) : base(engineType) { }

        IEnumerator Remount()
        {
            Globals["phase"] = 2;
            yield return null;
            Globals["phase"] = 3;
            yield return null;
        }

        T Reused<T>(UGUIComponent first, string query) where T : UGUIComponent
        {
            var second = Q(query);
            Assert.IsNotNull(first, "the first element was not mounted");
            Assert.AreSame(first, second, "the element was not taken from the pool");
            return (T) second;
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool custom-a={5} />" + Mid + "<view pool />" + Tail)]
        public IEnumerator CustomPropertiesAreCleared()
        {
            yield return null;
            var first = Q("view");
            Assert.AreEqual(5, first.CustomProperties["a"]);
            yield return Remount();

            var view = Reused<UGUIComponent>(first, "view");
            Assert.IsTrue(view.CustomProperties == null || view.CustomProperties.Count == 0);
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool active={false} />" + Mid + "<view pool />" + Tail)]
        public IEnumerator ActiveIsRestored()
        {
            yield return null;
            var first = Q("view");
            Assert.IsFalse(first.GameObject.activeSelf);
            yield return Remount();

            var view = Reused<UGUIComponent>(first, "view");
            Assert.IsTrue(view.GameObject.activeSelf);
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool eventViewport={g.viewport} />" + Mid + "<view pool />" + Tail)]
        public IEnumerator EventViewportIsCleared()
        {
            Globals["viewport"] = Host.RectTransform;
            yield return null;
            var first = Q("view");
            Assert.AreEqual(Host.RectTransform, first.EventViewport);
            yield return Remount();

            var view = Reused<UGUIComponent>(first, "view");
            Assert.IsNull(view.EventViewport);
            Assert.IsNull(view.ResolvedEventViewport);
        }

        [UGUITest(Pooling = All, Script = Head + "<anchor pool disabled href='https://example.com' target='_self' />" + Mid + "<anchor pool />" + Tail)]
        public IEnumerator AnchorIsReset()
        {
            yield return null;
            var first = Q("anchor") as AnchorComponent;
            Assert.IsTrue(first.Disabled);
            yield return Remount();

            var anchor = Reused<AnchorComponent>(first, "anchor");
            Assert.IsFalse(anchor.Disabled);
            Assert.AreEqual("", anchor.Url);
            Assert.AreEqual("_blank", anchor.Target);
        }

        [UGUITest(Pooling = All, Script = Head + "<toggle pool checked indeterminate disabled value='a' />" + Mid + "<toggle pool />" + Tail)]
        public IEnumerator ToggleIsReset()
        {
            yield return null;
            var first = Q("toggle") as ToggleComponent;
            Assert.IsTrue(first.Checked);
            yield return Remount();

            var toggle = Reused<ToggleComponent>(first, "toggle");
            Assert.IsFalse(toggle.Checked);
            Assert.IsFalse(toggle.Indeterminate);
            Assert.IsFalse(toggle.Disabled);
            Assert.IsNull(toggle.Value);
        }

        [UGUITest(Pooling = All, Script = Head + @"<input pool characterLimit={5} lineLimit={2} richText={false}
            contentType='password' keyboardType='social' lineType='multiline-submit' validation='integer' />" + Mid + "<input pool />" + Tail)]
        public IEnumerator InputIsReset()
        {
            yield return null;
            var first = Q("input") as InputComponent;
            Assert.AreEqual(5, first.InputField.characterLimit);
            yield return Remount();

            var field = Reused<InputComponent>(first, "input").InputField;
            Assert.AreEqual(0, field.characterLimit);
            Assert.AreEqual(0, field.lineLimit);
            Assert.IsTrue(field.richText);
            Assert.AreEqual(TMP_InputField.ContentType.Standard, field.contentType);
            Assert.AreEqual(TMP_InputField.InputType.Standard, field.inputType);
            Assert.AreEqual(TouchScreenKeyboardType.Default, field.keyboardType);
            Assert.AreEqual(TMP_InputField.LineType.SingleLine, field.lineType);
            Assert.AreEqual(TMP_InputField.CharacterValidation.None, field.characterValidation);
        }

        [UGUITest(Pooling = All, Script = Head + "<scroll pool direction='vertical' alwaysShow='both' sensitivity={5} smoothness={0.5} />" + Mid + "<scroll pool />" + Tail)]
        public IEnumerator ScrollIsReset()
        {
            yield return null;
            var first = Q("scroll") as ScrollComponent;
            Assert.IsFalse(first.ScrollRect.horizontal);
            yield return Remount();

            var rect = Reused<ScrollComponent>(first, "scroll").ScrollRect;
            Assert.IsTrue(rect.horizontal);
            Assert.IsTrue(rect.vertical);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.AutoHide, rect.horizontalScrollbarVisibility);
            Assert.AreEqual(ScrollRect.ScrollbarVisibility.AutoHide, rect.verticalScrollbarVisibility);
            Assert.AreEqual(100, rect.scrollSensitivity);
            Assert.AreEqual(0.12f, rect.Smoothness);
        }

        [UGUITest(Pooling = All, Script = Head + "<label pool for='#nothing'><toggle /></label>" + Mid + "<label pool><toggle /></label>" + Tail)]
        public IEnumerator LabelForIsCleared()
        {
            yield return null;
            var first = Q("label") as LabelComponent;
            Assert.IsFalse(first.Activate());
            yield return Remount();

            var label = Reused<LabelComponent>(first, "label");
            Assert.IsTrue(label.Activate(), "the label should activate its own toggle");
        }

        [UGUITest(Pooling = All, Script = Head + "<object pool camera={g.camera} target={g.target} />" + Mid + "<object pool />" + Tail)]
        public IEnumerator ObjectCameraAndTargetAreCleared()
        {
            var camera = new GameObject("poolCamera", typeof(Camera)).GetComponent<Camera>();
            var target = new GameObject("poolTarget");
            Globals["camera"] = camera;
            Globals["target"] = target;
            yield return null;
            var first = Q("object") as ObjectComponent;
            Assert.AreEqual(camera, first.Camera);
            yield return Remount();

            var obj = Reused<ObjectComponent>(first, "object");
            Assert.IsNull(obj.Camera);
            Assert.IsNull(obj.Target);

            Object.Destroy(camera.gameObject);
            Object.Destroy(target);
        }

        [UGUITest(Pooling = All, Script = Head + "<render pool width={64} height={32} camera={g.camera} />" + Mid + "<render pool />" + Tail)]
        public IEnumerator RenderReleasesCameraAndSize()
        {
            var camera = new GameObject("poolCamera", typeof(Camera)).GetComponent<Camera>();
            Globals["camera"] = camera;
            yield return null;
            var first = Q("render") as RenderComponent;
            Assert.AreEqual(64, first.Width);
            Assert.AreEqual(first.RenderTexture, camera.targetTexture);
            yield return Remount();

            Assert.IsNull(camera.targetTexture, "the camera should stop rendering into a pooled texture");
            var render = Reused<RenderComponent>(first, "render");
            Assert.AreEqual(1, render.Width);
            Assert.AreEqual(1, render.Height);

            Object.Destroy(camera.gameObject);
        }

        // Inactive first, so the player never tries to prepare the url.
        [UGUITest(Pooling = All, Script = Head + "<video pool active={false} src='https://example.invalid/clip.mp4' />" + Mid + "<video pool active={false} />" + Tail)]
        public IEnumerator VideoSourceIsCleared()
        {
            yield return null;
            var first = Q("video") as VideoComponent;
            Assert.AreEqual("https://example.invalid/clip.mp4", first.VideoPlayer.url);
            yield return Remount();

            var video = Reused<VideoComponent>(first, "video");
            Assert.IsTrue(string.IsNullOrEmpty(video.VideoPlayer.url));
            Assert.IsNull(video.VideoPlayer.clip);
        }

        const string SvgContent = "\"<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill='red'/></svg>\"";

        [UGUITest(Pooling = All, Script = Head + "<svg pool active={false} preserveAspect content=" + SvgContent + " />" + Mid + "<svg pool />" + Tail)]
        public IEnumerator SvgIsReset()
        {
            yield return null;
            var first = Q("svg") as SvgComponent;
            Assert.IsNotNull(first.Content);
            Assert.IsTrue(first.Image.preserveAspect);
            yield return Remount();

            var svg = Reused<SvgComponent>(first, "svg");
            Assert.IsNull(svg.Content);
            Assert.IsNull(svg.ResolvedContent);
            Assert.IsNull(svg.Image.sprite);
            Assert.IsFalse(svg.Image.preserveAspect);
            Assert.IsTrue(svg.GameObject.activeSelf);
        }

        [UGUITest(Pooling = All, Script = Head + "<svg pool viewBox='0 0 10 10' />" + Mid + "<svg pool innerContent=\"<rect width='5' height='5' />\" />" + Tail)]
        public IEnumerator SvgAttributesAreCleared()
        {
            yield return null;
            var first = Q("svg");
            yield return Remount();

            var svg = Reused<SvgComponent>(first, "svg");
            StringAssert.Contains("<rect", svg.ResolvedContent);
            StringAssert.DoesNotContain("viewBox", svg.ResolvedContent);
        }

        [UGUITest(Pooling = All, Script = Head + "<image pool preserveAspect={false} />" + Mid + "<image pool />" + Tail)]
        public IEnumerator ImagePreserveAspectIsRestored()
        {
            yield return null;
            var first = Q("image") as ImageComponent;
            Assert.IsFalse(first.Image.preserveAspect);
            yield return Remount();

            Assert.IsTrue(Reused<ImageComponent>(first, "image").Image.preserveAspect);
        }

        [UGUITest(Pooling = All, Script = Head + "<prefab pool target={g.target} custom-a={5} />" + Mid + "<prefab pool />" + Tail)]
        public IEnumerator PrefabTargetIsReleased()
        {
            var target = new GameObject("poolPrefabTarget", typeof(RectTransform));
            Globals["target"] = target;
            yield return null;
            var first = Q("prefab") as PrefabComponent;
            Assert.AreEqual(target, first.Instance);
            yield return Remount();

            Assert.IsNull(target.transform.parent, "the target should go back where it came from on unmount");
            var prefab = Reused<PrefabComponent>(first, "prefab");
            Assert.IsNull(prefab.Instance);

            Object.Destroy(target);
        }

        [UGUITest(Pooling = All, Script = Head + "<icon pool set='nonexistent'>search</icon>" + Mid + "<icon pool>search</icon>" + Tail)]
        public IEnumerator IconSetIsRestored()
        {
            yield return null;
            var first = Q("icon") as IconComponent;
            Assert.IsNull(first.Set);
            Assert.IsNotNull(UGUIContext.DefaultIconSet);
            yield return Remount();

            var icon = Reused<IconComponent>(first, "icon");
            Assert.AreSame(UGUIContext.DefaultIconSet, icon.Set);
            Assert.AreEqual("", icon.TextContent);
        }

        [UGUITest(Pooling = All, Script = Head + "<text pool richText={false}>a</text>" + Mid + "<text pool>b</text>" + Tail)]
        public IEnumerator TextRichTextIsRestored()
        {
            yield return null;
            var first = Q("text") as TextComponent;
            Assert.IsFalse(first.Text.richText);
            yield return Remount();

            Assert.IsTrue(Reused<TextComponent>(first, "text").Text.richText);
        }

        [UGUITest(Pooling = All, Script = Head + "<portal pool eventCamera={g.camera} />" + Mid + "<portal pool />" + Tail)]
        public IEnumerator PortalCameraIsCleared()
        {
            var camera = new GameObject("poolCamera", typeof(Camera)).GetComponent<Camera>();
            Globals["camera"] = camera;
            yield return null;
            var first = Q("portal") as PortalComponent;
            Assert.AreEqual(camera, first.EventCamera);
            yield return Remount();

            Assert.IsNull(Reused<PortalComponent>(first, "portal").EventCamera);

            Object.Destroy(camera.gameObject);
        }

        static int CompositesUnder(Transform t)
        {
            var n = 0;
            foreach (Transform child in t)
                if (child.name == "[Filter]" && child.GetComponent<RawImage>().enabled) n++;
            return n;
        }

        // A filter moves the subtree onto a surface of its own and leaves a composite in the parent,
        // and Detach puts the element back where the filter found it -- the first owner's parent.
        [UGUITest(Pooling = All, Script = Head + "<view><view pool='f' style={{ filter: 'grayscale(1)', width: 50, height: 50, backgroundColor: 'red' }} /></view>"
            + Mid + "<button><view pool='f' /></button>" + Tail)]
        public IEnumerator FilterIsDetachedBeforePooling()
        {
            for (int i = 0; i < 4; i++) yield return null;
            var first = Q("view view");
            Assert.IsNotNull(first.ElementFilter, "sanity: the first owner should be filtered");
            var oldParent = Q("view").Container;
            Assert.AreEqual(1, CompositesUnder(oldParent), "sanity: the composite stands in the parent");
            yield return Remount();
            for (int i = 0; i < 4; i++) yield return null;

            var view = Reused<UGUIComponent>(first, "button view");
            var button = Q("button");
            Assert.IsNull(view.ElementFilter);
            Assert.AreEqual(button.Container, view.RectTransform.parent, "the element should stay under its new parent");
            Assert.AreEqual(0, CompositesUnder(oldParent), "the old composite should be gone with the filter");
        }

        [UGUITest(Pooling = All, Script = Head + "<view><view pool='f' style={{ filter: 'grayscale(1)', width: 50, height: 50, backgroundColor: 'red' }} /></view>"
            + Mid + "<button><view pool='f' style={{ filter: 'invert(1)', width: 50, height: 50, backgroundColor: 'red' }} /></button>" + Tail)]
        public IEnumerator AReusedFilterIsBuiltForItsNewParent()
        {
            for (int i = 0; i < 4; i++) yield return null;
            var first = Q("view view");
            yield return Remount();
            for (int i = 0; i < 4; i++) yield return null;

            var view = Reused<UGUIComponent>(first, "button view");
            Assert.IsNotNull(view.ElementFilter);
            Assert.AreEqual("[FilterSurface]", view.RectTransform.parent.name, "the element should be on a surface");
            Assert.AreEqual(1, view.GameObject.GetComponents<UGUI.Internal.ElementFilter>().Length);
            Assert.AreEqual(1, CompositesUnder(Q("button").Container), "the composite should stand in the new parent");
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool style={{ backdropFilter: 'blur(4px)', outline: '2px solid red' }} />"
            + Mid + "<view pool />" + Tail)]
        public IEnumerator BackdropFilterAndOutlineAreRemoved()
        {
            yield return null;
            var first = Q("view");
            Assert.IsNotNull(first.GameObject.GetComponentInChildren<UGUI.Shapes.WebFilter>(), "sanity: the backdrop should be drawn");
            Assert.IsNotNull(first.RectTransform.Find("[Outline]"), "sanity: the outline should be drawn");
            yield return Remount();
            yield return null;

            var view = Reused<UGUIComponent>(first, "view");
            Assert.IsNull(view.GameObject.GetComponentInChildren<UGUI.Shapes.WebFilter>(), "the old backdrop should not keep reading");
            Assert.IsNull(view.RectTransform.Find("[Outline]"), "the old outline should not keep drawing");
        }

        [UGUITest(Pooling = All, Script = Head + "<view id='a' />" + Mid + "<view />" + Tail)]
        public IEnumerator OmittedPoolKeyPoolsUnderAll()
        {
            yield return null;
            var first = Q("view");
            yield return Remount();

            Assert.IsNull(Reused<UGUIComponent>(first, "view").Id);
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool={false} />" + Mid + "<view pool={false} />" + Tail)]
        public IEnumerator PoolFalseKeepsElementOutOfPool()
        {
            yield return null;
            var first = Q("view");
            yield return Remount();

            Assert.AreNotSame(first, Q("view"));
        }

        [UGUITest(Pooling = ReactContext.PoolingType.Basic, Script = Head + "<view />" + Mid + "<view />" + Tail)]
        public IEnumerator BasicPoolingLeavesElementsAlone()
        {
            yield return null;
            var first = Q("view");
            yield return Remount();

            Assert.AreNotSame(first, Q("view"));
        }

        [UGUITest(Pooling = All)]
        public IEnumerator NullPoolKeyPoolsFromBothCreateCommands()
        {
            yield return null;
            IReactComponent Ref(int id) => (IReactComponent) Context.GetRef(id);

            Context.FlushCommands("[[0,900001,\"view\",null,null]]");
            var pooled = Ref(900001);
            pooled.Destroy();

            Context.FlushCommands("[[\"c\",{\"r\":900002,\"t\":\"view\",\"k\":null}]]");
            Assert.AreSame(pooled, Ref(900002), "legacy create");
            pooled.Destroy();

            Context.FlushCommands("[[0,900003,\"view\",null,null]]");
            Assert.AreSame(pooled, Ref(900003), "numeric create");
            pooled.Destroy();

            Context.FlushCommands("[[0,900004,\"view\",null,\"\"],[\"c\",{\"r\":900005,\"t\":\"view\",\"k\":\"\"}]]");
            Assert.AreNotSame(pooled, Ref(900004), "an empty key is pool={false}");
            Assert.AreNotSame(pooled, Ref(900005), "an empty key is pool={false}");
        }

        [UGUITest(Pooling = All, Script = Head + "<portal target={g.target} />" + Mid + "null" + Tail)]
        public IEnumerator DisposingDestroysAPortalInsteadOfPoolingIt()
        {
            var target = new GameObject("poolPortalTarget", typeof(RectTransform));
            Globals["target"] = target;
            yield return null;
            var portal = Q("portal");
            Assert.AreEqual(target.transform, portal.RectTransform.parent);

            Context.Dispose();
            yield return null;
            Assert.IsFalse(portal.Component);
            Assert.AreEqual(0, target.transform.childCount);

            Object.Destroy(target);
        }

        [UGUITest(Pooling = All, Script = Head + "<scroll />" + Mid + "<scroll />" + Tail)]
        public IEnumerator ReusedScrollbarsKeepTheirDirectionData()
        {
            yield return null;
            var first = Q("scroll");
            yield return Remount();

            var scroll = Reused<ScrollComponent>(first, "scroll");
            Assert.AreEqual(true, scroll.VerticalScrollbar.Data["vertical"]);
            Assert.AreEqual("vertical", scroll.VerticalScrollbar.Data["direction"]);
            Assert.AreEqual(true, scroll.HorizontalScrollbar.Data["horizontal"]);
        }

        [UGUITest(Pooling = All, Script = Head + "<input style={{ overflow: 'scroll' }} />" + Mid + "<input />" + Tail)]
        public IEnumerator ReusedInputLetsGoOfItsScrollbar()
        {
            yield return null;
            var first = Q("input") as InputComponent;
            Assert.IsNotNull(first.InputField.verticalScrollbar);
            yield return Remount();

            Assert.IsNull(Reused<InputComponent>(first, "input").InputField.verticalScrollbar);
        }

        [UGUITest(Pooling = All, Script = Head + "<view pool id='a' />" + Mid + "<view pool id='b' />" + Tail)]
        public IEnumerator PooledElementLosesItsOldRef()
        {
            yield return null;
            var first = Q("view");
            var oldRef = first.RefId;
            Assert.Greater(oldRef, 0);
            yield return Remount();

            var view = Reused<UGUIComponent>(first, "view");
            Assert.AreNotEqual(oldRef, view.RefId);
            Assert.IsNull(Context.GetRef(oldRef), "the old ref should not reach the new owner");
            Assert.AreSame(view, Context.GetRef(view.RefId));
        }
    }
}
