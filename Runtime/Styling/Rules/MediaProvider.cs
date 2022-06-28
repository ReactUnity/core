using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using UnityEngine;

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
        void RecalculateDefaults();
    }

    public class DefaultMediaProvider : IMediaProvider
    {
        private string mediaType;
        public string MediaType
        {
            get => mediaType;
            set
            {
                mediaType = value;
                OnUpdate?.Invoke(this);
            }
        }

        Dictionary<string, float> numbers;
        Dictionary<string, string> values;
        HashSet<string> types;

        public event Action<IMediaProvider> OnUpdate;

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
                    isEditor ? "editor" : "runtime",
                });
        }


        public DefaultMediaProvider(string mediaType, Dictionary<string, float> numbers = null, Dictionary<string, string> values = null, HashSet<string> types = null)
        {
            MediaType = mediaType;
            this.numbers = numbers ?? new Dictionary<string, float>();
            this.values = values ?? new Dictionary<string, string>();
            this.types = types ?? new HashSet<string>();

            RecalculateDefaults();
        }

        public bool HasType(string type)
        {
            return MediaType == type || type == "all" || types.Contains(type);
        }

        public void InitDefaults()
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

        public void RecalculateDefaults()
        {
            var updated = false;


            float oldVal = GetNumericalValue("window-width");
            float newVal = Screen.width;

            if (oldVal != newVal)
            {
                numbers["window-width"] = newVal;
                updated = true;
            }



            oldVal = GetNumericalValue("window-height");
            newVal = Screen.height;

            if (oldVal != newVal)
            {
                numbers["window-height"] = newVal;
                updated = true;
            }

            oldVal = GetNumericalValue("window-aspect-ratio");
            newVal = (float) Screen.width / Screen.height;

            if (oldVal != newVal)
            {
                numbers["window-aspect-ratio"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("screen-dpi");
            newVal = Screen.dpi;

            if (oldVal != newVal)
            {
                numbers["screen-dpi"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("screen-width");
            newVal = Screen.currentResolution.width;

            if (oldVal != newVal)
            {
                numbers["screen-width"] = newVal;
                updated = true;
            }



            oldVal = GetNumericalValue("screen-height");
            newVal = Screen.currentResolution.height;

            if (oldVal != newVal)
            {
                numbers["screen-height"] = newVal;
                updated = true;
            }

            oldVal = GetNumericalValue("screen-aspect-ratio");
            newVal = (float) Screen.currentResolution.width / Screen.currentResolution.height;

            if (oldVal != newVal)
            {
                numbers["screen-aspect-ratio"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("screen-brightness");
            newVal = Screen.brightness;

            if (oldVal != newVal)
            {
                numbers["screen-brightness"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("screen-refresh-rate");
            newVal = Screen.currentResolution.refreshRate;

            if (oldVal != newVal)
            {
                numbers["screen-refresh-rate"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("target-fps");
            newVal = Application.targetFrameRate;

            if (oldVal != newVal)
            {
                numbers["target-fps"] = newVal;
                updated = true;
            }


            var oldBool = types.Contains("full-screen");
            var newBool = Screen.fullScreen;

            if (oldBool != newBool)
            {
                if (newBool) types.Add("full-screen");
                else types.Remove("full-screen");
                updated = true;
            }



            oldBool = GetValue("cursor") != null;
            newBool = Cursor.visible;

            if (oldBool != newBool)
            {
                values["cursor"] = newBool ? "visible" : "hidden";
                updated = true;
            }



            var oldLock = GetValue("cursor-lock");
            var newLock = Cursor.lockState == CursorLockMode.Confined ? "confined" : Cursor.lockState == CursorLockMode.Locked ? "locked" : "none";

            if (oldLock != newLock)
            {
                values["cursor-lock"] = newLock;
                updated = true;
            }


            oldBool = types.Contains("focused");
            newBool = Application.isFocused;

            if (oldBool != newBool)
            {
                if (newBool) types.Add("focused");
                else types.Remove("focused");
                updated = true;
            }

            if (updated) OnUpdate?.Invoke(this);
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
            OnUpdate?.Invoke(this);
        }

        public void SetNumber(string property, float value)
        {
            numbers[property] = value;
            OnUpdate?.Invoke(this);
        }

        public void SetDimensions(float width, float height)
        {
            numbers["width"] = width;
            numbers["height"] = height;
            numbers["aspect-ratio"] = width / height;
            values["orientation"] = width > height ? "landscape" : "portrait";
            OnUpdate?.Invoke(this);
        }
    }

}
