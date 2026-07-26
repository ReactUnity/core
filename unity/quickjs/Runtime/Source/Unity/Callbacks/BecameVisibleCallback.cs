#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    // it's an example how to receive more MonoBehaviour callbacks without modifying JSBehaviour class.
    public class JSBecameVisibleCallback : MonoBehaviour
    {
        void OnBecameVisible()
        {
            JSBehaviour.Dispatch(gameObject, "OnBecameVisible");
        }

        void OnBecameInvisible()
        {
            JSBehaviour.Dispatch(gameObject, "OnBecameInvisible");
        }
    }
}
#endif // if !JSB_UNITYLESS
