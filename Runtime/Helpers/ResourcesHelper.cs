using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite checkSprite;
        public static Sprite CheckSprite => checkSprite = checkSprite ??
            Resources.Load<Sprite>("ReactUnity/sprites/check");

        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet = useragentStylesheet ??
            Resources.Load<TextAsset>("ReactUnity/styles/ugui/useragent");

        private static Material backgroundImageMaterial;
        public static Material BackgroundImageMaterial => backgroundImageMaterial = backgroundImageMaterial ??
            Resources.Load<Material>("ReactUnity/materials/BackgroundImage");

        private static Texture2D borderTexture;
        public static Texture2D BorderTexture => borderTexture = borderTexture ??
            Resources.Load<Texture2D>("ReactUnity/sprites/border");


        private static Dictionary<string, TextAsset> Polyfills = new Dictionary<string, TextAsset>();

        public static string GetPolyfill(string name)
        {
            if (Polyfills.TryGetValue(name, out var asset)) return asset.text;
            var loaded = Resources.Load<TextAsset>("ReactUnity/polyfills/" + name);

            if (loaded == null) throw new System.Exception($"Polyfill {name} does not exist");
            Polyfills[name] = loaded;
            return loaded.text;
        }


        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public static string GetVersion()
        {
#if UNITY_EDITOR
            try
            {
                var packageInfo = UnityEditor.PackageManager.PackageInfo.FindForAssembly(typeof(ReactUnityBridge).Assembly);
                if (packageInfo != null) return packageInfo.version;
            }
            catch (System.Exception ex)
            {
                Debug.LogException(ex);
            }
#endif
            return null;
        }

        public static T LoadResource<T>(string path, bool excludeExtension = true) where T : class
        {
            if (string.IsNullOrWhiteSpace(path)) return default(T);
            if (!typeof(Object).IsAssignableFrom(typeof(T))) return default(T);

            if (excludeExtension) path = GetResourcePathWithoutExtension(path);

            return Resources.Load(path, typeof(T)) as T;
        }

        public static string GetResourcePathWithoutExtension(string path)
        {
            if (string.IsNullOrWhiteSpace(path)) return path;
            var lastDot = path.LastIndexOf('.');
            var lastSlash = path.LastIndexOf('/');

            if (lastDot > 0 && (lastDot > lastSlash + 1))
                path = path.Substring(0, lastDot);

            return path;
        }
    }
}
