using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using UnityEngine;

#if REACT_INPUT_SYSTEM
using UnityEngine.InputSystem;
#endif

namespace ReactUnity.Styling.Rules
{
    public interface IMediaProvider
    {
        event Action<IMediaProvider> OnUpdate;
        string MediaType { get; set; }
        bool HasType(string type);
        string GetValue(string property);
        float GetNumericalValue(string property);

        void SetValue(string property, string value);
        void SetNumber(string property, float value);
        void SetDimensions(float width, float height);
        void RecalculateScreenAndDevices();
    }

    public class DefaultMediaProvider : IMediaProvider
    {
        public enum PointerAccuracy
        {
            None = 0,
            Coarse = 1,
            Fine = 2,
        }

        private string mediaType;
        public string MediaType
        {
            get => mediaType;
            set
            {
                mediaType = value;
                ValueChanged();
            }
        }

        Dictionary<string, float> numbers;
        Dictionary<string, string> values;
        HashSet<string> types;

        public event Action<IMediaProvider> OnUpdate;
        private bool SuspendUpdates;
        private bool HasUpdates;

        #region Custom media features

        private CursorLockMode cursorLockMode;

        public CursorLockMode CursorLockMode
        {
            get => cursorLockMode;
            set
            {
                if (value == cursorLockMode) return;

                cursorLockMode = value;
                var newLock = value == CursorLockMode.Confined ? "confined" :
                    value == CursorLockMode.Locked ? "locked" : "none";
                values["cursor-lock"] = newLock;

                ValueChanged();
            }
        }


        private bool cursorVisible;

        public bool CursorVisible
        {
            get => cursorVisible;
            set
            {
                if (value == cursorVisible) return;

                cursorVisible = value;
                var newStr = value ? "visible" : "hidden";
                values["cursor"] = newStr;

                ValueChanged();
            }
        }


        private bool applicationFocused;

        public bool ApplicationFocused
        {
            get => applicationFocused;
            set
            {
                if (value == applicationFocused) return;

                applicationFocused = value;
                if (value) types.Add("focused");
                else types.Remove("focused");

                ValueChanged();
            }
        }


        private bool isFullScreen;

        public bool IsFullScreen
        {
            get => isFullScreen;
            set
            {
                if (value == isFullScreen) return;

                isFullScreen = value;

                if (value) types.Add("full-screen");
                else types.Remove("full-screen");

                if (value) values["display-mode"] = "fullscreen";
                else if (Application.isEditor) values["display-mode"] = "editor";
                else values["display-mode"] = "standalone";

                ValueChanged();
            }
        }


        private FullScreenMode fullScreenMode;

        public FullScreenMode FullScreenMode
        {
            get => fullScreenMode;
            set
            {
                if (value == fullScreenMode) return;

                fullScreenMode = value;
                var valStr = Screen.fullScreenMode == FullScreenMode.ExclusiveFullScreen ? "exclusive" :
                    Screen.fullScreenMode == FullScreenMode.FullScreenWindow ? "borderless" :
                    Screen.fullScreenMode == FullScreenMode.MaximizedWindow ? "maximized" :
                    "windowed";
                values["full-screen-mode"] = valStr;

                ValueChanged();
            }
        }


        private int targetFramerate;

        public int TargetFramerate
        {
            get => targetFramerate;
            set
            {
                if (value == targetFramerate) return;
                numbers["target-fps"] = targetFramerate = value;
                ValueChanged();
            }
        }


        private float screenBrightness;

        public float ScreenBrightness
        {
            get => screenBrightness;
            set
            {
                if (value == screenBrightness) return;
                numbers["screen-brightness"] = screenBrightness = value;
                ValueChanged();
            }
        }


        private float screenDpi;

        public float ScreenDpi
        {
            get => screenDpi;
            set
            {
                if (value == screenDpi) return;
                numbers["screen-dpi"] = screenDpi = value;
                ValueChanged();
            }
        }


        private float screenRefreshRate;

        public float ScreenRefreshRate
        {
            get => screenRefreshRate;
            set
            {
                if (value == screenRefreshRate) return;
                numbers["screen-refresh-rate"] = screenRefreshRate = value;
                ValueChanged();
            }
        }


        private Vector2 screenSize;

        public Vector2 ScreenSize
        {
            get => screenSize;
            set
            {
                if (value == screenSize) return;
                screenSize = value;
                numbers["screen-width"] = value.x;
                numbers["screen-height"] = value.y;
                numbers["screen-aspect-ratio"] = value.x / value.y;
                ValueChanged();
            }
        }


        private Vector2 windowSize;

        public Vector2 WindowSize
        {
            get => windowSize;
            set
            {
                if (value == windowSize) return;
                windowSize = value;
                numbers["window-width"] = value.x;
                numbers["window-height"] = value.y;
                numbers["window-aspect-ratio"] = value.x / value.y;
                ValueChanged();
            }
        }

        #endregion

        #region Custom media features (Input)

