using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class WorldCanvasTests : TestBase
    {
        public UGUIComponent View => Q("view") as UGUIComponent;

        public WorldCanvasTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(SceneName = TestHelpers.WorldSceneName, AutoRender = false)]
        public IEnumerator PositionZIsZeroOnRotatedRoot()
        {

            var cube = GameObject.Find("Cube");
            cube.transform.rotation = Random.rotation;
            cube.transform.position = Random.insideUnitSphere * 1000;
            Canvas.transform.rotation = Random.rotation;

            Render();
            yield return null;

            Assert.AreEqual(0, View.GameObject.transform.localPosition.z);

            View.Style["translate-z"] = 10;
            yield return null;
            Assert.AreEqual(10, View.GameObject.transform.localPosition.z);

            View.Style["translate-z"] = -5;
            yield return null;
            Assert.AreEqual(-5, View.GameObject.transform.localPosition.z);
        }
    }
}
