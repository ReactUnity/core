#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    // it's an example how to receive more MonoBehaviour callbacks without modifying JSBehaviour class.
    public class JSCollisionCallback : MonoBehaviour
    {
        void OnCollisionEnter(Collision other)
        {
            JSBehaviour.Dispatch(gameObject, "OnCollisionEnter", other);
        }

        void OnCollisionExit(Collision other)
        {
            JSBehaviour.Dispatch(gameObject, "OnCollisionExit", other);
        }

        void OnCollisionStay(Collision other)
        {
            JSBehaviour.Dispatch(gameObject, "OnCollisionStay", other);
        }
    }
}
#endif // if !JSB_UNITYLESS
