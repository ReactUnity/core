using ReactUnity.StyleEngine;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TestBase
    {
        public const string TestPath = "Packages/com.reactunity.core/Tests/Runtime/.scripts/tests/index.js";
        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected ReactUnityUGUI Component => Canvas.GetComponent<ReactUnityUGUI>();
        protected ReactContext Context => Component.Context;
        protected UGUIContext UGUIContext => Context as UGUIContext;
        protected IMediaProvider MediaProvider => Context.MediaProvider;
        protected HostComponent Host => Context.Host as HostComponent;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;
    }
}
