using System;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Utilities;

namespace MyInterop
{
    public class InteropTest : MonoBehaviour
    {
        public event Action<string> OnKeyPress;

        public Action AddKeyPressListener(object callback)
        {
            var cb = ReactUnity.Helpers.Callback.From(callback);
            Action<string> listener = (val) => cb.Call(val);

            OnKeyPress += listener;

            return () => OnKeyPress -= listener;
        }

        void Start()
        {
            InputSystem.onAnyButtonPress.Call(x => OnKeyPress?.Invoke(x.displayName));
        }

        public static void TestDebug()
        {
            Debug.Log("Interop Test Works");
        }
    }
}
