using System;
using System.Collections.Generic;

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

        public event System.Action<IMediaProvider> OnUpdate;

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

        public DefaultMediaProvider(string mediaType, Dictionary<string, float> numbers = null, Dictionary<string, string> values = null)
        {
            MediaType = mediaType;
            this.numbers = numbers;
            this.values = values;
        }

        public void SetValue(string property, string value)
        {
            values ??= new Dictionary<string, string>();
            values[property] = value;
            OnUpdate?.Invoke(this);
        }

        public void SetNumber(string property, float value)
        {
            numbers ??= new Dictionary<string, float>();
            numbers[property] = value;
            OnUpdate?.Invoke(this);
        }

        public void SetDimensions(float width, float height)
        {
            numbers ??= new Dictionary<string, float>();
            values ??= new Dictionary<string, string>();

            numbers["width"] = width;
            numbers["height"] = height;
            numbers["aspect-ratio"] = width / height;
            values["orientation"] = width > height ? "landscape" : "portrait";
            OnUpdate?.Invoke(this);
        }
    }

}
