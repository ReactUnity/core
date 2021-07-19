using NUnit.Framework;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class WatchableRecordTests
    {
        [Test]
        public void TestChangeCallback()
        {
            var dc = new GlobalRecord();
            dc.SetWithoutNotify("key1", "val1");

            var calledKey = "";
            object calledValue = "";
            var callCount = 0;

            var removeListener = dc.AddListener((key, value, obj) => {
                calledKey = key;
                calledValue = value;
                callCount++;
            });

            dc.Set("key2", "val2");

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual("val2", calledValue);
            Assert.AreEqual(1, callCount);

            dc.SetWithoutNotify("key3", "val3");
            Assert.AreEqual(1, callCount);

            dc.Remove("key2");

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual(null, calledValue);
            Assert.AreEqual(2, callCount);

            dc.RemoveWithoutNotify("key1");
            Assert.AreEqual(2, callCount);

            dc.Remove("keyNonExisting");
            Assert.AreEqual(2, callCount);

            dc.Clear();
            Assert.AreEqual(3, callCount);

            removeListener();
            dc.Set("key2", "val2");
            Assert.AreEqual(3, callCount);
        }


        [Test]
        public void TestBindingWithSerializable()
        {
            var sr = new SerializableDictionary();
            var gl = new GlobalRecord();
            gl.SetWithoutNotify("key1", "val1");
            gl.BindSerializableDictionary(sr, false);

            var calledKey = "";
            object calledValue = "";
            var callCount = 0;

            var removeListener = gl.AddListener((key, value, obj) => {
                calledKey = key;
                calledValue = value;
                callCount++;
            });

            var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
            var capsule = GameObject.CreatePrimitive(PrimitiveType.Capsule);

            sr.Set("key2", cube);

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual(cube, calledValue);
            Assert.AreEqual(1, callCount);

            sr.SetWithoutNotify("key3", capsule);
            Assert.AreEqual(1, callCount);

            sr.Remove("key2");

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual(null, calledValue);
            Assert.AreEqual(2, callCount);

            sr.RemoveWithoutNotify("key1");
            Assert.AreEqual(2, callCount);

            sr.Remove("keyNonExisting");
            Assert.AreEqual(2, callCount);

            sr.Clear();
            Assert.AreEqual(3, callCount);

            removeListener();
            sr.Set("key2", capsule);
            Assert.AreEqual(3, callCount);
        }

        [Test]
        public void TestChangeCallbackOfSerializable()
        {
            var dc = new SerializableDictionary();
            dc.SetWithoutNotify("key1", "val1");

            var calledKey = "";
            object calledValue = "";
            var callCount = 0;

            var removeListener = dc.AddListener((key, value, obj) => {
                calledKey = key;
                calledValue = value;
                callCount++;
            });

            dc.Set("key2", "val2");

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual("val2", calledValue);
            Assert.AreEqual(1, callCount);

            dc.SetWithoutNotify("key3", "val3");
            Assert.AreEqual(1, callCount);

            dc.Remove("key2");

            Assert.AreEqual("key2", calledKey);
            Assert.AreEqual(null, calledValue);
            Assert.AreEqual(2, callCount);

            dc.RemoveWithoutNotify("key1");
            Assert.AreEqual(2, callCount);

            dc.Remove("keyNonExisting");
            Assert.AreEqual(2, callCount);

            dc.Clear();
            Assert.AreEqual(3, callCount);

            removeListener();
            dc.Set("key2", "val2");
            Assert.AreEqual(3, callCount);
        }


    }
}