        private PointerAccuracy currentPointerAccuracy;

        public PointerAccuracy CurrentPointerAccuracy
        {
            get => currentPointerAccuracy;
            set
            {
                if (value == currentPointerAccuracy) return;

                currentPointerAccuracy = value;
                values["pointer"] = value == PointerAccuracy.Fine ? "fine" :
                    value == PointerAccuracy.Coarse ? "coarse" : "none";
                ValueChanged();
            }
        }


        private string anyPointerAccuracy;

        public List<PointerAccuracy> AnyPointerAccuracy
        {
            set
            {
                var hasFine = false;
                var hasCoarse = false;

                if (value != null)
                {
                    foreach (var ac in value)
                    {
                        hasFine = hasFine || ac == PointerAccuracy.Fine;
                        hasCoarse = hasCoarse || ac == PointerAccuracy.Coarse;
                    }
                }

                string res;

                if (hasFine && hasCoarse) res = ",fine,coarse";
                else if (hasFine) res = "fine";
                else if (hasCoarse) res = "coarse";
                else res = "none";

                if (res == anyPointerAccuracy) return;
                values["any-pointer"] = anyPointerAccuracy = res;
                ValueChanged();
            }
        }


        private bool currentPointerHover;

        public bool CurrentPointerHover
        {
            get => currentPointerHover;
            set
            {
                if (value == currentPointerHover) return;

                currentPointerHover = value;
                values["hover"] = value ? "hover" : "none";
                ValueChanged();
            }
        }


        private bool anyPointerHover;

        public bool AnyPointerHover
        {
            get => anyPointerHover;
            set
            {
                if (value == anyPointerHover) return;

                anyPointerHover = value;
                values["any-hover"] = value ? "hover" : "none";
                ValueChanged();
            }
        }


        private string anyInputDevice;

        public string AnyInputDevice
        {
            get => anyInputDevice;
            set
            {
                if (value == anyInputDevice) return;

                values["any-input"] = anyInputDevice = value;
                ValueChanged();
            }
        }

        private string currentInputDevice;

        public string CurrentInputDevice
        {
            get => currentInputDevice;
            set
            {
                if (value == currentInputDevice) return;

                values["input"] = currentInputDevice = value;
                ValueChanged();
            }
        }

        #endregion


        public static DefaultMediaProvider CreateMediaProvider(string type, string framework, bool isEditor)
        {
            return new DefaultMediaProvider(type, null,
                new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase) {
                    { "framework", framework },
#if UNITY_EDITOR
                    { "skin", UnityEditor.EditorGUIUtility.isProSkin ? "dark" : "light" },
#endif
                },
                new HashSet<string>(StringComparer.InvariantCultureIgnoreCase)
                {
                    type,
                    framework,
                    "all",
                    "screen",
                    "reactunity",
                    isEditor ? "editor" : "runtime",
                });
        }

        public DefaultMediaProvider(string mediaType, Dictionary<string, float> numbers = null, Dictionary<string, string> values = null, HashSet<string> types = null)
        {
            MediaType = mediaType;
            this.numbers = numbers ?? new Dictionary<string, float>();
            this.values = values ?? new Dictionary<string, string>();
            this.types = types ?? new HashSet<string>();

            SetUpdatesSuspended(true);
            InitConstants();
            RecalculateScreenAndDevices();
            RecalculateInput();
            SetUpdatesSuspended(false);
        }

        #region Interface Members

        public bool HasType(string type)
        {
            return MediaType == type || type == "all" || types.Contains(type);
        }

        public float GetNumericalValue(string property)
        {
            if (numbers != null && numbers.TryGetValue(property, out var number)) return number;
            return float.NaN;
        }

        public string GetValue(string property)
        {
            if (values != null && values.TryGetValue(property, out var value)) return value;
            if (numbers != null && numbers.TryGetValue(property, out var number)) return number.ToString();
            return null;
        }

        public void SetValue(string property, string value)
        {
            values[property] = value;
            ValueChanged();
        }

        public void SetNumber(string property, float value)
        {
            numbers[property] = value;
            ValueChanged();
        }

        public void SetDimensions(float width, float height)
        {
            numbers["width"] = width;
            numbers["height"] = height;
            numbers["aspect-ratio"] = width / height;
            values["orientation"] = width > height ? "landscape" : "portrait";
            ValueChanged();
        }

        #endregion

        #region Lifecycle

        public void InitConstants()
        {
            values["platform"] = Application.platform.ToString().ToLowerInvariant();
            values["device-type"] = SystemInfo.deviceType.ToString().ToLowerInvariant();
            values["system"] = SystemInfo.operatingSystemFamily.ToString().ToLowerInvariant();
            values["language"] = Application.systemLanguage.ToString().ToLowerInvariant();
            values["install-mode"] = Application.installMode.ToString().ToLowerInvariant();

            values["yoga"] = YogaHelpers.IsLegacyYoga ? "legacy" : "newest";

            if (Application.isConsolePlatform) types.Add("console");
            if (Application.isMobilePlatform) types.Add("console");
            if (Application.isBatchMode) types.Add("batch");
            if (Application.isPlaying) types.Add("playing");
            if (Application.isEditor) types.Add("editing");

            values["genuine"] = !Application.genuineCheckAvailable ? "unknown" :
                Application.genuine ? "yes" : "no";
        }

