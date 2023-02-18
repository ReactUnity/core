using System;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Utilities;

namespace MyInterop
{
    public class InteropTest : MonoBehaviour
    {
        public event Action<string> OnKeyPress;
        IDisposable dispose;

        public Action AddKeyPressListener(object callback)
        {
            var cb = ReactUnity.Helpers.Callback.From(callback);
            Action<string> listener = (val) => cb.Call(val);

            OnKeyPress += listener;

            return () => OnKeyPress -= listener;
        }


        void OnEnable()
        {
            var ctx = GetComponent<ReactUnityUGUI>();
            if (ctx)
            {
                ctx.AdvancedOptions.AfterStart.AddListener(() => {

                    dispose = InputSystem.onAnyButtonPress.Call(x => {
                        OnKeyPress?.Invoke(x.displayName);
                        ctx.Context.Script.WebGLCompatDispatchEvent("OnKeyPress", x.displayName);
                    });
                });
            }
        }

        private void OnDestroy()
        {
            dispose?.Dispose();
        }

        public static void TestDebug()
        {
            Debug.Log("Interop Test Works");
        }
    }
}
