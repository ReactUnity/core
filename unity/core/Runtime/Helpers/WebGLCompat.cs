using UnityEngine;

namespace ReactUnity.Helpers
{
    public class ReactUnityWebGLCompat
    {
        public class WebGLCompatModule
        {
            public class WebGLCompatCanvas
            {
                public void requestPointerLock()
                {
                    Cursor.lockState = CursorLockMode.Locked;
                }

                public void exitPointerLock()
                {
                    Cursor.lockState = CursorLockMode.None;
                }

                public string toDataUrl(string type, float quality)
                {
                    return "";
                }
            }

            public WebGLCompatCanvas canvas = new WebGLCompatCanvas();

            public void SetFullscreen(int fullScreen)
            {
                Screen.fullScreen = fullScreen != 0;
            }

            public string Pointer_stringify(int pointer, int length)
            {
                return "";
            }
        }


        public void SendMessage(string gameObjectName, string methodName, object parameter)
        {
            var go = GameObject.Find(gameObjectName);

            if (go)
            {
                go.SendMessage(methodName, parameter, SendMessageOptions.DontRequireReceiver);
            }
        }

        public void SetFullscreen(int fullScreen) => Module.SetFullscreen(fullScreen);

        public void Quit() => Application.Quit();

        public WebGLCompatModule Module = new WebGLCompatModule();
    }
}
