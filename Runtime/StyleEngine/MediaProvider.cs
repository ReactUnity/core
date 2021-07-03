using System;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.StyleEngine
{
    public interface IMediaProvider
    {
        public event Action<IMediaProvider> OnUpdate;
        string MediaType { get; set; }
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

        public event Action<IMediaProvider> OnUpdate;

        public static DefaultMediaProvider CreateMediaProvider(string type, string framework, bool isEditor)
        {
            return new DefaultMediaProvider(type, null,
                new Dictionary<string, string> {
                    { "framework", framework },
                    { "editor", isEditor ? "true" : null },
                    { "runtime", isEditor ? null : "runtime" },
                });
        }


        public DefaultMediaProvider(string mediaType, Dictionary<string, float> numbers = null, Dictionary<string, string> values = null)
        {
            MediaType = mediaType;
            this.numbers = numbers ?? new Dictionary<string, float>();
            this.values = values ?? new Dictionary<string, string>();

            RecalculateDefaults();
        }


        public void RecalculateDefaults()
        {
            var updated = false;


            float oldVal = GetNumericalValue("screen-width");
            float newVal = Screen.width;

            if (oldVal != newVal)
            {
                numbers["screen-width"] = newVal;
                updated = true;
            }



            oldVal = GetNumericalValue("screen-height");
            newVal = Screen.height;

            if (oldVal != newVal)
            {
                numbers["screen-height"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("screen-dpi");
            newVal = Screen.dpi;

            if (oldVal != newVal)
            {
                numbers["screen-dpi"] = newVal;
                updated = true;
            }


            oldVal = GetNumericalValue("resolution-width");
            newVal = Screen.currentResolution.width;

            if (oldVal != newVal)
            {
                numbers["resolution-width"] = newVal;
                updated = true;
            }



            oldVal = GetNumericalValue("resolution-height");
            newVal = Screen.currentResolution.height;

            if (oldVal != newVal)
            {
                numbers["resolution-height"] = newVal;
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


            var oldBool = GetValue("full-screen") != null;
            var newBool = Screen.fullScreen;

            if (oldBool != newBool)
            {
                values["full-screen"] = newBool ? "yes" : null;
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