        public void RecalculateScreenAndDevices()
        {
            IsFullScreen = Screen.fullScreen;
            FullScreenMode = Screen.fullScreenMode;
            CursorLockMode = Cursor.lockState;
            CursorVisible = Cursor.visible;
            ApplicationFocused = Application.isFocused;
            TargetFramerate = Application.targetFrameRate;

            ScreenBrightness = Screen.brightness;
            ScreenDpi = Screen.dpi;
#if UNITY_2022_2_OR_NEWER
            ScreenRefreshRate = (float) Screen.currentResolution.refreshRateRatio.value;
#else
            ScreenRefreshRate = Screen.currentResolution.refreshRate;
#endif
            ScreenSize = new Vector2(Screen.currentResolution.width, Screen.currentResolution.height);
            WindowSize = new Vector2(Screen.width, Screen.height);
        }

        public void RecalculateInput()
        {
#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
            var pointer = Pointer.current;

            var acc = new List<PointerAccuracy>
            {
                Pen.current != null ? PointerAccuracy.Coarse : PointerAccuracy.None,
                Touchscreen.current != null ? PointerAccuracy.Coarse : PointerAccuracy.None,
                Mouse.current != null ? PointerAccuracy.Fine: PointerAccuracy.None,
            };

            AnyPointerAccuracy = acc;
            AnyPointerHover = Mouse.current != null;

            if (pointer == null)
            {
                CurrentPointerAccuracy = PointerAccuracy.None;
                CurrentPointerHover = false;
            }
            else if (pointer.noisy || (pointer.radius != null && pointer.radius.ReadValue().sqrMagnitude > 1))
            {
                CurrentPointerAccuracy = PointerAccuracy.Coarse;
                CurrentPointerHover = false;
            }
            else
            {
                CurrentPointerAccuracy = PointerAccuracy.Fine;
                CurrentPointerHover = true;
            }


            var devices = InputSystem.devices;

            double lastUpdateTime = double.NegativeInfinity;
            string lastDeviceName = null;
            HashSet<string> deviceNames = new HashSet<string>();
            string deviceNamesAll = "";

            foreach (var item in devices)
            {
                if (item is Sensor || item.noisy) continue;

                var name =
                    item is Gamepad ? "gamepad" :
                    item is Touchscreen ? "touch" :
                    item is Mouse ? "mouse" :
                    item is Pen ? "pen" :
                    item is Keyboard ? "keyboard" :
                    item is Joystick ? "joystick" :
                    item is Pointer ? "pointer" : "other";

                if (item.lastUpdateTime > lastUpdateTime)
                {
                    lastUpdateTime = item.lastUpdateTime;
                    lastDeviceName = name;
                }

                if (deviceNames.Add(name))
                {
                    deviceNamesAll += "," + name;
                }
            }

            AnyInputDevice = deviceNamesAll;
            CurrentInputDevice = lastDeviceName;

#else

            var deviceNamesAll = "";
            if (Input.GetJoystickNames().Length > 0) deviceNamesAll += ",gamepad";
            if (Input.touchSupported) deviceNamesAll += ",touch";
            if (Input.stylusTouchSupported) deviceNamesAll += ",pen";
            if (Input.mousePresent) deviceNamesAll += ",mouse,keyboard";
            AnyInputDevice = deviceNamesAll;

            if (Input.mousePresent)
            {
                CurrentPointerAccuracy = PointerAccuracy.Fine;

                var acc = new List<PointerAccuracy> { PointerAccuracy.Fine };
                if (Input.touchSupported || Input.stylusTouchSupported) acc.Add(PointerAccuracy.Fine);
                AnyPointerAccuracy = acc;

                AnyPointerHover = CurrentPointerHover = true;
            }
            else if (Input.touchSupported || Input.stylusTouchSupported)
            {
                CurrentPointerAccuracy = PointerAccuracy.Coarse;
                AnyPointerAccuracy = new List<PointerAccuracy> { PointerAccuracy.Coarse };
                AnyPointerHover = CurrentPointerHover = false;
            }
            else
            {
                CurrentPointerAccuracy = PointerAccuracy.None;
                AnyPointerAccuracy = null;
                AnyPointerHover = CurrentPointerHover = false;
            }
#endif
        }

        #endregion

        void ValueChanged()
        {
            if (SuspendUpdates) HasUpdates = true;
            else
            {
                HasUpdates = false;
                OnUpdate?.Invoke(this);
            }
        }

        public void SetUpdatesSuspended(bool suspended)
        {
            SuspendUpdates = suspended;

            if (!suspended && HasUpdates) ValueChanged();
        }
    }
}
