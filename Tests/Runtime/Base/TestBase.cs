using NUnit.Framework;
using ReactUnity.Components;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class TestBase
    {
        public const string TestPath = "Packages/com.reactunity.core/Tests/Runtime/.scripts/tests/index.js";
        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected ReactUnity Component => Canvas.GetComponent<ReactUnity>();
        protected ReactContext Context => Component.Context;
        protected IHostComponent Host => Context.Host;
        internal ReactUnityAPI API => ReactUnityAPI.Instance;
    }
}
