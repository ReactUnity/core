using System;
using ReactUnity.Helpers;
using ReactUnity.Reactive;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Utilities;

namespace MyInterop
{
    public class InteropTest : MonoBehaviour
    {
        public ReactAction<string> OnKeyPress = new ReactAction<string>();
        IDisposable dispose;

        public ReactiveValue<float> DeltaTime = new ReactiveValue<float>();

        [Obsolete]
        public Action AddKeyPressListener(object callback) => OnKeyPress.AddListener(callback);

        void OnEnable()
        {
            var ctx = GetComponent<ReactRendererUGUI>();
            if (ctx)
            {
                ctx.AdvancedOptions.AfterStart.AddListener(() => {

                    dispose = InputSystem.onAnyButtonPress.Call(x => {
                        OnKeyPress?.Invoke(x.displayName);
                        ctx.Context?.Script?.WebGLCompatDispatchEvent("OnKeyPress", x.displayName);
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

        void Update()
        {
            DeltaTime.Value = Time.deltaTime;
        }
    }
}
