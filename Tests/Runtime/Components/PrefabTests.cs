using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class PrefabTests : TestBase
    {
        const string PrefabBaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <prefab target={globals.prefab} />;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string PrefabBaseStyle = @"
            prefab {
                flex: 0;
                align-self: flex-start;
            }
        ";


        public PrefabComponent Prefab => Host.QuerySelector("prefab") as PrefabComponent;

        public PrefabTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(PrefabBaseScript, PrefabBaseStyle)]
        public IEnumerator CorrectPrefabIsMounted()
        {
            yield return null;

            var prefab = Prefab;
            Assert.IsNull(prefab.Instance);

            var target1 = new GameObject("prefabTarget1", typeof(RectTransform));
            var target2 = new GameObject("prefabTarget2", typeof(RectTransform));

            Globals["prefab"] = target1;
            Assert.AreEqual(target1, prefab.Instance);

            Globals["prefab"] = null;
            Assert.AreEqual(null, prefab.Instance);

            Globals["prefab"] = target2;
            Assert.AreEqual(target2, prefab.Instance);

            Globals["prefab"] = target1;
            Assert.AreEqual(target1, prefab.Instance);
        }


        [ReactInjectableTest(PrefabBaseScript, PrefabBaseStyle)]
        public IEnumerator PrefabComponentHasCorrectSize()
        {
            yield return null;

            var prefab = Prefab;
            Assert.AreEqual(0, prefab.Container.rect.width);
            Assert.AreEqual(0, prefab.Container.rect.height);

            var target1 = new GameObject("prefabTarget1", typeof(RectTransform));
            var rt = target1.transform as RectTransform;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 200);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, 100);

            Globals["prefab"] = target1;
            yield return null;

            Assert.AreEqual(200, prefab.Container.rect.width);
            Assert.AreEqual(100, prefab.Container.rect.height);
        }


        [ReactInjectableTest(PrefabBaseScript, PrefabBaseStyle)]
        public IEnumerator PrefabTargetResizesCorrectly()
        {
            yield return null;

            var prefab = Prefab;

            var target1 = new GameObject("prefabTarget1", typeof(RectTransform));
            target1.AddComponent<PrefabTarget>();

            Globals["prefab"] = target1;
            yield return null;


            var rt = target1.transform as RectTransform;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 89);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, 116);
            yield return null;

            Assert.AreEqual(89, prefab.Container.rect.width);
            Assert.AreEqual(116, prefab.Container.rect.height);

        }
    }
}
