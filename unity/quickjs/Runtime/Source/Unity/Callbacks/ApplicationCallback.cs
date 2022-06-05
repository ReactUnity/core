#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    // it's an example how to receive more MonoBehaviour callbacks without modifying JSBehaviour class.
    public class JSApplicationCallback : MonoBehaviour
    {
        void OnApplicationFocus(bool hasFocus)
        {
            JSBehaviour.Dispatch(gameObject, "OnApplicationFocus", hasFocus);
        }

        void OnApplicationPause(bool pauseStatus)
        {
            JSBehaviour.Dispatch(gameObject, "OnApplicationPause", pauseStatus);
        }

        //TODO fixme, script order
        void OnApplicationQuit()
        {
            JSBehaviour.Dispatch(gameObject, "OnApplicationQuit");
        }
    }
}
#endif // if !JSB_UNITYLESS
