using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    public class BridgeTests : TestBase
    {
        public BridgeTests(JavascriptEngineType engineType) : base(engineType) { }

        #region Tree modification

        [ReactInjectableTest]
        public IEnumerator removeChild_ShouldRemoveElement()
        {
            yield return null;

            var view = Host.Children[0];

            Bridge.removeChild(Host, view);

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.Null(tmp);
        }

        [ReactInjectableTest]
        public IEnumerator appendChild_ShouldAddElement()
        {
            yield return null;

            var str = "appendChild Test Text";
            var view = Host.Children[0];
            var text = new TextComponent(str, UGUIContext, "text");

            Bridge.appendChild(view, text);

            var tmp = Canvas.GetComponentsInChildren<TMPro.TextMeshProUGUI>()[1];
            Assert.AreEqual(str, tmp.text);
        }

        [ReactInjectableTest]
        public IEnumerator appendChildToContainer_WhenNotHost_ShouldNotAddElement()
        {
            yield return null;

            var view = Host.Children[0];
            var text = new TextComponent("bogus", UGUIContext, "text");

            Bridge.appendChildToContainer(view, text);

            var tmp = Canvas.GetComponentsInChildren<TMPro.TextMeshProUGUI>().ElementAtOrDefault(1);
            Assert.Null(tmp);
        }


        [ReactInjectableTest]
        public IEnumerator appendChildToContainer_WhenHost_ShouldAddElement()
        {
            yield return null;

            var text = new TextComponent("bogus", UGUIContext, "text");

            Bridge.appendChildToContainer(Host, text);

            var view = Host.Children[1] as UGUIComponent;

            var tmp = view.GameObject.GetComponent<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("bogus", tmp.text);
        }

        [ReactInjectableTest]
        public IEnumerator insertBefore_ShouldAddElementBeforeOther()
        {
            yield return null;

            var view = Host.Children[0] as UGUIComponent;

            var text = new TextComponent("bogus", UGUIContext, "text");

            Bridge.insertBefore(Host, text, view);

            var textCmp = Host.Children[0] as UGUIComponent;

            var tmp = textCmp.GameObject.GetComponent<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("bogus", tmp.text);
        }
        #endregion


        #region Property modification

        [ReactInjectableTest]
        public IEnumerator setText_ShouldSetTextOfExistingComponent()
        {
            yield return null;

            var view = Host.Children[0] as UGUIComponent;
            var text = view.Children[0] as TextComponent;

            Bridge.setText(text, "bogus");

            var tmp = text.GameObject.GetComponent<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("bogus", tmp.text);
        }

        [ReactInjectableTest]
        public IEnumerator setProperty_whenClassName_ShouldUpdateClassList()
        {
            yield return null;

            var view = Host.Children[0] as UGUIComponent;

            var className = "welcome to-this-place   WhErE destiny_is_made  a  ";
            Bridge.setProperty(view, "className", className);

            Assert.AreEqual(new List<string> { "welcome", "to-this-place", "WhErE", "destiny_is_made", "a" }, view.ClassList);
            Assert.AreEqual(className, view.ClassName);
        }

        [ReactInjectableTest]
        public IEnumerator setData_ShouldUpdateDataCollection()
        {
            yield return null;

            var view = Host.Children[0] as UGUIComponent;

            var birthday = new System.DateTime(2000, 1, 1);
            Bridge.setData(view, "birthday", birthday);

            Assert.AreEqual(birthday, view.Data["birthday"]);
        }

        #endregion


        #region Creation

        [ReactInjectableTest]
        public IEnumerator createText_ShouldCreateATextComponent()
        {
            yield return null;

            var text = Bridge.createText("bogus", Host) as TextComponent;

            var tmp = text.GameObject.GetComponent<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("bogus", tmp.text);
            Assert.AreEqual("_text", text.Tag);
        }

        [ReactInjectableTest]
        public IEnumerator createElement_whenTagIsView_ShouldCreateABasicReactComponent()
        {
            yield return null;

            var view = Bridge.createElement("view", "", Host);
            Assert.AreEqual("view", view.Tag);
        }

        [ReactInjectableTest]
        public IEnumerator createElement_whenTagIsText_ShouldCreateATextComponentWithTagText()
        {
            yield return null;

            var text = Bridge.createElement("text", "text-content", Host) as TextComponent;

            var tmp = text.GameObject.GetComponent<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("text-content", tmp.text);
            Assert.AreEqual("text", text.Tag);
        }

        [ReactInjectableTest]
        public IEnumerator createElement_whenTagIsCustom_ShouldCreateABasicReactComponentWithThatTag()
        {
            yield return null;

            var view = Bridge.createElement("my-custom-component-asdf", "", Host);

            Assert.AreEqual("my-custom-component-asdf", view.Tag);
        }

        #endregion
    }
}
